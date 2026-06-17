# Module 1: Foundations Content Refresh — Workshop Guide

**Duration**: 2 hours (120 min: 90 min content + 30 min lab)  
**Format**: Presentation + Live Demo + Hands-On  
**Audience**: Developers with basic GitHub Copilot exposure  
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

---

## Session Agenda (Slide 2)

| Section | Topic Group | Time |
|---------|-------------|------|
| 1 | Stage 1: Surfaces, privacy, and baseline interaction model | 15 min |
| 2 | Stage 2: IDE + CLI workflows (modes, chat features, inline edits) | 20 min |
| 3 | Stage 3: Token economics, AIC, model routing, and context windows | 25 min |
| 4 | Stage 4: Autonomy spectrum, permissions, and custom agents | 20 min |
| 5 | Wrap-up and Stage 1-4 hand-off | 10 min |
| — | Lab time across 4 exercises | 30 min |

## Workshop Overview

This Foundations module now aligns explicitly to **Stage 1-4** of the approved 8-stage model. Each bullet in `### Key Points` is written as a one-topic-per-slide unit for NotebookLM ingestion and PPTX generation. The flow progresses from core awareness to guided usage, then optimization, then controlled autonomy.

> **NotebookLM guidance**: Keep discussion prompts out of slide bullets. Use them only as presenter notes / talk track.

### Learning Objectives

- Recognize and apply Stage 1-4 progression in day-to-day Copilot work
- Use completions, inline chat, and Ask/Plan/Agent modes with stage-appropriate decisions
- Explain privacy, IP, token, and AIC usage fundamentals for enterprise environments
- Choose models and context scope based on cost, quality, and task complexity
- Apply least-privilege autonomy and custom-agent guardrails safely

---

## 1. Stage 1 — Surfaces, Privacy, and Baseline Interaction Model (15 min)

### Key Points

- **Slide topic: Stage 1 objective** — establish shared vocabulary and safe baseline usage before optimization or delegation.
- **Slide topic: Where GitHub Copilot lives** — IDEs, GitHub.com, and terminal workflows, including GitHub Copilot App context.
- **Slide topic: Enterprise privacy and IP boundaries** — data handling expectations, policy controls, and indemnity framing.
- **Slide topic: Core interaction types** — completions, inline chat, and Ask/Plan/Agent as progressive autonomy options.

### 🛡️ Safety Moment

- Treat Copilot output as draft code and draft reasoning, never auto-approved production truth.
- Clarify ownership: human reviewers own correctness, compliance, and merge decisions.
- Use least-autonomy-first workflow selection for lower-risk operation.

<!-- Presenter notes:
Which Copilot surface is your team already using most, and why?
Where should explicit approval gates exist before accepting generated output?
Which Stage 1 concept is most likely to be misunderstood by new users?
-->

### 🔬 LAB: Exercise 1 — Stage 1 Baseline and Safety Signals

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 1 (8 min) identifying surfaces, selecting an interaction mode, and validating safety boundaries before continuing.

---

## 2. Stage 2 — Guided IDE + CLI Workflows (20 min)

### Key Points

- **Slide topic: Stage 2 objective** — move from awareness to repeatable guided usage in IDE and terminal workflows.
- **Slide topic: VS Code chat extension tour** — slash commands, participants, `#file`, and `#selection`.
- **Slide topic: Copilot CLI tour** — installation guidance (`<https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli>`) and terminal-first workflows.
- **Slide topic: Modes in practice** — Ask for explanation, Plan for design, Agent for constrained execution.

### 🛡️ Safety Moment

- Never run suggested commands without reading and validating impact.
- Keep prompts scoped to active files and selections to reduce accidental overreach.
- Require explicit review before accepting multi-file agent edits.

### 🖥️ Demo: Stage 2 Workspace-to-Terminal Flow

1. Show `#selection` and `#file` in VS Code chat for scoped requests.
2. Run one slash command and one Ask/Plan/Agent prompt sequence.
3. Open CLI and show interactive and direct-prompt usage:

```powershell
copilot
/help
copilot -p "Summarize this repository in 5 bullets."
```

### 💡 Optimization Tip: Scope Before Power

- Prefer `#selection` or `#file` before `@workspace` to limit token load.
- Ask mode is often enough for understanding; Plan mode is often enough for design.
- Reserve Agent mode for tasks that truly need execution.

<!-- Presenter notes:
When does CLI outperform IDE chat for your team?
Which command and scope pattern most reduces noise in answers?
Which criteria tell you a Stage 2 task is ready for Stage 3 optimization?
-->

