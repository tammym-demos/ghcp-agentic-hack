# Purrmission to Proceed Slide Manifest

Authority: `requirements.md` (Required 45-minute route). Expected slide count: **17**.
Format: narrative-driven security lecture, 45 instruction minutes, no mission, no separate setup or transition bucket, sixteen approved character artworks starring **Purrmission** alongside Agent Mergewell, Riley Relay, and Chief Morgan Charter, plus native Slidev HTML/CSS/SVG diagrams and `v-click` motion.
Teaching meaning is carried by native Slidev HTML/CSS/SVG (tables, cards, threat chains, and checklists); the character art supplies narrative continuity and visual boundary cues only. Source ids resolve to `purrmission-source.md` (`SEC-*`, `OPT-01`, `SRC-02`) and `purrmission-claims.md` (`PLAN-*`, `HARN-*`, `VULN-*`, `GOV-*`).

| # | Exact source title | Minutes | Source ids | Reuse / new | Native teaching surface |
| ---: | --- | ---: | --- | --- | --- |
| 1 | Purrmission to Proceed | 1 | PLAN-01; SEC-01 | Reuses purrmission-team-cover.png | Full-stage intro cover with title, subtitle, and 4-character team portrait led by Purrmission |
| 2 | Meet Purrmission: Polite Words Are Not Evidence | 2 | PLAN-01; SEC-01 | Reuses purrmission-star-alert.png | Hero opening contrasting Purrmission asleep on warm cushions vs. alert at an unverified boundary |
| 3 | The 4:15 PM Green-Checkmark Trap | 2 | PLAN-01; SEC-08 | Reuses accountable-trio-cover.png | Story hook contrasting Riley's polite summary with unverified reality |
| 4 | The Accountable Trio: Who Plans, Who Runs, Who Decides | 3 | PLAN-01, GOV-01 | Reuses foundation-welcome-trio.png | Three-role contract for Mergewell, Riley Relay, and Purrmission alongside the camera-facing trio |
| 5 | Planning Evidence: Why "Looks Good" Is Not a Plan | 3 | PLAN-01..05; OPT-01 | Reuses mergewell-riley-verification.png | Four Planning Proofs overview paired with Mergewell and Riley inspecting incomplete evidence |
| 6 | Planning Proof 1 & 2: Scope Boundaries and "Saved ≠ Loaded" | 3 | PLAN-02, PLAN-03; SEC-01, SEC-03, SEC-12 | Reuses purrmission-task-boundary.png | Compare review base and inspect committed, staged, unstaged, and untracked changes; verify `/instructions` and `/context` beside Purrmission's task frame |
| 7 | Planning Proof 3 & 4: Negative Tests and Hard Stop Conditions | 3 | PLAN-04, PLAN-05; SEC-03 | Reuses approval-boundary-gate.png | Negative boundary assertions + mandatory stop-and-ask escalation triggers |
| 8 | The Pre-Flight Planning Audit: Trust, Verify, Then Execute | 2 | PLAN-01..05; OPT-01 | Reuses plan-before-action-route.png | Side-by-side transformation of a vague prompt into an evidence-backed plan contract |
| 9 | Inside the Copilot Harness: Four Rings Around the Model | 3 | HARN-01; SEC-01..03, SEC-11, SEC-18 | Reuses copilot-harness-guard.png | Four-part harness: Instructions, Tools/MCP, execution workspace and configured isolation, Guardrails |
| 10 | Least-Privilege Keys: Scoping Tools, MCP, and Runtime Access | 3 | HARN-02; SEC-02, SEC-03, SEC-13 | Reuses least-privilege-paw.png | Do / Watch / Avoid table for terminal commands, MCP servers, and AI credit soft limits |
| 11 | AI Safety in the Wild: Prompt Injection and Context Drift | 2 | HARN-03, HARN-04; SEC-02, SEC-12, OPT-01 | Reuses context-drift.png | Treat untrusted inputs as data; distinguish context compaction from prompt-cache cost |
| 12 | Four Security Evidence Lenses: Why One Scan Never Suffices | 3 | VULN-01; SEC-04..08, SEC-14..16 | Reuses evidence-streams-desk.png | Complementary review and configured scan evidence, each with explicit coverage limits |
| 13 | Shift-Left Vulnerability Hunting: `/security-review` and Push Protection | 3 | VULN-02, VULN-03; SEC-08, SEC-15, SEC-16 | Reuses cli-controlled-action.png | Pre-PR agent review plus Push Protection supported-pattern and bypass limits |
| 14 | Deterministic GHAS + Copilot Code Review and Autofix | 4 | VULN-04, VULN-05; SEC-05, SEC-07, SEC-08, SEC-14 | Reuses pull-request-evidence-handoff.png | Scoped CodeQL and Dependency Review evidence, Copilot Code Review, and Autofix verification |
| 15 | Enterprise Governance: Rulesets, Policy, and Auditability | 3 | GOV-01..03; SEC-09, SEC-11, SEC-17, SRC-02 | Reuses enterprise-archways.png | Configured ruleset and Code Owner requirements, bypass coverage, and policy limits |
| 16 | Guardrails to Production: Exact-Commit Promotion and Rollback | 3 | GOV-04; SEC-10 | Reuses human-release-key.png | Commit-pinned release manifest flow, environment gates, route verification, and rollback |
| 17 | Your Purrmission Slip: The 5-Point Evidence Checklist | 2 | PLAN-01..05, HARN-01..04, VULN-01..05, GOV-01..04 | Reuses purrmission-star-alert.png | 5-question Monday-morning Purrmission Slip for developers, reviewers, and leads |

## Route arithmetic

Slide minutes by slide:
`1 + 2 + 2 + 3 + 3 + 3 + 3 + 2 + 3 + 3 + 2 + 3 + 3 + 4 + 3 + 3 + 2 = 45` slide minutes exact, with no separate setup or transition time.
