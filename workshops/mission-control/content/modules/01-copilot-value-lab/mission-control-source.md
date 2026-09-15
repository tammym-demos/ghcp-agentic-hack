# Mission Control: The Copilot Value Lab

**Govern the spend. Guide the work. Prove the value.**

## Source and scope

Sanitized teaching conversion of the recovered, unchanged concept, not a new
workshop architecture. Initiative `mission-control-local-review-deck`; baseline
`mc-recovered-concept-680d21c332ac-a1-placeholder-v1`. Original SHA256
`680d21c332ac9ba7f14d816cb78dabc99fd7bcd08c6165635dda610a1c00f2b4`.
Authority and private provenance remain in
`content/production/decision-log.md` (D01–D04) and
`content/production/iteration-review.md#mission-control-local-review-deck`.
The private document, reference presentation, internal links and identifying
details are not reproduced here. The bounded opening revision is initiative
`mission-control-opening-kickoff-revision`, baseline
`8cc855b9e1b1b88edb65cd648e385d15ba628620`, governed by
`content/production/decision-log.md#mc-d07-cover-labels-and-five-minute-kickoff`
and its scoped iteration preflight. It changes S01's visible title/labels,
adds S01A and reallocates five minutes from S02; all later source anchors,
instruction and clocks remain unchanged.

This is a **local review deck**, not event readiness, participant completion or
release approval. D02 approves the A1 cost-center-filter **design**, not its
implementation. D03's opening placeholder has since been replaced by the
separately accepted v7 illustration; this revision reuses it unchanged.
There is no built real dashboard, participant-account setup,
enterprise-control change or measured lab outcome established here.
No current pricing, billing calculation, cache saving or automatic enforcement
claim is established by this source.

One module objective is unchanged: connect GitHub Copilot consumption to
organizational decisions and engineering outcomes. The audience includes
engineering and business leaders, platform/GitHub administrators, builders,
security and architecture, and Finance/FinOps.

The day follows the approved arc: brief the mission → observe consumption → set
controls → test improvements → assign decision rights → measure outcomes →
commit to action. Short show → do → review cycles protect participant practice.
The six connected outputs are a usage baseline and data-gap list; a control and
exception map; an optimization experiment record and backlog; a governance
charter; a value scorecard; and an owned 30/60/90-day action plan.

## Agenda and accounting

`workshop.md` owns the exact full-day agenda. This transcription allocates the
approved blocks with the owner-selected kickoff inserted inside Mission briefing,
not an added day block or minute.

| Time | Minutes | Block | Slides |
| --- | ---: | --- | --- |
| 09:00–09:30 | 30 | Mission briefing | S01, S01A, S02 |
| 09:30–10:15 | 45 | Follow the credits | S03–S05 |
| 10:15–10:30 | 15 | Break | U01 |
| 10:30–11:30 | 60 | The evidence room | S06 |
| 11:30–12:15 | 45 | Set the guardrails | S07–S09 |
| 12:15–13:00 | 45 | Lunch | U02 |
| 13:00–14:15 | 75 | Guided hands-on optimization lab: Copilot App | S10–S13 |
| 14:15–14:30 | 15 | Break | U03 |
| 14:30–15:30 | 60 | The operating charter | S14–S15 |
| 15:30–16:15 | 45 | Prove the value | S16 |
| 16:15–16:45 | 30 | Route to results | S17 |
| 16:45–17:00 | 15 | Mission readout | S18 |

**18 existing instructional + 1 kickoff + 3 utility = 22 visible slides. 405 facilitated + 75 breaks
and lunch = 480 scheduled minutes.** Facilitated time includes participant
work, discussion and transitions, not 405 minutes of narration. The schema's
345 instruction / 45 mission / 15 discussion / 75 breaks split is a coarse
account: the separately specified 45 practice and 15 review minutes belong
to the lab; other exercises remain inside their existing agenda blocks.
The opening block is S01 09:00–09:01 (1), S01A 09:01–09:06 (5) and
S02 09:06–09:30 (24): 1 + 5 + 24 = 30. Preserve stable S01–S18 and U01–U03
IDs; S01A is the new ID, not a renumbering of S02.

Lab round 1 is S10's two-minute briefing plus S11's three-minute demonstration,
15-minute participant practice and five-minute shared review. Rounds 2 and 3
each remain five demonstration / 15 practice / five review minutes. There is no
extra pre-lab lecture. A facilitator uses an event timer; the deck has no
autonomous countdown that advances participants or shortens their windows.

