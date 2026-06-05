# Module 3: Advanced Topics — Workshop Guide

**Duration**: ~90 min
**Format**: Presentation + Live Demo + Hands-On
**Audience**: Developers with Copilot experience (Modules 1-2 completed)
**Prerequisites**: Completion of Modules 1 and 2

---

## Workshop Overview

Module 3 moves from effective day-to-day use of GitHub Copilot into advanced operational patterns: connecting external systems through MCP, extending workflows with APIs and plugins, understanding memory behavior, debugging chat and agents, and designing safe agentic loops. By the end of this session, participants should be able to evaluate where advanced GitHub Copilot capabilities fit in their team workflow, how to enable them responsibly, and how to debug or constrain them when autonomy increases.

### Learning Objectives

- Explain what MCP is and when GitHub Copilot should use it
- Connect GitHub Copilot workflows to APIs, plugins, and external tools safely
- Distinguish persistent memory from session-only context across GitHub Copilot surfaces
- Use chat and agent debug logs to diagnose context, model, and tool issues
- Describe the plan → execute → observe → reflect cycle in agentic loops
- Design off-ramps so agents stop and hand back ambiguous or risky work
- Identify trusted resources for staying current with the GitHub Copilot ecosystem

### Prerequisites

| Requirement | Details |
|-------------|---------|
| Module readiness | Completion of Modules 1 and 2, or equivalent familiarity with chat modes, context, and agent workflows |
| GitHub Copilot access | GitHub Copilot and GitHub Copilot Chat enabled in VS Code |
| Local environment | A local multi-file project open in VS Code for demos and lab work |
| Tooling | Node.js and `npx` available for trying sample MCP servers |
| Network access | Internet access for GitHub Copilot and any approved external services |
| Security awareness | Ability to review permissions, auth scopes, and trust boundaries before enabling tools |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | MCP (Model Context Protocol) — What, Why, How | 15 min |
| 2 | Using APIs and Plugins with Copilot | 12 min |
| 3 | Memory — Current State and Evolution | 12 min |
| 4 | Debugging — Chat Debug and Agent Debug Logs | 12 min |
| 5 | Agentic Loops (Ralph Loop), Subagents, and Task Review | 18 min |
| 6 | Resources, Tools, and Ecosystem (Squad, copilot-awesome) | 8 min |
| 7 | Wrap-up and Q&A | 5 min |

---

## 1. MCP (Model Context Protocol) — What, Why, How (15 min)

### Key Points

- **What MCP is**: a protocol that standardizes how AI tools connect to external data sources and services
- **Why it matters**: GitHub Copilot can reach beyond repository files into databases, APIs, documentation, and enterprise systems
- **How it works**: MCP servers expose tools and resources that GitHub Copilot can discover and invoke during chat or agent workflows
- **Configuration paths**: teams commonly configure MCP servers in VS Code with `mcp.json` or approved settings-based configuration
- **Server types**: built-in experiences may cover common workflows, while third-party or internal MCP servers extend GitHub Copilot into custom systems
- **Typical use cases**: database lookups, API documentation retrieval, internal developer portals, and controlled file system operations

### 🛡️ Safety Moment

- MCP servers run code or perform actions on your behalf
- Verify authentication, permissions, approved endpoints, and sandboxing before enabling a server
- Treat every MCP server as part of your software supply chain review

### 🖥️ Demo: Configure an MCP server and approve a tool call

- Open `.vscode/mcp.json` or the relevant GitHub Copilot MCP settings entry
- Configure a simple server such as a fetch or filesystem server
- Ask GitHub Copilot to complete a task that requires the new MCP tool
- Pause on the approval prompt and inspect what action GitHub Copilot wants to take
- Approve the call, review the result, and discuss what context crossed the trust boundary

### 💡 Optimization Tip: MCP Server Discipline

- Only activate MCP servers you regularly use — each server's tool descriptions are sent on every request, consuming input tokens
- Too many available tools causes agents to take unnecessary detours (for example, a Playwright MCP server triggering screenshots when none were requested)
- Pair MCP servers with custom agents that restrict the active tool set to only what the specific workflow needs
- Periodically audit your active servers — remove any you have not used in the past month

### Discussion Points

- What external data sources would your team connect via MCP first?
- What approval workflow or allowlist would you require before enabling a new server?

### 🔬 LAB: Exercise 1 — Configure and Use an MCP Server

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (5 min) configuring a sample MCP server, observing tool discovery, and reviewing the approval flow before continuing to the next section.

---

## 2. Using APIs and Plugins with Copilot (12 min)

### Key Points

- GitHub Copilot workflows become more useful when they can reach external APIs and specialized tools
- Agent workflows can call APIs during planning and execution when the environment exposes those capabilities
- Plugin and extension patterns, such as `@docker` and `@azure`, add specialized commands, context, and workflows
- Teams can build custom integrations for internal APIs, documentation systems, and deployment tooling
- Common REST patterns include retrieve context, perform an action, inspect the response, and summarize the result back to the developer

