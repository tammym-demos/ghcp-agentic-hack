---
schemaVersion: 1
kind: workshop-requirements
id: modernization-with-copilot
title: "Modernizing the Unknown with GitHub Copilot"
description: >-
  Identify why modernization is being considered, then plan the human work
  required to delegate bounded tasks to agents with verified context, alignment,
  safeguards, and evidence. Follow the service through investment, execution,
  and observed outcomes using a hypothetical legacy application and GitHub
  Copilot as a bounded helper. Capture authorized answers in a separate
  temporary browser brief and print through the customer's approved process.
audience:
  - Software developers who use GitHub Copilot
level: mixed
format: custom
durationMinutes: 180
durationLabel: "Flexible (180-minute facilitation estimate)"
outcomes:
  - Describe the service, users, business outcome, dependencies, and evidence needed before choosing a modernization solution.
  - Identify and prioritize modernization drivers, then compare expected benefit, whole-life cost, consequences, action and inaction risks, and alternatives to make an explicit next-investment decision.
  - Plan the human-owned work needed to delegate bounded modernization tasks to agents, including harness and agent/skill choices, explicit requirements, application-tier boundaries, safety/security controls, model portability, evaluation, escalation, and decisions that remain human-owned.
  - Use optional planning tools and bounded agent roles without treating generated artifacts, prompts, or agent agreement as proof, enforcement, or authority.
  - Build and evaluate the authorized slice against agreed evidence, release the evaluated artifact safely, and monitor service and business outcomes.
  - Use observed results and unresolved uncertainty to continue, change course, defer, or stop the next investment.
  - Capture the six lifecycle statements and supporting decisions in a confidential, in-memory browser brief without customer or application identity fields.
modules:
  - id: modernization-kickoff
    title: "Modernizing the Unknown with GitHub Copilot"
    minutes: 180
    durationLabel: "Flexible (180-minute facilitation estimate)"
    outcomes:
      - Describe the service, users, business outcome, dependencies, and evidence needed before choosing a modernization solution.
      - Identify and prioritize modernization drivers, then compare expected benefit, whole-life cost, consequences, action and inaction risks, and alternatives to make an explicit next-investment decision.
      - Plan the human-owned work needed to delegate bounded modernization tasks to agents, including harness and agent/skill choices, explicit requirements, application-tier boundaries, safety/security controls, model portability, evaluation, escalation, and decisions that remain human-owned.
      - Use optional planning tools and bounded agent roles without treating generated artifacts, prompts, or agent agreement as proof, enforcement, or authority.
      - Build and evaluate the authorized slice against agreed evidence, release the evaluated artifact safely, and monitor service and business outcomes.
      - Use observed results and unresolved uncertainty to continue, change course, defer, or stop the next investment.
      - Capture six lifecycle statements and focused supporting evidence in a confidential, in-memory browser brief without customer or application identity fields.
sources:
  - content/production/source-pack.md
characterWorld: content/production/visual-bible.md
visualStyle: >-
  Native Warm Editorial 2D with the approved four-character team cover,
  featuring Purrmission in front of the team lined up behind him. Keep
  instructional text, questions, tables, and diagrams native. Reuse the
  approved team portrait unchanged and the owner-selected circular
  character portraits with native persona, role, and action labels. Use the
  authorized official Microsoft mark as a separate native footer on every slide.
imageRoles: []
briefEditor:
  title: Modernization Starting Brief
  description: >-
    Select the reasons modernization is being considered, prioritize the top
    three, and plan bounded work for agents with context, guardrails, and
    evidence alongside the six decision-loop statements. Answers stay in this
    open page; the editor does not send or save them. Print through the browser
    using the customer's approved process.
exclusions:
  - No fixed delivery time limit; do not compress or omit necessary content to fit the former one-hour agenda.
  - No live repository access, command execution, agent run, or production code change during the discussion workshop.
  - No prescribed cloud, language, framework, microservices architecture, or rewrite without workload evidence and stakeholder constraints.
  - No claim that Copilot recovers undocumented intent, that two agents agreeing proves correctness, or that prompts enforce access controls.
  - No generative media calls or changes to the established characters' identities and responsibility boundaries in this revision. Reuse the approved Purrmission-front team cover, owner-selected character crops, and authorized official Microsoft mark.
  - Keep customer responses out of reusable slides, source, catalog, review materials, server storage, logs, URLs, analytics, and browser persistence.
  - Do not send customer-confidential information to an AI service unless customer policy explicitly permits it.
  - Do not describe the browser editor as protection against device, extension, screen, print-destination, or saved-PDF access.
