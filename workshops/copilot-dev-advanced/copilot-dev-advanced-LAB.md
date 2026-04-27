# GitHub Copilot Developer Training — Advanced Topics — Hands-On Lab Guide

**Duration**: ~75 minutes of hands-on exercises (across a ~3-hour module)  
**Format**: Step-by-step lab exercises aligned to workshop sessions  
**Audience**: Developers extending, evaluating, and debugging GitHub Copilot  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

> **Part of the Copilot Developer Training curriculum** ([Foundations LAB](../copilot-dev-foundations/copilot-dev-foundations-LAB.md) · [Agentic Patterns LAB](../copilot-dev-agentic/copilot-dev-agentic-LAB.md) · [Advanced Topics LAB](../copilot-dev-advanced/copilot-dev-advanced-LAB.md)). This lab can be completed standalone.

---

## Lab Overview

These labs cover extending Copilot with MCP servers, building evaluation frameworks, and mastering diagnostic tools for troubleshooting.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher |
| **Git** | For cloning the demo repository |

### Setup Checkpoint

Ensure your environment is ready. If you completed Modules 1–2, your repo should be set up. If starting fresh:

```bash
git clone https://github.com/<YOUR-USERNAME>/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
npm install
npm run build
npm run dev
```

Ensure these are in place:

- ✅ `.github/copilot-instructions.md` exists (create one with basic TypeScript standards if missing)
- ✅ API running at `http://localhost:3000`
- ✅ Frontend running at `http://localhost:5137`
- ✅ `github.copilot.chat.debugMode` set to `true` in VS Code settings

### Lab Summary

| Lab | Workshop Section | Duration | Exercises |
|-----|-----------------|----------|-----------|
| 1 | Session 6: Extensions & MCP | 36 min | 5 exercises |
| 2 | Session 7: Evaluating Agentic Output | 42 min | 6 exercises |
| 3 | Session 8: Troubleshooting & Diagnostics | 36 min | 5 exercises |

---

<details>
<summary><h2>Lab 1: Extensions & MCP (36 min)</h2></summary>

> **Workshop Session**: 6 — Extensions & MCP

### Exercise 1.1 — Participant Exploration (5 min)

**Objective**: Use each built-in chat participant and document their capabilities.

**Steps**

**Step 1: Test @workspace**

```
@workspace What are the main database entities in this project and how are they related?
```

Note: How does it find this information? Does it reference specific files?

**Step 2: Test @vscode**

```
@vscode How do I configure auto-format on save for TypeScript files?
```

Note: Does it provide VS Code-specific settings (not generic advice)?

**Step 3: Test @terminal**

Run a command in the terminal first:

```bash
npm run lint
```

Then ask:

```
@terminal Summarize the output of the last command. Were there any warnings?
```

**Step 4: Document findings**

| Participant | What It Knows | Limitations |
|-------------|--------------|-------------|
| `@workspace` | | |
| `@vscode` | | |
| `@terminal` | | |

### Success Criteria

- ✅ Used all three built-in participants
- ✅ Documented what each knows and doesn't know
- ✅ Understand when to use each one

---

### Exercise 1.2 — Extension Installation (8 min)

**Objective**: Find, install, and use a GitHub Copilot Extension.

**Steps**

**Step 1: Browse the marketplace**

Open <https://github.com/marketplace?type=apps&copilot_app=true> in your browser.

**Step 2: Find a relevant extension**

Look for an extension relevant to your tech stack. Options include:

- Docker
- GitHub Models
- Azure
- Sentry

**Step 3: Install and use**

Follow the extension's installation instructions. Then use it in chat:

```
@extension-name [your question]
```

**Step 4: Evaluate**

- Is the response more domain-specific than Copilot's default?
- What additional context does the extension have access to?
- Would you recommend this to your team?

### Success Criteria

- ✅ Browsed the Copilot Extensions marketplace
- ✅ Installed at least one extension
- ✅ Used the extension in a chat conversation
- ✅ Evaluated whether it adds value for your workflow

---

### Exercise 1.3 — MCP Server Setup (10 min)

