---
theme: ghcp
title: "GitHub Copilot Foundations"
info: |
  Foundations for choosing a Copilot harness, controlling context, reviewing output, and delegating reversibly.
layout: two-panel
transition: slide-left
mdc: true
---

::title::
# GitHub Copilot Foundations
::text::

## Meet Agent Mergewell, Purrmission, and Riley Relay

<div class="workshop-cover-logos workshop-cover-logos--foundations" aria-label="GitHub and Microsoft">
  <img class="workshop-cover-logos__github" src="/images/GitHub_Lockup_Black_Clearspace.svg" alt="GitHub" />
  <img class="workshop-cover-logos__microsoft" src="/images/microsoft-logo.png" alt="Microsoft" />
</div>

::visual::
<img
  src="/images/foundation-welcome-trio-camera-ready-v3.png"
  alt="Agent Mergewell welcoming the audience with bare human hands beside Riley Relay, the synthetic collaborator, and Purrmission, the black cat safety guardian"
/>

<!--
Timebox: 1 minute

Talk track: Welcome to GitHub Copilot Foundations.
Before we talk about tools, let me introduce three characters you'll see all day.
This is Agent Mergewell. He's our investigator, and he's human. Every decision in
this room is his — and yours.
Next to him, Riley Relay. Riley does the work Mergewell delegates, comes back with
evidence, and never wanders past the scope he was given.
And down here, watching everything, is Purrmission. Purrmission has one job: stop
the room before anything irreversible happens. Permissions, privacy, rollback.
That's her beat.
Now — these three are teaching guides. They are not how the product is built.
Quick calibration before we go: one word, out loud — new, occasional, or daily
with Copilot?

Transition: Good, that's the range I needed. Let's look at the route through this
module.

Audience question: In one word, are you new, occasional, or daily with Copilot?

Response guidance: Ask for one word only and do not invite stories. Acknowledge the
spread you actually hear rather than characterizing experience nobody stated. If the
room is quiet after about three seconds, say "quiet room, that's fine" and move on
without re-asking.

Payoff: The presenter gets a fast experience check while establishing accountable human direction from the start.
Sources: content/modules/01-foundations/module.md; content/characters/agent-mergewell/character.md; content/characters/riley-relay/character.md
-->

---
layout: two-panel
---

::title::
# Session Agenda
::text::

<div class="foundations-agenda">

- **1 · Surfaces and trust — 15 min:** IDE, CLI, GitHub.com, cloud/app boundaries, policy, and accountability
- **2 · Interaction modes — 20 min:** VS Code Chat, inline assistance, Ask, Plan, and Agent
- **3 · Economics and routing — 33 min:** tokens, generation, reuse, AI Credits, receipts, and model choice
- **4 · Context and delegation — 9 min:** context windows, context rot signals, and least privilege
- **5 · Missions — 45 min:** use a harness, produce evidence, and debrief

</div>

::visual::
<img src="/images/session-route.png" alt="Agent Mergewell and Purrmission following the session route from foundations to missions" />

<!--
Timebox: 1 minute

Talk track: Here's the route for today. Four teaching stops, then you play.
Surfaces and trust — where Copilot actually lives, and where your company's
policy draws the line. Interaction modes — Chat, Ask, Plan, and Agent, and when
each one earns its keep. Economics and routing — thirty-three minutes on tokens,
generation, reuse, receipts and model choice. Context and delegation — nine
minutes on bounded context and least privilege. That's seventy-seven teaching
minutes, then forty-five minutes of mission. The module totals one hundred
and twenty-two minutes. Native replays fit inside teaching, not extra media time.
Pick the stop you most want cleared up. Hold onto it. That's your listening
target. Nobody's reporting out.

Transition: First stop — the places Copilot can meet your work.

Audience question: Which stop is your listening target?

Response guidance: Give a real three-second pause so people choose privately.
Don't poll and don't guess which stop the room picked. If someone calls one out,
say "good — hold that, we'll get there," and move.

Payoff: Each learner leaves this minute with a personal focus for the whole
session, and the timeboxes set expectations before the dense material starts.

Sources: content/modules/01-foundations/slide-manifest.md row 2; content/modules/01-foundations/module.md
-->

---
layout: two-panel
---

::title::
# Where Copilot Lives
::text::

- **VS Code:** stay in coding flow with precise editor and repository context
- **Copilot CLI:** investigate and act without leaving the terminal
- **GitHub.com and cloud agent:** collaborate through issues, branches, pull requests, and delegated repository work
- **Copilot App:** synthesize configured work sources across contexts when available
- Choose the harness whose context, tools, permissions, and evidence best fit the task

::visual::
<div class="foundations-surface-choice">
  <img
    src="/images/copilot-surfaces-harness-choice-human-lock-v3.png"
    alt="Agent Mergewell comparing four distinct working paths with Riley Relay and Purrmission beside him"
  />
  <div class="foundations-surface-choice__labels" aria-hidden="true">
    <span>VS Code</span>
    <span>CLI</span>
    <span>GitHub + cloud</span>
    <span>Copilot App</span>
  </div>
</div>

<!--
Timebox: 1 minute

