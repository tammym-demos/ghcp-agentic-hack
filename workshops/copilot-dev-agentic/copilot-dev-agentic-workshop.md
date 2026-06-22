# Module 2: Intermediate (Agentic) — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability with light background.
> - Use light backgrounds for all slide styling (cover, section, content, comparison, and summary slides).
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography.
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.
> - Generate dedicated slides for the workshop title (`# Module ...`), `## Workshop Overview`, and `### Learning Objectives`; do not skip or merge these sections.
> - Do not summarize away source meaning: treat workshop wording as authoritative and keep the exact messaging wherever possible. Minor connector-word edits are allowed only to improve flow and readability.
> - Control slide layout deliberately so content remains readable and properly structured on-slide.
> - Generate visual imagery that directly represents the slide wording and reinforces the intended meaning.

**Duration**: 2 hours 10 minutes (130 min: 100 min content + 30 min lab)  
**Format**: Presentation + Hands-On  
**Audience**: Developers who completed Foundations  
**Prerequisites**: Module 1 completion and familiarity with Ask/Plan/Agent mode

## Workshop Overview

This Intermediate module maps directly to the Agentic operating layer: standing instructions, memory behavior, skill design, tool choices, and controlled execution loops. It explicitly builds on Foundations by turning the Stage 3 reusable checklist or prompt asset and the Stage 4 delegation guardrails into more repeatable Stage 5 and Stage 6 workflows. The emphasis is not just getting answers, but designing repeatable, auditable workflows where autonomy is deliberate. Learners finish with a practical framework for when to stay deterministic, when to delegate, and how to keep cost and risk in balance.

### Learning Objectives

- Build instruction and memory strategies that reduce drift across sessions
- Design strong skills with explicit scope, constraints, and off-ramps
- Explain agents, skills, tools, and the anatomy of the agentic loop
- Choose between direct tools, background agents, and cloud agents intentionally
- Use `/init`, instruction layering, and optimization controls for repeatable delivery

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | How Copilot uses instructions, memory, and context | 12 min |
| 2 | Instructions, memory, and skill design | 28 min |
| 3 | Agent, skill, and loop mechanics | 28 min |
| 4 | Tool strategy, background/cloud agents, and scaling controls | 22 min |
| 5 | Wrap-up and Advanced handoff | 10 min |
| — | Hands-on labs across three exercises | 30 min |

## 1. How Copilot Uses Instructions, Memory, and Context (12 min)

### Key Points

- **Slide topic (1 slide): Instructions** — show instructions as standing guidelines that define how Copilot should behave in a team, using familiar examples such as coding standards, review expectations, architecture boundaries, and security rules stored in versioned files. Emphasize that good instructions reduce repeated ad hoc requests and make outputs more predictable from session to session. **AI Safety Moment**: encode non-negotiable policy in instructions, not chat.
- **Slide topic (1 slide): Memory** — explain memory as the continuity layer that carries forward stable facts and preferences, such as preferred testing commands or repository conventions, when that context does not belong in policy files. Contrast useful operational memory with risky content such as secrets, regulated data, or one-off sensitive details. **AI Safety Moment**: do not persist sensitive or regulated data.
- **Slide topic (1 slide): Context hierarchy — memory versus instructions** — walk through how the current task request, scoped instructions, repository guidance, and memory interact during a real task so learners can see which source should win when guidance conflicts. Make clear that memory should complement instructions by adding reusable context, not replace durable standards. **Usage Optimization**: place durable standards in instructions and reserve memory for reusable context that should survive across sessions.
- **Slide topic (1 slide): Instruction layering stack** — explain the precedence model across organization guidance, repository instructions, scoped files, user settings, and the current task request, including why the same task can behave differently in different folders or repositories. Help learners see the stack as a practical debugging tool for inconsistent agent behavior.

## 2. Instructions, Memory, and Skill Design (28 min)

### Key Points

- **Slide topic (1 slide): What belongs in instructions, memory, and skills?** — define the role of each layer with human examples learners can relate to: instructions hold team rules such as review expectations or security boundaries, memory stores stable reusable facts such as preferred test commands or repository conventions, and skills capture repeatable task patterns such as a safe refactor or bug-fix flow. Use this as the bridge from Foundations: the Stage 3 checklist becomes more reusable here, while the Stage 4 guardrails continue to shape what the skill is allowed to do. Give learners a simple litmus test: if it should apply broadly, it is probably an instruction; if it is a reusable fact, it may belong in memory; if it describes how to do work repeatedly, it is a skill.
- **Slide topic (1 slide): One example across all three layers** — walk through one concrete example, such as adding test coverage for a changed component, and show how the same workflow is split across layers: the instruction says tests are required, memory recalls the team command or folder pattern, and the skill defines the repeatable execution steps and stop conditions. This helps learners see that the layers complement each other instead of competing.
- **Slide topic (1 slide): Anatomy of a well-scoped skill** — break down a skill into target scope, task, constraints, definition of done, and off-ramp, then explain what failure looks like when one of those parts is missing. Give relatable examples such as a refactor skill that lacks file boundaries or a bug-fix skill with no acceptance criteria. **Usage Optimization**: well-scoped skills reduce retries.
- **Slide topic (1 slide): Decision test for safer execution** — show how explicit acceptance gates, escalation paths, and stop conditions help a team decide whether guidance belongs in instructions, memory, a reusable skill, or just the current task request. Learners should see how phrases like "stop if tests fail" or "ask before changing dependencies" create safer delegated execution and reduce rework. **Usage Optimization**: lower AIC with fewer rework turns.
- **Slide topic (1 slide): Lab transition — Exercise 1** — frame the lab as a chance to classify guidance into instructions, memory, and skill design before turning it into a real CLI workflow with explicit success criteria, stop conditions, and verification steps.

