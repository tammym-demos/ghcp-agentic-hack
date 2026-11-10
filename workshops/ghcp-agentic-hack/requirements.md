---
schemaVersion: 1
kind: workshop-requirements
id: ghcp-agentic-hack
title: GitHub Copilot Developer Hack
description: >-
  First Week at the Accountable Engineering Bureau: onboard to coding agent
  harnesses, ship a feature across the full SDLC with Purrmission's planning and
  security gates, and master LLM internals, KV prefix caching, and multi-agent
  scale.
audience:
  - Software developers
  - Technical leads
level: mixed
format: two-day
durationMinutes: 424
outcomes:
  - >-
    Operate GitHub Copilot harnesses across VS Code, Copilot CLI, Copilot App,
    and GitHub Cloud/Mobile using built-in agents, slash commands, tools,
    skills, and least-privilege permissions.
  - >-
    Control token and GitHub AI Credit consumption through usage receipts,
    context window hygiene, prefix-cache preservation, model routing, and
    session limits.
  - >-
    Execute an end-to-end SDLC workflow from holistic planning and the Four
    Planning Proofs through test-driven agentic development, the Four Security
    Evidence Lenses, CI/CD, and exact-commit release management.
  - >-
    Explain how LLMs and KV prefix caches work under the hood and apply that
    architecture to Copilot Fusion, subagents, parallel CLI /fleet and Git
    worktrees, indirect prompt-injection defense, and scale debugging.
modules:
  - id: foundations
    title: 'Foundations: Anatomy of a Coding Harness'
    minutes: 122
    outcomes:
      - >-
        Explain where GitHub Copilot lives across IDE, terminal, GitHub.com,
        cloud, and app surfaces and identify enterprise safety responsibilities
      - >-
        Apply VS Code chat references, inline completions, inline chat, and
        Ask/Plan/Agent modes to real engineering tasks
      - >-
        Interpret tokens, GitHub AI Credits, and model-routing tradeoffs for
        cost-aware daily execution
      - Detect context rot and apply context window hygiene practices
      - >-
        Apply the autonomy spectrum and least-privilege delegation before
        escalating to agentic patterns
  - id: agentic
    title: Agentic Development Across the SDLC
    minutes: 122
    outcomes:
      - >-
        Apply instructions, memory boundaries, context hierarchy, and strong
        prompts to long-running agentic work
      - >-
        Explain the different jobs of the developer, a software agent, a
        reusable skill, a custom agent, and a tool, including how skill
        frontmatter descriptions support relevance-based discovery without
        guaranteeing selection or invocation
      - >-
        Operate an observable agentic loop with deliberate planning, tool
        control points, progress checks, stop decisions, and recovery
      - >-
        Use GitHub Enterprise Cloud repository state, GitHub Actions, pull
        requests, and cloud-agent handoffs as connected workflow evidence
      - >-
        Distinguish GitHub Code Quality, Copilot code review, and cloud-agent
        work, then retain human authority over acceptance and merge
      - >-
        Choose a supported product control before an agentic task and verify
        afterward whether the result justified the AI credits used
  - id: advanced
    title: 'Advanced Workflows: Under the Hood of LLMs & Multi-Agent Scale'
    minutes: 90
    outcomes:
      - 'Select appropriate multiagent, subagent, and parallel execution patterns'
      - >-
        Evaluate ecosystem resources and integration surfaces before enterprise
        use
      - >-
        Explain how tokenization, vocabulary IDs, vector embeddings,
        causal-transformer self-attention, and next-token probability sampling
        work under the hood and why fluent plausibility is never proof of truth
      - >-
        Explain how Key-Value (KV) prefix caching reuses intermediate attention
        state across turns and what invalidates the cache
      - >-
        Explain how Copilot Fusion evaluates a task and selects an execution
        pattern and one or more models without assuming guaranteed quality,
        latency, or cost gains
      - >-
        Select lowest-sufficient orchestration patterns across subagents
        (protecting the parent KV cache), parallel Copilot CLI /fleet, isolated
        Git worktrees, and dependency-ordered Stacked PRs
      - >-
        Apply agent skills and MCP context to governed Copilot code review
        workflows
      - Debug agent behavior using narrowed context and observable evidence
      - >-
        Evaluate agent outcomes against explicit acceptance criteria and recover
        to a known state
      - >-
        Integrate parallel work with dependency ordering, combined validation,
        rollback, and human acceptance
      - 'Plan maintainable distribution, deployment, and Day 2 workflows'
runOfShow:
  - id: executive-kickoff
    type: setup
    title: Executive kickoff
    minutes: 15
  - id: foundations-content
    type: module
    title: Foundations content
    minutes: 77
    module: foundations
  - id: morning-break
    type: break
    title: Break
    minutes: 15
  - id: foundations-mission
    type: module
    title: Foundations mission
    minutes: 45
    module: foundations
  - id: agentic-content-one
    type: module
    title: Agentic Development before lunch
    minutes: 28
    module: agentic
  - id: lunch
    type: break
    title: Lunch
    minutes: 45
  - id: agentic-content-two
    type: module
    title: Agentic Development after lunch
    minutes: 49
    module: agentic
  - id: agentic-mission
    type: module
    title: Agentic Development mission
    minutes: 45
    module: agentic
  - id: advanced-content-one
    type: module
    title: Advanced Workflows before break
    minutes: 45
    module: advanced
  - id: afternoon-break
    type: break
    title: Break
    minutes: 15
  - id: advanced-content-two
    type: module
    title: Advanced Workflows after break
    minutes: 15
    module: advanced
  - id: advanced-mission
    type: module
    title: Advanced Workflows mission
    minutes: 30
    module: advanced
