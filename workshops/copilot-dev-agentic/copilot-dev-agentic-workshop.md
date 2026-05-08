# Module 2: Agentic Patterns — Workshop Guide

**Duration**: ~90 min (condensed delivery)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers who completed Module 1: Foundations  
**Prerequisites**: Completed Module 1, VS Code with Copilot  
**Curriculum Mapping**: Condenses Session 4 (*Agentic Loops & Rubber Duck*) and Session 5 (*Agent Patterns & Antipatterns*) from the full ~2h 15m module

---

## Workshop Overview

Module 2 shifts the audience from **using Copilot as an assistant** to **designing, supervising, and reviewing agentic work**. The core message is that autonomy is not binary: developers choose how much initiative the system has, how much context it can touch, which tools it can use, and where human review must remain in the loop. This workshop gives attendees a practical vocabulary for that design space: autonomy spectrum, agentic loop, PAOR cycle, Ralph loop, orchestration topology, and guardrails.

The first half of the module focuses on **how agents work**. Attendees learn the autonomy spectrum from completions through coding agents, unpack the architecture of an agentic loop, and practice reading multi-step work through the **Plan → Act → Observe → Reflect (PAOR)** cycle. They also examine the **Ralph loop** — the coding agent's internal validation-and-repair loop — so they can tell the difference between productive self-correction and blind retry behavior.

The second half focuses on **how to design agents responsibly**. Attendees compare **single-agent multi-skill** designs with **multi-agent specialist teams**, review common orchestration topologies, and work through eight high-frequency antipatterns. The goal is not maximum autonomy; it is **bounded autonomy with explicit success criteria, validation, off-ramps, and human checkpoints**.

### Learning Objectives

- Place a Copilot workflow on the **autonomy spectrum** and choose the right human checkpoint for it
- Explain the core components of an **agentic loop** and how tools, context, and validation fit together
- Break down agent behavior using the **PAOR cycle** and recognize what good reflection looks like
- Describe the **Ralph loop** and identify when repeated retries indicate real progress vs. thrashing
- Use the **rubber duck cross-model review** technique to get a second opinion on important logic
- Decide when to use a **single agent with multiple skills** vs. a **multi-agent specialist team**
- Diagnose the eight major **agent antipatterns** and redesign prompts, workflows, and safeguards to avoid them

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Autonomy Spectrum & Human Checkpoints | 12 min |
| 2 | Agentic Loop Definition & Architecture | 15 min |
| 3 | PAOR Cycle & Ralph Loop Deep Dive | 18 min |
| 4 | Rubber Duck Cross-Model Review | 10 min |
| 5 | Single-Agent vs. Multi-Agent Patterns | 15 min |
| 6 | Responsible Agent Design: Antipatterns & Safeguards | 20 min |

**Total**: ~90 min condensed delivery

---

## 1. Autonomy Spectrum & Human Checkpoints (12 min)

### Key Points

- **Autonomy is a spectrum**, not a switch: each step adds initiative, tool reach, and the need for stronger oversight
- The spectrum for this module is: **completions → chat → agent → coding agent**
- As autonomy increases, the human moves from **authoring every token** to **defining scope, checkpoints, and approval gates**
- Safety question for this section: **"What must a human still approve at this level of autonomy?"**

### The Autonomy Spectrum

```text
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────────┐
│ Completions        │ →  │ Chat               │ →  │ Agent              │ →  │ Coding Agent           │
│ Inline suggestions │    │ Conversational     │    │ Tool-using worker  │    │ Issue-to-PR execution  │
│ Human drives       │    │ Human steers       │    │ Shared control     │    │ Human reviews outputs  │
└────────────────────┘    └────────────────────┘    └────────────────────┘    └────────────────────────┘
            lower autonomy                                                              higher autonomy
```

| Level | Typical behavior | Tool access | Best use | Human checkpoint |
|------|-------------------|-------------|----------|------------------|
| **Completions** | Suggests the next line, block, or edit | None beyond editor context | Fast local drafting | Accept or reject each suggestion |
| **Chat** | Explains, compares, drafts, and answers | Read-oriented context | Learning, planning, exploration | Review each answer before acting |
| **Agent** | Searches, edits files, runs commands, iterates | Local tools and workspace | Multi-step implementation inside the repo | Review plan, commands, diff, and validation results |
| **Coding Agent** | Works from an issue or task to produce a PR | Remote execution environment with repo setup | Well-scoped backlog items with clear acceptance criteria | Review issue quality, PR diff, checks, and merge decision |

