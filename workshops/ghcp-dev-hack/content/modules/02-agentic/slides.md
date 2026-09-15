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

**2 hours 2 minutes · 77 min instruction + 45 min mission**

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

<div class="agentic-stack" role="list" aria-label="Seventy-seven-minute instruction route">
  <div class="agentic-card" role="listitem"><b>1 · Who does what? — 3 min</b><span>Human accountability and bounded software work</span></div>
  <div class="agentic-card" role="listitem"><b>2 · Prepare a job worth delegating — 16 min</b><span>Instructions, activation, memory, context, and prompts</span></div>
  <div class="agentic-card" role="listitem"><b>3 · Choose and trust the helper — 9 min</b><span>Skills, custom agents, and tools</span></div>
  <div class="agentic-card" role="listitem"><b>4 · Stay in charge of the result — 49 min</b><span>Observable loops, repository and cloud evidence, optimization, and the human call</span></div>
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
You have seventy-seven minutes of instruction. Three minutes introduce who does
what, including these opening slides. Sixteen minutes prepare the job:
instructions, activation, memory, context and the task brief.
Nine minutes separate skills, custom agents and tools.
Forty-nine minutes cover the loop, human control points, repository and cloud
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

<div class="character-correction character-correction--instructions">
  <div class="character-main">
    <section class="character-dossier">
      <h2>Mergewell files the standing guidance</h2>
      <div class="character-scope"><b>Repository-wide</b><code>.github/copilot-instructions.md</code></div>
      <div class="character-scope"><b>Path-specific · explicit matching applyTo</b><code>.github/instructions/**/*.instructions.md</code></div>
      <div class="character-scope character-scope--inline"><b>AGENTS.md</b> · Where supported by this host</div>
      <div class="character-scope character-scope--inline"><b>Recurring role instructions</b> · Separate role scope</div>
      <div class="character-rule">Label unconfirmed supplies clearly.<br><code>applyTo: "events/**/*.md"</code><br>Event Markdown checklists use agreed headings.</div>
    </section>
    <section class="character-field">
      <div class="character-art"><img src="/images/human-directed-operating-split.png" alt="Human Mergewell briefs software collaborator Riley, who returns evidence for his decision"></div>
      <div class="character-brief"><b>Riley receives today's task</b><span>Outdoor community event · rain · 100 guests</span><strong>What supplies should we bring?</strong><span>Today's requirements—not permanent rules.</span></div>
    </section>
  </div>
<AgenticRequestStill scene="T6" />
</div>

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

<div class="character-correction character-correction--activation">
  <div class="character-main">
    <section class="character-dossier">
      <h2>Mergewell checks the handoff</h2>
      <div class="character-mismatch">Saved convention: <strong>Supplies to confirm</strong><br>Observed response heading: <strong>Checklist</strong></div>
      <div class="character-checks" aria-label="Four diagnostic checks, not automatic transitions">
        <div>1 · Saved</div>
        <div>2 · Discovered / applicable / enabled</div>
        <div>3 · Included in this request/session</div>
        <div>4 · Followed in the result</div>
      </div>
      <div class="character-rule">CLI: <code>/instructions</code> · <code>/env</code><br>Instruction refresh differs from skill reload.</div>
    </section>
    <section class="character-field">
      <div class="character-art"><img src="/images/human-directed-operating-split.png" alt="Riley returns evidence to human Mergewell for his review, not automatic acceptance"></div>
      <div class="character-brief"><b>Riley returns evidence</b><span>VS Code: settings · <code>applyTo</code></span><span>References · Diagnostics</span><span>Save-to-active-turn timing remains unverified.</span></div>
    </section>
  </div>
  <AgenticRequestStill scene="N4" />
</div>

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

<div class="character-correction character-correction--skills">
  <div class="character-main">
    <section class="character-dossier">
      <h2>Mergewell reviews the procedure</h2>
      <div><b>Reviewed supplies-check procedure</b></div>
      <div class="character-stages" aria-label="Conditional loading, not confirmed request contents">
        <div>Discover: metadata/description</div>
        <div class="character-condition">↓ when selected</div>
        <div>Use: selected <code>SKILL.md</code> body</div>
        <div class="character-condition">↓ as needed</div>
        <div>Access: needed resources</div>
      </div>
      <div class="character-rule">Identify requirements → compare draft list<br>→ flag unknown quantities</div>
    </section>
    <section class="character-field">
      <div class="character-art"><img src="/images/human-directed-operating-split.png" alt="Mergewell directs bounded work; software collaborator Riley follows a reviewed procedure and returns evidence"></div>
      <div class="character-brief"><b>Riley follows the procedure</b><span>Riley: software collaborator</span><span>Skill: reusable procedure</span><span>Tool: performs an action</span></div>
    </section>
  </div>
  <AgenticRequestStill scene="T7" />
