# Agentic Development — Key Topics

**Initiative:** `agentic-module-development`

**Baseline status:** Approved content contract, including the additional
AI-credit topic approved by the workshop owner on 2026-08-09

**Purpose:** This document records the agreed 25-topic instructional sequence
for the Agentic module. Foundations concepts should appear only as brief
callbacks where needed; Agentic instruction should concentrate on applying
them to longer-running repository work, control points, cloud agents, and
evidence-based decisions.

## Human-Comprehension Scoring

Each recommendation receives a preliminary concept score using this rubric:

| Criterion | Weight |
| --- | ---: |
| Clear to a human developer without production context | 30% |
| Corrects the primary misconception | 20% |
| Shows a concrete cause, consequence, or decision | 15% |
| Uses an accurate visual metaphor | 15% |
| Fits the continuing repository journey | 10% |
| Preserves character and product-role boundaries | 5% |
| Keeps text, code, UI, and evidence accessible and native | 5% |

The acceptance target is at least **80/100**, including at least **4/5 for
human clarity**. Character presence earns no credit unless it improves
understanding. Scores evaluate the proposed concept, not a rendered slide.

## Topic, Score, and Illustration Recommendations

**Density key:** `full scene` uses a character action to teach the concept;
`cameo` uses a partial character or prop interaction; `world-only` uses the
same warm editorial locations and objects without characters; `native-only`
uses exact text, code, UI, or repository evidence.

| # | Topic | Score | Character interaction | Illustration recommendation | Density | Complex |
| ---: | --- | ---: | --- | --- | --- | :---: |
| 1 | **Instructions for Agentic Work** — durable repository guidance for autonomous tasks | 84 | Mergewell pins reviewed standing orders to the case board | Repository case board separating durable instructions from the current issue | cameo | No |
| 2 | **Memory and Its Limits** — what may persist and what must be supplied again | 86 | None | Evidence trays marked through native overlays as retained, missing, or unverified; no invented memory mechanism | world-only | No |
| 3 | **Context for Long-Running Work** — maintain relevant context across multiple steps | 83 | Mergewell deliberately packs a case folio | Curated context packet contrasted with an overflowing evidence pile | cameo | No |
| 4 | **Context Hierarchy and Instruction Layering** — task, path, repository, agent, and environment guidance | 90 | Mergewell surfaces a conflict while the software worker pauses | Layered guidance cards with a visible `detect → expose → reconcile → continue` route; do not invent universal precedence | full scene | **Yes** |
| 5 | **Strong Agentic Prompts** — outcome, scope, non-goals, evidence, and stop conditions | 91 | Mergewell hand cameo signs the bounded dispatch | Native progressive prompt build linking each field to a later loop checkpoint | native-first cameo | No |
| 6 | **Reusable Skills** — repeatable procedures and supporting resources | 92 | Mergewell deploys one approved skill gadget, such as Clue Wrangler or Fresh Lead | `skill supplies procedure → software agent uses procedure → tool performs action` | cameo | No |
| 7 | **Custom Agents** — recurring roles with bounded instructions and capabilities | 87 | Mergewell gives a role dossier to a distinct specialist software worker | Native role dossier showing purpose, instructions, tools, expected result, and stops | full scene | No |
| 8 | **Tools** — concrete actions guided by reusable skill workflows | 94 | A distinct software collaborator selects a specific action | Native action workbench separating search, read, edit, and run from the skill workflow that guides their use | native-first cameo | No |
| 9 | **The Agentic Loop** — understand, plan, act, observe, adjust, and verify | 95 | A software worker advances through observable stages while Mergewell watches evidence | Loop around native artifacts: brief, plan, action, result, adjustment, and verification | world-led scene | **Yes** |
| 10 | **Planning Before Action** — inspect the repository and propose a bounded approach | 88 | Mergewell reviews the proposed route before authorizing edits | Repository map with target area, proposed files, checks, risks, and stop points | cameo | No |
| 11 | **Acting and Observing** — use tools, read results, and update the next step | 84 | None | Native sequence of tool request, parameters, result, observation, and next decision | native-only | No |
| 12 | **Tool Control Points** — inspect consequential actions and parameters | 92 | Mergewell inspects an action request; Purrmission appears only for consequential risk | Native gate showing action, scope, consequence, reversibility, and decision | cameo | No |
| 13 | **Progress and Scope Drift** — compare current work with the original objective | 94 | Mergewell notices the worker's route leaving the case boundary | Clean objective route gradually branching into unrelated work before correction | full scene | **Yes** |
| 14 | **Retry, Ask, Stop, or Recover** — respond deliberately when work fails or changes | 91 | Mergewell selects a route; Purrmission marks stop or recovery when consequential | Four-way decision junction driven by changed evidence | cameo | No |
| 15 | **Verification and Evidence** — prove the result rather than trust completion language | 90 | Mergewell assembles evidence at the review desk | Native diff, tests, unresolved risks, and acceptance criteria connected to separate questions | cameo | No |
| 16 | **Repository State as a Checkpoint** — branches, diffs, commits, and recovery points | 88 | None | Native `branch → working diff → validation → reviewable commit` timeline | native-only | No |
| 17 | **GitHub Actions as Loop Feedback** — use automated checks to guide the next iteration | 93 | None | Native `push → workflow checks → result → next decision` sequence tied to one commit | native/world | **Yes** |
| 18 | **Pull Requests as Agent Handoffs** — package changes, evidence, and uncertainty for review | 92 | The software worker hands Mergewell a structured review folio | PR evidence package containing change, checks, uncertainty, and requested review | full scene | No |
| 19 | **Copilot Cloud Agent** — choose suitable asynchronous repository work | 86 | Mergewell remains at the review desk while a distinct remote software worker receives bounded work | Interactive and cloud work lanes connected to the same repository and PR | world-led scene | No |
| 20 | **Cloud-Agent Handoffs** — provide context, boundaries, checks, and expected evidence | 94 | Fresh Lead packages the handoff; Purrmission marks the high-autonomy boundary | Issue, instructions, scope, checks, permissions, and return evidence entering the cloud lane | full scene | **Yes** |
| 21 | **Monitoring and Iterative Pushes** — inspect progress, steer work, and evaluate each update | 91 | Mergewell reviews updates from the remote worker | Commit-by-commit evidence ledger connecting each diff, Actions result, and open question | full scene | **Yes** |
| 22 | **`/init` and Repository Instructions** — generate, inspect, correct, and commit durable guidance | 77 | None or Mergewell review-hand cameo | Native proposed instruction file moving through `generate → inspect → correct → commit`; exact behavior remains source-gated | native-only | No |
| 23 | **Agentic Optimization** — focused context, targeted checks, and fewer blind retries | 79 | None | Measurable before/after evidence funnel: less irrelevant context, narrower checks, fewer repeated failures | world/native | No |
| 24 | **Control AI Credits Before the Agent Runs** — choose a supported product control, then judge the result against the usage | 85 | None specified by this content contract | Keep the four controls, caveats, result quality, usage evidence, and human continue/stop decision native; production direction remains producer-owned | native-only | No |
| 25 | **Code Quality, Copilot Review, and Human Acceptance** — distinguish evidence and retain merge as the human gate | 95 | Mergewell makes the final decision while Purrmission guards the acceptance boundary | Separate diff, Actions, Code Quality, and Copilot review streams converging on `accept`, `revise`, `reject`, or `recover` | full scene | **Yes** |

