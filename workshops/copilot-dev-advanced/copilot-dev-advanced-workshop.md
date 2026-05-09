# Module 3: Advanced Topics — Workshop Guide

**Duration**: ~110 min (condensed delivery)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers who completed Modules 1 & 2  
**Prerequisites**: Completed Modules 1 & 2, VS Code with Copilot, a local project

---

## Workshop Overview

Module 3 moves from "using Copilot effectively" to **operating Copilot responsibly in real engineering workflows**. The focus is not on basic prompting, but on the advanced surfaces that shape how agentic systems behave: VS Code chat participants, trusted extensions, MCP-based tool connections, evaluation frameworks, and diagnostics. In the full curriculum, these topics span Sessions 6-8 over roughly 3 hours and 20 minutes; this condensed workshop keeps the architectural and decision-making content while shortening the demos and discussion loops.

The throughline for the module is **capability, confidence, and control**. Capability comes from extensions and MCP servers that broaden what Copilot can see and do. Confidence comes from evaluation rubrics, SMART success criteria, and trust-calibrated verification strategies. Control comes from diagnostic visibility: understanding prompt construction, context selection, tool calls, retries, file changes, and failure modes instead of treating AI output as a black box.

Participants should leave with a practical mental model for deciding when to install third-party capabilities, how to judge the quality of AI-generated code, how to control cost and feedback loops, and how to debug agent behavior when results are surprising or unsafe.

### Learning Objectives

- Explain when to use VS Code chat participants such as `@workspace`, `@vscode`, and `@terminal`
- Distinguish built-in participants, extension-contributed capabilities, Copilot Extensions, and MCP tools
- Evaluate VS Code extensions, Copilot Extensions, and MCP servers using a third-party trust and least-privilege checklist
- Describe MCP architecture, configure MCP servers in workspace or user `mcp.json`, and outline the design of a custom MCP server
- Define SMART success criteria for agentic coding tasks and score output with a repeatable quality rubric
- Select the right verification pattern for different task types, from low-risk drafting to high-risk production changes
- Measure quality, usage, and cost with simple feedback loops that improve prompts, agents, and workflows over time
- Diagnose agentic failures by reading output channels, the Agent Debug Log panel, the Chat Debug View, MCP server output, and diagnostics exports
- Explain how Copilot resolves custom instructions from repository, scoped, and user-level files
- Use Copilot CLI session persistence and the memory system to maintain context across sessions
- Navigate key Copilot CLI slash commands for inspecting environment, instructions, and session state

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Extensions, Chat Participants, and MCP | 30 min |
| 2 | Evaluating Agentic Output | 35 min |
| 3 | Troubleshooting and Diagnostics | 25 min |
| 4 | Copilot CLI: Instructions, Sessions, and Memory | 20 min |

---

## 1. Extensions, Chat Participants, and MCP (30 min)

### Key Points

- **Chat participants are scoped helpers** inside VS Code chat. They change the lens Copilot uses before a prompt is even answered.
- **Extensions and Copilot Extensions are installable capability surfaces**. Review them like any other dependency: publisher, permissions, maintenance, and data access still matter.
- **MCP (Model Context Protocol)** is the standard way to connect models and agents to external tools and data sources through a consistent protocol.
- **Server configuration matters**. The same MCP server can be safe and useful in one setup, or over-privileged and noisy in another.
- **Custom MCP servers** should expose narrow, auditable tools with clear input schemas, explicit side effects, and structured logging.

| Participant | Best used for | Typical question | Teaching emphasis |
|---------|---------|---------|---------|
| `@workspace` | Repo-aware reasoning | "Where is auth enforced in this project?" | Uses codebase context and cross-file search |
| `@vscode` | Editor and IDE behavior | "Why is this task failing in the Problems panel?" | Focuses on VS Code features, settings, and commands |
| `@terminal` | Terminal output and command-line guidance | "What command should I run to rebuild only the API package?" | Grounds the answer in shell workflows, command output, and next steps |

