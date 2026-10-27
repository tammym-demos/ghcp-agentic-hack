---
theme: ghcp
title: "GitHub Copilot Foundations"
info: |
  First Day at the Accountable Engineering Bureau: onboarding to coding agent harnesses, built-in agents, slash commands, tools, skills, permissions, tokens, and usage controls.
layout: bureau-two-panel
defaults:
  class: bureau-slide
transition: slide-left
mdc: true
---

::title::
# GitHub Copilot Foundations
::text::

## Welcome to Your First Day at the Accountable Engineering Bureau

- **Agent Mergewell (he/him):** Senior human field investigator who sets the goal, inspects diffs, and owns every merge
- **Riley Relay (she/her):** Bounded software-agent collaborator who proposes plans, calls allowed tools, and returns evidence
- **Purrmission (he/him):** Sleek black cat boundary guardian—asleep on warm cushions when safe, paw on the key ring at boundaries
- **Chief Morgan Charter (she/her):** Bureau Director who connects GitHub AI Credits (AIC) to verified outcomes

<div class="workshop-cover-logos workshop-cover-logos--foundations" aria-label="GitHub and Microsoft">
  <img class="workshop-cover-logos__github" src="/images/GitHub_Lockup_Black_Clearspace.svg" alt="GitHub" />
  <img class="workshop-cover-logos__microsoft" src="/images/microsoft-logo.png" alt="Microsoft" />
</div>

::visual::
<img
  src="/images/purrmission-team-cover.png"
  alt="Agent Mergewell, Chief Morgan Charter, and Riley Relay welcoming new developers, with Purrmission, the black cat boundary guardian, standing in front"
/>

<!--
Timebox: 1 minute

Talk track: Welcome to your first day at the Accountable Engineering Bureau! Pretend you just graduated and joined our engineering team. You know how to write code, run tests, and use Git, and maybe in school you pasted code snippets into a web chatbot. Today, Agent Mergewell, Riley Relay, Purrmission—our sleek black cat boundary guardian—and Chief Morgan Charter are onboarding you to professional AI software engineering. Mergewell is human and owns every decision. Riley is our bounded software agent who executes steps and returns evidence. Purrmission sleeps on warm cushions when our setup is clean and plants his paw on the master key ring the moment we cross a boundary.

Transition: Let's look at our onboarding route for this morning.

Audience question: In one word, have you used coding agents never, occasionally, or daily?

Response guidance: Take a quick pulse of the room without long stories and reassure everyone that we start from the ground up.

Payoff: Learners meet the four-character cast and understand that human engineers remain accountable for every commit.

Sources: content/modules/01-foundations/module.md; content/characters/agent-mergewell/character.md
-->

---
layout: bureau-two-panel
---

::title::
# Session Agenda
::text::

- **1 · Harnesses, Tools & Safety Rings — 29 min:** What a harness is, supported GHCP harnesses, built-in agents, slash commands, tools, skills, and permissions
- **2 · Your First Bounded Loop — 18 min:** Guided `Ask -> Plan -> Agent` walkthrough with diff verification and `/rewind`
- **3 · Practical Tokens, Context & Usage Controls — 27 min:** GitHub AI Credits, the 4 token buckets, usage receipts, context rot, prefix caching, model routing, and `/limits`
- **4 · Mission Launch (`Case File Ω-1`) — 3 min + 45 min mission:** Operate your chosen harness, inspect context and usage, and enforce permissions

::visual::
<img src="/images/session-route.png" alt="Agent Mergewell and Purrmission following the onboarding route from harness anatomy to the first mission" />

<!--
Timebox: 1 minute

Talk track: Here is our onboarding route for Module 1. First, we spend 29 minutes opening the cockpit of a coding agent harness: which harnesses work with GitHub Copilot, what built-in agents and slash commands exist, how tools and skills work, and how permission levels protect your workspace. Second, we spend 18 minutes walking through one complete Ask, Plan, and Agent loop together. Third, we spend 27 minutes on practical tokens, GitHub AI Credits, context rot, keeping Purrmission asleep on warm cached cushions, and capping spend with slash commands. Then you take the wheel for a 45-minute hands-on mission.

Transition: Let's start with the rookie mistake almost everyone makes at 9:00 AM on Day One.

Audience question: Which of those four stops are you most curious to try hands-on today?

Response guidance: Give learners three seconds to pick a personal listening target and move directly into Slide 3.

Payoff: Learners see the exact 77-minute teaching and 45-minute mission structure.

Sources: content/modules/01-foundations/slide-manifest.md; content/modules/01-foundations/module.md
-->

---
layout: bureau-two-panel
---

::title::
# What Is a Coding Agent Harness?
::text::

- **The Rookie Mistake:** Typing *"Fix the bug"* into the biggest model with all tools unlocked burns 42 AI credits in 30 seconds—until Purrmission plants his paw on `Esc`
- **Brain in a Jar vs. Cockpit:** A raw LLM only reads tokens and predicts tokens; a **Harness** is the control cockpit surrounding the model
- **Ring 1 — Instructions:** Standing rules (`.github/copilot-instructions.md`, `applyTo`, `AGENTS.md`)
- **Ring 2 — Tools & MCP:** Mechanical levers the model can propose (`read_file`, `grep`, `terminal`, MCP)
- **Ring 3 — Execution Workspace:** The folder, branch, or isolated Git worktree
- **Ring 4 — Guardrails:** Permission gates, Content Exclusions, and `/limits` ceilings

::visual::
<HarnessRingsCockpit />

<!--
Timebox: 2 minutes

