# Agentic Development — Source-Backed v1 Content Baseline

**Initiative:** `agentic-module-development`

**Baseline status:** historical source rationale. The active 2026-09-07 contract
is 30 slides, 81 instruction + 45 mission = 126 minutes, in `slide-manifest.md`.
`context-caching-source.md` governs the approved five native stills, their
questions/qualifications and host-qualified compaction correction over older
wording below. The current contiguous instruction route is 3 + 16 + 12 + 50.
Earlier semantic section micro-timings below are historical, not additive.

**Last source review:** 2026-08-09

**Authoritative scope:** `module.md`

**Practice contract:** `content/missions/agentic/agent-task.md`

This guide preserves source rationale and historical timing. It does not define
the current slide count, title order, an inline lab, a storyboard, media, or
changes to the separate mission; `visual-intent.md`, `module.md`, and
`slide-manifest.md` define the current exact contract. Shared schedule adoption
is coordinator-owned and pending; Foundations' proposed request/reuse teaching
is a delivery dependency, not a claim that it has already been taught.

## Approved v2 addendum — control AI credits before an agent runs

The workshop owner approved one additional instructional topic on 2026-08-09:
**Control AI Credits Before the Agent Runs**. It follows **Agentic
Optimization** and precedes **Code Quality, Copilot Review, and Human
Acceptance** in the authoritative 25-topic sequence in `key-topics.md`.

**Human-developer objective:** Choose a supported product control before an
agentic task and verify afterward whether the result justified the AI credits
used.

The 3-minute treatment teaches four direct controls: a public-preview, soft
Copilot CLI session ceiling; regular context and regular reasoning unless task
complexity justifies more; Auto where supported, with the current narrowly
scoped 10% paid-plan model-cost discount caveat; and fresh or host-supported compacted
context where appropriate. The facilitator check asks the learner to choose
one supported control for a bounded task, then name the result-quality and
usage evidence needed for a continue/stop decision.

These product controls are distinct from workflow practices such as clearer
outcomes, scoped tools, phased work, targeted checks, stopping conditions, and
fewer blind retries. Those practices may reduce unnecessary work, but no
reviewed source establishes a fixed AI-credit reduction. Use **GitHub AI
Credits** on first participant-facing mention and **AI credits** afterward;
do not use `AICs` or the general legacy term “premium requests.”

Do not reteach Foundations token definitions, conversion rates, model tables,
plan allowances, or usage-page navigation. Preserve every blocked claim and
volatility question in
`content/research/agentic-ai-credit-optimization.md`. The source basis is that
owner-approved artifact (`CREDIT-01`, `CREDIT-03`–`CREDIT-08`,
`SRC-01`–`SRC-07`) plus
`content/research/agentic-content-verification.md` (`AGT-06`, `AGT-07`,
`AGT-23`, `AGT-24`).

The approved 2026-08-10 timing rebalance gives the dedicated **Meet Northstar
Checkout** scenario setup 2 minutes, **Instructions for Agentic Work** 3
minutes, and **`/init` and Repository Instructions** 3 minutes. **Monitoring
and Iterative Pushes** and **Agentic Optimization** remain at 2 minutes each;
every other topic, including the AI-credit topic, remains at 3 minutes:
`2 + (23 × 3) + (2 × 2) = 75`. The separate mission remains 45 minutes, so
the module remains 120 minutes.

| Objective | Instruction | Source basis | Facilitator practice/evidence |
| --- | --- | --- | --- |
| Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used. | Topic 24's four direct controls and post-run continue/stop decision | `CREDIT-01`, `CREDIT-03`–`CREDIT-08`, `SRC-01`–`SRC-07`; `AGT-06`, `AGT-07`, `AGT-23`, `AGT-24` | Given a bounded task and named product surface, choose one supported pre-run control, state its caveat, and identify both result-quality and usage evidence to inspect afterward. |

## Audience, prerequisites, and finish line