sources: []
visualStyle: >-
  Native Warm Editorial 2D on a soft off-white stage starring Agent Mergewell,
  Riley Relay, Purrmission (he/him), and Chief Morgan Charter, paired with
  presenter-controlled native SVG/HTML/CSS motion graphics and interactive
  walkthroughs; no generated text, product UI, logos, or mascots in pixels.
imageRoles:
  - id: intro-clip1-neutral
    module: foundations
    purpose: Clip 1 full-scene resting still with all standing characters arms down
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 603f964dfd3864282fbcb45456d48911c396de038c95b1917f2f87a82a2c7033
      referencePath: >-
        content/modules/01-foundations/public/images/team-portrait-purrmission-final.png
      referenceHash: da37f68ec5932225ed5b5f49e75d847eac7b294d8329457ad1abaf84b6dc0f77
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-clip1-mergewell-hello
    module: foundations
    purpose: >-
      Clip 1 full-scene still with only Mergewell greeting and all listeners
      arms down
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - e126b8a8b0109ebf31f4c293e87210ecdf5c5621cfae682d672d9a6766dda522
      referencePath: >-
        content/modules/01-foundations/public/images/team-portrait-purrmission-final.png
      referenceHash: da37f68ec5932225ed5b5f49e75d847eac7b294d8329457ad1abaf84b6dc0f77
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-clip1-riley-hello
    module: foundations
    purpose: >-
      Clip 1 full-scene still with only Riley greeting after Mergewell has
      lowered his arm
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 43dbf2779ee89f21464dbc077b8cf6ac7e0146464baea2bb076a75a48f078491
        - eb82811fa2c68846227ec95d08801a294022bf71d87eb0980de4d6dd685ee89b
      referencePath: >-
        content/modules/01-foundations/public/images/team-portrait-purrmission-final.png
      referenceHash: da37f68ec5932225ed5b5f49e75d847eac7b294d8329457ad1abaf84b6dc0f77
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-reference
    module: foundations
    purpose: Standalone character study of Agent Mergewell for continuity review
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 3a506ee13fda9c60f28434fc44d5fe79d6d36e8919b5d8d7e8654e6f462903ef
      referencePath: >-
        content/modules/01-foundations/public/images/team-portrait-purrmission-final.png
      referenceHash: da37f68ec5932225ed5b5f49e75d847eac7b294d8329457ad1abaf84b6dc0f77
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-reference
    module: foundations
    purpose: Standalone character study of Riley Relay for continuity review
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 4fdeacf9c993941a8eeae4b5c1f55c24de75a5cf28a3c3859011b39872470ef1
      referencePath: >-
        content/modules/01-foundations/public/images/team-portrait-purrmission-final.png
      referenceHash: da37f68ec5932225ed5b5f49e75d847eac7b294d8329457ad1abaf84b6dc0f77
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-reference
    module: foundations
    purpose: Standalone character study of Chief Morgan Charter for continuity review
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 6c4994aadd29b768d3d2ccbf8ed8caa7097146bbdb9287432dfed48f93b3c0d2
      referencePath: >-
        content/modules/01-foundations/public/images/team-portrait-purrmission-final.png
      referenceHash: da37f68ec5932225ed5b5f49e75d847eac7b294d8329457ad1abaf84b6dc0f77
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-reference
    module: foundations
    purpose: Standalone character study of Purrmission for continuity review
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - a3508d1c72436fbe0136daf70b8901da03f891131b3458d1283bfb7d08de0b7a
      referencePath: >-
        content/modules/01-foundations/public/images/team-portrait-purrmission-final.png
      referenceHash: da37f68ec5932225ed5b5f49e75d847eac7b294d8329457ad1abaf84b6dc0f77
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-front
    module: foundations
    purpose: Agent Mergewell Front - hello full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 39defc25a923fb333db3c7824f577152b20f99a768d8a46fe88954ae9ad2e428
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-front-left
    module: foundations
    purpose: >-
      Agent Mergewell Front left - hello and weight left full-figure continuity
      study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - a824f7de684d892b584f2c1fd8a5191d6289ec68651d7af4cc7bf179e3a3ceea
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-left-profile
    module: foundations
    purpose: Agent Mergewell Left profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 282fa20b0a8e5bdcbf2294599604b0edf2dd9eb4263f8462066d933374485410
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-rear-left
    module: foundations
    purpose: Agent Mergewell Rear left three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - a685c15592397ce098f84c7e98fc5c1597e6d61da0b83804e26576f2058996a9
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-back
    module: foundations
    purpose: Agent Mergewell Back full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 431e00544ed3e48e70868f03185e835b66b8b6538ca762c620dc977c8334e48e
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-rear-right
    module: foundations
    purpose: Agent Mergewell Rear right three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 64181ba402027a12cc95c0f9fb81801a5d85408743a26de42751f0a64db1518a
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-right-profile
    module: foundations
    purpose: Agent Mergewell Right profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 488bc6c353213f8278c5bd5fc697134589300f381ecb95d1fbb5b2b12a67eda6
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-mergewell-turnaround-front-right
    module: foundations
    purpose: >-
      Agent Mergewell Front right - hello and weight right full-figure
      continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - a8613a48386e066c0e553ce8c60a27a7603206fb258d672aa921845281576982
      referencePath: >-
        content/modules/01-foundations/media/references/intro-mergewell-anchor.png
      referenceHash: 7d0b73ad121a8b97f7e79e662dbf983dddb7a6baaf99deee0743d63a9fd7516a
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-front
    module: foundations
    purpose: Riley Relay Front - hello full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - f0c249982d9c474fe71d04813ba5d991447464cc24d05bc023a7a9b60830f991
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-front-left
    module: foundations
    purpose: >-
      Riley Relay Front left - hello and weight left full-figure continuity
      study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 7c6aece38dd911065ffb018f9d45ebc30c8be5284b598be043229114cf8e9d26
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-left-profile
    module: foundations
    purpose: Riley Relay Left profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 91c43e1f43757d5a573156fcab93e56a088a23b1efe14234e87111aff4965f04
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-rear-left
    module: foundations
    purpose: Riley Relay Rear left three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 64da7fa3a0821180b973c7032e93c3c910e5639e9ceedc770f565897f576f208
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-back
    module: foundations
    purpose: Riley Relay Back full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - ca89167f949c2ebedb4cbbe1597d76917c21878c022d609ba2d1560d4661acbf
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-rear-right
    module: foundations
    purpose: Riley Relay Rear right three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 1d30e5c1376a87035fbbb256b407ece46ece13ccb1bb987bdf745589a3a13256
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-right-profile
    module: foundations
    purpose: Riley Relay Right profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 3ee2eade58edae4501a1654f1f4259daec9b7ba53931d3770943169a43d46b44
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-riley-turnaround-front-right
    module: foundations
    purpose: >-
      Riley Relay Front right - hello and weight right full-figure continuity
      study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 162f0d46f0114c9c349ed36866fc4ba6d2bb7123fdf40ac6b17e39454dac2de8
      referencePath: content/modules/01-foundations/media/references/intro-riley-anchor.png
      referenceHash: 775226b96f94c3d96886b9328f6fe848a1297d21d777dd502ecb94c9386cd107
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-turnaround-front
    module: foundations
    purpose: Chief Morgan Charter Front - hello full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 8f91a9c93f7620b849ff0a9cbc7612af1bf0eead296bcbae17f32ed128888846
      referencePath: >-
        content/modules/01-foundations/media/references/intro-chief-morgan-anchor.png
      referenceHash: 3392d3807a56f3e235ff68921d32a9ffdf3ca7e2e54b9d3fbe6f49880dd91920
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-turnaround-left-profile
    module: foundations
    purpose: Chief Morgan Charter Left profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 0e7431d08072ee5687bd43c7dff49578f910857407e961f55dc01555890116db
        - 1ef050a963c691cf3fa44b9569ac99cc80369583199fd4b72c8ba50338d0e233
      referencePath: >-
        content/modules/01-foundations/media/references/intro-chief-morgan-anchor.png
      referenceHash: 3392d3807a56f3e235ff68921d32a9ffdf3ca7e2e54b9d3fbe6f49880dd91920
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-turnaround-rear-left
    module: foundations
    purpose: Chief Morgan Charter Rear left three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - c7d52e824fa10bff7d8beffa9faacf6c1ba634b16876d7f9fb1501eb59207428
      referencePath: >-
        content/modules/01-foundations/media/references/intro-chief-morgan-anchor.png
      referenceHash: 3392d3807a56f3e235ff68921d32a9ffdf3ca7e2e54b9d3fbe6f49880dd91920
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-turnaround-back
    module: foundations
    purpose: Chief Morgan Charter Back full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - e85a3b38600d0b27238638e494163a3866951a5af8bc335500702122de6f6e9a
      referencePath: >-
        content/modules/01-foundations/media/references/intro-chief-morgan-anchor.png
      referenceHash: 3392d3807a56f3e235ff68921d32a9ffdf3ca7e2e54b9d3fbe6f49880dd91920
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-turnaround-rear-right
    module: foundations
    purpose: Chief Morgan Charter Rear right three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 77830d5d80ca5b310f27d7e108262095476216d0887f96043c07e815a43bcb0d
      referencePath: >-
        content/modules/01-foundations/media/references/intro-chief-morgan-anchor.png
      referenceHash: 3392d3807a56f3e235ff68921d32a9ffdf3ca7e2e54b9d3fbe6f49880dd91920
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-turnaround-right-profile
    module: foundations
    purpose: Chief Morgan Charter Right profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 15a755aa7acd7dd1d25afca74962cb62b5789dc444a61a6c3fdb22a616f23be9
      referencePath: >-
        content/modules/01-foundations/media/references/intro-chief-morgan-anchor.png
      referenceHash: 3392d3807a56f3e235ff68921d32a9ffdf3ca7e2e54b9d3fbe6f49880dd91920
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-chief-morgan-turnaround-front-right
    module: foundations
    purpose: >-
      Chief Morgan Charter Front right - hello and weight right full-figure
      continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - c2e50a5b3989efbacc90233f08c65c07932d01eeb71d2f7214d97e7633ff1896
      referencePath: >-
        content/modules/01-foundations/media/references/intro-chief-morgan-anchor.png
      referenceHash: 3392d3807a56f3e235ff68921d32a9ffdf3ca7e2e54b9d3fbe6f49880dd91920
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-front
    module: foundations
    purpose: Purrmission Front - hello full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - bd3230ef6d2b1701b98c38226d926fc13b2081b11727eb41906b763713abf857
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-front-left
    module: foundations
    purpose: >-
      Purrmission Front left - hello and weight left full-figure continuity
      study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 9cf5106c051e5aba079754a1693c10f80dd7cd6d217648ad73decadeb53b4123
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-left-profile
    module: foundations
    purpose: Purrmission Left profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 80f12c69fe05d0d3ca5f70ebe046c9f89c46b85819e3fd9e20f679dee7fd8c5c
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-rear-left
    module: foundations
    purpose: Purrmission Rear left three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - b6352658d72b2be11317456dc51d405c49c622ff65dd10d173a3813cb349c295
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-back
    module: foundations
    purpose: Purrmission Back full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 858dd9ab050a3dc66a306613245e448028ac1173cb8982aba9be209c5b7e5c49
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-rear-right
    module: foundations
    purpose: Purrmission Rear right three-quarter full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 7d6429531b76cef4e50fc977f0c1faa8a60c7c0721f547c6cf1dac9b0d63a28c
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-right-profile
    module: foundations
    purpose: Purrmission Right profile full-figure continuity study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 11d8cb9fbb0e7e08981e7ce714af24a9a8b21eadb40c1034d2ad2d7c2d5f68a1
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
  - id: intro-purrmission-turnaround-front-right
    module: foundations
    purpose: >-
      Purrmission Front right - hello and weight right full-figure continuity
      study
    request:
      provider: comfyui-qwen21
      deployment: qwen_image_2.1_int8_convrot.safetensors
      endpoint: 'http://127.0.0.1:8188'
      source: >-
        content/modules/01-foundations/media/comfyui-intro-character-references.json
      sourceHash: 5c65619e28a140a7b345ae9a2592b812f1b6fc22dcec31aa7061d1527531a516
      promptHashes:
        - 1036c9a3472cd84ce46a1b75414efbfa8a99f1e9ad48e2400d621e4042a3c265
      referencePath: >-
        content/modules/01-foundations/media/references/intro-purrmission-anchor.png
      referenceHash: 58f935ebee90884f011fa6f4acdc25023e6932f9b387578c7cd3221319718dec
      width: 1536
      height: 1024
      outputFormat: png
