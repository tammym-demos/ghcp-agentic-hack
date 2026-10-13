---
schemaVersion: 1
id: token-optimization
title: 'Token Optimization: Get More Verified Progress from Every AI Credit'
status: draft
kind: workshop
description: >-
  A one-hour lecture on how tokens, context, caching, model choice, workflow
  shape, and usage controls determine GitHub Copilot AI Credit consumption, with
  a lead and admin view.
format: one-hour
duration: 60 minutes
totalMinutes: 60
level: mixed
audience:
  - Software developers and technical leads
  - Engineering leads and Copilot administrators
prerequisites: []
modules:
  - token-optimization-essentials
tags:
  - github-copilot
researchSources:
  - type: other
    title: Optimizing your AI usage to maximize efficiency and reduce cost
    url: 'https://docs.github.com/en/copilot/tutorials/optimize-ai-usage'
    reviewedAt: '2026-10-09'
    notes: Source register id OPT-01 in token-optimization-source.md.
  - type: other
    title: Models and pricing for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
    reviewedAt: '2026-10-09'
    notes: Source register id SRC-02 in token-optimization-source.md.
  - type: other
    title: Setting an AI credit session limit in GitHub Copilot CLI
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
    reviewedAt: '2026-10-09'
    notes: Source register id SRC-03 in token-optimization-source.md.
  - type: other
    title: Usage-based billing for individuals
    url: >-
      https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals
    reviewedAt: '2026-10-09'
    notes: Source register id SRC-04 in token-optimization-source.md.
  - type: other
    title: Supported AI models in GitHub Copilot
    url: 'https://docs.github.com/en/copilot/reference/ai-models/supported-models'
    reviewedAt: '2026-10-09'
    notes: Source register id SRC-05 in token-optimization-source.md.
  - type: other
    title: About Copilot auto model selection
    url: 'https://docs.github.com/en/copilot/concepts/models/auto-model-selection'
    reviewedAt: '2026-10-09'
    notes: Source register id SRC-06 in token-optimization-source.md.
  - type: other
    title: Monitoring your GitHub AI Credits usage
    url: >-
      https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/monitor-ai-usage
    reviewedAt: '2026-10-09'
    notes: Source register id SRC-07 in token-optimization-source.md.
  - type: github-changelog
    title: Claude Haiku 5.5 in GitHub Copilot (2026-10-07)
    url: >-
      https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/
    reviewedAt: '2026-10-09'
    notes: Source register id CHG-01 in token-optimization-source.md.
  - type: github-changelog
    title: HydraFusion in VS Code and the GitHub Copilot app (2026-09-30)
    url: >-
      https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app/
    reviewedAt: '2026-10-09'
    notes: Source register id CHG-02 in token-optimization-source.md.
  - type: github-changelog
    title: Discover local models in GitHub Copilot CLI (2026-10-07)
    url: >-
      https://github.blog/changelog/2026-10-07-discover-local-models-in-github-copilot-cli/
    reviewedAt: '2026-10-09'
    notes: Source register id CHG-03 in token-optimization-source.md.
  - type: github-changelog
    title: 'Copilot code review: API support and new default effort level (2026-10-02)'
    url: >-
      https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/
    reviewedAt: '2026-10-09'
    notes: Source register id CHG-04 in token-optimization-source.md.
lastReviewed: '2026-10-12'
---
# Token Optimization: Get More Verified Progress from Every AI Credit

A one-hour lecture on how tokens, context, caching, model choice, workflow shape, and usage controls determine GitHub Copilot AI Credit consumption, with a lead and admin view.

## Outcomes

- Explain what a token is, what the harness sends on each request, and how input, output, reasoning, and cached tokens relate to AI Credits.
- Keep context lean using fresh sessions, compaction, a short instruction map, and a scoped tool set.
- Preserve the cache and name the actions that invalidate it.
- Choose model, reasoning level, Auto, subagent models, and multi-model options by task instead of by habit.
- Shape work as research, plan, then implement with deterministic guardrails.
- Measure and cap usage with session limits, chronicle cost tips, and usage views, and describe the lead and admin controls.
