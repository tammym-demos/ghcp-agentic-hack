# Module 1: Foundations — Workshop Guide

**Duration**: ~90 min
**Format**: Presentation + Live Demo + Hands-On
**Audience**: Developers with basic GitHub Copilot exposure
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI or Copilot CLI sessions in VS Code

---

## Workshop Overview

Module 1 establishes the mental model and operating habits that make GitHub Copilot useful in day-to-day development work. Attendees move from basic chat usage to intentional mode selection, better context management, repository customization, and informed decisions about models, agents, and reusable prompts. The goal is not to treat GitHub Copilot as magic, but to use it as a reliable acceleration layer that still keeps the developer in control of correctness, security, and final decisions.

### Learning Objectives

- Explain how GitHub Copilot fits into a developer workflow from completion to chat to agentic execution
- Use code completions, inline chat, and chat modes effectively for different task types
- Describe Copilot's privacy model, data handling, and IP indemnity protections for enterprise use
- Describe how context, memory, instructions, and prompt quality shape Copilot output
- Create repository-wide and file-scoped instructions that align Copilot with team conventions
- Compare model, agent, and prompt options based on speed, reasoning depth, and cost tradeoffs
- Understand how Copilot Code Review fits into pull request workflows as a complement to human review
- Prepare for the lab by practicing safe review habits and lightweight customization patterns

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **VS Code** | Latest stable version installed |
| **GitHub Copilot** | Extension installed and signed in |
| **GitHub Copilot Chat** | Chat experience available in VS Code |
| **GitHub Copilot CLI** | Installed and ready to launch with `copilot`, or available through Copilot CLI sessions in VS Code |
| **Local project** | Any multi-file repository open in VS Code |
| **Internet access** | Required for GitHub Copilot model calls and sign-in |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Foundations framing, safety, privacy, and workflow map | 5 min |
| 2 | Copilot Interaction Modes (completions, inline chat, modes, code review, CLI) | 20 min |
| 3 | Memory, Context & Instructions (context window, memory, instruction files, prompts) | 25 min |
| 4 | Models, Agents, Skills & Customization (model comparison, agents, reusable prompts, tokens) | 32 min |
| 5 | Wrap-up, hand-off to lab, and Q&A | 5 min |

---

## 1. Foundations Framing, Safety, Privacy, and Workflow Map (5 min)

### Key Points

- GitHub Copilot offers increasing autonomy across a spectrum: inline completion, chat-based assistance, planning help, and agentic execution
- Position GitHub Copilot as an **acceleration layer** for discovery, drafting, planning, and implementation rather than as a replacement for developer judgment
- The human developer remains accountable for correctness, security, compliance, architecture, and final approvals
- A simple mental model helps teams scale adoption safely:

```text
Completion → small local acceleration
Ask / Chat → explanation and exploration
Plan → change design without edits
Agent → multi-step execution with human review
```

- The most effective workflow is not "use AI everywhere"; it is "use the lowest-autonomy tool that solves the current problem well"
- **Where GitHub Copilot lives** — Copilot is available across multiple surfaces, each optimized for a different workflow:

| Surface | Best For | Key Capabilities |
|---------|----------|-----------------|
| **VS Code** | Daily development — editing, debugging, testing | Completions, inline chat, Chat panel agents (Ask/Plan/Agent), terminal integration, extensions, custom agents |
| **Visual Studio** | Enterprise .NET/C++ development | Completions, Chat panel, inline chat, deep integration with Solution Explorer, debugging, and project-aware context |
| **GitHub Copilot CLI** | Terminal-first workflows, background agent sessions, scripting | Interactive chat in the shell, programmatic prompts with `-p`, project overviews, command help — works outside any IDE |
| **GitHub.com (Copilot Chat)** | Code review, repo exploration, issue triage | Chat on any repo page, PR review assistance, commit explanations, issue drafting — no local clone needed |

