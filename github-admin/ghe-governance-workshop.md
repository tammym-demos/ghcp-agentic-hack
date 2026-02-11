# GitHub Enterprise Administration & Governance Workshop

**Duration**: 3 hours (with breaks)  
**Format**: Presentation + Live Demos  
**Audience**: Enterprise Admins, Org Owners, Security Teams, Engineering Managers  
**Focus**: GitHub Enterprise Cloud with Enterprise Managed Users (EMU)

---

## Workshop Overview

This comprehensive workshop covers end-to-end GitHub Enterprise administration and governance—from identity management and authentication through repository policies, security features, compliance controls, billing, and GitHub Copilot governance. The format combines presentation slides with live demos in the GitHub Enterprise admin portal, giving attendees hands-on familiarity with real configurations.

### Learning Objectives

- Architect and manage a GitHub Enterprise Cloud environment with EMU
- Configure enterprise-wide authentication, identity, and access controls
- Implement repository governance policies across organizations
- Deploy GitHub Advanced Security (GHAS) features for code security
- Manage billing, licensing, and seat optimization across products
- Govern GitHub Copilot with security controls and usage policies
- Establish audit, compliance, and incident response processes
- Design a phased rollout and change management strategy

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Opening & Enterprise Architecture Overview | 10 min |
| 2 | Identity, Authentication & SSO | 20 min |
| 3 | Enterprise & Organization Structure | 15 min |
| 4 | Repository Governance & Branch Policies | 20 min |
| ☕ | **Break** | 10 min |
| 5 | GitHub Advanced Security (GHAS) | 20 min |
| 6 | GitHub Copilot Governance | 20 min |
| 7 | Billing, Licensing & Seat Management | 15 min |
| 8 | Audit, Compliance & Incident Response | 15 min |
| 9 | Operational Best Practices & Wrap-up | 15 min |

**Total**: ~3 hours including break

---

## 1. Opening & Enterprise Architecture Overview (10 min)

### Why Enterprise Governance Matters

- Consistent security posture across all engineering teams
- Compliance with industry regulations (SOC 2, GDPR, HIPAA, FedRAMP)
- Cost optimization through centralized management
- Reduced shadow IT and configuration drift
- Faster onboarding for new teams, repos, and developers

### GitHub Enterprise Cloud Architecture

```
┌─────────────────────────────────────────────────┐
│              ENTERPRISE ACCOUNT                 │
│   Identity Provider (IdP) ← SAML/OIDC/SCIM     │
│   Enterprise Policies (highest precedence)      │
│   Billing & Licensing                           │
│   Audit Log (unified)                           │
├─────────────────────────────────────────────────┤
│  ┌──────────────┐   ┌──────────────┐            │
│  │   Org A       │   │   Org B       │           │
│  │  (Eng Team)   │   │  (Platform)   │           │
│  │  ┌─────────┐  │   │  ┌─────────┐  │           │
│  │  │ Repos   │  │   │  │ Repos   │  │           │
│  │  │ Teams   │  │   │  │ Teams   │  │           │
│  │  │ Projects│  │   │  │ Projects│  │           │
│  │  └─────────┘  │   │  └─────────┘  │           │
│  └──────────────┘   └──────────────┘            │
└─────────────────────────────────────────────────┘
```

### Enterprise Managed Users (EMU) vs. Standard Enterprise

| Feature | Standard Enterprise | EMU Enterprise |
|---------|---------------------|----------------|
| Account creation | Users sign up themselves | IdP provisions accounts |
| Identity control | SAML linking | Full lifecycle management |
| Username format | User-chosen | `<shortcode>_<handle>` |
| Personal repos | Allowed | Not allowed |
| Outside collaborators | Allowed | Restricted by default |
| SSO enforcement | Org-level | Enterprise-level |
| SCIM provisioning | Optional | Required |

### Key Points

- EMU provides the strongest governance model—accounts are owned and managed by the enterprise
- All user lifecycle events (create, update, deactivate) flow through the IdP
- Users cannot fork to personal accounts or contribute outside the enterprise

---

## 2. Identity, Authentication & SSO (20 min)

### SAML SSO Configuration

- **Enterprise-level SAML**: Single sign-on enforced across all organizations
- **IdP integration**: Azure AD (Entra ID), Okta, PingFederate, OneLogin
- **SAML attributes mapping**:

| SAML Attribute | GitHub Field | Required |
|----------------|--------------|----------|
| `NameID` | Username | Yes |
| `email` | Email address | Yes |
| `first_name` | Display name (first) | Recommended |
| `last_name` | Display name (last) | Recommended |

### SCIM Provisioning

- Automatic user provisioning and deprovisioning via SCIM 2.0
- Group-based team synchronization (IdP groups → GitHub teams)
- Lifecycle management: onboarding, role changes, offboarding

```
Identity Provider (Entra ID / Okta)
        │
        │ SCIM 2.0
        ▼
┌───────────────────────────┐
│   GitHub Enterprise       │
│                           │
│   User Created → Seat     │
│   Group Synced → Team     │
│   User Disabled → Removed │
└───────────────────────────┘
```

