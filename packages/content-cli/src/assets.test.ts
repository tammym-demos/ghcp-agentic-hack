import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import matter from "gray-matter";
import { mediaActionRequestSchema } from "@ghcp/content-schema";
import {
  candidateCycleDirectory,
  candidateRequest,
  acceptCandidate,
  imageReferenceContentType,
  promoteImage,
  validateApprovedImageSidecars,
  validateImageDimensions,
  videoReferenceContentType
} from "./assets.js";
import { canonical, sha256 } from "./production-records.js";
import { authorizationFixture } from "./authorization-fixture.js";

const temporaryRoots: string[] = [];
const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64"
);

async function temporaryRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-assets-"));
  temporaryRoots.push(root);
  return root;
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("videoReferenceContentType", () => {
  it.each([
    ["frame.png", "image/png"],
    ["frame.jpg", "image/jpeg"],
    ["frame.JPEG", "image/jpeg"],
    ["frame.webp", "image/webp"]
  ])("maps %s to %s", (filename, expected) => {
    expect(videoReferenceContentType(filename)).toBe(expected);
  });

  describe("imageReferenceContentType", () => {
    it.each([
      ["frame.png", "image/png"],
      ["frame.jpg", "image/jpeg"],
      ["frame.JPEG", "image/jpeg"]
    ])("maps %s to %s", (filename, expected) => {
      expect(imageReferenceContentType(filename)).toBe(expected);
    });

    it("rejects WebP because the MAI edit API documents PNG and JPEG inputs", () => {
      expect(() => imageReferenceContentType("frame.webp")).toThrow("PNG or JPEG");
    });
  });

  describe("candidateCycleDirectory", () => {
    it("creates the workshop/module/cycle media layout", () => {
      expect(
        candidateCycleDirectory("generated", "demo-workshop", "foundations", "2026-08-04-v2", "images")
      ).toBe(path.join("generated", "demo-workshop", "foundations", "2026-08-04-v2", "images"));
    });

    it("rejects path-like cycle ids", () => {
      expect(() =>
        candidateCycleDirectory("generated", "demo", "foundations", "../other", "video")
      ).toThrow("lowercase kebab-case");
    });
  });

  it("rejects unsupported reference files", () => {
    expect(() => videoReferenceContentType("frame.svg")).toThrow("PNG, JPEG, or WebP");
  });
});

describe("validateImageDimensions", () => {
  it.each([
    [1024, 1024],
    [1536, 1024],
    [1024, 1536]
  ])("accepts gpt-image-2 dimensions %sx%s", (width, height) => {
    expect(() => validateImageDimensions("gpt-image-2", width, height)).not.toThrow();
  });

  it("rejects unsupported gpt-image-2 dimensions before a provider request", () => {
    expect(() => validateImageDimensions("gpt-image-2", 1792, 1024)).toThrow(
      "gpt-image-2 dimensions must be 1024x1024, 1536x1024, or 1024x1536"
    );
  });

  it("rejects invalid dimensions for every provider", () => {
    expect(() => validateImageDimensions("flux-2-pro", 0, 1024)).toThrow(
      "Image width and height must be positive integers"
    );
    expect(() => validateImageDimensions("mai-image-2.5", 1024, 0)).toThrow(
      "Image width and height must be positive integers"
    );
  });
});

