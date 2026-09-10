---
schemaVersion: 1
id: ghcp-dev-hack
title: GitHub Copilot Developer Hack
status: draft
kind: workshop
description: 'Build practical GitHub Copilot skills through progressive, hands-on modules.'
format: one-day
duration: 7 hours 8 minutes
defaultDeliveryVariant: one-day
deliveryVariants:
  - id: one-day
    title: GitHub Workshop
    description: >-
      Complete the three learning modules and Agent Mergewell missions in one
      focused day.
    days:
      - id: day-one
        title: GitHub Workshop
        start: '09:00'
        end: '16:08'
        agenda:
          - id: executive-kickoff
            type: kickoff
            title: Executive kickoff
            start: '09:00'
            end: '09:15'
          - id: foundations-content
            type: module-content
            title: >-
              Foundations: Copilot surfaces, safety, interaction modes, cost,
              and context
            start: '09:15'
            end: '10:32'
            module: foundations
          - id: morning-break
            type: break
            title: Break
            start: '10:32'
            end: '10:47'
          - id: foundations-mission
            type: mission
            title: 'Mission: Apply context, prompting, and least-privilege practices'
            start: '10:47'
            end: '11:32'
            module: foundations
          - id: agentic-content-one
            type: module-content
            title: >-
              Agentic Development: Instructions, memory, context, prompts,
              agents, skills, and tools
            start: '11:32'
            end: '12:03'
            module: agentic
          - id: lunch
            type: lunch
            title: Lunch
            start: '12:03'
            end: '12:48'
          - id: agentic-content-two
            type: module-content
            title: >-
              Agentic Development: Observable loops, repository checkpoints,
              cloud agents, optimization, AI-credit controls, and human
              acceptance
            start: '12:48'
            end: '13:38'
            module: agentic
          - id: agentic-mission
            type: mission
            title: 'Mission: Delegate and verify a bounded agent task'
            start: '13:38'
            end: '14:23'
            module: agentic
          - id: advanced-content-one
            type: module-content
            title: >-
              Advanced Workflows: Multiagent orchestration and trusted
              integrations
            start: '14:23'
            end: '15:08'
            module: advanced
          - id: afternoon-break
            type: break
            title: Break
            start: '15:08'
            end: '15:23'
          - id: advanced-content-two
            type: module-content
            title: 'Advanced Workflows: Debugging evidence, deployment, and operations'
            start: '15:23'
            end: '15:38'
            module: advanced
          - id: advanced-mission
            type: mission
            title: 'Mission: Orchestrate, integrate, and debug with evidence'
            start: '15:38'
            end: '16:08'
            module: advanced
  - id: two-day
    title: GHCP Hack (2 Day)
    description: >-
      Complete the learning day, then apply the practices during a full team
      hack day and project readout.
    days:
      - id: day-one
        title: GitHub Workshop
        start: '09:00'
        end: '16:08'
        agenda:
          - id: executive-kickoff
            type: kickoff
            title: Executive kickoff
            start: '09:00'
            end: '09:15'
          - id: foundations-content
            type: module-content
            title: >-
              Foundations: Copilot surfaces, safety, interaction modes, cost,
              and context
            start: '09:15'
            end: '10:32'
            module: foundations
          - id: morning-break
            type: break
            title: Break
            start: '10:32'
            end: '10:47'
          - id: foundations-mission
            type: mission
            title: 'Mission: Apply context, prompting, and least-privilege practices'
            start: '10:47'
            end: '11:32'
            module: foundations
          - id: agentic-content-one
            type: module-content
            title: >-
              Agentic Development: Instructions, memory, context, prompts,
              agents, skills, and tools
            start: '11:32'
            end: '12:03'
            module: agentic
          - id: lunch
            type: lunch
            title: Lunch
            start: '12:03'
            end: '12:48'
          - id: agentic-content-two
            type: module-content
            title: >-
              Agentic Development: Observable loops, repository checkpoints,
              cloud agents, optimization, AI-credit controls, and human
              acceptance
            start: '12:48'
            end: '13:38'
            module: agentic
          - id: agentic-mission
            type: mission
            title: 'Mission: Delegate and verify a bounded agent task'
            start: '13:38'
            end: '14:23'
            module: agentic
          - id: advanced-content-one
            type: module-content
            title: >-
              Advanced Workflows: Multiagent orchestration and trusted
              integrations
            start: '14:23'
            end: '15:08'
            module: advanced
          - id: afternoon-break
            type: break
            title: Break
            start: '15:08'
            end: '15:23'
          - id: advanced-content-two
            type: module-content
            title: 'Advanced Workflows: Debugging evidence, deployment, and operations'
            start: '15:23'
            end: '15:38'
            module: advanced
          - id: advanced-mission
            type: mission
            title: 'Mission: Orchestrate, integrate, and debug with evidence'
            start: '15:38'
            end: '16:08'
            module: advanced
      - id: day-two
        title: GitHub Hack Day
        start: '09:00'
        end: '16:00'
        agenda:
          - id: hack-one
            type: hack
            title: Team hack work
            start: '09:00'
            end: '10:30'
          - id: morning-break
            type: break
            title: Break
            start: '10:30'
            end: '10:45'
          - id: hack-two
            type: hack
            title: Team hack work
            start: '10:45'
            end: '12:00'
          - id: lunch
            type: lunch
            title: Lunch
            start: '12:00'
            end: '13:00'
          - id: hack-three
            type: hack
            title: Team hack work
            start: '13:00'
            end: '14:15'
          - id: readout-prep
            type: readout-prep
            title: Break and readout preparation
            start: '14:15'
            end: '14:30'
          - id: team-readouts
            type: readout
            title: Team project readouts and short demos
            start: '14:30'
            end: '16:00'
