---
schemaVersion: 1
kind: module
id: agentic
title: Agentic Development
description: >-
  Help developers prepare agentic work, control tools and iterative repository
  loops, delegate to cloud agents, and make evidence-based pull-request
  decisions.
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
    Apply instructions, memory boundaries, context hierarchy, and strong prompts
    to long-running agentic work
  - >-
    Explain the different jobs of the developer, a software agent, a reusable
    skill, a custom agent, and a tool
  - >-
    Operate an observable agentic loop with deliberate planning, tool control
    points, progress checks, stop decisions, and recovery
  - >-
    Use GitHub Enterprise Cloud repository state, GitHub Actions, pull requests,
    and cloud-agent handoffs as connected workflow evidence
  - >-
    Distinguish GitHub Code Quality, Copilot code review, and cloud-agent work,
    then retain human authority over acceptance and merge
  - >-
    Choose a supported product control before an agentic task and verify
    afterward whether the result justified the AI credits used
prerequisites:
  - Foundations module
sourceDocuments:
  - content/modules/02-agentic/context-caching-source.md
  - content/modules/02-agentic/opening-slides-concept.md
  - content/modules/02-agentic/visual-intent.md
  - content/research/agentic-content-verification.md
  - content/modules/02-agentic/key-topics.md
  - content/modules/02-agentic/copilot-dev-agentic-workshop.md
  - content/missions/agentic/agent-task.md
slides: content/modules/02-agentic/slides.md
generation:
  expectedSlides: 29
  manifest: content/modules/02-agentic/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: >-
    Native-first warm editorial Agent Mergewell world. Twelve approved static
    character-world images and one approved native animation are integrated on
    their approved slides with contained rendering and native Slidev overlays;
    the opening temporarily reuses the declared approval-boundary image until
    the separately governed original title scene is accepted and promoted.
    Render labels, code, commands, product UI, findings, and evidence as native
    Slidev or HTML; no generated text, code, product UI, labels, logos, GitHub
    mascots or other unapproved media.
labs: []
missions:
  - content/missions/agentic/agent-task.md
assets:
  - assets/brand/github/GitHub_Lockup_Black_Clearspace.svg
  - assets/brand/microsoft/microsoft-logo.png
  - assets/images/agentic/human-directed-operating-split.png
  - assets/images/agentic/instruction-conflict-human-resolution.png
  - assets/images/agentic/custom-agent-specialist-role.png
  - assets/images/agentic/tool-action-workbench.png
  - assets/images/agentic/plan-before-action-route.png
  - assets/images/agentic/approval-boundary-human-decision.png
  - assets/images/agentic/evidence-human-verification.png
  - assets/images/agentic/pull-request-evidence-handoff.png
  - assets/images/agentic/cloud-agent-parallel-handoff.png
  - assets/images/agentic/cloud-agent-bounded-brief.png
  - assets/images/agentic/mobile-cloud-agent-oversight.png
  - assets/images/agentic/cost-conscious-preflight-controls.png
  - assets/images/agentic/evidence-streams-human-acceptance.png
status: review
---

# Agentic Development

## Current 29-slide generation contract

`slide-manifest.md` owns exact titles, order and minutes; `visual-intent.md`
and `context-caching-source.md` implement the approved G contract as amended by
`contract-agentic-remove-e3-2026-09-14` and
`contract-agentic-remove-t8-2026-09-14` and
`contract-agentic-loop-intro-2026-09-14` in `production/decision-log.md`.
Old A13/E3 is removed with its three minutes; E3 remains inactive reusable
source, not a slide. Tools12 now leads to What Is an Agentic Loop? at A13
(2 minutes), then the unchanged animated The Agentic Loop at A14 (4 minutes).
T8 at former A26 is removed with its three minutes; Agentic Optimization
at A26 leads directly to Code Quality, Copilot Review, and Human Acceptance
at A27. T8 source, component and artwork remain inactive/reusable.
All 28 prior identities, titles, relative order and allocations remain.
Earlier 25/27/28/29/30-slide contracts are historical.

