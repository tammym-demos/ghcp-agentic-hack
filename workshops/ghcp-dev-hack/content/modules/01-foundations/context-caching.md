# Foundations context and caching — adopted teaching source

Initiative: `llm-context-caching-foundations`. Source/content A, contract C/E,
and scenes F approved 2026-09-07; N3 proof H accepted at `76284f7`.
The coordinator's `content/production/decision-log.md` records the decisions.
This module-local source implements Foundations only; it is not a new gate.

## Authority and boundaries

- Exact inventory: `slide-manifest.md`, 27 slides, 77 instruction + 45 mission
  = 122 minutes. Zero dedicated media minutes. F10 remains 20; F26 remains
  zero. Manufacturing F23 is unchanged except its ordinal.
- Approved teaching: `content/production/context-caching-proposal/learning-contracts.md`
  (LC), sections 3–7 and 11. Approved visual/reference partition:
  `content/production/context-caching-proposal/scene-proposals.md` v1.3.
- Evidence: `content/production/context-caching-proposal/source-verification.md`
  (V), reviewed 2026-09-07, C1–C6 and X1–X9. P/S identifiers below resolve
  through that register's canonical URLs and dated public fetch receipts.
  They are not newly fetched or installed-host measurements.
- This source replaces the affected older Part 2 section 3 claims, not the
  protected manufacturing source or other retained subjects.
- New examples are fictional text requests about a community event, not a
  complete real-world event-safety plan. Baseline: outdoor, rain, 100 guests;
  question: **What supplies should we bring?**
- New words and numbers are native. Preserve all original assets, even when
  unplaced. N1 additionally uses the separately accepted and published
  deterministic illustration plate; no motion or new paid call is implied.
- N1 is an approved **static illustrated teaching plate**, not proof of
  select/append/repeat motion. N2/N3 are static by design.

## T1 / F11 — Tokens: What Enters the Model (3 minutes)

The host is the app that prepares the request. It assembles what is actually
included: system prompt / harness instructions, user prompt, applicable
repository instructions, selected files / selection, included conversation
history, and included tool information / results.

The example includes community event / outdoor / rain / 100 guests and
**What supplies should we bring?** The saved `event-budget.md` is **not
selected or retrieved in this example**. Being in a folder does not prove
inclusion. Hosts may select, summarize or truncate history. A large tool
result may be represented by a preview/path rather than its full contents.

A tokenizer maps text pieces to vocabulary IDs. **rain → ID 17** is an
illustrative tokenizer example, not an observed split or real model ID.
Cache reuse is a subset of included input, not an extra packet. Keep useful
requirements; the smallest count is not the goal.

Main: exact approved static input raster, full native input list, event
example, ID bridge and both caveats. No moving labels. Caption: **Harness /
product context → Model boundary**; **Not visibility into hidden model internals**.

Check: **Does every saved event file enter every request?**
Recovery: “No. A file can exist without being selected, retrieved or included.
Inspect what this host actually supplies. Keep the facts that change the decision.”
Payoff: distinguish file existence from actual input. Transition: IDs versus
the numeric representations they select.

Sources: V C1/C2/C3, X1, P1/P13a/P9/P16; Part 2 section 3; FND-08/12.

## E1 / F12 — From Token IDs to Numerical Representations (2 minutes)

Text phrase: **rain expected**.

| Text piece | ID | Numeric representation |
| --- | ---: | --- |
| `rain` | 17 | `[0.2, -0.4, 0.7]` |
| ` expected` | 904 | `[-0.1, 0.6, 0.3]` |

Preserve the leading space in the second piece; label **leading space shown**.
**ID = entry number. Numeric representation = learned list of numbers.**
**IDs do not rank meaning.** These are illustrative pieces, IDs and shortened
numeric lists—not measured model data. An ID selects an entry; a learned
embedding supplies a representation. Later layered processing makes
representations depend on context. Do not teach universal width, meaningful
human-readable axes, or a classifier's class scores as next-token scores.

Check: **Does ID 904 contain more meaning than ID 17?**
Recovery: “No. The ID selects an entry. It is not a score for meaning.
The learned numeric representation is a different thing.”
Payoff: separate an index from the representation it selects.
Transition: what changes when the same question has a different forecast?
Sources: V C1, P1/P2/P4; LC E1.

