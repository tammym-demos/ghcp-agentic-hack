---
schemaVersion: 1
kind: module
id: copilot-value-lab
title: The Copilot Value
description: Connect GitHub Copilot consumption to organizational decisions and engineering outcomes through an architect and leadership decision workshop.
duration: "Full-day deck, 09:00-17:00, including three break/lunch utilities"
totalMinutes: 480
timing:
  instructionMinutes: 151
  missionMinutes: 0
  discussionMinutes: 254
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 75
  contingencyMinutes: 0
objectives:
  - Distinguish capacity and activity from developer leverage, defined as completed work divided by developer hours.
  - Select primary and secondary AI ROI paths and identify the limiting factor at the workflow completion boundary.
  - Prioritize a controlled current-usage optimization using baseline, change, evidence and keep/revise/stop logic.
  - Produce a bounded pilot package with funding, governance, scorecard, gates, owners, dependencies and a next review.
prerequisites:
  - Familiarity with one organizational engineering workflow and its business outcome
  - Available baseline evidence is useful but not required; missing evidence is recorded explicitly
sourceDocuments:
  - content/modules/01-copilot-value-lab/mission-control-source.md
slides: content/modules/01-copilot-value-lab/slides.md
generation:
  expectedSlides: 22
  manifest: content/modules/01-copilot-value-lab/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: "Native warm editorial decision room; Mona Sans with Segoe UI/Arial fallbacks; cream, ink, green and restrained purple. One approved v7 team illustration on S01 only; no later characters, generated typography, fake UI or new visual assets."
labs: []
missions: []
assets:
  - assets/brand/microsoft/microsoft-logo.png
  - assets/brand/github/GitHub_Lockup_Black_Clearspace.svg
  - assets/images/copilot-value-lab/mission-control-opening-team-v7.png
  - assets/images/copilot-value-lab/mission-control-opening-team-v7.png.json
status: draft
---

# The Copilot Value

This is the text-only contract for initiative
`mission-control-value-decision-workshop-revision` at approved baseline commit
`91f168060327dd773c96de199921a4e35081bf8c` and Mission Control tree
`0d9aaf1e205709090517b3e938660484fd6054ed`.

## Audience and prerequisites

The module is for architects, engineering and business leaders,
developer-platform and GitHub administrators, security/compliance leaders, and
Finance/FinOps partners. Participants should know one organizational engineering
workflow and its intended business outcome. They do not need a coding exercise,
Copilot App session, starter repository or product-administration access.
Available baseline evidence is useful, but a missing baseline is an explicit
decision gap rather than a reason to invent data.

## Learning and decision sequence

1. **Mission briefing:** choose a workflow and the organizational decision the
   day must support.
2. **Capacity versus leverage:** distinguish activity from completed work per
   developer hour, map the completion boundary and identify lost leverage.
3. **Four paths to AI ROI:** select primary/secondary paths and identify the
   limiting factor.
4. **Optimize current usage:** use guided examples to control one meaningful
   change while holding the task and acceptance criteria constant.
5. **Decide the pilot:** prioritize current-state changes, funding, boundary,
   agent deployment, enterprise decision rights, measures and gates.
6. **Read out the package:** name owners, dependencies and the next review used
   to decide whether to stop, revise or scale.

The morning concept sequence occupies 180 facilitated minutes before lunch:
Mission briefing (30), Capacity versus leverage (45), Four paths to AI ROI (45)
and Optimize current usage (60). The afternoon's 225 facilitated minutes produce
decisions and a pilot package. Three utilities provide 75 break/lunch minutes.

## Required participant outputs

- a defined workflow, completion boundary and leverage-loss map;
- selected primary and secondary ROI paths plus the limiting factor;
- a prioritized current-state optimization canvas;
- an exploration/production/exception funding decision;
- a bounded pilot and agent-deployment canvas;
- an enterprise operating model with explicit decision rights;
- a pilot scorecard and stop/revise/fund/scale gates; and
- a final owned pilot statement:

`For workflow ___, we will test ROI path ___ through pilot ___, within boundary ___, funded by ___, governed by ___, measured using ___, and reviewed on ___ to decide whether to stop, revise, or scale.`

## Time accounting

The deck contains exactly 22 visible slides and spans 09:00-17:00:
405 facilitated + 75 break/lunch = 480 minutes. The coarse module metadata
classifies S01 and S03-S11 as 151 instruction minutes, and S01A, S02 and S12-S18
as 254 discussion/decision-work minutes. Mission, media playback, separate setup,
contingency and autonomous-transition allocations are zero.

## Source, media and delivery boundaries

`mission-control-source.md` is the governing sanitized source and
`slide-manifest.md` is the exact generated-deck contract. The two approved
Matthew Gunter videos remain authoring sources only. They are not embedded,
published, quoted at length or used to support volatile pricing, entitlement,
availability or enforcement claims.

Preserve the exact existing S01 v7 declaration and identity:
`assets/images/copilot-value-lab/mission-control-opening-team-v7.png` and its
adjacent `.png.json` sidecar. The existing official Microsoft and GitHub assets
remain native local overlays. The compatibility value
`generation.imageProvider: gpt-image-2` is inert schema metadata, not permission
to call a provider. No media generation, replacement or publication is
authorized.

All formulas, workflow chains, decision canvases, product labels, tables,
prompts and diagrams must be native Slidev/HTML. There is no fake UI, generated
typography or new visual asset. `labs: []` and `missions: []` are intentional:
the revised workshop produces leadership decisions, not a participant coding
mission.

The current generated deck remains a pending downstream implementation. Local
validation, builds and rendered review are technical evidence only. Human
teaching/content acceptance, event readiness, release, publication, deployment
and participant outcomes remain independent decisions.
