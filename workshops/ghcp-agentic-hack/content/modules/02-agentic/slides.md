---
theme: ghcp
title: "Module 2: Agentic Development Across the SDLC"
info: |
  Walk a feature across the entire SDLC: Holistic Workflow-First planning, Purrmission's Four Planning Proofs, project customization, test-driven agentic loops, the Four Security Evidence Lenses, and exact-commit release management.
layout: two-panel
transition: slide-left
mdc: true
---

::title::
# Module 2: Agentic Development Across the SDLC
::text::

## From Holistic Planning to Exact-Commit Production Release

- **Agent Mergewell (he/him):** Defines the SDLC goal, Spec/ADR, and blast radius; signs off on code review and release promotion
- **Riley Relay (she/her):** Executes bounded steps across spec drafting, test-first implementation, and PR packaging
- **Purrmission (he/him):** Guards the **Four Planning Proofs**, **Four Security Lenses**, and **Exact-Commit Release Gate**

<div class="workshop-cover-logos workshop-cover-logos--foundations" aria-label="GitHub and Microsoft">
  <img class="workshop-cover-logos__github" src="/images/GitHub_Lockup_Black_Clearspace.svg" alt="GitHub" />
  <img class="workshop-cover-logos__microsoft" src="/images/microsoft-logo.png" alt="Microsoft" />
</div>

::visual::
<img src="/images/approval-boundary-human-decision.png" alt="Agent Mergewell, Riley Relay, and Purrmission at the SDLC planning and approval boundary" />

<!--
Timebox: 1 minute

Talk track: Welcome to Module 2: Agentic Development Across the SDLC. This morning you mastered the cockpit controls of a coding agent harness. Now you have graduated from single-file starter bugs to shipping a full multi-layer feature across the Software Development Lifecycle—from requirements and architecture planning through custom tooling, test-driven implementation, security verification, CI/CD, and exact-commit production release.

Transition: Let's review our four SDLC stages for this module.

Audience question: Where in your current SDLC do AI-generated changes cause the most rework today—planning, coding, testing, or code review?

Response guidance: Acknowledge the answers and point out that most review rework actually starts as a planning or un-loaded instruction gap.

Payoff: Learners see how Module 2 connects agentic workflows across every phase of the SDLC.

Sources: content/modules/02-agentic/module.md; content/modules/02-agentic/slide-manifest.md
-->

---
layout: two-panel
---

::title::
# Session Agenda
::text::

- **1 · Holistic SDLC Planning & The 4 Planning Proofs — 18 min:** The 4:15 PM Trap, Workflow-First planning, Requirements to Spec & ADR, and Purrmission's 4 Planning Proofs
- **2 · Outfitting the Project Harness — 17 min:** Instruction maps (`applyTo`, `AGENTS.md`, `/init`), Memory, Skills (`SKILL.md`), Custom Agents (`.agent.md`), MCP, and Agent Plugins 1.0
- **3 · Test-Driven Agentic Development Loops — 15 min:** `Understand -> Plan -> Act -> Observe -> Adjust -> Verify`, TDD guardrails, `.github/hooks`, Git save points, and Cloud Agent
- **4 · Security Lenses, CI/CD & Release Management — 27 min:** The 4 Security Lenses, GitHub Actions CI, branch rulesets, `CODEOWNERS`, exact-commit promotion, and rollback
- **5 · Mission (`Case File Ω-2`) — 45 min:** Plan, customize, build, verify, and prepare a feature for release

::visual::
<img src="/images/plan-before-action-route.png" alt="Agent Mergewell and Purrmission inspecting the end-to-end SDLC route before execution" />

<!--
Timebox: 1 minute

Talk track: Here is our 77-minute teaching route before the 45-minute mission. Stage 1 covers holistic SDLC planning and what must be true before you trust agent work. Stage 2 outfits the project with instructions, skills, custom agents, MCP, and plugins. Stage 3 runs the test-driven implementation loop. Stage 4 takes our change through the four security lenses, CI/CD, deployment governance, and exact-commit release management.

Transition: Let's start at 4:15 PM on a Friday to see what happens when a team skips Stage 1.

Audience question: Which of these four SDLC stages is most informal on your team today?

Response guidance: Let learners reflect briefly and step straight into the 4:15 PM story hook.

Payoff: Learners understand the 4-stage SDLC progression and time allocation.

Sources: content/modules/02-agentic/slide-manifest.md
-->

---
layout: two-panel
---

::title::
# The 4:15 PM Green-Checkmark Trap
::text::

- **What Riley Relay returned at 4:15 PM Friday:**
  - *"✅ Refactored priority dispatch filter across 6 files · ✅ Added unit test · ✅ All green—ready to merge!"*
- **Why Purrmission (he/him) leaped onto the mouse to block the merge:**
  - **Unplanned architecture drift:** File #6 silently altered `src/billing/ledger.ts` outside the feature boundary
  - **`Saved != Loaded`:** `.github/instructions/api-security.instructions.md` sat on disk, **but its glob missed the folder**
  - **Happy-path illusion:** Riley wrote a test that only asserted her own happy-path assumption—expired tokens now crash production!

::visual::
<img src="/images/accountable-trio-cover.png" alt="Agent Mergewell, Riley Relay, and Purrmission at the workbench where Purrmission guards the green boundary line" />

<!--
Timebox: 2 minutes

Talk track: Picture 4:15 PM on Friday. Someone pastes a raw feature ticket into an agent session, waits ten minutes, and gets back a spotless Markdown summary from Riley: "Updated 6 files, added unit test, all green—ready to merge!" Mergewell reaches for the green Merge button to beat Friday traffic—and SNAP! Purrmission drops from the top shelf and plants both paws on the mouse. When Mergewell actually inspects the evidence, three silent failures appear: File #6 modified billing code out of scope; the repo's security instructions file was saved on disk but never loaded; and the new unit test only tested the happy path. Polite words and green checkmarks are not an SDLC audit.

Transition: How do we prevent the 4:15 PM trap? By starting with holistic workflow planning before anyone touches code.

Audience question: Who here has seen an AI-generated test pass 100% while testing the wrong behavior?

Response guidance: Nod—when an agent writes implementation code and tests in the same unguided breath, it often writes a test that confirms its own bug.

Payoff: Learners recognize the three failure modes of unverified agentic work: scope drift, un-loaded rules, and self-confirming tests.

Sources: workshops/purrmission-to-proceed/requirements.md; https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: two-panel
---

::title::
# Holistic SDLC Planning: Workflow First, Not Tool First
::text::

