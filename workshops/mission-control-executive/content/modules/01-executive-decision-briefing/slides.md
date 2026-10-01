---
theme: ghcp
title: "Mission Control: Executive AI Value Decision Briefing"
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
class: mce
---

# Decision Before Us

<div class="mce-shell mce-shell--chief" data-slide-id="S01">
  <span class="mce-meta">Decision first · 00:00–00:02</span>
  <div class="mce-stage mce-stage--decision">
    <section class="mce-decision-docket">
      <div class="mce-section-label">Pending decision</div>
      <p class="mce-lead">Should <b>[decision authority]</b> fund a bounded pilot that allows <b>[named team]</b> to use an approved AI coding assistant for defined drafting tasks in its pull-request-based production change-control workflow?</p>
      <div class="mce-choice-row" aria-label="Today's choices"><div><b>Today's choices: Stop · Revise · Fund</b></div></div>
      <p class="mce-warning"><b>Scale is not available until later evidence and readiness gates.</b></p>
      <div class="mce-field-strip">Decision owner ___ · Sponsor ___ · Gate date ___</div>
      <p class="mce-bottom-line">The rest of this brief tests whether this ask is supportable.</p>
    </section>
    <ChiefCharacterImage
      src="/images/chief-charter-cc01-decision.png"
      role="decision"
    />
  </div>
  <EvidenceDecisionRail :step="1" phase="Decision first" />
</div>

<!--
Timebox: 2 minutes

Talk track: Start with the decision, not the technology. Which named authority owns this choice? We are asking whether to fund a bounded pilot for one named team, using an approved AI coding assistant only for defined drafting tasks inside its pull-request-based production change-control workflow. Today’s available choices are Stop, Revise, or Fund. Scale is deliberately unavailable until later evidence and readiness gates. Before we continue, name the decision owner, sponsor, and gate date. If any field is blank, leave the gap visible. Do not fill it with an assumption. Everything that follows tests whether this specific ask is supportable. It does not presume a favorable answer, a product result, or a customer outcome.

Transition: First test the burden of proof in Why Current Evidence Is Not Enough.

Audience question: Who is the decision authority for this pilot, and is that authority confirmed?

Response guidance: Accept a name, role, or an explicit authority gap. If several people are named, ask who has final decision rights. If no authority is confirmed, state that the gap must remain in the gate record.

Payoff: The briefing begins with an owned, bounded decision instead of a general conversation about AI.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s01-decision-before-us; content/modules/01-executive-decision-briefing/slide-manifest.md row 1; content/storyboards/executive-decision-story/storyboard.md S01
-->

---
layout: default
class: mce
---

# Why Current Evidence Is Not Enough

<div class="mce-shell mce-shell--chief" data-slide-id="S02">
  <span class="mce-meta">Decision first · Evidence gap · 00:02–00:04</span>
  <div class="mce-stage mce-stage--evidence">
    <div class="mce-motion-stage is-replaying" data-motion-role="evidence-gap">
      <section class="mce-evidence-surface">
        <div class="mce-activity-column">
          <div class="mce-section-label">Current evidence</div>
          <div class="mce-activity-list">
            <span class="mce-beat">Access ·</span><span class="mce-beat">adoption ·</span><span class="mce-beat">use ·</span><span class="mce-beat">generated output ·</span><span class="mce-beat">one successful pull request</span>
          </div>
          <p>show activity, not value.</p>
          <div class="mce-classify">Label every item <b>fact · assumption · unknown</b>.</div>
        </div>
        <div class="mce-proof-gap" aria-hidden="true"><b>Evidence gap</b><span>≠</span></div>
        <div class="mce-missing-column">
          <div class="mce-section-label">Still missing</div>
          <ul>
            <li class="mce-beat">a production change that is done and accepted;</li>
            <li class="mce-beat">what would have happened without the pilot;</li>
            <li class="mce-beat">a technical result linked to a business outcome;</li>
            <li class="mce-beat">held quality, security, compliance, and service reliability;</li>
            <li class="mce-beat">the full pilot cost; and</li>
            <li class="mce-beat">repeatable controls and ownership.</li>
          </ul>
        </div>
      </section>
    </div>
    <ExecutiveMotion slide-id="S02" />
    <ChiefCharacterImage
      src="/images/chief-charter-cc02-evidence-challenge.png"
      role="evidence challenge"
    />
  </div>
  <EvidenceDecisionRail :step="2" phase="Decision first" />
</div>

