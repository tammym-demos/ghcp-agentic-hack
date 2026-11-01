# Modernization decision-loop learning architecture

## Audience and purpose

Developers using GitHub Copilot help a customer decide whether modernization
is worth doing, what evidence is needed to begin one bounded slice, and what
to do after observing its results. Assume general development experience, not
a particular cloud, language, or architecture. The application has little
reliable documentation and no available original authors. No repository,
enterprise feature, live agent, or code lab is required.

The workshop is a facilitator-led customer discussion, not a time-boxed coding
lab. Numeric timings are provisional schema-compatible estimates only. The
participant outcome is a decision/readiness outline with evidence gaps, not a
validated production plan or permission to release.

## Measurable outcomes and evidence map

| Outcome | Instruction and participant practice | Observable output |
| --- | --- | --- |
| Describe the service before choosing a solution | Trace the fictional order-status delay through users, business work, owners, dependencies, and available evidence. | A concise service context and a list of claims to verify. |
| Make an investment decision | Compare the desired benefit and baseline with whole-life cost, organizational consequences, risks of changing or doing nothing, and realistic alternatives. | A Goal statement naming the next funded action, assumptions, residual risk, and decision owner. |
| Choose and configure agent work deliberately | Distinguish model, harness, agent role, skill, and execution environment; select a worker/method that fits a bounded task and verify actual controls. | A task choice with a reasoned harness and agent/skill configuration, plus known permissions and limits. |
| Make requirements and architecture testable | Separate mandatory rules from recommendations and optional approaches; map work to service and data contracts across logical layers and physical tiers. | Owner-backed requirements with verification/enforcement paths and a boundary map for one user-facing flow. |
| Plan humans' work before delegating to agents | Align work to verified intent; define trusted context, autonomy, permissions, safeguards, acceptance, evidence, handoffs, and human-only decisions. | A Plan statement, practical checklist, and one or more work packages with owners, evidence, limits, and stop/escalation conditions. |
| Coordinate multiple agents and skills proportionately | Decide when work is independent enough to delegate, when skills can be reused by one worker, and how to manage dependencies and independent review. | A bounded work graph with explicit inputs/outputs, one writer per artifact, integration ownership, and no claim that agent agreement proves correctness. |
| Keep model substitution evidence-led | Separate task contracts and controls from model/provider choice; compare candidates on the same task-specific evaluation set, inspect failures and variability, and define re-evaluation triggers. | A versioned comparison and a human decision to qualify, investigate, retain, or reject a candidate; no drift-free guarantee. |
| Use optional planning and review practices safely | Decide whether Spec Kit artifacts help this bounded change; distinguish proposer, challenger, verifier, independent evidence, and human authority. | An optional workflow and challenge plan; no claim that generated artifacts or agreement prove correctness. |
| Build and evaluate against agreed evidence | Apply traceable increments, review and test evidence, compare results with fixed criteria, and preserve unresolved uncertainty. | Build and Evaluate statements with proceed/adjust/stop decision. |
| Deploy, monitor, and revisit the investment | Identify the exact artifact, release owner, data-safe response, operational/business signals, and retirement conditions; explain optional container packaging and its controls; return evidence to the next Goal decision. | Deploy and Monitor statements plus a next investment decision. |
| Leave a separate customer artifact | Read back six statements and evidence gaps, then explain the volatile browser editor and approved print handling. | A separate blank/in-memory brief with no customer or application identity fields in the reusable content. |

## Decision loop and dependencies

1. **Understand the service:** identify the people, outcome, workflow,
   dependencies, owners, criticality, current evidence, and unknowns that shape
   the modernization question.
2. **Goal / justify investment:** establish benefit and baseline, whole-life
   cost and consequences, action/inaction risks, alternatives, and the next
   investment or discovery decision.
3. **Plan humans' work before delegating to agents:** choose an appropriate
   harness and decide whether the task needs an agent, reusable skill, script,
   or person. Provide authorized context; align work to verified business
   rules and technical constraints; distinguish mandatory requirements,
   recommendations, and optional approaches; and map the end-to-end contract
   across application layers and tiers. Define task inputs/outputs, autonomy,
   actual permissions, safeguards, acceptance, independent evidence, handoffs,
   stop paths, and accountable owners. Include transition, technology, model
   portability, recovery, operations, people, and capacity decisions.
4. **Qualify model changes:** compare the current and candidate configurations
   on the same representative, domain-approved cases and fixed, risk-based
   criteria. Include edge, missing-evidence, and unsafe cases; account for
   variability; record model, harness, instructions, skills, tools, criteria,
   cost, and latency; and set re-evaluation and stop/fallback triggers.
   Benchmarks can screen models but do not validate this workflow. Evaluation
   does not guarantee drift prevention.
5. **Build:** implement only authorized, traceable increments. New evidence
   that changes a requirement or assumption returns to the affected decision.
6. **Evaluate:** compare observations to agreed criteria using evidence that
   can falsify the preferred result. A human decides to proceed, adjust, or
   stop.
7. **Deploy:** release the exact evaluated artifact under named authority;
   consider a compatible container image for repeatable deployment and
   process isolation without treating it as automatic security. Verify image
   identity, configuration, permissions, and host controls; stage exposure,
   observe health, and rehearse a feasible data-safe response.
8. **Monitor and return to Goal:** measure service and business outcomes,
   operating cost, adoption, and unresolved risk. Continue, change course,
   defer, retire, or stop based on what happened.

This is a repeating loop, not a waterfall and not a requirement to finish
every document for a future target system before learning. Planning depth is
proportionate to the first slice and its risks. Authorized discovery scripts,
characterization tests, and feasibility spikes may precede production
implementation.

