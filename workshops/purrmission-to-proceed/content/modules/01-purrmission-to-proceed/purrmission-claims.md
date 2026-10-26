# Purrmission to Proceed Claims Register

Self-contained summary of the verified planning, harness, GHAS, and governance claims cited across `slide-manifest.md` and `slides.md`. Underlying sources are `SEC-01` through `SEC-18`, `OPT-01`, and `SRC-02` in `purrmission-source.md`, plus the repository's verified agentic register (`AGT-01`..`AGT-38`). Claims amended for this review were checked on **2026-10-23**.

## Planning evidence claims (`PLAN-*`)

| Id | Claim used in this module |
| --- | --- |
| PLAN-01 | Agent prose, checklists, and self-reported summaries are not execution proof. Scope verification compares the recorded review base with `HEAD`, inspects the committed patch, staged and unstaged diffs, and every untracked path; other claims require their own independent evidence. |
| PLAN-02 | **Scope Proof:** A trustworthy plan names both the files to modify and the explicit no-touch boundary (such as auth middleware, `.github/workflows/`, and lockfiles unless authorized). |
| PLAN-03 | **Instruction Proof ("Saved ≠ Loaded"):** Saving `.github/copilot-instructions.md` or `.instructions.md` on disk does not guarantee those rules entered the current turn; operators must verify loaded references via `/instructions`, `/context`, or the Chat references list. |
| PLAN-04 | **Behavioral & Negative-Test Proof:** Happy-path tests do not prove a security boundary holds; planning evidence requires at least one explicit negative or boundary check (e.g., unauthorized request returns `403`, invalid input is rejected) and unchanged test integrity. |
| PLAN-05 | **Stop Conditions:** An agent plan must state explicit pause triggers—adding dependencies, weakening linter or CodeQL rules, expanding permissions, or failing verification twice—where the agent stops and asks a human. |

## Harness and AI safety claims (`HARN-*`)

| Id | Claim used in this module |
| --- | --- |
| HARN-01 | The workshop's four-ring model describes **Instructions**, **Tools & MCP**, the **execution workspace and any explicitly configured isolation**, and **Guardrails**. A Git worktree separates working copies; it is not a runtime sandbox. Verify actual process, filesystem, credential, and network restrictions in the active environment. |
| HARN-02 | Least privilege means enabling only needed tools and permissions and configuring approval gates for consequential actions. A worktree, content exclusion, or AI-credit session limit does not establish runtime isolation or restrict all host, filesystem, credential, or network access. |
| HARN-03 | Indirect prompt injection occurs when untrusted data (issues, PR comments, external web pages, or dependency docs) enters context and attempts to steer tool use. Tool scoping and configured approval gates can reduce blast radius but do not make every attack impossible. |
| HARN-04 | Long or conflicting history and context compaction can make earlier constraints less available. Prompt-cache invalidation can cause context to be processed again and affect cost; it does not itself erase prior instructions. |

## Vulnerability and security evidence claims (`VULN-*`)

| Id | Claim used in this module |
| --- | --- |
| VULN-01 | Agent-assisted security review, Secret Scanning Push Protection, configured CodeQL and Dependency Review, and Copilot Code Review/Autofix provide complementary evidence. Each has coverage limits; none proves the absence of all vulnerabilities or secrets. |
| VULN-02 | Running `/security-review` before a PR can provide contextual agent feedback on a change. Treat its findings as suggestions to verify; a clean response is not proof that no exploitable path exists. |
| VULN-03 | When enabled, Push Protection can block detected supported secret patterns before repository acceptance. Detection coverage, configuration, and bypass policy matter; a successful push does not prove no secret was exposed. Revoke or rotate any exposed credential. |
| VULN-04 | CodeQL queries a database for supported languages using a selected query suite and the available extraction/framework/data-flow models. Dependency Review evaluates configured dependency changes. Passing results apply only to the checks and scope that actually ran. |
| VULN-05 | Copilot Autofix proposes code remediations for CodeQL alerts, and Copilot Code Review flags logic and security issues on PR diffs, but both remain agent proposals that must pass deterministic CI/CodeQL re-verification and human acceptance. |

## Governance and deployment guardrail claims (`GOV-*`)

| Id | Claim used in this module |
| --- | --- |
| GOV-01 | Rulesets enforce only configured requirements and may allow named bypass actors. `CODEOWNERS` identifies owners for covered paths; to require approval, enable **Require review from Code Owners** in branch protection or a ruleset, then verify path coverage and bypass permissions. |
| GOV-02 | Copilot model/MCP policies and audit logs let leads and administrators govern which models and external tools are permitted across an organization or enterprise. |
| GOV-03 | GitHub AI Credits (model token usage) and GitHub Actions minutes (CI/CodeQL runner compute) are separate meters; security scanning and code review touch both without converting one into the other. |
| GOV-04 | Safe deployment promotion pins the exact test-approved commit SHA in a release manifest, enforces environment protection rules, verifies routes after deploy, and preserves a verified exact-commit rollback target. |