exclusions:
  - Unapproved third-party mascot/logo pixels
  - >-
    Claims that fluent LLM prose or automated review replaces deterministic
    testing or human merge ownership
  - Fixed percentage savings promises or hardcoded plan pricing
  - >-
    The uncertain Chief Morgan front-left request and recovered image are
    excluded from the active reference set; do not retry, replace, or promote
    them.
acceptanceCriteria:
  - >-
    Practical missions total 45, 45, and 30 minutes including 5, 5, and 3
    minutes of debrief; bonus work never extends these budgets.
  - >-
    Missions prioritize developer actions from the revised slides, not
    exhaustive topic coverage; use one browser-only JavaScript lab with no
    installation, cloud, or Enterprise dependency.
  - >-
    Every core and bonus clue supplies an honest route for VS Code, Copilot CLI,
    and Copilot app; unavailable capabilities use labeled fallbacks rather than
    claimed execution.
  - >-
    Participants must choose a harness before seeing mission work. Carry the
    choice from Foundations into later modules unless that mission has its own
    saved choice; allow switching without clearing progress and show only the
    selected harness's setup and routes.
  - >-
    Participant mission pages show a short timed path and collapse starter code,
    help, optional notes, bonuses, and leaderboard; preserve local evidence,
    exports, and existing progress identifiers.
  - >-
    Foundations verifies bounded context and a supervised fix; Agentic verifies
    a brief, instruction, local skill, negative tests and handoff; Advanced
    verifies lane contracts, untrusted-input handling, sequential integration
    and restore.
  - >-
    Day 1 totals 424 minutes (77m + 45m Foundations, 77m + 45m Agentic, 60m +
    30m Advanced, 15m kickoff, 75m breaks); 2-day variant totals 844 minutes.
  - >-
    Foundations (24 slides), Agentic (29 slides), and Advanced (20 slides) match
    their slide manifests and carry ordered 7-section speaker notes on every
    visible slide.
  - >-
    All 12 hero motion graphics and interactive walkthroughs render natively
    with reduced-motion support.
  - >-
    Every slide separates its headline and subtitle at the first colon that is
    not part of a time, preserves the full title wording, and keeps text,
    labels, and controls inside their panels.
  - >-
    The Advanced module uses the current name Copilot Fusion and accurately
    describes its task-based model and execution-pattern orchestration without
    promising a fixed quality, latency, or cost outcome.
  - >-
    The active workshop catalog retains only the two-day delivery option, with
    its existing two-day agenda unchanged.
  - >-
    The active workshop detail page links to the GitHub Universe 2026
    announcement article.
  - >-
    Archived workshop cards remain available in a collapsed-by-default catalog
    section that visitors can expand.
  - >-
    The Foundations welcome cover uses the user-selected team portrait with
    seated Purrmission; preserve the previously approved cover and its
    provenance unchanged.
  - >-
    Prepare one local, standalone reference candidate for each of the four
    characters using the declared portrait and image roles; review continuity
    before any movement poses.
  - >-
    Preserve the selected eight-view sheets for Mergewell, Riley, and
    Purrmission, including their friendly greeting poses; Purrmission greets
    with a raised paw.
  - >-
    Prepare a seven-view Chief Morgan sheet using only confirmed views,
    including her corrected left profile; exclude the uncertain front-left view
    and retain its reservation evidence.
  - >-
    Integrate only the 31 confirmed views and four exact reviewed native sheets
    bound by the reuse manifest, preserving source evidence without changing
    original candidate manifests or receipts.
  - >-
    Preserve the user-accepted Clip 1 audio exactly; audio acceptance is not
    local lifecycle approval.
  - >-
    Clip 1 starts and ends with all standing characters arms down, hands
    separate beside their thighs, and Purrmission seated with paws grounded.
  - >-
    Only the character giving their own hello and introduction raises one open
    greeting hand, then lowers it back to their side; all listeners keep their
    arms down. Chief Morgan does not wave during Clip 1.
  - >-
    Listening turns move only the head and eyes; Mergewell and Chief Morgan keep
    their torsos, shoulders, hips, and feet forward while looking toward Riley.
