# The Agentic Shift — Quiz

---

### 1. Your team says an agent keeps making poor next-step decisions because its test failures are summarized only as "validation failed." What is the best fix?

- A) Increase the number of retries so the agent has more chances to guess
- B) Improve the observation layer so the agent sees the exact command output, diff, and failing assertions
- C) Give the agent the full repository history before every attempt
- D) Skip validation until the final step so the loop moves faster

<!--answer: B-->
<!--explanation: Strong agentic loops depend on useful observations. Exact outputs make reflection better, while vague summaries lead to weak or repetitive decisions.-->

---

### 2. A repo-wide coding assistant is slow because every prompt includes 30 files plus repeated rules about allowed directories, validation commands, and review expectations. What redesign is best?

- A) Keep the large prompt, but add more chat history so the model can infer priorities
- B) Move durable repo rules into custom instructions and pass only the working-set files needed for this task
- C) Ask the agent to open every file first so it can build a complete mental model
- D) Remove file boundaries so the agent can decide what context matters on its own

<!--answer: B-->
<!--explanation: This reduces context bloat and keeps the working set focused. Durable guidance belongs in reusable instructions, while task prompts should stay narrow and relevant.-->

---

### 3. You want a coding agent to take a backlog item from issue to PR. Which setup reflects the safest workflow from this module?

- A) Let the agent keep editing until all checks pass, then allow it to merge automatically
- B) Start with a loosely worded issue so the agent has room to be creative
- C) Give the agent clear acceptance criteria, review PR updates and failed checks during execution, and require human approval before merge
- D) Skip intermediate review and focus only on whether the final summary sounds correct

<!--answer: C-->
<!--explanation: Coding agents work best on well-scoped tasks with explicit acceptance criteria. Higher autonomy requires stronger checkpoints, including PR review and final human approval.-->

---

### 4. A team wants an agent to pull approved ticket data and internal runbooks into its workflow without copying everything into the prompt each time. What is the best approach?

- A) Use MCP to connect approved tools and data sources, while still keeping scope limits and reviewer checkpoints
- B) Paste the full wiki and all open tickets into every request so nothing is missed
- C) Give the agent unrestricted web access and trust it to find the right sources
- D) Add more specialist agents first, then decide how they will access tools later

<!--answer: A-->
<!--explanation: MCP is the right pattern for giving agents structured access to approved external context and tools. It works best when paired with the same guardrails and supervision used elsewhere in the workflow.-->

---

*Quiz for The Agentic Shift module of Beyond Autocomplete — GitHub Copilot Developer Training*
