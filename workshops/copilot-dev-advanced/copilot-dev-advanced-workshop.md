# Module 3: Advanced Content Refresh (Stage 7-8) — Workshop Guide

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers who completed Modules 1 and 2  
**Prerequisites**: Intermediate understanding of Copilot agents, tools, and instruction layering

---

## Session Agenda (Slide 2)

| Section | Topic Group | Time |
|---------|-------------|------|
| 1 | Stage 7 architecture: multi-agent orchestration patterns | 25 min |
| 2 | Stage 7 controls: extensibility surfaces and governance | 25 min |
| 3 | Stage 8 operations: debugging and deployment readiness | 20 min |
| 4 | Stage 8 close-out: Day 2 hack prep and execution plan | 10 min |
| 5 | Wrap-up and lab hand-off | 10 min |
| — | Lab time across 3 exercises | 30 min |

## Workshop Overview

This refreshed Advanced module aligns explicitly to the approved 8-stage model, focusing on **Stage 7 (Orchestration)** and **Stage 8 (Deployment Readiness)**. Each listed topic is written with one-slide-per-topic intent for NotebookLM generation and supports a Day 2 build/hack workflow focused on real multi-agent delivery.

> **NotebookLM guidance**: Keep discussion prompts out of slide bullets. Use them only as presenter notes / talk track.

### Learning Objectives

- Apply Stage 7 orchestration patterns using multiagents, subagents, and fleet workflows
- Choose Stage 7 integration surfaces (hooks, extensions, plugins, MCP, API/CLI) with governance controls
- Execute Stage 8 debug and deployment-readiness workflows with operational discipline
- Produce a Day 2 hack plan with explicit architecture, guardrails, and release gates

---

## 1. Stage 7 — Multi-Agent Orchestration Architecture (25 min)

### Key Points

- **Slide topic (1 slide): Stage 7 orchestration goal** — why orchestration is introduced at this maturity stage.
- **Slide topic (1 slide): Multiagents** — when collaborative agent topology is justified.
- **Slide topic (1 slide): Brady Gaster's Squad pattern** — practical multi-role handoff model.
- **Slide topic (1 slide): Subagents** — delegated specialist contexts and summary-based return flow.
- **Slide topic (1 slide): Fleet** — parallelized execution across independent workstreams.

### 🛡️ Safety Moment

- Stage 7 increases delivery speed and coordination risk at the same time.
- Require ownership boundaries per agent role to avoid silent overlap/conflict.
- Add explicit stop/escalation logic for deadlocks and contradictory outputs.

<!-- Presenter notes:
Which workflows in your org are now mature enough for Stage 7 orchestration?
When does added orchestration overhead outweigh benefits?
What acceptance policy should apply to agent-to-agent handoffs?
-->

---

## 2. Stage 7 — Extensibility Surfaces and Governance Controls (25 min)

### Key Points

- **Slide topic (1 slide): Hooks** — lifecycle triggers for policy checks, automation, and quality gates.
- **Slide topic (1 slide): Extension Marketplace** — curated ecosystem integration and governance.
- **Slide topic (1 slide): MCP** — standardized tool/data connectivity beyond repository files.
- **Slide topic (1 slide): API/CLI** — direct automation and scriptable integration pathways.
- **Slide topic (1 slide): Plugins** — specialized capabilities layered onto base assistant behavior.

### 🛡️ Safety Moment

- Every external integration is a trust-boundary decision.
- Apply least privilege and explicit approval where side effects exist.
- Track provenance for data returned from external systems.

### 🖥️ Demo: Integration Path Selection

1. Compare one task solved through CLI/API automation and one via MCP/plugin path.
2. Show where hooks can enforce pre-merge or pre-deploy policy checks.
3. Capture tradeoffs: setup overhead, control, and auditability.

### 💡 AIC Optimization Tip: Smallest Sufficient Integration

- Prefer native CLI/API paths for deterministic operations.
- Use MCP/plugins when structured stateful interactions add clear value.
- Keep extension surface area minimal to reduce operational risk and token/tool overhead.

