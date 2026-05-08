# Module 2: Agentic Patterns — Hands-On Lab

## Overview

This standalone lab reinforces the six workshop sections in the same order as the workshop guide. The goal is not to maximize autonomy; it is to practice **bounded autonomy**, observe the **PAOR** loop in action, and design safer agent workflows.

- **Total time**: ~26 minutes
- **Prerequisites**:
  - Completed Module 1: Foundations
  - VS Code with GitHub Copilot and agents enabled
  - A small multi-file project where you can safely edit code and run tests

> **Note**: In VS Code today, the lower-autonomy chat layer is typically surfaced as **Ask** and **Plan**. This lab groups both under **chat** because the key distinction is whether Copilot is primarily advising or autonomously acting.

## 1. Autonomy Spectrum & Human Checkpoints

**⏱️ Time**: 4 min

**📋 Objective**: Take one task across the autonomy spectrum and name the human checkpoint that should stay in the loop at each level.

1. Choose one small task such as "Add validation to `POST /users`."
2. In **Ask** or **Plan**, request guidance only:

   ```text
   Propose a validation strategy for POST /users in this codebase. Include error cases and test ideas.
   ```

3. In **Agent**, request implementation with explicit boundaries:

   ```text
   Add validation to POST /users, add targeted tests, and stop if you need to change files outside src/users.
   ```

4. Draft the issue text you would hand to the cloud coding agent:

   ```text
   Add validation to POST /users. Return 400 for missing name/email, preserve existing success behavior, add tests in tests/users.test.ts, and do not modify auth or database code.
   ```

5. For each step above, write down the human checkpoint:
   - completions → accept or reject the edit
   - chat / Ask / Plan → review the advice before acting
   - Agent → review the plan, commands, diff, and test output
   - coding agent → review the issue quality, PR diff, checks, and merge decision

6. **🛡️ Safety checkpoint**: As autonomy increases, so does the blast radius of mistakes. Before accepting Agent-mode output, always check the diff and test results. For coding-agent PRs, treat human review the same way you would review a junior developer's first PR.

**✅ Success Criteria**

- ✅ Compared the same task across chat, Agent, and coding-agent issue framing
- ✅ Identified the human checkpoint that belongs at each level of autonomy
- ✅ Noted how scope and approval requirements increase with autonomy
- ✅ Reviewed agent output against the diff before accepting

## 2. Agentic Loop Definition & Architecture

**⏱️ Time**: 4 min

**📋 Objective**: Watch a real agent loop and identify the five architecture components: goal, context, tools, validation, and stop conditions.

1. In **Agent**, run a small task with explicit boundaries:

   ```text
   Add request validation to POST /orders, add focused tests, and summarize any assumptions before you finish.
   ```

2. As the agent works, label the session output with these five elements:
   - **Goal definition**
   - **Context pack**
   - **Tool layer**
   - **Observation layer**
   - **Guardrails / stop conditions**
3. Write one sentence on which part of the loop felt weakest in your environment: context, tools, validation, or reflection.

4. **🛡️ Safety checkpoint**: Did the agent access files or run commands you didn't expect? Unexpected tool usage is a signal that the goal definition or guardrails need tightening.

> **Important**: If the agent proposes broad edits, unrelated file changes, or ambiguous validation, pause and tighten the goal before letting it continue.

**✅ Success Criteria**

- ✅ Observed an agentic loop operating on a real multi-step task
- ✅ Identified the loop's goal, context, tools, observations, and guardrails
- ✅ Named the weakest part of the loop in your environment
- ✅ Checked for unexpected tool usage or file access

## 3. PAOR Cycle & Ralph Loop Deep Dive

**⏱️ Time**: 6 min

**📋 Objective**: Distinguish the outer **PAOR** loop from the inner **Ralph loop** and decide whether retries are productive or just thrashing.

1. Run a task that is likely to require at least one correction:

   ```text
   Add email validation to the signup flow, include tests for invalid format, and stop if a database migration is required.
   ```

2. In the transcript, label each visible step as:
   - **Plan**
   - **Act**
   - **Observe**
   - **Reflect**
3. Then identify any inner repair cycle where the agent:
   - edits code
   - runs a check
   - inspects output
   - patches the result
   - reruns validation
4. Count the number of repair attempts.

> **Note**: This lab uses **Ralph loop** as the name for the coding agent's inner validation-and-repair cycle inside the broader PAOR flow.

5. Decide whether the retries were healthy or unhealthy:
   - **Healthy**: each retry used new evidence
   - **Unhealthy**: the agent repeated the same action without a new hypothesis

