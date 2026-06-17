# Module 3: Advanced Content Refresh (Stage 7-8) — Hands-On Lab

## Overview

This lab extends the **Copilot Quest** Stage 5-6 Workflow Kit into the **Orchestration Package**. Exercises focus on orchestration architecture, governance controls, deployment decisions, and Day 2 execution planning so the earlier game kit becomes a reusable Stage 7-8 release artifact.

- **Total time**: ~30 minutes
- **Prerequisites**:
  - Completion of Modules 1 and 2
  - Access to a project suitable for advanced experimentation
  - Permission to test approved integrations only

## Exercise 1: Stage 7 Orchestration Architecture Plan

**⏱️ Time**: 10 min  
**📋 Objective**: Design a Stage 7 multi-agent architecture and identify where fleet execution is justified

1. Choose one medium-scope scenario that could realistically be handed to a multi-agent team from Module 2 (for example: add hints, daily puzzle mode, or a scoreboard to Copilot Quest).
2. Define at least three agent roles (orchestrator, implementer, validator/reviewer).
3. Mark which tasks can run in fleet-parallel and which must remain sequential.
4. Add one explicit off-ramp for conflicting agent output and one escalation owner.
5. Save the result as the first page of your Copilot Quest orchestration package.

**🛡️ Safety checkpoint**: Assign ownership for final merge decisions and preserve human approval before side-effecting actions.

### ✅ Success Criteria

- ✅ Produced a role-based multi-agent decomposition
- ✅ Identified valid fleet-parallel tasks
- ✅ Added at least one conflict/off-ramp rule and escalation owner
- ✅ Captured the scenario as an orchestration-package artifact

## Exercise 2: Stage 7 Governance Controls and Stage 8 Debug Readiness

**⏱️ Time**: 10 min  
**📋 Objective**: Compare Stage 7 integration choices, draft one practical GitHub agentic workflow example, and define a Stage 8 debug-first response

1. Pick one bounded task and solve it once with CLI/API style, once with MCP/plugin style (for example: fetch the word list or update the scoreboard).
2. Document tradeoffs in setup cost, observability, governance, and control.
3. Draft one GitHub agentic workflow example your team could run (for example: issue triage -> assign coding agent -> open PR -> human review gate -> merge).
4. Simulate one failure case and capture a Stage 8 debug-first response plan.
5. Add one hook/checkpoint your team would enforce before deployment approval.
6. Fold the resulting checklist and workflow example into the orchestration package so it travels with the Copilot Quest workflow.

**🛡️ Safety checkpoint**: Use only approved tools/endpoints, avoid sensitive data in prompts/logs, and document trust boundaries.

### ✅ Success Criteria

- ✅ Compared two integration paths on the same objective
- ✅ Drafted one concrete GitHub agentic workflow example with a human review gate
- ✅ Documented one debug protocol for repeat failures
- ✅ Defined one enforceable policy hook/checkpoint tied to release approval
- ✅ Stored the checklist in the package for reuse

## Exercise 3: Stage 8 Deployment Decision and Day 2 Hack Plan

**⏱️ Time**: 10 min  
**📋 Objective**: Produce a Stage 8 deployment decision package and Day 2 hack execution plan

1. Draft a deploy checklist for a custom agent package (capabilities, permissions, tests, rollback, owner sign-off).
2. Reference one distribution path (repo release, marketplace, or APM-ready package flow) and justify why it fits.
3. Build a Day 2 hack proposal with:
   - One core objective
   - One Stage 7 orchestration capability and one Stage 8 readiness gate
   - One fallback if integration fails
4. Treat the result as the deployable capstone for the full Copilot Quest build.

**🛡️ Safety checkpoint**: No deployment without documented permissions, governance sign-off, and rollback plan.

### ✅ Success Criteria

- ✅ Produced a deploy-readiness checklist
- ✅ Included one viable distribution/deployment pathway with rationale
- ✅ Delivered a scoped Day 2 plan with fallback strategy and release gate
- ✅ Produced a capstone artifact that closes the module sequence

*Hands-on lab for Module 3: Advanced Content Refresh (Stage 7-8) — GitHub Copilot Developer Training*
