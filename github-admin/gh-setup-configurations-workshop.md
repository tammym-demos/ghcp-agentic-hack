# GitHub Setup Configurations & Architecture Patterns — Workshop Guide

## Workshop Overview

This workshop explores the different ways to set up, configure, and integrate GitHub for enterprise use. We cover three base architecture patterns — from all-cloud EMU to multi-org to hybrid on-prem — provide a decision framework to choose the right topology, and then explore Azure DevOps integration as an add-on layer for organizations with existing ADO investments.

**Duration**: 1.5–2 hours  
**Format**: Presentation + Discussion + Architecture Diagrams  
**Audience**: Enterprise Admins, IT Decision Makers, Engineering Managers, Tech Leads  
**Focus**: GitHub Architecture Patterns, Deployment Topologies & Integration Strategies  

### Learning Objectives

By the end of this workshop, participants will be able to:

- Describe the three base GitHub architecture patterns and their trade-offs
- Evaluate pros, cons, and requirements for each pattern using structured comparison criteria
- Map their organization's constraints to the most appropriate base architecture pattern
- Understand GitHub Enterprise Managed Users (EMU) and when to use it
- Explain GitHub Connect and the mixed cloud + on-prem topology
- Understand when and how to layer Azure DevOps integration on top of a base GitHub architecture
- Use a decision framework to recommend an architecture to stakeholders

---

## Session Agenda

| # | Section | Time | Focus |
|---|---------|------|-------|
| 1 | GitHub Platform Overview | 10 min | Product landscape, EMU vs. standard, decision tree |
| 2 | Scenario 1: GitHub EMU Only | 20 min | Architecture, identity lifecycle, pros/cons/requirements |
| 3 | Scenario 2: GitHub Enterprise Multi-Org | 20 min | Architecture, org strategies, policy inheritance |
| 4 | Scenario 3: Mixed Cloud + On-Prem (GHES) | 20 min | Architecture, GitHub Connect, data residency |
| 5 | ☕ Break | 10 min | |
| 6 | Architecture Decision Framework | 15 min | Master comparison matrix, decision flowchart |
| 7 | Integration Add-On: GitHub + Azure DevOps | 20 min | ADO as a layer, AB# linking, "what goes where" |
| 8 | Q&A & Discussion | 15 min | Open discussion, organization-specific questions |

---

## Prerequisites

| Prerequisite | Description |
|--------------|-------------|
| **Basic GitHub familiarity** | Understanding of repos, orgs, PRs, and Actions at a conceptual level |
| **Enterprise context** | Some awareness of your organization's identity provider, compliance requirements, and existing toolchain |
| **No hands-on setup required** | This is a presentation + discussion workshop — no live configuration needed |

---

## 1. GitHub Platform Overview (10 min)

### GitHub Product Tiers

GitHub offers multiple product tiers, each designed for different organizational sizes and requirements:

| Tier | Target | Hosting | Identity Model | Key Features |
|------|--------|---------|----------------|--------------|
| **GitHub Free** | Individuals / OSS | Cloud (github.com) | GitHub.com account | Public & private repos, basic Actions (2,000 min/mo) |
| **GitHub Team** | Small teams (5–50) | Cloud (github.com) | GitHub.com account | Protected branches, code owners, 3,000 Actions min/mo |
| **GitHub Enterprise Cloud (GHEC)** | Large orgs (50+) | Cloud (github.com) | GitHub.com account or EMU (IdP-managed) | Enterprise account, SAML SSO, audit log streaming, GHAS, 50,000 Actions min/mo |
| **GitHub Enterprise Server (GHES)** | Regulated / on-prem | Self-hosted | Built-in or SAML/LDAP | Full air-gap support, data residency, VM appliance model |

> **Note**: Most enterprise architecture conversations focus on **GHEC** (with or without EMU) and **GHES**. The three base scenarios in this workshop all assume at least GHEC licensing. We also cover Azure DevOps integration as an add-on layer.

### Enterprise Managed Users (EMU) vs. Standard GHEC

This is one of the most important distinctions in the GitHub Enterprise landscape. EMU fundamentally changes the identity model:

| Dimension | Standard GHEC | GHEC with EMU |
|-----------|---------------|---------------|
| **Account Creation** | Users create their own GitHub.com accounts | Accounts provisioned automatically via IdP (SCIM) |
| **Account Ownership** | User owns the account | Enterprise owns the account |
| **SSO** | SAML SSO (user links existing account) | Built-in — IdP is the single source of truth |
| **Username Format** | User-chosen (e.g., `jdoe`) | `IdP-username_shortcode` (e.g., `jdoe_contoso`) |
| **Public Repos** | ✅ Users can create & contribute to public repos | ✗ EMU accounts cannot interact outside the enterprise |
| **Forking Public OSS** | ✅ Yes | ✗ No — EMU accounts are enterprise-scoped |
| **Inner Source** | ✅ Internal repos visible across orgs in the enterprise | ✅ Internal repos visible across orgs in the enterprise |
| **Personal Repos** | ✅ Users have personal repos | ⚠️ Can own personal repos within the enterprise (if enterprise policy allows), but not outside it |
| **Gists** | ✅ Users can create gists | ✗ EMU accounts cannot create gists |
| **Guest Collaborators** | N/A — outside collaborators invited directly | ✅ Guest collaborator role for external users (limited repo access, provisioned via IdP with restricted role) |
| **Identity Lifecycle** | Manual — user manages own account, admin manages access | Automated — provision/deprovision via IdP SCIM |
| **Account Deprovisioning** | Admin removes from org (account persists) | IdP deprovisions → account suspended/removed |

**Key takeaway**: EMU gives complete lifecycle control at the cost of a "walled garden" — EMU accounts cannot exist outside the enterprise boundary.

### Architecture Decision Tree

Before diving into each scenario, here's a high-level decision flow. Note that this is a **two-step** process: first choose your base GitHub architecture, then decide whether to add Azure DevOps integration on top.

> **Important — Data Residency Update**: GitHub now offers **GitHub Enterprise Cloud with data residency** (hosted on GHE.com), which provides regional data storage (EU, Australia, US, Japan) with full cloud features — including Copilot. This is a compelling alternative to GHES for organizations whose primary driver is data sovereignty rather than air-gap requirements. All enterprises on GHE.com use Enterprise Managed Users.

