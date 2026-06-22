---
theme: ../../themes/github
title: "Copilot Dev Advanced"
info: |
  Generated from NotebookLM presentation for copilot-dev-advanced
ghFooterTitle: "Copilot Dev Advanced"
ghFooterLabel: ""
drawings:
  persist: false
transition: slide-left
mdc: true
layout: image-full
background: /images/copilot-dev-advanced/slide-01-29284dc2.png
---

<!-- Welcome and frame the module. This Advanced workshop focuses on practical orchestration and production-readiness patterns for scaled AI-assisted development. The module emphasizes right-sized orchestration decisions, governance-first integrations, debugging methodology, and deployment pathways without deep implementation internals. It closes by converting those concepts into a practical Day 2 hack plan with clear scope and execution gates. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-02-809d5ec5.png
---

<!-- Section: Orchestration Decision Patterns for Advanced Delivery (18 min). Slide topic (1 slide): Multiagent fit criteria — orchestration is justified when tasks are truly separable by role, evidence, and ownership, not just because multiple tools exist. Picture three lanes — research, implementation, validation — each with its own inputs and acceptance check; if the work cannot be split that cleanly, one focused agent is the better call. Usage Optimization: avoid orchestration when a single bounded workflow is sufficient. Learn more: <https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results> Slide topic (1 slide): Coordinator and specialist role boundaries — use one coordinator plus focused specialists to clarify decomposition, delegation, and synthesis responsibilities. The coordinator owns the plan and the final merge decision; specialists own narrow, verifiable slices and report evidence back. AI Safety Moment: explicit ownership reduces silent overlap and unsafe edits. Learn more: <https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent> Slide topic (1 slide): Bounded delegation units — keep delegated work narrow with clear inputs/outputs and acceptance checks so context remains controllable and auditable. Run specialists on cheaper models where possible, since a scoped subtask rarely needs the most expensive reasoning model. Usage Optimization: scoped subagents on lighter models cut token cost without hurting quality. Learn more: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage> -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-03-8a2ffb2d.png
---

<!-- Slide topic (1 slide): Practical anti-patterns — highlight when to avoid advanced orchestration (small tasks, shared-file contention, unclear verification ownership). Show a quick "stop and simplify" checklist so teams recognize over-engineering before it costs tokens and review time. Usage Optimization: simplify architecture before scaling it. Learn more: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage> -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-04-e1276357.png
---

<!-- Before we add more advanced orchestration patterns, anchor the room in the usage habits from the earlier modules. The point is not to spend less by doing less; it is to spend attention and credits where they produce the most engineering value. Emphasize that model choice, clean prompts, lean context, and cache preservation are operating disciplines that make every later decision easier. Usage Optimization: advanced workflows multiply both value and waste, so efficiency has to be designed in before we delegate work. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-05-be90263a.png
---

<!-- Use this slide to challenge the instinct that more agents automatically means better delivery. Ask learners to picture whether the work can really move through separate research, implementation, and validation lanes with clear handoffs. If two lanes need to edit the same files at the same time or depend on the same unresolved decision, orchestration will add coordination cost instead of speed. Usage Optimization: the cheapest and safest orchestration pattern is often one well-scoped agent with a strong acceptance check. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-06-63f96015.png
---

<!-- Section: Governance-First Integration Surfaces (22 min). Slide topic (1 slide): Hooks as deterministic guardrails — hooks enforce required checks at lifecycle boundaries such as pre-edit and pre-merge, regardless of prompt quality. They run custom shell commands at fixed points (for example preToolUse to block risky commands), giving policy that does not depend on the model behaving well. AI Safety Moment: use hooks for non-negotiable policy enforcement. Learn more: <https://docs.github.com/en/copilot/concepts/agents/hooks> Slide topic (1 slide): Integration surface selection — compare API/CLI, MCP, and extension-based approaches based on control, observability, and setup overhead. A simple decision rule: native CLI/API for deterministic, well-known commands; MCP/extensions when you need structured discovery, auth handling, or shared state. Usage Optimization: prefer the simplest interface that meets requirements. Learn more: <https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide> Slide topic (1 slide): MCP as governed integration fabric — use MCP when structured tool/resource discovery is needed across systems, with explicit authentication and authorization boundaries. Remember every enabled server's tool descriptions consume input tokens on each request, so onboard deliberately and enable only what the task needs. AI Safety Moment: onboarding requires security review before production use. Learn more: <https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide> -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-07-489a15ac.png
---

