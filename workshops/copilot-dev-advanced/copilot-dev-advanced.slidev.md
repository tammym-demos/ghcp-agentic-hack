---
theme: ../../themes/github
title: "Copilot Developer Training — Module 3: Advanced Topics"
info: |
  90-minute module covering chat participants, extensions, MCP, evaluation, and diagnostics.
ghFooterTitle: "Module 3: Advanced Topics"
ghFooterLabel: ""
drawings:
  persist: false
mermaid:
  theme: dark
transition: slide-left
mdc: true
layout: cover
---
<!-- markdownlint-disable -->

# Copilot Developer Training

## Module 3 — Advanced Topics

*Chat participants · Extensions · MCP · Evaluation · Diagnostics*

`copilot-dev-advanced-workshop.md`

<!--
This module is about operating Copilot responsibly in real engineering workflows: capability, confidence, and control.
-->

---
class: text-sm
---

# Agenda

### 90-minute roadmap

| Time | Topic |
|------|-------|
| 30 min | Session 1 — Extensions, Chat Participants, and MCP |
| 35 min | Session 2 — Evaluating Agentic Output |
| 25 min | Session 3 — Troubleshooting and Diagnostics |

<div class="gh-callout gh-callout-blue">

**Flow**: the deck follows the workshop guide, and the lab applies each session with short hands-on checks.

</div>

<!--
Set expectations early: three sections, each tied to a practical exercise in the lab.
-->

---
layout: section
---

# Extensions, Chat Participants, and MCP

<!--
Start with capability surfaces: who answers, what gets installed, and what new trust boundaries appear.
-->

---
class: text-sm
---

# Chat participants in VS Code

### Pick the right lens before you ask the question

| Participant | Best used for | Typical question | Teaching emphasis |
|---------|---------|---------|---------|
| `@workspace` | Repo-aware reasoning | "Where is auth enforced in this project?" | Uses codebase context and cross-file search |
| `@vscode` | Editor and IDE behavior | "Why is this task failing in the Problems panel?" | Focuses on VS Code features, settings, and commands |
| `@terminal` | Terminal output and command-line guidance | "What command should I run to rebuild only the API package?" | Grounds the answer in shell workflows, command output, and next steps |

<div class="gh-callout gh-callout-green">

**Fast rule**: use the participant that already has the domain context you need instead of forcing one generic prompt to do everything.

</div>

<!--
The key message is that participants change the framing before a response is generated.
-->

---
class: text-xs
---

# Capability surfaces

### Participants, extensions, and MCP are not the same thing

| Surface | Installed from | Best for | Trust question |
|---------|---------|---------|---------|
| **Built-in participants** | Included with VS Code | Domain-specific help such as editor or terminal questions | What context can this participant already see or act on? |
| **Extension-contributed participants** | Extensions view / Visual Studio Marketplace | Domain workflows that live inside the IDE | Do we trust the publisher, permissions, and update cadence? |
| **Copilot Extensions** | GitHub Marketplace listings | Service integrations that extend Copilot across supported surfaces | Does the integration expose approved data, actions, and auth flows? |
| **MCP servers** | Workspace or user `mcp.json` | Local or remote tools, resources, prompts, and apps | What code runs, with what credentials, and where? |

<div class="gh-callout gh-callout-blue">

**Architecture lens**: every new capability surface expands reach. Review it the same way you would review code execution or credentials in any other developer toolchain.

</div>

<!--
This slide fixes the common confusion between chat participants, installable extensions, and MCP.
-->

---
class: text-xs
---

# MCP architecture mental model

```text
┌──────────────────────┐
│ Developer in VS Code │
└──────────┬───────────┘
           │ prompt / task
           ▼
┌──────────────────────┐
│ Copilot Chat / Agent │
│ host + planner       │
└──────────┬───────────┘
           │ tool request over MCP
           ▼
┌──────────────────────┐
│ MCP Client in host   │
│ connection manager   │
└──────────┬───────────┘
           │ stdio / socket transport
           ▼
┌──────────────────────┐
│ MCP Server           │
│ exposes tools        │
└──────────┬───────────┘
           │ API calls / local execution
           ▼
┌──────────────────────┐
│ External systems     │
│ files, APIs, data    │
└──────────────────────┘
```

<v-clicks>

- **Host** coordinates the experience in VS Code
- **Client** manages one or more MCP connections
- **Server** exposes tools, resources, prompts, and optional apps
- **Tool boundary = trust boundary**

</v-clicks>

<!--
Keep the mental model simple: host, client, server, external system.
-->

---
class: text-xs
---

# MCP server configuration example

