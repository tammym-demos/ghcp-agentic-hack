# Module 2: Agentic Patterns — Workshop Guide

**Duration**: ~115 min
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
- Apply practical token optimization strategies including model selection, task splitting, and deterministic guardrails

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
| 7 | Agent Quality & Token Optimization | 25 min |
| 8 | Rubber Duck Debugging with Copilot | 5 min |
| 9 | Wrap-up, hand-off to lab, and Q&A | 5 min |

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

### 🔬 LAB: Exercise 1 — Agent vs. Skill

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (5 min) comparing an agent multi-step workflow with a direct skill invocation.

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

### 💡 Optimization Tip: Tool Set Discipline

- Give agents only the tools they need for the current task — a smaller tool set produces more predictable behavior
- Too many available tools (especially MCP servers like Playwright) can cause agents to take unnecessary detours (e.g., taking screenshots when none were requested)
- Pair custom agents with restricted tool lists to keep them focused

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

### 💡 Optimization Tip: Sub-Agents for Context Isolation

- Background agents and sub-agents run in their own context window — only the final summary returns to the main session
- This prevents discovery tokens (file listings, search results, intermediate reasoning) from polluting your primary working context
- Trade-off: duplicating system/tool tokens in the sub-context, but the main session stays clean and focused

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

### 🔬 LAB: Exercise 2 — Instruction Layering

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (5 min) creating layered instructions and observing how they compose across repo-wide and file-scoped levels.

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

### 💡 Optimization Tip: Skills as Conditional Context

- **Skills** are only loaded when the LLM determines they are relevant — unlike `copilot-instructions.md` which is always sent
- Move conditional guidance (e.g., "when working with Docker files, always use multi-stage builds") OUT of always-on instructions and INTO skills
- This saves input tokens on every request where the skill is not relevant
- Do not create skills for well-known frameworks (React, Express) — they are already dominant in training data and skills would add no value

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

### 🔬 LAB: Exercise 3 — Build a Custom Agent

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (5 min) creating a custom review agent and observing structured background execution.

---

## 7. Agent Quality & Token Optimization (25 min)

### Key Points

- **Core principle**: "Make every token count" — focus on agent output quality, not just cost reduction
- If the value of an agent's output is zero, even 80–90% cost reduction is just toil — quality determines ROI
- The **compounding error problem**: even 99% single-step accuracy drops to ~60% over 50 steps; 95% accuracy drops to ~8%
- Every agent miss wastes tokens (discarded work, fix sessions, review cycles) — improving quality often *decreases* cost naturally
- Context engineering is the critical new developer skill for the AI era

### Context Windows & Token Mechanics

- LLMs are word-probability machines — irrelevant context shifts probabilities away from desired output
- Agents are stateless: the entire conversation is re-sent to the model every loop iteration — tokens accumulate
- **Golden rule**: "As little context as possible, but as much as required"

### Token Anatomy — Input, Output, and Cached

- A **token** is the fundamental unit LLMs process — roughly 4 characters in English, but varies for code (operators, brackets, and keywords often map to single tokens while long identifiers split into multiple)
- Every interaction has three token categories that determine cost and performance:

| Token Type | What It Includes | Relative Cost | Key Insight |
|------------|-----------------|---------------|-------------|
| **Input tokens** | System prompt, instructions, conversation history, attached files, context from `@workspace`/`#file` | Base rate | Grows with every turn in a session — the full history is re-sent each time |
| **Output tokens** | The model's generated response (code, explanations, tool calls) | 2–4× input cost | More expensive per token — verbose prompts that elicit concise answers are often cheaper than the reverse |
| **Cached tokens** | Repeated input prefixes the provider has already processed (system prompt, instruction files, stable context) | 50–90% discount vs. input | Stable instruction files and consistent system prompts benefit from caching automatically — reordering or editing early context breaks the cache |

- **Why this matters for developers**:
  - In an agentic loop, input tokens compound: a 10-turn session re-sends the full context 10 times — the 10th turn's input cost alone may exceed the first 9 combined
  - Cached tokens make durable context (instruction files, system prompt) nearly free after the first turn — this is why well-structured `.github/copilot-instructions.md` files pay for themselves
  - Output tokens are the most expensive — prompts that say "be concise" or "respond in bullet points" directly reduce cost
  - Attaching a large file via `#file` adds its full token count to every subsequent turn in the session, not just the turn where you attached it

- **Context rot** appears as sessions grow:
  - **Lost in the middle** (~50% window fill): model biases toward beginning/end, forgets middle content
  - **Recency bias** (~60–70% fill): model forgets system prompt, original goal, and custom instructions
- Practical implication: start new sessions for new tasks; use `/clear` when shifting focus

### Practical Controls (Ordered by Impact)

