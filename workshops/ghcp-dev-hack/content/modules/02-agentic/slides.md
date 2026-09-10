---
theme: ghcp
title: "Module 2: Agentic Development — Workshop Guide"
layout: two-panel
transition: slide-left
mdc: true
class: agentic-slide agentic-priority-slide
---

::title::
# Module 2: Agentic Development — Workshop Guide
::text::

<div class="agentic-kicker">GitHub Copilot · Agentic development</div>

## Direct bounded software work. Inspect the evidence. Keep the decision human.

**2 hours 6 minutes · 81 min instruction + 45 min mission**

<div class="workshop-cover-logos" aria-label="GitHub and Microsoft">
  <img class="workshop-cover-logos__github" src="/images/GitHub_Lockup_Black_Clearspace.svg" alt="GitHub" />
  <img class="workshop-cover-logos__microsoft" src="/images/microsoft-logo.png" alt="Microsoft" />
</div>

::visual::
<div class="agentic-static-stage" role="group" aria-label="Mergewell reviews a consequential request with Riley stopped beyond the boundary and Purrmission marking the stop line">
  <img src="/images/approval-boundary-human-decision.png" alt="Agent Mergewell reviews a consequential request while Riley Relay waits beyond the boundary and Purrmission marks the stop line">
</div>

<!--
Timebox: 1 minute

Talk track: Welcome to Agentic Development.
We're carrying the Foundations case forward into longer repository work. Bigger
tasks, more steps, more autonomy.
What does not change is who's in charge.
Mergewell owns the brief and owns the decision. Riley does the bounded work he was
given and comes back with evidence. Purrmission marks the moment scope or
permission turns consequential.
That split holds no matter how much work we hand over.
So before we go anywhere — name one artifact the collaborator has to inherit from
Foundations. Task, boundary, check, or evidence.

Transition: Let's map the route from that brief to a human decision backed by
evidence.

Audience question: Which one Foundations artifact must the software collaborator inherit before work starts?

Response guidance: Take one concise artifact and tie it to the carried-forward case
without opening an implementation discussion. If nobody answers, use the bounded
task as your example and keep moving.

Payoff: The module opens with continuity from Foundations and one concrete input to human-directed work.

Sources: content/modules/02-agentic/module.md; content/modules/02-agentic/visual-intent.md slides 1 and 3; content/research/agentic-content-verification.md AGT-12 and AGT-28
-->

---
layout: two-panel
class: agentic-agenda-slide
---

::title::
# Session Agenda
::text::

<div class="agentic-stack" role="list" aria-label="Eighty-one-minute instruction route">
  <div class="agentic-card" role="listitem"><b>1 · Who does what? — 3 min</b><span>Human accountability and bounded software work</span></div>
  <div class="agentic-card" role="listitem"><b>2 · Prepare a job worth delegating — 16 min</b><span>Instructions, activation, memory, context, and prompts</span></div>
  <div class="agentic-card" role="listitem"><b>3 · Choose and trust the helper — 12 min</b><span>Skills, custom agents, tools, and the next request</span></div>
  <div class="agentic-card" role="listitem"><b>4 · Stay in charge of the result — 50 min</b><span>Observable loops, repository and cloud evidence, optimization, and the human call</span></div>
</div>

::visual::
<div class="agentic-surface agentic-stack" role="region" aria-label="Separate forty-five-minute mission">
  <div class="agentic-kicker">Mission · 45 min</div>
  <div class="agentic-card agentic-green">
    <b>Hand off work with confidence</b>
    <span>Carry the Foundations case forward and return inspected evidence.</span>
  </div>
  <div class="agentic-callout agentic-safety"><b>Keep the mission time protected.</b><br>Detailed actions stay in the Missions experience.</div>
</div>

<!--
Timebox: 1 minute

Talk track: Which part of this route deserves your closest attention?
Choose one as we read the four sections.
You have eighty-one minutes of instruction. Three minutes introduce who does
what, including these opening slides. Sixteen minutes prepare the job:
instructions, activation, memory, context and the task brief.
Twelve minutes separate skills, custom agents, tools and the next request.
Fifty minutes cover the loop, human control points, repository and cloud
evidence, and the final decision.
These are groups in slide order, not extra sections to add later.
The mission has its own forty-five minutes. It extends the Foundations case.
Its detailed actions stay in the Missions experience.

Transition: We start by making the split between human and software work explicit.

Audience question: Which route checkpoint deserves your closest attention today?

Response guidance: Allow a brief private choice. Say, "Keep that choice in mind
as we inspect the evidence. You do not need to report it now."

Payoff: Learners enter the route with a personal diagnostic focus while the protected mission timing remains clear.

Sources: content/modules/02-agentic/module.md timing; content/modules/02-agentic/copilot-dev-agentic-workshop.md “Current instruction architecture”; content/modules/02-agentic/slide-manifest.md row 2
-->

---
layout: two-panel
---

::title::
# Agentic Development
::text::

## Delegate the work—not the decision

The human defines the brief, boundaries, and acceptance. A software
collaborator plans, edits, uses allowed tools, and returns evidence.

<div class="agentic-callout"><b>Agent Mergewell is the human field agent.</b><br>He retains acceptance and merge authority.</div>

::visual::
<div class="agentic-static-stage" role="group" aria-label="A human briefs bounded work, Riley performs it, evidence returns, and the human accepts or rejects">
  <img src="/images/human-directed-operating-split.png" alt="Mergewell briefs Riley, who returns evidence to Mergewell for a human decision">
  <div class="agentic-static-overlay agentic-static-overlay--top">
    <div class="agentic-static-chip agentic-static-chip--green">Human brief</div>
    <div class="agentic-static-chip agentic-static-chip--purple">Delegated software work</div>
    <div class="agentic-static-chip">Returned evidence</div>
    <div class="agentic-static-chip agentic-static-chip--green">Human acceptance</div>
  </div>
</div>

<!--
Timebox: 1 minute

Talk track: One sentence for this whole module.
Agentic work delegates execution. It does not delegate accountability.
Here's the division. The human sets the brief, the boundaries, and what acceptance
looks like. Inside that brief, the software collaborator can plan, edit, use the
tools it's allowed, and bring evidence back. Then the human decides — accept, or
don't.
And one clarification that saves confusion all day. Mergewell is a human field
agent. An investigator. He is not the software agent. He directs them.
Quick one-word check. The evidence comes back. Who decides?

Transition: The first real control is putting durable and task-specific
instructions in the right places.

Audience question: When delegated work returns with evidence, who owns the acceptance decision?

Response guidance: Reinforce "the human" immediately. If a different answer comes
back, draw the line between producing evidence and holding decision authority, then
move on — this isn't the slide to debate it.

Payoff: The audience states the accountability boundary before any configuration detail appears.

Sources: content/modules/02-agentic/module.md; content/modules/02-agentic/visual-intent.md slide 3; content/research/agentic-content-verification.md AGT-12 and AGT-28
-->

---
layout: single-panel
class: agentic-request-slide
transition: none
---

::title::
# Instructions for Agentic Work
::content::

<AgenticRequestStill scene="T6" />

<!--
Timebox: 2 minutes

Talk track: Keep standing guidance separate from today's question.
Which of the two Markdown instruction filenames becomes obsolete just because
the other is present? Neither. Both are documented where supported.

The host is the app that prepares the request. Check what that host supports.
Repository-wide guidance can live in dot github slash copilot-instructions
dot md. Path-specific guidance uses matching instruction files and an explicit
applyTo pattern. AGENTS dot md is another supported convention, depending on
the host. Recurring role instructions have their own scope.

Our example is an outdoor community event. Rain is expected. There are one
hundred guests. We ask, “What supplies should we bring?”
That is today's task, not a permanent rule.
The standing convention is different: label unconfirmed supplies clearly.
The matching-path convention says event Markdown checklists use agreed headings.
The pattern on screen matches those event Markdown files. It is an example,
not a file for you to create now.

Support, discovery and combination vary by host. CLI combines applicable
instruction files without a general precedence order. A nearest-AGENTS
format convention is not a universal rule for every host and file family.
Choose the right scope, then inspect what applies. A correct location alone
does not show that a running request received the intended version.

Transition: The guidance may be saved in the right place. Next, check whether
the running session actually received that version.

Audience question: Which of the two Markdown instruction filenames becomes obsolete just because the other is present?

Response guidance: If needed, say, "Neither. Both are documented where
supported. Check the selected host and what applies. Keep this event's
one-time requirements with this task rather than making them standing rules."

Payoff: You can choose instruction scope without a false deprecation or
precedence rule.

Sources: content/modules/02-agentic/context-caching-source.md T6; content/production/context-caching-proposal/learning-contracts.md T6; content/production/context-caching-proposal/source-verification.md C5/X6/X7, P8/P15/S7/S8
-->

---
layout: single-panel
class: agentic-request-slide
transition: none
---

::title::
# Saved Does Not Mean Loaded
::content::

<AgenticRequestStill scene="N4" />

<!--
Timebox: 3 minutes

Talk track: The saved heading changed, but the response did not. What would
you check before concluding the model ignored the new rule?
Our event convention used to say “Checklist.” You saved “Supplies to confirm.”
The next observed response still says “Checklist.”
That is a mismatch to investigate. It does not yet tell you why it happened.

