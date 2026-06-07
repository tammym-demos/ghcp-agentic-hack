# Module 3: Advanced Topics — Hands-On Lab

## Overview

This lab gives participants a fast, practical tour of three advanced GitHub Copilot capabilities: MCP tool usage, debug log inspection, and agentic loop behavior. The goal is not to master every option, but to observe how these features behave in a real workspace and build better instincts about trust, context, and control.

- **Total time**: ~15 minutes
- **Prerequisites**:
  - Completion of Modules 1-2 labs
  - VS Code with GitHub Copilot
  - Any local project open
  - Node.js and `npx` available for a sample MCP server

## Exercise 1: Configure and Use an MCP Server

**⏱️ Time**: 5 min
**📋 Objective**: Configure an MCP server and observe GitHub Copilot using an external tool.

> **Note**: Exact MCP setup can vary by version and organization policy. If your team already provides an approved MCP server, use that instead of the sample below.

1. Open your project settings and create a `.vscode/mcp.json` file if one does not already exist.

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

3. Open GitHub Copilot Chat in Agent mode and ask for information that requires an external fetch.

    ```text
    Use the configured MCP fetch tool to summarize the main ideas from https://github.blog/ai-and-ml/github-copilot/ and tell me what is relevant to developers.
    ```

4. Observe the tool approval flow. Before approving, inspect what GitHub Copilot says it will access and why it needs the MCP tool.

5. Approve the call, review the result, and note what data was sent to the MCP server versus what stayed local.

6. **🛡️ Safety checkpoint**: Review the MCP server's permissions before approving tool calls. What data can it access, and is that acceptable for your environment?

### ✅ Success Criteria

- ✅ Configured an MCP server
- ✅ Observed GitHub Copilot discovering MCP tools
- ✅ Approved an MCP tool call and reviewed the result

## Exercise 2: Debugging — Inspect Chat and Agent Logs

**⏱️ Time**: 5 min
**📋 Objective**: Use debug logs to understand what GitHub Copilot is doing under the hood.

1. In VS Code, open **View → Output** and select **GitHub Copilot Chat** from the dropdown.

2. Send a simple prompt in GitHub Copilot Chat and watch the log entries appear.

    ```text
    Explain how the main entry point of this project works.
    ```

3. Identify the request payload in the logs. Note what context was included and what files or symbols GitHub Copilot referenced.

4. Send a second prompt that explicitly asks for broader workspace context.

    ```text
    @workspace Explain how the main entry point of this project works and which files it depends on.
    ```

5. Compare the logs from the two prompts. Note how the request context changes when you use `@workspace`, and find the corresponding model response.

6. **🛡️ Safety checkpoint**: Check the logs for sensitive information that was included in the context, such as file paths, variable names, or code snippets.

### ✅ Success Criteria

- ✅ Opened and read GitHub Copilot Chat debug logs
- ✅ Identified request context and model response
- ✅ Compared context with and without `@workspace`

## Exercise 3: Observe an Agentic Loop and Off-Ramp

**⏱️ Time**: 5 min
**📋 Objective**: Observe an agentic loop cycle and understand off-ramp behavior.

1. Open Agent mode in GitHub Copilot Chat and give it a multi-step task that requires planning.

    ```text
    Add input validation to this form, write tests for invalid input, and update the documentation with the new validation rules.
    ```

2. Watch the chat output and identify the loop pattern: plan → execute → observe → reflect. Look for places where GitHub Copilot checks its own progress before continuing.

3. Now give GitHub Copilot a task that should force an off-ramp because the project lacks enough context or prerequisites.

    ```text
    Refactor this project to use OAuth-based authentication and update the deployment configuration for the new auth flow.
    ```

4. Observe whether GitHub Copilot stops to clarify assumptions, explains what is missing, or proceeds anyway.

5. Capture one sentence describing what a better off-ramp would look like if the agent guessed too much.

6. **🛡️ Safety checkpoint**: If the agent proceeds without asking for clarification on an ambiguous task, that is a sign you need stronger off-ramp instructions.

### ✅ Success Criteria

- ✅ Observed an agentic loop with clear plan → execute → observe → reflect steps
- ✅ Identified an off-ramp scenario
- ✅ Understood when the agent should stop and ask versus proceed

*Hands-on lab for Module 3: Advanced Topics — GitHub Copilot Developer Training*
