# Foundations, Agentic, and Advanced Content Improvement Plan from 2026-07-02 Feedback

**Workspace markdown deliverable**: `plan\feedback-20260702-content-improvement-plan.md`  
**Session plan copy**: `C:\Users\tmcclell\.copilot\session-state\a17cbebb-04a1-4f14-9608-7c26de9ca99e\plan.md`

This file is the working implementation plan for tightening the Foundations, Agentic, and Advanced modules. It is intended to keep the curriculum focused, practical, and reusable across enterprise audiences without turning the delivery into a broad comparison of tools or platforms.

## Problem and approach

The feedback points to a delivery problem more than a tooling problem: participants want faster ramp-up, more guided practice, and content that feels relevant to real enterprise work. The plan should stay anchored in the three core modules and make them more effective as live workshops, not broaden the scope into a general-purpose multi-tool curriculum.

A specific content issue is that presenter notes are not currently syncing well with the slides and are too verbose. The plan will address that by rewriting slide-level notes into concise, bullet-point talking cues that help the presenter guide the conversation without reading a script or repeating the slide verbatim.

The direction is to:

- keep the workshop centered on Foundations, Agentic, and Advanced,
- add optional enterprise skill lanes for audiences such as chip design/EDA/hardware and other domains,
- keep GitHub Copilot and Microsoft-first guidance at the center of the story,
- avoid making non-Microsoft topics such as Cursor a core teaching focus,
- use a "show, then do" approach with short "try this now" drills before open-ended labs,
- and treat Confluence, Jira, Perforce, and similar tools as optional MCP/integration examples rather than a main storyline.

Primary sources reviewed:

- `feedback\feedback-20260702`
- `site\data\workshops.ts`
- `site\pages\index.astro`
- `site\pages\[workshop]\index.astro`
- `workshops\copilot-dev-foundations\copilot-dev-foundations-workshop.md`
- `workshops\copilot-dev-foundations\copilot-dev-foundations-LAB.md`
- `workshops\copilot-dev-agentic\copilot-dev-agentic-workshop.md`
- `workshops\copilot-dev-agentic\copilot-dev-agentic-LAB.md`
- `workshops\copilot-dev-advanced\copilot-dev-advanced-workshop.md`
- `workshops\copilot-dev-advanced\copilot-dev-advanced-LAB.md`
- `workshops\copilot-dev-training\skills\cpp-hardware\SKILL.md`

## Feedback themes to address

1. Keep the core storyline anchored in Foundations, Agentic, and Advanced instead of expanding into many unrelated enterprise examples.
2. Reduce lecture weight and presenter back-and-forth by switching to a more systematic, prepared delivery pattern.
3. Add guided hands-on walkthroughs where attendees type along before being released into open-ended labs.
4. Improve the Day 1 ramp for newer users and follow the module agenda more closely.
5. Make enterprise relevance feel practical through optional skill lanes such as chip/EDA/hardware versus other domains, rather than by forcing one audience model onto every session.
6. Keep the teaching focus Microsoft-first and GitHub Copilot-centered; do not make non-Microsoft tools a primary topic.
7. Mention Confluence, Jira, Perforce, or similar tools only in MCP/integration sections as optional governance-aware examples.
8. Improve slide presenter notes and lab flow so the modules feel easier to facilitate and easier to follow.

## Current-state observations

1. The curriculum is already organized around three core modules and a logical learning path from Foundations to Agentic to Advanced.
2. The labs are structured and useful, but they are still fairly dense. They would benefit from a clearer entry point and a stronger "show, then do" rhythm.
3. The existing repo-local skills already provide a good starting point for enterprise-specific lanes, including C++/hardware, Appian, and IBM i/AS400.
4. The current content is still somewhat generic, so learners may not immediately see how the same patterns apply to their own environment.
5. Slidev presenter notes are often too long or too abstract for live facilitation and should be rewritten into concise, bullet-based guidance.
6. The workshop can support optional integration examples, but those examples should not overshadow the main Copilot and agentic workflow story.

## Implementation todos

1. **Tighten the scope of the plan**  
   Keep the implementation focused on the Foundations, Agentic, and Advanced modules and avoid adding a large new curriculum surface.

