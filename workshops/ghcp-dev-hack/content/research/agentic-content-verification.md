# Agentic Content Verification

## Scoped incorporated correction — 2026-09-07

For the approved Agentic request/activation scenes and A07 source adjacency,
`content/modules/02-agentic/context-caching-source.md` and the September 7
`content/production/context-caching-proposal/source-verification.md` C5/C6,
X4/X6/X7/X9 govern over older wording below. Neither Markdown instruction
filename is deprecated by the other. CLI combines applicable instructions
without a general precedence order; a nearest-AGENTS convention is not a
universal host hierarchy. Discovery, applicability, enabled state, actual
inclusion and result compliance are separate checks. Skill reload is not
instruction-session refresh; installed-host edit activation is unverified.

- **Initiative:** `agentic-module-development`
- **Review date:** 2026-08-10
- **Status:** Official-source verification complete for native draft authoring,
  the proposed slide-15 security replacement, and the approved slide-20 mobile
  concept
- **Intended use:** Source gate for volatile product claims in the approved
  25-topic Agentic module contract.
- **Approval boundary:** This artifact records evidence; it does **not** approve
  slides, notes, manifests, module changes, labs, missions, media, prompts,
  publication, paid actions, or deployment. Draft authorization and every later
  production gate remain separate.
- **Scope:** Public GitHub Docs and GitHub Changelog only. GitHub Enterprise
  Cloud is treated as a developer repository surface; organization and
  enterprise administration are caveats, not workshop procedures.

## Claim matrix

`Safe-with-caveat` means the stated claim may be drafted only with the caveat in
the same row. `Blocked-pending-verification` records wording that must not enter
the draft.

