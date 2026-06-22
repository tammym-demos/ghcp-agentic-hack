# Module 1: Foundations — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability.
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography with light background.
> - Use light backgrounds for all slide styling (cover, section, content, comparison, and summary slides).
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.
> - Generate dedicated slides for the workshop title (`# Module ...`), `## Workshop Overview`, and `### Learning Objectives`; do not skip or merge these sections.
> - Do not summarize away source meaning: treat workshop wording as authoritative and keep the exact messaging wherever possible. Minor connector-word edits are allowed only to improve flow and readability.
> - Control slide layout deliberately so content remains readable and properly structured on-slide.
> - Generate visual imagery that directly represents the slide wording and reinforces the intended meaning.

**Duration**: 2 hours 30 minutes (150 min: 120 min content + 30 min lab)  
**Format**: Presentation + Hands-On  
**Audience**: Developers with basic GitHub Copilot exposure  
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

## Workshop Overview

This Foundations workshop introduces the core Copilot mental model before agentic scaling. The module starts with surfaces and trust boundaries, then moves into interaction modes, CLI operating controls, tokenomics, model routing, and context quality. It incorporates current platform capabilities such as `/chronicle`, auto model selection, configurable reasoning/context levels, and billing-aware usage choices. It closes with autonomy controls, governance boundaries, and AI-assisted development harness practices so learners leave with a safe, repeatable operating model for daily use.

### Learning Objectives

- Explain where Copilot lives across IDE, terminal, and cloud surfaces
- Use inline completions, inline chat, and Ask/Plan/Agent modes appropriately
- Use key Copilot CLI controls (`/settings`, `/chronicle`, `/security-review`) in safe workflows
- Interpret tokens, AIC usage, billing budgets, and model-routing tradeoffs for cost-aware execution
- Detect context rot and apply context window hygiene practices
- Apply least-privilege delegation, governance controls, and harness-based validation guardrails

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Foundations baseline: surfaces, trust, and interaction fundamentals | 24 min |
| 2 | Guided workflows: VS Code chat, CLI controls, and mode selection | 30 min |
| 3 | Tokenomics, billing controls, and model-routing decisions | 30 min |
| 4 | Context windows, autonomy spectrum, and AI development harness | 20 min |
| 5 | Wrap-up and Module 2 handoff | 16 min |
| — | Hands-on labs across four exercises | 30 min |

## 1. Foundations Baseline: Surfaces, Trust, and Interaction Fundamentals (24 min)

### Key Points

- **Slide topic (1 slide): Where GitHub Copilot lives** — Copilot spans IDEs, CLI workflows, and GitHub.com experiences through the Copilot App, letting developers move between coding, automation, and repository-level understanding with more consistent workflows across surfaces. **AI Safety Moment**: confirm org policy and access boundaries before using cloud or cross-repo context.
- **Slide topic (1 slide): Enterprise privacy and IP** — Business and Enterprise controls include policy-driven content boundaries, auditability, and configurable feature access, so teams can align usage with compliance and IP expectations. **AI Safety Moment**: frame all generated output as draft material requiring human review.
- **Slide topic (1 slide): Inline chat and code completions** — Completions accelerate flow authoring while inline chat supports scoped transformations such as refactors and type changes, giving two complementary interaction patterns for day-to-day work. **Usage Optimization**: choose completions for low-token flow edits and inline chat for bounded transformations.
- **Slide topic (1 slide): Baseline operating posture** — safe, effective GH Copilot usage starts with least-autonomy defaults, scoped prompts, and explicit acceptance criteria that keep accountability with human reviewers.
- **Slide topic (1 slide): Lab transition — Exercise 1** — switch from concept framing to hands-on baseline validation for surfaces, mode selection, and safety boundaries.

### 🔬 LAB: Exercise 1 — Stage 1 Baseline and Governance Signals

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (8 min) identifying surfaces, selecting a mode, and validating safety boundaries before continuing.