## Human planning and agent-work contract

The 17 Plan slides help people decide what work agents may do and what must be
prepared before they do it. The checklist is a conversation aid, not a
universal gate; record evidence, an owner, and the next decision or stop
condition for material items. Mark an item not applicable with a reason:

1. choose the harness that fits the work and environment;
2. choose an agent, skill, script, or person for the task;
3. authorize access and prepare verified service context;
4. align tasks to business rules, data, invariants, and constraints;
5. separate mandatory requirements, recommendations, and optional approaches;
6. choose a safe transition approach;
7. map work across application contracts, logical layers, and physical tiers;
8. compare technology with explicit evidence and trade-offs;
9. keep model choices replaceable without assuming behavior is interchangeable;
10. define one bounded slice and its agent task contracts;
11. set autonomy and actual tool, data, and environment permissions;
12. apply proportionate safety, security, privacy, and supply-chain guardrails;
13. define independent verification before delegation;
14. evaluate model changes and plan to detect behavior drift;
15. coordinate multiple agents and skills only with bounded, reviewable handoffs;
16. plan integration, release, recovery, and operations; and
17. check people, capacity, ownership, and readiness to delegate.

An agent work package states its outcome, authorized context/inputs, permitted
tools/data, autonomy, expected output, acceptance/evidence, stop/escalation
conditions, and human owner/reviewer. Candidate work includes authorized
dependency inventory, evidence summaries, draft specifications/tasks/tests,
bounded edits in an isolated branch, approved checks, and documentation.
These are authored examples, not product guarantees or proof that an agent
understands undocumented intent. Production release and operations are not
inherited from permission to build.

Skills package reusable methods and resources for an agent; they do not
constitute a separate worker or permission boundary. Multiple agents are useful
only when bounded specialization, independent work, or distinct challenge
justifies the added handoffs and cost. Different agents may share the same
tools, context, model, and blind spots. Keep one writer per artifact and name
an integration owner.

The harness coordinates a model's context, tool calls, approvals, and session
state. Model access, agent role, skill, execution environment, and harness are
separate choices. Verify behavior and controls on the chosen combination;
do not assume harness-wide support or treat it as every underlying security
boundary.

Use SHALL/SHALL NOT, SHOULD/SHOULD NOT, and MAY only with explicit definitions
in the governing specification. Mandatory wording needs an owner and a way to
verify it; configured controls, not capitalization, constrain actions.
Recommendations may be excepted when their implications are considered and
the rationale is recorded.

Application layers express responsibilities and dependency rules; physical
tiers describe deployment boundaries. They may not map one-to-one. Divide
agent work by verified interfaces and ownership, not automatically by tier,
and verify the complete vertical path.

Public benchmarks are screening evidence. A task-specific evaluation needs
representative, approved examples, fixed expected results, edge and negative
cases, checks for safe tool behavior, and calibrated human review. Keep
criteria and relevant configuration versions fixed for comparisons; inspect
individual failures and variability instead of relying only on an aggregate
score. Re-evaluate meaningful changes and define a human-owned stop or fallback
decision. If AI agents are used only during development, model evaluations
measure the development workflow; they do not imply that the released service
uses AI or has model drift at runtime.

Every Plan slide connects the next choice to the service outcome, an answerable
discussion prompt, and the evidence/owner or unresolved assumption to capture.
The first-slice readiness review is a customer engineering decision taught by
the workshop, not an additional approval gate in this repository's production
lifecycle.

## Scenario

The fictional COBOL order system produces overnight status. Support staff want
daytime answers without altered totals or unauthorized exposure. Investigate
whether an adapter or interface could meet the need before considering wider
replacement. Freshness, load, authorization, reconciliation, operating costs,
and recovery are questions, not established results.

Do not invent measured costs, targets, versions, architecture, test results, or
enforced controls. Evidence may contradict a preferred solution. Preserve the
option to stop, defer, retain, or fund additional discovery.

## Source and agent boundaries

Use `source-pack.md` as the reviewed baseline. Modernization patterns and
technology choices are workload-specific. Strangler fig, branch by abstraction,
and expand-migrate-contract each have applicability limits and coexistence
costs; none is a default answer.

Spec Kit structures artifacts for a bounded existing-system change. It does
not infer a complete legacy specification, select a correct architecture,
enforce access, or authorize deployment. Show the conceptual planning flow
without depending on client-specific command syntax.

Proposer-challenger-verifier is an authored review pattern. Agent disagreement
is a reason to investigate; agreement is not proof. Independent oracles include
held-out acceptance fixtures, contracts, operational evidence, and qualified
human review. Bound reviewer access and cycles; acceptance changes remain
explicit human decisions.

The agent work package and autonomy choices are workshop-authored planning
methods, not built-in product controls. A role label, prompt, instruction file,
or agent agreement does not enforce access or prove alignment. Align agent
tasks to verified business outcomes, invariants, acceptance criteria, and
technical constraints; trace outputs to those sources. Verify actual identity,
tool, data, environment, network, branch, CI, and release controls. People own
goals, business truth, requirements, risk acceptance, and release.

## Two artifacts and continuity

The deck teaches the decision loop. The separate browser brief records six
explicit statements, modernization drivers, Plan checklist status, and
supporting agent-work evidence without customer/application identity fields.
Responses remain in the open page, not in slides, URLs, storage, network
requests, or catalog. Print uses the native dialog and approved handling.
Existing volatile tabs must not be refreshed without consent.

The approved cover team remains unchanged. Morgan represents sponsor judgment;
Mergewell human engineering ownership; Riley bounded nonhuman agent work; and
Purrmission boundary reminders, never actual enforcement.