### Human Checkpoints by Autonomy Level

| Level | Human decides before work starts | Human reviews during work | Human approves at the end |
|------|----------------------------------|---------------------------|---------------------------|
| **Completions** | Whether to keep typing with AI assistance | Every accepted suggestion | Saved code |
| **Chat** | Question framing and context | Follow-up prompts and clarifications | Whether to trust or apply the answer |
| **Agent** | Scope, success criteria, file boundaries, validation rules | Command proposals, retries, risky edits | Final diff, tests, and commit |
| **Coding Agent** | Issue quality, repo access, environment, branch policy | PR updates, failed checks, escalation notes | PR approval and merge |

> **Important**: More autonomy should mean **more explicit checkpoints**, not fewer. The mistake is to increase tool reach without increasing review discipline.

### 🖥️ Demo: One Task Across Four Autonomy Levels

Use the same user story — "Add validation to `POST /users`" — and walk it through four interaction styles:

1. **Completions** — show inline suggestion for a validation `if` block
2. **Chat** — ask for a validation approach and expected edge cases
3. **Agent** — ask the agent to implement validation and tests, then review the plan and diff
4. **Coding Agent** — show the issue text that would be needed for an issue-to-PR workflow

**Teaching prompt examples**:

```text
Chat: Propose a validation strategy for POST /users in this codebase. Include error cases and test ideas.
```

```text
Agent: Add validation to POST /users, add targeted tests, and stop if you need to change files outside src/users.
```

```text
Issue: Add validation to POST /users. Return 400 for missing name/email, preserve existing success behavior, add tests in tests/users.test.ts, do not modify auth or database code.
```

### Discussion Points

- Where does your team currently spend most of its time on the autonomy spectrum?
- Which checkpoint is most often skipped: plan review, command review, diff review, or PR review?
- What kinds of work are too risky for high autonomy without a stronger approval flow?
- How would you explain the difference between **agent** and **coding agent** to a new team member?

---

## 2. Agentic Loop Definition & Architecture (15 min)

### Key Points

- An **agentic loop** is a repeated cycle where the system plans work, takes an action, observes results, and adjusts behavior
- The loop exists because multi-step tasks are rarely solved in one pass; the agent needs **feedback from the environment**
- A useful mental model is: **goal + context + tools + validation + stop conditions**
- The loop ends for one of three reasons: **success**, **escalation to a human**, or **budget/guardrail limit reached**

### Agentic Loop Architecture

```text
┌──────────────────────────────┐
│ Goal + success criteria      │
│ Constraints + safety limits  │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ Plan                         │
│ Break task into next actions │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ Act                          │
│ Edit files / run tool / ask  │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ Observe                      │
│ Read outputs, diffs, errors  │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ Reflect                      │
│ Continue / revise / stop     │
└───────┬───────────────┬──────┘
        │               │
        │ continue      │ escalate
        ▼               ▼
      Plan        Human checkpoint
```

### Architecture Components

| Component | Purpose | Typical signals |
|----------|---------|-----------------|
| **Goal definition** | States what "done" means | Acceptance criteria, file scope, test expectations |
| **Context pack** | Supplies the working set | Referenced files, repo instructions, recent turns |
| **Tool layer** | Gives the agent ways to act | Search, edit, terminal, web, issue/PR APIs |
| **Observation layer** | Returns feedback from actions | Diff, stdout/stderr, failing tests, API responses |
| **Reflection layer** | Decides the next move | Retry, change approach, narrow scope, or stop |
| **Guardrails** | Bound risk and cost | Iteration limit, file limits, approval gates, sandbox rules |

### Why Agentic Loops Matter

- **Without a loop**, the model can only draft an answer
- **With a loop**, the model can inspect reality, detect failure, and revise
- The quality of the loop depends on the quality of the **observations**: vague error summaries produce weak reflection
- Strong loops are **instrumented** and **bounded**; weak loops are opaque and open-ended

> **Note**: Agents do not become reliable because they are autonomous. They become reliable when the loop includes **useful feedback** and **clear stop conditions**.

### 🖥️ Demo: Reading an Agentic Loop in Real Time

Use Agent mode on a small repo task such as:

```text
Add request validation to POST /orders, add focused tests, and summarize any assumptions before you finish.
```

