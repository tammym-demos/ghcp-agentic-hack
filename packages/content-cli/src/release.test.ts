import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { loadCatalog, releaseManifestSchema } from "@ghcp/content-schema";
import { repositoryRoot } from "./paths.js";
import {
  approveRelease,
  exportPublicRelease,
  filterCatalogForRelease,
  normalizeWorkflowManifestPath,
  recordReleaseDeployment,
  recordReleaseVerification,
  resolveLatestApprovedManifest,
  validateApprovedRelease,
  validateRollbackTarget
} from "./release.js";

const execFileAsync = promisify(execFile);
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

it("normalizes Windows manifest paths for GitHub Actions", () => {
  expect(normalizeWorkflowManifestPath("releases\\workshop-portfolio.md"))
    .toBe("releases/workshop-portfolio.md");
});

describe("portfolio release selection", () => {
  it("includes only explicitly selected modules", async () => {
    const catalog = await loadCatalog(repositoryRoot);
    const workshop = catalog.workshops[0]!;
    const moduleId = workshop.modules[0]!.data.id;
    const release = releaseManifestSchema.parse({
      schemaVersion: 1,
      kind: "release-manifest",
      id: "foundations-review",
      title: "Foundations review",
      status: "draft",
      commit: "0".repeat(40),
      createdAt: "2026-08-04T18:00:00.000Z",
      workshops: [{ id: workshop.workshop.data.id, modules: [moduleId] }]
    });

    const selected = filterCatalogForRelease(catalog, release);

    expect(selected.workshops).toHaveLength(1);
    expect(selected.workshops[0]?.workshop.data.modules).toEqual([moduleId]);
    expect(selected.workshops[0]?.modules.map((module) => module.data.id)).toEqual([moduleId]);
  });

  it("rejects modules that are not in the selected workshop", async () => {
    const catalog = await loadCatalog(repositoryRoot);
    const release = releaseManifestSchema.parse({
      schemaVersion: 1,
      kind: "release-manifest",
      id: "invalid-release",
      title: "Invalid release",
      status: "draft",
      commit: "0".repeat(40),
      createdAt: "2026-08-04T18:00:00.000Z",
      workshops: [{ id: catalog.workshops[0]!.workshop.data.id, modules: ["missing-module"] }]
    });

    expect(() => filterCatalogForRelease(catalog, release)).toThrow("unknown module");
  });

  it("keeps an approved manifest valid when unrelated content changes after the reviewed commit", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-release-"));
    temporaryDirectories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "content.md"), "reviewed");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Reviewed content"], { cwd: root });
    const commit = (await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim();
    await mkdir(path.join(root, "releases"));
    const manifest = `---
schemaVersion: 1
kind: release-manifest
id: test-release
title: Test release
status: approved
commit: ${commit}
createdAt: 2026-08-04T18:00:00.000Z
approvedBy: Workshop owner
approvedAt: 2026-08-04T18:05:00.000Z
workshops:
  - id: test-workshop
    modules:
      - introduction
---
`;
    await writeFile(path.join(root, "releases", "test-release.md"), manifest);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Approve release"], { cwd: root });

    await expect(validateApprovedRelease("releases/test-release.md", root)).resolves.toMatchObject({
      id: "test-release"
    });

    // An unrelated merge must not invalidate an already approved manifest, because the export is
    // pinned to the reviewed commit rather than to the working tree.
    await writeFile(path.join(root, "content.md"), "unrelated maintenance change");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Unrelated maintenance change"], { cwd: root });
    await expect(validateApprovedRelease("releases/test-release.md", root)).resolves.toMatchObject({
      id: "test-release"
    });
  });

  it("rejects a manifest whose commit is not an ancestor of the checked-out commit", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-release-ancestry-"));
    temporaryDirectories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "content.md"), "reviewed");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Reviewed content"], { cwd: root });
    await mkdir(path.join(root, "releases"));
    await writeFile(
      path.join(root, "releases", "test-release.md"),
      `---
schemaVersion: 1
kind: release-manifest
id: test-release
title: Test release
status: approved
commit: ${"a".repeat(40)}
createdAt: 2026-08-04T18:00:00.000Z
approvedBy: Workshop owner
approvedAt: 2026-08-04T18:05:00.000Z
workshops:
  - id: test-workshop
    modules:
      - introduction
---
`
    );
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Add release manifest"], { cwd: root });

    await expect(validateApprovedRelease("releases/test-release.md", root)).rejects.toThrow(
      "is not an ancestor of"
    );
  });

  it.each([true, false])("exports selected content from pinned snapshots (declarations: %s)", async (hasDeclarations) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-public-export-"));
    temporaryDirectories.push(root);
    await mkdir(path.join(root, ".github", "public-release"), { recursive: true });
    await mkdir(path.join(root, "apps", "portal", "src"), { recursive: true });
    await mkdir(path.join(root, "packages"), { recursive: true });
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await mkdir(path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "public"), {
      recursive: true
    });
    await mkdir(path.join(root, "workshops", "test-workshop", "content", "production"), { recursive: true });
    await mkdir(path.join(root, "workshops", "test-workshop", "content", "storyboards", "intro", "scenes"), {
      recursive: true
    });
    await mkdir(path.join(root, "workshops", "test-workshop", "content", "characters", "guide"), {
      recursive: true
    });
    await mkdir(path.join(root, "workshops", "test-workshop", "assets"), { recursive: true });
    await writeFile(path.join(root, "package.json"), JSON.stringify({
      private: true,
      scripts: { test: "pnpm -r test && pnpm test:foundations", "test:foundations": "node review/contract.test.mjs" }
    }));
    await writeFile(path.join(root, ".gitignore"), "node_modules/\n");
    await writeFile(path.join(root, ".gitattributes"), "*.mp4 filter=lfs diff=lfs merge=lfs -text\n");
    await writeFile(path.join(root, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n");
    await writeFile(path.join(root, "pnpm-workspace.yaml"), "packages: []\n");
    await writeFile(path.join(root, "tsconfig.base.json"), "{}\n");
    await writeFile(path.join(root, "scripts", "preview-local.mjs"), "");
    // Git does not track empty directories, so a worktree-pinned export only sees committed files.
    await writeFile(path.join(root, "apps", "portal", "src", "main.ts"), "export {};\n");
    await writeFile(path.join(root, "packages", "README.md"), "# Packages\n");
    await mkdir(path.join(root, "packages", "example", "private-tests"), { recursive: true });
    await writeFile(path.join(root, "packages", "example", "private-tests", "archive.test.mjs"), "private history");
    await writeFile(path.join(root, ".github", "public-release", "pages.yml"), "name: Public Pages\n");
    await writeFile(path.join(root, ".github", "public-release", "README.md"), "# Public release\n");
    if (hasDeclarations) await writeFile(path.join(root, ".github", "public-release", "export-files.json"),
      JSON.stringify({
        schemaVersion: 1,
        modules: {
          "test-workshop/introduction": {
            files: [
              "content/modules/01-intro/components/Wrapper.vue",
              "content/modules/01-intro/motion/Scene.vue",
              "content/modules/01-intro/motion/scene.css",
              "content/modules/01-intro/motion/runtime.test.mjs"
            ],
            tests: ["content/modules/01-intro/motion/runtime.test.mjs"]
          },
          "test-workshop/not-selected": { files: ["not-present.vue"], tests: [] }
        },
        workshops: {}
      }));
    const moduleRoot = path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro");
    await mkdir(path.join(moduleRoot, "components"));
    await mkdir(path.join(moduleRoot, "motion"));
    await mkdir(path.join(moduleRoot, "review"));
    await writeFile(path.join(moduleRoot, "components", "Wrapper.vue"),
      '<script setup>import Scene from "../motion/Scene.vue";</script><template><Scene /></template>');
    await writeFile(path.join(moduleRoot, "motion", "Scene.vue"), '<style src="./scene.css"></style>');
    await writeFile(path.join(moduleRoot, "motion", "scene.css"), ".scene { color: blue; }");
    await writeFile(path.join(moduleRoot, "motion", "runtime.test.mjs"),
      'import test from "node:test"; test("portable", () => {});');
    await writeFile(path.join(moduleRoot, "motion", "private-proof.md"), "private proof notes");
    await writeFile(path.join(moduleRoot, "review", "screenshot.png"), "private evidence");
    await writeFile(
      path.join(root, "workshops", "test-workshop", "workshop.md"),
      `---
schemaVersion: 1
kind: workshop
id: test-workshop
title: Test Workshop
lifecycleVersion: 2
description: Test workshop
format: custom
duration: 30 minutes
totalMinutes: 30
schedule:
  instructionMinutes: 30
  missionMinutes: 0
  discussionMinutes: 0
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 0
  contingencyMinutes: 0
runOfShow:
  - id: introduction
    type: module
    title: Introduction
    minutes: 30
    module: introduction
level: basic
audience:
  - Developers
modules:
  - introduction
lastReviewed: 2026-08-05
---

# Test Workshop
`
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "module.md"),
      `---
schemaVersion: 1
kind: module
id: introduction
title: Introduction
description: Introduction module
duration: 30 minutes
totalMinutes: 30
timing:
  instructionMinutes: 30
  missionMinutes: 0
  discussionMinutes: 0
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 0
  contingencyMinutes: 0
objectives:
  - Learn the introduction
slides: content/modules/01-intro/slides.md
sourceDocuments:
  - content/modules/01-intro/source.md
  - content/storyboards/intro/storyboard.md
assets:
  - assets/diagram.txt
status: published
---
`
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "slides.md"),
      "# Introduction"
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "style.css"),
      ".slidev-layout { color: rebeccapurple; }"
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "source.md"),
      "# Source"
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "public", "poster.txt"),
      "poster"
    );
    await writeFile(path.join(root, "workshops", "test-workshop", "assets", "diagram.txt"), "diagram");
    await writeFile(
      path.join(root, "workshops", "test-workshop", "assets", "diagram.txt.json"),
      JSON.stringify({
        schemaVersion: 1,
        id: "diagram",
        kind: "image",
        provider: "gpt-image-2",
        deployment: "test",
        promptHash: "0".repeat(64),
        source: "content/modules/01-intro/prompt.txt",
        createdAt: "2026-08-05T18:00:00.000Z",
        reviewStatus: "approved",
        location: "assets/diagram.txt"
      })
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "prompt.txt"),
      "Generate a diagram"
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "storyboards", "intro", "storyboard.md"),
      `---
schemaVersion: 1
kind: storyboard
id: intro
title: Intro Storyboard
purpose: Explain the introduction
targetDurationSeconds: 4
aspectRatio: "16:9"
characters:
  - content/characters/guide/character.md
scenes:
  - content/storyboards/intro/scenes/opening.md
status: published
---
`
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "storyboards", "intro", "scenes", "opening.md"),
      `---
schemaVersion: 1
kind: scene
id: opening
title: Opening
durationSeconds: 4
visualDirection: Open the workshop
status: published
---
`
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "characters", "guide", "character.md"),
      `---
schemaVersion: 1
kind: character
id: guide
title: Guide
description: Workshop guide
visualTraits:
  - Clear silhouette
continuityRules:
  - Keep the same clothing
referenceImages:
  - assets/diagram.txt
status: published
---
`
    );
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "production", "production-state.md"),
      `---
schemaVersion: 1
kind: production-state
workshop: test-workshop
lifecycleVersion: 2
phase: release-review
sessionStatus: awaiting-human
currentInitiative: public-release
currentOwner: Test
nextOwner: Test
nextHumanGate: Approve release
resumeTask: approve-release
timing:
  totalMinutes: 30
  allocatedMinutes: 30
  source: workshop.md
paidGeneration: not-approved
releaseState: approved
branch: main
lastValidatedCommit: "${"0".repeat(40)}"
checkpointId: public-release
updatedAt: 2026-08-05T18:00:00.000Z
---
`
    );
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Reviewed content"], { cwd: root });
    const commit = (await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim();
    await mkdir(path.join(root, "releases"));
    await writeFile(
      path.join(root, "releases", "test-release.md"),
      `---
schemaVersion: 1
kind: release-manifest
id: test-release
title: Test release
status: approved
commit: ${commit}
createdAt: 2026-08-05T18:00:00.000Z
approvedBy: Workshop owner
approvedAt: 2026-08-05T18:05:00.000Z
workshops:
  - id: test-workshop
    modules:
      - introduction
---
`
    );
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Approve release"], { cwd: root });

    // A later checkout declaration must not opt a legacy pinned snapshot into the new route.
    if (!hasDeclarations) await writeFile(
      path.join(root, ".github", "public-release", "export-files.json"), "{"
    );
    const output = await exportPublicRelease("releases/test-release.md", "public-export", root);
    const exportedCatalog = await loadCatalog(output);
    const exportedWorkshop = await readFile(
      path.join(output, "workshops", "test-workshop", "workshop.md"),
      "utf8"
    );

    expect(exportedCatalog.workshops[0]?.modules.map((module) => module.data.id)).toEqual(["introduction"]);
    expect(exportedWorkshop).not.toContain("lifecycleVersion");
    for (const file of hasDeclarations
      ? ["components/Wrapper.vue", "motion/Scene.vue", "motion/scene.css", "motion/runtime.test.mjs"] : []) {
      const relative = path.join("workshops", "test-workshop", "content", "modules", "01-intro", file);
      expect(await readFile(path.join(output, relative))).toEqual(await readFile(path.join(root, relative)));
    }
    for (const file of [
      "packages/example/private-tests/archive.test.mjs",
      "workshops/test-workshop/content/modules/01-intro/motion/private-proof.md",
      "workshops/test-workshop/content/modules/01-intro/review/screenshot.png"
    ]) await expect(readFile(path.join(output, file))).rejects.toThrow();
    const scripts = JSON.parse(await readFile(path.join(output, "package.json"), "utf8")).scripts;
    expect(scripts).toEqual(hasDeclarations ? {
      test: 'pnpm -r test && node --test "workshops/test-workshop/content/modules/01-intro/motion/runtime.test.mjs"'
    } : {
      test: "pnpm -r test && pnpm test:foundations", "test:foundations": "node review/contract.test.mjs"
    });
    if (hasDeclarations) await expect(execFileAsync(process.execPath, ["--test",
      "workshops/test-workshop/content/modules/01-intro/motion/runtime.test.mjs"], { cwd: output }))
      .resolves.toMatchObject({ stderr: "" });
    if (!hasDeclarations) {
      expect(await readFile(path.join(output, "package.json"), "utf8"))
        .toBe(await readFile(path.join(root, "package.json"), "utf8"));
      await expect(readFile(path.join(output, ".github", "public-release", "export-files.json")))
        .rejects.toMatchObject({ code: "ENOENT" });
      await expect(readFile(path.join(output, "workshops", "test-workshop", "content", "modules",
        "01-intro", "motion", "runtime.test.mjs"))).rejects.toMatchObject({ code: "ENOENT" });
    }
    await expect(
      readFile(path.join(output, "workshops", "test-workshop", "content", "production", "production-state.md"))
    ).rejects.toThrow();
    await expect(readFile(path.join(output, ".github", "workflows", "pages.yml"), "utf8")).resolves.toContain(
      "Public Pages"
    );
    await expect(readFile(path.join(output, "release-provenance.json"), "utf8")).resolves.toContain(commit);
    await expect(
      readFile(
        path.join(output, "workshops", "test-workshop", "content", "modules", "01-intro", "prompt.txt"),
        "utf8"
      )
    ).resolves.toContain("Generate a diagram");
    await expect(
      readFile(
        path.join(output, "workshops", "test-workshop", "content", "modules", "01-intro", "style.css"),
        "utf8"
      )
    ).resolves.toContain("rebeccapurple");
    await expect(
      readFile(
        path.join(
          output,
          "workshops",
          "test-workshop",
          "content",
          "storyboards",
          "intro",
          "scenes",
          "opening.md"
        ),
        "utf8"
      )
    ).resolves.toContain("Open the workshop");

    // The export is pinned to the approved commit, so later content changes must not leak into it.
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "slides.md"),
      "# Changed after approval"
    );
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Change content after approval"], { cwd: root });

    const secondOutput = await exportPublicRelease("releases/test-release.md", "public-export-2", root);
    const exportedSlides = await readFile(
      path.join(secondOutput, "workshops", "test-workshop", "content", "modules", "01-intro", "slides.md"),
      "utf8"
    );
    expect(exportedSlides).toContain("# Introduction");
    expect(exportedSlides).not.toContain("Changed after approval");
  }, 60_000);
});

