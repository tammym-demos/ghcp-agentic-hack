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
background: /images/copilot-dev-agentic/slide-01-508342fc.png
---

<!-- Welcome and frame the module. Module 2 helps developers move from "GitHub Copilot as a smart assistant" to "GitHub Copilot as a scoped autonomous teammate." Participants learn how agents coordinate skills, when to choose direct tool use instead of delegation, how background and cloud agents change the workflow, and how instruction layering and multi-agent patterns shape safe adoption. The emphasis throughout is practical trust calibration: delegate intentionally, keep review gates in place, and design workflows that still leave the developer in control. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-02-2e99ca4d.png
---

<!-- Section: What Is an Agent? What Is a Skill? (10 min). An agent is a goal-directed workflow that can plan, take actions with tools, observe the result, and adjust based on what it learns A useful mental model for agentic execution is: A skill is a specific capability the agent can invoke, such as file edits, terminal access, search, web browsing, or GitHub API calls -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-03-ceadaa36.png
---

<!-- Agents do not replace skills; they orchestrate skills to complete a larger outcome -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-04-2b9dc754.png
---

<!-- Section: Agent vs. Skill — When to Use Each (12 min). Use an agent when the task is multi-step, goal-directed, and likely to require judgment during execution Use a skill or direct tool invocation when the task is single-step, deterministic, and does not need adaptation A simple decision framework: -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-05-07431cb7.png
---

<!-- Agents are strongest when they can sequence actions, inspect results, and revise the next step -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-06-8123d760.png
---

<!-- Section: Background Agents and Cloud Agents — Coding Agent (15 min). Background agents are long-running agents that keep working while the developer continues with other tasks Developers launch them, monitor progress, review intermediate output, and inspect the final result before accepting it Cloud agents, including Coding Agent, extend the workflow beyond the local IDE into an issue → branch → implement → pull request flow -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-07-0f14e447.png
---

<!-- Coding Agent can work from a GitHub issue, create a branch, implement the change in a cloud environment, and open a PR for review -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-08-0d7df917.png
---

<!-- Section: GitHub Copilot `/init` and Project Bootstrapping (8 min). GitHub Copilot /init helps scaffold a new project by generating structure, configuration, and starter boilerplate It is most useful when you want to accelerate a standard project setup rather than hand-author every starter file /init is not a replacement for design decisions; it is a starting point that still needs developer review -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-09-8b54d283.png
---

<!-- Teams can customize the scaffold by being explicit about stack, architecture, testing, and deployment expectations -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-10-381591b7.png
---

<!-- Section: Instruction Layering — Org, Repo, and File-Scoped (15 min). GitHub Copilot behavior is shaped by a layered instruction stack, from broad organizational guardrails down to the current chat request The full stack looks like this: In practice, the most specific applicable instruction wins when guidance conflicts -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-11-caf7aa7f.png
---

<!-- Organization-level guardrails cannot be overridden by repository instructions -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-12-d90b444c.png
---

<!-- Safety: Organization-level guardrails exist for a reason -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-13-8bdcdf40.png
---

<!-- Section: Multi-Agent Patterns — Squad as a Worked Example (15 min). Multi-agent workflows are useful when distinct roles benefit from different goals, tools, or evaluation criteria A concrete reference is Squad: <https://github.com/bradygaster/squad> In a multi-agent pattern, one agent might write code, another might review for defects, and another might expand or validate tests -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-14-5d28071e.png
---

<!-- Effective orchestration depends on clearly defined roles, crisp handoff points, and a shared definition of done -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-15-4e748320.png
---

<!-- Section: Agent Quality & Token Optimization (25 min). Core principle: "Make every token count" — focus on agent output quality, not just cost reduction If the value of an agent's output is zero, even 80–90% cost reduction is just toil — quality determines ROI The compounding error problem: even 99% single-step accuracy drops to ~60% over 50 steps; 95% accuracy drops to ~8% -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-16-9c5ebfd5.png
---

<!-- Every agent miss wastes tokens (discarded work, fix sessions, review cycles) — improving quality often *decreases* cost naturally -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-17-42fa362e.png
---

<!-- Section: Rubber Duck Debugging with GitHub Copilot (5 min). GitHub Copilot can act as a thought partner when you explain a bug, design tradeoff, or architectural concern out loud in writing The act of explaining your reasoning often reveals missing assumptions, hidden dependencies, or weak logic Cross-model review can help by giving you a second perspective on the same problem -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-18-a718f8df.png
---

<!-- AI reasoning can be useful for surfacing possibilities, but design decisions still need independent validation -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-19-908716c5.png
---

<!-- Section: Wrap-up, Hand-off to Lab, and Q&A (5 min). Agents coordinate skills; skills perform specific actions Choose agentic workflows when the task is multi-step and adaptive, and direct tool use when the task is simple and deterministic Background agents, cloud agents, and Coding Agent expand where work happens, but review gates remain essential -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-20-31f06550.png
---

<!-- GitHub Copilot /init, instruction layering, and custom orchestration patterns are force multipliers when paired with clear constraints -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-21-2885ff47.png
---

<!-- Ask the audience: Which pattern from today feels immediately usable in your workflow? -->
