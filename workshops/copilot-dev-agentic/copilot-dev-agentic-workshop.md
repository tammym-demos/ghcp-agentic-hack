# Module 2: Agentic Patterns — Workshop Guide

**Duration**: ~90 min
**Format**: Presentation + Live Demo + Hands-On
**Audience**: Developers with basic GitHub Copilot exposure
**Prerequisites**: Completion of Module 1: Foundations

---

## Workshop Overview

Module 2 helps developers move from "GitHub Copilot as a smart assistant" to "GitHub Copilot as a scoped autonomous teammate." Participants learn how agents coordinate skills, when to choose direct tool use instead of delegation, how background and cloud agents change the workflow, and how instruction layering and multi-agent patterns shape safe adoption. The emphasis throughout is practical trust calibration: delegate intentionally, keep review gates in place, and design workflows that still leave the developer in control.

### Learning Objectives

- Explain the difference between a GitHub Copilot agent and a skill, including the plan → act → observe → adjust loop
- Choose between direct tool use and agentic orchestration based on scope, judgment, and adaptation needs
- Describe how background agents and cloud agents support different parts of the development workflow
- Use GitHub Copilot `/init` as a bootstrapping accelerator without skipping review of generated output
- Explain how organization, repository, file-scoped, user, and session instructions compose
- Identify when multi-agent collaboration adds value and when a single well-scoped agent is enough
- Use GitHub Copilot as a rubber duck for reasoning, debugging, and design review

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **Module 1 completion** | Participants should already understand core chat modes, instructions, and basic customization |
| **VS Code** | Latest stable version with GitHub Copilot and GitHub Copilot Chat enabled |
| **GitHub account** | Signed in with GitHub Copilot access |
| **Local project** | Any multi-file repository open for demos and lab exercises |
| **Terminal access** | Needed for GitHub Copilot CLI and repo scaffolding workflows |
| **Internet access** | Required for GitHub Copilot model calls, background workflows, and cloud features |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | What is an Agent? What is a Skill? (framing + safety) | 10 min |
| 2 | Agent vs. Skill — When to Use Each | 12 min |
| 3 | Background Agents and Cloud Agents (Coding Agent) | 15 min |
| 4 | Copilot `/init` and Project Bootstrapping | 8 min |
| 5 | Instruction Layering — Org, Repo, and File-Scoped | 15 min |
| 6 | Multi-Agent Patterns — Squad as a Worked Example | 15 min |
| 7 | Rubber Duck Debugging with Copilot | 5 min |
| 8 | Wrap-up, hand-off to lab, and Q&A | 5 min |

---

## 1. What Is an Agent? What Is a Skill? (10 min)

### Key Points

- An **agent** is a goal-directed workflow that can plan, take actions with tools, observe the result, and adjust based on what it learns
- A useful mental model for agentic execution is:

```text
Plan → Act → Observe → Adjust
```

- A **skill** is a specific capability the agent can invoke, such as file edits, terminal access, search, web browsing, or GitHub API calls
- Agents do not replace skills; they orchestrate skills to complete a larger outcome
- Distinguish carefully between **the agent** as the autonomous orchestrator and **a skill** as a single tool call within the workflow

### 🛡️ Safety Moment

- Autonomy starts with understanding what you are delegating before you delegate it
- Developers should know the expected goal, available tools, and approval boundary before letting an agent run
- If you cannot clearly describe the task scope, the agent is not ready to own it

### 🖥️ Demo: Framing the Agent Loop

1. Ask GitHub Copilot to explain a task as both an agent workflow and a direct tool action:

   ```text
   Explain the difference between an agent workflow and a single skill call for this repository. Give me one example of each.
   ```

2. Call out where planning happens, where a skill is used, and where the developer still reviews the result.

### Discussion Points

- What tasks would you trust an agent to handle autonomously?
- What would you always want to review before accepting?
- Where does your current comfort level change from "assist me" to "act for me"?

---

## 2. Agent vs. Skill — When to Use Each (12 min)

### Key Points

- Use an **agent** when the task is multi-step, goal-directed, and likely to require judgment during execution
- Use a **skill** or direct tool invocation when the task is single-step, deterministic, and does not need adaptation
- A simple decision framework:

```text
Is the task multi-step?
Does it require judgment?
Does it need to adapt based on intermediate results?

If yes → use an agent
If no → use a direct skill or tool call
```

- Agents are strongest when they can sequence actions, inspect results, and revise the next step
- Direct skills are strongest when you already know exactly what action is needed

### 🛡️ Safety Moment

- Scope control matters more than capability breadth
- Give agents only the tools they need for the task instead of every tool available
- The smaller the tool set, the easier it is to predict and review behavior

### 🖥️ Demo: One Goal, Two Interaction Styles