Talk track: Copilot surfaces are not interchangeable. That's the headline.
VS Code keeps the work next to your editor context. The CLI keeps it in the
terminal, where the consequences are immediate. GitHub.com and the cloud agent hand
back repository evidence — branches, pull requests, reviews. And the App
coordinates across configured sources.
So you're choosing on four things. Task. Context. Permissions. And the evidence you
need back.
Quick one, five seconds. You want one selected function explained. No edits. What's
the narrowest surface you'd start in?
And if your answer isn't the editor, tell me the boundary or the evidence that
makes the other choice better.

Transition: Let's look closer at that last one — what the App adds when the work
spans contexts.

Audience question: For explaining one selected function without edits, which surface would you start in?

Response guidance: The editor is the likely narrow answer, so accept it quickly.
Accept any other surface only when the participant ties it to a concrete task or
evidence reason. Take one response — don't rank all four surfaces.
Payoff: Learners make one quick surface choice from task fit and boundary evidence rather than habit.
Sources: content/research/foundations-content-verification.md FND-01; content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md section 1
-->

---
layout: two-panel
---

::title::
# Copilot App: An Agent-native desktop
::text::

<div class="foundations-compact">

- **One control center:** find the right work, start and steer agents, review progress, and land changes across repositories
- **Parallel agent sessions:** local sessions use isolated Git worktrees; cloud sessions can continue away from the local machine
- **Canvases:** keep plans, terminals, diffs, and previews visible with the work
- **My Work + Automations:** organize issues, pull requests, sessions, repository context, and repeatable scheduled tasks
- **Agent Merge:** GitHub documents this as a normal Copilot App workflow for taking pull requests through review, checks, and merge conditions; it is not separately labeled experimental or preview

</div>

::visual::
<div class="foundations-copilot-logo-stage">
  <img src="/images/GitHub_Copilot_Lockup_Black_Clearspace.svg" alt="Official GitHub Copilot logo" />
</div>

<!--
Timebox: 1 minute

Talk track: The Copilot App is generally available as an agent-native desktop.
It gives you one place to find work, start and steer agents, inspect progress,
and land changes across repositories. Local sessions use isolated Git worktrees.
Cloud sessions can continue away from your machine. Canvases keep plans,
terminals, diffs, and previews with the work. My Work and Automations organize
issues, pull requests, sessions, repository context, and repeatable tasks.
GitHub documents Agent Merge as a normal App workflow for taking pull requests
through review, checks, and merge conditions. That documentation does not make
"Agent Merge is GA" our claim. Access, policy, evidence, and final review stay
with the human. Coordination is not approval.
Finish this sentence in your head. "I'd use the App for blank — after verifying
blank." Five seconds. No report-out.

Transition: To compare this surface with the others fairly, we need one shared
idea. The harness.

Audience question: What coordination task and control boundary complete that sentence for you?

Response guidance: Allow a real five seconds of private reflection. If someone
volunteers, connect their answer briefly to access, data scope, worktree isolation,
or acceptance evidence, then move on. Don't let a one-minute overview turn into a
feature discussion.
Payoff: Learners pair a possible App use with a control boundary without turning a one-minute overview into a feature discussion.
Sources: content/research/foundations-content-verification.md FND-01 and FND-15; content/modules/01-foundations/slide-manifest.md row 4
-->

---
layout: two-panel
---

::title::
# What is a Harness?
::text::

- A **control layer** between you and AI models — steer, manage, and organize interactions without being tied to a specific model
- If the AI model is the engine, the harness is the steering system that guides it in the right direction
- **Host:** IDE, terminal, GitHub.com, cloud, or App
- **Context:** files, selections, history, instructions, and sources
- **Tools:** actions and integrations available to Copilot
- **Guardrails:** permissions, policy, review, and rollback

::visual::
<img src="/images/copilot-harness.png" alt="Agent Mergewell inspecting a bounded Copilot harness of context, tools, and guardrails" />

<!--
Timebox: 2 minutes

Talk track: Here's a word you'll hear all day. Harness.
If the model is the engine, the harness is everything else in the car. The
steering. The brakes. The seatbelts.
It has four parts.
The host — where the work actually happens. Your editor, your terminal,
GitHub.com, the cloud, the App.
The context — what you handed it. Files, selections, history, instructions,
sources.
The tools — what it's allowed to reach for.
And the guardrails — permissions, policy, review, rollback.
Here's why that matters, and this is really the whole point of the slide.
You can keep the prompt identical. Word for word. Move it to a different harness,
and you've changed the real-world risk completely. Same words. Different blast
radius.
So before you argue about which model, name the four.
Try it on the task you're picking up next. Can you name the host, the context, one
tool, and one guardrail?

Transition: Let's make that concrete, starting where most of you already live —
the editor.

Audience question: Can you name the host, context, one tool, and one guardrail in the harness around your next task?

Response guidance: Take one example and fill in aloud whatever category the
participant skipped. Keep product-specific behavior tied to the surface they
actually named rather than generalizing across harnesses. If nobody volunteers,
walk the four parts yourself using "reviewing a pull request" as the worked
example.

Payoff: Learners gain a repeatable way to reason about Copilot beyond model choice or prompt wording alone.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md sections 1-2; content/research/foundations-content-verification.md FND-01, FND-02, and FND-13
-->

---
layout: two-panel
---

::title::
# VS Code Chat
::text::

- Use **@ mentions** to ground context — issues, PRs, repos, files, and more
- Use **slash commands** to avoid writing complex prompts for common scenarios:
  - `/clear` — Clear conversation
  - `/delete` — Delete a conversation
  - `/new` — Start a new conversation
  - `/rename` — Rename a conversation
