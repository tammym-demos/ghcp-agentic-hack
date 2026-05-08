---
theme: ../../themes/github
title: "Copilot Developer Training — Module 2: Agentic Patterns"
info: |
  90-minute module covering autonomy spectrum, agentic loops, PAOR, Ralph loop, rubber duck review, orchestration topologies, and responsible agent design.
ghFooterTitle: "Module 2: Agentic Patterns"
ghFooterLabel: ""
drawings:
  persist: false
mermaid:
  theme: dark
transition: slide-left
mdc: true
layout: cover
---
<!-- markdownlint-disable -->

# Copilot Developer Training

## Module 2: Agentic Patterns

*Autonomy Spectrum · PAOR · Ralph Loop · Rubber Duck · Orchestration · Safeguards*

`90-minute condensed delivery`

<!-- notes
Anchor the module around calibrated autonomy, not maximum autonomy. The audience should leave with a vocabulary for supervising agentic work, reviewing retries, and designing safer workflows.
-->

---
class: text-sm
---

# Agenda

| Time | Topic |
|------|-------|
| 12 min | **1. Autonomy Spectrum & Human Checkpoints** |
| 15 min | **2. Agentic Loop Definition & Architecture** |
| 18 min | **3. PAOR Cycle & Ralph Loop Deep Dive** |
| 10 min | **4. Rubber Duck Cross-Model Review** |
| 15 min | **5. Single-Agent vs. Multi-Agent Patterns** |
| 20 min | **6. Responsible Agent Design: Antipatterns & Safeguards** |

<div class="gh-callout gh-callout-blue">

**Module flow**: Calibrate autonomy → inspect the loop → judge retries → add independent review → choose the right topology → add guardrails.

</div>

<!-- notes
Keep the sequence explicit. Each section adds one control surface: checkpointing, loop visibility, retry quality, cross-model review, team topology, and safeguards.
-->

---
layout: section
---

# 1. Autonomy Spectrum & Human Checkpoints

<!-- notes
Open with the idea that autonomy is not binary. The decision is not whether to use AI, but how much initiative and tool reach to grant for a given task.
-->

---
class: text-xs
---

# The Autonomy Spectrum

```text
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────────┐
│ Completions        │ →  │ Chat               │ →  │ Agent              │ →  │ Coding Agent           │
│ Inline suggestions │    │ Conversational     │    │ Tool-using worker  │    │ Issue-to-PR execution  │
│ Human drives       │    │ Human steers       │    │ Shared control     │    │ Human reviews outputs  │
└────────────────────┘    └────────────────────┘    └────────────────────┘    └────────────────────────┘
            lower autonomy                                                              higher autonomy
```

<v-clicks>

- **Autonomy is a spectrum**, not a switch: each step adds initiative, tool reach, and the need for stronger oversight.
- The spectrum for this module is **completions → chat (Ask/Plan) → agent → coding agent**.
- As autonomy increases, the human moves from **authoring every token** to **defining scope, checkpoints, and approval gates**.

</v-clicks>

<div class="gh-callout gh-callout-purple">

**Current product mapping**: In VS Code today, **Ask** and **Plan** live in the broader chat layer; **Agent** is the local autonomous worker; the **coding agent** runs remotely and produces a PR for review.

</div>

<!-- notes
Use the product mapping callout to keep the content current without changing the underlying autonomy model.
-->

---
class: text-xs
---

# Human Checkpoints by Autonomy Level

| Level | Human decides before work starts | Human reviews during work | Human approves at the end |
|------|----------------------------------|---------------------------|---------------------------|
| **Completions** | Whether to keep typing with AI assistance | Every accepted suggestion | Saved code |
| **Chat** | Question framing and context | Follow-up prompts and clarifications | Whether to trust or apply the answer |
| **Agent** | Scope, success criteria, file boundaries, validation rules | Command proposals, retries, risky edits | Final diff, tests, and commit |
| **Coding Agent** | Issue quality, repo access, environment, branch policy | PR updates, failed checks, escalation notes | PR approval and merge |

<div class="gh-callout gh-callout-purple">