---

# GitHub Copilot Developer Hack (`ghcp-agentic-hack`) Requirements

This requirements file governs the updated **GitHub Copilot Developer Hack** workshop (*First Week at the Accountable Engineering Bureau*).

## Foundations team cover update

- Use the user-supplied 1536-by-1024 portrait of Mergewell, Riley, Chief Morgan,
  and seated Purrmission for the Foundations welcome cover. The supplied PNG's
  SHA-256 is `1be8341ae29b8a57c961dd58ca00002a23263cf91b5e8c5716af5d78de67a27f`.
- Use a pixel-identical local copy with embedded text metadata removed; retain
  the previous approved cover and its sidecar without overwriting them.
- Keep the slide title, native labels, timing, slide count, and speaker-notes
  contract unchanged. Do not change the cover in other workshops.
- The source image's reference rights and final dynamically enhanced generation
  prompt have not been independently verified. Resolve provenance and usage
  rights before public release; selecting the image is not lifecycle approval.
- This cover update reuses an existing image. The separate character-reference
  roles below do not authorize movement-keyframe generation.

## Intro character-reference studies

- Generate one candidate each for Mergewell, Riley, Chief Morgan, and
  Purrmission from the selected team portrait using only the declared local
  ComfyUI Qwen workflow. Keep the four results as separate, reviewable still
  images; generate animation or video.
