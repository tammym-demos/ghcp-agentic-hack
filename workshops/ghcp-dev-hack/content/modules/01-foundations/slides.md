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

<div class="foundations-title-brand">
  <span class="foundations-title-brand__wordmark">GitHub</span>
  <img src="/images/microsoft-logo.png" alt="Microsoft" />
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
- **3 · Economics and routing — 20 min:** tokens, AI Credits, usage evidence, and model choice
- **4 · Context and delegation — 20 min:** context windows, context recovery, and least privilege
- **5 · Missions — 45 min:** use a harness, produce evidence, and debrief

</div>

::visual::
<img src="/images/session-route.png" alt="Agent Mergewell and Purrmission following the session route from foundations to missions" />

<!--
Timebox: 1 minute

Talk track: Here's the route for today. Four teaching stops, then you play.
Surfaces and trust — where Copilot actually lives, and where your company's
policy draws the line. Interaction modes — Chat, Ask, Plan, and Agent, and when
each one earns its keep. Economics and routing — what a token costs you and how
to stop overpaying for easy work. Context and delegation — the part most teams
get wrong. Then forty-five minutes of mission, where you'll use every one of
those four.
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

- **One control center:** find the right work, start and steer agents, review progress, and land changes across repos — no tab-switching
- **Parallel agent sessions:** each local session runs in an isolated git worktree; cloud sessions let agents keep working from anywhere
- **Canvases:** turn agent work into shared, inspectable surfaces — plans, terminals, diffs, and previews visible in context
- **My Work + Automations:** bring together issues, PRs, sessions, and repo context; turn repeatable prompts into scheduled tasks
- **Agent Merge:** carries PRs through review, checks, and merge conditions so you stay focused on judgment and delivery

</div>

::visual::
<img src="/images/copilot-app-synthesis.png" alt="Agent Mergewell synthesizing evidence from several configured work sources" />

<!--
Timebox: 1 minute

Talk track: The Copilot App is an agent-native desktop. One place to coordinate
software work all the way toward a pull request.
Local sessions run in isolated Git worktrees, so parallel agents don't collide with
each other. Cloud sessions keep going after you close the lid. And canvases keep
the plans, terminals, diffs, and previews inspectable instead of hidden.
My Work, Automations, Agent Merge — those add coordination.
What they don't do is replace access, policy, evidence, or your final review.
Coordination is not approval.
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
Sources: workshop.md researchSources “GitHub Copilot app” and “GitHub Copilot app v1.1.5 release notes”; content/modules/01-foundations/slide-manifest.md row 4
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

- Product behavior is not the same as organization policy
- Plan and repository configuration affect available controls
- Data handling and retention claims need the correct source
- Do not infer a universal boundary across harnesses

::visual::
<img src="/images/enterprise-boundaries.png" alt="Purrmission guarding a clearly bounded enterprise data and policy perimeter" />

<!--
Timebox: 3 minutes

Talk track: Now the part that gets teams in trouble.
What the product can do and what your organization permits are two different
things. Copilot being capable of something does not mean you're allowed to do it
with your company's code.
Privacy. Retention. Content exclusion. Data handling. All of it varies — by
product, by plan, by repository configuration, by what your organization has
actually turned on.
So here's the trap, and I've watched smart teams walk into it.
You verify a boundary in one harness. You get comfortable. And then you carry that
comfort somewhere else. Verified in VS Code is not verified in the CLI. Verified in
the CLI is not verified in the cloud. The assumption is where the incident comes
from.
Purrmission's rule here is short, and I'd like you to actually use it. When you
don't know, you don't guess. You mark it for administrator confirmation, and you
stop.
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

- Generated output is draft material
- Review security, quality, provenance, and policy
- Keep acceptance responsibility with the developer and reviewer
- Never treat model confidence as approval

::visual::
<img src="/images/human-accountability.png" alt="Agent Mergewell making the final accountable review decision with Purrmission observing" />

<!--
Timebox: 2 minutes

Talk track: Generated code is a draft. Not a deliverable. Not signed off.
Copilot can help you implement and help you understand. But correctness, security,
provenance, policy fit, and the decision to accept — those stay with the developer
and the reviewer. They don't transfer.
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
- Escalate only when scope and rollback are clear

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
layout: two-panel
---

::title::
# Tokens: What Enters the Model
::text::

