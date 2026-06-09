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
background: /images/copilot-dev-advanced/slide-01-fb062fa8.png
---

<!-- Welcome to Module 3: Advanced Topics. This session builds on the foundations from Module 1 and the agentic patterns from Module 2 to explore operational capabilities — connecting external systems, understanding memory, debugging what Copilot actually sends and receives, and designing safe agentic loops. By the end, participants will know how to evaluate, enable, and constrain advanced Copilot features responsibly. Remind attendees they should have their Module 1-2 project open since we will reference those artifacts throughout. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-02-d6661fb3.png
---

<!-- Here is our agenda for the next 90 minutes. We will cover six main topics: MCP for connecting external systems, APIs and plugins for extending workflows, memory behavior across Copilot surfaces, debugging with chat and agent logs, agentic loops and off-ramp design, and finally resources to stay current. Each section pairs a short presentation with a live demo, and we have three hands-on exercises spaced throughout. The pace is brisk — we are building on everything from Modules 1 and 2. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-03-dd86c312.png
---

<!-- MCP — the Model Context Protocol — is a standard that lets AI tools connect to external data sources and services in a structured way. Think of it as a universal adapter: instead of every tool building its own bespoke integration, MCP defines a common interface that Copilot can discover and invoke. This means Copilot can reach beyond your repository files into databases, internal APIs, documentation systems, and enterprise services. The key mental model is that MCP servers expose tools and resources, and Copilot discovers them at runtime — similar to how a browser discovers available extensions. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-04-af1f3414.png
---

<!-- Configuration is straightforward: you define MCP servers in a .vscode/mcp.json file or through VS Code settings. Each server entry specifies a command, transport type, and any required arguments. When Copilot starts an agent session, it discovers the available tools from all configured servers and adds their descriptions to the context. Important operational note: every active server's tool descriptions consume input tokens on every request, so only enable servers you actually use. In the demo, we will configure a simple fetch server and observe the approval flow before any external call executes. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-05-e4414290.png
---

<!-- Beyond MCP, Copilot workflows become more powerful when they integrate with external APIs and specialized plugins. Extensions like @docker and @azure add domain-specific commands and context directly into the chat experience. Agent workflows can call REST APIs during planning and execution when the environment exposes those capabilities. The key trade-off to discuss with your team: many common tools like git, npm, and docker are already well-represented in model training data, so invoking them via CLI often produces better results than routing through an MCP server. MCP adds value when you need structured input/output, authentication management, or state that a simple shell command cannot provide. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-06-0725e750.png
---

<!-- Memory helps Copilot retain useful preferences, conventions, and durable context beyond a single exchange. In Module 1, participants stored a preference and observed it persist in a new session. Now we dig deeper into how memory differs across surfaces — IDE chat, CLI, and GitHub.com workflows may not all share the same memory store. The key distinction: memory is for durable personal preferences that persist across sessions and repos, while instruction files define team-wide rules, and session context is ephemeral. Remind participants that in Module 2 they experienced how instruction files and memory interact during the conflict exercise. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-07-76b0a61c.png
---

<!-- Good memory strategy focuses on stable preferences and recurring working style rather than one-off task details. Start fresh when context becomes stale, overly specific, or likely to bias the next task incorrectly. Avoid storing secrets, sensitive identifiers, or short-lived task context as memory — these waste tokens on every future request where they are irrelevant. The feature continues to evolve toward clearer controls, better visibility, and more deliberate persistence. Show participants where stored memories can be reviewed and managed in VS Code settings and on github.com/settings/copilot/memory. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-08-31d9bb9c.png
---

<!-- Debugging Copilot starts with inspecting what it actually sent and received. In VS Code, open View → Output and select GitHub Copilot Chat from the dropdown — this log stream shows the raw request payloads, context attachments, and model responses. Participants already used this panel in Module 2 for token usage review; now we go deeper into diagnosing prompt drift, wrong files being included, or excessive workspace expansion. The logs reveal exactly how many tokens are being sent per request, making context bloat visible before it causes quality degradation. This is often the fastest path from 'it acted strangely' to a concrete explanation. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-09-9fbfa657.png
---

<!-- Agent debug logs go beyond chat logs by showing tool selection decisions, action ordering, and why a workflow chose a particular path. When agents run multi-step tasks, the logs reveal the plan-execute-observe-reflect cycle in action. Common debugging scenarios include: the agent included wrong context, hallucinated an assumption, entered a loop, or made an unexpected tool call. Use these logs to verify that Copilot is not leaking sensitive context or calling unauthorized services. Make log review part of any high-trust agent rollout — if you cannot explain why the agent did something, you should not let it do it unsupervised. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-10-49145562.png
---

<!-- Agentic loops follow a repeatable cycle: plan, execute, observe, reflect, and adjust. The 'Ralph Loop' is a convenient name for that iterative pattern in complex agent workflows. Loops are powerful for multi-step tasks like code changes followed by test execution and revision, but they are overkill when a direct answer or single edit would suffice. Termination criteria matter — the agent needs a clear definition of done, failure, or escalation. Without these, you get runaway loops, repeated failed actions, or silent assumption stacking. Subagents let a primary agent delegate specialized work to narrower helpers, keeping the main context clean while paying for duplicated system tokens in the sub-context. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-11-04f853cb.png
---

<!-- Off-ramps are the safety mechanism that makes agentic autonomy responsible. When the optimal path is unavailable, agents should stop, explain why, and hand the decision back to a human. Good off-ramps surface missing access, conflicting tests, unresolved ambiguity, or unsafe assumptions early — before the agent compounds errors. You encode off-ramps in agent instructions, review checklists, and tool approval policy. The example pattern shown here — stop if tests break, explain what is missing, present options instead of choosing — should feel familiar from the reviewer agent participants built in Module 2. Design off-ramps before granting more autonomy, not after something goes wrong. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-12-33434e6a.png
---

<!-- The Copilot ecosystem is evolving quickly — agent features, memory behavior, MCP support, and integrations change frequently. Key resources to share: Squad by Brady Gaster is a multi-agent collaboration framework worth exploring; awesome-copilot collections aggregate community patterns and extensions; the official GitHub Copilot changelog is the most reliable source for current capabilities. Remind participants that community tools are not automatically vetted — evaluate third-party MCP servers, plugins, and extensions for transparent permissions, active maintenance, and clear provenance before trusting them with your codebase or credentials. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-13-361fd3b1.png
---

<!-- Let us recap the three-module journey. Module 1 established foundations: context, chat modes, instructions, and effective prompting. Module 2 focused on agentic patterns: delegation, background work, and layered instructions. Module 3 added advanced operations: MCP, APIs, memory, debugging, loops, and off-ramp design. The next step is applying these patterns in a Day 2 hack setting with real workflows and real constraints. Success means not just using Copilot more, but using it more deliberately, observably, and safely. Open the floor for final questions and point participants toward the resources slide for continued learning. -->