Topics 22 and 23 remain below the acceptance threshold. Topic 22 requires
fresh official verification of `/init` behavior before its visual can become
specific. Topic 23 requires a more measurable transformation before it is
ready for slide implementation.

## Topic 24 Content Contract

**Human-developer objective:** Choose a supported product control before an
agentic task and verify afterward whether the result justified the AI credits
used.

Use **GitHub AI Credits** on first participant-facing mention and **AI credits**
afterward. Do not use `AICs`, and do not use the legacy general term “premium
requests.” If a participant's account still uses legacy request-based billing,
acknowledge that plan-specific exception without generalizing it.

Teach four direct, source-backed controls:

1. **Set a soft CLI session ceiling.** Copilot CLI's AI-credit session limit is
   in public preview, is CLI-specific, and is a soft limit: an in-progress
   response may finish slightly above it. It is not an exact or monthly budget.
2. **Start with regular context and regular reasoning.** Increase either only
   when task complexity justifies it and the selected model and surface support
   the control. A lower setting that causes rework is not an optimization.
3. **Use Auto where supported.** Paid plans currently receive a narrowly scoped
   10% discount on model costs while using Auto in supported products. Plan,
   policy, model pool, availability, and task outcome still apply; Auto is not
   guaranteed to select the cheapest successful option.
4. **Use fresh or compacted context appropriately.** Start a fresh conversation
   for unrelated work. For continuing long Copilot CLI work, inspect context
   and use `/compact` when appropriate. Re-anchor a fresh or compacted session
   with the necessary goal, boundaries, repository state, and checks.

After the run, inspect both result quality and available usage evidence before
choosing to continue or stop. Usage views do not prove that one isolated choice
caused a specific saving.

Keep these controls distinct from **Agentic Optimization**. Clear outcomes,
relevant context, scoped tools, phased work, targeted checks, stopping
conditions, and fewer blind retries may reduce unnecessary work, but no
reviewed source establishes a fixed AI-credit reduction for those practices.
Agentic Optimization measures workflow quality; this topic sets a documented
product boundary and inspects usage.

The following claims remain blocked:

- AI credits equal tool calls, retries, minutes, commits, files, or test runs.
- Less context, fewer tools, a shorter prompt or session, or fewer retries
  guarantees fewer AI credits.
