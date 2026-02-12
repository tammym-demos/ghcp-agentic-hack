# GitHub Copilot: Zero to Agents — Demo Scripts

## Instructor Reference

**Duration**: 4 hours  
**Total Demo Time**: ~128 minutes (including hands-on)  
**Environment**: VS Code + GitHub Browser + Terminal  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)

---

> **Important**: Copilot is non-deterministic. Outputs will vary between runs. Practice these demos beforehand and be comfortable pivoting if responses differ from what's documented here.

---

## Pre-Demo Checklist

Run through this **the day before** and again **30 minutes before** the workshop:

### Environment

- [ ] Repo forked to your account and cloned locally
- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts both API (:3000) and Frontend (:5137)
- [ ] API Swagger docs accessible at `http://localhost:3000/api-docs`
- [ ] Frontend loads and Products page displays items
- [ ] VS Code is using latest stable (or Insiders for preview features)
- [ ] VS Code font size increased for projection (Settings → Editor → Font Size → 16-18)

### Copilot

- [ ] GitHub Copilot extension installed and up to date
- [ ] GitHub Copilot Chat extension installed and up to date
- [ ] Signed in to Copilot (check: `Cmd/Ctrl + Shift + P` → "Copilot: Sign In")
- [ ] Agent mode is available in chat mode picker
- [ ] Multiple models available (Claude Sonnet 4, GPT-4o, etc.)

### GitHub CLI

- [ ] `gh` installed and on PATH (`gh --version` returns 2.x+)
- [ ] Authenticated (`gh auth status` shows logged in)
- [ ] `gh copilot` extension installed (`gh extension list` shows `github/gh-copilot`)
- [ ] If not installed: `gh extension install github/gh-copilot`

### MCP Servers

- [ ] `.vscode/mcp.json` exists with github + playwright servers
- [ ] Playwright MCP starts: `MCP: List servers` → `playwright` → `Start server`
- [ ] GitHub MCP starts: `MCP: List servers` → `github` → `Start server`
- [ ] OAuth flow completes for GitHub MCP (first time: browser opens for auth)

### GitHub Repo

