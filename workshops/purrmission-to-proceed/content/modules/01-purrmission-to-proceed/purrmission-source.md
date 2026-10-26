# Purrmission to Proceed Source Register

Text-only source contract for the 45-minute security narrative lecture. Research is reviewed authoring input, not a live build dependency. Review dates are recorded per source; the sources added or rechecked for this correction pass were reviewed **2026-10-23**. Re-verify immediately before delivery.

## First-party sources

| Id | Source | URL | Reviewed | Use |
| --- | --- | --- | --- | --- |
| SEC-01 | Adding repository custom instructions for GitHub Copilot | https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot | 2026-10-19 | Repository instructions (`copilot-instructions.md`, `.instructions.md` with `applyTo`), verifying active references rather than assuming saved files loaded |
| SEC-02 | Extending GitHub Copilot Chat with Model Context Protocol (MCP) | https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp | 2026-10-19 | Scoping MCP servers, tool confirmation boundaries, and least-privilege tool selection |
| SEC-03 | Using GitHub Copilot in the command line (CLI) | https://docs.github.com/en/copilot/how-tos/copilot-cli | 2026-10-19 | `/context`, `/compact`, `/instructions`, `/limits set`, and human confirmation before shell execution |
| SEC-04 | Code scanning with CodeQL | https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning | 2026-10-23 | CodeQL database/query overview; see SEC-14 for the supported-language, configured-query, extraction, and framework-model limits |
| SEC-05 | Responsible use of Copilot Autofix for code scanning | https://docs.github.com/en/code-security/code-scanning/managing-code-scanning-alerts/responsible-use-autofix-code-scanning | 2026-10-19 | Autofix proposes code changes for alerts, requires CI/CodeQL re-verification and human review, and does not guarantee every downstream dependency impact |
| SEC-06 | Push protection | https://docs.github.com/en/code-security/concepts/secret-security/push-protection | 2026-10-23 | Overview of configured push blocking; see SEC-15 and SEC-16 for bypass and pattern-coverage caveats |
| SEC-07 | About dependency review | https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review | 2026-10-19 | Inspecting manifest and lockfile diffs on pull requests for vulnerable or disallowed packages before merge |
| SEC-08 | About GitHub Copilot code review | https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review | 2026-10-19 | Automated review comments and `/security-review` workflows complement but never replace required human `CODEOWNERS` approval |
| SEC-09 | About rulesets for repositories and organizations | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets | 2026-10-19 | Branch protection, required status checks, required reviews, and bypass auditability |
| SEC-10 | Deployment protection rules and environments | https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/configuring-environments-for-deployment | 2026-10-19 | Environment approval gates, commit-pinned promotion, and verified rollback |
| OPT-01 | Optimizing your AI usage to maximize efficiency and reduce cost | https://docs.github.com/en/copilot/tutorials/optimize-ai-usage | 2026-10-19 | Prompt cache invalidators, research-plan-implement phasing, and deterministic guardrails |
| SRC-02 | Models and pricing for GitHub Copilot | https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing | 2026-10-19 | Separate meters: GitHub AI Credits for model tokens vs. GitHub Actions minutes for runner compute |
| SEC-11 | Content exclusion for GitHub Copilot | https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion | 2026-10-23 | Surface-specific exclusions; explicitly unsupported in VS Code Agent and Edit modes, so not a filesystem or runtime security boundary |
| SEC-12 | Managing context for GitHub Copilot | https://docs.github.com/en/copilot/concepts/prompting-and-context/context-management | 2026-10-23 | Context-window accumulation and compaction; distinguish context availability from prompt-cache cost |
| SEC-13 | Setting an AI credit session limit in GitHub Copilot CLI | https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit | 2026-10-23 | CLI session limits are soft cost controls; an in-progress response can finish and exceed the configured limit |
| SEC-14 | Code scanning with CodeQL | https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning | 2026-10-23 | Scope depends on analyzed supported languages, configured query suites, database extraction, and available framework/data-flow models |
| SEC-15 | Push protection | https://docs.github.com/en/code-security/concepts/secret-security/push-protection | 2026-10-23 | Configured push blocking for detected secrets; bypasses may be allowed and audited |
| SEC-16 | Supported secret scanning patterns | https://docs.github.com/en/code-security/reference/secret-security/supported-secret-scanning-patterns | 2026-10-23 | Pattern coverage varies; successful push is not proof that no secret was exposed |
| SEC-17 | Available rules for rulesets | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets | 2026-10-23 | Configure required Code Owner reviews and understand ruleset bypass actors |
| SEC-18 | Git worktree | https://git-scm.com/docs/git-worktree | 2026-10-23 | A worktree provides another working directory associated with a repository; it does not itself restrict runtime permissions or access |

## Canonical character and claim boundaries

- **Purrmission** is the sleek black cat safety guardian who signals consequential boundaries; she never clicks buttons, approves PRs, or replaces human judgment.
- **Agent Mergewell** is the accountable adult human engineer who owns the plan, verifies evidence, and alone approves, merges, or deploys.
- **Riley Relay** is the bounded nonhuman software collaborator who plans, executes inside the harness, and returns evidence; she never self-certifies, approves, or merges.
- **Chief Morgan Charter** represents organizational and enterprise governance policy.
- No LLM pass (`/security-review`, Copilot Code Review, or Copilot Autofix) is ever presented as a substitute for configured GHAS checks (CodeQL, Secret Scanning Push Protection, Dependency Review) or human approval. Passing checks are evidence only within their actual configuration and coverage.