## Visual and interaction contract

Use `theme: ghcp` and shared layouts, with workshop-local styling only. Use cream
paper `#fffdf7` / `#f8f1e7`, warm ink `#24211f`, muted `#625b54`, lines `#d8cfc2`,
green `#287a45` and restrained purple `#7650b7`. Font stack is Mona Sans, Segoe UI,
Arial, sans-serif; no remote font dependency is required for local review.

Standard instruction uses a full-width title and two equal panels: teaching or
action left, a meaningful native relationship right. Full-width teaching
tables, diagrams and exercises use the shared single-panel layout only where
the manifest records the reason. Dedicated shared cover, section and lab
layouts are bounded exceptions. Titles, names, prompts, code, labels, numbers,
tables and diagrams are editable HTML/SVG, never baked into an image.

S01 alone reuses the complete approved v7 quartet illustration with native teaching
names/roles beneath it, never overlaid on the art. All later
slides and utilities are character-free; no portraits, silhouettes, hands,
avatars, feline motifs, character-shaped icons or reprises. No generated logos,
fabricated UI or live telemetry.

The owner's 2026-09-13 branding request permits two separate native official
marks: Microsoft and the GitHub wordmark lockup. Use one pair on every slide,
larger on the opening and discreet in the footer elsewhere. Preserve the
supplied artwork, colors, aspect ratio and clear space; do not crop, recolor,
animate, distort or add effects. Keep the pair clear of teaching content and
presentation controls. These are brand overlays, not generated character
artwork or a co-hosting/endorsement claim. The image-generation prompt remains
logo-free. Reuse local approved files; no build/runtime brand download.
Source and owner-use records live beside the declared files in
`assets/brand/microsoft/` and `assets/brand/github/`.

Use presenter-controlled click builds to show one relationship or decision at
a time, then hold a fully readable state. Use short opacity changes, no moving
characters, autonomous video, perpetual animation or timed advance. Standard
previous/next click navigation permits replay; reduced motion removes transitions
without changing the content or click order. S07 is the representative
six-layer hierarchy. Technical rendering does not decide human teaching/look
acceptance.

The workshop-local **Read this slide** control is an accessible/mobile reading
equivalent, not an additional slide. It presents the same native content at its
complete click state in a scrollable dialog, with stacked panels and horizontally
scrollable tables where needed. It does not copy presenter notes or introduce
new instruction. Keyboard users can open it, close it and return to the slide.

<a id="s01-opening-and-cast-introduction"></a>

## S01 Mission Control: The Copilot Value Lab

09:00–09:01, one minute. Exact primary visible title: **Mission Control: The
Copilot Value Lab**. Retain the tagline **Govern the spend. Guide the work. Prove
the value.** Remove the visible “Mission briefing”/time kicker and “Opening and
cast introduction” heading; the explicit legacy source anchor above remains
stable. Keep S01's ID as non-visible contract metadata.

Budget 15 seconds for welcome/purpose, 30 seconds to introduce the fictional
teaching team and 15 seconds to move into participant introductions. These roles
are not a software architecture or the five accountable governance functions.
Exact editable labels, below the complete image in depicted left-to-right order:

| Name | Role |
| --- | --- |
| Agent Mergewell | Accountable human engineer |
| Purrmission | Boundary signal |
| Chief Charter | Organizational sponsor |
| Riley Relay | Bounded agent collaborator |

Full-name authority: repository
`workshops/ghcp-dev-hack/content/characters/agent-mergewell/character.md`
(frontmatter `title`, `# Agent Mergewell`, `## Persona`) and
`workshops/ghcp-dev-hack/content/characters/riley-relay/character.md`
(frontmatter `title`, `# Riley Relay`, `## Role boundaries`). These verify names
and human/bounded-agent distinctions, not new role text; D07 preserves the
Mission Control roles above.

Reuse only `assets/images/copilot-value-lab/mission-control-opening-team-v7.png`,
SHA256 `e05909a60b5fa2669d56e37849d29a4e6100c43ad666652f043ec5bb4aa6e8f9`,
with contain framing, no crop, pixel edits or replacement. The approved adjacent
`.png.json` records prior acceptance/publication; no new media action is implied.
Keep the authorized native brand pair separate from the illustration and labels.

## S01A Introductions and today’s agenda

