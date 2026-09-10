import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fsExtra from "fs-extra";
import matter from "gray-matter";
import { loadCatalog, productionStateSchema, type ProductionState } from "@ghcp/content-schema";
import { repositoryRoot, workshopsRoot } from "./paths.js";
import { activeDecision, localFile, readDecisions, section, sha256 } from "./production-records.js";

const execFileAsync = promisify(execFile);
const { pathExists, readFile, writeFile } = fsExtra;

type LifecycleRoots = {
  repositoryRoot: string;
  workshopsRoot: string;
};

const defaultRoots: LifecycleRoots = { repositoryRoot, workshopsRoot };

function statePath(workshopId: string, roots: LifecycleRoots): string {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(workshopId)) throw new Error("Invalid workshop id");
  return path.join(roots.workshopsRoot, workshopId, "content", "production", "production-state.md");
}

async function gitOutput(args: string[], root: string): Promise<string> {
  const result = await execFileAsync("git", args, { cwd: root });
  return result.stdout.trim();
}

export async function gitSnapshot(root = repositoryRoot): Promise<{
  branch: string;
  commit: string;
  dirtyFiles: string[];
}> {
  const [branch, commit, status] = await Promise.all([
    gitOutput(["branch", "--show-current"], root),
    gitOutput(["rev-parse", "HEAD"], root),
    gitOutput(["status", "--porcelain=v1"], root)
  ]);
  return {
    branch: branch || "detached-head",
    commit,
    dirtyFiles: status ? status.split(/\r?\n/) : []
  };
}

export async function loadProductionState(
  workshopId: string,
  roots: LifecycleRoots = defaultRoots
): Promise<{ filePath: string; body: string; state: ProductionState }> {
  const filePath = statePath(workshopId, roots);
  if (!(await pathExists(filePath))) {
    throw new Error(`Production state does not exist: ${filePath}`);
  }
  const parsed = matter(await readFile(filePath, "utf8"), {});
  return { filePath, body: parsed.content, state: productionStateSchema.parse(parsed.data) };
}

async function saveProductionState(
  filePath: string,
  body: string,
  state: ProductionState
): Promise<void> {
  await writeFile(filePath, matter.stringify(body, state), "utf8");
}

function checkpointId(date: Date): string {
  return `checkpoint-${date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "z").toLowerCase()}`;
}

export type LifecycleStateIssue = {
  workshopId: string;
  severity: "error" | "warning";
  message: string;
};

function ledgerPath(workshopId: string, roots: LifecycleRoots): string {
  return path.join(roots.workshopsRoot, workshopId, "content", "production", "production-ledger.md");
}

function ledgerInitiativeIds(ledger: string): string[] {
  const ids: string[] = [];
  for (const line of ledger.split(/\r?\n/)) {
    const match = /^###\s+(\S+)\s*$/.exec(line);
    if (match?.[1]) {
      ids.push(match[1]);
    }
  }
  return ids;
}

/**
 * Guards the durable resume contract. `production-state.md` is the current-state
 * authority for fresh sessions, so a stale record here is more damaging than a
 * stale ledger entry and must not pass validation silently.
 */
export async function validateLifecycleState(
  workshopIds: string[],
  roots: LifecycleRoots = defaultRoots
): Promise<LifecycleStateIssue[]> {
  const issues: LifecycleStateIssue[] = [];

  let snapshot: { branch: string; commit: string; dirtyFiles: string[] } | undefined;
  try {
    snapshot = await gitSnapshot(roots.repositoryRoot);
  } catch {
    snapshot = undefined;
  }

  for (const workshopId of workshopIds) {
    const filePath = statePath(workshopId, roots);
    if (!(await pathExists(filePath))) {
      continue;
    }
    const { state } = await loadProductionState(workshopId, roots);

    const ledgerFile = ledgerPath(workshopId, roots);
    if (await pathExists(ledgerFile)) {
      const ids = ledgerInitiativeIds(await readFile(ledgerFile, "utf8"));
      if (ids.length > 0 && !ids.includes(state.currentInitiative)) {
        issues.push({
          workshopId,
          severity: "error",
          message:
            `production-state.md currentInitiative "${state.currentInitiative}" does not match any ` +
            `initiative in production-ledger.md. Checkpoint cannot repair this, because it preserves ` +
            `currentInitiative. Edit currentInitiative in production-state.md to name the real initiative ` +
            `(or add that initiative to production-ledger.md), commit, then run ` +
            `"pnpm content checkpoint ${workshopId}" to record the corrected durable state, and re-run ` +
            `"pnpm validate" to confirm the repair.`
        });
      }
    }

    if (snapshot && snapshot.branch !== "detached-head" && state.branch !== snapshot.branch) {
      issues.push({
        workshopId,
        severity: "warning",
        message:
          `production-state.md records branch "${state.branch}" but "${snapshot.branch}" is checked out. ` +
          `Run "pnpm content checkpoint ${workshopId}" if this branch owns the current work.`
      });
    }

    if (snapshot) {
      try {
        // Exclude content/production: the commit that records a checkpoint is always
        // newer than the updatedAt inside it, so including it would warn on healthy
        // state. The real signal is teaching content moving on without a resume update.
        const lastContentCommit = await gitOutput(
          [
            "log",
            "-1",
            "--format=%cI",
            "--",
            `workshops/${workshopId}/content`,
            `:(exclude)workshops/${workshopId}/content/production`
          ],
          roots.repositoryRoot
        );
        if (lastContentCommit && Date.parse(lastContentCommit) > Date.parse(state.updatedAt)) {
          issues.push({
            workshopId,
            severity: "warning",
            message:
              `production-state.md updatedAt (${state.updatedAt}) predates the newest committed content change ` +
              `(${lastContentCommit}). The recorded resume task may no longer be accurate.`
          });
        }
      } catch {
        // Shallow clones and export worktrees may not carry the content history.
      }
    }
  }

  return issues;
}

