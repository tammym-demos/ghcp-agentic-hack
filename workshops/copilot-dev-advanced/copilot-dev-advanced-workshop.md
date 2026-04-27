# GitHub Copilot Developer Training — Advanced Topics

**Duration**: ~3 hours 20 minutes (200 min)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers extending GitHub Copilot with integrations, evaluation frameworks, and diagnostic tools  
**Focus**: Extensions, MCP, evaluating AI output, and troubleshooting Copilot  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

> **Part of the Copilot Developer Training curriculum** ([Foundations](../copilot-dev-foundations/copilot-dev-foundations-workshop.md) · [Agentic Patterns](../copilot-dev-agentic/copilot-dev-agentic-workshop.md) · [Advanced Topics](../copilot-dev-advanced/copilot-dev-advanced-workshop.md)). This module can be delivered standalone.

---

## Workshop Overview

This module covers the advanced topics that round out a developer's Copilot proficiency: extending Copilot with third-party integrations and MCP servers, building evaluation frameworks to measure AI output quality, and mastering the diagnostic tools needed when things go wrong.

### Learning Objectives

- Understand VS Code chat participants and GitHub Copilot Extensions
- Configure and use MCP (Model Context Protocol) servers for external tool integration
- Define success criteria and quality rubrics for AI-generated code
- Build automated and human-in-the-loop evaluation workflows
- Navigate Copilot's output logs, debug mode, and agent debug traces
- Collect and export diagnostics for troubleshooting

### Prerequisites / What You Should Know

If you're taking this module standalone (without Modules 1–2), you should be comfortable with these concepts:

| Concept | Quick Summary |
|---------|---------------|
| **Chat Modes** | Ask (read-only), Agent (edits files), Plan (proposes changes) |
| **Custom Instructions** | `.github/copilot-instructions.md` (always-on) + file-targeted `.github/instructions/*.instructions.md` |
| **Custom Agents** | `.github/agents/*.md` — specialized personas with tool and model selection |
| **Agentic Loops** | Agent mode iterates: plan → act → observe → reflect |
| **Agent Patterns** | Single-agent/multi-skill (Copilot Agent mode), multi-agent (specialized agents for different domains) |
| **Context Window** | Finite token budget; instructions, context, history, and output all compete for space |

