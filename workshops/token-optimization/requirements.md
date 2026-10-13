---
schemaVersion: 1
kind: workshop-requirements
id: token-optimization
title: "Token Optimization: Get More Verified Progress from Every AI Credit"
description: A one-hour lecture on how tokens, context, caching, model choice, workflow shape, and usage controls determine GitHub Copilot AI Credit consumption, with a lead and admin view.
audience:
  - Software developers and technical leads
  - Engineering leads and Copilot administrators
level: mixed
format: one-hour
durationMinutes: 60
outcomes:
  - Explain what a token is, what the harness sends on each request, and how input, output, reasoning, and cached tokens relate to AI Credits.
  - Keep context lean using fresh sessions, compaction, a short instruction map, and a scoped tool set.
  - Preserve the cache and name the actions that invalidate it.
  - Choose model, reasoning level, Auto, subagent models, and multi-model options by task instead of by habit.
  - Shape work as research, plan, then implement with deterministic guardrails.
  - Measure and cap usage with session limits, chronicle cost tips, and usage views, and describe the lead and admin controls.
modules:
  - id: token-optimization-essentials
    title: "Token Optimization: Get More Verified Progress from Every AI Credit"
    minutes: 60
    outcomes:
      - Trace a request from harness-assembled context to billed tokens and back to a cost decision.
      - Apply ten verified habits that reduce unnecessary tokens without trading away result quality.
      - Name the measurement, cap, and policy controls available to developers, leads, and admins.