- Prompt text and instructions
- Referenced files, selections, and sources
- Conversation history and tool results
- Cached context when supported

::visual::
<TokenInputHandoffFlow />

<!--
Timebox: 3 minutes

Talk track: Here's something that surprises people. What you type is the small
part.
Your instructions go in. Referenced files and selections go in. The whole
conversation history goes in. Tool results go in. And when the product and model
support it, eligible cached context is accounted for separately.
All of that is input. Every turn.
Now, these are conceptual categories — I'm not drawing exact tokenizer boundaries,
and you shouldn't either.
The practical question is much simpler than the accounting. For each thing sitting
in your context: does it still change the next decision? If it doesn't, it's not
context. It's clutter.
Picture a session you've had running for an hour. What would you cut first?

Transition: Inputs are only half the story. What comes back costs you too.

Audience question: Looking at a long-running session, which input would you remove first if it no longer changes the decision?

Response guidance: Favor stale history, unrelated files, duplicate references, or
obsolete tool output. Then turn it around and ask what they'd deliberately
preserve — that's the harder half of the question.
Payoff: Learners begin treating context as a curated engineering input instead of free background material.
Sources: content/research/foundations-content-verification.md FND-08 and FND-12; content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 3
-->

---
layout: two-panel
---

::title::
# Tokens: What Comes Back
::text::

- Output tokens form the response or proposed change
- Longer output can increase spend and latency
- More context can improve quality or add noise
- Trim stale history before scaling a workflow

::visual::
<img src="/images/token-output-tradeoff.png" alt="Agent Mergewell balancing useful generated output against latency and volume" />

<!--
Timebox: 3 minutes

Talk track: Output tokens are what comes back — the response, the explanation, the
proposed change.
Longer output costs you more usage and more waiting. So the obvious move is to
demand brevity, right?
Careful. Shorter is not automatically better.
If trimming the response strips out the reasoning summary, or the account of which
files changed, or the validation evidence — you didn't save anything. You just moved
the work onto your reviewer, who now has to reconstruct it.
What you actually want is right-sized. Enough to support a reliable decision.
Nothing beyond that.
So when is a longer response worth paying for?

Transition: GitHub turns all of this — models, tokens, usage — into one billing
unit. Let's look at it.

Audience question: When is a longer response worth the additional usage?

Response guidance: Accept answers tied to necessary evidence, genuine ambiguity,
risk, or a complex comparison. Push back on any answer that treats length as a
proxy for quality — that's the misconception this slide exists to break.
Payoff: Learners distinguish concise communication from evidence-starved output before discussing AI credits.
Sources: content/research/foundations-content-verification.md FND-08; content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 3
-->

---
layout: two-panel
---

::title::
# GitHub AI Credits
::text::

- AI credits are a usage-based billing unit in applicable plans
- GitHub documents 1 AI credit as $0.01 USD
- Credit treatment varies by plan and organization scope
- Do not generalize allowances across every harness

::visual::
<img src="/images/ai-credit-ledger.png" alt="Purrmission verifying usage evidence in an abstract AI credit ledger" />

<!--
Timebox: 3 minutes

Talk track: AI Credits are the usage-based billing unit for the applicable Copilot
plans. Our reviewed source records GitHub's documented conversion — one credit,
one US cent.
That number is easy. The part that isn't easy is everything around it.
Which interactions consume credits, which allowances apply to you, and who actually
pays — all of that varies by plan and by organization scope. So don't take a
colleague's answer and assume it's yours.
Two habits to take away.
Treat usage telemetry as evidence you plan with, not a scoreboard you react to.
And before you scale anything high-frequency or agentic, check the budget and the
policy first. A workflow that's fine once a day can look very different running
every commit.
So for your team — which budget or policy fact would you need confirmed first?

Transition: That's the meter. Next decision is which model route the work actually
needs.

Audience question: Before your team scales a Copilot workflow, which budget or policy fact must be confirmed?

Response guidance: Invite answers about plan scope, organization budget, eligible
features, usage ownership, or spending controls. Never ask anyone to disclose their
account details or internal numbers in the room.
Payoff: The question turns billing awareness into a pre-run control rather than a surprise after adoption.
Sources: content/research/foundations-content-verification.md FND-08 and FND-09; content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 3
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

