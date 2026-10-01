---
theme: ghcp
title: "Mission Control: AI Development Governance and Value Realization"
info: "Full-day customer-neutral workshop using GitHub Copilot as the main example."
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

# Mission Control: AI Development Governance and Value Realization

<p class="mc-tagline" data-slide-id="S01">Govern the spend.<br>Guide the work.<br>Prove the value.</p>

::visual::

<div class="mc-opening-visual">
  <img class="mc-opening-art" src="/images/mission-control-opening-team-v7.png" width="1248" height="832" alt="The fictional Mission Control teaching team." />
  <dl class="mc-cast" aria-label="Mission Control characters and personas">
    <div><dt>Agent Mergewell</dt><dd>Accountable human field agent</dd></div>
    <div><dt>Chief Morgan Charter</dt><dd>Governance and value leader</dd></div>
    <div><dt>Riley Relay</dt><dd>Bounded software-agent collaborator</dd></div>
    <div><dt>Purrmission</dt><dd>Safety guardian</dd></div>
  </dl>
</div>

<!--
Timebox: 2 minutes

Talk track: Welcome to Mission Control. What decision about AI development spending would you like to make with more confidence? Look at this team: Mergewell stands for the human who remains accountable; Charter stands for governance and value; Relay is a software collaborator working within bounds; Purrmission reminds us to check safety. They are guides, not your organization's decision makers. GitHub Copilot will be our main example, but you can use the same decision method for other approved AI development services. Today you will build the evidence for a pilot decision, not assume that more AI activity means more value.

Transition: First, let's see why a record of spending or use is only the start of that decision.

Audience question: Which investment decision must become clearer today?

Response guidance: If no decision comes to mind, say, “It could be whether to test a workflow, fund a pilot, or wait for evidence. We'll narrow it to your own workflow shortly.”

Payoff: You know the goal: a decision about a bounded pilot backed by evidence and accountable people.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s01-mission-control-ai-development-governance-and-value-realization
-->

---
layout: two-panel
class: mc
---

::title::

# From AI Spend to Measurable Value

<div class="mc-meta"><span>S02 · Mission briefing</span><span>09:02–09:07 · 5 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S02">
  <div class="mc-statement-list">
    <p><b>Spending and use</b> are inputs.</p>
    <p><b>Completed, accepted outcomes</b> are evidence.</p>
    <p><b>Business value</b> is the result leaders must test.</p>
  </div>
</div>

::visual::

<div class="mc-stack mc-center">
  <p class="mc-kicker">Today’s evidence chain</p>
  <div class="mc-flow"><b>use</b><i>→</i><b>control</b><i>→</i><b>outcome</b><i>→</i><b>decision</b></div>
  <div class="mc-field"><b>Carry one question</b><span>Which decision about AI investment is currently hardest to make?</span></div>
</div>

<!--
Timebox: 5 minutes

Talk track: Which AI investment decision is hard to make right now? The left panel separates what you spend and use from work that actually finishes and passes your checks. The arrow on the right asks how use was governed, what outcome followed, and what choice that evidence supports. For example, a record of tool use tells you people tried it. It does not tell you whether an accepted piece of work reached a customer or helped the business. Write down one decision question you want this chain to answer. A single pilot run will not prove value on its own.

Transition: Keep that question handy. Next we'll see the route to answering it and who needs to be involved.

Audience question: Which decision about AI investment is currently hardest to make?

Response guidance: If you hear a metric rather than a decision, ask, “What would you do differently once you knew that number?” Leave room for people to write a question.

Payoff: You have a decision question to test against the evidence throughout the day.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s02-from-ai-spend-to-measurable-value
-->

---
layout: two-panel
class: mc
---

::title::

# Today's Route and Decision Functions

<div class="mc-meta"><span>S03 · Mission briefing</span><span>09:07–09:14 · 7 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S03">
  <div class="mc-field"><b>Morning</b><span>mission · ROI · usage and economics · governance and controls</span></div>
  <div class="mc-field"><b>Afternoon</b><span>fair comparisons · portfolio · operating model · proof · action · readout</span></div>
  <div class="mc-callout">Name an owner for every function. Record a missing function as a dependency.</div>
</div>

::visual::

<div class="mc-role-grid">
  <b>P1<span>Outcome</span></b><b>P2<span>Delivery</span></b><b>P3<span>Platform</span></b>
  <b>P4<span>Architecture</span></b><b>P5<span>Risk</span></b><b>P6<span>Finance</span></b><b>P7<span>Measurement</span></b>
</div>

<!--
Timebox: 7 minutes

Talk track: Who can speak for the decisions this pilot will need? The route on the left starts with the mission and value question, then builds usage and governance evidence. Later you will compare options, decide who funds and operates the pilot, and prepare a readout. The seven functions on the right are not a seating chart. For example, a platform administrator may know what is configured but cannot by that fact approve risk or funding. Name who can represent each function. One person can cover more than one, but if a function is absent, write down who must be consulted rather than treating silence as approval.

Transition: Now let's give these owners a concrete workflow and decision to work on.

Audience question: Which decision function is missing or unclear?

Response guidance: If a function has no representative, say, “Let's mark it as a dependency and name someone who can reach the right owner.” Allow the room to check coverage.

Payoff: You have named the required decision functions or the dependencies needed to involve them.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s03-todays-route-and-decision-functions
-->

---
layout: single-panel
class: mc
---

::title::

# Define the Mission

<div class="mc-meta"><span>S04 · Mission briefing</span><span>09:14–09:30 · 16 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S04">
  <p class="mc-kicker">Complete one decision-shaped brief</p>
  <div class="mc-prompt">For workflow ___, the desired result is ___; work counts as finished at ___; available evidence is ___; missing evidence is ___; the decision owner is ___; and today's investment decision is ___.</div>
  <p class="mc-small"><b>Lead P1/P2 · Evidence P3/P7 · Review P4/P5/P6 · Decide P1</b></p>
  <div class="mc-callout">Select one mission without inventing agreement or evidence.</div>
</div>

<!--
Timebox: 16 minutes

Talk track: What single workflow would make this exercise useful to you? The sentence on the screen is a working brief, not a claim that everyone already agrees. Imagine a team considering help with preparing pull requests. The result they want is not simply more suggestions; they need to say when the work is finished and who can accept it. Use your own workflow instead. Have the outcome and delivery owners lead; ask platform and measurement owners what evidence exists, and let architecture, risk, and finance flag constraints. Draft and compare options, then select one mission. Leave missing evidence and disagreements visible for the decision owner.

Transition: With a workflow chosen, let's distinguish what goes into it from the value it might deliver.

Audience question: Where does work count as finished for this mission?

Response guidance: If the group starts with a tool feature, ask, “What decision about this workflow would that feature help you make?” If a source is missing, say, “Write unknown and name who could check it.” Give the group room to draft.

Payoff: You have a shared working mission brief and a specific investment decision, with gaps still visible.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s04-define-the-mission
-->

---
layout: single-panel
class: mc
---

::title::

# From Investment to Value

<div class="mc-meta"><span>S05 · ROI fundamentals</span><span>09:30–09:36 · 6 min</span></div>

::content::

<div class="mc-stack mc-stack--animation" data-slide-id="S05">
  <MissionControlValueChain />
</div>

<!--
Timebox: 6 minutes

Talk track: What are you counting today? As this chain builds, notice that each step asks a different question. A license is an investment; tokens used are consumption; suggestions reviewed are activity. A pull request reaching your agreed finish line is completed work, but it becomes an accepted outcome only after the required human, quality, security, risk, and compliance checks. Value asks what useful result that accepted work delivered. Return to your mission and put one measure where it belongs. If it sits early in the chain, that's useful context, not proof of ROI.

Transition: Next, the leverage picture shows why making a task faster may still leave that chain's outcome unchanged.

Audience question: Is your current measure investment, consumption, activity, completed work, accepted outcome, or value?

Response guidance: If a measure is described as value just because it rose, ask, “What passed the finish line and the required checks?” Let participants classify their own measure.

Payoff: You can name what your current measure shows and what further evidence value would require.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s05-from-investment-to-value
-->

---
layout: single-panel
class: mc
clicks: 3
---

::title::

# The Leverage Rectangle

<div class="mc-meta"><span>S06 · ROI fundamentals</span><span>09:36–09:43 · 7 min</span></div>

::content::

<div class="mc-stack mc-stack--animation" data-slide-id="S06">
  <MissionControlLeverageRectangle />
</div>

<!--
Timebox: 7 minutes

Talk track: What would make your team's freed time turn into finished outcomes? Start with the rectangle: across it is developer time, up it is business outcomes, and the diagonal's slope is leverage—more completed outcomes for each developer hour means a steeper slope. Now IDE and platform AI appear inside the existing process. They can free time without much change to that slope. Next, automation, compliance, and coordination appear: improving how work moves and decisions get made is what could raise the slope. Finally, the smaller old rectangle and higher possible one show a journey, not a forecast. Standardize and streamline, build an efficient automation and policy lifecycle, collaborate and reuse, then improve the codebase and process at low cost. Which of those changes could your mission actually support? This drawing is conceptual, not measured data or a promised result.

Transition: The slope can improve in different ways. Let's look at the distinct paths and what each one requires.

Audience question: Which of the five journey steps does your selected workflow already have, and which is missing?

Response guidance: If someone reads a promised gain from the chart, say, “It's a model, not a measurement; our pilot must test the result.” If only tools are named, ask, “What process decision would let their saved time reach accepted work?”

Payoff: You can explain leverage as outcomes per developer hour and identify the process change needed to test an improvement.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s06-the-leverage-rectangle
-->

---
layout: single-panel
class: mc
---

::title::

# Four AI ROI Paths — and What Must Be True for Each

