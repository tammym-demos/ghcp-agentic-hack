import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");
const args = process.argv.slice(2);
const help = args.includes("--help") || args.includes("-h");

if (help) {
  console.log(`Usage: pnpm review:module -- <workshop-id> <module-id>

Runs content validation, builds the production-shaped site, and verifies the built deck route exists for one module.

Deck route: workshops/<workshop-id>/<module-id>/`);
  process.exit(0);
}

const [workshopId, moduleId, ...extra] = args;

if (!workshopId || !moduleId || extra.length > 0) {
  console.error("Usage: pnpm review:module -- <workshop-id> <module-id>");
  process.exit(1);
}

runPnpm(["content", "validate"]);
runPnpm(["build"], { GITHUB_PAGES_BASE: "/" });

const routesPath = join(dist, "site-routes.json");
if (!existsSync(routesPath)) {
  throw new Error(`Expected route manifest at ${routesPath}.`);
}

const route = `workshops/${workshopId}/${moduleId}/`;
const manifest = JSON.parse(readFileSync(routesPath, "utf8"));
if (!Array.isArray(manifest.routes)) {
  throw new Error(`Expected ${routesPath} to contain a routes array.`);
}

if (!manifest.routes.includes(route)) {
  throw new Error(`Built route manifest does not include ${route}.`);
}

const routeIndex = join(dist, ...route.split("/").filter(Boolean), "index.html");
if (!existsSync(routeIndex)) {
  throw new Error(`Missing built route: ${routeIndex}`);
}

console.log(`Validated built module route: ${route}`);

function runPnpm(args, env = {}) {
  const packageManager = process.env.npm_execpath;
  if (!packageManager?.toLowerCase().includes("pnpm")) {
    throw new Error("Run this script through pnpm, for example: pnpm review:module <workshop-id> <module-id>");
  }
  execFileSync(process.execPath, [packageManager, ...args], {
    cwd: root,
    env: { ...process.env, ...env },
    stdio: "inherit"
  });
}
