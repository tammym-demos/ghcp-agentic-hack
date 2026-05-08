# Module 2: Agentic Patterns — Hands-On Lab

## Overview

This standalone lab gives attendees four short exercises to practice context control, project scaffolding, tool-using agents, and the plan → act → observe → reflect loop in VS Code. Use any multi-file project for Exercise 1, then use the scaffolded Express API from Exercise 2 for Exercises 3 and 4.

- **Total time**: ~26 minutes
- **Prerequisites**:
  - Completed Module 1: Foundations
  - VS Code with GitHub Copilot and GitHub Copilot Chat installed
  - A GitHub account with Copilot access

> **Note**: If your project does not have `src/app.ts`, substitute a similar entry file such as `app.js`, `server.ts`, or `index.ts` when you use `#file` prompts.

## Exercise 1: Context Management

**⏱️ Time**: 6 min

**📋 Objective**: Compare broad workspace context with targeted file context, then start a fresh chat session to see how history resets.

1. Open any project in VS Code that has multiple files and folders.
2. In Chat, ask a broad question with full codebase context:

   ```text
   #codebase What design patterns are used in this project?
   ```

3. Review the response and notice how many files Copilot references.
4. Ask the same question again, but target a single file:

   ```text
   #file:src/app.ts What design patterns are used here?
   ```

5. Compare the two answers. The `#file` version should feel narrower, more specific, and more relevant to the file you chose.

6. **🛡️ Safety checkpoint**: In the `#codebase` response, did Copilot make any claims you can't immediately verify? Pick one claim and check it against the actual code. Broad context increases the risk of plausible-sounding but incorrect answers.

7. Click the **+** icon in Chat to start a new session.
7. In the new session, ask a simple follow-up question about the same file:

   ```text
   #file:src/app.ts Summarize what this file does.
   ```

8. Notice that the new session does not include the history from your previous chat.

**✅ Success Criteria**

- ✅ Compared a broad `#codebase` question with a targeted `#file` question
- ✅ Observed the difference in scope and relevance
- ✅ Started a fresh chat session and confirmed that prior history was not carried over
- ✅ Identified at least one claim to verify and checked it against the source

## Exercise 2: Project Bootstrap

**⏱️ Time**: 6 min

**📋 Objective**: Use Agent mode to scaffold a simple API project and review what Copilot proposes before you accept it.

1. Open a new VS Code window with no project open.
2. Open Chat and switch the mode dropdown to **Agent**.
3. Ask Copilot to scaffold a small API:

   ```text
   Create a simple Node.js Express API with a /health endpoint and a /users endpoint that returns mock data
   ```

4. Watch how Copilot proposes folders, files, package setup, and commands such as `npm init` or dependency installation.
5. Review the generated structure before accepting the changes.

6. **🛡️ Safety checkpoint**: Before accepting the scaffold, check `package.json` for unfamiliar dependencies. Would you install these in production without vetting them? (*Tip*: Dependabot can automate this check for you.)

7. If you want to compare workflows, try the workspace scaffold command in a separate chat:

   ```text
   @workspace /new Create a simple Node.js Express API with a /health endpoint and a /users endpoint that returns mock data
   ```

7. Keep this scaffolded project open for Exercises 3 and 4.

8. **PRD-quality prompt**: Now try a more structured prompt and compare the result:

   ```text
   Create a Node.js Express API with:
   - GET /health returns { status: "ok" }
   - GET /users returns a JSON array of 3 mock users (id, name, email)
   - POST /users validates name+email, returns 201 with the created user
   - Add unit tests in tests/api.test.ts using Jest
   - Use TypeScript with strict mode
   - Do NOT add authentication or database — use in-memory array
   ```

9. Compare the output from step 3 (vague prompt) with step 8 (PRD-quality prompt). Note the differences in structure, completeness, and test coverage.

**✅ Success Criteria**

- ✅ Used Agent mode to scaffold a new project
- ✅ Reviewed the generated files and structure before accepting
- ✅ Tried Agent mode or `@workspace /new` as a project bootstrap workflow
- ✅ Compared a vague prompt with a PRD-quality prompt and observed the difference in agent output
- ✅ Reviewed generated dependencies for unfamiliar or potentially risky packages

## Exercise 3: Agents & Skills

**⏱️ Time**: 7 min

**📋 Objective**: Watch Agent mode use tools, then create and invoke a custom agent.

1. In the scaffolded project, keep Chat in **Agent** mode.
2. If the project does not already contain a TODO comment, add one to any source file so the prompt has something to find:

   ```javascript
   // TODO: replace mock users with a real data store
   ```

3. Ask Copilot to find TODOs and draft issue summaries:

   ```text
   List all TODO comments in this project and create a GitHub issue summary for each
   ```

4. Watch the tool activity in Chat and note what Copilot searched, opened, and summarized.
5. Create a custom agent file at `.github/agents/reviewer.md` with the following content:

   ```markdown
   You are a code review agent. When reviewing code:
   - Check for security vulnerabilities
   - Flag missing error handling
   - Suggest performance improvements
   - Be concise and actionable
   ```

6. **🛡️ Safety checkpoint**: Review your agent's instructions. Could they be interpreted to cause overly broad actions? Good agent instructions include explicit scope boundaries ("do NOT modify files outside `src/`").

7. Invoke the custom agent against the main entry point of your project:

   ```text
   @reviewer review the main entry point of this project
   ```

7. Review the response and confirm that the custom agent follows the instructions you gave it.

**✅ Success Criteria**

- ✅ Used Agent mode on a task that required tool access
- ✅ Observed tool calls in the chat transcript
- ✅ Created `.github/agents/reviewer.md`
- ✅ Invoked `@reviewer` successfully
- ✅ Reviewed custom agent instructions for clear scope boundaries

## Exercise 4: Agentic Loops & Rubber Duck

**⏱️ Time**: 7 min

**📋 Objective**: Observe a full agentic loop, then compare implementation and review behavior across models.

1. Stay in **Agent** mode and give Copilot a multi-step task:

   ```text
   Add input validation to all API endpoints and write unit tests for the validation
   ```

2. Watch the loop as Copilot plans the task, edits files, runs tests, and responds to the results.

3. **🛡️ Safety checkpoint**: Count how many iterations the agent took. If it looped more than 2–3 times, review the final result carefully — repeated retries can indicate the agent patched symptoms rather than fixing root causes.

4. If the project passes immediately, intentionally break a test or validation rule, then ask Copilot to recover:

   ```text
   Fix the failing tests
   ```

4. For the rubber duck exercise, ask your current model to write a small helper function:

   ```text
   Write a helper function that validates a user object with name and email fields
   ```

5. Switch to a different model in Chat, then ask for a review of the generated function:

   ```text
   Review this function for bugs and edge cases
   ```

6. Compare the second model's feedback with the first model's implementation. Look for different assumptions, missed edge cases, or clearer review comments.

**✅ Success Criteria**

- ✅ Observed the plan → act → observe → reflect loop in Agent mode
- ✅ Saw Copilot recover from a failing test or broken implementation
- ✅ Switched models and used one model to review another model's output
- ✅ Compared the review feedback for bugs and edge cases
- ✅ Checked whether the agent's iteration count suggests confident resolution or repeated guessing

*Hands-on lab for Module 2: Agentic Patterns — Copilot Developer Training*
