import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import matter from "gray-matter";
import { PNG } from "pngjs";
import { afterEach, describe, expect, it } from "vitest";
import { referenceSheetReuseSchema } from "@ghcp/content-schema";
import { repositoryRoot } from "./paths.js";
import { canonical, sha256, textSha256 } from "./production-records.js";
import { exportPublicRelease } from "./release.js";
import {
  portableImageEvidenceBytes, referenceSheetReleaseSidecar, reuseReferenceSheets, validateReferenceSheetSidecars
} from "./reference-reuse.js";

const temporaryRoots: string[] = [];
const run = promisify(execFile);
afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map(root => rm(root, { recursive: true, force: true })));
});

type FixtureOptions = {
  changedPixels?: boolean;
  cropped?: boolean;
  unsafeSvg?: boolean;
  externalSvg?: boolean;
  wrongViewBox?: boolean;
  roleWidth?: number;
};

async function fixture(options: FixtureOptions = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-reference-reuse-"));
  temporaryRoots.push(root);
  const roots = {
    repositoryRoot: root,
    workshopsRoot: path.join(root, "workshops"),
    candidatesRoot: path.join(root, "generated", "candidates")
  };
  const workshopRoot = path.join(roots.workshopsRoot, "demo");
  const candidatePrefix = "generated/candidates/demo/module/cycle";
  const candidateRelative = `${candidatePrefix}/images/view.png`;
  const candidateManifest = `${candidateRelative}.json`;
  const isolationRelative = `${candidatePrefix}/sheets/isolation.png`;
  const svgRelative = `${candidatePrefix}/sheets/sheet.svg`;
  const previewRelative = `${candidatePrefix}/sheets/sheet.png`;
  const planRelative = `${candidatePrefix}/reuse-plan.json`;
  const grantRelative = "content/modules/01-module/media/reference-reuse.json";
  const evidencePrefix = "content/modules/01-module/media/reference-reuse-evidence";
  const output = "content/modules/01-module/media/references/reference-sheets/character.svg";
  const source = "content/source.json";
  const reference = "content/reference.png";
  const prompt = "A confirmed character";
  const asPath = (relative: string) => path.join(root, ...relative.split("/"));
  const write = async (relative: string, value: string | Buffer) => {
    const file = asPath(relative);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, value);
  };

  const png = new PNG({ width: 2, height: 2 });
  for (let i = 0; i < png.data.length; i += 4) {
    png.data[i] = 30;
    png.data[i + 1] = 60;
    png.data[i + 2] = 90;
    png.data[i + 3] = 255;
  }
  const sourceBytes = PNG.sync.write(png);
  png.data[3] = 0;
  png.data[11] = 0;
  if (options.changedPixels) png.data[4] = 31;
  const isolation = PNG.sync.write(png);
  const viewBox = options.cropped || options.wrongViewBox ? "0 0 1 1" : "1 0 1 2";
  const href = options.externalSvg ? "https://example.invalid/image.png" : `data:image/png;base64,${isolation.toString("base64")}`;
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg"><title>Character</title>${options.unsafeSvg ? "<script/>" : ""}<svg width="2" height="2" viewBox="${viewBox}"><image width="2" height="2" href="${href}"/></svg></svg>`);
  const referenceBytes = Buffer.from("reference");
  const workflow = Buffer.from("workflow");
  const request = {
    kind: "generate-image",
    workshopId: "demo",
    moduleId: "module",
    cycleId: "cycle",
    assetId: "view",
    provider: "comfyui-qwen21",
    deployment: "test",
    endpoint: "http://127.0.0.1:8188",
    source,
    sourceHash: sha256(workflow),
    promptHash: sha256(prompt),
    referencePath: `workshops/demo/${reference}`,
    referenceHash: sha256(referenceBytes),
    width: 2,
    height: 2,
    outputFormat: "png",
    candidates: 1,
    variants: 1
  };
  const requestHash = sha256(canonical(request));
  const authorityHash = "a".repeat(64);
  const candidate = {
    schemaVersion: 1,
    id: "view",
    kind: "image",
    provider: request.provider,
    deployment: request.deployment,
    promptHash: request.promptHash,
    prompt,
    source,
    createdAt: "2026-01-01T00:00:00.000Z",
    reviewStatus: "candidate",
    location: candidateRelative,
    width: 2,
    height: 2,
    inputReference: { path: request.referencePath, hash: request.referenceHash, contentType: "image/png" },
    generationAuthorization: {
      initiative: "requirements-demo",
      envelopeId: "standing-test",
      envelopeHash: authorityHash,
      decisionId: "standing-image-policy",
      requestHash
    }
  };
  const candidateBytes = Buffer.from(JSON.stringify(candidate, null, 2));
  const receipt = {
    schemaVersion: 1,
    authority: "lifecycle-v3-image-batch",
    authorityHash,
    requirementsHash: "b".repeat(64),
    request,
    requestHash,
    status: "succeeded",
    reservedAt: "2026-01-01T00:00:01.000Z",
    completedAt: "2026-01-01T00:01:00.000Z",
    output: {
      candidateHash: sha256(sourceBytes),
      manifestHash: sha256(candidateBytes),
      candidatePath: candidateRelative,
      manifestPath: candidateManifest
    }
  };
  const receiptBytes = Buffer.from(JSON.stringify(receipt, null, 2));
  const receiptRelative = `${candidatePrefix}/authorizations/standing-image--${requestHash}.json`;
  const evidence = portableImageEvidenceBytes(candidate, receipt, sha256(receiptBytes), sha256(candidateBytes));
  const view = {
    assetId: "view",
    requestHash,
    sourceRequirementsHash: receipt.requirementsHash,
    receiptSha256: sha256(receiptBytes),
    candidateSha256: sha256(sourceBytes),
    candidateManifestSha256: sha256(candidateBytes),
    isolationSha256: sha256(isolation),
    evidenceSha256: sha256(evidence),
    evidencePath: `${evidencePrefix}/receipts/view.json`,
    sourcePath: `${evidencePrefix}/sources/view.png`,
    crop: options.cropped ? [0, 0, 1, 1] : [1, 0, 2, 2]
  };
  const grant = {
    schemaVersion: 1,
    kind: "confirmed-reference-sheet-reuse",
    workshop: "demo",
    module: "module",
    views: [view],
    sheets: [{ id: "character", location: output, svgSha256: sha256(svg), previewSha256: sha256(sourceBytes), views: ["view"] }]
  };
  const grantBytes = Buffer.from(`${JSON.stringify(grant, null, 2)}\n`);
  const requirements = matter.stringify("", {
    schemaVersion: 1,
    kind: "workshop-requirements",
    id: "demo",
    title: "Demo",
    description: "A reference reuse test",
    audience: ["Developers"],
    durationMinutes: 60,
    outcomes: ["Explain the workflow"],
    modules: [{ id: "module", title: "Module", minutes: 60, outcomes: ["Explain images"] }],
    imageRoles: [{
      id: "view",
      module: "module",
      purpose: "Character reference",
      request: {
        provider: request.provider,
        deployment: request.deployment,
        endpoint: request.endpoint,
        source,
        sourceHash: request.sourceHash,
        promptHashes: [request.promptHash],
        referencePath: reference,
        referenceHash: request.referenceHash,
        width: options.roleWidth ?? 2,
        height: 2,
        outputFormat: "png"
      }
    }],
    imageReuseManifests: [{ module: "module", path: grantRelative, sha256: sha256(grantBytes) }],
    acceptanceCriteria: ["Review the complete local output"]
  });
  const state = matter.stringify("", {
    schemaVersion: 1, kind: "production-state", workshop: "demo", lifecycleVersion: 3,
    phase: "drafting", sessionStatus: "active", activeTracks: [], currentInitiative: "requirements-demo",
    contextRefs: [], currentOwner: "Producer", nextOwner: "Coordinator", nextHumanGate: "Local approval",
    resumeTask: "produce-local-draft", approvedArtifacts: [], blockers: [],
    timing: { totalMinutes: 60, allocatedMinutes: 60, source }, paidGeneration: "not-approved",
    releaseState: "not-ready", branch: "test", lastValidatedCommit: "a".repeat(40),
    checkpointId: "checkpoint-initial", updatedAt: "2026-01-01T00:00:00.000Z",
    requirements: { path: "requirements.md", sha256: textSha256(requirements) },
    environment: "local", imageBatch: { limit: 3, used: 0 }
  });
  const plan = {
    schemaVersion: 1,
    kind: "local-reference-sheet-reuse-plan",
    views: [{ assetId: "view", manifestPath: candidateManifest, isolationPath: isolationRelative }],
    sheets: [{ id: "character", svgPath: svgRelative, previewPath: previewRelative }]
  };
  await write(`workshops/demo/${source}`, workflow);
  await write(`workshops/demo/${reference}`, referenceBytes);
  await write(`workshops/demo/${grantRelative}`, grantBytes);
  await write("workshops/demo/requirements.md", requirements);
  await write("workshops/demo/content/production/production-state.md", state);
  await write("workshops/demo/content/modules/01-module/module.md", matter.stringify("", { id: "module", assets: [output] }));
  await write(candidateRelative, sourceBytes);
  await write(candidateManifest, candidateBytes);
  await write(receiptRelative, receiptBytes);
  await write(isolationRelative, isolation);
  await write(svgRelative, svg);
  await write(previewRelative, sourceBytes);
  await write(planRelative, JSON.stringify(plan));
  return {
    roots, root, workshopRoot, grant, grantRelative, planRelative, candidateRelative, candidateManifest,
    receiptRelative, isolationRelative, svgRelative, previewRelative, source, reference, output, view,
    write, asPath
  };
}

