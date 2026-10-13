import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";
import matter from "gray-matter";
import { approveLocalDraft, approveTestDraft } from "./approvals.js";
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
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({
      sourceCommit: testCommit,
      dirty: false
    }), { status: 200, headers: { "content-type": "application/json" } })));

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
});
