# Module 3: Advanced — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability.
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography.
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Hands-On  
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

- **Slide topic (1 slide): Multiagents and fit criteria** — multiagent design fits tasks spanning multiple domains or execution tracks where one context window is insufficient. **Usage Optimization**: only use orchestration when specialization and parallelism outweigh coordination overhead.
- **Slide topic (1 slide): Brady Gaster's Squad pattern** — coordinator-plus-specialist role design clarifies decomposition, delegation, and synthesis responsibilities. **AI Safety Moment**: explicit ownership reduces silent overlap and unsafe edits.
- **Slide topic (1 slide): Subagents as bounded delegation units** — scoped subagents return focused outputs to parent workflows, improving context control and auditability.
- **Slide topic (1 slide): Fleet execution patterns** — fleet scales throughput across independent tasks with planned merge strategy and non-overlapping file scopes. **Usage Optimization**: reserve fleet for high-volume independent work.

## 2. Extensibility Surfaces and Integration Governance (25 min)

### Key Points

- **Slide topic (1 slide): Hooks as deterministic guardrails** — hooks enforce required checks at lifecycle boundaries such as pre-edit and pre-merge, regardless of prompt quality. **AI Safety Moment**: use hooks for non-negotiable policy enforcement.
- **Slide topic (1 slide): Extension Marketplace governance** — extension installs are governance decisions with publisher trust, permission scope, and data-access implications. **AI Safety Moment**: treat extension enablement like dependency risk review.
- **Slide topic (1 slide): MCP as integration fabric** — MCP standardizes tool/resource discovery for composable integration with internal systems. **AI Safety Moment**: onboarding requires security and authorization design.
- **Slide topic (1 slide): API/CLI for deterministic automation** — scriptable interfaces are often the fastest path for repeatable operational workflows with clear I/O. **Usage Optimization**: prefer deterministic interfaces for stable tasks.
- **Slide topic (1 slide): GitHub Agentic Workflow** — a GitHub agentic workflow uses goal-driven reasoning loops to turn intent into multi-step outcomes such as issue-to-PR flow, refactor planning, and review synthesis. In talk track, contrast this with deterministic GitHub Actions so learners know when to use each: agentic workflows for adaptive engineering tasks, Actions for strict repeatable pipelines. **AI Safety Moment**: run agentic workflows behind policy gates and keep production release-critical steps in deterministic workflows.
- **Slide topic (1 slide): Plugins as packaged capability** — plugins deliver reusable higher-order behavior but require version, compatibility, and policy governance controls.
- **Slide topic (1 slide): Lab transition — Exercise 1** — move from architecture and integration governance into a bounded orchestration planning exercise.

### 🔬 LAB: Exercise 1 — Stage 7 Orchestration Architecture Plan

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) selecting an orchestration model and integration surface for one bounded scenario.

## 3. Debugging and Deployment Operations (20 min)

### Key Points

- **Slide topic (1 slide): Debugging chat and agents** — advanced debugging inspects context composition, tool-call order, instruction conflicts, and loop dynamics rather than only runtime errors. **Usage Optimization**: minimal repro prompts reduce expensive trial-and-error loops.
- **Slide topic (1 slide): Deploying your agents** — choose distribution paths (repo, marketplace, registry) based on audience, governance, and operational ownership. **AI Safety Moment**: deployment requires documented permissions and rollback posture.
- **Slide topic (1 slide): Agent package manager and release discipline** — registries such as APM support discoverability and versioning, and should be managed like software releases with provenance checks.
- **Slide topic (1 slide): Awesome Copilot as curated input** — community patterns and examples can accelerate adoption when filtered through enterprise standards. **AI Safety Moment**: vet external guidance before operational use.
- **Slide topic (1 slide): Lab transition — Exercise 2** — shift from operational concepts into a controlled debug-and-readiness validation scenario.

### 🔬 LAB: Exercise 2 — Stage 7 Governance Controls and Stage 8 Debug Readiness

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) diagnosing a controlled issue and applying governance-aligned deployment checks.

## 4. Day 2 Hack Preparation and Execution Strategy (10 min)

### Key Points

- **Slide topic (1 slide): Preparing for Day 2 hack** — define constrained objectives, explicit non-goals, architecture choices, and role ownership before coding begins.
- **Slide topic (1 slide): Execution pacing for reliable delivery** — time-box experimentation and prioritize narrow, demonstrable outcomes to avoid late-stage scope drift. **Usage Optimization**: lock scope early to avoid token-heavy churn.
- **Slide topic (1 slide): Release gates under time pressure** — even hack demos require acceptance criteria, policy checks, and fallback plans. **AI Safety Moment**: no final demo without a go/no-go gate.
- **Slide topic (1 slide): Lab transition — Exercise 3** — convert Day 2 planning guidance into a deployment decision and hack execution plan.

### 🔬 LAB: Exercise 3 — Stage 8 Deployment Decision and Day 2 Hack Plan

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) creating a Day 2 plan with deployment decision gates and fallback criteria.

## 5. Wrap-up and Lab Handoff (10 min)

### Key Points

- **Slide topic (1 slide): Advanced operating posture** — orchestration and integration must run as disciplined engineering systems with explicit control boundaries.
- **Slide topic (1 slide): Conditions for scaled autonomy** — governance, observability, and release controls must be designed in up front.
- **Slide topic (1 slide): Day 2 success formula** — constrained scope, clear ownership, and policy-aware execution from first prompt to final demo.

*Workshop guide for Module 3: Advanced — GitHub Copilot Developer Training*
