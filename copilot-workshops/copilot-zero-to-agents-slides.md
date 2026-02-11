# GitHub Copilot: Zero to Agents

## Slide Deck with Presenter Notes

**Duration**: 4 hours  
**Format**: Presentation + Live Demos + Hands-On (intermixed)  
**Audience**: Developers with basic Copilot exposure  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)

---

> **Presenter Note**: This deck follows a demo-then-hands-on flow. Each section has concept slides followed by a live demo and attendee exercises. Look for 🖥️ **SWITCH TO DEMO** markers. Ensure the OctoCAT Supply app is running before you begin.

---

## Slide 1: Title

# GitHub Copilot
## Zero to Agents

*From casual usage to fully customized, agentic AI development*

**Repo**: `github.com/microsoft/GitHubCopilot_Customized`

---

> **Presenter Note**: Welcome attendees. "Today we're going from zero — basic Copilot usage — all the way to autonomous agents writing code and reviewing PRs. Everything we build uses real files in a real repo that you'll take home."

---

## Slide 2: Agenda

### What We'll Cover Today

| Time | Topic |
|------|-------|
| 20 min | Welcome & Environment Setup |
| 25 min | Copilot Interaction Modes (Ask, Edit, Agent) |
| ☕ 10 min | Break |
| 20 min | Custom Instructions |
| 20 min | Custom Prompt Files |
| 20 min | Custom Agents (Chat Modes) |
| 🍽️ 10 min | Break |
| 20 min | Agent Skills |
| 25 min | MCP Servers (Playwright + GitHub) |
| ☕ 10 min | Break |
| 25 min | Vision + Agent Mode Deep Dive |
| 20 min | Cloud Agents (Coding Agent + PR Review) |
| 10 min | Wrap-Up & Q&A |

---

> **Presenter Note**: "We'll alternate between slides, live demos, and your own hands-on time. Each section I'll show you the concept, demo it live, then give you time to try it. Feel free to stop me with questions."

---

## Slide 3: The Journey — Zero to Agents

### Your Progression Today

```
  ZERO              CUSTOMIZE             EXTEND              AGENTS
  ─────►           ──────────►           ─────────►          ─────────►

  Interaction       Instructions          MCP Servers         Vision + Agent
  Modes             Prompt Files          (Playwright,        Coding Agent
  (Ask/Edit/Agent)  Agents/Chat Modes     GitHub)             PR Review Agent
                    Agent Skills
```

**Each layer builds on the last.**

---

> **Presenter Note**: "Think of this as a stack. We start with the basics — how to interact with Copilot. Then we customize it for YOUR team. Then we extend it to touch external tools. Then we let it loose as an autonomous agent. By the end, you'll have built every layer."

---

## Slide 4: The Customization Hierarchy

### Files You'll Create Today

| Layer | File Location | When Active |
|-------|---------------|-------------|
| Instructions | `.github/copilot-instructions.md` | Always loaded |
| Scoped Instructions | `.github/instructions/*.instructions.md` | When matching files open |
| Prompt Files | `.github/prompts/*.prompt.md` | On-demand (you invoke) |
| Agents | `.github/agents/*.agent.md` | Selected in chat mode picker |
| Skills | `.github/skills/*/SKILL.md` | Auto-selected by relevance |
| MCP Servers | `.vscode/mcp.json` | When server is running |

**Key insight**: Instructions are always-on. Everything else is selective.

---

> **Presenter Note**: "This is the cheat sheet for the whole day. Keep this mental model — instructions are always listening, prompts are on-demand, skills are auto-selected. We'll cover each one in depth."

---

## Slide 5: The Demo App — OctoCAT Supply

### What We're Working With

- **App**: OctoCAT Supply — a supply chain management web app
- **Frontend**: React 18+, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, TypeScript, OpenAPI/Swagger
- **Entities**: Headquarters, Branches, Products, Suppliers, Orders, Deliveries
- **Created entirely with Copilot** — including the hero image

### Getting Started

