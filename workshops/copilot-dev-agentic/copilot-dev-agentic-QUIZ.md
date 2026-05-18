# Module 2: Agentic Patterns — Quiz

---

### 1. Your teammate asks GitHub Copilot to rename a variable in one file, but you need GitHub Copilot to inspect several files, refactor a helper, update tests, and adapt the plan if it finds unexpected dependencies. Which approach is the best fit?

- A) Use a direct skill or one-shot command because every change is still deterministic
- B) Use an agent because the task is multi-step, requires judgment, and may need to adapt based on intermediate results
- C) Use `/init` because scaffolding is the fastest way to handle multi-file work
- D) Use a quiz-style prompt because that reduces the need for context

<!--answer: B-->
<!--explanation: Agents are the right fit for multi-step, adaptive work that requires judgment during execution. A direct skill or one-shot command is better for deterministic single-step tasks.-->

---

### 2. A team wants one workflow that can investigate a bug while a developer keeps coding locally, and another workflow that can take a GitHub issue, implement it in a cloud environment, and open a pull request. Which pairing is correct?

- A) Background agent for the local long-running investigation, and Coding Agent for the issue-to-PR cloud workflow
- B) `/init` for the local investigation, and Ask mode for the cloud pull request workflow
- C) Ask mode for the local investigation, and a file-scoped instruction for the cloud pull request workflow
- D) Coding Agent for both cases, because background agents and cloud agents are the same thing

<!--answer: A-->
<!--explanation: Background agents are suited to long-running work that continues while the developer does something else locally. Coding Agent is the cloud-oriented issue → branch → implement → pull request workflow.-->

---

### 3. Your organization blocks certain models at the org level. In your repository, you add `.github/copilot-instructions.md` asking GitHub Copilot to prefer a blocked model, and in a test instruction file you add test-specific formatting rules. What outcome should you expect?

- A) The repository instruction overrides the org policy because repo files are more specific than org settings
- B) The test instruction overrides both the repository instruction and the org policy
- C) The org policy still applies, while the repository and file-scoped instructions compose only within the allowed guardrails
- D) Only the session prompt applies because instruction files cancel each other out

<!--answer: C-->
<!--explanation: Organization-level guardrails cannot be overridden by repository or file-scoped instructions. More specific instructions can shape behavior only inside the boundaries allowed by the higher-level policy.-->

---

### 4. You are starting a new internal service and want GitHub Copilot to generate a sensible starter structure with tests and configuration, but you also want to avoid blindly committing generated boilerplate. What is the best practice?

- A) Run GitHub Copilot `/init`, then review the generated structure, dependencies, and defaults before committing
- B) Avoid `/init` completely because generated scaffolding should never be used in production
- C) Use `/init` and commit everything immediately so the project can evolve later
- D) Use a multi-agent workflow first, because `/init` is only for debugging existing projects

<!--answer: A-->
<!--explanation: `/init` is useful for accelerating project bootstrapping, but the generated output still needs human review. The correct practice is to inspect the scaffolded files, defaults, and dependencies before treating them as your project baseline.-->

---

### 5. Your team is considering a three-agent workflow: one agent writes code, one reviews for defects, and one adds tests. The actual task is a tiny one-file comment cleanup with no behavior change. Which answer best reflects a good multi-agent decision?

- A) Use the multi-agent workflow anyway because more agents always improve quality
- B) Skip automation entirely because agents should never handle low-risk tasks
- C) Use a single well-scoped agent or direct edit instead, because multi-agent coordination is overkill for such a small task
- D) Replace the three-agent workflow with `/init`

<!--answer: C-->
<!--explanation: Multi-agent orchestration is most valuable when specialized roles materially improve the outcome. For a tiny low-risk task, the coordination overhead outweighs the benefit, so a single scoped agent or direct edit is the better choice.-->

---

### 6. A developer's agent session has been running for 30 minutes and the context window is at ~70% capacity. The agent starts ignoring instructions from `copilot-instructions.md` and repeating earlier mistakes. What is the most likely cause?

- A) The model has a bug and needs to be restarted
- B) Recency bias — the model is deprioritizing the system prompt and instructions as the context fills with recent conversation
- C) The instructions file is too short and needs more detail
- D) The agent has permanently lost access to the instructions file

<!--answer: B-->
<!--explanation: At 60–70% context window fill, recency bias causes the model to deprioritize earlier tokens (including the system prompt and custom instructions) in favor of recent conversation. The fix is to start a fresh session with /clear rather than continuing to stack context.-->

---

### 7. Your team wants to reduce token costs by 50%. Which approach is most likely to succeed without degrading output quality?

- A) Remove all custom instructions to minimize input tokens
- B) Use the cheapest model for every task regardless of complexity
- C) Match model tier to task complexity (reasoning for planning, mid-tier for implementation, low-tier for simple edits) and split work into focused sessions
- D) Disable all tools so the agent cannot make tool calls

<!--answer: C-->
<!--explanation: Model selection is the biggest cost lever (up to 24× price difference between tiers). Matching model capability to task complexity — combined with task splitting to keep sessions focused — achieves cost reduction while maintaining quality. Removing instructions or using only cheap models degrades quality, which creates more retries and wastes more tokens overall.-->

---

### 8. A developer adds this instruction to `copilot-instructions.md`: "Here is a complete guide to React hooks including useState, useEffect, useCallback, useMemo..." (500 words of framework documentation). What is wrong with this approach?

- A) The instruction is too short to be useful
- B) Instructions should only contain test-related guidance
- C) Framework knowledge that already exists in training data wastes always-on context tokens without improving output quality
- D) Instructions must be written in YAML format, not prose

<!--answer: C-->
<!--explanation: Persistent instructions are sent on every single API call, so every token must earn its place. Framework documentation that already exists in the model's training data (React is ~80% of web training data) adds no value but consumes context budget on every request. Instructions should capture what the model cannot figure out independently — project-specific conventions, non-obvious patterns, and recurring agent failures.-->

---

### 9. A 50-step agent workflow has 99% accuracy on each individual step. What is the approximate probability that the entire workflow completes correctly end-to-end?

- A) 99%
- B) 95%
- C) 60%
- D) 8%

<!--answer: C-->
<!--explanation: The compounding error formula is 0.99^50 ≈ 0.605, or approximately 60%. This demonstrates why per-step quality is critical in multi-step agent workflows — even high single-step accuracy compounds into surprisingly low end-to-end success rates. At 95% per step, it drops to 0.95^50 ≈ 8%.-->

---

### 10. Which combination represents the optimal task-splitting strategy for a complex feature implementation?

- A) Use one long session with a reasoning model for research, planning, and implementation together
- B) Research with a cheap model (broad context), plan with a reasoning model (tight spec), implement with a mid-tier model (follow the spec)
- C) Skip research and planning entirely — go straight to implementation with the most expensive model
- D) Use a low-tier model for all phases to minimize cost

<!--answer: B-->
<!--explanation: The research → plan → implement split matches model tier to task requirements: cheap models for low-stakes discovery, reasoning models for the critical planning step that defines quality, and mid-tier models for execution where the spec eliminates ambiguity. This optimizes both cost and quality while keeping each context window clean and focused.-->

---

*Quiz for Module 2: Agentic Patterns — GitHub Copilot Developer Training*
