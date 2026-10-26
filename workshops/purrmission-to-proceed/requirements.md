---
schemaVersion: 1
kind: workshop-requirements
id: purrmission-to-proceed
title: "Purrmission to Proceed: Security, Evidence, and Guardrails from Planning to Deployment"
description: >-
  A 45-minute narrative-driven session starring Purrmission, Agent Mergewell,
  and Riley Relay on what planning evidence must be true before you trust agent
  work, how the Copilot harness enforces AI safety, and how /security-review,
  GitHub Advanced Security, Copilot Code Review, and deployment guardrails
  protect production.
audience:
  - Software developers and technical leads
  - Security-minded reviewers, engineering managers, and Copilot administrators
level: mixed
format: custom
durationMinutes: 45
outcomes:
  - Demand four concrete planning proofs—scope boundaries, verified loaded instructions, negative behavioral checks, and hard stop conditions—before trusting agent output.
  - Configure the four rings of the GitHub Copilot harness (instructions, least-privilege tools and MCP, runtime sandbox, and confirmation guardrails) to resist prompt injection and context drift.
  - Combine four complementary security evidence lenses (/security-review, Secret Scanning Push Protection, CodeQL + Dependency Review, and Copilot Code Review + Autofix) without letting an agent self-certify.
  - Enforce repository rulesets, CODEOWNERS human approval, exact-commit release promotion, and verified rollback from pull request to production deployment.
modules:
  - id: purrmission-to-proceed
    title: "Purrmission to Proceed: Security, Evidence, and Guardrails from Planning to Deployment"
    minutes: 45
    outcomes:
      - Audit an agent plan and execution trace using the Four Planning Proofs so polite agent prose never substitutes for verifiable evidence.
      - Pair least-privilege harness boundaries with layered vulnerability scanning (/security-review, Push Protection, CodeQL, Dependency Review, and Copilot Code Review).
      - Apply the 5-Point Purrmission Slip across local planning, pull request review, and commit-pinned production deployment.
sources: []
visualStyle: >-
  Native Warm Editorial 2D character-world accents on a soft off-white stage,
  starring Purrmission the sleek black cat safety guardian alongside Agent
  Mergewell and Riley Relay, with all instructional text, tables, and diagrams
  rendered as native Slidev HTML or SVG.
imageRoles: []
exclusions:
  - Missions, labs, live customer repository access, or required external network credentials during the lecture
  - Video generation or any unapproved mascot/logo pixels
  - Claims that an LLM review or agent summary replaces deterministic static analysis, secret scanning, or human approval
  - Generated typography, fake product interfaces, logos, official marks, GitHub mascots, or protected character likenesses
acceptanceCriteria:
  - "The route totals exactly 45 minutes of instruction across 17 visible slides with no mission time."
  - Every visible slide in slides.md matches the exact title and timebox in slide-manifest.md and carries an ordered seven-section speaker-notes comment.
  - Planning evidence is explicitly framed around four verifiable proofs (Scope, Instructions Loaded, Behavioral/Negative Tests, and Stop Conditions) before trusting agent work.
  - Vulnerability detection pairs /security-review, Secret Scanning Push Protection, GHAS CodeQL + Dependency Review, and Copilot Code Review + Autofix without allowing agent self-certification.
  - Purrmission, Agent Mergewell, Chief Morgan Charter, and Riley Relay maintain their canonical safety and accountability boundaries throughout text and artwork.
---

# Purrmission to Proceed: Workshop Requirements

## Governing aim

Polite words from an agent are not evidence. This 45-minute narrative session teaches developers, reviewers, and engineering leads what evidence must be true at **planning**, inside the **agent harness**, across **four vulnerability-hunting lenses**, and at **deployment governance gates** before any human grants *Purrmission to Proceed*.

## Required 45-minute route (17 slides)

1. **Purrmission to Proceed** (1 min) — Full-stage intro cover featuring Purrmission in front and Mergewell, Chief Charter, and Riley Relay standing in a line behind him.
2. **Meet Purrmission: Polite Words Are Not Evidence** (2 min) — Meet Purrmission's two poses (asleep on warm cushions vs. wide awake at an unverified boundary) and the 4-stage route.
3. **The 4:15 PM Green-Checkmark Trap** (2 min) — Why confident agent summaries fool tired humans.
4. **The Accountable Trio: Who Plans, Who Runs, Who Decides** (3 min) — Mergewell, Riley Relay, and Purrmission role boundaries.
5. **Planning Evidence: Why "Looks Good" Is Not a Plan** (3 min) — Plausibility vs. verifiable planning proof.
6. **Planning Proof 1 & 2: Scope Boundaries and "Saved ≠ Loaded"** (3 min) — Blast-radius no-touch lists and verifying `/instructions` and `/context`.
7. **Planning Proof 3 & 4: Negative Tests and Hard Stop Conditions** (3 min) — Boundary assertions and mandatory pause triggers.
8. **The Pre-Flight Planning Audit: Trust, Verify, Then Execute** (2 min) — Transforming a vague prompt into an evidence-backed plan contract.
9. **Inside the Copilot Harness: Four Rings Around the Model** (3 min) — Instructions, Tools/MCP, Runtime Sandbox, and Guardrails.
10. **Least-Privilege Keys: Scoping Tools, MCP, and Runtime Access** (3 min) — Keeping Purrmission's paw on the master key ring.
11. **AI Safety in the Wild: Prompt Injection and Context Drift** (2 min) — Defending against untrusted issue/PR/doc payloads and cache invalidation.
12. **Four Security Evidence Lenses: Why One Scan Never Suffices** (3 min) — Probabilistic LLM review vs. deterministic GHAS enforcement.
13. **Shift-Left Vulnerability Hunting: `/security-review` and Push Protection** (3 min) — Catching exploitable paths and leaked secrets before PR creation.
14. **Deterministic GHAS + Copilot Code Review and Autofix** (4 min) — CodeQL source-to-sink analysis, Dependency Review, Copilot Code Review, and Autofix verification.
15. **Enterprise Governance: Rulesets, Policy, and Auditability** (3 min) — Branch rulesets, `CODEOWNERS`, model/MCP policy, and separate billing meters.
16. **Guardrails to Production: Exact-Commit Promotion and Rollback** (3 min) — Pinning the exact reviewed commit SHA and verifying rollback readiness.
17. **Your Purrmission Slip: The 5-Point Evidence Checklist** (2 min) — Monday-morning operating checklist for every developer and lead.
