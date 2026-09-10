import path from "node:path";
import fsExtra from "fs-extra";
import fg from "fast-glob";
import matter from "gray-matter";
import { repositoryRoot, workshopsRoot } from "./paths.js";
import { gitSnapshot } from "./lifecycle.js";

const { ensureDir, pathExists, readFile, writeFile } = fsExtra;

function assertId(id: string): void {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    throw new Error(`Invalid id "${id}". Use lowercase kebab-case.`);
  }
}

async function createExclusive(filePath: string, contents: string): Promise<void> {
  if (await pathExists(filePath)) throw new Error(`Refusing to overwrite existing file: ${filePath}`);
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, contents, "utf8");
}

type ScaffoldRoots = { repositoryRoot: string; workshopsRoot: string };
const defaultRoots: ScaffoldRoots = { repositoryRoot, workshopsRoot };

async function findModule(workshopId: string, moduleId: string, root: string): Promise<{
  filePath: string;
  body: string;
  data: Record<string, unknown>;
}> {
  const workshopRoot = path.join(root, workshopId);
  const moduleFiles = await fg("content/modules/*/module.md", { cwd: workshopRoot, absolute: true });
  for (const filePath of moduleFiles) {
    const parsed = matter(await readFile(filePath, "utf8"));
    if (parsed.data.id === moduleId) return { filePath, body: parsed.content, data: parsed.data };
  }
  throw new Error(`Module does not exist in workshop "${workshopId}": ${moduleId}`);
}

export async function scaffoldWorkshop(
  id: string,
  title: string,
  roots: ScaffoldRoots = defaultRoots
): Promise<void> {
  assertId(id);
  const root = path.join(roots.workshopsRoot, id);
  const now = new Date();
  const snapshot = await gitSnapshot(roots.repositoryRoot);
  await createExclusive(
    path.join(root, "workshop.md"),
    `---
schemaVersion: 1
kind: workshop
id: ${id}
title: ${title}
lifecycleVersion: 2
description: Describe the workshop outcome.
format: custom
duration: 1 hour
totalMinutes: 60
schedule:
  instructionMinutes: 30
  missionMinutes: 20
  discussionMinutes: 5
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 5
  breaksMinutes: 0
  contingencyMinutes: 0
runOfShow:
  - id: introduction
    type: module
    title: Introduction
    minutes: 60
    module: introduction
level: mixed
audience:
  - Software developers
prerequisites: []
modules:
  - introduction
tags:
  - github-copilot
researchSources: []
status: draft
lastReviewed: ${now.toISOString().slice(0, 10)}
---

# ${title}

Describe the workshop narrative and intended experience.
`
  );
  await Promise.all([
    ensureDir(path.join(root, "content", "labs")),
    ensureDir(path.join(root, "content", "missions")),
    ensureDir(path.join(root, "content", "storyboards")),
    ensureDir(path.join(root, "content", "characters")),
    ensureDir(path.join(root, "content", "locations")),
    ensureDir(path.join(root, "assets", "images")),
    ensureDir(path.join(root, "assets", "video-manifests"))
  ]);
  await createExclusive(
    path.join(root, "content", "production", "production-state.md"),
    `---
schemaVersion: 1
kind: production-state
workshop: ${id}
lifecycleVersion: 2
phase: idea
sessionStatus: active
activeTracks: []
currentInitiative: workshop-scaffolding
contextRefs: []
currentOwner: Workshop Production Coordinator
nextOwner: Human
nextHumanGate: Scope approval
resumeTask: scope-definition
approvedArtifacts: []
blockers: []
timing:
  totalMinutes: 60
  allocatedMinutes: 60
  source: content/production/experience-plan.md
paidGeneration: not-approved
releaseState: not-ready
branch: ${snapshot.branch}
lastValidatedCommit: ${snapshot.commit}
checkpointId: checkpoint-initial
updatedAt: ${now.toISOString()}
---

# ${title} Production State

This file is the concise current-state contract. Keep decision history in the decision log and link exact initiative preflight sections through contextRefs. No work envelope is approved by scaffolding.
`
  );
  await createExclusive(
    path.join(root, "content", "production", "decision-log.md"),
    `# ${title} Decision Log

Record explicit human decisions, superseded baselines, gate outcomes, and reopen reasons in chronological order.
Use the structured production-decision format in docs/production-action-controls.md for new CLI-controlled actions. Record each actual human decision once; never backfill historical consent.
`
  );
  await createExclusive(
    path.join(root, "content", "production", "source-pack.md"),
    `# ${title} Source Pack

Record source-of-truth documents, provenance, freshness dates, restrictions, and claim boundaries.
`
  );
  await createExclusive(
    path.join(root, "content", "production", "learning-architecture.md"),
    `# ${title} Learning Architecture

Define audience outcomes, module sequence, prerequisites, and objective-to-mission mapping.
`
  );
  await createExclusive(
    path.join(root, "content", "production", "experience-plan.md"),
    `# ${title} Experience Plan

Define the run of show, workshop format, timing, missions, facilitation, accessibility, and participant flow.
`
  );
  await createExclusive(
    path.join(root, "content", "production", "visual-bible.md"),
    `# ${title} Visual Bible

Define approved characters, relationships, locations, props, continuity, visual style, references, and exclusions. Record an explicit not-required decision when characters or locations are unnecessary.
`
  );
  await createExclusive(
    path.join(root, "content", "production", "iteration-review.md"),
    `# ${title} Iteration Review

Use this artifact for initiative preflights and post-module process reviews. Keep current phase and gate state in \`production-state.md\`, and record durable decisions in \`decision-log.md\`.

## Initiative preflight template

- Initiative:
- Learner outcome:
- Participant-visible deliverable and non-substitutable visual requirement:
- First uncertainty and smallest representative proof:
- Acceptance signals:
- Authoritative files and one writer per file:
- Risk tier and reasons:
- Independent tracks, dependencies, and convergence point:
- Smallest iteration validation:
- Integration and release validation:
- Media necessity and native/no-media option:
- Reusable approved baselines:
- Paid or high-rework envelope:
- Retry limit, stop conditions, and fallback:
- Next human decisions:

## Review log template

### YYYY-MM-DD — initiative-id

- Reviewed module:
- Reviewed commit or diff range:
- Approved baseline:
- Human module decision:
- Intended and observed quality:
- Review rounds and rework causes:
- Validation/build/visual failures:
- Paid calls, candidates, variants, and retries:
- Reused and discarded work:
- Acceptance evidence:
- Lesson disposition:
- Accepted experiment:
- Unresolved recommendations:
- Next human decisions:
`
  );
  await scaffoldModule(id, "01-introduction", "introduction", "Introduction", roots.workshopsRoot);
}