acceptanceCriteria:
  - Content completeness takes priority over delivery length. Numeric timings are provisional facilitation estimates required by the existing content tooling, not time limits.
  - The 31-slide source contract opens with the workshop title and the subtitle Agenda, followed by a slide titled Meet the Team with no subtitle and the approved team image showing Purrmission in front of the lineup. The authorized Microsoft mark appears on every slide. Service context → investment decision → first-slice plan → Build → Evaluate → Deploy → Monitor → next decision follows unchanged. Goal, Plan, Build, Evaluate, Deploy, and Monitor remain explicit; the 180-minute estimate is unchanged.
  - >-
    Goal begins with a non-exhaustive, unranked, check-all-that-apply list of
    common modernization drivers: end of support; security/compliance; service
    failures or recovery; scarce system knowledge; operating cost;
    performance/capacity; slow or defect-prone changes; operational
    difficulty; user experience; new business capabilities; integrations/data
    access; and enterprise landscape change. Participants prioritize up to
    three and record today's evidence, the consequence of leaving each
    unchanged, and an observable success signal. The checklist is a prompt,
    not proof of value or a commitment to a specific solution.
  - >-
    Goal compares the prioritized drivers and expected benefit with whole-life
    cost, consequences, risks of action and inaction, alternatives, and an
    explicit next investment or discovery decision.
  - >-
    Plan teaches humans how to prepare bounded work for agents: choose suitable
    tasks and skills; choose a suitable harness; provide verified context and
    business/technical alignment; distinguish mandatory requirements from
    recommendations; map work across application boundaries; define inputs,
    outputs, acceptance, and handoffs; set actual permissions and
    safety/security/privacy/supply-chain guardrails; establish independent
    evidence and model-evaluation criteria; and retain human decisions for
    requirements, risk, and release. It also covers transition and technology,
    model portability, multi-agent coordination, recovery/operations, and
    people/readiness. Each applicable item captures a question, evidence,
    owner, and next decision or stop condition; not-applicable items include a
    reason.
  - >-
    Plan distinguishes a model, agent harness, agent role, skill, and execution
    environment. Participants compare context assembly, tool and permission
    behavior, data boundaries, supported workflows, and recovery on the
    intended harness. Harness choice does not replace identity, environment,
    network, repository, or other underlying controls.
  - >-
    Plan distinguishes an agent as a configured worker, skills as reusable
    task methods/resources, and scripts or people as alternatives. Multiple
    agents or skills are used only when bounded specialization, independent
    work, or an evidence-producing challenge justifies their coordination
    cost. Define handoffs, dependencies, shared contracts, ownership, and
    stop/retry limits. Different agents or models do not guarantee
    independence.
  - >-
    Plan defines a consistent requirements vocabulary: SHALL/SHALL NOT for
    mandatory requirements or prohibitions, SHOULD/SHOULD NOT for
    recommendations with justified exceptions, and MAY for optional
    approaches, with definitions scoped to the document. For each consequential
    requirement, identify its owner, scope, verification, exception path, and
    actual enforcement where possible. Normative wording is not itself a
    technical control or a legal conclusion.
  - >-
    Plan explains logical application layers and physical tiers without
    assuming they are one-to-one. Agent tasks respect existing service
    responsibilities, contracts, data ownership, authorization boundaries,
    and integration evidence. It does not prescribe one agent per tier or
    require runtime AI in the modernized application.
  - >-
    Plan keeps task contracts, business rules, permissions, and evaluation
    criteria separate from model/provider selection. It explains that a model
    swap is a compatibility change, not a guarantee of equivalent behavior;
    public benchmarks screen candidates but do not replace workload-specific
    evaluation. A repeatable evaluation uses representative, domain-approved
    cases, fixed criteria, edge/negative cases, suitable independent checks,
    and calibrated human review. Record relevant model, harness, instructions,
    skills, tools, and evaluation versions; set risk-based acceptance and
    re-evaluation triggers; surface variability, limitations, and drift.
    Monitoring a development agent does not imply the released service uses
    an AI model.
  - >-
    For each agent-delegated work package, define its outcome, authoritative
    inputs/context, permitted tools/data, autonomy, expected output,
    acceptance/evidence, stop/escalation conditions, and human owner/reviewer.
    Distinguish read-only analysis, proposals, bounded edits/tests, and
    separately authorized release/operational actions. Prompts or role labels
    do not enforce permissions, and agent agreement is not proof.
  - Explain strangler fig, branch by abstraction, and expand-migrate-contract with their applicability and coexistence costs; none is a universal prescription.
  - Spec Kit is an optional implementation of spec-driven planning for a bounded existing-system change, not automatic architecture discovery, policy enforcement, or release approval.
  - Proposer, challenger, and verifier have distinct responsibilities; the challenger cannot silently move acceptance criteria, and reproducible external evidence and accountable humans remain necessary.
  - Discovery scripts, characterization tests, and spikes may precede implementation under separate bounded authorization; planning is iterative, not exhaustive up-front design.
  - Deployment planning includes immutable artifact identity, environment promotion, progressive exposure, health checks, data reconciliation, recovery, release authority, and operational ownership before implementation.
  - Deploy explains when a suitable slice may use a container image for repeatable deployment and process isolation, including the evaluated image digest, platform and configuration checks, image and runtime controls, and data-aware recovery. Containers do not guarantee security, portability, release approval, or reversal of data changes.
  - Explicit planning includes business-rule and data-quality validation; threat modeling and applicable privacy, residency, retention, licensing and accessibility obligations; software supply-chain trust; user adoption, handover, funding, skills and delivery capacity.
  - The separate catalog-linked editor captures the modernization-driver checklist, Plan checklist status, agent work package evidence, and six explicit fill-in lifecycle statements without customer/organization or application/workload identity fields.
  - The brief editor presents the six decisions in a readable, responsive layout with direct section navigation and omits the separate Brief handling metadata section.
  - >-
    The editor remains blank on entry, with unchecked driver boxes and unselected
    Plan statuses; it holds answers only in the open page and offers confirmed
    reset. Printing presents a dedicated, easy-to-read modernization decision
    recap. All six lifecycle statements appear first, with uncaptured statements
    marked "Not captured"; non-empty supporting answers appear verbatim under
    their decision; only selected modernization drivers and recorded Plan
    statuses appear; and blank details, fill-in instructions, unchecked choices,
    navigation, and character introductions are omitted. The recap retains the
    customer-confidential marking and states that it does not approve investment,
    implementation, or release.
  - Editing, clearing, and printing do not submit or persist response values; existing open brief tabs must not be reloaded without consent.
  - The cover on slide 2 retains the four-character portrait and short responsibility stories. The agenda has no character portrait or persona cue; its second-panel heading is Through the loop and its closing line is Your enterprise application; no live code changes today. The worked order-status examples elsewhere remain fictional. Other content slides use the owner-selected circular portraits with specific native persona/action cues, while naming the actual accountable human role; Riley never approves and Purrmission never enforces. Riley's compact crop retains her temple light and neck seam and is labeled "Software agent". The seated Purrmission crop faces the viewer without people or legs in its background.
  - Carry the agenda's concise, labeled story beats through the fictional order-status example on every applicable slide. The first panel retains the key topics; the second illustrates those topics with a situation, action, evidence, or decision. Preserve the cover image, required wording, fill-in goal statement, safety boundaries, slide titles, timeboxes, and ordered speaker notes.
  - In each second-panel story, place the title and example text at the top and any portrait with its native name, role, and action at the bottom. The agenda is portrait-free. Use the panel height while retaining readable padding and preventing clipped content. The slide 2 team image remains unchanged.
