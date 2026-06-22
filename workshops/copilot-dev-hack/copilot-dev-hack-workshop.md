# GitHub Copilot Developer Training — Capstone Hack

**Duration**: 60 minutes
**Format**: Hands-on hackathon with 5 scenario options
**Audience**: Developers, engineers (completed Modules 1-3)
**Max Attendees**: 20-30 per session (facilitators help troubleshoot)

---

## Workshop Overview

This capstone module is hands-on: attendees build and validate a custom Copilot agent in real time. This is not a lecture or passive learning—it is practical problem-solving. Attendees choose from 5 business problem scenarios (Code Review, Test Generation, Documentation, Bug Triage, or Bring Your Own) and have 40 minutes to create an agent prototype that addresses that problem. They test it, refine it, and demo outcomes to the group.

By the end, attendees walk out with:
1. A working custom Copilot agent prototype or validated first iteration
2. Agent instructions saved in their repository
3. Evidence from at least one realistic test case
4. Confidence they can iterate and improve more agents

This module assumes Modules 1-3 are complete (attendees understand Copilot basics, advanced prompting, and agent architecture). This capstone is where theory becomes practice.

> **Bridge from Modules 1-3**: Attendees can continue the Copilot Quest artifact built in earlier modules or select one of the five scenario tracks. Facilitators should encourage reuse of prior instruction files, prompt contracts, and guardrail patterns rather than starting from scratch.

---

## Learning Objectives

By the end of this module, attendees will be able to:

✅ **Choose a real business problem** that Copilot agents can solve

✅ **Define success criteria** for a custom agent in one clear sentence

✅ **Create agent instructions** in `.github/agents/` that solve the problem

✅ **Test agents iteratively** using Copilot Chat and adjust based on output

✅ **Ship and share** a working agent with their team

✅ **Iterate and improve** agents based on team feedback and real-world usage

---

## Prerequisites

- **Modules 1–3 completed**: Understand Copilot Chat, advanced prompting, and agent basics
- **VS Code installed** with Copilot Chat extension
- **A GitHub account** with Copilot enabled
- **A project folder** (real project or empty repo for demo)
- **GitHub CLI** (optional, for committing agents)

---

## Detailed Hackathon Plan (60 min)

---

## Phase 1: Planning (10 min)

This phase is critical. A clear problem definition saves 30 minutes during building. Do not rush through this.

### Section: Warm-Up & Problem Selection (5 min)

**What to do**:
1. Explain the 5 scenarios briefly (use slides)
2. Go around: each attendee states their choice out loud
3. For "Bring Your Own Problem" attendees, start scoping immediately

**Facilitator Role**:
- Listen actively. Let attendees hear each other's choices
- For Scenario E (Bring Your Own), ask: "What problem does your team face? What would success look like? Can we build this in 40 minutes?"
- Help scope down problems that are too big: "That's important, but could we focus on the core version this session?"

**Success Criteria**:
- Every attendee knows which agent they're building
- Scenario E problems are scoped and achievable

---

### Section: Define Success Criteria (5 min)

**What to do**:
1. Each attendee writes: **"My agent will [X] by doing [Y]."**
2. Examples from slides:
   - *"My agent will review PRs for SQL injection by analyzing code for unvalidated queries."*
   - *"My agent will generate unit tests for handlers by covering happy path, errors, edge cases."*
   - *"My agent will categorize bugs by severity so we know what to fix first."*
3. Facilitator checks each person's success criteria: Is it clear? Achievable in 40 min?

**Facilitator Role**:
- Circulate. Ask each attendee: "Tell me your success criteria. How will you know your agent worked?"
- If unclear: "Good start. Let me make sure I understand. You want your agent to [restate]. What's the smallest version of that?"
- If too big: "That's ambitious. For today, let's focus on [narrower scope]."

**Success Criteria**:
- Every attendee can state their success criteria in 1-2 sentences
- Facilitators sign off: "Yes, you can build this."

---

## Phase 2: Building (40 min)

This is execution. Attendees write code. Facilitators circulate, troubleshoot, and help when agents don't behave as expected.

### Section: Set Up Your Project (5 min)

