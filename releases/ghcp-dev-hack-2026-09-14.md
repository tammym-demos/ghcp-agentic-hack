---
schemaVersion: 1
kind: release-manifest
id: ghcp-dev-hack-2026-09-14
title: GitHub Copilot Developer Hack release
status: approved
commit: 91daf58e6dc5168b14ed087f6b33bc8706d49157
createdAt: '2026-09-15T00:48:43.193Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
approvedBy: Tammy McClellan
approvedAt: '2026-09-15T00:53:06.622Z'
---

# GitHub Copilot Developer Hack release

## Authorization and scope

This approved manifest pins the reviewed private `main` commit after the merged
Foundations and Agentic module updates. It includes the complete
`ghcp-dev-hack` workshop and the current portfolio shell, while manifest
filtering excludes `mission-control` workshop content.

Tammy McClellan approved this exact release for production promotion on
2026-09-14 EDT. Manifest commit, dispatch, public pull-request merge, and live
verification remain separate actions.

## What this release carries

- Foundations prediction-flow revisions, including the retained-slide
  contract, token-railway teaching sequence, timing, notes, and presentation
  styling from private PR #73.
- Agentic content and presentation revisions, including the opening sequence,
  three-step action framing, optimization guidance, security expansion,
  readability repairs, exact slide contract, notes, and module styling from
  private PR #74.
- The current responsive workshop catalog and workshop-page presentation from
  the merged private portfolio updates.
- No new paid generation, candidate acceptance, or media publication action.

## Local review evidence

- Private PR #72 merged as `41fc237`; its build and CodeQL checks passed.
- Private PR #73 merged as `fcc2923`; its build and CodeQL checks passed.
- Private PR #74 merged as `91daf58`; its build and CodeQL checks passed.
- `pnpm review:slides` completed the full production-shaped build from
  `91daf58` with the GitHub Pages base path.
- The workshop owner reviewed the resulting local production-shaped site and
  approved preparation of this draft manifest on 2026-09-14 EDT.
- The preceding `ghcp-dev-hack-2026-09-10` public deployment was independently
  checked against its pinned provenance, all seven release routes passed, and
  its verification was recorded.

## Deployment boundary and rollback

The manual promotion workflow publishes the production leaderboard kit before
creating the public site release pull request, so leaderboard and site updates
are not atomic. Public merge and exact-provenance route verification remain
required before this release can be recorded as verified.

Until this release is verified, preserve `ghcp-dev-hack-2026-09-10` as the
verified rollback target.
