---
schemaVersion: 1
id: ghcp-agentic-hack
title: GitHub Copilot Developer Hack
status: draft
kind: workshop
description: >-
  First Week at the Accountable Engineering Bureau: onboard to coding agent
  harnesses, ship a feature across the full SDLC with Purrmission's planning and
  security gates, and master LLM internals, KV prefix caching, and multi-agent
  scale.
format: one-day
duration: 7 hours 4 minutes
totalMinutes: 424
defaultDeliveryVariant: two-day
deliveryVariants:
  - id: one-day
    title: GitHub Copilot Developer Workshop (1 Day)
    description: >-
      Complete the three SDLC learning modules and Agent Mergewell missions in
      one focused day.
    days:
      - id: day-one
        title: GitHub Copilot Developer Workshop
        start: '09:00'
        end: '16:04'
        agenda:
          - id: executive-kickoff
            type: kickoff
            title: Executive kickoff
            start: '09:00'
            end: '09:15'
          - id: foundations-content
            type: module-content
            title: >-
              Foundations: Coding agent harnesses, slash commands, tools,
              permissions, tokens, and usage controls
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
            title: >-
              Mission: Operate the harness, inspect context & usage, and enforce
              permissions
            start: '10:47'
            end: '11:32'
            module: foundations
          - id: agentic-content-one
            type: module-content
            title: >-
              Agentic SDLC: Holistic planning, Spec & ADR, the 4 Planning
              Proofs, and project customization
            start: '11:32'
            end: '12:00'
            module: agentic
          - id: lunch
            type: lunch
            title: Lunch
            start: '12:00'
            end: '12:45'
          - id: agentic-content-two
            type: module-content
            title: >-
              Agentic SDLC: Test-driven loops, 4 Security & Review Lenses,
              CI/CD, and exact-commit release
            start: '12:45'
            end: '13:34'
            module: agentic
          - id: agentic-mission
            type: mission
            title: 'Mission: Plan, build, verify, and prepare a feature for release'
            start: '13:34'
            end: '14:19'
            module: agentic
          - id: advanced-content-one
            type: module-content
            title: >-
              Advanced Workflows: How LLMs and KV prefix caches work under the
              hood, subagents, /fleet, and worktrees
            start: '14:19'
            end: '15:04'
            module: advanced
          - id: afternoon-break
            type: break
            title: Break
            start: '15:04'
            end: '15:19'
          - id: advanced-content-two
            type: module-content
            title: >-
              Advanced Workflows: Work IQ MCP, indirect prompt-injection
              defense, and scale operations
            start: '15:19'
            end: '15:34'
            module: advanced
          - id: advanced-mission
            type: mission
            title: >-
              Mission: Trace LLM probabilities, block prompt injection, and
              integrate parallel work
            start: '15:34'
            end: '16:04'
            module: advanced
  - id: two-day
    title: GitHub Copilot Developer Hack (2 Day)
    description: >-
      Complete the full SDLC learning day, then apply the practices during a
      team hack day and project readout.
    days:
      - id: day-one
        title: GitHub Copilot Developer Workshop
        start: '09:00'
        end: '16:04'
        agenda:
          - id: executive-kickoff
            type: kickoff
            title: Executive kickoff
            start: '09:00'
            end: '09:15'
          - id: foundations-content
            type: module-content
            title: >-
              Foundations: Coding agent harnesses, slash commands, tools,
              permissions, tokens, and usage controls
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
            title: >-
              Mission: Operate the harness, inspect context & usage, and enforce
              permissions
            start: '10:47'
            end: '11:32'
            module: foundations
          - id: agentic-content-one
            type: module-content
            title: >-
              Agentic SDLC: Holistic planning, Spec & ADR, the 4 Planning
              Proofs, and project customization
            start: '11:32'
            end: '12:00'
            module: agentic
          - id: lunch
            type: lunch
            title: Lunch
            start: '12:00'
            end: '12:45'
          - id: agentic-content-two
            type: module-content
            title: >-
              Agentic SDLC: Test-driven loops, 4 Security & Review Lenses,
              CI/CD, and exact-commit release
            start: '12:45'
            end: '13:34'
            module: agentic
          - id: agentic-mission
            type: mission
            title: 'Mission: Plan, build, verify, and prepare a feature for release'
            start: '13:34'
            end: '14:19'
            module: agentic
          - id: advanced-content-one
            type: module-content
            title: >-
              Advanced Workflows: How LLMs and KV prefix caches work under the
              hood, subagents, /fleet, and worktrees
            start: '14:19'
            end: '15:04'
            module: advanced
          - id: afternoon-break
            type: break
            title: Break
            start: '15:04'
            end: '15:19'
          - id: advanced-content-two
            type: module-content
            title: >-
              Advanced Workflows: Work IQ MCP, indirect prompt-injection
              defense, and scale operations
            start: '15:19'
            end: '15:34'
            module: advanced
          - id: advanced-mission
            type: mission
            title: >-
              Mission: Trace LLM probabilities, block prompt injection, and
              integrate parallel work
            start: '15:34'
            end: '16:04'
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
  - sdlc
