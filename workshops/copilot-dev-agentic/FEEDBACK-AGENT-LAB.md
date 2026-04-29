# Workshop Feedback Agent Lab — Module 2

**Duration**: 40 minutes (4 exercises)
**Difficulty**: Beginner to Intermediate
**What You'll Build**: A kind, constructive feedback agent that critiques workshops with humor and genuine helpfulness

---

## Module 2 Overview

You're building a **Workshop Feedback Agent**—it gives kind, constructive, humorous feedback on workshops and agendas. Throughout this lab, you'll enhance the same agent with personality, instructions, and real-world testing. In Module 3, you'll take this agent even further using advanced techniques like multi-model comparison, debugging, and external tool integration.

### Learning Objectives

By the end of this module, you will:

- Understand how custom instructions shape agent personality
- Create and configure your first Copilot agent
- Test agents interactively in VS Code
- Observe the Plan-Act-Observe-Reflect (RALPH) loop in action

---

## Preparation

Before you start, ensure you have:

- VS Code with the GitHub Copilot extension installed
- A GitHub Copilot subscription or trial
- Copilot Chat enabled (press `Ctrl+Shift+I` to open)
- A local Git repository or the ability to commit files

---

### Exercise 1: Create Custom Instructions 🤖

**Objective**: Set up personality rules for your agent

**Duration**: 10 minutes

**Steps**:

1. In your project root, create the directory `.github` (if it doesn't exist)

2. Inside `.github`, create a new file called `copilot-instructions.md`

3. Add the following instructions:

```markdown
# Copilot Custom Instructions

You are a friendly, constructive feedback agent.

You give kind suggestions with humor and genuine helpfulness.

Always start with "I loved X about this workshop!" then offer 3 specific, actionable suggestions.

Be encouraging, never discouraging. Focus on building up, not tearing down.

Use emoji and casual, supportive tone.
```

4. Save the file

5. Commit to Git:

```bash
git add .github/copilot-instructions.md
git commit -m "Add Copilot custom instructions for feedback agent"
```

**Success Criteria**:

✅ File `.github/copilot-instructions.md` exists with personality rules clearly defined

✅ You can see the file in VS Code

✅ Git commit is successful

---

### Exercise 2: Create Your First Agent 🎯

**Objective**: Build the feedback agent with specific instructions and personality

**Duration**: 10 minutes

**Steps**:

1. Create the directory `.github/agents` in your project root (if it doesn't exist)

2. Inside `.github/agents`, create a new file called `workshop-feedback.md`

3. Add the following agent instructions:

```markdown
# Workshop Feedback Agent

You review workshop agendas, formats, and structures.

For each workshop you review:
- Identify 3 strengths (what works well)
- Suggest 3 kind, practical improvements
- Be specific (reference actual timing, content, structure)
- Use emoji and a friendly, supportive tone

Always start with "I loved [specific strength] about this workshop!"

Never be harsh. Frame suggestions as "Have you considered..." or "One thought: ..."

Your goal is to help workshop facilitators improve, not criticize.
```

4. Save the file

5. Commit to Git:

```bash
git add .github/agents/workshop-feedback.md
git commit -m "Add workshop feedback agent"
```

6. Test the agent in VS Code:
   - Press `Ctrl+Shift+I` to open Copilot Chat
   - Type: `@workshop-feedback Review this bad agenda: 9am-5pm workshop, 5 hours of slides back-to-back, 30 min lunch, no breaks`
   - Press Enter and send

**Success Criteria**:

✅ File `.github/agents/workshop-feedback.md` exists with agent personality defined

✅ When you mention `@workshop-feedback` in Copilot Chat, it recognizes the agent

✅ Agent responds with friendly feedback (e.g., "I loved that you planned a full day!" or "Have you considered adding breaks?")

✅ You can see the agent understood the friendly, supportive persona

---

### Exercise 3: Test Your Agent with Real Workshop Data 💬

**Objective**: Practice using your agent with realistic workshop scenarios

**Duration**: 10 minutes

**Steps**:

1. Open Copilot Chat in VS Code (`Ctrl+Shift+I`)

2. Ask your agent this question:

```
@workshop-feedback I have a 9-3 workshop (6 hours) with 5 hours of content, 30 min lunch, and 2 hours of lectures back-to-back at the end. Review this.
```

3. Read the feedback carefully. Does it:
   - Start with something positive?
   - Offer 3 specific suggestions?
   - Use a friendly tone?

4. Try a second test. Ask:

```
@workshop-feedback Build a 2-hour workshop for beginner Python developers. What should the agenda look like?
```

5. Compare the two responses. Notice:
   - How does the agent structure its feedback?
   - Does it give actionable advice?
   - Is the tone consistently supportive?

**Success Criteria**:

✅ Agent responds with kind suggestions (e.g., "Add breaks!", "Break up lectures into smaller chunks!")

✅ Feedback is specific and references the actual workshop described

✅ Tone is friendly and encouraging, not critical

✅ Agent provides 3+ actionable suggestions in each response

---

### Exercise 4: Observe the RALPH Loop 🔍

**Objective**: See how your agent thinks step-by-step using the Plan-Act-Observe-Reflect loop

**Duration**: 10 minutes

**Steps**:

1. In VS Code, open the Debug Console:
   - Go to View → Debug Console (or press `Ctrl+Shift+Y`)

2. Enable extended logging if available:
   - Check the Copilot extension settings (Ctrl+Comma, search "Copilot logging")
   - Look for an option like "Verbose Logging" or "Trace Logging" and enable it

3. In Copilot Chat, ask your agent:

```
@workshop-feedback Build a 2-hour workshop for beginner Python developers. Include an agenda, break timing, and a hands-on project.
```

4. Watch the Debug Console output carefully. You should see steps that follow the RALPH loop:

   - **PLAN**: "I need to create a workshop agenda with timing..." (what will I do?)
   - **ACT**: The agent gathers what it knows about Python, beginner learners, workshop best practices (do it)
   - **OBSERVE**: The agent sees the output and checks if it answers the question (what happened?)
   - **REFLECT**: The agent adjusts—"I should break this into sections" or "Let me add specific timing" (adjust?)

5. As you read the trace, map out 4+ distinct steps. Write them down:

   ```
   STEP 1 (PLAN): ...
   STEP 2 (ACT): ...
   STEP 3 (OBSERVE): ...
   STEP 4 (REFLECT): ...
   ```

6. In your project, create a file called `RALPH-LOOP-OBSERVATION.txt` and paste your observations

**Success Criteria**:

✅ You can identify at least 4 distinct steps in the agent's thinking

✅ You can map each step to PLAN, ACT, OBSERVE, or REFLECT

✅ You explain how the loop helped the agent create better output

✅ File `RALPH-LOOP-OBSERVATION.txt` is saved with your observations

---

## Module 2 Summary

Congratulations! You've built your first agent with personality, tested it on real workshop scenarios, and observed how it thinks. You now understand:

- How custom instructions shape agent behavior
- How to create and use Copilot agents
- The RALPH loop—the core reasoning pattern behind agentic AI

**Next Steps**: Move to Module 3 to enhance your agent with multi-model comparison, debugging, context management, and external tool integration.

---

*Hands-on lab exercises for GitHub Copilot Developer Training — Workshop Feedback Agent*