| Surface | Installed from | Best for | Trust question |
|---------|---------|---------|---------|
| **Built-in participants** | Included with VS Code | Domain-specific help such as editor or terminal questions | What context can this participant already see or act on? |
| **Extension-contributed participants** | Extensions view / Visual Studio Marketplace | Domain workflows that live inside the IDE | Do we trust the publisher, permissions, and update cadence? |
| **Copilot Extensions** | GitHub Marketplace listings | Service integrations that extend Copilot across supported surfaces | Does the integration expose approved data, actions, and auth flows? |
| **MCP servers** | Workspace or user `mcp.json` | Local or remote tools, resources, prompts, and apps | What code runs, with what credentials, and where? |

> **Important — AI Safety**: Participants, extensions, Copilot Extensions, and MCP servers all change what the model can access or invoke. That makes them architecture decisions, not just convenience settings.

#### MCP Architecture Mental Model

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

**Teaching frame**:

- The **host** is VS Code or another Copilot surface coordinating the experience.
- The **client** manages the connection to one or more MCP servers.
- The **server** advertises tools, resources, prompts, and optional apps the host can invoke.
- The **tool boundary** is the trust boundary. Every exposed tool increases reach, so tool design and permissions matter.

#### Extension Security Checklist — "Third-Party Trust"

| Check | Why it matters | Good signs | Red flags |
|---------|---------|---------|---------|
| **Publisher verification** | Confirms who owns the extension or integration | Verified publisher, clear org identity, support policy | Unknown publisher, no contact path, copycat naming |
| **Permission scope** | Limits blast radius | Narrow capability, explicit config, read-only by default | Broad filesystem or command execution without clear need |
| **Maintenance activity** | Indicates health and security posture | Recent releases, issue responses, changelog | Long-abandoned package, unresolved security reports |
| **Source transparency** | Supports reviewability | Public repo, documented behavior, sample configs | No source, vague claims, hidden telemetry behavior |
| **Dependency hygiene** | Affects supply-chain risk | Minimal dependencies, lockfile, update cadence | Large unreviewed dependency tree |
| **Operational fit** | Prevents accidental policy violations | Works with approved systems and auth flows | Requires personal tokens, bypasses approved controls |

> **Note**: In VS Code, extension-contributed participants are typically installed from the Extensions view. Public Copilot Extensions are listed in GitHub Marketplace, while workspace-specific MCP servers are usually configured in source-controlled `.vscode\mcp.json` files.

#### MCP Server Configuration Example

Use `.vscode\mcp.json` for workspace-shared servers, or open your user profile `mcp.json` with **MCP: Open User Configuration** for personal servers.

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

What to teach from this example:

- `type`, `command`, and `args` define the executable boundary
- `cwd` should point to the narrowest working directory needed
- `inputs`, `env`, and `envFile` are safer than hard-coding secrets in source-controlled files
- Workspace and user servers use the same schema; the difference is the location of the `mcp.json` file, not a different JSON wrapper
- `MCP_LOG_LEVEL` is valuable during setup, but should be reduced once the server is stable

#### Debugging MCP Configuration

| Symptom | Likely cause | What to check | Fix |
|---------|---------|---------|---------|
| Server never appears in Copilot tools | Invalid path or executable | `type`, `command`, `args`, local package install | Run the command manually or use **MCP: List Servers** and correct the path |
| Server starts but tool calls fail | Missing auth or environment variables | `inputs`, `env`, token scope, working directory | Inject required values and restart the server |
| Tool works once, then disappears | Server crashes after request | Server output, unhandled exceptions | Add structured error handling and per-request logging |
| Response is slow or inconsistent | Tool does too much work | Network timeouts, large payloads, repeated queries | Narrow the tool contract and cache safe reads |

#### Building Custom MCP Servers

Design principles to emphasize:

- **Start with one narrow tool**, not a full platform integration
- **Separate read tools from write tools** so approval boundaries stay clear
- **Validate every input** before touching the filesystem, shell, or network
- **Return structured JSON** that is easy for the model and the user to inspect
- **Log requests, outputs, and errors** so failures can be replayed and explained

