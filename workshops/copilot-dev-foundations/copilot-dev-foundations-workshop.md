# Module 1: Foundations — Workshop Guide

**Duration**: ~90 min (condensed delivery)
**Format**: Presentation + Live Demo + Hands-On
**Audience**: Developers with basic Copilot exposure
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

---

## Workshop Overview

Module 1 establishes the operating model for the rest of the Copilot Developer Training curriculum. In the full program, this content spans three sessions over roughly 3 hours and 15 minutes. In this condensed instructor-led delivery, the goal is to give attendees the mental models they need to use Copilot deliberately: where the main interaction surfaces live, how context is assembled, how instructions shape behavior, and how modes, models, agents, skills, and reusable prompts affect quality, speed, and cost.

The first portion of the module is a guided tour of **Copilot interaction surfaces** with the emphasis shifted away from basic ghost text mechanics and toward higher-value control surfaces. Attendees learn the practical differences between **Ask**, **Plan**, and **Agent** mode; when to use slash commands; how `@workspace`, `@terminal`, `@vscode`, `#file`, and `#selection` change context; why GitHub Copilot CLI belongs in the same workflow family; and why multi-session management matters when moving between unrelated tasks.

The second half of the module explains why Copilot output quality is largely a **context management** problem. Developers see how the context window is constructed, what happens when token budgets get tight, how repository and file-scoped instructions reduce repetition, and how stronger prompts produce more reliable output. The module closes by connecting **models, agents, skills, reusable prompts, and usage economics**: choosing the right model for the task, recognizing context-window and premium-request tradeoffs, understanding built-in vs. custom agents, packaging repeatable workflows, and using repository setup guidance such as `.github/workflows/copilot-setup-steps.yml` to make good practices repeatable.

### Learning Objectives

- Explain the difference between inline completions, IDE chat surfaces, Copilot CLI prompts, and agentic workflows
- Choose appropriately between **Ask**, **Plan**, and **Agent** mode for a given task
- Use slash commands, chat variables, and `@` participants to narrow or widen Copilot context intentionally
- Describe how the context window is assembled, prioritized, and truncated
- Create and explain repository-level and file-scoped instruction files
- Craft prompts that specify task, scope, constraints, and definition of done
- Compare models and agent options based on capability, latency, autonomy, safety, and usage cost
- Create and invoke a custom agent and a reusable prompt

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub account** | Copilot-enabled account with access to chat features and model switching appropriate to the attendee's plan |
| **VS Code** | Latest stable build recommended so panel chat, inline chat, and quick chat behaviors match the live demo |
| **GitHub Copilot extension** | Signed in and working before the session begins |
| **GitHub Copilot CLI** | Installed for terminal-based prompt workflows that complement the IDE demos and lab |
| **Sample repository** | Any non-trivial project with multiple files so workspace context, instructions, and agent behavior are visible |
| **Usage visibility** | Ability to open Copilot usage/status views and output/log views for model or request troubleshooting if needed |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Foundations framing, safety, and workflow map | 5 min |
| 2 | Copilot Chat Tour | 18 min |
| 3 | Memory, Context & Instructions | 25 min |
| 4 | Models, Agents, Skills & Customization | 32 min |
| 5 | Wrap-up, hand-off to lab, and Q&A | 5 min |

---

## 1. Foundations Framing, Safety, and Workflow Map (5 min)

### Key Points

- Module 1 starts with one framing idea: Copilot offers increasing autonomy as you move from **completion** to **chat** to **agent** workflows.
- Copilot should be presented as an **acceleration layer**, not an autonomous replacement for software judgment. The highest-value habit in this module is not "prompt harder" — it is **review deliberately**.
- The instructional arc for the module is:

```
Inline Completions → Chat Modes → Context & Instructions → Models & Agents
     speed boost       conversation        reliability layer      scale choices
```

- A useful mental model is that Copilot operates on three interaction levels:

  | Level | Typical Surface | Best For | Human Responsibility |
  |-------|-----------------|----------|----------------------|
  | **Completion** | Ghost text in editor | Local code continuation | Accept only what you understand |
  | **Chat** | Panel, inline, quick chat | Explanation, refinement, focused edits | Validate reasoning and scope |
  | **Agent** | Multi-step task execution | Larger edits, file changes, workflow automation | Review plan, diffs, and side effects |

