# Token Optimization Source Register

Text-only contract for the 60-minute lecture. Research is reviewed authoring
input, not a build dependency. Review date for every first-party source below:
**2026-10-09** (fetched and read on that date). Re-verify immediately before
delivery; no plan allowance, price, or per-model rate appears in the deck.

## Terminology

Say **GitHub AI Credits** on first mention, then **AI credits**. Never use
"premium requests" as the current unit; acknowledge that a legacy annual plan
may still display older terms. AI credits measure model usage and are distinct
from GitHub Actions minutes and other meters.

## First-party sources

| Id | Source | URL | Reviewed | Use |
| --- | --- | --- | --- | --- |
| OPT-01 | Optimizing your AI usage to maximize efficiency and reduce cost | https://docs.github.com/en/copilot/tutorials/optimize-ai-usage | 2026-10-09 | Sections 1-8: model choice, subagent models, prompts, lean context, cache invalidators, session limits, research/plan/implement, chronicle, guardrails |
| SRC-02 | Models and pricing for GitHub Copilot | https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing | 2026-10-09 | Tokens priced per model and converted to AI credits; cached-token category; code review also consumes Actions minutes |
| SRC-03 | Setting an AI credit session limit in GitHub Copilot CLI | https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit | 2026-10-09 | `/limits set`, `--max-ai-credits`, public preview, soft limit, minimum 30 |
| SRC-04 | Usage-based billing for individuals | https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals | 2026-10-09 | Chargeable features; completions and next edit suggestions not billed in AI credits on paid plans |
| SRC-05 | Supported AI models in GitHub Copilot | https://docs.github.com/en/copilot/reference/ai-models/supported-models | 2026-10-09 | Larger context and higher reasoning use more tokens; regular defaults; surface availability |
| SRC-06 | About Copilot auto model selection | https://docs.github.com/en/copilot/concepts/models/auto-model-selection | 2026-10-09 | Routing at cache boundaries; paid-plan discount in supported surfaces |
| SRC-07 | Monitoring your GitHub AI Credits usage | https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage | 2026-10-09 | Copilot settings Usage view; individual-plan AI usage page |
| CHG-01 | Claude Haiku 5.5 in GitHub Copilot (2026-10-07) | https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/ | 2026-10-09 | GA lightweight model for subagents, quick edits, terminal tasks; provider list pricing; plans and surfaces; admin model policy |
| CHG-02 | HydraFusion in VS Code and the GitHub Copilot app (2026-09-30) | https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app/ | 2026-10-09 | Research preview; orchestrates models; Single, Cascade, Critique; differs from Auto; admin preview enablement |
| CHG-03 | Discover local models in GitHub Copilot CLI (2026-10-07) | https://github.blog/changelog/2026-10-07-discover-local-models-in-github-copilot-cli/ | 2026-10-09 | `/model` discovers Ollama models from CLI 1.0.94-0; discovery does not add; local is not offline mode |
| CHG-04 | Copilot code review: API support and new default effort level (2026-10-02) | https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/ | 2026-10-09 | Balanced default since 2026-09-28; Lite option; effort per request via API; override hierarchy |

Optional 2026-10-01 "dynamic workflows" changelog entry: the guessed URL
`.../2026-10-01-dynamic-workflows/` returned 404 on 2026-10-09, so it is **not
used**. Slide 15 makes no dynamic-workflows claim.

## Reused verified register (approved wording)

`workshops/ghcp-dev-hack/content/research/agentic-ai-credit-optimization.md`:
CREDIT-01..09, SAFE-01..04, CAVEAT-01..04. The underlying SRC-02..07 pages were
re-read on 2026-10-09 and the reused claims still hold, with these updates:

- SRC-03 now states session limits must be set to at least 30 AI credits
  (older register text said limits work best above 30).
- SRC-05 lists configurable reasoning for VS Code, CLI, and cloud agent; OPT-01
  names VS Code and CLI. The deck says "supported models and surfaces".

## Reused native diagrams and wording (no raster art)

| Id | Origin | Adapted for |
| --- | --- | --- |
| FND-F11 | Foundations "What Enters the Next Prediction" / "Context Window: What Competes for Space" | Slides 4, 7 |
| FND-F12 | Foundations "Context Rot: Recognize the Signals" | Slide 8 |
| FND-F14 | Foundations "From Text to Model-Ready Numbers" | Slide 5 |
| FND-F17 | Foundations "Same conversation. Different reuse." and "Read the Usage Receipt" (synthetic counts) | Slides 6, 11 |
| AGT-A7 | Agentic "Context for Long-Running Work" | Slide 9 |
| AGT-A26 | Agentic "Agentic Optimization" | Slide 17 |

## Claim boundaries

- No fixed savings percentage; no claim that any practice guarantees lower credits.
- The 10% cached-token ratio and 10% Auto discount are documented plan/surface
  statements, not promised savings for a given task.
- Auto, subagent models, and HydraFusion are not "cheapest" promises.
- HydraFusion is a research preview; its credit impact is not stated by the
  source and is not claimed.
- Local model billing and data-handling beyond the changelog text are not claimed.
- Code review effort level is a quality/effort setting; the source does not
  state its credit effect. Code review also consumes Actions minutes (SRC-02).
- Budgets, allowances, and plan prices are out of scope.

## Image provenance and boundaries (owner-approved 2026-10-09)

The workshop owner approved new character artwork for this module. Requirements
`imageRoles` declare six roles (opening, context rot, cache, model choice,
measure and cap, lead and admin). Each is a reference edit of the approved
`workflow-team-shallow-depth-v7` art, using only Chief Morgan Charter, Agent
Mergewell, Riley Relay, and Purrmission. Images carry mood and character
continuity only; they contain no text, numbers, logos, UI, or GitHub marks, and
no teaching meaning depends on their pixels. Prompts live in
`media/prompts/public/`; candidates are under `generated/candidates/`
(gitignored); selected candidates are promoted with `pnpm content promote-image`
and carry portable sidecars.
