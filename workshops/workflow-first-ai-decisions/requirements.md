---
schemaVersion: 1
kind: workshop-requirements
id: workflow-first-ai-decisions
title: "Workflow First: Making Better Automation and AI Decisions"
description: A publication-safe, developer-focused journey for planning a bounded workflow to get a repository building and all critical tests passing.
audience:
  - Developers
  - QA engineers and engineering partners
level: mixed
format: one-hour
durationMinutes: 60
outcomes:
  - Define a developer goal with a clear result, owner, acceptance signal, and stop conditions.
  - Choose a harness and explain when an interactive harness or GitHub Actions is appropriate.
  - Build a plan that names the preferred tech stack, governance, artifacts, verification, boundaries, and execution approach.
  - Show evidence of completion without confusing successful checks with human authorization.
  - Apply explicit project, organization, and enterprise boundaries and require human approval before consequential action.
modules:
  - id: workflow-opportunity-briefing
    title: "Workflow First: Making Better Automation and AI Decisions"
    minutes: 60
    outcomes:
      - Plan a bounded workflow for getting a repository building and all critical tests passing.
      - Distinguish the harness, source evidence, artifacts, verification, and human decision record.
      - State explicit stop conditions and the next responsible question.
sources: []
visualStyle: Native Warm Editorial 2D character-world accents on a soft off-white stage, with all instructional text and workflow diagrams rendered as native Slidev HTML or SVG.
imageRoles:
  - id: workflow-team-power-pose-v1
    module: workflow-opportunity-briefing
    purpose: Intro-slide character-world ensemble showing the three established workshop characters and the cat in a confident, grounded team stance, with all teaching text kept native.
    request:
      provider: gpt-image-2
      deployment: gpt-image-2
      endpoint: https://ghcp-v5-resource.openai.azure.com/openai/v1
      source: content/modules/01-workflow-opportunity-briefing/workflow-first-source.md
      sourceHash: 1dd205c58f906950c52ed54fdd87a9843d16abf7ab46cf1c1fc939a94a429b3e
      promptHashes:
        - 1f423e0d86229c710c798c1ee1546ac2dcc80359a834f4520f296a0d4b8e2a01
      width: 1536
      height: 1024
      outputFormat: png
  - id: workflow-team-chief-forward-v2
    module: workflow-opportunity-briefing
    purpose: Intro-slide reference edit preserving the approved character identities while placing Chief Morgan Charter in the foreground, Purrmission at her feet, and Agent Mergewell and Riley Relay offset behind her.
    request:
      provider: mai-image-2.5
      deployment: MAI-Image-2.5
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-workflow-opportunity-briefing/workflow-first-source.md
      sourceHash: 1dd205c58f906950c52ed54fdd87a9843d16abf7ab46cf1c1fc939a94a429b3e
      promptHashes:
        - 4e71db2b46a00a6104570e5d2c09783d86fb94986abd0d275470b9a9be55056d
      referencePath: content/modules/01-workflow-opportunity-briefing/public/images/mission-control-opening-team-v7.png
      referenceHash: e05909a60b5fa2669d56e37849d29a4e6100c43ad666652f043ec5bb4aa6e8f9
      width: 1248
      height: 832
      outputFormat: png
  - id: workflow-team-chief-forward-v3
    module: workflow-opportunity-briefing
    purpose: Repaired intro-slide reference edit preserving the approved character identities at equal apparent scale, with Chief centered slightly lower, Purrmission beside her shoe, and Agent Mergewell and Riley Relay shallowly offset behind her.
    request:
      provider: mai-image-2.5
      deployment: MAI-Image-2.5
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-workflow-opportunity-briefing/workflow-first-source.md
      sourceHash: 1dd205c58f906950c52ed54fdd87a9843d16abf7ab46cf1c1fc939a94a429b3e
      promptHashes:
        - b262793453b5383c05cddbe8372367a250fbca14918bd3e0c83bd8d44f1eb517
      referencePath: content/modules/01-workflow-opportunity-briefing/public/images/mission-control-opening-team-v7.png
      referenceHash: e05909a60b5fa2669d56e37849d29a4e6100c43ad666652f043ec5bb4aa6e8f9
      width: 1248
      height: 832
      outputFormat: png
  - id: workflow-team-chief-lead-v4
    module: workflow-opportunity-briefing
    purpose: Intro-slide reference edit staging the approved character ensemble in two overlapping rows with Chief Morgan Charter alone in front and centered, Purrmission at her feet, and Agent Mergewell and Riley Relay standing behind and offset, all three people in a confident hands-on-hips stance.
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-workflow-opportunity-briefing/workflow-first-source.md
      sourceHash: 1dd205c58f906950c52ed54fdd87a9843d16abf7ab46cf1c1fc939a94a429b3e
      promptHashes:
        - aef624d9f83a4b4ea7b8e30a71e8e7c7b3cf6989669ccf82ecade278a6995d4e
      referencePath: content/modules/01-workflow-opportunity-briefing/public/images/mission-control-opening-team-v7.png
      referenceHash: e05909a60b5fa2669d56e37849d29a4e6100c43ad666652f043ec5bb4aa6e8f9
      width: 1248
      height: 832
      outputFormat: png
  - id: workflow-team-hero-angle-v5
    module: workflow-opportunity-briefing
    purpose: Intro-slide reference edit restaging the approved character ensemble from a low heroic camera angle, with Chief Morgan Charter nearest the camera at larger foreground scale, Purrmission beside her shoe, and Agent Mergewell and Riley Relay clustered a short distance behind at smaller scale on grounding shadow pools.
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-workflow-opportunity-briefing/workflow-first-source.md
      sourceHash: 1dd205c58f906950c52ed54fdd87a9843d16abf7ab46cf1c1fc939a94a429b3e
      promptHashes:
        - 770498d61d7cc10fe06b83a1154c7c39faa12c05c302a52d0f01cf790fa1a625
      referencePath: content/modules/01-workflow-opportunity-briefing/public/images/workflow-team-chief-lead-v4.png
      referenceHash: c9c4e8d69f3daf31fa14229377f2f3f534aca0fa1cee62eae5d452485f127e84
      width: 1248
      height: 832
      outputFormat: png
  - id: workflow-team-equal-scale-hero-v6
    module: workflow-opportunity-briefing
    purpose: Intro-slide reference edit preserving the approved characters at equal drawing scale while using a subtle low camera viewpoint, Chief centered lower in the frame, Purrmission beside her shoe, and Agent Mergewell and Riley Relay behind and offset with depth conveyed only through overlap, vertical placement, and grounding shadow pools.
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-workflow-opportunity-briefing/workflow-first-source.md
      sourceHash: 1dd205c58f906950c52ed54fdd87a9843d16abf7ab46cf1c1fc939a94a429b3e
      promptHashes:
        - 3a49c8443f24d5ed7e22c8e8d8d462ef938e32eade9ed1475c418d4098340073
      referencePath: content/modules/01-workflow-opportunity-briefing/public/images/workflow-team-chief-lead-v4.png
      referenceHash: c9c4e8d69f3daf31fa14229377f2f3f534aca0fa1cee62eae5d452485f127e84
      width: 1248
      height: 832
      outputFormat: png
  - id: workflow-team-shallow-depth-v7
    module: workflow-opportunity-briefing
    purpose: Intro-slide reference edit preserving every approved pose and character feature while placing Agent Mergewell and Riley Relay in a shallow back row about one foot behind Chief Morgan Charter and uniformly increasing Chief's drawn height to establish a restrained foreground hierarchy.
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-workflow-opportunity-briefing/workflow-first-source.md
      sourceHash: 1dd205c58f906950c52ed54fdd87a9843d16abf7ab46cf1c1fc939a94a429b3e
      promptHashes:
        - 4b7a56757624024bfea8254056d0fba277e9cb4464a880808968d1544fd41404
      referencePath: content/modules/01-workflow-opportunity-briefing/public/images/workflow-team-chief-lead-v4.png
      referenceHash: c9c4e8d69f3daf31fa14229377f2f3f534aca0fa1cee62eae5d452485f127e84
      width: 1248
      height: 832
      outputFormat: png
