# Controlling the Variables — Quiz

---

### 1. You just joined a repository and need to understand how authentication is enforced before proposing any code changes. Which Copilot approach is the best first step?

- A) Use Ask mode with `@workspace` to explain where authentication is enforced across the codebase
- B) Use a focused inline edit on the open file to rewrite the login flow immediately
- C) Use Agent mode to change the auth files and run tests before you understand the design
- D) Paste large code excerpts from several files into quick chat and ask for a summary

<!--answer: A-->
<!--explanation: Ask mode is intended for explanation and orientation before editing. Adding `@workspace` gives repo-wide context without prematurely delegating changes.-->

---

### 2. You are fixing a null reference inside one function in a large service file and want Copilot to stay tightly focused on the local code. What should you do first?

- A) Start with `@workspace` and all open tabs so Copilot sees as much context as possible
- B) Use `#file` or `#selection` for the target code and ask for the smallest safe fix
- C) Continue the same long-running chat session from an unrelated task so prior context is preserved
- D) Switch directly to Agent mode and let it inspect the whole repository before narrowing scope

<!--answer: B-->
<!--explanation: `#file` and `#selection` keep the request grounded in the most relevant code and reduce token waste. That improves the odds of a small, accurate fix instead of broad, noisy advice.-->

---

### 3. Your team wants Copilot to consistently use Jest patterns in test files and avoid changing production code when generating tests. Which action makes that guidance most durable?

- A) Re-type the same testing rules in every prompt
- B) Add repository instructions plus a file-scoped instruction for `**/*.test.*`
- C) Switch to a stronger model so it can infer the conventions on its own
- D) Keep one chat thread open for all testing work so Copilot remembers the pattern

<!--answer: B-->
<!--explanation: Stable rules belong in instructions, not repeated prompts or chat history. Repository instructions set the baseline, and file-scoped instructions specialize behavior for test files.-->

---

### 4. You need to compare two implementation approaches across four files, then make a bounded change and run validation commands. What is the best starting strategy?

- A) Use the fastest low-cost model in Ask mode because latency matters more than cross-file reasoning
- B) Use a stronger reasoning model first, then move to Agent mode when you want tool-assisted multi-step execution
- C) Stay in a focused inline edit workflow because file-by-file edits are always safer than broader reasoning
- D) Create a reusable prompt because prompts can perform terminal and file-edit skills on their own

<!--answer: B-->
<!--explanation: Cross-file comparison benefits from a stronger reasoning model, and Agent mode is appropriate once the task expands to edits and commands. Agent workflows can use skills like file operations and terminal access, while reusable prompts do not replace that tool use.-->

---

*Quiz for the Controlling the Variables module of Beyond Autocomplete — GitHub Copilot Developer Training*