<div class="mc-meta"><span>S07 · ROI fundamentals</span><span>09:43–09:49 · 6 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S07">
  <p class="mc-small mc-compact-note">Each path converts AI-created capacity differently. The more ambitious the ROI outcome, the more contingencies must be satisfied.</p>
  <div class="mc-path-grid">
    <span class="mc-path-grid__corner">Easier<br>↓<br>Harder</span>
    <b>1. Task efficiency</b><b>2. Decision making</b><b>3. Process</b><b>4. Individual scope</b><b>5. Compounding by improving all 4</b><b>ROI outcome</b>
    <i>1</i><span>Reduced task effort or risk</span><span>Reduce required task hours</span><span>Capacity can be removed from the process</span><span class="is-empty">—</span><span class="is-empty">—</span>
    <div class="mc-path-grid__outcome"><b>Labor efficiency</b><span>Same output, leverage from fewer human hours</span><small>Primary limiting factor: unimprovable work</small></div>
    <i>2</i><span>Reduced task effort or risk</span><span>Reduce cycle time</span><span>Task efficiency becomes cycle efficiency</span><span class="is-empty">—</span><span class="is-empty">—</span>
    <div class="mc-path-grid__outcome"><b>Higher throughput</b><span>Same process, leverage from more completed work</span><small>Primary limiting factor: unimprovable structure</small></div>
    <i>3</i><span>Reduced task effort or risk</span><span>Reduce handoffs and coordination</span><span>Individuals expand scope and complete more of the outcome</span><span>Expand outcomes individuals own</span><span class="is-empty">—</span>
    <div class="mc-path-grid__outcome"><b>Expanded ownership</b><span>Individual leverage increases the outcomes they own</span><small>Primary limiting factor: unimprovable scope</small></div>
    <i>4</i><span>Reduced task effort or risk</span><span>Choose new improvements to boost existing improvements</span><span>Improvements are combined iteratively</span><span>Ownership and available paths expand</span><span>Improvement is measured, maintained, confirmed</span>
    <div class="mc-path-grid__outcome"><b>Compounding leverage</b><span>Today’s capacity improves tomorrow’s possibilities</span><small>Primary limiting factor: learning and adaptability</small></div>
  </div>
  <p class="mc-small mc-compact-note">These are hypotheses, not guaranteed results.</p>
</div>

<!--
Timebox: 6 minutes

Talk track: What kind of value are you actually trying to create? Read this table as a set of conditions, not four promised returns. Each row begins with easier or safer task work. If the aim is the same output with fewer human hours, those hours must really come out of the process; essential work may limit that path. If the aim is more finished work, shorter tasks must shorten the whole cycle, which process structure may block. A broader outcome owned by one person also needs fewer handoffs and workable scope. The hardest path keeps improving the process itself; that needs learning and maintenance. Point to the row that fits your mission and the condition you cannot yet verify.

Transition: Next, let's see why even a plausible path can look strong at the task level and weaker at the finish line.

Audience question: Which path best matches your mission, and which contingency is least certain today?

Response guidance: If someone names use instead of an outcome, ask, “What finished work would change?” If several rows fit, say, “Choose your primary hypothesis and mark the other as possible, not an extra counted benefit.”

Payoff: You can choose a likely ROI path and state the condition that must hold before it creates value.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s07-four-ai-roi-paths-and-what-must-be-true-for-each
-->

---
layout: single-panel
class: mc
---

::title::

# AI Creates Capacity Faster Than It Creates Leverage

<div class="mc-meta"><span>S08 · ROI fundamentals</span><span>09:49–09:54 · 5 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S08">
  <p class="mc-small mc-compact-note">AI capacity can rise rapidly, while developer leverage rises only when that capacity converts into more completed work per developer hour.</p>
  <MissionControlCapacityCurves />
</div>

<!--
Timebox: 5 minutes

Talk track: Have you ever seen more AI output without more finished work? This indexed drawing is illustrative, not your team's data or a forecast. Moving across the examples from human-only work through AI assistance and agents, the capacity to attempt work rises quickly while developer hours stay relatively steady. The other lines ask how much of that capacity survives at different finish lines. A gain counted as lines of code can shrink when a pull request needs review or a story waits on another team. Leverage is completed work divided by developer hours, not output divided by tool use. Tell me where your current evidence stops: code, pull request, or story.

Transition: If extra capacity does not reach your finish line, the next picture asks where that saved time went.

Audience question: At which boundary does your current evidence measure impact: lines of code, pull request, or story?

Response guidance: If an early-stage gain is called ROI, say, “That may be useful capacity. What evidence shows it survived review and the chosen finish line?”

Payoff: You know why the finish line changes what you can claim about leverage.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s08-ai-creates-capacity-faster-than-it-creates-leverage
-->

---
layout: single-panel
class: mc
clicks: 4
---

::title::

# Four Ways the SDLC Can Absorb Time Savings

<div class="mc-meta"><span>S09 · ROI fundamentals</span><span>09:54–10:00 · 6 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S09">
  <div class="mc-absorb" :data-step="$clicks ?? 4">
    <svg class="mc-absorb__rays" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="1" y1="2" x2="27" y2="23" vector-effect="non-scaling-stroke" /><line x1="99" y1="2" x2="73" y2="23" vector-effect="non-scaling-stroke" /><line x1="1" y1="98" x2="27" y2="77" vector-effect="non-scaling-stroke" /><line x1="99" y1="98" x2="73" y2="77" vector-effect="non-scaling-stroke" /></svg>
    <section data-beat="1" class="mc-absorb__path mc-absorb__path--n mc-absorb__path--neutral">
      <b>Fewer devs, same output</b>
      <span class="mc-absorb__units" aria-hidden="true"><i></i><i></i><i></i><i class="is-off"></i><i class="is-off"></i></span>
      <span class="mc-absorb__units mc-absorb__units--work" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
    </section>
    <section data-beat="1" class="mc-absorb__effect mc-absorb__effect--n mc-absorb__effect--neutral">
      <em>Process is unaffected</em>
      <span class="mc-meter mc-meter--capacity is-same"><span>Capacity hrs</span></span>
      <span class="mc-meter mc-meter--overhead is-same"><span>Overhead hrs</span></span>
    </section>
    <section data-beat="3" class="mc-absorb__path mc-absorb__path--w mc-absorb__path--benefit">
      <b>Same devs, features per cycle ↑</b>
      <span class="mc-absorb__units" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <span class="mc-absorb__units mc-absorb__units--work" aria-hidden="true"><i class="is-big"></i><i class="is-big"></i><i class="is-big"></i><i class="is-big"></i><i class="is-big"></i></span>
    </section>
    <section data-beat="3" class="mc-absorb__effect mc-absorb__effect--w mc-absorb__effect--benefit">
      <em>Process benefits 1×</em>
      <span class="mc-meter mc-meter--capacity is-grow"><span>Capacity</span></span>
      <span class="mc-meter mc-meter--overhead is-same"><span>Overhead</span></span>
    </section>
    <div class="mc-absorb__center">
      <b>AI makes tasks more efficient</b>
      <div class="mc-absorb__gains">
        <span class="mc-meter mc-meter--productive is-grow"><span>Productive time</span></span>
        <span class="mc-meter mc-meter--delay is-shrink"><span>Delay</span></span>
        <strong class="mc-absorb__brace">Default gain</strong>
        <span class="mc-meter mc-meter--cost is-shrink"><span>Cost</span></span>
        <span class="mc-meter mc-meter--risk is-shrink"><span>Risk</span></span>
        <strong class="mc-absorb__brace mc-absorb__brace--aware">Alternative gains<small>require awareness</small></strong>
      </div>
      <span class="mc-absorb__axis" aria-hidden="true"></span>
      <span class="mc-kicker">Time-boxed view</span>
      <p class="mc-small">Where is your saved time likely to go today?</p>
    </div>
    <section data-beat="4" class="mc-absorb__path mc-absorb__path--e mc-absorb__path--compound">
      <b>Same devs, investments per cycle ↑</b>
      <span class="mc-absorb__units" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <span class="mc-absorb__units mc-absorb__units--work" aria-hidden="true"><i class="is-big"></i><i class="is-big"></i><i class="is-big"></i><i class="is-small"></i><i class="is-small"></i><i class="is-small"></i><i class="is-small"></i></span>
    </section>
    <section data-beat="4" class="mc-absorb__effect mc-absorb__effect--e mc-absorb__effect--compound">
      <em>Process benefits 2×</em>
      <span class="mc-meter mc-meter--capacity is-grow"><span>Capacity</span></span>
      <span class="mc-meter mc-meter--overhead is-shrink"><span>Overhead</span></span>
    </section>
    <section data-beat="2" class="mc-absorb__path mc-absorb__path--s mc-absorb__path--suffers">
      <b>Same devs, more cycles</b>
      <span class="mc-absorb__units" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <span class="mc-absorb__units mc-absorb__units--work" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
    </section>
    <section data-beat="2" class="mc-absorb__effect mc-absorb__effect--s mc-absorb__effect--suffers">
      <em>Process suffers</em>
      <span class="mc-meter mc-meter--capacity is-shrink"><span>Capacity</span></span>
      <span class="mc-meter mc-meter--overhead is-grow"><span>Overhead</span></span>
    </section>
  </div>
</div>

<!--
Timebox: 6 minutes

Talk track: Where will your saved time actually go? Start at the center: within a fixed work window, faster tasks tend to create more productive time by default. Lower delay, cost, or risk needs an intentional choice. Now look north: fewer developers, same output, but the process itself does not improve. South: the same team runs more cycles and takes on more overhead, so the process can suffer. West: the team fits more features into a cycle; the process benefits. East: the team also spends capacity on improvements that could help later cycles. The bars show relative direction, not measured savings or a guarantee. Think about your pilot: which path would happen without an explicit decision, and who could redirect it?

Transition: To test whether any of those paths helps, we first need an agreed point where work counts as finished.

Audience question: Where is your saved time most likely to go today, and who would need to decide to redirect it?

Response guidance: If no one knows where time goes, say, “Mark the likely default as a hypothesis and name what you would observe.” If staff reduction is suggested, say, “That's one possible path, not an automatic result of faster tasks.”

Payoff: You can name a plausible absorption path and the decision needed to change it.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s09-four-ways-the-sdlc-can-absorb-time-savings
-->

---
layout: single-panel
class: mc
---

::title::

# Define the Completion Boundary

<div class="mc-meta"><span>S10 · ROI fundamentals</span><span>10:00–10:05 · 5 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S10">
  <MissionControlCompletionBoundary />
</div>

<!--
Timebox: 5 minutes

Talk track: Where will you count work as finished in your pilot? Follow the line from code through pull request and story to release and business outcome. A faster code suggestion is not yet an accepted story; review or testing can still send it back. If your team measures only code produced, you cannot claim a release benefit from that measure. Mark where you measure today and where you want to test the pilot. What check will show that work really crossed that line? Keep a later business result as a separate question if your chosen boundary stops earlier.

Transition: Now that we know where finished work counts, let's find what holds it up before it gets there.

Audience question: What evidence proves work crossed your selected boundary?

Response guidance: If a business outcome is too far away to measure in this pilot, say, “Choose a boundary you can check, and be clear about the later result it does not yet prove.” Give the group space to mark both boundaries.

