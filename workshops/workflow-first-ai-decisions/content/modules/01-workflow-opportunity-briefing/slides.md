---
theme: ghcp
title: "Workflow First: Making Better Automation and AI Decisions"
transition: none
canvasWidth: 980
aspectRatio: 16/9
colorSchema: light
favicon: "data:,"
fonts:
  provider: none
  sans: Mona Sans
  local: Mona Sans, Segoe UI, Arial
layout: default
class: wfd
---

# Agentic Workflows

<div class="wfd-shell" data-slide-id="S00">
  <section class="wfd-grid wfd-grid--intro">
    <div class="wfd-panel wfd-intro"><p class="wfd-kicker">Making Better Automation and AI Decisions</p><p>Agents are power tools. Agentic workflows are the machine tools that make them repeatable.</p><p>Plan one bounded developer workflow:</p><p class="wfd-lead">Get this repository building and all critical tests passing.</p><p>Start with the goal, not the tool.</p></div>
    <div class="wfd-panel wfd-panel--art"><img src="./public/images/workflow-team-shallow-depth-v7.png" alt="Chief Morgan Charter standing taller in front with her black cat at her feet, Agent Mergewell and Riley Relay posed in a shallow row behind her"></div>
  </section>
</div>

<!--
Timebox: 1 minute
Talk track: Name the topic as agentic workflows, establish the developer use case, and explain that the workshop starts with the goal.
Transition: Move from the opening to the exact result the participant is trying to achieve.
Audience question: What would it mean for this repository to be healthy enough to proceed?
Response guidance: Keep the scope to one repository workflow; do not introduce other personas or goals.
Payoff: The participant knows the workshop is a bounded planning exercise, not a live implementation.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md; GitHub Next, "GitHub Agentic Workflows" deck (https://github.github.com/gh-aw/slides/github-agentic-workflows.pdf), used as reviewed framing input only
-->

---
layout: default
class: wfd
---

# The Goal

<div class="wfd-shell" data-slide-id="S01"><section class="wfd-wide"><p class="wfd-lead">Get this repository building and all critical tests passing.</p><p>You are planning a developer workflow to investigate failures, make a defensible change, verify the result, and hand off a decision.</p><p class="wfd-callout"><strong>The goal comes before the harness.</strong></p></section></div>

<!--
Timebox: 3 minutes
Talk track: Read the goal as a desired result, not as permission to change the repository.
Transition: Define the properties that make this goal testable and accountable.
Audience question: Who accepts the result, and what would count as complete?
Response guidance: Do not assume that passing means merge, deployment, or release approval.
Payoff: The participant has one stable headliner for every later planning decision.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Properties of the Goal

<div class="wfd-shell" data-slide-id="S02"><section class="wfd-grid"><div class="wfd-panel"><h2>Make it testable</h2><ul class="wfd-list"><li>Desired result and owner</li><li>Critical tests and acceptance criteria</li><li>Priority, time, and cost constraints</li></ul></div><div class="wfd-panel"><h2>Make it accountable</h2><ul class="wfd-list"><li>Completion signal</li><li>Conditions that require a stop</li><li>A passing command is not authorization</li></ul></div></section></div>

<!--
Timebox: 2 minutes
Talk track: Turn the headline into a result someone can evaluate.
Transition: Place the goal into the whole workflow before choosing a working location.
Audience question: Which missing property would make this goal unsafe to automate?
Response guidance: Keep acceptance criteria observable and name a responsible owner.
Payoff: The goal has a clear success signal and a clear reason to stop.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# The Whole Workflow

<div class="wfd-shell" data-slide-id="S03"><section class="wfd-wide"><div class="wfd-sequence"><span>Goal</span><i>-></i><span>Harness</span><i>-></i><span>Planning</span><i>-></i><span>Evidence</span><i>-></i><span>Human review</span><i>-></i><span>Act or stop</span></div><p>Planning expands into preferred tech stack, governance, artifacts, verification, workflow boundary, boundary levels, stop conditions, and execution.</p></section></div>

<!--
Timebox: 2 minutes
Talk track: Show the entire route before entering its planning stage.
Transition: Ask where the work will be managed.
Audience question: Which stage prevents a tool from becoming the workflow?
Response guidance: Emphasize that Planning expands into properties but remains one top-level stage.
Payoff: Participants see the route and understand how the later slides fit together.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Choose a Harness

<div class="wfd-shell" data-slide-id="S04"><section class="wfd-wide"><p class="wfd-lead">A harness is where the work is managed.</p><div class="wfd-grid"><div class="wfd-panel"><ul class="wfd-list"><li>Editor such as VS Code</li><li>GitHub Copilot CLI</li><li>GitHub Copilot app</li></ul></div><div class="wfd-panel"><ul class="wfd-list"><li>Another approved workspace</li><li>GitHub Actions</li><li>Source evidence stays in its existing systems</li></ul></div></div><p class="wfd-callout">These labels do not grant access or execution authority.</p></section></div>

<!--
Timebox: 2 minutes
Talk track: Separate the working location from source systems, policy, and authorization.
Transition: Compare when each harness is a sensible fit.
Audience question: What kind of work would be harder in each harness?
Response guidance: Do not claim a current feature, entitlement, integration, or outcome for a named product.
Payoff: The participant chooses a harness based on the work, not on branding.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# When to Choose Each Harness

<div class="wfd-shell" data-slide-id="S05"><section class="wfd-grid"><div class="wfd-panel"><h2>Interactive harness</h2><p>Use it when the failure is exploratory, ambiguous, one-off, or depends on frequent human judgment.</p></div><div class="wfd-panel"><h2>GitHub Actions</h2><p>Use it when work is repeatable and repository-scoped, starts from an approved event, schedule, or manual dispatch, and produces a traceable artifact before a human gate.</p></div></section><p class="wfd-callout">Access, policy, and authorization remain conditions for either choice.</p></div>

<!--
Timebox: 2 minutes
Talk track: Explain the selection tradeoff without treating any harness as automatically better.
Transition: Enter Planning, where the participant defines how the chosen work will be controlled.
Audience question: Is this work repeatable enough for a trigger or schedule?
Response guidance: State that GitHub Actions can stop at a human gate and cannot authorize consequential action.
Payoff: The participant can justify a harness choice in terms of repeatability and judgment.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning

<div class="wfd-shell" data-slide-id="S06"><section class="wfd-wide"><p class="wfd-lead">Planning is one top-level workflow stage.</p><div class="wfd-flow--vertical"><span>Preferred tech stack</span><span>Governance</span><span>Artifacts</span><span>Verification</span><span>Workflow boundary</span><span>Boundary levels</span><span>Stop conditions</span><span>Execution</span></div><p>The next slides expand these properties one at a time.</p></section></div>

<!--
Timebox: 3 minutes
Talk track: Frame Planning as the control surface for the complete workflow.
Transition: Start with the technology that is already present.
Audience question: What must be decided before anyone changes code?
Response guidance: Keep all eight properties inside Planning rather than presenting them as separate top-level stages.
Payoff: The participant has a coherent plan before execution begins.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Preferred Tech Stack

<div class="wfd-shell" data-slide-id="S07"><section class="wfd-grid"><div class="wfd-panel"><h2>Inventory</h2><p>Language · framework · runtime · package manager</p><p>Build tool · test tool · approved infrastructure</p></div><div class="wfd-panel"><h2>Prefer what exists</h2><p>A new dependency, runtime, registry, or architecture is a planned change, not an automatic fix.</p><p class="wfd-callout">Unapproved technology changes are a stop condition.</p></div></section></div>

<!--
Timebox: 3 minutes
Talk track: Inventory the stack before diagnosing a failure or proposing a replacement.
Transition: Move from technology choices to the rules that govern them.
Audience question: Which stack changes are allowed in this workflow?
Response guidance: Treat unapproved technology changes as a stop condition.
Payoff: The plan avoids solving a build problem by silently changing the environment.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Governance

<div class="wfd-shell" data-slide-id="S08"><section class="wfd-wide"><div class="wfd-grid"><div class="wfd-panel"><h2>Decide</h2><ul class="wfd-list"><li>What cannot change?</li><li>What may change now?</li><li>What may be reconsidered later?</li></ul></div><div class="wfd-panel"><h2>Authorize</h2><ul class="wfd-list"><li>Who approves an exception?</li><li>Which protected policies, branches, checks, or controls apply?</li></ul></div></div><p class="wfd-callout">Governance defines the rules; it does not define the workflow’s reach.</p></section></div>

<!--
Timebox: 2 minutes
Talk track: Name the rules and decision rights before work starts.
Transition: Identify the artifacts those rules apply to.
Audience question: Who can authorize an exception, and what must remain protected?
Response guidance: Do not imply that a tool or agent can grant its own authority.
Payoff: The participant can distinguish policy from operating scope.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Artifact Management

<div class="wfd-shell" data-slide-id="S09"><section class="wfd-wide"><p class="wfd-lead">Identify what the workflow reads, changes, and produces.</p><div class="wfd-sequence"><span>Source files</span><span>Configuration</span><span>Dependencies</span><span>Logs</span><span>Test results</span><span>Proposed change</span></div><p>Keep evidence in its existing source systems. Store the human review, approval, rejection, exceptions, and final action status in the chosen decision record.</p></section></div>

<!--
Timebox: 2 minutes
Talk track: Separate source evidence from the record of a human decision.
Transition: Decide how the work will be proven complete.
Audience question: Which artifact would be missing if the reviewer could not reproduce the conclusion?
Response guidance: Do not propose duplicating all source evidence in a new store.
Payoff: The participant knows what must be traceable and what must be recorded.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Verification

<div class="wfd-shell" data-slide-id="S10"><section class="wfd-grid"><div class="wfd-panel"><h2>Decide before execution</h2><ul class="wfd-list"><li>Commands and checks</li><li>Critical-test set</li><li>Pass, fail, skip, and incomplete meaning</li></ul></div><div class="wfd-panel"><h2>Make proof reviewable</h2><ul class="wfd-list"><li>Expected outputs</li><li>Review criteria</li><li>Responsible verifier</li></ul></div></section><p class="wfd-callout">Verification is the planned proof. Completion evidence comes later.</p></div>

<!--
Timebox: 2 minutes
Talk track: Define proof before seeing the result so the workflow cannot move the goalposts.
Transition: Bound where the proof may be collected.
Audience question: What would make the verification result incomplete?
Response guidance: Keep the critical-test set explicit and do not redefine it after failure.
Payoff: The participant has a fair and reviewable completion standard.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Workflow Boundary

<div class="wfd-shell" data-slide-id="S11"><section class="wfd-wide"><p class="wfd-lead">Define where the workflow starts and stops.</p><div class="wfd-sequence"><span>Repository</span><span>Branch</span><span>Files</span><span>Systems</span><span>Environments</span><span>Permissions</span></div><p>Also set the allowed data, time, and cost. Anything outside the boundary requires a new decision.</p></section></div>

<!--
Timebox: 3 minutes
Talk track: Make the workflow’s reach concrete before execution.
Transition: Compare how the boundary changes at project, organization, and enterprise levels.
Audience question: What is explicitly out of scope for this repository workflow?
Response guidance: Treat scope expansion as a decision, not as a convenience.
Payoff: The participant can say where the workflow must stop even when the task is unfinished.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Boundary Levels

<div class="wfd-shell" data-slide-id="S12"><section class="wfd-grid"><div class="wfd-panel"><h2>Project</h2><p>Repository, branch, files, tests, environment, and owner.</p></div><div class="wfd-panel"><h2>Organization</h2><p>Approved tools, runners, secrets handling, review rules, protected branches, retention, and escalation.</p></div></section><section class="wfd-wide"><h2>Enterprise</h2><p>Identity, data classification, compliance, network, provider/model, and audit requirements.</p><p class="wfd-callout">Each level can add evidence, governance, and approval requirements.</p></section></div>

<!--
Timebox: 3 minutes
Talk track: Show that a project-level workflow can still be constrained by organization and enterprise rules.
Transition: Turn the boundaries into explicit stop conditions.
Audience question: Which higher-level rule could stop an otherwise valid project change?
Response guidance: Do not invent organization-specific policy; use the levels as generic examples.
Payoff: The participant understands why scope and authority can differ.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Explicit Stop Conditions

<div class="wfd-shell" data-slide-id="S13"><section class="wfd-wide"><p class="wfd-lead">Stop when scope, evidence, authority, or verification is not sufficient.</p><div class="wfd-grid"><div class="wfd-panel"><ul class="wfd-list"><li>Unknown revision, environment, or failing check</li><li>Undefined critical tests</li><li>Missing, stale, contradictory, or inaccessible evidence</li><li>Boundary or access expansion</li></ul></div><div class="wfd-panel"><ul class="wfd-list"><li>Tests weakened, skipped, or redefined</li><li>Change exceeds scope</li><li>Verification is incomplete</li><li>Consequential action lacks approval</li></ul></div></div><p>Preserve evidence, name the unmet condition, notify the owner, and identify what is needed to resume.</p></section></div>

<!--
Timebox: 3 minutes
Talk track: Make stopping a designed outcome, not a failure of the workflow.
Transition: Explain how execution follows the plan without bypassing these stops.
Audience question: Which stop condition should be checked first for this goal?
Response guidance: Do not retry indefinitely or use a success-shaped fallback.
Payoff: The participant can protect the workflow when evidence or authority is insufficient.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Planning Property: Execution

<div class="wfd-shell" data-slide-id="S14"><section class="wfd-wide"><div class="wfd-sequence"><span>Inspect</span><i>-></i><span>Reproduce</span><i>-></i><span>Classify</span><i>-></i><span>Hypothesize</span><i>-></i><span>Smallest defensible change</span><i>-></i><span>Approved checks</span></div><p>Record deviations and prepare the handoff. Stay inside the chosen harness and boundary. Stop instead of silently expanding scope.</p></section></div>

<!--
Timebox: 3 minutes
Talk track: Walk through execution as a sequence that remains subordinate to the plan.
Transition: Gather the observed results that show what happened.
Audience question: Where would this workflow pause rather than continue?
Response guidance: A proposed change is not a completed change, and a command result is not approval.
Payoff: The participant sees how execution stays bounded and reviewable.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Evidence of Completion

<div class="wfd-shell" data-slide-id="S15"><section class="wfd-wide"><p class="wfd-lead">Show the observed evidence.</p><div class="wfd-sequence"><span>Exact revision</span><span>Build logs</span><span>Critical tests</span><span>Changed files</span><span>Known-good comparison</span><span>Remaining risk</span></div><p>Verification was planned before execution. Evidence of completion is produced by execution. Evidence is not authorization.</p></section></div>

<!--
Timebox: 3 minutes
Talk track: Review evidence against the predeclared verification plan.
Transition: Put the evidence in front of an authorized human reviewer.
Audience question: What remains unknown even after the checks pass?
Response guidance: Do not turn a passing result into permission to merge, deploy, remediate, or change status.
Payoff: The participant can explain whether the goal was met without overstating what the evidence proves.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Human Review and Approval

<div class="wfd-shell" data-slide-id="S16"><section class="wfd-grid"><div class="wfd-panel"><h2>Review</h2><p>Goal, acceptance criteria, exact revision, proposed changes, checks, results, remaining risk, exceptions, and uncertainty.</p></div><div class="wfd-panel"><h2>Decide</h2><p><strong>Approve</strong> · <strong>Reject</strong> · <strong>Request changes</strong> · <strong>Stop</strong></p><p>Record the reviewer, decision, exceptions, authorization, and final status.</p></div></section></div>

<!--
Timebox: 2 minutes
Talk track: Separate review of evidence from automated or tool-generated output.
Transition: Decide whether an authorized next action exists.
Audience question: What exactly is the reviewer authorizing?
Response guidance: Approval must be explicit and limited to the stated action and scope.
Payoff: Human accountability remains visible at the consequential boundary.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Act or Stop

<div class="wfd-shell" data-slide-id="S17"><section class="wfd-grid"><div class="wfd-panel"><h2>Act</h2><p>Only when the next action is separately authorized and within scope.</p></div><div class="wfd-panel"><h2>Stop</h2><p>When approval is missing, rejected, conditional, expired, or outside the approved boundary.</p></div></section><p class="wfd-callout">No autonomous merge, deployment, remediation, test-status decision, communication, or other consequential execution.</p></div>

<!--
Timebox: 2 minutes
Talk track: Close the consequential-action boundary explicitly.
Transition: Recap the complete workflow as one coherent design.
Audience question: What would cause this route to stop even after a green check?
Response guidance: Keep authorization specific and do not imply that the workshop executes it.
Payoff: The participant can state the difference between evidence, approval, and action.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Workflow Recap

<div class="wfd-shell" data-slide-id="S18"><section class="wfd-wide"><div class="wfd-sequence"><span>Goal</span><i>-></i><span>Harness</span><i>-></i><span>Planning</span><i>-></i><span>Evidence</span><i>-></i><span>Human review</span><i>-></i><span>Act or stop</span></div><p>Planning contained: <strong>stack · governance · artifacts · verification · boundary · levels · stop conditions · execution</strong>.</p><p class="wfd-callout">The route is complete only when the evidence and human decision are clear.</p></section></div>

<!--
Timebox: 1 minute
Talk track: Collapse the eight planning properties back into the one Planning stage.
Transition: Use the protected discussion to identify the next responsible question.
Audience question: Which planning property deserves the most attention in your context?
Response guidance: Keep the recap tied to the single developer use case.
Payoff: The participant sees the complete design without losing the internal planning detail.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->

---
layout: default
class: wfd
---

# Next Responsible Question

<div class="wfd-shell" data-slide-id="S19"><section class="wfd-wide"><p class="wfd-lead">What is the next responsible question for improving this workflow?</p><div class="wfd-grid"><div class="wfd-panel"><ul class="wfd-list"><li>What evidence is still missing?</li><li>Which boundary needs clarification?</li></ul></div><div class="wfd-panel"><ul class="wfd-list"><li>Which check should be made repeatable?</li><li>Where must a human remain accountable?</li></ul></div></div><p class="wfd-callout">Discussion is not approval to implement.</p></section></div>

<!--
Timebox: 15 minutes
Talk track: Invite participants to apply the planning frame to their own developer context without creating a second workshop use case.
Transition: End after the protected discussion.
Audience question: What is the next responsible question, and who owns answering it?
Response guidance: Keep the discussion exploratory and publication-safe; no implementation authority is granted.
Payoff: Participants leave with a bounded next question rather than an unsupported promise of automation.
Sources: requirements.md; workflow-first-source.md; slide-manifest.md
-->