- VS Code and Visual Studio provide the deepest IDE integration, but exact Copilot features can differ by editor, extension version, plan, and organization policy
- The CLI is ideal for developers who prefer terminal workflows, want background agent sessions, or need programmatic prompts from scripts
- GitHub.com Copilot Chat is useful for quick repo exploration, reviewing PRs on the go, or working from a browser without a local environment
- Copilot surfaces are governed by subscription entitlements and organization policy settings, but exact model and tool availability can differ by surface

- **Privacy and data handling** are essential context for enterprise adoption:
  - Prompts and code snippets are sent to GitHub's hosted models for processing but are **not retained for model training** on Business and Enterprise plans
  - GitHub Copilot Business/Enterprise includes IP indemnity — Microsoft provides intellectual property protection for Copilot output used in qualifying scenarios
  - The **public code filter** can be enabled to suppress suggestions that closely match publicly available code on GitHub, reducing licensing risk
  - Organization admins control policy settings (which features are enabled, which models are available, whether telemetry is collected) via GitHub organization settings
  - Developers should still avoid pasting secrets, credentials, or highly sensitive data into prompts — Copilot is not a secrets manager

### 🛡️ Safety Moment

- Treat AI as a partner, not a substitute for engineering accountability
- Verify generated code, commands, and architectural claims before accepting them
- Keep approval boundaries clear: the model can suggest or implement, but the developer owns the result

### Discussion Points

- What does your current GitHub Copilot workflow look like today?
- Where do you feel most confident using GitHub Copilot?
- Where do you still hesitate to trust or rely on it?

---

## 2. Copilot Interaction Modes (20 min)

### Key Points

- **Code Completions (Ghost Text)** are the most-used Copilot feature and the fastest interaction mode:
  - Suggestions appear inline as you type — accept with `Tab`, dismiss with `Esc`, cycle alternatives with `Alt+]` / `Alt+[`
  - Multi-line completions generate entire blocks (functions, loops, test cases) based on surrounding code and comments
  - **Partial accept** lets you take part of a suggestion word-by-word with `Ctrl+→` (Cmd+→ on macOS) instead of accepting the whole block
  - **Next Edit Suggestions (NES)** proactively predict your next likely edit location and offer completions there, reducing navigation effort
  - Completions work best when you write clear function signatures, descriptive comments, or name variables intentionally — the model uses nearby context to infer intent
- **Inline Chat** (`Ctrl+I` / `Cmd+I`) provides a lightweight prompt experience directly in the editor without opening the Chat panel:
  - Best for quick, targeted edits: "add error handling here", "refactor this to use async/await", "add JSDoc to this function"
  - The prompt applies to the current selection or cursor position, keeping scope tight and diffs easy to review
  - Results appear as an inline diff — accept, reject, or iterate without leaving the editor flow
- **Ask** mode is best for explanation, exploration, code reading, and quick answers without changing files
- **Plan** mode is best for design, sequencing, and risk-aware change proposals before implementation
- **Agent** mode is best for scoped execution when you want GitHub Copilot to read files, propose edits, and carry out a multi-step task
- Slash commands such as `/explain`, `/fix`, `/tests`, and `/help` reduce prompt friction for common workflows
- Context controls, chat participants, and `#` mentions improve precision:
   - **Add Context** attaches files, folders, symbols, source control changes, problems, terminal selections, and other focused context
   - `#selection` focuses on highlighted code
   - `#<file|folder|symbol>` adds a specific file, folder, or symbol by name after typing `#`
   - `#search/codebase` performs codebase search to find relevant workspace context
   - `@terminal` helps interpret command output and shell workflows
   - `@vscode` helps with editor-specific behavior
   - `@github` helps with GitHub repositories, issues, pull requests, and related GitHub context