level: mixed
audience:
  - Software developers
  - Technical leads
prerequisites:
  - A GitHub account with GitHub Copilot access
  - 'GitHub Copilot app, GitHub Copilot CLI, or GitHub Copilot in VS Code'
  - Git
  - Visual Studio Code
modules:
  - foundations
  - agentic
  - advanced
tags:
  - github-copilot
  - hands-on
  - developer
researchSources:
  - type: other
    title: Managing issues and pull requests with the GitHub Copilot app
    url: >-
      https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests#merging-a-pull-request
    reviewedAt: '2026-09-10'
    notes: >-
      Scoped FND-15 provenance reconciliation for PR 61. The merging section
      documents agent merge as an app workflow; it does not separately label it
      experimental or preview. This is not a separate Agent Merge GA claim or
      evidence about the VS Code Agent Merge preview.
  - type: other
    title: Built-in skills in the GitHub Copilot app
    url: >-
      https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills
    reviewedAt: '2026-09-10'
    notes: >-
      Scoped FND-15 corroboration: the agent-merge skill follows up on review
      comments, failing checks and conflicts when the app workflow invokes it.
      No new live automation, permissions or merge exercise is authorized.
  - type: github-changelog
    title: GitHub Copilot app generally available
    url: >-
      https://github.blog/changelog/2026-06-17-github-copilot-app-generally-available/
    reviewedAt: '2026-09-10'
    notes: >-
      Candidate source recorded for traceability of the existing FND-15
      verification, not a newly approved Changelog content update. The dated
      announcement establishes app-level GA on 2026-06-17, not separate Agent
      Merge GA. Changelog option dispositions remain unchanged.
  - type: other
    title: Awesome Copilot
    url: 'https://github.com/github/awesome-copilot'
    reviewedAt: '2026-08-05'
    notes: >-
      Reviewed as the broader student exploration catalog for role-based
      reusable skills; individual community resources still require provenance,
      dependency, security, and fitness review before adoption.
  - type: other
    title: GitHub Copilot app
    url: 'https://github.com/github/app'
    reviewedAt: '2026-08-07'
    notes: >-
      Official product repository reviewed for the Foundations app route.
      Verifies the standalone agent-native desktop experience, local sessions in
      isolated Git worktrees, and inspectable plan, files, terminal, and diff
      canvases.
  - type: other
    title: GitHub Copilot app v1.1.5 release notes
    url: 'https://github.com/github/app/releases/tag/v1.1.5'
    reviewedAt: '2026-08-07'
    notes: >-
      Reviewed for local-clone onboarding, folder-based projects, Plan mode,
      permission modes, and current app behavior; exact UI remains
      version-sensitive.
  - type: github-changelog
    title: GitHub Changelog
    url: 'https://github.blog/changelog/'
    reviewedAt: '2026-07-28'
  - type: github-changelog
    title: >-
      GitHub Mobile: Track coding agent progress in real time with Live
      Notifications
    url: >-
      https://github.blog/changelog/2026-02-26-github-mobile-track-coding-agent-progress-in-real-time-with-live-notifications
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for slide 20 tracking of supported cloud-run pull-request
      sessions using documented notification states. Historical naming does not
      replace GitHub Copilot cloud agent; latest-production-build and
      iOS/Android notification-version caveats apply.
  - type: github-changelog
    title: 'GitHub Mobile: Research and code with Copilot cloud agent anywhere'
    url: >-
      https://github.blog/changelog/2026-04-08-github-mobile-research-and-code-with-copilot-cloud-agent-anywhere
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for the visible-diff review, iterate, and resulting-pull-request
      boundary. It does not verify a clarification-response flow, an exact
      follow-up control, or GitHub.com-equivalent session details.
  - type: github-changelog
    title: 'GitHub Mobile: Improved filters and sorting for Copilot sessions'
    url: >-
      https://github.blog/changelog/2026-07-10-github-mobile-improved-filters-and-sorting-for-copilot-sessions
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for finding and tracking sessions with current filters and
      visible state. Needs attention is not a clarification request; labels and
      exact UI remain release-sensitive and require the latest production GitHub
      Mobile build.
  - type: github-changelog
    title: GitHub Code Quality no longer adds Copilot as a reviewer
    url: >-
      https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer
    reviewedAt: '2026-08-07'
    notes: >-
      Approved for the Agentic module's explicit pull-request review checkpoint.
      Learners inspect Copilot findings as evidence; repository and organization
      ruleset administration is excluded.
  - type: github-changelog
    title: 'GitHub Copilot in Visual Studio Code, July 2026 releases'
    url: >-
      https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases
    reviewedAt: '2026-07-31'
    notes: Approved and incorporated into the Advanced module on 2026-07-31.
  - type: github-changelog
    title: 'Copilot code review: Agent skills and MCP now generally available'
    url: >-
      https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available
    reviewedAt: '2026-07-31'
    notes: Approved and incorporated into the Advanced module on 2026-07-31.
  - type: other
    title: GitHub Brand Toolkit — Color
    url: 'https://brand.github.com/foundations/color'
    reviewedAt: '2026-07-29'
  - type: other
    title: GitHub Brand Toolkit — GitHub Copilot
    url: 'https://brand.github.com/brand-identity/copilot'
    reviewedAt: '2026-08-04'
    notes: >-
      Current product lockups may identify Copilot when authorized; the
      standalone Copilot icon has been deprecated since 2025. Mascot artwork
      remains prohibited for this workshop.
  - type: other
    title: GitHub Brand Toolkit — Iconography
    url: 'https://brand.github.com/graphic-elements/iconography'
    reviewedAt: '2026-07-29'
  - type: other
    title: GitHub Brand Toolkit — Logo
    url: 'https://brand.github.com/foundations/logo'
    reviewedAt: '2026-08-04'
    notes: >-
      Use only current official files for authorized purposes, secondary to
      workshop identity, without modification or implied endorsement. GitHub
      states that trademark and artwork use requires prior written permission
      outside listed authorized uses.
  - type: other
    title: Microsoft Brand Central
    url: 'https://brandcentral.microsoft.com/'
    reviewedAt: '2026-08-05'
    notes: >-
      Workshop owner supplied and authorized the official Microsoft logo for an
      unmodified native title-slide overlay.
  - type: other
    title: Work IQ overview
    url: >-
      https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/
    reviewedAt: '2026-08-12'
    notes: >-
      Defines Work IQ as a permission-aware workplace-intelligence layer and
      documents A2A, MCP, REST, tenant governance, and usage-based access.
  - type: other
    title: Microsoft Work IQ API
    url: >-
      https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/api-overview
    reviewedAt: '2026-08-12'
    notes: >-
      Verifies supported Microsoft 365 context, delegated authentication,
      existing permission and compliance boundaries, and the absence of
      application-only authentication.
  - type: other
    title: Work IQ MCP overview
    url: >-
      https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview
    reviewedAt: '2026-08-12'
    notes: >-
      Documents the remote MCP server and its governed, permission-dependent
      tool boundary.
  - type: other
    title: Connect GitHub Copilot CLI to the Work IQ MCP server
    url: >-
      https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/quickstart/github-copilot-cli
    reviewedAt: '2026-08-12'
    notes: >-
      Officially documents GitHub Copilot CLI as a Work IQ MCP client; this does
      not establish equivalent support in other GitHub Copilot surfaces.
  - type: other
    title: Enable your tenant for Work IQ
    url: >-
      https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/enable-work-iq
    reviewedAt: '2026-08-12'
    notes: >-
      Verifies tenant enablement, administrator setup, assigned-user, Azure, and
      usage-based billing prerequisites.
  - type: other
    title: Usage-Based Billing and Cost Management for Copilot Credits
    url: >-
      https://learn.microsoft.com/en-us/microsoft-365/copilot/usage-based-billing-overview-copilot-credits
    reviewedAt: '2026-08-12'
    notes: >-
      Verifies Work IQ API consumption through Copilot Credits and
      administrative spending controls; exact workshop pricing claims remain
      excluded.
  - type: other
    title: Announcing the new Work IQ APIs
    url: >-
      https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/02/announcing-the-new-work-iq-apis/
    reviewedAt: '2026-08-12'
    notes: >-
      Confirms Work IQ API general availability on June 16, 2026, and the
      workplace-context categories described in presenter notes.
  - type: other
    title: GitHub Brand Toolkit — Copilot
    url: 'https://brand.github.com/brand-identity/copilot'
    reviewedAt: '2026-08-04'
    notes: >-
      Duplicate source retained for historical provenance; current review
      confirms product-lockup use and standalone-icon deprecation.
  - type: other
    title: Visual Studio Code icons and names usage guidelines
    url: 'https://code.visualstudio.com/brand'
    reviewedAt: '2026-08-04'
    notes: >-
      The current blue stable icon is permitted in tutorials with required clear
      space. Do not use Insiders, Exploration, app, or vintage icons; do not
      redraw, modify, or combine the icon into a custom lockup.
  - type: other
    title: Sora 2 video generation overview
    url: >-
      https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/video-generation
    reviewedAt: '2026-07-30'
  - type: other
    title: What is GitHub Copilot?
    url: >-
      https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot
    reviewedAt: '2026-08-03'
    notes: Reviewed for Foundations surface terminology and availability caveats.
  - type: other
    title: Using Copilot cloud agent on GitHub Mobile
    url: >-
      https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-mobile
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for slide 20's narrowed start or assign and track boundary.
      Eligibility, repository policy, write access, and current Mobile build
      apply; clarification responses and an exact follow-up control remain
      unsupported.
  - type: other
    title: Starting GitHub Copilot sessions
    url: >-
      https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for starting a session with a selected repository and prompt.
      Optional branch, agent, and model choices vary, and a resulting pull
      request is not guaranteed by every start path.
  - type: other
    title: GitHub Mobile
    url: 'https://docs.github.com/en/get-started/using-github/github-mobile'
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for returning to the resulting pull request for human review.
      Pull-request evidence does not imply automatic acceptance, approval, merge
      readiness, or complete cloud-agent controls in Mobile.
  - type: other
    title: Using GitHub Copilot code review
    url: >-
      https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review
    reviewedAt: '2026-08-10'
    notes: >-
      Approved only as optional supporting evidence after Mobile pull-request
      review for an eligible user. Paid-plan, organization-policy, billing,
      repository, and runner requirements can apply; review is not automatic.
  - type: other
    title: About GitHub Copilot code review
    url: 'https://docs.github.com/en/copilot/concepts/agents/code-review'
    reviewedAt: '2026-08-10'
    notes: >-
      Approved to treat Copilot feedback as a separate evidence stream that
      requires human validation. A Copilot Comment review is not approval, and
      plan and policy eligibility do not guarantee availability in every path.
  - type: other
    title: About GitHub Copilot cloud agent
    url: >-
      https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for the current GitHub Copilot cloud agent name and paid-plan,
      eligible-GitHub-hosted-repository boundary. Do not infer universal
      repository access, release status, or Mobile control parity.
  - type: other
    title: Managing access to GitHub Copilot cloud agent
    url: >-
      https://docs.github.com/en/copilot/concepts/agents/cloud-agent/access-management
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for material administrator enablement, repository opt-out,
      Enterprise Managed User, organization policy, and write-access caveats.
      Plan eligibility alone does not authorize starting or steering work.
  - type: other
    title: GitHub Copilot CLI command reference
    url: >-
      https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    reviewedAt: '2026-08-12'
    notes: >-
      Approved for the Agentic security boundary and Advanced CLI surface
      boundary. Verifies /fleet, /tasks, /diff, and /session as Copilot CLI
      commands; CLI availability must not be generalized to IDE Chat, inline
      completions, or the Copilot App.
  - type: other
    title: Running tasks in parallel with the /fleet command
    url: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet'
    reviewedAt: '2026-08-12'
    notes: >-
      Approved for Advanced slide 7. Verifies Copilot CLI parallel subagent
      orchestration, independent-task fit, separate context windows, and
      increased AI-credit exposure; the page has no visible preview or GA label.
  - type: other
    title: Speeding up task completion with /fleet
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/speed-up-task-completion
    reviewedAt: '2026-08-12'
    notes: >-
      Approved for the native /fleet invocation and /tasks inspection path in
      Copilot CLI. It does not establish support in VS Code Chat, inline
      completions, or the Copilot App.
  - type: other
    title: About GitHub Copilot CLI
    url: >-
      https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
    reviewedAt: '2026-08-10'
    notes: >-
      Approved to identify GitHub Copilot CLI as a supported /security-review
      surface; plan availability does not override organization access policy or
      configuration.
  - type: other
    title: Working with agent sessions in the GitHub Copilot app
    url: >-
      https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions
    reviewedAt: '2026-08-12'
    notes: >-
      Approved for focused review of session, worktree, branch, pull-request,
      CI, and diff evidence in the app. Current app documentation does not
      document /fleet, so the Advanced module does not infer command parity from
      the app's CLI foundation.
  - type: other
    title: Slash commands for the GitHub Copilot app
    url: >-
      https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands
    reviewedAt: '2026-08-10'
    notes: >-
      Approved to bound /security-review to a documented app agent-session
      context; command availability depends on session context and the app
      workflow remains public preview.
  - type: other
    title: Push protection
    url: >-
      https://docs.github.com/en/code-security/concepts/secret-security/push-protection
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for the push-boundary claim covering detected supported secrets
      only; repository enablement, GitHub Secret Protection, patterns, settings,
      push path, and bypass behavior apply.
  - type: other
    title: Code scanning
    url: >-
      https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning
    reviewedAt: '2026-08-10'
    notes: >-
      Approved as separate repository evidence after configured events; setup,
      triggers, language and tool coverage, runners, plan, licensing, and
      Actions usage apply.
  - type: other
    title: Dependency review
    url: >-
      https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review
    reviewedAt: '2026-08-10'
    notes: >-
      Approved for applicable pull requests changing supported dependency files;
      dependency graph, ecosystem support, plan eligibility, and separate action
      configuration apply.
  - type: other
    title: Using the GitHub CLI Copilot extension
    url: 'https://docs.github.com/en/copilot/github-copilot-in-the-cli'
    reviewedAt: '2026-08-03'
    notes: >-
      Reviewed as a legacy/current CLI distinction; command-family decision
      remains open.
  - type: other
    title: Installing GitHub Copilot CLI
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli
    reviewedAt: '2026-08-03'
    notes: Reviewed for current CLI setup terminology and prerequisites.
  - type: other
    title: Managing context in GitHub Copilot CLI
    url: >-
      https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management
    reviewedAt: '2026-08-04'
    notes: >-
      Verified context composition, /context, /compact, automatic compaction
      near 80%, possible pause near 95%, checkpoint summaries, and fine-detail
      loss as CLI-specific behavior.
  - type: other
    title: Supported AI models in GitHub Copilot
    url: 'https://docs.github.com/en/copilot/reference/ai-models/supported-models'
    reviewedAt: '2026-08-05'
    notes: >-
      Previously verified optional larger-context behavior; rechecked current
      model names plus plan, surface, policy, and version-change caveats for the
      proposed Foundations slide 15 contract. Contract incorporation remains
      pending human approval.
  - type: other
    title: AI model comparison
    url: 'https://docs.github.com/en/copilot/reference/ai-models/model-comparison'
    reviewedAt: '2026-08-05'
    notes: >-
      Reviewed current task-area mappings, representative model names, Auto
      behavior, and paid-plan discount caveat for the proposed Foundations slide
      15 contract. Contract incorporation remains pending human approval.
  - type: other
    title: Comparing AI models using different tasks
    url: 'https://docs.github.com/en/copilot/tutorials/compare-ai-models'
    reviewedAt: '2026-08-05'
    notes: >-
      Reviewed the use-case-first comparison method and non-deterministic output
      boundary for the proposed Foundations slide 15 contract. Contract
      incorporation remains pending human approval.
  - type: other
    title: Optimizing your AI usage to maximize efficiency and reduce cost
    url: 'https://docs.github.com/en/copilot/tutorials/optimize-ai-usage'
    reviewedAt: '2026-08-04'
    notes: >-
      Verified lean-context, focused-session, compaction, cache-preservation,
      and larger-context cost guidance.
  - type: other
    title: About GitHub Copilot cloud agent
    url: >-
      https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent
    reviewedAt: '2026-08-03'
    notes: Verified cloud-agent capabilities and distinction from IDE agent mode.
  - type: other
    title: Use chat in VS Code
    url: 'https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode'
    reviewedAt: '2026-08-03'
    notes: >-
      Reviewed context references and chat/agent behavior; exact UI examples
      require release-specific recheck.
  - type: other
    title: Models and pricing for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
    reviewedAt: '2026-08-04'
    notes: >-
      Verified token categories, model-dependent pricing, and AI credit
      conversion.
  - type: other
    title: Usage-based billing for organizations and enterprises
    url: >-
      https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises
    reviewedAt: '2026-08-04'
    notes: Verified AI-credit coverage and plan-specific billing caveats.
  - type: other
    title: About Copilot auto model selection
    url: 'https://docs.github.com/en/copilot/concepts/models/auto-model-selection'
    reviewedAt: '2026-08-04'
    notes: >-
      Verified task-complexity and availability-aware routing, natural cache
      boundaries, and current paid-plan discount; universal lowest-cost wording
      remains unsupported.
  - type: other
    title: Monitoring GitHub AI Credits usage
    url: >-
      https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage
    reviewedAt: '2026-08-04'
    notes: >-
      Reviewed current Copilot settings, individual AI usage, organization
      scope, and supported IDE quota guidance.
  - type: other
    title: Canceling a GitHub Copilot CLI operation and rolling back changes
    url: >-
      https://docs.github.com/en/copilot/concepts/agents/copilot-cli/cancel-and-roll-back
    reviewedAt: '2026-08-03'
    notes: >-
      Verified rollback as a CLI-specific capability supporting reversibility
      guidance.
leaderboard:
  optional: true
  aliasOnly: true
  eventId: ghcp-dev-hack
  kitPath: artifacts/leaderboard-kit
  environments:
    test:
      repository: mfm-se-dev-org/ghcp-dev-hack-leaderboard
      submissionUrl: >-
        https://github.com/mfm-se-dev-org/ghcp-dev-hack-leaderboard/issues/new?template=leaderboard-submission.yml
      standingsUrl: 'https://expert-adventure-386owy8.pages.github.io/'
    production:
      repository: tammym-demos/ghcp-dev-hack-leaderboard
      submissionUrl: >-
        https://github.com/tammym-demos/ghcp-dev-hack-leaderboard/issues/new?template=leaderboard-submission.yml
      standingsUrl: 'https://tammym-demos.github.io/ghcp-dev-hack-leaderboard/'
lastReviewed: '2026-09-10'
---
# GitHub Copilot Developer Hack

This workshop moves from effective everyday assistance to agentic development and advanced repository workflows.
