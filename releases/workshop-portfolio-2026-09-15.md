---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-09-15
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 5fc8b26db30e499c7182ba97aa50e946c84b994a
createdAt: '2026-09-15T21:58:43.599Z'
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
approvedAt: '2026-09-15T22:02:20.428Z'
---

# GitHub Copilot Workshops portfolio release

## Scope

This release preserves the complete production portfolio while updating Mission
Control to the merged **Mission Control: The Copilot Value** decision workshop:

- GitHub Copilot Developer Hack: Foundations, Agentic, and Advanced.
- Mission Control: The Copilot Value.
- The responsive portfolio landing page and both workshop routes.

## Review evidence

- Mission Control PR #79 merged to private `main` at pinned commit
  `5fc8b26db30e499c7182ba97aa50e946c84b994a`.
- The workshop owner reviewed the revised 22-slide deck and accepted its title,
  opening treatment, agenda, teaching content, and removal of the redundant
  reading dialog.
- `pnpm.cmd review:module mission-control copilot-value-lab` completed against
  the merged commit, including content validation, production build, and route
  verification.
- The manifest retains the already-published Developer Hack workshop so the
  production catalog does not regress to a single-workshop export.

## Approval boundary

The workshop owner requested production promotion of this exact pinned
portfolio. Deployment dispatch, public pull-request merge, live provenance
verification, and outcome verification remain observable steps in the release
process rather than inferred results.