</div>

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
<div class="agentic-specialist-dossier" role="group" aria-label="Riley's specialist dossier defines the recurring role, permitted test work, and required stops">
  <img src="/images/custom-agent-specialist-role.png" alt="Riley stands beside a specialist dossier with bounded permissions and stops">
  <section class="specialist-compartment specialist-compartment--role" aria-label="Specialist role"><b>Specialist role</b><span>Purpose &amp; instructions</span><span>Expected result</span></section>
  <section class="specialist-compartment specialist-compartment--may" aria-label="May do"><b>May do</b><span>Read code · edit tests</span><span>Run focused checks</span></section>
  <section class="specialist-compartment specialist-compartment--stop" aria-label="Must stop before"><b>Must stop before</b><span>Production edits</span><span>Dependencies</span><span>Public contracts</span></section>
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

Transition: Next, define an agentic loop and the responsibilities that keep
the work under human control.

Audience question: In “run the focused tests using our test-triage procedure,” which part is the tool and which part is the skill?

Response guidance: Running the tests is the tool action; test triage is the
reusable procedure. Correct any answer that turns either one into the worker —
that's the confusion this slide is here to prevent.

Payoff: The question locks in the worker-skill-tool distinction before the loop puts all three into motion.

Sources: content/research/agentic-content-verification.md AGT-09 and AGT-11; content/modules/02-agentic/visual-intent.md “Tools”; content/modules/02-agentic/context-caching-source.md A12 transition
-->

---
layout: single-panel
class: agentic-loop-intro-slide
---

::title::
# What Is an Agentic Loop?
::content::

<div class="loop-intro">
  <p class="loop-intro-lead">An agentic loop is a repeated cycle of work and feedback—not a single answer.</p>
  <div class="loop-intro-zones">
    <section class="loop-intro-zone loop-intro-human">
      <h2>MERGEWELL SETS THE DESTINATION</h2>
      <p>Define the outcome, boundaries, and what evidence will count as done.</p>
      <h2>MERGEWELL STAYS IN CONTROL</h2>
      <p>Review consequential plans and actions, steer when the work drifts, and decide whether the result is accepted.</p>
    </section>
    <section class="loop-intro-zone loop-intro-work">
      <h2>RILEY TAKES A BOUNDED STEP</h2>
      <p>Inspect context, propose a plan, and use an appropriate tool.</p>
      <h2>THE RESULT CHANGES THE NEXT STEP</h2>
      <p>Read the tool output, diff, error, or test result; then continue, adjust, ask, or stop.</p>
    </section>
    <section class="loop-intro-zone loop-intro-boundary">
      <h2>PURRMISSION MARKS THE BOUNDARY</h2>
      <p>Pause before permissions, sensitive data, destructive actions, or consequences that are difficult to reverse.</p>
    </section>
  </div>
  <section class="loop-intro-takeaway">
    <h2>TAKEAWAY</h2>
    <p>The loop is observable work plus evidence and human control—not hidden reasoning or automatic permission to continue.</p>
  </section>
</div>

<!--
Timebox: 2 minutes

Talk track: Before Riley takes another step, what needs to happen?
Keep that question in mind as we separate three responsibilities.
An agentic loop is repeated work and feedback, not one answer that arrives
finished. Each result gives you something to inspect before the work continues.

Mergewell represents you, the accountable human developer. You set the
destination: the outcome, the boundaries, and the evidence that will count as
done. You also review consequential plans and actions. When the work drifts,
you steer it. You decide whether to accept the result.

Riley represents the software collaborator, not another human decision maker.
She inspects relevant context, proposes a plan, and uses an appropriate tool.
Then the result matters. A diff, tool output, error, or test result can change
the next move. Continuing, adjusting, asking, and stopping are different choices,
not automatic permission to keep going.