export async function scaffoldModule(
  workshopId: string,
  folder: string,
  id: string,
  title: string,
  rootDirectory = workshopsRoot
): Promise<void> {
  assertId(workshopId);
  assertId(id);
  if (!/^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(folder)) {
    throw new Error(`Invalid module folder "${folder}". Use an ordered name such as 01-foundations.`);
  }

  const root = path.join(rootDirectory, workshopId, "content", "modules", folder);
  await createExclusive(
    path.join(root, "module.md"),
    `---
schemaVersion: 1
kind: module
id: ${id}
title: ${title}
description: Describe the module outcome.
duration: 1 hour
totalMinutes: 60
timing:
  instructionMinutes: 30
  missionMinutes: 20
  discussionMinutes: 5
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 5
  breaksMinutes: 0
  contingencyMinutes: 0
objectives:
  - Add a measurable learning objective
prerequisites: []
sourceDocuments: []
slides: content/modules/${folder}/slides.md
labs: []
missions: []
assets: []
status: draft
---

# ${title}

Add author notes and module context.
`
  );
  await createExclusive(
    path.join(root, "slides.md"),
    `---
theme: ghcp
title: ${title}
transition: slide-left
---

# ${title}

Add the module opening.

---

# Learning objective

Add concise, engaging slide content.
`
  );
  await createExclusive(
    path.join(root, "media", "media-index.md"),
    `# ${title} Media Index

Use this index to locate current prompts, review cycles, approved references, participant-facing assets, overlays, and video handoffs.

| Asset id | Teaching role | Prompt | Review | Approved asset | Status |
| --- | --- | --- | --- | --- | --- |
| Add a stable semantic id | Describe the visual role | media/prompts/images/... | media/reviews/... | assets/images/${id}/... | planned |
`
  );
  await createExclusive(
    path.join(root, "complex-topics.md"),
    `---
schemaVersion: 1
kind: complex-topic-plan
id: ${id}-complex-topics
title: ${title} Complex Topics
module: ${id}
topics: []
status: draft
---

# ${title} Complex Topics

Record only workshop-owner-selected complex topics that span multiple stills and may earn one end-to-end summary video.
`
  );
  await Promise.all([
    ensureDir(path.join(root, "media", "prompts", "images")),
    ensureDir(path.join(root, "media", "prompts", "look-dev")),
    ensureDir(path.join(root, "media", "reviews")),
    ensureDir(path.join(root, "media", "references"))
  ]);
}

export async function scaffoldLab(workshopId: string, group: string, id: string, title: string): Promise<void> {
  assertId(workshopId);
  assertId(group);
  assertId(id);
  await createExclusive(
    path.join(workshopsRoot, workshopId, "content", "labs", group, `${id}.md`),
    `---
schemaVersion: 1
kind: lab
id: ${id}
title: ${title}
duration: 30 minutes
prerequisites: []
validation:
  - Add an observable completion check
status: draft
---

# ${title}

Describe the task, constraints, and expected result.
`
  );
}

