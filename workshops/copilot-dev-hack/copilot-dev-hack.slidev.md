---
theme: ../../themes/github
title: "Copilot Developer Training: Hack — Business Problem Solving"
info: |
  60-minute hands-on hackathon module. Attendees build custom Copilot agents for real business problems.
  Choose from 5 scenarios (Code Review, Test Generation, Documentation, Bug Triage, or Bring Your Own) and ship a working agent in 60 minutes.
ghFooterTitle: "Module 5: Hack"
ghFooterLabel: ""
drawings:
  persist: false
mermaid:
  theme: dark
transition: slide-left
mdc: true
layout: cover
---
<!-- markdownlint-disable -->

# Module 5: Hack
## Business Problem Solving

60-minute hands-on hackathon. Build custom Copilot agents for real problems.

<!-- notes
This is the capstone module. Attendees now build *their own* custom agents in real time.
The goal: walk out with a working agent that solves a problem their team actually faces.
Emphasize this is not a lecture—it's hands-on, collaborative, and practical.
-->

---
layout: section

# 60-Minute Plan

<!-- notes
Walk through the three phases. Emphasize the time constraints and what success looks like in each phase.
-->

---
class: text-sm

# Agenda: 60 Minutes

| Time | Phase | What You Do |
|------|-------|-----------|
| **0–10 min** | 📋 Planning | Choose a problem, define success criteria |
| **10–50 min** | 🛠️ Building | Create agent instructions, test, iterate |
| **50–60 min** | 🎯 Demo | Show your work, get feedback |

### By the end, you'll have:
- A working custom Copilot agent ✅
- Agent instructions saved in your repo
- Proof it works (tested on real code)

<!-- notes
Emphasize this timeline is tight but doable. Attendees with experience building agents or automations will move faster.
If someone finishes early, they can pair-review with someone else or dive into MCP integration.
-->

---
layout: section

# 5 Business Problem Scenarios

<!-- notes
These are real problems enterprise teams face. Help attendees pick one that resonates with their actual work.
If none fit, they can bring their own problem (Scenario E).
-->

---
class: text-sm

# Scenario A: Code Review Agent 🔍

__Problem__: Inconsistent, slow code reviews. Team needs faster, more structured feedback.

__Your Agent Does__:
- Reviews PRs for code style, security, performance
- Gives specific, actionable feedback
- Asks clarifying questions if needed

__Success__: Run your agent on a real PR and see structured feedback in Copilot Chat.

<!-- notes
This is the most popular scenario. If your team does peer review, this is the highest-impact agent.
The agent doesn't replace human review—it accelerates it and makes feedback more consistent.
-->

---
class: text-sm

# Scenario B: Test Generation Agent ✅

__Problem__: Low test coverage. Team lacks time to write tests manually.

__Your Agent Does__:
- Generates unit tests for functions
- Covers happy path, edge cases, error cases
- Tests are runnable immediately

__Success__: Your agent generates a test suite. You run the tests—they pass.

<!-- notes
Test generation saves hours. The agent generates tests that may not be perfect, but they're a great starting point.
Your team still reviews and refines them—the agent removes the blank-page problem.
-->

---
class: text-sm

# Scenario C: Documentation Assistant 📚

__Problem__: API docs are outdated. Hard to keep documentation in sync with code.

__Your Agent Does__:
- Generates README sections from code
- Includes parameter descriptions, examples
- Creates clear, accurate documentation

__Success__: Your agent generates docs for one API endpoint. Docs match the code.

<!-- notes
Documentation is often neglected. An agent that keeps it in sync is incredibly valuable.
Pair this with your code review agent and you have a feedback loop that improves both code and docs.
-->

---
class: text-sm

# Scenario D: Bug Triage Agent 🐛

__Problem__: Issue tracker is overwhelming. Hard to prioritize what to fix first.

__Your Agent Does__:
- Categorizes bugs (critical, high, medium, low)
- Suggests which bugs to tackle first
- Estimates effort (quick fix, medium, large)

__Success__: Your agent triages 3-5 issues. Categorization is clear and helpful.

<!-- notes
Triage is painful and repetitive. An agent that automatically categorizes and prioritizes bugs saves the team hours per sprint.
This is especially valuable for teams with high bug volume.
-->