| ID | Topic(s) | Verified claim | Authoritative source title and canonical URL | Reviewed | Availability / surface | Caveats | Disposition |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AGT-01 | Custom instructions | GitHub documents repository-wide `.github/copilot-instructions.md`, path-specific `.github/instructions/**/*.instructions.md`, and agent instruction files. Repository-wide and matching path-specific instructions can both apply. | [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions); [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support) | 2026-08-09 | GitHub.com, supported IDEs, Copilot CLI, cloud agent, and code review; exact file support varies by feature and host. | GitHub.com cloud agent supports repository, path-specific, and agent instructions. Code review and IDE support are not identical. | safe-with-caveat |
| AGT-02 | Instruction layering | GitHub.com Copilot Chat documents a scoped precedence order; Copilot CLI instead combines applicable instruction files and explicitly defines no general precedence among them. The nearest applicable `AGENTS.md` has documented precedence within that file family. | [About customizing GitHub Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization); [Adding custom instructions for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) | 2026-08-09 | GitHub.com Chat and Copilot CLI. | Teach precedence only for the named surface. Conflicting instructions should be exposed and reconciled rather than guessed. | safe-with-caveat |
| AGT-03 | Instruction hierarchy | No official source reviewed establishes one universal task → path → repository → agent → environment hierarchy across GitHub.com, IDEs, CLI, code review, and cloud agent. | [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support) | 2026-08-09 | Cross-surface claim. | A universal hierarchy graphic or narration would overgeneralize host-specific behavior. | blocked-pending-verification |
| AGT-04 | Memory | The named feature is **GitHub Copilot Memory**. In public preview, it stores repository-level facts and user-level preferences; repository facts stay in one repository, while user preferences follow the same user across repositories. Supported consumers are cloud agent, Copilot code review, and Copilot CLI. | [About GitHub Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory); [Managing Copilot Memory for your personal account](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory/manage-for-yourself) | 2026-08-09 | All paid Copilot plans; enabled by default for paid individual plans. Managed plans require policy enablement and allow individual opt-out. | Code review uses repository facts only. Entries unused for 28 days are deleted; successful validation/use may reset the timer. Users can view/delete preferences, and repository owners can review/delete repository facts. | safe-with-caveat |
| AGT-05 | Memory limits | The sources do not support describing Copilot Memory as permanent, complete, guaranteed to be recalled, a transcript, or a replacement for task context and reviewed instructions. | [About GitHub Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) | 2026-08-09 | Cross-surface wording. | Memory is selective, relevance-based, preview, and retention-limited. Any “Copilot remembers everything forever” claim is blocked. | blocked-pending-verification |
| AGT-06 | Long-running context | Copilot CLI documents `/context` and `/compact`; its automatic compaction begins near 80% and it may pause near 95%. VS Code also documents automatic compaction and manual `/compact` or Compact Conversation in supported local, background and Claude agent sessions. Check the host/version and verify needed facts after compaction; a summary may lose fine detail. | [Managing context in GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management); `content/production/context-caching-proposal/source-verification.md` S2/P13a/X4 | 2026-09-07 | CLI and named supported VS Code session types; not identical controls. | Approximate 80%/95% thresholds and CLI checkpoints remain CLI-specific. Installed-host behavior is not tested here. | safe-with-caveat |
| AGT-07 | Fresh sessions and surface differences | GitHub recommends a fresh conversation for unrelated work and a focused handoff when accumulated context is no longer useful. CLI supports `/new`, `/clear`, `/compact`, and `/resume`; cloud work uses a separate GitHub-hosted session; IDE controls differ. | [Managing context in GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management); [Optimizing your AI usage to maximize efficiency and reduce cost](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage); [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) | 2026-08-09 | CLI, IDE chat, and GitHub.com/cloud are distinct surfaces. | A fresh session does not automatically carry every prior detail. Supply the goal, references, boundaries, current repository state, and checks again. | safe-with-caveat |
| AGT-08 | Strong prompts | Official guidance supports a clear outcome, relevant context, explicit constraints, acceptance criteria or done condition, and task decomposition. Cloud-agent guidance also recommends well-scoped tasks, tests, and iterative feedback. | [Prompt engineering for GitHub Copilot](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering); [Best practices for using GitHub Copilot to work on tasks](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results); [Optimizing your AI usage to maximize efficiency and reduce cost](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage) | 2026-08-09 | General Copilot guidance plus cloud-agent-specific guidance. | “Non-goals,” evidence requirements, and stop conditions are defensible workshop refinements, not universal product fields. | safe-for-draft |
| AGT-09 | Agent skills | Agent skills are folders of instructions, scripts, and resources loaded when relevant for specialized, repeatable tasks. Project skills can live in `.github/skills`, `.claude/skills`, or `.agents/skills`; personal skills have documented home-directory locations. | [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | 2026-08-09 | Cloud agent, code review, Copilot CLI, GitHub Copilot app, and agent mode in VS Code and JetBrains IDEs. | A skill is not an independent worker. Shared skills require provenance and script/resource review before use. | safe-with-caveat |
| AGT-10 | Custom agents | A custom agent is a reusable agent profile with a required description, Markdown behavior instructions, and optional model/tool configuration. Supported environments include cloud agent on GitHub.com, Copilot CLI, and named IDEs; some properties differ or are ignored by environment. | [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents); [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | 2026-08-09 | GitHub.com cloud agent, CLI, VS Code, JetBrains, Eclipse, and Xcode, subject to documented support. | If `tools` is omitted, all available tools are enabled; `tools: []` disables all tools. Use an explicit minimal list where supported. | safe-with-caveat |
| AGT-11 | Tools and permissions | Tools are action capabilities. Copilot CLI supports explicit available-tool filtering and allow/deny rules; unapproved tools prompt in interactive use. Broad allow-all settings remove confirmations and operate with the user's local access. | [Allowing tools to be used by GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools); [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | 2026-08-09 | Copilot CLI and custom-agent profiles. | Tool defaults and approvals vary by host. Read operations can still expose sensitive data; permission is not proof of safety. | safe-with-caveat |
| AGT-12 | Agentic loop | Public product behavior supports an observable loop: understand a task, inspect context, plan, call tools, inspect results, adjust, run checks, and return changes or stop. The developer can inspect requests, outputs, diffs, logs, and validation evidence. | [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli); [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) | 2026-08-09 | CLI and cloud agent provide different observable implementations. | Describe visible events and artifacts only. Do not claim access to hidden reasoning, private chain of thought, internal confidence, or a universal state machine. | safe-for-draft |
| AGT-13 | Planning, acting, observing | Copilot products document planning before implementation, iterative tool use, test/lint execution, and updating work from results. A draft may teach “inspect → bounded plan → act → observe → adjust → verify” as a learner workflow. | [Best practices for using GitHub Copilot to work on tasks](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results); [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | 2026-08-09 | Cloud agent and CLI. | The sequence is a teaching model synthesized from observable capabilities, not a claim about hidden implementation. | safe-for-draft |
| AGT-14 | Steering, stopping, recovery | Interactive CLI supports steering and rejecting requested tools with feedback. CLI can cancel and rewind from snapshots, but rewind restores broad workspace state and has limits; cloud sessions expose follow-up steering and stopping through their own controls. | [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli); [Canceling a GitHub Copilot CLI operation and rolling back changes](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/cancel-and-roll-back); [Using Copilot cloud agent on GitHub](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github) | 2026-08-09 | CLI and GitHub.com cloud sessions. | Never promise universal one-click rollback. External side effects may require their own recovery mechanism. | safe-with-caveat |
| AGT-15 | GitHub Enterprise Cloud repository workflow | Git tracks snapshots as commits and lines of development as branches; `git push` updates the remote branch. GitHub flow connects branch creation, commits, pushes, pull requests, review, and merge. | [About Git](https://docs.github.com/en/get-started/using-git/about-git); [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) | 2026-08-09 | Developer workflow on GitHub, including GitHub Enterprise Cloud. | Teach repository use, not branch-protection, ruleset, identity, billing, or enterprise policy administration. | safe-for-draft |
| AGT-16 | Ordinary GitHub Actions feedback | A GitHub Actions workflow is configured in the repository and can run from repository events such as `push` and `pull_request`, manual dispatch, schedules, or other documented events. Jobs and checks provide commit-associated pass/fail/skipped evidence. | [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions); [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) | 2026-08-09 | Repositories with configured Actions workflows and permitted runners. | A generic demo may claim only that a configured event triggered a run. It must not say “Copilot ran Actions” merely because an agent authored or pushed the commit. | safe-for-draft |
| AGT-17 | Agent-initiated Actions | Cloud agent works in an Actions-powered ephemeral environment, but workflows on its pull requests are restricted by default until a write-authorized user approves them. Code review and Code Quality also consume Actions runners for specific product operations. | [Security and risk mitigations for GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations); [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review); [CodeQL-powered analysis for Code Quality](https://docs.github.com/en/code-security/reference/code-quality/codeql-detection) | 2026-08-09 | Cloud-agent PRs, Copilot code review, and Code Quality. | Keep these product-initiated runs distinct from ordinary `push`/`pull_request` workflows. Automatic cloud-agent workflow execution is configurable and not a generic default claim. | safe-with-caveat |
| AGT-18 | Copilot cloud agent name and eligibility | The current product name is **GitHub Copilot cloud agent**. It is available on all paid Copilot plans; Business and Enterprise require policy enablement, and repositories can be opted out. Only a user with repository write access can trigger work. | [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent); [Managing access to GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/access-management) | 2026-08-09 | GitHub-hosted repositories; paid Copilot plans. | Do not use the retired “coding agent” product name except when explaining an old URL. Repository rules may make a repository incompatible. | safe-with-caveat |
| AGT-19 | Cloud-agent start and PR behavior | Sessions can start from GitHub.com, supported IDEs, CLI, API, mobile, MCP, and listed integrations. Depending on the entry point, Copilot may work on a branch before a PR, open a draft PR directly, or be asked to update an existing PR. | [Starting GitHub Copilot sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions); [Using Copilot cloud agent on GitHub](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github) | 2026-08-09 | Entry-point-specific. | Do not teach one assignment/start path as universal. Deep research, planning, and pre-PR iteration are GitHub.com-only capabilities in the reviewed documentation. | safe-with-caveat |
| AGT-20 | Cloud iteration and evidence | Cloud agent creates or uses one working branch, commits and pushes changes, and can be steered with follow-up prompts. Its signed commits, co-author attribution, commit links to session logs, diffs, test output, and PR discussion are reviewable evidence. | [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent); [Security and risk mitigations for GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations) | 2026-08-09 | GitHub.com cloud-agent sessions. | One session changes one repository, works on one branch, opens at most one PR, and has a documented 59-minute maximum execution time. Evidence still requires human evaluation. | safe-for-draft |
| AGT-21 | Cloud permissions, network, and secrets | Cloud agent is restricted to its working branch, cannot approve or merge its PR, and uses restricted internet access. Secrets and variables must be explicitly configured for the agent environment; ordinary Actions secrets are not an automatic grant. | [Security and risk mitigations for GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations); [Configuring secrets and variables for GitHub Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables) | 2026-08-09 | GitHub.com cloud-agent environment. | Network allowlists, agent secrets, and policy are administrative setup and should appear only as prerequisites/caveats. Never expose secret values in a demo. | safe-with-caveat |
| AGT-22 | `/init` | `/init` is an interactive **Copilot CLI** slash command; `copilot init` is its command-line counterpart. It analyzes the repository and writes or updates `.github/copilot-instructions.md`; for an existing file it proposes improvements that the user can apply or reject. | [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference); [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) | 2026-08-09 | Copilot CLI in a repository. | It does not generate a universal set of agent files. The resulting repository instruction file is used by cloud agent where repository instructions are supported, but the user must inspect, correct, and commit it; do not imply silent overwrite or automatic commit. | safe-with-caveat |
| AGT-23 | Portable optimization | Official guidance supports clear prompts, lean relevant context, focused sessions, fresh sessions between unrelated phases, compaction for continuing CLI work, minimal toolsets, deterministic tests/linters, and research-plan-implement separation. | [Optimizing your AI usage to maximize efficiency and reduce cost](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage) | 2026-08-09 | Portable advice, with commands tied to their named surface. | These are workflow optimizations, not guaranteed savings or quality improvements. Measure retries, irrelevant context, checks, and resulting evidence rather than promising a fixed percentage. | safe-for-draft |
| AGT-24 | Product usage controls and cost | Copilot CLI exposes public-preview soft AI-credit session limits. `/limits set max-ai-credits` applies in an interactive session, and `--max-ai-credits` applies to non-interactive work; an in-progress response may exceed the limit slightly. | [Setting an AI credit session limit in GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit); [Models and pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) | 2026-08-09 | Copilot CLI; AI-credit availability and billing depend on plan and policy. | A soft session limit is not a monthly budget. Model, token, cache, Actions-minute, and plan effects make universal cost claims unsafe. | safe-with-caveat |
| AGT-25 | Code Quality versus code review | **GitHub Code Quality** is a separate product from **GitHub Copilot code review**. On PRs, Code Quality posts deterministic CodeQL findings; AI-powered PR review requires Copilot code review separately. | [GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality); [GitHub Code Quality no longer adds Copilot as a reviewer](https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer/) | 2026-08-09 | Code Quality on GitHub Team or GitHub Enterprise Cloud; Copilot review has separate eligibility. | Do not merge these evidence streams or imply that enabling Code Quality requests Copilot review. | safe-for-draft |
| AGT-26 | Code Quality analysis, coverage, and languages | PR analysis is rules-based CodeQL; default-branch scans also include AI-powered analysis of recently changed files. Coverage requires an uploaded Cobertura XML report and compares PR-branch coverage with the default branch. Rule-based languages are C#, Go, Java, JavaScript, Python, Ruby, and TypeScript. | [GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality); [CodeQL-powered analysis for Code Quality](https://docs.github.com/en/code-security/reference/code-quality/codeql-detection); [Code coverage reference](https://docs.github.com/en/code-security/reference/code-quality/code-coverage) | 2026-08-09 | Repositories with Code Quality enabled. | AI analysis can cover recently changed code beyond the listed CodeQL languages; do not call that deterministic. PR and default-branch behavior must remain visually separate. | safe-with-caveat |
| AGT-27 | Code Quality fixes, delegation, and billing | Code Quality can offer Copilot-powered fixes. Default-branch remediation may optionally be assigned to cloud agent. Costs can include per-active-committer licensing, Actions minutes for scans, and AI credits for AI-powered detections/fixes; delegation requires an eligible Copilot license. | [GitHub Code Quality billing](https://docs.github.com/en/billing/concepts/product-billing/github-code-quality); [GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality) | 2026-08-09 | GitHub Team and GitHub Enterprise Cloud organizations with Code Quality enabled. | Do not demonstrate enablement, budgets, rulesets, or paid delegation without a separate approved environment and cost gate. | safe-with-caveat |
| AGT-28 | Copilot code review semantics | On GitHub.com, an individual requests Copilot from the PR **Reviewers** area. Copilot always submits a **Comment** review, not **Approve** or **Request changes**; it neither satisfies required approvals nor blocks merge. Feedback can contain mistakes and must be validated with human review. | [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review); [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review) | 2026-08-09 | GitHub.com; also supported in GitHub CLI, mobile, VS Code, and other documented clients with different flows. | “No comments” is not proof of correctness. Applying a suggestion is a code change, not acceptance or approval. | safe-for-draft |
| AGT-29 | Code review updates, plans, and billing | A manual review does not automatically re-run after a new push. The author must request re-review unless automatic review for new pushes is configured. Code review is on paid Copilot plans, consumes AI credits, and its agentic context/tool capabilities can consume Actions minutes on private repositories. | [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review); [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review); [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) | 2026-08-09 | GitHub.com and documented review clients; organization policy can control access. | Automatic-review ruleset administration is outside this workshop. Review effort levels and no-license organization access have distinct billing/policy caveats. | safe-with-caveat |
| AGT-30 | Current Code Quality behavior | Effective 2026-08-07, Code Quality no longer automatically adds Copilot as a PR reviewer. Learners must treat Code Quality findings and an explicitly requested Copilot review as separate evidence. | [GitHub Code Quality no longer adds Copilot as a reviewer](https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer/) | 2026-08-09 | GitHub Team and GitHub Enterprise Cloud Code Quality behavior. | This change does not remove Copilot code review; it removes the Code Quality side effect. | safe-for-draft |
| AGT-31 | Reasoning/efficiency control | Cloud-agent tasks can select a reasoning level when the chosen model supports it. Higher reasoning can help complex work but uses more tokens and credits; the setting applies to that run. | [Customize the reasoning level for Copilot cloud agent](https://github.blog/changelog/2026-08-03-customize-the-reasoning-level-for-copilot-cloud-agent/); [Optimizing your AI usage to maximize efficiency and reduce cost](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage) | 2026-08-09 | Paid Copilot plans that include cloud agent; model support varies. | This is a product control, not evidence that “more reasoning” is always better. Keep model-release details out of the durable draft. | safe-with-caveat |

## Slide-15 security replacement verification

The records below use the requested `safe`, `caveated`, and `blocked`
dispositions for the approved `Security Before and After Push` concept. They
are discovery and source verification only, not source-gate approval or
permission to edit the manifest, deck, notes, or storyboard.

### AGT-32 — `/security-review` surfaces and scope

- **Official sources:** [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference);
  [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli);
  [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions);
  [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “In an interactive GitHub Copilot CLI session,
  `/security-review` reviews active local code changes for high-confidence
  vulnerabilities and returns prioritized findings with remediation
  suggestions. The command is also documented for an active GitHub Copilot app
  agent session that has changes, where it reviews the current diffs.”
- **Caveats:** The GitHub Copilot app use is public preview and subject to
  change. The app and CLI are available on all Copilot plans, but organization
  policy can govern CLI access and command availability in the app depends on
  session context. The CLI reference does not attach a release label to this
  command, so do not call the CLI command generally available or preview.
- **Incorporation path:** `existing-slide` replacement; identify the chosen
  demo surface in notes and keep the participant label as
  `/security-review`.

### AGT-33 — `/security-review` is not a complete audit

- **Official sources:** [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference);
  [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- **Reviewed:** 2026-08-10
- **Disposition:** `safe`
- **Participant-safe wording:** “Treat `/security-review` as a focused,
  on-demand review of the active changes—not as a full repository security
  audit or a replacement for repository security controls.”
- **Caveats:** Findings and suggested fixes still require validation. Do not
  infer coverage of the entire repository, history, secrets, dependencies, or
  every vulnerability category from this command.
- **Incorporation path:** `existing-slide`; place this boundary in presenter
  notes and preserve the separate repository-control lanes.

### AGT-34 — Push protection

- **Official source:** [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “At the push boundary, push protection can
  block detected supported secrets before they reach the repository.”
- **Caveats:** Repository push protection requires GitHub Secret Protection and
  is disabled by default until an authorized administrator enables it. User
  push protection is enabled by default for pushes to public repositories.
  Applicable secret patterns, bypass behavior, repository settings, and push
  path affect the result; it is not a general code-security scan.
- **Incorporation path:** `existing-slide`; show this at the push boundary, not
  as a check that necessarily runs after a successful push.

### AGT-35 — Code scanning

- **Official source:** [Code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “When code scanning is configured, repository
  events such as a push can trigger analysis, and resulting vulnerability or
  error alerts appear in the repository.”
- **Caveats:** Code scanning does not run merely because code was pushed. Its
  tool, setup, event triggers, language coverage, and runner availability must
  be configured. It is available for public GitHub.com repositories and for
  organization-owned GitHub Team or GitHub Enterprise repositories with
  GitHub Code Security enabled; Actions usage and private-repository licensing
  can apply.
- **Incorporation path:** `existing-slide`; label the lane “Configured code
  scanning” in narration or notes even if the shorter native label remains
  “Code scanning.”

### AGT-36 — Dependency review

- **Official source:** [Dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “On a pull request that changes a supported
  package manifest or lock file, dependency review can show added, removed, or
  updated dependencies and known-vulnerability information.”
- **Caveats:** The dependency graph must be enabled, and ecosystem and file
  support apply. Availability covers public GitHub.com repositories and
  eligible organization-owned GitHub Team or GitHub Enterprise Cloud
  repositories with GitHub Code Security enabled. The dependency review
  action is a separate, configured Actions control that can report or enforce
  policy; it does not run automatically in every repository.
- **Incorporation path:** `existing-slide`; place this lane on the pull-request
  side, not on a generic push.

### AGT-37 — Safe lifecycle distinction

- **Official sources:** [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference);
  [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection);
  [Code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning);
  [Dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “Use `/security-review` on active changes
  before opening the pull request. At the push boundary, applicable push
  protection may block a supported secret. After a successful push or on the
  pull request, inspect any configured code-scanning results; on an applicable
  pull request, inspect dependency review separately.”
- **Caveats:** The sequence describes possible checkpoints, not guaranteed
  execution. Each control has its own surface, trigger, configuration, plan,
  and coverage.
- **Incorporation path:** `existing-slide`; this is the exact three-minute
  teaching boundary for the one-for-one replacement.

### AGT-38 — Human-review boundary

- **Official sources:** [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions);
  [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection);
  [Code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning);
  [Dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review)
- **Reviewed:** 2026-08-10
- **Disposition:** `safe`
- **Participant-safe wording:** “These findings are evidence for a human to
  validate. A finding, clean result, suggested fix, successful push, or passing
  check is not automatic acceptance or permission to merge.”
- **Caveats:** Each result answers only the question and scope that its control
  actually evaluated.
- **Incorporation path:** `existing-slide`; retain the native label “Human
  reviews findings” and connect this decision boundary to the module’s final
  human-acceptance slide.

### Visual-intent claim dispositions

| Proposed label or presenter-note claim | Disposition | Required boundary |
| --- | --- | --- |
| `/security-review` | `caveated` | Current in Copilot CLI and active GitHub Copilot app agent sessions with changes; app use is public preview. |
| `Active changes` | `safe` | Means the active local changes in CLI or current diffs in the app session, not the entire repository. |
| `Push protection` | `caveated` | A secret-scanning control at the push boundary; enablement, plan, patterns, and bypass behavior apply. |
| `Code scanning` | `caveated` | Runs only with supported and configured setup/triggers; coverage is not universal. |
| `Dependency review` | `caveated` | Pull-request dependency changes only, with dependency graph, supported files/ecosystems, and availability requirements. |
| `Human reviews findings` | `safe` | Results are evidence, not acceptance, approval, or merge authority. |
| “Run `/security-review` to inspect active changes before pushing.” | `caveated` | Name CLI or the GitHub Copilot app; do not imply other Copilot surfaces. |
| “Push protection, code scanning, and dependency review are separate evidence on the push or pull request.” | `blocked` | Use AGT-37: push protection is at the push boundary, code scanning follows configured events, and dependency review belongs to an applicable pull request. |
| “One Copilot command is a complete security audit.” | `blocked` | Use AGT-33. |
| “Review a local diff, push it, and inspect every security result.” | `blocked` | A push may be blocked, the app session need not be local, and repository controls may be absent or untriggered. Use AGT-37. |
| “Security results inform the human; they do not accept the change.” | `safe` | Preserve AGT-38 verbatim in meaning. |

### Exact incorporation boundary

The source-supported replacement is one three-minute slide titled
**Security Before and After Push** in the current slide-15 position, replacing
**Progress and Scope Drift** one-for-one. It can safely teach only this flow:

> Review active changes with `/security-review` on a named supported surface;
> treat it as a focused review, not a complete audit; distinguish applicable
> push protection at the push boundary from configured code-scanning evidence
> and pull-request dependency review; then have the human validate every result
> before continuing.

This fits the approved 25-slide `visual-intent.md` sequence and retains the
three-minute slide-15 position. The human approved this source boundary on
2026-08-10; manifest, deck, notes, and storyboard implementation remain
separate production work.

### Blocked wording and unresolved risks

- Block “complete security audit,” “scans the whole repository,” and “finds all
  vulnerabilities, secrets, and dependency risks.”
- Block claims that `/security-review` is a VS Code, GitHub.com pull-request,
  or cloud-agent command; those surfaces were not verified for this command.
- Block “generally available on every surface.” App use is public preview, and
  the CLI reference supplies no release-status label for the command.
- Block “push protection runs after push,” “covers every secret,” or “cannot be
  bypassed.”
- Block “a push automatically runs code scanning” and “dependency review runs
  on every push or every pull request.”
- Block “all controls come with a Copilot plan.” Repository security products,
  enablement, Actions, and licensing are separate.
- Block any clean-result, green-check, or suggested-fix wording that implies
  security, acceptance, approval, or permission to merge.
- The target repository’s actual security configuration, licensed products,
  supported languages/ecosystems, secret patterns, and event triggers are
  unknown. A future implementation must use conditional language and must not
  promise that a participant will observe every lane.
- Product surfaces remain volatile. Recheck the command references before a
  live demonstration or exact-UI capture.

## Slide-20 GitHub Mobile verification

The records below verify the exact approved visual-intent slide 20,
**Manage Cloud Agents from GitHub Mobile**, as of 2026-08-10. They do not
approve a source gate or authorize edits to the title, concept, manifest, deck,
notes, storyboard, prompts, media, or assets. Historical Changelog posts that
use “coding agent” do not override the current product name, **GitHub Copilot
cloud agent**.

### AGT-39 — Start or assign cloud-agent work from GitHub Mobile

- **Official sources:** [Using Copilot cloud agent on GitHub Mobile](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-mobile);
  [Starting GitHub Copilot sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “In GitHub Mobile, you can start a GitHub
  Copilot cloud-agent session for a selected repository, or assign an issue to
  Copilot.”
- **Caveats:** Starting a session requires selecting a repository and sending a
  prompt. A base branch, custom agent, and model can be optional choices.
  Copilot creates a new working branch and pushes code changes. A pull request
  is not guaranteed unless the prompt requests one or the user creates one
  later. Plan, policy, repository, and write-access requirements in AGT-46
  apply.
- **Blocked wording:** Block “every Mobile task automatically opens a pull
  request” and any one-path assignment wording presented as universal.
- **Incorporation boundary:** `existing-slide`; slide 20 may show either
  **New Session** or issue assignment, not an invented combined workflow.

### AGT-40 — Track session and task status in GitHub Mobile

- **Official sources:** [Using Copilot cloud agent on GitHub Mobile](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-mobile);
  [GitHub Mobile: Track coding agent progress in real time with Live Notifications](https://github.blog/changelog/2026-02-26-github-mobile-track-coding-agent-progress-in-real-time-with-live-notifications);
  [GitHub Mobile: Improved filters and sorting for Copilot sessions](https://github.blog/changelog/2026-07-10-github-mobile-improved-filters-and-sorting-for-copilot-sessions)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “GitHub Mobile can list your agent tasks and
  sessions, filter them by status and other session fields, and show progress
  notifications for supported cloud-run pull-request sessions.”
- **Caveats:** The current Mobile guide describes Agent Tasks as running and
  past pull requests generated by agents. Live notifications document the
  states **In progress**, **Completed**, **Failed**, and **Cancelled**.
  Session-list filters can expose active, completed, or needs-attention work,
  but **Needs attention** is a filter outcome, not evidence that Copilot asked
  a clarification question. Recent filters and live-update behavior require
  the latest production GitHub Mobile build.
- **Blocked wording:** Block the visual states **Needs input** and **Finished**.
  Use documented labels only, and do not turn **Needs attention** into a
  clarification-request claim.
- **Incorporation boundary:** `existing-slide`; status tracking may be the
  primary Mobile teaching object, with exact status labels kept native and
  release-sensitive.

### AGT-41 — Review active or completed cloud-agent work in GitHub Mobile

- **Official sources:** [GitHub Mobile: Research and code with Copilot cloud agent anywhere](https://github.blog/changelog/2026-04-08-github-mobile-research-and-code-with-copilot-cloud-agent-anywhere);
  [GitHub Mobile: Improved filters and sorting for Copilot sessions](https://github.blog/changelog/2026-07-10-github-mobile-improved-filters-and-sorting-for-copilot-sessions)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “From GitHub Mobile, you can find active or
  completed Copilot sessions, review the current diff, and decide whether to
  continue iterating or create a pull request.”
- **Caveats:** The sources support session discovery, diff review, iteration,
  and pull-request creation. They do not document that every GitHub.com
  session-log detail, tool trace, check result, or control is present in
  Mobile.
- **Blocked wording:** Block “GitHub Mobile shows the complete agent session
  log” and “Mobile has the same session controls as GitHub.com.”
- **Incorporation boundary:** `existing-slide`; show review of the diff and
  visible session state, not a fabricated full session-log interface.

### AGT-42 — Respond to clarification or input requests from GitHub Mobile

- **Official sources:** [Using Copilot cloud agent on GitHub Mobile](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-mobile);
  [GitHub Mobile: Track coding agent progress in real time with Live Notifications](https://github.blog/changelog/2026-02-26-github-mobile-track-coding-agent-progress-in-real-time-with-live-notifications);
  [GitHub Mobile: Improved filters and sorting for Copilot sessions](https://github.blog/changelog/2026-07-10-github-mobile-improved-filters-and-sorting-for-copilot-sessions)
- **Reviewed:** 2026-08-10
- **Disposition:** `blocked`
- **Participant-safe wording:** “Current official sources reviewed here do not
  verify a GitHub Mobile workflow for responding to a cloud agent’s
  clarification or input request.”
- **Caveats:** **Needs attention** can identify a session requiring attention,
  but the sources do not define that state as a clarification request or
  document a Mobile response flow.
- **Blocked wording:** Block “answer a clarification request from GitHub
  Mobile,” “respond to needed input in the Mobile session,” and any **Needs
  input** state or interaction.
- **Incorporation boundary:** `none`; remove this behavior from slide 20 unless
  a later current official source explicitly documents the Mobile workflow.

### AGT-43 — Iterate or steer cloud-agent work from GitHub Mobile

- **Official source:** [GitHub Mobile: Research and code with Copilot cloud agent anywhere](https://github.blog/changelog/2026-04-08-github-mobile-research-and-code-with-copilot-cloud-agent-anywhere)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “In GitHub Mobile, you can review the diff and
  iterate with Copilot cloud agent until you are ready to create a pull
  request.”
- **Caveats:** The current source verifies iteration from Mobile but does not
  specify the exact current control, label, or message flow. Exact UI and a
  claimed ‘follow-up prompt’ mechanism therefore remain unverified.
- **Blocked wording:** Block “tap **Send follow-up**,” “send follow-up direction
  in the session chat,” and any other exact Mobile steering control that is not
  shown in a current official source.
- **Incorporation boundary:** `existing-slide`; use **Review diff → Iterate**
  as the native wording, not **Send follow-up**.

### AGT-44 — Review the resulting pull request in GitHub Mobile

- **Official sources:** [GitHub Mobile](https://docs.github.com/en/get-started/using-github/github-mobile);
  [GitHub Mobile: Track coding agent progress in real time with Live Notifications](https://github.blog/changelog/2026-02-26-github-mobile-track-coding-agent-progress-in-real-time-with-live-notifications)
- **Reviewed:** 2026-08-10
- **Disposition:** `safe`
- **Participant-safe wording:** “Open the related pull request in GitHub
  Mobile to review the changes; final acceptance and merge remain human
  decisions.”
- **Caveats:** GitHub Mobile supports reading, reviewing, and collaborating on
  pull requests. A pull request and its checks are evidence, not automatic
  acceptance.
- **Blocked wording:** Block “a completed agent session is ready to merge” and
  “GitHub Mobile approves the agent’s pull request.”
- **Incorporation boundary:** `existing-slide`; the final visual handoff may
  return to a human pull-request review.

### AGT-45 — Request and inspect Copilot code review in GitHub Mobile

- **Official sources:** [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review);
  [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “In GitHub Mobile, an eligible user can open a
  pull request and request GitHub Copilot code review from the Reviews
  section, then inspect its feedback as one evidence stream.”
- **Caveats:** Copilot code review is available on paid Copilot plans and can
  be controlled by organization policy. Current billing, AI-credit, runner,
  repository, and no-license organization paths have separate requirements.
  Copilot submits a **Comment** review, not an approval, and its feedback must
  be validated.
- **Blocked wording:** Block “Copilot code review approves the pull request,”
  “every cloud-agent pull request is reviewed automatically,” and any claim
  that a cloud-agent plan alone guarantees review availability.
- **Incorporation boundary:** `existing-slide`; this is optional supporting
  evidence, not a required part of the Mobile cloud-agent loop.

### AGT-46 — Current naming, availability, policy, permission, and platform boundary

- **Official sources:** [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent);
  [Managing access to GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/access-management);
  [Using Copilot cloud agent on GitHub Mobile](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-mobile);
  [GitHub Mobile: Track coding agent progress in real time with Live Notifications](https://github.blog/changelog/2026-02-26-github-mobile-track-coding-agent-progress-in-real-time-with-live-notifications)
- **Reviewed:** 2026-08-10
- **Disposition:** `caveated`
- **Participant-safe wording:** “The current product name is **GitHub Copilot
  cloud agent**. It is available on all paid Copilot plans for eligible
  GitHub-hosted repositories, subject to policy, repository opt-out, and
  write-access requirements.”
- **Caveats:** Copilot Business and Enterprise administrators must enable cloud
  agent; Copilot Pro, Pro+, and Max enable it by default. A repository can be
  opted out, repositories owned by Enterprise Managed Users are excluded, and
  only users with repository write access can trigger work or steer it by
  comments. The current Mobile cloud-agent guide does not carry a
  public-preview label or specify a minimum app version, so do not repeat the
  2025 preview status or invent a version requirement. Live Activities require
  iOS 17.2 or later; Android Live Update Notifications require Android 16 or
  later, while older Android versions can still receive progress
  notifications. Recent Mobile capabilities require the latest production app
  build on iOS or Android.
- **Blocked wording:** Block current use of **coding agent** as the product
  name, “available on every Copilot plan,” “works in every repository,”
  “available to read-only users,” “currently public preview,” and an
  undocumented minimum GitHub Mobile app version.
- **Incorporation boundary:** `existing-slide`; put product name and short
  eligibility caveat in notes, and show platform requirements only if live
  notifications are taught.

### Slide-20 behavior dispositions

| Approved concept behavior | Disposition | Exact boundary |
| --- | --- | --- |
| Start a cloud-agent session from GitHub Mobile | `caveated` | Supported for an eligible repository; PR creation depends on the selected path or prompt. |
| Assign an issue to Copilot from GitHub Mobile | `caveated` | Supported with cloud-agent eligibility, repository policy, and write access. |
| View or track session status | `caveated` | Use documented task/session lists, filters, and notification states; latest-build and OS caveats apply. |
| Review active or completed agent work | `caveated` | Review visible session state and the diff; do not promise a complete GitHub.com-equivalent session log. |
| Respond to a clarification or input request | `blocked` | No reviewed current official source documents this Mobile response workflow. |
| Send follow-up direction | `caveated` | Say “review the diff and iterate”; the exact Mobile control or follow-up-message flow is unverified. |
| Review the resulting pull request | `safe` | GitHub Mobile supports pull-request review; acceptance and merge remain human. |
| Request or inspect Copilot code review | `caveated` | Supported in Mobile with paid-plan, policy, billing, and human-validation caveats. |

### Exact title and three-minute incorporation boundary

The exact title **Manage Cloud Agents from GitHub Mobile** remains supportable
only when **manage** is bounded to starting or assigning work, finding and
tracking sessions, reviewing a visible diff, iterating without naming an
unverified control, and returning to the pull request for human review. The
approved concept is not supportable unchanged because its clarification
response and exact **Send follow-up** interaction are not verified.

The strongest source-supported three-minute boundary is:

> In GitHub Mobile, an eligible developer can start a GitHub Copilot cloud-agent
> session or assign an issue, find and track agent work, review the visible
> diff, iterate until ready, and open the resulting pull request for human
> review. Copilot code review can be requested separately when eligible. Do not
> claim that Mobile exposes a **Needs input** state, accepts clarification
> responses, provides a **Send follow-up** control, or mirrors the complete
> GitHub.com session interface.

Recommended native sequence:
**Start or assign → Track status → Review diff → Iterate → Review pull
request**. If exact status labels are shown, use only documented labels and
keep their latest-build and OS boundaries in notes.

### Slide-20 blocked wording and unresolved risks

- Block **Needs input**, **Finished**, “answer a clarification request,” and
  “respond to input from the Mobile session.”
- Block **Send follow-up** as an exact label or control. Use “Review diff” and
  “Iterate.”
- Block “complete session review,” “same controls as GitHub.com,” and any
  fabricated session-log, chat, notification, or status UI.
- Block current participant-facing use of **coding agent** as the product name
  and block the historical **public preview** label.
- Block universal availability, automatic pull-request creation, automatic
  Copilot code review, or automatic merge readiness.
- Exact Mobile UI remains release-sensitive. Recheck the latest production app
  and official Mobile guide before recording a live demonstration or exact UI
  capture.
- No official source reviewed states an exact minimum GitHub Mobile app version
  for starting and tracking cloud-agent work. Only live-notification OS
  requirements are verified.

## Slide-authoring guardrails

### Exact claims allowed

- Use **GitHub Copilot cloud agent**, **GitHub Copilot Memory**, **agent
  skills**, **custom agents**, **GitHub Code Quality**, and **GitHub Copilot
  code review** as the current product terms.
- Say repository-wide and matching path-specific instructions may both apply;
  name the surface before describing precedence.
- Describe Memory as public-preview, selective, user-controlled, scoped, and
  retention-limited—not as a transcript.
- Show only observable loop artifacts: prompt, plan, tool request, parameters,
  result, diff, logs, checks, comments, commits, and stop/steer decisions.
- Say ordinary Actions runs are triggered by configured repository events.
  Label cloud-agent workflow approval, Code Quality scans, and code-review
  runner work separately.
- Say cloud agent works on one repository and one branch per session, can push
  iterative commits, and cannot approve or merge its pull request.
- Say `/init` and `copilot init` are Copilot CLI commands that propose writing
  or updating `.github/copilot-instructions.md`; the developer reviews the
  result.
- Present Code Quality PR findings, coverage, Copilot code-review comments, the
  diff, and ordinary Actions checks as different evidence streams.
- Keep the final choice—accept, revise, reject, recover, or merge—with the
  human.

### Claims prohibited

- A universal instruction hierarchy across GitHub.com, IDEs, CLI, code review,
  and cloud agent.
- “Copilot remembers everything,” permanent memory, guaranteed recall, or
  Memory as a replacement for current task context.
- Hidden-state, private-reasoning, chain-of-thought, internal confidence, or
  deterministic-agent claims.
- Universal rollback, universal tool approval behavior, or identical controls
  across clients.
- “Copilot ran CI” when a normal `push` or `pull_request` event triggered the
  workflow.
- Cloud agent can write across repositories, push to arbitrary branches,
  approve, merge, or access secrets/the internet without configured controls.
- `/init` generates every instruction/agent file, silently overwrites reviewed
  instructions, commits automatically, or is a VS Code/GitHub.com slash
  command.
- Code Quality performs AI review on pull requests, automatically requests
  Copilot review, or is included merely because a user has a Copilot license.
- Copilot code review is an approval, a required-review substitute, complete
  defect coverage, or automatically repeated after every push by default.
- Fixed credit, token, time, quality, or cost savings from any optimization.

### Terms to use

`repository-wide instructions`; `path-specific instructions`; `agent
instructions`; `GitHub Copilot Memory`; `repository-level facts`; `user-level
preferences`; `context window`; host-qualified `compaction`; `agent skill`; `custom
agent`; `tool`; `permission`; `GitHub Copilot cloud agent`; `session log`;
`draft pull request`; `GitHub Code Quality`; `CodeQL rules-based finding`;
`GitHub Copilot code review`; `Comment review`; `human review`.

### Terms to avoid

`universal context hierarchy`; `permanent memory`; `perfect recall`; `the agent
thought`; `chain of thought`; `coding agent` as the current product name;
`background agent` as a formal GitHub product name; `automatic CI by Copilot`;
`AI Code Quality review on PRs`; `Copilot approval`; `free` or `no-cost`
without plan/repository qualification; `unlimited`; `safe by default`.

## Topic-to-claim mapping

The titles below reproduce all 25 approved topics in order.

| # | Exact topic | Governing claims | Draft boundary |
| ---: | --- | --- | --- |
| 1 | **Instructions for Agentic Work** — durable repository guidance for autonomous tasks | AGT-01, AGT-02 | Name file type and supported surface. |
| 2 | **Memory and Its Limits** — what may persist and what must be supplied again | AGT-04, AGT-05 | Preview, 28-day unused retention, scope, and controls must remain visible. |
| 3 | **Context for Long-Running Work** — maintain relevant context across multiple steps | AGT-06, AGT-07 | CLI commands and percentages stay CLI-specific. |
| 4 | **Context Hierarchy and Instruction Layering** — task, path, repository, agent, and environment guidance | AGT-01, AGT-02, AGT-03 | Teach detect → expose → reconcile; do not draw a universal hierarchy. |
| 5 | **Strong Agentic Prompts** — outcome, scope, non-goals, evidence, and stop conditions | AGT-08 | Present non-goals/evidence/stops as the workshop's bounded brief. |
| 6 | **Reusable Skills** — repeatable procedures and supporting resources | AGT-09 | Skill supplies a procedure; it is not the worker or tool. |
| 7 | **Custom Agents** — recurring roles with bounded instructions and capabilities | AGT-10 | Explicit minimal tools; mention host differences. |
| 8 | **Tools and Permissions** — concrete actions, least privilege, and approval boundaries | AGT-11, AGT-21 | Tool and approval controls are surface-specific. |
| 9 | **The Agentic Loop** — understand, plan, act, observe, adjust, and verify | AGT-12, AGT-13 | Use visible stages only. |
| 10 | **Planning Before Action** — inspect the repository and propose a bounded approach | AGT-08, AGT-13 | Plan is reviewable guidance, not a hidden reasoning trace. |
| 11 | **Acting and Observing** — use tools, read results, and update the next step | AGT-11, AGT-12 | Show request, parameters, result, and next decision. |
| 12 | **Tool Control Points** — inspect consequential actions and parameters | AGT-11, AGT-14 | Emphasize scope, consequence, reversibility, and host control. |
| 13 | **Progress and Scope Drift** — compare current work with the original objective | AGT-08, AGT-13, AGT-14 | Compare visible files/actions with the brief. |
| 14 | **Retry, Ask, Stop, or Recover** — respond deliberately when work fails or changes | AGT-14 | No universal rollback promise. |
| 15 | **Verification and Evidence** — prove the result rather than trust completion language | AGT-12, AGT-16, AGT-28 | Each signal proves only what it checked. |
| 16 | **Repository State as a Checkpoint** — branches, diffs, commits, and recovery points | AGT-15 | Git history/checkpoints do not undo every external side effect. |
| 17 | **GitHub Actions as Loop Feedback** — use automated checks to guide the next iteration | AGT-16, AGT-17 | Distinguish ordinary event runs from product-initiated Actions use. |
| 18 | **Pull Requests as Agent Handoffs** — package changes, evidence, and uncertainty for review | AGT-15, AGT-20, AGT-28 | PR is a review package, not acceptance. |
| 19 | **Copilot Cloud Agent** — choose suitable asynchronous repository work | AGT-18, AGT-19 | Use current name and plan/repository caveats. |
| 20 | **Cloud-Agent Handoffs** — provide context, boundaries, checks, and expected evidence | AGT-08, AGT-19, AGT-21 | High-autonomy boundary; no secret or network assumptions. |
| 21 | **Monitoring and Iterative Pushes** — inspect progress, steer work, and evaluate each update | AGT-20, AGT-29 | Each push needs fresh diff/check/review evaluation; re-review is not automatic by default. |
| 22 | **`/init` and Repository Instructions** — generate, inspect, correct, and commit durable guidance | AGT-01, AGT-22 | CLI only; generated proposal must be reviewed before commit. |
| 23 | **Agentic Optimization** — focused context, targeted checks, and fewer blind retries | AGT-23, AGT-24, AGT-31 | Separate portable practices from preview/product controls and cost claims. |
| 24 | **Control AI Credits Before the Agent Runs** — choose a supported product control, then judge the result against the usage | AGT-06, AGT-07, AGT-23, AGT-24; CREDIT-01, CREDIT-03–CREDIT-08 | Keep direct controls surface-specific and inspect result quality plus available usage evidence. |
| 25 | **Code Quality, Copilot Review, and Human Acceptance** — distinguish evidence and retain merge as the human gate | AGT-12, AGT-25–AGT-30 | Keep Code Quality, Copilot review, Actions, diff, and human acceptance and merge authority separate. |

## Blocked and unresolved

1. **Universal instruction precedence remains blocked.** GitHub documents
   different behavior by surface; no cross-surface hierarchy was verified.
2. **Permanent or guaranteed durable memory remains blocked.** Copilot Memory
   is public preview, selective, and automatically removes unused entries after
   28 days.
3. **Generic automatic workflow execution for cloud-agent PRs is unsafe.**
   Default human approval and repository configuration affect whether workflows
   run.
4. **A cost-free generic demo cannot be promised.** Cloud agent, code review,
   Code Quality, Actions runners, and AI-powered fixes have plan, credit, minute,
   policy, or license caveats.
5. **Exact UI should be rechecked at deck implementation time.** Product names,
   file semantics, and commands are verified; screenshots and button placement
   remain release-sensitive.

## Verification summary

- **Unique official public sources:** 43
- **Claims:** 46
- **New slide-20 disposition counts:** 1 `safe`; 6 `caveated`; 1 `blocked`
- **Highest-risk unresolved claims:** universal instruction precedence,
  permanent/complete memory, automatic cloud-agent workflow execution, and
  cost-free product use; Mobile clarification-response and exact steering UI
  remain blocked.
- **Provenance rule:** This file is authored research input. It creates no live
  documentation, Changelog, API, or build dependency.
