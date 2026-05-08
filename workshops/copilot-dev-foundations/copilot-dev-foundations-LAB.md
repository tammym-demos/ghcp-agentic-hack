# Module 1: Foundations — Hands-On Lab

## Overview

This lab mirrors the four teaching sections in Module 1: foundations framing, Copilot chat workflows, memory/context shaping, and model/usage awareness.

- **Total time**: ~35 minutes
- **Prerequisites**:
  - VS Code installed
  - GitHub Copilot extension installed and signed in
  - GitHub Copilot CLI installed
  - Any local project open in VS Code

> **Note**: A project with source files and a `package.json` file works best, but any codebase is enough for this lab.

## Exercise 1: Foundations Framing, Safety, and Workflow Map

**⏱️ Time**: 5 min  
**📋 Objective**: Choose the right Copilot workflow before you start typing prompts or accepting changes.

1. Open any local project in VS Code.

2. For each task below, decide whether you would start in **Ask**, **Plan**, or **Agent** mode:

   - Explain how this project is structured for a new developer.
   - Draft a plan to add validation to the signup flow without editing files yet.
   - Implement validation across the schema, controller, and tests.

3. Write down two review habits you will use for the rest of the lab:

   - Review diffs before accepting changes.
   - Avoid sharing secrets, tokens, customer data, or proprietary content in prompts or attached context.

4. Open GitHub Copilot Chat and verify you can see the agents/model controls at the bottom of the chat view.

> **Important**: This module treats safety as a workflow habit, not a separate lecture. Every later exercise assumes you will scope context intentionally and review AI-generated output before keeping it.

### ✅ Success Criteria

- ✅ Matched common tasks to **Ask**, **Plan**, or **Agent**
- ✅ Identified at least two human review habits
- ✅ Confirmed Copilot Chat is ready in VS Code

## Exercise 2: Copilot Chat Tour

**⏱️ Time**: 12 min  
**📋 Objective**: Explore Copilot Chat modes, built-in commands, contextual prompting, and prompt-first terminal workflows.

1. Open any project folder in VS Code.

2. Open GitHub Copilot Chat from the sidebar, or press `Ctrl+Shift+I`.

3. In **Ask** mode, enter:

    ```text
    What does this project do?
    ```

    Review the response. It should describe the project without making changes.

4. Use **inline chat** on a selected block of code, then enter:

    ```text
    Refactor this function for readability. Preserve behavior and keep the public API unchanged.
    ```

    Review the proposed inline changes before accepting or discarding them.

5. Switch to **Plan** mode and enter:

    ```text
    Create a plan to add a README.md for this project. Show the steps first and do not make changes yet.
    ```

    Review the proposed plan and the assumptions Copilot makes.

6. Switch to **Agent** mode and enter:

    ```text
    Create a README.md for this project
    ```

    Observe how Copilot plans multiple steps, gathers context, and proposes file changes.

7. **🛡️ Safety checkpoint**: Agent mode can create and modify files. Before accepting any agent-generated changes, review the diff. This is your human review gate — never commit changes you haven't read.

8. Select a function and run:

    ```text
    /explain
    ```

    Then select a block with an error and run:

    ```text
    /fix
    ```

9. Ask a workspace-wide question:

    ```text
    @workspace what frameworks does this project use?
    ```

10. Attach a specific file as context:

    ```text
    #file:package.json explain the dependencies
    ```

11. If GitHub Copilot CLI is not installed yet, install it with one of the supported options for your machine:

    ```bash
    winget install GitHub.Copilot
    ```

    ```bash
    npm install -g @github/copilot
    ```

12. Open the integrated terminal in VS Code and run:

    ```bash
    copilot -p "Explain this Git command: git rebase -i HEAD~3"
    ```

13. Then run:

    ```bash
    copilot -p "Suggest a shell command to find all files larger than 10MB in this repository"
    ```

14. **🛡️ Safety checkpoint**: Review any shell command Copilot suggests before you run it. Terminal suggestions can affect real files, processes, and credentials.

### ✅ Success Criteria