- **Match the interaction:** completions preserve momentum; inline chat handles scoped transformations

::visual::
<div class="foundations-vscode-visual">
  <img src="/images/vscode-grounding.png" alt="Agent Mergewell precisely grounding editor context for a coding task" />
  <img class="foundations-vscode-mark" src="/images/code-stable.png" alt="Visual Studio Code" />
</div>

<!--
Timebox: 2 minutes

Talk track: The value of Chat in VS Code is proximity. Explanation, editing, and
review all stay right next to the code.
At-mentions ground the context — issues, PRs, repos, files. Slash commands save you
from writing a paragraph when a word will do.
One caution before anyone writes these down. What's actually available depends on
your installed release and your extensions. So demo only what this environment
really exposes. Don't teach a command that isn't there.
Then match the tool to the moment. Completions keep your momentum going. Inline
chat is for a deliberate, scoped transformation — not a general conversation.
And start small. You've got a question about one function. What's the smallest
context that could answer it?

Transition: Same idea — context and control — different room. Let's go to the
terminal.

Audience question: For a question about one function, what is the smallest useful context you would provide first?

Response guidance: Favor a selection or a single file when that's genuinely
sufficient. If someone proposes broader context, ask what additional decision that
extra context actually enables. If they can't name one, that's the lesson.
Payoff: The answer reinforces precise grounding as a way to reduce switching, noise, and review effort.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md section 1; content/research/foundations-content-verification.md FND-02
-->

---
layout: two-panel
---

::title::
# Copilot CLI in your terminal
::text::

- **To install:** `winget install GitHub.Copilot`
- Use any `/model`, `/agent`, `/fleet`
- `/resume` where you left off
- Seamlessly move from CLI to IDE and back again

::visual::
<img src="/images/cli-controlled-action.png" alt="Purrmission reviewing a terminal-native action before execution" />

<!--
Timebox: 2 minutes

Talk track: The CLI puts Copilot where the consequences are immediate. That's the
appeal. That's also the risk.
Before you teach exact commands, verify what's actually installed — the binary and
the version. The current Copilot CLI and the older GitHub CLI Copilot extension are
different command families. Don't mix them up in front of a room.
Now the part I care about.
A generated command is a proposal. That's all it is. Read it. Work out which files
or systems it can reach. And know your rollback before you press enter.
So before you run one — what's the first side effect you check for?

Transition: That's the control you hold. Your organization's policy can narrow it
further.

Audience question: What is the first side effect you check before running a generated terminal command?

Response guidance: Listen for file changes, package installation, credentials,
network or remote-system effects, and anything destructive. Add whichever
high-consequence category the room misses.
Payoff: Learners connect terminal convenience with deliberate review instead of treating generated commands as trusted output.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md section 1; content/research/foundations-content-verification.md FND-03, FND-04, and FND-05
-->

---
layout: two-panel
---

::title::
# Enterprise Data and Policy Boundaries
::text::

- What Copilot can do is not the same as what your organization allows
- Your plan, organization settings, and repository settings can change which controls are available
- Check the source for the surface you are using before making claims about data handling or retention
- If a boundary is unclear, stop and ask the appropriate administrator

::visual::
<img src="/images/enterprise-boundaries.png" alt="Purrmission guarding a clearly bounded enterprise data and policy perimeter" />

<!--
Timebox: 3 minutes

Talk track: What Copilot can do and what your organization permits are different
questions. Your plan, organization settings, and repository settings can change
which controls are available. Always use the source for the surface you are
actually using before making a data-handling or retention claim.
Here is one plain example. A boundary verified for VS Code does not automatically
apply to Copilot CLI. The source, settings, and available controls may differ.
Do not carry a verified statement from one surface into another without checking.
Purrmission's rule is short. When a boundary is unclear, stop and ask the
appropriate administrator.
Not knowing is fine. Assuming is not.
Think about a surface you're considering for real work content. Which boundary
would you want verified first?

Transition: Policy draws the outside line. Next question is who's accountable for
what happens inside it.

Audience question: Which Copilot policy or data-handling boundary would you verify before using a new surface with work content?

Response guidance: Ask for categories, not confidential policy details. Accept
answers like repository access, retention, content exclusion, data scope, or cloud
eligibility, and confirm them without implying the controls are uniform across
surfaces. If someone starts quoting a specific internal policy, thank them, restate
it as a category, and move on.

Payoff: The question makes uncertainty visible before it becomes a privacy, policy, or approval failure.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md section 1; content/research/foundations-content-verification.md FND-14
-->

---
layout: two-panel
---

::title::
# Human Accountability for AI-Assisted Code
::text::

- Review security, quality, provenance, and policy
- Keep acceptance responsibility with the developer and reviewer
- Never treat model confidence as approval

::visual::
<img src="/images/human-accountability.png" alt="Agent Mergewell making the final accountable review decision with Purrmission observing" />

<!--
Timebox: 2 minutes

Talk track: What evidence is required before you accept AI-assisted code?
Review security, quality, provenance, and policy. The decision to accept stays
with the developer and reviewer. It does not transfer.
And here's the one I want to land.
A model can sound completely certain and be completely wrong. Confidence in the
wording of a response is not evidence. It never becomes approval.
So think about your own repository. What would you actually need to see before you
accepted an AI-assisted change into it?

Transition: Accountability's fixed. Now we can talk about how much action to hand
over.

