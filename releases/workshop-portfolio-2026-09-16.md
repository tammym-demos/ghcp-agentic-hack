---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-09-16
title: GitHub Copilot Workshops portfolio sanitization release
status: approved
commit: add4d0d458f36b3494b1a866ce18d87e65ee9164
createdAt: '2026-09-16T13:47:10.409Z'
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
approvedAt: '2026-09-16T13:50:03.703Z'
---

# GitHub Copilot Workshops portfolio sanitization release

## Scope

This release preserves the complete production portfolio while removing the
customer name from Mission Control participant and governing content:

- GitHub Copilot Developer Hack: Foundations, Agentic, and Advanced.
- Mission Control: The Copilot Value.
- The responsive portfolio landing page and both workshop routes.

## Review evidence

- Private PR #81 merged to `main` at pinned commit
  `add4d0d458f36b3494b1a866ce18d87e65ee9164`.
- All exact `CSX` references were replaced with generic current-state
  optimization wording across slides, speaker notes, the source contract,
  manifest, workshop agenda, contract test, and review evidence.
- The regression contract prevents the customer name from reappearing in
  participant or governing content.
- `pnpm.cmd test:mission-control` passed 10/10 tests.
- `pnpm.cmd review:module mission-control copilot-value-lab` completed,
  including content validation, production build, and route verification.
- The manifest retains the already-published Developer Hack workshop so the
  production catalog does not regress to a single-workshop export.

## Approval boundary

This draft does not authorize deployment. Explicit human release approval must
be recorded before validation, push, private pull request, or promotion
dispatch. Public pull-request merge, deployment, and live provenance
verification remain separate observable steps.