Talk track: Picture 9:00 AM on Day One. You get a starter ticket to fix a timestamp bug, type "Fix the bug," pick the biggest reasoning model, and hit Enter. Riley's purple temple light blinks, she reaches for twelve tools, and Chief Charter taps the wall gauge: forty-two AI credits gone and zero passing tests! Purrmission leaps onto the desk and plants his paw on Escape. Mergewell pulls down this blueprint: in school, you talked to a raw LLM in a browser tab—a brain in a jar. At the Bureau, we drive a Coding Agent Harness. Click Play on the cockpit diagram: Ring 1 feeds instructions, Ring 2 wires tools and MCP, Ring 3 bounds the workspace, and Ring 4 enforces Purrmission's permission and budget guardrails.

Transition: Now that you see the four rings, which harnesses actually work with GitHub Copilot?

Audience question: Before today, how would you have explained the difference between an AI model and the harness around it?

Response guidance: Highlight that a model name never grants file or terminal access—only the harness does.

Payoff: Learners can distinguish the LLM prediction engine from the four-ring Copilot harness that governs it.

Sources: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot
-->

---
layout: bureau-two-panel
---

::title::
# Harnesses That Work with GitHub Copilot
::text::

- **IDE Harnesses:** **VS Code** (flagship editor harness), **Visual Studio**, **JetBrains IDEs**, **Eclipse**, and **Xcode** for in-editor code surgery
- **Terminal Harness:** **GitHub Copilot CLI** (`copilot`) for shell-native investigation, commands, and scripted checks
- **Agent-Native Desktop Harness:** **GitHub Copilot App** with the GA **Customize** tab, canvases, parallel Git worktrees, and automations
- **Cloud & Mobile Harnesses:** **GitHub.com**, **Copilot Cloud Agent** (asynchronous repo sandbox), and **GitHub Mobile** (remote tracking & PR review)
- **Pick by task fit:** Match the harness to the context, tools, permissions, and evidence your task needs

::visual::
<img
  src="/images/copilot-surfaces-harness-choice-human-lock-v3.png"
  alt="Agent Mergewell comparing working harness paths with Riley Relay and Purrmission beside him"
/>

<!--
Timebox: 3 minutes

Talk track: Your GitHub Copilot subscription drives an entire fleet of harnesses across your workflow. In the IDE Bay, you have VS Code, Visual Studio, JetBrains IDEs, Eclipse, and Xcode right beside your active code. In the Terminal Trench, GitHub Copilot CLI runs directly in your shell. At the Command Desk, the standalone GitHub Copilot App gives you an agent-native desktop control center with its generally available Customize tab, plan and diff canvases, isolated Git worktrees, and scheduled automations. And in the Cloud Tower, GitHub.com, Copilot Cloud Agent, and GitHub Mobile let you delegate and review repository work asynchronously.

Transition: Once you pick a harness workstation, how does it know which files to send to Riley?

Audience question: Which two harnesses from this list do you expect to combine most often in your weekly work?

Response guidance: Common pairings are VS Code + Copilot CLI or VS Code + Cloud Agent/App. Note that all three hands-on mission routes are supported today.

Payoff: Learners can name every supported GitHub Copilot harness family and choose the right workstation for a task.

Sources: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot; https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available
-->

---
layout: bureau-two-panel
---

::title::
# Grounding the Harness: Context References vs. Files on Disk
::text::

- **Riley's Empty Tray Rule:** *Just because a file sits on your laptop does not mean the harness sent it to the model*
- **VS Code Grounding:** Attach exact context with `#file`, `#selection`, `#codebase`, or drag-and-drop into Chat
- **Copilot CLI Grounding:** Run `copilot` from the scoped project directory, name exact relative paths, and check `/context`
- **Copilot App Grounding:** Select the target repository/worktree and inspect attached files in the session canvas
- **Why precision wins:** Grounding the exact spec and target file avoids noisy guesses and lowers input token burn

::visual::
<TokenInputHandoffFlow />

<!--
Timebox: 2 minutes

Talk track: On your first try, you asked Riley why she ignored `timestamp-spec.md`. Riley held up an empty tray and said: "It was sitting on your hard drive, rookie—not in my request." Watch the seven cards cross the model boundary on the right: the harness assembles system instructions, your prompt, applicable repository instructions, explicitly selected files, conversation history, and tool results. If you don't reference `#file` or `#selection`—or allow a search tool to locate it—the model never sees it.

Transition: Once the harness has your grounded files, what built-in modes and agents can you use to act on them?

Audience question: What happens when a developer assumes Copilot "already read the whole repo" on turn one?

Response guidance: Confirm that the model guesses plausible-looking names and signatures that may not match your actual codebase.

Payoff: Learners distinguish file existence on disk from active context supplied across the model boundary.

Sources: https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode; https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management
-->

---
layout: bureau-two-panel
---

::title::
# Built-in Agents and Interaction Modes: Ask, Edit, Plan, and Agent
::text::

- **Inline Completions & Next Edit Suggestions (NES):** Fast flow-state completions as you type in the editor
- **Ask Mode:** Read-only Q&A, code explanation, and trade-off exploration without changing files
- **Plan Mode:** Builds a reviewable step-by-step plan, file impact list, and verification strategy before editing
- **Agent Mode:** Multi-step autonomous execution that invokes tools, edits files, runs tests, and iterates on errors
- **Built-in Subagents:** Specialized helpers inside the harness such as `explore` (fast read-only search), `task` (running tests/builds), `code-review`, and `security-review`

::visual::
<img src="/images/interaction-autonomy.png" alt="Agent Mergewell stepping across Ask, Plan, and Agent modes while Purrmission guards the escalation boundary" />

<!--
Timebox: 3 minutes

