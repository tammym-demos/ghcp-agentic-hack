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
background: /images/copilot-dev-foundations/slide-01-e45e1fd4.png
---

<!-- Welcome and frame the module. Module 1 establishes the mental model and operating habits that make GitHub Copilot useful in day-to-day development work. Attendees move from basic chat usage to intentional mode selection, better context management, repository customization, and informed decisions about models, agents, and reusable prompts. The goal is not to treat GitHub Copilot as magic, but to use it as a reliable acceleration layer that still keeps the developer in control of correctness, security, and final decisions. -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-02-b10ecda3.png
---

<!-- Section: Foundations Framing, Safety, Privacy, and Workflow Map (5 min). GitHub Copilot offers increasing autonomy across a spectrum: inline completion, chat-based assistance, planning help, and agentic execution Position GitHub Copilot as an acceleration layer for discovery, drafting, planning, and implementation rather than as a replacement for developer judgment The human developer remains accountable for correctness, security, compliance, architecture, and final approvals -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-03-2e70bfb2.png
---

<!-- A simple mental model helps teams scale adoption safely: -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-04-41cdb290.png
---

<!-- Safety: Treat AI as a partner, not a substitute for engineering accountability -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-05-994de3e9.png
---

<!-- Ask the audience: What does your current GitHub Copilot workflow look like today? -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-06-d7ac4890.png
---

<!-- Section: Copilot Interaction Modes (20 min). Code Completions (Ghost Text) are the most-used Copilot feature and the fastest interaction mode: Inline Chat (Ctrl+I / Cmd+I) provides a lightweight prompt experience directly in the editor without opening the Chat panel: Ask mode is best for explanation, exploration, code reading, and quick answers without changing files -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-07-2d459f7f.png
---

<!-- Plan mode is best for design, sequencing, and risk-aware change proposals before implementation -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-08-bcbecbc9.png
---

<!-- Safety: Do not over-trust inline completions just because they appeared quickly or matched surrounding syntax — always read before accepting -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-09-276c9cc6.png
---

<!-- Ask the audience: How often do you accept completions without reading them? What habits could reduce blind acceptance? -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-10-3e781731.png
---

<!-- Section: Memory, Context & Instructions (25 min). GitHub Copilot responses depend heavily on the context window: active files, recent conversation, explicit mentions, repository instructions, and any relevant scoped guidance Context is prioritized and truncated, so clearer prompts and better scoping usually outperform longer prompts with unnecessary detail Token usage matters because large context payloads can slow responses, increase premium usage, and crowd out the most useful information -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-11-143122af.png
---

<!-- Developers should regularly inspect what context is being sent and trim irrelevant files, stale conversation state, or overly broad workspace requests -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-12-b27b4fbd.png
---

<!-- Safety: Context selection is also a privacy and governance decision -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-13-9a86110a.png
---

<!-- Ask the audience: What rules would you encode first for your team's codebase? -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-14-c05aefed.png
---

<!-- Section: Models, Agents, Skills & Customization (32 min). Different models are optimized for different goals: some emphasize speed and low latency, while others perform better on deep reasoning, larger change sets, or ambiguous tasks A practical selection model: The auto model router is convenient for mixed workloads, but developers should still know when to override it for a hard problem or a fast path -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-15-a16a485a.png
---

<!-- Premium-request and token budgets matter; broad context, stronger models, and agentic execution all raise the cost of a careless workflow -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-16-78315ea9.png
---

<!-- Safety: Greater capability increases the blast radius of a weak prompt -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-17-58085a5f.png
---

<!-- Ask the audience: How would you decide between a fast small model and a larger reasoning model for a given task? -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-18-3e588f94.png
---

<!-- Section: Wrap-up, Hand-off to Lab, and Q&A (5 min). GitHub Copilot is most effective when developers choose the right autonomy level, supply focused context, and keep review accountability with the human Small customizations such as instructions and reusable prompts often deliver value faster than jumping immediately to advanced agent setups Model choice, context discipline, and session management all influence quality, speed, and cost -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-19-4a1c08eb.png
---

<!-- The hands-on lab reinforces today's core habits: mode selection, instruction layering, and lightweight customization -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-20-be6f79a1.png
---

<!-- Ask the audience: What is one GitHub Copilot habit you want to change immediately after this session? -->

---
layout: image-full
background: /images/copilot-dev-foundations/slide-21-c5cc6102.png
---

<!-- Close by asking attendees to name one Copilot habit they will change immediately, such as attaching narrower context, starting fresh sessions sooner, or using Plan before Agent for risky changes. Reinforce that the workshop is about deliberate control: choose the right surface, give Copilot the right context, and keep human review as the final gate. Point learners to the lab as the place to practice mode selection, instruction layering, memory, and lightweight customization while the concepts are still fresh. Invite questions that should carry into Module 2, especially around agentic delegation, approvals, and safer orchestration. -->
