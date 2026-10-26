import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";
import matter from "gray-matter";
import { approveLocalDraft, approveTestDraft, verifyPrivateCommit } from "./approvals.js";
import { intakeWorkshop } from "./intake.js";
import { validateApprovedRelease } from "./release.js";

const execFileAsync = promisify(execFile);
const directories: string[] = [];

afterEach(async () => {
  vi.unstubAllGlobals();
  await Promise.all(directories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })
  ));
});

async function commitAll(root: string, message: string): Promise<string> {
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
  return (await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim();
}

function activeDeploymentCommandRunner(
  commit: string,
  routes: string[],
  environmentUrl = "https://private.example.test/"
) {
  const deployJobUrl = "https://github.com/mfm-se-dev-org/ghcp-video-content/actions/runs/42/job/52";
  const workflowRun = {
    databaseId: 42,
    headSha: commit,
    headBranch: "main",
    event: "push",
    status: "completed",
    conclusion: "success"
  };
  const steps = [
    "Run pnpm typecheck",
    "Run pnpm test",
    "Run pnpm validate",
    "Build complete review site",
    "Verify built routes",
    "Upload Pages artifact"
  ].map((name) => ({ name, conclusion: "success" }));
  const jobs = [
    { databaseId: 51, name: "build", conclusion: "success", steps },
    {
      databaseId: 52,
      name: "deploy",
      conclusion: "success",
      steps: [{ name: "Deploy GitHub Pages", conclusion: "success" }]
    }
  ];
  const deploymentLog = [
    `"pages_build_version": "${commit}"`,
    `Created deployment for ${commit}, ID: ${commit}`,
    "Reported success!",
    `Evaluated environment url: ${environmentUrl}`
  ].join("\n");
  const commandRunner = vi.fn(async (command: string, args: string[]) => {
    if (command === "git") return "https://github.com/mfm-se-dev-org/ghcp-video-content.git";
    if (
      command === "gh" &&
      args[0] === "api" &&
      args[1]?.endsWith("/deployments?environment=github-pages&per_page=1")
    ) {
      return JSON.stringify([{
        id: 73,
        ref: "main",
        sha: commit,
        environment: "github-pages"
      }]);
    }
    if (
      command === "gh" &&
      args[0] === "api" &&
      args[1]?.endsWith("/deployments/73/statuses?per_page=1")
    ) {
      return JSON.stringify([{
        state: "success",
        environment: "github-pages",
        environment_url: environmentUrl,
        target_url: deployJobUrl
      }]);
    }
    if (command === "gh" && args[0] === "run" && args[1] === "view" && args.includes("--log")) {
      return deploymentLog;
    }
    if (command === "gh" && args[0] === "run" && args[1] === "view") {
      return JSON.stringify({ ...workflowRun, jobs });
    }
    if (command === "gh" && args[0] === "run" && args[1] === "download") {
      const directory = args[args.indexOf("--dir") + 1];
      if (!directory) throw new Error("Missing artifact download directory");
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, "artifact.tar"), "");
      return "";
    }
    if (command === "tar") {
      return args[2] === "./review-provenance.json"
        ? JSON.stringify({ sourceCommit: commit, dirty: false })
        : JSON.stringify({ routes });
    }
    throw new Error(`Unexpected command: ${command} ${args.join(" ")}`);
  });
  return commandRunner;
}

