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
background: /images/copilot-dev-agentic/slide-01-e45e1fd4.png
---

<!-- Welcome and frame the module by shifting the audience from "assistant" thinking to "autonomy with guardrails" thinking. Module 2 shows how GitHub Copilot can help plan, act, observe, and adjust, while the human still owns the final decision and review gates. Emphasize that the real value is safe delegation, not maximum automation. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-02-b10ecda3.png
---

<!-- This section defines the core mental model: an agent is the orchestrator, while a skill is one concrete capability it can call. Use the Plan → Act → Observe → Adjust loop to show why agents are useful for multi-step goals, not just for one-shot answers. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-03-2e70bfb2.png
---

<!-- Reinforce the distinction with a simple reminder: the agent chooses the path, but the skill performs the actual action. That separation makes it easier to explain where trust, review, and failure handling belong in the workflow. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-04-41cdb290.png
---

<!-- Use this section to help the audience choose the right level of autonomy for the task at hand. If the work needs judgment, iteration, or a sequence of actions, an agent is appropriate; if it is a single, predictable step, a direct tool or skill is usually better. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-05-994de3e9.png
---

<!-- The real advantage of an agent appears when the task is not fully specified up front. It can inspect intermediate results, correct its course, and keep moving toward the goal instead of stopping after the first guess. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-06-d7ac4890.png
---

<!-- This section introduces the idea that agentic work can happen outside the editor. Background agents keep working while you continue other tasks, and cloud agents carry that work into the issue, branch, implementation, and PR lifecycle. The key teaching point is that the developer stays in the review loop, not the background. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-07-2d459f7f.png
---

<!-- Explain the cloud workflow as a practical path from problem to proposal. The agent can start from an issue, create a branch, make changes in a prepared environment, and open a pull request for human review instead of asking the developer to do every step manually. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-08-bcbecbc9.png
---

<!-- /init is a good example of agentic acceleration with clear boundaries. It can create the skeleton of a project quickly, but the developer still needs to validate the stack, defaults, and assumptions before treating the scaffold as real work product. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-09-276c9cc6.png
---

<!-- The best scaffold results come from explicit requirements, not vague prompts. If you tell Copilot what stack, testing, and deployment expectations matter, it can generate a much stronger starting point for the team. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-10-3e781731.png
---

<!-- This section explains why Copilot behavior feels different across repositories and files. The instruction stack is cumulative: broad policies set the floor, repo rules shape the defaults, and file-specific guidance fine-tunes behavior for the current task. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-11-143122af.png
---

<!-- Call out that governance rules are not negotiable. The most specific instruction helps when the task is clear, but it still cannot override the organization-level policies that keep the environment safe and compliant. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-12-b27b4fbd.png
---

<!-- This is a good place to tie the concept back to real engineering practice. Teams should treat instruction layering as a reliability tool, not as a workaround for governance or security rules. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-13-9a86110a.png
---

<!-- Multi-agent patterns are most valuable when the problem itself has distinct roles: one agent can implement, another can review, and another can expand tests. Use Squad as a concrete example of how specialization can improve quality when the task is complex enough to justify the coordination. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-14-c05aefed.png
---

<!-- The operational lesson here is that multi-agent design succeeds or fails at the handoff. If roles, inputs, and acceptance criteria are not explicit, the team pays for that ambiguity in slower iterations and weaker output. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-15-a16a485a.png
---

<!-- This section is about treating token usage as a quality and reliability problem, not just a billing problem. The best teams optimize for fewer wasted loops, clearer prompts, and stronger guardrails because those choices improve both cost and correctness over time. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-16-78315ea9.png
---

<!-- Reinforce the practical idea that a higher-quality first pass often saves money in the long run. Fewer retries, fewer review cycles, and fewer failed assumptions mean the session uses fewer tokens and produces better output. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-17-58085a5f.png
---

<!-- This is the human-centered use case for Copilot: use it to pressure-test your own reasoning. When you write out the bug or design tradeoff, the model often exposes assumptions you did not realize were there, which is a huge benefit even before you ask for code. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-18-3e588f94.png
---

<!-- Remind the audience that this is a reasoning aid, not a substitute for validation. The best use of Copilot here is to challenge your assumptions and then verify the conclusion with code, tests, and runtime evidence. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-19-4a1c08eb.png
---

<!-- Close by tying the whole session back to a simple operating rule: use agents when the work needs adaptation and orchestration, and use direct tools when the work is predictable. The lab will give attendees a chance to practice that choice in real scenarios. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-20-be6f79a1.png
---

<!-- End on the practical takeaway: the strongest agentic workflows are disciplined ones. Clear constraints, good instructions, and review gates turn Copilot from a novelty into a dependable teammate. -->

---
layout: image-full
background: /images/copilot-dev-agentic/slide-21-c5cc6102.png
---

<!-- End by inviting attendees to choose one pattern they can try immediately in their own work. The goal is not to adopt every agentic feature, but to identify the first workflow that improves quality or speed without adding needless risk. -->
