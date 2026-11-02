---
schemaVersion: 1
id: modernization-with-copilot
title: Modernizing the Unknown with GitHub Copilot
status: draft
kind: workshop
description: >-
  Identify why modernization is being considered, then plan the human work
  required to delegate bounded tasks to agents with verified context, alignment,
  safeguards, and evidence. Follow the service through investment, execution,
  and observed outcomes using a hypothetical legacy application and GitHub
  Copilot as a bounded helper. Capture authorized answers in a separate
  temporary browser brief and print through the customer's approved process.
format: custom
duration: Flexible (180-minute facilitation estimate)
totalMinutes: 180
level: mixed
audience:
  - Software developers who use GitHub Copilot
prerequisites: []
modules:
  - modernization-kickoff
tags:
  - github-copilot
researchSources:
  - type: other
    title: Modernization preparation - Cloud Adoption Framework
    url: >-
      https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/modernize/prepare-organization-cloud-modernization
    reviewedAt: '2026-10-29'
    notes: >-
      Supports value- and constraint-based assessment; the workshop does not
      prescribe Azure.
  - type: other
    title: Asking GitHub Copilot questions in your IDE
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/chat-with-copilot/chat-in-ide
    reviewedAt: '2026-10-29'
    notes: >-
      Supports codebase questions, Ask/Plan/Agent modes, and checking response
      references; client behavior and availability can vary.
  - type: other
    title: Adding repository custom instructions for GitHub Copilot
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
    reviewedAt: '2026-10-29'
    notes: >-
      Supports repository-specific context for understanding and validating
      changes; file presence does not prove instructions were used.
  - type: other
    title: Using agent mode in your IDE
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode
    reviewedAt: '2026-10-29'
    notes: >-
      Supports build and monitor discussion; the user reviews changes and by
      default approves commands. Administrators or settings may auto-run some
      commands.
  - type: other
    title: Managing agent sessions
    url: >-
      https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
    reviewedAt: '2026-10-29'
    notes: >-
      Cloud agent sessions only; progress, session logs, token usage, steering,
      and commit-to-log traceability.
  - type: other
    title: Refactor code
    url: >-
      https://docs.github.com/en/copilot/tutorials/copilot-cookbook/refactor-code
    reviewedAt: '2026-10-29'
    notes: >-
      Refactoring examples do not establish that a change is valuable or
      behavior-preserving for an unknown application.
  - type: other
    title: Responsible use - GitHub Copilot Agents
    url: 'https://docs.github.com/en/copilot/responsible-use/agents'
    reviewedAt: '2026-10-29'
    notes: Agent limitations and supplementary review; agreement is not assurance.
  - type: other
    title: GitHub Spec Kit
    url: 'https://github.com/github/spec-kit'
    reviewedAt: '2026-10-29'
    notes: Optional spec-driven artifacts; capabilities and invocation syntax evolve.
  - type: other
    title: Adopting Spec Kit in an existing project
    url: 'https://github.github.io/spec-kit/guides/existing-projects.html'
    reviewedAt: '2026-10-29'
    notes: >-
      Bounded changes and compatibility, not retroactive specification of all
      code.
  - type: other
    title: Agentic SDD reference
    url: 'https://github.github.io/spec-kit/reference/agentic-sdd.html'
    reviewedAt: '2026-10-29'
    notes: >-
      Conceptual planning sequence; configurable quality checks are not access
      controls.
  - type: other
    title: Strangler Fig pattern
    url: >-
      https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig
    reviewedAt: '2026-10-29'
    notes: 'Incremental replacement with routing, dependency and coexistence costs.'
  - type: other
    title: Branch by Abstraction
    url: 'https://martinfowler.com/bliki/BranchByAbstraction.html'
    reviewedAt: '2026-10-29'
    notes: Gradual implementation replacement behind a tested abstraction.
  - type: other
    title: Parallel Change
    url: 'https://martinfowler.com/bliki/ParallelChange.html'
    reviewedAt: '2026-10-29'
    notes: >-
      Expand-migrate-contract; interface and data compatibility require
      validation.
  - type: other
    title: Safe deployment practices
    url: >-
      https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments
    reviewedAt: '2026-10-29'
    notes: >-
      Layered checks, progressive exposure and stateful recovery; no Azure
      mandate.
  - type: other
    title: What is a container?
    url: >-
      https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/
    reviewedAt: '2026-10-31'
    notes: >-
      Application packaging and process isolation; portability depends on
      compatible platforms and external configuration.
  - type: other
    title: Container images
    url: 'https://kubernetes.io/docs/concepts/containers/images/'
    reviewedAt: '2026-10-31'
    notes: >-
      Image digests identify immutable image content, not external configuration
      or data; Kubernetes is not required by the workshop.
  - type: other
    title: Application Container Security Guide
    url: 'https://csrc.nist.gov/pubs/sp/800/190/final'
    reviewedAt: '2026-10-31'
    notes: >-
      Container-specific security concerns require controls and
      workload-specific review; this guidance was published in 2017.
  - type: other
    title: Docker Engine security
    url: 'https://docs.docker.com/engine/security/'
    reviewedAt: '2026-10-31'
    notes: >-
      Process isolation depends on kernel, runtime, configuration, and
      privileges; Docker-specific details are not universal guarantees.
  - type: other
    title: Secure Software Development Framework
    url: 'https://csrc.nist.gov/projects/ssdf'
    reviewedAt: '2026-10-29'
    notes: >-
      Risk-based secure SDLC and provenance; not a universal compliance
      checklist.
  - type: other
    title: Threat Modeling Cheat Sheet
    url: >-
      https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
    reviewedAt: '2026-10-29'
    notes: >-
      Trust boundaries, threats, mitigations and validation; no security
      guarantee.
  - type: other
    title: WCAG 2 Overview
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/'
    reviewedAt: '2026-10-29'
    notes: >-
      Testable accessibility requirements; qualified owners determine
      applicability.
  - type: other
    title: Key words for use in RFCs to Indicate Requirement Levels (RFC 2119)
    url: 'https://www.rfc-editor.org/rfc/rfc2119'
    reviewedAt: '2026-10-30'
    notes: >-
      Defines MUST/SHALL, SHOULD, and MAY semantics only when a specification
      explicitly adopts them; not legal advice or technical enforcement.
  - type: other
    title: Understand agent harnesses
    url: 'https://code.visualstudio.com/docs/agents/concepts/agent-harnesses'
    reviewedAt: '2026-10-30'
    notes: >-
      Distinguishes harness, model access, model, role, and execution
      environment. Harness features, models, and controls vary.
  - type: other
    title: Use Agent Skills
    url: 'https://code.visualstudio.com/docs/agent-customization/agent-skills'
    reviewedAt: '2026-10-30'
    notes: >-
      Skills bundle reusable task methods, instructions, and resources; support
      and discovery depend on the selected harness.
  - type: other
    title: Custom agents in VS Code
    url: 'https://code.visualstudio.com/docs/agent-customization/custom-agents'
    reviewedAt: '2026-10-30'
    notes: >-
      Custom roles configure instructions, tools, and optional models; behavior
      depends on the selected harness.
  - type: other
    title: Use subagents
    url: 'https://code.visualstudio.com/docs/agents/run/subagents'
    reviewedAt: '2026-10-30'
    notes: >-
      Delegation fits bounded work with clear outputs; coordination adds cost,
      and workers may not share context or independent security boundaries.
  - type: other
    title: Secure AI-assisted development in VS Code
    url: 'https://code.visualstudio.com/docs/agents/run/security'
    reviewedAt: '2026-10-30'
    notes: >-
      Product-specific workspace trust, sandboxing, approvals, and review
      examples; not a replacement for underlying controls.
  - type: other
    title: N-tier Architecture Style
    url: >-
      https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier
    reviewedAt: '2026-10-30'
    notes: >-
      Distinguishes logical layers and physical tiers; does not prescribe Azure
      or one agent per tier.
  - type: other
    title: Evaluation in Microsoft Foundry
    url: >-
      https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-overview
    reviewedAt: '2026-10-30'
    notes: >-
      Dataset and response comparison, fixed evaluation criteria, and continuous
      evaluation as examples; no platform mandate or quality guarantee.
  - type: other
    title: Observability in Generative AI
    url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/observability'
    reviewedAt: '2026-10-30'
    notes: >-
      Separates evaluation, monitoring, and tracing. Product availability
      changes; traces and model-judge scores are not proof of correctness.
