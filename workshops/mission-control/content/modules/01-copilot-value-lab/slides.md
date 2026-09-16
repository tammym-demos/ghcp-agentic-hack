---
theme: ghcp
title: "Mission Control: The Copilot Value"
info: "Local technical review only. Architect and leadership decision workshop; not teaching or release acceptance."
author: ""
favicon: "data:,"
canvasWidth: 960
aspectRatio: 16/9
colorSchema: light
fonts:
  provider: none
  sans: Mona Sans
  local: Mona Sans, Segoe UI, Arial
drawings:
  enabled: false
download: false
transition: none
layout: advanced-cover
class: mc mc-cover
---

# Mission Control: The Copilot Value

<p class="mc-tagline" data-slide-id="S01">Govern the spend.<br>Guide the work.<br>Prove the value.</p>

<p class="mc-cover-status">Architect + leadership decision workshop<br>Local technical review only.</p>

::visual::

<div class="mc-opening-visual">
  <img class="mc-opening-art" src="/images/mission-control-opening-team-v7.png" width="1248" height="832" alt="The fictional teaching team: Agent Mergewell at left, Purrmission the cat, Chief Charter at center, and Riley Relay with mechanical forearms and lower legs at right." />
  <dl class="mc-cast">
    <div><dt>Agent Mergewell</dt><dd>Accountable human engineer</dd></div>
    <div><dt>Purrmission</dt><dd>Boundary signal</dd></div>
    <div><dt>Chief Charter</dt><dd>Organizational sponsor</dd></div>
    <div><dt>Riley Relay</dt><dd>Bounded agent collaborator</dd></div>
  </dl>
</div>

<!--
Timebox: 1 minute

Talk track: Welcome to Mission Control: The Copilot Value. Which word matters most today: spend, work, or value? Our aim is to govern the spend, guide the work, and prove the value. Meet the fictional teaching team, from left to right. Agent Mergewell is the accountable human engineer. Purrmission signals a boundary. Chief Charter is the organizational sponsor. Riley Relay is a bounded agent collaborator. Today you will use those perspectives to turn consumption evidence into an actionable pilot decision.

Transition: Put the teaching team aside for a moment. Start with the workflow and decision that brought you here.

Audience question: Which word matters most today: spend, work, or value?

Response guidance: If someone answers, say, “Keep that word beside the decision you want to make.” If nobody answers, say, “Choose one privately; we will connect all three.”

Payoff: You can recognize the teaching roles and the day’s business purpose before beginning the decision work.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s01-opening-and-cast-introduction
-->

---
layout: two-panel
class: mc mc-kickoff
---

::title::

# Introductions and today's agenda

<div class="mc-meta"><span>S01A · Mission briefing</span><span>09:01–09:06 · 5 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S01A">
  <h2>Introduce yourself</h2>
  <p>Share your name, role, and one desired decision or outcome for today.</p>
  <div class="mc-callout">Pairs or tables · 3 minutes total</div>
  <p class="mc-bottom">Carry that decision into the mission brief.</p>
</div>

::visual::

<div class="mc-stack mc-agenda">
  <h2>One working day</h2>
  <div class="mc-agenda-group"><h3>Morning</h3><p>Mission briefing · Capacity versus leverage · Four paths to AI ROI · Optimize current usage</p></div>
  <div class="mc-agenda-group"><h3>Afternoon</h3><p>CSX optimization · Investment · Bounded pilot · Operating model · Scorecard, gates, and readout</p></div>
  <div class="mc-agenda-group"><h3>Breaks / lunch</h3><p>10:15 break · 12:15 lunch · 14:15 break</p></div>
</div>

<!--
Timebox: 5 minutes

Talk track: What decision or outcome would make this day useful to you? Share your name, role, and that desired result with a partner or your table. You have three minutes total, so keep the introduction short and make the decision concrete. This morning we will define the mission, separate capacity from leverage, choose an ROI path, and examine current usage. This afternoon we will prioritize a CSX optimization, choose an investment approach, bound a pilot, assign enterprise decision rights, build a scorecard, and set the final gates. This is an interactive leadership workshop, not a hands-on application lab. The three break windows stay protected.

Transition: Carry your desired decision into the mission brief and connect it to one workflow.

Audience question: What decision or outcome would make this day useful to you?

Response guidance: If the group is large, say, “Use pairs or tables; we will not take a full-room introduction from everyone.” If the outcome is broad, say, “Name the decision that outcome should inform.”

Payoff: You have a desired decision and can see where the day will turn it into an actionable pilot package.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s01a-introductions-and-todays-agenda
-->

---
layout: two-panel
class: mc
---

::title::

# Define the mission

<div class="mc-meta"><span>S02 · Mission briefing</span><span>09:06–09:30 · 24 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S02">
  <h2>Choose one workflow</h2>
  <p>Anchor the day in an engineering workflow and the business outcome it serves.</p>
  <div class="mc-field"><b>Mission brief</b><span>For workflow ___, the business outcome is ___;<br>completed currently means ___;<br>the decision we need to make is ___.</span></div>
  <p class="mc-small">Do not invent agreement or baseline values.</p>
</div>

::visual::

<div class="mc-stack">
  <h2>Make the decision usable</h2>
  <div class="mc-output-grid mc-output-grid--mission">
    <div class="mc-output"><b>Decision owner</b><span>Who has authority?</span></div>
    <div class="mc-output"><b>Completion boundary</b><span>Where does “done” end today?</span></div>
    <div class="mc-output"><b>Evidence available</b><span>What can you support?</span></div>
    <div class="mc-output"><b>Evidence missing</b><span>What remains unknown?</span></div>
  </div>
  <div class="mc-callout">Missing evidence is a decision gap, not permission to make up data.</div>
</div>

