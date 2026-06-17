# Module 2: Intermediate (Agentic) — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability.
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography.
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Hands-On  
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

- **Slide topic (1 slide): Instruction-first operation** — durable standards should live in versioned instruction files so teams do not restate architecture and review expectations each session. **AI Safety Moment**: encode non-negotiable policy in instructions, not chat.
- **Slide topic (1 slide): Memory purpose and limits** — memory improves continuity by retaining stable workflow facts and preferences across sessions. **AI Safety Moment**: do not persist sensitive or regulated data.
- **Slide topic (1 slide): Context hierarchy and precedence** — prompts, scoped instructions, repo guidance, and memory resolve through an ordered stack that determines runtime behavior.
- **Slide topic (1 slide): Agentic transition marker** — intermediate maturity shifts from one-off prompting to designed control loops with explicit constraints and escalation paths.

## 2. Instructions, Memory, and Prompt Contract Design (25 min)

### Key Points

- **Slide topic (1 slide): Instructions as durable control surface** — repository and scoped instruction files define expected behavior per context and file pattern, turning Copilot into a team-aligned collaborator.
- **Slide topic (1 slide): Memory as continuity layer** — memory carries forward reusable context that does not belong in policy files. **AI Safety Moment**: keep memory curation intentional and non-sensitive.
- **Slide topic (1 slide): Strong prompt anatomy** — task, scope, constraints, definition of done, and off-ramp reduce ambiguity and improve autonomous execution quality. **Usage Optimization**: strong prompt contracts reduce retries.
- **Slide topic (1 slide): Instruction layering stack** — org, repo, scoped files, user settings, and runtime prompts compose into one behavior model. **AI Safety Moment**: avoid contradictions that weaken policy intent.
- **Slide topic (1 slide): Structured prompts as efficiency multiplier** — stable instructions plus clear prompts improve first-pass outcomes and shorten correction loops. **Usage Optimization**: lower AIC with fewer rework turns.
- **Slide topic (1 slide): Lab transition — Exercise 1** — move from prompt/instruction design into a structured prompt-contract execution drill.

### 🔬 LAB: Exercise 1 — Stage 5 CLI Power-User Prompt Contract

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) writing and running a structured prompt contract with explicit acceptance gates.

## 3. Agent, Skill, and Loop Mechanics (25 min)

### Key Points

- **Slide topic (1 slide): What is an agent** — an agent plans, acts, observes, and adapts across multiple steps to complete bounded objectives. **AI Safety Moment**: action-capable systems need explicit oversight and stop conditions.
- **Slide topic (1 slide): What is a skill** — skills are reusable scoped capabilities for concrete actions like search, edits, and command execution. **AI Safety Moment**: treat high-impact skills as privileged capabilities.
- **Slide topic (1 slide): When to use direct skills versus agents** — deterministic low-branching tasks fit direct tools, while adaptive workflows fit agent orchestration. **Usage Optimization**: avoid over-delegating simple tasks.
- **Slide topic (1 slide): Anatomy of the agentic loop** — prompt, decide, act, observe, and correct as a repeatable control cycle. **Usage Optimization**: bounded loops with termination criteria reduce token burn.
- **Slide topic (1 slide): Tooling as execution interface** — tools bridge reasoning to action across files, terminals, and external systems. **AI Safety Moment**: require auditability and constrained parameters for risky tools.
- **Slide topic (1 slide): Lab transition — Exercise 2** — switch from agent/skill theory to a role-based handoff loop with explicit checkpoints.

### 🔬 LAB: Exercise 2 — Stage 6 Multi-Agent Handoff Drill

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) by running a role-based handoff with explicit loop checkpoints.

## 4. Tool Strategy, Background/Cloud Agents, and Scaling Controls (20 min)

### Key Points

- **Slide topic (1 slide): Background versus cloud agents** — choose execution venue based on dependencies, duration, and observability requirements. **Usage Optimization**: use async/cloud paths for genuinely long-running parallelizable tasks.
- **Slide topic (1 slide): Boilerplate with `/init`** — scaffold commands standardize project setup and reduce repetitive prompt overhead. **Usage Optimization**: start from reusable templates to reduce setup churn.
- **Slide topic (1 slide): Optimization controls as operating system** — model routing, context budgeting, permission boundaries, and validation cadence must be treated as default controls, not optional extras.
- **Slide topic (1 slide): Readiness for scale** — scale autonomy only after proving repeatability with checklists, quality thresholds, and rollback-ready governance. **AI Safety Moment**: no scale-up without control evidence.
- **Slide topic (1 slide): Lab transition — Exercise 3** — apply execution-strategy controls to a Stage 6-to-Stage 7 guardrail mapping exercise.

### 🔬 LAB: Exercise 3 — Stage 6 to Stage 7 Guardrail Mapping

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) mapping an execution workflow to guardrail and readiness criteria.

## 5. Wrap-up and Advanced Handoff (10 min)

### Key Points

- **Slide topic (1 slide): Intermediate module outcome** — the goal is reproducible control systems across people, sessions, and repositories, not one-off prompt improvement.
- **Slide topic (1 slide): Quality equation for agentic workflows** — high-quality outcomes require clear prompt contracts, scoped tool access, and explicit verification loops.
- **Slide topic (1 slide): Transition to Advanced** — Module 3 extends these controls into multiagent orchestration, integration governance, and deployment-ready operations.

*Workshop guide for Module 2: Intermediate (Agentic) — GitHub Copilot Developer Training*