Talk track: Let's flip the mode switches on the dashboard. As you type code, Inline Completions and Next Edit Suggestions predict your next edit in milliseconds. When you open Chat or the CLI, you choose how much autonomy to grant. Ask mode keeps Riley's hands behind her back—she explains code and answers questions without touching files. Plan mode maps out the files, steps, and verification checks so you can approve the route before a single line changes. Agent mode lets Riley execute multi-step loops and call built-in subagents like `explore` for read-only lookups, `task` for test runs, `code-review`, and `security-review`.

Transition: To drive these modes quickly without hunting through menus, every Bureau engineer keeps the slash-command card on their desk.

Audience question: When you pick up an unfamiliar bug in a legacy module, why is starting in Ask or Plan faster than jumping straight to Agent?

Response guidance: Catching a wrong architectural assumption in a 5-line plan takes 15 seconds; untangling a 10-file Agent edit takes half an hour.

Payoff: Learners know the exact job of Inline/NES, Ask, Plan, Agent, and built-in subagents.

Sources: https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode; https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
-->

---
layout: bureau-single-panel
---

::title::
# Driving the Harness: Essential Slash Commands
::content::

| Category | Essential Slash Commands (CLI / VS Code / App) | What It Does in Your Workflow |
|---|---|---|
| **Context & Recovery** | `/context` · `/compact` · `/clear` (`/new`) · `/rewind` (`/undo`) | Inspect window occupancy, compress long history, start a clean slate, or roll back tracked Copilot file edits |
| **Setup & Guidance** | `/init` · `/instructions` · `/memory` | Bootstrap repository instructions, verify which instruction files actually loaded, or manage `on\|off\|show` memory |
| **Capabilities & Tooling** | `/skills` · `/agent` · `/mcp` · `/plugin` | Inspect or reload reusable skills (`SKILL.md`), switch custom agents, check MCP servers, or manage Agent Plugins 1.0 |
| **Models, Cost & Scale** | `/model` · `/usage` · `/limits` · `/chronicle` · `/fleet` · `/tasks` | Switch models (or discover local Ollama models), read session token totals, cap AI credits (`30+` min), or run parallel CLI subagents |
| **Pre-PR Security** | `/security-review` | Run a focused shift-left security audit on uncommitted or active branch changes before opening a pull request |

<!--
Timebox: 3 minutes

Talk track: Mergewell tapes this laminated Slash-Command Card to every new developer's monitor. You don't need to memorize every flag today, but you should know the five families. First, Context and Recovery: `/context` shows what is filling your window, `/compact` summarizes older turns, `/clear` or `/new` starts fresh, and `/rewind` (or `/undo` in CLI) rolls back tracked edits. Second, Setup and Guidance: `/init` drafts baseline repo instructions and `/instructions` proves what loaded. Third, Capabilities: `/skills`, `/agent`, `/mcp`, and `/plugin`. Fourth, Models, Cost, and Scale: `/model`, `/usage`, `/limits`, `/chronicle`, and `/fleet`. Fifth, `/security-review` before you push. Note that exact command availability varies slightly between CLI, VS Code, and the Copilot App—always check your host's command menu.

Transition: Let's zoom in on Ring 2 of the harness: what happens when Riley invokes a tool?

Audience question: Which two slash commands from this table are you going to try first when we open the mission?

Response guidance: `/context`, `/usage`, and `/limits` are great day-one habits to highlight.

Payoff: Learners have a structured mental map of the slash commands that control context, customization, cost, and security.

Sources: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference; https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands
-->

---
layout: bureau-two-panel
---

::title::
# Tools in the Harness: How Copilot Reads, Searches, and Acts
::text::

- **Model Proposes, Harness Executes:** Riley never touches your disk directly—she emits a structured tool-call request (`read_file`, `grep`, `edit`, `terminal`, or an **MCP** tool), and the **Harness** executes it
- **Tool Output Enters Context:** Whatever a tool returns (file contents, search hits, test logs) is appended into your context window for the next turn
- **The Hidden Schema Tax:** Every enabled tool injects its JSON parameter schema into the prompt prefix—enabling 45 unused MCP tools can crowd 30%+ of your context window before you type a word!
- **Keep tool sets lean:** Enable only the tools your current workflow needs

::visual::
<ToolCallWorkbenchFlow />

<!--
Timebox: 3 minutes

Talk track: Let's look closely at how a coding agent actually interacts with your computer. Riley never reaches through the screen to touch your hard drive. Instead, as shown in our interactive workbench flow on the right, Riley proposes a structured JSON tool call—like running `grep` for `formatTimestamp`. Purrmission checks whether that tool is permitted, the Harness executes the command on your workspace, and the 12-line result is appended back into the context window. Now click the toggle button at the top of the diagram to switch from 5 Core Tools to 45 MCP Tools: watch the purple Tool Schemas bar balloon to 32% of the context window! Every enabled tool sends its JSON definition on every turn, so prune unused tools to save space and AI credits.

Transition: Besides built-in tools, how do we customize the harness with our team's own rules, skills, and specialist agents?

Audience question: Have you ever enabled several MCP servers at once and noticed your context window filling up faster than expected?

Response guidance: Point out that `/context` and tool-picker checkboxes let you disable heavy MCP servers when you aren't using them.

Payoff: Learners understand the `propose -> check -> execute -> append` tool loop and why tool-schema bloat taxes the context window.

Sources: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage; https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode
-->

---
layout: bureau-two-panel
---

::title::
# Customizing the Harness: Instructions, Skills, Custom Agents, and Plugins
::text::