### Team Synchronization

- Map IdP groups directly to GitHub teams
- Role changes in IdP propagate automatically
- Eliminates manual team membership management

### 🖥️ Demo: SSO & SCIM Configuration

**Location**: Enterprise → **Identity provider** tab (top of page)

> **Note**: For EMU enterprises, SSO is configured via the **Identity provider** tab at the top of the enterprise page—not under "Authentication security" (which is the path for standard/non-EMU enterprises).

1. Navigate to your enterprise → click the **Identity provider** tab at the top of the page
2. Click **Single sign-on configuration** — show SAML/OIDC fields and IdP metadata
3. Explain that SCIM provisioning is configured **in the IdP application** (Entra ID / Okta), not in the GitHub UI — show the IdP-side SCIM app if available
4. Navigate to Enterprise → Identity provider → **Groups** to show synced IdP groups
5. Navigate to Organization → **Teams** → select a team → **Settings** to show IdP group mapping

### Two-Factor Authentication (2FA)

- **Enterprise policy**: Require 2FA for all members
- **Enforcement options**:
  - Required for all enterprise members
  - Required per organization
  - Grace period for compliance
- **Supported methods**: TOTP apps, security keys (WebAuthn/FIDO2), passkeys, GitHub Mobile

### SSH Key & PAT Governance

| Control | Description | Scope |
|---------|-------------|-------|
| SSH key requirements | Require SSH certificate authorities | Enterprise |
| PAT restrictions | Limit classic PATs, enforce fine-grained | Org |
| PAT approval workflow | Require admin approval for token access | Org |
| IP allow lists | Restrict access by IP range | Enterprise, Org |

### 🖥️ Demo: Personal Access Token Policies

**Enterprise-level**: Enterprise → **Policies** tab → **Personal access tokens**  
**Organization-level**: Organization → Settings → sidebar: **Personal access tokens** → **Settings**

1. Navigate to Enterprise → Policies tab → Personal access tokens — show enterprise-wide PAT policies
2. Navigate to Organization → Settings → Personal access tokens → Settings
3. Show fine-grained PAT requirements and how to restrict classic PATs
4. Demonstrate PAT approval workflow (require admin approval for token access)

### Discussion Points

- What is your current IdP and SSO setup?
- How do you handle offboarding today—manual or automated?
- Are you currently enforcing 2FA across all users?

---

## 3. Enterprise & Organization Structure (15 min)

### Organizational Design Patterns

| Pattern | Description | Best For |
|---------|-------------|----------|
| **Single Org** | All teams in one org | Small enterprises (<500 devs) |
| **Business Unit Orgs** | Org per BU/division | Large enterprises with autonomy |
| **Product Line Orgs** | Org per product | Product-centric companies |
| **Environment Orgs** | Org per env (dev/staging/prod) | Strict environment isolation |

### Enterprise Policy Hierarchy

```
Enterprise Policies (highest precedence — can enforce or delegate)
    ↓
Organization Policies (can customize if delegated)
    ↓
Repository Settings (most specific — lowest precedence)
```

**Key principle**: Higher levels can **enforce** settings or set **"No Policy"** to delegate decisions downward.

### Enterprise-Level Policies

| Policy Area | Options | Impact |
|-------------|---------|--------|
| Repository visibility | Public / Internal / Private | Controls default and allowed repo types |
| Repository forking | Allow / Restrict | Controls forking within and outside enterprise |
| Base permissions | None / Read / Write / Admin | Default access for org members |
| Repository creation | All members / Admins only | Who can create new repos |
| Outside collaborators | Allow / Restrict | External contributor access |
| Actions workflow permissions | Allow all / Selected / Disable | GitHub Actions governance |

### 🖥️ Demo: Enterprise Policies

**Location**: Enterprise → **Policies** tab (⚖️ icon, top of page) → **Member privileges**

1. Navigate to your enterprise → click the **Policies** tab at the top of the page
2. Click **Member privileges** in the sidebar
3. Walk through each repository policy (base permissions, repo creation, forking, visibility, outside collaborators)
4. Show "Enforce" vs. "Allow" vs. "No Policy" for each setting
5. Demonstrate how org-level settings show "Enforced by enterprise"

### Organization-Level Settings

Key org-level configurations:

- **Member privileges**: Base permissions, repo creation, forking, pages
- **Team management**: Team creation permissions, team visibility
- **Third-party access**: OAuth app and GitHub App policies
- **Moderation**: Interaction limits, code of conduct
- **Security**: Dependency graph, Dependabot, secret scanning defaults

### Custom Repository Roles

Define granular roles beyond the built-in Read/Triage/Write/Maintain/Admin:

| Built-In Role | Key Permissions |
|---------------|-----------------|
| Read | View code, issues, PRs |
| Triage | Manage issues and PRs (no code push) |
| Write | Push code, manage issues/PRs |
| Maintain | Manage repo settings (no destructive actions) |
| Admin | Full control including settings and access |

