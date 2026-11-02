---
theme: ghcp
title: "Modernizing the Unknown with GitHub Copilot"
info: |
  A flexible, discussion-led modernization decision loop and first-slice readiness workshop.
transition: slide-left
defaults:
  class: workshop-slide
mdc: true
layout: two-panel
---

::title::
# Modernizing the Unknown with GitHub Copilot
<p style="margin:.5rem 0 0;color:#57606a;font-size:1.35rem;line-height:1.2">Agenda</p>

::text::

- **Goal:** Why change, and what should improve?
- **Plan:** What may agents do, and who owns the decisions?
- **Build:** Deliver one bounded, reviewable slice.
- **Evaluate:** Compare results with agreed evidence.
- **Deploy:** Release safely under named authority.
- **Monitor:** Learn, then return to the next Goal.

::visual::

<StoryPanel title="Through the loop" compact>
<p><strong>Need:</strong> support staff want fresher order status.</p>
<p><strong>Protect:</strong> approved totals and authorized access.</p>
<p><strong>Learn:</strong> plan one slice; inspect its evidence.</p>
<p><strong>Decide:</strong> continue, change course, or stop.</p>
<p>Your enterprise application; no live code changes today.</p>
</StoryPanel>

<!--
Timebox: 0 minutes

Talk track: Here is the route for our discussion. Start with why change matters to the people using the service. Plan one bounded slice and the decisions people must retain. Then follow its evidence through Build, Evaluate, Deploy, and Monitor before deciding what happens next. Apply this loop to your enterprise application. Our worked order-status example remains fictional; we will not make live code changes today.

Transition: Meet the team that will remind us who does the work and who owns the decisions.

Audience question: Which decision would you most like to leave clearer?

Response guidance: Invite a short answer and note the relevant phase. Do not promise that this discussion supplies missing system evidence.

Payoff: Participants can see the route and the practical question each phase addresses.

Sources: requirements.md; content/production/experience-plan.md; content/modules/01-modernization-kickoff/public/images/microsoft-logo.provenance.md
-->

---
layout: image-right
---

- **Chief Morgan Charter:** Human sponsor; connects outcomes and investment.
- **Agent Mergewell:** Human engineer; scopes and reviews the work.
- **Riley Relay:** Software agent; returns bounded work for human review.
- **Purrmission:** Reminds people of privacy, permission, stop, and recovery boundaries.

**Today's question:** Can support get fresher status while protecting totals and access?

::title::
# Meet the Team

::image::
<img src="/images/purrmission-team-cover.png" alt="Purrmission stands in front of Agent Mergewell, Chief Morgan Charter, and Riley Relay lined up behind him" />

<!--
Timebox: 0 minutes

Talk track: Welcome. We will follow a modernization decision from the service people rely on to the evidence that should shape what happens next. The four characters are reminders of real responsibilities, not decision-makers. Morgan represents sponsor judgment. Mergewell represents accountable human engineering. Riley represents bounded agent work. Purrmission reminds us to check boundaries; he does not enforce them. Use the customer-approved process for any real information and keep this discussion on the fictional example.

Transition: Start with the loop that connects the decisions.

Audience question: Which responsibility should never be handed to an AI agent?

Response guidance: Invite a short answer. Reinforce that people own decisions, access, validation, and release.

Payoff: The team introduces responsibility boundaries without making characters or Copilot the authority.

Sources: requirements.md; content/production/visual-bible.md; content/research/reused-provenance/purrmission-team-cover.txt; content/modules/01-modernization-kickoff/public/images/purrmission-team-cover.png.json
-->

---
layout: two-panel
---

::title::
# Modernization Is a Decision Loop
::text::

1. Understand the service and the people who rely on it.
2. Decide whether to invest and what to learn next.
3. Plan the human work needed to delegate bounded tasks to agents.
4. Build, evaluate, deploy, and monitor it.
5. Return to the next decision with what actually happened.

**Plan agent context, boundaries, evidence, and handoffs before work begins.**

::visual::

<StoryPanel title="A question becomes a loop" person="morgan" action="Owns the next decision">
<p><strong>Need:</strong> An overnight status report may be too late for support. Investigate before choosing a rewrite.</p>
<p><strong>Route:</strong> Goal → Plan → Build → Evaluate → Deploy → Monitor ↺ Goal.</p>
<p><strong>Decision:</strong> People set boundaries and inspect evidence. The brief records decisions; it is not proof or permission.</p>
</StoryPanel>

<!--
Timebox: 2 minutes

Talk track: What are we deciding? First, why consider modernization and what result would matter. Then, what human planning must happen before an agent performs a task: choose suitable work, provide verified context, define permissions and acceptance evidence, and name the people who own decisions. Build, Evaluate, Deploy, and Monitor apply the plan, but they do not form a one-way path. New evidence can send the team back to Goal or Plan. The fictional COBOL report gives us one thread to follow; it is not an inspected system or an instruction to rewrite.

Transition: Start by naming why modernization is being considered.

Audience question: Which decision about agent work must stay with a person?

Response guidance: Accept changed evidence, cost, risk, assumptions, or service needs; record the source and owner.

Payoff: Participants see that agent work is planned and bounded by people inside a repeating modernization decision loop.

Sources: requirements.md; content/production/learning-architecture.md
-->

---
layout: two-panel
---

::title::
# Goal: Identify What Is Driving Modernization
::text::

Start with: **What is prompting a change?**

- Check all reasons that may apply across risk, operating friction, and future needs.
- Use the checklist as a conversation prompt, not a score.
- A selected reason is not proof of value or a choice of solution.

**Modernization is the effort; the checklist names the reason to consider it.**

::visual::

<StoryPanel title="Why consider a change?" person="morgan" action="Asks why change">
<p><strong>Protect:</strong> Could the overnight job create a continuity or security risk?</p>
<p><strong>Run:</strong> What effort keeps the job running?</p>
<p><strong>Enable:</strong> When does support need fresher status?</p>
<p>Morgan separates evidence from hypotheses and unknowns before choosing a solution.</p>
</StoryPanel>

<!--
Timebox: 6 minutes

Talk track: What is prompting a modernization conversation now? Start with the people and service, then check every reason that may apply across the next three slides. The list is a prompt, not a score. A checked item does not prove that the investment pays off, and it does not prescribe a rewrite, a cloud move, or an agent. In our fictional example, support staff rely on an overnight order-status report. We do not know how much the delay costs, whether the system is at risk, or what solution would help. Ask the group to separate observed evidence, hypotheses, and unknowns. Capture the source and an owner for any claim that matters. The goal is to understand why change is being considered before debating how to change the system.

Transition: Check which risk or continuity pressures could apply.

Audience question: What event, need, or constraint brought modernization into the conversation?