Payoff: You leave with a specific finish line and the evidence needed to count accepted work there.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s10-define-the-completion-boundary
-->

---
layout: two-panel
class: mc
---

::title::

# Find Where Leverage Is Lost

<div class="mc-meta"><span>S11 · ROI fundamentals</span><span>10:05–10:10 · 5 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S11">
  <p>Where does work queue, return, or stop?</p>
  <div class="mc-chip-grid">
    <b>Integration</b><b>Testing</b><b>Review</b><b>Dependencies</b>
    <b>Risk/compliance</b><b>Coordination</b><b>Waiting</b>
  </div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-field"><b>Selected workflow</b><span>___</span></div>
  <div class="mc-field"><b>Dominant leverage loss</b><span>___</span></div>
  <div class="mc-field"><b>Evidence</b><span>___</span></div>
  <div class="mc-callout">Prioritize one constraint. Do not generalize from one local example.</div>
</div>

<!--
Timebox: 5 minutes

Talk track: What slows your work just before it crosses the finish line? The left side names possible places work queues or comes back; the right side asks you to choose the main loss for your workflow and show the evidence. For example, faster pull-request drafting may not help if review is where work repeatedly waits. Mark the point that most constrains accepted completion, rather than checking every box. This is a diagnosis about your chosen workflow, not a general claim about the tool.

Transition: Once we've named the bottleneck, we can choose the value path most likely to address it.

Audience question: Which loss most limits accepted completion today?

Response guidance: If every item is marked, ask, “Which one, if it improved, would change the mission decision most?” Give the group room to locate evidence.

Payoff: You have one prioritized loss to test, with a reason tied to your finish line.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s11-find-where-leverage-is-lost
-->

---
layout: two-panel
class: mc
---

::title::

# Match the Path to the Outcome

<div class="mc-meta"><span>S12 · ROI fundamentals</span><span>10:10–10:16 · 6 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S12">
  <div class="mc-field"><b>Business outcome</b><span>___</span></div>
  <div class="mc-field"><b>Primary ROI path</b><span>___ because ___</span></div>
  <div class="mc-field"><b>Secondary ROI path</b><span>___ because ___</span></div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-field"><b>Distinguishing evidence</b><span>___</span></div>
  <div class="mc-field"><b>Double-counting risk</b><span>___</span></div>
  <p class="mc-small"><b>Lead P1/P2 · Evidence P6/P7 · Review P4/P5 · Decide P1</b></p>
</div>

<!--
Timebox: 6 minutes

Talk track: Which path is your main bet, and which is only a possible second benefit? The left panel ties both to the business outcome from your mission. The right asks what evidence would tell them apart. If you expect shorter pull-request review and more accepted stories, decide whether cycle throughput is the primary benefit; don't also count the same saved hours as a separate labor saving unless you can show a distinct result. Let your outcome and delivery owners propose the paths and your finance and measurement owners check what can be counted. Write down what remains uncertain.

Transition: Now let's test what could keep your primary path from working.

Audience question: What evidence would distinguish the primary path from the secondary path?

Response guidance: If the same gain appears in both paths, say, “Count it once unless separate evidence supports two distinct outcomes.” Leave room to choose a primary path.

Payoff: You have a primary and secondary value hypothesis without counting the same benefit twice.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s12-match-the-path-to-the-outcome
-->

---
layout: single-panel
class: mc
---

::title::

# Name the Limiting Factor

<div class="mc-meta"><span>S13 · ROI fundamentals</span><span>10:16–10:21 · 5 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S13">
  <p>Which factor limits the selected path now?</p>
  <div class="mc-four-grid">
    <div><b>Essential human work</b></div><div><b>Process structure</b></div>
    <div><b>Practical ownership scope</b></div><div><b>Organizational learning/adaptability</b></div>
  </div>
  <div class="mc-field"><b>Evidence of movement</b><span>What evidence would show that the limit moved?</span></div>
  <p class="mc-small">A diagnosis is not permission to remove necessary human or governance work.</p>
</div>

<!--
Timebox: 5 minutes

Talk track: What stops your chosen path from turning faster tasks into accepted work? These four cards correspond to the paths we just discussed. If review is a necessary human check, it is not waste to remove; the question might be whether waiting or handoffs around it can improve. If the workflow cannot move because of dependencies, the limiting factor may be process structure instead. Choose the best current diagnosis for your mission and say what observation would show that it changed. Treat this as something to test, not permission to bypass required checks.

Transition: Let's put that diagnosis into a claim we can actually test, with limits on what we credit to AI.

Audience question: What evidence would show that the limiting factor moved?

Response guidance: If someone proposes dropping a required check, say, “Keep that check. Can you reduce waiting around it instead?” Give people space to name their evidence need.

Payoff: You have a testable limiting factor without treating essential oversight as waste.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s13-name-the-limiting-factor
-->

---
layout: single-panel
class: mc
---

::title::

# State the ROI Hypothesis and Limits

<div class="mc-meta"><span>S14 · ROI fundamentals</span><span>10:21–10:30 · 9 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S14">
  <div class="mc-prompt">We expect ___ value through ___ ROI path by changing ___ at boundary ___.<br>We will test it with ___ evidence over ___ comparison window.<br>We can credit ___ to AI only if ___.</div>
  <div class="mc-evidence-strip"><b>Facts: ___</b><b>Assumptions: ___</b><b>Unknowns: ___</b></div>
  <p class="mc-small"><b>Lead P1 · Evidence P7/P2/P3 · Review P5/P6 · Decide P1</b></p>
</div>

<!--
Timebox: 9 minutes

Talk track: What would need to happen before you could say the pilot helped? The first line is your expectation, not a result. For example, you might expect more accepted stories if pull requests spend less time waiting, but you still need a comparison over a defined period and the same acceptance checks. The second line names that evidence. The third is the guardrail: what portion could you credit to AI if staffing, task mix, or process also changed? Ask the outcome owner to draft the claim with measurement and delivery evidence. Mark facts, assumptions, and unknowns separately. One run is not a proof.

Transition: Keep that hypothesis for the evidence work after the break.

Audience question: What condition must hold before you credit the result to AI?

Response guidance: If a future gain is described as achieved, say, “That's the expectation. What comparison and checks would let us test it?” Give participants space to write their limits.

Payoff: You have a testable value hypothesis and a clear boundary on what you could attribute to AI.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s14-state-the-roi-hypothesis-and-limits
-->

---
layout: section
class: mc mc-break
---

# Break

<div data-slide-id="U01">
  <p>Please return at <b>10:45</b>.</p>
</div>

<!--
Timebox: 15 minutes

Talk track: Let's take a full break. Please return at 10:45. Nothing to prepare while you're away.

Transition: When we return at 10:45, we'll look at what enters the next prediction.

Audience question: What time do we return?

Response guidance: If anyone asks for an assignment, say, “No homework; enjoy your break.”

Payoff: You can take the full break without a required task.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#u01-break
-->

---
layout: two-panel
class: mc
---

::title::

# What Enters the Next Prediction

<div class="mc-meta"><span>S15 · Usage and economics</span><span>10:45–10:55 · 10 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S15">
  <p>A request may combine:</p>
  <div class="mc-chip-grid">
    <b>instructions</b><b>conversation</b><b>selected code or files</b>
    <b>retrieved context</b><b>tool results</b><b>system constraints</b>
  </div>
</div>

::visual::

<div class="mc-stack">
  <p class="mc-kicker">Map one request</p>
  <div class="mc-question-grid">
    <div><b>New</b><span>___</span></div><div><b>Reused</b><span>___</span></div>
    <div><b>Relevant</b><span>___</span></div><div><b>Unknown</b><span>___</span></div>
  </div>
  <p class="mc-small">Exact inputs vary by approved service and configuration.</p>
</div>

<!--
Timebox: 10 minutes

Talk track: What do you think travels with a request beyond the words you just typed? The left panel gives possible inputs: earlier conversation, selected files, retrieved material, tool results, instructions, and constraints. The boxes on the right ask you to sort one request into what is new, what may be reused, what matters for the task, and what you do not know. If your workflow involves a pull request, a selected file might be relevant while an old unrelated discussion might not be. Do not assume every approved service assembles requests the same way. Try the map with your own task and mark uncertain inputs as unknown.

Transition: Once we know what could enter the request, let's ask what deserves the limited working space.

Audience question: What in your request is new, reused, relevant, or unknown?

Response guidance: If someone assumes a field is always included, say, “That depends on the approved service and configuration. Mark it unknown until you can check.” Leave space to map a request.

Payoff: You can distinguish possible request inputs from those your workflow has actually confirmed.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s15-what-enters-the-next-prediction; workshops/ghcp-dev-hack/content/modules/01-foundations/slides.md#what-enters-the-next-prediction
-->

---
layout: single-panel
class: mc
---

::title::

# Context Window: What Competes for Space

<div class="mc-meta"><span>S16 · Foundations reuse</span><span>10:55–11:05 · 10 min</span></div>

::content::

<div class="mc-stack mc-stack--animation" data-slide-id="S16">
  <MissionControlContextWindow />
</div>

<!--
Timebox: 10 minutes

Talk track: Which item would you keep if the task had room for less context? Follow the drawing as instructions, conversation, files, retrieved material, tool results, and output compete for working space. The point is selection, not a published size limit. For a pull-request task, the acceptance rules and relevant code may matter more than a repeated, outdated exchange. More material can compete with what is useful; removing material is not a win unless the accepted result still holds. Tell me one item needed for your mission's task and one candidate to remove. The actual space available depends on the approved service and configuration; we are not asserting a current product limit.

Transition: Now we'll look at what a usage receipt can tell us—and what it cannot tell us about that working space.

Audience question: What context helps your task and acceptance rules, and what could be removed?

Response guidance: If asked for a universal limit, say, “We need current evidence for your approved configuration; this picture teaches selection.” If everything is kept, ask, “Which item affects your task or its acceptance check?”

Payoff: You have a rule for choosing relevant context and one item to test removing.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s16-context-window-what-competes-for-space; workshops/ghcp-dev-hack/content/modules/01-foundations/slides.md#context-window-what-competes-for-space
-->

---
layout: two-panel
class: mc
---

::title::

# Read the Usage Receipt