```
  STEP 1: Choose Your Base GitHub Architecture
  ─────────────────────────────────────────────

                    ┌─────────────────────────┐
                    │  Do you have regulatory  │
                    │  requirements for data   │
                    │  residency or on-prem?   │
                    └─────────┬───────────────┘
                         ┌────┴────┐
                        Yes        No
                         │          │
                         ▼          ▼
              ┌────────────────┐  ┌──────────────────────┐
              │  Do you need   │  │ Do you need complete │
              │  AIR-GAP or    │  │ IdP-based account    │
              │  disconnected? │  │ lifecycle control?   │
              └───────┬────────┘  └──────────┬───────────┘
                 ┌────┴────┐            ┌────┴────┐
                Yes        No          Yes        No
                 │          │           │          │
                 ▼          ▼           ▼          ▼
          ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
          │ 🟠 Mixed │ │ 🟣 GHEC  │ │ 🔵 EMU   │ │ 🟢 Multi-│
          │ GHEC +   │ │ w/ Data  │ │ Only or  │ │ Org      │
          │ GHES     │ │ Residency│ │ EMU +    │ │ (Std     │
          │          │ │ (GHE.com)│ │ Multi-Org│ │  GHEC)   │
          └──────────┘ └──────────┘ └──────────┘ └──────────┘

  STEP 2: Add Integration Layer (if needed)
  ──────────────────────────────────────────

                    ┌─────────────────────────┐
                    │  Do you have significant │
                    │  Azure DevOps investment │
                    │  you want to preserve?   │
                    └─────────┬───────────────┘
                         ┌────┴────┐
                        Yes        No
                         │          │
                         ▼          ▼
                  ┌──────────────┐  ┌──────────────┐
                  │ + ADO        │  │ GitHub-only  │
                  │ Integration  │  │ (no ADO      │
                  │ (on top of   │  │  needed)     │
                  │  base arch)  │  │              │
                  └──────────────┘  └──────────────┘
```

We'll explore each of the three base scenarios in depth, then cover the decision framework, and finally the ADO integration add-on.

### Discussion Points
- What tier is your organization currently on (or evaluating)?
- Have you evaluated EMU vs. standard GHEC? What drove the decision?
- What is your current identity provider?

---

## 2. Scenario 1: GitHub EMU Only (20 min)

> **Important**: EMU and Multi-Org are **not mutually exclusive**. The most common enterprise pattern is actually **EMU + Multi-Org** — getting both lifecycle control AND organizational isolation. We present them as separate scenarios here to explain each concept independently, but they are frequently combined. We'll revisit this in the Decision Framework (Section 5).

### Architecture Overview

In the EMU-only pattern, your Identity Provider (IdP) is the single source of truth for all GitHub accounts. Users, groups, and roles are defined in the IdP and provisioned into GitHub via SCIM (System for Cross-domain Identity Management).

```
┌─────────────────────────────────────────────────────────────┐
│                    IDENTITY PROVIDER                         │
│              (Entra ID / Okta / PingFederate)                │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│   │  Groups  │  │  Users   │  │  Roles   │                 │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘                 │
└────────┼──────────────┼──────────────┼───────────────────────┘
         │    SCIM       │    SCIM      │   SAML
         │  Provisioning │  Lifecycle   │   SSO
         ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────┐
│                 GITHUB EMU ENTERPRISE                         │
│                 (github.com/enterprises/contoso)              │
│                                                              │
│   ┌───────────────────┐  ┌───────────────────┐              │
│   │   Org: Platform    │  │   Org: Products    │              │
│   │                    │  │                    │              │
│   │  ┌──────┐ ┌─────┐ │  │  ┌──────┐ ┌─────┐ │              │
│   │  │Repo A│ │Repo B│ │  │  │Repo C│ │Repo D│ │              │
│   │  └──────┘ └─────┘ │  │  └──────┘ └─────┘ │              │
│   │                    │  │                    │              │
│   │  Teams (from IdP)  │  │  Teams (from IdP)  │              │
│   └───────────────────┘  └───────────────────┘              │
│                                                              │
│   ┌─────────────────────────────────────────────┐            │
│   │         Enterprise Policies                  │            │
│   │  (Cascade: Enterprise → Org → Repo)          │            │
│   └─────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### How EMU Identity Lifecycle Works

| Step | Action | Where | Automated? |
|------|--------|-------|------------|
| 1 | Admin configures SAML SSO and SCIM in IdP | Entra ID / Okta | Manual (one-time setup) |
| 2 | IdP provisions users into EMU enterprise | GitHub via SCIM | ✅ Automatic |
| 3 | IdP groups map to GitHub teams | GitHub via SCIM | ✅ Automatic |
| 4 | User authenticates via IdP to access GitHub | SAML SSO | ✅ Automatic |
| 5 | User assigned to Orgs/Teams based on IdP group membership | GitHub | ✅ Automatic |
| 6 | User changes role/department → IdP updates groups | GitHub via SCIM | ✅ Automatic |
| 7 | User leaves company → IdP deprovisions account | GitHub via SCIM | ✅ Automatic |
| 8 | All repos, issues, PRs associated with deprovisioned user are retained | GitHub | Enterprise retains data |

Steps 2–7 are fully automated. This is the core value of EMU: **zero manual user management**.

### Supported Identity Providers

**Partner IdPs** ("paved-path" — full support from GitHub):

| IdP | SAML SSO | OIDC SSO | SCIM Provisioning | Team Sync | Notes |
|-----|----------|----------|---------------------|-----------|-------|
| **Microsoft Entra ID** | ✅ | ✅ | ✅ | ✅ | Most common; first-party integration, deepest feature support. OIDC enables dynamic Conditional Access Policy (CAP) validation |
| **Okta** | ✅ | ✗ | ✅ | ✅ | Well-supported; widely used in enterprises. OIDC not supported |
| **PingFederate** | ✅ | ✗ | ✅ | ✅ | Enterprise IdP option. OIDC not supported |

**Non-partner IdPs**: EMU also supports other identity management systems that adhere to SAML 2.0 and SCIM 2.0 specifications. However, GitHub does not provide the same level of support for non-partner integrations — you must consult the system’s own documentation and support team for assistance.

> **Note**: For the best experience, use a single partner IdP for both authentication and provisioning. If your organization uses a different IdP (e.g., ADFS, OneLogin, Auth0), EMU may still work if the IdP supports SAML 2.0 + SCIM 2.0, but this is not a “paved-path” integration and GitHub support will be limited.

### Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Complete identity lifecycle control via IdP | EMU accounts cannot interact outside the enterprise | Supported IdP: Entra ID, Okta, or PingFederate |
| Automated provisioning/deprovisioning (SCIM) | No public repo contributions from EMU accounts | SCIM provisioning configured and tested |
| Enterprise owns all accounts — no data leakage risk | No personal forks of public repos, no gists | SAML SSO configured with IdP |
| Username follows enterprise naming convention (`user_shortcode`) | Users cannot reuse existing GitHub.com accounts | GitHub Enterprise Cloud license |
| Team membership synced from IdP groups | Separate personal GitHub.com account needed for OSS work | IdP group structure mapped to GitHub teams |
| Centralized policy enforcement (Enterprise → Org → Repo) | Learning curve — EMU accounts behave differently | Enterprise shortcode selected (appended as username suffix — cannot be changed later) |
| Simplified audit — all activity tied to corporate identity | Cannot convert existing standard GHEC enterprise to EMU | New enterprise creation (EMU is set at creation time) |
| No "orphaned accounts" — clean offboarding | Limited marketplace app compatibility | Admin team trained on EMU-specific behaviors |
| IP allow list enforcement at enterprise level | Namespace collisions possible if shortcode overlaps | Network/firewall rules for SCIM endpoints |

### Common Pitfalls with EMU

> **Note**: EMU accounts cannot fork public repositories on GitHub.com. If your developers contribute to upstream open-source projects as part of their job, they will need a separate personal GitHub.com account for that work. This is a deliberate security boundary, not a bug.

> **Note**: You cannot convert an existing standard GHEC enterprise to EMU. EMU is set at enterprise creation time. If you already have a standard GHEC enterprise and want EMU, you need to create a new EMU enterprise and migrate your repositories.

> **Note**: The enterprise shortcode (appended as a username suffix, e.g., `_contoso`) cannot be changed after creation. Choose carefully.

### When to Choose EMU Only

**Choose this pattern when:**
- ✅ You need complete control over developer accounts and identity
- ✅ Data loss prevention is a top priority — no code leaving the enterprise boundary
- ✅ Your developers do NOT need to contribute to open source from their work account
- ✅ You want automated provisioning/deprovisioning with zero manual overhead
- ✅ You have a mature IdP setup (Entra ID or Okta) with well-defined groups
- ✅ You are starting fresh or willing to create a new enterprise

**Think twice if:**
- ⚠️ Your developers actively contribute to public open-source projects as part of their job
- ⚠️ You have an existing GitHub.com presence with community engagement
- ⚠️ You use GitHub Marketplace apps that don't support EMU
- ⚠️ You need broad flexibility for external collaborators with personal GitHub accounts

> **Note on external access**: EMU does support a **guest collaborator** role for external users (vendors, contractors, partners). Guest collaborators are provisioned via your IdP like all managed user accounts, but receive a restricted role with limited, repo-scoped access. They cannot see internal repositories unless explicitly added as organization members. This addresses many — but not all — external collaboration scenarios.

### Discussion Points
- Does your organization require complete account lifecycle control?
- Do your developers contribute to public open-source projects as part of their work?
- Are you starting fresh, or would you need to migrate from an existing GitHub Enterprise?

---

## 3. Scenario 2: GitHub Enterprise Multi-Org (20 min)

### Architecture Overview

The Multi-Org pattern uses a single GitHub Enterprise Account as an umbrella over multiple Organizations. Each organization can represent a business unit, department, compliance tier, or acquired company.

```
┌─────────────────────────────────────────────────────────────────┐
│              GITHUB ENTERPRISE CLOUD ACCOUNT                     │
│              (Enterprise-level policies & billing)               │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │                 Enterprise Policies                       │   │
│   │  • Base permissions    • Repository policies              │   │
│   │  • SAML/SSO config     • Actions runner groups            │   │
│   │  • Audit log streaming • IP allow list                    │   │
│   └──────────────────────────────────────────────────────────┘   │
│         │ Policy Cascade          │                │              │
│         ▼                         ▼                ▼              │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│   │  Org: BU-A    │   │  Org: BU-B    │   │  Org: Shared  │        │
│   │  (Finance)    │   │  (Engineering)│   │  (Platform)   │        │
│   │               │   │               │   │               │        │
│   │  Own SSO ✅   │   │  Own SSO ✅   │   │  Own SSO ✅   │        │
│   │  Own Policies │   │  Own Policies │   │  Own Policies │        │
│   │  Own Teams    │   │  Own Teams    │   │  Own Teams    │        │
│   │               │   │               │   │               │        │
│   │  ┌────┐┌────┐ │   │  ┌────┐┌────┐ │   │  ┌────┐┌────┐ │        │
│   │  │Repo││Repo│ │   │  │Repo││Repo│ │   │  │Repo││Repo│ │        │
│   │  └────┘└────┘ │   │  └────┘└────┘ │   │  └────┘└────┘ │        │
│   └──────────────┘   └──────────────┘   └──────────────┘        │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │          Consolidated Billing & Licensing                 │   │
│   │          (One invoice, seat management across orgs)       │   │
│   └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Common Organization Strategies