**Custom roles** allow you to pick specific permissions (e.g., a "Security Reviewer" role that can view secret scanning alerts but not push code).

### 🖥️ Demo: Custom Repository Roles

**Location**: Organization → Settings → Access section (sidebar) → **Repository roles**

1. Navigate to Organization → Settings → sidebar **Access** section → **Repository roles**
2. Show built-in roles and their permissions
3. Create a custom role (e.g., "Security Auditor")
4. Assign specific permissions to the custom role
5. Show how to apply the role to a team

### Discussion Points

- How many organizations does your enterprise currently have?
- What's your strategy for repository visibility defaults?
- Do you use custom roles today, or rely on built-in roles?

---

## 4. Repository Governance & Branch Policies (20 min)

### Repository Management at Scale

#### Repository Naming Conventions

Establish naming standards to keep repositories discoverable:

```
Pattern: <team>-<project>-<component>
Examples:
  platform-payments-api
  mobile-ios-app
  infra-terraform-modules
  docs-internal-wiki
```

#### Repository Templates

- Create standardized templates with required files:
  - `README.md` with project structure
  - `CODEOWNERS` file
  - `.github/PULL_REQUEST_TEMPLATE.md`
  - `.github/ISSUE_TEMPLATE/` directory
  - `LICENSE` file
  - `.gitignore` for language/framework
  - CI/CD workflow files

#### Repository Properties & Rulesets

Repository properties allow tagging repos with custom metadata:

| Property | Example Values | Use Case |
|----------|---------------|----------|
| `environment` | production, staging, dev | Environment classification |
| `compliance-level` | high, medium, low | Regulatory requirements |
| `team-owner` | platform, mobile, data | Ownership tracking |
| `language` | java, python, typescript | Technology stack |

### Branch Protection Rules

| Rule | Purpose | Recommended Setting |
|------|---------|---------------------|
| Require PR reviews | Enforce code review | 1-2 required reviewers |
| Dismiss stale reviews | Re-review after changes | Enabled |
| Require status checks | CI must pass | Enabled (required checks listed) |
| Require signed commits | Verify commit authorship | Enabled for compliance-heavy repos |
| Require linear history | Clean git history | Enabled (squash or rebase) |
| Restrict pushes | Limit direct pushes | Only deploy bots |
| Lock branch | Prevent changes | Use for release branches |

### Repository Rulesets (Modern Approach)

Rulesets are the newer, more powerful replacement for branch protection rules:

```
Enterprise Ruleset (applies across all orgs)
    ↓
Organization Ruleset (applies to matching repos)
    ↓
Repository Ruleset (repo-specific rules)
```

**Advantages over branch protection**:
- Apply rules across multiple repos from one place
- Target by repository properties (metadata-based)
- Stack multiple rulesets for layered governance
- Include tag protection (not just branches)
- Bypass lists for automation accounts

### 🖥️ Demo: Rulesets Configuration

**Enterprise-level**: Enterprise → **Policies** tab → **Code** (sidebar) → New ruleset  
**Organization-level**: Organization → Settings → Code and automation → **Repository** → **Rulesets**  
**Repository-level**: Repository → Settings → Code and automation → **Rules** → **Rulesets**

1. Navigate to Enterprise → Policies tab → **Code** → click **New ruleset**
2. Create a new ruleset targeting `main` branch
3. Add rules: require PRs, status checks, signed commits
4. Set enforcement status (Active, Evaluate, Disabled)
5. Configure bypass list for CI/CD service accounts
6. Show how to target repos by property (e.g., `compliance-level: high`)

### CODEOWNERS

Enforce required reviewers based on file paths:

```
# .github/CODEOWNERS

# Default owners for everything
*                       @org/engineering-leads

# Infrastructure changes require platform team
/infrastructure/        @org/platform-team
*.tf                    @org/platform-team

# Security-sensitive files require security review
/auth/                  @org/security-team
**/secrets.*            @org/security-team

# API changes require API team review
/api/                   @org/api-team
openapi.yaml            @org/api-team

# Documentation
/docs/                  @org/docs-team
```

### 🖥️ Demo: CODEOWNERS & Branch Protection

1. Show a CODEOWNERS file in a repository
2. Open a PR that modifies a file covered by CODEOWNERS
3. Show how required reviewers are automatically assigned
4. Demonstrate branch protection enforcement on PR merge

### Inner Source & Repository Visibility

| Visibility | Who Can See | Use Case |
|------------|-------------|----------|
| **Private** | Explicit collaborators only | Confidential projects |
| **Internal** | All enterprise members | Inner source / shared libraries |
| **Public** | Everyone on the internet | Open source projects |

**Inner source best practices**:
- Default to `Internal` for cross-team collaboration
- Use `CONTRIBUTING.md` for contribution guidelines
- Set up discovery with topics and repository descriptions

---

## 5. GitHub Advanced Security (GHAS) (20 min)

### GHAS Overview

GitHub Advanced Security provides three key capabilities:

```
┌───────────────────────────────────────────────────────┐
│              GitHub Advanced Security                 │
├──────────────┬──────────────────┬─────────────────────┤
│   Code       │   Secret         │   Dependency        │
│   Scanning   │   Scanning       │   Review            │
│              │                  │                     │
│  CodeQL      │  200+ patterns   │  License compliance │
│  analysis    │  Custom patterns │  Vulnerability      │
│  Custom      │  Push protection │  alerts             │
│  queries     │  Validity checks │  Auto-fix PRs       │
└──────────────┴──────────────────┴─────────────────────┘
```

### Secret Scanning

**Purpose**: Detect secrets (API keys, tokens, passwords) committed to repositories

| Feature | Description | Scope |
|---------|-------------|-------|
| Default patterns | 200+ partner patterns (AWS, Azure, Slack, etc.) | Org, Repo |
| Custom patterns | Define regex patterns for internal secrets | Org, Repo |
| Push protection | Block pushes containing secrets before they land | Org, Repo |
| Validity checks | Verify if detected secrets are still active | Enterprise |
| Non-provider patterns | Generic high-entropy string detection | Org |

#### Push Protection

- Blocks commits containing detected secrets **before** they reach the repo
- Developer sees an inline warning with remediation guidance
- Admins can allow bypass with a reason (audit-logged)

```
Push Protection Flow:
  Developer pushes code
      ↓
  GitHub scans for secrets
      ↓
  Secret detected? ──Yes──→ Push blocked + notification
      ↓ No                  Developer removes secret
  Push accepted              or requests bypass
```

### 🖥️ Demo: Secret Scanning & Push Protection

**Location**: Organization → Settings → **Security configurations** (recommended) or **Code security and analysis** (legacy)

> **Note**: GitHub now recommends using **Security configurations** to enable GHAS features at scale. This provides a "GitHub recommended" preset configuration. The legacy "Code security and analysis" page still exists but is being superseded.

1. Navigate to Organization → Settings → **Security configurations**
2. Show the "GitHub recommended" security configuration preset
3. Enable secret scanning and push protection for all repositories
4. Navigate to Organization → Settings → Code security and analysis → **Secret scanning** for custom pattern creation
5. Show the secret scanning alerts dashboard (Organization → **Security** tab)
6. Demonstrate a push protection block (optional—requires test repo)

### Code Scanning (CodeQL)

- **Static analysis** powered by CodeQL semantic analysis engine
- **Languages supported**: JavaScript, TypeScript, Python, Java, C/C++, C#, Go, Ruby, Swift, Kotlin
- **Runs via**: GitHub Actions workflow or third-party CI integration

#### Default Setup vs. Advanced Setup

| Setup Type | Configuration | Best For |
|------------|--------------|----------|
| Default | Auto-configured, no workflow file needed | Quick enablement at scale |
| Advanced | Custom `.github/workflows/codeql.yml` | Fine-tuned analysis, custom queries |

#### Code Scanning Policies

- **Enterprise policy**: Enforce code scanning for all repos
- **Merge protection**: Block PRs that introduce new security alerts
- **Severity thresholds**: Define which alert severities block merges

### 🖥️ Demo: Code Scanning Configuration

1. Navigate to a repository → Settings → Code security and analysis (or use **Security configurations** at org level for bulk enablement)
2. Enable code scanning with default setup
3. Show the Security tab → Code scanning alerts
4. Walk through an alert: description, severity, remediation
5. Show how to configure merge protection for code scanning

### Dependabot

Dependabot provides three capabilities:

| Feature | What It Does | Configuration |
|---------|-------------|---------------|
| **Dependabot Alerts** | Notifies of known vulnerabilities in dependencies | Auto-enabled |
| **Dependabot Security Updates** | Auto-creates PRs to fix vulnerable dependencies | Org/Repo setting |
| **Dependabot Version Updates** | Keeps dependencies up to date (not just security) | `dependabot.yml` |

#### Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "org/platform-team"
    labels:
      - "dependencies"
    open-pull-requests-limit: 10
    
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
```

### Security Overview Dashboard

**Location**: Enterprise or Organization → Security tab

- Unified view of all security alerts across repositories
- Filter by severity, tool, repository, and status
- Track remediation progress and SLA compliance
- Export data for compliance reporting

### 🖥️ Demo: Security Overview

1. Navigate to Organization → Security → Overview
2. Show the risk summary and alert counts
3. Filter by severity (Critical, High)
4. Drill into a specific repository's alerts
5. Show the coverage view (which repos have features enabled)

### GHAS Enablement at Scale

| Strategy | How | Best For |
|----------|-----|----------|
| Org-wide default | Enable for all new repos automatically | Broad coverage |
| Security campaigns | Target high-risk repos first | Risk-based approach |
| Gradual rollout | Enable per team, measure, expand | Change management |

---

## 6. GitHub Copilot Governance (20 min)

### Copilot Enterprise vs. Business

| Feature | Business | Enterprise |
|---------|----------|------------|
| Code completions | ✓ | ✓ |
| Chat in IDE | ✓ | ✓ |
| CLI support | ✓ | ✓ |
| Knowledge bases | ✗ | ✓ |
| Fine-tuned models | ✗ | ✓ |
| Enterprise policy controls | Limited | Full |
| SAML/SSO enforcement | Org-level | Enterprise-level |

### Security Architecture

- **Data handling**: Prompts and suggestions processed in real-time
- **Training guarantee**: Enterprise code is NOT used to train models
- **Telemetry**: Metadata collected for usage analytics only
- **Data residency**: Processed in Microsoft/GitHub infrastructure

### Content Exclusions

Prevent sensitive code from being included in Copilot context:

```yaml
# .github/copilot-content-exclusion.yaml
exclusions:
  - "**/*.env"
  - "**/secrets/**"
  - "**/internal-api/**"
  - "src/crypto/**"
  - "**/vendor/**"
