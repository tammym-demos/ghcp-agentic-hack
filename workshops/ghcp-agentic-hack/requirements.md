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
format: two-day
durationMinutes: 424
outcomes:
  - Operate GitHub Copilot harnesses across VS Code, Copilot CLI, Copilot App, and GitHub Cloud/Mobile using built-in agents, slash commands, tools, skills, and least-privilege permissions.
  - Control token and GitHub AI Credit consumption through usage receipts, context window hygiene, prefix-cache preservation, model routing, and session limits.
  - Execute an end-to-end SDLC workflow from holistic planning and the Four Planning Proofs through test-driven agentic development, the Four Security Evidence Lenses, CI/CD, and exact-commit release management.
  - Explain how LLMs and KV prefix caches work under the hood and apply that architecture to Copilot Fusion, subagents, parallel CLI /fleet and Git worktrees, indirect prompt-injection defense, and scale debugging.
modules:
  - id: foundations
    title: "Foundations: Anatomy of a Coding Harness"
    minutes: 122
    outcomes:
      - Explain where GitHub Copilot lives across IDE, terminal, GitHub.com, cloud, and app surfaces and identify enterprise safety responsibilities
      - Apply VS Code chat references, inline completions, inline chat, and Ask/Plan/Agent modes to real engineering tasks
      - Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
      - Detect context rot and apply context window hygiene practices
      - Apply the autonomy spectrum and least-privilege delegation before escalating to agentic patterns
  - id: agentic
    title: "Agentic Development Across the SDLC"
    minutes: 122
    outcomes:
      - Apply instructions, memory boundaries, context hierarchy, and strong prompts to long-running agentic work
      - Explain the different jobs of the developer, a software agent, a reusable skill, a custom agent, and a tool
      - Operate an observable agentic loop with deliberate planning, tool control points, progress checks, stop decisions, and recovery
      - Use GitHub Enterprise Cloud repository state, GitHub Actions, pull requests, and cloud-agent handoffs as connected workflow evidence
      - Distinguish GitHub Code Quality, Copilot code review, and cloud-agent work, then retain human authority over acceptance and merge
      - Choose a supported product control before an agentic task and verify afterward whether the result justified the AI credits used
  - id: advanced
    title: "Advanced Workflows: Under the Hood of LLMs & Multi-Agent Scale"
    minutes: 90
    outcomes:
      - Select appropriate multiagent, subagent, and parallel execution patterns
      - Evaluate ecosystem resources and integration surfaces before enterprise use
      - Explain how tokenization, vocabulary IDs, vector embeddings, causal-transformer self-attention, and next-token probability sampling work under the hood and why fluent plausibility is never proof of truth
      - Explain how Key-Value (KV) prefix caching reuses intermediate attention state across turns and what invalidates the cache
      - Explain how Copilot Fusion evaluates a task and selects an execution pattern and one or more models without assuming guaranteed quality, latency, or cost gains
      - Select lowest-sufficient orchestration patterns across subagents (protecting the parent KV cache), parallel Copilot CLI /fleet, isolated Git worktrees, and dependency-ordered Stacked PRs
      - Apply agent skills and MCP context to governed Copilot code review workflows
      - Debug agent behavior using narrowed context and observable evidence
      - Evaluate agent outcomes against explicit acceptance criteria and recover to a known state
      - Integrate parallel work with dependency ordering, combined validation, rollback, and human acceptance
      - Plan maintainable distribution, deployment, and Day 2 workflows
runOfShow:
  - { id: executive-kickoff, type: setup, title: Executive kickoff, minutes: 15 }
  - { id: foundations-content, type: module, title: Foundations content, minutes: 77, module: foundations }
  - { id: morning-break, type: break, title: Break, minutes: 15 }
  - { id: foundations-mission, type: module, title: Foundations mission, minutes: 45, module: foundations }
  - { id: agentic-content-one, type: module, title: Agentic Development before lunch, minutes: 28, module: agentic }
  - { id: lunch, type: break, title: Lunch, minutes: 45 }
  - { id: agentic-content-two, type: module, title: Agentic Development after lunch, minutes: 49, module: agentic }
  - { id: agentic-mission, type: module, title: Agentic Development mission, minutes: 45, module: agentic }
  - { id: advanced-content-one, type: module, title: Advanced Workflows before break, minutes: 45, module: advanced }
  - { id: afternoon-break, type: break, title: Break, minutes: 15 }
  - { id: advanced-content-two, type: module, title: Advanced Workflows after break, minutes: 15, module: advanced }
  - { id: advanced-mission, type: module, title: Advanced Workflows mission, minutes: 30, module: advanced }
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
  - Practical missions total 45, 45, and 30 minutes including 5, 5, and 3 minutes of debrief; bonus work never extends these budgets.
  - Missions prioritize developer actions from the revised slides, not exhaustive topic coverage; use one browser-only JavaScript lab with no installation, cloud, or Enterprise dependency.
  - Every core and bonus clue supplies an honest route for VS Code, Copilot CLI, and Copilot app; unavailable capabilities use labeled fallbacks rather than claimed execution.
  - Participants must choose a harness before seeing mission work. Carry the choice from Foundations into later modules unless that mission has its own saved choice; allow switching without clearing progress and show only the selected harness's setup and routes.
  - Participant mission pages show a short timed path and collapse starter code, help, optional notes, bonuses, and leaderboard; preserve local evidence, exports, and existing progress identifiers.
  - Foundations verifies bounded context and a supervised fix; Agentic verifies a brief, instruction, local skill, negative tests and handoff; Advanced verifies lane contracts, untrusted-input handling, sequential integration and restore.
  - Day 1 totals 424 minutes (77m + 45m Foundations, 77m + 45m Agentic, 60m + 30m Advanced, 15m kickoff, 75m breaks); 2-day variant totals 844 minutes.
  - Foundations (24 slides), Agentic (29 slides), and Advanced (20 slides) match their slide manifests and carry ordered 7-section speaker notes on every visible slide.
  - All 12 hero motion graphics and interactive walkthroughs render natively with reduced-motion support.
  - Every slide separates its headline and subtitle at the first colon that is not part of a time, preserves the full title wording, and keeps text, labels, and controls inside their panels.
  - The Advanced module uses the current name Copilot Fusion and accurately describes its task-based model and execution-pattern orchestration without promising a fixed quality, latency, or cost outcome.
  - The active workshop catalog retains only the two-day delivery option, with its existing two-day agenda unchanged.
  - The active workshop detail page links to the GitHub Universe 2026 announcement article.
  - Archived workshop cards remain available in a collapsed-by-default catalog section that visitors can expand.
---

# GitHub Copilot Developer Hack (`ghcp-agentic-hack`) Requirements

This requirements file governs the updated **GitHub Copilot Developer Hack** workshop (*First Week at the Accountable Engineering Bureau*).

## Copilot Fusion and Universe article update

- Reviewed source: [GitHub Universe 2026: Evolving every layer of the stack](https://github.blog/news-insights/company-news/github-universe-2026-evolving-every-layer-of-the-stack/) (2026-10-28).
- Current product name: Copilot Fusion. Replace HydraFusion in participant-facing content; retain historical source titles and URLs as provenance.
- Explain that Fusion evaluates a task and selects an execution pattern and one or more models. Do not promise that Fusion always reduces cost, latency, or improves quality.
- Add the article as a curated external link on the active two-day workshop detail page.
- Keep the slide count and timebox unchanged.