### Workspace and user configs use the same schema

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "github-token",
      "description": "GitHub token for repo metrics",
      "password": true
    }
  ],
  "servers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "${workspaceFolder}"
      ],
      "env": {
        "MCP_LOG_LEVEL": "info"
      }
    },
    "repoMetrics": {
      "type": "stdio",
      "command": "node",
      "args": ["tools/mcp/repo-metrics-server.js"],
      "cwd": "${workspaceFolder}",
      "env": {
        "GITHUB_TOKEN": "${input:github-token}"
      }
    }
  }
}
```

<div class="gh-callout gh-callout-green">

**Remember**: user-wide servers live in your profile `mcp.json`, opened with **MCP: Open User Configuration**. They do **not** use a different JSON wrapper.

</div>

<!--
Focus on type, command, args, inputs, and the difference between workspace and user location.
-->

---
class: text-xs
---

# Third-party trust checklist

| Check | Why it matters | Good signs | Red flags |
|---------|---------|---------|---------|
| **Publisher verification** | Confirms who owns the extension or integration | Verified publisher, clear org identity, support policy | Unknown publisher, no contact path, copycat naming |
| **Permission scope** | Limits blast radius | Narrow capability, explicit config, read-only by default | Broad filesystem or command execution without clear need |
| **Maintenance activity** | Indicates health and security posture | Recent releases, issue responses, changelog | Long-abandoned package, unresolved security reports |
| **Source transparency** | Supports reviewability | Public repo, documented behavior, sample configs | No source, vague claims, hidden telemetry behavior |
| **Dependency hygiene** | Affects supply-chain risk | Minimal dependencies, lockfile, update cadence | Large unreviewed dependency tree |
| **Operational fit** | Prevents accidental policy violations | Works with approved systems and auth flows | Requires personal tokens, bypasses approved controls |

<!--
Use this as a reusable review frame for extensions, Copilot Extensions, and MCP servers.
-->

---
class: text-sm
---

# AI Safety: Third-party trust

<div class="gh-callout gh-callout-purple">

**Capability is risk-bearing**. Review every new extension or MCP server as if you were approving a new executable dependency for the team.

</div>

<v-clicks>

- Prefer the narrowest useful permission scope
- Keep secrets in inputs or environment files, not source-controlled config
- Treat tool access and data access as approval boundaries
- *Did you know?* **GitHub secret scanning** with push protection blocks accidental credential commits before they reach the repo

</v-clicks>

<!--
Make safety concrete: least privilege, approved auth flows, and auditable configuration.
-->

---
layout: center
class: text-sm
---

# 🧪 Exercise 1 — Participants & trust review

- Ask the same question with `@workspace`, `@vscode`, and `@terminal`
- Compare how the framing and evidence change
- Inspect one extension or Copilot Extension listing with the trust checklist
- Decide what your team would approve, reject, or sandbox

<!--
This exercise builds judgment, not just feature familiarity.
-->

---
layout: center
class: text-sm
---

# 🧪 Exercise 2 — MCP setup

- Add one MCP server to `.vscode/mcp.json`
- Confirm the server is running with **MCP: List Servers**
- Use **Configure Tools** or Agent Debug Logs to verify its tools are available
- Identify where the config should live: workspace or user profile

<!--
Keep the exercise grounded in one working server and one observable tool path.
-->

---
layout: section
---

# Evaluating Agentic Output

<!--
Now shift from capability to quality control: how to decide whether the output is safe and useful enough to keep.
-->

---
class: text-xs
---

# SMART success criteria

| Weak request | SMART rewrite | How to verify |
|---------|---------|---------|
| "Improve this API." | "Refactor the `orders` API to remove duplicate validation logic, keep the response contract unchanged, and ensure all existing tests pass by the end of the task." | Run current tests, diff the response schema, inspect duplicate logic removal |
| "Make it more secure." | "Add input validation and authorization checks to the admin endpoint, prevent unauthenticated writes, and include tests for authorized and unauthorized cases." | Security review, negative-path tests, auth behavior in local run |
| "Speed this up." | "Reduce the p95 latency of the search endpoint from 900 ms to under 500 ms on the current benchmark dataset without increasing memory usage by more than 10%." | Benchmark before and after, compare memory profile |

<div class="gh-callout gh-callout-blue">

**If success is not measurable, the model cannot optimize for it and the team cannot verify it.**

</div>

<!--
This is the bridge between prompt quality and evaluation quality.
-->

---
class: text-xs
---

# Output quality rubric

| Category | 1 — Poor | 3 — Acceptable | 5 — Strong | Verification evidence |
|---------|---------|---------|---------|---------|
| **Correctness** | Fails requirements, breaks behavior, or invents APIs | Meets core requirement with minor gaps | Fully satisfies requirements with edge cases covered | Tests, manual path checks, schema or contract comparison |
| **Readability & maintainability** | Hard to follow, inconsistent naming, excessive complexity | Understandable but uneven | Clear intent, good decomposition, idiomatic patterns | Code review, diff readability, consistency with repo patterns |
| **Performance** | Regresses runtime, memory, or query volume | Neutral performance impact | Measurable improvement or efficient implementation | Benchmarks, profiler output, query counts |
| **Security** | Introduces trust boundary gaps or unsafe defaults | No obvious new issues | Explicit validation, least privilege, secure defaults, safe error handling | Static analysis, manual threat review, auth and input checks |
| **Test coverage** | No new tests for changed behavior | Some positive-path tests | Positive, negative, and edge-path coverage tied to requirements | Unit, integration, or acceptance tests |

<div class="gh-callout gh-callout-green">

**Scoring pattern**: 20-25 = ready for normal review, 15-19 = revise, below 15 = re-scope or redo.

</div>

<!--
The rubric makes reviews more consistent across different styles of output.
-->

---
class: text-xs
---

# Trust calibration

| Task type | Default posture | Verification strategy |
|---------|---------|---------|
| **Docs, comments, naming suggestions** | Higher trust | Fast human review for tone and factual accuracy |
| **Unit tests for existing behavior** | Medium trust | Run tests, inspect assertions, add missing edge cases |
| **Refactors with unchanged behavior** | Medium trust | Compare diff size, run regression suite, spot-check architecture fit |
| **Performance changes** | Low trust | Benchmark and compare resource usage before merge |
| **Security-sensitive code, auth, secrets, data access** | Very low trust | Deep human review, automated scanning, explicit threat-model checks |
| **Infrastructure, migrations, destructive changes** | Very low trust | Staging validation, rollback plan, peer approval, audit logging |

<div class="gh-callout gh-callout-purple">

**Did you know?** For low-trust and very-low-trust categories, **GitHub Dependabot** flags vulnerable dependencies and **secret scanning** blocks accidental credential commits — automated verification layers that complement human review.

</div>

<!--
The message: do not use one verification pattern for every task.
-->

---
class: text-sm
---

# Metrics and cost loops

<v-clicks>

- Track **acceptance rate**, **rework rate**, and **time-to-verification**
- Keep a **failure taxonomy** so the same problems do not keep recurring
- Measure **tool efficiency**: retries, redundant reads, and wasted loops
- Focus cost discussions on **cost per accepted change**, not cost per prompt

</v-clicks>

```text
Define criteria → run task → score output → capture failure mode
        ↑                                      ↓
  refine prompt, agent, tool scope, or review gate
