# Module 2: Agentic Patterns — Hands-On Lab

## Overview

This lab builds directly on the project and artifacts you created in Module 1. You will use your existing instruction files, custom agent, and reusable prompt as the foundation for exploring agentic workflows, multi-agent handoffs, instruction layering conflicts, and token optimization. Every exercise includes a step to review context window and token usage so you develop the habit of monitoring cost alongside quality.

- **Total time**: ~20 minutes
- **Prerequisites**:
  - Completion of Module 1 lab (you should already have `.github/copilot-instructions.md`, `.github/instructions/tests.instructions.md`, `.github/agents/refactor-coach.agent.md`, and `.github/prompts/refactor-checklist.prompt.md` in your project)
  - VS Code with GitHub Copilot and GitHub Copilot Chat enabled
  - The same local project you used in Module 1

## Exercise 1: Agent vs. Skill — Using Your Existing Agent

**⏱️ Time**: 5 min
**📋 Objective**: Compare an agentic workflow with a direct answer using the custom agent you built in Module 1, then review context window usage

1. Open the same project you used in Module 1 and open **GitHub Copilot Chat**.
2. Switch to your **refactor-coach** agent (select it from the mode picker or type `@refactor-coach`) and give it a multi-step task on a file you know well:

   ```text
   Review #file for readability issues, propose improvements, and explain the plan before making changes.
   ```

3. Watch the agent plan, read files, and produce structured output guided by the instructions you wrote in Module 1.
4. Now switch to **Ask** mode and ask a single-step question about the same file:

   ```text
   Explain what #selection does, what inputs it expects, and what could break if I change it.
   ```

5. Compare the two experiences:
   - The agent used a multi-step workflow with tool calls; Ask mode answered directly
   - The agent consumed more context (instruction file + tool descriptions + intermediate results)

6. **Review context usage**: Open the **Output** panel (View > Output) and select **GitHub Copilot Chat** from the dropdown. Look for the request size or token indicators. Note how the agent session used more input tokens than the direct answer.

**🛡️ Safety checkpoint**: Review the agent's proposed changes before accepting them. The refactor-coach has edit permissions — inspect every modified file instead of trusting the summary alone.

### ✅ Success Criteria

- ✅ Invoked the `refactor-coach` agent you created in Module 1
- ✅ Used **Ask** mode for a single-step question on the same file
- ✅ Observed the difference in planning, tool use, and context consumption
- ✅ Checked the Output panel to compare token usage between the two interactions

## Exercise 2: Extend Your Agent Set — Add a Reviewer

**⏱️ Time**: 5 min
**📋 Objective**: Create a second agent that complements the refactor-coach, invoke it as a multi-agent handoff, and compare token usage

1. You already have `.github/agents/refactor-coach.agent.md` from Module 1. Now create a complementary agent at `.github/agents/reviewer.md`:

   ```markdown
   ---
   description: Review code for error handling, test coverage, and maintainability
   tools: ['codebase', 'search']
   ---

   You are a code review agent for this repository.

   - Check for missing error handling
   - Check whether changed behavior should add or update tests
   - Suggest small, actionable improvements
   - Keep the review structured and concise
   - Do not make edits — only report findings
   ```

2. Notice the difference in design: the reviewer has **no edit tools** and instructions to only report findings. This is intentional — it creates a natural handoff boundary.

3. Invoke the reviewer against the same file or function that the refactor-coach just analyzed:

   ```text
   @reviewer Review #file for error handling gaps, missing tests, and maintainability risks.
   ```

4. Compare the two agent responses:
   - `refactor-coach` planned and offered edits (broader tool set, more output tokens)
   - `reviewer` analyzed and reported without editing (narrower tools, more concise)

5. **Review token usage**: Check the Output panel again. Note how the reviewer's narrower tool set and "do not make edits" instruction produced a shorter, cheaper response. Fewer tools in the agent definition means fewer tool descriptions sent as input tokens.

6. Reflect on the multi-agent pattern: one agent writes, another reviews. This separation makes each agent's output easier to trust and cheaper to run.

**🛡️ Safety checkpoint**: Custom agents inherit the permissions of the user invoking them. The reviewer is deliberately read-only — keep destructive capabilities out of agents that should only observe.

### ✅ Success Criteria

- ✅ Created a `reviewer.md` agent alongside the existing `refactor-coach`
- ✅ Invoked both agents on the same code
- ✅ Observed the difference in output style, length, and token cost
- ✅ Understood how tool set size affects input token consumption
- ✅ Identified the multi-agent handoff pattern (write → review)