## 2. Guided Workflows: VS Code Chat, CLI Controls, and Mode Selection (30 min)

### Key Points

- **Slide topic (1 slide): VS Code chat extension mechanics** — slash commands, participants, and `#` references give precise control over context and intent, with `#selection`/`#file` as preferred starting scopes for most tasks. **Usage Optimization**: scope tightly before expanding to workspace-wide reasoning.
- **Slide topic (1 slide): Copilot CLI orientation and control plane** — terminal-first workflows support command generation, explanation, and iterative execution for scripting and operational tasks where concise, actionable output matters. Include `/settings` as the unified configuration surface and `/security-review` as a pre-commit security check for local changes. **AI Safety Moment**: generated commands must be reviewed before execution.
- **Slide topic (1 slide): Agents** — built-in agents in GitHub Copilot include Plan and Agent experiences that move from structured change planning to iterative execution loops. This slide should focus on when to use Plan for reviewed change proposals versus Agent for multi-step delegated work. **AI Safety Moment**: higher-autonomy agent use requires stronger approval gates.
- **Slide topic (1 slide): Governance controls for safer execution** — introduce enterprise and organization controls that reduce accidental risk, including managed settings that can disable auto-approval/bypass behavior and content exclusion boundaries for code review and agent context. **AI Safety Moment**: align local behavior with org policy before enabling higher autonomy.
- **Slide topic (1 slide): Context discipline as performance lever** — prompt clarity and bounded inputs reduce drift, retries, and ambiguity across all interaction modes. **Usage Optimization**: better prompt contracts lower both latency and AIC spend.
- **Slide topic (1 slide): /chronicle — session memory, tips, and cross-surface handoff** — `/chronicle` generates a structured, chronological summary of key session activity: decisions made, files changed, commands run, and open threads. Emphasize that it supports cross-surface workflows (CLI, IDE, app, and code-review contexts), making it practical for handoff, standups, and session restart recovery. Convert the summary into two explicit takeaways lists: **Tips** (quality and workflow practices) and **Cost-savings tips** (scope reduction, model routing, and retry avoidance). **Usage Optimization**: run `/chronicle` at task boundaries to reduce expensive context reconstruction on restart and to preserve reusable cost controls.
- **Slide topic (1 slide): Lab transition — Exercise 2** — move from workflow patterns into guided Ask/Plan/Agent execution with scoped context.

### 🔬 LAB: Exercise 2 — Stage 2 Guided Workflow Repetition

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (8 min) running the same task across Ask, Plan, and Agent with scoped context.

## 3. Tokenomics, Billing Controls, and Model-Routing Decisions (30 min)

### Key Points

- **Slide topic (1 slide): Tokenomics** — tokens represent prompt/input/output context across active and cached paths, so context size directly affects cost and quality stability. **Usage Optimization**: trim noise before sending context.
- **Slide topic (1 slide): AIC usage model and budget controls** — AIC (AI Consumption) maps spend to measured token and model usage (input, output, and cached tokens with model-specific rates), making model choice, prompt size, and loop depth first-class engineering tradeoffs. Add user-level budgets and plan limits as practical guardrails teams should set before scaling usage. **Usage Optimization**: treat AIC telemetry as workflow tuning feedback.
- **Slide topic (1 slide): Billing implications of workflow choices** — usage-based billing is now central to day-to-day decisions, and some workflows (for example Copilot code review) can consume both AI credits and GitHub Actions minutes. Teach learners to treat feature choice as a cost decision, not only a UX decision.
- **Slide topic (1 slide): Usage visibility and measurement** — session and monthly usage views expose hidden inefficiencies such as broad prompts and repetitive retries. **Usage Optimization**: use regular usage reviews to prevent avoidable overages.
- **Slide topic (1 slide): Model routing strategy with Auto mode** — fast models fit straightforward tasks, while reasoning models fit ambiguity-heavy architecture and debugging decisions. Include Auto model selection as a default routing option that can improve cost efficiency while preserving quality for many tasks. **Usage Optimization**: match model capability to task complexity.
- **Slide topic (1 slide): Larger context windows and configurable reasoning** — advanced context and reasoning settings improve deep multi-file tasks but increase credit usage; teach when to stay at defaults and when to escalate intentionally.
- **Slide topic (1 slide): /chronicle as a cost-savings evidence loop** — run `/chronicle` after optimization work to capture what reduced spend (tighter scope, fewer retries, right-sized models) and what increased spend (broad context, unnecessary escalations). Reuse this artifact as a recurring **Cost-savings tips** checklist for future sessions.
- **Slide topic (1 slide): Rubber duck clarification pattern** — articulating the problem before execution often reveals assumptions and reduces expensive rework loops.
- **Slide topic (1 slide): Lab transition — Exercise 3** — apply token, AIC, and model-routing decisions in a side-by-side comparison workflow.

