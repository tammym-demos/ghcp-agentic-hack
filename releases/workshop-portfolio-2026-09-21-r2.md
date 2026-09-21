---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-09-21-r2
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 18b7aee6bfd1c53854ac2025abeea102b907a77a
createdAt: '2026-09-21T14:50:22.752Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
  - id: mission-control
    modules:
      - copilot-value-lab
approvedBy: Tammy McClellan
approvedAt: '2026-09-21T16:10:22.908Z'
---

# GitHub Copilot Workshops portfolio release

## Scope

This replacement candidate preserves the complete production portfolio:

- GitHub Copilot Developer Hack: Foundations, Agentic, and Advanced.
- Mission Control: AI Development Governance and Value Realization.
- The responsive portfolio landing page and both workshop routes.

## Corrective evidence

- It is pinned to clean maintenance commit
  `18b7aee6bfd1c53854ac2025abeea102b907a77a`, which declares all seven
  Mission Control runtime animation components in the sanitized public export.
- Dispatch normalizes Windows manifest separators before sending the workflow
  input to a Linux runner.
- Focused export/release tests pass 39/39 with three platform skips; full
  repository tests, type checking, content validation and the complete private
  portfolio build pass.
- An isolated synthetic invocation of the real pinned exporter passed frozen
  installation, type checking, 261 portable tests with three platform skips,
  validation of both workshops and the complete sanitized public build.
- The existing Developer Hack workshop remains selected so the production
  catalog cannot regress to a single-workshop export.
- Failed promotion runs `35613637935` and `35613746530` created no public
  release branch, public pull request or deployment.

## Approval boundary

Tammy McClellan approved this exact replacement manifest on 2026-09-21. This
records the release decision only; release-branch push, private pull request,
another promotion dispatch, public pull-request approval/merge, deployment and
live provenance verification remain separate.
