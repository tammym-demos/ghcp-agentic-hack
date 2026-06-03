# Module 3: Advanced Topics — Quiz

---

### 1. Your team wants GitHub Copilot to answer questions using an internal API catalog that is not stored in the repository. What is the best next step?

- A) Turn on `@workspace` so GitHub Copilot automatically searches every external system
- B) Configure an approved MCP server or integration that exposes the API catalog as a tool or resource
- C) Paste the entire API catalog into every chat prompt
- D) Rely on inline code completion because it has broader network access than chat

<!--answer: B-->
<!--explanation: MCP is the right fit when GitHub Copilot needs structured, repeatable access to an external system such as internal API documentation or service metadata.-->

---

### 2. Which item is the best candidate for GitHub Copilot memory instead of session-only context?

- A) A one-time reminder to use branch name `fix-login-today`
- B) A temporary note that this sprint excludes database changes
- C) A durable preference that your team writes integration tests before merging API changes
- D) The exact prompt you used earlier to debug a flaky build

<!--answer: C-->
<!--explanation: Memory works best for durable preferences and conventions that should help in future sessions, while one-off task details should stay ephemeral.-->

---

### 3. GitHub Copilot returned an answer that cited files you did not expect. What is the best way to diagnose what context it actually used?

- A) Open the VS Code Output panel, switch to GitHub Copilot Chat logs, and inspect the request payload
- B) Rephrase the prompt repeatedly until the answer changes
- C) Disable syntax highlighting so the model sees less code
- D) Close and reopen VS Code, because context cannot be inspected directly

<!--answer: A-->
<!--explanation: Chat and agent debug logs help you inspect the actual request, attached context, and resulting response so you can diagnose why the model answered the way it did.-->

---

### 4. In an agentic loop, what should happen immediately after the agent executes a step such as editing code or running a tool?

- A) End the task automatically because execution means the plan succeeded
- B) Observe the result, reflect on whether it moved the task forward, and adjust the next step if needed
- C) Ask the user to restate the original task before continuing
- D) Start a new loop with a different goal to avoid local optimization

<!--answer: B-->
<!--explanation: Agentic loops are iterative. After execution, the agent should inspect what happened, reflect on the outcome, and then continue or adjust instead of assuming success.-->

---

### 5. You ask GitHub Copilot to migrate a project to OAuth, but the repository has no authentication system and no deployment details. What is the best off-ramp behavior?

- A) Pick a popular OAuth library, rewrite the project, and hope the assumptions are acceptable
- B) Stop, explain what required context or prerequisites are missing, and hand the decision back to the human with options
- C) Continue with placeholder code and mark everything as complete
- D) Skip directly to updating documentation so the task appears partially finished

<!--answer: B-->
<!--explanation: Off-ramp design means the agent should not guess when critical context is missing. It should stop, explain the gap, and let the human choose the next path.-->

---

### 6. Your team has 8 MCP servers configured but only uses 2-3 on any given day. GitHub Copilot agents are frequently making unexpected tool calls to rarely-used servers. What is the best corrective action?

- A) Leave all servers active since GitHub Copilot should learn which ones to ignore over time
- B) Disable unused MCP servers and pair frequently-used ones with custom agents that restrict the active tool set
- C) Add instructions saying "never use MCP servers" to prevent all external tool calls
- D) Remove all MCP servers and rely solely on `@workspace` for external information

<!--answer: B-->
<!--explanation: Each active MCP server adds tool descriptions to every request, consuming tokens and creating opportunities for the agent to take unnecessary detours. Disabling unused servers and restricting tool sets per workflow keeps the agent focused and reduces token waste.-->

---

### 7. A developer wants GitHub Copilot to run `git log --oneline` to find recent commits. The team has both a Git MCP server and terminal access available. Which approach is generally more efficient?

- A) Always use the MCP server because it provides structured output
- B) Use the CLI directly — git commands are well-represented in training data and do not require MCP overhead
- C) Avoid both approaches and ask GitHub Copilot to guess the commit history from file contents
- D) Configure a new custom MCP server specifically for git operations

<!--answer: B-->
<!--explanation: Tools like git, npm, and docker are already dominant in model training data. For simple, well-known commands the CLI path is simpler and avoids the overhead of MCP tool descriptions and approval flows. MCP adds value when structured input/output, authentication, or state management is needed.-->

---

*Quiz for Module 3: Advanced Topics — GitHub Copilot Developer Training*
