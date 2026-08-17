# Module 3: Advanced — Workshop Guide

> **Authoritative text-only generation contract**
>
> - Generate exactly 19 slides in the title order and minute allocation recorded by `slide-manifest.md`.
> - Preserve the 60-minute teaching budget and the separate 30-minute mission.
> - Read every document declared by `module.md` under `sourceDocuments`. Treat every approved item in `product-update-brief.md` as required; do not incorporate candidate items from `content/research/github-changelog-options.md`.
> - Preserve required prompts, commands, named features, safety meaning, optimization meaning, availability, and rollout caveats. Supporting detail belongs in exactly one source-mapped Slidev HTML speaker-notes comment directly following each visible slide, with non-empty sections in this order: `Timebox:`, `Talk track:`, `Transition:`, `Audience question:`, `Response guidance:`, `Payoff:`, and `Sources:`. Each `Timebox:` must equal the slide's authoritative manifest `Minutes` value; `Talk track:` and `Transition:` must provide natural word-for-word narration, and `Audience question:` must be natural and slide-specific.
> - Do not add inline exercises, extra slides, optional August weekly-release candidates, `/side`, `/btw`, `/rewind`, stacked pull requests, hands-on code security, or content from Agentic.
> - Do not create or request new media. Keep current declared assets.

**Duration**: 1 hour 30 minutes (60 min teaching + separate 30 min mission)
**Format**: Presentation + Agent Mergewell mission
**Audience**: Developers who completed Foundations and Agentic Development
**Prerequisites**: Working knowledge of instructions, tools, agentic workflows, branch/diff review, and the carried-forward Agentic case file

**Module summary**: Advanced teaches developers to choose the smallest accountable orchestration pattern, govern shared integration surfaces and permission-trimmed workplace context, debug with product-specific evidence, recover from failed criteria, and integrate parallel work under one human merge owner. Product labels and inspection evidence remain surface-specific. The module ends by launching the existing 30-minute case-file mission rather than adding inline practice.

## Learning outcomes

By the end of the teaching path, learners can:

1. Select among one agent, delegated subagents, independent sessions, and Copilot CLI `/fleet` using independence, ownership, evidence, cost, and reconciliation criteria.
2. Evaluate discovery, governed workplace context, and integration surfaces for provenance, permissions, data scope, observability, enterprise fit, and rollback.
3. Explain how repository skills and MCP tools are governed differently when consumed by Copilot code review and Copilot cloud agent.
4. Debug across supported surfaces by comparing expected and actual evidence against predefined acceptance and stop criteria.
5. Recover or roll back to a known state and integrate parallel results through ordered, independently validated, reversible steps.
6. Define Day 2 success, fallback, and final human acceptance evidence.

## Session Agenda

| Section | Slides | Time |
|---|---:|---:|
| Open and orient | 1-2 | 2 min |
| Choose accountable orchestration | 3-7 | 16 min |
| Govern integration surfaces | 8-14 | 23 min |
| Debug, recover, integrate, and prepare | 15-18 | 17 min |
| Launch the separate Advanced mission | 19 | 2 min |

Teaching arithmetic: `2 + 16 + 23 + 17 + 2 = 60 minutes`. The `cross-cutting-change` mission remains a separate 30-minute activity.

## Objective-to-source and objective-to-practice map

| Outcome | Teaching slides | Primary approved source boundary | Existing mission practice |
|---|---|---|---|
| Choose orchestration | 3, 5-7 | CLI command reference; VS Code agent-workflow sources | Existing orchestration-choice clue |
| Govern discovery, workplace context, and integrations | 4, 8-13 | Workshop guide controls; official hooks, MCP, Work IQ, CLI, and plugin documentation | Operation Vet the Surface |
| Govern review and cloud-agent customization | 14 | Approved code-review skills/MCP GA sources | Operation Govern the Review |
| Evaluate and recover from failures | 15-16 | VS Code sources plus official CLI, App, cloud-agent, and troubleshooting sources | Existing debug clue, Purrmission rollback checkpoint, and recorded human choice |
| Integrate parallel work | 7, 17 | Durable branch/worktree validation and human-acceptance contract | Existing orchestration and integration evidence combined in the final case export |
| Prepare Day 2 and accept the result | 18-19 | This owner-approved contract and the declared mission | Operation Ship the Decision and final cumulative export |

## Slide contracts

### 3. Multi-Agent Orchestration: Roles, Boundaries, and Merge Ownership

Teach one durable idea: multi-agent orchestration succeeds when work is split into clear roles, each role has a defined return, and one human owns reconciliation and merge.

Keep the slide itself to exactly three ideas:

1. `Clear role`
2. `Defined return`
3. `One human merge owner`

Split work only when roles can be independently owned and their outputs can be reconciled. Use three native role lanes—for example, research, implement, and validate—each returning one evidence object to a single human merge gate. Do not use a comparison matrix, reconciliation-cost scale, Squad framing, or detailed previews of subagents, Copilot CLI `/fleet`, or worktrees; presenter notes may state that later slides cover specific patterns.

