---
theme: ghcp
title: "Module 3: Advanced — Workshop Guide"
layout: advanced-cover
class: advanced-cover--plate
transition: slide-left
colorSchema: light
mdc: true
---

<div class="advanced-brand-row">
  <img src="/images/microsoft-logo.png" alt="Microsoft" class="advanced-microsoft-logo" />
  <span class="advanced-github-text">GitHub</span>
</div>

<div class="advanced-kicker">GitHub Copilot · Advanced workflows</div>

# Module 3: Advanced — Workshop Guide

Accountable orchestration, governed integration, evaluation, recovery, and final human acceptance

**60-minute teaching path · 30-minute mission**

::visual::

<div class="advanced-semantic-plate advanced-semantic-plate--cover">
  <img class="advanced-plate-image" src="/images/accountable-trio-cover-anchor.png" alt="Agent Mergewell, Riley Relay, and Purrmission gathered around a bounded case table" />
  <span class="advanced-semantic-label advanced-cover-label--plan">Plan + scope</span>
  <span class="advanced-semantic-label advanced-cover-label--evidence">Returned evidence</span>
  <span class="advanced-semantic-label advanced-cover-label--safety">Safety boundary</span>
  <span class="advanced-semantic-label advanced-semantic-label--human advanced-cover-label--acceptance">Human acceptance</span>
</div>

<!--
Timebox: 1 minute

Talk track: Advanced picks up exactly where your Agentic mission stopped.
You can brief one bounded collaborator and verify what it gives you back. That's
real. Now we scale that same discipline — across orchestration, integration
surfaces, debugging, recovery, and final acceptance.
And I want to name the trap in the word "advanced." It does not mean more autonomy.
It means more moving parts, and every one of them is a place accountability can go
missing.
Mergewell is still the accountable human. Riley still does bounded work and returns
evidence. Purrmission still guards the consequential and the irreversible.
More parts. Same owner.
So tell me where it hurts. As this scales up, which risk grows fastest for you —
unclear ownership, unsafe integration, weak evidence, or hard recovery?

Transition: Let's map the sixty-minute route and the separate Advanced mission.

Audience question: As agentic work scales, which risk grows fastest for you: unclear ownership, unsafe integration, weak evidence, or difficult recovery?

Response guidance: Take a quick choice and one short reason. Connect the strongest
response to the agenda section that handles it — then leave it unresolved. You're
setting a hook, not answering it here.
Payoff: The question activates the audience’s scaling concern and frames Advanced as accountable orchestration rather than maximum autonomy.
Sources: content/modules/03-advanced/module.md; content/modules/03-advanced/copilot-dev-advanced-workshop.md module summary; content/modules/03-advanced/art-direction.md character rules
-->

---
layout: advanced-content
---

<div class="advanced-kicker">19 slides · 60-minute teaching route</div>

# Session Agenda

<div class="advanced-agenda">
  <div class="advanced-agenda__item">
    <div class="advanced-agenda__time">2</div>
    <strong>Open</strong>
    <span>Orient · set the route</span>
  </div>
  <div class="advanced-agenda__item advanced-agenda__item--focus">
    <div class="advanced-agenda__time">16</div>
    <strong>Orchestrate</strong>
    <span>Choose · delegate · isolate</span>
  </div>
  <div class="advanced-agenda__item">
    <div class="advanced-agenda__time">23</div>
    <strong>Govern</strong>
    <span>Surfaces · skills · MCP</span>
  </div>
  <div class="advanced-agenda__item advanced-agenda__item--focus">
    <div class="advanced-agenda__time">17</div>
    <strong>Evaluate + integrate</strong>
    <span>Evidence · recover · prove</span>
  </div>
  <div class="advanced-agenda__item">
    <div class="advanced-agenda__time">2</div>
    <strong>Launch mission</strong>
    <span>Separate 30-minute case</span>
  </div>
</div>

<div class="advanced-callout">
The teaching route totals 60 minutes before the separate mission.
</div>

<!--
Timebox: 1 minute

Talk track: Sixty minutes of teaching, and it's front-loaded on judgment.
Two minutes opening. Sixteen on choosing accountable orchestration. Twenty-three
governing integration surfaces and workplace context — that's the biggest block,
and it's where most of the risk lives. Seventeen on evaluating and integrating
evidence. Two to launch the mission.
And the mission is separate. Thirty minutes, after the teaching path.
One request for me and for you: keep the examples bounded. Every minute we
overspend early comes straight out of evaluation and mission time at the end.
Looking at those sections — which one do you think is hardest to actually apply
when you're under delivery pressure?

Transition: Let's start where the judgment starts — how you split work across
agents and who owns the merge.

Audience question: Which section do you expect will be hardest to apply under real delivery pressure?

Response guidance: Take one quick answer or a show of hands, note which section it
was, and defer the real discussion to that slide. Resist the urge to start teaching
it now.
Payoff: The presenter gains an emphasis cue while making the timing and separate mission boundary explicit.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md “Session Agenda”; content/modules/03-advanced/slide-manifest.md row 2
-->

---
layout: advanced-concept
class: advanced-concept--role-return
---

<div class="advanced-kicker">Three obligations · one accountable merge</div>

# Multi-Agent Orchestration: Roles, Boundaries, and Merge Ownership

::visual::

