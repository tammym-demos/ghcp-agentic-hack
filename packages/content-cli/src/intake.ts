import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import fsExtra from "fs-extra";
import fg from "fast-glob";
import matter from "gray-matter";
import {
  workshopRequirementsSchema,
  type WorkshopRequirements
} from "@ghcp/content-schema";
import { repositoryRoot, workshopsRoot } from "./paths.js";
import { textSha256 } from "./production-records.js";
import { scaffoldModule, scaffoldWorkshop } from "./scaffold.js";

const { pathExists } = fsExtra;

type IntakeRoots = { repositoryRoot: string; workshopsRoot: string };
const defaults: IntakeRoots = { repositoryRoot, workshopsRoot };

function repositoryFile(input: string, root: string): string {
  const resolved = path.resolve(root, input);
  const relative = path.relative(root, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error("Requirements file must remain inside the repository");
  }
  return resolved;
}

function orderedFolder(index: number, moduleId: string): string {
  return `${String(index + 1).padStart(2, "0")}-${moduleId}`;
}

const budgetKeys = [
  "instructionMinutes",
  "missionMinutes",
  "discussionMinutes",
  "mediaPlaybackMinutes",
  "setupAndTransitionsMinutes",
  "breaksMinutes",
  "contingencyMinutes"
] as const;

type Budget = Record<(typeof budgetKeys)[number], number>;

function defaultBudget(minutes: number): Budget {
  return {
    instructionMinutes: minutes,
    missionMinutes: 0,
    discussionMinutes: 0,
    mediaPlaybackMinutes: 0,
    setupAndTransitionsMinutes: 0,
    breaksMinutes: 0,
    contingencyMinutes: 0
  };
}

// Requirements own only the total; keep an authored distribution whenever it still
// matches that total, and reset it when the requirements change the timebox.
function mergedBudget(existing: unknown, minutes: number): Budget {
  if (existing && typeof existing === "object" && !Array.isArray(existing)) {
    const candidate = existing as Record<string, unknown>;
    const values = budgetKeys.map((key) => candidate[key]);
    if (
      values.every((value) => typeof value === "number") &&
      values.reduce((total, value) => total + (value as number), 0) === minutes
    ) {
      return Object.fromEntries(budgetKeys.map((key) => [key, candidate[key] as number])) as Budget;
    }
  }
  return defaultBudget(minutes);
}