Narrate the loop while the agent works:

1. **Plan** — what files and checks did it choose?
2. **Act** — what did it actually edit or run?
3. **Observe** — what signals came back from tests or lint?
4. **Reflect** — did it change direction, retry, or escalate?

### Discussion Points

- Which part of the loop is most fragile in your environment: context, tools, validation, or reflection?
- What signals make an agent more trustworthy: passing tests, explicit assumptions, smaller diffs, or fewer retries?
- How do you want agents to behave when they hit an ambiguous requirement?
- What should always terminate a loop immediately in your repos?

---

## 3. PAOR Cycle & Ralph Loop Deep Dive (18 min)

### Key Points

- **PAOR** is the practical vocabulary for reading and designing agent behavior: **Plan → Act → Observe → Reflect**
- The **Plan** should be short, concrete, and tied to success criteria
- The **Observe** step is where the environment pushes back with evidence
- The **Reflect** step is the quality gate: it should explain whether to continue, change strategy, or stop
- The **Ralph loop** is the coding agent's **inner validation loop** inside PAOR: edit, run checks, inspect outcomes, repair, and revalidate

### PAOR Explained Step by Step

| Step | What good behavior looks like | Failure mode to watch for |
|------|-------------------------------|---------------------------|
| **Plan** | Names files, checks, and order of operations | Vague "I'll fix it" plan with no measurable endpoint |
| **Act** | Makes scoped changes and runs relevant tools | Large uncontrolled edits across unrelated files |
| **Observe** | Reads exact errors, diffs, and outputs | Ignores stderr, skips failing tests, or summarizes loosely |
| **Reflect** | Updates approach based on evidence | Retries the same action without a new hypothesis |

### Example: PAOR as an Agent Conversation

```text
User: Add validation to POST /users. Return 400 for missing name or email. Add tests.

Agent (Plan): I will inspect the current route and tests, add validation in the request handler,
create negative-path tests, then run the targeted user test suite.

Agent (Act): Opens src/routes/users.ts, src/lib/validators.ts, and tests/users.test.ts.
Updates the route and adds two failing tests for missing fields.

Agent (Observe): tests/users.test.ts fails. Expected 400, received 500.
Stack trace shows the validation error bypasses the error middleware.

Agent (Reflect): The route is throwing instead of returning a structured response.
I will move validation before the handler body and normalize the error response.

Agent (Act): Updates middleware ordering and reruns the targeted tests.

Agent (Observe): Targeted tests pass.

Agent (Reflect): Goal met for route behavior and focused tests. I will summarize the change
and note that full regression tests were not run.
```

### The Ralph Loop: Internal Validation and Repair

This workshop uses **Ralph loop** as the name for the coding agent's **inner validation loop** — the repeated cycle that happens *inside* the broader PAOR flow after a code change is made.

```text
Outer loop:   Plan → Act → Observe → Reflect
                         │
                         ▼
Inner loop:   edit → run check → inspect output → patch → rerun
                         │
                         └── stop after bounded retries or escalate
```

### Ralph Loop Decision Table

| Signal after a change | Healthy Ralph-loop response | Warning sign |
|-----------------------|-----------------------------|--------------|
| **One focused test fails** | Patch the relevant file and rerun the same focused test | Jumps to unrelated files or broad refactors |
| **Lint/type error appears** | Fix the exact error and rerun validation | Suppresses the error without understanding it |
| **No validation exists** | Add the smallest useful check before claiming success | Declares done without evidence |
| **Repeated similar failures** | Stop, summarize blocker, and ask for guidance or narrower scope | Continues blind retries past the iteration limit |

### Reading Reflection Quality

Good reflection sounds like:

```text
The failure indicates middleware order, not schema shape. I will move validation earlier and rerun only the user-route tests.
```

Poor reflection sounds like:

```text
That did not work. I will try something else.
```

> **Important**: A loop that retries quickly is not automatically intelligent. What matters is whether each retry is driven by a **new evidence-based hypothesis**.

### 🖥️ Demo: Spot the Outer Loop vs. the Ralph Loop

Run a task that is likely to require at least one correction:

```text
Add email validation to the signup flow, include tests for invalid format, and stop if a database migration is required.
```

While the agent works, ask attendees to label each step:

1. Which message is **Plan**?
2. Which edits and commands are **Act**?
3. Which outputs are **Observe**?
4. Which summary is **Reflect**?
5. When did the agent enter a **Ralph-loop retry** instead of moving the main task forward?

