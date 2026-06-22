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

<!-- Open by framing the module as a shift from asking Copilot for help to designing a workflow where it can act with boundaries. Call out that the session is about choosing when to delegate, when to stay hands-on, and how to keep review gates in place. Use this slide to set expectations: the value comes from disciplined autonomy, not from handing off everything at once. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-02-2e99ca4d.png
---

<!-- Explain the core vocabulary first: an agent is the orchestrator, while a skill is one concrete capability the agent can invoke. Use the Plan → Act → Observe → Adjust loop as the mental model for why agents feel different from a simple chat answer. Emphasize that an agent is not magic; it is a sequence of decisions, tool calls, and review points. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-03-ceadaa36.png
---

<!-- This slide is the bridge between the abstract definition and everyday workflow. Show that the agent chooses the right skill at the right moment—search, file edits, terminal commands, or API calls—rather than doing everything itself. The point is coordination, not replacement. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-04-2b9dc754.png
---

<!-- Help the audience decide by asking three questions: Is the task multi-step, does it require judgment, and does it need to adapt as it goes? If the answer is yes, an agent is the right shape. If the task is narrow and predictable, a direct tool or skill is usually faster and easier to review. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-05-07431cb7.png
---

<!-- This slide is where you make the tradeoff concrete. A direct skill works well when you know the exact action, but an agent pays off when the next step depends on what it learned from the last one. Call out that this adaptability is the real reason agents are useful. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-06-8123d760.png
---

<!-- Introduce the two execution environments: background agents for long-running work that stays attached to your current task, and cloud agents for issue-driven work that can run in a remote environment. The important distinction is where the work happens and who remains responsible for review. This section should make the audience picture the agent as something that can operate outside the local IDE when you allow it. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-07-0f14e447.png
---

<!-- Use this slide to connect the idea of an agent to the real cloud workflow. Explain that Coding Agent starts from a GitHub issue, creates a branch, runs the implementation in a remote environment, and opens a PR for human review. Emphasize that the agent needs a prepared runner with the same dependencies, compilers, and test commands the project uses, which is why `copilot-setup-steps.yml` is included. The setup file is not extra magic; it makes the cloud run reproducible and safe by installing the tools the agent must execute before it begins. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-08-0d7df917.png
---

<!-- Use this section to show that /init is a shortcut for starting a project, not a substitute for product or architecture judgment. It can create a sensible baseline, but the developer still needs to verify the stack, naming, tests, and defaults that matter to the team. Frame it as an accelerator that reduces blank-page friction without removing accountability. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-09-8b54d283.png
---

<!-- This is a good moment to remind the audience that scaffolding quality depends on how specific the skill definition is. If you tell Copilot the stack, testing approach, and deployment expectations, the result will be more usable and safer to review. If the skill stays vague, you'll spend more time undoing assumptions than saving time. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-10-381591b7.png
---

<!-- Explain that Copilot behavior is not controlled by one file or one skill alone. It is shaped by layers: organization policy, repository guidance, file-specific instructions, user defaults, and the current task. The audience should understand that more specific instructions usually win, but the higher-level guardrails still matter. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-11-caf7aa7f.png
---

<!-- This slide is the safety lesson: organizational policies are not negotiable in the same way repo advice is. Use it to explain why team-wide security, compliance, and content rules still matter even when a repo-specific instruction looks more precise. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-12-d90b444c.png
---

<!-- Reinforce the practical takeaway: instruction layering is not an abstract concept, it is the mechanism that keeps AI output aligned with enterprise policy. When the audience sees a conflict, remind them that the most specific instruction should still operate inside the allowed boundaries. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-13-8bdcdf40.png
---

<!-- Introduce the idea of a small team of agents as a specialization pattern, not a universal requirement. Use Squad as the example: one agent writes, another reviews, and another validates tests or edge cases. The point is to separate responsibilities so the system is easier to reason about and easier to review. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-14-5d28071e.png
---

<!-- This slide should make the audience think about handoffs instead of just more agents. If roles are fuzzy, the orchestration becomes noisy and hard to trust. If the handoff points and success criteria are clear, the team can use multiple agents without losing accountability. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-15-4e748320.png
---

<!-- This section is about ROI, not just cost. Remind the audience that a cheap but low-quality agent creates more review, more rework, and more wasted tokens than a slightly more capable setup. The key message is that quality and efficiency reinforce each other when the agent is scoped well and given clear constraints. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-16-9c5ebfd5.png
---

<!-- Use this slide to connect the idea of quality to the real economics of agent work. A single bad agent output can trigger extra skill revisions, more edits, and additional validation loops. When you improve the first pass, the total token spend often falls because you avoid downstream cleanup. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-17-42fa362e.png
---

<!-- Frame this as an everyday practice, not a gimmick. Asking Copilot to critique your explanation or design choice helps reveal assumptions that you might not notice when you are deep in the problem. It is especially useful for turning vague uncertainty into a specific question to test next. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-18-a718f8df.png
---

<!-- This is the safety reminder for the debugging section. Copilot can generate hypotheses quickly, but the final decision should still be validated with tests, logs, architecture review, or a second human perspective. The goal is to use the model as a thinking partner, not as the sole authority. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-19-908716c5.png
---

<!-- Close by tying the whole module together: agents coordinate skills, and skills perform concrete actions. Remind the audience that the right choice depends on scope, judgment, and review needs, not on the latest feature name. End by inviting them to take one pattern from the session back to their real codebase. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-20-31f06550.png
---

<!-- Use this final slide to summarize the recurring theme: the best agent workflows are the ones with clear constraints, visible review points, and well-defined goals. These techniques are force multipliers when the team still owns the decisions and the acceptance criteria. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-21-2885ff47.png
---

<!-- End with a practical reflection question: which pattern from today would you try first in a real task, and what review gate would you keep in place before accepting the result? -->
