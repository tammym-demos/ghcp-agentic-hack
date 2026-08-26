---
schemaVersion: 1
kind: release-manifest
id: ghcp-dev-hack-leaderboard-ranking-2026-08-26
title: GitHub Copilot Developer Hack release
status: approved
commit: 71eb292b19ebbb9e02d73618ed83fdb17bd3e0f7
createdAt: '2026-08-26T11:14:40.967Z'
approvedBy: Tammy McClellan
approvedAt: '2026-08-26T11:36:55.163Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
---

# GitHub Copilot Developer Hack release

## Approval

The workshop owner approved promotion of the private build from `71eb292b` on
2026-08-26 after requesting the production manifest and attempting the promotion
workflow.

## What this release carries

- Leaderboard ranking now sorts by total score first, then the earliest issue
  creation time for the participant's valid submission.
- Tied score rows with different submission times receive distinct ranks, so
  the board reflects both points and speed to submit.
- Participants with valid submissions remain visible in standings even when
  they have zero verified-score modules.
- Ranking remains deterministic when score and created time also match by
  falling back to alias order.

## Local review evidence

- Pull request #38 merged to private `main` at `71eb292b`.
- Copilot review suggestions on PR #38 were addressed and resolved before merge.
- `node --test test/leaderboard.test.mjs` passed in
  `workshops/ghcp-dev-hack/artifacts/leaderboard-kit` with 27/27 tests.

## Production promotion notes

- Dispatch `.github/workflows/promote-public.yml` from private `main` with
  `release_manifest` set to
  `releases/ghcp-dev-hack-leaderboard-ranking-2026-08-26.md`.
- The promotion workflow will publish the production leaderboard kit for
  `ghcp-dev-hack` because the workshop declares a leaderboard.