Talk track: Follow the harness through two turns.
First turn. Instructions, selected context, tool results, and your actual request
all go in together. The response comes back as output usage. And an eligible
unchanged prefix may be cached — but only when the provider, the model, the
product, and the harness all support it. Four conditions, not one.
Second turn. Now watch what stays separate. Cached input. Fresh input. Output.
Three distinct observations. Mergewell compares those against the quality of what
he actually got back, and then picks the route for the next turn.
One honest caveat. Auto is a reasonable default. But neither this diagram nor any
single run proves some model is universally cheapest. Anyone who tells you
otherwise is generalizing from one sample.
So what would you actually compare before changing route?

Transition: That's the decision. The next slide gives you a workload-first way to
make it.

Audience question: Which evidence would you compare before changing the model route for the next turn?

Response guidance: Draw out task fit, result quality, latency, observed usage, cost
indicators, and availability. Treat any single-metric answer as incomplete and ask
what it would miss.
Payoff: Learners connect routing to observed task evidence while keeping cache and Auto claims properly conditional.
Sources: content/storyboards/foundations-visual-narrative/scenes/09-token-usage-summary.md; content/research/foundations-content-verification.md FND-08 and FND-10
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

Transition: A routing choice only means something if you can inspect the evidence
from where the work ran.

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
# Usage by Harness: IDE and CLI
::text::

- IDE: inspect the current product usage view and model indicators
- CLI: use the documented usage/context workflow for the installed version
- Record the session, context, model, and observed result
- Separate observed facts from assumptions

::visual::
<div class="foundations-diagram" role="img" aria-label="Usage evidence from IDE and CLI harnesses">
  <strong>Session evidence</strong>
  <span>IDE</span><span>CLI</span><span>Context</span><span>Model</span>
</div>

<!--
Timebox: 3 minutes

Talk track: IDE and CLI show you different things. Different context signals,
different model indicators, different usage evidence.
So before you interpret anything on screen, write down which harness you're in and
which version is installed. Otherwise you're comparing two things that were never
the same measurement.
A useful session record has four parts. The context scope. The model or routing
choice. Whatever usage or context signal you could actually see. And the result you
got.
Now the discipline that matters most, and it carries straight into your mission.
Keep observation separate from inference.
A CLI command existing does not make it a universal host feature. One fast run does
not prove a general cost rule. You saw a thing. That's all you saw.
Try it. Name one fact you can observe — and one conclusion that fact would not
prove on its own.

Transition: That separation gets even more important once evidence moves out into
GitHub, cloud, and app workflows.

Audience question: What is one fact you can observe in a harness, and what conclusion would that fact not prove by itself?

Response guidance: Help participants phrase a narrow pair out loud, like "I
observed this model name, but that doesn't prove it caused the result or the cost."
The pairing is the skill — don't accept the observation without the limit.
Payoff: Learners build the evidence discipline they will use again in the mission’s “does not prove” statement.
Sources: content/research/foundations-content-verification.md FND-04, FND-05, and FND-11; content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 3
-->

---
layout: two-panel
---

::title::
# Usage by Harness: GitHub, Cloud, and App
::text::

- GitHub.com: account and organization usage evidence
- Cloud agent: repository task, branch, and pull-request evidence
- Copilot App: configured sources and policy boundary
- Use billing/settings for monthly totals and thresholds

::visual::
<img src="/images/github-cloud-app-usage-evidence.png" alt="GitHub, cloud, and app work surfaces contributing distinct evidence to an accountable record" />

<!--
Timebox: 3 minutes

Talk track: Three sources, three different kinds of question.
GitHub.com — your account and organization settings — answers money questions.
Billing totals, thresholds, who's spending what.
Cloud-agent work answers repository questions. It leaves a trail you can audit:
branches, commits, pull requests, reviews.
And the App has its own boundaries around configured sources and sessions.
Here's the mistake to avoid. Don't go looking for an audit answer in a billing view
and conclude the evidence doesn't exist. It exists — you're standing in the wrong
place.
So work backwards. Start with the question you actually need answered. Then pick
the source that can answer it.
Try the two: a team budget question, and a repository audit question. Where does
each one send you?

Transition: You can find the evidence. Now let's go inside the bounded context that
every single interaction has to manage.

Audience question: Which evidence source would you use for a team budget question, and which would you use for a repository audit question?