**Audience:** Individual software developers who completed Foundations.

**Prerequisites:** Learners can already select an appropriate Copilot
interaction, provide relevant context, write a generally useful request, set a
least-privilege boundary, and explain why reversibility matters. This module
does not reteach those Foundations concepts. It applies them to a meaningful
multi-step job that can change several files and produce evidence over time.

**Learner outcome:** An individual developer can give Copilot a meaningful
multi-step job, choose the right instructions or reusable helper, watch the
work without hovering over every keystroke, and use visible evidence to decide
what happens next.

**Observable finish line:** Given a vague feature request, the learner can
produce a bounded delegation brief, justify where reusable guidance belongs,
limit tools and permissions, name checkpoints and a recovery route, and use a
diff, test output, and review findings to accept, revise, or reject the result.

## Human journey and role model

The teaching journey is **receive the case → prepare the brief → choose a
helper → delegate → check the evidence → make the call**.

| Role or object | Plain-language job | What it is not |
| --- | --- | --- |
| **Mergewell, the developer** | Owns the goal, writes the brief, chooses access, watches for drift, and makes the final decision. | He is not a software agent and does not transfer accountability. |
| **Software-agent collaborator** | Performs the bounded multi-step work, uses available tools, observes results, and adjusts its next step. Exact behavior depends on the Copilot surface. [G4][V1] | It is not the developer, a skill, or a tool. |
| **Reusable skill** | A folder of instructions and supporting resources that Copilot can load when a repeatable procedure is relevant. [G2] | It is not an independent worker. The mechanical gadget metaphor must remain separate from the collaborator that uses it. |
| **Custom agent** | A reusable agent profile for a recurring role, with a description, behavior instructions, and optionally an explicit tool list. GitHub notes that support and profile-property behavior vary across environments. [G3] | It is not merely a long task request, and it is not a skill package. |
| **Tool** | A concrete capability used to inspect or act—for example, search code, edit a file, or run a test. Enabled tools and approval behavior vary by host. [G5][V1][V2] | It does not own a goal or decide whether the result is acceptable. |
| **Purrmission** | Marks a consequential permission, scope-change, stop, rollback, or final-review decision. | She is not a label for every topic or routine step. |

The approved skill gadgets are used only when their existing behavior fits:

- **Clue Wrangler** sorts supplied evidence against an explicit objective and
  returns an include/exclude manifest. It illustrates a repeated evidence
  selection procedure, not hidden context inspection.
- **Fresh Lead** packages the objective, references, constraints, and
  validation checklist for a clean attempt or handoff. It does not create,
  reset, or inspect a session.

## Current instruction architecture — exactly 81 minutes

| Contiguous route | Slides | Minutes |
| --- | --- | ---: |
| Who does what? | A01–A03 | 3 |
| Prepare a job worth delegating | A04–A09 | 16 |
| Choose and trust the helper | A10–A13 | 12 |
| Stay in charge of the result | A14–A29, including zero-minute Demo | 50 |
| Instruction total | A01–A29 | 81 |
| Separate mission | A30 | 45 |
| Module total | All 30 | 126 |

## Historical instruction architecture — 75 minutes, superseded

All checks below are facilitator-led instructional checks. Hands-on learner
practice remains in the separate 45-minute mission.

| Section | Instruction | Demonstration/check | Transition | Total |
| --- | ---: | ---: | ---: | ---: |
| 1. Who does what? | 11 | 3 | 1 | **15** |
| 2. Prepare a job worth delegating | 12 | 5 | 3 | **20** |
| 3. Choose and trust the helper | 11 | 7 | 2 | **20** |
| 4. Stay in charge of the result | 15 | 4 | 1 | **20** |
| **Instruction total** | **49** | **19** | **7** | **75** |
| Separate Agent Mergewell mission |  |  |  | **45** |
| **Module total** |  |  |  | **120** |

No discussion, media playback, setup, break, contingency, or inline-lab minutes
are added to the approved module budget.

