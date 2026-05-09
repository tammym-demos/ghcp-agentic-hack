# Operating Copilot Responsibly — Quiz

---

### 1. Your team wants Copilot to inspect GitHub repo health before a full-stack reliability change. Which MCP server design is the safest first step?

- A) Expose a read-only `listOpenPullRequests` tool with explicit parameters and structured JSON output
- B) Expose a single `runGitHubTask` tool that accepts free-form text and can create, close, or merge PRs
- C) Give the server broad shell access so the model can choose any local command it wants
- D) Store a personal access token directly in `.vscode\mcp.json` so everyone can use the tool immediately

<!--answer: A-->
<!--explanation: The module recommends starting with one narrow, auditable, read-only tool that has a clear schema and structured output. Broad shell access, implicit writes, and hard-coded secrets increase risk and reduce control.-->

---

### 2. An agent proposes a refactor to the `orders` API. Which prompt and review plan best matches the module's evaluation guidance?

- A) "Improve the orders API" and merge if the diff looks cleaner than before
- B) "Refactor the `orders` API to remove duplicate validation logic, keep the response contract unchanged, and ensure all existing tests pass," then run tests and compare the contract
- C) "Make it more secure and faster," then judge the result by how confident the explanation sounds
- D) Ask for three alternative rewrites and choose the version with the shortest diff

<!--answer: B-->
<!--explanation: The workshop emphasizes SMART success criteria plus evidence-based verification. A measurable request tied to unchanged behavior and passing tests is stronger than trusting plausibility or style alone.-->

---

### 3. In VS Code, an agent keeps retrying a repo-metrics tool and claims it cannot access the data. What should you inspect first?

- A) The final natural-language answer only, because it summarizes the failure for you
- B) The git diff only, because tool failures do not matter if no files changed yet
- C) The Agent Debug Log panel and `MCP: List Servers` output to confirm tool attempts, server status, and auth or path problems
- D) Restart VS Code immediately without capturing logs, because fresh state is more useful than evidence

<!--answer: C-->
<!--explanation: The module teaches using evidence, not intuition, to debug agent behavior. Agent Debug logs and MCP server output reveal request flow, retries, server status, and configuration failures.-->

---

### 4. In a new Copilot CLI session, you need an uncommitted architecture diagram from last week's run and want the verified build command to be reusable for everyone in this repo. What is the best approach?

- A) Recreate the diagram manually and keep the build command only in the current prompt
- B) Use session history or persisted session artifacts to recover the diagram, and store the build command as a repository-scoped memory
- C) Store both the diagram and build command as user-scoped memories so they apply everywhere
- D) Put both items in `~/.copilot/copilot-instructions.md` because user instructions have the highest long-term priority

<!--answer: B-->
<!--explanation: Session storage is for recoverable work artifacts from earlier runs, while memories store durable conventions. A verified repo build command belongs in repository-scoped memory, not as a transient prompt or cross-repo personal preference.-->

---

*Quiz for the Operating Copilot Responsibly module of Beyond Autocomplete — GitHub Copilot Developer Training*
