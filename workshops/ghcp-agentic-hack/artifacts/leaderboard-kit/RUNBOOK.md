# Facilitator leaderboard runbook

## Account-free Azure route

The active workshop uses one shared Azure backend and score store in one
subscription for both private-test and public workshop sites, with
`submissionMode: account-free`. There are no separate test and production
backends. The backend is deployed separately from the sites; its source
and deployment tooling are not included in this event-repository kit or in
public workshop-site exports.

### Setup and handoff

1. Have the deployment owner maintain the shared backend from the authoring
   workspace, using Node.js 22, managed identity, private Blob storage, and
   approved networking. Do not provision another backend for public-site
   rollout. Do not enable public storage or shared keys to work
   around a deployment failure.
2. Obtain the HTTPS API base URL ending in `/api`. Check `/config`, `/submit`,
   `/board`, and `/standings`, and confirm the configured event time zone.
   The backend selects the event date; each day has a separate board.
3. Set this event repository's `LEADERBOARD_API_URL` Actions variable to that
   base URL, then dispatch the publish workflow. Keep its GitHub Issues read
   access: the build preserves sanitized legacy archives at `events/<date>/`
   and their index at `events/`, including a populated switch-day issue board.
   Root entry points redirect to the live backend; `submit.html` preserves
   participant prefills. Azure's `/api/events` indexes account-free events.
4. Configure both workshop-site environments with the same submission URL
   `<apiUrl>/submit`, standings URL `<apiUrl>/board`, and mode `account-free`.
   Both sites share daily scores; backend updates affect both immediately.
5. Before participants use it, save and withdraw a synthetic score. Confirm
   it appears and disappears, and verify facilitator access separately.
   Withdraw all rehearsal scores before participant use.

### Participant ownership and facilitator operations

Participants use one made-up alias and the same browser for every module.
The form holds a private recovery key; participants can copy it privately and
restore it in another browser. Reopen the form to correct or withdraw a module.
Changed scores need fresh verification. Lost keys cannot be recovered or
reassigned; use a new alias or ask a facilitator to withdraw an abandoned score.
Evidence, identities, prompts, diffs, and repository content stay local.

Authorized facilitators retrieve the function key through approved Azure tooling.
Send it only in the `x-functions-key` header, never in URLs, participant code,
source files, or public output. The following routes accept JSON and an explicit
`?date=YYYY-MM-DD` in the configured workshop time zone:

| Route | Body |
| --- | --- |
| `POST /api/facilitator/verify` | `alias`, module id, exact reviewed `core` and `bonus`, and boolean `verified` |
| `POST /api/facilitator/withdraw` | `alias`, module id, exact reviewed `core` and `bonus` |
| `POST /api/facilitator/close` | `{ "closed": true }` to close; `false` to reopen |

Module ids are `foundations`, `agentic`, and `advanced`. A 409 means the score
changed: read the current totals and review them again before retrying.
Past events are read-only for participants; facilitators can still adjust
verification or withdraw an unwanted submission. Tied highest eligible verified
totals remain co-winners.

Anonymous intake is not proof of identity and cannot prevent multiple keys.
Limits are 500 aliases per event and 20 writes per key per rolling minute.
Ask the deployment owner for gateway abuse protection before untrusted public
use. For availability errors, check managed-identity permissions, private
networking/DNS, and backend logs without collecting participant keys or evidence.

## Legacy GitHub route

The GitHub issue operations below apply only to legacy environments.

Operating guide for running the optional alias-only workshop leaderboard during a
`ghcp-dev-hack` delivery. Pair it with `README.md`, which documents the kit
itself.

## Environments

| Environment | Event repository | Standings site |
| --- | --- | --- |
| Test | `mfm-se-dev-org/ghcp-dev-hack-leaderboard` (private) | `https://expert-adventure-386owy8.pages.github.io/` |
| Production | `tammym-demos/ghcp-dev-hack-leaderboard` (public) | `https://tammym-demos.github.io/ghcp-dev-hack-leaderboard/` |

The test repository is private, so its Pages site uses a scrambled hostname and
requires a signed-in account with repository access. Only organization members
can open submission issues there; it is an instructor rehearsal environment, not
a participant environment. The production repository is public so external
participants can submit.

These values are declared once in `workshops/ghcp-dev-hack/workshop.md` under
`leaderboard.environments`. The portal build selects one with the
`WORKSHOP_ENVIRONMENT` variable, which defaults to `test`; the public release
build sets `production`. Update `workshop.md` if either repository moves, then
rebuild the portal.

## Before the event

1. Create the event repository. It must be separate from the workshop content
   repository so participant issues never touch workshop source.
2. Copy the contents of this kit into the repository root.
3. Enable **Issues** and **Actions**.
4. In **Settings → Pages**, set the source to **GitHub Actions**.
5. Create the two labels used by the workflow:
   - `leaderboard-submission` — applied automatically by the issue form.
   - `verified-score` — applied only by you.

   `pnpm content publish-leaderboard` now creates both labels if they are
   missing, so this step is a verification rather than manual setup. It still
   matters: an issue form **silently drops a label that does not exist in the
   repository**, so a submission raised before the labels exist stays
   unlabelled and no later build will ever see it. If the publish command
   warns that it could not manage labels, its token is missing Issues read and
   write; create them by hand before the event.