- Establish the three AI safety themes up front so they are not treated as a separate compliance lecture:
  - **S1 — AI as Partner, Not Replacement**: The human remains accountable for correctness, security, and business fit.
  - **S2 — What Gets Shared?**: Context selection is a privacy and governance decision, not just a convenience feature.
  - **S3 — Model Selection: Capability vs. Risk**: More capability and autonomy are useful, but they also increase blast radius if the task is poorly framed.
- The rest of the module is about learning to control those variables instead of treating Copilot as a black box.

> **Important**: The fastest route to poor Copilot results is silent over-trust. In this workshop, every recommendation should reinforce trust calibration: inspect the suggestion, inspect the context, inspect the result.

### 🖥️ Demo: Environment Tour and Mental Model Setup

- Open VS Code with a sample repository and quickly point out the surfaces attendees will use for the rest of the module:
  - Copilot Chat panel
  - Model / mode selector
  - Chat session list
  - Inline chat entry point on a selected block
  - Terminal access for `copilot -p "..."` workflows
- Show the completion → chat → agent progression, then explain that the same repository produces different answers based on mode, context, instructions, and model choice.
- Frame the workshop as learning to control those variables quickly and safely.

### Discussion Points

- Where do attendees currently use Copilot most: completions, chat, or agentic workflows?
- What makes people trust or distrust AI-generated code in their day-to-day work?
- Which is the bigger challenge in their environment today: output quality, privacy concerns, or cost visibility?
- How often do they start fresh chats versus continuing an existing thread long past its useful context?

---

## 2. Copilot Chat Tour (18 min)

### Key Points

- Because this audience already knows inline completions, this section should move quickly past ghost text and focus on the higher-value chat and agent controls that shape larger tasks.

- **Chat surfaces** solve different interaction problems:

  | Surface | Best Use | Strength | Limitation |
  |---------|----------|----------|------------|
  | **Chat panel** | Multi-turn exploration and workspace reasoning | Persistent conversation, mode switching, broader context | Easy to accumulate stale context if left open too long |
  | **Inline chat** | Focused edits near the code you are changing | Strong locality and low context overhead | Not ideal for broader architectural questions |
  | **Quick chat** | Short questions or lightweight lookups | Fast, interrupt-friendly | Less suited to complex, multi-step work |

- **Modes** should be taught as a decision framework, not a feature checklist:

  | Mode | Use When | Typical Output | Instructor Talking Point |
  |------|----------|----------------|--------------------------|
  | **Ask** | You need explanation, comparison, or orientation | Read-only analysis, suggestions in chat | "Ask mode is for understanding before changing." |
  | **Plan** | You want a structured implementation plan before editing | Ordered steps, assumptions, and open questions | "Plan mode is for thinking through the work before touching files." |
  | **Agent** | The task spans files, commands, or iterative work | Multi-step execution, file edits, tool usage | "Agent mode is for delegated execution with review checkpoints." |

- Focused edits still matter, but they are best taught as a **workflow** rather than a permanent mode name: select code, use inline chat or a precise prompt, then review the proposed diff before accepting.

- Slash commands reduce prompt writing overhead for common intents:

  | Command | Purpose | Good Example |
  |---------|---------|--------------|
  | `/explain` | Explain existing code or behavior | "Explain this function's error handling path." |
  | `/fix` | Propose a correction for an error or smell | "Fix this null reference bug without changing the public API." |
  | `/tests` | Generate or expand tests | "Add edge-case tests for invalid input and empty state." |
  | `/help` | Show available commands and guidance | "Show me the current slash commands I can use here." |

- `@` participants let the user steer context deliberately:

  | Participant | Best Use | Typical Question |
  |-------------|----------|------------------|
  | `@workspace` | Repo-wide architecture, symbols, dependencies | "Where is authentication enforced across this codebase?" |
  | `@terminal` | Shell commands and terminal debugging help | "Explain the last command and why it failed." |
  | `@vscode` | Editor or tooling guidance | "How do I compare changes and inspect the Output panel?" |

- Chat variables are equally important for shaping scope:

  | Variable | Best Use | Typical Question |
  |----------|----------|------------------|
  | `#selection` | A highlighted snippet or focused local logic | "Explain the risks in `#selection` before I change it." |
  | `#file` | A specific file you want Copilot to inspect | "`#file:package.json` explain the dependencies I should care about first." |

