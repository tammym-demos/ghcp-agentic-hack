---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-09-14
title: GitHub Copilot Workshops portfolio release
status: approved
commit: db88fe353778d0fe31eb71365523071254488e76
createdAt: '2026-09-15T02:13:22.287Z'
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
approvedAt: '2026-09-15T02:14:11.060Z'
---

# GitHub Copilot Workshops portfolio release

## Correction and scope

This approved release corrects `ghcp-dev-hack-2026-09-14`, whose manifest
intentionally filtered the public export to `ghcp-dev-hack` only. That
filtering removed Mission Control from the production catalog and prevented
the Mission Control-dependent landing-page sections from rendering, even
though the corresponding source was present on private `main`.

This portfolio manifest includes the complete production-shaped catalog shown
on the private test site:

- GitHub Copilot Developer Hack: Foundations, Agentic, and Advanced.
- Mission Control: The Copilot Value Lab.
- The current responsive portfolio landing page, including Mission Control
  prioritization and the Mission Control team section.

## Local review evidence

- The workshop owner explicitly accepted the exact current Mission Control
  workshop and 22-slide deck as the local release candidate on 2026-09-14 EDT.
- Mission Control decision `mc-d08-local-release-candidate` records that
  acceptance without inferring production release or deployment approval.
- `pnpm review:slides -- --prepare-only` completed the production-shaped build
  from the pinned commit.
- The generated production catalog contains both `ghcp-dev-hack` and
  `mission-control`.
- The build contains the portfolio root, both workshop routes, the Mission
  Control module route, and the Mission Control landing-team content.
- The preceding `ghcp-dev-hack-2026-09-14` release remains a valid verified
  rollback target.

## Approval boundary

Tammy McClellan approved this exact two-workshop portfolio release on
2026-09-14 EDT. Manifest commit, deployment dispatch, public pull-request
merge, and live exact-provenance verification remain separate actions.
