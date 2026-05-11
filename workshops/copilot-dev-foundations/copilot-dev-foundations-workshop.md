# Module 1: Foundations — Workshop Guide

**Duration**: ~90 min
**Format**: Presentation + Live Demo + Hands-On
**Audience**: Developers with basic GitHub Copilot exposure
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

---

## Workshop Overview

Module 1 establishes the mental model and operating habits that make GitHub Copilot useful in day-to-day development work. Attendees move from basic chat usage to intentional mode selection, better context management, repository customization, and informed decisions about models, agents, and reusable prompts. The goal is not to treat GitHub Copilot as magic, but to use it as a reliable acceleration layer that still keeps the developer in control of correctness, security, and final decisions.

### Learning Objectives

- Explain how GitHub Copilot fits into a developer workflow from completion to chat to agentic execution
- Choose the right chat mode for a task and use slash commands, participants, and scoped context effectively
- Describe how context, memory, instructions, and prompt quality shape Copilot output
- Create repository-wide and file-scoped instructions that align Copilot with team conventions
- Compare model, agent, and prompt options based on speed, reasoning depth, and cost tradeoffs
- Prepare for the lab by practicing safe review habits and lightweight customization patterns

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **VS Code** | Latest stable version installed |
| **GitHub Copilot** | Extension installed and signed in |
| **GitHub Copilot Chat** | Chat experience available in VS Code |
| **GitHub Copilot CLI** | Installed and ready to launch with `copilot` |
| **Local project** | Any multi-file repository open in VS Code |
| **Internet access** | Required for GitHub Copilot model calls and sign-in |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Foundations framing, safety, and workflow map | 5 min |
| 2 | Copilot Chat Tour (modes, slash commands, @ participants, CLI) | 18 min |
| 3 | Memory, Context & Instructions (context window, instruction files, prompts) | 25 min |
| 4 | Models, Agents, Skills & Customization (model comparison, agents, reusable prompts, tokens) | 32 min |
| 5 | Wrap-up, hand-off to lab, and Q&A | 5 min |

---

## 1. Foundations Framing, Safety, and Workflow Map (5 min)

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

### 🛡️ Safety Moment

- Treat AI as a partner, not a substitute for engineering accountability
- Verify generated code, commands, and architectural claims before accepting them
- Keep approval boundaries clear: the model can suggest or implement, but the developer owns the result

### Discussion Points

- What does your current GitHub Copilot workflow look like today?
- Where do you feel most confident using GitHub Copilot?
- Where do you still hesitate to trust or rely on it?

---

## 2. Copilot Chat Tour (18 min)

### Key Points

- **Ask** mode is best for explanation, exploration, code reading, and quick answers without changing files
- **Plan** mode is best for design, sequencing, and risk-aware change proposals before implementation
- **Agent** mode is best for scoped execution when you want GitHub Copilot to read files, propose edits, and carry out a multi-step task
- Slash commands such as `/explain`, `/fix`, `/tests`, and `/help` reduce prompt friction for common workflows
- Participants and chat variables improve precision:
  - `@workspace` brings in repository-wide context
  - `@terminal` helps interpret command output and shell workflows
  - `@vscode` helps with editor-specific behavior
  - `#file` focuses on a specific file
  - `#selection` focuses on the highlighted code
- Continue a session when the same task benefits from prior context; start fresh when the objective changes, the thread becomes noisy, or assumptions are drifting
- The session sidebar helps manage prior conversations, revisit earlier plans, and branch from useful context instead of repeating setup prompts
- GitHub Copilot CLI extends these workflows into the terminal for project overviews, command help, and non-interactive automation

### 🛡️ Safety Moment

- Review agent-generated file changes before accepting them
- Do not over-trust inline completions just because they appeared quickly or matched surrounding syntax
- Prefer Ask or Plan mode first when the cost of a wrong edit is high

### 🖥️ Demo: Switching Modes, Adding Context, and Using the CLI

1. Open GitHub Copilot Chat and point out the **Ask**, **Plan**, and **Agent** mode picker
2. In **Ask** mode, demonstrate a repo-aware question:

   ```text
   @workspace Summarize this project's structure and tell me which folders matter most for a new contributor.
   ```

3. In **Plan** mode, demonstrate planning without edits:

   ```text
   Plan a safe refactor for #file. Call out risks, test updates, and rollback steps before making changes.
   ```

