# GitHub Copilot Developer Training — Foundations — Hands-On Lab Guide

**Duration**: ~75 minutes of hands-on exercises (across a ~3-hour module)  
**Format**: Step-by-step lab exercises aligned to workshop sessions  
**Audience**: Developers starting with GitHub Copilot  
**Repo**: [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized) (OctoCAT Supply)

> **Part of the Copilot Developer Training curriculum** ([Foundations LAB](../copilot-dev-foundations/copilot-dev-foundations-LAB.md) · [Agentic Patterns LAB](../copilot-dev-agentic/copilot-dev-agentic-LAB.md) · [Advanced Topics LAB](../copilot-dev-advanced/copilot-dev-advanced-LAB.md)). This lab can be completed standalone.

---

## Lab Overview

These labs cover the foundational skills for working with GitHub Copilot: chat interface, context management, instructions, and model/token awareness. Each lab maps to a workshop session.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | With Copilot Pro, Business, or Enterprise license |
| **VS Code** | Latest stable (or Insiders for preview features) |
| **Copilot Extension** | GitHub Copilot + GitHub Copilot Chat extensions installed |
| **Node.js** | Version 18 or higher |
| **Git** | For cloning the demo repository |

### Setup Checkpoint

Before starting, ensure your environment is ready:

```bash
git clone https://github.com/<YOUR-USERNAME>/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
npm install
npm run build
npm run dev
```

- ✅ API running at `http://localhost:3000`
- ✅ Frontend running at `http://localhost:5137`
- ✅ Copilot extension active in VS Code

### Lab Summary

| Lab | Workshop Section | Duration | Exercises |
|-----|-----------------|----------|-----------|
| 1 | Session 1: Copilot Chat Tour | 28 min | 5 exercises |
| 2 | Session 2: Memory & Context | 31 min | 5 exercises |
| 3 | Session 3: Models, Agents & Tokens | 33 min | 5 exercises |

---

<details>
<summary><h2>Lab 1: Copilot Chat Tour (28 min)</h2></summary>

> **Workshop Session**: 1 — Copilot Chat Tour

### Exercise 1.1 — Inline Completions (5 min)

**Objective**: Practice accepting, rejecting, and partially accepting inline completions.

**Steps**

**Step 1: Create a new file**

Create a new file `api/utils/order-helpers.ts`.

**Step 2: Write a comment and accept a completion**

Type the following comment and press Enter:

```typescript
// Calculate the total price for an order including tax and discount
```

Wait for ghost text to appear. Press **Tab** to accept the full suggestion.

**Step 3: Try partial accept**

Write a new function signature:

```typescript
function validateOrderItems(items: OrderItem[]): ValidationResult {
```

When ghost text appears, use **Ctrl+Right** (Windows) or **Cmd+Right** (Mac) to accept word-by-word.

**Step 4: Try pattern continuation**

Start an array of status values:

```typescript
const ORDER_STATUSES = ['pending',
```

Accept the completion — Copilot should continue the pattern.

**Step 5: Reject a completion**

Write a comment that's ambiguous, see the suggestion, and press **Esc** to reject it. Then rephrase your comment more precisely and compare the new suggestion.

### Success Criteria

- ✅ Accepted a full completion with Tab
- ✅ Partially accepted with Ctrl+Right (word-by-word)
- ✅ Observed pattern continuation
- ✅ Rejected a completion and got a better one with a clearer comment

---

### Exercise 1.2 — Slash Command: /explain (5 min)

**Objective**: Use `/explain` to understand unfamiliar code.

**Steps**

**Step 1: Find a complex function**

Open `api/routes/orders.ts` and select the main POST handler (the function that creates a new order).

**Step 2: Run /explain**

Open the Chat panel (`Ctrl+Shift+I`) and type:

```
/explain
```

with the code selected.

**Step 3: Evaluate the explanation**

- Does it correctly describe what the function does?
- Does it identify the key logic steps?
- Does it mention error handling?

**Step 4: Compare with a different function**

Select a simpler utility function and run `/explain` again. Compare the depth of explanation.

### Success Criteria

- ✅ Used `/explain` on selected code
- ✅ Explanation accurately describes the function's purpose
- ✅ Compared explanations for complex vs. simple functions

---

### Exercise 1.3 — Slash Command: /fix (5 min)

**Objective**: Use `/fix` to correct a deliberate bug.

**Steps**

**Step 1: Introduce a bug**