**Objective**: Configure a local MCP server and use its tools in chat.

**Steps**

**Step 1: Create the MCP configuration**

Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "./api"
      ]
    }
  }
}
```

**Step 2: Reload VS Code**

Reload the window (Command Palette → "Developer: Reload Window") so VS Code picks up the new MCP configuration.

**Step 3: Verify the server**

Open the chat panel. You should see MCP tools available. Try:

```
Use the filesystem tools to list all TypeScript files in the api directory
```

**Step 4: Use MCP tools for a task**

```
Using the filesystem tools, find all files that contain "order" in their name
and summarize what each one does
```

### Success Criteria

- ✅ Created `.vscode/mcp.json` with a filesystem server
- ✅ MCP tools appear in the chat tool list
- ✅ Successfully used MCP tools in a conversation

---

### Exercise 1.4 — MCP Configuration from Scratch (5 min)

**Objective**: Write a complete MCP configuration with multiple servers.

**Steps**

**Step 1: Add a GitHub server**

Update `.vscode/mcp.json` to include a GitHub server:

```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "./api"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:github-pat}"
      }
    }
  }
}
```

**Step 2: Reload and verify**

Reload VS Code. You should see both servers' tools available.

> **Note**: The GitHub server requires a Personal Access Token. When prompted, enter one with `repo` scope (or skip this server if you don't have one handy).

**Step 3: Test the GitHub server**

```
Using GitHub tools, list the open issues on this repository
```

### Success Criteria

- ✅ Configured multiple MCP servers in one file
- ✅ Used `${input:}` for secret management
- ✅ Both servers' tools appear in the chat

---

### Exercise 1.5 — MCP Tool Usage in Context (8 min)

**Objective**: Use MCP tools as part of a larger task.

**Steps**

**Step 1: Combine MCP with Copilot**

In Agent mode, ask:

```
Use the filesystem tools to analyze the API route files. Then suggest
a new endpoint for managing deliveries, following the patterns you found.
Create the files.
```

**Step 2: Observe tool usage**

Watch the chat output for tool invocations. Note:

- Which MCP tools were called?
- What did the tools return?
- How did Copilot use the tool results?

**Step 3: Evaluate**

- Did MCP tools give Copilot better context than `#file` references?
- When would you use MCP tools vs. `@workspace` vs. `#file`?

### Success Criteria

- ✅ Used MCP tools as part of an Agent mode task
- ✅ Observed tool calls and results in the chat
- ✅ Can articulate when MCP adds value over built-in context

</details>

---

<details>
<summary><h2>Lab 2: Evaluating Agentic Output (34 min)</h2></summary>

> **Workshop Session**: 7 — Evaluating Agentic Output

### Exercise 2.1 — Defining Success Criteria (5 min)

**Objective**: Define success criteria for a task before using Copilot.

**Steps**

**Step 1: Choose a task**

Task: "Add pagination to the products API endpoint"

**Step 2: Write success criteria**

Before asking Copilot, write your criteria:

```
Task: Add pagination to the products API endpoint
Success criteria:
  - Functional: Cursor-based pagination, max 100 items per page
  - Quality: Matches existing route patterns in the project
  - Constraints: Include Link headers, total count in response
  - Security: Validate page size input (reject negative, > 100)
  - Not acceptable: Offset-based pagination, no input validation
```

**Step 3: Execute with criteria in the prompt**

Include the criteria directly:

```
Add cursor-based pagination to the products GET endpoint.
Requirements:
- Max 100 items per page, default 20
- Include Link headers (next, prev) in response
- Include total count in response body
- Validate page size (reject negative or > 100 with 400 error)
- Follow the existing route patterns in this project
Do NOT use offset-based pagination.
```

**Step 4: Evaluate against criteria**

Check each criterion. Did the output meet them all?

### Success Criteria

- ✅ Wrote success criteria before generating code
- ✅ Included criteria in the prompt
- ✅ Evaluated output against each criterion

---

### Exercise 2.2 — Rubric Creation (8 min)

**Objective**: Build a quality rubric for evaluating AI-generated code.