> **If you attended Modules 1–2**, skip this section — you've covered all of the above.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher |
| **Git** | For cloning the demo repository |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| **Session 6** | **Extensions & MCP** | **60 min** |
| 6.1 | [Opening & AI Safety: "Third-Party Trust"](#61-opening--ai-safety-third-party-trust-5-min) | 5 min |
| 6.2 | [VS Code Chat Participants](#62-vs-code-chat-participants-10-min) | 10 min |
| 6.3 | [GitHub Copilot Extensions](#63-github-copilot-extensions-15-min) | 15 min |
| 6.4 | [MCP Architecture](#64-mcp-architecture-15-min) | 15 min |
| 6.5 | [MCP Configuration](#65-mcp-configuration-10-min) | 10 min |
| 6.6 | [Session 6 Summary & Discussion](#66-session-6-summary--discussion-5-min) | 5 min |
| | ☕ Break | 10 min |
| **Session 7** | **Evaluating Agentic Output** | **70 min** |
| 7.1 | [Opening & AI Safety: "When to Trust, When to Verify"](#71-opening--ai-safety-when-to-trust-when-to-verify-5-min) | 5 min |
| 7.2 | [Defining Success Criteria](#72-defining-success-criteria-15-min) | 15 min |
| 7.3 | [Output Quality Rubrics](#73-output-quality-rubrics-15-min) | 15 min |
| 7.4 | [Evaluation Methods](#74-evaluation-methods-15-min) | 15 min |
| 7.5 | [Tracking & Improvement](#75-tracking--improvement-15-min) | 15 min |
| 7.6 | [Usage, Billing & Cost Strategies](#76-usage-billing--cost-strategies-10-min) | 10 min |
| 7.7 | [Session 7 Summary & Discussion](#77-session-7-summary--discussion-5-min) | 5 min |
| | ☕ Break | 10 min |
| **Session 8** | **Troubleshooting & Diagnostics** | **60 min** |
| 8.1 | [Opening & AI Safety: "Debugging the Black Box"](#81-opening--ai-safety-debugging-the-black-box-5-min) | 5 min |
| 8.2 | [Output Log Channels](#82-output-log-channels-15-min) | 15 min |
| 8.3 | [Chat Debug Mode](#83-chat-debug-mode-15-min) | 15 min |
| 8.4 | [Agent Debug Logs](#84-agent-debug-logs-15-min) | 15 min |
| 8.5 | [Diagnostics Collection & Curriculum Wrap-Up](#85-diagnostics-collection--curriculum-wrap-up-10-min) | 10 min |

**Total: ~200 min (~3h 20min) including breaks**

---

## 6.1. Opening & AI Safety: "Third-Party Trust" (5 min)

### Key Points

- Extensions and MCP servers are third-party code that runs alongside Copilot — they can access your codebase and execute actions
- Trust decisions matter: who built it? What data does it access? What actions can it take?
- **Evaluate before installing**: read permissions, check the publisher, review community feedback
- Organization admins can control which extensions and MCP servers are allowed

### Trust Evaluation Checklist

| Question | What to Check |
|----------|--------------|
| **Who built it?** | Verified publisher, GitHub organization, or known vendor |
| **What does it access?** | File system, network, terminal, API tokens |
| **What can it do?** | Read-only vs. write access; can it execute commands? |
| **Is it maintained?** | Recent updates, active issue tracker, responsive maintainer |
| **Is it scoped?** | Does it request minimum necessary permissions? |

### Discussion Points

- How does your team currently vet VS Code extensions?
- What's your organization's policy on third-party AI integrations?

---

## 6.2. VS Code Chat Participants (10 min)

### Key Points

- Chat participants are specialized handlers built into VS Code that route your questions to domain-specific logic
- They're the `@` mentions you use in chat: `@workspace`, `@vscode`, `@terminal`
- Each participant has access to different data and capabilities

### Built-in Participants

| Participant | What It Accesses | Capabilities |
|-------------|-----------------|-------------|
| `@workspace` | File tree, file contents, symbols, dependencies | Project structure, cross-file search, symbol lookup |
| `@vscode` | Settings, extensions, keybindings, commands | Editor configuration, extension recommendations |
| `@terminal` | Recent terminal output, command history | Error diagnosis, command suggestions |

### How Participants Work Under the Hood

1. You type `@workspace How is auth implemented?`
2. VS Code routes the message to the `@workspace` participant
3. The participant searches your project (file tree, symbols, content)
4. Relevant code snippets and file references are injected into the context
5. The augmented context is sent to the model for response

### 🖥️ Demo: Participant Capabilities

1. `@workspace` — Ask "What is the database schema for orders?" — show it finding the schema across files
2. `@vscode` — Ask "How do I configure format on save?" — show it referencing VS Code settings
3. `@terminal` — After a failed `npm test`, ask "Why did the test fail?" — show it reading terminal output

### Discussion Points

- Which participant do you use most? Which do you underuse?
- How does `@workspace` decide which files are relevant to your question?

---

## 6.3. GitHub Copilot Extensions (15 min)

### Key Points

- **Copilot Extensions** are GitHub Apps that add chat capabilities to Copilot
- They appear as `@extension-name` participants in chat — you interact with them through natural language
- Extensions can access external services (Docker, Azure, Sentry, etc.) and bring domain-specific knowledge into Copilot

### Extension Capabilities

| Capability | Description | Example |
|-----------|-------------|---------|
| **Chat responses** | Answer questions with domain knowledge | `@docker How do I optimize this Dockerfile?` |
| **Code actions** | Generate or modify code based on external context | `@azure Generate a Bicep template for this architecture` |
| **Tool invocation** | Call external APIs and return results | `@sentry What are the top errors this week?` |

### Marketplace Discovery

- Browse at <https://github.com/marketplace?type=apps&copilot_app=true>
- Filter by category: development tools, security, cloud, productivity
- Check: publisher verification, install count, recent activity

### 🖥️ Demo: Using a Copilot Extension

1. Show the Copilot Extensions marketplace
2. Install an extension (e.g., Docker, GitHub Models, or Azure)
3. Use it in chat: `@extension-name [question]`
4. Show how the response includes domain-specific knowledge beyond Copilot's base training

### Discussion Points

- What external services would benefit from a Copilot Extension in your workflow?
- How do extensions differ from MCP servers (covered next)?
- What security considerations apply to extensions that access external services?

---

## 6.4. MCP Architecture (15 min)

### Key Points

- **MCP (Model Context Protocol)** is an open standard for connecting AI models to external tools and data sources
- Think of it as "USB for AI" — a standard interface that any tool can implement
- MCP separates three roles: **Host** (VS Code), **Client** (Copilot), and **Server** (the tool provider)

### MCP Architecture

```
┌─────────────────┐
│     VS Code     │  ← HOST: manages connections
│    (Host)       │
├─────────────────┤
│   Copilot       │  ← CLIENT: sends requests to servers
│   (Client)      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│ MCP    │ │ MCP    │  ← SERVERS: provide tools, resources, prompts
│Server A│ │Server B│
│(GitHub)│ │(File   │
│        │ │System) │
└────────┘ └────────┘
```

### MCP Capabilities

| Capability | Description | Example |
|-----------|-------------|---------|
| **Tools** | Functions the model can call | `create_issue`, `run_query`, `deploy_app` |
| **Resources** | Data the model can read | Database schemas, API specs, documentation |
| **Prompts** | Reusable prompt templates | "Summarize this PR", "Review for security" |

### Transport Types

| Transport | How It Works | Best For |
|-----------|-------------|----------|
| **stdio** | Runs as a local process, communicates via stdin/stdout | Local tools, file system, CLIs |
| **SSE** | Server-sent events over HTTP | Remote servers, web services |
| **Streamable HTTP** | HTTP with streaming responses | Modern remote servers |

### MCP vs. Copilot Extensions

| Aspect | MCP Servers | Copilot Extensions |
|--------|------------|-------------------|
| **Standard** | Open protocol (any client) | GitHub-specific |
| **Installation** | Configure in `.vscode/mcp.json` | Install from GitHub Marketplace |
| **Runs where** | Locally or remote server | GitHub's infrastructure |
| **Access scope** | What you configure | What the app requests |
| **Best for** | Custom internal tools | Polished third-party integrations |

### Discussion Points

- What internal tools or services would you expose via MCP?
- How does the host/client/server separation improve security?
- When would you choose MCP over a Copilot Extension (or vice versa)?

---

## 6.5. MCP Configuration (10 min)

### Key Points

- MCP servers are configured in `.vscode/mcp.json` in your workspace
- Each entry specifies a server name, command/transport, and optional environment variables
- VS Code discovers the servers on startup and makes their tools available in chat

### Configuration Syntax

```json
{
  "servers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:github-token}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src"]
    }
  }
}
```

### Security Considerations

| Concern | Mitigation |
|---------|-----------|
| **Token exposure** | Use `${input:name}` for secrets — VS Code prompts at runtime, never stored in file |
| **File access scope** | Limit filesystem servers to specific directories |
| **Network access** | Review what remote servers the MCP server contacts |
| **Command execution** | Only configure servers from trusted sources |

### 🖥️ Demo: MCP Server Setup

1. Create `.vscode/mcp.json` with a filesystem server pointing to the `api/` directory
2. Open chat — show the MCP tools appearing in the tool list
3. Ask Copilot to use the filesystem tool: "List all TypeScript files in the API directory"
4. Add a GitHub MCP server — show it pulling issue data into the chat context

### Discussion Points

- What `.vscode/mcp.json` configuration would you set up first for your project?
- How would you share MCP configurations across your team?
- What's the security review process for adding a new MCP server?

---

## 6.6. Session 6 Summary & Discussion (5 min)

### Key Takeaways

- VS Code chat participants (`@workspace`, `@vscode`, `@terminal`) route questions to specialized handlers
- Copilot Extensions bring third-party domain knowledge into chat via GitHub Apps
- MCP is the open standard for tool integration — configure in `.vscode/mcp.json`
- Always evaluate trust, permissions, and security before adding extensions or MCP servers

### Discussion Points

- What's the first extension or MCP server you'll set up after this session?
- How does MCP change what's possible with Copilot in your workflow?
- What governance process would you recommend for your org's MCP server list?

---

## ☕ Break — 10 Minutes

---

## 7.1. Opening & AI Safety: "When to Trust, When to Verify" (5 min)

### Key Points

- Not all AI output deserves the same level of scrutiny — risk should drive verification effort
- **Low risk**: Boilerplate code, test scaffolding, documentation → quick glance
- **Medium risk**: Business logic, API routes, data transformations → careful review
- **High risk**: Security code, authentication, financial calculations, infrastructure → thorough verification + testing
- The goal is a **trust calibration** framework — not "trust everything" or "verify everything"

### Risk-Based Verification

| Risk Level | Code Type | Verification Level |
|-----------|-----------|-------------------|
| 🟢 **Low** | Boilerplate, scaffolding, docs | Quick scan |
| 🟡 **Medium** | Business logic, API routes | Code review + tests |
| 🔴 **High** | Auth, security, financial, infra | Deep review + security scan + tests |

### Discussion Points

- Where does your team currently draw the trust/verify line?
- Has AI-generated code ever introduced a bug that made it to production?

---

## 7.2. Defining Success Criteria (15 min)

### Key Points

- Before using Copilot for a task, define what "good output" looks like
- Success criteria prevent the trap of accepting the first thing that compiles
- Different task types need different criteria

### Success Criteria by Task Type

| Task Type | Correctness | Style | Performance | Security |
|-----------|------------|-------|-------------|----------|
| **Bug fix** | Fix resolves the issue; no regressions | Matches existing code style | No performance degradation | No new vulnerabilities |
| **New feature** | Meets requirements; handles edge cases | Follows project patterns | Acceptable response time | Input validation, auth checks |
| **Refactoring** | Same behavior; tests still pass | Improved readability | Equal or better performance | No security regression |
| **Test generation** | Tests are meaningful; cover edge cases | Consistent test structure | Tests run in < 30s | No test data leaks |

### Defining Criteria Before Coding

**Template**:

```
Task: [what you're asking Copilot to do]
Success looks like:
  - Functional: [what the code should do]
  - Quality: [readability, patterns, style]
  - Constraints: [performance, security, compatibility]
  - Not acceptable: [what the code should NOT do]
```

### 🖥️ Demo: Criteria-Driven Prompting

1. Define success criteria for a task: "Add pagination to the products API endpoint"
2. Include criteria in the prompt: "Must be cursor-based, max 100 items, no offset, include Link headers"
3. Evaluate the output against the criteria — does it meet each one?
4. Compare to asking without criteria: "Add pagination to products"

### Discussion Points

- How often do you define success criteria before writing code (with or without AI)?
- What's the minimum criteria you'd set for every Copilot interaction?
- How do success criteria change for different team roles (junior vs. senior dev)?

---

## 7.3. Output Quality Rubrics (15 min)

### Key Points

- A **rubric** is a structured scoring system for evaluating AI output quality
- Rubrics make evaluation consistent, repeatable, and shareable across a team
- Score each dimension independently — a fix that's correct but unreadable still needs work

### Rubric Template

| Dimension | Score 1 (Poor) | Score 2 (Acceptable) | Score 3 (Good) | Score 4 (Excellent) |
|-----------|---------------|---------------------|----------------|---------------------|
| **Correctness** | Doesn't work | Works for happy path | Handles common edge cases | Handles all edge cases, robust |
| **Completeness** | Missing major parts | Core functionality present | Fully implements requirements | Exceeds requirements with thoughtful additions |
| **Code Style** | Inconsistent, unreadable | Mostly consistent | Follows project patterns | Clean, idiomatic, well-structured |
| **Security** | Has vulnerabilities | No obvious issues | Validates input, handles errors | Defense in depth, follows OWASP |
| **Performance** | Unacceptable | Adequate | Efficient | Optimized with appropriate trade-offs |

### Applying a Rubric

**Example — Agent-generated pagination code:**

| Dimension | Score | Notes |
|-----------|-------|-------|
| Correctness | 3 | Works, handles empty results and large pages |
| Completeness | 2 | Missing Link header, no total count |
| Code Style | 3 | Matches existing Express route patterns |
| Security | 2 | No input validation on page size parameter |
| Performance | 3 | Uses cursor-based approach, efficient |
| **Overall** | **2.6** | Needs: input validation + Link headers |

### 🖥️ Demo: Rubric Evaluation

1. Ask Agent mode to add a search feature to the products API
2. Score the output against the rubric dimensions
3. Show where it falls short — ask Copilot to fix the specific weaknesses
4. Re-score — show the improvement

### Discussion Points

- What dimensions matter most for your team's code quality standards?
- How would you automate parts of the rubric (e.g., lint = style, tests = correctness)?
- Would you share rubrics across the team, or let each developer customize theirs?

---

## 7.4. Evaluation Methods (15 min)

### Key Points

- Evaluation happens at two levels: **automated** (machines check) and **human-in-the-loop** (developers review)
- The best approach combines both in a verification pipeline
- Automated checks catch the obvious; human review catches the subtle

### Automated Evaluation

| Check | What It Validates | Tool |
|-------|------------------|------|
| **Lint** | Code style, syntax, unused variables | ESLint, Prettier |
| **Type check** | Type safety, interface compliance | TypeScript compiler |
| **Tests** | Functional correctness | Vitest, Jest |
| **Build** | Compilation, bundling | Vite, tsc |
| **Security scan** | Known vulnerabilities, SAST | CodeQL, Semgrep |

### Human-in-the-Loop Evaluation

| Review Focus | What to Look For |
|-------------|-----------------|
| **Logic** | Does the code actually solve the problem? |
| **Architecture** | Does it fit the existing patterns? |
| **Edge cases** | What happens with unexpected input? |
| **Maintainability** | Will another developer understand this in 6 months? |
| **Over-engineering** | Did the AI add unnecessary complexity? |

### The Verification Pipeline

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Agent   │───►│  Lint    │───►│  Type    │───►│  Test    │───►│  Human   │
│  Output  │    │  Check   │    │  Check   │    │  Suite   │    │  Review  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                   ▼ Fail          ▼ Fail          ▼ Fail          ▼ Reject
              Auto-reject     Auto-reject     Auto-reject     Send back
```

### Batch Evaluation

For systematic quality assessment across many tasks:

1. Define a set of representative prompts (10-20 tasks)
2. Run each through Copilot
3. Score outputs against the rubric
4. Track aggregate scores over time
5. Identify patterns: which task types does Copilot handle well vs. poorly?

### 🖥️ Demo: Automated Evaluation Pipeline

1. Generate code with Agent mode
2. Run the lint + type check + test pipeline
3. Show a failure — observe how the automated gate catches the issue
4. Fix the issue and re-run — show the pipeline passing

### Discussion Points

- What automated checks does your team already have in CI?
- How would you adapt your PR review process for AI-generated code?
- What's the right balance between automated and human evaluation?

---

## 7.5. Tracking & Improvement (15 min)

### Key Points

- Evaluation without tracking is a one-time exercise — tracking creates a feedback loop
- Monitor quality trends over time: are your prompts/instructions improving?
- The feedback loop: evaluate → identify weakness → improve instructions → re-evaluate

### Metrics to Track

| Metric | How to Measure | What It Tells You |
|--------|---------------|-------------------|
| **First-pass acceptance rate** | % of agent output accepted without changes | How well your instructions/prompts work |
| **Iteration count** | Number of follow-up prompts needed | Prompt quality and task complexity alignment |
| **Rubric scores** | Average scores per dimension over time | Where Copilot consistently under- or over-performs |
| **Time savings** | Time with Copilot vs. estimated manual time | ROI of AI-assisted development |

### The Feedback Loop

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Generate │───►│ Evaluate │───►│ Identify │───►│ Improve  │
│ code     │    │ with     │    │ weakness │    │ prompts/ │
│          │    │ rubric   │    │          │    │ instruct │
└──────────┘    └──────────┘    └──────────┘    └────┬─────┘
     ▲                                               │
     └───────────────────────────────────────────────┘
```

### Trust Calibration by Task Type

| Task Type | Trust Level | Verification Effort |
|-----------|------------|-------------------|
| Boilerplate / scaffolding | High | Quick scan |
| CRUD endpoints | High | Test coverage check |
| Business logic | Medium | Code review + tests |
| Algorithm implementation | Medium-Low | Deep review + benchmarks |
| Security-critical code | Low | Full security review |
| Infrastructure / IaC | Low | Plan review + dry run |

### 🖥️ Demo: Feedback Loop in Action

1. Generate a utility function — score it (e.g., correctness: 3, style: 2)
2. Identify the style weakness — add a specific instruction to `copilot-instructions.md`
3. Regenerate the same function — show the improved style score
4. Discuss how this scales across a team

### Discussion Points

- What metrics would be most valuable for your team to track?
- How do you currently measure developer productivity? How would AI change that?
- What feedback loops already exist in your development process?

---

## 7.6. Usage, Billing & Cost Strategies (10 min)

### Key Points

- GitHub is transitioning from premium-request-based billing to **usage-based billing (AI Credits)** starting **June 1, 2026**
- **GitHub AI Credits** are the new billing unit: 1 AI credit = $0.01 USD
- Billing is based on actual **token consumption**: input tokens + output tokens + cached tokens
- **Code completions and next edit suggestions remain unlimited** — they are NOT billed in AI credits
- Credits are **pooled at the billing entity level** — power users are offset by lighter users

### The Billing Transition

| Aspect | Current (Premium Requests) | New (AI Credits — June 2026) |
|--------|---------------------------|------------------------------|
| **Unit** | 1 request × model multiplier | Tokens × model price → AI credits |
| **Free models** | GPT-4.1, GPT-4o, GPT-5 mini (0x) | Completions + next edit unlimited; 1,900–3,900 credits/mo included |
| **Pooling** | Per-user monthly allowance | Pooled at billing entity level |

### Model Cost Tiers — Know What You're Spending

| Tier | Models | Multiplier |
|------|--------|-----------|
| **Free** (0x) | GPT-4.1, GPT-4o, GPT-5 mini, Raptor mini | No premium requests consumed |
| **Budget** (0.25–0.33x) | GPT-5.4 nano, Grok Code Fast, Claude Haiku 4.5, Gemini 3 Flash | Fraction of a request |
| **Standard** (1x) | Claude Sonnet 4/4.5/4.6, Gemini 2.5 Pro, GPT-5.2/5.4 | 1 request per prompt |
| **Premium** (3–7.5x) | Claude Opus 4.5/4.6 (3x), Claude Opus 4.7 (7.5x), GPT-5.5 (7.5x) | Multiple requests per prompt |
| **Ultra** (30x) | Claude Opus 4.6 fast mode | 30 requests per prompt |

### 10 Developer Cost Strategies

| # | Strategy | Impact |
|---|----------|--------|
| 1 | **Use included models** (GPT-4.1, GPT-4o, GPT-5 mini) for daily work | Zero cost — 0x multiplier |
| 2 | **Auto model selection** in Copilot Chat | 10% discount on multipliers |
| 3 | **Budget models for routine tasks** (Haiku 0.33x, GPT-5.4 nano 0.25x) | 67–75% cheaper than standard |
| 4 | **Reserve premium models** (Opus, GPT-5.5) for complex problems only | Avoid 3–7.5x multiplier on simple tasks |
| 5 | **Lean `copilot-instructions.md`** — keep under 100 lines | Fewer input tokens per interaction |
| 6 | **Targeted context** — `#file` not `#codebase` | Dramatically fewer input tokens |
| 7 | **Fresh sessions** for new tasks | Prevents history bloat consuming tokens |
| 8 | **File-targeted instructions** with `applyTo` | Only loads when relevant files are active |
| 9 | **Set per-user budgets** | Prevents runaway spending |
| 10 | **Monitor usage reports** regularly | Catch high-consumption patterns early |

### Admin Budget Controls

Budgets can be set at four levels — each can trigger alerts or enforce hard stops:

1. **Enterprise-level** — caps all orgs, repos, cost centers
2. **Organization-level** — caps all repos in the org
3. **Cost-center-level** — caps a single cost center
4. **User-level** — caps individual users ($0 budget = no access)

> **Note**: There is no automatic fallback to cheaper models when a budget is exhausted. Usage is simply blocked until the next billing cycle.

### Discussion Points

- Which cost tier do most of your daily tasks fall into?
- How would you implement per-user budgets in your organization?
- What's the ROI calculation for using a 7.5x model vs. a 1x model?

---

## 7.7. Session 7 Summary & Discussion (5 min)

### Key Takeaways

- Define success criteria before asking Copilot to generate code
- Use rubrics to make evaluation consistent and repeatable
- Combine automated checks with human review in a verification pipeline
- Track metrics over time — use the feedback loop to continuously improve prompts and instructions

### Discussion Points

- What's the first quality metric you'll start tracking?
- How would you introduce rubric-based evaluation to your team?
- What's the biggest quality challenge with AI-generated code in your experience?

---

## ☕ Break — 10 Minutes

---

## 8.1. Opening & AI Safety: "Debugging the Black Box" (5 min)

### Key Points

- AI models are often treated as black boxes — input goes in, output comes out, and it's unclear why
- Copilot provides transparency tools: logs, debug mode, and traces that show what the model received and how it reasoned
- Transparency builds trust — when you can see the context, you can understand the output
- **Debugging AI is different from debugging code**: you're debugging the context and instructions, not an algorithm

### Discussion Points

- Have you ever been confused by a Copilot response? How did you investigate?
- How does transparency change your trust in AI-generated output?

---

## 8.2. Output Log Channels (15 min)

### Key Points

- VS Code has multiple output channels related to Copilot — each logs different information
- The main channels: **GitHub Copilot**, **GitHub Copilot Chat**, and language-specific log channels
- Output logs are your first diagnostic tool — they show connection status, errors, and feature availability

### Output Channels

| Channel | What It Logs | When to Check |
|---------|-------------|--------------|
| **GitHub Copilot** | Completion events, model selection, errors | Completions not appearing or wrong |
| **GitHub Copilot Chat** | Chat request/response cycles, tool calls | Chat responses are wrong or slow |
| **Language Server** | Language-specific analysis, symbols | Code navigation or analysis issues |

### How to Access

1. Open the Output panel: `Ctrl+Shift+U` (Windows) / `Cmd+Shift+U` (Mac)
2. Select the channel from the dropdown
3. Look for errors (red), warnings (yellow), and info messages

### Common Log Patterns

| Log Pattern | Meaning | Action |
|------------|---------|--------|
| `Request failed: 401` | Authentication expired | Re-sign in to GitHub |
| `Request failed: 429` | Rate limit exceeded | Wait or switch to a lower-tier model |
| `Context truncated` | Context window overflow | Reduce attached context or start fresh session |
| `Model not available` | Selected model is down or restricted | Switch to a different model |

### 🖥️ Demo: Reading Output Logs

1. Open the Copilot output channel — show the log stream
2. Trigger a completion — identify the log entry for that event
3. Show an error scenario (e.g., disconnect network briefly) — identify the error in logs
4. Show the Chat output channel — trace a chat request through the logs

### Discussion Points

- How often do you check output logs when Copilot behaves unexpectedly?
- What's the most common error you've seen in Copilot logs?

---

## 8.3. Chat Debug Mode (15 min)

### Key Points

- Chat debug mode reveals what Copilot sees: the full context sent to the model, token counts, timing, and model selection
- Enable via VS Code setting: `github.copilot.chat.debugMode`
- This is the single most useful diagnostic tool for understanding "why did Copilot say that?"

### What Debug Mode Reveals

| Information | Why It Matters |
|------------|---------------|
| **Full context sent** | See exactly what the model received — instructions, files, history |
| **Token counts** | Input tokens, output tokens, total — identify bloat |
| **Model used** | Which model actually handled the request |
| **Timing** | How long each phase took (context assembly, model call, rendering) |
| **Tool calls** | Which tools (search, file read, terminal) were invoked and their results |

### How to Enable

```json
{
  "github.copilot.chat.debugMode": true
}
```

After enabling, debug information appears in the chat output channel and optionally inline with responses.

### Debug Output Anatomy

A typical debug output shows:

```
[DEBUG] Context assembly:
  System prompt: 1,247 tokens
  Repository instructions: 312 tokens
  File-targeted instructions: 0 tokens
  Attached context (#file): 3,891 tokens
  Conversation history: 2,104 tokens
  Current message: 87 tokens
  ────────────────────────
  Total input: 7,641 tokens

[DEBUG] Model: gpt-4o
[DEBUG] Response: 342 tokens (1.2s)
[DEBUG] Tool calls: workspace.search (284ms), file.read (12ms)
```

### 🖥️ Demo: Chat Debug Mode Walkthrough

1. Enable `github.copilot.chat.debugMode` in VS Code settings
2. Send a chat message — open the output channel to see the debug dump
3. Point out: instructions loaded, context composition, token counts
4. Send a message with a large `#file` reference — show the token count jump
5. Show how different models appear in the debug output

### Discussion Points

- What surprised you about the context composition in debug mode?
- How would you use token count information to optimize your prompts?
- When should you enable debug mode vs. leave it off?

---

## 8.4. Agent Debug Logs (15 min)

### Key Points

- Agent mode creates detailed logs of every iteration in its agentic loop
- These logs show: plan, tool calls, results, decisions, and error recovery
- Agent debug logs are essential for understanding why the agent took a particular approach

### Agent Log Location

Agent debug logs are written to a session-specific log file. Access them via:

1. Command Palette → "GitHub Copilot: Open Agent Debug Log"
2. Or find them in the workspace storage directory

### Understanding Agent Iteration Logs

Each iteration in the agent loop creates a log entry:

```
[Iteration 1] Plan: Add validation middleware to orders route
  Tool: file.read → api/routes/orders.ts (success, 2,341 tokens)
  Tool: file.read → api/routes/products.ts (success, 1,892 tokens)
  Tool: file.write → api/middleware/validate-order.ts (created)
  Tool: file.edit → api/routes/orders.ts (modified lines 12-18)
  Tool: terminal.run → npm run lint (exit code: 1)
  Result: FAIL — lint error on line 5: 'Request' is not defined

[Iteration 2] Fix: Add missing import
  Tool: file.edit → api/middleware/validate-order.ts (modified line 1)
  Tool: terminal.run → npm run lint (exit code: 0)
  Tool: terminal.run → npm test (exit code: 0)
  Result: PASS — all validation gates passed
```

### Tool Call Traces

| Field | Description |
|-------|-------------|
| **Tool name** | Which tool was called (`file.read`, `terminal.run`, etc.) |
| **Arguments** | What was passed to the tool (file path, command) |
| **Result** | Success/failure, output content, token count |
| **Duration** | How long the tool call took |
| **Decision** | What the agent decided to do next based on the result |

### 🖥️ Demo: Tracing an Agent Failure

1. Give Agent mode a task that will fail on first attempt (e.g., "Add a feature that requires a missing dependency")
2. Open the agent debug log — trace through the iterations
3. Show where the agent detected the failure (observe phase) and how it adjusted (reflect phase)
4. Point out the tool call trace: what was read, what was written, what commands ran

### Discussion Points

- How would you use agent debug logs to improve your agent instructions?
- What patterns in the logs indicate the agent is stuck?
- How do agent debug logs compare to traditional application debugging?

---

## 8.5. Diagnostics Collection & Curriculum Wrap-Up (10 min)

### Key Points

- When filing issues or requesting support, a diagnostics bundle provides all the information needed
- VS Code can export Copilot diagnostics including: extension version, log files, configuration, and system info
- Always sanitize diagnostics before sharing — remove tokens, secrets, and proprietary code

### Diagnostics Collection

1. Command Palette → "GitHub Copilot: Collect Diagnostics"
2. Review the generated file — redact any sensitive content
3. Attach to GitHub issues or support requests

### Diagnostic Toolkit Cheat Sheet

| Tool | Command / Location | What You Get |
|------|-------------------|-------------|
| **Output logs** | `Ctrl+Shift+U` → select channel | Real-time log stream |
| **Debug mode** | `github.copilot.chat.debugMode: true` | Context composition, token counts |
| **Agent debug log** | Command Palette → "Open Agent Debug Log" | Iteration traces, tool calls |
| **Diagnostics export** | Command Palette → "Collect Diagnostics" | Full diagnostic bundle |
| **Extension version** | Extensions panel → GitHub Copilot → version | Confirm you're on latest |
| **Network check** | Output logs → look for 401/429/timeout | Connection and auth issues |

### Curriculum Wrap-Up — All 8 Sessions Complete

| Module | Sessions | Core Themes |
|--------|----------|-------------|
| **Foundations** (Module 1) | 1–3 | Chat interface, context management, models & tokens |
| **Agentic Patterns** (Module 2) | 4–5 | Agentic loops, self-correction, rubber duck, patterns & antipatterns |
| **Advanced Topics** (Module 3) | 6–8 | Extensions, MCP, evaluation, troubleshooting |

### What to Do Next

- Set up `.github/copilot-instructions.md` in your primary repository
- Create 1-2 custom agents for your team's common workflows
- Configure MCP servers for your internal tools
- Establish an evaluation rubric and start tracking quality metrics
- Share learnings with your team — the best way to learn is to teach

### Further Learning

| Resource | URL |
|----------|-----|
| **Copilot Documentation** | <https://docs.github.com/en/copilot> |
| **MCP Specification** | <https://modelcontextprotocol.io> |
| **OctoCAT Supply Demo Repo** | <https://github.com/microsoft/GitHubCopilot_Customized> |
| **VS Code Copilot Features** | <https://code.visualstudio.com/docs/copilot/overview> |

### Discussion Points

- Across all 8 sessions, what's the single most impactful concept for your daily work?
- What's the first change you'll make to your team's Copilot setup?
- What topics would you want to explore in a follow-up session?

---

*Workshop guide for GitHub Copilot Developer Training — Advanced Topics (Module 3 of 3)*
