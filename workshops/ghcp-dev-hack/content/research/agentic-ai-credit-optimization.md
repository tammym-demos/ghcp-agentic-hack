# Agentic AI-Credit Optimization — Approved and Incorporated

## Scoped incorporation — 2026-09-07

`content/modules/02-agentic/context-caching-source.md` T8 and the approved
`content/production/context-caching-proposal/source-verification.md`
C3/C6/X3/X4/S2/S5/S9 qualify the older source snapshot below.
Larger capacity does not prove it was filled. Auto's discount depends on the
documented paid plan and supported surface, not a cheapest-result promise.
Configuration changes may affect the actual supplied request; they do not
prove a full cache miss, changed weights/hardware or cache deletion.
Correct wrong requirements and remove unsafe access regardless of reuse.
Historical title/count/timing and controls-image prose below are not the
current 30-slide/81+45-minute native-only T8 contract.

- **Initiative:** `agentic-module-development`
- **Workshop:** `ghcp-dev-hack`
- **Module:** `02-agentic`
- **Review date:** 2026-08-09
- **Status:** Approved by the workshop owner and incorporated on 2026-08-09
- **Risk tier:** High — billing terminology, model pricing, plan allowances, and preview controls are time-sensitive
- **Source boundary:** Current first-party GitHub documentation only; no live dependency is created
- **Production boundary:** Text only; zero paid calls, media, prompts, candidates, variants, or retries
- **Re-verification:** Re-check terminology, pricing, plan and surface
  availability, preview status, and exact controls immediately before delivery

## Terminology finding

Participant-facing content should say **GitHub AI Credits** on first mention and
**AI credits** afterward. GitHub's current documentation says Copilot usage is
measured in AI credits and defines an AI credit as the billing unit into which
model- and token-dependent interaction cost is converted. `AICs` is not the
current official label and does not appear on the incorporated slide.

**Do not substitute “premium requests.”** That label belongs to the earlier
request-based billing model and is not the current general unit in the reviewed
documentation. Some existing annual plans can still have legacy request-based
billing, so the presenter should acknowledge a participant whose account still
shows older terminology rather than claiming every account has completed the
transition.

## Verified claims

| Claim ID | Verified claim |
| --- | --- |
| CREDIT-01 | Current GitHub documentation names the unit **GitHub AI Credits**. Interaction cost depends on model and input, output, and cached tokens, then converts to AI credits. |
| CREDIT-02 | AI-model features such as Chat, CLI, cloud agent, Spaces, Spark, and third-party coding agents can consume AI credits. On paid plans, code completions and next-edit suggestions are not billed in AI credits. |
| CREDIT-03 | Copilot CLI AI-credit session limits are public preview soft limits. They can stop further session work at the configured threshold, but an in-progress response can finish and slightly exceed it. |
| CREDIT-04 | A larger context window or higher reasoning consumes more tokens and therefore more AI credits. GitHub recommends regular context and regular reasoning by default, with larger or higher settings reserved for complex work; support varies by model and surface. |
| CREDIT-05 | On paid plans, Auto currently provides a 10% model-cost discount in supported Chat, CLI, Copilot app, and cloud-agent surfaces. Routing remains subject to plan, policy, supported models, and availability. |
| CREDIT-06 | GitHub's optimization guidance says a fresh conversation for unrelated work, or CLI `/compact` for a continuing long session, can reduce carried context and token usage. Cache state and the next model interaction still affect actual credits. |
| CREDIT-07 | Clear tasks, relevant context, stopping conditions, scoped tools, phased work, and deterministic guardrails are official efficiency guidance. They can reduce unnecessary exploration or retries, but no reviewed source establishes a fixed credit reduction for any one practice. |
| CREDIT-08 | Individual usage is observable in Copilot settings and, for individual plans, the AI usage page; supported IDEs also expose allowance information. These views do not guarantee per-task causal attribution. |
| CREDIT-09 | AI credits measure model usage. GitHub Actions minutes and other product meters can be separate charges; targeted tests or fewer Actions runs must not be presented as an AI-credit formula. |

## Official sources

