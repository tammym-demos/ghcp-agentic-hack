# Module 2: Agentic Content Refresh — Hands-On Lab

## Overview

This lab extends the **Copilot Quest starter** into a practical **Stage 5-6 Workflow Kit** that learners can reuse after class. Use the Module 1 instructions, the reusable checklist or prompt asset, and the `foundations-helper.agent.md` custom agent as the starting point, then turn those foundations into stronger CLI skill contracts, clearer role-based handoffs, and lightweight readiness checks that preview operational scale. The goal is to help learners practice the same behaviors discussed in the workshop: deciding what belongs in instructions, what belongs in memory, what should become a reusable skill, when to use direct tools instead of delegation, and what evidence is required before autonomy expands.

- **Stage 5**: CLI power-user precision with controlled autonomy, explicit stop conditions, and better direct-vs-delegated choices
- **Stage 6**: Multi-agent orchestration with role-based handoffs, validation evidence, and conflict resolution
- **Stage 6 → 7 bridge**: readiness guardrails that test whether the workflow is auditable, policy-aware, and safe to scale

- **Total time**: ~30 minutes
- **Prerequisites**:
  - Module 1 completion
  - VS Code with GitHub Copilot
  - Local repository with `.github/` folder access

## Exercise 1: Stage 5 CLI Power-User Skill Contract

**⏱️ Time**: 10 min  
**📋 Objective**: Classify one Stage 5 task into instructions, memory, and skill design, then execute it with an explicit skill contract and a deliberate direct-vs-delegated execution choice

1. Pick one deterministic coding task in your repo (small, single-file preferred) that improves the game loop, scoring, guess validation, or another bounded behavior learners can verify quickly.
2. Pull forward two Module 1 assets before you begin: the reusable checklist or prompt template from Stage 3 and the guardrails learned from the `foundations-helper.agent.md` custom-agent exercise in Stage 4.
3. Before writing the skill, identify three things: the instruction that should govern the task, any stable fact or preference that belongs in memory, and the repeatable execution pattern that should live in the skill itself.
4. Convert the Module 1 checklist and guardrails into a Stage 5 skill by adding target scope, task, constraints, definition of done, and off-ramp so the skill knows exactly what to change, what to avoid, and when to stop without duplicating instruction or memory content.
5. Run the task once using direct tool-style execution, as if the work were concrete enough to stay mostly human-guided.
6. Run the same task with delegated or agent-style execution, as if you were testing whether the task benefits from a multi-step loop.
7. Compare output quality, review burden, token or tool overhead, and whether the delegated path actually improved the outcome.
8. Save the skill as a reusable Stage 5 asset for Copilot Quest, including at least one explicit acceptance gate such as "stop if tests fail" or "ask before changing dependencies," plus a short note showing what stayed in instructions and memory.

**🛡️ Safety checkpoint**: Do not place secrets, sensitive data, or non-negotiable policy in memory or inside the skill when it should live in instructions.

### ✅ Success Criteria

- ✅ Pulled forward the Module 1 checklist and delegation guardrails
- ✅ Classified the task guidance into instructions, memory, and skill design
- ✅ Used the full Stage 5 skill contract fields
- ✅ Completed a direct-vs-delegated comparison on the same task
- ✅ Documented one explicit acceptance gate before merge
- ✅ Added a reusable Stage 5 skill asset to the kit

## Exercise 2: Stage 6 Multi-Agent Handoff Drill

**⏱️ Time**: 10 min  
**📋 Objective**: Orchestrate a two-role multi-agent workflow with verifiable handoff contracts and clear human checkpoints

1. Choose a task that can be split into two independent subtasks, such as implementing guess feedback while separately validating test coverage or edge-case handling.
2. Reuse `foundations-helper.agent.md` as one role in the workflow, then define a second role, such as verifier, and be explicit about which role is allowed to change code versus only inspect evidence.
3. For each role, write expected inputs, outputs, and validation checks so the handoff is concrete rather than conversational.
4. Run the workflow and capture one handoff artifact from each role, such as a diff summary, failed-test note, or verification checklist.
5. Resolve one conflict or gap before final synthesis, and record how the team decided which role had authority to proceed.
6. Record the handoff contract in the workflow kit so Module 3 can reuse it for orchestration of Copilot Quest.

**🛡️ Safety checkpoint**: Do not accept implementation output without a separate verification pass.

### ✅ Success Criteria

- ✅ Reused the Module 1 custom agent as one workflow role
- ✅ Created role definitions with explicit handoff contracts
- ✅ Produced at least one validated artifact per role
- ✅ Logged one conflict-resolution decision with rationale
- ✅ Saved a reusable handoff template for later modules

## Exercise 3: Stage 6 to Stage 7 Guardrail Mapping

**⏱️ Time**: 10 min  
**📋 Objective**: Evaluate whether your Stage 6 flow is ready for Stage 7 operational scaling and identify the control gaps that still matter

1. Use your Exercise 2 workflow as the baseline so the readiness discussion stays grounded in a real handoff pattern rather than a hypothetical one.
2. Score it against three readiness checks: auditability, policy compliance, and rollback path, using visible evidence from the workflow wherever possible.
3. Identify one missing control that would block Stage 7 scaling, such as missing approval gates, weak logging, unclear ownership, or no safe rollback plan.
4. Propose one lightweight guardrail improvement and specify where it should be enforced, for example in instructions, tool permissions, hooks, or review steps.
5. Add a short note describing how Module 3 should interpret this workflow when it becomes an orchestration package for Copilot Quest, including what must remain human-approved before broader rollout.

**🛡️ Safety checkpoint**: If readiness evidence is incomplete, mark the workflow as "not Stage 7 ready."

### ✅ Success Criteria

- ✅ Completed a readiness score across all three checks
- ✅ Identified at least one blocking control gap
- ✅ Proposed one concrete guardrail to close the gap
- ✅ Captured a handoff note for the orchestration/deployment module

*Hands-on lab for Module 2: Agentic Content Refresh — GitHub Copilot Developer Training*
