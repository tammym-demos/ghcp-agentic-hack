import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { repositoryRoot } from "./paths.js";

const execFileAsync = promisify(execFile);

// This audited Pages workflow has no other step that can publish a deployment.
const skippedDeploymentWorkflowBlobs = new Set(["5c5c6629d92158cf15b7a82d2f379a0d004d8335"]);

type CommandRunner = (args: string[], root: string) => Promise<string>;

const runGitHub: CommandRunner = async (args, root) => {
  const { stdout } = await execFileAsync("gh", args, { cwd: root, maxBuffer: 20 * 1024 * 1024 });
  return stdout;
};

const deploymentsQuery = `query($owner:String!, $name:String!, $endCursor:String) {
  repository(owner:$owner, name:$name) {
    deployments(first:100, after:$endCursor, environments:["github-pages"],
      orderBy:{field:CREATED_AT, direction:DESC}) {
      nodes {
        databaseId commitOid ref { name }
        latestStatus { state updatedAt environmentUrl logUrl }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
}`;

type Deployment = {
  id: number;
  commit: unknown;
  ref: unknown;
  state: string;
  updatedAt: number;
  environmentUrl: unknown;
  logUrl: unknown;
};

export type PublicDeploymentEvidence = {
  deploymentId: number;
  commit: string;
  tree: string;
  runId: number;
  jobId: number;
  logSha256: string;
};

export type RecordedPublicDeploymentProof = PublicDeploymentEvidence & {
  liveLogVerifiedAt: string;
};

function object(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${label} is missing or malformed`);
  }
  return value as Record<string, unknown>;
}

function json(output: string, label: string): unknown {
  try {
    return JSON.parse(output) as unknown;
  } catch {
    throw new Error(`${label} is not valid JSON`);
  }
}

function positiveInteger(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${label} is missing or malformed`);
  }
  return value;
}

function commitHash(value: unknown, label: string): string {
  if (typeof value !== "string" || !/^[0-9a-f]{40}$/i.test(value)) {
    throw new Error(`${label} is missing or malformed`);
  }
  return value.toLowerCase();
}

export function normalizePublicSiteUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("The public Pages URL is invalid");
  }
  if (
    url.protocol !== "https:" || url.username || url.password || url.search || url.hash
  ) {
    throw new Error("The public Pages URL must be an HTTPS URL without credentials, query, or fragment");
  }
  return `${url.origin}${url.pathname.replace(/\/+$/, "")}/`;
}

function deploymentPages(output: string): Deployment[] {
  const pages = json(output, "GitHub Pages deployments");
  if (!Array.isArray(pages) || pages.length === 0) {
    throw new Error("GitHub Pages deployment pagination is empty or malformed");
  }
  const deployments: Deployment[] = [];
  const seen = new Set<number>();
  const pendingStates = new Set(["PENDING", "QUEUED", "WAITING", "IN_PROGRESS"]);
  const knownStates = new Set([...pendingStates, "SUCCESS", "FAILURE", "ERROR", "INACTIVE"]);

  for (const [index, rawPage] of pages.entries()) {
    const page = object(rawPage, "GitHub Pages deployment page");
    if (page.errors !== undefined) throw new Error("GitHub returned errors while listing Pages deployments");
    const data = object(page.data, "GitHub deployment data");
    const repository = object(data.repository, "GitHub deployment repository");
    const connection = object(repository.deployments, "GitHub deployment connection");
    const pageInfo = object(connection.pageInfo, "GitHub deployment pagination");
    if (
      typeof pageInfo.hasNextPage !== "boolean" ||
      pageInfo.hasNextPage !== (index < pages.length - 1) ||
      (pageInfo.hasNextPage && (typeof pageInfo.endCursor !== "string" || !pageInfo.endCursor))
    ) {
      throw new Error("GitHub Pages deployment pagination is incomplete");
    }
    if (!Array.isArray(connection.nodes)) throw new Error("GitHub Pages deployment records are malformed");
    for (const rawDeployment of connection.nodes) {
      const deployment = object(rawDeployment, "GitHub Pages deployment");
      const id = positiveInteger(deployment.databaseId, "GitHub Pages deployment ID");
      if (seen.has(id)) throw new Error("GitHub Pages deployment pagination contains duplicate records");
      seen.add(id);
      if (deployment.latestStatus === null || deployment.latestStatus === undefined) {
        throw new Error(`GitHub Pages deployment ${id} has no status; deployment state is ambiguous`);
      }
      const status = object(deployment.latestStatus, "GitHub Pages deployment status");
      if (typeof status.state !== "string" || !knownStates.has(status.state)) {
        throw new Error(`GitHub Pages deployment ${id} has an unknown status`);
      }
      const updatedAt = typeof status.updatedAt === "string" ? Date.parse(status.updatedAt) : NaN;
      if (!Number.isFinite(updatedAt)) throw new Error(`GitHub Pages deployment ${id} has an invalid status time`);
      deployments.push({
        id,
        commit: deployment.commitOid,
        ref: deployment.ref,
        state: status.state,
        updatedAt,
        environmentUrl: status.environmentUrl,
        logUrl: status.logUrl
      });
    }
  }
  return deployments;
}