```

### 🖥️ Demo: Content Exclusions

1. Navigate to Organization Settings → Copilot → Content exclusion
2. Add exclusion patterns for sensitive paths
3. Show how exclusions propagate across repos

### Public Code Filter

| Setting | Pros | Cons |
|---------|------|------|
| **Blocked** | Reduces IP/licensing risk | Fewer suggestions |
| **Allowed** | More suggestions available | Requires developer judgment |

**Recommendation**: Block for regulated industries; Allow for internal tools/prototypes.

### Copilot Policy Settings

> **Note**: At the enterprise level, Copilot policies are managed under the **AI controls** tab (not the Policies tab). At the organization level, they remain under Organization → Settings → Copilot.

| Policy | Options | Scope |
|--------|---------|-------|
| Copilot in IDE | Enabled / Disabled / No Policy | Enterprise, Org |
| Copilot Chat | Enabled / Disabled / No Policy | Enterprise, Org |
| Copilot in CLI | Enabled / Disabled / No Policy | Enterprise, Org |
| Knowledge Bases | Enabled / Disabled | Enterprise |
| Public code filter | Allow / Block | Enterprise, Org |
| Content exclusions | Pattern-based | Org, Repo |

### 🖥️ Demo: Copilot Policy Configuration

**Location**: Enterprise → **AI controls** tab (🤖 icon, top of page) → **Copilot** (sidebar)

> **Note**: Copilot policies have moved out of the "Policies" tab into their own top-level **AI controls** tab. The AI controls tab also includes sidebar sections for **Agents** and **MCP** policies.

1. Navigate to your enterprise → click the **AI controls** tab at the top of the page
2. Click **Copilot** in the sidebar — walk through each policy option
3. Show enforcement options: toggle or dropdown for each policy
4. Enable public code filter (Block)
5. Navigate to org-level (Organization → Settings → Copilot) to show inheritance
6. Show usage analytics dashboard

### Custom Instructions

Create org-wide coding standards for Copilot with `.github/copilot-instructions.md`:

```markdown
# Copilot Instructions for [Org Name]

## Code Style
- Use TypeScript strict mode
- Prefer functional components in React
- All functions must have JSDoc comments

## Security Requirements
- Never hardcode credentials
- Use parameterized queries for database access
- Validate all user inputs