export async function pauseWorkshop(
  workshopId: string,
  reason: string,
  roots: LifecycleRoots = defaultRoots,
  now = new Date()
): Promise<ProductionState> {
  const loaded = await loadProductionState(workshopId, roots);
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  const updated = productionStateSchema.parse({
    ...loaded.state,
    sessionStatus: "paused",
    branch: snapshot.branch,
    pausedAt: now.toISOString(),
    pauseReason: reason,
    updatedAt: now.toISOString()
  });
  await saveProductionState(loaded.filePath, loaded.body, updated);
  return updated;
}

/**
 * Records where the work actually is: branch, commit, checkpoint id, and time.
 *
 * It deliberately does not touch `currentInitiative`, `resumeTask`, or any other
 * human-authored field — those are judgements, not observations, and a command
 * that silently rewrote them would destroy the durable record it exists to
 * protect. Repairing a wrong `currentInitiative` is therefore an edit to
 * `production-state.md` followed by a commit and then a checkpoint, never a
 * checkpoint alone.
 */
export async function checkpointWorkshop(
  workshopId: string,
  roots: LifecycleRoots = defaultRoots,
  now = new Date()
): Promise<ProductionState> {
  const loaded = await loadProductionState(workshopId, roots);
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  if (snapshot.dirtyFiles.length > 0) {
    throw new Error(
      `Checkpoint requires a clean worktree. Commit or explicitly preserve these files first:\n${snapshot.dirtyFiles.join("\n")}`
    );
  }
  const updated = productionStateSchema.parse({
    ...loaded.state,
    branch: snapshot.branch,
    lastValidatedCommit: snapshot.commit,
    checkpointId: checkpointId(now),
    updatedAt: now.toISOString()
  });
  await saveProductionState(loaded.filePath, loaded.body, updated);
  return updated;
}

async function commitIsAncestor(expected: string, current: string, root: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", expected, current], { cwd: root });
    return true;
  } catch {
    return false;
  }
}

export async function workshopStatus(
  workshopId: string,
  roots: LifecycleRoots = defaultRoots
): Promise<string> {
  const loaded = await loadProductionState(workshopId, roots);
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  const state = loaded.state;
  const commitCompatible = await commitIsAncestor(state.lastValidatedCommit, snapshot.commit, roots.repositoryRoot);
  return [
    `Workshop: ${state.workshop}`,
    `Phase: ${state.phase} (${state.sessionStatus})`,
    `Initiative: ${state.currentInitiative}`,
    `Owner: ${state.currentOwner}`,
    `Next owner: ${state.nextOwner}`,
    `Next human gate: ${state.nextHumanGate}`,
    `Resume task: ${state.resumeTask}`,
    `Paid generation: ${state.paidGeneration}`,
    `Release: ${state.releaseState}`,
    `Timing: ${state.timing.allocatedMinutes}/${state.timing.totalMinutes} minutes (${state.timing.source})`,
    `Checkpoint: ${state.checkpointId} at ${state.lastValidatedCommit.slice(0, 12)}`,
    `Repository: ${snapshot.branch}@${snapshot.commit.slice(0, 12)} (${snapshot.dirtyFiles.length} dirty path(s))`,
    `Checkpoint ancestry: ${commitCompatible ? "compatible" : "diverged"}`,
    `Blockers: ${state.blockers.length > 0 ? state.blockers.join("; ") : "none"}`
  ].join("\n");
}