- **1 · Custom Instructions (`.github/copilot-instructions.md`, `applyTo`, `AGENTS.md`):** Standing coding standards, build commands, and architecture rules loaded automatically by scope
- **2 · Reusable Skills (`SKILL.md`):** Mergewell's deployable wrist gadgets—self-contained procedural workflows and scripts that load **on demand** only when invoked
- **3 · Custom Agents (`.agent.md`):** Specialist role personas (e.g., *Planner*, *Test Engineer*, *Security Reviewer*) with explicit minimal `tools:` allowlists
- **4 · Hooks & Agent Plugins 1.0 (GA):** Deterministic pre/post execution scripts (`.github/hooks/*.json`) and portable plugin bundles across VS Code, CLI, and Copilot App

::visual::
<img src="/images/copilot-harness.png" alt="Agent Mergewell inspecting the modular customization slots on the Copilot harness workbench" />

<!--
Timebox: 3 minutes

Talk track: In Module 2 we will build these across the SDLC, but every new Bureau engineer needs to know what the four customization slots are. First, Custom Instructions are your standing house rules—either repo-wide in `.github/copilot-instructions.md` and `AGENTS.md`, or targeted to specific folders using `applyTo` globs. Second, Reusable Skills (`SKILL.md`) work like Mergewell's mechanical wrist gadgets: instead of stuffing a 500-line release procedure into every prompt, a skill stays folded away and loads its instructions and scripts only when the task calls for it. Third, Custom Agents (`.agent.md`) define specialist roles with restricted tool lists. Fourth, Hooks and Agent Plugins 1.0 bundle skills, MCP servers, and deterministic guardrails portably across VS Code, CLI, and the Copilot App.

Transition: With all those tools and customizations available, how do we stop an agent from running a dangerous command?

Audience question: Why is it better to put a specialized 300-line checklist inside a `SKILL.md` file rather than inside `.github/copilot-instructions.md`?

Response guidance: `.github/copilot-instructions.md` is sent on every turn, whereas a Skill's body only loads when that specific workflow is invoked.

Payoff: Learners can distinguish instructions, on-demand skills, custom agents, hooks, and plugins.

Sources: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills; https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app
-->

---
layout: bureau-two-panel
---

::title::
# Permission Levels and Approval Boundaries
::text::

- **Purrmission's Paw on the Key Ring:** `Mode != Tool Permission`—switching modes is not the same as restricting what tools are allowed to run
- **Prose Is Not Enforcement:** Writing *"Do not run terminal commands or edit billing files"* in a prompt does **not** remove write or shell capability if those tools remain enabled and auto-approved
- **Permission Levels Across Harnesses:**
  - **Interactive / Default:** Prompts for human confirmation before consequential edits, shell commands, or external network calls
  - **Assisted / Scoped Allowlists:** Auto-approves safe read/test actions while gating destructive or out-of-folder operations
  - **Autopilot:** Autonomous multi-step execution—use only inside an isolated folder, worktree, or sandbox with a known undo path

::visual::
<img src="/images/least-privilege-key.png" alt="Purrmission holding his paw over the brass master key ring while Agent Mergewell selects a single least-privilege key" />

<!--
Timebox: 3 minutes

Talk track: Here is where Purrmission earns his keep. On Day One, every rookie says: "I'll just put the harness in Autopilot and write in my prompt: 'Please do not run destructive commands.'" Purrmission's ears flatten and his paw goes straight onto the brass key ring. Why? Because polite words in a prompt are not a security boundary! If a terminal tool or file-write tool is enabled and auto-approved, the model can still propose calling it. Know your harness permission levels—Interactive/Default, Assisted with scoped tool allowlists, and Autopilot—and only grant Autopilot when your workspace is isolated and your rollback path is tested.

Transition: What about sensitive company files that shouldn't leave the machine at all?

Audience question: What is one action you should never allow an agent to run without an explicit human confirmation prompt?

Response guidance: Force-pushes, production database commands, credential/env reads, package installs, and deleting untracked work are classic examples.

Payoff: Learners separate conversational prompts and interaction modes from enforced tool permissions and approval levels.

Sources: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools; https://code.visualstudio.com/docs/agents/run/approvals
-->

---
layout: bureau-two-panel
---

::title::
# Enterprise Data Boundaries and Content Exclusions
::text::

- **Capability vs. Policy:** What Copilot *can* do technically is not the same as what your organization's policy allows
- **Content Exclusions (Surface-Specific):**
  - **Generally Available:** Enforced in **GitHub Copilot CLI** and the **GitHub Copilot App** (and IDE inline completions/chat) for Business & Enterprise
  - **Important Limitation:** Content exclusions are **not enforced in VS Code Agent or Edit modes** (and local terminal tools can still read disk files unless sandboxed)
- **Model Data Policies:** Check your organization's approved model list and vendor retention policies before sending workplace data
- **When in doubt:** Keep secrets, customer PII, and production credentials out of the workspace

::visual::
<img src="/images/enterprise-boundaries.png" alt="Agent Mergewell and Purrmission inspecting the enterprise policy archway and surface boundaries" />

<!--
Timebox: 3 minutes

Talk track: Before we run our first loop, look at the Bureau's enterprise archway. Administrator Content Exclusions let organizations block specified files or paths from being sent to Copilot. As of September 2026, Content Exclusions are generally available in the GitHub Copilot App and Copilot CLI. However, GitHub documentation explicitly notes that Content Exclusions do not apply in VS Code Agent or Edit modes, and they are not an operating-system filesystem sandbox. Never rely on exclusion rules alone to hide live secrets in an active Agent workspace.

Transition: That brings us to Purrmission's Golden Rule before we start our 18-minute hands-on walkthrough.

Audience question: Why is a repository content-exclusion rule different from an OS-level container or sandbox?

Response guidance: If an agent has an active shell tool in your local terminal, a command like `cat` or a test script can still access local files on disk.

Payoff: Learners know where Content Exclusions apply (CLI/App GA) and where they do not (VS Code Agent/Edit modes).

Sources: https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion; https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli
-->