- **Copilot Code Review** brings AI assistance into the pull request workflow:
   - When enabled for your plan, organization, and repository, request a Copilot review on a pull request — it analyzes the diff and leaves inline comments highlighting potential bugs, security issues, and logic errors
   - Available as a reviewer in the PR review request dropdown on GitHub.com when the feature is enabled
  - Copilot review complements (not replaces) human review — it catches mechanical issues so human reviewers can focus on design, architecture, and business logic
   - Local code review flows in VS Code may be available as preview features for selections or uncommitted changes, depending on your setup
- Continue a session when the same task benefits from prior context; start fresh when the objective changes, the thread becomes noisy, or assumptions are drifting
- The session sidebar helps manage prior conversations, revisit earlier plans, and branch from useful context instead of repeating setup prompts
- GitHub Copilot CLI extends these workflows into the terminal for project overviews, command help, and non-interactive automation

### 🛡️ Safety Moment

- Do not over-trust inline completions just because they appeared quickly or matched surrounding syntax — always read before accepting
- Review agent-generated file changes before accepting them
- Copilot Code Review catches patterns but does not guarantee correctness — human review remains the final gate
- Prefer Ask or Plan mode first when the cost of a wrong edit is high

### 🖥️ Demo: Completions, Inline Chat, Modes, and CLI

1. Open a code file and demonstrate **code completions**:
   - Type a descriptive function signature and pause to show the ghost text suggestion
   - Accept with `Tab`, then show `Ctrl+Z` to undo and demonstrate partial accept with `Ctrl+→`
   - Add a comment describing intent and show how the next completion adapts

2. Demonstrate **Inline Chat** (`Ctrl+I`):
   - Select a block of code and press `Ctrl+I`
   - Type a short instruction:

   ```text
   Add input validation and return early if the argument is invalid.
   ```

   - Show the inline diff, accept it, then demonstrate rejecting an alternative suggestion

3. Open GitHub Copilot Chat and point out the **Ask**, **Plan**, and **Agent** mode picker
4. In **Ask** mode, demonstrate a repo-aware question by attaching codebase context with Add Context or `#search/codebase`:

   ```text
   Use #search/codebase to summarize this project's structure and tell me which folders matter most for a new contributor.
   ```

5. In **Plan** mode, demonstrate planning without edits:

   ```text
   Plan a safe refactor for the attached file. Call out risks, test updates, and rollback steps before making changes.
   ```

6. In **Agent** mode, demonstrate a small, reversible task:

   ```text
   Update #selection for clarity, explain the proposed change first, and keep the edit limited to this file.
   ```

7. Show a slash-command workflow:

   ```text
   /explain #selection
   ```

8. Show GitHub Copilot CLI in both interactive and direct-prompt flows:

   ```powershell
   copilot
   /help
   copilot -p "Give me an overview of this project."
   ```

9. Briefly show **Copilot Code Review** on a pull request:
   - Open a PR on GitHub.com and show the "Request review from Copilot" option if it is enabled for the repository
   - Point out an example of a Copilot review comment with an inline suggestion if one is available
   - Emphasize that Copilot review is additive — it does not replace human approvals

### 💡 Optimization Tip: Session Hygiene

- Start a new session for every new task; do not stack unrelated objectives in one conversation
- A cluttered thread causes the model to reference stale assumptions and produce lower-quality output
- Continue a session only when the same task benefits from prior context; switch the moment the objective drifts

### Discussion Points

- How often do you accept completions without reading them? What habits could reduce blind acceptance?
- When would **Inline Chat** be faster than opening the Chat panel?
- When would **Plan** mode save time versus jumping straight to **Agent** mode?
- Which context helpers would most improve your current prompting habits?
- Would Copilot Code Review change how your team approaches PR reviews?

### 🔬 LAB: Exercise 1 — Copilot Chat Tour

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (5 min) exploring modes, slash commands, context helpers, and the CLI before continuing to the next section.

---

## 3. Memory, Context & Instructions (25 min)

### Key Points