- **Planning Is More Than "Which Lines to Edit":** Plan the **entire SDLC workflow** from requirement to production release before selecting an agent or tool
- **The Whole Route (`Workflow First`):**
  1. **Goal & Owner:** Testable engineering outcome and accountable human owner
  2. **Task Split:** Which steps belong to **deterministic scripts/compilers**, which benefit from **AI assistance**, and which require **human judgment**
  3. **Workflow & Permission Boundaries:** Allowed files, read-only vs. write tools, and environment isolation
  4. **Completion & Stop Signals:** Exact verification proof required for "done" and triggers that force a pause

::visual::
<img src="/images/human-directed-operating-split.png" alt="Agent Mergewell mapping human, deterministic, and agentic workflow responsibilities" />

<!--
Timebox: 3 minutes

Talk track: When most developers hear "Plan mode," they think only about planning which three functions to edit. At the Bureau, holistic SDLC planning means Workflow First, Not Tool First. Before waking Riley up, Mergewell maps the whole route: What is the business and engineering goal? Which steps should be handled by deterministic scripts and compilers rather than an LLM? What are the workflow boundaries and stop conditions? And who is the human owner signing off at the completion boundary?

Transition: Once the workflow route is clear, our first concrete SDLC artifact is turning the requirement into a Spec and ADR.

Audience question: Why should you decide which steps belong to deterministic scripts before delegating a workflow to an AI agent?

Response guidance: Deterministic tools (linters, compilers, migrations, formatters) are 100% repeatable and cost zero AI credits.

Payoff: Learners frame planning as an end-to-end SDLC design step rather than just a code-editing preview.

Sources: workshops/workflow-first-ai-decisions/workshop.md; https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: two-panel
---

::title::
# Requirements to Spec & ADR: Grounding the Architecture
::text::

- **SDLC Phase 1 & 2 (Requirements & Design):** Never feed raw, ambiguous stakeholder chat directly into an implementation agent
- **Step 1 — Draft the Specification (`Ask` / `Plan`):**
  - Use Copilot in read-only **Ask** or **Plan** mode to surface missing edge cases, input validation rules, API contracts, and non-functional constraints
- **Step 2 — Record the Architecture Decision Record (`ADR`):**
  - Capture the chosen pattern, rejected alternatives, affected modules, and data-model impact in a versioned Markdown artifact
- **Why it pays off:** A reviewed 30-line Spec/ADR anchors every downstream coding, testing, and code-review session

::visual::
<img src="/images/mergewell-riley-verification.png" alt="Agent Mergewell and Riley Relay inspecting the architectural blueprint and specification blocks before building" />

<!--
Timebox: 3 minutes

Talk track: Look at SDLC Phases 1 and 2: Requirements and Architecture. If you hand a vague two-sentence ticket to an agent, the model will fill in every missing requirement by sampling plausible guesses. Instead, use Ask and Plan modes with Riley to interrogate the requirement first: What happens on empty input? Which existing interface should we reuse? Commit a concise Specification or Architecture Decision Record (ADR) into the repo. Now your human team and every subsequent agent session share one source of truth.

Transition: With the Spec and ADR drafted, Purrmission steps in front of the drawbridge and demands four planning proofs before coding starts.

Audience question: What happens to your token bill when you catch a bad architectural choice in a 20-line ADR versus catching it after an agent edits 15 files?

Response guidance: You save tens of thousands of wasted implementation and retry tokens—plus hours of human code review.

Payoff: Learners use Ask and Plan modes to produce a verified Spec and ADR before implementation begins.

Sources: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: two-panel
---

::title::
# What Must Be True Before You Trust Agent Work: The 4 Planning Proofs
::text::

- **Purrmission's Pre-Flight Gate:** An agent plan is not ready to execute until four verifiable proofs exist:
  1. **Scope Proof:** Explicit allowed files + a strict **no-touch list** (auth, billing, CI workflows, lockfiles)
  2. **Instruction Proof (`Saved != Loaded`):** Proof that applicable security and architecture rules actually loaded into context
  3. **Behavioral Proof (Negative Tests First):** Named negative/edge-case tests that fail on bad input and pass after the fix
  4. **Stop Conditions:** Explicit triggers where the agent must **pause and ask** instead of improvising

::visual::
<FourPlanningProofsGate />

<!--
Timebox: 3 minutes

Talk track: Press "Run Pre-Flight Check" on Purrmission's Pre-Flight Drawbridge on the right. Before Riley is allowed to cross from Planning into Implementation, Purrmission checks four brass latches. Latch 1: Scope Proof—what is in bounds and what is strictly no-touch? Latch 2: Instruction Proof—did the rules on disk actually load into this session? Latch 3: Behavioral Proof—do we have negative boundary tests ready so the agent can't pass with a happy-path illusion? Latch 4: Hard Stop Conditions—when must Riley stop and ask Mergewell? Only when all four latches click green does Purrmission lift his paw.

Transition: Let's unpack Proofs 1 and 2 in detail so you know the exact commands to verify them.

Audience question: Which of these four latches would have caught the 4:15 PM Friday disaster earliest?

Response guidance: All four! Latch 1 blocks the billing file edit, Latch 2 catches the un-loaded security rule, and Latch 3 catches the missing expired-token test.

Payoff: Learners can name and audit all four pillars of Purrmission's Planning Proofs.

Sources: workshops/purrmission-to-proceed/requirements.md
-->

---
layout: two-panel
---

::title::
# Planning Proof 1 & 2: Scope Boundaries and "Saved != Loaded"
::text::

- **Proof 1 · Blast-Radius & No-Touch Verification:**
  - Compare the review base with `HEAD`: inspect `git diff <base>...HEAD`, staged (`git diff --cached`), unstaged (`git diff`), and every untracked path (`git status --short --untracked-files=all`)
- **Proof 2 · Four Checks for `Saved != Loaded`:**
  - Having `.github/instructions/*.instructions.md` on disk does **not** prove it entered the request (`applyTo` globs can miss; compaction can drop detail)
  - **Verify:** `1 Saved` $\rightarrow$ `2 Discovered/Enabled` $\rightarrow$ `3 Included` (CLI `/instructions` & `/context`, VS Code Chat **References**) $\rightarrow$ `4 Followed`

::visual::
<img src="/images/purrmission-task-boundary.png" alt="Purrmission standing beside a wooden project boundary frame keeping allowed blocks inside and no-touch items outside" />

<!--
Timebox: 3 minutes

Talk track: Look at Purrmission beside the wooden boundary frame. For Proof 1, never take an agent's word for which files it changed—check `git diff` against your base commit, including staged, unstaged, and untracked files. For Proof 2, remember that "Saved on disk does not equal Loaded in context." If an instruction file has `applyTo: "src/api/**"` and Riley edits `lib/dispatch.ts`, that rule never loaded! Always verify inclusion using `/instructions` and `/context` in Copilot CLI, or by expanding the References dropdown in VS Code Chat.

Transition: Now let's examine Proofs 3 and 4: negative tests and hard stop conditions.