| Source | Title | URL | Reviewed | Relevant claim | Caveat |
| --- | --- | --- | --- | --- | --- |
| SRC-01 | Optimizing your AI usage to maximize efficiency and reduce cost | https://docs.github.com/en/copilot/tutorials/optimize-ai-usage | 2026-08-09 | Supports right-sized models and reasoning, clear prompts, lean context, cache preservation, session limits, phased work, and guardrails. Maps to CREDIT-03–CREDIT-07. | Guidance spans several surfaces. Commands and controls apply only where named, and no fixed savings are promised. |
| SRC-02 | Models and pricing for GitHub Copilot | https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing | 2026-08-09 | Defines model-plus-token pricing converted to AI credits and distinguishes cached-token pricing. Maps to CREDIT-01 and CREDIT-09. | Rates and models change. Code review can also consume Actions minutes, so AI credits are not the only possible meter. |
| SRC-03 | Setting an AI credit session limit in GitHub Copilot CLI | https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit | 2026-08-09 | Documents `/limits set max-ai-credits NUMBER` and `--max-ai-credits NUMBER`. Maps to CREDIT-03. | Public preview, CLI-specific, soft rather than exact, and not a monthly budget. GitHub says limits work best above 30 credits because many model calls exceed 20 credits. |
| SRC-04 | Usage-based billing for individuals | https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals | 2026-08-09 | Names GitHub AI Credits, explains chargeable features and usage factors, and describes individual-plan allowances. Maps to CREDIT-01, CREDIT-02, and CREDIT-05. | Allowances vary by plan; legacy annual request-based billing and managed-plan arrangements require separate treatment. |
| SRC-05 | Supported AI models in GitHub Copilot | https://docs.github.com/en/copilot/reference/ai-models/supported-models | 2026-08-09 | States that larger context and higher reasoning use more tokens and credits, and recommends regular defaults. Maps to CREDIT-04. | Extended context is documented for VS Code and CLI; configurable reasoning is documented for VS Code, CLI, and cloud agent, only on supported models. |
| SRC-06 | About Copilot auto model selection | https://docs.github.com/en/copilot/concepts/models/auto-model-selection | 2026-08-09 | Documents task-aware routing, cache-boundary routing, product availability, and the current paid-plan model-cost discount. Maps to CREDIT-05. | Auto's model pool changes with plan, policy, residency/compliance restrictions, and availability. Do not call every routed interaction the cheapest possible interaction. |
| SRC-07 | Monitoring your GitHub AI Credits usage | https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage | 2026-08-09 | Documents individual usage views in settings, the individual-plan AI usage page, and supported IDE quota views. Maps to CREDIT-08. | Exact UI varies by plan and client version. The documented breakdown is not proof that one workflow choice caused a specific reduction. |

## Incorporated tip classification

### Directly supported to reduce billed/chargeable usage

These are product controls or billing-linked choices. Each can reduce or cap
chargeable usage in the stated conditions; none guarantees a lower bill for
every task.

#### SAFE-01 — Put a soft ceiling on a bounded CLI task

- **Developer action:** Before a bounded Copilot CLI task, set
  `/limits set max-ai-credits NUMBER`, or use `--max-ai-credits NUMBER` for a
  non-interactive task.
- **Why it helps:** The session stops after reaching the soft threshold instead
  of continuing indefinitely, unless the developer explicitly raises or resets
  it.
- **Observable evidence:** The configured limit and the CLI stop notification;
  compare the session outcome with the acceptance criteria before continuing.
- **Limitations:** Public preview, CLI-only in this proposal, and an in-progress
  response can exceed the threshold slightly. A limit does not lower usage when
  the task would already have finished below it, and it is not a monthly budget.
- **Source claim:** CREDIT-03 (SRC-01, SRC-03)

#### SAFE-02 — Start with regular context and regular reasoning

- **Developer action:** On a supported model and surface, keep regular context
  and regular reasoning for routine work; raise either only when task complexity
  justifies it.
- **Why it helps:** GitHub directly states that larger context and higher
  reasoning consume more tokens and therefore more AI credits.
- **Observable evidence:** Record the selected context/reasoning setting and
  inspect individual AI-credit usage plus result quality.
- **Limitations:** Controls are model- and surface-dependent. A harder task may
  legitimately need the higher setting, and a lower setting can cause rework.
- **Source claim:** CREDIT-04 (SRC-01, SRC-05)

#### SAFE-03 — Use Auto when its supported routing fits the task

- **Developer action:** On a paid plan and supported surface, begin with Auto
  rather than selecting an expensive reasoning model by habit.
- **Why it helps:** GitHub currently documents a 10% discount on model costs
  while using Auto in supported products, and Auto routes straightforward work
  toward lower-cost capable models.
- **Observable evidence:** Inspect the model reported for the response and the
  individual usage view; treat the documented discount, not one observed run,
  as the supported savings claim.
