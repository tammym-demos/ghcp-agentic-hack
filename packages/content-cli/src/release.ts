import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { promisify } from "node:util";
import fsExtra from "fs-extra";
import matter from "gray-matter";
import {
  loadCatalog,
  releaseManifestSchema,
  type ContentCatalog,
  type ReleaseManifest
} from "@ghcp/content-schema";
import { gitSnapshot } from "./lifecycle.js";
import { createPortalCatalog } from "./catalog.js";
import { repositoryRoot } from "./paths.js";
import { assertPinnedEntry, publicExportPlan, publicPackageScripts } from "./public-export.js";

const { copy, ensureDir, pathExists, readFile, readdir, writeFile, writeJson } = fsExtra;
const execFileAsync = promisify(execFile);

export async function loadReleaseManifest(
  manifestOption: string,
  root = repositoryRoot
): Promise<{
  filePath: string;
  manifest: ReleaseManifest;
  body: string;
  raw: string;
  data: Record<string, unknown>;
}> {
  const filePath = path.resolve(root, manifestOption);
  const relative = path.relative(root, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Release manifest must remain inside the repository");
  }
  if (!(await pathExists(filePath))) throw new Error(`Release manifest does not exist: ${manifestOption}`);
  const raw = await readFile(filePath, "utf8");
  const parsed = matter(raw);
  return {
    filePath,
    manifest: releaseManifestSchema.parse(parsed.data),
    body: parsed.content,
    raw,
    data: parsed.data as Record<string, unknown>
  };
}

/**
 * Confirms the manifest itself is committed. Content equivalence is guaranteed structurally by the
 * pinned worktree, but the manifest is deliberately read from the checkout, so an uncommitted edit to
 * it could otherwise redirect a release to a different commit or module set than the one reviewed.
 * Unrelated working-tree changes remain allowed; only the manifest must be clean.
 */
async function assertManifestCommitted(root: string, filePath: string): Promise<void> {
  const relative = path.relative(root, filePath).split(path.sep).join("/");
  const { stdout } = await execFileAsync("git", ["status", "--porcelain", "--", relative], {
    cwd: root
  });
  if (stdout.trim()) {
    throw new Error(
      `Release manifest ${relative} has uncommitted changes. Commit the manifest so the promoted release matches the reviewed one.`
    );
  }
}

async function writeReleaseManifest(
  filePath: string,
  manifest: ReleaseManifest,
  body: string,
  originalData: Record<string, unknown> = {}
): Promise<void> {
  // Merging over the original frontmatter keeps fields the schema does not model, which would
  // otherwise be silently dropped on every approval or deployment write.
  const merged = { ...originalData, ...releaseManifestSchema.parse(manifest) };
  await writeFile(filePath, matter.stringify(body, merged), "utf8");
}

export function filterCatalogForRelease(
  catalog: ContentCatalog,
  release: ReleaseManifest
): ContentCatalog {
  return {
    workshops: release.workshops.map((selection) => {
      const workshop = catalog.workshops.find((entry) => entry.workshop.data.id === selection.id);
      if (!workshop) throw new Error(`Release references unknown workshop: ${selection.id}`);
      const selectedModules = selection.modules.map((moduleId) => {
        const module = workshop.modules.find((candidate) => candidate.data.id === moduleId);
        if (!module) throw new Error(`Release references unknown module "${moduleId}" in "${selection.id}"`);
        return module;
      });
      const deliveryVariants = workshop.workshop.data.deliveryVariants?.filter((variant) =>
        variant.days.every((day) =>
          day.agenda.every((block) => !block.module || selection.modules.includes(block.module))
        )
      );
      const defaultDeliveryVariant = deliveryVariants?.some(
        (variant) => variant.id === workshop.workshop.data.defaultDeliveryVariant
      )
        ? workshop.workshop.data.defaultDeliveryVariant
        : undefined;
      return {
        ...workshop,
        workshop: {
          ...workshop.workshop,
          data: {
            ...workshop.workshop.data,
            modules: selection.modules,
            defaultDeliveryVariant,
            deliveryVariants
          }
        },
        modules: selectedModules
      };
    })
  };
}

export async function validateApprovedRelease(
  manifestOption: string,
  root = repositoryRoot
): Promise<ReleaseManifest> {
  const { manifest, filePath } = await loadReleaseManifest(manifestOption, root);
  if (manifest.status !== "approved" && manifest.status !== "deploying" && manifest.status !== "verified") {
    throw new Error(`Release manifest must be approved before deployment, received ${manifest.status}`);
  }
  await assertManifestCommitted(root, filePath);
  const snapshot = await gitSnapshot(root);
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", manifest.commit, snapshot.commit], {
      cwd: root
    });
  } catch {
    throw new Error(`Release content commit ${manifest.commit} is not an ancestor of ${snapshot.commit}`);
  }
  return manifest;
}