Purrmission marks the boundary. Pause before permissions, sensitive data,
destructive actions, or consequences that are difficult to reverse.
These roles describe work you can observe and evidence you can review.
They do not reveal hidden reasoning or describe every product's internal design.

Transition: Now watch those responsibilities move through one concrete loop.

Audience question: What must happen before Riley takes another step?

Response guidance: If needed, say, “Inspect the evidence, check the boundary,
and bring in human steering where needed to continue or stop.”

Payoff: You can separate software work from human control and judge the next
step by evidence rather than momentum.

Sources: content/research/agentic-content-verification.md AGT-12, AGT-13, AGT-14; content/modules/02-agentic/copilot-dev-agentic-workshop.md “Approved A13 — agentic loop introduction”; content/modules/02-agentic/visual-intent.md slide 13
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
class: agentic-checkpoint-slide
---

::title::
# Repository State as a Checkpoint
::content::

<p class="checkpoint-framing">Use Git as save points while Riley works.</p>

<div class="checkpoint-cards">
  <section class="checkpoint-card"><h2>BRANCH</h2><p>Keep this task separate from other work.</p></section>
  <section class="checkpoint-card"><h2>DIFF</h2><p>See exactly what Riley changed before you accept it.</p></section>
  <section class="checkpoint-card"><h2>CHECKS</h2><p>Record which tests and validations passed, failed, or did not run.</p></section>
  <section class="checkpoint-card checkpoint-card--saved"><h2>COMMIT</h2><p>Save a reviewed point that you can compare with or return to later.</p></section>
</div>

<section class="checkpoint-limit"><h2>IMPORTANT LIMIT</h2><p>Git can restore repository files. It cannot undo an email already sent, an API call, a deployment, a database change, or another external side effect.</p></section>

<section class="checkpoint-takeaway"><h2>TAKEAWAY</h2><p>Mergewell should know both the Git recovery point and the separate recovery plan for anything outside the repository.</p></section>

<!--
Timebox: 3 minutes

Talk track: If Riley sends an email, can a Git save point take it back?
Keep that question in mind as we walk through these four cards.
Riley is the software doing the task. Mergewell is the human who pauses the work,
inspects the evidence, and decides whether to continue.
A branch keeps this task on a separate line of development. The diff shows
exactly what changed. Mergewell reviews that change before accepting it.
For checks, record what actually ran and whether it passed or failed. Also record
what did not run. A passing result is evidence about that check, not proof that
all behavior is correct.
Once reviewed, a commit stores a snapshot of the repository. Name that point so
another reviewer can compare it with later work or use it for repository recovery.
Saving the commit does not itself revert any files. Recovery still needs a
deliberate action; there is no universal one-click undo.
Now return to the email. Git can restore repository files, but it cannot undo
an email already sent, an API call, a deployment, a database change, or another
external side effect. Each needs its own recovery mechanism, where one is possible.
Before Riley continues, Mergewell should know the Git recovery point and the
separate plan for effects outside the repository. That is what makes the pause
useful: someone else can see what was reviewed, what remains uncertain, and how
to respond if the next step goes wrong.

Transition: Next, Security Before and After Push adds distinct security evidence
around the push boundary. Keep the same habit: inspect the evidence before
deciding what it supports.

Audience question: Can Git take back an email Riley already sent?

Response guidance: If you are unsure, separate the files from the consequence.
Git can restore the files. The email has already left the repository and needs
a separate response.

Payoff: You can name a reviewed repository save point without promising that it
will undo everything Riley has done.

Sources: content/research/agentic-content-verification.md AGT-14 and AGT-15; content/modules/02-agentic/visual-intent.md slide 18
-->

---
layout: single-panel
class: agentic-security-expanded-slide
---

::title::
# Security Before and After Push
::content::

