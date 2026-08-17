# Module 1: Foundations — Workshop Guide — Part 1

> **Slide generation instructions**:
>
> - Brand the deck with GitHub and Microsoft visual identity.
> - Use corporate minimal styling: clean layouts, restrained color, high readability, and light backgrounds for all slide types (cover, section, content, comparison, summary).
> - Keep slides professional and uncluttered, with clear hierarchy and consistent typography.
> - **Honor every `Slide topic (N slide)` marker exactly**: produce N slides for that topic, one topic per slide. Never merge two topics onto one slide, and never split one topic across extra slides.
> - **Generate one slide per bullet-grouped topic and preserve every bullet and table row.** Do not drop, collapse, or condense list items or comparison rows.
> - Before generating slides, build the deck from this exact contract:
>   - 1 title slide from the H1
>   - 1 `## Session Agenda` slide
>   - 1 slide for each `Slide topic (1 slide)` marker, in source order
>   - 1 mission briefing slide for each `### 🎯 MISSION` marker, in source order
>   - No extra recap, wrap-up, section-divider, or handoff slides unless the source contains an explicit `Slide topic` marker for that slide
> - Ignore marker examples inside this slide-generation instruction block when counting `Slide topic` and `### 🎯 MISSION` markers.
> - The planned deck for this part is 10 slides: 1 title slide, 1 Session Agenda slide, and 8 source `Slide topic` slides. It covers Sections 1-2: baseline surfaces, enterprise trust, inline assistance, and built-in Copilot experiences. There are no lab or mission transition slides in Part 1; missions are consolidated at the end of Part 2.
> - Do not generate separate Workshop Overview or Learning Objectives slides. Use any summary or objectives text only as source context for the title, agenda, or presenter notes.
> - Count the planned slides before generating. If the planned deck is 21 slides or fewer, generate one complete deck.
> - If the planned deck exceeds 21 slides, split it into two decks at a natural section boundary. Do not compress the material into 21 slides.
> - A 21-slide output is incomplete when the planned deck exceeds 21 slides or when any `Slide topic`, lab transition, prompt/code block, table row, or final-section outcome is missing.
> - Generate dedicated slides for the title and `## Session Agenda`; do not skip, merge, or reorder these.
> - Do not merge two `Slide topic` markers onto one slide, even if the content appears related.
> - Do not move a topic across section boundaries.
> - **Treat workshop wording as authoritative — do not summarize, paraphrase, or reword away meaning.** Minor connector-word edits are allowed only to improve flow.
> - **Reproduce code blocks, prompts, commands, and numeric values verbatim** — never truncate or rewrite them.
> - **Do not add content that is not in the source**: no AI-authored intro, recap, agenda, transitions, or marketing phrasing.
> - Do not introduce concepts, tools, commands, workflows, named features, or examples that are not present in this source file.
> - Do not use or infer content from other workshop modules.
> - Preserve the section order and numbering exactly as written.
> - Render **AI Safety Moment** and **Usage Optimization** callouts in distinct badged content boxes, keeping their wording verbatim so the tip category is instantly recognizable.
> - Preserve prompt and code blocks verbatim on the corresponding "Show me" and "Now you try" slides.
> - If content does not fit on one slide, reduce visual decoration; do not summarize, drop rows, or combine topics.
> - Control slide layout deliberately so content stays readable and structured on-slide.
> - Generate visual imagery that directly represents the slide wording and reinforces its meaning.

**Duration**: 2 hours (120 min: 75 min verified presentation + 45 min Agent Mergewell mission play)
**Format**: Presentation + Hands-On
**Audience**: Software engineers and technical leads — any Copilot experience level
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

**Module summary**: This Foundations module builds a durable mental model for daily GitHub Copilot use by adult engineers. Part 1 covers where Copilot lives and how to reach it, enterprise safety and IP responsibilities, and the two core interaction patterns—inline assistance and the Ask/Plan/Agent autonomy spectrum. It closes with a 15-minute hands-on exercise that anchors mode selection and scoped context before cost and advanced topics in Part 2.

**Learning objectives**:

- Explain where Copilot lives across IDE, terminal, GitHub.com, cloud, and Copilot app surfaces
- Apply VS Code chat references, inline completions, inline chat, and Ask/Plan/Agent modes to real engineering tasks
- Identify enterprise privacy, IP, and safety responsibilities before generating or accepting output

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Where Copilot lives and enterprise safety | 15 min |
| 2 | Inline assistance and Ask/Plan/Agent | 20 min |