function deploymentJobUrl(value: unknown, repository: string): { runId: number; jobId: number } {
  if (typeof value !== "string") throw new Error("The Pages deployment has no workflow job URL");
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("The Pages deployment workflow job URL is invalid");
  }
  const segments = url.pathname.split("/").filter(Boolean);
  const [owner, name] = repository.split("/");
  if (
    url.origin !== "https://github.com" || url.search || url.hash || segments.length !== 7 ||
    segments[0]?.toLowerCase() !== owner?.toLowerCase() ||
    segments[1]?.toLowerCase() !== name?.toLowerCase() ||
    segments[2] !== "actions" || segments[3] !== "runs" || segments[5] !== "job" ||
    !/^[1-9][0-9]*$/.test(segments[4] ?? "") || !/^[1-9][0-9]*$/.test(segments[6] ?? "")
  ) {
    throw new Error("The Pages deployment does not identify a job in the public repository");
  }
  return {
    runId: positiveInteger(Number(segments[4]), "Pages workflow run ID"),
    jobId: positiveInteger(Number(segments[6]), "Pages workflow job ID")
  };
}

async function assertPendingDeploymentCannotPublish(
  deployment: Deployment,
  repository: string,
  root: string,
  run: CommandRunner
): Promise<void> {
  const { runId, jobId } = deploymentJobUrl(deployment.logUrl, repository);
  const workflow = object(json(await run([
    "api", `repos/${repository}/actions/runs/${runId}`
  ], root), "Pending Pages workflow run"), "Pending Pages workflow run");
  const job = object(json(await run([
    "api", `repos/${repository}/actions/jobs/${jobId}`
  ], root), "Pending Pages deployment job"), "Pending Pages deployment job");
  const skipped = Array.isArray(job.steps) && job.steps.some((step: unknown) => {
    const value = object(step, "Pending Pages deployment job step");
    return value.name === "Deploy GitHub Pages" &&
      value.status === "completed" && value.conclusion === "skipped";
  });
  if (
    workflow.id !== runId || workflow.head_sha !== deployment.commit ||
    workflow.head_branch !== "main" || workflow.event !== "push" ||
    workflow.path !== ".github/workflows/pages.yml" || workflow.status !== "completed" ||
    object(deployment.ref, "Pending Pages deployment ref").name !== "main" ||
    job.id !== jobId || job.run_id !== runId || job.name !== "deploy" ||
    job.status !== "completed" || !skipped
  ) {
    throw new Error(
      `GitHub Pages deployment ${deployment.id} is still ${deployment.state.toLowerCase()} or may affect the live site`
    );
  }
  const workflowCommit = commitHash(deployment.commit, "Pending Pages deployment commit");
  const workflowFile = object(json(await run([
    "api", `repos/${repository}/contents/.github/workflows/pages.yml?ref=${workflowCommit}`
  ], root), "Pending Pages workflow source"), "Pending Pages workflow source");
  if (
    workflowFile.type !== "file" || typeof workflowFile.sha !== "string" ||
    !skippedDeploymentWorkflowBlobs.has(workflowFile.sha.toLowerCase())
  ) {
    throw new Error(
      `GitHub Pages deployment ${deployment.id} uses an unaudited workflow and may affect the live site`
    );
  }
}