- GitHub Copilot CLI extends the same prompt-first workflow to the terminal. The current entry point is `copilot`, or `copilot -p "..."` for one-shot prompts, replacing the older `gh copilot` extension flow.

- Multi-session management is a productivity skill:
  - Start a **new session** when the task changes materially.
  - Keep one session for architecture learning and a separate one for implementation.
  - Do not overload a single thread with unrelated bugs, refactors, and documentation tasks.
  - Return to an old session only when the old context still helps.

> **Note**: Exact keybindings and small UI labels can vary by editor version. Teach the intent behind the interaction first, then map it to the attendee's current UI.

> **Important**: **AI as Partner, Not Replacement** is most visible in this section. Inline completions feel frictionless, which is why they are also the easiest place to over-trust unreviewed output.

### 🖥️ Demo: From Chat Control to Agent Mode

- Open the **chat panel** in **Ask** mode and ask a workspace-level orientation question such as:

  ```text
  @workspace Explain how this repository is structured for a developer who just joined the team.
  ```

- Switch to **Plan** mode for a bounded task such as drafting README updates, review the proposed steps, then choose whether to continue.
- Switch to **Agent** mode for a bounded multi-step task such as adding tests or improving documentation, and narrate the review checkpoints before accepting changes.
- Run one or two slash commands on real code:

  ```text
  /explain
  /tests
  ```

- Show the terminal equivalent for a one-shot prompt:

  ```bash
  copilot -p "Explain this Git command: git rebase -i HEAD~3"
  ```

- Start a second chat session and show why a fresh conversation often produces cleaner reasoning for a new task.

### Discussion Points

- Which tasks in attendees' daily work are naturally **Ask**, **Plan**, or **Agent** tasks?
- Where do slash commands save the most time compared to writing a prompt from scratch?
- What kinds of mistakes are easiest to miss in inline completions versus chat output?
- How might multi-session discipline improve both answer quality and token efficiency?

---

## 3. Memory, Context & Instructions (25 min)

### Key Points

- Copilot output quality is heavily shaped by the **context window**: the set of instructions, files, selections, history, and retrieved snippets that fit within the current token budget.
- A practical teaching diagram is:

```
┌───────────────────────────────┐
│ User goal and prompt          │
├───────────────────────────────┤
│ Active selection / active file│
├───────────────────────────────┤
│ Open tabs and recent history  │
├───────────────────────────────┤
│ Repo instructions             │
├───────────────────────────────┤
│ Matching file-scoped rules    │
├───────────────────────────────┤
│ Retrieved workspace snippets  │
└───────────────────────────────┘
              ↓
         Token budget
     Lower-priority context may be trimmed
```

- Developers do not need to memorize token counts, but they should understand the three fundamentals:
  - **Token budget**: The maximum amount of input and output the model can process in one interaction
  - **Priority**: Some context sources are more important than others and are more likely to survive when the window is tight
  - **Truncation**: When too much context is included, something gets dropped or summarized, which can change answer quality

- A useful way to explain context sources is:

  | Context Source | Why It Helps | Failure Mode When Overused |
  |----------------|--------------|----------------------------|
  | **Selection / active file** | Highest relevance for local edits | Can hide broader architectural constraints |
  | **Workspace retrieval** | Adds repo-wide grounding | Can flood the request with irrelevant snippets |
  | **Chat history** | Preserves continuity | Old assumptions linger after the task changes |
  | **Instructions** | Encodes stable rules once | Conflicting or vague rules reduce consistency |
  | **Prompt details** | Clarifies the immediate goal | Long, unfocused prompts waste tokens |

- Repository-level instructions provide a stable baseline. A concrete example:

  ```markdown
  <!-- .github/copilot-instructions.md -->

  - Prefer TypeScript strict mode patterns.
  - Never hard-code secrets or API keys; use environment variables.
  - Add or update tests when changing business logic.
  - Favor small, reviewable edits over large rewrites.
  ```

- File-scoped instructions help only when they are more specific than the repository baseline. A concrete example:

  ```markdown
  ---
  applyTo: "**/*.test.*"
  ---

  - Use Jest and `describe` / `it` blocks.
  - Cover happy path, edge cases, and error handling.
  - Prefer deterministic tests; avoid real network calls.
  ```