Response guidance: Steer budget questions toward billing or Copilot settings, and
audit questions toward repository, branch, pull-request, or session artifacts. If
someone conflates the two, name the difference plainly rather than letting it pass.
Payoff: Learners stop treating activity, billing, and repository evidence as interchangeable.
Sources: content/research/foundations-content-verification.md FND-01, FND-07, and FND-11; content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 3
-->

---
layout: two-panel
---

::title::
# Context Window: What Competes for Space
::text::

- Fixed token capacity varies by model
- Instructions, messages, references, tools, and results compete for space
- Response output also needs room in the bounded window
- Selected supported models offer optional 1M-token context in VS Code and CLI

::visual::
<img src="/images/context-window-capacity.png" alt="A bounded context container where instructions, references, tools, results, and output compete for capacity" />

<!--
Timebox: 3 minutes

Talk track: A context window is a container with a fixed size. And everything is
sharing it.
Your instructions. The conversation history. Every reference you've pulled in. Tool
definitions and their results. And — the one people forget — the output. The model
still needs room to write the answer.
Capacity varies by model and by surface. Selected models can expose much larger
context in VS Code and Copilot CLI, though availability and credit implications
still apply.
But here's the lesson, and it's the opposite of what a big number suggests.
A bigger window is not an invitation to fill it. Your job is to protect room for
the information that matters right now and the response you're waiting on.
Which category do you think people forget when they estimate how much room a task
needs?

Transition: Capacity tells you the limit. Packing decides whether the useful signal
survives inside it.

Audience question: Which context category is easiest to forget when you estimate how much room a task needs?

Response guidance: Surface instructions, tool definitions and results, conversation
history, and output headroom — output headroom is the one that usually goes unsaid.
Remind the group that `/context` is CLI-specific, not a universal control.
Payoff: Learners see context as competing categories rather than an unlimited pile of files.
Sources: content/research/foundations-content-verification.md FND-12; content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4
-->

---
layout: two-panel
---

::title::
# Context Packing: Keep the Signal
::text::

- Start with the smallest useful scope
- **Clue Wrangler (custom skill):** return an explicit include/exclude manifest
- **Case Condenser (custom skill):** create a verified handoff, not host compaction
- In Copilot CLI, inspect `/context` and use `/compact` when appropriate

::visual::
<img src="/images/clue-wrangler-context-packing.png" alt="Agent Mergewell using Clue Wrangler to retain relevant evidence and exclude noise" />

<!--
Timebox: 3 minutes

Talk track: Good packing starts in one place. The smallest scope that can support
the decision in front of you. Then you add, deliberately, only if you need to.
Two of Mergewell's gadgets help here.
Clue Wrangler produces an explicit record — this is what I included, this is what I
left out, and why.
Case Condenser builds a verified handoff you can check.
Be clear with your room about what these are. They're workshop-defined procedures.
Ours. They are not GitHub product features, and they cannot see hidden model state.
Nothing can.
What is real and named: in Copilot CLI, `/context` and `/compact` are host
controls. Every other surface, you handle according to its own current documented
behavior.
So take a task you're working on. What goes in on purpose — and what stays out on
purpose?

Transition: Even a well-packed session drifts over time. Next we need signals you
can actually see.

Audience question: For a current task, what would you deliberately include and what would you explicitly leave out?

Response guidance: Ask for one include and one exclude, each tied to a decision.
Reinforce that the exclusions — stale logs, unrelated files — are part of the
evidence record, not just leftovers.
Payoff: Learners practice context curation as an explicit, reviewable choice rather than an invisible optimization.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4; content/research/foundations-content-verification.md FND-12
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

Talk track: Context rot. That's our term for it — a workshop term, not a product
feature, and not a window into hidden model state. We named it because the pattern
is real and people need a handle for it.
Here's what it looks like from the outside.
The suggestions start contradicting each other. Questions you already settled come
back around. Constraints you stated get quietly ignored. References point at things
that aren't true anymore. And the whole session slowly loses the plot.
None of that tells you what's happening inside the model. What it tells you is that
your active context can't be trusted right now.
And Purrmission's instruction at that moment is simple. Stop. Because the next
action taken on drifting context is how a small problem becomes a wide one.
Which of those signals have you hit first in a long session?

Transition: Once trust is gone, piling on more instructions is weaker than
resetting and re-anchoring.

Audience question: Which drift signal have you seen first in a long AI-assisted session?