## 1. Who does what? — 15 minutes

### Purpose and depth

Move from a recognizable situation—“the change touches several files, tests
may reveal the next step, and I cannot sensibly dictate every edit”—to a plain
division of responsibility. Learners must be able to distinguish all five
jobs, not configure every product surface.

### Instruction — 11 minutes

1. **Receive the case (4 minutes).** Contrast a small deterministic edit with a
   multi-step feature or defect investigation. The reason to delegate is not
   “maximum autonomy”; it is that the developer can state a useful outcome and
   inspect evidence while the collaborator performs connected steps.
2. **Separate owner from worker (3 minutes).** Mergewell owns intent,
   permission, and acceptance. The software agent may search, edit, run tools,
   observe output, and change its next step within the brief. In VS Code, an
   agent can choose from enabled tools; in Copilot CLI, the developer can steer
   an interactive session and reject a tool request with feedback. These are
   surface-specific examples, not one universal workflow. [V1][G4]
3. **Separate guidance from action (4 minutes).**
   - The **current request** describes this job now.
   - **Repository instructions** hold durable repository guidance that should
     accompany supported requests. GitHub documents repository-wide and
     path-specific instruction files and notes that supported forms differ by
     feature and surface. [G1]
   - A **skill** packages a repeated procedure and resources that Copilot can
     load when relevant. [G2]
   - A **custom agent** packages a recurring role and its behavior; its tool
     list should be made explicit rather than relying on broad defaults. [G3]
   - A **tool** performs a concrete read or action. [G5][V1]

### Facilitator demonstration/check — 3 minutes

Present five cards: “implement this issue,” “always run the repository
formatter,” “perform our repeated accessibility audit,” “act as our
documentation specialist,” and “run the test command.” Sort them respectively
into current request, repository instructions, skill, custom agent, and tool.

**Acceptance check:** The explanation names who owns the final decision and
does not describe a skill as a worker or a custom agent as a tool.

### Safety boundary

Do not imply that an agent can infer the developer's unstated intent or that
reusable configuration is trustworthy merely because it is stored in the
repository. The human must inspect reused instructions, skills, agent profiles,
and available tools before relying on them.

### Transition — 1 minute

“Now that Mergewell knows who does what, he can turn the case into a job the
collaborator can finish without inventing the boundaries.”

## 2. Prepare a job worth delegating — 20 minutes

### Purpose and depth

This is a substantial delegation lesson, not a repeat of Foundations' general
prompting pattern. Foundations taught how to make a request useful. Here,
learners prepare an operational brief for multi-step work: what may change,
what must remain untouched, what evidence must return, when work must stop, and
what to do with uncertainty.

### Instruction — 12 minutes

Use this nine-part delegation brief:

1. **Outcome:** State the observable behavior or repository state wanted, not
   a list of guessed edits.
2. **Relevant context:** Supply the issue, affected area, known architecture,
   and verified references needed for this job. Do not dump unrelated files.
3. **Scope:** Name the files, components, or behavior the collaborator may
   inspect and change.
4. **Constraints:** State compatibility, style, security, dependency, or
   command boundaries that must hold.
5. **Non-goals:** Explicitly name plausible adjacent work that is not part of
   this job.
6. **Definition of done:** Describe the behavior and repository state that
   would make the implementation complete.
7. **Checks and evidence:** Require the diff, relevant test or validation
   output, and a concise account of decisions, failures, and remaining
   uncertainty. Evidence is returned for inspection; it is not self-approval.
8. **Stop conditions:** Require a pause before crossing scope, changing a
   dependency or public contract, using consequential access, or continuing
   after validation contradicts the approach.
9. **Uncertainty off-ramp:** Say what to do when facts are missing: ask a
   focused question, present options, or stop with the evidence gathered.
   “Make your best guess” is not an off-ramp for consequential ambiguity.