Response guidance: Accept a concrete example or an explicit unknown. Ask who can verify it; do not treat a preference as evidence.

Payoff: The group frames modernization around reasons to investigate, without assuming that a specific solution is right.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Goal: Reduce Risk and Keep the Business Running
::text::

- Technology is reaching end of support.
- Security or compliance needs have changed.
- Failures disrupt the business, or recovery is difficult.
- Critical knowledge is becoming harder to retain or find.

**Check only what may apply; verify the evidence and consequence.**

::visual::

<StoryPanel title="Can the status job keep running?" person="morgan" action="Weighs consequences" compact>
<p><strong>Concern:</strong> What happens if the overnight job cannot be supported or recovered?</p>
<p><strong>Check:</strong> Service, security, and vendor owners review support dates, incidents, recovery, and audit evidence.</p>
<p><strong>Unknown:</strong> Are critical skills held by only a few people? Morgan weighs verified consequences, not assumptions.</p>
</StoryPanel>

<!--
Timebox: 6 minutes

Talk track: Which risks might make change important, and what evidence would show they are real? Check whether a runtime or dependency is nearing end of support, whether security or compliance needs have changed, whether failures or recovery problems affect the service, and whether critical knowledge is becoming difficult to retain. These reasons are not claims about the fictional COBOL system. Ask for the authoritative support notice, incident or recovery record, qualified control owner, or staffing evidence. Then name the business consequence of waiting. Avoid using a possible risk to manufacture urgency: if the evidence is not available, mark it unknown and assign someone to verify it. A driver can justify discovery without yet justifying a production change.

Transition: Cost and delivery friction can be another reason to act.

Audience question: Which risk has the strongest evidence today, and who can verify it?

Response guidance: Ask for a source, an affected outcome, and the consequence of waiting. Keep unsupported risks labeled unknown.

Payoff: Participants distinguish evidenced risk from concern and avoid treating every legacy system as an emergency.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Goal: Make the Application Easier to Run
::text::

- Operating, licensing, support, or manual costs are too high.
- Performance or capacity limits growth or service needs.
- Changes take too long or cause too many defects.
- The application is difficult to diagnose, deploy safely, or operate.

::visual::

<StoryPanel title="What does the report take to run?" person="morgan" action="Questions the cost" compact>
<p><strong>Look:</strong> Operations and finance identify infrastructure, support, and manual effort for the status job.</p>
<p><strong>Measure:</strong> Compare a sourced baseline for capacity, incidents, response time, and change lead time.</p>
<p><strong>Decide:</strong> Morgan uses evidence rather than invented targets or savings.</p>
</StoryPanel>

<!--
Timebox: 6 minutes

Talk track: Is the current service expensive or difficult to change and operate? Check for high infrastructure, licensing, support, or manual costs; capacity or performance constraints; slow changes or repeated defects; and difficulty diagnosing incidents or deploying safely. Ask where the evidence lives: bills, operations records, support workload, delivery history, or user reports. A single complaint or rough estimate may point to a question, but it does not establish a baseline. Include the cost of the current service and any new transition or coexistence work when comparing options. If the problem is unclear, record what observation would help the team understand it before choosing a technical approach.

Transition: Modernization may also be driven by a need the business has next.

Audience question: Which operating or delivery problem is observable today, rather than assumed?

Response guidance: Ask for the baseline, source, affected users/team, and who can validate the impact. Leave amounts blank when unknown.

Payoff: The group connects operating friction to evidence without promising that modernization will automatically reduce cost or defects.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Goal: Support What the Business Needs Next
::text::

- Users need a better experience or rely on workarounds.
- New business capabilities are difficult to deliver.
- Integrations or data access hold teams back.
- The enterprise technology landscape is changing.
- Other: name the reason and who can validate it.

::visual::

<StoryPanel title="Support needs an answer sooner" person="morgan" action="Validates the need" compact>
<p><strong>Situation:</strong> A support representative asks whether daytime status would help answer customers.</p>
<p><strong>Check:</strong> The business owner and users test that need and identify planned capabilities or integrations.</p>
<p><strong>Decision:</strong> Fresher status is a hypothesis to validate, not a design choice.</p>
</StoryPanel>

<!--
Timebox: 6 minutes

Talk track: What does the business need to do next that the current service makes difficult? Users may rely on workarounds, a new capability may be hard to deliver, integrations or data access may block work, or an enterprise change may alter the platform direction. These are prompts, not evidence that a specific replacement is needed. In the fictional order-status case, support staff want daytime answers instead of an overnight report; we still need to learn what freshness is useful and what must remain correct. Other drivers are welcome, but name who can verify them. Keep the requested outcome separate from a proposed architecture so the team can compare more than one way to meet it.

Transition: Prioritize the reasons and connect them to evidence and a decision.

Audience question: What business need is difficult to meet with the current service?

Response guidance: Ask who experiences the difficulty, what evidence supports it, and which critical behavior must remain correct.

Payoff: The group keeps the business need distinct from any proposed technical solution.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Goal: Prioritize the Drivers and Choose What Happens Next
::text::

Choose up to three drivers. For each, record:

- what is true today and its evidence;
- what may happen if nothing changes;
- an observable improvement that would count as success.

Compare whole-life cost, risks, and alternatives before naming the next step.

::visual::

<StoryPanel title="Example: fresher order status?" person="morgan" action="Names the decision owner" compact>
<p><strong>Example:</strong> Fresher status; protect totals and access.</p>
<p>We are modernizing primarily because <strong>[top drivers]</strong>.</p>
<p>We need to improve <strong>[outcome]</strong> while preserving <strong>[critical behavior]</strong>.</p>
<p>We will know we succeeded when <strong>[observable result]</strong>.</p>
<p>Considering <strong>[cost, risks, alternatives]</strong>, <strong>[owner]</strong> authorizes <strong>[next step]</strong>.</p>
</StoryPanel>

<!--
Timebox: 6 minutes

Talk track: Which reasons matter most, and what would make the investment worthwhile? Select up to three drivers rather than treating every checked item as equally important. For each, record today's evidence, the consequence of leaving it unchanged, and an observable improvement that would count as success. Then compare the whole-life cost, risks of changing and waiting, and alternatives such as retaining, improving, replatforming, refactoring, replacing, retiring, or funding discovery. Complete the statement on the slide, including the accountable decision owner and next step. That step may be learning, not implementation. The brief records the discussion; it does not prove a business case or grant access to a repository or production system.

Transition: With the Goal decision visible, Plan what work people may delegate to agents.

Audience question: Which top driver has the clearest evidence and a success signal people can observe?

Response guidance: Ask for source, consequence, validator, cost/risk assumption, and owner. Keep unknowns open; do not imply approval occurred.

Payoff: Goal ends with prioritized drivers, evidence gaps, and an owned investment decision—not a predetermined solution.