Response guidance: Invite brief, non-confidential examples and map each one back to
contradiction, repetition, ignored constraints, stale references, or lost focus.
Keep examples generic — no customer or employer detail.
Payoff: Learners gain observable stop signals instead of blaming the model vaguely or continuing on unreliable context.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4; content/research/foundations-content-verification.md FND-12
-->

---
layout: two-panel
---

::title::
# Context Recovery: Reset and Re-anchor
::text::

- Stop when the active context is no longer trustworthy
- In Copilot CLI, `/compact` summarizes; start fresh when needed
- **Fresh Lead (custom skill):** package current objective, references, and constraints
- Validate the new response against the original objective

::visual::
<img src="/images/fresh-lead-context-recovery.png" alt="Agent Mergewell using Fresh Lead to re-anchor a task with current objectives and verified references" />

<!--
Timebox: 3 minutes

Talk track: When a session has drifted, the instinct is to write a better prompt. A
longer one. A more careful one.
That's the wrong move. You're building on a foundation you already stopped
trusting.
Recovery means getting back to a starting point you trust.
Fresh Lead is our handoff procedure for that. It packages what you actually need to
carry forward — the current objective, verified references, constraints,
repository state, and how you'll validate. And to be clear about what it isn't: it
can't reset a product session by itself. You do that part.
You've got two options, and they're not equivalent. CLI `/compact` summarizes and
keeps going — convenient, but you will lose fine detail. A fresh session with a
deliberate handoff costs more effort and gives you a clean floor.
When the old context is genuinely untrusted, take the clean floor.
So what's the minimum you'd carry across?

Transition: The next slide puts all three together — packing, drift, recovery — in
one lifecycle.

Audience question: What is the minimum evidence you would carry into a fresh session so the task can continue safely?

Response guidance: Build the answer around current objective, repository state,
essential references, constraints, open questions, and validation. If someone wants
to bring the old conversation history along, ask what decision it would change.

Payoff: Learners leave with a concrete recovery packet rather than the vague instruction to “start over.”
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4; content/research/foundations-content-verification.md FND-12
-->

---
layout: single-panel
---

::title::
# Context Lifecycle: Pack, Detect Drift, Recover
::content::

<WorkshopVideo
  src="../assets/videos/foundations/context-window-lifecycle.mp4"
  poster="/images/context-lifecycle-static-plate.png"
  label="Context lifecycle video showing context packing, drift detection, and recovery"
  :autoplay="false"
  :loop="false"
  :muted="false"
  controls
/>

<!--
Timebox: 5 minutes

Talk track: I'm going to play this once, straight through, with its own audio.
Before I start it — here's what to watch for.
There's a moment where stale and duplicate evidence starts crowding out the actual
request. And the board isn't full. That's the point. Drift arrives well before you
run out of room.
Watch who does the work, too. Mergewell prunes what's no longer relevant. Mergewell
moves the old history into the archive rather than deleting it. Mergewell re-anchors
the objective, the essential evidence, the constraints, and the validation.
Not Purrmission. Not the software. Him.
And treat the whole sequence as a metaphor for deliberate human maintenance. It is
not automatic recovery, and it's not a view into hidden model state.
Watch for the signal where he should have stopped adding and started recovering.

Transition: Recovery restores your focus. Least privilege limits what that focused
task can actually touch.

Audience question: At what visible signal should Mergewell have stopped adding context and begun recovery?

Response guidance: After playback, take one or two answers tied to the stale knot
obscuring the request, the duplicate evidence, or a degrading focus signal. If
someone answers "when it got full," gently correct it — fullness was never the
trigger.
Payoff: The audience names the causal stop point in a full pack-to-recovery sequence instead of remembering isolated tips.
Sources: content/storyboards/foundations-visual-narrative/scenes/10-context-lifecycle-summary.md; content/modules/01-foundations/media/context-window-lifecycle-provenance.md; content/research/foundations-content-verification.md FND-12
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

Transition: Surfaces, context, evidence, permissions. You've got what you need. The
mission's next.

Audience question: For a one-file change, which permission or tool would you explicitly withhold?

Response guidance: Push participants to tie the withheld capability to the specific
task. Reinforce concrete examples — repository-wide writes, package installation,
network calls, secrets, destructive commands.
Payoff: Learners rehearse a concrete permission decision immediately before mission play.
Sources: content/modules/01-foundations/copilot-dev-foundations-workshop-part-2.md section 4; content/research/foundations-content-verification.md FND-13
-->

