# GitHub Copilot: Zero to Agents Workshop

**Duration**: 4 hours  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers with basic Copilot exposure (completions/chat)  
**Focus**: Copilot customization, agentic workflows, and cloud agents  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

---

## Workshop Overview

This session takes developers from casual Copilot usage to full agentic development. Starting with interaction modes and progressing through customization layers—instructions, prompts, agents, skills, and MCP servers—attendees build a complete understanding of how to tailor Copilot to their teams and workflows. The session culminates with Vision-powered agentic coding and fully autonomous cloud agents (Coding Agent + PR Review Agent).

### Learning Objectives

- Master Copilot's three interaction modes: Ask, Edit, and Agent
- Use the GitHub CLI (`gh`) for Copilot-powered terminal assistance and project management
- Create custom instructions that encode team standards and internal frameworks
- Build reusable prompt files and custom agents (chat modes) for repeatable workflows
- Author Agent Skills that Copilot auto-selects based on task relevance
- Extend Copilot with MCP servers for browser testing and GitHub integration
- Use Vision + Agent Mode for image-to-implementation workflows
- Leverage cloud agents: Coding Agent for autonomous PR creation and Copilot Code Review for AI-powered PR reviews

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher |
| **npm** | Latest version recommended |
| **Docker/Podman** | Optional — required for local GitHub MCP server |
| **Git** | For cloning the demo repository |
| **GitHub CLI** | `gh` — install from [cli.github.com](https://cli.github.com) |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Welcome, Objectives & Environment Setup | 20 min |
| 2 | Copilot Interaction Modes: Ask, Edit, Agent | 25 min |
| 3 | GitHub CLI: Copilot in the Terminal & Project Management | 15 min |
| ☕ | Break | 10 min |
| 4 | Custom Instructions | 20 min |
| 5 | Custom Prompt Files | 20 min |
| 6 | Custom Agents (Chat Modes) | 20 min |
| 🍽️ | Break | 10 min |
| 7 | Agent Skills | 20 min |
| 8 | MCP Servers (Playwright + GitHub) | 25 min |
| ☕ | Break | 10 min |
| 9 | Vision + Agent Mode Deep Dive (Cart Page) | 25 min |
| 10 | Cloud Agents: Coding Agent + PR Review Agent | 20 min |
| 11 | Wrap-Up, Customization Hierarchy Recap & Q&A | 10 min |

**Total: ~250 min (~4h 10min)**

---

## The "Zero to Agents" Narrative Arc

This workshop follows a deliberate progression:

```
ZERO                    CUSTOMIZE                   EXTEND                    AGENTS
───────────────────►  ───────────────────────────► ──────────────────────►  ─────────────────►
Interaction Modes      Instructions → Prompts →     MCP Servers              Vision + Agent
(Ask, Edit, Agent)     Agents → Skills              (Playwright, GitHub)     Coding Agent
GitHub CLI                                                                   PR Review Agent
```

Each section builds on the previous one, showing how Copilot can be progressively customized from a general assistant to a specialized, autonomous development partner.

---

## 1. Welcome, Objectives & Environment Setup (20 min)

### Key Points

- Workshop narrative: "Zero → Customize → Extend → Agents"
- This is NOT a Copilot basics session — we assume you've used completions and chat
- By the end, you'll have built a fully customized Copilot environment with instructions, prompts, agents, skills, and MCP integration
- Everything we build today uses real files in the `.github/` directory — portable across your own repos

### The Customization Hierarchy

| Layer | File Location | When Loaded | Purpose |
|-------|---------------|-------------|---------|
| **Custom Instructions** | `.github/copilot-instructions.md` | Always (every interaction) | Simple rules, coding standards |
| **Scoped Instructions** | `.github/instructions/*.instructions.md` | When matching files are active | File/language-specific guidance |
| **Prompt Files** | `.github/prompts/*.prompt.md` | On-demand (user invokes) | Reusable task templates |
| **Agents / Chat Modes** | `.github/agents/*.agent.md` | User selects in chat mode picker | Persistent personas with tool chains |
| **Agent Skills** | `.github/skills/*/SKILL.md` | Auto-selected by relevance | Specialized task instructions |
| **MCP Servers** | `.vscode/mcp.json` | When server is running | External tool integration |

### 🖥️ Demo: The OctoCAT Supply App

1. Show the [GitHub repo](https://github.com/microsoft/GitHubCopilot_Customized) in the browser
2. Walk through the architecture: React 18+ frontend (Vite, Tailwind) + Express.js API (TypeScript, Swagger)
3. Show the ERD diagram in `api/ERD.png`
4. Point out the `.github/` directory structure — prompts, agents (no instructions yet, no skills yet — we'll build those)

### 🧪 Hands-On: Environment Setup (10 min)

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

### Discussion Points

- Who has used Copilot Chat before? What modes have you tried?
- What's your biggest frustration with Copilot today? (Common answer: "It doesn't know our internal stuff" — tease Section 4)

---

## 2. Copilot Interaction Modes: Ask, Edit, Agent (25 min)

### Key Points

- Copilot has three core interaction modes — each optimized for different tasks
- Most developers only use one or two — understanding all three unlocks the full value
- Modes are selected in the Copilot Chat panel (dropdown at the top)

### Mode Comparison

| Mode | Best For | Context | Output |
|------|----------|---------|--------|
| **Ask** | Exploring, learning, understanding code | Reads codebase, open files, `@workspace` | Text explanations, code snippets in chat |
| **Edit** | Targeted inline changes, refactoring | Selected code, current file | Inline diff applied to file |
| **Agent** | Multi-file tasks, building features, running commands | Full codebase, terminal, tools | Creates/edits multiple files, runs commands |

### When to Use Each Mode — Decision Framework

```
"I need to understand something"          → Ask
"I need to change specific code"          → Edit
"I need to build/fix/create something"    → Agent
```

### 🖥️ Demo: Ask Mode

1. Open Copilot Chat → select **Ask** mode
2. Enter: `Please give me details about the API of this project.`
3. Show how Copilot references the architecture, Express routes, Swagger docs, and entity models
4. Enter: `Are there any core features missing in my project?`
5. Show Copilot analyzing the codebase and identifying gaps

**Talking point**: "Ask mode is your read-only expert. It understands your entire codebase but doesn't change anything. Perfect for onboarding or exploring unfamiliar code."

### 🖥️ Demo: Edit Mode

1. Open `api/src/routes/product.ts`
2. Select a route handler function
3. Switch to **Edit** mode
4. Enter: `Add JSDoc comments to this function with parameter descriptions and return type`
5. Show the inline diff preview — accept or reject

**Talking point**: "Edit mode is surgical. It works on the code you've selected and shows you exactly what it wants to change before applying."

### 🖥️ Demo: Agent Mode

1. Switch to **Agent** mode
2. Enter: `Please build and run my project so that I can see its existing state.`
3. Show Copilot:
   - Reading `package.json` and build configuration
   - Running `npm install` and `npm run dev` in the terminal
   - Verifying the application is running
4. Show the running app in the browser

**Talking point**: "Agent mode is your pair programmer. It can read files, write files, run terminal commands, and iterate until things work. It's the mode you'll use most in this workshop."

### 🧪 Hands-On: Try All Three Modes (8 min)

**Exercise 1 — Ask Mode**:
- Ask Copilot: `What testing framework does this project use and what's the current test coverage?`
- Note the answer for later (we'll generate tests in Section 5)

**Exercise 2 — Edit Mode**:
- Open any route file in `api/src/routes/`
- Select a function and ask Edit mode to add error handling or input validation

**Exercise 3 — Agent Mode**:
- If your app isn't running, use Agent mode: `Build and run the project`
- Then: `Open the Swagger documentation page for the API`

### Success Criteria

- ✅ You can switch between Ask, Edit, and Agent modes
- ✅ You've received a codebase-aware answer from Ask mode
- ✅ You've applied an inline edit and accepted/rejected it
- ✅ Your app is running (API on :3000, Frontend on :5137)

---

## 3. GitHub CLI: Copilot in the Terminal & Project Management (15 min)

### Key Points

- The GitHub CLI (`gh`) is GitHub's official command-line tool — it brings GitHub workflows into your terminal
- `gh copilot` integrates Copilot AI directly into the command line for command suggestions and explanations
- The CLI complements VS Code Copilot: use the IDE for coding, the CLI for automation and project management
- CLI skills are essential for Coding Agent workflows (Section 10) — issues, PRs, and repo management all flow through `gh`

### Why GitHub CLI Matters for Copilot Developers

| Capability | How It Helps |
|------------|-------------|
| `gh copilot suggest` | AI-generated shell commands from natural language |
| `gh copilot explain` | Plain-English explanations of complex commands |
| `gh issue` / `gh pr` | Manage issues and PRs without leaving the terminal |
| `gh repo` | Clone, fork, create repos from the command line |
| `gh extension` | Extend `gh` with community-built plugins |

### Copilot in the CLI — AI-Powered Command Assistance

```bash
# Ask Copilot to suggest a command
gh copilot suggest "find all TypeScript files modified in the last week"

# Ask Copilot to explain a command you found online
gh copilot explain "git log --oneline --graph --all --decorate"
```

**How it works**:
- `suggest` — Describe what you want to do in plain English → Copilot generates the shell command
- `explain` — Paste a command you don't understand → Copilot explains it step by step
- Both support follow-up refinements ("make it recursive", "add a date filter")

### Essential `gh` Commands for This Workshop

```bash
# Check your authentication status
gh auth status

# List issues in the current repo
gh issue list

# Create an issue (we'll use this in Section 10 for Coding Agent)
gh issue create --title "Add input validation" --body "Add Zod validation to POST /api/products"

# List pull requests
gh pr list

# View PR details and diff
gh pr view 1 --web

# Create a PR from your current branch
gh pr create --title "Add cart feature" --body "Implements cart page from design mockup"

# Clone a repo (what you did in Section 1)
gh repo clone microsoft/GitHubCopilot_Customized
```

### 🖥️ Demo: Copilot in the CLI

1. Open the VS Code integrated terminal
2. Verify CLI is installed and authenticated:

```bash
gh --version
gh auth status
```

3. Use `gh copilot suggest`:

```bash
gh copilot suggest "list all open issues assigned to me in this repo"
```

4. Show Copilot generating the appropriate `gh issue list` command
5. Use `gh copilot explain`:

```bash
gh copilot explain "gh api repos/{owner}/{repo}/branches/main/protection --method PUT"
```

6. Show Copilot breaking down the GitHub API command
7. Create an issue from the terminal:

```bash
gh issue create --title "Improve API error handling" --body "Standardize error responses across all API endpoints with proper HTTP status codes and error messages."
```

8. Show the issue appearing in the GitHub repo

**Talking point**: "The CLI is your power-user interface to GitHub. Everything you can do in the browser, you can script and automate from here. And with `gh copilot`, you don't even need to memorize the commands."

### 🧪 Hands-On: Try the GitHub CLI (5 min)

**Exercise 1 — Copilot Suggest**:
- Run: `gh copilot suggest "show me the most recent commits on main with a graph"`
- Execute the suggested command

**Exercise 2 — Issue Management**:
- List issues: `gh issue list`
- Create a test issue: `gh issue create --title "Test issue from CLI" --body "Created during the workshop hands-on exercise."`
- Verify it exists: `gh issue list`

**Exercise 3 — Explore Extensions** (Bonus):
- Browse available extensions: `gh extension browse`
- Or search for a specific one: `gh extension search copilot`

### Success Criteria

- ✅ `gh auth status` shows you are authenticated
- ✅ You've used `gh copilot suggest` to generate a command
- ✅ You've created an issue from the terminal with `gh issue create`

### Discussion Points

- How could you integrate `gh` commands into your CI/CD pipelines?
- What repetitive GitHub tasks could you automate with CLI scripts?
- How does `gh copilot suggest` compare to asking Copilot Chat in VS Code?

---

## 4. Custom Instructions (20 min)

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

### 🖥️ Demo: Generate Custom Instructions

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

### 🖥️ Demo: Create Scoped Instructions

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

2. Ask Copilot a question about the API — show how the scoped instructions influence the response

**Talking point**: "Scoped instructions are like per-project `.editorconfig` for AI. They activate only when you're working in matching files."

### 🖥️ Demo: The TAO Example (Internal Framework)

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

3. Switch to Agent mode and ask: `Add observability to the Supplier route using our internal standards`
4. Show Copilot generating TAO import code (`import { Measure, Trace } from '@tao/core'`) — code that references a framework that doesn't exist publicly

**Talking point**: "This is the real magic. Copilot has never seen TAO — it doesn't exist anywhere on the internet. But because we told it about TAO in our custom instructions, it generates code using our internal framework. Imagine this for YOUR company's internal libraries."

> **Note**: The generated code won't compile because TAO is fictional. That's intentional — it demonstrates that custom instructions override Copilot's training data.

### 🧪 Hands-On: Create Your Instructions (5 min)

1. Use the Gear icon → "Generate Agent Instructions" to create `.github/copilot-instructions.md` (if you haven't already)
2. Create `.github/instructions/API.instructions.md` with API-specific guidelines
3. Test it: Ask Copilot a question about the project before and after adding instructions — notice the difference

### Success Criteria

- ✅ `.github/copilot-instructions.md` exists in your repo
- ✅ `.github/instructions/API.instructions.md` exists with `applyTo: "api/**"`
- ✅ You've observed a behavioral difference in Copilot responses with instructions vs. without

---

## 5. Custom Prompt Files (20 min)

### Key Points

- Prompt files are reusable task templates stored in `.github/prompts/`
- They have YAML frontmatter that configures mode, tools, and description
- Invoked via: Run button in the file, Command Palette → "Prompts: Run Prompt", or typing `/prompt-name` in chat
- Unlike instructions (always loaded), prompts are on-demand — you choose when to run them

### Anatomy of a Prompt File

```yaml
---
mode: 'agent'                    # Which mode to use (ask, edit, agent)
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

### 🖥️ Demo: Walk Through Existing Prompts

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

### 🧪 Hands-On: Create a Prompt File (7 min)

Create a new prompt file: `.github/prompts/security-review.prompt.md`

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

Run the prompt and observe the results.

### Success Criteria

- ✅ You understand the YAML frontmatter fields (mode, description, tools)
- ✅ You've watched the unit test prompt run and generate tests
- ✅ You've created your own prompt file and run it successfully

---

## 6. Custom Agents / Chat Modes (20 min)

### Key Points

- Agents are persistent chat personas stored in `.github/agents/*.agent.md`
- They appear in the Copilot Chat mode picker alongside Ask, Edit, and Agent
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
tools: ['search', 'github/*', 'playwright/*', 'githubRepo', 'todos']
description: Explore implementation ideas
model: Claude Sonnet 4.5
---

Markdown body with the agent's instructions, persona, and behavior rules.
```

### 🖥️ Demo: Review the ImplementationIdeas Agent

1. Open `.github/agents/ImplementationIdeas.agent.md`
2. Walk through the structure:
   - **Tools**: `search`, `github/*` (all GitHub MCP tools), `playwright/*`, `githubRepo`, `todos`
   - **Model**: `Claude Sonnet 4.5` — the agent chooses its own model
   - **Behavior**: Research deeply (parallel searches) → implement via Coding Agent → create todo list for tracking
   - **Key instruction**: `call GitHub's create_pull_request_with_copilot` — this agent delegates to the Coding Agent
3. Show the agent appearing in the Copilot Chat mode picker
4. Select the agent and give it a task:
   - `Explore adding a wishlist feature where users can save products for later`
5. Show the agent:
   - Researching the codebase (parallel tool calls)
   - Creating a todo list with variations
   - Delegating implementation to Coding Agent

**Talking point**: "This agent doesn't just help you code — it researches, plans, and then hands off implementation to an autonomous agent. It's agents calling agents."

### 🖥️ Demo: Create a Custom Agent

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

Show the new agent appearing in the mode picker immediately.

### 🧪 Hands-On: Create Your Own Agent (5 min)

Create a custom agent for a workflow relevant to the project. Ideas:
- `APIDesigner.agent.md` — designs REST endpoints following existing patterns
- `TestEngineer.agent.md` — focuses on test coverage and quality
- `DocWriter.agent.md` — generates documentation from code

### Success Criteria

- ✅ You understand the difference between prompt files and agent files
- ✅ You've seen the ImplementationIdeas agent delegate to Coding Agent
- ✅ You've created a custom agent and it appears in the chat mode picker

---

## 7. Agent Skills (20 min)

### Key Points

- Agent Skills are specialized instruction sets that Copilot auto-selects based on task relevance
- Stored in `.github/skills/<skill-name>/SKILL.md` (project) or `~/.copilot/skills/<skill-name>/SKILL.md` (personal)
- Unlike instructions (always loaded) and prompts (manually invoked), skills are **automatically loaded when Copilot determines they're relevant**
- Skills are an [open standard](https://github.com/agentskills/agentskills) — used by Copilot Coding Agent, GitHub Copilot CLI, and Agent mode in VS Code

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

### 🖥️ Demo: Create a Skill from Scratch

1. Create the directory structure:

```bash
mkdir -p .github/skills/github-actions-debugging
```

2. Create `.github/skills/github-actions-debugging/SKILL.md`:

```yaml
---
name: github-actions-debugging
description: Guide for debugging failing GitHub Actions workflows.
  Use this when asked to debug failing GitHub Actions workflows.
---

To debug failing GitHub Actions workflows in a pull request, follow this process:

1. Use the `list_workflow_runs` tool to look up recent workflow runs for the
   pull request and their status
2. Use the `summarize_job_log_failures` tool to get an AI summary of the logs
   for failed jobs, to understand what went wrong without filling your context
   window with thousands of lines of logs
3. If you still need more information, use the `get_job_logs` or
   `get_workflow_run_logs` tool to get the full, detailed failure logs
4. Try to reproduce the failure yourself in your own environment
5. Fix the failing build. If you were able to reproduce the failure yourself,
   make sure it is fixed before committing your changes
```

3. Show how Copilot auto-selects the skill:
   - Ask Copilot: `Help me debug why the CI workflow is failing on my PR`
   - Show the skill being loaded (Copilot will reference the skill's instructions)

**Talking point**: "You didn't invoke the skill — Copilot chose it because your prompt matched the skill's description. This is the key difference from prompt files."

### 🖥️ Demo: Reference External Skill Collections

Show attendees where to find community skills:
- [anthropics/skills](https://github.com/anthropics/skills) — Anthropic's reference skills
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — community-curated collection

**Talking point**: "Skills are an open standard. You can use skills from the community or write your own."

### 🧪 Hands-On: Create a Skill for OctoCAT Supply (7 min)

Create a skill relevant to the project. Recommended:

**Option A: `api-route-creation` skill**

```bash
mkdir -p .github/skills/api-route-creation
```

Create `SKILL.md` that teaches Copilot how to create new API routes following the project's patterns (reference existing routes as templates).

**Option B: `react-component-creation` skill**

```bash
mkdir -p .github/skills/react-component-creation
```

Create `SKILL.md` that teaches Copilot the project's React component conventions (functional components, Tailwind CSS, TypeScript).

### Success Criteria

- ✅ You've created a `.github/skills/` directory with a working SKILL.md
- ✅ You understand skills vs instructions (auto-selected vs always-on)
- ✅ You've seen Copilot auto-select a skill based on your prompt

---

## 8. MCP Servers — Playwright + GitHub (25 min)

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

### 🖥️ Demo: Start MCP Servers

1. Open the Command Palette → `MCP: List servers`
2. Show both servers listed
3. Start **Playwright**: Select `playwright` → `Start server`
4. Start **GitHub**: Select `github` → `Start server` (first time: OAuth auth flow)

**Alternative**: Open `.vscode/mcp.json` and use the HUD display above each server to start them.

### 🖥️ Demo: Playwright MCP — Browser Testing from Natural Language

> **Prerequisite**: App must be running locally (`npm run dev`). Playwright MCP does NOT work in Codespaces.

1. Ensure Playwright MCP server is running
2. Switch to Agent mode
3. Enter: `Browse to http://localhost:5137 and navigate to the Products page. Describe what you see.`
4. Show Copilot:
   - Sending commands to the Playwright browser
   - Navigating to the site
   - Describing the UI elements it finds
5. Follow up: `Click on one of the products and check if the product details are displayed correctly`
6. Show Copilot interacting with the page and reporting results

**Talking point**: "You just ran a functional test using natural language. No test scripts, no selectors, no framework setup. Copilot uses Playwright behind the scenes to drive a real browser."

### 🖥️ Demo: Generate BDD Test Scenarios

1. Enter: `Generate a Gherkin .feature file to test the Products page functionality`
2. Show the generated `.feature` file with scenarios like:
   - `Given I navigate to the Products page`
   - `Then I should see a list of products`
   - `When I click on a product`
   - `Then I should see the product details`
3. (Optional) Ask Copilot to execute the .feature file using Playwright

**Talking point**: "MCP bridges the gap between Copilot and the real world. It's not just generating test code — it's running a browser and observing the results."

### 🖥️ Demo: GitHub MCP — Interacting with GitHub from Chat

1. Ensure GitHub MCP server is running
2. Switch to Agent mode
3. Enter: `Check which issues are assigned to me in this repo`
4. Show Copilot fetching issues via the GitHub API
5. Enter: `Create an Issue for enhancing test coverage in the API project and assign it to me`
6. Show the issue being created with:
   - Meaningful title and description
   - Appropriate labels
   - Correct assignee

**Talking point**: "You just managed your GitHub project without leaving VS Code. The GitHub MCP server gives Copilot full access to issues, PRs, and repo data."

### 🧪 Hands-On: Use Playwright MCP (8 min)

1. Start the Playwright MCP server
2. Ask Copilot to browse to your running app and test a feature:
   - `Browse to http://localhost:5137, go to Products, and verify all products have images and prices displayed`
3. Try generating a `.feature` file for a specific page
4. (Bonus) Ask Copilot to execute the feature file

### Success Criteria

- ✅ Both MCP servers are running (check via `MCP: List servers`)
- ✅ You've seen Playwright navigate your app from a chat prompt
- ✅ You've seen GitHub MCP create an issue in your repo

---

## 9. Vision + Agent Mode Deep Dive — Cart Page (25 min)

### Key Points

- Copilot Vision can understand images — screenshots, mockups, design files
- Combined with Agent mode, this enables "image to working feature" workflows
- This is the capstone demo: everything we've learned comes together

### The Plan → Agent Workflow

```
  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
  │   Plan Mode     │     │   Agent Mode    │     │   Running App   │
  │                 │     │                 │     │                 │
  │  Analyze image  │────►│  Implement the  │────►│  Working cart   │
  │  Create plan    │     │  changes        │     │  functionality  │
  │  Get feedback   │     │  Multiple files │     │                 │
  └─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 🖥️ Demo: Build the Cart Page from an Image

**Before State**: Show the Products page — clicking "Add to Cart" shows a toast message but there's no actual cart.

**Step 1: Plan with Vision**

1. Open Copilot Chat → switch to **Plan** mode
2. Drag `docs/design/cart.png` into the chat (or use the paperclip icon)
3. Enter:

```
I need to implement a simple Cart Page. I also want a Cart icon in the
NavBar that shows the number of items in the Cart.
```

4. Show Copilot:
   - Analyzing the image (Vision) — identifying UI elements, layout, colors
   - Proposing a structured implementation plan
   - Listing which files need to be created/modified
5. Review the plan — ask Copilot to modify if needed (e.g., "remove the discount code feature")

**Talking point**: "We're not coding yet. Plan mode forces Copilot to think first. Notice how it understood the cart design from the image — the layout, the buttons, the quantity selectors."

**Step 2: Implement with Agent**

1. Switch to **Agent** mode (keep the conversation context)
2. Enter: `Implement the changes.`
3. Show Copilot:
   - Creating new React components (CartPage, CartIcon, CartContext)
   - Modifying the NavBar to include the cart icon
   - Updating route configuration
   - Adding state management for cart items
4. Watch as Copilot iterates — creating files, checking for errors, fixing issues

**Step 3: Verify**

1. Show the running app in the browser
2. Navigate to Products → Add items to cart → Note the cart icon updating
3. Click the Cart icon → Show the Cart page with items, quantities, and total

**Talking point**: "From a PNG image to a working cart feature in minutes. Copilot read the design, planned the architecture, and implemented across multiple files. This is what 'agentic' means — it's not autocomplete, it's a collaborator."

### 🧪 Hands-On: Add a Product from an Image (10 min)

Use the Mona Figurine design image to add a new product:

1. Open Agent mode
2. Drag `docs/design/MonaFigurine.png` into the chat
3. Enter:

```
Using the image, create a new product offering on the OctoCAT Supply website.
Price is $32.99, SKU is MONA-001, and description is "A beautiful handcrafted
figurine inspired by the Mona Lisa."
```

4. Accept the changes and verify in the running app

### Success Criteria

- ✅ You've used Vision (dragging an image into chat)
- ✅ You've used the Plan → Agent workflow
- ✅ Cart page is working in your app (or the Mona figurine product is added)

---

## 10. Cloud Agents: Coding Agent + PR Review Agent (20 min)

### Key Points

- Cloud agents operate at the platform level — they run on GitHub, not in your IDE
- Two key cloud agents:
  - **Coding Agent**: Assign a GitHub Issue to Copilot → it codes autonomously and creates a PR
  - **PR Review Agent (Copilot Code Review)**: Request Copilot as a reviewer on a PR → it provides AI-powered code review comments

### The Autonomous Development Loop

```
┌──────────────┐     ┌────────────────┐     ┌──────────────┐     ┌──────────────┐
│  Create Issue │────►│ Coding Agent   │────►│  PR Created  │────►│ Copilot      │
│  (or assign   │     │ writes code    │     │  (autonomous)│     │ Code Review  │
│   to Copilot) │     │ autonomously   │     │              │     │              │
└──────────────┘     └────────────────┘     └──────────────┘     └──────┬───────┘
                                                                        │
                                                              ┌────────▼───────┐
                                                              │ Human reviews  │
                                                              │ & merges       │
                                                              └────────────────┘
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

### 🖥️ Demo: Assign an Issue to Coding Agent

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

### 🖥️ Demo: Show the Custom Agent → Coding Agent Handoff

1. Recall the `ImplementationIdeas.agent.md` from Section 6
2. Show the key line: `call GitHub's create_pull_request_with_copilot`
3. Explain: "Custom agents (IDE-level) can delegate to the Coding Agent (cloud-level). Your IDE agent researches and plans, then hands off implementation to run autonomously."

### Part B: Copilot Code Review / PR Review Agent (10 min)

**Concept**:
- Add Copilot as a reviewer on any PR — it provides AI-powered code review
- Reviews cover: correctness, security, performance, style, best practices
- Provides inline comments with severity levels and suggested fixes
- Complementary to human review, not a replacement

### 🖥️ Demo: Request Copilot Review on a PR

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

## 11. Wrap-Up, Customization Hierarchy Recap & Q&A (10 min)

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
│                  INTERACTION MODES                           │
│  Ask (explore) → Edit (refactor) → Agent (build)           │
└────────────────────────────┬───────────────────────────────┘
                             │
┌────────────────────────────▼───────────────────────────────┐
│                  GITHUB CLI                                 │
│  gh copilot (AI commands) + gh issue/pr (project mgmt)     │
└────────────────────────────────────────────────────────────┘
```

### Key Takeaways

1. **Modes are your foundation** — Ask for understanding, Edit for precision, Agent for building
2. **GitHub CLI is your power-user interface** — `gh copilot` for command assistance, `gh issue`/`gh pr` for project management
3. **Custom Instructions encode tribal knowledge** — internal frameworks, standards, architecture patterns
4. **Prompt Files create consistency** — reusable templates that any team member can run
5. **Agents are persistent personas** — they change how Copilot behaves for an entire session
6. **Skills are auto-selected** — Copilot loads them when relevant, no manual invocation needed
7. **MCP extends Copilot's reach** — connect it to browsers, APIs, databases, and any external tool
8. **Cloud agents close the loop** — from issue to PR to code review, all AI-assisted

### What You Built Today

| File | Section |
|------|---------|
| GitHub CLI issue | §3 — GitHub CLI |
| `.github/copilot-instructions.md` | §4 — Custom Instructions |
| `.github/instructions/API.instructions.md` | §4 — Scoped Instructions |
| `.github/prompts/security-review.prompt.md` | §5 — Custom Prompt Files |
| `.github/agents/CodeReviewer.agent.md` | §6 — Custom Agents |
| `.github/skills/*/SKILL.md` | §7 — Agent Skills |
| Cart page implementation | §9 — Vision + Agent |

### Resources

| Resource | URL |
|----------|-----|
| GitHub Copilot Docs | https://docs.github.com/en/copilot |
| GitHub CLI | https://cli.github.com |
| Copilot in the CLI | https://docs.github.com/en/copilot/github-copilot-in-the-cli |
| Custom Instructions | https://docs.github.com/en/copilot/how-tos/configure-custom-instructions |
| Prompt Files | https://docs.github.com/en/copilot/how-tos/copilot-prompts |
| Agent Skills | https://docs.github.com/en/copilot/concepts/agents/about-agent-skills |
| MCP Servers | https://docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot |
| Copilot Coding Agent | https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent |
| Copilot Code Review | https://docs.github.com/en/copilot/using-github-copilot/code-review |
| Copilot Trust Center | https://resources.github.com/copilot-trust-center/ |
| OctoCAT Supply Repo | https://github.com/microsoft/GitHubCopilot_Customized |
| Community Skills | https://github.com/github/awesome-copilot |

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
| MCP config | `.vscode/mcp.json` | `.json` | When server started |

### Prompt File Frontmatter Reference

```yaml
---
mode: 'agent'              # 'ask', 'edit', or 'agent'
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
| MCP server won't start | Check `MCP: List servers`, verify Docker/Node.js |
| Playwright MCP fails | Must run locally (not Codespaces), check port 5137 |
| GitHub MCP auth error | Re-authenticate via OAuth, or use PAT with correct scopes |
| CORS errors in Codespaces | Set API port (3000) visibility to `public` |
| Agent mode not available | Update VS Code and Copilot extension to latest |
| Skills not loading | Verify `SKILL.md` filename (case-sensitive), check description matches prompt |
| Custom instructions ignored | Verify file is in `.github/` root, check for syntax errors |
| `gh` CLI not found | Install from [cli.github.com](https://cli.github.com), then run `gh auth login` |
| `gh copilot` not available | Run `gh extension install github/gh-copilot` to install the extension |

---

*Workshop materials prepared for GitHub Copilot: Zero to Agents training session*
*Demo repo: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)*
