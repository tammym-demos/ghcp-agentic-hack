---
schemaVersion: 1
kind: module
id: advanced
title: 'Advanced Workflows: Under the Hood of LLMs & Multi-Agent Scale'
description: >-
  Open the engine hood on how LLMs and KV prefix caches work (tokens,
  embeddings, causal self-attention, probability suspect lineup), then apply
  that architecture to Copilot Fusion, subagents, parallel CLI /fleet, Git
  worktrees vs. Stacked PRs, Work IQ MCP, indirect prompt-injection defense, and
  scale operations.
duration: 1 hour 30 minutes
totalMinutes: 90
timing:
  instructionMinutes: 60
  missionMinutes: 30
  discussionMinutes: 0
  mediaPlaybackMinutes: 0
  setupAndTransitionsMinutes: 0
  breaksMinutes: 0
  contingencyMinutes: 0
objectives:
  - Select appropriate multiagent, subagent, and parallel execution patterns
  - Evaluate ecosystem resources and integration surfaces before enterprise use
  - Explain how Copilot Fusion selects an execution pattern and model or models for a task without assuming guaranteed quality, latency, or cost gains
  - Apply agent skills and MCP context to governed Copilot code review workflows
  - Debug agent behavior using narrowed context and observable evidence
  - Evaluate agent outcomes against explicit acceptance criteria and recover to a known state
  - Integrate parallel work with dependency ordering, combined validation, rollback, and human acceptance
  - Plan maintainable distribution, deployment, and Day 2 workflows
prerequisites:
  - Foundations module
  - Agentic Development module
sourceDocuments:
  - requirements.md
  - content/missions/advanced/cross-cutting-change.md
slides: content/modules/03-advanced/slides.md
generation:
  expectedSlides: 20
  manifest: content/modules/03-advanced/slide-manifest.md
  imageProvider: gpt-image-2
  visualStyle: >-
    Native Warm Editorial 2D on a soft off-white stage starring Agent Mergewell,
    Riley Relay, Purrmission (he/him), and Chief Morgan Charter, with native
    Slidev/Vue/SVG motion graphics; no generated text, product UI, logos, or
    mascots in pixels.
labs: []
missions:
  - content/missions/advanced/cross-cutting-change.md
assets:
  - assets/brand/github/GitHub_Lockup_Black_Clearspace.svg
  - assets/brand/microsoft/microsoft-logo.png
  - content/modules/03-advanced/public/images/accountable-trio-cover-anchor.png
  - >-
    content/modules/03-advanced/public/images/parallel-integration-yard-anchor.png
  - content/modules/03-advanced/public/images/role-return-merge-gate-anchor.png
  - content/modules/03-advanced/public/images/token-cache-purrmission-v1.png
  - content/modules/03-advanced/public/images/token-lead-chief-v1.png
status: draft
---

# Advanced Workflows: Under the Hood of LLMs & Multi-Agent Scale

Lift the glass floor beneath the Bureau workbench to see how LLMs and KV prefix caches actually work, then scale across subagents, `/fleet`, Git worktrees, and enterprise defense.