Audience question: Why is `git diff --stat` alone not enough to verify Proof 1?

Response guidance: `--stat` misses untracked files and doesn't show whether an edit inside an allowed file weakened a security check or deleted a test assertion.

Payoff: Learners can audit exact Git change surfaces and prove instruction loading via `/instructions` and References.

Sources: https://docs.github.com/en/copilot/reference/custom-instructions-support; https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
-->

---
layout: two-panel
---

::title::
# Planning Proof 3 & 4: Negative Tests and Hard Stop Conditions
::text::

- **Proof 3 · Negative & Edge-Case Tests First (TDD/BDD):**
  - Require a named test that asserts **what must be rejected** (expired auth token, negative quantity, unauthorized role, malformed JSON)
  - Verify the test **fails before the fix** and **passes after the fix** with its assertions intact
- **Proof 4 · Mandatory Stop-and-Ask Triggers:**
  - Riley must pause and ask Mergewell before: adding dependencies (`package.json`), changing database schemas, modifying auth/permissions, or altering CI/CD workflows

::visual::
<img src="/images/approval-boundary-gate.png" alt="Purrmission guarding the approval boundary gate where negative test assertions and stop triggers are checked" />

<!--
Timebox: 2 minutes

Talk track: Proof 3 solves the happy-path illusion: write or specify the negative test first! If your feature filters dispatch alerts by role, require a test proving an unauthorized caller gets a 403 Forbidden. Watch that test fail before implementation, and inspect the test file afterward to make sure the agent didn't weaken the `expect()` assertion just to make the suite green. Proof 4 sets hard stop conditions: if Riley discovers she needs a new npm package or a schema change, she must stop and ask rather than improvising.

Transition: Now let's move to SDLC Stage 2 and outfit our repository so these rules and tools are wired in cleanly.

Audience question: Why should you always read the diff of a test file that an agent touched?

Response guidance: An agent trying to make a red test green might delete or loosen the test assertion instead of fixing the underlying bug.

Payoff: Learners enforce negative boundary tests and explicit stop triggers in every agent plan.

Sources: workshops/purrmission-to-proceed/requirements.md
-->

---
layout: two-panel
---

::title::
# A Map, Not a Manual: Scoping Repository and Path Instructions
::text::

- **Keep Repo-Wide Instructions Concise (`.github/copilot-instructions.md` & `AGENTS.md`):**
  - State build/test/lint commands, folder layout, and core conventions in **under ~100 lines**—treat it as a map, not a 2,000-line manual that taxes every turn!
- **Target Specific Layers with `applyTo` (`.github/instructions/*.instructions.md`):**
  - Scope API rules to `src/api/**`, UI rules to `src/ui/**`, and test rules to `**/*.test.ts` so they load only when relevant
- **Bootstrap and Audit with `/init`:**
  - Use `/init` to generate a starter instruction file from real repo commands, then human-audit and prune it before committing

::visual::
<img src="/images/instruction-conflict-human-resolution.png" alt="Agent Mergewell resolving conflicting instruction notes into a clean layered repository map" />

<!--
Timebox: 3 minutes

Talk track: Welcome to SDLC Stage 2: Outfitting the Project Harness. A common mistake is dumping 2,000 lines of style guides into `.github/copilot-instructions.md`. Because repo-wide instructions enter every request, a giant manual bloats input tokens and buries the rules that matter. Make `.github/copilot-instructions.md` and `AGENTS.md` a crisp map: exact build, test, and lint commands plus top-level architecture. Put layer-specific rules into `.github/instructions/*.instructions.md` with `applyTo` globs so database rules only load when touching database files. And when onboarding a new repo, run `/init`, then review and trim what it generated before committing.

Transition: How do versioned instruction files relate to Copilot Memory?

Audience question: What happens when a repository instruction file contradicts a prompt you type in Chat?

Response guidance: Layered instructions can conflict rather than follow a rigid universal override—keep rules non-overlapping and inspect behavior.

Payoff: Learners structure concise repo-wide maps and path-scoped `applyTo` rules without bloating every turn.

Sources: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage; https://docs.github.com/en/copilot/reference/custom-instructions-support
-->

---
layout: two-panel
---

::title::
# Copilot Memory vs. Durable SDLC Artifacts
::text::

- **What Copilot Memory Does (`/memory on|off|show`):**
  - Captures helpful repository facts and user preferences across sessions on supported paid plans
  - Manage or inspect in Copilot CLI with `/memory on|off|show` or in GitHub Copilot settings (asking Chat to "forget" is not proof of deletion)
- **What Must Live in Versioned Git Files:**
  - Architecture specs, ADRs, security boundaries, and required build/test commands belong in `.github/` and repo docs—**never rely on Memory for mandatory safety rules** because recall is selective and never guaranteed

::visual::
<img src="/images/evidence-human-verification.png" alt="Agent Mergewell separating transient memory sticky notes from version-controlled repository blueprints" />

<!--
Timebox: 2 minutes

Talk track: Copilot Memory is great for convenience, and you can inspect or toggle it in the CLI with `/memory show`, `/memory on`, or `/memory off`. But Purrmission has a strict rule for the SDLC: never rely on Memory for a mandatory architecture or security constraint. Memory recall is selective and not guaranteed across every teammate or runner. If a rule must be true for the build to be safe, commit it in `.github/` where Git tracks it.

Transition: What if you have a detailed 200-line SDLC procedure—like an API contract audit or release-notes template—that you only need occasionally? That's a job for Reusable Skills.

Audience question: If you tell Copilot in chat "Please forget that rule," does that guarantee the stored memory entry was deleted?

Response guidance: No—use `/memory` controls or GitHub Settings to view and delete stored memory entries explicitly.

Payoff: Learners separate convenience memory from version-controlled SDLC specifications and instructions.

Sources: https://docs.github.com/en/copilot/concepts/agents/copilot-memory; https://github.blog/changelog/2026-05-26-copilot-memory-has-more-controls-for-deletion-scope-and-the-copilot-cli
-->

---
layout: two-panel
---

::title::
# Packaging SDLC Procedures as Reusable Skills (SKILL.md)
::text::

- **Mergewell's Deployable Wrist Gadgets (`.github/skills/<name>/SKILL.md`):**
  - A **Skill** bundles a YAML frontmatter (`name`, `description`), step-by-step Markdown instructions, and optional helper scripts or templates
- **On-Demand Context Efficiency:**
  - Only the short skill metadata is discovered up front; the full `SKILL.md` body and scripts load **only when the skill is invoked**
- **SDLC Use Cases:**
  - `api-contract-review`, `db-migration-checklist`, `changelog-and-release-notes`, `a11y-audit`
- **CLI & App Controls:** Inspect or refresh with `/skills`, `/skills info <name>`, and `/skills reload`

