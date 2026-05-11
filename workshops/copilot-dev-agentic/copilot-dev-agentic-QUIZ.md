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

*Quiz for Module 2: Agentic Patterns — GitHub Copilot Developer Training*
