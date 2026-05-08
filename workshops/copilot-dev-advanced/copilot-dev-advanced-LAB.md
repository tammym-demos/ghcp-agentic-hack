# Module 3: Advanced Topics — Hands-On Lab

## Overview

This self-guided lab gives you a practical way to apply the Module 3 topics in your own VS Code workspace: built-in chat participants, extension trust review, MCP configuration, output evaluation, and diagnostics.

**Total time**: ~30 minutes  
**Prerequisites**:

- Completed Module 1: Foundations
- Completed Module 2: Agentic Patterns
- VS Code with GitHub Copilot and GitHub Copilot Chat enabled
- A local project open in VS Code

> **Note**: The prompts below use `src/app.ts` as an example. If your project uses a different main file, substitute an equivalent file in your repo.

## 1. Extensions, Chat Participants, and MCP (17 min)

This section aligns to Session 1 of the workshop guide.

### Exercise 1: Compare Participants and Review Trust (7 min)

**Objective**: Compare how built-in participants frame the same question, then review one installable capability surface with a trust checklist.

### Steps

1. Ask the same question three different ways in Copilot Chat:

```text
@workspace explain how the main request flow works in this repo
```

```text
@vscode which VS Code features would help me trace this flow safely?
```

```text
@terminal summarize the last build or test output and suggest the next command
```

2. Compare the results. Note which response used repo context, which one focused on editor features, and which one reasoned from terminal output.

3. Open the Extensions view with **Ctrl+Shift+X** and inspect one extension that could affect your workflow. If you want a Copilot-specific example, also browse <https://github.com/marketplace?type=github-copilot-extensions> in your browser.

4. Review the capability with this checklist:

- Publisher verification
- Permission scope
- Maintenance activity
- Source transparency
- Operational fit for your organization

5. Decide whether you would allow the capability in a production development environment, only in a sandbox, or not at all.

6. **🛡️ Safety checkpoint**: What is the narrowest tool, permission, or install scope that still solves your problem?

### Success Criteria

- ✅ Compared `@workspace`, `@vscode`, and `@terminal` on the same task
- ✅ Identified how each participant changed the answer framing
- ✅ Reviewed one extension or Copilot Extension with a trust checklist
- ✅ Chose an approval decision based on least privilege and maintenance quality

### Exercise 2: Configure an MCP Server (10 min)

**Objective**: Add a workspace-scoped MCP server, confirm that VS Code recognizes it, and verify that its tools are available.

### Steps

1. Create or update `.vscode/mcp.json` with the following configuration:

```json
{
  "servers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "${workspaceFolder}"
      ],
      "env": {
        "MCP_LOG_LEVEL": "info"
      }
    }
  }
}
```

2. Run **MCP: List Servers** from the Command Palette and confirm that the `filesystem` server appears.

3. If the server is not running yet, start or restart it from the same MCP command flow.

4. Open Copilot Chat, use **Configure Tools** (or inspect the Agent Debug Log panel later), and confirm that tools from the `filesystem` server are available.

5. Ask Copilot to perform a small file-oriented task in your repo. For example:

```text
Summarize the top-level folders in this workspace and explain what each one is for.
```

6. Use **MCP: List Servers** → **Show Output** or the Agent Debug Log panel to confirm that the server started cleanly and that at least one tool path was available during the session.

7. **🛡️ Safety checkpoint**: Is this server better kept in workspace `.vscode/mcp.json` for the team, or in your user-profile `mcp.json` for personal use only?

### Success Criteria

- ✅ Added a valid MCP server definition to `.vscode/mcp.json`
- ✅ Confirmed the server appears in **MCP: List Servers**
- ✅ Verified that the server's tools were available in chat
- ✅ Decided whether the server belongs at workspace scope or user scope

## 2. Evaluating Agentic Output (6 min)

This section aligns to Session 2 of the workshop guide.

### Exercise 3: Apply SMART Criteria and the Rubric (6 min)

**Objective**: Rewrite one weak request into a measurable task, then score the result with the workshop rubric.

### Steps

1. Pick a small, low-risk change in your project.

2. Start with a weak request such as:

```text
Improve this file.
```

3. Rewrite it into a SMART request. For example:

```text
Refactor src/app.ts to remove duplicate validation logic, keep the public response shape unchanged, and leave the existing test suite passing.
```

4. Ask Copilot to produce the change, suggestion, or plan.

5. Score the result from **1-5** for these dimensions:

- Correctness
- Readability and maintainability
- Security
- Test coverage

6. Decide what verification the task deserves: quick human review, tests plus review, or deeper review and scans.

7. **🛡️ Safety checkpoint**: If this were an auth change, data-access change, or destructive operation, what extra evidence would you require before merge?

### Success Criteria

- ✅ Rewrote one vague prompt into SMART criteria
- ✅ Generated or reviewed one Copilot output against that SMART request
- ✅ Scored the output with the rubric dimensions from the workshop
- ✅ Chose a verification pattern that matched the task's risk

## 3. Troubleshooting and Diagnostics (7 min)

This section aligns to Session 3 of the workshop guide.

### Exercise 4: Inspect Logs, Debug Views, and Diagnostics (7 min)

**Objective**: Use the real VS Code diagnostics surfaces to understand what Copilot saw and did.

### Steps

1. Open the Command Palette and run **Developer: Set Log Level**. Set **GitHub Copilot** and **GitHub Copilot Chat** to **Trace**.

2. Open the Output panel with **View → Output** or **Ctrl+Shift+U**. Inspect the **GitHub Copilot** and **GitHub Copilot Chat** output channels.

3. Enable `github.copilot.chat.agentDebugLog.fileLogging.enabled` in Settings if it is not already enabled.

4. In the Chat view, open the `...` menu and select **Show Agent Debug Logs**.

5. From the same Chat menu, select **Show Chat Debug View**.

6. Run one prompt or agent task, such as:

```text
Explain what this file does, point out one risk, and suggest the safest next improvement.
```

7. Capture at least three pieces of evidence from the debug surfaces, such as:

- Which model was used
- What context was attached
- What tool calls ran
- Which files changed or were inspected

8. If something looks wrong, try one of these:

- Use `/troubleshoot` in chat to ask about the current session
- Run **GitHub Copilot: Collect Diagnostics** for a support snapshot
- Use **MCP: List Servers** → **Show Output** if the issue appears MCP-related

9. **🛡️ Safety checkpoint**: Did the logs show any file access, tool invocation, or retry loop you would want to tighten before trusting this workflow in daily use?

### Success Criteria

- ✅ Enabled detailed Copilot logging and opened the correct output channels
- ✅ Opened the Agent Debug Log panel and Chat Debug View
- ✅ Identified context, model, and tool evidence from one session
- ✅ Used at least one troubleshooting path for a suspicious or surprising result

*Hands-on lab for Module 3: Advanced Topics — Copilot Developer Training*
