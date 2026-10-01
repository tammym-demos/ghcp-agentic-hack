---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-10-01-r8
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 4d690f1d952a009e73147b8fbf7782b62039363d
createdAt: '2026-10-01T16:58:25.571Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
  - id: mission-control
    modules:
      - copilot-value-lab
  - id: mission-control-executive
    modules:
      - executive-decision-briefing
approvedBy: Tammy McClellan
approvedAt: '2026-10-01T17:06:29.740Z'
---

# GitHub Copilot Workshops portfolio release

This approved manifest succeeds, but does not alter or dispatch, the four-module
`workshop-portfolio-2026-09-24-r7` manifest. It was prepared from a clean
`origin/main` at `4d690f1d952a009e73147b8fbf7782b62039363d`, which
includes the merged three-component Executive public-export correction in
PR #104.

## Selected scope

- GitHub Copilot Developer Hack: Foundations, Agentic, Advanced.
- Mission Control: AI Development Governance and Value Realization:
  `copilot-value-lab` (48 slides).
- Mission Control: Executive AI Value Decision Briefing:
  `executive-decision-briefing` (12 slides, 45 minutes).

## Local review boundary

The workshop owner accepted this five-module **local candidate** at reviewed
content commit `c023f05` plus PR #104's public-export fix. Earlier review
reported successful `pnpm validate`, `pnpm typecheck`, focused release and
module contract tests, a complete production-shaped local build with five
deck routes, and a full 12-slide Executive Edge visual review with no
failures, external requests, or HTTP errors. Only the public-export
declarations and their regression tests differ between `c023f05` and this
manifest's pinned commit; workshop content is unchanged.

A draft-safe catalog selection and public-export plan at the pinned commit
resolved all five modules and 36 declared runtime files, including all three
Executive Vue components, plus two declared tests. These checks do not
constitute a sanitized public export or a production deployment.

## Decision boundary

Local-candidate acceptance is recorded as MCE-D84 in the Executive decision
log. The workshop owner separately approved this exact r8 release in MCE-D85
after reviewing the draft with SHA256
`a9cd6b782ef32dedb0157544a0c5a5f68343b1c6ab0f32e9b55e838ce0f55949`,
the pinned commit, and all five selected modules. The `approved` status records
only that human release decision. No private branch push or PR, public export
or promotion, dispatch, public PR merge, deployment, publication, or verified
outcome was authorized or performed by this approval.