## Testing
- Include unit tests for all new functions
- Minimum 80% code coverage
```

### Usage Analytics & ROI

**Metrics available**:
- Active users: Daily/weekly/monthly unique users
- Acceptance rate: % of suggestions accepted
- Language breakdown: Usage by programming language
- Lines of code suggested: Volume metrics

**ROI tracking considerations**:
- Time saved per developer (survey-based)
- Code review cycle time changes
- Onboarding time for new team members
- Developer satisfaction scores

---

## 7. Billing, Licensing & Seat Management (15 min)

### GitHub Enterprise Licensing Overview

| Product | Licensing Model | Included In Enterprise |
|---------|----------------|------------------------|
| GitHub Enterprise Cloud | Per-seat (user) | ✓ Base license |
| GitHub Advanced Security | Per-unique-committer | Add-on |
| GitHub Copilot Business | Per-seat (assigned) | Add-on |
| GitHub Copilot Enterprise | Per-seat (assigned) | Add-on |
| GitHub Actions | Minutes + storage | Included allocation + overage |
| GitHub Packages | Storage + transfer | Included allocation + overage |
| GitHub Large File Storage | Storage + bandwidth | Add-on |

### Enterprise Seat Management

- **Enterprise members**: Users with access to at least one org
- **Billing seat**: Consumed when user is a member of any org
- **Outside collaborators**: Billed separately (if allowed)
- **Service accounts**: Consume seats; plan accordingly

### Cost Optimization Strategies

| Strategy | Action | Expected Impact |
|----------|--------|-----------------|
| Regular seat audits | Remove inactive users (60+ days) | 5-15% cost reduction |
| SCIM deprovisioning | Auto-remove on IdP disable | Prevents orphan seats |
| Copilot seat reviews | Reassign underutilized Copilot seats | 10-20% seat optimization |
| Actions optimization | Cache dependencies, optimize workflows | Reduce minutes overage |
| GHAS committer analysis | Identify active committer count | Right-size GHAS licensing |

### 🖥️ Demo: Billing & Usage

**Location**: Enterprise → **Billing and licensing** tab (top of page)

> **Note**: Copilot seat/license assignment is also managed here: Billing and licensing → **Licensing** → Copilot section → **Manage**.

1. Navigate to your enterprise → click the **Billing and licensing** tab at the top of the page
2. Show seat count by product (Enterprise, GHAS, Copilot)
3. Click **Licensing** to show Copilot seat assignment and management
4. Review GitHub Actions minutes usage
5. Show storage consumption (Packages, LFS)
6. Demonstrate usage export for finance/procurement reporting

### GitHub Actions Billing

| Plan | Included Minutes | Storage |
|------|------------------|---------|
| Enterprise Cloud | 50,000 min/month | 50 GB |
| Overage | Per-minute billing | Per-GB billing |

**Minutes multiplier by runner type**:

| Runner OS | Multiplier |
|-----------|------------|
| Linux | 1× |
| Windows | 2× |
| macOS | 10× |

### Spending Limits

- Set monthly spending limits for Actions and Packages
- Configure alerts at spending thresholds
- Enterprise owners can set org-level spending limits

### Discussion Points

- Do you have a process for regular seat audits?
- How do you handle cost chargebacks to business units?
- Are you optimizing GitHub Actions runner usage?

---

## 8. Audit, Compliance & Incident Response (15 min)

### Enterprise Audit Log

The audit log captures all administrative and security-relevant events across the enterprise.

#### Key Audit Event Categories

| Category | Example Events |
|----------|---------------|
| `org` | Member added/removed, settings changed |
| `repo` | Created, deleted, visibility changed, archived |
| `team` | Created, deleted, member added/removed |
| `oauth_application` | App authorized, token created |
| `copilot` | Policy changed, seat assigned/removed |
| `business` | Enterprise settings changed |
| `protected_branch` | Branch protection modified |
| `secret_scanning` | Alert created, resolved |
| `code_scanning` | Alert created, dismissed |
| `dependabot` | Alert created, auto-fix PR |

#### Audit Log Search Syntax

```
# Filter by action category
action:org.add_member

# Filter by actor
actor:username

# Filter by date range
created:2026-01-01..2026-02-01

# Combined filters
action:repo.destroy actor:admin-user created:>2026-01-15

# Copilot-specific events
action:copilot.policy_update
action:copilot.seat_added
action:copilot.content_exclusion_create
```

### 🖥️ Demo: Audit Log

**Location**: Enterprise → **Settings** tab → **Audit log**

1. Navigate to your enterprise → Settings tab → Audit log
2. Demonstrate search syntax with filters
3. Show event details (actor, timestamp, details)
4. Filter for security-relevant events
5. Show export options (JSON, CSV)

### Audit Log Streaming

Stream audit events to external SIEM/monitoring systems:

| Destination | Integration |
|-------------|-------------|
| Amazon S3 | S3 bucket streaming |
| Azure Blob Storage | Blob container streaming |
| Azure Event Hubs | Real-time event streaming |
| Google Cloud Storage | GCS bucket streaming |
| Datadog | Direct integration |
| Splunk | HEC endpoint streaming |

### 🖥️ Demo: Audit Log Streaming Setup

1. Enterprise → Settings tab → Audit log → **Log streaming**
2. Show available streaming destinations
3. Walk through configuration for one destination
4. Show how to verify streaming is active

### Compliance Certifications

GitHub Enterprise Cloud maintains:

| Certification | Status |
|---------------|--------|
| SOC 1 Type II | ✓ Current |
| SOC 2 Type II | ✓ Current |
| SOC 3 | ✓ Current |
| ISO 27001 | ✓ Current |
| ISO 27018 | ✓ Current |
| GDPR | ✓ Compliant |
| FedRAMP (via Azure Gov) | ✓ Available |
| CSA STAR | ✓ Current |

### Compliance Reporting Checklist

For audit preparation, maintain documentation on:

- [ ] Enterprise policy configurations (export/screenshot)
- [ ] SSO and SCIM configuration evidence
- [ ] 2FA enforcement verification
- [ ] GHAS enablement status across repos
- [ ] Copilot governance settings
- [ ] Branch protection / ruleset configurations
- [ ] Audit log retention and streaming setup
- [ ] Access review schedules and results
- [ ] Incident response procedures

### Incident Response Framework

For security incidents involving GitHub Enterprise:

```
1. DETECT
   ├── Audit log alerts
   ├── Secret scanning notifications
   ├── Code scanning alerts
   └── SIEM correlation

2. CONTAIN
   ├── Disable compromised user/token (IdP)
   ├── Revoke PATs and OAuth tokens
   ├── Lock affected repositories
   └── Disable Copilot if code exposure suspected

3. INVESTIGATE
   ├── Audit log review (actor, timeline, scope)
   ├── Repository access logs
   ├── Git history analysis
   └── Secret scanning alert review

