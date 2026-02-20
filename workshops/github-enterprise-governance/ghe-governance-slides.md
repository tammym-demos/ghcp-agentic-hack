# GitHub Enterprise Administration & Governance

## Slide Deck with Presenter Notes

**Duration**: 3 hours (with breaks)  
**Format**: Presentation + Live Demos (intermixed)  
**Audience**: Enterprise Admins, Org Owners, Security Teams, Engineering Managers  
**Slides**: 76

---

> **Presenter Note**: This deck is designed for a present-then-demo flow. Each section has concept slides followed by a live demo in the GitHub Enterprise admin portal. Look for 🖥️ **SWITCH TO DEMO** markers. Budget ~40% of time on slides, ~40% on demos, ~20% on discussion/Q&A.

---

## Slide 1: Title

# GitHub Enterprise

## Administration & Governance Workshop

*Securing, Scaling, and Governing Your Enterprise Development Platform*

---

> **Presenter Note**: Welcome attendees. "Today we're covering everything you need to govern GitHub Enterprise Cloud end-to-end—identity, policies, security, Copilot, billing, and compliance. This is a practical session. We'll cover concepts then I'll show you exactly where to configure these settings in the admin portal."

---

## Slide 2: About This Session

### What to Expect

- **Format**: Concepts → Live Demo → Discussion (repeat for each section)
- **Hands-on**: We'll navigate the real admin portal together
- **Interactive**: Stop me with questions anytime
- **Practical**: Walk away with actionable governance playbook

### Ground Rules

- Questions welcome throughout
- Screenshots provided as backup reference
- Workshop doc shared after session

---

> **Presenter Note**: Set expectations early. Mention that you'll share the full workshop markdown document after the session so they can reference all the details, URLs, and checklists.

---

## Slide 3: Agenda

### What We'll Cover Today