The brief should say both **what success looks like** and **when not to keep
going**. Mergewell may use Clue Wrangler when evidence selection itself is the
repeated procedure, or Fresh Lead when packaging a clean bounded handoff is the
repeated procedure. Neither gadget replaces the task-specific brief.

### Facilitator demonstration/check — 5 minutes

Rewrite this vague case without prescribing code:

> In the fictional Northstar Checkout repository, show useful feedback when a
> shopper enters an invalid coupon.

The demonstrated brief should identify the desired user behavior, relevant
checkout and test context, allowed component area, compatibility constraints,
non-goals such as pricing or dependency changes, the valid and invalid coupon
cases that define done, tests and diff as evidence, a stop before architecture
or dependency changes, and a focused question if current validation behavior
is ambiguous.

**Acceptance check:** Remove any one field and ask what failure becomes more
likely. The learner-facing takeaway is diagnostic: missing non-goals invites
adjacent cleanup; missing checks invites unsupported completion claims;
missing stop conditions turns uncertainty into drift.

### Safety boundary — 2 minutes

Do not include secrets, personal data, or unnecessary proprietary material in
the brief. A task statement cannot grant access the host does not provide, and
it should not request broad access “just in case.” Purrmission appears when
scope or consequential access is about to change.

### Transition — 1 minute

“A clear brief is ready. The next choice is whether this is a one-off request,
a repeated procedure, or a repeated role—and whether the helper deserves the
access it asks for.”

## 3. Choose and trust the helper — 20 minutes

### Purpose and depth

Teach selection and inspection, not artifact construction. Learners choose the
smallest reusable mechanism that fits and inspect it before use. They must
understand that availability, file locations, and exact tool behavior vary
across GitHub.com, IDEs, and CLI. [G1][G2][G3]

### Instruction — 11 minutes

#### Choose where guidance belongs — 4 minutes

| Need | Best home | Decision test |
| --- | --- | --- |
| One feature, defect, or investigation | Current request | Would this guidance stop mattering when this job ends? |
| Durable repository convention or validation rule | Repository instructions | Should supported Copilot requests in this repository receive it repeatedly? GitHub documents repository-wide and path-specific forms, with support varying by feature. [G1] |
| Repeated procedure with instructions and supporting resources | Reusable skill | Should Copilot load the same procedure when that kind of work is relevant? [G2] |
| Repeated specialist role with defined behavior and tools | Custom agent | Do we repeatedly need the same role, boundaries, and capabilities? [G3] |

Do not promote a successful one-off request immediately. Reuse is justified
when the stable procedure or role has repeated value and can be reviewed.

#### Inspect before trusting — 4 minutes

For a skill, inspect its stated purpose, instructions, scripts/resources,
expected outputs, assumptions, and any action it may cause through the agent
using it. For a custom agent, inspect the description, behavior instructions,
explicit tools, expected result, and surface compatibility. GitHub's current
custom-agent documentation says omitted tool configuration can leave all
available tools accessible, so this workshop teaches an explicit minimal tool
list where the surface supports it. Some profile properties can function
differently or be ignored across environments. [G3]

Clue Wrangler is appropriate only for repeated supplied-evidence sorting.
Fresh Lead is appropriate only for repeated clean-handoff packaging. If
neither behavior matches, do not rename or stretch the gadget.

#### Limit action capability — 3 minutes

Select only tools relevant to the request and inspect consequential parameters
before allowing execution. VS Code documents a per-request tools picker and
editable tool parameters; Copilot CLI documents per-tool allow/deny controls
and warns that broad automatic approval gives Copilot the user's own local
access without prior approval. These controls are not identical. [V1][G5]

Read-only does not mean “automatically safe” in every context: searches and
commands can expose sensitive data. Treat network access, package installation,
credential use, destructive commands, and scope expansion as Purrmission
moments.

### Facilitator demonstrations/checks — 7 minutes