- A CLI soft limit is exact, monthly, generally available, or supported on
  every Copilot surface.
- Auto always chooses the cheapest model, is available identically everywhere,
  or always produces a lower-cost successful task.
- A named model, reasoning level, or context size is universally cheapest.
- Targeted tests reduce AI credits, or GitHub Actions minutes and AI credits
  are the same meter.
- Usage dashboards prove that one isolated developer choice caused a specific
  credit saving.
- Lower token count necessarily means better engineering quality.
- Every participant has the same allowance, price, policy, rollout state, or
  billing terminology.
- Any percentage saving other than the current, narrowly scoped Auto
  model-cost discount documented by GitHub.

Source basis:
`content/research/agentic-ai-credit-optimization.md` (`CREDIT-01`,
`CREDIT-03`–`CREDIT-08`, `SRC-01`–`SRC-07`) and
`content/research/agentic-content-verification.md` (`AGT-06`, `AGT-07`,
`AGT-23`, `AGT-24`). The owner approved incorporation on 2026-08-09.

## Instruction Timing

For the current 27-slide generated deck, `slide-manifest.md` is the per-slide
timing authority. Slides 1–3 receive one instruction minute each; adjacent
slides 4–6 receive two minutes each; slides 7, 12, 14, 17, 22, and 26 receive
four minutes each; and the remaining 14 instructional slides receive three
minutes each.

Arithmetic:
`(3 × 1) + (3 × 2) + (6 × 4) + (14 × 3) = 75` instruction minutes. The
semantic section architecture remains `15 + 20 + 20 + 20 = 75`, and the
separate mission remains 45 minutes, for a 120-minute module. This timing
correction changes no topic, title, order, or learning coverage.

## Prioritized Complex Topics

Complex topics earn deeper treatment only when a multi-state explanation or
consequential transformation improves comprehension.

| Topic | Beginning state | Meaningful transformation | Observable result | Recommended initial format | Motion value |
| --- | --- | --- | --- | --- | --- |
| Context hierarchy and instruction layering | Several guidance sources apply to one task | A conflict is detected, exposed, and reconciled by the human | The worker continues with reviewed guidance instead of guessing | Native layered sequence | Moderate |
| The agentic loop | A bounded objective enters the work lane | The worker plans, acts, observes evidence, adjusts, and verifies | A verified result or explicit stop returns to the human | Deterministic animation candidate | High |
| Progress and scope drift | Work begins on a clean route to the objective | Adjacent changes accumulate and cross the boundary | Drift is detected and work is corrected or stopped | Character-led still sequence | High |
| GitHub Actions as loop feedback | A reviewed commit is pushed | Checks run against that commit and return pass, fail, skip, or missing evidence | The evidence drives continue, revise, or stop | Native deterministic sequence | High |
| Cloud-agent handoff | A local issue lacks a cloud-ready contract | Context, scope, permissions, checks, stops, and return evidence are packaged | Traceable cloud work begins against the intended repository state | Character-led still sequence | Moderate |
| Monitoring and iterative pushes | A pull request has an initial commit and incomplete evidence | Each update adds a diff, checks, findings, and unresolved questions | The human can judge every iteration independently | Native timeline sequence | Moderate |
| Code Quality, Copilot review, and human acceptance | Several green-looking signals arrive separately | Each signal is tied only to the question it can answer | Mergewell makes an evidence-based final decision | End-to-end summary candidate | High |

## Foundations Callbacks

Do not reteach these Foundations topics as standalone Agentic lessons:

- Copilot surfaces and harness selection
- General context selection, packing, drift, and recovery
- Ask, Plan, and Agent interaction modes
- Human accountability
- Least-privilege delegation
- General prompting fundamentals
- Usage, model-routing, and cost-awareness basics

In particular, Topic 24 must not reteach token definitions, token-to-credit
conversion rates, model tables, plan allowances, or usage-page navigation.
Its Agentic advance is choosing a control before one bounded run and judging
the result and usage afterward.

Reference them briefly when they support the deeper Agentic workflow.

## Visual Continuity

- Keep the fictional **Northstar Checkout** repository case as the module
  throughline across all instructional topics. It is not the participant
  mission.
- Reuse the intake desk, context workbench, controlled work lane, cloud handoff
  lane, and review desk as recurring locations.
- Use case folios for bounded context, guidance cards for instructions, route
  lines for work progression, capability keys for permissions, and evidence
  envelopes for validation results.
- Characters must remain visually distinct from software workers. Mechanical
  gadgets represent reusable skills only.
- Code, commands, labels, product UI, pull-request data, findings, and evidence
  remain native Slidev content.
- Character-world illustrations contain no generated typography, fake product
  interfaces, or GitHub mascot imagery.

## Stop State

These are text-only recommendations and preliminary concept scores. They do
not approve a slide contract, storyboard, prompt, image, animation, video,
media generation, paid action, publication, or release.