---
layout: two-panel
---

::title::
# Your Mission Starts Now
::text::

- Choose VS Code, Copilot CLI, or the GitHub Copilot app
- Hunt five clues and bank evidence with every point
- Try another Copilot gadget for bonus evidence
- Carry one bounded case file into Agentic Development

::visual::
<img src="/images/mission-readiness.png" alt="Agent Mergewell and Purrmission preparing learners to start the Foundations scavenger hunt" />

<!--
Timebox: 45 minutes

Talk track: Time to go to work. Open the Missions experience and pick your field
gadget — VS Code, Copilot CLI, or the standalone Copilot App.
One continuous mission. Five clues.
Start by creating the safe local practice case. Then bank evidence with every
single point you earn — a point without evidence doesn't count here, and that's
deliberate.
If you're not sure what the next safe action is, take a hint. I want to be
completely clear about this: hints never reduce your score. Not once, not ever.
Asking for help is not a penalty in this room.
Purrmission is watching for two things — anyone widening their access, and anyone
guessing at policy. She'll stop both.
The numbers. Fifty core points on the table. Forty completes the mission. One
optional route adds up to ten bonus.
And export your case file at the end. Do not skip that. The bounded follow-up task
inside it is your starting evidence for Agentic Development after the break.
Before you start — which gadget, and what's the first piece of evidence you're
going to record?

Transition: Start the forty-five-minute clock now. When I call time, have that
exported case file ready for Module 2.

Audience question: Which gadget are you choosing, and what is the first piece of evidence you will record?

Response guidance: Take a quick show of hands by gadget and point each group to its
matching route in Missions. If someone is blocked on setup, move them to the
approved fallback — do not invent commands or policy answers to unblock them.
Payoff: Every participant begins with a declared harness and evidence target, and the resulting case file creates the cross-module handoff.
Sources: content/missions/foundations/context-and-prompts.md; content/production/foundations-mission-scavenger-hunt-contract.md
-->

<style>
:global(.foundations-vscode-visual) {
  position: relative;
  width: 100%;
  height: 100%;
}

:global(.foundations-title-brand) {
  display: flex;
  min-height: 0;
  margin-top: auto;
  align-items: center;
  gap: 0.72rem;
}

:global(.foundations-title-brand__wordmark) {
  display: inline-flex;
  align-items: center;
  color: #228B4B;
  font-size: clamp(1.2rem, 1.8vw, 2rem);
  font-weight: 800;
  letter-spacing: 0.02em;
}

:global(.foundations-title-brand img) {
  width: min(18rem, 72%) !important;
  height: auto !important;
  max-height: 7rem !important;
  object-fit: contain;
  object-position: left bottom;
}

:global(.foundations-vscode-mark) {
  position: absolute;
  top: 7%;
  right: 9%;
  width: 18% !important;
  height: auto !important;
  padding: 1.1rem;
  border-radius: 1rem;
  background: #fffaf0;
  box-sizing: border-box;
  object-fit: contain;
}

:global(.foundations-diagram) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  width: 82%;
  padding: 2rem;
  border: 2px solid #d0d7de;
  border-radius: 1rem;
  color: #1f2328;
  background: #f6f8fa;
  text-align: center;
}

:global(.foundations-diagram strong) {
  grid-column: 1 / -1;
  color: #8250df;
  font-size: 1.35rem;
}

:global(.foundations-diagram span) {
  padding: 0.8rem;
  border-radius: 0.6rem;
  background: #ffffff;
}

