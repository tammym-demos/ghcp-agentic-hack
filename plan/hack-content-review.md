# Hack Content Review

## Sources reviewed
- `feedback/feedback-20260702`
- `C:\Users\tmcclell\Downloads\Rockwell Hack Materials.vtt`
- Current workshop content in `workshops/copilot-dev-hack/copilot-dev-hack-workshop.md`
- Current slide content in `workshops/copilot-dev-hack/copilot-dev-hack.slidev.md`

## Summary of feedback themes
The feedback and transcript point to a consistent set of issues and opportunities:

- The training felt too long and too talky in places, especially on Day 1.
- The flow should be more deliberate: start with a clear learning agenda and explain what learners will build before diving into detailed concepts.
- The content should be more hands-on and more technically grounded, with less emphasis on high-level discussion and marketing-style framing.
- The examples should feel more relevant to the audience's real work, especially domain-specific engineering workflows.
- Learners wanted more guided demos and more opportunities to try things live rather than just watch.
- The session should be better structured around the learner's mental model, especially for concepts like instructions, skills, agents, and tools.
- The delivery should feel more prepared, systematic, and efficient.

## What the current content already does well
The existing hack module already has several strong elements:

- It has a clear timeboxed structure: planning, building, and demo.
- It uses practical scenarios such as code review, test generation, documentation, and bug triage.
- It is centered on real problems rather than abstract demos.
- The workshop file already provides a strong facilitator framing for problem selection and success criteria.

## Recommended improvements

### 1. Make the opening more explicit and more useful
Add a short opening segment that tells learners:
- what they will build,
- why the topic matters,
- what success looks like,
- and what they will not need to master before starting.

This would address feedback about sessions feeling too abstract or too slow to get to the practical part.

### 2. Shift from presentation to guided participation earlier
The feedback repeatedly asks for more hands-on walkthroughs and less back-and-forth between slides and discussion.

Suggested change:
- Replace some of the introductory content with a live follow-along example.
- Use one concrete example throughout the session so learners can see the same workflow repeated.
- Give facilitators a simple script for each phase so they do not have to improvise from slides alone.

### 3. Make the examples more domain-specific
Several comments asked for examples that are more relevant to the audience's work.

Recommended additions:
- Add examples for chip design and EDA workflows.
- Include examples tied to tools such as Jira, Confluence, and Perforce.
- Add a "bring your own problem" template that asks learners to describe their workflow, pain points, and success metric.

### 4. Tighten the pacing and reduce the amount of high-level discussion
The feedback suggests that the day felt too long and too verbose.

Recommended change:
- Keep each section focused on one idea and one concrete action.
- Use fewer slides per topic.
- Move from explanation to demo as quickly as possible.
- Make the facilitation more systematic so the live session feels prepared rather than improvised.

### 5. Introduce concepts in the right sequence
The transcript specifically called out a sequencing issue: concepts like instructions, skills, agents, and tools were discussed before learners had a clear shared vocabulary.

Recommended change:
- Start with a simple mental model before deeper discussion of optimization or context management.
- Introduce the core building blocks in a single progression, then use them in the hack.
- Keep advanced optimization topics as follow-on material after the lab is underway.

### 6. Add a stronger lab scaffold
The current hack module already has a good scenario structure, but the feedback suggests learners would benefit from more explicit scaffolding.

Suggested additions:
- A starter repository or starter instructions template.
- A short checklist for setup and first success.
- A simple expected output for each scenario so learners know when they have succeeded.

### 7. Create a single-page resource hub for the session
One comment asked for a main page with all the collateral.

Recommended change:
- Add a single landing page or one-page overview with links to slides, labs, starter files, examples, and follow-up resources.
- This would make the session easier for people who join late or want to revisit the material.

## Suggested edits to the current workshop content

### `workshops/copilot-dev-hack/copilot-dev-hack-workshop.md`
Good candidates for update:
- Add a short opening section that frames the hack as a guided build.
- Add a more explicit facilitator script for the planning phase.
- Add one or two domain-specific example prompts.
- Add a small section on expected outputs and how to know the agent is working.

### `workshops/copilot-dev-hack/copilot-dev-hack.slidev.md`
Good candidates for update:
- Reduce the amount of introductory framing and move faster into the first live demo.
- Add a slide that clearly shows the learner journey: concept → example → lab → validation.
- Use more concrete, scenario-based visuals and fewer generic marketing-style slides.

### Broader curriculum consideration
If these materials are part of a larger training series, the same principles apply to the foundation and agentic modules:
- introduce concepts before optimization,
- keep the agenda visible,
- and make the transition from explanation to practice as short as possible.

## Recommended next step
The highest-value change would be to make the experience more tutorial-like and less lecture-like:
- start with a guided example,
- keep the agenda obvious,
- use real domain examples,
- and give learners a concrete first success in the first 10–15 minutes.