**AI safety checkpoint**: More autonomy should mean **more explicit checkpoints**, not fewer.

</div>

<!-- notes
The key mistake to call out is granting tool reach without also increasing review discipline.
-->

---
layout: section
---

# 2. Agentic Loop Definition & Architecture

<!-- notes
Now explain why agents feel different from one-shot chat: they operate in a loop with feedback from the environment.
-->

---
class: text-xs
---

# Agentic Loop Architecture

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

<v-clicks>

- An **agentic loop** is a repeated cycle where the system plans work, takes an action, observes results, and adjusts behavior.
- The loop exists because multi-step tasks are rarely solved in one pass; the agent needs **feedback from the environment**.
- The loop should end with **success**, **escalation to a human**, or a **budget / guardrail limit**.

</v-clicks>

<!-- notes
Reinforce that autonomy without feedback is just speculative drafting. The loop matters because reality can push back.
-->

---
class: text-xs
---

# Architecture Components

| Component | Purpose | Typical signals |
|----------|---------|-----------------|
| **Goal definition** | States what "done" means | Acceptance criteria, file scope, test expectations |
| **Context pack** | Supplies the working set | Referenced files, repo instructions, recent turns |
| **Tool layer** | Gives the agent ways to act | Search, edit, terminal, web, issue/PR APIs |
| **Observation layer** | Returns feedback from actions | Diff, stdout/stderr, failing tests, API responses |
| **Reflection layer** | Decides the next move | Retry, change approach, narrow scope, or stop |
| **Guardrails** | Bound risk and cost | Iteration limit, file limits, approval gates, sandbox rules |

<div class="gh-callout gh-callout-blue">

**Reliability insight**: Agents do not become reliable because they are autonomous. They become reliable when the loop includes **useful feedback** and **clear stop conditions**.

</div>

<!-- notes
Highlight observation quality here. Weak observations produce weak reflection.
-->

---
layout: section
---

# 3. PAOR Cycle & Ralph Loop Deep Dive

<!-- notes
Give the audience a vocabulary for reading transcripts and deciding whether an agent is progressing or merely retrying.
-->

---
class: text-xs
---

# PAOR Explained Step by Step

| Step | What good behavior looks like | Failure mode to watch for |
|------|-------------------------------|---------------------------|
| **Plan** | Names files, checks, and order of operations | Vague "I'll fix it" plan with no measurable endpoint |
| **Act** | Makes scoped changes and runs relevant tools | Large uncontrolled edits across unrelated files |
| **Observe** | Reads exact errors, diffs, and outputs | Ignores stderr, skips failing tests, or summarizes loosely |
| **Reflect** | Updates approach based on evidence | Retries the same action without a new hypothesis |

<div class="gh-callout gh-callout-blue">

**PAOR = Plan → Act → Observe → Reflect**. The **Reflect** step is the quality gate because it determines whether the next action is evidence-based.

</div>

<!-- notes
Make “reflection quality” the key idea here. Planning matters, but reflection is what separates productive iteration from blind persistence.
-->

---
class: text-xs
---

# The Ralph Loop: Internal Validation and Repair

```text
Outer loop:   Plan → Act → Observe → Reflect
                         │
                         ▼
Inner loop:   edit → run check → inspect output → patch → rerun
                         │
                         └── stop after bounded retries or escalate
```

| Signal after a change | Healthy Ralph-loop response | Warning sign |
|-----------------------|-----------------------------|--------------|
| **One focused test fails** | Patch the relevant file and rerun the same focused test | Jumps to unrelated files or broad refactors |
| **Lint/type error appears** | Fix the exact error and rerun validation | Suppresses the error without understanding it |
| **No validation exists** | Add the smallest useful check before claiming success | Declares done without evidence |
| **Repeated similar failures** | Stop, summarize blocker, and ask for guidance or narrower scope | Continues blind retries past the iteration limit |

<div class="gh-callout gh-callout-purple">

**Important**: This workshop uses **Ralph loop** as the name for the coding agent's inner validation-and-repair loop inside the broader PAOR flow.

</div>

<!-- notes
Clarify that Ralph loop is the workshop’s label for the inner repair cycle, not a product button.
-->

