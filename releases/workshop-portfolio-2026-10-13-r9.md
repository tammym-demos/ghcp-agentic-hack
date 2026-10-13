---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-10-13-r9
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 75ecc4af415dfe51e23f0c8b90b784e85f2fd71c
createdAt: '2026-10-13T19:13:31.641Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
  - id: mission-control-executive
    modules:
      - executive-decision-briefing
  - id: mission-control
    modules:
      - copilot-value-lab
  - id: token-optimization
    modules:
      - token-optimization-essentials
  - id: workflow-first-ai-decisions
    modules:
      - workflow-opportunity-briefing
approvedBy: Tammy McClellan
approvedAt: '2026-10-13T19:14:11.890Z'
---

# GitHub Copilot Workshops portfolio release

This release promotes the complete private test catalog at source commit
`75ecc4af415dfe51e23f0c8b90b784e85f2fd71c`.

## Test evidence

- Private test URL: `https://automatic-adventure-o8r86o9.pages.github.io/`
- Private deployment workflow: `38447513769`
- The deployed Pages artifact reports the exact source commit above and
  `dirty: false`.
- All 19 routes declared by the deployed artifact are present.
- The private build passed type checking, tests, content validation, the full
  static build, route verification, and deployment.

## Selected scope

- GitHub Copilot Developer Hack: Foundations, Agentic, and Advanced.
- Mission Control: Executive AI Value Decision Briefing.
- Mission Control: AI Development Governance and Value Realization.
- Token Optimization: Get More Verified Progress from Every AI Credit.
- Workflow First: Making Better Automation and AI Decisions.

## Decision boundary

Test approval authorizes production promotion of only the exact commit pinned
by this manifest. Production verification is automated evidence, not another
human approval.