There is no single right answer for how to structure organizations. Here are the most common strategies:

| Strategy | Example Structure | Best For | Trade-offs |
|----------|-------------------|----------|------------|
| **Org per Business Unit** | `contoso-finance`, `contoso-engineering`, `contoso-marketing` | Large enterprises with distinct BUs and separate leadership | Cross-BU collaboration requires cross-org access |
| **Org per Compliance Tier** | `contoso-regulated`, `contoso-general`, `contoso-opensource` | Enterprises with mixed compliance requirements (FedRAMP, SOC2, HIPAA) | Developers may need access to multiple orgs |
| **Org per Acquisition** | `contoso-core`, `acquired-company-a`, `acquired-company-b` | Post-M&A integration — keep acquired repos separate initially | Can lead to org sprawl if not consolidated over time |
| **Shared Platform Org** | `contoso-platform` alongside BU orgs | CI/CD templates, shared libraries, inner source — accessible to all | Governance of shared org requires clear ownership |
| **Org per Environment** | `contoso-production`, `contoso-staging`, `contoso-sandbox` | Organizations wanting environment isolation | Uncommon; environments are better separated at repo/branch level |

**Most common pattern**: Org-per-BU + a shared platform org for CI/CD templates, reusable Actions, and inner source libraries.

### Policy Inheritance Model

Enterprise policies use a binary **enforce / don't-enforce** model. When the enterprise **enforces** a policy, it locks in a specific value — organizations cannot change it, effectively setting a **floor**. When a policy is **not enforced** at the enterprise level, organizations have full autonomy to configure it as they see fit.

```
    Enterprise Account
    ├── Base repository permissions ────────── "Read" (minimum floor)
    ├── Repository creation ────────────────── "Members can create"
    ├── Repository forking ─────────────────── "Allowed for private repos"
    ├── Actions permissions ────────────────── "Allow select actions"
    ├── Copilot policies ───────────────────── "Enabled for all orgs"
    │
    ├── Org: Finance (can RESTRICT, cannot RELAX)
    │   ├── Base permissions ───────────────── "Read" ✅ (matches enterprise)
    │   ├── Repository creation ────────────── "Disabled" ✅ (more restrictive)
    │   ├── Forking ────────────────────────── "Disabled" ✅ (more restrictive)
    │   └── Copilot ────────────────────────── "Enabled" (inherited)
    │
    └── Org: Engineering (can RESTRICT, cannot RELAX)
        ├── Base permissions ───────────────── "Write" ✗ (CANNOT exceed "Read")
        ├── Repository creation ────────────── "Members can create" ✅ (matches)
        ├── Forking ────────────────────────── "Allowed" ✅ (matches enterprise)
        └── Copilot ────────────────────────── "Enabled" (inherited)
```

**Key governance principle**: Set your security baseline at the enterprise level and let organizations tighten where needed. This prevents standards drift.

### Inner Source with Multi-Org

Inner source — sharing code across teams within the organization — is supported via **internal repository visibility**:

| Visibility | Scope | Use Case |
|------------|-------|----------|
| **Public** | Everyone on GitHub.com | Open-source projects |
| **Internal** | All members of the Enterprise Account (across all orgs) | Inner source — shared libraries, templates, reference implementations |
| **Private** | Only explicitly granted teams/individuals | Proprietary projects, sensitive code |

> **Note**: Internal repos are key to inner source in a multi-org setup. A developer in `Org: Finance` can see internal repos in `Org: Platform` — no additional access grants needed.

### Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Clear isolation between business units / teams | Cross-org collaboration requires internal repos or cross-org teams | GitHub Enterprise Cloud license |
| Each org can have its own SSO/IdP configuration | Users may need accounts/access in multiple orgs | Enterprise Account created (requires GitHub Sales) |
| Consolidated billing under one Enterprise Account | More administrative overhead managing multiple orgs | At least one Organization configured |
| Enterprise-level policies cascade to all orgs | No single "search all orgs" without Enterprise code search | SAML SSO configured per org (or enterprise-level) |
| Supports inner source via internal repo visibility | Team duplication across orgs if people work cross-functionally | Org naming convention and ownership model defined |
| Org owners can self-manage within enterprise guardrails | Audit log is aggregated but can be noisy across many orgs | Enterprise owner(s) designated |
| Flexible — orgs can be added/removed as business evolves | Standards drift if orgs configure differently over time | Policy hierarchy documented and communicated |
| Users keep their GitHub.com accounts (personal + work) | Actions minutes/storage shared at enterprise level (contention) | |
| Marketplace apps work normally | Secret sprawl if not governed centrally | |

### When to Choose Multi-Org

**Choose this pattern when:**
- ✅ You have distinct business units or departments that need autonomy
- ✅ Different groups need different SSO/IdP configurations
- ✅ You want consolidated billing but decentralized administration
- ✅ Your developers contribute to public open-source projects
- ✅ You need isolation between teams for regulatory or compliance reasons
- ✅ You're migrating from multiple existing GitHub orgs or other platforms

**Think twice if:**
- ⚠️ You need absolute control over account lifecycle (consider adding EMU)
- ⚠️ Your org count grows past 10–15 — administrative overhead increases significantly
- ⚠️ You need to prevent any code from leaving the enterprise boundary (consider EMU)
- ⚠️ Cross-org collaboration is more common than within-org work (consider fewer, larger orgs)

> **Note**: EMU and Multi-Org are not mutually exclusive. You can have an EMU enterprise with multiple organizations — getting both lifecycle control AND organizational isolation.

### Discussion Points
- How many distinct business units or departments do you need to support?
- Do different teams have different compliance requirements?
- Have you experienced "org sprawl" in any platform before? How did you manage it?
- Would you use a shared platform org for CI/CD templates and inner source?

---

## 4. Scenario 3: Mixed GitHub Enterprise Cloud + On-Prem (20 min)

### Architecture Overview

The mixed pattern runs GitHub Enterprise Cloud (GHEC) in the cloud alongside GitHub Enterprise Server (GHES) on-premises. GitHub Connect bridges the two environments.

```
┌──────────────────────────────────────────────────────────────────────┐
│                          CLOUD (github.com)                          │
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐     │
│   │            GitHub Enterprise Cloud (GHEC)                   │     │
│   │                                                             │     │
│   │   ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐  │     │
│   │   │ Org: Public  │  │ Org: Cloud  │  │ GitHub Copilot   │  │     │
│   │   │ (OSS / Docs) │  │ (Cloud Apps)│  │ (Cloud-only)     │  │     │
│   │   └─────────────┘  └─────────────┘  └──────────────────┘  │     │
│   │                                                             │     │
│   │   ┌──────────────────────────────────────────────────┐     │     │
│   │   │  Actions (GitHub-hosted runners)                  │     │     │
│   │   │  Packages  •  Codespaces  •  GHAS (cloud)        │     │     │
│   │   └──────────────────────────────────────────────────┘     │     │
│   └─────────────────────────┬───────────────────────────────────┘     │
│                              │                                        │
└──────────────────────────────┼────────────────────────────────────────┘
                               │  GitHub Connect
                               │  (Outbound HTTPS 443)
                               │  ┌─────────────────┐
                               │  │ • Unified search │
                               │  │ • Unified contrib│
                               │  │ • Dependabot     │
                               │  │ • Actions sync   │
                               │  │ • License sync   │
                               │  └─────────────────┘
                               │
┌──────────────────────────────┼────────────────────────────────────────┐
│                              │       ON-PREMISES / PRIVATE CLOUD      │
│                              ▼                                        │
│   ┌────────────────────────────────────────────────────────────┐     │
│   │          GitHub Enterprise Server (GHES)                    │     │
│   │          (Your data center / private cloud)                 │     │
│   │                                                             │     │
│   │   ┌─────────────┐  ┌─────────────┐                        │     │
│   │   │ Org: Secure  │  │ Org: Infra  │                        │     │
│   │   │ (Regulated)  │  │ (On-Prem)   │                        │     │
│   │   └─────────────┘  └─────────────┘                        │     │
│   │                                                             │     │
│   │   ┌──────────────────────────────────────────────────┐     │     │
│   │   │  Self-hosted Runners  •  GHAS (on-prem)          │     │     │
│   │   │  Local storage  •  On-prem auth (LDAP/SAML)      │     │     │
│   │   └──────────────────────────────────────────────────┘     │     │
│   └────────────────────────────────────────────────────────────┘     │
│                                                                      │
│   ┌──────────────────┐                                               │
│   │   🔒 Firewall     │  ← Only outbound 443 required               │
│   └──────────────────┘     (GHES initiates connection)               │
└──────────────────────────────────────────────────────────────────────┘
```

### GitHub Connect — Feature Matrix

GitHub Connect is the bridge between GHEC and GHES. Each feature can be enabled independently:

| GitHub Connect Feature | Description | What it Enables |
|------------------------|-------------|-----------------|
| **Unified Search** | Search code across both GHEC and GHES from either interface | Developers don't need to remember "which server has this repo?" |
| **Unified Contributions** | GHES contributions appear on GitHub.com profile | Single contribution graph across cloud + on-prem |
| **Dependabot** | GHES repos can use GitHub.com advisory database | Vulnerability alerts on on-prem repos |
| **Actions — GitHub.com Actions** | GHES can use Actions from GitHub.com Marketplace | No need to manually import community Actions |
| **Server Statistics** | Aggregated usage data sent to GHEC for analysis | Enterprise-wide usage visibility |
| **License Sync** | Unified license management across GHEC + GHES | Single view of seat usage, avoid double-counting |

> **Note**: GitHub Connect is **outbound-only** from GHES. Your on-premises server initiates the connection — no inbound firewall rules are needed. This is a critical point for security teams.

### GHES Feature Parity

Not all GHEC features are available on GHES. Here's the current state:

| Feature | GHEC | GHES | Notes |
|---------|------|------------|-------|
| **Repos, PRs, Issues** | ✅ | ✅ | Full parity |
| **Actions** | ✅ (GitHub-hosted runners) | ✅ (self-hosted runners only) | GHES requires you to provide and manage runners |
| **Copilot** | ✅ | ✗ | Cloud-only — requires github.com connectivity |
| **Codespaces** | ✅ | ✗ | Cloud-only |
| **GHAS — Secret Protection** (secret scanning, push protection) | ✅ | ✅ | Available on GHES |
| **GHAS — Code Security** (code scanning, CodeQL) | ✅ | ✅ | Available on GHES |
| **Dependabot** | ✅ | ✅ (with Connect) | Requires GitHub Connect for advisory database |
| **Audit Log Streaming** | ✅ | ✅ | Different streaming targets available on GHES |
| **Repository Rulesets** | ✅ | ✅ | Available on GHES 3.11+ |
| **Packages** | ✅ | ✅ | Supported registries may differ |
| **Projects** | ✅ | ✅ | Available on GHES 3.8+ |

> **Note**: The most impactful gap is **Copilot** — it is cloud-only. If AI-assisted development is a priority, developers working exclusively on GHES will not have access to Copilot. This is often the tipping point for organizations to adopt a mixed architecture rather than going all-GHES.

