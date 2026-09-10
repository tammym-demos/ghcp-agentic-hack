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