### 🔬 LAB: Exercise 1 — Stage 5 CLI Power-User Skill Contract

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) classifying guidance into instructions, memory, and a structured skill contract before running the task with explicit acceptance gates.

## 3. Agent, Skill, and Loop Mechanics (28 min)

### Key Points

- **Slide topic (1 slide): What is an agent** — define an agent as a bounded worker that can plan, act, observe results, and adapt over multiple steps to complete an objective such as fixing a bug, preparing a summary, or investigating a failing test. Emphasize that the value comes from iterative execution, not just better text generation. **AI Safety Moment**: action-capable systems need explicit oversight and stop conditions.
- **Slide topic (1 slide): Runtime decision model — human, tool, or agent?** — compare simple deterministic tasks, like locating a symbol or editing a known file, with adaptive tasks that involve branching choices, ambiguous evidence, or multiple checkpoints. Position skills as the reusable patterns that shape execution, but keep the runtime focus on deciding whether the work should stay human-led, move through direct tools, or justify a multi-step agent loop. Tie this back to Foundations by showing that Module 1 introduced guarded delegation, while this section extends it into explicit runtime handoffs and evidence-driven execution choices. **Usage Optimization**: avoid over-delegating simple tasks that are faster and cheaper with direct skills and tools.
- **Slide topic (1 slide): Anatomy of an agentic loop** — describe the control cycle of request, decide, act, observe, and correct, including where humans should inspect outputs, verify evidence, and stop runaway behavior. Make explicit where loop boundaries should be set before execution begins so learners can see that oversight is designed in, not added after something goes wrong. **Usage Optimization**: bounded loops with termination criteria reduce token burn.
- **Slide topic (1 slide): Verification artifacts and handoff evidence** — elaborate on what good runtime evidence looks like before a handoff or acceptance step: diffs, test results, rationale, logs, unresolved risks, and a clear statement of what changed. This gives learners a concrete checklist for deciding whether an agent completed useful work or simply produced plausible-looking output. **AI Safety Moment**: require evidence before trust.
- **Slide topic (1 slide): What are tools and when to use a tool** — present tools as the bridge from reasoning to action across files, terminals, and external systems, and explain that they are best for concrete, auditable operations with visible inputs and outputs. Include examples such as searching code, running tests, or editing a known file directly instead of spawning a larger workflow. **AI Safety Moment**: require constrained parameters and traceability for risky tools.
- **Slide topic (1 slide): Lab transition — Exercise 2** — position the lab as a practical handoff exercise where learners decide what stays human-led, what gets delegated, and what evidence must travel with the handoff.

### 🔬 LAB: Exercise 2 — Stage 6 Multi-Agent Handoff Drill

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) by running a role-based handoff with explicit loop checkpoints.

## 4. Tool Strategy, Background/Cloud Agents, and Scaling Controls (22 min)

### Key Points

- **Slide topic (1 slide): Background and cloud agents — when to use them** — explain the tradeoffs between local synchronous work, background tasks, and cloud agents by using relatable scenarios such as long-running builds, parallel research, or isolated execution with different dependencies. Help learners choose based on duration, observability, environment needs, and whether they still have meaningful parallel work to do. **Usage Optimization**: use async or cloud paths only for genuinely long-running, parallelizable tasks.
- **Slide topic (1 slide): Boilerplate with `/init`** — show `/init` as a practical accelerator for creating reusable setup patterns, starter guidance, or repo scaffolding that teams would otherwise keep rewriting by hand. **Usage Optimization**: start from reusable templates to reduce setup churn.
- **Slide topic (1 slide): Optimization controls** — make model routing, context budgeting, permission boundaries, and validation cadence feel like operational dials teams can tune for speed, quality, and cost rather than abstract settings. Explain how the wrong defaults create drift, overspending, or unsafe autonomy.
- **Slide topic (1 slide): Best practices for safe and efficient AI workflows** — combine least-privilege execution, explicit approval gates, narrow scope, and regular verification into a simple operating posture teams can reuse across repositories and sessions. **AI Safety Moment**: no scale-up without control evidence.
- **Slide topic (1 slide): Lab transition — Exercise 3** — frame the lab as a mapping exercise where learners connect execution choices to guardrails, readiness checks, and scale-up criteria before broader rollout.

### 🔬 LAB: Exercise 3 — Stage 6 to Stage 7 Guardrail Mapping

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) mapping an execution workflow to guardrail and readiness criteria.

## 5. Wrap-up and Advanced Handoff (10 min)

### Key Points

- **Slide topic (1 slide): Intermediate module outcome** — restate that the purpose of this module is to help teams move from ad hoc requests to reproducible control systems that work across people, sessions, and repositories. Learners should leave with a clearer operating model, not just a list of tips.
- **Slide topic (1 slide): Quality equation for agentic workflows** — summarize the formula for reliable outcomes: clear skill contracts, scoped tool access, explicit verification loops, and governance-aware execution choices. Make the point that better autonomy depends on better controls.
- **Slide topic (1 slide): Transition to Advanced** — position Module 3 as the next step where these same foundations are applied to multiagent orchestration, integration governance, debugging, and deployment-ready operations.

*Workshop guide for Module 2: Intermediate (Agentic) — GitHub Copilot Developer Training*