| Design choice | Good practice | Poor practice |
|---------|---------|---------|
| **Tool naming** | `listOpenPullRequests` | `doGitHubStuff` |
| **Input schema** | Required fields and explicit enums | Free-form text blob |
| **Side effects** | Read-only by default | Implicit writes without confirmation |
| **Output format** | Structured objects with stable keys | Unstructured prose only |
| **Observability** | Request ID + timing + error reason | Silent failure |

### 🖥️ Demo: Inspecting Participants, Extensions, and an MCP Tool Call

- Ask the same repo question three ways: plain chat, `@workspace`, and `@terminal`; compare the framing and the evidence each response uses.
- Open a VS Code extension listing or a Copilot Extension listing in GitHub Marketplace and walk through the security checklist before installation.
- Open `.vscode\mcp.json`, explain each field, then use **MCP: List Servers** to confirm the server is running.
- Call out the trust boundary explicitly: what data leaves the editor, what code executes locally, and what would require approval in an enterprise environment.

### Discussion Points

- Which participant changes the answer quality the most in your day-to-day workflow, and why?
- What review standard should your team apply before enabling a third-party Copilot capability?
- Where should you draw the line between a simple script, a VS Code extension, a Copilot Extension, and a custom MCP server?
- What is the minimum logging and approval behavior you would require before allowing a write-capable MCP tool?

---

## 2. Evaluating Agentic Output (35 min)

### Key Points

- **Agentic output should be evaluated against explicit success criteria**, not against whether it "looks plausible."
- **SMART criteria** improve prompt quality and evaluation quality at the same time.
- **Rubrics create consistency** across reviewers, especially when outputs differ in style but not in substance.
- **Verification effort should scale with risk**. High-impact or high-privilege tasks need deeper checks than low-risk drafting tasks.
- **Usage, billing, and cost strategy** should focus on outcomes per accepted change, not just raw prompt volume.

#### SMART Success Criteria

| Weak request | SMART rewrite | How to verify |
|---------|---------|---------|
| "Improve this API." | "Refactor the `orders` API to remove duplicate validation logic, keep the response contract unchanged, and ensure all existing tests pass by the end of the task." | Run current tests, diff the response schema, inspect duplicate logic removal |
| "Make it more secure." | "Add input validation and authorization checks to the admin endpoint, prevent unauthenticated writes, and include tests for authorized and unauthorized cases." | Security review, negative-path tests, auth behavior in local run |
| "Speed this up." | "Reduce the p95 latency of the search endpoint from 900 ms to under 500 ms on the current benchmark dataset without increasing memory usage by more than 10%." | Benchmark before and after, compare memory profile |

> **Important**: If success is not measurable, the model cannot optimize for it and the team cannot verify it.

#### Output Quality Rubric

Score each category from **1 (poor)** to **5 (strong)**. Teams can accept work at different thresholds, but they should agree on those thresholds before the exercise.

| Category | 1 — Poor | 3 — Acceptable | 5 — Strong | Verification evidence |
|---------|---------|---------|---------|---------|
| **Correctness** | Fails requirements, breaks behavior, or invents APIs | Meets core requirement with minor gaps | Fully satisfies requirements with edge cases covered | Tests, manual path checks, schema or contract comparison |
| **Readability & maintainability** | Hard to follow, inconsistent naming, excessive complexity | Understandable but uneven | Clear intent, good decomposition, idiomatic patterns | Code review, diff readability, consistency with repo patterns |
| **Performance** | Regresses runtime, memory, or query volume | Neutral performance impact | Measurable improvement or efficient implementation | Benchmarks, profiler output, query counts |
| **Security** | Introduces trust boundary gaps or unsafe defaults | No obvious new issues | Explicit validation, least privilege, secure defaults, safe error handling | Static analysis, manual threat review, auth and input checks |
| **Test coverage** | No new tests for changed behavior | Some positive-path tests | Positive, negative, and edge-path coverage tied to requirements | Unit, integration, or acceptance tests |

A practical scoring pattern:

- **20-25**: Strong candidate for merge after normal review
- **15-19**: Needs targeted revisions before acceptance
- **Below 15**: Re-prompt, constrain the task further, or revert to manual implementation

#### Trust Calibration — "When to Trust, When to Verify"

| Task type | Default posture | Verification strategy |
|---------|---------|---------|
| **Docs, comments, naming suggestions** | Higher trust | Fast human review for tone and factual accuracy |
| **Unit tests for existing behavior** | Medium trust | Run tests, inspect assertions, add missing edge cases |
| **Refactors with unchanged behavior** | Medium trust | Compare diff size, run regression suite, spot-check architecture fit |
| **Performance changes** | Low trust | Benchmark and compare resource usage before merge |
| **Security-sensitive code, auth, secrets, data access** | Very low trust | Deep human review, automated scanning, explicit threat-model checks |
| **Infrastructure, migrations, destructive changes** | Very low trust | Staging validation, rollback plan, peer approval, audit logging |

> **Important — AI Safety**: High-confidence prose is not evidence. For security-sensitive or high-impact changes, require tests, scans, and human review even when the answer sounds polished.

#### Evaluation Methods

| Method | Best for | Strength | Limitation |
|---------|---------|---------|---------|
| **Automated checks** | Regressions, policy gates, repeatable standards | Fast and scalable | Only catches what is encoded |
| **Human review** | Architectural fit, clarity, risk judgment | Strong context awareness | Slower and less consistent without a rubric |
| **A/B testing** | Comparing prompts, agents, or tool chains | Good for workflow optimization | Requires controlled inputs and scoring discipline |
| **Shadow evaluation** | New prompts or agents in low-risk rollout | Safe learning before production use | Takes more setup and data collection |

#### Metrics and Feedback Loops

Recommended module-level metrics:

- **Acceptance rate**: percent of agent outputs merged with only minor edits
- **Rework rate**: percent of outputs that require major rewrite
- **Time-to-verification**: how long reviewers spend proving the output is safe
- **Failure taxonomy**: recurring failure modes such as hallucinated APIs, missing tests, insecure defaults, or over-broad edits
- **Tool efficiency**: number of retries, unnecessary file reads, or redundant tool calls in an agent workflow

Simple feedback loop to teach:

```text
Define criteria → run task → score output → capture failure mode
        ↑                                      ↓
  refine prompt, agent, tool scope, or review gate
```

#### Usage, Billing, and Cost Strategy

Teach cost as a **workflow design problem**, not just a licensing line item:

- Use the **simplest capable workflow** for the task; not every prompt needs agent mode or external tools
- Reserve expensive, multi-step agent runs for work that benefits from planning, tool use, and validation
- Track **cost per accepted change**, not just cost per prompt
- Reduce retries by tightening scope, improving success criteria, and pruning unnecessary context
- Prefer **batched evaluation** for prompt experiments instead of ad hoc repeated testing by every developer

Illustrative planning math:

```text
18 developers × 8 agentic tasks per day × 20 workdays = 2,880 tasks / month
Average evaluation pattern = 1 generation + 2 verification passes = 3 runs / task
Estimated internal chargeback = $0.04 per run

Monthly workflow cost = 2,880 × 3 × $0.04 = $345.60
If 720 accepted changes result, cost per accepted change = $345.60 ÷ 720 = $0.48
```

> **Note**: The dollar figure above is illustrative. Replace it with your actual vendor cost, internal chargeback, or capacity model.

### 🖥️ Demo: Scoring One Agentic Change with a Rubric

- Start with a prompt that has weak success criteria, then rewrite it into SMART criteria before generating code.
- Review the resulting change against the rubric row by row, assigning a visible score for correctness, readability, performance, security, and test coverage.
- Show how trust calibration changes the workflow: a documentation update can move fast, but an auth change triggers deeper verification.
- Close by calculating an estimated cost per accepted change and discussing whether the workflow is justified by the value delivered.

### Discussion Points

