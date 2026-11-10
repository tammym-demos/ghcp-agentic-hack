import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import {
  normalizePublicSiteUrl,
  verifyPublicPagesDeployment,
  verifyStablePublicDeployment
} from "./public-deployment.js";

const repository = "example/workshops";
const site = "https://example.github.io/workshops/";
const commit = "a".repeat(40);
const tree = "b".repeat(40);
const otherCommit = "c".repeat(40);
const jobUrl = "https://github.com/example/workshops/actions/runs/50/job/60";
const skippedJobUrl = "https://github.com/example/workshops/actions/runs/70/job/80";

type TestDeployment = {
  databaseId: number;
  commitOid: string;
  ref: { name: string };
  latestStatus: {
    state: string;
    updatedAt: string;
    environmentUrl: string;
    logUrl: string;
  } | null;
};

function deployment(id: number, state: string, updatedAt: string, sha = commit): TestDeployment {
  return {
    databaseId: id,
    commitOid: sha,
    ref: { name: "main" },
    latestStatus: { state, updatedAt, environmentUrl: site, logUrl: jobUrl }
  };
}

function fixture() {
  const pages = [
    {
      data: {
        repository: {
          deployments: {
            nodes: [deployment(1, "SUCCESS", "2026-10-30T12:00:00Z", otherCommit)],
            pageInfo: { hasNextPage: true, endCursor: "cursor" }
          }
        }
      }
    },
    {
      data: {
        repository: {
          deployments: {
            nodes: [deployment(2, "SUCCESS", "2026-10-31T12:00:00Z")],
            pageInfo: { hasNextPage: false, endCursor: "last" }
          }
        }
      }
    }
  ];
  const workflow = {
    id: 50,
    head_sha: commit,
    head_branch: "main",
    event: "push",
    path: ".github/workflows/pages.yml",
    status: "completed",
    conclusion: "success"
  };
  const job = {
    id: 60,
    run_id: 50,
    name: "deploy",
    status: "completed",
    conclusion: "success",
    steps: [{ name: "Deploy GitHub Pages", conclusion: "success" }]
  };
  const response = {
    tree,
    log: `"pages_build_version": "${commit}"\nCreated deployment for ${commit}, ID: ${commit}\nReported success!\nEvaluated environment url: ${site}\n`,
    historicalWorkflowBlob: "5c5c6629d92158cf15b7a82d2f379a0d004d8335"
  };
  const skippedWorkflow = { ...workflow, id: 70, head_sha: otherCommit, conclusion: "cancelled" };
  const skippedJob = {
    id: 80,
    run_id: 70,
    name: "deploy",
    status: "completed",
    conclusion: "cancelled",
    steps: [{ name: "Deploy GitHub Pages", status: "completed", conclusion: "skipped" }]
  };
  const run = vi.fn(async (args: string[]) => {
    if (args[0] === "api" && args[1] === "graphql") {
      expect(args).toContain("--paginate");
      expect(args).toContain("--slurp");
      expect(args.some((arg) => arg.includes("$endCursor"))).toBe(true);
      return JSON.stringify(pages);
    }
    if (args[1]?.endsWith("/actions/runs/50")) return JSON.stringify(workflow);
    if (args[1]?.endsWith("/actions/jobs/60")) return JSON.stringify(job);
    if (args[1]?.endsWith("/actions/runs/70")) return JSON.stringify(skippedWorkflow);
    if (args[1]?.endsWith("/actions/jobs/80")) return JSON.stringify(skippedJob);
    if (args[1]?.includes("/contents/.github/workflows/pages.yml?ref=")) {
      return JSON.stringify({ type: "file", sha: response.historicalWorkflowBlob });
    }
    if (args[0] === "run" && args[1] === "view") return response.log;
    if (args[1]?.endsWith(`/git/commits/${commit}`)) return JSON.stringify({ tree: { sha: response.tree } });
    throw new Error(`Unexpected GitHub command: ${args.join(" ")}`);
  });
  return { pages, workflow, job, skippedWorkflow, skippedJob, response, run };
}

function proof(log: string) {
  return {
    deploymentId: 2,
    commit,
    tree,
    runId: 50,
    jobId: 60,
    logSha256: createHash("sha256").update(log).digest("hex")
  };
}

