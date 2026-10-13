# Token Optimization Claims Register

Self-contained summary of the reviewed claims that the manifest and slides cite
as CREDIT-*, SAFE-*, and CAVEAT-*. Each entry is a paraphrase; the original
register is `workshops/ghcp-dev-hack/content/research/agentic-ai-credit-optimization.md`
(reviewed authoring input, not a build dependency). Underlying first-party
sources are SRC-02 to SRC-07 and OPT-01 in `token-optimization-source.md`;
all were re-read on **2026-10-09**. Re-verify before delivery. No savings
figure, price, or allowance is claimed anywhere in this module.

## Verified claims (CREDIT)

| Id | Claim used in this module |
| --- | --- |
| CREDIT-01 | The unit is GitHub AI Credits. Interaction cost depends on the model and on input, output, and cached tokens, which convert to AI credits. |
| CREDIT-02 | Chat, CLI, cloud agent, Spaces, Spark, and third-party coding agents can consume AI credits. On paid plans, code completions and next-edit suggestions are not billed in AI credits. |
| CREDIT-03 | CLI AI-credit session limits are a public-preview soft limit. They can stop further session work at the threshold, but an in-progress response can finish and slightly exceed it. |
| CREDIT-04 | A larger context window or higher reasoning consumes more tokens and therefore more AI credits. Default to regular context and regular reasoning; support varies by model and surface. |
| CREDIT-05 | On paid plans, Auto currently gives a 10% model-cost discount in supported Chat, CLI, Copilot app, and cloud-agent surfaces, subject to plan, policy, supported models, and availability. |
| CREDIT-06 | A fresh conversation for unrelated work, or CLI `/compact` for a continuing long session, can reduce carried context. Cache state and the next interaction still affect actual credits. |
| CREDIT-07 | Clear tasks, relevant context, stopping conditions, scoped tools, phased work, and deterministic guardrails are official efficiency guidance. No reviewed source gives a fixed credit reduction for any practice. |
| CREDIT-08 | Individual usage is visible in Copilot settings (Usage) and, for individual plans, the AI usage page. These views do not guarantee per-task causal attribution. |
| CREDIT-09 | AI credits measure model usage. GitHub Actions minutes and other meters are separate; targeted tests or fewer Actions runs are not an AI-credit formula. |

## Safe practices (SAFE)

| Id | Practice | Evidence to look for |
| --- | --- | --- |
| SAFE-01 | Before a bounded CLI task set `/limits set max-ai-credits NUMBER`, or `--max-ai-credits NUMBER` for a non-interactive run. The session stops at the soft threshold unless raised. | The configured limit and the CLI stop notification. |
| SAFE-02 | Keep regular context and regular reasoning for routine work; raise either only when complexity justifies it. | The chosen setting, usage view, and result quality. |
| SAFE-03 | On a paid plan and supported surface, begin with Auto rather than choosing an expensive reasoning model by habit. The documented discount is a documented claim, not an observed saving. | The model reported for the response and the usage view. |
| SAFE-04 | Start a new chat for a different problem; for a long CLI task that must continue, inspect `/context` and use `/compact` when appropriate. | `/context` before and after compaction, and the usage view. |

## Cautious practices (CAVEAT)

These may reduce unnecessary agent work but are not proven to reduce credits.

| Id | Practice | Limitation |
| --- | --- | --- |
| CAVEAT-01 | State the outcome, known files, scope, and what done means. | Better engineering efficiency is not a guaranteed credit reduction. |
| CAVEAT-02 | Choose tools before the session and keep the set focused; changing tools or models mid-session can invalidate cache state. | No reviewed source supplies a credits-per-tool figure. |
| CAVEAT-03 | Separate research, planning, and implementation. | Multiple phases can add model calls; no source shows phased work always costs less. |
| CAVEAT-04 | Give the agent a deterministic stop signal: the smallest relevant test or lint check first, then broaden at a planned checkpoint. | Checks can use local compute or GitHub Actions minutes, which are separate meters. |

## Blocked claims (never state)

- Every tool call costs one AI credit.
- Shorter agent duration always costs fewer credits.
- One fewer retry saves a known number of credits.
- Targeted tests directly reduce AI credits.