Audience question: What evidence would you need before accepting an AI-assisted change into your repository?

Response guidance: Collect two or three answers — a reviewed diff, tests, security
evidence, provenance, policy fit. Then point out that no single item on that list
answers every question, which is why it's a list.
Payoff: Learners establish an evidence standard before the module introduces higher-autonomy interactions.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md section 1; content/research/foundations-content-verification.md FND-13 and FND-14
-->

---
layout: two-panel
---

::title::
# Built in Agents
::text::

- **Ask:** understand or explain without changing files
- **Plan:** review sequence, tradeoffs, and acceptance criteria
- **Agent:** constrained execution with explicit checkpoints

::visual::
<div class="foundations-evidence-handoff">
  <img
    src="/images/copilot-surfaces-riley-human-lock-v2.png"
    alt="Riley Relay returning an evidence folio to Agent Mergewell for accountable review while Purrmission observes the bounded handoff"
  />
  <span class="foundations-evidence-handoff__label">Evidence returned</span>
</div>

<!--
Timebox: 20 minutes

Talk track: Start the twenty-minute clock.

First two minutes — set the stage. Say: "We're working in a disposable,
non-confidential local practice repository. Nothing here matters. Open the
pre-staged `field-notes.js`. Right now it says: `export function
formatFieldNote(note) { return note.trim(); }`. Our one bounded task: keep trimming
non-empty notes, and return `"(untitled)"` when the input is nothing but
whitespace. Only `field-notes.js` may change. Confirm your selected function and
your rollback copy now. Quick check before we touch anything — what should
`"  Safety  "` return, and what should `"   "` return?" Take the two answers,
`"Safety"` and `"(untitled)"`, and correct them if the room gets it wrong. While
they're confirming, verify your own environment exposes the Ask, Plan, Agent, and
context-reference behavior you're about to teach — those labels and behaviors vary
by host and configuration. If something isn't available, stop that live step and
use its pre-reviewed captured result. Do not rename another control, improvise a
different workflow, broaden permissions, or blur local Agent mode into the GitHub
Copilot cloud agent.

At minute two, the Ask stage. Three minutes. Say: "I'm submitting this next request
exactly as written." Then submit it: Using only #selection, explain what
formatFieldNote does for "  Safety  " and "   ". Identify the gap against this
requirement: whitespace-only input must return "(untitled)". Do not edit files or
run commands. Let the response land, then ask the room: "Did any file change? And
what gap did it find?" You're listening for "nothing changed" and the whitespace-only
gap. If a file did change, stop everything, restore the rollback copy, and say
plainly that the no-change checkpoint failed. Before moving on, land this line:
"Ask explained the behavior and found the gap. It did not earn permission to edit."

At minute five, the Plan stage. Four minutes. Again: "Submitting this next request
exactly as written." Then: Using only #selection and field-notes.js, propose the
smallest change so formatFieldNote trims non-empty input and returns "(untitled)"
for whitespace-only input. Include checks for "  Safety  " and "   ". Do not edit
files or run commands. Now put the room to work: "What file does it name? What
behavior? Which two checks? What did it exclude?" If the plan reaches for another
file, drops either input, proposes an action, or quietly widens the task, say it
out loud: "That plan is outside our boundary. We revise, or we stop — we don't
implement it." Keep the plan on screen. And say the line that matters: a proposal
is not permission.

At minute nine, two minutes for the human decision. Ask: "One file. Two expected
results. Rollback copy in hand. Do we approve, revise, or stop?" Take one-word
answers. If the room splits, ask for one scope reason — not a debate. Approve only
if the plan changes `field-notes.js`, preserves trimmed non-empty notes, returns
`"(untitled)"` for whitespace-only input, covers both named checks, and asks for
nothing we excluded. Say the decision out loud so everyone hears a human make it.
If the plan can't be made safe inside this stage, stop the live workflow — that's a
legitimate outcome, not a failure. Only an explicit approval moves us to Agent.

At minute eleven, the Agent stage. Four minutes. First, deputize the room: "Your
job for the next four minutes — call out 'stop' if this reaches beyond the approved
file, or asks for a command, a package, network access, or any wider scope." Then
submit the exact request: Update only field-notes.js to implement the approved plan.
Do not create, delete, rename, or edit any other file. Do not run commands, install
packages, or use the network. Stop and ask if the change requires anything outside
this boundary. Then show the diff and explain how the two checks are satisfied. If
your host can't run this, switch to the pre-reviewed captured result and inspect the
same boundary. If the live step asks for anything we excluded, stop it, deny the
expansion, restore if you need to, and do not accept the change.

At minute fifteen, three minutes on the diff. Open with this: "A completion message
is not acceptance. We look at the diff first." Confirm only `field-notes.js`
changed, and ask: "What changed outside the approved file?" The answer you want is
"nothing." Now check the results by hand — we prohibited commands, so we can't run
tests. "Does `"  Safety  "` come back as `"Safety"`? Does `"   "` come back as
`"(untitled)"`?" If either is wrong, or anything else changed, reject and restore.
If the diff and both checks hold up, say your acceptance decision out loud.

At minute eighteen, two minutes to debrief and restore. Ask: "Which interaction was
the smallest one that could do the job — for understanding, for planning, for
implementing? And which checkpoint actually changed your decision?" Take one or two
answers. Draw the distinction cleanly: Ask explained without changing anything, Plan
gave us something reviewable, Agent made a bounded edit only after we said yes.
Then restore the rollback copy so `field-notes.js` reads `return note.trim();`
again, confirm the practice repository is back at its starter state, and stop the
clock at twenty minutes.