<!--
Timebox: 2 minutes

Talk track: What does the current record actually prove? Access, adoption, use, generated output, and one successful pull request show activity. They do not prove value. We still need evidence that a production change reached the agreed done point and passed acceptance. We need a fair account of what would have happened without the pilot. We need a technical result linked to a business outcome while quality, security, compliance, and service reliability hold. We also need the full pilot cost and repeatable controls with named ownership. Label every item as fact, assumption, or unknown. That label matters because an attractive activity number can still be an assumption about value. The gap on this page is the burden of proof for the rest of the briefing.

Transition: Close the first evidence gap by specifying Bound the Production Change Workflow.

Audience question: Which item in the current record is being treated as value when it is only activity?

Response guidance: Ask the speaker to classify the item as fact, assumption, or unknown. If someone cites a result, ask whether the work was done and accepted and whether a comparison supports the claim. Preserve uncertainty if that evidence is absent.

Payoff: Activity remains useful context without being promoted into unsupported value evidence.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s02-why-current-evidence-is-not-enough; content/modules/01-executive-decision-briefing/slide-manifest.md row 2; content/storyboards/executive-decision-story/storyboard.md S02
-->

---
layout: default
class: mce
---

# Bound the Production Change Workflow

<div class="mce-shell" data-slide-id="S03">
  <span class="mce-meta">Govern · Boundary · 00:04–00:07</span>
  <div class="mce-stage">
    <div class="mce-motion-stage is-replaying" data-motion-role="workflow">
      <section class="mce-workflow-surface">
        <div class="mce-scope-row">
          <div><b>People and work in scope (population):</b> one named team · named repositories · eligible production changes</div>
          <div><b>Period:</b> earlier period ___ · pilot period ___</div>
        </div>
        <div class="mce-section-label">One workflow, end to end</div>
        <div class="mce-workflow-chain">
          <span class="mce-beat">approved change request</span><i>-></i><span class="mce-beat">plan</span><i>-></i><span class="mce-beat mce-change-point">code + tests</span><i>-></i><span class="mce-beat">pull request</span><i>-></i><span class="mce-beat">automated checks</span><i>-></i><span class="mce-beat mce-human-check">human peer/security/policy review</span><i>-></i><span class="mce-beat">merge</span><i>-></i><span class="mce-beat">deploy</span><i>-></i><span class="mce-beat">observe</span><i>-></i><span class="mce-beat">business-outcome review</span>
        </div>
        <div class="mce-boundary-fields">
          <div><b>AI assistance allowed only at:</b> ___</div>
          <div><b>Excluded:</b> emergencies · prohibited data or tasks · unapproved repositories, models, or tools · AI actions outside the approved boundary</div>
        </div>
        <p class="mce-control-line">No required workflow step or human check is skipped.</p>
      </section>
    </div>
    <ExecutiveMotion slide-id="S03" />
  </div>
  <EvidenceDecisionRail :step="3" phase="Govern" />
</div>

<!--
Timebox: 3 minutes

Talk track: Where, exactly, does the pilot begin and end? Name one team, the repositories, and the eligible production changes. Then set the earlier period and pilot period before results are interpreted. Follow one workflow end to end: approved change request, plan, code and tests, pull request, automated checks, human peer, security, and policy review, merge, deploy, observe, and business-outcome review. The assistant is allowed only at the declared change point. It does not erase a required step. Emergencies, prohibited data or tasks, unapproved repositories, models, or tools, and AI actions outside the approved boundary remain excluded. Notice the human review checkpoint. It is not a decorative stop on the rail. The pilot cannot route around it. If work returns for revision, that return remains part of the workflow evidence.

Transition: With the boundary fixed, State What We Expect to Improve.

Audience question: At which exact workflow step is AI assistance allowed, and where is it prohibited?

Response guidance: Ask for a specific step and task, not “development” in general. If the answer spans the whole workflow, return to the named drafting task and exclusions. Record an unknown rather than broadening the boundary.

Payoff: A bounded workflow makes the proposed change testable, governable, and comparable.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s03-bound-the-production-change-workflow; content/modules/01-executive-decision-briefing/slide-manifest.md row 3; content/storyboards/executive-decision-story/storyboard.md S03
-->

---
layout: default
class: mce
---

# State What We Expect to Improve

