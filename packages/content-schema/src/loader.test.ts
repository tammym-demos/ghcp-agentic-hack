import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ContentValidationError, loadCatalog } from "./loader.js";

const temporaryDirectories: string[] = [];

function validSpeakerNotes(minutes: number): string {
  return `<!--
Timebox: ${minutes} ${minutes === 1 ? "minute" : "minutes"}
Talk track: Deliver this slide as natural word-for-word narration.
Transition: Move directly to the next idea.
Audience question: What would you apply from this slide?
Response guidance: Invite one brief response and connect it to the slide.
Payoff: The question makes the teaching purpose explicit.
Sources: content/modules/01-intro/source.md
-->`;
}

async function createGeneratedModuleFixture(options: {
  slides: string;
  manifest: string;
  expectedSlides?: number;
}): Promise<{ root: string; moduleRoot: string }> {
  const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-content-"));
  temporaryDirectories.push(root);
  const workshop = path.join(root, "workshops", "test-workshop");
  const moduleRoot = path.join(workshop, "content", "modules", "01-intro");
  await mkdir(moduleRoot, { recursive: true });
  await writeFile(
    path.join(workshop, "workshop.md"),
    `---
schemaVersion: 1
kind: workshop
id: test-workshop
title: Test Workshop
description: Test content validation.
format: custom
duration: 1 hour
level: basic
audience: [Developers]
modules: [intro]
lastReviewed: 2026-07-28
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
objectives: [Learn the basics]
sourceDocuments:
  - content/modules/01-intro/source.md
slides: content/modules/01-intro/slides.md
generation:
  expectedSlides: ${options.expectedSlides ?? 1}
  manifest: content/modules/01-intro/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: Minimal
status: draft
---
`
  );
  await writeFile(path.join(moduleRoot, "source.md"), "# Source");
  await writeFile(path.join(moduleRoot, "slides.md"), options.slides);
  await writeFile(path.join(moduleRoot, "slide-manifest.md"), options.manifest);
  return { root, moduleRoot };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("loadCatalog", () => {
  it("validates character references even when a workshop has no storyboard", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-content-"));
    temporaryDirectories.push(root);
    const workshop = path.join(root, "workshops", "test-workshop");
    await mkdir(path.join(workshop, "content", "modules", "01-intro"), { recursive: true });
    await mkdir(path.join(workshop, "content", "characters", "guide"), { recursive: true });
    await writeFile(
      path.join(workshop, "workshop.md"),
      `---
schemaVersion: 1
kind: workshop
id: test-workshop
title: Test Workshop
description: Test content validation.
format: custom
duration: 1 hour
level: basic
audience: [Developers]
modules: [intro]
lastReviewed: 2026-07-28
---
`
    );
    await writeFile(
      path.join(workshop, "content", "modules", "01-intro", "module.md"),
      `---
schemaVersion: 1
kind: module
id: intro
title: Introduction
description: Introductory module.
duration: 1 hour
objectives: [Learn the basics]
slides: content/modules/01-intro/slides.md
status: draft
---
`
    );
    await writeFile(path.join(workshop, "content", "modules", "01-intro", "slides.md"), "# Slides");
    await writeFile(
      path.join(workshop, "content", "characters", "guide", "character.md"),
      `---
schemaVersion: 1
kind: character
id: guide
title: Guide
description: Workshop guide.
visualTraits: [Purple jacket]
continuityRules: [Keep the jacket]
referenceImages: [content/characters/guide/references/missing.png]
status: draft
---
`
    );

    await expect(loadCatalog(root)).rejects.toBeInstanceOf(ContentValidationError);
  });

  it("rejects storyboard references that point to the wrong content kind", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-content-"));
    temporaryDirectories.push(root);
    const workshop = path.join(root, "workshops", "test-workshop");
    await mkdir(path.join(workshop, "content", "modules", "01-intro"), { recursive: true });
    await mkdir(path.join(workshop, "content", "storyboards", "opening"), { recursive: true });
    await writeFile(
      path.join(workshop, "workshop.md"),
      `---
schemaVersion: 1
kind: workshop
id: test-workshop
title: Test Workshop
description: Test content validation.
format: custom
duration: 1 hour
level: basic
audience: [Developers]
modules: [intro]
lastReviewed: 2026-07-28
---
`
    );
    await writeFile(
      path.join(workshop, "content", "modules", "01-intro", "module.md"),
      `---
schemaVersion: 1
kind: module
id: intro
title: Introduction
description: Introductory module.
duration: 1 hour
objectives: [Learn the basics]
slides: content/modules/01-intro/slides.md
status: draft
---
`
    );
    await writeFile(path.join(workshop, "content", "modules", "01-intro", "slides.md"), "# Slides");
    await writeFile(
      path.join(workshop, "content", "storyboards", "opening", "storyboard.md"),
      `---
schemaVersion: 1
kind: storyboard
id: opening
title: Opening
purpose: Open the workshop.
targetDurationSeconds: 10
aspectRatio: "16:9"
scenes: [content/modules/01-intro/module.md]
status: draft
---
`
    );

    await expect(loadCatalog(root)).rejects.toThrow("scene reference does not point to a validated scene");
  });

  it("enforces generated slide counts and manifest titles", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-content-"));
    temporaryDirectories.push(root);
    const workshop = path.join(root, "workshops", "test-workshop");
    const moduleRoot = path.join(workshop, "content", "modules", "01-intro");
    await mkdir(moduleRoot, { recursive: true });
    await writeFile(
      path.join(workshop, "workshop.md"),
      `---
schemaVersion: 1
kind: workshop
id: test-workshop
title: Test Workshop
description: Test content validation.
format: custom
duration: 1 hour
level: basic
audience: [Developers]
modules: [intro]
lastReviewed: 2026-07-28
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
objectives: [Learn the basics]
slides: content/modules/01-intro/slides.md
generation:
  expectedSlides: 2
  manifest: content/modules/01-intro/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: Minimal
status: draft
---
`
    );
    await writeFile(
      path.join(moduleRoot, "slides.md"),
      `---
theme: ghcp
---

# Wrong title

${validSpeakerNotes(1)}
`
    );
    await writeFile(
      path.join(moduleRoot, "slide-manifest.md"),
      `| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 1 | H1 | Intro | Cover | Introduction | Native |
| 2 | 2 | H2 | Next | Content | Next steps | Native |
`
    );

    await expect(loadCatalog(root)).rejects.toThrow("expected 2 slides but found 1 H1 slide titles");

    await writeFile(
      path.join(moduleRoot, "slides.md"),
      `---
theme: ghcp
---

# Introduction

${validSpeakerNotes(1)}

---

# Teach the project with \`/init\`

${validSpeakerNotes(2)}
`
    );
    await writeFile(
      path.join(moduleRoot, "slide-manifest.md"),
      `| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 1 | H1 | Intro | Cover | Introduction | Native |
| 2 | 2 | H2 | Next | Content | Teach the project with \`/init\` | Native |
`
    );

    await expect(loadCatalog(root)).resolves.toMatchObject({
      workshops: [{ modules: [{ data: { id: "intro" } }] }]
    });

    await writeFile(
      path.join(moduleRoot, "slides.md"),
      `---
theme: ghcp
---

# Introduction

${validSpeakerNotes(1)}

---
hide: true
---

# Superseded introduction

---

# Teach the project with \`/init\`

${validSpeakerNotes(2)}
`
    );

    await expect(loadCatalog(root)).resolves.toMatchObject({
      workshops: [{ modules: [{ data: { id: "intro" } }] }]
    });

    await writeFile(
      path.join(moduleRoot, "slides.md"),
      (await readFile(path.join(moduleRoot, "slides.md"), "utf8")).replace("hide: true", "disabled: true")
    );

    await expect(loadCatalog(root)).resolves.toMatchObject({
      workshops: [{ modules: [{ data: { id: "intro" } }] }]
    });

    await writeFile(
      path.join(moduleRoot, "slides.md"),
      (await readFile(path.join(moduleRoot, "slides.md"), "utf8")).replace("disabled: true", "disabled: false")
    );

    await expect(loadCatalog(root)).rejects.toThrow("expected 2 slides but found 3 H1 slide titles");
  });

  it.each([
    [
      "Foundations column order",
      `| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 0 | H1 | Intro | Cover | Introduction | Native |
| 2 | 3 | H2 | Next | Content | Teach the project with \`/init\` | Native |
`
    ],
    [
      "Agentic column order",
      `| # | Exact source title | Source markers | Communication job and native treatment | Minutes |
|---:|---|---|---|---:|
| 1 | Introduction | module.md | Open the module | 0 |
| 2 | Teach the project with \`/init\` | AGT-22 | Explain the reviewed CLI flow | 3 |
`
    ],
    [
      "Advanced column order",
      `| # | Minutes | Source marker | Slide type | Exact source title | Required contract |
|---:|---:|---|---|---|---|
| 1 | 0 | H1 | Cover | Introduction | Open the module |
| 2 | 3 | Slide topic | Content | Teach the project with \`/init\` | Preserve the command |
`
    ]
  ])("accepts seven-section notes with %s", async (_label, manifest) => {
    const { root } = await createGeneratedModuleFixture({
      expectedSlides: 2,
      slides: `---
theme: ghcp
---

# Introduction

${validSpeakerNotes(0)}

---
hide: true
---

# Hidden historical slide

---

# Teach the project with \`/init\`

${validSpeakerNotes(3)}
`,
      manifest
    });

    await expect(loadCatalog(root)).resolves.toMatchObject({
      workshops: [{ modules: [{ data: { id: "intro" } }] }]
    });
  });

  it("accepts canonical fractional manifest minutes", async () => {
    const { root } = await createGeneratedModuleFixture({
      slides: `---
theme: ghcp
---

# Introduction

${validSpeakerNotes(2.5)}
`,
      manifest: `| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 2.5 | H1 | Intro | Cover | Introduction | Native |
`
    });

    await expect(loadCatalog(root)).resolves.toMatchObject({
      workshops: [{ modules: [{ data: { id: "intro" } }] }]
    });
  });

  it.each([
    ["a missing notes comment", "", "must have exactly one speaker-notes comment"],
    [
      "duplicate notes comments",
      `${validSpeakerNotes(3)}
${validSpeakerNotes(3)}`,
      "must have exactly one speaker-notes comment"
    ],
    [
      "notes before remaining slide content",
      `${validSpeakerNotes(3)}
<p>Content after the notes.</p>`,
      "speaker-notes comment must appear directly after the slide content"
    ],
    [
      "a missing required section",
      validSpeakerNotes(3).replace(/^Sources:.*\r?\n?/m, ""),
      'speaker notes are missing "Sources:"'
    ],
    [
      "a duplicate required section",
      validSpeakerNotes(3).replace(/^Payoff:.*$/m, (line) => `${line}\nPayoff: Duplicate payoff.`),
      'speaker notes contain duplicate "Payoff:" sections'
    ],
    [
      "reordered required sections",
      validSpeakerNotes(3)
        .replace(
          /^Transition: (.*)\r?\nAudience question: (.*)$/m,
          "Audience question: $2\nTransition: $1"
        ),
      "speaker-note sections must appear in order"
    ],
    [
      "a malformed required heading",
      validSpeakerNotes(3).replace("Audience question:", "Audience Question:"),
      'unexpected or malformed section heading "Audience Question:"'
    ],
    [
      "a malformed timebox",
      validSpeakerNotes(3).replace("Timebox: 3 minutes", "Timebox: three minutes"),
      'Timebox must be "Timebox: 3 minutes"'
    ],
    [
      "a mismatched numeric timebox",
      validSpeakerNotes(3).replace("Timebox: 3 minutes", "Timebox: 4 minutes"),
      'Timebox must be "Timebox: 3 minutes"'
    ]
  ])("rejects %s", async (_label, notes, expectedIssue) => {
    const { root } = await createGeneratedModuleFixture({
      slides: `---
theme: ghcp
---

# Introduction

${notes}
`,
      manifest: `| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 3 | H1 | Intro | Cover | Introduction | Native |
`
    });

    await expect(loadCatalog(root)).rejects.toThrow(expectedIssue);
  });

  it("accepts colon-leading narration that is not a required section", async () => {
    const notes = validSpeakerNotes(3).replace(
      "Talk track: Introduce the topic in a natural speaking voice.",
      "Talk track: Introduce the topic in a natural speaking voice.\nExample: Walk through one concrete case.\nPresenter cue 1: Pause before the result."
    );
    const { root } = await createGeneratedModuleFixture({
      slides: `---
theme: ghcp
---

# Introduction

${notes}
`,
      manifest: `| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 3 | H1 | Intro | Cover | Introduction | Native |
`
    });

    await expect(loadCatalog(root)).resolves.toMatchObject({
      workshops: [{ modules: [{ data: { id: "intro" } }] }]
    });
  });

  it.each([
    "Timebox",
    "Talk track",
    "Transition",
    "Audience question",
    "Response guidance",
    "Payoff",
    "Sources"
  ])("rejects a blank %s section", async (section) => {
    const notes = validSpeakerNotes(3).replace(
      new RegExp(`^${section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:.*$`, "m"),
      `${section}:`
    );
    const { root } = await createGeneratedModuleFixture({
      slides: `---
theme: ghcp
---

# Introduction

${notes}
`,
      manifest: `| # | Minutes | Source | Topic | Type | Exact source title | Visual |
|---:|---:|---|---|---|---|---|
| 1 | 3 | H1 | Intro | Cover | Introduction | Native |
`
    });

    await expect(loadCatalog(root)).rejects.toThrow(`speaker-note section "${section}:" must not be blank`);
  });

  it("rejects a generated manifest without numeric Minutes values", async () => {
    const { root } = await createGeneratedModuleFixture({
      slides: `---
theme: ghcp
---

# Introduction

${validSpeakerNotes(3)}
`,
      manifest: `| # | Source | Topic | Type | Exact source title | Visual |
|---:|---|---|---|---|---|
| 1 | H1 | Intro | Cover | Introduction | Native |
`
    });

    await expect(loadCatalog(root)).rejects.toThrow('manifest slide 1 has invalid Minutes value ""');
  });

  it("reconciles delivery variant module phase minutes", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "ghcp-content-"));
    temporaryDirectories.push(root);
    const workshop = path.join(root, "workshops", "test-workshop");
    const moduleRoot = path.join(workshop, "content", "modules", "01-intro");
    await mkdir(moduleRoot, { recursive: true });
    await writeFile(
      path.join(workshop, "workshop.md"),
      `---
schemaVersion: 1
kind: workshop
id: test-workshop
title: Test Workshop
description: Test delivery variants.
format: custom
duration: 1 hour
level: basic
audience: [Developers]
modules: [intro]
deliveryVariants:
  - id: compact
    title: Compact
    description: Compact delivery.
    days:
      - id: day-one
        title: Day one
        start: "09:00"
        end: "10:00"
        agenda:
          - id: content
            type: module-content
            title: Content
            start: "09:00"
            end: "09:20"
            module: intro
          - id: mission
            type: mission
            title: Mission
            start: "09:20"
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

    await expect(loadCatalog(root)).rejects.toThrow(
      'delivery variant "compact" module-content minutes for "intro" (20) must equal 30'
    );
  });
});