---
layout: bureau-two-panel
---

::title::
# Human Accountability: Polite Words Are Not Evidence
::text::

- **Purrmission's First Law:** *Polite, confident prose from an AI model is never proof that code is correct, secure, or complete*
- **Inspect the Artifact, Not the Summary:** Always verify the actual `git diff`, compiler/linter output, and test execution results
- **You Sign the Commit:** Whether Copilot wrote 1 line or 100 lines, the human developer and human reviewer own quality, security, licensing, and acceptance

::visual::
<img src="/images/human-accountability.png" alt="Agent Mergewell reviewing a physical diff checklist while Purrmission sits beside the verification stamp" />

<!--
Timebox: 2 minutes

Talk track: Look at the plaque above Mergewell's desk: Polite words are not evidence. Riley is earnest and articulate—she will happily tell you "All edge cases are handled!" even when the code doesn't compile. Never treat model confidence as verification. You read the diff, you run the check, and you own the commit.

Transition: Let's put all twelve of these onboarding concepts together in one 18-minute guided loop.

Audience question: What is the minimum evidence you require before committing code that Copilot helped write?

Response guidance: Reading every line of the diff and running the relevant test or build check locally.

Payoff: Learners anchor on human accountability before starting the guided practice loop.

Sources: content/modules/01-foundations/module.md; content/characters/agent-mergewell/character.md
-->

---
layout: bureau-two-panel
---

::title::
# Hands-On Walkthrough: Ask -> Plan -> Agent in One Bounded Loop
::text::

- **Step 1 · Ask (Understand without touching files — 4 min):**
  - Ground `#file:status-formatter.ts` and ask Riley to explain the timestamp bug and identify edge cases
- **Step 2 · Plan (Review scope & checks before editing — 5 min):**
  - Switch to **Plan** mode: confirm only `status-formatter.ts` and `status-formatter.test.ts` are in scope, with one failing test case
- **Step 3 · Agent (Constrained execution & diff check — 6 min):**
  - Run in **Agent** mode with interactive approvals; inspect the diff and run the test check
- **Step 4 · Rewind & Recovery Check (3 min):**
  - Practice rolling back with `/rewind` (`/undo` in CLI) or `git restore` so you never fear experimenting

::visual::
<img src="/images/cli-controlled-action.png" alt="Agent Mergewell and Purrmission reviewing a controlled terminal action at the workbench" />

<!--
Timebox: 18 minutes

Talk track: Now let's run the timestamp starter ticket properly together. Follow along in VS Code, Copilot CLI, or the Copilot App. First, we spend four minutes in Ask mode grounding the target file and asking what is broken without modifying a single byte. Second, we spend five minutes in Plan mode reviewing the proposed sequence: which files will change, which files are off-limits, and how we will verify the fix. Third, we spend six minutes in Agent mode: watch Riley propose the edit and test run, read the diff before accepting, and verify the test passes. Finally, we spend three minutes testing our emergency brake—running `/rewind` in CLI/VS Code or `git restore`—so everyone in the room knows how to undo an agent change cleanly.

Transition: That loop was clean and fast. Now Chief Charter walks over with the clipboard: how much did that loop cost in tokens and GitHub AI Credits?

Audience question: What difference did you notice between the plan Riley produced in Step 2 and the changes she executed in Step 3?

Response guidance: Have one or two learners share how reviewing the Plan first prevented an unnecessary file edit.

Payoff: Every learner has rehearsed the core `Ask -> Plan -> Agent -> Verify -> Rewind` operating loop.

Sources: https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode; https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/roll-back-changes
-->

---
layout: bureau-two-panel
---

::title::
# Why Tokens Matter: GitHub AI Credits
::text::

- **The Formula:** `Model Rate × Tokens (Input + Cached + Output) → GitHub AI Credits (AIC)`
- **What Consumes AI Credits:** Chat, Agent mode, Copilot CLI, Copilot App sessions, Cloud Agent, and Copilot Code Review
- **Included on Paid Plans (No AIC Burn):** Inline code completions and Next Edit Suggestions (NES)
- **Separate Meters:** **GitHub AI Credits** measure model token usage; **GitHub Actions minutes** measure CI/CD compute (e.g., Code Review uses both meters separately)

::visual::
<img src="/images/token-opening-chief-v1.png" alt="Chief Morgan Charter presenting the GitHub AI Credits meter and outcome lens" />

<!--
Timebox: 3 minutes

Talk track: Chief Morgan Charter steps up to the desk. "Great fix, rookie," she says, "now let's understand the meter." GitHub Copilot usage is measured in GitHub AI Credits—or AI credits for short. Unlike older request-count labels that some legacy annual plans still display, AI credits are calculated from the model you choose times the tokens you use. On paid plans, everyday inline code completions and Next Edit Suggestions do not consume AI credits. Chat, CLI, App sessions, Cloud Agent, and Code Review do. And keep your meters straight: AI credits pay for model tokens, while GitHub Actions minutes pay for runner compute.

Transition: To control AI credits, you need to know the four token buckets that show up on every request.

Audience question: Which daily coding tasks can you do with zero AI credit burn on a paid plan?

Response guidance: Inline completions and Next Edit Suggestions (NES) in the editor.

Payoff: Learners understand how tokens convert to GitHub AI Credits and which features are metered.

Sources: https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing; https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals
-->

---
layout: bureau-two-panel
---

::title::
# What Enters a Request and What Comes Back: The 4 Token Buckets
::text::