1. **Placement check (2 minutes):** Sort four pieces of guidance—a task
   acceptance criterion, the repository test command, the Clue Wrangler
   evidence procedure, and a documentation-specialist role—into request,
   instructions, skill, and custom agent.
2. **Helper inspection (3 minutes):** Show a hypothetical custom agent with a
   clear documentation role but an omitted tool list. Identify the mismatch,
   reduce it to repository read access and documentation edits where supported,
   and add a stop before code or dependency changes. [G3]
3. **Permission check (2 minutes):** Compare “allow every tool” with the
   smallest set needed to search the intended area, edit the intended files,
   and run named validation. Require a reason for each enabled action.

**Acceptance check:** A selection is not complete until the developer can
state why this home fits, what was inspected, what tools are necessary, and
what event requires a new decision.

### Safety boundary

Do not teach marketplace installation, MCP, plugins, subagents, or multiagent
orchestration. Do not present a downloaded skill or custom agent as trusted by
default. Exact setup steps belong to later surface-specific implementation,
not this cross-surface source baseline.

### Transition — 2 minutes

Mergewell has prepared the brief, selected a helper, and limited its reach. He
now needs checkpoints that reveal drift without hovering over every keystroke,
plus a credible way back.

## 4. Stay in charge of the result — 20 minutes

### Purpose and depth

Turn oversight into a small number of evidence-based decisions. Learners should
be able to observe progress, intervene when boundaries change, recover using
the controls actually offered by their surface, and make a final decision that
is independent of Copilot's completion or review language.

### Instruction — 15 minutes

#### Watch milestones, not keystrokes — 4 minutes

Set checkpoints where new evidence can change the next decision:

- after the collaborator has inspected the target and proposes its approach;
- before a dependency, public contract, data shape, permission, or scope
  change;
- after the smallest relevant validation;
- before committing, pushing, opening a pull request, or accepting the result.

At a checkpoint, compare actual files, actions, and evidence with the brief.
Continue only when the job remains inside its boundaries. In interactive
Copilot CLI, the developer can add steering feedback while work is active and
can reject a requested tool with feedback; other hosts expose different
controls. [G4]

#### Stop and keep a way back — 4 minutes

Stop when the collaborator crosses scope, asks for unexplained access, repeats
a failing approach without new evidence, encounters an ambiguous consequential
choice, or cannot run the agreed check. Recovery can mean discarding the diff,
restoring with version control, returning to a known checkpoint, or preparing
a Fresh Lead handoff for a clean attempt.

Never promise universal one-click rollback. Copilot CLI currently snapshots
workspace state before prompts and offers session rewind, but GitHub warns that
rewind restores the whole workspace—including manual edits and shell-command
effects after that point—and that large-file and high-file-count limits apply.
[G6] VS Code provides its own change-review and revert controls; availability
and scope are host-specific. [V3]

The practical rule is: identify and test the recovery route before delegated
execution, and use version control or another known restore mechanism rather
than assuming the product can undo every side effect.

#### Read the evidence stack — 7 minutes

1. **Diff:** Does it implement the stated outcome, remain in scope, avoid the
   non-goals, and contain understandable changes?
2. **Tests and validation:** Were the agreed checks actually run? Do outputs
   cover the changed behavior? A passing command is evidence only for what it
   checked; missing, skipped, or unrelated tests remain gaps.
3. **Review findings:** On a personal pull request, explicitly request Copilot
   code review when available, then inspect every finding. On GitHub.com,
   Copilot is requested from the Reviewers area. GitHub documents that Copilot
   leaves a **Comment** review—not Approve or Request changes—so its review
   neither counts as a required approval nor blocks a merge. [G7]
4. **Developer decision:** Corroborate findings against the diff, requirements,
   and validation. A finding may identify a real defect, a false positive, or a
   question needing more evidence. No finding is approval, and no comments do
   not prove correctness.

The personal pull-request checkpoint is deliberate because the approved
2026-08-07 Code Quality change removed an unrelated automatic reviewer
side-effect. This module does not teach repository or organization automatic
review rulesets. [C1]