### GHES Operational Requirements

Running GHES means running infrastructure. Here's what your team needs to manage:

| Operational Area | Responsibility | Frequency |
|------------------|---------------|-----------|
| **VM Infrastructure** | Provision and maintain VMs (CPU, memory, storage) | Ongoing |
| **GHES Upgrades** | Apply quarterly feature releases and hotfix patches | Quarterly + ad-hoc |
| **Backups** | Configure and test `ghe-backup-utils` for disaster recovery | Daily backups, quarterly DR tests |
| **High Availability** | Configure replica nodes for failover | One-time setup + monitoring |
| **Authentication** | Configure and maintain SAML SSO or LDAP/AD | One-time setup + updates |
| **Self-hosted Runners** | Provision and manage Actions runner infrastructure | Ongoing |
| **Monitoring** | Monitor GHES appliance health, storage, performance | Ongoing |
| **Network Security** | Manage firewall rules, TLS certificates, IP restrictions | Ongoing |

### Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Data residency — regulated code stays on-premises | Two platforms to manage, patch, and secure | GHEC + GHES license (bundled with GHE plan) |
| Air-gap capable — GHES can run fully disconnected | GHES requires infrastructure: VMs, storage, backups, HA | On-prem infrastructure (VMs, storage, networking) |
| GitHub Connect bridges cloud ↔ on-prem features | Copilot, Codespaces, and other cloud-only features unavailable on GHES | Dedicated admin team for GHES operations |
| Unified search across both environments (with Connect) | Developer experience split — different UIs, potentially different versions | GitHub Connect configured (outbound HTTPS 443) |
| Unified contribution graph (with Connect) | GHES version may lag behind GHEC feature set | GHES upgrade schedule and patching process |
| Compliance — meet regulatory requirements (FedRAMP, ITAR, etc.) | Actions on GHES requires self-hosted runners | Self-hosted runners for on-prem Actions |
| GHAS available on both cloud and on-prem | No single audit log — separate for GHEC and GHES | Backup/DR plan for GHES appliance |
| License sync between GHEC and GHES (with Connect) | Higher total cost of ownership (infra + ops + licensing) | Network connectivity for GitHub Connect |
| Gradual migration path — move workloads cloud-ward over time | Cross-environment PRs/issues not natively supported | |

### When to Choose Mixed Cloud + On-Prem

**Choose this pattern when:**
- ✅ You need **air-gapped** environments for classified or ultra-sensitive workloads
- ✅ You have existing on-prem infrastructure investments you can't sunset yet
- ✅ Different teams have different compliance levels — cloud is fine for some, on-prem required for others
- ✅ You're in a gradual cloud migration — GHES today, GHEC tomorrow

> **🟣 Consider GHE.com first**: If data residency (not air-gap) is the primary driver, evaluate **GHEC with data residency on GHE.com** before committing to GHES. GHE.com offers regional data storage (EU, Australia, US, Japan) with full cloud features — including Copilot and GitHub Actions hosted runners — and avoids the operational overhead of self-hosted infrastructure. All GHE.com enterprises use EMU by default.
>
> **Note**: Codespaces is now available on GHE.com in **public preview**. Check the [GHE.com feature overview](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency) for current status and any limitations.

**Think twice if:**
- ⚠️ "On-prem" is driven by perception rather than an actual regulatory requirement
- ⚠️ You don't have the ops team to manage GHES upgrades, backups, and infrastructure
- ⚠️ Copilot and Codespaces are critical for your developer experience (not available on GHES)
- ⚠️ Total cost of ownership for GHES infrastructure exceeds the risk mitigation value
- ⚠️ GHEC's built-in controls (EMU, IP allow lists, data residency on GHE.com, audit logging) already meet your compliance needs

> **Note**: Challenge the assumption. Many organizations find that GHEC with EMU, IP allow lists, and data residency on GHE.com meets their compliance needs without the operational overhead of GHES. Ensure the on-prem requirement is tied to a specific regulation requiring air-gap — not organizational inertia.

### Discussion Points
- Do you have genuine air-gap or data residency requirements? Which regulation drives them?
- Do you have the operational capacity to run GHES (upgrades, backups, infrastructure)?
- Is Copilot a priority? If so, how do you handle the GHES gap?
- Are you currently running GHES? What version? What's your upgrade cadence?

---

## ☕ Break (10 min)

---

## 5. Architecture Decision Framework (15 min)

Now that we've covered the three base GitHub architecture patterns, let's compare them side by side and build a decision framework.

### Master Comparison Matrix — Base Patterns

| Dimension | 🔵 EMU Only | 🟢 Multi-Org (Standard GHEC) | 🟠 Mixed Cloud + GHES |
|-----------|-------------|-------------------------------|------------------------|
| **Identity Control** | ✅ Full IdP lifecycle (SCIM) | ⚠️ SAML SSO (manual account mgmt) | ⚠️ Split (GHEC SSO + GHES LDAP/SAML) |
| **Account Ownership** | ✅ Enterprise owns accounts | ✗ User owns accounts | ✗ Mixed |
| **Data Residency** | ⚠️ Cloud (US/EU/AU/JP regions); 🟣 GHE.com for regional residency | ⚠️ Cloud (US/EU/AU/JP regions); 🟣 GHE.com for regional residency | ✅ On-prem for sensitive data |
| **Air-Gap Support** | ✗ None | ✗ None | ✅ GHES can be air-gapped |
| **Copilot Available** | ✅ Full | ✅ Full | ⚠️ GHEC only (not GHES) |
| **GHAS Available** | ✅ Full | ✅ Full | ✅ Both GHEC and GHES |
| **Codespaces** | ✅ Available | ✅ Available | ⚠️ GHEC only |
| **Public OSS Contribution** | ✗ Not from EMU accounts | ✅ Yes | ✅ From GHEC accounts |
| **Inner Source** | ✅ Internal repos | ✅ Internal repos | ⚠️ Per-platform only |
| **Admin Complexity** | 🟢 Low | 🟡 Medium | 🔴 High |
| **Infrastructure Ops** | ✗ None (SaaS) | ✗ None (SaaS) | 🔴 GHES requires infra |
| **Cost Model** | Per-seat (GHEC) | Per-seat (GHEC) | Per-seat (GHEC + GHES) + infra |
| **Migration Effort** | 🟡 Medium (new enterprise) | 🟢 Low | 🔴 High |
| **Best For** | Regulated / security-first orgs | Most enterprises | Data sovereignty / air-gap |

> **Note**: Azure DevOps integration is **not shown here** because it is not a base architecture — it is an **integration add-on** that can be layered on top of any of these three patterns. We'll cover ADO integration in the next section.

### Decision Flowchart — Two-Step Process