- [ ] Actions enabled on the fork
- [ ] Branch protection rule on `main` (require PR, 1 reviewer)
- [ ] Copilot Coding Agent enabled in repo settings
- [ ] At least one open Issue exists (or pre-create Issue #1 for test coverage)
- [ ] A PR exists or is ready to create (for PR Review Agent demo)
- [ ] Fine-grained PAT ready (if using local Docker-based GitHub MCP)

### Browser

- [ ] Bookmarks folder with: GitHub repo, API Swagger, Frontend, GitHub Copilot Docs
- [ ] Logged in to GitHub as the demo account
- [ ] Incognito/private window ready as backup

### Backup Materials

- [ ] Screenshots of each demo step in a local folder
- [ ] Pre-recorded GIFs for critical demos (cart implementation, MCP browser)
- [ ] GitHub Docs tabs open for each feature as fallback

---

## Demo 1: Copilot Chat Modes (Section 2)

**Objective**: Show the three chat modes and when to use each  
**Duration**: 5 min demo + 8 min hands-on = 13 min  
**After Slide**: 10

### Setup Before Demo

- App running (`npm run dev`)
- VS Code open with the project
- Copilot Chat panel open (sidebar)
- No prior chat history (start fresh: click "+" for new chat)

### Step-by-Step Script

#### Part A: Ask Mode (2 min)

1. **Open Copilot Chat** → Click the mode dropdown → Select **Ask**
2. **Enter prompt**:
   ```
   Please give me details about the API of this project.
   ```
3. **Show the response**: Point out how Copilot references:
   - The Express.js architecture
   - Specific route files (`product.ts`, `supplier.ts`, `branch.ts`)
   - The Swagger/OpenAPI documentation
   - Entity models and relationships
4. **Talking point**: "Ask mode read your entire codebase and gave you an architectural overview. It didn't change any files — it's read-only intelligence."
5. **Follow-up prompt**:
   ```
   Are there any core features missing in my project?
   ```
6. **Show response**: Copilot typically identifies missing features like authentication, proper error handling, or cart functionality (which we'll build later!)

#### Part B: Plan Mode (1.5 min)

1. **Open Copilot Chat** → switch to **Plan** mode from the mode dropdown
2. **Enter prompt**:
   ```
   I want to add input validation to the Product API POST endpoint. What's the best approach?
   ```
3. **Show** Copilot analyzing the codebase and proposing a structured implementation plan
4. **Point out**: The plan lists which files need to change, what approach to take, step-by-step instructions
5. **Highlight**: Plan mode does NOT create or modify any files — it only proposes
6. **Talking point**: "Plan mode is your architect. It reads your codebase, analyzes the problem, and proposes a plan — without touching any code. You review the plan, then switch to Agent mode to implement."

#### Part C: Agent Mode (1.5 min)

1. **Switch** to **Agent** mode
2. **Enter prompt**:
   ```
   Please build and run my project so that I can see its existing state.
   ```
3. **Show Copilot**:
   - Reading `package.json`
   - Running terminal commands (`npm install`, `npm run dev`)
   - Verifying the build succeeded
   - (If app is already running, it may detect that and skip build)
4. **Talking point**: "Agent mode just built and launched your app from a natural language prompt. It read config files, ran terminal commands, and verified success. This is your pair programmer."

### Hands-On Instructions (8 min)

Tell attendees:
> "Try all three modes. Here are prompts to start with:
> - **Ask**: `What testing framework does this project use and what's the current test coverage?`
> - **Plan**: `How should I add comprehensive error handling to the API routes?` — note it doesn't change any files
> - **Agent**: `Build and run the project` (if not already running)
> 
> You have 8 minutes. I'll walk around to help."

### Key Points to Emphasize

- Ask = read-only intelligence (safe for production exploration)
- Plan = architectural planning without code changes (think before you build)
- Agent = full codebase access + terminal + file editing (the power mode)
- Mode selection matters more than prompt quality

### Backup Plan

If Copilot is slow/unresponsive:
1. Show the mode picker UI and explain what each does
2. Reference the comparison table from the slides
3. Have attendees try the prompts themselves during hands-on time

---

## Demo 2: GitHub CLI (Section 3)

**Objective**: Show `gh copilot` for AI-powered terminal assistance and `gh issue` for project management  
**Duration**: 5 min demo + 5 min hands-on = 10 min  
**After Slide**: 13

### Setup Before Demo

- VS Code integrated terminal open
- `gh` CLI installed and authenticated
- `gh copilot` extension installed
- Current directory is the project root

### Step-by-Step Script

#### Part A: Verify CLI Setup (30 sec)

1. **Open** the VS Code integrated terminal
2. **Run**:
   ```bash
   gh --version
   gh auth status
   ```
3. **Show**: Version number and authenticated user
4. **Talking point**: "The GitHub CLI is GitHub's official command-line tool. If you don't have it yet, install it from cli.github.com."

#### Part B: Copilot Suggest (1.5 min)

1. **Run**:
   ```bash
   gh copilot suggest "list all open issues assigned to me in this repo"
   ```
2. **Show**: Copilot generating the appropriate `gh issue list` command
3. **Point out**: The suggested command, the option to execute it directly or copy it
4. **Run another suggestion**:
   ```bash
   gh copilot suggest "find all TypeScript files modified in the last week"
   ```
5. **Show**: Copilot generating a `git`/`find` command
6. **Talking point**: "You don't need to memorize commands. Describe what you want in English, and Copilot generates the command for you."

#### Part C: Copilot Explain (1 min)

1. **Run**:
   ```bash
   gh copilot explain "gh api repos/{owner}/{repo}/branches/main/protection --method PUT"
   ```
2. **Show**: Copilot breaking down the command into plain English
3. **Talking point**: "Found a complex command in a README or Stack Overflow? Paste it into `explain` before you run it. No more running commands you don't understand."

#### Part D: Create an Issue from the CLI (2 min)

1. **Run**:
   ```bash
   gh issue create --title "Improve API error handling" --body "Standardize error responses across all API endpoints with proper HTTP status codes and error messages."
   ```
2. **Show**: The issue being created, the URL returned
3. **Open the repo in browser** → Show the new issue exists
4. **Run**:
   ```bash
   gh issue list
   ```
5. **Show**: The issue appearing in the list
6. **Talking point**: "Project management from your terminal. And this connects directly to Coding Agent — later we'll assign an issue to Copilot and it will code the solution autonomously."

### Hands-On Instructions (5 min)

> "Your turn! Try these in the terminal:
> 1. `gh copilot suggest "show me the most recent commits on main with a graph"` — then run the suggested command
> 2. `gh issue list` — see what issues exist
> 3. `gh issue create --title "Test issue from CLI" --body "Created during workshop."` — create your own issue
>
> **Bonus**: Try `gh extension browse` to explore community extensions."

### Key Points to Emphasize

- `gh copilot suggest` = natural language → shell command
- `gh copilot explain` = shell command → plain English
- `gh issue create` connects to the Coding Agent workflow (Section 10)
- The CLI complements the IDE — use both

### Backup Plan

If `gh copilot` is not installed:
1. Show `gh extension install github/gh-copilot` to install it
2. If extension install is blocked, skip to the `gh issue` commands (those don't require the extension)
3. Show the CLI docs page: `cli.github.com` as reference

If `gh` is not installed at all:
1. Explain the concept using the slides
2. Show the CLI website: `cli.github.com`
3. Move on to the next section and have attendees install during the break

---

## Demo 3: Custom Instructions (Section 4)

**Objective**: Show how custom instructions change Copilot's behavior, including internal frameworks  
**Duration**: 5 min demo + 5 min hands-on = 10 min  
**After Slide**: 17

### Setup Before Demo

- Ensure `.github/copilot-instructions.md` does NOT exist yet (this is the exercise)
- Have `docs/tao.md` ready to reference
- New chat session (clear context from previous demo)

### Step-by-Step Script

#### Part A: Generate Instructions (1.5 min)

1. **Open Copilot Chat** → Click the **Gear icon** (⚙️)
2. **Select**: "Generate Agent Instructions"
3. **Show Copilot analyzing the repo** — it reads package.json, architecture, routes, etc.
4. **Review the generated file**: Should include references to:
   - TypeScript, Express.js, React
   - Project structure (api/, frontend/)
   - Build commands (`npm install && npm run build`)
   - Testing framework (Vitest)
5. **Save** to `.github/copilot-instructions.md`
6. **Talking point**: "Copilot just wrote its own instruction manual by reading your entire repo. This file is now loaded into every interaction."

#### Part B: Scoped Instructions (1 min)

1. **Create** `.github/instructions/API.instructions.md`:
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
2. **Talking point**: "These instructions only activate when you're working in the `api/` directory. Different teams, different rules."

#### Part C: TAO Internal Framework Demo (2.5 min)

1. **Show** `docs/tao.md` briefly — "This is a fictional internal observability framework"
2. **Add to** `.github/copilot-instructions.md`:
   ```markdown
   ## Observability Requirements
   - Implement logging and monitoring using TAO (TypeScript API Observability)
   - Reference: docs/tao.md
   - Assume TAO is installed — never add the package
   - Use @Measure, @Trace, and @Log decorators for all service methods
   ```
3. **Switch to Agent mode**
4. **Enter prompt**:
   ```
   Add observability to the Supplier route using our internal standards
   ```
5. **Show Copilot generating TAO code**:
   ```typescript
   import { initTAO, observe } from '@tao/core';
   import { Measure, Trace, Log } from '@tao/core';
   ```
6. **Talking point**: "TAO doesn't exist anywhere on the internet. Copilot has never seen it in training data. But because we told it about TAO in our instructions, it generates perfect TAO code. Imagine this for YOUR company's internal frameworks."
7. **Acknowledge**: "This code won't compile — that's the point. It shows instructions override training data."

### Hands-On Instructions (5 min)

> "Two tasks:
> 1. Use the Gear icon → 'Generate Agent Instructions' to create your `.github/copilot-instructions.md`
> 2. Create `.github/instructions/API.instructions.md` with the `applyTo: 'api/**'` frontmatter
> 
> Then test it: Ask Copilot a question about the project and see if the response reflects your instructions."

### Key Points to Emphasize

- Instructions are invisible to developers — they just make Copilot better
- Keep them concise (they consume context window on every interaction)
- The TAO example proves you can teach Copilot about anything
- Scoped instructions use glob patterns in YAML frontmatter

### Backup Plan

If the Gear icon → "Generate Agent Instructions" isn't available:
1. Create `.github/copilot-instructions.md` manually in Agent mode:
   ```
   Analyze this repository and create a comprehensive copilot-instructions.md file that describes our tech stack, architecture, coding standards, and build process.
   ```
2. If Agent mode is slow, paste a pre-written template

---

## Demo 4: Custom Prompt Files (Section 5)

**Objective**: Walk through existing prompts and run the unit test prompt live  
**Duration**: 6 min demo + 7 min hands-on = 13 min  
**After Slide**: 21

### Setup Before Demo

- Ensure existing test coverage is minimal (only `branch.test.ts` exists)
- App running (tests need the API)
- New chat session

### Step-by-Step Script

#### Part A: Walk Through Prompts (2.5 min)

1. **Open** `.github/prompts/Unit-Test-Coverage.prompt.md`
2. **Walk through structure**:
   - **YAML frontmatter**: `mode: 'agent'`, tool list (point out `runCommands`, `testFailure`)
   - **Current state**: "Only 1 test file exists: `branch.test.ts`"
   - **Requirements**: CRUD operations + error scenarios as checkboxes
   - **Guidelines**: "Follow the pattern in `branch.test.ts`" with code template
   - **Running tests**: Copy-paste `npm run test:api` commands
   - **Success criteria**: All tests passing
3. **Talking point**: "This prompt file is a complete runbook. A junior developer can run it and get senior-quality test coverage. That's consistency."

4. **Briefly show** `.github/prompts/plan.prompt.md`:
   - "Notice: 'DO NOT SHOW CODE CHANGES — only the overview.' Not every prompt should generate code."

5. **Briefly show** `.github/prompts/model.prompt.md`:
   - "This one fetches live GitHub docs to compare AI models. Prompts can reference external URLs."

#### Part B: Run the Unit Test Prompt (3.5 min)

1. **Open** `Unit-Test-Coverage.prompt.md`
2. **Click the Run button** at the top of the file (or `Cmd/Ctrl + Shift + P` → "Prompts: Run Prompt")
3. **Show** Agent mode activating automatically (from `mode: 'agent'` in frontmatter)
4. **Watch Copilot**:
   - Reading `branch.test.ts` for the pattern
   - Creating `product.test.ts` with CRUD + error tests
   - Creating `supplier.test.ts` with CRUD + error tests
   - Running `npm run test:api`
   - (If tests fail) Reading errors and fixing them → re-running (self-healing!)
5. **Show the test results** — all passing
6. **Talking point**: "One click. The prompt told Copilot exactly what to do, what pattern to follow, and how to verify. If tests failed, it read the errors and fixed them. That's the self-healing loop."

### Hands-On Instructions (7 min)

> "Create your own prompt file. I recommend a security review prompt:
> 
> Create `.github/prompts/security-review.prompt.md` with:
> - `mode: 'agent'`
> - Tools: `codebase`, `search`, `editFiles`, `changes`
> - Instructions to check for XSS, injection, CORS, and hardcoded credentials
> - Run it and see what Copilot finds
> 
> If you want a different prompt, go for it — documentation, refactoring, API design, anything that encodes a repeatable workflow."

### Key Points to Emphasize

- The Run button auto-switches to the correct mode — no manual selection needed
- Self-healing: Agent reads test failures and iterates until they pass
- Prompts are shareable — commit them and your whole team gets them
- The tools list is critical — `runCommands` lets Agent execute terminal commands

### Backup Plan

If the Unit Test prompt takes too long:
1. Stop it after the first test file is created
2. Show the generated code quality
3. Run `npm run test:api` manually in the terminal
4. If blocked entirely, show the existing `branch.test.ts` as the pattern and explain what the prompt would generate

---

## Demo 5: Custom Agents / Chat Modes (Section 6)

**Objective**: Show agents as persistent personas and demonstrate delegation to Coding Agent  
**Duration**: 4 min demo + 5 min hands-on = 9 min  
**After Slide**: 25

### Setup Before Demo

- GitHub MCP server running (needed for ImplementationIdeas agent)
- New chat session

### Step-by-Step Script

#### Part A: Review the ImplementationIdeas Agent (2 min)

1. **Open** `.github/agents/ImplementationIdeas.agent.md`
2. **Walk through**:
   - **Tools**: `search`, `github/*` (wildcard = all GitHub MCP tools), `playwright/*`, `githubRepo`, `todos`
   - **Model**: `Claude Sonnet 4.5` — "This agent chose its own model"
   - **Description**: "Explore implementation ideas" — this shows in the mode picker
   - **Behavior**: "FIRST deeply research... THEN implement via Coding Agent"
   - **Key line**: "call GitHub's `create_pull_request_with_copilot`" — "This agent delegates to an autonomous agent"
3. **Show the mode picker**: Click the mode dropdown in Copilot Chat
4. **Point out** "ImplementationIdeas" appearing alongside Ask/Agent/Plan
5. **Talking point**: "Agents are personas, not tasks. When you select this agent, it changes how Copilot thinks for your entire session."

#### Part B: Create a CodeReviewer Agent Live (2 min)

1. **Create** `.github/agents/CodeReviewer.agent.md`:
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
2. **Show** the new agent appearing in the mode picker immediately (no restart needed)
3. **Talking point**: "One Markdown file. Appears instantly. Your whole team can use it by committing to `.github/agents/`."

### Hands-On Instructions (5 min)

> "Create your own agent in `.github/agents/`. Ideas:
> - `APIDesigner.agent.md` — designs REST endpoints following existing patterns
> - `TestEngineer.agent.md` — focuses on test coverage and quality
> - `DocWriter.agent.md` — generates documentation from code
> 
> Use the frontmatter: `tools`, `description`, `model`. Write 5-10 lines of persona instructions."

### Key Points to Emphasize

- Agents are persistent — they change Copilot's behavior for the whole session
- Agents can specify their own model — match model to workflow
- Agents can use wildcards for tools (`github/*` = all GitHub MCP tools)
- The ImplementationIdeas agent demonstrates agents calling agents (delegation to Coding Agent)

### Backup Plan

If the mode picker doesn't show the new agent:
1. Reload the VS Code window (`Cmd/Ctrl + Shift + P` → "Reload Window")
2. If still missing, show the file content and explain that it would appear after reload
3. Focus on the ImplementationIdeas agent walkthrough

---

## Demo 6: Agent Skills (Section 7)

**Objective**: Create a skill from scratch and show auto-selection  
**Duration**: 5 min demo + 7 min hands-on = 12 min  
**After Slide**: 29

### Setup Before Demo

- No `.github/skills/` directory exists (verify: `ls .github/skills/` should fail)
- New chat session

### Step-by-Step Script

#### Part A: Create a Skill (2.5 min)

1. **Create directory**:
   ```bash
   mkdir -p .github/skills/github-actions-debugging
   ```
2. **Create** `.github/skills/github-actions-debugging/SKILL.md`:
   ```yaml
   ---
   name: github-actions-debugging
   description: Guide for debugging failing GitHub Actions workflows.
     Use this when asked to debug failing GitHub Actions workflows.
   ---
   
   To debug failing GitHub Actions workflows in a pull request,
   follow this process:
   
   1. Use the `list_workflow_runs` tool to look up recent workflow
      runs for the pull request and their status
   2. Use the `summarize_job_log_failures` tool to get an AI summary
      of the logs for failed jobs, to understand what went wrong
      without filling your context window with thousands of lines of logs
   3. If you still need more information, use the `get_job_logs` or
      `get_workflow_run_logs` tool to get the full, detailed failure logs
   4. Try to reproduce the failure yourself in your own environment
   5. Fix the failing build. If you were able to reproduce the
      failure yourself, make sure it is fixed before committing
      your changes
   ```
3. **Explain key fields**:
   - `name`: Lowercase, hyphens for spaces — the skill's identifier
   - `description`: **Critical** — this is how Copilot decides when to load the skill
4. **Talking point**: "The description is the trigger. When you ask about failing workflows, Copilot reads this description and says 'I have a skill for that.'"

#### Part B: Show Auto-Selection (1.5 min)

1. **Open Agent mode** (new chat)
2. **Enter prompt**:
   ```
   Help me debug why the CI workflow is failing on my PR
   ```
3. **Show** Copilot loading the skill (it should reference the debugging steps)
4. **Contrast**: Ask something unrelated to show the skill is NOT loaded:
   ```
   What entities does this API manage?
   ```
5. **Talking point**: "You didn't invoke the skill. Copilot matched your prompt to the skill's description and loaded it automatically. This is the key difference from prompt files."

#### Part C: Community Skills Reference (1 min)

1. **Open browser** to [github/awesome-copilot](https://github.com/github/awesome-copilot) (or mention it)
2. **Mention** [anthropics/skills](https://github.com/anthropics/skills)
3. **Talking point**: "Skills are an open standard. You can use community skills or write your own. Check these repos for inspiration."

### Hands-On Instructions (7 min)

> "Create a skill for the OctoCAT Supply project.
> 
> **Option A — `api-route-creation` skill**:
> `mkdir -p .github/skills/api-route-creation`
> Create a SKILL.md that teaches Copilot how to create new API routes following the project's Express patterns.
> 
> **Option B — `react-component-creation` skill**:
> `mkdir -p .github/skills/react-component-creation`
> Create a SKILL.md for React component conventions (functional components, Tailwind CSS, TypeScript).
> 
> Then test it: Ask Copilot something that should trigger your skill."

### Key Points to Emphasize

- Skills are auto-loaded — Copilot decides, not you
- The `description` field is the matching key — be specific about WHEN to use the skill
- Skills can include scripts and resource files alongside SKILL.md
- Project skills (`.github/skills/`) are shared via git; personal skills (`~/.copilot/skills/`) are local
- Skills vs Instructions: instructions = always-on rules, skills = conditional procedures

### Backup Plan

If auto-selection doesn't visibly work:
1. Explain that skill loading is invisible to the user — it happens in the background
2. Show a before/after: ask about debugging CI without the skill, then with the skill
3. Compare the quality and specificity of responses

---

## Demo 7: Playwright MCP Server (Section 8, Part A)

**Objective**: Show browser-based testing from natural language prompts  
**Duration**: 5 min demo + 8 min hands-on = 13 min  
**After Slide**: 34 (combined with Demo 8)

### Setup Before Demo

- App running locally (`npm run dev`) — **required**
- Frontend accessible at `http://localhost:5137`
- Playwright MCP server NOT yet started (we'll start it live)

> ⚠️ **Critical**: Playwright MCP does NOT work in Codespaces. Must be local VS Code.

### Step-by-Step Script

#### Part A: Start the Server (1 min)

1. **Open Command Palette**: `Cmd/Ctrl + Shift + P` → type `MCP: List servers`
2. **Show both servers** listed (playwright + github)
3. **Select** `playwright` → `Start server`
4. **Show server status**: Green indicator or "Running" status
5. **Alternative**: Open `.vscode/mcp.json`, click the HUD play button above the playwright entry

#### Part B: Browse the App (2 min)

1. **Switch to Agent mode**
2. **Enter prompt**:
   ```
   Browse to http://localhost:5137 and navigate to the Products page. Describe what you see.
   ```
3. **Show**:
   - Playwright MCP launching a browser
   - Copilot navigating to the URL
   - A description of the page elements (products grid, images, prices, "Add to Cart" buttons)
4. **Talking point**: "Copilot is driving a real browser right now. It's not guessing what the UI looks like — it's looking at it."

5. **Follow-up prompt**:
   ```
   Click on the first product and check if the product details are displayed correctly
   ```
6. **Show** Copilot interacting with the page and reporting results

#### Part C: Generate BDD Feature File (2 min)

1. **Enter prompt**:
   ```
   Generate a Gherkin .feature file to test the Products page functionality
   ```
2. **Show the generated `.feature` file** with scenarios like:
   ```gherkin
   Feature: Products Page
     Scenario: View all products
       Given I navigate to the Products page
       Then I should see a list of products
       And each product should have a name, image, and price
   
     Scenario: View product details
       When I click on a product
       Then I should see the product details
   ```
3. **Talking point**: "From natural language to Gherkin test scenarios. A QA engineer can describe what to test in English, and Copilot generates the formal test specification."

### Hands-On Instructions (8 min)

> "Start the Playwright MCP server and try these:
> 1. `Browse to http://localhost:5137, go to Products, and verify all products have images and prices displayed`
> 2. Try navigating to different pages and describing what you see
> 3. Generate a `.feature` file for a specific page
> 
> **Bonus**: Ask Copilot to execute the feature file using Playwright"

### Key Points to Emphasize

- Playwright MCP bridges the gap between AI and real browsers
- Works for testing, QA, accessibility auditing, screenshot capture
- Must run locally (not Codespaces) — browser needs a display
- The generated `.feature` files can be integrated into your CI/CD pipeline

### Backup Plan

If Playwright MCP fails to start:
1. Check Node.js version (18+ required)
2. If blocked, show screenshots of previous Playwright sessions
3. Explain the concept and move to GitHub MCP demo

---

## Demo 8: GitHub MCP Server (Section 8, Part B)

**Objective**: Show GitHub interactions from Copilot Chat  
**Duration**: 4 min demo (combined with Demo 7 hands-on)  
**After Slide**: 34 (part of combined MCP demo)

### Setup Before Demo

- GitHub MCP server started (or start it during demo)
- Logged in to GitHub with repo access

### Step-by-Step Script

#### Part A: Start the Server (30 sec)

1. **Command Palette** → `MCP: List servers` → `github` → `Start server`
2. **(First time)** OAuth flow opens in browser — authenticate
3. **Show** server running status

#### Part B: Query Issues (1.5 min)

1. **Switch to Agent mode** (if not already)
2. **Enter prompt**:
   ```
   Check which issues are assigned to me in this repo
   ```
3. **Show** Copilot calling the GitHub MCP server tools
4. **Show** the results (issues list, or "no issues assigned")
5. **Talking point**: "Copilot just queried the GitHub API without you leaving VS Code."

#### Part C: Create an Issue (2 min)

1. **Enter prompt**:
   ```
   Create an Issue for enhancing test coverage in the API project and assign it to me
   ```
2. **Show Copilot**:
   - Crafting a meaningful issue title and description
   - Adding appropriate labels
   - Setting the assignee
   - Confirm the tool call when prompted
3. **Open the repo in browser** → Show the new issue exists
4. **Talking point**: "Project management from your IDE. And here's the key: we'll use this exact pattern in the next section to assign an issue to the Coding Agent."

### Key Points to Emphasize

- GitHub MCP uses OAuth — no PAT management needed (remote server)
- The same tools the GitHub MCP exposes (create issue, etc.) are available to custom agents
- This is the bridge to Coding Agent: create issue → assign to Copilot → autonomous coding

### Backup Plan

If GitHub MCP fails:
1. Check OAuth status — re-authenticate if needed
2. If blocked, create the issue manually in the browser
3. Explain the concept and reference the `.vscode/mcp.json` config

---

## Demo 9: Vision + Agent Mode — Cart Page (Section 9)

**Objective**: Build a working cart feature from a design image  
**Duration**: 7 min demo + 10 min hands-on = 17 min  
**After Slide**: 37

> **This is the capstone demo.** Take your time. The audience needs to see the full Plan → Agent → Working Feature arc.

### Setup Before Demo

- App running with Products page accessible
- `docs/design/cart.png` exists in the repo
- `docs/design/MonaFigurine.png` exists (for hands-on)
- Fresh chat session (clear previous context)
- Products page open in browser (to show "before" state)

### Step-by-Step Script

#### Part A: Show the "Before" State (30 sec)

1. **Open browser** to `http://localhost:5137`
2. **Navigate** to Products
3. **Click "Add to Cart"** on any product
4. **Show**: A toast message appears ("Added to Cart") but nothing actually happens
5. **Talking point**: "There's no cart. The button exists but does nothing. We're going to build the entire cart feature from a design image."

#### Part B: Plan with Vision (2.5 min)

1. **Open Copilot Chat** → Switch to **Plan** mode
2. **Drag** `docs/design/cart.png` into the chat window
   - Alternative: Click the paperclip icon → browse to `docs/design/cart.png`
3. **Enter prompt**:
   ```
   I need to implement a simple Cart Page. I also want a Cart icon in the NavBar that shows the number of items in the Cart.
   ```
4. **Show Copilot analyzing the image** (Vision):
   - Identifying the cart layout (item list, quantities, totals)
   - Recognizing UI patterns (quantity selectors, remove buttons)
   - Proposing color scheme and styling from the image
5. **Show the plan** — Copilot lists:
   - New components to create (CartPage, CartIcon, CartContext)
   - Existing files to modify (NavBar, routing, app state)
   - Data flow (context provider for cart state)
6. **Talking point**: "We're not coding yet. Plan mode analyzed the image, identified UI components, and proposed an architecture. This is thinking before doing."
7. **(Optional)** Ask for a modification:
   ```
   Remove any discount code functionality — keep it simple
   ```

#### Part C: Implement with Agent (3 min)

1. **Switch to Agent mode** (keep conversation context)
2. **Enter prompt**:
   ```
   Implement the changes.
   ```
3. **Show Copilot working**:
   - Creating React components (CartPage.tsx, CartIcon.tsx)
   - Creating CartContext for state management
   - Modifying NavBar to include cart icon
   - Updating route configuration
   - Adding CSS/Tailwind styles
4. **Point out** the file tabs appearing as files are created/modified
5. **Accept changes** as they come (or accept all at the end)
6. **Talking point**: "Agent mode is implementing across 5-6 files simultaneously. It's following the plan we approved earlier."

#### Part D: Verify (1 min)

1. **Wait for build** to complete (hot reload should pick up changes)
2. **Refresh** the browser
3. **Navigate** to Products → click "Add to Cart" on a few products
4. **Show**:
   - Cart icon in NavBar updating with item count
   - Click Cart icon → Cart page displays items
   - Quantity adjustments work
   - Total updates correctly
5. **Talking point**: "From a PNG image to a working cart feature. Copilot read the design, planned the architecture, and implemented across multiple files. That's agentic development."

### Hands-On Instructions (10 min)

> "Your turn! Use the MonaFigurine design image to add a new product.
> 
> 1. Open Agent mode
> 2. Drag `docs/design/MonaFigurine.png` into the chat
> 3. Enter:
>    ```
>    Using the image, create a new product offering on the OctoCAT Supply website.
>    Price is $32.99, SKU is MONA-001, and description is 'A beautiful handcrafted
>    figurine inspired by the Mona Lisa.'
>    ```
> 4. Accept the changes and verify in your running app
> 
> **Bonus**: Try the Plan → Agent workflow: start in Plan mode with the image, review the plan, then switch to Agent to implement."

### Key Points to Emphasize

- Vision works with PNG, JPG, GIF, WEBP
- Plan → Agent is a best practice: think first, then build
- Agent mode iterates across multiple files — it's not just editing one file
- The conversation context persists between Plan and Agent modes

### Backup Plan

If Vision doesn't analyze the image well:
1. Describe the cart layout verbally along with the image
2. If Agent implementation is slow, show a pre-prepared branch with the cart already built
3. Git stash your changes and checkout the pre-prepared branch

If the app doesn't hot-reload:
1. Stop and restart: `npm run dev`
2. Hard refresh the browser (Ctrl+Shift+R)

---

## Demo 10: Cloud Agents — Coding Agent + PR Review (Section 10)

**Objective**: Show the autonomous development loop: Issue → Coding Agent → PR → Code Review  
**Duration**: 15 min demo (no hands-on — observe only)  
**After Slide**: 42

### Setup Before Demo

- Branch protection rule configured on `main` (PR required, 1 reviewer)
- Copilot Coding Agent enabled in repo settings
- At least one open Issue exists (or create one during the demo)
- A pre-existing PR available for the Code Review demo (or use one created by Coding Agent earlier)
- Browser open to GitHub repo

> **Timing Note**: Coding Agent takes 5-30 minutes to complete. You have two options:
> 1. **Pre-assign an issue before the workshop** so the PR is ready by this section
> 2. **Assign live and show the session starting**, then switch to a pre-prepared PR for the Review demo

### Step-by-Step Script

#### Part A: Copilot Coding Agent (7 min)

1. **Open GitHub repo** in browser
2. **Navigate** to Issues

**Option 1 — Use existing Issue:**
3. **Find** Issue #1 (test coverage improvement) or a pre-created issue
4. **Show** the issue content — explain what it asks for

**Option 2 — Create a new Issue live:**
3. **Create new Issue**:
   - Title: `Add input validation to the Product API POST endpoint`
   - Description:
     ```
     The POST /api/products endpoint accepts any payload without validation.
     
     Add Zod schema validation for required fields:
     - name (string, required)
     - price (number, required, positive)
     - supplierId (number, required)
     
     Return 400 with validation errors for invalid payloads.
     Include unit tests for the validation.
     ```

4. **Assign to Copilot**:
   - Click **Assignees** → type "copilot" → select **Copilot**
5. **Show the Coding Agent session starting**:
   - Navigate to Actions tab (or Copilot indicator)
   - Show the session being created
   - Point out the log: "Copilot is working on this issue..."
6. **Explain what happens next**:
   - "Copilot creates a feature branch"
   - "It reads our custom instructions, skills, and the entire codebase"
   - "It implements the solution — in this case, adding Zod validation"
   - "It runs tests if configured"
   - "When done, it opens a PR with a full description of changes"
7. **Talking point**: "Everything we built today — instructions, skills, prompt patterns — Coding Agent uses all of it. It follows your team's standards even when coding autonomously."

8. **Show the delegation pattern**:
   - Open `.github/agents/ImplementationIdeas.agent.md`
   - Point out `create_pull_request_with_copilot`
   - "Custom agents in your IDE can delegate to the Coding Agent. Your IDE agent researches and plans, the Coding Agent implements. Agents calling agents."

#### Part B: Copilot Code Review / PR Review Agent (8 min)

> If the Coding Agent PR isn't ready yet, use a pre-prepared PR.

1. **Open a Pull Request** in the browser
   - Use a Coding Agent PR (ideal) or any PR with code changes
2. **Click Reviewers** → Add **Copilot** as a reviewer
3. **Wait** for the review (1-3 minutes typically)
   - While waiting, explain: "Copilot is analyzing every file change in this PR. It checks correctness, security, performance, and style."
4. **Show the review comments**:
   - **Inline comments**: Point out specific code suggestions with diffs
   - **Severity levels**: Show how some are suggestions, others are more critical
   - **Suggested fixes**: Click "Apply suggestion" to show it creates a commit
   - **Dismiss/resolve**: Show how to dismiss individual comments
5. **Walk through 2-3 specific comments**:
   - A security-related comment (e.g., missing input validation)
   - A performance suggestion (e.g., unnecessary allocation)
   - A style recommendation (e.g., naming convention)
6. **Talking point**: "Copilot caught issues that would take a human reviewer significant time to find. But it doesn't question business decisions — that's still your job. The best setup is Copilot + human review together."

7. **Show the full loop narrative**:
   - "Issue was created → Coding Agent wrote the code → PR was opened → Copilot reviewed the PR → Now a human approves and merges. Every step AI-assisted."

### Key Points to Emphasize

- Coding Agent is async — assign and do other work
- It respects branch protection (won't merge without review)
- It reads all customization files (instructions, skills, etc.)
- PR Review is complementary to human review, not a replacement
- The full loop: Issue → Code → PR → Review → Merge is all AI-assisted

### Backup Plan

If Coding Agent isn't available or takes too long:
1. Show the Actions tab and explain the session concept
2. Use a pre-prepared PR that was created by Coding Agent earlier
3. If Code Review isn't available, show screenshots of review comments
4. Explain the concepts using the slides and the ImplementationIdeas agent file as evidence of the delegation pattern

---

## Timing Summary

| Demo | Section | Demo Time | Hands-On | Total |
|------|---------|-----------|----------|-------|
| 1 | Chat Modes | 5 min | 8 min | 13 min |
| 2 | GitHub CLI | 5 min | 5 min | 10 min |
| 3 | Custom Instructions | 5 min | 5 min | 10 min |
| 4 | Custom Prompt Files | 6 min | 7 min | 13 min |
| 5 | Custom Agents | 4 min | 5 min | 9 min |
| 6 | Agent Skills | 5 min | 7 min | 12 min |
| 7 | Playwright MCP | 5 min | 8 min | 13 min |
| 8 | GitHub MCP | 4 min | — | 4 min |
| 9 | Vision + Cart Page | 7 min | 10 min | 17 min |
| 10 | Cloud Agents | 15 min | — | 15 min |
| | | **61 min** | **55 min** | **116 min** |

**Remaining time budget**:
- Slide presentation: ~80 min
- Breaks: 30 min (3 × 10 min)
- Wrap-up/Q&A: 12 min
- Buffer: ~12 min

**Grand total**: ~250 min (~4h 10min)

---

## General Backup Plan

If a demo is completely blocked:

1. **Show pre-captured screenshots** from a previous run
2. **Switch to GitHub Docs** walkthrough for that feature:
   - GitHub CLI: `cli.github.com`
   - Copilot in CLI: `docs.github.com/en/copilot/github-copilot-in-the-cli`
   - Custom Instructions: `docs.github.com/en/copilot/how-tos/configure-custom-instructions`
   - Prompt Files: `docs.github.com/en/copilot/how-tos/copilot-prompts`
   - Agent Skills: `docs.github.com/en/copilot/concepts/agents/about-agent-skills`
   - MCP: `docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot`
   - Coding Agent: `docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent`
3. **Engage the audience** with Q&A while troubleshooting
4. **Skip to the next section** and come back if time permits

### Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Copilot not responding | Check internet connection, verify sign-in status |
| Agent mode unavailable | Update VS Code + Copilot extensions to latest |
| `gh` CLI not found | Install from cli.github.com, then run `gh auth login` |
| `gh copilot` not available | Run `gh extension install github/gh-copilot` |
| MCP server won't start | `MCP: List servers` → check status → restart |
| Playwright browser doesn't appear | Verify running locally (not Codespaces) |
| GitHub MCP auth fails | Re-authenticate: `MCP: List servers` → `github` → restart |
| App not running | `npm run dev` in terminal, check ports 3000/5137 |
| CORS errors (Codespaces) | Set port 3000 visibility to `public` |
| Tests timeout | `npm run test:api -- --timeout 30000` |
| Hot reload not working | Stop + restart `npm run dev`, hard refresh browser |
| Coding Agent not starting | Check: Actions enabled, branch protection set, Coding Agent enabled in settings |

---

## Post-Demo Cleanup

After each run-through or the actual workshop:

```bash
# Reset all changes (keep only original repo state)
git checkout -- .
git clean -fd

# Remove created files
rm -rf .github/copilot-instructions.md
rm -rf .github/instructions/
rm -rf .github/skills/
rm -rf .github/agents/CodeReviewer.agent.md

# Restart the app
npm run dev
```

---

*Demo scripts for GitHub Copilot: Zero to Agents workshop*
*Demo repo: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)*
