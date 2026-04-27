# GitHub Copilot Developer Training — Agentic Patterns

**Duration**: ~2 hours 15 minutes (135 min)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers building with GitHub Copilot who want to understand agentic workflows  
**Focus**: Agentic loops, self-correction, rubber duck debugging, agent architecture patterns and antipatterns  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

> **Part of the Copilot Developer Training curriculum** ([Foundations](../copilot-dev-foundations/copilot-dev-foundations-workshop.md) · [Agentic Patterns](../copilot-dev-agentic/copilot-dev-agentic-workshop.md) · [Advanced Topics](../copilot-dev-advanced/copilot-dev-advanced-workshop.md)). This module can be delivered standalone.

---

## Workshop Overview

This module dives into the agentic side of Copilot — how Agent mode iterates through tasks, self-corrects, and operates as a reasoning partner. Attendees learn the mechanics behind agentic loops, explore the rubber duck debugging pattern with AI, and build a practical understanding of agent architecture patterns and common antipatterns to avoid.

### Learning Objectives

- Understand how agentic loops work: the plan → act → observe → reflect cycle
- Trace the Ralph loop — the iterative pattern Copilot's Coding Agent uses to validate and self-correct
- Use Copilot as a structured reasoning partner (rubber duck debugging with AI)
- Distinguish between single-agent and multi-agent architecture patterns
- Identify orchestration topologies: sequential, parallel, and hierarchical
- Recognize and avoid the 8 most common agent antipatterns

### Prerequisites / What You Should Know

If you're taking this module standalone (without Module 1: Foundations), you should be comfortable with these concepts:

| Concept | Quick Summary |
|---------|---------------|
| **Chat Modes** | Copilot has three modes: Ask (read-only), Agent (edits files), Plan (proposes changes) |
| **Custom Instructions** | `.github/copilot-instructions.md` loads into every interaction; file-targeted instructions use `applyTo` |
| **Custom Agents** | `.github/agents/*.md` files define specialized personas with tools and model preferences |
| **Context Targeting** | Use `@workspace`, `#file`, `#selection` to give Copilot precise context |
| **Context Window** | Finite token budget shared by instructions, context, history, and output |

