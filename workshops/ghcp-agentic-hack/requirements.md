---
schemaVersion: 1
kind: workshop-requirements
id: ghcp-agentic-hack
title: "GitHub Copilot Developer Hack"
description: "First Week at the Accountable Engineering Bureau: onboard to coding agent harnesses, ship a feature across the full SDLC with Purrmission's planning and security gates, and master LLM internals, KV prefix caching, and multi-agent scale."
audience:
  - Software developers
  - Technical leads
level: mixed
format: one-day
durationMinutes: 334
outcomes:
  - Operate GitHub Copilot harnesses across VS Code, Copilot CLI, Copilot App, and GitHub Cloud/Mobile using built-in agents, slash commands, tools, skills, and least-privilege permissions.
  - Control token and GitHub AI Credit consumption through usage receipts, context window hygiene, prefix-cache preservation, model routing, and session limits.
  - Execute an end-to-end SDLC workflow from holistic planning and the Four Planning Proofs through test-driven agentic development, the Four Security Evidence Lenses, CI/CD, and exact-commit release management.
  - Explain how LLMs and KV prefix caches work under the hood and apply that architecture to subagents, parallel CLI /fleet and Git worktrees, indirect prompt-injection defense, and scale debugging.
modules:
  - id: foundations
    title: "Foundations: Anatomy of a Coding Harness"
    minutes: 122
    outcomes:
      - Explain what a coding agent harness is, identify the harnesses that work with GitHub Copilot, and operate the Four Harness Rings (Instructions, Tools & MCP, Execution Workspace, Guardrails)
      - Apply built-in interaction modes (Ask, Plan, Agent), essential slash commands, tools, skills, and least-privilege permission levels to a bounded engineering loop
      - Interpret the four token buckets, read usage receipts, prevent context rot, protect the prompt cache, route between Auto and lightweight models, and enforce session credit caps
  - id: agentic
    title: "Agentic Development Across the SDLC"
    minutes: 122
    outcomes:
      - Plan a feature holistically across the SDLC from requirements, Spec, and ADR through Purrmission's Four Planning Proofs (Scope, Saved != Loaded, Negative Tests, Hard Stops)
      - Outfit a project harness with concise layered instructions, Copilot Memory boundaries, Reusable Skills (SKILL.md), role-separated Custom Agents (.agent.md), MCP servers, and Agent Plugins 1.0
      - Operate a test-driven agentic loop with deterministic guardrails, repository hooks (.github/hooks), Git checkpoints, and asynchronous Copilot Cloud Agent handoffs
      - Verify changes through Purrmission's Four Security Evidence Lenses (/security-review, Push Protection, GHAS CodeQL + Dependency Review + Autofix, and Copilot Code Review) and promote an exact reviewed commit SHA to production
  - id: advanced
    title: "Advanced Workflows: Under the Hood of LLMs & Multi-Agent Scale"
    minutes: 90
    outcomes:
      - Explain how tokenization, vocabulary IDs, vector embeddings, causal-transformer self-attention, and next-token probability sampling work under the hood and why fluent plausibility is never proof of truth
      - Explain how Key-Value (KV) prefix caching reuses intermediate attention state across turns, what invalidates the cache, and when to use HydraFusion or local CLI models
      - Select lowest-sufficient orchestration patterns across subagents (protecting the parent KV cache), parallel Copilot CLI /fleet, isolated Git worktrees, and dependency-ordered Stacked PRs
      - Connect governed enterprise context via Work IQ remote MCP, defend against indirect prompt injection across the Four Harness Rings, debug cross-surface telemetry, and integrate parallel work for production release
sources: []
visualStyle: >-
  Native Warm Editorial 2D on a soft off-white stage starring Agent Mergewell,
  Riley Relay, Purrmission (he/him), and Chief Morgan Charter, paired with
  presenter-controlled native SVG/HTML/CSS motion graphics and interactive
  walkthroughs; no generated text, product UI, logos, or mascots in pixels.
imageRoles: []
exclusions:
  - Video generation or unapproved third-party mascot/logo pixels
  - Claims that fluent LLM prose or automated review replaces deterministic testing or human merge ownership
  - Fixed percentage savings promises or hardcoded plan pricing
acceptanceCriteria:
  - Day 1 totals 424 minutes (77m + 45m Foundations, 77m + 45m Agentic, 60m + 30m Advanced, 15m kickoff, 75m breaks); 2-day variant totals 844 minutes.
  - Foundations (24 slides), Agentic (29 slides), and Advanced (20 slides) match their slide manifests and carry ordered 7-section speaker notes on every visible slide.
  - All 12 hero motion graphics and interactive walkthroughs render natively with reduced-motion support.
---

# GitHub Copilot Developer Hack (`ghcp-agentic-hack`) Requirements

This requirements file governs the updated **GitHub Copilot Developer Hack** workshop (*First Week at the Accountable Engineering Bureau*).
