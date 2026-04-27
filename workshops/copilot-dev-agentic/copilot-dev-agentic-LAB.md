# GitHub Copilot Developer Training — Agentic Patterns — Hands-On Lab Guide

**Duration**: ~60 minutes of hands-on exercises (across a ~2-hour module)  
**Format**: Step-by-step lab exercises aligned to workshop sessions  
**Audience**: Developers exploring agentic workflows with GitHub Copilot  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

> **Part of the Copilot Developer Training curriculum** ([Foundations LAB](../copilot-dev-foundations/copilot-dev-foundations-LAB.md) · [Agentic Patterns LAB](../copilot-dev-agentic/copilot-dev-agentic-LAB.md) · [Advanced Topics LAB](../copilot-dev-advanced/copilot-dev-advanced-LAB.md)). This lab can be completed standalone.

---

## Lab Overview

These labs explore agentic workflows: watching the agentic loop in action, tracing debug logs, practicing rubber duck debugging with AI, and designing agent architectures.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher |
| **Git** | For cloning the demo repository |

### Setup Checkpoint

Ensure your environment is ready. If you're joining from Module 1, your repo should already be set up. If starting fresh:

```bash
git clone https://github.com/<YOUR-USERNAME>/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
npm install
npm run build
npm run dev
```

Ensure your repo has a `.github/copilot-instructions.md` file. If not, create one:

```markdown
# Copilot Instructions
- Use TypeScript strict mode
- Prefer `const` over `let`; never use `var`
- All functions must have JSDoc comments
- Use Vitest for unit tests
```

- ✅ API running at `http://localhost:3000`
- ✅ Frontend running at `http://localhost:5137`
- ✅ `.github/copilot-instructions.md` present

### Lab Summary

| Lab | Workshop Section | Duration | Exercises |
|-----|-----------------|----------|-----------|
| 1 | Session 4: Agentic Loops & Rubber Duck | 39 min | 5 exercises |
| 2 | Session 5: Agent Patterns & Antipatterns | 34 min | 5 exercises |

---

<details>
<summary><h2>Lab 1: Agentic Loops & the Rubber Duck Pattern (39 min)</h2></summary>

> **Workshop Session**: 4 — Agentic Loops & the Rubber Duck Pattern

### Exercise 1.1 — Agent Mode Loop Observation (10 min)

**Objective**: Give Agent mode a multi-step task and observe the plan → act → observe → reflect cycle.

**Steps**

**Step 1: Start a multi-step task**

In Agent mode, ask:

```
Add input validation to the orders POST endpoint. Validate that:
1. All required fields are present (customerId, items)
2. Items array is not empty
3. Each item has a valid productId and positive quantity
4. Return appropriate 400 errors with descriptive messages
Include unit tests for the validation logic.
```

**Step 2: Watch the cycle**

As the agent works, identify each phase:

- **Plan**: Does the agent describe its approach before starting?
- **Act**: Which files does it create or modify? What commands does it run?
- **Observe**: Does it read lint/test output?
- **Reflect**: Does it adjust based on results?

**Step 3: Document the cycle**

In a separate text file, note:

```
Phase 1 - Plan: [what the agent said it would do]
Phase 2 - Act: [files changed, commands run]
Phase 3 - Observe: [what output it read]
Phase 4 - Reflect: [how it adjusted]
Iterations: [how many cycles before completion]
```

### Success Criteria

- ✅ Agent completed a multi-step task
- ✅ Identified all four phases of the loop
- ✅ Documented the number of iterations

---

### Exercise 1.2 — Debug Log Tracing (8 min)

**Objective**: Enable agent debug logs and trace an iteration through the log output.

**Steps**

**Step 1: Enable debug mode**

If not already enabled:

```json
{
  "github.copilot.chat.debugMode": true
}
```

**Step 2: Give Agent mode a task that requires iteration**

```
Refactor the products service to use a repository pattern. Create a ProductRepository class that handles all database operations, and update the service to use it. Run the tests after.
```

