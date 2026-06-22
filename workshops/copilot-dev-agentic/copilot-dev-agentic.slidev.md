---
theme: ../../themes/github
title: "Copilot Dev Agentic"
info: |
  Generated from NotebookLM presentation for copilot-dev-agentic
ghFooterTitle: "Copilot Dev Agentic"
ghFooterLabel: ""
drawings:
  persist: false
transition: slide-left
mdc: true
layout: image-full
background: /images/copilot-dev-agentic/slide-01-3cc0ad6c.png
---

<!-- Welcome and frame the module. This Intermediate module maps directly to the Agentic operating layer: standing instructions, memory behavior, skill design, tool choices, and controlled execution loops. It explicitly builds on Foundations by turning the Stage 3 reusable checklist or prompt asset and the Stage 4 delegation guardrails into more repeatable Stage 5 and Stage 6 workflows. The emphasis is not just getting answers, but designing repeatable, auditable workflows where autonomy is deliberate. Learners finish with a practical framework for when to stay deterministic, when to delegate, and how to keep cost and risk in balance. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-02-de2dbf76.png
---

<!-- Section: How Copilot Uses Instructions, Memory, and Context (12 min). Slide topic (1 slide): Instructions — show instructions as standing guidelines that define how Copilot should behave in a team, using familiar examples such as coding standards, review expectations, architecture boundaries, and security rules stored in versioned files. Emphasize that good instructions reduce repeated ad hoc requests and make outputs more predictable from session to session. AI Safety Moment: encode non-negotiable policy in instructions, not chat. Slide topic (1 slide): Memory — explain memory as the continuity layer that carries forward stable facts and preferences, such as preferred testing commands or repository conventions, when that context does not belong in policy files. Contrast useful operational memory with risky content such as secrets, regulated data, or one-off sensitive details. AI Safety Moment: do not persist sensitive or regulated data. Slide topic (1 slide): Context hierarchy — memory versus instructions — walk through how the current task request, scoped instructions, repository guidance, and memory interact during a real task so learners can see which source should win when guidance conflicts. Make clear that memory should complement instructions by adding reusable context, not replace durable standards. Usage Optimization: place durable standards in instructions and reserve memory for reusable context that should survive across sessions. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-03-44af44f5.png
---

<!-- Slide topic (1 slide): Instruction layering stack — explain the precedence model across organization guidance, repository instructions, scoped files, user settings, and the current task request, including why the same task can behave differently in different folders or repositories. Help learners see the stack as a practical debugging tool for inconsistent agent behavior. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-04-d87e170f.png
---

<!-- Use the agenda to set expectations that this module is intentionally moving from concepts into operating habits. Call out that the timing mixes short framing sections with three hands-on labs, so learners should expect to classify, design, and test workflows rather than just listen. Emphasize that each section adds another control layer: first context, then skill design, then loop mechanics, then scale controls. Transition by telling learners that the first control layer is understanding where Copilot gets its guidance and why conflicting guidance can produce surprising behavior. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-05-24279e55.png
---

<!-- Section: Instructions, Memory, and Skill Design (28 min). Slide topic (1 slide): What belongs in instructions, memory, and skills? — define the role of each layer with human examples learners can relate to: instructions hold team rules such as review expectations or security boundaries, memory stores stable reusable facts such as preferred test commands or repository conventions, and skills capture repeatable task patterns such as a safe refactor or bug-fix flow. Use this as the bridge from Foundations: the Stage 3 checklist becomes more reusable here, while the Stage 4 guardrails continue to shape what the skill is allowed to do. Give learners a simple litmus test: if it should apply broadly, it is probably an instruction; if it is a reusable fact, it may belong in memory; if it describes how to do work repeatedly, it is a skill. Slide topic (1 slide): One example across all three layers — walk through one concrete example, such as adding test coverage for a changed component, and show how the same workflow is split across layers: the instruction says tests are required, memory recalls the team command or folder pattern, and the skill defines the repeatable execution steps and stop conditions. This helps learners see that the layers complement each other instead of competing. Slide topic (1 slide): Anatomy of a well-scoped skill — break down a skill into target scope, task, constraints, definition of done, and off-ramp, then explain what failure looks like when one of those parts is missing. Give relatable examples such as a refactor skill that lacks file boundaries or a bug-fix skill with no acceptance criteria. Usage Optimization: well-scoped skills reduce retries. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-06-78d3e04f.png
---

