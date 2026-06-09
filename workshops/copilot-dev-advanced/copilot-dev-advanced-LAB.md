# Module 3: Advanced Topics — Hands-On Lab

## Overview

This lab gives participants a fast, practical tour of three advanced GitHub Copilot capabilities: MCP tool usage, debug log inspection, and agentic loop behavior. Each exercise builds on the project and artifacts you created in Modules 1 and 2 — your `.github/` configuration, custom agents, and instruction files are the foundation for exploring these advanced patterns.

- **Total time**: ~15 minutes
- **Prerequisites**:
  - Completion of Modules 1-2 labs (you should have `copilot-instructions.md`, `refactor-coach.agent.md`, `reviewer.md`, and `tests.instructions.md` in your `.github/` folder)
  - VS Code with GitHub Copilot
  - Your Module 1-2 project open
  - Node.js and `npx` available for a sample MCP server

## Exercise 1: Configure and Use an MCP Server

**⏱️ Time**: 5 min
**📋 Objective**: Configure an MCP server in your existing project and observe GitHub Copilot using an external tool alongside your custom agents.

> **Note**: Exact MCP setup can vary by version and organization policy. If your team already provides an approved MCP server, use that instead of the sample below.

1. In your Module 1-2 project, create a `.vscode/mcp.json` file if one does not already exist.

2. Add a simple MCP server configuration such as this fetch server example:

    ```json
    {
      "servers": {
        "fetch": {
          "type": "stdio",
          "command": "uvx",
          "args": ["mcp-server-fetch"]
        }
      }
    }
    ```

3. Open GitHub Copilot Chat in Agent mode and ask for information that requires both an external fetch and awareness of your project:

    ```text
    Use the fetch tool to get the latest GitHub Copilot changelog from https://github.blog/changelog/label/copilot/ and tell me which new features are relevant to the agent and instruction patterns we use in this project.
    ```

4. Observe the tool approval flow. Before approving, inspect what GitHub Copilot says it will access and why it needs the MCP tool.

5. Approve the call, review the result, and note how Copilot combined MCP tool output with your local project context (instruction files, agents).

6. **Token review**: Open **View → Output → GitHub Copilot Chat** and note how the MCP server tool descriptions are included in the request payload. Consider how many active MCP servers would be practical before token costs become excessive.

7. **🛡️ Safety checkpoint**: Review the MCP server's permissions before approving tool calls. What data can it access, and is that acceptable for your environment? Would you add this server to a shared `.vscode/mcp.json` that your whole team uses?

### ✅ Success Criteria

- ✅ Configured an MCP server in your existing Module 1-2 project
- ✅ Observed GitHub Copilot discovering MCP tools alongside your custom agents
- ✅ Approved an MCP tool call and reviewed how local context combined with external data
- ✅ Checked the Output panel for MCP tool token impact

## Exercise 2: Debugging — Inspect Your Agent's Context and Token Usage

**⏱️ Time**: 5 min
**📋 Objective**: Use debug logs to understand what your `reviewer.md` agent from Module 2 actually sends and receives, and diagnose context differences.

1. In VS Code, open **View → Output** and select **GitHub Copilot Chat** from the dropdown.

2. Invoke your `reviewer.md` agent from Module 2 against a function in your project:

    ```text
    @reviewer Review the error handling in [pick a file from your project] and suggest improvements based on our project conventions.
    ```

3. In the Output panel, identify the request payload. Note:
   - Which instruction files were included (look for `copilot-instructions.md` and `tests.instructions.md`)
   - What context from the agent's system prompt appeared
   - The total token count for the request

4. Now send a similar question in regular Ask mode (not using the agent):

    ```text
    Review the error handling in [same file] and suggest improvements.
    ```

5. Compare the two log entries:
   - How did the context differ between agent mode and ask mode?
   - Which included more tokens? Why?
   - Did the agent's focused instructions produce a more targeted response?

6. Try one more comparison — use `@workspace` with the same question and note how much broader the context payload becomes:

    ```text
    @workspace Review the error handling patterns across this project and suggest improvements.
    ```

7. **🛡️ Safety checkpoint**: Check the logs for sensitive information that was included in the context. Are there file paths, variable names, or code snippets that should not have been shared? Would you be comfortable with this context being sent to an external model?

### ✅ Success Criteria

- ✅ Opened and read GitHub Copilot Chat debug logs
- ✅ Compared request context between your custom agent, ask mode, and @workspace
- ✅ Identified token count differences across the three approaches
- ✅ Understood how instruction files and agent prompts affect context size

## Exercise 3: Observe an Agentic Loop and Off-Ramp

**⏱️ Time**: 5 min
**📋 Objective**: Observe an agentic loop cycle using your existing `refactor-coach` agent and understand off-ramp behavior.

1. Open Agent mode in GitHub Copilot Chat and give your `refactor-coach` agent a multi-step task that requires planning:

    ```text
    @refactor-coach Refactor [pick a file] to use early returns (as specified in our copilot-instructions), add input validation for all public functions, write tests following our tests.instructions.md conventions, and update any comments that reference the old control flow.
    ```

2. Watch the chat output and identify the loop pattern: plan → execute → observe → reflect. Look for places where GitHub Copilot checks its own progress before continuing. Note how the agent references your instruction files during its planning.

3. Open **View → Output → GitHub Copilot Chat** and observe how token usage grows with each iteration of the loop. Note how the entire conversation history is re-sent each cycle.

4. Now give the agent a task that should force an off-ramp because it lacks sufficient context or access:

    ```text
    @refactor-coach Refactor this project to use a PostgreSQL database instead of the current data layer and update the deployment configuration for the new database connection.
    ```

5. Observe whether the agent stops to clarify assumptions, explains what is missing, or proceeds anyway. Compare this behavior to the off-ramp pattern described in the workshop (stop if tests break, explain what is missing, present options).

6. Capture one sentence describing what a better off-ramp would look like if the agent guessed too much. Consider: how would you add an off-ramp instruction to your `refactor-coach.agent.md` file?

7. **🛡️ Safety checkpoint**: If the agent proceeds without asking for clarification on an ambiguous task, that is a sign you need stronger off-ramp instructions in your agent definition. Review your `refactor-coach.agent.md` and consider adding explicit stop conditions.

### ✅ Success Criteria

- ✅ Observed an agentic loop with clear plan → execute → observe → reflect steps using your custom agent
- ✅ Monitored token growth across loop iterations in the Output panel
- ✅ Identified an off-ramp scenario where the agent should have stopped
- ✅ Understood how to encode off-ramp behavior in agent instruction files

*Hands-on lab for Module 3: Advanced Topics — GitHub Copilot Developer Training*