09:01–09:06, five minutes. Exact visible title: **Introductions and today’s
agenda**. Stable source anchor:
`mission-control-source.md#s01a-introductions-and-todays-agenda`.
Use native two-panel content, no new artwork. This kickoff supports naming a
desired outcome and locating it in the existing day; it does not replace S02's
decision/evidence work or add a seventh workshop output.

Exact introduction-panel content:

- **Introduce yourself**
- “Share your name, role and one desired outcome for today.”
- “Pairs: one minute each. Then a few brief desired-outcome shares.”
- “Carry your desired outcome into Define the mission.”

Exact agenda-panel heading: **Today’s agenda**. Use only these existing named
day blocks, in order within compact morning/afternoon groups, with a separate
breaks/lunch line. Do not reproduce the full schedule table:

- **Morning:** Mission briefing · Follow the credits · The evidence room · Set the guardrails
- **Afternoon:** Guided hands-on optimization lab: Copilot App · The operating charter · Prove the value · Route to results · Mission readout
- **Breaks/lunch:** Break 10:15–10:30 · Lunch 12:15–13:00 · Break 14:15–14:30

Protected activity split: 09:01–09:01:30 (0.5 minute) prompt/pair setup;
09:01:30–09:03:30 (2 minutes) paired introductions, one minute each;
09:03:30–09:04:30 (1 minute) invite a few brief desired-outcome shares;
09:04:30–09:06 (1.5 minutes) orient to the agenda and transition to S02.
Total 0.5 + 2 + 1 + 1.5 = 5. Do not promise everyone a full-plenary turn.
For an odd group, a triad shares the same two-minute window; no extra time.
If nobody volunteers, retain the outcome privately and proceed without
inventing a response. The agenda is orientation, not twelve mini-lectures.

Coverage: D07 supplies name/role/desired-outcome practice; the approved agenda
above supplies orientation; S02's existing mission brief turns that outcome
into a decision, owner and evidence need. Recognition of the fictional roles
is bounded to S01; S01A and every later slide remain character-free.

## S02 Define the mission

09:06–09:30, 24 minutes. Align business questions, stakeholders, decisions,
available evidence and success criteria. Introduce the six connected outputs.
Participants state what they need to decide and what evidence would make the
answer credible. This is an alignment discussion, not a product presentation.
Use the desired outcome from S01A, without repeating participant introductions.
Activity split: 09:06–09:09 (3 minutes) brief the decision/evidence task and six
outputs; 09:09–09:21 (12 minutes) participants draft and compare mission
questions; 09:21–09:30 (9 minutes) discuss/select questions to carry forward and
transition. Total 3 + 12 + 9 = 24, replacing the former 3 + 16 + 10 = 29.
Keep unresolved owners/evidence explicit; do not presume group agreement.

Fill in the mission brief: “We need to decide ___; the decision owner is ___;
the evidence we have is ___; the evidence we still need is ___; success would
look like ___.” Carry the question into the evidence room.

## S03 Follow the credits

09:30–09:45, 15 minutes. Preserve the seven-step reference lifecycle in order:

1. **License input** contributes included capacity, with optional enterprise-funded
   additional capacity kept distinct.
2. **Enterprise pool** consolidates capacity in the **Enterprise AI Credit Pool**.
3. **Cost centers** allocate budgets, quotas and controls in the reference model.
4. **Team inheritance** carries the applicable cost-center settings.
5. **User settings** apply the assigned profile and relevant settings.
6. **Model access** follows approved categories and access profiles.
7. **FinOps oversight** monitors usage, spend, trends, anomalies, forecasts and
   optimization.

Group steps 1–3 as **Fund & allocate**, 4–6 as **Inherit & govern**, and 7 as
**Optimize**. Funding, allocation, inheritance, access and optimization are
separate concepts. This is the reviewed reference operating model, not a
universal organization migration requirement or a guarantee of product controls.
Have learners trace a usage question back to its funding and allocation owner.

## S04 What changes consumption

09:45–10:00, 15 minutes. Use a native request/context/output receipt to connect
model choice, context scope, response size, cache reuse and bounded agent
workflows to the amount and kind of work requested. Prefer one or two changes per
comparison and preserve the same task and acceptance criteria. Smaller context
is not better if it removes necessary information.

Label the receipt as an illustration, not a measured run or bill. Record only
usage evidence available in the chosen surface or approved report. Note
configuration and cache variability; token counts do not establish an exact
bill. Do not promise a saving from a single run. Fill in: “Same task ___;
same acceptance ___; lever changed ___; available usage source ___;
quality observation ___; limitation ___.”

