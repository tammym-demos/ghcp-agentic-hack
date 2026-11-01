---
schemaVersion: 1
kind: module
id: modernization-kickoff
title: Modernizing the Unknown with GitHub Copilot
description: >-
  Describe the service, users, business outcome, dependencies, and evidence
  needed before choosing a modernization solution.
duration: Flexible (180-minute facilitation estimate)
totalMinutes: 180
timing:
  instructionMinutes: 57
  missionMinutes: 0
  discussionMinutes: 123
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 0
  contingencyMinutes: 0
objectives:
  - >-
    Describe the service, users, business outcome, dependencies, and evidence
    needed before choosing a modernization solution.
  - >-
    Identify and prioritize modernization drivers, then compare expected
    benefit, whole-life cost, consequences, action and inaction risks, and
    alternatives to make an explicit next-investment decision.
  - >-
    Plan the human-owned work needed to delegate bounded modernization tasks to
    agents, including harness and agent/skill choices, explicit requirements,
    application-tier boundaries, safety/security controls, model portability,
    evaluation, escalation, and decisions that remain human-owned.
  - >-
    Use optional planning tools and bounded agent roles without treating
    generated artifacts, prompts, or agent agreement as proof, enforcement, or
    authority.
  - >-
    Build and evaluate the authorized slice against agreed evidence, release the
    evaluated artifact safely, and monitor service and business outcomes.
  - >-
    Use observed results and unresolved uncertainty to continue, change course,
    defer, or stop the next investment.
  - >-
    Capture six lifecycle statements and focused supporting evidence in a
    confidential, in-memory browser brief without customer or application
    identity fields.
prerequisites: []
sourceDocuments:
  - requirements.md
  - content/production/source-pack.md
  - content/production/learning-architecture.md
  - content/production/experience-plan.md
  - content/production/visual-bible.md
slides: content/modules/01-modernization-kickoff/slides.md
generation:
  expectedSlides: 31
  manifest: content/modules/01-modernization-kickoff/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: >-
    Native Warm Editorial 2D with the approved four-character team cover,
    featuring Purrmission in front of the team lineup, circular character
    portraits, full-width title rows, equal native content panels, and no
    generated text, interface, logos, or product marks.
labs: []
missions: []
assets:
  - >-
    content/modules/01-modernization-kickoff/public/images/purrmission-team-cover.png
  - >-
    content/modules/01-modernization-kickoff/public/images/workflow-team-shallow-depth-v7.png
  - content/modules/01-modernization-kickoff/public/images/microsoft-logo.png
  - content/modules/01-modernization-kickoff/public/images/persona-morgan.png
  - content/modules/01-modernization-kickoff/public/images/persona-mergewell.png
  - content/modules/01-modernization-kickoff/public/images/persona-riley.png
  - >-
    content/modules/01-modernization-kickoff/public/images/persona-purrmission.png
status: draft
---

# Modernizing the Unknown with GitHub Copilot

This module follows a repeating decision loop: understand the service, decide
whether to invest, plan and authorize one evidence-producing slice, then use
Build, Evaluate, Deploy, and Monitor evidence to choose what happens next. Goal
connects user outcomes, whole-life cost, consequences, risks, and alternatives.
Plan focuses on the human work needed before agents perform bounded
modernization tasks: choose suitable work, supply verified context, align
outputs to business and technical intent, set actual permissions and
guardrails, define acceptance and independent evidence, and retain human
authority for risk and release decisions. The same fictional COBOL
order-status scenario carries the loop.

The 180-minute estimate is provisional, not a delivery limit. Extend, pause,
or split discussion rather than omit required decisions. Plan distinguishes
harnesses, models, roles, skills, and execution environments; makes
requirements explicit; maps bounded work to application contracts; and
qualifies model changes against task-specific evidence. Multi-agent work is
limited to justified, reviewable handoffs. No live repository, agent execution,
or code lab is required. The exact 31-title contract and seven-section notes
remain authoritative.

The deck and the catalog-linked browser brief are separate artifacts. The
brief captures six lifecycle statements and focused supporting evidence without
customer/application identity fields, submission, autosave, or storage.
Customer-authorized answers stay in the open page and print through the native
browser dialog. Published examples are synthetic.

The first slide carries the workshop title and the subtitle "Agenda." Its
portrait-free "Through the loop" panel addresses your enterprise application;
the worked order-status examples remain fictional. Slide 2
is titled "Meet the Team" with no subtitle and uses the approved team portrait,
with Purrmission standing in front of the team lineup behind him. The
authorized Microsoft mark appears in a shared,
unobtrusive footer on every slide. The existing 180-minute facilitation estimate
is unchanged. The owner-selected circular portraits and native role/action
labels make responsibility visible.
The right-hand example panels follow the fictional order-status story while the
left panels retain the key topics. Story text starts at the top of each example
panel, with the selected portrait and native role/action cue at the bottom and
readable padding at both edges. Deploy discusses optional container packaging,
image identity, required controls, and data-aware recovery. The complete
accountability map and artwork provenance are in
`content/production/persona-accountability-review.md` and
`content/modules/01-modernization-kickoff/media/avatar-artwork-provenance.md`.
Visual selection does not constitute lifecycle approval. Run
`pnpm test:modernization` for the story and portrait contract.

The approved four-character cover remains unchanged on slide 2. Morgan represents sponsor
evidence; Mergewell human engineering ownership; Riley bounded nonhuman agent
work; Purrmission boundary reminders rather than enforcement.
