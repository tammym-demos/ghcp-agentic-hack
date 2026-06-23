---
theme: ../../themes/github
title: "Copilot Usage Optimization"
info: |
  Generated from NotebookLM presentation for copilot-optimization
ghFooterTitle: "Copilot Usage Optimization"
ghFooterLabel: ""
drawings:
  persist: false
transition: slide-left
mdc: true
layout: image-full
background: /images/copilot-optimization/slide-01-362208eb.png
---

<!-- Welcome and frame the module. This standalone workshop consolidates GitHub Copilot usage-optimization practices into one focused session on getting the most quality per credit. It treats tokens, AI Consumption (AIC), and usage-based billing as first-class engineering concerns, then works outward through context economics, model routing, prompt and scope discipline, agentic efficiency, and sustained measurement. The goal is a repeatable operating model where developers consistently choose the cheapest path that still meets the quality bar — trimming context noise, routing tasks to right-sized models, bounding agentic loops, and using telemetry as tuning feedback. Every section pairs a cost lever with an AI Safety Moment so optimization never undercuts accountability or review gates. -->

---
layout: image-full
background: /images/copilot-optimization/slide-02-74a61d75.png
---

<!-- Section: Why Optimization Matters: The Cost and Quality Model (8 min). Slide topic (1 slide): Optimization is an engineering discipline — usage-based billing makes every workflow choice a cost decision, not only a UX decision; treating efficiency as a first-class concern keeps spend predictable as adoption scales. Slide topic (1 slide): Tokens as the unit of cost and quality — tokens represent prompt, input, output, and cached context, so context size directly affects both spend and quality stability; bloated context raises cost and increases drift. Slide topic (1 slide): AIC — the AI Consumption model — AIC maps spend to measured token and model usage (input, output, and cached tokens at model-specific rates), making model choice, prompt size, and loop depth explicit engineering tradeoffs. -->

---
layout: image-full
background: /images/copilot-optimization/slide-03-695faf65.png
---

<!-- Slide topic (1 slide): The optimization mindset — choose the cheapest path that still clears the quality bar; optimization is not about using less Copilot, it is about removing waste — noise, retries, and unnecessary escalations. -->

---
layout: image-full
background: /images/copilot-optimization/slide-04-56ab4b4c.png
---

<!-- Safety: Cost optimization never overrides review gates: cheaper output still requires human accountability before merge. -->

---
layout: image-full
background: /images/copilot-optimization/slide-05-87599ad4.png
---

<!-- Section: Tokenomics and Context Economics (12 min). Slide topic (1 slide): Anatomy of the context window — context windows combine instructions, history, references, and outputs; they degrade when sessions accumulate noise and compaction artifacts, which raises cost and lowers reliability. Usage Optimization: reset or re-scope when context rot appears. Slide topic (1 slide): Context rot and when to reset — long, noisy sessions produce drift, repeated retries, and contradictory guidance; recognizing the signs early prevents expensive recovery loops. Slide topic (1 slide): Front-load context once — provide the relevant files, conventions, and constraints a single time at the start rather than re-pasting them every turn; cached, well-placed context is cheaper than repeated re-sends. Usage Optimization: front-load context once instead of repeating it across turns. -->

---
layout: image-full
background: /images/copilot-optimization/slide-06-4d7716c7.png
---

