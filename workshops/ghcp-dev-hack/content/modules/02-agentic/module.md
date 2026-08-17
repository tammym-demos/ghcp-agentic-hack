---
schemaVersion: 1
kind: module
id: agentic
title: Agentic Development
description: >-
  Help developers prepare agentic work, control tools and iterative repository
  loops, delegate to cloud agents, and make evidence-based pull-request
  decisions.
duration: 2 hours
totalMinutes: 120
timing:
  instructionMinutes: 75
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
  - content/modules/02-agentic/opening-slides-concept.md
  - content/modules/02-agentic/visual-intent.md
  - content/research/agentic-content-verification.md
  - content/research/agentic-ai-credit-optimization.md
  - content/modules/02-agentic/key-topics.md
  - content/modules/02-agentic/copilot-dev-agentic-workshop.md
  - content/missions/agentic/agent-task.md
slides: content/modules/02-agentic/slides.md
generation:
  expectedSlides: 27
  manifest: content/modules/02-agentic/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: >-
    Native-first warm editorial Agent Mergewell world. Thirteen approved static
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
status: draft
---

# Agentic Development

## Current 27-slide generation contract

`content/modules/02-agentic/visual-intent.md` is the current slide authority.
The generated deck contains exactly 27 slides in its numbered order: two new
one-minute opening slides, the preserved one-minute operating-split cover,
23 additional instructional slides, and one separate 45-minute mission
briefing. The exact 27-slide count, title, and order remain the human-approved
`agentic-opening-slides-2026-08-13` revision; the opening allocations are the
approved timing correction for
`ghcp-dev-hack-speaker-notes-talk-track-2026-08-17`. Unrelated earlier 27-,
28-, or 29-slide versions remain historical production context only.

Slides 1–26 provide 75 minutes of instruction. Slides 1–3 receive one minute
each; adjacent slides 4–6 receive two minutes each. Slides 7, 12, 14, 17, 22,
and 26 receive four minutes each because they carry a layered conflict, loop,
consequential approval, security lifecycle, Mobile lifecycle, or final
acceptance decision. The remaining 14 instructional slides receive three
minutes each:
`(3 × 1) + (3 × 2) + (6 × 4) + (14 × 3) = 75`. Slide 27 is the separate
45-minute mission, so `75 + 45 = 120`.

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

The AI-credit treatment follows the approved CREDIT and SRC mappings in
`agentic-ai-credit-optimization.md`. It distinguishes documented product
controls from workflow practices and promises no fixed saving. Exact text,
commands, labels, diagrams, and evidence remain native Slidev content.

## Mission boundary

Slide 27 points to the separate `Your Mission: Hand Off Work with Confidence`
mission and
does not duplicate its instructions. The mission now consumes the exported
Foundations case file or the facilitator starter for legitimate catch-up,
keeps the work within participant-named content and supplies a no-runtime
starter checklist, reuses the
50-core / 40-to-complete / 10-bonus-cap scoring envelope with no hint penalty
or speed scoring, and exports separate Foundations, Agentic, and cumulative
totals for Advanced through `content/missions/agentic/agent-task.md`.

## Production boundary

The 13 approved static images declared above remain promoted, portable, and
integrated on shifted slides 3, 7, 10, 11, 13-15, 19-22, 25, and 26 through
contained module-public paths with native labels and evidence. Slide 1
temporarily reuses the already declared
`approval-boundary-human-decision.png` contained and unmodified; it is a
governed fallback and does not imply approval, promotion, or availability of
the new original title scene. Slide 12 uses the approved deterministic native
animation. The module-local stylesheet reproduces the owner-approved deck
without changing the shared theme. The approved concept authorizes the new
prompt and bounded paid-action packet only; it authorizes no generated pixels,
candidates, promotion, publication, release, or shared-theme changes.