---
layout: section
---

# 4. Rubber Duck Cross-Model Review

<!-- notes
Position this as a workflow pattern for independent critique, not as an automated merge policy.
-->

---
class: text-xs
---

# Rubber Duck Workflow

```text
┌────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│ Model A builds │ →  │ Model B critiques  │ →  │ Human decides      │
│ or proposes    │    │ bugs / edge cases  │    │ what to keep       │
└────────────────┘    └────────────────────┘    └────────────────────┘
```

| Use it when... | Why it helps |
|----------------|--------------|
| **Logic is tricky** | Different models catch different assumptions |
| **Tests look too happy-path** | Reviewer can ask for negative and edge cases |
| **The first result feels overconfident** | A second model often surfaces missing caveats |
| **You want a fast pre-review before a human PR review** | It is cheaper than discovering issues after merge |

<!-- notes
Stress independent critique. The point is not to crown a winner but to widen the review surface before a human signs off.
-->

---
class: text-xs
---

# Example Review Outcome

| First model output | Second model review catches | Human decision |
|-------------------|-----------------------------|----------------|
| Accepts any non-empty email string | Missing trim, uppercase normalization, malformed email cases | Keep schema shape, add normalization + tests |
| Returns generic `false` | Poor error diagnostics for callers | Add structured error messages |
| Has only happy-path tests | No tests for whitespace-only name or `null` email | Add negative-path tests |

<div class="gh-callout gh-callout-purple">

**Safety practice**: Rubber duck review is a **workflow pattern**, not a product feature. One model writes, another critiques, and the human decides what survives.

</div>

<!-- notes
If time allows, narrate one small example live: generate with one model, review with another, keep only the feedback that survives scrutiny.
-->

---
layout: section
---

# 5. Single-Agent vs. Multi-Agent Patterns

<!-- notes
Shift from understanding one agent to designing an agent team. Keep the default answer conservative: use the smallest topology that works.
-->

---
class: text-xs
---

# Single-Agent vs. Multi-Agent Decision Guide

| Pattern | Best for | Strengths | Risks | Use when |
|---------|----------|-----------|-------|----------|
| **Single agent, multiple skills** | Most day-to-day coding tasks | Lower overhead, shared context, fewer handoffs | One agent may overreach or miss specialist concerns | The work fits one clear plan and one working set |
| **Multi-agent specialist team** | Complex, decomposable workflows | Parallelism, role clarity, independent review | Coordination cost, duplicated context, agent thrashing | Work naturally separates into planner / builder / validator stages |

| Question | Favor single agent if... | Favor multi-agent if... |
|---------|---------------------------|--------------------------|
| **How shared is the context?** | One repo slice or one feature area is enough | Different subproblems require different context packs |
| **Can work happen in parallel?** | No, steps are tightly coupled | Yes, independent branches can move simultaneously |
| **Do you need independent critique?** | One bounded implementation is enough | You need separate review, testing, or policy roles |
| **Is coordination expensive?** | Yes, handoffs would outweigh gains | No, the task is large enough to justify orchestration |

<!-- notes
A specialist team is not automatically more mature. It is only better when decomposition is real and coordination costs are justified.
-->

---
class: text-xs
---

# Orchestration Topologies

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

| Topology | How it works | Good fit | Failure mode |
|---------|---------------|----------|--------------|
| **Sequential** | One agent hands work to the next | Change-control pipelines, plan → build → review | Bottlenecks if one stage is weak |
| **Parallel** | Independent specialists work at the same time | API + tests + docs on a shared spec | Merge conflicts or inconsistent assumptions |
| **Hierarchical** | Lead agent decomposes and supervises sub-agents | Large initiatives with clear subdomains | Overhead and cascading coordination failures |

<div class="gh-callout gh-callout-purple">

**Did you know?** If your org enables **code scanning + Copilot Autofix**, agent-generated PRs get automated security feedback before human review — an extra safety net as autonomy scales.

</div>

<!-- notes
Keep a human at the integration boundary, especially when multiple agents contribute changes that must merge coherently.
-->

---
layout: section
---