Transition: Bounded edit reviewed, starter restored. Now let's look at what each of
those interactions actually consumed.

Audience question: Which interaction was the smallest sufficient one for each part of this task, and which human checkpoint changed your decision?

Response guidance: Listen for Ask as explanation without change, Plan as a
reviewable route, and Agent only after explicit approval. Accept a different
stopping point when the participant ties it to scope, evidence, and rollback — the
reasoning matters more than matching your answer. If nobody responds, walk the five
checkpoints yourself: no-change, plan approval, diff review, acceptance, restore.
Payoff: Learners experience autonomy as a timed sequence of human scope, approval, stop, review, acceptance, and restoration decisions rather than as a shortcut to execution.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-1.md “Current slide 10 delivery handoff”; content/research/foundations-content-verification.md FND-06, FND-07, and FND-13
-->

---
layout: none
clicks: 9
---

<ManufacturingContextFunnel>

# Context Window: What Competes for Space

</ManufacturingContextFunnel>

<!--
Timebox: 3 minutes

Talk track: Which context category is easiest to forget when you estimate how
much room a task needs? Watch what competes for the same space.
This is a fictional production-reporting software scenario, not machine controls
or customer data. The four-hundred-thousand-token caption is illustrative only.
Actual capacity varies by model and surface. The vessel stays the same size.

Start with Instructions: Always add tests before changing shared code.
The headline enters the glass and dissolves. The rule stays in context.

Now build the User prompts stack. First: Why is the production count off by
twelve units? Next: Show me where that count is calculated. Then: Now fix
reporting without changing the API.
Each prompt gets its own click. The earlier prompts stay readable, a little
softer, so you can follow one growing task. We don't repeat the big headline.

References and files brings in the production-reporting module and its unit
tests. The whole prompt stack fades from the reading area, but its contents
stay in the funnel. Tool definitions and results brings in a test run: three
failures in production reporting tests. Prior model output is an earlier
answer: a patch for reporting you did not apply. It's already input now,
not protected space for a new answer.

Reserved output headroom is different. The model still needs room to answer.
Watch the dashed boundary. This beat highlights empty space; it adds no input.
A big window is not an invitation to fill it.

Compact is the final action. Earlier user prompts compress into a summary.
Instructions and references stay. Some fine detail is dropped.
Compaction changes what we carry, not the size of the vessel.
In Copilot CLI, `/context` inspects context consumption and `/compact` requests
compaction. Those commands and CLI compaction thresholds are not universal
controls across surfaces. Check your harness's supported behavior, then verify
that the summary kept the constraints you need.

Transition: Capacity tells you the limit. Next, Context Rot: Recognize the
Signals shows when the context you're carrying has stopped being trustworthy.

Audience question: Which context category is easiest to forget when you estimate how much room a task needs?

Response guidance: If output headroom is missed, say, "The model still needs
room to answer. That dashed region is reserved, not another input."
If someone asks whether compaction keeps everything, say, "No. Instructions
and references are retained in this illustration, but some fine detail is
dropped. Verify the summary. The commands here are Copilot CLI commands."

Payoff: You can distinguish accumulated inputs from reserved output room and
explain why compaction frees space without making the context window bigger.

Sources: content/research/foundations-content-verification.md FND-12; content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4
-->

---
layout: two-panel
---

::title::
# Context Rot: Recognize the Signals
::text::

- Contradictory suggestions
- Repeatedly restating solved questions
- Ignored constraints or stale references
- Excessive hedging or loss of task focus

::visual::
<img src="/images/context-drift.png" alt="Purrmission detecting contradiction, repetition, and stale evidence in a drifting work session" />

<!--
Timebox: 3 minutes

Talk track: Context rot is our workshop term for an observable pattern, not a
product feature and not a window into hidden model state. Suggestions may
contradict each other. Solved questions may return. Constraints may be ignored,
references may go stale, and the session may lose task focus. Those signals do
not diagnose the model. They tell you the active context is no longer trustworthy.
Stop. Reset or re-scope before taking another action. Which signal have you seen
first in a long session?

Transition: Once you reset or re-scope, a focused message shapes the next-word
scores. Let's see that relationship directly.

Audience question: Which drift signal have you seen first in a long AI-assisted session?

Response guidance: Invite one brief, non-confidential example and map it to
contradiction, repetition, ignored constraints, stale references, or lost focus.
If the room is quiet, say, "When a constraint disappears, stop and re-scope."

Payoff: Learners gain observable stop signals and a concrete reset response before examining prediction.

Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4; content/research/foundations-content-verification.md FND-12
-->

---
layout: none
---

# How your message shapes the reply

<NextTokenRailway />

<!--
Timebox: 2 minutes

Talk track:
Why would changing one word change the reply? We’re zooming in on one moment while the assistant is writing an answer. Your question is at the left. Its unfinished reply is at the right.

Watch the whole message go in, not just “coffee.” These carriages show whole words for readability. Real tokens can be smaller; we aren’t measuring tokenization here. The reply so far goes into the calculation too.

The model uses its learned settings to work with numbers and score possible next words. These are example numbers, not measured predictions. “Other words” groups the remaining choices. For both examples, we’ll choose the highest score. Here, that’s “mug.” Watch it join the assistant’s reply.