/**
 * Checks the approved commit out into a throwaway detached worktree so an export reads exactly the
 * reviewed content. This replaces an earlier working-tree export that had to reject every unrelated
 * change between the manifest commit and HEAD to prove the same equivalence.
 */
async function withManifestWorktree<T>(
  root: string,
  commit: string,
  run: (sourceRoot: string) => Promise<T>
): Promise<T> {
  const container = await mkdtemp(path.join(os.tmpdir(), "ghcp-release-source-"));
  const sourceRoot = path.join(container, "source");
  let registered = false;
  try {
    await execFileAsync("git", ["worktree", "add", "--detach", sourceRoot, commit], { cwd: root });
    registered = true;
    // Git LFS pointers are checked out as pointer files when the worktree skips the smudge filter.
    try {
      await execFileAsync("git", ["lfs", "checkout"], { cwd: sourceRoot });
    } catch {
      // A repository or runner without Git LFS still exports every ordinary file correctly.
    }
    return await run(sourceRoot);
  } finally {
    if (registered) {
      // Leaving stale metadata behind would make later worktree adds at the same path fail, so a
      // failed remove is repaired with a prune rather than ignored.
      try {
        await execFileAsync("git", ["worktree", "remove", "--force", sourceRoot], { cwd: root });
      } catch {
        await execFileAsync("git", ["worktree", "prune"], { cwd: root }).catch(() => undefined);
      }
    }
    await rm(container, { recursive: true, force: true });
  }
}

export async function prepareRelease(
  releaseId: string,
  workshopId: string,
  catalog: ContentCatalog,
  root = repositoryRoot,
  now = new Date()
): Promise<string> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(releaseId)) {
    throw new Error("Release id must use lowercase kebab-case");
  }
  const workshop = catalog.workshops.find((entry) => entry.workshop.data.id === workshopId);
  if (!workshop) throw new Error(`Workshop does not exist: ${workshopId}`);
  const snapshot = await gitSnapshot(root);
  if (snapshot.dirtyFiles.length > 0) {
    throw new Error("Release preparation requires a clean worktree and an exact reviewed commit");
  }
  const relativePath = path.join("releases", `${releaseId}.md`);
  const filePath = path.join(root, relativePath);
  if (await pathExists(filePath)) throw new Error(`Release manifest already exists: ${relativePath}`);
  const data = releaseManifestSchema.parse({
    schemaVersion: 1,
    kind: "release-manifest",
    id: releaseId,
    title: `${workshop.workshop.data.title} release`,
    status: "draft",
    commit: snapshot.commit,
    createdAt: now.toISOString(),
    workshops: [
      {
        id: workshopId,
        modules: workshop.workshop.data.modules
      }
    ]
  });
  await ensureDir(path.dirname(filePath));
  await writeFile(
    filePath,
    matter.stringify(
      `\n# ${data.title}\n\nThis draft does not authorize deployment. Record local review evidence and explicit human approval before changing status to \`approved\`.\n`,
      data
    ),
    "utf8"
  );
  return relativePath.split(path.sep).join("/");
}

const PUBLIC_WORKSPACE_PATHS = [
  ".gitignore",
  ".gitattributes",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "tsconfig.base.json",
  "apps",
  "packages",
  "scripts"
];

async function copyPath(source: string, destination: string): Promise<void> {
  if (!(await pathExists(source))) return;
  await copy(source, destination, {
    filter: (candidate) => {
      const name = path.basename(candidate);
      return name !== "node_modules" && name !== "dist" && name !== ".vite" && name !== ".slidev" &&
        name !== "private-tests";
    }
  });
}

async function copyRequiredPath(source: string, destination: string): Promise<void> {
  if (!(await pathExists(source))) throw new Error(`Required public release path does not exist: ${source}`);
  await copyPath(source, destination);
}