<div class="mce-shell" data-slide-id="S04">
  <span class="mce-meta">Improve · Hypothesis · 00:07–00:09</span>
  <div class="mce-stage">
    <section class="mce-hypothesis">
      <div class="mce-if-card"><b>If</b><span>approved AI assistance supports only ___ inside this bounded workflow,</span></div>
      <div class="mce-causal-arrow">then:</div>
      <div class="mce-result-card"><b>Expected technical result</b><span>developer effort per accepted production change may fall and/or the number of accepted changes may rise.</span></div>
      <div class="mce-causal-arrow">may support</div>
      <div class="mce-result-card mce-result-card--business"><b>Expected business outcome</b><span>shorter time to an accepted production change may improve ___ for ___.</span></div>
      <div class="mce-hold-band"><b>Hold:</b> acceptance quality · security · compliance · service reliability</div>
      <div class="mce-link-fields">
        <div><b>How value may be created</b> ___</div>
        <div><b>Evidence connecting the two results</b> ___</div>
      </div>
      <p class="mce-caveat">This is a testable expectation, not a universal productivity claim.</p>
    </section>
  </div>
  <EvidenceDecisionRail :step="4" phase="Improve" />
</div>

<!--
Timebox: 2 minutes

Talk track: What change do we expect, and what must remain protected? The hypothesis starts with a bounded condition: approved AI assistance supports only the declared task inside this workflow. The expected technical result is narrower effort per accepted production change, more accepted changes, or both. The expected business outcome is separate: shorter time to an accepted production change may improve a named outcome for a named group. “May” matters. We must state how value could be created and what evidence would connect the technical result to the business outcome. Acceptance quality, security, compliance, and service reliability are held conditions, not optional tradeoffs hidden in a productivity number. This is a testable expectation. It is not a universal productivity claim and it is not yet a measured result.

Transition: Make the expected result countable by choosing where to Define Done and Accepted.

Audience question: What single business outcome should this technical result plausibly support, and for whom?

Response guidance: Ask for one outcome and one affected group. If the answer is a technical measure, keep it on the technical side and ask for the business link. If the link is unknown, leave the evidence field open.

Payoff: The group can test a causal expectation without turning it into a promise.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s04-state-what-we-expect-to-improve; content/modules/01-executive-decision-briefing/slide-manifest.md row 4; content/storyboards/executive-decision-story/storyboard.md S04
-->

---
layout: default
class: mce
---

# Define Done and Accepted

<div class="mce-shell" data-slide-id="S05">
  <span class="mce-meta">Govern + Improve · Acceptance · 00:09–00:11</span>
  <div class="mce-stage">
    <div class="mce-motion-stage is-replaying" data-motion-role="acceptance">
      <section class="mce-acceptance-surface">
        <div class="mce-not-outcome">
          <div class="mce-section-label">Not an outcome</div>
          <div class="mce-milestones"><span class="mce-beat">prompt ·</span><span class="mce-beat">generation ·</span><span class="mce-beat">branch ·</span><span class="mce-beat">pull request opened ·</span><span class="mce-beat">merge alone ·</span><span class="mce-beat">usage ·</span><span class="mce-beat">local time saving</span></div>
        </div>
        <div class="mce-boundary-marker" aria-hidden="true">accepted boundary →</div>
        <div class="mce-acceptance-cards">
          <article class="mce-done-card mce-beat"><b>Done</b><span>the approved production change is deployed · required checks pass · the observation window closes within agreed limits · the outcome owner accepts the record</span></article>
          <article class="mce-done-card mce-done-card--accepted mce-beat"><b>Accepted</b><span>count one eligible change once, only with evidence for required human, quality, security, risk, compliance, and rollback checks</span></article>
        </div>
      </section>
    </div>
    <ExecutiveMotion slide-id="S05" />
  </div>
  <EvidenceDecisionRail :step="5" phase="Improve" />
</div>

<!--
Timebox: 2 minutes

Talk track: Where does work count? A prompt, generation, branch, opened pull request, merge alone, usage, or local time saving is not an outcome. Keep those milestones visible, but do not move the finish line toward them. Done means the approved production change is deployed, required checks pass, the observation window closes within agreed limits, and the outcome owner accepts the record. Accepted means one eligible change is counted once, and only when evidence exists for the required human, quality, security, risk, compliance, and rollback checks. The count-once rule prevents one change from being multiplied across activity measures. The boundary is fixed before measurement so a convenient local milestone cannot become success after the fact.

Transition: Use the same fixed acceptance rule when we Design a Fair Comparison.

Audience question: Which milestone is most likely to be mistaken for an accepted outcome in the current reporting?