### 🛡️ Safety Moment

- Data sent to external APIs leaves your trust boundary
- Review what repository context, prompts, file contents, and identifiers are included before approving calls
- Prefer least-privilege auth scopes and observable audit trails

### 🖥️ Demo: Use an API-aware workflow and a specialized plugin

- Trigger a workflow where GitHub Copilot needs information from an external API
- Show how the agent selects or requests access to the tool it needs
- Compare the experience with a specialized plugin or extension that adds domain-specific capabilities
- Discuss when a custom integration is worth building versus using a general-purpose tool

### 💡 Optimization Tip: CLI vs. MCP Trade-offs

- Many tools (git, npm, docker) are already well-represented in model training data — invoking them via CLI may produce better results than routing through an MCP server
- MCP servers add value when the tool requires structured input/output, authentication, or state management that a simple shell command cannot provide
- When in doubt, prefer the simpler integration path that is already in the agent's training distribution

### Discussion Points

- What APIs does your team interact with daily that could benefit from GitHub Copilot integration?
- Which workflows should stay human-operated even if an API integration is technically possible?

---

## 3. Memory — Current State and Evolution (12 min)

### Key Points

- Memory helps GitHub Copilot retain useful preferences, conventions, and durable context beyond a single exchange
- Some context is ephemeral and tied to the current session, prompt, workspace, or task
- Memory behavior differs across surfaces such as IDE chat, CLI experiences, and GitHub.com workflows
- Good memory strategy focuses on stable preferences, coding conventions, and recurring working style rather than one-off task details
- Start fresh when context becomes stale, overly specific, or likely to bias the next task incorrectly
- Instruction files and policy documents define explicit rules, while memory captures durable learned preferences and conventions
- The feature continues to evolve toward clearer controls, better visibility, and more deliberate persistence

### 🛡️ Safety Moment

- Understand what is persisted, where it is visible, and how to remove it
- Avoid storing secrets, sensitive identifiers, or short-lived task context as memory
- Teach teams how to review and clear memories when needed

### 🖥️ Demo: Save, verify, and manage a memory

- Ask GitHub Copilot to remember a durable preference such as a coding convention
- Start a fresh interaction and verify that the preference persists
- Show where stored memories can be reviewed or managed in the current experience
- Contrast that with session-only context that disappears when the task ends

### 💡 Optimization Tip: Memory vs. Instructions vs. Context

- **Memory** is for durable personal preferences that persist across sessions and repos (e.g., "I prefer PowerShell on Windows")
- **Instructions** are for team-wide rules that apply to everyone working in the repo (e.g., "Use early returns")
- **Session context** is for the current task only — let it expire
- Putting task-specific or short-lived content into memory wastes tokens on every future request where it is irrelevant

### Discussion Points

- What preferences or conventions would you want GitHub Copilot to remember across sessions?
- Where should your team draw the line between instruction files, repository docs, and memory?

---

## 4. Debugging — Chat Debug and Agent Debug Logs (12 min)

### Key Points

- Debugging starts by inspecting what GitHub Copilot actually sent and received
- In VS Code, the Output panel and the **GitHub Copilot Chat** log stream help you inspect requests and responses
- Agent debug logs help explain tool selection, action ordering, and why a workflow chose a particular path
- Context inspection is critical for diagnosing prompt drift, wrong files, missing files, or excessive `@workspace` expansion
- Common scenarios include wrong context included, hallucinated assumptions, looping behavior, and unexpected tool calls
- Debug logs are often the fastest way to move from “it acted strangely” to a concrete explanation

### 🛡️ Safety Moment

- Use debug logs to verify that GitHub Copilot is not leaking sensitive context or calling unauthorized services
- Review whether the prompt included file paths, snippets, or identifiers that should not have been shared
- Make log review part of high-trust agent rollout and troubleshooting

### 🖥️ Demo: Trace a request and diagnose a context issue

- Open **View → Output** and switch to **GitHub Copilot Chat**
- Send a prompt and watch the request and response cycle appear
- Identify what context was attached to the model request
- Repeat with `@workspace` and compare the amount of context included
- Show how the logs explain a surprising response or an overly broad context payload

### 💡 Optimization Tip: Debug Logs for Token Diagnosis

- Debug logs reveal exactly how many tokens are being sent per request — use them to catch context bloat before it causes quality degradation
- If you see unexpected files or large workspace expansions in the request payload, narrow your context with `#file` or `#selection` instead of `@workspace`
- Long conversations compound token usage because the entire history is re-sent every loop iteration — logs make this visible

### Discussion Points

- What debugging scenarios have you encountered with GitHub Copilot so far?
- How would debug logs change the way your team investigates unexpected agent behavior?

