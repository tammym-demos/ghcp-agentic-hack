---
schemaVersion: 1
kind: complex-topic-plan
id: foundations-complex-topics
title: Foundations Complex Topics
module: foundations
topics:
  - id: token-usage-flow
    status: approved
    objectiveRef: Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for cost-aware daily execution
    sourceTopic: Token classes, AI-credit measurement, and model routing
    slideTitles:
      - "Tokens: What Enters the Model"
      - "Tokens: What Comes Back"
      - GitHub AI Credits
      - "Model Routing: Match the Task"
      - "Model Guide: Match the Workload"
      - "Usage by Harness: IDE and CLI"
      - "Usage by Harness: GitHub, Cloud, and App"
      - "Token Flow: From Evidence to Verified Routing"
    stillAssetIds:
      - token-input-handoff
      - token-output-tradeoff
      - ai-credit-ledger
      - model-routing-evidence
    videoTeachingPurpose: Show the causal path from selected evidence through model-specific token usage to measured AI credits and an evidence-based routing decision.
    estimatedMinutes: 10
    summaryDurationSeconds: 12
    acceptedKeyframes:
      - token-input-handoff
      - token-output-tradeoff
      - ai-credit-ledger
      - model-routing-evidence
    acceptanceSignal: Learners can distinguish input, cached, and output usage and explain why the selected model and observed evidence affect routing decisions.
  - id: context-lifecycle
    status: approved
    objectiveRef: Detect context rot and apply context window hygiene practices
    sourceTopic: Context capacity, packing, drift, recovery, and verification
    slideTitles:
      - "Context Window: What Competes for Space"
      - "Context Packing: Keep the Signal"
      - "Context Rot: Recognize the Signals"
      - "Context Recovery: Reset and Re-anchor"
      - "Context Lifecycle: Pack, Detect Drift, Recover"
    stillAssetIds:
      - context-window-capacity
      - clue-wrangler-context-packing
      - context-drift
      - fresh-lead-context-recovery
    videoTeachingPurpose: Show context moving from bounded capacity through deliberate evidence selection and observable drift to a verified fresh handoff.
    estimatedMinutes: 10
    summaryDurationSeconds: 12
    acceptedKeyframes:
      - context-window-capacity
      - clue-wrangler-context-packing
      - context-drift
      - fresh-lead-context-recovery
    acceptanceSignal: Learners can recognize context drift, stop unreliable execution, and choose a product-supported recovery and re-anchoring action.
status: review
---

# Foundations Complex Topics

## Current context/caching source — 2026-09-07

The approved 22-slide manifest and [context-caching.md](context-caching.md)
supersede the historical token-slide inventory and ten-minute estimate.
Slides 12–18 currently allocate 18 instruction minutes to message inference,
normalized receipts, processing reuse, routing and usage evidence. The earlier
input, ID, next-token, output, AI-credit and first-difference slides are
removed. Original assets and production evidence remain preserved as history.
The accepted manufacturing/context-window slide is now slide 11; its words,
notes, geometry, art, nine clicks and three minutes do not change.

## Current slide 11 adoption — 2026-09-07

The current 22-slide manifest supersedes the historical context-lifecycle
slide/keyframe inventory below. Slide 11, **Context Window: What Competes for
Space**, now uses the accepted fixed wider-neck illustrated plate with nine
presenter-controlled native beats in three minutes. Exact manufacturing
software examples and CLI attribution are governed by Part 2 section 4 and
FND-12. User prompts accumulate on three separate clicks; output headroom is
protected empty space; Compact continuously compresses earlier prompts while
retaining instructions and references in the illustration and dropping some
fine detail. The capacity caption is illustrative, not a named-model claim.
The observable acceptance signal is explaining these distinctions and the
need to verify a compacted summary before continuing. The next production
slide is **How your message shapes the reply**; **Context Rot: Recognize the
Signals** remains slide 19. No removed slide or archived runtime is
reintroduced. See
[production-adoption evidence](media/reviews/2026-09-07-production-adoption.md).

## Historical mappings

These mappings preserve the workshop owner's learning goals and historical still asset ids. All six Sora candidates were human rejected and retired, and the implemented deterministic slide-18/23 summaries are superseded production history. On 2026-08-05, the owner accepted the human-first Mergewell harness/cache story at slide 14, accepted the Mergewell/Purrmission detective-board story in its sequence position (approved slide 22), approved removing duplicate former slide 18 for an exact 24-slide contract, and approved the separate slide 15 Model Guide contract. Existing character designs remain; new poses/compositions are scene-specific, and purple/faceless humanoids are prohibited. Slidev Deck Producer owns contract implementation; Video Production Manager owns text-only production preparation. No paid generation is authorized.