### 🔬 LAB: Exercise 3 — Stage 3 Optimization — Tokens, AIC, Billing, Models, and Context

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (7 min) comparing scoped versus broad prompts, model choices, and billing-aware usage implications.

## 4. Context Windows, Autonomy Spectrum, and AI Development Harness (20 min)

### Key Points

- **Slide topic (1 slide): Context window anatomy** — context windows combine instructions, history, references, and outputs, and degrade when sessions accumulate noise and compaction artifacts. **Usage Optimization**: reset or re-scope when context rot appears.
- **Slide topic (1 slide): Autonomy spectrum and delegation permissions** — autonomy should scale with reversibility and blast radius, from suggestion-only support to iterative execution loops. **AI Safety Moment**: high-impact tasks require explicit approvals and narrow permissions.
- **Slide topic (1 slide): Secure execution environments and discovery** — introduce local/cloud sandboxes, Copilot app execution contexts, and agent/resource discovery patterns as mechanisms to scale capability without sacrificing control. **AI Safety Moment**: isolate execution and enforce policy before broad tool access.
- **Slide topic (1 slide): Memory and policy boundaries** — distinguish user-level preferences from repository-level facts and reinforce admin-controlled governance boundaries for what can be stored, reused, exported, or excluded.
- **Slide topic (1 slide): Harness** — a harness is a repeatable evaluation-and-validation setup for AI-assisted development: fixed task prompts, controlled context, representative fixtures, automated checks/tests, and explicit pass/fail criteria. This aligns with both GitHub Copilot and Claude workflows by letting teams benchmark outputs, compare model/prompt variants, catch regressions early, and gate merges on measurable quality.
- **Slide topic (1 slide): Safety and optimization integration** — reusable constraints and standard guardrails improve both reliability and efficiency when encoded once and reused consistently.
- **Slide topic (1 slide): Lab transition — Exercise 4** — shift from delegation principles into a constrained harness-and-guardrail implementation drill.

### 🔬 LAB: Exercise 4 — Stage 4 Delegation — Custom Agent Guardrails

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 4 (7 min) creating a constrained custom-agent starter and applying security guardrails to one low-risk delegated task.

## 5. Wrap-up and Module 2 Handoff (16 min)

### Key Points

- **Slide topic (1 slide): Foundations outcome baseline** — this module sets default operating behaviors for trust, quality, and cost-aware execution across IDE, CLI, and cloud surfaces.
- **Slide topic (1 slide): Consistency over ad hoc prompting** — strong outcomes come from mode discipline, context hygiene, explicit acceptance criteria, and budget-aware defaults instead of improvisation.
- **Slide topic (1 slide): Transition to Module 2** — Agentic builds on this baseline with instruction layering, memory strategy, tool orchestration, and repeatable autonomous control loops.

*Workshop guide for Module 1: Foundations — GitHub Copilot Developer Training*