1. Show a multi-step agent request:

   ```text
   Refactor #file for readability, update any impacted tests, and summarize the risks before I accept the changes.
   ```

2. Show a direct explanation request:

   ```text
   Explain what #selection does and why it exists.
   ```

3. Compare the difference in planning, tool use, and review burden.

### Discussion Points

- Which tasks in your daily workflow are agent-worthy?
- Which tasks are better handled as direct answers or single tool calls?
- Where do you see teams overusing autonomy instead of choosing the simpler path?

---

## 3. Background Agents and Cloud Agents — Coding Agent (15 min)

### Key Points

- **Background agents** are long-running agents that keep working while the developer continues with other tasks
- Developers launch them, monitor progress, review intermediate output, and inspect the final result before accepting it
- **Cloud agents**, including **Coding Agent**, extend the workflow beyond the local IDE into an issue → branch → implement → pull request flow
- Coding Agent can work from a GitHub issue, create a branch, implement the change in a cloud environment, and open a PR for review
- `copilot-setup-steps.yml` helps prepare the cloud environment with required dependencies, tools, and setup steps
- Trust calibration matters: the more autonomy you grant, the more important review gates become

### 🛡️ Safety Moment

- Always review pull requests created by coding agents
- Treat autonomous code generation as draft output until a human validates correctness, security, and fit with team standards
- Review gates are not friction; they are how you scale autonomy safely

### 🖥️ Demo: Launch, Monitor, Review

1. Show a background agent working on a multi-step task while you continue narrating:

   ```text
   Investigate this failing test, propose a fix, and keep me updated as you work.
   ```

2. Walk through the cloud workflow conceptually:

   ```text
   Issue assigned → branch created → implementation runs in cloud → PR opened for review
   ```

3. Show a sample `copilot-setup-steps.yml` snippet and explain why environment preparation matters:

   ```yaml
   - name: Install dependencies
     run: npm ci

   - name: Build project
     run: npm run build

   - name: Run tests
     run: npm test
   ```

### Discussion Points

- What guardrails would your team need before adopting Coding Agent?
- Which tasks fit a background agent well versus a cloud agent workflow?
- What review signals would help you calibrate trust in autonomous changes?

---

## 4. GitHub Copilot `/init` and Project Bootstrapping (8 min)

### Key Points

- GitHub Copilot `/init` helps scaffold a new project by generating structure, configuration, and starter boilerplate
- It is most useful when you want to accelerate a standard project setup rather than hand-author every starter file
- `/init` is not a replacement for design decisions; it is a starting point that still needs developer review
- Teams can customize the scaffold by being explicit about stack, architecture, testing, and deployment expectations
- Generated output should always be reviewed before committing

### 🛡️ Safety Moment

- Never blindly accept scaffolded project output
- Validate generated files, package choices, defaults, and security posture before treating the scaffold as your baseline
- Boilerplate can save time, but it can also import the wrong assumptions

### 🖥️ Demo: Bootstrapping a Small Project

1. Run an initialization request:

   ```text
   /init Create a small TypeScript API with linting, tests, and a README. Keep the structure minimal and beginner-friendly.
   ```

2. Review what GitHub Copilot generated and identify which files you would inspect first.
3. Call out when manual setup is still the better choice.

### Discussion Points

- How would you integrate `/init` into your team's project creation workflow?
- What defaults would you always verify before committing scaffolded output?
- Where would custom starter templates still outperform generated scaffolding?

---

## 5. Instruction Layering — Org, Repo, and File-Scoped (15 min)

### Key Points

- GitHub Copilot behavior is shaped by a layered instruction stack, from broad organizational guardrails down to the current chat request
- The full stack looks like this:

| Layer | File / Location | Purpose | Example |
|-------|-----------------|---------|---------|
| Organization | GitHub org-level Copilot policy settings | Enterprise-wide guardrails | Content exclusions, allowed models |
| Repository | `.github/copilot-instructions.md` | Shared rules for this codebase | "Prefer TypeScript strict mode" |
| File-scoped | `.github/instructions/*.instructions.md` with `applyTo` | Language or file-type specialization | `applyTo: "**/*.test.*"` |
| User-level | Personal settings | Personal defaults across repos | "Use PowerShell on Windows" |
| Session/prompt | Current chat prompt | Task-specific intent | "Add validation for email fields" |

- In practice, the most specific applicable instruction wins when guidance conflicts
- Organization-level guardrails cannot be overridden by repository instructions
- Well-designed instruction layering helps teams scale consistency without forcing every prompt to restate the same rules

### 🛡️ Safety Moment

- Organization-level guardrails exist for a reason
- Do not try to bypass safety, model, or content policies with repository-level instructions
- Shared instructions should encode durable standards, not attempts to override governance