4. In **Agent** mode, demonstrate a small, reversible task:

   ```text
   Update #selection for clarity, explain the proposed change first, and keep the edit limited to this file.
   ```

5. Show a slash-command workflow:

   ```text
   /explain #selection
   ```

6. Show GitHub Copilot CLI in both interactive and direct-prompt flows:

   ```powershell
   copilot
   /help
   copilot -p "Give me an overview of this project."
   ```

### Discussion Points

- When would **Plan** mode save time versus jumping straight to **Agent** mode?
- Which context helpers would most improve your current prompting habits?
- Where would GitHub Copilot CLI fit naturally into your existing terminal workflow?

---

## 3. Memory, Context & Instructions (25 min)

### Key Points

- GitHub Copilot responses depend heavily on the context window: active files, recent conversation, explicit mentions, repository instructions, and any relevant scoped guidance
- Context is prioritized and truncated, so clearer prompts and better scoping usually outperform longer prompts with unnecessary detail
- Token usage matters because large context payloads can slow responses, increase premium usage, and crowd out the most useful information
- Developers should regularly inspect what context is being sent and trim irrelevant files, stale conversation state, or overly broad workspace requests
- Repository-wide instructions belong in `.github/copilot-instructions.md` and should capture durable project guidance
- File-scoped instructions belong in `.github/instructions/*.instructions.md` and should use `applyTo` patterns to target specific paths or file types
- Reusable prompt files belong in `.github/prompts/*.prompt.md` and are best for repeatable tasks that benefit from a structured objective, scope, and definition of done
- Strong prompts usually specify:
  - **Task** — what outcome you want
  - **Scope** — which files, folders, or code regions matter
  - **Constraints** — coding standards, safety limits, or tools to avoid
  - **Definition of done** — how success should be evaluated

### 🛡️ Safety Moment

- Context selection is also a privacy and governance decision
- Be deliberate about what files, terminal output, and conversation history you include
- Avoid attaching broad workspace context when a smaller `#file` or `#selection` scope is enough

### 🖥️ Demo: Building Instruction Layers That Shape Output

1. Start with a baseline prompt in a code file and note the response style before adding instructions
2. Create a repository-level instruction file at `.github/copilot-instructions.md`:

   ```markdown
   # Repository Instructions

   - Prefer TypeScript strict mode for new application code
   - Use descriptive function names and early returns
   - Add or update tests when behavior changes
   ```

3. Re-run a generation prompt and compare the result to the baseline:

   ```text
   Generate a small utility in #file and explain which repository rules you followed.
   ```

4. Create a file-scoped instruction file at `.github/instructions/tests.instructions.md`:

   ```markdown
   ---
   applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx}"
   ---

   # Test File Instructions

   - Use Arrange-Act-Assert structure
   - Prefer descriptive test names over abbreviations
   - Avoid live network calls in unit tests
   ```

5. Open a matching test file and show how the response changes for test-specific work
6. Highlight how narrower instruction files help preserve context window space while still guiding output

### Discussion Points

- What rules would you encode first for your team's codebase?
- Which instructions belong at the repository level versus the file-scoped level?
- Where have you seen poor results caused by vague prompts or too much irrelevant context?

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

### 🛡️ Safety Moment

- Greater capability increases the blast radius of a weak prompt
- Use narrow scope, explicit constraints, and review checkpoints when working with powerful models or custom agents
- Default to reversible changes and explain-before-edit behavior when introducing a new custom workflow

### 🖥️ Demo: Model Switching, a Custom Agent, and a Reusable Prompt

1. Switch between the default routed model and a larger reasoning model, then compare latency and answer depth on the same prompt:

   ```text
   Compare two safe ways to refactor this module and recommend one based on maintainability and test impact.
   ```

2. Open the usage or billing view and explain how model choice, tokens, and premium requests affect team adoption
3. Create a simple custom agent at `.github/agents/refactor-coach.agent.md`:

   ```yaml
   ---
   tools: ['codebase', 'search', 'editFiles']
   description: Help implement small, well-explained refactors with minimal blast radius
   model: Claude Sonnet 4
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
   mode: 'agent'
   description: 'Review the active file, propose a safe refactor, and explain the validation steps'
   tools: ['codebase', 'search', 'editFiles']
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

### Discussion Points

- How would you decide between a fast small model and a larger reasoning model for a given task?
- Which workflows in your team would benefit more from a reusable prompt than from a persistent custom agent?
- Where would you put review guardrails before letting agentic workflows touch production-critical code?

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