- The original study requested eight full-figure views per character: front,
  front three-quarter left, left profile, rear three-quarter left, back, rear
  three-quarter right, right profile, and front three-quarter right. Direction
  is relative to the viewer. Each was a distinct asset, not eight candidates
  for one asset. The active scope now keeps eight views each for Mergewell,
  Riley, and Purrmission and seven for Chief Morgan, excluding her uncertain
  front-left view. Assemble four labeled review sheets with native text; the
  rendered character pixels contain no typography.
- The selected front and front three-quarter views use friendly hello poses
  where available; Purrmission raises a front paw while remaining a
  recognizably natural cat. Chief Morgan's seven-view sheet retains her front
  and front-right greetings but makes no claim to a front-left greeting or
  opposing front-left weight shift. The other views show sides and backs.
- Preserve each character's identity and the portrait's warm 2D style. Show
  complete figures, visible hands, feet and tail where applicable, no other
  characters, and no generated text, product UI, marks, or protected mascots.
  Keep Riley's mechanical hands separated where visible and Purrmission's collar
  tag shield-shaped where visible. A rear view must actually show the back,
  while a profile must actually show the side.
- Keep candidate records and exact workflow, prompt, reference, settings, and
  response provenance. Stop all remaining work in the batch after any provider,
  transport, safety, or uncertain-submission failure; do not retry automatically.
- After the initial batch stopped, the user reviewed the available sheets and
  requested Riley's two front three-quarter views be corrected and the other
  characters' missing views be prepared. Keep Mergewell's selected sheet as-is.
  The distinct follow-up batch `intro-character-eight-view-v2` contains exactly
  one corrected candidate for each of Riley's two successfully completed
  three-quarter roles and one candidate for each of the 13 Chief Morgan and
  Purrmission roles that were never submitted. Riley's initial candidates count
  toward the per-asset limit; no role has more than two candidates across these
  batches. Use the corrected prompts declared above, with exactly two connected
  arms and hands, no clasped-hands remnant, a clear greeting, and the requested
  opposing angles and weight shifts.
- The initial Chief Morgan front-left request remains reserved after an
  uncertain client exit. Preserve its original requirements, reservation, and
  recovered review-only output. Do not retry or replace that request, and do
  not include it in the follow-up batch. Run each follow-up request in its own
  bounded process, sequentially; any new failure or uncertainty stops the
  entire follow-up batch without retry.
- The user accepted the Riley and Purrmission review sheets and requested a
  correction to Chief Morgan's left-profile view. Keep the accepted Riley,
  Purrmission, and Mergewell sheets unchanged. One corrected candidate for
  the already successful `intro-chief-morgan-turnaround-left-profile` role
  succeeded in the separate `intro-chief-morgan-left-profile-v3` cycle. Its
  selected review cutout removes a remaining nape fragment with a bounded
  alpha mask; keep both source candidates and their receipts unchanged.
