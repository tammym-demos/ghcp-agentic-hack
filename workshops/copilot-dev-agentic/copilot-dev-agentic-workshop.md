# Module 2: Intermediate (Agentic) — Workshop Guide

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers who completed Foundations  
**Prerequisites**: Module 1 completion and familiarity with Ask/Plan/Agent mode

## Workshop Overview

This Intermediate module maps directly to the Agentic operating layer: durable instructions, memory behavior, prompt contracts, tool choices, and controlled execution loops. The emphasis is not just getting answers, but designing repeatable, auditable workflows where autonomy is deliberate. Learners finish with a practical framework for when to stay deterministic, when to delegate, and how to keep cost and risk in balance.

### Learning Objectives

- Build instruction and memory strategies that reduce drift across sessions
- Write strong prompt contracts with explicit scope, constraints, and off-ramps
- Explain agents, skills, tools, and the anatomy of the agentic loop
- Choose between direct tools, background agents, and cloud agents intentionally
- Use `/init`, instruction layering, and optimization controls for repeatable delivery

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Intermediate operating model and context hierarchy | 10 min |
| 2 | Instructions, memory, and prompt contract design | 25 min |
| 3 | Agent, skill, and loop mechanics | 25 min |
| 4 | Tool strategy, background/cloud agents, and scaling controls | 20 min |
| 5 | Wrap-up and Advanced handoff | 10 min |
| — | Hands-on labs across three exercises | 30 min |

## 1. Intermediate Operating Model and Context Hierarchy (10 min)

### Key Points

- **Instruction-first operation**: durable standards belong in versioned instruction files.
- **Memory purpose**: persist useful preferences and facts without storing sensitive data.
- **Context hierarchy**: prompt, file-level instructions, repo instructions, memory, then model defaults.
- **Agentic transition**: move from one-off prompting to repeatable control systems.

### 🛡️ Safety Moment

- Put non-negotiable policy into instructions, not ad hoc chat reminders.
- Treat memory as convenience context, not a secure vault.
- Resolve instruction-versus-memory conflicts in favor of explicit policy.

## 2. Instructions, Memory, and Prompt Contract Design (25 min)

### Key Points

- **Instructions**: repository and scoped guidance that survives sessions.
- **Memory**: reusable preferences that reduce repetitive setup prompts.
- **Strong prompt anatomy**: task, scope, constraints, definition of done, and off-ramp.
- **Instruction layering stack**: org, repo, scoped files, user settings, and runtime prompt.
- **Usage optimization**: well-structured prompts reduce retries and rework.

### 🛡️ Safety Moment

- Include explicit escalation behavior when the model hits ambiguity.
- Keep prompts bounded to avoid accidental overreach into unrelated code.
- Require visible acceptance criteria before execution begins.

### 🖥️ Demo: Prompt Contract and Layering Walkthrough

1. Draft a weak prompt and identify missing contract elements.
2. Rewrite with task, scope, constraints, definition of done, and off-ramp.
3. Show how instruction layers change response behavior without rewriting the task.

### 💡 Optimization Tip: Structure Beats Volume

- Short, explicit prompts usually outperform long narrative prompts.
- Reuse prompt templates for recurring workflows.
- Capture stable constraints in instructions instead of repeating them per request.

### 🔬 LAB: Exercise 1 — Stage 5 CLI Power-User Prompt Contract

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) writing and running a structured prompt contract with explicit acceptance gates.

## 3. Agent, Skill, and Loop Mechanics (25 min)

### Key Points

- **What is an agent**: a system that plans, acts, observes, and adapts.
- **What is a skill**: a scoped capability that an agent invokes to do work.
- **When to use one or the other**: deterministic actions via direct skills, adaptive tasks via agents.
- **Anatomy of the agentic loop**: prompt -> think -> act -> observe -> repeat.
- **What are tools**: concrete action interfaces that convert intent into execution.

### 🛡️ Safety Moment

- Treat each tool invocation as a policy checkpoint.
- Separate implementation and verification to reduce blind acceptance.
- Define stop conditions so loops do not run indefinitely.

### 🖥️ Demo: Agentic Loop in a Bounded Task

1. Solve a small task with direct tool calls only.
2. Solve the same task with an agent loop and compare behavior.
3. Apply explicit stop conditions and verify final acceptance criteria.

### 💡 Optimization Tip: Delegate Only When Adaptation Adds Value

- Prefer direct tools for predictable, low-branching tasks.
- Use agents when decision-making across steps is required.
- Limit loop depth with clear completion criteria.

### 🔬 LAB: Exercise 2 — Stage 6 Multi-Agent Handoff Drill

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) by running a role-based handoff with explicit loop checkpoints.

## 4. Tool Strategy, Background/Cloud Agents, and Scaling Controls (20 min)

### Key Points

- **Background and cloud agents**: choose execution location based on duration, dependencies, and audit needs.
- **Boilerplate with `/init`**: fast scaffolding with consistent standards.
- **Optimization controls**: model routing, token discipline, and constrained execution paths.
- **Readiness for scale**: stable checklists before expanding autonomy.

### 🛡️ Safety Moment

- Do not move tasks to cloud or background execution without clear boundaries.
- Keep permission scopes minimal and aligned with task intent.
- Require rollback and exception paths before scaling.

### 🖥️ Demo: Execution Strategy Decision Matrix

1. Compare direct local execution, background execution, and cloud delegation.
2. Scaffold a starter using `/init` and inspect generated defaults.
3. Apply a readiness checklist to decide go/no-go for delegated execution.

### 💡 AIC Optimization Tip: Match Execution Mode to Workload

- Keep short tasks interactive and local.
- Use background or cloud only for long-running, parallelizable work.
- Reuse checklists to reduce costly retries and inconsistent approvals.

### 🔬 LAB: Exercise 3 — Stage 6 to Stage 7 Guardrail Mapping

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) mapping an execution workflow to guardrail and readiness criteria.

## 5. Wrap-up and Advanced Handoff (10 min)

### Key Points

- Intermediate (Agentic) focuses on reproducible control, not ad hoc prompting.
- High-quality outcomes depend on prompt contracts, scoped tools, and explicit review loops.
- Module 3 (Advanced) extends these practices into multiagent architecture and deployment operations.

*Workshop guide for Module 2: Intermediate (Agentic) — GitHub Copilot Developer Training*