## 1. Where GitHub Copilot Lives and Enterprise Safety (15 min)

### Key Points

- **Slide topic (1 slide): Where GitHub Copilot Lives (IDE, terminal, GitHub.com, cloud, Copilot app)** — Copilot surfaces span VS Code and other IDEs, the terminal through Copilot CLI, GitHub.com features such as Copilot on pull requests and issues, cloud-based assistance, and the Copilot app where available. Knowing which surface fits which task prevents context mismatches and unnecessary cost. **AI Safety Moment**: confirm org policy and repository access before using cloud or app surfaces, and check that cross-surface context boundaries match your organization's data-handling expectations.

- **Slide topic (1 slide): VS Code Chat References (#file, #selection, slash commands)** — VS Code Copilot Chat supports `#file`, `#selection`, `#codebase`, slash commands such as `/explain` and `/fix`, and participant shortcuts, giving engineers precise control over what context the model sees. Starting with the smallest useful reference and expanding only when needed produces faster, more reviewable responses. **Usage Optimization**: start with `#selection` or `#file` for a bounded scope; escalate to `#codebase` only when the question genuinely requires cross-file reasoning.

- **Slide topic (1 slide): Copilot CLI — Terminal-First Assistance** — GitHub Copilot CLI extends chat, command explanation, and command generation into the terminal. Install it once using the official setup guidance at <https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli>. After setup, use it for shell command help, pipeline generation, and quick security checks before committing. Detailed CLI controls for usage and model routing are covered in Part 2. **AI Safety Moment**: every generated command must be read and understood before execution; commands that touch files, install packages, or affect remote systems require extra scrutiny.

- **Slide topic (1 slide): Enterprise Privacy, IP, and Governance** — Enterprise plans include configurable data-handling expectations, prompt and output retention settings, duplicate-detection and content-exclusion options, and audit controls. These settings determine what leaves your environment and what your organization is accountable for. **AI Safety Moment**: treat all generated output as draft material requiring human review; verify provenance-sensitive suggestions against your team's IP policy; responsibility for accepted code stays with the developer and reviewer, not the model.

### 🛡️ Safety Moment

- Confirm surface access and org policy before expanding context to cloud or app experiences.
- Generated output is a draft, not a signed-off deliverable. Human review is always required.

## 2. Inline Assistance and Ask/Plan/Agent (20 min)

### Key Points

- **Slide topic (1 slide): Inline Completions vs. Inline Chat — Two Complementary Patterns** — Code completions provide low-friction in-flow suggestions without leaving the editor and are not billed in GitHub AI Credits on paid plans. Inline chat opens a targeted conversation anchored to a selection, making it the right tool for bounded transformations such as refactors, type annotation, localized explanations, and small fixes. **Usage Optimization**: use completions for flow and inline chat for deliberate transformations; match the tool to the interruption cost of the task.

- **Slide topic (1 slide): Ask, Plan, and Agent — The Autonomy Spectrum** — GitHub Copilot's built-in experiences represent increasing levels of autonomy. Ask answers questions and explains behavior with no file changes. Plan proposes a sequenced approach for review before any edits are made. Agent executes constrained multi-step work when the task has clear acceptance criteria, a known scope, and a rollback path. These three patterns exist in the current product and serve as the mental model for all later agentic work. **AI Safety Moment**: escalate from Ask to Plan to Agent only when acceptance criteria, scope, and rollback are explicit; higher autonomy requires a correspondingly tighter review gate.

- **Slide topic (1 slide): Demo — Ask, Plan, and Agent with a Scoped Selection** — Facilitator demonstrates how the same question produces different results across all three modes using a small code selection, then states the expected observable difference: Ask explains, Plan proposes steps, Agent identifies executable work.

  ```text
  Explain how the built-in Ask, Plan, and Agent experiences would handle #selection differently for this change.
  ```

  **AI Safety Moment**: keep Agent mode behind an explicit approval gate; do not accept edits before reviewing the proposed change set.

- **Slide topic (1 slide): Hands-On — Vary the Context Scope** — Attendees repeat the same prompt, then swap `#selection` for `#file` to observe how a larger context scope changes Ask, Plan, and Agent responses. The goal is a concrete intuition for context scope as an input variable.

  ```text
  Explain how the built-in Ask, Plan, and Agent experiences would handle #file differently for this change.
  ```

  **Usage Optimization**: compare one scope variable at a time so the difference in output quality is measurable and reviewable.

### 🛡️ Safety Moment

- Escalate Ask → Plan → Agent only when the task's acceptance criteria and rollback path are explicit.
- Read every proposed change set before accepting it, regardless of apparent confidence in the response.

### 🖥️ Demo: Mode Selection and Context Scoping

1. Select a small code block and ask Copilot to explain it with `#selection`.
2. Switch the task to Plan and compare the output format.
3. Switch to Agent and observe the difference in execution intent and review requirements.

### 💡 Optimization Tip: Match Mode to Task Risk

Use Ask for understanding, Plan for reviews before edits, and Agent only when scope and rollback are explicit. Inline completions handle flow; inline chat handles bounded transformations. Never use a higher-autonomy mode because it feels faster.

### Current slide 10 delivery handoff — `Built in Agents` (20 minutes)

For the current approved 24-slide generated deck, slide 10 consolidates this
section's explanation, demonstration, and comparison into one runnable
20-minute instruction block. The current manifest's count, title, and timing
remain authoritative over the older Part 1 packet decomposition. Do not change
the participant-facing slide text.

Use a disposable, non-confidential local practice repository with one
pre-staged file, `field-notes.js`:

```js
export function formatFieldNote(note) {
  return note.trim();
}
```

The one bounded task is to preserve trimmed non-empty notes while returning
`"(untitled)"` for whitespace-only input. Only `field-notes.js` may change.
Use these requests exactly:

**Ask**

```text
Using only #selection, explain what formatFieldNote does for "  Safety  " and "   ". Identify the gap against this requirement: whitespace-only input must return "(untitled)". Do not edit files or run commands.
```

**Plan**

```text
Using only #selection and field-notes.js, propose the smallest change so formatFieldNote trims non-empty input and returns "(untitled)" for whitespace-only input. Include checks for "  Safety  " and "   ". Do not edit files or run commands.
```

**Agent**

```text
Update only field-notes.js to implement the approved plan. Do not create, delete, rename, or edit any other file. Do not run commands, install packages, or use the network. Stop and ask if the change requires anything outside this boundary. Then show the diff and explain how the two checks are satisfied.
```

Use this authoritative delivery progression:

| Boundary | Minutes | Human checkpoint |
|---|---:|---|
| Confirm the disposable repository, selected function, installed host controls, and rollback copy | 2 | Stop if the selected VS Code build does not expose the intended Ask, Plan, and Agent experiences. |
| Run Ask and compare the two inputs without edits | 3 | Confirm that no file changed and that the requirement gap is stated. |
| Run Plan and inspect the proposed file, behavior, checks, and exclusions | 4 | Do not authorize implementation until the plan stays inside the one-file boundary. |
| Make the human plan decision | 2 | Approve, revise, or stop; never treat a proposed plan as permission to edit. |
| Run the bounded Agent request | 4 | Stop on any request for another file, command, package, network access, or broader scope. |
| Inspect the diff and manually evaluate both expected results | 3 | Confirm `"  Safety  "` becomes `"Safety"` and `"   "` becomes `"(untitled)"`; accept or restore the starter. |
| Compare Ask, Plan, and Agent and restore the known starter state | 2 | Name the smallest sufficient interaction and the checkpoint that changed the human decision. |
| **Total** | **20** | |

Before delivery, verify the exact labels and behavior in the installed VS Code
and GitHub Copilot versions. Ask, Plan, Agent, and context-reference support
vary by host and configuration; do not rename another control, imply
cross-surface parity, or conflate local Agent mode with GitHub Copilot cloud
agent. If the approved host does not expose all three experiences, use a
pre-reviewed captured result for the unavailable step and walk through the
same boundary, diff, and human checkpoints rather than improvising a live
workflow or broadening permissions.

*Part 1 presentation content complete — missions are presented at the end of Part 2 as a consolidated 45-minute Agent Mergewell play block.*

*Part 1 slide-generation packet for GitHub Copilot Developer Foundations Workshop*