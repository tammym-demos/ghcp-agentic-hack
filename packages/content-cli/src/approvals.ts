import { execFile } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
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
import { siteRoutes } from "./build.js";
import { approveRelease, prepareRelease } from "./release.js";

const { ensureDir, pathExists } = fsExtra;
const execFileAsync = promisify(execFile);

type ApprovalRoots = { repositoryRoot: string; workshopsRoot: string };
type CommandRunner = (command: string, args: string[], cwd: string) => Promise<string>;
const defaults: ApprovalRoots = { repositoryRoot, workshopsRoot };

async function runCommand(command: string, args: string[], cwd: string): Promise<string> {
  const { stdout } = await execFileAsync(command, args, {
    cwd,
    maxBuffer: 8 * 1024 * 1024,
    windowsHide: true
  });
  return stdout;
}

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

type PrivateTestEvidence = {
  sourceCommit?: unknown;
  dirty?: unknown;
};

function privateSiteBase(input: string): URL {
  const url = new URL(input);
  if (url.protocol !== "https:") throw new Error("Private test URL must use HTTPS");
  const moduleRouteIndex = url.pathname.indexOf("/workshops/");
  if (moduleRouteIndex >= 0) {
    url.pathname = url.pathname.slice(0, moduleRouteIndex + 1);
  } else if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  url.search = "";
  url.hash = "";
  return url;
}

function normalizedSiteUrl(input: string): string {
  const url = new URL(input);
  if (url.protocol !== "https:") throw new Error("Private test URL must use HTTPS");
  const pathname = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
  return `${url.origin}${pathname}`;
}

function validatePrivateSiteEvidence(
  provenance: PrivateTestEvidence,
  routes: unknown,
  requiredRoutes: string[],
  source: string
): string {
  if (typeof provenance.sourceCommit !== "string" || !/^[0-9a-f]{40}$/i.test(provenance.sourceCommit)) {
    throw new Error(`${source} does not report a valid 40-character source commit`);
  }
  if (provenance.dirty !== false) {
    throw new Error(`${source} must report a clean source worktree`);
  }
  if (!Array.isArray(routes) || routes.some((route) => typeof route !== "string")) {
    throw new Error(`${source} does not report a valid route list`);
  }
  for (const route of requiredRoutes) {
    if (!routes.includes(route)) throw new Error(`${source} is missing required route ${route}`);
  }
  return provenance.sourceCommit;
}

type WorkflowRun = {
  headSha: string;
  headBranch: string;
  event: string;
  status: string;
  conclusion: string | null;
};

type PagesDeployment = {
  id: number;
  ref: string;
  sha: string;
  environment: string;
};

type PagesDeploymentStatus = {
  state: string;
  environment: string;
  environment_url: string | null;
  target_url: string | null;
};

type WorkflowStep = { name: string; conclusion: string | null };
type WorkflowJob = {
  databaseId: number;
  name: string;
  conclusion: string | null;
  steps: WorkflowStep[];
};

function hasSuccessfulStep(job: WorkflowJob | undefined, name: string): boolean {
  return job?.steps.some((step) => step.name === name && step.conclusion === "success") ?? false;
}