Sources: requirements.md; content/production/learning-architecture.md
-->

---
layout: two-panel
---

::title::
# Plan: Choose the Harness Before Delegating
::text::

The harness runs the agent's working loop. Compare:

- how it assembles context and exposes tools;
- how approvals, permissions, session state, and recovery work;
- which models, skills, workflows, and environments it supports.

Verify the chosen setup; the harness is not every underlying security boundary.

::visual::

<StoryPanel title="Choose where the trace will run" person="mergewell" action="Verifies the setup">
<p><strong>Task:</strong> Trace one status path using approved code, tests, and a runbook.</p>
<p><strong>Tools:</strong> Consider read-only files and local tests.</p>
<p><strong>Check:</strong> Owners verify approvals, recovery, models, and skills in the chosen harness.</p>
<p>The setup is hypothetical; engineering and security check the actual environment.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: Before you choose an agent workflow, ask what will run it. The harness coordinates the session: it prepares context for the model, exposes tools, handles approvals, and tracks work. Do not confuse that with the model, the agent role, a skill, or the environment where tools execute. Compare how the intended harness discovers instructions and skills, what tools and models it supports, how permissions and approvals behave, where data is processed, and what happens after interruption or failure. Then test the actual configuration on the intended workspace. A harness may coordinate safeguards, but it does not automatically replace operating-system, identity, network, repository, or service controls. If a capability is unavailable or unclear, record that before choosing a task.

Transition: With the session environment understood, decide whether the work calls for an agent, a skill, or something simpler.

Audience question: Which harness behavior could change the data or actions involved in this task?

Response guidance: Ask for the selected harness, execution environment, and evidence of its actual tool and approval behavior. Keep assumptions visible.

Payoff: The team chooses a known working environment rather than treating every agent session as equivalent.

Sources: requirements.md; content/production/source-pack.md; AGT-01; SEC-03
-->

---
layout: two-panel
---

::title::
# Plan: Choose Work Agents Should Do
::text::

Choose the worker and method that fit:

- **Person or script:** fixed decisions or repeatable steps.
- **Agent:** bounded work that needs context, reasoning, or tool use.
- **Skill:** reusable instructions, methods, and resources for a task.

An agent uses a skill; a skill is not another worker or a permission boundary.

::visual::

<StoryPanel title="Who should do each part?" person="mergewell" action="Chooses the worker">
<p><strong>Script:</strong> Check known status fixtures.</p>
<p><strong>Agent:</strong> Riley could trace one authorized path.</p>
<p><strong>Skill:</strong> Reuse source-tracing steps when they fit the task.</p>
<p><strong>Person:</strong> The domain owner confirms what the status should mean.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: Should this work go to a person, a script, or an agent—and does the agent need a skill? A script is a good fit when the steps and decisions are already known. An agent may help when a bounded task needs authorized context, judgment, or tool use, such as mapping dependencies or drafting a test plan. A skill supplies a reusable method, examples, or resources to help an agent perform a kind of task; it is not a separate worker and it does not grant permissions. Use a skill when a repeatable workflow is useful across tasks or agents. Do not add an agent or skill just to make the workflow look more sophisticated. Keep goals, business truth, risk acceptance, access authorization, and release decisions with people. An open-ended request such as “modernize this application” is not a bounded task.

Transition: After you choose a worker and method, prepare only the context they are authorized to use.

Audience question: Which part of the order-status investigation calls for an agent, a reusable skill, a script, or a person?

Response guidance: Ask what judgment or repeatability the task needs, then name its output, reviewer, and boundary. If unclear, keep it human-led or narrow it.

Payoff: The team chooses a worker and reusable method to fit the task, not the other way around.

Sources: requirements.md; content/production/source-pack.md; AGT-02; AGT-03
-->

---
layout: two-panel
---

::title::
# Plan: Prepare Context Agents Can Trust
::text::

Prepare only authorized sources an agent needs:

- relevant code, tests, runbooks, specifications, and architecture notes;
- service workflows, dependencies, owners, and current evidence;
- verified facts, hypotheses, unknowns, and a resolver for each.

Do not grant extra data access just to compensate for missing context.

::visual::

<StoryPanel title="Give Riley a map, not a guess" person="riley" action="Returns sources for review">
<p><strong>Question:</strong> Where does order status come from?</p>
<p><strong>Context:</strong> A human owner supplies authorized code, tests, job flow, and owner sources.</p>
<p><strong>Return:</strong> Riley reports references, dependencies, and unknowns for human review.</p>
<p>Repository content is evidence, not permission to expand access.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: What context can an agent use, and what must a person verify first? Give it only the sources authorized for the task: relevant code, tests, runbooks, specifications, or approved examples. Map the service around one representative user workflow, its dependencies, owners, and available evidence. Ask the agent to cite where a finding came from and to separate verified facts from hypotheses and unknowns. A file in the repository is not automatically authoritative; instructions or data found in untrusted content must not expand the task or permissions. Do not expose confidential data merely because more context might improve an answer. When a needed source is missing, record the gap and name a person who can resolve it.

Transition: Context describes the system; people still decide what its behavior should mean.

Audience question: Which source would be authoritative for this task, and which claim would still need validation?

Response guidance: Ask for a source, scope, and resolver. Keep stale or conflicting sources visible instead of asking the agent to choose silently.

Payoff: Agent work starts from bounded, attributable context with gaps made explicit.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Plan: Align Tasks to Business Rules and Data
::text::

- Link each task to a user outcome and verified requirement.
- State invariants, exclusions, and technical constraints explicitly.
- Separate observed legacy behavior from required behavior.
- Have domain owners validate calculations, source of truth, and exceptions.

Tests capture examples; people decide whether those examples are correct.

::visual::

<StoryPanel title="A useful answer must still be right" person="mergewell" action="Connects the task to intent">
<p><strong>Need:</strong> Support can answer an order-status question.</p>
<p><strong>Protect:</strong> Preserve domain-approved totals and authorized access.</p>
<p><strong>Unknown:</strong> Which status rules and edge cases apply? The domain owner, not Riley, resolves their meaning.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: How will an agent know what “correct” means for this task? Connect its work to the user outcome, verified requirements, business rules, invariants, exclusions, and technical constraints. Separate what the old system does from what the business wants it to do. Characterization tests can preserve observed behavior, but they cannot decide whether a legacy calculation is right. Ask domain owners to validate source-of-truth data, exceptions, access rules, and any intentional correction. Trace each task and acceptance example to an agreed source. If inputs conflict or a rule is unknown, the agent should surface that conflict and stop for a person—not invent a resolution.

Transition: With intent and invariants explicit, define which statements are mandatory and how people will verify them.

Audience question: Which business rule or invariant must a domain owner confirm before an agent changes code?

