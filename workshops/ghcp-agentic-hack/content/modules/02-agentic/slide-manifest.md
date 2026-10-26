# Agentic Development 29-Slide Generation Manifest

Authority: `requirements.md` and `module.md`. Expected slide count: **29**.
Total module timing: **77 instruction minutes + 45 mission minutes = 122 minutes**.

| # | Exact source title | Source markers | Communication job and native treatment | Minutes |
| ---: | --- | --- | --- | ---: |
| 1 | Module 2: Agentic Development Across the SDLC | `module.md` | Establish the end-to-end SDLC route with Mergewell, Riley, and Purrmission (he/him) | 1 |
| 2 | Session Agenda | `module.md` | Present the `28m` pre-lunch + `49m` post-lunch = `77m` instruction route + `45m` mission | 1 |
| 3 | The 4:15 PM Green-Checkmark Trap | `Purrmission to Proceed` | Show why Riley's polite Friday summary fails without SDLC planning and verification | 2 |
| 4 | Holistic SDLC Planning: Workflow First, Not Tool First | `Workflow First` | Plan the entire workflow (Goal -> Constraints -> Deterministic vs AI vs Human -> Completion Boundary) | 3 |
| 5 | Requirements to Spec & ADR: Grounding the Architecture | SDLC Phase 1-2 | Turn a vague feature ticket into a written Spec and Architecture Decision Record (ADR) | 3 |
| 6 | What Must Be True Before You Trust Agent Work: The 4 Planning Proofs | `Purrmission to Proceed` | `FourPlanningProofsGate.vue` mechanical drawbridge across Scope, Loaded Rules, Negative Tests, and Stops | 3 |
| 7 | Planning Proof 1 & 2: Scope Boundaries and "Saved != Loaded" | `Purrmission to Proceed` | Define strict no-touch file lists and verify loaded rules via `/instructions`, `/context`, and References | 3 |
| 8 | Planning Proof 3 & 4: Negative Tests and Hard Stop Conditions | `Purrmission to Proceed` | Write failing negative/boundary tests first (preventing self-confirming tests) and arm hard stops | 2 |
| 9 | A Map, Not a Manual: Scoping Repository and Path Instructions | `Token Optimization` | Structure `.github/copilot-instructions.md`, `applyTo` rules, `AGENTS.md`, and `/init` concisely | 3 |
| 10 | Copilot Memory vs. Durable SDLC Artifacts | SDLC Phase 2 | Separate `/memory` controls (on, off, show) from versioned Git specs, ADRs, and instruction files | 2 |
| 11 | Packaging SDLC Procedures as Reusable Skills (SKILL.md) | SDLC Phase 2 | Deploy Mergewell's wrist gadgets: on-demand `SKILL.md` workflows for API checks and release notes | 3 |
| 12 | Role Separation with Custom Agents (.agent.md) | SDLC Phase 2 | Define *Spec Architect*, *Implementer*, *QA Test Writer*, and *Read-Only Reviewer* with minimal `tools:` | 3 |
| 13 | Connecting the SDLC Workbench: MCP Servers and Agent Plugins 1.0 | Changelog Aug 2026 | Wire governed MCP servers (Tools, Resources, Prompts) and portable Agent Plugins 1.0 (GA) | 3 |
| 14 | The Pre-Flight Planning Audit: From Vague Ticket to Signed Brief | `Purrmission to Proceed` | Side-by-side transformation of a raw feature ticket into a signed pre-flight contract | 3 |
| 15 | Operating the Agentic Development Loop | SDLC Phase 3 | `AgenticLoopNativeAnimation.vue` (`Understand -> Plan -> Act -> Observe -> Adjust -> Verify`) | 3 |
| 16 | Test-Driven Agentic Development and Deterministic Guardrails | SDLC Phase 3-4 | Feed fast compiler, linter, typecheck, and negative unit/integration test output into the loop | 3 |
| 17 | Enforcing Loop Rules with Repository Hooks (.github/hooks) | SDLC Phase 3-4 | Run deterministic pre/post checks automatically with `.github/hooks/*.json` in CLI & Cloud Agent | 3 |
| 18 | Git Save Points and Safe Rollback During Development | SDLC Phase 3 | Use branches, staged diffs, commits, and CLI `/rewind` (`/undo`) within tracked-file limits | 3 |
| 19 | Delegating Backlog & Async Development to Copilot Cloud Agent | SDLC Backlog | Assign bounded backlog issues to Copilot Cloud Agent, track on Mobile/App, and continue locally | 3 |
| 20 | Four Security Evidence Lenses: Why One Scan Never Suffices | `Purrmission to Proceed` | `FourSecurityLensesPipeline.vue` combining probabilistic AI review with deterministic scanners | 3 |
| 21 | Lens 1 & 2: Shift-Left /security-review and Secret Scanning Push Protection | SDLC Phase 5 | Run `/security-review` before PR creation + Secret Scanning Push Protection at `git push` | 3 |
| 22 | Pull Requests as SDLC Evidence Packages and Documentation | SDLC Phase 6 | Package spec links, ADR summary, test proof, updated README/API docs, and release notes | 3 |
| 23 | GitHub Actions as CI/CD Pipeline Evidence | SDLC Phase 6 | Verify build, test, and integration workflows in GitHub Actions (90-day check retention boundary) | 3 |
| 24 | Lens 3 & 4: Deterministic GHAS, Copilot Code Review, and Autofix | Changelog Oct 2026 | CodeQL + Dependency Review + Autofix alongside Copilot Code Review (Balanced vs Lite effort) | 4 |
| 25 | Deployment Governance: Branch Rulesets, CODEOWNERS, and Environments | SDLC Release | Enforce branch rulesets, required status checks, `CODEOWNERS` human approval, and `test -> prod` gates | 4 |
| 26 | Release Management: Exact-Commit Promotion and Verified Rollback | `Purrmission to Proceed` | `ExactCommitReleaseConveyor.vue` pinning exact reviewed SHA (`a7f3c91`), route verification, and rollback | 4 |
| 27 | Your Purrmission Slip: The End-to-End SDLC Release Checklist | `Purrmission to Proceed` | The 5-point SDLC checklist signed by developers and leads before production release | 3 |
| 28 | Demo! | `module.md` | Live walkthrough of the 4 Planning Proofs, custom skill/agent invocation, and release checklist | 0 |
| 29 | Your Mission: Hand Off Work with Confidence | `agent-task.md` | Launch the 45-minute scored Agentic SDLC mission (`Case File Ω-2`) | 45 |

## Timing arithmetic

- Pre-lunch block (Slides 1–10): `1 + 1 + 2 + 3 + 3 + 3 + 3 + 2 + 3 + 2 = 23` + Slide 11 (`3`) + Slide 12 (`2` or `28m` agenda split): total instruction across slides 1–27 = `1 + 1 + 2 + 3 + 3 + 3 + 3 + 2 + 3 + 2 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 4 + 4 + 4 + 3 = 77` instruction minutes.
- Slide 28 (`Demo!`): `0` minutes.
- Slide 29 (`Mission`): `45` minutes.
- Total: `77 + 45 = 122` minutes.