- **Limitations:** Paid plans only for the documented discount. Policies,
  product surface, model pool, availability, and the task all affect routing;
  Auto is not guaranteed to be the cheapest possible choice for every response.
- **Source claim:** CREDIT-05 (SRC-01, SRC-04, SRC-06)

#### SAFE-04 — Do not carry an unrelated conversation forward

- **Developer action:** Start a new chat for a different problem; for a long
  Copilot CLI task that must continue, inspect `/context` and use `/compact`
  when appropriate.
- **Why it helps:** Carried history is input context. GitHub explicitly
  recommends these actions to reduce unnecessary context and token usage.
- **Observable evidence:** In CLI, compare `/context` before and after
  compaction; across surfaces, inspect the resulting usage and whether the new
  response still satisfies the task.
- **Limitations:** CLI documents `/context` and `/compact`. VS Code also
  documents automatic compaction and manual `/compact` or Compact Conversation
  in supported local, background and Claude agent sessions. Check the chosen
  host/version and verify needed facts after compaction. A new session needs
  those facts again; fewer visible tokens do not imply a fixed credit reduction.
- **Source claim:** CREDIT-06 (SRC-01, SRC-02); September 7 proposal register
  S2/P13a/X4. This is documentation evidence, not an installed-host test.

### May reduce unnecessary agent work but not proven to reduce credits

#### CAVEAT-01 — State the outcome, known files, and stopping condition

- **Developer action:** Tell Copilot what must change, what is already known,
  what is out of scope, and what “done” means.
- **Why it helps:** It can reduce exploration, drift, and avoidable follow-up
  runs.
- **Observable evidence:** Fewer unrelated files touched, fewer clarification
  turns, and a result that meets the stated acceptance criteria.
- **Limitations:** Better engineering efficiency is not a guaranteed
  AI-credit reduction; a detailed prompt also consumes input tokens.
- **Source claim:** CREDIT-07 (SRC-01)

#### CAVEAT-02 — Choose tools before the session and keep the set focused

- **Developer action:** Enable only the tools needed for the bounded task and
  avoid changing tools or models mid-session without a reason.
- **Why it helps:** Tool definitions add context, and changing tools or models
  can invalidate cache state.
- **Observable evidence:** The enabled-tool list, fewer irrelevant tool
  proposals, and fewer cache-changing configuration switches.
- **Limitations:** No reviewed source supplies a credits-per-tool or
  credits-per-tool-call formula. Removing a needed tool can create more work.
- **Source claim:** CREDIT-07 (SRC-01, SRC-02)

#### CAVEAT-03 — Separate research, planning, and implementation

- **Developer action:** Produce a reviewed plan, then start implementation with
  only the plan and required repository context.
- **Why it helps:** It can keep exploratory material out of the implementation
  phase and lets the developer choose a task-appropriate model.
- **Observable evidence:** A discrete plan, a smaller implementation context,
  and less unrelated implementation work.
- **Limitations:** Multiple phases can add model calls. The reviewed sources do
  not prove that every phased task costs fewer credits than one session.
- **Source claim:** CREDIT-07 (SRC-01)

#### CAVEAT-04 — Give the agent deterministic stop signals

- **Developer action:** Supply the smallest relevant test, lint rule, or other
  deterministic check, then broaden verification at the planned checkpoint.
- **Why it helps:** Early pass/fail evidence can prevent long chains of work
  built on an incorrect result.
- **Observable evidence:** Which check failed, which change followed, and
  whether repeated blind attempts decreased.
- **Limitations:** Checks can consume local compute or GitHub Actions minutes
  and may trigger more model work. Neither targeted checks nor fewer retries has
  a fixed conversion to AI credits.
- **Source claim:** CREDIT-07, CREDIT-09 (SRC-01, SRC-02)

### Do not teach as a savings claim

#### BLOCKED-01 — “Every tool call costs one AI credit”

- **Developer action:** Do not use a per-tool-call credit formula.
- **Why it is blocked:** Current billing is model- and token-dependent; no
  reviewed source establishes a universal tool-call rate.
- **Observable evidence:** None supports the claim.
- **Limitations:** A tool result may add context, but that does not establish a
  fixed charge.
- **Source claim:** CREDIT-01 (SRC-02, SRC-04)

#### BLOCKED-02 — “Shorter agent duration always costs fewer credits”

- **Developer action:** Do not use elapsed time as the AI-credit meter.
- **Why it is blocked:** Model and token usage, not wall-clock duration alone,
  define the reviewed billing relationship.
