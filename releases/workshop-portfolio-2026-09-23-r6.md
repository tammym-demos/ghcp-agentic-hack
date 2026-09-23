---
schemaVersion: 1
kind: release-manifest
id: workshop-portfolio-2026-09-23-r6
title: GitHub Copilot Workshops portfolio release
status: approved
commit: bbb87811a09ad858292b8fbbf51ff9e88f494549
createdAt: '2026-09-23T18:35:45.775Z'
workshops:
  - id: ghcp-dev-hack
    modules:
      - foundations
      - agentic
      - advanced
  - id: mission-control
    modules:
      - copilot-value-lab
approvedBy: Tammy McClellan
approvedAt: '2026-09-23T18:38:57.044Z'
---

# GitHub Copilot Workshops portfolio release

This draft replaces `workshop-portfolio-2026-09-23-r5`, which is approved but
stale for promotion because it pins `4082ee9da4caa69019267b936c3c306a09690981`
from before the 2026-09-23 public-export component-declaration correction
landed.

## Scope

- GitHub Copilot Developer Hack: Foundations, Agentic, and Advanced.
- Mission Control: AI Development Governance and Value Realization.

## Review evidence

- Promotion workflow run `35902601530` failed during exported-source build
  because the public export declarations omitted
  `MissionControlLeverageRectangle.vue` and
  `MissionControlCapacityCurves.vue`.
- The replacement release commit adds those two Mission Control runtime files to
  `.github/public-release/export-files.json`.
- `pnpm content release validate releases/workshop-portfolio-2026-09-23-r5.md`
  passed before diagnosing the pinned-manifest mismatch.
- A replacement approved manifest is required because public release export is
  pinned to the manifest commit rather than the working tree.

## Approval boundary

This draft does not authorize deployment. Human review, explicit approval,
manual promotion, public pull-request merge, deployment verification, and
rollback-target tagging remain separate decisions.
