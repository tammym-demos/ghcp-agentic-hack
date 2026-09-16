# Mission Control: The Copilot Value

**Govern the spend. Guide the work. Prove the value.**

## Source authority and claim boundary

This sanitized module source implements initiative
`mission-control-value-decision-workshop-revision` against baseline commit
`91f168060327dd773c96de199921a4e35081bf8c` and Mission Control tree
`0d9aaf1e205709090517b3e938660484fd6054ed`. Its approved scope, exact
slide contract and content direction are recorded in
`content/production/decision-log.md#mc-vdw-d01-scope`,
`content/production/decision-log.md#mc-vdw-d02-contract` and
`content/production/decision-log.md#mc-vdw-d03-content`.

The two approved Matthew Gunter videos informed the morning concept sequence.
They remain authoring sources only: do not embed, publish, link, reproduce or
quote them in the participant deck. This source uses the owner-approved concept
synthesis rather than making claims about the videos. It makes no volatile
pricing, entitlement, model-availability, enforcement or product-roadmap claim.
Any future current-product claim requires separate provenance and approval.

The participant-visible objective is to connect GitHub Copilot consumption to
organizational decisions and engineering outcomes. Capacity and activity are not
treated as value by themselves. Participants use a workflow, evidence and
decision canvases to produce a bounded pilot package.

## Audience, prerequisites and outcomes

**Audience:** architects; engineering and business leaders; developer-platform
and GitHub administrators; security and compliance leaders; and Finance/FinOps
partners.

**Prerequisites:** familiarity with one organizational engineering workflow and
its intended business outcome. Available baseline evidence is useful but not
required. No Copilot App session, coding environment, starter repository,
synthetic fixture or product-administration access is required.

By the end of the day, participants can:

1. distinguish attempted or delegated capacity from developer leverage;
2. map the completion boundary and constraints that separate code activity from
   business outcomes;
3. select primary and secondary AI ROI paths and name the limiting factor;
4. apply a controlled optimization method and prioritize a current-state change;
5. define pilot boundaries, funding, decision rights, measures and gates; and
6. present an owned pilot package with dependencies and a next review date.

## Governing concepts and terminology

Use these statements consistently across instruction, practice and notes:

- **Developer leverage = completed work / developer hours.**
- Attempted work, delegated work, generated output, token usage and other
  activity measures may describe capacity or consumption; they are not leverage
  unless work crosses an agreed completion boundary.
- Completion extends through **code -> PR -> story -> release -> business
  outcome**. Constraints accumulate across that chain.
- The four AI ROI paths are **labor efficiency**, **higher throughput**,
  **expanded ownership** and **compounding capability**.
- The limiting factors are exactly **essential human work**, **process
  structure**, **practical ownership scope**, and **organizational
  learning/adaptability**.
- The optimization method is exactly: **baseline current pattern -> change one meaningful lever -> hold task and acceptance criteria constant -> compare completion, intervention, quality, time and cost -> keep, revise or stop**.
- Separate fixed licenses from variable usage. Distinguish exploration,
  production and exception funding. Prefer forecasts, notifications and review
  thresholds before hard stops. Expand funding only when reliability and
  leverage are demonstrated.

“Completed work” means work that reaches the boundary selected for the
experiment; participants must name that boundary. “Accepted outcome” means an
outcome that satisfies the held acceptance criteria and applicable human,
quality, risk and compliance checks. These definitions prevent generated output
or attempted tasks from being counted as completed value.

## Exact agenda and accounting

| Time | Minutes | Approved block | Slides |
| --- | ---: | --- | --- |
| 09:00-09:30 | 30 | Mission briefing | S01, S01A, S02 |
| 09:30-10:15 | 45 | Capacity versus leverage | S03-S05 |
| 10:15-10:30 | 15 | Break | U01 |
| 10:30-11:15 | 45 | Four paths to AI ROI | S06-S08 |
| 11:15-12:15 | 60 | Optimize current usage: guided examples | S09-S11 |
| 12:15-13:00 | 45 | Lunch | U02 |
| 13:00-13:45 | 45 | Current-state optimization discussion | S12 |
| 13:45-14:15 | 30 | Investment and budget decisions | S13 |
| 14:15-14:30 | 15 | Break | U03 |
| 14:30-15:15 | 45 | Pilot boundary and agent deployment | S14 |
| 15:15-16:00 | 45 | Enterprise orchestration and production operating model | S15 |
| 16:00-16:40 | 40 | Pilot scorecard and funding decision | S16, S17 |
| 16:40-17:00 | 20 | Pilot decision and readout | S18 |

