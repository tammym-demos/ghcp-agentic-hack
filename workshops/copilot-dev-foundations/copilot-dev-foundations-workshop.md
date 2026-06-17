# Module 1: Foundations — Workshop Guide

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers with basic GitHub Copilot exposure  
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

## Workshop Overview

This Foundations workshop introduces the core Copilot mental model before agentic scaling. The module starts with surfaces and trust boundaries, then moves into interaction modes, token economics, model routing, and context quality. It closes with autonomy controls and custom agent basics so learners leave with a safe default operating model for daily use.

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

- **Where GitHub Copilot lives**: IDE, CLI, GitHub.com, and GitHub Copilot App workflows.
- **Enterprise privacy and IP**: policy boundaries, content exclusion, and review accountability.
- **Inline chat and code completions**: when to stay in flow versus when to issue explicit instructions.
- **AI safety framing**: generated output is draft material that requires human acceptance.

### 🛡️ Safety Moment

- Confirm repository and org policy scope before sharing sensitive code context.
- Treat every generated suggestion as untrusted until reviewed against team standards.
- Keep ownership explicit: humans are accountable for correctness, security, and compliance.

### 🔬 LAB: Exercise 1 — Stage 1 Baseline and Safety Signals

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (8 min) identifying surfaces, selecting a mode, and validating safety boundaries before continuing.

## 2. Guided Workflows: VS Code Chat, CLI, and Mode Selection (20 min)

### Key Points

- **VS Code chat extension**: slash commands, participants, and scoped references with `#file` and `#selection`.
- **Copilot CLI orientation**: install path and terminal-first interactions for fast operational workflows.
- **Modes: Ask, Plan, Agent**: selecting autonomy based on reversibility, risk, and task ambiguity.
- **Usage optimization**: tighter context and clearer prompts reduce retries and token waste.

### 🛡️ Safety Moment

- Require command review before executing generated terminal instructions.
- Limit scope before enabling broader workspace analysis.
- Use explicit approval checkpoints for multi-file or tool-driven edits.

### 🖥️ Demo: IDE-to-CLI Workflow Handoff

1. Run a scoped Ask prompt using `#selection`.
2. Reframe the same task in Plan mode with constraints and definition of done.
3. Execute a CLI prompt and compare result quality and speed with IDE chat.

### 💡 Optimization Tip: Scope Before Autonomy

- Start with `#selection` or `#file` before `@workspace`.
- Prefer Ask for understanding and Plan for reviewed edits.
- Use Agent mode only when execution steps are truly required.

### 🔬 LAB: Exercise 2 — Stage 2 Guided Workflow Repetition

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (8 min) running the same task across Ask, Plan, and Agent with scoped context.

## 3. Token Economics and Model-Routing Decisions (20 min)

### Key Points

- **Token fundamentals**: input, output, and cache token behavior.
- **AIC usage model**: practical cost implications of context size, model choice, and loop length.
- **Usage visibility**: session-level and monthly consumption tracking.
- **Model routing**: matching fast versus reasoning models to task complexity.
- **Rubber duck pattern**: structured clarification before edits to prevent expensive rework.

### 🛡️ Safety Moment

- Cost optimization must never replace required testing or security checks.
- Large prompts can bury critical constraints and increase acceptance risk.
- Usage pressure should not justify skipping review gates.

### 🖥️ Demo: Cost-to-Quality Tradeoff

1. Compare a broad prompt to a scoped prompt for the same task.
2. Run the task with a faster model and a reasoning model.
3. Review resulting token usage and discuss decision criteria.

### 💡 AIC Optimization Tip: Spend Intentionally

- Use the smallest sufficient model for the task.
- Keep context narrow and explicit.
- Track repeated retries as a cost signal that prompt structure needs improvement.

### 🔬 LAB: Exercise 3 — Stage 3 Optimization — Tokens, AIC, Models, and Context

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (7 min) comparing scoped versus broad prompts, model choices, and usage implications.

## 4. Context Windows, Autonomy Spectrum, and Custom Agents (20 min)

### Key Points

- **Context window anatomy**: compaction, signal loss, and context rot.
- **Autonomy spectrum and delegation permissions**: calibrating control by blast radius.
- **Custom agents**: purpose-built instructions, scoped tools, and bounded responsibilities.
- **Safety and optimization integration**: reliable outcomes come from both guardrails and efficient prompting.

### 🛡️ Safety Moment

- Start new threads when context rot appears instead of forcing degraded continuity.
- Keep tool permissions minimal and auditable for delegated workflows.
- Require escalation paths for ambiguity or policy conflicts.

### 🖥️ Demo: Guardrailed Delegation

1. Show a constrained agent definition with explicit boundaries.
2. Run one low-risk delegated task.
3. Review outputs with a go/no-go acceptance checklist.

### 💡 Optimization Tip: Encode Once, Reuse Often

- Put recurring constraints into instructions and agent definitions.
- Keep agents specialized rather than all-purpose.
- Reuse prompt templates that already pass team review standards.

### 🔬 LAB: Exercise 4 — Stage 4 Delegation — Custom Agent Guardrails

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 4 (7 min) creating a constrained custom-agent starter and testing one low-risk delegated task.

## 5. Wrap-up and Module 2 Handoff (15 min)

### Key Points

- Foundations establishes the safety, cost, and quality baseline for all later modules.
- Strong outcomes depend on combining mode selection, context discipline, and explicit review.
- Module 2 (Agentic) extends this baseline into instructions, memory, tools, and orchestration loops.

*Workshop guide for Module 1: Foundations — GitHub Copilot Developer Training*