export async function workshopContext(
  workshopId: string,
  initiative?: string,
  roots: LifecycleRoots = defaultRoots
) {
  const loaded = await loadProductionState(workshopId, roots);
  if (loaded.state.workshop !== workshopId) throw new Error("Production state workshop mismatch");
  const selected = initiative ?? loaded.state.currentInitiative;
  const workshopRoot = path.join(roots.workshopsRoot, workshopId);
  const ledger = await readFile(ledgerPath(workshopId, roots), "utf8");
  section(ledger, loaded.state.currentInitiative);
  const activeSection = section(ledger, selected);
  const references = loaded.state.contextRefs.filter(ref => ref.initiative === selected);
  if (references.length > 1) throw new Error(`Ambiguous context references: ${selected}`);
  const refs = references[0];
  const missingPrerequisites: string[] = [];
  if (!refs) missingPrerequisites.push("No structured contextRefs; no authority inferred from historical prose");
  const decisions = refs ? await readDecisions(workshopRoot) : [];
  const selectedDecisions = (refs?.decisionIds ?? []).map(id => {
    const decision = activeDecision(decisions, id);
    if (!decision || decision.initiative !== selected) throw new Error(`Missing or contradictory decision: ${id}`);
    return decision;
  });
  const paths = [...new Set([
    ...(refs ? [refs.preflight, ...refs.artifactPaths] : []),
    ...(selected === loaded.state.currentInitiative ? loaded.state.approvedArtifacts : [])
  ])];
  const artifacts = await Promise.all(paths.map(async artifact => ({
    path: artifact,
    sha256: sha256(await readFile(await localFile(workshopRoot, artifact)))
  })));
  const preflightSection = refs?.preflightSection
    ? section(await readFile(await localFile(workshopRoot, refs.preflight), "utf8"), refs.preflightSection)
    : undefined;
  const preflight = preflightSection ? {
    path: refs!.preflight, section: refs!.preflightSection,
    startLine: preflightSection.startLine, endLine: preflightSection.endLine,
    sha256: sha256(preflightSection.text)
  } : undefined;
  const issues = await validateLifecycleState([workshopId], roots);
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  const compatible = await commitIsAncestor(loaded.state.lastValidatedCommit, snapshot.commit, roots.repositoryRoot);
  if (!compatible) missingPrerequisites.push("Checkpoint ancestry diverged");
  if (loaded.state.sessionStatus !== "active") missingPrerequisites.push(`Production is ${loaded.state.sessionStatus}`);
  missingPrerequisites.push(...loaded.state.blockers);
  if (selected !== loaded.state.currentInitiative) missingPrerequisites.push("Named initiative is not current; inspection only");
  return {
    derived: true,
    workshop: workshopId,
    initiative: selected,
    state: loaded.state,
    statePath: "content/production/production-state.md",
    stateHash: sha256(await readFile(loaded.filePath)),
    ledger: { path: "content/production/production-ledger.md", section: selected,
      startLine: activeSection.startLine, endLine: activeSection.endLine, sha256: sha256(activeSection.text) },
    decisions: selectedDecisions,
    preflight,
    artifacts,
    repository: snapshot,
    checkpointCompatible: compatible,
    issues,
    missingPrerequisites,
    nextPermittedAction: "Inspect referenced artifacts; execution requires applicable explicit decisions and an exact work envelope for side effects"
  };
}

export async function resumeWorkshop(
  workshopId: string,
  roots: LifecycleRoots = defaultRoots,
  options: { checkOnly?: boolean; now?: Date } = {}
): Promise<string> {
  const loaded = await loadProductionState(workshopId, roots);
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  if (!(await commitIsAncestor(loaded.state.lastValidatedCommit, snapshot.commit, roots.repositoryRoot))) {
    throw new Error(
      `Recorded checkpoint ${loaded.state.lastValidatedCommit} is not an ancestor of current HEAD ${snapshot.commit}. Reconcile repository history before resuming.`
    );
  }
  const lifecycleArtifacts = [
    ...loaded.state.approvedArtifacts,
    ...loaded.state.activeTracks.flatMap((track) => (track.artifact ? [track.artifact] : [])),
    loaded.state.timing.source
  ];
  for (const artifact of lifecycleArtifacts) {
    const artifactPath = path.resolve(roots.workshopsRoot, workshopId, ...artifact.split("/"));
    if (!(await pathExists(artifactPath))) {
      throw new Error(`Approved lifecycle artifact is missing: ${artifact}`);
    }
  }

  // Resuming is what ends a pause. Without this the flag set by `pause` could only
  // be cleared by hand-editing durable state, so every workshop would read
  // "paused" forever and the flag would stop carrying information. `checkOnly`
  // exists so a session can rehearse recovery without consuming the pause.
  if (!options.checkOnly && loaded.state.sessionStatus === "paused") {
    const next: Record<string, unknown> = {
      ...loaded.state,
      sessionStatus: "active",
      updatedAt: (options.now ?? new Date()).toISOString()
    };
    delete next.pausedAt;
    delete next.pauseReason;
    await saveProductionState(loaded.filePath, loaded.body, productionStateSchema.parse(next));
  }

  return workshopStatus(workshopId, roots);
}