6. Confirm `leaderboard.config.json` has the right `event.slug` and `event.timeZone`. You do
   **not** set an event id, and you do not reset anything: the calendar day in
   `event.timeZone` is the event, so a new hack starts a new board on its own. If a previous
   hack left `event.closedOn` behind, leave it — it only applies to the day it names.
7. Run the workflow once with **Run workflow** (`workflow_dispatch`) and confirm
   the Pages site publishes an empty board.
8. Submit one throwaway issue with a disposable alias, confirm it appears in
   **Provisional standings**, then close that issue and confirm it disappears.
9. Confirm the portal shows the **Leaderboard** button and that each mission page
   shows **Submit your score**.

## During the event

- Project the standings page. It reloads every 60 seconds
  (`pages.refreshSeconds`), so a new submission appears within roughly a minute
  of its build completing.
- **Provisional standings** are self-reported and update immediately.
- **Verified standings** count only submissions carrying `verified-score`.
- Participants submit **one issue per module**: Foundations, Agentic, Advanced.
- Foundations core clues are worth 5, 10, 10, 10, and 15 points, so Foundations
  accepts 5-point values such as 45. Agentic and Advanced accept 10-point values.
- Bonus is capped at 10 per module. The maximum cumulative score is 180.
- Verification cadence: verify at each module debrief rather than continuously.
  Spot-check the participant's exported case file, then apply `verified-score`.
- Corrections: the participant edits their own issue. A body edit clears
  `verified-score`, so review the corrected score before applying the label again.
  Withdrawal: the participant closes it. Re-entry: reopen or submit a newer issue.
- If two participants pick the same alias, the builder withholds both from the
  published board until one alias changes. Ask them to edit their issues.

## Known and intentional limitation

The published board is alias-only, so it cannot show who has **not** submitted,
and it cannot be mapped back to a person. That is deliberate: no participant
identity, evidence, prompt, diff, or repository content is ever published. Track
room progress by asking the room, not by trying to de-anonymize the board.

## Invalid submissions

The build counts invalid submissions in the summary but never publishes their
content. Common causes:

- wrong module, alias, or score for the event day
- alias outside the 3-24 character policy
- unrecognized module
- a score that violates the module's range or increment
- a missing self-report or privacy acknowledgement

Ask the participant to edit their issue; the next build picks up the correction.

## Each new hack

Nothing to do. The calendar day in `event.timeZone` (`America/New_York`) is the event, so a
new hack automatically starts on an empty board and the previous hack becomes a past event.
A scheduled run shortly after local midnight rolls the published board over even before the
first submission of the day arrives.

Two cases need an explicit `event.date` pin in `leaderboard.config.json`:

- **A hack running past local midnight.** Pin `event.date` to the start day so late scores
  land on the same board, then remove the pin afterwards.
- **A rehearsal.** Pin the day you want to preview.

Leaving a stale `event.date` pinned is the one thing that stops the board rolling over, so
remove it when you are done.

## Reviewing past hacks

Past boards publish themselves. Each earlier day that holds at least one valid submission is
rendered at `events/<YYYY-MM-DD>/`, indexed at `events/`, and linked from the current board as
**Past events**. Past boards are always final and announce their winners.

Past boards are rebuilt from the issues on every run rather than frozen, so **do not close old
submission issues** after an event. A closed submission counts as withdrawn and would vanish
from its archived day. If you need a permanent off-site copy, download the Pages artifact.

## Closing the event

Closing is optional. Once the day rolls over, that board is archived as final and announces
its winners anyway. Close it explicitly when you want to announce winners live, in the room,
before the day ends.

1. Set `event.closedOn` to today's date in `event.timeZone`, for example
   `"closedOn": "2026-08-23"`, in `leaderboard.config.json` and commit.
2. Run the workflow once manually.
3. The winner section then publishes the highest **verified** cumulative total.
   Tied participants are announced as co-winners; there is no speed tie-breaker.
4. Download and retain the final Pages artifact if you need an off-site event archive.
5. Leave `closedOn` in place. It names one day, so the next hack's board opens normally
   without any cleanup.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Submission missing from the board | Issue is open, carries `leaderboard-submission`, and the build summary does not count it as invalid |
| Board not updating | Actions run history for the latest `Publish leaderboard artifact` run and the Pages deployment |
| Run succeeds but the board stays empty | Open the run log and read `Issues scanned`. If it is `0` while an open submission exists, the submission is unlabelled: the `leaderboard-submission` label did not exist when the issue was raised, so the form dropped it and the build's label query never returns it. Create the label, then add it to the existing issues, which retriggers the build |
| Pages deployment fails | Pages source is **GitHub Actions** and the `github-pages` environment allows the deploy job |
| Participant reports a rejected score | Confirm the module's increment rule and the 0-50 core / 0-10 bonus ranges |
| Alias missing entirely | Alias conflict withholding; two participants share one alias |

## Local rehearsal

```powershell
npm test
node src/build-leaderboard.mjs --config leaderboard.config.json --input fixtures/sample-issues.json --out sample-site
```

The sample build uses synthetic aliases only and never contacts GitHub.
