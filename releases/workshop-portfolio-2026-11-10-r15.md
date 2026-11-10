---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-11-10-r15
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 34e39a66a79242652ef976c869f28dbd8f93bcce
createdAt: '2026-11-10T04:44:04.722Z'
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
approvedAt: '2026-11-10T04:44:21.591Z'
---

# GitHub Copilot Workshops portfolio release

This draft pins the complete eight-workshop portfolio to private-test source
commit `34e39a66a79242652ef976c869f28dbd8f93bcce`. It is not dispatchable until
the release is approved, committed, and validated.

## Private test evidence

- Private test URL: https://automatic-adventure-o8r86o9.pages.github.io/
- Source commit: `34e39a66a79242652ef976c869f28dbd8f93bcce`
- Successful private build and deployment run: [42753189650](https://github.com/mfm-se-dev-org/ghcp-video-content/actions/runs/42753189650).
- GitHub Pages deployment `7673245778` reports success for the exact source
  commit. The run passed typecheck, tests, content validation, full-site build,
  and built-route verification.
- Exact-commit test approvals are recorded for all five lifecycle-v3 workshops.
  The complete eight-workshop site was accepted as the private test snapshot.

## Promotion boundary and rollback

Export only the pinned source in a detached worktree. Production must serve
this release id and source commit, and selected portal and deck routes must
pass automated verification.

Preserve verified
[portfolio r14](./workshop-portfolio-2026-10-31-r14.md) and its source commit
`5df279fc34f914763c9689b5fc43619d8004b938` unchanged as the rollback target.
Automated production verification records evidence; it is not another human
approval.