function clock(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  return `${Math.floor(normalized / 60).toString().padStart(2, "0")}:${(normalized % 60).toString().padStart(2, "0")}`;
}

export async function workshopRunOfShow(
  workshopId: string,
  start = "09:00",
  roots: LifecycleRoots = defaultRoots,
  variantId?: string
): Promise<string> {
  const catalog = await loadCatalog(roots.repositoryRoot);
  const entry = catalog.workshops.find((candidate) => candidate.workshop.data.id === workshopId);
  if (!entry) throw new Error(`Workshop does not exist: ${workshopId}`);
  const variants = entry.workshop.data.deliveryVariants ?? [];
  const selectedVariantId = variantId ?? entry.workshop.data.defaultDeliveryVariant;
  if (selectedVariantId || (variants.length > 0 && !entry.workshop.data.runOfShow)) {
    const selected = variants.find((variant) => variant.id === selectedVariantId) ?? (
      !selectedVariantId && variants.length === 1 ? variants[0] : undefined
    );
    if (!selected) {
      throw new Error(
        selectedVariantId
          ? `Delivery variant does not exist: ${selectedVariantId}`
          : `Select a delivery variant: ${variants.map((variant) => variant.id).join(", ")}`
      );
    }
    const totalMinutes = selected.days.reduce(
      (total, day) =>
        total + day.agenda.reduce((dayTotal, block) => {
          const [startHours, startMinutes] = block.start.split(":").map(Number);
          const [endHours, endMinutes] = block.end.split(":").map(Number);
          return dayTotal + ((endHours ?? 0) * 60 + (endMinutes ?? 0)) - ((startHours ?? 0) * 60 + (startMinutes ?? 0));
        }, 0),
      0
    );
    const lines = [
      `# ${entry.workshop.data.title}: ${selected.title}`,
      "",
      selected.description,
      "",
      `Total: ${totalMinutes} minutes across ${selected.days.length} day(s)`,
      "",
      "| Day | Start | End | Minutes | Type | Block | Module |",
      "| --- | --- | --- | ---: | --- | --- | --- |"
    ];
    for (const day of selected.days) {
      for (const block of day.agenda) {
        const [startHours, startMinutes] = block.start.split(":").map(Number);
        const [endHours, endMinutes] = block.end.split(":").map(Number);
        const minutes = ((endHours ?? 0) * 60 + (endMinutes ?? 0)) - ((startHours ?? 0) * 60 + (startMinutes ?? 0));
        lines.push(
          `| ${day.title} | ${block.start} | ${block.end} | ${minutes} | ${block.type} | ${block.title} | ${block.module ?? "—"} |`
        );
      }
    }
    return lines.join("\n");
  }
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(start)) {
    throw new Error("Start time must use 24-hour HH:mm format");
  }
  const runOfShow = entry.workshop.data.runOfShow;
  if (!runOfShow || entry.workshop.data.totalMinutes === undefined) {
    throw new Error(`Workshop does not define lifecycle v2 timing: ${workshopId}`);
  }
  const [hours, minutes] = start.split(":").map(Number);
  let cursor = (hours ?? 0) * 60 + (minutes ?? 0);
  const lines = [
    `# ${entry.workshop.data.title} Run of Show`,
    "",
    `Total: ${entry.workshop.data.totalMinutes} minutes`,
    "",
    "| Start | End | Minutes | Type | Block |",
    "| --- | --- | ---: | --- | --- |"
  ];
  for (const block of runOfShow) {
    const end = cursor + block.minutes;
    lines.push(`| ${clock(cursor)} | ${clock(end)} | ${block.minutes} | ${block.type} | ${block.title} |`);
    cursor = end;
  }
  return lines.join("\n");
}
