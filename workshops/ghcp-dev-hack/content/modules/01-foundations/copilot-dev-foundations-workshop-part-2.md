# Module 1: Foundations — Workshop Guide — Part 2

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
> - The planned deck for this part is 12 slides: 1 title slide, 1 Session Agenda slide, 9 source `Slide topic` slides, and 1 mission briefing slide. It covers Sections 3-5: tokenomics, usage visibility, model routing, context windows, autonomy, delegation discipline, and the Agent Mergewell mission briefing block.
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

**Duration**: 2 hours 2 minutes (122 min: 77 min instruction + 45 min Agent Mergewell mission play)
**Format**: Presentation + Hands-On
**Audience**: Software engineers and technical leads — any Copilot experience level
**Prerequisites**: VS Code, GitHub Copilot extension, GitHub Copilot CLI

**Module summary**: Part 2 builds on the surface and mode foundation from Part 1 by giving engineers a practical cost and quality operating model. Section 3 covers token economics, GitHub AI Credits billing, usage visibility, and model routing. Section 4 covers context window anatomy, context-rot detection, and the autonomy spectrum with least-privilege delegation. The module closes with two principles engineers carry into every session: route by task shape and delegate by reversibility. One continuous 45-minute Agent Mergewell scavenger hunt connects both sections and creates the case file used in Agentic Development.

**Learning objectives**:

- Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
- Detect context rot and apply context window hygiene practices
- Apply the autonomy spectrum and least-privilege delegation before escalating to agentic patterns

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 3 | Tokens, context-sensitive generation, reuse, receipts, and routing | 33 min |
| 4 | Context windows, context rot, and delegation discipline | 9 min |
| 5 | Agent Mergewell Mission Briefings | 45 min |

## 3. Tokens, Generation, Reuse, Usage Visibility, and Model Routing (33 min)

### Key Points

The adopted [context/caching source](context-caching.md) owns the exact
examples, caveats, checks and main/Details partition for the five additions
and five targeted revisions. It replaces the old all-history/every-turn,
additive-cached-input, visible-output-only and cheapest-Auto implications.
This is source reconciliation under the approved LC, not a new live demo.

| Slide | Exact topic | Minutes | Governing source |
| ---: | --- | ---: | --- |
| 11 | Tokens: What Enters the Model | 3 | context-caching.md T1 |
| 12 | From Token IDs to Numerical Representations | 2 | context-caching.md E1 |
| 13 | How Context Shapes the Next Token | 3 | context-caching.md N1 |
| 14 | Tokens: What Comes Back | 3 | context-caching.md T2 |
| 15 | GitHub AI Credits | 3 | context-caching.md T3 |
| 16 | Read the Usage Receipt | 3 | context-caching.md E2 |
| 17 | Reuse the Work, Not the Answer | 2 | context-caching.md N2 |
| 18 | Same Brief, New Question—or a Changed Brief? | 3 | context-caching.md N3; accepted proof |
| 19 | Model Routing: Match the Task | 3 | context-caching.md T4; accepted Scene 09 |
| 20 | Model Guide: Match the Workload | 2 | model-guide-contract.md; retained table/footer |
| 21 | Usage by Harness: IDE and CLI | 3 | context-caching.md T5 |
| 22 | Usage by Harness: GitHub, Cloud, and App | 3 | FND-01/07/11; retained content |

These twelve rows total 33 minutes. The short event question stands for a
larger host request in the synthetic receipt; no performed calls, prices,
private balances or cache-hit measurements are claimed. Keep all caveats in
their approved visible/reference states. Cached input is part of total input;
reasoning is inside reported output. Missing fields mean unknown.

### 🛡️ Safety Moment

- Do not optimize spend by skipping tests, validation, security checks, or human review.
- Escalate to higher-cost reasoning only when the task ambiguity or risk justifies the extra consumption.

### 💡 Optimization Tip: Route by Task Shape

Choose by task requirements, supported model/policy, tools and reviewable
quality. Compare latency and scoped usage as evidence, not as a universal
ranking. Auto may be a supported starting choice, not a guarantee of the
cheapest successful result. Correct wrong context even if reuse falls.

## 4. Context Windows, Autonomy Spectrum, and Delegation Discipline (9 min)

### Key Points

- **Slide topic (1 slide): Anatomy of the Context Window** — The context window combines instructions, conversation history, referenced files, tool results, and response outputs into a single token-limited container. Quality degrades when sessions accumulate stale assumptions, off-topic history, or compaction artifacts from long-running threads. **Usage Optimization**: when responses start drifting, contradicting earlier answers, or losing track of constraints, reset or re-scope the session rather than adding more context on top of the noise.

  **Approved slide 23 delivery — 2026-09-07 (formerly 18):** Keep the production title
  **Context Window: What Competes for Space**, three-minute timebox, and nine
  presenter clicks. Use the accepted fixed illustrated funnel with native
  teaching text. This is a fictional manufacturing production-reporting
  software scenario, not machine controls or customer data.

  | Click | Native headline | Exact example or result |
  |---:|---|---|
  | 1 | Instructions | Always add tests before changing shared code |
  | 2 | User prompts | Why is the production count off by twelve units? |
  | 3 | Append to User prompts; no repeated headline | Show me where that count is calculated. |
  | 4 | Append to User prompts; no repeated headline | Now fix reporting without changing the API. |
  | 5 | References & files | The production-reporting module and its unit tests |
  | 6 | Tool definitions & results | Test run: three failures in production reporting tests |
  | 7 | Prior model output | Earlier answer: a patch for reporting you did not apply |
  | 8 | Reserved output headroom | The model still needs room to answer. |
  | 9 | Compact | Summary of earlier user prompts |

  Earlier user prompts remain readable at 0.86/0.78 opacity behind the newest
  prompt. The whole reading stack fades when References & files begins;
  accumulated context remains in the vessel. Prior output is already-carried
  input. Reserved output headroom is protected empty space with a dashed
  boundary, never another input deposit. Compact continuously compresses the
  prompt material from its bottom anchor into a summary; it does not enlarge
  the vessel. The final large summary label appears once, with
  **Instructions + references retained** and **Some fine detail is dropped.**
  beneath it. These are illustrative retention semantics, not a guarantee
  about every real session's summary.

  Keep the bottom caption **Example capacity: 400K tokens** and caveat
  **Actual capacity varies by model and surface.** The number is illustrative
  only, not a live measurement or named-model limit. In Copilot CLI, `/context`
  inspects context consumption and `/compact` requests compaction. Attribute
  those commands and the documented automatic-compaction thresholds to CLI,
  not universally to every surface. FND-12 also records owner-attested VS Code
  compaction support with documentation citation pending; this illustration
  does not equate the surfaces' controls. Verify retained constraints after
  compaction. Transition to **Context Rot: Recognize the Signals**.

