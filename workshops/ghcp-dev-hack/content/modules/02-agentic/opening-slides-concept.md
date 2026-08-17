# Agentic Opening Slides — Text-Only Concept Proposal

**Initiative:** `agentic-opening-slides-2026-08-13`

**Workshop/module:** `ghcp-dev-hack` / `02-agentic`

**Status:** exact concept and 27-slide contract approved by the workshop owner
on 2026-08-13

**Risk:** medium for the slide-contract change; high for any later generated media

## Boundary and intended outcome

This approved concept adds two openings before the current 25-slide Agentic
sequence. Approval authorizes source, contract, and deck implementation plus
preparation of one bounded paid-action packet; it does not authorize a paid
call, candidate acceptance or promotion, publication, release, deployment,
commit, push, pull request, or changes to the mission. The intended outcome is that
learners immediately recognize the module, distinguish the accountable human,
bounded software collaborator, and consequential safety guardian, and see the
route through 75 minutes of instruction plus the separate 45-minute mission.

## Exact approved 27-slide contract delta

- Insert new slide 1, `Module 2: Agentic Development — Workshop Guide`.
- Insert new slide 2, `Session Agenda`.
- Renumber every current slide by `+2`; preserve all 25 existing titles,
  participant-facing content, order, and source requirements. Preserve all
  minute allocations except the explicit slides 1–6 timing correction below;
  downstream note timeboxes must follow the corrected manifest.
- Give each inserted slide one instruction minute. The preserved
  `Agentic Development` operating-split slide becomes slide 3 and also receives
  one instruction minute; current instructional slides 2–4 become slides 4–6
  and receive two minutes each, current slides 5–24 become slides 7–26, and
  the current mission becomes slide 27.
- Preserve the module budget exactly:
  `three opening/operating-split minutes + remaining instruction 72 +
  mission 45 = 120`.
  The six four-minute instructional slides move from 5, 10, 12, 15, 20, and
  24 to 7, 12, 14, 17, 22, and 26; 14 other instructional slides remain
  three minutes each. Exact instruction arithmetic is
  `3 + (3 × 2) + (6 × 4) + (14 × 3) = 75`.

| Proposed # | Current # | Exact title | Minutes |
| ---: | ---: | --- | ---: |
| 1 | new | Module 2: Agentic Development — Workshop Guide | 1 |
| 2 | new | Session Agenda | 1 |
| 3 | 1 | Agentic Development | 1 |
| 4 | 2 | Instructions for Agentic Work | 2 |
| 5 | 3 | Memory and Its Limits | 2 |
| 6 | 4 | Context for Long-Running Work | 2 |
| 7 | 5 | Context Hierarchy and Instruction Layering | 4 |
| 8 | 6 | Strong Agentic Prompts | 3 |
| 9 | 7 | Reusable Skills | 3 |
| 10 | 8 | Custom Agents | 3 |
| 11 | 9 | Tools | 3 |
| 12 | 10 | The Agentic Loop | 4 |
| 13 | 11 | Planning Before Action | 3 |
| 14 | 12 | Approval Boundaries | 4 |
| 15 | 13 | Verification and Evidence | 3 |
| 16 | 14 | Repository State as a Checkpoint | 3 |
| 17 | 15 | Security Before and After Push | 4 |
| 18 | 16 | GitHub Actions as Loop Feedback | 3 |
| 19 | 17 | Pull Requests as Agent Handoffs | 3 |
| 20 | 18 | Copilot Cloud Agent | 3 |
| 21 | 19 | Cloud-Agent Handoffs | 3 |
| 22 | 20 | Manage Cloud Agents from GitHub Mobile | 4 |
| 23 | 21 | Teach Copilot How Your Project Works with `/init` | 3 |
| 24 | 22 | Agentic Optimization | 3 |
| 25 | 23 | Make Cost-Conscious Choices Before You Start | 3 |
| 26 | 24 | Code Quality, Copilot Review, and Human Acceptance | 4 |
| 27 | 25 | Your Mission: Hand Off Work with Confidence | 45 |

The repeated module-name beat is intentional but carries a review risk:
slide 1 is the module welcome, while preserved slide 3 remains the instructional
operating split. No divider, recap, lab transition, or second mission is added.