**Steps**

**Step 1: Create your rubric**

Create a file `evaluation-rubric.md` in your project root (this is for your reference, not committed):

```markdown
# Code Quality Rubric

| Dimension | 1 (Poor) | 2 (OK) | 3 (Good) | 4 (Excellent) |
|-----------|----------|--------|----------|----------------|
| Correctness | Doesn't work | Happy path only | Common edges | All edges, robust |
| Completeness | Missing parts | Core present | Full requirements | Exceeds requirements |
| Code Style | Inconsistent | Mostly OK | Follows patterns | Clean, idiomatic |
| Security | Vulnerabilities | No obvious issues | Validates input | Defense in depth |
| Performance | Unacceptable | Adequate | Efficient | Optimized |
| Testability | No tests | Basic tests | Good coverage | Edge case tests |
```

**Step 2: Customize dimensions**

Add or modify dimensions for your specific project. Consider:

- Documentation (JSDoc coverage)
- Error handling (graceful failures)
- Type safety (strict TypeScript compliance)

### Success Criteria

- ✅ Created a rubric with at least 5 dimensions
- ✅ Each dimension has clear scoring definitions
- ✅ Rubric is customized for your project's needs

---

### Exercise 2.3 — Rubric Application (8 min)

**Objective**: Generate code and score it against your rubric.

**Steps**

**Step 1: Generate code**

In Agent mode:

```
Add a search feature to the products API. Support searching by name
and category with partial matching. Include tests.
```

**Step 2: Score each dimension**

Review the generated code and score it:

| Dimension | Score | Notes |
|-----------|-------|-------|
| Correctness | | |
| Completeness | | |
| Code Style | | |
| Security | | |
| Performance | | |
| Testability | | |
| **Average** | | |

**Step 3: Identify the weakest dimension**

Ask Copilot to fix only the weakest area:

```
The search feature you generated scores low on [dimension].
Specifically: [your notes]. Please improve only this aspect.
```

**Step 4: Re-score**

Score the improved version. Did the targeted fix work?

### Success Criteria

- ✅ Scored AI-generated code against all rubric dimensions
- ✅ Identified the weakest dimension
- ✅ Targeted improvement improved the score

---

### Exercise 2.4 — Automated Validation Pipeline (8 min)

**Objective**: Set up automated checks that validate agent output.

**Steps**

**Step 1: Ask the agent to add a feature with validation**

```
Add a new API endpoint for managing supplier contacts.
After creating the files, run these commands:
1. npm run lint
2. npx tsc --noEmit
3. npm test
Report the results of each command.
```

**Step 2: Observe the pipeline**

Watch the agent run each validation step. Note:

- Did lint pass on the first try?
- Did type checking pass?
- Did tests pass?
- If not, did the agent self-correct?

**Step 3: Create a validation script**

Create `scripts/validate-output.sh`:

```bash
#!/bin/bash
echo "=== Lint Check ==="
npm run lint
LINT=$?

echo "=== Type Check ==="
npx tsc --noEmit
TYPE=$?

echo "=== Tests ==="
npm test
TEST=$?

echo "=== Results ==="
echo "Lint: $([ $LINT -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Types: $([ $TYPE -eq 0 ] && echo 'PASS' || echo 'FAIL')"
echo "Tests: $([ $TEST -eq 0 ] && echo 'PASS' || echo 'FAIL')"
```

### Success Criteria

- ✅ Agent ran lint, type check, and tests
- ✅ Observed at least one validation gate in action
- ✅ Created a reusable validation script

---

### Exercise 2.5 — Feedback Loop (5 min)

**Objective**: Improve a prompt based on rubric evaluation.

**Steps**

**Step 1: Generate code with a basic prompt**

```
Add email validation to the supplier creation endpoint
```

Score the output against your rubric. Note the overall score.

**Step 2: Improve the prompt**

Based on weaknesses in the first output, add specific instructions to `copilot-instructions.md`:

```markdown
## Validation Patterns
- All input validation must use a dedicated validation function (not inline)
- Validation errors must return 400 with { success: false, error: "description" }
- Include both format validation and business rule validation
```