<!--
Timebox: 24 minutes

Talk track: Which workflow and decision should we carry through the whole day? Use four minutes to frame the mission brief. Name the workflow, the business outcome, what completed currently means, and the decision you need to make. Then take twelve minutes to draft and compare briefs. Ask whether the completion boundary is code, a pull request, a story, a release, or a business outcome. Name the decision owner, the evidence you already have, and the evidence that is missing. Use the final eight minutes to select the workflow you will carry forward and preserve unresolved owner or evidence gaps. A missing baseline is useful information. It is not a reason to invent one.

Transition: Keep the mission brief visible. We will now test whether the measures around that workflow describe capacity or real leverage.

Audience question: Where does “completed” end for your selected workflow today?

Response guidance: If the group starts with a product feature, say, “What organizational decision would that feature inform?” If the owner is unknown, say, “Write the accountable function and mark the person unresolved.”

Payoff: You have one decision-shaped mission brief with a completion boundary, owner, and honest evidence gaps.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s02-define-the-mission
-->

---
layout: two-panel
class: mc
---

::title::

# Capacity is not leverage

<div class="mc-meta"><span>S03 · Capacity versus leverage</span><span>09:30–09:45 · 15 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S03">
  <p class="mc-kicker">Activity can rise while value waits</p>
  <div class="mc-measure-list">
    <div><b>Attempted work</b><span>Tasks started or prompted</span></div>
    <div><b>Delegated work</b><span>Work assigned to AI or agents</span></div>
    <div class="mc-measure-list--complete"><b>Completed work</b><span>Accepted across your chosen boundary</span></div>
  </div>
  <p class="mc-small">Attempts, generated output, and token usage may describe capacity or consumption. They are not leverage by themselves.</p>
</div>

::visual::

<div class="mc-stack mc-formula-panel">
  <p class="mc-kicker">Use the agreed boundary</p>
  <div class="mc-formula"><span>Developer leverage</span><strong>=</strong><span class="mc-fraction"><b>completed work</b><i>developer hours</i></span></div>
  <div class="mc-field"><b>Classify one measure</b><span>Measure ___<br>Capacity / activity or leverage evidence? ___<br>Why? ___</span></div>
</div>

<!--
Timebox: 15 minutes

Talk track: Which measure in your current reporting could be mistaken for leverage? Attempted work shows what started. Delegated work shows what moved to an AI system or agent. Neither tells us that the work crossed your completion boundary. Developer leverage equals completed work divided by developer hours. The numerator is accepted work at the boundary you chose; the denominator is developer hours, not AI activity. Use five minutes to teach that distinction, six minutes to classify example measures, and four minutes to discuss what completed must mean for your workflow. More generations or consumption may show capacity or activity. They do not establish leverage.

Transition: The formula depends on a defensible numerator. Next, make the completion boundary explicit from code to business outcome.

Audience question: Which familiar activity measure must not be counted as completed work?

Response guidance: If someone offers lines of code or prompts, say, “What accepted outcome crossed the boundary?” If hours saved are assumed, say, “What comparable developer-hour evidence supports that conclusion?”

Payoff: You can separate activity from leverage and define the numerator that the pilot must measure.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s03-capacity-is-not-leverage
-->

---
layout: two-panel
class: mc
---

::title::

# Define the completion boundary

<div class="mc-meta"><span>S04 · Capacity versus leverage</span><span>09:45–10:00 · 15 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S04">
  <h2>Where does “done” count?</h2>
  <p>A local coding gain can disappear before the customer or business outcome arrives.</p>
  <div class="mc-field"><b>Select the pilot boundary</b><span>Current completion boundary ___<br>Desired completion boundary ___<br>Acceptance evidence ___</span></div>
  <div class="mc-callout">Constraints accumulate across the chain.</div>
</div>

::visual::

<div class="mc-stack mc-boundary">
  <p class="mc-kicker">Trace accepted work end to end</p>
  <div class="mc-chain" aria-label="Code to business outcome completion chain">
    <div><b>code</b><span>built</span></div><i>→</i>
    <div><b>PR</b><span>reviewed</span></div><i>→</i>
    <div><b>story</b><span>accepted</span></div><i>→</i>
    <div><b>release</b><span>operating</span></div><i>→</i>
    <div><b>business outcome</b><span>evidenced</span></div>
  </div>
  <div class="mc-boundary-line"><span>Mark your boundary ↑</span><b>What proves work crossed it?</b></div>
</div>

<!--
Timebox: 15 minutes

Talk track: Where should completed work count for your pilot? Follow the chain from code to pull request, story, release, and business outcome. Each step adds constraints and evidence. A code suggestion can be useful without becoming an accepted pull request. A merged pull request can still wait for integration, release, or business adoption. Use five minutes to explain the chain and accumulating constraints. Give participants six minutes to mark their current and desired completion boundaries. Use the final four minutes to compare the acceptance evidence needed at each boundary. The right boundary is the one that matches the decision, not automatically the last box.

Transition: Keep the selected boundary. We will now look for the places where attempted or delegated work fails to cross it.

Audience question: What evidence proves that work crossed your selected completion boundary?

Response guidance: If everyone chooses business outcome, say, “Is that measurable within the pilot window?” If the boundary is code, say, “Which downstream decision can that evidence legitimately support?”

Payoff: You have a completion boundary and acceptance evidence that make the leverage formula testable.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s04-define-the-completion-boundary
-->

---
layout: two-panel
class: mc
---

::title::

# Find where leverage is lost

<div class="mc-meta"><span>S05 · Capacity versus leverage</span><span>10:00–10:15 · 15 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S05">
  <h2>Map the loss points</h2>
  <p>Where does work queue, return for rework, or stop before your boundary?</p>
  <div class="mc-field"><b>Workflow evidence</b><span>Dominant loss point ___<br>What happens there ___<br>Evidence available / missing ___</span></div>
  <p class="mc-small">A participant example is a workflow observation, not a general product claim.</p>