> **If you attended Module 1**, skip this section — you've covered all of the above.

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
| **Session 4** | **Agentic Loops & the Rubber Duck Pattern** | **75 min** |
| 4.1 | [Opening & AI Safety: "Autonomy vs. Oversight"](#41-opening--ai-safety-autonomy-vs-oversight-5-min) | 5 min |
| 4.2 | [What Are Agentic Loops?](#42-what-are-agentic-loops-15-min) | 15 min |
| 4.3 | [Plan-Act-Observe-Reflect Cycle](#43-plan-act-observe-reflect-cycle-15-min) | 15 min |
| 4.4 | [The Ralph Loop Deep Dive](#44-the-ralph-loop-deep-dive-15-min) | 15 min |
| 4.5 | [Rubber Duck Debugging with AI](#45-rubber-duck-debugging-with-ai-15-min) | 15 min |
| 4.6 | [Session 4 Summary & Discussion](#46-session-4-summary--discussion-10-min) | 10 min |
| | ☕ Break | 10 min |
| **Session 5** | **Agent Patterns & Antipatterns** | **60 min** |
| 5.1 | [Opening & AI Safety: "Designing Responsible Agents"](#51-opening--ai-safety-designing-responsible-agents-5-min) | 5 min |
| 5.2 | [Agent Architecture Patterns](#52-agent-architecture-patterns-15-min) | 15 min |
| 5.3 | [Orchestration Topologies](#53-orchestration-topologies-15-min) | 15 min |
| 5.4 | [Antipatterns Reference](#54-antipatterns-reference-15-min) | 15 min |
| 5.5 | [Session 5 Summary & Discussion](#55-session-5-summary--discussion-10-min) | 10 min |

**Total: ~135 min (~2h 15min) including break**

---

## 4.1. Opening & AI Safety: "Autonomy vs. Oversight" (5 min)

### Key Points

- Agentic AI can take actions autonomously — editing files, running commands, creating branches
- More autonomy = more productivity potential, but also more risk
- The key question: **where should the human checkpoint be?**
- Agentic doesn't mean unsupervised — it means "capable of independent iteration within boundaries"

### The Autonomy Spectrum

| Level | What It Does | Human Role | Example |
|-------|-------------|------------|---------|
| **Completions** | Suggests inline text | Accept/reject each suggestion | Ghost text while typing |
| **Chat (Ask)** | Answers questions | Read and evaluate | "Explain this function" |
| **Chat (Agent)** | Edits files, runs commands | Review changes before commit | "Add error handling to all routes" |
| **Coding Agent** | Creates PRs autonomously | Review the PR before merge | "Implement issue #42" |

### Discussion Points

- At what autonomy level does your team feel comfortable today?
- What guardrails would you need before trusting a fully autonomous agent?
- How does the review burden change as autonomy increases?

---

## 4.2. What Are Agentic Loops? (15 min)

### Key Points

- An **agentic loop** is when an AI system iterates through a task: planning, executing, checking results, and adjusting
- Unlike a single prompt-response, agentic loops are multi-turn — the agent keeps working until the task is done (or it gets stuck)
- Copilot's Agent mode uses agentic loops — it doesn't just generate code, it runs it, checks for errors, and fixes them

### Agentic vs. Non-Agentic

| Characteristic | Non-Agentic (Chat) | Agentic (Agent Mode) |
|---------------|--------------------|--------------------|
| **Turns** | Single prompt → single response | Multiple internal iterations |
| **File changes** | Suggests code in chat | Creates/edits files directly |
| **Tool use** | None (text only) | Terminal, file system, search |
| **Self-correction** | You paste the error back | Agent reads the error, fixes it |
| **Scope** | One question at a time | Multi-step tasks across files |

### The Autonomy Spectrum

Visualize the progression from passive to autonomous:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Complete  │───►│   Chat   │───►│  Agent   │───►│  Coding  │
│  -ions   │    │ (Ask/Plan)│    │   Mode   │    │  Agent   │
├──────────┤    ├──────────┤    ├──────────┤    ├──────────┤
│ Suggests │    │ Answers  │    │ Edits    │    │ Creates  │
│ text     │    │ questions│    │ files,   │    │ PRs      │
│ inline   │    │ in chat  │    │ runs cmds│    │ autonomy │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
  You drive       You ask        You approve      You review
  every line      every Q        each change       the PR
```

### 🖥️ Demo: Agentic vs. Non-Agentic

1. **Ask mode**: Ask "How should I add input validation to the orders endpoint?" — get a text explanation
2. **Agent mode**: Ask "Add input validation to the orders endpoint" — watch Copilot edit files, run lint, fix errors
3. Point out the difference: Ask mode talks about it, Agent mode does it

### Discussion Points

- What makes a task suitable for agentic execution vs. a simple chat question?
- How do you know when to intervene during an agentic loop?
- What signals indicate the agent is stuck or going in the wrong direction?

---

## 4.3. Plan-Act-Observe-Reflect Cycle (15 min)

### Key Points

- Every agentic loop follows a four-phase cycle: **Plan → Act → Observe → Reflect**
- The agent may go through this cycle multiple times for a single task
- Understanding this cycle helps you write better prompts and intervene at the right time

### The Four Phases

| Phase | What the Agent Does | What You See |
|-------|-------------------|-------------|
| **Plan** | Decomposes the task, identifies files, selects strategy | Agent describes its approach |
| **Act** | Edits files, runs terminal commands, calls tools | File changes appear, commands execute |
| **Observe** | Reads output: errors, test results, lint warnings | Agent processes tool output |
| **Reflect** | Evaluates: did it work? What needs to change? | Agent adjusts strategy or reports success |

### Cycle Diagram

```
          ┌──────────┐
          │   PLAN   │
          │ Decompose│
          │ task     │
          └────┬─────┘
               │
               ▼
          ┌──────────┐
          │   ACT    │
          │ Edit     │
          │ files,   │
          │ run cmds │
          └────┬─────┘
               │
               ▼
          ┌──────────┐
          │ OBSERVE  │
          │ Read     │
          │ output,  │
          │ errors   │
          └────┬─────┘
               │
               ▼
          ┌──────────┐     ┌──────────┐
          │ REFLECT  │────►│  DONE?   │
          │ Evaluate │     │  Yes: ✅  │
          │ results  │     │  No: ↩   │
          └────┬─────┘     └──────────┘
               │ No
               └─────────────► Back to PLAN
```

### What Happens in Each Phase

**Plan**: "I need to add validation. I'll check the existing patterns in products.ts, create a validation middleware, and update the orders route."

**Act**: Creates `api/middleware/validation.ts`, edits `api/routes/orders.ts`, runs `npm run lint`

**Observe**: Lint reports "unused import on line 4" and "missing type for parameter"

**Reflect**: "Lint failed — I need to fix the import and add types. Let me try again." → back to Act

### 🖥️ Demo: Watching the Cycle

1. In Agent mode, give a multi-step task: "Add a new delivery tracking feature with a new endpoint, service layer, and tests"
2. Watch the agent plan (it describes its approach), act (edits files), observe (runs tests), and reflect (fixes failures)
3. Point out each phase as it happens

### Discussion Points

- At which phase is human intervention most valuable?
- How can you write prompts that give the agent a better plan from the start?
- What happens when the reflect phase doesn't improve the situation?

---

## 4.4. The Ralph Loop Deep Dive (15 min)

### Key Points

- The **Ralph loop** is the iterative pattern used by Copilot's Coding Agent — a cycle of edit → validate → fix until all checks pass
- It is a specialized agentic loop with built-in validation gates
- Key difference from basic agent mode: the Coding Agent runs in a sandboxed environment and iterates until tests pass or it hits a retry limit

### Ralph Loop Internals

```
┌─────────────────────────────────────────────────┐
│              THE RALPH LOOP                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. PLAN: Read issue/task → decompose           │
│     │                                           │
│  2. EDIT: Create/modify files                   │
│     │                                           │
│  3. VALIDATE: Run lint + type check + tests     │
│     │                                           │
│  4. PASS? ──── Yes ──► Commit → Create PR       │
│     │                                           │
│     No                                          │
│     │                                           │
│  5. FIX: Read errors → adjust code              │
│     │                                           │
│     └───────── Back to step 3                   │
│                                                 │
│  MAX RETRIES reached? → Report partial progress │
└─────────────────────────────────────────────────┘
```

### Validation Gates

| Gate | What It Checks | Why It Matters |
|------|---------------|----------------|
| **Lint** | Code style, syntax, unused variables | Catches surface-level issues before deeper checks |
| **Type check** | TypeScript/type errors | Ensures structural correctness |
| **Tests** | Unit and integration tests | Verifies functional correctness |
| **Build** | Compilation success | Confirms nothing is broken |

### Self-Correction in Action

The Ralph loop's power comes from self-correction:

1. **Attempt 1**: Agent writes validation code → test fails ("expected 400, got 200")
2. **Diagnosis**: Agent reads the test failure → "the validation middleware isn't being applied"
3. **Attempt 2**: Agent adds `app.use(validate)` to the route → test passes
4. **Commit**: All gates pass → PR created

### When Self-Correction Fails

| Failure Mode | What Happens | Intervention |
|-------------|-------------|-------------|
| **Infinite fix loop** | Agent keeps fixing one error, introducing another | Clarify the requirement in the issue |
| **Wrong approach** | Agent's entire strategy is wrong | Close the PR, provide architectural guidance |
| **Missing context** | Agent can't find necessary information | Add context to the issue description or copilot-instructions.md |
| **Retry limit** | Agent gives up after max retries | Review partial progress, complete manually or refile |

### 🖥️ Demo: Ralph Loop with Refactoring

1. Show a GitHub issue assigned to Copilot Coding Agent
2. Watch the agent process: plan → edit → validate → fix → validate → commit
3. Open the PR — show the iteration history in the agent's comments
4. Point out where self-correction happened

### Discussion Points

- How does the validation gate approach compare to your team's CI pipeline?
- What kind of tasks benefit most from the self-correction loop?
- How would you write issues that give the Coding Agent the best chance of success?

---

## 4.5. Rubber Duck Debugging with AI (15 min)

### Key Points

- **Rubber duck debugging** is the classic technique: explain your problem out loud (to a rubber duck) and the act of articulating it reveals the solution
- Copilot elevates this — it's a rubber duck that talks back, asks clarifying questions, and challenges your assumptions
- The **rubber-duck agent pattern**: use Copilot to critique your plan before you implement it

### The Classic vs. AI Rubber Duck

| Aspect | Classic Rubber Duck | Copilot as Rubber Duck |
|--------|--------------------|-----------------------|
| **Listening** | Silent (you articulate) | Active (asks questions back) |
| **Challenge** | None (you self-discover) | Identifies blind spots, edge cases |
| **Knowledge** | None | Full codebase context |
| **Bias check** | Only your own reflection | Independent perspective |

### The Rubber-Duck Agent Pattern

Use this pattern when you have a plan but want to stress-test it before implementing:

1. **Articulate**: Describe your plan in detail to Copilot (using Plan or Ask mode)
2. **Challenge**: Ask Copilot to find flaws, edge cases, or alternative approaches
3. **Refine**: Update your plan based on Copilot's critique
4. **Implement**: Switch to Agent mode and execute the refined plan

### Example Prompt Sequence

**Step 1 — Articulate:**

```
I'm planning to add rate limiting to our API. My approach:
1. Add express-rate-limit middleware
2. Apply globally with 100 requests per 15 min window
3. Return 429 status with retry-after header

What am I missing? What edge cases should I consider?
```

**Step 2 — Challenge:**

```
Play devil's advocate. What could go wrong with this approach in production?
What about distributed deployments with multiple server instances?
```

**Step 3 — Refine:**

```
Good points. Let me revise: use Redis-backed rate limiting for distributed support,
add per-endpoint limits (auth endpoints stricter), and add a bypass for health checks.
Does this address the concerns?
```

### 🖥️ Demo: Rubber Duck Session

1. Describe a design decision to Copilot: "I want to add caching to the products API"
2. Ask Copilot to critique the approach: "What could go wrong? What am I missing?"
3. Show how Copilot identifies cache invalidation, stale data, and memory concerns
4. Refine the plan based on feedback — then switch to Agent mode to implement

### Discussion Points

- When do you currently "rubber duck" your ideas? How formal is the process?
- What types of decisions benefit most from AI-assisted plan critique?
- How does rubber ducking with Copilot compare to discussing with a colleague?

---

## 4.6. Session 4 Summary & Discussion (10 min)

### Key Takeaways

- Agentic loops follow a plan → act → observe → reflect cycle
- The Ralph loop adds validation gates (lint, type check, tests) that force self-correction
- Copilot can serve as a rubber duck that actively challenges your thinking
- Use the rubber-duck agent pattern to stress-test plans before implementing

### Discussion Points

- How does understanding the agentic loop change how you interact with Agent mode?
- What tasks in your current sprint would benefit from the rubber duck pattern?
- Where on the autonomy spectrum is your team comfortable operating?

---

## ☕ Break — 10 Minutes

---

## 5.1. Opening & AI Safety: "Designing Responsible Agents" (5 min)

### Key Points

- As agents gain more autonomy, the design decisions you make have outsized impact
- Responsible agent design includes: scope limits, human checkpoints, tool restrictions, and clear failure modes
- An agent without guardrails is a liability — an agent with well-designed guardrails is a force multiplier

### Key Principles

| Principle | Description |
|-----------|-------------|
| **Least privilege** | Give agents only the tools they need — not everything available |
| **Explicit scope** | Define what the agent should and shouldn't do in its instructions |
| **Human checkpoints** | Require human approval for destructive actions (delete, deploy, publish) |
| **Graceful failure** | Agents should report when they're stuck, not silently produce bad output |
| **Auditability** | Every agent action should be traceable (logs, PR history, comments) |

### Discussion Points

- What guardrails does your team already have for automated tools?
- How would you apply least-privilege to an AI agent?

---

## 5.2. Agent Architecture Patterns (15 min)

### Key Points

- There are three primary patterns for organizing agents and their capabilities
- The right pattern depends on task complexity, team size, and the tools involved

### Pattern 1: Single-Agent / Single-Skill

```
┌─────────────────┐
│   One Agent     │
│   One Skill     │
│                 │
│ "Fix lint errors│
│  in this file"  │
└─────────────────┘
```

- **When to use**: Simple, well-defined tasks with a clear scope
- **Pros**: Easy to build, easy to debug, predictable behavior
- **Cons**: Limited capability, can't handle multi-domain tasks

### Pattern 2: Single-Agent / Multi-Skill

```
┌─────────────────────────────────────┐
│           One Agent                 │
│                                     │
│  ┌─────────┐ ┌─────────┐ ┌───────┐ │
│  │ Skill A │ │ Skill B │ │Skill C│ │
│  │ Code    │ │ Test    │ │Deploy │ │
│  │ Review  │ │ Gen     │ │ Check │ │
│  └─────────┘ └─────────┘ └───────┘ │
└─────────────────────────────────────┘
```

- **When to use**: Tasks that require multiple capabilities but a single decision-maker
- **Pros**: One conversation context, consistent reasoning, simpler orchestration
- **Cons**: Agent instructions can become complex, context window fills faster
- **This is Copilot's Agent mode** — one agent with access to file editing, terminal, search, and more

### Pattern 3: Multi-Agent / Multi-Skill

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Agent A     │     │  Agent B     │     │  Agent C     │
│  Frontend    │     │  Backend     │     │  DevOps      │
│  Specialist  │     │  Specialist  │     │  Specialist  │
│              │     │              │     │              │
│ ┌──────────┐ │     │ ┌──────────┐ │     │ ┌──────────┐ │
│ │ React    │ │     │ │ API      │ │     │ │ Docker   │ │
│ │ Tailwind │ │     │ │ Database │ │     │ │ CI/CD    │ │
│ └──────────┘ │     │ └──────────┘ │     │ └──────────┘ │
└──────────────┘     └──────────────┘     └──────────────┘
```

- **When to use**: Complex, cross-domain tasks where specialization matters
- **Pros**: Deep expertise per domain, cleaner context per agent, parallel execution
- **Cons**: Orchestration overhead, agents may disagree, debugging is harder

### Pattern Comparison

| Aspect | Single/Single | Single/Multi | Multi/Multi |
|--------|--------------|--------------|-------------|
| **Complexity** | 🟢 Low | 🟡 Medium | 🔴 High |
| **Context efficiency** | 🟢 Focused | 🟡 Growing | 🟢 Per-agent |
| **Debugging** | 🟢 Easy | 🟡 Moderate | 🔴 Hard |
| **Task scope** | Narrow | Broad | Very broad |
| **Coordination** | None | Internal | Requires orchestration |

### 🖥️ Demo: Single-Agent with Multiple Skills

1. Create a custom agent with 3 tools: `codebase`, `githubRepo`, `fetch`
2. Give it a cross-cutting task: "Review the orders API for security issues and suggest test improvements"
3. Watch it use multiple skills in a single conversation
4. Discuss when this would break down (e.g., task too complex for one context window)

### Discussion Points

- Which pattern matches your team's typical tasks?
- At what point would you split a single agent into multiple specialized agents?
- How do you evaluate whether an agent has too many skills?

---

## 5.3. Orchestration Topologies (15 min)

### Key Points

- When using multiple agents, how they coordinate matters as much as what they do
- Three main topologies: sequential (pipeline), parallel (fan-out/fan-in), and hierarchical (coordinator + workers)

### Sequential Pipeline

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌────────┐
│ Agent A  │────►│ Agent B  │────►│ Agent C  │────►│ Result │
│ Analyze  │     │ Generate │     │ Review   │     │        │
└─────────┘     └─────────┘     └─────────┘     └────────┘
```

- Each agent's output feeds the next agent's input
- **Best for**: Workflows with clear stages (analyze → generate → review)
- **Example**: Code review pipeline — analyzer finds issues, generator creates fixes, reviewer validates

### Parallel Fan-Out / Fan-In

```
                ┌─────────┐
           ┌───►│ Agent A  │───┐
           │    │ Frontend │   │
┌──────┐   │    └─────────┘   │    ┌───────┐
│ Task │───┤                  ├───►│ Merge │
└──────┘   │    ┌─────────┐   │    └───────┘
           │    │ Agent B  │   │
           ├───►│ Backend  │───┤
           │    └─────────┘   │
           │    ┌─────────┐   │
           └───►│ Agent C  │───┘
                │ Tests    │
                └─────────┘
```

- Multiple agents work on independent sub-tasks simultaneously
- A merge step combines results
- **Best for**: Tasks with independent components that can be worked on in parallel
- **Example**: Full-stack feature — frontend, backend, and test agents work simultaneously

### Hierarchical (Coordinator + Workers)

```
              ┌──────────────┐
              │ Coordinator  │
              │ Agent        │
              └──────┬───────┘
           ┌─────────┼─────────┐
           ▼         ▼         ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ Worker A │ │ Worker B │ │ Worker C │
    │          │ │          │ │          │
    └──────────┘ └──────────┘ └──────────┘
```

- A coordinator agent breaks down the task and delegates to specialist workers
- Workers report back; coordinator synthesizes and decides next steps
- **Best for**: Complex tasks that require dynamic decomposition
- **Example**: "Implement this feature" — coordinator plans, delegates UI work, API work, and test work to specialists

### Topology Comparison

| Topology | Latency | Complexity | When to Use |
|----------|---------|------------|-------------|
| **Sequential** | High (stages add up) | 🟢 Low | Clear step-by-step workflows |
| **Parallel** | Low (concurrent) | 🟡 Medium | Independent sub-tasks |
| **Hierarchical** | Medium | 🔴 High | Dynamic, complex decomposition |

### 🖥️ Demo: Multi-Agent Orchestration Concept

1. Show two custom agents: `.github/agents/frontend-expert.md` and `.github/agents/api-expert.md`
2. Use one agent for a frontend question, the other for an API question
3. Discuss how a coordinator could delegate between them (conceptual — full orchestration is outside Copilot's current scope)

### Discussion Points

- Which topology fits your team's most common multi-step tasks?
- What are the risks of parallel agent execution?
- How would you handle conflicting outputs from parallel agents?

---

## 5.4. Antipatterns Reference (15 min)

### Key Points

- Antipatterns are recurring mistakes in agent design that lead to poor results
- Recognizing them early saves debugging time and prevents wasted tokens
- Most antipatterns come from over-trusting the agent or under-specifying the task

### The 8 Agent Antipatterns

| # | Antipattern | Symptom | Root Cause | Fix |
|---|-------------|---------|------------|-----|
| 1 | **God Agent** | One agent handles everything; responses are unfocused | No separation of concerns | Split into specialized agents or use file-targeted instructions |
| 2 | **Context Stuffing** | Slow responses, truncated context, irrelevant output | Attaching too many files/contexts | Be selective — attach only directly relevant files |
| 3 | **Missing Guardrails** | Agent modifies files it shouldn't, runs destructive commands | No scope limits in agent instructions | Add explicit "do not" rules and tool restrictions |
| 4 | **Over-Delegation** | Agent produces incorrect output for tasks beyond its capability | Trusting the agent with tasks it can't handle | Match task complexity to agent capability; use human-in-the-loop |
| 5 | **Tool Sprawl** | Agent picks wrong tools, wastes tokens on irrelevant tool calls | Too many tools registered without clear purpose | Limit tools per agent; provide clear tool descriptions |
| 6 | **No Validation Loop** | Agent output is accepted without testing or linting | Missing validation gates | Always require lint/test/build pass before accepting |
| 7 | **Prompt Injection Blind Spot** | Agent processes malicious content from tool outputs | No input sanitization on external data | Validate and sanitize all external input before agent processing |
| 8 | **Stale Instructions** | Agent follows outdated patterns, generates deprecated code | Instructions not maintained as codebase evolves | Review instructions quarterly; version them alongside code |

### Real-World Case Studies

**Case Study 1 — God Agent Failure**:
A team created one agent with instructions for frontend, backend, database, and DevOps. When asked to "add a new feature," the agent tried to modify Dockerfiles, API routes, React components, and database migrations simultaneously — resulting in a tangled, inconsistent PR.
**Fix**: Three specialized agents (frontend, backend, infrastructure) each with focused instructions.

**Case Study 2 — Context Stuffing**:
A developer attached 15 files to a chat message asking "review this code." The context window was so full that the model couldn't generate a meaningful response — it produced a superficial summary of the first 3 files and ignored the rest.
**Fix**: Review one module at a time with targeted `#file` references.

### Antipattern Identification Checklist

Use this when reviewing agent configurations:

- ✅ Does the agent have a clear, focused purpose (not "do everything")?
- ✅ Are tools limited to what the agent actually needs?
- ✅ Are there explicit scope boundaries ("do not modify" rules)?
- ✅ Is there a validation step before accepting output?
- ✅ Are instructions current with the codebase?
- ✅ Does the agent handle external data safely?
- ✅ Is the context window used efficiently (no unnecessary attachments)?
- ✅ Are complex tasks decomposed rather than delegated wholesale?

### Discussion Points

- Which of these antipatterns have you encountered (even without realizing it)?
- How would you audit your team's existing agent configurations?
- What's the most dangerous antipattern for your specific use case?

---

## 5.5. Session 5 Summary & Discussion (10 min)

### Key Takeaways — Module 2 Complete

| Session | Core Concept |
|---------|-------------|
| **Session 4** | Agentic loops follow plan → act → observe → reflect; the Ralph loop adds validation gates; Copilot is a rubber duck that talks back |
| **Session 5** | Choose the right agent pattern (single vs. multi); select a topology that matches your workflow; avoid the 8 common antipatterns |

### Discussion Points

- How would you redesign your team's Copilot setup based on what you learned?
- What's the first agent antipattern you'll check for in your current projects?
- Which orchestration topology would help your team's most complex workflow?

---

*Workshop guide for GitHub Copilot Developer Training — Agentic Patterns (Module 2 of 3)*