Response guidance: Name the milestone and restate that it remains context until the full Done and Accepted rule is met. If the organization uses a different done point, ask whether it includes the required checks and outcome-owner acceptance.

Payoff: The denominator now represents completed, accepted work rather than visible activity.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s05-define-done-and-accepted; content/modules/01-executive-decision-briefing/slide-manifest.md row 5; content/storyboards/executive-decision-story/storyboard.md S05
-->

---
layout: default
class: mce
---

# Design a Fair Comparison

<div class="mce-shell" data-slide-id="S06">
  <span class="mce-meta">Improve → Prove · Comparison · 00:11–00:14</span>
  <div class="mce-stage">
    <div class="mce-motion-stage is-replaying" data-motion-role="comparison">
      <section class="mce-comparison">
        <div class="mce-comparison-lanes">
          <article class="mce-lane mce-beat"><b>What changes in the pilot</b><span>the approved assistant may draft ___; accountable humans review, change, accept, or reject the work.</span></article>
          <article class="mce-lane mce-lane--comparison mce-beat"><b>What would have happened without the pilot (comparison)</b><span>comparable eligible changes without AI assistance, using a matched group at the same time or an equal-length earlier period chosen before results are interpreted</span></article>
        </div>
        <div class="mce-match-row">
          <b>Keep the comparison fair</b><span class="mce-beat">People/work in scope ___</span><span class="mce-beat">Earlier period ___</span><span class="mce-beat">Pilot period ___</span><span class="mce-beat">Same done and accepted rules ___</span><span class="mce-beat">Task/size mix ___</span>
        </div>
        <div class="mce-explanation-row"><b>What else could explain the result:</b> staffing · change mix/complexity · seasonality · release freezes · incidents · other tool or process changes</div>
        <div class="mce-credit-row"><b>What we can reasonably credit to the pilot:</b> only the supported difference after other explanations and data-quality limits are recorded</div>
        <p class="mce-warning">Without a trustworthy comparison, the result is a clue only and cannot support scale.</p>
      </section>
    </div>
    <ExecutiveMotion slide-id="S06" />
  </div>
  <EvidenceDecisionRail :step="6" phase="Improve" />
</div>

<!--
Timebox: 3 minutes

Talk track: What changes in the pilot, and what stays comparable? The single pilot difference is that the approved assistant may draft the named material. Accountable humans still review, change, accept, or reject the work. The comparison is eligible work without AI assistance, using either a matched group at the same time or an equal-length earlier period selected before interpreting results. Match the people and work in scope, earlier and pilot periods, the Done and Accepted rules, and the task and size mix. Then record other explanations: staffing, change complexity, seasonality, release freezes, incidents, or another tool or process change. The credit limit is only the supported difference after those explanations and data-quality limits are recorded. Without a trustworthy comparison, an observed result is a clue. It cannot support scale.

Transition: A fair comparison still needs accountable operation, so next Name Owners, Controls, and Exceptions.

Audience question: Which other explanation is most likely to distort this comparison?

Response guidance: Capture the explanation and ask how it will be observed or controlled. If the comparison period was chosen after seeing results, state that limitation. Do not claim the pilot caused the entire difference.

Payoff: The result can be interpreted with a declared comparison and a visible credit limit.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s06-design-a-fair-comparison; content/modules/01-executive-decision-briefing/slide-manifest.md row 6; content/storyboards/executive-decision-story/storyboard.md S06
-->

---
layout: default
class: mce
---

# Name Owners, Controls, and Exceptions