- GitHub Copilot responses depend heavily on the context window: active files, recent conversation, explicit mentions, repository instructions, and any relevant scoped guidance
- Context is prioritized and truncated, so clearer prompts and better scoping usually outperform longer prompts with unnecessary detail
- Token usage matters because large context payloads can slow responses, increase premium usage, and crowd out the most useful information
- Developers should regularly inspect what context is being sent and trim irrelevant files, stale conversation state, or overly broad workspace requests
- VS Code now has two related memory concepts that are useful to distinguish:
   - **VS Code agent memory** is local to your machine and can store user, repository, or session-scoped notes that agents can recall in later conversations
   - **GitHub-hosted Copilot Memory** is a separate preview feature for repository insights shared across Copilot surfaces such as Copilot code review, Copilot CLI, and cloud agents when enabled by policy
- **VS Code agent memory** is populated conversationally — when you say "remember that…" or ask the agent to store a preference, it chooses an appropriate local memory scope
- **GitHub-hosted Copilot Memory** is repository-scoped, opt-in, and managed through GitHub settings or organization policy; repository owners can review and delete repository memories
- Memory complements but does not replace instruction files:
   - Use **local VS Code memory** for personal preferences, temporary working notes, and project facts that help your own agent sessions
   - Use **GitHub-hosted Copilot Memory** for repository insights that should help multiple Copilot surfaces when the feature is enabled
  - Use **instruction files** for explicit, version-controlled team standards that should be reviewed and shared via pull requests
   - Instructions are best for durable, team-wide conventions that need audit trails
- Repository-wide instructions belong in `.github/copilot-instructions.md` and should capture durable project guidance
- File-scoped instructions belong in `.github/instructions/*.instructions.md` and should use `applyTo` patterns to target specific paths or file types
- Reusable prompt files belong in `.github/prompts/*.prompt.md` and are best for repeatable tasks that benefit from a structured objective, scope, and definition of done
- Strong prompts usually specify:
  - **Task** — what outcome you want
  - **Scope** — which files, folders, or code regions matter
  - **Constraints** — coding standards, safety limits, or tools to avoid
  - **Definition of done** — how success should be evaluated, including explicit stop conditions that prevent the agent from over-executing beyond the intended scope

### 🛡️ Safety Moment

- Context selection is also a privacy and governance decision
- Be deliberate about what files, terminal output, and conversation history you include
- Avoid attaching broad workspace context when a smaller `#file` or `#selection` scope is enough

### 🖥️ Demo: Memory, Instruction Layers, and Context Shaping

1. Demonstrate **Copilot Memory** by stating a preference conversationally:

   ```text
   Remember: I prefer early returns over nested if-else in this project.
   ```

2. Show that Copilot acknowledges the preference, then ask a follow-up in a new prompt to confirm recall:

   ```text
   Generate a validation function in the attached file.
   ```

3. Run **Chat: Show Memory Files** in VS Code and show:
   - The memory files available across user, repository, and session scopes
   - How local memory differs from version-controlled instruction files
   - Why memory should not contain secrets or sensitive information

4. If your organization has GitHub-hosted Copilot Memory enabled, briefly show **Repository Settings > Copilot > Memory** and explain that it is repository-scoped, GitHub-hosted, and separate from local VS Code memory

5. Start with a baseline prompt in a code file and note the response style before adding instruction files
6. Create a repository-level instruction file at `.github/copilot-instructions.md`:

   ```markdown
   # Repository Instructions

   - Prefer TypeScript strict mode for new application code
   - Use descriptive function names and early returns
   - Add or update tests when behavior changes
   ```

7. Re-run a generation prompt and compare the result to the baseline:

   ```text
   Generate a small utility in the attached file and explain which repository rules you followed.
   ```

8. Create a file-scoped instruction file at `.github/instructions/tests.instructions.md`:

   ```markdown
   ---
   applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx}"
   ---

   # Test File Instructions

   - Use Arrange-Act-Assert structure
   - Prefer descriptive test names over abbreviations
   - Avoid live network calls in unit tests
   ```

9. Open a matching test file and show how the response changes for test-specific work
10. Highlight how narrower instruction files help preserve context window space while still guiding output