describe("environment approvals", () => {
  it("records local approval and converts exact private test evidence into an approved release", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-approvals-"));
    directories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "seed.txt"), "seed");
    await commitAll(root, "Initial");
    await writeFile(path.join(root, "brief.md"), `---
schemaVersion: 1
kind: workshop-requirements
id: rapid-workshop
title: Rapid Workshop
description: Build and ship a workshop quickly.
audience: [Developers]
durationMinutes: 60
outcomes: [Ship a tested workshop]
modules:
  - id: foundations
    title: Foundations
    minutes: 60
    outcomes: [Explain the workflow]
acceptanceCriteria: [The production routes respond successfully]
---
`);
    const roots = { repositoryRoot: root, workshopsRoot: path.join(root, "workshops") };
    await intakeWorkshop("brief.md", roots);
    const statePath = path.join(
      root, "workshops", "rapid-workshop", "content", "production", "production-state.md"
    );
    const awaitingApproval = matter(await readFile(statePath, "utf8"));
    await writeFile(statePath, matter.stringify(awaitingApproval.content, {
      ...awaitingApproval.data,
      sessionStatus: "awaiting-human"
    }));
    const localCommit = await commitAll(root, "Create local draft");
    const local = await approveLocalDraft("rapid-workshop", "Owner", roots, new Date("2026-10-02T12:00:00.000Z"));
    expect(local.commit).toBe(localCommit);
    expect(JSON.parse(await readFile(path.join(root, local.approvalPath), "utf8")).environment).toBe("local");
    await commitAll(root, "Record local approval");
    const testCommit = (await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim();
    await writeFile(path.join(root, "tooling.txt"), "Unrelated maintenance after the reviewed test commit.\n");
    const laterCommit = await commitAll(root, "Update unrelated tooling");
    expect(laterCommit).not.toBe(testCommit);
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request) => {
      const body = String(input).endsWith("review-provenance.json")
        ? { sourceCommit: testCommit, dirty: false }
        : { routes: ["workshops/rapid-workshop/foundations/"] };
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }));

    const test = await approveTestDraft(
      "rapid-workshop",
      "Owner",
      "https://private.example.test/",
      roots,
      new Date("2026-10-02T13:00:00.000Z")
    );
    const manifest = matter(await readFile(path.join(root, test.manifestPath), "utf8"));
    expect(manifest.data.status).toBe("approved");
    expect(manifest.data.commit).toBe(testCommit);
    expect(test.commit).toBe(testCommit);
    expect(JSON.parse(await readFile(path.join(root, test.approvalPath), "utf8")).environment).toBe("test");
    const immutableApprovalPath = path.join(
      root,
      "workshops",
      "rapid-workshop",
      "content",
      "production",
      "approvals",
      `test--${testCommit}.json`
    );
    expect(JSON.parse(await readFile(immutableApprovalPath, "utf8"))).toMatchObject({
      environment: "test",
      workshop: "rapid-workshop",
      commit: testCommit
    });
    await commitAll(root, "Record test approval");
    await expect(validateApprovedRelease(test.manifestPath, root)).resolves.toMatchObject({
      id: manifest.data.id,
      commit: testCommit
    });
    const manifestsBeforeDuplicateApproval = await readdir(path.join(root, "releases"));
    await expect(approveTestDraft(
      "rapid-workshop",
      "Owner",
      "https://private.example.test/",
      roots,
      new Date("2026-10-02T14:00:00.000Z")
    )).rejects.toThrow(`Test approval already exists for commit ${testCommit}`);
    expect(await readdir(path.join(root, "releases"))).toEqual(manifestsBeforeDuplicateApproval);
    await writeFile(immutableApprovalPath, JSON.stringify({
      ...JSON.parse(await readFile(immutableApprovalPath, "utf8")),
      approvedBy: "Uncommitted replacement"
    }, null, 2));
    await expect(validateApprovedRelease(test.manifestPath, root)).rejects.toThrow(
      "Test approval"
    );
  }, 10_000);

  it("rejects approval of a draft generated from superseded requirements", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-approvals-stale-"));
    directories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "seed.txt"), "seed");
    await commitAll(root, "Initial");
    await writeFile(path.join(root, "brief.md"), `---
schemaVersion: 1
kind: workshop-requirements
id: rapid-workshop
title: Rapid Workshop
description: Build and ship a workshop quickly.
audience: [Developers]
durationMinutes: 60
outcomes: [Ship a tested workshop]
modules:
  - id: foundations
    title: Foundations
    minutes: 60
    outcomes: [Explain the workflow]
acceptanceCriteria: [The production routes respond successfully]
---
`);
    const roots = { repositoryRoot: root, workshopsRoot: path.join(root, "workshops") };
    await intakeWorkshop("brief.md", roots);
    await commitAll(root, "Create local draft");

    const requirementsPath = path.join(root, "workshops", "rapid-workshop", "requirements.md");
    await writeFile(
      requirementsPath,
      (await readFile(requirementsPath, "utf8")).replace("quickly.", "slowly.")
    );
    await commitAll(root, "Edit requirements without re-running intake");

    await expect(approveLocalDraft("rapid-workshop", "Owner", roots)).rejects.toThrow("re-run intake");
  });

  it("rejects test approval when the workflow has not reached a published test draft", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-approvals-phase-"));
    directories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "seed.txt"), "seed");
    await commitAll(root, "Initial");
    await writeFile(path.join(root, "brief.md"), `---
schemaVersion: 1
kind: workshop-requirements
id: rapid-workshop
title: Rapid Workshop
description: Build and ship a workshop quickly.
audience: [Developers]
durationMinutes: 60
outcomes: [Ship a tested workshop]
modules:
  - id: foundations
    title: Foundations
    minutes: 60
    outcomes: [Explain the workflow]
acceptanceCriteria: [The production routes respond successfully]
---
`);
    const roots = { repositoryRoot: root, workshopsRoot: path.join(root, "workshops") };
    await intakeWorkshop("brief.md", roots);
    await commitAll(root, "Create local draft");
    const local = await approveLocalDraft("rapid-workshop", "Owner", roots, new Date("2026-10-02T12:00:00.000Z"));

    const statePath = path.join(root, "workshops", "rapid-workshop", "content", "production", "production-state.md");
    const state = matter(await readFile(statePath, "utf8"));
    await writeFile(statePath, matter.stringify(state.content, { ...state.data, phase: "drafting" }));
    await commitAll(root, "Record local approval but leave the draft unpublished");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(approveTestDraft("rapid-workshop", "Owner", "https://private.example.test/", roots))
      .rejects.toThrow("published test draft");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(JSON.parse(await readFile(path.join(root, local.approvalPath), "utf8")).environment).toBe("local");
  });

  it("verifies SSO-protected Pages from the active deployment and its exact artifact", async () => {
    const commit = "a".repeat(40);
    const commandRunner = activeDeploymentCommandRunner(commit, ["workshops/rapid-workshop/foundations/"]);
    vi.stubGlobal("fetch", vi.fn(async () => new Response(
      "<html>Sign in to view this private site</html>",
      { status: 200, headers: { "content-type": "text/html" } }
    )));

    await expect(verifyPrivateCommit(
      "https://private.example.test/workshops/rapid-workshop/foundations/",
      process.cwd(),
      ["workshops/rapid-workshop/foundations/"],
      commandRunner
    )).resolves.toBe(commit);
    expect(commandRunner).toHaveBeenCalledWith("gh", [
      "api",
      "repos/mfm-se-dev-org/ghcp-video-content/deployments?environment=github-pages&per_page=1"
    ], process.cwd());
    expect(commandRunner).toHaveBeenCalledWith("gh", [
      "run", "view", "42", "--repo", "mfm-se-dev-org/ghcp-video-content",
      "--json", "headBranch,headSha,event,status,conclusion,jobs"
    ], process.cwd());
    expect(commandRunner).not.toHaveBeenCalledWith(
      "gh",
      expect.arrayContaining(["run", "list"]),
      process.cwd()
    );
  });

  it("rejects a required route absent from the active deployment artifact", async () => {
    const commit = "b".repeat(40);
    const commandRunner = activeDeploymentCommandRunner(commit, []);
    vi.stubGlobal("fetch", vi.fn(async () => new Response("<html>SSO</html>", {
      status: 200,
      headers: { "content-type": "text/html" }
    })));

    await expect(verifyPrivateCommit(
      "https://private.example.test/",
      process.cwd(),
      ["workshops/rapid-workshop/foundations/"],
      commandRunner
    )).rejects.toThrow(
      "Active Pages deployment artifact is missing required route workshops/rapid-workshop/foundations/"
    );
  });

  it("rejects active deployment evidence for a different private site URL", async () => {
    const commit = "c".repeat(40);
    const commandRunner = activeDeploymentCommandRunner(
      commit,
      ["workshops/rapid-workshop/foundations/"],
      "https://different.example.test/"
    );
    vi.stubGlobal("fetch", vi.fn(async () => new Response("<html>SSO</html>", {
      status: 200,
      headers: { "content-type": "text/html" }
    })));

    await expect(verifyPrivateCommit(
      "https://private.example.test/",
      process.cwd(),
      ["workshops/rapid-workshop/foundations/"],
      commandRunner
    )).rejects.toThrow("active GitHub Pages deployment URL does not match");
  });
});