- The user approved the corrected left-profile cutout and then revised the
  scope to exclude Chief Morgan's unconfirmed front-left view. Prepare the
  seven confirmed views for local review without the recovered image. Keep the
  historical reservation and evidence unchanged; do not retry, replace, or
  promote that excluded request. This scope change authorizes no new image
  generation and is not local or test lifecycle approval.
- Reuse the exact four reviewed native sheets and 31 confirmed cutouts named in
  the hash-bound reuse manifest. Preserve original receipts and candidate
  manifests unchanged; retain portable receipt projections and source images
  as provenance evidence, not as selected or approved artwork. This technical
  reuse decision authorizes no provider calls and does not approve the complete
  local result or waive the portrait's unresolved public-release provenance.
- User review of these studies is not a lifecycle approval. Source-reference
  rights and the original prompt still need review before public release.

## Clip 1 greeting stills - 2026-11-08

- The user accepted the 20-second Clip 1 audio, SHA-256
  `d1137bf38dcd0d2c89ff4820832b1f95efb4bd528dabf7e91a84b6e4155b7acb`.
  Preserve that file and all dialogue, voice settings, and timing unchanged.
- Replace the rejected all-waving pose studies with three full-scene still
  roles: everyone resting with arms down, only Mergewell greeting, and only
  Riley greeting. Reuse the resting still for both returns to arms-down.
  These are static start/end pose references, not rendered motion.
- Begin with both arms down by each standing character's sides. On the
  speaker's own "Hello!" and introduction, raise one arm with the hand open
  toward the audience, then lower it fully. Riley does not greet while
  Mergewell introduces her; Chief Morgan keeps her arms down during Clip 1.
  Retain attentive listener eyelines using head-and-eye turns only; torsos,
  shoulders, hips, and feet remain forward. Mergewell and Chief Morgan must
  not turn their bodies toward Riley while she speaks. Purrmission remains
  seated with both front paws grounded.
- Use the three exact prompts under
  `content/modules/01-foundations/media/intro-clip1-pose-prompts/`, the existing
  portrait, and the declared local Qwen workflow. Run one candidate per role,
  plus one focused Riley head-turn correction after successful visual review,
  sequentially, in cycle `intro-clip1-greeting-stills-v3`; the batch stops after
  any provider, transport, safety, or uncertain-submission failure, with no
  automatic retry or replacement.
- Preserve the four reviewed character sheets, original portrait, earlier
  receipts, and uncertain Chief Morgan reservation unchanged. New stills
  remain local review candidates until selected and integrated. Public-release
  source-rights review and both human lifecycle approvals remain unchanged.
- The still-image request above is separate from the local video-prototype
  authority recorded below.

## Clip 1 local lip-synced video prototype - 2026-11-08

- The user requested the first 20 seconds as a ComfyUI prototype with reference
  images and lip-synced audio, then explicitly authorized downloading the
  required models for a four-character, two-speaker local prototype.
- Preserve the accepted audio bytes, voices, dialogue, and timing. Mergewell
  and Riley are the two audio-driven speakers; Chief Morgan and Purrmission
  remain visible listeners. Do not synthesize replacement speech.
- Use installed native InfiniteTalk nodes and the model files, pinned source
  revisions, hashes, sampling envelope, speaker split, and stop conditions in
  [the prototype configuration](../../docs/scripts/comfyui-clip1-prototype.json).
  Downloads are permitted; cloud inference, paid APIs, server restarts, and
  replacement inference submissions are not part of this request.
- Reuse the three recorded greeting-still candidates as local prototype
  inputs/review references without altering their historical receipts. Their
  reuse does not bypass current-baseline asset-promotion requirements.
- Generate one seven-chunk sequence, retaining motion context between chunks,
  and assemble exactly 500 frames at 25 fps with the original 20-second PCM
  audio. Keep inputs, graph, model hashes, submission receipt, completion
  history, output, and technical/visual review under the ignored candidate
  cycle. Stop after any provider, transport, safety, or uncertain-submission
  failure; do not retry automatically.
- This authority covers local generation, assembly, and review only. It does
  not authorize publication, promotion, or either human lifecycle approval.
- The user subsequently accepted the exact existing clip on 2026-11-08 for
  chaining in CapCut, including its existing visual choices. Preserve an
  unchanged local production source at
  `content/production/accepted-video/clip-01.mp4`, with the exact-hash
  `clip-01.acceptance.json` record. Keep the original candidate cycle and PCM
  master unchanged. Do not regenerate, silently correct, or overwrite this
  accepted source; later editing/effects must produce separate outputs.
- This acceptance is clip-specific, not complete-workshop local approval,
  test approval, or permission to publish or upload to an external service.
  Evaluating CapCut connectivity does not authorize an account connection,
  cloud upload, plugin installation, or editor changes.

## Clip 2 prototypes

### Clip 2 local prototype - 2026-11-08

- The user requested implementing the reviewed Clip 2 improvements and
  generating the next 20 seconds with local model information documented.
  Preserve the accepted Clip 1 MP4 and all original receipts unchanged.