</div>

::visual::

<div class="mc-stack">
  <p class="mc-kicker">Seven places to inspect</p>
  <div class="mc-loss-grid">
    <div>integration</div><div>testing</div><div>review</div><div>dependencies</div>
    <div>risk / compliance</div><div>coordination</div><div>waiting</div>
  </div>
  <div class="mc-priority-rule"><b>Carry forward</b><span>One prioritized constraint</span><small>Record the evidence gap that keeps the diagnosis honest.</small></div>
</div>

<!--
Timebox: 15 minutes

Talk track: Where does work lose leverage before it reaches your boundary? We will inspect seven areas: integration, testing, review, dependencies, risk and compliance, coordination, and waiting. Use two minutes to frame the list. Then spend nine minutes mapping the selected workflow. Look for work that queues, returns for rework, or stops. Ask what evidence shows the loss rather than relying only on frustration or anecdote. Use the final four minutes to choose one dominant constraint and record the evidence gap around it. Keep the example local to this workflow; do not turn one participant’s experience into a broad claim.

Transition: Save the prioritized constraint. After the break, we will connect it to one of four paths to return on AI investment.

Audience question: Which loss point most often prevents work from crossing your completion boundary?

Response guidance: If several points compete, say, “Choose the one that most limits completed work and note the others as dependencies.” If evidence is weak, say, “Keep the diagnosis tentative and name what you need to observe.”

Payoff: You have a leverage-loss map with one prioritized constraint and an explicit evidence gap.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s05-find-where-leverage-is-lost
-->

---
layout: section
class: mc mc-break
---

<div data-slide-id="U01">
  <p class="mc-kicker">10:15–10:30 · 15 minutes</p>

# Break

  <p class="mc-return">Back at <b>10:30</b></p>
  <div class="mc-break-rule"></div>
  <p>Next: Four paths to AI ROI</p>
</div>

<!--
Timebox: 15 minutes

Talk track: We are taking the full fifteen-minute break. What time will we be back? Ten thirty. There is no homework during the break. Keep your mission brief and prioritized constraint for the next discussion.

Transition: At 10:30, return for four paths to AI ROI.

Audience question: What is our return time?

Response guidance: If anyone is unsure, say, “Ten thirty; the return time stays on screen.” Release the room and keep the remainder silent.

Payoff: The full break is protected without adding hidden participant work.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#u01-break
-->

---
layout: single-panel
class: mc
---

::title::

# Four paths to AI ROI

<div class="mc-meta"><span>S06 · Four paths to AI ROI</span><span>10:30–10:45 · 15 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S06">
  <p class="mc-kicker">Four distinct decision hypotheses</p>
  <div class="mc-roi-grid">
    <div><b>Labor efficiency</b><span>Less developer effort for the same accepted outcome</span><small>Evidence: effort + valid completion</small></div>
    <div><b>Higher throughput</b><span>More accepted outcomes through the same bounded system</span><small>Evidence: rate + quality boundary</small></div>
    <div><b>Expanded ownership</b><span>A practical increase in what a person or team can responsibly complete</span><small>Evidence: scope + checkpoints</small></div>
    <div><b>Compounding capability</b><span>Reusable learning, patterns, evaluation, or operating capability</span><small>Evidence: later-work effect</small></div>
  </div>
  <div class="mc-callout">More activity or consumption does not establish any path.</div>
</div>

<!--
Timebox: 15 minutes

Talk track: Which path best describes the value you are actually trying to create? Labor efficiency means less developer effort for the same accepted outcome. Higher throughput means more accepted outcomes through the same bounded system. Expanded ownership means a practical increase in what a person or team can responsibly complete. Compounding capability means reusable learning, patterns, evaluation, or operating capability that improves later work. Use six minutes to explain those distinctions, five minutes to map examples to the paths, and four minutes to discuss overlaps and evidence needs. These are hypotheses for a decision, not guaranteed outcomes. More activity or consumption does not prove any of them.

Transition: Use this vocabulary with your mission brief. Next, choose a primary path and a secondary path without double-counting value.

Audience question: Which path most directly matches the business outcome in your mission brief?

Response guidance: If an example fits several paths, say, “Choose the dominant decision hypothesis and record the others as possible secondary effects.” If activity is offered as evidence, say, “What accepted outcome changed?”

Payoff: You now share four precise ways to discuss AI return without treating consumption as value.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s06-four-paths-to-ai-roi
-->

---
layout: two-panel
class: mc
---

::title::

# Match the path to the outcome

<div class="mc-meta"><span>S07 · Four paths to AI ROI</span><span>10:45–11:00 · 15 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S07">
  <h2>Choose the dominant hypothesis</h2>
  <div class="mc-field"><b>Primary ROI path</b><span>Business outcome ___<br>Primary path ___ because ___</span></div>
  <p>The primary path sets the dominant outcome and scorecard emphasis.</p>
</div>

::visual::

<div class="mc-stack">
  <h2>Keep an additional effect visible</h2>
  <div class="mc-field"><b>Secondary ROI path</b><span>Secondary path ___ because ___<br>Evidence that would distinguish them ___</span></div>
  <div class="mc-callout">Do not count the same accepted outcome twice.</div>
  <p class="mc-small">Challenge whether the proposed evidence reflects activity or an accepted outcome.</p>
</div>

<!--
Timebox: 15 minutes