### 🖥️ Demo: Watching the Layers Compose

1. Show a repository-wide rule in `.github/copilot-instructions.md`:

   ```markdown
   # Repository Instructions

   - Prefer TypeScript strict mode
   - Add or update tests when behavior changes
   ```

2. Add a file-scoped rule for tests:

   ```markdown
   ---
   applyTo: "**/*.test.*"
   ---

   # Test Instructions

   - Use describe/it blocks
   - Cover edge cases before happy paths
   ```

3. Compare a generation request in a source file versus a test file and call out which layers are active.

### Discussion Points

- What organizational guardrails should your team implement?
- Which conventions belong in repo instructions versus scoped instructions?
- Where have you seen prompt quality improve when durable instructions were already in place?

---

## 6. Multi-Agent Patterns — Squad as a Worked Example (15 min)

### Key Points

- Multi-agent workflows are useful when distinct roles benefit from different goals, tools, or evaluation criteria
- A concrete reference is **Squad**: <https://github.com/bradygaster/squad>
- In a multi-agent pattern, one agent might write code, another might review for defects, and another might expand or validate tests
- Effective orchestration depends on clearly defined roles, crisp handoff points, and a shared definition of done
- Multi-agent setups are powerful when specialization improves quality, but they become overkill when one well-scoped agent can finish the task safely
- Before adding more agents, ask whether complexity is solving a real problem or just creating more coordination overhead

### 🛡️ Safety Moment

- Design an off-ramp before you design more autonomy
- If the optimal path is blocked, agents should know when to stop, escalate, or return a partial result instead of improvising beyond the safe boundary
- A graceful handoff is often better than a risky autonomous guess

### 🖥️ Demo: Mapping Roles and Handoffs

1. Walk through a simple role split:

   ```text
   Agent 1: Implement change
   Agent 2: Review change for bugs and maintainability
   Agent 3: Add or improve tests
   ```

2. Show where handoffs happen and what each agent must receive as context.
3. Discuss when the same task would be simpler with one agent and a tighter prompt.

### Discussion Points

- What specialized agent roles would benefit your team's workflow?
- Where would multi-agent orchestration improve quality or speed?
- What signs tell you that multi-agent design is overkill for the task at hand?

---

## 7. Rubber Duck Debugging with GitHub Copilot (5 min)

### Key Points

- GitHub Copilot can act as a thought partner when you explain a bug, design tradeoff, or architectural concern out loud in writing
- The act of explaining your reasoning often reveals missing assumptions, hidden dependencies, or weak logic
- Cross-model review can help by giving you a second perspective on the same problem
- AI reasoning can be useful for surfacing possibilities, but design decisions still need independent validation

### 🛡️ Safety Moment

- Confident-sounding reasoning is not the same as correct reasoning
- Validate root-cause analysis, architectural advice, and debugging conclusions against the code and runtime evidence
- Use GitHub Copilot to sharpen your thinking, not to replace verification

### 🖥️ Demo: Talking Through a Bug

1. Frame the bug as a reasoning problem:

   ```text
   I think this bug happens because the cache invalidation path runs before the async write completes. Challenge my reasoning and point out what I may be missing.
   ```

2. Ask a second model or a fresh thread to critique the first answer.

### Discussion Points

- When have you caught a bug by explaining it to someone else?
- How could GitHub Copilot serve that rubber-duck role in your daily work?
- What design decisions would you still insist on validating independently?

---

## 8. Wrap-up, Hand-off to Lab, and Q&A (5 min)

### Key Points

- Agents coordinate skills; skills perform specific actions
- Choose agentic workflows when the task is multi-step and adaptive, and direct tool use when the task is simple and deterministic
- Background agents, cloud agents, and Coding Agent expand where work happens, but review gates remain essential
- GitHub Copilot `/init`, instruction layering, and custom orchestration patterns are force multipliers when paired with clear constraints
- The lab focuses on three practical takeaways: choosing agent versus direct interaction, observing instruction layering, and creating a lightweight custom agent
- Module 3 will extend this foundation into advanced integrations, memory, APIs, and deeper debugging patterns

### 🖥️ Demo: Lab Preview and Transition

1. Preview the lab sequence:

   ```text
   Exercise 1 → Compare agent vs. direct interaction
   Exercise 2 → Create layered instructions
   Exercise 3 → Build a custom review agent
   ```

2. Re-emphasize that the goal is safe experimentation, not maximum autonomy.

### Discussion Points

- Which pattern from today feels immediately usable in your workflow?
- What still feels risky or unclear about agentic development?
- What do you want to explore more deeply in Module 3?

*Workshop guide for Module 2: Agentic Patterns — GitHub Copilot Developer Training*
