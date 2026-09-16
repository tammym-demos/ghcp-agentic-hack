# Mission Control slide manifest

Initiative `mission-control-value-decision-workshop-revision`.
Baseline commit `91f168060327dd773c96de199921a4e35081bf8c`; Mission Control
tree `0d9aaf1e205709090517b3e938660484fd6054ed`. Human authority:
`content/production/decision-log.md#mc-vdw-d01-scope`,
`content/production/decision-log.md#mc-vdw-d02-contract` and
`content/production/decision-log.md#mc-vdw-d03-content`.

This is the exact generated-deck title, ID, order, minute, clock, layout and
source-anchor contract. Stable IDs are not visible positions. All 22 rows are
visible slides; there are no hidden or zero-minute slides.

| # | ID | Exact source title | Minutes | Clock | Layout | Governing source |
| --- | --- | --- | ---: | --- | --- | --- |
| 1 | S01 | Mission Control: The Copilot Value | 1 | 09:00-09:01 | advanced-cover | mission-control-source.md#s01-opening-and-cast-introduction |
| 2 | S01A | Introductions and today's agenda | 5 | 09:01-09:06 | two-panel | mission-control-source.md#s01a-introductions-and-todays-agenda |
| 3 | S02 | Define the mission | 24 | 09:06-09:30 | two-panel | mission-control-source.md#s02-define-the-mission |
| 4 | S03 | Capacity is not leverage | 15 | 09:30-09:45 | two-panel | mission-control-source.md#s03-capacity-is-not-leverage |
| 5 | S04 | Define the completion boundary | 15 | 09:45-10:00 | two-panel | mission-control-source.md#s04-define-the-completion-boundary |
| 6 | S05 | Find where leverage is lost | 15 | 10:00-10:15 | two-panel | mission-control-source.md#s05-find-where-leverage-is-lost |
| 7 | U01 | Break | 15 | 10:15-10:30 | section | mission-control-source.md#u01-break |
| 8 | S06 | Four paths to AI ROI | 15 | 10:30-10:45 | single-panel | mission-control-source.md#s06-four-paths-to-ai-roi |
| 9 | S07 | Match the path to the outcome | 15 | 10:45-11:00 | two-panel | mission-control-source.md#s07-match-the-path-to-the-outcome |
| 10 | S08 | Name the limiting factor | 15 | 11:00-11:15 | single-panel | mission-control-source.md#s08-name-the-limiting-factor |
| 11 | S09 | Select the model for the work | 20 | 11:15-11:35 | two-panel | mission-control-source.md#s09-select-the-model-for-the-work |
| 12 | S10 | Find high-consumption workflow patterns | 20 | 11:35-11:55 | two-panel | mission-control-source.md#s10-find-high-consumption-workflow-patterns |
| 13 | S11 | Control the budget and test the change | 20 | 11:55-12:15 | single-panel | mission-control-source.md#s11-control-the-budget-and-test-the-change |
| 14 | U02 | Lunch | 45 | 12:15-13:00 | section | mission-control-source.md#u02-lunch |
| 15 | S12 | Prioritize CSX optimization changes | 45 | 13:00-13:45 | two-panel | mission-control-source.md#s12-prioritize-csx-optimization-changes |
| 16 | S13 | Choose the investment approach | 30 | 13:45-14:15 | single-panel | mission-control-source.md#s13-choose-the-investment-approach |
| 17 | U03 | Break | 15 | 14:15-14:30 | section | mission-control-source.md#u03-break |
| 18 | S14 | Bound the pilot and agent deployment | 45 | 14:30-15:15 | single-panel | mission-control-source.md#s14-bound-the-pilot-and-agent-deployment |
| 19 | S15 | Orchestrate and operate at enterprise scale | 45 | 15:15-16:00 | two-panel | mission-control-source.md#s15-orchestrate-and-operate-at-enterprise-scale |
| 20 | S16 | Build the pilot scorecard | 25 | 16:00-16:25 | single-panel | mission-control-source.md#s16-build-the-pilot-scorecard |
| 21 | S17 | Set funding and scale gates | 15 | 16:25-16:40 | two-panel | mission-control-source.md#s17-set-funding-and-scale-gates |
| 22 | S18 | Pilot decision and mission readout | 20 | 16:40-17:00 | single-panel | mission-control-source.md#s18-pilot-decision-and-mission-readout |

## Contract arithmetic

- Mission briefing: S01 1 + S01A 5 + S02 24 = **30**.
- Capacity versus leverage: S03 15 + S04 15 + S05 15 = **45**.
- Four paths to AI ROI: S06 15 + S07 15 + S08 15 = **45**.
- Optimize current usage: S09 20 + S10 20 + S11 20 = **60**.
- CSX current state: S12 = **45**.
- Investment and budget: S13 = **30**.
- Pilot boundary: S14 = **45**.
- Enterprise operating model: S15 = **45**.
- Scorecard/funding: S16 25 + S17 15 = **40**.
- Pilot decision/readout: S18 = **20**.
- Facilitated: 30 + 45 + 45 + 60 + 45 + 30 + 45 + 45 + 40 + 20 =
  **405 minutes**.
- Utilities: U01 15 + U02 45 + U03 15 = **75 minutes**.
- Elapsed: 405 + 75 = **480 minutes**, continuously 09:00-17:00.
- Visible count: 19 S-slides + 3 U-slides = **22 visible slides**.

The metadata split is also exact: S01 + S03-S11 =
1 + 45 + 45 + 60 = **151 instruction minutes**. S01A + S02 + S12-S18 =
5 + 24 + 45 + 30 + 45 + 45 + 25 + 15 + 20 =
**254 discussion/decision-work minutes**. 151 + 254 = 405. Mission, media,
separate setup/transition and contingency allocations are zero.

