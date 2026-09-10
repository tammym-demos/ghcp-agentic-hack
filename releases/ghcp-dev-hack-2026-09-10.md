---
schemaVersion: 1
kind: release-manifest
id: ghcp-dev-hack-2026-09-10
title: GitHub Copilot Developer Hack release
status: approved
commit: d9a9ffebc78e84c318926a5c0fbe8dc9af2f0e13
createdAt: '2026-09-10T16:52:03.470Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
approvedBy: Tammy McClellan
approvedAt: '2026-09-10T16:52:23.809Z'
---

# GitHub Copilot Developer Hack release

## Authorization and scope

Tammy McClellan requested the current workshop move to production, then on
2026-09-10 at 12:31 EDT instructed: "go ahead and monitor the PR for commit
suggestions from code review, and merge to main. After that please proceed
with a production run."

This records that production-run approval for the unchanged Foundations,
Agentic and Advanced content after prerequisite PR 63. The exact source is
the merge commit above. Later updates require a separate release.

## Readiness evidence

- PR 63: all five inline findings and two suppressed suggestions addressed;
  final review at `b75db11` reported no new comments. Build and CodeQL passed.
- Production-base local build passed with `/ghcp-agentic-hack/` and the
  production leaderboard configuration. Authored slides and artwork are
  unchanged by the export repair.
- Existing standalone/live browser receipts remain the visual evidence;
  painted Segoe UI/Consolas rather than Mona Sans remains a documented
  limitation, not a claim of new font acceptance.
- The isolated sanitized-export preflight passed installation, typechecking,
  tests, validation, all three module builds and ten route-file checks.
  The promotion workflow repeats installation, typechecking, tests,
  validation and the production build on this exact source. The ten
  route-file checks are local preflight evidence, not a separate workflow
  assertion; live routes must still pass exact-provenance verification.
- No paid generation, new candidate acceptance or media promotion is included.

## Deployment boundary and rollback

Manual promotion publishes the production leaderboard kit before creating
the public site release PR. That is a live public side effect: the leaderboard
can temporarily lead the site. Site deployment itself requires the public PR
merge. This production run includes the existing leaderboard publication
step; it is not an atomic site/leaderboard rollout. Public merge and
exact-provenance route verification remain separately recorded actions.
Until verification succeeds, preserve
`ghcp-dev-hack-leaderboard-ranking-2026-08-26` as the verified rollback target.