- **Observable evidence:** Duration can be measured, but it is not sufficient
  billing evidence.
- **Limitations:** Infrastructure or Actions meters can have separate time-based
  boundaries.
- **Source claim:** CREDIT-01, CREDIT-09 (SRC-02)

#### BLOCKED-03 — “One fewer retry saves a known number of credits”

- **Developer action:** Track retries as workflow waste, not as a fixed credit
  amount.
- **Why it is blocked:** Retries differ in model, context, cache state, and
  output.
- **Observable evidence:** Retry count is observable; credit savings per retry
  are not established.
- **Limitations:** Fewer retries may correlate with lower usage but do not prove
  it.
- **Source claim:** CREDIT-07 (SRC-01, SRC-02)

#### BLOCKED-04 — “Targeted tests directly reduce AI credits”

- **Developer action:** Teach targeted checks as an engineering feedback
  practice, not a billing control.
- **Why it is blocked:** Tests can reduce wasted agent work, but test execution
  and AI-model usage are different measures.
- **Observable evidence:** Test scope and Actions minutes can be measured
  separately from AI credits.
- **Limitations:** A failing test can cause additional model interactions.
- **Source claim:** CREDIT-09 (SRC-01, SRC-02)

#### BLOCKED-05 — “A named model is universally cheapest or guarantees savings”

- **Developer action:** Compare current supported options for the actual task,
  plan, and surface; do not publish a permanent cheapest-model rule.
- **Why it is blocked:** Pricing, availability, context tiers, cache charges,
  and model behavior vary and change.
- **Observable evidence:** Current pricing and actual usage can be reviewed, but
  one run cannot establish a universal rule.
- **Limitations:** A cheaper interaction that fails can increase total work.
- **Source claim:** CREDIT-01, CREDIT-04, CREDIT-05 (SRC-02, SRC-05, SRC-06)

## Incorporated exact additional slide

### Exact title

**Control AI Credits Before the Agent Runs**

### Objective

A developer can choose one supported product control before an agentic task and
verify afterward whether the result justified the AI credits used.

### Teaching treatment

**3 minutes.** Evidence does not support extending the treatment. Use a
human-action sequence: choose a boundary, run the bounded task, inspect result
quality and usage, then decide whether to continue.

### Participant-facing bullets

- **Cap a bounded CLI task:** set a soft AI-credit session limit before it runs.
- **Right-size the work:** use regular context and reasoning unless complexity
  justifies more.
- **Start with Auto where supported:** paid plans currently receive a model-cost
  discount, subject to plan and policy.
- **Drop unrelated history:** start fresh for a new problem; compact only a long
  CLI session you need to continue.

Native footer: **Verify the result and your usage. These controls can reduce or
cap chargeable work; they do not guarantee a fixed saving.**

### Native visual intent

In the established warm-editorial case-room world, Agent Mergewell stands at a
pre-run control desk and deliberately sets four native control cards:
`session ceiling`, `regular reasoning`, `Auto`, and `fresh or compact`. A narrow
route leads from those choices to two native evidence trays, **result quality**
and **AI-credit usage**, before the human `continue / stop` decision. The scene
leads with Mergewell's concrete choices; the software agent waits beyond the
gate rather than operating the controls.

### What remains native

The title, all four actions, command text, preview badge, plan/surface caveats,
Auto discount statement, usage evidence, and `continue / stop` decision remain
native Slidev/HTML. No product UI screenshot, generated typography, logo,
mascot, character artwork, image, animation, or video is approved or required.

### Source-mapped notes draft

GitHub's current participant-facing term is **AI credits**, not `AICs` or the
older general label “premium requests,” and interaction cost depends on model
and token usage. Before a bounded Copilot CLI task, a developer can set a
public-preview soft AI-credit session limit, while supported models and
surfaces also allow regular context or reasoning to be kept as the default.
Paid plans currently receive a 10% model-cost discount when Auto is used in
supported products, but plan, policy, model availability, and task outcome
still matter. Fresh sessions and CLI compaction can reduce unnecessary carried
context; none of these choices guarantees a fixed saving, so inspect both the
result and available usage evidence. **[Sources: CREDIT-01, CREDIT-03–CREDIT-06,
CREDIT-08; SRC-01–SRC-07.]**

### Insertion, contract, and timing

- **Insertion:** Immediately after current Slide 25, **Agentic Optimization**,
  and before current Slide 26, **Code Quality, Copilot Review, and Human
  Acceptance**.