- Which rubric category is most often under-specified in your team today?
- For which task types would you allow near-direct acceptance of Copilot output, and for which would you require multiple reviewers?
- What metric would best reveal whether agent mode is improving delivery instead of simply adding activity?
- How would you explain "cost per accepted change" to an engineering leader who only sees total license spend?

---

## 3. Troubleshooting and Diagnostics (25 min)

### Key Points

- **The Copilot output channels are evidence**, not noise. They reveal connection issues, request flow, retries, and extension errors.
- **The Agent Debug Log panel and Chat Debug View** make prompt construction, context selection, tool calls, and payloads visible when a response feels incomplete or off-target.
- **Diagnostics collection and export** help escalate persistent issues with reproducible evidence instead of anecdotes.
- **Common failure modes are often configuration problems**: stale context, broad instructions, missing tools, trust mismatches, or hidden assumptions.
- **MCP-specific issues need MCP-specific evidence** such as server status, server output, and restart attempts.

#### VS Code Diagnostic Surfaces

| Surface | How to open | Best for | What you learn |
|---------|---------|---------|---------|
| **Output panel — `GitHub Copilot` / `GitHub Copilot Chat`** | Set **Developer: Set Log Level** to **Trace**, then run **Output: Show Output Channels** | Extension errors, request timing, connection issues | Request flow, extension logs, network or auth failures |
| **Agent Debug Log panel (Preview)** | Enable `github.copilot.chat.agentDebugLog.fileLogging.enabled`, then use Chat `...` → **Show Agent Debug Logs** or **Developer: Open Agent Debug Logs** | Agent tool flows, retries, prompt discovery, export | Event timeline, tool calls, LLM requests, errors, summary metrics |
| **Chat Debug View** | Chat `...` → **Show Chat Debug View** or **Developer: Show Chat Debug View** | Exact request and response payload inspection | System prompt, resolved user prompt, attached context, tool payloads |
| **`GitHub Copilot: Collect Diagnostics`** | Command Palette | Connectivity and environment snapshot for support | Network, proxy, and environment diagnostics |
| **`/troubleshoot`** | Chat input after debug logging is enabled | Asking Copilot to interpret one session's debug events | Token counts, prompt discovery paths, and tool attempts |
| **`MCP: List Servers` → Show Output** | Command Palette | MCP-specific failures | Server status, output, restart controls |

#### Reading the Evidence

| Signal | Where to inspect it | Why it matters |
|---------|---------|---------|
| **Model used** | Output panel, Agent Debug summary, Chat Debug View | Helps explain behavior, latency, and capability |
| **Context included** | Chat Debug View, Agent Debug events | Missing context often explains weak or generic output |
| **Tool calls** | Agent Debug Log panel | Reveals unexpected access, retries, or wasted steps |
| **Changed files** | Agent Debug Log panel and source control diff | Important for blast-radius review |
| **Server status** | `MCP: List Servers` and server output | Distinguishes prompt problems from infrastructure problems |

#### Troubleshooting Decision Tree

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

#### Common Failure Modes and Fixes

| Failure mode | What it looks like | Likely root cause | Typical fix |
|---------|---------|---------|---------|
| **Hallucinated project structure** | References files or APIs that do not exist | Missing workspace context or over-general prompt | Add concrete files, ask for repo-grounded reasoning, use `@workspace` |
| **Too-broad edits** | Agent modifies unrelated files | Vague goal, weak boundaries, excessive tool access | Constrain target files and acceptance criteria |
| **Broken tool invocation** | Agent says it cannot access data or tools | MCP server not running, auth missing, bad path | Validate config and test the server manually |
| **Token pressure / truncation** | Response ignores part of the request | Too much context, long prompt, large file set | Reduce scope, split the task, prioritize critical files |
| **Unsafe confidence** | Polished answer with little evidence | Trust mismatch and insufficient review | Force evidence in the prompt and apply the rubric |
| **Retry loops** | Agent repeats similar actions without progress | Weak stop criteria or unclear failure reason | Add success checks, reduce autonomy, inspect logs earlier |

#### Diagnostics Collection and Export

When an issue persists across retries:

