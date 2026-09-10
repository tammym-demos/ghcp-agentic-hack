import path from "node:path";
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import { afterEach, expect, it } from "vitest";
import { loadCatalog } from "@ghcp/content-schema";
import { repositoryRoot } from "./paths.js";
import { assertPinnedEntry, parseExportDeclarations, publicExportPlan, publicPackageScripts } from "./public-export.js";
import { planLeaderboardPublish } from "./leaderboard.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map(root => rm(root, { recursive: true, force: true })));
});

it("declares the exact selected runtime import closure without copying proof or review trees", async () => {
  const catalog = await loadCatalog(repositoryRoot);
  const plan = await publicExportPlan(repositoryRoot, catalog);
  if (!plan) throw new Error("Current snapshot must declare public export files");
  const files = new Set(plan.files);
  for (const file of plan.files.filter(file => /\.(vue|mjs|css)$/.test(file))) {
    const source = await readFile(path.join(repositoryRoot, file), "utf8");
    for (const match of source.matchAll(/(?:from\s+|import\s+|src=)["'](\.[^"']+)["']/g)) {
      const dependency = path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1]!));
      expect(files.has(dependency), `${file} imports undeclared ${dependency}`).toBe(true);
    }
  }
  for (const file of files) expect(file).not.toMatch(/\/(?:review|archive|production|generated)\//);
  expect(plan.tests.every(test => files.has(test))).toBe(true);
  for (const workshop of catalog.workshops.filter(workshop => workshop.workshop.data.leaderboard)) {
    const kit = await planLeaderboardPublish(workshop.workshop.data.id, "production", catalog, repositoryRoot);
    for (const file of kit.files) expect(files.has(`${kit.kitDirectory}/${file}`), `leaderboard kit ${file}`).toBe(true);
  }
  const foundations = catalog.workshops.flatMap(workshop => workshop.modules)
    .find(module => module.data.id === "foundations");
  if (foundations) {
    const prefix = "workshops/ghcp-dev-hack/content/modules/01-foundations/";
    for (const file of [
      "components/FoundationCacheWalkthrough.vue", "components/FoundationNative.vue",
      "components/control-navigation.mjs", "n3-proof/components/N3Comparison.vue",
      "token-cache-cli-motion/components/CacheWalkthrough.vue",
      "token-cache-cli-motion/components/cache-base.css", "token-cache-cli-motion/sequence.mjs",
      "token-cache-cli-motion/public/cli-controlled-action.png"
    ]) expect(files.has(`${prefix}${file}`), file).toBe(true);
    expect(plan.tests).toContain(`${prefix}token-cache-cli-motion/sequence.test.mjs`);
  }
});

it("uses the legacy plan only when declarations are absent, not malformed or unreadable", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-legacy-export-plan-"));
  roots.push(root);
  const catalog = { workshops: [] } as Awaited<ReturnType<typeof loadCatalog>>;
  expect(await publicExportPlan(root, catalog)).toBeNull();
  await mkdir(path.join(root, ".github", "public-release"), { recursive: true });
  const declarationPath = path.join(root, ".github", "public-release", "export-files.json");
  expect(await publicExportPlan(root, catalog)).toBeNull();
  await writeFile(declarationPath, "{");
  await expect(publicExportPlan(root, catalog)).rejects.toThrow(SyntaxError);
  await writeFile(declarationPath, "{}");
  await expect(publicExportPlan(root, catalog)).rejects.toThrow("schemaVersion");
  await rm(declarationPath);
  await mkdir(declarationPath);
  await expect(publicExportPlan(root, catalog)).rejects.toThrow();
});

