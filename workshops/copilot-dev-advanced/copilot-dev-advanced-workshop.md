# Module 3: Advanced — Workshop Guide

> **NotebookLM generation instructions**:
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color use, and high readability.
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography with light background.
> - Use light backgrounds for all slide styling (cover, section, content, comparison, and summary slides).
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct content boxes with a consistent badge icon per type so the tip category is instantly recognizable.
> - Generate dedicated slides for the workshop title (`# Module ...`), `## Workshop Overview`, and `### Learning Objectives`; do not skip or merge these sections.
> - Do not summarize away source meaning: treat workshop wording as authoritative and keep the exact messaging wherever possible. Minor connector-word edits are allowed only to improve flow and readability.
> - Control slide layout deliberately so content remains readable and properly structured on-slide.
> - Generate visual imagery that directly represents the slide wording and reinforces the intended meaning.

**Duration**: 2 hours (120 min: 85 min content + 30 min lab + 5 min quiz)  
**Format**: Presentation + Hands-On  
**Audience**: Developers who completed Foundations and Intermediate (Agentic)  
**Prerequisites**: Working knowledge of instructions, tools, and agentic workflows

## Workshop Overview

This Advanced workshop focuses on practical orchestration and production-readiness patterns for scaled AI-assisted development. The module emphasizes right-sized orchestration decisions, governance-first integrations, debugging methodology, and deployment pathways without deep implementation internals. It closes by converting those concepts into a practical Day 2 hack plan with clear scope and execution gates.

### Learning Objectives

- Select an orchestration pattern for bounded multi-agent workflows
- Evaluate hooks, MCP, and API/CLI integration choices with governance discipline
- Debug agent behavior systematically using context and execution evidence
- Prepare deployment-ready agent packages with permission and rollback controls
- Build a constrained Day 2 hack plan that balances impact, safety, and delivery speed

## Recap: Optimizing AI Usage

Before diving into advanced orchestration, recap the efficiency and optimization learnings that frame every decision in this module. These six strategies — drawn from GitHub's [Optimizing your AI usage](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage) guidance — maximize quality while reducing token consumption and AI credit cost.

| # | Strategy | What it covers |
|---|----------|----------------|
| 1 | Choose the right model for the right task | Match capability to work, configure reasoning level, use auto model selection, run subagents on cheaper models |
| 2 | Provide clear guidance in your prompts | Clear task definition, relevant context upfront, an explicit stopping condition |
| 3 | Keep your context lean | Start new conversations per problem, `/compact` long sessions, custom instruction files, only the tools you need |
| 4 | Preserve the cache | Avoid switching models or reasoning mid-session; cached tokens bill at ~10% of input price |
| 5 | Research, plan, then implement | Separate phases — plan with a reasoning model, implement with a cheaper one |
| 6 | Utilize learnings to be more efficient | Use `/chronicle tips` and `/chronicle cost-tips` to surface efficiency and cost insights |

> 💡 **Usage Optimization**: Model choice is the fastest cost lever; auto model selection earns a 10% discount on paid plans and protects the cache by only switching at natural boundaries.

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| — | Recap: optimizing AI usage (carried from Modules 1–2) | 5 min |
| 1 | Orchestration decision patterns for advanced delivery | 18 min |
| 2 | Governance-first integration surfaces | 22 min |
| 3 | Debugging and deployment readiness operations | 20 min |
| 4 | Day 2 hack preparation and execution strategy | 10 min |
| 5 | Wrap-up and lab handoff | 10 min |
| — | Hands-on labs across three exercises (Stages 7–8 Orchestration Package) | 30 min |
| — | Knowledge check (10-question quiz) | 5 min |

> **Timing note**: Content totals 85 min (5 min recap + 80 min sections), labs add 30 min at the three pause points, and the closing quiz adds 5 min — 120 min total. The three lab exercises (10 min each) continue the **Copilot Quest** build from Module 1 (Stages 1–4 starter) and Module 2 (Stages 5–6 Workflow Kit) into the Stage 7–8 Orchestration Package.

