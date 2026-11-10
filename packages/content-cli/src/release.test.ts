import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadCatalog, releaseManifestSchema } from "@ghcp/content-schema";
import { repositoryRoot } from "./paths.js";
import { createPortalCatalog } from "./catalog.js";
import {
  approveRelease,
  exportPublicRelease,
  filterCatalogForRelease,
  normalizeWorkflowManifestPath,
  recordReleaseDeployment,
  recordReleaseVerification,
  resolveApprovedPublicManifest,
  resolveRecordedPublicDeploymentProof,
  resolveLatestApprovedManifest,
  validateApprovedRelease,
  validateRollbackTarget,
  verifyDeployedReleaseProvenance
} from "./release.js";

const execFileAsync = promisify(execFile);
const temporaryDirectories: string[] = [];
type SidecarMetadataCase =
  "public-file" | "restricted-file" | "directory" | "redirected-file" |
  "reference-restricted" | "nested-source-restricted" | "location-restricted" |
  "input-reference-restricted" | "nested-metadata-restricted" |
  "public-url-location" | "credentialed-url-location" | "signed-url-location";
const sidecarMetadataCases: Array<[boolean, SidecarMetadataCase]> = [
  [true, "public-file"],
  [false, "public-file"],
  [true, "restricted-file"],
  [true, "directory"],
  [true, "reference-restricted"],
  [true, "nested-source-restricted"],
  [true, "location-restricted"],
  [true, "input-reference-restricted"],
  [true, "nested-metadata-restricted"],
  [true, "public-url-location"],
  [true, "credentialed-url-location"],
  [true, "signed-url-location"]
];
if (process.platform !== "win32") sidecarMetadataCases.push([true, "redirected-file"]);

afterEach(async () => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  await Promise.all(temporaryDirectories.splice(0).map((root) =>
    rm(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  ));
});

