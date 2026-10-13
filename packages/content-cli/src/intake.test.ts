import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import matter from "gray-matter";
import { loadCatalog } from "@ghcp/content-schema";
import { intakeWorkshop } from "./intake.js";
import { workshopContext } from "./lifecycle.js";

const execFileAsync = promisify(execFile);
const directories: string[] = [];

afterEach(async () => {
  await Promise.all(directories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })
  ));
});

describe("requirements intake", () => {
  it("scaffolds and refreshes a lifecycle-v3 workshop from Markdown", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-intake-"));
    directories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "seed.txt"), "seed");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Initial"], { cwd: root });
    const requirementsPath = path.join(root, "brief.md");
    await writeFile(requirementsPath, `---
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
    minutes: 30
    outcomes: [Explain the workflow]
  - id: practice
    title: Practice
    minutes: 30
    outcomes: [Apply the workflow]
acceptanceCriteria: [The production routes respond successfully]
---

# Requirements
`);
    const roots = { repositoryRoot: root, workshopsRoot: path.join(root, "workshops") };
    const first = await intakeWorkshop("brief.md", roots, new Date("2026-10-02T12:00:00.000Z"));
    expect(first.created).toBe(true);
    expect(first.modulesCreated).toEqual(["foundations", "practice"]);
    const second = await intakeWorkshop("brief.md", roots, new Date("2026-10-02T12:01:00.000Z"));
    expect(second.created).toBe(false);
    expect(second.modulesCreated).toEqual([]);

    const catalog = await loadCatalog(root);
    const entry = catalog.workshops[0]!;
    expect(entry.workshop.data.lifecycleVersion).toBe(3);
    expect(entry.modules.map((module) => module.data.id)).toEqual(["foundations", "practice"]);
    expect(entry.productionState?.data.phase).toBe("drafting");
    const context = await workshopContext("rapid-workshop", undefined, roots);
    expect(context.initiative).toBe("workshop-scaffolding");
    expect(context.ledger.path).toBe("content/production/production-ledger.md");
    const state = matter(await readFile(
      path.join(root, "workshops", "rapid-workshop", "content", "production", "production-state.md"),
      "utf8"
    ));
    expect(state.data.requirements.path).toBe("requirements.md");
    expect(state.data.imageBatch).toEqual({ limit: 3, used: 0 });
    const canonicalRequirements = path.join(root, "workshops", "rapid-workshop", "requirements.md");
    await writeFile(
      canonicalRequirements,
      (await readFile(canonicalRequirements, "utf8")).replace("quickly.", "differently.")
    );
    await expect(loadCatalog(root)).rejects.toThrow("requirements hash does not match");
  });

  it("preserves downstream content and safely serializes free-form requirement strings", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-intake-merge-"));
    directories.push(root);
    await execFileAsync("git", ["init"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "Test"], { cwd: root });
    await writeFile(path.join(root, "seed.txt"), "seed");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "Initial"], { cwd: root });
    const brief = (outcome: string) => `---
schemaVersion: 1
kind: workshop-requirements
id: rapid-workshop
title: "Rapid: Workshop #1"
description: "Ship #1 quickly: no drama."
audience: ["Developers: platform"]
durationMinutes: 60
outcomes: ["${outcome}"]
modules:
  - id: foundations
    title: "Setup: tools"
    minutes: 60
    outcomes: ["${outcome}"]
acceptanceCriteria: ["The production routes respond successfully"]
---

# Requirements
`;
    await writeFile(path.join(root, "brief.md"), brief("Ship a tested workshop"));
    const roots = { repositoryRoot: root, workshopsRoot: path.join(root, "workshops") };
    await intakeWorkshop("brief.md", roots, new Date("2026-10-02T12:00:00.000Z"));
    const statePath = path.join(
      root, "workshops", "rapid-workshop", "content", "production", "production-state.md"
    );
    const pausedState = matter(await readFile(statePath, "utf8"));
    await writeFile(statePath, matter.stringify(pausedState.content, {
      ...pausedState.data,
      sessionStatus: "paused",
      pausedAt: "2026-10-02T12:00:30.000Z",
      pauseReason: "Human pause"
    }));

    const workshopPath = path.join(root, "workshops", "rapid-workshop", "workshop.md");
    const modulePath = path.join(
      root, "workshops", "rapid-workshop", "content", "modules", "01-foundations", "module.md"
    );
    const workshop = matter(await readFile(workshopPath, "utf8"));
    expect(workshop.data.title).toBe("Rapid: Workshop #1");
    expect(workshop.data.description).toBe("Ship #1 quickly: no drama.");
    await writeFile(workshopPath, matter.stringify("Authored workshop narrative.", {
      ...workshop.data,
      tags: ["github-copilot", "curated"],
      researchSources: ["content/production/source-pack.md"],
      prerequisites: ["Bring a laptop"],
      schedule: {
        instructionMinutes: 40,
        missionMinutes: 20,
        discussionMinutes: 0,
        mediaPlaybackMinutes: 0,
        setupAndTransitionsMinutes: 0,
        breaksMinutes: 0,
        contingencyMinutes: 0
      }
    }));
    const module = matter(await readFile(modulePath, "utf8"));
    expect(module.data.title).toBe("Setup: tools");
    await writeFile(modulePath, matter.stringify("Authored module notes.", {
      ...module.data,
      timing: {
        instructionMinutes: 40,
        missionMinutes: 20,
        discussionMinutes: 0,
        mediaPlaybackMinutes: 0,
        setupAndTransitionsMinutes: 0,
        breaksMinutes: 0,
        contingencyMinutes: 0
      },
      prerequisites: ["Install the CLI"],
      generation: {
        expectedSlides: 12,
        manifest: "content/modules/01-foundations/slides.manifest.json",
        imageProvider: "gpt-image-2",
        visualStyle: "Workshop house style"
      }
    }));

    await intakeWorkshop("brief.md", roots, new Date("2026-10-02T12:05:00.000Z"));
    const refreshedState = matter(await readFile(statePath, "utf8"));
    expect(refreshedState.data.sessionStatus).toBe("paused");
    await writeFile(statePath, matter.stringify(refreshedState.content, {
      ...refreshedState.data,
      sessionStatus: "blocked",
      blockers: []
    }));
    await intakeWorkshop("brief.md", roots, new Date("2026-10-02T12:06:00.000Z"));
    expect(matter(await readFile(statePath, "utf8")).data.sessionStatus).toBe("blocked");
    const refreshedWorkshop = matter(await readFile(workshopPath, "utf8"));
    expect(refreshedWorkshop.content.trim()).toBe("Authored workshop narrative.");
    expect(refreshedWorkshop.data.tags).toEqual(["github-copilot", "curated"]);
    expect(refreshedWorkshop.data.researchSources).toEqual(["content/production/source-pack.md"]);
    expect(refreshedWorkshop.data.prerequisites).toEqual(["Bring a laptop"]);
    expect(refreshedWorkshop.data.schedule.missionMinutes).toBe(20);

    const refreshedModule = matter(await readFile(modulePath, "utf8"));
    expect(refreshedModule.content.trim()).toBe("Authored module notes.");
    expect(refreshedModule.data.prerequisites).toEqual(["Install the CLI"]);
    expect(refreshedModule.data.generation.expectedSlides).toBe(12);

    await writeFile(path.join(root, "brief.md"), brief("Ship a reviewed workshop"));
    await intakeWorkshop("brief.md", roots, new Date("2026-10-02T12:10:00.000Z"));
    const updated = matter(await readFile(modulePath, "utf8"));
    expect(updated.data.objectives).toEqual(["Ship a reviewed workshop"]);
    expect(updated.data.generation.expectedSlides).toBe(12);
    expect(updated.content.trim()).toBe("Authored module notes.");
  });
});
