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

<!-- Welcome the group to the final module and set the tone: we are moving from using Copilot's built-in capabilities to extending its intelligence with external tools, protocols, and architectural patterns. Let the audience know this module covers MCP, API integration, memory strategies, debugging agent behavior, and designing safe agentic loops. Frame the session as equipping them to build production-grade Copilot workflows, not just use the defaults. Ask who has configured an MCP server or inspected agent debug logs before to gauge the room. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-02-d6661fb3.png
---

<!-- Explain MCP as the standardized protocol that lets Copilot talk to external tools and data sources without custom integration code. Cover the three pillars on the slide: What (a JSON-RPC protocol for tool discovery and invocation), Why (interoperability across IDEs, agents, and providers), and How (transport types like stdio for local servers and streamable HTTP for remote ones). Use the analogy of USB for peripherals — MCP gives AI assistants a universal plug so any tool can connect without a bespoke driver. Emphasize the trust boundary: MCP servers run code and access data, so teams must vet which servers they enable and understand what permissions each server requires. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-03-dd86c312.png
---

<!-- Walk through the architecture diagram on the slide: the IDE acts as the MCP client, connecting to one or more MCP servers that each wrap a specific external system — a database, an API, a file system, or a monitoring tool. Explain that the client handles discovery (what tools are available?), invocation (call this tool with these parameters), and result handling (feed the response back into the conversation). Point out that multiple servers can be active simultaneously, giving the agent access to a rich toolkit without embedding any of that logic in the model itself. If you are demoing, preview that the lab will have them configure a real MCP server and observe how Copilot discovers and uses its tools. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-04-af1f3414.png
---

<!-- Cover the patterns for integrating external APIs — both REST and GraphQL — with Copilot via MCP or direct tool configuration. Discuss authentication strategies: API keys stored in secrets, OAuth flows for user-scoped access, and managed identity for cloud resources. The critical safety point is the data boundary: when Copilot calls an external API, data leaves the local context and enters a third-party system. Teams need to understand what data is being sent, whether it includes sensitive information, and whether the API's terms of service align with their data governance policies. Give a concrete example such as connecting to a project management API to read ticket details versus writing back status updates. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-05-e4414290.png
---

<!-- Explain the three types of memory Copilot uses today: session memory that lives only within a single chat conversation, instruction memory from the files we covered in Module 2 that persists across sessions, and implicit memory where Copilot learns patterns from the codebase it indexes. Be honest that persistent cross-session memory is still an evolving frontier — the model does not remember yesterday's conversation unless instructions or workspace context re-establish that knowledge. The privacy angle matters here: anything in instruction files or workspace indexing is visible to the model, so teams should be intentional about what they commit to those surfaces. Invite questions about what the audience wishes Copilot could remember and discuss which of those use cases instruction files can already solve. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-06-0725e750.png
---

<!-- Introduce the three debugging strategies as a progression: start with chat-first debugging by asking Copilot to explain an error or suggest fixes, escalate to agent debug logs when you need to understand what the agent tried and why it made specific choices, and use systematic isolation when the problem is subtle and you need to control variables. Emphasize that debugging Copilot output is a skill just like debugging your own code — it requires understanding what the model saw, what it inferred, and where it went wrong. The debug logs in the Output panel are the primary diagnostic tool and we will dive into them on the next slide. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-07-76b0a61c.png
---

<!-- Walk through what the Output panel shows when you select GitHub Copilot or GitHub Copilot Chat from the dropdown. Explain the log anatomy: you will see the prompt that was sent (including system instructions and context), the model's response, tool calls the agent made, and any errors. Highlight common patterns to look for: context truncation warnings that mean the model lost important information, repeated tool calls that suggest the agent is stuck in a loop, and permission errors from MCP servers. Encourage the audience to make reading debug logs a habit whenever agent output is surprising — the logs almost always explain why. Mention that the lab will have them intentionally trigger a debugging scenario and trace through the logs. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-08-31d9bb9c.png
---

<!-- Introduce the agentic loop as a formal cycle: Plan what to do, Execute the plan, Observe the results, Reflect on whether the results match the goal, and Re-Plan if they do not. Note this is sometimes called the Ralph Loop in workshop materials. Stress that the loop is not just a theoretical model — it is literally what the agent does in each iteration, and understanding it helps you predict agent behavior, diagnose failures, and design better prompts. The reflection step is where most interesting failures happen: the agent may misinterpret success, overlook side effects, or loop indefinitely if it cannot recognize completion. This sets up the off-ramp discussion on the next slides. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-09-9fbfa657.png
---

<!-- Explain sub-agents as a way to manage complexity: a main agent can delegate specialized subtasks to focused sub-agents, each with its own context and instructions. This mirrors the Squad pattern from Module 2 but at a finer granularity within a single workflow. Walk through the diagram: the main agent identifies what needs to be done, delegates implementation, testing, or review to sub-agents, collects their results, and synthesizes them. The benefit is reduced context pollution — each sub-agent only sees what it needs. The risk is coordination overhead and the possibility that sub-agents produce inconsistent results that the main agent must reconcile. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-10-49145562.png
---

<!-- This is the dedicated safety slide for the module. Walk through each pattern on the slide: iteration caps that prevent runaway loops, checkpoints that save progress so you can resume rather than restart, scope boundaries that keep the agent focused on the defined task, and rollback capability so you can undo agent changes cleanly. Emphasize that off-ramps should be designed before launch, not added after a failure. Share a concrete anti-pattern: an agent that kept modifying files to fix lint errors it introduced, creating a cascade of changes far beyond the original scope. The fix was an iteration cap plus a scope boundary that limited which files the agent could touch. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-11-04f853cb.png
---

<!-- Point the audience to the ecosystem of resources available beyond this training: the official GitHub Copilot documentation, the community-maintained awesome-copilot lists, MCP server registries, and the GitHub Copilot feedback channels. Stress the importance of vetting community tools before enabling them — check the maintainer, review the source code, and understand what data the tool accesses. Mention that the ecosystem is evolving rapidly, so bookmarking the official docs and changelog is more valuable than memorizing current feature lists. If there are internal resources specific to the audience's organization, call those out here. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-12-33434e6a.png
---

<!-- Use this synthesis slide to connect all the advanced topics into a unified toolkit. Trace the arc across the module: MCP extends what Copilot can reach, APIs and plugins connect it to real systems, memory strategies make context persistent, debugging tools make behavior transparent, agentic loops explain how agents think, sub-agents manage complexity, and off-ramps keep everything safe. Ask the audience which capability they are most excited to use and which one they think their team needs most urgently. This is a good moment for a brief Q&A before the closing slide. -->

---
layout: image-full
background: /images/copilot-dev-advanced/slide-13-361fd3b1.png
---

<!-- Close the full training with a forward-looking call to action. Encourage three concrete next steps: experiment with one new capability this week such as configuring an MCP server or trying cross-model review, build something real by applying agentic patterns to an actual project task, and share what they learn with their team to multiply the impact. Remind them that the slides, labs, and quizzes are all available on the workshop site for reference. Thank the audience for their time and engagement across all three modules, and open the floor for final questions. -->