---

# Modernization decision and SDLC readiness requirements

## Direction

The customer needs a modernization decision loop, not a worksheet that merely
names lifecycle phases. Understand the service, decide whether to invest, plan
the human work required to delegate bounded modernization tasks to agents,
then use Build, Evaluate, Deploy, and Monitor evidence to choose what happens
next. Plan the harness, context, alignment, task contracts, actual safeguards,
verification, model qualification, handoffs, and human decisions before agent
execution. Return to Goal when observed results or uncertainty change the
investment case.

Goal starts with a non-exhaustive, unranked checklist of common reasons
organizations consider modernization. Participants select all that apply,
prioritize up to three, and connect each to current evidence, the consequence
of leaving it unchanged, and an observable success signal. The checklist
frames the investment conversation; it does not prove that modernization is
worthwhile or prescribe an architecture.

The owner accepted this decision-loop restructure on 2026-10-29 and removed
the former one-hour constraint. The custom-format metadata estimates 180
minutes only because the existing schema, manifest, and notes require numeric
timing. This is not a promised duration, maximum, or reason to rush discussion.
Extend, pause, or split delivery as needed. Do not remove material to hit the
estimate.

## Two decisions, six lifecycle statements

1. **Investment:** Why change, why now, which alternative, at what cost and
   risk, and who can authorize discovery or delivery?
