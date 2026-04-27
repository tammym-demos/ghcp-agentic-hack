# GitHub Copilot Developer Training — Foundations

**Duration**: ~3 hours 15 minutes (195 min)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers starting with GitHub Copilot and AI-assisted development  
**Focus**: Copilot chat interface, context management, model selection, and token mechanics  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

> **Part of the Copilot Developer Training curriculum** ([Foundations](../copilot-dev-foundations/copilot-dev-foundations-workshop.md) · [Agentic Patterns](../copilot-dev-agentic/copilot-dev-agentic-workshop.md) · [Advanced Topics](../copilot-dev-advanced/copilot-dev-advanced-workshop.md)). This module can be delivered standalone.

---

## Workshop Overview

This module covers the foundational skills every developer needs to use GitHub Copilot effectively. Starting with a tour of the chat interface and progressing through context management, memory, and model selection, attendees build a solid understanding of how Copilot works under the hood — and how to make it work better for their teams.

### Learning Objectives

- Navigate Copilot's chat interface: inline completions, slash commands, `@` participants, and `#` context variables
- Manage multi-session workflows and know when to start fresh
- Create repository, workspace, and file-targeted instructions that encode team standards
- Understand context window mechanics: composition, priority, and truncation
- Compare available models and select the right one for each task
- Build custom agents with specific instructions and tools
- Monitor and manage token consumption effectively

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
| **Session 1** | **Copilot Chat Tour** | **60 min** |
| 1.1 | [Opening & AI Safety: "AI as Partner, Not Replacement"](#11-opening--ai-safety-ai-as-partner-not-replacement-10-min) | 10 min |
| 1.2 | [Inline Completions](#12-inline-completions-10-min) | 10 min |
| 1.3 | [Chat Interface & Slash Commands](#13-chat-interface--slash-commands-10-min) | 10 min |
| 1.4 | [Context: @ Participants & # Variables](#14-context--participants---variables-15-min) | 15 min |
| 1.5 | [Multi-Session Management](#15-multi-session-management-10-min) | 10 min |
| 1.6 | [Session 1 Summary & Discussion](#16-session-1-summary--discussion-5-min) | 5 min |
| | ☕ Break | 10 min |
| **Session 2** | **Memory & Context** | **60 min** |
| 2.1 | [Opening & AI Safety: "What Gets Shared?"](#21-opening--ai-safety-what-gets-shared-5-min) | 5 min |
| 2.2 | [Context Window Fundamentals](#22-context-window-fundamentals-10-min) | 10 min |
| 2.3 | [Repository-Level Instructions](#23-repository-level-instructions-15-min) | 15 min |
| 2.4 | [Instruction Layering](#24-instruction-layering-10-min) | 10 min |
| 2.5 | [Context Quality & Prompt Crafting](#25-context-quality--prompt-crafting-15-min) | 15 min |
| 2.6 | [Session 2 Summary & Discussion](#26-session-2-summary--discussion-5-min) | 5 min |
| | ☕ Break | 10 min |
| **Session 3** | **Models, Agents & Token Management** | **75 min** |
| 3.1 | [Opening & AI Safety: "Model Selection — Capability vs. Risk"](#31-opening--ai-safety-model-selection--capability-vs-risk-5-min) | 5 min |
| 3.2 | [Model Landscape](#32-model-landscape-15-min) | 15 min |
| 3.3 | [Token Mechanics](#33-token-mechanics-15-min) | 15 min |
| 3.4 | [Built-in vs Custom Agents](#34-built-in-vs-custom-agents-15-min) | 15 min |
| 3.5 | [Token Management & Budgeting](#35-token-management--budgeting-15-min) | 15 min |
| 3.6 | [copilot-setup-steps.yml & Summary](#36-copilot-setup-stepsyml--summary-10-min) | 10 min |

**Total: ~195 min (~3h 15min) including breaks**

---

## 1.1. Opening & AI Safety: "AI as Partner, Not Replacement" (10 min)

### Key Points

- AI-assisted development is a partnership — Copilot suggests, you decide
- Every session in this curriculum opens with an AI safety and human-machine partnership discussion
- The goal is not to replace developer judgment but to amplify it
- **Critical principle**: AI output requires human review. Copilot is a junior developer with infinite energy — fast but sometimes confidently wrong

### Discussion Prompt

> 💡 **Think about this**: When should you trust AI suggestions vs. verify them? Where is the line between productive acceleration and dangerous over-reliance?

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Human-in-the-loop** | Every AI suggestion should pass through human judgment before shipping |
| **Trust calibration** | Trust level should match task risk — low risk = more trust, high risk = more verification |
| **Augmentation mindset** | AI handles the routine; you handle the creative and critical |
| **Feedback loop** | When AI is wrong, correcting it makes the next interaction better |

### Discussion Points

- What types of code would you let Copilot write without close review?
- Where would you draw the line on AI autonomy in your current projects?
- How does your team currently handle code review — and how might AI fit in?

---

## 1.2. Inline Completions (10 min)

### Key Points

- Ghost text appears as you type — grey suggestions inline with your code
- **Tab** to accept the full suggestion, **Esc** to dismiss
- **Ctrl+Right** (Windows) / **Cmd+Right** (Mac) for partial/word-by-word accept
- Copilot uses the current file, open tabs, and recent edits as context
- Completions work best with clear variable names and descriptive comments

### Completion Strategies

| Strategy | Technique |
|----------|-----------|
| **Comment-driven** | Write a descriptive comment, then let Copilot complete the code |
| **Signature-first** | Write the function signature with typed parameters — Copilot infers the body |
| **Test-driven** | Write test names/assertions — Copilot generates the implementation |
| **Pattern continuation** | Start a pattern (e.g., first array element), Copilot continues it |

### 🖥️ Demo: Inline Completions in Action

1. Open a TypeScript file in the OctoCAT Supply repo
2. Write a comment: `// Validate that the order total matches the sum of line items`
3. Show the ghost text appearing — accept with Tab
4. Write a function signature: `function calculateDiscount(price: number, quantity: number): number`
5. Show Copilot completing the body
6. Demonstrate partial accept with Ctrl+Right

### Discussion Points

- How do completions compare to traditional code snippets or IntelliSense?
- What patterns have you found that trigger the best completions?
- When do completions get in the way?

---

## 1.3. Chat Interface & Slash Commands (10 min)

### Key Points

- Three ways to interact with Copilot chat: **Chat panel** (sidebar), **Inline chat** (`Ctrl+I`), **Quick chat** (`Ctrl+Shift+I`)
- Each has a different use case — panel for conversation, inline for targeted edits, quick for fast questions
- Slash commands are shortcuts that set the interaction mode

### Slash Commands Reference

| Command | Purpose | Example Use |
|---------|---------|-------------|
| `/explain` | Explain selected code | Understanding unfamiliar code |
| `/fix` | Fix errors in selected code | Quick bug fixes |
| `/tests` | Generate tests for selection | Adding test coverage |
| `/doc` | Generate documentation | Adding JSDoc/docstrings |
| `/new` | Create a new file or project | Scaffolding |
| `/clear` | Clear conversation history | Starting fresh |

### 🖥️ Demo: Slash Commands Walkthrough

1. Select a complex function in the API routes → run `/explain`
2. Introduce a deliberate bug → run `/fix` → show the correction
3. Select a utility function → run `/tests` → show generated test cases
4. Run `/doc` on an undocumented function → show the generated JSDoc

### Discussion Points

- Which slash command do you think you'll use most in daily work?
- How do inline chat and panel chat differ in your workflow?
- What tasks are better suited to slash commands vs. natural language prompts?

---

## 1.4. Context: @ Participants & # Variables (15 min)

### Key Points

- **`@` Participants** route your question to a specialized handler with domain knowledge
- **`#` Variables** attach specific context to your prompt — files, selections, editors
- Combining both gives Copilot precise context instead of guessing

### @ Participants

| Participant | Domain | What It Knows |
|-------------|--------|---------------|
| `@workspace` | Your codebase | Project structure, file contents, dependencies |
| `@vscode` | VS Code editor | Settings, extensions, keybindings, editor state |
| `@terminal` | Terminal output | Recent command results, error messages |

### # Context Variables

| Variable | Attaches | When to Use |
|----------|----------|-------------|
| `#file` | A specific file's contents | "Look at this file specifically" |
| `#selection` | Current text selection | "Focus on this code block" |
| `#editor` | Currently active editor | "Consider what I'm looking at" |
| `#codebase` | Full project search | "Search the whole repo for relevant code" |

### Context Composition

When you type `@workspace #file:api/routes.ts "add error handling"`, Copilot assembles:

1. System prompt + your repository instructions
2. The `@workspace` handler's project knowledge
3. The specific file content from `#file`
4. Your natural language question
5. Recent conversation history

### 🖥️ Demo: Precise Context Targeting

1. Ask a vague question: "How does authentication work?" — note the generic response
2. Ask with context: `@workspace #file:api/middleware/auth.ts How does authentication work?` — note the precise response
3. Show `@terminal` after a failed build — Copilot reads the error output
4. Demonstrate `#selection` for inline code questions

### Discussion Points

- How does explicitly providing context change the quality of responses?
- When would you use `#codebase` vs. `#file`?
- What information does `@workspace` have access to that you might not expect?

---

## 1.5. Multi-Session Management (10 min)

### Key Points

- Each chat session maintains its own conversation history and context
- Long sessions accumulate context — which can help (continuity) or hurt (noise)
- Create new sessions for unrelated tasks to avoid context pollution
- Session history contributes to the context window — old messages can push out relevant code context

### Session Strategy

| Scenario | Recommendation |
|----------|----------------|
| Related follow-up questions | Continue the current session |
| New feature or bug in a different area | Start a new session |
| Session is giving confused responses | Clear with `/clear` or start fresh |
| Exploring vs. implementing | Use separate sessions — explore in one, build in another |
| Context window is full | Start a new session to reclaim space |

### 🖥️ Demo: Session Management

1. Show creating a new chat session
2. Demonstrate switching between sessions
3. Show how old context accumulates — ask the same question at the start vs. after 20 messages

### Discussion Points

- How many chat sessions do you typically have open?
- When do you notice session quality degrading?
- What's your strategy for organizing sessions by task?

---

## 1.6. Session 1 Summary & Discussion (5 min)

### Key Takeaways

- Copilot has multiple interaction surfaces: completions, chat panel, inline chat, quick chat
- Slash commands are shortcuts for common tasks
- `@` participants and `#` variables give you precise context control
- Session management prevents context pollution and improves response quality

### Discussion Points

- What was the most surprising capability you saw in Session 1?
- How would you introduce these features to a teammate who hasn't used Copilot?
- Which interaction mode (completions, chat, inline) do you think fits your workflow best?

---

## ☕ Break — 10 Minutes

---

## 2.1. Opening & AI Safety: "What Gets Shared?" (5 min)

### Key Points

- Copilot processes your code context to generate suggestions — understanding what data flows where is critical
- **Copilot Business/Enterprise**: Prompts and suggestions are NOT retained by GitHub or used for model training
- **Copilot Individual/Pro**: By default, prompts may be used to improve the model (opt-out available)
- Content exclusions allow organizations to prevent specific files/repos from being used as context
- **Telemetry vs. context**: Usage telemetry (feature usage, acceptance rates) is separate from code context

### Data Flow

| Data Type | Sent to GitHub? | Retained? | Used for Training? |
|-----------|----------------|-----------|-------------------|
| **Code context** (open files, selections) | Yes (for suggestions) | No (Business/Enterprise) | No (Business/Enterprise) |
| **Chat messages** | Yes (for responses) | No (Business/Enterprise) | No (Business/Enterprise) |
| **Usage telemetry** | Yes | Yes | No (aggregated only) |
| **Content exclusions** | Never sent | N/A | N/A |

### Discussion Points

- Does your organization have specific data residency requirements?
- Which files in your repos would you want excluded from Copilot context?
- How does this compare to other AI tools your team might be using?

---

## 2.2. Context Window Fundamentals (10 min)

### Key Points

- The context window is the total amount of text the model can process in one interaction
- Everything competes for space: system prompt, instructions, conversation history, code context, and the model's output
- When the window fills, older content gets truncated — the model literally forgets earlier parts of the conversation
- Different models have different window sizes (8K to 200K+ tokens)

### Context Window Composition

In a typical Copilot chat interaction, the context window is assembled in this priority order:

1. **System prompt** — Copilot's base instructions (always included, you can't change this)
2. **Repository instructions** — `.github/copilot-instructions.md` (always included if present)
3. **File-targeted instructions** — `.github/instructions/*.instructions.md` (if matching files are active)
4. **Attached context** — `#file`, `#selection`, `@workspace` results
5. **Conversation history** — recent messages in the current session
6. **Active editor content** — the file you're currently viewing

### Truncation Priority

When the window fills, items are removed in roughly this order (most expendable first):

1. Old conversation messages (earliest turns dropped)
2. Distant file content (files not directly referenced)
3. Large attached files (trimmed to fit)
4. Active editor content is prioritized
5. Instructions and system prompt are preserved longest

### Discussion Points

- Have you noticed Copilot "forgetting" things during long sessions? Now you know why
- How does knowing the priority order change how you structure prompts?

---

## 2.3. Repository-Level Instructions (15 min)

### Key Points

- `.github/copilot-instructions.md` is loaded into **every** Copilot interaction in the repository
- This is your team's "always-on" configuration — coding standards, naming conventions, framework preferences
- Keep it concise — every token spent here reduces space for code context
- Write rules as clear, actionable directives — not vague guidelines

### Example: copilot-instructions.md

```markdown
# Copilot Instructions

## Coding Standards
- Use TypeScript strict mode for all new files
- Prefer `const` over `let`; never use `var`
- Use named exports, not default exports
- All functions must have JSDoc comments with @param and @return tags

## Testing
- Use Vitest for all unit tests
- Test files go in `__tests__/` directories alongside source files
- Minimum one test per exported function

## Architecture
- API routes follow REST conventions: GET /resources, POST /resources, GET /resources/:id
- Use Express middleware for cross-cutting concerns (auth, logging, validation)
- Database queries go in `/api/services/`, not in route handlers
```

### 🖥️ Demo: Creating copilot-instructions.md

1. Create `.github/copilot-instructions.md` in the OctoCAT Supply repo
2. Add coding standards specific to the project
3. Ask Copilot to generate a new API endpoint — observe it following the instructions
4. Modify an instruction (e.g., change test framework from Vitest to Jest) — regenerate and compare

### Discussion Points

- What coding standards would you put in your team's copilot-instructions.md?
- How do you balance comprehensive instructions vs. context window cost?
- Who should own and maintain this file in your organization?

---

## 2.4. Instruction Layering (10 min)

### Key Points

- Instructions can be set at multiple levels — each has a different scope and priority
- This creates a layering system: general rules at the top, specific overrides at the bottom

### Instruction Layers

| Layer | Location | Scope | When Loaded |
|-------|----------|-------|-------------|
| **User** | VS Code `settings.json` → `github.copilot.chat.codeGeneration.instructions` | All repos for this user | Always |
| **Workspace** | `.vscode/settings.json` → `github.copilot.chat.codeGeneration.instructions` | This workspace | Always (overrides user) |
| **Repository** | `.github/copilot-instructions.md` | This repo (all users) | Always |
| **File-targeted** | `.github/instructions/*.instructions.md` with `applyTo` frontmatter | Matching files only | When matching files are active |

### File-Targeted Instructions

File-targeted instructions have YAML frontmatter with an `applyTo` glob pattern:

```yaml
---
applyTo: "**/*.test.ts"
---
# Test File Instructions
- Use Vitest `describe` / `it` / `expect` pattern
- Mock external dependencies with `vi.mock()`
- Each test file should test one module only
```

### 🖥️ Demo: Layered Instructions

1. Show user-level instructions in VS Code settings
2. Create `.github/instructions/tests.instructions.md` with `applyTo: "**/*.test.*"`
3. Create `.github/instructions/api.instructions.md` with `applyTo: "api/**/*.ts"`
4. Open a test file — ask Copilot to generate tests — observe test-specific instructions applied
5. Open an API route file — ask Copilot to add a feature — observe API-specific instructions applied

### Discussion Points

- How would you split instructions between repo-wide and file-targeted?
- What file patterns in your project would benefit from targeted instructions?
- How do you handle instruction conflicts between layers?

---

## 2.5. Context Quality & Prompt Crafting (15 min)

### Key Points

- The quality of Copilot's output is directly proportional to the quality of context you provide
- Vague prompts produce vague code; precise prompts produce precise code
- Explicit file references (`#file`) beat implicit context every time
- Structure your prompts: what you want → where it should go → constraints → examples

### Effective Prompt Patterns

| Pattern | Example |
|---------|---------|
| **Specific reference** | `@workspace #file:api/routes/orders.ts Add input validation to the POST handler` |
| **Constraint-driven** | `Generate a function that handles pagination — max 100 items per page, cursor-based, no offset` |
| **Example-guided** | `Create a service like #file:api/services/products.ts but for the Suppliers entity` |
| **Negative constraint** | `Refactor this without using any third-party libraries` |

### Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| **"Make it better"** | Too vague — Copilot guesses what "better" means | Specify dimensions: faster, more readable, fewer allocations |
| **Wall of context** | Attaching 10 files overwhelms the context window | Attach only the 1-2 files directly relevant |
| **Ignoring truncation** | Long conversations lose early context | Start fresh sessions for new tasks |
| **No constraints** | Copilot picks arbitrary patterns | State your framework, style, and architecture preferences |

### 🖥️ Demo: Context Quality Comparison

1. Ask without context: "Create a new API endpoint for suppliers"
2. Ask with context: `@workspace #file:api/routes/products.ts #file:api/services/products.ts Create a new API endpoint for suppliers following the same pattern`
3. Compare the two outputs side-by-side — precision, accuracy, adherence to project patterns

### Discussion Points

- What's the minimum context you need for a good response?
- How do you know when you've provided too much context?
- What prompt patterns have worked well for your specific tech stack?

---

## 2.6. Session 2 Summary & Discussion (5 min)

### Key Takeaways

- The context window is finite — everything competes for space
- `.github/copilot-instructions.md` is your team's always-on configuration
- Instruction layering (user → workspace → repo → file-targeted) gives you precise control
- Quality prompts with explicit references beat vague questions every time

### Discussion Points

- How would you structure instructions for your team's primary repository?
- What's the biggest "context quality" improvement you can make immediately?
- How do file-targeted instructions change your approach to project-specific patterns?

---

## ☕ Break — 10 Minutes

---

## 3.1. Opening & AI Safety: "Model Selection — Capability vs. Risk" (5 min)

### Key Points

- Different models have different strengths, costs, and risk profiles
- More capable models aren't always better — they may be slower, more expensive, or overkill for the task
- Model selection should be intentional: match the model to the task complexity
- Some models are better at reasoning, others at speed, others at following instructions precisely

### Discussion Points

- Has your team experimented with switching models? What did you notice?
- How do you balance speed vs. quality in your daily work?

---

## 3.2. Model Landscape (15 min)

### Key Points

- Copilot supports multiple models — you can switch between them in VS Code
- Each model has different characteristics: context window size, speed, reasoning depth, and cost tier

### Model Comparison

| Model | Speed | Reasoning | Context Window | Best For |
|-------|-------|-----------|----------------|----------|
| **GPT-4o** | Fast | Strong | 128K tokens | General-purpose coding, good balance |
| **GPT-4.1** | Fast | Very strong | 1M tokens | Large codebase work, complex multi-file tasks |
| **Claude Sonnet** | Fast | Strong | 200K tokens | Nuanced code review, detailed explanations |
| **Claude Opus** | Slower | Excellent | 200K tokens | Complex architecture, deep reasoning tasks |
| **Gemini** | Fast | Good | 1M+ tokens | Very large context tasks |
| **o1 / o3-mini** | Slower | Exceptional | 200K tokens | Complex algorithmic problems, mathematical reasoning |

> **Note**: Model availability depends on your Copilot license tier and organization settings. Models are updated frequently — check GitHub documentation for the latest list.

### Model Strengths Matrix

| Task Type | Recommended Model | Why |
|-----------|-------------------|-----|
| Quick completions & chat | GPT-4o | Fast, good enough for most tasks |
| Multi-file refactoring | GPT-4.1 or Claude Sonnet | Large context + strong reasoning |
| Architecture decisions | Claude Opus or o3 | Deep reasoning, nuanced analysis |
| Code review | Claude Sonnet | Detailed, catches subtle issues |
| Algorithm design | o1 / o3-mini | Exceptional at step-by-step reasoning |

### 🖥️ Demo: Model Switching

1. Open VS Code chat — show the model picker dropdown
2. Ask the same question to GPT-4o and Claude Sonnet — compare response style and speed
3. Give a complex reasoning task to o3-mini — show the "thinking" time vs. output quality
4. Discuss when the speed-quality trade-off matters

### Discussion Points

- Which model do you currently use? Have you tried switching?
- For your team's typical tasks, which model seems like the best default?
- When would you deliberately choose a slower, more capable model?

---

## 3.3. Token Mechanics (15 min)

### Key Points

- A **token** is the basic unit the model processes — roughly 4 characters in English, varies for code
- **Input tokens**: everything you send (system prompt + instructions + context + your message)
- **Output tokens**: what the model generates in response — these cost more
- The context window is measured in tokens, not characters or lines

### Token Fundamentals

| Concept | Details |
|---------|---------|
| **1 token ≈** | ~4 English characters, ~¾ of a word |
| **Code tokenization** | Varies by language — Python is more token-efficient than Java |
| **Input cost** | Lower per token — you're sending context |
| **Output cost** | Higher per token — the model is generating |
| **Context window** | Maximum input + output tokens combined |

### Where Tokens Go in a Copilot Interaction

```
┌─────────────────────────────────────────────────────┐
│                 Context Window (128K)                │
├─────────────────────────────────────────────────────┤
│ System Prompt                              ~2K      │
│ Repository Instructions                    ~1K      │
│ File-Targeted Instructions                 ~0.5K    │
│ @workspace / #file Context                 ~10-50K  │
│ Conversation History                       ~5-20K   │
│ Your Current Message                       ~0.5K    │
│ ─────────────────────────────────────────────────── │
│ Model Output (generated)                   ~1-4K    │
│ ─────────────────────────────────────────────────── │
│ Remaining / Unused                         varies   │
└─────────────────────────────────────────────────────┘
```

### Token Usage Visibility

- **VS Code**: Enable chat debug mode (`github.copilot.chat.debugMode`) to see token counts per interaction
- **GitHub Dashboard**: Organization admins can view Copilot usage at <https://github.com/organizations/YOUR-ORG/settings/copilot/usage>
- **Premium requests**: Some models (o1, Claude Opus) consume premium request allocation

### 🖥️ Demo: Token Visibility

1. Enable `github.copilot.chat.debugMode` in VS Code settings
2. Send a chat message — show the debug output with token counts
3. Send the same message with a large `#file` attachment — show the token count increase
4. Show the GitHub org usage dashboard (screenshot or live)

### Discussion Points

- How does token awareness change how you structure prompts?
- What's the cost impact of always-on repository instructions that are 500 tokens vs. 50 tokens?
- How would you monitor token usage across a team?

---

## 3.4. Built-in vs Custom Agents (15 min)

### Key Points

- **Built-in agents** (`@workspace`, `@vscode`, `@terminal`) are provided by Copilot with specialized domain knowledge
- **Custom agents** are defined in `.github/agents/*.md` files — you create personas with specific instructions, tools, and model preferences
- Custom agents appear in the chat mode picker alongside Ask/Agent/Plan

### Built-in Agent Capabilities

| Agent | What It Accesses | Use Case |
|-------|-----------------|----------|
| `@workspace` | File tree, file contents, symbols, dependencies | Project-wide questions, cross-file understanding |
| `@vscode` | Settings, extensions, keybindings, themes | Editor configuration, extension questions |
| `@terminal` | Recent terminal output, command history | Build errors, test failures, runtime issues |

### Custom Agent Anatomy

```yaml
---
description: "Reviews code for security vulnerabilities and suggests fixes"
tools:
  - codebase
  - githubRepo
  - fetch
model: claude-sonnet-4
---
# Security Reviewer Agent

You are a security-focused code reviewer. When asked to review code:

1. Check for OWASP Top 10 vulnerabilities
2. Identify injection risks (SQL, XSS, command injection)
3. Verify input validation and sanitization
4. Check authentication and authorization patterns
5. Flag hardcoded secrets or credentials

Always explain WHY something is a risk and provide a corrected code example.
```

### Prompt Decision Flowchart

| Question | If Yes → | If No → |
|----------|----------|---------|
| Quick question, no code changes? | **Ask mode** | ↓ |
| Need a plan before coding? | **Plan mode** | ↓ |
| Need code changes to files? | **Agent mode** | ↓ |
| Need a specialized persona? | **Custom agent** | Use Agent mode |

### 🖥️ Demo: Creating a Custom Agent

1. Create `.github/agents/reviewer.md` with security review instructions
2. Open the chat mode picker — show the new agent appearing
3. Select the agent — ask it to review an API route
4. Compare the response to asking the same question in default Agent mode

### Discussion Points

- What specialized agents would be most useful for your team?
- How do you decide between custom instructions and a custom agent?
- What tools would you give your custom agents access to?

---

## 3.5. Token Management & Budgeting (15 min)

### Key Points

- Token management isn't just about cost — it's about response quality
- Bloated context = diluted attention = worse responses
- Strategies: context pruning, focused prompts, model selection, instruction optimization

### Token Management Strategies

| Strategy | Technique | Impact |
|----------|-----------|--------|
| **Prune instructions** | Keep `copilot-instructions.md` under 100 lines | Frees ~500-1000 tokens per interaction |
| **Use file-targeted instructions** | Move file-specific rules to `applyTo` files | Only loads when relevant |
| **Start fresh sessions** | New session for new tasks | Eliminates accumulated history |
| **Choose the right model** | GPT-4o for simple tasks, Opus for complex | Matches cost to task complexity |
| **Be specific** | Reference exact files instead of `#codebase` | Reduces irrelevant context |

### Premium Request Tracking

| Model Tier | Premium Multiplier | Best Used For |
|------------|-------------------|---------------|
| **Base** (GPT-4o) | 1x | Daily coding tasks |
| **Mid** (Claude Sonnet) | 1x | Code review, explanations |
| **Premium** (Claude Opus, o1) | Higher multiplier | Complex architecture, deep reasoning |

> **Note**: Premium request limits and multipliers vary by plan tier. Check your organization's Copilot settings for current allocations.

### Monitoring Consumption

- **Individual**: VS Code debug mode shows per-interaction token usage
- **Organization**: GitHub admin dashboard shows team-wide consumption trends
- **Alerts**: Set up notifications when premium request usage approaches limits

### 🖥️ Demo: Token-Conscious Prompting

1. Show a bloated prompt (10 files attached, long conversation history) — note the token count
2. Refactor to a focused prompt (1 file, clear question) — note the dramatic difference
3. Show the premium request dashboard for an org
4. Demonstrate model switching for a simple task (GPT-4o) vs. complex task (Claude Opus)

### Discussion Points

- How would you implement a token budget for your team?
- What's the ROI calculation for premium model usage?
- How do you balance individual productivity vs. team-wide token consumption?

---

## 3.6. copilot-setup-steps.yml & Summary (10 min)

### Key Points

- `copilot-setup-steps.yml` defines the environment setup commands that run when Copilot's Coding Agent starts working on your repository
- Without it, the Coding Agent may not be able to build, test, or lint your project
- Think of it as a "first day onboarding script" for the AI developer

### Example: copilot-setup-steps.yml

```yaml
steps:
  - name: Install dependencies
    run: npm install
  - name: Build the project
    run: npm run build
  - name: Run linting
    run: npm run lint
  - name: Run tests
    run: npm test
```

### Key Takeaways — Module 1 Complete

| Session | Core Concept |
|---------|-------------|
| **Session 1** | Copilot has multiple interaction modes — completions, chat, inline, slash commands, context targeting |
| **Session 2** | Context is finite and layered — instructions, files, conversation all compete for space |
| **Session 3** | Models vary in capability and cost — match the model to the task; manage tokens intentionally |

### Discussion Points

- What's the first thing you'll set up in your own repository after this module?
- Which concept from today will have the biggest impact on your daily workflow?
- What questions do you still have about Copilot foundations?

---

*Workshop guide for GitHub Copilot Developer Training — Foundations (Module 1 of 3)*