<div class="mc-meta"><span>S17 · Selected facilitator demonstration</span><span>11:05–11:15 · 10 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S17">
  <p class="mc-kicker">Read each record by</p>
  <div class="mc-chip-grid mc-chip-grid--compact">
    <b>owner</b><b>service/model</b><b>use case</b><b>period</b><b>new input</b>
    <b>reused input</b><b>output</b><b>quality/result</b><b>cost</b><b>unknown fields</b>
  </div>
  <p class="mc-small"><b>Fallback:</b> clearly labeled synthetic receipt when the facilitator CLI or network is unavailable.</p>
</div>

::visual::

<div class="mc-stack mc-cli-demo">
  <p class="mc-kicker">Primary · Live Copilot CLI demonstration</p>
  <div class="mc-cli-demo__terminal" aria-label="Copilot CLI commands for the usage demonstration">
    <code>copilot</code>
    <span>Make one bounded, non-confidential request.</span>
    <code>/usage</code>
  </div>
  <div class="mc-synthetic-receipt" aria-label="Synthetic slash usage receipt offline fallback">
    <div class="mc-synthetic-receipt__heading">
      <b>Synthetic <code>/usage</code> receipt</b>
      <span>Offline fallback · representative values</span>
    </div>
    <table aria-label="Representative per-model accumulated session token totals">
      <thead><tr><th>Model</th><th>Input</th><th>Output</th><th>Session total</th></tr></thead>
      <tbody>
        <tr><td><code>model-alpha</code></td><td>12,480</td><td>2,160</td><td>14,640</td></tr>
        <tr><td><code>model-beta</code></td><td>3,920</td><td>640</td><td>4,560</td></tr>
      </tbody>
    </table>
    <p><b>Unknown:</b> reused-input tokens · dollar cost · quality/result · owner · use case · period</p>
    <small>Accumulated synthetic session totals—not evidence that one request caused the whole session total.</small>
  </div>
  <div class="mc-callout"><b>Not</b> current context occupancy · an invoice · dollar cost · ROI evidence</div>
</div>

<!--
Timebox: 10 minutes

Talk track: What does this receipt actually count? I'll use a facilitator-authenticated Copilot CLI in a new, empty, non-confidential folder, make one bounded request, and run `/usage`. Participants do not need an account or a network connection. If my CLI or network was not verified before delivery, we'll use the table clearly labeled synthetic instead. Look at each model's input, output, and accumulated session total. That total belongs to session work, not just the request you watched. It is not current context occupancy, a period invoice, dollar cost, or ROI. Fields may vary with the installed CLI and model. In the synthetic receipt, owner, use case, period, reused input, quality, and cost are unknown. What can you safely say from it, and what would need another source?

Transition: Let's use that distinction between observed use and missing evidence to build your cost starting point.

Audience question: Which missing field would stop you from using this record for a decision?

Response guidance: If the facilitator's authenticated CLI or network is unavailable, say, “We'll use the labeled synthetic example; no participant sign-in is needed.” If all session use is credited to the request, say, “This is accumulated session work, not a per-request figure.” For dollars, say, “We need applicable billing evidence, not an unlabeled token total.” Do not expose a private account balance or count the same use twice; unknown is not zero.

Payoff: You can interpret a session-use record without mistaking it for a bill, a context gauge, or proof of value.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s17-read-the-usage-receipt; workshop.md researchSources; workshops/ghcp-dev-hack/content/production/context-caching-proposal/source-verification.md#c4-context-usage-and-evidence-p12b-p13p13a-s2s3
-->

---
layout: single-panel
class: mc
---

::title::

# Build the Usage and Cost Starting Point

<div class="mc-meta"><span>S18 · Usage and economics</span><span>11:15–11:30 · 15 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S18">
  <p class="mc-kicker">Record the evidence before the change</p>
  <div class="mc-review-grid">
    <div class="mc-review-card"><b>Population / team</b><span>___</span></div><div class="mc-review-card"><b>Use case</b><span>___</span></div>
    <div class="mc-review-card"><b>Period</b><span>___</span></div><div class="mc-review-card"><b>Licenses or entitlements</b><span>___</span></div>
    <div class="mc-review-card"><b>Approved models / services</b><span>___</span></div><div class="mc-review-card"><b>Fixed cost</b><span>___</span></div>
    <div class="mc-review-card"><b>Variable usage</b><span>___</span></div><div class="mc-review-card"><b>Implementation</b><span>___</span></div>
    <div class="mc-review-card"><b>Validation</b><span>___</span></div><div class="mc-review-card"><b>Change management</b><span>___</span></div>
    <div class="mc-review-card"><b>Operating cost</b><span>___</span></div><div class="mc-review-card"><b>Cost owner</b><span>___</span></div>
    <div class="mc-review-card"><b>Data source</b><span>___</span></div><div class="mc-review-card"><b>Missing data</b><span>___</span></div>
  </div>
  <div class="mc-callout">Label each entry <b>fact, assumption, or unknown</b>.</div>
  <p class="mc-small"><b>Lead P3/P6 · Evidence P4/P7/P2 · Review P1/P5 · Decide P6</b></p>
</div>

<!--
Timebox: 15 minutes

Talk track: What would finance need before comparing the cost of this pilot with accepted outcomes? This grid is a starting record, not a filled-in bill. Start with the team, use case, and period so figures have a scope. Then keep a license cost separate from usage and from the human work of implementation, checking results, changing practice, and operating the pilot. A session receipt alone cannot fill those cells. Your platform and finance owners can identify sources, and measurement can flag gaps; label each entry fact, assumption, or unknown. Use only approved current evidence for entitlements, available services, and costs. Work on your own record now, even if much of it remains unknown.

Transition: With a scoped cost record, we can ask who sets and checks the rules for this pilot.

Audience question: Which field is missing, and who can supply the evidence?

Response guidance: If someone fills a missing cost with zero, say, “Unknown is not free; name who can provide the figure.” If costs blur together, ask, “Which are fixed, usage-related, or people and operating costs?” Give teams room to fill the grid.

Payoff: You have a scoped cost-and-use starting point that shows evidence owners and gaps.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s18-build-the-usage-and-cost-starting-point
-->

---
layout: single-panel
class: mc
---

::title::

# Governance Fundamentals

<div class="mc-meta"><span>S19 · Governance and controls</span><span>11:30–11:40 · 10 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S19">
  <div class="mc-governance-top"><b>Offenses</b><b>Penalties</b><b>Amendments</b></div>
  <div class="mc-governance-roles">
    <div class="mc-governance-role"><b>Creators</b><span>(Committee)</span></div><div class="mc-governance-role"><b>Communicators</b><span>(Training, docs)</span></div>
    <div class="mc-governance-role"><b>Enforcers</b><span>(IT, Legal)</span></div><div class="mc-governance-role"><b>Validators</b><span>(COE)</span></div>
    <div class="mc-governance-role"><b>Auditors</b><span>(3rd Party)</span></div>
  </div>
  <div class="mc-governance-objects">
    <div class="mc-governance-object"><b>Who must be Governed (Users)</b></div><div class="mc-governance-object"><b>What is Governed (ex. Servers, Storage)</b></div>
  </div>
</div>

<!--
Timebox: 10 minutes

Talk track: Who actually writes the rule for your pilot, and who checks that it works? This diagram is an organizational analogy, not a description of GitHub Copilot controls. The top row asks what counts as an offense, what happens, and how a rule changes. The middle separates people who create and explain a rule from those who enforce, validate, or independently audit it. At the bottom, name the people and technical objects the rule covers. For example, a rule about access to pilot data needs a policy owner as well as someone who can confirm its scope. Identify which functions in your organization do that work; don't infer a product feature from the labels.

Transition: Now that we know who and what may be governed, let's ask which rules enforce themselves and which need people.

Audience question: Which governance role is currently clear, and which remains unresolved?

Response guidance: If one group is named for everything, ask, “Who would independently check its work?” If a label is read as a product capability, say, “This is a roles model; confirm actual controls separately.”

Payoff: You can identify the roles and objects your pilot's governance must cover without assuming a product control exists.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s19-governance-fundamentals
-->

---
layout: single-panel
class: mc
---

::title::

# How Do Others Enforce Governance?

<div class="mc-meta"><span>S20 · Governance and controls</span><span>11:40–11:50 · 10 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S20">
  <table class="mc-table">
    <thead><tr><th>Law</th><th>Governing body</th><th>Penalties for Non-Compliance</th><th>Legal or Technical Enforcement</th></tr></thead>
    <tbody>
      <tr><td>Gravity</td><td>Mother nature</td><td>No</td><td>Not required</td></tr>
      <tr><td>Supply and demand</td><td>Economics</td><td>No</td><td>Not required</td></tr>
      <tr><td>Regulation</td><td>Government</td><td>Yes</td><td>Yes</td></tr>
      <tr><td>Theft</td><td>Government</td><td>Yes</td><td>Yes</td></tr>
      <tr><td>Corporate card misuse</td><td>Employer</td><td>Yes</td><td>Yes</td></tr>
      <tr><td>SharePoint Site classification</td><td>??</td><td>No</td><td>??</td></tr>
    </tbody>
  </table>
</div>

<!--
Timebox: 10 minutes

Talk track: Does your pilot's policy work on its own, or does someone have to enforce it? Read the rows as analogies. Gravity does not need a committee; a corporate card rule needs an employer, a consequence, and a way to detect misuse. The last row has question marks on purpose. We are not filling in a claim about SharePoint or any other current product. Compare that uncertainty with your own workflow: who owns a rule about approved access, and what evidence would show whether it was followed? Tell me where a process or technical check would have to be confirmed rather than assumed.

Transition: Next we'll separate writing a rule from the different ways you might carry it out.

Audience question: Where does your policy depend on communication, process, or a technical stop?

Response guidance: If someone fills the question marks, say, “Those are deliberately unknown here. Let's ask who owns the equivalent question in your pilot.” Leave space for a brief example.

Payoff: You can tell an inherent constraint from a policy that needs an owner and a way to verify it.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s20-how-do-others-enforce-governance
-->

---
layout: single-panel
class: mc
---

::title::

# Enforcement Scope – How to Enforce

<div class="mc-meta"><span>S21 · Governance and controls</span><span>11:50–12:00 · 10 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S21">
  <MissionControlEnforcementScope />
</div>

<!--
Timebox: 10 minutes

Talk track: If you wrote a pilot policy today, what would make it real? Follow this descending sequence from a stated requirement to action before a breach, action after one, monitoring, and then consequences or a changed rule. The side scale asks how much enforcement is involved. A reminder to review a request is not the same as a human process that requires approval, and neither is proof of a technical stop. For the access rule you just discussed, point to what your organization actually does now. Mark any proposed technical behavior as unverified until its support and configuration are checked; not every service offers every control.