- **Expected slide count:** 27 → **28**. The incorporated slide is Slide 26;
  the current Slide 26 becomes Slide 27 and the mission becomes Slide 28.
- **Instruction timing without rebalance:** 75 → **78 minutes**. The mission
  remains 45 minutes, making the module 123 rather than 120 minutes.
- **Incorporated rebalance:** The new slide is 3 minutes; current
  Slides 23 **Monitoring and Iterative Pushes**, 24 **`/init` and Repository
  Instructions**, and 25 **Agentic Optimization** were reduced from 3 minutes
  to 2 minutes each. This returns instruction to 75 minutes and the module to
  120 minutes.
- **Approval and incorporation:** The workshop owner explicitly approved the
  exact 28-title order and timing rebalance on 2026-08-09, and the content/deck
  contract is implemented.

## Distinction from existing teaching

### Current Slide 25 — Agentic Optimization

Slide 25 measures **workflow quality**: irrelevant context, check scope, blind
retries, and proof quality. It intentionally avoids promised savings. The new
slide instead teaches **developer-controlled product choices with a
documented billing relationship**: a soft CLI session ceiling, regular versus
expanded context/reasoning, Auto's current paid-plan discount, and
fresh/compacted context. Slide 25 remains the “work smarter and measure the
process” lesson; the incorporated slide is the “set a product boundary and
inspect usage” lesson.

### Foundations boundary

Foundations already explains tokens, AI-credit accounting, model-routing
tradeoffs, usage visibility, context hygiene, and Auto as a cost-efficient
default. The incorporated slide must not reteach token definitions, conversion
rates, plan allowances, general model tables, or usage-page navigation. Its
Agentic advance is applying those concepts **before one bounded agent run**,
then using the outcome and available usage evidence to decide whether to
continue.

## Explicit blocked claims

Do not state or imply:

- AI credits equal tool calls, retries, minutes, commits, files, or test runs.
- Less context, fewer tools, a shorter prompt, a shorter session, or fewer
  retries guarantees fewer AI credits.
- A CLI soft limit is exact, monthly, generally available, or supported on
  every Copilot surface.
- Auto always chooses the cheapest model, is available identically everywhere,
  or always produces a lower-cost successful task.
- A named model, reasoning level, or context size is universally cheapest.
- Targeted tests reduce AI credits, or GitHub Actions minutes and AI credits are
  the same meter.
- Usage dashboards prove that one isolated developer choice caused a specific
  credit saving.
- Lower token count necessarily means better engineering quality.
- Every participant has the same allowance, price, policy, rollout state, or
  billing terminology.
- Any percentage saving other than the current, narrowly scoped Auto
  model-cost discount documented by GitHub.

## Unresolved product questions

1. Whether all workshop participants will be on usage-based AI-credit billing
   by delivery date, rather than a legacy annual request-based arrangement.
2. Whether the selected demonstration environment exposes the public-preview
   CLI session-limit commands and the documented minimum practical threshold.
3. Which supported models expose configurable reasoning and extended context
   on the exact client version used for delivery.
4. Whether managed-plan policies allow Auto and which models Auto can select
   for each participant.
5. Whether the available individual usage view is granular and timely enough
   for a live before/after observation; current evidence does not support
   per-task attribution.

## Decision packet

- **Decision:** Approved and incorporated on 2026-08-09
- **Incorporated slide:** One additional text-only slide
- **Official term:** GitHub AI Credits / AI credits
- **Tip count:** 4 directly supported, 4 efficiency-only with caveats, 5 blocked
  savings claims
- **Incorporated title:** **Control AI Credits Before the Agent Runs**
- **Insertion:** After current Slide 25 and before current Slide 26
- **Treatment:** 3 minutes
- **Contract:** 28 slides
- **Timing rebalance:** Incorporated slide at 3 minutes; Slides 23, 24, and 25
  reduced from 3 to 2 minutes each, preserving 75 instructional minutes and the
  45-minute mission
- **Accuracy risk if ignored:** Medium — the current deck avoids false savings
  claims, but it does not give developers the newly documented direct controls
  they requested
- **Accuracy risk if added without caveats:** High
- **Source freshness:** Seven current GitHub Docs pages reviewed 2026-08-09
- **Paid/media counts:** 0 / 0
- **Delivery requirement:** Re-verify volatile terminology, pricing, plans,
  surfaces, preview status, and exact controls immediately before delivery
- **Next review:** Module Creative Partner for overall teaching flow, slide
  clarity, content gaps, and video opportunities without changing the approved
  contract
