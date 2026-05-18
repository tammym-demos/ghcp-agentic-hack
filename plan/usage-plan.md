# Integration Plan: Agent Quality & Token Optimization Section

## Source Material

Reference presentation by David (GitHub) — "Agent Quality & Token Optimization" (~60 min). Key thesis: **focusing on agent quality is the better lever for token optimization**, because improving output quality naturally reduces wasted tokens through fewer agent misses, retries, and off-track sessions.

---

## Proposed Section

**Title**: "Agent Quality & Token Optimization" (or "Optimization and Usage")
**Target Module**: `copilot-dev-agentic` (Module 2: Agentic Patterns)
**Suggested Placement**: New Section 8 (before current wrap-up), or as a new Section 7 displacing "Rubber Duck" to Section 8

### Rationale for Placement

The agentic module already covers agents, skills, instruction layering, and multi-agent patterns — all of which feed directly into the optimization strategies. This section serves as the "now that you know how agents work, here's how to use them *efficiently*" capstone before wrap-up.

---

## Content Outline (from transcript key concepts)

### Part 1: Why Quality Over Cost (5 min)

**Key Message**: "Don't count tokens — make every token count."

- The rocket analogy: current state is "firing many agents roughly at the target"
- Usage-based billing shifts responsibility — optimization now matters
- ROI formula for agents: if value = 0, no amount of cost reduction helps
- The **compounding error problem**: even 99% single-step accuracy → ~60% over 50 steps; 95% → only 8%
- Every agent miss = wasted tokens (thrown away work, fix sessions, review cycles)

### Part 2: Foundations — How Tokens & Context Work (10 min)

**Key Message**: "Provide as little context as possible, but as much as required."

- LLMs are word probability machines — more irrelevant context shifts probabilities away from desired output
- Agents are deterministic code (the harness) + non-deterministic LLM — the harness loops until task complete
- Context windows are **stateless** — entire history re-sent every loop; tokens accumulate
- Input tokens vs. output tokens (output costs more — requires compute)
- **Context rot** phenomena:
  - **Lost in the middle** effect (~50% fill): model biases beginning and end, forgets middle
  - **Recency bias** (~60-70% fill): model forgets system prompt, custom instructions, original goal
- Practical implication: start new sessions for new tasks; don't stack tasks in one session

### Part 3: Practical Controls (Ordered by Impact) (15 min)

**Key Message**: "The maturity spectrum determines which optimizations matter for you."

#### Tier 1 — Everyone Should Do These

1. **Aware model choices**
   - Reasoning models (Opus, o-series) for: planning, architecture, debugging
   - Mid-tier models (Sonnet, GPT-4.5) for: implementation with a clear spec
   - Low-tier models (Haiku, GPT-mini) for: simple edits, typo fixes, formatting
   - Use **auto mode** as default — it does intent detection and selects model
   - Price difference: up to 24× between highest and lowest tier

2. **Provide only relevant context**
   - Context engineering as a developer skill
   - Use `/clear` (or new session) for every new task
   - Compaction can help but risks losing relevant info

#### Tier 2 — Structured Workflows

3. **Precise prompts with stop signals**
   - Be specific: not "fix bug" but "Issue #45 describes X, I suspect it's in Y, stop when tests pass"
   - Include file references you already know
   - Add explicit stop conditions to prevent agent over-execution

4. **Split tasks: Research → Plan → Implement**
   - Research phase: use cheaper models, broad context is OK
   - Planning phase: use reasoning models, aim for airtight spec
   - Implementation phase: use mid/low-tier models, follow the spec
   - Parallelization: split by concern (frontend/backend/database)

5. **Deterministic controls (tests, linters, scanners)**
   - Tests as guardrails bring agent accuracy back to 99% after a miss
   - A failed test costs less than a shipped bug + incident + debug session
   - Reference: Copilot CLI team's codebase is 50%+ tests

#### Tier 3 — Agent Configuration

6. **Persistent instructions (copilot-instructions.md)**
   - Keep small, precise — non-negotiables only
   - Use as "agent miss log" — recurring failures become instructions
   - "Be concise" trims output tokens
   - **Don't use AI to generate them** — they should capture what AI *can't* figure out
   - Treat as living document; recreate every ~3 months
   - Choose copilot-instructions.md OR AGENTS.md, not both

7. **Custom agents (prompt files with persona)**
   - Bias agent toward specific behavior (e.g., TDD-red agent)
   - Can restrict available tools to prevent off-track actions
   - Use sparingly — each is a maintenance burden
   - Manual invocation (slash commands)

8. **Skills (conditional context)**
   - Only loaded when LLM determines relevance (vs. always-on instructions)
   - Move conditional instructions OUT of copilot-instructions.md INTO skills
   - Don't create skills for well-known frameworks (React is 80% of training data)

9. **MCP servers (external tool integration)**
   - Be rigorous — only activate servers you regularly use
   - Too many tools = agent goes off-track (Playwright example: unnecessary screenshots)
   - Pair with custom agents for controlled activation

10. **Sub-agents (secondary context windows)**
    - Research in a sub-context → only summary returns to main session
    - Avoids polluting main context with discovery tokens
    - Trade-off: duplicate system/tool tokens, but saves on quality

#### Tier 4 — Power User (Conditional)