```

<div class="gh-callout gh-callout-blue">

**Cost is a workflow design problem**: use the simplest capable workflow that still produces an acceptable, reviewable change.

</div>

<!--
Keep this practical: measure outcomes, not just activity.
-->

---
class: text-sm
---

# AI Safety: Verify high-risk output

<div class="gh-callout gh-callout-purple">

**High-confidence prose is not evidence**. For high-impact or security-sensitive changes, require tests, scans, and human review even when the answer sounds polished.

</div>

<v-clicks>

- Match verification depth to risk
- Force evidence in the prompt and in the review
- Prefer explicit stop criteria over blind retry loops

</v-clicks>

<!--
This is where the module turns caution into an operational review habit.
-->

---
layout: center
class: text-sm
---

# 🧪 Exercise 3 — Score one agentic change

- Rewrite one weak request into SMART criteria
- Ask Copilot to generate the change
- Score the result with the rubric
- Decide whether the change is high-trust, medium-trust, or low-trust

<!--
Attendees should leave with a repeatable review pattern, not just a nicer prompt.
-->

---
layout: section
---

# Troubleshooting and Diagnostics

<!--
Final section: make the system observable enough to debug and improve.
-->

---
class: text-xs
---

# VS Code diagnostic surfaces

| Surface | How to open | Best for | What you learn |
|---------|---------|---------|---------|
| **Output panel — `GitHub Copilot` / `GitHub Copilot Chat`** | Set **Developer: Set Log Level** to **Trace**, then run **Output: Show Output Channels** | Extension errors, request timing, connection issues | Request flow, extension logs, network or auth failures |
| **Agent Debug Log panel (Preview)** | Enable `github.copilot.chat.agentDebugLog.fileLogging.enabled`, then use Chat `...` → **Show Agent Debug Logs** or **Developer: Open Agent Debug Logs** | Agent tool flows, retries, prompt discovery, export | Event timeline, tool calls, LLM requests, errors, summary metrics |
| **Chat Debug View** | Chat `...` → **Show Chat Debug View** or **Developer: Show Chat Debug View** | Exact request and response payload inspection | System prompt, resolved user prompt, attached context, tool payloads |
| **`GitHub Copilot: Collect Diagnostics`** | Command Palette | Connectivity and environment snapshot for support | Network, proxy, and environment diagnostics |
| **`/troubleshoot`** | Chat input after debug logging is enabled | Asking Copilot to interpret one session's debug events | Token counts, prompt discovery paths, and tool attempts |
| **`MCP: List Servers` → Show Output** | Command Palette | MCP-specific failures | Server status, output, restart controls |

<!--
Give the audience exact view and command names they can rely on after the workshop.
-->

---
class: text-sm
---

# What to inspect when output is wrong

| Signal | Where to inspect it | Why it matters |
|---------|---------|---------|
| **Model used** | Output panel, Agent Debug summary, Chat Debug View | Helps explain behavior, latency, and capability |
| **Context included** | Chat Debug View, Agent Debug events | Missing context often explains weak or generic output |
| **Tool calls** | Agent Debug Log panel | Reveals unexpected access, retries, or wasted steps |
| **Changed files** | Agent Debug Log panel and source control diff | Important for blast-radius review |
| **Server status** | `MCP: List Servers` and server output | Distinguishes prompt problems from infrastructure problems |

<div class="gh-callout gh-callout-green">

**Inspect before you retry**: the first useful clue is often already visible in the logs.

</div>

<!--
Normalize inspection over intuition.
-->

---
class: text-xs
---

# Troubleshooting decision tree

```text
┌─────────────────────────────────────┐
│ Output is wrong, risky, or unhelpful│
└──────────────────┬──────────────────┘
                   ▼
        ┌──────────────────────────┐
        │ Is the task well-scoped? │
        └───────┬─────────┬────────┘
                │YES      │NO
                │         ▼
                │  Rewrite prompt with
                │  SMART criteria
                ▼
   ┌───────────────────────────────┐
   │ Did Copilot have the context? │
   └───────┬─────────┬─────────────┘
           │YES      │NO
           │         ▼
           │   Add files, use the right
           │   participant, or reduce scope
           ▼