Talk track: What is the primary ROI path for the workflow in your mission brief? The primary path is the dominant hypothesis. It determines the main outcome and where the scorecard should focus. A secondary path records a plausible additional effect without counting the same outcome twice. Use three minutes to frame that distinction. Give participants eight minutes to select and justify both paths. Ask them to name the evidence that would distinguish the two. Use the final four minutes to challenge whether the proposed evidence reflects an accepted outcome or merely activity. “Because we used it more” is not enough.

Transition: The path says how value might arise. Now identify the factor that most limits that path in the current workflow.

Audience question: What evidence would distinguish your primary ROI path from the secondary path?

Response guidance: If both paths use the same evidence, say, “Clarify the separate outcome each path predicts, or choose only one.” If the choice is uncertain, say, “Record the primary as a hypothesis and state what would change it.”

Payoff: You have a primary and secondary ROI path with a rationale that avoids double-counting.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s07-match-the-path-to-the-outcome
-->

---
layout: single-panel
class: mc
---

::title::

# Name the limiting factor

<div class="mc-meta"><span>S08 · Four paths to AI ROI</span><span>11:00–11:15 · 15 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S08">
  <p class="mc-kicker">Diagnose the constraint; do not remove necessary work</p>
  <div class="mc-factor-grid">
    <div><b>Essential human work</b><span>Judgment, accountability, or review that must remain human</span></div>
    <div><b>Process structure</b><span>Workflow design, queues, handoffs, and acceptance</span></div>
    <div><b>Practical ownership scope</b><span>What a person or team can responsibly complete</span></div>
    <div><b>Organizational learning / adaptability</b><span>How quickly evidence becomes reusable practice</span></div>
  </div>
  <div class="mc-field mc-inline-field"><b>Primary limiting factor</b><span>Factor ___ · rationale ___ · evidence that would show it moved ___ · uncertainty ___</span></div>
</div>

<!--
Timebox: 15 minutes

Talk track: Which factor currently limits your selected ROI path? Essential human work is judgment, accountability, or review that must remain human. Process structure covers the workflow, queues, handoffs, and acceptance. Practical ownership scope is what a person or team can responsibly complete. Organizational learning and adaptability describe how evidence becomes reusable practice. Use four minutes to define the four factors, seven minutes to diagnose the selected workflow, and four minutes to compare diagnoses and record uncertainty. A limiting factor is a testable diagnosis. It is not a reason to remove necessary human, quality, risk, or compliance work.

Transition: Keep the limiting factor beside the ROI path. We will use both to make a model choice based on the work, not on a volatile product claim.

Audience question: What evidence would show that your limiting factor moved?

Response guidance: If the answer is “remove review,” say, “Which review is essential, and how could the process around it improve?” If diagnoses differ, say, “Record the uncertainty and the evidence that would resolve it.”

Payoff: You have one limiting-factor hypothesis, its rationale, and an evidence need.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s08-name-the-limiting-factor
-->

---
layout: two-panel
class: mc
---

::title::

# Select the model for the work

<div class="mc-meta"><span>S09 · Optimize current usage</span><span>11:15–11:35 · 20 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S09">
  <h2>Start with the task</h2>
  <div class="mc-criteria">
    <div><b>Complexity</b><span>How much reasoning?</span></div>
    <div><b>Context</b><span>What must be known?</span></div>
    <div><b>Risk</b><span>What could go wrong?</span></div>
    <div><b>Validation</b><span>How will you know?</span></div>
    <div><b>Expected value</b><span>What outcome justifies effort?</span></div>
  </div>
</div>

::visual::

<div class="mc-stack">
  <h2>Record a reviewable rationale</h2>
  <div class="mc-field"><b>Decision sequence</b><span>Task ___ · complexity ___ · context needed ___<br>risk ___ · validation required ___ · expected value ___<br>approved model choice ___ · reason to revisit ___</span></div>
  <div class="mc-callout">Compare only approved and available choices at delivery time.</div>
  <p class="mc-small">No volatile price, multiplier, entitlement, quota, availability, or enforcement claim.</p>
</div>

<!--
Timebox: 20 minutes

Talk track: What does this task require before anyone names a model? Consider task complexity, required context, risk, validation effort, and expected value. A harder task may justify more capability, but only if the expected value and validation plan support it. A lower-risk task may need less. Use six minutes to explain the criteria, ten minutes to compare guided examples, and four minutes to debrief how validation and expected value affect the choice. Record the approved model choice and a reason to revisit it. Compare only choices that the organization has approved and made available at delivery time. We are not using prices, multipliers, entitlements, quotas, or availability claims here.

Transition: A defensible model choice is one lever. Next, inspect workflow patterns that can consume work without improving completion.

Audience question: Which criterion is most likely to change your current model choice?

Response guidance: If someone chooses the most capable model by default, say, “Which task requirement and expected value justify it?” If availability is uncertain, say, “Record the required capability, then verify approved choices later.”

Payoff: You have a model-selection rationale that can be reviewed without relying on volatile product claims.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s09-select-the-model-for-the-work
-->

---
layout: two-panel
class: mc
---

::title::

# Find high-consumption workflow patterns

<div class="mc-meta"><span>S10 · Optimize current usage</span><span>11:35–11:55 · 20 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S10">
  <h2>Look for diagnostic signals</h2>
  <div class="mc-pattern-grid">
    <span>oversized / irrelevant context</span>
    <span>retries</span>
    <span>unclear acceptance</span>
    <span>broad agent scope</span>
    <span>unnecessary output</span>
    <span>review queues</span>
    <span>abandoned work</span>
  </div>
</div>

::visual::

<div class="mc-stack">
  <h2>Connect pattern to leverage</h2>
  <div class="mc-node"><b>Pattern observed</b><span>What repeats? ___</span></div>
  <div class="mc-node mc-node--linked"><b>Boundary effect</b><span>Where can completion slow or fail? ___</span></div>
  <div class="mc-node mc-node--linked mc-node--green"><b>Evidence before change</b><span>What makes the pattern material and controllable? ___</span></div>
  <p class="mc-small">High consumption is a signal to investigate, not proof of waste.</p>
