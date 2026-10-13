import { appendFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import matter from "gray-matter";
import { mediaActionRequestSchema, workEnvelopeSchema } from "@ghcp/content-schema";
import { assertCandidateAccepted, authorizedAction } from "./authorization.js";
import { authorizationFixture } from "./authorization-fixture.js";
import { canonical, parseDecisions, recordProductionDecision, sha256, workBaselineHash } from "./production-records.js";

const directories: string[] = [];
afterEach(async () => { await Promise.all(directories.splice(0).map(dir => rm(dir, { recursive: true, force: true }))); });
async function fixture(count = 1) {
  const root = path.resolve("node_modules", `authorization-${crypto.randomUUID()}`);
  directories.push(root);
  const roots = { repositoryRoot: root, workshopsRoot: path.join(root, "workshops"), candidatesRoot: path.join(root, "generated", "candidates") };
  await mkdir(path.join(roots.workshopsRoot, "demo", "content"), { recursive: true });
  await writeFile(path.join(roots.workshopsRoot, "demo", "content", "source.md"), "approved source");
  const requests = Array.from({ length: count }, (_, index) => mediaActionRequestSchema.parse({
    kind: "generate-image", workshopId: "demo", moduleId: "module", cycleId: "cycle", assetId: `image-${index}`,
    provider: "gpt-image-2", deployment: "test", endpoint: "https://example.invalid", source: "content/source.md",
    sourceHash: sha256("approved source"), promptHash: sha256(`prompt-${index}`), width: 1024, height: 1024,
    outputFormat: "png", candidates: 1, variants: 1
  }));
  const files = await authorizationFixture(roots, requests);
  return { roots, requests, ...files };
}

describe("exact media work envelopes", () => {
  it("allows one exact action, persists success and rejects duplicate provider calls", async () => {
    const f = await fixture();
    const provider = vi.fn(async () => "candidate");
    await expect(authorizedAction(f.requests[0]!, provider, f.roots)).resolves.toBe("candidate");
    await expect(authorizedAction(f.requests[0]!, provider, f.roots)).rejects.toThrow(/exhausted|Duplicate/);
    expect(provider).toHaveBeenCalledTimes(1);
  });

  describe("lifecycle-v3 standing image batches", () => {
    const requirementsDocument = `---
schemaVersion: 1
kind: workshop-requirements
id: demo
title: Demo Workshop
description: Demonstrate standing image authority.
audience: [Developers]
durationMinutes: 60
outcomes: [Generate approved imagery]
modules:
  - id: module
    title: Module
    minutes: 60
    outcomes: [Explain the workflow]
imageRoles:
  - id: image-0
    module: module
    purpose: Open the module
    request:
      provider: gpt-image-2
      deployment: test
      endpoint: https://example.invalid
      source: content/source.md
      sourceHash: 41cf6794ba4200b839c53531555f0f3998df4cbb01a4d5cb0b94e3ca5e23947d
      promptHashes:
        - 2dfde0f3ee7e9a78ac497839dbaa4e6cf044df753fe929b3a5438f445c2b2e6e
        - f56fbd5cf31b32e55b2007293ee077d82df57d2290c783ffd200a53f72e9615e
        - ce28c94d2165b4d4110e89bad1808c0f29f112e1687ad6b2b54f525c1aad725d
        - 80329d953ec7b168277098306793ebcf29f1163ee4ddd0ee7a53902220b14e77
        - f2ba0c213503b5b754bd0ee9a45aa821b9eedfc137c838efc9e097e22edee4b2
        - 3ae812fa7da02e92f19b4b7ea2ce550ed0034d36fda2b4c05f83677d9e7e6fab
      width: 1024
      height: 1024
      outputFormat: png
  - id: image-1
    module: module
    purpose: Explain the concept
    request:
      provider: gpt-image-2
      deployment: test
      endpoint: https://example.invalid
      source: content/source.md
      sourceHash: 41cf6794ba4200b839c53531555f0f3998df4cbb01a4d5cb0b94e3ca5e23947d
      promptHashes:
        - 9f442d082ba5f65df152567707d134356fd27fd043fb699e4486a5dbb7c8b298
      width: 1024
      height: 1024
      outputFormat: png
  - id: image-2
    module: module
    purpose: Summarize the module
    request:
      provider: gpt-image-2
      deployment: test
      endpoint: https://example.invalid
      source: content/source.md
      sourceHash: 41cf6794ba4200b839c53531555f0f3998df4cbb01a4d5cb0b94e3ca5e23947d
      promptHashes:
        - 3f47e40154e654374d186fdfe1c6e53b0c7bcfbbc55f5ead46bab934050ec2c7
      width: 1024
      height: 1024
      outputFormat: png
  - id: image-3
    module: module
    purpose: Close the module
    request:
      provider: gpt-image-2
      deployment: test
      endpoint: https://example.invalid
      source: content/source.md
      sourceHash: 41cf6794ba4200b839c53531555f0f3998df4cbb01a4d5cb0b94e3ca5e23947d
      promptHashes:
        - d547527472093c69475cba66772df3585bce212e47af00211d9ee0907b323d31
      width: 1024
      height: 1024
      outputFormat: png
      referencePath: content/reference.png
      referenceHash: ${sha256("reference")}
acceptanceCriteria: [The production routes respond successfully]
---
`;

    async function standingFixture() {
      const root = path.resolve("node_modules", `authorization-v3-${crypto.randomUUID()}`);
      directories.push(root);
      const roots = {
        repositoryRoot: root,
        workshopsRoot: path.join(root, "workshops"),
        candidatesRoot: path.join(root, "generated", "candidates")
      };
      const workshopRoot = path.join(roots.workshopsRoot, "demo");
      await mkdir(path.join(workshopRoot, "content", "production"), { recursive: true });
      await mkdir(path.join(root, ".github"), { recursive: true });
      await writeFile(path.join(root, ".github", "workshop-workflow.json"), JSON.stringify({
        schemaVersion: 1,
        imageGeneration: { maxCandidatesPerBatch: 3 }
      }));
      await writeFile(path.join(workshopRoot, "requirements.md"), requirementsDocument);
      await writeFile(path.join(workshopRoot, "content", "source.md"), "source");
      await writeFile(path.join(workshopRoot, "content", "reference.png"), "reference");
      await writeFile(path.join(workshopRoot, "content", "production", "production-state.md"), matter.stringify("", {
        schemaVersion: 1,
        kind: "production-state",
        workshop: "demo",
        lifecycleVersion: 3,
        phase: "drafting",
        sessionStatus: "active",
        activeTracks: [],
        currentInitiative: "requirements-demo",
        contextRefs: [],
        currentOwner: "Slidev Deck Producer",
        nextOwner: "Workshop Production Coordinator",
        nextHumanGate: "Local draft approval",
        resumeTask: "produce-local-draft",
        approvedArtifacts: [],
        blockers: [],
        timing: { totalMinutes: 60, allocatedMinutes: 60, source: "content/source.md" },
        paidGeneration: "approved-for-listed-actions",
        releaseState: "not-ready",
        branch: "test",
        lastValidatedCommit: "a".repeat(40),
        checkpointId: "checkpoint-initial",
        updatedAt: "2026-10-02T12:00:00.000Z",
        requirements: { path: "requirements.md", sha256: sha256(requirementsDocument) },
        environment: "local",
        imageBatch: { limit: 3, used: 0 }
      }));
      const request = (assetId: string, promptSeed = assetId) => mediaActionRequestSchema.parse({
        kind: "generate-image",
        workshopId: "demo",
        moduleId: "module",
        cycleId: "batch",
        assetId,
        provider: "gpt-image-2",
        deployment: "test",
        endpoint: "https://example.invalid",
        source: "content/source.md",
        sourceHash: sha256("source"),
        promptHash: sha256(`prompt-${promptSeed}`),
        referencePath: assetId === "image-3" ? "workshops/demo/content/reference.png" : undefined,
        referenceHash: assetId === "image-3" ? sha256("reference") : undefined,
        width: 1024,
        height: 1024,
        outputFormat: "png",
        candidates: 1,
        variants: 1
      });
      return { roots, request };
    }

    it("normalizes declared workshop-relative image references to repository-relative requests", async () => {
      const { roots, request } = await standingFixture();
      await expect(authorizedAction(request("image-3"), async () => "candidate", roots))
        .resolves.toBe("candidate");
    });

    it("ends standing image generation after local approval", async () => {
      const { roots, request } = await standingFixture();
      const statePath = path.join(
        roots.workshopsRoot, "demo", "content", "production", "production-state.md"
      );
      const state = matter(await readFile(statePath, "utf8"));
      await writeFile(statePath, matter.stringify(state.content, {
        ...state.data,
        phase: "test-publishing",
        environment: "test"
      }));
      const provider = vi.fn();
      await expect(authorizedAction(request("image-0"), provider, roots))
        .rejects.toThrow("complete local draft is approved");
      expect(provider).not.toHaveBeenCalled();
    });

    it("allows three candidates per declared asset and blocks a fourth without per-action decisions", async () => {
      const { roots, request } = await standingFixture();
      for (const candidate of ["a", "b", "c"]) {
        await expect(authorizedAction(request("image-0", `image-0-${candidate}`), async () => "candidate", roots))
          .resolves.toBe("candidate");
      }
      const provider = vi.fn();
      await expect(authorizedAction(request("image-0", "image-0-d"), provider, roots)).rejects.toThrow("limit of 3");
      expect(provider).not.toHaveBeenCalled();
      await expect(authorizedAction(request("image-1"), async () => "candidate", roots)).resolves.toBe("candidate");
    });

    it("stops only the failed asset batch and leaves other declared assets generatable", async () => {
      const { roots, request } = await standingFixture();
      await expect(authorizedAction(request("image-0"), async () => { throw new Error("provider down"); }, roots))
        .rejects.toThrow("provider down");
      const provider = vi.fn();
      await expect(authorizedAction(request("image-0", "image-0-retry"), provider, roots))
        .rejects.toThrow("stops the remaining batch");
      expect(provider).not.toHaveBeenCalled();
      await expect(authorizedAction(request("image-1"), async () => "candidate", roots)).resolves.toBe("candidate");
    });

    it("rejects imagery the requirements never declared", async () => {
      const { roots, request } = await standingFixture();
      const provider = vi.fn();
      await expect(authorizedAction(request("undeclared-image"), provider, roots))
        .rejects.toThrow("not a declared image role");
      expect(provider).not.toHaveBeenCalled();
      const otherModule = { ...request("image-0"), moduleId: "other-module" };
      await expect(authorizedAction(otherModule as never, provider, roots))
        .rejects.toThrow("requirements do not declare");
      expect(provider).not.toHaveBeenCalled();
    });
  });
  it.each(["promptHash", "referenceHash", "deployment", "width", "sourceHash", "endpoint", "assetId"])("rejects changed %s before invoking provider", async key => {
    const f = await fixture();
    const request = { ...f.requests[0], [key]: key === "width" ? 1536 : key.endsWith("Hash") ? "b".repeat(64) : "changed" };
    const provider = vi.fn();
    await expect(authorizedAction(request as never, provider, f.roots)).rejects.toThrow();
    expect(provider).not.toHaveBeenCalled();
  });
  it.each(["revoked", "stopped", "expired", "failed-sample", "changed-baseline", "missing-decision", "revoked-decision", "raised-limits", "paused", "blocked", "awaiting-human", "missing-envelope"])("blocks %s", async scenario => {
    const f = await fixture();
    const envelope = { ...f.envelope };
    if (scenario === "revoked" || scenario === "stopped") envelope.status = scenario;
    if (scenario === "expired") envelope.expiresAt = "2000-01-01T00:00:00.000Z";
    if (scenario === "failed-sample") envelope.sampleStatus = "failed";
    if (scenario === "raised-limits") envelope.limits.maxActions += 5;
    await writeFile(f.envelopePath, JSON.stringify(envelope));
    if (scenario === "changed-baseline") await writeFile(path.join(f.roots.workshopsRoot, "demo", "content", "source.md"), "changed");
    if (scenario === "missing-decision") await writeFile(f.logPath, "# No approval");
    if (scenario === "revoked-decision") await writeFile(f.logPath, (await readFile(f.logPath, "utf8")).replaceAll('"decision":"approved"', '"decision":"revoked"'));
    if (["paused", "blocked", "awaiting-human", "missing-envelope"].includes(scenario)) {
      const state = matter(await readFile(f.statePath, "utf8"), {});
      if (scenario === "missing-envelope") delete state.data.workEnvelope;
      else {
        state.data.sessionStatus = scenario;
        if (scenario === "paused") { state.data.pausedAt = "2026-01-01T00:00:00.000Z"; state.data.pauseReason = "Human pause"; }
      }
      await writeFile(f.statePath, matter.stringify(state.content, state.data));
    }
    const provider = vi.fn();
    await expect(authorizedAction(f.requests[0]!, provider, f.roots)).rejects.toThrow();
    expect(provider).not.toHaveBeenCalled();
  });
  it("blocks a second concurrent call and retains uncertainty after failed submission/restart", async () => {
    const f = await fixture(2);
    let release!: () => void;
    const provider = vi.fn(() => new Promise<void>(resolve => { release = resolve; }));
    const first = authorizedAction(f.requests[0]!, provider, f.roots);
    await vi.waitFor(() => expect(provider).toHaveBeenCalledTimes(1));
    const second = vi.fn();
    await expect(authorizedAction(f.requests[1]!, second, f.roots)).rejects.toThrow(/Uncertain|busy/);
    expect(second).not.toHaveBeenCalled();
    release();
    await first;
    await expect(authorizedAction(f.requests[1]!, async () => { throw new Error("connection lost"); }, f.roots)).rejects.toThrow("connection lost");
    await expect(authorizedAction(f.requests[1]!, second, f.roots)).rejects.toThrow("Uncertain");
    expect(second).not.toHaveBeenCalled();
  });
  it("counts provider/candidate limits independently of action count", async () => {
    const f = await fixture(2);
    await authorizationFixture(f.roots, f.requests, { limits: { maxActions: 2, maxProviderCalls: 1, maxCandidates: 1 } });
    await authorizedAction(f.requests[0]!, async () => undefined, f.roots);
    await expect(authorizedAction(f.requests[1]!, vi.fn(), f.roots)).rejects.toThrow("exhausted");
  });
  it("requires human sample review before expansion", async () => {
    const f = await fixture(2);
    await authorizationFixture(f.roots, f.requests, { sampleStatus: "pending" });
    await authorizedAction(f.requests[0]!, async () => undefined, f.roots);
    await expect(authorizedAction(f.requests[1]!, vi.fn(), f.roots)).rejects.toThrow("sample awaits");
  });
  it("allows only the explicitly approved pending sample batch", async () => {
    const f = await fixture(3);
    await authorizationFixture(f.roots, f.requests, {
      sampleStatus: "pending",
      limits: { maxActions: 3, maxProviderCalls: 3, maxCandidates: 3, sampleBatchSize: 2 }
    });
    const provider = vi.fn(async () => "candidate");
    await expect(authorizedAction(f.requests[0]!, provider, f.roots)).resolves.toBe("candidate");
    await expect(authorizedAction(f.requests[1]!, provider, f.roots)).resolves.toBe("candidate");
    await expect(authorizedAction(f.requests[2]!, provider, f.roots))
      .rejects.toThrow("outside the pending image sample batch");
    expect(provider).toHaveBeenCalledTimes(2);
  });
  it("distinguishes an ungrouped paid action from an exhausted sample batch", async () => {
    const f = await fixture(2);
    await authorizationFixture(f.roots, f.requests, {
      limits: { maxActions: 2, maxProviderCalls: 2, maxCandidates: 2, sampleBatchSize: 1 },
      sampleStatus: "pending"
    });
    const provider = vi.fn();
    await expect(authorizedAction(f.requests[1]!, provider, f.roots))
      .rejects.toThrow("outside the pending image sample batch");
    expect(provider).not.toHaveBeenCalled();
  });
  it("stops an approved sample batch after an uncertain submission", async () => {
    const f = await fixture(2);
    await authorizationFixture(f.roots, f.requests, {
      sampleStatus: "pending",
      limits: { maxActions: 2, maxProviderCalls: 2, maxCandidates: 2, sampleBatchSize: 2 }
    });
    await expect(authorizedAction(f.requests[0]!, async () => {
      throw new Error("provider outcome unknown");
    }, f.roots)).rejects.toThrow("provider outcome unknown");
    const provider = vi.fn();
    await expect(authorizedAction(f.requests[1]!, provider, f.roots)).rejects.toThrow("Uncertain");
    expect(provider).not.toHaveBeenCalled();
  });
  it("does not clear stale locks after a crash", async () => {
    const f = await fixture();
    await mkdir(path.join(f.roots.candidatesRoot, "demo", "module", "cycle", "authorizations", ".reservation-lock"), { recursive: true });
    await expect(authorizedAction(f.requests[0]!, vi.fn(), f.roots)).rejects.toThrow("uncertain after crash");
  });
  it("revokes approval with an append-only superseding human decision", async () => {
    const f = await fixture();
    await recordProductionDecision(path.join(f.roots.workshopsRoot, "demo"), {
      id: "revoke-action", initiative: "test-initiative", supersedes: "decision-0",
      gate: "paid-action", decision: "revoked", baselineHash: f.baselineHash,
      envelopeHash: sha256(canonical(f.envelope)), requestHash: sha256(canonical(f.requests[0])),
      recordedBy: "Human", recordedAt: "2026-02-01T00:00:00.000Z", rationale: "Stop"
    });
    const provider = vi.fn();
    await expect(authorizedAction(f.requests[0]!, provider, f.roots)).rejects.toThrow("revoked human decision");
    expect(provider).not.toHaveBeenCalled();
    expect(await readFile(f.logPath, "utf8")).toContain('"decision":"approved"');
  });
  it.each(["unfinished-revocation", "writer-lock", "unfinished-header"])("blocks %s before provider execution", async scenario => {
    const f = await fixture();
    if (scenario === "writer-lock") await mkdir(`${f.logPath}.lock`);
    else {
      const unfinished = scenario === "unfinished-header" ? "\n```production-decision" :
        '\n```production-decision\n{"id":"revoke-action","supersedes":"decision-0"';
      await appendFile(f.logPath, unfinished);
      expect(() => parseDecisions(unfinished)).toThrow("Incomplete production decision");
    }
    const provider = vi.fn();
    await expect(authorizedAction(f.requests[0]!, provider, f.roots)).rejects.toThrow(/Incomplete production decision|Decision log is locked/);
    expect(provider).not.toHaveBeenCalled();
  });
  it.each(["a-fresh.json", "z-fresh.json"])("finds current re-acceptance despite old receipts (%s)", async filename => {
    const f = await fixture();
    const acceptance = mediaActionRequestSchema.parse({
      ...f.requests[0], kind: "accept-image", candidateHash: "c".repeat(64), manifestHash: "d".repeat(64)
    });
    const publication = mediaActionRequestSchema.parse({ ...acceptance, kind: "publish-image", target: "assets/image.png" });
    const review = await authorizationFixture(f.roots, [acceptance, publication]);
    await authorizedAction(acceptance, async () => undefined, f.roots);
    const workshop = path.join(f.roots.workshopsRoot, "demo");
    const decision = {
      initiative: review.envelope.initiative, gate: "candidate", baselineHash: review.baselineHash,
      envelopeHash: sha256(canonical(review.envelope)), requestHash: sha256(canonical(acceptance)),
      recordedBy: "Human", recordedAt: "2026-02-01T00:00:00.000Z", rationale: "Human reviewed exact candidate"
    };
    await recordProductionDecision(workshop, { ...decision, id: "revoke-acceptance", supersedes: "decision-0", decision: "revoked" });
    await expect(assertCandidateAccepted(publication, f.roots)).rejects.toThrow("revoked or stale");
    await recordProductionDecision(workshop, {
      ...decision, id: "fresh-acceptance", supersedes: "revoke-acceptance", decision: "approved", envelopeHash: "e".repeat(64)
    });
    const directory = path.join(f.roots.candidatesRoot, "demo", "module", "cycle", "authorizations");
    const oldReceipt = JSON.parse(await readFile(path.join(directory, "test-envelope--action-0.json"), "utf8"));
    await writeFile(path.join(directory, filename), JSON.stringify({
      ...oldReceipt, envelopeId: "fresh-envelope", envelopeHash: "e".repeat(64), decisionId: "fresh-acceptance"
    }));
    await expect(assertCandidateAccepted(publication, f.roots)).resolves.toMatchObject({ decisionId: "fresh-acceptance" });
    await recordProductionDecision(workshop, {
      ...decision, id: "revoke-fresh", supersedes: "fresh-acceptance", decision: "revoked", envelopeHash: "e".repeat(64)
    });
    await expect(assertCandidateAccepted(publication, f.roots)).rejects.toThrow("revoked or stale");
  });
  it.each([false, true])("reuses prerequisite approvals only while scope is unchanged (changed=%s)", async changeScope => {
    const f = await fixture();
    const revised = workEnvelopeSchema.parse({
      ...f.envelope, limits: { ...f.envelope.limits, maxActions: 2 },
      ownedPaths: changeScope ? [...f.envelope.ownedPaths, "unapproved"] : f.envelope.ownedPaths,
      actions: [{ ...f.envelope.actions[0], decisionId: "fresh-paid-action" }]
    });
    await writeFile(f.envelopePath, JSON.stringify(revised));
    const provider = vi.fn(async () => "candidate");
    await expect(authorizedAction(f.requests[0]!, provider, f.roots)).rejects.toThrow("human decision");
    await recordProductionDecision(path.join(f.roots.workshopsRoot, "demo"), {
      id: "fresh-paid-action", initiative: revised.initiative, gate: "paid-action", decision: "approved",
      supersedes: "decision-0", baselineHash: workBaselineHash(revised),
      envelopeHash: sha256(canonical(revised)), requestHash: sha256(canonical(f.requests[0])),
      recordedBy: "Human", recordedAt: "2026-02-01T00:00:00.000Z", rationale: "Approve only the revised exact action"
    });
    if (changeScope) {
      await expect(authorizedAction(f.requests[0]!, provider, f.roots)).rejects.toThrow("human decision: scope-decision");
      expect(provider).not.toHaveBeenCalled();
    } else {
      await expect(authorizedAction(f.requests[0]!, provider, f.roots)).resolves.toBe("candidate");
      expect(provider).toHaveBeenCalledTimes(1);
    }
  });
  it("rejects duplicate ids and unrestricted candidate/variant counts", async () => {
    const f = await fixture();
    expect(() => workEnvelopeSchema.parse({ ...f.envelope, actions: [...f.envelope.actions, ...f.envelope.actions] })).toThrow();
    expect(() => mediaActionRequestSchema.parse({ ...f.requests[0], candidates: 2 })).toThrow();
    expect(() => mediaActionRequestSchema.parse({ ...f.requests[0], variants: 2 })).toThrow();
  });
});
