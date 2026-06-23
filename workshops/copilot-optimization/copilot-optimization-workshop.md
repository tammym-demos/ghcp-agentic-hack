# Copilot Usage Optimization — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability.
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography with light background.
> - Use light backgrounds for all slide styling (cover, section, content, comparison, and summary slides).
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.
> - Generate dedicated slides for the workshop title (`# Copilot ...`), `## Workshop Overview`, and `### Learning Objectives`; do not skip or merge these sections.
> - Do not summarize away source meaning: treat workshop wording as authoritative and keep the exact messaging wherever possible. Minor connector-word edits are allowed only to improve flow and readability.
> - Control slide layout deliberately so content remains readable and properly structured on-slide.
> - Generate visual imagery that directly represents the slide wording and reinforces the intended meaning.

**Duration**: 60 minutes (single session, presentation-only)  
**Format**: Presentation  
**Audience**: Developers with basic GitHub Copilot exposure  
**Prerequisites**: VS Code, GitHub Copilot + Copilot Chat extensions, GitHub Copilot CLI, access to Copilot usage/billing views

## Workshop Overview

This standalone workshop consolidates GitHub Copilot usage-optimization practices into one focused session on getting the most quality per credit. It treats tokens, AI Consumption (AIC), and usage-based billing as first-class engineering concerns, then works outward through context economics, model routing, prompt and scope discipline, agentic efficiency, and sustained measurement. The goal is a repeatable operating model where developers consistently choose the cheapest path that still meets the quality bar — trimming context noise, routing tasks to right-sized models, bounding agentic loops, and using telemetry as tuning feedback. Every section pairs a cost lever with an AI Safety Moment so optimization never undercuts accountability or review gates.

### Learning Objectives

- Explain how tokens, AIC, and usage-based billing connect day-to-day workflow choices to cost
- Apply context window hygiene — front-load context once, detect context rot, and re-scope deliberately
- Route tasks to right-sized models and use Auto mode for cost efficiency without sacrificing quality
- Use prompt and scope discipline to reduce retries, rework, and avoidable token burn
- Make agentic-efficiency decisions: bounded loops, scoped subagents, and avoiding over-delegation
- Measure usage and sustain savings with `/chronicle`, budgets, and durable instructions

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Why optimization matters: the cost and quality model | 8 min |
| 2 | Tokenomics and context economics | 12 min |
| 3 | Model routing and the biggest cost levers | 12 min |
| 4 | Prompt and scope discipline | 12 min |
| 5 | Agentic efficiency | 10 min |
| 6 | Measure and sustain | 6 min |

## 1. Why Optimization Matters: The Cost and Quality Model (8 min)

### Key Points

- **Slide topic (1 slide): Optimization is an engineering discipline** — usage-based billing makes every workflow choice a cost decision, not only a UX decision; treating efficiency as a first-class concern keeps spend predictable as adoption scales.
- **Slide topic (1 slide): Tokens as the unit of cost and quality** — tokens represent prompt, input, output, and cached context, so context size directly affects both spend and quality stability; bloated context raises cost and increases drift.
- **Slide topic (1 slide): AIC — the AI Consumption model** — AIC maps spend to measured token and model usage (input, output, and cached tokens at model-specific rates), making model choice, prompt size, and loop depth explicit engineering tradeoffs.
- **Slide topic (1 slide): The optimization mindset** — choose the cheapest path that still clears the quality bar; optimization is not about using less Copilot, it is about removing waste — noise, retries, and unnecessary escalations.

### 🛡️ Safety Moment

- Cost optimization never overrides review gates: cheaper output still requires human accountability before merge.
- Set user-level budgets and plan limits before scaling usage so efficiency goals do not silently become overruns.
- Treat billing telemetry as governance evidence, not just a personal metric — shared visibility keeps teams aligned.

### 💡 Optimization Tip: Make cost a design input

Decide the acceptable cost/quality tradeoff *before* you prompt, not after the bill arrives. Naming the budget and the quality bar up front turns optimization into a deliberate choice instead of cleanup.

## 2. Tokenomics and Context Economics (12 min)

### Key Points

- **Slide topic (1 slide): Anatomy of the context window** — context windows combine instructions, history, references, and outputs; they degrade when sessions accumulate noise and compaction artifacts, which raises cost and lowers reliability. **Usage Optimization**: reset or re-scope when context rot appears.
- **Slide topic (1 slide): Context rot and when to reset** — long, noisy sessions produce drift, repeated retries, and contradictory guidance; recognizing the signs early prevents expensive recovery loops.
- **Slide topic (1 slide): Front-load context once** — provide the relevant files, conventions, and constraints a single time at the start rather than re-pasting them every turn; cached, well-placed context is cheaper than repeated re-sends. **Usage Optimization**: front-load context once instead of repeating it across turns.
- **Slide topic (1 slide): Trim noise before sending** — narrow inputs to what the task actually needs (`#selection`/`#file` before workspace-wide reasoning) so the model spends tokens on signal, not clutter. **Usage Optimization**: trim noise before sending context.
- **Slide topic (1 slide): Encode conventions, don't repeat them** — durable standards belong in instruction files where they are applied automatically, instead of being retyped into each prompt. **Usage Optimization**: encode conventions in instructions so they are not re-sent as prompt text.