researchSources:
  - type: other
    title: What is GitHub Copilot?
    url: >-
      https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot
    reviewedAt: '2026-10-23'
    notes: >-
      Verified supported IDE, terminal, desktop app, web, and mobile harness
      surfaces.
  - type: other
    title: Optimizing your AI usage to maximize efficiency and reduce cost
    url: 'https://docs.github.com/en/copilot/tutorials/optimize-ai-usage'
    reviewedAt: '2026-10-23'
    notes: >-
      Verified token categories, lean context, prompt caching, model selection,
      session limits, chronicle, and research-plan-implement habits.
  - type: other
    title: Models and pricing for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
    reviewedAt: '2026-10-23'
    notes: >-
      Verified GitHub AI Credits conversion, cached-token accounting, and
      separate GitHub Actions meter.
  - type: other
    title: Setting an AI credit session limit in GitHub Copilot CLI
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
    reviewedAt: '2026-10-23'
    notes: >-
      Verified /limits set and --max-ai-credits soft session limits (minimum 30
      AI credits).
  - type: other
    title: Content exclusion for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
    reviewedAt: '2026-10-23'
    notes: >-
      Verified content exclusions GA in Copilot CLI and App and exclusion limits
      in VS Code Agent and Edit modes.
  - type: github-changelog
    title: 'Agent Plugins 1.0 in VS Code, Copilot CLI, and the Copilot app'
    url: >-
      https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app
    reviewedAt: '2026-10-23'
    notes: >-
      Verified portable skills and MCP packaging alongside namespaced agents and
      hooks.
  - type: github-changelog
    title: GitHub Copilot app Customize tab is generally available
    url: >-
      https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available
    reviewedAt: '2026-10-23'
    notes: >-
      Verified centralized MCP, plugins, skills, and canvases management in the
      Copilot app.
  - type: github-changelog
    title: HydraFusion in VS Code and the GitHub Copilot app
    url: >-
      https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app/
    reviewedAt: '2026-10-23'
    notes: 'Verified research-preview multi-model Single, Cascade, and Critique modes.'
  - type: github-changelog
    title: 'Copilot code review: API support and new default effort level'
    url: >-
      https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/
    reviewedAt: '2026-10-23'
    notes: Verified Balanced default review effort since 2026-09-28 and Lite option.
  - type: github-changelog
    title: Claude Haiku 5.5 in GitHub Copilot
    url: >-
      https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/
    reviewedAt: '2026-10-23'
    notes: >-
      Verified GA lightweight model fit for subagents, quick edits, and terminal
      tasks.
  - type: github-changelog
    title: Discover local models in GitHub Copilot CLI
    url: >-
      https://github.blog/changelog/2026-10-07-discover-local-models-in-github-copilot-cli/
    reviewedAt: '2026-10-23'
    notes: Verified /model discovery of Ollama local models in Copilot CLI.
readinessGuide:
  title: Two-day hackathon readiness guide
  path: artifacts/customer/customer-hackathon-readiness-checklist.html
  deliveryVariant: two-day
leaderboard:
  optional: true
  aliasOnly: true
  eventId: ghcp-agentic-hack
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
lastReviewed: '2026-10-23'
---
# GitHub Copilot Developer Hack

First Week at the Accountable Engineering Bureau: onboard to coding agent harnesses, ship a feature across the full SDLC with Purrmission's planning and security gates, and master LLM internals, KV prefix caching, and multi-agent scale.

## Outcomes

- Operate GitHub Copilot harnesses across VS Code, Copilot CLI, Copilot App, and GitHub Cloud/Mobile using built-in agents, slash commands, tools, skills, and least-privilege permissions.
- Control token and GitHub AI Credit consumption through usage receipts, context window hygiene, prefix-cache preservation, model routing, and session limits.
- Execute an end-to-end SDLC workflow from holistic planning and the Four Planning Proofs through test-driven agentic development, the Four Security Evidence Lenses, CI/CD, and exact-commit release management.
- Explain how LLMs and KV prefix caches work under the hood and apply that architecture to subagents, parallel CLI /fleet and Git worktrees, indirect prompt-injection defense, and scale debugging.