---
class: text-sm

# Scenario E: Bring Your Own Problem 🚀

__Problem__: Your team has a specific need that Copilot could solve.

__Your Agent Does__: _Whatever your team needs._

__Success__: Facilitator helps you scope it. You build an agent that works.

### ⚠️ Important:
- Problem must be achievable in 40 minutes
- It should solve a *real* problem your team faces
- Not hypothetical—something your team does every week

<!-- notes
This is for attendees whose team has a unique or specific need.
The facilitator will help scope and validate the problem before you start building.
If someone's idea is too big, help them break it down to the core 40-minute version.
-->

---
layout: section

# Phase 1: Planning (10 Minutes)

<!-- notes
This is the most important phase. A clear problem definition saves 30 minutes during building.
Rushing through planning leads to confusion and wasted building time.
-->

---
class: text-sm

# Step 1: Choose Your Scenario (5 min)

Which problem does your team *actually* face?

- **A (Code Review)**: Need faster, more consistent reviews?
- **B (Test Gen)**: Struggling with test coverage?
- **C (Documentation)**: Docs falling out of sync?
- **D (Bug Triage)**: Overwhelmed by issues?
- **E (Your Problem)**: Something else? *Raise your hand.*

### What Success Looks Like:
You know exactly which agent you're building.

<!-- notes
Go around and let each attendee say their choice out loud. This commits them to a path and lets others hear alternatives.
If someone picks E, start scoping their problem right now—ask clarifying questions.
-->

---
class: text-sm

# Step 2: Define Success (5 min)

Write down: _"My agent will [X] by doing [Y]."_

### Examples:
- _"My agent will review PRs for SQL injection vulnerabilities by analyzing code for unvalidated queries."_
- _"My agent will generate unit tests for our API handlers by covering happy path, errors, and edge cases."_
- _"My agent will categorize bugs by severity and effort so we prioritize fixes each sprint."_

### Facilitator Check:
Can you build this in 40 minutes? Is success clear?

<!-- notes
This is the definition of done. If an attendee can't articulate success in one sentence, they need to scope smaller.
Help them refine: "Okay, that's good. How will you *know* your agent worked? What would you show me?"
-->

---
layout: section

# Phase 2: Building (40 Minutes)

<!-- notes
This is the execution phase. Attendees code in VS Code.
Circulate, help troubleshoot, make sure instructions are clear, and check if agents are behaving as expected.
At 40 minutes, they should have a working (if rough) agent.
-->

---
class: text-sm

# Step 1: Set Up Project (5 min)

1. Open VS Code
2. Open or create a project folder (real project, or empty folder for demo)
3. Create `.github/` folder
4. Create `.github/copilot-instructions.md` (custom instructions for your repo)

### You're now ready to code your agent.

<!-- notes
If attendees don't have a project, give them your demo repo.
The `.github/` folder is where Copilot looks for custom instructions and agent definitions.
-->

---
class: text-sm

# Step 2: Write Custom Instructions (10 min)

In `.github/copilot-instructions.md`, describe your team's context:

```markdown
# Our Copilot Instructions

## Team & Code Style
- We use [framework/language]
- We prioritize code readability, security, performance
- All functions need docstrings
- We follow [style guide]

## Our Standards
- Security first: always validate input, never trust user data
- Testing: every feature gets a test
- Documentation: keep README in sync with code
```

### Save and commit.

<!-- notes
These are global instructions that all your agents inherit.
They set the baseline for what good code looks like in your repo.
Attendees should write these for their real team context, not generic instructions.
-->

---
class: text-sm

# Step 3: Create Your Agent (15 min)

Create `.github/agents/my-agent.md`:

```markdown
# My Code Review Agent

You are a code review agent for our team.

## Your Job
Review pull requests for:
1. Code style (naming, formatting, readability)
2. Security (SQL injection, XSS, unvalidated input)
3. Performance (unnecessary loops, memory)
4. Best practices (error handling, testing)

## How to Give Feedback
- Be constructive and specific
- For each issue, explain why it matters
- Suggest a fix, don't just criticize
```

### Save and commit. Reuse instructions from the scenario slides.