```
  STEP 1: Choose Your Base GitHub Architecture
  ─────────────────────────────────────────────

                        ┌────────────────────────────┐
                        │  Starting Point:            │
                        │  What are your constraints? │
                        └──────────────┬─────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │ Do you have regulatory requirements  │
                    │ mandating on-premises data storage?  │
                    └──────────────────┬──────────────────┘
                              ┌───────┴───────┐
                             YES              NO
                              │                │
                              ▼                ▼
                  ┌──────────────┐   ┌───────────────────────┐
                  │  🟠 MIXED    │   │ Do you need complete  │
                  │  Cloud +     │   │ IdP-based account     │
                  │  GHES        │   │ lifecycle control?    │
                  └──────────────┘   └───────────┬──────────┘
                                          ┌──────┴──────┐
                                         YES            NO
                                          │              │
                                          ▼              ▼
                              ┌──────────────┐  ┌──────────────┐
                              │  🔵 EMU Only │  │  🟢 Multi-   │
                              │  or EMU +    │  │  Org (Std    │
                              │  Multi-Org   │  │  GHEC)       │
                              └──────────────┘  └──────────────┘

  STEP 2: Add Integration Layer (if needed)
  ──────────────────────────────────────────

                    ┌─────────────────────────┐
                    │  Do you have significant │
                    │  Azure DevOps investment │
                    │  you want to preserve?   │
                    └─────────┬───────────────┘
                         ┌────┴────┐
                        YES        NO
                         │          │
                         ▼          ▼
                  ┌──────────────┐  ┌──────────────┐
                  │ + ADO        │  │ GitHub-only  │
                  │ Integration  │  │ (no ADO      │
                  │ Add-On       │  │  needed)     │
                  └──────────────┘  └──────────────┘
```

> **Important**: This is a **two-step** process. First choose your base GitHub architecture — that's the core decision. Then decide whether to add Azure DevOps integration on top. ADO is not an alternative to EMU, Multi-Org, or Mixed — it's an integration layer that sits on top of whichever base you chose.

### Recommendations by Organization Profile

| Organization Profile | Recommended Base Pattern | + ADO Integration? | Key Reason |
|----------------------|--------------------------|---------------------|------------|
| **Startup / Scale-up** | 🟢 Multi-Org (standard GHEC) | No — go all-in on GitHub | Simple, flexible, lowest admin overhead |
| **Mid-size Enterprise (500–5,000)** | 🔵 EMU + Multi-Org | Only if ADO Boards investment is significant | Identity control + org isolation, scales well |
| **Large Enterprise (5,000+, no regulation)** | 🔵 EMU + Multi-Org | If migrating from ADO gradually | Full lifecycle automation at scale |
| **Regulated Enterprise (finance, healthcare)** | 🔵 EMU Only, 🟣 GHE.com (data residency), or 🟠 Mixed + EMU | If ADO Boards/Test Plans are entrenched | Data control, compliance, audit trail; evaluate GHE.com before GHES |
| **Government / Defense** | 🟠 Mixed (GHEC + GHES air-gapped) or 🟣 GHE.com (if no air-gap needed) | Rarely — ADO is also cloud | Data sovereignty, air-gap requirements, ITAR |
| **ADO-Heavy Enterprise** | 🔵 EMU or 🟢 Multi-Org | ✅ Yes — this is the primary use case | Preserve ADO investments, adopt Copilot/GHAS |
| **Acquisitive Enterprise (M&A)** | 🟢 Multi-Org (org per acquisition) | If acquired companies use ADO | Onboard acquired companies without disruption |
| **OSS-Heavy Enterprise** | 🟢 Multi-Org (standard, no EMU) | Uncommon | Developers need public GitHub.com access |

### Common Hybrid Patterns

In practice, base patterns are often combined — and ADO integration is always an add-on:

| Hybrid Pattern | Description | When to Use |
|----------------|-------------|-------------|
| **EMU + Multi-Org** | EMU enterprise with multiple orgs per business unit | Security-first enterprise with distinct business units — most common enterprise pattern |
| **EMU + Non-EMU Org** | EMU enterprise for corporate work + separate non-EMU org for open-source | Developers who contribute to upstream OSS as part of their job |
| **Multi-Org + GHES** | GHEC multi-org with GHES for regulated workloads via Connect | Mixed compliance tiers — some code cloud-OK, some must be on-prem |
| **Any base + ADO** | ADO integration layered on any pattern above | Organizations with significant ADO Board/Pipeline investment |

### Discussion Points
- Where does your organization fit on the decision flowchart?
- Which base pattern fits best? Do you need the ADO add-on?
- What constraints are non-negotiable (regulatory, identity, toolchain)?
- What's your timeline — are you making this decision now, or planning for 6–12 months out?

---

## 6. Integration Add-On: GitHub + Azure DevOps (20 min)

**Key Concept: ADO integration is NOT a standalone architecture.** Azure DevOps integration sits **on top of** whichever base GitHub architecture you chose in the previous section:

| Base Architecture | + ADO Integration = |
|-------------------|---------------------|
| 🔵 EMU Only | EMU enterprise with ADO Boards/Pipelines for work tracking and legacy CI |
| 🟢 Multi-Org | Multi-Org enterprise with ADO Boards for project management layer |
| 🟠 Mixed Cloud + GHES | Hybrid GitHub deployment with ADO for PM and existing pipelines |

**You still need a base pattern.** ADO does not replace your GitHub architecture — it augments it.

### Why Coexistence?

Many enterprises have years of investment in Azure DevOps — work item types, Board queries, dashboards, pipeline YAML, artifact feeds, and test plans. Migrating everything at once is risky, expensive, and disruptive.

The "better together" thesis is about using the right tool for the right job:

| Domain | Best Tool | Why |
|--------|-----------|-----|
| **Source Code Management** | GitHub | Superior developer experience, Copilot integration, branch protection + rulesets |
| **AI Code Assistance** | GitHub Copilot | Only available with GitHub repos |
| **Security Scanning** | GitHub | GHAS — GitHub Advanced Security (includes Secret Protection + Code Security) — secret scanning, code scanning, Dependabot |
| **Code Review** | GitHub Pull Requests | Industry-standard PR workflow, review assignments, CODEOWNERS |
| **CI/CD (new projects)** | GitHub Actions | Tight GitHub integration, marketplace, reusable workflows |
| **Work Item Tracking** | Azure DevOps Boards | Rich project management: custom work items, sprints, queries, dashboards |
| **CI/CD (existing)** | Azure DevOps Pipelines | Preserve existing pipeline investment; migrate gradually |
| **Test Management** | Azure DevOps Test Plans | Manual + automated test management — no GitHub equivalent |
| **Artifact Management** | Azure DevOps Artifacts | Existing feeds, upstream sources, universal packages |

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                       DEVELOPER WORKFLOW                             │
│                                                                      │
│   ┌─────────────────────────────┐  ┌──────────────────────────────┐ │
│   │  GITHUB (Base Architecture) │  │  AZURE DEVOPS (Add-On)       │ │
│   │  🔵 EMU / 🟢 Multi-Org /   │  │                              │ │
│   │  🟠 Mixed                   │  │                              │ │
│   │                             │  │                              │ │
│   │  ┌───────────────────────┐  │  │  ┌────────────────────────┐ │ │
│   │  │  📦 Repos             │──┼──┼──│  📋 Boards             │ │ │
│   │  │  (Source of truth)    │  │  │  │  (Work items, sprints)  │ │ │
│   │  └───────────────────────┘  │  │  └────────────────────────┘ │ │
│   │           │   AB# Linking   │  │           │                  │ │
│   │           ▼                 │  │           ▼                  │ │
│   │  ┌───────────────────────┐  │  │  ┌────────────────────────┐ │ │
│   │  │  🔄 Pull Requests     │  │  │  │  🧪 Test Plans         │ │ │
│   │  │  (Code review, CI)    │  │  │  │  (Manual/automated)    │ │ │
│   │  └───────────────────────┘  │  │  └────────────────────────┘ │ │
│   │           │                 │  │                              │ │
│   │           ▼                 │  │  ┌────────────────────────┐ │ │
│   │  ┌───────────────────────┐  │  │  │  📦 Artifacts          │ │ │
│   │  │  🤖 Copilot           │  │  │  │  (Packages, feeds)     │ │ │
│   │  │  (AI code assistance) │  │  │  └────────────────────────┘ │ │
│   │  └───────────────────────┘  │  │                              │ │
│   │                             │  │  ┌────────────────────────┐ │ │
│   │  ┌───────────────────────┐  │  │  │  🔧 Pipelines          │ │ │
│   │  │  🔒 GHAS              │  │  │  │  (Existing — or        │ │ │
│   │  │  (Secret scanning,   │  │  │  │   migrate to Actions)  │ │ │
│   │  │   Code scanning,     │  │  │  └────────────────────────┘ │ │
│   │  │   Dependabot)        │  │  │                              │ │
│   │  └───────────────────────┘  │  │                              │ │
│   │                             │  │                              │ │
│   │  ┌───────────────────────┐  │  │                              │ │
│   │  │  ⚡ Actions            │  │  │                              │ │
│   │  │  (CI/CD — new work)   │  │  │                              │ │
│   │  └───────────────────────┘  │  │                              │ │
│   └─────────────────────────────┘  └──────────────────────────────┘ │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐   │
│   │                   ENTRA ID (Shared Identity)                  │   │
│   │       Single sign-on across both GitHub and Azure DevOps      │   │
│   └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Integration Point: AB# Linking