## N1 / F13 — How Context Shapes the Next Token (3 minutes)

Included context can change which next tokens are favored. A token is
selected, added to the response, and the process repeats. Plausible does
not mean verified.

Two separate requests keep community event, **outdoor**, **100 guests**, and
**What supplies should we bring?** Only the forecast changes: **rain** versus
**sunny**. Illustrative response starts: **Bring rain covers…** and
**Bring sun shades…**. These are not observed outputs or measured token splits.
Return to rain for the later baseline.

Causal-transformer teaching model: numeric representations → context-dependent
layers → next-token scores → select → append → repeat. Available earlier and
current positions participate in learned attention and other layered
operations. Attention alone is not the whole network. A decoding policy
selects a token; **Sampling need not pick the highest score. Plausible does
not mean verified.** No numeric scores or fixed output guarantee.

Main/reduced: the accepted deterministic illustration plate with native
process, request, response and caveat labels. Show both illustrative starts,
the static loop, one solid-square schematic appended position, and **Two
separate requests: only the forecast changes**. Do not add an alternative
animation.
Always-visible footer: **Causal-transformer teaching model. Not measured
scores.** / **Sampling need not pick the highest score. Plausible does not
mean verified.**

Details: **This uses trained weights. It does not train a new model for each
question.** / **A later token does not rewrite earlier states in the same
causal pass.** The footer remains visible.

Check: **If only the forecast changes, why might the first suggested supply
change—and what still needs checking?**
Recovery: “Rain and sunshine make different supplies plausible in the supplied
context. That can change the next-token scores. We still check whether the
suggestion meets the event requirements; a likely phrase is not a fact check.”
Payoff: explain context-sensitive generation without equating fluency with truth.
Transition: visible reply versus reported output usage.
Sources: V C1, P3/P4/S1; LC N1;
content/production/context-caching-proposal/n1-illustration-scene-spec.md.

## T2 / F14 — Tokens: What Comes Back (3 minutes)

**The visible reply is not always all reported output. Reasoning, where
reported, is already inside generated output. Ask for enough evidence to
review the result—not the shortest possible answer.**

Illustrative visible replies:
- **A: Bring covers.**
- **B: Bring covers; confirm the quantities for 100 guests and list what is
  still unknown.**

Check requirements and unknowns. B offers more to review; neither is verified
and longer is not automatically better.

Separate synthetic report—not counts of A or B: **Generated output: 500
tokens**; **Reported reasoning: 100 tokens within the 500**. Other non-visible
formatting, channel and tool structure may count, including when reasoning
is zero. Do not add 500 + 100. Output minus reasoning does not establish
visible-text tokens. Earlier output may become input to a later request;
that is another request event, not a second output category in one receipt.

Check: **Can reported output exceed visible text even with zero reported reasoning?**
Recovery: “Yes. Non-visible formatting, channels or tool structure may still
count. The visible reply is not the whole report.”
Payoff: right-size review evidence without inventing visible-token counts.
Transition: categories, rates and billing units.
Sources: V C1/C3, P7/S4; LC T2; FND-08.

## T3 / F15 — GitHub AI Credits (3 minutes)

Four categories: **Ordinary input; Cache read; Cache write where applicable;
Generated output.** Count each once. Reasoning already inside output is not
another additive charge.

**1M tokens = 1,000,000 tokens.**
**1 AI credit = $0.01 USD under documented applicable usage-based billing.**
Different categories can have different rates. Plan, organization, discounts,
legacy billing and rounding affect interpretation. Tokens, AI credits, AI
units, wall time and Actions minutes are different units.

Details:
`(U × pU + R × pR + W × pW + O × pO) / 1,000,000`.
Use matched rates in USD per million tokens. A write rate is the whole
category rate, not ordinary input plus write again.
`CLI github.copilot.cost` is a multiplier, not dollars.
`nano_aiu` has no established AI-credit conversion here.
No rate tour, universal allowance or cache discount, private balance, or
invented credits-per-tool rule.

Check: **Does twice the input always mean twice the cash bill?**
Recovery: “No. First separate the categories and their rates, then check the
plan and billing treatment. A token total alone cannot tell us the cash bill.
We do not need anyone's private balance to learn that.”
Payoff: identify missing information before claiming cost.
Transition: practice on a synthetic normalized receipt.
Sources: V C3, P5/P6/P12/P12a/P12b/P13; LC T3; FND-08/09.