</div>

<!--
Timebox: 20 minutes

Talk track: Which pattern is material in the workflow you selected? Look for oversized or irrelevant context, retries, unclear acceptance, broad agent scope, unnecessary output, review queues, and abandoned work. Use five minutes to introduce the patterns. Then take ten minutes to diagnose guided examples. For each example, connect the pattern to the completion boundary and the limiting factor. Ask what evidence is needed before changing it. Use the final five minutes to compare which pattern is both material and controllable. High consumption is a diagnostic signal. It does not prove waste, poor quality, or a product defect.

Transition: Carry one pattern and its evidence limitation into a controlled experiment and a budget-control decision.

Audience question: Which pattern could materially affect completion and still be changed within your control?

Response guidance: If the group labels all consumption waste, say, “What outcome, intervention, or rework evidence supports that?” If the pattern is outside the team’s control, say, “Record it as a dependency and choose a controllable lever.”

Payoff: You have one high-consumption pattern, its likely leverage effect, and an honest evidence limitation.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s10-find-high-consumption-workflow-patterns
-->

---
layout: single-panel
class: mc
---

::title::

# Control the budget and test the change

<div class="mc-meta"><span>S11 · Optimize current usage</span><span>11:55–12:15 · 20 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S11">
  <div class="mc-control-ladder" aria-label="Budget control ladder">
    <div><b>forecast</b><span>see likely demand</span></div><i>→</i>
    <div><b>notification</b><span>inform an owner</span></div><i>→</i>
    <div><b>review threshold</b><span>trigger a decision</span></div><i>→</i>
    <div><b>time-boxed exception</b><span>own + expire</span></div><i>→</i>
    <div><b>supported enforced stop</b><span>block only where supported</span></div>
  </div>
  <div class="mc-method">
    <p class="mc-kicker">Controlled optimization method</p>
    <p><b>baseline current pattern</b> → change one meaningful lever → hold task and acceptance criteria constant → compare completion, intervention, quality, time and cost → <b>keep, revise or stop</b></p>
  </div>
  <div class="mc-experiment-grid"><div><b>Baseline</b><span>___</span></div><div><b>Change</b><span>___</span></div><div><b>Evidence</b><span>___</span></div><div><b>Decision</b><span>keep / revise / stop</span></div></div>
  <p class="mc-small">An alert informs an owner. A supported enforced stop blocks an action. One run, lower usage, or lower cost does not establish a better outcome.</p>
</div>

<!--
Timebox: 20 minutes

Talk track: What is the lightest control that supports a responsible decision? Move through the ladder in order: forecast, notification, review threshold, time-boxed exception, and supported enforced stop. An alert informs an owner. A stop blocks an action only where the delivered product supports it. Then apply the optimization method exactly: baseline the current pattern, change one meaningful lever, hold the task and acceptance criteria constant, compare completion, intervention, quality, time, and cost, then keep, revise, or stop. Use five minutes to explain the ladder and method, ten minutes to construct a guided comparison, and five minutes to test whether the proposed evidence supports the decision. One run, lower usage, or lower cost is not enough.

Transition: Keep this experiment frame. After lunch, you will use it to prioritize a current-state CSX optimization.

Audience question: Which control and one meaningful lever would you test first?

Response guidance: If a hard stop is chosen first, say, “What forecast, notification, or review threshold could support the decision with less disruption?” If several levers change, say, “Separate the experiments.”

Payoff: You have a controlled optimization frame and a proportionate budget-control ladder.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s11-control-the-budget-and-test-the-change
-->

---
layout: section
class: mc mc-break
---

<div data-slide-id="U02">
  <p class="mc-kicker">12:15–13:00 · 45 minutes</p>

# Lunch

  <p class="mc-return">Back at <b>13:00</b></p>
  <div class="mc-break-rule"></div>
  <p>Next: CSX current-state optimization</p>
</div>

<!--
Timebox: 45 minutes

Talk track: We are taking the full forty-five minutes for lunch. What time will we return? One o’clock. There is no installation, homework, or required task during lunch. Keep your experiment frame for the afternoon decision work.

Transition: At 13:00, return for the CSX current-state optimization discussion.

Audience question: What is our return time?

Response guidance: If anyone is unsure, say, “One o’clock; the return time remains on screen.” Release the room and leave the card visible.

Payoff: Lunch remains a protected break rather than becoming unplanned workshop work.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#u02-lunch
-->

---
layout: two-panel
class: mc mc-canvas-slide
---

::title::

# Prioritize CSX optimization changes

<div class="mc-meta"><span>S12 · CSX current-state optimization</span><span>13:00–13:45 · 45 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S12">
  <p class="mc-kicker">Describe → change → compare</p>
  <div class="mc-canvas-grid">
    <div class="mc-canvas-field"><b>Current pattern</b><span>What happens now, without judging it?</span><em>___</em></div>
    <div class="mc-canvas-field"><b>Lever</b><span>What one meaningful factor could change?</span><em>___</em></div>
    <div class="mc-canvas-field"><b>Baseline</b><span>What comparable starting evidence exists?</span><em>___</em></div>
    <div class="mc-canvas-field"><b>Expected effect</b><span>Which completion, intervention, quality, time, or cost measure should move?</span><em>___</em></div>
  </div>
</div>

::visual::