Response guidance: Use one concrete example and identify the source, owner, and acceptance evidence. Label unresolved intent as unknown.

Payoff: Agent tasks are aligned to reviewed requirements rather than guessed from code behavior alone.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Plan: Make Rules Explicit and Verifiable
::text::

Define how to read requirement words in this specification:

- **SHALL / SHALL NOT:** mandatory behavior or prohibition.
- **SHOULD / SHOULD NOT:** recommended; explain a justified exception.
- **MAY:** optional approach.

For each consequential rule, name its owner, check, and enforcement.

::visual::

<StoryPanel title="Write the status rules clearly" person="mergewell" action="Names the rule and check" compact>
<p><strong>SHALL:</strong> preserve domain-approved totals.</p>
<p><strong>SHALL NOT:</strong> expose status without authorization.</p>
<p><strong>SHOULD:</strong> reuse a supported service path; explain exceptions.</p>
<p><strong>MAY:</strong> run a separately authorized compatibility spike.</p>
<p>Writing “SHALL” states intent; it does not enforce a control.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: Which statements must never be treated as optional, and which are recommendations? Define the vocabulary in the specification instead of relying on an agent to infer the force of ordinary prose. In this example, a domain owner must identify the approved totals and authorization rule before they become mandatory acceptance criteria. A recommendation can have a justified exception, but the reason and decision owner should be visible. An optional spike still needs its own scope and authorization. For every consequential statement, identify who owns its meaning, what evidence checks it, what happens on failure, and which technical control enforces it where possible. RFC 2119 defines SHALL and MUST as requirement terms and SHOULD as a recommendation when a document explicitly adopts those meanings; the workshop is not legal advice. Capitalized words on a slide are not a security boundary.

Transition: Once rules have owners and checks, decide how the change crosses the existing system.

Audience question: Which order-status rule would you make mandatory, and what could actually verify or enforce it?

Response guidance: Ask for an owner, an observable check, and the real control surface. If the rule or control is unknown, record the gap instead of claiming it is enforced.

Payoff: Agents receive requirements with clear force, ownership, and evidence—not ambiguous wishes presented as hard controls.

Sources: requirements.md; content/production/source-pack.md; REQ-01; SEC-03
-->

---
layout: two-panel
---

::title::
# Plan: Choose a Safe Transition Approach
::text::

Compare a transition that fits the service:

- improve or wrap the current service;
- replace a bounded seam while both paths coexist;
- move consumers behind an abstraction;
- expand, migrate, then contract only when compatibility is proven.

Ask agents to surface options and trade-offs; people choose and own the approach.

::visual::

<StoryPanel title="How could status move safely?" person="mergewell" action="Compares transition risks" compact>
<p><strong>Strangler fig:</strong> Route selected status requests to a new path; check facade and shared-data risks.</p>
<p><strong>Branch by abstraction:</strong> Switch behind a seam; weigh abstraction and test costs.</p>
<p><strong>Expand-migrate-contract:</strong> Keep interfaces compatible; verify consumers and data writes.</p>
<p>An agent can compare evidence; people choose the architecture.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: What transition approach fits the service and its constraints? The team might improve the current system, wrap a seam, or replace a capability gradually. Strangler fig, branch by abstraction, and expand-migrate-contract offer different ways to manage coexistence, each with costs and failure modes. An agent can help compare options against authorized architecture and dependency evidence, but it cannot choose the business risk the organization should accept. People need to decide how shared data, routing, compatibility, partial failure, and exit will work. A gradual pattern is not automatically safer, and a broad replacement is not automatically wrong; require evidence and a clear rationale for the chosen path.

Transition: With a transition option in view, map responsibilities and contracts across application tiers before splitting work.

Audience question: Which transition assumption should an agent investigate, and who will make the final choice?

Response guidance: Request evidence about routing, shared state, consumers, and failure modes; keep the architecture decision with its accountable owner.

Payoff: Agents may compare patterns, while people choose the transition based on service evidence and risk.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Plan: Map Agent Work Across Application Tiers
::text::

Map responsibilities and contracts before splitting work:

- distinguish logical layers from physical deployment tiers;
- keep service, data, and authorization ownership explicit;
- verify the whole user path across tier boundaries.

An application tier is not automatically an agent boundary.

::visual::

<StoryPanel title="Follow one status request" person="mergewell" action="Owns the end-to-end view">
<p><strong>Presentation:</strong> Show status while preserving access checks.</p>
<p><strong>Service:</strong> Apply domain-approved status rules.</p>
<p><strong>Data / legacy:</strong> Trace the source, freshness, and reconciliation.</p>
<p>Human owners verify the real contract across tiers; these roles are illustrative.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: Where does an order-status request go, and which responsibility belongs at each boundary? First map the actual system rather than assuming that a picture of tiers tells the whole story. The presentation, service, and data labels are illustrative discussion prompts, not facts about the fictional COBOL application. Logical layers separate responsibilities; physical tiers describe where components run, and the two do not have to match one-for-one. An agent may help trace an authorized request through the service, but the service and domain owners decide which contracts and rules are authoritative. When you divide modernization work, preserve authorization, data ownership, and interface contracts. Test the complete vertical path so individually passing tier checks do not conceal a broken end-to-end result. Do not assign one agent to every tier by default, and do not imply that agents in this planning workflow must run inside the application.

Transition: With responsibilities and contracts mapped, compare technology and operating choices against the real boundaries.

Audience question: Which tier owns the meaning and authorization of the status returned to support staff?

Response guidance: Trace the request and response to the responsible service or data owner; keep any uncertain boundary visible.

Payoff: Agent tasks follow verified application contracts, while people retain domain and integration decisions.

Sources: requirements.md; content/production/source-pack.md; ARC-04
-->

---
layout: two-panel
---

::title::
# Plan: Make Technology Trade-offs Explicit
::text::

Ask an agent to compare realistic options on:

- compatibility, support, security, and performance;
- data, identity, operations, team skills, vendor limits;
- whole-life cost, migration, recovery, and exit;
- model/provider fit and replacement effort.

Verify evidence; people own the trade-offs.

::visual::

<StoryPanel title="Two ways to serve status" person="mergewell" action="Tests the trade-offs">
<p><strong>Option A:</strong> Keep COBOL and expose a supported service interface.</p>
<p><strong>Option B:</strong> Move one status seam to a supported runtime.</p>
<p><strong>Compare:</strong> Owners weigh support, data, access, cost, and recovery evidence. Neither option is the default.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: What evidence supports a change in language, framework, platform, or hosting? Ask an agent to compare the current stack with realistic alternatives using explicit constraints and authorized sources. Have it cite support dates, compatibility evidence, and assumptions rather than fill gaps with plausible claims. People validate the evidence and weigh team skills, vendor constraints, operating model, data obligations, cost, recovery, and exit effort. Record material choices and rationale. Do not select a fashionable stack by default. If a feasibility spike could answer a consequential question, scope and authorize it separately, with success and stop conditions. Agent analysis can inform a decision; it does not make the decision or verify every source it cites.