<!-- Slide topic (1 slide): Trim noise before sending — narrow inputs to what the task actually needs (#selection/#file before workspace-wide reasoning) so the model spends tokens on signal, not clutter. Usage Optimization: trim noise before sending context. -->

---
layout: image-full
background: /images/copilot-optimization/slide-07-ff39ae2f.png
---

<!-- Safety: Re-scoping a drifting session is safer than pushing through it — context rot increases the risk of incorrect or unsafe edits. -->

---
layout: image-full
background: /images/copilot-optimization/slide-08-b7263710.png
---

<!-- Section: Model Routing and the Biggest Cost Levers (12 min). Slide topic (1 slide): Model choice is the fastest cost lever — matching model capability to task complexity is the single highest-leverage decision; fast models fit straightforward tasks, reasoning models fit ambiguity-heavy architecture and debugging. Usage Optimization: match model capability to task complexity. Slide topic (1 slide): Auto mode — efficiency by default — auto model selection routes work to a cost-efficient model while preserving quality for many tasks, earns a 10% discount on paid plans, and protects the cache by only switching at natural boundaries. Usage Optimization: prefer Auto mode for default routing and cache protection. Slide topic (1 slide): Configurable reasoning and larger context windows — advanced reasoning and context settings improve deep multi-file tasks but increase credit usage; stay at defaults for routine work and escalate intentionally. Usage Optimization: escalate reasoning/context only when the task demands it. -->

---
layout: image-full
background: /images/copilot-optimization/slide-09-c9171618.png
---

<!-- Slide topic (1 slide): Run specialists on lighter models — a scoped subtask rarely needs the most expensive reasoning model; reserve premium models for genuinely hard decisions. Usage Optimization: run scoped subtasks on lighter models to cut cost without hurting quality. -->

---
layout: image-full
background: /images/copilot-optimization/slide-10-d317f47f.png
---

<!-- Safety: Don't down-route safety-critical or irreversible work to save credits — match the model to the risk, not just the cost. -->

---
layout: image-full
background: /images/copilot-optimization/slide-11-7ebf67a9.png
---

<!-- Make model routing concrete with a live comparison: run one well-defined task on a fast model, a reasoning model, and Auto, then compare quality, latency, and token/AIC usage. The takeaway is to find the cheapest model that still clears the quality bar and make that the routing default for that class of task. Reinforce the standing recommendation — default to Auto to capture the 10% discount and cache protection, and treat reasoning or large-context escalation as a deliberate decision tied to task difficulty. Tie this back to the earlier safety point: never down-route safety-critical or irreversible work just to save credits. -->

---
layout: image-full
background: /images/copilot-optimization/slide-12-dc03ef3c.png
---

<!-- Section: Prompt and Scope Discipline (12 min). Slide topic (1 slide): Scoped vs. broad prompts — tight, well-bounded prompts reduce drift, retries, and ambiguity, lowering both latency and AIC spend; broad prompts invite expensive rework loops. Usage Optimization: better prompt contracts lower both latency and cost. Slide topic (1 slide): Well-scoped skills reduce retries — a skill with a clear target scope, task, constraints, definition of done, and off-ramp produces reliable results the first time. Usage Optimization: well-scoped skills reduce retries. Slide topic (1 slide): Fewer rework turns lower AIC — explicit acceptance gates and stop conditions ("stop if tests fail", "ask before changing dependencies") prevent costly rework. Usage Optimization: lower AIC with fewer rework turns. -->

---
layout: image-full
background: /images/copilot-optimization/slide-13-72a2174c.png
---

<!-- Slide topic (1 slide): Minimal repro prompts — when debugging, reproduce with the smallest possible prompt before changing anything; minimal repros cut expensive trial-and-error loops. Usage Optimization: minimal repro prompts reduce trial-and-error cost. -->

---
layout: image-full
background: /images/copilot-optimization/slide-14-3be0021a.png
---

<!-- Safety: Explicit acceptance criteria and stop conditions are both a quality control and a safety control — they bound what the agent is allowed to do. -->

---
layout: image-full
background: /images/copilot-optimization/slide-15-bb0fad54.png
---

<!-- Section: Agentic Efficiency (10 min). Slide topic (1 slide): Don't over-delegate simple tasks — deterministic work like locating a symbol or editing a known file is faster and cheaper with direct tools than a multi-step agent loop. Usage Optimization: avoid over-delegating simple, deterministic tasks. Slide topic (1 slide): Bound the agentic loop — define termination criteria and loop boundaries before execution so the request/decide/act/observe/correct cycle cannot run away and burn tokens. Usage Optimization: bounded loops with termination criteria reduce token burn. Slide topic (1 slide): Avoid unnecessary orchestration — multi-agent orchestration is justified only when work is truly separable by role, evidence, and ownership; otherwise one focused workflow is cheaper and clearer. Usage Optimization: avoid orchestration when a single bounded workflow is sufficient. -->

---
layout: image-full
background: /images/copilot-optimization/slide-16-5f0cd71b.png
---

<!-- Slide topic (1 slide): Scoped subagents on lighter models — keep delegated units narrow with clear inputs, outputs, and acceptance checks, and run them on cheaper models where possible. Usage Optimization: scoped subagents on lighter models cut cost without hurting quality. -->

---
layout: image-full
background: /images/copilot-optimization/slide-17-c518f0db.png
---

<!-- Safety: Bounded loops and stop conditions are a primary safety mechanism for autonomous work — design oversight in, don't add it after something goes wrong. -->

---
layout: image-full
background: /images/copilot-optimization/slide-18-57f8192d.png
---

<!-- Section: Measure and Sustain (6 min). Slide topic (1 slide): Usage visibility and measurement — session and monthly usage views expose hidden inefficiencies such as broad prompts and repetitive retries; regular reviews prevent avoidable overages. Usage Optimization: use regular usage reviews to prevent overages. Slide topic (1 slide): /chronicle as a cost-savings loop — run /chronicle at task boundaries to capture what reduced spend (tighter scope, fewer retries, right-sized models) and what increased it (broad context, unnecessary escalations), then reuse it as a recurring cost-savings checklist. Usage Optimization: run /chronicle to preserve reusable cost controls and avoid expensive context reconstruction. Slide topic (1 slide): Instructions vs. memory for durable reuse — place durable standards in instruction files where they are applied automatically and reserve memory for reusable context that should survive across sessions; this avoids re-sending the same guidance as prompt tokens. Usage Optimization: encode durable standards once and reuse them instead of re-prompting. -->

---
layout: image-full
background: /images/copilot-optimization/slide-19-a062d6ed.png
---

<!-- Slide topic (1 slide): Sustained operating model — consistent results come from mode discipline, context hygiene, explicit acceptance criteria, and budget-aware defaults rather than ad hoc improvisation. -->

---
layout: image-full
background: /images/copilot-optimization/slide-20-51aaeb66.png
---

<!-- Safety: Usage telemetry can reveal sensitive workflow patterns — follow org policy on what usage data is shared, stored, or exported. -->

---
layout: image-full
background: /images/copilot-optimization/slide-21-960fd395.png
---

<!-- Close by reframing optimization as a durable operating model rather than a one-time cleanup: consistently choose the cheapest path that still clears the quality bar. Recap the levers in priority order — right-size the model and use Auto, keep context lean and front-loaded, scope prompts tightly, bound agentic loops, and measure usage to sustain the gains. Remind the audience to close each session with a quick usage review and a /chronicle capture, then fold recurring savings into instruction files so they compound across the team. End on accountability: every cost decision still sits behind human review, so efficiency never replaces the quality and safety gate. -->