::visual::
<img src="/images/tool-action-workbench.png" alt="Agent Mergewell deploying a modular mechanical skill gadget at the workbench" />

<!--
Timebox: 3 minutes

Talk track: Watch Mergewell click his wrist rig: out pops a specialized gadget for the exact task at hand, then folds back away when he's done. In the Copilot harness, that is a Reusable Skill (`.github/skills/<name>/SKILL.md`). Instead of cramming your database migration checklist, API review rubric, and release-note template into `.github/copilot-instructions.md`, package each one as a `SKILL.md`. The harness reads the short description to know when the skill applies, and only loads the full procedure when invoked—keeping your everyday context window fast and cheap.

Transition: Skills define *how* a procedure runs. How do we define *who* runs each stage of the SDLC with least-privilege tools?

Audience question: What repeatable workflow on your team today would make the best first `SKILL.md`?

Response guidance: PR description/release-note generation, API schema checks, test fixture scaffolding, or security pre-flight reviews are great candidates.

Payoff: Learners know how to package repeatable SDLC procedures as on-demand `SKILL.md` skills.

Sources: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
-->

---
layout: two-panel
---

::title::
# Role Separation with Custom Agents (.agent.md)
::text::

- **Define Specialist SDLC Roles (`.github/agents/<name>.agent.md`):**
  - Give each SDLC phase a dedicated specialist with an explicit `description`, `tools:` allowlist, and optional task-fit model:
  - **1 · `spec-architect.agent.md`:** `tools: [read, search]` — drafts Specs/ADRs and checks scope without editing code
  - **2 · `test-engineer.agent.md`:** `tools: [read, search, edit, execute]` — writes failing negative & edge-case tests first
  - **3 · `code-reviewer.agent.md`:** `tools: [read, search]` — audits diffs against the 4 Planning Proofs with **write tools removed**
- **Capability Limits Beat Prose:** Removing `edit` from `tools:` enforces read-only behavior; asking nicely in prose does not

::visual::
<img src="/images/custom-agent-specialist-role.png" alt="Agent Mergewell directing specialist custom agent cards with scoped tool permissions" />

<!--
Timebox: 3 minutes

Talk track: In a real SDLC, you don't want the same unrestricted agent writing the spec, writing the code, and grading its own code review. Custom Agents (`.github/agents/*.agent.md`) let you separate roles and lock down their tool allowlists. Your `spec-architect` and `code-reviewer` agents only get `read` and `search` tools—they physically cannot modify source files! And where supported, you can pair fast verification agents with lightweight models like `Claude Haiku 5.5`.

Transition: Now let's connect external SDLC systems to our agents using MCP servers and Agent Plugins 1.0.

Audience question: Why is removing `edit` and `execute` from a reviewer agent's `tools:` array safer than writing "You are a read-only reviewer" in its prompt?

Response guidance: Prompt instructions can be ignored or overridden by context drift; an omitted tool capability cannot be invoked.

Payoff: Learners design role-separated `.agent.md` profiles with enforced minimal tool allowlists.

Sources: https://docs.github.com/en/copilot/reference/custom-agents-configuration
-->

---
layout: two-panel
---

::title::
# Connecting the SDLC Workbench: MCP Servers and Agent Plugins 1.0
::text::

- **Model Context Protocol (MCP) Three Primitives:**
  - **Tools:** Executable actions (query issue tracker, run schema validator) — *gate write/network tools carefully!*
  - **Resources:** Structured read-only context (OpenAPI specs, architecture docs, telemetry snapshots)
  - **Prompts:** Reusable interaction templates exposed by the server
- **Agent Plugins 1.0 (GA across VS Code, CLI & Copilot App):**
  - Package portable **skills** and **MCP configs** alongside namespaced **custom agents**, **commands**, and **hooks**
  - Manage and audit installed plugins in the **Copilot App Customize tab (GA)** or via `/plugin` and `/mcp`

::visual::
<img src="/images/tool-action-workbench.png" alt="Riley Relay and Agent Mergewell inspecting governed MCP and Agent Plugin connections at the workbench" />

<!--
Timebox: 3 minutes

Talk track: To connect your harness to issue trackers, schema registries, or documentation databases across the SDLC, we use Model Context Protocol (MCP) and Agent Plugins 1.0. Remember that MCP has three distinct primitives: Tools perform actions, Resources supply read-only data, and Prompts provide templates. And with Agent Plugins 1.0—now generally available across VS Code, Copilot CLI, and the Copilot App—teams can distribute vetted skills, MCP server configs, custom agents, and hooks as a single portable package. Always inspect a plugin's included MCP servers and executable hooks before enabling it!

Transition: Let's put Stage 1 and Stage 2 together in a side-by-side Pre-Flight Planning Audit before Riley starts coding.

Audience question: What is the difference between an MCP Resource and an MCP Tool when you are evaluating risk?

Response guidance: A Resource supplies data to read, whereas a Tool can execute state-changing actions or external network requests.

Payoff: Learners distinguish MCP Tools, Resources, and Prompts and understand portable Agent Plugins 1.0 packaging.

Sources: https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app; https://docs.github.com/copilot/concepts/agents/about-plugins
-->

---
layout: single-panel
---

::title::
# The Pre-Flight Planning Audit: From Vague Ticket to Signed Brief
::content::

| Unaudited 4:15 PM Prompt (Fails Pre-Flight) | Purrmission-Approved SDLC Pre-Flight Brief (Ready for Loop) |
|---|---|
| *"Add priority alert filtering to the dispatch service and make sure tests pass."* | **Goal & Spec:** Implement `filterAlertsByPriority` per `#file:docs/adr-004-priority-filter.md` |
| ❌ No scope or no-touch boundary stated | **Proof 1 (Scope):** Edit only `src/dispatch/filter.ts` & `src/dispatch/filter.test.ts`. **No-Touch:** `src/billing/**`, `src/auth/**`, `.github/workflows/**` |
| ❌ Assumes instructions loaded automatically | **Proof 2 (Loaded Rules):** Verified `api-security.instructions.md` active via `/instructions` & References |
| ❌ Invites happy-path self-confirming test | **Proof 3 (Negative Tests First):** Add failing tests for `expiredCallerToken` (`401`) and `invalidPriorityLevel` (`400`) before implementation |
| ❌ No stop triggers defined | **Proof 4 (Hard Stops):** Stop and ask if any schema, lockfile, or auth middleware change appears needed |

<!--
Timebox: 3 minutes

Talk track: Compare these two briefs side by side. On the left is the vague one-liner that caused the 4:15 PM trap. On the right is the signed Bureau Pre-Flight Brief. It takes less than two minutes to write or review in Plan mode, and it locks in all four Planning Proofs: grounded ADR, explicit allowed and no-touch paths, verified loaded instructions, negative tests first, and hard stop triggers.