### Discussion Points

- What is the difference between a productive retry and an unproductive retry?
- When should a Ralph loop stop and escalate rather than keep repairing?
- How much reflection do you want visible to the human reviewer?
- Which is harder to teach teams: writing better plans or recognizing bad reflection?

---

## 4. Rubber Duck Cross-Model Review (10 min)

### Key Points

- The **rubber duck** pattern uses a second model or agent as a reviewer for the first model's output
- The goal is not "best model wins"; the goal is **independent critique**
- Cross-model review is especially valuable for **validation logic, parsing, edge cases, test quality, and security-sensitive changes**
- The human remains the final adjudicator; do not auto-merge one model's opinions into another model's changes

### Rubber Duck Workflow

```text
┌────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│ Model A builds │ →  │ Model B critiques  │ →  │ Human decides      │
│ or proposes    │    │ bugs / edge cases  │    │ what to keep       │
└────────────────┘    └────────────────────┘    └────────────────────┘
```

### When Rubber Duck Review Adds the Most Value

| Use it when... | Why it helps |
|----------------|--------------|
| **Logic is tricky** | Different models catch different assumptions |
| **Tests look too happy-path** | Reviewer can ask for negative and edge cases |
| **The first result feels overconfident** | A second model often surfaces missing caveats |
| **You want a fast pre-review before a human PR review** | It is cheaper than discovering issues after merge |

### Example: Cross-Model Review Prompt Pair

```text
Model A: Write a helper that validates a user object with name and email fields.
```

```text
Model B: Review this helper for bugs, edge cases, unsafe assumptions, and missing tests.
Focus on normalization, empty strings, malformed email input, and error reporting.
```

### Example Review Outcome

| First model output | Second model review catches | Human decision |
|-------------------|-----------------------------|----------------|
| Accepts any non-empty email string | Missing trim, uppercase normalization, malformed email cases | Keep schema shape, add normalization + tests |
| Returns generic `false` | Poor error diagnostics for callers | Add structured error messages |
| Has only happy-path tests | No tests for whitespace-only name or `null` email | Add negative-path tests |

> **Note**: Rubber duck review is a **workflow pattern**, not a product feature. You are deliberately creating independent perspective before you trust the result.

### 🖥️ Demo: One Model Writes, Another Reviews

1. Use one model or agent to generate a small validation helper
2. Copy the result into a second model and ask for a review with named failure modes
3. Compare the feedback:
   - Did the second model find missing edge cases?
   - Did it challenge hidden assumptions?
   - Did it recommend more useful tests?
4. Apply only the feedback that survives human scrutiny

### Discussion Points

- Where would cross-model review save your team the most time today?
- What kinds of tasks should never skip a human reviewer even after a rubber duck pass?
- How do you prevent "review laundering," where one model's confidence convinces another model too easily?
- Would you use a second model more often for implementation review or test review?

---

## 5. Single-Agent vs. Multi-Agent Patterns (15 min)

### Key Points

- A **single-agent multi-skill** design keeps one planner in control and gives it multiple capabilities
- A **multi-agent specialist team** splits work across agents with narrower roles such as planner, implementer, tester, or reviewer
- Multi-agent systems are powerful when work can be divided cleanly, but they add **coordination cost, context handoffs, and failure surfaces**
- Choose the smallest orchestration pattern that reliably solves the task

### Single-Agent vs. Multi-Agent Decision Guide

| Pattern | Best for | Strengths | Risks | Use when |
|---------|----------|-----------|-------|----------|
| **Single agent, multiple skills** | Most day-to-day coding tasks | Lower overhead, shared context, fewer handoffs | One agent may overreach or miss specialist concerns | The work fits one clear plan and one working set |
| **Multi-agent specialist team** | Complex, decomposable workflows | Parallelism, role clarity, independent review | Coordination cost, duplicated context, agent thrashing | Work naturally separates into planner / builder / validator stages |

### When to Choose Each Approach

| Question | Favor single agent if... | Favor multi-agent if... |
|---------|---------------------------|--------------------------|
| **How shared is the context?** | One repo slice or one feature area is enough | Different subproblems require different context packs |
| **Can work happen in parallel?** | No, steps are tightly coupled | Yes, independent branches can move simultaneously |
| **Do you need independent critique?** | One bounded implementation is enough | You need separate review, testing, or policy roles |
| **Is coordination expensive?** | Yes, handoffs would outweigh gains | No, the task is large enough to justify orchestration |

