import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import matter from "gray-matter";
import {
  checkpointWorkshop,
  pauseWorkshop,
  resumeWorkshop,
  validateLifecycleState,
  workshopRunOfShow,
  workshopStatus,
  workshopContext
} from "./lifecycle.js";

const execFileAsync = promisify(execFile);
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

async function fixture(): Promise<{
  root: string;
  workshopsRoot: string;
  statePath: string;
}> {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-lifecycle-"));
  temporaryDirectories.push(root);
  const workshopsRoot = path.join(root, "workshops");
  const productionRoot = path.join(workshopsRoot, "test-workshop", "content", "production");
  const statePath = path.join(productionRoot, "production-state.md");
  await mkdir(productionRoot, { recursive: true });
  await writeFile(path.join(productionRoot, "experience-plan.md"), "# Experience");
  await execFileAsync("git", ["init"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "Initial"], { cwd: root });
  const commit = (await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim();
  await writeFile(
    statePath,
    `---
schemaVersion: 1
kind: production-state
workshop: test-workshop
lifecycleVersion: 2
phase: discovery
sessionStatus: active
activeTracks: []
currentInitiative: workshop-design
currentOwner: Workshop Production Coordinator
nextOwner: Human
nextHumanGate: Content approval
resumeTask: content-review
approvedArtifacts: []
blockers: []
timing:
  totalMinutes: 60
  allocatedMinutes: 60
  source: content/production/experience-plan.md
paidGeneration: not-approved
releaseState: not-ready
branch: main
lastValidatedCommit: ${commit}
checkpointId: checkpoint-initial
updatedAt: 2026-08-04T18:00:00.000Z
---

# State
`
  );
  return { root, workshopsRoot, statePath };
}

async function writeLedger(workshopsRoot: string, initiativeIds: string[]): Promise<void> {
  const ledgerPath = path.join(workshopsRoot, "test-workshop", "content", "production", "production-ledger.md");
  const sections = initiativeIds.map((id) => `### ${id}\n\n- Status: in-production\n`).join("\n");
  await writeFile(ledgerPath, `# Production ledger\n\n## Initiatives\n\n${sections}`);
}

describe("workshop lifecycle state", () => {
  it("derives only the selected initiative and leaves paused state unchanged", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await writeLedger(test.workshopsRoot, ["workshop-design", "other-initiative"]);
    await pauseWorkshop("test-workshop", "Owner pause", roots);
    const before = await readFile(test.statePath, "utf8");
    const context = await workshopContext("test-workshop", undefined, roots);
    expect(context.initiative).toBe("workshop-design");
    expect(context.ledger).not.toHaveProperty("text");
    expect(context.ledger.section).toBe("workshop-design");
    expect(context.missingPrerequisites).toContain("Production is paused");
    expect(context.missingPrerequisites.join(" ")).toContain("No structured contextRefs");
    expect(await readFile(test.statePath, "utf8")).toBe(before);
    const other = await workshopContext("test-workshop", "other-initiative", roots);
    expect(other.missingPrerequisites.join(" ")).toContain("not current");
  });

  it("fails scoped context on missing or ambiguous initiative and decision references", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await writeLedger(test.workshopsRoot, ["workshop-design", "workshop-design"]);
    await expect(workshopContext("test-workshop", undefined, roots)).rejects.toThrow("ambiguous");
    await writeLedger(test.workshopsRoot, ["workshop-design"]);
    await expect(workshopContext("test-workshop", "missing", roots)).rejects.toThrow("Missing");
    const loaded = matter(await readFile(test.statePath, "utf8"), {});
    loaded.data.contextRefs = [{ initiative: "workshop-design", preflight: "content/production/experience-plan.md", decisionIds: ["missing-decision"] }];
    await writeFile(test.statePath, matter.stringify(loaded.content, loaded.data));
    await writeFile(path.join(test.workshopsRoot, "test-workshop", "content", "production", "decision-log.md"), "# Decisions");
    await expect(workshopContext("test-workshop", undefined, roots)).rejects.toThrow("Missing or contradictory decision");
  });

  it("fingerprints referenced artifacts and reports missing paths", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await writeLedger(test.workshopsRoot, ["workshop-design"]);
    const loaded = matter(await readFile(test.statePath, "utf8"), {});
    loaded.data.contextRefs = [{ initiative: "workshop-design", preflight: "content/production/experience-plan.md", decisionIds: [] }];
    await writeFile(test.statePath, matter.stringify(loaded.content, loaded.data));
    await writeFile(path.join(test.workshopsRoot, "test-workshop", "content", "production", "decision-log.md"), "# Decisions");
    const context = await workshopContext("test-workshop", undefined, roots);
    expect(context.artifacts[0]?.sha256).toMatch(/^[a-f0-9]{64}$/);
    loaded.data.contextRefs[0].preflight = "content/missing.md";
    await writeFile(test.statePath, matter.stringify(loaded.content, loaded.data));
    await expect(workshopContext("test-workshop", undefined, roots)).rejects.toThrow();
  });
  it("persists a pause and resumes from repository state", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await pauseWorkshop("test-workshop", "Dinner break", roots, new Date("2026-08-04T18:30:00.000Z"));
    const parsed = matter(await readFile(test.statePath, "utf8"));
    expect(parsed.data.sessionStatus).toBe("paused");
    expect(parsed.data.pauseReason).toBe("Dinner break");
    await expect(resumeWorkshop("test-workshop", roots)).resolves.toContain("Resume task: content-review");
    await expect(workshopStatus("test-workshop", roots)).resolves.toContain("Timing: 60/60 minutes");
  });

  it("clears an explicit pause when the session resumes", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await pauseWorkshop("test-workshop", "Dinner break", roots, new Date("2026-08-04T18:30:00.000Z"));

    const status = await resumeWorkshop("test-workshop", roots);

    expect(status).toContain("(active)");
    const parsed = matter(await readFile(test.statePath, "utf8"));
    expect(parsed.data.sessionStatus).toBe("active");
    expect(parsed.data.pauseReason).toBeUndefined();
    expect(parsed.data.pausedAt).toBeUndefined();
  });

  it("rehearses recovery without consuming the pause when check-only is set", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await pauseWorkshop("test-workshop", "Dinner break", roots, new Date("2026-08-04T18:30:00.000Z"));

    const status = await resumeWorkshop("test-workshop", roots, { checkOnly: true });

    expect(status).toContain("(paused)");
    const parsed = matter(await readFile(test.statePath, "utf8"));
    expect(parsed.data.sessionStatus).toBe("paused");
    expect(parsed.data.pauseReason).toBe("Dinner break");
  });

  it("refuses to checkpoint a dirty worktree", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await expect(checkpointWorkshop("test-workshop", roots)).rejects.toThrow("clean worktree");
  });

  it("reports an error when the durable state names an initiative the ledger does not contain", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await writeLedger(test.workshopsRoot, ["animated-slide-refresh", "module-02-agentic"]);

    const issues = await validateLifecycleState(["test-workshop"], roots);
    const errors = issues.filter((issue) => issue.severity === "error");

    expect(errors).toHaveLength(1);
    expect(errors[0]?.message).toContain("workshop-design");
    expect(errors[0]?.message).toContain("Edit currentInitiative in production-state.md");
    expect(errors[0]?.message).toContain("Checkpoint cannot repair this");
    expect(errors[0]?.message).toContain('re-run "pnpm validate" to confirm the repair');
  });

  // Guards the remedy the error message above prescribes. If checkpoint ever starts
  // rewriting currentInitiative, or stops being insufficient on its own, that message
  // is wrong and this test should fail before anyone is misdirected by it again.
  it("leaves currentInitiative unchanged when checkpointing, so a mismatch survives the checkpoint", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await writeLedger(test.workshopsRoot, ["animated-slide-refresh"]);
    await execFileAsync("git", ["add", "."], { cwd: test.root });
    await execFileAsync("git", ["commit", "-m", "State and ledger"], { cwd: test.root });

    const before = matter(await readFile(test.statePath, "utf8")).data.currentInitiative;
    await checkpointWorkshop("test-workshop", roots);
    const after = matter(await readFile(test.statePath, "utf8")).data.currentInitiative;

    expect(before).toBe("workshop-design");
    expect(after).toBe("workshop-design");

    // The mismatch the checkpoint was wrongly advertised as fixing is still here.
    const issues = await validateLifecycleState(["test-workshop"], roots);
    expect(issues.filter((issue) => issue.severity === "error")).toHaveLength(1);
  });

  it("accepts a durable state whose initiative appears in the ledger", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await writeLedger(test.workshopsRoot, ["workshop-design"]);

    const issues = await validateLifecycleState(["test-workshop"], roots);

    expect(issues.filter((issue) => issue.severity === "error")).toEqual([]);
  });

  it("warns rather than errors when the recorded branch is not the checked-out branch", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };
    await writeLedger(test.workshopsRoot, ["workshop-design"]);
    await execFileAsync("git", ["checkout", "-b", "maintenance/some-other-branch"], { cwd: test.root });

    const issues = await validateLifecycleState(["test-workshop"], roots);
    const warnings = issues.filter((issue) => issue.severity === "warning");

    expect(issues.filter((issue) => issue.severity === "error")).toEqual([]);
    expect(warnings.some((issue) => issue.message.includes("maintenance/some-other-branch"))).toBe(true);
  });

  it("ignores workshops that have no durable state file", async () => {
    const test = await fixture();
    const roots = { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot };

    await expect(validateLifecycleState(["workshop-without-state"], roots)).resolves.toEqual([]);
  });

  it("renders a selected delivery variant", async () => {
    const test = await fixture();
    const workshopRoot = path.join(test.workshopsRoot, "test-workshop");
    const moduleRoot = path.join(workshopRoot, "content", "modules", "01-intro");
    await mkdir(moduleRoot, { recursive: true });
    await writeFile(
      path.join(workshopRoot, "workshop.md"),
      `---
schemaVersion: 1
kind: workshop
id: test-workshop
title: Test Workshop
lifecycleVersion: 2
description: Test schedule selection.
format: custom
duration: 1 hour
level: basic
audience: [Developers]
modules: [intro]
deliveryVariants:
  - id: compact
    title: Compact delivery
    description: One compact day.
    days:
      - id: day-one
        title: Day one
        start: "09:00"
        end: "10:00"
        agenda:
          - id: content
            type: module-content
            title: Introduction
            start: "09:00"
            end: "09:30"
            module: intro
          - id: mission
            type: mission
            title: Practice
            start: "09:30"
            end: "10:00"
            module: intro
lastReviewed: 2026-08-05
---
`
    );
    await writeFile(
      path.join(moduleRoot, "module.md"),
      `---
schemaVersion: 1
kind: module
id: intro
title: Introduction
description: Introductory module.
duration: 1 hour
totalMinutes: 60
timing:
  instructionMinutes: 30
  missionMinutes: 30
  discussionMinutes: 0
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 0
  contingencyMinutes: 0
objectives: [Learn the basics]
slides: content/modules/01-intro/slides.md
status: draft
---
`
    );
    await writeFile(path.join(moduleRoot, "slides.md"), "# Slides");

    const schedule = await workshopRunOfShow(
      "test-workshop",
      "09:00",
      { repositoryRoot: test.root, workshopsRoot: test.workshopsRoot },
      "compact"
    );

    expect(schedule).toContain("# Test Workshop: Compact delivery");
    expect(schedule).toContain("| Day one | 09:30 | 10:00 | 30 | mission | Practice | intro |");
  });
});