Transition: With the enforcement choices clear, let's decide which object and risk deserve attention first.

Audience question: Which step describes your current enforcement approach?

Response guidance: If a reminder is called a technical block, say, “An alert, a process rule, and a supported stop are different. Which one can you actually verify?”

Payoff: You can describe your current enforcement step and what still needs verification.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s21-enforcement-scope-how-to-enforce
-->

---
layout: single-panel
class: mc mc-dense
---

::title::

# Transparent Enforcement Prioritization

<div class="mc-meta"><span>S22 · Governance and controls</span><span>12:00–12:15 · 15 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S22">
  <div class="mc-priority-grid">
    <div><b>Object – the technical object that needs governance</b></div>
    <div><b>Offense – A possible breach of governance</b></div>
    <div><b>Penalty – What happens with each offense</b></div>
    <div><b>IT Cost – How much does it cost IT for the offense</b></div>
    <div><b>Business Cost– How much does it cost the business for the offense</b></div>
    <div><b>Process Cost– How much does it cost to implement via process vs. technical enforcement</b></div>
    <div><b>Solution Cost – How much does it cost to implement the “good enough” solution (should include exceptions)</b></div>
    <div class="mc-priority-net"><b>Net – Point value ((sum costs)-Solution cost)</b></div>
  </div>
</div>

<!--
Timebox: 15 minutes

Talk track: Which possible breach would you address first in your chosen workflow? The visible rows start with the object and offense, then ask what happens and what a good-enough response costs. The final point value is only a way to discuss priorities; it is not ROI or an accepted accounting formula. Costs may overlap, so define them before adding anything. Now make a separate control map for your pilot. For example, if an agent could see data it does not need, name the access boundary, a human check, what stops the task, who handles an exception, and who reviews the rule. Include privacy, least privilege, thresholds, rollback, escalation, evidence, and a review date. Let risk and platform lead; keep any unverified control marked as unknown.

Transition: Keep your control map for the comparison lab. We'll take lunch before trying those choices.

Audience question: Which control needs an owner, exception path, and review date?

Response guidance: If the point value is called ROI, say, “It's a discussion aid, not an accounting result. Finance must define any real cost calculation.” Give the group room to map the exception and owner.

Payoff: You have an owned control map that states evidence, a human checkpoint, exceptions, and the next review.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s22-transparent-enforcement-prioritization
-->

---
layout: section
class: mc mc-break
---

# Lunch

<div data-slide-id="U02">
  <p>Please return at <b>13:00</b>.</p>
</div>

<!--
Timebox: 45 minutes

Talk track: It's time for lunch. Please return at 13:00. There is nothing to install or finish during the break.

Transition: When you return at 13:00, we'll use a synthetic example to compare model choices.

Audience question: What time do we return?

Response guidance: If anyone asks about preparation, say, “No task is assigned over lunch.”

Payoff: You can take the full lunch without homework.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#u02-lunch
-->

---
layout: two-panel
class: mc
---

::title::

# Model Choice Demonstration

<div class="mc-meta"><span>S23 · Selected native demonstration</span><span>13:00–13:06 · 6 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S23">
  <p>Match the task using:</p>
  <div class="mc-chip-grid"><b>complexity</b><b>required context</b><b>risk</b><b>validation effort</b><b>expected value</b></div>
</div>

::visual::

<div class="mc-stack">
  <MissionControlModelChoice />
</div>

<!--
Timebox: 6 minutes

Talk track: If two approved model choices both finish the task, how would you choose between them? This is a synthetic comparison, not a live benchmark or a list of currently available models. The criteria at left tell you to consider the task's complexity, needed context, risk, the effort to check the answer, and the value of an accepted result. Follow the two examples at right while keeping the task and acceptance rules fixed. A choice that uses less may still cost more in human checking or fail a required check. Which evidence would decide for your pilot? Before making a real choice, confirm availability and costs from approved current sources.

Transition: Now use the same acceptance rules to record your own model-choice comparison.

Audience question: Which criterion would most change the model-choice decision?

Response guidance: If someone supplies a current model or price from memory, say, “Keep this example synthetic. We need an approved current source before using that detail.” If lowest use is treated as the winner, ask, “Did the result pass the same checks?”

Payoff: You can identify the evidence needed to choose a model for accepted work, rather than judging use alone.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s23-model-choice-demonstration; workshops/ghcp-dev-hack/content/modules/01-foundations/slides.md#model-routing-match-the-task
-->

---
layout: two-panel
class: mc
---

::title::

# Model Choice Practice and Evidence Review

<div class="mc-meta"><span>S24 · Guided optimization lab</span><span>13:06–13:15 · 9 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S24">
  <p>Same workflow, boundary, task, and acceptance rules</p>
  <div class="mc-callout">Change: <b>model choice only</b></div>
  <div class="mc-field"><b>Compare</b><span>completion · developer intervention · quality · time · risk · cost</span></div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-field"><b>Record</b><span>facts · assumptions · unknowns · limits</span></div>
  <div class="mc-field"><b>Decide</b><span>keep · revise · stop</span></div>
  <p class="mc-small"><b>Lead P2/P4 · Evidence P3/P7 · Review P5/P6 · Decide P1/P2</b></p>
</div>

<!--
Timebox: 9 minutes

Talk track: What would make you keep one model choice rather than revise or stop? This worksheet fixes your workflow, finish line, task, and acceptance checks; only the model changes. If one result seems quicker but needs more developer repair, you have not settled the value question. Note what was completed, what people had to fix, and any quality or risk issue before looking at time and cost. Record observed facts separately from assumptions and missing evidence. Write a keep, revise, or stop decision that the evidence supports; it may be provisional. Your delivery and architecture leads can guide the comparison, while risk and finance review their checks.

Transition: Save this record. Next we hold the task steady and examine a change to the context instead.

Audience question: Which result is a fact, and which is still an assumption?

Response guidance: If several factors change at once, say, “Let's hold the task and checks steady so the model is the only difference.” Give participants room to record unknowns.

Payoff: You have a model-choice comparison record with a bounded decision and visible evidence gaps.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s24-model-choice-practice-and-evidence-review
-->

---
layout: two-panel
class: mc
---

::title::

# Context Selection Demonstration

<div class="mc-meta"><span>S25 · Selected native demonstration</span><span>13:15–13:21 · 6 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S25">
  <p>Hold the task and acceptance rules constant.</p>
  <div class="mc-field"><b>First</b><span>stale, repeated, or unrelated context.</span></div>
  <div class="mc-field"><b>Then</b><span>only context needed for the task.</span></div>
  <div class="mc-callout">Compare the accepted result, not context size alone.</div>
</div>

::visual::

<div class="mc-stack">
  <MissionControlContextSelection />
</div>

<!--
Timebox: 6 minutes

Talk track: If we remove an old, unrelated conversation, what would have to stay the same to tell whether that helped? This before-and-after is synthetic. Both sides use the same task and acceptance checks; only the selected context changes. The first side includes stale or repeated material, and the second keeps what the task needs. Smaller input is not automatically a better result. We would need to see whether the work reaches the same finish line with the required quality, and then check effort, time, risk, and cost. Tell me which evidence would let your pilot make that comparison. This picture does not report a measured improvement.

Transition: Let's use that one-change method in your context comparison record.

Audience question: What must remain unchanged between the first and second run?

Response guidance: If someone also changes the task, say, “Reset it so only context changes.” If smaller is called better, ask, “Did the result still pass the same acceptance checks?”

Payoff: You know how to test a context change without mistaking less input for a better outcome.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s25-context-selection-demonstration
-->

---
layout: two-panel
class: mc
---

::title::

# Context Selection Practice and Evidence Review

<div class="mc-meta"><span>S26 · Guided optimization lab</span><span>13:21–13:30 · 9 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S26">
  <p>Same workflow, boundary, task, and acceptance rules</p>
  <div class="mc-callout">Change: <b>context selection only</b></div>
  <div class="mc-field"><b>Compare</b><span>completion · developer intervention · quality · time · risk · cost</span></div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-field"><b>Record</b><span>facts · assumptions · unknowns · limits</span></div>
  <div class="mc-field"><b>Decide</b><span>keep · revise · stop</span></div>
  <p class="mc-small"><b>Lead P2/P4 · Evidence P3/P7 · Review P5/P6 · Decide P1/P2</b></p>
</div>

<!--
Timebox: 9 minutes

Talk track: What would tell you that the context change is worth keeping? Use this worksheet with the same workflow, task, finish line, and acceptance rules you just used. Change only which material the task receives. A shorter prompt is not the result we are buying; accepted completion with an appropriate level of checking is the test. Compare the human effort, quality, time, risk, and cost as evidence allows. Mark what you observed, what you assumed, and what you still need to know. Choose keep, revise, or stop, or mark that choice provisional until the missing evidence is available. Please make your own record now.

Transition: Keep this record alongside the model comparison. Next we'll change the access boundary, not the task.

Audience question: Which result is a fact, and which remains an assumption or unknown?

Response guidance: If someone varies both model and context, say, “Hold the model fixed for this record.” If a decision has no accepted-result evidence, say, “Mark it provisional and name the source you need.” Allow working time.

Payoff: You have a context comparison and a decision whose limits are visible.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s26-context-selection-practice-and-evidence-review
-->

---
layout: two-panel
class: mc
---

::title::

# Tool-and-Permission Demonstration

<div class="mc-meta"><span>S27 · Selected native safety demonstration</span><span>13:30–13:36 · 6 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S27">
  <h2>Least-Privilege Delegation</h2>
  <p>Give the service only the tools, data, permissions, and time needed for the bounded task.</p>
</div>

::visual::

<div class="mc-stack">
  <MissionControlToolPermission />
</div>

<!--
Timebox: 6 minutes

Talk track: What would this task need to read or do, and what should it never do without a person? Watch this non-interactive, synthetic safety sequence. The planning task stays the same; the first view gives broad access, and the second narrows tools, data, permissions, and duration to what is needed. Narrow access alone does not prove a better result, but it makes the boundary easier to reason about. For your pilot, name the specific necessary access and where a human must review before an action. Nothing on this slide performs a live action or proves that a particular current product control is available.

Transition: Now let's record what would change when permission scope changes and what would still need checking.

Audience question: Which permission is necessary, and where is the human checkpoint?

