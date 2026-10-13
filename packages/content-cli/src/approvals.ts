import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import fsExtra from "fs-extra";
import matter from "gray-matter";
import {
  environmentApprovalSchema,
  loadCatalog,
  workshopRequirementsSchema,
  type EnvironmentApproval
} from "@ghcp/content-schema";
import { repositoryRoot, workshopsRoot } from "./paths.js";
import { gitSnapshot, loadProductionState } from "./lifecycle.js";
import { textSha256 } from "./production-records.js";
import { approveRelease, prepareRelease } from "./release.js";

const { ensureDir, pathExists } = fsExtra;

type ApprovalRoots = { repositoryRoot: string; workshopsRoot: string };
const defaults: ApprovalRoots = { repositoryRoot, workshopsRoot };

function releaseId(workshopId: string, now: Date): string {
  const stamp = now.toISOString().replace(/\D/g, "").slice(0, 14);
  return `${workshopId}-${stamp}`;
}

async function requirementsEvidence(workshopId: string, roots: ApprovalRoots) {
  const workshopRoot = path.join(roots.workshopsRoot, workshopId);
  const filePath = path.join(workshopRoot, "requirements.md");
  if (!(await pathExists(filePath))) throw new Error(`Workshop requirements do not exist: ${workshopId}`);
  const raw = await readFile(filePath, "utf8");
  const requirements = workshopRequirementsSchema.parse(matter(raw).data);
  if (requirements.id !== workshopId) throw new Error("Requirements workshop id mismatch");
  return { workshopRoot, hash: textSha256(raw), requirements };
}

// An approval must accept a draft generated from the current requirements; recording a
// fresh hash over a stale draft would approve content nobody produced from it.
function assertRequirementsBaseline(
  state: { requirements?: { path: string; sha256: string } },
  hash: string
): void {
  const baseline = state.requirements;
  if (!baseline) {
    throw new Error("Approval requires a recorded requirements baseline; run `pnpm content intake` first");
  }
  if (baseline.path !== "requirements.md" || baseline.sha256 !== hash) {
    throw new Error(
      "Workshop requirements changed after intake; re-run intake and regenerate the draft before approval"
    );
  }
}

async function writeApproval(
  workshopRoot: string,
  approval: EnvironmentApproval
): Promise<string> {
  const directory = path.join(workshopRoot, "content", "production", "approvals");
  const filePath = path.join(directory, `${approval.environment}.json`);
  await ensureDir(directory);
  const serialized = JSON.stringify(environmentApprovalSchema.parse(approval), null, 2);
  if (approval.environment === "test") {
    await writeFile(path.join(directory, `test--${approval.commit}.json`), serialized, {
      flag: "wx"
    });
  }
  await writeFile(filePath, serialized, "utf8");
  return filePath;
}

async function updateState(
  workshopId: string,
  roots: ApprovalRoots,
  values: Record<string, unknown>
): Promise<void> {
  const loaded = await loadProductionState(workshopId, roots);
  if (loaded.state.lifecycleVersion !== 3) {
    throw new Error("Environment approvals require lifecycleVersion 3");
  }
  await writeFile(
    loaded.filePath,
    matter.stringify(loaded.body, {
      ...loaded.state,
      ...values,
      updatedAt: new Date().toISOString()
    }),
    "utf8"
  );
}

export async function approveLocalDraft(
  workshopId: string,
  approver: string,
  roots: ApprovalRoots = defaults,
  now = new Date()
): Promise<{ approvalPath: string; commit: string }> {
  if (!approver.trim()) throw new Error("Local approval requires an approver name");
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  if (snapshot.dirtyFiles.length) {
    throw new Error(`Local approval requires a clean reviewed commit:\n${snapshot.dirtyFiles.join("\n")}`);
  }
  const { workshopRoot, hash, requirements } = await requirementsEvidence(workshopId, roots);
  const loaded = await loadProductionState(workshopId, roots);
  if (loaded.state.lifecycleVersion !== 3 || !["drafting", "local-review"].includes(loaded.state.phase)) {
    throw new Error(`Local approval requires a lifecycle-v3 local draft, received ${loaded.state.phase}`);
  }
  if (!["active", "awaiting-human"].includes(loaded.state.sessionStatus) || loaded.state.blockers.length) {
    throw new Error("Local approval requires an unpaused, unblocked production state; resume or clear blockers first");
  }
  assertRequirementsBaseline(loaded.state, hash);
  const approval = environmentApprovalSchema.parse({
    schemaVersion: 1,
    kind: "environment-approval",
    workshop: workshopId,
    environment: "local",
    requirementsHash: hash,
    commit: snapshot.commit,
    approvedBy: approver.trim(),
    approvedAt: now.toISOString(),
    modules: requirements.modules.map((module) => module.id)
  });
  const approvalPath = await writeApproval(workshopRoot, approval);
  await updateState(workshopId, roots, {
    phase: "test-publishing",
    sessionStatus: "active",
    nextOwner: "Workshop Production Coordinator",
    nextHumanGate: "Test draft approval",
    resumeTask: "publish-test-draft",
    releaseState: "approved",
    environment: "test"
  });
  return {
    approvalPath: path.relative(roots.repositoryRoot, approvalPath).split(path.sep).join("/"),
    commit: snapshot.commit
  };
}