## Exercise 3: Instruction Conflict — Observing Layer Precedence

**⏱️ Time**: 5 min
**📋 Objective**: Use your existing instruction files to demonstrate how layers compose and which layer wins on conflict

1. You already have these files from Module 1:
   - `.github/copilot-instructions.md` — repo-wide rule: "Prefer early returns over deeply nested conditionals"
   - `.github/instructions/tests.instructions.md` — file-scoped rule for test files

2. Now add a **conflicting** file-scoped instruction. Create `.github/instructions/legacy.instructions.md`:

   ```markdown
   ---
   applyTo: "**/legacy/**"
   ---

   # Legacy Code Instructions

   - Do NOT refactor for early returns — preserve existing control flow
   - Match the surrounding code style even if it contradicts repo-wide guidance
   - Add inline comments explaining complex logic instead of restructuring
   ```

3. Open a file that matches the `legacy/` path (create a simple `legacy/example.ts` if needed) and ask:

   ```text
   Improve error handling in #file and explain which instructions guided your approach.
   ```

4. Open a regular (non-legacy) file and ask the same question. Compare:
   - In the legacy file, the file-scoped instruction should override the repo-wide "early returns" rule
   - In the regular file, the repo-wide rule applies normally

5. **Inspect the context**: Open the **Output** panel > **GitHub Copilot Chat** and look for references to instruction files in the request payload. Note which instructions were included for each file — this shows you exactly what context Copilot received.

6. Clean up: delete the `legacy.instructions.md` file if you do not want it persisting. The point was to observe precedence, not to keep conflicting rules.

**🛡️ Safety checkpoint**: Conflicting instructions can produce unpredictable output. In production, resolve conflicts explicitly rather than relying on implicit precedence. Review instruction files before committing — they affect every collaborator's experience.

### ✅ Success Criteria

- ✅ Used existing instruction files from Module 1 (did not recreate them)
- ✅ Created a conflicting file-scoped instruction to test precedence
- ✅ Observed that the more specific instruction won for the matching file pattern
- ✅ Inspected the Output panel to see which instructions were sent as context
- ✅ Understood that layer precedence is deterministic, not random

## Exercise 4: Token Economics — Context Review and Session Hygiene

**⏱️ Time**: 5 min
**📋 Objective**: Measure context window usage, compare narrow vs. broad context, and practice session hygiene

1. Open GitHub Copilot Chat and start a **new session** (click `+` or use `/clear`).

2. Ask an architecture question using **broad context**:

   ```text
   @workspace Analyze this project's structure and suggest three improvements for testability.
   ```

3. **Check token usage**: Open the Output panel > GitHub Copilot Chat. Note the request size — `@workspace` attached many files as context.

4. Now start a **fresh session** and ask the same question with **narrow context**:

   ```text
   Based on #file and the test files in this folder, suggest one improvement for testability.
   ```

5. Compare the two:
   - The `@workspace` version sent significantly more input tokens
   - The `#file` version was cheaper and often produces a more focused answer

6. **Model comparison**: Switch to a reasoning model (Claude Opus or similar) and ask:

   ```text
   What is the most important architectural risk in #file and how would you mitigate it?
   ```

7. Switch to a smaller model (GPT-mini or Haiku) and ask the same question. Compare quality, depth, and response length (output tokens).

8. **Session hygiene demonstration**: Without clearing, ask an unrelated question in the same session:

   ```text
   What testing framework does this project use?
   ```

9. Note how the accumulated context from prior turns may affect the response. Now use `/clear` and ask again — compare the freshness and accuracy of the answer.

10. **Caching observation**: In your fresh session, ask two questions back-to-back. Note that instruction files (`.github/copilot-instructions.md`) are included in both requests but benefit from caching — the stable prefix is discounted after the first turn.

**🛡️ Safety checkpoint**: Token optimization is about curating the right context, not starving the model. If a cheaper model produces incorrect output, escalate to a higher tier rather than accepting low-quality results. Never sacrifice correctness for cost savings.

### ✅ Success Criteria

- ✅ Compared `@workspace` (broad) vs. `#file` (narrow) context and noted the token difference
- ✅ Compared output quality between a reasoning model and a smaller model
- ✅ Used `/clear` to start a fresh session and observed improved focus
- ✅ Checked the Output panel for token usage indicators at least twice
- ✅ Understood that instruction files benefit from caching across turns

*Hands-on lab for Module 2: Agentic Patterns — GitHub Copilot Developer Training*