Open `api/utils/order-helpers.ts` (or any utility file) and introduce a deliberate error. For example, change a `>` to `<` in a comparison, or misspell a variable name.

**Step 2: Select the buggy code**

Select the lines containing the bug.

**Step 3: Run /fix**

```
/fix
```

**Step 4: Evaluate the fix**

- Did Copilot identify the correct issue?
- Is the fix appropriate?
- Did it change anything else it shouldn't have?

### Success Criteria

- ✅ Introduced a deliberate bug
- ✅ `/fix` correctly identified and resolved the issue
- ✅ Verified the fix didn't introduce side effects

---

### Exercise 1.4 — Context Targeting (8 min)

**Objective**: Compare responses with and without explicit context.

**Steps**

**Step 1: Ask without context**

In the Chat panel (Ask mode), type:

```
How does this project handle database connections?
```

Note the response — it may be generic or partially accurate.

**Step 2: Ask with @workspace**

```
@workspace How does this project handle database connections?
```

Compare — `@workspace` should find the actual database configuration files.

**Step 3: Ask with specific #file**

```
@workspace #file:api/db/connection.ts How does this project handle database connections?
```

Compare all three responses for precision and accuracy.

**Step 4: Try @terminal**

Run a command that produces an error (e.g., `npm run nonexistent`), then ask:

```
@terminal What went wrong with the last command?
```

### Success Criteria

- ✅ Compared responses: no context vs. `@workspace` vs. `#file`
- ✅ Observed the quality improvement with explicit context
- ✅ Used `@terminal` to diagnose a command error

---

### Exercise 1.5 — Session Management (5 min)

**Objective**: Practice creating and switching between chat sessions.

**Steps**

**Step 1: Create session for exploration**

Open a new chat session. Ask an exploratory question:

```
@workspace What are the main entities in this project's data model?
```

**Step 2: Create session for a task**

Open a second chat session (click the + icon). Start a different conversation:

```
@workspace #file:api/routes/products.ts What improvements could be made to this route?
```

**Step 3: Switch between sessions**

Switch back to session 1. Ask a follow-up question. Note that the context from session 1 is preserved and session 2's context is separate.

**Step 4: Clear a session**

In one of the sessions, type `/clear` and note the history is erased.

### Success Criteria

- ✅ Created at least 2 separate chat sessions
- ✅ Verified context is separate between sessions
- ✅ Used `/clear` to reset a session

</details>

---

<details>
<summary><h2>Lab 2: Memory & Context (31 min)</h2></summary>

> **Workshop Session**: 2 — Memory & Context

### Exercise 2.1 — Repository Instructions (8 min)

**Objective**: Create `.github/copilot-instructions.md` and observe Copilot following your rules.

**Steps**

**Step 1: Create the instructions file**

Create `.github/copilot-instructions.md` with the following content:

```markdown
# Copilot Instructions

## Coding Standards
- Use TypeScript strict mode for all new files
- Prefer `const` over `let`; never use `var`
- Use named exports, not default exports
- All functions must have JSDoc comments with @param and @return tags

## Testing
- Use Vitest for all unit tests
- Test files go in `__tests__/` directories alongside source files

## API Conventions
- All API responses must include a `success` boolean field
- Error responses must include an `error` field with a descriptive message
- Use HTTP status codes correctly (201 for created, 400 for bad input, etc.)
```

**Step 2: Generate code and verify**

In Agent mode, ask:

```
Create a new utility function in api/utils/ that validates email addresses. Include tests.
```

**Step 3: Check compliance**

- Does the generated code use `const` instead of `let`?
- Does it have JSDoc comments?
- Are tests in a `__tests__/` directory?
- Does it use named exports?

### Success Criteria

- ✅ Created `.github/copilot-instructions.md`
- ✅ Generated code follows the instructions
- ✅ Verified at least 3 rules are being followed

---

### Exercise 2.2 — User Instructions (5 min)

**Objective**: Add personal preferences via VS Code settings.

**Steps**

**Step 1: Open VS Code settings (JSON)**

Open Command Palette → "Preferences: Open User Settings (JSON)"

**Step 2: Add instruction**

