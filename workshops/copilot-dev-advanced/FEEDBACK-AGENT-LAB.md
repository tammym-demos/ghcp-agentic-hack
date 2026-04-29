# Workshop Feedback Agent Lab — Module 3

**Duration**: 40 minutes (4 exercises)
**Difficulty**: Intermediate to Advanced
**What You'll Build**: An advanced, multi-modal feedback agent with debugging, context management, and external data integration

---

## Module 3 Overview

You've built your feedback agent in Module 2. Now you'll enhance it using advanced techniques:

- **Multi-model comparison**: See how different AI models give different feedback
- **Debugging**: Fix agents that go off rails
- **Context management**: Understand when and why agents forget or get confused
- **MCP integration**: Extend your agent with external data sources

Your goal is to take the same agent from Module 2 and make it smarter, more reliable, and more powerful.

### Learning Objectives

By the end of this module, you will:

- Understand how different models approach the same problem differently
- Debug agent behavior using logs and traces
- Manage context windows effectively
- Integrate external tools via MCP (Model Context Protocol)

---

## Preparation

Before you start, ensure you have:

- Completed Module 2 (Workshop Feedback Agent Lab)
- `.github/copilot-instructions.md` and `.github/agents/workshop-feedback.md` from Module 2
- VS Code with Copilot extension and Debug Console access
- Optional: Access to multiple AI models (Claude, GPT-4, etc.) for Exercise 5

---

### Exercise 5: Multi-Model Smackdown 🤖💬

**Objective**: See how different models prioritize feedback differently

**Duration**: 10 minutes

**Steps**:

1. Open Copilot Chat in VS Code (`Ctrl+Shift+I`)

2. Ask your agent the same question twice. First prompt:

```
@workshop-feedback Review this 3-hour workshop:
- 60 min: Introduction to microservices
- 30 min: Break
- 90 min: Hands-on project (building a microservice)
```

3. Copy the agent's feedback and save it to a file called `feedback-model-1.txt`

4. Now ask a different AI model the same question. If available:
   - Try Claude (via Claude.ai or API)
   - Try GPT-4 (via ChatGPT or API)
   - Use the same prompt, without the `@workshop-feedback` prefix

5. Copy that feedback to `feedback-model-2.txt`

6. Compare the two responses. Ask yourself:

   - Which feedback is more encouraging? Why?
   - Which suggests more specific, actionable changes?
   - Did one model focus on timing, while the other focused on content?
   - Which tone is better for a workshop facilitator?

7. In your project, create a file called `MULTI-MODEL-COMPARISON.md` and write:

```markdown
# Multi-Model Feedback Comparison

## Model 1 Feedback Summary
[2-3 sentences on what this model prioritized]

## Model 2 Feedback Summary
[2-3 sentences on what this model prioritized]

## Key Differences
- [Difference 1: e.g., "Model 1 focused on pacing, Model 2 focused on engagement"]
- [Difference 2]
- [Difference 3]

## Better Model for This Task
[Which model gave better feedback? Why?]
```

8. Fill in this comparison based on your actual results

**Success Criteria**:

✅ You test your agent on the same question twice (or with two different models)

✅ You articulate 2-3 key differences between model responses

✅ Comparison file is saved with specific examples from each model

✅ You can explain why different models might prioritize differently

---

### Exercise 6: Debug a Broken Agent 🔧

**Objective**: Fix an agent that's being too harsh or off-brand

**Duration**: 10 minutes

**Steps**:

1. Your facilitator will provide example logs of a "broken" agent that's giving harsh feedback instead of kind feedback. Example bad output:

```
"This workshop is a disaster. Everything about it is wrong. The timing is terrible, the content is overwhelming, and nobody will learn anything."
```

2. Compare this to what your agent SHOULD output:

```
"I loved the hands-on component of this workshop! A few thoughts: Have you considered adding a 15-minute break after the first hour? One suggestion: breaking the 90-minute project into two smaller milestones could help people stay engaged. Another idea: a 5-minute recap at the end would help cement learning."
```

3. Read the agent logs your facilitator provides. Look for:
   - Where does it go wrong? (What instruction or step caused the harsh tone?)
   - Was it missing the "start with something positive" rule?
   - Did it forget to use the "Have you considered..." framing?

4. Open your `.github/agents/workshop-feedback.md` file from Module 2

5. Edit it to add or emphasize:

```markdown
## Core Rules for Kind Feedback

- Always start with something positive: "I loved X about this workshop!"
- Be encouraging and supportive
- Feedback should build up, not tear down
- Frame suggestions as questions or ideas: "Have you considered...?" or "One thought: ..."
- Never use harsh words like "terrible," "disaster," "wrong," or "bad"
- End with encouragement: "You're on the right track!"
```

6. Save and commit:

```bash
git add .github/agents/workshop-feedback.md
git commit -m "Reinforce kind feedback rules in workshop agent"
```

7. Test the agent again with the same input your facilitator provided

8. Verify: Does it now give kind feedback?

**Success Criteria**:

✅ You identified the instruction(s) that caused harsh behavior

✅ You added or clarified rules to prevent harsh feedback

✅ Agent now gives kind feedback on the same test input

✅ You can explain the exact change you made that fixed it

---

### Exercise 7: Untangle Context Confusion 🧠

**Objective**: Understand how context windows cause agent confusion

**Duration**: 10 minutes