# 6. Responsible Agent Design: Antipatterns & Safeguards

<!-- notes
This closing section is the design discipline section. The message: make failure predictable, visible, and bounded.
-->

---
class: text-xs
---

# Guardrail Checklist

| Guardrail | Why it matters | Example |
|----------|----------------|---------|
| **Success criteria** | Prevents wandering and premature "done" claims | "Add `POST /users` validation, return 400 on missing fields, add tests, run targeted suite" |
| **Scope boundary** | Limits blast radius | "Modify only `src/users/**` and `tests/users.test.ts`" |
| **Validation rule** | Requires evidence before completion | "Run targeted tests and report exact command + result" |
| **Iteration limit** | Prevents unbounded retries | "Stop after 2 repair attempts and summarize the blocker" |
| **Escalation path** | Enables safe handoff | "Ask for help if auth, secrets, or schema migrations are required" |
| **Human checkpoint** | Preserves oversight | "Do not commit or merge without reviewer approval" |

<div class="gh-callout gh-callout-purple">

**AI safety question**: If this agent fails, how does it fail safely?

</div>

<!-- notes
Treat the checklist as the minimum contract for bounded autonomy.
-->

---
class: text-xs
---

# Antipatterns 1-4 — Weak prompts vs. safer contracts

| Antipattern | Weak instruction | Safer rewrite |
|-------------|------------------|---------------|
| **Unbounded loops** | `Keep trying until it works.` | `Try at most 2 repair cycles, then stop and summarize the blocker.` |
| **Context bloat** | `#codebase Here are 30 files and the full project history.` | `#file:src/routes/users.ts #file:tests/users.test.ts Update only the related route and tests.` |
| **Poor error handling** | `If a command fails, just keep going.` | `Retry only for code-level issues; stop for auth, secrets, network, or service failures.` |
| **Inadequate validation** | `Implement the change and let me know when you're done.` | `Run focused validation and report the exact command and result before claiming success.` |

<!-- notes
These are workflow design errors, not model-magic failures. The fix is usually better scope, validation, or stop rules.
-->

---
class: text-xs
---

# Antipatterns 5-8 — Weak prompts vs. safer contracts

| Antipattern | Weak instruction | Safer rewrite |
|-------------|------------------|---------------|
| **Missing safeguards** | `Refactor anything necessary to make this better.` | `Modify only src/orders/**. Do not change infrastructure, secrets, CI, or dependency versions.` |
| **Unclear success criteria** | `Improve onboarding.` | `Add a Quick Start section, a 5-step local setup flow, and one troubleshooting section.` |
| **Agent thrashing** | `@architect @reviewer @tester @api-agent Solve this bug together.` | `Assign explicit ownership by stage: architect → api-agent → tester → reviewer.` |
| **Inefficient tool use** | `Open every file and run the full suite after each edit.` | `Search narrowly, open only relevant files, run focused checks first, then broaden validation.` |

<div class="gh-callout gh-callout-purple">

**Core lesson**: The safest agent is not the one that never fails. It is the one that fails **predictably, transparently, and within a bounded blast radius**.

</div>

<!-- notes
End the section by tying the eight antipatterns back to four levers: scope, validation, stop conditions, and role clarity.
-->

---
layout: end
class: text-sm
---

# Module 2 Recap

<v-clicks>

- Place the task on the right point of the **autonomy spectrum** before you choose the workflow.
- Read agent transcripts through **PAOR** and watch the **Ralph loop** for evidence-based retries.
- Use **rubber duck cross-model review** when the logic, risk, or edge cases matter.
- Start with the smallest topology that works: **single agent first**, multi-agent only when decomposition is real.
- Design bounded autonomy with **success criteria, guardrails, validation, and human checkpoints**.

</v-clicks>

<div class="gh-callout gh-callout-blue">

**Next up**: Module 3 goes deeper into advanced implementation patterns, evaluation, and troubleshooting.

</div>

*Slide deck for Copilot Developer Training — Module 2: Agentic Patterns*

<!-- notes
Close on supervision, not speed. The audience should trust agents more because they understand the control surfaces, not because they assume autonomy implies quality.
-->
