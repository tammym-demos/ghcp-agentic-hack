# Module 1: Foundations — Hands-On Lab

## Overview

This short lab mirrors the workshop flow: first you practice choosing the right GitHub Copilot interaction mode, then you shape output with instructions and scoped context, and finally you compare models while trying a lightweight customization workflow. The goal is to build confidence with safe, repeatable habits rather than to complete a large coding task.

- **Total time**: ~15 minutes
- **Prerequisites**:
  - VS Code installed
  - GitHub Copilot extension installed and signed in
  - GitHub Copilot CLI installed
  - Any local project open in VS Code

## Exercise 1: Copilot Chat Tour — Modes, Commands, and CLI

**⏱️ Time**: 5 min
**📋 Objective**: Explore Chat modes, slash commands, and the CLI

1. Open any multi-file project in VS Code and open **GitHub Copilot Chat**.
2. In **Ask** mode, open a file you understand only partially, then run:

   ```text
   @workspace Summarize how this project is organized and explain what #file is responsible for.
   ```

3. Switch to **Plan** mode and ask GitHub Copilot to propose a safe change without editing files:

   ```text
   Plan a small improvement to #file. Include risks, affected files, and how you would verify the change.
   ```

4. Switch to **Agent** mode and give GitHub Copilot a small, reversible task such as renaming a variable, clarifying a comment, or improving a README section:

   ```text
   Improve #selection for readability, explain the proposed change first, and keep the edit limited to this file.
   ```

5. While still in chat, try a slash command:

   ```text
   /explain #selection
   ```

6. In the terminal, start GitHub Copilot CLI and inspect available commands:

   ```powershell
   copilot
   /help
   ```

7. Exit the interactive session, then try a direct prompt:

   ```powershell
   copilot -p "Give me an overview of this project."
   ```

**🛡️ Safety checkpoint**: Review any agent-generated edits before accepting them, and do not assume an inline completion or CLI response is correct without checking it against the codebase.

### ✅ Success Criteria

- ✅ Used **Ask**, **Plan**, and **Agent** mode at least once
- ✅ Used at least one slash command
- ✅ Used at least one chat variable or participant such as `#file`, `#selection`, or `@workspace`
- ✅ Ran at least one GitHub Copilot CLI command

## Exercise 2: Memory, Context & Instructions

**⏱️ Time**: 5 min
**📋 Objective**: Create instruction files and see how they affect GitHub Copilot behavior

1. In your project, create `.github/copilot-instructions.md` with a simple repository-wide rule set:

   ```markdown
   # Repository Instructions

   - Always use TypeScript strict mode for new TypeScript code
   - Prefer early returns over deeply nested conditionals
   - Add or update tests when behavior changes
   ```

2. Open a file where GitHub Copilot can generate or revise code, then ask:

   ```text
   Generate a small helper in #file and explain which repository instructions you followed.
   ```

3. Create a scoped instruction file at `.github/instructions/tests.instructions.md`:

   ```markdown
   ---
   applyTo: "**/*.{test,spec}.{ts,tsx,js,jsx}"
   ---

   # Test File Instructions

   - Use Arrange-Act-Assert structure
   - Prefer descriptive test names
   - Avoid live network calls in unit tests
   ```

4. Open a matching test file and ask GitHub Copilot to create or revise a test:

   ```text
   Create a focused unit test in #file and tell me which scoped instructions apply here.
   ```

5. Compare the response you got in a regular source file with the one you got in a test file, and note how the scoped instruction changes the output.

**🛡️ Safety checkpoint**: Review what context you are sharing. Instruction files become visible to collaborators and should contain durable project guidance, not secrets or sensitive data.

### ✅ Success Criteria

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

**🛡️ Safety checkpoint**: Consider the blast radius before granting broad autonomy. A custom agent or prompt with edit tools can make widespread changes quickly if the task scope is vague.

### ✅ Success Criteria

- ✅ Switched models and compared the outputs
- ✅ Created a custom agent file
- ✅ Created a reusable prompt file
- ✅ Invoked at least one customization workflow and reflected on when to use it

*Hands-on lab for Module 1: Foundations — GitHub Copilot Developer Training*