<div class="mc-stack">
  <p class="mc-kicker">Evidence → ownership → decision</p>
  <div class="mc-canvas-grid">
    <div class="mc-canvas-field"><b>Evidence source</b><span>Where will comparable evidence come from?</span><em>___</em></div>
    <div class="mc-canvas-field"><b>Owner</b><span>Who owns the change and the evidence?</span><em>___</em></div>
    <div class="mc-canvas-field"><b>Limitation</b><span>What prevents a confident conclusion?</span><em>___</em></div>
    <div class="mc-canvas-field mc-canvas-field--decision"><b>Decision</b><span>Keep, revise or stop?</span><em>___</em></div>
  </div>
  <div class="mc-priority-rule"><b>Prioritize by</b><span>Expected leverage · evidence quality · feasibility · risk</span><small>Hold task and acceptance criteria constant; raw consumption alone does not set the priority.</small></div>
</div>

<!--
Timebox: 45 minutes

Talk track: Which current pattern is worth changing first? Describe what happens now without judging it. Then choose one meaningful lever. Keep the task and acceptance criteria constant so the comparison remains useful. Name the baseline and the effect you expect across completion, intervention, quality, time, or cost. After five minutes of framing, use thirty minutes to discuss candidate changes and complete both sides of the canvas. Every candidate needs a comparable evidence source, an owner, and a limitation. Use the final ten minutes to prioritize by expected leverage, evidence quality, feasibility, and risk. Consumption may point to a question, but it does not decide the priority. End with clear keep, revise, or stop criteria.

Transition: Carry the prioritized change and its evidence limit into the investment decision.

Audience question: Which one meaningful lever could improve leverage without changing the task or acceptance criteria?

Response guidance: If the group starts with a solution, say, “First describe the current pattern and baseline.” If several levers appear, say, “Split them into separate candidates.” If evidence is missing, say, “Record the gap as a limitation rather than inventing a baseline.”

Payoff: You leave with one prioritized optimization change, its owner, evidence source, limitation, and keep, revise, or stop criteria.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s12-prioritize-csx-optimization-changes
-->

---
layout: single-panel
class: mc
---

::title::

# Choose the investment approach

<div class="mc-meta"><span>S13 · Investment and budget decisions</span><span>13:45–14:15 · 30 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S13">
  <div class="mc-cost-split"><div><b>Fixed licenses</b><span>Committed access cost</span></div><strong>+</strong><div><b>Variable usage</b><span>Consumption that changes with work</span></div></div>
  <div class="mc-funding-grid">
    <div><p class="mc-kicker">Learn</p><b>Exploration funding</b><span>Bounded learning before reliability is known</span></div>
    <div><p class="mc-kicker">Operate</p><b>Production funding</b><span>Reliable, governed work with demonstrated leverage</span></div>
    <div><p class="mc-kicker">Exception</p><b>Exception funding</b><span>Time-boxed need outside normal allocation</span></div>
  </div>
  <div class="mc-credit-life"><b>Credit lifecycle</b><span>forecast → allocate → observe → notify → review → adjust or expire</span></div>
  <div class="mc-field mc-inline-field"><b>Investment decision</b><span>Purpose ___ · fixed / variable ___ · owner ___ · alert / review threshold ___ · exception path ___ · expansion condition ___</span></div>
  <p class="mc-small">Alert ≠ supported enforced stop. Expand funding only after reliability and leverage are demonstrated.</p>
</div>

<!--
Timebox: 30 minutes

Talk track: What are you funding: access, variable use, learning, reliable production, or an exception? Start by separating fixed licenses from variable usage. Then distinguish three purposes. Exploration funding buys bounded learning before reliability is known. Production funding supports reliable, governed work with demonstrated leverage. Exception funding supports a time-boxed need outside the normal allocation. Use seven minutes to explain the purposes and the credit lifecycle: forecast, allocate, observe, notify, review, then adjust or expire. Give participants fifteen minutes to assign the prioritized change to an approach. Use the final eight minutes to decide the review threshold, exception path, funding evidence, owner, and expansion condition. An alert informs; a supported enforced stop blocks only where supported.

Transition: Save the funding purpose and expansion condition. After the break, use them to bound the pilot and agent deployment.

Audience question: Which funding purpose fits the evidence you have today?

Response guidance: If production funding is chosen without reliability evidence, say, “What must the exploration prove first?” If fixed and variable costs are combined, say, “Separate committed access from use that changes with the workflow.”

Payoff: You have a funding approach with purpose, owner, review behavior, and an evidence-based expansion condition.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s13-choose-the-investment-approach
-->

---
layout: section
class: mc mc-break
---

<div data-slide-id="U03">
  <p class="mc-kicker">14:15–14:30 · 15 minutes</p>

# Break

  <p class="mc-return">Back at <b>14:30</b></p>
  <div class="mc-break-rule"></div>
  <p>Next: Bound the pilot and agent deployment</p>
</div>

<!--
Timebox: 15 minutes

Talk track: Take the full fifteen-minute break. What time do we return? Two thirty. There is no required decision repair during the break. Keep the prioritized change and investment approach for the pilot canvas.

Transition: At 14:30, return to bound the pilot and agent deployment.

Audience question: What is our return time?

Response guidance: If anyone is unsure, say, “Two thirty; the return time stays on screen.” Release the room and keep the remainder silent.

Payoff: The final break remains protected before the enterprise pilot decisions.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#u03-break
-->

---
layout: single-panel
class: mc mc-pilot-slide
---

::title::

# Bound the pilot and agent deployment