Read the four checks separately. Saved means the intended content exists.
Discovered means the host found it. Applicable means its scope matches this
work. Enabled means it was not disabled. Included means the intended version
was sent in this request or session. Followed means the result satisfies it.
The numbers order your diagnosis. They are not automatic transitions.

In Copilot CLI, instructions can be inspected or toggled with slash
instructions. Slash env gives loaded environment details.
The current documentation says instruction edits are not immediately
available in active sessions. Preserve the task state first.
The CLI Details reference shows exit and resume with copilot dash dash
continue, or a new session with slash new. We are not resetting a live
session in this explanation. That path is not skill reload and does not
prove provider-cache deletion.

VS Code has a different check. Name the host and version. Inspect settings,
file location and an explicit matching applyTo. Check response References
and customization Diagnostics. Nested AGENTS discovery is experimental and
setting-dependent. Slash instructions opens configuration there; do not
assign the CLI meaning to it. Exact save-to-active-turn timing is unverified.
The separate VS Code Details reference keeps those qualifications together.

Only after the activation checks do you assess compliance.
Even if a response uses the new heading once, that shows behavior, not which
file supplied the rule. Included guidance is not guaranteed to be followed.
Riley, our software collaborator, returns evidence. Mergewell, the human,
checks it. Keep those two jobs separate while you diagnose the mismatch.

Transition: Loaded instructions are one source of continuity. Selective
memory is a different mechanism, with its own limits.

Audience question: The saved heading changed, but the response did not. What would you check before concluding the model ignored the new rule?

Response guidance: If the answer jumps to model failure, say, "First check the
host and version, discovery, scope and whether that file is enabled. Then
check which version reached this session. Only after that do we check whether
the result followed it. A heading appearing once would show behavior, not
prove where the rule came from."

Payoff: You can troubleshoot activation without inventing a reload guarantee,
filename deprecation or cache-protection motive.

Sources: content/modules/02-agentic/context-caching-source.md N4; content/production/context-caching-proposal/learning-contracts.md N4; content/production/context-caching-proposal/source-verification.md C5/X6/X7/X9, P8/P13/P15/S7/S8
-->

---
layout: two-panel
---

::title::
# Memory and Its Limits
::text::

## Use remembered facts as clues—not as the whole brief

- Repository facts stay with one repository
- User preferences can follow the same user
- Supported experiences retrieve relevant entries selectively
- Supply the current goal, limits, and critical facts again

::visual::
<div class="agentic-grid agentic-grid--3" role="img" aria-label="Separate memory scopes and current task">
  <div class="agentic-card agentic-green"><b>Repository facts</b><span>One repository</span></div>
  <div class="agentic-card agentic-purple"><b>User preferences</b><span>Same user across repositories</span></div>
  <div class="agentic-card agentic-amber"><b>Current task</b><span>Supply explicitly</span></div>
</div>

<!--
Timebox: 2 minutes

Talk track: Copilot Memory is in public preview. It selectively retains repository
facts and user preferences in supported experiences.
Repository facts stay with the repository. User preferences can follow you. And
retrieval is relevance-based, under your control, and retention-limited.
Now read that description again for what it doesn't say. Not permanent. Not
complete. Not a transcript.
So here's the working rule. Memory is a bonus. Reviewed instructions and an
explicit current task are what you actually depend on.
I'll name three things. A repository fact. A user preference. And today's stop
condition. Which one do we have to supply again, deliberately, for this job?

Transition: Because memory is selective, long-running work still needs a deliberate
handoff.

Audience question: Which current-task fact would you never leave to selective memory retrieval?

Response guidance: Favor the outcome, limits, repository state, critical
references, checks, or stop conditions. If anyone suggests Memory guarantees
complete recall, correct it directly — that misunderstanding is expensive later.

Payoff: Learners separate optional retained clues from the task-critical facts they must provide deliberately.

Sources: content/research/agentic-content-verification.md AGT-04 and AGT-05; content/modules/02-agentic/visual-intent.md slide 6
-->

---
layout: two-panel
---

::title::
# Context for Long-Running Work
::text::

## Carry forward what the next decision needs

- Goal and current repository state
- Reviewed decisions and open questions
- Relevant files and checks
- A focused handoff when the work changes direction

::visual::
<div class="agentic-grid" role="img" aria-label="Focused context contrasted with stale clutter">
  <div class="agentic-card agentic-green"><b>Focused context</b><span>Current facts · decisions · checks</span></div>
  <div class="agentic-card agentic-amber"><b>Too much context</b><span>Old logs · unrelated files · old mistakes</span></div>
</div>

<!--
Timebox: 2 minutes

Talk track: A good handoff carries six things. The goal. Current repository state.
Decisions you've already reviewed. Open questions. The files that matter. And the
checks that shape what happens next.
It leaves behind stale logs, unrelated files, and plans you've already superseded.
Copilot CLI documents slash context and slash compact. VS Code also documents
automatic compaction and manual slash compact or Compact Conversation in
supported local, background and Claude agent sessions. Check the chosen host
and version, and verify that needed facts remain after compaction.
Neither a fresh session nor a compacted one removes the need to supply
important facts again.
Let's prune one together. I'm going to name four things: the current goal, a
reviewed decision, a failing check that's still relevant, and a plan we've already
replaced. Say "drop" when you hear the one that no longer guides the next decision.

Transition: Missing guidance is one problem. When several sources arrive together
and disagree — that's a different one.

Audience question: Which stale item would you remove first from a handoff, and what current evidence replaces it?

Response guidance: Accept a stale log, unrelated file, superseded plan, or old
mistake — but only when the learner also names what current fact replaces it.
Dropping without replacing is half an answer.

Payoff: The audience practices preserving continuity without preserving noise.

Sources: content/research/agentic-content-verification.md AGT-06 and AGT-07; content/modules/02-agentic/context-caching-source.md A07; content/production/context-caching-proposal/source-verification.md S2/P13a/X4; content/modules/02-agentic/visual-intent.md “Context for Long-Running Work”
-->

---
layout: single-panel
---

::title::
# Context Hierarchy and Instruction Layering
::content::

<div class="agentic-static-stage agentic-static-stage--with-band" role="group" aria-label="Conflicting instructions stop Riley until Mergewell makes the human choice">
  <img src="/images/instruction-conflict-human-resolution.png" alt="Riley pauses between conflicting instruction sheets until Mergewell resolves the conflict">
  <div class="agentic-static-overlay agentic-static-overlay--top">
    <div class="agentic-static-chip"><b>1 · Detect</b><span>Instructions disagree</span></div>
    <div class="agentic-static-chip agentic-static-chip--amber"><b>2 · Expose</b><span>Show the conflict</span></div>
    <div class="agentic-static-chip agentic-static-chip--purple"><b>3 · Human chooses</b><span>Name the surface</span></div>
    <div class="agentic-static-chip agentic-static-chip--green"><b>4 · Continue</b><span>Use reviewed guidance</span></div>
  </div>
  <div class="agentic-static-band">Do not invent one universal precedence order across GitHub.com, IDEs, CLI, code review, and cloud agent.</div>
</div>

<!--
Timebox: 4 minutes

Talk track: Several instruction sources can apply to the same task at the same
time. So the obvious question is: which one wins?
And I have to be straight with you. GitHub does not document one universal
precedence order across GitHub.com, the IDEs, the CLI, code review, and the cloud
agent. There isn't a clean answer to give you.
That's uncomfortable. It's also the truth, and the workaround is better than a
guess.
You can't control precedence, but you can control the sequence. Four steps. Detect
the disagreement. Put the exact conflicting guidance on screen where people can
read it. Name the surface whose behavior actually matters here. Then let a human
reconcile it before any work continues.
Because a plausible guess is still the wrong control when two instructions
disagree.
So — guidance conflicts with the task. What happens before anything gets edited?

Transition: Once the conflict is resolved, the task itself needs a strong
operational brief.

Audience question: If repository guidance and the current task appear to conflict, what should happen before the agent edits anything?

Response guidance: Listen for "stop and expose the conflict." Then push further:
who resolves it, and which product surface has to be named? Do not let the room
invent a universal winner, and don't supply one yourself.

Payoff: Learners gain a conflict-handling method that works without false cross-surface hierarchy claims.

Sources: content/research/agentic-content-verification.md AGT-01, AGT-02, and AGT-03; content/modules/02-agentic/visual-intent.md slide 8
-->

---
layout: two-panel
---

::title::
# Strong Agentic Prompts
::text::

## Tell the collaborator what success and stopping look like

- **Outcome:** observable behavior or repository state
- **Limits:** what may change and what must not
- **Evidence:** diff, checks, and unresolved questions
- **Stop points:** ambiguity, scope expansion, or consequential access

::visual::
<div class="agentic-surface agentic-stack" role="img" aria-label="Bounded task dispatch">
  <div class="agentic-kicker">Dispatch</div>
  <div class="agentic-card"><b>Goal</b><span>Make invalid input produce useful feedback</span></div>
  <div class="agentic-card agentic-red"><b>What not to change</b><span>Dependencies · pricing · public contracts</span></div>
  <div class="agentic-card agentic-green"><b>What comes back</b><span>Changed files · tests · open risks</span></div>
</div>

<!--
Timebox: 3 minutes

