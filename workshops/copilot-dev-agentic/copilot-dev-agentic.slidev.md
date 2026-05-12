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
background: /images/copilot-dev-agentic/slide-01-21f9bc19.png
---

<!-- Welcome the group to Module 2 and frame the shift from foundations to autonomy. In Module 1 we learned how to drive Copilot intentionally; now we explore what happens when Copilot drives itself. Set the expectation that higher autonomy is powerful but demands proportionally stronger guardrails: review gates, scope boundaries, and clear off-ramps. Ask who has already tried agent mode or the coding agent so you can gauge the room's comfort level before diving into definitions. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-02-def618f2.png
---

<!-- Define the agent loop: Plan, Act, Observe, Adjust. Stress that this loop is not unique to AI — it mirrors how experienced engineers already work — but Copilot can now execute it autonomously within a session. Distinguish an agent from a skill: a skill is a single-shot capability like code completion or test generation, while an agent orchestrates multiple skills across steps. Use a kitchen analogy — a skill is a knife, an agent is the chef who sequences knife work, heat, plating, and timing. Ask the audience to think of a recent task that required more than one tool or step and whether they delegated it or did each step manually. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-03-d007efee.png
---

<!-- Walk through the decision tree on the slide: Does the task require multiple steps? Does it need judgment between alternatives? Does it need to adapt based on intermediate results? If all three answers are yes, you want an agent. If the task is a single well-defined action, a skill is simpler, faster, and easier to review. Give two concrete examples: generating a unit test file is a skill; migrating a codebase from one ORM to another across dozens of files is an agent-level task. Emphasize that choosing the wrong level is not just inefficient — an agent on a skill-level task wastes tokens and review time, while a skill on an agent-level task produces incomplete results. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-04-a45cb249.png
---

<!-- Introduce background agents as the first step toward async AI collaboration. The key value proposition is that the developer can continue working on something else while the agent handles a bounded task in the background. Walk through the lifecycle shown on the slide: launch an agent with a clear scope, monitor its progress through status updates, then review and approve or reject the result. Stress the review gate — background work does not merge itself. Compare it to assigning a task to a junior teammate: you define scope, check in periodically, and review the deliverable before it ships. Mention that background agents run in a sandboxed session, so they cannot affect the working tree until the developer accepts changes. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-05-d7a70617.png
---

<!-- Explain cloud agents, specifically the Coding Agent, as the most autonomous Copilot surface: it runs on a remote runner, creates a branch, implements changes, and opens a pull request. Walk through the flow on the slide: assign an issue, the agent picks it up, works in its own environment, and delivers a PR for human review. Highlight copilot-setup-steps.yml as the configuration file that defines the agent's environment — dependencies, build commands, and test scripts it should run. Emphasize that every PR from the coding agent goes through normal code review, CI, and approval gates. The human stays in control of what merges. Ask the audience what kinds of issues they would feel comfortable assigning to a coding agent today versus what feels too risky. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-06-e46ee6ed.png
---

<!-- Position /init as a scaffolding accelerator, not a replacement for architecture decisions. It generates project structure, config files, and boilerplate based on a natural-language description. The safety moment here is critical: always review what /init produces before building on top of it. Scaffolded output may include dependency versions, folder structures, or patterns that do not match your team's standards. Encourage the audience to treat /init output the same way they would treat a Stack Overflow answer — useful starting material that needs verification and adaptation. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-07-a3ce305d.png
---

<!-- Walk through the five-layer instruction stack from broadest to narrowest: organization policies, repository-level copilot-instructions.md, file-scoped instruction headers, user settings, and session context. Explain that narrower layers override broader ones, which lets teams set guardrails at the org level while individual repos and files can add precision. Give a concrete example: an org rule says "always write tests," a repo instruction says "use pytest with fixtures," and a file instruction says "mock the database layer." Stress the safety principle that individual developers should not override organizational guardrails — the layering exists to protect consistency and compliance. If you are demoing, preview that the lab will have them create a repo-level and file-scoped instruction and observe how Copilot behavior changes. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-08-80808a32.png
---

<!-- Introduce the Squad pattern as a worked example of multi-agent collaboration. In the Squad model, you assign different agents to different roles: one implements, one reviews, and one tests. Each agent works independently and the results converge through normal review processes. Explain why this works: specialization reduces context pollution, and separation of concerns mirrors how human teams already operate. The key tradeoff is coordination overhead — launching three agents is only worthwhile when the task is large enough to justify the setup cost. For small tasks, a single agent session is simpler and faster. Ask the room whether they have tried using Copilot to review its own output and what they noticed about blind spots. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-09-efa443df.png
---

<!-- This is one of the most important safety concepts in the module. An off-ramp is a deliberate exit point where the agent stops, escalates, or returns partial results rather than continuing to iterate on a failing path. Explain the three scenarios on the slide: knowing when to stop because the task is complete, when to escalate because the task exceeds the agent's capability, and when to return partial results because full completion is blocked. Draw the parallel to human engineering — we do not let a stuck build loop forever; we set timeouts and alerts. The same discipline applies to agentic workflows. Encourage the audience to design off-ramps before launching agents, not after something goes wrong. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-10-201c664c.png
---

<!-- Rubber duck debugging with Copilot means using the model as a sounding board to validate your reasoning, not just to generate code. Encourage developers to explain their approach to Copilot and ask it to find flaws, edge cases, or alternative interpretations. A second powerful technique is cross-model review: if you generated code with one model, ask a different model to review it, since different models have different blind spots. The key principle is to validate independently — do not ask the same session that generated the code whether the code is correct, because it will tend to confirm its own output. Start a fresh session or switch models for genuine review. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-11-aae4574e.png
---

<!-- Use this synthesis slide to connect the topics into one coherent mental model. Trace the arc: we defined what agents and skills are, learned when to use each, explored the spectrum from background agents to fully autonomous cloud agents, layered instructions to control behavior, designed multi-agent workflows with Squad, and built in safety with off-ramps and rubber duck validation. Ask the audience which concept surprised them most or which one they plan to try first. This is a good moment to take a few questions before transitioning to the lab. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-12-76082005.png
---

<!-- Preview the three lab exercises: exploring agent vs. skill behavior, setting up instruction layering at repo and file scope, and building a custom agent with background execution. Remind participants of the safety principles from the module — especially review gates and off-ramp design — and encourage them to apply those habits during the exercises. Mention that Module 3 will go deeper into MCP, debugging agent behavior, and designing complex agentic loops, so this lab is a bridge between understanding patterns and building real workflows. -->