- **Slide topic (1 slide): Context Rot — Recognizing and Fixing It** — Context rot is the gradual degradation of response quality as a session accumulates irrelevant history, stale file references, and overwritten assumptions. Common signals: contradictory suggestions, repeated restating of already-solved problems, excessive hedging, or suggestions that ignore explicit constraints set earlier in the session. Fix by summarizing the essential state, opening a fresh session with that summary, and re-anchoring with current `#file` or `#selection` references. **Usage Optimization**: treat context rot as signal, not model failure; the fix is hygiene, not a better prompt.

- **Slide topic (1 slide): Autonomy Spectrum — Reversibility as the Governing Principle** — Delegation should scale with reversibility, blast radius, and operator confidence. Suggestion-only completions carry the lowest risk because every line is reviewed before acceptance. Reviewed plans carry moderate risk because a human approves the sequence before any edits execute. Constrained execution carries the highest risk and requires explicit acceptance criteria, narrow tool permissions, and a clear rollback path before the agent starts. **AI Safety Moment**: the question before every delegation decision is "can I cleanly undo this if the result is wrong?" If the answer is unclear, stay at a lower autonomy level until it is clear.

- **Slide topic (1 slide): Least-Privilege Delegation — The Discipline** — Least-privilege delegation means giving Copilot or a delegated agent only the permissions, file access, and tool calls the current task actually requires. A task that modifies one file does not need repository-wide write access. A task that reads configuration does not need network calls. A code review task should use read-only tool access. Narrow scope produces narrower blast radius, clearer review checkpoints, and easier audit. **AI Safety Moment**: draft the permission boundary before creating any agent or granting tool access; the boundary is the acceptance criterion for the delegation itself. Agent and skill file creation is covered in Module 2.

### 🛡️ Safety Moment

- Do not grant broad file, command, or network access when a task only requires a narrow change.
- Require a human review checkpoint at every point where scope, risk, or acceptance criteria become ambiguous.

### 💡 Optimization Tip: Delegate by Reversibility

The more reversible a task, the wider the delegation latitude. The less reversible, the narrower. Build this as a mental habit before Module 2's agent and instruction workflows.

## 5. Agent Mergewell's Foundations Scavenger Hunt (45 min)

### 🎯 MISSION: Your Mission Starts Now

> **Instructor**: Open the Missions experience and start the 45-minute clock. Participants choose VS Code, Copilot CLI, or the standalone GitHub Copilot app, then complete one continuous five-clue hunt. Each route completes the Copilot work in its selected gadget; the app route uses local sessions and inspectable canvases rather than handing work to VS Code. Gadget hints and progressive no-penalty hints are available whenever the next safe action is unclear. Reserve the final 5 minutes for case-file export and debrief.

**Agent Mergewell says:**

> "Field team, the theory board is full and Purrmission has hidden my `SOLVED` stamp again. Choose your gadget, find five clues, and bank evidence with every point. If a clue goes cold, open a hint; good investigators ask for help before they guess.
>
> The GitHub Copilot app holds an optional bonus trail, and an unfamiliar approved Copilot gadget may reveal another. Your local case file is the real prize: carry one bounded follow-up task into Agentic Development, where the case continues.
>
> Start your mission. Good luck—and please find that stamp before I deploy the magnet gadget."

**Mission goal:** Build a verified Copilot case file by choosing a gadget, finding five operating clues, proving safe decisions, and carrying one bounded task into Agentic Development.

**Core operations:**

1. Operation Pick Your Gadget
2. Operation Pack the Clue Bag
3. Operation Use the Right-Sized Gadget
4. Operation Read the Gauges
5. Operation Seal the Case

**Scoring:** 50 core points are available; 40 core points complete the mission. One optional operation can add up to 10 bonus points. Hints never reduce the score.

**Participant experience:** The schema-backed mission artifact owns the case packet, VS Code/CLI/GitHub Copilot app routes, direct actions, gadget hints, progressive hints, Purrmission checks, local scorecard, evidence fields, app bonus, optional alias-only external leaderboard, and carry-forward case file.

**Evidence you're done:** Exported case file with the chosen gadget, completed clues, evidence, score, safety boundary, final verdict, and one bounded follow-up task for Agentic Development.

**Debrief:** Which clue changed your decision, and what evidence will the software agent inherit in the next mission?

---

*Workshop guide for Module 1: Foundations — GitHub Copilot Developer Training*

*Part 2 slide-generation packet for GitHub Copilot Developer Foundations Workshop*
