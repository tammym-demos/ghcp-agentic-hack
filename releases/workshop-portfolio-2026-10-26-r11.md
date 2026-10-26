---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-10-26-r11
title: GitHub Copilot Workshops portfolio release
status: approved
commit: adcc29e082405bb3ba948aadc7d8a112e6928480
createdAt: '2026-10-26T19:50:58.059Z'
workshops:
  - id: ghcp-agentic-hack
    modules:
      - foundations
      - agentic
      - advanced
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
  - id: purrmission-to-proceed
    modules:
      - purrmission-to-proceed
  - id: token-optimization
    modules:
      - token-optimization-essentials
  - id: workflow-first-ai-decisions
    modules:
      - workflow-opportunity-briefing
approvedBy: Tammy McClellan
approvedAt: '2026-10-26T19:50:58.059Z'
---

# GitHub Copilot Workshops portfolio release

This release preserves the complete seven-workshop selection from r10 and
advances its exact source commit to
`adcc29e082405bb3ba948aadc7d8a112e6928480`. It includes the rebuilt GHCP Agentic
Hack, Purrmission to Proceed, and the line-ending-independent sidecar hash fix
from #121. The failed r10 snapshot remains unchanged.

## Test evidence

- Private test URL: `https://automatic-adventure-o8r86o9.pages.github.io/`
- Private deployment workflow: `40199803373`, attempt 2
- Deployed source commit: `adcc29e082405bb3ba948aadc7d8a112e6928480`
- The exact-commit workflow was rerun to regenerate its expired Pages artifact.
  Its type checking, tests, content validation, full build, route verification,
  and Pages deployment succeeded.
- Tammy McClellan explicitly approved this exact private-site commit for
  production in the October 26 recovery session.
- Canonical `pnpm content approve test` commands verified the active deployment,
  workflow logs, artifact provenance, and required routes, then recorded
  immutable approvals for GHCP Agentic Hack, Purrmission to Proceed, Token
  Optimization, and Workflow First.
- Individual manifests created by those commands were consolidated into this
  portfolio manifest so promotion retains all seven workshops.

## Selected scope

- GitHub Copilot Developer Hack: Foundations, Agentic, and Advanced.
- GitHub Copilot Developer Hack (legacy): Foundations, Agentic, and Advanced.
- Mission Control: Executive AI Value Decision Briefing.
- Mission Control: AI Development Governance and Value Realization.
- Purrmission to Proceed: Security, Evidence, and Guardrails from Planning to
  Deployment.
- Token Optimization: Get More Verified Progress from Every AI Credit.
- Workflow First: Making Better Automation and AI Decisions.

Test approval authorizes production promotion of only the exact commit pinned
by this manifest. Recovery-branch merges do not change the exported snapshot.
Production verification is automated evidence, not another human approval.