### 🛡️ Safety Moment

- Re-scoping a drifting session is safer than pushing through it — context rot increases the risk of incorrect or unsafe edits.
- Keep sensitive data out of long-lived context; broad context windows widen the blast radius if shared or exported.

### 🖥️ Demo: Front-load vs. re-paste

1. Start a session and paste the same large file into three consecutive prompts; note the rising token usage.
2. Restart, provide the file once with a clear task and `#file` reference, then ask the follow-ups.
3. Compare token usage and answer quality between the two approaches.

### 💡 Optimization Tip: Re-scope at task boundaries

When a task ends, start a fresh, tightly scoped session for the next one rather than continuing in a bloated context. Smaller, purpose-built context windows are cheaper and more reliable than carrying accumulated history forward.

## 3. Model Routing and the Biggest Cost Levers (12 min)

### Key Points

- **Slide topic (1 slide): Model choice is the fastest cost lever** — matching model capability to task complexity is the single highest-leverage decision; fast models fit straightforward tasks, reasoning models fit ambiguity-heavy architecture and debugging. **Usage Optimization**: match model capability to task complexity.
- **Slide topic (1 slide): Auto mode — efficiency by default** — auto model selection routes work to a cost-efficient model while preserving quality for many tasks, earns a 10% discount on paid plans, and protects the cache by only switching at natural boundaries. **Usage Optimization**: prefer Auto mode for default routing and cache protection.
- **Slide topic (1 slide): Configurable reasoning and larger context windows** — advanced reasoning and context settings improve deep multi-file tasks but increase credit usage; stay at defaults for routine work and escalate intentionally. **Usage Optimization**: escalate reasoning/context only when the task demands it.
- **Slide topic (1 slide): Run specialists on lighter models** — a scoped subtask rarely needs the most expensive reasoning model; reserve premium models for genuinely hard decisions. **Usage Optimization**: run scoped subtasks on lighter models to cut cost without hurting quality.

### 🛡️ Safety Moment

- Don't down-route safety-critical or irreversible work to save credits — match the model to the risk, not just the cost.
- Document model-routing defaults for the team so cost-saving choices stay consistent and auditable.

### 🖥️ Demo: Same task, three models

1. Pick one well-defined refactor task and run it on a fast model, a reasoning model, and Auto.
2. Compare output quality, latency, and token/AIC usage across the three.
3. Identify the cheapest model that still clears the quality bar — that is the routing default for this task class.

### 💡 Optimization Tip: Default to Auto, escalate on purpose

Make Auto mode your standing default and treat reasoning/large-context escalation as an explicit decision tied to task difficulty. This captures the Auto discount and cache protection while keeping premium spend reserved for work that truly needs it.

> **Learn more**: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage>

## 4. Prompt and Scope Discipline (12 min)

### Key Points

- **Slide topic (1 slide): Scoped vs. broad prompts** — tight, well-bounded prompts reduce drift, retries, and ambiguity, lowering both latency and AIC spend; broad prompts invite expensive rework loops. **Usage Optimization**: better prompt contracts lower both latency and cost.
- **Slide topic (1 slide): Well-scoped skills reduce retries** — a skill with a clear target scope, task, constraints, definition of done, and off-ramp produces reliable results the first time. **Usage Optimization**: well-scoped skills reduce retries.
- **Slide topic (1 slide): Fewer rework turns lower AIC** — explicit acceptance gates and stop conditions ("stop if tests fail", "ask before changing dependencies") prevent costly rework. **Usage Optimization**: lower AIC with fewer rework turns.
- **Slide topic (1 slide): Minimal repro prompts** — when debugging, reproduce with the smallest possible prompt before changing anything; minimal repros cut expensive trial-and-error loops. **Usage Optimization**: minimal repro prompts reduce trial-and-error cost.
- **Slide topic (1 slide): Rubber-duck before executing** — articulating the problem before execution surfaces hidden assumptions and avoids expensive wrong-direction loops. **Usage Optimization**: clarify intent first to avoid costly rework.

### 🛡️ Safety Moment

- Explicit acceptance criteria and stop conditions are both a quality control and a safety control — they bound what the agent is allowed to do.
- Scope every prompt to the narrowest set of files needed; broad edits increase review burden and the chance of unintended changes.