sources: []
visualStyle: Native Warm Editorial 2D character-world accents on a soft off-white stage, with all instructional text, tables, and diagrams rendered as native Slidev HTML or SVG.
imageRoles:
  - id: opt-opening-chief
    module: token-optimization-essentials
    purpose: "Slide 2 Opening: Chief Morgan Charter alone, gesturing toward open space for the native route strip."
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-token-optimization-essentials/token-optimization-source.md
      sourceHash: 671854ea2312d92b44f4425d9f587d2c8b8f734ae29c426ddcb36e466b423fed
      promptHashes:
        - 3784397d19db10f99742eebf1c6c35df336ac45aba887fbae524fa0b94097b7c
        - 87cb69b5f5113b58bb730336a55717ac653b28c827a2932536f28c6d7a861dd8
      referencePath: content/modules/01-token-optimization-essentials/public/images/workflow-team-shallow-depth-v7.png
      referenceHash: 38557dd55052a46fbb07bf31c9fe2d1d4fc70e4feaeda70edfa6c75375cc25fb
      width: 1248
      height: 832
      outputFormat: png
  - id: opt-context-riley
    module: token-optimization-essentials
    purpose: "Slides 8-9 context rot and keep context lean: Riley Relay overloaded with blank paper files on one side, lighter and relieved on the other."
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-token-optimization-essentials/token-optimization-source.md
      sourceHash: 671854ea2312d92b44f4425d9f587d2c8b8f734ae29c426ddcb36e466b423fed
      promptHashes:
        - b395b3ccfcc997d57c24366b2b21975c100b4409c6d821a1f91ff6a93162186d
        - d5f289ecab6ff98dae0aec895e920cfee3e4771bfe3e3903864588897036f820
      referencePath: content/modules/01-token-optimization-essentials/public/images/workflow-team-shallow-depth-v7.png
      referenceHash: 38557dd55052a46fbb07bf31c9fe2d1d4fc70e4feaeda70edfa6c75375cc25fb
      width: 1248
      height: 832
      outputFormat: png
  - id: opt-cache-purrmission
    module: token-optimization-essentials
    purpose: "Slide 12 cache: Purrmission asleep on a warm cushion stack, second pose startled and awake."
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-token-optimization-essentials/token-optimization-source.md
      sourceHash: 671854ea2312d92b44f4425d9f587d2c8b8f734ae29c426ddcb36e466b423fed
      promptHashes:
        - 472c081cb1f2ce4799e88faadc920400bfb00fff63059f5faa2559d8c7e12fc8
        - 3689236d7f677f7344ba3bacdbc25faa1c24501ec828dd0211b95c57cf9237af
      referencePath: content/modules/01-token-optimization-essentials/public/images/workflow-team-shallow-depth-v7.png
      referenceHash: 38557dd55052a46fbb07bf31c9fe2d1d4fc70e4feaeda70edfa6c75375cc25fb
      width: 1248
      height: 832
      outputFormat: png
  - id: opt-model-mergewell
    module: token-optimization-essentials
    purpose: "Slides 14-15 model choice: Agent Mergewell at a three-lane junction of abstract light, mid, and strong lanes."
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-token-optimization-essentials/token-optimization-source.md
      sourceHash: 671854ea2312d92b44f4425d9f587d2c8b8f734ae29c426ddcb36e466b423fed
      promptHashes:
        - 5b1f5a58e4fa9a5c7cc3704a93da14b534cdc3aa41c5235a62aab27fa8b35529
        - a6752f082f469ada0d9b8ed1d27dbf9afa45c160ca627ef8fd39637ef1726f2e
      referencePath: content/modules/01-token-optimization-essentials/public/images/workflow-team-shallow-depth-v7.png
      referenceHash: 38557dd55052a46fbb07bf31c9fe2d1d4fc70e4feaeda70edfa6c75375cc25fb
      width: 1248
      height: 832
      outputFormat: png
  - id: opt-measure-riley
    module: token-optimization-essentials
    purpose: "Slide 18 measure and cap: Riley Relay holding a simple dial gauge with a stop-hand pose."
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-token-optimization-essentials/token-optimization-source.md
      sourceHash: 671854ea2312d92b44f4425d9f587d2c8b8f734ae29c426ddcb36e466b423fed
      promptHashes:
        - 3b96a7ec955e64bc5990d880a31a154cb0f2419f509078b512321891c9fec69b
        - 2bbd46f9927b00c70fc0f0288e5353f23f857ac9bbbdf9acc19b8f149c8105fd
      referencePath: content/modules/01-token-optimization-essentials/public/images/workflow-team-shallow-depth-v7.png
      referenceHash: 38557dd55052a46fbb07bf31c9fe2d1d4fc70e4feaeda70edfa6c75375cc25fb
      width: 1248
      height: 832
      outputFormat: png
  - id: opt-lead-chief
    module: token-optimization-essentials
    purpose: "Slide 19 lead and admin: Chief Morgan Charter at a desk with abstract dials and levers."
    request:
      provider: mai-image-2.6
      deployment: MAI-Image-2.6
      endpoint: https://ghcp-v5-mai-resource.cognitiveservices.azure.com/
      source: content/modules/01-token-optimization-essentials/token-optimization-source.md
      sourceHash: 671854ea2312d92b44f4425d9f587d2c8b8f734ae29c426ddcb36e466b423fed
      promptHashes:
        - a77dd28fd6507eea5aa2815b133aff2e90b27fb4121f0059ad47e81da46c828b
        - ff2591ecf01ddc937ae844da4df75e1995cf3b0ec6295387177c374838d50fad
      referencePath: content/modules/01-token-optimization-essentials/public/images/workflow-team-shallow-depth-v7.png
      referenceHash: 38557dd55052a46fbb07bf31c9fe2d1d4fc70e4feaeda70edfa6c75375cc25fb
      width: 1248
      height: 832
      outputFormat: png
exclusions:
  - Missions, labs, live demonstrations, accounts, repositories, or required network access
  - Video generation, and any image generation beyond the declared imageRoles (reference edits of approved characters only)
  - Fixed savings percentages or any claim that one practice guarantees lower credits
  - Plan allowance amounts, prices, or per-model rates unless re-verified on first-party GitHub documentation immediately before delivery
  - Claims sourced only from third-party blogs or aggregators
  - Customer names, confidential facts, or unsupported legal, compliance, or return-on-investment claims
  - Generated typography, fake product interfaces, logos, official marks, GitHub mascots, or protected character likenesses