| Time | Topic |
|------|-------|
| 10 min | [Enterprise Architecture Overview](#section-1-enterprise-architecture-overview) |
| 20 min | [Identity, Authentication & SSO](#section-2-identity-authentication--sso) |
| 15 min | [Enterprise & Org Structure](#section-3-enterprise--organization-structure) |
| 20 min | [Repository Governance & Branch Policies](#section-4-repository-governance--branch-policies) |
| ☕ 10 min | [Break](#slide-34--break) |
| 20 min | [GitHub Advanced Security](#section-5-github-advanced-security-ghas) |
| 20 min | [GitHub Copilot Governance](#section-6-github-copilot-governance) |
| 15 min | [Billing, Licensing & Seats](#section-7-billing-licensing--seat-management) |
| 15 min | [Audit, Compliance & Incident Response](#section-8-audit-compliance--incident-response) |
| 15 min | [Operational Best Practices & Wrap-up](#section-9-operational-best-practices--wrap-up) |

---

> **Presenter Note**: "That's a lot of ground to cover. Each section builds on the last, but they also stand alone—so if one area is particularly relevant to you, let's go deeper there."

---

## Slide 4: The Governance Imperative

### Why Does This Matter?

Without governance:

- 🔓 Inconsistent security controls across teams
- 💸 Wasted licenses and untracked spending
- 📋 Compliance gaps that surface during audits
- 🔀 Configuration drift as teams grow
- 🕳️ Shadow IT when developers work around restrictions

With governance:

- ✅ Consistent security posture everywhere
- ✅ Cost visibility and optimization
- ✅ Audit-ready compliance evidence
- ✅ Predictable, scalable developer experience

---

> **Presenter Note**: "Think about the last time you had a security audit. How long did it take to gather evidence about who has access to what? Enterprise governance makes that a routine report instead of a fire drill."

---

## Slide 5: The Five Pillars of GitHub Enterprise Governance

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│   │ IDENTITY │ │  POLICY  │ │ SECURITY │ │   COST   │   │
│   │          │ │          │ │          │ │          │   │
│   │ SSO/SCIM │ │ Rulesets │ │   GHAS   │ │  Seats   │   │
│   │ 2FA/PATs │ │ Policies │ │ Copilot  │ │ Actions  │   │
│   │ Teams    │ │ Roles    │ │ Scanning │ │ GHAS     │   │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                       │                                   │
│              ┌────────▼────────┐                          │
│              │   COMPLIANCE   │                          │
│              │   Audit + IR   │                          │
│              └─────────────────┘                          │
└───────────────────────────────────────────────────────────┘
```

**Balance all five** for successful enterprise governance

---

> **Presenter Note**: "Everything we cover today fits into one of these five pillars. Identity controls who gets in. Policy controls what they can do. Security catches problems. Cost keeps things sustainable. And Compliance ties it all together with an audit trail."

---

# SECTION 1: Enterprise Architecture Overview

---

## Slide 6: Section Divider — Architecture

# Enterprise Architecture

## Understanding the Foundation

---

> **Presenter Note**: "Before we configure anything, let's make sure we understand the architecture. GitHub Enterprise Cloud has a specific hierarchy that drives everything else."

---

## Slide 7: GitHub Enterprise Cloud Architecture

### The Hierarchy

```
┌─────────────────────────────────────────────────┐
│              ENTERPRISE ACCOUNT                 │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  Identity Provider (SAML/OIDC + SCIM)   │   │
│   │  Enterprise Policies (highest precedence)│   │
│   │  Billing & Licensing (centralized)       │   │
│   │  Audit Log (unified across all orgs)     │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌──────────────┐     ┌──────────────┐         │
│   │  Org: Eng    │     │  Org: Platform│         │
│   │              │     │              │         │
│   │  Teams       │     │  Teams       │         │
│   │  Repos       │     │  Repos       │         │
│   │  Projects    │     │  Projects    │         │
│   └──────────────┘     └──────────────┘         │
└─────────────────────────────────────────────────┘
```

---

> **Presenter Note**: "The enterprise account sits at the top. It owns identity, policies, billing, and audit. Under it you have organizations—think of these as containers for teams and repos. This hierarchy is the backbone of everything we'll configure today."

---

## Slide 8: Enterprise Managed Users (EMU)

### The Strongest Governance Model

| Feature | Standard Enterprise | EMU Enterprise |
|---------|:-------------------:|:--------------:|
| Account creation | Self-signup | IdP-provisioned |
| Identity control | SAML linking | Full lifecycle |
| Username format | User-chosen | `shortcode_handle` |
| Personal repos | ✓ Allowed | ✗ Blocked |
| Outside collaborators | ✓ Allowed | ✗ Restricted |
| SSO enforcement | Org-level | Enterprise-level |
| SCIM provisioning | Optional | **Required** |

---

> **Presenter Note**: "If you're on EMU—and this workshop assumes you are—your enterprise OWNS the user accounts. Users can't fork to personal repos, can't contribute outside the enterprise, and their entire lifecycle is managed by your IdP. This is the gold standard for governance."

---

## Slide 9: EMU — What It Means in Practice

### Enterprise Controls the Entire Lifecycle

```
┌─────────────┐    SCIM    ┌─────────────────┐
│     IdP     │ ─────────► │    GitHub EMU    │
│  (Entra ID) │            │                 │
│             │            │  User created   │
│  Hire ──────┼──────────► │  Seat consumed  │
│  Move ──────┼──────────► │  Team changed   │
│  Term ──────┼──────────► │  Access removed │
└─────────────┘            └─────────────────┘
```

**Key implications**:

- 🔒 Users cannot bypass enterprise policies
- 🔒 No personal forks of enterprise code
- 🔒 Offboarding is automatic via IdP deprovisioning
- 🔒 All access flows through centralized controls

---

> **Presenter Note**: "The single biggest governance advantage of EMU: when someone leaves the company, you deactivate them in your IdP and GitHub access is immediately revoked. No manual cleanup, no orphaned accounts, no lingering access."

---

## Slide 10: Enterprise Top-Level Navigation

### Know Your Admin Portal

The enterprise portal has **top-level tabs** across the top of the page:

| Tab | Icon | What's There |
|-----|------|-------------|
| **Policies** | ⚖️ | Member privileges, Actions, PATs, Code (rulesets) |
| **AI controls** | 🤖 | Copilot, Agents, MCP policies |
| **Settings** | ⚙️ | Audit log, authentication, code security |
| **Billing and licensing** | 💳 | Seats, usage, spending limits |
| **Identity provider** | 🔑 | SSO configuration, SCIM groups |
| **People** | 👥 | Members, outside collaborators |

---

> **Presenter Note**: "This is crucial for our demos. The enterprise UI has these top-level tabs. Notice that Copilot policies are NOT under Policies—they're under AI controls. We'll navigate each of these today."

---

# SECTION 2: Identity, Authentication & SSO

---

## Slide 11: Section Divider — Identity

# Identity & Authentication

## Who Gets In and How

---

> **Presenter Note**: "Identity is the foundation of governance. If you can't control who authenticates and what they can access, nothing else matters."

---

## Slide 12: SAML SSO for EMU

### Enterprise-Wide Single Sign-On

- **Enforced at enterprise level** — all orgs inherit SSO requirement
- **Supported IdPs**: Entra ID (Azure AD), Okta, PingFederate, OneLogin
- **Protocol**: SAML 2.0 or OIDC (with Entra ID)

### SAML Attribute Mapping

| SAML Attribute | → GitHub Field | Required |
|----------------|:--------------:|:--------:|
| `NameID` | Username | ✓ |
| `email` | Email address | ✓ |
| `first_name` | Display name (first) | Recommended |
| `last_name` | Display name (last) | Recommended |

---

> **Presenter Note**: "For EMU, SSO configuration lives under the Identity provider tab—not under Settings or Authentication security. That's a common point of confusion. Let me show you exactly where it is."

---

## Slide 13: SCIM Provisioning

### Automated User Lifecycle

```
        ┌───────────────────────┐
        │   Identity Provider   │
        │   (Entra ID / Okta)   │
        └───────────┬───────────┘
                    │
              SCIM 2.0 API
                    │
        ┌───────────▼───────────┐
        │   GitHub Enterprise   │
        │                       │
        │   ✓ User provisioned  │
        │   ✓ Groups → Teams    │
        │   ✓ Deprovisioning    │
        └───────────────────────┘
```

**For EMU with partner IdPs** (Entra ID, Okta):

- SCIM is configured **entirely in the IdP application**
- Install the "GitHub Enterprise Managed User" app on your IdP
- No SCIM configuration needed in the GitHub UI

---

> **Presenter Note**: "A critical distinction: with EMU and partner IdPs, you don't configure SCIM in GitHub at all. You install the GitHub EMU app in Entra ID or Okta and configure SCIM there. GitHub receives the SCIM events but the configuration is IdP-side."

---

## Slide 14: Team Synchronization

### IdP Groups → GitHub Teams

- Map IdP groups directly to GitHub teams
- Changes in IdP propagate automatically to GitHub
- Eliminates manual team membership management

**Where to configure**:

- **View synced groups**: Enterprise → Identity provider → **Groups**
- **Map team to IdP group**: Organization → Teams → Team → Settings → **Identity Provider Group**

### Why This Matters

- ✅ Single source of truth for team membership
- ✅ Role changes handled automatically
- ✅ New hires get correct team access on day one
- ✅ Departures remove all team memberships instantly

---

> **Presenter Note**: "Team sync is the glue between your org chart and GitHub permissions. When someone moves from the Platform team to the Mobile team in your IdP, their GitHub team membership updates automatically."

---

## Slide 15: Demo Time — Identity

# 🖥️ LIVE DEMO

### SSO & SCIM Configuration

- Enterprise → **Identity provider** tab
- Single sign-on configuration
- IdP groups and team sync
- Organization → Teams → IdP group mapping

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Navigate to Enterprise → Identity provider tab. Show the SSO configuration page, then navigate to the Groups section to show synced IdP groups. Then jump to an org → Teams to show how a team is linked to an IdP group. ~4-5 minutes.

---

## Slide 16: Two-Factor Authentication (2FA)

### Defense in Depth

- **Enterprise policy**: Require 2FA for **all** enterprise members
- **Grace period**: Give users time to comply before locking access
- **Enforcement**: Non-compliant users lose org membership

### Supported Methods

| Method | Security Level | User Experience |
|--------|:--------------:|:---------------:|
| TOTP app (Authenticator) | Good | ⭐⭐⭐ |
| Security key (FIDO2) | Excellent | ⭐⭐ |
| Passkeys | Excellent | ⭐⭐⭐⭐ |
| GitHub Mobile | Good | ⭐⭐⭐⭐ |

**Recommendation**: Require 2FA at the enterprise level; encourage security keys or passkeys for admins

---

> **Presenter Note**: "2FA at the enterprise level is non-negotiable for governance. With EMU, you can also rely on your IdP's MFA—but the GitHub 2FA setting provides defense in depth."

---

## Slide 17: SSH Key & Personal Access Token Governance

### Token Sprawl is a Real Risk

| Control | What It Does | Where |
|---------|:------------:|:-----:|
| **Fine-grained PATs** | Scoped permissions, expiration | Org |
| **Classic PAT restrictions** | Block legacy tokens | Org |
| **PAT approval workflow** | Admin must approve access | Org |
| **SSH certificate authorities** | Centralized SSH key management | Enterprise |
| **IP allow lists** | Restrict access by network | Enterprise, Org |

**Best practice**: Require fine-grained PATs, block classic PATs, require admin approval

---

> **Presenter Note**: "Classic PATs are overly broad—they grant access to everything the user can access. Fine-grained PATs let you limit scope to specific repos and permissions with mandatory expiration dates. We recommend blocking classic PATs entirely."

---

## Slide 18: Demo Time — PAT Policies

# 🖥️ LIVE DEMO

### Personal Access Token Policies

- Enterprise → **Policies** tab → **Personal access tokens**
- Organization → Settings → **Personal access tokens** → Settings
- Fine-grained PAT requirements
- Approval workflow

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Show the enterprise-level PAT policies, then navigate to an org to show the approval workflow and classic PAT restrictions. ~3-4 minutes.

---

# SECTION 3: Enterprise & Organization Structure

---

## Slide 19: Section Divider — Structure

# Enterprise & Org Structure

## Designing for Scale and Governance

---

## Slide 20: Organizational Design Patterns

### Four Common Approaches

| Pattern | Description | Best For |
|---------|-------------|----------|
| 🏢 **Single Org** | All teams in one org | < 500 devs, simple hierarchy |
| 🏗️ **Business Unit Orgs** | Org per BU/division | Large enterprises with autonomy |
| 📦 **Product Line Orgs** | Org per product | Product-centric companies |
| 🌍 **Environment Orgs** | Separate dev/staging/prod | Strict environment isolation |

### Decision Factors

- How autonomous are your business units?
- Do you need separate billing per division?
- What's your compliance boundary?
- How many repos per team?

---

> **Presenter Note**: "Most enterprises start with Business Unit orgs. The key question is: does each BU need different policies? If yes, separate orgs. If everyone follows the same rules, a single org with teams is simpler to govern."

---

## Slide 21: Policy Hierarchy — The Golden Rule

### How Policies Flow Down

```
┌──────────────────────────────────────────────┐
│            ENTERPRISE                        │
│   Sets baseline, can ENFORCE                 │
│   "Enabled" or "Disabled" = locks it down    │
│   "No Policy" = delegates downward           │
└──────────────────┬───────────────────────────┘
                   │ inherits
┌──────────────────▼───────────────────────────┐
│            ORGANIZATION                      │
│   Can customize (only if enterprise allows)  │
│   Shows "Enforced by enterprise" when locked │
└──────────────────┬───────────────────────────┘
                   │ inherits
┌──────────────────▼───────────────────────────┐
│            REPOSITORY                        │
│   Most specific settings                     │
│   Cannot override higher-level enforcement   │
└──────────────────────────────────────────────┘
```

---

> **Presenter Note**: "This hierarchy is the single most important concept in GitHub governance. When you set a policy to Enabled or Disabled at the enterprise level, it's locked—orgs can't override it. 'No Policy' is the delegation mechanism. Use it intentionally."

---

## Slide 22: Enterprise-Level Policies

### What You Can Control from the Top

| Policy | Options | Impact |
|--------|---------|--------|
| Repository visibility | Public / Internal / Private | What types of repos are allowed |
| Repository forking | Allow / Restrict | Can members fork repos |
| Base permissions | None / Read / Write / Admin | Default access for members |
| Repository creation | All members / Admins only | Who can create new repos |
| Outside collaborators | Allow / Restrict | External contributor access |
| Default branch name | Enforce / Per-org | Standardize branch naming |
| Repository deletion | Members / Org owners only | Who can delete repos |
| Deploy keys | Allow / Restrict | SSH deploy key usage |

**Location**: Enterprise → **Policies** tab → **Member privileges**

---

> **Presenter Note**: "These policies live under Enterprise → Policies tab → Member privileges. Notice the pattern: each setting gives you Enforce, Allow, or No Policy. Start restrictive and loosen as needed."

---

## Slide 23: Custom Repository Roles

### Beyond the Built-In Five

**Built-in roles**:

| Role | Key Capability |
|------|---------------|
| **Read** | View code, issues, PRs |
| **Triage** | Manage issues/PRs (no code push) |
| **Write** | Push code, manage issues/PRs |
| **Maintain** | Manage settings (no destructive ops) |
| **Admin** | Full control |

**Custom roles** let you pick specific permissions:

Example: **"Security Auditor"**

- ✓ View secret scanning alerts
- ✓ View code scanning alerts
- ✓ View Dependabot alerts
- ✗ Push code
- ✗ Change settings

---

> **Presenter Note**: "Custom roles are underutilized. They're perfect for security teams who need to see alerts but shouldn't push code, or for team leads who need to manage settings but shouldn't delete repos."

---

## Slide 24: Demo Time — Policies & Roles

# 🖥️ LIVE DEMO

### Enterprise Policies & Custom Roles

- Enterprise → **Policies** tab → **Member privileges**
- Walk through enforce vs. delegate for each policy
- Organization → Settings → **Repository roles**
- Create a custom role

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Navigate to Enterprise → Policies → Member privileges. Walk through 3-4 key policies showing the enforce/delegate options. Then jump to org settings to show custom roles. ~5 minutes.

---

# SECTION 4: Repository Governance & Branch Policies

---

## Slide 25: Section Divider — Repos

# Repository Governance

## Scaling Standards Across Thousands of Repos

---

## Slide 26: Repository Management at Scale

### The Scale Challenge

| Challenge | Without Governance | With Governance |
|-----------|:------------------:|:---------------:|
| Naming | Random repo names | Consistent conventions |
| Structure | Missing README, no templates | Standardized templates |
| Protection | Direct pushes to main | Rulesets enforce reviews |
| Ownership | Nobody knows who owns what | CODEOWNERS files |
| Discoverability | Repos are hard to find | Topics, properties, search |

---

> **Presenter Note**: "If you have 500 repos today, you'll have 2,000 in two years. Without governance, that's 2,000 snowflakes. With it, they're consistent and discoverable."

---

## Slide 27: Repository Templates

### Standardize from Day One

Every new repo should start with:

| File | Purpose |
|------|---------|
| `README.md` | Project overview and setup instructions |
| `CODEOWNERS` | Required reviewers per file path |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist and standards |
| `.github/ISSUE_TEMPLATE/` | Structured issue creation |
| `LICENSE` | Legal compliance |
| `.gitignore` | Language-appropriate ignore rules |
| `.github/workflows/` | CI/CD pipelines pre-configured |
| `.github/copilot-instructions.md` | AI coding standards |

**Create org-level template repositories** → members select when creating new repos

---

> **Presenter Note**: "Template repos are one of the highest-ROI governance investments. Set them up once, and every new repo starts with CODEOWNERS, PR templates, CI pipelines, and Copilot instructions already in place."

---

## Slide 28: Repository Properties

### Metadata-Driven Governance

Tag repositories with custom metadata:

| Property | Example Values | Governance Use |
|----------|---------------|---------------|
| `environment` | production, staging, dev | Different ruleset strictness |
| `compliance-level` | high, medium, low | Target security requirements |
| `team-owner` | platform, mobile, data | Ownership tracking |
| `data-classification` | public, internal, confidential | Data handling controls |

**Why this matters**: Rulesets can target repos by **property**, enabling policy like:

> *"All repos with `compliance-level: high` require signed commits, 2 PR reviewers, and passing security scans before merge."*

---

> **Presenter Note**: "Properties are the bridge between metadata and policy. Instead of configuring each repo individually, you tag your repos and let rulesets apply the right controls automatically."

---

## Slide 29: Rulesets — The Modern Approach

### Branch Protection Rules → Rulesets

| Feature | Branch Protection | Rulesets |
|---------|:-----------------:|:-------:|
| Scope | Single repo | Enterprise / Org / Repo |
| Targeting | Single branch pattern | Branches, tags, properties |
| Stacking | One rule per branch | Multiple rulesets layered |
| Bypass | Limited | Granular bypass lists |
| Evaluate mode | ✗ | ✓ (test without enforcing) |
| Tag protection | ✗ | ✓ |

**Recommendation**: Migrate to rulesets for all new governance

---

> **Presenter Note**: "Rulesets are the evolution of branch protection. The killer feature is scope—you can create ONE ruleset at the enterprise level that applies across all orgs and all repos. No more configuring branch protection repo by repo."

---

## Slide 30: Ruleset Configuration

### Available Rules

| Rule | What It Enforces |
|------|-----------------|
| Require pull request | No direct pushes; require review |
| Required reviewers | Minimum number of approvals |
| Dismiss stale reviews | Re-review after new commits |
| Require status checks | CI must pass before merge |
| Require signed commits | GPG/SSH commit signatures |
| Require linear history | Squash or rebase merges only |
| Block force pushes | Prevent history rewriting |
| Require code scanning | Security scan must pass |

### Enforcement Status

| Status | Behavior |
|--------|---------|
| ✅ **Active** | Rules enforced immediately |
| 📊 **Evaluate** | Rules logged but not enforced (testing mode) |
| ⏸️ **Disabled** | Rules inactive |

---

> **Presenter Note**: "Evaluate mode is your best friend when rolling out rulesets. Turn it on, watch Rule Insights for a week, see what would have been blocked, then flip to Active with confidence."

---

## Slide 31: CODEOWNERS

### Automated Review Assignment

```
# .github/CODEOWNERS

# Default: engineering leads review everything
*                         @org/engineering-leads

# Infrastructure: platform team required
/infrastructure/          @org/platform-team
*.tf                      @org/platform-team

# Security-sensitive code
/auth/                    @org/security-team
**/secrets.*              @org/security-team

# API contracts
/api/                     @org/api-team
openapi.yaml              @org/api-team
```

**Result**: PRs touching these paths **automatically** require review from the specified team

---

> **Presenter Note**: "CODEOWNERS turns review requirements into code. Check it into your repo, and GitHub enforces it automatically. Combined with rulesets requiring code owner review, this gives you foolproof review coverage."

---

## Slide 32: Demo Time — Rulesets

# 🖥️ LIVE DEMO

### Rulesets & Repository Governance

- Enterprise → **Policies** tab → **Code** → New ruleset
- Configure rules, bypass lists, targeting
- Show Evaluate vs. Active enforcement
- Repository → CODEOWNERS → PR review flow

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Navigate to Enterprise → Policies → Code. Create a ruleset targeting main branch, add PR review and status check rules. Show the Evaluate option. Then open a repo with CODEOWNERS and show how a PR triggers required reviews. ~6 minutes.

---

## Slide 33: Inner Source & Visibility

### The Visibility Spectrum

| Visibility | Who Can See | Use Case |
|:----------:|:-----------:|:--------:|
| 🔒 **Private** | Explicit collaborators | Confidential projects |
| 🏢 **Internal** | All enterprise members | Inner source, shared libraries |
| 🌍 **Public** | Everyone on internet | Open source projects |

### Inner Source Best Practice

- Default to **Internal** for cross-team collaboration
- Require `CONTRIBUTING.md` in inner source repos
- Use topics and descriptions for discoverability
- Encourage cross-team PRs with low-friction contribution guides

---

> **Presenter Note**: "Internal visibility is one of EMU's best features. It enables inner source—anyone in the enterprise can find, read, and contribute to repos—without exposing anything externally."

---

## Slide 34: ☕ Break

# ☕ Break — 10 Minutes

### When We Return: GitHub Advanced Security

---

> **Presenter Note**: "Take 10 minutes. When we come back, we'll dive into GitHub Advanced Security—secret scanning, code scanning, and Dependabot."

---

# SECTION 5: GitHub Advanced Security (GHAS)

---

## Slide 35: Section Divider — Security

# GitHub Advanced Security

## Finding and Fixing Vulnerabilities

---

## Slide 36: GHAS at a Glance

### Three Pillars of Code Security

```
┌────────────────────────────────────────────────────────┐
│               GitHub Advanced Security                 │
├─────────────────┬─────────────────┬────────────────────┤
│   SECRET        │   CODE          │   DEPENDENCY       │
│   SCANNING      │   SCANNING      │   MANAGEMENT       │
│                 │                 │                    │
│  200+ patterns  │  CodeQL engine  │  Dependabot alerts │
│  Custom regex   │  Custom queries │  Security updates  │
│  Push protect   │  Default setup  │  Version updates   │
│  Validity check │  Merge blocking │  License review    │
└─────────────────┴─────────────────┴────────────────────┘
```

**Free for public repos** • **GHAS license required for private repos**

---

> **Presenter Note**: "GHAS gives you three security capabilities. Secret scanning catches leaked credentials. Code scanning finds bugs and vulnerabilities in your code. Dependabot catches vulnerable dependencies. Together, they cover your entire supply chain."

---

## Slide 37: Secret Scanning

### Catching Leaked Credentials

| Feature | What It Does |
|---------|:-------------|
| **200+ partner patterns** | Detects AWS keys, Azure tokens, Slack webhooks, etc. |
| **Custom patterns** | Your own regex for internal secret formats |
| **Push protection** | Blocks commits containing secrets BEFORE push |
| **Validity checks** | Confirms if a detected secret is still active |
| **Non-provider patterns** | Generic high-entropy string detection |

---

> **Presenter Note**: "Secret scanning is the most immediately impactful GHAS feature. It's catching real credential leaks every day—API keys, database passwords, tokens that developers accidentally committed."

---

## Slide 38: Push Protection — The Game Changer

### Block Secrets Before They Land

```
Developer pushes code
        │
        ▼
GitHub scans commit for secrets
        │
   ┌────┴────┐
   │ Secret  │
   │ found?  │
   └────┬────┘
    Yes │        No
        ▼         ▼
  ┌──────────┐  ┌──────────┐
  │ BLOCKED  │  │ ACCEPTED │
  │          │  │          │
  │ Developer│  │ Push     │
  │ notified │  │ succeeds │
  │ + fix    │  │          │
  └──────────┘  └──────────┘
```

**Push protection prevents the incident** rather than alerting after the fact

---

> **Presenter Note**: "Without push protection, you detect the secret after it's in the repo—now you need to rotate it. WITH push protection, the developer gets blocked before the secret ever lands. It's preventive rather than reactive. This is one of the top features I recommend enabling on day one."

---

## Slide 39: Code Scanning with CodeQL

### Semantic Security Analysis

- **CodeQL**: GitHub's proprietary semantic analysis engine
- **How it works**: Treats code as data, runs queries to find vulnerability patterns
- **Languages**: JavaScript, TypeScript, Python, Java, C/C++, C#, Go, Ruby, Swift, Kotlin

### Default Setup vs. Advanced

| Setup | Config Required | Best For |
|:-----:|:---------------:|:--------:|
| **Default** | Zero — auto-configured | Enablement at scale |
| **Advanced** | Custom workflow YAML | Custom queries, tuning |

### Merge Protection

- Block PRs that introduce **new** security alerts
- Configure severity thresholds (block Critical/High, warn on Medium)

---

> **Presenter Note**: "Default setup is the way to go for most repos—it auto-configures CodeQL with no workflow file needed. For repos with specific needs, advanced setup gives you full control."

---

## Slide 40: Dependabot

### Automated Dependency Management

| Feature | Trigger | Output |
|---------|:-------:|:------:|
| **Dependabot Alerts** | Known CVE in dependency | Notification + advisory |
| **Security Updates** | Vulnerable dependency detected | Auto-PR with fix |
| **Version Updates** | Newer version available | Auto-PR with upgrade |

### Configuration

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
    open-pull-requests-limit: 10
```

---

> **Presenter Note**: "Dependabot alerts are free for all repos. Security updates auto-create PRs to fix vulnerable dependencies—that's the one to enable. Version updates keep everything current but can be noisy; configure limits."

---

## Slide 41: Security Overview Dashboard

### Single Pane of Glass

**Location**: Organization → **Security** tab → Overview

| View | What You See |
|------|:-------------|
| **Risk** | Alert counts by severity across all repos |
| **Coverage** | Which repos have security features enabled |
| **CodeQL** | Code scanning alert trends |
| **Secrets** | Active secret scanning alerts |
| **Dependabot** | Vulnerable dependency alerts |

**Why this matters**: Compliance teams need a single dashboard to assess security posture

---

> **Presenter Note**: "The Security Overview is where your security team lives. Risk view shows you where the fires are. Coverage view shows you where you have blind spots. This is your compliance evidence for audits."

---

## Slide 42: Security Configurations — Enablement at Scale

### The New Way to Enable GHAS

**Location**: Organization → Settings → **Security configurations**

| Approach | How |
|----------|:------|
| **GitHub recommended** | Pre-built preset — enables everything with best-practice defaults |
| **Custom configuration** | Pick which features to enable, create your own preset |
| **Apply to repos** | Select repos or auto-apply to new repos |

**This replaces** the manual "Code security and analysis" settings page for enablement at scale

---

> **Presenter Note**: "Security configurations are the modern way to enable GHAS. Instead of toggling settings repo by repo, you create a preset and apply it across repos with one click. The GitHub-recommended preset is a great starting point."

---

## Slide 43: Demo Time — GHAS

# 🖥️ LIVE DEMO

### GitHub Advanced Security

- Organization → Settings → **Security configurations**
- Show GitHub-recommended preset
- Organization → **Security** tab → Overview
- Secret scanning alerts and push protection
- Code scanning alert walkthrough

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Start with Security configurations to show the preset. Then navigate to the Security tab to show the overview dashboard. Click into a secret scanning alert and a code scanning alert to show the detail views. ~6-7 minutes.

---

# SECTION 6: GitHub Copilot Governance

---

## Slide 44: Section Divider — Copilot

# GitHub Copilot Governance

## AI-Assisted Development at Enterprise Scale

---

## Slide 45: Why Copilot Governance is Different

### AI Tools Require Ongoing Governance

Traditional developer tools:

- Install → Configure → Done

AI coding assistants:

- **Data flows** through external services continuously
- **Code context** is analyzed in real-time
- **Suggestions** may reflect training data patterns
- **Adoption** varies without enablement and training

---

> **Presenter Note**: "Copilot isn't just another VS Code extension. It's processing your code context continuously to generate suggestions. That data flow is why we need specific governance controls—on top of the general enterprise governance we've already covered."

---

## Slide 46: Copilot Enterprise vs. Business

### Why Enterprise for Governance?

| Capability | Business | Enterprise |
|:-----------|:--------:|:----------:|
| Code completions | ✓ | ✓ |
| Chat in IDE | ✓ | ✓ |
| CLI integration | ✓ | ✓ |
| Chat on github.com (PR summaries) | ✗ | ✓ |
| **Knowledge bases** | ✗ | ✓ |
| **Enterprise-level policies** | ✗ | ✓ |
| **Content exclusions (enterprise)** | ✗ | ✓ |

---

> **Presenter Note**: "Enterprise gives you the full governance toolkit. The key differentiators are enterprise-level policy enforcement, knowledge bases for your internal docs, and integration with your EMU identity setup."

---

## Slide 47: Copilot Security Guarantees

### What Enterprises Need to Know

| Question | Answer |
|----------|--------|
| Is my code used to train AI models? | **No** — Enterprise guarantee |
| Are my prompts retained? | **No** — processed, not stored |
| Can Copilot access repos I can't? | **No** — respects user permissions |
| Where is data processed? | Microsoft/GitHub infrastructure |
| What metadata is collected? | Usage analytics only |

### The #1 Question from Security Teams

> *"Is our proprietary code being used to train GitHub's AI models?"*

**Answer**: Definitively no. Enterprise code and prompts are processed for suggestion generation only, not retained for model training.

---

> **Presenter Note**: "Lead with this slide when talking to security teams. The training guarantee is the most important promise GitHub makes for Enterprise customers."

---

## Slide 48: Content Exclusions

### Protecting Sensitive Code

**What it does**: Prevents Copilot from reading or suggesting code from specific paths

**Use cases**:

- Proprietary algorithms
- Security implementations (crypto, auth)
- Compliance-restricted content
- Third-party licensed code

**Configuration**: Organization → Settings → Copilot → **Content exclusion**

Example exclusion patterns:

```
**/secrets/**         → Any secrets folder
**/*.env              → All .env files
**/internal-api/**    → Internal API code
src/crypto/**         → Cryptography implementations
**/vendor/**          → Third-party code
```

**Enforcement is immediate and automatic** — developers don't need to do anything

---

> **Presenter Note**: "Content exclusions are your scalpel. Think about what your security team would never want analyzed by an external service—crypto implementations, proprietary algorithms, anything with secrets. Exclude those paths."

---

## Slide 49: Public Code Filter

### IP Protection Layer

| Setting | What Happens | Trade-off |
|:-------:|:-------------|:----------|
| **Blocked** | Suggestions checked against public code index; matches filtered out | Fewer suggestions, more IP safety |
| **Allowed** | All suggestions shown; developer judgment required | More suggestions, some risk |

**When to block**:

- Regulated industries (finance, healthcare, defense)
- Code with licensing concerns
- When legal/compliance requires it

**When to allow**:

- Internal tools and prototypes
- Open source teams
- When developer velocity is the priority

---

> **Presenter Note**: "This is your insurance policy against accidentally including GPL or other licensed code in your codebase. When blocked, there's ~100ms added latency, but it significantly reduces IP risk."

---

## Slide 50: Copilot Policies — AI Controls Tab

### Where Copilot Policies Live Now

**Location**: Enterprise → **AI controls** tab (🤖 icon) → **Copilot** (sidebar)

| Policy | Options | Scope |
|--------|---------|:-----:|
| Copilot in IDE | Enabled / Disabled / No Policy | Enterprise, Org |
| Copilot Chat | Enabled / Disabled / No Policy | Enterprise, Org |
| Copilot in CLI | Enabled / Disabled / No Policy | Enterprise, Org |
| Knowledge Bases | Enabled / Disabled | Enterprise |
| Public code filter | Allow / Block | Enterprise, Org |

⚠️ **Note**: Also under AI controls: **Agents** policies and **MCP** policies

---

> **Presenter Note**: "Critical navigation change: Copilot policies are NOT under the Policies tab. They're under AI controls—a separate top-level tab with its own icon. This is also where you manage agent and MCP policies."

---

## Slide 51: Custom Instructions

### Org-Wide Coding Standards for AI

Create `.github/copilot-instructions.md` in your org's `.github` repo:

```markdown
# Copilot Instructions

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

**Result**: Copilot incorporates these into **every** suggestion for your org

---

> **Presenter Note**: "Custom instructions are often overlooked but incredibly powerful. That markdown file becomes invisible context for every Copilot interaction. It's like having a senior engineer reviewing every suggestion before it reaches the developer."

---

## Slide 52: Demo Time — Copilot Governance

# 🖥️ LIVE DEMO

### Copilot Governance

- Enterprise → **AI controls** tab → **Copilot**
- Policy settings and enforcement
- Content exclusions at org level
- Usage analytics dashboard

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Navigate to Enterprise → AI controls → Copilot. Walk through each policy. Then navigate to an org's Copilot settings to show content exclusions and usage analytics. ~5-6 minutes.

---

# SECTION 7: Billing, Licensing & Seat Management

---

## Slide 53: Section Divider — Billing

# Billing & Licensing

## Managing Costs at Enterprise Scale

---

## Slide 54: GitHub Enterprise Product Licensing

### What You're Paying For

| Product | Model | Included |
|---------|:-----:|:--------:|
| **Enterprise Cloud** | Per user/month | ✓ Base |
| **Advanced Security (GHAS)** | Per unique committer | Add-on |
| **Copilot Business** | Per assigned seat | Add-on |
| **Copilot Enterprise** | Per assigned seat | Add-on |
| **Actions** | Minutes + storage | Included + overage |
| **Packages** | Storage + transfer | Included + overage |
| **Large File Storage** | Storage + bandwidth | Add-on |

---

> **Presenter Note**: "Understand the billing model: Enterprise Cloud is per-user. GHAS is per unique committer—only people who actually push code to GHAS-enabled repos. Copilot is per assigned seat. Actions charges for minutes and storage over your included allocation."

---

## Slide 55: Actions Minutes — Know the Multipliers

### Not All Minutes Are Equal

| Runner OS | Minute Multiplier | 1,000 actual minutes = |
|:---------:|:-----------------:|:---------------------:|
| 🐧 Linux | 1× | 1,000 billed minutes |
| 🪟 Windows | 2× | 2,000 billed minutes |
| 🍎 macOS | **10×** | **10,000 billed minutes** |

**Included with Enterprise Cloud**: 50,000 minutes/month, 50 GB storage

### Cost Control

- Set spending limits at enterprise and org levels
- Configure alerts at spending thresholds
- Optimize workflows: cache dependencies, minimize macOS usage
- Consider self-hosted runners for heavy workloads

---

> **Presenter Note**: "The macOS multiplier catches people off guard. If you're building iOS apps, 10x means your 50,000 included minutes are really only 5,000 minutes of macOS runner time. That's where self-hosted runners or larger runners pay for themselves."

---

## Slide 56: Cost Optimization Strategies

### Where to Find Savings

| Strategy | Action | Expected Impact |
|----------|--------|:--------------:|
| **Seat audit** | Remove 60+ day inactive users | 5-15% savings |
| **SCIM deprovisioning** | Auto-remove on IdP disable | Prevents orphan seats |
| **Copilot seat review** | Reassign underutilized seats | 10-20% savings |
| **Actions optimization** | Cache deps, optimize workflows | Reduce overage |
| **GHAS right-sizing** | Analyze actual committer count | Right-size license |

### Copilot Seat Management

**Location**: Enterprise → **Billing and licensing** → **Licensing** → Copilot → **Manage**

Track: Active users vs. assigned seats → Target >80% utilization

---

> **Presenter Note**: "Run a seat audit quarterly. If someone has a Copilot seat but hasn't used it in 30 days, either train them or reassign the seat. With SCIM, deprovisioning is automatic—but you still need to audit for people who have access but aren't using it."

---

## Slide 57: Demo Time — Billing

# 🖥️ LIVE DEMO

### Billing & Seat Management

- Enterprise → **Billing and licensing** tab
- Seat counts by product
- Actions minutes usage
- Copilot seat management via Licensing

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Navigate to Enterprise → Billing and licensing. Show the seat counts, Actions minutes, and storage. Click into Licensing to show Copilot seat management. ~4 minutes.

---

# SECTION 8: Audit, Compliance & Incident Response

---

## Slide 58: Section Divider — Compliance

# Audit & Compliance

## Evidence, Accountability, Incident Response

---

## Slide 59: Enterprise Audit Log

### Everything is Tracked

| Category | Events Captured |
|----------|:---------------|
| `org` | Member added/removed, settings changed |
| `repo` | Created, deleted, visibility changed, archived |
| `team` | Created, deleted, members changed |
| `copilot` | Policy changed, seats assigned/removed |
| `secret_scanning` | Alerts created, resolved |
| `code_scanning` | Alerts created, dismissed |
| `protected_branch` | Branch protection modified |
| `business` | Enterprise settings changed |

**Location**: Enterprise → **Settings** tab → **Audit log**

---

> **Presenter Note**: "The audit log captures every governance-relevant action with who, what, and when. This is your compliance evidence. For SOC 2, GDPR, or internal audits, you need to prove who changed what and when."

---

## Slide 60: Audit Log Search

### Powerful Query Syntax

```
# Who added a member to an org?
action:org.add_member

# What did a specific admin do?
actor:admin-username

# What changed in the last month?
created:2026-01-01..2026-02-01

# Copilot policy changes?
action:copilot.policy_update

# Combined: repo deletions by specific user after a date
action:repo.destroy actor:admin-user created:>2026-01-15
```

**Export**: JSON or CSV for SIEM integration

---

> **Presenter Note**: "The search syntax is powerful. You can filter by action, actor, date range, and more. For compliance reporting, export to CSV and feed it into your compliance tools."

---

## Slide 61: Audit Log Streaming

### Real-Time Event Streaming to Your SIEM

| Destination | Integration Method |
|:-----------:|:-------------------|
| Amazon S3 | S3 bucket |
| Azure Blob Storage | Blob container |
| Azure Event Hubs | Real-time streaming |
| Google Cloud Storage | GCS bucket |
| Datadog | Direct integration |
| Splunk | HTTP Event Collector |

**Why stream?**

- Longer retention than GitHub's default
- Correlation with other security events
- Automated alerting on suspicious activity
- Compliance requirement for many frameworks

---

> **Presenter Note**: "Streaming is critical for compliance. GitHub retains audit logs for a limited period. By streaming to S3 or Splunk, you get unlimited retention and can correlate GitHub events with other security signals."

---

## Slide 62: Compliance Certifications

### GitHub Enterprise Cloud

| Certification | Status |
|:-------------:|:------:|
| SOC 1 Type II | ✅ |
| SOC 2 Type II | ✅ |
| SOC 3 | ✅ |
| ISO 27001 | ✅ |
| ISO 27018 | ✅ |
| GDPR | ✅ |
| FedRAMP | ✅ (via Azure Gov) |
| CSA STAR | ✅ |

**Copilot Enterprise**: Code not used for training, SOC 2 compliant

---

> **Presenter Note**: "When your compliance team asks 'What certifications does GitHub have?'—this is the answer. SOC 2 Type II is the one most auditors ask about first."

---

## Slide 63: Incident Response Framework

### When Something Goes Wrong

```
1. DETECT         Audit alerts, secret scanning, SIEM
        │
2. CONTAIN        Disable user/token via IdP, revoke PATs,
        │         lock repos
        │
3. INVESTIGATE    Audit log review, git history analysis,
        │         scope assessment
        │
4. REMEDIATE      Rotate credentials, patch code,
        │         update dependencies
        │
5. RECOVER        Re-enable services, update policies,
                  blameless postmortem
```

**Emergency kill switch**: Disable user at IdP level → all GitHub access revoked immediately (EMU advantage)

---

> **Presenter Note**: "With EMU, your fastest containment action is disabling the user in your IdP. That instantly revokes all GitHub access—no need to manually remove them from orgs, teams, or repos."

---

## Slide 64: Demo Time — Audit

# 🖥️ LIVE DEMO

### Audit Log & Compliance

- Enterprise → **Settings** tab → **Audit log**
- Search syntax and filters
- Event details
- Log streaming configuration

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO**. Navigate to Enterprise → Settings → Audit log. Run a few searches (action:copilot, action:org.add_member). Click into an event to show details. Show the log streaming configuration page. ~4-5 minutes.

---

# SECTION 9: Operational Best Practices & Wrap-up

---

## Slide 65: Section Divider — Operations

# Operational Best Practices

## Making Governance Sustainable

---

## Slide 66: Role-Based Administration

### Who Manages What

| Role | Scope | Count |
|------|:-----:|:-----:|
| 🔴 **Enterprise Owner** | All orgs, policies, billing | 2-3 people max |
| 🟠 **Org Owner** | Single org policies, teams | Per org |
| 🟡 **Security Manager** | Security alerts, audit (no code) | Security team |
| 🟢 **Billing Manager** | Usage reports, spending | Finance liaison |
| 🔵 **Team Maintainer** | Team membership, repo access | Per team |

⚠️ **Limit Enterprise Owners** to 2-3 people — they have maximum power

---

> **Presenter Note**: "The Security Manager role is underused. It gives your security team visibility into all security alerts across the org without code access. That's exactly the separation of duties auditors want to see."

---

## Slide 67: Actions Governance

### Controlling What Runs in Your Pipelines

| Policy | Recommendation |
|--------|:--------------|
| **Allowed actions** | GitHub-authored + verified marketplace only |
| **Workflow permissions** | Read-only (least privilege) |
| **Fork PR policies** | Require approval for first-time contributors |
| **Self-hosted runners** | Enterprise-managed runner groups |

### Runner Groups for Governance

```
"production-runners"        "general-runners"
├── Restricted to: prod-org ├── Available to: all orgs
├── Workflows: deploy.yml   ├── Workflows: any
└── Labels: production       └── Labels: general
```

---

> **Presenter Note**: "Actions governance is often overlooked. Unrestricted Actions usage means anyone could run arbitrary code in your CI/CD. Limit to GitHub-authored and verified marketplace actions, and use runner groups to isolate production workloads."

---

## Slide 68: Governance Operating Cadence

### Embed Governance into Your Routine

| Cadence | Task | Owner |
|:-------:|------|:-----:|
| **Weekly** | Security alert triage | Security Manager |
| **Weekly** | Dependabot PR review | Engineering Leads |
| **Weekly** | Audit log review | Security Manager |
| **Monthly** | Seat audit / deprovisioning | Enterprise Admin |
| **Monthly** | Copilot usage analysis | Engineering Manager |
| **Quarterly** | Policy configuration review | Enterprise Owner |
| **Quarterly** | Compliance evidence collection | Compliance Team |
| **Quarterly** | Seat utilization audit | Enterprise Admin |

---

> **Presenter Note**: "Governance isn't a one-time project—it's an operating cadence. Put these tasks on real calendars with real owners. The quarterly reviews are especially important: audit your policies, validate your SCIM config, and review your seat utilization."

---

## Slide 69: Phased Rollout Strategy

### Don't Boil the Ocean

```
Phase 1: FOUNDATION (Weeks 1-4)
├── SSO/SAML + SCIM provisioning
├── 2FA enforcement
├── Enterprise repository policies
├── Audit log streaming
└── Org structure defined

Phase 2: SECURITY (Weeks 5-8)
├── Secret scanning + push protection
├── Code scanning (default setup)
├── Dependabot alerts + security updates
├── Rulesets for branch governance
└── Security alert triage process

Phase 3: PRODUCTIVITY (Weeks 9-12)
├── Copilot pilot teams
├── Content exclusions
├── Copilot policies
├── Custom instructions
└── Usage metrics baseline

Phase 4: OPTIMIZATION (Ongoing)
├── Seat audits
├── Coverage expansion
├── Policy refinement
└── Quarterly reviews
```

---

> **Presenter Note**: "Four phases. Foundation first—identity and policies must be in place before anything else. Security next—get GHAS running and alert processes established. Then Copilot with pilot teams. Only then do you optimize. Resist the urge to do everything at once."

---

## Slide 70: Common Pitfalls

### What Goes Wrong

| Pitfall | Consequence | Prevention |
|---------|:-----------:|:-----------|
| No training | Low Copilot adoption | Enablement sessions |
| Too restrictive | Developer frustration | Start moderate, tighten if needed |
| No metrics | Can't prove ROI | Track from day one |
| No ownership | Policy drift | Assign governance owner |
| Manual processes | Steps missed | SCIM + automation |
| Ignoring alerts | Vulnerability backlog | Weekly triage cadence |

---

> **Presenter Note**: "The most common pitfall I see is deploying everything without training. Developers get access to Copilot but don't know how to use it effectively. Adoption stalls. Leadership questions the investment. Invest in enablement."

---

## Slide 71: Success Factors

### What High-Performing Enterprises Do

✅ **Executive sponsorship** — Visible support from leadership

✅ **Clear policies** — Documented, communicated, enforced consistently

✅ **Training investment** — Not just access, but enablement

✅ **Feedback loops** — Regular check-ins with teams

✅ **Metrics discipline** — Track and report adoption, security, ROI

✅ **Designated governance owner** — Someone is accountable

✅ **Quarterly reviews** — Policies evolve with the organization

---

> **Presenter Note**: "If I had to pick one: designate a governance owner. Someone who is accountable for reviewing policies quarterly, running seat audits, and making sure the operating cadence is actually happening."

---

## Slide 72: Internal FAQ

### Questions Your Teams Will Ask

| Question | Answer |
|----------|--------|
| "Is my code training AI?" | No — Enterprise Copilot guarantee |
| "Why can't I create public repos?" | Enterprise IP protection policy |
| "How do I get Copilot access?" | Request through [internal portal] |
| "What certifications does GitHub have?" | SOC 2, ISO 27001, GDPR, FedRAMP |
| "Can I see my team's usage data?" | Yes — org-level analytics available |
| "What happens when I leave?" | IdP deprovisioning removes all access |

---

> **Presenter Note**: "Prepare answers to these questions before you roll out. Proactive communication prevents a flood of support tickets and builds trust with your development teams."

---

## Slide 73: Your Action Items

### What to Do After This Workshop

- [ ] Audit current enterprise configuration against best practices
- [ ] Validate SSO/SCIM provisioning is complete and accurate
- [ ] Review and update enterprise and org-level policies
- [ ] Enable GHAS features (secret scanning, code scanning, Dependabot)
- [ ] Configure audit log streaming to your SIEM
- [ ] Define content exclusion requirements for Copilot
- [ ] Establish seat utilization review cadence
- [ ] Create internal governance policy document
- [ ] Set up quarterly governance review calendar
- [ ] Schedule follow-up session for Q&A

---

> **Presenter Note**: "These are your homework items. Prioritize them in this order—identity and policies first, then security, then Copilot, then operational processes. I'm happy to schedule a follow-up after you've completed the initial configuration review."

---

## Slide 74: Resources

### Learn More

| Resource | Link |
|----------|------|
| GitHub Enterprise Docs | docs.github.com/en/enterprise-cloud@latest |
| GitHub Advanced Security | docs.github.com/en/code-security |
| GitHub Copilot Docs | docs.github.com/en/copilot |
| GitHub Trust Center | resources.github.com/security/ |
| GitHub Skills | skills.github.com |
| GitHub Changelog | github.blog/changelog/ |
| GitHub Status | githubstatus.com |

---

> **Presenter Note**: "The Trust Center is particularly useful for security and compliance reviews. It has all the certifications, data handling documentation, and privacy details your security team will want."

---

## Slide 75: Q&A

# Questions?

### Topics We Can Dig Into

- Migration from other platforms (GitLab, Bitbucket, Azure DevOps)
- Enterprise Server vs. Cloud trade-offs
- FedRAMP and government compliance
- Self-hosted vs. GitHub-hosted runners
- Monorepo and large repo handling
- Inner source program design
- Copilot ROI and adoption metrics
- API rate limits and automation

---

> **Presenter Note**: Leave 5-10 minutes for Q&A. Have the admin portal open in your browser in case questions require showing specific settings. If no questions initially, pick one of the topics and offer to go deeper.

---

## Slide 76: Thank You

# Thank You

**Workshop document**: Will be shared with full details, checklists, and URLs

**Follow-up**: Happy to schedule a deeper dive session on any topic

**Contact**: [Your contact info]

---

> **Presenter Note**: Thank attendees, remind them the full workshop markdown doc will be shared, and offer follow-up support. Close the call.

---

# Appendix: Presenter Reference

---

## Demo Timing Guide

| After Slide | Demo Topic | Duration |
|:-----------:|:-----------|:--------:|
| 15 | SSO, SCIM & Team Sync | 4-5 min |
| 18 | PAT Policies | 3-4 min |
| 24 | Enterprise Policies & Custom Roles | 5 min |
| 32 | Rulesets & CODEOWNERS | 6 min |
| 43 | GHAS: Security Configs, Secret & Code Scanning | 6-7 min |
| 52 | Copilot: AI Controls, Content Exclusions, Usage | 5-6 min |
| 57 | Billing & Seat Management | 4 min |
| 64 | Audit Log & Streaming | 4-5 min |

**Total demo time**: ~38-42 minutes  
**Total slide time**: ~90-100 minutes  
**Break**: 10 minutes  
**Q&A / buffer**: ~15-20 minutes  
**Grand total**: ~3 hours

---

## Key Navigation Cheat Sheet

Keep these tabs open in your browser:

```
Enterprise top-level tabs:
┌──────────────────────────────────────────────────────┐
│ Policies │ AI controls │ Settings │ Billing │ IdP    │
└──────────────────────────────────────────────────────┘

Demo 1 — Identity:
  Enterprise → Identity provider tab → SSO configuration
  Enterprise → Identity provider tab → Groups
  Organization → Teams → [team] → Settings → IdP group

Demo 2 — PATs:
  Enterprise → Policies tab → Personal access tokens
  Organization → Settings → Personal access tokens → Settings

Demo 3 — Policies & Roles:
  Enterprise → Policies tab → Member privileges
  Organization → Settings → Access → Repository roles

Demo 4 — Rulesets:  
  Enterprise → Policies tab → Code → New ruleset
  Repository → Settings → Rules → Rulesets

Demo 5 — GHAS:
  Organization → Settings → Security configurations
  Organization → Security tab → Overview

Demo 6 — Copilot:
  Enterprise → AI controls tab → Copilot (sidebar)
  Organization → Settings → Copilot → Content exclusion

Demo 7 — Billing:
  Enterprise → Billing and licensing tab
  Enterprise → Billing and licensing → Licensing → Copilot → Manage

Demo 8 — Audit:
  Enterprise → Settings tab → Audit log
  Enterprise → Settings tab → Audit log → Log streaming
```

---

## Pre-Demo Checklist

Run through this before the workshop:

- [ ] Verify enterprise owner access works
- [ ] Confirm SSO/SAML is configured (or have test config ready)
- [ ] Ensure at least two organizations exist for policy demos
- [ ] Have GHAS enabled on at least one org
- [ ] Confirm Copilot enabled for at least one org
- [ ] Check audit log has recent entries
- [ ] Test repo available with CODEOWNERS, rulesets, and branch protection
- [ ] Screen sharing shows GitHub UI clearly (zoom level)
- [ ] Bookmark all demo URLs in a dedicated browser folder
- [ ] Prepare backup screenshots for each demo section
- [ ] Have the full workshop markdown document ready to share

---

## Backup Plan

If live demos fail:

1. Use screenshots captured during prep
2. Switch to GitHub Docs walkthrough for the section
3. Engage audience with Q&A and discussion while troubleshooting
4. Share screen of the workshop markdown document with URLs highlighted
5. Use the GitHub Enterprise admin documentation as a guided tour

---

## Slide Count Summary

| Section | Slides | Demos |
|---------|:------:|:-----:|
| Title + Agenda + Framing | 1-5 | — |
| Architecture Overview | 6-10 | — |
| Identity & SSO | 11-18 | 2 demos |
| Enterprise & Org Structure | 19-24 | 1 demo |
| Repository Governance | 25-33 | 1 demo |
| Break | 34 | — |
| GHAS | 35-43 | 1 demo |
| Copilot Governance | 44-52 | 1 demo |
| Billing & Licensing | 53-57 | 1 demo |
| Audit & Compliance | 58-64 | 1 demo |
| Best Practices & Wrap-up | 65-76 | — |
| **Total** | **76 slides** | **8 demos** |

---

*Slide deck for GitHub Enterprise Cloud Administration & Governance Workshop*
