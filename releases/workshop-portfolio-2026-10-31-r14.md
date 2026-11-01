---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-10-31-r14
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 5df279fc34f914763c9689b5fc43619d8004b938
createdAt: '2026-10-31T19:02:36.098Z'
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
  - id: modernization-with-copilot
    modules:
      - modernization-kickoff
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
approvedAt: '2026-10-31T18:51:30.147Z'
---

# GitHub Copilot Workshops portfolio release

Tammy McClellan accepted the private test site and authorized production
promotion of exact source commit `5df279fc34f914763c9689b5fc43619d8004b938`
for the complete eight-workshop portfolio. This retains all seven r13
workshops and adds Modernizing the Unknown with GitHub Copilot.

## Private test evidence

- Private test URL and approver evidence are retained in the private
  immutable test-approval records.
- Successful private build and deployment run: `41222865150`.
- Pages deployment: `7461696977`, with successful status for the exact commit.
- The authenticated Pages artifact verified source provenance and required
  workshop routes. The main workflow passed type checking, tests, content
  validation, the complete site build, and built-route verification.
- Canonical test-approval commands recorded immutable approvals for all five
  lifecycle-v3 workshops against this same commit. The three lifecycle-v2
  workshops remain part of the same owner-approved portfolio.
- The owner accepted this tested snapshot with a documentation-only
  alternate-image provenance correction deferred. The selected slide 2 image
  is unchanged.

## Promotion boundary and rollback

Export only the pinned source in a detached worktree. Approval-record and
manifest merges do not change the approved content snapshot. Production must
serve this release id and source commit, and selected portal and deck routes
must pass automated verification.

Preserve verified
[portfolio r13](./workshop-portfolio-2026-10-29-r13.md) and its source commit
`17424a729d5d91e89d131728ca91c773b1960135` unchanged as the rollback target.
Automated production verification records evidence; it is not another human
approval.