Now change only “coffee” to “concrete.” Start with exactly the same unfinished reply. Keep the model and the choice rule the same. The scores change. Now “mold” comes out highest and joins the reply.

The model didn’t learn something new between these answers. We changed the input. That changed the calculation, which changed which word scored highest.

Transition:
Those predictions produce usage evidence. Next, read the receipt without
counting any category twice.

Audience question:
Why did the answer change if the model stayed the same?

Response guidance:
If needed, say: “Different input changes the calculation, not the learned settings.”

Payoff:
Same model. Different message. Different prediction. A likely continuation still isn’t a fact check.

Sources:
../message-comparison-scope-decision.json — scope-railway-message-comparison-v1.
../message-comparison-contract-decision.json — contract-railway-message-comparison-v1.
../first-still-brief.md — contextual/numeric teaching relationships only; old scene superseded.
../../context-caching-proposal/learning-contracts.md — O1/O2: numeric representations and contextual processing.
../../context-caching-proposal/source-verification.md — C1: governing contextual-processing sources.
../first-image-gpt-v1/candidate-review.md — unchanged accepted artwork.
./README.md — standalone title/count and proposed, unallocated timing; not a live manifest change.
-->

---
layout: default
class: cache-slide foundations-cache-walkthrough
transition: none
---

# Same conversation. Different reuse.

<FoundationCacheWalkthrough />

<!--
Timebox: 2 minutes

Talk track: Which tokens are counted twice? None: cached input is a subset, not an extra input category. Press Play and follow Mergewell’s evidence bench. The first request has no reusable prefix. The next request keeps the eligible beginning and adds a fresh tail, including the prior answer and new request context. Watch the completed-turn ledger, not the excerpt length. These are rounded illustrative counts, not a tokenizer measurement. Now the simulated selector changes from Model A to Model B. The conversation remains. In this simulation, B cannot reuse A’s processing state. That is not evidence that A’s entry was deleted. Both example models use the same assumed rates so you can isolate reuse. The cumulative input is thirteen thousand one hundred, including four thousand cached tokens. The total simulated cost is 0.02420 dollars. Mergewell still reviews the work; a cheaper response is not a verified response.

Transition: Now read a separate synthetic usage receipt. Its numbers are a different example, not a continuation of this ledger. Keep the same rule: reused input is already part of total input.

Audience question: Does the model switch delete the conversation or prove Model A’s cache was deleted?

Response guidance: If needed, say, “Neither. Text is retained, while B does not reuse A’s state in this simulation.”

Payoff: You can reconcile cached and uncached input without double-counting and separate a model switch from deletion.

Sources: content/modules/01-foundations/token-cache-cli-live.md; content/modules/01-foundations/token-cache-cli-motion/source.md; content/modules/01-foundations/context-caching.md
-->

---
layout: single-panel
class: foundations-receipt-slide
transition: none
---

::title::
# Read the Usage Receipt
::content::
<FoundationNative scene="E2" />

<!--
Timebox: 3 minutes

Talk track: For B, are the eight thousand cache-read tokens extra on top of
the twelve thousand input tokens? Start with that one question. The table
gives us everything we need for the arithmetic.

These are synthetic counts, not performed calls, promised hits or counts of
our short event question. The question stands for a larger host-assembled
request. Do not pad a real request to create these numbers.

Read down A first. Two thousand ordinary input, zero cache read and eight
thousand cache write make ten thousand total input. A write is not a hit.
The five hundred generated output includes the one hundred reported reasoning.

Now B. Four thousand ordinary input plus eight thousand cache read plus zero
write makes twelve thousand input. The eight thousand is already inside the
twelve thousand. Adding it again would double-count it. B's six hundred output
is separate from input and already includes the one hundred and fifty reasoning.
Six hundred minus one hundred and fifty does not prove four hundred and fifty
visible-text tokens. Other non-visible structure may count.

The session column contains only A and B. Ten thousand plus twelve thousand
is twenty-two thousand accumulated input. It does not mean the current
window holds twenty-two thousand tokens. Reused material can be counted in
more than one request. One human turn may also initiate several model
requests as tools and the model continue working.

Details keeps the request descriptions separate from this arithmetic.
A is the event brief and supplies question. B is an eligible retained beginning
plus new material. A second reference page explains provider normalization.
An OpenAI-style total includes separately reported read and write subsets
where present. A Claude-style ordinary input count needs its separate
read and creation categories added once.

Read the field meaning before comparing providers. A missing field means
unknown, not zero. And count parent totals or their child turns, not both.
The rule stays simple: each category once, with a named request or session scope.

Transition: The receipt says some input work was reused. What exactly was
reused—and why is it not the previous answer?

Audience question: For B, are the 8,000 cache-read tokens extra on top of the 12,000 input tokens?

Response guidance: Say, “No. Four thousand ordinary input plus eight thousand
cache-read input equals twelve thousand total input. Add each input category
once. The six hundred output tokens are separate, and already include the
reported reasoning.” Use the displayed equation, not another example.

Payoff: You can reconcile input and output categories before interpreting
cost or comparing cumulative usage with a current-window gauge.

Sources: content/modules/01-foundations/context-caching.md E2; content/production/context-caching-proposal/source-verification.md C3/C4, P5/P6/P7/P12/P13/P13a/S4
-->

---
layout: single-panel
class: foundations-reuse-slide
transition: none
---

