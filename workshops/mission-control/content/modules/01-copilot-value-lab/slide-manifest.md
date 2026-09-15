# Mission Control slide manifest

Initiative `mission-control-local-review-deck`, baseline
`mc-recovered-concept-680d21c332ac-a1-placeholder-v1`.
Bounded revision: `mission-control-opening-kickoff-revision`, baseline
`8cc855b9e1b1b88edb65cd648e385d15ba628620`; authority:
`content/production/decision-log.md#mc-d07-cover-labels-and-five-minute-kickoff`.
Retain S01–S18 and three scheduled utilities; insert owner-selected S01A within
the existing opening block, not a new day stage. All source anchors refer to
`mission-control-source.md`. Visible position and stable ID are separate:
S01A is slide 2, S02 is slide 3 and S07 is slide 9.

| # | ID | Exact source title | Minutes | Clock | Layout | Governing source |
| --- | --- | --- | ---: | --- | --- | --- |
| 1 | S01 | Mission Control: The Copilot Value Lab | 1 | 09:00–09:01 | advanced-cover | mission-control-source.md#s01-opening-and-cast-introduction |
| 2 | S01A | Introductions and today’s agenda | 5 | 09:01–09:06 | two-panel | mission-control-source.md#s01a-introductions-and-todays-agenda |
| 3 | S02 | Define the mission | 24 | 09:06–09:30 | two-panel | mission-control-source.md#s02-define-the-mission |
| 4 | S03 | Follow the credits | 15 | 09:30–09:45 | two-panel | mission-control-source.md#s03-follow-the-credits |
| 5 | S04 | What changes consumption | 15 | 09:45–10:00 | two-panel | mission-control-source.md#s04-what-changes-consumption |
| 6 | S05 | Meet the lab environment | 15 | 10:00–10:15 | two-panel | mission-control-source.md#s05-meet-the-lab-environment |
| 7 | U01 | Break | 15 | 10:15–10:30 | section | mission-control-source.md#u01-break |
| 8 | S06 | Open the evidence room | 60 | 10:30–11:30 | single-panel | mission-control-source.md#s06-open-the-evidence-room |
| 9 | S07 | Trace the guardrails | 15 | 11:30–11:45 | two-panel | mission-control-source.md#s07-trace-the-guardrails |
| 10 | S08 | Three access profiles | 15 | 11:45–12:00 | single-panel | mission-control-source.md#s08-three-access-profiles |
| 11 | S09 | Make an exception decision | 15 | 12:00–12:15 | two-panel | mission-control-source.md#s09-make-an-exception-decision |
| 12 | U02 | Lunch | 45 | 12:15–13:00 | section | mission-control-source.md#u02-lunch |
| 13 | S10 | Lab mission | 2 | 13:00–13:02 | advanced-lab | mission-control-source.md#s10-lab-mission |
| 14 | S11 | Scope and plan | 23 | 13:02–13:25 | single-panel | mission-control-source.md#s11-scope-and-plan |
| 15 | S12 | Implement within bounds | 25 | 13:25–13:50 | two-panel | mission-control-source.md#s12-implement-within-bounds |
| 16 | S13 | Verify and judge | 25 | 13:50–14:15 | single-panel | mission-control-source.md#s13-verify-and-judge |
| 17 | U03 | Break | 15 | 14:15–14:30 | section | mission-control-source.md#u03-break |
| 18 | S14 | Five accountable functions | 20 | 14:30–14:50 | single-panel | mission-control-source.md#s14-five-accountable-functions |
| 19 | S15 | Exercise the charter | 40 | 14:50–15:30 | two-panel | mission-control-source.md#s15-exercise-the-charter |
| 20 | S16 | Prove the value | 45 | 15:30–16:15 | single-panel | mission-control-source.md#s16-prove-the-value |
| 21 | S17 | Route to results | 30 | 16:15–16:45 | two-panel | mission-control-source.md#s17-route-to-results |
| 22 | S18 | Mission readout | 15 | 16:45–17:00 | single-panel | mission-control-source.md#s18-mission-readout |

## Reconciliation

- 18 existing instructional slides + 1 kickoff, 405 facilitated minutes.
- 3 character-free utilities, 75 minutes: 10:15 break (15), 12:15 lunch (45),
  14:15 break (15).
