# Module 2: Agentic Patterns — Hands-On Lab

## Overview

This lab turns the module concepts into quick reps: first you compare agentic orchestration with a direct answer, then you create layered instructions, and finally you define a lightweight custom review agent. The goal is to build intuition for where GitHub Copilot should act autonomously, where it should simply answer, and how durable instructions shape both experiences.

- **Total time**: ~15 minutes
- **Prerequisites**:
  - Completion of Module 1 lab
  - VS Code with GitHub Copilot
  - Any local project open

## Exercise 1: Agent vs. Skill — Explore the Difference

**⏱️ Time**: 5 min
**📋 Objective**: Understand the difference between an agent workflow and a direct skill invocation

1. Open any local project in VS Code and open **GitHub Copilot Chat**.
2. Switch to **Agent** mode and ask GitHub Copilot to complete a multi-step task:

   ```text
   Refactor #file for readability, add or update tests if behavior is affected, and explain the plan before making changes.
   ```

3. Watch how GitHub Copilot plans the work, reads files, makes edits, and reports back on what it changed.
4. Switch to **Ask** mode and ask a single-step question about a specific function:

   ```text
   Explain what #selection does, what inputs it expects, and what could break if I change it.
   ```

5. Compare the two experiences. Note that the agent used a multi-step workflow, while Ask mode answered directly without editing files or running commands.
6. Write down one task from your own workflow that is better for agent orchestration and one task that is better as a direct answer.

**🛡️ Safety checkpoint**: Review the agent's multi-step changes before accepting them, and inspect every file it modified instead of trusting the summary alone.

### ✅ Success Criteria

- ✅ Used **Agent** mode for a multi-step task
- ✅ Used **Ask** mode for a single-step question
- ✅ Observed the difference between planning plus execution and direct explanation
- ✅ Identified one real task from your workflow for each interaction style

## Exercise 2: Instruction Layering — Org, Repo, and File-Scoped

**⏱️ Time**: 5 min
**📋 Objective**: Create layered instructions and observe how they compose

1. If your project does not already contain `.github/copilot-instructions.md`, create it with a simple repository-wide rule:

   ```markdown
   # Repository Instructions

   - All new functions must include JSDoc comments
   - Prefer clear names over abbreviations
   ```

2. Create `.github/instructions/test.instructions.md` with a file-scoped rule:

   ```markdown
   ---
   applyTo: "**/*.test.*"
   ---

   # Test File Instructions

   - Use describe/it blocks
   - Always test edge cases
   ```

3. Open a regular source file and ask GitHub Copilot to generate a small helper:

   ```text
   Create a small helper in #file and explain which repository instructions you followed.
   ```

4. Open a matching test file and ask GitHub Copilot to generate a test:

   ```text
   Create a focused test in #file and tell me which instructions apply here.
   ```

5. Compare the two outputs and note how the more specific test instruction layers on top of the repository-wide rule.

**🛡️ Safety checkpoint**: Review instruction files before committing them. They affect collaborator experience and should contain durable guidance, not secrets or temporary preferences.

### ✅ Success Criteria

- ✅ Created a repository-level instruction file
- ✅ Created a file-scoped instruction file with `applyTo`
- ✅ Observed GitHub Copilot follow the repository-wide rule in a regular file
- ✅ Observed GitHub Copilot apply both repository-wide and test-specific guidance in a test file

## Exercise 3: Build a Custom Agent and Observe Background Execution

**⏱️ Time**: 5 min
**📋 Objective**: Create a custom agent and observe how it executes

1. Create a file at `.github/agents/reviewer.md` with review guidance like this:

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
   ```

2. In GitHub Copilot Chat, invoke the agent against a file or function:

   ```text
   @reviewer Review #file for error handling gaps, missing tests, and maintainability risks.
   ```

3. Observe the response pattern. Notice how the agent reads context, applies its instructions, and returns a structured review instead of a generic answer.
4. If your environment exposes background execution or tool steps, let the agent continue while you watch the intermediate output and note the plan → act → observe pattern in the transcript.
5. Decide whether you would use this custom agent for pre-PR review, self-review, or targeted feedback on risky files.

**🛡️ Safety checkpoint**: Custom agents inherit the permissions of the user invoking them. Keep their instructions specific, and do not design destructive behavior without clear review and confirmation steps.

### ✅ Success Criteria

- ✅ Created a custom review agent file
- ✅ Invoked the agent in chat
- ✅ Observed structured output guided by the agent instructions
- ✅ Reflected on where a custom review agent fits in your workflow

## Exercise 4: Token Economics — Understanding Cost and Session Hygiene

**⏱️ Time**: 5 min
**📋 Objective**: Understand input/output/cached tokens, choose the right model, and practice session hygiene

1. Open GitHub Copilot Chat and start a **new session** (use `/clear` or open a fresh chat).
2. Before prompting, think about token anatomy:
   - **Input tokens**: Everything you send (system prompt + instructions + conversation history + attached files)
   - **Output tokens**: What the model generates (2–4× more expensive than input)
   - **Cached tokens**: Stable prefixes (instruction files, system prompt) that get discounted on repeat turns

3. Switch to a **reasoning model** (Claude Opus or similar) and ask an architecture-level question:

   ```text
   Analyze this repository's structure and suggest three improvements for testability. Explain the trade-offs of each suggestion.
   ```

4. Note the quality and depth of the response.
5. Now switch to a **low-tier model** (GPT-mini or Haiku) and ask the same question. Compare the output quality.
6. Try a **task split** approach — start with research, then plan:

   ```text
   Step 1: What files in this project handle user input validation?
   ```

7. Use `/clear` to start a fresh session, then use the research results to write a precise implementation prompt:

   ```text
   In #file, add input validation for the email field using a regex pattern. Stop when the existing tests still pass.
   ```

8. Reflect on token economics:
   - The fresh session eliminated accumulated input tokens from prior turns
   - The precise prompt with `#file` and a stop signal reduces both input context and output verbosity
   - Instruction files benefit from caching — they cost almost nothing after the first turn in a session

**🛡️ Safety checkpoint**: Model selection is about matching capability to task — not about denying the model information it needs. If a cheaper model produces incorrect output, escalate to a higher tier rather than accepting low-quality results.

### ✅ Success Criteria

- ✅ Can explain the difference between input, output, and cached tokens
- ✅ Compared output quality between a reasoning model and a low-tier model on the same prompt
- ✅ Used `/clear` to start a fresh session before a new task
- ✅ Wrote a precise prompt with file references and a stop signal
- ✅ Observed the quality difference between a long-context session and a fresh one

*Hands-on lab for Module 2: Agentic Patterns — GitHub Copilot Developer Training*
