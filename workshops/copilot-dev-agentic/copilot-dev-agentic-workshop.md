# Module 2: Agentic Content Refresh — Workshop Guide

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers with Foundations module experience  
**Prerequisites**: Completion of Module 1

---

## Session Agenda (Slide 2)

| Section | Topic Group | Time |
|---------|-------------|------|
| 1 | Transition framing: Stage 4 → Stage 7, with Stage 5-6 focus | 10 min |
| 2 | Stage 5: CLI power-user patterns and safe autonomy controls | 25 min |
| 3 | Stage 6: Multi-agent orchestration and role-based handoffs | 25 min |
| 4 | Transitional bridge: Stage 6 → Stage 7 operational readiness | 20 min |
| 5 | Wrap-up and lab hand-off | 10 min |
| — | Lab time across 3 exercises | 30 min |

## Workshop Overview

This Module 2 refresh now maps explicitly to the approved 8-stage model, with a focused deep dive on **Stage 5** and **Stage 6**. It also frames the transition from **Stage 4** (structured prompting and scoped autonomy) toward **Stage 7** (integration and operational scale). Each bullet labeled "Slide topic" is written as a one-slide target for NotebookLM ingestion, so visual generation and presenter narration stay aligned.

> **NotebookLM guidance**: Keep discussion prompts out of slide bullets. Use them only as presenter notes / talk track.

### Learning Objectives

- Explain how Stage 5 and Stage 6 differ in control model, risk profile, and review strategy
- Apply Stage 5 CLI power-user workflows with explicit boundaries and stop conditions
- Design Stage 6 multi-agent handoffs with scoped roles, tools, and verification checkpoints
- Use safety and optimization guardrails that preserve quality while reducing unnecessary token/tool usage
- Prepare teams for the Stage 7 transition without skipping Stage 5-6 maturity practices

---

## 1. Transition Framing: Stage 4 to Stage 7, Why Module 2 Centers Stage 5-6 (10 min)

### Key Points

- **Slide topic: 8-stage model snapshot** — where Stage 4, Stage 5, Stage 6, and Stage 7 fit in the maturity path.
- **Slide topic: Stage 4 exit criteria** — reliable prompts, scoped tasks, and explicit review gates.
- **Slide topic: Instructions at Stage 4/5 boundary** — durable repository guidance vs one-off conversational prompts.
- **Slide topic: Memory at Stage 4/5 boundary** — persistent preference capture and when not to persist.
- **Slide topic: Context hierarchy (Memory vs Instructions)** — precedence and conflict handling in real workflows.
- **Slide topic: Why Stage 5-6 are the inflection point** — moving from single-agent usage to orchestrated workflows without losing control.
- **Slide topic: One-slide-per-topic operating rule** — each concept maps to one clear visual and one focused presenter narrative.

### 🛡️ Safety Moment

- Do not promote teams to Stage 6 behavior if Stage 4 review habits are inconsistent.
- Keep accountability explicit: people approve outcomes, not agents.
- Treat stage progression as governance maturity, not just tooling proficiency.

<!-- Presenter notes:
Which Stage 4 habits are strongest in your current team?
Where does your team currently experience drift between autonomy and review?
What is the earliest sign your team is ready for Stage 6 orchestration?
-->

---

## 2. Stage 5: CLI Power-User Workflows and Controlled Autonomy (25 min)

### Key Points

- **Slide topic: Stage 5 definition** — advanced CLI operation with deliberate prompt structure, tool precision, and bounded execution.
- **Slide topic: Prompt contract at Stage 5** — task, scope, constraints, definition of done, and explicit off-ramp.
- **Slide topic: What is an agent** — a goal-directed orchestrator that plans and adapts across steps.
- **Slide topic: What is a skill** — a reusable capability invoked by an agent for specific work.
- **Slide topic: When to use one or the other** — direct skills for deterministic actions, agents for adaptive multi-step tasks.
- **Slide topic: What are tools and when to use a tool** — narrow deterministic actions before broad delegation.
- **Slide topic: Direct tools vs delegated execution** — choose deterministic actions first, escalate to agents only when adaptation is needed.
- **Slide topic: Background and cloud agents** — when local async work is enough and when cloud execution is the better fit.
- **Slide topic: Stage 5 review loop** — inspect output, verify constraints, then accept or reroute.

### 🛡️ Safety Moment

- Keep tool permissions narrow and tied to the task boundary.
- Never treat speed optimizations as permission to skip review gates.
- Require escalation when uncertainty, policy conflict, or ambiguous output appears.

### 🖥️ Demo: Stage 5 CLI Precision in Practice

1. Run one direct deterministic task with tight scope and concise output constraints.
2. Re-run as an adaptive request and compare token/tool overhead.
3. Launch one background task while completing independent local analysis.
4. Review returned output with an explicit accept/reject checklist.

### 💡 AIC Optimization Tip: Minimize Overhead, Preserve Control

- Start with the smallest viable action path before agent delegation.
- Keep prompts compact but complete; remove narrative noise.
- Limit rework by defining validation checks before execution.