async function copyWorkshopPath(workshopRoot: string, outputWorkshopRoot: string, relativePath: string) {
  const source = path.resolve(workshopRoot, relativePath);
  const relative = path.relative(workshopRoot, source);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Public release dependency escapes the workshop root: ${relativePath}`);
  }
  if (!(await pathExists(source))) {
    throw new Error(`Public release dependency does not exist: ${relativePath}`);
  }
  const destination = path.join(outputWorkshopRoot, ...relativePath.split("/"));
  await ensureDir(path.dirname(destination));
  await copyPath(source, destination);
  if (await pathExists(`${source}.json`)) await copyPath(`${source}.json`, `${destination}.json`);
}

function pathKey(value: string): string {
  const normalized = path.normalize(value);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

export async function exportPublicRelease(
  manifestOption: string,
  outputDirectory: string,
  root = repositoryRoot
): Promise<string> {
  const output = path.resolve(root, outputDirectory);
  const outputRelative = path.relative(root, output);
  if (outputRelative.startsWith("..") || path.isAbsolute(outputRelative)) {
    throw new Error("Public release output must remain inside the repository");
  }
  if (await pathExists(output)) {
    if ((await readdir(output)).length > 0) throw new Error("Public release output directory must be empty");
  } else {
    await ensureDir(output);
  }

  const manifest = await validateApprovedRelease(manifestOption, root);
  // Captured once, alongside validation, so the bytes copied into the export are provably the same
  // bytes that selected the commit and module set.
  const { raw: manifestRaw } = await loadReleaseManifest(manifestOption, root);

  return withManifestWorktree(root, manifest.commit, async (sourceRoot) => {
    const completeCatalog = await loadCatalog(sourceRoot);
    const catalog = filterCatalogForRelease(completeCatalog, manifest);
    const publicPlan = await publicExportPlan(sourceRoot, catalog);
    for (const file of [".github/public-release/pages.yml", ".github/public-release/README.md"]) {
      await assertPinnedEntry(sourceRoot, file);
    }

    for (const relativePath of PUBLIC_WORKSPACE_PATHS) {
      await copyRequiredPath(path.join(sourceRoot, relativePath), path.join(output, relativePath));
    }
    await copyRequiredPath(
      path.join(sourceRoot, ".github", "public-release", "pages.yml"),
      path.join(output, ".github", "workflows", "pages.yml")
    );
    await copyRequiredPath(
      path.join(sourceRoot, ".github", "public-release", "README.md"),
      path.join(output, "README.md")
    );
    if (publicPlan) {
      await copyRequiredPath(
        path.join(sourceRoot, ".github", "public-release", "export-files.json"),
        path.join(output, ".github", "public-release", "export-files.json")
      );
      for (const file of publicPlan.files) {
        await copyRequiredPath(path.join(sourceRoot, file), path.join(output, file));
      }
      const packagePath = path.join(output, "package.json");
      const publicPackage = JSON.parse(await readFile(packagePath, "utf8"));
      publicPackage.scripts = publicPackageScripts(publicPackage.scripts ?? {}, publicPlan.tests);
      await writeJson(packagePath, publicPackage, { spaces: 2 });
    }

    for (const entry of catalog.workshops) {
      const outputWorkshopRoot = path.join(output, "workshops", entry.workshop.data.id);
      await ensureDir(outputWorkshopRoot);
      const {
        lifecycleVersion: _lifecycleVersion,
        totalMinutes: _totalMinutes,
        schedule: _schedule,
        runOfShow: _runOfShow,
        ...publicWorkshopData
      } = entry.workshop.data;
      const publicWorkshop = JSON.parse(JSON.stringify(publicWorkshopData));
      await writeFile(
        path.join(outputWorkshopRoot, "workshop.md"),
        matter.stringify(entry.workshop.body, publicWorkshop),
        "utf8"
      );

      const copied = new Set<string>();
      const copyDependency = async (relativePath: string) => {
        const normalized = relativePath.split(path.sep).join("/");
        if (copied.has(normalized)) return;
        copied.add(normalized);
        await copyWorkshopPath(entry.root, outputWorkshopRoot, normalized);
      };

      for (const module of entry.modules) {
        await copyDependency(path.relative(entry.root, module.filePath));
        const references = [
          module.data.slides,
          ...module.data.sourceDocuments,
          ...(module.data.generation ? [module.data.generation.manifest] : []),
          ...module.data.labs,
          ...module.data.missions,
          ...module.data.assets
        ];
        for (const reference of references) await copyDependency(reference);
        const slideStyle = path.posix.join(path.posix.dirname(module.data.slides), "style.css");
        if (await pathExists(path.resolve(entry.root, slideStyle))) await copyDependency(slideStyle);
        for (const asset of module.data.assets) {
          const sidecarPath = path.resolve(entry.root, `${asset}.json`);
          if (!(await pathExists(sidecarPath))) continue;
          const sidecar = JSON.parse(await readFile(sidecarPath, "utf8")) as { source?: unknown };
          if (typeof sidecar.source === "string") await copyDependency(sidecar.source);
        }

        const modulePublic = path.join(path.dirname(module.filePath), "public");
        if (await pathExists(modulePublic)) {
          const relativePublic = path.relative(entry.root, modulePublic);
          await copyPath(modulePublic, path.join(outputWorkshopRoot, relativePublic));
        }
      }

      const selectedSourcePaths = new Set(
        entry.modules.flatMap((module) =>
          module.data.sourceDocuments.map((item) => pathKey(path.resolve(entry.root, item)))
        )
      );
      for (const storyboard of entry.storyboards.filter((item) =>
        selectedSourcePaths.has(pathKey(item.filePath))
      )) {
        for (const scenePath of storyboard.data.scenes) await copyDependency(scenePath);
        for (const characterPath of storyboard.data.characters) {
          await copyDependency(characterPath);
          const characterPathKey = pathKey(path.resolve(entry.root, characterPath));
          const character = entry.characters.find((item) => pathKey(item.filePath) === characterPathKey);
          if (character) {
            for (const referenceImage of character.data.referenceImages) await copyDependency(referenceImage);
          }
        }
      }
    }

    // The manifest is read from the checkout because approval is normally recorded after the
    // reviewed content commit and therefore does not exist inside the pinned worktree. It is
    // required to be committed and unmodified, so this is not a working-tree escape hatch.
    const manifestRelative = path.relative(root, path.resolve(root, manifestOption));
    const manifestTarget = path.join(output, manifestRelative);
    await ensureDir(path.dirname(manifestTarget));
    await writeFile(manifestTarget, manifestRaw, "utf8");
    await ensureDir(path.join(output, "apps", "portal", "src"));
    await writeJson(
      path.join(output, "apps", "portal", "src", "catalog.json"),
      createPortalCatalog(catalog),
      { spaces: 2 }
    );
    await writeJson(
      path.join(output, "release-provenance.json"),
      {
        releaseId: manifest.id,
        sourceCommit: manifest.commit,
        workshops: manifest.workshops.map((selection) => selection.id)
      },
      { spaces: 2 }
    );
    await loadCatalog(output);
    return output;
  });
}

export async function verifyReleaseRoutes(
  manifestOption: string,
  siteUrl: string,
  catalog?: ContentCatalog,
  root = repositoryRoot
): Promise<string[]> {
  const manifest = await validateApprovedRelease(manifestOption, root);
  // Routes must describe the approved content, so the catalog defaults to the pinned commit.
  const releaseCatalog =
    catalog ?? (await withManifestWorktree(root, manifest.commit, (sourceRoot) => loadCatalog(sourceRoot)));
  const selected = filterCatalogForRelease(releaseCatalog, manifest);
  const base = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  const routes = [
    base,
    ...selected.workshops.flatMap((entry) =>
      [
        `${base}workshops/${entry.workshop.data.id}/`,
        ...(entry.workshop.data.deliveryVariants ?? []).map(
          (variant) => `${base}workshops/${entry.workshop.data.id}/variants/${variant.id}/`
        ),
        ...entry.modules.map(
          (module) => `${base}workshops/${entry.workshop.data.id}/${module.data.id}/`
        )
      ]
    )
  ];
  for (const route of routes) {
    const response = await fetch(route, { redirect: "follow" });
    if (!response.ok) throw new Error(`Release route returned ${response.status}: ${route}`);
  }
  return routes;
}

export async function validateRollbackTarget(
  manifestOption: string,
  root = repositoryRoot
): Promise<ReleaseManifest> {
  const { manifest } = await loadReleaseManifest(manifestOption, root);
  if (manifest.status !== "verified") {
    throw new Error("Rollback target must be a previously verified release");
  }
  await validateApprovedRelease(manifestOption, root);
  return manifest;
}

/**
 * Records the workshop owner's approval on an existing draft so preparation and approval can share
 * one branch and one pull request. The decision itself remains a human decision; this only writes
 * down who made it and when.
 */
export async function approveRelease(
  manifestOption: string,
  approver: string,
  root = repositoryRoot,
  now = new Date()
): Promise<ReleaseManifest> {
  if (!approver.trim()) throw new Error("Release approval requires an approver name");
  const { filePath, manifest, body, data } = await loadReleaseManifest(manifestOption, root);
  if (manifest.status !== "draft") {
    throw new Error(`Only a draft release can be approved, received ${manifest.status}`);
  }
  const snapshot = await gitSnapshot(root);
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", manifest.commit, snapshot.commit], {
      cwd: root
    });
  } catch {
    throw new Error(`Release content commit ${manifest.commit} is not an ancestor of ${snapshot.commit}`);
  }
  const approved: ReleaseManifest = {
    ...manifest,
    status: "approved",
    approvedBy: approver.trim(),
    approvedAt: now.toISOString()
  };
  await writeReleaseManifest(filePath, approved, body, data);
  return approved;
}

/**
 * Resolves the newest manifest so the promotion workflow and the dispatch command do not depend on a
 * hand-typed path. Selecting the newest manifest overall, rather than the newest one that happens to
 * hold the wanted status, prevents silently promoting a superseded release. The expected status is a
 * parameter because promotion wants the newest to be `approved` while verification, which runs after
 * deployment state is written back, wants it to be `deploying`.
 */
export async function resolveLatestManifest(
  root = repositoryRoot,
  expectedStatus: ReleaseManifest["status"] = "approved"
): Promise<string> {
  const releasesRoot = path.join(root, "releases");
  if (!(await pathExists(releasesRoot))) throw new Error("No releases directory exists");
  const candidates: { relativePath: string; createdAt: string; status: string }[] = [];
  for (const entry of await readdir(releasesRoot)) {
    if (!entry.endsWith(".md")) continue;
    const relativePath = `releases/${entry}`;
    let loaded;
    try {
      loaded = await loadReleaseManifest(relativePath, root);
    } catch (error) {
      // Silently skipping a malformed manifest could hide the newest release and promote an older
      // one in its place, so an unreadable file is a hard failure.
      throw new Error(
        `Release manifest ${relativePath} could not be read: ${error instanceof Error ? error.message : String(error)}`
      );
    }
    candidates.push({
      relativePath,
      // Ordering is by creation only. Mixing in approvedAt would rank a late-approved older release
      // above a newer draft and defeat the "newest must hold the expected status" guard below.
      createdAt: loaded.manifest.createdAt,
      status: loaded.manifest.status
    });
  }
  if (candidates.length === 0) throw new Error("No release manifest is available");
  candidates.sort(
    (left, right) =>
      right.createdAt.localeCompare(left.createdAt) ||
      right.relativePath.localeCompare(left.relativePath)
  );
  const newest = candidates[0]!;
  if (newest.status !== expectedStatus) {
    throw new Error(
      `The newest release manifest ${newest.relativePath} is ${newest.status}, not ${expectedStatus}. Prepare and approve a new manifest, or pass an explicit manifest path.`
    );
  }
  return newest.relativePath;
}

export async function resolveLatestApprovedManifest(root = repositoryRoot): Promise<string> {
  return resolveLatestManifest(root, "approved");
}

export async function recordReleaseDeployment(
  manifestOption: string,
  url: string,
  root = repositoryRoot,
  now = new Date()
): Promise<ReleaseManifest> {
  const { filePath, manifest, body, data } = await loadReleaseManifest(manifestOption, root);
  if (manifest.status !== "approved" && manifest.status !== "deploying") {
    throw new Error(`Only an approved release can be deployed, received ${manifest.status}`);
  }
  const deploying: ReleaseManifest = {
    ...manifest,
    status: "deploying",
    deployment: { url, deployedAt: now.toISOString() }
  };
  await writeReleaseManifest(filePath, deploying, body, data);
  return deploying;
}

export async function recordReleaseVerification(
  manifestOption: string,
  root = repositoryRoot,
  now = new Date()
): Promise<ReleaseManifest> {
  const { filePath, manifest, body, data } = await loadReleaseManifest(manifestOption, root);
  if (!manifest.deployment) {
    throw new Error("Release verification requires a recorded deployment");
  }
  if (manifest.status !== "deploying" && manifest.status !== "verified") {
    throw new Error(`Only a deploying release can be verified, received ${manifest.status}`);
  }
  const verified: ReleaseManifest = {
    ...manifest,
    status: "verified",
    deployment: { ...manifest.deployment, verifiedAt: now.toISOString() }
  };
  await writeReleaseManifest(filePath, verified, body, data);
  return verified;
}

/**
 * Dispatches the manual public promotion so the manifest path is never transcribed by hand.
 */
export async function dispatchPublicPromotion(
  manifestOption: string,
  root = repositoryRoot
): Promise<void> {
  await execFileAsync(
    "gh",
    [
      "workflow",
      "run",
      "promote-public.yml",
      "--ref",
      "main",
      "--field",
      `release_manifest=${manifestOption}`
    ],
    { cwd: root }
  );
}
