# Advanced Workflows Product Update Brief

This brief contains only owner-approved product coverage for the Advanced module. Candidate August weekly-release items remain in `content/research/github-changelog-options.md` and are not approved by this accuracy correction and 20-slide restructure.

Reviewed: **2026-08-12**

## Approved accuracy correction: Copilot CLI `/fleet`

- Status: incorporated
- Required coverage:
  - `/fleet` is an interactive slash command documented for GitHub Copilot CLI; `/tasks` is the documented inspection path.
  - Use it for parallel subagents only when tasks are sufficiently independent that elapsed-time or AIC savings exceed coordination and reconciliation cost.
  - Keep a human merge owner and require attributable outputs and acceptance evidence.
  - Do not present `/fleet` as an IDE-wide option, a VS Code Chat command, an inline-completions feature, or a documented GitHub Copilot App command.
  - A CLI `/ide` connection does not change the product surface that owns `/fleet`.
- Availability boundary: the CLI reference does not visibly attach a preview or GA label to `/fleet`; do not invent one.
- Contract impact: slide 7 of the 20-slide contract; the former standalone running-subagent slide is removed, with hosting-surface inspection caveats retained on slides 6, 7, and 16.
- Official sources:
  - [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
  - [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
  - [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)

## Approved update: VS Code agent workflows

- Status: incorporated
- Required coverage:
  - Scope the Agents window conversation/diff views, running-subagent model, elapsed time, active tool call, and subagent conversation to VS Code.
  - Preserve the public-preview label and progressive-rollout caveat; confirm availability before a live demonstration.
  - Use worktrees as an isolation boundary, not as proof of compatible or correct changes.
  - Keep peer chats, delegated subagents, isolated sessions, and CLI `/fleet` distinct.
- Contract impact: slides 6, 8, and 16 of the 20-slide contract; running-subagent inspection is no longer a standalone topic.
- Official sources:
  - [GitHub Copilot in Visual Studio Code, July 2026 releases](https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases)
  - [Visual Studio Code 1.131 release notes](https://code.visualstudio.com/updates/v1_131)
  - [Agents in Visual Studio Code](https://code.visualstudio.com/docs/agents/concepts/agents#_subagents)

## Approved update: code review skills and MCP

- Status: incorporated
- Availability: generally available to Copilot Pro, Pro+, Business, and Enterprise users.
- Required coverage:
  - Copilot code review and Copilot cloud agent are distinct consumers of repository customization. Code review leaves comments and does not approve a pull request; a human verifies evidence and decides whether to accept or merge.
  - Repository agent skills and MCP tools can inform code review. Preserve attribution for the skill or MCP contribution.
  - Code-review MCP calls are read-only. For these consumers, distinguish MCP tools from broader MCP resources and prompts.
  - Repository MCP configuration is shared with Copilot cloud agent. GitHub and Playwright MCP servers may be enabled by default unless policy changes their use.
  - Configured MCP tools can run autonomously without an approval prompt. Require explicit enablement, tool allowlisting, least privilege, secrets handling, provenance, data-scope review, and organization policy.
  - Separate enablement and availability from authorization and final human acceptance.
- Contract impact: all accuracy-critical content formerly spread across slides 15-17 is consolidated on slide 15 of the 20-slide contract.
- Official sources:
  - [Copilot code review: Agent skills and MCP now generally available](https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available)
  - [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
  - [Configuring MCP servers for Copilot coding agent](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers)

## Approved update: Work IQ via MCP

- Status: incorporated
- Reviewed: **2026-08-12**
- On-slide delivery contract:
  1. **What it is:** a permission-aware Microsoft 365 workplace-intelligence layer.
  2. **How it connects here:** Microsoft officially documents GitHub Copilot CLI connecting to Work IQ through remote MCP.
  3. **Safety boundary:** `Permission to retrieve is not permission to present.` Existing user permissions and tenant controls apply; public workshop examples are fictional/synthetic only.
- Visual delivery contract: use only the character-free native flow `Permitted Microsoft 365 context → Work IQ → MCP → GitHub Copilot CLI` with the small boundary label `identity · permissions · tenant policy`; do not add a Microsoft product screenshot, generated UI, or the presenter-note detail below to the slide.
- Presenter-notes boundary: retain the supporting interface, authentication, data-category, availability, enablement, billing, regional, preview, confidentiality, and no-write-operation details below in exactly one source-mapped Slidev HTML speaker-notes comment directly following the visible slide, with non-empty sections in this order: `Timebox:`, `Talk track:`, `Transition:`, `Audience question:`, `Response guidance:`, `Payoff:`, and `Sources:`, rather than displaying them all on the slide. Its `Timebox:` must equal the slide's authoritative manifest `Minutes` value; `Talk track:` and `Transition:` must provide natural word-for-word narration, and `Audience question:` must be natural and slide-specific.
- Required coverage:
  - Work IQ is Microsoft's permission-aware workplace-intelligence layer that assembles and reasons over Microsoft 365 and connected organizational context for Copilot experiences, agents, applications, and workflows.
  - It is not Microsoft 365 Copilot, Microsoft Graph, a connector, an agent, or MCP itself.
  - Its documented developer interfaces are A2A, REST, and MCP. The exact GitHub integration boundary approved here is GitHub Copilot CLI acting as an MCP client for the remote Work IQ MCP server.
  - Do not claim equivalent integration with GitHub Copilot in VS Code, Copilot App, GitHub.com cloud agent, or code review.
  - Permitted context can include email, meetings and calendar, OneDrive and SharePoint files, Teams messages and chats, people and organizational context, Planner, enterprise search, and approved connected business systems.
  - Calls use Microsoft Entra delegated authentication as the signed-in user and are permission-trimmed. Application-only authentication is unsupported.
  - Existing Microsoft 365 permissions, sensitivity labels, compliance controls, tenant policy, and tenant boundaries continue to apply.
  - Work IQ APIs became generally available on 2026-06-16. Access can require tenant enablement and usage-based Copilot Credits.
  - Work IQ in Copilot Studio remains preview and is not the teaching target. Exact geographic availability and exact pricing were not established; some administrative or MCP controls may vary by region.
  - Preserve the safety boundary: `Permission to retrieve is not permission to present.`
  - Public workshop content must use fictional labels and synthetic summaries only. Do not expose tenant screenshots or live tenant names, emails, meetings, chats, files, customer data, tenant IDs, consent screens, tokens, or admin settings, and do not demonstrate write operations.
- Contract impact: new 3-minute slide 12 of the 20-slide contract, immediately after the conceptual MCP slide.
- Official sources (reviewed 2026-08-12):
  - [Work IQ overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/)
  - [Work IQ API overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/api-overview)
  - [Work IQ MCP overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview)
  - [Use Work IQ MCP with GitHub Copilot CLI](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/quickstart/github-copilot-cli)
  - [Enable Work IQ](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/enable-work-iq)
  - [Usage-based billing and Copilot Credits](https://learn.microsoft.com/en-us/microsoft-365/copilot/usage-based-billing-overview-copilot-credits)
  - [Announcing the new Work IQ APIs](https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/)

## Approved cross-surface evidence boundary

- Status: incorporated
- Required coverage:
  - Apply one portable method—hypothesis, expected evidence, actual evidence, acceptance test, checkpoint, stop decision, and recover/rollback—but inspect evidence native to each surface.
  - VS Code: Agents window conversation/diff evidence and its preview caveats.
  - Copilot CLI: `/tasks`, `/diff`, and `/session`, plus only currently approved recovery controls. Do not introduce the pending `/rewind` candidate.
  - Copilot App: isolated top-level session, worktree, branch, pull-request, and CI history. The app is built on CLI, but current official app documentation does not document `/fleet`.
  - GitHub.com cloud agent: agents panel evidence including logs, tools, progress, token usage, session length, commits, and diffs.
  - JetBrains: agent debug logs.
  - Do not claim equivalent evidence for Xcode or Eclipse.
- Contract impact: slides 16-19 of the 20-slide contract, including the approved evaluation, recovery, and parallel-integration gaps.
- Official sources:
  - [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
  - [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
  - [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
  - [Troubleshooting GitHub Copilot](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot)
  - [Agents in Visual Studio Code](https://code.visualstudio.com/docs/agents/concepts/agents)

## Explicit exclusions

This revision does not approve optional August weekly-release candidates, `/side`, `/btw`, `/rewind`, stacked pull requests, or hands-on code security. It does not move or revise Agentic content.