4. REMEDIATE
   ├── Rotate compromised credentials
   ├── Update affected code
   ├── Patch vulnerable dependencies
   └── Restore from backup if needed

5. RECOVER & LEARN
   ├── Re-enable services with updated policies
   ├── Document findings and timeline
   ├── Update runbooks and policies
   └── Conduct blameless postmortem
```

---

## 9. Operational Best Practices & Wrap-up (15 min)

### Role-Based Administration Matrix

| Role | Scope | Key Responsibilities |
|------|-------|---------------------|
| **Enterprise Owner** | All orgs | Enterprise policies, billing, audit, SSO |
| **Enterprise Admin** | All orgs | User management, support escalation |
| **Organization Owner** | Single org | Org policies, team management, repo settings |
| **Security Manager** | Single org | Security alerts, audit review (no code access) |
| **Billing Manager** | Enterprise | Usage reports, spend management |
| **Team Maintainer** | Single team | Team membership, repo assignments |

**Best practice**: Limit Enterprise Owners to 2-3 people. Use the Security Manager role for security teams who need alert visibility without code access.

### Governance Operating Model

#### Quarterly Reviews

- [ ] Audit seat utilization (Enterprise, GHAS, Copilot)
- [ ] Review and update enterprise policies
- [ ] Validate SSO/SCIM configuration
- [ ] Check 2FA compliance rates
- [ ] Review Dependabot alert backlog
- [ ] Assess secret scanning coverage
- [ ] Update content exclusion patterns
- [ ] Review and prune inactive repositories
- [ ] Validate audit log streaming

#### Ongoing Operations

| Task | Frequency | Owner |
|------|-----------|-------|
| Seat audit / deprovisioning | Monthly | Enterprise Admin |
| Security alert triage | Weekly | Security Manager |
| Dependabot PR review | Weekly | Engineering Leads |
| Copilot usage analysis | Monthly | Engineering Manager |
| Audit log review | Weekly | Security Manager |
| Policy configuration review | Quarterly | Enterprise Owner |
| Compliance evidence collection | Quarterly | Compliance Team |
| Emergency access review | As needed | Enterprise Owner |

### GitHub Actions Governance

Control Actions usage across the enterprise:

| Policy | Options | Recommendation |
|--------|---------|----------------|
| Actions permissions | Allow all / Selected / Disable | Allow selected (curated list) |
| Allowed actions | GitHub-authored / Verified / Specific | GitHub-authored + verified marketplace |
| Workflow permissions | Read + write / Read-only | Read-only (principle of least privilege) |
| Fork PR policies | Require approval for first-time contributors | Enabled |
| Self-hosted runners | Enterprise / Org / Repo | Enterprise-managed runner groups |

#### Runner Groups

Organize self-hosted runners for governance:

```
Enterprise Runner Group: "production-runners"
├── Restricted to: production-org
├── Allowed workflows: deployment.yml
└── Labels: self-hosted, linux, production

Enterprise Runner Group: "general-runners"
├── Available to: all orgs
├── Allowed workflows: any
└── Labels: self-hosted, linux, general
```

### GitHub App & OAuth Governance

- **Enterprise policy**: Restrict OAuth app and GitHub App access
- **App approval workflow**: Require admin approval before granting access
- **Regular app audits**: Review authorized integrations quarterly
- **IP allow lists**: Restrict API access to known IP ranges

### 🖥️ Demo: Actions & App Policies

1. Enterprise → **Policies** tab → **Actions** (sidebar) — show allowed actions configuration
2. Show workflow permissions (read-only vs. read-write)
3. Show runner groups and access restrictions
4. Navigate to Organization → Settings → Third-party access → **GitHub Apps**
5. Show app approval workflow

### Phased Enterprise Governance Rollout

```
Phase 1: Foundation (Weeks 1-4)
├── Configure SSO/SAML and SCIM provisioning
├── Enforce 2FA across enterprise
├── Set enterprise-level repository policies
├── Configure audit log streaming
└── Define org structure and membership

Phase 2: Security (Weeks 5-8)
├── Enable secret scanning + push protection (org-wide)
├── Roll out code scanning (default setup) for critical repos
├── Configure Dependabot alerts and security updates
├── Create rulesets for branch protection
└── Establish security alert triage process

Phase 3: Developer Productivity (Weeks 9-12)
├── Enable GitHub Copilot for pilot teams
├── Configure Copilot content exclusions
├── Set Copilot policies (public code filter, etc.)
├── Create custom instructions for coding standards
└── Establish usage metrics baseline