it("selects files and tests by module and workshop, failing on missing files or directory entries", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-export-plan-"));
  roots.push(root);
  await mkdir(path.join(root, ".github", "public-release"), { recursive: true });
  await mkdir(path.join(root, "workshops", "one"), { recursive: true });
  const config = {
    schemaVersion: 1,
    modules: {
      "one/selected": { files: ["runtime.mjs", "runtime.test.mjs"], tests: ["runtime.test.mjs"] },
      "one/omitted": { files: ["private-file-not-present.mjs"], tests: [] }
    },
    workshops: {}
  };
  await writeFile(path.join(root, ".github", "public-release", "export-files.json"), JSON.stringify(config));
  for (const file of ["runtime.mjs", "runtime.test.mjs"])
    await writeFile(path.join(root, "workshops", "one", file), "");
  const catalog = {
    workshops: [{ workshop: { data: { id: "one" } }, modules: [{ data: { id: "selected" } }] }]
  } as Awaited<ReturnType<typeof loadCatalog>>;
  expect(await publicExportPlan(root, catalog)).toEqual({
    files: ["workshops/one/runtime.mjs", "workshops/one/runtime.test.mjs"],
    tests: ["workshops/one/runtime.test.mjs"]
  });
  await rm(path.join(root, "workshops", "one", "runtime.mjs"));
  await expect(publicExportPlan(root, catalog)).rejects.toThrow();
  await mkdir(path.join(root, "workshops", "one", "runtime.mjs"));
  await expect(publicExportPlan(root, catalog)).rejects.toThrow("regular files");
  await rm(path.join(root, "workshops", "one", "runtime.mjs"), { recursive: true });
  await mkdir(path.join(root, "private"));
  await writeFile(path.join(root, "private", "secret.mjs"), "private");
  await symlink(path.join(root, "private"), path.join(root, "workshops", "one", "redirect"),
    process.platform === "win32" ? "junction" : "dir");
  config.modules["one/selected"].files = ["redirect/secret.mjs"];
  config.modules["one/selected"].tests = [];
  await writeFile(path.join(root, ".github", "public-release", "export-files.json"), JSON.stringify(config));
  await expect(publicExportPlan(root, catalog)).rejects.toThrow("regular files");
});

it.each([true, false])("rejects redirected release directories (declaration present: %s)", async present => {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-export-declaration-"));
  const outside = await mkdtemp(path.join(os.tmpdir(), "ghcp-outside-declaration-"));
  roots.push(root, outside);
  await mkdir(path.join(root, ".github"));
  if (present) await writeFile(path.join(outside, "export-files.json"), JSON.stringify({
    schemaVersion: 1, modules: {}, workshops: {}
  }));
  await symlink(outside, path.join(root, ".github", "public-release"),
    process.platform === "win32" ? "junction" : "dir");
  await expect(publicExportPlan(root, { workshops: [] } as Awaited<ReturnType<typeof loadCatalog>>))
    .rejects.toThrow("regular files");
});

it.skipIf(process.platform === "win32")("rejects a declaration file symlink within the pinned root", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-export-declaration-link-"));
  roots.push(root);
  await mkdir(path.join(root, ".github", "public-release"), { recursive: true });
  const target = path.join(root, "declarations.json");
  await writeFile(target, JSON.stringify({ schemaVersion: 1, modules: {}, workshops: {} }));
  await symlink(target, path.join(root, ".github", "public-release", "export-files.json"));
  await expect(publicExportPlan(root, { workshops: [] } as Awaited<ReturnType<typeof loadCatalog>>))
    .rejects.toThrow("regular files");
});

it.each(["../secret", "/absolute", "C:/secret", "review/screenshot.png", "archive/baseline",
  "content/modules/01-intro/media/reviews/prompt.md", "media/REVIEWS/receipt.md",
  "content/production/decision-log.md", ".env", ".env.local", ".env/secrets.json",
  "nested/.ENV/secret.json", "private-tests/fixture.md", "content/Private-Tests/fixture.md",
  "generated/candidates/a.png", "x;echo"] )(
  "rejects unsafe or private declaration %s", file => {
    expect(() => parseExportDeclarations({
      schemaVersion: 1, modules: { "one/intro": { files: [file], tests: [] } }, workshops: {}
    })).toThrow("Invalid public export file");
  }
);

it.skipIf(process.platform === "win32").each(["pages.yml", "README.md"])(
  "rejects symlinked fixed public template %s", async file => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-export-template-link-"));
    roots.push(root);
    await mkdir(path.join(root, ".github", "public-release"), { recursive: true });
    const target = path.join(root, "private-template");
    await writeFile(target, "must not be exported");
    await symlink(target, path.join(root, ".github", "public-release", file));
    await expect(assertPinnedEntry(root, `.github/public-release/${file}`))
      .rejects.toThrow("regular files");
  }
);

it("requires explicitly copied tests and retains only portable root entry points", () => {
  expect(() => parseExportDeclarations({
    schemaVersion: 1, modules: {}, workshops: { one: { files: [], tests: ["missing.test.mjs"] } }
  })).toThrow("explicitly included");
  expect(publicPackageScripts({
    build: "pnpm build:real", typecheck: "pnpm -r typecheck", validate: "pnpm content validate",
    test: "pnpm test:private", "test:private": "node private.mjs", "review:slides": "node review.mjs"
  }, ["workshops/one/runtime.test.mjs"])).toEqual({
    build: "pnpm build:real", typecheck: "pnpm -r typecheck", validate: "pnpm content validate",
    test: 'pnpm -r test && node --test "workshops/one/runtime.test.mjs"'
  });
  expect(publicPackageScripts({}, [])).toEqual({ test: "pnpm -r test" });
});