exclusions:
  - Customer names, confidential workflows, internal facts, or customer-specific governance assertions
  - Product training, prompt engineering, live demonstrations, missions, labs, accounts, repositories, or required network access
  - Claims that a named harness has a current feature, entitlement, integration, control, quality level, or outcome without approved source support
  - Claims that workshop attendance authorizes production implementation
  - Unsupported legal, compliance, return-on-investment, workplace, or customer claims
  - Paid image generation beyond the declared image roles, or changes to the approved character world and asset authority
  - Generated typography, fake product interfaces, logos, official marks, GitHub mascots, or protected character likenesses
acceptanceCriteria:
  - "Every route totals exactly 60 minutes: 45 minutes of guided journey followed by 15 minutes of protected discussion."
  - The static deck contains exactly 20 visible slides in the required order.
  - The workshop uses one developer use case and does not branch into additional personas or goals.
  - "The required concepts each have their own visible slide: Goal; Properties of the Goal; Harness; Harness Selection Guidance; Planning; Preferred Tech Stack; Governance; Artifact Management; Verification; Workflow Boundary; Boundary Levels; Explicit Stop Conditions; Execution; Evidence of Completion; Human Review and Approval; Act or Stop; Workflow Recap; and Next Responsible Question."
  - The route explicitly distinguishes verification planned before execution from evidence produced by execution.
  - The route explicitly distinguishes governance rules from workflow boundaries.
  - Stop conditions prevent silent scope expansion, weakened tests, unauthorized access, or consequential action without approval.
  - The workshop remains static and publication-safe; it does not execute commands, access repositories, or make production changes.
  - Native visuals carry all teaching meaning without dependence on image pixels.
  - Every visible slide matches the exact title, order, timebox, copy, output, and notes contract.