### 🔬 LAB: Exercise 2 — Stage 2 Guided Workflow Repetition

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 2 (8 min) running the same task across Ask, Plan, and Agent with scoped context in IDE and CLI.

---

## 3. Stage 3 — Token Economics, AIC, Models, and Context Windows (25 min)

### Key Points

- **Slide topic: Stage 3 objective** — optimize quality and cost without weakening validation standards.
- **Slide topic: What is a token** — input, output, and cache token concepts.
- **Slide topic: What is AIC** — transition framing from PRUs to AIC and license allocation comparisons.
- **Slide topic: AIC by license tier** — explicit Business vs Enterprise allocation expectations and planning implications.
- **Slide topic: Usage visibility** — session-level usage and monthly accumulation review patterns.
- **Slide topic: Model-routing decisions** — fast model vs reasoning model by task complexity.
- **Slide topic: Rubber Duck pattern** — using structured reasoning dialogue before editing to reduce avoidable rework.
- **Slide topic: Context window anatomy** — packing, compaction, and context rot detection.

### 🛡️ Safety Moment

- High-token prompts can hide critical constraints inside noisy context.
- Cost optimization must not remove necessary test, security, or validation steps.
- Start new sessions when context rot appears instead of forcing long degraded threads.

### 🖥️ Demo: Stage 3 Usage and Context Diagnostics

1. Show an intentionally broad prompt and compare it with a scoped prompt.
2. Review token and context indicators in the active Copilot experience.
3. Compare one fast model and one reasoning model on the same task.

### 💡 AIC Optimization Tip: Spend Less, Decide Better

- Use smaller and faster models for straightforward tasks.
- Use larger reasoning models for architecture and ambiguity-heavy work.
- Keep context compact and explicit to reduce token waste, drift, and unnecessary AIC consumption.

<!-- Presenter notes:
Which tasks in your backlog are overpaying for model capability?
How does your team currently detect context rot before quality drops?
Where should AIC and token usage be reviewed: per developer, per team, or both?
-->

### 🔬 LAB: Exercise 3 — Stage 3 Token, AIC, and Model Decisions

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 3 (7 min) comparing scoped vs broad prompts, model choices, and usage implications.

---

## 4. Stage 4 — Controlled Autonomy, Delegation Permissions, and Custom Agents (20 min)

### Key Points

- **Slide topic: Stage 4 objective** — delegate safely with explicit boundaries, approvals, and off-ramps.
- **Slide topic: Autonomy spectrum and delegating permissions** — choose the minimum autonomy needed.
- **Slide topic: What is a custom agent** — package repeatable behavior, scope, and tool constraints for safer execution.

### 🛡️ Safety Moment

- Increased autonomy requires stricter approvals and clearer off-ramps.
- Tool permissions should be purpose-limited and auditable.
- Agents should stop and escalate on ambiguity rather than guessing.

### 🖥️ Demo: Stage 4 Custom Agent Framing

1. Show a small custom-agent instruction file with explicit guardrails.
2. Demonstrate one constrained task and inspect proposed edits before acceptance.

### 💡 Optimization Tip: Encode Guardrails Once

- Put durable constraints into instructions and agent definitions.
- Keep agent responsibilities narrow to improve reliability.
- Reuse templates for safe delegation rather than ad hoc prompting.

<!-- Presenter notes:
Which recurring task in your team is a good Stage 4 custom-agent candidate?
What minimum guardrails should every custom agent include?
Which decision criteria should block delegation and require a human-only path?
-->

### 🔬 LAB: Exercise 4 — Stage 4 Guardrailed Delegation Starter

> **Instructor**: Pause here for hands-on practice. Students complete Exercise 4 (7 min) creating a constrained custom-agent starter and testing one low-risk delegated task.

---

## 5. Wrap-up and Stage 1-4 Hand-off (10 min)

### Key Points

- Foundations now maps explicitly to Stage 1-4 with one-topic-per-slide intent for downstream PPTX generation.
- Teams should combine mode selection, context discipline, AIC awareness, and review gates into one operating model.
- Module 2 (Agentic) extends these foundations with deeper instruction, memory, tool, and orchestration patterns.

<!-- Presenter notes:
Which Stage 1-4 shift will your team apply first?
Which stage-specific decision rule should be added to team onboarding docs?
-->

*Workshop guide for Module 1: Foundations Content Refresh — GitHub Copilot Developer Training*