2. **Define a show-then-do teaching pattern**  
   For each major section, add a short facilitator walkthrough, a guided repeat step, and then a small variation or "try this now" drill.

3. **Create reusable enterprise skill lanes**  
   Add optional skill-based lanes for chip/EDA/hardware and at least one or two other enterprise contexts so facilitators can choose a relevant example path without rewriting the whole module.

4. **Rework labs into short guided drills**  
   Introduce lighter, more focused exercises that let learners try the same prompt, command, or workflow before they branch into a larger challenge.

5. **Rewrite presenter notes for live delivery**  
   Convert the current notes into short bullet points that cue the presenter on the key message, the safety or optimization point, and a natural talking path for the slide. Each note should be concise, slide-specific, and structured as presenter guidance rather than long prose or a verbatim script.

6. **Keep integrations optional and focused**  
   If MCP or enterprise integration examples are included, keep them limited to optional examples such as Confluence, Jira, or Perforce and make them clearly secondary to the main GitHub Copilot training flow.

7. **Avoid non-Microsoft distractions in the core content**  
   Do not make Cursor or other non-Microsoft tools a main teaching topic; only mention them if they are clearly relevant and framed as an optional comparison.

8. **Validate the updated content contract**  
   If changes are implemented later, keep the workshop, LAB, quiz, slidev notes, and site metadata aligned and validate with the existing build path.

## Suggested content improvements to include in the recommendation report

1. **Make every module "show, then do."** Start each major concept with a short facilitator demonstration using exact prompts or commands, then immediately have attendees repeat it.
2. **Add short "try this now" drills.** Use bite-sized exercises after each concept block so learners practice before moving on.
3. **Keep a single core teaching path.** Foundations, Agentic, and Advanced remain the backbone; optional enterprise lanes sit beside them rather than replacing them.
4. **Use skill-based lanes for relevance.** Chip/EDA/hardware can be one lane, with another lane for legacy modernization, app/API engineering, or platform/operations work.
5. **Keep the examples Microsoft-first.** Use GitHub Copilot and GitHub ecosystem patterns as the primary examples and make any external-tool discussion clearly optional.
6. **Limit MCP/integration examples.** Mention Confluence, Jira, Perforce, or similar tools only when talking about MCP or enterprise connectivity, and keep them lightweight.
7. **Use real artifact outputs.** Each drill should produce something useful such as a prompt checklist, handoff note, review checklist, agent contract, or safe integration plan.
8. **Shorten and improve slide support.** Presenter notes should guide the speaker with concise bullets, not read like a script or a long essay. Each note should match the slide's purpose and give the presenter a clear talking path for the content.
9. **Make the labs feel approachable.** The first step should be simple and successful, with a clear expectation for what learners will see and learn.
10. **Improve slide artifact quality.** Remove generic or marketing-heavy phrasing and make sure the slide content is consistent with the workshop story.

## Skill-and-lane model

Each optional enterprise lane should follow the same structure so the curriculum remains reusable:

| Field | Purpose |
|-------|---------|
| Audience profile | Who the lane is for and what they likely build or maintain |
| Skill or asset | The repo-local skill, example workflow, or starter artifact used for the lane |
| Demo flow | One short instructor-led walkthrough with exact prompts and expected output |
| Lab variation | A short learner-driven variation using the same pattern |
| Safety constraints | Review gates, data redaction, and approval boundaries |
| Success artifact | What learners leave with, such as a checklist, handoff note, or review plan |

Suggested lanes:

- **Core starter lane** — the generic workflow used for the baseline Foundations and Agentic exercises.
- **Chip/EDA/hardware lane** — use the existing C++/hardware skill as a concrete example for hardware-safe review, verification checklists, and build-log summarization.
- **Other enterprise lane** — use a second path for app/API engineering, legacy modernization, or platform/operations work.

## Notes and considerations

- Keep the three modules as the primary curriculum and do not turn the plan into a broad tool-comparison exercise.
- Do not make Cursor or other non-Microsoft tools a default teaching path.
- Keep any external tool mention light, optional, and governance-reviewed.
- If implementation happens later, update the workshop source, LAB, quiz, slidev presenter notes, and any site metadata together.
- Treat the recommendations as both content edits and facilitation improvements, since some of the feedback is about delivery style as well as repository content.