describe("promoteImage", () => {
  it("promotes a candidate from a nested review cycle with portable approved provenance", async () => {
    const root = await temporaryRoot();
    const candidatesRoot = path.join(root, "generated", "candidates");
    const workshopsRoot = path.join(root, "workshops");
    const candidateRoot = path.join(
      candidatesRoot,
      "demo",
      "foundations",
      "2026-08-04-v2",
      "images"
    );
    const workshopRoot = path.join(workshopsRoot, "demo");
    const source = "content/modules/01-foundations/media/prompts/images/test.txt";
    const imagePath = path.join(candidateRoot, "test.png");
    const manifestPath = `${imagePath}.json`;
    const candidateManifest = {
      schemaVersion: 1,
      id: "test-image",
      kind: "image",
      provider: "gpt-image-2",
      deployment: "test",
      promptHash: "0".repeat(64),
      source,
      createdAt: "2026-08-04T00:00:00.000Z",
      reviewStatus: "candidate",
      location: imagePath,
      width: 1,
      height: 1
    };
    await mkdir(path.dirname(path.join(workshopRoot, source)), { recursive: true });
    await mkdir(candidateRoot, { recursive: true });
    await writeFile(path.join(workshopRoot, source), "prompt");
    await writeFile(imagePath, onePixelPng);
    await writeFile(manifestPath, JSON.stringify(candidateManifest));

    const roots = { candidatesRoot, workshopsRoot, repositoryRoot: root };
    const acceptance = await candidateRequest(manifestPath, undefined, "accept-image", undefined, roots);
    const publication = await candidateRequest(manifestPath, undefined, "publish-image", "assets/images/foundations/test.png", roots);
    await authorizationFixture(roots, [acceptance, publication]);
    await expect(promoteImage(manifestPath, "assets/images/foundations/test.png", roots)).rejects.toThrow(/acceptance/);
    await acceptCandidate(manifestPath, undefined, roots);
    await promoteImage(manifestPath, "assets\\images\\foundations\\test.png", {
      candidatesRoot,
      workshopsRoot
    });

    const target = path.join(workshopRoot, "assets", "images", "foundations", "test.png");
    const approved = JSON.parse(await readFile(`${target}.json`, "utf8"));
    expect(approved.reviewStatus).toBe("approved");
    expect(approved.candidateAcceptance.decisionId).toBe("decision-0");
    expect(approved.publicationAuthorization.decisionId).toBe("decision-1");
    expect(approved.location).toBe("assets/images/foundations/test.png");
    await expect(validateApprovedImageSidecars(root)).resolves.toBe(1);

    const secondImagePath = path.join(candidateRoot, "second.png");
    const secondManifestPath = `${secondImagePath}.json`;
    await writeFile(secondImagePath, onePixelPng);
    await writeFile(
      secondManifestPath,
      JSON.stringify({ ...candidateManifest, id: "second-image", location: secondImagePath })
    );
    await expect(
      promoteImage(secondManifestPath, "assets/images/foundations/test.png", {
        candidatesRoot,
        workshopsRoot
      })
    ).rejects.toThrow("already exists");
  });

  it("resolves repository-relative candidate manifests from the repository root", async () => {
    const root = await temporaryRoot();
    const candidatesRoot = path.join(root, "generated", "candidates");
    const workshopsRoot = path.join(root, "workshops");
    const candidateRoot = path.join(candidatesRoot, "demo", "agentic", "cycle", "images");
    const workshopRoot = path.join(workshopsRoot, "demo");
    const source = "content/modules/agentic/media/prompts/images/test.txt";
    const imagePath = path.join(candidateRoot, "test.png");
    const manifestPath = `${imagePath}.json`;
    await mkdir(path.dirname(path.join(workshopRoot, source)), { recursive: true });
    await mkdir(candidateRoot, { recursive: true });
    await writeFile(path.join(workshopRoot, source), "prompt");
    await writeFile(imagePath, onePixelPng);
    await writeFile(
      manifestPath,
      JSON.stringify({
        schemaVersion: 1,
        id: "test-image",
        kind: "image",
        provider: "gpt-image-2",
        deployment: "test",
        promptHash: "0".repeat(64),
        source,
        createdAt: "2026-08-10T00:00:00.000Z",
        reviewStatus: "candidate",
        location: imagePath,
        width: 1,
        height: 1
      })
    );

    const roots = { candidatesRoot, workshopsRoot, repositoryRoot: root };
    await authorizationFixture(roots, [
      await candidateRequest(manifestPath, undefined, "accept-image", undefined, roots),
      await candidateRequest(manifestPath, undefined, "publish-image", "assets/images/agentic/test.png", roots)
    ]);
    await acceptCandidate(manifestPath, undefined, roots);
    await promoteImage(
      path.relative(root, manifestPath),
      "assets/images/agentic/test.png",
      { candidatesRoot, workshopsRoot, repositoryRoot: root }
    );

    await expect(readFile(path.join(workshopRoot, "assets", "images", "agentic", "test.png"))).resolves.toEqual(
      onePixelPng
    );
  });
});