- **1 · Input Tokens:** Fresh text sent to the model this turn (system prompt, instructions, attached files, tool schemas, new prompt)
- **2 · Cached Input Tokens:** Identical beginning of the prompt reused from an earlier turn at a steep discount
- **3 · Output Tokens:** Everything the model generates back—both **visible reply text** and **non-visible tool-call JSON**
- **4 · Reasoning Tokens (Inside Output):** Internal chain-of-thought tokens used by reasoning models—already counted *inside* reported output tokens (never double-add `Output + Reasoning`!)

::visual::
<TokenFlowAnimation />

<!--
Timebox: 3 minutes

Talk track: Watch the accounting flow on the right. Every interaction involves four token buckets. First, Input tokens: the fresh context assembled by the harness. Second, Cached input tokens: the unchanged prefix reused from your previous turn. Third, Output tokens: everything the model generates. And fourth, Reasoning tokens: when a reasoning model thinks through a problem or formats hidden tool calls, those tokens count inside generated output. That's why a three-line visible reply can still report 500 output tokens on your receipt! And remember: reported reasoning is a subset of output, so never add 500 + 100 together.

Transition: Let's read an actual usage receipt across three turns of a conversation.

Audience question: Why can a very short one-sentence reply in Agent mode still report hundreds of output tokens?

Response guidance: Because internal reasoning tokens and structured JSON tool-call arguments count as generated output.

Payoff: Learners can explain all four token buckets and avoid double-counting reasoning tokens.

Sources: https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing; https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: bureau-single-panel
---

::title::
# Read the Usage Receipt
::content::

| Token Category (Illustrative CLI / Footer Receipt) | Turn 1 (Cold Start) | Turn 2 (Same Setup, Next Step) | Session Total | What It Tells You |
|---|---:|---:|---:|---|
| **New input tokens** | `2,000` | `4,000` | `6,000` | Only the new prompt + new tool output added in Turn 2 |
| **Reused (cached) input tokens** | `0` | `8,000` | `8,000` | Shared system/instruction/tool prefix reused at a lower rate! |
| **Cache write (where reported)** | `8,000` | `0` | `8,000` | Turn 1 established the reusable prefix |
| **Total input tokens** | `10,000` | `12,000` | `22,000` | `New + Reused (+ Cache write)` |
| **Generated output tokens** | `500` | `600` | `1,100` | Visible reply + tool calls + reasoning |
| **Reported reasoning (inside output)** | `100` | `150` | `250` | Subset of output (`100` is inside the `500`, not extra) |

- **Where to inspect:** VS Code Chat response footer (hover for per-model breakdown), Copilot CLI `/usage`, and GitHub Settings → Copilot Usage

<!--
Timebox: 3 minutes

Talk track: Let's read this receipt together like Bureau detectives. On Turn 1, the harness sends 10,000 total input tokens (8,000 of system prompt, instructions, and tool schemas written to the cache, plus 2,000 for your task). On Turn 2, you ask a follow-up question in the same session without changing your model or tools. Look at Row 2: 8,000 tokens are reused from the cache! You only pay full input rates on the 4,000 new tokens. You can inspect these numbers live in the VS Code response footer, by running `/usage` in Copilot CLI, or in your GitHub account settings.

Transition: What happens if you keep piling turns into that same session all afternoon? Let's watch the Context Funnel.

Audience question: Looking at Turn 2 in the table, how many total input tokens entered the model, and how many were reused from the cache?

Response guidance: 12,000 total input tokens entered on Turn 2, and 8,000 of them were reused from the cache.

Payoff: Learners can read a multi-turn token receipt and verify cache reuse in CLI and VS Code.

Sources: https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases; https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
-->

---
layout: bureau-single-panel
---

::title::
# Context Window Competition and Context Rot
::content::

<SlideCanvas :width="960" :height="540">
  <ManufacturingContextFunnel embedded />
</SlideCanvas>

<!--
Timebox: 4 minutes

Talk track: Press Play on the Context Window Funnel. Every model has a finite context window, and six things compete for that space: system prompt, custom instructions, referenced files, tool definitions and results, prior conversation history, and the dashed band at the top—protected output headroom so the model has room to think and write its answer. Click through the beats: as user prompts pile up turn after turn, the vessel fills. Before you even hit 100% capacity, you start seeing "Context Rot"—Riley contradicts earlier answers, forgets constraints you set an hour ago, or brings back a bug you already fixed. And every extra turn carries all that stale history as paid input! When you trigger `/compact` on the final beat, the harness summarizes earlier turns to free up room—but you must always check that your core constraints survived compaction.

Transition: Let's pair that funnel with Purrmission's favorite cushion stack to see how to keep context lean and the cache warm.

Audience question: Which signal of Context Rot do you notice first in your own long chat sessions—forgotten rules, repeated bugs, or slower responses?

Response guidance: Acknowledge their examples and reinforce the rule: when you spot rot, stop correcting in the same thread and either `/compact` or start `/new`.

Payoff: Learners see how the context window fills, why output headroom matters, and how `/compact` frees space.

Sources: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management; https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: bureau-two-panel
---

::title::
# Keep Context Lean and Protect the Cache
::text::

- **When to `/new` or `/clear`:** Start a fresh session whenever you switch to an unrelated ticket or finish a bounded milestone
- **When to `/compact`:** Compress history during a long multi-step task in VS Code, CLI, or App—then re-verify your active constraints
- **How to Keep Purrmission Asleep on Warm Cushions (Cache Hits):**
  - Keep your **model**, **system/repo instructions**, and **enabled tool set** stable within a task so the shared prompt prefix is reused
- **What Startles Purrmission Awake (Cache Breaks):**
  - Swapping models every turn, toggling MCP servers mid-task, or editing top-level instructions mid-session invalidates the cached prefix

::visual::
<img src="/images/token-cache-purrmission-v1.png" alt="Purrmission curled asleep on a warm stack of cushions on the left, and startled wide awake when the cushion stack is disrupted on the right" />

