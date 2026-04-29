# Module 1: Foundations — Hands-On Lab

## Overview

This standalone lab helps attendees practice the core Copilot workflows from Module 1: chat modes, GitHub CLI, custom instructions, and model/token awareness.

- **Total time**: ~32 minutes
- **Prerequisites**:
  - VS Code installed
  - GitHub Copilot extension installed and signed in
  - GitHub CLI (`gh`) installed
  - Any local project open in VS Code

> **Note**: A project with source files and a `package.json` file works best, but any codebase is enough for this lab.

## Exercise 1: Chat Tour

**⏱️ Time**: 8 min  
**📋 Objective**: Explore Copilot Chat modes, built-in commands, and contextual prompting in VS Code.

1. Open any project folder in VS Code.

2. Open GitHub Copilot Chat from the sidebar, or press `Ctrl+Shift+I`.

3. In **Ask** mode, enter:

    ```text
    What does this project do?
    ```

    Review the response. It should describe the project without making changes.

4. Switch to **Edit** mode. Select a small block of code, then enter:

    ```text
    Add error handling
    ```

    Review the proposed inline changes before accepting or discarding them.

5. Switch to **Agent** mode and enter:

    ```text
    Create a README.md for this project
    ```

    Observe how Copilot plans multiple steps, gathers context, and proposes file changes.

6. Select a function and run:

    ```text
    /explain
    ```

    Then select a block with an error and run:

    ```text
    /fix
    ```

7. Ask a workspace-wide question:

    ```text
    @workspace what frameworks does this project use?
    ```

8. Attach a specific file as context:

    ```text
    #file:package.json explain the dependencies
    ```

### ✅ Success Criteria

- ✅ Used Ask mode
- ✅ Used Edit mode
- ✅ Used Agent mode
- ✅ Tried at least two slash commands
- ✅ Used `@workspace`
- ✅ Used `#file`

## Exercise 2: GitHub CLI

**⏱️ Time**: 7 min  
**📋 Objective**: Use GitHub Copilot from the terminal to explain commands and suggest shell commands.

> **Note**: If `gh copilot` is not available, install the official extension first and then rerun the exercise.

```bash
gh extension install github/gh-copilot
```

1. Open the integrated terminal in VS Code.

2. Run:

    ```bash
    gh copilot explain "git rebase -i HEAD~3"
    ```

    Read the plain-English explanation of the command.

3. Run:

    ```bash
    gh copilot suggest "find all files larger than 10MB"
    ```

    Review the suggested command, then run the suggestion in your terminal.

4. Browse available Copilot-related extensions:

    ```bash
    gh extension search copilot
    ```

5. List the extensions already installed on your machine:

    ```bash
    gh extension list
    ```

### ✅ Success Criteria

- ✅ Got a plain-English explanation from `gh copilot explain`
- ✅ Got a suggested command from `gh copilot suggest`
- ✅ Browsed available and installed GitHub CLI extensions

## Exercise 3: Custom Instructions

**⏱️ Time**: 8 min  
**📋 Objective**: Create repository-level and file-targeted instructions that shape Copilot responses.

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

3. Create `.github/instructions/tests.instructions.md` with this content:

    ```markdown
    ---
    applyTo: "**/*.test.*"
    ---

    - Use Jest
    - Prefer describe/it blocks
    - Always include edge cases
    ```

4. Open a test file and ask Copilot to generate tests:

    ```text
    Write tests for this code
    ```

    Check whether the response uses Jest-style structure and includes edge cases.

> **Note**: File-targeted instructions are only applied when the active file matches the `applyTo` pattern.

### ✅ Success Criteria

- ✅ Created a repository-level instruction file
- ✅ Created a targeted instruction file
- ✅ Verified Copilot followed both instruction sets

## Exercise 4: Models & Tokens

**⏱️ Time**: 9 min  
**📋 Objective**: Compare model behavior and locate token usage details in VS Code.

1. In the Chat panel, find the model selector dropdown near the bottom of the chat window.

2. Ask this question with your current model:

    ```text
    Explain how this project is structured for a new developer.
    ```

3. Switch to a different model, such as moving from GPT-4o to Claude Sonnet.

4. Ask the exact same question again:

    ```text
    Explain how this project is structured for a new developer.
    ```

5. Compare the two responses for tone, detail, and actionability.

6. Open **View → Output** in VS Code, then choose **GitHub Copilot Chat** from the output dropdown.

7. Review the recent log entries and look for model and token usage details tied to your prompts.

> **Note**: The exact token fields shown can vary by VS Code version, Copilot plan, and model.

### ✅ Success Criteria

- ✅ Switched between models
- ✅ Compared responses from two models
- ✅ Located the GitHub Copilot Chat output logs
- ✅ Observed token-related information in the logs

*Hands-on lab for Module 1: Foundations — Copilot Developer Training*