describe("release approval and deployment state", () => {
  async function createReleaseRepository(status: "draft" | "approved"): Promise<{
    root: string;
    commit: string;
  }> {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-release-state-"));
    temporaryDirectories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "content.md"), "reviewed");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Reviewed content"], { cwd: root });
    const commit = (await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim();
    await mkdir(path.join(root, "releases"));
    const approval =
      status === "approved"
        ? "approvedBy: Workshop owner\napprovedAt: 2026-09-02T10:05:00.000Z\n"
        : "";
    await writeFile(
      path.join(root, "releases", "test-release.md"),
      `---
schemaVersion: 1
kind: release-manifest
id: test-release
title: Test release
status: ${status}
commit: ${commit}
createdAt: 2026-09-02T10:00:00.000Z
${approval}workshops:
  - id: test-workshop
    modules:
      - introduction
---

# Test release
`
    );
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Add release manifest"], { cwd: root });
    return { root, commit };
  }

  it("rejects a manifest with uncommitted changes so an edit cannot redirect a release", async () => {
    const { root } = await createReleaseRepository("approved");

    await writeFile(
      path.join(root, "releases", "test-release.md"),
      (await readFile(path.join(root, "releases", "test-release.md"), "utf8")).replace(
        "title: Test release",
        "title: Quietly retitled release"
      )
    );

    await expect(validateApprovedRelease("releases/test-release.md", root)).rejects.toThrow(
      "has uncommitted changes"
    );
  });

  it("preserves frontmatter fields the schema does not model when recording approval", async () => {
    const { root } = await createReleaseRepository("draft");
    const manifestPath = path.join(root, "releases", "test-release.md");
    await writeFile(
      manifestPath,
      (await readFile(manifestPath, "utf8")).replace(
        "title: Test release",
        "title: Test release\ntrackingIssue: https://example.com/issues/42"
      )
    );

    await approveRelease(
      "releases/test-release.md",
      "Workshop owner",
      root,
      new Date("2026-09-02T11:00:00.000Z")
    );

    const written = await readFile(manifestPath, "utf8");
    expect(written).toMatch(/trackingIssue: '?https:\/\/example\.com\/issues\/42'?/);
    expect(written).toContain("# Test release");
  });

  it("does not rank a late-approved older release above a newer draft", async () => {
    const { root, commit } = await createReleaseRepository("draft");
    await writeFile(
      path.join(root, "releases", "older-release.md"),
      `---
schemaVersion: 1
kind: release-manifest
id: older-release
title: Older release
status: approved
commit: ${commit}
createdAt: 2026-08-01T10:00:00.000Z
approvedBy: Workshop owner
approvedAt: 2026-09-02T23:00:00.000Z
workshops:
  - id: test-workshop
    modules:
      - introduction
---
`
    );

    await expect(resolveLatestApprovedManifest(root)).rejects.toThrow("is draft, not approved");
  });

  it("fails instead of silently skipping a malformed manifest", async () => {
    const { root } = await createReleaseRepository("approved");
    await writeFile(path.join(root, "releases", "broken.md"), "---\nnot: a release manifest\n---\n");

    await expect(resolveLatestApprovedManifest(root)).rejects.toThrow("could not be read");
  });

  it("records approval on a draft manifest", async () => {
    const { root } = await createReleaseRepository("draft");

    const approved = await approveRelease(
      "releases/test-release.md",
      "Tammy McClellan",
      root,
      new Date("2026-09-02T12:00:00.000Z")
    );

    expect(approved.status).toBe("approved");
    expect(approved.approvedBy).toBe("Tammy McClellan");
    expect(approved.approvedAt).toBe("2026-09-02T12:00:00.000Z");
    const written = await readFile(path.join(root, "releases", "test-release.md"), "utf8");
    expect(written).toContain("status: approved");
    expect(written).toContain("# Test release");
  });

  it("refuses to approve a manifest that is not a draft", async () => {
    const { root } = await createReleaseRepository("approved");

    await expect(approveRelease("releases/test-release.md", "Tammy McClellan", root)).rejects.toThrow(
      "Only a draft release can be approved"
    );
  });

  it("resolves the latest approved manifest", async () => {
    const { root } = await createReleaseRepository("approved");

    await expect(resolveLatestApprovedManifest(root)).resolves.toBe("releases/test-release.md");
  });

  it("refuses to resolve a superseded manifest once the newest release is verified", async () => {
    const { root } = await createReleaseRepository("approved");
    // An older manifest left at `approved` must never be promoted after the newest one is verified.
    await writeFile(
      path.join(root, "releases", "older-release.md"),
      `---
schemaVersion: 1
kind: release-manifest
id: older-release
title: Older release
status: approved
commit: ${(await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim()}
createdAt: 2026-08-01T10:00:00.000Z
approvedBy: Workshop owner
approvedAt: 2026-08-01T10:05:00.000Z
workshops:
  - id: test-workshop
    modules:
      - introduction
---
`
    );
    await recordReleaseDeployment(
      "releases/test-release.md",
      "https://example.com/site/",
      root,
      new Date("2026-09-02T13:00:00.000Z")
    );
    await recordReleaseVerification("releases/test-release.md", root, new Date("2026-09-02T13:10:00.000Z"));

    await expect(resolveLatestApprovedManifest(root)).rejects.toThrow("is verified, not approved");
  });

  it("advances an approved release through deployment and verification", async () => {
    const { root } = await createReleaseRepository("approved");

    await expect(validateRollbackTarget("releases/test-release.md", root)).rejects.toThrow(
      "previously verified"
    );

    const deploying = await recordReleaseDeployment(
      "releases/test-release.md",
      "https://tammym-demos.github.io/ghcp-agentic-hack/",
      root,
      new Date("2026-09-02T13:00:00.000Z")
    );
    expect(deploying.status).toBe("deploying");
    expect(deploying.deployment?.deployedAt).toBe("2026-09-02T13:00:00.000Z");

    const verified = await recordReleaseVerification(
      "releases/test-release.md",
      root,
      new Date("2026-09-02T13:10:00.000Z")
    );
    expect(verified.status).toBe("verified");
    expect(verified.deployment?.verifiedAt).toBe("2026-09-02T13:10:00.000Z");

    // Lifecycle writes leave the manifest dirty; a real flow commits that state before redeploying.
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Record deployment and verification"], { cwd: root });

    await expect(validateRollbackTarget("releases/test-release.md", root)).resolves.toMatchObject({
      id: "test-release"
    });
  });

  it("refuses verification without a recorded deployment", async () => {
    const { root } = await createReleaseRepository("approved");

    await expect(recordReleaseVerification("releases/test-release.md", root)).rejects.toThrow(
      "requires a recorded deployment"
    );
  });
});