```bash
git clone https://github.com/<YOUR-FORK>/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
npm install && npm run dev
```

- API: `http://localhost:3000`
- Frontend: `http://localhost:5137`

---

> **Presenter Note**: 🖥️ **SWITCH TO SETUP**. Have attendees fork, clone, and run the app. Walk around and help with any issues. Budget 10 minutes for this. Common issues: Node version too old, port conflicts, Codespaces CORS.

---

# SECTION: Interaction Modes

---

## Slide 6: Three Ways to Talk to Copilot

### Ask, Edit, Agent

| Mode | Purpose | Scope | Changes Files? |
|------|---------|-------|:--------------:|
| **Ask** | Explore, learn, understand | Entire codebase | No |
| **Edit** | Targeted inline changes | Selected code / current file | Yes (with preview) |
| **Agent** | Build features, run commands | Full codebase + terminal | Yes (multi-file) |

### Decision Framework

```
"I need to understand something"     → Ask
"I need to change specific code"     → Edit
"I need to build/fix/create"         → Agent
```

---

> **Presenter Note**: "Most of you have probably used completions. Some of you have used chat. But the mode you select dramatically affects what Copilot can do. Let me show you the difference."

---

## Slide 7: Ask Mode — Your Codebase Expert

### What Ask Mode Does

- Reads your entire codebase (with `@workspace`)
- Answers questions with file and line references
- Explains architecture, patterns, and design decisions
- **Never modifies** any files

### Try These Prompts

```
Please give me details about the API of this project.
What testing framework does this project use?
Are there any core features missing?
```

---

> **Presenter Note**: "Ask mode is your senior engineer who's read the entire codebase. It won't touch anything — it just explains. Perfect for onboarding or before you start coding."

---

## Slide 8: Edit Mode — Surgical Changes

### What Edit Mode Does

- Works on selected code or the current file
- Shows inline diffs before applying
- Accept/reject individual changes
- **Targeted, precise, reviewable**

### Great For

- Adding JSDoc/documentation to functions
- Refactoring variable names
- Adding error handling to a specific block
- Converting between patterns

---

> **Presenter Note**: "Edit mode is your scalpel. Select code, tell it what to change, review the diff. It's the safest mode for production code because you see every change before it lands."

---

## Slide 9: Agent Mode — Your Pair Programmer

### What Agent Mode Does

- Reads and writes multiple files
- Runs terminal commands (build, test, lint)
- Iterates until the task works (self-healing)
- Uses tools: file search, web fetch, code analysis

### The Power Move

```
Build and run my project so I can see its existing state.
```

Copilot will: read config → install deps → build → start → verify.

---

> **Presenter Note**: "Agent mode is where the magic happens. It's not just autocomplete — it's a programmable collaborator that can build features across your entire codebase."

---

## Slide 10: Demo Time

# 🖥️ LIVE DEMO

### Copilot Interaction Modes

- Ask: Explore the API architecture
- Edit: Add JSDoc to a route handler
- Agent: Build and run the project