<!-- Slide topic (1 slide): Decision test for safer execution — show how explicit acceptance gates, escalation paths, and stop conditions help a team decide whether guidance belongs in instructions, memory, a reusable skill, or just the current task request. Learners should see how phrases like "stop if tests fail" or "ask before changing dependencies" create safer delegated execution and reduce rework. Usage Optimization: lower AIC with fewer rework turns. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-07-f9d95d51.png
---

<!-- This is the point where the abstract terms become a design system: instructions, memory, and skills should each carry a different kind of responsibility. Use the test-coverage example to make the split concrete: the team rule says tests are required, memory can recall the preferred command or folder convention, and the skill describes the repeatable execution path. Reinforce the safety idea that durable standards and security boundaries belong in versioned instructions, not in a one-off chat message. Transition by explaining that once the layers are clear, the next risk is giving a skill too much freedom or too little definition. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-08-d1853a54.png
---

<!-- Walk learners through the skill contract as a practical blueprint, not documentation for its own sake. A safe skill names the files or components in scope, the specific task, the constraints, the definition of done, and the off-ramp for when execution should stop or escalate. The usage optimization point is important here: vague skills burn tokens through retries, while scoped skills reduce rework because the agent has fewer ambiguous choices to resolve. Close by connecting this to the lab, where learners will practice turning loose guidance into a contract with acceptance gates. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-09-1a3f2135.png
---

<!-- Section: Agent, Skill, and Loop Mechanics (28 min). Slide topic (1 slide): What is an agent — define an agent as a bounded worker that can plan, act, observe results, and adapt over multiple steps to complete an objective such as fixing a bug, preparing a summary, or investigating a failing test. Emphasize that the value comes from iterative execution, not just better text generation. AI Safety Moment: action-capable systems need explicit oversight and stop conditions. Slide topic (1 slide): Runtime decision model — human, tool, or agent? — compare simple deterministic tasks, like locating a symbol or editing a known file, with adaptive tasks that involve branching choices, ambiguous evidence, or multiple checkpoints. Position skills as the reusable patterns that shape execution, but keep the runtime focus on deciding whether the work should stay human-led, move through direct tools, or justify a multi-step agent loop. Tie this back to Foundations by showing that Module 1 introduced guarded delegation, while this section extends it into explicit runtime handoffs and evidence-driven execution choices. Usage Optimization: avoid over-delegating simple tasks that are faster and cheaper with direct skills and tools. Slide topic (1 slide): Anatomy of an agentic loop — describe the control cycle of request, decide, act, observe, and correct, including where humans should inspect outputs, verify evidence, and stop runaway behavior. Make explicit where loop boundaries should be set before execution begins so learners can see that oversight is designed in, not added after something goes wrong. Usage Optimization: bounded loops with termination criteria reduce token burn. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-10-bad3d8f0.png
---

<!-- Slide topic (1 slide): Verification artifacts and handoff evidence — elaborate on what good runtime evidence looks like before a handoff or acceptance step: diffs, test results, rationale, logs, unresolved risks, and a clear statement of what changed. This gives learners a concrete checklist for deciding whether an agent completed useful work or simply produced plausible-looking output. AI Safety Moment: require evidence before trust. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-11-ab02c529.png
---

<!-- Frame the loop as a control system rather than a magic autonomy cycle. The agent can request, decide, act, observe, and correct, but the team must decide in advance where evidence is inspected and where the loop is allowed to stop. This is the AI Safety Moment: action-capable systems need human-visible checkpoints, especially before accepting changes, expanding scope, or continuing after failures. The usage optimization is equally practical—bounded loops with clear termination criteria prevent expensive wandering and make handoffs easier to review. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-12-f9b2ab62.png
---

