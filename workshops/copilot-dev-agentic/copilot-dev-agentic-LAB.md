# Module 2: Agentic Content Refresh — Hands-On Lab

## Overview

This lab extends the **Copilot Quest starter** into a playable **Stage 5-6 Workflow Kit**. Use the instructions, prompt template, and custom agent from Module 1 as the starting point, then add CLI precision, multi-agent handoffs, and Stage 7 readiness checks.

- **Stage 5**: CLI power-user precision with controlled autonomy
- **Stage 6**: Multi-agent orchestration with role-based handoffs
- **Stage 6 → 7 bridge**: readiness guardrails before operational scale

- **Total time**: ~30 minutes
- **Prerequisites**:
  - Module 1 completion
  - VS Code with GitHub Copilot
  - Local repository with `.github/` folder access

## Exercise 1: Stage 5 CLI Power-User Prompt Contract

**⏱️ Time**: 10 min  
**📋 Objective**: Execute one Stage 5 task using explicit prompt contract and direct-vs-delegated decisioning

1. Pick one deterministic coding task in your repo (small, single-file preferred) that improves the game loop, scoring, or guess validation.
2. Extend the prompt template from Module 1 by adding task, scope, constraints, definition of done, and off-ramp.
3. Run the task once using direct tool-style execution.
4. Run the same task with delegated/agent-style execution.
5. Compare output quality, review burden, and token/tool overhead.
6. Save the prompt as a reusable Stage 5 template for Copilot Quest.

**🛡️ Safety checkpoint**: Reject any output that exceeds scope or lacks clear stop-condition behavior.

### ✅ Success Criteria

- ✅ Used the full Stage 5 prompt contract fields
- ✅ Completed a direct-vs-delegated comparison on the same task
- ✅ Documented one explicit acceptance gate before merge
- ✅ Added a reusable Stage 5 prompt asset to the kit

## Exercise 2: Stage 6 Multi-Agent Handoff Drill

**⏱️ Time**: 10 min  
**📋 Objective**: Orchestrate a two-role multi-agent workflow with verifiable handoff contracts

1. Choose a task that can be split into two independent subtasks (for example: guess feedback and test coverage).
2. Define two roles (for example: implementer and verifier).
3. For each role, write expected inputs, outputs, and validation checks.
4. Run the workflow and capture one handoff artifact from each role.
5. Resolve one conflict or gap before final synthesis.
6. Record the handoff contract in the workflow kit so Module 3 can reuse it for orchestration of Copilot Quest.

**🛡️ Safety checkpoint**: Do not accept implementation output without a separate verification pass.

### ✅ Success Criteria

- ✅ Created role definitions with explicit handoff contracts
- ✅ Produced at least one validated artifact per role
- ✅ Logged one conflict-resolution decision with rationale
- ✅ Saved a reusable handoff template for later modules

## Exercise 3: Stage 6 to Stage 7 Guardrail Mapping

**⏱️ Time**: 10 min  
**📋 Objective**: Evaluate whether your Stage 6 flow is ready for Stage 7 operational scaling

1. Use your Exercise 2 workflow as the baseline.
2. Score it against three readiness checks: auditability, policy compliance, and rollback path.
3. Identify one missing control that would block Stage 7 scaling.
4. Propose one lightweight guardrail improvement and where it should be enforced.
5. Add a short note describing how Module 3 should interpret this workflow when it becomes an orchestration package for Copilot Quest.

**🛡️ Safety checkpoint**: If readiness evidence is incomplete, mark the workflow as "not Stage 7 ready."

### ✅ Success Criteria

- ✅ Completed a readiness score across all three checks
- ✅ Identified at least one blocking control gap
- ✅ Proposed one concrete guardrail to close the gap
- ✅ Captured a handoff note for the orchestration/deployment module

*Hands-on lab for Module 2: Agentic Content Refresh — GitHub Copilot Developer Training*