### 💡 Optimization Tip: Context Rot and Stop Signals

- **Lost in the middle**: As a context window grows, models can give less attention to details buried in the middle of long conversations or large context payloads — making it critical to keep the most relevant context concise and recent
- **Context drift**: Long sessions can accumulate stale assumptions, old terminal output, and superseded requirements — use a fresh session or `/compact` when the thread stops reflecting the current objective
- **Stop signals in prompts**: Always include explicit stop conditions in your prompts (for example, "stop when the tests pass" or "do not modify files outside `src/auth/`") to prevent agents from over-executing beyond your intent
- These phenomena explain why shorter, well-scoped prompts consistently outperform long prompts with unnecessary detail

### Discussion Points

- What rules would you encode first for your team's codebase?
- Which instructions belong at the repository level versus the file-scoped level?
- Where have you seen poor results caused by vague prompts or too much irrelevant context?

### 🔬 LAB: Exercise 2 — Memory, Context & Instructions

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (5 min) creating repository and file-scoped instruction files and observing how they shape GitHub Copilot output.

---

## 4. Models, Agents, Skills & Customization (32 min)

### Key Points

- Different models are optimized for different goals: some emphasize speed and low latency, while others perform better on deep reasoning, larger change sets, or ambiguous tasks
- A practical selection model:

| Need | Best fit | Why |
|------|----------|-----|
| **Quick iteration** | Smaller or routed default model | Faster responses for lightweight questions and edits |
| **Complex reasoning** | Larger reasoning model | Better for tradeoffs, architecture, and multi-step plans |
| **Inline completions** | Built-in completion experience | Optimized for next-edit prediction, not long-form reasoning |

- The auto model router is convenient for mixed workloads, but developers should still know when to override it for a hard problem or a fast path
- Premium-request and token budgets matter; broad context, stronger models, and agentic execution all raise the cost of a careless workflow
- Token-efficient strategies include narrowing context, starting fresh sessions when needed, using smaller models for simple tasks, and reserving powerful models for high-value reasoning
- Built-in modes help with general work; custom agents help teams package recurring workflows, tone, tools, and guardrails into a reusable persona
- Skills extend what agents can do by supplying specialized tools or domain-specific instructions that the agent can invoke when relevant
- Reusable prompt files are ideal when you want consistency without creating a persistent persona
- Context-window size, premium usage, and autonomy are connected: the more freedom and context you grant, the more important good framing and review become
- **Checking usage and context in VS Code** — developers can inspect what Copilot is consuming directly in the IDE:
   - **References and context list** — when shown after a Chat response, expand the references disclosure to see which files, symbols, tools, or instruction files Copilot used. If irrelevant items appear, narrow your prompt scope
   - **Context window control** — the Chat input shows context utilization. Hover it to see token counts and a breakdown by category; use this signal to start a fresh session, run `/compact`, or reduce attached files
  - **Model label** — the current model name is displayed in the Chat panel header. Verify you are using the intended tier before expensive prompts
   - **Usage, credits, or request counters** — depending on your plan and billing model, the Copilot status menu or GitHub billing pages may show AI credits, premium requests, or other usage indicators
   - **Agent debug logs and Output panel** — use Chat debug logs or the GitHub Copilot output channels to inspect request timing, model routing decisions, and errors when troubleshooting slow or unexpected responses
- **How to interpret what you see**:
   - If references include files you did not intend → your prompt scope is too broad; attach a specific file, folder, symbol, or `#selection` instead of broad codebase context
   - If context is nearly full → start a new session (`/clear`), run `/compact`, or remove attached files before continuing
  - If responses are slow or shallow → check whether a reasoning model is being used for a simple task; switch to a faster model
   - If usage budget is constrained → prefer smaller models for routine work and reserve stronger reasoning models for high-value tasks

### 🛡️ Safety Moment