<!-- Slide topic (1 slide): Agentic workflows versus deterministic workflows — use goal-driven agentic workflows for adaptive engineering tasks and deterministic pipelines (for example GitHub Actions) for strict repeatable release steps. Contrast the two on a slide: agents adapt to context; Actions guarantee the same steps every run for release-critical gates. AI Safety Moment: keep release-critical gates deterministic. Learn more: <https://docs.github.com/en/actions/get-started/understand-github-actions> -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-08-86678bbd.png
---

<!-- This is the permission slide for simplifying. Advanced teams should be proud when they decide not to orchestrate because the task is small, the files are contested, or nobody can name who verifies the result. Those warning signs usually show up as long prompts, duplicated context, and late review surprises. Usage Optimization: stop and simplify before scaling the architecture, because over-engineered agent plans burn tokens and human review time at the same time. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-09-2eb6cfe5.png
---

<!-- Frame hooks as policy that executes even when a prompt is vague or a model response is unexpected. A hook is useful because it sits at a lifecycle boundary and can block, inspect, or require evidence before the next step proceeds. Give concrete examples such as blocking destructive commands, requiring tests before merge, or checking that generated files stay inside approved paths. AI Safety Moment: non-negotiable controls belong in deterministic guardrails, not in reminders that the model might or might not follow. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-10-4e13e57a.png
---

<!-- Section: Debugging and Deployment Readiness Operations (20 min). Slide topic (1 slide): Debugging chat and agents — advanced debugging inspects context composition, tool-call order, instruction conflicts, and loop dynamics rather than only runtime errors. Start from evidence: read what Copilot actually sent and which tools it called before changing architecture, then reproduce with a minimal prompt. Usage Optimization: minimal repro prompts reduce expensive trial-and-error loops. Learn more: <https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues> Slide topic (1 slide): Deploying your agents — choose distribution paths (repo, marketplace, or internal registry) based on audience, governance, and operational ownership. Map each path to who maintains it and who approves changes, so distribution is a governance decision, not just a packaging step. AI Safety Moment: deployment requires documented permissions and rollback posture. Learn more: <https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent> Slide topic (1 slide): Release-readiness gates — require a practical checklist for policy compliance, test evidence, and rollback before broader enablement. Show the gate as a one-screen checklist (capabilities, permissions, tests, rollback, owner sign-off) the team runs every time. AI Safety Moment: no broader enablement without a passing readiness checklist. Learn more: <https://docs.github.com/en/copilot/responsible-use/chat> -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-11-b4ac0d46.png
---

<!-- Slide topic (1 slide): Lab transition — Exercise 2 — shift from operational concepts into a controlled debug-and-readiness validation scenario on the Copilot Quest Orchestration Package. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-12-2ed14e18.png
---

<!-- Help learners separate where adaptability is valuable from where repeatability is mandatory. Agentic workflows are strong for investigation, tradeoff analysis, and adaptive engineering paths where feedback changes the next move. Deterministic workflows are the right home for release gates because the organization needs the same build, test, scan, and deployment sequence every time. AI Safety Moment: keep the final authority for release-critical checks in deterministic systems, even when agents prepare the evidence. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-13-93e4ea02.png
---

<!-- Transition learners from discussion into a concrete architecture decision for the Copilot Quest scenario. Their job is to decide whether orchestration is justified, name the coordinator and specialist responsibilities, and choose the integration surface that gives enough control without unnecessary overhead. Encourage them to write acceptance checks as part of the plan so the architecture is measurable, not just aspirational. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-14-a799be96.png
---