## S05 Meet the lab environment

10:00–10:15, 15 minutes. Recommended surface: GitHub Copilot App, with a separate,
isolated participant session on the approved prepared project. The intended flow
is inspect project → provide relevant context → review plan → authorize bounded
work → inspect changes and proof → accept, revise or stop.

Use Plan and Interactive workflows for visible human checkpoints, subject to
preflight of the selected App version. Autopilot, parallel agents and automatic
merge are not prerequisites. The App is not an enterprise billing or policy
console. The synthetic dashboard is not official billing evidence.

A known-good starter, accessible project, approved setup guide, synthetic
fixtures, account/model/policy/runtime access, exact commands and expected
results must be supplied and tested before delivery. None has been built or
verified by this deck unit. After a brief orientation, participants inspect
their own approved environment; do not turn this time into an installation
session. Fill in “Starter revision ___; synthetic fixture ___; approved
session/access ___; blocker and support owner ___.”

## U01 Break

10:15–10:30, 15 minutes. Character-free break card. Return at 10:30 for the
evidence room. No added instruction or activity requirement during the break.

## S06 Open the evidence room

10:30–11:30, 60 minutes. Demonstrate a small attribution question in the prepared
synthetic usage ledger, then protect investigation time. Reuse cost-center, team,
user, access-tier, model-category and usage relationships. Trace the applicable
budget owner and the evidence FinOps would inspect. No individual productivity
rankings, production data or private tenant evidence.

The deck shows **relationship fields**, not an invented dataset, live dashboard
or measured result. The delivery starter must provide matching keys and concrete
fixture values. An aggregated organizational report, if separately approved, is
a distinct private reference and is not required lab input.

Participants produce the first artifact: “Question from S02 ___; cost center ___;
team ___; user ___; assigned tier ___; permitted model category ___; observed
usage and source ___; budget owner ___; baseline finding ___; data gap ___;
decision this could inform ___.” Carry the finding and gap into S07–S09.

## S07 Trace the guardrails

11:30–11:45, 15 minutes. Preserve the six-layer hierarchy:

1. One enterprise organization in the reference scenario.
2. Enterprise guardrails: policies/standards, approved model catalog, user
   tiers/access, security/compliance and monitoring/reporting.
3. One shared **Enterprise AI Credit Pool**, distinguishing included license
   credits from optional enterprise-funded additional capacity.
4. Departmental cost centers with budget and showback ownership.
5. Teams inheriting the applicable cost-center controls.
6. Users inheriting access through their assigned tier.

Use the S06 finding. Trace a synthetic user upward to a budget owner and back down
to the permitted category. Fill in the chain and mark missing evidence.
**Operating model ≠ product enforcement.** Confirm exact scope for inheritance,
model access, allocations, token quotas and evaluation expiry before any
administration demonstration. No production settings are changed.

## S08 Three access profiles

11:45–12:00, 15 minutes. Preserve these organizational profiles; they are not
GitHub Copilot subscription-plan names:

- **Standard Users:** baseline standard-model access; default AI credit
  allocation and the reference's standard token quota.
- **Power Users:** standard and approved premium models; increased AI credit
  allocation and a higher token quota. Justify breadth by role/workflow needs.
- **R&D / Experimental Users:** broadest reference profile including experimental
  models and the highest credit allocation, **time-boxed for evaluation and innovation**.
  Broader access is not an exemption from governance or unlimited spending.

Use qualitative baseline, expanded and time-boxed labels. Do not convert relative
access breadth into budget shares, guaranteed quotas, product entitlements or
available enforcement. Participants write “Workflow need ___; profile ___;
permitted category ___; constraint ___; review/expiry ___.”

## S09 Make an exception decision

12:00–12:15, 15 minutes. Reuse the synthetic attribution case to consider a request
for broader/time-boxed model access or a budget exception. Produce the control
and exception map: “Request and reason ___; owner ___; permitted category ___;
allocation/quota assumptions ___; threshold ___; time box ___; alert recipient ___;
verified enforced stop, if supported ___; exception approver ___;
security/compliance reviewer ___; escalation ___; decision ___; review date ___.”

Distinguish an **alert** that informs an owner from a **supported enforced stop**
that actually blocks an action. Neither is implemented by a worksheet or by the
App lab. Any read-only admin walkthrough is a separate, delivery-specific
verification prerequisite; no exact setting screen is asserted here. Use
accept/revise/stop with justification, not unbounded approval by default.

