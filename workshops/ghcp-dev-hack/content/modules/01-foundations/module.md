---
schemaVersion: 1
kind: module
id: foundations
title: Foundations
description: >-
  Build a durable mental model for daily GitHub Copilot use — surfaces, safety,
  interaction modes, cost awareness, context hygiene, and delegation discipline.
duration: 2 hours 2 minutes
totalMinutes: 122
timing:
  instructionMinutes: 77
  missionMinutes: 45
  discussionMinutes: 0
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 0
  contingencyMinutes: 0
objectives:
  - >-
    Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud,
    and app surfaces and identify enterprise safety responsibilities
  - >-
    Apply VS Code chat references, inline completions, inline chat, and
    Ask/Plan/Agent modes to real engineering tasks
  - >-
    Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for
    cost-aware daily execution
  - Detect context rot and apply context window hygiene practices
  - >-
    Apply the autonomy spectrum and least-privilege delegation before escalating
    to agentic patterns
prerequisites: []
sourceDocuments:
  - content/modules/01-foundations/token-cache-cli-live.md
  - content/modules/01-foundations/token-cache-cli-motion/source.md
  - content/modules/01-foundations/context-caching.md
  - content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md
  - content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md
  - content/modules/01-foundations/complex-topics.md
  - content/modules/01-foundations/model-guide-contract.md
  - content/missions/foundations/context-and-prompts.md
  - content/production/foundations-mission-scavenger-hunt-contract.md
  - content/research/foundations-content-verification.md
  - content/storyboards/foundations-visual-narrative/storyboard.md
  - >-
    content/storyboards/foundations-visual-narrative/scenes/09-token-usage-summary.md
slides: content/modules/01-foundations/slides.md
generation:
  expectedSlides: 24
  manifest: content/modules/01-foundations/slide-manifest.md
  imageProvider: mai-image-2.5
  visualStyle: >-
    GitHub-aligned light editorial presentation with native Mona Sans text,
    accessible native tables and diagrams, original approved workshop-character
    stills, and explicit native review placeholders for accepted but unproduced
    motion stories; no generated text, product UI, logos, mascots, inherited
    animation compositions, or unproduced video declarations
labs: []
missions:
  - content/missions/foundations/context-and-prompts.md
assets:
  - assets/brand/github/GitHub_Lockup_Black_Clearspace.svg
  - assets/brand/github/GitHub_Copilot_Lockup_Black_Clearspace.svg
  - assets/brand/microsoft/microsoft-logo.png
  - assets/brand/vscode/code-stable.png
  - assets/images/foundations/foundation-welcome.png
  - assets/images/foundations/foundation-welcome-trio-human-mergewell-v2.png
  - assets/images/foundations/foundation-welcome-trio-camera-ready-v3.png
  - assets/images/foundations/session-route.png
  - assets/images/foundations/copilot-surface-benefits.png
  - assets/images/foundations/copilot-surfaces-riley-human-lock-v2.png
  - assets/images/foundations/copilot-surfaces-harness-choice-human-lock-v3.png
  - assets/images/foundations/copilot-harness.png
  - assets/images/foundations/vscode-grounding.png
  - assets/images/foundations/cli-controlled-action.png
  - assets/images/foundations/cli-controlled-action.png.json
  - assets/images/foundations/enterprise-boundaries.png
  - assets/images/foundations/human-accountability.png
  - assets/images/foundations/interaction-autonomy.png
  - assets/images/foundations/railway-message-comparison-v1.png
  - assets/images/foundations/railway-message-comparison-v1.png.json
  - assets/images/foundations/model-routing-evidence.png
  - assets/images/foundations/model-routing-static-plate.png
  - assets/images/foundations/context-drift.png
  - assets/images/foundations/foundations-context-funnel-wider-neck-v2.png
  - assets/images/foundations/least-privilege-key.png
  - assets/images/foundations/mission-readiness.png
  - assets/images/foundations/context-map.svg
  - assets/images/foundations/scene-01-still.png
  - assets/images/foundations/scene-02-still.png
  - assets/images/foundations/scene-03-still.png
  - assets/images/foundations/scene-04-still.png
  - assets/images/foundations/scene-06-still.png
  - assets/images/foundations/scene-07-still.png
  - assets/images/foundations/scene-08-still.png
  - assets/images/foundations/scene-12-still.png
  - assets/images/foundations/scene-13-still.png
status: review
---

# Foundations

Use this module first for audiences that are new to GitHub Copilot or need a common baseline.

Module schedule: 77 minutes of intended instruction across four sections,
followed by 45 minutes of Agent Mergewell mission play: 122 minutes total.
The current 24 visible slides allocate 61 teaching minutes and 45 mission
minutes. The remaining 16 minutes of the intended economics/additions budget
are explicitly temporary and unallocated; they are not redistributed to the
visible slides. Native replays are included in the allocated teaching time;
media playback is zero. The Missions artifact retains the detailed harness
setup, clues, evidence, safety checkpoints, and debriefs.

Slide 11 production adoption (owner authorization 2026-09-07; formerly 23):
`ManufacturingContextFunnel` reuses the exact approved wider-neck raster and
corrected single-play native proof. The local full-canvas typography exception
uses Franklin Gothic Demi Cond and Bahnschrift with existing sans-serif
fallbacks; no font files are distributed and no global theme font changes.
See `media/reviews/2026-09-07-production-adoption.md` for production-shaped
evidence. Its three-minute timebox, geometry, nine four-second beats, final
hold, and reduced-motion summary remain unchanged; one Play control now runs
the complete sequence continuously. The approved context/caching contract supersedes the former
109-minute slide sum and 120-minute declaration. Shared workshop timing is
coordinator-owned and is not edited here.

Slides 13–15 are the owner-approved, one-minute plain-English introduction to
included input, token IDs versus learned numeric representations, and
context-sensitive next-token selection. They use native HTML only and introduce
no new media or measured model data.

The owner-approved `How your message shapes the reply` integration is slide 16.
It uses the accepted 960×540 seven-stage native component. One Play control now
runs all seven stages continuously while preserving the teaching text,
reduced-motion behavior, geometry, timing, and final state. The
published raster and provenance sidecar are maintained at
`assets/images/foundations/railway-message-comparison-v1.png` and
`.png.json`; its exact approved prompt is retained module-locally so the
sidecar source is portable. The build-safe public copy preserves the exact
raster bytes.
Publication authorization is `publication-railway-message-comparison-v2`.
Historical approved assets and production evidence remain in the repository
even when no longer declared by this 24-slide deck.

Slide 17 reuses the existing two-minute standalone CLI walkthrough through
`FoundationCacheWalkthrough`, with the same component, sequence and approved
art bytes. See `token-cache-cli-live.md` for source, reuse, timing and the
unchanged font limitation. Causes stays standalone; no media is generated.