- Follow [the Clip 2 envelope](../../docs/scripts/comfyui-clip2-prototype.json).
  Reuse the six installed Wan/InfiniteTalk/Lightx2v video files and existing
  Kokoro model/voice pack. No new model/provider or cloud inference is needed.
- Retain beats 4-9 and all dialogue in order. Mergewell speaks, Purrmission
  purrs with a closed mouth, Mergewell resumes, and Chief Morgan introduces
  herself. Riley is a silent listener for the entire clip.
- Generate one selected-voice audio candidate for each of the five spoken
  lines, using Mergewell `hm_omega` and Chief Morgan `af_nova`, speed `1.1`.
  Import Mysid's public-domain purr from the configured Commons source,
  retaining the source/license and exact download/extraction/mix provenance.
  Measure the complete mix before rendering. If it does not fit, stop rather
  than truncate or silently retime speech.
- At most one character mouth may animate. During the purr and pauses, all
  mouths remain closed. Do not send the purr to a human audio encoder.
  Use face-tracked, reviewed closed-mouth reference regions for inactive
  characters, retaining generated listener eyes/head/body movement.
  Audio masks/prompts alone do not establish compliance. Reject uncertain
  tracking or incomplete mouth coverage rather than a success-shaped result.
- Initialize from accepted Clip 1's actual decoded frame 499. Chief Morgan
  uses her left hand (screen-right) for one open-hand greeting on her own
  "Hello!" and introduction, raising and lowering it fully. Other arms remain
  down except Mergewell's brief self/presenting gestures; do not add listener
  waves. Finish with hands down and mouths closed for the next handoff.
- Submit one seven-window local InfiniteTalk graph; retain nine motion
  context frames between windows, trim overlap, and assemble exactly 500
  frames at 25 fps with a 20-second audio mix. Stop after any provider,
  transport, safety, or uncertain-submission failure, without automatic retry.
- Retain all sources, pose references, speech candidates, purr provenance,
  source-ending frame, graph, hashes, reservation/history, raw windows,
  controlled/lossless master and viewing copies, all-frame mouth-control
  metrics, and visual review in the ignored candidate cycle. This request
  authorizes local rendering/assembly/review only, not publication, CapCut
  upload, asset acceptance, or either human lifecycle approval.

### Clip 2 purr quality repair - 2026-11-08

- The user reported Purrmission's face distortion during his purr and asked
  to continue the recommended short repair before another full render.
- Limit this iteration to offline processing of existing Clip 2 frames
  135-184 inclusive: 5.40-7.40 seconds, exactly 50 frames at 25 fps. Retain
  the original 48,000-sample audio slice at 24 kHz, including the full purr.
  No new video/image inference, speech generation, model download, upscale,
  provider call, or full-clip replacement is authorized by this repair.
- Review every native cat face in that interval for a closed mouth. Only
  those explicitly audited, source-hash-bound frames may preserve their
  native head/muzzle pixels without the distorted reference overlay.
  Keep existing human mouth controls unchanged. This is not permission to
  bypass mouth isolation for unaudited footage; reject open or uncertain
  native mouths, mismatched source hashes, or incomplete audit coverage.
- Preserve the raw cat's eyes, nose, muzzle, whiskers and head movement
  pixel-for-pixel in lossless evidence. Verify that no pixels outside the
  reviewed restoration region change and that the region cannot affect a
  human mouth. Keep the before and repaired excerpts comparable at the same
  size, rate, audio and encoding settings.
- Retain the all-frame audit, source hashes, lossless repair, before/after
  MP4s, PCM master, pixel/audio verification and a comparison review page in
  the ignored candidate cycle. Preserve approved Clip 1 and all existing
  Clip 2 outputs unchanged. This repair does not accept either candidate
  for chaining or grant either lifecycle approval.

### Clip 2 full native repair and resolution test - 2026-11-08

- The user approved the two-second native purr repair and requested a new
  complete Clip 2. The selected order is full repair first, then a short
  higher-resolution generation test at 25 fps. Neither is a lifecycle approval.
- Apply the separately audited native cat repair to frames 0-499, preserving
  the original full audio and existing human controls. Frame 0 must remain
  exactly the accepted Clip 1 ending PNG in lossless evidence; bind that
  exception separately from frames 1-499 of the native ComfyUI render.
  The bounded restoration rectangle is [240, 256, 416, 432]; reject changes
  below human-control row 200 outside that rectangle. Retain all older outputs.
- Export a separate 20-second MP4, sample-identical PCM MOV and lossless
  evidence. Review the result before accepting the whole clip for chaining.
  Existing human-face softness and greeting/gesture gaps remain visible.
- After successful full repair, permit one two-second 1152x768, 25 fps local
  ComfyUI motion preview using the existing pinned models and 1536x1024 neutral
  reference. Retain the coherent six-step Lightx2v speed preset for this first
  resolution trial, not arbitrary additional steps with the distillation LoRA.
  Use silent conditioning and no dialogue to inspect native facial movement;
  all mouths stay closed. This trial does not establish speech lip-sync quality.
  No interpolation, model downloads, TTS, provider switch or automatic retry.
  Generate one 53-frame window and trim to exactly 50 frames. This is an
  experimental higher-resolution canvas on the existing 480p-trained backbone,
  not a claim of a new 720p model or guaranteed restored facial detail.
- Retain graph, model/source hashes, submission/history, native output and
  face-review evidence. Stop on failed or uncertain submission. No upload,
  publication, full higher-resolution clip regeneration or lifecycle approval.