// The workshop schedule must cover every module budget it aggregates, so an authored
// distribution survives only while it still does; otherwise it is derived from the modules.
function workshopSchedule(existing: unknown, totalMinutes: number, moduleBudgets: Budget[]): Budget {
  const aggregate = defaultBudget(0);
  for (const budget of moduleBudgets) {
    for (const key of budgetKeys) aggregate[key] += budget[key];
  }
  const authored = mergedBudget(existing, totalMinutes);
  if (budgetKeys.every((key) => authored[key] >= aggregate[key])) return authored;
  const allocated = budgetKeys.reduce((total, key) => total + aggregate[key], 0);
  return { ...aggregate, breaksMinutes: aggregate.breaksMinutes + Math.max(0, totalMinutes - allocated) };
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function workshopFrontmatter(
  existing: Record<string, unknown>,
  requirements: WorkshopRequirements,
  reviewedAt: string,
  moduleBudgets: Budget[]
): Record<string, unknown> {
  return {
    ...existing,
    schemaVersion: 1,
    kind: "workshop",
    id: requirements.id,
    title: requirements.title,
    lifecycleVersion: 3,
    description: requirements.description,
    format: requirements.format,
    duration: `${requirements.durationMinutes} minutes`,
    totalMinutes: requirements.durationMinutes,
    schedule: workshopSchedule(existing.schedule, requirements.durationMinutes, moduleBudgets),
    runOfShow: requirements.modules.map((module) => ({
      id: module.id,
      type: "module",
      title: module.title,
      minutes: module.minutes,
      module: module.id
    })),
    level: requirements.level,
    audience: requirements.audience,
    modules: requirements.modules.map((module) => module.id),
    lastReviewed: reviewedAt
  };
}

function workshopBody(requirements: WorkshopRequirements): string {
  return `
# ${requirements.title}

${requirements.description}

## Outcomes

${requirements.outcomes.map((outcome) => `- ${outcome}`).join("\n")}
`;
}

function moduleFrontmatter(
  existing: Record<string, unknown>,
  module: WorkshopRequirements["modules"][number],
  folder: string
): Record<string, unknown> {
  const sourceDocuments = stringList(existing.sourceDocuments);
  return {
    ...existing,
    schemaVersion: 1,
    kind: "module",
    id: module.id,
    title: module.title,
    description: module.outcomes[0],
    duration: `${module.minutes} minutes`,
    totalMinutes: module.minutes,
    timing: mergedBudget(existing.timing, module.minutes),
    objectives: module.outcomes,
    sourceDocuments: sourceDocuments.includes("requirements.md")
      ? sourceDocuments
      : [...sourceDocuments, "requirements.md"],
    slides: typeof existing.slides === "string" ? existing.slides : `content/modules/${folder}/slides.md`
  };
}

function moduleBody(module: WorkshopRequirements["modules"][number]): string {
  return `
# ${module.title}

This module is generated from \`requirements.md\`.
`;
}

async function writeStateRequirements(
  workshopRoot: string,
  requirementsHash: string,
  now: Date
): Promise<void> {
  const statePath = path.join(workshopRoot, "content", "production", "production-state.md");
  const parsed = matter(await readFile(statePath, "utf8"));
  const preservedStatus = ["paused", "blocked"].includes(parsed.data.sessionStatus)
    ? parsed.data.sessionStatus
    : "active";
  const updated = {
    ...parsed.data,
    lifecycleVersion: 3,
    phase: "drafting",
    sessionStatus: preservedStatus,
    nextOwner: "Workshop Content Architect",
    nextHumanGate: "Local draft approval",
    resumeTask: "produce-local-draft",
    paidGeneration: "approved-for-listed-actions",
    requirements: { path: "requirements.md", sha256: requirementsHash },
    environment: "local",
    imageBatch: { limit: 3, used: 0 },
    updatedAt: now.toISOString()
  };
  await writeFile(statePath, matter.stringify(parsed.content, updated), "utf8");
}

export async function intakeWorkshop(
  requirementsOption: string,
  roots: IntakeRoots = defaults,
  now = new Date()
): Promise<{ workshopId: string; requirementsPath: string; created: boolean; modulesCreated: string[] }> {
  const sourcePath = repositoryFile(requirementsOption, roots.repositoryRoot);
  if (!(await pathExists(sourcePath))) throw new Error(`Requirements file does not exist: ${requirementsOption}`);
  const raw = await readFile(sourcePath, "utf8");
  const parsed = matter(raw);
  const requirements = workshopRequirementsSchema.parse(parsed.data);
  const requirementsHash = textSha256(raw);
  const workshopRoot = path.join(roots.workshopsRoot, requirements.id);
  const created = !(await pathExists(path.join(workshopRoot, "workshop.md")));
  if (created) {
    await scaffoldWorkshop(requirements.id, requirements.title, roots, {
      createDefaultModule: false,
      lifecycleVersion: 3,
      requirements: { path: "requirements.md", sha256: requirementsHash }
    });
  }

  const existingModules = new Map<string, { filePath: string; folder: string }>();
  for (const filePath of await fg("content/modules/*/module.md", {
    cwd: workshopRoot,
    absolute: true
  })) {
    const module = matter(await readFile(filePath, "utf8"));
    if (typeof module.data.id === "string") {
      existingModules.set(module.data.id, {
        filePath,
        folder: path.basename(path.dirname(filePath))
      });
    }
  }
  const requestedModuleIds = new Set(requirements.modules.map((module) => module.id));
  const removedModules = [...existingModules.keys()].filter((moduleId) => !requestedModuleIds.has(moduleId));
  if (removedModules.length) {
    throw new Error(
      `Requirements remove existing modules (${removedModules.join(", ")}); retire or migrate them explicitly before intake`
    );
  }

  const canonicalRequirements = path.join(workshopRoot, "requirements.md");
  if (path.resolve(sourcePath) !== path.resolve(canonicalRequirements)) {
    await writeFile(canonicalRequirements, raw, "utf8");
  }
  const modulesCreated: string[] = [];
  const moduleBudgets: Budget[] = [];
  for (const [index, module] of requirements.modules.entries()) {
    const existing = existingModules.get(module.id);
    const folder = existing?.folder ?? orderedFolder(index, module.id);
    const modulePath = existing?.filePath ?? path.join(workshopRoot, "content", "modules", folder, "module.md");
    if (!existing) {
      await scaffoldModule(requirements.id, folder, module.id, module.title, roots.workshopsRoot);
      modulesCreated.push(module.id);
    }
    const parsedModule = matter(await readFile(modulePath, "utf8"));
    const frontmatter = moduleFrontmatter(parsedModule.data, module, folder);
    moduleBudgets.push(frontmatter.timing as Budget);
    await writeFile(
      modulePath,
      matter.stringify(existing ? parsedModule.content : moduleBody(module), frontmatter),
      "utf8"
    );
  }

  const workshopPath = path.join(workshopRoot, "workshop.md");
  const existingWorkshop = matter(await readFile(workshopPath, "utf8"));
  await writeFile(
    workshopPath,
    matter.stringify(
      created ? workshopBody(requirements) : existingWorkshop.content,
      workshopFrontmatter(existingWorkshop.data, requirements, now.toISOString().slice(0, 10), moduleBudgets)
    ),
    "utf8"
  );

  await writeStateRequirements(workshopRoot, requirementsHash, now);
  return {
    workshopId: requirements.id,
    requirementsPath: path.relative(roots.repositoryRoot, canonicalRequirements).split(path.sep).join("/"),
    created,
    modulesCreated
  };
}