## E2 / F16 — Read the Usage Receipt (3 minutes)

**Synthetic usage · tokens · not performed calls.**

| Metric | A | B | Session: A + B only |
| --- | ---: | ---: | ---: |
| Ordinary input U | 2,000 | 4,000 | 6,000 |
| Cache read R | 0 | 8,000 | 8,000 |
| Cache write W | 8,000 | 0 | 8,000 |
| Total input I | 10,000 | 12,000 | 22,000 |
| Generated output O | 500 | 600 | 1,100 |
| Reasoning Q, within O | 100 | 150 | 250 |

Main:
- **B: 4,000 + 8,000 + 0 = 12,000 input** (`I = U + R + W`).
- **B: 150 reasoning is already within 600 output**.
- **10,000 + 12,000 = 22,000 session input**.
- **Session total is not current window size. Missing fields mean unknown.**
- **A write is not a hit. Output minus reasoning is not visible-text usage.**

Details — requests:
A: Event brief + supplies question. B: Eligible retained beginning + new
material. Synthetic counts represent larger host requests, not this short
question. One human turn may use several model requests. Normalize provider
fields before comparing. Count parent or child totals, not both.
Never pad a real request to manufacture these counts.

Details — providers (separate finite page):
OpenAI-style total input includes reported read/write subsets where present;
subtract them to find ordinary input. Claude-style `input_tokens` is ordinary
input; add separate read/creation once to normalize total input. Absent
fields are unknown, not zero. A write is not a read/hit. Provider fields
are reference support, not proof of Copilot's current exposed counters.
No USD/model rates in this receipt. 600 − 150 does not prove 450 visible tokens.

Check: **For B, are the 8,000 cache-read tokens extra on top of the 12,000 input tokens?**
Recovery: “No. Four thousand ordinary input plus eight thousand cache-read input
equals twelve thousand total input. Add each input category once. The six
hundred output tokens are separate, and already include the reported reasoning.”
Payoff: reconcile categories before interpreting a meter.
Transition: what was reused, and why is it not the previous answer?
Sources: V C3/C4, P5/P6/P7/P12/P13/P13a/S4; LC E2.

## N2 / F17 — Reuse the Work, Not the Answer (2 minutes)

A service may reuse eligible processing for the identical beginning of a
request. It still processes new material and generates a new response using
that earlier context. First explain the identical beginning, then name it
the **prefix**.

Main: the left earlier-supplied block contains all six items: community
event, outdoor, rain, 100 guests, **What supplies should we bring?**, and
**Earlier response retained in conversation (illustrative)**.
The right **Continuing conversation** retains all six left items and appends
**What should we tell the volunteers?** A bracket refers to the whole block,
not just the old response.

Distinguish **Eligible earlier processing state**, **Not a saved answer**,
and **New question/material → new processing → new response**.
The exact label **Illustrative new response (not verified)** immediately
precedes the exact excerpt in every state:
**Tell volunteers that the outdoor event is planned for 100 guests and rain
is expected.**

Reuse is conditional. Cached input still occupies context. Compatible
model/serving, eligible length/boundary, retention and routing still matter.
Common transformer reuse involves per-layer key/value processing state;
within-generation caching is not a hosted cross-request retention contract.
Old context still participates in processing new positions. Reuse does not
mean skipped meaning, persistent memory or unlimited capacity. A newly
included earlier response is not claimed already cached by the earlier
request. No TTL, guaranteed hit, saved-answer shortcut or deletion claim.

Check: **If the earlier brief is reused, must the volunteer answer be the old supplies answer?**
Recovery: “No. The reusable item is earlier processing state, not an answer.
The new question still needs processing and a new response, using the earlier context.”
Payoff: explain cache-read evidence without claiming answer retrieval.
Transition: reset to independent comparisons; no N2 history carries into N3.
Sources: V C2, P4–P6; LC N2 and 11.2; scene v1.3 N2-C.

## N3 / F18 — Same Brief, New Question—or a Changed Brief? (3 minutes)

The accepted `n3-proof/proofdeck.md` notes and
`n3-proof/components/N3Comparison.vue` are reused exactly.