<!--
Timebox: 4 minutes

Talk track: Look at Purrmission on the right. On the left half of the illustration, he is curled up fast asleep on a warm stack of cushions. Why? Because while you work through a five-step ticket, you kept your model, your instructions, and your tools steady—so every turn hits the warm prompt cache! On the right half, someone swapped models and toggled three MCP servers in the middle of Turn 3. Purrmission bolts upright, wide awake! In Module 3 we will open the transformer engine to see the exact Key-Value math behind this, but the day-one habit is simple: start `/new` between unrelated tasks, use `/compact` when history grows long, and don't churn your model or tool setup mid-task.

Transition: Speaking of models—how should a developer choose between Auto, lightweight models, and heavy reasoning models?

Audience question: Why does starting a fresh chat session when you move from a CSS bug to a database migration save both AI credits and rework?

Response guidance: Carrying 20 turns of CSS history into a database task bills you for irrelevant input tokens on every turn and distracts attention.

Payoff: Learners know when to `/new`, when to `/compact`, and how to keep the prompt prefix cache warm.

Sources: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: bureau-two-panel
---

::title::
# Right Model, Right Task: Auto, Lightweight Models, and Reasoning Effort
::text::

- **Start with `Auto` Model Selection:** Routes by task complexity and availability, respects natural cache boundaries, and includes a **10% AI credit discount** on paid plans in supported surfaces
- **Use Lightweight Models for Fast/Subagent Work:** **`Claude Haiku 5.5` (GA)** delivers fast, low-cost execution for quick edits, terminal lookups, and subagent delegation
- **Right-Size Reasoning Effort:** Keep reasoning at **Regular** by default; step up to **High** reasoning or deep models only for complex architecture or multi-file root-cause debugging
- **Write a Conditional Routing Rule:** Switch models when a concrete task requirement or observed failure demands it—not by reflex

::visual::
<img src="/images/token-model-mergewell-v1.png" alt="Agent Mergewell standing at a three-lane routing junction comparing lightweight, Auto, and deep-reasoning lanes" />

<!--
Timebox: 4 minutes

Talk track: Mergewell stands at the three-lane junction. On Day One at 9:00 AM, our rookie picked the heaviest, most expensive reasoning model just to fix a timestamp string. Here is the Bureau's routing rule: default to `Auto` for everyday flow—it routes by task complexity, respects cache boundaries, and gives a documented 10% discount on paid plans in supported surfaces. When you are running quick terminal lookups, small edits, or subagents, pick a fast lightweight model like `Claude Haiku 5.5` (generally available in October 2026). Save high-reasoning effort and frontier deep-debugging models for genuinely gnarly cross-file architecture or root-cause analysis.

Transition: Even with smart model routing, how do you make sure a runaway agent loop never blows your credit budget?

Audience question: What is an example of a task where `Claude Haiku 5.5` or `Auto` is a better fit than a high-effort reasoning model?

Response guidance: Formatting, boilerplate generation, test runner execution, codebase grep/exploration, and straightforward bug fixes.

Payoff: Learners can match task complexity and reasoning effort to `Auto`, lightweight models, and deep-reasoning models.

Sources: https://docs.github.com/en/copilot/concepts/models/auto-model-selection; https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/
-->

---
layout: bureau-two-panel
---

::title::
# Measure and Cap: Session Limits, Chronicle, and Usage Views
::text::

- **Cap CLI Sessions with `/limits`:**
  - Run `/limits set <number>` or launch with `copilot --max-ai-credits <number>` (public preview, **minimum 30 AI credits**)
  - Acts as a **soft session ceiling** (including subagents and compaction); an in-progress response can finish slightly above the cap
- **Learn from `/chronicle`:** Use Copilot CLI `/chronicle` to review your recent session patterns and get actionable cost-efficiency tips
- **Monitor Account Usage:** Check the VS Code response footer, CLI `/usage`, and GitHub Settings → Copilot **Usage** view

::visual::
<img src="/images/token-measure-riley-v1.png" alt="Riley Relay holding a simple dial gauge with a clear stop-hand boundary marker" />

<!--
Timebox: 3 minutes

Talk track: Look at Riley holding the dial gauge. If you are delegating a multi-step job in Copilot CLI, you can put a guardrail on the meter before you start: run `/limits set` or pass `--max-ai-credits` with at least 30 AI credits. That sets a soft ceiling for the session, counting main turns, subagents, and compaction. Why "soft"? Because if a response is already streaming when you cross 30, the harness lets that turn finish cleanly rather than cutting off mid-file, then pauses before the next request. Pair `/limits` with `/chronicle` in the CLI to get personalized tips from your own work history.

Transition: Let's summarize all of Module 1 into the ten daily habits card on your Bureau desk.

Audience question: Why is `/limits set` documented as a soft session limit rather than a hard mid-token cutoff?

Response guidance: Aborting a file edit mid-response would leave broken syntax on disk and waste the credits already spent on that turn.

Payoff: Learners know how to set CLI AI credit limits (`30+` min), inspect `/chronicle`, and monitor usage views.

Sources: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit; https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage
-->

---
layout: bureau-single-panel
---

::title::
# Ten Daily Habits for New Agent Engineers
::content::