it("requires deployed provenance to match both release id and source commit", async () => {
  const manifest = releaseManifestSchema.parse({
    schemaVersion: 1,
    kind: "release-manifest",
    id: "current-release",
    title: "Current release",
    status: "approved",
    commit: "a".repeat(40),
    createdAt: "2026-10-02T12:00:00.000Z",
    approvedBy: "Owner",
    approvedAt: "2026-10-02T12:05:00.000Z",
    workshops: [{ id: "test-workshop", modules: ["introduction"] }]
  });
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({
    releaseId: "previous-release",
    sourceCommit: manifest.commit
  }), { status: 200 })));

  await expect(verifyDeployedReleaseProvenance(manifest, "https://example.test/"))
    .rejects.toThrow("does not match current-release");
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
  }, 30_000);

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

  it.each(sidecarMetadataCases)(
    "exports selected content from pinned snapshots (declarations: %s, sidecar metadata: %s)",
    async (hasDeclarations, sidecarMetadataCase) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-public-export-"));
    temporaryDirectories.push(root);
    await mkdir(path.join(root, ".github", "public-release"), { recursive: true });
    await mkdir(path.join(root, "apps", "portal", "src"), { recursive: true });
    await mkdir(path.join(root, "apps", "decks"), { recursive: true });
    await mkdir(path.join(root, "apps", "leaderboard-api", "src"), { recursive: true });
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
    await writeFile(path.join(root, "apps", "decks", "README.md"), "# Deck app\n");
    await writeFile(path.join(root, "apps", "leaderboard-api", "src", "service.ts"),
      'import "../../../workshops/ghcp-agentic-hack/artifacts/leaderboard-kit/src/leaderboard.mjs";\n');
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
              "content/modules/01-intro/motion/runtime.test.mjs",
              ...(sidecarMetadataCase === "public-file"
                ? ["content/modules/01-intro/motion/sidecar-copy.json"] : [])
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
        source: {
          "public-file": "content/modules/01-intro/prompt.txt",
          "restricted-file": "content/modules/01-intro/review/screenshot.png",
          directory: "content/modules/01-intro",
          "redirected-file": "content/modules/01-intro/public-source/screenshot.png",
          "reference-restricted": "content/modules/01-intro/prompt.txt",
          "nested-source-restricted": "assets/provenance.txt",
          "location-restricted": "content/modules/01-intro/prompt.txt",
          "input-reference-restricted": "content/modules/01-intro/prompt.txt",
          "nested-metadata-restricted": "content/modules/01-intro/prompt.txt",
          "public-url-location": "content/modules/01-intro/prompt.txt",
          "credentialed-url-location": "content/modules/01-intro/prompt.txt",
          "signed-url-location": "content/modules/01-intro/prompt.txt"
        }[sidecarMetadataCase],
        createdAt: "2026-08-05T18:00:00.000Z",
        reviewStatus: "approved",
        location: ({
          "location-restricted": "content/modules/01-intro/review/screenshot.png",
          "public-url-location": "https://public.example.com/media/diagram.png",
          "credentialed-url-location": "https://user:secret@public.example.com/media/diagram.png",
          "signed-url-location": "https://public.example.com/media/diagram.png?sig=secret"
        } as Partial<Record<SidecarMetadataCase, string>>)[sidecarMetadataCase] ?? "assets/diagram.txt",
        inputReference: sidecarMetadataCase === "input-reference-restricted"
          ? {
              path: "generated/candidates/test-workshop/private-reference.png",
              hash: "1".repeat(64),
              contentType: "image/png"
            }
          : undefined,
        providerProvenance: sidecarMetadataCase === "nested-metadata-restricted"
          ? {
              originalCandidate: "generated/candidates/test-workshop/private-candidate.png",
              originalCandidateHash: "2".repeat(64),
              reviewPacket: "content/modules/01-intro/review/private-packet.md"
            }
          : undefined
      })
    );
    if (hasDeclarations && sidecarMetadataCase === "public-file") {
      const sidecar = JSON.parse(await readFile(
        path.join(root, "workshops", "test-workshop", "assets", "diagram.txt.json"),
        "utf8"
      ));
      await writeFile(path.join(moduleRoot, "motion", "sidecar-copy.json"), `${JSON.stringify(sidecar, null, 2)}\n`);
    }
    if (sidecarMetadataCase === "redirected-file") {
      await symlink("review", path.join(moduleRoot, "public-source"), "dir");
    }
    await writeFile(path.join(root, "workshops", "test-workshop", "assets", "reference.txt"), "reference");
    if (sidecarMetadataCase === "reference-restricted") {
      await writeFile(
        path.join(root, "workshops", "test-workshop", "assets", "reference.txt.json"),
        JSON.stringify({
          schemaVersion: 1,
          id: "reference",
          kind: "image",
          provider: "gpt-image-2",
          deployment: "test",
          promptHash: "0".repeat(64),
          source: "content/modules/01-intro/review/screenshot.png",
          createdAt: "2026-08-05T18:00:00.000Z",
          reviewStatus: "approved",
          location: "assets/reference.txt"
        })
      );
    }
    await writeFile(
      path.join(root, "workshops", "test-workshop", "content", "modules", "01-intro", "prompt.txt"),
      "Generate a diagram"
    );
    if (sidecarMetadataCase === "nested-source-restricted") {
      await writeFile(path.join(root, "workshops", "test-workshop", "assets", "provenance.txt"), "provenance");
      await writeFile(
        path.join(root, "workshops", "test-workshop", "assets", "provenance.txt.json"),
        JSON.stringify({
          source: "content/modules/01-intro/review/screenshot.png"
        })
      );
    }
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
  - assets/reference.txt
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
    if (hasDeclarations && sidecarMetadataCase === "public-file") {
      await execFileAsync("git", ["config", "core.autocrlf", "true"], { cwd: root });
    }
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
    const successfulCases = new Set<SidecarMetadataCase>([
      "public-file",
      "restricted-file",
      "reference-restricted",
      "nested-source-restricted",
      "input-reference-restricted",
      "nested-metadata-restricted",
      "public-url-location"
    ]);
    if (!successfulCases.has(sidecarMetadataCase)) {
      await expect(exportPublicRelease("releases/test-release.md", "public-export", root))
        .rejects.toThrow(
          ["location-restricted", "credentialed-url-location", "signed-url-location"]
            .includes(sidecarMetadataCase)
              ? "Public release sidecar location is restricted"
            : "Public export paths must name regular files"
        );
      await expect(readdir(path.join(root, "public-export"))).resolves.toEqual([]);
      return;
    }
    if (hasDeclarations && sidecarMetadataCase === "public-file") {
      vi.stubEnv("WORKSHOP_ENVIRONMENT", "test");
    }
    const output = await exportPublicRelease("releases/test-release.md", "public-export", root);
    const exportedCatalog = await loadCatalog(output);
    const exportedWorkshop = await readFile(
      path.join(output, "workshops", "test-workshop", "workshop.md"),
      "utf8"
    );
    const exportedSidecar = JSON.parse(await readFile(
      path.join(output, "workshops", "test-workshop", "assets", "diagram.txt.json"),
      "utf8"
    ));

    if (hasDeclarations && sidecarMetadataCase === "public-file") {
      const portalCatalog = JSON.parse(await readFile(path.join(output, "apps", "portal", "src", "catalog.json"), "utf8"));
      expect(portalCatalog.environment).toBe("production");
      const projected = await readFile(path.join(output, "workshops", "test-workshop", "assets", "diagram.txt.json"));
      const copy = await readFile(path.join(output, "workshops", "test-workshop", "content", "modules", "01-intro", "motion", "sidecar-copy.json"));
      expect(copy).toEqual(projected);
    }
    expect(exportedCatalog.workshops[0]?.modules.map((module) => module.data.id)).toEqual(["introduction"]);
    expect(createPortalCatalog(exportedCatalog, "production").workshops[0]).toMatchObject({
      id: "test-workshop",
      format: "custom",
      totalMinutes: 30
    });
    expect(exportedCatalog.workshops[0]?.workshop.data.schedule).toBeUndefined();
    expect(exportedCatalog.workshops[0]?.workshop.data.runOfShow).toBeUndefined();
    expect(exportedWorkshop).not.toContain("lifecycleVersion");
    if (sidecarMetadataCase === "input-reference-restricted") {
      expect(exportedSidecar.inputReference).toBeUndefined();
    }
    if (sidecarMetadataCase === "nested-metadata-restricted") {
      expect(exportedSidecar.providerProvenance).toEqual({
        originalCandidateHash: "2".repeat(64)
      });
    }
    if (sidecarMetadataCase === "public-url-location") {
      expect(exportedSidecar.location).toBe("https://public.example.com/media/diagram.png");
    }
    if (sidecarMetadataCase === "restricted-file") {
      expect(exportedSidecar.source).toBe("public-sources/content/modules/01-intro/review-source/screenshot.png");
      await expect(
        readFile(
          path.join(
            output,
            "workshops",
            "test-workshop",
            "public-sources",
            "content",
            "modules",
            "01-intro",
            "review-source",
            "screenshot.png"
          ),
          "utf8"
        )
      ).resolves.toBe("private evidence");
    }
    if (sidecarMetadataCase === "reference-restricted") {
      const exportedReferenceSidecar = JSON.parse(await readFile(
        path.join(output, "workshops", "test-workshop", "assets", "reference.txt.json"),
        "utf8"
      ));
      expect(exportedReferenceSidecar.source).toBe("public-sources/content/modules/01-intro/review-source/screenshot.png");
    }
    if (sidecarMetadataCase === "nested-source-restricted") {
      const exportedProvenanceSidecar = JSON.parse(await readFile(
        path.join(output, "workshops", "test-workshop", "assets", "provenance.txt.json"),
        "utf8"
      ));
      expect(exportedProvenanceSidecar.source).toBe("public-sources/content/modules/01-intro/review-source/screenshot.png");
    }
    for (const file of hasDeclarations
      ? ["components/Wrapper.vue", "motion/Scene.vue", "motion/scene.css", "motion/runtime.test.mjs"] : []) {
      const relative = path.join("workshops", "test-workshop", "content", "modules", "01-intro", file);
      expect(await readFile(path.join(output, relative))).toEqual(await readFile(path.join(root, relative)));
    }
    for (const file of [
      "apps/leaderboard-api/src/service.ts",
      "packages/example/private-tests/archive.test.mjs",
      "workshops/test-workshop/content/modules/01-intro/motion/private-proof.md",
      "workshops/test-workshop/content/modules/01-intro/review/screenshot.png",
      "workshops/test-workshop/content/production/production-state.md"
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
    await expect(readFile(path.join(output, ".github", "workflows", "pages.yml"), "utf8")).resolves.toContain(
      "Public Pages"
    );
    await expect(readFile(path.join(output, "release-provenance.json"), "utf8")).resolves.toContain(commit);
    if (!["restricted-file", "nested-source-restricted"].includes(sidecarMetadataCase)) {
      await expect(
        readFile(
          path.join(output, "workshops", "test-workshop", "content", "modules", "01-intro", "prompt.txt"),
          "utf8"
        )
      ).resolves.toContain("Generate a diagram");
    }
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
    if (hasDeclarations && sidecarMetadataCase === "public-file") {
      await recordReleaseDeployment("releases/test-release.md", "https://example.test/", root);
      await recordReleaseVerification("releases/test-release.md", root);
      const manifestPath = path.join(root, "releases", "test-release.md");
      await writeFile(manifestPath, `${await readFile(manifestPath, "utf8")}\n## Production verification\n\nPrivate deployment evidence.\n`);
      await execFileAsync("git", ["add", "releases/test-release.md"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "Record deployment"], { cwd: root });
      const verifiedOutput = await exportPublicRelease("releases/test-release.md", "public-export-verified", root);
      const approvedManifest = await readFile(path.join(output, "releases", "test-release.md"), "utf8");
      const verifiedManifest = await readFile(path.join(verifiedOutput, "releases", "test-release.md"), "utf8");
      expect(verifiedManifest).toBe(approvedManifest);
      expect(verifiedManifest).toContain("status: approved");
      expect(verifiedManifest).not.toContain("deployedAt:");
      expect(verifiedManifest).not.toContain("verifiedAt:");
      expect(verifiedManifest).not.toContain("Private deployment evidence");
    }
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

  async function attachReleaseOrigin(root: string): Promise<void> {
    const remote = await mkdtemp(path.join(os.tmpdir(), "ghcp-release-origin-"));
    temporaryDirectories.push(remote);
    await execFileAsync("git", ["init", "--bare", remote], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remote], { cwd: root });
    await execFileAsync("git", ["push", "origin", "HEAD:refs/heads/main"], { cwd: root });
    await execFileAsync("git", ["update-ref", "refs/remotes/origin/main", "HEAD"], { cwd: root });
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

  it.each(["body", "unmodeled frontmatter"])(
    "rejects uncommitted %s changes while allowing deployment-state updates",
    async (change) => {
      const { root } = await createReleaseRepository("approved");
      const manifestPath = path.join(root, "releases", "test-release.md");
      await recordReleaseDeployment("releases/test-release.md", "https://example.test/", root);
      await expect(validateApprovedRelease("releases/test-release.md", root, {
        allowDeploymentStateChanges: true
      })).resolves.toMatchObject({ status: "deploying" });

      const raw = await readFile(manifestPath, "utf8");
      await writeFile(manifestPath, change === "body"
        ? `${raw}\nUnreviewed release text.\n`
        : raw.replace("title: Test release", "title: Test release\ntrackingIssue: unreviewed"));
      await expect(validateApprovedRelease("releases/test-release.md", root, {
        allowDeploymentStateChanges: true
      })).rejects.toThrow("uncommitted changes outside deployment state");
    }
  );

  it.each(["draft", "rolled-back"])(
    "rejects deployment-state changes when the committed baseline is %s",
    async (status) => {
      const { root } = await createReleaseRepository("approved");
      const manifestPath = path.join(root, "releases", "test-release.md");
      const approved = await readFile(manifestPath, "utf8");
      await writeFile(manifestPath, approved.replace("status: approved", `status: ${status}`));
      await execFileAsync("git", ["add", "releases/test-release.md"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "Record non-approved state"], { cwd: root });
      await writeFile(manifestPath, approved);
      await recordReleaseDeployment("releases/test-release.md", "https://example.test/", root);

      await expect(validateApprovedRelease("releases/test-release.md", root, {
        allowDeploymentStateChanges: true
      })).rejects.toThrow("must have a committed approved baseline");
    }
  );

  it("pins the exact approved manifest when later verification evidence is committed", async () => {
    const { root } = await createReleaseRepository("approved");
    const relative = "releases/test-release.md";
    const manifestPath = path.join(root, "releases", "test-release.md");
    const first = await resolveApprovedPublicManifest(relative, root);
    await writeFile(manifestPath, `${await readFile(manifestPath, "utf8")}\nApproved publication notes.\n`);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Update approved publication notes"], { cwd: root });
    const approved = await resolveApprovedPublicManifest(relative, root);
    expect(approved.sha256).not.toBe(first.sha256);

    await recordReleaseDeployment(relative, "https://example.test/", root);
    await recordReleaseVerification(relative, root);
    await writeFile(manifestPath, `${await readFile(manifestPath, "utf8")}\n## Production verification\n\nPrivate evidence.\n`);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Record production evidence"], { cwd: root });
    await expect(resolveApprovedPublicManifest(relative, root)).rejects.toThrow(
      "Multiple approved manifest versions"
    );

    const evidence = {
      repository: "example/workshops",
      commit: "a".repeat(40),
      tree: "b".repeat(40),
      deploymentId: 1,
      runId: 2,
      jobId: 3,
      approvedManifestSha256: approved.sha256
    };
    await recordReleaseVerification(relative, root, new Date("2026-09-03T10:00:00Z"), evidence);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Pin approved manifest provenance"], { cwd: root });
    const recovered = await resolveApprovedPublicManifest(relative, root);
    expect(recovered.sha256).toBe(approved.sha256);
    expect(recovered.raw).toBe(approved.raw);
    expect(recovered.raw).not.toContain("Private evidence");

    await recordReleaseVerification(relative, root, new Date("2026-09-03T10:01:00Z"), {
      ...evidence,
      approvedManifestSha256: "f".repeat(64)
    });
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Record unavailable manifest provenance"], { cwd: root });
    await expect(resolveApprovedPublicManifest(relative, root)).rejects.toThrow(
      "Recorded approved manifest version is unavailable"
    );
  }, 60_000);

  it("uses only matching deployment proof committed on protected origin/main", async () => {
    const { root } = await createReleaseRepository("approved");
    const relative = "releases/test-release.md";
    const approved = await resolveApprovedPublicManifest(relative, root);
    await recordReleaseDeployment(relative, "https://example.test/", root);
    const evidence = {
      repository: "example/workshops",
      commit: "a".repeat(40),
      tree: "b".repeat(40),
      deploymentId: 1,
      runId: 2,
      jobId: 3,
      approvedManifestSha256: approved.sha256,
      logSha256: "c".repeat(64),
      liveLogVerifiedAt: "2026-09-03T10:00:00.000Z"
    };
    await recordReleaseVerification(relative, root, new Date("2026-09-03T10:00:00Z"), evidence);
    const options = {
      repository: evidence.repository,
      expectedTree: evidence.tree,
      siteUrl: "https://example.test/",
      approvedManifestSha256: approved.sha256
    };
    await attachReleaseOrigin(root);
    await expect(resolveRecordedPublicDeploymentProof(relative, options, root))
      .rejects.toThrow("no durable, live-log deployment proof");

    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Record verified deployment proof"], { cwd: root });
    await expect(resolveRecordedPublicDeploymentProof(relative, options, root))
      .rejects.toThrow("checkout of protected origin/main");
    await execFileAsync("git", ["update-ref", "refs/remotes/origin/main", "HEAD"], { cwd: root });
    await expect(resolveRecordedPublicDeploymentProof(relative, options, root))
      .rejects.toThrow("checkout of protected origin/main");
    await execFileAsync("git", ["push", "origin", "HEAD:refs/heads/main"], { cwd: root });
    const expected = {
      deploymentId: 1,
      commit: evidence.commit,
      tree: evidence.tree,
      runId: 2,
      jobId: 3,
      logSha256: evidence.logSha256,
      liveLogVerifiedAt: evidence.liveLogVerifiedAt
    };
    await expect(resolveRecordedPublicDeploymentProof(relative, options, root)).resolves.toEqual(expected);

    for (const mismatch of [
      { repository: "other/workshops" },
      { expectedTree: "d".repeat(40) },
      { siteUrl: "https://other.example.test/" },
      { approvedManifestSha256: "e".repeat(64) }
    ]) {
      await expect(resolveRecordedPublicDeploymentProof(relative, { ...options, ...mismatch }, root))
        .rejects.toThrow("does not match the selected release and site");
    }

    await recordReleaseVerification(relative, root, new Date("2026-09-03T10:01:00Z"), {
      ...evidence,
      deploymentId: 99,
      logSha256: "f".repeat(64)
    });
    await expect(resolveRecordedPublicDeploymentProof(relative, options, root)).resolves.toEqual(expected);
    const manifestPath = path.join(root, relative);
    await writeFile(manifestPath, `${await readFile(manifestPath, "utf8")}\nUnreviewed text.\n`);
    await expect(resolveRecordedPublicDeploymentProof(relative, options, root))
      .rejects.toThrow("uncommitted changes outside deployment state");
  }, 60_000);

  it("does not treat legacy verification metadata as durable live-log proof", async () => {
    const { root } = await createReleaseRepository("approved");
    const relative = "releases/test-release.md";
    const approved = await resolveApprovedPublicManifest(relative, root);
    await recordReleaseDeployment(relative, "https://example.test/", root);
    await recordReleaseVerification(relative, root, new Date("2026-09-03T10:00:00Z"), {
      repository: "example/workshops",
      commit: "a".repeat(40),
      tree: "b".repeat(40),
      deploymentId: 1,
      runId: 2,
      jobId: 3,
      approvedManifestSha256: approved.sha256
    });
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Record legacy verification"], { cwd: root });
    await attachReleaseOrigin(root);
    await expect(resolveRecordedPublicDeploymentProof(relative, {
      repository: "example/workshops",
      expectedTree: "b".repeat(40),
      siteUrl: "https://example.test/",
      approvedManifestSha256: approved.sha256
    }, root)).rejects.toThrow("no durable, live-log deployment proof");
  }, 60_000);

  it("uses the committed approved manifest when a merge resolves publication notes", async () => {
    const { root } = await createReleaseRepository("approved");
    const relative = "releases/test-release.md";
    const manifestPath = path.join(root, "releases", "test-release.md");
    const original = await readFile(manifestPath, "utf8");

    await execFileAsync("git", ["switch", "-c", "publication-notes"], { cwd: root });
    await writeFile(manifestPath, `${original}\nNotes from the other branch.\n`);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Update notes on side branch"], { cwd: root });
    await execFileAsync("git", ["switch", "-"], { cwd: root });
    await writeFile(manifestPath, `${original}\nNotes from the main branch.\n`);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Update notes on main branch"], { cwd: root });
    await expect(execFileAsync("git", ["merge", "--no-ff", "--no-commit", "publication-notes"], {
      cwd: root
    })).rejects.toThrow();
    await writeFile(manifestPath, `${original}\nThe reviewed merge resolution.\n`);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Resolve publication notes"], { cwd: root });

    const committed = (await execFileAsync("git", ["show", `HEAD:${relative}`], { cwd: root })).stdout;
    const resolved = await resolveApprovedPublicManifest(relative, root);
    expect(resolved.raw).toBe(committed);
    expect(resolved.raw).toContain("The reviewed merge resolution.");

    await recordReleaseDeployment(relative, "https://example.test/", root);
    await recordReleaseVerification(relative, root, new Date("2026-09-03T10:00:00Z"), {
      repository: "example/workshops",
      commit: "a".repeat(40),
      tree: "b".repeat(40),
      deploymentId: 1,
      runId: 2,
      jobId: 3,
      approvedManifestSha256: resolved.sha256
    });
    await writeFile(manifestPath, `${await readFile(manifestPath, "utf8")}\nPrivate deployment evidence.\n`);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Record production evidence"], { cwd: root });
    const recovered = await resolveApprovedPublicManifest(relative, root);
    expect(recovered.raw).toBe(committed);
    expect(recovered.raw).not.toContain("Private deployment evidence");
  }, 60_000);

  it("rejects an approved manifest containing deployment evidence", async () => {
    const { root } = await createReleaseRepository("approved");
    const relative = "releases/test-release.md";
    const manifestPath = path.join(root, "releases", "test-release.md");
    await recordReleaseDeployment(relative, "https://example.test/", root);
    const deploying = await readFile(manifestPath, "utf8");
    await writeFile(manifestPath, `${deploying.replace("status: deploying", "status: approved")}\nPrivate evidence.\n`);
    await execFileAsync("git", ["add", relative], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Record inconsistent approval"], { cwd: root });

    await expect(resolveApprovedPublicManifest(relative, root)).rejects.toThrow(
      "must not contain deployment evidence"
    );
  }, 60_000);

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
      new Date("2026-09-02T13:10:00.000Z"),
      {
        repository: "example/workshops",
        commit: "a".repeat(40),
        tree: "b".repeat(40),
        deploymentId: 10,
        runId: 11,
        jobId: 12
      }
    );
    expect(verified.status).toBe("verified");
    expect(verified.deployment?.verifiedAt).toBe("2026-09-02T13:10:00.000Z");
    expect(verified.deployment?.evidence).toMatchObject({
      repository: "example/workshops",
      commit: "a".repeat(40),
      tree: "b".repeat(40),
      deploymentId: 10,
      runId: 11,
      jobId: 12
    });
    expect(await readFile(path.join(root, "releases", "test-release.md"), "utf8"))
      .toContain(`tree: ${"b".repeat(40)}`);

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