## Approved new slide 1 concept

### Content contract

- **Exact title:** `Module 2: Agentic Development — Workshop Guide`
- **Communication job:** Establish module identity and the role hierarchy
  without replacing the current slide 3 explanation of the operating split.
- **Structural precedent:** Advanced slide 1 only at the structural level:
  native kicker, large module title, concise promise and timing on one side,
  with one contained hero scene on the other. Do not reuse its generated asset,
  dark cinematic look, wording, composition, or two-hour claim.
- **Participant-facing copy outline:**
  - Kicker: `GitHub Copilot · Agentic development`
  - Title: `Module 2: Agentic Development — Workshop Guide`
  - Promise: `Direct bounded software work. Inspect the evidence. Keep the decision human.`
  - Timing: `2 hours · 75 min instruction + 45 min mission`
- **Layout/native treatment:** Use the repository `two-panel` layout and the
  existing Agentic warm editorial variables. Keep all title, promise, timing,
  and any role labels native; use no logo or generated lettering. The left
  text panel is the dominant reading entry and the right panel contains one
  text-free scene without overlaying text on busy pixels.

### Proposed original three-character scene

At the left edge of the visual pane, Agent Mergewell stands at the larger
accountability desk with one hand anchoring a blank bounded-brief folio and the
other receiving a blank evidence folio. Riley Relay approaches from a short,
clearly bounded work lane on the right and returns the evidence; her adult
nonhuman identity, visible mechanical forearms and hands, and visible robotic
lower legs remain clear, and she does not touch the decision control. Between
the work lane and Mergewell's review position, Purrmission sits alert beside
one closed consequential scope/permission threshold, signaling that boundary
only—not routine work, evidence quality, approval, or merge. Mergewell is
largest and visually downstream of the returned evidence, Riley is active but
bounded, and Purrmission is a subordinate boundary marker.

This is an original `delegate → return evidence → human review` arrangement,
not a recreation of the Advanced cover, an existing entertainment composition,
or literal product architecture. It includes no gadget because no reusable
skill is being taught. Generated pixels, if separately authorized later, must
contain no GitHub mascot or character, logo, official mark, text, code, product
UI, pseudo-writing, copyrighted likeness, Inspector Gadget cue, or invented
product mechanism.

### Safe area, contain, and accessibility

- Reserve the left 42% of the 16:9 slide for native copy and the right 58% for
  the contained scene; do not reserve space for a logo or mascot.
- Within the visual pane, keep every full character, the evidence handoff, and
  the complete boundary at least 48 px from the pane edge and clear of the
  title row. Use `object-fit: contain`; no character, mechanical limb, folio,
  or threshold may be cropped.
- Keep scene meaning legible without color: position and action establish
  accountability, bounded work, evidence return, and the stop line.
- Proposed alt intent:
  `Agent Mergewell receives evidence from Riley Relay while Purrmission marks a consequential boundary before the human decision.`
- Native/reuse fallback: use the approved
  `approval-boundary-human-decision.png` as a contained, unmodified visual with
  the proposed native title copy. It shows all three roles and a consequential
  gate, but it does **not** provide a new pose/scene or the full evidence-return
  beat; approval of this fallback must explicitly accept that variance.

### Source mapping

- Module name, timing, objectives, and role boundaries:
  `module.md`, `workshop.md`, and current `slide-manifest.md`.
- Human brief, bounded software work, observable evidence, and retained human
  authority: current `visual-intent.md` slide 1 and
  `agentic-content-verification.md` markers AGT-12 and AGT-28.
- Character continuity and exclusions:
  `content/characters/agent-mergewell/character.md`,
  `content/characters/riley-relay/character.md`, and the Purrmission continuity
  rules in the Mergewell brief.
- Structural precedent and asset boundary:
  Advanced slide 1, Advanced manifest row 1, Advanced `module.md` declaration,
  and `assets/images/advanced/01-title-animated.png.json`.

### Proposed speaker notes — exactly one block, four sentences