- Capture the **prompt**, the **mode used**, and the **visible output**
- Export the relevant **Agent Debug Log** session or attach a debug snapshot to chat for investigation
- Save **Output panel logs**, **MCP server output**, and the results of **GitHub Copilot: Collect Diagnostics** when connectivity is in doubt
- Record the **changed files**, the **tool calls**, and the **failure symptom**
- Reduce the case to the smallest reproducible scenario before escalation

> **Important — AI Safety**: Transparency is a safety feature. The goal of diagnostics is not to prove the model is "thinking correctly"; it is to show what inputs, tools, and actions created the observed result.

#### "Debugging the Black Box" Teaching Frame

Use this section to normalize inspection over intuition:

- Ask "What evidence did the system use?" before asking "Why did it make that choice?"
- Compare **stated reasoning** to **actual file changes and tool traces**
- Treat logs and diffs as the source of truth when the narrative sounds more confident than the evidence
- Remind learners that AI transparency is often partial, but partial visibility is still enough to improve safety and reliability

### 🖥️ Demo: Following a Failed Agent Run to Root Cause

- Trigger a deliberately underspecified task, then inspect the output channel and Chat Debug View to show the missing context.
- Repeat the task with stronger instructions and point out the change in plan, file selection, and tool usage.
- Show a failing MCP-backed action, trace it to configuration or authentication, and fix the issue live with **MCP: List Servers** and server output.
- End by exporting or attaching debug evidence and summarizing what would be included in a support escalation.

### Discussion Points

- Which diagnostic signal gives you the earliest warning that an agent is going off track?
- How much plan visibility is enough for a developer to trust an autonomous workflow?
- When should a team stop retrying prompts and switch to manual debugging or manual implementation?
- What evidence should be mandatory before escalating an AI-assistant issue to platform support?

---

## 4. Copilot CLI: Instructions, Sessions, and Memory (20 min)

### Key Points

- **Copilot CLI is the terminal-native surface** for the same agentic capabilities available in VS Code. It runs locally, authenticates via GitHub, and supports the full tool-use loop: planning, file edits, shell commands, and MCP servers.
- **Custom instructions are layered and merged at runtime**. Understanding the resolution order helps developers write instructions that apply at the right scope without conflicts.
- **Sessions persist across invocations**. Every turn, tool call, and file operation is recorded locally and synced to the cloud. Developers can resume sessions, search history, and recover artifacts even if they were never committed.
- **The memory system captures durable facts** that survive across sessions. Memories are scoped (user or repository) and surfaced automatically in future sessions, making Copilot's behavior improve over time as conventions are recorded.

#### Instruction Resolution Order

Copilot CLI loads instructions from multiple locations and merges them into the system prompt. The resolution order (later entries override earlier ones for conflicting guidance):

| Priority | Source | Location | Scope |
|----------|--------|----------|-------|
| 1 (lowest) | User-level instructions | `~/.copilot/copilot-instructions.md` | Personal defaults across all repos |
| 2 | Repository instructions | `.github/copilot-instructions.md` | All contributors in this repo |
| 3 | Scoped instructions | `.github/instructions/**/*.instructions.md` | Files matching the `applyTo` glob pattern |
| 4 | Agent-specific files | `CLAUDE.md`, `GEMINI.md`, `AGENTS.md` | Git root and current working directory |
| 5 (highest) | Session/prompt context | Direct user messages, `/instructions` toggles | Current session only |

> **Important — AI Safety**: Instructions shape every response the model produces. Treat them like configuration, not comments — review them in PRs, scope them narrowly, and avoid putting secrets or credentials in instruction files.

#### Key Copilot CLI Slash Commands

| Command | Purpose |
|---------|---------|
| `/instructions` | View and toggle which instruction files are active |
| `/env` | Show loaded environment: instructions, MCP servers, skills, agents, plugins, LSPs |
| `/session` | View and manage sessions — list, rename, share |
| `/resume` | Switch to a different session by ID, task ID, or name |
| `/context` | Show context window token usage and visualization |
| `/usage` | Display session usage metrics and statistics |
| `/share` | Export session to markdown, HTML, or GitHub gist |
| `/chronicle` | Session history tools and insights |