```text
Define each role, the evidence it returns, and the one human merge owner.
```

### 4. Awesome Copilot List

Use curated Copilot resource lists as discovery aids for skills, prompts, and examples, not as enterprise approvals. Require source credibility, license posture, permissions, data handling, maintenance, and enterprise-compatibility review before reuse. Preserve the boundary: popularity or inclusion in a list is not authorization.

```text
Review this Copilot skill or ecosystem example as a discovery resource. Identify source credibility, enterprise compatibility, permissions, and what must be approved before the team uses it.
```

### 5. Subagents

A subagent receives a narrow prompt, minimal necessary context and permissions, a required output shape, acceptance criteria, and a return path to the delegating owner. Suitable slices include research, tests, documentation review, or validation that can be checked independently. Keep outputs attributable and do not duplicate the parent task. Inspection evidence depends on the hosting surface; mention that boundary without recreating a standalone inspection slide.

### 6. Parallel Subagents with Copilot CLI `/fleet`

Teach `/fleet` as an exact GitHub Copilot CLI interactive slash command that runs subagents in parallel; inspect those tasks through CLI `/tasks`. Use it for independent tasks such as separable checks, similar bounded refactors, or issue triage only when parallel savings exceed AIC, review, and reconciliation cost. Keep a human merge owner and require each result to return scope, changed artifacts, validation evidence, uncertainty, and conflicts.

State explicitly: `/fleet` is not an IDE-wide option, a VS Code Chat command, an inline-completions feature, or a currently documented Copilot App command. A CLI `/ide` connection does not turn `/fleet` into a VS Code Chat feature, and the official CLI reference does not visibly label `/fleet` preview or GA.

### 7. Worktrees for Parallel Agent Sessions

Use one worktree and branch per independent session to isolate files, context, and diffs. Isolation prevents accidental working-directory collision; it does not prove that branches are independent, compatible, correct, or safe to merge. Before integration, inspect dependency direction and overlap, validate each branch independently, then prove compatibility through ordered combined validation under one human merge owner.

### 8. Hooks

Hooks provide deterministic lifecycle guardrails for repeatable policy checks, secret scanning, validation commands, and stop gates that should not depend on prompt quality. Keep repository `.github/hooks/*.json` guidance scoped to supported cloud-agent and Copilot CLI use, and treat VS Code workspace hooks as a separate supported-surface configuration. Require provenance, least privilege, observable output, failure behavior, validation, and rollback evidence before trusting a hook.

### 9. Extension Marketplace

Marketplace extensions can change permissions, telemetry, execution, and data-access boundaries. Inspect publisher, version, trust signals, permissions, telemetry and data handling, support posture, enterprise policy, and disable/uninstall path. Availability in a marketplace is not authorization to enable it.

### 10. MCP (Model Context Protocol)

MCP exposes tools, resources, and prompts through explicit server boundaries; those capability types are distinct and a consuming product may support only a subset. For any server, identify what can be read or changed, authentication and authorization, data scope, provenance, secrets handling, logging, allowlisting, enablement owner, and rollback. Keep this workshop conceptual rather than configuring a live server.

### 11. Work IQ via MCP: Governed Microsoft 365 Context

Keep the slide itself to exactly these three teaching ideas:

1. **What it is:** a permission-aware Microsoft 365 workplace-intelligence layer.
2. **How it connects here:** Microsoft officially documents GitHub Copilot CLI connecting to Work IQ through remote MCP.
3. **Safety boundary:** `Permission to retrieve is not permission to present.` Existing user permissions and tenant controls apply; public workshop examples are fictional/synthetic only.

Use one simple, character-free native flow: `Permitted Microsoft 365 context → Work IQ → MCP → GitHub Copilot CLI`. Add only the small boundary label `identity · permissions · tenant policy`. Do not add data-category lists, interface inventories, authentication mechanics, availability or billing details, Microsoft product screenshots, or generated UI to the slide.

Use this required five-sentence presenter-notes block for the supporting detail:

1. Work IQ is not Microsoft 365 Copilot, Microsoft Graph, a connector, an agent, or MCP itself; its documented developer interfaces are A2A, REST, and MCP, while this slide teaches only the officially documented GitHub Copilot CLI remote-MCP path and makes no equivalent claim for VS Code, Copilot App, GitHub.com cloud agent, or code review.
2. Calls use Microsoft Entra delegated authentication as the signed-in user and are permission-trimmed, application-only authentication is unsupported, and existing Microsoft 365 permissions, sensitivity labels, compliance controls, tenant policy, and tenant boundaries continue to apply.
3. Permitted context can include email, meetings and calendar, OneDrive and SharePoint files, Teams messages and chats, people and organizational context, Planner, enterprise search, and approved connected business systems.
4. Work IQ APIs became generally available on 2026-06-16, access can require tenant enablement and usage-based Copilot Credits, exact geographic availability and pricing are not established, and some administrative or MCP controls may vary by region.
5. Work IQ in Copilot Studio remains preview and is not the teaching target; public delivery must not expose live tenant names, emails, meetings, chats, files, customer data, tenant IDs, consent screens, tokens, admin settings, or screenshots, and must not demonstrate write operations.