**Step 3: Open the agent debug log**

Command Palette → "GitHub Copilot: Open Agent Debug Log" (or check the Output panel → "GitHub Copilot Chat" channel).

**Step 4: Trace through the log**

Find and identify:

- Tool calls: `file.read`, `file.write`, `file.edit`, `terminal.run`
- Arguments: which files were read, what commands ran
- Results: success/failure, exit codes
- Decisions: what the agent did after each result

### Success Criteria

- ✅ Found and opened agent debug logs
- ✅ Identified at least 3 different tool calls
- ✅ Traced one full iteration (act → observe → reflect)

---

### Exercise 1.3 — Forced Self-Correction (8 min)

**Objective**: Give the agent a task with a constraint that forces at least one self-correction cycle.

**Steps**

**Step 1: Create a tricky task**

```
Create a new API endpoint GET /api/orders/stats that returns order statistics:
- Total number of orders
- Average order value
- Most ordered product

Important constraints:
- Do NOT use any new npm packages
- The endpoint must pass the existing lint rules
- Add tests that verify all three statistics
```

**Step 2: Watch for self-correction**

The constraints (no new packages + lint + tests) should force at least one correction cycle. Watch for:

- Agent tries an approach → lint fails → agent fixes
- Agent generates tests → tests fail → agent adjusts implementation
- Agent uses a pattern that doesn't match existing conventions → reflects and changes approach

**Step 3: Count corrections**

Note how many times the agent corrected itself and what triggered each correction.

### Success Criteria

- ✅ Agent encountered at least one error during execution
- ✅ Agent self-corrected without manual intervention
- ✅ Identified what triggered the self-correction

---

### Exercise 1.4 — Rubber Duck Cross-Model Review (8 min)

**Objective**: Understand how Rubber Duck provides cross-model-family critique at key checkpoints.

**Steps**

**Step 1: Understand the concept**

Rubber Duck is a **GitHub Copilot CLI** feature (experimental mode) that uses a second AI model from a **different model family** to review the primary agent's work. When Claude is your orchestrator, Rubber Duck uses GPT-5.4 — providing an independent perspective with different training biases.

> **Note**: Rubber Duck is currently available only in GitHub Copilot CLI (via `/experimental`), not in VS Code Copilot Chat.

**Step 2: Trigger a manual critique**

In GitHub Copilot CLI, give a complex task:

```
Add real-time order notifications to the OctoCAT Supply app using WebSockets.
When an order status changes, emit events to connected clients.
```

After the agent produces a plan, request a critique:

```
Review your plan before implementing. What could go wrong?
What edge cases are you missing?
```

**Step 3: Evaluate the critique**

Compare the agent's original plan to the critique. Note:

- What blind spots were identified?
- Were there architectural concerns (e.g., scaling WebSocket connections)?
- Did the critique catch cross-file dependencies?

**Step 4: Document findings**

Note what the critique caught that the original plan missed. Consider: would self-reflection (the same model reviewing its own work) have caught the same issues?

### Success Criteria

- ✅ Understood that Rubber Duck uses a different model family for review
- ✅ Requested a critique of an agent's plan
- ✅ Identified at least 2 blind spots the critique surfaced
- ✅ Compared cross-family review value vs. self-reflection

---

### Exercise 1.5 — Rubber Duck Checkpoint Identification (5 min)

**Objective**: Identify the three key checkpoints where Rubber Duck activates and design a workflow around them.

**Steps**

**Step 1: Review the three checkpoints**

Rubber Duck activates at:

1. **After drafting a plan** — catches suboptimal decisions before they compound
2. **After complex implementation** — second set of eyes on complex code
3. **After writing tests, before executing** — catches coverage gaps or flawed assertions

**Step 2: Map to your workflow**

For a feature you're currently working on (or a hypothetical one), identify:

- Where would a plan review help most?
- What implementation would benefit from a second opinion?
- What test assumptions should be challenged?

