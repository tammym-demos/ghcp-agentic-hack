---
schemaVersion: 1
kind: release-manifest
id: ghcp-dev-hack-mission-exercises-2026-08-23
title: GitHub Copilot Developer Hack release
status: approved
commit: 4dfd9260413208b56943cadd32566cfb2a4ebff9
createdAt: '2026-08-24T01:52:00.000Z'
approvedBy: Tammy McClellan
approvedAt: '2026-08-24T01:58:43.000Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
---

# GitHub Copilot Developer Hack release

## Approval

The workshop owner reviewed the private test site deployed from `0511571`,
which builds this pinned content, and approved promotion to production on
2026-08-23.

The reviewed content landed in pull request #33 as merge commit `98ce0e7`.
This manifest pins `4dfd926`, which adds only the production-ledger and
production-state records for this release review. Release validation rejects
any change after the pinned commit other than this manifest, so the ledger
entry had to be committed first. Pull request #34 carried the ledger records
and this manifest onto `main` as `0511571`, because `main` is protected against
direct pushes.

Supersedes `ghcp-dev-hack-leaderboard-2026-08-18b`, which pinned `f701f6f9`
and is currently in production as site commit `217f3b38`.

## What this release carries

- All 23 scored mission exercises restructured into an explicit contract: a
  named `outcome`, a `verify` step, and a tool-specific first move ahead of the
  general steps
- `missionClueSchema` extended with required `outcome` and `verify`, plus a
  rule requiring a route for every declared harness, so a future clue missing
  either fails `pnpm validate`
- Routes backfilled for all eight previously unrouted bonus clues
- Mission-level harness instructions rewritten as concrete setup mechanics:
  open a fresh session, create and save a named file, run or preview it, and
  where output appears
- Copy-ready ask-Copilot prompts at mission level carrying tool and exercise
  context
- Plain-language pass across every exercise and harness setup block, with
  participant-facing `harness` replaced by `tool`
- GitHub Enterprise dependent material relocated to the optional Agentic bonus
  clue `platform-review-surfaces`, so no core exercise requires Enterprise
  repository access
- The three mission-launch slides revised in place to carry the displaced
  conceptual definitions
- A new zero-minute `Demo!` slide immediately before the mission slide in all
  three modules, taking the generation contracts to 25, 28, and 20 slides

## Release scope boundaries

No scoring change, point value, `completionPoints`, `bonusPointCap`, or clue id
rename is included. `completionPoints` stays 40 and `bonusPointCap` stays 10.
Apart from the three mission-launch slides and the new `Demo!` slide, no slide
content, title, or order changed. No media was generated and no paid action was
taken: paid calls, candidates, variants, and retries are all zero.

## Local review evidence

- `pnpm typecheck` clean across all six workspace projects
- `pnpm test` passing: 16 portal, 49 content-schema, 52 content-cli, and 15
  leaderboard-kit tests
- `pnpm validate` reports 1 workshop and 72 approved images, which confirms the
  25/28/20 slide contracts agree with the manifests and the seven-section
  speaker-notes contract holds on every visible slide
- `pnpm build` produced the complete site including all three deck routes
- All three decks reviewed locally through Slidev and approved by the workshop
  owner, including the new `Demo!` slide placement
- Pull request #33 merged as `98ce0e7` with the `build` and CodeQL checks green
- All seven automated review threads on #33 were addressed in `db52556` and
  resolved: stale slide counts in the three manifests and the Agentic module
  prose, two fixture agent filenames corrected to `.agent.md`, a `richText`
  double-backtick code-span defect fixed with three regression tests, and
  bonus-clue test data given a route for its declared harness

## Known limitations carried into production

- Acceptance signal not met on length. The missions grew rather than shrank
  (Foundations 349 to 405 lines, Agentic 412 to 540, Advanced 412 to 508). The
  growth sits in tool route content, which the approved scope exempts, and in
  the new `outcome` and `verify` lines. Prose inside `actions` shrank in every
  clue. The workshop owner accepted this at the content gate as clearer rather
  than denser.
- Leaderboard publishing still pushes directly to the board's default branch,
  bypassing the review gate the site passes through. Branch protection and the
  pull-request change must land together, because protection alone would fail
  the publish step and therefore the whole promotion. Deferred again.
- Enterprise Managed User accounts cannot create issues outside their
  enterprise, so those participants cannot post to the public board. Mission
  scoring is local and the board is declared optional, so completion is
  unaffected.
- `theTechGrandma` holds admin rather than write on the production board.

## Promotion sequence

1. Workshop owner reviewed the private test site deployed from `0511571` —
   complete
2. Workshop owner approved this manifest on 2026-08-23 — complete
3. Dispatch `promote-public.yml` from `main` with this manifest path, which
   publishes the production leaderboard and opens the public site pull request
4. Workshop owner approves and merges the public pull request
5. Verify the portal, the three module routes, and the production board before
   any `published` transition

Release validation rejects any repository change after `4dfd926` other than
this manifest, so any further edit requires a new manifest.