```text
<!--
Agentic Development moves from Foundations' bounded delegation into multi-step repository work where the human still owns the brief, boundaries, acceptance, and merge. Riley Relay represents the software-agent collaborator: she performs only delegated digital work, returns evidence, asks when blocked, and stops at stated boundaries. Purrmission appears only at the consequential permission or scope threshold; she does not replace Mergewell's decision or Riley's bounded-work role. Use this one-minute opener to establish module identity and role hierarchy, not to teach literal product architecture. [Sources: module.md; visual-intent.md; agentic-content-verification.md AGT-12 and AGT-28; Agent Mergewell and Riley Relay character briefs.]
-->
```

## Approved new slide 2 concept

### Content contract

- **Exact title:** `Session Agenda`
- **Communication job:** Make the 75-minute instructional route and separate
  45-minute mission visible before instruction starts.
- **Structural precedent:** Adapt Foundations slide 2's timed-route hierarchy
  and explicit mission handoff, but use Agentic's approved section names and
  timeboxes rather than copying Foundations topics, artwork, or copy.
- **Participant-facing copy outline:**
  1. `Who does what? — 15 min`
     Human accountability, bounded software work, reusable guidance, and tools
  2. `Prepare a job worth delegating — 20 min`
     Instructions, context, scope, checks, stops, and evidence
  3. `Choose and trust the helper — 20 min`
     Skills, custom agents, tool controls, planning, and approval boundaries
  4. `Stay in charge of the result — 20 min`
     Observable loops, repository and cloud evidence, optimization, and the human call
  5. `Mission — 45 min`
     Hand off bounded work with confidence and return inspected evidence
- **Layout/native treatment:** Use `two-panel`. The wider text panel contains
  four numbered native route rows totaling `75 min`; the second panel contains
  one visually separate native mission card marked `45 min`. The route is an
  organizing agenda, not a claim that the current slides become four new
  dividers or perfectly contiguous groups.
- **Accessibility intent:** Keep all labels and minutes as native text in DOM
  reading order. Use numbers, headings, spacing, and borders in addition to
  color, meet presentation contrast, avoid animation dependence, and expose
  the route as one labeled list plus a separately labeled mission region.

### Source mapping

- Exact `75 + 45 = 120` budget: `module.md`, current
  `slide-manifest.md`, and `workshop.md`.
- Four instructional sections and timeboxes:
  `copilot-dev-agentic-workshop.md`, “Instruction architecture — exactly
  75 minutes.”
- Current topic coverage and order: `visual-intent.md`, `key-topics.md`, and
  current `slide-manifest.md`.
- Agenda precedent and its asset/source treatment: Foundations slide 2,
  Foundations manifest row 2, Foundations `module.md` declaration, and
  `assets/images/foundations/session-route.png.json`.
- Mission wording remains a launch summary only; the authoritative activity is
  still `content/missions/agentic/agent-task.md`.

### Proposed speaker notes — exactly one block, four sentences

```text
<!--
The route keeps the current instruction budget at 75 minutes: 15 minutes for role clarity, then three 20-minute sections for briefing, helper and control choices, and evidence-based decisions. The separate 45-minute mission follows instruction and carries the Foundations case file forward without moving detailed mission actions into the deck. This agenda adapts the Foundations timed-route pattern while using Agentic's approved section architecture and current topic sequence. Protect the mission timebox by shortening discussion rather than dropping required content. [Sources: module.md timing; copilot-dev-agentic-workshop.md “Instruction architecture”; slide-manifest.md; Foundations slide 2.]
-->
```

## Media necessity, reuse, and fallback

A new image is necessary only to satisfy the requested **new** three-character
pose/scene exactly. It is not necessary to communicate the learning outcome:
the agenda is stronger as native content, and the approved
`approval-boundary-human-decision.png` plus native copy is a viable no-new-media
fallback if the human accepts its scene variance. The Advanced title asset and
Foundations route asset are structural precedents, not reuse candidates for
the Agentic opening.

Reusable baselines are the current 25-slide contract and timing, the existing
`two-panel` layout and Agentic CSS variables, the approved Warm Editorial
character continuity, the Riley character study, the approved Agentic
three-character boundary asset, and native text/list/card treatments. No
existing approved asset depicts the exact proposed handoff-and-boundary scene.

## Downstream files and mandatory gates