### 🖥️ Demo: Tighten a broad prompt

1. Issue a deliberately broad prompt ("clean up this project") and observe the breadth and retries.
2. Rewrite it with explicit scope, constraints, and a definition of done.
3. Compare token/AIC usage, number of turns, and review effort between the two.

### 💡 Optimization Tip: Lock scope early

Define the scope and acceptance criteria before you start and resist mid-task expansion. Locking scope early avoids token-heavy churn and keeps one always-demoable slice working instead of many half-finished changes.

## 5. Agentic Efficiency (10 min)

### Key Points

- **Slide topic (1 slide): Don't over-delegate simple tasks** — deterministic work like locating a symbol or editing a known file is faster and cheaper with direct tools than a multi-step agent loop. **Usage Optimization**: avoid over-delegating simple, deterministic tasks.
- **Slide topic (1 slide): Bound the agentic loop** — define termination criteria and loop boundaries before execution so the request/decide/act/observe/correct cycle cannot run away and burn tokens. **Usage Optimization**: bounded loops with termination criteria reduce token burn.
- **Slide topic (1 slide): Avoid unnecessary orchestration** — multi-agent orchestration is justified only when work is truly separable by role, evidence, and ownership; otherwise one focused workflow is cheaper and clearer. **Usage Optimization**: avoid orchestration when a single bounded workflow is sufficient.
- **Slide topic (1 slide): Scoped subagents on lighter models** — keep delegated units narrow with clear inputs, outputs, and acceptance checks, and run them on cheaper models where possible. **Usage Optimization**: scoped subagents on lighter models cut cost without hurting quality.
- **Slide topic (1 slide): Async and cloud only when justified** — use background tasks or cloud agents for genuinely long-running, parallelizable work, not for quick local edits. **Usage Optimization**: use async or cloud paths only for genuinely long-running, parallelizable tasks.
- **Slide topic (1 slide): Reuse templates and scaffolding** — start from reusable setup patterns (for example via `/init`) instead of rewriting boilerplate, reducing setup churn and tokens. **Usage Optimization**: start from reusable templates to reduce setup churn.

### 🛡️ Safety Moment

- Bounded loops and stop conditions are a primary safety mechanism for autonomous work — design oversight in, don't add it after something goes wrong.
- Scale autonomy with reversibility and blast radius: high-impact delegated tasks require explicit approvals and narrow permissions.

### 🖥️ Demo: Right-size the work

1. Take a small, well-known edit and run it as a full agent loop, noting turns and token usage.
2. Redo the same edit with a direct tool/skill call.
3. Discuss where the agent loop adds value (ambiguity, branching, multiple checkpoints) and where it is pure overhead.

### 💡 Optimization Tip: Simplify before you scale

Reach for the simplest mechanism that meets the requirement — direct tool, then single agent, then orchestration — and only add complexity when the task genuinely demands it. Simplifying architecture before scaling it prevents token and review-time waste.

## 6. Measure and Sustain (6 min)

### Key Points

- **Slide topic (1 slide): Usage visibility and measurement** — session and monthly usage views expose hidden inefficiencies such as broad prompts and repetitive retries; regular reviews prevent avoidable overages. **Usage Optimization**: use regular usage reviews to prevent overages.
- **Slide topic (1 slide): `/chronicle` as a cost-savings loop** — run `/chronicle` at task boundaries to capture what reduced spend (tighter scope, fewer retries, right-sized models) and what increased it (broad context, unnecessary escalations), then reuse it as a recurring cost-savings checklist. **Usage Optimization**: run `/chronicle` to preserve reusable cost controls and avoid expensive context reconstruction.
- **Slide topic (1 slide): Instructions vs. memory for durable reuse** — place durable standards in instruction files where they are applied automatically and reserve memory for reusable context that should survive across sessions; this avoids re-sending the same guidance as prompt tokens. **Usage Optimization**: encode durable standards once and reuse them instead of re-prompting.
- **Slide topic (1 slide): Sustained operating model** — consistent results come from mode discipline, context hygiene, explicit acceptance criteria, and budget-aware defaults rather than ad hoc improvisation.

### 🛡️ Safety Moment

- Usage telemetry can reveal sensitive workflow patterns — follow org policy on what usage data is shared, stored, or exported.
- Budgets and plan limits are guardrails, not just cost tools: they cap runaway automation before it causes harm.

### 💡 Optimization Tip: Close the loop every session

End each meaningful task with a quick usage review and a `/chronicle` capture, then fold the recurring savings into instructions. This turns one-off optimizations into durable defaults that compound across the team.

> **Learn more**: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage>

*Workshop guide for Copilot Usage Optimization — GitHub Copilot Developer Training*