<div class="security-stages" role="group" aria-label="Distinct conditional security evidence and a human decision, not automatic gates">
  <section class="security-stage security-before"><h2>BEFORE PUSH — MERGEWELL REVIEWS RILEY’S ACTIVE CHANGES:</h2><p>Use <code>/security-review</code> in Copilot CLI to look for security problems in the current changes. It is a focused review—not proof that the whole repository is safe.</p></section>
  <section class="security-stage security-at"><h2>AT PUSH — PURRMISSION WATCHES FOR EXPOSED SECRETS:</h2><p>If push protection is configured and recognizes a supported secret, it may block the push. A successful push does not mean every secret or security issue was checked.</p></section>
  <section class="security-stage security-after"><h2>AFTER PUSH — GITHUB RETURNS SEPARATE SECURITY EVIDENCE:</h2><div class="security-evidence"><section><h3>CODE SCANNING:</h3><p>Configured analysis may report code vulnerabilities.</p></section><section><h3>DEPENDENCY REVIEW:</h3><p>An applicable pull request may flag risky dependency changes.</p></section></div><p class="security-conditions">These checks have different setup, coverage, and triggers.</p></section>
  <section class="security-stage security-human"><h2>HUMAN DECISION — MERGEWELL VALIDATES THE FINDINGS:</h2><p>Ask Riley to fix confirmed issues, stop when the risk or permission boundary changes, and continue only after reviewing the relevant evidence. A clean result is not permission to merge.</p></section>
</div>

<!--
Timebox: 4 minutes

Talk track: If your push succeeds, does that prove the change is safe?
Keep that question in mind. These are separate sources of evidence, not a chain
of automatic gates.
Before push, Mergewell reviews Riley's active changes. Riley is the software
helper; Mergewell is the human responsible for the decision.
Use `/security-review` in an interactive Copilot CLI session to look for security
problems in the current changes. It can return prioritized findings and suggested
fixes. This is a focused review, not proof that the whole repository is safe.
It does not clear the repository history, every secret, or every kind of vulnerability.
At push, Purrmission marks the safety boundary. GitHub push protection is the
actual control, not the character. If it is configured and recognizes a supported
secret, it may block the push. Settings, supported patterns, bypass behavior,
and the push path affect that result. A successful push does not mean every
secret or security issue was checked.
After push, inspect the separate evidence that applies. Configured code scanning
may report code vulnerabilities. It follows its configured events; a push alone
does not guarantee analysis ran.
Dependency review concerns an applicable pull request. Supported manifest or
lock-file changes and an enabled dependency graph matter. It may flag risky
dependency changes. A dependency review action is a separate configured control,
not something every repository runs automatically.
These checks have different setup, coverage, and triggers. Access and plan
requirements also differ. Do not treat an absent result as a passing check.
Now return to the human decision. Mergewell validates findings and suggested
fixes. Ask Riley to fix confirmed issues. Stop when the risk or permission
boundary changes. Continue only after reviewing the relevant evidence.
A finding, no finding, or a successful push is evidence within a limited scope.
A clean result is not permission to merge.

Transition: Next, GitHub Actions as Loop Feedback shows how to read ordinary
configured workflow results and choose whether to continue, revise, or stop.

Audience question: If your push succeeds, does that prove the change is safe?

Response guidance: If you are unsure, ask what actually ran and what it covered.
A successful push does not prove that every secret or security issue was checked.
The human still reviews the relevant evidence.

Payoff: You can separate focused local review, push protection, code scanning,
and dependency review without handing the merge decision to any of them.

Sources: content/research/agentic-content-verification.md AGT-32 through AGT-38; content/modules/02-agentic/copilot-dev-agentic-workshop.md Approved A19; content/modules/02-agentic/visual-intent.md slide 19
-->

---
layout: single-panel
class: agentic-actions-slide
---

::title::
# GitHub Actions as Loop Feedback
::content::

<div class="actions-stages" role="group" aria-label="Software change, configured feedback, human decision">
  <section class="actions-stage">
    <span class="actions-number" aria-hidden="true">1</span>
    <div><h2>RILEY RETURNS A CHANGE</h2>
    <p>A push or pull request starts only the workflows the repository has configured.</p></div>
  </section>
  <section class="actions-stage">
    <span class="actions-number" aria-hidden="true">2</span>
    <div><h2>ACTIONS RETURNS EVIDENCE</h2>
    <p>Read whether each check passed, failed, was skipped, or never ran. A missing check is not a passing check.</p></div>
  </section>
  <section class="actions-stage actions-stage--human">
    <span class="actions-number" aria-hidden="true">3</span>
    <div><h2>MERGEWELL CHOOSES THE NEXT MOVE</h2>
    <p>Continue when the required checks support the change; revise using the exact failure evidence; stop when the result exposes a new risk or boundary.</p></div>
  </section>