## 1. Orchestration Decision Patterns for Advanced Delivery (18 min)

### Key Points

- **Slide topic (1 slide): Multiagent fit criteria** — orchestration is justified when tasks are truly separable by role, evidence, and ownership, not just because multiple tools exist. Picture three lanes — research, implementation, validation — each with its own inputs and acceptance check; if the work cannot be split that cleanly, one focused agent is the better call. **Usage Optimization**: avoid orchestration when a single bounded workflow is sufficient. **Learn more**: <https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results>
- **Slide topic (1 slide): Coordinator and specialist role boundaries** — use one coordinator plus focused specialists to clarify decomposition, delegation, and synthesis responsibilities. The coordinator owns the plan and the final merge decision; specialists own narrow, verifiable slices and report evidence back. **AI Safety Moment**: explicit ownership reduces silent overlap and unsafe edits. **Learn more**: <https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent>
- **Slide topic (1 slide): Bounded delegation units** — keep delegated work narrow with clear inputs/outputs and acceptance checks so context remains controllable and auditable. Run specialists on cheaper models where possible, since a scoped subtask rarely needs the most expensive reasoning model. **Usage Optimization**: scoped subagents on lighter models cut token cost without hurting quality. **Learn more**: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage>
- **Slide topic (1 slide): Practical anti-patterns** — highlight when to avoid advanced orchestration (small tasks, shared-file contention, unclear verification ownership). Show a quick "stop and simplify" checklist so teams recognize over-engineering before it costs tokens and review time. **Usage Optimization**: simplify architecture before scaling it. **Learn more**: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage>

## 2. Governance-First Integration Surfaces (22 min)

### Key Points

- **Slide topic (1 slide): Hooks as deterministic guardrails** — hooks enforce required checks at lifecycle boundaries such as pre-edit and pre-merge, regardless of prompt quality. They run custom shell commands at fixed points (for example `preToolUse` to block risky commands), giving policy that does not depend on the model behaving well. **AI Safety Moment**: use hooks for non-negotiable policy enforcement. **Learn more**: <https://docs.github.com/en/copilot/concepts/agents/hooks>
- **Slide topic (1 slide): Integration surface selection** — compare API/CLI, MCP, and extension-based approaches based on control, observability, and setup overhead. A simple decision rule: native CLI/API for deterministic, well-known commands; MCP/extensions when you need structured discovery, auth handling, or shared state. **Usage Optimization**: prefer the simplest interface that meets requirements. **Learn more**: <https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide>
- **Slide topic (1 slide): MCP as governed integration fabric** — use MCP when structured tool/resource discovery is needed across systems, with explicit authentication and authorization boundaries. Remember every enabled server's tool descriptions consume input tokens on each request, so onboard deliberately and enable only what the task needs. **AI Safety Moment**: onboarding requires security review before production use. **Learn more**: <https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide>
- **Slide topic (1 slide): Agentic workflows versus deterministic workflows** — use goal-driven agentic workflows for adaptive engineering tasks and deterministic pipelines (for example GitHub Actions) for strict repeatable release steps. Contrast the two on a slide: agents adapt to context; Actions guarantee the same steps every run for release-critical gates. **AI Safety Moment**: keep release-critical gates deterministic. **Learn more**: <https://docs.github.com/en/actions/get-started/understand-github-actions>
- **Slide topic (1 slide): Lab transition — Exercise 1** — move from architecture and integration governance into a bounded orchestration planning exercise that extends the Copilot Quest Stage 5–6 Workflow Kit.

### 🔬 LAB: Exercise 1 — Stage 7 Orchestration Architecture Plan

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (10 min) selecting an orchestration model and integration surface for one bounded scenario.

## 3. Debugging and Deployment Readiness Operations (20 min)

### Key Points

