# Presenter Notes — Module 2: Intermediate (Agentic) — Workshop Guide

## Discussion Guide by Section

### 1. How Copilot Uses Instructions, Memory, and Context (12 min)

- Which team rules should be codified in instructions this week so people stop repeating them in chat every session?
- What is a good example of something that belongs in memory, such as a preferred test command or repo convention, instead of in an instruction file?
- What should never be persisted to memory in your environment, even if it would be convenient?
- Where do teams confuse convenience with governance when deciding what Copilot should remember or reuse?

### 2. Instructions, Memory, and Skill Design (28 min)

- If your team says "always add tests for behavior changes," where should that guidance live: instructions, memory, or a reusable skill, and why?
- Which skill-contract element is most frequently omitted by your team: scope, constraints, definition of done, or the off-ramp?
- What instruction should be global versus folder-scoped in one of your real repositories?
- What is an example of a stable reusable fact that belongs in memory but should not be rewritten into every skill?
- What is an example of an acceptance gate you would want in a delegated skill, such as stopping on failed tests or asking before dependency changes?

### 3. Agent, Skill, and Loop Mechanics (28 min)

- Which workflows in your team are over-delegated today and would be faster with direct tools or skills?
- What kinds of work genuinely benefit from an agentic loop because they involve branching choices or multi-step evidence gathering?
- What minimum evidence should an agent produce before acceptance: tests, diffs, rationale, logs, unresolved risks, or something else?
- Where should verification always remain human-led, even if the agent appears confident?
- What is one handoff artifact your team should standardize so downstream reviewers can trust what happened during execution?

### 4. Tool Strategy, Background/Cloud Agents, and Scaling Controls (22 min)

- Which task classes should always remain local because they involve sensitive context, fast iteration, or direct supervision?
- What is a good example of work that should move to a background task or cloud agent because it is long-running or parallelizable?
- What controls must exist before cloud delegation is allowed in your environment?
- Where can `/init` reduce setup churn most for your team by turning repeated scaffolding into a reusable pattern?

### 5. Wrap-up and Advanced Handoff (10 min)

- Which intermediate control should become a team default immediately: stronger skills, tighter tool scope, better handoffs, or explicit approval gates?
- What readiness gap remains before scaling to advanced orchestration in your environment?
- What evidence would convince you that a workflow is ready to move from controlled delegation to broader orchestration?

*Presenter note discussion guide extracted from workshop discussion point sections for Slidev talk track development.*