describe("confirmed reference-sheet reuse", () => {
  it("preserves hash-bound workflow bytes across Git line-ending settings", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-reference-git-"));
    temporaryRoots.push(root);
    const source = "workshops/ghcp-agentic-hack/content/modules/01-foundations/media/comfyui-intro-character-references.json";
    const workflow = '{\r\n  "nodes": []\r\n}\r\n';
    await mkdir(path.dirname(path.join(root, ...source.split("/"))), { recursive: true });
    await writeFile(path.join(root, ".gitattributes"), await readFile(path.join(repositoryRoot, ".gitattributes")));
    await writeFile(path.join(root, ...source.split("/")), workflow);
    await run("git", ["init", "--quiet"], { cwd: root });
    await run("git", ["-c", "core.autocrlf=true", "add", "--", ".gitattributes", source], { cwd: root });

    const blob = await run("git", ["show", `:${source}`], { cwd: root });
    expect(blob.stdout).toBe(workflow);

    const checkout = path.join(root, "checkout");
    await mkdir(checkout);
    await run("git", ["-c", "core.autocrlf=input", "checkout-index", "-a", "--prefix", `${checkout}${path.sep}`], { cwd: root });
    expect(await readFile(path.join(checkout, ...source.split("/")), "utf8")).toBe(workflow);
  }, 30_000);

  it("integrates exact reviewed sheets without changing receipts or marking sources approved", async () => {
    const f = await fixture();
    const originalReceipt = await readFile(f.asPath(f.receiptRelative));
    const originalManifest = await readFile(f.asPath(f.candidateManifest));
    await expect(reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots))
      .resolves.toEqual({ sheets: [f.output], views: 1 });
    expect(await readFile(f.asPath(f.receiptRelative))).toEqual(originalReceipt);
    expect(await readFile(f.asPath(f.candidateManifest))).toEqual(originalManifest);
    const evidence = JSON.parse(await readFile(path.join(f.workshopRoot, ...f.view.evidencePath.split("/")), "utf8"));
    expect(evidence.candidate.reviewStatus).toBe("candidate");
    expect(evidence.candidate).not.toHaveProperty("location");
    expect(evidence.receipt.output).not.toHaveProperty("candidatePath");
    expect(evidence.receipt.output).not.toHaveProperty("manifestPath");
    expect(JSON.stringify(evidence)).not.toContain(f.root);
    expect(await readFile(path.join(f.workshopRoot, ...f.output.split("/"))))
      .toEqual(await readFile(f.asPath(f.svgRelative)));
    const sidecar = JSON.parse(await readFile(path.join(f.workshopRoot, ...`${f.output}.json`.split("/")), "utf8"));
    const published = await referenceSheetReleaseSidecar(f.workshopRoot, sidecar);
    expect(published.sourceManifestSha256).toBe(sha256(await readFile(path.join(f.workshopRoot, ...f.grantRelative.split("/")))));
    expect(published.location).toBe(f.output);
    expect(published).not.toHaveProperty("source");
    expect(JSON.stringify(published)).not.toContain("reference-reuse-evidence");
    await expect(validateReferenceSheetSidecars(f.root)).resolves.toBe(1);
    await expect(reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots)).rejects.toThrow("already exists");
  });

  it.each([
    ["changed candidate", "candidateRelative"],
    ["changed candidate manifest", "candidateManifest"],
    ["changed isolation", "isolationRelative"],
    ["changed sheet", "svgRelative"],
    ["changed preview", "previewRelative"]
  ] as const)("rejects a %s without writing outputs", async (_label, key) => {
    const f = await fixture();
    await writeFile(f.asPath(f[key]), "altered");
    await expect(reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots)).rejects.toThrow();
    await expect(readFile(path.join(f.workshopRoot, ...f.output.split("/")))).rejects.toThrow();
  });

  it("rejects a reserved receipt rather than treating an uncertain output as succeeded", async () => {
    const f = await fixture();
    const receipt = JSON.parse(await readFile(f.asPath(f.receiptRelative), "utf8"));
    receipt.status = "reserved";
    delete receipt.output;
    await writeFile(f.asPath(f.receiptRelative), JSON.stringify(receipt));
    await expect(reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots)).rejects.toThrow(/succeeded/);
    await expect(readFile(path.join(f.workshopRoot, ...f.output.split("/")))).rejects.toThrow();
  });

  it.each([
    [{ changedPixels: true }, /changes visible source pixels/],
    [{ cropped: true }, /crop clips visible pixels/],
    [{ unsafeSvg: true }, /Unsupported reference sheet element/],
    [{ externalSvg: true }, /Unsafe reference sheet attribute/],
    [{ wrongViewBox: true }, /crop or image geometry differs/],
    [{ roleWidth: 3 }, /does not match its declared request constraints/]
  ])("rejects unsafe or inconsistent selections %#", async (options, error) => {
    const f = await fixture(options);
    await expect(reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots)).rejects.toThrow(error);
  });

  it("rejects credential fields and absolute paths in portable evidence", async () => {
    const f = await fixture();
    const candidate = JSON.parse(await readFile(f.asPath(f.candidateManifest), "utf8"));
    const receipt = JSON.parse(await readFile(f.asPath(f.receiptRelative), "utf8"));
    candidate.providerProvenance = { token: "not-for-publication" };
    expect(() => portableImageEvidenceBytes(candidate, receipt, "a".repeat(64), "b".repeat(64))).toThrow(/credential/);
    candidate.providerProvenance = { details: "Saved under C:\\Users\\someone\\private" };
    expect(() => portableImageEvidenceBytes(candidate, receipt, "a".repeat(64), "b".repeat(64))).toThrow(/absolute path/);
  });

  it("rejects duplicate or unassigned view roles", async () => {
    const f = await fixture();
    expect(referenceSheetReuseSchema.safeParse({ ...f.grant, views: [f.view, f.view] }).success).toBe(false);
    expect(referenceSheetReuseSchema.safeParse({
      ...f.grant, sheets: [{ ...f.grant.sheets[0], views: ["missing"] }]
    }).success).toBe(false);
  });

  it.each(["source", "reference"] as const)("rejects a changed current %s", async key => {
    const f = await fixture();
    await writeFile(path.join(f.workshopRoot, ...f[key].split("/")), "changed");
    await expect(reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots)).rejects.toThrow(/changed/);
  });

  it("rejects escaped output paths even through a directory symlink", async () => {
    const f = await fixture();
    const target = path.join(f.workshopRoot, "content", "modules", "01-module", "media", "references");
    const outside = path.join(f.root, "outside");
    await mkdir(path.dirname(target), { recursive: true });
    await mkdir(outside, { recursive: true });
    await symlink(outside, target, "junction");
    await expect(reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots)).rejects.toThrow(/symlink/);
  });

  it.each(["sourcePath", "evidencePath", "output"] as const)("detects changed integrated %s", async key => {
    const f = await fixture();
    await reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots);
    const relative = key === "output" ? f.output : f.view[key];
    await writeFile(path.join(f.workshopRoot, ...relative.split("/")), "changed");
    await expect(validateReferenceSheetSidecars(f.root)).rejects.toThrow();
  });

  it("detects an omitted integration even if its asset declaration was also removed", async () => {
    const f = await fixture();
    await reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots);
    await rm(path.join(f.workshopRoot, ...f.output.split("/")));
    await rm(path.join(f.workshopRoot, ...`${f.output}.json`.split("/")));
    await writeFile(
      path.join(f.workshopRoot, "content", "modules", "01-module", "module.md"),
      matter.stringify("", { id: "module", assets: [] })
    );
    await expect(validateReferenceSheetSidecars(f.root)).rejects.toThrow();
  });

  it("validates a sanitized exact-commit public projection without source evidence", async () => {
    const f = await fixture();
    await reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots);
    const sidecarPath = path.join(f.workshopRoot, ...`${f.output}.json`.split("/"));
    const privateSidecar = JSON.parse(await readFile(sidecarPath, "utf8"));
    const publicSidecar = await referenceSheetReleaseSidecar(f.workshopRoot, privateSidecar);
    const requirementsPath = path.join(f.workshopRoot, "requirements.md");
    const requirements = matter(await readFile(requirementsPath, "utf8"));
    const { imageReuseManifests: _privateReuseManifests, ...publicData } = requirements.data;
    await writeFile(requirementsPath, matter.stringify(requirements.content, publicData));
    await writeFile(sidecarPath, JSON.stringify(publicSidecar));
    await rm(path.join(f.workshopRoot, ...f.grantRelative.split("/")));
    await rm(path.join(f.workshopRoot, ...f.view.sourcePath.split("/")));
    await rm(path.join(f.workshopRoot, ...f.view.evidencePath.split("/")));
    await expect(validateReferenceSheetSidecars(f.root)).rejects.toThrow();
    await writeFile(path.join(f.root, "release-provenance.json"), JSON.stringify({
      releaseId: "demo-release", sourceCommit: "a".repeat(40), workshops: ["demo"]
    }));
    await expect(validateReferenceSheetSidecars(f.root)).resolves.toBe(1);
    publicSidecar.views[0]!.isolationSha256 = "f".repeat(64);
    await writeFile(sidecarPath, JSON.stringify(publicSidecar));
    await expect(validateReferenceSheetSidecars(f.root)).rejects.toThrow(/embedded image differs/);
  });

  it("exports a pinned public sheet without private sources or dangling manifest paths", async () => {
    const f = await fixture();
    await reuseReferenceSheets("demo", f.grantRelative, f.planRelative, f.roots);
    const timing = {
      instructionMinutes: 60, missionMinutes: 0, discussionMinutes: 0, mediaPlaybackMinutes: 0,
      setupAndTransitionsMinutes: 0, breaksMinutes: 0, contingencyMinutes: 0
    };
    await f.write("workshops/demo/workshop.md", matter.stringify("# Demo\n", {
      schemaVersion: 1, kind: "workshop", id: "demo", title: "Demo", lifecycleVersion: 3,
      description: "Demo workshop", format: "custom", duration: "60 minutes", totalMinutes: 60,
      schedule: timing, runOfShow: [{ id: "module", type: "module", title: "Module", minutes: 60, module: "module" }],
      level: "basic", audience: ["Developers"], modules: ["module"], lastReviewed: "2026-01-01"
    }));
    await f.write("workshops/demo/content/modules/01-module/module.md", matter.stringify("# Module\n", {
      schemaVersion: 1, kind: "module", id: "module", title: "Module", description: "Demo module",
      duration: "60 minutes", totalMinutes: 60, timing, objectives: ["Explain the workflow"],
      slides: "content/modules/01-module/slides.md", sourceDocuments: ["requirements.md"], assets: [f.output]
    }));
    await f.write("workshops/demo/content/modules/01-module/slides.md", "# Demo\n");
    await f.write(".gitignore", "generated/\nnode_modules/\n");
    await f.write(".gitattributes", "");
    await f.write("package.json", JSON.stringify({ private: true, scripts: {} }));
    await f.write("pnpm-lock.yaml", "lockfileVersion: '9.0'\n");
    await f.write("pnpm-workspace.yaml", "packages: []\n");
    await f.write("tsconfig.base.json", "{}\n");
    await f.write("apps/decks/README.md", "# Decks\n");
    await f.write("apps/portal/src/main.ts", "export {};\n");
    await f.write("packages/README.md", "# Packages\n");
    await f.write("scripts/README.md", "# Scripts\n");
    await f.write(".github/public-release/pages.yml", "name: Pages\n");
    await f.write(".github/public-release/README.md", "# Release\n");
    const git = async (...args: string[]) => run("git", args, { cwd: f.root });
    await git("init");
    await git("config", "user.email", "test@example.com");
    await git("config", "user.name", "Test");
    await git("add", ".");
    await git("commit", "-m", "Review fixture");
    const commit = (await git("rev-parse", "HEAD")).stdout.trim();
    await f.write("releases/demo-release.md", matter.stringify("", {
      schemaVersion: 1, kind: "release-manifest", id: "demo-release", title: "Demo release",
      status: "approved", commit, createdAt: "2026-01-01T00:00:00.000Z",
      approvedBy: "Test owner", approvedAt: "2026-01-01T00:01:00.000Z",
      workshops: [{ id: "demo", modules: ["module"] }]
    }));
    await f.write(`workshops/demo/content/production/approvals/test--${commit}.json`, JSON.stringify({
      schemaVersion: 1, kind: "environment-approval", workshop: "demo", environment: "test",
      requirementsHash: textSha256(await readFile(path.join(f.workshopRoot, "requirements.md"))),
      commit, approvedBy: "Test owner", approvedAt: "2026-01-01T00:01:00.000Z",
      url: "https://private.example.test", modules: ["module"]
    }));
    await git("add", "releases/demo-release.md", "workshops/demo/content/production/approvals");
    await git("commit", "-m", "Approve fixture");
    const output = await exportPublicRelease("releases/demo-release.md", "public-export", f.root);
    const publicRoot = path.join(output, "workshops", "demo");
    const publicSidecar = JSON.parse(await readFile(path.join(publicRoot, ...`${f.output}.json`.split("/")), "utf8"));
    expect(publicSidecar.kind).toBe("confirmed-reference-sheet-release");
    expect(publicSidecar).not.toHaveProperty("source");
    expect(matter(await readFile(path.join(publicRoot, "requirements.md"), "utf8")).data)
      .not.toHaveProperty("imageReuseManifests");
    await expect(readFile(path.join(publicRoot, ...f.grantRelative.split("/")))).rejects.toThrow();
    await expect(readFile(path.join(publicRoot, ...f.view.sourcePath.split("/")))).rejects.toThrow();
    await expect(readFile(path.join(publicRoot, ...f.view.evidencePath.split("/")))).rejects.toThrow();
    const publicFiles = await readdir(publicRoot, { recursive: true });
    expect(publicFiles.filter(file => /reference-reuse-(?:evidence|manifest)/.test(file))).toEqual([]);
    await expect(validateReferenceSheetSidecars(output)).resolves.toBe(1);
  }, 60000);
});