describe("lifecycle-v3 image promotion", () => {
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
  - id: test-image
    module: module
    purpose: Open the module
    request:
      provider: gpt-image-2
      deployment: test
      endpoint: https://example.invalid
      source: content/source.md
      sourceHash: 41cf6794ba4200b839c53531555f0f3998df4cbb01a4d5cb0b94e3ca5e23947d
      promptHashes:
        - 731dd58f0e65495ca8e72b8686ed2b55e431a9f1731bc55fabdda73326ed5c9d
      width: 1024
      height: 1024
      outputFormat: png
acceptanceCriteria: [The production routes respond successfully]
---
`;

  async function standingCandidate() {
    const root = await temporaryRoot();
    const candidatesRoot = path.join(root, "generated", "candidates");
    const workshopsRoot = path.join(root, "workshops");
    const workshopRoot = path.join(workshopsRoot, "demo");
    const candidateRoot = path.join(candidatesRoot, "demo", "module", "batch", "images");
    const journalRoot = path.join(candidatesRoot, "demo", "module", "batch", "authorizations");
    const source = "content/source.md";
    const imagePath = path.join(candidateRoot, "test.png");
    const manifestPath = `${imagePath}.json`;

    await mkdir(path.join(workshopRoot, "content", "production"), { recursive: true });
    await mkdir(candidateRoot, { recursive: true });
    await mkdir(journalRoot, { recursive: true });
    await writeFile(path.join(workshopRoot, "requirements.md"), requirementsDocument);
    await writeFile(path.join(workshopRoot, source), "prompt");
    await writeFile(imagePath, onePixelPng);
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
      timing: { totalMinutes: 60, allocatedMinutes: 60, source },
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

    const generateRequest = mediaActionRequestSchema.parse({
      kind: "generate-image",
      workshopId: "demo",
      moduleId: "module",
      cycleId: "batch",
      assetId: "test-image",
      provider: "gpt-image-2",
      deployment: "test",
      endpoint: "https://example.invalid",
      source,
      sourceHash: sha256("prompt"),
      promptHash: sha256("prompt-test-image"),
      width: 1024,
      height: 1024,
      outputFormat: "png",
      candidates: 1,
      variants: 1
    });
    const requestHash = sha256(canonical(generateRequest));
    const authorityHash = sha256(canonical({ authority: "standing", requirements: sha256(requirementsDocument) }));
    await writeFile(manifestPath, JSON.stringify({
      schemaVersion: 1,
      id: "test-image",
      kind: "image",
      provider: "gpt-image-2",
      deployment: "test",
      promptHash: generateRequest.promptHash,
      source,
      createdAt: "2026-10-02T12:00:00.000Z",
      reviewStatus: "candidate",
      location: imagePath,
      width: 1,
      height: 1,
      generationAuthorization: {
        initiative: "requirements-demo",
        envelopeId: "standing-batch",
        envelopeHash: authorityHash,
        decisionId: "standing-image-policy",
        requestHash
      }
    }));

    const journalPath = path.join(journalRoot, `standing-image--${requestHash}.json`);
    const record = {
      schemaVersion: 1,
      authority: "lifecycle-v3-image-batch",
      authorityHash,
      requirementsHash: sha256(requirementsDocument),
      request: generateRequest,
      requestHash,
      output: {
        manifestHash: sha256(await readFile(manifestPath)),
        candidateHash: sha256(await readFile(imagePath)),
        manifestPath: path.relative(root, manifestPath).split(path.sep).join("/"),
        candidatePath: imagePath
      },
      status: "succeeded",
      reservedAt: "2026-10-02T12:00:00.000Z",
      completedAt: "2026-10-02T12:00:05.000Z"
    };
    const roots = { candidatesRoot, workshopsRoot, repositoryRoot: root };
    return { root, roots, workshopRoot, manifestPath, journalPath, record };
  }

  it("requires a succeeded standing authorization record that matches the candidate", async () => {
    const fixture = await standingCandidate();
    await expect(promoteImage(fixture.manifestPath, "assets/images/module/test.png", fixture.roots))
      .rejects.toThrow("authorization record is missing");

    await writeFile(fixture.journalPath, JSON.stringify({ ...fixture.record, status: "uncertain" }));
    await expect(promoteImage(fixture.manifestPath, "assets/images/module/test.png", fixture.roots))
      .rejects.toThrow("not a succeeded image batch call");

    await writeFile(fixture.journalPath, JSON.stringify(fixture.record));
    await promoteImage(fixture.manifestPath, "assets/images/module/test.png", fixture.roots);
    const approved = JSON.parse(
      await readFile(path.join(fixture.workshopRoot, "assets", "images", "module", "test.png.json"), "utf8")
    );
    expect(approved.reviewStatus).toBe("approved");
    expect(approved.integratedUnder.authority).toBe("lifecycle-v3-local-draft");
  });

  it("ends lifecycle-v3 image integration after local approval", async () => {
    const fixture = await standingCandidate();
    await writeFile(fixture.journalPath, JSON.stringify(fixture.record));
    const statePath = path.join(
      fixture.workshopRoot, "content", "production", "production-state.md"
    );
    const state = matter(await readFile(statePath, "utf8"));
    await writeFile(statePath, matter.stringify(state.content, {
      ...state.data,
      phase: "test-publishing",
      environment: "test"
    }));
    await expect(promoteImage(fixture.manifestPath, "assets/images/module/test.png", fixture.roots))
      .rejects.toThrow("complete local draft is approved");
  });

  it("rejects a candidate whose generated output identity was changed", async () => {
    const fixture = await standingCandidate();
    await writeFile(fixture.journalPath, JSON.stringify({
      ...fixture.record,
      output: { ...fixture.record.output, candidateHash: "b".repeat(64) }
    }));
    await expect(promoteImage(fixture.manifestPath, "assets/images/module/test.png", fixture.roots))
      .rejects.toThrow("generated candidate output");
  });

  it("rejects a candidate recorded under a superseded requirements baseline", async () => {
    const fixture = await standingCandidate();
    await writeFile(fixture.journalPath, JSON.stringify({
      ...fixture.record,
      requirementsHash: "b".repeat(64)
    }));
    await expect(promoteImage(fixture.manifestPath, "assets/images/module/test.png", fixture.roots))
      .rejects.toThrow("superseded requirements baseline");
  });

  it("rejects a hand-edited authorization record", async () => {
    const fixture = await standingCandidate();
    await writeFile(fixture.journalPath, JSON.stringify({
      ...fixture.record,
      request: { ...fixture.record.request, promptHash: "c".repeat(64) }
    }));
    await expect(promoteImage(fixture.manifestPath, "assets/images/module/test.png", fixture.roots))
      .rejects.toThrow("does not match its recorded request");
  });
});

describe("validateApprovedImageSidecars", () => {
  it("ignores sidecar-less static images in module public directories", async () => {
    const root = await temporaryRoot();
    const imagePath = path.join(
      root,
      "workshops",
      "demo",
      "content",
      "modules",
      "01-intro",
      "public",
      "images",
      "static.png"
    );
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(imagePath, onePixelPng);

    await expect(validateApprovedImageSidecars(root)).resolves.toBe(0);
  });

  it("validates approved images in module public directories", async () => {
    const root = await temporaryRoot();
    const workshopRoot = path.join(root, "workshops", "demo");
    const imagePath = path.join(
      workshopRoot,
      "content",
      "modules",
      "01-intro",
      "public",
      "images",
      "test.png"
    );
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(path.join(workshopRoot, "content", "prompt.txt"), "prompt");
    await writeFile(imagePath, onePixelPng);
    await writeFile(
      `${imagePath}.json`,
      JSON.stringify({
        schemaVersion: 1,
        id: "test-image",
        kind: "image",
        provider: "gpt-image-2",
        deployment: "test",
        promptHash: "0".repeat(64),
        source: "content/prompt.txt",
        createdAt: "2026-08-04T00:00:00.000Z",
        reviewStatus: "approved",
        location: "content/modules/01-intro/public/images/test.png",
        width: 1,
        height: 1
      })
    );

    await expect(validateApprovedImageSidecars(root)).resolves.toBe(1);
  });

  it("validates local deterministic provenance in module public directories", async () => {
    const root = await temporaryRoot();
    const workshopRoot = path.join(root, "workshops", "demo");
    const imagePath = path.join(
      workshopRoot,
      "content",
      "modules",
      "01-intro",
      "public",
      "images",
      "local.png"
    );
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(path.join(workshopRoot, "content", "review.md"), "review");
    await writeFile(imagePath, onePixelPng);
    await writeFile(
      `${imagePath}.json`,
      JSON.stringify({
        schemaVersion: 1,
        id: "local-image",
        kind: "local-deterministic-image",
        source: "content/review.md",
        createdAt: "2026-09-22T00:00:00.000Z",
        reviewStatus: "approved",
        location: "content/modules/01-intro/public/images/local.png",
        sha256: createHash("sha256").update(onePixelPng).digest("hex"),
        width: 1,
        height: 1,
        sourceCandidateSha256: "1".repeat(64),
        transformManifestSha256: "2".repeat(64),
        candidateAcceptanceDecision: "decision-1",
        publicationDecision: "decision-2"
      })
    );

    await expect(validateApprovedImageSidecars(root)).resolves.toBe(1);
  });

  it("rejects a local deterministic raster whose hash does not match", async () => {
    const root = await temporaryRoot();
    const workshopRoot = path.join(root, "workshops", "demo");
    const imagePath = path.join(
      workshopRoot,
      "content",
      "modules",
      "01-intro",
      "public",
      "images",
      "local.png"
    );
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(path.join(workshopRoot, "content", "review.md"), "review");
    await writeFile(imagePath, onePixelPng);
    await writeFile(
      `${imagePath}.json`,
      JSON.stringify({
        schemaVersion: 1,
        id: "local-image",
        kind: "local-deterministic-image",
        source: "content/review.md",
        createdAt: "2026-09-22T00:00:00.000Z",
        reviewStatus: "approved",
        location: "content/modules/01-intro/public/images/local.png",
        sha256: "0".repeat(64),
        width: 1,
        height: 1,
        sourceCandidateSha256: "1".repeat(64),
        transformManifestSha256: "2".repeat(64),
        candidateAcceptanceDecision: "decision-1",
        publicationDecision: "decision-2"
      })
    );

    await expect(validateApprovedImageSidecars(root)).rejects.toThrow(
      "sha256 does not match raster"
    );
  });

  it("rejects a public sidecar whose raster is missing", async () => {
    const root = await temporaryRoot();
    const workshopRoot = path.join(root, "workshops", "demo");
    const imagePath = path.join(
      workshopRoot,
      "content",
      "modules",
      "01-intro",
      "public",
      "images",
      "missing.png"
    );
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(path.join(workshopRoot, "content", "prompt.txt"), "prompt");
    await writeFile(
      `${imagePath}.json`,
      JSON.stringify({
        schemaVersion: 1,
        id: "missing-image",
        kind: "image",
        provider: "gpt-image-2",
        deployment: "test",
        promptHash: "0".repeat(64),
        source: "content/prompt.txt",
        createdAt: "2026-08-04T00:00:00.000Z",
        reviewStatus: "approved",
        location: "content/modules/01-intro/public/images/missing.png",
        width: 1,
        height: 1
      })
    );

    await expect(validateApprovedImageSidecars(root)).rejects.toThrow("ENOENT");
  });

  it("rejects candidate state in approved asset folders", async () => {
    const root = await temporaryRoot();
    const imagePath = path.join(root, "workshops", "demo", "assets", "images", "test.png");
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(imagePath, onePixelPng);
    await writeFile(
      `${imagePath}.json`,
      JSON.stringify({
        schemaVersion: 1,
        id: "test-image",
        kind: "image",
        provider: "gpt-image-2",
        deployment: "test",
        promptHash: "0".repeat(64),
        source: "content/prompt.txt",
        createdAt: "2026-08-04T00:00:00.000Z",
        reviewStatus: "candidate",
        location: "C:\\candidate\\test.png",
        width: 1,
        height: 1
      })
    );

    await expect(validateApprovedImageSidecars(root)).rejects.toThrow(
      "reviewStatus must be approved"
    );
  });

  it("rejects absolute approved locations", async () => {
    const root = await temporaryRoot();
    const imagePath = path.join(root, "workshops", "demo", "assets", "images", "test.png");
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(imagePath, onePixelPng);
    await writeFile(
      `${imagePath}.json`,
      JSON.stringify({
        schemaVersion: 1,
        id: "test-image",
        kind: "image",
        provider: "gpt-image-2",
        deployment: "test",
        promptHash: "0".repeat(64),
        source: "content/prompt.txt",
        createdAt: "2026-08-04T00:00:00.000Z",
        reviewStatus: "approved",
        location: "C:\\candidate\\test.png",
        width: 1,
        height: 1
      })
    );

    await expect(validateApprovedImageSidecars(root)).rejects.toThrow(
      "location must be a forward-slash path"
    );
  });

  it("rejects dimensions that do not match the approved raster", async () => {
    const root = await temporaryRoot();
    const workshopRoot = path.join(root, "workshops", "demo");
    const imagePath = path.join(workshopRoot, "assets", "images", "test.png");
    await mkdir(path.dirname(imagePath), { recursive: true });
    await mkdir(path.join(workshopRoot, "content"), { recursive: true });
    await writeFile(path.join(workshopRoot, "content", "prompt.txt"), "prompt");
    await writeFile(imagePath, onePixelPng);
    await writeFile(
      `${imagePath}.json`,
      JSON.stringify({
        schemaVersion: 1,
        id: "test-image",
        kind: "image",
        provider: "gpt-image-2",
        deployment: "test",
        promptHash: "0".repeat(64),
        source: "content/prompt.txt",
        createdAt: "2026-08-04T00:00:00.000Z",
        reviewStatus: "approved",
        location: "assets/images/test.png",
        width: 2,
        height: 1
      })
    );

    await expect(validateApprovedImageSidecars(root)).rejects.toThrow(
      "do not match manifest 2x1"
    );
  });
});