async function verifyPrivateCommit(url: string, expectedCommit: string): Promise<void> {
  const endpoint = new URL("review-provenance.json", url.endsWith("/") ? url : `${url}/`);
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Private test provenance returned HTTP ${response.status}: ${endpoint}`);
  const provenance = await response.json() as { sourceCommit?: unknown; dirty?: unknown };
  if (provenance.sourceCommit !== expectedCommit) {
    throw new Error(`Private test serves ${String(provenance.sourceCommit)} but approval targets ${expectedCommit}`);
  }
  if (provenance.dirty !== false) {
    throw new Error("Private test provenance must report a clean worktree");
  }
}

export async function approveTestDraft(
  workshopId: string,
  approver: string,
  url: string,
  roots: ApprovalRoots = defaults,
  now = new Date()
): Promise<{ approvalPath: string; manifestPath: string; commit: string }> {
  if (!approver.trim()) throw new Error("Test approval requires an approver name");
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  if (snapshot.dirtyFiles.length) {
    throw new Error(`Test approval requires a clean tested commit:\n${snapshot.dirtyFiles.join("\n")}`);
  }
  const { workshopRoot, hash, requirements } = await requirementsEvidence(workshopId, roots);
  const localApprovalPath = path.join(workshopRoot, "content", "production", "approvals", "local.json");
  if (!(await pathExists(localApprovalPath))) throw new Error("Local approval is required before test approval");
  const localApproval = environmentApprovalSchema.parse(JSON.parse(await readFile(localApprovalPath, "utf8")));
  if (localApproval.environment !== "local") {
    throw new Error(`Local approval record declares environment "${localApproval.environment}"`);
  }
  if (localApproval.workshop !== workshopId) {
    throw new Error(`Local approval record belongs to workshop "${localApproval.workshop}", not "${workshopId}"`);
  }
  if (localApproval.requirementsHash !== hash) throw new Error("Requirements changed after local approval");
  const state = (await loadProductionState(workshopId, roots)).state;
  if (state.lifecycleVersion !== 3 || !["test-publishing", "test-review"].includes(state.phase)) {
    throw new Error(`Test approval requires a lifecycle-v3 published test draft, received ${state.phase}`);
  }
  if (!["active", "awaiting-human"].includes(state.sessionStatus) || state.blockers.length) {
    throw new Error("Test approval requires an unpaused, unblocked production state; resume or clear blockers first");
  }
  assertRequirementsBaseline(state, hash);
  await verifyPrivateCommit(url, snapshot.commit);

  const catalog = await loadCatalog(roots.repositoryRoot);
  const manifestPath = await prepareRelease(releaseId(workshopId, now), workshopId, catalog, roots.repositoryRoot, now);
  await approveRelease(manifestPath, approver, roots.repositoryRoot, now);
  const approval = environmentApprovalSchema.parse({
    schemaVersion: 1,
    kind: "environment-approval",
    workshop: workshopId,
    environment: "test",
    requirementsHash: hash,
    commit: snapshot.commit,
    approvedBy: approver.trim(),
    approvedAt: now.toISOString(),
    url,
    modules: requirements.modules.map((module) => module.id)
  });
  const approvalPath = await writeApproval(workshopRoot, approval);
  await updateState(workshopId, roots, {
    phase: "production-publishing",
    sessionStatus: "active",
    nextOwner: "Workshop Production Coordinator",
    nextHumanGate: "None",
    resumeTask: "promote-approved-release",
    releaseState: "approved",
    environment: "production"
  });
  return {
    approvalPath: path.relative(roots.repositoryRoot, approvalPath).split(path.sep).join("/"),
    manifestPath,
    commit: snapshot.commit
  };
}