<!-- Section: Day 2 Hack Preparation and Execution Strategy (10 min). Slide topic (1 slide): Preparing for Day 2 hack — define constrained objectives, explicit non-goals, architecture choices, and role ownership before coding begins. A one-page brief (goal, non-goals, roles, off-ramp) prevents the most common Day 2 failure: an ambitious scope with no clear definition of done. Learn more: <https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results> Slide topic (1 slide): Execution pacing for reliable delivery — time-box experimentation and prioritize narrow, demonstrable outcomes to avoid late-stage scope drift. Lock the scope early and keep one always-demoable slice working rather than many half-finished features. Usage Optimization: lock scope early to avoid token-heavy churn. Learn more: <https://docs.github.com/en/copilot/tutorials/optimize-ai-usage> Slide topic (1 slide): Release gates under time pressure — even hack demos require acceptance criteria, policy checks, and fallback plans. Keep a lightweight go/no-go gate so a rushed demo still passes the same permission and rollback checks as real work. AI Safety Moment: no final demo without a go/no-go gate. Learn more: <https://docs.github.com/en/copilot/responsible-use/chat> -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-15-9af11ed4.png
---

<!-- Slide topic (1 slide): Lab transition — Exercise 3 — convert Day 2 planning guidance into a deployment decision and hack execution plan that closes the Copilot Quest build. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-16-67bd9762.png
---

<!-- Treat deployment readiness as an engineering artifact, not a meeting sentiment. Before an agent, workflow, or integration reaches broader use, the team should be able to point to confirmed capabilities, documented permissions, test evidence, rollback posture, and an accountable owner. This checklist also gives reviewers a shared language for saying yes, no, or not yet. AI Safety Moment: expanded autonomy should only happen after evidence passes a visible gate. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-17-a8cd6f5b.png
---

<!-- This lab asks learners to operate like release engineers, not just prompt engineers. They will diagnose a controlled issue, inspect the evidence path, and decide which governance controls are needed before enabling the Stage 8 work. Reinforce that the desired output is a readiness decision with rationale, because production teams need traceable judgment more than a clever workaround. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-18-94b09ab6.png
---

<!-- Section: Wrap-up and Lab Handoff (10 min). Slide topic (1 slide): Advanced operating posture — orchestration and integration must run as disciplined engineering systems with explicit control boundaries. Reinforce that every advanced capability still answers to human review gates, documented permissions, and auditable evidence. Learn more: <https://docs.github.com/en/copilot/responsible-use/chat> Slide topic (1 slide): Conditions for scaled autonomy — governance, observability, and release controls must be designed in up front. Autonomy expands only when you can explain what the agent did, prove it stayed in policy, and roll it back safely. Learn more: <https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent> Slide topic (1 slide): Day 2 success formula — constrained scope, clear ownership, and policy-aware execution from first prompt to final demo. Close by pointing learners to continued GitHub and Microsoft Learn training so they can keep building after the workshop. Learn more: <https://learn.microsoft.com/en-us/training/paths/copilot/> -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-19-92374aa7.png
---

<!-- Shift the room into Day 2 delivery mode: the goal is a reliable demo slice, not maximum feature count. Scope lock is a forcing function that turns exploration into execution while there is still time to test and recover. The single complete slice should cut through the layers needed to prove the idea works, even if it is intentionally narrow. Usage Optimization: late scope churn is one of the most expensive token patterns, because every change forces fresh context, fresh reasoning, and fresh review. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-20-b547866d.png
---

<!-- Make clear that a hack demo can be fast without being uncontrolled. The go/no-go gate should ask whether the core acceptance criteria pass, the permissions are understood, and a fallback path exists if something breaks during the demo. If the answer is no, the right move is to fix or narrow the demo rather than bypass the guardrail. AI Safety Moment: time pressure is exactly when teams need the clearest policy boundary. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-21-e24d4271.png
---

<!-- Close by connecting the module back to the operating posture learners will need for Day 2. Advanced Copilot work is not just about more capable agents; it is about clear boundaries, observable behavior, policy-aware execution, and humans who can explain the decision path. Invite learners to use the final lab and quiz as a readiness check before they start building under hack conditions. The transition is from learning patterns to applying them with constrained scope, accountable ownership, and a demo plan that can survive review. -->