**Step 3: Regenerate with the same prompt**

Start a new session. Ask the same question:

```
Add email validation to the supplier creation endpoint
```

**Step 4: Re-score and compare**

Score the new output. Did the improved instructions raise the score?

### Success Criteria

- ✅ Generated code with a basic prompt and scored it
- ✅ Improved instructions based on weaknesses
- ✅ Regenerated and observed measurable improvement

---

### Exercise 2.6 — Cost-Aware Model Selection (8 min)

**Objective**: Understand model cost tiers and calculate the cost impact of model selection.

**Steps**

**Step 1: Review the model cost tiers**

| Tier | Models | Multiplier |
|------|--------|-----------|
| **Free** | GPT-4.1, GPT-4o, GPT-5 mini | 0x |
| **Budget** | Claude Haiku 4.5, Gemini 3 Flash, GPT-5.4 nano | 0.25–0.33x |
| **Standard** | Claude Sonnet 4/4.5/4.6, Gemini 2.5 Pro, GPT-5.2/5.4 | 1x |
| **Premium** | Claude Opus 4.5/4.6 (3x), Opus 4.7 / GPT-5.5 (7.5x) | 3–7.5x |

**Step 2: Calculate cost for three scenarios**

For each scenario, identify which model tier you'd use and the cost in premium requests:

| Scenario | Your Model Choice | Multiplier | Cost (requests) |
|----------|------------------|-----------|-----------------|
| Quick question: "What does this function do?" | ___ | ___ | ___ |
| Code review of an API route | ___ | ___ | ___ |
| Complex architecture decision (multi-file refactor) | ___ | ___ | ___ |

**Step 3: Enable auto model selection**

In VS Code, open the model picker in Copilot Chat and select **Auto**. This gives a 10% discount on multipliers.

Send a chat message and hover over the response to see which model was selected.

**Step 4: Compare your daily cost**

Estimate: if you send ~50 prompts per day, what's the cost difference between:

- All prompts on GPT-4o (0x) = ___
- All prompts on Claude Sonnet (1x) = ___
- All prompts on Claude Opus 4.7 (7.5x) = ___

### Success Criteria

- ✅ Can identify the four model cost tiers
- ✅ Calculated cost for three different scenarios
- ✅ Enabled auto model selection and observed the selected model
- ✅ Understand the daily cost difference between model tiers

</details>

---

<details>
<summary><h2>Lab 3: Troubleshooting & Diagnostics (36 min)</h2></summary>

> **Workshop Session**: 8 — Troubleshooting & Diagnostics

### Exercise 3.1 — Output Log Exploration (5 min)

**Objective**: Navigate output log channels and identify a completion event.

**Steps**

**Step 1: Open the Output panel**

Press `Ctrl+Shift+U` (Windows) or `Cmd+Shift+U` (Mac).

**Step 2: Select "GitHub Copilot"**

Choose the "GitHub Copilot" channel from the dropdown.

**Step 3: Trigger a completion**

Open a TypeScript file and start typing. Watch for new log entries.

**Step 4: Identify the completion event**

Find the log entry that corresponds to your completion. Note:

- Model used
- Response time
- Any warnings or errors

**Step 5: Check the Chat channel**

Switch to "GitHub Copilot Chat" channel. Send a chat message and find the corresponding log entry.

### Success Criteria

- ✅ Navigated to the correct output channels
- ✅ Identified a completion event in the logs
- ✅ Found a chat request/response in the logs

---

### Exercise 3.2 — Chat Debug Mode Analysis (8 min)

**Objective**: Use debug mode to analyze context composition.

**Steps**

**Step 1: Verify debug mode is on**

Confirm `github.copilot.chat.debugMode` is `true` in settings.

**Step 2: Send a simple message**

```
What is the OctoCAT Supply project about?
```

Open the Output panel → "GitHub Copilot Chat". Find the debug output. Note:

- System prompt tokens: ___
- Repository instructions tokens: ___
- Total input tokens: ___
- Model used: ___
- Response time: ___