### 🔬 LAB: Exercise 2 — Inspect Chat and Agent Debug Logs

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (5 min) opening debug logs, comparing context with and without `@workspace`, and identifying what data was sent before continuing to the next section.

---

## 5. Agentic Loops (Ralph Loop), Subagents, and Task Review (18 min)

### Key Points

- Agentic loops follow a repeatable cycle: **plan → execute → observe → reflect → adjust**
- The “Ralph Loop” is a convenient name for that iterative pattern in complex agent workflows
- Loops are useful for multi-step tasks such as code changes, validation, test execution, and revision
- Loops are overkill when a direct answer, single edit, or quick explanation would be faster and safer
- Termination criteria matter: the agent needs a clear definition of done, failure, or escalation
- Subagents let a primary agent delegate specialized work to narrower helpers and then review their output
- Human review remains essential for trust calibration, especially when the task touches production systems, security boundaries, or ambiguous requirements

### Off-Ramp Design

- When the optimal path is unavailable, agents and skills should stop, explain why, and hand the decision back to a human
- Graceful degradation beats guessing or forcing a suboptimal path
- Off-ramps belong in agent instructions, review checklists, and tool approval policy
- Good off-ramps surface missing access, conflicting tests, unresolved ambiguity, or unsafe assumptions early
- Example off-ramp pattern:

  ```markdown
  ## Off-Ramp Behavior
  - If the requested change would break existing tests, STOP and report the conflict
  - If you lack access to a required file or service, explain what is missing
  - If multiple valid approaches exist and none is clearly better, present options instead of choosing
  ```

### 🛡️ Safety Moment

- Define loop termination criteria before granting more autonomy
- Watch for runaway loops, repeated failed actions, or silent assumption stacking
- Design explicit off-ramps for ambiguity, missing access, broken tests, or policy conflicts

### 🖥️ Demo: Observe a loop, a subagent, and an off-ramp

- Give GitHub Copilot a multi-step task that requires planning and validation
- Point out each phase in the loop: plan, execute, observe, reflect, and adjust
- Show a subagent or delegated task handling a narrower slice of work
- Review the returned output rather than trusting it blindly
- Trigger an off-ramp scenario and show the agent stopping with a clear explanation instead of guessing

### 💡 Optimization Tip: Sub-Agents for Context Isolation

- Subagents run in their own context window — only the final summary returns to the main session
- This prevents discovery tokens (file listings, search results, intermediate reasoning) from polluting the primary working context
- Use subagents for research-heavy phases: the main session stays focused on the implementation spec
- Trade-off: you pay for duplicating system/tool tokens in the sub-context, but the quality of the main session improves

### Discussion Points

- How would you set termination criteria for an agentic loop in your workflow?
- What off-ramps would you require before allowing GitHub Copilot to automate a higher-risk task?

### 🔬 LAB: Exercise 3 — Observe an Agentic Loop and Off-Ramp

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (5 min) observing plan → execute → observe → reflect, identifying off-ramp behavior, and evaluating when an agent should stop before continuing to the next section.

---

## 6. Resources, Tools, and Ecosystem (8 min)

### Key Points

- **Squad**: a multi-agent collaboration framework from Brady Gaster — <https://github.com/bradygaster/squad>
- **Awesome Copilot collections**: community-curated examples, extensions, prompts, and patterns for GitHub Copilot exploration
- **Official documentation and changelog**: the most reliable source for current capabilities, settings, and rollout status
- **Extension marketplace**: a fast way to discover GitHub Copilot-related tools, integrations, and experiments
- **Community patterns**: blog posts, conference talks, and workshop repos help teams learn what works in practice
- Staying current matters because agent features, memory behavior, MCP support, and integrations are evolving quickly

### 🛡️ Safety Moment

- Community tools are not automatically vetted
- Evaluate third-party MCP servers, plugins, and extensions before trusting them with your codebase or credentials
- Prefer transparent permissions, active maintenance, and clear provenance

### Discussion Points

- What resources do you use to stay current with AI-assisted development tools?
- Which signals help you decide whether a community tool is trustworthy enough to try?

---

## 7. Wrap-up and Q&A (5 min)

### Key Points

- **Module 1** established the foundations: context, chat modes, instructions, and effective prompting
- **Module 2** focused on agentic patterns: delegation, background work, and layered instructions
- **Module 3** added advanced operations: MCP, APIs, memory, debugging, loops, and off-ramp design
- The next step is applying these patterns in a Day 2 hack setting with real workflows and real constraints
- Success means not just using GitHub Copilot more, but using it more deliberately, observably, and safely

### Discussion Points

- Which advanced capability do you want to pilot first with your team?
- What questions should we answer before moving into the Day 2 hack workflow?

*Workshop guide for Module 3: Advanced Topics — GitHub Copilot Developer Training*