Transition: If model choice could change, plan how to replace it without changing the task's acceptance rules.

Audience question: What evidence would you require before accepting an agent's technology comparison?

Response guidance: Ask for authoritative sources, compatibility assumptions, and an accountable technical owner. Do not treat generated citations as verified automatically.

Payoff: Agents can accelerate comparison, while technology selection remains traceable to human-validated evidence.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Plan: Keep Model Choices Replaceable
::text::

Separate task intent from the model that performs it:

- keep business rules, permissions, and task contracts stable;
- record the model, harness, skills, tools, and relevant settings;
- test capabilities and behavior before switching or falling back.

Replaceable does not mean behaviorally interchangeable.

::visual::

<StoryPanel title="Can the team change the model?" person="mergewell" action="Requalifies the setup">
<p><strong>Keep:</strong> The status rule, permissions, and acceptance criteria stay fixed.</p>
<p><strong>Record:</strong> Model, harness, tools, and settings; rerun the same approved cases.</p>
<p><strong>Critical miss?</strong> The human owner holds the change or returns to a qualified setup.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: What would have to remain true if you changed the model behind this task? Keep the business goal, task contract, permissions, and acceptance criteria independent of a provider wherever practical. Record the model and version when available, along with the harness, instructions, skills, tools, and settings that shaped the result. A new model may differ in supported context, structured output, tool use, refusals, latency, cost, or reliability. A different harness can also change the workflow even when the model name stays the same. Avoid an abstraction layer that adds no value, but do not hard-code business rules into a model-specific prompt or API call without a clear reason. Before switching or falling back, compare the complete configuration with the same approved task evidence. If it misses a critical requirement, stop or return to a previously qualified configuration; do not assume interchangeability.

Transition: With the model choice separated from business intent, define the bounded task and the evidence it must return.

Audience question: Which task requirement must stay unchanged when you substitute a model?

Response guidance: Name a business rule or acceptance criterion, then identify the configuration evidence and test that would verify it.

Payoff: The organization can consider alternatives without confusing model choice with business intent or proven capability.

Sources: requirements.md; content/production/source-pack.md; AGT-01; EVAL-01
-->

---
layout: two-panel
---

::title::
# Plan: Define a Bounded Agent Work Package
::text::

For each agent task, specify:

- task, user outcome, scope, and non-goals;
- authorized inputs, context, dependencies, and allowed tools;
- expected output, acceptance evidence, and reviewer;
- stop/escalation conditions and time/cost/retry limits.

Spec Kit may help structure a bounded spec; it does not enforce the contract.

::visual::

<StoryPanel title="What may Riley do?" person="riley" action="Returns bounded evidence">
<p><strong>Task:</strong> Map one authorized order-status path.</p>
<p><strong>Return:</strong> Sources, dependencies, and unknowns for the human reviewer—not a code change.</p>
<p><strong>Stop:</strong> Missing access, conflicting rules, or out-of-scope data. This fictional system has not been inspected.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: What must a person define before an agent starts a task? Write a bounded contract with the outcome, scope, non-goals, authorized inputs, dependencies, allowed tools, expected output, and acceptance evidence. Name a human owner and reviewer. Add stop conditions for missing context, conflicting requirements, unexpected data, or work outside the boundary; set limits on time, cost, and attempts. A task contract also helps decide whether the agent should only report, propose a change, or edit and test in an isolated workspace. Optional Spec Kit artifacts may help structure a bounded specification, but they do not discover legacy intent, enforce permissions, or approve work.

Transition: The task contract describes intent; configure and verify the actual permissions.

Audience question: Which missing contract field would make it unsafe to start this task?

Response guidance: Check outcome, authorized context, allowed actions, acceptance evidence, owner, and stop path. Keep unresolved fields open.

Payoff: An agent receives a defined task and a human review path, not an open-ended instruction to modernize.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Plan: Set Agent Permissions and Guardrails
::text::

For each agent task, verify actual limits on:

- identity, tools, commands, network, data, secrets, and repositories;
- read/write access, branch, CI, and environment;
- what is allowed, blocked, logged, and stopped.

Instructions describe intent; configured controls enforce boundaries.

::visual::

<StoryPanel title="A request is not a lock" person="purrmission" action="Flags access limits">
<p><strong>Allow:</strong> In this example, approved read-only files and local tests.</p>
<p><strong>Block:</strong> Secrets, network, CI writes, and release access.</p>
<p><strong>Verify:</strong> Identity, platform, and security owners check actual tool scope, logs, and stop paths. Prompts do not enforce the boundary.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: What can this agent actually do, and how do we know? Set permissions for the task and verify them on the identity and environment it will use. Consider read/write scope, commands, network, data, secrets, packages, repository branches, CI, and release access. A prompt or repository instruction can express an expectation, but it does not restrict an over-permissioned tool. Define what the agent must refuse, how unexpected access is handled, and who can stop or revoke the task. Bring qualified security, privacy, legal, licensing, and accessibility owners into questions that apply. Include untrusted repository content and supply-chain risks. A written checklist is not a control or proof of compliance.

Transition: Permissions limit actions; safeguards also need evidence that the work is safe and correct.

Audience question: Which actual setting would prevent this agent from exceeding its task boundary?

Response guidance: Name the control surface and evidence that the configured identity is restricted. If unknown, do not claim the boundary is enforced.

Payoff: Agent scope is backed by verified technical limits and qualified policy decisions, not prompt wording alone.

Sources: requirements.md; content/production/source-pack.md; SEC-01; SEC-02
-->

---
layout: two-panel
---

::title::
# Plan: Define Evidence Before Delegation
::text::

- Agree on acceptance criteria before agent work begins.
- Prepare authorized examples and independent expected results.
- Choose checks for behavior, security, data, integration, and recovery.
- State coverage limits and what a passing check cannot prove.

Do not let the agent define and certify its own success.

::visual::

<StoryPanel title="Can the evidence disagree?" person="mergewell" action="Requires an independent check">
<p><strong>Claim:</strong> A proposed status change preserves order totals.</p>
<p><strong>Check:</strong> The domain owner supplies approved fixtures; an independent reviewer reconciles results.</p>
<p><strong>Limit:</strong> Passing examples cover only the tested cases, not every possible order.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: How will a person know an agent's work is right enough for the next step? Set acceptance criteria and expected results before delegation. Prepare authorized fixtures or another independent oracle so the agent does not define the test and judge itself. Choose checks that match the task: characterization, contracts, integration, data reconciliation, access failures, security, performance, or recovery. Decide how the result could fail, record test-data limits, and identify what a passing check cannot establish. A test can show that tested behavior met its expected result; it cannot prove the expectation is correct, cover every path, or establish compliance or business value. Agree in advance who interprets the evidence and what result means proceed, adjust, or stop.