Talk track: A strong agentic request is not a well-worded prompt. It's an
operational brief, and the difference matters once work runs for twenty steps
instead of one.
Five parts.
The observable outcome — what does done actually look like. The relevant context.
What may change and what may not. The evidence that has to come back. And the
conditions that require a stop or a question.
Those last three — non-goals, evidence requirements, stop points — are our workshop
refinements. We added them because multi-step work is otherwise unreviewable.
A brief has to say what success looks like and when to stop trying. Most people
write the first half and skip the second.
Think about a task you know well. Which field would prevent the worst drift?

Transition: When part of that work repeats, the question becomes whether it belongs
in a reusable skill.

Audience question: Which brief field would prevent the most damaging kind of drift in a task you know?

Response guidance: Accept different answers — there's no universal best field. But
ask every speaker to name the specific failure their chosen field prevents. That
requirement is what turns this from opinion into diagnosis.

Payoff: Learners connect each part of the brief to a concrete failure mode instead of treating prompting as wordsmithing.

Sources: content/research/agentic-content-verification.md AGT-08; content/modules/02-agentic/copilot-dev-agentic-workshop.md section 2
-->

---
layout: single-panel
class: agentic-request-slide
transition: none
---

::title::
# Reusable Skills
::content::

<AgenticRequestStill scene="T7" />

<!--
Timebox: 3 minutes

Talk track: A skill packages a repeatable procedure and resources.
If the host discovers the supplies-check skill, is the whole procedure already
active in every request? No. Discovery and use are different.

Metadata means a name and description. It helps the host find a relevant
procedure. The selected SKILL dot md body provides its steps. Referenced
resources are accessed as needed. Read the connector labels: when selected,
and as needed. These are conditions, not completed checks in a real request.
We have not observed a request loading this example.

Our reviewed supplies-check procedure has a clear job. Identify the event
requirements. Compare the draft supplies list. Flag unknown quantities.
The brief still describes an outdoor community event with rain and one
hundred guests. The procedure helps review a draft. It does not invent the
missing quantities or certify the event plan.

Now separate the three jobs. Riley represents the software collaborator.
She follows the procedure. The skill is that reusable procedure. A tool
performs a concrete action. An MCP connection gives access to an approved
capability; the skill does not create that connection or become a worker.
Optional forked-context behavior depends on the host and its settings.
It is not how every skill always runs.

Before use, inspect provenance: where did the package come from?
Review dependencies, scripts, resources and data access. A useful description
is not evidence that the package is safe or appropriate.
Clue Wrangler is our reviewed-procedure metaphor, not a built-in feature.

Details keeps the CLI references available: slash skills reload, then slash
skills info followed by the name. They check availability and location.
They are not instruction-session refresh. An older skill body may remain
in history, and edited-skill activation needs a host and build check.
Do not assume every installed body is sent, or that metadata costs no context.
Check actual selection and use.

Transition: A skill captures a procedure. A custom agent captures a recurring
role and its boundaries.

Audience question: If the host discovers the supplies-check skill, is the whole procedure already active in every request?

Response guidance: If needed, say, "No. Discovery metadata helps it find a
relevant skill. The selected body and needed resources load when used. Check
actual use rather than assuming every installed procedure is in the request."

Payoff: You can explain conditional loading and review a reusable procedure
without confusing availability with execution.

Sources: content/modules/02-agentic/context-caching-source.md T7; content/production/context-caching-proposal/learning-contracts.md T7; content/production/context-caching-proposal/source-verification.md C6, P9/P16/P10/P11; content/research/agentic-content-verification.md AGT-09
-->

---
layout: two-panel
---

::title::
# Custom Agents
::text::

## Define a recurring specialist role

- State its purpose and working instructions
- Give it only the tools the role needs
- Define the expected result
- Name the changes that require it to stop
- Check support on the selected product surface

::visual::
<div class="agentic-static-stage" role="group" aria-label="Riley's specialist dossier separates permitted test work from required stops">
  <img src="/images/custom-agent-specialist-role.png" alt="Riley stands beside a specialist dossier with bounded permissions and stops">
  <div class="agentic-static-overlay agentic-static-overlay--bottom">
    <div class="agentic-static-chip agentic-static-chip--green"><b>May do</b><span>Read code · edit tests · run focused checks</span></div>
    <div class="agentic-static-chip agentic-static-chip--red"><b>Must stop before</b><span>Production edits · dependencies · public contracts</span></div>
  </div>
</div>

<!--
Timebox: 3 minutes

Talk track: A custom agent is a reusable profile for a role you need repeatedly.
Five things to define. Its purpose. How it behaves. What it's expected to produce.
The minimum tools it needs. And what makes it stop.
Supported properties differ by environment, so check yours before you promise a
team anything.
Now the trap, and this one is genuinely counterintuitive.
On surfaces that support tool configuration, leaving the tool list out can enable
everything available. And an empty list can disable everything. So the two things
that look like "I didn't specify" produce opposite results — and one of them hands
your specialist every tool in the box.
Say what you mean. Make the minimum explicit.
What goes wrong when that list stays implicit?

Transition: The profile says what the specialist may do. Tools are the actions it
can actually take.

Audience question: What risk appears when a custom agent’s tool list is left implicit?

Response guidance: Steer toward unnecessary or all-available tools. Then flip it
and ask which minimal actions the named specialist genuinely needs — most rooms
discover the list is shorter than they assumed.

Payoff: Learners see tool selection as part of role design rather than an implementation detail discovered after delegation.

Sources: content/research/agentic-content-verification.md AGT-10; content/modules/02-agentic/visual-intent.md slide 11
-->

---
layout: two-panel
---

::title::
# Tools
::text::

## A tool performs a concrete action

A skill supplies the reusable workflow that tells the software collaborator
how and when to use tools.

::visual::
<div class="agentic-static-stage agentic-static-stage--with-band" role="group" aria-label="Riley selects concrete actions while a separate skill guides tool use">
  <img src="/images/tool-action-workbench.png" alt="Riley uses one action at a workbench while a separate workflow card guides the work">
  <div class="agentic-static-overlay agentic-static-overlay--top">
    <div class="agentic-static-chip">Search</div>
    <div class="agentic-static-chip">Read</div>
    <div class="agentic-static-chip">Edit</div>
    <div class="agentic-static-chip agentic-static-chip--green">Run</div>
  </div>
  <div class="agentic-static-band">Skill guides tool use</div>
</div>

<!--
Timebox: 3 minutes

Talk track: Let's finish the set. Three words, three different things.
A tool performs a concrete action. Search. Read. Edit. Run.
A skill is the reviewed workflow that says how and when to use those actions.
And the collaborator is the worker carrying the task.
Tool, procedure, worker. Keep them apart and delegation stays legible.
Two cautions before we move.
Tool defaults and approval behavior vary by host — so check yours, don't assume.
And read is not automatically safe. A read operation can expose sensitive data just
by looking at it. Having permission to do something is not proof it's safe to do.
Test it. "Run the focused tests using our test-triage procedure." Which part is the
tool, and which is the skill?

Transition: Before the loop, separate changing a capability from changing
what the next request actually includes.

Audience question: In “run the focused tests using our test-triage procedure,” which part is the tool and which part is the skill?

Response guidance: Running the tests is the tool action; test triage is the
reusable procedure. Correct any answer that turns either one into the worker —
that's the confusion this slide is here to prevent.

Payoff: The question locks in the worker-skill-tool distinction before the loop puts all three into motion.

Sources: content/research/agentic-content-verification.md AGT-09 and AGT-11; content/modules/02-agentic/visual-intent.md “Tools”; content/modules/02-agentic/context-caching-source.md E3 transition
-->

---
layout: single-panel
class: agentic-request-slide
transition: none
---

::title::
# What Changes the Next Request?
::content::

<AgenticRequestStill scene="E3" />

<!--
Timebox: 3 minutes

Talk track: A file or setting changed. What did the host actually send next?
Does saving a new supplies-check skill prove the next request will send its
whole procedure and suffer a complete cache miss?
No. Check discovery, selection and actual inclusion.

Each row starts from the same event brief: outdoors, rain, one hundred
guests. Each is an independent change, not the next step in a five-toggle
demonstration. The optional Details buttons show the exact event change
and its full conditional effect, one row at a time.

Instructions can change supplied guidance only if they apply, are enabled
and are loaded. A saved heading alone does not prove that.
A skill can change discovery metadata, meaning its name and description.
The selected body and needed resources load when used, not just because
the folder exists.

A tool or MCP connection can change included definitions or results.
MCP here is a connection to an approved capability. A skill does not
establish that connection. Definitions describe capabilities; they are not
the same as permission to call them.

A custom-agent profile can change loaded instructions, tools or an optional
model. The role name does not prove expertise or authority.
A model or setting change can affect usage or the supplied request.
Changing reasoning effort does not prove different weights, different
hardware or a complete cache miss.

Ask where the supplied request first differs. A prefix is its identical
beginning. A supported service may reuse eligible earlier processing state;
it still processes new material and generates a new response.
Reuse remains conditional, not established by this table.
Appending a question or result can retain an earlier eligible prefix.
Compaction in a supported host replaces carried history with a summary.
That can change input and lose detail. Check retained requirements.

