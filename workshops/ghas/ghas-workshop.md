# GitHub Advanced Security Workshop

**Duration**: ~2 hours (with break)  
**Format**: Presentation + Live Demos  
**Audience**: Enterprise Admins, Security Teams, AppSec Engineers, Engineering Managers  
**Focus**: GitHub Advanced Security (GHAS) — Secret Scanning, Code Scanning, Dependabot, Copilot Autofix

---

## Workshop Overview

This comprehensive workshop covers the full GitHub Advanced Security (GHAS) platform — from secret scanning and push protection through CodeQL-powered code scanning, supply chain security with Dependabot, AI-powered remediation with Copilot Autofix, and security campaigns for managing alert remediation at scale. Attendees will leave with a clear understanding of how to enable, configure, and operationalize GHAS across their enterprise.

### Learning Objectives

- Understand the GHAS feature set and how each capability fits into a layered security strategy
- Configure secret scanning with push protection, custom patterns, and validity checks
- Enable and tune code scanning with CodeQL — default setup, advanced workflows, and custom queries
- Implement Dependabot for vulnerability alerts, automated security updates, and version management
- Leverage Copilot Autofix for AI-powered security remediation
- Use security campaigns to drive alert remediation across teams at scale
- Navigate the Security Overview dashboard for enterprise-wide visibility and compliance reporting
- Design a phased GHAS rollout strategy with measurable success criteria

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | Enterprise Cloud with GHAS license |
| **Enterprise Access** | Enterprise owner or organization owner role |
| **Test Repository** | Repository with code in a CodeQL-supported language |
| **Browser** | Modern browser with access to github.com |
| **GHAS License** | GitHub Advanced Security enabled on at least one organization |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | [Opening & GHAS Architecture Overview](#1-opening--ghas-architecture-overview-10-min) | 10 min |
| 2 | [Secret Scanning & Push Protection](#2-secret-scanning--push-protection-20-min) | 20 min |
| 3 | [Code Scanning with CodeQL](#3-code-scanning-with-codeql-25-min) | 25 min |
| ☕ | **Break** | 10 min |
| 4 | [Dependabot & Supply Chain Security](#4-dependabot--supply-chain-security-20-min) | 20 min |
| 5 | [Copilot Autofix & Security Campaigns](#5-copilot-autofix--security-campaigns-15-min) | 15 min |
| 6 | [Security Overview & Reporting](#6-security-overview--reporting-15-min) | 15 min |
| 7 | [GHAS Rollout Strategy & Wrap-Up](#7-ghas-rollout-strategy--wrap-up-10-min) | 10 min |

**Total**: ~2 hours 5 minutes including break

---

## 1. Opening & GHAS Architecture Overview (10 min)

### Key Points

- Application security is shifting left — vulnerabilities caught in development are 100× cheaper to fix than in production
- GHAS integrates security directly into the developer workflow (PRs, pushes, dependency updates)
- Unlike bolt-on security tools, GHAS is native to the platform — no context switching, no separate dashboards
- Three pillars: prevent secret leaks, find code vulnerabilities, secure the supply chain

### GHAS Feature Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  GitHub Advanced Security                       │
├───────────────────┬───────────────────┬─────────────────────────┤
│  SECRET SCANNING  │  CODE SCANNING    │  SUPPLY CHAIN SECURITY  │
│                   │                   │                         │
│  200+ patterns    │  CodeQL engine    │  Dependabot alerts      │
│  Custom regex     │  Default setup    │  Security updates       │
│  Push protection  │  Advanced setup   │  Version updates        │
│  Validity checks  │  Custom queries   │  Dependency review      │
│  Non-provider     │  Copilot Autofix  │  License compliance     │
│  patterns         │  Merge blocking   │  Dependency graph       │
├───────────────────┴───────────────────┴─────────────────────────┤
│                   SECURITY OVERVIEW                             │
│        Enterprise-wide visibility, reporting, campaigns         │
└─────────────────────────────────────────────────────────────────┘
```

### GHAS Licensing Model

| Feature | GHEC (Free) | GHAS License Required |
|---------|-------------|-----------------------|
| Dependency graph | ✓ | |
| Dependabot alerts | ✓ | |
| Dependabot security updates | ✓ | |
| Dependabot version updates | ✓ | |
| Secret scanning (public repos) | ✓ | |
| Secret scanning (private/internal repos) | | ✓ |
| Push protection | | ✓ |
| Custom secret patterns | | ✓ |
| Code scanning (CodeQL) | | ✓ |
| Copilot Autofix | | ✓ |
| Security campaigns | | ✓ |
| Security Overview (enterprise) | | ✓ |

> **Note**: Dependabot features are free for all GitHub plans. Secret scanning for public repos is also free. The GHAS license is required for private/internal repo scanning, push protection, code scanning, and enterprise security features.

### Where Security Lives in the GitHub UI

```
Enterprise Level
  ├── Settings tab → Code security and analysis (enterprise defaults)
  ├── Policies tab → Code security (enforcement)
  └── Code Security tab → Security Overview (enterprise-wide)

Organization Level
  ├── Settings → Security configurations (recommended)
  ├── Settings → Code security and analysis (legacy)
  └── Security tab → Overview, Alerts, Coverage

Repository Level
  ├── Settings → Code security and analysis
  ├── Security tab → Alerts (secret, code, Dependabot)
  └── Pull Requests → Inline security checks
```

### Discussion Points

- What security tools are you currently using and how do they integrate with your CI/CD pipeline?
- Are there compliance requirements (SOC 2, ISO 27001, PCI-DSS) driving your security scanning needs?
- How do your developers currently respond to security findings today?

---

## 2. Secret Scanning & Push Protection (20 min)

### Key Points

- Secrets in source code are the #1 cause of security breaches that originate from repositories
- GitHub scans for 200+ secret patterns from partners (AWS, Azure, GCP, Slack, Stripe, etc.)
- Push protection stops secrets **before** they enter the repository — the most effective control
- Custom patterns let you detect organization-specific secrets (internal API keys, connection strings)

### How Secret Scanning Works

```
┌─────────────────────────────────────────────────┐
│               Secret Scanning Flow              │
├─────────────────────────────────────────────────┤
│                                                 │
│   Repository Code                               │
│        │                                        │
│        ▼                                        │
│   ┌─────────────┐                               │
│   │ Pattern     │  200+ partner patterns        │
│   │ Matching    │  Custom regex patterns         │
│   │ Engine      │  Non-provider patterns         │
│   └──────┬──────┘                               │
│          │                                      │
│          ▼                                      │
│   Secret Detected                               │
│     ┌────┴────┐                                 │
│     ▼         ▼                                 │
│   Partner   Non-Partner                         │
│   notified  alert only                          │
│     │         │                                 │
│     ▼         ▼                                 │
│   Token     Admin/User                          │
│   revoked   notification                        │
│   (auto)                                        │
└─────────────────────────────────────────────────┘
```

### Secret Scanning Alert Types

| Alert Type | Description | Action Taken |
|------------|-------------|--------------|
| **Partner patterns** | Secrets from 200+ providers (AWS, Azure, etc.) | Provider notified → token auto-revoked |
| **Non-provider patterns** | Generic high-entropy strings (private keys, passwords) | Alert created → manual review required |
| **Custom patterns** | Organization-defined regex patterns | Alert created → manual review required |

### Push Protection

Push protection is the single most impactful GHAS feature — it prevents secrets from ever entering the repository.

```
Developer pushes code
       │
       ▼
GitHub scans commit diff
       │
       ▼
Secret detected? ──No──→ Push accepted ✓
       │
      Yes
       │
       ▼
Push BLOCKED
       │
       ├── Remove the secret and re-push
       ├── Mark as false positive (audit-logged)
       └── Request bypass (admin-approved, audit-logged)
```

**Bypass controls**:

- Admins can enforce "no bypass" at org/enterprise level
- All bypasses are audit-logged with reason
- Delegated bypass allows routing bypass requests to a designated security team
- Bypass request review is available for organization owners

### Push Protection Delegated Bypass

| Setting | Description |
|---------|-------------|
| **No bypass** | Push protection cannot be bypassed — secrets must be removed |
| **Self-bypass with reason** | Developer provides a reason (test data, false positive, will fix later) |
| **Delegated bypass** | Bypass request routed to a designated reviewer team for approval |

### Custom Secret Patterns

Define organization-specific patterns to detect internal secrets:

```
Pattern Name:    Internal API Key
Regex:           internal_api_[a-zA-Z0-9]{32}
Test String:     internal_api_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456
Before Secret:   (optional prefix match)
After Secret:    (optional suffix match)
```

**Best practices for custom patterns**:

- Start with the most common internal secret formats
- Test patterns against known samples before enabling
- Enable push protection for custom patterns to maximize value
- Use "dry run" mode first to assess false positive rates
- Document patterns in your internal security runbook

### Validity Checks

- GitHub checks if detected secrets are still **active** with the partner
- Alerts show validity status: `Active`, `Inactive`, or `Unknown`
- Prioritize remediation for **active** secrets
- Available for partner patterns where the provider supports validation

### 🖥️ Demo: Secret Scanning Configuration

**Location**: Organization → Settings → **Security configurations**

1. Navigate to Organization → Settings → **Security configurations**
2. Show the "GitHub recommended" security configuration and how it enables secret scanning + push protection
3. Navigate to Organization → Settings → Code security and analysis → **Secret scanning** for custom pattern creation
4. Create a custom secret pattern with a test string to show pattern matching
5. Navigate to Organization → **Security** tab → Secret scanning alerts
6. Walk through an alert: show severity, token type, location, validity status, and remediation options
7. Demonstrate a push protection block using a test repository (push a test AWS key)
8. Show the bypass workflow — reason selection and audit log entry

### Discussion Points

- Do you have internal secret formats (API keys, connection strings) that need custom patterns?
- What is your current process for rotating credentials when a secret is exposed?
- Would delegated bypass or strict "no bypass" be more appropriate for your teams?

---

## 3. Code Scanning with CodeQL (25 min)

### Key Points

- CodeQL is a semantic code analysis engine — it understands code structure, not just text patterns
- Default setup enables code scanning in minutes with no workflow file needed
- Advanced setup gives full control over queries, schedules, and custom analysis
- Copilot Autofix generates AI-powered fix suggestions directly in pull requests
- Code scanning can block PRs from merging when new vulnerabilities are introduced

### How CodeQL Works

```
┌─────────────────────────────────────────────────────┐
│                 CodeQL Pipeline                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Source Code                                       │
│       │                                             │
│       ▼                                             │
│   ┌──────────────┐                                  │
│   │  CodeQL       │  Builds a relational database   │
│   │  Extractor    │  of your code structure          │
│   └──────┬───────┘                                  │
│          │                                          │
│          ▼                                          │
│   ┌──────────────┐                                  │
│   │  CodeQL DB    │  Tables: functions, classes,     │
│   │               │  variables, data flows, calls    │
│   └──────┬───────┘                                  │
│          │                                          │
│          ▼                                          │
│   ┌──────────────┐                                  │
│   │  Query Suite  │  Default + extended + custom     │
│   │  Execution    │  queries                         │
│   └──────┬───────┘                                  │
│          │                                          │
│          ▼                                          │
│   SARIF Results → Security tab alerts               │
│                 → PR check annotations               │
│                 → Copilot Autofix suggestions         │
└─────────────────────────────────────────────────────┘
```

### Supported Languages

| Language | Build Required | Default Setup | Advanced Setup |
|----------|---------------|---------------|----------------|
| **JavaScript/TypeScript** | No | ✓ | ✓ |
| **Python** | No | ✓ | ✓ |
| **Ruby** | No | ✓ | ✓ |
| **Go** | No | ✓ | ✓ |
| **Java/Kotlin** | Yes | ✓ | ✓ |
| **C/C++** | Yes | ✓ | ✓ |
| **C#** | Yes | ✓ | ✓ |
| **Swift** | Yes | ✓ | ✓ |

### Default Setup vs. Advanced Setup

| Aspect | Default Setup | Advanced Setup |
|--------|---------------|----------------|
| **Configuration** | One-click in repo/org settings | Custom `.github/workflows/codeql.yml` |
| **Query suite** | `default` or `extended` | Any suite, custom queries |
| **Schedule** | Automatic (push + PR + weekly) | Fully customizable |
| **Multi-language** | Auto-detected | Manually specified |
| **Custom build steps** | Not supported | Full control |
| **Third-party SARIF** | Not applicable | Can upload results from other tools |
| **Best for** | Quick enablement at scale | Repositories needing fine-tuned analysis |

### Default Setup — Enabling at Scale

Default setup is the recommended approach for most organizations:

- Enable for all repositories from Organization → Settings → **Security configurations**
- Automatically detects languages and configures analysis
- Runs on push to default branch, PRs to default branch, and weekly schedule
- Choose between `default` query suite (high-confidence) and `extended` suite (more findings, some lower confidence)

### Advanced Setup — CodeQL Workflow

For repositories needing custom configuration:

```yaml
# .github/workflows/codeql.yml
name: "CodeQL Analysis"

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  schedule:
    - cron: '0 6 * * 1'  # Weekly Monday 6 AM UTC

jobs:
  analyze:
    name: Analyze (${{ matrix.language }})
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    strategy:
      matrix:
        language: [ 'javascript', 'python' ]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
          queries: +security-extended

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

### Code Scanning Alert Severities

| Severity | Description | Recommended Action |
|----------|-------------|-------------------|
| **Critical** | Exploitable vulnerability with high impact | Fix immediately — block merge |
| **High** | Significant vulnerability | Fix before release |
| **Medium** | Moderate risk, may require specific conditions | Plan fix within sprint |
| **Low** | Minor concern, limited exploitability | Address when convenient |
| **Warning** | Code quality or best practice issue | Review and improve |

### Merge Protection with Code Scanning

Prevent vulnerabilities from entering your default branch:

- Configure via repository rulesets or branch protection rules
- Set severity thresholds — block merges for Critical/High alerts
- Applies to CodeQL results and any SARIF-based tool
- Developers see inline annotations on the PR with remediation guidance

### 🖥️ Demo: Code Scanning Configuration

1. Navigate to a test repository → Settings → Code security and analysis
2. Enable code scanning with **default setup** — show the language auto-detection
3. Show how to switch between `default` and `extended` query suites
4. Navigate to the Security tab → Code scanning alerts
5. Walk through an alert: CWE reference, data flow path, severity, and remediation
6. Show a PR with inline code scanning annotations
7. Demonstrate merge protection — a PR blocked by a critical finding
8. Show org-level enablement via Security configurations

### Custom CodeQL Queries

For organizations with specific security requirements:

- Write custom queries in the CodeQL query language (QL)
- Store in a private repository and reference via query packs
- Use the CodeQL CLI for local development and testing
- Share across the organization via CodeQL packs published to the GitHub Container Registry

> **Note**: Custom queries are an advanced topic. Most organizations get excellent coverage from the `extended` query suite. Consider custom queries only when you have specific patterns (internal frameworks, custom auth flows) that default queries don't cover.

### Discussion Points

- Are you currently using any static analysis tools? How would CodeQL complement or replace them?
- Which query suite (`default` vs. `extended`) is the right starting point for your risk tolerance?
- Do you have merge protection or required status checks in place today?

---

## 4. Dependabot & Supply Chain Security (20 min)

### Key Points

- Open-source dependencies make up 70-90% of modern applications
- Dependabot provides three distinct capabilities: alerts, security updates, and version updates
- The dependency graph and dependency review action provide visibility into what you're shipping
- Supply chain security is not just about vulnerabilities — it's also about license compliance and provenance

### Dependabot Capabilities

| Feature | What It Does | How It Works |
|---------|-------------|--------------|
| **Dependabot Alerts** | Notifies of known vulnerabilities (CVEs) in dependencies | Matches dependency graph against GitHub Advisory Database |
| **Dependabot Security Updates** | Auto-creates PRs to fix vulnerable dependencies | Generates minimum-version-bump PR for each alert |
| **Dependabot Version Updates** | Keeps dependencies current (not just security) | Creates PRs per schedule defined in `dependabot.yml` |

### The GitHub Advisory Database

- Curated database of known vulnerabilities (CVEs, GHSAs)
- Covers all major ecosystems: npm, pip, Maven, NuGet, RubyGems, Go, Rust, etc.
- Community-contributed and GitHub-reviewed
- Powers Dependabot alerts and security updates

### Dependency Graph & Dependency Review

```
┌─────────────────────────────────────────────┐
│            Dependency Lifecycle              │
├─────────────────────────────────────────────┤
│                                             │
│  1. VISIBILITY                              │
│     Dependency Graph                        │
│     └── Shows all direct + transitive deps  │
│                                             │
│  2. DETECTION                               │
│     Dependabot Alerts                       │
│     └── Flags known CVEs in your deps       │
│                                             │
│  3. REMEDIATION                             │
│     Dependabot Security Updates             │
│     └── Auto-PRs to fix vulnerabilities     │
│                                             │
│  4. PREVENTION                              │
│     Dependency Review Action                │
│     └── Block PRs adding vulnerable deps    │
│                                             │
│  5. MAINTENANCE                             │
│     Dependabot Version Updates              │
│     └── Keep deps current on a schedule     │
│                                             │
└─────────────────────────────────────────────┘
```

### Configuring Dependabot Version Updates

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    reviewers:
      - "org/security-team"
    labels:
      - "dependencies"
      - "automated"
    open-pull-requests-limit: 10
    groups:
      development-dependencies:
        dependency-type: "development"
        update-types:
          - "minor"
          - "patch"

  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

**Best practices for `dependabot.yml`**:

- Group related dependency updates to reduce PR noise
- Set `open-pull-requests-limit` to avoid overwhelming reviewers
- Always include `github-actions` ecosystem to keep Actions up to date
- Use `reviewers` to route PRs to the appropriate team
- Schedule updates for the start of the week so they're addressed during working hours

### Dependency Review Action

Block PRs that introduce new vulnerabilities:

```yaml
# .github/workflows/dependency-review.yml
name: "Dependency Review"

on:
  pull_request:
    branches: [ "main" ]

permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Dependency Review
        uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: high
          deny-licenses: GPL-3.0, AGPL-3.0
          comment-summary-in-pr: always
```

### Dependabot Alert Management

| Action | Description | When to Use |
|--------|-------------|-------------|
| **Dismiss — false positive** | Alert does not apply to your usage | Vulnerable code path is never reached |
| **Dismiss — tolerable risk** | Accept the risk with documentation | Low severity, no exploit path |
| **Dismiss — dev dependency** | Only used in development | Test/build-only dependency |
| **Merge security update** | Apply the auto-generated fix PR | Recommended for all valid alerts |
| **Manual fix** | Update dependency manually | When auto-update introduces breaking changes |

### 🖥️ Demo: Dependabot Configuration

1. Navigate to a test repository → **Insights** tab → **Dependency graph**
2. Show direct and transitive dependencies across ecosystems
3. Navigate to the **Security** tab → **Dependabot alerts**
4. Walk through an alert: CVE details, severity, affected versions, remediation path
5. Show a Dependabot security update PR — review the diff and version bump
6. Navigate to Organization → Settings → **Security configurations** for org-wide Dependabot enablement
7. Show a `dependabot.yml` configuration with grouped updates and scheduling

### Discussion Points

- How do you currently track and manage open-source dependencies?
- Do you have license compliance requirements (e.g., no GPL in proprietary code)?
- What is your target SLA for remediating critical dependency vulnerabilities?

---

## 5. Copilot Autofix & Security Campaigns (15 min)

### Key Points

- Copilot Autofix uses AI to generate fix suggestions for code scanning alerts — directly in the PR
- Security campaigns let security teams create targeted remediation drives across repositories
- Together, these features dramatically reduce mean-time-to-remediation (MTTR) for security findings
- Autofix supports all CodeQL-supported languages and most CWE categories

### Copilot Autofix

```
Code Scanning Alert in PR
        │
        ▼
Copilot Autofix analyzes:
  ├── The vulnerability (CWE, data flow)
  ├── The surrounding code context
  └── The CodeQL query explanation
        │
        ▼
Fix suggestion generated:
  ├── Code diff with proposed fix
  ├── Natural language explanation
  └── One-click "Commit fix" button
        │
        ▼
Developer reviews and commits
```

**Copilot Autofix capabilities**:

- Generates fix suggestions for code scanning (CodeQL) alerts
- Provides natural language explanations of the vulnerability and the fix
- Supports one-click commit of the suggested fix
- Works in pull requests and on the Security tab for existing alerts
- Available for all CodeQL-supported languages

### Autofix Accuracy and Review

| Aspect | Detail |
|--------|--------|
| **Fix accuracy** | High-confidence fixes for common vulnerability patterns (SQL injection, XSS, path traversal) |
| **Developer review** | Autofix is a suggestion — developers must review before committing |
| **False fixes** | Rare but possible — always review the generated diff against your application logic |
| **Scope** | Fixes the specific vulnerability; does not refactor surrounding code |

> **Note**: Copilot Autofix is a powerful accelerator but does not replace developer judgment. Always review the generated fix for correctness in your specific application context.

### Security Campaigns

Security campaigns enable security teams to drive coordinated alert remediation across the organization:

```
Security Team creates campaign
        │
        ▼
Select alerts to include:
  ├── Filter by severity, CWE, repository
  ├── Set remediation deadline
  └── Assign to development teams
        │
        ▼
Developers see campaign alerts:
  ├── Prioritized in their Security tab
  ├── Copilot Autofix available on each alert
  └── Progress tracked in campaign dashboard
        │
        ▼
Campaign dashboard shows:
  ├── Overall progress (% fixed)
  ├── Per-team and per-repo breakdown
  └── Alerts remaining by severity
```

**Campaign workflow**:

- Security team creates a campaign from the Security Overview
- Select up to 1,000 alerts across repositories filtered by severity, CWE type, or tool
- Set a target date and assign to teams via GitHub Issues integration
- Track progress in real-time on the campaign dashboard
- Copilot Autofix is available on all campaign alerts for faster remediation

### When to Use Campaigns

| Scenario | Approach |
|----------|----------|
| **Initial GHAS rollout** | Campaign targeting Critical/High alerts across all repos |
| **Specific vulnerability class** | Campaign for all SQL injection (CWE-89) findings |
| **Compliance deadline** | Campaign with due date matching audit timeline |
| **New CVE response** | Campaign for repos affected by a newly disclosed vulnerability |
| **Quarterly security hygiene** | Regular campaign for accumulated Medium/Low alerts |

### 🖥️ Demo: Copilot Autofix & Security Campaigns

1. Navigate to a repository → Security tab → Code scanning alerts
2. Open an alert with Copilot Autofix available — show the generated fix and explanation
3. Walk through the "Commit fix" workflow
4. Navigate to Organization → Security → **Security campaigns** (or create from Security Overview)
5. Show campaign creation: filtering alerts, setting scope, assigning teams
6. Show the campaign dashboard with progress tracking

### Discussion Points

- How do you currently prioritize and track security alert remediation?
- What SLA or target do you have for fixing Critical vs. High vs. Medium findings?
- Would a campaign-based approach work with your development team structure?

---

## 6. Security Overview & Reporting (15 min)

### Key Points

- Security Overview provides enterprise-wide visibility across all GHAS features
- Three views: Risk (open alerts), Coverage (feature enablement), and Campaigns (remediation progress)
- Data can be filtered, exported, and used for compliance reporting
- Coverage view reveals repos that are not yet protected — critical for audit readiness

### Security Overview Dashboard

```
┌─────────────────────────────────────────────────────────┐
│                 Security Overview                       │
├──────────────────┬──────────────────┬───────────────────┤
│   RISK VIEW      │  COVERAGE VIEW   │  CAMPAIGNS VIEW   │
│                  │                  │                   │
│  Open alerts by  │  Feature enable- │  Active campaigns │
│  severity across │  ment status     │  progress and     │
│  all repos       │  per repo        │  remediation      │
│                  │                  │  metrics          │
│  Filter by:      │  Shows:          │                   │
│  • Severity      │  • Secret scan   │  Track:           │
│  • Tool          │  • Code scan     │  • % complete     │
│  • Repository    │  • Dependabot    │  • Per-team       │
│  • Team          │  • Push protect  │  • By severity    │
│  • CWE           │                  │                   │
└──────────────────┴──────────────────┴───────────────────┘
```

### Risk View

The Risk view shows open security alerts across your organization or enterprise:

| Filter | Use Case |
|--------|----------|
| **Severity** | Focus on Critical/High for immediate action |
| **Tool** | Compare CodeQL vs. secret scanning vs. Dependabot alert volumes |
| **Repository** | Identify highest-risk repositories |
| **Team** | Assign remediation ownership |
| **CWE** | Spot systemic patterns (e.g., widespread SQL injection) |
| **Age** | Find stale alerts that need attention |

### Coverage View

The Coverage view shows which GHAS features are enabled on each repository:

| Feature | Status Indicators |
|---------|-------------------|
| **Dependabot alerts** | ✓ Enabled / ✗ Not enabled |
| **Dependabot security updates** | ✓ Enabled / ✗ Not enabled |
| **Secret scanning** | ✓ Enabled / ✗ Not enabled |
| **Push protection** | ✓ Enabled / ✗ Not enabled |
| **Code scanning** | ✓ Enabled / ✗ Not enabled / ⚠️ Not configured |

> **Note**: The Coverage view is essential for audit preparation. Use it to identify repositories that are not yet protected and prioritize enablement.

### Security Metrics for Leadership

Key metrics to report from Security Overview:

- **Mean time to remediate (MTTR)** — by severity level
- **Alert open/close trend** — are you remediating faster than new alerts appear?
- **Coverage percentage** — what fraction of repos have GHAS features enabled?
- **Top CWEs** — recurring vulnerability patterns that need developer training
- **Autofix adoption rate** — how often are developers using Autofix suggestions?

### Compliance and Audit Support

| Compliance Need | GHAS Feature |
|----------------|--------------|
| "All code is scanned for vulnerabilities" | Code scanning Coverage view |
| "Secrets are prevented from entering code" | Push protection enablement |
| "Dependencies are monitored for CVEs" | Dependabot alerts enablement |
| "Findings are remediated within SLA" | Security Overview Risk view with age filter |
| "Security controls are enforced" | Enterprise policies for GHAS features |
| "Audit trail exists for security events" | Enterprise audit log |

### 🖥️ Demo: Security Overview Dashboard

1. Navigate to Organization → **Security** tab → **Overview**
2. Show the Risk view — filter by Critical severity, drill into a specific repository
3. Switch to Coverage view — identify repositories without code scanning enabled
4. Show how to export data for compliance reporting
5. Demonstrate alert trend visualization over time
6. Navigate to Enterprise → **Code Security** tab → Security Overview for enterprise-wide view

### Discussion Points

- What security metrics do you currently report to leadership?
- How do you track GHAS feature coverage across your repositories?
- What compliance frameworks require evidence of security scanning?

---

## 7. GHAS Rollout Strategy & Wrap-Up (10 min)

### Key Points

- A phased rollout is critical — enabling GHAS on all repos at once creates alert fatigue
- Start with high-value, high-risk repositories and expand
- Measure success with clear metrics, not just "features turned on"
- Developer enablement is as important as tool configuration

### Recommended Rollout Phases

```
Phase 1: Foundation                    Phase 2: Expand
├── Enable secret scanning             ├── Enable code scanning (default)
│   + push protection org-wide         │   on all active repositories
├── Enable Dependabot alerts           ├── Enable extended query suite
│   + security updates                 ├── Configure merge protection
├── Start with 5-10 pilot repos       ├── Roll out to all teams
│   for code scanning                  ├── Create first security campaign
└── Establish alert triage process     └── Set remediation SLAs
                                       
Phase 3: Optimize                      Phase 4: Mature
├── Custom secret patterns             ├── Org-wide security configs
├── Custom CodeQL queries              ├── Automated compliance reporting
├── Dependency review action           ├── Regular security campaigns
├── Copilot Autofix enablement         ├── Developer security champions
└── Fine-tune alert thresholds         └── Continuous improvement cycle
```

### Enablement Strategy by Feature

| Feature | Rollout Approach | Risk Level |
|---------|-----------------|------------|
| **Secret scanning** | Enable org-wide immediately | 🟢 Low — detection only, no workflow impact |
| **Push protection** | Enable org-wide with self-bypass initially | 🟢 Low — developers can bypass with reason |
| **Dependabot alerts** | Enable org-wide immediately | 🟢 Low — notifications only |
| **Dependabot security updates** | Enable org-wide | 🟡 Medium — auto-creates PRs |
| **Code scanning (default)** | Start with pilot repos, then expand | 🟡 Medium — may surface many findings initially |
| **Merge protection** | Enable after alert backlog is manageable | 🟡 Medium — can block merges |
| **Custom patterns/queries** | Add after baseline is established | 🟢 Low — additive |
| **Security campaigns** | Start after code scanning is broadly enabled | 🟢 Low — organizational coordination |

### Security Configurations

Use organization-level security configurations to manage settings at scale:

- **GitHub recommended** — pre-built configuration with sensible defaults
- **Custom configurations** — define your own combination of features and settings
- Apply configurations to all repositories or specific subsets
- Changes propagate automatically to covered repositories

### Measuring Success

| Metric | Target | How to Measure |
|--------|--------|----------------|
| GHAS coverage | 100% of active repos | Security Overview → Coverage view |
| MTTR (Critical) | < 7 days | Security Overview → Risk view with age filter |
| MTTR (High) | < 30 days | Security Overview → Risk view with age filter |
| Push protection blocks | Trending down over time | Audit log analysis |
| Autofix adoption | > 50% of eligible alerts | Security Overview metrics |
| Alert backlog trend | Decreasing month-over-month | Security Overview → Risk view |

### Common Pitfalls to Avoid

- **Alert fatigue**: Don't enable everything everywhere on day one — phase the rollout
- **No triage process**: Define ownership and SLAs before enabling scanning at scale
- **Ignoring developer experience**: Train developers on interpreting and fixing alerts
- **Skipping merge protection**: Without it, developers can merge past security findings
- **Set-and-forget**: GHAS requires ongoing tuning — review dismissed alerts, refine patterns

### Post-Workshop Actions

- [ ] Audit current GHAS enablement status across all organizations
- [ ] Enable secret scanning + push protection on all repositories
- [ ] Enable Dependabot alerts and security updates org-wide
- [ ] Select 5-10 pilot repositories for code scanning rollout
- [ ] Define alert severity → SLA mapping for your organization
- [ ] Establish an alert triage and ownership process
- [ ] Create your first security campaign targeting Critical/High alerts
- [ ] Schedule a follow-up session to review rollout progress

---

## Appendix: Key Admin URLs

> **Note**: GitHub's UI is regularly updated. The URLs below reflect the current structure. Verify against the live UI as GitHub periodically updates navigation.

| Resource | URL | Navigation |
|----------|-----|------------|
| Enterprise Security Overview | `github.com/enterprises/[name]/security` | Enterprise → Code Security tab |
| Enterprise Code Security Policies | `github.com/enterprises/[name]/policies/security` | Enterprise → Policies tab → Code security |
| Org Security Overview | `github.com/organizations/[name]/security` | Organization → Security tab |
| Org Security Configurations | `github.com/organizations/[name]/settings/security_products` | Organization → Settings → Security configurations |
| Org Code Security Settings | `github.com/organizations/[name]/settings/security` | Organization → Settings → Code security and analysis |
| Repo Security Alerts | `github.com/[owner]/[repo]/security` | Repository → Security tab |
| Repo Code Security Settings | `github.com/[owner]/[repo]/settings/security_analysis` | Repository → Settings → Code security and analysis |
| GitHub Advisory Database | <https://github.com/advisories> | Direct URL |
| CodeQL Documentation | <https://codeql.github.com/docs/> | Direct URL |
| GHAS Documentation | <https://docs.github.com/en/code-security> | Direct URL |

## Appendix: GHAS Feature Decision Matrix

| Scenario | Secret Scanning | Push Protection | Code Scanning | Dependabot | Merge Protection |
|----------|----------------|-----------------|---------------|------------|------------------|
| **High-security / Regulated** | ✓ + custom patterns | ✓ no bypass | ✓ extended suite | ✓ all features | ✓ Critical + High |
| **Standard enterprise** | ✓ default patterns | ✓ self-bypass | ✓ default suite | ✓ alerts + security updates | ✓ Critical only |
| **Early adoption / Pilot** | ✓ default patterns | ✓ self-bypass | ✓ default (pilot repos) | ✓ alerts only | ✗ not yet |
| **Open source projects** | ✓ (free for public) | ✓ | ✓ (free for public) | ✓ (free) | ✓ recommended |

## Appendix: Pre-Workshop Checklist

Run through this before the workshop:

- [ ] Verify enterprise owner or organization owner access
- [ ] Ensure GHAS license is enabled on at least one organization
- [ ] Have a test repository with code in a CodeQL-supported language (JavaScript/Python recommended)
- [ ] Enable code scanning on the test repository and wait for initial analysis to complete
- [ ] Seed the test repository with a known test secret for push protection demo
- [ ] Verify Dependabot alerts exist on at least one repository for demo
- [ ] Confirm Security Overview has data populated
- [ ] Bookmark all demo URLs in a dedicated browser folder
- [ ] Prepare backup screenshots for each demo section
- [ ] Test screen sharing shows GitHub UI clearly

### Backup Plan

If live demos fail:

1. Use screenshots captured during prep
2. Switch to GitHub Docs walkthrough for the relevant section
3. Engage audience with Q&A while troubleshooting
4. Use the GitHub security documentation as a guided tour

---

*Workshop materials prepared for comprehensive GitHub Advanced Security training*