<div class="advanced-semantic-plate advanced-semantic-plate--role-return">
  <img class="advanced-plate-image advanced-plate-image--role-return" src="/images/role-return-merge-gate-anchor.png" alt="Three bounded work lanes return evidence through Riley Relay to Agent Mergewell at a human-owned merge gate" />
  <span class="advanced-semantic-label advanced-role-return-label--research">Research → Sources</span>
  <span class="advanced-semantic-label advanced-role-return-label--implement">Implement → Diff</span>
  <span class="advanced-semantic-label advanced-role-return-label--validate">Validate → Checks</span>
  <span class="advanced-semantic-label advanced-role-return-label--evidence">Returned evidence</span>
  <span class="advanced-semantic-label advanced-semantic-label--human advanced-role-return-label--gate">Human merge gate</span>
  <span class="advanced-semantic-label advanced-semantic-label--human advanced-role-return-label--merge">Reconcile + merge</span>
</div>

<!--
Timebox: 3 minutes

Talk track: Multi-agent orchestration does not start with how many agents you have.
It starts with three obligations.
Give every lane a clear role. Define the evidence that lane has to return. And name
one human who owns reconciliation and merge. One. Not a committee.
So research comes back with sources. Implementation comes back with a diff.
Validation comes back with checks. Three lanes, three concrete returns.
But here's the test before you split anything.
Only divide the work when each role can be owned independently and the outputs can
actually be reconciled. If you can't reconcile them, you haven't parallelized the
work — you've just distributed the confusion, and somebody has to untangle it later.
So if you split into research, implementation, and validation: what does each lane
have to hand back before your merge owner can decide anything?

Transition: With roles clear, teams still need a governed way to discover reusable
resources.

Audience question: If you split one task into research, implementation, and validation, what must each lane return before the merge owner can decide?

Response guidance: Require a concrete evidence object from each lane — not a status
update. Then ask how attribution and open uncertainty stay visible at the merge
gate, because that's what usually gets lost.
Payoff: Learners practice designing returns before adding parallelism, which prevents orchestration from becoming unowned activity.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 3 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage advanced-stage--wide">
<div>

<div class="advanced-kicker">Discover broadly · approve narrowly</div>

# Awesome Copilot List

<div class="advanced-hero-quote">Discovery is input—not authorization.</div>

<div v-click class="advanced-prompt advanced-prompt--reveal"><strong>Vet one discovery resource</strong>Review this Copilot skill or ecosystem example as a discovery resource. Identify source credibility, enterprise compatibility, permissions, and what must be approved before the team uses it.</div>

</div>
<div class="advanced-gate-path">
  <div>Curated discovery</div><span>→</span>
  <div>Provenance + license</div><span>→</span>
  <div>Permissions + data scope</div><span>→</span>
  <div>Maintenance + enterprise fit</div><span>→</span>
  <div class="advanced-gate-path__approved">Approved use</div>
</div>
</div>

<!--
Timebox: 2 minutes

Talk track: Curated Copilot lists are genuinely useful. Great for discovery.
And discovery is an input to review. That's all it is.
Because here's what a curated list does not tell you. It doesn't establish source
credibility. It doesn't tell you the license posture. Or the permissions it wants.
Or how it handles data. Or whether anyone still maintains it. Or whether it fits
your enterprise at all.
Popularity is not a security control. A thousand stars means a thousand people
liked it, not that anyone read it.
So move the candidate through your gates, and write down who approved it before it
goes anywhere near a governed environment.
What's the first fact you'd check?

Transition: That same "approve narrowly" instinct applies when you delegate a slice
of work to a subagent.

Audience question: What is the first fact you would verify before reusing a skill or example from a curated list?

Response guidance: Accept provenance, license, permissions, data scope,
maintenance, or enterprise policy. Make the point that which one comes first can
vary by team — but none of the required gates disappear.
Payoff: Learners separate useful discovery from authorization and begin building a repeatable review record.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 5 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage">
<div>

<div class="advanced-kicker">Delegate the smallest auditable unit</div>

# Subagents

<div class="advanced-chips">
  <span class="advanced-chip advanced-chip--purple">Narrow prompt</span>
  <span class="advanced-chip">Minimal context</span>
  <span class="advanced-chip">Minimal permissions</span>
  <span class="advanced-chip advanced-chip--green">Acceptance criteria</span>
</div>

<div class="advanced-callout">
Inspection evidence depends on the hosting surface; require what that surface can actually show.
</div>

</div>
<div class="advanced-native-board">
  <div class="advanced-owner-node">Delegating owner</div>
  <div><span>Research · tests · docs · validation</span><em>No duplication of the parent task</em></div>
  <div><span>Required output contract</span><em>Scope · artifacts · result · uncertainty · conflicts</em></div>
  <div class="advanced-merge-node">Attributable return → owner checks acceptance</div>
</div>
</div>

<!--
Timebox: 3 minutes

Talk track: Here's the phrase to hold onto. Smallest auditable unit of work.
A subagent gets a narrow prompt. Minimal context and permissions. An explicit output
shape. Acceptance criteria. And a return path back to whoever delegated it.
Good slices? Research. Tests. A documentation review. Validation you can check
independently. What makes them good is that they don't duplicate the parent task.
And whatever comes back has to be attributable. Scope, artifacts, result,
uncertainty, and conflicts — name all five.
One boundary on inspection. Use only the in-progress evidence the hosting surface
actually gives you. Don't describe visibility you don't have.
So look at something on your plate right now. What part of it could be delegated as
a slice somebody could check on its own?

