# GitHub Copilot: Zero to Agents — Demo Scripts

## Instructor Reference

**Duration**: ~4 hours (core workshop ~232 min)  
**Total Demo Time**: ~137 min core (including hands-on)  
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

### CLI

- [ ] `gh` CLI installed and on PATH (`gh --version` returns 2.x+)
- [ ] Authenticated (`gh auth status` shows logged in)
- [ ] `gh copilot` extension installed (`gh extension list` shows `github/gh-copilot`)
- [ ] If not installed: `gh extension install github/gh-copilot`

### MCP Servers

- [ ] `.vscode/mcp.json` exists with github + playwright servers
- [ ] VS Code setting `chat.mcp.discovery.enabled` is `true` (Settings → search "MCP")
- [ ] Playwright MCP auto-starts when needed: verify by running a Playwright prompt in Agent mode
- [ ] GitHub MCP auto-starts when needed: verify by asking Copilot to list issues
- [ ] OAuth flow completes for GitHub MCP (first time: browser opens for auth)

### GitHub Repo

- [ ] Actions enabled on the fork
- [ ] Branch protection rule on `main` (require PR, 1 reviewer)
- [ ] Copilot Coding Agent enabled in repo settings
- [ ] `.github/agents/OctoCATEngineer.agent.md` exists (pre-built agent for Section 5)
- [ ] At least one open Issue exists (or pre-create Issue #1 for test coverage)
- [ ] A PR exists or is ready to create (for PR Review Agent demo)
- [ ] Fine-grained PAT ready (if using local Docker-based GitHub MCP)

### Browser

- [ ] Bookmarks folder with: GitHub repo, API Swagger, Frontend, GitHub Copilot Docs
- [ ] Logged in to GitHub as the demo account
- [ ] Incognito/private window ready as backup

### Backup Materials

- [ ] Screenshots of each demo step in a local folder
- [ ] Pre-recorded GIFs for critical demos (MCP browser)
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
6. **Show response**: Copilot typically identifies missing features like authentication, proper error handling, or input validation

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
> "Try all three modes. Here are prompts to start with:"

**Ask**:

```
What testing framework does this project use and what's the current test coverage?
```

**Plan** (note it doesn't change any files):

```
How should I add comprehensive error handling to the API routes?
```

**Agent** (if not already running):

```
Build and run the project
```

> "You have 8 minutes. I'll walk around to help."

### Key Points to Emphasize

- Ask = read-only intelligence (safe for production exploration)
- Plan = architectural planning without code changes (think before you build)
- Agent = full codebase access + terminal + file editing (the power mode)
- Mode selection matters more than prompt quality

### Backup Plan

If Copilot is slow/unresponsive:
1. Show the mode picker UI and explain what each does
2. Reference the comparison table from the slides
---

## Demo 2: Custom Instructions (Section 3)

**Objective**: Show how custom instructions change Copilot's behavior, including internal frameworks  
**Duration**: 5 min demo + 12 min hands-on = 17 min  
**After Slide**: 14

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

#### Part D: Cleanup — Revert TAO with Copilot (1 min)

1. **Stay in Agent mode** and enter:
   ```
   Revert the TAO observability changes you just made to the Supplier route, and remove the "Observability Requirements" section from .github/copilot-instructions.md. The TAO framework is fictional and the code won't compile.
   ```
2. **Show Copilot** removing the TAO imports, decorators, and the instructions block
3. **Verify** the app compiles (check terminal or `npm run build`)
4. **Talking point**: "Copilot can undo its own work just as easily. In real projects, this is how you course-correct — tell it what's wrong and let it fix it. Now we're back to a clean codebase for the next section."

### Hands-On Instructions (12 min)

> "Five steps — take your time:"

1. **Baseline**: Ask Copilot in Ask mode — note the response:

```
How should I add a new API endpoint to this project?
```

2. Use the Gear icon → 'Generate Agent Instructions' to create your `.github/copilot-instructions.md`
3. Create `.github/instructions/API.instructions.md` with the `applyTo: 'api/**'` frontmatter
4. **Compare**: Open a file in `api/src/routes/` and re-ask the same question — notice how the response is now more specific
5. **Bonus**: Create a Frontend scoped instruction for `src/**` with Tailwind and React conventions

> "You have 12 minutes. I'll walk around to help."

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

## Demo 3: Custom Prompt Files (Section 4)

**Objective**: Walk through existing prompts and run the unit test prompt live  
**Duration**: 6 min demo + 12 min hands-on = 18 min  
**After Slide**: 18

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

### Hands-On Instructions (12 min)

> "Four exercises:
> 1. **Explore**: Look at the existing prompts in `.github/prompts/` — read the frontmatter and instructions
> 2. **Run**: Open `Unit-Test-Coverage.prompt.md` and click the Run button — watch the self-healing loop
> 3. **Create**: Build your own `.github/prompts/security-review.prompt.md` with:
>    - `mode: 'agent'`
>    - Tools: `codebase`, `search`, `editFiles`, `changes`
>    - Instructions to check for XSS, injection, CORS, and hardcoded credentials
>    - Run it and see what Copilot finds
> 4. **Bonus**: Design a prompt for documentation, refactoring, or API design — anything that encodes a repeatable workflow.
> 
> You have 12 minutes. Start with exploring, then create your own."

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

## Demo 4: Custom Agents (Chat Modes) (Section 5)

**Objective**: Show agents as persistent personas — from simple local workers to advanced delegation  
**Duration**: 5 min demo + 10 min hands-on = 15 min  
**After Slide**: 22

### Setup Before Demo

- GitHub MCP server configured in `.vscode/mcp.json` (auto-starts when needed)
- OctoCATEngineer agent file pre-exists in `.github/agents/`
- New chat session

### Step-by-Step Script

#### Part A: Use the OctoCATEngineer Agent (2 min)

1. **Open** `.github/agents/OctoCATEngineer.agent.md`
2. **Walk through**:
   - **Tools**: `codebase`, `search`, `editFiles`, `runCommands`, `problems` — "All local tools. No MCP, no cloud."
   - **No custom model** — "Uses whatever model you have selected"
   - **Description**: "Full-stack engineer for the OctoCAT Supply app"
   - **Persona**: Follows project patterns, writes TypeScript, uses existing conventions
3. **Show the mode picker**: Click the mode dropdown in Copilot Chat
4. **Select** "OctoCATEngineer"
5. **Enter prompt**:
   ```
   Add a GET /api/products/search endpoint that accepts a "name" query parameter and returns matching products
   ```
6. **Show the agent working**:
   - Reading existing route patterns
   - Creating/editing the route file
   - Running commands to verify
7. **Talking point**: "This is the simplest kind of agent — a persona with local tools. It can read, write, and run commands. No MCP, no custom model, no cloud delegation. Just a specialized pair programmer that stays in character."

#### Part B: Create a CodeReviewer Agent Live (1.5 min)

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
3. **Point out the contrast** with OctoCATEngineer:
   - "Read-only tools — `codebase`, `search`, `usages`, `problems`. No `editFiles`, no `runCommands`."
   - "Custom model — Claude Sonnet 4. OctoCATEngineer uses whatever you have selected."
   - "Different persona — reviewer, not builder."
4. **Talking point**: "Same file format, completely different behavior. The tool list controls what an agent can do."

#### Part C: Review the ImplementationIdeas Agent — Advanced Pattern (1.5 min)

1. **Open** `.github/agents/ImplementationIdeas.agent.md`
2. **Walk through what makes this different**:
   - **Tools**: `search`, `github/*` (wildcard = all GitHub MCP tools), `playwright/*`, `githubRepo`, `todos`
   - **Model**: `Claude Sonnet 4.5` — "This agent chose its own model"
   - **Key line**: "call GitHub's `create_pull_request_with_copilot`" — "This agent delegates to an autonomous cloud agent"
3. **Show the progression**: "We went from simple local agent → read-only agent → agent that delegates to the cloud."
4. **Talking point**: "Agents are personas, not tasks. The OctoCATEngineer is your builder, CodeReviewer is your reviewer, and ImplementationIdeas is your strategist that delegates to the Coding Agent. We'll see the Coding Agent in detail in Section 9."
5. **(Optional)** Select the agent and show the wishlist prompt briefly:
   ```
   Explore adding a wishlist feature where users can save products for later
   ```
   If the Coding Agent tip appears (*"You can make Copilot smarter by setting up custom instructions..."*), note: "We'll cover how to configure the Coding Agent environment in Section 9."

### Hands-On Instructions (10 min)

Tell attendees:
> "Five exercises:
> 1. **Use**: Select OctoCATEngineer from the mode picker, give it a task (add a health check endpoint), watch it work
> 2. **Build**: Create `.github/agents/CodeReviewer.agent.md` with the template from the demo
> 3. **Test**: Select CodeReviewer in the mode picker and ask it to review a route handler
> 4. **Explore**: Read the ImplementationIdeas agent file — notice the MCP wildcards, custom model, and delegation to Coding Agent
> 5. **Create your own**: Build an APIDesigner, TestEngineer, or DocWriter agent (bonus)
> 
> Use the frontmatter: `tools`, `description`, `model`. Write 5-10 lines of persona instructions.
> You have 10 minutes. Start with using OctoCATEngineer — experience what it's like to SELECT an agent before building one. I'll walk around to help."

### Key Points to Emphasize

- The 3-agent progression: simple worker → read-only reviewer → advanced delegator
- Agents are persistent — they change Copilot's behavior for the whole session
- Agent tool lists control capabilities (read/write vs read-only)
- Agents can specify their own model — match model to workflow
- Agents can use wildcards for tools (`github/*` = all GitHub MCP tools)
- The ImplementationIdeas agent demonstrates agents calling agents (delegation to Coding Agent, covered in Section 9)

### Backup Plan

If the mode picker doesn't show the new agent:
1. Reload the VS Code window (`Cmd/Ctrl + Shift + P` → "Reload Window")
2. If still missing, show the file content and explain that it would appear after reload
3. Focus on the OctoCATEngineer and the agent progression concept

---

## Demo 5: Agent Skills (Section 6)

**Objective**: Create a skill from scratch and show auto-selection  
**Duration**: 5 min demo + 12 min hands-on = 17 min  
**After Slide**: 26

### Setup Before Demo

- No `.github/skills/` directory exists (verify: `ls .github/skills/` should fail)
- New chat session

### Step-by-Step Script

#### Part A: Create a Skill (2.5 min)

1. **Create directory**:
   ```bash
   mkdir -p .github/skills/code-review-checklist
   ```
2. **Create** `.github/skills/code-review-checklist/SKILL.md`:
   ```yaml
   ---
   name: code-review-checklist
   description: Checklist for reviewing TypeScript and Express.js code.
     Use this when asked to review code, audit code quality, or check
     for security and performance issues.
   ---
   
   When reviewing TypeScript or Express.js code, follow this checklist:
   
   1. **Security**
      - Check for unsanitized user input in route handlers
      - Verify no hardcoded secrets, API keys, or credentials
      - Ensure proper auth checks on protected routes
      - Look for SQL/NoSQL injection risks in database queries
   
   2. **Input Validation**
      - Confirm all POST/PUT endpoints validate request body fields
      - Check for missing type guards on `req.params` and `req.query`
      - Verify appropriate HTTP status codes for validation failures
   
   3. **Error Handling**
      - Ensure every route has try/catch with meaningful error responses
      - Check that sensitive details are not leaked to clients
      - Verify async errors are properly caught
   
   4. **Performance**
      - Identify N+1 query patterns or unnecessary database calls
      - Check for missing pagination on list endpoints
      - Look for blocking synchronous operations in async handlers
   
   5. **Maintainability**
      - Verify consistent naming conventions
      - Check for DRY violations — duplicated logic to extract
      - Ensure Swagger/OpenAPI annotations are present and accurate
   ```
3. **Explain key fields**:
   - `name`: Lowercase, hyphens for spaces — the skill's identifier
   - `description`: **Critical** — this is how Copilot decides when to load the skill
4. **Talking point**: "The description is the trigger. When you ask about reviewing code, Copilot reads this description and says 'I have a skill for that.'"

#### Part B: Show Auto-Selection (1.5 min)

1. **Open Agent mode** (new chat)
2. **Enter prompt**:
   ```
   Review the product route handler for security and performance issues
   ```
3. **Show** Copilot loading the skill (it should reference the checklist steps)
4. **Contrast**: Ask something unrelated to show the skill is NOT loaded:
   ```
   What entities does this API manage?
   ```
5. **Talking point**: "You didn't invoke the skill. Copilot matched your prompt to the skill's description and loaded it automatically. This is the key difference from prompt files."

#### Part C: Community Skills Reference (1 min)

1. **Open browser** to [github/awesome-copilot](https://github.com/github/awesome-copilot) (or mention it)
2. **Mention** [anthropics/skills](https://github.com/anthropics/skills)
3. **Talking point**: "Skills are an open standard. You can use community skills or write your own. Check these repos for inspiration."

### Hands-On Instructions (12 min)

> "Three exercises:"

1. **Create an `api-route-creation` skill**:

```bash
mkdir -p .github/skills/api-route-creation
```

   Create a SKILL.md that teaches Copilot how to create new API routes following the project's Express patterns (model, route, register, Swagger, tests).

2. **Test it**: Ask Copilot to add a new 'Warehouse' entity with name, address, city, state, zipCode, and capacity — watch the skill activate
3. **Bonus**: Create a `react-component-creation` skill for frontend components (functional components, Tailwind CSS, TypeScript)

> "You have 12 minutes. Focus on getting the first skill created and tested."

### Key Points to Emphasize

- Skills are auto-loaded — Copilot decides, not you
- The `description` field is the matching key — be specific about WHEN to use the skill
- Skills can include scripts and resource files alongside SKILL.md
- Project skills (`.github/skills/`) are shared via git; personal skills (`~/.copilot/skills/`) are local — `~` is your OS home directory (e.g., `C:\Users\<username>` on Windows, `/Users/<username>` on macOS)
- Skills vs Instructions: instructions = always-on rules, skills = conditional procedures

### Backup Plan

If auto-selection doesn't visibly work:
1. Explain that skill loading is invisible to the user — it happens in the background
2. Show a before/after: ask about reviewing code without the skill, then with the skill
3. Compare the quality and specificity of responses

---

## Demo 6: Playwright MCP Server (Section 7, Part A)

**Objective**: Show browser-based testing from natural language prompts  
**Duration**: 5 min demo + 15 min hands-on = 20 min  
**After Slide**: 31 (combined with Demo 7)

### Setup Before Demo

- App running locally (`npm run dev`) — **required**
- Frontend accessible at `http://localhost:5137`
- VS Code setting `chat.mcp.discovery.enabled` is `true`
- Playwright MCP server will auto-start when Copilot sends a browser command
- [ ] Know the MCP tool approval dialog — when Copilot first calls an MCP tool, VS Code prompts you to "Allow" it. Click the **dropdown arrow (▼)** and select **"Allow Tools from Playwright Without Review in this Session"** before the demo to avoid repeated approval prompts. Do the same for GitHub MCP in Demo 7.

> ⚠️ **Critical**: Playwright MCP does NOT work in Codespaces. Must be local VS Code.

### Step-by-Step Script

#### Part A: Verify MCP Configuration (30 sec)

1. **Open** `.vscode/mcp.json` in the editor — show the `playwright` and `github` entries
2. **Command Palette**: `Cmd/Ctrl + Shift + P` → type `MCP: List servers` → show both servers listed
3. **Talking point**: "MCP servers auto-start when Copilot needs them. You don't need to manually launch them — just make sure they're defined in your `.vscode/mcp.json`."

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

#### Part C: Run BDD-Style Test Scenarios (2 min)

1. **Start a new chat** — click the **+** button in Copilot Chat (clean context makes for a cleaner saved prompt)
2. **Enter prompt**:
   ```
   Run the following BDD test scenarios against http://localhost:5137 using Playwright:
   1. Given I navigate to the Products page, Then I should see a list of products with names, images, and prices
   2. When I click on a product, Then I should see the product details
   3. When I click "Add to Cart" on a product, Then I should see a confirmation
   Report pass/fail for each scenario.
   ```
3. **Show Copilot executing each scenario**:
   - Navigating to the Products page and checking product cards
   - Clicking a product and verifying details appear
   - Clicking "Add to Cart" and confirming the response
   - Reporting pass/fail for each scenario
4. **Talking point**: "From natural language test scenarios to live execution. Copilot understood the BDD structure, drove a real browser through each scenario, and reported results — no test framework setup, no step definitions, no cucumber. Just describe what to test and watch it happen."
5. **Save as a prompt file**:
   - Click the **Gear icon** (⚙️) at the top of the Copilot Chat panel → **"Save Prompt"**
   - Name it `bdd-playwright-tests` — VS Code saves it as `.github/prompts/bdd-playwright-tests.prompt.md`
   - Open the saved file briefly — show the YAML frontmatter with `mode: 'agent'` and `tools: ['playwright/*']`
6. **Callback to Section 4**: "We just turned a one-off chat into a reusable prompt file — two clicks. That's Section 4 and Section 7 coming together. Anyone on the team can now run the same BDD scenarios."

### Hands-On Instructions (15 min)

> "Six exercises covering both MCP servers:
> 1. **Verify** MCP configuration in `.vscode/mcp.json` and check `chat.mcp.discovery.enabled` in VS Code settings
> 2. **Browse**: Ask Copilot to navigate to `http://localhost:5137` and describe what it sees
> 3. **Test**: Ask Copilot to verify all products have images and prices displayed
> 4. **BDD**: Run BDD-style test scenarios against the Products page via Playwright
> 5. **GitHub MCP**: Use GitHub MCP to list or create issues from Copilot Chat
> 6. **Bonus**: Combine both — use Playwright to find bugs and GitHub MCP to file issues
> 
> You have 15 minutes. Start with Playwright, then try GitHub MCP."

### Key Points to Emphasize

- Playwright MCP bridges the gap between AI and real browsers
- Works for testing, QA, accessibility auditing, screenshot capture
- Must run locally (not Codespaces) — browser needs a display
- BDD-style test scenarios can be described in natural language and executed live via Playwright MCP

### Backup Plan

If Playwright MCP fails to start:
1. Check Node.js version (18+ required)
2. If blocked, show screenshots of previous Playwright sessions
3. Explain the concept and move to GitHub MCP demo

---

## Demo 7: GitHub MCP Server (Section 7, Part B)

**Objective**: Show GitHub interactions from Copilot Chat  
**Duration**: 4 min demo (combined with Demo 6 hands-on)  
**After Slide**: 31 (part of combined MCP demo)

### Setup Before Demo

- GitHub MCP server will auto-start (or verify via `MCP: List servers`)
- Logged in to GitHub with repo access

### Step-by-Step Script

#### Part A: Verify Server (30 sec)

1. **Command Palette** → `MCP: List servers` → confirm `github` is listed
2. **(First time)** When Copilot calls a GitHub MCP tool, the OAuth flow opens in browser — authenticate
3. **Show** server status in the list

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
   - You'll see the tool approval dialog — if you haven't already, select **"Allow Tools from GitHub Without Review in this Session"** from the dropdown to avoid repeated prompts
3. **Open the repo in browser** → Show the new issue exists
4. **Talking point**: "Project management from your IDE. And here's the key: we'll use this pattern in the Cloud Agents section to assign an issue to the Coding Agent."

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

## Demo 8: GitHub CLI (Section 8)

**Objective**: Show GitHub CLI with Copilot AI in the terminal  
**Duration**: 8 min demo + 10 min hands-on = 18 min  
**After Slide**: 34

### Setup Before Demo

- VS Code integrated terminal open
- `gh` CLI installed and authenticated (`gh auth status` shows logged in)
- `gh copilot` extension installed (`gh extension list` shows `github/gh-copilot`)
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
6. **Talking point**: "Project management from your terminal. This connects directly to Coding Agent — you can assign an issue to Copilot and it will code the solution autonomously."

#### Part E: Type Hints — Steering Suggestions (1 min)

1. **Run without type hint**:
   ```bash
   gh copilot suggest "show me which branches have been merged into main"
   ```
2. **Show**: Copilot might suggest a `gh api` command or a `git` command — unpredictable
3. **Run with type hint**:
   ```bash
   gh copilot suggest -t git "show me which branches have been merged into main"
   ```
4. **Show**: Now it returns a `git branch --merged main` command — precisely targeted
5. **Run one more**:
   ```bash
   gh copilot suggest -t gh "find PRs that haven't been reviewed yet"
   ```
6. **Talking point**: "The `-t` flag steers Copilot to the right category: `-t shell` for OS commands, `-t git` for git commands, `-t gh` for GitHub CLI commands. Use it when the default suggestion is the wrong type."

#### Part F: Structured Output with `--json` / `--jq` (1 min)

1. **Run**:
   ```bash
   gh issue list --json number,title,assignees
   ```
2. **Show**: Machine-readable JSON output instead of the usual table format
3. **Run**:
   ```bash
   gh issue list --json title --jq '.[].title'
   ```
4. **Show**: Just the titles — filtered and clean
5. **Run** (if PRs exist):
   ```bash
   gh pr list --json number,title,reviewDecision
   ```
6. **Talking point**: "`--json` and `--jq` turn the GitHub CLI into a scriptable data pipeline. Use this for CI scripts, dashboards, or any automation that needs GitHub data."

### Hands-On Instructions (10 min)

> "Your turn! Try these in the terminal:"

1. Suggest a command — then run the suggested output:

```bash
gh copilot suggest "show me the most recent commits on main with a graph"
```

2. Understand a complex command:

```bash
gh copilot explain "git log --oneline --graph --all --decorate"
```

3. See what issues exist:

```bash
gh issue list
```

4. Create your own issue:

```bash
gh issue create --title "Test issue from CLI" --body "Created during workshop."
```

5. Verify your issue:

```bash
gh issue view --web
```

6. Try type hints — compare to without `-t`:

```bash
gh copilot suggest -t git "show branches merged into main"
```

7. Try structured output:

```bash
gh issue list --json number,title --jq '.[].title'
```

> **Bonus**: Try `gh pr list` and `gh pr status` to explore PR workflows.

### Key Points to Emphasize

- `gh copilot suggest` = natural language → shell command
- `gh copilot explain` = shell command → plain English
- `gh issue create` connects to the Coding Agent workflow (Section 9)
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

## Demo 9: Cloud Agents: Coding Agent + PR Review Agent (Section 9)

**Objective**: Show the autonomous development loop: Issue → Coding Agent → PR → Code Review  
**Duration**: 15 min demo (no hands-on — observe only)  
**After Slide**: 40

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

8. **Show the Coding Agent configuration** (1 min):
   - "Remember the tip we saw in Section 5 — 'You can make Copilot smarter by setting up custom instructions, customizing its development environment and configuring MCP servers'? Here's the environment part."
   - Open `.github/copilot-setup-steps.md` (if it exists in the repo) or explain the concept:
     - "This file tells Coding Agent how to set up the development environment — install dependencies, build the project, run tests."
     - "Think of it as a Dockerfile for AI — without it, Coding Agent has to figure out the build process on its own."
   - Show the example content:
     ```markdown
     npm install
     npm run build
     npm run test:api
     ```
   - "With setup steps, builds are faster, tests run automatically, and PRs are more reliable."

9. **Show the delegation pattern**:
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
| 2 | Custom Instructions | 5 min | 12 min | 17 min |
| 3 | Custom Prompt Files | 6 min | 12 min | 18 min |
| 4 | Custom Agents | 5 min | 10 min | 15 min |
| 5 | Agent Skills | 5 min | 12 min | 17 min |
| 6 | Playwright MCP | 5 min | 15 min | 20 min |
| 7 | GitHub MCP | 4 min | — | 4 min |
| 8 | GitHub CLI | 8 min | 10 min | 18 min |
| 9 | Cloud Agents | 15 min | — | 15 min |
| | | **58 min** | **79 min** | **137 min** |

**Core time budget**:
- Slide presentation: ~82 min
- Demo + hands-on: ~137 min
- Wrap-up/Q&A: 10 min
- Buffer: ~3 min

**Core total**: ~232 min (~3h 52min)

---

## General Backup Plan

If a demo is completely blocked:

1. **Show pre-captured screenshots** from a previous run
2. **Switch to GitHub Docs** walkthrough for that feature:
   - Custom Instructions: `docs.github.com/en/copilot/how-tos/configure-custom-instructions`
   - Prompt Files: `docs.github.com/en/copilot/how-tos/copilot-prompts`
   - Agent Skills: `docs.github.com/en/copilot/concepts/agents/about-agent-skills`
   - MCP: `docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot`
   - Coding Agent: `docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent`
   - GitHub CLI: `cli.github.com`
3. **Engage the audience** with Q&A while troubleshooting
4. **Skip to the next section** and come back if time permits

### Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Copilot not responding | Check internet connection, verify sign-in status |
| Agent mode unavailable | Update VS Code + Copilot extensions to latest |
| MCP server won't start | `MCP: List servers` → check status, verify `chat.mcp.discovery.enabled` is `true` in VS Code settings |
| Playwright browser doesn't appear | Verify running locally (not Codespaces) |
| GitHub MCP auth fails | Re-authenticate: `MCP: List servers` → `github` → check status, re-trigger OAuth by sending a GitHub-related prompt |
| App not running | `npm run dev` in terminal, check ports 3000/5137 |
| CORS errors (Codespaces) | Set port 3000 visibility to `public` |
| Tests timeout | `npm run test:api -- --timeout 30000` |
| Hot reload not working | Stop + restart `npm run dev`, hard refresh browser |
| Coding Agent not starting | Check: Actions enabled, branch protection set, Coding Agent enabled in settings |
| `gh` CLI not found | Install from cli.github.com, then run `gh auth login` |
| `gh copilot` not available | Run `gh extension install github/gh-copilot` |

---

## Post-Demo Cleanup

After each run-through or the actual workshop:

```bash
# Reset all changes (keep only original repo state)
git checkout -- .
git clean -fd

# Remove created files (keep OctoCATEngineer — it's pre-built in the repo)
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
