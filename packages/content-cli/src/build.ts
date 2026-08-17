import path from "node:path";
import fsExtra from "fs-extra";
import { loadCatalog } from "@ghcp/content-schema";
import { generatePortalCatalog } from "./catalog.js";
import { outputRoot, repositoryRoot } from "./paths.js";
import { run } from "./process.js";
import {
  filterCatalogForRelease,
  loadReleaseManifest,
  validateApprovedRelease
} from "./release.js";

const { copy, ensureDir, pathExists, writeJson } = fsExtra;

export function deckBase(workshopId: string, moduleId: string, pagesBase = "/"): string {
  const normalizedBase = pagesBase.endsWith("/") ? pagesBase : `${pagesBase}/`;
  return `${normalizedBase}workshops/${workshopId}/${moduleId}/`;
}

export function portalDetailRoutes(catalog: Awaited<ReturnType<typeof loadCatalog>>): string[] {
  return catalog.workshops.flatMap((entry) => {
    const workshopId = entry.workshop.data.id;
    return [
      `workshops/${workshopId}/`,
      ...(entry.workshop.data.deliveryVariants ?? []).map(
        (variant) => `workshops/${workshopId}/variants/${variant.id}/`
      ),
      ...entry.modules.flatMap((module) =>
        (module.data.missions ?? []).flatMap((missionPath) => {
          const mission = entry.missions.find(({ filePath }) =>
            filePath.replaceAll("\\", "/").endsWith(missionPath)
          );
          return mission
            ? [`workshops/${workshopId}/${module.data.id}/missions/${mission.data.id}/`]
            : [];
        })
      )
    ];
  });
}

export function siteRoutes(catalog: Awaited<ReturnType<typeof loadCatalog>>): string[] {
  return [
    "",
    ...portalDetailRoutes(catalog),
    ...catalog.workshops.flatMap((entry) =>
      entry.modules.map((module) => `workshops/${entry.workshop.data.id}/${module.data.id}/`)
    )
  ];
}

export async function buildSite(releaseManifestOption = process.env.GHCP_RELEASE_MANIFEST): Promise<void> {
  const completeCatalog = await loadCatalog(repositoryRoot);
  let catalog = completeCatalog;
  let releaseId: string | undefined;
  let releaseCommit: string | undefined;
  if (releaseManifestOption) {
    await validateApprovedRelease(releaseManifestOption);
    const { manifest } = await loadReleaseManifest(releaseManifestOption);
    releaseId = manifest.id;
    releaseCommit = manifest.commit;
    catalog = filterCatalogForRelease(completeCatalog, manifest);
  }
  await generatePortalCatalog(catalog);
  await run("pnpm", ["--filter", "@ghcp/portal", "build"], repositoryRoot);
  const portalIndex = path.join(outputRoot, "index.html");
  const detailRoutes = portalDetailRoutes(catalog);
  for (const route of detailRoutes) {
    const routeRoot = path.join(outputRoot, ...route.split("/").filter(Boolean));
    await ensureDir(routeRoot);
    await copy(portalIndex, path.join(routeRoot, "index.html"));
  }
  const routes = siteRoutes(catalog);
  await writeJson(path.join(outputRoot, "site-routes.json"), { routes }, { spaces: 2 });
  if (releaseId && releaseCommit) {
    await writeJson(
      path.join(outputRoot, "release-routes.json"),
      {
        releaseId,
        contentCommit: releaseCommit,
        routes
      },
      { spaces: 2 }
    );
  }

  for (const entry of catalog.workshops) {
    const workshopId = entry.workshop.data.id;
    const assets = path.join(entry.root, "assets");
    if (!releaseManifestOption && (await pathExists(assets))) {
      await copy(assets, path.join(outputRoot, "workshops", workshopId, "assets"));
    } else if (releaseManifestOption) {
      const selectedAssets = new Set(entry.modules.flatMap((module) => module.data.assets));
      for (const relativeAsset of selectedAssets) {
        const source = path.join(entry.root, ...relativeAsset.split("/"));
        const destination = path.join(outputRoot, "workshops", workshopId, ...relativeAsset.split("/"));
        await copy(source, destination);
        const sidecar = `${source}.json`;
        if (await pathExists(sidecar)) await copy(sidecar, `${destination}.json`);
      }
    }
    for (const module of entry.modules) {
      const output = path.join(outputRoot, "workshops", workshopId, module.data.id);
      const slides = path.resolve(entry.root, module.data.slides);
      const base = deckBase(workshopId, module.data.id, process.env.GITHUB_PAGES_BASE);
      await ensureDir(output);
      await run(
        "pnpm",
        [
          "--filter",
          "@ghcp/decks",
          "exec",
          "slidev",
          "build",
          slides,
          "--out",
          output,
          "--base",
          base,
          "--router-mode",
          "hash"
        ],
        repositoryRoot
      );
    }
  }
}