#### Session Storage Architecture

```text
┌─────────────────────────────────────┐
│ Copilot CLI Session                 │
│ (every turn, tool call, file edit)  │
└──────────────┬──────────────────────┘
               │ persisted to
       ┌───────┴───────┐
       ▼               ▼
┌──────────────┐ ┌──────────────────┐
│ Local Store  │ │ Cloud Store      │
│ ~/.copilot/  │ │ GitHub-hosted    │
│ session-     │ │ queryable via    │
│ state/<id>/  │ │ session store    │
│              │ │ SQL (DuckDB)     │
│ • checkpoints│ │                  │
│ • files/     │ │ • sessions       │
│ • SQLite DB  │ │ • turns          │
│              │ │ • tool_requests  │
│              │ │ • session_files  │
│              │ │ • events         │
└──────────────┘ └──────────────────┘
```

**Teaching frame**:

- Sessions are not throwaway conversations — they are recoverable work artifacts
- The cloud store enables querying across all past sessions ("what did I do last week?", "how did I handle auth before?")
- Local `files/` directory persists session artifacts that should not be committed (architecture diagrams, notes, intermediate results)

#### The Memory System

Copilot CLI can store durable facts that persist across sessions. Memories are stored when patterns, conventions, or preferences are discovered during work.

| Aspect | Detail |
|--------|--------|
| **User-scoped** | Personal preferences applied across all repos (e.g., "I prefer concise commit messages") |
| **Repository-scoped** | Codebase conventions applied for all contributors (e.g., "Build with `npm run build:all`") |
| **Upvoting** | Confirms a memory is accurate and useful — increases its weight |
| **Downvoting** | Marks a memory as incorrect or outdated — decreases its weight |
| **Citations** | Each memory includes source references (file paths or user input) for verification |

> **Important — AI Safety**: The memory system does not store secrets, credentials, sensitive personal data, or ephemeral task-specific instructions. Memories are facts about conventions and preferences, not data storage.

#### User-Level Instructions

The user-level instruction file at `~/.copilot/copilot-instructions.md` is the least-known but most powerful personalization surface. It applies to every Copilot CLI session across all repositories.

Example use cases:

- Default coding style preferences (naming conventions, comment style)
- Personal workflow habits (preferred git branching strategy, commit message format)
- Safety defaults ("always run tests before committing", "never force-push to main")
- Tool preferences ("use PowerShell, not cmd", "prefer npm over yarn")

### 🖥️ Demo: Exploring the Copilot CLI Environment

- Run `/env` to show which instructions, MCP servers, and skills are loaded
- Run `/instructions` to show and toggle active instruction files
- Run `/session` to list recent sessions, then `/resume` to switch to a previous session
- Run `/context` to visualize the current token budget and what's consuming it
- Show how a stored memory surfaces automatically in a new session
- Demonstrate `/share` to export a session as a markdown file or gist

### Discussion Points

- How would your team use repository-scoped instructions to enforce coding standards automatically?
- What conventions or patterns from your project would benefit from being stored as memories?
- When would you use user-level instructions vs repository instructions?
- How could session persistence change how you hand off work between team members or across days?

---

## Appendix

### Facilitator Emphasis

- Keep the distinction clear between **capability expansion** (extensions, Copilot Extensions, MCP) and **quality control** (evaluation, diagnostics).
- Reinforce that **verification strategy depends on task risk**, not on how polished the answer sounds.
- Use the demos to make invisible system behavior visible: participants, tool calls, plan traces, changed files, and exported diagnostics.

### Suggested Demo Assets

| Asset | Why it helps |
|---------|---------|
| A small local repo with tests | Supports evaluation and troubleshooting examples |
| One trusted MCP server config | Demonstrates safe configuration patterns |
| One intentionally broken MCP config | Makes diagnosis concrete |
| A saved low-quality output example | Useful for rubric scoring and trust calibration |

*Workshop guide for Module 3: Advanced Topics — Copilot Developer Training*