<div class="mce-shell mce-shell--chief" data-slide-id="S07">
  <span class="mce-meta">Govern · Human authority · 00:14–00:17</span>
  <div class="mce-stage mce-stage--controls">
    <div class="mce-motion-stage is-replaying" data-motion-role="controls">
      <section class="mce-controls-surface">
        <div class="mce-owner-table" role="table" aria-label="Need and named owner">
          <div role="row"><b role="columnheader">Need</b><b role="columnheader">Named owner</b></div>
          <div class="mce-beat" role="row"><span>Fund and decide</span><span>Sponsor / investment authority</span></div>
          <div class="mce-beat" role="row"><span>Run, accept, pause, and roll back</span><span>Engineering owner</span></div>
          <div class="mce-beat" role="row"><span>Grant approved, least-needed access</span><span>Platform / architecture owner</span></div>
          <div class="mce-beat" role="row"><span>Approve rules, exceptions, pause, and restart</span><span>Policy / risk authority</span></div>
          <div class="mce-beat" role="row"><span>Check evidence, cost, and business result</span><span>Measurement / finance / business owners</span></div>
        </div>
        <div class="mce-control-record">
          <div class="mce-section-label">Control record</div>
          <p>Allowed and prohibited actions ___ · Human check ___ · Exception owner/reason/end date ___ · Audit record/how long kept ___ · Pause trigger ___ · Escalation ___</p>
          <div class="mce-rollback mce-beat"><b>Rollback:</b> disable AI assistance and use the approved production rollback path. Name who may restart.</div>
        </div>
      </section>
    </div>
    <ExecutiveMotion slide-id="S07" />
    <ChiefCharacterImage
      src="/images/chief-charter-cc03-human-owned-controls.png"
      role="human-owned controls"
    />
  </div>
  <EvidenceDecisionRail :step="7" phase="Govern" />
</div>

<!--
Timebox: 3 minutes

Talk track: Who can act, and who can stop the work? Funding and the decision belong to the sponsor or investment authority. The engineering owner runs the pilot, accepts work, pauses it, and executes the approved production rollback path. Platform or architecture grants only the approved, least-needed access. Policy or risk approves rules and exceptions and owns pause and restart authority. Measurement, finance, and business owners check the evidence, cost, and business result. The control record names allowed and prohibited actions, the human check, exception owner, reason and end date, audit record and retention, pause trigger, and escalation. If a trigger fires, disable AI assistance and use the approved production rollback path. Restart is a named human decision, not an automatic software action.

Transition: With ownership in place, Separate Technical Results from Business Outcomes.

Audience question: Who can pause the pilot, and who has authority to restart it?

Response guidance: Require names or accountable roles for both actions. If one person is proposed for every role, test whether that concentration is authorized. If restart authority is unknown, keep the pilot paused under the declared rule.

Payoff: Controls remain human-owned, auditable, and usable when an exception occurs.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s07-name-owners-controls-and-exceptions; content/modules/01-executive-decision-briefing/slide-manifest.md row 7; content/storyboards/executive-decision-story/storyboard.md S07
-->

---
layout: default
class: mce
---

# Separate Technical Results from Business Outcomes

<div class="mce-shell" data-slide-id="S08">
  <span class="mce-meta">Prove · Measure record · 00:17–00:21</span>
  <div class="mce-stage">
    <section class="mce-measures">
      <div class="mce-measure-bands">
        <article><div class="mce-section-label">Technical results</div><p>share of changes accepted · developer effort/human checks · time from request to accepted change · rework · failed checks · defects found after release · security findings · rollbacks · incidents · policy exceptions</p></article>
        <article><div class="mce-section-label">Business outcomes</div><p>one selected business outcome ___ · value measure ___ · evidence linking it to accepted production changes ___</p></article>
      </div>
      <div class="mce-context-strip"><b>Context only:</b> licenses · access · adoption · use · generated output</div>
      <div class="mce-section-label">For every measure, record</div>
      <div class="mce-record-grid"><span>Meaning (definition)</span><span>People/work in scope (population)</span><span>Time period</span><span>Data source</span><span>Owner</span><span>Review frequency (cadence)</span><span>Top and bottom numbers (numerator/denominator)</span><span>Exclusions</span><span>Known data-quality limit</span><span>Decision supported</span></div>
      <p class="mce-measure-rule">Use <b>not applicable + reason</b> when a numerator or denominator does not apply. Keep technical results and business outcomes separate until evidence supports the link.</p>
    </section>
  </div>
  <EvidenceDecisionRail :step="8" phase="Prove" />
</div>

<!--
Timebox: 4 minutes

Talk track: Which measure supports which decision? Keep technical results separate from business outcomes. Technical evidence can include the share of changes accepted, developer effort and human checks, time from request to accepted change, rework, failed checks, post-release defects, security findings, rollbacks, incidents, and policy exceptions. The business side names one outcome, its value measure, and evidence linking it to accepted production changes. Licenses, access, adoption, use, and generated output stay in the context strip. For every measure, record its meaning, population, period, data source, owner, review cadence, numerator and denominator, exclusions, known data-quality limit, and decision supported. If a numerator or denominator does not apply, write not applicable and the reason. Do not collapse technical movement and business value into one score before the evidence supports the link. A faster accepted change can be important while the business outcome remains unknown.

