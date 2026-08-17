---
schemaVersion: 1
kind: release-manifest
id: ghcp-dev-hack-talk-track-2026-08-17
title: GitHub Copilot Developer Hack release
status: approved
commit: 95f2ca3c4694470347e97e36760d5ed9e9e9a182
createdAt: '2026-08-17T22:42:32.316Z'
approvedBy: Tammy McClellan
approvedAt: '2026-08-17T19:09:00.572Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
---

# GitHub Copilot Developer Hack release

Approved by the workshop owner for public promotion. Approval authorizes the
promotion workflow to export this exact commit; production deployment still
requires merging the resulting pull request in the public repository.

## Scope

Selects Foundations, Agentic, and Advanced from private `main` commit
`95f2ca3c4694470347e97e36760d5ed9e9e9a182`, the merge commit of pull request
#25.

Content and delivery changes relative to the previously released
`ghcp-dev-hack-session-readability-2026-08-14` manifest:

- Speaker notes for all 71 visible slides rewritten from written
  specification prose into natural spoken delivery. Only `Talk track`,
  `Transition`, and `Response guidance` changed; teaching substance,
  terminology, titles, verbatim prompts, and media references are unchanged.
- Foundations: the temporary four-stop agenda was reverted and the approved
  full five-section timed agenda restored. Visible slide count remains 24.
- Advanced: the time-neutral zero-minute Copilot App guest-handoff slide was
  removed and the contract renumbered from 20 to 19 slides. The teaching path
  still totals 60 minutes and the separate 30-minute mission is unchanged.
- Decks are now built with Slidev `--router-mode hash` so deck deep routes
  such as presenter mode, the overview, and direct slide links resolve on
  GitHub Pages instead of returning 404.

No media was generated, promoted, or removed. Approved image count is
unchanged at 72.

## Deck URL change

Deck deep links now carry a hash, for example
`workshops/ghcp-dev-hack/foundations/#/presenter/1`. The deck root URLs, the
portal routes, and `site-routes.json` are unchanged because those are real
directories. Any previously bookmarked path-style deep link should be
re-copied from the deployed site.

## Local validation evidence

Run on private `main` at commit `95f2ca3c4694470347e97e36760d5ed9e9e9a182`
with a clean worktree on 2026-08-17:

- `pnpm typecheck` — passed
- `pnpm test` — passed, 38 tests in content-cli plus content-schema
- `pnpm validate` — validated 1 workshop and 72 approved images
- `pnpm build` — complete site built with `GITHUB_PAGES_BASE=/`, matching the
  private Pages workflow

Routing was verified by serving `dist` with a Pages-accurate static server
that mirrors GitHub Pages behavior: real files only, no single-page-app
fallback, nested `404.html` and `_redirects` ignored. Under those rules the
previous path-style presenter route returned 404 and the hash route resolved
correctly. The workshop owner confirmed presenter rendering against that
server.

For the record, a separately reported symptom of a blank current-slide pane
in presenter view was not caused by routing. It was Slidev's built-in
`Screen Mirror` presenter tab, which renders a blank capture pane until
screen mirroring is started. Switching that toggle back to `Slides` resolves
it, and no repository change was required. The routing fix above remains
warranted on its own evidence, because direct deep links and page refreshes
returned a genuine 404 under Pages-accurate serving.

Private Pages workflow runs succeeded for both `d18796c` and the merge commit
`95f2ca3`.

## Outstanding items for the approver

- Timing review: estimated spoken length is roughly 34 minutes against the
  75-minute Foundations budget, 33 against 75 for Agentic, and 26 against 60
  for Advanced. Every module lands inside budget.
- No previous manifest carries `verified` status, so this release has no
  formally verified rollback target. Consider verifying this manifest after
  deployment so a rollback target exists for the next release.
- Schema-backed lifecycle statuses are inconsistent: `workshop.md` and the
  Agentic module are `draft` while Foundations and Advanced are `review`.
  These do not affect the build or this manifest's selection, but they should
  be reconciled before or as part of marking content published.

## Approval

Approved by Tammy McClellan on 2026-08-17 for promotion to the public
repository. The approver reviewed the private test Pages deployment of this
commit, including presenter rendering and deck deep routes.

Remaining human gates: manual dispatch of the public promotion workflow from
`main`, and merge of the resulting release pull request in
`tammym-demos/ghcp-agentic-hack`, which alone deploys production. Status
should move to `verified` only after live route verification.