## Content coverage

| Slides | Required instruction and participant practice |
| --- | --- |
| S01-S02 | Preserve exact S01 visual identity; orient participants; select a workflow, business outcome, completion boundary, decision owner and available/missing evidence. |
| S03-S05 | Contrast attempted/delegated capacity with `Developer leverage = completed work / developer hours`; map `code -> PR -> story -> release -> business outcome`; discuss integration, testing, review, dependencies, risk/compliance, coordination and waiting. |
| S06-S08 | Teach labor efficiency, higher throughput, expanded ownership and compounding capability; select primary/secondary paths; choose among essential human work, process structure, practical ownership scope and organizational learning/adaptability as the limiting factor. |
| S09-S11 | Select a model by task complexity, context, risk, validation and expected value without volatile claims; diagnose oversized/irrelevant context, retries, unclear acceptance, broad agent scope, unnecessary output, review queues and abandoned work; apply forecast, notification, review threshold, time-boxed exception and supported enforced stop. |
| S11-S12 | Apply `baseline current pattern -> change one meaningful lever -> hold task and acceptance criteria constant -> compare completion, intervention, quality, time and cost -> keep, revise or stop`; prioritize the CSX canvas fields current pattern, lever, baseline, expected effect, evidence source, owner, limitation and keep/revise/stop. |
| S13 | Separate fixed licenses and variable usage; distinguish exploration, production and exception funding; use credit lifecycle and alert-versus-stop distinctions; expand funding only after reliability and leverage are demonstrated. |
| S14 | Decide use case, participants, tools/models, data boundary, human checkpoints, validation, exceptions, stop conditions and rollback. |
| S15 | Assign decision rights/workflow across business owner, engineering, architecture, platform governance, security/compliance and Finance/FinOps, including monitoring, incidents, expiry and escalation. |
| S16 | Score valid completion, developer intervention, cycle time, rework/quality, AI cost per accepted outcome, operational risk and business outcome; every measure has baseline, source, owner, cadence and decision. |
| S17 | Set stop/revise/fund/scale thresholds and owned checkpoints; 30/60/90 is useful when appropriate, not mandatory or predictive. |
| S18 | Assemble pilot hypothesis, ROI path, optimization changes, boundary, funding, measures, owner, dependencies and next review; complete the exact final decision sentence. |

## Required final sentence

S18 must support and display this exact native text:

`For workflow ___, we will test ROI path ___ through pilot ___, within boundary ___, funded by ___, governed by ___, measured using ___, and reviewed on ___ to decide whether to stop, revise, or scale.`

## Speaker-notes contract

Notes compliance is governed by
`.github/skills/slide-contract-review/SKILL.md`; this section defines the
downstream contract and does not author the notes.

Every visible slide in the table requires exactly one speaker-notes HTML comment
directly after that slide. The comment must contain these seven non-empty
sections exactly once and in this order, separated by blank lines:
`Timebox:`, `Talk track:`, `Transition:`, `Audience question:`,
`Response guidance:`, `Payoff:`, `Sources:`.

The `Timebox:` value is the row's exact numeric `Minutes` value:
S01 uses `Timebox: 1 minute`; every other row uses
`Timebox: <number> minutes`. There are no zero-minute rows in this contract;
if a future approved row has zero, it must use `Timebox: 0 minutes`.

The notes must use natural word-for-word spoken business narration, plain verbs
and second-person address. Put a slide-specific answerable question early.
Response guidance must offer conditional recovery words without pretending an
answer occurred. State the payoff explicitly. Protect participant work and
discussion time rather than filling long timeboxes with narration. `Sources:`
is unspoken metadata and must use that row's governing repository source anchor.

## Native implementation and exact S01 reuse

All visible titles, formulas, workflow chains, prompts, labels, tables, canvases
and diagrams are native Slidev/HTML. Do not use fake UI, generated typography,
new visual assets, embedded video, iframe, autoplay or autonomous advance.
Presenter-controlled builds must retain a readable final hold and reduced-motion
equivalent.

Preserve S01's current `advanced-cover` implementation, exact native title and
tagline, existing four native cast labels, existing separate local Microsoft
and GitHub brand pair, and the complete approved v7 image
`/images/mission-control-opening-team-v7.png`. The authoritative source asset is
`assets/images/copilot-value-lab/mission-control-opening-team-v7.png`, SHA256
`e05909a60b5fa2669d56e37849d29a4e6100c43ad666652f043ec5bb4aa6e8f9`.
Keep contain framing, dimensions 1248x832, and no crop, pixel edits,
replacement, generated variant or overlay text. The adjacent `.png.json`
remains declared. S01 is the only slide with workshop-character art; all later
slides and utilities remain character-free.

Reuse existing shared `two-panel`, `single-panel` and `section` layouts. S06,
S08, S11, S13, S14, S16 and S18 use `single-panel` because their four-path,
limiting-factor, method/control, funding, boundary, scorecard and readout
surfaces need one continuous native canvas. S10 changes from the obsolete
`advanced-lab` treatment to `two-panel`; no slide represents a coding mission.

## Authoring-source and release boundary

The two approved Matthew Gunter videos are authoring sources only. Do not embed,
publish, link or reproduce them. Do not turn them into volatile pricing,
entitlement, availability or enforcement claims.

The current `slides.md` remains outside this Architect change and is expected to
fail the revised title/content contract until Deck Producer implementation.
That mismatch does not weaken this approved contract. Local tests, validation,
builds and rendered inspection are technical evidence only. No provider call,
paid action, new media, publication, release, push, PR, deployment, event
readiness or human acceptance is authorized or claimed.