Transition: Evidence is incomplete until we Count the Full Pilot Cost.

Audience question: Which proposed measure is a business outcome, and what evidence connects it to accepted production changes?

Response guidance: Ask for the complete measure record. If a metric has no owner, period, denominator, or decision use, mark that field missing. If the answer is adoption or use, move it back to context only.

Payoff: Executives can see what changed technically, what changed for the business, and where the link remains unproven.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s08-separate-technical-results-from-business-outcomes; content/modules/01-executive-decision-briefing/slide-manifest.md row 8; content/storyboards/executive-decision-story/storyboard.md S08
-->

---
layout: default
class: mce
---

# Count the Full Pilot Cost

<div class="mce-shell" data-slide-id="S09">
  <span class="mce-meta">Prove · Economics · 00:21–00:24</span>
  <div class="mce-stage">
    <div class="mce-motion-stage is-replaying" data-motion-role="cost">
      <section class="mce-cost-surface">
        <div class="mce-section-label">Full pilot cost</div>
        <div class="mce-cost-stack"><span class="mce-beat">Licenses</span><b>+</b><span class="mce-beat">usage</span><b>+</b><span class="mce-beat">implementation<small>validation or change management only when not tracked elsewhere</small></span><b>+</b><span class="mce-beat">training</span><b>+</b><span class="mce-beat">support</span><b>+</b><span class="mce-beat">governance</span><b>+</b><span class="mce-beat">work deferred elsewhere<small>opportunity cost</small></span></div>
        <div class="mce-cost-record"><b>For every cost:</b> amount or range · fixed or variable · people/work in scope · period · source · owner · rule for dividing shared cost · fact/assumption/unknown<br>Implementation includes validation or change management only when those are not tracked elsewhere.</div>
        <div class="mce-count-once mce-beat"><b>Count each cost once.</b> Put each direct or shared cost under one rule.</div>
        <div class="mce-formula mce-beat"><b>Cost per accepted outcome</b><span>=</span><span class="mce-fraction"><i>full pilot cost</i><i>accepted outcomes</i></span></div>
        <p class="mce-caveat">Do not turn a benefit into money without an approved source and method.</p>
      </section>
    </div>
    <ExecutiveMotion slide-id="S09" />
  </div>
  <EvidenceDecisionRail :step="9" phase="Prove" />
</div>

<!--
Timebox: 3 minutes

Talk track: What does the pilot cost after every resource is counted once? Full pilot cost includes licenses, usage, implementation, training, support, governance, and work deferred elsewhere as opportunity cost. Validation or change management sits under implementation only when it is not tracked elsewhere. For every cost, record an amount or range, fixed or variable treatment, people and work in scope, period, source, owner, rule for dividing shared cost, and whether the value is fact, assumption, or unknown. Put every direct or shared cost under one rule and count it once. Only after the complete numerator is visible do we divide full pilot cost by accepted outcomes. Do not monetize a benefit without an approved source and method. A missing cost remains unknown; it does not become zero.

Transition: Economics alone is not a recommendation, so next Show Risks and What Would Change Our Mind.

Audience question: Which cost is most likely to be omitted or counted twice?

Response guidance: Ask where the cost sits, who owns it, and which allocation rule applies. If validation or change management appears twice, keep it only under the declared rule. Preserve ranges and unknowns rather than inventing precision.

Payoff: The gate sees a complete, count-once cost view tied to accepted outcomes.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s09-count-the-full-pilot-cost; content/modules/01-executive-decision-briefing/slide-manifest.md row 9; content/storyboards/executive-decision-story/storyboard.md S09
-->

---
layout: default
class: mce
---

# Show Risks and What Would Change Our Mind

<div class="mce-shell" data-slide-id="S10">
  <span class="mce-meta">Prove · Contrary case · 00:24–00:26</span>
  <div class="mce-stage">
    <section class="mce-contrary">
      <div class="mce-register">
        <div><b>Evidence for the recommendation:</b> ___</div>
        <div><b>Contrary evidence:</b> ___</div>
        <div><b>Missing evidence / data-quality limit:</b> ___</div>
        <div><b>Dissent and owner:</b> ___</div>
      </div>
      <div class="mce-risk-set"><b>Risks</b><p>acceptance failure · rework or escaped defects · security, privacy, or compliance breach · service or rollback failure · unfair selection or another explanation for the result · hidden cost · control or authority gap</p></div>
      <div class="mce-change-mind"><b>Change our recommendation if:</b><span>contrary evidence crosses ___</span><span>comparison quality falls below ___</span><span>full pilot cost exceeds ___</span><span>a named control fails ___</span><span>the business link remains unsupported by ___</span></div>
    </section>
  </div>
  <EvidenceDecisionRail :step="10" phase="Prove" />