</div>

<div class="actions-takeaway"><strong>TAKEAWAY</strong><p>GitHub Actions provides feedback. It does not decide, approve, or fix the change automatically.</p></div>

<!--
Timebox: 3 minutes

Talk track: If a check never ran, would you call it a pass?
Keep that question in mind as we follow the change.
Riley is the software helper. Riley returns a change through a push or pull request.
That starts only the workflows the repository has configured for that event.
It does not create checks that nobody configured.
Actions returns evidence associated with the commit. Read each result:
passed, failed, skipped, or never ran. A missing check is not a passing check.
If a check fails, inspect the failing step and exact output before another attempt.
Use that evidence to change the approach, rather than retrying blindly.
Mergewell is the human choosing the next move. Continue when the required checks
support the change. Revise using the exact failure evidence. Stop when the result
exposes a new risk or boundary. A green check is evidence, not approval.
One distinction matters here. We are describing ordinary repository workflows.
Repositories can also configure manual or scheduled runs. Cloud-agent Actions
environments and product-specific review runs have different security and runner
boundaries. Cloud-agent pull-request workflows are restricted by default until
someone with write access approves them; that behavior may be configurable.
Do not assume the same execution rules apply everywhere.
The takeaway is simple: Actions provides feedback. It does not decide, approve,
or fix the change automatically. You still need to judge what the results mean.

Transition: Now put the change, its check evidence, and its open questions into
the pull request. That is the handoff another human needs to review.

Audience question: If a required check never ran, would you treat the change as
having passed that check?

Response guidance: If you are unsure, separate missing evidence from successful
evidence. No result means we cannot call that check a pass. If your next move is
to retry, first name the failure output or missing evidence that would guide it.

Payoff: You can use check results to choose continue, revise, or stop without
handing the human decision to Actions.

Sources: content/research/agentic-content-verification.md AGT-16 and AGT-17 (reviewed 2026-08-09); content/modules/02-agentic/copilot-dev-agentic-workshop.md Approved A20 — Actions three-step feedback; content/modules/02-agentic/visual-intent.md slide 20
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
class: agentic-optimization-slide
---

::title::
# Agentic Optimization
::content::

<AgenticOptimizationTips />

<!--
Timebox: 3 minutes

Talk track: Before you hit retry, what would you inspect first: the brief,
the context, or the failed check? Name one clue.

First, give one clear job. Say what should change, what must stay untouched,
and what “done” looks like. Mergewell owns that brief; Riley carries out the
software work. Second, pack only useful context. Point to the relevant files,
error, or example, not every document in the project.

Third, plan before expensive work. For a complex change, review the approach
before the agent edits lots of files. Fourth, use the tools you already have.
Let tests, formatters, and scripts do repeatable checks instead of asking the
agent to judge everything.

Fifth, check small, then check wider. Start with the test closest to the change;
run broader checks before accepting the result. Sixth, don’t repeat a failed
attempt blindly. Inspect the failure, learn something new, then change the
approach—or stop and ask.

Open Details for Mergewell’s full brief to Riley: “Fix the date validation in
this form. Leave the layout alone. Start with the validation tests, then run
the form checks. If the fix requires a dependency change, stop and ask.”

Return to the six tips. Optimize for useful, verified progress—not simply fewer credits.
These practices can reduce wasted work, but don’t guarantee savings or correctness.

Transition: Next, bring Code Quality, Copilot review, and the other evidence
together for the human acceptance decision.

Audience question: Before you hit retry, what would you inspect first: the brief,
the context, or the failed check? What clue would you look for?

Response guidance: If you’re unsure, start with the failed check. What did it
expect, and what happened instead? Use that difference to choose your next move.

Payoff: You can give a clearer brief, verify the work, and choose whether to
adjust or stop instead of repeating a failure blindly.

Sources: content/modules/02-agentic/copilot-dev-agentic-workshop.md “Approved A26 — six practical optimization tips”; content/research/agentic-content-verification.md AGT-23, AGT-24, and AGT-31 (reviewed 2026-08-09); content/modules/02-agentic/visual-intent.md slide 26
-->

---
layout: single-panel
class: agentic-priority-slide agentic-review-slide
---

::title::
# Code Quality, Copilot Review, and Human Acceptance
::content::