Add the following:

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "text": "Always include error handling with try-catch blocks. Log errors with console.error before re-throwing."
    }
  ]
}
```

**Step 3: Test it**

Ask Copilot to generate a new function. Verify it includes try-catch with console.error.

**Step 4: Observe layering**

Note that both user instructions AND repository instructions are applied simultaneously.

### Success Criteria

- ✅ Added user-level instruction in VS Code settings
- ✅ Generated code includes the personal preference (try-catch)
- ✅ Both user and repo instructions are respected

---

### Exercise 2.3 — File-Targeted Instructions (8 min)

**Objective**: Create file-targeted instructions with `applyTo` patterns.

**Steps**

**Step 1: Create test instructions**

Create `.github/instructions/tests.instructions.md`:

```yaml
---
applyTo: "**/*.test.*"
---
```

```markdown
# Test File Instructions
- Use Vitest `describe` / `it` / `expect` pattern
- Mock external dependencies with `vi.mock()`
- Each test file should test exactly one module
- Include at least one test for the happy path and one for error handling
- Use descriptive test names that explain the expected behavior
```

**Step 2: Create API instructions**

Create `.github/instructions/api-routes.instructions.md`:

```yaml
---
applyTo: "api/routes/**/*.ts"
---
```

```markdown
# API Route Instructions
- Use Express Router for all route definitions
- Validate all request body fields before processing
- Return consistent response shapes: { success: boolean, data?: T, error?: string }
- Include OpenAPI JSDoc annotations for Swagger documentation
```

**Step 3: Verify file-targeted loading**

Open a test file and ask Copilot to generate additional tests. Then open an API route file and ask for a new endpoint. Verify each uses its targeted instructions.

### Success Criteria

- ✅ Created file-targeted instructions with `applyTo` frontmatter
- ✅ Test-specific instructions apply when editing test files
- ✅ API-specific instructions apply when editing route files

---

### Exercise 2.4 — Context Quality Comparison (5 min)

**Objective**: Demonstrate how explicit context improves output quality.

**Steps**

**Step 1: Vague prompt**

```
Create a new API endpoint for managing suppliers
```

Note the response — it may use generic patterns.

**Step 2: Precise prompt with context**

```
@workspace #file:api/routes/products.ts #file:api/services/products.ts Create a new API endpoint for managing suppliers, following the exact same pattern as products
```

**Step 3: Compare**

- Does the precise version match the project's actual patterns?
- Are the file names, imports, and structure consistent?

### Success Criteria

- ✅ Generated code with and without explicit context
- ✅ Observed measurable quality improvement with `#file` references
- ✅ Precise version matches existing project patterns

---

### Exercise 2.5 — Context Truncation Experiment (5 min)

**Objective**: Observe how large context affects Copilot's behavior.

**Steps**

**Step 1: Open a large file**

Open the largest file in the project (check with `@workspace What is the largest TypeScript file in this project?`).

**Step 2: Ask about the end of the file**

Ask a question about something near the end of the file:

```
#file:path/to/large-file.ts What does the last function in this file do?
```

**Step 3: Use selection instead**

Select just the last function and ask:

```
#selection Explain this function
```

**Step 4: Compare accuracy**

The `#selection` approach should be more accurate because it sends less context but more relevant context.

### Success Criteria

- ✅ Observed potential inaccuracy when referencing a very large file
- ✅ Achieved better results using `#selection` for targeted questions
- ✅ Understand why smaller, targeted context often beats large file references

</details>

---

<details>
<summary><h2>Lab 3: Models, Agents & Token Management (33 min)</h2></summary>

> **Workshop Session**: 3 — Models, Agents & Token Management

### Exercise 3.1 — Model Comparison (8 min)

**Objective**: Compare output from different models for the same task.

**Steps**

**Step 1: Choose a task**

Use this prompt for all comparisons:

```
@workspace #file:api/routes/orders.ts Review this file for potential improvements. List specific suggestions with code examples.
```

**Step 2: Try with GPT-4o**

Select GPT-4o from the model picker. Send the prompt. Note:

- Response time
- Number of suggestions
- Depth of analysis
- Code example quality

**Step 3: Try with Claude Sonnet**

Switch to Claude Sonnet. Send the same prompt. Note the same dimensions.

**Step 4: Try with a third model (if available)**

Switch to another available model and compare.

**Step 5: Document findings**

Create a brief comparison table in a new chat session:

```
Help me create a comparison table from these observations:
Model A was [fast/slow] and gave [X] suggestions...
Model B was [fast/slow] and gave [Y] suggestions...
```

### Success Criteria