- Explain **instruction layering** as a stack:

  | Layer | Purpose | Example |
  |-------|---------|---------|
  | **User-level instructions** | Personal defaults across all repos | `~/.copilot/copilot-instructions.md` — "Prefer concise commit messages; use PowerShell on Windows." |
  | **Repository instructions** | Shared rules for this codebase | `.github/copilot-instructions.md` |
  | **File-scoped instructions** | Language or file-type specialization | `applyTo: "**/*.test.*"` |
  | **Session and prompt context** | Task-specific intent for the current moment | "Add tests for invalid dates only; do not touch production code." |

- The most reliable prompt formula for this module is:

  ```text
  Task + Scope + Constraints + Output Format + Definition of Done
  ```

- Prompt crafting works best when shown concretely:

  | Weak Prompt | Improved Prompt | Why the Improved Prompt Works |
  |-------------|-----------------|-------------------------------|
  | "Write tests" | "Write Jest unit tests for `parseInvoice`. Cover valid input, missing required fields, duplicate invoice IDs, and malformed dates. Do not modify production code." | Names the target, edge cases, framework, and scope boundary |
  | "Refactor this" | "Refactor this function for readability. Preserve behavior, keep the public signature unchanged, and reduce nested conditionals." | Defines success and protects against overreach |
  | "Explain the app" | "Explain the repository structure for a new developer in three sections: entry points, core services, and test strategy." | Requests a usable format, not just prose |
  | "Fix bug" | "Find the likely source of the null reference in this file, propose the smallest safe fix, and explain why it happens." | Encourages diagnosis before editing |

> **Important**: **What Gets Shared?** belongs here. Attendees should understand that adding `@workspace`, large pasted logs, or sensitive snippets changes what the model sees. Context selection is part of secure software practice.

> **Note**: If Copilot starts "forgetting" a detail, that does not always mean the model is weak. It often means the task, chat history, and added context exceeded a practical token budget.

### 🖥️ Demo: Shaping Copilot with Instructions and Better Prompts

- Create or open `.github/copilot-instructions.md` and explain why these are **stable repo policies**, not one-off prompt fragments.
- Add a targeted instruction file under `.github/instructions/tests.instructions.md` and explain the role of `applyTo`.
- Ask the same prompt before and after adding instructions, such as:

  ```text
  Write tests for this function.
  ```

- Then improve the prompt live:

  ```text
  Write Jest tests for this function. Cover the happy path, invalid input, empty input, and duplicate values. Keep the tests deterministic and do not change production code.
  ```

- Contrast the two results and tie the change back to **context quality**, not just "model intelligence."
- Start a fresh session and show how removing stale history can improve relevance for a new task.

### Discussion Points

- Which kinds of repository rules are worth encoding once in instructions instead of repeating in prompts?
- What sensitive information do teams need to be careful not to overshare in prompts or attached context?
- When do attendees see the best results from longer prompts, and when do long prompts just create noise?
- How could better session hygiene reduce both hallucinations and wasted time?

---

## 4. Models, Agents, Skills & Customization (32 min)

### Key Points

- Model selection should be taught as a **tradeoff conversation**, not a brand contest. The right model depends on reasoning depth, speed, availability, autonomy needs, and cost sensitivity.
- A practical comparison frame is:

  | Model Family | Strengths | Best Teaching Scenario | Watch-Outs |
  |--------------|-----------|------------------------|------------|
  | **GPT-5.x / fast general-purpose models** | Fast answers, strong broad capability, good live-demo responsiveness | Repo tours, first-pass explanations, quick rewrites | Can encourage shallow iteration if the task really needs deeper planning |
  | **Claude Sonnet 4.6 / stronger reasoning models** | Strong synthesis across larger context, nuanced explanation, thoughtful plans | Multi-file reasoning, architecture analysis, prompt comparison demos | Often slower and may consume more premium budget on rich prompts |
  | **Smaller / lower-cost models** | Lower latency and lower cost for repetitive work | Fast experimentation, boilerplate cleanup, low-risk drafts | More likely to need tighter prompts and stronger review |

- Model names and availability can vary by plan, IDE, rollout, and date. The workshop point is not "memorize the lineup"; it is **recognize the decision criteria**.