## U02 Lunch

12:15–13:00, 45 minutes. Character-free lunch card. Return at 13:00 for the guided
lab. No homework, installation task or added demonstration during lunch.

## S10 Lab mission

13:00–13:02, two minutes. A1 is the **approved design** for adding a cost-center
filter to a small prepared synthetic usage dashboard. It is not a built sample.
Use cost-center, team, access-tier, model-category and usage relationships so the
governance exercises and App practice share one case.

Acceptance is unchanged: selected totals match the synthetic fixtures; clearing
the cost-center filter restores the prior all-cost-center view **without changing
other criteria**; no-match behavior is clear; existing views still work; targeted
tests provide evidence. Exclude a whole dashboard rewrite, new enterprise
enforcement, billing changes, production data and unrelated features.

Two minutes here plus three on S11 share round 1's five-minute demonstration.
Each participant directs work and inspects proof in an isolated session.
The learner's evidence, not an attractive preview or a demonstration watched,
supports accept/revise/stop.

## S11 Scope and plan

13:02–13:25, 23 minutes: three minutes demonstration, 15 practice, five review.
Consume the S06 attribution finding and S09 control boundary, alongside the
prepared starter and fixtures. Open the approved project in an isolated App
session, inspect relevant files/data, then submit the planning prompt. No edits
are authorized by this round. Actual App mechanics must be preflighted.

The draft planning prompt is preserved **exactly**:

> Inspect this sample dashboard and propose a plan for a cost-center filter. Selected totals must match the synthetic dataset; clearing the cost-center selection must restore the prior all-cost-center view without changing other criteria; no-match cases must be clear. Identify the relevant files, targeted tests, and open questions. Do not edit yet.

Participants inspect their proposed files, targeted tests, open questions,
excluded changes and acceptance criteria before sharing the checkpoint. Produce
the scoped plan: “Relevant files ___; selected fixture and expected totals ___;
clear behavior/other criteria ___; no-match proof ___; regression checks ___;
open questions ___; scope agreed ___.”

No-penalty hints, used progressively: first compare the proposal with A1's
acceptance list; next locate the data and the existing filtering path; finally
ask the facilitator to help trace one fixture through the starter before
resubmitting a bounded plan. Help never takes time from another learner's
15-minute practice window.

## S12 Implement within bounds

13:25–13:50, 25 minutes: five demonstration, 15 practice, five review. Consume the
reviewed S11 plan. Participants authorize only the agreed change in their own
session, inspect the changed-file list, run the prepared targeted checks and
compare results with fixture-based expectations. A plan is not blanket permission.

The private concept's generic implementation/review checkpoint is preserved
exactly (it supplies no separate copy-ready implementation or verification prompt):

> Each participant reviews the plan and authorizes only the agreed change, then inspects the changed-file list, targeted test results, preview behavior, and unresolved risks. Participants record accept, revise, or stop from their own evidence before the group debrief. Prompt wording expresses intent; actual permissions, approval mechanisms, and organizational policy remain separate controls.

Produce implementation/check evidence: “Authorized scope ___; changed files ___;
targeted command ___; expected result ___; actual result ___; unexpected change or
failure ___; unresolved risk ___; checkpoint used, if any ___.”

No-penalty hints: first compare changed files with the agreed plan; next inspect
one failing fixture/assertion rather than widening the task; then use the
facilitator's rehearsed, known-good catch-up checkpoint and record what remains
unverified. The checkpoint does not do all participant work on their behalf.
Concrete test commands and checkpoints must be supplied before delivery, not
invented in the deck.

## S13 Verify and judge

13:50–14:15, 25 minutes: five demonstration, 15 practice, five review. Consume the
S12 changed-file/test record. Each participant inspects the diff and results,
previews the bounded behavior, and checks selected totals, clearing while
preserving other criteria, clear no-match behavior and unchanged existing views.
Use the exact fixture expectations and concrete test commands from the prepared
starter; none is claimed to have run here.

Produce the optimization experiment record and backlog: “Selected total expected
___ / actual ___; clear behavior ___; no-match behavior ___; existing views ___;
targeted checks ___; usage evidence actually available ___; accept/revise/stop ___;
quality or value observation ___; limitation ___; follow-up ___.”