- 22 visible slides, **480 minutes**, exactly 09:00–17:00.
- S01 (1) + S01A (5) + S02 (24) = 30; S03 onward retain their exact clocks.
- S01A: 0.5 prompt/setup + 2 paired introductions + 1 brief share +
  1.5 agenda/transition = 5. S02: 3 brief + 12 draft/compare + 9 discussion/
  transition = 24. These stay within the existing coarse instruction category.
- S10 (2) + S11 (3 demo + 15 practice + 5 review) = round 1 (25).
- S12 and S13 each use 5 demo + 15 practice + 5 review = 25.
- Lab total: 15 demonstration + 45 hands-on practice + 15 review = 75.
- Producer notes compliance is governed by
  `.github/skills/slide-contract-review/SKILL.md`: exactly one HTML notes comment
  immediately after every visible slide, including cover, kickoff, utilities,
  mission launch and any zero-minute slide (none in this contract).
  Required non-empty sections, once each and in order, separated by blank lines:
  `Timebox:`, `Talk track:`, `Transition:`, `Audience question:`,
  `Response guidance:`, `Payoff:`, `Sources:`.
  Match numeric Minutes exactly: S01 `Timebox: 1 minute`, S01A
  `Timebox: 5 minutes`, S02 `Timebox: 24 minutes`; all other values unchanged.
  Use `Timebox: 0 minutes` if a future authorized contract specifies zero.
  Producer authors natural spoken narration/transitions, an answerable
  slide-specific question, conditional response/recovery guidance without
  invented answers, an explicit payoff and governing repository source
  markers/paths only. Use this manifest's source anchors for S01/S01A/S02;
  preserve all later mappings. Do not use shortened slide positions as IDs.
- Long blocks contain short spoken cues and protected work/discussion windows,
  not minute-for-minute narration. In particular protect S01A's pair/share
  windows and S02's revised 3/12/9 split; remove the old 29-minute/3/16/10
  narration allocation. This is a notes contract, not authored speaker notes.

## Intentional layout exceptions

All unlisted instructional slides use shared `two-panel`, a full-width title
row and equal teaching/action and visual panels.

- S01 `advanced-cover`: exact workshop title as primary heading and retained
  tagline/authorized marks. Remove the old heading and Mission briefing/time
  kicker. Reuse the complete unchanged approved v7 art with contain framing;
  native labels beneath it, left-to-right: Agent Mergewell / Accountable human
  engineer; Purrmission / Boundary signal; Chief Charter / Organizational
  sponsor; Riley Relay / Bounded agent collaborator. No text/art overlap.
- S01A `two-panel`: exact introduction prompt, protected pair/brief-share
  practice and existing named day blocks from its source; no new artwork.
- U01/U02/U03 `section`: dedicated character-free return-time cards.
- S06 `single-panel`: the attribution relationship diagram and linked
  evidence fields need a single readable tracing surface.
- S08 `single-panel`: three comparable access-profile cards share one row;
  splitting a profile across unequal panels would obscure the comparison.
- S10 `advanced-lab`: dedicated two-minute mission launch, scope and acceptance.
- S11 `single-panel`: the exact planning prompt and 3/15/5 exercise instructions
  need full-width, editable text.
- S13 `single-panel`: five acceptance checks and expected/observed evidence
  belong in one full-width verification table.
- S14 `single-panel`: the five-function responsibility matrix is a teaching
  table, not an illustration beside a duplicate bullet list.
- S16 `single-panel`: five scorecard categories use shared baseline/source/
  owner/cadence/decision fields.
- S18 `single-panel`: one shared decision board for the group readout.

## Native builds and review boundaries

S03 reveals lifecycle groups; S04 connects request/work/output/evidence; S07
reveals five additional hierarchy layers; S08 compares profile breadth; S09
separates an alert from a supported stop; S15 reveals decision gates; S16
connects usage evidence to an outcome/decision; S17 reveals the three checkpoints.
No clock-driven advance, perpetual motion, autoplay or new media assets;
the existing static v7 illustration remains S01-only.
All builds have a fully readable final hold and a no-transition reduced-motion
equivalent. Replay uses standard previous/next click navigation.

`global-bottom.vue` supplies an optional **Read this slide** dialog for mobile
and accessible reading of the same complete native slide state. It reflows
panels without adding a visible slide, changing the timing or exposing notes.

No rendered data point is claimed to come from a real App session or tenant.
Blank evidence fields are deliberate: the starter and fixture-based expected
results are delivery prerequisites, not produced artifacts of this deck.
Human acceptance of the representative look and finished deck remains pending.
