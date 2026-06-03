# Module 1: Foundations — Hands-On Lab

## Overview

This short lab mirrors the workshop flow: first you practice choosing the right GitHub Copilot interaction mode, then you shape output with instructions and scoped context, and finally you compare models while trying a lightweight customization workflow. The goal is to build confidence with safe, repeatable habits rather than to complete a large coding task.

- **Total time**: ~15 minutes
- **Prerequisites**:
  - VS Code installed
  - GitHub Copilot extension installed and signed in
  - GitHub Copilot CLI installed
  - Any local project open in VS Code

## Exercise 1: Copilot Interaction Modes — Completions, Inline Chat, Modes, and CLI

**⏱️ Time**: 5 min
**📋 Objective**: Experience code completions, inline chat, chat modes, slash commands, and the CLI

1. Open any multi-file project in VS Code and open a source file.
2. Try **code completions** — type a descriptive function signature or comment and pause to see ghost text appear:
   - Accept a suggestion with `Tab`
   - Dismiss with `Esc`
   - Try **partial accept** with `Ctrl+→` (Cmd+→ on macOS) to take one word at a time

3. Try **Inline Chat** — select a block of code and press `Ctrl+I` (Cmd+I on macOS):

   ```text
   Add input validation and return early if the argument is invalid.
   ```

   - Review the inline diff, then accept or reject it

4. Open **GitHub Copilot Chat** and switch to **Ask** mode:

   ```text
   @workspace Summarize how this project is organized and explain what #file is responsible for.
   ```

5. Switch to **Plan** mode and ask GitHub Copilot to propose a safe change without editing files:

   ```text
   Plan a small improvement to #file. Include risks, affected files, and how you would verify the change.
   ```

6. Switch to **Agent** mode and give GitHub Copilot a small, reversible task such as renaming a variable, clarifying a comment, or improving a README section:

   ```text
   Improve #selection for readability, explain the proposed change first, and keep the edit limited to this file.
   ```

7. While still in chat, try a slash command:

   ```text
   /explain #selection
   ```

8. In the terminal, start GitHub Copilot CLI and inspect available commands:

   ```powershell
   copilot
   /help
   ```

9. Exit the interactive session, then try a direct prompt:

   ```powershell
   copilot -p "Give me an overview of this project."
   ```

10. **Session hygiene practice**: Start a brand-new chat session (click the `+` icon or use the new session shortcut). Notice how the fresh session has no stale context — this is the habit to build for every new task.

**🛡️ Safety checkpoint**: Review any agent-generated edits before accepting them. Do not assume an inline completion, inline chat diff, or CLI response is correct without checking it against the codebase.

### ✅ Success Criteria

- ✅ Accepted (or partially accepted) at least one code completion
- ✅ Used **Inline Chat** (`Ctrl+I`) to make a targeted edit and reviewed the diff
- ✅ Used **Ask**, **Plan**, and **Agent** mode at least once
- ✅ Used at least one slash command
- ✅ Used at least one chat variable or participant such as `#file`, `#selection`, or `@workspace`
- ✅ Ran at least one GitHub Copilot CLI command
- ✅ Started a fresh session to practice session hygiene

## Exercise 2: Memory, Context & Instructions

**⏱️ Time**: 5 min
**📋 Objective**: Use Copilot Memory, create instruction files, and see how they affect GitHub Copilot behavior

1. Open GitHub Copilot Chat and tell it a preference conversationally:

   ```text
   Remember: I prefer early returns over nested if-else in this project.
   ```

2. Confirm Copilot acknowledges the memory, then start a new chat session and ask it to generate code:

   ```text
   Generate a validation function in #file.
   ```

3. Check whether the output reflects your stored preference (early returns). Then visit **GitHub Settings > Copilot > Memory** to see the stored entry.

4. In your project, create `.github/copilot-instructions.md` with a simple repository-wide rule set:

   ```markdown
   # Repository Instructions

   - Always use TypeScript strict mode for new TypeScript code
   - Prefer early returns over deeply nested conditionals
   - Add or update tests when behavior changes
   ```

5. Open a file where GitHub Copilot can generate or revise code, then ask (notice the explicit stop signal at the end):

   ```text
   Generate a small helper in #file and explain which repository instructions you followed. Stop after creating the one helper — do not refactor or modify other functions in this file.
   ```

6. Create a scoped instruction file at `.github/instructions/tests.instructions.md`:

   ```markdown
   ---
   applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx}"
   ---

   # Test File Instructions

   - Use Arrange-Act-Assert structure
   - Prefer descriptive test names
   - Avoid live network calls in unit tests
   ```

7. Open a matching test file and ask GitHub Copilot to create or revise a test:

   ```text
   Create a focused unit test in #file and tell me which scoped instructions apply here.
   ```

8. Compare the response you got in a regular source file with the one you got in a test file, and note how the scoped instruction changes the output.

**🛡️ Safety checkpoint**: Review what context you are sharing. Memory stores preferences that persist across sessions — delete anything you did not intend to keep via Settings > Copilot > Memory. Instruction files become visible to collaborators and should contain durable project guidance, not secrets or sensitive data.

### ✅ Success Criteria

- ✅ Stored a preference using Copilot Memory and confirmed recall in a new session
- ✅ Viewed stored memories in GitHub Settings
- ✅ Created a repository-level instruction file
- ✅ Created a file-scoped instruction file using `applyTo`
- ✅ Observed GitHub Copilot referencing or following those instructions
- ✅ Compared behavior between a general source file and a matching scoped file

## Exercise 3: Models, Agents & Custom Prompt

**⏱️ Time**: 5 min
**📋 Objective**: Switch models, create a custom agent, and use a reusable prompt

1. In GitHub Copilot Chat, switch to a different available model and ask the same question twice so you can compare depth, style, and speed:

   ```text
   Compare two safe ways to improve #file and recommend one based on maintainability and test impact.
   ```

2. Create a simple custom agent file at `.github/agents/refactor-coach.agent.md`:

   ```yaml
   ---
   tools: ['codebase', 'search', 'editFiles']
   description: Help implement small, low-risk refactors with explanations
   model: Claude Sonnet 4
   ---

   You are a careful refactoring partner for this repository.

   - Explain the plan before editing files
   - Keep changes limited to the active task
   - Prefer small, reversible edits
   ```

3. If your VS Code setup shows custom agents in the mode picker, select the new agent and give it a small task in the current file.
4. Create a reusable prompt at `.github/prompts/refactor-checklist.prompt.md`:

   ```yaml
   ---
   mode: 'agent'
   description: 'Review the active file, propose a safe refactor, and suggest validation steps'
   tools: ['codebase', 'search', 'editFiles']
   ---

   # Safe Refactor Checklist

   ## Objective
   Improve the active file without changing intended behavior.

   ## Requirements
   - Explain the current structure first
   - Suggest the smallest useful improvement
   - Call out risks and recommended tests
   ```

5. Run the reusable prompt and compare that experience with the custom agent workflow.
6. **Token reflection**: Compare the response length and detail between the two models you tried. The longer response consumed more output tokens — consider whether the extra detail was worth the cost for your task.

**🛡️ Safety checkpoint**: Consider the blast radius before granting broad autonomy. A custom agent or prompt with edit tools can make widespread changes quickly if the task scope is vague.

### ✅ Success Criteria

- ✅ Switched models and compared the outputs
- ✅ Created a custom agent file
- ✅ Created a reusable prompt file
- ✅ Invoked at least one customization workflow and reflected on when to use it

*Hands-on lab for Module 1: Foundations — GitHub Copilot Developer Training*
