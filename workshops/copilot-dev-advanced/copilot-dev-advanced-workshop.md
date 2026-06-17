# Module 3: Advanced — Workshop Guide

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers who completed Foundations and Intermediate (Agentic)  
**Prerequisites**: Working knowledge of instructions, tools, and agentic workflows

## Workshop Overview

This Advanced workshop focuses on orchestration and production-readiness patterns for scaled AI-assisted development. The module covers multiagent strategy, extensibility surfaces, governance controls, debugging methodology, and deployment pathways. It closes by converting those concepts into a practical Day 2 hack plan with clear scope and execution gates.

### Learning Objectives

- Design multiagent systems using multiagents, subagents, and fleet patterns
- Evaluate hooks, marketplace extensions, MCP, API/CLI, and plugins with governance discipline
- Debug agent behavior systematically using context and execution evidence
- Prepare deployment-ready agent packages with permission and provenance controls
- Build a constrained Day 2 hack plan that balances impact, safety, and delivery speed

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Orchestration patterns: multiagents, subagents, and fleet | 25 min |
| 2 | Extensibility surfaces and integration governance | 25 min |
| 3 | Debugging and deployment operations | 20 min |
| 4 | Day 2 hack preparation and execution strategy | 10 min |
| 5 | Wrap-up and lab handoff | 10 min |
| — | Hands-on labs across three exercises | 30 min |

## 1. Orchestration Patterns: Multiagents, Subagents, and Fleet (25 min)

### Key Points

- **Multiagents**: when a specialist team topology outperforms a single generalist agent.
- **Brady Gaster's Squad pattern**: coordinator-plus-specialist role design for complex delivery.
- **Subagents**: scoped delegation units with bounded context and return contracts.
- **Fleet execution**: parallel task throughput for high-volume, independent workstreams.

### 🛡️ Safety Moment

- Define explicit ownership for each agent role before execution.
- Prevent overlap by assigning non-conflicting file and responsibility scopes.
- Require escalation rules for contradictory or low-confidence outputs.

## 2. Extensibility Surfaces and Integration Governance (25 min)

### Key Points

- **Hooks**: enforce lifecycle guardrails such as policy checks and pre-merge validation.
- **Extension Marketplace**: evaluate trust, permissions, and organizational compatibility.
- **MCP**: connect external tools and data through a standard protocol.
- **API/CLI**: automate deterministic workflows with scriptable interfaces.
- **Plugins**: package specialized capabilities for repeatable use.

### 🛡️ Safety Moment

- Treat every integration point as a trust-boundary decision.
- Apply least privilege to extension, MCP, API, and plugin capabilities.
- Verify provenance and data-scope controls before enabling in enterprise workflows.

### 🖥️ Demo: Integration Path Selection

1. Solve one task with API/CLI automation and one with MCP integration.
2. Add a hook-based policy gate to both paths.
3. Compare setup effort, control, auditability, and operational risk.

### 💡 Optimization Tip: Smallest Sufficient Integration Surface

- Use deterministic API/CLI paths for repeatable operations.
- Use MCP or plugins when external context materially improves outcomes.
- Avoid stacking integrations that do not add measurable value.

### 🔬 LAB: Exercise 1 — Stage 7 Orchestration Architecture Plan

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) selecting an orchestration model and integration surface for one bounded scenario.

## 3. Debugging and Deployment Operations (20 min)

### Key Points

- **Debugging chat and agents**: isolate failures by context, tool sequence, and instruction interaction.
- **Deploying your agents**: choose distribution path via GitHub repo, marketplace, or package registry.
- **Agent package manager**: reference distribution model at <https://microsoft.github.io/apm/>.
- **Awesome Copilot list**: curated ecosystem resource for proven patterns and examples.

### 🛡️ Safety Moment

- Sanitize debug artifacts to avoid leaking sensitive context.
- Treat agent packages as supply-chain artifacts requiring review and provenance checks.
- Do not deploy without documented capability boundaries and permission models.

### 🖥️ Demo: Failure-to-Release Workflow

1. Reproduce a controlled failure and capture minimal diagnostic evidence.
2. Apply one corrective change to instructions or scope.
3. Package the updated agent and review release readiness criteria.

### 💡 AIC Optimization Tip: Diagnose Narrowly, Scale Deliberately

- Use minimal reproducible prompts during debugging.
- Avoid repeated full-context retries when one variable can be isolated.
- Time-box tuning loops and define a rollback threshold.

### 🔬 LAB: Exercise 2 — Stage 7 Governance Controls and Stage 8 Debug Readiness

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) diagnosing a controlled issue and applying governance-aligned deployment checks.

## 4. Day 2 Hack Preparation and Execution Strategy (10 min)

### Key Points

- **Preparing for Day 2 hack**: define objective, non-goals, architecture, and fallback plan.
- **Execution pacing**: prioritize a narrow, demoable outcome over broad incomplete scope.
- **Release gates**: require policy checks, acceptance criteria, and narrative clarity.

### 🛡️ Safety Moment

- Hack speed must not bypass policy, secrets handling, or review discipline.
- Keep permissions and integration choices proportional to hack objectives.
- Include rollback paths in every demo plan.

### 🖥️ Demo: Hack Plan Canvas

1. Draft a one-page plan with objective, constraints, and integration choice.
2. Assign implementation, validation, and demo roles.
3. Confirm stop conditions and fallback path.

### 💡 AIC Optimization Tip: Constrain to Deliver

- Lock scope early and avoid late expansion.
- Select one integration path and execute it well.
- Reserve explicit time for final validation and demo rehearsal.

### 🔬 LAB: Exercise 3 — Stage 8 Deployment Decision and Day 2 Hack Plan

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) creating a Day 2 plan with deployment decision gates and fallback criteria.

## 5. Wrap-up and Lab Handoff (10 min)

### Key Points

- Advanced practice turns orchestration and integration into disciplined engineering systems.
- Scaled autonomy requires explicit governance, observability, and release controls.
- Day 2 success comes from constrained scope, clear roles, and policy-aware execution.

*Workshop guide for Module 3: Advanced — GitHub Copilot Developer Training*
