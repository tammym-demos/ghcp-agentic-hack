---
schemaVersion: 1
kind: module
id: copilot-value-lab
title: The Copilot Value Lab
description: Connect GitHub Copilot consumption to organizational decisions and engineering outcomes.
duration: "Full-day deck, 09:00-17:00, including three break/lunch utilities"
totalMinutes: 480
timing:
  instructionMinutes: 345
  missionMinutes: 45
  discussionMinutes: 15
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 75
  contingencyMinutes: 0
objectives:
  - Connect GitHub Copilot consumption to organizational decisions and engineering outcomes.
prerequisites: []
sourceDocuments:
  - content/modules/01-copilot-value-lab/mission-control-source.md
slides: content/modules/01-copilot-value-lab/slides.md
generation:
  expectedSlides: 22
  manifest: content/modules/01-copilot-value-lab/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: "Native warm editorial case room; Mona Sans with Segoe UI/Arial fallbacks; cream, ink, green and restrained purple. One approved v7 team illustration on S01 only; no later characters."
labs: []
missions: []
assets:
  - assets/brand/microsoft/microsoft-logo.png
  - assets/brand/github/GitHub_Lockup_Black_Clearspace.svg
  - assets/images/copilot-value-lab/mission-control-opening-team-v7.png
  - assets/images/copilot-value-lab/mission-control-opening-team-v7.png.json
status: draft
---

# The Copilot Value Lab

Local review implementation for the recovered Mission Control deck. Production
initiative identifiers and decision records remain internal repository
governance, not public module content.
The objective and stable S01–S18 IDs are carried forward. The bounded opening
contract changes S01's title/labels, inserts S01A and reallocates five minutes
from S02; S03 onward retain their exact content and clocks.
Human acceptance of the finished deck is pending; status remains `draft`.

**Local review scope:** the revised 22-visible-slide contract is implemented;
parent full-build and rendered opening/kickoff review remain pending.
Retain the module-local S10 contrast correction. The owner requested native Microsoft and
GitHub branding on the opening and in a small footer throughout. Technical
review evidence remains in repository-only review records; human teaching/look
acceptance and event readiness remain pending.

## Declared implementation

- `mission-control-source.md`: sanitized governing source; no private original,
  customer identity, internal URL, reference screenshot or meeting detail.
- `slide-manifest.md`: exact titles, source anchors, 22 visible positions,
  numeric minutes and intentional shared-layout exceptions.
- `slides.md`: implements 18 existing instructional slides, one new
  kickoff (S01A) and three scheduled break/lunch utilities.
- `style.css`: workshop-local warm treatment on shared `ghcp` layouts; no shared
  theme redesign. Mona Sans is requested with Segoe UI/Arial fallbacks; no remote
  font fetch.
- `global-bottom.vue`: native Microsoft/GitHub footer on every slide, with a
  larger pair on the opening rather than duplicate logos; optional
  keyboard-accessible reading dialog using the same complete slide content.
- `assets/brand/` and `public/images/`: the two unmodified official marks,
  declared above and served locally. Source provenance is retained in the
  repository's authoring records.
- `assets/images/copilot-value-lab/mission-control-opening-team-v7.png` and its
  declared `.png.json` sidecar: the accepted opening-only illustration and
  provenance. Only the exact PNG is mirrored in `public/images/`; native
  titles, teaching roles and separate official marks remain editable.
- Targeted contract and actual local-render checks were used during authoring;
  review scripts and screenshots remain repository-only evidence.

## Time and evidence

Exactly 405 facilitated + 75 break/lunch = 480 minutes, 09:00–17:00. The coarse
timing categories above retain `workshop.md`'s accounting; they do not turn
participant exercises into lectures. Opening: S01 09:00–09:01 (1), S01A
09:01–09:06 (5), S02 09:06–09:30 (24); 1 + 5 + 24 = 30. S01A protects
0.5 prompt/setup + 2 pair introductions + 1 brief share + 1.5 agenda/transition;
S02 uses 3 brief + 12 draft/compare + 9 discussion/transition.
S10's two minutes and S11's three-minute
demo share round 1's five-minute demonstration. All three lab rounds protect
15 minutes of participant practice and five minutes of review.

S07's actual two-panel hierarchy is the representative proof before expansion.
Its first technical render required a local CSS cascade correction, not a
content or creative change. Review evidence distinguishes mechanical success
from pending human look/teaching acceptance.

## Media and delivery boundaries

The two declared brand assets are **official native brand overlays**, not generated
teaching media. Their original colors, artwork, aspect ratios and supplied clear
space are retained without effects. They identify Microsoft and GitHub; no
co-hosting, endorsement or public-release claim is added. They are not submitted
to a generative model. No logo or font is downloaded at build or runtime.

S01 now uses the separately accepted and workshop-locally published v7 team
illustration, contained without cropping or pixel edits. This bounded replacement
fulfills the opening placeholder's separate-approval requirement. The revised
source/manifest preserve that exact art while changing native cover text and
adding the character-free kickoff. All other slides and utilities
remain free of workshop-character artwork. Image acceptance does not authorize
fake product UI/video, whole-module acceptance or release.

The schema-required `generation.imageProvider` value is inert compatibility
metadata, using the CLI's existing provider enum. It is **not** a work envelope,
generation request, asset acceptance or paid authorization. No provider is called.
The S01 placeholder has been replaced under the separate exact-v7 approval.
No further asset publication or remote release is authorized here.

`labs: []` and `missions: []` are also intentional. A1 is an approved lab design,
not a built sample or a portal mission claiming readiness. Source/slides contain
the exact draft planning prompt, checkpoint instructions, fill-in evidence and
progressive no-penalty hints. A real starter, synthetic fixtures, participant
setup/access, concrete test commands and expected results, catch-up checkpoints,
rehearsal and environment-specific read-only admin verification remain delivery
prerequisites. No enterprise controls are executed by the deck.

Authority and independent decisions remain coordinator-owned in internal
repository records and are not included in the public module contract.