Slides 1–27 provide 77 instruction minutes:
`(3 × 1) + (4 × 2) + (6 × 4) + (14 × 3) = 77`.
The contiguous agenda groups are `3 + 16 + 9 + 49 = 77`.
Slide 28 is the zero-minute `Demo!`; slide 29 is the separate 45-minute
mission. Total: `77 + 0 + 45 = 122`. No extra playback or discussion time.

Whole-module integration acceptance remains independent. Actual module
metadata allocates Foundations 77 + 45 = 122, Agentic 77 + 45 = 122 and
Advanced 60 + 30 = 90 minutes. With setup 15 and breaks 75, workshop timing
is 424 minutes, including 214 instruction minutes; second day remains 420.
Older Foundations 22-slide/64-minute and proposed-27 wording is historical,
not current timing authority or evidence that a participant was taught it.

## Teaching and role boundaries

- Agent Mergewell is the accountable human developer, not a software agent.
  He defines the brief and boundaries, reviews evidence, and owns acceptance
  and merge.
- A software-agent collaborator performs delegated work. A reusable skill is
  reviewed instructions, scripts, and resources; a custom agent is a recurring
  role profile; a tool performs a concrete action.
- Purrmission marks only consequential permission, security, high-autonomy,
  rollback, mission-safety, and final-acceptance boundaries.
- The observable loop includes planning, action, evidence, adjustment, stopping,
  and recovery without claiming hidden reasoning or universal product controls.
- GitHub Actions, repository security controls, GitHub Code Quality, GitHub
  Copilot code review, and GitHub Copilot cloud agent remain distinct.

## Source and product boundaries

All volatile behavior follows
`content/research/agentic-content-verification.md`. Security uses only
AGT-32–AGT-38: `/security-review` is a focused review of active changes, while
push protection, configured code scanning, and applicable dependency review
are separate controls whose findings require human validation. GitHub Mobile
uses only AGT-39–AGT-46:
`start or assign → track status → review diff → iterate → review pull request`.
Clarification responses, unsupported exact controls or status labels, complete
session-interface claims, and automatic review or acceptance claims are
excluded; Copilot code review is a separate eligible action.

T8 product-control teaching and its CREDIT/SRC dependency are inactive
reusable history in `context-caching-source.md` and
`content/research/agentic-ai-credit-optimization.md`, not active slide coverage.
The existing product-control objective remains referenced by the unchanged
mission; removing T8 does not remove or rewrite mission practice.
Retained Agentic Optimization remains workflow practice without a fixed-saving
promise. Exact text, commands, labels, diagrams, and evidence remain native.

## Mission boundary

Slide 29 points to the separate `Your Mission: Hand Off Work with Confidence`
mission and
does not duplicate its instructions. The mission now consumes the exported
Foundations case file or the facilitator starter for legitimate catch-up,
keeps the work within participant-named content and supplies a no-runtime
starter checklist, reuses the
50-core / 40-to-complete / 10-bonus-cap scoring envelope with no hint penalty
or speed scoring, and exports separate Foundations, Agentic, and cumulative
totals for Advanced through `content/missions/agentic/agent-task.md`.

## Production boundary

All 13 approved static images declared above remain protected and portable.
Removed T8 leaves `cost-conscious-preflight-controls.png` unplaced without modifying or deleting
the original, sidecar or public copy. The other 12 remain on shifted slides
3, 8, 11, 12, 15–17, 21–24 and 27 through contained module-public paths.
Slide 1
temporarily reuses the already declared
`approval-boundary-human-decision.png` contained and unmodified; it is a
governed fallback and does not imply approval, promotion, or availability of
the new original title scene. Slide 13 is native text only. Slide 14 uses the approved deterministic native
animation. The module-local stylesheet reproduces the owner-approved deck
without changing the shared theme. The approved concept authorizes the new
prompt and bounded paid-action packet only; it authorizes no generated pixels,
candidates, promotion, publication, release, or shared-theme changes.