- Think in code: write scripts to filter data before feeding to agent
- CLI vs. MCP trade-offs (CLI may already be in training data)
- Shell output trimming (ripgrep-like tools)
- `/chronicle` for self-improvement recommendations
- Collapse tool calls (batch reads)
- Model-specific context optimization (temporary — models evolve)

### Part 4: Developer Skills for the AI Era (5 min)

- Build **analytical skills**: translate domain to precise technical prompts
- **Architecture matters more than ever**: DDD, hexagonal, CQRS give agents clear boundaries
- **Become a context engineer**: iterate on prompts and configs, treat agent misses like incidents

### Closing: Top 5 Actions (Summary Slide)

1. Choose the right model for the task
2. Provide clear guidance in prompts (precise, scoped, with stop signals)
3. Split and conquer tasks (research → plan → implement)
4. Use deterministic guardrails (tests, linters, scanners)
5. Maintain concise, human-written instructions.md

---

## Files to Create/Modify

| File | Action | Notes |
|------|--------|-------|
| `workshops/copilot-dev-agentic/copilot-dev-agentic-workshop.md` | **Edit** | Add new section ~35 min; update agenda table; adjust total duration to ~120 min |
| `workshops/copilot-dev-agentic/copilot-dev-agentic.slidev.md` | **Edit** | Add slides for the new section (must stay in sync with workshop) |
| `workshops/copilot-dev-agentic/copilot-dev-agentic-LAB.md` | **Edit** | Add exercise: "Optimize an agent session" or "Compare model selection impact" |
| `workshops/copilot-dev-agentic/copilot-dev-agentic-QUIZ.md` | **Edit** | Add 3-5 quiz questions covering token optimization concepts |

---

## Schedule Impact & Approach

### Current 6-Hour Day

| Time | Duration | Module |
|------|----------|--------|
| 9:00–10:30 | 90 min | Module 1: Foundations |
| 10:30–12:00 | 90 min | Module 2: Agentic Patterns |
| 12:00–12:30 | 30 min | 🍽️ Lunch |
| 12:30–2:00 | 90 min | Module 3: Advanced Topics |
| 2:00–2:15 | 15 min | Module 4: ADO Integration |
| 2:15–3:00 | 45 min | Hack / Open Lab |

### Problem

Adding ~35 min of new content to Module 2 overflows its 90-min slot, cascading delays through the rest of the day (+35 min total).

### Solution: Fold "Context Window Management" Into the New Section

Module 2's existing "Context Window Management" section (slides 3–7, ~14 min) covers context composition, limits, and best practices — **this is the same topic** as Part 2 of the optimization content. Rather than teaching context twice, merge them:

- **Remove**: Current "Context Window Management" section from Module 2 (saves ~14 min)
- **Replace with**: The richer "Foundations — How Tokens & Context Work" from the optimization content (10 min) — which covers the same ground plus context rot, lost-in-the-middle, and recency bias
- **Net add to Module 2**: ~25 min (35 min new − 14 min removed + 4 min of lab time reallocation)

### Revised Module 2 Structure (~100 min)

| # | Section | Time |
|---|---------|------|
| 1 | Cover + Agenda | 2 min |
| 2 | Starting a Project with Copilot (init, coding agent) | 10 min |
| 3 | Agents & Skills (built-in vs custom, routing) | 15 min |
| 4 | Agentic Loops (plan-act-observe-reflect, rubber duck) | 13 min |
| 5 | ☕ Micro-break | 2 min |
| 6 | **Agent Quality & Token Optimization** _(NEW)_ | 35 min |
| | — Why Quality > Cost (5 min) | |
| | — Tokens & Context Foundations (10 min) | |
| | — Practical Controls by Tier (15 min) | |
| | — Developer Skills Outlook + Top 5 (5 min) | |
| 7 | Lab exercises (4 exercises) | 21 min |
| 8 | Recap + hand-off | 2 min |
| | **Total** | **~100 min** |

### Updated Day Schedule

| Time | Duration | Module |
|------|----------|--------|
| 9:00–10:30 | 90 min | Module 1: Foundations |
| 10:30–12:10 | **100 min** | Module 2: Agentic Patterns _(+10 min)_ |
| 12:10–12:40 | 30 min | 🍽️ Lunch |
| 12:40–2:10 | 90 min | Module 3: Advanced Topics |
| 2:10–2:25 | 15 min | Module 4: ADO Integration |
| 2:25–3:00 | 35 min | Hack / Open Lab _(−10 min)_ |

**Net impact**: +10 min to the instructional day, absorbed by trimming open hack from 45 → 35 min. All other modules unchanged. End time remains 3:00 PM.

> **Note**: Module 1 already covers basic "Models & Tokens" (slides 18–22). The optimization section builds on that foundation with agent-specific strategies — no duplication.

---

## Key Diagrams Needed

1. **Compounding error chart**: Single-step accuracy (99%, 95%) vs. multi-step workflow success
2. **Context window anatomy**: System prompt → tools → instructions → conversation history → new prompt/response
3. **Research → Plan → Implement** workflow with model tiers
4. **ROI formula**: Value of agent output / Token cost = Return on investment

---

## Open Questions

- Should the "Foundations" portion (LLMs as probability machines, context windows) be trimmed since Module 1 may already cover some of this?
- Does the team want to include specific GitHub usage/billing dashboard screenshots?
- Should "deterministic controls" get its own demo (running tests and showing agent self-correction)?