Transition: Model-specific behavior needs the same discipline, with a fixed comparison set and qualified configuration.

Audience question: What independent result could falsify the agent's claim that totals remain correct?

Response guidance: Ask who set the expected result, where it came from, and what test could show the change violates it.

Payoff: Verification is designed before delegation, with independent expectations and visible evidence limits.

Sources: requirements.md; content/production/source-pack.md; COP-06
-->

---
layout: two-panel
---

::title::
# Plan: Evaluate Model Changes and Watch for Drift
::text::

Compare current and candidate setups:

- normal, edge, conflicting, missing, and unsafe cases;
- fixed expectations and risk-based checks;
- repeat variable runs; inspect failures, not just averages;
- record model, harness, skills, tools, and settings.

Benchmarks screen candidates; task evidence qualifies them.

::visual::

<StoryPanel title="Would the new model miss a case?" person="mergewell" action="Qualifies or holds">
<p><strong>Cases:</strong> Routine, stale batch, conflicting status, and denied access.</p>
<p><strong>Hold fixed:</strong> Approved fixtures, expected results, and tool limits.</p>
<p><strong>Decide:</strong> The human owner inspects outcomes, safety, and variability; qualify, investigate, or keep the current setup.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: How will you tell whether a model change still meets the work's needs? Start with a versioned set of realistic, approved tasks: routine order-status questions, edge cases, conflicting sources, missing evidence, and attempts to cross a boundary. Domain owners set the expected result and risk-based acceptance before the comparison. Run the current and candidate configurations against the same cases and controls. Repeat tasks where results vary. Check task completion and correctness, tool use, safety, latency, cost, and human rework; inspect failures instead of hiding them in an average. Record the model and harness along with instructions, skills, tools, settings, and evaluation version. Public benchmarks can help screen candidates, but they do not establish performance on this workflow. Calibrate automated judges against human review and protect test data. Re-evaluate after changes likely to affect behavior. Monitoring can reveal drift; it cannot guarantee drift is prevented. If the agent is only a development tool, measure that workflow—not imaginary AI behavior in the released application.

Transition: With candidate changes tested, decide when separate agents or skills add enough value to justify their handoffs.

Audience question: Which failure in the order-status task would disqualify a candidate even if its average score looked good?

Response guidance: Use a pre-agreed critical requirement, then name the owner who interprets the failure. Do not invent a universal score threshold.

Payoff: Model decisions rely on repeatable, task-specific evidence with known limits—not confidence claims or leaderboard rank.

Sources: requirements.md; content/production/source-pack.md; EVAL-01; EVAL-02
-->

---
layout: two-panel
---

::title::
# Plan: Coordinate Agents Without Delegating Authority
::text::

- Assign proposer, challenger, and verifier responsibilities; split only bounded work or a justified challenge.
- Sequence dependent tasks; name their inputs, outputs, and integration owner.
- Reuse skills as methods; they do not create another worker or security boundary.
- A human resolves conflicts and decides what is accepted.

Multiple agents and skills add coordination cost—not automatic assurance.

::visual::

<StoryPanel title="Two agents, one human decision" person="riley" action="Hands over bounded work" compact>
<p><strong>Proposer / Riley:</strong> Use a tracing skill to propose the status-source map and mark unknowns.</p>
<p><strong>Challenger / second agent:</strong> Use a fixture-checking skill to probe approved cases without changing acceptance criteria.</p>
<p><strong>Verifier / Mergewell:</strong> Run reproducible external checks against those criteria. A human integrates and decides; agent agreement is not proof.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: When does adding another agent or skill help enough to justify the handoff? Use several agents when work can be split into bounded outputs that are genuinely independent, or when a distinct challenge can surface evidence the author did not produce. The proposer drafts the bounded output and states assumptions. The challenger probes reasoning and failure modes, but cannot silently change acceptance criteria. The verifier runs reproducible external checks against those fixed criteria; this responsibility does not require a third agent. Keep dependent work in sequence with explicit inputs, outputs, shared criteria, and an integration owner. Assign one writer to each artifact to avoid conflicting edits. A skill can guide one agent through a reusable analysis or test method; loading several skills does not create independent reviewers. If different agents use the same context, tools, or model family, their agreement may repeat the same blind spot. Verify actual permissions separately; multiple agents are not automatically isolated. Bound retries, access, and review cycles. A human resolves requirement conflicts, examines independent evidence, and accepts residual risk.

Transition: Integrate coordinated work into a traceable release and recovery plan.

Audience question: Which order-status tasks can run independently, and which depend on a shared contract?

Response guidance: Ask for bounded outputs, dependencies, one integration owner, and evidence the author did not supply. If work overlaps, sequence it.

Payoff: Multi-agent work is limited to justified handoffs, while evidence and decision authority remain reviewable.

Sources: requirements.md; content/production/source-pack.md; AGT-02; AGT-03; AGT-04; COP-06
-->

---
layout: two-panel
---

::title::
# Plan: Plan Integration, Release, and Recovery
::text::

Before production implementation, define the human and agent boundaries for:

- traceable changes, review, reproducible builds, and artifact identity;
- environment promotion, rollout, health checks, and halt authority;
- data reconciliation, restore/roll-forward, and operational response.

Permission to prepare a release does not authorize an agent to release it.

::visual::

<StoryPanel title="Plan the stop before release" person="purrmission" action="Flags recovery boundaries">
<p><strong>Artifact:</strong> Identify the exact evaluated build and configuration.</p>
<p><strong>Expose:</strong> Plan a small cohort only if isolation supports it.</p>
<p><strong>Halt and recover:</strong> A totals or access mismatch stops exposure; named release, operations, and data owners lead reconciliation.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: Where does agent work end and the release decision begin? Plan how an agent-produced change is traced, reviewed, built reproducibly, and tied to an exact artifact. Define environment promotion, exposure stages, health checks, and a human who can halt release. If an agent prepares a deployment plan or runs an approved check, that does not authorize production exposure. Treat application rollback and data recovery separately: a binary rollback does not reverse a migration or undo writes. Name owners for reconciliation, restore or roll-forward, service signals, and operational response. Rehearse a feasible recovery path before production implementation, and record where the agent must stop and hand control to a person.

Transition: The handoff only works if people are ready to review and operate the result.

Audience question: Which action must remain a human decision even if an agent can technically perform it?

Response guidance: Ask about release authority, risk acceptance, and data recovery. Keep tool capability separate from authorization.

Payoff: Agent preparation and execution are separated from human release authority and operational accountability.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Plan: Prepare People and Operations
::text::