2. **Readiness:** Is there sufficient evidence and control to begin one bounded
   slice and carry it through release and operations?

The six familiar labels remain, but the brief records decisions rather than
substituting for the engineering work:

- **Goal:** We are modernizing primarily because [top drivers]. We need to
  improve [outcome] while preserving [critical behavior]. We will know we
  succeeded when [observable result]. Considering [whole-life cost, risks, and
  alternatives], [decision owner] authorizes [next step].
- **Plan:** For [slice], agents may do [bounded tasks] using [verified context]
  under [actual permissions/guardrails]. [acceptance and independent evidence]
  support readiness; [human owner] resolves [blockers] and retains [human
  decisions].
- **Build:** Implement [traceable tasks] in [increments] within [boundaries].
  [reviewer] checks [diff, tests and provenance]; stop if [condition].
- **Evaluate:** Compare [observations] with [baseline/criteria] using
  [independent evidence]. [owner] decides [proceed / adjust / stop] with
  [residual uncertainty].
- **Deploy:** [release owner] authorizes [exact artifact] through [rollout]
  after [release checks]. On [trigger], [response owner] performs
  [data-safe recovery].
- **Monitor:** [operator] watches [service and business signals] against
  [thresholds], responds through [runbook], and revisits [investment / next
  slice / retirement] with [review owner].

## Required teaching sequence

The authoritative title/order/estimated-minute contract is the module's
`slide-manifest.md`. Agenda, cover, and route introduce a repeating decision loop, not a
waterfall. Goal names the modernization drivers, prioritizes the three that
matter most, then compares expected benefit, whole-life cost, risks,
alternatives, and an explicit investment decision. Plan focuses on the work
humans must do before delegating modernization tasks to agents: choose an
appropriate harness, agent/skill composition and bounded work; translate
verified intent into explicit requirements; respect application boundaries;
provide trusted context and permissions; qualify model changes against
repeatable evaluations; define acceptance and independent evidence; and retain
human authority. Build, Evaluate, Deploy, and Monitor
apply that plan; observed outcomes return the group to the next Goal decision.
The final slide reads back decisions and unresolved evidence. Each content
slide makes the current choice, a concrete discussion question, and the
evidence to retain clear.

## Goal driver checklist

Use the following as a conversation prompt, not a ranked survey or complete
taxonomy. Select all that apply; then focus on up to three drivers with the
strongest evidence or consequence:

### Reduce risk and keep the business running

- Technology is reaching end of support.
- Security or compliance needs have changed.
- Failures are disrupting the business, or recovery is difficult.
- Critical knowledge is becoming harder to retain or find.

### Make the application easier and less expensive to run

- Operating, licensing, support, or manual costs are too high.
- Performance or capacity limits growth or service needs.
- Changes take too long or cause too many defects.
- The application is difficult to diagnose, deploy safely, or operate.

### Support what the business needs next

- Users need a better experience or rely on workarounds.
- New business capabilities are difficult to deliver.
- Integrations or data access hold teams back.
- The enterprise technology landscape is changing, for example through a
  merger, consolidation, data-center exit, or platform strategy.
- Other: record the reason in the brief.

For each prioritized driver, capture what is true today and its evidence,
what may happen if nothing changes, and an observable improvement that would
count as success. Then compare whole-life cost, risks of changing and waiting,
and alternatives such as retaining, improving, replatforming, refactoring,
rearchitecting, replacing, retiring, or funding bounded discovery. Complete
the Goal statement:

> We are modernizing primarily because [top drivers]. We need to improve
> [outcome] while preserving [critical behavior]. We will know we have
> succeeded when [observable result]. Considering [whole-life cost, risks, and
> alternatives], [decision owner] authorizes [next step].

The central thread is: **What service outcome matters? What human planning
enables agents to do bounded work safely and in line with that intent? What did
the evidence change about the next decision?** The customer brief records
answers; it does not prove them or authorize engineering work.

Planning must make technology selection explicit: compare keeping the current
stack with realistic alternatives on compatibility, support lifetime,
security, team skills, operating model, performance, data obligations,
whole-life cost, and exit/recovery effort. Record assumptions and evidence;
do not select a fashionable stack by default.

Use the hypothetical COBOL order-status scenario throughout. Support staff want
daytime status rather than an overnight report; correct totals and authorized
access must remain intact. Follow the service from its user-facing delay, through
the investment and bounded-slice decisions, to evidence that could support a
next step. All proposed adapters, target technologies, checks, costs, or
rollout designs are options to test. No customer fact, measured baseline,
guaranteed benefit, or executed test is implied.

## Plan for agents to do bounded work

Before production implementation, the team needs enough evidence and control to
authorize one bounded slice—not exhaustive documentation for the whole future
system. Plan begins with human decisions about what work is suitable for
agents, what remains human-led, and what must be in place before delegation.
Use this checklist to prompt decisions, not as a universal gate. For each
applicable item, record the question, evidence, owner, and next decision or
stop condition. Mark an item not applicable only with a reason.

1. **Choose the work and method:** Which bounded tasks suit an agent, a person,
   or deterministic automation? An agent performs a task; a skill supplies a
   reusable method and resources. Use only the roles and skills that improve
   the work.
2. **Choose the harness:** Which harness provides the required context,
   supported models and workflows, tool approval behavior, session handling,
   and observable evidence? Verify its actual boundaries in the intended
   environment.
3. **Authorize access and prepare context:** What sources may agents inspect,
   using which identities, data, tools, and environments? Map service
   dependencies, owners, workflows, and unknowns from authorized evidence.
   Verify actual controls and name who can stop the work.
4. **Align work with business rules and data:** Which user outcome, validated
   calculations, source of truth, exceptions, invariants, architecture
   constraints, coding standards, and non-goals must each task follow? Domain
   owners decide what is correct; observed legacy behavior is not automatically
   required behavior.
5. **Make requirements explicit and testable:** Which statements are
   mandatory, recommended, or optional? Define SHALL/SHALL NOT, SHOULD/SHOULD
   NOT, and MAY for the document; assign owners, verification, exceptions, and
   real enforcement for consequential requirements.
6. **Choose a safe transition:** Can the service be retained or improved, or is
   a bounded replacement needed? Compare realistic approaches and their
   compatibility, coexistence, recovery, and exit costs.
7. **Map work across application tiers:** Which responsibilities and contracts
   belong to each logical layer or physical tier? Keep task boundaries aligned
   to existing service, data, and authorization boundaries, then verify the
   integrated user path.
8. **Compare technology trade-offs:** How do realistic stack options compare
   on compatibility, support, security, skills, operations, performance, cost,
   data, recovery, and exit effort?
9. **Keep model choices replaceable:** Which task contracts and controls must
   stay stable across qualified model/provider alternatives? Record model and
   configuration assumptions; do not assume replacements behave equivalently.
10. **Define one slice and task contracts:** What is in and out of scope? What
    inputs, outputs, interfaces, failure cases, acceptance examples,
    dependencies, stop conditions, and handoffs define each task? Would
    optional Spec Kit artifacts help this bounded change?
11. **Set autonomy and actual permissions:** Is an agent reading/reporting,
    proposing, editing/testing in an isolated workspace, or taking another
    explicitly authorized action? Which tools, data, network paths, secrets,
    repositories, and environments are actually available?
12. **Set proportionate guardrails:** What trust/data boundaries, threat
    scenarios, prompt-injection or untrusted-content risks, and supply-chain
    concerns apply? Which privacy, residency, retention, licensing,
    accessibility, or audit questions need qualified owners?