**What to do**:
1. Open VS Code
2. Open or create a project folder
   - Real project: Use your team's actual codebase
   - Demo project: Use empty folder (facilitator provides demo repo link)
3. Create `.github/` folder (if it doesn't exist)
4. Ready to code

**Facilitator Role**:
- Have demo repo cloned and ready to share
- Help attendees who don't have a project set up
- Make sure `.github/` folder is created

**Success Criteria**:
- All attendees have a project folder open
- `.github/` folder exists

---

### Section: Create Custom Instructions (10 min)

**What to do**:
1. Create `.github/copilot-instructions.md`
2. Write team context and standards:

```markdown
# Our Copilot Instructions

## Team & Code Style
- We use [your framework/language]
- We prioritize [readability, security, performance, etc.]
- All functions need [docstrings, type hints, tests]
- We follow [your style guide]

## Our Standards
- Security first: always validate input, never trust user data
- Testing: every feature gets a test
- Documentation: keep README in sync with code
- Performance: no unnecessary loops or O(n²) operations
```

3. Customize for your team's actual standards
4. Save and commit

**Facilitator Role**:
- Circulate. Check a few examples: Are they specific to the team? Not generic?
- Help attendees articulate their standards: "What does your team care about most?"

**Success Criteria**:
- `.github/copilot-instructions.md` exists and is specific to the team
- File is committed to repo

---

### Section: Create Your Agent (15 min)

**What to do**:
1. Create `.github/agents/my-agent.md` (replace `my-agent` with actual name)
2. Write agent-specific instructions based on your scenario
3. Copy sample instructions from your scenario slide, then customize

**Sample Instructions by Scenario**:

#### Scenario A: Code Review Agent

```markdown
# Code Review Agent

You are a code review agent for our team.

## Your Job
Review pull requests and code for:
1. Code style (naming, formatting, readability)
2. Security (SQL injection, XSS, unvalidated input)
3. Performance (unnecessary loops, memory leaks)
4. Best practices (error handling, testing)
5. Architecture (follows our patterns, no tight coupling)

## How to Give Feedback
- Be constructive and specific
- For each issue, explain why it matters
- Suggest a concrete fix, don't just criticize
- Ask clarifying questions if context is unclear
- Praise good patterns when you see them
```

#### Scenario B: Test Generation Agent

```markdown
# Test Generation Agent

You are a test generation agent for our team.

## Your Job
Write unit tests for functions that:
1. Cover happy path (expected input → expected output)
2. Cover edge cases (boundary conditions, empty input, null)
3. Cover error cases (what if input is invalid?)
4. Are runnable in [your test framework]

## How to Write Tests
- Use [your testing framework] (Jest, unittest, pytest, etc.)
- Make test names descriptive: `test_calculateTotal_withDiscount_returnsDiscountedPrice()`
- Keep setup minimal
- One assertion per test when possible
- Include comments for non-obvious test cases
```

#### Scenario C: Documentation Assistant

```markdown
# Documentation Assistant

You are a documentation agent for our team.

## Your Job
Generate clear, accurate documentation for APIs and functions:
1. Description: What does this do?
2. Parameters: What inputs does it take? Types? Defaults?
3. Returns: What does it return? Type? Null possible?
4. Example: Show real usage with sample input/output
5. Notes: Any gotchas, performance considerations?

## How to Document
- Write for someone who's never seen this before
- Include code examples with actual values
- Be accurate to the code—run it yourself if you can
- Use markdown code blocks for clarity
- Flag deprecated or experimental features
```

#### Scenario D: Bug Triage Agent

```markdown
# Bug Triage Agent

You are a bug triage agent for our team.

## Your Job
Analyze GitHub issues and categorize them by:
1. **Severity**: Critical (breaks main feature) → High → Medium → Low
2. **Category**: Backend, Frontend, Database, Infrastructure, Docs
3. **Effort**: Quick fix (<1 hour) → Medium (1-4h) → Large (>4h)
4. **Recommendation**: Fix immediately / Schedule next sprint / Nice to have

## How to Triage
- Be conservative: Better to overestimate severity than underestimate impact
- Look for: Affected users, workarounds, frequency, business impact
- If unclear, ask for more info: "Can you reproduce this? What OS/browser?"
- Flag security/data loss as Critical immediately
```

#### Scenario E: Bring Your Own Problem

Work with facilitator to write instructions specific to your problem.

**Facilitator Role**:
- Circulate and check agent instructions. Are they specific to the problem domain?
- If instructions are vague, help sharpen them: "This is good, but be more specific. What exactly should your agent do?"
- Make sure Scenario E attendees have tight, focused instructions

**Success Criteria**:
- `.github/agents/[name].md` exists and is domain-specific
- Instructions are clear enough that someone else could understand the agent's job
- File is committed to repo

---

### Section: Test Your Agent (10 min)

**What to do**:
1. Open Copilot Chat in VS Code (`Ctrl+Shift+I` or `⌘+Shift+I`)
2. Select your agent or type `@my-agent-name`
3. Give it real input to test:
   - **Code Review**: Paste in some code, ask "Review this for security issues"
   - **Test Gen**: Paste a function, ask "Write tests for this"
   - **Documentation**: Paste an API, ask "Document this endpoint"
   - **Bug Triage**: Paste an issue, ask "Categorize this and recommend priority"
   - **Your Problem**: Test with realistic input
4. Observe: Does the agent behave as you intended?
5. If not, adjust instructions and test again

**Facilitator Role**:
- Circulate. Watch agents in action. What is working? What's off?
- Help troubleshoot:
  - If agent is not focused: "Instructions might be too broad. Try narrowing the scope."
  - If output is wrong: "What output did you expect? Let's adjust the instructions to get that."
  - If agent is confused: "Try being more specific in your prompt. What exactly do you want the agent to do?"
- Celebrate when agents work: "That's great! Your agent is doing exactly what you intended."

**Success Criteria**:
- Agent produces output that matches your success criteria
- You've tested it at least once
- You understand why it's working (or what needs to be fixed)

---

## Phase 3: Demo & Feedback (10 min)

Now attendees show what they built. Celebrate their work, get feedback, and close strong.

### Section: Show Your Work (5 min)

**What to do**:
- Run a lightning showcase:
  1. 4-6 volunteer demos (45-60 seconds each)
  2. Each volunteer shows:
    - "My team faces [problem]"
    - One real agent run
    - "My agent does [X], which saves us [Y]"
  3. Remaining attendees post one-sentence outcomes in chat/board for facilitator callout

**Facilitator Role**:
- Keep timing strict: 45-60 seconds per volunteer demo
- Ask each person: "What problem does your agent solve?"
- If someone's agent is rough or incomplete, celebrate the effort: "You built this in 40 minutes. That's impressive. What would you do next?"
- Highlight wins: "Your agent caught a SQL injection risk. That's exactly what you wanted."

**Success Criteria**:
- At least 4 concrete live demos are shown (running agent, not just slides)
- Non-presenting attendees still share outcome/progress notes

---

### Section: Q&A & Close (5 min)

**What to do**:
1. Answer questions
2. Give key closing messages

**Facilitator Talking Points**:
- "You walked in with a problem. You walked out with a working agent. That's real."
- "Your agents will get better with iteration. Try it with your team this week. Get feedback. Adjust instructions."
- "This is how the best agents are built: build → test → refine → share → repeat."
- "You now know how to build custom Copilot agents. Your team is going to be more productive."

**Success Criteria**:
- Attendees feel accomplished and excited about using agents
- Attendees understand that iteration improves agents
- No one leaves without committing their agent to their repo (or at least saving it locally)

---

## Scenario Details

---

## Scenario A: Code Review Agent 🔍

**Business Problem**: "Our team wastes hours on code review. Feedback is inconsistent. Some reviews are thorough; others miss security issues. We need faster, more structured feedback."

**Success Criteria**:
- Agent reviews code for style, security, performance
- Agent asks clarifying questions if context is unclear
- Agent gives specific, actionable feedback (not vague criticism)
- Feedback is constructive (suggests fixes, not just problems)

**Sample Instructions** (from slide, copy and customize):

```markdown
# Code Review Agent

You are a code review agent for our team.

## Your Job
Review pull requests and code for:
1. Code style (naming, formatting, readability)
2. Security (SQL injection, XSS, unvalidated input, auth)
3. Performance (unnecessary loops, memory leaks, N+1 queries)
4. Best practices (error handling, logging, testing)
5. Architecture (follows our patterns, loose coupling)

## How to Give Feedback
- Be constructive and specific
- For each issue, explain why it matters
- Suggest a concrete fix, don't just criticize
- Ask clarifying questions if context is unclear
- Praise good patterns when you see them
- Flag security/data loss as highest priority
```

**Demo Test Case**:
```javascript
// Paste this code into Copilot Chat with Code Review Agent selected
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = db.query("SELECT * FROM users WHERE id = " + userId);
  res.json(user);
});
```

**Expected Output**:
Agent should flag:
- SQL injection risk (unvalidated userId in query)
- Missing error handling
- Missing input validation
- Should suggest parameterized query

---

## Scenario B: Test Generation Agent ✅

**Business Problem**: "We have low test coverage. Writing tests manually takes forever. Developers skip tests under deadline pressure. We need to remove the blank-page problem and make test generation fast."

**Success Criteria**:
- Agent generates runnable tests
- Tests cover happy path, edge cases, error cases
- Tests use correct framework and syntax
- Generated tests are good starting points (team still reviews them)

**Sample Instructions**:

```markdown
# Test Generation Agent

You are a test generation agent for our team.

## Your Job
Write unit tests for functions that:
1. Cover happy path (expected input → expected output)
2. Cover edge cases (boundary conditions, empty input, null, zero)
3. Cover error cases (what if input is invalid? What exceptions throw?)
4. Are runnable immediately in [your test framework]

## How to Write Tests
- Use [Jest / unittest / pytest / your framework]
- Test names: `test_calculateTotal_withDiscount_returnsDiscountedPrice()`
- Keep setup minimal
- One assertion per test when possible
- Include comments for non-obvious test cases
- Use fixtures/factories for complex setup
```

**Demo Test Case**:
```python
# Paste this function into Copilot Chat with Test Generation Agent selected
def calculate_discount(price, discount_percent):
    if price < 0:
        raise ValueError("Price cannot be negative")
    if discount_percent < 0 or discount_percent > 100:
        raise ValueError("Discount must be 0-100")
    return price * (1 - discount_percent / 100)
```

**Expected Output**:
Agent should generate tests for:
- Happy path: calculate_discount(100, 10) → 90
- Edge case: calculate_discount(0, 0) → 0
- Error case: calculate_discount(-10, 10) → raises ValueError
- Error case: calculate_discount(100, 150) → raises ValueError

---

## Scenario C: Documentation Assistant 📚

**Business Problem**: "API documentation is always out of date. Developers update code but forget to update README. New team members can't understand the APIs. We need documentation that stays in sync."

**Success Criteria**:
- Agent generates README sections for functions/APIs
- Documentation is clear and includes examples
- Documentation is accurate (agent reads the code, not just guesses)
- Docs are in markdown format, ready to copy-paste

**Sample Instructions**:

```markdown
# Documentation Assistant

You are a documentation agent for our team.

## Your Job
Generate clear, accurate documentation for APIs and functions:
1. **Description**: What does this do in 1-2 sentences?
2. **Parameters**: What inputs? Types? Required? Defaults?
3. **Returns**: What does it return? Type? Can it be null?
4. **Example**: Show real usage with sample input/output
5. **Notes**: Gotchas, performance, deprecated warnings?

## How to Document
- Write for developers new to the code
- Include code examples with actual values
- Be accurate to the code—verify yourself
- Use markdown code blocks for clarity
- Flag experimental or deprecated features
- Include error handling in examples
```

**Demo Test Case**:
```javascript
// Paste this API into Copilot Chat with Documentation Agent selected
app.post('/api/users', async (req, res) => {
  const { email, name, role } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const user = await User.create({ email, name, role: role || 'user' });
  res.json(user);
});
```

**Expected Output**:
Agent should document:
- What the endpoint does
- Request body schema (email, name, role)
- Response format
- Errors (400 if missing fields)
- Example: POST with sample data, response

---

## Scenario D: Bug Triage Agent 🐛

**Business Problem**: "Our GitHub issues are a mess. 200+ open issues. No one knows what to fix first. Important bugs get lost. We need automated triage so the team can focus on high-impact work."

**Success Criteria**:
- Agent categorizes bugs (severity, category, effort)
- Agent recommends priority (fix now, schedule, nice to have)
- Triage is based on clear logic (impact, users affected, workarounds)
- Recommendations are actionable

**Sample Instructions**:

```markdown
# Bug Triage Agent

You are a bug triage agent for our team.

## Your Job
Analyze GitHub issues and categorize them:
1. **Severity**: Critical (breaks main feature) → High → Medium → Low
2. **Category**: Backend, Frontend, Database, Infrastructure, Docs
3. **Effort**: Quick fix (<1h) → Medium (1-4h) → Large (>4h)
4. **Recommendation**: Fix immediately / Schedule next sprint / Nice to have

## How to Triage
- Be conservative: Better to overestimate severity than underestimate
- Look for: Affected users, workarounds, frequency, business impact
- If context missing, ask: "Can you reproduce? OS/browser/version?"
- Flag security/data loss as Critical immediately
- Flag user-facing regressions as High
```

**Demo Test Case**:
```
Paste this GitHub issue into Copilot Chat with Bug Triage Agent selected:

Title: Dashboard crashes when loading 1000+ users
Description: On the admin dashboard, clicking "Load All Users" causes the page to hang for 30 seconds and then crash. This happens in Firefox and Chrome. Other browsers not tested yet.
Created: 2 weeks ago
Affected: ~10 admins per day (all our customer support team)
Workaround: Use pagination (load 100 users at a time)
```

**Expected Output**:
Agent should triage:
- **Severity**: High (affects main feature - dashboard, user-facing)
- **Category**: Frontend (performance/UI issue)
- **Effort**: Medium (likely needs pagination/optimization)
- **Recommendation**: Schedule for next sprint (high impact but workaround exists)

---

## Scenario E: Bring Your Own Problem 🚀

**Business Problem**: *Your team has a specific workflow problem.*

**How This Works**:
1. Attendee raises their hand: "We have a problem with [X]"
2. Facilitator helps scope: "What would success look like? Can we build a solution in 40 minutes?"
3. Facilitator writes success criteria with the attendee
4. Attendee writes agent instructions based on their problem
5. Attendee builds and tests the agent

**Facilitator Role**:
- Ask clarifying questions:
  - "What problem does your team face that Copilot could help with?"
  - "How often does this come up? Every day? Every sprint?"
  - "What would a working solution look like?"
  - "What's the smallest version we can build in 40 minutes?"
- Help scope: "That's great, but let's focus on the core problem this session. We can iterate later."
- Validate achievability: "You can build an agent that does [X] in 40 minutes. Let's do it."

**Example Problems**:
- Security scanning (find hardcoded credentials, API keys)
- Performance profiling (find N+1 queries, memory leaks)
- Database migration help (generate migration scripts)
- Log analysis (parse errors, suggest fixes)
- Accessibility checking (flag WCAG violations)
- API contract testing (verify requests match spec)

---

## Facilitator Notes

---

### Setup (Before Workshop)

**Environment**:
- VS Code + Copilot Chat extension installed on all machines
- GitHub Copilot enabled for all attendees
- Network connectivity tested

**Demo Repo**:
- Clone `microsoft/GitHubCopilot_Customized` (or your custom repo with examples)
- Have example agents ready in `.github/agents/`
- Attendees can fork or clone this repo if they don't have a project

**Backup Plans**:
- Have 1-2 example agents fully built and tested
- Have sample code ready for testing (test cases, bugs to triage, etc.)
- Know the Copilot Chat commands: `@agent-name`, `Ctrl+Shift+I`
- Have links ready: Copilot docs, agent templates, demo repo

---

### During Phase 1 (Planning) — 10 min

**What's Happening**:
Attendees choose problems and define success criteria.

**Your Role**:
- Circulate and listen. Let attendees commit to their choices out loud
- Ask clarifying questions:
  - "Tell me about the problem your team faces"
  - "How will you know your agent worked?"
  - "Can we build that in 40 minutes?"
- For Scenario E (Bring Your Own), help scope aggressively
- Make sure each attendee has a clear, achievable success criteria before they start coding

**Red Flags**:
- ❌ Attendee can't explain their success criteria in 1-2 sentences
- ❌ Success criteria sounds too big (e.g., "rebuild our entire QA process")
- ❌ No clarity on what success looks like

**What to Do**:
- Redirect: "Let's make this smaller. What's the minimum we can build in 40 minutes?"
- Help them articulate: "So your agent will [restate]. Is that right?"
- Validate: "Great. You can build that. Let's go."

---

### During Phase 2 (Building) — 40 min

**What's Happening**:
Attendees code agents and test them.

**Your Role**:
- Circulate constantly. Check progress, help troubleshoot
- Ask each attendee around minute 15:
  - "How's your agent going?"
  - "Do your instructions feel right?"
  - "Want to test it now or refine first?"
- Around minute 30, check again:
  - "Is your agent behaving as expected?"
  - "If not, what would you adjust?"
- Around minute 38, start wrapping up:
  - "Finish up. Test your agent one more time. Make sure it works."
  - "Do you have 2 minutes for a demo?"

**Common Issues & How to Fix**:

| Issue | What to Do |
|-------|-----------|
| Agent is unfocused (doing too much) | "Your instructions are too broad. What's the *one thing* your agent should do? Narrow it down." |
| Agent output is wrong | "What output did you expect? Let's look at your instructions and adjust them." |
| Agent is too verbose | "Try adding to instructions: 'Keep responses concise. One recommendation per issue.'" |
| Agent doesn't understand context | "Be more specific in your instructions. Give examples of what you want." |
| Agent takes too long to respond | This is normal. Copilot API latency. Can't fix in session. |
| Attendee stuck, feels lost | "Let's step back. What's your success criteria? Now, does your agent meet it? What's missing?" |

**Pairing**:
- If attendee finishes early, ask:
  - "Can you help someone near you debug their agent?"
  - "Want to try adding a second feature?"
  - "Want to integrate this with an MCP server?"

---

### During Phase 3 (Demo) — 10 min

**What's Happening**:
Attendees demo their agents, get feedback.

**Your Role**:
- Keep timing tight (45-60 seconds per volunteer demo)
- Ask each person: "What problem does your agent solve?"
- Listen to output. Ask follow-up questions:
  - "How does your team plan to use this?"
  - "What would you improve next?"
- Give constructive feedback:
  - ✅ "Your agent caught a security risk. Perfect."
  - ✅ "You built this in 40 minutes. The tests it generated are a great starting point."
  - ✅ "You scoped this well and shipped something useful. Well done."

**If Demo Fails**:
- Stay calm. Demos fail. That's okay.
- Ask: "What was supposed to happen? What happened instead?"
- Help debug quickly or move on
- Celebrate the work anyway: "You built something that's close to working. Test it after and tweak the instructions. You've got this."

---

### Closing Message

Stand up. Make eye contact. Say something like this:

> You walked in with a problem your team actually faces.
> In 60 minutes, you walked out with a validated first version of an agent that addresses it.
> Your agents aren't perfect yet—that's okay. Real agents get better with iteration.
>
> This week:
> 1. Commit your agent to your repo
> 2. Test it with your team on real code
> 3. Get feedback: "What would make this better?"
> 4. Adjust your instructions and try again
>
> You're now equipped to build custom Copilot agents. Your team is going to move faster.
>
> Thank you for being here. Go ship something great.

---

## Resources

| Resource | Link | Purpose |
|----------|------|---------|
| **Copilot Docs** | <https://docs.github.com/en/copilot> | Official Copilot documentation |
| **Custom Instructions** | <https://docs.github.com/en/copilot/customizing-copilot> | How to write `.github/copilot-instructions.md` |
| **Agent Reference** | <https://docs.github.com/en/copilot/customizing-copilot/about-github-copilot-agents> | Agent architecture and best practices |
| **Demo Repo** | <https://github.com/microsoft/GitHubCopilot_Customized> | Example agents, templates, demo code |

---

*Workshop guide for GitHub Copilot Developer Training — Capstone Hack (Business Problem Solving)*