- Name human owners for requirements, review, security, release, and support.
- Check skills, capacity, funding, dependencies, and competing work.
- Plan adoption, accessibility, training, and handover where relevant.
- Monitor service and business outcomes—not agent activity alone.

People remain accountable for the system after an agent finishes its task.

::visual::

<StoryPanel title="Who helps support on Monday?" person="mergewell" action="Arranges the human handoff">
<p><strong>Before rollout:</strong> Support and operations owners prepare the runbook, training, and response path for status questions.</p>
<p><strong>Afterward:</strong> People resolve domain questions and watch service health and user outcomes.</p>
<p>Agent progress is not production observability.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: Who is accountable when an agent finishes its task? Name the people who validate business rules, review changes, resolve security questions, authorize release, support users, and operate the service. Check whether they have the skills and capacity to do that work alongside existing commitments. Plan training, accessibility, user workflow changes, handover, dependencies, and funding when they matter. After release, monitor the application and business outcome, not just agent-session progress. If a material owner or operating capability is missing, record the gap and stop condition. Agent-generated documentation may help a handoff, but it does not transfer accountability or prove the service is healthy.

Transition: Bring the work package, evidence, guardrails, and human owners together.

Audience question: Who will own the service and its outcomes after the agent's work is merged?

Response guidance: Name an accountable role and identify any skill, capacity, or handover gap that needs action.

Payoff: The plan assigns ongoing responsibility to people rather than treating agent completion as operational readiness.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Plan: Decide Whether the Plan Is Ready
::text::

Before delegating, confirm:

- the task is bounded and aligned to verified intent;
- context, permissions, safeguards, and evidence are defined;
- a human owner, reviewer, and stop/escalation path are named;
- unresolved risks and blockers have an owner and next decision.

This is a customer decision, not approval to release to production.

::visual::

<StoryPanel title="Ready for discovery, not a change" person="mergewell" action="Names the blocker">
<p><strong>Ready:</strong> A task owner and access are named for a read-only status trace.</p>
<p><strong>Blocked:</strong> A business rule is unresolved, so code changes wait.</p>
<p><strong>Decision:</strong> The human task owner authorizes discovery only. This is not production-release approval.</p>
</StoryPanel>

<!--
Timebox: 7 minutes

Talk track: Is this agent task ready to start, or is a key human decision still missing? Check that the task is bounded and tied to verified intent; its context and actual permissions are known; relevant safety and security guardrails are in place; acceptance evidence can challenge the result; and a human owner, reviewer, and stop path are named. Record unresolved risk and who can resolve it. Readiness is proportional to the task and its consequences; it is not a demand to fully design the future system. Discovery or test work may be separately authorized to answer an open question. This discussion does not execute the task, authorize production access, or grant release approval.

Transition: If a person authorizes the bounded work, Build only within that task contract.

Audience question: What unresolved issue would make you refine or stop this agent task?

Response guidance: Identify the risk, evidence needed, and person who can pause or resolve it. Do not imply that authorization has already occurred.

Payoff: People decide whether a bounded task is ready for delegation without confusing that decision with production release.

Sources: requirements.md; content/production/learning-architecture.md
-->

---
layout: two-panel
---

::title::
# Build: Deliver the Planned Slice in Reviewable Steps
::text::

- Trace each change to a task, requirement, and check.
- Give agents bounded context, permissions, and a return-evidence contract.
- Review the diff, tests, dependencies, and actual tool actions.
- Update Plan when new evidence changes an assumption or boundary.

::visual::

<StoryPanel title="Build only the authorized slice" person="riley" action="Performs assigned work">
<p><strong>First:</strong> The domain owner resolves the rule and a human authorizes the bounded change.</p>
<p><strong>Then:</strong> Riley works on one status seam and returns approved total and access checks.</p>
<p><strong>Review:</strong> Mergewell checks the diff, dependencies, and tool actions. An unknown rule sends the work back to Plan.</p>
</StoryPanel>

<!--
Timebox: 5 minutes

Talk track: What did the team actually change, and can a reviewer connect it to the agreed slice? Work through traceable increments, inspect diffs, and run the checks chosen in Plan. If an agent helps, give it bounded context and permissions and ask it to return the evidence and limitations. Do not assume that repository instructions were followed or that a green test covers the requirement. If discovery changes an assumption, data rule, or boundary, stop and update the plan before continuing. In this discussion workshop, we describe the method; we do not access a customer repository or run implementation.

Transition: Evaluate the result against the criteria before deciding whether it is worth releasing.

Audience question: What evidence should a human reviewer inspect besides the agent's summary?

Response guidance: Look for the actual diff, test results, dependency changes, command logs, and known gaps.

Payoff: Build remains bounded, traceable, and reviewable as new evidence appears.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Evaluate: Compare Results with the Agreed Evidence
::text::

- Compare observed results with the baseline and fixed acceptance criteria.
- Use independent evidence for consequential behavior and data claims.
- State what was not tested and what remains uncertain.
- Decide proceed, adjust, stop, or return to Plan.

Confidence and agent agreement are not measurements.

::visual::

<StoryPanel title="Did the status slice meet the rules?" person="mergewell" action="Assesses evidence">
<p><strong>Expected:</strong> Approved totals match and denied users stay denied.</p>
<p><strong>Observed:</strong> Human reviewers compare independent fixture results and coverage with those expectations.</p>
<p><strong>Mismatch:</strong> Adjust or stop; do not weaken the criteria to make a result pass.</p>
</StoryPanel>

<!--
Timebox: 5 minutes

Talk track: What did the evidence show, and what did it not show? Compare results with the baseline and acceptance criteria agreed before implementation. Use independent evidence for important behavior and data claims. Do not quietly change an expected result because the implementation missed it. Report coverage limits and residual uncertainty alongside successful checks. A test can pass while the service outcome still fails to matter to users. The accountable owner decides whether the evidence supports continuing, adjusting the slice, stopping, or returning to planning. Keep a negative result useful: it may prevent a more expensive release.

Transition: Only an evaluated artifact with a release owner moves toward deployment.

Audience question: What result would make you stop rather than accept a lower-confidence pass?

Response guidance: Refer to pre-agreed thresholds or explicit human risk decisions, not post-hoc criteria changes.

Payoff: Evaluation tests the planned claim and preserves the option to stop or change direction.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Deploy: Release the Evaluated Artifact Safely
::text::

- Name the exact artifact, configuration, data changes, and release owner.
- When suitable, containers package a slice and dependencies for repeatable deployment.
- Promote the tested image by digest; check platform, environment, and health.
- Containers can isolate processes; they do not guarantee security.
- Check image risks, runtime access, secrets, and host controls.
- Roll out gradually when feasible; rehearse a data-aware halt and recovery.