<div class="mc-meta"><span>S14 · Pilot boundary</span><span>14:30–15:15 · 45 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S14">
  <p class="mc-kicker">Make every boundary operable</p>
  <div class="mc-pilot-grid">
    <div><b>Use case</b><span>Outcome + held task</span><em>___</em></div>
    <div><b>Participants</b><span>Who is in / out?</span><em>___</em></div>
    <div><b>Tools / models</b><span>Approved choice + logic</span><em>___</em></div>
    <div><b>Data boundary</b><span>Allowed + prohibited</span><em>___</em></div>
    <div><b>Human checkpoints</b><span>Who reviews what, when?</span><em>___</em></div>
    <div><b>Validation</b><span>Held acceptance criteria</span><em>___</em></div>
    <div><b>Exceptions</b><span>Owner + time box</span><em>___</em></div>
    <div><b>Stop conditions</b><span>What ends the run?</span><em>___</em></div>
    <div class="mc-pilot-grid--rollback"><b>Rollback</b><span>How does work return safely?</span><em>___</em></div>
  </div>
  <div class="mc-callout">Stop conditions and rollback are operational decisions, not decorative safety language.</div>
</div>

<!--
Timebox: 45 minutes

Talk track: What must be inside the pilot, and what must remain outside? Use five minutes to frame the nine fields. Name the use case and participants. Record approved tools or models and the selection logic, not a future entitlement. Set the data boundary. Define human checkpoints by naming who reviews what and when. Tie validation directly to the held acceptance criteria. Give every exception an owner and a time box. Make stop conditions observable and make rollback executable. Participants have twenty-eight minutes to define the pilot and agent boundary. Use the final twelve minutes to challenge scope, checkpoints, validation, exceptions, stopping, and rollback. A boundary is useful only if the operating team can act on it.

Transition: Carry the completed pilot boundary into the enterprise operating model and assign each decision right.

Audience question: Which stop condition would require the team to act immediately?

Response guidance: If a field says “follow policy,” say, “Name the specific boundary, reviewer, and action.” If rollback is vague, say, “What known operating path will restore the work, and who authorizes it?”

Payoff: You have a bounded pilot and agent-deployment definition that can be governed and stopped.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s14-bound-the-pilot-and-agent-deployment
-->

---
layout: two-panel
class: mc mc-operating-slide
---

::title::

# Orchestrate and operate at enterprise scale

<div class="mc-meta"><span>S15 · Enterprise operating model</span><span>15:15–16:00 · 45 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S15">
  <p class="mc-kicker">Decision-rights functions</p>
  <div class="mc-role-list">
    <div><b>Business owner</b><span>outcome + authority</span></div>
    <div><b>Engineering</b><span>workflow + validation</span></div>
    <div><b>Architecture</b><span>design + boundaries</span></div>
    <div><b>Platform governance</b><span>enablement + monitoring</span></div>
    <div><b>Security / compliance</b><span>risk + incident review</span></div>
    <div><b>Finance / FinOps</b><span>funding / observation + optimization</span></div>
  </div>
  <p class="mc-small">Finance funding remains distinct from FinOps observation and optimization.</p>
</div>

::visual::

<div class="mc-stack">
  <p class="mc-kicker">Production decision workflow</p>
  <div class="mc-operating-flow">
    <span>proposes</span><i>→</i><span>validates</span><i>→</i><span>approves boundary</span><i>→</i><span>funds</span>
    <span>enables</span><i>→</i><span>monitors</span><i>→</i><span>handles incident / exception</span><i>→</i><span>reviews expiry / escalation</span>
  </div>
  <div class="mc-rights"><b>Assign at each step</b><span>recommends · decides · executes · monitors · consulted</span></div>
  <div class="mc-field"><span>Unresolved handoff ___<br>Owner / evidence / escalation ___</span></div>
  <p class="mc-small">Policy decision rights are not proof of product permissions or implemented controls.</p>
</div>

<!--
Timebox: 45 minutes

Talk track: Where could this pilot wait because the next decision has no owner? Use eight minutes to explain the workflow: proposes, validates, approves the boundary, funds, enables, monitors, handles an incident or exception, then reviews expiry or escalation. Assign decision rights across the business owner, engineering, architecture, platform governance, security and compliance, and Finance and FinOps. Participants have twenty-five minutes to name who recommends, decides, executes, monitors, and is consulted at each step. Use twelve minutes to stress-test one incident, exception, expiry, or escalation. Keep Finance funding distinct from FinOps observation and optimization. Keep policy decisions distinct from product permissions. This canvas is an operating model, not evidence that a control already exists.

Transition: The operating model tells us who acts. Next, define the evidence that should change their pilot decision.

Audience question: Which handoff still lacks an owner, evidence, or escalation path?

Response guidance: If one function owns every step, say, “Which review must remain independent?” If monitoring ends at a dashboard, say, “Who receives the signal and what decision follows?”

Payoff: You have an enterprise operating model with explicit decision rights, handoffs, incidents, expiry, and escalation.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s15-orchestrate-and-operate-at-enterprise-scale
-->

---
layout: single-panel
class: mc mc-scorecard-slide
---

::title::

# Build the pilot scorecard

<div class="mc-meta"><span>S16 · Pilot scorecard</span><span>16:00–16:25 · 25 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S16">
  <p class="mc-kicker">Every measure needs baseline · source · owner · cadence · decision</p>
  <table class="mc-table mc-pilot-scorecard"><thead><tr><th>Measure</th><th>Baseline</th><th>Source</th><th>Owner</th><th>Cadence</th><th>Decision</th></tr></thead><tbody>
    <tr><th>Valid completion</th><td>___</td><td>___</td><td>___</td><td>___</td><td>___</td></tr>
    <tr><th>Developer intervention</th><td>___</td><td>___</td><td>___</td><td>___</td><td>___</td></tr>
    <tr><th>Cycle time</th><td>___</td><td>___</td><td>___</td><td>___</td><td>___</td></tr>
    <tr><th>Rework / quality</th><td>___</td><td>___</td><td>___</td><td>___</td><td>___</td></tr>
    <tr><th>AI cost per accepted outcome</th><td>___</td><td>___</td><td>___</td><td>___</td><td>___</td></tr>
    <tr><th>Operational risk</th><td>___</td><td>___</td><td>___</td><td>___</td><td>___</td></tr>
    <tr><th>Business outcome</th><td>___</td><td>___</td><td>___</td><td>___</td><td>___</td></tr>
  </tbody></table>
  <div class="mc-callout">Use the same completion boundary and acceptance criteria. Cost reduction alone is not ROI.</div>