<!-- Presenter notes:
Which current tasks should stay direct instead of delegated?
What checks should be mandatory before accepting Stage 5 outputs?
Where can your team reduce token/tool waste without reducing safety?
-->

### 🔬 LAB: Exercise 1 — Stage 5 CLI Power-User Baseline

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) by running a structured Stage 5 CLI task, comparing direct vs delegated control, and documenting acceptance gates.

---

## 3. Stage 6: Multi-Agent Orchestration and Role-Based Handoffs (25 min)

### Key Points

- **Slide topic: Stage 6 definition** — coordinated multi-agent execution across specialized roles.
- **Slide topic: Anatomy of an agentic loop** — plan, act, observe, and adjust as a repeatable control cycle.
- **Slide topic: Agent role design** — planner, implementer, verifier, and synthesizer patterns.
- **Slide topic: Handoff contracts** — clear inputs, expected outputs, and validation criteria between agents.
- **Slide topic: Parallelism with boundaries** — independent subproblems only; avoid duplicated investigation.
- **Slide topic: Failure and recovery paths** — stop, summarize, and re-scope when an agent run stalls or drifts.

### 🛡️ Safety Moment

- Separate creation and verification roles to reduce blind acceptance risk.
- Keep auditability: preserve who asked, what ran, and why decisions were accepted.
- Enforce explicit stop conditions to prevent runaway orchestration loops.

### 🖥️ Demo: Stage 6 Multi-Agent Flow

1. Define a parent objective and split into two independent sub-agent scopes.
2. Assign one agent to implementation and another to verification.
3. Review handoff artifacts and resolve one conflicting recommendation.
4. Produce a final synthesis with unresolved risks called out.

### 💡 AIC Optimization Tip: Parallelize Only Independent Work

- Decompose by dependency boundaries, not by arbitrary task count.
- Reuse shared constraints so each agent does not relearn policy.
- Merge outputs through a single reviewer checkpoint to control noise.

<!-- Presenter notes:
Which role split (planner/verifier/etc.) fits your team workflow best?
What handoff fields are required before another agent may continue?
How do you detect and stop duplicate or conflicting multi-agent work?
-->

### 🔬 LAB: Exercise 2 — Stage 6 Multi-Agent Handoff Drill

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) by executing a role-based multi-agent workflow and validating handoff contracts before synthesis.

---

## 4. Transitional Bridge: Stage 6 to Stage 7 Operational Readiness (20 min)

### Key Points

- **Slide topic: Stage 7 preview** — integration, policy instrumentation, and repeatable operating controls.
- **Slide topic: Bridge criteria from Stage 6** — stable handoffs, measurable quality, and reliable governance evidence.
- **Slide topic: Boilerplate with `/init`** — safe project bootstrapping without skipping review gates.
- **Slide topic: Instruction layering stack** — org, repo, scoped files, prompts, and runtime context as a single system.
- **Slide topic: Optimization controls** — scoping, model fit, tool discipline, and stop conditions for safe efficiency.
- **Slide topic: Guardrail portability** — carry Stage 5-6 review discipline into Stage 7 pipelines.
- **Slide topic: Readiness checklist** — what must be true before scaling autonomy in production workflows.

### 🛡️ Safety Moment

- Scaling orchestration without governance evidence increases systemic risk.
- Keep human approval points visible even when workflows become more automated.
- Treat exceptions and rollback paths as first-class controls.

### 🖥️ Demo: Stage 7 Readiness Gate Review

1. Score one Stage 6 workflow against a Stage 7 readiness checklist.
2. Identify one missing control in observability, policy, or auditability.
3. Add a corrective gate and re-evaluate go/no-go readiness.

### 💡 AIC Optimization Tip: Standardize Checklists Before Scaling

- Use reusable readiness templates instead of ad hoc approval decisions.
- Keep metrics focused on quality, safety, and rework rate.
- Prefer incremental scaling to avoid compounding failure modes.

<!-- Presenter notes:
Which Stage 7 controls are already partially present in your repos?
What is your minimum evidence threshold for production-scale autonomy?
Where should your organization enforce non-negotiable manual approvals?
-->

### 🔬 LAB: Exercise 3 — Stage 6 to Stage 7 Guardrail Mapping

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) by mapping a Stage 6 flow to Stage 7 readiness criteria and proposing one control improvement.

---

## 5. Wrap-up and Lab Hand-off (10 min)

### Key Points

- Module 2 now explicitly teaches the Stage 5-6 operating core in the 8-stage model.
- Stage 5 establishes controlled CLI power-user behavior; Stage 6 scales via multi-agent orchestration with guardrails.
- Stage 7 readiness depends on carrying forward these safety and optimization disciplines, not replacing them.

<!-- Presenter notes:
Which Stage 5 practice should become mandatory this month?
Which Stage 6 handoff rule would most reduce rework in your team?
-->

*Workshop guide for Module 2: Agentic Content Refresh — GitHub Copilot Developer Training*