export async function scaffoldMission(
  workshopId: string,
  moduleId: string,
  id: string,
  title: string,
  rootDirectory = workshopsRoot
): Promise<void> {
  assertId(workshopId);
  assertId(moduleId);
  assertId(id);
  const module = await findModule(workshopId, moduleId, rootDirectory);
  const objectives = Array.isArray(module.data.objectives)
    ? module.data.objectives.filter((objective): objective is string => typeof objective === "string")
    : [];
  const objective = objectives[0];
  if (!objective) throw new Error(`Module "${moduleId}" must define an objective before adding a mission`);
  const relativeMissionPath = `content/missions/${moduleId}/${id}.md`;
  const missionPath = path.join(rootDirectory, workshopId, ...relativeMissionPath.split("/"));
  await createExclusive(
    missionPath,
    `---
schemaVersion: 1
kind: mission
id: ${id}
title: ${title}
module: ${moduleId}
durationMinutes: 20
objectiveRefs:
  - ${JSON.stringify(objective)}
prerequisites: []
startingState: Describe what participants have before beginning.
task: Describe the participant mission.
constraints:
  - Add a meaningful boundary.
evidence:
  - Add observable evidence.
safetyCheckpoints: []
corePath:
  - Add the core task sequence.
stretchPath: []
debrief:
  - Add a reflection question.
validation:
  - Add an observable completion check.
status: draft
---

# ${title}

Develop the mission with the human from the approved learning and experience contracts.
`
  );
  const missions = Array.isArray(module.data.missions)
    ? module.data.missions.filter((mission): mission is string => typeof mission === "string")
    : [];
  await writeFile(
    module.filePath,
    matter.stringify(module.body, { ...module.data, missions: [...missions, relativeMissionPath] }),
    "utf8"
  );
}

export async function scaffoldLocation(
  workshopId: string,
  id: string,
  title: string,
  rootDirectory = workshopsRoot
): Promise<void> {
  assertId(workshopId);
  assertId(id);
  const root = path.join(rootDirectory, workshopId, "content", "locations", id);
  await createExclusive(
    path.join(root, "location.md"),
    `---
schemaVersion: 1
kind: location
id: ${id}
title: ${title}
description: Describe the location's teaching and narrative role.
visualTraits:
  - Add a stable environmental trait.
continuityRules:
  - Add a continuity rule.
referenceImages: []
usedByModules: []
status: draft
---

# ${title}

Develop this reusable location from the workshop visual bible.
`
  );
  await ensureDir(path.join(root, "references"));
}

export async function scaffoldStoryboard(workshopId: string, id: string, title: string): Promise<void> {
  assertId(workshopId);
  assertId(id);
  const root = path.join(workshopsRoot, workshopId, "content", "storyboards", id);
  await createExclusive(
    path.join(root, "storyboard.md"),
    `---
schemaVersion: 1
kind: storyboard
id: ${id}
title: ${title}
purpose: Describe the learning purpose of this clip.
targetDurationSeconds: 10
aspectRatio: "16:9"
characters: []
scenes:
  - content/storyboards/${id}/scenes/01-opening.md
status: draft
---

# ${title}

Describe the overall visual arc.
`
  );
  await createExclusive(
    path.join(root, "scenes", "01-opening.md"),
    `---
schemaVersion: 1
kind: scene
id: opening
title: Opening
durationSeconds: 10
narration: ""
visualDirection: Describe the camera, action, setting, and visual style.
continuityNotes: []
status: draft
---

# Opening

Add production notes for the scene.
`
  );
  await Promise.all([
    ensureDir(path.join(root, "frame-specs")),
    ensureDir(path.join(root, "prompts", "video")),
    ensureDir(path.join(root, "reviews")),
    ensureDir(path.join(root, "references"))
  ]);
}

export async function scaffoldCharacter(workshopId: string, id: string, title: string): Promise<void> {
  assertId(workshopId);
  assertId(id);
  await createExclusive(
    path.join(workshopsRoot, workshopId, "content", "characters", id, "character.md"),
    `---
schemaVersion: 1
kind: character
id: ${id}
title: ${title}
description: Describe the character's role and visual identity.
visualTraits:
  - Add a stable visual trait
continuityRules:
  - Add a continuity rule
referenceImages:
  - content/characters/${id}/references/placeholder.svg
status: draft
---

# ${title}

Add character direction for image and video generation.
`
  );
  await createExclusive(
    path.join(workshopsRoot, workshopId, "content", "characters", id, "references", "placeholder.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-labelledby="title">
  <title id="title">${title} reference placeholder</title>
  <rect width="512" height="512" fill="#0d1117"/>
  <circle cx="256" cy="190" r="104" fill="#8b949e"/>
  <path d="M112 512c12-132 60-198 144-198s132 66 144 198" fill="#3b2463"/>
</svg>
`
  );
}