```
Feature: [your feature]
Plan review needed: [what decisions to validate]
Implementation review: [complex parts to check]
Test review: [what coverage gaps to watch for]
```

**Step 3: Compare to human review**

How does Rubber Duck's automated checkpoint review compare to your team's current PR review process? What does each catch that the other misses?

### Success Criteria

- ✅ Can identify the three Rubber Duck activation checkpoints
- ✅ Mapped checkpoints to a real or hypothetical feature
- ✅ Compared automated cross-model review to human review

</details>

---

<details>
<summary><h2>Lab 2: Agent Patterns & Antipatterns (34 min)</h2></summary>

> **Workshop Session**: 5 — Agent Patterns & Antipatterns

### Exercise 2.1 — Single-Agent Multi-Skill Design (8 min)

**Objective**: Create a custom agent with multiple skills for a specific workflow.

**Steps**

**Step 1: Design the agent**

Create `.github/agents/full-stack-dev.md`:

```yaml
---
description: "Full-stack development agent for OctoCAT Supply features"
tools:
  - codebase
  - terminal
  - fetch
---
```

```markdown
# Full-Stack Developer Agent

You are a full-stack developer working on the OctoCAT Supply application.

## Architecture Knowledge
- Frontend: React 18+ with TypeScript, Tailwind CSS, Vite
- Backend: Express.js with TypeScript, OpenAPI/Swagger
- Testing: Vitest for unit tests

## Workflow
When asked to add a feature:
1. Check existing patterns in similar files
2. Create backend (service + route) first
3. Add API tests
4. Create frontend component
5. Run lint and tests after each major change

## Rules
- Follow existing file naming conventions
- Use the repository's coding standards
- Never modify database schema directly — create a migration
```

**Step 2: Test the agent**

Select the agent from the mode picker and ask:

```
Add a "supplier contact" feature — new field on the supplier entity with
an API endpoint to update it and a frontend form component to edit it
```

**Step 3: Evaluate**

- Did the agent follow the prescribed workflow?
- Did it check existing patterns first?
- Did it handle both frontend and backend?

### Success Criteria

- ✅ Created a multi-skill agent with clear workflow instructions
- ✅ Agent follows the prescribed steps
- ✅ Agent handles cross-cutting tasks (frontend + backend)

---

### Exercise 2.2 — Multi-Agent Design (8 min)

**Objective**: Create two specialized agents and compare their output.

**Steps**

**Step 1: Create a frontend specialist**

Create `.github/agents/frontend-expert.md`:

```yaml
---
description: "Frontend specialist for React and Tailwind"
tools:
  - codebase
---
```

```markdown
# Frontend Expert

You specialize in React 18+ with TypeScript and Tailwind CSS.

Focus areas:
- Component design and composition
- State management patterns
- Accessibility (WCAG 2.1 AA)
- Responsive design
- Performance (lazy loading, memoization)

When reviewing frontend code, evaluate:
- Component responsibility (single responsibility principle)
- Props interface design
- Accessibility attributes (aria-labels, semantic HTML)
- Tailwind class organization
```

**Step 2: Create a backend specialist**

Create `.github/agents/api-expert.md`:

```yaml
---
description: "Backend API specialist for Express and TypeScript"
tools:
  - codebase
  - terminal
---
```

```markdown
# API Expert

You specialize in Express.js APIs with TypeScript.

Focus areas:
- REST API design (resource naming, HTTP methods, status codes)
- Input validation and sanitization
- Error handling patterns
- Database query optimization
- OpenAPI/Swagger documentation

When reviewing API code, evaluate:
- Route organization and naming
- Request validation
- Response consistency
- Error handling completeness
```

**Step 3: Compare specialized vs. general**

Ask both agents and the default Agent mode the same question:

```
What improvements would you suggest for the products feature?
```

Compare: does each specialist focus on their domain? Is the feedback more detailed?

### Success Criteria

- ✅ Created two specialized agents with distinct focus areas
- ✅ Each agent provides domain-specific feedback
- ✅ Compared specialized output vs. default Agent mode

