---
schemaVersion: 1
id: purrmission-to-proceed
title: >-
  Purrmission to Proceed: Security, Evidence, and Guardrails from Planning to
  Deployment
status: draft
kind: workshop
description: >-
  A 45-minute narrative-driven session starring Purrmission, Agent Mergewell,
  and Riley Relay on what planning evidence must be true before you trust agent
  work, how to configure and verify Copilot harness controls, and how
  /security-review, GitHub Advanced Security, Copilot Code Review, and
  deployment guardrails protect production.
format: custom
duration: 45 minutes
totalMinutes: 45
level: mixed
audience:
  - Software developers and technical leads
  - 'Security-minded reviewers, engineering managers, and Copilot administrators'
prerequisites: []
modules:
  - purrmission-to-proceed
tags:
  - github-copilot
researchSources:
  - type: other
    title: Content exclusion for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
    reviewedAt: '2026-10-23'
    notes: >-
      Exclusions are surface-specific and do not apply in VS Code Agent or Edit
      modes; not runtime filesystem controls.
  - type: other
    title: Managing context for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/concepts/prompting-and-context/context-management
    reviewedAt: '2026-10-23'
    notes: >-
      Context accumulates and may be compacted; cache invalidation and context
      availability are distinct concerns.
  - type: other
    title: Setting an AI credit session limit in GitHub Copilot CLI
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
    reviewedAt: '2026-10-23'
    notes: >-
      The CLI limit is soft; an in-progress response may finish above the
      configured amount. Cost control, not permission enforcement.
  - type: other
    title: Code scanning with CodeQL
    url: >-
      https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning
    reviewedAt: '2026-10-23'
    notes: >-
      Analysis depends on supported languages, configured query suites, database
      extraction, and available framework/data-flow models.
  - type: other
    title: Push protection
    url: >-
      https://docs.github.com/en/code-security/concepts/secret-security/push-protection
    reviewedAt: '2026-10-23'
    notes: >-
      Blocks detected secrets when enabled; bypass is possible and produces
      configured audit/alert evidence.
  - type: other
    title: Supported secret scanning patterns
    url: >-
      https://docs.github.com/en/code-security/reference/secret-security/supported-secret-scanning-patterns
    reviewedAt: '2026-10-23'
    notes: >-
      Pattern support and push protection coverage vary; a successful push is
      not proof that no secret was exposed.
  - type: other
    title: Available rules for rulesets
    url: >-
      https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
    reviewedAt: '2026-10-23'
    notes: >-
      Code Owner review requires an explicit ruleset or branch protection
      setting; review applies to covered paths and is affected by bypass
      permissions.
  - type: other
    title: Git worktree
    url: 'https://git-scm.com/docs/git-worktree'
    reviewedAt: '2026-10-23'
    notes: >-
      A worktree separates working directories but does not establish process,
      filesystem, credential, or network isolation.
lastReviewed: '2026-10-23'
---
# Purrmission to Proceed: Security, Evidence, and Guardrails from Planning to Deployment

A 45-minute narrative-driven session starring Purrmission, Agent Mergewell, and Riley Relay on what planning evidence must be true before you trust agent work, how the Copilot harness enforces AI safety, and how /security-review, GitHub Advanced Security, Copilot Code Review, and deployment guardrails protect production.

## Outcomes

- Demand four concrete planning proofs—scope boundaries, verified loaded instructions, negative behavioral checks, and hard stop conditions—before trusting agent output.
- Configure and verify the four Copilot harness rings (instructions, least-privilege tools and MCP, execution workspace with any explicit runtime isolation, and applicable guardrails) to reduce prompt-injection risk and manage context drift.
- Combine four complementary security evidence lenses (/security-review, Secret Scanning Push Protection, CodeQL + Dependency Review, and Copilot Code Review + Autofix) without letting an agent self-certify.
- Enforce repository rulesets, CODEOWNERS human approval, exact-commit release promotion, and verified rollback from pull request to production deployment.