Facilitated arithmetic:
30 + 45 + 45 + 60 + 45 + 30 + 45 + 45 + 40 + 20 = **405**.
Break/lunch arithmetic: 15 + 45 + 15 = **75**.
Elapsed arithmetic: 405 + 75 = **480 minutes**, exactly 09:00-17:00.

The morning contains 180 facilitated minutes. Capacity-versus-leverage and
Matthew-informed ROI concepts occupy two complete 45-minute blocks, followed by
60 minutes of explicit guided optimization. The afternoon contains 225
facilitated minutes and produces decisions rather than a hands-on application
lab.

## Visual, interaction and media contract

Keep the current warm editorial Slidev treatment and use native HTML/SVG for
titles, labels, formulas, workflow chains, tables, prompts, canvases and
diagrams. Do not fabricate product UI, bake generated typography into images or
add a new visual asset.

S01 alone reuses the exact approved illustration
`assets/images/copilot-value-lab/mission-control-opening-team-v7.png`, SHA256
`e05909a60b5fa2669d56e37849d29a4e6100c43ad666652f043ec5bb4aa6e8f9`,
with contain framing, no crop, pixel edit, replacement or new generation. Its
approved adjacent `.png.json` sidecar remains the identity and provenance
record. Preserve the existing separate local Microsoft and GitHub brand pair.
All later slides and utilities remain character-free and use no image, video,
iframe or generated media.

Presenter-controlled native builds may reveal relationships or decision steps.
Every build must finish in a fully readable hold and have a reduced-motion
equivalent. Do not use autoplay, autonomous timing or perpetual motion.

<a id="s01-opening-and-cast-introduction"></a>

## S01 Mission Control: The Copilot Value

**09:00-09:01, 1 minute.**

Welcome participants and state the decision-workshop purpose: connect Copilot
consumption to organizational decisions and engineering outcomes. Retain the
exact native title, tagline, approved v7 illustration, four native labels and
local brand treatment already approved for S01. Do not change the illustration
or create an additional opening visual.

Preserve these exact native labels beneath the complete image, in depicted
left-to-right order:

| Name | Role |
| --- | --- |
| Agent Mergewell | Accountable human engineer |
| Purrmission | Boundary signal |
| Chief Charter | Organizational sponsor |
| Riley Relay | Bounded agent collaborator |

Instruction/practice split: 1 minute welcome and purpose.

Output: readiness to name the workflow and decision that matter today.

## S01A Introductions and today's agenda

**09:01-09:06, 5 minutes.**

Ask participants to share their name, role and one desired decision or outcome
for the day. Orient them to the morning concept blocks and the afternoon pilot
package. Make clear that the day is an interactive leadership workshop, not a
hands-on Copilot App lab.

Use this compact agenda language:

- **Morning:** Mission briefing; Capacity versus leverage; Four paths to AI ROI;
  Optimize current usage: guided examples.
- **Afternoon:** Current-state optimization; investment and budget; bounded
  pilot and agent deployment; enterprise operating model; scorecard, funding
  decision and pilot readout.
- **Breaks/lunch:** 10:15 break; 12:15 lunch; 14:15 break.

Instruction/practice split: 1 minute prompt and orientation; 3 minutes paired or
table introductions; 1 minute transition. If the group is large, do not promise
a full-room introduction from every participant.

Output: one desired decision or outcome to carry into S02.

## S02 Define the mission

**09:06-09:30, 24 minutes.**

Participants choose one workflow and define the organizational decision the day
must support. They name the current completion boundary, business outcome,
decision owner, available evidence and missing evidence. Do not presume
agreement or require invented baseline values.

Native mission brief:

> For workflow ___, the business outcome is ___; completed currently means ___;
> the decision we need to make is ___; the decision owner is ___; evidence
> available is ___; evidence missing is ___.

Instruction/practice split: 4 minutes frame the task; 12 minutes draft and
compare briefs; 8 minutes select the workflow and preserve unresolved evidence
or owner gaps.

Output: one mission brief used throughout the day.

## S03 Capacity is not leverage

**09:30-09:45, 15 minutes.**

Show the distinction among attempted work, delegated work and completed work.
More attempts, generations or delegated tasks can increase apparent capacity or
activity without increasing accepted outcomes.

Display the native formula exactly:

> **Developer leverage = completed work / developer hours**

The denominator is developer hours, not AI activity. The numerator is work that
crosses the completion boundary defined in S02. Do not claim that a particular
tool, model or usage level raises leverage.

