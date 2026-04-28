# GitHub Copilot: Zero to Agents Workshop

**Duration**: ~4 hours  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers with basic Copilot exposure (completions/chat)  
**Focus**: Copilot customization, agentic workflows, and cloud agents  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

---

## Workshop Overview

This session takes developers from casual Copilot usage to full agentic development. Starting with chat modes and progressing through customization layers—instructions, prompts, agents, skills, and MCP servers—attendees build a complete understanding of how to tailor Copilot to their teams and workflows. The session extends to the standalone GitHub Copilot CLI for a full agentic terminal experience and closes with fully autonomous cloud agents (Coding Agent + PR Review Agent).

### Learning Objectives

- Master Copilot's three chat modes: Ask, Agent, and Plan
- Create custom instructions that encode team standards and internal frameworks
- Build reusable prompt files and custom agents (chat modes) for repeatable workflows
- Author Agent Skills that Copilot auto-selects based on task relevance
- Extend Copilot with MCP servers for browser testing and GitHub integration
- Use the standalone GitHub Copilot CLI as an agentic terminal — interactive TUI, plan mode, file context, /review, and /delegate to Coding Agent
- Leverage cloud agents: Coding Agent for autonomous PR creation and Copilot Code Review for AI-powered PR reviews

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher |
| **npm** | Latest version recommended |
| **Git** | For cloning the demo repository |
| **GitHub Copilot CLI** | Install from [docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) — required for Section 8 |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | [Welcome, Objectives & Environment Setup](#1-welcome-objectives--environment-setup-20-min) | 20 min |
| 2 | [Copilot Chat Modes: Ask, Agent, Plan](#2-copilot-chat-modes-ask-agent-plan-25-min) | 25 min |
| 2b | [Slash Commands, @ Participants & # Context](#2b-slash-commands--participants---context-variables-10-min) | 10 min |
| 3 | [Custom Instructions](#3-custom-instructions-25-min) | 25 min |
| 4 | [Custom Prompt Files](#4-custom-prompt-files-25-min) | 25 min |
| 5 | [Agent Skills](#5-agent-skills-25-min) | 25 min |
| 6 | [Custom Agents (Chat Modes)](#6-custom-agents-chat-modes-25-min) | 25 min |
| 7 | [MCP Servers (Playwright + GitHub)](#7-mcp-servers-playwright--github-30-min) | 30 min |
| 8 | [GitHub Copilot CLI: The Agentic Terminal](#8-github-copilot-cli-the-agentic-terminal-30-min) | 30 min |
| 9 | [Cloud Agents: Coding Agent + PR Review Agent](#9-cloud-agents-coding-agent--pr-review-agent-20-min) | 20 min |
| 10 | [Wrap-Up, Customization Hierarchy Recap & Q&A](#10-wrap-up-customization-hierarchy-recap--qa-10-min) | 10 min |

**Total: ~245 min core (~4h 5min)**

---

## 1. Welcome, Objectives & Environment Setup (20 min)

### 🖥️ DEMO: The OctoCAT Supply App

1. Show the [GitHub repo](https://github.com/microsoft/GitHubCopilot_Customized) in the browser
2. Walk through the architecture: React 18+ frontend (Vite, Tailwind) + Express.js API (TypeScript, Swagger)
3. Show the ERD diagram in `api/ERD.png`
4. Point out the `.github/` directory structure — prompts, agents (no instructions yet, no skills yet — we'll build those)

<details>
<summary><h3>🧪 Hands-On: Environment Setup (10 min)</h3></summary>

**Step 1: Fork & Clone**

```bash
# Fork the repo via GitHub UI, then:
git clone https://github.com/<YOUR-USERNAME>/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
```

**Step 2: Install & Build**

```bash
npm install
npm run build
```

**Step 3: Start the Application**

```bash
npm run dev
```

**Step 4: Verify**

- API running at `http://localhost:3000` — open in browser, check Swagger docs
- Frontend running at `http://localhost:5137` — open in browser, click "Products"
- VS Code: Open Command Palette → type "Copilot" → verify extension is active

> **Codespaces Alternative**: If using Codespaces, ensure API port (3000) visibility is set to `public` to avoid CORS errors.

</details>

### Discussion Points

- Who has used Copilot Chat before? What modes have you tried?
- What's your biggest frustration with Copilot today? (Common answer: "It doesn't know our internal stuff" — tease Section 3)

---

## 2. Copilot Chat Modes: Ask, Agent, Plan (25 min)

### Key Points

- Copilot has three chat modes — each optimized for different tasks
- Most developers only use one or two — understanding all three unlocks the full value
- Modes are selected from the Copilot Chat mode picker (dropdown at the top)
- Agent mode also offers sub-types: Local, Background, and Cloud — controlling where and how the agent runs

### Mode Comparison

| Mode | Best For | Context | Output |
|------|----------|---------|--------|
| **Ask** | Exploring, learning, understanding code | Reads codebase, open files, `@workspace` | Text explanations, code snippets in chat |
| **Agent** | Building features, editing code, running commands | Full codebase, terminal, tools | Creates/edits files (single or multi-file), runs commands |
| **Plan** | Analyzing, planning, proposing changes | Reads codebase, images, context | Implementation plans and proposals (no file changes) |

### When to Use Each Mode — Decision Framework

| Need | Mode |
|------|------|
| "I need to understand something" | **Ask** |
| "I need to build/fix/change something" | **Agent** |
| "I need to plan before implementing" | **Plan** |

---

### 🖥️ DEMO: Ask Mode

1. Open Copilot Chat → select **Ask** mode
2. Enter:

```
Please give me details about the API of this project.
```

3. Show how Copilot references the architecture, Express routes, Swagger docs, and entity models
4. Enter:

```
Are there any core features missing in my project?
```

5. Show Copilot analyzing the codebase and identifying gaps

**Talking point**: "Ask mode is your read-only expert. It understands your entire codebase but doesn't change anything. Perfect for onboarding or exploring unfamiliar code."

### Agent Sub-Types

When you select Agent mode, a second picker lets you choose the agent type — controlling where and how the agent runs:

| Type | Where It Runs | Best For |
|------|---------------|----------|
| **Local** | Your IDE, interactive | Day-to-day coding, exploring, building features |
| **Background** | Your IDE, non-blocking | Longer tasks you want to run while continuing other work |
| **Cloud** | GitHub servers | Autonomous coding from GitHub Issues (see Section 9) |

> **Note**: Throughout this workshop, we primarily use the **Local** agent type. Section 9 covers the **Cloud** agent type (Coding Agent) in detail.

---

### 🖥️ DEMO: Plan Mode

1. Open Copilot Chat → select **Plan** mode
2. Enter:

```
I want to add input validation to the Product API POST endpoint. What's the best approach?
```

3. Show Copilot analyzing the codebase and proposing a detailed implementation plan:
   - Which files need to change
   - What validation library to use
   - Step-by-step approach
4. Show that Plan mode does NOT create or modify any files — it only proposes

**Talking point**: "Plan mode is your architect. It reads your codebase, analyzes the problem, and proposes a plan — without touching any code. We'll use this extensively when planning complex features."

---

### 🖥️ DEMO: Agent Mode

1. Switch to **Agent** mode
2. Enter:

```
Please build and run my project so that I can see its existing state.
```

3. Show Copilot:
   - Reading `package.json` and build configuration
   - Running `npm install` and `npm run dev` in the terminal
   - Verifying the application is running
4. Show the running app in the browser

**Talking point**: "Agent mode is your pair programmer. It can read files, write files, run terminal commands, and iterate until things work. It's the mode you'll use most in this workshop."

<details>
<summary><h3>🧪 Hands-On: Try All Three Modes (8 min)</h3></summary>

**Exercise 1 — Ask Mode**:

1. Open Copilot Chat → select **Ask** mode from the dropdown
2. Enter the following prompt:

```
What testing framework does this project use and what's the current test coverage?
```

3. Note the answer for later (we'll generate tests in Section 4)

**Exercise 2 — Plan Mode**:

1. Switch to **Plan** mode from the mode dropdown
2. Enter the following prompt:

```
How should I add comprehensive error handling to the API routes?
```

3. Review the plan Copilot proposes — note it doesn't change any files

**Exercise 3 — Agent Mode**:

1. If your app isn't running, switch to **Agent** mode and enter:

```
Build and run the project
```

2. Then enter:

```
Open the Swagger documentation page for the API
```

</details>

### Success Criteria

- ✅ You can switch between Ask, Agent, and Plan modes
- ✅ You've received a codebase-aware answer from Ask mode
- ✅ You've seen Plan mode propose changes without modifying files
- ✅ Agent mode has created or edited files and run terminal commands
- ✅ Your app is running (API on :3000, Frontend on :5137)

---

## 2b. Slash Commands, @ Participants & # Context Variables (10 min)

### Key Points

- **Slash commands** are shortcuts for common tasks — faster than typing a full prompt
- **`@` Participants** route your question to a specialized handler with domain knowledge
- **`#` Variables** attach specific context to your prompt — files, selections, editors
- Combining `@` + `#` gives Copilot precise context instead of guessing

### Slash Commands

| Command | Purpose |
|---------|---------|
| `/explain` | Explain selected code |
| `/fix` | Fix errors in selected code |
| `/tests` | Generate tests for selection |
| `/doc` | Generate documentation |
| `/new` | Create a new file or project |
| `/clear` | Clear conversation history |

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
| `#codebase` | Full project search | "Search the whole repo" |

### Combining @ + #

When you type `@workspace #file:api/routes/orders.ts "add error handling"`, Copilot assembles:

1. System prompt + your repository instructions
2. The `@workspace` handler's project knowledge
3. The specific file content from `#file`
4. Your natural language question

### 🖥️ DEMO: Slash Commands & Context Targeting

1. Select a function in the API routes → run `/explain` — show the explanation
2. Introduce a bug → run `/fix` — show the correction
3. Ask vaguely: "How does authentication work?" — note the generic response
4. Ask with context: `@workspace #file:api/middleware/auth.ts How does authentication work?` — note the precise response
5. Show `@terminal` after a failed build — Copilot reads the error output

**Talking point**: "Slash commands are shortcuts for the tasks you do every day. And `@` + `#` are your precision tools — instead of hoping Copilot finds the right file, you TELL it which file to look at."

---

## The Customization Roadmap

Now that you've seen the three chat modes, slash commands, and context targeting — let's look at what we're building for the rest of the workshop.

### Key Points

- Workshop narrative: "Zero → Customize → Extend → Agents"
- By the end, you'll have built a fully customized Copilot environment with instructions, prompts, agents, skills, and MCP integration
- Everything we build uses real files in the `.github/` directory — portable across your own repos

### The Customization Hierarchy

| Layer | File Location | When Loaded | Purpose |
|-------|---------------|-------------|--------|
| **Custom Instructions** | `.github/copilot-instructions.md` | Always (every interaction) | Simple rules, coding standards |
| **Scoped Instructions** | `.github/instructions/*.instructions.md` | When matching files are active | File/language-specific guidance |
| **Prompt Files** | `.github/prompts/*.prompt.md` | On-demand (user invokes) | Reusable task templates |
| **Agents / Chat Modes** | `.github/agents/*.agent.md` | User selects in chat mode picker | Persistent personas with tool chains |
| **Agent Skills** | `.github/skills/*/SKILL.md` | Auto-selected by relevance | Specialized task instructions |
| **MCP Servers** | `.vscode/mcp.json` | When server is running | External tool integration |

---

## 3. Custom Instructions (25 min)

### Key Points

- Custom instructions are the simplest way to personalize Copilot for your team
- They're loaded into EVERY Copilot interaction — invisible, always-on context
- Two types:
  - **Project-wide**: `.github/copilot-instructions.md` — applies to all interactions in the repo
  - **Scoped**: `.github/instructions/*.instructions.md` — applies only when matching files are active (uses glob patterns in YAML frontmatter)

### What Goes in Custom Instructions?

| Good Candidates | Bad Candidates |
|-----------------|----------------|
| Coding standards (naming, style) | Entire API documentation |
| Internal framework references | Step-by-step tutorials |
| Architecture patterns to follow | Complete code examples |
| Security requirements (no hardcoded creds) | Business logic rules |
| Testing conventions | Long prose explanations |

**Rule of thumb**: Keep it concise. Instructions are loaded on every interaction — they consume context window.

---

### 🖥️ DEMO: Generate Custom Instructions

1. Open Copilot Chat → click the **Gear** icon (⚙️) in the chat window
2. Select **"Generate Agent Instructions"**
3. Show Copilot analyzing the repo and generating a `copilot-instructions.md` file
4. Review the generated content — it should reference:
   - Repository info (OctoCAT Supply, TypeScript)
   - Architecture (React frontend, Express API)
   - Build instructions (`npm install && npm run build`)
   - Testing conventions (`vitest`)
5. Save the file to `.github/copilot-instructions.md`

**Talking point**: "Copilot just analyzed your entire repo and wrote its own instruction manual. This file will now be loaded into every interaction."

---

### 🖥️ DEMO: Create Scoped Instructions

1. Create `.github/instructions/API.instructions.md`:

```markdown
---
applyTo: "api/**"
---
# API Development Instructions

For REST APIs in this project:
- Use descriptive endpoint naming following REST conventions
- Add Swagger/OpenAPI docs for all API methods
- Implement proper error handling with appropriate HTTP status codes
- Follow the entity pattern established in existing routes
- Include input validation for all POST/PUT endpoints
```

2. Open a file in `api/src/routes/` (e.g., `product.ts`), then ask Copilot in **Ask** mode:

```
How should I add a new API endpoint to this project?
```

3. Show how the scoped instructions influence the response — Copilot should now reference Swagger docs, REST conventions, error handling patterns, and the entity model structure

**Talking point**: "Scoped instructions are like per-project `.editorconfig` for AI. They activate only when you're working in matching files."

---

### 🖥️ DEMO: The TAO Example (Internal Framework)

This is the power demo — teaching Copilot about a framework it has NEVER seen.

1. Show the fictional TAO framework documentation in `docs/tao.md`
2. Add to `.github/copilot-instructions.md`:

```markdown
## Observability Requirements
- Implement logging and monitoring using TAO (TypeScript API Observability)
- Reference: docs/tao.md
- Assume TAO is installed — never add the package
- Use @Measure, @Trace, and @Log decorators for all service methods
- Configure initTAO() in the application entry point
```

3. Switch to Agent mode and enter:

```
Add observability to the Supplier route using our internal standards
```

4. Show Copilot generating TAO import code (`import { Measure, Trace } from '@tao/core'`) — code that references a framework that doesn't exist publicly

**Talking point**: "This is the real magic. Copilot has never seen TAO — it doesn't exist anywhere on the internet. But because we told it about TAO in our custom instructions, it generates code using our internal framework. Imagine this for YOUR company's internal libraries."

> **Note**: The generated code won't compile because TAO is fictional. That's intentional — it demonstrates that custom instructions override Copilot's training data.

#### Cleanup: Revert TAO Changes with Copilot

Before moving on, we need to undo the TAO changes so the codebase compiles for the remaining exercises. This is also a chance to show that Copilot can clean up its own work.

1. Stay in **Agent** mode and enter:

```
Revert the TAO observability changes you just made to the Supplier route, and remove the "Observability Requirements" section from .github/copilot-instructions.md. The TAO framework is fictional and the code won't compile.
```

2. Verify Copilot:
   - Removes the TAO imports and decorators from the Supplier route file
   - Removes the `## Observability Requirements` block from `.github/copilot-instructions.md`
3. Confirm the app still compiles: check the terminal or run `npm run build`

**Talking point**: "Copilot can undo its own work just as easily as it creates it. In real projects, this is how you course-correct — tell Copilot what went wrong and let it fix it."

<details>
<summary><h3>🧪 Hands-On: Create Your Instructions (12 min)</h3></summary>

**Step 1: Establish a Baseline (Before Instructions)**

1. Open Copilot Chat in **Ask** mode
2. Ask the following question and note the response:

```
How should I add a new API endpoint to this project?
```

3. Pay attention to: Does Copilot mention Swagger? Does it reference existing patterns? Does it know about the project's entity model structure?

**Step 2: Generate Project-Wide Instructions**

1. Open Copilot Chat → click the **Gear** icon (⚙️) in the chat window
2. Select **"Generate Agent Instructions"**
3. Watch Copilot analyze the entire repo — it will scan the architecture, dependencies, build config, and conventions
4. Review the generated content. It should reference:
   - The project name and tech stack (TypeScript, React, Express)
   - Build commands (`npm install && npm run build`)
   - Testing framework (`vitest`)
   - Project structure and architecture patterns
5. Save the file to `.github/copilot-instructions.md`
6. Open the saved file and read through it — this is Copilot's understanding of your project

**Step 3: Create Scoped API Instructions**

Scoped instructions activate only when you're editing files that match a glob pattern. This lets you give Copilot different guidance for different parts of the codebase.

1. Create the directory: `.github/instructions/`
2. Create the file `.github/instructions/API.instructions.md` with the following content:

```markdown
---
applyTo: "api/**"
---
# API Development Instructions

For REST APIs in this project:
- Use descriptive endpoint naming following REST conventions
- Add Swagger/OpenAPI docs for all API methods
- Implement proper error handling with appropriate HTTP status codes
- Follow the entity pattern established in existing routes
- Include input validation for all POST/PUT endpoints
```

> **Note**: The `applyTo` field uses glob patterns. `api/**` means these instructions load whenever you have any file under the `api/` folder open.

**Step 3b: Test Scoped Instructions**

1. Open a file in `api/src/routes/` (e.g., `product.ts`)
2. In Copilot Chat (**Ask** mode), enter:

```
How should I add a new API endpoint to this project?
```

3. Notice how the response references Swagger docs, REST conventions, error handling patterns, and the entity model structure — these come from the scoped instructions you just created

**Step 4: Test the Difference (After Instructions)**

1. Open a file in `api/src/routes/` (e.g., `product.ts`)
2. In Copilot Chat (**Ask** mode), ask the same question from Step 1:

```
How should I add a new API endpoint to this project?
```

3. Compare the response to your baseline. You should notice:
   - More specific references to the project's patterns
   - Mentions of Swagger documentation
   - References to error handling conventions
   - Awareness of the entity model structure

**Step 5: Create a Frontend Scoped Instruction** (Bonus)

1. Create `.github/instructions/Frontend.instructions.md`:

```markdown
---
applyTo: "src/**"
---
# Frontend Development Instructions

For React components in this project:
- Use functional components with TypeScript
- Use Tailwind CSS for all styling — no inline styles or CSS modules
- Follow the existing component structure in src/components/
- Use React hooks for state management
- All components should be exported as default exports
```

2. Open a file in `src/` and ask Copilot about building a new component — observe the Tailwind and TypeScript guidance in the response

</details>

### Success Criteria

- ✅ `.github/copilot-instructions.md` exists in your repo
- ✅ `.github/instructions/API.instructions.md` exists with `applyTo: "api/**"`
- ✅ You've compared Copilot's responses before and after adding instructions and noticed the difference
- ✅ You understand that instructions are always-on background context

---

## 4. Custom Prompt Files (25 min)

### Key Points

- Prompt files are reusable task templates stored in `.github/prompts/`
- They have YAML frontmatter that configures mode, tools, and description
- Invoked via: Run button in the file, Command Palette → "Prompts: Run Prompt", or typing `/prompt-name` in chat
- Unlike instructions (always loaded), prompts are on-demand — you choose when to run them

### Anatomy of a Prompt File

```yaml
---
mode: 'agent'                    # Which mode to use (ask, agent, plan)
description: 'Description here'  # Shows in the prompt picker
tools: ['changes', 'codebase',   # Which tools the agent can use
  'editFiles', 'runCommands',
  'search', 'terminalLastCommand']
---

# Prompt Title

## Context
Describe what the prompt does and what context it needs.

## Requirements
List specific requirements, patterns, and constraints.

## Success Criteria
Define what "done" looks like.
```

---

### 🖥️ DEMO: Walk Through Existing Prompts

**Prompt 1: `Unit-Test-Coverage.prompt.md`** (Agent mode, test generation)

1. Open `.github/prompts/Unit-Test-Coverage.prompt.md`
2. Walk through the structure:
   - YAML frontmatter: `mode: 'agent'`, comprehensive tool list
   - Current state assessment (only 1 test file exists)
   - Specific test coverage requirements (CRUD operations, error scenarios)
   - Implementation guidelines (follow existing `branch.test.ts` pattern)
   - Success criteria with checkboxes
3. **Run the prompt**: Click the Run button at the top of the file
4. Show Agent mode activating, reading existing tests, generating new test files
5. Show self-healing: if tests fail, Copilot reads errors and fixes them

**Talking point**: "This prompt encapsulates everything a developer needs to know about our testing standards. Junior devs run this prompt and get senior-quality test coverage."

**Prompt 2: `plan.prompt.md`** (Planning mode, no code output)

1. Open `.github/prompts/plan.prompt.md`
2. Highlight key design decisions:
   - Architecture-aware planning (references `docs/architecture.md`)
   - Asks clarifying questions before proceeding
   - Explicitly says "DO NOT SHOW CODE CHANGES — only the overview"
   - Saves implementation plan as a Markdown file

**Talking point**: "Not every prompt should generate code. This one generates PLANS. It forces Copilot to think before coding."

**Prompt 3: `model.prompt.md`** (Model selection guidance)

1. Open `.github/prompts/model.prompt.md`
2. Show how it fetches live GitHub documentation
3. Generates a model comparison table with pros, cons, cost considerations
4. Provides opinionated recommendations for planning vs. implementation

**Talking point**: "Prompt files can reference external documentation via URLs. Copilot will fetch and incorporate live data."

<details>
<summary><h3>🧪 Hands-On: Create and Run Prompt Files (12 min)</h3></summary>

**Exercise 1 — Explore the Existing Prompts**

Before creating your own, look at what's already in the repo:

1. Open `.github/prompts/` in the file explorer
2. Open `Unit-Test-Coverage.prompt.md` and read through it:
   - Notice the YAML frontmatter — `mode: 'agent'` with a comprehensive tool list
   - Notice how it describes the current state ("only 1 test file exists")
   - Notice the detailed requirements — which entities to test, which patterns to follow
   - Notice the success criteria with checkboxes
3. Open `plan.prompt.md` and compare:
   - This one explicitly says "DO NOT SHOW CODE CHANGES — only the overview"
   - It forces Copilot to think before coding
   - It saves the plan as a Markdown file
4. Key takeaway: **Prompts can control not just what Copilot does, but how it thinks**

**Exercise 2 — Run an Existing Prompt**

1. Open `.github/prompts/Unit-Test-Coverage.prompt.md`
2. Click the ▶️ **Run** button at the top of the file
3. Watch Agent mode activate and observe Copilot:
   - Reading existing test files to understand patterns
   - Generating new test files for entities without tests
   - Running the tests to verify they pass
   - If tests fail, watch the self-healing: Copilot reads the errors and fixes them
4. Let it run for a couple minutes — you can stop it early if needed

**Exercise 3 — Create Your Own Prompt: Security Review**

1. Create a new file: `.github/prompts/security-review.prompt.md`
2. Add the following content:

```yaml
---
mode: 'agent'
description: 'Analyze the codebase for security vulnerabilities and suggest fixes'
tools: ['codebase', 'search', 'editFiles', 'changes']
---

# Security Review Prompt

## Objective
Analyze the current codebase for common security vulnerabilities.

## Check For
- Cross-site Scripting (XSS) vulnerabilities
- Command Injection risks
- Insecure CORS configuration
- Missing security headers
- Hardcoded credentials or secrets
- SQL/NoSQL injection vectors
- Insecure authentication implementation

## Output Format
For each vulnerability found:
1. **Location**: File and line number
2. **Severity**: Critical / High / Medium / Low
3. **Description**: What the vulnerability is
4. **Fix**: Suggested remediation with code changes

## Constraints
- Follow the project's coding standards from copilot-instructions.md
- Do not modify test files
- Create a summary report at the end
```

3. Run the prompt using any of the three methods (Run button, Command Palette, or `/` in chat)
4. Review the findings — Copilot will scan the codebase and report vulnerabilities

**Exercise 4 — Design Your Own Prompt** (Bonus)

Think about a repetitive task in your own work. Create a prompt for it. Ideas:

- **`code-review.prompt.md`** — reviews the current changes for best practices
- **`api-documentation.prompt.md`** — generates Swagger docs for undocumented endpoints
- **`refactor-suggestions.prompt.md`** — identifies code that could be simplified

Key tips for writing good prompts:

- Be specific about what "done" looks like (success criteria)
- Tell Copilot what NOT to do (constraints)
- Reference existing files as patterns to follow
- Choose the right `mode` — use `agent` for tasks that need to create/edit files, `ask` for analysis-only

</details>

### Success Criteria

- ✅ You've explored the existing prompt files and understand their structure
- ✅ You've run a prompt and watched Copilot execute a multi-step task
- ✅ You've created `security-review.prompt.md` and run it successfully
- ✅ You understand the three ways to invoke a prompt file

---

## 5. Agent Skills (25 min)

### Key Points

- Agent Skills are specialized instruction sets that Copilot auto-selects based on task relevance
- Stored in `.github/skills/<skill-name>/SKILL.md` (project) or `~/.copilot/skills/<skill-name>/SKILL.md` (personal)
- Unlike instructions (always loaded) and prompts (manually invoked), skills are **automatically loaded when Copilot determines they're relevant**
- Skills are an [open standard](https://github.com/agentskills/agentskills) — used by Copilot Coding Agent and Agent mode in VS Code

### Skills vs Instructions

| Aspect | Custom Instructions | Agent Skills |
|--------|-------------------|--------------|
| **Location** | `.github/copilot-instructions.md` | `.github/skills/*/SKILL.md` |
| **When loaded** | Always, every interaction | Only when relevant to the task |
| **Best for** | Simple, universal rules | Detailed, specialized procedures |
| **Can include** | Markdown text only | Markdown + scripts + resources |
| **Scope** | Project-wide or file-scoped | Project or personal |

**Rule of thumb**: Use instructions for "always true" rules. Use skills for "when doing X, follow these steps."

### Anatomy of a Skill

```
.github/skills/
└── api-route-creation/
    ├── SKILL.md              # Required — instructions + frontmatter
    ├── route-template.ts     # Optional — example files
    └── test-template.ts      # Optional — additional resources
```

```yaml
---
name: api-route-creation
description: Guide for creating new API routes in the Express.js backend.
  Use this when asked to add new endpoints or entities.
---

Follow this process when creating new API routes:

1. Create the entity model in `api/src/models/`
2. Create the route file in `api/src/routes/`
3. Follow the pattern from `api/src/routes/product.ts`
4. Register the route in `api/src/index.ts`
5. Add Swagger documentation annotations
6. Create tests in `api/src/routes/<entity>.test.ts`
```

### Skill Scope

| Type | Location | Available In | Shared |
|------|----------|--------------|--------|
| **Project** | `.github/skills/` | This repo only | With collaborators via git |
| **Personal** | `~/.copilot/skills/` | All your repos | Only on your machine |

> **Note**: `~` refers to your OS home directory — `C:\Users\<username>` on Windows, `/Users/<username>` on macOS, or `/home/<username>` on Linux.

---

### 🖥️ DEMO: Create a Skill from Scratch

1. Create the directory structure:

```bash
mkdir -p .github/skills/code-review-checklist
```

2. Create `.github/skills/code-review-checklist/SKILL.md`:

```yaml
---
name: code-review-checklist
description: Checklist for reviewing TypeScript and Express.js code.
  Use this when asked to review code, audit code quality, or check for
  security and performance issues.
---

When reviewing TypeScript or Express.js code, follow this checklist:

1. **Security**
   - Check for unsanitized user input in route handlers
   - Verify no hardcoded secrets, API keys, or credentials
   - Ensure proper authentication/authorization checks on protected routes
   - Look for SQL/NoSQL injection risks in database queries

2. **Input Validation**
   - Confirm all POST/PUT endpoints validate request body fields
   - Check for missing type guards on `req.params` and `req.query`
   - Verify appropriate HTTP status codes for validation failures (400, 422)

3. **Error Handling**
   - Ensure every route has try/catch with meaningful error responses
   - Check that errors are logged but sensitive details are not leaked to clients
   - Verify async errors are properly caught (no unhandled promise rejections)

4. **Performance**
   - Identify N+1 query patterns or unnecessary database calls
   - Check for missing pagination on list endpoints
   - Look for blocking synchronous operations in async handlers

5. **Maintainability**
   - Verify consistent naming conventions (camelCase for variables, PascalCase for types)
   - Check for DRY violations — duplicated logic that should be extracted
   - Ensure Swagger/OpenAPI annotations are present and accurate
```

3. Show how Copilot auto-selects the skill — Open a new chat and select Agent Mode, then enter:

```
Review the product route handler for security and performance issues
```

- Show the skill being loaded (Copilot will reference the checklist steps)

**Talking point**: "You didn't invoke the skill — Copilot chose it because your prompt matched the skill's description. This is the key difference from prompt files."

---

### 🖥️ DEMO: Reference External Skill Collections

Show attendees where to find community skills:

- [anthropics/skills](https://github.com/anthropics/skills) — Anthropic's reference skills
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — community-curated collection
- [skills.sh](https://skills.sh/) — searchable directory of agent skills
- [Microsoft Skills](https://microsoft.github.io/skills/) — Microsoft's skills collection

**Talking point**: "Skills are an open standard. You can use skills from the community or write your own."

<details>
<summary><h3>🧪 Hands-On: Create an Agent Skill (12 min)</h3></summary>

**Exercise 1 — Create an API Route Creation Skill**

1. Create the directory structure:

```bash
mkdir -p .github/skills/api-route-creation
```

2. Create `.github/skills/api-route-creation/SKILL.md` with the following content:

```yaml
---
name: api-route-creation
description: Guide for creating new API routes in the Express.js backend.
  Use this when asked to add new endpoints, entities, or REST resources.
---

Follow this process when creating new API routes:

1. **Create the entity model** in `api/src/models/`
   - Follow the TypeScript interface pattern from existing models
   - Include all required and optional fields with proper types

2. **Create the route file** in `api/src/routes/`
   - Follow the pattern from `api/src/routes/product.ts`
   - Implement full CRUD: GET (list), GET (by ID), POST, PUT, DELETE
   - Add proper error handling with try/catch and appropriate HTTP status codes

3. **Register the route** in `api/src/index.ts`
   - Import the new route module
   - Add it to the Express app with the correct base path

4. **Add Swagger documentation**
   - Add JSDoc annotations with @swagger tags on each endpoint
   - Include request/response schemas, parameters, and example values

5. **Create tests** in `api/src/routes/<entity>.test.ts`
   - Follow the pattern from existing test files
   - Test all CRUD operations and error scenarios
   - Use vitest as the test framework
```

**Exercise 2 — Test the Skill Auto-Selection**

The key difference between skills and prompts is that **you don't invoke skills manually** — Copilot selects them based on your prompt matching the skill's `description` field.

1. Switch to **Agent** mode in Copilot Chat
2. Enter a prompt that should trigger the skill:

```
I need to add a new "Warehouse" entity and API endpoints for managing warehouses. Each warehouse has a name, address, city, state, zipCode, and capacity.
```

3. Watch Copilot work — it should follow the steps from your skill: create the model, create the route, register it, add Swagger docs
4. Check whether the generated code follows the patterns you specified

**Exercise 3 — Create a Second Skill** (Bonus)

Create a `react-component-creation` skill:

```bash
mkdir -p .github/skills/react-component-creation
```

Create `.github/skills/react-component-creation/SKILL.md`:

```yaml
---
name: react-component-creation
description: Guide for creating new React components in the frontend.
  Use this when asked to add new pages, UI components, or frontend features.
---

Follow this process when creating new React components:

1. **Create the component file** in `src/components/` or `src/pages/`
   - Use functional components with TypeScript (.tsx)
   - Use Tailwind CSS for all styling — no inline styles or CSS modules
   - Export the component as the default export

2. **Add routing** (if it's a page)
   - Add the route to the router configuration
   - Add a navigation link if appropriate

3. **Connect to the API** (if needed)
   - Use fetch or the existing API utility for data fetching
   - Handle loading, error, and empty states
   - Add TypeScript interfaces for API response types

4. **Follow existing patterns**
   - Reference `src/pages/Products.tsx` for page structure
   - Reference `src/components/` for reusable component patterns
```

Test it by asking Copilot: `Create a Warehouses page that shows a list of all warehouses with their addresses`

</details>

### Personal Skills

You can also create **personal skills** that apply across all your repos:

- Location: `~/.copilot/skills/*/SKILL.md` (where `~` is your OS home directory — e.g., `C:\Users\<username>` on Windows, `/Users/<username>` on macOS)
- These are private to your machine — not shared via git
- Great for personal coding preferences or tools only you use

### Success Criteria

- ✅ You've created `.github/skills/api-route-creation/SKILL.md` with a complete step-by-step guide
- ✅ You've tested the skill by asking Copilot to create a new entity and observed it following your steps
- ✅ You understand the difference: instructions = always-on, skills = auto-selected, prompts = manually invoked

---

## 6. Custom Agents (Chat Modes) (25 min)

### Key Points

- Agents are persistent chat personas stored in `.github/agents/*.agent.md`
- They appear in the Copilot Chat mode picker alongside Ask, Agent, and Plan
- Each agent can specify its own model, tool set, and behavior
- Agents vs Prompts:

| Feature | Prompt Files | Custom Agents |
|---------|-------------|---------------|
| **Location** | `.github/prompts/` | `.github/agents/` |
| **Extension** | `.prompt.md` | `.agent.md` |
| **Invocation** | On-demand (Run button, `/name`) | Selected as active chat mode |
| **Persistence** | Single execution | Active for entire chat session |
| **Best for** | Specific tasks | Ongoing personas/workflows |

### Anatomy of an Agent File

```yaml
---
tools: ['codebase', 'search', 'editFiles', 'runCommands', 'problems']
description: Full-stack engineer for the OctoCAT Supply app
model: Claude Sonnet 4
---

Markdown body with the agent's instructions, persona, and behavior rules.
```

**Key fields**: `tools` (what the agent can access), `description` (shown in mode picker), `model` (optional — override the default model).

---

### 🖥️ DEMO: Part A — Meet the OctoCATEngineer Agent


**Note:** The OctoCATEngineer agent file is **not included** in your repo by default. You will need to create it yourself before you can use it in Copilot Chat.

1. **Create the agent file:**
   - In your repo, create a new file at `.github/agents/OctoCATEngineer.agent.md` with the following content:

   ```yaml
   ---
   tools: ['search/codebase', 'azure-mcp/search', 'edit/editFiles', 'execute/getTerminalOutput', 'execute/runInTerminal', 'read/terminalLastCommand', 'read/terminalSelection', 'read/problems']
   description: Full-stack engineer for the OctoCAT Supply app
   ---

   You are a senior full-stack TypeScript engineer working on the OctoCAT Supply application — a supply chain management web app with a React 18+ frontend (Vite, Tailwind CSS) and an Express.js API backend (TypeScript, OpenAPI/Swagger).

   ## Your Approach

   - Read existing code patterns before making changes — follow the conventions already established in the project
   - Use TypeScript with strict typing for all new code
   - Follow REST conventions for API endpoints
   - Add Swagger/OpenAPI documentation annotations for any new or modified API routes
   - Use Tailwind CSS for all frontend styling — no inline styles or CSS modules
   - Use functional React components with hooks

   ## Backend Conventions

   - Entity models go in `api/src/models/`
   - Route handlers go in `api/src/routes/`
   - Follow the pattern established in `api/src/routes/product.ts` for new routes
   - Register new routes in `api/src/index.ts`
   - Use proper error handling with try/catch and appropriate HTTP status codes
   - Include input validation for all POST/PUT endpoints

   ## Frontend Conventions

   - Pages go in `src/pages/`
   - Reusable components go in `src/components/`
   - Follow the component structure in existing pages like `src/pages/Products.tsx`
   - Use React Router for navigation
   - Handle loading, error, and empty states in all data-fetching components

   ## Testing

   - Use vitest as the test framework
   - Follow patterns from existing test files
   - Run tests after making changes to verify nothing is broken

   ## Workflow

   1. Understand the task by reading relevant existing code
   2. Plan the changes needed
   3. Implement the changes across all affected files
   4. Build and verify the changes compile successfully
   5. Run tests if applicable
   ```

2. Walk through the structure:
   - **Tools**: `search/codebase`, `azure-mcp/search`, `edit/editFiles`, `execute/getTerminalOutput`, `execute/runInTerminal`, `read/terminalLastCommand`, `read/terminalSelection`, `read/problems` — all local, no MCP
   - **No custom model** — uses whatever model you have selected
   - **Persona**: A full-stack TypeScript engineer who follows the project's patterns
3. Show the agent appearing in the Copilot Chat mode picker
4. Select `OctoCATEngineer` and give it a task:

```
Add a GET /api/products/search endpoint that accepts a "name" query parameter and returns matching products
```

5. Show the agent:
   - Reading existing route code for patterns
   - Creating or editing the route file
   - Running commands to verify the build
   - Staying in character throughout the conversation

**Talking point**: "This is the simplest kind of agent — a persona with local tools. It can read, write, and run commands. No MCP servers, no custom model, no cloud delegation. Just a specialized pair programmer."

---

### 🖥️ DEMO: Part B — Create a CodeReviewer Agent

Now contrast the OctoCATEngineer (read/write worker) with a read-only reviewer agent.

Create `.github/agents/CodeReviewer.agent.md`:

```yaml
---
tools: ['codebase', 'search', 'usages', 'problems']
description: Review code for security, performance, and best practices
model: Claude Sonnet 4
---

You are an expert code reviewer specializing in TypeScript and React applications.

When reviewing code:

1. **Security**: Check for XSS, injection, insecure data handling
2. **Performance**: Identify N+1 queries, unnecessary re-renders, memory leaks
3. **Best Practices**: Verify error handling, input validation, type safety
4. **Maintainability**: Check naming, code organization, DRY violations

Always provide:
- Severity level (Critical / Warning / Suggestion)
- Specific file and line references
- Concrete fix recommendations with code examples

Be direct and opinionated. Don't say "consider" — say "change this to..."
```

1. Show the new agent appearing in the mode picker immediately
2. Point out the differences from OctoCATEngineer:
   - **Read-only tools** — `codebase`, `search`, `usages`, `problems` (no `editFiles`, no `runCommands`)
   - **Custom model** — explicitly sets `Claude Sonnet 4`
   - **Different persona** — reviewer, not builder

**Talking point**: "Same file format, completely different behavior. OctoCATEngineer builds features. CodeReviewer only reads and reports. The tool list controls what an agent can do."

---

### 🖥️ DEMO: Part C — Advanced: ImplementationIdeas Agent (Agents Calling Agents)

Now show the most advanced agent pattern — an agent that delegates to the Coding Agent.

1. Open `.github/agents/ImplementationIdeas.agent.md`
2. Walk through what makes this different:
   - **Tools**: `search`, `github/*` (wildcard = all GitHub MCP tools), `playwright/*`, `githubRepo`, `todos`
   - **Model**: `Claude Sonnet 4.5` — the agent chooses its own model
   - **Key line**: `call GitHub's create_pull_request_with_copilot` — this agent delegates to the Coding Agent (cloud)
3. Select the agent and give it a task:

```
Explore adding a wishlist feature where users can save products for later
```

4. Show the agent:
   - Researching the codebase (parallel tool calls)
   - Creating a todo list with variations
   - Delegating implementation to Coding Agent

**Talking point**: "This agent doesn't just write code — it researches, plans, and then hands off implementation to an autonomous cloud agent. MCP wildcards, a custom model, and cross-agent delegation. We'll cover the Coding Agent it delegates to in detail in Section 9."

> **Note**: When you run the wishlist prompt with this agent, you may see a tip from Coding Agent: *"You can make Copilot smarter by setting up custom instructions, customizing its development environment and configuring MCP servers."* We'll explore how to configure the Coding Agent's environment in Section 9.

### Agent Progression Summary

| Agent | Tools | Model | Pattern |
|-------|-------|-------|---------|
| **OctoCATEngineer** | Local read/write | Default | Simple worker — builds features |
| **CodeReviewer** | Local read-only | Claude Sonnet 4 | Reviewer — analyzes, doesn't edit |
| **ImplementationIdeas** | MCP wildcards + cloud | Claude Sonnet 4.5 | Advanced — delegates to Coding Agent |

<details>
<summary><h3>🧪 Hands-On: Explore and Create Custom Agents (10 min)</h3></summary>

**Exercise 1 — Use the OctoCATEngineer Agent**

Before building your own agent, experience what it's like to use one:

1. Open the Copilot Chat mode picker (dropdown at the top)
2. Select **OctoCATEngineer** from the list
3. Give it a task:

```
Add a health check endpoint at GET /api/health that returns the API version and uptime
```

4. Watch the agent work — it should:
   - Read existing route patterns
   - Create or edit route files
   - Run the build to verify
5. Notice how every response follows the engineer persona — it stays in character

**Exercise 2 — Build a Code Reviewer Agent**

1. Create `.github/agents/CodeReviewer.agent.md` with the following content:

```yaml
---
tools: ['codebase', 'search', 'usages', 'problems']
description: Review code for security, performance, and best practices
model: Claude Sonnet 4
---

You are an expert code reviewer specializing in TypeScript and React applications.

When reviewing code:

1. **Security**: Check for XSS, injection, insecure data handling
2. **Performance**: Identify N+1 queries, unnecessary re-renders, memory leaks
3. **Best Practices**: Verify error handling, input validation, type safety
4. **Maintainability**: Check naming, code organization, DRY violations

Always provide:
- Severity level (Critical / Warning / Suggestion)
- Specific file and line references
- Concrete fix recommendations with code examples

Be direct and opinionated. Don't say "consider" — say "change this to..."
```

2. Check the mode picker — "CodeReviewer" should appear immediately (no reload needed)

**Exercise 3 — Test Your Agent**

1. Select **CodeReviewer** from the mode picker
2. Ask it to review a specific file:

```
Review the product route handler for security and performance issues
```

3. Notice how the agent stays in character — every response follows the review format you defined
4. Ask a follow-up question:

```
Now review the error handling across all API routes
```

5. The agent maintains its persona across the entire conversation

**Exercise 4 — Explore the ImplementationIdeas Agent**

1. Open `.github/agents/ImplementationIdeas.agent.md`
2. Read through the file and notice the advanced patterns:
   - `github/*` and `playwright/*` — MCP server tool wildcards
   - `model: Claude Sonnet 4.5` — the agent picks its own model
   - `call GitHub's create_pull_request_with_copilot` — agents delegating to agents
3. Compare the three agents: OctoCATEngineer (simple worker), CodeReviewer (read-only), ImplementationIdeas (advanced with cloud delegation)

**Exercise 5 — Create Your Own Agent** (Bonus)

Choose a persona that would be useful for this project and create it:

**Option A: `APIDesigner.agent.md`**

```yaml
---
tools: ['codebase', 'search', 'editFiles', 'runCommands']
description: Design and implement REST API endpoints following project patterns
model: Claude Sonnet 4
---

You are an API architect specializing in Express.js and TypeScript.
[Add behavior instructions: how to design endpoints, which patterns to follow,
how to handle validation, what Swagger docs to generate...]
```

**Option B: `TestEngineer.agent.md`**

```yaml
---
tools: ['codebase', 'search', 'editFiles', 'runCommands', 'problems', 'findTestFiles']
description: Design and write comprehensive test suites
model: Claude Sonnet 4
---

You are a test engineering expert focused on TypeScript applications using vitest.
[Add behavior instructions: what to test, coverage targets, testing patterns,
how to handle mocking, edge cases to consider...]
```

**Option C: `DocWriter.agent.md`**

```yaml
---
tools: ['codebase', 'search', 'editFiles']
description: Generate and maintain project documentation from code
model: Claude Sonnet 4
---

You are a technical writer who creates clear, concise documentation.
[Add behavior instructions: documentation style, what to document,
README structure, API doc format, code comment standards...]
```

Fill in the behavior instructions with your own rules, then test the agent with a real task.

</details>

### Success Criteria

- ✅ You've used the OctoCATEngineer agent to complete a task and seen a simple "worker" agent in action
- ✅ You've created the CodeReviewer agent and tested it with a review request
- ✅ You've explored the ImplementationIdeas agent and understand how agents can delegate to cloud agents
- ✅ You understand the progression: simple local agent → read-only agent → advanced agent with MCP and delegation
- ✅ You understand that agents persist for the entire chat session, unlike prompts

---

## 7. MCP Servers (Playwright + GitHub) (30 min)

### Key Points

- MCP (Model Context Protocol) extends Copilot with external tools
- Configured in `.vscode/mcp.json` — part of the repo, shared with the team
- Two server types: **HTTP** (remote, OAuth-authenticated) and **stdio** (local, runs a process)
- The OctoCAT Supply repo includes two MCP servers:
  - **Playwright** — browser automation for functional testing
  - **GitHub** — interact with GitHub issues, PRs, and repo data from chat

### MCP Configuration

The repo's `.vscode/mcp.json`:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

| Server | Type | Auth | Requires |
|--------|------|------|----------|
| **GitHub** | HTTP (remote) | OAuth (automatic) | Nothing extra |
| **Playwright** | stdio (local) | None | Node.js, local VS Code |

---

### 🖥️ DEMO: Verify MCP Servers

MCP servers auto-start when Copilot needs them — no manual launch required. When you send a prompt that requires an MCP tool, VS Code starts the server automatically.

1. Open the Command Palette → `MCP: List servers`
2. Show both servers listed (playwright + github)
3. Point out the status indicators — servers may show as "Not started" until first use
4. For **GitHub**: The first time Copilot calls a GitHub MCP tool, an OAuth authentication flow will open in your browser. Approve it once and it's cached.

> **Note**: If MCP servers don't appear or Copilot doesn't use them, verify the VS Code setting `chat.mcp.discovery.enabled` is set to `true` (Settings → search "MCP"). This setting allows Copilot to discover and auto-start MCP servers defined in `.vscode/mcp.json`.

> **Important**: When Copilot calls an MCP tool for the first time, VS Code displays a **tool approval dialog** — an "Allow" button with a dropdown arrow. This dialog ensures you control what external tools Copilot can invoke. Clicking "Allow" approves only that single call, which gets tedious quickly during hands-on exercises. Click the **dropdown arrow (▼)** next to "Allow" to see session-wide and workspace-wide approval options:
>
> | Option | Scope | Effect |
> |--------|-------|--------|
> | **Allow** | One-time | Approves this single tool call only |
> | **Skip** | One-time | Skips this tool call without approving |
> | **Allow Without Review in this Session** | All tools, current session | Auto-approves all MCP tool calls until VS Code restarts |
> | **Allow Without Review in this Workspace** | All tools, this workspace | Auto-approves all MCP tool calls in this project permanently |
> | **Always Allow Without Review** | All tools, global | Auto-approves all MCP tool calls everywhere, permanently |
> | **Allow Tools from [Server] Without Review in this Session** | Per-server, current session | Auto-approves only tools from that specific MCP server for this session |
> | **Allow Tools from [Server] Without Review in this Workspace** | Per-server, this workspace | Auto-approves only tools from that specific MCP server in this project permanently |
> | **Always Allow Tools from [Server] Without Review** | Per-server, global | Always auto-approves tools from that specific MCP server everywhere |
>
> **Recommended for this workshop**: Select **"Allow Tools from Playwright Without Review in this Session"** (and the same for GitHub). This scopes approval to the specific server and resets when VS Code restarts — the best balance of convenience and safety.

---

### 🖥️ DEMO: Playwright MCP — Browser Testing from Natural Language

> **Prerequisite**: App must be running locally (`npm run dev`). Playwright MCP does NOT work in Codespaces.

1. The Playwright MCP server will auto-start when Copilot needs it
2. Switch to Agent mode
3. Enter:

```
Browse to http://localhost:5137 and navigate to the Products page. Describe what you see.
```

4. Show Copilot:
   - Sending commands to the Playwright browser
   - Navigating to the site
   - Describing the UI elements it finds
5. Follow up:

```
Click on one of the products and check if the product details are displayed correctly
```

6. Show Copilot interacting with the page and reporting results

**Talking point**: "You just ran a functional test using natural language. No test scripts, no selectors, no framework setup. Copilot uses Playwright behind the scenes to drive a real browser."

---

### 🖥️ DEMO: Run BDD-Style Test Scenarios

1. **Start a new chat** — click the **+** button in Copilot Chat to start with a clean context
2. Enter:

```
Run the following BDD test scenarios against http://localhost:5137 using Playwright:
1. Given I navigate to the Products page, Then I should see a list of products with names, images, and prices
2. When I click on a product, Then I should see the product details
3. When I click "Add to Cart" on a product, Then I should see a confirmation
Report pass/fail for each scenario.
```

3. Show Copilot:
   - Launching the browser and navigating to the Products page
   - Executing each scenario step (viewing products, clicking a product, clicking Add to Cart)
   - Reporting pass/fail results for each scenario
4. Point out how the prompt uses BDD-style Given/When/Then language — but executes immediately via Playwright instead of generating a static file

**Talking point**: "BDD-style test scenarios described in natural language and executed live — no cucumber, no step definitions, no extra tooling. Copilot understood the Given/When/Then structure and ran a real browser through each scenario."

5. **Save the chat as a prompt file**:
   - Click the **Gear icon** (⚙️) at the top of the Copilot Chat panel
   - Select **"Save Prompt"**
   - Name it `bdd-playwright-tests` — VS Code saves it as `.github/prompts/bdd-playwright-tests.prompt.md`
   - Open the saved file and show the generated YAML frontmatter (`mode: 'agent'`, `tools: ['playwright/*']`)

**Talking point**: "We just turned a one-off chat into a reusable prompt file with two clicks. Anyone on the team can now run the same BDD scenarios — that's Section 4 and Section 7 coming together."

---

### 🖥️ DEMO: GitHub MCP — Interacting with GitHub from Chat

1. Switch to Agent mode
2. Enter:

```
Check which issues are assigned to me in this repo
```

3. Show Copilot fetching issues via the GitHub API
4. Enter:

```
Create an Issue for enhancing test coverage in the API project and assign it to me
```

5. Show the issue being created with:
   - Meaningful title and description
   - Appropriate labels
   - Correct assignee

**Talking point**: "You just managed your GitHub project without leaving VS Code. The GitHub MCP server gives Copilot full access to issues, PRs, and repo data."

<details>
<summary><h3>🧪 Hands-On: MCP Servers — Playwright + GitHub (15 min)</h3></summary>

**Exercise 1 — Verify MCP Server Configuration**

MCP servers auto-start when Copilot needs them — you don't need to manually launch them.

1. Open `.vscode/mcp.json` in the editor and confirm both `github` and `playwright` servers are defined.

2. Verify the VS Code setting is enabled: Open Settings (`Ctrl+,`) → search for `chat.mcp.discovery.enabled` → ensure it's checked (true). This allows Copilot to discover and auto-start MCP servers.

3. For the **GitHub** server: The first time Copilot calls a GitHub MCP tool, you'll see an OAuth authentication flow. Follow the prompts to authorize Copilot to access your GitHub account.

4. To check server status at any time: Command Palette (`Ctrl+Shift+P`) → `MCP: List servers` — shows status for each server.

**Exercise 2 — Browse Your App with Playwright**

1. Switch to **Agent** mode in Copilot Chat
2. Ask Copilot to explore your running application:

```
Browse to http://localhost:5137 and describe what you see on the home page
```

3. Watch Copilot:
   - Launch a browser window (you'll see it open)
   - Navigate to the URL
   - Take a screenshot and analyze the page
   - Describe the UI elements it finds
4. Now ask it to interact with the app:

```
Navigate to the Products page and click on the first product. Describe the product details you see.
```

5. Copilot will click through the UI, read the content, and report back

**Exercise 3 — Functional Testing with Natural Language**

1. Ask Copilot to verify specific functionality:

```
Browse to http://localhost:5137, go to Products, and verify that:
1. All products have images displayed
2. All products show a price
3. The "Add to Cart" button is visible on each product
Report any issues you find.
```

2. Review the results — Copilot will check each condition and report pass/fail
3. Try a more specific test:

```
Go to the Products page, click "Add to Cart" on any product, and tell me what happens
```

**Exercise 4 — Run BDD-Style Test Scenarios**

1. Ask Copilot to execute BDD-style test scenarios against the live app:

```
Run these BDD test scenarios against http://localhost:5137 using Playwright:
1. Given I navigate to the Products page, Then I should see a list of products with names, images, and prices
2. When I click on a product, Then I should see the product details
3. When I click "Add to Cart" on a product, Then I should see a confirmation
Report pass/fail for each scenario.
```

2. Review Copilot's test execution results — it should:
   - Navigate to the Products page and verify product cards are displayed
   - Click a product and confirm details appear
   - Click "Add to Cart" and confirm the response
   - Report pass/fail for each scenario

**Exercise 5 — GitHub MCP: Manage Issues from Chat**

1. In Agent mode, ask Copilot:

```
Check which issues are currently open in this repo
```

2. Copilot will fetch issues via the GitHub API — no terminal needed
3. Create an issue directly from chat:

```
Create a GitHub Issue titled "Add product search functionality" with a description that includes acceptance criteria for searching products by name and category
```

4. Verify the issue was created by checking in your browser or asking: `Show me the issue you just created`

**Exercise 6 — Combine Both MCP Servers** (Bonus)

This is where things get powerful — use Playwright to find a bug, then use GitHub to file an issue:

```
Browse to http://localhost:5137 and test all the navigation links. If any pages are missing or broken, create a GitHub Issue for each problem you find.
```

</details>

### Success Criteria

- ✅ Both MCP servers are configured in `.vscode/mcp.json` and auto-start when needed
- ✅ You've seen Playwright navigate your app and describe what it sees
- ✅ You've run a natural-language functional test against your running app
- ✅ You've used GitHub MCP to create or list issues from Copilot Chat
- ✅ You understand that MCP connects Copilot to the real world beyond just code files

---

## 8. GitHub Copilot CLI: The Agentic Terminal (30 min)

### Key Points

- The standalone **`copilot` CLI** is a full AI agent in your terminal — interactive sessions with tool approvals, file editing, command execution, and plan mode
- It supports the **same customization files** from Sections 3–6: instructions, agents, skills, and MCP servers — everything transfers from VS Code
- `/delegate` bridges the CLI to the Coding Agent (Section 9) — start work locally, hand it off to the cloud mid-session
- Session persistence with `--resume`/`--continue` means you can pick up right where you left off


### What the GitHub Copilot CLI Can Do

| Capability | How It Works |
|------------|-------------|
| Interactive agentic sessions | `copilot` — full TUI with tool approval, file editing, command execution |
| Plan mode | Shift+Tab — structured implementation plans before code (mirrors VS Code Plan mode) |
| File context | `@path/to/file` — include specific files directly in prompts |
| Delegate to Coding Agent | `/delegate` or `&` prefix — hand off current work to GitHub cloud |
| Session resume | `--resume` / `--continue` — pick up where you left off across sessions |
| Custom agents | `/agent` — use agents from `.github/agents/` (same files from Section 6) |
| MCP servers | `/mcp add` — GitHub MCP built-in, add more on the fly |
| Code review | `/review` — analyze changes before committing |
| Programmatic mode | `copilot -p "prompt" --allow-tool 'shell(git)'` — scriptable, headless |
| Context management | `/context`, `/compact`, `/usage` — monitor and manage token usage |

### GitHub Copilot CLI vs VS Code Agent Mode

| Feature | VS Code Agent Mode | GitHub Copilot CLI |
|---------|-------------------|-------------|
| **Where** | IDE sidebar/editor | Terminal (any terminal) |
| **Plan mode** | Chat mode picker | Shift+Tab toggle |
| **Tool approval** | Accept/Reject in chat | Interactive TUI (Yes / Yes for session / No) |
| **Custom instructions** | `.github/copilot-instructions.md` | Same file — shared |
| **Custom agents** | `.github/agents/*.agent.md` | Same files — shared |
| **MCP servers** | `.vscode/mcp.json` | `/mcp add` + `~/.copilot/mcp-config.json` |
| **Delegate to cloud** | Not available | `/delegate` or `&` — hands off to Coding Agent |
| **Session resume** | Chat history | `--resume` / `--continue` |
| **Best for** | Visual coding, multi-file edits | Terminal-native devs, CI scripting, quick tasks |

---

### 🖥️ DEMO: The Agentic Terminal

#### Part A: Launch and Explore (3 min)

1. **Close or minimize VS Code** — open a standalone terminal to emphasize this runs *outside* the IDE:
   - **Windows**: Open **Windows Terminal** (`Win+X` → Terminal) or **PowerShell**
   - **macOS**: Open **Terminal.app** (`Cmd+Space` → "Terminal") or **iTerm2**
2. Navigate to the project root:

```bash
cd path/to/GitHubCopilot_Customized
```

3. Launch the interactive session:

```bash
copilot
```

> **Note**: Launching from a standalone terminal reinforces the key message — the GitHub Copilot CLI is independent of any editor. It works the same in Windows Terminal, iTerm2, a remote SSH session, or even a CI pipeline.

3. Show the **trusted directory TUI prompt** — approve the project directory
4. Enter a natural language question:

```
Explain the architecture of this project and list all the API entities
```

5. Show Copilot reading files, understanding the codebase — same intelligence as VS Code Agent mode
6. Toggle into **plan mode** with Shift+Tab and enter:

```
Plan how to add a health check endpoint to the API
```

7. Show the structured plan output — Copilot analyzes, asks clarifying questions, and builds a step-by-step plan

**Talking point**: "This is the same Copilot agent you used in VS Code — but in your terminal. Plan mode, file editing, tool approval, custom agents. If you live in the terminal, you don't have to leave."

#### Part B: Build a Feature Live (4 min)

1. Switch back to ask/execute mode (Shift+Tab)
2. Enter:

```
Add a GET /api/health endpoint that returns the app version from package.json and current uptime. Include Swagger docs. @api/src/routes/product.ts for the route pattern.
```

3. Show the **tool approval TUI** — Copilot asks permission to write files → approve "Yes for session"
4. Show it creating the route, adding Swagger annotations, following existing patterns from the `@` referenced file
5. Show it optionally running the server to verify

**Talking point**: "One prompt. It read the pattern from the file we referenced with `@`, created the endpoint, added Swagger docs, and verified it works. The tool approval TUI keeps you in control — you see every action before it happens."

#### Part C: /delegate — Hand Off to the Cloud (3 min)

1. Enter:

```
/delegate Add comprehensive test coverage for the new health endpoint and create a PR
```

2. Show Copilot committing changes to a new branch and creating a Coding Agent session
3. Show the URL to the PR and agent session on GitHub

**Talking point**: "We just started work locally in the terminal and handed it off to GitHub's Coding Agent in the cloud. It'll open a PR, write the tests, and request your review. This is the local-to-cloud handoff — and the perfect bridge to Section 9."

#### Part D: Bonus Capabilities Quick-Fire (2 min)

1. `/review` — show inline code review of recent changes
2. `/context` — show token usage breakdown
3. `/agent` — show available agents (including ones from `.github/agents/`)
4. `!git status` — shell escape without a model call
5. `/usage` — show session stats (premium requests used, duration, lines edited)

**Talking point**: "There's a whole world of slash commands. `/review` before you commit, `/context` to see your token budget, `/agent` to switch personas. This is your daily driver if you're a terminal person."

<details>
<summary><h3>🧪 Hands-On: Try the GitHub Copilot CLI (15 min)</h3></summary>

**Exercise 1 — Launch and Explore**:

1. Open a **standalone terminal** (not VS Code's integrated terminal) to experience the CLI independently:
   - **Windows**: Open **Windows Terminal** or **PowerShell** from the Start menu
   - **macOS**: Open **Terminal.app** or **iTerm2**
2. Navigate to the project directory:

```bash
cd path/to/GitHubCopilot_Customized
```

3. Launch the interactive session:

```bash
copilot
```

3. When prompted, confirm you trust the project directory
4. Ask a question about the codebase:

```
What testing framework does this project use? What's the current test coverage?
```

5. Notice how it reads files and provides a codebase-aware answer — same intelligence as VS Code

**Exercise 2 — File Context with `@`**:

1. Reference a specific file in your prompt:

```
Explain what @api/src/routes/product.ts does and list all the endpoints it defines
```

2. Notice how Copilot includes the file contents automatically — no need to copy-paste

**Exercise 3 — Plan Mode**:

1. Press Shift+Tab to enter **plan mode** (the mode indicator changes)
2. Enter:

```
Plan how to add a new Supplier search endpoint with filtering by name and location
```

3. Review the structured plan — files to change, approach, step-by-step instructions
4. Press Shift+Tab again to return to ask/execute mode

**Exercise 4 — Build Something**:

1. Ask Copilot to implement the planned feature:

```
Implement the Supplier search endpoint from the plan above, following the patterns in @api/src/routes/product.ts
```

2. Watch the tool approval TUI — approve file writes with option 2 ("Yes for session") to avoid repeated prompts
3. Let Copilot create the files and optionally test them

**Exercise 5 — Delegate to Coding Agent** (Bonus):

> **Note**: `/delegate` requires the `gh` CLI installed and authenticated (`gh auth login`), plus Coding Agent enabled in repo settings.

1. Hand off remaining work to the cloud:

```
/delegate Write unit tests for the new supplier search endpoint and create a PR
```

2. Follow the link to see the Coding Agent session on GitHub
3. Alternatively, try `/review` to review your changes locally before committing

**Exercise 6 — Explore Slash Commands** (Bonus):

Try these commands to explore the CLI's capabilities:

```
/agent
```

View available agents (including ones from `.github/agents/`)

```
/context
```

See your current token usage breakdown

```
/usage
```

View session statistics

```
!git log --oneline -5
```

Run a shell command directly (the `!` prefix skips the AI model)

</details>

### Success Criteria

- ✅ You've launched `copilot` and approved the trusted directory prompt
- ✅ You've asked a codebase-aware question and received an intelligent answer
- ✅ You've used `@path/to/file` to include file context in a prompt
- ✅ You've toggled into plan mode with Shift+Tab and generated a structured plan
- ✅ You've watched the tool approval TUI and approved a file write
- ✅ You've used at least one slash command (`/review`, `/context`, `/agent`, or `/usage`)
- ✅ You understand how `/delegate` bridges local CLI work to the cloud Coding Agent

### Discussion Points

- How does the `copilot` interactive terminal compare to Agent mode in VS Code? When would you choose each?
- `/delegate` lets you start work locally and hand off to the cloud. How would this change your daily workflow?
- The CLI supports the same custom instructions, agents, and MCP servers as VS Code. How does having one config across IDE + terminal + cloud benefit your team?
- What security policies would your org need around `--allow-all-tools` vs. per-tool approval?

---

## 9. Cloud Agents: Coding Agent + PR Review Agent (20 min)

### Key Points

- Cloud agents operate at the platform level — they run on GitHub, not in your IDE
- Two key cloud agents:
  - **Coding Agent**: Assign a GitHub Issue to Copilot → it codes autonomously and creates a PR
  - **PR Review Agent (Copilot Code Review)**: Request Copilot as a reviewer on a PR → it provides AI-powered code review comments

### The Autonomous Development Loop

```
┌─────────────┐    ┌───────────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ 📋 GitHub  │───►│ 🤖 Coding     │───►│ 📝 Pull    │───►│ 🔍 Copilot   │───►│ ✅ Merge    │
│    Issue   │    │    Agent      │    │    Request │    │    Code Review│    │             │
│             │    │ Creates branch │    │             │    │ + Human    │    │             │
│             │    │ Implements     │    │             │    │    Review   │    │             │
└─────────────┘    └───────────────┘    └─────────────┘    └──────────────┘    └─────────────┘
```

### Part A: Copilot Coding Agent (10 min)

**Concept**:

- Assign any GitHub Issue to Copilot — it creates a branch, implements the solution, and opens a PR
- Works asynchronously — takes ~5-30 minutes depending on complexity
- Requires: Branch protection rule on `main` (PR required, at least 1 reviewer)

**Prerequisites**:

- Actions enabled on the repo
- Branch protection rule on `main` requiring PR reviews
- Copilot Coding Agent enabled in repo settings

### Your Customization Files Work in the Cloud Too

Coding Agent reads ALL of your customization files — instructions, skills, agents — everything you've built throughout this workshop:

| File | Purpose | Used By |
|------|---------|---------|
| `.github/copilot-instructions.md` | Coding standards, architecture rules | IDE Agent + Coding Agent |
| `.github/skills/*/SKILL.md` | Specialized procedures (auto-selected) | IDE Agent + Coding Agent |

**Key insight**: Everything you built today — instructions, skills, agents — Coding Agent uses all of it. Your team's standards apply even when AI codes autonomously.

---

### 🖥️ DEMO: Assign an Issue to Coding Agent

1. Open the GitHub repo in the browser
2. Navigate to Issues → find Issue #1 (test coverage improvement) or create a new issue:
   - Title: `Add input validation to the Product API POST endpoint`
   - Description: `The POST /api/products endpoint accepts any payload without validation. Add Zod schema validation for required fields (name, price, supplierId).`
3. Click **Assignees** → type and select **Copilot**
4. Show the Coding Agent session starting (Actions tab or Copilot indicator)
5. Explain what happens next:
   - Copilot creates a feature branch
   - Reads the codebase to understand patterns
   - Implements the solution across relevant files
   - Runs tests (if configured)
   - Opens a PR with a description of changes

**Talking point**: "You just delegated a code task to an autonomous agent. It'll read your instructions, your skills, your prompt files — everything we've set up today — and write code that follows your team's standards."

---

### 🖥️ DEMO: Show the Custom Agent → Coding Agent Handoff

1. Recall the `ImplementationIdeas.agent.md` from Section 6
2. Show the key line: `call GitHub's create_pull_request_with_copilot`
3. Explain: "Custom agents (IDE-level) can delegate to the Coding Agent (cloud-level). Your IDE agent researches and plans, then hands off implementation to run autonomously."

### Part B: Copilot Code Review / PR Review Agent (10 min)

**Concept**:

- Add Copilot as a reviewer on any PR — it provides AI-powered code review
- Reviews cover: correctness, security, performance, style, best practices
- Provides inline comments with severity levels and suggested fixes
- Complementary to human review, not a replacement

---

### 🖥️ DEMO: Request Copilot Review on a PR

1. Open a PR in the repo (use one created by Coding Agent, or a pre-prepared PR)
2. Click **Reviewers** → Add **Copilot** as a reviewer
3. Wait for the review to appear (typically 1-3 minutes)
4. Walk through the review comments:
   - Show inline code suggestions with diffs
   - Show severity indicators
   - Show how to accept individual suggestions (creates a commit)
   - Show how to dismiss/resolve suggestions
5. Compare with human review — Copilot catches pattern-based issues; humans catch intent and business logic

**Talking point**: "Copilot caught security and performance issues that would take a human reviewer significant time to find. But notice it doesn't question business decisions — that's still your job. The best setup is Copilot + human review together."

### Key Differences: Agent Mode vs Coding Agent

| Aspect | Agent Mode (IDE) | Coding Agent (Cloud) |
|--------|-----------------|---------------------|
| **Where** | Your IDE | GitHub servers |
| **How** | Interactive chat | Assign a GitHub Issue |
| **Sync** | Real-time, interactive | Async, autonomous |
| **Duration** | Minutes (you're watching) | 5-30 min (you're doing other work) |
| **Output** | File changes in your workspace | A Pull Request |
| **Best for** | Iterative work, exploration | Well-defined tasks, delegation |

### Discussion Points

- When would you use Coding Agent vs Agent Mode?
- How does this change your team's issue workflow?
- What guardrails would you put in place? (Branch protection, required human review)

---

## 10. Wrap-Up, Customization Hierarchy Recap & Q&A (10 min)

### The Full Customization Stack

You've now built every layer:

```
┌────────────────────────────────────────────────────────────┐
│                    CLOUD AGENTS                            │
│  Coding Agent (async PRs) + PR Review Agent (code review) │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                    MCP SERVERS                              │
│  Playwright (browser testing) + GitHub (issues, PRs)       │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                    AGENT SKILLS                             │
│  .github/skills/*/SKILL.md — auto-selected by relevance    │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                CUSTOM AGENTS (CHAT MODES)                   │
│  .github/agents/*.agent.md — persistent personas           │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                  CUSTOM PROMPT FILES                        │
│  .github/prompts/*.prompt.md — reusable task templates     │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                  CUSTOM INSTRUCTIONS                        │
│  .github/copilot-instructions.md — always-on context       │
│  .github/instructions/*.instructions.md — scoped rules     │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                      CHAT MODES                              │
│  Ask (explore) → Plan (design) → Agent (build)             │
└────────────────────────────────────────────────────────────┘

  GitHub Copilot CLI (§8) — Agentic terminal: TUI, plan mode, /delegate
```

### Key Takeaways

1. **Modes are your foundation** — Ask for understanding, Plan for design, Agent for building
2. **Custom Instructions encode tribal knowledge** — internal frameworks, standards, architecture patterns
3. **Prompt Files create consistency** — reusable templates that any team member can run
4. **Agents are persistent personas** — they change how Copilot behaves for an entire session
5. **Skills are auto-selected** — Copilot loads them when relevant, no manual invocation needed
6. **MCP extends Copilot's reach** — connect it to browsers, APIs, databases, and any external tool
7. **Cloud agents close the loop** — from issue to PR to code review, all AI-assisted

### What You Built Today

| File | Section |
|------|---------|
| `.github/copilot-instructions.md` | §3 — Custom Instructions |
| `.github/instructions/API.instructions.md` | §3 — Scoped Instructions |
| `.github/prompts/security-review.prompt.md` | §4 — Custom Prompt Files |
| `.github/agents/CodeReviewer.agent.md` | §5 — Custom Agents |
| `.github/skills/*/SKILL.md` | §6 — Agent Skills |
| GitHub Copilot CLI agentic terminal session | §8 — GitHub Copilot CLI |

### Resources

| Resource | URL |
|----------|-----|
| GitHub Copilot Docs | <https://docs.github.com/en/copilot> |
| Copilot in the CLI | <https://docs.github.com/en/copilot/github-copilot-in-the-cli> |
| Custom Instructions | <https://docs.github.com/en/copilot/how-tos/configure-custom-instructions> |
| Prompt Files | <https://docs.github.com/en/copilot/how-tos/copilot-prompts> |
| Agent Skills | <https://docs.github.com/en/copilot/concepts/agents/about-agent-skills> |
| MCP Servers | <https://docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot> |
| Copilot Coding Agent | <https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent> |
| Copilot Code Review | <https://docs.github.com/en/copilot/using-github-copilot/code-review> |
| Copilot Trust Center | <https://resources.github.com/copilot-trust-center/> |
| Copilot SDK | <https://github.com/github/copilot-sdk> |
| OctoCAT Supply Repo | <https://github.com/microsoft/GitHubCopilot_Customized> |
| Community Skills | <https://github.com/github/awesome-copilot> |

### Q&A Topics to Prepare For

- How do instructions/prompts/skills propagate across forks?
- Can we restrict which MCP servers developers use?
- How do we measure ROI on Copilot customization?
- Does Coding Agent respect branch protection rules?
- Can we use custom instructions with Copilot in github.com (not just IDE)?
- How do skills interact with custom instructions? (Both loaded? Priority?)

---

## Post-Workshop Actions

- [ ] Commit and push all customization files you created today (instructions, prompts, agents, skills)
- [ ] Review the Coding Agent PR when it completes
- [ ] Share the `.github/` customization files with your team
- [ ] Identify 3-5 internal frameworks or patterns to encode as custom instructions
- [ ] Create 2-3 prompt files for your most common repetitive tasks
- [ ] Build an Agent Skill for your team's most specialized workflow
- [ ] Evaluate MCP servers for your toolchain (database, API testing, deployment)
- [ ] Enable Copilot Code Review on your repositories
- [ ] Schedule a follow-up session to share learnings and iterate on customizations

---

## Appendix: Quick Reference

### Customization File Locations

| Type | Path | Extension | Auto-loaded? |
|------|------|-----------|--------------|
| Project instructions | `.github/copilot-instructions.md` | `.md` | Yes — always |
| Scoped instructions | `.github/instructions/` | `.instructions.md` | Yes — when matching files active |
| Prompt files | `.github/prompts/` | `.prompt.md` | No — invoked manually |
| Agents / Chat modes | `.github/agents/` | `.agent.md` | No — selected in mode picker |
| Project skills | `.github/skills/*/` | `SKILL.md` | Yes — auto-selected by relevance |
| Personal skills | `~/.copilot/skills/*/` | `SKILL.md` | Yes — auto-selected by relevance |
| MCP config | `.vscode/mcp.json` | `.json` | Auto-started when needed |

### Prompt File Frontmatter Reference

```yaml
---
mode: 'agent'              # 'ask', 'agent', or 'plan'
description: 'Text'        # Shown in the prompt picker
tools: ['tool1', 'tool2']  # Available tools for agent mode
---
```

**Common tools**: `changes`, `codebase`, `editFiles`, `fetch`, `findTestFiles`, `githubRepo`, `problems`, `runCommands`, `runTasks`, `search`, `terminalLastCommand`, `testFailure`, `usages`

### Agent File Frontmatter Reference

```yaml
---
tools: ['tool1', 'tool2']     # Available tools
description: 'Text'           # Shown in mode picker
model: 'Claude Sonnet 4.5'    # Model to use (optional)
---
```

### Skill File Frontmatter Reference

```yaml
---
name: skill-name              # Lowercase, hyphens for spaces
description: 'When to use'    # Copilot matches this to prompts
license: 'MIT'                # Optional
---
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Copilot not active | Check extension is installed and signed in |
| MCP server won't start | Check `MCP: List servers` for status, verify `chat.mcp.discovery.enabled` is `true` in VS Code settings, verify Node.js installed |
| Playwright MCP fails | Must run locally (not Codespaces), check port 5137 |
| GitHub MCP auth error | Re-authenticate via OAuth, or use PAT with correct scopes |
| CORS errors in Codespaces | Set API port (3000) visibility to `public` |
| Agent mode not available | Update VS Code and Copilot extension to latest |
| Skills not loading | Verify `SKILL.md` filename (case-sensitive), check description matches prompt |
| Custom instructions ignored | Verify file is in `.github/` root, check for syntax errors |
| `copilot` CLI not available | Install the standalone GitHub Copilot CLI — see [docs.github.com/copilot/github-copilot-in-the-cli](https://docs.github.com/en/copilot/github-copilot-in-the-cli) for install instructions |

---

*Workshop materials prepared for GitHub Copilot: Zero to Agents training session*
*Demo repo: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)*