</div>

<!--
Timebox: 2 minutes

Talk track: What evidence would make us change the recommendation? Give supportive and contrary evidence equal space. Record missing evidence and data-quality limits. Keep dissent with a named owner rather than editing it into consensus. Then scan the risks: acceptance failure, rework or escaped defects, security, privacy, or compliance breach, service or rollback failure, unfair selection or another explanation, hidden cost, and a control or authority gap. The recommendation changes when a contrary threshold is crossed, comparison quality falls below its floor, full pilot cost exceeds its ceiling, a named control fails, or the business link remains unsupported by the declared date or condition. Those fields must be specific enough to act on.

Transition: The contrary case sets up the gate where we Choose Stop, Revise, Fund, or Scale.

Audience question: What single contrary signal would change the recommendation first?

Response guidance: Ask for a measurable threshold, floor, ceiling, failed control, or deadline. If the answer is “we will monitor it,” ask who acts and what action follows. Keep unresolved dissent visible.

Payoff: The recommendation becomes falsifiable and the gate can respond to bad news.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s10-show-risks-and-what-would-change-our-mind; content/modules/01-executive-decision-briefing/slide-manifest.md row 10; content/storyboards/executive-decision-story/storyboard.md S10
-->

---
layout: default
class: mce
---

# Choose Stop, Revise, Fund, or Scale

<div class="mce-shell mce-shell--chief" data-slide-id="S11">
  <span class="mce-meta">Decide · Gate · 00:26–00:28</span>
  <div class="mce-stage mce-stage--gate">
    <div class="mce-motion-stage is-replaying" data-motion-role="gate">
      <section class="mce-gate-surface" aria-label="Gate record and staged growth path">
        <div class="mce-gate-record">
          <div class="mce-section-label">Gate record</div>
          <div class="mce-gate-choices" aria-label="Decision choices">
            <div class="mce-gate-choice mce-beat"><b>Stop</b></div><div class="mce-gate-choice mce-beat"><b>Revise</b></div><div class="mce-gate-choice mce-beat"><b>Fund</b></div><div class="mce-gate-choice mce-gate-choice--closed mce-beat"><b>Scale</b><small>Unavailable at Gate 0</small></div>
          </div>
          <p><b>Decision:</b> <strong>Stop · Revise · Fund · Scale</strong></p>
          <p>Threshold/evidence ___ · Owner ___ · Decision authority ___ · Checkpoint ___</p>
          <p>If unmet ___ · If met ___</p>
        </div>
        <div class="mce-growth">
          <div class="mce-section-label">How the decision can grow</div>
          <div class="mce-growth-path">
            <article class="mce-growth-card mce-growth-card--current mce-beat"><b>Gate 0 — Ready to test</b><span>scope + controls + comparison → fund bounded pilot</span></article><article class="mce-growth-card mce-beat"><b>Gate 1 — Evidence</b><span>accepted outcomes + fair comparison + full cost → stop, revise, or fund controlled expansion</span></article><article class="mce-growth-card mce-beat"><b>Gate 2 — Ready to scale</b><span>repeated evidence + owners and controls ready to operate + named resources and authority → scale</span></article><article class="mce-growth-card mce-beat"><b>Gate 3 — Run and review</b><span>recurring review → renew, revise, or retire</span></article>
          </div>
        </div>
        <p class="mce-gate-rule mce-beat">For this example, <b>Scale is unavailable at Gate 0</b>. No gate relies on adoption, use, access, or generated output alone.</p>
      </section>
    </div>
    <ExecutiveMotion slide-id="S11" />
    <ChiefCharacterImage
      src="/images/chief-charter-cc04-evidence-proportional-gate.png"
      role="evidence-proportional gate"
    />
  </div>
  <EvidenceDecisionRail :step="11" phase="Decide" />
</div>

<!--
Timebox: 2 minutes

Talk track: We have reached the gate, but the evidence stage limits the choice. Which choice is actually available now? At Gate 0, the record can support Stop, Revise, or Fund a bounded pilot. Scale is visible because it is a future decision, but it is unavailable today. The gate record names the threshold, evidence, owner, decision authority, and checkpoint, plus what happens if the threshold is met or missed. Growth is staged. Gate 1 requires accepted outcomes, a fair comparison, and full cost. Gate 2 requires repeated evidence and operating readiness. Gate 3 keeps renewal, revision, or retirement under recurring review. Access, adoption, use, or generated output alone never opens a gate.