┌────────────────────────────────────┐
│ Did the tool or MCP call succeed? │
└───────┬────────────┬──────────────┘
        │YES         │NO
        │            ▼
        │      Fix config, auth,
        │      path, or server logs
        ▼
┌────────────────────────────────────┐
│ Is the result still low quality?  │
└───────┬────────────┬──────────────┘
        │YES         │NO
        │            ▼
        │      Accept with normal
        │      verification flow
        ▼
Tighten instructions, lower tool access,
switch review pattern, or do manual fix
```

<!--
Make the debugging path feel procedural instead of mysterious.
-->

---
class: text-sm
---

# AI Safety: Transparency before trust

<div class="gh-callout gh-callout-purple">

**Transparency is a safety feature**. The goal of diagnostics is not to prove the model is "thinking correctly"; it is to show what inputs, tools, and actions created the observed result.

</div>

<v-clicks>

- Compare stated reasoning to actual file changes and tool traces
- Escalate with exported evidence, not anecdotes
- Stop retrying when the logs show a configuration or scope problem

</v-clicks>

<!--
This closes the loop from trust to evidence.
-->

---
layout: center
class: text-sm
---

# 🧪 Exercise 4 — Inspect the evidence

- Set log level to **Trace** and open the Copilot output channels
- Open **Show Agent Debug Logs** and **Show Chat Debug View**
- Run one prompt, then identify context, tool calls, and changed files
- Use `/troubleshoot` or **GitHub Copilot: Collect Diagnostics** if something looks wrong

<!--
The goal is to build the habit: inspect first, then adjust.
-->

---
layout: end
class: text-sm
---

# Module 3 Recap

<v-clicks>

- Choose the right **participant**, extension surface, or MCP tool for the job
- Use **SMART criteria** and a rubric to evaluate output, not just admire it
- Match **verification depth** to risk and cost
- Use **logs, debug views, and diagnostics** to replace guesswork with evidence

</v-clicks>

<div class="gh-callout gh-callout-green">

**Next step**: run the lab and practice capability review, evaluation, and diagnostics in one VS Code workspace.

</div>

*Slide deck for Copilot Developer Training — Module 3: Advanced Topics*

<!--
Close on capability, confidence, and control.
-->
