---
theme: ../../themes/github
title: "Copilot Dev Foundations"
info: |
  Generated from NotebookLM presentation for copilot-dev-foundations
ghFooterTitle: "Copilot Dev Foundations"
ghFooterLabel: ""
drawings:
  persist: false
transition: slide-left
mdc: true
layout: image-full
background: /images/copilot-dev-foundations/slide-01-c514836a.png
---

<!-- Welcome everyone to Module 1 and set the expectation that this session is about using Copilot intentionally, not just casually. Frame Copilot as an acceleration layer for discovery, drafting, planning, and execution while keeping engineering judgment firmly with the human. Let the audience know we will move through mode selection, context management, prompting, and lightweight customization before handing off to the lab. A quick show of hands on who has used chat, agent mode, or the CLI can help you calibrate pacing for the room. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-02-ee5489f9.png
---

<!-- Use this slide to introduce the idea that more autonomy is not automatically better. Emphasize that strong Copilot users choose the lowest-autonomy tool that solves the task well, because that usually gives better speed, lower risk, and less review overhead. Give one concrete example for each level: inline for a small function, chat for explanation, plan for a refactor design, and agent for a bounded multi-file change. Ask the audience which level they reach for first today and whether they may be overusing higher-autonomy modes. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-03-01dff1c7.png
---

<!-- Make the accountability boundary explicit here: Copilot can propose, but the engineer owns correctness, security, architecture, and approvals. Share a quick anecdote about an AI suggestion that looked plausible because it matched surrounding syntax but still needed verification. Reinforce that generated shell commands and architectural claims deserve the same scrutiny as generated code. Land on the habit you want them to remember: the model proposes, the developer decides. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-04-5e5b315e.png
---

<!-- Walk the audience through a simple decision rule for mode choice: Ask to understand, Plan to design, Agent to execute within guardrails. Stress that Plan mode is often the safest bridge between curiosity and action because it surfaces risks before files change. Mention that session continuity is useful when the objective is stable, but stale sessions create drift and should be restarted without hesitation. If you are demoing later, preview that you will show the same task framed in different modes to compare behavior. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-05-0890191d.png
---

<!-- Explain that prompt quality is not only about wording; it is also about targeting the right helper and the right slice of context. Give a short spoken example such as using @workspace for a repo summary, #file for a focused refactor, and /explain to skip boilerplate prompt text. Call out that @terminal and the Copilot CLI are especially useful when developers live in the shell and want help interpreting output or automating repeatable questions. Invite the audience to notice whether they tend to ask broad, fuzzy questions when a participant or context variable would narrow the task immediately. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-06-407edf5c.png
---

<!-- Use a simple analogy here: the context window is a carry-on bag, not a moving truck, so only the highest-value context should make the trip. Explain that stale chat history, too many attached files, and oversized workspace requests can crowd out the very details the model needs most. Tie this to cost and latency by noting that large payloads are slower and can consume premium usage without improving the answer. Encourage the room to prefer #selection or #file over broad context whenever the task is local and specific. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-07-92128624.png
---

<!-- Position instructions as the way teams turn one-off prompting habits into durable operating guidance. Explain the layering: built-in Copilot provides the baseline, repository instructions encode team-wide rules, and file-scoped instructions add narrow guidance where it matters most. Give a practical example such as repository rules for naming and tests, then file-scoped rules for test structure or slide formatting. Stress that narrower instruction files are usually better because they preserve context budget while still aligning output with team standards. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-08-20e91331.png
---

<!-- Teach this as a reusable prompt framework the audience can apply immediately after the session. Contrast a weak request like “refactor this” with a strong request that names the outcome, scope, constraints, and definition of done. Point out that most disappointing Copilot output is really a specification problem, not a model problem. If you want interaction, ask attendees to mentally rewrite one vague prompt they used recently using these four fields. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-09-cbe57b71.png
---

<!-- Explain that model choice is a tradeoff decision, not a loyalty decision. Smaller or default models are often the right answer for quick iteration, simple edits, and rapid discovery, while larger reasoning models earn their keep on ambiguity, tradeoffs, and multi-step planning. Note that the auto router is convenient, but expert users know when to override it for either speed or depth. Tie the choice back to team economics by mentioning latency, token use, and premium-request budgets. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-10-71d59600.png
---

<!-- Introduce customization as a spectrum so people do not jump straight to the heaviest option. Reusable prompts are usually the fastest win for repeatable tasks because they standardize structure without creating a persistent persona. Custom agents and skills become valuable when the workflow is multi-step, domain-specific, or needs special tools and guardrails. Encourage teams to start with reversible, explain-before-edit behaviors when they introduce any new custom workflow. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-11-23dbc837.png
---

<!-- Use this slide to stitch the module into one operational habit rather than a list of features. Walk through the loop as a discipline: scope first, choose the engine deliberately, structure the prompt, inspect the output, and only then approve changes. Emphasize that iteration is expected; when a session drifts, branch it or restart it instead of continuing to pile on vague corrections. This is the mindset you want them to carry into the lab and into everyday development work. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-12-be8f6d52.png
---

<!-- Close by turning the checklist into a personal commitment rather than a passive summary. Ask each attendee to pick one prompting habit they will stop today, such as asking without scope, overusing broad workspace context, or jumping to agent mode too quickly. Reinforce that they now have enough foundation to practice safer mode selection, instruction layering, and terminal workflows in the lab. Transition cleanly into the hands-on exercise and invite final questions that should carry forward into Module 2. -->
