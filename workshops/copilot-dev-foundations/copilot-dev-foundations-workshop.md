# Module 1: Foundations — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability.
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography.
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Hands-On  
**Audience**: Developers with basic GitHub Copilot exposure  
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

## Workshop Overview

This Foundations workshop introduces the core Copilot mental model before agentic scaling. The module starts with surfaces and trust boundaries, then moves into interaction modes, tokenomics, model routing, and context quality. It closes with autonomy controls and custom agent basics so learners leave with a safe default operating model for daily use.

### Learning Objectives

- Explain where Copilot lives across IDE, terminal, and cloud surfaces
- Use inline completions, inline chat, and Ask/Plan/Agent modes appropriately
- Interpret tokens, AIC usage, and model-routing tradeoffs for cost-aware execution
- Detect context rot and apply context window hygiene practices
- Apply least-privilege delegation and custom-agent guardrails

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Foundations baseline: surfaces, trust, and interaction fundamentals | 15 min |
| 2 | Guided workflows: VS Code chat, CLI, and mode selection | 20 min |
| 3 | Token economics and model-routing decisions | 20 min |
| 4 | Context windows, autonomy spectrum, and custom agents | 20 min |
| 5 | Wrap-up and Module 2 handoff | 15 min |
| — | Hands-on labs across four exercises | 30 min |

## 1. Foundations Baseline: Surfaces, Trust, and Interaction Fundamentals (15 min)

### Key Points

- **Slide topic (1 slide): Where GitHub Copilot lives** — Copilot spans IDEs, CLI workflows, and GitHub.com experiences through the Copilot App, letting developers move between coding, automation, and repository-level understanding without changing assistant context. **AI Safety Moment**: confirm org policy and access boundaries before using cloud or cross-repo context.
- **Slide topic (1 slide): Enterprise privacy and IP** — Business and Enterprise controls include policy-driven content boundaries, auditability, and configurable feature access, so teams can align usage with compliance and IP expectations. **AI Safety Moment**: frame all generated output as draft material requiring human review.
- **Slide topic (1 slide): Inline chat and code completions** — Completions accelerate flow authoring while inline chat supports scoped transformations such as refactors and type changes, giving two complementary interaction patterns for day-to-day work. **Usage Optimization**: choose completions for low-token flow edits and inline chat for bounded transformations.
- **Slide topic (1 slide): Baseline operating posture** — safe, effective Copilot usage starts with least-autonomy defaults, scoped prompts, and explicit acceptance criteria that keep accountability with human reviewers.
- **Slide topic (1 slide): Lab transition — Exercise 1** — switch from concept framing to hands-on baseline validation for surfaces, mode selection, and safety boundaries.

### 🔬 LAB: Exercise 1 — Stage 1 Baseline and Safety Signals

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (8 min) identifying surfaces, selecting a mode, and validating safety boundaries before continuing.

## 2. Guided Workflows: VS Code Chat, CLI, and Mode Selection (20 min)

### Key Points

- **Slide topic (1 slide): VS Code chat extension mechanics** — slash commands, participants, and `#` references give precise control over context and intent, with `#selection`/`#file` as preferred starting scopes for most tasks. **Usage Optimization**: scope tightly before expanding to workspace-wide reasoning.
- **Slide topic (1 slide): Copilot CLI orientation** — terminal-first workflows support command generation, explanation, and iterative execution for scripting and operational tasks where concise, actionable output matters. **AI Safety Moment**: generated commands must be reviewed before execution.
- **Slide topic (1 slide): Ask, Plan, Agent mode selection** — Ask supports understanding, Plan supports reviewed change proposals, and Agent supports iterative execution loops; mode should match task risk and reversibility. **AI Safety Moment**: higher-autonomy modes require stronger approval gates.
- **Slide topic (1 slide): Context discipline as performance lever** — prompt clarity and bounded inputs reduce drift, retries, and ambiguity across all interaction modes. **Usage Optimization**: better prompt contracts lower both latency and AIC spend.
- **Slide topic (1 slide): Lab transition — Exercise 2** — move from workflow patterns into guided Ask/Plan/Agent execution with scoped context.

### 🔬 LAB: Exercise 2 — Stage 2 Guided Workflow Repetition

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (8 min) running the same task across Ask, Plan, and Agent with scoped context.

## 3. Tokenomics and Model-Routing Decisions (20 min)

### Key Points

- **Slide topic (1 slide): Token fundamentals** — tokens represent prompt/input/output context across active and cached paths, so context size directly affects cost and quality stability. **Usage Optimization**: trim noise before sending context.
- **Slide topic (1 slide): AIC usage model** — AIC maps spend to real compute usage, making model choice, prompt size, and loop depth first-class engineering tradeoffs. **Usage Optimization**: treat AIC telemetry as workflow tuning feedback.
- **Slide topic (1 slide): Usage visibility and measurement** — session and monthly usage views expose hidden inefficiencies such as broad prompts and repetitive retries. **Usage Optimization**: use regular usage reviews to prevent avoidable overages.
- **Slide topic (1 slide): Model routing strategy** — fast models fit straightforward tasks, while reasoning models fit ambiguity-heavy architecture and debugging decisions. **Usage Optimization**: match model capability to task complexity.
- **Slide topic (1 slide): Rubber duck clarification pattern** — articulating the problem before execution often reveals assumptions and reduces expensive rework loops.
- **Slide topic (1 slide): Lab transition — Exercise 3** — apply token, AIC, and model-routing decisions in a side-by-side comparison workflow.

### 🔬 LAB: Exercise 3 — Stage 3 Optimization — Tokens, AIC, Models, and Context

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (7 min) comparing scoped versus broad prompts, model choices, and usage implications.

## 4. Context Windows, Autonomy Spectrum, and Custom Agents (20 min)

### Key Points

- **Slide topic (1 slide): Context window anatomy** — context windows combine instructions, history, references, and outputs, and degrade when sessions accumulate noise and compaction artifacts. **Usage Optimization**: reset or re-scope when context rot appears.
- **Slide topic (1 slide): Autonomy spectrum and delegation permissions** — autonomy should scale with reversibility and blast radius, from suggestion-only support to iterative execution loops. **AI Safety Moment**: high-impact tasks require explicit approvals and narrow permissions.
- **Slide topic (1 slide): Custom agent design** — custom agents package persona, instructions, permissions, and tools for domain workflows such as migrations or docs. **AI Safety Moment**: enforce least privilege and bounded responsibilities.
- **Slide topic (1 slide): Safety and optimization integration** — reusable constraints and standard guardrails improve both reliability and efficiency when encoded once and reused consistently.
- **Slide topic (1 slide): Lab transition — Exercise 4** — shift from delegation principles into a constrained custom-agent implementation drill.

### 🔬 LAB: Exercise 4 — Stage 4 Delegation — Custom Agent Guardrails

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 4 (7 min) creating a constrained custom-agent starter and testing one low-risk delegated task.

## 5. Wrap-up and Module 2 Handoff (15 min)

### Key Points

- **Slide topic (1 slide): Foundations outcome baseline** — this module sets default operating behaviors for trust, quality, and cost-aware execution across IDE, CLI, and cloud surfaces.
- **Slide topic (1 slide): Consistency over ad hoc prompting** — strong outcomes come from mode discipline, context hygiene, and explicit acceptance criteria instead of improvisation.
- **Slide topic (1 slide): Transition to Module 2** — Agentic builds on this baseline with instruction layering, memory strategy, tool orchestration, and repeatable autonomous control loops.

*Workshop guide for Module 1: Foundations — GitHub Copilot Developer Training*