<div class="review-stages" role="group" aria-label="Review teaching order: Code Quality, then separately requested Copilot Review, then Human Review. Not an automated trigger chain.">
  <section class="review-stage">
    <h2><span aria-hidden="true">1 · </span>CODE QUALITY</h2>
    <ul>
      <li>Scans the code for rule-based issues.</li>
      <li>Reports CodeQL findings and configured coverage evidence.</li>
      <li>Does not automatically request Copilot review or approve the change.</li>
    </ul>
  </section>
  <section class="review-stage">
    <h2><span aria-hidden="true">2 · </span>COPILOT REVIEW</h2>
    <ul>
      <li>Reads the pull-request diff and leaves AI-generated comments.</li>
      <li>Must be requested or configured separately.</li>
      <li>Comments can be wrong or incomplete and may need to be requested again after a push.</li>
    </ul>
  </section>
  <section class="review-stage">
    <h2><span aria-hidden="true">3 · </span>HUMAN REVIEW</h2>
    <ul>
      <li>Inspects the diff, tests, Code Quality findings, and Copilot comments together.</li>
      <li>Validates what matters and resolves conflicts.</li>
      <li>Decides whether to revise, reject, or merge.</li>
    </ul>
  </section>
</div>
<figure class="review-support">
  <img src="/images/evidence-streams-human-acceptance.png" alt="Mergewell inspects incoming evidence at his desk; Purrmission stands beside the acceptance boundary.">
  <figcaption>Separate evidence.<br><strong>Mergewell decides.</strong><br>Purrmission marks the acceptance boundary.</figcaption>
</figure>

<!--
Timebox: 4 minutes

Talk track: If Code Quality passes and Copilot leaves no comments, who decides
whether this change is ready to merge? Hold that question as we walk down these
three stages. This is a review order, not an automatic chain of actions.

First, Code Quality scans the code for rule-based issues. It reports CodeQL
findings and configured coverage evidence. Here we mean its pull-request
analysis: deterministic, rules-based CodeQL checks. We are not calling every
default-branch AI analysis deterministic. Coverage depends on what your team
configured and uploaded; it is not evidence you can assume exists.
Code Quality is a distinct product. It does not automatically request Copilot
review, and it does not approve the change.

Second, Copilot Review reads the pull-request diff and leaves AI-generated
comments. You must request it or configure it separately. Those comments can
be wrong or incomplete. No comments is not proof that the change is correct.
Copilot submits Comment, not Approve or Request changes. Its review neither
satisfies required approvals nor blocks merging.
After a push, a manually requested review does not automatically run again.
Request another review when needed, unless automatic review of new pushes
is configured. Check the evidence against the current diff.

Third, Human Review brings the evidence together. You inspect the diff, tests,
Code Quality findings, and Copilot comments. Include the ordinary GitHub
Actions checks your team configured here, rather than treating them as another
reviewer. Validate what matters and resolve conflicts. A passing check does
not cancel a credible concern; an AI comment does not settle it either.

Look at Mergewell at the desk. Code Quality and Copilot Review deliver separate
evidence to him. Purrmission marks the acceptance boundary, not a tool approval.
Mergewell is the human who decides whether to revise, reject, or merge.
Take a moment to answer the opening question, and name one piece of evidence
you would inspect before making that decision.

Transition: Carry that separation into the mission: delegate the work, inspect
the returned evidence, and keep the acceptance decision with the human.

Audience question: If Code Quality passes and Copilot leaves no comments, who
decides whether to merge, and what would you inspect first?

Response guidance: If the room is quiet, say: “Start with the diff. Does it solve
the agreed problem, and what test supports that?” If answers treat a tool as
the approver, say: “That is useful evidence. Who validates it and owns the
decision?” Give people a brief chance to explain a different first check.

Payoff: You can use both tools without handing either one the decision.
Separate evidence supports human judgment; it does not replace it.

Sources: content/modules/02-agentic/copilot-dev-agentic-workshop.md “Approved A27 — three-stage review”; content/research/agentic-content-verification.md AGT-25 through AGT-30 (reviewed 2026-08-09); content/modules/02-agentic/visual-intent.md slide 27
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

Sources: content/modules/02-agentic/slide-manifest.md row 28; content/modules/02-agentic/module.md
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