**Step 3: Send a context-heavy message**

```
@workspace #file:api/routes/orders.ts #file:api/routes/products.ts Compare the error handling patterns in these two route files
```

Note the new token counts:

- Attached context tokens: ___
- Total input tokens: ___
- Difference from simple message: ___

**Step 4: Send a message with conversation history**

Continue the conversation with 3-4 follow-up questions. Watch the "Conversation history" token count grow.

**Step 5: Start a fresh session**

Open a new chat session. Send the context-heavy message again. Note:

- Conversation history tokens: ___ (should be 0)
- Total tokens saved: ___

### Success Criteria

- ✅ Read debug output and identified token counts
- ✅ Measured the token cost of `#file` attachments
- ✅ Observed conversation history growing
- ✅ Confirmed fresh sessions reduce total token usage

---

### Exercise 3.3 — Agent Debug Trace (10 min)

**Objective**: Trace a full agent iteration through debug logs.

**Steps**

**Step 1: Give the agent a task that requires multiple steps**

```
Add a new endpoint GET /api/products/low-stock that returns products
with inventory below a threshold (default 10, configurable via query param).
Include input validation and tests.
```

**Step 2: Open agent debug logs**

Command Palette → "GitHub Copilot: Open Agent Debug Log" (or check the Output panel for detailed agent logs).

**Step 3: Trace the full iteration**

Find and document each step:

| Step | Tool Call | Arguments | Result |
|------|----------|-----------|--------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| ... | | | |

**Step 4: Identify decision points**

For each iteration, note what the agent decided and why:

- After reading files: what approach did it choose?
- After lint/test results: did it self-correct?
- Final decision: how did it determine the task was complete?

### Success Criteria

- ✅ Traced at least 3 tool calls through the debug log
- ✅ Documented the agent's decision at each step
- ✅ Identified at least one self-correction (if any occurred)

---

### Exercise 3.4 — Failure Diagnosis (8 min)

**Objective**: Diagnose a failing scenario using logs.

**Steps**

**Step 1: Create a scenario that will fail**

Give the agent a task with a deliberate constraint that conflicts:

```
Create a new endpoint that uses the 'lodash' library to sort products by price.
Do not install any new packages. Run lint and tests after.
```

The agent should fail (lodash isn't installed) and need to find an alternative.

**Step 2: Trace the failure in logs**

When the agent encounters the error:

- What log entry shows the failure?
- What error message appears?
- What does the agent do next?

**Step 3: Document the diagnosis**

```
Symptom: [what you observed]
Root cause: [what the logs revealed]
Agent response: [how the agent handled it]
Resolution: [what ultimately happened]
```

**Step 4: Assess**

Did the agent's self-correction handle the failure well? Would you have intervened differently?

### Success Criteria

- ✅ Created a scenario that triggers a failure
- ✅ Found the failure in the debug logs
- ✅ Traced the agent's error recovery process
- ✅ Documented the diagnosis

---

### Exercise 3.5 — Diagnostics Export (5 min)

**Objective**: Collect and export a diagnostics bundle.

**Steps**

**Step 1: Collect diagnostics**

Command Palette → "GitHub Copilot: Collect Diagnostics"

**Step 2: Review the output**

Open the generated file and review:

- Extension version
- VS Code version
- Authentication status
- Configuration settings
- Recent log entries

**Step 3: Redact sensitive data**

Identify any sensitive information in the diagnostics:

- Personal access tokens
- Repository names (if private)
- User-specific settings

Note what you'd redact before sharing with support.

**Step 4: Create a diagnostic checklist**

Based on what you've learned, write a personal troubleshooting checklist:

```
When Copilot isn't working:
1. Check: [first thing to check]
2. Check: [second thing to check]
3. Check: [third thing to check]
...
```

### Success Criteria

- ✅ Successfully collected diagnostics
- ✅ Reviewed the diagnostic output
- ✅ Identified sensitive data that would need redaction
- ✅ Created a personal troubleshooting checklist

</details>

---

*Lab guide for GitHub Copilot Developer Training — Advanced Topics (Module 3 of 3)*