Those are reference cases, not a sixth mechanism in this comparison.
Tool definitions, ordering, deferred discovery and profile support vary
by host. Use observable evidence. Do not infer hidden behavior from a
filename, role label or setting alone.

Transition: Those inputs and capabilities feed the work. Next, follow the
observable agentic loop and the human checkpoints around it.

Audience question: Does saving a new supplies-check skill prove the next request will send its whole procedure and suffer a complete cache miss?

Response guidance: If the distinction is unclear, say, "No. Check what was
discovered, whether the skill was selected, and what was actually included.
Metadata is not the full procedure. Reuse depends on where the supplied
request changes and whether the earlier state is eligible."

Payoff: You can separate configuration, activation, actual input and usage
instead of attributing hidden behavior to a saved file or setting.

Sources: content/modules/02-agentic/context-caching-source.md E3; content/production/context-caching-proposal/learning-contracts.md E3 and section 11; content/production/context-caching-proposal/source-verification.md C6, P5/P6/P8–P11/P14–P16/S6/S9
-->

---
layout: single-panel
class: agentic-priority-slide
---

::title::
# The Agentic Loop
::content::

<AgenticLoopNativeAnimation />

<!--
Timebox: 4 minutes

Talk track: Watch what you can see. Not what you imagine is happening inside the
model.
Mergewell frames the brief. He reviews Riley's bounded plan. Riley acts — and
observes a result that changes the situation.
That's the interesting moment. The situation changed. Purrmission marks the ask
boundary, and Mergewell decides how to adjust. Riley performs the narrowed
corrective action. Mergewell verifies what came back.
Then notice the final beat. It holds. Because verified is not the same as accepted.
You can confirm something is true and still decide not to take it.
And be careful how you describe this loop. Retry, ask, stop, recover — those are
deliberate outcomes driven by evidence. They are not mandatory stops in some
universal internal state machine. There is no such machine.
Say the observation reveals an unexpected dependency change. What now?

Transition: The first big control in that loop is reviewing the route before any
edits start.

Audience question: If the observation reveals an unexpected dependency change, what should happen next?

Response guidance: Favor stopping or asking at the boundary, inspecting the new
consequence, and re-briefing if it warrants one. Don't let the answer imply an
automatic recovery control exists.

Payoff: Learners use an observable change in evidence to choose a control action inside the loop.

Sources: content/research/agentic-content-verification.md AGT-12, AGT-13, and AGT-14; content/modules/02-agentic/visual-intent.md slide 14
-->

---
layout: two-panel
---

::title::
# Planning Before Action
::text::

## Review the proposed path before edits

- Target behavior
- Files likely to change
- Checks that will test the result
- Risks and shared behavior to inspect
- Stop points for dependencies, access, or public contracts

::visual::
<div class="agentic-static-stage" role="group" aria-label="Riley presents a proposed repository route and Mergewell reviews it before edits">
  <img src="/images/plan-before-action-route.png" alt="Riley shows a proposed change route to Mergewell before action">
  <div class="agentic-static-overlay agentic-static-overlay--top">
    <div class="agentic-static-chip">Inspect</div>
    <div class="agentic-static-chip agentic-static-chip--purple">Change</div>
    <div class="agentic-static-chip agentic-static-chip--green">Human reviews plan</div>
  </div>
  <div class="agentic-static-overlay agentic-static-overlay--bottom">
    <div class="agentic-static-chip">Scope</div>
    <div class="agentic-static-chip">Checks</div>
    <div class="agentic-static-chip agentic-static-chip--amber">Risks</div>
    <div class="agentic-static-chip agentic-static-chip--red">Stops</div>
  </div>
</div>

<!--
Timebox: 3 minutes

Talk track: Planning starts with inspection. Look at the relevant parts of the
repository, then propose a route — before implementing anything.
A useful plan names five things. The target behavior. The files it expects to
touch. The checks. The risks. And the stop points.
That gives you something concrete to inspect. Note what it doesn't give you: access
to private reasoning. You're reviewing the proposal, not the mind.
Which brings me to the thing I most want you to take from this slide.
Approval is not "that plan sounded confident." Confidence is a writing style.
Approval is a decision that this route stays inside the brief and can produce the
evidence you asked for. Those are completely different tests.
What would make you send a plan back before the first edit?

Transition: Even an approved plan needs boundaries declared in advance for actions
that turn consequential.

Audience question: What would make you stop and revise a plan before the first edit?

Response guidance: Draw out unexplained files, scope that's too broad, missing
validation, dependency or public-contract changes, unclear access, and absent stop
points. Several of these usually go unmentioned until you name them.

Payoff: Learners identify plan-quality evidence before tool activity makes a weak route expensive to unwind.

Sources: content/research/agentic-content-verification.md AGT-08 and AGT-13; content/modules/02-agentic/visual-intent.md slide 15
-->

---
layout: two-panel
class: agentic-priority-slide
---

::title::
# Approval Boundaries
::text::

## Decide access before the request appears

- **Allowed:** routine actions inside the brief
- **Ask first:** consequential or expanded actions
- **Not allowed:** actions outside the task boundary
- Inspect scope, consequence, and reversibility at the gate

<div class="agentic-callout agentic-safety"><b>Purrmission checkpoint:</b> only the access needed.</div>

::visual::
<div class="agentic-static-stage agentic-static-stage--with-band" role="group" aria-label="Purrmission flags a stopped request while Mergewell chooses among three predeclared action classes">
  <img src="/images/approval-boundary-human-decision.png" alt="A request stops at Purrmission's gate while Mergewell decides and Riley waits">
  <div class="agentic-static-overlay agentic-static-overlay--top">
    <div class="agentic-static-chip agentic-static-chip--green"><b>Allowed</b><span>Inside the brief</span></div>
    <div class="agentic-static-chip agentic-static-chip--amber"><b>Ask first</b><span>Consequential gate</span></div>
    <div class="agentic-static-chip agentic-static-chip--red"><b>Not allowed</b><span>Outside the boundary</span></div>
  </div>
  <div class="agentic-static-band agentic-static-band--decision">DEVELOPER ALLOWS · NARROWS · REJECTS · STOPS</div>
</div>

