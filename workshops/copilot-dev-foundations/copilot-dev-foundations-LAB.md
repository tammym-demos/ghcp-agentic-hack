# Module 1: Foundations Content Refresh — Hands-On Lab

## Overview

This lab creates the **Copilot Quest starter** — a Wordle-style CLI word game that Module 2 will extend. Exercises move from baseline recognition to guided workflow use, then optimization decisions, then guardrailed delegation so the result is a reusable game starter for the rest of the sequence.

- **Total time**: ~30 minutes
- **Prerequisites**:
  - VS Code with GitHub Copilot enabled
  - GitHub Copilot CLI installed
  - Any local multi-file repository

## Exercise 1: Stage 1 Baseline — Surfaces, Safety, and Mode Selection

**⏱️ Time**: 8 min  
**📋 Objective**: Identify Copilot surfaces, select a safe baseline mode, and confirm review ownership

1. List where you can access Copilot in your workflow (IDE, browser, terminal) and name one task for each surface.
2. Write a one-sentence description of **Copilot Quest** — the word game you want to build for this repo or project.
3. In VS Code chat, run:

```text
Explain the difference between Ask, Plan, and Agent mode for this repository.
```

4. Select a code block and run:

```text
/explain #selection
```

5. Record which mode is safest for a low-risk understanding task and why.

**🛡️ Safety checkpoint**: Treat all output as draft and define the human review gate before accepting any suggestion.

### ✅ Success Criteria

- ✅ Identified IDE, browser, and terminal surfaces
- ✅ Ran one scoped explanation with `#selection`
- ✅ Chose a stage-appropriate mode with rationale
- ✅ Stated explicit human review ownership
- ✅ Defined the starter-kit theme you will extend in later modules

## Exercise 2: Stage 2 Guided Workflows — IDE + CLI Repetition

**⏱️ Time**: 8 min  
**📋 Objective**: Practice scoped prompts, slash commands, and IDE/CLI parity for the same task

1. In VS Code chat, run one scoped request with `#file` and one with `#selection`.
2. Create or refine `.github/copilot-instructions.md` for **Copilot Quest** (for example: scoring rules, tone, and guess-feedback behavior).
3. Run one slash command against selected code:

```text
/fix #selection
```

4. Switch the same request through Ask, Plan, and Agent mode and compare output.
5. Capture a session checkpoint with:

```text
/chronicle
```

6. From the `/chronicle` output, write two short lists in your notes: **Tips** and **Cost-savings tips**.
7. In terminal, run:

```powershell
copilot
/help
copilot -p "List the top 3 folders a new contributor should read first."
```

8. Capture one rule for when you should stay in Stage 2 instead of escalating autonomy.

**🛡️ Safety checkpoint**: Validate command suggestions before execution and reject unclear multi-file proposals.

### ✅ Success Criteria

- ✅ Used scoped context in both IDE and terminal workflows
- ✅ Used at least one slash command and compared mode behavior
- ✅ Captured one `/chronicle` checkpoint after mode comparison
- ✅ Extracted both **Tips** and **Cost-savings tips** from `/chronicle`
- ✅ Ran both interactive and direct CLI prompts
- ✅ Captured one Stage 2 decision rule
- ✅ Added one reusable instruction to the starter kit

## Exercise 3: Stage 3 Optimization — Tokens, AIC, Models, and Context

**⏱️ Time**: 7 min  
**📋 Objective**: Make cost and quality decisions using token scope, AIC awareness, and model routing

1. Ask one broad `@workspace` prompt, then ask a scoped `#file` prompt for the same objective.
2. Compare quality and token impact signals.
3. Re-run the scoped prompt with two available models.
4. Note when higher capability is worth additional AIC usage.
5. Record one context-rot warning sign and one reset strategy.
6. Draft a short prompt template or checklist that Module 2 can reuse for adding guesses, scoring, and hints to the game.
7. Capture an optimization handoff snapshot with:

```text
/chronicle
```

8. From the `/chronicle` output, add at least one new **Cost-savings tip** tied to token scope, retries, or model selection.

**🛡️ Safety checkpoint**: Do not optimize cost by skipping tests, validation, or security checks.

### ✅ Success Criteria

- ✅ Compared broad vs scoped context behavior
- ✅ Compared at least two model responses
- ✅ Captured one AIC-aware routing decision
- ✅ Documented one context reset trigger
- ✅ Produced one reusable prompt/checklist asset for the next module
- ✅ Captured one `/chronicle` optimization checkpoint
- ✅ Added at least one `/chronicle`-derived **Cost-savings tip**

## Exercise 4: Stage 4 Delegation — Custom Agent Guardrails

**⏱️ Time**: 7 min  
**📋 Objective**: Create a constrained custom-agent starter and test low-risk delegation

1. Create `.github/agents/foundations-helper.agent.md` with a narrow, single-purpose scope.
2. Add one rule requiring explanation before edits and one off-ramp for ambiguity.
3. Ask the agent to perform one low-risk change in a single file.
4. Review proposed edits before acceptance.
5. Document which permission boundary kept the task safe.
6. Run:

```text
/chronicle
```

7. Save a short starter summary (using the `/chronicle` output) that explains what Module 2 should extend next in Copilot Quest, including one **Tip** and one **Cost-savings tip** for handoff.

**🛡️ Safety checkpoint**: Keep tool permissions minimal and reject unclear or high-blast-radius tasks.

### ✅ Success Criteria

- ✅ Created a custom-agent starter file
- ✅ Added explicit guardrails and escalation behavior
- ✅ Executed one constrained delegation and reviewed edits
- ✅ Documented one Stage 4 delegation policy
- ✅ Captured a handoff note for the next module
- ✅ Captured one final `/chronicle` handoff summary

*Hands-on lab for Module 1: Foundations Content Refresh — GitHub Copilot Developer Training*