- Subsequent user decision at 2026-11-08T20:09:22.646-05:00 accepts the
  repaired full Clip 2 for pose, audio and lip sync, and the two-second
  higher-resolution trial for its visual quality. Preserve both exact
  accepted MP4s with hash-bound acceptance records under
  `content/production/accepted-video/`. The full accepted Clip 2 remains
  768x512; the separate approved quality reference is 1152x768 at 25 fps.
  Do not replace either accepted source or imply that a higher-resolution
  full Clip 2 has been rendered. Keep original Clip 1 unchanged. These
  clip/reference acceptances do not authorize further inference, uploads,
  publication or either workshop lifecycle approval.

### Clip 2 full higher-resolution generation - 2026-11-08

- User explicitly requested a higher-resolution full Clip 2 after accepting
  the existing 20-second clip's pose, audio and lip sync and the separate
  1152x768 visual-quality trial. Generate one new 20-second candidate at
  1152x768, 25 fps, using the same installed pinned six-model stack and
  coherent six-step Lightx2v/Euler/CFG 1 preset. No model downloads or TTS.
- Reuse the exact 480,000-sample approved audio, speaker-conditioning WAVs,
  purr exclusion and measured mouth timing. Target the accepted pose plan,
  including Chief Morgan's right-hand greeting; do not silently correct
  the accepted source. Scale only Clip 1's ending still for initial pose
  continuity. Generate subsequent frames natively, not by upscaling the
  completed movie. This lower-resolution starting still is a detail limit
  compared with the original high-resolution neutral trial reference.
- The observed host has 30.3 GiB RAM, with 4.4 GiB free at preflight.
  Avoid a large cumulative in-memory graph. Authorize exactly twelve
  sequential, single-submission 53-frame windows for one candidate,
  preserving nine motion-context frames. Supply lossless disk-backed
  cumulative previous frames so native audio offsets remain global.
  Trim nine overlapping frames from extensions and the final sequence
  to exactly 500 frames. Collect confirmed jobs without resubmitting.
  Stop remaining windows on any provider, transport, safety, memory or
  uncertain-submission failure; no retries or replacement candidates.
- Export native PNG frames for lossless review, not just H.264 intermediates.
  Review every inactive mouth and native anatomy against source-bound frame
  hashes before final export. Riley and Purrmission remain listeners;
  only the current human speaker moves their lips. Preserve native cat
  anatomy; do not reintroduce warped reference-mouth replacements or
  certify copied pixels as anatomical correctness.
- Retain per-window configurations, input/model hashes, prompt IDs/history,
  cumulative continuity files, native frame inventory, all-frame facial
  review, audit and new MP4/PCM MOV candidate. Preserve approved Clip 1,
  Clip 2 and the two-second quality reference byte-for-byte. A fresh full
  render requires review before its own chaining acceptance; this request
  does not grant workshop lifecycle approval, upload or publication.
- Subsequent user decision at 2026-11-09T09:07:59.797-05:00:
  "clip 2 is approved for use". Accept the presented full 1152x768 review
  MP4 as-is, including the disclosed Riley listener mouth motion around
  13.52 seconds. Preserve its exact bytes as
  `content/production/accepted-video/clip-02-highres.mp4` with a hash-bound
  acceptance sidecar. Retain the native review findings as historical
  evidence; do not fabricate a passing resting-mouth audit or repair the
  accepted source. Earlier accepted clips and the quality reference remain
  unchanged. This clip-specific acceptance does not authorize further
  generation, CapCut actions, upload, publication or lifecycle approval.

### Intro video prototypes local review and pull request - 2026-11-09

- At 2026-11-09T09:20:16.743-05:00 the user requested: "commit and create PR,
  push to remote, monitor until ready to merge." This explicitly authorizes
  local approval of the scoped session result, one ready maintenance pull
  request, and subsequent pushes needed to resolve checks and review findings.
- Scope includes the local video prototype runners/configurations and offline
  tests, pinned local model documentation, script/keyframe updates, four
  immutable accepted videos and acceptance records, production evidence, and
  the requested instruction that final clips use 25 FPS while review drafts
  may use a lower FPS without changing duration or audio timing.
- Include tightly coupled review fixes for staged-input hash verification
  before submission and exclusive TTS reservation before preparation side
  effects. These fixes must be verified offline, without new generation,
  synthesis, model downloads, or changes to accepted video bytes.
- Use `maintenance/intro-video-prototypes` for this tooling and production-record
  maintenance scope. Record local approval with the canonical command, run
  applicable validation, address actionable review findings, and monitor the
  required build and review conversations. Do not merge, bypass protections,
  grant test approval, upload to CapCut, or promote production.

## Copilot Fusion and Universe article update

- Reviewed source: [GitHub Universe 2026: Evolving every layer of the stack](https://github.blog/news-insights/company-news/github-universe-2026-evolving-every-layer-of-the-stack/) (2026-10-28).
- Current product name: Copilot Fusion. Replace HydraFusion in participant-facing content; retain historical source titles and URLs as provenance.
- Explain that Fusion evaluates a task and selects an execution pattern and one or more models. Do not promise that Fusion always reduces cost, latency, or improves quality.
- Add the article as a curated external link on the active two-day workshop detail page.
- Keep the slide count and timebox unchanged.
