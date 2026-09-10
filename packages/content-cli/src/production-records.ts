import { createHash } from "node:crypto";
import { appendFile, lstat, mkdir, readFile, realpath, rm } from "node:fs/promises";
import path from "node:path";
import { productionDecisionSchema, type ProductionDecision, type WorkEnvelope } from "@ghcp/content-schema";

export function sha256(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

export function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return `{${Object.keys(object).filter(key => object[key] !== undefined).sort()
      .map(key => `${JSON.stringify(key)}:${canonical(object[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function workBaselineHash(envelope: WorkEnvelope): string {
  return sha256(canonical({
    initiative: envelope.initiative, moduleId: envelope.moduleId,
    baseline: envelope.baseline, ownedPaths: envelope.ownedPaths
  }));
}

export async function localFile(root: string, relative: string): Promise<string> {
  if (!relative || relative.includes("\\") || relative.includes(":") ||
      relative.split("/").some(part => !part || part === "." || part === "..")) {
    throw new Error(`Invalid relative artifact path: ${relative}`);
  }
  const [base, resolved] = await Promise.all([realpath(root), realpath(path.resolve(root, relative))]);
  if (!resolved.startsWith(`${base}${path.sep}`)) throw new Error(`Artifact escapes its root: ${relative}`);
  return resolved;
}

export function parseDecisions(text: string): ProductionDecision[] {
  const openings = [...text.matchAll(/^```production-decision[ \t]*\r?$/gm)];
  const blocks = [...text.matchAll(/^```production-decision[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm)];
  if (openings.length !== blocks.length) throw new Error("Incomplete production decision; reconcile decision-log.md before execution");
  const records = blocks.map(match => productionDecisionSchema.parse(JSON.parse(match[1]!)));
  if (new Set(records.map(record => record.id)).size !== records.length) {
    throw new Error("Ambiguous duplicate decision ids in decision-log.md");
  }
  records.forEach((record, index) => {
    if (!record.supersedes) return;
    const prior = records.slice(0, index).find(candidate => candidate.id === record.supersedes);
    if (!prior || prior.initiative !== record.initiative || prior.gate !== record.gate) {
      throw new Error(`Missing or contradictory superseded decision: ${record.supersedes}`);
    }
  });
  return records;
}

export function activeDecision(records: ProductionDecision[], id: string) {
  return records.some(record => record.supersedes === id) ? undefined : records.find(record => record.id === id);
}

export async function readDecisions(workshopRoot: string): Promise<ProductionDecision[]> {
  const log = await localFile(workshopRoot, "content/production/decision-log.md");
  const assertUnlocked = async () => {
    try {
      await lstat(`${log}.lock`);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") return;
      throw error;
    }
    throw new Error("Decision log is locked or uncertain after a failed write; inspect before execution");
  };
  await assertUnlocked();
  const records = parseDecisions(await readFile(log, "utf8"));
  await assertUnlocked();
  return records;
}

export async function recordProductionDecision(workshopRoot: string, value: unknown) {
  const decision = productionDecisionSchema.parse(value);
  const log = await localFile(workshopRoot, "content/production/decision-log.md");
  const lock = `${log}.lock`;
  try { await mkdir(lock); } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "EEXIST") {
      throw new Error("Decision log is locked; inspect prior writer before retry");
    }
    throw error;
  }
  let uncertainWrite = false;
  try {
    const existing = parseDecisions(await readFile(log, "utf8"));
    if (existing.some(entry => entry.id === decision.id)) throw new Error("Decision id already exists; do not duplicate or overwrite history");
    const block = `\n\`\`\`production-decision\n${JSON.stringify(decision, null, 2)}\n\`\`\`\n`;
    parseDecisions((await readFile(log, "utf8")) + block);
    uncertainWrite = true;
    await appendFile(log, block);
    uncertainWrite = false;
  } finally {
    if (!uncertainWrite) await rm(lock, { recursive: true });
  }
  return decision;
}

export function section(text: string, identifier: string): { text: string; startLine: number; endLine: number } {
  const lines = text.split(/\r?\n/);
  const matches = lines.flatMap((line, index) => /^###\s+/.test(line) && line.replace(/^###\s+/, "").trim() === identifier ? [index] : []);
  if (matches.length !== 1) throw new Error(`Missing or ambiguous initiative section: ${identifier}`);
  const start = matches[0]!;
  let end = start + 1;
  while (end < lines.length && !/^#{1,3}\s/.test(lines[end]!)) end++;
  return { text: lines.slice(start, end).join("\n"), startLine: start + 1, endLine: end };
}