---

# Workflow First requirements

## Use case

The single use case for this iteration is:

> **Get this repository building and all critical tests passing.**

The participant is a developer or developer-adjacent collaborator planning how
to investigate, change, verify, and hand off work. Additional personas and
goals are deferred until this use case is complete and reviewed.

## Required route

The route is:

**Goal -> Harness -> Planning -> Evidence of Completion -> Human Review and
Approval -> Act or Stop**

Planning is one top-level stage with these properties:

1. Preferred tech stack
2. Governance
3. Artifact management
4. Verification
5. Workflow boundary
6. Project, organization, and enterprise boundary levels
7. Explicit stop conditions
8. Execution

## Goal properties

The goal slide must define:

- desired result;
- owner or recipient;
- priority and constraints;
- acceptance criteria;
- completion signal;
- explicit stop conditions.

## Harness

A harness is where the work is managed. Present capability-neutral choices:

- editor, such as VS Code;
- GitHub Copilot CLI;
- GitHub Copilot app;
- another approved app or workspace; or
- GitHub Actions.

Explain that an interactive harness fits exploratory, ambiguous, one-off work
with frequent human judgment. GitHub Actions fits repeatable repository-scoped
work started by an approved event, schedule, or manual dispatch and producing a
traceable artifact before a human gate. Neither label grants access or implies
execution authority.

## Planning properties

Planning must cover:

- **Preferred tech stack:** existing languages, frameworks, package manager,
  runtime, build tools, test tools, and approved infrastructure.
- **Governance:** what cannot change, what may change now, what may be
  reconsidered later, who can authorize exceptions, and protected policies.
- **Artifact management:** source files, configuration, dependencies, logs,
  test results, summaries, proposed changes, and the human-decision record.
- **Verification:** commands, checks, critical-test set, thresholds, expected
  outputs, review criteria, and responsible verifier.
- **Workflow boundary:** where the workflow starts and stops and which
  repositories, branches, files, systems, environments, permissions, data,
  time, and cost it may touch.
- **Boundary levels:** project, organization, and enterprise examples with
  their different permissions, governance, escalation, and approval needs.
- **Explicit stop conditions:** conditions that pause or end work and the
  evidence, notification, and authorization needed to resume.
- **Execution:** how the approved plan runs, how deviations are recorded, and
  how the workflow stays inside scope.

## Evidence of completion

Evidence must answer whether the goal was met. Relevant evidence includes the
exact revision, failing check or workflow result, build logs and exit status,
critical-test results, recent commits and diffs, dependency and configuration
changes, a known-good comparison, relevant acceptance criteria, and environment
or permission metadata. Evidence stays in existing source systems; the
workshop does not create a duplicate evidence store.

Verification is defined before execution. Evidence of completion is observed
during or after execution. A passing check is evidence, not authorization.

## Explicit stop conditions

Stop immediately when:

- the repository, branch, commit, environment, or failing check is unknown;
- critical tests or acceptance criteria are undefined or disputed;
- evidence is missing, stale, contradictory, unverified, or inaccessible;
- the work would cross the agreed project, organization, or enterprise boundary;
- broader permissions, credentials, secrets, network, or protected-environment
  access is required without approval;
- protected branches, required checks, security controls, audit settings, or
  policy would change without authorization;
- a test would be skipped, weakened, suppressed, deleted, or redefined to pass;
- an unapproved technology, dependency, runtime, infrastructure, or material
  architecture change is proposed;
- the change exceeds scope or includes unrelated modifications;
- verification fails, is incomplete, or cannot run in the approved environment;
- a time, cost, retry, or resource limit is reached;
- secret, personal, confidential, unsafe, or rights-sensitive content appears;
- the next step would merge, deploy, remediate, change status, or take another
  consequential action without explicit human approval; or
- the authorized reviewer rejects the work, requests changes, or is unavailable.

On stop, preserve the current evidence and decision state, state the unmet
condition, avoid consequential action, notify the named human owner, and
identify what evidence, corrected scope, or authorization is needed to resume.

## Delivery contract

- Guided journey: **45 minutes**
- Protected discussion: **15 minutes**
- Total: **60 minutes**
- Missions, labs, accounts, network, media playback, setup, breaks, and
  contingency: **0 minutes**
- Static deck: **20 visible slides**
- No live repository access, command execution, autonomous remediation, merge,
  deployment, test-status authority, or production implementation.