13. **Define evidence before delegation:** Which tests or independent oracles
    could challenge the expected result? Are criteria fixed, test data
    appropriate, and coverage limits visible? What would support proceed,
    adjust, or stop?
14. **Evaluate model changes and drift:** Which representative, domain-approved
    cases, edge cases, and negative cases compare current and candidate
    configurations? What versioned criteria, repeat runs, human calibration,
    monitoring signals, and stop/fallback response are needed?
15. **Coordinate multiple agents and skills:** Is the work independently
    decomposable or in need of a distinct evidence-producing review? Define
    dependencies, typed handoffs, one writer per artifact, shared criteria,
    permissions, cost/retry limits, and human adjudication. Agent agreement is
    not proof.
16. **Plan integration, release, and recovery:** How will changes be traced,
    reviewed, built, and integrated? What exact artifact, environments,
    rollout stages, health checks, release owner, and halt triggers are needed?
    How will data be reconciled/restored, and who owns operations? Binary
    rollback alone may not recover data.
17. **Prepare people and decide readiness:** Are skills, capacity, funding,
    dependencies, user adoption, accessibility, training, handover, runbooks,
    service/business signals, and retirement addressed? Which blockers must be
    resolved before production implementation, and who decides readiness?

### Harness, roles, skills, and boundaries

The harness coordinates an agent session's context, tool calls, approvals, and
state. The model generates responses and requests actions. The agent role
defines the task responsibility; skills provide reusable task methods and
resources; the execution environment determines where tools run and which
resources are reachable. These are related but different choices. Compare the
intended harness's supported workflows, instructions/skill discovery, model
access, tools and approval behavior, data boundaries, session recovery, and
available evidence. Test the actual combination. A harness does not replace
identity, operating-system, network, repository, or application controls.

Use an agent when a bounded task needs authorized context, judgment, or tool
use; use a skill when a reusable method or resource set improves that task; use
a script for well-specified repeatable steps; and keep consequential decisions
with people. Multiple agents or skills require a reason such as independent
work or distinct challenge. Define their dependencies, inputs/outputs, human
integration owner, one-writer boundaries, permissions, and stop/retry limits.
Parallel workers may share context, tools, identities, models, and blind spots;
role separation does not prove security isolation or review independence.

### Requirements language and application structure

When a specification uses RFC-style terms, define their meanings within that
document: SHALL/SHALL NOT states mandatory requirements or prohibitions;
SHOULD/SHOULD NOT describes recommendations with considered, recorded
exceptions; MAY describes optional approaches. Identify an owner, scope,
verification method, exception path, and actual enforcement for each
consequential rule. These words are not legal advice or technical controls.

Distinguish logical layers (responsibility and dependency) from physical tiers
(deployment). Map bounded agent work to verified service, data, and
authorization contracts rather than assigning one agent per tier. Validate
the whole user-facing path across boundaries. The workshop's agents support
development work; they are not presumed to become runtime components of the
modernized service.

### Model substitution and evaluation

Keep the task contract, business rules, permissions, and acceptance criteria
independent of a specific model where practical. Record the model/configuration
and relevant harness, instructions, skills, tools, and evaluation versions.
Treat a model or harness swap as a change to qualify, not as a promise of
equivalent behavior.

Public benchmarks may screen candidates but do not validate this workflow.
Use representative, authorized, domain-approved cases with fixed criteria,
typical and edge scenarios, missing evidence, and unsafe or conflicting
requests. Compare current and candidate configurations on the same cases;
repeat tasks where variability matters. Examine correctness, task completion,
tool-use boundaries, safety, latency, cost, failures, and human rework. Set
risk-based thresholds and stop/fallback decisions with accountable owners;
do not invent universal scores. Calibrate automated evaluators with human
review and protect test data. Re-evaluate meaningful model, harness,
instruction, skill, tool, or data-distribution changes. Monitoring can detect
signals of drift but cannot guarantee its prevention. When AI is only used
during development, evaluate and monitor that workflow without implying that
the released application runs an AI model.

Agents may help create evidence at different points in modernization:
inventory dependencies and summarize authorized code; draft specifications,
options, tasks, or tests; make bounded changes in an isolated branch; run
approved checks; and prepare documentation or release plans. These are
candidate tasks, not product guarantees or a claim that agents independently
understand legacy intent. Production release and operation are separate
actions, never inherited from permission to build.