No-penalty hints: compare one selected total with its fixture; then compare the
clear action with the same other criteria still set; finally ask for the
rehearsed checkpoint and record any missing test or unavailable access. No result
is presumed, and lower credits or one run do not prove ROI.

Protect the complete 15-minute practice window in every round. Review before
advancing. Prefer individual work; if approved pairing is necessary, rotate the
operator so everyone uses the tools. Give early finishers optional inspection of
one remaining limitation without shortening others' time. If access or an outage
blocks practice, record the gap and arrange supported completion. A recording or
observer-only fallback does not satisfy hands-on completion.

## U03 Break

14:15–14:30, 15 minutes. Character-free break card. Return at 14:30 for the operating
charter. No new instruction or required lab repair during the break.

## S14 Five accountable functions

14:30–14:50, 20 minutes. Use five distinct functions, not four teaching characters:

| Function | Reference accountability |
| --- | --- |
| Platform Governance | Policies, approved model catalog, tiers, enterprise controls, governance reporting |
| Finance | Budgets, funding, licensing, chargeback strategy |
| FinOps | Consumption, trends, anomalies, forecasts, optimization opportunities |
| Engineering Leadership | Classify users, justify premium access, guide adoption |
| Developers | Work within approved models, limits and policies |

Participants map actual delivery stakeholders or explicitly unresolved role
placeholders to those functions. Keep Finance funding/accountability distinct
from FinOps monitoring/optimization. Name security/compliance reviewers, exception
approvers and escalation owners; do not infer them from platform permissions.
These assignments begin the governance charter.

## S15 Exercise the charter

14:50–15:30, 40 minutes. Reuse the earlier synthetic exception. Add a tier-change
or time-boxed R&D evaluation case; compare assignments across groups so the
budget, tier and evaluation requests are all considered. Use S09's control map
and S14's functions, not a new permission framework.

Complete a native request workflow: “Request ___; evidence/reason ___;
recommends ___; funds ___; approves policy/access ___; reviews security/compliance
___; monitors ___; handles expiry ___; escalation owner ___; decision ___;
review date ___.” Identify missing owners and dependencies before readout.
The charter is a workshop decision artifact, not an executed enterprise control.

## S16 Prove the value

15:30–16:15, 45 minutes. Build the scorecard across **adoption, delivery, quality,
capacity and financial** measures. Connect FinOps usage/spend observations to
engineering and business outcomes. Activity, wider model access, or lower credits
alone are not proof of ROI.

For each category fill in “Measure ___; baseline ___; evidence source ___;
owner ___; cadence ___; decision this changes ___.” Consume the baseline,
lab observations/limitations and charter. Check comparability and missing
evidence. Do not calculate a return from invented prices, an unbuilt starter or
one unrepresentative run.

## S17 Route to results

16:15–16:45, 30 minutes. Turn the baseline, control map, lab record, charter and
scorecard into an owned **30/60/90-day** plan. Reveal three checkpoints
progressively, then hold the complete map. These numbers are day offsets, not
profile breadth, budgets or quotas.

At each checkpoint write “Action ___; accountable owner ___; dependency ___;
expected evidence ___; review date ___; decision ___.” Challenge missing owners,
unmeasurable outcomes and actions that depend on unverified access or controls.
An action plan is not a promise that its benefit has occurred.

## S18 Mission readout

16:45–17:00, 15 minutes. Use a native decision board: **agreed / needs evidence /
owner and date**. Each group states the most important next action and the
evidence that would show progress. Confirm unresolved questions, accountable
owners and next review dates without inventing agreement.

Readout sentence: “Our next action is ___; we will look for ___; ___ owns the
review on ___.” Close in the warm editorial world without character reprise.

## Delivery prerequisites and acceptance boundary

Still required before an event: an approved App setup guide and accessible
sample repository; a working known-good dashboard starter and synthetic fixtures;
verified participant account, organization policy, model and runtime access;
concrete commands/expected test results; accessible catch-up checkpoints;
facilitator rehearsal and participant support; verified environment-specific
read-only administration claims; accessible/reduced-motion alternatives and
human lab review. All are prerequisites, not completed work.

Local validation, a production-shaped build and browser screenshots establish
only technical evidence for review. Human look/teaching acceptance, finished-deck
acceptance, lab/event readiness and further media/publication decisions remain
independent of prior exact-v7 acceptance. No paid work, real controls, participant outcomes, push or release
is authorized or claimed by this implementation.
