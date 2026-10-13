# Workflow First: exact visible source

This file fixes participant-visible copy, outputs, timing, and order. It does
not define Slidev implementation, imagery, or component behavior.

## S00 Agentic Workflows
**1 minute.**

Visible teaching copy:
> **Making Better Automation and AI Decisions**
>
> Agents are power tools. Agentic workflows are the machine tools that make them repeatable.
>
> Plan one bounded developer workflow:
> **Get this repository building and all critical tests passing.**
>
> Start with the goal, not the tool.

Output/routing: journey opened -> S01.
Coverage: workshop purpose and single use case.

<!--
Timebox: 1 minute
Talk track: Name the topic as agentic workflows, establish the developer use case, and explain that the workshop starts with the goal.
Transition: Move from the opening to the exact result the participant is trying to achieve.
Audience question: What would it mean for this repository to be healthy enough to proceed?
Response guidance: Keep the scope to one repository workflow; do not introduce other personas or goals.
Payoff: The participant knows the workshop is a bounded planning exercise, not a live implementation.
Sources: requirements.md; slide-manifest.md; GitHub Next, "GitHub Agentic Workflows" deck (https://github.github.com/gh-aw/slides/github-agentic-workflows.pdf), used as reviewed framing input only
-->

## S01 The Goal
**3 minutes.**

Visible teaching copy:
> **Get this repository building and all critical tests passing.**
>
> You are planning a developer workflow to investigate failures, make a
> defensible change, verify the result, and hand off a decision.
>
> **The goal comes before the harness.**

Output/routing: developer goal -> S02.
Coverage: single use case and outcome-first framing.

<!--
Timebox: 3 minutes
Talk track: Read the goal as a desired result, not as permission to change the repository.
Transition: Define the properties that make this goal testable and accountable.
Audience question: Who accepts the result, and what would count as complete?
Response guidance: Do not assume that “passing” means merge, deployment, or release approval.
Payoff: The participant has one stable headliner for every later planning decision.
Sources: requirements.md; slide-manifest.md
-->

## S02 Properties of the Goal
**2 minutes.**

Visible teaching copy:
> Make the goal usable by naming:
>
> - desired result and owner;
> - critical tests and acceptance criteria;
> - priority, time, and cost constraints;
> - completion signal; and
> - conditions that require a stop.
>
> A passing command is not the same as authorization to act.

Output/routing: goal properties -> S03.
Coverage: acceptance, ownership, constraints, completion, stop conditions.

<!--
Timebox: 2 minutes
Talk track: Turn the headline into a result someone can evaluate.
Transition: Place the goal into the whole workflow before choosing a working location.
Audience question: Which missing property would make this goal unsafe to automate?
Response guidance: Keep acceptance criteria observable and name a responsible owner.
Payoff: The goal has a clear success signal and a clear reason to stop.
Sources: requirements.md; slide-manifest.md
-->

## S03 The Whole Workflow
**2 minutes.**

Visible teaching copy:
> **Goal -> Harness -> Planning -> Evidence of Completion -> Human Review and Approval -> Act or Stop**
>
> Planning is one stage. Its properties expand next:
> preferred tech stack, governance, artifacts, verification, workflow boundary,
> boundary levels, stop conditions, and execution.

Output/routing: route map -> S04.
Coverage: zoomed-out workflow and planning hierarchy.

<!--
Timebox: 2 minutes
Talk track: Show the entire route before entering its planning stage.
Transition: Ask where the work will be managed.
Audience question: Which stage prevents a tool from becoming the workflow?
Response guidance: Emphasize that Planning expands into properties but remains one top-level stage.
Payoff: Participants see the route and understand how the later slides fit together.
Sources: requirements.md; slide-manifest.md
-->

## S04 Choose a Harness
**2 minutes.**

Visible teaching copy:
> A **harness is where the work is managed**.
>
> Consider:
> **editor such as VS Code** · **GitHub Copilot CLI** ·
> **GitHub Copilot app** · **another approved workspace** ·
> **GitHub Actions**
>
> These are labels for a working location. They do not grant access or
> execution authority.

Output/routing: harness choice -> S05.
Coverage: harness and capability-neutral framing.

<!--
Timebox: 2 minutes
Talk track: Separate the working location from source systems, policy, and authorization.
Transition: Compare when each harness is a sensible fit.
Audience question: What kind of work would be harder in each harness?
Response guidance: Do not claim a current feature, entitlement, integration, or outcome for a named product.
Payoff: The participant chooses a harness based on the work, not on branding.
Sources: requirements.md; slide-manifest.md
-->

## S05 When to Choose Each Harness
**2 minutes.**

Visible teaching copy:
> Choose an **interactive harness** when the failure is exploratory,
> ambiguous, one-off, or depends on frequent human judgment.
>
> Choose **GitHub Actions** when work is repeatable and repository-scoped,
> starts from an approved event, schedule, or manual dispatch, and produces
> a traceable artifact before a human gate.
>
> Keep the decision conditional on access, policy, and authorization.

Output/routing: harness selection guidance -> S06.
Coverage: harness comparison, triggers, schedules, human judgment.

<!--
Timebox: 2 minutes
Talk track: Explain the selection tradeoff without treating any harness as automatically better.
Transition: Enter Planning, where the participant defines how the chosen work will be controlled.
Audience question: Is this work repeatable enough for a trigger or schedule?
Response guidance: State that GitHub Actions can stop at a human gate and cannot authorize consequential action.
Payoff: The participant can justify a harness choice in terms of repeatability and judgment.
Sources: requirements.md; slide-manifest.md
-->

## S06 Planning
**3 minutes.**

Visible teaching copy:
> **Planning is one top-level workflow stage.**
>
> It defines:
> **preferred tech stack** · **governance** · **artifacts** ·
> **verification** · **workflow boundary** · **boundary levels** ·
> **stop conditions** · **execution**
>
> The next slides expand these properties one at a time.

Output/routing: planning stage -> S07.
Coverage: planning hierarchy.

<!--
Timebox: 3 minutes
Talk track: Frame Planning as the control surface for the complete workflow.
Transition: Start with the technology that is already present.
Audience question: What must be decided before anyone changes code?
Response guidance: Keep all eight properties inside Planning rather than presenting them as separate top-level stages.
Payoff: The participant has a coherent plan before execution begins.
Sources: requirements.md; slide-manifest.md
-->

## S07 Planning Property: Preferred Tech Stack
**3 minutes.**

Visible teaching copy:
> Identify the repository’s existing:
> **language** · **framework** · **runtime** · **package manager** ·
> **build tool** · **test tool** · **approved infrastructure**
>
> Prefer the established stack.
> A new dependency, runtime, registry, or architecture is a planned change,
> not an automatic fix.

Output/routing: stack constraints -> S08.
Coverage: preferred stack and change control.

<!--
Timebox: 3 minutes
Talk track: Inventory the stack before diagnosing a failure or proposing a replacement.
Transition: Move from technology choices to the rules that govern them.
Audience question: Which stack changes are allowed in this workflow?
Response guidance: Treat unapproved technology changes as a stop condition.
Payoff: The plan avoids solving a build problem by silently changing the environment.
Sources: requirements.md; slide-manifest.md
-->

## S08 Planning Property: Governance
**2 minutes.**

Visible teaching copy:
> Governance answers:
>
> - What cannot change?
> - What may change now?
> - What may be reconsidered later?
> - Who can approve an exception?
> - Which protected policies, branches, checks, or controls apply?
>
> Governance defines the rules; it does not define the workflow’s reach.

Output/routing: governance rules -> S09.
Coverage: governance versus boundary distinction.

<!--
Timebox: 2 minutes
Talk track: Name the rules and decision rights before work starts.
Transition: Identify the artifacts those rules apply to.
Audience question: Who can authorize an exception, and what must remain protected?
Response guidance: Do not imply that a tool or agent can grant its own authority.
Payoff: The participant can distinguish policy from operating scope.
Sources: requirements.md; slide-manifest.md
-->

## S09 Planning Property: Artifact Management
**2 minutes.**

Visible teaching copy:
> Identify what the workflow reads, changes, and produces:
>
> **source files** · **configuration** · **dependencies** · **logs** ·
> **test results** · **proposed changes** · **summary** ·
> **human-decision record**
>
> Keep evidence in its existing source systems. Store the human review,
> approval, rejection, exceptions, and final action status in the chosen record.

Output/routing: artifact plan -> S10.
Coverage: artifact management and evidence/decision-record distinction.

<!--
Timebox: 2 minutes
Talk track: Separate source evidence from the record of a human decision.
Transition: Decide how the work will be proven complete.
Audience question: Which artifact would be missing if the reviewer could not reproduce the conclusion?
Response guidance: Do not propose duplicating all source evidence in a new store.
Payoff: The participant knows what must be traceable and what must be recorded.
Sources: requirements.md; slide-manifest.md
-->

## S10 Planning Property: Verification
**2 minutes.**

Visible teaching copy:
> Decide **before execution**:
>
> - which commands and checks will run;
> - which tests are critical;
> - what pass, fail, skip, and incomplete mean;
> - what output is expected;
> - who verifies the result.
>
> Verification is the planned proof. It is not the completion evidence yet.

Output/routing: verification plan -> S11.
Coverage: verification before execution.

<!--
Timebox: 2 minutes
Talk track: Define proof before seeing the result so the workflow cannot move the goalposts.
Transition: Bound where the proof may be collected.
Audience question: What would make the verification result incomplete?
Response guidance: Keep the critical-test set explicit and do not redefine it after failure.
Payoff: The participant has a fair and reviewable completion standard.
Sources: requirements.md; slide-manifest.md
-->

## S11 Planning Property: Workflow Boundary
**3 minutes.**

Visible teaching copy:
> Define where the workflow starts and stops:
>
> **repository** · **branch** · **files** · **systems** · **environments** ·
> **permissions** · **data** · **time** · **cost**
>
> The boundary is the workflow’s reach.
> Anything outside it requires a new decision.

Output/routing: workflow scope -> S12.
Coverage: workflow boundary.

<!--
Timebox: 3 minutes
Talk track: Make the workflow’s reach concrete before execution.
Transition: Compare how the boundary changes at project, organization, and enterprise levels.
Audience question: What is explicitly out of scope for this repository workflow?
Response guidance: Treat scope expansion as a decision, not as a convenience.
Payoff: The participant can say where the workflow must stop even when the task is unfinished.
Sources: requirements.md; slide-manifest.md
-->

## S12 Planning Property: Boundary Levels
**3 minutes.**

Visible teaching copy:
> **Project:** repository, branch, files, tests, environment, and owner.
>
> **Organization:** approved tools, runners, secrets handling, review rules,
> protected branches, retention, and escalation.
>
> **Enterprise:** identity, data classification, compliance, network,
> provider/model, and audit requirements.
>
> Each level can add evidence, governance, and approval requirements.

Output/routing: boundary levels -> S13.
Coverage: project, organization, enterprise boundaries.

<!--
Timebox: 3 minutes
Talk track: Show that a project-level workflow can still be constrained by organization and enterprise rules.
Transition: Turn the boundaries into explicit stop conditions.
Audience question: Which higher-level rule could stop an otherwise valid project change?
Response guidance: Do not invent organization-specific policy; use the levels as generic examples.
Payoff: The participant understands why scope and authority can differ.
Sources: requirements.md; slide-manifest.md
-->

## S13 Planning Property: Explicit Stop Conditions
**3 minutes.**

Visible teaching copy:
> Stop when:
>
> - scope, revision, environment, or failing check is unknown;
> - critical tests or acceptance criteria are undefined;
> - evidence is missing, stale, contradictory, or inaccessible;
> - access, secrets, policy, or protected controls would expand;
> - tests would be weakened, skipped, or redefined to pass;
> - the change exceeds scope or verification is incomplete; or
> - a consequential action lacks human authorization.
>
> Preserve evidence, name the unmet condition, notify the owner, and identify
> what is needed to resume.

Output/routing: explicit stop conditions -> S14.
Coverage: stop behavior and resume requirements.

<!--
Timebox: 3 minutes
Talk track: Make stopping a designed outcome, not a failure of the workflow.
Transition: Explain how execution follows the plan without bypassing these stops.
Audience question: Which stop condition should be checked first for this goal?
Response guidance: Do not retry indefinitely or use a success-shaped fallback.
Payoff: The participant can protect the workflow when evidence or authority is insufficient.
Sources: requirements.md; slide-manifest.md
-->

## S14 Planning Property: Execution
**3 minutes.**

Visible teaching copy:
> Execute only the approved plan:
>
> **inspect** -> **reproduce** -> **classify** -> **hypothesize** ->
> **make the smallest defensible change** -> **run approved checks** ->
> **record deviations** -> **prepare handoff**
>
> Stay inside the chosen harness and boundary.
> Stop instead of silently expanding scope.

Output/routing: execution plan -> S15.
Coverage: execution and controlled deviation.

<!--
Timebox: 3 minutes
Talk track: Walk through execution as a sequence that remains subordinate to the plan.
Transition: Gather the observed results that show what happened.
Audience question: Where would this workflow pause rather than continue?
Response guidance: A proposed change is not a completed change, and a command result is not approval.
Payoff: The participant sees how execution stays bounded and reviewable.
Sources: requirements.md; slide-manifest.md
-->

## S15 Evidence of Completion
**3 minutes.**

Visible teaching copy:
> Show the observed evidence:
>
> **exact revision** · **failing check and build logs** ·
> **critical-test results** · **files and dependencies changed** ·
> **known-good comparison** · **remaining failures** ·
> **exceptions and uncertainty** · **traceable outputs**
>
> Verification was planned before execution.
> Evidence of completion is produced by execution.
> Evidence is not authorization.

Output/routing: completion evidence -> S16.
Coverage: evidence of completion and verification distinction.

<!--
Timebox: 3 minutes
Talk track: Review evidence against the predeclared verification plan.
Transition: Put the evidence in front of an authorized human reviewer.
Audience question: What remains unknown even after the checks pass?
Response guidance: Do not turn a passing result into permission to merge, deploy, remediate, or change status.
Payoff: The participant can explain whether the goal was met without overstating what the evidence proves.
Sources: requirements.md; slide-manifest.md
-->

## S16 Human Review and Approval
**2 minutes.**

Visible teaching copy:
> An authorized human reviews:
>
> - the goal and acceptance criteria;
> - the exact revision and proposed changes;
> - checks run and results;
> - remaining risk, exceptions, and uncertainty; and
> - the requested next action.
>
> The reviewer may **approve**, **reject**, **request changes**, or **stop**.
> Record the decision, reviewer, exceptions, authorization, and final status.

Output/routing: human decision -> S17.
Coverage: human-in-the-loop and decision record.

<!--
Timebox: 2 minutes
Talk track: Separate review of evidence from automated or tool-generated output.
Transition: Decide whether an authorized next action exists.
Audience question: What exactly is the reviewer authorizing?
Response guidance: Approval must be explicit and limited to the stated action and scope.
Payoff: Human accountability remains visible at the consequential boundary.
Sources: requirements.md; slide-manifest.md
-->

## S17 Act or Stop
**2 minutes.**

Visible teaching copy:
> **Act** only when the next action is separately authorized and within scope.
>
> **Stop** when approval is missing, rejected, conditional, expired, or
> outside the approved boundary.
>
> No autonomous merge, deployment, remediation, test-status decision,
> communication, or other consequential execution.

Output/routing: authorized next step or stopped workflow -> S18.
Coverage: act-or-stop gate and non-execution.

<!--
Timebox: 2 minutes
Talk track: Close the consequential-action boundary explicitly.
Transition: Recap the complete workflow as one coherent design.
Audience question: What would cause this route to stop even after a green check?
Response guidance: Keep authorization specific and do not imply that the workshop executes it.
Payoff: The participant can state the difference between evidence, approval, and action.
Sources: requirements.md; slide-manifest.md
-->

## S18 Workflow Recap
**1 minute.**

Visible teaching copy:
> **Goal -> Harness -> Planning -> Evidence of Completion -> Human Review and Approval -> Act or Stop**
>
> Planning contained:
> **stack · governance · artifacts · verification · boundary · levels ·
> stop conditions · execution**
>
> The route is complete only when the evidence and human decision are clear.

Output/routing: completed route -> S19.
Coverage: route recap and planning hierarchy.

<!--
Timebox: 1 minute
Talk track: Collapse the eight planning properties back into the one Planning stage.
Transition: Use the protected discussion to identify the next responsible question.
Audience question: Which planning property deserves the most attention in your context?
Response guidance: Keep the recap tied to the single developer use case.
Payoff: The participant sees the complete design without losing the internal planning detail.
Sources: requirements.md; slide-manifest.md
-->

## S19 Next Responsible Question
**15 minutes.**

Visible teaching copy:
> **Discussion**
>
> What is the next responsible question for improving this workflow?
>
> Consider:
> - What evidence is still missing?
> - Which boundary needs clarification?
> - Which check should be made repeatable?
> - Where must a human remain accountable?
>
> Do not treat this discussion as approval to implement.

Output/routing: protected discussion -> End.
Coverage: next question and protected discussion.

<!--
Timebox: 15 minutes
Talk track: Invite participants to apply the planning frame to their own developer context without creating a second workshop use case.
Transition: End after the protected discussion.
Audience question: What is the next responsible question, and who owns answering it?
Response guidance: Keep the discussion exploratory and publication-safe; no implementation authority is granted.
Payoff: Participants leave with a bounded next question rather than an unsupported promise of automation.
Sources: requirements.md; slide-manifest.md
-->