Phase 4: Optimization (Ongoing)
├── Regular seat audits and cost optimization
├── Expand GHAS and Copilot coverage
├── Refine policies based on feedback
├── Automate compliance reporting
└── Conduct quarterly governance reviews
```

### Internal Communication Templates

**For Developers**:
- "What data does GitHub process?" → See enterprise data handling policy
- "Is my code used to train AI?" → No (Enterprise Copilot guarantee)
- "Why can't I create public repos?" → Enterprise policy for IP protection
- "How do I request Copilot access?" → Submit request through [internal portal]

**For Managers**:
- "How do we track ROI?" → Usage dashboards + developer surveys
- "What compliance certifications does GitHub have?" → SOC 2, ISO 27001, GDPR
- "Can I see my team's usage data?" → Org-level analytics available

### Resources

| Resource | URL |
|----------|-----|
| GitHub Enterprise Docs | https://docs.github.com/en/enterprise-cloud@latest |
| GitHub Advanced Security Docs | https://docs.github.com/en/code-security |
| GitHub Copilot Docs | https://docs.github.com/en/copilot |
| GitHub Trust Center | https://resources.github.com/security/ |
| GitHub Skills | https://skills.github.com/ |
| GitHub Changelog | https://github.blog/changelog/ |
| GitHub Status | https://www.githubstatus.com/ |

---

## Q&A Topics to Prepare For

- Migration strategy from other platforms (GitLab, Bitbucket, Azure DevOps)
- GitHub Enterprise Server vs. Cloud trade-offs
- FedRAMP and government compliance requirements
- Self-hosted vs. GitHub-hosted runners cost comparison
- Large repository handling (monorepos, LFS)
- Disaster recovery and business continuity
- GitHub Connect (Server + Cloud hybrid)
- API rate limits and automation best practices
- Inner source program implementation

---

## Post-Workshop Actions

- [ ] Audit current enterprise configuration against best practices
- [ ] Validate SSO/SCIM provisioning is complete and accurate
- [ ] Review and update enterprise and org-level policies
- [ ] Enable GHAS features (secret scanning, code scanning, Dependabot)
- [ ] Configure audit log streaming to your SIEM
- [ ] Define content exclusion requirements for Copilot
- [ ] Establish seat utilization review cadence
- [ ] Create internal governance policy document
- [ ] Set up quarterly governance review calendar
- [ ] Schedule follow-up session for Q&A after initial implementation

---

## Appendix: Key Admin URLs

> **Note**: GitHub's enterprise UI uses top-level tabs (Policies, AI controls, Settings, Billing and licensing). The URLs below reflect the current structure. Verify against the live UI as GitHub periodically updates navigation.

| Resource | URL | Navigation |
|----------|-----|------------|
| Enterprise Settings | `github.com/enterprises/[name]/settings` | Enterprise → Settings tab |
| Enterprise Policies | `github.com/enterprises/[name]/policies` | Enterprise → Policies tab |
| Enterprise AI Controls (Copilot) | `github.com/enterprises/[name]/settings/copilot` | Enterprise → AI controls tab → Copilot |
| Enterprise Billing | `github.com/enterprises/[name]/billing` | Enterprise → Billing and licensing tab |
| Enterprise Audit Log | `github.com/enterprises/[name]/settings/audit-log` | Enterprise → Settings tab → Audit log |
| Enterprise Members | `github.com/enterprises/[name]/people` | Enterprise → People |
| Enterprise Identity Provider | `github.com/enterprises/[name]/settings/identity-provider` | Enterprise → Identity provider tab |
| Org Settings | `github.com/organizations/[name]/settings` | Organization → Settings |
| Org Security | `github.com/organizations/[name]/settings/security` | Organization → Settings → Security |
| Org Copilot | `github.com/organizations/[name]/settings/copilot` | Organization → Settings → Copilot |
| Org Rulesets | `github.com/organizations/[name]/settings/rules` | Organization → Settings → Rules → Rulesets |

## Appendix: Policy Decision Matrix

| Scenario | Repository Visibility | Forking | GHAS | Copilot Public Filter | Actions |
|----------|-----------------------|---------|------|----------------------|---------|
| High-security / Regulated | Private only | Disabled | All features on | Blocked | Selected actions only |
| Standard enterprise | Private + Internal | Internal only | Secret scanning + Dependabot | Blocked | GitHub + verified |
| Inner source focused | Internal default | Internal allowed | All features on | Allowed | All actions |
| Open source program | Public allowed | Allowed | All features on | Allowed | All actions |

## Appendix: Pre-Workshop Checklist

Run through this before the workshop:

- [ ] Verify enterprise owner access
- [ ] Confirm SSO/SAML is configured (or have test config ready)
- [ ] Ensure at least two organizations exist for policy demonstration
- [ ] Have GHAS enabled on at least one organization
- [ ] Confirm Copilot is enabled for at least one org
- [ ] Check audit log has recent entries for demo
- [ ] Verify screen sharing shows GitHub UI clearly
- [ ] Bookmark all demo URLs in a dedicated browser folder
- [ ] Prepare backup screenshots for each demo section
- [ ] Test repo available with CODEOWNERS, rulesets, and branch protection

### Backup Plan

If live demos fail:
1. Use screenshots captured during prep
2. Switch to GitHub Docs walkthrough for the relevant section
3. Engage audience with Q&A while troubleshooting
4. Use the GitHub Enterprise admin documentation as a guided tour

---

*Workshop materials prepared for comprehensive GitHub Enterprise Cloud administration and governance training*