<style>
.agentic-gate-stack{--ink:#24211f;--muted:#625b54;--line:#d8cfc2;--paper:#fffdf7;--rail:#403a36;--green:#287a45;--amber:#9a6700;--red:#b4232d;position:relative;display:grid;gap:.6rem;width:calc(100% - 2.4rem);padding:1rem;border:1px solid var(--line);border-radius:1rem;background:linear-gradient(145deg,var(--paper),#f8f1e7);box-shadow:0 16px 30px rgb(77 61 45 / 11%)}
.agentic-gate-stack::before{content:"";position:absolute;z-index:0;top:1.5rem;bottom:4.7rem;left:2.25rem;border-left:4px solid var(--rail)}.agentic-gate-stack>*{position:relative;z-index:1}
.agentic-gate-card{display:grid;grid-template-columns:2.15rem minmax(0,1fr);gap:.65rem;align-items:center;padding:.65rem;border:1px solid var(--line);border-radius:.75rem;background:var(--paper);box-shadow:0 5px 12px rgb(77 61 45 / 7%)}
.agentic-gate-card b,.agentic-gate-card span{display:block}.agentic-gate-card span{margin-top:.16rem;color:var(--muted);font-size:.68rem;line-height:1.25}
.agentic-gate-label{margin-bottom:.22rem!important;font-size:.58rem!important;font-weight:850;letter-spacing:.07em;text-transform:uppercase}
.agentic-gate-shape{display:grid;width:2rem;height:2rem;place-items:center;border:2px solid currentColor;background:#fff;font-size:.75rem;font-weight:900}.agentic-gate-card--allowed .agentic-gate-shape{border-radius:50%;color:var(--green)}.agentic-gate-card--ask .agentic-gate-shape{transform:rotate(45deg);color:var(--amber)}.agentic-gate-card--ask .agentic-gate-shape span{transform:rotate(-45deg)}.agentic-gate-card--blocked .agentic-gate-shape{border-radius:.2rem;color:var(--red)}
.agentic-gate-card--allowed{border-color:#79a989;background:#eef8ef}.agentic-gate-card--ask{border:2px solid #c59a3a;background:#fff6d8;box-shadow:0 0 0 4px rgb(154 103 0 / 10%),0 7px 14px rgb(77 61 45 / 8%)}.agentic-gate-card--blocked{border-color:#cb7278;background:#fff0ee}
.agentic-gate-stack .agentic-decision{padding:.65rem;border:1px solid #1e6337;border-radius:.55rem;color:#fff;background:#276f42;box-shadow:0 5px 0 #184b2b;text-align:center;font-size:.72rem;font-weight:800;letter-spacing:.025em}
</style>

<!--
Timebox: 4 minutes

Talk track: Decide your action classes before the request shows up. Not during.
Three classes.
Allowed — routine, inside the brief, no ceremony required.
Ask-first — this changes consequence or reach.
Not allowed — outside the boundary, full stop.
The reason you do this in advance is simple. In the moment, under time pressure,
with something half-finished on screen, everything feels like it should be allowed.
That's exactly when you don't want to be making the rule.
When you're at the gate, inspect five things. The exact action. Its parameters. Its
scope. The likely consequence. And whether it's reversible.
Product controls vary by host, so Purrmission marks the risk — but Mergewell still
chooses. Allow, narrow, reject, or stop.
Try one. The collaborator wants to install a package the brief excluded. Which
boundary, and what do you do?

Transition: Once an action is allowed and work comes back, remember that a
completion message is not evidence.

Audience question: If the collaborator proposes installing a package that the brief excluded, which boundary applies and what do you do?

Response guidance: It's ask-first or not-allowed depending on how the boundary was
declared. Push for narrow, reject, or stop — and name approval-by-momentum out loud
as the failure mode, because that's what actually happens under pressure.

Payoff: The group rehearses a consequential decision before encountering it in mission work.

Sources: content/research/agentic-content-verification.md AGT-11 and AGT-14; content/modules/02-agentic/visual-intent.md slide 16
-->

---
layout: two-panel
---

::title::
# Verification and Evidence
::text::

## Check the work—not the completion claim

- **Diff:** did only the intended files change?
- **Tests:** which behavior did they exercise?
- **Open risk:** what remains unknown or unchecked?
- **Acceptance criteria:** does the result meet the brief?

::visual::
<div class="agentic-static-stage" role="group" aria-label="Mergewell reviews four separate forms before judging whether the work meets the brief">
  <img src="/images/evidence-human-verification.png" alt="Mergewell reviews four separate evidence forms at a desk">
  <div class="agentic-static-overlay agentic-static-overlay--grid">
    <div class="agentic-static-chip">Changed files</div>
    <div class="agentic-static-chip agentic-static-chip--green">Test results</div>
    <div class="agentic-static-chip agentic-static-chip--amber">Open risks</div>
    <div class="agentic-static-chip">Meets the brief</div>
  </div>
</div>

<!--
Timebox: 3 minutes

Talk track: "Task complete."
That's a status claim. It is not a review decision, and the gap between those two
things is where a lot of bad merges live.
So do four things instead of believing it.
Read the diff — for scope and for intent, because those fail differently. Read the
tests for what they actually exercised, not the fact that they're green. Name the
open risk and the checks nobody ran. And compare all of it against the acceptance
criteria in your original brief.
Each of those answers a different question. And drift only becomes visible when you
line the answers up next to each other.
So let's press on the green one. One focused test passes. What has it proven — and
what has it left completely untouched?

Transition: Repository state gives us named places to pause, review, and recover
while we're gathering that evidence.

Audience question: What does one passing focused test prove, and what does it leave unproven?

Response guidance: Hold the answer to the specific behavior that test exercised.
Then get one unproven area named out loud — adjacent behavior, security,
integration, or scope. The pairing is the point.

Payoff: Learners stop treating a green signal as universal proof and begin assembling an evidence stack.

Sources: content/research/agentic-content-verification.md AGT-12, AGT-16, and AGT-28; content/modules/02-agentic/visual-intent.md slide 17
-->

---
layout: single-panel
---

::title::
# Repository State as a Checkpoint
::content::

<div class="agentic-flow" role="img" aria-label="Repository checkpoint sequence">
  <div class="agentic-step"><b>Branch</b><span>Separate task line</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step"><b>Working diff</b><span>Inspect every change</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step"><b>Validation</b><span>Keep exact results</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step agentic-green"><b>Reviewable commit</b><span>Named checked checkpoint</span></div>
</div>

<div class="agentic-callout agentic-safety">A Git checkpoint does not reverse every external side effect.</div>

<!--
Timebox: 3 minutes

Talk track: You already own the best checkpoint system for this. It's Git. You
don't need anything new.
A branch separates this line of work from everything else. The working diff shows
you every current change. Your validation record says what was actually checked.
And a named, reviewable commit preserves a repository state you can return to.
That's your recovery point, and it's free.
But I want to be honest about its limits, because "we can always roll back" gets
said far too casually.
A commit reverses files. It does not reverse an installed package on someone's
machine, a network call that already went out, data you already wrote, or anything
an external system did in response.
Your recovery route has to match the consequence. Not just the code.
What would you record so another reviewer could pick this up cold?

Transition: Around the push boundary, security evidence adds several more distinct
checkpoints.

Audience question: What would you record at a checkpoint so another reviewer could recover or continue confidently?

Response guidance: Look for branch or commit identity, the reviewed diff, exact
validation results, open risks — and any external side effect listed with its own
separate recovery step. That last one is usually missing.

Payoff: Learners turn “we can roll back” into a named, evidence-backed recovery point with explicit limits.

Sources: content/research/agentic-content-verification.md AGT-14 and AGT-15; content/modules/02-agentic/visual-intent.md slide 18
-->

---
layout: single-panel
class: agentic-priority-slide
---

::title::
# Security Before and After Push
::content::

<div class="agentic-loop-plate" role="group" aria-label="Focused active-change review followed by three distinct conditional security checkpoints and Purrmission-marked human validation">
  <div class="agentic-security-plate">
    <div class="agentic-security-origin"><span class="agentic-route-condition">Before push · active changes</span><b>`/security-review`</b><span>Focused review—not a complete audit</span></div>
    <div class="agentic-security-connector" aria-hidden="true">→</div>
    <div class="agentic-security-lanes" aria-label="Conditional repository security evidence">
      <div class="agentic-security-lane"><span class="agentic-route-condition">At push · may</span><div><b>Push protection</b><span>Can block detected supported secrets</span></div></div>
      <div class="agentic-security-lane"><span class="agentic-route-condition">Configured event</span><div><b>Configured code scanning</b><span>Inspect resulting alerts</span></div></div>
      <div class="agentic-security-lane"><span class="agentic-route-condition">Applicable PR</span><div><b>Applicable dependency review</b><span>Inspect changed dependencies on the pull request</span></div></div>
    </div>
    <div class="agentic-security-connector" aria-hidden="true">→</div>
    <div class="agentic-security-review"><span class="agentic-route-condition">Purrmission · safety boundary</span><b>Human validates</b><span>Findings are evidence, not acceptance</span></div>
  </div>
  <div class="agentic-callout agentic-safety"><b>Conditional checkpoints:</b> no one control is a complete security audit or permission to merge.</div>
</div>

<style>
.agentic-loop-plate{--ink:#24211f;--muted:#625b54;--line:#d8cfc2;--paper:#fffdf7;--rail:#403a36;--purple:#7650b7;--green:#287a45;--amber:#9a6700;display:grid;grid-template-rows:1fr auto;gap:.8rem;height:100%;color:var(--ink)}
.agentic-security-plate{display:grid;grid-template-columns:minmax(8.5rem,.8fr) 1.1rem minmax(0,2.8fr) 1.1rem minmax(8.5rem,.8fr);gap:.65rem;align-items:center;height:100%}
.agentic-security-origin,.agentic-security-review{padding:.9rem;border:1px solid var(--line);border-top:5px solid var(--purple);border-radius:.75rem;background:var(--paper);box-shadow:0 5px 12px rgb(77 61 45 / 7%)}.agentic-security-review{border-top-color:var(--green)}
.agentic-security-origin b,.agentic-security-review b{display:block;font-size:.86rem}.agentic-security-origin span,.agentic-security-review span{display:block;margin-top:.3rem;color:var(--muted);font-size:.68rem;line-height:1.3}
.agentic-route-condition{display:block;margin-bottom:.28rem!important;color:var(--amber)!important;font-size:.59rem!important;font-weight:850;letter-spacing:.07em;text-transform:uppercase}.agentic-security-connector{color:var(--rail);font-size:1.15rem;font-weight:900;text-align:center}
.agentic-security-lanes{display:grid;gap:.48rem;padding:.6rem;border-block:2px dashed #9d8f83;background:#fbf7f0}.agentic-security-lane{display:grid;grid-template-columns:5.8rem minmax(0,1fr);gap:.6rem;align-items:center;padding:.55rem .65rem;border:1px solid var(--line);background:#fff}.agentic-security-lane:nth-child(1){border-radius:999px}.agentic-security-lane:nth-child(2){border-radius:.65rem}.agentic-security-lane:nth-child(3){border-radius:.2rem}
.agentic-security-lane b{display:block;font-size:.78rem}.agentic-security-lane span{display:block;margin-top:.15rem;color:var(--muted);font-size:.64rem;line-height:1.25}
.agentic-loop-plate .agentic-callout{margin:0;padding:.65rem .8rem;border:1px solid var(--line);border-left:5px solid var(--amber);border-radius:.55rem;background:#fff6d8;box-shadow:0 4px 10px rgb(77 61 45 / 6%)}
</style>

<!--
Timebox: 4 minutes

Talk track: Security here is not one control. It's four separate ones, each with
its own conditions, and treating them as a single safety net is how people get
caught out.
In an interactive CLI session, `/security-review` reviews your active local
changes. Local. Active. Not a repository audit.
At the push boundary, applicable push protection may block detected supported
secrets.
Configured code scanning produces alerts — from the events it was configured for.
And an applicable pull request can surface dependency-review evidence.
Notice how many qualifiers I just used. Applicable. Configured. Supported. Every
lane has its own setup, coverage, trigger, plan, and availability boundary.
And whether it finds something or finds nothing, a human still validates the
result. Clean is a finding too, and it also has a scope.
So — `/security-review` comes back clean. What have you not learned?

Transition: That's one evidence family. Ordinary GitHub Actions gives us a broader
configured loop.

Audience question: If `/security-review` reports no finding, what does that result still not prove?

Response guidance: Reinforce that it doesn't clear the whole repository, the
dependency set, the history, secrets, or every vulnerability class — and it grants
no merge permission whatsoever. Say that last part explicitly.

Payoff: Learners keep a focused Copilot command distinct from repository security controls and final acceptance.

Sources: content/research/agentic-content-verification.md AGT-32 through AGT-38
-->

---
layout: single-panel
---

::title::
# GitHub Actions as Loop Feedback
::content::

<div class="agentic-flow" role="img" aria-label="Configured workflow feedback loop">
  <div class="agentic-step"><b>Push or pull request</b><span>Repository event</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step"><b>Configured workflow</b><span>Runs permitted jobs</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step agentic-amber"><b>Check evidence</b><span>Pass · fail · skip · missing</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step agentic-green"><b>Developer decision</b><span>Continue · revise · stop</span></div>
</div>

<div class="agentic-callout">Keep ordinary repository workflows separate from cloud-agent environments and product-specific review runs.</div>

<!--
Timebox: 3 minutes

Talk track: Let me clear up a misconception I hear a lot.
A GitHub Actions workflow runs because a configured repository event fired. A push.
A pull request. That's it. Copilot did not run continuous integration for you, and
it doesn't inherently do CI at all.
What you get back — pass, fail, skipped, or a check that never ran — is evidence
attached to that commit. Watch for that last one especially. A check that's missing
is not a check that passed.
And cloud-agent environments and product-specific review runs have their own
security and runner boundaries. Different rules, same-looking output.
Then use the result to decide: continue, revise, or stop.
What you must not do is turn a failure into a blind retry. Same input, same code,
hoping. That's not a strategy.
So when a check fails — what new evidence should shape the next attempt?

Transition: A pull request packages that commit evidence with the change and its
open questions, and hands it to another human.

Audience question: When a configured check fails, what new evidence should guide the next attempt?

Response guidance: Ask for the failing step, exact output, affected behavior, the
assumption that changed, and a targeted next check. If someone says "just run it
again," name that as the anti-pattern this slide exists for.

Payoff: Learners use Actions as feedback for the loop instead of treating CI as an automatic agent capability.

Sources: content/research/agentic-content-verification.md AGT-16 and AGT-17; content/modules/02-agentic/visual-intent.md slide 20
-->

---
layout: two-panel
---

::title::
# Pull Requests as Agent Handoffs
::text::

## Return the change, proof, and open questions

- What was intended and what changed
- Which checks ran and what they reported
- What remains uncertain or risky
- Which human or review tool should look next
- Opening the pull request does not accept the change

::visual::
<div class="agentic-static-stage" role="group" aria-label="Riley hands Mergewell a three-part pull-request evidence package for human review">
  <img src="/images/pull-request-evidence-handoff.png" alt="Riley presents a structured evidence folio to Mergewell for review">
  <div class="agentic-static-overlay agentic-static-overlay--bottom">
    <div class="agentic-static-chip">What changed</div>
    <div class="agentic-static-chip agentic-static-chip--green">Proof to review</div>
    <div class="agentic-static-chip agentic-static-chip--amber">Open question</div>
  </div>
</div>

<!--
Timebox: 3 minutes

Talk track: This might be the biggest mental shift in the whole module.
A pull request is a handoff. Not a completion. You are not finishing — you are
transferring something to another human, and it needs to arrive in a state they can
actually act on.
So the package explains six things. What you intended. What changed. Which checks
ran. What passed and what failed. What's still uncertain. And what review you're
asking for.
Commits, logs, diffs, test output, discussion — all of that strengthens the
package.
But be clear about what opening it does. Opening a pull request begins evaluation.
Receiving a Copilot Comment review begins evaluation. Neither one accepts the
change. Nothing here is self-serve.
So picture it. A software agent just opened a PR on your repository. What would you
need to see before you were comfortable approving it?

Transition: If the pull request is the handoff, the next question is when a cloud
agent is the right one to produce it.

Audience question: If a software agent submitted a pull request now, what evidence would you need before you felt comfortable approving it?

Response guidance: Expect tests, security results, a clear change summary, a scoped
diff, and open risks. Group them as separate evidence streams — resist any framing
where one of them is sufficient on its own.

Payoff: The audience defines a practical review package and sees evidence, questions, and code as equal parts of the handoff.

Sources: content/research/agentic-content-verification.md AGT-15, AGT-20, and AGT-28; content/modules/02-agentic/visual-intent.md slide 21
-->

---
layout: two-panel
---

::title::
# Copilot Cloud Agent
::text::

## Use background work when it can return for review

- Current name: **GitHub Copilot cloud agent**
- One session works in one repository on one working branch
- Start paths and pull-request timing vary
- Eligibility depends on plan, policy, repository, and write access
- The cloud agent cannot approve or merge its own pull request

::visual::
<div class="agentic-static-stage" role="group" aria-label="Interactive and cloud work remain separate and return evidence to Mergewell's human review">
  <img src="/images/cloud-agent-parallel-handoff.png" alt="Riley performs bounded cloud work on a separate track that returns evidence to Mergewell">
  <div class="agentic-static-overlay agentic-static-overlay--top">
    <div class="agentic-static-chip">Interactive work</div>
    <div class="agentic-static-chip agentic-static-chip--purple">Cloud agent</div>
    <div class="agentic-static-chip agentic-static-chip--green">Mergewell · developer</div>
  </div>
</div>

<!--
Timebox: 3 minutes

Talk track: The cloud agent suits work that can go away, run on its own, and come
back for review. Asynchronous by design.
Eligibility depends on your plan, your policy, repository compatibility, and write
access. Start paths vary. Pull-request timing varies. And one session works in one
repository, on one working branch — so this isn't a swarm.
Then the line that matters most.
The cloud agent can do bounded work and return evidence. It cannot approve its own
pull request. It cannot merge it. Whatever it produces still lands in front of your
team.
Same accountability we started the module with. Just further from your desk.
So think about your actual backlog. What would you hand off — and what would you
deliberately keep close?

Transition: Background work only succeeds when the handoff carries enough context,
limits, checks, and stops.

Audience question: What is one backlog task you would delegate to a cloud agent, and one task you would keep behind closer human oversight?

Response guidance: Make participants justify both halves using scope,
reversibility, repository fit, permissions, and review evidence. Don't let it become
a popularity contest about which tasks are boring.

Payoff: The paired answer creates a natural autonomy boundary grounded in the audience’s own work.

Sources: content/research/agentic-content-verification.md AGT-18, AGT-19, and AGT-20; content/modules/02-agentic/visual-intent.md slide 22
-->

---
layout: two-panel
---

::title::
# Cloud-Agent Handoffs
::text::

## Give background work clearer rules

- Goal and current repository state
- Scope, non-goals, and permissions
- Checks and stop points
- Commits, logs, changed files, results, and open questions

<div class="agentic-callout agentic-safety"><b>Purrmission checkpoint:</b> more autonomy requires clearer limits.</div>

::visual::
<div class="agentic-static-stage" role="group" aria-label="Mergewell packages four grouped cloud-handoff requirements before Riley begins">
  <img src="/images/cloud-agent-bounded-brief.png" alt="Mergewell holds a bounded handoff case while Riley waits beyond the work boundary">
  <div class="agentic-static-overlay agentic-static-overlay--grid">
    <div class="agentic-static-chip"><b>Goal</b><span>Current state</span></div>
    <div class="agentic-static-chip agentic-static-chip--purple"><b>Scope</b><span>Non-goals · permissions</span></div>
    <div class="agentic-static-chip agentic-static-chip--amber"><b>Checks</b><span>Stops</span></div>
    <div class="agentic-static-chip agentic-static-chip--green"><b>Returned evidence</b><span>Commits · logs · results · open questions</span></div>
  </div>
</div>

<!--
Timebox: 3 minutes

Talk track: A cloud handoff is a complete assignment. Not a short instruction sent
farther away.
And there's a reason it has to be complete. You won't be there. Nobody's going to
tap you on the shoulder mid-task and ask what you meant.
So repeat all of it. The outcome. Current repository state. Verified references.
Scope. Non-goals. Checks. Permissions. Stop conditions. And the evidence that has
to come back.
Two specifics worth calling out. Secrets and variables need explicit
agent-environment configuration — ordinary Actions secrets are not an automatic
grant, and people assume they are. And Purrmission's marker goes exactly here:
higher autonomy demands clearer limits, not looser ones.
Let's write one line together. The task may change one named file. What's your stop
sentence?

Transition: Once work can run away from your desk, GitHub Mobile supports a bounded
start, tracking, diff review, iteration, and review path.

Audience question: For a cloud task allowed to change one named file, what exact stop sentence belongs in the handoff?

Response guidance: Listen for something like "If the task requires another file or
broader permission, stop and ask before continuing." Accept any equivalent that
names the boundary and demands a stop or a question — reject anything that permits
silent expansion.

Payoff: Learners leave with an operational stop clause they can place directly into a bounded cloud-agent handoff.

Sources: content/research/agentic-content-verification.md AGT-08, AGT-19, and AGT-21; content/modules/02-agentic/visual-intent.md slide 23
-->

---
layout: single-panel
---

::title::
# Manage Cloud Agents from GitHub Mobile
::content::

<div class="agentic-static-stage agentic-static-stage--dense" role="group" aria-label="GitHub Mobile oversight follows a five-step route while human acceptance remains separate">
  <img src="/images/mobile-cloud-agent-oversight.png" alt="Mergewell oversees a five-step mobile-to-cloud route while Riley performs bounded remote work">
  <ol class="agentic-static-overlay agentic-static-overlay--five" aria-label="Supported GitHub Mobile cloud-agent flow">
    <li class="agentic-static-chip"><b>Start or assign</b><span>Eligible repository and user</span></li>
    <li class="agentic-static-chip"><b>Track status</b><span>Find current agent work</span></li>
    <li class="agentic-static-chip"><b>Review diff</b><span>Inspect visible changes</span></li>
    <li class="agentic-static-chip agentic-static-chip--purple"><b>Iterate</b><span>No invented exact control</span></li>
    <li class="agentic-static-chip agentic-static-chip--green"><b>Review pull request</b><span>Human acceptance stays separate</span></li>
  </ol>
  <div class="agentic-static-overlay agentic-static-overlay--bottom">
    <div class="agentic-static-chip"><b>GitHub Mobile boundary</b><span>No fabricated session log, chat, status, or follow-up control</span></div>
    <div class="agentic-static-chip agentic-static-chip--amber"><b>Separate eligible action</b><span>Request and inspect GitHub Copilot code review</span></div>
  </div>
</div>

<!--
Timebox: 4 minutes

Talk track: Let me get ahead of the eye-roll. Nobody is suggesting you should write
code on a phone.
Mobile is an oversight surface. That's a different job entirely.
An eligible developer can start a cloud-agent session or assign an issue. Find work
and track it. Review the visible diff. Iterate. And open the resulting pull request
for human review.
Now the boundaries, and I'm going to be strict here because this is a place where
people cheerfully invent features.
Current sources do not verify clarification responses. They do not verify complete
parity with GitHub.com sessions. They do not verify automatic pull-request
creation, review, or acceptance. If you can't point at it, don't promise it.
And Copilot code review stays a separate eligible action whose Comment findings
still need validating.
The real value is the idle time. You spot something on a Tuesday evening — how much
sooner could bounded work have started?

Transition: Better remote results still come down to teaching Copilot the durable
facts about your repository.

Audience question: What useful bug or improvement have you discovered away from your desk that could have benefited from starting bounded work sooner?

Response guidance: Take one or two examples, then ask what repository, scope, and
review boundary would have to be set before starting. Do not let enthusiasm imply
Mobile controls that aren't verified.

Payoff: Learners connect Mobile to reduced idle time while retaining exact product and human-review boundaries.

Sources: content/research/agentic-content-verification.md AGT-39 through AGT-46; content/modules/02-agentic/visual-intent.md slide 24
-->

---
layout: single-panel
class: agentic-init-title-slide
---

::title::
# Teach Copilot How Your Project Works with `/init`
::content::

<div class="agentic-flow" role="img" aria-label="Copilot CLI init sequence">
  <div class="agentic-step"><b>1 · Scaffold</b><span>Project structure exists</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step"><b>2 · Build + test work</b><span>Real commands are known</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step agentic-purple"><b>3 · Run `/init`</b><span>Copilot CLI analyzes the repository</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step agentic-amber"><b>4 · Review + correct</b><span>Inspect proposed guidance</span></div>
  <div class="agentic-arrow">→</div>
  <div class="agentic-step agentic-green"><b>5 · Commit</b><span>`.github/copilot-instructions.md`</span></div>
</div>

<div class="agentic-callout">Revisit reviewed instructions after major framework, architecture, or workflow changes.</div>

<!--
Timebox: 3 minutes

Talk track: `/init` is an interactive Copilot CLI command — `copilot init` is its
command-line counterpart. It analyzes your repository and proposes writing or
updating `.github/copilot-instructions.md`.
Timing matters more than people expect. Run it once the project has real structure,
real dependencies, real conventions, and real build and test commands. Run it on
day one of an empty repository and it has nothing to look at, so it gives you
nothing worth keeping.
And treat what comes out exactly like generated code. Review it. Correct it. Then
decide whether to commit it.
The command proposes. It does not silently approve or commit your team's guidance.
Here's the uncomfortable question. How much of your team's coding and validation
knowledge is written down — and how much of it lives in one person's head?

Transition: With repository context explicit, optimization becomes a workflow
question instead of a hunt for a magic model.

Audience question: How much of your team’s coding and validation guidance is documented, and how much still lives in someone’s head?

Response guidance: Take a quick proportion or a show of hands, then ask which
single stable command or convention should be captured first. Keep it about
practices — never name individuals.

Payoff: The question exposes undocumented project knowledge that can otherwise make every agentic handoff inconsistent.

Sources: content/research/agentic-content-verification.md AGT-01 and AGT-22; content/modules/02-agentic/visual-intent.md slide 25
-->

---
layout: single-panel
---

::title::
# Agentic Optimization
::content::

<div class="agentic-grid" role="img" aria-label="Noisy and focused agentic workflows">
  <div class="agentic-card agentic-amber">
    <b>Before · noisy process</b>
    <span>Unrelated context<br>Broad checks after every edit<br>Blind retries with no new evidence</span>
  </div>
  <div class="agentic-card agentic-green">
    <b>After · focused process</b>
    <span>Relevant context<br>Targeted check, then broader validation<br>Each retry explains what changed</span>
  </div>
</div>

<div class="agentic-callout">Measure irrelevant context, check scope, repeated attempts, and proof quality—do not promise fixed savings or success.</div>

<!--
Timebox: 3 minutes

Talk track: Agentic optimization is workflow optimization. It is not model
shopping.
Picture two paths side by side.
The noisy one drags along unrelated context, runs broad checks after every single
edit, and repeats attempts without any new information. That last one is the real
killer — trying again is not evidence.
The focused one carries relevant context, runs a targeted check before broad
validation, and explains what changed before every retry.
Now let me be careful about what I'm claiming. These practices can reduce
unnecessary work. They do not guarantee quality, and they do not guarantee a fixed
credit saving. Compare what you can observe. Don't attribute the win to model
magic.
So when a response misses — how do you tell whether the problem is the context, the
brief, the tools, or the model?

Transition: The same right-sizing applies to product controls and credit exposure
before work even starts.

Audience question: When a response misses the mark, what evidence would help you decide whether the problem is context, the brief, the tools, or the model?

Response guidance: Accept a mix of factors, but insist on one diagnostic
observation before anyone changes anything — irrelevant context, misunderstood
acceptance criteria, unavailable tools, or repeated model failure. Changing four
things at once teaches you nothing.

Payoff: Learners replace blind retry and reflexive model switching with evidence-led workflow diagnosis.

Sources: content/research/agentic-content-verification.md AGT-23, AGT-24, and AGT-31; content/modules/02-agentic/visual-intent.md slide 26
-->

---
layout: single-panel
class: agentic-request-slide agentic-request-long-title
transition: none
---

::title::
# Make Cost-Conscious Choices Before You Start
::content::

<AgenticRequestStill scene="T8" />

<!--
Timebox: 3 minutes

Talk track: Would you keep the wrong outdoor requirement to preserve a
possible hit? No. Correct the requirement first.
Here the venue should be indoor. Rain and one hundred guests stay unchanged.
Choice A preserves wrong guidance only to seek reuse. Choice B corrects the
venue and checks the new result. Choose B.
This is a decision example, not a measured cache experiment or event plan.

Keep useful guidance stable, not wrong guidance. Choose the tools the task
needs and proportionate settings. After the run, inspect result quality
and the usage you can actually observe. Remove unsafe access regardless
of any possible reuse cost. Human responsibility comes before a meter.

Start with regular context and reasoning where appropriate. Increase them
when the task and supported model or surface justify it. Larger capacity
does not prove it was filled. A selected window size is not a measurement
of occupied input.

Use Auto where supported. Its documented discount depends on the paid plan
and supported surface. It is not a promise of the cheapest successful
result. Policy, available models and the task still matter.
Those guards stay visible here; they are not hidden in Details.

Start fresh for unrelated work. For continuing work, use the chosen host's
supported compaction controls and check that needed requirements remain.
CLI and named supported VS Code sessions document compaction. Do not assume
their controls or exact behavior are identical.

The optional Controls reference keeps those choices together.
The separate CLI limit reference shows slash limits set max-ai-credits,
followed by a number. That public-preview control is a soft session ceiling.
An in-progress response can exceed it. It is not a hard cash cap or monthly
budget. We are reading a reference, not setting a limit now.

Finally, a setting change can affect actual input or usage. It does not
prove a full cache miss. Check the result and available usage without
claiming that one observed change caused a fixed saving.

Transition: Cost is one consideration. Final acceptance still combines
independent quality and review evidence under a human decision.

Audience question: Would you keep the wrong outdoor requirement to preserve a possible hit?

Response guidance: If needed, say, "No. Correct the venue and keep the task safe
and accurate. Then inspect the result and the usage you can actually observe.
A cheap wrong answer is not a saving."

Payoff: You can connect a deliberate pre-run choice to quality and usage
evidence without sacrificing correctness for reuse.

Sources: content/modules/02-agentic/context-caching-source.md T8; content/research/agentic-ai-credit-optimization.md CREDIT-01/03–08, SRC-01–07; content/production/context-caching-proposal/source-verification.md C3/C6/X3/X4, P14/S5/S9/S2
-->

---
layout: single-panel
class: agentic-priority-slide
---

::title::
# Code Quality, Copilot Review, and Human Acceptance
::content::

<div class="agentic-static-stage agentic-static-stage--dense" role="group" aria-label="Four evidence streams remain separate through Purrmission's boundary before Mergewell's human decision">
  <img src="/images/evidence-streams-human-acceptance.png" alt="Four distinct evidence lanes reach Mergewell's review desk before a human decision">
  <div class="agentic-static-overlay agentic-static-overlay--six" style="grid-template-columns:repeat(4,minmax(0,1fr))">
    <div class="agentic-static-chip"><b>Diff</b><span>Stream 01 · changed work<br>What changed, and was it in scope?</span></div>
    <div class="agentic-static-chip"><b>Ordinary GitHub Actions</b><span>Stream 02 · configured checks<br>Did configured checks pass?</span></div>
    <div class="agentic-static-chip agentic-static-chip--purple"><b>GitHub Code Quality</b><span>Stream 03 · deterministic findings<br>Which deterministic CodeQL findings appeared?</span></div>
    <div class="agentic-static-chip agentic-static-chip--amber"><b>GitHub Copilot code review</b><span>Stream 04 · review comments<br>Which Comment findings need validation?</span></div>
  </div>
  <div class="agentic-static-band agentic-static-band--safety"><b>Purrmission guards the acceptance boundary.</b> The four streams remain separate evidence.</div>
  <div class="agentic-static-band agentic-static-band--decision">MERGEWELL'S HUMAN DECISION · ACCEPT · REVISE · REJECT · RECOVER · MERGE</div>
</div>

<style>
.agentic-evidence-plate{--ink:#24211f;--muted:#625b54;--line:#d8cfc2;--paper:#fffdf7;--green:#287a45;--amber:#9a6700;display:grid;grid-template-rows:1fr auto auto;gap:.72rem;height:100%;color:var(--ink)}
.agentic-evidence-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.72rem;width:100%}.agentic-evidence-card{min-width:0;padding:.85rem;border:1px solid var(--line);background:var(--paper);box-shadow:0 7px 14px rgb(77 61 45 / 8%)}.agentic-evidence-card:nth-child(1){border-top:6px solid #557b9e;border-radius:.85rem}.agentic-evidence-card:nth-child(2){border-top:6px double #6c7e53;border-radius:.35rem}.agentic-evidence-card:nth-child(3){border-top:6px solid #8b6cae;border-radius:.85rem .2rem .85rem .2rem}.agentic-evidence-card:nth-child(4){border-top:6px dashed #a16c49;border-radius:.2rem .85rem .2rem .85rem}
.agentic-evidence-card b{display:block;font-size:.78rem;line-height:1.2}.agentic-evidence-card span:last-child{display:block;margin-top:.38rem;color:var(--muted);font-size:.67rem;line-height:1.3}.agentic-stream-tag{display:block;margin-bottom:.3rem;color:var(--muted);font-size:.58rem;font-weight:850;letter-spacing:.07em;line-height:1.15;text-transform:uppercase}
.agentic-evidence-plate .agentic-callout{margin:0;padding:.65rem .8rem;border:1px solid var(--line);border-left:5px solid var(--amber);border-radius:.55rem;background:#fff6d8;box-shadow:0 4px 10px rgb(77 61 45 / 6%)}.agentic-evidence-plate .agentic-decision{margin:0;padding:.7rem;border:1px solid #1e6337;border-radius:.55rem;color:#fff;background:#276f42;box-shadow:0 5px 0 #184b2b;text-align:center;font-size:.75rem;font-weight:800;letter-spacing:.025em}
</style>

<!--
Timebox: 4 minutes

Talk track: This is the evidence desk. Everything in this module lands here.
Four instruments, four different questions.
The diff tells you what changed. GitHub Actions reports the checks you configured.
GitHub Code Quality gives you deterministic CodeQL findings. And Copilot code review
gives you comments — which still need validating.
Two details that have changed and that people still get wrong. Code Quality no
longer automatically adds Copilot as a reviewer. And a requested Copilot review does
not automatically repeat after every new push by default. Check, don't assume.
Think of these like cockpit instruments. Your altimeter reduces uncertainty about
altitude. It does not fly the plane. Neither does your airspeed indicator, and
neither do all of them together.
Mergewell still owns accept, revise, reject, recover, and merge.
So let me put two bad options in front of you. A pull request that passed every
automated check but no human looked at it. Or one an expert reviewed carefully while
a security scan was still failing. Which is riskier?

Transition: We're ready to put the whole handoff-and-decision pattern into the
scored mission.

Audience question: Which is riskier: a pull request that passed every automated check but received no human review, or one an expert reviewed while a security scan still failed—and why?

Response guidance: Let the debate run briefly — it's a genuinely good argument. Then
land it: both are risky, because human review and automated findings answer
different questions and neither one cancels the other. That's the takeaway, not a
winner.

Payoff: The question makes separate evidence streams and retained human authority memorable at the module’s culmination.

Sources: content/research/agentic-content-verification.md AGT-25 through AGT-30; content/modules/02-agentic/visual-intent.md slide 28
-->

---
layout: single-panel
---

::title::
# Demo!
::content::

<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:clamp(3rem,8vw,8rem);font-weight:800;color:#1f2328;">Demo!</div>

<!--
Timebox: 0 minutes

Talk track: Demo.

Transition: We are ready to move from the review pattern into the mission.

Audience question: Are we ready to move from the review pattern into the mission?

Response guidance: Keep it succinct and move on. If the room hesitates, say, "We have the handoff pattern; now we prove it in the mission."

Payoff: Learners get a clean reset before the final agentic mission starts.

Sources: content/modules/02-agentic/slide-manifest.md row 29; content/modules/02-agentic/module.md
-->

---
layout: single-panel
class: agentic-slide agentic-mission-slide
---

::title::
# Your Mission: Hand Off Work with Confidence
::content::

### 🎯 MISSION

<div class="agentic-grid" role="img" aria-label="Agent Mergewell and Purrmission mission briefing">
  <div class="agentic-card agentic-purple"><b>AGENT MERGEWELL · MODULE 2 · 45 MIN</b><span>Bring your Foundations case file, or copy the starter case from the mission page.</span></div>
  <div class="agentic-card"><b>Every exercise tells you three things</b><span>What you'll make · Start here in your tool · You're done when</span></div>
  <div class="agentic-card agentic-amber"><b>Purrmission safety checkpoint</b><span>Use one approved tool and keep the work inside the starter files.</span></div>
  <div class="agentic-card agentic-green"><b>Bring back evidence</b><span>Your message to Copilot · what changed · what you checked · both scores</span></div>
  <div class="agentic-card"><b>Stuck? Ask Copilot</b><span>Copy-ready prompts on the mission page · costs no points</span></div>
</div>

<a class="agentic-decision" href="./missions/agent-task/">MISSION ROUTE · workshops/ghcp-dev-hack/agentic/missions/agent-task/</a>

<!--
Timebox: 45 minutes

Talk track: Open your exported Foundations case file. If you're joining us at this
module, copy the starter case straight off the mission page — no repository access
and no Foundations catch-up needed.
Pick one approved Copilot tool first. Everything on the page reshapes around
that choice, including the setup steps and the first step of every exercise.
Same three-part shape as Foundations. What you'll make. Start here in your
tool. You're done when.
Then run the whole loop. Write a short message telling Copilot the job and the
limits. Read the plan before anything gets changed. Watch for it drifting off, or
reaching for access it doesn't need. Look at what actually changed and whether it
was checked. And then make the call — accept it, ask for changes, say no, stop, or
put it back how it was. All five are fine.
Stopping is a result, not a failure.
The numbers. Fifty core points. Forty completes it. Bonus caps at ten. Hints cost
you nothing, and neither does asking Copilot when a step or a tool gets in your
way.
One note on the bonus round. One of them needs GitHub Enterprise access for code
review and the cloud agent. If your repositories don't live there, skip it and
take a different bonus — they're all worth the same, and the cap is ten either
way.
Export the updated case with your totals kept separate: Foundations, Agentic, and
cumulative. Advanced consumes this evidence. It does not restart the story.
Leaderboard submission stays optional and alias-only.

Transition: Start the forty-five-minute clock now. Keep your final export open when
the mission closes so Module 3 can pick it straight up.

Audience question: What is one limit from your Foundations case you'll use to judge the Agentic plan?

Response guidance: Ask for one short answer — named files, access you left out,
checks that must pass, how to undo it, or when to stop. Then point people to the
setup steps for their chosen tool, and to the copyable starter case if they need
it. If nobody answers, offer one yourself: "Mine is — only the one file I named
changes." If anyone asks about the board, remind them it shows aliases and scores
only, and that nothing from their repository is published.

Payoff: Everyone starts with one thing to judge the plan against, and ends with the evidence Advanced needs.

Sources: content/missions/agentic/agent-task.md; content/modules/02-agentic/module.md
-->