### Orchestration Topologies

```text
Sequential
┌─────────┐   ┌────────────┐   ┌──────────┐
│ Planner │ → │ Implementer│ → │ Reviewer │
└─────────┘   └────────────┘   └──────────┘

Parallel
              ┌──────────┐
            ┌→│ API agent│─┐
┌─────────┐ │ └──────────┘ │
│ Planner │─┼→┌──────────┐ ├→┌──────────┐
└─────────┘ │ │ Test agent│─┘ │ Integrator│
            └→└──────────┘    └──────────┘

Hierarchical
┌─────────────────┐
│ Lead orchestrator│
└──────┬──────┬───┘
       │      │
       ▼      ▼
  ┌────────┐ ┌────────┐
  │Agent A │ │Agent B │
  └────┬───┘ └───┬────┘
       ▼         ▼
   subtasks   subtasks
```

### Topology Comparison

| Topology | How it works | Good fit | Failure mode |
|---------|---------------|----------|--------------|
| **Sequential** | One agent hands work to the next | Change-control pipelines, plan → build → review | Bottlenecks if one stage is weak |
| **Parallel** | Independent specialists work at the same time | API + tests + docs on a shared spec | Merge conflicts or inconsistent assumptions |
| **Hierarchical** | Lead agent decomposes and supervises sub-agents | Large initiatives with clear subdomains | Overhead and cascading coordination failures |

### Practical Pattern Guidance

- Start with **single-agent multi-skill** for feature work inside one repo slice
- Add **specialist reviewers** before adding specialist implementers
- Use **parallelism** only when outputs can be merged against a shared contract
- Keep a human at the **integration boundary** whenever multiple agents contribute changes

### 🖥️ Demo: Design the Right Team for the Task

Use three sample tasks and ask attendees which pattern fits best:

1. **Rename one API field across two files** → single agent
2. **Add a feature plus tests plus documentation** → single agent or sequential planner/implementer/reviewer
3. **Refactor three services with shared interface contracts** → hierarchical or parallel with a human integration checkpoint

Then show how the same task changes when you add one more constraint: separate compliance review, separate test generation, or separate documentation ownership.

### Discussion Points

- Where does your team over-engineer with too many agents today?
- Which role is most valuable to split out first: planner, reviewer, tester, or docs writer?
- What kinds of tasks look parallel but actually require sequential control?
- If multiple agents touch one PR, where should the human integration checkpoint live?

---

## 6. Responsible Agent Design: Antipatterns & Safeguards (20 min)

### Key Points

- Responsible agents are built around **guardrails, safety boundaries, and explicit failure modes**
- The most common agent failures are not dramatic; they are subtle workflow design mistakes
- Fixing antipatterns usually means improving one of four things: **scope, validation, stop conditions, or role clarity**
- Safety question for this section: **"If this agent fails, how does it fail safely?"**

### Guardrail Checklist

| Guardrail | Why it matters | Example |
|----------|----------------|---------|
| **Success criteria** | Prevents wandering and premature "done" claims | "Add `POST /users` validation, return 400 on missing fields, add tests, run targeted suite" |
| **Scope boundary** | Limits blast radius | "Modify only `src/users/**` and `tests/users.test.ts`" |
| **Validation rule** | Requires evidence before completion | "Run targeted tests and report exact command + result" |
| **Iteration limit** | Prevents unbounded retries | "Stop after 2 repair attempts and summarize the blocker" |
| **Escalation path** | Enables safe handoff | "Ask for help if auth, secrets, or schema migrations are required" |
| **Human checkpoint** | Preserves oversight | "Do not commit or merge without reviewer approval" |

### 1. Unbounded Loops

**Why it happens**: The agent has permission to keep retrying but no iteration ceiling or escalation rule.

**Before**:

```text
Keep trying until it works.
```

**After**:

```text
Try at most 2 repair cycles. If tests still fail, stop and summarize the root cause, files touched, and recommended next step.
```

### 2. Context Bloat

**Why it happens**: The prompt includes too much history, too many files, or an entire repo when the task only needs a few artifacts.

**Before**:

```text
#codebase Here are 30 files and the full project history. Update the validation behavior.
```

**After**:

```text
#file:src/routes/users.ts #file:tests/users.test.ts Add validation to POST /users and update only the related tests.
```

### 3. Poor Error Handling

**Why it happens**: The workflow treats any failure as "try again" instead of classifying the error.

**Before**:

```text
If a command fails, just keep going and see if another change fixes it.
```

**After**:

```text
If a command fails, read the exact error output. Retry only for code-level issues. Stop immediately for auth errors, missing secrets, network failures, or unavailable services.
```

### 4. Inadequate Validation

**Why it happens**: The agent is allowed to claim success based on code edits alone.

**Before**:

```text
Implement the change and let me know when you're done.
```

**After**:

```text
Implement the change, run the focused validation commands, and report the exact results. Do not claim success if the checks were not run.
```

### 5. Missing Safeguards

**Why it happens**: The agent has broad permission but no protected boundaries.

**Before**:

```text
Refactor anything necessary to make this better.
```

**After**:

```text
Modify only src/orders/**. Do not change infrastructure, secrets, CI, or dependency versions. Stop and ask if the fix requires broader changes.
```

### 6. Unclear Success Criteria

**Why it happens**: The task asks for improvement without defining "done."

**Before**:

```text
Improve onboarding.
```

**After**:

```text
Improve onboarding by adding a Quick Start section to README.md, documenting local setup in 5 steps, and adding one troubleshooting section for missing environment variables.
```

### 7. Agent Thrashing

**Why it happens**: Multiple agents are assigned overlapping responsibilities and keep handing the same work back and forth.

**Before**:

```text
@architect @reviewer @tester @api-agent Solve this bug together.
```

**After**:

```text
@architect define the approach.
@api-agent implement the change.
@tester add and run focused tests.
@reviewer review the final diff for risks and missing edge cases.
```

### 8. Inefficient Tool Use

**Why it happens**: The agent uses the wrong tool sequence — broad scans, full-suite reruns, or too many file opens for a narrow task.

**Before**:

```text
Open every file that mentions users, run the full test suite after each edit, and inspect all warnings.
```

**After**:

```text
Search for the user route, open only the relevant handler and tests, run focused tests first, and run the broader suite only after the local fix passes.
```

### Antipattern Summary Table

| Antipattern | Root cause | Primary fix |
|-------------|------------|-------------|
| **Unbounded loops** | No stop rule | Add retry limit + escalation |
| **Context bloat** | Too much irrelevant context | Narrow to the working set |
| **Poor error handling** | Failure not classified | Separate retryable vs. non-retryable errors |
| **Inadequate validation** | No evidence required | Make checks part of "done" |
| **Missing safeguards** | Blast radius too large | Add file, tool, and approval boundaries |
| **Unclear success criteria** | Ambiguous goal | Define acceptance criteria in concrete terms |
| **Agent thrashing** | Role overlap | Assign explicit ownership by stage |
| **Inefficient tool use** | Wrong action order | Search narrowly, validate incrementally |

### Designing Responsible Agents

- Give every agent an **off-ramp**: what should make it stop and ask?
- Treat **validation output** as first-class evidence, not background noise
- Prefer **small scopes and fast feedback loops** over heroic autonomy
- Add a **human checkpoint at the integration boundary**: before commit, before PR, or before merge

> **Important**: The safest agent is not the one that never fails. It is the one that fails **predictably, transparently, and within a bounded blast radius**.

### 🖥️ Demo: Rewrite a Fragile Prompt into a Responsible Agent Contract

Start with a weak prompt:

```text
Fix the user API and make the tests better.
```

Refactor it live into a responsible agent contract:

```text
Update POST /users in src/routes/users.ts to validate missing name and email.
Add focused tests in tests/users.test.ts for both failure cases.
Run the targeted user test suite and report the exact command and result.
Do not modify auth, database, or CI files.
Stop after 2 repair attempts or if a schema migration is required.
```

Explain which antipatterns the rewrite removes:

- unclear success criteria
- missing safeguards
- inadequate validation
- unbounded loops

### Discussion Points

- Which antipattern shows up most often in your team's current AI workflows?
- What is the minimum validation evidence you require before trusting an agent's answer?
- Where should your default escalation boundary sit: dependency changes, secrets, schema changes, or production config?
- How would you turn one of your existing prompts into a safer agent contract this week?

---

*Workshop guide for Module 2: Agentic Patterns — Copilot Developer Training*
