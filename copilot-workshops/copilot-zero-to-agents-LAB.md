# GitHub Copilot: Zero to Agents — Hands-On Lab Guide

**Duration**: ~105 minutes of hands-on exercises (across a 4-hour workshop)  
**Format**: Step-by-step lab exercises  
**Audience**: Developers with basic Copilot exposure (completions/chat)  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

---

## Lab Overview

This lab guide contains all the hands-on exercises from the **GitHub Copilot: Zero to Agents** workshop. Each lab maps to a workshop section and builds on the previous one. Complete them in order.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher |
| **npm** | Latest version recommended |
| **Git** | For cloning the demo repository |
| **GitHub CLI** | `gh` — install from [cli.github.com](https://cli.github.com) |

---

<details>
<summary><h2>Lab 1: Environment Setup (10 min)</h2></summary>

> **Workshop Section**: 1 — Welcome, Objectives & Environment Setup

### Steps

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

> **Note**: If using Codespaces, ensure API port (3000) visibility is set to `public` to avoid CORS errors.

### Success Criteria

- ✅ Repository is forked and cloned locally
- ✅ `npm install` and `npm run build` completed without errors
- ✅ API is running on `http://localhost:3000`
- ✅ Frontend is running on `http://localhost:5137`
- ✅ Copilot extension is active in VS Code

</details>

---

<details>
<summary><h2>Lab 2: Try All Three Chat Modes (8 min)</h2></summary>

> **Workshop Section**: 2 — Copilot Chat Modes: Ask, Agent, Plan

### Mode Reference

| Mode | Best For | Output |
|------|----------|--------|
| **Ask** | Exploring, learning, understanding code | Text explanations, code snippets in chat |
| **Agent** | Building features, editing code, running commands | Creates/edits files (single or multi-file), runs commands |
| **Plan** | Analyzing, planning, proposing changes | Implementation plans and proposals (no file changes) |

### Steps

**Exercise 1 — Ask Mode**:

1. Open Copilot Chat → select **Ask** mode from the dropdown
2. Enter the following prompt:

```
What testing framework does this project use and what's the current test coverage?
```

3. Note the answer — you'll use this information in Lab 5 when generating tests

**Exercise 2 — Plan Mode**:

1. Switch to **Plan** mode from the mode dropdown
2. Enter the following prompt:

```
How should I add comprehensive error handling to the API routes?
```

3. Review the plan Copilot proposes — notice it lists which files need to change, what approach to take, and step-by-step instructions
4. Importantly, Plan mode does NOT create or modify any files — it only proposes

**Exercise 3 — Agent Mode**:

1. Switch to **Agent** mode
2. If your app isn't already running, enter:

```
Build and run the project
```

3. Then enter:

```
Open the Swagger documentation page for the API
```

### Success Criteria

- ✅ You can switch between Ask, Agent, and Plan modes
- ✅ You've received a codebase-aware answer from Ask mode
- ✅ You've seen Plan mode propose changes without modifying files
- ✅ Agent mode has created or edited files and run terminal commands
- ✅ Your app is running (API on :3000, Frontend on :5137)

</details>

---

<details>
<summary><h2>Lab 3: GitHub CLI — Copilot in the Terminal (15 min)</h2></summary>

> **Workshop Section**: 3 — GitHub CLI: Copilot in the Terminal & Project Management

### Quick Reference

| Command | What It Does |
|---------|-------------|
| `gh copilot suggest "..."` | AI-generated shell command from natural language |
| `gh copilot explain "..."` | Plain-English explanation of a command |
| `gh issue list` | List issues in the current repo |
| `gh issue create` | Create a new issue |
| `gh pr list` | List pull requests |
| `gh pr create` | Create a pull request |

### Steps

**Exercise 1 — Verify Setup**:

1. Open the VS Code integrated terminal
2. Confirm the CLI is installed and you're authenticated:

```bash
gh --version
```

```bash
gh auth status
```

> **Note**: If `gh auth status` shows you're not authenticated, run `gh auth login` and follow the prompts.

**Exercise 2 — Copilot Suggest**:

1. Ask Copilot to generate a git command from plain English:

```bash
gh copilot suggest "show me the most recent commits on main with a graph"
```

2. Review the suggested command — Copilot will show it and ask if you want to run it
3. Execute the suggested command
4. Try another one — ask for something you'd normally have to look up:

```bash
gh copilot suggest "find all TypeScript files modified in the last week"
```

**Exercise 3 — Copilot Explain**:

1. Paste a command you've seen but don't fully understand:

```bash
gh copilot explain "git log --oneline --graph --all --decorate"
```

2. Read the step-by-step breakdown Copilot provides
3. Try explaining a GitHub API command:

```bash
gh copilot explain "gh api repos/{owner}/{repo}/branches/main/protection --method PUT"
```

**Exercise 4 — Issue Management**:

1. List existing issues in your repo:

```bash
gh issue list
```

2. Create an issue — we'll use this in Lab 9 (Vision) or for Coding Agent later:

```bash
gh issue create --title "Add input validation to Product API" --body "The POST /api/products endpoint accepts any payload without validation. Add schema validation for required fields (name, price, supplierId)."
```

3. Verify it was created:

```bash
gh issue list
```

4. View the issue details in your browser:

```bash
gh issue view --web
```

**Exercise 5 — PR Workflow** (Bonus):

1. List any open pull requests:

```bash
gh pr list
```

2. Check the status of the current branch's PR (if any):

```bash
gh pr status
```

**Exercise 6 — Type Hints**:

1. Run a suggest command WITHOUT a type hint:

```bash
gh copilot suggest "show me which branches have been merged into main"
```

2. Notice the suggestion type — it might be `gh`, `git`, or `shell`

3. Now run the SAME prompt WITH a type hint:

```bash
gh copilot suggest -t git "show me which branches have been merged into main"
```

4. Compare the two results — the `-t git` flag steers Copilot to a `git` command

5. Try steering to a `gh` command:

```bash
gh copilot suggest -t gh "find PRs that haven't been reviewed yet"
```

> **Type hint values**: `-t shell` (OS commands), `-t git` (git commands), `-t gh` (GitHub CLI commands)

**Exercise 7 — Structured Output with `--json` / `--jq`**:

1. List issues as JSON:

```bash
gh issue list --json number,title,assignees
```

2. Extract just the titles using `--jq`:

```bash
gh issue list --json title --jq '.[].title'
```

3. Try with PRs (if any exist):

```bash
gh pr list --json number,title,reviewDecision
```

4. Combine to get a compact summary:

```bash
gh issue list --json number,title --jq '.[] | "#\(.number): \(.title)"'
```

> **Pro tip**: Use `gh issue list --json` (no fields) to see all available JSON fields.

### Success Criteria

- ✅ `gh auth status` shows you are authenticated
- ✅ You've used `gh copilot suggest` to generate a command from natural language
- ✅ You've used `gh copilot explain` to understand a command
- ✅ You've created an issue from the terminal with `gh issue create`
- ✅ You've viewed the issue in the browser with `gh issue view --web`
- ✅ You've used `-t` type hints to steer `suggest` to a specific command category
- ✅ You've used `--json` and `--jq` to get structured output from the CLI

</details>

---

<details>
<summary><h2>Lab 4: Create Custom Instructions (12 min)</h2></summary>

> **Workshop Section**: 4 — Custom Instructions

### Why This Matters

Custom instructions are the **simplest and highest-impact** way to personalize Copilot. They're loaded into every Copilot interaction automatically — think of them as "tribal knowledge" that Copilot always has access to. Without them, Copilot uses generic best practices. With them, it follows YOUR team's standards.

### Reference: Customization Hierarchy

| Layer | File Location | When Loaded |
|-------|---------------|-------------|
| **Custom Instructions** | `.github/copilot-instructions.md` | Always (every interaction) |
| **Scoped Instructions** | `.github/instructions/*.instructions.md` | When matching files are active |

### What Makes Good Instructions?

| ✅ Good Candidates | ✗ Bad Candidates |
|-----------------|----------------|
| Coding standards (naming, style) | Entire API documentation |
| Internal framework references | Step-by-step tutorials |
| Architecture patterns to follow | Complete code examples |
| Security requirements (no hardcoded creds) | Business logic rules |
| Testing conventions | Long prose explanations |

> **Note**: Keep instructions concise. They're loaded on every interaction and consume context window space. Think bullet points, not paragraphs.

### Steps

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

### Success Criteria

- ✅ `.github/copilot-instructions.md` exists in your repo
- ✅ `.github/instructions/API.instructions.md` exists with `applyTo: "api/**"`
- ✅ You've compared Copilot's responses before and after adding instructions and noticed the difference
- ✅ You understand that instructions are always-on background context

</details>

---

<details>
<summary><h2>Lab 5: Create and Run Prompt Files (12 min)</h2></summary>

> **Workshop Section**: 5 — Custom Prompt Files

### Why This Matters

Prompt files are **reusable task templates** that encode complex workflows into a single file. Instead of explaining the same task to Copilot every time, you write it once and anyone on the team can run it. Think of them as "recipes" — a junior developer can run a senior developer's testing prompt and get senior-quality output.

### Reference: Prompt File Structure

```yaml
---
mode: 'agent'                    # Which mode to use (ask, agent, plan)
description: 'Description here'  # Shows in the prompt picker
tools: ['changes', 'codebase',   # Which tools the agent can use
  'editFiles', 'runCommands',
  'search', 'terminalLastCommand']
---

# Prompt content goes here (Markdown)
```

### How to Run a Prompt

There are three ways to run a prompt file:

1. **Run button**: Open the `.prompt.md` file → click the ▶️ **Run** button at the top
2. **Command Palette**: `Ctrl+Shift+P` → type "Prompts: Run Prompt" → select from the list
3. **Chat shortcut**: Type `/` in Copilot Chat and select the prompt name

### Steps

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

3. Run the prompt using any of the three methods above
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

### Success Criteria

- ✅ You've explored the existing prompt files and understand their structure
- ✅ You've run a prompt and watched Copilot execute a multi-step task
- ✅ You've created `security-review.prompt.md` and run it successfully
- ✅ You understand the three ways to invoke a prompt file

</details>

---

<details>
<summary><h2>Lab 6: Create a Custom Agent (10 min)</h2></summary>

> **Workshop Section**: 6 — Custom Agents (Chat Modes)

### Why This Matters

Custom agents are **persistent personas** that stay active for an entire chat session. While a prompt file runs once and gives you a result, an agent changes how Copilot behaves for every message you send. Think of agents as hiring a specialist — once selected, every interaction is filtered through that specialist's expertise and toolset.

### Reference: Agents vs Prompts

| Feature | Prompt Files | Custom Agents |
|---------|-------------|---------------|
| **Location** | `.github/prompts/` | `.github/agents/` |
| **Extension** | `.prompt.md` | `.agent.md` |
| **Invocation** | On-demand (Run button, `/name`) | Selected as active chat mode |
| **Persistence** | Single execution | Active for entire chat session |
| **Best for** | Specific tasks | Ongoing personas/workflows |

### Agent Frontmatter Reference

```yaml
---
tools: ['codebase', 'search']     # Which tools the agent can use
description: 'What this agent does' # Shows in the mode picker dropdown
model: Claude Sonnet 4              # Optional — specify the AI model
---
```

**Available tools** include: `codebase`, `search`, `editFiles`, `runCommands`, `usages`, `problems`, `changes`, `fetch`, `githubRepo`, `todos`, `github/*` (all GitHub MCP tools), `playwright/*` (all Playwright tools)

### Steps

**Exercise 1 — Explore the Existing Agent**

1. Open `.github/agents/ImplementationIdeas.agent.md`
2. Read through the file and notice:
   - The **tools** list includes `github/*` and `playwright/*` — MCP server tools
   - The **model** is specified — the agent picks its own model (`Claude Sonnet 4.5`)
   - The behavior instructions tell it to research deeply, use parallel searches, and delegate to Coding Agent
   - Key line: `call GitHub's create_pull_request_with_copilot` — this agent can trigger other agents!
3. Open the Copilot Chat mode picker (dropdown at the top) and find "ImplementationIdeas" in the list

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

**Exercise 4 — Create Your Own Agent**

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

### Success Criteria

- ✅ You've explored the existing ImplementationIdeas agent and understand how it's structured
- ✅ You've created the CodeReviewer agent and tested it with a review request
- ✅ You've created your own custom agent and it appears in the chat mode picker
- ✅ You understand that agents persist for the entire chat session, unlike prompts

</details>

---

<details>
<summary><h2>Lab 7: Create an Agent Skill (12 min)</h2></summary>

> **Workshop Section**: 7 — Agent Skills

### Why This Matters

Agent Skills are the **smartest** customization layer — Copilot automatically loads them when it determines they're relevant to your prompt. You don't invoke them; Copilot chooses them. This makes skills ideal for detailed, specialized procedures that would be too verbose for always-on instructions.

Skills are also an [open standard](https://github.com/agentskills/agentskills) used by Copilot Coding Agent, Copilot CLI, and Agent mode in VS Code.

### Reference: Skills vs Instructions vs Prompts

| Aspect | Custom Instructions | Agent Skills | Prompt Files |
|--------|-------------------|--------------|-------------|
| **Location** | `.github/copilot-instructions.md` | `.github/skills/*/SKILL.md` | `.github/prompts/*.prompt.md` |
| **When loaded** | Always, every interaction | Auto-selected by relevance | Manually invoked |
| **Best for** | Simple, universal rules | Detailed, specialized procedures | Specific task templates |
| **Can include** | Markdown text only | Markdown + scripts + resource files | Markdown with YAML frontmatter |

**Rule of thumb**: Instructions = "always true" rules. Skills = "when doing X, follow these detailed steps." Prompts = "do this specific task now."

### Skill File Structure

```
.github/skills/
└── api-route-creation/
    ├── SKILL.md              # Required — instructions + frontmatter
    ├── route-template.ts     # Optional — example files Copilot can reference
    └── test-template.ts      # Optional — additional resources
```

### Steps

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

### Where to Find More Skills

- [anthropics/skills](https://github.com/anthropics/skills) — Anthropic's reference skills
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — community-curated collection

### Personal Skills

You can also create **personal skills** that apply across all your repos:
- Location: `~/.copilot/skills/*/SKILL.md`
- These are private to your machine — not shared via git
- Great for personal coding preferences or tools only you use

### Success Criteria

- ✅ You've created `.github/skills/api-route-creation/SKILL.md` with a complete step-by-step guide
- ✅ You've tested the skill by asking Copilot to create a new entity and observed it following your steps
- ✅ You understand the difference: instructions = always-on, skills = auto-selected, prompts = manually invoked

</details>

---

<details>
<summary><h2>Lab 8: MCP Servers (Playwright + GitHub) (15 min)</h2></summary>

> **Workshop Section**: 8 — MCP Servers (Playwright + GitHub)

### Why This Matters

MCP (Model Context Protocol) extends Copilot beyond code — connecting it to browsers, APIs, databases, and external tools. Without MCP, Copilot can only read and write files. With MCP, it can browse your running app, interact with GitHub's API, query databases, and more. The two MCP servers in this project are:

- **Playwright** — drives a real browser so Copilot can see and interact with your app
- **GitHub** — gives Copilot access to issues, PRs, and repo data via GitHub's API

### Prerequisites

- Your app must be running locally (`npm run dev`)
- Playwright MCP does **NOT** work in Codespaces (it needs a local browser)

### Reference: MCP Configuration

The repo's `.vscode/mcp.json` configures both servers:

| Server | Type | How It Works |
|--------|------|--------------|
| **GitHub** | HTTP (remote) | Connects to `api.githubcopilot.com`, OAuth authentication |
| **Playwright** | stdio (local) | Runs `npx @playwright/mcp@latest`, launches a local browser |

### Steps

**Exercise 1 — Start the MCP Servers**

1. Open `.vscode/mcp.json` in the editor — you'll see a HUD display above each server with a **Start** button. Click **Start** for both servers.

   > **Alternative**: Open the Command Palette (`Ctrl+Shift+P`) → type `MCP: List servers` → start each server from the list.

2. For the **GitHub** server: The first time you start it, you'll see an OAuth authentication flow. Follow the prompts to authorize Copilot to access your GitHub account.

3. Verify both servers are running: Command Palette → `MCP: List servers` — both should show a green status.

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

**Exercise 4 — Generate BDD Test Scenarios**

1. Ask Copilot to create a formal test specification:

```
Based on what you've seen in the app, generate a Gherkin .feature file that tests the Products page functionality including viewing products, viewing product details, and the add-to-cart behavior
```

2. Review the generated `.feature` file — it should contain scenarios like:
   - `Given I navigate to the Products page`
   - `Then I should see a list of products`
   - `When I click on a product`
   - `Then I should see the product details`

**Exercise 5 — GitHub MCP: Manage Issues from Chat**

1. With the GitHub MCP server running, ask Copilot:

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

### Success Criteria

- ✅ Both MCP servers are running (green status in `MCP: List servers`)
- ✅ You've seen Playwright navigate your app and describe what it sees
- ✅ You've run a natural-language functional test against your running app
- ✅ You've used GitHub MCP to create or list issues from Copilot Chat
- ✅ You understand that MCP connects Copilot to the real world beyond just code files

</details>

---

<details>
<summary><h2>Lab 9: Vision + Agent Mode Deep Dive — Image to Implementation (15 min)</h2></summary>

> **Workshop Section**: 9 — Vision + Agent Mode Deep Dive (Cart Page)

### Why This Matters

This is the capstone lab — everything you've learned comes together. Copilot Vision can **understand images** (screenshots, mockups, wireframes, design files) and combined with Agent mode, turn them into working features. This is the closest thing to "showing your AI pair programmer a design and saying 'build this.'"

### The Plan → Agent Workflow

The most effective pattern for complex features is a two-phase approach:

```
  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
  │   Plan First    │     │  Then Implement │     │  Then Verify    │
  │                 │     │                 │     │                 │
  │  Analyze image  │────►│  Agent builds   │────►│  Check running  │
  │  Discuss plan   │     │  across files   │     │  app in browser │
  │  Refine scope   │     │  Self-heals     │     │                 │
  └─────────────────┘     └─────────────────┘     └─────────────────┘
```

> **Note**: Planning first prevents Copilot from charging ahead and building something you didn't want. It's faster to correct a plan than to undo generated code.

### How to Use Vision

There are two ways to attach images to Copilot Chat:
1. **Drag and drop** — drag an image file from the file explorer or your desktop into the chat input
2. **Paperclip icon** — click the 📎 icon in the chat input and select a file

Supported formats: PNG, JPG, GIF, WebP. Copilot will analyze the image and understand UI layout, colors, text, icons, and component structure.

### Steps

**Exercise 1 — Add a New Product Using Vision**

1. Make sure your app is running (`npm run dev`)
2. Open the Products page in your browser (`http://localhost:5137`) — note the current products
3. Open Copilot Chat → switch to **Agent** mode
4. Drag `docs/design/MonaFigurine.png` into the chat (or use the paperclip icon)
5. Enter the following prompt:

```
Using the image, create a new product offering on the OctoCAT Supply website.
Price is $32.99, SKU is MONA-001, and description is "A beautiful handcrafted
figurine inspired by the Mona Lisa."
```

6. Watch Copilot:
   - Analyze the image (identifying the figurine, its appearance, colors)
   - Determine which files need to change (product data, possibly images)
   - Make the changes across the codebase
7. Review and accept the changes
8. Verify in the browser: Refresh the Products page — the Mona Figurine should appear

**Exercise 2 — Build the Cart Page (Plan → Agent)**

This is the full design-to-implementation workflow:

**Phase 1: Plan**

1. Open a **new** Copilot Chat session (click the + icon for a fresh conversation)
2. Drag `docs/design/cart.png` into the chat
3. Enter:

```
I need to implement a simple Cart Page based on this design. I also want a
Cart icon in the NavBar that shows the number of items in the Cart.
Please analyze the design and create a detailed implementation plan before
writing any code.
```

4. Review the plan Copilot proposes. It should include:
   - Which new files need to be created (CartPage, CartIcon, CartContext)
   - Which existing files need to be modified (NavBar, routes)
   - The state management approach (React Context, local state)
   - The UI components and their relationships
5. If you want to adjust the scope, tell Copilot:
   - `Remove the discount code feature — keep it simple`
   - `Use local state instead of Context for now`
   - `Don't worry about the checkout button — just show the cart contents`

**Phase 2: Implement**

1. Once you're happy with the plan, enter:

```
Implement the changes based on the plan.
```

2. Watch Copilot work across multiple files:
   - Creating new React components
   - Modifying the NavBar
   - Updating route configuration
   - Adding state management
3. Copilot may iterate — if it encounters errors, it will read them and fix them automatically

**Phase 3: Verify**

1. Open the app in your browser (`http://localhost:5137`)
2. Navigate to Products → click "Add to Cart" on several products
3. Check the NavBar — the cart icon should show the item count
4. Click the Cart icon → verify the Cart page shows your items with quantities and totals

**Exercise 3 — Use Playwright to Validate** (Bonus)

If you have Playwright MCP running from Lab 8, combine Vision output with browser testing:

```
Using Playwright, browse to http://localhost:5137, add three different products to the
cart, navigate to the cart page, and verify that all three products appear with the
correct prices and quantities.
```

### Tips for Vision + Agent Success

- **Be specific about requirements**: Include prices, SKUs, field names — don't make Copilot guess business data
- **Plan before implementing**: For features with more than 2-3 files, always plan first
- **Iterate on the plan**: It's cheaper to revise a plan than to undo generated code
- **Use follow-up prompts**: After initial implementation, ask for refinements: `Make the cart icon animate when an item is added`

### Success Criteria

- ✅ You've attached an image to Copilot Chat using drag-and-drop or the paperclip icon
- ✅ The Mona Figurine product appears on the Products page
- ✅ You've used the Plan → Implement → Verify workflow for the cart feature
- ✅ The Cart page is functional (or you've made significant progress on it)
- ✅ You understand how Vision, Agent mode, and MCP work together as a complete workflow

</details>

---

## Troubleshooting

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

## Resources

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
| Copilot SDK | https://github.com/github/copilot-sdk |
| OctoCAT Supply Repo | https://github.com/microsoft/GitHubCopilot_Customized |
| Community Skills | https://github.com/github/awesome-copilot |

---

*Hands-on lab guide for GitHub Copilot: Zero to Agents training session*
*Demo repo: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)*