describe("public Pages deployment verification", () => {
  it("finds the newest successful status across every page and proves its artifact tree", async () => {
    const { run, response } = fixture();
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", run))
      .resolves.toEqual(proof(response.log));
    expect(run).toHaveBeenCalledTimes(5);
  });

  it("verifies the deployment on both sides of route checks", async () => {
    const { run } = fixture();
    const routes = vi.fn(async () => ["portal", "workshop"]);
    await expect(verifyStablePublicDeployment(repository, tree, site, routes, ".", run))
      .resolves.toMatchObject({ evidence: { deploymentId: 2 }, result: ["portal", "workshop"] });
    expect(routes).toHaveBeenCalledOnce();
    expect(run).toHaveBeenCalledTimes(10);
  });

  it("rejects a deployment that changes during route checks, even when its tree is unchanged", async () => {
    const { pages, run } = fixture();
    const routes = async () => {
      pages[1]!.data.repository.deployments.nodes[0]!.databaseId = 3;
      return ["portal"];
    };
    await expect(verifyStablePublicDeployment(repository, tree, site, routes, ".", run))
      .rejects.toThrow("deployment changed while release routes were being verified");
  });

  it("does not produce deployment evidence when a required route fails", async () => {
    const { run } = fixture();
    await expect(verifyStablePublicDeployment(repository, tree, site, async () => {
      throw new Error("Route returned 404");
    }, ".", run)).rejects.toThrow("Route returned 404");
    expect(run).toHaveBeenCalledTimes(5);
  });

  it.each(["PENDING", "QUEUED", "WAITING", "IN_PROGRESS"])(
    "refuses to record evidence while a Pages deployment may still be %s",
    async (state) => {
      const { pages, run } = fixture();
      pages[0]!.data.repository.deployments.nodes.push(deployment(3, state, "2026-10-29T12:00:00Z"));
      await expect(verifyPublicPagesDeployment(repository, tree, site, ".", run))
        .rejects.toThrow("is still");
    }
  );

  it.each(["PENDING", "QUEUED", "WAITING", "IN_PROGRESS"])(
    "permits a %s deployment whose completed job demonstrably skipped Pages",
    async (state) => {
      const { pages, run } = fixture();
      const pending = deployment(3, state, "2026-10-29T12:00:00Z", otherCommit);
      pending.latestStatus!.logUrl = skippedJobUrl;
      pages[0]!.data.repository.deployments.nodes.push(pending);
      await expect(verifyPublicPagesDeployment(repository, tree, site, ".", run))
        .resolves.toMatchObject({ deploymentId: 2 });
    }
  );

  it.each([
    ["an active workflow", (value: ReturnType<typeof fixture>) => { value.skippedWorkflow.status = "in_progress"; }],
    ["a different workflow commit", (value: ReturnType<typeof fixture>) => { value.skippedWorkflow.head_sha = commit; }],
    ["an active job", (value: ReturnType<typeof fixture>) => { value.skippedJob.status = "in_progress"; }],
    ["a different job run", (value: ReturnType<typeof fixture>) => { value.skippedJob.run_id = 50; }],
    ["a cancelled deploy step", (value: ReturnType<typeof fixture>) => { value.skippedJob.steps[0]!.conclusion = "cancelled"; }],
    ["a successful deploy step", (value: ReturnType<typeof fixture>) => { value.skippedJob.steps[0]!.conclusion = "success"; }],
    ["a missing deploy step", (value: ReturnType<typeof fixture>) => { value.skippedJob.steps = []; }],
    ["an unaudited workflow", (value: ReturnType<typeof fixture>) => { value.response.historicalWorkflowBlob = "f".repeat(40); }]
  ])("rejects a pending deployment with %s", async (_label, mutate) => {
    const value = fixture();
    const pending = deployment(3, "PENDING", "2026-10-29T12:00:00Z", otherCommit);
    pending.latestStatus!.logUrl = skippedJobUrl;
    value.pages[0]!.data.repository.deployments.nodes.push(pending);
    mutate(value);
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", value.run))
      .rejects.toThrow("may affect the live site");
  });

  it("rejects a deployment with no status, even on an earlier page", async () => {
    const { pages, run } = fixture();
    pages[0]!.data.repository.deployments.nodes[0]!.latestStatus = null;
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", run))
      .rejects.toThrow("has no status");
  });

  it("rejects incomplete pagination and duplicate deployments", async () => {
    const incomplete = fixture();
    incomplete.pages[1]!.data.repository.deployments.pageInfo.hasNextPage = true;
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", incomplete.run))
      .rejects.toThrow("pagination is incomplete");

    const duplicate = fixture();
    duplicate.pages[0]!.data.repository.deployments.nodes.push(deployment(2, "INACTIVE", "2026-10-29T12:00:00Z"));
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", duplicate.run))
      .rejects.toThrow("duplicate records");
  });

  it("rejects ambiguous successful statuses and later failed deployments", async () => {
    const tied = fixture();
    tied.pages[0]!.data.repository.deployments.nodes[0]!.latestStatus!.updatedAt = "2026-10-31T12:00:00Z";
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", tied.run))
      .rejects.toThrow("latest successful Pages deployment is ambiguous");

    const failed = fixture();
    failed.pages[0]!.data.repository.deployments.nodes.push(deployment(3, "FAILURE", "2026-10-31T12:01:00Z"));
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", failed.run))
      .rejects.toThrow("later Pages deployment failed");
  });

  it("permits older failures and inactive deployments", async () => {
    const { pages, run } = fixture();
    pages[0]!.data.repository.deployments.nodes.push(
      deployment(3, "FAILURE", "2026-10-29T12:00:00Z"),
      deployment(4, "INACTIVE", "2026-10-31T13:00:00Z")
    );
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", run))
      .resolves.toMatchObject({ deploymentId: 2 });
  });

  it("rejects a live deployment tree even when the expected source and routes might otherwise match", async () => {
    const { response, run } = fixture();
    response.tree = "d".repeat(40);
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", run))
      .rejects.toThrow("live Pages deployment tree does not match");
  });

  it("requires the latest successful deployment to target main and the requested site", async () => {
    const wrongRef = fixture();
    wrongRef.pages[1]!.data.repository.deployments.nodes[0]!.ref.name = "other";
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", wrongRef.run))
      .rejects.toThrow("not from public main");

    const wrongSite = fixture();
    wrongSite.pages[1]!.data.repository.deployments.nodes[0]!.latestStatus!.environmentUrl = "https://elsewhere.test/";
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", wrongSite.run))
      .rejects.toThrow("does not match the requested public site");
  });

  it("rejects a deployment attached to another repository's job", async () => {
    const { pages, run } = fixture();
    pages[1]!.data.repository.deployments.nodes[0]!.latestStatus!.logUrl =
      "https://github.com/other/workshops/actions/runs/50/job/60";
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", run))
      .rejects.toThrow("does not identify a job in the public repository");
  });

  it.each([
    ["wrong commit", (value: ReturnType<typeof fixture>) => { value.workflow.head_sha = otherCommit; }],
    ["wrong branch", (value: ReturnType<typeof fixture>) => { value.workflow.head_branch = "feature"; }],
    ["wrong workflow", (value: ReturnType<typeof fixture>) => { value.workflow.path = ".github/workflows/other.yml"; }],
    ["unfinished workflow", (value: ReturnType<typeof fixture>) => { value.workflow.status = "in_progress"; }],
    ["failed workflow", (value: ReturnType<typeof fixture>) => { value.workflow.conclusion = "failure"; }]
  ])("rejects %s workflow evidence", async (_label, mutate) => {
    const value = fixture();
    mutate(value);
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", value.run))
      .rejects.toThrow("does not match a successful public main workflow run");
  });

  it("requires a successful deployment job and a log binding the artifact to its commit", async () => {
    const failedJob = fixture();
    failedJob.job.steps[0]!.conclusion = "failure";
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", failedJob.run))
      .rejects.toThrow("deployment job did not complete successfully");

    const wrongArtifact = fixture();
    wrongArtifact.response.log = wrongArtifact.response.log.replace(`"pages_build_version": "${commit}"`,
      `"pages_build_version": "${otherCommit}"`);
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", wrongArtifact.run))
      .rejects.toThrow("does not prove the exact artifact commit and URL");
  });

  it("uses explicit recorded proof while still checking the current deployment and tree", async () => {
    const value = fixture();
    const recorded = proof(value.response.log);
    const expired = vi.fn(async (args: string[]) => {
      if (args[1]?.includes("/actions/") || args[0] === "run") {
        throw new Error("Actions metadata or log expired");
      }
      return value.run(args);
    });
    await expect(verifyStablePublicDeployment(repository, tree, site, async () => ["portal"], ".", expired, recorded))
      .resolves.toEqual({ evidence: recorded, result: ["portal"] });
    expect(expired).toHaveBeenCalledTimes(4);
  });

  it.each([
    ["deployment", { deploymentId: 3 }],
    ["commit", { commit: otherCommit }],
    ["tree", { tree: otherCommit }],
    ["run", { runId: 70 }],
    ["job", { jobId: 80 }],
    ["log digest", { logSha256: "invalid" }]
  ])("rejects recorded proof for a different %s", async (_label, change) => {
    const value = fixture();
    await expect(verifyPublicPagesDeployment(
      repository, tree, site, ".", value.run, { ...proof(value.response.log), ...change }
    )).rejects.toThrow("does not match the previously recorded proof");
  });

  it("does not silently use retained proof when the live log is unavailable", async () => {
    const value = fixture();
    const expired = vi.fn(async (args: string[]) => {
      if (args[0] === "run") throw new Error("Actions log expired");
      return value.run(args);
    });
    await expect(verifyPublicPagesDeployment(repository, tree, site, ".", expired))
      .rejects.toThrow("Actions log expired");
  });

  it("rejects malformed repository identifiers, trees, and unsafe site URLs", async () => {
    const { run } = fixture();
    await expect(verifyPublicPagesDeployment("../other", tree, site, ".", run))
      .rejects.toThrow("owner/repository");
    await expect(verifyPublicPagesDeployment(repository, "HEAD", site, ".", run))
      .rejects.toThrow("Approved public export tree");
    expect(() => normalizePublicSiteUrl("https://example.test/?token=secret")).toThrow("without credentials");
    expect(() => normalizePublicSiteUrl("http://example.test/")).toThrow("HTTPS");
    expect(run).not.toHaveBeenCalled();
  });
});