- Greater capability increases the blast radius of a weak prompt
- Use narrow scope, explicit constraints, and review checkpoints when working with powerful models or custom agents
- Default to reversible changes and explain-before-edit behavior when introducing a new custom workflow

### 🖥️ Demo: Model Switching, a Custom Agent, and a Reusable Prompt

1. Switch between the default routed model and a larger reasoning model, then compare latency and answer depth on the same prompt:

   ```text
   Compare two safe ways to refactor this module and recommend one based on maintainability and test impact.
   ```

2. Show how to **inspect usage and context** in the IDE:
   - Click the Copilot icon in the VS Code status bar and point out any usage, credit, or request indicators available for your plan
   - After a Chat response, expand the references/context disclosure if shown and walk through what was included
   - Open the Agent Debug Logs or GitHub Copilot output channel and show a request log entry with model and timing
   - Demonstrate how switching from broad codebase context to one attached file or `#selection` reduces the reference list
3. Create a simple custom agent at `.github/agents/refactor-coach.agent.md`:

   ```yaml
   ---
   tools: ['search/codebase', 'search', 'edit/editFiles']
   description: Help implement small, well-explained refactors with minimal blast radius
   ---

   You are a careful refactoring partner for this repository.

   - Explain the plan before editing files
   - Keep changes scoped to the user's active task
   - Prefer small, reversible edits
   - Recommend tests when behavior changes
   ```

4. Invoke the new agent from the mode picker and show how the persona changes the workflow
5. Create a reusable prompt file at `.github/prompts/refactor-checklist.prompt.md`:

   ```yaml
   ---
   agent: agent
   description: 'Review the active file, propose a safe refactor, and explain the validation steps'
   tools: ['search/codebase', 'search', 'edit/editFiles']
   ---

   # Safe Refactor Checklist

   ## Objective
   Improve the active file without changing intended behavior.

   ## Requirements
   - Explain the current structure first
   - Propose the smallest useful improvement
   - Call out risks and suggested tests
   - Keep edits local unless the user asks for broader changes
   ```

6. Run the prompt and compare the experience to using the custom agent

### 💡 Optimization Tip: Token Cost Awareness

- **Output tokens cost more than input tokens**: generating code and explanations requires more compute than reading context, so concise instructions that produce focused output save both time and budget
- **Model tier price spread**: stronger reasoning models can consume substantially more usage budget than lightweight models — meaning careless model selection on routine tasks compounds quickly across a team
- **"Be concise" in instructions works**: adding a simple instruction like "be concise" in `copilot-instructions.md` measurably reduces output token volume without sacrificing quality for most tasks
- The auto model router handles most mixed workloads well, but developers should override it when they know a task is trivially simple (use a smaller model) or architecturally complex (use a reasoning model)

### Discussion Points

- How would you decide between a fast small model and a larger reasoning model for a given task?
- Which workflows in your team would benefit more from a reusable prompt than from a persistent custom agent?
- Where would you put review guardrails before letting agentic workflows touch production-critical code?

### 🔬 LAB: Exercise 3 — Models, Agents & Custom Prompt

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (5 min) switching models, creating a custom agent, and running a reusable prompt file.

---

## 5. Wrap-up, Hand-off to Lab, and Q&A (5 min)

### Key Points

- GitHub Copilot is most effective when developers choose the right autonomy level, supply focused context, and keep review accountability with the human
- Small customizations such as instructions and reusable prompts often deliver value faster than jumping immediately to advanced agent setups
- Model choice, context discipline, and session management all influence quality, speed, and cost
- The hands-on lab reinforces today's core habits: mode selection, instruction layering, and lightweight customization
- Module 2 builds on this foundation by moving deeper into agentic patterns, delegation, and safer orchestration workflows

### Discussion Points

- What is one GitHub Copilot habit you want to change immediately after this session?
- Which part of the lab do you expect to be most useful in your real project work?
- What questions should we carry into Module 2 on agentic patterns?

*Workshop guide for Module 1: Foundations — GitHub Copilot Developer Training*