Response guidance: If broad access is offered for convenience, say, “Start with what the bounded task actually needs.” If a technical control is assumed, say, “We must verify its current support before relying on it.”

Payoff: You can name needed access, a human checkpoint, and the stopping boundary for the comparison.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s27-tool-and-permission-demonstration; workshops/ghcp-dev-hack/content/modules/01-foundations/slides.md#least-privilege-delegation
-->

---
layout: two-panel
class: mc
---

::title::

# Tool-and-Permission Practice and Evidence Review

<div class="mc-meta"><span>S28 · Guided optimization lab</span><span>13:36–13:45 · 9 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S28">
  <p>Same workflow, boundary, task, and acceptance rules</p>
  <div class="mc-callout">Change: <b>tools or permissions only</b></div>
  <div class="mc-field"><b>Compare</b><span>completion · developer intervention · quality · time · risk · cost</span></div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-field"><b>Record</b><span>facts · assumptions · unknowns · limits</span></div>
  <div class="mc-field"><b>Decide</b><span>keep · revise · stop</span></div>
  <p class="mc-small"><b>Lead P2/P4 · Evidence P3/P7 · Review P5/P6 · Decide P1/P5</b></p>
</div>

<!--
Timebox: 9 minutes

Talk track: What would justify the access you give this task? In this third record, keep the workflow, task, finish line, and acceptance checks fixed. Change only the tools or permissions. A proposed narrow scope may still fail to complete the work; a broad scope may cross a policy boundary even if the output looks good. Check accepted completion and human intervention alongside quality, time, risk, and cost. Note which behavior you have actually verified and where the human must stop an unapproved action. Mark facts, assumptions, and unknowns; then record keep, revise, or stop with the appropriate risk and outcome decision owners.

Transition: Carry the three comparison records into Use Copilot AI Credits Wisely, then decide what kind of investment the evidence justifies.

Audience question: Which permission changed, and what accepted result changed with it?

Response guidance: If the task scope changes, say, “Reset to the bounded task so permissions are the only variable.” If a control is only proposed, say, “Mark support unknown until it is checked.” Give the group room to decide.

Payoff: You have an access comparison with a human checkpoint and a defensible decision limit.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s28-tool-and-permission-practice-and-evidence-review
-->

---
layout: single-panel
class: mc
---

::title::

# Use Copilot AI Credits Wisely

<div class="mc-meta"><span>S29 · Guided optimization lab</span><span>13:45–13:48 · 3 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S29">
  <p class="mc-small">Here, <b>AIC</b> means GitHub Copilot AI credits: a billing unit, not a token count.</p>
  <div class="mc-four-grid">
    <div><b>1. Model fit</b><span class="mc-small">Match an approved model to a bounded task; verify the accepted result.</span></div>
    <div><b>2. Relevant context</b><span class="mc-small">Send only current, relevant context; remove repeats and stale material.</span></div>
    <div><b>3. Inspect before retry</b><span class="mc-small">Ask for the needed output and acceptance check; inspect before retrying.</span></div>
    <div><b>4. Applicable rates</b><span class="mc-small">Check model-specific input, output and applicable cached-token rates.</span></div>
  </div>
  <div class="mc-callout"><b>Payoff:</b> Same task and checks; weigh AIC, review time and risk against accepted work.</div>
  <p class="mc-small">No guaranteed savings. Recheck applicable usage and rates at delivery.</p>
</div>

<!--
Timebox: 3 minutes

Talk track: Which of your three comparisons preserved accepted work and the human safety checkpoint? This is a quick way to read those records before a funding choice, not another experiment. Here AIC means GitHub Copilot AI credits, a billing unit, not a token count. The four cards remind you to match an approved model to the task, keep context current and relevant, ask for the output and acceptance check you need, and inspect before retrying. Credit accounting can depend on the model and on input, output, and applicable cached-token rates. Keep the task and checks fixed. Weigh credits, review time, and risk against work that actually passed. None of these tips guarantees savings or excuses a weaker result or an unsafe action.

Transition: Bring that AIC-aware view of accepted work into Choose the Funding Purpose.

Audience question: Which existing comparison record best preserves accepted work and the human checkpoint?

Response guidance: If someone chooses the fewest tokens alone, say, “Tokens aren't credits or accepted value. Check the applicable rates, human review, and required safety checks.” If AIC evidence is unavailable, say, “Mark it unknown, not zero; check approved current usage and rates before deciding cost.”

Payoff: You can use AIC as one criterion alongside review effort, risk, and accepted work when choosing funding.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s29-use-copilot-ai-credits-wisely
-->

---
layout: single-panel
class: mc
---

::title::

# Choose the Funding Purpose

<div class="mc-meta"><span>S30 · Investment and portfolio</span><span>13:48–13:57 · 9 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S30">
  <div class="mc-three-grid">
    <div><b>Exploration</b><span>bounded learning before reliability is known</span></div>
    <div><b>Production</b><span>governed work with demonstrated reliability and leverage</span></div>
    <div><b>Exception</b><span>a time-limited need outside the normal allocation</span></div>
  </div>
  <div class="mc-callout">Separate <b>fixed license · variable usage · implementation · validation · change management · operating cost</b>.</div>
  <p class="mc-small"><b>Lead P6/P1 · Evidence P3/P7 · Review P2/P4/P5 · Decide P6</b></p>
</div>

<!--
Timebox: 9 minutes

Talk track: What kind of commitment is your evidence ready for? These three cards distinguish learning within bounds from routine governed operation and from a time-limited exception. If your comparison still lacks acceptance or risk evidence, that looks more like exploration than proven production. The line below the cards reminds us that paying for access is not the entire cost: checking results and changing the workflow also take effort. With finance and the outcome owner, choose a funding purpose for your pilot and identify the cost categories you must investigate. Do not turn unknown costs into a budget estimate.

Transition: Once we know why we're paying, we need to choose who pays and how use or cost is reported.

Audience question: Which funding purpose matches the current evidence?

Response guidance: If production is proposed without reliability evidence, say, “Mark that gap. Would a bounded exploration be the responsible next step?” Leave time to choose the purpose.

Payoff: You have a funding purpose matched to evidence, plus the cost categories still to verify.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s30-choose-the-funding-purpose
-->

---
layout: single-panel
class: mc
---

::title::

# Choose Central Funding, Showback, or Chargeback

<div class="mc-meta"><span>S31 · Investment and portfolio</span><span>13:57–14:06 · 9 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S31">
  <div class="mc-three-grid">
    <div><b>Central funding</b><span>one budget pays</span></div>
    <div><b>Showback</b><span>report use or cost to an owner without moving money</span></div>
    <div><b>Chargeback</b><span>assign cost to a budget owner through an agreed process</span></div>
  </div>
  <div class="mc-callout">Choose for clarity, fairness, useful behavior, and practical administration.</div>
  <p class="mc-small"><b>Lead P6 · Evidence P3/P7 · Review P1/P2/P4/P5 · Decide P6/P1</b></p>
</div>

<!--
Timebox: 9 minutes

Talk track: Who should see the cost, and who should actually pay it? Under central funding, one budget pays. With showback, the team sees its use or cost without moving money. Chargeback means an agreed process assigns that cost to a budget owner. Those are different choices, not three labels for the same report. For a pilot still learning its usage pattern, ask what arrangement makes ownership clear and is fair to administer; don't assume a billing mechanism exists because a report can be shown. With finance, choose the approach, name its owner, and set a threshold for revisiting it.

Transition: Next, use that cost ownership and the evidence so far to compare this pilot with other opportunities.

Audience question: Which approach is fair and practical for this pilot?

Response guidance: If chargeback is called a report, say, “A report is showback; chargeback moves cost through an agreed process.” Give the group space to choose a review threshold.

Payoff: You have a funding or reporting choice with a responsible owner and a point to review it.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s31-choose-central-funding-showback-or-chargeback
-->

---
layout: single-panel
class: mc
---

::title::

# Rank the Portfolio

<div class="mc-meta"><span>S32 · Investment and portfolio</span><span>14:06–14:18 · 12 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S32">
  <div class="mc-five-grid"><b>expected value</b><b>evidence strength</b><b>practicality</b><b>risk</b><b>cost exposure</b></div>
  <div class="mc-decision-strip"><b>fund first</b><b>gather evidence</b><b>wait</b><b>stop</b></div>
  <div class="mc-callout">Do not rank by adoption or consumption alone.</div>
  <p class="mc-small"><b>Lead P6/P1 · Evidence P2/P3/P7 · Review P4/P5 · Decide P1/P6</b></p>
</div>

<!--
Timebox: 12 minutes

Talk track: If you could only back one opportunity first, which would it be? The five headings on this slide make the comparison broader than tool adoption: expected outcome, strength of the evidence, ability to run the work, risk, and cost exposure. An option with high use but no clear finish line may need evidence before money. An option with a useful outcome but an unresolved policy approval may have to wait. Rank your real options against these headings, then decide which to fund first, investigate, wait on, or stop. Name the budget owner and the threshold that would change the choice.

Transition: Keep your ranking and funding owner. After the break, we'll assign the rest of the operating decisions.

Audience question: Which factor most changes the ranking?

Response guidance: If use alone determines the order, ask, “What accepted outcome and evidence strength would justify that ranking?” Leave the group space to compare options.

Payoff: You have a ranked set of opportunities and a funding choice tied to evidence rather than use alone.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s32-rank-the-portfolio
-->

---
layout: section
class: mc mc-break
---

# Break

<div data-slide-id="U03">
  <p>Please return at <b>14:33</b>.</p>
</div>

<!--
Timebox: 15 minutes

Talk track: Let's take the full break. Please return at 14:33. You do not need to resolve any open decision while you're away.

Transition: When we return at 14:33, we'll name who has each pilot decision right.

Audience question: What time do we return?

Response guidance: If anyone asks whether to keep working, say, “No homework; the open items can wait.”

Payoff: You can take the full break without doing decision work.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#u03-break
-->

---
layout: two-panel
class: mc
---

::title::

# Assign Recommend, Decide, Fund, Approve, Execute

<div class="mc-meta"><span>S33 · Enterprise operating model</span><span>14:33–14:43 · 10 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S33">
  <p>For each pilot decision, name who:</p>
  <div class="mc-chip-grid"><b>recommends</b><b>decides</b><b>funds</b><b>approves</b><b>executes</b></div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-callout">Product permission is not policy authority.</div>
  <div class="mc-callout">Funding is not risk approval.</div>
  <p class="mc-small"><b>Lead P1/P2 · Evidence P3/P4/P5/P6 · Review P7 · Decide each named authority</b></p>