- ✅ Compared at least 2 models with the same prompt
- ✅ Documented differences in speed, depth, and style
- ✅ Identified which model you'd prefer for code reviews

---

### Exercise 3.2 — Token Analysis (5 min)

**Objective**: Enable debug mode and observe token usage.

**Steps**

**Step 1: Enable debug mode**

Open VS Code settings and add:

```json
{
  "github.copilot.chat.debugMode": true
}
```

**Step 2: Send a simple message**

```
What is this project about?
```

Open the Output panel (`Ctrl+Shift+U`) → select "GitHub Copilot Chat". Find the debug output showing token counts.

**Step 3: Send a context-heavy message**

```
@workspace #file:api/routes/orders.ts #file:api/routes/products.ts #file:api/services/orders.ts Compare these three files and suggest common patterns to extract
```

Note the token count increase.

**Step 4: Compare token usage**

How many more tokens did the context-heavy prompt use? What's the ratio?

### Success Criteria

- ✅ Enabled debug mode and found token counts in the output panel
- ✅ Compared token usage between simple and complex prompts
- ✅ Can identify the token cost of attaching files with `#file`

---

### Exercise 3.3 — Custom Agent Creation (10 min)

**Objective**: Create a custom agent with specific instructions and tools.

**Steps**

**Step 1: Create the agent file**

Create `.github/agents/reviewer.md`:

```yaml
---
description: "Reviews code for security vulnerabilities and best practices"
tools:
  - codebase
  - githubRepo
model: claude-sonnet-4
---
```

```markdown
# Security Reviewer Agent

You are a security-focused code reviewer. When reviewing code:

1. Check for OWASP Top 10 vulnerabilities (especially injection, XSS, CSRF)
2. Verify input validation and sanitization on all user inputs
3. Check authentication and authorization patterns
4. Flag hardcoded secrets, tokens, or credentials
5. Review error handling (no stack traces leaked to users)

For each issue found:
- State the vulnerability type
- Show the problematic code
- Provide a corrected code example
- Rate severity: 🔴 Critical, 🟡 Medium, 🟢 Low
```

**Step 2: Use the agent**

Open the chat mode picker (dropdown at the top of the chat panel). Select "Security Reviewer."

```
Review the orders API route for security issues
```

**Step 3: Compare with default agent**

Switch back to Agent mode and ask the same question. Compare the depth and focus of security analysis.

### Success Criteria

- ✅ Created a custom agent file with instructions and tools
- ✅ Agent appears in the chat mode picker
- ✅ Agent provides focused security-oriented feedback
- ✅ Response differs noticeably from default Agent mode

---

### Exercise 3.4 — Decision Cheat Sheet (5 min)

**Objective**: Build a personal reference for when to use each Copilot feature.

**Steps**

**Step 1: Use Copilot to help build the reference**

In Ask mode:

```
Help me create a quick-reference decision table for when to use:
- Inline completions vs. chat
- Ask mode vs. Agent mode vs. Plan mode
- Default Agent vs. custom agents
- @workspace vs. #file vs. #selection

Format as a markdown table with columns: Scenario | Best Tool | Why
```

**Step 2: Customize for your workflow**

Edit the generated table to match your specific use cases and tech stack.

**Step 3: Save it**

Save the reference as a personal note or add it to your team's documentation.

### Success Criteria

- ✅ Generated a decision reference table with Copilot's help
- ✅ Customized it for your specific workflow
- ✅ Have a reusable reference for daily use

---

### Exercise 3.5 — Setup Steps (5 min)

**Objective**: Write a `copilot-setup-steps.yml` for the demo repository.

**Steps**

**Step 1: Create the file**

Create `.github/copilot-setup-steps.yml`:

```yaml
steps:
  - name: Install dependencies
    run: npm install
  - name: Build the project
    run: npm run build
  - name: Run linting
    run: npm run lint
  - name: Run tests
    run: npm test
```

**Step 2: Verify the commands work**

Run each command manually in your terminal to confirm they succeed:

```bash
npm install
npm run build
npm run lint
npm test
```

**Step 3: Consider additions**

Think about what else the Coding Agent might need. Would it need environment variables? Database setup? Add any missing steps.

### Success Criteria

- ✅ Created `copilot-setup-steps.yml` with appropriate steps
- ✅ All commands run successfully locally
- ✅ Considered additional setup the Coding Agent might need

</details>

---

*Lab guide for GitHub Copilot Developer Training — Foundations (Module 1 of 3)*