briefEditor:
  title: Modernization Starting Brief
  description: >-
    Select the reasons modernization is being considered, prioritize the top
    three, and plan bounded work for agents with context, guardrails, and
    evidence alongside the six decision-loop statements. Answers stay in this
    open page; the editor does not send or save them. Print through the browser
    using the customer's approved process.
lastReviewed: '2026-10-31'
---
# Modernizing the Unknown with GitHub Copilot

A customer asks, "Should we modernize this service, and how will we know what
to do next?" Understand the people, outcome, dependencies, and evidence first.
Compare benefits, whole-life costs, consequences, alternatives, and the risks
of changing or doing nothing. Then plan the human work required to delegate
bounded modernization tasks to agents: choose a harness and appropriate
agent/skill composition, provide trusted context, write explicit requirements,
respect application contracts, set actual permissions and guardrails, qualify
model changes against repeatable evidence, and retain human decisions. Use
Build, Evaluate, Deploy, and Monitor results to revisit the next investment
decision.

This is a flexible, content-first discussion, not a one-hour session. The
180-minute catalog estimate is provisional; extend or split delivery rather
than rush necessary decisions. No live repository or coding exercise is required.

Copilot can help with bounded repository questions when policy and actual
controls permit. People verify consequential claims and make every decision.

The catalog workshop and the browser editor are separate artifacts. Shared
materials contain only blank fields and synthetic context. In a customer
session, responses stay in the open browser page; the editor does not send or
save them. Print through the browser and deliver the PDF only through the
customer's approved channel.

## Outcomes

- Describe the service and evidence needed before choosing a modernization solution.
- Decide whether to invest by comparing outcomes, costs, consequences, risks, and alternatives.
- Plan human-owned work for agents: choose a harness and agent/skill composition, make requirements explicit, map work to application contracts, qualify model changes with task-specific evidence, and retain human decisions across integration, recovery, and operations.
- Use optional planning tools and agent roles without delegating proof or authority.
- Build and evaluate against agreed evidence, deploy the evaluated artifact, and monitor service and business outcomes.
- Use observed results to continue, change course, defer, or stop the next investment.
- Record six lifecycle statements and focused evidence in the separate temporary brief, without customer or application identity fields.
