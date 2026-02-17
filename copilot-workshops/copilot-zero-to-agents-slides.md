# GitHub Copilot: Zero to Agents

## Slide Deck with Presenter Notes

**Duration**: ~4 hours (235 min core + 28 min extended learning)  
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
| 20 min | [Welcome & Environment Setup](#slide-1-title) |
| 25 min | [Copilot Chat Modes (Ask, Agent, Plan)](#section-chat-modes) |
| 25 min | [Custom Instructions](#section-custom-instructions) |
| 25 min | [Custom Prompt Files](#section-custom-prompt-files) |
| 25 min | [Custom Agents (Chat Modes)](#section-custom-agents-chat-modes) |
| 25 min | [Agent Skills](#section-agent-skills) |
| 30 min | [MCP Servers (Playwright + GitHub)](#section-mcp-servers) |
| 30 min | [Vision + Agent Mode Deep Dive (Cart Page)](#section-vision--agent-mode) |
| 20 min | [Cloud Agents: Coding Agent + PR Review Agent](#section-cloud-agents) |
| 10 min | [Wrap-Up & Q&A](#section-wrap-up) |
| | **Extended Learning (Self-Paced)** |
| E1: 20 min | [GitHub CLI: Copilot in the Terminal](#extended-learning) |
| E2: 8 min | [Copilot SDK: Build Your Own AI Tools](#extended-learning) |

---

> **Presenter Note**: "We'll alternate between slides, live demos, and your own hands-on time. Each section I'll show you the concept, demo it live, then give you time to try it. Feel free to stop me with questions."

---

## Slide 3: The Journey — Zero to Agents

### Your Progression Today

```
  ZERO              CUSTOMIZE             EXTEND              AGENTS
  ─────►           ──────────►           ─────────►          ─────────►

  Chat Modes         Instructions          MCP Servers         Vision + Agent
  (Ask/Agent/Plan)   Prompt Files          (Playwright,        Coding Agent
                     Agents/Chat Modes     GitHub)             PR Review Agent
                     Agent Skills
```

**Each layer builds on the last.**

> 📚 **Extended Learning**: GitHub CLI • Copilot SDK — available as self-paced exercises

---

> **Presenter Note**: "Think of this as a stack. We start with the basics — how to interact with Copilot. Then we customize it for YOUR team. Then we extend it to touch external tools. Then we let it loose as an autonomous agent. By the end, you'll have seen every layer. We also have self-paced exercises on GitHub CLI and the Copilot SDK for those who want to go deeper."

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
| Setup Steps | `.github/copilot-setup-steps.md` | Coding Agent sessions |

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

# SECTION: Chat Modes

---

## Slide 6: Three Ways to Talk to Copilot

### Ask, Agent, Plan

| Mode | Purpose | Scope | Changes Files? |
|------|---------|-------|:--------------:|
| **Ask** | Explore, learn, understand | Entire codebase | No |
| **Agent** | Build features, edit code, run commands | Full codebase + terminal | Yes (single or multi-file) |
| **Plan** | Analyze, plan, propose changes | Entire codebase + images | No |

### Decision Framework

```
"I need to understand something"     → Ask
"I need to build/fix/change"         → Agent
"I need to plan before building"     → Plan
```

---

> **Presenter Note**: "Most of you have probably used completions. Some of you have used chat. But the mode you select dramatically affects what Copilot can do. Let me show you the difference. Note that Agent mode now also has sub-types — Local, Background, and Cloud — which control where and how the agent runs."

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

## Slide 8: Plan Mode — Think Before You Build

### What Plan Mode Does

- Analyzes your codebase, images, and context
- Proposes implementation plans and architectural approaches
- Identifies which files need to change and what steps to take
- **Never modifies** any files — planning only

### Great For

- Planning complex features before implementation
- Analyzing design mockups (Vision + Plan)
- Getting architectural guidance before writing code
- Creating implementation roadmaps for multi-step tasks

---

> **Presenter Note**: "Plan mode is your architect. It reads your codebase, analyzes the problem, and proposes a plan — without touching any code. We'll use this extensively when we build the cart feature from a design image."

---

## Slide 9: Agent Mode — Your Pair Programmer

### What Agent Mode Does

- Reads and writes multiple files
- Handles both targeted inline edits and multi-file changes
- Runs terminal commands (build, test, lint)
- Iterates until the task works (self-healing)
- Uses tools: file search, web fetch, code analysis

### Agent Sub-Types

| Type | Where It Runs | Best For |
|------|---------------|----------|
| **Local** | Your IDE, interactive | Day-to-day coding, building features |
| **Background** | Your IDE, non-blocking | Longer tasks while you continue working |
| **Cloud** | GitHub servers | Autonomous coding from Issues (Section 9) |

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

### Copilot Chat Modes

- Ask: Explore the API architecture
- Plan: Plan how to add input validation
- Agent: Build and run the project

*Then: Your turn to try all three (8 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 1**. Run through Ask → Plan → Agent demos. Then give attendees 8 minutes to try each mode. Walk around and help. ~15 min total for demo + hands-on.

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

> **Presenter Note**: "This is usually the 'aha moment'. When they see Copilot generating code for a framework that literally doesn't exist, they get why instructions matter. Every company has their own TAO. After showing this, use Agent mode to revert the TAO changes and remove the Observability Requirements section from copilot-instructions.md — this shows Copilot can clean up its own work, and ensures the codebase compiles for the remaining exercises."

---

## Slide 14: Demo Time

# 🖥️ LIVE DEMO

### Custom Instructions

- Generate `copilot-instructions.md` using the Gear icon
- Create scoped `API.instructions.md`
- TAO observability example

*Then: Create your own instructions (12 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 2**. Generate instructions → create scoped instructions → TAO demo. Then 12 min hands-on. ~20 min total.

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
mode: 'agent'                    # ask, agent, or plan
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

*Then: Create your own prompt file (12 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 3**. Walk through prompts → run unit test prompt → show self-healing. Then 12 min hands-on to create a security-review prompt. ~18 min total.

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
tools: ['codebase', 'search', 'editFiles', 'runCommands', 'problems']
description: Full-stack engineer for the OctoCAT Supply app
model: Claude Sonnet 4
---

Your persona and behavior instructions go here.

This text defines WHO the agent IS, not just what it does.
```

### Key Fields

- **tools**: Which tools the agent can access (supports wildcards: `github/*`)
- **model**: Which AI model to use — optional, defaults to your current selection
- **description**: Shown in the Copilot Chat mode picker

### Agent Progression (Simple → Advanced)

| Agent | Tools | Model | Pattern |
|-------|-------|-------|---------|
| **OctoCATEngineer** | Local read/write | Default | Simple worker — builds features |
| **CodeReviewer** | Local read-only | Claude Sonnet 4 | Reviewer — analyzes, doesn't edit |
| **ImplementationIdeas** | MCP wildcards + cloud | Claude Sonnet 4.5 | Advanced — delegates to Coding Agent |

---

> **Presenter Note**: "We'll look at three agents in this section, from simple to advanced. The OctoCATEngineer uses basic local tools — no MCP, no custom model. CodeReviewer is read-only with a custom model. ImplementationIdeas uses MCP wildcards and delegates to the cloud Coding Agent. Same file format, wildly different capabilities."

---

## Slide 21: Agents Can Delegate — Advanced Pattern

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

> We'll cover the Coding Agent in detail in Section 9.

---

> **Presenter Note**: "This is the advanced pattern — don't worry if it feels like a leap. An agent in your IDE can research a problem, create a plan, and then delegate the actual coding to GitHub's Coding Agent. We'll see the Coding Agent up close in the Cloud Agents section."

---

## Slide 22: Demo Time

# 🖥️ LIVE DEMO

### Custom Agents (Chat Modes)

- Use the OctoCATEngineer agent (simple local worker)
- Create a CodeReviewer agent live (read-only)
- Review the ImplementationIdeas agent (advanced delegation)

*Then: Use and create your own agents (10 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 4**. Review existing agent → show mode picker → create CodeReviewer agent. Then 10 min hands-on. ~17 min total.

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

*Then: Create a skill for OctoCAT Supply (12 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 5**. Create github-actions-debugging skill → trigger it with a prompt → show auto-selection. Then 12 min hands-on. ~18 min total.

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

*Then: Use Playwright MCP to test the app (15 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMOS 6 & 7**. Start servers → Playwright browser test → GitHub issue creation. Then 15 min hands-on with Playwright. ~24 min total.

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

*Then: Add MonaFigurine product from image (15 min)*

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 8**. This is the capstone demo — take your time. Plan with cart image → implement with Agent → show working cart. Then 15 min hands-on with MonaFigurine. ~22 min total.

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

## Slide 37: Making Coding Agent Smarter

### Configuring the Coding Agent Environment

Coding Agent reads your customization files AND a special setup file:

| File | Purpose | Used By |
|------|---------|---------|
| `.github/copilot-instructions.md` | Coding standards, architecture rules | IDE Agent + Coding Agent |
| `.github/skills/*/SKILL.md` | Specialized procedures (auto-selected) | IDE Agent + Coding Agent |
| `.github/copilot-setup-steps.md` | **Environment setup commands** | **Coding Agent only** |

### `copilot-setup-steps.md`

Shell commands that Coding Agent runs before coding — like a `Dockerfile` for AI:

```bash
npm install
npm run build
npm run test:api
```

**Without it**: Coding Agent guesses the build process.
**With it**: Faster builds, automatic test verification, reliable PRs.

> Remember the Coding Agent tip from Section 5? This is how you act on it.

---

> **Presenter Note**: "This slide connects back to Section 5. When the ImplementationIdeas agent delegated to Coding Agent, it showed a tip about making Copilot smarter. This is how — `copilot-setup-steps.md` tells Coding Agent how to set up the environment. Think of it as a Dockerfile for AI."

---

## Slide 38: PR Review Agent — AI Code Review

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

## Slide 39: Agent Mode vs Coding Agent

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

## Slide 40: Demo Time

# 🖥️ LIVE DEMO

### Cloud Agents

- Create a GitHub Issue in the browser (Issues tab → New issue)
- Assign the issue to Copilot (Coding Agent)
- Show the autonomous session starting
- Request Copilot Code Review on a PR
- Walk through AI review comments

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 9**. Navigate to the Issues tab → New issue → fill in title and body → Submit → assign to Copilot → show session starting → open a PR → add Copilot as reviewer → walk through review comments. ~15 min total (no hands-on for this section — cloud agents are observe-only).

---

# SECTION: Wrap-Up

---

## Slide 41: What You Built Today

### Your Customization Stack

| File | Section |
|------|---------|
| `.github/copilot-instructions.md` | Custom Instructions |
| `.github/instructions/API.instructions.md` | Scoped Instructions |
| `.github/prompts/security-review.prompt.md` | Custom Prompt Files |
| `.github/agents/CodeReviewer.agent.md` | Custom Agents |
| `.github/skills/*/SKILL.md` | Agent Skills |
| Cart page implementation | Vision + Agent Mode |
| `.github/copilot-setup-steps.md` *(discussed)* | Coding Agent Configuration |

**All of these are portable** — commit them to any repo and your team gets them too.

**Extended Learning (Self-Paced)**:

| Exercise | Topic |
|----------|-------|
| E1 | GitHub CLI: Copilot in the Terminal |
| E2 | Copilot SDK: Build Your Own AI Tools |

---

> **Presenter Note**: "Look at what you built in one session. Every file in this list makes Copilot smarter for your team. Commit these to your real repos tonight."

---

## Slide 42: Key Takeaways

### Seven Things to Remember

1. **Modes** → Ask to understand, Plan to design, Agent to build
2. **Instructions** → Encode tribal knowledge (internal frameworks, standards)
3. **Prompt Files** → Reusable task templates for consistency
4. **Agents** → Persistent personas that change Copilot's behavior
5. **Skills** → Auto-selected expertise loaded when relevant
6. **MCP** → Connect Copilot to any external tool
7. **Cloud Agents** → Issue → Code → PR → Review — all AI-assisted

---

> **Presenter Note**: *"If you remember nothing else: the customization files live in `.github/` and they follow your code. Share them like you share code — via git. And check out the Extended Learning exercises on CLI and SDK for deeper dives."*

---

## Slide 43: Your Action Items

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

## Slide 44: Resources

### Learn More

| Resource | URL |
|----------|-----|
| GitHub Copilot Docs | docs.github.com/en/copilot |
| GitHub CLI | cli.github.com |
| Copilot in the CLI | docs.github.com/en/copilot/github-copilot-in-the-cli |
| Custom Instructions | docs.github.com/en/copilot/how-tos/configure-custom-instructions |
| Prompt Files | docs.github.com/en/copilot/how-tos/copilot-prompts |
| Agent Skills | docs.github.com/en/copilot/concepts/agents/about-agent-skills |
| MCP Servers | docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot |
| Copilot Coding Agent | docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent |
| Copilot Code Review | docs.github.com/en/copilot/using-github-copilot/code-review |
| Copilot Trust Center | resources.github.com/copilot-trust-center/ |
| Copilot SDK | github.com/github/copilot-sdk |
| Community Skills | github.com/github/awesome-copilot |
| OctoCAT Supply Repo | github.com/microsoft/GitHubCopilot_Customized |

---

> **Presenter Note**: "The demo repo is a public template — share it with anyone who missed this session. Everything we did today is reproducible."

---

## Slide 45: Q&A

# Questions?

### Common Topics

- How do customization files propagate across forks?
- Can we restrict which MCP servers developers use?
- How do skills interact with instructions?
- Does Coding Agent respect branch protection?
- How do we measure ROI on customization?
- Can we use custom instructions with Copilot in github.com (not just IDE)?

---

> **Presenter Note**: Leave 10 minutes for Q&A. Have the demo app and GitHub repo open in case questions need live answers. If no questions, offer to deep-dive on any section.

---

## Slide 46: Thank You

# Thank You

**Demo Repo**: `github.com/microsoft/GitHubCopilot_Customized`

**Follow-up**: Happy to schedule a deeper dive on any topic

---

> **Presenter Note**: Thank attendees, remind them about the action items, and offer follow-up support. Point them to the repo — everything they need is there. Mention the Extended Learning exercises for those who want to explore CLI and SDK on their own.

---

# EXTENDED LEARNING

---

## Slide 47: Extended Learning Overview

# Extended Learning — Self-Paced

| Exercise | Topic | Time |
|----------|-------|------|
| E1 | GitHub CLI: Copilot in the Terminal | 20 min |
| E2 | Copilot SDK: Build Your Own AI Tools | 8 min |

> **Note**: These exercises are designed for self-paced learning after the workshop.

> **Presenter Note**: *"If you want to go deeper, we have two extended learning exercises available. The GitHub CLI section teaches you how to use Copilot from the command line, and the SDK section shows how to embed Copilot in your own applications. Both are self-paced — you can work through them after the workshop."*

---

## Slide 48: GitHub CLI — Copilot in the Terminal

### `gh` — GitHub from the Terminal

| Command | What It Does |
|---------|-------------|
| `gh copilot suggest` | AI-generated shell commands from natural language |
| `gh copilot explain` | Plain-English explanations of complex commands |
| `gh issue create/list` | Manage issues without leaving the terminal |
| `gh pr create/list/view` | Manage pull requests from the command line |
| `gh repo clone/fork` | Clone and fork repos instantly |

### Copilot CLI Commands

```bash
# Describe what you want → Copilot generates the command
gh copilot suggest "find all TypeScript files modified in the last week"

# Paste a command you don't understand → Copilot explains it
gh copilot explain "git log --oneline --graph --all --decorate"
```

### Why CLI Matters

- CLI + MCP = two ways to manage GitHub from your dev environment
- `gh copilot` brings AI assistance to your terminal, not just your IDE
- Scriptable output with `--json` / `--jq` for dashboards and CI

> **Presenter Note**: *"The GitHub CLI is your power-user interface. Everything you can do in the browser — issues, PRs, repo management — you can do faster from the terminal. And with `gh copilot`, you don't even need to memorize the commands."*

---

## Slide 49: CLI Power User — Type Hints & Demo

### Type Hints with `-t`

| Flag | Scope | Use When |
|------|-------|----------|
| `-t shell` | Shell/OS commands | File operations, system tasks |
| `-t git` | Git commands only | Branch, commit, merge operations |
| `-t gh` | GitHub CLI commands | Issues, PRs, repo management |

### Structured Output

```bash
# Machine-readable output
gh issue list --json number,title,assignees

# Filter with jq expressions
gh pr list --json number,title,reviewDecision \
  --jq '.[] | select(.reviewDecision == "APPROVED")'
```

### 🖥️ Try It Yourself (10 min)

1. Run `gh auth status` to verify authentication
2. Use `gh copilot suggest` to generate a command
3. Try type hints: `-t git`, `-t gh`, `-t shell`
4. Show structured output with `--json` / `--jq`
5. Create an issue: `gh issue create --title "Test issue"`

> **Presenter Note**: *"Two power-user tips: type hints constrain what kind of command Copilot suggests, and `--json` + `--jq` turn GitHub CLI into a scriptable data tool. Use this for dashboards, reports, and CI scripts."*

---

## Slide 50: Copilot SDK — Embed AI in Your Tools

### Beyond Customization: Programmable AI

| Workshop (Today) | Copilot SDK |
|-----------------|-------------|
| Customize Copilot | Embed Copilot in your tools |
| Runs in VS Code / GitHub | Runs anywhere |
| Markdown configuration | Programmatic API |
| End-user workflow | Developer/platform workflow |

### Basic Agent Session

```typescript
import { CopilotSDK } from '@github/copilot-sdk';

const sdk = new CopilotSDK();
const session = await sdk.createSession({
  instructions: "You are a deployment assistant."
});

const response = await session.send("Analyze the latest deploy logs");
for await (const chunk of response.stream()) {
  process.stdout.write(chunk.text);
}
```

**Install**: `npm install @github/copilot-sdk`
**Status**: Technical Preview (v0.1.x) — TypeScript, Python, Go, .NET

> **Presenter Note**: *"Everything we built today makes Copilot smarter inside its environment. The SDK lets you bring that intelligence into YOUR applications. Internal CLIs, CI/CD tools, developer platforms — anywhere you write code."*

---

## Slide 51: SDK Use Cases & Getting Started

### Custom Tools — Connect to Your Systems

```typescript
session.defineTool({
  name: "query_metrics",
  description: "Query internal metrics database",
  parameters: { /* ... */ },
  handler: async ({ query }) => {
    return JSON.stringify(await db.execute(query));
  }
});
```

### Where to Use the SDK

| Use Case | Example |
|----------|----------|
| **Internal CLI tools** | Company-specific developer CLIs |
| **CI/CD** | AI-powered build analysis, deployment decisions |
| **IDE extensions** | Custom VS Code extensions with Copilot brain |
| **Platform engineering** | AI capabilities in internal dev platforms |

### Resources

| Resource | URL |
|----------|-----|
| SDK Repo | github.com/github/copilot-sdk |
| npm Package | npmjs.com/package/@github/copilot-sdk |

> ⚠️ Technical Preview — APIs may change between versions

> **Presenter Note**: *"The SDK is in Technical Preview — APIs will change. But the patterns are stable: create a session, define tools, stream responses. If your team builds internal developer tools, this is worth evaluating now."*

---

# Appendix: Presenter Quick Reference

## Demo Timing Guide

| After Slide | Demo | Duration |
|-------------|------|----------|
| 10 | Chat Modes (Ask/Agent/Plan) + Hands-on | 15 min |
| 14 | Custom Instructions + TAO + Hands-on | 20 min |
| 18 | Prompt Files + Run unit test prompt + Hands-on | 18 min |
| 22 | Agents + OctoCATEngineer + CodeReviewer + Hands-on | 17 min |
| 26 | Agent Skills + Create skill + Hands-on | 18 min |
| 31 | MCP Servers (Playwright + GitHub) + Hands-on | 24 min |
| 34 | Vision + Agent (Cart page) + Hands-on | 22 min |
| 40 | Cloud Agents (Coding Agent + PR Review) | 15 min |

**Total demo + hands-on time**: ~149 minutes  
**Total slide/concept time**: ~76 minutes  
**Buffer/Q&A**: ~10 minutes

## Backup URLs

```
Demo Repo: https://github.com/microsoft/GitHubCopilot_Customized
API Swagger: http://localhost:3000/api-docs
Frontend: http://localhost:5137
GitHub CLI: https://cli.github.com
Copilot in CLI Docs: https://docs.github.com/en/copilot/github-copilot-in-the-cli
GitHub Copilot Docs: https://docs.github.com/en/copilot
Agent Skills Docs: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
MCP Docs: https://docs.github.com/en/copilot/how-tos/using-extensions/using-mcp-in-copilot
Copilot SDK: https://github.com/github/copilot-sdk
```

---

*Slide deck for GitHub Copilot: Zero to Agents workshop*
*Demo repo: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized)*
