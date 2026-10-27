---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-10-26-r12
title: GitHub Copilot Workshops portfolio release
status: approved
commit: 71d3de2511b2b1971f3f9500dee764b7a74b5de5
createdAt: '2026-10-26T23:51:37.011Z'
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
approvedAt: '2026-10-27T00:15:14.657Z'
---

# GitHub Copilot Workshops portfolio release

This approved manifest preserves the complete seven-workshop selection from r11
and pins the recovered artwork and slide-formatting repairs from #124 to
`71d3de2511b2b1971f3f9500dee764b7a74b5de5`. Tammy McClellan explicitly approved
this exact private-test commit and requested release preparation only.
Production dispatch is outside the current execution scope.

## Private test evidence

- Private test URL: `https://automatic-adventure-o8r86o9.pages.github.io/`
- Workflow: `https://github.com/mfm-se-dev-org/ghcp-video-content/actions/runs/40422158347`
- Exact deployed source: `71d3de2511b2b1971f3f9500dee764b7a74b5de5`
- Typecheck, tests, validation, complete review build, route verification,
  artifact upload, and Pages deployment succeeded.
- Authenticated deployment status, workflow steps, deployment logs, artifact
  provenance, and all three GHCP Agentic Hack module routes were verified
  with the existing `verifyPrivateCommit` implementation.
- Copilot's public-export stylesheet finding was fixed, its thread resolved,
  and the follow-up review reported no open issues. Required build,
  JavaScript/TypeScript analysis, and Copilot review checks passed.
- Tammy McClellan explicitly approved this exact commit. The canonical
  `pnpm content approve test ghcp-agentic-hack --approver "Tammy McClellan"
  --url https://automatic-adventure-o8r86o9.pages.github.io/` command repeated
  private deployment verification and recorded mutable and immutable approval
  records. Production is unchanged.
- The same canonical command recorded exact-commit approvals for the unchanged
  lifecycle-v3 selections Purrmission to Proceed, Token Optimization, and
  Workflow First. All four command-created single-workshop manifests were
  consolidated into this portfolio manifest so promotion retains all seven
  workshops.

## Promotion boundary

The canonical test approval and portfolio release approval record the same
human decision. Validate the committed manifest and verify the sanitized
exact-commit export before promotion. Preserve its pinned commit and complete
seven-workshop selection. Do not dispatch production as part of this
preparation-only request.

Do not treat the currently served r11 manifest as a verified rollback target:
its verification is not recorded. Preserve the previously verified r9 manifest
and source `75ecc4af415dfe51e23f0c8b90b784e85f2fd71c` unchanged.

The October 24 five-harness mission revision remains unlocated. This release
must not be described as recovering that missing work.