</div>

<!--
Timebox: 10 minutes

Talk track: If someone can turn a pilot feature on, does that mean they can approve the pilot? No. The left panel separates recommending a change, making the investment decision, funding it, approving its boundary, and doing the work. The warnings on the right matter: a product permission does not grant policy authority, and a budget does not grant risk approval. For your pilot, name the real people or functions holding each right. For example, a platform owner might execute an approved configuration while the outcome owner makes the investment decision. Check the authority, not just the job title, and leave any missing approval visibly unresolved.

Transition: Getting a pilot started is only half the charter. Next we assign who keeps it governed.

Audience question: Which decision right is currently unnamed?

Response guidance: If one person is given every right, ask, “Which of those rights can they actually exercise, and which needs separate approval?” Leave space to assign owners.

Payoff: You have named who may recommend, decide, fund, approve, and execute without confusing access with authority.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s33-assign-recommend-decide-fund-approve-execute
-->

---
layout: two-panel
class: mc
---

::title::

# Assign Enable, Monitor, Review, Renew, Retire, Escalate

<div class="mc-meta"><span>S34 · Enterprise operating model</span><span>14:43–14:53 · 10 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S34">
  <p>Name who:</p>
  <div class="mc-chip-grid"><b>enables</b><b>monitors</b><b>reviews</b><b>renews</b><b>retires</b><b>escalates</b></div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-field"><b>For every right</b><span>evidence · cadence · handoff · expiry · backup owner</span></div>
  <p class="mc-small"><b>Lead P2/P3 · Evidence P4/P5/P6/P7 · Review P1 · Decide each named authority</b></p>
</div>

<!--
Timebox: 10 minutes

Talk track: Once the pilot starts, who notices when its approval expires or a control stops working? These cards extend your charter from launch into operation. Enabling is different from monitoring; renewing a bounded approval is different from quietly leaving access in place. For each right, attach the evidence the owner needs, when they check it, who receives the handoff, and who covers an absence. For example, if an exception is nearing expiry, someone must review it or escalate rather than assume it renews itself. Work through your pilot's owners and mark missing backups as dependencies.

Transition: Let's test these handoffs against a difficult situation rather than trusting that the chart alone will work.

Audience question: Which handoff or backup owner is missing?

Response guidance: If ownership is only “the team,” ask, “Who receives the alert and who takes over if that person is absent?” Give the group room to identify the backup.

Payoff: You have operating owners, review handoffs, and expiry paths for the pilot.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s34-assign-enable-monitor-review-renew-retire-escalate
-->

---
layout: single-panel
class: mc
---

::title::

# Stress-Test the Operating Model

<div class="mc-meta"><span>S35 · Enterprise operating model</span><span>14:53–15:03 · 10 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S35">
  <p>Test one:</p>
  <div class="mc-four-grid"><div><b>incident</b></div><div><b>exception</b></div><div><b>expired approval</b></div><div><b>evidence failure</b></div></div>
  <div class="mc-question-grid">
    <div><b>Pause and investigate</b><span>Who?</span></div><div><b>Inform leaders</b><span>Who?</span></div>
    <div><b>Approve recovery</b><span>Who?</span></div><div><b>Restart or retire</b><span>Who?</span></div>
  </div>
</div>

<!--
Timebox: 10 minutes

Talk track: Which of these imagined events would most challenge your pilot charter? Pick just one. Suppose an approval expires while work is underway. The boxes ask who pauses the work and investigates, who tells leaders, who can approve recovery, and who decides to restart or retire. Walk the scenario using the authorities you just named. If no one can make a required call, do not fill the gap by assuming the nearest person has permission. Record the missing handoff and who must resolve it. This is a stress test on paper, not a report of an actual incident.

Transition: Bring the gaps you found into the full ownership map so the next handoff is explicit.

Audience question: Who has authority to pause and restart the pilot?

Response guidance: If no one knows who may restart, say, “Leave that authority unresolved and name who must confirm it.” Give participants room to run their scenario.

Payoff: You have tested a realistic handoff and recorded the authority gaps before they become pilot assumptions.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s35-stress-test-the-operating-model
-->

---
layout: single-panel
class: mc
---

::title::

# Complete the Ownership and Decision Map

<div class="mc-meta"><span>S36 · Enterprise operating model</span><span>15:03–15:18 · 15 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S36">
  <div class="mc-process-line">proposes <i>→</i> validates <i>→</i> approves boundary <i>→</i> funds <i>→</i> enables <i>→</i> monitors <i>→</i> handles incident/exception <i>→</i> reviews expiry or escalation</div>
  <div class="mc-callout">For every step: <b>owner, evidence, next handoff, and decision date.</b></div>
  <p class="mc-small"><b>Lead P1/P2 · Evidence P3-P7 · Review/Decide each named authority</b></p>
</div>

<!--
Timebox: 15 minutes

Talk track: Where might your pilot get stuck between a good proposal and a responsible review? Read the arrows as handoffs, not as proof that a function has already signed off. A proposal needs validation; an approved boundary still needs funding and someone to enable it; monitoring needs a route to handle an exception or expiry. At each arrow, ask what evidence travels with the work and who receives it next. Use the gaps from your stress test to fill this map with owners and decision dates. If an authority is absent, record the dependency and the escalation path rather than naming a convenient substitute.

Transition: With the operating chain mapped, we can trace how a governed change might lead to an accepted result.

Audience question: Which step lacks an owner, evidence source, or next handoff?

Response guidance: If a handoff still has no authority, say, “That stays a dependency. Who can resolve it, and by when?” Let the group complete the map.

Payoff: You have a working operating charter, including visible unresolved handoffs and escalation.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s36-complete-the-ownership-and-decision-map
-->

---
layout: two-panel
class: mc
---

::title::

# Connect the Change to an Accepted Outcome

<div class="mc-meta"><span>S37 · Prove ROI</span><span>15:18–15:26 · 8 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S37">
  <div class="mc-field"><b>Change</b><span>___ in workflow ___</span></div>
  <div class="mc-field"><b>Completion boundary</b><span>___</span></div>
  <div class="mc-field"><b>Required acceptance checks</b><span>___</span></div>
</div>

::visual::

<div class="mc-stack">
  <div class="mc-field"><b>Expected engineering result</b><span>___</span></div>
  <div class="mc-field"><b>Expected business result</b><span>___</span></div>
  <div class="mc-field"><b>Evidence that links them</b><span>___</span></div>
  <div class="mc-callout">Cost or usage reduction alone is not ROI.</div>
</div>

<!--
Timebox: 8 minutes

Talk track: If your pilot makes one step faster, what would make that matter to the business? The left side starts with the change, the finish line, and the checks work must pass. The right asks what engineering result follows, what business result you expect, and how you would link the two. For example, faster pull-request drafting is not yet a shorter delivery cycle; a reviewed, accepted story would be evidence closer to that claim. Trace your own mission through the boxes. If the chain stops at tokens or cost, ask what accepted outcome they support. A lower bill or higher use by itself is not ROI.

Transition: Before we credit a result to the change, let's design a comparison that can survive a challenge.

Audience question: Where is the weakest link between change and business result?

Response guidance: If the chain ends with activity, ask, “Which finished result passed your required checks?” Leave space to write the missing link.

Payoff: You have a chain showing what would connect the pilot change to an accepted outcome and useful result.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s37-connect-the-change-to-an-accepted-outcome
-->

---
layout: single-panel
class: mc
---

::title::

# Make the Comparison Fair

<div class="mc-meta"><span>S38 · Prove ROI</span><span>15:26–15:34 · 8 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S38">
  <p>Compare the same:</p>
  <div class="mc-five-grid"><b>task</b><b>population</b><b>period</b><b>completion boundary</b><b>acceptance test</b></div>
  <div class="mc-callout"><b>Change one important factor.</b></div>
  <div class="mc-evidence-strip"><b>facts</b><b>assumptions</b><b>unknowns</b><b>limits</b></div>
</div>

<!--
Timebox: 8 minutes

Talk track: If pilot work appears to finish faster, what else might explain it? The five headings remind you to compare like with like: the same task, people or group, period, finish line, and acceptance check. Change one important factor for the comparison. If the pilot also moves to easier work or skips review, you cannot credit the difference to AI alone. Design a comparison for your workflow and name at least one confounder or data-quality gap. Mark what you know, what you assume, and what remains unknown before you interpret any apparent gain.

Transition: Next we'll turn that comparison plan into measures that can inform a pilot decision.

Audience question: Which confounder could change your interpretation?

Response guidance: If several things changed, say, “Can we narrow the comparison? If not, state clearly what we cannot attribute to AI.” Give the group space to note a limit.

Payoff: You have a comparison design and a named reason its conclusions may be limited.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s38-make-the-comparison-fair
-->

---
layout: single-panel
class: mc
---

::title::

# Build the Seven-Measure Pilot Scorecard

<div class="mc-meta"><span>S39 · Prove ROI</span><span>15:34–15:44 · 10 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S39">
  <div class="mc-score-measures">
    <span>Valid completion</span><span>Developer intervention</span><span>Cycle time</span><span>Rework/quality</span>
    <span>AI cost per accepted outcome</span><span>Operational risk</span><span>Business outcome</span>
  </div>
  <p class="mc-kicker">For every measure</p>
  <div class="mc-score-fields"><span>definition</span><span>starting point</span><span>source</span><span>owner</span><span>cadence</span><span>decision supported</span></div>
  <p class="mc-small"><b>Lead P7/P1/P6 · Evidence P2/P3/P4 · Review P5 · Decide P1</b></p>
</div>

<!--
Timebox: 10 minutes

Talk track: Which signal would make you stop or change this pilot? This scorecard keeps the evidence close to the workflow: did work finish validly, how much human help did it need, how long did it take, and did quality hold? It also asks about AI cost per accepted outcome, operational risk, and the business result. That is different from simply counting attempts. For your pilot, define what one measure means, where its starting evidence comes from, and who will check it. Then fill the rest with a source, review rhythm, and decision each measure supports. Keep missing sources visible; the lab comparisons alone do not establish business value.

Transition: Now let's translate these detailed pilot signals into a view leaders can use without hiding uncertainty.

Audience question: Which measure currently lacks a source, owner, or decision?

Response guidance: If use is offered as the outcome, ask, “Which accepted work or business result does it help explain?” If a source is absent, say, “Mark that evidence dependency; don't make up a starting value.” Allow the scorecard work to continue.