<!-- Presenter notes:
Which Stage 7 integration paths are mission-critical versus nice-to-have?
Where should your team standardize hook policy?
How do you evaluate new marketplace extensions safely?
-->

### 🔬 LAB: Exercise 1 — Integration Path Comparison

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) mapping a Stage 7 orchestration design and selecting the right integration path for one bounded task.

---

## 3. Stage 8 — Debugging and Deployment Readiness (20 min)

### Key Points

- **Slide topic (1 slide): Stage 8 readiness model** — the shift from prototyping to operational deployment.
- **Slide topic (1 slide): Debugging chat and agents** — inspect context, actions, and failure modes systematically.
- **Slide topic (1 slide): Deploying your agents** — GitHub repo packaging, marketplace path, and APM flow.
- **Slide topic (1 slide): Agent package manager** — distribution reference: `<https://microsoft.github.io/apm/>`.

### 🛡️ Safety Moment

- Debug logs can expose sensitive context; sanitize and govern retention.
- Treat deployment artifacts as software supply chain assets with review controls.
- Never deploy an agent package without clear capability and permission documentation.

### 🖥️ Demo: Debug to Deploy Pipeline

1. Reproduce a controlled agent failure and inspect diagnostic output.
2. Apply one corrective instruction/tool-scope change.
3. Walk through packaging/deployment decision points for team adoption.

### 💡 AIC Optimization Tip: Operational Readiness Checklist

- Define baseline debugging steps before scaling rollout.
- Package agents with explicit versioning and release notes.
- Include policy-compatible defaults in deployable agent artifacts to reduce rework and incident cost.

<!-- Presenter notes:
What is your minimum Stage 8 "deploy-ready" checklist for an agent?
Which failures should trigger immediate rollback versus iterative tuning?
-->

### 🔬 LAB: Exercise 2 — Debug and Package Readiness

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) diagnosing a Stage 8 failure scenario and drafting a deployment-readiness checklist.

---

## 4. Stage 8 — Day 2 Hack Preparation and Ecosystem Resources (10 min)

### Key Points

- **Slide topic (1 slide): Awesome Copilot list** — curation source for examples, tools, and references.
- **Slide topic (1 slide): Preparing for Day 2 Hack** — team roles, constraints, judging criteria, and execution plan.
- **Slide topic (1 slide): Day 2 release gates** — architecture decision, governance checks, and fallback criteria.

### 🛡️ Safety Moment

- Hack speed should not bypass policy, secrets handling, or review discipline.
- Require scoped objectives and explicit non-goals before coding starts.
- Keep rollback and fallback plans visible during demos.

### 🖥️ Demo: Day 2 Planning Canvas

1. Build a simple team plan with one primary objective and one fallback.
2. Assign roles for architecture, build, review, and demo narrative.

### 💡 AIC Optimization Tip: Constrain to Finish

- Select a narrow, demoable outcome over broad aspirational scope.
- Choose one integration path and execute it well.
- Time-box experimentation, reserve review time at the end, and avoid late-stage context bloat.

<!-- Presenter notes:
What Stage 8 Day 2 objective is ambitious but achievable for your team?
Which advanced topic from today is highest ROI for immediate practice?
-->

### 🔬 LAB: Exercise 3 — Day 2 Hack Plan Draft

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) producing a Stage 8 Day 2 hack plan with release gates, governance checks, and fallback criteria.

---

## 5. Wrap-up and Lab Hand-off (10 min)

### Key Points

- Stage 7 and Stage 8 topics now map directly to one-slide-per-topic targets.
- Teams should treat orchestration, governance, and deployment as engineering systems, not prompt tricks.
- Day 2 success depends on scoped goals, policy-aware execution, release gates, and clear demo storytelling.

<!-- Presenter notes:
Which advanced capability will you pilot first in production-adjacent work?
What governance gap must be resolved before broader rollout?
-->

*Workshop guide for Module 3: Advanced Content Refresh (Stage 7-8) — GitHub Copilot Developer Training*