---

### Exercise 2.3 — Antipattern Identification (5 min)

**Objective**: Review sample agent configurations and identify antipatterns.

**Steps**

**Step 1: Review this agent config**

Consider this hypothetical agent file (do NOT create it — just review):

```yaml
---
description: "Does everything"
tools:
  - codebase
  - terminal
  - fetch
  - githubRepo
  - browser
---
# Universal Agent
Handle any task: frontend, backend, database, DevOps,
testing, documentation, code review, deployment, monitoring,
and security scanning. Use all available tools.
```

**Step 2: Identify antipatterns**

Which of the 8 antipatterns does this agent exhibit? Make a list:

| # | Antipattern | Present? | Evidence |
|---|-------------|----------|----------|
| 1 | God Agent | ? | |
| 2 | Context Stuffing | ? | |
| 3 | Missing Guardrails | ? | |
| 4 | Over-Delegation | ? | |
| 5 | Tool Sprawl | ? | |
| 6 | No Validation Loop | ? | |
| 7 | Prompt Injection Blind Spot | ? | |
| 8 | Stale Instructions | ? | |

**Step 3: Propose fixes**

For each antipattern you identified, write a one-sentence fix.

### Success Criteria

- ✅ Identified at least 3 antipatterns in the sample config
- ✅ Explained why each is a problem
- ✅ Proposed a fix for each

---

### Exercise 2.4 — Antipattern Refactoring (8 min)

**Objective**: Take a poorly designed agent and refactor it to follow best practices.

**Steps**

**Step 1: Start with the bad agent**

Create `.github/agents/bad-reviewer.md`:

```yaml
---
description: "Reviews code"
tools:
  - codebase
  - terminal
  - fetch
  - githubRepo
  - browser
---
```

```markdown
# Code Reviewer
Review code. Check everything. Find all bugs. Fix everything you find.
Make the code better. Use all tools available.
```

**Step 2: Identify the problems**

- Too vague ("check everything")
- Too many tools
- No scope limits
- No structured output
- Might modify code when asked to review

**Step 3: Refactor**

Rewrite the agent as a well-designed reviewer:

- Focused description
- Limited tools (only `codebase`)
- Clear scope (review only, don't modify)
- Structured output format
- Explicit rules about what NOT to do

**Step 4: Test both**

Use the bad reviewer and your refactored version on the same file. Compare output quality.

### Success Criteria

- ✅ Identified at least 3 problems with the bad agent
- ✅ Refactored to follow best practices
- ✅ Refactored agent produces noticeably better output

---

### Exercise 2.5 — Pattern Selection Exercise (5 min)

**Objective**: Given scenarios, justify which agent pattern and topology to use.

**Steps**

**Step 1: Evaluate each scenario**

For each scenario below, decide: which pattern (single/single, single/multi, multi/multi) and which topology (sequential, parallel, hierarchical)?

**Scenario A**: "Fix this lint error in one file"

- Pattern: ___
- Topology: ___
- Justification: ___

**Scenario B**: "Add a new full-stack feature with frontend component, API endpoint, database migration, and tests"

- Pattern: ___
- Topology: ___
- Justification: ___

**Scenario C**: "Review a PR for security, performance, and code style — each reviewed by a different specialist"

- Pattern: ___
- Topology: ___
- Justification: ___

**Scenario D**: "Migrate 20 API endpoints from JavaScript to TypeScript"

- Pattern: ___
- Topology: ___
- Justification: ___

**Step 2: Discuss with a neighbor (or with Copilot)**

```
I chose [pattern] with [topology] for this scenario: [description].
Am I right? What's a better approach?
```

### Success Criteria

- ✅ Completed pattern/topology selection for all 4 scenarios
- ✅ Provided justification for each choice
- ✅ Discussed or validated at least one choice

</details>

---

*Lab guide for GitHub Copilot Developer Training — Agentic Patterns (Module 2 of 3)*