AB# linking is the primary integration between GitHub and Azure DevOps Boards:

| Aspect | Detail |
|--------|--------|
| **Syntax** | Type `AB#12345` in a GitHub commit message, PR description, or issue description to link to ADO work item #12345. Note: `AB#` in PR titles or comments does **not** create a link. |
| **How it works** | GitHub sends a webhook to ADO, which creates a hyperlink on the work item |
| **Setup** | Install the **Azure Boards** GitHub App on your GitHub org |
| **Supported directions** | GitHub → ADO (commits, PRs, branches linked to work items) |
| **State transitions** | Configure ADO to auto-transition work items when PRs are merged **into the default branch** (e.g., `Fixes AB#12345` → moves to Done). State transitions do not apply for merges into non-default branches. |
| **Visibility** | ADO work items show linked GitHub PRs, commits, and branches in the Development section |

**Example Developer Workflow:**

1. Developer picks up work item `AB#4567` in ADO Boards
2. Creates branch in GitHub: `feature/AB4567-add-login`
3. Commits with message: `Add OAuth login flow AB#4567`
4. Opens PR in GitHub referencing `AB#4567` — ADO work item shows the linked PR
5. Code review and CI happen entirely in GitHub
6. PR merged → ADO work item automatically transitions to "Done"
7. Project manager sees the completed work in ADO Boards dashboard

### ADO Pipelines Building from GitHub Repos

Even when source code lives in GitHub, ADO Pipelines can still build it:

**Setup Steps:**

1. In Azure DevOps: **Project Settings** → **Service Connections** → **New** → **GitHub**
2. Authentication: Use **GitHub App** (recommended), **OAuth**, or **PAT**
3. Authorize the connection to the target GitHub org
4. In ADO Pipeline YAML, reference the GitHub repo:

```yaml
resources:
  repositories:
    - repository: my-github-repo
      type: github
      endpoint: 'my-github-service-connection'
      name: 'contoso/my-app'

trigger:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - checkout: my-github-repo
  - script: echo Building from GitHub repo
```

> **Note**: Over time, consider migrating ADO Pipelines to GitHub Actions for new projects. This reduces context-switching and takes advantage of Actions' native GitHub integration (status checks, PR triggers, environment protection rules).

### What Goes Where — Capability Matrix

| Capability | GitHub ✅ | Azure DevOps ✅ | Recommendation |
|------------|-----------|------------------|----------------|
| **Source Code** | ✅ Primary | ⚠️ Legacy repos | All new repos in GitHub; migrate ADO Repos gradually |
| **Code Review (PRs)** | ✅ Primary | N/A | All code review happens in GitHub |
| **AI Code Assistance** | ✅ Copilot | ✗ Not available | Copilot only works with GitHub repos |
| **Security Scanning** | ✅ GHAS (includes Secret Protection + Code Security) | ⚠️ Defender for DevOps | GitHub Advanced Security for comprehensive coverage |
| **CI/CD** | ✅ Actions (new projects) | ✅ Pipelines (existing) | New projects → Actions; existing → migrate over time |
| **Work Tracking** | ⚠️ Issues / Projects | ✅ Boards (primary) | ADO Boards for enterprise PM; GitHub Issues for dev-level tracking |
| **Test Management** | ✗ | ✅ Test Plans | ADO remains the test management leader |
| **Artifacts** | ⚠️ Packages | ✅ Artifacts | Use whichever you've standardized on |
| **Wiki / Documentation** | ✅ Repo-based Markdown | ✅ Wiki | GitHub repos + Markdown for docs-as-code |

### Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Leverage best of both platforms | Two platforms = dual admin, dual training, dual cost | GitHub Enterprise Cloud license |
| Adopt Copilot + GHAS without full migration | AB# linking is GitHub → ADO (not fully bidirectional) | Azure DevOps organization + project |
| Preserve ADO Boards investment (sprints, queries, dashboards) | Developer context-switching between two systems | Azure Boards GitHub App installed |
| Gradual migration — move at your own pace | Unified reporting requires custom dashboards (Power BI, etc.) | Entra ID for shared SSO (strongly recommended) |
| Shared identity via Entra ID | Audit logging split across two systems | Network connectivity between GH and ADO |
| ADO Pipelines can build from GitHub repos (service connection) | Artifact management may be split across both platforms | Service connection configured (for ADO Pipelines) |
| New projects start on GitHub; legacy stays in ADO | Governance complexity — policies in two places | Team training on AB# workflow |
| Works with ANY base GitHub architecture (EMU, Multi-Org, Mixed) | License cost for both platforms during coexistence | |

### When to Add ADO Integration

**Add ADO integration when:**
- ✅ You have significant ADO Boards investment (custom work items, queries, dashboards)
- ✅ You want to adopt Copilot and GHAS without disrupting existing workflows
- ✅ You're doing a gradual migration from ADO Repos to GitHub Repos
- ✅ Your project managers and stakeholders live in ADO Boards
- ✅ You use ADO Test Plans and can't easily replace them
- ✅ You're already on Entra ID (makes SSO across both platforms seamless)

**Skip ADO integration if:**
- ⚠️ You're starting fresh — go all-in on GitHub from the start
- ⚠️ You can replace ADO Boards with GitHub Projects V2 (simpler stack = less overhead)
- ⚠️ Total cost of running both platforms exceeds the one-time migration cost
- ⚠️ Developers strongly prefer a single tool — context-switching harms productivity