<!-- Section: Tool Strategy, Background/Cloud Agents, and Scaling Controls (22 min). Slide topic (1 slide): Background and cloud agents — when to use them — explain the tradeoffs between local synchronous work, background tasks, and cloud agents by using relatable scenarios such as long-running builds, parallel research, or isolated execution with different dependencies. Help learners choose based on duration, observability, environment needs, and whether they still have meaningful parallel work to do. Usage Optimization: use async or cloud paths only for genuinely long-running, parallelizable tasks. Slide topic (1 slide): Boilerplate with /init — show /init as a practical accelerator for creating reusable setup patterns, starter guidance, or repo scaffolding that teams would otherwise keep rewriting by hand. Usage Optimization: start from reusable templates to reduce setup churn. Slide topic (1 slide): Optimization controls — make model routing, context budgeting, permission boundaries, and validation cadence feel like operational dials teams can tune for speed, quality, and cost rather than abstract settings. Explain how the wrong defaults create drift, overspending, or unsafe autonomy. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-13-ddefb51e.png
---

<!-- Slide topic (1 slide): Best practices for safe and efficient AI workflows — combine least-privilege execution, explicit approval gates, narrow scope, and regular verification into a simple operating posture teams can reuse across repositories and sessions. AI Safety Moment: no scale-up without control evidence. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-14-74480dbd.png
---

<!-- Use this slide to slow down the instinct to send every task to the most powerful execution path. Local synchronous work is usually best when the task is short and you need immediate feedback; background work helps when something long-running can proceed while you do other useful work; cloud agents make sense when isolation, environment setup, or parallel capacity is the real constraint. The usage optimization message is that async and cloud paths are not free upgrades—they should earn their cost through duration, parallelism, or environment fit. Then introduce `/init` as the opposite kind of accelerator: a lightweight way to reduce repeated setup friction before larger workflows even begin. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-15-cd3a663c.png
---

<!-- Present these controls as the dials teams tune when moving from individual experiments to repeatable operations. Model routing, context budgeting, permissions, and validation cadence all affect the same tradeoff triangle of speed, quality, and cost. The safety point is that scale should require control evidence: least privilege, approval gates, narrow scope, and verification must be visible before a workflow is reused across repositories or teams. Transition to the final lab by asking learners to identify which dials they would tighten before moving a workflow from Stage 6 experimentation toward Stage 7 readiness. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-16-241e7b41.png
---

<!-- Section: Wrap-up and Advanced Handoff (10 min). Slide topic (1 slide): Intermediate module outcome — restate that the purpose of this module is to help teams move from ad hoc requests to reproducible control systems that work across people, sessions, and repositories. Learners should leave with a clearer operating model, not just a list of tips. Slide topic (1 slide): Quality equation for agentic workflows — summarize the formula for reliable outcomes: clear skill contracts, scoped tool access, explicit verification loops, and governance-aware execution choices. Make the point that better autonomy depends on better controls. Slide topic (1 slide): Transition to Advanced — position Module 3 as the next step where these same foundations are applied to multiagent orchestration, integration governance, debugging, and deployment-ready operations. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-17-9dee2259.png
---

<!-- This is the aha moment for the module: the goal was never to collect a bag of prompting tricks. The real outcome is moving from scattered, ad hoc requests to reproducible control systems that work across people, sessions, and repositories. Ask learners to think about one workflow in their own team that still looks like the messy diagram on the left, then name the first control that would make it more repeatable. Transition by saying the next slide turns that transformation into a compact quality equation. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-18-f5f00905.png
---

<!-- Summarize the quality equation as the blueprint for reliable autonomy: clear contracts, scoped access, explicit verification loops, and governance-aware execution choices. Each part compensates for a common failure mode—unclear goals, over-broad tools, unverified outputs, or autonomy that ignores organizational rules. Reinforce that better autonomy depends on better controls, not simply stronger models or more aggressive delegation. Use this as a final safety reminder that teams should trust evidence and process before they trust scale. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-19-6163c6f4.png
---

<!-- Close by positioning the Advanced module as the natural next step, not a separate topic. Everything learners practiced here—skill contracts, scoped tools, verification loops, and governance-aware execution—becomes more important when multiple agents, integrations, debugging paths, and deployment operations are involved. The safety message is to design secure and accountable transitions before adding orchestration complexity. The usage optimization message is to carry forward reusable patterns so advanced workflows scale efficiently instead of reinventing the operating model each time. -->