- Concrete comparison scenarios help attendees choose intentionally:

  | Scenario | Better Starting Choice | Why |
  |----------|------------------------|-----|
  | "Explain this repository to a new hire in 60 seconds." | Faster general-purpose model | Speed matters more than deep chain-of-thought |
  | "Compare two implementation approaches across four files." | Stronger reasoning model | Cross-file synthesis matters more than latency |
  | "Generate a first pass of repetitive tests or documentation." | Lower-cost model or targeted agent | Repetition favors speed and cost efficiency |
  | "Make a multi-step change with commands and validation." | Agent workflow with clear guardrails | The interaction model matters as much as the base model |

- Token mechanics should be explained in plain language:

  | Token Type | Meaning | Practical Impact |
  |------------|---------|------------------|
  | **Input tokens** | The prompt, instructions, file context, chat history, and retrieved snippets sent to the model | Large context improves grounding until it crowds out relevance or raises cost |
  | **Output tokens** | The model's response, edits, plan, or explanation | Long outputs can be useful, but they also cost more and may hide the main point |

- A simple budgeting model is:

```
Total request cost = input context + retrieved context + model response
```

- Good token habits are highly teachable:

  | Strategy | What It Saves | Example |
  |----------|---------------|---------|
  | **Start fresh for new work** | Old chat history tokens | New bug, new thread |
  | **Scope context intentionally** | Unnecessary workspace retrieval | Use `#selection` or a single file before `@workspace` |
  | **Summarize before pasting** | Large log and stack trace overhead | Paste the key error plus 5-10 lines, not 500 |
  | **Split large tasks** | Overlong prompts and bloated output | Plan first, implement second, test third |
  | **Move stable guidance into instructions** | Repeated prompt boilerplate | Security and test expectations belong in instruction files |
  | **Ask for structured output** | Rambling responses | "Give me a three-step plan, then the patch." |

- Built-in and custom agents serve different purposes:

  | Agent Type | Best For | Example |
  |------------|----------|---------|
  | **Built-in agent workflows** | General coding, explanation, editing, or multi-step task execution | Using Agent mode to create tests or update a README |
  | **Custom agents** | Reusable, team-specific specialization | A repo-defined test specialist or documentation specialist |

### Agents, Skills, and Reusable Prompts

- These three concepts give teams reusable control surfaces beyond one-off prompting:

  | Concept | Definition | Where It Lives |
  |---------|------------|----------------|
  | **Agent** | A goal-directed workflow with tool access that can plan, act, observe, and adjust | Built-in (Agent mode) or custom (`.github/agents/`) |
  | **Skill** | A specific tool capability an agent can use | File operations, terminal, search, web, GitHub APIs |
  | **Reusable prompt** | A saved prompt template invokable from the command palette | `.github/prompts/*.prompt.md` |

- A concrete custom agent example can make the idea tangible:

  ```markdown
  <!-- .github/agents/test-specialist.agent.md -->
  ---
  name: test-specialist
  description: Focuses on test coverage, quality, and testing best practices without modifying production code
  tools: ["read", "search", "edit"]
  ---

  You are a testing specialist focused on improving code quality through comprehensive testing.
  Focus only on test files unless the user explicitly requests otherwise.
  ```

- Agent files have four important parts:
  - `name` — this is how the agent is invoked in chat, such as `@test-specialist`
  - `description` — helps Copilot understand when this agent should be suggested or selected
  - `tools` — scopes what the agent can do, such as `read`, `search`, `edit`, or terminal access
  - The system prompt below the frontmatter — shapes behavior, boundaries, and output style

- Reusable prompts complement agents when the task is repeatable but does not need a dedicated persona or tool scope:

  ```markdown
  <!-- .github/prompts/explain-function.prompt.md -->
  ---
  description: 'Explain a function with context, edge cases, and improvement suggestions'
  ---

  Explain the selected function. Cover:
  1. What it does and why
  2. Key parameters and return values
  3. Edge cases and error handling
  4. One improvement suggestion
  ```

- Invoke reusable prompts from the Command Palette: **Run Prompt** → select the prompt file.

- A practical built-in skills inventory is:

  | Skill | What It Does | Available In |
  |-------|--------------|--------------|
  | **File read/write** | Read and edit files in the workspace | Agent mode, custom agents |
  | **Terminal** | Run shell commands | Agent mode |
  | **Search** | Find symbols, files, and text across the workspace | All modes |
  | **Web search** | Search the internet for current information | Agent mode |
  | **GitHub APIs** | Create issues, PRs, read repo metadata | Coding agent |