<!-- notes
The agent instructions are the "personality" of the agent.
They should be specific to the problem domain (Code Review, Test Gen, etc.).
Attendees should copy the sample instructions from their scenario slide, then customize for their team.
-->

---
class: text-sm

# Step 4: Test Your Agent (10 min)

1. Open Copilot Chat (`Ctrl+Shift+I` or `⌘+Shift+I`)
2. Select your agent (or type `@my-agent`)
3. Give it a real problem to solve:
   - For Code Review: Paste in some code, ask for review
   - For Test Gen: Paste a function, ask for tests
   - For Bug Triage: Paste an issue, ask for categorization
4. Does it behave as expected?
5. Adjust instructions if needed

### Success: Your agent works and you understand why.

<!-- notes
Testing is critical. It's easy to write instructions that *sound* good but don't produce the right behavior.
Watch what the agent actually does. If it's off, tweak the instructions and try again.
This iterative loop (write → test → refine) is the core of agent building.
-->

---
layout: section

# Phase 3: Demo & Feedback (10 Minutes)

<!-- notes
Now attendees show what they built. This is motivating—everyone sees working agents in real time.
Keep demos tight: 1-2 minutes each max.
-->

---
class: text-sm

# Step 1: Demo Your Agent (5 min)

Each attendee demos (1–2 minutes):

1. **Show the problem**: "My team struggles with X"
2. **Run your agent**: Type in an example, show the output
3. **Explain the win**: "My agent now [does X automatically]"

### Keep it short and real. Show code, not slides.

<!-- notes
Encourage authenticity. Bugs and imperfect agents are fine—that's how learning happens.
Ask: "What would you improve next?" or "How does your team plan to use this?"
-->

---
class: text-sm

# Step 2: Group Feedback (5 min)

### Facilitator asks:
- "What problem does this solve?"
- "How will your team use this agent?"
- "What would you build next?"

### Key message:
✅ **You just built a working AI agent in 60 minutes. Ship it, iterate, and improve.**

<!-- notes
Celebrate the wins, no matter how small. "You created an agent that your team can actually use. That's a real accomplishment."
Encourage them to commit their agent, try it on real code this week, and come back with feedback.
The agents will get better with iteration—they're not perfect on day one.
-->

---
layout: section

# Success Criteria Checklist

<!-- notes
Go through this checklist at the end. Attendees should have accomplished most of these.
If they didn't, it's still a learning moment—they understand what they'd do differently next time.
-->

---
class: text-sm

# Your Hack is Successful If…

✅ You chose a real problem your team faces

✅ You wrote custom instructions for your repo context

✅ You created an agent in `.github/agents/`

✅ You tested your agent on real code

✅ Your agent produces useful, actionable output

✅ You can explain what your agent does in one sentence

✅ Your agent instructions are saved and committed

✅ You demoed your agent to the group

### 🎯 All 8? You're done. Commit, share with your team, and start using it.

<!-- notes
These are the non-negotiables. If attendees hit most of these, they've succeeded.
If they missed some, ask: "What would you do differently next time?" and help them iterate.
-->

---
layout: section

# Resources & Next Steps

<!-- notes
Give attendees resources to go deeper. These tools and docs will help them improve their agents.
-->

---
class: text-sm

# Keep Building

| Resource | What It Is |
|----------|-----------|
| **<https://docs.github.com/en/copilot>** | Copilot docs (agents, instructions, API) |
| **<https://docs.github.com/en/copilot/customizing-copilot>** | Custom instructions & agent reference |
| **Demo Repo** | `microsoft/GitHubCopilot_Customized` (example agents) |
| **Copilot Chat** | Built into VS Code & GitHub.com |

### Your Next Steps:
1. **Commit your agent** to your repo today
2. **Test it with your team** on real code this week
3. **Iterate**: Adjust instructions based on what works
4. **Share**: Show your team what's possible

<!-- notes
Emphasize that agents improve with iteration. The first version is rarely perfect.
Encourage them to experiment, get feedback from their team, and refine the instructions.
This is how the best agents are built.
-->

---
layout: end

# You Did It! 🚀

**You walked in with a problem.**
**You walked out with a working agent.**

Share it. Use it. Improve it.

Your team has no idea what's coming.

---

*Slide deck for GitHub Copilot Developer Training — Module 5: Hack*


