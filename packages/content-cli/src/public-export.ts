import path from "node:path";
import { lstat, readFile, realpath } from "node:fs/promises";
import type { ContentCatalog } from "@ghcp/content-schema";

interface ExportFiles {
  files: string[];
  tests: string[];
}

interface ExportDeclarations {
  schemaVersion: 1;
  modules: Record<string, ExportFiles>;
  workshops: Record<string, ExportFiles>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validatePath(value: unknown): asserts value is string {
  if (typeof value !== "string" || !/^[a-zA-Z0-9_./-]+$/.test(value) ||
      value.startsWith("/") || value.split("/").some(part => !part || part === "." || part === "..") ||
      value.split("/").some(part => ["archive", "review", "reviews", "production", "generated", "node_modules", ".git", "private-tests"].includes(part.toLowerCase())) ||
      /(^|\/)\.env(?:[./]|$)/i.test(value)) {
    throw new Error(`Invalid public export file: ${String(value)}`);
  }
}

export function parseExportDeclarations(value: unknown): ExportDeclarations {
  if (!isRecord(value) || value.schemaVersion !== 1 || !isRecord(value.modules) || !isRecord(value.workshops)) {
    throw new Error("Public export declarations require schemaVersion 1, modules and workshops");
  }
  const parseEntries = (entries: Record<string, unknown>): Record<string, ExportFiles> =>
    Object.fromEntries(Object.entries(entries).map(([key, entry]) => {
      validatePath(key);
      if (!isRecord(entry) || !Array.isArray(entry.files) || !Array.isArray(entry.tests)) {
        throw new Error(`Public export entry ${key} requires files and tests arrays`);
      }
      const files: string[] = [];
      const tests: string[] = [];
      for (const file of entry.files) {
        validatePath(file);
        files.push(file);
      }
      for (const test of entry.tests) {
        validatePath(test);
        if (!files.includes(test) || !test.endsWith(".test.mjs")) {
          throw new Error(`Public export test must be an explicitly included .test.mjs file: ${test}`);
        }
        tests.push(test);
      }
      return [key, { files, tests }];
    }));
  return { schemaVersion: 1, modules: parseEntries(value.modules), workshops: parseEntries(value.workshops) };
}

export async function assertPinnedEntry(sourceRoot: string, file: string, directory = false): Promise<void> {
  const absolute = path.resolve(sourceRoot, file);
  const relative = path.relative(await realpath(sourceRoot), await realpath(absolute));
  const normalize = (name: string) => process.platform === "win32" ? name.toLowerCase() : name;
  const entry = await lstat(absolute);
  if (normalize(relative.split(path.sep).join("/")) !== normalize(file) ||
      !(directory ? entry.isDirectory() : entry.isFile())) {
    throw new Error(`Public export paths must name regular files or required directories within the source root: ${file}`);
  }
}

export async function publicExportPlan(sourceRoot: string, catalog: ContentCatalog) {
  for (const parent of [".github", ".github/public-release"]) {
    try {
      await lstat(path.join(sourceRoot, parent));
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
      throw error;
    }
    await assertPinnedEntry(sourceRoot, parent, true);
  }
  const declarationPath = path.join(sourceRoot, ".github", "public-release", "export-files.json");
  try {
    await lstat(declarationPath);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
  await assertPinnedEntry(sourceRoot, ".github/public-release/export-files.json");
  const declarations = parseExportDeclarations(JSON.parse(
    await readFile(declarationPath, "utf8")
  ));
  const files = new Set<string>();
  const tests = new Set<string>();
  for (const workshop of catalog.workshops) {
    const id = workshop.workshop.data.id;
    const entries = [
      declarations.workshops[id],
      ...workshop.modules.map(module => declarations.modules[`${id}/${module.data.id}`])
    ];
    for (const entry of entries) {
      if (!entry) continue; // Modules without local runtime dependencies need no extra files.
      for (const file of entry.files) files.add(`workshops/${id}/${file}`);
      for (const test of entry.tests) tests.add(`workshops/${id}/${test}`);
    }
  }
  for (const file of files) {
    await assertPinnedEntry(sourceRoot, file);
  }
  return { files: [...files], tests: [...tests] };
}

export function publicPackageScripts(scripts: Record<string, string>, tests: string[]) {
  const portable = Object.fromEntries(["build", "content", "typecheck", "validate"].flatMap(name =>
    scripts[name] ? [[name, scripts[name]]] : []
  ));
  return {
    ...portable,
    test: ["pnpm -r test", ...(tests.length ? [`node --test ${tests.map(test => `"${test}"`).join(" ")}`] : [])].join(" && ")
  };
}