export async function verifyPublicPagesDeployment(
  repository: string,
  expectedTree: string,
  siteUrl: string,
  root = repositoryRoot,
  run: CommandRunner = runGitHub,
  recordedProof?: PublicDeploymentEvidence
): Promise<PublicDeploymentEvidence> {
  if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\/(?!\.{1,2}$)[A-Za-z0-9_.-]+$/.test(repository)) {
    throw new Error("The public repository must be an owner/repository identifier");
  }
  const approvedTree = commitHash(expectedTree, "Approved public export tree");
  const expectedUrl = normalizePublicSiteUrl(siteUrl);
  const [owner, name] = repository.split("/");
  const output = await run([
    "api", "graphql", "--paginate", "--slurp",
    "-f", `query=${deploymentsQuery}`,
    "-f", `owner=${owner}`,
    "-f", `name=${name}`
  ], root);
  const deployments = deploymentPages(output);
  for (const deployment of deployments) {
    if (["PENDING", "QUEUED", "WAITING", "IN_PROGRESS"].includes(deployment.state)) {
      await assertPendingDeploymentCannotPublish(deployment, repository, root, run);
    }
  }
  const successes = deployments
    .filter((deployment) => deployment.state === "SUCCESS")
    .sort((left, right) => right.updatedAt - left.updatedAt);
  const latest = successes[0];
  if (!latest) throw new Error("No successful public GitHub Pages deployment is available");
  if (successes[1]?.updatedAt === latest.updatedAt) {
    throw new Error("The latest successful Pages deployment is ambiguous");
  }
  if (deployments.some((deployment) =>
    (deployment.state === "FAILURE" || deployment.state === "ERROR") &&
    deployment.updatedAt >= latest.updatedAt
  )) {
    throw new Error("A later Pages deployment failed; the live deployment is ambiguous");
  }
  const deploymentCommit = commitHash(latest.commit, "Pages deployment commit");
  if (object(latest.ref, "Pages deployment ref").name !== "main") {
    throw new Error("The latest successful Pages deployment is not from public main");
  }
  if (
    typeof latest.environmentUrl !== "string" ||
    normalizePublicSiteUrl(latest.environmentUrl) !== expectedUrl
  ) {
    throw new Error("The Pages deployment URL does not match the requested public site");
  }
  const { runId, jobId } = deploymentJobUrl(latest.logUrl, repository);
  let logSha256: string;
  if (recordedProof) {
    if (
      recordedProof.deploymentId !== latest.id || recordedProof.commit !== deploymentCommit ||
      recordedProof.tree !== approvedTree || recordedProof.runId !== runId ||
      recordedProof.jobId !== jobId || !/^[0-9a-f]{64}$/.test(recordedProof.logSha256)
    ) {
      throw new Error("The live Pages deployment does not match the previously recorded proof");
    }
    logSha256 = recordedProof.logSha256;
  } else {
    const workflow = object(json(await run([
      "api", `repos/${repository}/actions/runs/${runId}`
    ], root), "Pages workflow run"), "Pages workflow run");
    if (
      workflow.id !== runId || workflow.head_sha !== deploymentCommit ||
      workflow.head_branch !== "main" || workflow.event !== "push" ||
      workflow.path !== ".github/workflows/pages.yml" ||
      workflow.status !== "completed" || workflow.conclusion !== "success"
    ) {
      throw new Error("The Pages deployment does not match a successful public main workflow run");
    }
    const job = object(json(await run([
      "api", `repos/${repository}/actions/jobs/${jobId}`
    ], root), "Pages deployment job"), "Pages deployment job");
    if (
      job.id !== jobId || job.run_id !== runId || job.name !== "deploy" ||
      job.status !== "completed" || job.conclusion !== "success" ||
      !Array.isArray(job.steps) ||
      !job.steps.some((step: unknown) => {
        const value = object(step, "Pages deployment job step");
        return value.name === "Deploy GitHub Pages" && value.conclusion === "success";
      })
    ) {
      throw new Error("The Pages deployment job did not complete successfully");
    }
    const log = await run([
      "run", "view", String(runId), "--repo", repository, "--job", String(jobId), "--log"
    ], root);
    const buildCommit = /"pages_build_version":\s*"([0-9a-f]{40})"/i.exec(log)?.[1]?.toLowerCase();
    const deployedCommit = /Created deployment for ([0-9a-f]{40}), ID:/i.exec(log)?.[1]?.toLowerCase();
    const loggedUrl = /Evaluated environment url:\s*(https:\/\/\S+)/i.exec(log)?.[1];
    if (
      buildCommit !== deploymentCommit || deployedCommit !== deploymentCommit ||
      !/Reported success!/i.test(log) || !loggedUrl ||
      normalizePublicSiteUrl(loggedUrl) !== expectedUrl
    ) {
      throw new Error("The Pages deployment log does not prove the exact artifact commit and URL");
    }
    logSha256 = createHash("sha256").update(log).digest("hex");
  }
  const commit = object(json(await run([
    "api", `repos/${repository}/git/commits/${deploymentCommit}`
  ], root), "Pages deployment commit"), "Pages deployment commit");
  const tree = commitHash(object(commit.tree, "Pages deployment tree").sha, "Pages deployment tree");
  if (tree !== approvedTree) {
    throw new Error("The live Pages deployment tree does not match the approved public export");
  }
  return { deploymentId: latest.id, commit: deploymentCommit, tree, runId, jobId, logSha256 };
}

export async function verifyStablePublicDeployment<T>(
  repository: string,
  expectedTree: string,
  siteUrl: string,
  verifyRoutes: () => Promise<T>,
  root = repositoryRoot,
  run: CommandRunner = runGitHub,
  recordedProof?: PublicDeploymentEvidence
): Promise<{ evidence: PublicDeploymentEvidence; result: T }> {
  const before = await verifyPublicPagesDeployment(repository, expectedTree, siteUrl, root, run, recordedProof);
  const result = await verifyRoutes();
  const after = await verifyPublicPagesDeployment(repository, expectedTree, siteUrl, root, run, recordedProof);
  if (
    before.deploymentId !== after.deploymentId || before.commit !== after.commit ||
    before.tree !== after.tree || before.runId !== after.runId || before.jobId !== after.jobId ||
    before.logSha256 !== after.logSha256
  ) {
    throw new Error("The public Pages deployment changed while release routes were being verified");
  }
  return { evidence: after, result };
}