**Steps**:

1. Your facilitator will provide a chat log showing context confusion. Example scenario:

```
User (Turn 1): "I'm building a Python workshop"
Agent: "Great! Here's a Python curriculum..."

User (Turn 5): "What time should breaks be?"
Agent: "Breaks in Python are important for code readability..."
[Agent forgot it was discussing workshop timing, not code!]
```

2. Read the full chat history provided by your facilitator

3. Find the exact turn/message where the agent gets confused. Ask yourself:
   - Did the agent forget what a "workshop" is?
   - Did it mix up different concepts (e.g., Python breaks vs. workshop breaks)?
   - Did the context window get too long and truncate important info?
   - Did a conflicting instruction confuse the agent?

4. Write down:
   - **Where confusion started**: "After Turn X..."
   - **What went wrong**: "Agent thought..."
   - **Why it happened**: "Because..." (missing context, conflicting instructions, ambiguous wording, etc.)

5. Create a file called `CONTEXT-CONFUSION-ANALYSIS.md` and document:

```markdown
# Context Confusion Analysis

## The Problem
[Describe what the agent got confused about]

## Where It Started
Turn X: [The exact message that caused confusion]

## Why It Happened
- [ ] Context window truncation (too many messages)
- [ ] Conflicting instructions
- [ ] Ambiguous wording
- [ ] Agent hallucination
- [ ] Other: ___

## The Explanation
[2-3 sentences explaining the root cause]

## How to Prevent It
[What instruction or clarification would prevent this?]
```

6. Fill in this analysis based on the logs

7. Optional: Update `.github/agents/workshop-feedback.md` with a clarification that prevents this confusion

**Success Criteria**:

✅ You pinpoint the exact turn/message where confusion occurs

✅ You identify the root cause (context, instructions, or ambiguity)

✅ You explain why it happened in 2-3 sentences

✅ You suggest a fix (instruction, clarification, or context management strategy)

---

### Exercise 8: Add MCP Integration 🔌

**Objective**: Extend your agent with external data via Model Context Protocol

**Duration**: 10 minutes

**Steps**:

1. Your facilitator will either:
   - Set up a live MCP server called `workshop-templates-api` (available to query), OR
   - Provide logs of an agent successfully using MCP

2. If MCP is live, configure your agent to use it:
   - Ask your facilitator for the MCP server details (endpoint, available functions)
   - Open `.github/agents/workshop-feedback.md`
   - Add a new section:

```markdown
## External Tools (MCP Integration)

You have access to the `workshop-templates-api` MCP server.

Use it to fetch real workshop templates when asked:
- `/templates/beginner/[subject]` — beginner workshop template
- `/templates/intermediate/[subject]` — intermediate template
- `/templates/expert/[subject]` — expert template

When a user asks you to review or compare workshops, fetch a template from the API and use it as a reference.
```

3. Test your agent by asking:

```
@workshop-feedback Fetch a beginner Python workshop template and review it for me.
```

4. If MCP is not live, your facilitator will provide chat logs showing successful MCP usage. Analyze these logs:
   - Where does the agent call the MCP server?
   - What data does it retrieve?
   - How does it incorporate external data into its feedback?

5. Create a file called `MCP-INTEGRATION-NOTES.md`:

```markdown
# MCP Integration for Workshop Feedback Agent

## What is MCP?
[Write 2-3 sentences: Model Context Protocol allows agents to call external tools/APIs]

## How We Use It
[Describe what data the workshop-templates-api provides]

## Example
[Show a sample query and response, or from the logs]

## Benefit
[How does this make the agent better? e.g., "Now it can compare against real templates instead of guessing"]
```

6. Fill in this file based on your experience (live or via logs)

7. If you made changes to the agent file, commit:

```bash
git add .github/agents/workshop-feedback.md MCP-INTEGRATION-NOTES.md
git commit -m "Add MCP integration to workshop feedback agent"
```

**Success Criteria**:

✅ Agent successfully uses external data (either live or via logs)

✅ You can describe what the MCP server provides

✅ You explain how external data improves agent feedback

✅ You understand MCP integration and why it matters

---

## Module 3 Summary

Excellent work! You've taken your feedback agent from Module 2 and enhanced it with:

- **Multi-model thinking**: Understanding how different models approach problems
- **Debugging skills**: Finding and fixing agent behavior issues
- **Context awareness**: Knowing how context windows affect reasoning
- **External tools**: Integrating real data sources via MCP

Your agent is now production-ready and capable of advanced reasoning patterns.

### What You've Learned

| Concept | What It Means | Why It Matters |
|---------|---------------|----------------|
| **Multi-model comparison** | Different AI models prioritize feedback differently | Choose the right model for your use case |
| **Agent debugging** | Trace logs show exactly where agents go wrong | You can fix behavior systematically |
| **Context management** | Long conversations can cause confusion | Keep context focused and clear |
| **MCP integration** | Agents can access real external data | Feedback improves with real information |

---

## Final Challenge (Optional)

Combine everything you learned:

1. Ask your agent to review a real workshop (from your organization or from the web)
2. Use MCP to fetch a template and compare
3. Ask two different models for feedback
4. Debug any issues
5. Present the best feedback to a facilitator

Your feedback agent is now a powerful tool for workshop improvement!

---

*Hands-on lab exercises for GitHub Copilot Developer Training — Workshop Feedback Agent*