async function privateSiteCommitFromActions(
  url: string,
  requiredRoutes: string[],
  root: string,
  commandRunner: CommandRunner
): Promise<string> {
  const remote = (await commandRunner("git", ["remote", "get-url", "origin"], root)).trim();
  const repositoryMatch = /(?:github\.com[:/])([^/]+\/[^/]+?)(?:\.git)?$/i.exec(remote);
  if (!repositoryMatch?.[1]) {
    throw new Error(`Could not identify a GitHub repository from origin remote: ${remote || "(empty)"}`);
  }
  const repository = repositoryMatch[1];
  const deploymentOutput = await commandRunner("gh", [
    "api",
    `repos/${repository}/deployments?environment=github-pages&per_page=1`
  ], root);
  const deployments = JSON.parse(deploymentOutput) as PagesDeployment[];
  const deployment = deployments[0];
  if (!deployment) throw new Error(`No GitHub Pages deployment exists for ${repository}`);
  if (
    deployment.environment !== "github-pages" ||
    deployment.ref !== "main" ||
    !/^[0-9a-f]{40}$/i.test(deployment.sha)
  ) {
    throw new Error("The latest GitHub Pages deployment does not identify a valid main commit");
  }
  const statusOutput = await commandRunner("gh", [
    "api",
    `repos/${repository}/deployments/${deployment.id}/statuses?per_page=1`
  ], root);
  const statuses = JSON.parse(statusOutput) as PagesDeploymentStatus[];
  const deploymentStatus = statuses[0];
  if (
    deploymentStatus?.state !== "success" ||
    deploymentStatus.environment !== "github-pages" ||
    !deploymentStatus.environment_url ||
    !deploymentStatus.target_url
  ) {
    throw new Error("The latest GitHub Pages deployment does not have a successful active status");
  }
  if (normalizedSiteUrl(deploymentStatus.environment_url) !== normalizedSiteUrl(privateSiteBase(url).toString())) {
    throw new Error(
      `The active GitHub Pages deployment URL does not match the supplied URL: ${deploymentStatus.environment_url}`
    );
  }

  const targetUrl = new URL(deploymentStatus.target_url);
  const targetPath = targetUrl.pathname.split("/").filter(Boolean);
  if (
    targetUrl.origin !== "https://github.com" ||
    targetPath.length !== 7 ||
    targetPath[0] !== repository.split("/")[0] ||
    targetPath[1] !== repository.split("/")[1] ||
    targetPath[2] !== "actions" ||
    targetPath[3] !== "runs" ||
    !/^\d+$/.test(targetPath[4] ?? "") ||
    targetPath[5] !== "job" ||
    !/^\d+$/.test(targetPath[6] ?? "")
  ) {
    throw new Error("The active GitHub Pages deployment does not identify its exact workflow job");
  }
  const runId = Number(targetPath[4]);
  const deployJobId = Number(targetPath[6]);

  const runOutput = await commandRunner("gh", [
    "run", "view", String(runId),
    "--repo", repository,
    "--json", "headBranch,headSha,event,status,conclusion,jobs"
  ], root);
  const run = JSON.parse(runOutput) as WorkflowRun & { jobs: WorkflowJob[] };
  if (
    run.event !== "push" ||
    run.headBranch !== "main" ||
    run.headSha !== deployment.sha ||
    run.status !== "completed" ||
    run.conclusion !== "success"
  ) {
    throw new Error("The active Pages deployment does not match its successful main workflow run");
  }
  const buildJob = run.jobs.find((job) => job.name === "build");
  const deployJob = run.jobs.find((job) => job.databaseId === deployJobId && job.name === "deploy");
  if (buildJob?.conclusion !== "success" || deployJob?.conclusion !== "success") {
    throw new Error("The active Pages deployment's workflow run did not complete build and deployment successfully");
  }
  for (const step of [
    "Run pnpm typecheck",
    "Run pnpm test",
    "Run pnpm validate",
    "Build complete review site",
    "Verify built routes",
    "Upload Pages artifact"
  ]) {
    if (!hasSuccessfulStep(buildJob, step)) {
      throw new Error(`The active Pages deployment's run lacks successful evidence for "${step}"`);
    }
  }
  if (!hasSuccessfulStep(deployJob, "Deploy GitHub Pages")) {
    throw new Error("The active Pages deployment's run lacks a successful GitHub Pages deployment step");
  }

  const deploymentLog = await commandRunner("gh", [
    "run", "view", String(runId),
    "--repo", repository,
    "--job", String(deployJobId),
    "--log"
  ], root);
  const deploymentVersion = /"pages_build_version":\s*"([0-9a-f]{40})"/i.exec(deploymentLog)?.[1];
  const deployedCommit = /Created deployment for ([0-9a-f]{40}), ID:/i.exec(deploymentLog)?.[1];
  const deployedUrl = /Evaluated environment url:\s*(https:\/\/\S+)/i.exec(deploymentLog)?.[1];
  if (!deploymentVersion || !deployedCommit || !deployedUrl || !/Reported success!/i.test(deploymentLog)) {
    throw new Error("The active Pages deployment log lacks successful commit and URL evidence");
  }
  if (deploymentVersion !== deployment.sha || deployedCommit !== deployment.sha) {
    throw new Error("The active Pages deployment artifact does not match its exact source commit");
  }
  if (normalizedSiteUrl(deployedUrl) !== normalizedSiteUrl(deploymentStatus.environment_url)) {
    throw new Error(`The active Pages deployment log URL does not match its status URL: ${deployedUrl}`);
  }
  if (requiredRoutes.length === 0) throw new Error("Test approval requires at least one required workshop route");

  const artifactDirectory = await mkdtemp(path.join(os.tmpdir(), "ghcp-private-pages-"));
  try {
    await commandRunner("gh", [
      "run", "download", String(runId),
      "--repo", repository,
      "--name", "github-pages",
      "--dir", artifactDirectory
    ], root);
    const artifactFiles = await readdir(artifactDirectory);
    const tarFile = artifactFiles.find((file) => file.endsWith(".tar"));
    if (!tarFile) throw new Error("The active Pages workflow artifact does not contain its site archive");
    const archivePath = path.join(artifactDirectory, tarFile);
    const provenanceOutput = await commandRunner(
      "tar",
      ["-xOf", archivePath, "./review-provenance.json"],
      root
    );
    const routesOutput = await commandRunner(
      "tar",
      ["-xOf", archivePath, "./site-routes.json"],
      root
    );
    const provenance = JSON.parse(provenanceOutput) as PrivateTestEvidence;
    const routeEvidence = JSON.parse(routesOutput) as { routes?: unknown };
    const artifactCommit = validatePrivateSiteEvidence(
      provenance,
      routeEvidence.routes,
      requiredRoutes,
      "Active Pages deployment artifact"
    );
    if (artifactCommit !== deployment.sha) {
      throw new Error("The active Pages artifact provenance does not match its deployment commit");
    }
  } finally {
    await rm(artifactDirectory, { recursive: true, force: true });
  }

  return deployment.sha;
}