1. **Pick the right harness workstation** (VS Code, CLI, App, or Cloud) for the task's context and tools.
2. **Ground files deliberately** (`#file`, `#selection`, explicit paths)—never assume a file on disk is in context.
3. **Prune unused MCP and tool sets** so tool JSON schemas don't crowd your context window.
4. **Enforce `Mode != Permission`**—use tool allowlists and interactive approvals, not polite prose rules.
5. **Work as `Ask -> Plan -> Agent`** for non-trivial changes, and verify the diff + test output before accepting.
6. **Start `/new` at task boundaries** so yesterday's CSS bug doesn't ride along into today's API fix.
7. **Use `/compact` when a thread grows long**, then verify your core constraints survived.
8. **Keep Purrmission asleep on warm cushions**—avoid mid-task model, instruction, or tool churn that breaks the prefix cache.
9. **Default to `Auto` (10% discount) or `Claude Haiku 5.5`** with regular reasoning; escalate model/effort only when needed.
10. **Measure and cap** with `/usage`, `/limits set` (`30+` AIC), `/chronicle`, and the VS Code usage footer.

<!--
Timebox: 3 minutes

Talk track: Here is your ten-point Bureau desk card. Take thirty seconds to scan all ten habits and pick the two that will make the biggest difference in your workflow next Monday. Notice how every habit connects quality and cost: grounding the right file, pruning unused tools, planning before editing, and keeping the prefix cache warm all produce better code *and* lower AI credit burn at the same time.

Transition: Now let's set up your local case folder for `Case File Ω-1`.

Audience question: Which number on this list (1 through 10) is going to be your #1 habit during the mission?

Response guidance: Poll a few numbers quickly from the room to build energy before the mission.

Payoff: Learners consolidate the entire Foundations module into ten concrete, repeatable habits.

Sources: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
-->

---
layout: bureau-two-panel
---

::title::
# Preparing Your Case Folder and Harness
::text::

- **Choose Your Primary Harness:** VS Code, GitHub Copilot CLI, or the GitHub Copilot App
- **Create Your Isolated Workspace:** Make a fresh folder named `copilot-case-file` on your machine (outside any production or customer repo)
- **How Scoring Works:**
  - **6 Core Experiments = 50 points** (`40 points` completes the mission)
  - **2 Bonus Challenges = up to +10 points** (capped at 10; hints never deduct points)
- **Carry-Forward Evidence:** Keep your `case-notes.md` and exported case file for Module 2!

::visual::
<img src="/images/mission-readiness.png" alt="Agent Mergewell handing the Case File Omega-1 dossier to the new developer while Purrmission checks the workspace boundary" />

<!--
Timebox: 3 minutes

Talk track: You are officially ready for your first solo investigation: Case File Omega-1. You only need one harness—VS Code, Copilot CLI, or the Copilot App—and an empty folder named `copilot-case-file` on your own machine. Every experiment has step-by-step harness routes, an observable verification check, and no-penalty hints if you get stuck.

Transition: Let's do a quick 60-second live look at the harness before starting the clock.

Audience question: Does everyone have VS Code, Copilot CLI, or the Copilot App open and ready?

Response guidance: Confirm everyone has at least one harness ready; point anyone needing setup help to the harness startup instructions on the mission page.

Payoff: Learners know how to set up their safe `copilot-case-file` folder and how mission scoring works.

Sources: content/missions/foundations/context-and-prompts.md
-->

---
layout: bureau-single-panel
---

::title::
# Demo!
::content::

<div style="display:grid;place-items:center;height:320px;text-align:center">
  <div>
    <p style="font-size:1.6rem;font-weight:800;color:#6639ba;margin-bottom:0.5rem">Live Cockpit Check</p>
    <p style="font-size:1.15rem;color:#57606a">Grounding with <code>#file</code> · Checking <code>/context</code> &amp; <code>/usage</code> · Running <code>Ask → Plan → Agent</code></p>
  </div>
</div>

<!--
Timebox: 0 minutes

Talk track: Quick visual check on my screen so you can see where the buttons live: here is `#file` grounding, here is `/context` and `/usage`, and here is the Ask, Plan, and Agent switcher.

Transition: Let's launch the mission clock!

Audience question: Ready to open Case File Omega-1?

Response guidance: Move immediately to Slide 24 and start the 45-minute timer.

Payoff: Learners have visual orientation for the mission UI controls.

Sources: content/modules/01-foundations/module.md
-->

---
layout: bureau-two-panel
---

::title::
# Your Mission Starts Now: Context, Cost & Control
::text::

- **Open the Portal Mission Page:** `Foundations Mission: Context, Cost & Control` (`45 minutes`)
- **6 Core Experiments (50 pts):**
  1. Pick your harness & create `copilot-case-file/case-notes.md` (`5 pts`)
  2. Compare a vague prompt vs. a specific grounded prompt (`10 pts`)
  3. Inspect active context (`/context` / References) vs. excluded files (`10 pts`)
  4. Ground one file deliberately (`#file` / path) and prove inclusion (`5 pts`)
  5. Read your AI Credits receipt (`/usage` / footer), test a second model, and write a switching rule (`10 pts`)
  6. Run the same job interactively and unattended, test undo (`/rewind`), and record your boundary (`10 pts`)

::visual::
<img src="/images/mission-readiness.png" alt="Agent Mergewell and Purrmission launching the 45-minute Foundations mission" />

<!--
Timebox: 45 minutes

Talk track: Your 45-minute mission starts now! Open the Foundations Mission page in the workshop portal, pick your harness button at the top so the exact mechanical steps appear for your tool, and work through the six experiments. Purrmission and I will circulate the room—use the hints freely, check off each clue as you verify the outcome, and export your case file when you hit 40+ core points!

Transition: After the mission debrief and break, we will reconvene for Module 2: Agentic Development Across the SDLC.

Audience question: Which harness did you pick for Experiment 1, and what was the most surprising thing you saw in `/context` or `/usage`?

Response guidance: Use this question during the final 5 minutes of the 45-minute block for a crisp group debrief.

Payoff: Learners complete six hands-on experiments proving they can operate the harness, control context and cost, and enforce permissions.

Sources: content/missions/foundations/context-and-prompts.md
-->