### 12. API/CLI

Prefer an approved API or CLI when it provides the narrowest observable path for deterministic tasks such as querying issues, running tests, collecting logs, or invoking known automation. Require least-privilege credentials, environment separation, stable output, audit evidence, explicit failure handling, and a rollback or safe retry path. A narrow command is preferable to a broad plugin or autonomous action only when it still meets the acceptance criteria.

### 13. Plugins

Plugins can bundle slash commands, skills, custom agents, hooks, and MCP server definitions, so govern them as supply-chain components. Inspect provenance, package metadata, included customizations, executable hooks, automatically started servers, versioning, preview or availability labels, telemetry and data scope, rollout ownership, and rollback before enablement. Separate discovery and installation from organization authorization.

### 14. Govern Shared Skills and MCP Across Code Review and Cloud Agent

Teach two distinct consumers:

- **Copilot code review** leaves review comments and does not approve the pull request. Repository agent skills and MCP tools can inform a comment; preserve attribution, and remember that MCP calls made by code review are read-only.
- **Copilot cloud agent** is a separate agent workflow. Repository MCP configuration is shared with it, and GitHub and Playwright MCP servers may be enabled by default unless policy changes their use.

For these consumers, distinguish MCP **tools** from broader **resources** and **prompts**. Configured tools can run autonomously without an approval prompt, so require separate enablement, explicit allowlisting, least privilege, secrets controls, provenance, data-scope review, policy fit, and observable evidence. Availability and enablement are not acceptance: a human verifies comments, diffs, checks, and tool evidence and keeps accept/reject/merge authority.

```text
For this repository, compare how one maintained agent skill and one allowlisted MCP tool would be consumed by Copilot code review and Copilot cloud agent. Record attribution, read/write boundary, permissions, secrets and data scope, autonomous execution risk, policy owner, evidence produced, and the final human acceptance decision.
```

### 15. VS Code Agents Window as Debugging Evidence

Scope this slide to VS Code. The Agents window can expose conversation and diff review plus running-subagent model, elapsed time, active tool call, and subagent conversation, helping connect delegated work to repository changes. It remains public preview and subject to progressive rollout, so confirm availability before demonstrating and do not imply equivalent evidence elsewhere.

### 16. Debugging Copilot Across Surfaces

Apply one portable method:

1. State one failure hypothesis and the smallest safe reproduction.
2. Define acceptance tests and expected evidence before rerunning.
3. Preserve a checkpoint or known-good state.
4. Compare expected with actual evidence and change one variable at a time.
5. Stop when a criterion fails; do not broaden context or tools by reflex.
6. Recover, repair the session, or roll back to the checkpoint, then rerun only the failed proof.

Use evidence native to the surface: VS Code Agents window; Copilot CLI `/tasks`, `/diff`, and `/session`; Copilot App session/worktree/branch/pull-request/CI history; GitHub.com cloud-agent agents panel, logs, tools, progress, token usage, session length, commits, and diffs; or JetBrains agent debug logs. Do not introduce `/rewind`, and do not claim equivalent evidence for Xcode or Eclipse.

```text
Review this failed agent run. State one hypothesis and the smallest safe repro. Define the acceptance tests and expected evidence before rerunning; name the surface-specific evidence to inspect, the checkpoint to preserve, the stop criterion, and how to recover or roll back to a known state if the criterion fails.
```

### 17. Integrating Parallel Agent Work

Integration is a separate engineering phase, not the automatic result of isolated branches. Record dependency ordering; validate each branch independently; detect file, API, schema, test, and behavioral overlap; choose the integration sequence; and preserve a rollback point before combination. After each ordered integration step, run targeted checks, then run combined validation for cross-branch behavior. A human reviews remaining uncertainty and evidence before final acceptance or merge.

```text
Create an integration plan for these parallel branches. Record dependency order, independent validation, overlap and conflict checks, integration sequence, combined acceptance tests, rollback point, unresolved uncertainty, and the final human accept/revise/reject decision.
```

### 18. Preparing for Day 2 Hack

Predefine the narrow objective, owner, orchestration pattern, model strategy, constraints, and evidence that will count as success. Record explicit success criteria, the earliest stop signal, a fallback that preserves a demonstrable result, and the final human demo/acceptance gate. Reuse the debugging and integration methods rather than repeating their steps; this slide packages readiness evidence for execution pressure.

### 19. Your Advanced Mission Starts Now

Launch the declared 30-minute `cross-cutting-change` mission after the 60-minute teaching path. Map the existing orchestration clue to accountable boundaries; the integration matrix and review-control stack to governed integration; the minimal debug protocol, rollback checkpoint, and recorded human choice to evaluation/recovery; and the consolidated case-file export to final integration proof. This mapping preserves the existing clues, scoring, evidence envelope, and duration without adding an inline exercise or changing the mission.

*Workshop guide for Module 3: Advanced — GitHub Copilot Developer Training*

