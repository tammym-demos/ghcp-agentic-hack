---
schemaVersion: 1
kind: module
id: advanced
title: 'Advanced Workflows: Under the Hood of LLMs & Multi-Agent Scale'
description: 'Select appropriate multiagent, subagent, and parallel execution patterns'
duration: 90 minutes
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
  - 'Select appropriate multiagent, subagent, and parallel execution patterns'
  - Evaluate ecosystem resources and integration surfaces before enterprise use
  - >-
    Explain how tokenization, vocabulary IDs, vector embeddings,
    causal-transformer self-attention, and next-token probability sampling work
    under the hood and why fluent plausibility is never proof of truth
  - >-
    Explain how Key-Value (KV) prefix caching reuses intermediate attention
    state across turns and what invalidates the cache
  - >-
    Explain how Copilot Fusion evaluates a task and selects an execution pattern
    and one or more models without assuming guaranteed quality, latency, or cost
    gains
  - >-
    Select lowest-sufficient orchestration patterns across subagents (protecting
    the parent KV cache), parallel Copilot CLI /fleet, isolated Git worktrees,
    and dependency-ordered Stacked PRs
  - Apply agent skills and MCP context to governed Copilot code review workflows
  - Debug agent behavior using narrowed context and observable evidence
  - >-
    Evaluate agent outcomes against explicit acceptance criteria and recover to
    a known state
  - >-
    Integrate parallel work with dependency ordering, combined validation,
    rollback, and human acceptance
  - 'Plan maintainable distribution, deployment, and Day 2 workflows'
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