- **Slide topic (1 slide): Debugging chat and agents** — advanced debugging inspects context composition, tool-call order, instruction conflicts, and loop dynamics rather than only runtime errors. Start from evidence: read what Copilot actually sent and which tools it called before changing architecture, then reproduce with a minimal prompt. **Usage Optimization**: minimal repro prompts reduce expensive trial-and-error loops. **Learn more**: <https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues>
- **Slide topic (1 slide): Deploying your agents** — choose distribution paths (repo, marketplace, or internal registry) based on audience, governance, and operational ownership. Map each path to who maintains it and who approves changes, so distribution is a governance decision, not just a packaging step. **AI Safety Moment**: deployment requires documented permissions and rollback posture. **Learn more**: <https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent>
- **Slide topic (1 slide): Release-readiness gates** — require a practical checklist for policy compliance, test evidence, and rollback before broader enablement. Show the gate as a one-screen checklist (capabilities, permissions, tests, rollback, owner sign-off) the team runs every time. **AI Safety Moment**: no broader enablement without a passing readiness checklist. **Learn more**: <https://docs.github.com/en/copilot/responsible-use/chat>
- **Slide topic (1 slide): Lab transition — Exercise 2** — shift from operational concepts into a controlled debug-and-readiness validation scenario on the Copilot Quest Orchestration Package.

### 🔬 LAB: Exercise 2 — Stage 7 Governance Controls and Stage 8 Debug Readiness

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (10 min) diagnosing a controlled issue and applying governance-aligned deployment checks.

## 4. Day 2 Hack Preparation and Execution Strategy (10 min)

### Key Points

- **Slide topic (1 slide): Preparing for Day 2 hack** — define constrained objectives, explicit non-goals, architecture choices, and role ownership before coding begins. A one-page brief (goal, non-goals, roles, off-ramp) prevents the most common Day 2 failure: an ambitious scope with no clear definition of done. **Learn more**: <https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results>
- **Slide topic (1 slide): Execution pacing for reliable delivery** — time-box experimentation and prioritize narrow, demonstrable outcomes to avoid late-stage scope drift. Lock the scope early and keep one always-demoable slice working rather than many half-finished features. **Usage Optimization**: lock scope early to avoid token-heavy churn. **Learn more**: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage>
- **Slide topic (1 slide): Release gates under time pressure** — even hack demos require acceptance criteria, policy checks, and fallback plans. Keep a lightweight go/no-go gate so a rushed demo still passes the same permission and rollback checks as real work. **AI Safety Moment**: no final demo without a go/no-go gate. **Learn more**: <https://docs.github.com/en/copilot/responsible-use/chat>
- **Slide topic (1 slide): Lab transition — Exercise 3** — convert Day 2 planning guidance into a deployment decision and hack execution plan that closes the Copilot Quest build.

### 🔬 LAB: Exercise 3 — Stage 8 Deployment Decision and Day 2 Hack Plan

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (10 min) creating a Day 2 plan with deployment decision gates and fallback criteria.

## 5. Wrap-up and Lab Handoff (10 min)

### Key Points

- **Slide topic (1 slide): Advanced operating posture** — orchestration and integration must run as disciplined engineering systems with explicit control boundaries. Reinforce that every advanced capability still answers to human review gates, documented permissions, and auditable evidence. **Learn more**: <https://docs.github.com/en/copilot/responsible-use/chat>
- **Slide topic (1 slide): Conditions for scaled autonomy** — governance, observability, and release controls must be designed in up front. Autonomy expands only when you can explain what the agent did, prove it stayed in policy, and roll it back safely. **Learn more**: <https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent>
- **Slide topic (1 slide): Day 2 success formula** — constrained scope, clear ownership, and policy-aware execution from first prompt to final demo. Close by pointing learners to continued GitHub and Microsoft Learn training so they can keep building after the workshop. **Learn more**: <https://learn.microsoft.com/en-us/training/paths/copilot/>

### 🧠 Knowledge Check (5 min)

> **Instructor**: Close the module with the 10-question quiz (`copilot-dev-advanced-QUIZ.md`). It checks Stage 7–8 concepts — orchestration architecture, integration/governance choices, debug-first readiness, deployment gates, and Day 2 planning — so confirm learners can articulate each before they start the Day 2 hack.

*Workshop guide for Module 3: Advanced — GitHub Copilot Developer Training*