export async function verifyPrivateCommit(
  url: string,
  root: string,
  requiredRoutes: string[],
  commandRunner: CommandRunner = runCommand
): Promise<string> {
  const baseUrl = privateSiteBase(url);
  let directFailure = "private-site JSON evidence is not anonymously readable";
  let provenanceResponse: Response | undefined;
  try {
    provenanceResponse = await fetch(new URL("review-provenance.json", baseUrl));
  } catch (error) {
    directFailure = error instanceof Error ? error.message : String(error);
  }
  if (provenanceResponse?.ok && provenanceResponse.headers.get("content-type")?.includes("application/json")) {
    const provenance = await provenanceResponse.json() as PrivateTestEvidence;
    const routesResponse = await fetch(new URL("site-routes.json", baseUrl));
    if (!routesResponse.ok) {
      throw new Error(`Private test route list returned HTTP ${routesResponse.status}`);
    }
    const routeEvidence = await routesResponse.json() as { routes?: unknown };
    return validatePrivateSiteEvidence(provenance, routeEvidence.routes, requiredRoutes, "Private test site");
  }
  if (provenanceResponse) {
    directFailure = `private-site provenance returned HTTP ${provenanceResponse.status} or was not JSON`;
  }

  try {
    return await privateSiteCommitFromActions(url, requiredRoutes, root, commandRunner);
  } catch (error) {
    const actionsFailure = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Could not verify the private test site directly (${directFailure}); authenticated GitHub deployment verification failed (${actionsFailure})`
    );
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
  if (
    state.lifecycleVersion !== 3 ||
    !["test-publishing", "test-review", "production-publishing"].includes(state.phase)
  ) {
    throw new Error(`Test approval requires a lifecycle-v3 published test draft, received ${state.phase}`);
  }
  if (!["active", "awaiting-human"].includes(state.sessionStatus) || state.blockers.length) {
    throw new Error("Test approval requires an unpaused, unblocked production state; resume or clear blockers first");
  }
  assertRequirementsBaseline(state, hash);
  const requiredRoutes = requirements.modules.map(
    (module) => `workshops/${workshopId}/${module.id}/`
  );
  const catalog = await loadCatalog(roots.repositoryRoot);
  const builtRoutes = siteRoutes(catalog);
  for (const route of requiredRoutes) {
    if (!builtRoutes.includes(route)) {
      throw new Error(`The current workshop catalog is missing required test route ${route}`);
    }
  }
  const testedCommit = await verifyPrivateCommit(url, roots.repositoryRoot, requiredRoutes);
  if (!/^[0-9a-f]{40}$/i.test(testedCommit)) {
    throw new Error("Private test verification did not return a valid exact source commit");
  }
  const immutableApprovalPath = path.join(
    workshopRoot,
    "content",
    "production",
    "approvals",
    `test--${testedCommit}.json`
  );
  if (await pathExists(immutableApprovalPath)) {
    throw new Error(`Test approval already exists for commit ${testedCommit}`);
  }
  const { stdout: changedWorkshopFiles } = await execFileAsync(
    "git",
    [
      "diff",
      "--name-only",
      `${testedCommit}..${snapshot.commit}`,
      "--",
      `workshops/${workshopId}`,
      `:(exclude)workshops/${workshopId}/content/production/**`,
      "packages/content-cli/src/build.ts",
      ".github/workflows/pages.yml"
    ],
    { cwd: roots.repositoryRoot }
  );
  if (changedWorkshopFiles.trim()) {
    throw new Error(
      `Workshop content or private-site build behavior changed after the private test commit ${testedCommit}; new test approval is required:\n${changedWorkshopFiles.trim()}`
    );
  }

  const manifestPath = await prepareRelease(
    releaseId(workshopId, now),
    workshopId,
    catalog,
    roots.repositoryRoot,
    now,
    testedCommit
  );
  await approveRelease(manifestPath, approver, roots.repositoryRoot, now);
  const approval = environmentApprovalSchema.parse({
    schemaVersion: 1,
    kind: "environment-approval",
    workshop: workshopId,
    environment: "test",
    requirementsHash: hash,
    commit: testedCommit,
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
    commit: testedCommit
  };
}