Use four ordinary decisions:

- **Accept** when the outcome, boundaries, and sufficient evidence agree.
- **Revise** when the direction is sound but a bounded correction or missing
  check is clear.
- **Reject** when the result violates the brief, evidence is unreliable, or
  repair would amount to a new job.
- **Roll back/recover** when retaining the current workspace state creates
  avoidable risk.

### Facilitator demonstration/check — 4 minutes

Show a plausible in-scope diff, a passing unit-test result that omits one
required invalid-input case, and a Copilot review comment about an unrelated
style preference. Mergewell must **revise**, not accept: request the missing
behavioral evidence, assess the style finding independently, and keep the
change unaccepted until the definition of done is demonstrated.

**Acceptance check:** The decision cites the diff, names what the tests do and
do not establish, dispositions the review finding, and identifies the
recovery route. Purrmission marks this final-review decision.

### Safety boundary

Do not merge, deploy, expose secrets, broaden access, or treat automated review
as authorization. Consequential side effects outside the workspace may not be
covered by IDE or CLI revert features; use the relevant system's recovery
mechanism and escalate uncertainty.

### Transition — 1 minute

Hand off to the separate 45-minute scored mission: participants bring the
exported Foundations case file—or the facilitator starter for legitimate
catch-up—choose one approved Copilot harness, delegate a bounded multi-file
fixture task, inspect the diff and validation evidence, and export separate
Foundations, Agentic, and cumulative totals before making the call.

## Source guide

All volatile product claims above cite a reviewed authoritative source.
Summaries are intentionally cross-surface; exact UI and command details must be
rechecked when the later production contract chooses a demonstration surface.

### Approved internal sources

| ID | Source | Use |
| --- | --- | --- |
| A1 | `content/modules/02-agentic/module.md`, approved 2026-08-07 | Audience, objectives, journey, timing, character roles, boundaries |
| A2 | `content/missions/agentic/agent-task.md`, reviewed 2026-08-07 | Read-only practice contract and evidence |
| C1 | [GitHub Code Quality no longer adds Copilot as a reviewer](https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer), reviewed 2026-08-07 | Reason to teach an explicit personal review checkpoint; administrative configuration excluded |

### Current product documentation reviewed 2026-08-07