::title::
# Reuse the Work, Not the Answer
::content::
<FoundationNative scene="N2" />

<!--
Timebox: 2 minutes

Talk track: If the earlier brief is reused, must the volunteer answer be the
old supplies answer? Look at what is retained and what is new.

The left block contains the earlier supplied material: community event,
outdoor, rain, one hundred guests, the supplies question, and an earlier
illustrative response retained in the conversation.
The right keeps all six items and appends, “What should we tell the volunteers?”
The bracket refers to the whole earlier block, not just its response.

The identical beginning of the supplied request is called the prefix.
A service may reuse eligible earlier processing state for that beginning.
It does not retrieve the previous answer as the new answer. New material
still needs processing, and a new response is generated using earlier context.

Our illustrative new response is not verified. It tells volunteers about an
outdoor event planned for one hundred guests with rain expected. That excerpt
is not a complete event safety plan or an observed model result.

Common transformer systems reuse key/value processing state. That mechanism
is not a promise about hosted retention. Old context still participates in
new computation and still occupies context. This is not persistent memory,
unlimited capacity or skipped meaning.

An identical beginning alone does not guarantee a hit. Compatible model and
serving conditions, eligible length and boundaries, retention and routing
still matter. We do not claim a newly included earlier response was already
cached by the earlier request.

Transition: Now reset to independent requests. Compare changing only the final
question with changing one early fact in the brief.

Audience question: If the earlier brief is reused, must the volunteer answer be the old supplies answer?

Response guidance: Say, “No. The reusable item is earlier processing state,
not an answer. The new question still needs processing and a new response,
using the earlier context.”

Payoff: You can explain processing-state reuse without claiming saved-answer
retrieval, a guaranteed hit or verified output.

Sources: content/modules/01-foundations/context-caching.md N2; content/production/context-caching-proposal/learning-contracts.md section 11.2; content/production/context-caching-proposal/source-verification.md C2, P4/P5/P6
-->

---
layout: single-panel
---

::title::
# Model Routing: Match the Task
::content::

<ModelRoutingStaticPlate />

<!--
Timebox: 3 minutes

Talk track: Would the lower-cost list be the better route if it forgot the
guest count? Keep that question in mind during this twelve-second replay.

First, compose the task and context. Then compare the result and the usage
evidence. Finally, the human chooses the next route. Mergewell makes that
choice; a meter does not make it for him.

The three usage bands are qualitative observations: fresh input, cached
input and output. They are not an exhaustive billing receipt. The receipt
and credit slides separate read and write categories so we can count them
correctly. Do not add a fourth lane or infer missing values from this picture.

Now apply the decision to the event. Candidate A is a short list, missing
the one-hundred-guest constraint. Candidate B is a list tied to the guest
count, assumptions and open confirmations. These are qualitative samples,
not model measurements or a ranking.

A lower-cost result that misses a requirement does not win. Check whether
the result addresses the task, makes assumptions visible and leaves enough
evidence to review. Then compare latency and scoped usage. A fast or cheap
run can be useful evidence without establishing a universal rule.

Remember the previous two slides. Reuse concerns eligible earlier processing,
not a saved answer. The first changed content affects the possible matching
beginning, but an identical beginning does not guarantee a hit. Provider,
model, product and harness support still matter. Stable useful context helps
you reason about the request. Keeping wrong facts just to seek reuse does not.

Auto may be a supported starting choice. It does not guarantee the cheapest
successful result. Task fit, availability, supported model and policy, needed
tools, quality and evidence all matter. A single run cannot settle that choice
for every future task.

So answer the opening question with the requirement first. The guest count
is not decoration. A supplies list that ignores it needs correction, even
if its receipt looks smaller. Possible reuse helps explain the receipt;
it does not decide whether the answer is good.

Transition: The workload guide gives you a starting route, not a permanent
model league table.

Audience question: Would the lower-cost list be the better route if it forgot the guest count?

Response guidance: Say, “No. It missed a requirement. Compare task fit and
reviewable quality alongside the scoped usage and latency. One cheap run
is not a universal routing rule.”

Payoff: You can use reuse and usage evidence without making them quality
guarantees or automatic routing decisions.

Sources: content/modules/01-foundations/context-caching.md T4; content/storyboards/foundations-visual-narrative/scenes/09-token-usage-summary.md; content/production/context-caching-proposal/source-verification.md C2/C3/C6, P5/P6/P14
-->

---
layout: single-panel
---

::title::
# Model Guide: Match the Workload
::content::

<div class="foundations-model-guide">

| Use case | Representative model families |
|---|---|
| **Let Copilot choose** | Auto |
| **Fast, simple, or repetitive** | GPT-5.6 Luna · Claude Haiku 4.5 · Gemini 3.6 Flash |
| **Everyday coding and agent tasks** | GPT-5.6 Terra · Claude Sonnet 5 · Grok 4.5 |
| **Repository exploration and agentic coding** | GPT-5.4 mini · GPT-5.3-Codex |
| **Deep debugging and architecture** | GPT-5.6 Sol · GPT-5.5 · Gemini 3.1 Pro |
| **Long-horizon autonomous coding** | Claude Fable 5 |

<div class="ghcp-callout">Check your current picker: models, versions, plan/surface availability, and AI-credit rates change; Auto routes by task/availability and may receive a paid-plan discount.</div>
</div>

<!--
Timebox: 2 minutes