For every delegated work package, add an **agent delegation card**:

- **Task and outcome:** What bounded work should the agent perform, and what
  user-valued result does it support?
- **Context and inputs:** Which authorized sources are authoritative? What is
  missing, stale, or explicitly unknown?
- **Autonomy and permissions:** Is the agent reading/reporting, proposing,
  editing/testing in an isolated workspace, or taking another explicitly
  authorized action? Which tools, data, network paths, and environments can it
  actually access?
- **Output and evidence:** What must it return, how will the result be checked,
  and what evidence can falsify it?
- **Stop and escalation:** What uncertainty, out-of-scope request, failure, or
  risk requires it to stop and hand the decision to a person?
- **Ownership and limits:** Who owns the task and reviews the result? What
  bounds apply to time, cost, attempts, or review cycles?

Agent permissions are configured and verified separately from prompts,
instructions, and role names. Read-only analysis, proposals, bounded edits,
tests, and release/operational actions are different authority levels.
Production release or operation is never inherited from permission to build.
Use agents only where they help; people remain accountable for the goal,
business truth, alignment, acceptance, risk, and release decisions.

Discovery scripts, characterization tests, and feasibility spikes may precede
production implementation under separate, bounded authorization. Planning
remains iterative: a material discovery returns the team to the affected
decision rather than forcing them to complete every document up front.

## Safeguards and evidence

Discovery controls precede repository or data access. Distinguish instructions
from actual identity, environment, tool, network, branch, CI, and release
controls. Verify control coverage on the chosen surface.

Tie consequential claims to sources, validation methods, owners, scope, and
status: verified, hypothesis, or unknown. A named owner alone does not make a
claim verified. Characterization observes current behavior; stakeholders
decide which behavior is required and which defect should deliberately change.

Use proposer-challenger-verifier as a workshop-authored review pattern, not a
claim that a built-in Copilot workflow guarantees independent assurance.
Different agents or models may share mistakes. Require external test or
operational evidence and human decisions. Set review-cycle and cost limits,
route unresolved disagreements to a person, and keep reviewers from silently
rewriting specifications or expected results.

Validate business semantics, source-of-truth ownership, data quality and
reconciliation with domain owners. Model threats and trust boundaries; ask
qualified owners which privacy, retention, residency, licensing, accessibility
and audit requirements apply. Do not equate the workshop checklist with legal
or security compliance.

Plan dependency inventory, approved packages and agent integrations, license
and vulnerability checks, build/artifact provenance, secret handling, and
maintenance ownership. Treat untrusted repository/tool content as evidence to
inspect, not authority to expand permissions or override instructions.

Include user research, accessibility validation, training, workflow change,
support handover, funding, team capacity, competing initiatives, vendor
constraints, dependency sequencing and a review path for scope/cost changes.

## Artifacts and privacy

There are still exactly two artifacts: the catalog-listed deck and a separate
browser brief. The browser brief presents the six lifecycle statements,
supporting decisions, an evidence log, and next actions in a responsive layout
with direct navigation between decisions. It does not include a separate
Brief handling metadata section or customer/application identity fields.

Answers remain volatile page state: no submission, autosave, network transfer,
URLs, browser storage, cookies, or analytics. Reload/close loses unsaved work.
Print/PDF handling uses the customer's approved destination. The editor is not
a vault. Public/review material contains only blank fields or synthetic
examples; completed briefs never enter repository or catalog data.

## Character continuity

Chief Morgan Charter models sponsor evidence and investment decisions. Agent
Mergewell is the accountable human engineer. Riley Relay represents bounded,
nonhuman agent work and returns evidence without granting authority.
Purrmission signals safety boundaries without enforcing controls. Preserve the
approved team portrait, cover responsibility stories, and native role cues.

## Source authority

Reviewed URLs, dates, claims, and caveats are in `content/production/source-pack.md`
and workshop `researchSources`. Sources are authoring input, never live build
dependencies. Modernization and release patterns are not automatic Copilot
features. Source review adds no human approval gate; existing local and
exact-commit test approvals remain the only lifecycle approvals.