Transition: With the evidence stage and available choices clear, we can Make the Executive Ask.

Audience question: Which Gate 0 choice would the current record support, and what evidence makes that choice responsible?

Response guidance: Ask for the evidence and threshold behind the choice. If the group jumps to Scale, point to the closed Gate 0 branch and restate the Gate 2 requirements. If evidence is missing, keep Revise or explicit deferral available rather than manufacturing certainty.

Payoff: The decision stays proportional to evidence, with no automatic path from activity to scale.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s11-choose-stop-revise-fund-or-scale; content/modules/01-executive-decision-briefing/slide-manifest.md row 11; content/storyboards/executive-decision-story/storyboard.md S11
-->

---
layout: default
class: mce
---

# Make the Executive Ask

<div class="mce-shell" data-slide-id="S12">
  <span class="mce-meta">Decide · 2-minute ask + 15-minute protected discussion · 00:28–00:45</span>
  <div class="mce-stage">
    <section class="mce-ask">
      <div class="mce-ask-head"><div class="mce-section-label">Executive ask</div><div><b>Sponsor:</b> ___</div><div class="mce-request"><b>Decision requested today:</b> Stop · Revise · Fund bounded pilot</div></div>
      <div class="mce-ask-grid">
        <article><b>Resources</b><span>named team capacity ___ · approved access/budget ___ · engineering/platform ___ · risk/policy ___ · measurement/finance ___ · training/support ___</span></article>
        <article><b>Timeframe</b><span>pilot start ___ · pilot end ___ · comparison periods ___ · next gate date ___</span></article>
        <article><b>Authority</b><span>fund ___ · approve boundary/exceptions ___ · execute and rollback ___ · confirm evidence ___ · decide next gate ___</span></article>
      </div>
      <div class="mce-authorization">For workflow ___, authorize ___ for people/work in scope ___ and timeframe ___, with done and accepted rule ___, funded by ___, governed by ___, measured through technical results ___ and business outcomes ___, and reviewed on ___ by ___ at gate ___.</div>
      <div class="mce-open-record"><span><b>Contrary evidence/dissent</b> ___</span><span><b>Unresolved dependency</b> ___</span></div>
      <div class="mce-discussion-banner"><b>Protected executive discussion · 15 minutes</b><span>Challenge the evidence. Record a decision—or explicitly defer with missing evidence, owner, and date.</span></div>
    </section>
  </div>
  <EvidenceDecisionRail :step="12" phase="Decide" />
</div>

<!--
Timebox: 17 minutes

Talk track: I will use two minutes to state the ask, then protect fifteen minutes for executive challenge and decision. Who is the sponsor, and what decision is requested today? Name the team capacity, approved access or budget, engineering and platform support, risk and policy support, measurement and finance support, and training or support. State the pilot and comparison periods and the next gate date. Name who may fund, approve the boundary and exceptions, execute and roll back, confirm evidence, and decide the next gate. Read the authorization statement with its workflow, population, timeframe, Done and Accepted rule, funding, governance, technical results, business outcomes, review date, authority, and gate. The available request is Stop, Revise, or Fund bounded pilot. Keep contrary evidence, dissent, and unresolved dependencies visible. I am now protecting fifteen minutes. Challenge the record. The named authority may decide, or explicitly defer with the missing evidence, owner, and date.

Transition: End the briefing here. Keep this slide visible while the decision authority records the decision or explicit deferral.

Audience question: What decision can the named authority responsibly record today, and what condition belongs in that record?

Response guidance: Protect the full fifteen-minute discussion. Invite the evidence owners to challenge comparison quality, acceptance, controls, cost, business linkage, dissent, and dependencies. Do not treat silence as consent or invent a response. If the authority cannot decide, record an explicit deferral with missing evidence, owner, and date.

Payoff: The briefing ends with an owned decision record or a bounded, accountable deferral—not an implied consensus.

Sources: content/modules/01-executive-decision-briefing/executive-decision-source.md#s12-make-the-executive-ask; content/modules/01-executive-decision-briefing/slide-manifest.md row 12; content/production/experience-plan.md exact run of show; content/storyboards/executive-decision-story/storyboard.md S12
-->