Talk track: Read this table left to right. Start in the workload column.
What this is not is a leaderboard. There's no winner here, and the rows overlap on
purpose, because real work overlaps.
Auto weighs task complexity and availability for you. When you pick manually, pick
by the shape of the work — is this fast and repetitive, is it everyday coding, is
it deep architectural debugging?
And treat every name in the right column as a snapshot. Models change. Versions
change. Plan and surface availability change. Credit rates change. So before you
make a live choice in front of anyone, open your actual picker and confirm what's
there.
Think about your week. Which row describes something you're doing in the next few
days?

Transition: A workload route still needs a permission boundary. Next, separate
model choice from what the delegated task is allowed to reach.

Audience question: Which workload row best describes a task you expect to do this week?

Response guidance: Take two examples. Let a task span more than one row — that's
realistic, not a wrong answer. Then ask what picker or availability check would
confirm the final choice.
Payoff: Learners practice workload-first selection without turning a changing model list into a universal ranking.
Sources: content/modules/01-foundations/model-guide-contract.md; content/research/foundations-content-verification.md FND-10
-->

---
layout: two-panel
---

::title::
# Least-Privilege Delegation
::text::

- Grant only the files, tools, and permissions required
- One-file work does not need repository-wide access
- Read-only review does not need write or network access
- Define the boundary before delegation begins

::visual::
<img src="/images/least-privilege-key.png" alt="Purrmission authorizing a narrowly scoped permission key for delegated work" />

<!--
Timebox: 3 minutes

Talk track: Least privilege means Copilot gets exactly what this task requires. The
files. The tools. The commands. The network access. Nothing spare.
Say it as two rules and it's hard to argue with.
One-file work does not need repository-wide write access.
A read-only review does not need write access, and it certainly doesn't need the
network.
And the timing matters as much as the rule. You define the boundary before
execution starts. Not after something surprises you.
You get three things back for that. A smaller blast radius when it goes wrong. A
diff you can actually read. And a recovery path that makes sense, because the
damage was bounded by design.
So — one-file change. What would you deliberately withhold?

Transition: Surfaces, context, evidence, and permissions are in place. One brief
demo cue, then the mission starts.

Audience question: For a one-file change, which permission or tool would you explicitly withhold?

Response guidance: Push participants to tie the withheld capability to the specific
task. Reinforce concrete examples — repository-wide writes, package installation,
network calls, secrets, destructive commands.
Payoff: Learners rehearse a concrete permission decision immediately before mission play.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4; content/research/foundations-content-verification.md FND-13
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

Transition: We are ready to move into the mission work.

Audience question: Are we ready to move from the recap into the mission?

Response guidance: Keep it brief and move on. If the room hesitates, say, "We have the idea; now we test it in the mission."

Payoff: Learners get a clear handoff cue before the final mission begins.
Sources: content/modules/01-foundations/slide-manifest.md row 19; content/modules/01-foundations/module.md
-->

---
layout: two-panel
---

::title::
# Your Mission Starts Now
::text::

Every exercise tells you three things:

- **What you'll make** — in one line
- **Start here** — the first step in *your* tool
- **You're done when** — how to check yourself

Then: choose your tool, work six short experiments, export your case file.

Stuck? Ask Copilot. It costs no points.

::visual::
<img src="/images/mission-readiness.png" alt="Agent Mergewell and Purrmission preparing learners to start the Foundations scavenger hunt" />

<!--
Timebox: 45 minutes

Talk track: Time to go to work. Before you start, look at how each exercise is
built, because this is what people told us was confusing last time.
Every exercise answers three questions for you.
What you'll make — one line, at the top.
Start here — the literal first step, in whichever tool you picked.
And you're done when — so you can check yourself instead of asking me.
That last one matters. You are never guessing whether you finished.
So: open the Missions page. Pick your tool first — VS Code, Copilot CLI, or the
Copilot app. Everything below reshapes itself around that choice.
Then work the six experiments in order.
If a step doesn't make sense, select it on the page and ask Copilot, or paste it
into a fresh session and say which tool you're in. There's a copy-ready prompt at
the top of the mission for exactly this.
Hints never reduce your score. Not once, not ever. Neither does asking the model.
The write-down box under each exercise is optional. It's there to make you think
it through before you claim the point. Use it or don't.
Purrmission is watching for two things — anyone widening their access, and anyone
guessing at policy. She'll stop both.
The numbers. Fifty core points on the table. Forty completes the mission. One
optional route adds up to ten bonus.
And export your case file at the end. The bounded follow-up task inside it is your
starting evidence for Agentic Development after the break.
Optional at the end: Submit your score with an alias. Nothing else leaves your
machine — no evidence, no prompts, no code.

Transition: Start the forty-five-minute clock now. When I call time, have that
exported case file ready for Module 2.

Audience question: Which tool are you choosing?

Response guidance: Take a quick show of hands by tool and point each group to the
setup steps that appear once they select it. If someone is blocked on setup, send
them to the copy-ready setup prompt on the mission page rather than inventing
commands or policy answers. If someone asks whether the leaderboard is required,
say plainly: it is optional, it is alias-only, and it changes nothing about
completing the mission.
Payoff: Every participant begins with a declared tool and evidence target, and the resulting case file creates the cross-module handoff.
Sources: content/missions/foundations/context-and-prompts.md; content/production/foundations-mission-scavenger-hunt-contract.md
-->