| ID | Authoritative source | Claims used and caveats |
| --- | --- | --- |
| G1 | [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) | Repository-wide, path-specific, and agent-instruction forms; support varies by feature and surface. |
| G2 | [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | Skills are folders of instructions, scripts, and resources loaded when relevant; documented supported surfaces and storage options are volatile. |
| G3 | [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents) | Agent profiles define recurring behavior and optional tools; defaults and profile-property behavior require care across environments. |
| G4 | [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | Interactive multi-step work, plan mode, steering, tool rejection feedback, and broad-approval warning; CLI-specific. |
| G5 | [Allowing tools to be used by GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools) | Per-tool approval controls and consequences of automatic approval; CLI-specific. |
| G6 | [Canceling a GitHub Copilot CLI operation and rolling back changes](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/cancel-and-roll-back) | Cancel, session snapshots, rewind behavior, destructive breadth, and limits; CLI-specific and not a universal rollback claim. |
| G7 | [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) | How an individual requests review on GitHub.com; Copilot returns Comment rather than approval or request-changes status; other surfaces differ. |
| V1 | [Use tools with agents in Visual Studio Code](https://code.visualstudio.com/docs/agents/run/tools) | Enabled-tool selection, automatic tool choice, parameter review, and visible command output; VS Code-specific. |
| V2 | [Manage approvals and permissions in Visual Studio Code](https://code.visualstudio.com/docs/agents/run/approvals) | Host-specific approval and permission controls; used only to support the cross-surface variance warning. |
| V3 | [Review and revert agent changes in Visual Studio Code](https://code.visualstudio.com/docs/agents/run/review-code-edits) | Host-specific change review/revert behavior; not generalized to external side effects. |

## Objective coverage

| # | Approved objective | Instruction coverage | Source basis | Practice or facilitator evidence |
| ---: | --- | --- | --- | --- |
| 1 | Turn a vague feature request into a clear job with boundaries, checks, and a finish line. | Section 2 nine-part delegation brief | A1; product-grounded checks and controls in G4-G6 | A2 mission core path; Section 2 vague-case rewrite |
| 2 | Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool. | Section 1 role model and card sort | G2-G5, V1 | Section 1 facilitator card sort |
| 3 | Choose what belongs in the current request, repository instructions, a reusable skill, or a custom agent. | Sections 1 and 3 placement framework | G1-G3 | Section 3 placement and helper-inspection demonstrations |
| 4 | Stay in control with limited permissions, progress checks, stop points, and a way back. | Sections 2-4: stop conditions, minimal tools, checkpoints, recovery | G3-G6, V1-V3 | A2 safety checkpoint and monitored delegation; Section 3 permission check; Section 4 decision demonstration |
| 5 | Use the diff, tests, and review findings to accept, revise, or reject the result. | Section 4 evidence stack and four decisions | G7, C1 | A2 mission evidence/validation; Section 4 incomplete-evidence demonstration |

## Mission alignment and legacy disposition

The separate mission supplies the only participant practice: define the
outcome, constraints, validation, and non-goals; confirm permissions and a
rollback option; delegate and monitor scope; inspect the diff and validation
output; then explain the decision. Its stretch path addresses ambiguity or
excess permission.

The three legacy inline labs and their artifact-building assumptions are
superseded by this one mission. This baseline contains facilitator
demonstrations only and does not ask learners to create a skill file, custom
agent file, or administrative configuration during instruction.

## Terminology and claim boundaries

- Prefer **multi-step delegated work**, **the job's boundaries**, **where the
  developer pauses**, and **the way back** over “agentic loop,” “bounded
  autonomy,” “trust boundary,” and “execution contract.”
- **Software agent** names the worker behavior. **Custom agent** names a
  reusable configured role. **Skill** names a reusable procedure/resources
  package. **Tool** names an action capability.
- “Agent,” “Plan,” tool, permission, and rollback behavior is always tied to a
  named surface. No universal IDE/CLI/GitHub.com sequence is claimed.
- Copilot code review contributes findings, not approval.
- `/init`, durable memory, background/cloud-agent comparisons, multiagent
  orchestration, subagents, MCP, plugins, model releases, administrative
  rulesets, and organization analytics are intentionally omitted.

## Known risks and later-production constraints

- **Timing risk:** The delegation anatomy is the densest treatment. Keep its
  demonstration to one case and defer learner writing to the mission; otherwise
  Section 2 will exceed 20 minutes.
- **Terminology risk:** Current GitHub and VS Code labels and supported
  instruction/agent file forms can change. Recheck G1-G7 and V1-V3 when a later
  slide contract selects exact UI or commands.
- **Surface risk:** A mixed-surface demonstration would spend time reconciling
  controls rather than teaching the decision skill. Later production should
  choose one primary surface and retain explicit caveats for the others.
- **Practice exposure:** The current mission frontmatter directly references
  objectives 1 and 5, while its safety checkpoint and core path also exercise
  objective 4. Objectives 2 and 3 remain facilitator-demonstrated unless a
  separately approved mission revision adds them.
- **Reuse:** Preserve Foundations' vocabulary for context, least privilege,
  evidence, and reversibility, but do not replay its general prompt lesson.
  Reuse the approved Mergewell, Clue Wrangler, Fresh Lead, and Purrmission role
  definitions without expanding gadget behavior.
- **Rework exposure:** A human request to teach file creation or a different
  product surface would require source re-verification, timing tradeoffs, and
  possible mission alignment work. It should not be absorbed as slide detail.
