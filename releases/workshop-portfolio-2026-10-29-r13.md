---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-10-29-r13
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 17424a729d5d91e89d131728ca91c773b1960135
createdAt: '2026-10-29T20:49:57.687Z'
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
approvedAt: '2026-10-29T20:41:26.512Z'
---

# GitHub Copilot Workshops portfolio release

Tammy McClellan confirmed approval of private-test commit
`17424a729d5d91e89d131728ca91c773b1960135` and authorized production promotion
of the full seven-workshop portfolio on October 29. This manifest preserves
the r12 workshop and module selection while advancing its exact source commit.
It includes the account-free shared Azure leaderboard, practical harness-first
missions, Copilot Fusion updates, and catalog changes through #131.

## Private test evidence

- Private test URL: https://automatic-adventure-o8r86o9.pages.github.io/
- Workflow: https://github.com/mfm-se-dev-org/ghcp-video-content/actions/runs/40762223168
- Exact deployed source: `17424a729d5d91e89d131728ca91c773b1960135`
- Attempt 2 regenerated the expired Pages artifact without changing the source
  commit. Type checking, tests, content validation, the complete review build,
  built-route verification, artifact upload, and Pages deployment succeeded.
- The canonical `pnpm content approve test <workshop-id> --approver
  "Tammy McClellan" --url https://automatic-adventure-o8r86o9.pages.github.io/`
  command verified authenticated active deployment status, workflow steps,
  deployment logs, artifact provenance, and required module routes for
  `ghcp-agentic-hack`, `purrmission-to-proceed`, `token-optimization`, and
  `workflow-first-ai-decisions`.
- Those commands recorded mutable and immutable exact-commit approvals. Their
  single-workshop manifests are consolidated here to retain all seven workshops.

## Promotion boundary and rollback

Export only the pinned source in a detached worktree. Approval-record and
manifest merges do not change the approved content snapshot. Production must
serve this release id and source commit, and all selected portal and deck
routes must pass automated verification.

Preserve the verified r12 manifest and source
`71d3de2511b2b1971f3f9500dee764b7a74b5de5` unchanged as a rollback target.
Record deployment and verification evidence after promotion. Automated
verification is not another human approval.