Payoff: You have a pilot scorecard that ties measures to decision owners while exposing missing evidence.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s39-build-the-seven-measure-pilot-scorecard
-->

---
layout: two-panel
class: mc
---

::title::

# Build the Executive Scorecard

<div class="mc-meta"><span>S40 · Prove ROI</span><span>15:44–15:53 · 9 min</span></div>

::text::

<div class="mc-stack" data-slide-id="S40">
  <p>Roll evidence into five views:</p>
  <div class="mc-exec-views"><span>Adoption</span><span>Delivery</span><span>Quality</span><span>Capacity</span><span>Financial</span></div>
  <div class="mc-callout">Adoption shows use. It does not prove value by itself.</div>
</div>

::visual::

<div class="mc-stack">
  <p class="mc-kicker">Pilot evidence → executive decision view</p>
  <div class="mc-field"><b>Show for every view</b><span>decision · trend · limit · owner · next review</span></div>
  <div class="mc-field"><b>Relationship</b><span>Seven pilot measures supply evidence.<br>Five executive views organize the decision.</span></div>
  <p class="mc-small"><b>Lead P1/P7/P6 · Evidence P2/P3/P4 · Review P5 · Decide P1/P6</b></p>
</div>

<!--
Timebox: 9 minutes

Talk track: What does a leader need to see to decide whether this pilot continues? The left panel groups the detailed scorecard into views of use, delivery, quality, capacity, and finances. The right shows the relationship: the pilot measures provide evidence; these views organize the decision, its trend, limit, owner, and next review. If adoption rises while accepted completion falls, do not smooth that conflict away. Which pilot measure belongs under each view, and what decision does it help make? Keep evidence limits beside the summary so the executive view does not make an uncertain result look proven.

Transition: Once the evidence is organized for leaders, we need rules for what happens at a checkpoint.

Audience question: Which pilot measure supports each executive view, and where is the evidence still missing?

Response guidance: If the same use metric fills every view, ask, “What distinct decision does each view support?” If adoption is called value, say, “It shows use; where is the accepted outcome?”

Payoff: You have a leadership view that carries pilot evidence and its limits into a decision.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s40-build-the-executive-scorecard
-->

---
layout: single-panel
class: mc
---

::title::

# Set Stop, Revise, Fund, and Scale Gates

<div class="mc-meta"><span>S41 · Prove ROI</span><span>15:53–16:03 · 10 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S41">
  <div class="mc-prompt">Gate ___ · threshold/evidence ___ · checkpoint date ___ · owner ___ · decision authority ___<br>If unmet ___ · If met ___</div>
  <div class="mc-decision-strip"><b>Stop</b><b>Revise</b><b>Fund</b><b>Scale</b></div>
  <div class="mc-callout">A scale gate cannot rely only on adoption, usage, access, or generated output.</div>
</div>

<!--
Timebox: 10 minutes

Talk track: What would cause you to pause this pilot rather than keep spending? The sentence on screen is a decision rule, not a blank approval. Set the evidence threshold and checkpoint, name who brings the evidence and who can make the call, then write what happens if the threshold is met or missed. For example, if required acceptance checks fail, a stop or revision may be appropriate even if use is growing. Funding or scaling needs more than access or generated output; it needs accepted results and the relevant risk and cost evidence. Write the gates for your mission and leave an unresolved authority marked as such.

Transition: Next we'll give those decision gates review points and owners on the plan.

Audience question: Who holds authority at each gate?

Response guidance: If a gate says “looks good,” ask, “Which evidence, checked by whom, would make that a decision?” Give people space to write both met and unmet actions.

Payoff: You have owned stop, revise, fund, and scale conditions, not automatic approval.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s41-set-stop-revise-fund-and-scale-gates
-->

---
layout: single-panel
class: mc
---

::title::

# Set the 30/60/90 Review Points

<div class="mc-meta"><span>S42 · Action plan</span><span>16:03–16:17 · 14 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S42">
  <div class="mc-three-grid">
    <div><b>30 days</b><span>first evidence, control, or ownership gap to close</span></div>
    <div><b>60 days</b><span>comparison and operating review</span></div>
    <div><b>90 days</b><span>investment decision evidence</span></div>
  </div>
  <div class="mc-field"><b>For each review point</b><span>action · evidence · owner · decision maker · dependency · review date</span></div>
  <div class="mc-callout">These are review horizons, not promised result dates.</div>
</div>

<!--
Timebox: 14 minutes

Talk track: What should your team know at each review, not what do you hope will magically be true by then? The first card is for closing an evidence, control, or ownership gap. The middle card checks the comparison and how the pilot is running. The last card gathers what the investment decision requires. For example, if a cost source is missing now, assign someone to obtain it before a funding review rather than assume a figure. Put an action, evidence source, owner, decision maker, dependency, and real review date beside each point. These are review horizons, not promised dates for a benefit.

Transition: A calendar alone won't unblock the work. Let's put the necessary actions in order.

Audience question: Which dependency must be closed first?

Response guidance: If someone promises a result at a review point, say, “Make that the evidence you'll check, not a guaranteed outcome.” Leave time to assign the review owners.

Payoff: You have owned review points that ask for evidence rather than promise results.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s42-set-the-30-60-90-review-points
-->

---
layout: single-panel
class: mc
---

::title::

# Sequence the First Actions

<div class="mc-meta"><span>S43 · Action plan</span><span>16:17–16:33 · 16 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S43">
  <p>Put first:</p>
  <div class="mc-chip-grid">
    <b>blocked dependencies</b><b>evidence collection</b><b>control decisions</b>
    <b>comparison setup</b><b>operating handoffs</b><b>leadership reviews</b>
  </div>
  <div class="mc-callout">Every action needs an <b>owner, due date, dependency, and decision it unlocks.</b></div>
  <p class="mc-small"><b>Lead P2/P1 · Evidence all owners · Review P5/P6/P7 · Decide each action authority</b></p>
</div>

<!--
Timebox: 16 minutes

Talk track: What has to happen before your pilot can responsibly start or continue? These chips are not a checklist to perform in any order. A missing risk approval might block access; a missing starting measure might block an honest comparison. Put those blockers ahead of the activities they unlock, then connect evidence collection, controls, operating handoffs, and leader reviews. Give each action a named owner, due date, dependency, and decision it makes possible. Ask risk, finance, and measurement owners to review the order. Work on your own sequence now; if an approval is unresolved, show it as a dependency, not an accomplished action.

Transition: With the first actions ordered, let's collect the evidence and open items into one decision package.

Audience question: Which action must happen first, and what decision does it unlock?

Response guidance: If an action has no owner or due date, say, “We can't rely on it yet. Who will take it and when will they bring it back?” Give teams room to sequence their work.

Payoff: You have an actionable order of work that shows what each step unlocks.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s43-sequence-the-first-actions
-->

---
layout: single-panel
class: mc
---

::title::

# Assemble the Pilot Decision Package

<div class="mc-meta"><span>S44 · Pilot decision</span><span>16:33–16:47 · 14 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S44">
  <div class="mc-package-grid">
    <b>mission</b><b>ROI path</b><b>expected value</b><b>usage/cost starting point</b><b>control map</b>
    <b>three comparisons</b><b>funding</b><b>operating charter</b><b>pilot + executive scorecards</b><b>gates</b><b>30/60/90 plan</b>
  </div>
  <div class="mc-evidence-strip"><b>Unresolved evidence ___</b><b>Unresolved authority ___</b><b>Unresolved dependency ___</b></div>
  <p class="mc-small"><b>Lead P1/pilot owner · Evidence P2-P7 · Review funding/policy/scale authorities · Decide designated authorities</b></p>
</div>

<!--
Timebox: 14 minutes

Talk track: If the decision maker opened your pilot package now, what could they decide and what would still be missing? This grid brings the mission and value hypothesis together with costs, controls, comparison records, ownership, scorecards, decision gates, and the action plan. It is not an instruction to fill unknown fields with guesses. Look especially at the bottom strip: unresolved evidence, authority, and dependencies must be as easy to find as the recommendation. Have the pilot owner assemble the package and ask funding, policy, and scale authorities what they still need before making their respective decisions. Leave space for the team to bring its material together.

Transition: Now we'll use the package for a readout that can be challenged, not just presented.

Audience question: Which unresolved item could block the next decision?

Response guidance: If a missing approval is presented as complete, say, “Show the gap and name who can resolve it.” Allow time to assemble the package rather than talking over the work.

Payoff: You have a decision-ready package that makes its remaining gaps explicit.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s44-assemble-the-pilot-decision-package
-->

---
layout: single-panel
class: mc
---

::title::

# Present, Challenge, and Decide

<div class="mc-meta"><span>S45 · Executive readout</span><span>16:47–17:03 · 16 min</span></div>

::content::

<div class="mc-stack" data-slide-id="S45">
  <p>Present the recommendation. Challenge the evidence. Record the next decision.</p>
  <div class="mc-decision-strip"><b>Stop</b><b>Revise</b><b>Fund</b><b>Scale</b></div>
  <div class="mc-final-sentence">For workflow ___, we will test ROI path ___ through pilot ___, within boundary ___, funded by ___, governed by ___, measured using ___, and reviewed on ___ by decision authority ___ to decide whether to stop, revise, fund, or scale.</div>
  <div class="mc-callout">Do not invent consensus. Record dissent, missing evidence, dependencies, owners, and the next review.</div>
</div>

<!--
Timebox: 16 minutes

Talk track: What can your evidence support today, and who is authorized to decide the next step? This screen gives you a choice, not a requirement to fund or scale. Please present your recommendation and invite a challenge to its finish line, evidence, cost, controls, or attribution. Every group should complete the exact statement displayed so the workflow, ROI path, pilot boundary, funding, governance, measures, review, and decision authority remain connected. Record dissent, missing evidence, dependencies, owners, and the next review without inventing consensus. Stop or revise is a responsible decision if the evidence does not yet justify funding or scale.

Transition: Close on the recorded next decision, its actual authority, and the next review—not an implied agreement.

Audience question: What is the next decision, and who has authority to make it?

Response guidance: If no one has the authority or a review date, say, “Record that gap and name who will confirm it.” If a hoped-for benefit is described as achieved, ask, “What accepted outcome and comparison support that claim?” Let every group complete its statement.

Payoff: You leave with the required final pilot statement and a recorded next decision or an explicit unresolved decision dependency.

Sources: content/modules/01-copilot-value-lab/mission-control-source.md#s45-present-challenge-and-decide
-->