</div>

<!--
Timebox: 25 minutes

Talk track: Which measure would change a pilot decision, rather than simply describe activity? Use five minutes to explain the seven measures: valid completion, developer intervention, cycle time, rework and quality, AI cost per accepted outcome, operational risk, and business outcome. Every row needs a baseline, source, owner, cadence, and decision. Give participants fifteen minutes to build the scorecard with the same completion boundary and acceptance criteria used earlier. Use the final five minutes to identify missing or non-comparable evidence. AI cost per accepted outcome connects variable usage to accepted outcomes; it does not make cost reduction alone a return on investment.

Transition: Take the scorecard into the final gate design. Decide what evidence stops, revises, funds, or scales the pilot.

Audience question: Which scorecard row currently lacks a comparable baseline or a decision?

Response guidance: If adoption or usage appears as value, say, “Which accepted or business outcome does it support?” If a source is unavailable, say, “Keep the row and mark the evidence dependency.”

Payoff: You have a seven-measure scorecard with owned evidence fields and decision relevance.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s16-build-the-pilot-scorecard
-->

---
layout: two-panel
class: mc
---

::title::

# Set funding and scale gates

<div class="mc-meta"><span>S17 · Funding and scale decision</span><span>16:25–16:40 · 15 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S17">
  <p class="mc-kicker">Four explicit outcomes</p>
  <div class="mc-gate-grid">
    <div><b>Stop</b><span>Risk or failure threshold</span></div>
    <div><b>Revise</b><span>Evidence or boundary change</span></div>
    <div><b>Fund</b><span>Reliability + leverage threshold</span></div>
    <div><b>Scale</b><span>Repeatable outcome + operating readiness</span></div>
  </div>
  <p class="mc-small">Adoption, usage, model access, or generated output alone cannot satisfy a scale gate.</p>
</div>

::visual::

<div class="mc-stack">
  <h2>Make each gate actionable</h2>
  <div class="mc-field"><b>Gate prompt</b><span>Gate ___<br>threshold / evidence ___<br>checkpoint date ___ · owner ___<br>decision authority ___<br>if unmet ___ · if met ___</span></div>
  <div class="mc-callout">30 / 60 / 90 may be useful review horizons. They are not mandatory or predictive.</div>
</div>

<!--
Timebox: 15 minutes

Talk track: What evidence should stop, revise, fund, or scale this pilot? Use three minutes to frame the four gates. A stop gate names a risk or failure threshold. A revise gate names evidence or a boundary that must change. A funding gate requires demonstrated reliability and leverage. A scale gate requires a repeatable outcome and an operating model that can support it. Participants have eight minutes to set thresholds, checkpoint dates, owners, decision authority, and actions if evidence is met or unmet. Use four minutes to challenge the funding and scale decisions. Thirty, sixty, and ninety days may be useful review horizons, but they are not mandatory and do not predict results.

Transition: Carry the gates and owners into the final pilot statement and mission readout.

Audience question: Which threshold would prevent funding or scale even if usage rises?

Response guidance: If a gate says “good results,” say, “Name the measure, threshold, source, and authority.” If scale depends only on adoption, say, “Add reliability, leverage, and operational evidence.”

Payoff: You have owned stop, revise, fund, and scale gates tied to evidence and checkpoints.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s17-set-funding-and-scale-gates
-->

---
layout: single-panel
class: mc mc-readout-slide
---

::title::

# Pilot decision and mission readout

<div class="mc-meta"><span>S18 · Pilot package</span><span>16:40–17:00 · 20 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S18">
  <p class="mc-kicker">Assemble the actionable package</p>
  <div class="mc-package-grid">
    <span>pilot hypothesis ___</span><span>ROI path ___</span><span>optimization changes ___</span>
    <span>boundary ___</span><span>funding ___</span><span>measures ___</span>
    <span>owner ___</span><span>dependencies ___</span><span>next review ___</span>
  </div>
  <div class="mc-final-sentence">For workflow ___, we will test ROI path ___ through pilot ___, within boundary ___, funded by ___, governed by ___, measured using ___, and reviewed on ___ to decide whether to stop, revise, or scale.</div>
  <div class="mc-callout"><b>Readout:</b> confirm owners, dependencies, evidence gaps, and the next review date. Do not invent consensus.</div>
</div>

<!--
Timebox: 20 minutes

Talk track: Can your group state the pilot decision in one complete sentence? Use three minutes to assemble the package: pilot hypothesis, ROI path, optimization changes, boundary, funding, measures, owner, dependencies, and next review. Then use twelve minutes for group readouts and challenge. Read the sentence exactly as a decision frame: for this workflow, we will test this ROI path through this pilot, within this boundary, funded, governed, and measured in the stated way, with a review date that leads to stop, revise, or scale. Use the final five minutes to confirm owners, dependencies, evidence gaps, and dates. Preserve disagreement and unknowns rather than inventing consensus.

Transition: Close the working day with the owned pilot package and its next review date.

Audience question: Who owns the next review, and what evidence will that person examine?

Response guidance: If an owner or date is missing, say, “Keep the dependency unresolved and name who will confirm it.” If a benefit is presented as achieved, say, “State it as the pilot hypothesis and name the evidence required.”

Payoff: You leave with an actionable pilot decision, accountable owners, explicit dependencies, and a stop, revise, or scale review.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s18-pilot-decision-and-mission-readout
-->