1. **Model selection** (biggest cost lever — up to 24× price difference):
   - Reasoning models (Opus, o-series) → planning, architecture, complex debugging
   - Mid-tier (Sonnet, GPT-4.5) → implementation with a clear spec
   - Low-tier (Haiku, GPT-mini) → simple edits, typo fixes, formatting
   - Use **Auto mode** as default — it performs intent detection and routes to the right model

2. **Precise prompts with stop signals**:
   - Be specific: "Fix Issue #45 — the cache invalidation race in `src/cache.ts`, stop when tests pass"
   - Include file references you already know (save discovery tokens)
   - Add explicit stop conditions to prevent over-execution

3. **Split tasks: Research → Plan → Implement**:
   - Research: use cheaper models, broad context, discover files and patterns
   - Plan: use reasoning models, create an airtight spec
   - Implement: use mid-tier models, follow the spec, parallelize by concern

4. **Deterministic guardrails (tests, linters, scanners)**:
   - A single failing test can reset agent accuracy from a 40% drift back to 99%
   - Tests as guardrails cost less than shipping bugs + incident response + debug sessions
   - Linters and security scanners catch drift before it compounds

5. **Persistent instructions (copilot-instructions.md)**:
   - Keep small and precise — non-negotiables only
   - Use as an "agent miss log" — recurring failures become instructions
   - Do not use AI to generate them — they should capture what AI cannot figure out independently
   - Treat as a living document; review and refresh every ~3 months
   - Adding "be concise" measurably reduces output token volume without sacrificing quality

6. **Output tokens cost more than input tokens**:
   - Generating code and explanations requires more compute than reading context
   - Concise instructions that produce focused output save both time and budget
   - This is why "be concise" and stop signals have outsized impact on cost

7. **MCP server discipline**:
   - Only activate MCP servers you regularly use — each adds tool descriptions to every request
   - Too many available tools causes agents to take unnecessary detours
   - Pair MCP servers with custom agents that restrict the active tool set

### 🛡️ Safety Moment

- Token optimization is not about denying the model information — it is about curating the right information
- Starving context to save cost leads to hallucinations and off-track behavior
- Always validate that cost-saving choices do not degrade output quality below your acceptance bar

### 🖥️ Demo: Model Selection and Session Hygiene

1. Show the same prompt answered by different model tiers and compare quality vs. cost:

   ```text
   Analyze the architecture of this repository and suggest three improvements for testability.
   ```

2. Demonstrate the impact of `/clear` before a new task — show how a long-running session produces worse results than a fresh one for an unrelated question.

3. Show a task split in action:

   ```text
   Step 1 (research): What files handle authentication in this repo?
   Step 2 (plan): Create a migration plan from session-based to JWT auth.
   Step 3 (implement): Implement the plan from step 2.
   ```

### Discussion Points

- Which of the seven controls would have the biggest impact on your current workflow?
- Have you noticed quality degradation in long sessions? What was the symptom?
- How would you structure an "agent miss log" for your team?

### 🔬 LAB: Exercise 4 — Token Optimization

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 4 (5 min) comparing model tiers, practicing session hygiene with `/clear`, and writing precise prompts with stop signals.

---

## 8. Rubber Duck Debugging with GitHub Copilot (5 min)

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

## 9. Wrap-up, Hand-off to Lab, and Q&A (5 min)

### Key Points

- Agents coordinate skills; skills perform specific actions
- Choose agentic workflows when the task is multi-step and adaptive, and direct tool use when the task is simple and deterministic
- Background agents, cloud agents, and Coding Agent expand where work happens, but review gates remain essential
- GitHub Copilot `/init`, instruction layering, and custom orchestration patterns are force multipliers when paired with clear constraints
- Token optimization is quality-first: right model, precise prompts, split tasks, deterministic guardrails, concise instructions
- The lab focuses on four practical takeaways: choosing agent versus direct interaction, observing instruction layering, creating a lightweight custom agent, and optimizing a session for token efficiency
- Module 3 will extend this foundation into advanced integrations, memory, APIs, and deeper debugging patterns

### 🖥️ Demo: Lab Preview and Transition

1. Preview the lab sequence:

   ```text
   Exercise 1 → Compare agent vs. direct interaction
   Exercise 2 → Create layered instructions
   Exercise 3 → Build a custom review agent
   Exercise 4 → Optimize a session with model selection and task splitting
   ```

2. Re-emphasize that the goal is safe experimentation, not maximum autonomy.

### Discussion Points

- Which pattern from today feels immediately usable in your workflow?
- What still feels risky or unclear about agentic development?
- What do you want to explore more deeply in Module 3?

*Workshop guide for Module 2: Agentic Patterns — GitHub Copilot Developer Training*