### Discussion Points
- How much of your team's workflow lives in ADO Boards today?
- Could GitHub Projects V2 replace your ADO Boards usage, or is the investment too deep?
- Do you have ADO Pipelines that would be difficult to migrate to Actions?
- Is Entra ID already your identity provider for both GitHub and ADO?

---

## 7. Q&A & Discussion (15 min)

### Guided Discussion Questions

Use these questions to help the audience self-identify the right pattern — framing it as a two-step decision (base architecture + ADO add-on):

1. **Identity & Access**: Do you need complete IdP-based account lifecycle control, or is SAML SSO sufficient?
2. **Data Residency**: Do you have genuine regulatory requirements for on-premises data storage? Which regulation?
3. **Open Source**: Do your developers contribute to public open-source projects as part of their work?
4. **Base Architecture**: Based on the three patterns we covered, which one fits your organization?
5. **ADO Integration Add-On**: Do you have significant Azure DevOps investment? What's the appetite and budget for migration vs. coexistence?
6. **Developer Experience**: Is Copilot a priority? How important is a unified developer experience across all teams?
7. **Compliance**: What compliance frameworks apply (SOC2, FedRAMP, HIPAA, ITAR, GDPR)?
8. **Timeline**: Is this a "decide now" or a "plan for next year" decision?

---

## Post-Workshop Actions

Take these steps back to your organization:

- [ ] **Assess current state** — Document your current GitHub/ADO/other SCM setup, identity provider, and compliance requirements
- [ ] **Identify constraints** — List your non-negotiable requirements (data residency, air-gap, identity lifecycle, ADO dependencies)
- [ ] **Map to pattern** — Use the decision flowchart to identify your primary pattern and any hybrid needs
- [ ] **Evaluate EMU** — If identity lifecycle control is important, conduct a detailed EMU evaluation with your IdP team
- [ ] **Plan for Copilot** — Ensure your chosen architecture supports Copilot for all developers who need it
- [ ] **Review GHES necessity** — If considering mixed cloud + on-prem, validate the on-prem requirement against specific regulations; evaluate GHEC with data residency on GHE.com as an alternative if air-gap is not required
- [ ] **ADO integration assessment** — If coexisting with ADO, install the Azure Boards GitHub App and pilot AB# linking
- [ ] **Stakeholder alignment** — Present the master comparison matrix to leadership for architectural sign-off
- [ ] **Timeline and migration plan** — Define phases: pilot → expand → full rollout with clear milestones

---

## Appendix

### A. Key URLs

| Resource | Link |
|----------|------|
| GitHub Enterprise Cloud Documentation | `https://docs.github.com/en/enterprise-cloud@latest` |
| Enterprise Managed Users Overview | `https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/using-enterprise-managed-users-for-iam/about-enterprise-managed-users` |
| GitHub Enterprise Server Documentation | `https://docs.github.com/en/enterprise-server@latest` |
| GitHub Connect Documentation | `https://docs.github.com/en/enterprise-server@latest/admin/configuration/configuring-github-connect` |
| Azure Boards + GitHub Integration | `https://learn.microsoft.com/en-us/azure/devops/boards/github/` |
| GitHub Actions Documentation | `https://docs.github.com/en/actions` |
| GHAS Overview (Secret Protection + Code Security) | `https://docs.github.com/en/enterprise-cloud@latest/code-security/getting-started/github-security-features` |
| GitHub Enterprise Cloud Ebook | See `docs/GitHub-Enterprise-Cloud_ebook.pdf` |
| GitHub ESSP Ebook | See `docs/2025-05-28-GitHub-ESSP-Ebook-EZ-Version012.pdf` |

### B. Policy Decision Matrix — Enterprise Settings

| Policy Area | Recommended Enterprise Setting | Rationale |
|-------------|-------------------------------|-----------|
| Base repository permissions | `Read` | Minimum privilege; orgs can't escalate |
| Repository creation | `Members can create private repos` | Enable developer productivity within guardrails |
| Repository forking | `Allowed for internal repos only` | Enable inner source; prevent forking private repos |
| Repository visibility change | `Restricted to enterprise owners` | Prevent accidental public exposure |
| Actions — allowed actions | `Allow select actions` | Curate approved Actions; block untrusted |
| Actions — fork PR workflows | `Require approval for first-time contributors` | Prevent supply chain attacks |
| Copilot | `Enabled for all orgs` | Maximize developer productivity |
| Copilot — public code suggestions | `Blocked` | Reduce IP/license risk |
| Audit log streaming | `Enabled to SIEM` | Continuous compliance monitoring |
| IP allow list | `Configured per enterprise policy` | Network-level access control |

### C. EMU SCIM Configuration Checklist

- [ ] Supported IdP confirmed (Entra ID, Okta, or PingFederate)
- [ ] Enterprise shortcode selected (cannot be changed later)
- [ ] IdP groups mapped to planned GitHub team structure
- [ ] SCIM provisioning endpoint configured in IdP
- [ ] SAML SSO configured and tested with IdP
- [ ] Test user provisioned and verified in GitHub EMU enterprise
- [ ] Test group → team mapping verified
- [ ] Deprovisioning tested (disable user in IdP → verify GitHub suspension)
- [ ] IP allow list configured (if applicable)
- [ ] Admin recovery account documented (break-glass access)

### D. GitHub Connect Setup Checklist

- [ ] GHES appliance version supports Connect (3.0+)
- [ ] Outbound HTTPS (443) connectivity from GHES to github.com confirmed
- [ ] GHEC Enterprise Account exists
- [ ] GitHub Connect enabled in GHES Management Console
- [ ] Unified search enabled and tested
- [ ] Unified contributions enabled
- [ ] Dependabot connectivity verified
- [ ] Actions — GitHub.com Actions access configured
- [ ] License sync activated and verified
- [ ] Server statistics enabled (if allowed by policy)

### E. ADO + GitHub Integration Setup Checklist

- [ ] Azure Boards GitHub App installed on GitHub org
- [ ] ADO project connected to GitHub org
- [ ] AB# linking tested (commit + PR)
- [ ] State transition rules configured (e.g., `Fixes AB#` → Done)
- [ ] Service connection created in ADO for GitHub (if using ADO Pipelines with GH repos)
- [ ] Entra ID SSO configured for both GitHub and Azure DevOps
- [ ] Team trained on AB# syntax and workflow
- [ ] Reporting dashboard built to span both platforms (Power BI or similar)

### F. Pre-Workshop Checklist

- [ ] Audience context understood — which scenarios are most relevant to attendees
- [ ] Architecture diagrams render correctly in presentation tool
- [ ] All comparison tables are legible at presentation resolution
- [ ] Reference ebooks available if deeper context is needed
- [ ] Q&A discussion questions tailored to audience industry and constraints
- [ ] Backup plan: if projector fails, share slide deck as PDF/link

### G. Backup Plan

If the presentation tool fails:
1. Share the slide deck as a Markdown file or PDF
2. Use the workshop document (this file) as a reference for discussion
3. Focus on the master comparison matrix (Section 6) and the decision flowchart
4. Drive discussion with the guided questions in Section 7

---

*Workshop materials prepared for GitHub Setup Configurations & Architecture Patterns training*