6. **🛡️ Safety checkpoint**: If the agent looped more than 2–3 times, review the final result carefully. Self-correction does not guarantee correctness — repeated retries can mask a deeper design flaw rather than fixing the root cause.

**✅ Success Criteria**

- ✅ Labeled the outer loop as **Plan → Act → Observe → Reflect**
- ✅ Identified at least one inner validation-and-repair cycle
- ✅ Judged whether the retries were evidence-based or signs of thrashing
- ✅ Checked whether the agent's iteration count suggests confident resolution or repeated guessing

## 4. Rubber Duck Cross-Model Review

**⏱️ Time**: 4 min

**📋 Objective**: Use one model to build and a different model to critique the result before you trust it.

1. In your current model, ask for a small helper:

   ```text
   Write a helper function that validates a user object with name and email fields.
   ```

2. Switch to a different model in Copilot Chat.
3. Ask the second model to critique the first result:

   ```text
   Review this helper for bugs, edge cases, unsafe assumptions, and missing tests. Focus on normalization, empty strings, malformed email input, and error reporting.
   ```

4. Compare the two outputs and keep only the feedback that survives human review.

5. **🛡️ Safety checkpoint**: Over-trust in a confident-sounding response is the most common AI safety risk. Did the first model produce any logic that *sounded* right but the second model flagged? This is why cross-model review catches hallucinated assumptions a single model wouldn't question.

**✅ Success Criteria**

- ✅ Used one model to generate and a different model to review
- ✅ Identified at least one edge case, assumption, or missing test the first pass missed
- ✅ Applied human judgment instead of auto-accepting the second model's critique
- ✅ Noticed whether the first model's output sounded more confident than it deserved

## 5. Single-Agent vs. Multi-Agent Patterns

**⏱️ Time**: 4 min

**📋 Objective**: Choose the smallest orchestration topology that fits the task.

1. For each scenario below, pick **single agent**, **sequential**, **parallel**, or **hierarchical**:
   - Rename one API field across two files
   - Add a feature plus tests plus documentation
   - Refactor three services with shared interface contracts
2. For each choice, write one sentence explaining why you did **not** choose a more complex topology.
3. If you chose a multi-agent pattern, identify where the **human integration checkpoint** should sit.

4. **🛡️ Safety checkpoint**: Each agent you add is a new tool-access surface and a new trust boundary. For your multi-agent scenario, could you reduce any agent's scope without losing functionality? Least privilege applies to AI agents too.

> **Important**: Use multi-agent topologies only when the decomposition is real. More agents add coordination cost, context handoffs, and failure surfaces.

**✅ Success Criteria**

- ✅ Chose a topology for each scenario
- ✅ Justified why a simpler or more complex topology was appropriate
- ✅ Named the human checkpoint for any multi-agent design
- ✅ Evaluated whether each agent has the narrowest scope needed

## 6. Responsible Agent Design: Antipatterns & Safeguards

**⏱️ Time**: 4 min

**📋 Objective**: Rewrite a weak prompt into a responsible agent contract and map the rewrite to the workshop's eight antipatterns.

1. Start with the weak prompt:

   ```text
   Fix the user API and make the tests better.
   ```

2. Rewrite it into a safer contract:

   ```text
   Update POST /users in src/routes/users.ts to validate missing name and email.
   Add focused tests in tests/users.test.ts for both failure cases.
   Run the targeted user test suite and report the exact command and result.
   Do not modify auth, database, or CI files.
   Stop after 2 repair attempts or if a schema migration is required.
   ```

3. Use the workshop's antipattern list to name which problems your rewrite fixes:
   - unbounded loops
   - context bloat
   - poor error handling
   - inadequate validation
   - missing safeguards
   - unclear success criteria
   - agent thrashing
   - inefficient tool use
4. If time allows, add one more line that creates an explicit **human checkpoint** before commit or merge.

5. **🛡️ Safety checkpoint**: Your rewritten contract is also a safety contract. Ask yourself: if this agent fails, *how* does it fail? Confirm your contract includes a stop condition and escalation path so failures are visible, bounded, and recoverable. (*Bonus*: if your org uses **GitHub code scanning + Copilot Autofix**, agent-generated PRs get automated security feedback too.)

**✅ Success Criteria**

- ✅ Rewrote the weak prompt into a bounded agent contract
- ✅ Mapped the rewrite to at least three antipatterns from the workshop
- ✅ Added validation, scope boundaries, and a stop condition
- ✅ Confirmed the contract makes failure predictable and bounded

*Hands-on lab for Module 2: Agentic Patterns — Copilot Developer Training*