Instruction/practice split: 5 minutes teach the distinction; 6 minutes classify
example measures as capacity/activity or leverage evidence; 4 minutes discuss
what “completed” must mean for the selected workflow.

Output: an agreed completion definition and one measure that must not be
mistaken for leverage.

## S04 Define the completion boundary

**09:45-10:00, 15 minutes.**

Use one native left-to-right chain:

> **code -> PR -> story -> release -> business outcome**

Explain that constraints accumulate as work moves across the chain. A local
coding gain can disappear in review, integration, testing, coordination or
release. Participants select the boundary appropriate to their pilot and state
what evidence proves that the work crossed it.

Instruction/practice split: 5 minutes explain the chain and accumulating
constraints; 6 minutes mark the current and desired completion boundaries;
4 minutes compare the evidence needed at each boundary.

Output: a selected completion boundary and its acceptance evidence.

## S05 Find where leverage is lost

**10:00-10:15, 15 minutes.**

Facilitate a customer discussion across these exact leverage-loss areas:
**integration, testing, review, dependencies, risk/compliance, coordination and
waiting**. Ask where generated or delegated work queues, returns for rework or
stops before the S04 boundary. Keep the discussion tied to the selected
workflow; do not generalize a participant example into a product claim.

Instruction/practice split: 2 minutes frame the seven areas; 9 minutes map the
customer workflow and discuss the dominant loss points; 4 minutes select one
constraint to carry forward.

Output: a leverage-loss map with one prioritized constraint and an evidence gap.

## U01 Break

**10:15-10:30, 15 minutes.**

Character-free utility. Release the room for the full break and show a 10:30
return time. No instruction, homework or required discussion.

## S06 Four paths to AI ROI

**10:30-10:45, 15 minutes.**

Introduce the four paths as distinct ways a workflow may create value:

1. **Labor efficiency:** less developer effort for the same accepted outcome.
2. **Higher throughput:** more accepted outcomes through the same bounded system.
3. **Expanded ownership:** a practical increase in what a person or team can
   responsibly complete.
4. **Compounding capability:** reusable organizational learning, patterns,
   evaluation or operating capability that improves later work.

The paths are decision hypotheses, not guaranteed outcomes. More activity or
consumption does not establish any path.

Instruction/practice split: 6 minutes explain the four paths; 5 minutes map
examples to paths; 4 minutes discuss overlaps and evidence needs.

Output: a shared four-path vocabulary.

## S07 Match the path to the outcome

**10:45-11:00, 15 minutes.**

Participants select one **primary** and one **secondary** ROI path for the S02
workflow. The primary path determines the dominant outcome and scorecard
emphasis; the secondary path records a plausible additional effect without
double-counting it.

Native selection prompt:

> Business outcome ___; primary ROI path ___ because ___; secondary ROI path ___
> because ___; evidence that would distinguish them ___.

Instruction/practice split: 3 minutes frame primary versus secondary; 8 minutes
select and justify; 4 minutes challenge whether the chosen evidence reflects an
accepted outcome.

Output: primary and secondary ROI paths with evidence rationale.

## S08 Name the limiting factor

**11:00-11:15, 15 minutes.**

Use exactly these four limiting factors:

1. **essential human work**
2. **process structure**
3. **practical ownership scope**
4. **organizational learning/adaptability**

Participants identify which factor currently constrains the selected ROI path
and which evidence would show that the constraint moved. A limiting factor is a
testable diagnosis, not a reason to remove necessary human or governance work.

Instruction/practice split: 4 minutes define the factors; 7 minutes diagnose the
workflow; 4 minutes compare diagnoses and record uncertainty.

Output: one primary limiting factor, rationale and evidence need.

## S09 Select the model for the work

**11:15-11:35, 20 minutes.**

Guide model selection using **task complexity, required context, risk,
validation effort and expected value**. Compare models only within the
organization's approved and available choices at delivery time. Do not name
volatile prices, multipliers, entitlements, quotas, model availability or
enforcement behavior.

Native decision sequence:

> Task ___; complexity ___; context needed ___; risk ___; validation required
> ___; expected value ___; approved model choice ___; reason to revisit ___.

Instruction/practice split: 6 minutes explain the criteria; 10 minutes compare
guided examples; 4 minutes debrief how validation and expected value affect the
choice.

Output: a model-selection rationale that can be reviewed without a pricing
claim.

## S10 Find high-consumption workflow patterns

**11:35-11:55, 20 minutes.**

Use guided examples to identify these patterns:

- oversized/irrelevant context;
- retries;
- unclear acceptance;
- broad agent scope;
- unnecessary output;
- review queues; and
- abandoned work.

Consumption is a diagnostic signal, not proof of waste. Participants connect
each pattern to the completion boundary, limiting factor and evidence needed
before changing it.

Instruction/practice split: 5 minutes introduce the patterns; 10 minutes
diagnose examples; 5 minutes compare which pattern is material and controllable.

Output: one high-consumption pattern, its likely leverage effect and an evidence
limitation.

## S11 Control the budget and test the change

**11:55-12:15, 20 minutes.**

Use a control ladder in this order: **forecast, notification, review threshold,
time-boxed exception, supported enforced stop**. Distinguish an alert that
informs an owner from a supported enforced stop that blocks an action. Do not
imply that every product surface supports every control.

Apply the optimization method exactly:

> **baseline current pattern -> change one meaningful lever -> hold task and acceptance criteria constant -> compare completion, intervention, quality, time and cost -> keep, revise or stop**

Use baseline/change/evidence/keep-revise-stop as the visible experiment frame.
One run, lower usage or lower cost does not establish a better outcome.

Instruction/practice split: 5 minutes explain the control ladder and method;
10 minutes construct a guided comparison; 5 minutes test whether the evidence
supports keep, revise or stop.

Output: a controlled optimization experiment frame to use after lunch.

## U02 Lunch

**12:15-13:00, 45 minutes.**

Character-free utility. Release the room for the full lunch and show a 13:00
return time. No instruction, installation or required task.

## S12 Prioritize current-state optimization changes

**13:00-13:45, 45 minutes.**

Facilitate the current-state optimization discussion using a native canvas
with these exact fields:

| Field | Decision prompt |
| --- | --- |
| Current pattern | What happens now, without judging it? |
| Lever | What one meaningful factor could change? |
| Baseline | What comparable starting evidence exists? |
| Expected effect | Which completion, intervention, quality, time or cost measure should move? |
| Evidence source | Where will comparable evidence come from? |
| Owner | Who owns the change and evidence? |
| Limitation | What prevents a confident conclusion? |
| Decision | Keep, revise or stop? |

Hold the task and acceptance criteria constant. Prioritize changes by expected
leverage, evidence quality, feasibility and risk; do not prioritize by raw
consumption alone.

Instruction/practice split: 5 minutes frame the canvas; 30 minutes discuss and
complete candidate changes; 10 minutes compare and prioritize.

Output: one prioritized optimization change with baseline, owner, limitation
and keep/revise/stop criteria.

## S13 Choose the investment approach

**13:45-14:15, 30 minutes.**

Separate **fixed licenses** from **variable usage**. Distinguish three funding
purposes:

- **exploration funding** for bounded learning before reliability is known;
- **production funding** for reliable, governed work with demonstrated leverage;
- **exception funding** for a time-boxed need outside the normal allocation.

Use the credit lifecycle—forecast, allocate, observe, notify, review, adjust or
expire—as a useful operating frame without claiming a universal product
workflow. Distinguish an alert from a supported enforced stop. Prefer forecasts,
notifications and review thresholds before hard stops. Expand funding only when
reliability and leverage are demonstrated.

Instruction/practice split: 7 minutes explain the funding purposes and credit
lifecycle; 15 minutes assign the prioritized change to an investment approach;
8 minutes decide its review threshold, exception path and funding evidence.

Output: a funding approach that identifies fixed versus variable cost,
alert/review behavior, owner and expansion condition.

## U03 Break

**14:15-14:30, 15 minutes.**

Character-free utility. Release the room for the full break and show a 14:30
return time. No instruction or required decision repair.

## S14 Bound the pilot and agent deployment

**14:30-15:15, 45 minutes.**

Build a native pilot canvas with these exact fields:

- use case;
- participants;
- tools/models;
- data boundary;
- human checkpoints;
- validation;
- exceptions;
- stop conditions; and
- rollback.

The tools/models field records approved choices and selection logic, not a
future entitlement promise. Human checkpoints name who reviews what and when.
Validation connects directly to the held acceptance criteria. Exceptions are
time-boxed and owned. Stop conditions and rollback are operational decisions,
not decorative safety language.

Instruction/practice split: 5 minutes frame the canvas; 28 minutes define the
pilot and agent boundary; 12 minutes challenge scope, checkpoints, validation,
exceptions, stopping and rollback.

Output: a bounded pilot and agent-deployment definition.

## S15 Orchestrate and operate at enterprise scale

**15:15-16:00, 45 minutes.**

Define decision rights and workflow across:

- **business owner**;
- **engineering**;
- **architecture**;
- **platform governance**;
- **security/compliance**; and
- **Finance/FinOps**.

Use a native workflow:

> proposes -> validates -> approves boundary -> funds -> enables -> monitors ->
> handles incident/exception -> reviews expiry or escalation

Assign who recommends, decides, executes, monitors and is consulted at each
step. Include monitoring, incidents, expiry and escalation. Keep policy decision
rights distinct from product permissions, and Finance funding distinct from
FinOps observation and optimization. The operating model is a decision artifact,
not proof that a control has been implemented.

Instruction/practice split: 8 minutes explain the decision-rights workflow;
25 minutes assign roles for the pilot; 12 minutes stress-test an incident,
exception, expiry or escalation.

Output: an enterprise production operating model with explicit decision rights,
handoffs and unresolved dependencies.

## S16 Build the pilot scorecard

**16:00-16:25, 25 minutes.**

Use these seven measures:

1. valid completion;
2. developer intervention;
3. cycle time;
4. rework/quality;
5. AI cost per accepted outcome;
6. operational risk; and
7. business outcome.

Every measure must have **baseline, source, owner, cadence and decision**. Use
the same completion boundary and acceptance criteria established earlier. AI
cost per accepted outcome connects variable usage to accepted outcomes; it does
not treat cost reduction alone as ROI.

Instruction/practice split: 5 minutes explain the seven measures and five
required fields; 15 minutes build the pilot scorecard; 5 minutes identify
missing or non-comparable evidence.

Output: a scorecard with seven measures and owned evidence fields.

## S17 Set funding and scale gates

**16:25-16:40, 15 minutes.**

Set explicit **stop, revise, fund and scale** thresholds and owned checkpoints.
A useful 30/60/90 structure may be used when it fits the pilot; those numbers
are review horizons, not a promise of results.

Native gate prompt:

> Gate ___; threshold/evidence ___; checkpoint date ___; owner ___; decision
> authority ___; if unmet ___; if met ___.

Funding expansion requires demonstrated reliability and leverage. A scale gate
must not rely only on adoption, usage, model access or generated output.

Instruction/practice split: 3 minutes frame the gates; 8 minutes set thresholds
and checkpoints; 4 minutes test the funding and scale decision.

Output: owned stop/revise/fund/scale gates and review checkpoints.

## S18 Pilot decision and mission readout

**16:40-17:00, 20 minutes.**

Assemble the final pilot package:

- pilot hypothesis;
- ROI path;
- optimization changes;
- boundary;
- funding;
- measures;
- owner;
- dependencies; and
- next review.

Every group must be able to complete this exact sentence:

`For workflow ___, we will test ROI path ___ through pilot ___, within boundary ___, funded by ___, governed by ___, measured using ___, and reviewed on ___ to decide whether to stop, revise, or scale.`

Do not invent consensus. Record unresolved dependencies, evidence gaps and the
person who owns each next action.

Instruction/practice split: 3 minutes assemble the board; 12 minutes group
readouts and challenge; 5 minutes confirm owners, dependencies and review dates.

Output: the final pilot decision statement and owned next review.

## Speaker-notes contract

Downstream notes compliance is governed by
`.github/skills/slide-contract-review/SKILL.md`. Every visible slide, including
S01, S01A and U01-U03, requires exactly one speaker-notes HTML comment directly
after the slide. It must contain these non-empty sections exactly once and in
this order, with a blank line between sections:

1. `Timebox:`
2. `Talk track:`
3. `Transition:`
4. `Audience question:`
5. `Response guidance:`
6. `Payoff:`
7. `Sources:`

The numeric timebox must match the manifest exactly; use singular
`Timebox: 1 minute` for S01 and plural `Timebox: <number> minutes` for every
other slide in this contract. There are no zero-minute slides. Notes must use
natural spoken business narration, put the slide-specific answerable question
early, provide conditional recovery language without inventing a participant
response, and protect the stated discussion/practice windows rather than filling
them with speech. `Sources:` is unspoken metadata and uses the governing
repository source anchor.

## Local review and release boundary

The current `slides.md` predates this contract and is intentionally not changed
by the Content Architect. A title/content mismatch is therefore expected until
the Deck Producer handoff. This source authorizes no media work, provider call,
paid action, product configuration, participant environment, publication,
release, push or deployment.

Contract validation and a later local deck build can establish implementation
evidence only. Human content/teaching acceptance, integration readiness, local
release-candidate acceptance, publication and participant outcomes remain
independent decisions.
