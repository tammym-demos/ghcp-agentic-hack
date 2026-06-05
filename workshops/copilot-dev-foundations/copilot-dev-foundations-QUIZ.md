# Module 1: Foundations — Quiz

---

### 1. You are exploring an unfamiliar repository and want GitHub Copilot to outline the safest implementation approach for a medium-sized change before any files are edited. Which option is the best fit?

- A) Use **Ask** mode and request a final code patch immediately
- B) Use **Plan** mode so GitHub Copilot can propose steps, risks, and validation without editing files
- C) Use **Agent** mode because it always provides the most accurate architectural explanation
- D) Start a brand-new session in **Agent** mode and skip any prompt details

<!--answer: B-->
<!--explanation: Plan mode is designed for analysis and implementation planning without making file changes. It is the safest choice when you want a structured proposal, risk awareness, and validation steps before execution.-->

---

### 2. You want GitHub Copilot to explain only a highlighted loop inside `parser.ts`, while still allowing it to reference the broader repository if needed. Which prompt setup is most effective?

- A) `@workspace Explain this project`
- B) `#file Explain everything in this file from top to bottom`
- C) `@workspace Explain #selection in the context of the surrounding project`
- D) Start a fresh session and paste the entire repository tree into chat

<!--answer: C-->
<!--explanation: `#selection` narrows the primary focus to the highlighted code, while `@workspace` supplies broader repo context when needed. This combination is more precise than asking about the whole file or entire project without scope.-->

---

### 3. Your team wants GitHub Copilot to always prefer early returns across the repo, but also wants test files to follow Arrange-Act-Assert without forcing that rule onto production code. Which setup is correct?

- A) Put every rule in `.github/copilot-instructions.md` and avoid scoped files
- B) Put the early-return rule in `.github/copilot-instructions.md` and the test-specific rule in `.github/instructions/tests.instructions.md`
- C) Put the test rule in `.github/prompts/tests.prompt.md` because prompts always load automatically
- D) Put both rules in a single `README.md` because GitHub Copilot reads all markdown equally

<!--answer: B-->
<!--explanation: Repository-wide rules belong in `.github/copilot-instructions.md`, while file-specific guidance belongs in `.github/instructions/*.instructions.md` with an appropriate `applyTo` scope. That keeps durable global guidance separate from targeted rules.-->

---

### 4. You need a fast answer for a routine question in a familiar codebase, but later you must reason through a multi-file refactor with several tradeoffs. Which model strategy is usually best?

- A) Always use the largest reasoning model for every request to maximize consistency
- B) Use a faster or routed default model for the routine question, then switch to a stronger reasoning model for the complex refactor
- C) Use inline completions for both tasks because they are optimized for deep architectural reasoning
- D) Avoid changing models because speed, reasoning depth, and premium usage are unrelated

<!--answer: B-->
<!--explanation: Smaller or routed default models are often a better fit for quick, low-risk tasks, while larger reasoning models are better reserved for complex planning and tradeoff-heavy work. This balances speed, quality, and cost.-->

---

### 5. A long chat thread began with debugging a failing test, then drifted into architecture discussions and terminal troubleshooting. GitHub Copilot now keeps referencing outdated assumptions from earlier in the conversation. What should you do next?

- A) Keep replying in the same session so GitHub Copilot has as much history as possible
- B) Start a new session focused on the current objective and restate the relevant context cleanly
- C) Switch to **Agent** mode because mode changes automatically clear stale context
- D) Remove all repository instruction files so the thread becomes shorter

<!--answer: B-->
<!--explanation: When a conversation has drifted or accumulated stale assumptions, starting a fresh session is the best way to reset context and reduce noise. Continue a session when the task is still coherent; start fresh when the objective or assumptions have changed.-->

---

### 6. A developer has been working in a single GitHub Copilot Chat session for 30 minutes. The context window is now around 60% full. They notice GitHub Copilot is ignoring their custom instructions and drifting from the original objective. What is the most likely cause?

- A) The custom instructions file has a syntax error and was never loaded
- B) Recency bias — as the context window fills, the model loses sight of the system prompt and earlier instructions in favor of recent conversation
- C) The model has a hard limit of 20 minutes per session before instructions expire
- D) Agent mode automatically disables custom instructions after 50% context usage

<!--answer: B-->
<!--explanation: Recency bias occurs at roughly 60–70% context fill. The model begins to favor recent conversation over earlier content like system prompts and custom instructions, causing drift. The solution is to start a fresh session and restate the objective clearly.-->

---

### 7. You want to reduce wasted tokens when prompting GitHub Copilot. Which combination of practices has the most impact?

- A) Always use the largest reasoning model and provide the entire repository as context
- B) Include explicit stop conditions in prompts, use smaller models for simple tasks, and add "be concise" to repository instructions
- C) Remove all instruction files so the context window is smaller
- D) Avoid using Agent mode entirely because it always generates excessive output

<!--answer: B-->
<!--explanation: Stop signals prevent over-execution, model selection avoids paying up to 24× more for routine tasks, and "be concise" in instructions measurably reduces output token volume. Together these address the three main sources of token waste without sacrificing quality.-->

---

*Quiz for Module 1: Foundations — GitHub Copilot Developer Training*