Only after explicit concept and contract approval, the no-new-media path would
change exactly:

1. `content/modules/02-agentic/visual-intent.md` — add the two approved concepts
   and renumber current entries 1–25 to 3–27.
2. `content/modules/02-agentic/slide-manifest.md` — set 27 slides, insert the
   two exact titles/source rows, shift mappings, and preserve timing arithmetic.
3. `content/modules/02-agentic/module.md` — set `generation.expectedSlides: 27`
   and update the contract narrative; leave mission timing/content unchanged.
4. `content/modules/02-agentic/slides.md` — prepend the two approved Slidev
   slides and their single notes blocks.

No CSS change is planned; existing layout and Agentic classes are sufficient.
If presentation-shaped review falsifies that assumption, a bounded
`content/modules/02-agentic/style.css` change requires review before editing.

If the new-scene path is selected, these additional artifacts are required
after their own gates:

- accepted `content/modules/02-agentic/art-direction.md` treatment for this
  scene (the current file still says recommendation pending);
- a new reviewable prompt source under
  `content/modules/02-agentic/media/prompts/images/`;
- candidates only under
  `generated/candidates/ghcp-dev-hack/agentic/<cycle-id>/`;
- after explicit candidate approval, a never-overwritten promoted image and
  provenance sidecar under `assets/images/agentic/`, followed by its declaration
  in `module.md`.

Mandatory downstream gates remain separate:

1. Human concept decision and explicit 27-slide contract approval.
2. For new media, accepted art direction/look treatment.
3. Separate paid-action preflight stating provider, exact prompt file, source,
   dimensions, asset id, command, call/candidate maximum, retry policy, stop
   conditions, and fallback.
4. Candidate review at slide scale, then explicit candidate approval.
5. Separate promotion approval and provenance/declaration review.
6. Deck integration review: exact 27 titles, one ordered seven-section
   word-for-word talk track per slide, manifest-matching timeboxes, direct build
   or smallest supported render, 1920×1080 visual review,
   accessibility/contain review, and `pnpm validate`.
7. Separately recorded integrated-readiness, local-acceptance, release,
   deployment, and publication decisions as applicable.

Approval at any gate does not imply approval at a later gate.

## Risk, rework, cost, and stop state

- **Primary risks:** a redundant module-name beat on slides 1 and 3; an agenda
  that may be mistaken for new divider sections; character-role ambiguity;
  overemphasis of Purrmission; title-pane crop or density; and later media
  continuity/provenance failure.
- **Rework exposure:** low for the native agenda, medium for contract
  renumbering and title integration, and high for a new three-character scene
  because anatomy, Riley continuity, evidence direction, boundary meaning,
  safe-area fit, and prohibited marks can force rejection.
- **Paid/media accounting for this task:** 0 paid calls, 0 candidates,
  0 variants, and 0 retries. One governed prompt and one bounded paid-action
  packet are prepared; no candidate, image, video, or asset was generated,
  promoted, or published.
- **Stop conditions:** stop at the paid-action packet; do not authenticate,
  probe, generate, promote, publish, release, deploy, commit, push, or open a
  pull request. A representative media failure must stop its zero-retry cycle
  and return to the approved native/reuse fallback or a new human decision.
- **Fallback:** use the approved three-character boundary asset with native
  title copy and a fully native agenda, explicitly recognizing that it is not
  the approved new scene.

## Decision record and next human decisions

The workshop owner selected **Decision A** on 2026-08-13: the exact 27-slide
delta, both text contracts, and the original three-character scene are
approved for implementation and bounded paid-action packet preparation only.
The approved existing-image fallback remains active until a separately
accepted candidate is promoted and integrated.

- **Next decision — Paid action:** approve, revise, defer, or reject the exact
  one-call, one-candidate, zero-variant, zero-retry packet in
  `media/reviews/2026-08-13-opening-v1/paid-action-preflight.md`.
- **Later decision — Candidate:** after an approved call, separately accept or
  reject the candidate at 1920×1080 slide scale.
- **Later decision — Promotion/integration:** only after candidate acceptance,
  separately decide promotion, provenance, declaration, fallback replacement,
  integrated readiness, and every publication or release gate.