*Then: Your turn to try all three (8 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 1**. Run through Ask → Edit → Agent demos. Then give attendees 8 minutes to try each mode. Walk around and help. ~15 min total for demo + hands-on.

---

# SECTION: Custom Instructions

---

## Slide 11: Why Custom Instructions?

### The Problem

Copilot is trained on the entire internet — but it doesn't know:
- Your internal frameworks
- Your team's coding standards
- Your architecture decisions
- Your company's naming conventions

### The Solution

`.github/copilot-instructions.md` — a file that tells Copilot **how your team works**.

Loaded into **every single interaction**, invisibly.

---

> **Presenter Note**: "Ask the audience: Raise your hand if Copilot has ever suggested something that doesn't follow your team's standards. Every hand should go up. Custom instructions fix that."

---

## Slide 12: Two Types of Instructions

### Project-Wide vs Scoped

| Type | File | When Active |
|------|------|-------------|
| **Project-wide** | `.github/copilot-instructions.md` | Every interaction |
| **Scoped** | `.github/instructions/API.instructions.md` | Only when matching files open |

### Scoped Instructions Use Glob Patterns

```yaml
---
applyTo: "api/**"
---
# Only active when working in the api/ directory
```

### What to Include

✅ Coding standards, naming conventions, internal framework references, architecture patterns, security requirements

❌ Full documentation, step-by-step tutorials, lengthy prose (wastes context window)

---

> **Presenter Note**: "Keep instructions concise. They're loaded on every interaction, so they consume your context window. Think bullet points, not essays."

---

## Slide 13: The Power of Internal Frameworks

### TAO: Teaching Copilot About Things It's Never Seen

**TAO** (TypeScript API Observability) is a fictional internal framework.

It doesn't exist on the internet. No training data. Zero public code.

Yet with custom instructions, Copilot generates perfect TAO code:

```typescript
import { initTAO, observe } from '@tao/core';
import { Measure, Trace, Log } from '@tao/core';
```

**How?** One line in custom instructions:
> *"Implement logging using TAO. Reference: docs/tao.md"*

---

> **Presenter Note**: "This is usually the 'aha moment'. When they see Copilot generating code for a framework that literally doesn't exist, they get why instructions matter. Every company has their own TAO."

---

## Slide 14: Demo Time

# 🖥️ LIVE DEMO

### Custom Instructions

- Generate `copilot-instructions.md` using the Gear icon
- Create scoped `API.instructions.md`
- TAO observability example

*Then: Create your own instructions (5 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 2**. Generate instructions → create scoped instructions → TAO demo. Then 5 min hands-on. ~15 min total.

---

# SECTION: Custom Prompt Files

---

## Slide 15: Prompts vs Instructions

### Different Tools for Different Jobs

| Feature | Instructions | Prompt Files |
|---------|-------------|-------------|
| **Loaded** | Automatically, always | On-demand (you invoke) |
| **Purpose** | Set rules and standards | Execute specific tasks |
| **Reusable** | Yes (passive) | Yes (active) |
| **Has frontmatter** | No (scoped ones do) | Yes (mode, tools, description) |

**Analogy**: Instructions = your team's style guide (always applies). Prompts = your team's runbooks (run when needed).

---

> **Presenter Note**: "If instructions are the rules, prompts are the playbooks. 'When you need to generate tests, run this prompt. When you need a security review, run that prompt.' Consistency across the team."

---

## Slide 16: Anatomy of a Prompt File

### `.github/prompts/my-prompt.prompt.md`

```yaml
---
mode: 'agent'                    # ask, edit, or agent
description: 'What this does'    # Shows in the picker
tools: ['codebase', 'editFiles', # What tools agent can use
  'runCommands', 'search']
---

# Prompt Title

Markdown instructions for what Copilot should do.

## Requirements
- Specific patterns to follow
- Files to reference
- Quality standards

## Success Criteria
- What "done" looks like
```

### How to Run

- **Run button** in the `.prompt.md` file header
- **Command Palette** → "Prompts: Run Prompt"
- **Type** `/prompt-name` in Copilot Chat

---

> **Presenter Note**: "The YAML frontmatter is key. It tells Copilot which mode to use and which tools to enable. The Markdown body is your instructions. Think of it as a recipe — YAML is the ingredients list, Markdown is the steps."

---

## Slide 17: Prompts in This Repo

### Three Ready-to-Run Prompts

| Prompt | Mode | Purpose |
|--------|------|---------|
| `Unit-Test-Coverage.prompt.md` | Agent | Generate tests for Product + Supplier routes |
| `plan.prompt.md` | Agent | Create implementation plans (no code!) |
| `model.prompt.md` | Agent | Compare AI models with live doc fetching |

### Unit Test Prompt Highlights

- Specifies exact test patterns to follow (`branch.test.ts`)
- Lists CRUD + error scenarios as requirements
- Includes `npm run test:api` commands for validation
- Agent self-heals when tests fail

---

> **Presenter Note**: "Walk through the unit test prompt file on screen. Point out: the tools list (runCommands lets it execute tests), the pattern reference (follow branch.test.ts), and the success criteria (all tests passing)."

---

## Slide 18: Demo Time

# 🖥️ LIVE DEMO

### Custom Prompt Files

- Walk through 3 existing prompts
- Run the unit test prompt live
- Show self-healing on test failures

*Then: Create your own prompt file (7 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 3**. Walk through prompts → run unit test prompt → show self-healing. Then 7 min hands-on to create a security-review prompt. ~13 min total.

---

# SECTION: Custom Agents (Chat Modes)

---

## Slide 19: Agents — Persistent Personas

### What Makes Agents Different

| Feature | Prompt Files | Custom Agents |
|---------|-------------|---------------|
| **Duration** | Single execution | Entire chat session |
| **Behavior** | "Do this task" | "Be this persona" |
| **Model** | Uses current model | Can specify its own model |
| **Appears in** | Prompt picker | Chat mode selector |
| **File** | `.prompt.md` | `.agent.md` |

**Analogy**: Prompt = a recipe. Agent = a chef who knows many recipes.

---

> **Presenter Note**: "The key difference: prompts are one-shot tasks, agents are ongoing personas. When you select an agent, it stays active for your whole session. It changes HOW Copilot thinks, not just WHAT it does."

---

## Slide 20: Anatomy of an Agent

### `.github/agents/MyAgent.agent.md`

```yaml
---
tools: ['search', 'github/*', 'playwright/*']
description: Explore implementation ideas
model: Claude Sonnet 4.5
---

Your persona and behavior instructions go here.

This text defines WHO the agent IS, not just what it does.
```

### Key Fields

- **tools**: Which tools the agent can access (supports wildcards: `github/*`)
- **model**: Which AI model to use (can differ from default)
- **description**: Shown in the Copilot Chat mode picker

---

> **Presenter Note**: "Notice the model field — agents can choose their own model. The ImplementationIdeas agent uses Claude Sonnet 4.5. This lets you match the right model to the right workflow."

---

## Slide 21: Agents Can Delegate

### The ImplementationIdeas Agent

This agent demonstrates multi-level agentic behavior:

1. **Research** — Searches codebase in parallel
2. **Plan** — Creates a todo list of variations
3. **Delegate** — Calls `create_pull_request_with_copilot` to hand off to Coding Agent

```
IDE Agent (research + plan)
    └──► Coding Agent (autonomous implementation)
        └──► Pull Request
```

**Agents calling agents.** This is the agentic pattern.

---

> **Presenter Note**: "This is where it gets interesting. An agent in your IDE can research a problem, create a plan, and then delegate the actual coding to GitHub's Coding Agent. You get a PR in your repo without writing a line of code."

---

## Slide 22: Demo Time

# 🖥️ LIVE DEMO

### Custom Agents (Chat Modes)

- Review ImplementationIdeas agent
- Show it in the chat mode picker
- Create a CodeReviewer agent live

*Then: Create your own agent (5 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 4**. Review existing agent → show mode picker → create CodeReviewer agent. Then 5 min hands-on. ~15 min total.

---

# SECTION: Agent Skills

---

## Slide 23: Skills — The Auto-Pilot Layer

### How Skills Differ from Everything Else

| Aspect | Instructions | Prompts | Agents | Skills |
|--------|-------------|---------|--------|--------|
| **Loaded** | Always | Manual | Manual | **Auto** |
| **Trigger** | Every interaction | You invoke | You select | **Copilot decides** |
| **Best for** | Simple rules | Specific tasks | Personas | **Specialized procedures** |
| **Includes** | Text only | Text only | Text only | **Text + scripts + files** |

**The key insight**: Skills are instructions that Copilot loads ONLY when it recognizes they're relevant to your prompt.

---

> **Presenter Note**: "Skills are the most 'intelligent' customization layer. You don't invoke them — Copilot reads the description and decides when they're relevant. It's like having an expert on call who only chimes in when their expertise is needed."

---

## Slide 24: Skill Structure

### `.github/skills/my-skill/SKILL.md`

```yaml
---
name: github-actions-debugging
description: Guide for debugging failing GitHub Actions workflows.
  Use this when asked to debug failing workflows.
---

Step-by-step instructions that Copilot follows
when this skill is activated.

Can reference scripts and files in the same directory.
```

### Skill Scope

| Type | Location | Shared |
|------|----------|--------|
| **Project** | `.github/skills/` | Via git (team-wide) |
| **Personal** | `~/.copilot/skills/` | Your machine only |

---

> **Presenter Note**: "The description field is critical — it's how Copilot decides whether to load the skill. Be specific about WHEN this skill should be used. Vague descriptions = skills that never get loaded."

---

## Slide 25: Skills vs Instructions — When to Use Each

### The Decision

| Use Case | Use This |
|----------|----------|
| "Always use TypeScript strict mode" | **Instruction** |
| "When debugging CI, follow these steps..." | **Skill** |
| "Never hardcode credentials" | **Instruction** |
| "When creating API routes, use this pattern..." | **Skill** |
| "Our team uses Vitest for testing" | **Instruction** |
| "When generating tests, include these scenarios..." | **Skill** |

**Rule of thumb**: If it's a simple rule → instruction. If it's a detailed procedure → skill.

---

> **Presenter Note**: "Common mistake: putting detailed procedures in instructions. That wastes context window on every interaction. Skills only load when needed — they're more efficient for complex, specialized knowledge."

---

## Slide 26: Demo Time

# 🖥️ LIVE DEMO

### Agent Skills

- Create a skill from scratch
- Show auto-selection in action
- Reference community skill collections

*Then: Create a skill for OctoCAT Supply (7 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 5**. Create github-actions-debugging skill → trigger it with a prompt → show auto-selection. Then 7 min hands-on. ~13 min total.

---

# SECTION: MCP Servers

---

## Slide 27: What is MCP?

### Model Context Protocol — Copilot's Extension Layer

```
┌──────────────┐     MCP      ┌──────────────────┐
│              │ ◄──────────► │  Playwright       │
│   Copilot    │              │  (browser testing) │
│   Agent      │     MCP      ├──────────────────┤
│   Mode       │ ◄──────────► │  GitHub           │
│              │              │  (issues, PRs)     │
│              │     MCP      ├──────────────────┤
│              │ ◄──────────► │  Any MCP Server   │
│              │              │  (databases, APIs) │
└──────────────┘              └──────────────────┘
```

**MCP = USB for AI.** Plug in any tool and Copilot can use it.

---

> **Presenter Note**: "MCP stands for Model Context Protocol. It's an open standard for connecting AI models to external tools. Think of it like USB — before USB, every device had its own connector. MCP is the universal connector for AI tools."

---

## Slide 28: MCP Configuration

### `.vscode/mcp.json`

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

### Two Server Types

| Type | How It Runs | Auth | Example |
|------|-------------|------|---------|
| **HTTP** | Remote service | OAuth | GitHub MCP |
| **stdio** | Local process | None | Playwright MCP |

### Starting Servers

`Cmd/Ctrl + Shift + P` → `MCP: List servers` → Select → `Start server`

---

> **Presenter Note**: "The config lives in your repo — `.vscode/mcp.json`. When someone clones your repo, they get the MCP configuration too. Team-wide extensibility."

---

## Slide 29: Playwright MCP — Browser Testing from Chat

### What You Can Do

- Navigate to any URL from chat
- Interact with pages (click, type, scroll)
- Take screenshots and describe UI
- Generate and execute test scenarios
- Create BDD `.feature` files from natural language

### Example Prompts

```
Browse to http://localhost:5137 and navigate to Products.
Click on the first product and check if details display correctly.
Generate a Gherkin .feature file for the Products page.
```

> ⚠️ Playwright MCP requires local VS Code (not Codespaces)

---

> **Presenter Note**: "This is usually the biggest 'wow' moment. When they see Copilot driving a real browser from a chat prompt, the possibilities click. Testing, QA, accessibility auditing — all from natural language."

---

## Slide 30: GitHub MCP — GitHub from Chat

### What You Can Do

- List and search issues and PRs
- Create issues with labels and assignees
- Read file contents and repo metadata
- Create pull requests
- Assign issues to Copilot (Coding Agent trigger!)

### Example Prompts

```
Check which issues are assigned to me in this repo.
Create an Issue to improve test coverage and assign it to me.
List open PRs and summarize their status.
```

---

> **Presenter Note**: "GitHub MCP is the bridge between your IDE and your project management. No more switching between VS Code and the browser to create issues. And here's the key: you can use it to assign issues to Coding Agent, which we'll see next."

---

## Slide 31: Demo Time

# 🖥️ LIVE DEMO

### MCP Servers

- Start both servers
- Playwright: Browse and test the app
- GitHub: Create and manage issues from chat

*Then: Use Playwright MCP to test the app (8 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMOS 6 & 7**. Start servers → Playwright browser test → GitHub issue creation. Then 8 min hands-on with Playwright. ~17 min total.

---

# SECTION: Vision + Agent Mode

---

## Slide 32: Vision — Copilot Sees Images

### What Copilot Vision Can Do

- Understand screenshots, mockups, and design files
- Identify UI components, layout, colors, typography
- Extract requirements from visual designs
- Generate implementation plans from images

### How to Use

1. Drag an image into Copilot Chat (or use the paperclip 📎)
2. Describe what you want
3. Copilot analyzes the image and responds

**Supported**: PNG, JPG, GIF, WEBP

---

> **Presenter Note**: "Vision is what makes the Plan → Agent workflow so powerful. You can hand Copilot a designer's mockup and say 'build this.' It reads the image, understands the layout, and plans the implementation."

---

## Slide 33: The Plan → Agent Workflow

### Two-Phase Development

```
Phase 1: PLAN                          Phase 2: AGENT
┌─────────────────────┐                ┌─────────────────────┐
│ • Analyze image     │                │ • Create components │
│ • Identify changes  │ ──────────►    │ • Modify routes     │
│ • Propose plan      │                │ • Update styles     │
│ • Get feedback      │                │ • Run and verify    │
└─────────────────────┘                └─────────────────────┘
       THINK FIRST                          THEN BUILD
```

**Plan mode thinks. Agent mode builds.** This separation prevents Copilot from rushing into code.

---

> **Presenter Note**: "This is a best practice pattern. Don't jump straight to Agent mode for complex features. Start in Plan, get the design right, then switch to Agent for implementation. It's like architects drawing blueprints before construction starts."

---

## Slide 34: Demo Time

# 🖥️ LIVE DEMO

### Vision + Agent Mode — Cart Page

- Plan mode: Analyze cart.png, create implementation plan
- Agent mode: Implement across multiple files
- Verify: Working cart in the running app

*Then: Add MonaFigurine product from image (10 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 8**. This is the capstone demo — take your time. Plan with cart image → implement with Agent → show working cart. Then 10 min hands-on with MonaFigurine. ~15 min total.

---

# SECTION: Cloud Agents

---

## Slide 35: The Autonomous Development Loop

### From Issue to Merged PR — AI-Assisted at Every Step

```
┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│  GitHub Issue │────►│  Coding Agent  │────►│  Pull Request│
│  (assign to  │     │  (autonomous   │     │  (AI-authored │
│   Copilot)   │     │   coding)      │     │   changes)   │
└──────────────┘     └────────────────┘     └──────┬───────┘
                                                    │
                                           ┌────────▼───────┐
                                           │ Copilot Code   │
                                           │ Review (AI     │
                                           │ review comments)│
                                           └────────┬───────┘
                                                    │
                                           ┌────────▼───────┐
                                           │ Human Reviews  │
                                           │ & Merges       │
                                           └────────────────┘
```

---

> **Presenter Note**: "This is the full loop. An issue gets created, Coding Agent writes the code, creates a PR, Copilot reviews the PR, and a human makes the final call. Every step is AI-assisted."

---

## Slide 36: Coding Agent — Autonomous PRs

### How It Works

1. Create a GitHub Issue (or use an existing one)
2. Assign the issue to **Copilot**
3. Copilot:
   - Creates a feature branch
   - Reads your instructions, skills, and codebase
   - Implements the solution
   - Runs tests (if configured)
   - Opens a Pull Request

### Requirements

- ✅ Actions enabled on the repo
- ✅ Branch protection rule on `main` (PR required)
- ✅ Copilot Coding Agent enabled in repo settings

### Timing

- Simple tasks: ~5-10 minutes
- Complex features: ~15-30 minutes

---

> **Presenter Note**: "Coding Agent reads ALL of your customization files — instructions, skills, everything we built today. It follows your team's standards even when coding autonomously. That's why the customization layers matter."

---

## Slide 37: PR Review Agent — AI Code Review

### How It Works

1. Open any Pull Request
2. Add **Copilot** as a reviewer
3. Copilot reviews for:
   - ☑️ Correctness (logic errors, bugs)
   - 🔒 Security (vulnerabilities, injection risks)
   - ⚡ Performance (N+1 queries, memory leaks)
   - 📝 Style (naming, patterns, best practices)
4. Provides inline comments with suggested fixes
5. Accept individual suggestions (creates commits) or dismiss

### Copilot + Human Review

| Copilot Catches | Humans Catch |
|-----------------|--------------|
| Pattern-based bugs | Business logic correctness |
| Security vulnerabilities | Architectural alignment |
| Performance anti-patterns | Team context and intent |
| Style inconsistencies | UX and product decisions |

**Best together. Not a replacement.**

---

> **Presenter Note**: "Copilot Review is a force multiplier for your human reviewers. It catches the mechanical stuff so humans can focus on the important stuff — does this change make sense for our product?"

---

## Slide 38: Agent Mode vs Coding Agent

### When to Use Each

| Aspect | Agent Mode (IDE) | Coding Agent (Cloud) |
|--------|-----------------|---------------------|
| **Where** | Your IDE | GitHub servers |
| **How** | Interactive chat | Assign a GitHub Issue |
| **Sync** | Real-time | Async (5-30 min) |
| **Best for** | Iterative, exploratory | Well-defined tasks |
| **Output** | Files in your workspace | A Pull Request |

**Rule of thumb**: If you want to watch and steer → Agent Mode. If you want to delegate and do other work → Coding Agent.

---

> **Presenter Note**: "Don't use Coding Agent for everything. It's best for well-defined tasks with clear acceptance criteria. Use Agent Mode when you need to iterate and explore. They're complementary, not competing."

---

## Slide 39: Demo Time

# 🖥️ LIVE DEMO

### Cloud Agents

- Assign an issue to Copilot (Coding Agent)
- Show the autonomous session starting
- Request Copilot Code Review on a PR
- Walk through AI review comments

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 9**. Assign issue to Copilot → show session starting → open a PR → add Copilot as reviewer → walk through review comments. ~15 min total (no hands-on for this section — cloud agents are observe-only).

---

# SECTION: Wrap-Up

---

## Slide 40: What You Built Today

### Your Customization Stack

| File | Section |
|------|---------|
| `.github/copilot-instructions.md` | Custom Instructions |
| `.github/instructions/API.instructions.md` | Scoped Instructions |
| `.github/prompts/security-review.prompt.md` | Custom Prompt Files |
| `.github/agents/CodeReviewer.agent.md` | Custom Agents |
| `.github/skills/*/SKILL.md` | Agent Skills |
| Cart page implementation | Vision + Agent Mode |

**All of these are portable** — commit them to any repo and your team gets them too.

---

> **Presenter Note**: "Look at what you built in one session. Every file in this list makes Copilot smarter for your team. Commit these to your real repos tonight."

---

## Slide 41: Key Takeaways

### Seven Things to Remember

1. **Modes** → Ask to understand, Edit for precision, Agent to build
2. **Instructions** → Encode tribal knowledge (internal frameworks, standards)
3. **Prompt Files** → Reusable task templates for consistency
4. **Agents** → Persistent personas that change Copilot's behavior
5. **Skills** → Auto-selected expertise loaded when relevant
6. **MCP** → Connect Copilot to any external tool
7. **Cloud Agents** → Issue → Code → PR → Review — all AI-assisted

---

> **Presenter Note**: "If you remember nothing else: the customization files live in `.github/` and they follow your code. Share them like you share code — via git."

---

## Slide 42: Your Action Items

### What to Do Next

- [ ] Commit today's customization files to your real repo
- [ ] Identify 3-5 internal frameworks to encode as instructions
- [ ] Create prompt files for your most repetitive tasks
- [ ] Build a skill for your team's most specialized workflow
- [ ] Enable Copilot Code Review on your repositories
- [ ] Share this approach with your team

---

> **Presenter Note**: "These are your homework items. The biggest ROI comes from custom instructions and prompt files — start there. Skills and agents are the next level."

---

## Slide 43: Resources

### Learn More

| Resource | URL |
|----------|-----|
| GitHub Copilot Docs | docs.github.com/en/copilot |
| Custom Instructions | docs.github.com/en/copilot/how-tos/configure-custom-instructions |
| Agent Skills | docs.github.com/en/copilot/concepts/agents/about-agent-skills |
| MCP in Copilot | docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot |
| Coding Agent | docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent |
| Community Skills | github.com/github/awesome-copilot |
| Demo Repo | github.com/microsoft/GitHubCopilot_Customized |

---

> **Presenter Note**: "The demo repo is a public template — share it with anyone who missed this session. Everything we did today is reproducible."

---

## Slide 44: Q&A

# Questions?

### Common Topics

- How do customization files propagate across forks?
- Can we restrict which MCP servers developers use?
- How do skills interact with instructions?
- Does Coding Agent respect branch protection?
- How do we measure ROI on customization?

---

> **Presenter Note**: Leave 10 minutes for Q&A. Have the demo app and GitHub repo open in case questions need live answers. If no questions, offer to deep-dive on any section.

---

## Slide 45: Thank You

# Thank You

**Demo Repo**: `github.com/microsoft/GitHubCopilot_Customized`

**Follow-up**: Happy to schedule a deeper dive on any topic

---

> **Presenter Note**: Thank attendees, remind them about the action items, and offer follow-up support. Point them to the repo — everything they need is there.

---

# Appendix: Presenter Quick Reference

## Demo Timing Guide

| After Slide | Demo | Duration |
|-------------|------|----------|
| 10 | Interaction Modes (Ask/Edit/Agent) + Hands-on | 15 min |
| 14 | Custom Instructions + TAO + Hands-on | 15 min |
| 18 | Prompt Files + Run unit test prompt + Hands-on | 13 min |
| 22 | Agents + ImplementationIdeas review + Hands-on | 15 min |
| 26 | Agent Skills + Create skill + Hands-on | 13 min |
| 31 | MCP Servers (Playwright + GitHub) + Hands-on | 17 min |
| 34 | Vision + Agent (Cart page) + Hands-on | 15 min |
| 39 | Cloud Agents (Coding Agent + PR Review) | 15 min |

**Total demo + hands-on time**: ~118 minutes  
**Total slide/concept time**: ~77 minutes  
**Breaks**: ~30 minutes  
**Buffer/Q&A**: ~10 minutes

## Backup URLs

```
Demo Repo: https://github.com/microsoft/GitHubCopilot_Customized
API Swagger: http://localhost:3000/api-docs
Frontend: http://localhost:5137
GitHub Copilot Docs: https://docs.github.com/en/copilot
Agent Skills Docs: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
MCP Docs: https://docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot
```

---

*Slide deck for GitHub Copilot: Zero to Agents workshop*
*Demo repo: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)*