Each comparison independently resets the baseline, not cumulative chat.
Order: Event → Venue → Forecast → Guests → Current question.
Baseline: community event / outdoor / rain / 100 guests /
**What supplies should we bring?**

Comparison 1 changes only the final question to
**What should we tell the volunteers?** The identical beginning continues
through the brief and **What s**, then differs at **u** in supplies and **h**
in should. This is a character illustration, not tokenizer measurement.

Comparison 2 changes **outdoor → indoor only**, keeps rain, 100 guests and
the original supplies question. The difference occurs earlier. Later matching
text does not restart the same contiguous prefix.

Main: both full questions, shared text and differences. Always-visible:
**Text comparison—not a tokenizer boundary. An earlier eligible boundary
may be reusable. Neither comparison guarantees a hit.**

Details: illustrative order/separators, not a host packet format. Unshown host,
model, settings and safety conditions stay constant only for the conceptual
comparison. Reuse requires compatible model/serving, eligible length and a
previously stored boundary, retention and routing. A miss does not prove all
older variants were deleted. A retained compatible earlier variant may still
be reusable later. Neither a cache hit nor a correct answer is proved.

Check: **Which comparison changes the beginning earlier? Do the matching rain,
guest count and supplies question after the venue change restart the same prefix match?**
Recovery: venue changes earlier; later matches do not restart it; neither
comparison guarantees a hit. Exact spoken wording stays in the accepted proof.
Payoff: locate one cause without claiming full deletion or semantic identity.
Transition: quality, requirements and scoped usage together guide routing.
Sources: V C2/C6, P5/P6/S3; LC N3 and 11.3; accepted N3 proof.

## T4 / F19 — Model Routing: Match the Task (3 minutes)

Reuse the exact approved static plate and 12-second replay. No fourth lane,
overlay rewrite or new control. Its fresh/cached/output lanes are qualitative
observations, not the normalized read/write receipt taught at E2/T3.

After replay, spoken/reference comparison:
**Candidate A: short list, missing the 100-guest constraint**.
**Candidate B: list tied to the guest count, assumptions and open confirmations**.
These are qualitative samples, not model measurements or a ranking.
Choose the route for the task. Compare result quality, latency and scoped
usage. Possible reuse helps explain a receipt; it does not establish quality.
Auto may be a supported starting choice, not the cheapest-success guarantee.
Stable useful context, task fit, supported model/policy, tools and evidence matter.

Check: **Would the lower-cost list be the better route if it forgot the guest count?**
Recovery: “No. It missed a requirement. Compare task fit and reviewable quality
alongside the scoped usage and latency. One cheap run is not a universal routing rule.”
Payoff: reuse is evidence, not a route-selection or quality guarantee.
Transition: workload guide, not a model league table.
Sources: accepted Scene 09; FND-10; V C2/C3/C6, P5/P6/P14; LC T4.

## T5 / F21 — Usage by Harness: IDE and CLI (3 minutes)

Which question does this meter answer?

| Scope | Evidence |
| --- | --- |
| Current window | CLI `/context` |
| Accumulated session work | CLI `/usage` |
| This request's reuse | Documented request-scoped cache counter |
| Billing period | Applicable account usage view |

Main: **Fast event reply: cache cause not established**.
**Synthetic request B: cache-read input = 8,000 tokens**.
**This supports a claim about B, not future hits**.
**Missing cache evidence means unknown**.
Always-visible: **Host/build/session support varies.**

`/context` includes the response buffer; `/usage` includes accumulated
per-model work. Account totals are not per-request evidence.
Details: **VS Code, where available: Agent Debug Logs → session Summary →
Cache Explorer**. Verify availability in the selected build and session.
Do not prescribe CLI/IDE parity, capture request bodies, export private data
or ask for balances. This dated documentation supports `/usage`, superseding
older FND-05's unconfirmed-document status for this teaching; installed-host
availability still needs checking.

Check: **What would establish reuse better than a fast response or a small credit increase?**
Recovery: “A documented cache-read metric with its request scope is better
evidence. Speed alone does not identify the cause. If the counter is unavailable,
say ‘cache reuse is unknown here’ and use the synthetic receipt.”
Payoff: state an observation and what it does not prove.
Transition: GitHub, cloud and App answer different evidence questions.
Sources: V C4, P12b/P13/P13a/S2/S3; LC T5; FND-04/05/11.
