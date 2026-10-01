---
schemaVersion: 1
id: mission-control
title: 'Mission Control: AI Development Governance and Value Realization'
status: draft
kind: workshop
description: >-
  A full-day decision workshop for connecting AI development use and spending to
  accepted engineering and business outcomes, practical governance, and an owned
  pilot decision.
format: one-day
duration: '09:00-17:03; 408 teaching/group-work minutes plus 75 break/lunch minutes'
level: mixed
audience:
  - Business and application outcome owners
  - Engineering and delivery leaders
  - Developer-platform and GitHub administrators
  - Enterprise architecture and AI platform owners
  - 'Security, risk, privacy, legal, and compliance owners'
  - 'Finance, FinOps, procurement, and budget owners'
  - 'Data, analytics, and measurement owners'
prerequisites:
  - >-
    Familiarity with one organizational engineering workflow and its intended
    business outcome
  - >-
    Authority to represent, or access to, the business, engineering, platform,
    architecture, risk, finance, and measurement decisions in scope
  - >-
    Bring available usage, cost, quality, delivery, risk, and outcome evidence
    when practical; record missing evidence as unknown
modules:
  - copilot-value-lab
tags:
  - github-copilot
  - ai-governance
  - roi
researchSources:
  - type: other
    title: GitHub Brand Toolkit - Logo
    url: 'https://brand.github.com/foundations/logo'
    reviewedAt: '2026-09-13'
    notes: >-
      Branding-only review. Reuse the owner-authorized official lockup, without
      modification or endorsement claims; guidance is not a blanket license.
  - type: other
    title: GitHub Brand Toolkit - Cobranding
    url: 'https://brand.github.com/brand-identity/cobranding'
    reviewedAt: '2026-09-13'
    notes: >-
      Preserve proportions, clear space and separation; no co-hosting claim or
      new public-use authorization.
  - type: other
    title: Microsoft Trademark and Brand Guidelines
    url: 'https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks'
    reviewedAt: '2026-09-13'
    notes: >-
      Reuse the existing owner-supplied Brand Central asset for the requested
      local native placement. The public guidelines do not themselves grant a
      logo license.
  - type: other
    title: GitHub Copilot CLI command reference
    url: >-
      https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    reviewedAt: '2026-09-19'
    notes: >-
      Confirms `/usage` reports per-model session usage totals. Treat it as
      accumulated session evidence, not current context occupancy, an
      account-period invoice, or ROI proof.
  - type: other
    title: GitHub Copilot billing - GitHub Docs
    url: >-
      https://docs.github.com/en/billing/concepts/product-billing/github-copilot-billing
    reviewedAt: '2026-09-24'
    notes: >-
      Official billing concept: GitHub Copilot AI credits are usage-based
      billing units. Included allowances depend on plan; AIC here is local
      shorthand, not a token count, premium-request equivalence, or a
      billed-invoice claim. Reverify at delivery.
  - type: other
    title: Models and pricing for GitHub Copilot - GitHub Docs
    url: >-
      https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
    reviewedAt: '2026-09-24'
    notes: >-
      Official model-specific input, output, cached-input and applicable
      cache-write accounting. Cache is not automatically free; do not infer
      credits from bytes or token totals alone, promise savings, or freeze
      volatile models/rates. Reverify applicable terms at delivery.
lastReviewed: '2026-09-24'
---
# Mission Control: AI Development Governance and Value Realization

GitHub Copilot is the main example. The decisions and methods remain
customer-neutral and broadly useful for other approved AI development services.

This full-day workshop helps leaders connect AI development use and spending to
a business outcome, choose an ROI path, define practical controls and decision
rights, compare one change fairly, and decide whether to stop, revise, fund, or
scale an owned pilot.

## Participant outcomes

By 17:03, participants can:

1. distinguish investment, consumption, activity, completed work, accepted
   outcomes, and business value, then choose primary and secondary ROI paths;
2. define a workflow completion boundary, find where leverage is lost, and
   state the limiting factor and evidence needed to test expected ROI;
3. build a usage-and-economics starting point that separates fixed and variable
   costs, identifies owners and periods, and records missing evidence as unknown;
4. define a control map covering policy, access, privacy, least privilege,
   thresholds, exceptions, human checks, stopping, rollback, and escalation;
5. compare model, context, and tool-permission changes fairly while holding the
   task, completion boundary, and acceptance rules constant, and weigh GitHub
   Copilot AI credits alongside accepted work, review time, and risk;
6. rank opportunities, choose a funding approach, assign operating decision
   rights, and build pilot and executive scorecards with decision gates; and
7. present an owned 30/60/90-day pilot package and make the next responsible
   stop, revise, fund, or scale decision.

## Exact agenda

| Time | Minutes | Segment | Visible rows |
| --- | ---: | --- | --- |
| 09:00-09:30 | 30 | Mission briefing | S01-S04 |
| 09:30-10:30 | 60 | ROI fundamentals | S05-S14 |
| 10:30-10:45 | 15 | Break | U01 |
| 10:45-11:30 | 45 | Usage and economics evidence | S15-S18 |
| 11:30-12:15 | 45 | Governance and controls | S19-S22 |
| 12:15-13:00 | 45 | Lunch | U02 |
| 13:00-13:48 | 48 | Guided optimization lab | S23-S29 |
| 13:48-14:18 | 30 | Investment and portfolio decisions | S30-S32 |
| 14:18-14:33 | 15 | Break | U03 |
| 14:33-15:18 | 45 | Enterprise operating model | S33-S36 |
| 15:18-16:03 | 45 | Prove ROI | S37-S41 |
| 16:03-16:33 | 30 | 30/60/90 action plan | S42-S43 |
| 16:33-17:03 | 30 | Pilot decision and executive readout | S44-S45 |

Facilitated arithmetic: 30 + 60 + 45 + 45 + 48 + 30 + 45 + 45 + 30 + 30 =
**408 minutes** (174 instruction, 234 protected participant work). Utilities:
15 + 45 + 15 = **75 minutes**. Total: 408 + 75 = **483 minutes**, continuously
09:00-17:03. The exact visible count is 45 workshop slides plus U01/U02/U03 =
**48 rows**. S29 adds three instruction minutes, not a new exercise; the
existing lab retains 21 participant-work minutes.

## Participation and delivery boundary

The seven functional roles are P1 Business/Application Outcome, P2
Engineering/Delivery, P3 Developer Platform/GitHub Administration, P4
Enterprise Architecture/AI Platform, P5 Security/Risk/Privacy/Legal/Compliance,
P6 Finance/FinOps/Procurement/Budget, and P7 Data/Analytics/Measurement. One
person may cover more than one role, but each decision function needs a named
owner. Lead / Evidence / Review / Decide appears only where responsibilities
differ.

No participant coding environment, account, repository, administration screen,
or live network connection is required. Current prices, entitlements, quotas,
model availability, controls, and enforcement behavior require future current
sourcing. Missing values remain unknown rather than becoming zero or a guess.

The owner has approved the preceding 47-row contract/content and the new
S29 content and 48-row timing/position contract separately. The Workshop
Production Coordinator records the new decisions; this text does not assign
their IDs. The new text-only source/manifest is not an integrated deck and does
not authorize media work, paid action, push, pull request, release, deployment,
publication, or claims of participant outcomes.