:global(.foundations-review-placeholder) {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.72rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  border: 2px dashed rgba(31, 136, 61, 0.48);
  color: #1f2328;
  background:
    radial-gradient(circle at 82% 18%, rgba(130, 80, 223, 0.12), transparent 28%),
    linear-gradient(145deg, #fffaf0, #f3f8f4);
  text-align: center;
}

:global(.foundations-review-placeholder > span) {
  padding: 0.42rem 0.72rem;
  border-radius: 999px;
  color: #1a7f37;
  background: rgba(255,255,255,.86);
  border: 1px solid rgba(31, 136, 61, 0.32);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

:global(.foundations-review-placeholder strong) {
  max-width: 82%;
  font-size: 1.45rem;
  line-height: 1.08;
}

:global(.foundations-review-placeholder p) {
  max-width: 80%;
  margin: 0;
  color: #3b434d;
  font-size: .86rem;
  font-weight: 680;
  line-height: 1.3;
}

:global(.foundations-review-placeholder small) {
  max-width: 78%;
  color: #6e40c9;
  font-size: .64rem;
  font-weight: 650;
}

:global(.foundations-agent-ladder__labels) {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  width: 80%;
}

:global(.foundations-agent-ladder__labels span) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.42rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(31, 35, 40, 0.14);
  color: #1f2328;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

:global(.foundations-evidence-handoff) {
  position: relative;
  width: 100%;
  height: 100%;
}

:global(.foundations-evidence-handoff img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

:global(.foundations-evidence-handoff__label) {
  position: absolute;
  top: 46.5%;
  left: 53.5%;
  transform: translate(-50%, -50%) rotate(11deg);
  padding: 0.24rem 0.48rem;
  border: 1px solid rgba(31, 35, 40, 0.2);
  border-radius: 0.3rem;
  color: #1f2328;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 0.15rem 0.4rem rgba(31, 35, 40, 0.14);
  font-size: 0.58rem;
  font-weight: 760;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

:global(.foundations-surface-choice) {
  position: relative;
  width: 100%;
  height: 100%;
}

:global(.foundations-surface-choice img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

:global(.foundations-surface-choice__labels) {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

:global(.foundations-surface-choice__labels span) {
  position: absolute;
  padding: 0.22rem 0.45rem;
  border: 1px solid rgba(31, 136, 61, 0.3);
  border-radius: 999px;
  color: #1f2328;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 0.12rem 0.35rem rgba(31, 35, 40, 0.12);
  font-size: 0.52rem;
  font-weight: 760;
  white-space: nowrap;
}

:global(.foundations-surface-choice__labels span:nth-child(1)) {
  top: 28%;
  left: 6%;
}

:global(.foundations-surface-choice__labels span:nth-child(2)) {
  top: 10%;
  left: 47%;
}

:global(.foundations-surface-choice__labels span:nth-child(3)) {
  top: 28%;
  right: 3%;
}

:global(.foundations-surface-choice__labels span:nth-child(4)) {
  bottom: 7%;
  left: 42%;
}

:global(.ghcp-two-panel__text .foundations-compact li) {
  margin: 0.22rem 0;
  font-size: calc(0.92rem * var(--ghcp-panel-scale));
  line-height: 1.2;
}

:global(.ghcp-two-panel__text .foundations-agenda) {
  height: 100%;
  min-height: 0;
  padding: 0.25rem 0.35rem 0.25rem 0;
}

:global(.ghcp-two-panel__text .foundations-agenda ul) {
  display: grid;
  grid-template-rows: repeat(5, minmax(0, 1fr));
  gap: 0;
  height: 100%;
  margin: 0;
  padding-left: 1.2rem;
}

:global(.ghcp-two-panel__text .foundations-agenda li) {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.42rem 0.1rem;
  border-bottom: 1px solid rgba(84, 94, 108, 0.18);
  font-size: calc(0.94rem * var(--ghcp-panel-scale));
  line-height: 1.32;
  text-align: left;
}

:global(.ghcp-two-panel__text .foundations-agenda li:last-child) {
  border-bottom: 0;
}

:global(.foundations-model-guide) {
  display: grid;
  grid-template-rows: auto auto;
  gap: 0.5rem;
  height: auto;
}

:global(.foundations-model-guide table) {
  margin: 0;
  table-layout: fixed;
  font-size: calc(0.82rem * var(--ghcp-content-scale));
  line-height: 1.18;
}

:global(.foundations-model-guide th:first-child),
:global(.foundations-model-guide td:first-child) {
  width: 38%;
}

:global(.foundations-model-guide th),
:global(.foundations-model-guide td) {
  padding: calc(0.3rem * var(--ghcp-content-scale)) calc(0.6rem * var(--ghcp-content-scale));
  vertical-align: middle;
}

:global(.foundations-model-guide .ghcp-callout) {
  margin-top: 0;
  padding: 0.34rem 0.68rem;
  font-size: calc(0.66rem * var(--ghcp-content-scale));
  line-height: 1.22;
}

</style>