Transition: Purrmission lifts his paw—the bridge is open! Let's enter SDLC Stage 3 and run the Agentic Development Loop.

Audience question: If an agent's plan in Plan mode omits the No-Touch list, what is your immediate next move before clicking "Start Implementation"?

Response guidance: Reply in Plan mode to add the explicit no-touch paths and negative test requirement before switching to Agent execution.

Payoff: Learners can transform any vague ticket into a complete, auditable SDLC pre-flight contract.

Sources: workshops/purrmission-to-proceed/requirements.md
-->

---
layout: single-panel
---

::title::
# Operating the Agentic Development Loop
::content::

<AgenticLoopNativeAnimation />

<!--
Timebox: 3 minutes

Talk track: Watch the 30-second Agentic Loop in action. In SDLC Stage 3 (Implementation), work moves through six stations: 01 Understand (Mergewell frames the brief and limits), 02 Plan (Mergewell reviews Riley's bounded route), 03 Act (Riley performs one allowed action), 04 Observe (Riley inspects compiler/test output and stops on any boundary), 05 Adjust (Purrmission signals when an Ask boundary is hit, and Mergewell chooses Retry, Ask, Stop, or Recover), and 06 Verify (Mergewell inspects the returned evidence). Notice that Riley never jumps straight from Act to Done—every action produces observable evidence that drives the next decision.

Transition: How do we make Station 04 (Observe) fast, cheap, and objective? With test-driven guardrails.

Audience question: In the animation, when Riley hits an unexpected permission or scope boundary at Station 04 (Observe), who decides whether to Retry, Adjust, or Stop?

Response guidance: Agent Mergewell (the accountable human engineer) makes the routing decision after Purrmission signals the boundary.

Payoff: Learners can operate the six-station `Understand -> Plan -> Act -> Observe -> Adjust -> Verify` loop with clear human/agent role boundaries.

Sources: content/modules/02-agentic/module.md; https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: two-panel
---

::title::
# Test-Driven Agentic Development and Deterministic Guardrails
::text::

- **Why TDD Is an Agent Superpower:**
  - When failing negative and unit tests exist *first*, the test runner becomes an objective oracle inside the agentic loop
- **Deterministic Feedback Cuts Token Waste:**
  - Fast local checks (`tsc --noEmit`, `vitest run <file>`, linter) pinpoint the exact file and line number—preventing 10-turn guessing spirals
- **Verify Test Integrity After Green:**
  - Always inspect the diff of `*.test.ts` to confirm the agent fixed the implementation rather than deleting or weakening the test assertion!

::visual::
<img src="/images/evidence-human-verification.png" alt="Agent Mergewell and Riley Relay verifying deterministic test runner output at the workbench" />

<!--
Timebox: 3 minutes

Talk track: Test-Driven Development (TDD) wasn't invented for AI agents, but it turns out to be the single highest-leverage accelerator for agentic coding. When you write or approve the failing unit and negative tests first, Riley doesn't have to guess whether her edit worked—she runs `vitest` or `tsc` on the single target file, reads the exact assertion failure, and fixes it on Turn 2. That saves both time and AI credits. Just remember Purrmission's check: always inspect the test file diff to verify the assertions stayed strong!

Transition: Can we force those deterministic checks to run automatically without relying on the model to remember them? Yes—with Repository Hooks.

Audience question: Why should an agent run `vitest run src/dispatch/filter.test.ts` during its loop instead of running the entire 40-minute integration suite on every edit?

Response guidance: Targeted checks give sub-second feedback with minimal log output; run the full suite once the targeted check passes.

Payoff: Learners use test-first assertions and targeted typecheck/test commands as deterministic loop guardrails.

Sources: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: two-panel
---

::title::
# Enforcing Loop Rules with Repository Hooks (.github/hooks)
::text::

- **Deterministic Lifecycle Hooks (`.github/hooks/*.json`):**
  - Execute shell scripts or validation checks automatically at defined agent lifecycle points—independent of model whim
- **Supported Surface Boundary:**
  - Repository `.github/hooks/*.json` configurations are documented for **Copilot Cloud Agent** and **GitHub Copilot CLI** (configure VS Code workspace hooks separately where supported)
- **What Hooks Are Great For:**
  - Running a fast linter/typecheck after file edits, blocking edits to protected paths, or verifying commit formatting
- **Trust Boundary:** Hooks execute code—audit `.github/hooks/` changes with the same rigor as `.github/workflows/`!

::visual::
<img src="/images/approval-boundary-human-decision.png" alt="Purrmission and Agent Mergewell inspecting deterministic repository hook guardrails" />

<!--
Timebox: 3 minutes

Talk track: Even a well-instructed model can occasionally forget to run the linter before declaring victory. Repository Hooks (`.github/hooks/*.json`) let you wire deterministic pre- and post-action checks into Copilot CLI and Copilot Cloud Agent. Because hooks run automatically at the harness level, they turn "please remember to run the check" into a deterministic guardrail. Keep two caveats in mind: verify host support (CLI and Cloud Agent use `.github/hooks/*.json`), and treat hook files as executable code under strict review.

Transition: What if an agent loop still goes down a dead-end architectural path on Turn 4? That's why we use Git save points.

Audience question: Why should `.github/hooks/**` always be on your `CODEOWNERS` and Pre-Flight No-Touch list for ordinary feature tasks?

Response guidance: Because modifying a hook can execute arbitrary shell commands or disable safety checks during agent runs.

Payoff: Learners understand how `.github/hooks/*.json` enforce deterministic checks and why hook files are a privileged trust boundary.

Sources: https://docs.github.com/en/copilot/concepts/agents/hooks
-->

---
layout: two-panel
---

::title::
# Git Save Points and Safe Rollback During Development
::text::

- **Four Native Git Checkpoints:**
  - **1 · `BRANCH`:** Always start agentic work on a dedicated feature branch or isolated Git worktree
  - **2 · `DIFF`:** Inspect `git diff` and `git status` after each bounded sub-task
  - **3 · `CHECKS`:** Run targeted tests and typechecks before staging
  - **4 · `COMMIT`:** Commit each verified milestone so you can `git restore` or `git reset` to a known-good state
- **Know `/rewind` (`/undo`) Limits:**
  - CLI `/rewind` restores tracked file edits made by Copilot in the local session, but **cannot undo external side effects** (API calls, DB writes, pushed commits) or edits you made manually afterward

::visual::
<img src="/images/plan-before-action-route.png" alt="Agent Mergewell marking branch, diff, checks, and commit save points along the development trail" />

<!--
Timebox: 3 minutes

Talk track: Never let an agent edit 15 files across 45 minutes without a single Git commit in between. Use Git as your time machine: branch first, inspect the diff, run your checks, and make a small commit every time a sub-task is green. That way, if Turn 6 goes sideways, you don't lose Turns 1 through 5! You can also use `/rewind` (or `/undo` in CLI) to roll back Copilot's tracked file changes—just remember that `/rewind` cannot un-send a network request or undo a database mutation.

Transition: What if you have three well-specified backlog tickets and want one of them built asynchronously while you stay focused on your main branch?

Audience question: Name one action an agent might take in a terminal that `/rewind` cannot undo.

Response guidance: Publishing a package, pushing a branch to a remote, mutating a live database, or calling an external webhook.

Payoff: Learners combine Git milestone commits with `/rewind` and understand the boundary of local file rollback.

Sources: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/roll-back-changes
-->

---
layout: two-panel
---

::title::
# Delegating Backlog & Async Development to Copilot Cloud Agent
::text::

- **Asynchronous SDLC Delegation:**
  - Assign a well-scoped GitHub Issue or start a task with **Copilot Cloud Agent** to run in an isolated GitHub-hosted cloud environment
- **What Makes a Great Cloud-Agent Handoff:**
  - Clear Spec/acceptance criteria, scoped files, existing test commands (`.github/copilot-instructions.md` / `/init`), and explicit stop conditions
- **Remote Oversight & Cross-Surface Continuation (`Mobile -> App -> IDE`):**
  - Track progress, inspect diffs, and steer from **GitHub Mobile** or the **Copilot App**, or continue the session locally in **VS Code** / **Copilot CLI**

::visual::
<img src="/images/mobile-cloud-agent-oversight.png" alt="Agent Mergewell tracking a delegated Copilot Cloud Agent session from GitHub Mobile while Purrmission watches the PR gate" />

<!--
Timebox: 3 minutes

Talk track: While you and Riley finish the core dispatch filter locally, a secondary ticket lands in the backlog: updating the API documentation and adding a CSV export helper. Instead of context-switching, Mergewell delegates that well-scoped issue to Copilot Cloud Agent. It spins up an isolated cloud sandbox, follows your repo's committed instructions and hooks, and opens a draft Pull Request. While grabbing coffee, Mergewell checks the status and diff on GitHub Mobile, then continues or reviews the session in the Copilot App or VS Code.

Transition: Now our local feature and our Cloud Agent PR are both ready for SDLC Stage 4: Security Verification, CI/CD, and Release Management!

Audience question: Why do poorly written GitHub Issues fail much harder when assigned to Copilot Cloud Agent than when worked interactively in VS Code?

Response guidance: In an asynchronous cloud session, you aren't sitting there on Turn 1 to clarify a vague requirement—so the Spec and acceptance criteria must be explicit up front.

Payoff: Learners know how to package self-contained briefs for Copilot Cloud Agent and oversee sessions across Mobile, App, and IDE.

Sources: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent; https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-mobile
-->

---
layout: single-panel
---

::title::
# Four Security Evidence Lenses: Why One Scan Never Suffices
::content::

<FourSecurityLensesPipeline />

<!--
Timebox: 3 minutes

Talk track: Welcome to SDLC Stage 4: Security, CI/CD, Deployment, and Release Management. The code compiles and unit tests are green. Can we merge now? Purrmission hops onto the Release Desk and sets out four magnifying lenses. Click "Play 4-Lens Scan" above: why do we need four lenses? Because an LLM review is probabilistic and great at spotting contextual logic flaws, while static analysis and secret scanners are deterministic and exhaustive for known patterns. No single scan catches everything, and an agent never self-certifies its own security.

Transition: Let's look at Lenses 1 and 2 first—what happens before your code even reaches a Pull Request.

Audience question: Why can't `/security-review` alone replace Secret Scanning Push Protection or CodeQL?

Response guidance: `/security-review` is a probabilistic LLM review of active changes; Push Protection deterministically blocks known secret patterns at `git push`, and CodeQL performs deterministic data-flow analysis in CI.

Payoff: Learners understand how the four security lenses complement each other without overlapping blind spots.

Sources: workshops/purrmission-to-proceed/requirements.md
-->

---
layout: two-panel
---

::title::
# Lens 1 & 2: Shift-Left /security-review and Secret Scanning Push Protection
::text::

- **Lens 1 · Shift-Left `/security-review` (Copilot CLI & App):**
  - Run `/security-review` on your staged/unstaged changes **before** opening a pull request
  - Catches logic vulnerabilities, missing auth checks, and injection risks while context is fresh in your local workspace
- **Lens 2 · GitHub Secret Scanning Push Protection (`git push`):**
  - Deterministically blocks pushes containing supported secret patterns before credentials ever enter remote Git history
  - **Caveat:** A clean push is not proof zero custom secrets exist, and any bypass creates an explicit audit event and alert

::visual::
<img src="/images/cli-controlled-action.png" alt="Agent Mergewell running /security-review locally while Purrmission guards the git push boundary" />

<!--
Timebox: 3 minutes

Talk track: Lenses 1 and 2 happen before a reviewer ever sees your Pull Request. First, run `/security-review` in Copilot CLI or the Copilot App on your active diff. In our story, `/security-review` catches an unvalidated sort parameter in Riley's dispatch filter before Mergewell even pushes the branch. Second, when Mergewell runs `git push`, GitHub Secret Scanning Push Protection inspects the commits at the network gate to block supported secret tokens from entering repository history.

Transition: Once the push succeeds and the Pull Request opens, how do we package the PR as a complete SDLC handoff?

Audience question: Why is blocking a secret at `git push` infinitely cheaper than catching it in a PR comment ten minutes later?

Response guidance: Once a secret enters remote Git history, deleting the line in a follow-up commit does not erase it—you must rotate and revoke the credential immediately.

Payoff: Learners combine pre-PR `/security-review` with Secret Scanning Push Protection at the push boundary.

Sources: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference; https://docs.github.com/en/code-security/concepts/secret-security/push-protection
-->

---
layout: two-panel
---

::title::
# Pull Requests as SDLC Evidence Packages and Documentation
::text::

- **A PR Is an Evidence Handoff, Not Just a Diff Dump:**
  - Follow `.github/pull_request_template.md` to package:
    1. **Spec / ADR & Issue Link:** What requirement this change fulfills
    2. **Exact Validation Evidence:** Exact commands run (`pnpm typecheck`, `pnpm test`, `pnpm validate`) and their pass/fail results
    3. **Updated Documentation & Release Notes:** Keep `README.md`, API docs, and customer-facing changelog notes synchronized in the same PR
    4. **Open Risks & Focus Areas:** Tell human reviewers where to look closest

::visual::
<img src="/images/pull-request-evidence-handoff.png" alt="Riley Relay handing a structured Pull Request evidence folio to Agent Mergewell across the review desk" />

<!--
Timebox: 3 minutes

Talk track: Look at Riley handing the PR folio to Mergewell. Across the SDLC, documentation and release notes cannot be an afterthought bolted on next month. Use your PR template and a `SKILL.md` helper to package the Spec link, the exact validation commands and their results, updated README and API docs, and a honest list of remaining risks. Listing a test command without stating whether you actually ran it and what it returned is never acceptable Bureau evidence!

Transition: As soon as that PR opens, GitHub Actions kicks off our CI/CD pipeline evidence.

Audience question: What is the difference between writing "Tests: `pnpm test`" in a PR description versus writing "`pnpm test` — 67 passed (0 failed)"?

Response guidance: The first is just a command string; the second is verifiable execution evidence.

Payoff: Learners package Pull Requests with complete spec links, command results, updated documentation, and release notes.

Sources: content/modules/02-agentic/module.md
-->

---
layout: two-panel
---

::title::
# GitHub Actions as CI/CD Pipeline Evidence
::text::

- **Clean Room Verification:**
  - Local "works on my machine" is not enough—**GitHub Actions** runs typechecks, unit/integration tests, builds, and security scans in a clean, reproducible runner environment
- **Loop Feedback, Not Auto-Approval:**
  - When a CI job fails, feed the failure log back into the agentic loop to diagnose and fix; a green CI check is necessary evidence, never automatic merge authorization
- **Retention Boundary (Effective Oct 2026):**
  - Workflow runs, checks, and statuses follow configured Actions retention (default/max **90 days** on public repos)—preserve critical release provenance in committed artifacts!

::visual::
<img src="/images/evidence-streams-human-acceptance.png" alt="Agent Mergewell inspecting GitHub Actions CI pipeline results alongside Purrmission" />

<!--
Timebox: 3 minutes

Talk track: GitHub Actions is your clean-room truth serum. Even if tests passed on your laptop, Actions verifies that no untracked local file or cached dependency was propping up the build. Remember the October 2026 Actions retention update: workflow run metadata, checks, and statuses follow configured retention windows (up to 90 days), so record durable release provenance in your repository rather than assuming check links last forever.

Transition: Inside that CI/CD pipeline, Lenses 3 and 4 run on our Pull Request: GHAS and Copilot Code Review.

Audience question: Why can a test pass locally in an agent session but fail in GitHub Actions two minutes later?

Response guidance: Uncommitted files, local environment variables, OS path casing (Windows vs. Linux), or unpinned dependencies (`--frozen-lockfile`).

Payoff: Learners treat GitHub Actions CI as clean-room loop feedback and account for check-retention boundaries.

Sources: https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses
-->

---
layout: two-panel
---

::title::
# Lens 3 & 4: Deterministic GHAS, Copilot Code Review, and Autofix
::text::

- **Lens 3 · Deterministic GHAS (`CodeQL` + `Dependency Review` + `Copilot Autofix`):**
  - **CodeQL** traces source-to-sink data flows; **Dependency Review** flags vulnerable packages in lockfile diffs; **Copilot Autofix** proposes targeted remediations that you verify against tests
- **Lens 4 · Copilot Code Review (Updated Oct 2026):**
  - **Effort Levels:** Defaults to **Balanced** effort (since Sep 28 / Oct 2 API update), with **Lite** available for faster, lower-credit passes
  - **Resolution Reasons:** Disposition comments as `Addressed`, `Won't fix`, or `Incorrect`
  - **Approval Semantics:** Even where optional Copilot PR approval is enabled by policy, **Bureau rule requires human `CODEOWNERS` acceptance**

::visual::
<img src="/images/evidence-streams-human-acceptance.png" alt="Agent Mergewell reviewing CodeQL, Dependency Review, and Copilot Code Review findings with Purrmission" />

<!--
Timebox: 4 minutes

Talk track: Here are Lenses 3 and 4 working together on the Pull Request. Lens 3 is deterministic GitHub Advanced Security: CodeQL analyzes source-to-sink data flow, Dependency Review checks `pnpm-lock.yaml` changes for known CVEs, and Copilot Autofix drafts code fixes for discovered alerts. Lens 4 is Copilot Code Review, which now defaults to Balanced effort (with Lite available when you want a quick check) and runs your repository's skills and read-only MCP tools. When you resolve a Copilot review thread, select the resolution reason—Addressed, Won't fix, or Incorrect—and verify against the actual diff and test suite. Even though GitHub now offers an admin setting allowing Copilot Code Review to approve PRs, approvals are off by default and our engineering governance always requires a human CODEOWNERS approval before merge.

Transition: Once all 4 lenses and human code review are green, how do we govern deployment and release management?

Audience question: When resolving a Copilot Code Review comment as `Incorrect` or `Won't fix`, what evidence should you leave in the thread for your human co-reviewer?

Response guidance: A brief note naming the test, spec constraint, or architectural reason why the current code is intentional.

Payoff: Learners combine GHAS + Autofix with Copilot Code Review (Balanced/Lite effort, resolution reasons) while retaining human merge authority.

Sources: https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/; https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests
-->

---
layout: two-panel
---

::title::
# Deployment Governance: Branch Rulesets, CODEOWNERS, and Environments
::text::

- **Protected Branch Rulesets (`main`):**
  - Block direct pushes and force-pushes; require Pull Requests, passing CI/CodeQL status checks, and resolved review conversations
- **Enforced Human Ownership (`CODEOWNERS`):**
  - Require explicit sign-off from designated human code owners on sensitive paths (`src/auth/**`, `.github/**`, release manifests)
- **Progressive Environment Gates (`Local -> Private Test -> Production`):**
  - Merge to `main` deploys to the **Private Test** environment first; **Production** deployment is gated by environment protection rules and human test approval

::visual::
<img src="/images/approval-boundary-human-decision.png" alt="Chief Morgan Charter, Agent Mergewell, and Purrmission at the protected environment deployment gate" />

<!--
Timebox: 4 minutes

Talk track: Now we enter the final mile of the SDLC: Deployment Governance. Good intentions don't protect production—repository rulesets do. On `main`, rulesets require pull requests, green CI and CodeQL checks, resolved review threads, and human `CODEOWNERS` approval. And deployment follows a strict two-stage environment promotion: merging to `main` deploys to Private Test first, where human reviewers inspect the live integrated build before authorizing Production promotion.

Transition: What happens if someone merges an unrelated commit to `main` two minutes after you tested the Private Test site? Let's watch the Exact-Commit Release Conveyor!

Audience question: Why does a `CODEOWNERS` file alone do nothing unless a branch ruleset or branch protection rule enables "Require review from Code Owners"?

Response guidance: `CODEOWNERS` only maps paths to teams/users; the ruleset is what actually enforces the merge block.

Payoff: Learners configure and verify branch rulesets, `CODEOWNERS`, and staged environment gates.

Sources: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
-->

---
layout: single-panel
---

::title::
# Release Management: Exact-Commit Promotion and Verified Rollback
::content::

<ExactCommitReleaseConveyor />

<!--
Timebox: 4 minutes

Talk track: Press "Play Release Flow" on the Exact-Commit Release Conveyor above. This is one of the most important release-engineering lessons in modern AI-assisted teams. When your team ships faster with agents, `main` moves fast. If you approve commit `a7f3c91` on the Private Test site at 4:40 PM, and another developer merges commit `b99e004` at 4:42 PM, deploying "whatever is on `main`" would push unreviewed code to production! Instead, our release workflow pins the exact reviewed 40-character commit SHA (`a7f3c91`) in a committed release manifest, exports and deploys from a pinned Git worktree of that exact commit, runs automated post-deploy route and provenance checks, and keeps the prior verified commit (`94d1e02`) ready as a one-command rollback target.

Transition: Let's bring the entire SDLC together on Slide 27: Your Purrmission Slip.

Audience question: Why is automated post-deployment verification evidence rather than a third human approval gate?

Response guidance: Humans approve local readiness and private-test readiness; once test approval pins the exact commit, automated verification confirms the production deployment matches that exact commit and all routes respond cleanly.

Payoff: Learners understand exact-commit SHA pinning, worktree-isolated release promotion, automated post-deploy verification, and verified rollback.

Sources: workshops/purrmission-to-proceed/requirements.md
-->

---
layout: single-panel
---

::title::
# Your Purrmission Slip: The End-to-End SDLC Release Checklist
::content::

| SDLC Gate | The 5 Questions on Your Purrmission Slip Before Shipping | Verified Evidence |
|---|---|---|
| **1 · Holistic Plan & Spec** | Is the goal, Spec/ADR, blast-radius allowlist, and no-touch list written down? | Committed Spec/ADR + Pre-Flight Brief |
| **2 · Harness & Customization** | Did the right instructions, skills, and least-privilege agent tools **actually load**? | `/instructions`, `/context`, Chat References, `.agent.md` allowlist |
| **3 · TDD & Loop Guardrails** | Did a **negative boundary test** fail before the fix and pass after, with `.github/hooks` green? | Intact test diff + passing `vitest` / `tsc` / linter output |
| **4 · Four Security Lenses** | Did `/security-review`, Push Protection, GHAS CodeQL/Deps, and Copilot Code Review pass? | Resolved review threads + green CI/CodeQL checks |
| **5 · Exact-Commit Release** | Did a human `CODEOWNER` approve the merge and pin the **exact tested commit SHA** with a rollback target? | Signed PR + pinned release manifest SHA + rollback SHA |

<!--
Timebox: 3 minutes

Talk track: Here is your Monday-morning Purrmission Slip covering the entire SDLC from initial ticket to production release. Five gates, five pieces of deterministic evidence: 1. Holistic Plan and Spec; 2. Verified loaded instructions and least-privilege tools; 3. Negative tests and deterministic loop guardrails; 4. All four security and review lenses; and 5. Human CODEOWNERS sign-off with exact-commit release promotion and rollback readiness. When all five rows are checked, Purrmission curls back up on his warm cushions and you can ship at 4:55 PM on Friday with total confidence!

Transition: Let's do a quick live check before launching `Case File Ω-2`.

Audience question: Which of the five gates on this Purrmission Slip will you adopt first on your team next week?

Response guidance: Take two quick responses from the room to anchor commitment before the mission.

Payoff: Learners leave Module 2 with a complete 5-gate SDLC verification checklist from planning to production release.

Sources: workshops/purrmission-to-proceed/requirements.md
-->

---
layout: single-panel
---

::title::
# Demo!
::content::

<div style="display:grid;place-items:center;height:320px;text-align:center">
  <div>
    <p style="font-size:1.6rem;font-weight:800;color:#6639ba;margin-bottom:0.5rem">Live SDLC Walkthrough</p>
    <p style="font-size:1.15rem;color:#57606a">4 Planning Proofs · Verifying <code>/instructions</code>, <code>SKILL.md</code> &amp; <code>.agent.md</code> · Running <code>/security-review</code> &amp; Release Check</p>
  </div>
</div>

<!--
Timebox: 0 minutes

Talk track: Quick live look at the four files you are about to build in your case folder—`.github/copilot-instructions.md`, `.github/agents/case-writer.agent.md`, `.github/skills/case-summary/SKILL.md`, and a path-scoped `.instructions.md`—and how to verify each one loaded.

Transition: Let's launch `Case File Ω-2`!

Audience question: Ready to build your SDLC customization suite and run the loop?

Response guidance: Advance immediately to Slide 29 and start the 45-minute mission timer.

Payoff: Learners see the exact file paths and verification checks for the Agentic mission.

Sources: content/modules/02-agentic/module.md
-->

---
layout: two-panel
---

::title::
# Your Mission: Hand Off Work with Confidence
::text::

- **Open the Portal Mission Page:** `Your Mission: Hand Off Work with Confidence` (`45 minutes`)
- **5 Core SDLC Operations (50 pts; 40 pts completes):**
  1. **Operation Open the Case (`10 pts`):** Write `.github/copilot-instructions.md` and prove it changes behavior
  2. **Operation Write the Brief (`10 pts`):** Create a specialist custom agent at `.github/agents/case-writer.agent.md` and run it
  3. **Operation Verify the Evidence (`10 pts`):** Package a reusable skill at `.github/skills/case-summary/SKILL.md`
  4. **Operation Close the Handoff (`10 pts`):** Write an `applyTo` instruction rule scoped to Markdown files only
  5. **Operation Watch the Loop (`10 pts`):** Run a multi-step job, audit the plan against the 4 Planning Proofs, and record where you step in

::visual::
<img src="/images/cloud-agent-bounded-brief.png" alt="Agent Mergewell, Riley Relay, and Purrmission launching the 45-minute Agentic SDLC mission" />

<!--
Timebox: 45 minutes

Talk track: Your 45-minute Agentic SDLC mission starts now! Reopen your `copilot-case-file` folder from Foundations (or copy the starter packet on the mission page), select your harness at the top, and complete the five operations. Remember Purrmission's rule: saving a file on disk only earns full credit when you verify the behavioral proof that the harness actually loaded and followed it!

Transition: After the mission debrief, we will enter Act III—Module 3: Under the Hood of LLMs & Multi-Agent Scale.

Audience question: Which of the four customization artifacts changed Riley's output most visibly in your harness?

Response guidance: Use this question during the final 5 minutes of the mission block for the group debrief.

Payoff: Learners build and verify repository instructions, a custom agent, a skill, and path-scoped `applyTo` rules inside an observable agentic loop.

Sources: content/missions/agentic/agent-task.md
-->