- The coding agent takes autonomy further: it receives an issue, creates a branch, implements changes in a cloud environment, and opens a PR — all without the developer's IDE open. Module 2 ("The Agentic Shift") teaches you how to design, supervise, and review this level of autonomy responsibly.

- `.github/workflows/copilot-setup-steps.yml` is the repository's way to make good setup habits discoverable. A minimal example:

  ```yaml
  # .github/workflows/copilot-setup-steps.yml
  name: Copilot Setup Steps

  on:
    workflow_dispatch:

  jobs:
    copilot-setup-steps:
      runs-on: ubuntu-latest
      permissions:
        contents: read
      steps:
        - uses: actions/checkout@v4
        - run: npm ci
        - run: npm test
  ```

- This file matters because it shortens the gap between "the agent can edit code" and "the environment is actually ready for trustworthy changes."

> **Important**: **Model Selection — Capability vs. Risk** belongs here. Use the most autonomous or expensive option only when the task justifies it. Ambiguous tasks plus powerful agents create avoidable review risk.

> **Note**: Usage and diagnostics surfaces differ across clients. In practice, teach attendees to look in the IDE usage view or status bar first, then output logs or billing dashboards when they need deeper troubleshooting.

### 🖥️ Demo: Compare Models, Inspect Costs, and Show the Path to Customization

- Ask the same repository question with two different models:

  ```text
  Explain how this project is structured for a new developer. Organize the answer as entry points, core services, and tests.
  ```

- Compare the outputs for:
  - Level of detail
  - Clarity of structure
  - Actionability
  - Latency
- Open the relevant output or diagnostic view and point out where model selection and usage-related details can be inspected.
- Show a sample custom agent file and explain how it differs from repository instructions:
  - Instructions shape **all** interactions
  - A custom agent shapes a **specialized workflow**
- Show a sample `.github/workflows/copilot-setup-steps.yml` and explain how repository onboarding reduces unforced errors for both humans and agents.

### Discussion Points

- What tasks in attendees' environment deserve a stronger model, and what tasks do not?
- When is a custom agent worth creating instead of relying on generic Agent mode plus good prompts?
- Which token-saving habits would improve both cost and answer quality for their teams?
- How should teams decide when higher autonomy is appropriate versus when they should stay in Ask mode or use a focused inline edit workflow?

---

## 5. Wrap-Up, Hand-Off to Lab, and Q&A (5 min)

### Key Points

- Module 1 is about **control surfaces**:

  | Control Surface | Question It Answers |
  |-----------------|---------------------|
  | **Mode** | "What kind of help do I need right now?" |
  | **Context** | "What should the model see?" |
  | **Instructions** | "What rules should stay stable?" |
  | **Model / agent choice** | "What level of capability and autonomy is appropriate?" |

- Agents, skills, and reusable prompts are additional control surfaces for repeatable work: they let teams package intent, tool access, and preferred output shape instead of re-explaining the same task every time.
- The hands-on lab should reinforce practice, not replace explanation. Attendees should leave the lecture portion with a clear decision framework, then use the lab to build muscle memory.
- The cleanest end-of-module summary is:

```
Better outputs come from better scope, better context, better instructions,
better model choice, and better customization of agents and prompts.
```

### 🖥️ Demo: Transition from Concepts to Practice

- Revisit one live prompt from earlier in the session and summarize what improved it:
  - Better mode selection
  - Better prompt structure
  - Better scoped context
  - Better model choice
  - Better agent or prompt customization
- Point attendees to the hands-on lab as the place to practice:
  - Chat surfaces, chat variables, and slash commands
  - Copilot CLI prompt workflows
  - Repository and file-scoped instructions
  - Model comparisons
  - Custom agents and reusable prompts
  - Token-aware workflow habits

### Discussion Points

- What is the single most useful workflow change attendees will try immediately after this module?
- Which team-level standards should be captured in instructions, agents, reusable prompts, or setup steps first?
- Where do attendees still feel uncertainty: trust, privacy, model choice, or token cost?

*Workshop guide for Module 1: Foundations — Copilot Developer Training*