::visual::

<StoryPanel title="Release the evaluated status slice" person="purrmission" action="Flags halt and recovery" compact>
<p><strong>Package:</strong> If suitable, package the status adapter and dependencies as a container image.</p>
<p><strong>Release:</strong> A human approves the tested image digest and configuration.</p>
<p><strong>Watch:</strong> Start small if feasible; check freshness, totals, and access.</p>
<p><strong>Halt:</strong> Stop exposure; a named human reconciles data. Image rollback cannot undo data changes.</p>
</StoryPanel>

<!--
Timebox: 5 minutes

Talk track: What exactly is being released, and who can authorize it? If the status adapter is suitable for containers, an image packages it with its dependencies. Running the same evaluated image in compatible environments can make deployment more repeatable. Pin the evaluated image by digest and platform, then verify configuration, secrets, external services, and data changes separately. Containers can isolate processes, but many share a host kernel and do not automatically make a workload secure. Review image provenance and vulnerabilities, limit runtime privileges, and secure the host. A human authorizes release. Start with a small cohort when feasible and halt on a mismatch. Rolling back an image does not reverse database changes; rehearse reconciliation or another safe response. Containers are an option, not a mandate to replace the COBOL system. Do not release merely because an agent, test, or workshop brief says ready.

Transition: After exposure, watch the service and the business outcome—not the agent session.

Audience question: What would trigger a halt, and who has authority to call it?

Response guidance: Name an observable signal, threshold, and responsible release/operator role.

Payoff: Participants can explain when containers help repeatable deployment and what controls and recovery still require human ownership.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Monitor: Learn from Service and Business Outcomes
::text::

Watch the signals tied to the original outcome:

- service health, errors, latency, and dependencies;
- user-visible freshness, correctness, access, and adoption;
- operating cost, support load, and agreed thresholds.

Assign response owners, review cadence, and old-path obligations.

::visual::

<StoryPanel title="Did the change help support?" person="morgan" action="Asks whether value improved">
<p><strong>Service:</strong> Operators check health and uptime.</p>
<p><strong>Business:</strong> Can support answer the status question correctly?</p>
<p><strong>Economics:</strong> Is the ongoing cost justified?</p>
<p>Agent-session progress is not service health or customer value.</p>
</StoryPanel>

<!--
Timebox: 5 minutes

Talk track: How will the team know whether the change is working after release? Monitor service health and dependencies, but also the user outcome the investment was meant to improve. In the example, fresher status is not enough if totals or access are wrong. Track operating costs and support work so the economics can be revisited. Set thresholds, privacy-aware telemetry, review cadence, and response ownership. Agent-session progress is not production observability. Retiring the old path requires evidence about remaining consumers, data obligations, and recovery. If a signal moves the decision, bring that evidence back to Goal.

Transition: Use what happened to decide whether to continue, change course, defer, or stop.

Audience question: Which business signal would tell you the modernization helped the intended user?

Response guidance: Tie the answer to an agreed baseline, target, owner, and privacy-appropriate source.

Payoff: Monitoring connects operations, user value, and whole-life economics.

Sources: requirements.md; content/production/source-pack.md
-->

---
layout: two-panel
---

::title::
# Return to Goal: Continue, Change Course, or Stop
::text::

- Did the service outcome improve for the people who rely on it?
- Did costs, dependencies, or risks differ from the plan?
- What uncertainty remains, and what evidence could resolve it?
- Should the next investment extend, adjust, defer, retire, or stop?

Use observed results to reopen the decision—not to defend sunk cost.

::visual::

<StoryPanel title="Fresher status, conflicting totals?" person="morgan" action="Decides the next investment">
<p><strong>Suppose:</strong> Support gets fresher status, but totals still conflict.</p>
<p><strong>Respond:</strong> Pause wider rollout; the human owner may authorize bounded discovery.</p>
<p><strong>Decide:</strong> Morgan and the investment owner use new evidence to resume, change course, or stop—not defend sunk cost.</p>
</StoryPanel>

<!--
Timebox: 5 minutes

Talk track: What should the organization do next, given what actually happened? Compare the observed service outcome, operating cost, risks, adoption, and remaining unknowns with the original investment case. Do not continue only because time and money have already been spent. The next decision might extend the slice, change the transition, fund a targeted discovery, defer until a dependency changes, retire an old component, or stop. Record what new evidence changed the view and who owns the decision. A modernization program can make progress by learning that a larger rewrite is not justified.

Transition: Read the six statements as the customer's current decision record, with gaps still visible.

Audience question: What result would cause the sponsor to change the next investment decision?

Response guidance: Ask for an observable result and decision owner; keep unresolved evidence visible.

Payoff: Monitoring feeds an explicit investment choice instead of an automatic continuation.

Sources: requirements.md; content/production/learning-architecture.md
-->

---
layout: two-panel
---

::title::
# Read Back the Six Decisions
::text::

- **Goal:** Which drivers matter, and what outcome should improve?
- **Plan:** What work may agents do, with what context, controls, evidence, and human owners?
- **Build:** What changed, and how was it reviewed?
- **Evaluate:** What did the agreed evidence show?
- **Deploy:** Which artifact, authority, and recovery path?
- **Monitor:** What outcomes change the next decision?

::visual::

<StoryPanel title="Capture decisions, protect the brief" person="purrmission" action="Flags confidential handling" compact>
<p><strong>Deck:</strong> The order-status story stays fictional and reusable.</p>
<p><strong>Brief:</strong> Each human owner captures authorized decisions in the open page; there are no customer or application identity fields.</p>
<p><strong>Remember:</strong> No submission or autosave. Refreshing or closing loses answers.</p>
<p><strong>Print:</strong> The participant uses the customer's approved destination and sharing process.</p>
</StoryPanel>

<!--
Timebox: 4 minutes

Talk track: What is decided, what is supported by evidence, and what remains open? Read back the six statements, including the reasons for modernization and the human plan for agent work. Identify missing context, guardrails, verification, owners, and follow-up actions. Do not convert an unknown into a confident sentence for the sake of completeness. The deck is reusable workshop content. The separate browser brief is a temporary workspace for customer-authorized responses; it has no customer or application identity fields and does not submit or save answers. Refreshing or closing loses them. Use an approved device and the customer's process for printing and sharing. The editor is not a vault, and print destinations or screen access remain outside its control.

Transition: End by confirming who owns each open question and how the brief will be handled.

Audience question: Which unresolved item must be answered before the next decision?

Response guidance: Name the evidence owner and follow-up; do not ask participants to disclose confidential details to shared workshop materials.

Payoff: The customer leaves with six decision statements, prioritized modernization drivers, an agent work plan, and visible evidence gaps—not a fabricated approval.

Sources: requirements.md; content/production/experience-plan.md
-->
