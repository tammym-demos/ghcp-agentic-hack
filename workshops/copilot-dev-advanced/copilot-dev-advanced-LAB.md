# Module 3: Advanced Topics — Hands-On Lab

## Overview

This self-guided lab gives you a fast, practical way to apply advanced Copilot techniques in your own VS Code workspace: custom agents, MCP servers, debug logs, and layered context.

**Total time**: ~28 minutes  
**Prerequisites**:

- Completed Module 1: Foundations
- Completed Module 2: Agentic Patterns
- VS Code with GitHub Copilot and GitHub Copilot Chat enabled
- A local project open in VS Code

> **Note**: The prompts below use `src/app.ts` as an example. If your project uses a different main file, substitute an equivalent file in your repo.

## Exercise 1: Agent Architecture (7 min)

**Objective**: Compare one broad agent with two specialized agents.

### Steps

1. Create a `.github/agents/` folder if it does not already exist.

```powershell
New-Item -ItemType Directory -Path .github\agents -Force
```

2. Create `.github/agents/helper.md` with the following content:

```markdown
You are a general-purpose development helper. You can:
- Review code for bugs and style issues
- Generate unit tests
- Write documentation
- Suggest refactoring improvements

Always explain your reasoning before making changes.
```

3. In Chat, test the broad agent:

```text
@helper review src/app.ts for potential issues
```

4. Create `.github/agents/tester.md` for test generation only:

```markdown
You are a test-generation specialist. You can:
- Generate unit tests
- Suggest edge cases
- Improve test coverage

Only help with tests. Keep responses focused on test strategy and test code.
```

5. Create `.github/agents/documenter.md` for documentation only:

```markdown
You are a documentation specialist. You can:
- Write README content
- Add code comments and docstrings
- Improve developer-facing documentation

Only help with documentation. Keep responses focused on clarity and completeness.
```

6. Compare specialized output with prompts like these:

```text
@tester generate unit tests for src/app.ts
```

```text
@documenter write documentation for src/app.ts
```

7. Reflect on the difference: specialized agents should produce more focused, higher-quality output in their domain. Discuss when one general agent is enough versus when multiple specialized agents are better.

### Success Criteria

- ✅ Created one general agent and two specialized agents
- ✅ Tested the broad agent and specialized agents in Chat
- ✅ Compared the quality and focus of their outputs

## Exercise 2: MCP Setup (10 min)

**Objective**: Configure an MCP server and verify that Copilot can use it.

### Steps

1. Create or update `.vscode/mcp.json` with the following configuration:

```json
{
  "servers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch"]
    }
  }
}
```

2. Reload VS Code with **Ctrl+Shift+P** and run **Developer: Reload Window**.

3. In Chat using Agent mode, ask Copilot to fetch external content:

```text
Fetch the content from https://api.github.com/zen and tell me what it says
```

4. Watch for tool call indicators in Chat. You should see Copilot using the MCP fetch server.

5. Explore one more MCP server option at <https://mcp.so> or on npm by searching for `@modelcontextprotocol`.

> **Note**: If `npx` is not available, install Node.js first. The MCP fetch server requires no extra configuration beyond the `mcp.json` entry.

### Success Criteria

- ✅ Added an MCP server to `.vscode/mcp.json`
- ✅ Reloaded VS Code successfully
- ✅ Saw Copilot use the MCP server to fetch external data

## Exercise 3: Debugging Chat & Agents (5 min)

**Objective**: Trace what Copilot sends, selects, and executes.

### Steps

1. Open the Output panel with **View → Output** or **Ctrl+Shift+U**.

2. In the Output panel dropdown, choose **GitHub Copilot Chat**.

3. Ask a normal chat question and watch the log output:

```text
Explain what this file does and suggest one improvement.
```

4. Identify the request details in the log:

- Context included with the request
- Model selected
- Token usage
- Response timing

5. Switch to Agent mode and give it a multi-step task:

```text
Refactor this module to reduce duplication and add tests for the changed behavior.
```

6. Watch the Output panel as the agent runs. Look for the iteration count, tools used, retries, and any errors.

### Success Criteria

- ✅ Opened the correct Copilot output channel
- ✅ Identified context, model choice, and token usage
- ✅ Traced at least one agent loop in the logs

## Exercise 4: Full Stack Agent (6 min)

**Objective**: Use repo instructions, a custom agent, and MCP together in one workflow.

### Steps

1. Confirm these files already exist from earlier modules:

- `.github/copilot-instructions.md`
- `.github/agents/reviewer.md`
- `.vscode/mcp.json`

2. In Chat, run the reviewer agent with this prompt:

```text
@reviewer Review the main module and check if the API patterns match current best practices
```

3. Observe how the response benefits from three layers at once:

- Repo-wide guidance from `.github/copilot-instructions.md`
- Task specialization from `@reviewer`
- External tool access from MCP, when relevant

4. Open the Output panel again and trace how those layers show up in the request and tool activity.

### Success Criteria

- ✅ Used a custom agent with repo instructions already in place
- ✅ Confirmed MCP tools were available to the workflow
- ✅ Traced how instructions, agent behavior, and tools combined in the logs

*Hands-on lab for Module 3: Advanced Topics — Copilot Developer Training*