acceptanceCriteria:
  - "The route totals exactly 60 minutes of instruction with no mission time."
  - The deck contains exactly 21 visible slides in the order listed in the Required route, each with a seven-section speaker-notes comment.
  - Terminology is GitHub AI Credits on first mention and AI credits afterward; never premium requests as the current unit.
  - Every time-sensitive claim carries a first-party source id and review date, and states its plan, surface, and preview caveats.
  - The deck distinguishes AI credits from other meters such as GitHub Actions minutes.
  - Reused slides keep their approved native diagrams and caveats; new slides add the October 2026 items only where first-party sources support them.
  - Native visuals carry all teaching meaning without dependence on image pixels.
---

# Token Optimization requirements

## Governing aim

Teach experienced developers, leads, and admins to use Copilot as a harness
whose cost is driven by what it sends, which model runs, and how work is shaped.
The measure of success is **useful, verified progress**, not the fewest credits.

## Required route (21 slides, 60 minutes)

| # | Title | Min | Reuse / new |
| --- | --- | ---: | --- |
| 1 | Token Optimization | 1 | New intro; reuse workflow-team-shallow-depth-v7 |
| 2 | Token Optimization: Opening | 1 | New |
| 3 | Why Tokens Matter Now: GitHub AI Credits | 3 | New + research CREDIT-01/02/09 |
| 4 | Tokens: What Enters the Model | 3 | Reuse Foundations F11 |
| 5 | From Text to Model-Ready Numbers | 2 | Reuse Foundations F14 |
| 6 | Input, Output, Reasoning, and Cached Tokens | 3 | Reuse F17 concepts |
| 7 | Context Window: What Competes for Space | 3 | Reuse Foundations F11 |
| 8 | Context Rot: Recognize the Signals | 3 | Reuse Foundations F12 |
| 9 | Keep Context Lean: New, Clear, Compact | 3 | Reuse Agentic A7 + new docs |
| 10 | A Map, Not a Manual: Instructions and Tool Sets | 3 | New (docs sections 3, 7) |
| 11 | Same Conversation. Different Reuse. | 3 | Reuse Foundations F17 |
| 12 | What Breaks the Cache | 4 | New (docs section 4) |
| 13 | Right Model, Right Task, Regular Reasoning | 3 | Reuse + docs section 1 |
| 14 | Auto, Cheaper Subagents, and Light Models | 3 | New (Auto, Haiku 5.5) |
| 15 | Multi-Model and Local Options: HydraFusion and Local Models | 3 | New (Sep 30 and Oct 7 changelog) |
| 16 | Research, Plan, Implement | 3 | New (docs section 6) |
| 17 | Deterministic Guardrails Reduce Retries | 3 | Reuse Agentic A26 |
| 18 | Measure and Cap: Limits, Chronicle, Usage Views | 4 | New (SAFE-01, CREDIT-03/08, chronicle) |
| 19 | The Lead and Admin Lens: Budgets, Policy, Review Effort | 4 | New (budgets; review Balanced default) |
| 20 | Ten Habits Recap | 3 | Reuse six tips, extended |
| 21 | Useful Verified Progress: Next Responsible Step | 2 | New |

Total: 60 slide minutes = 60 (no separate setup or transition bucket).

## Source basis (re-verify before delivery)

- Optimizing your AI usage: https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
- Existing verified register: `workshops/ghcp-dev-hack/content/research/agentic-ai-credit-optimization.md`
- Changelog 2026-10-07 Claude Haiku 5.5; 2026-10-07 local models in Copilot CLI;
  2026-09-30 HydraFusion in VS Code and the Copilot app (research preview);
  2026-10-02 Copilot code review API and Balanced default effort;
  2026-10-01 dynamic workflows (optional mention on slide 15).
- Reused slides come from `workshops/ghcp-dev-hack` Foundations and Agentic modules.