Transition: When several slices are genuinely independent, the CLI gives us a named
command for running them in parallel.

Audience question: What part of a current task could be delegated as an independently checkable subagent slice?

Response guidance: Favor a slice with its own acceptance test and its own return
object. Challenge anything that overlaps the parent task or that couldn't be
reviewed on its own — those are the ones that create work instead of removing it.
Payoff: The audience applies the smallest-auditable-unit test before learning a parallel execution mechanism.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 6 contract; content/modules/03-advanced/product-update-brief.md “VS Code agent workflows”
-->

---
layout: advanced-content
---

<div class="advanced-stage advanced-stage--wide">
<div>

<div class="advanced-kicker">Copilot CLI · interactive slash commands</div>

# Parallel Subagents with Copilot CLI /fleet

<div class="advanced-callout advanced-callout--optimization">
<strong>AIC/time optimization:</strong> use parallel execution only when savings exceed task, review, and reconciliation cost.
</div>

<div class="advanced-callout advanced-callout--safety">
Not VS Code Chat, inline completion, Copilot App, or an IDE-wide feature.
</div>

</div>
<div class="advanced-native-board">
  <div class="advanced-owner-node">COPILOT CLI</div>
  <div><span><code>/fleet</code></span><em>Start independent parallel subagent tasks</em></div>
  <div><span><code>/tasks</code></span><em>Inspect task state and returned evidence in Copilot CLI</em></div>
  <div><span>Each return</span><em>Scope · changed artifacts · validation · uncertainty · conflicts</em></div>
  <div class="advanced-merge-node">Human merge owner · review · reconcile · accept</div>
</div>
</div>

<!--
Timebox: 4 minutes

Talk track: `/fleet` is an interactive slash command documented for GitHub Copilot
CLI. `/tasks` is how you inspect what it's running.
Let me be precise about where it lives, because this gets misremembered constantly.
It is not a VS Code Chat command. Not an inline-completion feature. Not a Copilot
App command. Not an IDE-wide capability. And connecting the CLI to your IDE does not
move ownership of the command — it's still the CLI's.
Now, when should you reach for it?
Only when the work is independent enough that the time or credit you save actually
exceeds what it costs you to execute, review, and reconcile. Parallel work is not
free. You pay at the end, in reconciliation, and that bill can be larger than the
one you avoided.
Every return needs scope, changed artifacts, validation, uncertainty, and conflicts.
Flip it around. When would `/fleet` make something slower or riskier?

Transition: Parallel execution needs isolated working state — which brings us to
worktrees.

Audience question: When would `/fleet` make a task slower or riskier instead of faster?

Response guidance: Draw out dependencies, overlapping files, shared schemas,
unclear ownership, high reconciliation cost, and work that can't be validated
independently. Keep the group evaluating total cost, not wall-clock speed.
Payoff: Learners evaluate parallelism by total coordination and evidence cost rather than wall-clock speed alone.
Sources: content/modules/03-advanced/product-update-brief.md “Copilot CLI /fleet”; content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 7 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage advanced-stage--wide">
<div>

<div class="advanced-kicker">Isolation is the start of proof</div>

# Worktrees for Parallel Agent Sessions

<div class="advanced-hero-quote">Separate directories do not guarantee compatible changes.</div>

<div class="advanced-callout advanced-callout--safety">
One human merge owner decides the order and accepts the combined result.
</div>

</div>
<div class="advanced-worktree-map">
  <div class="advanced-repo-root">Repository</div>
  <div><strong>Worktree A · branch A</strong><span>Isolated context · independent validation</span></div>
  <div><strong>Worktree B · branch B</strong><span>Isolated context · independent validation</span></div>
  <div><strong>Overlap + dependency check</strong><span>Files · APIs · schemas · tests · behavior</span></div>
  <div class="advanced-merge-node"><strong>Compatibility proof</strong><span>Ordered integration · combined validation</span></div>
</div>
</div>

<!--
Timebox: 4 minutes

Talk track: One worktree and one branch per independent session. Files, context, and
diffs stay separate, so nothing collides in a shared working directory.
That's real value, and it's cheap to set up.
Now here's where I've seen teams get comfortable too early.
Isolation proves the sessions didn't interfere with each other. That's all it
proves. It does not prove the tasks were independent. It does not prove the changes
are compatible. It does not prove any of the behavior is correct. And it certainly
doesn't prove the branches are safe to merge.
Separate directories, separate problems — until you combine them, and then they're
one problem.
So do the work. Inspect dependency direction and overlap. Validate each branch on
its own. Integrate in a deliberate order. Run combined validation. One human owns
the merge.
Two branches, both green. What do you still have to prove?

Transition: Isolation protects your working state. Deterministic hooks protect
repeatable lifecycle boundaries.

Audience question: What must you prove before two individually green worktree branches are combined?

Response guidance: Require dependency and overlap analysis, independent validation,
a chosen integration order, combined acceptance tests, and a rollback point. If the
room stops at "they both passed," that's the misconception to name.
Payoff: Learners stop equating isolated directories with an integrated, correct result.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 8 contract; content/modules/03-advanced/product-update-brief.md “VS Code agent workflows”
-->

---
layout: advanced-content
---

<div class="advanced-stage advanced-stage--wide">
<div>

<div class="advanced-kicker">Deterministic lifecycle guardrails</div>

# Hooks