- ✅ Used Ask mode
- ✅ Used inline chat for a focused edit
- ✅ Used Plan mode
- ✅ Used Agent mode
- ✅ Tried at least two slash commands
- ✅ Used `@workspace`
- ✅ Used `#file`
- ✅ Used GitHub Copilot CLI
- ✅ Reviewed agent-generated changes before accepting

## Exercise 3: Memory, Context & Instructions

**⏱️ Time**: 8 min  
**📋 Objective**: Create repository-level and file-targeted instructions, then improve a prompt by tightening scope and constraints.

1. Create `.github/copilot-instructions.md` in your project root with this content:

    ```markdown
    - Always use TypeScript strict mode
    - Prefer async/await over callbacks
    - Use descriptive variable names
    ```

2. Open Chat and ask:

    ```text
    Write a function to fetch user data from an API
    ```

    Review the response and check whether it uses async/await, strong typing, and descriptive names.

3. Refine the prompt by adding task, scope, constraints, and output expectations:

    ```text
    Write a TypeScript function to fetch user data from an API. Use async/await, return a typed result, and include basic error handling. Do not add any UI code.
    ```

    Compare the result to the shorter prompt and note what improved.

4. Create `.github/instructions/tests.instructions.md` with this content:

    ```markdown
    ---
    applyTo: "**/*.test.*"
    ---

    - Use Jest
    - Prefer describe/it blocks
    - Always include edge cases
    ```

5. Open a test file and ask Copilot to generate tests:

    ```text
    Write tests for this code
    ```

    Check whether the response uses Jest-style structure and includes edge cases.

6. **🛡️ Safety checkpoint**: Add another instruction: `"Never hard-code secrets or API keys — use environment variables."` Then ask Copilot to write code that connects to an API. Verify it uses environment variables instead of inline credentials. This is a good habit — and if your org enables GitHub Secret Scanning, it catches any that slip through.

> **Note**: File-targeted instructions are only applied when the active file matches the `applyTo` pattern.

### ✅ Success Criteria

- ✅ Created a repository-level instruction file
- ✅ Created a targeted instruction file
- ✅ Improved a prompt by adding scope and constraints
- ✅ Verified Copilot followed both instruction sets
- ✅ Added a security-focused custom instruction and verified Copilot follows it

## Exercise 4: Models, Agents & Tokens

**⏱️ Time**: 10 min  
**📋 Objective**: Compare model behavior and locate usage or diagnostic details in VS Code.

1. In the Chat panel, find the model selector dropdown near the bottom of the chat window.

2. In **Ask** mode, ask this question with your current model:

    ```text
    Explain how this project is structured for a new developer.
    ```

3. Switch to a different model, such as moving from **GPT-5.5** or **GPT-4o** to **Claude Sonnet 4.6**, depending on what your plan makes available.

4. Ask the exact same question again:

    ```text
    Explain how this project is structured for a new developer.
    ```

5. Compare the two responses for tone, detail, and actionability.

6. **🛡️ Safety checkpoint**: Did either model produce code or suggestions that look confident but might be wrong? Different models can produce different security postures in generated code. If one model's output looks correct but the other raises concerns, investigate — over-trust in a confident-sounding response is the most common AI safety risk.

7. Click the GitHub Copilot icon in the VS Code status bar and review the usage information that is available for your plan.

8. Optionally, open **View → Output** in VS Code, then choose **GitHub Copilot Chat** from the output dropdown, or use any available debug/usage panel in your environment, and look for model or request diagnostics tied to your prompts.

9. Note which model you would pair with **Ask**, **Plan**, or **Agent** mode for this kind of task.

> **Note**: The exact usage, token, or diagnostic fields shown can vary by VS Code version, Copilot plan, and model.

### ✅ Success Criteria

- ✅ Switched between models
- ✅ Compared responses from two models
- ✅ Located Copilot usage information in the IDE
- ✅ Observed model or request diagnostics in the IDE
- ✅ Connected model choice to task autonomy
- ✅ Compared responses for potential security differences

*Hands-on lab for Module 1: Foundations — Copilot Developer Training*
