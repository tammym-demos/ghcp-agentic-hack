# GitHub Copilot Developer Workshop — Final Lab (60 min)
**Duration:** 2:15–3:30 PM (final hour of one-day intensive)

**Learning Outcomes:**
- Create custom instructions that shape Copilot's behavior on your team
- Build and test custom agents with distinct personas and capabilities
- Observe and understand the Plan-Act-Observe-Reflect loop in action
- Leave with production-ready `.github` configuration to use Monday morning

---

## ⚡ PART 1: Environment Setup (5 minutes)

### Checklist for Attendees
Before we start, verify you have:

```
☐ VS Code installed (latest version)
☐ GitHub Copilot and Copilot Chat extensions (enabled)
☐ Logged into Copilot with GitHub account
☐ Node.js 16+ installed (check: node --version)
☐ Git installed and configured
☐ A folder open in VS Code
```

### Quick Test: "Can You Talk to Copilot?"
1. Open VS Code
2. Press `Ctrl+Shift+I` (macOS: `Cmd+Shift+I`) to open Copilot Chat
3. Ask: `What programming languages do you support?`
4. **Success:** Copilot responds within 3–5 seconds
5. **Blocker:** See [Troubleshooting](#troubleshooting-for-facilitators) section

### Demo Repository (Optional, but Recommended)
If you haven't already, clone the sample repo:
```bash
git clone https://github.com/microsoft/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
code .
```

This repository contains example custom instructions and agents that we'll reference throughout the lab.

---

## 💡 PART 2: Exercise 1 — Write Custom Instructions (15 minutes)

### What Are Custom Instructions?
Custom instructions are a `.github/copilot-instructions.md` file that define **team-wide coding standards, architecture patterns, and best practices**. Think of it as a "playbook" that Copilot reads before helping your team write code.

### Why This Matters (Real-World Context)
- **Consistency:** Every team member's Copilot behaves the same way
- **Speed:** No need to explain your conventions repeatedly ("we use TypeScript everywhere")
- **Compliance:** Enforce security or accessibility standards automatically
- **Onboarding:** New developers see the team playbook instantly

### The Task (Do This Now)

**Step 1:** In your VS Code project, create a new folder and file:
```
.github/
  └─ copilot-instructions.md
```

**Step 2:** Write instructions for a **sample project** (real or fictional). Here's a starter template:

```markdown
# GitHub Copilot Custom Instructions

## Team Context
- **Project:** MyApp (React + Node.js backend)
- **Language:** TypeScript (required for all components)
- **Team Size:** 5 developers

## Code Style & Standards

### TypeScript
- All new code must be TypeScript (no `.js` files)
- Use strict mode: `"strict": true` in tsconfig.json
- All function parameters and return types must be explicitly typed
- No `any` type—use proper typing or generic types

### React Components
- Use functional components with hooks (no class components)
- Follow Atomic Design: Atoms < Molecules < Organisms
- Every component exports a TypeScript interface for props
- Use `React.FC<Props>` for type safety

### File Organization
```
src/
  ├─ components/
  │  ├─ atoms/        (Button, Input, Label)
  │  ├─ molecules/    (SearchBar, Card, Modal)
  │  └─ organisms/    (Header, Sidebar)
  ├─ hooks/
  ├─ utils/
  └─ types/
```

### API & Backend
- All API responses must be typed (use `interface` or `type`)
- HTTP requests use Fetch API or Axios with timeout of 10 seconds
- Error handling: Always catch errors and return descriptive messages
- Database queries use parameterized statements (prevent SQL injection)

## Testing
- Unit tests for utilities and hooks (Jest)
- Component tests with React Testing Library
- Minimum 70% code coverage for new code
- Test file naming: `[Component].test.ts(x)`

## Commits & PRs
- Commit messages: `type(scope): description` (e.g., `feat(auth): add login form`)
- Squash commits before merging (one feature = one commit)
- PRs require at least one approval before merge

## Security & Performance
- No API keys in code (use environment variables)
- Lazy-load large components with React.lazy()
- Optimize images: WebP format, max 100KB per image
- Never commit node_modules, .env, or secrets

## Accessibility
- All buttons and interactive elements must be keyboard-accessible
- Use semantic HTML: `<button>`, `<nav>`, `<main>` instead of `<div>`
- Alt text required for all images
- ARIA labels for screen readers where needed

## Questions or Updates?
See CONTRIBUTING.md or ask in #engineering-standards on Slack.
```

**Step 3:** Customize This Template
- Replace "MyApp" with your actual project name
- Add 2–3 specific conventions your team uses
- Remove sections that don't apply to your stack
- **Minimum:** Keep the structure clear and actionable

**Step 4:** Test Your Instructions with Copilot
1. **Enable inline completions** (Copilot should be enabled by default)
2. In your project, create a test file: `test-instructions.tsx`
3. Start typing a React component:
   ```typescript
   interface ButtonProps {
     label: string;
   }

   export const Button: React.FC<ButtonProps> = ({ label }) => {
     return <button>{label}</button>;
   };
   ```
4. Continue typing and let Copilot auto-complete the next line
5. **Observation:** Does Copilot's suggestion follow your conventions? (e.g., TypeScript types, component structure)

### Success Criteria
✅ **You've created a `.github/copilot-instructions.md` file** with:
- [ ] Clear team context at the top
- [ ] At least 4 specific coding standards (language, style, testing, etc.)
- [ ] File organization / architecture expectations
- [ ] Security or accessibility guidelines
- [ ] Actionable rules (not vague statements like "write good code")

### Bonus Challenge (If Finished Early)
- **Add a "Code Review Checklist"** section: "Before submitting a PR, ensure..."
- **Add version control guidance:** "When should you create a branch? How often commit?"
- **Test it:** Ask Copilot Chat: "What are the team standards for this project?" — it should cite your instructions.

---

## 🤖 PART 3: Create a Custom Agent (20 minutes)

### What Is a Custom Agent?
An **agent** is a specialized version of Copilot with its own personality, tools, and instructions. It's like hiring a team member with a specific job title:
- "This is our **code reviewer** — they catch edge cases and security issues"
- "This is our **performance engineer** — they optimize queries and load times"

### Why This Matters (Real-World Context)
- **Specialization:** Different agents for different roles (testing, documentation, security)
- **Consistency:** Same agent reviews all PRs with the same standards
- **Autonomy:** Agent can work independently (run tests, make commits, etc.)
- **Learning:** Agents can be tuned based on feedback over time

### The Task (Do This Now)

**Step 1:** Create the agents directory:
```
.github/
  ├─ copilot-instructions.md
  └─ agents/
      ├─ code-reviewer.md
      └─ (optional) performance-optimizer.md
```

**Step 2:** Write your first agent — the **Code Reviewer**:

```markdown
# Code Reviewer Agent

## Persona
You are a **meticulous code reviewer** with 10 years of experience. You catch subtle bugs, security issues, and performance problems that others miss. You're thorough but kind—your goal is to make code better, not to criticize.

## Your Role
- Review pull requests and code snippets
- Identify potential bugs, logic errors, and edge cases
- Flag security vulnerabilities (SQL injection, XSS, insecure dependencies)
- Suggest performance optimizations
- Check for violations of team standards (see: `.github/copilot-instructions.md`)

## Tools You Have Access To
- Read and analyze code files
- Execute tests (Jest, pytest, etc.)
- Run linters and static analysis tools
- Check git history and blame

## Your Review Process (Plan-Act-Observe-Reflect)

### Plan
1. Understand the PR intent: "What is this code trying to do?"
2. Identify high-risk areas (auth, database, payment processing)
3. Check for violations of team standards

### Act
1. Read the code thoroughly, line by line
2. Examine dependencies and imports
3. Run tests to see if they pass
4. Execute the code if safe to do so

### Observe
1. Does code do what the PR description says?
2. Do all tests pass?
3. Are there edge cases not covered?
4. Do variable names match team conventions?

### Reflect
1. Summarize findings clearly
2. Prioritize issues: Critical bugs first, then style suggestions
3. Provide actionable fixes (not just "this is bad")
4. Praise good patterns or fixes

## Response Format
Use this template for every review:

```
## Review Summary
[One-sentence overall assessment]

## Critical Issues ⛔
- [Issue 1]: [Explanation]. Fix: [Suggestion]
- [Issue 2]: ...

## Improvements 💡
- [Suggestion 1]: [Explanation]

## Questions ❓
- [Question 1]: [Why are you asking?]

## Approved? ✅ / Needs Changes? 🔄
[Clear statement of approval or required changes]
```

## Guidelines
- **Be specific:** Cite line numbers, variable names, function calls
- **Provide examples:** Show the fix, not just the problem
- **Explain why:** "This could cause a race condition because..."
- **Respect context:** If the author explains a design choice, acknowledge it
- **Focus on impact:** Prioritize bugs over style issues
```

**Step 3:** Test Your Agent
Now ask Copilot to use this agent persona. In VS Code:

1. Open Copilot Chat (`Ctrl+Shift+I`)
2. Paste or type a small code snippet with a deliberate bug:
   ```typescript
   // Buggy code
   function fetchUserData(userId) {
     let userData = null;
     fetch(`/api/user/${userId}`)
       .then(res => res.json())
       .then(data => userData = data);
     return userData; // ⚠️ Returns null! (race condition)
   }
   ```
3. Ask: `You are the Code Reviewer agent. Review this code.`
4. **Observe:** Does the agent:
   - [ ] Identify the race condition?
   - [ ] Explain why it's a problem?
   - [ ] Suggest a fix (async/await, promise chaining, etc.)?
   - [ ] Reference team standards?

### Success Criteria
✅ **You've created a `.github/agents/code-reviewer.md` with:**
- [ ] Clear persona and role description
- [ ] Specific tools and capabilities
- [ ] Defined review process (Plan-Act-Observe-Reflect)
- [ ] Response format template
- [ ] Tested with a sample code snippet
- [ ] Agent identified at least one real issue

### Bonus Challenge (If Finished Early)
**Create a second agent: Performance Optimizer**

```markdown
# Performance Optimizer Agent

## Persona
You are a **performance engineer** obsessed with speed. You profile code, spot bottlenecks, and suggest optimizations. You think about database queries, caching, lazy-loading, and bundle size.

## Your Role
- Identify slow queries, N+1 problems, memory leaks
- Suggest caching strategies (Redis, React.memo, etc.)
- Recommend code splitting and lazy-loading
- Profile bundle size and suggest tree-shaking

## Response Format
- **Bottleneck:** [What's slow?]
- **Why:** [Explanation with metrics if possible]
- **Fix:** [Optimization with code example]
- **Impact:** [Expected improvement: "x ms faster" or "y% smaller bundle"]
```

Then test it on a slow code example (a nested loop, unoptimized query, etc.).

---

## 🔄 PART 4: Test the Plan-Act-Observe-Reflect Loop (15 minutes)

### What Is PAOR?
The **Plan-Act-Observe-Reflect** loop is how Copilot agents think through complex problems:

1. **Plan:** Agent breaks down the task and decides on an approach
2. **Act:** Agent executes the plan (writes code, runs commands, etc.)
3. **Observe:** Agent checks results and identifies issues
4. **Reflect:** Agent adjusts approach and corrects mistakes

In this exercise, you'll **watch this loop happen in real time**.

### Why This Matters (Real-World Context)
- **Understanding PAOR helps you:**
  - Debug why an agent made a mistake
  - Improve agent instructions ("I noticed you skipped the testing step")
  - Know when to step in vs. let the agent iterate

### The Task (Do This Now)

**Step 1:** Create a test file with a real problem:

```typescript
// src/utils/calculateDiscount.ts
// Problem: Synchronous, no error handling, missing edge cases

export function calculateDiscount(price: number, discountPercent: number) {
  return price * (1 - discountPercent / 100);
}

// Test case (will fail):
const result = calculateDiscount(100, 20);
console.log(result); // Should be 80, but what if price is negative? What if discountPercent > 100?
```

**Step 2:** Ask Copilot (in agent mode) to solve this multi-step problem:

Open Copilot Chat and ask:
```
You are the Code Optimizer Agent (based on our team standards in .github/).

Refactor this function to:
1. Handle async operations (pretend it calls an API to fetch exchange rates)
2. Add proper error handling (validate inputs, catch errors)
3. Add TypeScript types for all parameters and return values
4. Write unit tests using Jest
5. Explain your changes and show me the final result

Here's the current code:
[paste the code above]
```

**Step 3:** Observe the PAOR Loop
As Copilot works, watch for these markers:

| Phase | What to Look For | Example |
|-------|------------------|---------|
| **Plan** | "I need to...", "First, I'll...", "The approach is..." | "I'll convert this to async, add validation, write tests" |
| **Act** | Code changes, new files created, commands executed | Seeing typed function, error handling, test code |
| **Observe** | "Let me check...", "I see an issue...", test results | "This should handle negative prices" |
| **Reflect** | "I should revise...", "I missed...", adjustments made | Agent fixes the error and re-explains |

**Step 4:** Document Your Observations
As you watch, note:

1. **Plan Phase:** What did Copilot say it would do?
   ```
   [Write 1-2 sentences here]
   ```

2. **Act Phase:** What code did Copilot generate? (Copy one snippet)
   ```typescript
   [Paste one key function or change here]
   ```

3. **Observe Phase:** What validation or testing did Copilot do?
   ```
   [Note any tests run, errors caught, etc.]
   ```

4. **Reflect Phase:** Did Copilot self-correct or revise anything?
   ```
   [Describe any changes Copilot made after observing issues]
   ```

### Success Criteria
✅ **You can identify:**
- [ ] At least one "Plan" statement from Copilot
- [ ] At least one "Act" (code generation)
- [ ] At least one "Observe" (validation or testing)
- [ ] Bonus: One "Reflect" (self-correction)

### Advanced: View Debug Logs
To see the agent's full reasoning (including failed attempts), enable Copilot debug logs:

1. Press `Ctrl+Shift+P` (macOS: `Cmd+Shift+P`)
2. Type: `Copilot: Show Logs`
3. A debug panel opens showing:
   - Agent messages and reasoning
   - Tool calls and results
   - Iteration count (how many times it tried)
4. Look for patterns: When does it plan? When does it act? How does it self-correct?

### Bonus Challenge (If Finished Early)
**Ask a second, harder problem:**
```
Using the Code Reviewer agent, review this async refactor and identify any remaining issues (memory leaks, edge cases, etc.)
```

Watch how the reviewer agent uses the refactored code and validates it.

---

## 🎯 PART 5: Wrap-up & Reflection (5 minutes)

### Your Takeaways
You've now:
- ✅ Written **custom instructions** to guide Copilot's behavior on your team
- ✅ Created **custom agents** with specific personas and roles
- ✅ Observed the **Plan-Act-Observe-Reflect loop** in action
- ✅ Built real `.github` configuration you can use Monday morning

### Reflection Questions (Pick One to Share)
1. **"Which takeaway from today will you use first?"**
   - Custom instructions on my team project?
   - A custom agent for code review?
   - Understanding agent reasoning (debug logs)?

2. **"What's one thing you're trying with Copilot this week?"**
   - Onboarding new developers with custom instructions?
   - Automating code review?
   - Pairing with an agent on a hard problem?

3. **"What blockers did you hit, and how will you solve them?"**
   - Extension not responding? (Check login, restart VS Code)
   - Instructions not working? (Validate YAML syntax, file path)
   - Agent not following persona? (Be more explicit, give examples)

### Key Resources
- **GitHub Copilot Docs:** https://docs.github.com/en/copilot
- **Custom Instructions Guide:** https://docs.github.com/en/copilot/customizing-copilot/overview-of-github-copilot-customization
- **Agents Documentation:** https://docs.github.com/en/copilot/using-github-copilot/using-agentic-features
- **Example Repository:** https://github.com/microsoft/GitHubCopilot_Customized
- **Community Forum:** https://github.com/orgs/github/discussions (search "Copilot")
- **Office Hours:** [Insert your team's office hours link]

### Next Steps (This Week)
1. **Monday:** Deploy your custom instructions to your team repo
2. **Tuesday:** Have 1–2 team members test and give feedback
3. **Wednesday:** Add a second agent (reviewer, architect, security specialist)
4. **Friday:** Reflect: "What's working? What needs adjustment?"

---

## 🆘 Troubleshooting for Facilitators

### Q: "Copilot won't respond in Chat"
**Checklist:**
- [ ] GitHub Copilot extension installed? (`Extensions` sidebar → search "Copilot" → Install if missing)
- [ ] Copilot Chat extension installed? (Separate extension; search "Copilot Chat")
- [ ] Logged into GitHub? (Click Copilot icon → "Sign in")
- [ ] Internet connection? (Copilot requires live connection)
- [ ] VS Code fully restarted? (Close all windows, reopen)

**Fix:** Restart VS Code entirely. If still broken, reinstall extensions.

---

### Q: "Custom instructions don't seem to work"
**Checklist:**
- [ ] File path correct? Must be `.github/copilot-instructions.md` (exact capitalization)
- [ ] File syntax valid? (Use a YAML validator: https://codebeautify.org/yaml-validator)
- [ ] Content is text, not binary? (Open in VS Code, should see readable text)
- [ ] Folder opened in VS Code? (Copilot needs access to workspace)
- [ ] Tried closing and reopening the file?

**Fix:** 
1. Run this command to verify file structure:
   ```bash
   find .github -name "copilot-*" -type f
   ```
   Should output:
   ```
   .github/copilot-instructions.md
   ```

2. If file exists but Copilot still doesn't follow instructions, try asking explicitly:
   ```
   What are the coding standards for this project? (Check .github/copilot-instructions.md)
   ```
   If Copilot cites the file, it's working—just be more explicit in your requests.

---

### Q: "Agent isn't following the persona I defined"
**Checklist:**
- [ ] Persona is clear and specific? ("meticulous code reviewer" is better than "good at reviews")
- [ ] Examples provided? ("Look for SQL injection, missing null checks, etc.")
- [ ] Using **Agent mode** (not Chat)? (Agents have more context capacity)
- [ ] Instructions are in `.github/agents/` folder? (Separate from copilot-instructions.md)

**Fix:**
- **Be extremely explicit.** Instead of "be a code reviewer," try:
  ```
  You are a code reviewer. Your job is to:
  1. Identify bugs (race conditions, null pointer exceptions)
  2. Flag security issues (SQL injection, hardcoded secrets)
  3. Check for violations of [link to team standards]
  4. Provide fixes with code examples
  5. Use this format: [format here]
  ```

- **Show examples.** "Here's a bad example: [code]. Here's the fix: [code]."

---

### Q: "I don't see debug logs"
**Steps to Enable:**
1. Press `Ctrl+Shift+P` (macOS: `Cmd+Shift+P`)
2. Type: `Copilot: Show Logs` (not "Debug" — it's "Show Logs")
3. Select it and press Enter
4. A new panel opens at the bottom showing logs in real-time
5. Run a Copilot Chat command and watch logs appear

**What to Look For:**
- **Agent Planning:** "I need to check if this is a race condition"
- **Tool Calls:** "Calling tool: RunTests with args: [...]"
- **Observations:** "Tests passed: 5/5" or "Found issue: [...]"
- **Iterations:** If you see the same tool called twice, agent is iterating

**If Logs Don't Appear:**
- Copilot extension might be disabled (check Extensions sidebar)
- Try a fresh Copilot Chat message to trigger logs
- Logs may scroll past quickly—look in the bottom panel

---

### Q: "File not created or saved?"
**Steps:**
1. Check file explorer in VS Code (Ctrl+Shift+E)
2. Look for `.github/` folder—should appear in the tree
3. If not visible, press the "Refresh" button (circle icon) in File Explorer
4. If file exists but won't save, check:
   - [ ] Do you have write permissions to the folder?
   - [ ] Is the file marked as read-only? (right-click → Properties)
   - [ ] Try `File → Save As` and re-save

**Pro Tip:** Use the terminal to verify:
```bash
ls -la .github/
cat .github/copilot-instructions.md  # Should show your text
```

---

### Q: "Agent responses are too generic or not helpful"
**Root Causes:**
1. **Instructions too vague.** "Be helpful" → "Find SQL injection vulnerabilities by checking for unescaped user input in database queries"
2. **Context not provided.** Paste the actual code, not just "review this function"
3. **Agent not in focus.** If you're asking Chat mode, not Agent mode, agent won't use full capabilities
4. **No examples.** Agents learn from examples—show "good" vs "bad" code

**Fix:**
```
Instead of: "Review my code"
Try: "You are a code reviewer trained in security. Review this function for:
1. SQL injection (check for unescaped user input)
2. Race conditions (async operations without await)
3. Memory leaks (unclosed file handles, event listeners)
Here's the code: [full code]"
```

---

### Q: "My team hasn't adopted custom instructions yet—how do I get buy-in?"
**Strategy:**
1. **Show value:** "With custom instructions, new developers don't need to ask about our naming conventions"
2. **Start small:** One agent (code reviewer) vs. a big process overhaul
3. **Measure impact:** "How many PR comments are 'use TypeScript instead of JS'? This eliminates that."
4. **Iterate:** First version doesn't have to be perfect—improve based on feedback

---

## 📊 Lab Success Metrics
By the end of the lab, attendees should have:

| Metric | What to Check |
|--------|---------------|
| **Environment Ready** | Copilot responds in Chat; VS Code open and connected |
| **Custom Instructions** | `.github/copilot-instructions.md` file created with 4+ standards |
| **Agent Created** | `.github/agents/code-reviewer.md` file created and tested |
| **PAOR Observed** | Attendee documented at least 3/4 PAOR phases from agent run |
| **Artifact Useful** | Attendee states "I'll use this configuration on my team project Monday" |

---

## ⏰ Time Management Tips for Facilitators

| Time | Activity | Notes |
|------|----------|-------|
| 2:15–2:20 | Setup & Test | Quick check-in; troubleshoot blockers |
| 2:20–2:35 | Exercise 1 (Custom Instructions) | Circulate; help with YAML syntax if needed |
| 2:35–2:55 | Exercise 2 (Custom Agent) | Pair programming available; some will finish early |
| 2:55–3:10 | Exercise 3 (PAOR Loop) | Have pre-written buggy code ready for those who need it |
| 3:10–3:25 | Wrap-up & Reflection | Go around; let 2–3 people share takeaways |
| 3:25–3:30 | Resources & Next Steps | Paste links in chat; offer office hours |

---

## 🎓 Additional Notes for Facilitators

### If You Have Extra Time
- **Deep dive on Debug Logs:** Walk through a full PAOR loop, explaining each log message
- **Security Specialization:** Create a `.github/agents/security-auditor.md` together
- **Real PR Exercise:** Have attendees run the Code Reviewer agent on a real PR from the demo repo
- **Customization Ideas:** Brainstorm agents for their specific team needs (performance, documentation, etc.)

### If You're Running Behind
- **Skip:** Bonus challenges and debug logs section (focus on core PAOR loop)
- **Combine:** Exercises 2 and 3 into one: "Create agent + test it on a problem"
- **Provide:** Pre-written custom instructions and agents (just have them review and test)

### Accessibility Notes
- **Color/Vision:** Debug logs are text-based; screenshots can help explain layout
- **Neurodiversity:** Provide printed checklist for setup (vs. relying on screen reading)
- **Language:** Use concrete examples over abstract explanations

---

## 📝 Lab Attendance Tracking (Optional)

Use this checklist to ensure everyone completes key milestones:

```markdown
| Attendee | Setup ✅ | Exercise 1 ✅ | Exercise 2 ✅ | Exercise 3 ✅ | Artifacts Saved ✅ |
|----------|----------|--------------|--------------|--------------|------------------|
| Alice    |          |              |              |              |                  |
| Bob      |          |              |              |              |                  |
```

---

**Lab Guide Created:** April 28, 2026
**Last Updated:** April 28, 2026
**Facilitator Contact:** [Email / Slack]