<div class="advanced-chips">
  <span class="advanced-chip">.github/hooks/*.json</span>
  <span class="advanced-chip">VS Code workspace hooks are separate</span>
</div>

<div class="advanced-callout advanced-callout--safety">
Require provenance, least privilege, observable failure behavior, validation, and rollback evidence.
</div>

</div>
<div class="advanced-gate-path advanced-gate-path--vertical">
  <div>Supported surface</div><span>↓</span>
  <div>Policy + secret checks</div><span>↓</span>
  <div>Validation evidence</div><span>↓</span>
  <div>Stop on failure</div><span>↓</span>
  <div class="advanced-gate-path__approved">Accept or roll back</div>
</div>
</div>

<!--
Timebox: 3 minutes

Talk track: Some guardrails should never depend on how well someone worded a
prompt.
That's what hooks are for. Deterministic lifecycle checks and stop gates. They run
because they run.
On configuration: repository `.github/hooks/*.json` guidance is scoped to supported
cloud-agent and Copilot CLI use. VS Code workspace hooks are a separate thing.
Don't blend them.
And then review the hook itself, before you trust it — provenance, least privilege,
observable output, what it does on failure, validation, and rollback.
Why that matters: a deterministic action can be deterministically wrong. It'll do
the wrong thing perfectly, every single time, without ever asking. And if it's
overprivileged, it'll do it everywhere.
So in your workflow — what should be deterministic instead of left to a prompt?

Transition: Hooks change lifecycle behavior. Marketplace extensions can change a far
broader permission and data boundary.

Audience question: Which guardrail in your workflow should be deterministic rather than left to a prompt?

Response guidance: Invite examples — a validation command, a policy check, a secret
scan, a stop-on-failure gate. For each one, ask how failure stays observable and
how it gets reversed.
Payoff: Learners identify where deterministic controls add value while retaining a governance review for the control itself.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 9 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage">
<div>

<div class="advanced-kicker">A new extension changes the boundary</div>

# Extension Marketplace

<div class="advanced-hero-quote">Availability is not authorization.</div>

<div class="advanced-callout advanced-callout--safety">
Enabling an extension can change permissions, telemetry, execution, and data access.
</div>

</div>
<div class="advanced-check-board">
  <div><b>01</b><span>Publisher · version · trust signals</span></div>
  <div><b>02</b><span>Permissions · telemetry · data handling</span></div>
  <div><b>03</b><span>Support posture · enterprise policy</span></div>
  <div><b>04</b><span>Disable / uninstall path</span></div>
</div>
</div>

<!--
Timebox: 3 minutes

Talk track: Enabling a marketplace extension can change your permissions, your
telemetry, what executes, and what data is reachable.
So say this one with me: availability is not authorization. The fact that you can
install it says nothing about whether you should.
Before you enable — publisher, version, trust signals, requested permissions,
telemetry and data handling, support posture, and enterprise policy fit.
And one more, which almost nobody does in advance. Write down the disable and
uninstall path before you turn it on. Not after.
Because the moment you need to reverse this decision is the worst possible moment
to start figuring out how.
So during that review — what single piece of evidence would stop you cold?

Transition: MCP makes the integration boundary explicit, through servers and
distinct capability types.

Audience question: Before enabling an extension, which piece of evidence would make you pause the review immediately?

Response guidance: Accept an unknown publisher, unexplained permissions, unclear
telemetry or data scope, absent support, or no disable path. Then ask the useful
follow-up: what evidence would actually resolve the pause?
Payoff: The audience rehearses a stop decision before a convenient installation widens the trust boundary.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 10 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage">
<div>

<div class="advanced-kicker">Govern the server boundary</div>

# MCP (Model Context Protocol)

<div class="advanced-callout advanced-callout--safety">
Server onboarding is a security review event, not a convenience toggle.
</div>

<div class="advanced-chips">
  <span class="advanced-chip">Provenance</span>
  <span class="advanced-chip">Authentication</span>
  <span class="advanced-chip">Authorization</span>
  <span class="advanced-chip">Data scope</span>
  <span class="advanced-chip">Rollback</span>
</div>

</div>
<div class="advanced-hub">
  <div class="advanced-hub__client">Consuming product</div>
  <div class="advanced-hub__gate">Policy · auth · allowlist · logging</div>
  <div class="advanced-hub__server">
    <span>Tools<br><small>actions</small></span>
    <span>Resources<br><small>context</small></span>
    <span>Prompts<br><small>templates</small></span>
    <span>Server boundary<br><small>scope + secrets</small></span>
  </div>
</div>
</div>

<!--
Timebox: 4 minutes

Talk track: MCP puts three distinct capabilities behind one explicit server
boundary.
Tools perform actions. Resources supply context. Prompts supply templates.
Three different things — and a consuming product may support only some of them. So
don't treat them as interchangeable, and don't assume that supporting one means
supporting all three.
Then, for every server you consider, work the list. What can it read, and what can
it change? Authentication. Authorization. Provenance. Secrets. Logging.
Allowlisting. Who owns enablement. Data scope. Rollback.
That's a long list, and it's long on purpose.
Onboarding a server is a security review event. It is not a convenience toggle,
even though it looks exactly like one.
So a server offers you a tool that can change data. Which boundary do you check
first?

Transition: Work IQ gives us one concrete, governed example of workplace context
through a documented MCP path.

Audience question: If an MCP server offers a tool that can change data, which boundary would you verify first?

Response guidance: Accept authorization, write scope, identity, allowlisting,
secrets, logging, or rollback. Then connect whichever they chose back to the full
server review — first is not the same as only.
Payoff: Learners distinguish capability types and make server trust an explicit, evidence-backed decision.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 11 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage">
<div>

<div class="advanced-kicker">One governed workplace-context example</div>

# Work IQ via MCP: Governed Microsoft 365 Context

<div class="advanced-chips">
  <span class="advanced-chip">Permission-aware workplace intelligence</span>
  <span class="advanced-chip advanced-chip--purple">Documented GitHub Copilot CLI path</span>
</div>

<div class="advanced-callout advanced-callout--safety">
<strong>Permission to retrieve is not permission to present.</strong>
</div>

</div>
<div>
  <div class="advanced-flow">
    <div>Permitted Microsoft 365 context</div><span>→</span>
    <div>Work IQ</div><span>→</span>
    <div>MCP</div><span>→</span>
    <div>GitHub Copilot CLI</div>
  </div>
  <div class="advanced-hero-quote">identity · permissions · tenant policy</div>
</div>
</div>

<!--
Timebox: 3 minutes

Talk track: Work IQ is Microsoft's permission-aware workplace-intelligence layer.
Let me clear the decks first, because this name gets attached to everything. It is
not Microsoft 365 Copilot. Not Microsoft Graph. Not a connector. Not an agent. And
not MCP itself.
The path we teach here is specific: permitted Microsoft 365 context, through Work
IQ and remote MCP, into GitHub Copilot CLI. We make no equivalent claim for any
other Copilot surface.
Now the part that should reassure your security team.
Requests use the signed-in user's delegated Entra identity. Everything stays
permission-trimmed by existing Microsoft 365 access, sensitivity, compliance,
tenant policy, and tenant boundaries. Application-only authentication is not
supported — so this can't quietly become a service account reading everything.
The APIs became generally available on June 16th, 2026. Access can require tenant
enablement and usage-based Copilot Credits.
And for this workshop: fictional and synthetic examples only. No tenant data, no
screenshots, no identifiers, no tokens, no admin settings, no writes.
Which raises the real question. You're permitted to retrieve something. Does that
mean you can show it to this room?

Transition: After a governed context example, let's compare it with narrower
deterministic interfaces.

Audience question: Even when a user may retrieve workplace context, what must be checked before any of it is presented to another audience?

Response guidance: Look for audience need, sensitivity labels, permissions, tenant
policy, confidentiality, and minimum necessary disclosure. Land the sentence
plainly: retrieval permission is not presentation permission.
Payoff: The question makes the key safety boundary actionable without exposing live workplace data.
Sources: content/modules/03-advanced/product-update-brief.md “Work IQ via MCP”; content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 12 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage advanced-stage--wide">
<div>

<div class="advanced-kicker">Narrow · observable · deterministic</div>

# API/CLI

<div class="advanced-hero-quote">Prefer the smallest interface that satisfies the acceptance test.</div>

<div class="advanced-callout advanced-callout--optimization">
Narrow interfaces reduce permission review, tool descriptions, debugging effort, and coordination overhead.
</div>

</div>
<div class="advanced-steps">
  <div class="advanced-step"><div class="advanced-step__icon">&gt;_</div><div><strong>Approved operation</strong><span>Known command or endpoint</span></div></div>
  <div class="advanced-step"><div class="advanced-step__icon">{ }</div><div><strong>Stable output</strong><span>Inspectable result shape</span></div></div>
  <div class="advanced-step"><div class="advanced-step__icon">◎</div><div><strong>Audit evidence</strong><span>Logs and explicit failure handling</span></div></div>
  <div class="advanced-step"><div class="advanced-step__icon">↶</div><div><strong>Safe retry / rollback</strong><span>Least privilege and environment separation</span></div></div>
</div>
</div>

<!--
Timebox: 3 minutes

Talk track: Sometimes the most advanced choice available is the boring one.
If a task is deterministic, and an approved API or CLI gives you the narrowest
observable path to it — take the narrow path.
A known operation with stable output makes four things easier. Permission review.
Audit evidence. Failure handling. And debugging, when it eventually goes wrong.
It still needs least-privilege credentials, separated environments, and a rollback
or safe-retry path. Narrow is not the same as unguarded.
And one qualifier, because "smallest" can be taken too far. Narrower is better only
while the interface still meets your acceptance criteria. A tiny interface that
can't do the job isn't elegant. It's just wrong.
So what would push you toward a narrow API instead of a broader plugin or an
autonomous action?

Transition: A plugin moves in exactly the opposite direction — bundling several
surfaces together.

Audience question: What would make you choose a narrow API or CLI instead of a broader plugin or autonomous action?

Response guidance: Favor deterministic scope, stable output, clear credentials,
auditability, and safe failure handling. Always close by asking whether the narrow
path still delivers the outcome.
Payoff: Learners apply “smallest interface that works” as a governance and debugging decision, not an aesthetic preference.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 13 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage">
<div>

<div class="advanced-kicker">Govern the bundle as supply chain</div>

# Plugins

<div class="advanced-hero-quote">One install can expand several trust boundaries.</div>

<div class="advanced-callout advanced-callout--safety">
Separate discovery and installation from organization authorization.
</div>

</div>
<div class="advanced-package-path">
  <div class="advanced-package">Plugin<br><small>versioned bundle</small></div><span>→</span>
  <div>Commands · skills · agents</div><span>+</span>
  <div>Hooks · MCP definitions</div><span>→</span>
  <div>Provenance + data scope</div><span>→</span>
  <div class="advanced-flow-stack__human">Rollout + rollback</div>
</div>
</div>

<!--
Timebox: 2 minutes

Talk track: A plugin can bundle slash commands, skills, custom agents, hooks, and
MCP server definitions.
Read that list again and count the trust boundaries. One install, several of them
moved at once — and possibly none of them individually reviewed.
So the review is correspondingly long. Provenance. Package metadata. What
customizations are included. Executable hooks. Servers that start automatically.
Versioning. Availability labels. Telemetry. Data scope. Who owns the rollout. And
rollback.
And keep two things separate in your head: discovery and installation are one
thing, organization authorization is another. Being able to install it is not being
allowed to.
Before you enable one for a whole team — what rollback evidence do you need?

Transition: Next slide shows why one shared skill or MCP configuration must be
governed differently for two different consumers.

Audience question: What rollback evidence would you require before enabling a plugin for a team?

Response guidance: Look for a tested disable or uninstall path, a version pin or
restore point, configuration cleanup, a named owner, and evidence that dependent
services stop safely. "We'd just uninstall it" is not tested evidence.
Payoff: Learners treat rollback as part of plugin approval rather than an improvised response after rollout.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 14 contract
-->

---
layout: advanced-content
---

<div class="advanced-kicker">Two consumers · one governed repository boundary</div>

# Govern Shared Skills and MCP Across Code Review and Cloud Agent

<div class="advanced-route-grid advanced-route-grid--two">
  <div>
    <h2>Copilot code review</h2>
    <p>Comments on changes; does not approve a pull request</p>
    <small>Attributed skill or MCP tool · MCP calls read-only · tools, not broader resources/prompts</small>
  </div>
  <div>
    <h2>Copilot cloud agent</h2>
    <p>Separate workflow that can act on a branch</p>
    <small>Shared repository MCP config · autonomous configured tools · separately enabled and governed</small>
  </div>
</div>

<div class="advanced-flow-stack">
  <div>Repository skills</div><span>+</span>
  <div>Shared MCP configuration</div><span>→</span>
  <div>Policy · allowlist · least privilege · secrets · provenance · data scope</div><span>→</span>
  <div class="advanced-flow-stack__human">Human verifies evidence and accepts / rejects / merges</div>
</div>

<div class="advanced-callout advanced-callout--safety">
GitHub and Playwright MCP servers may be enabled by default unless policy changes their use; default availability is not authorization.
</div>

<!--
Timebox: 5 minutes

Talk track: Copilot code review and Copilot cloud agent might share your repository
skills and your MCP configuration. They are still two different consumers, and this
is where trust gets transferred by accident.
Look at how differently they behave.
Code review leaves comments. It does not approve the pull request. And it uses
read-only MCP calls.
Cloud agent is a separate branch-working workflow whose configured tools can act
autonomously — without stopping to ask you.
Same configuration. Very different consequences.
A few specifics to hold. Preserve contribution attribution. Keep tools distinct from
broader resources and prompts for these consumers. And know that GitHub and
Playwright MCP servers may be enabled by default unless your policy says otherwise —
so check rather than assume.
Each consumer needs its own enablement, allowlist, least privilege, secrets
controls, provenance, data-scope review, and policy fit. Its own. Every time.
And one human keeps accept, reject, and merge.
So: a tool is approved for read-only code review. Is that enough for cloud-agent
use of the same configuration?

Transition: Governance says what may run. Debugging evidence tells us where
delegated work first went off course.

Audience question: If one MCP tool is approved for read-only code review, is that approval enough for cloud-agent use of the same repository configuration?

Response guidance: Guide the room to "no." Then make them articulate why —
read-only review calls versus autonomous branch-working tools — and name the
separate policy, permission, secrets, and data-scope review that's required.
Payoff: Learners avoid transferring trust between consumers whose capabilities and consequences differ.
Sources: content/modules/03-advanced/product-update-brief.md “code review skills and MCP”; content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 15 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage advanced-stage--wide">
<div>

<div class="advanced-kicker">VS Code-specific evidence surface</div>

# VS Code Agents Window as Debugging Evidence

<div class="advanced-hero-quote">Trace delegated intent to the resulting diff.</div>

<div class="advanced-callout">
<strong>VS Code public preview:</strong> progressive rollout applies; confirm availability before a live demonstration.
</div>

</div>
<div class="advanced-evidence-map">
  <div>VS Code conversation</div><span>prompt · decisions</span>
  <div>Running subagent</div><span>model · elapsed time</span>
  <div>Active tool call</div><span>action · boundary</span>
  <div>VS Code diff</div><span>changed files · result</span>
  <div class="advanced-evidence-map__result">First VS Code evidence divergence</div>
</div>
</div>

<!--
Timebox: 3 minutes

Talk track: In VS Code, the Agents window ties together things you'd otherwise have
to reconstruct — the conversation, the resulting diff, the subagent's model, elapsed
time, the active tool call, and the subagent's own conversation.
Use it for one specific job. Find the first point where delegated intent and the
actual repository change parted company.
Not the final summary. The summary tells you where things ended up, which is almost
never where they went wrong. By then you're reading the consequence, not the cause.
Practical caveat: this is VS Code-specific, it's in public preview, and it's on
progressive rollout. Confirm it's actually there before you demo it live.
So which artifact would you open first to find that earliest divergence?

Transition: The evidence surface changes by product. The method can stay the same.

Audience question: Which artifact would you inspect first to find the earliest divergence between the request and the diff?

Response guidance: Accept the conversation, active tool call, subagent trace, or
diff — as long as the speaker explains what hypothesis it tests. Don't let anyone
claim an equivalent window exists on other surfaces.
Payoff: Learners begin debugging at the first observable divergence instead of reacting only to the final failure.
Sources: content/modules/03-advanced/product-update-brief.md “VS Code agent workflows”; content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 16 contract
-->

---
layout: advanced-content
---

<div class="advanced-kicker">Portable method · surface-native evidence</div>

# Debugging Copilot Across Surfaces

<div class="advanced-flow">
  <div><strong>Acceptance test</strong><br>expected evidence</div><span>→</span>
  <div><strong>Smallest repro</strong><br>one hypothesis</div><span>→</span>
  <div><strong>Compare</strong><br>expected / actual</div><span>→</span>
  <div><strong>Stop</strong><br>criterion fails</div><span>→</span>
  <div><strong>Recover</strong><br>checkpoint / rollback</div>
</div>

<div class="advanced-check-board">
  <div><b>VS</b><span>VS Code: Agents window conversation, tool activity, diff</span></div>
  <div><b>CLI</b><span>Copilot CLI: <code>/tasks</code>, <code>/diff</code>, <code>/session</code></span></div>
  <div><b>APP</b><span>Copilot App: session, worktree, branch, pull request, CI history</span></div>
  <div><b>WEB</b><span>GitHub.com cloud agent: logs, tools, progress, usage, commits, diffs</span></div>
  <div><b>JB</b><span>JetBrains: agent debug logs</span></div>
</div>

<div class="advanced-callout advanced-callout--optimization">
Preserve a known-good checkpoint, change one variable, and rerun only the failed proof.
</div>

<!--
Timebox: 5 minutes

Talk track: Debugging agentic work is the same discipline as debugging anything
else. People abandon it because the system feels mysterious. Don't.
Start with two things written down. An explicit acceptance test, and one failure
hypothesis. One.
Then define the smallest safe reproduction, and say what evidence you expect to see
before you rerun anything. Predicting the result is what makes the run informative.
Preserve a known-good checkpoint. Compare expected against actual, using evidence
native to that surface. And change one variable at a time.
Now the hard part, the part that takes discipline.
If the criterion fails — stop. Do not reflexively add context. Do not add tools.
That instinct feels like progress and it destroys your ability to know what
happened. Recover or roll back, then rerun only the failed proof.
VS Code, CLI, the App, the cloud agent, JetBrains — they all expose different
evidence. Hypothesis, compare, stop, recover stays constant.
Think of a failed run you've had. What one variable would you change first?

Transition: That same discipline is what's required when several independent
changes have to become one result.

Audience question: In a failed agent run you know, what single variable would you change first to test one hypothesis?

Response guidance: Make the speaker name the expected evidence and the stop
criterion, not just the change. If they offer several variables at once, redirect
them to a smaller reproduction — that's the whole lesson.
Payoff: Learners leave with a falsifiable debugging move instead of another full rerun with more context.
Sources: content/modules/03-advanced/product-update-brief.md “cross-surface evidence boundary”; content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 17 contract
-->

---
layout: advanced-concept
class: advanced-concept--integration-yard
---

<div class="advanced-kicker">Parallel output is not an integrated result</div>

# Integrating Parallel Agent Work

::visual::

<div class="advanced-semantic-plate advanced-semantic-plate--integration">
  <img class="advanced-plate-image" src="/images/parallel-integration-yard-anchor.png" alt="Parallel branches pass through dependency ordering, conflict resolution, rollback, combined validation, and a human acceptance gate" />
  <span class="advanced-semantic-label advanced-integration-label--parallel">Parallel branches</span>
  <span class="advanced-semantic-label advanced-integration-label--dependency">Dependency order</span>
  <span class="advanced-semantic-label advanced-integration-label--checks">Independent checks</span>
  <span class="advanced-semantic-label advanced-semantic-label--warning advanced-integration-label--conflict">Overlap + conflict</span>
  <span class="advanced-semantic-label advanced-integration-label--sequence">Sequence dependencies</span>
  <span class="advanced-semantic-label advanced-semantic-label--safety advanced-integration-label--rollback">Rollback checkpoint</span>
  <span class="advanced-semantic-label advanced-integration-label--combined">Combined validation</span>
  <span class="advanced-semantic-label advanced-semantic-label--human advanced-integration-label--acceptance">Final human acceptance</span>
</div>

<!--
Timebox: 5 minutes

Talk track: Parallel output is not an integrated result. Three finished branches is
three finished branches — it is not a working system, and the gap between those two
is where the day disappears.
So do this in order.
Record the dependency order. Validate each branch on its own. Then look for overlap
before you combine anything — across files, APIs, schemas, tests, and behavior.
Choose an integration sequence deliberately. Run targeted checks after each step,
not once at the end, so you know which step broke it. Keep a rollback checkpoint.
Then run combined validation for cross-branch behavior — and say out loud whatever
uncertainty is left.
One human reviews all of that before acceptance or merge.
So think it through. Two branches pass independently. What could still blow up when
you put them together?

Transition: With integration provable, Day 2 readiness packages the owner, the
success criteria, the stop signal, and the fallback.

Audience question: If two branches pass independently, what combined failure could still appear after integration?

Response guidance: Invite API or schema incompatibility, conflicting behavior,
shared-file assumptions, order dependence, or cross-branch test failure. For each
one, push further: which combined check would actually have caught it?
Payoff: Learners understand why green branch-level evidence cannot substitute for ordered integration proof.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 18 contract
-->

---
layout: advanced-content
---

<div class="advanced-stage">
<div>

<div class="advanced-kicker">Bound the operating brief before pressure rises</div>

# Preparing for Day 2 Hack

<div class="advanced-hero-quote">A fallback is part of readiness.</div>

<div class="advanced-callout advanced-callout--optimization">
Package the decision; reuse the debugging and integration methods instead of repeating them here.
</div>

</div>
<div class="advanced-readiness-route">
  <div>Owner + narrow objective</div><span>→</span>
  <div>Success criteria + evidence</div><span>→</span>
  <div>Earliest stop signal</div><span>→</span>
  <div>Fallback result</div><span>→</span>
  <div class="advanced-readiness-route__gate">Human demo / acceptance gate</div>
</div>
</div>

<!--
Timebox: 4 minutes

Talk track: Day 2 readiness is an operating brief. It is not a longer wish list, and
tomorrow will punish the difference.
Name the narrow objective and who owns it. The orchestration pattern and model
strategy. The constraints. And what evidence counts as success — decided now, while
you're calm.
Then two things most teams skip, and they're the two that matter under pressure.
Your earliest stop signal. And a fallback that still leaves you with something you
can demonstrate.
Write both down today. Because under deadline pressure, scope widens quietly and
the rollback path disappears, and nobody ever announces either one. It just
happens while everyone's busy.
And reuse the debugging and integration methods we've already built. Tomorrow is
not the day to invent a new process.
So for a project you know that's under pressure — what's the earliest stop signal,
and what's the smallest useful fallback?

Transition: The Advanced mission now asks you to apply all of this to the same
carried-forward case.

Audience question: What is the earliest stop signal and smallest useful fallback for a pressured project you know?

Response guidance: Require a signal observable before total failure, and a fallback
that still demonstrates value. Reject "work harder" and reject unbounded scope
reduction — neither is a plan.
Payoff: Learners make fallback and stopping evidence part of readiness before execution pressure begins.
Sources: content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 19 contract
-->

---
layout: advanced-content
---

<div class="advanced-mission-stage">
<div>

<div class="advanced-kicker">Case File Ω-3 · 30-minute mission</div>

# Your Advanced Mission Starts Now

<p class="advanced-lede">Carry the Agentic case forward and prove four Advanced obligations.</p>

<div class="advanced-chips">
  <span class="advanced-chip">Accountable orchestration</span>
  <span class="advanced-chip">Governed integration</span>
  <span class="advanced-chip">Evaluate + recover</span>
  <span class="advanced-chip advanced-chip--green">Final integration proof</span>
</div>

<div class="advanced-callout advanced-callout--safety">
<strong>Purrmission safety check:</strong> preserve provenance, permissions, data scope, read-only boundaries, rollback, and separate module totals.
</div>

</div>
<div class="advanced-role-stage advanced-role-stage--mission" aria-label="Pending owner art review; native mission scaffolding shows human ownership, delegated evidence, and safety">
  <div class="advanced-role-card advanced-role-card--mergewell"><span class="advanced-silhouette advanced-silhouette--human">M</span><strong>Mergewell</strong><small>owns orchestration and acceptance</small></div>
  <div class="advanced-role-card advanced-role-card--riley"><span class="advanced-silhouette advanced-silhouette--agent">R</span><strong>Riley</strong><small>returns bounded evidence</small></div>
  <div class="advanced-role-card advanced-role-card--purrmission"><span class="advanced-silhouette advanced-silhouette--guardian">P</span><strong>Purrmission</strong><small>gates safety and rollback</small></div>
  <div class="advanced-case-envelope">Agentic case → governed decisions → integrated evidence → final export</div>
</div>
</div>

<!--
Timebox: 2 minutes

Talk track: This is it. Last mission of the day — and it's a continuation, not a
fresh start.
Open the Agentic case file you exported. If you're joining us cold, take the
clearly labeled facilitator fallback. What you must not do is invent evidence or
points you never earned.
Thirty minutes. Four things to prove.
Choose an orchestration pattern you can actually stand behind. Vet the narrowest
integration surface that still does the job. Govern any review helper you bring
in. And then break something on purpose — debug one likely failure with a minimal
protocol and a recovery checkpoint.
Then the part that matters most. Pull all of that evidence into one human decision.
Accept, revise, or reject. You make the call. Not Riley.
Your export keeps provenance, permissions, data scope, read-only boundaries,
rollback, and your module totals kept separate — Foundations, Agentic, Advanced,
and cumulative.
One thing before you go. Look at your case: which obligation is already strong, and
which one is still thin?

Transition: Open the mission route, confirm your carry-forward entry, and start
your thirty-minute clock now.

Audience question: Which Advanced obligation already has the strongest evidence in your case, and which one still needs proof?

Response guidance: Take one fast pair of answers, then send participants to start
with their weakest obligation, or to the approved fallback path. Remind them that
starting somewhere new does not mean discarding evidence they already have.

Payoff: Participants enter the final mission with a diagnostic priority and finish with an integrated, human-owned case decision.
Sources: content/missions/advanced/cross-cutting-change.md; content/modules/03-advanced/copilot-dev-advanced-workshop.md slide 19 contract
-->
