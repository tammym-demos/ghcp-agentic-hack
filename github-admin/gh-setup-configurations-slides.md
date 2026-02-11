# GitHub Setup Configurations & Architecture Patterns

## Slide Deck — Presenter Guide

**Duration**: 1.5–2 hours  
**Format**: Presentation + Discussion + Architecture Diagrams  
**Audience**: Enterprise Admins, IT Decision Makers, Engineering Managers, Tech Leads  
**Focus**: GitHub Architecture Patterns, Deployment Topologies & Integration Strategies  

---

## Slide 1: Title Slide

# GitHub Setup Configurations & Architecture Patterns

**Choosing the Right GitHub Topology for Your Organization**

> **Presenter Note**: *Welcome everyone. Today we're going to walk through the different ways you can set up and configure GitHub for your organization. Whether you're going all-in on cloud, have on-prem requirements, or need to integrate with Azure DevOps — we'll cover the pros, cons, and requirements of each approach so you can make an informed decision.*

---

## Slide 2: Agenda

| # | Section | Time |
|---|---------|------|
| 1 | GitHub Platform Overview | 10 min |
| 2 | Scenario 1: GitHub EMU Only | 20 min |
| 3 | Scenario 2: GitHub Enterprise — Multi-Org | 20 min |
| 4 | Scenario 3: Mixed GitHub Enterprise Cloud + On-Prem (GHES) | 20 min |
| 5 | ☕ Break | 10 min |
| 6 | Architecture Decision Framework & Comparison | 15 min |
| 7 | Integration Add-On: GitHub + Azure DevOps | 20 min |
| 8 | Q&A & Discussion | 15 min |

> **Presenter Note**: *We'll cover three base architecture patterns — EMU, Multi-Org, and Mixed Cloud + On-Prem — each with its own diagrams, pros/cons tables, and requirements. After a break, we'll use a decision framework to help you choose the right base pattern. Then we'll cover Azure DevOps integration as an add-on layer that works with any of the three base patterns. We'll wrap up with Q&A.*

---

# SECTION 1: GitHub Platform Overview

---

## Slide 3: Section Divider — GitHub Platform Overview

# GitHub Platform Overview
### Understanding the Product Landscape

---

## Slide 4: GitHub Product Tiers

| Tier | Target | Hosting | Identity | Key Features |
|------|--------|---------|----------|--------------|
| **GitHub Free** | Individuals / OSS | Cloud (github.com) | GitHub.com account | Public & private repos, basic Actions |
| **GitHub Team** | Small teams | Cloud (github.com) | GitHub.com account | Protected branches, code owners, 3,000 Actions min/mo |
| **GitHub Enterprise Cloud (GHEC)** | Large orgs | Cloud (github.com) | GitHub.com or EMU (IdP-managed) | Enterprise account, SAML SSO, audit log streaming, GHAS, 50,000 Actions min/mo |
| **GitHub Enterprise Server (GHES)** | Regulated / on-prem | Self-hosted (your infra) | Built-in or SAML/LDAP | Full air-gap support, data residency, appliance model |

> **Presenter Note**: *This is the landscape. Most enterprise conversations center on GHEC — either standard or with EMU — and GHES for on-prem. The key differentiators are identity management, data residency, and compliance requirements. Let's note that GHEC with EMU is a fundamentally different identity model than standard GHEC — we'll dig into that in Scenario 1.*

---

## Slide 5: Enterprise Managed Users (EMU) vs. Standard GHEC

| Dimension | Standard GHEC | GHEC with EMU |
|-----------|---------------|---------------|
| **Account Creation** | Users create their own GitHub.com accounts | Accounts provisioned via IdP (SCIM) |
| **Account Ownership** | User owns the account | Enterprise owns the account |
| **SSO** | SAML SSO (user links existing account) | Built-in — IdP is the source of truth |
| **Username Format** | User-chosen | `IdP-username_shortcode` (e.g., `jdoe_contoso`) |
| **Public Repos** | ✅ Users can create & contribute to public repos | ✗ EMU accounts cannot interact outside the enterprise |
| **Forking Public OSS** | ✅ Yes | ✗ No — EMU accounts are enterprise-scoped |
| **Inner Source** | ✅ Internal repos visible across orgs | ✅ Internal repos visible across orgs |
| **Personal Repos** | ✅ Users have personal repos | ⚠️ Can own repos within enterprise (if policy allows), but not outside it |
| **Gists** | ✅ Users can create gists | ✗ EMU accounts cannot create gists |
| **Identity Lifecycle** | Manual — user manages own account | Automated — provision/deprovision via IdP |

> **Presenter Note**: *This is one of the most important slides. EMU gives you complete lifecycle control — when someone leaves the company, their account is deprovisioned automatically. But the trade-off is significant: EMU accounts live in a walled garden. They can't contribute to open source, can't fork public repos, can't create gists, and can't use their account outside the enterprise. However, they CAN own private repos within the enterprise if your enterprise policy allows it. For organizations that need external collaborators on EMU-owned repos, there's a "guest collaborator" role that doesn't require IdP provisioning. For many organizations, this is the right trade-off for security and compliance. For others — especially those with active open-source contributors — standard GHEC with SAML SSO is the better choice.*

---

## Slide 6: Decision Tree — Choosing Your Base Architecture

> **Important — Data Residency Update**: GitHub now offers **GHEC with data residency** (hosted on GHE.com), providing regional data storage (EU, Australia, US, Japan) with full cloud features including Copilot. This is a compelling alternative to GHES when data sovereignty — not air-gap — is the driver. All enterprises on GHE.com use Enterprise Managed Users.

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

> **Presenter Note**: *Notice this is a TWO-STEP decision. Step 1: choose your base GitHub architecture — that's the core decision. Step 2: decide whether to add Azure DevOps integration ON TOP of whichever base you chose. ADO is not an alternative to EMU, Multi-Org, or Mixed — it's an integration layer. You still need one of the three base patterns underneath. Note the NEW branch: for data residency requirements where air-gap isn't needed, GHEC with data residency on GHE.com is now the recommended path — it gives full cloud features including Copilot. We'll cover the base patterns first, then the decision framework, and finally ADO integration.*

---

# SECTION 2: Scenario 1 — GitHub EMU Only

---

## Slide 7: Section Divider — GH EMU Only

# Scenario 1: GitHub EMU Only
### Enterprise Managed Users — Full Cloud, Full Control

> 💡 **EMU and Multi-Org are not mutually exclusive.** EMU controls *identity*; Multi-Org controls *structure*. Most large enterprises combine both — EMU for identity lifecycle + multiple orgs for BU or project separation. The scenarios below are presented separately for clarity, but expect to blend them.

---

## Slide 8: EMU Architecture Overview

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

> **Presenter Note**: *This is the cleanest architecture. Your IdP is the single source of truth. Users, groups, and roles are defined there and provisioned into GitHub via SCIM. When someone joins the company, they get a GitHub account. When they leave, it's deprovisioned. Teams in GitHub map to groups in your IdP. Policies cascade from the Enterprise level down to Orgs and Repos.*

---

## Slide 9: EMU Only — Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Complete identity lifecycle control via IdP | EMU accounts cannot interact outside the enterprise | Supported IdP: Entra ID, Okta, or PingFederate |
| Automated provisioning/deprovisioning (SCIM) | No public repo contributions from EMU accounts | SCIM provisioning configured and tested |
| Enterprise owns all accounts — no data leakage risk | No personal forks of public repos, no gists | SAML SSO configured with IdP |
| Username follows enterprise naming convention (`user_shortcode`) | Users cannot reuse existing GitHub.com accounts | GitHub Enterprise Cloud license |
| Team membership synced from IdP groups | Separate personal GitHub.com account needed for OSS work | IdP group structure mapped to GitHub teams |
| Centralized policy enforcement (Enterprise → Org → Repo) | Namespace collisions possible if shortcode overlaps | Enterprise shortcode selected (appended as username suffix — cannot be changed) |
| Simplified audit — all activity tied to corporate identity | Learning curve — EMU accounts behave differently | Admin team trained on EMU-specific behaviors |
| No "orphaned accounts" — clean offboarding | Cannot convert existing standard GHEC enterprise to EMU | New enterprise creation (EMU is set at creation time) |
| IP allow list enforcement at enterprise level | Limited marketplace app compatibility | Network/firewall rules for SCIM endpoints |

> **Presenter Note**: *The biggest win here is identity lifecycle. The biggest trade-off is the walled garden. EMU accounts are enterprise-scoped — they simply cannot exist outside the enterprise boundary. This is a security feature for some orgs and a deal-breaker for others. Also note: you cannot convert an existing standard GHEC enterprise to EMU — it's a new enterprise. So this is a forward-looking decision.*

---

## Slide 10: EMU — Identity Flow Deep Dive

| Step | Action | Where |
|------|--------|-------|
| 1 | Admin configures SAML SSO and SCIM in IdP | Entra ID / Okta |
| 2 | IdP provisions users into EMU enterprise | Automatic via SCIM |
| 3 | IdP groups map to GitHub teams | Automatic via SCIM |
| 4 | User authenticates via IdP to access GitHub | SAML SSO |
| 5 | User assigned to Orgs/Teams based on IdP group membership | Automatic |
| 6 | User leaves company → IdP deprovisions account | Automatic via SCIM |
| 7 | All repos, issues, PRs associated with user are retained | Enterprise retains data |

> **Presenter Note**: *The beauty here is steps 2, 3, 5, and 6 are fully automated. No GitHub admin has to manually add or remove users. The IdP drives everything. But — and this is important — you need to get your IdP group structure right before rolling this out. Changing group-to-team mappings after the fact can be disruptive.*

---

## Slide 11: EMU — When to Choose This Pattern

**Choose EMU Only when:**
- ✅ You need complete control over developer accounts and identity
- ✅ Data loss prevention is a top priority — no code leaving the enterprise boundary
- ✅ Your developers do NOT need to contribute to open source from their work account
- ✅ You want automated provisioning/deprovisioning with zero manual overhead
- ✅ You have a mature IdP setup (Entra ID or Okta) with well-defined groups
- ✅ You are starting fresh or willing to create a new enterprise (no migration from standard GHEC)

**Think twice if:**
- ⚠️ Your developers actively contribute to public open-source projects
- ⚠️ You have an existing GitHub.com presence with community engagement
- ⚠️ You use GitHub Marketplace apps that don't support EMU
- ⚠️ You need flexibility for contractors or external collaborators

> 💡 **Guest Collaborators**: EMU does support a **Guest Collaborator** role that lets you invite outside users to specific repositories without full IdP provisioning. This can address limited contractor/vendor scenarios — but they are scoped to repo-level access only. Evaluate whether Guest Collaborator meets your needs before dismissing EMU over external collaboration.

> **Presenter Note**: *EMU is the right choice for security-conscious, compliance-first organizations — think financial services, healthcare, government contractors. If your primary concern is "I need to know exactly who has access and automatically revoke it," EMU is your answer. But if you have developers who contribute to upstream open-source projects as part of their job, you'll need a plan for that — typically a separate personal GitHub.com account.*

---

# SECTION 3: Scenario 2 — GitHub Enterprise Multi-Org

---

## Slide 12: Section Divider — GH Enterprise Multi-Org

# Scenario 2: GitHub Enterprise — Multi-Org
### One Enterprise, Multiple Organizations

---

## Slide 13: Multi-Org Architecture Overview

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

> **Presenter Note**: *This is the most common enterprise pattern. You have a single Enterprise Account that provides consolidated billing, policy inheritance, and audit log aggregation. Under that, you have multiple Organizations — typically one per business unit, department, or compliance boundary. Each org can have its own SSO configuration, its own policies (within the bounds set by the enterprise), and its own teams.*

---

## Slide 14: Multi-Org — Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Clear isolation between business units / teams | Cross-org collaboration requires internal repos or cross-org teams | GitHub Enterprise Cloud license |
| Each org can have its own SSO/IdP configuration | Users may need accounts/access in multiple orgs | Enterprise Account created (contact GitHub Sales) |
| Consolidated billing under one Enterprise Account | More administrative overhead managing multiple orgs | At least one Organization configured |
| Enterprise-level policies cascade to all orgs | No single "search all orgs" without Enterprise search | SAML SSO configured per org (or enterprise-level) |
| Supports inner source via internal repo visibility | Team duplication across orgs if people work cross-functionally | Org naming convention and ownership model defined |
| Org owners can self-manage within guardrails | Audit log is aggregated but can be noisy across many orgs | Enterprise owner(s) designated |
| Flexible — orgs can be added/removed as business evolves | Actions minutes/storage shared at enterprise level (contention) | Policy hierarchy documented and communicated |
| Users keep their GitHub.com accounts (personal + work) | Standards drift — orgs may configure differently over time | |
| Marketplace apps work normally | Secret sprawl if not governed centrally | |

> **Presenter Note**: *The multi-org pattern offers the best balance of isolation and flexibility. The key challenge is governance — how do you prevent standards drift when each org owner can configure things differently? The answer is enterprise-level policies that set the floor, and clear documentation of what each org can customize. The other common pain point is cross-org collaboration — if a developer needs to work on repos in three different orgs, they need access in all three.*

---

## Slide 15: Multi-Org — Common Organization Strategies

| Strategy | Example Structure | Best For |
|----------|-------------------|----------|
| **Org per Business Unit** | `contoso-finance`, `contoso-engineering`, `contoso-marketing` | Large enterprises with distinct BUs and separate leadership |
| **Org per Environment / Stage** | `contoso-production`, `contoso-staging`, `contoso-sandbox` | Organizations wanting environment isolation (less common) |
| **Org per Compliance Tier** | `contoso-regulated`, `contoso-general`, `contoso-opensource` | Enterprises with mixed compliance requirements (FedRAMP, SOC2, etc.) |
| **Org per Acquisition** | `contoso-core`, `acquired-company-a`, `acquired-company-b` | Post-M&A integration — keep acquired company repos separate initially |
| **Shared Platform Org** | `contoso-platform` alongside BU orgs | CI/CD templates, shared libraries, inner source — accessible to all |

> **Presenter Note**: *There's no single right answer here. The most common pattern we see is org-per-BU plus a shared platform org. The compliance-tier approach is growing — especially in regulated industries where you want different policy sets for regulated vs. non-regulated code. Post-acquisition is interesting because it lets you bring an acquired company onto your enterprise billing without immediately reorganizing their repos.*

---

## Slide 16: Multi-Org — Policy Inheritance Model

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
        ├── Base permissions ───────────────── "Write" ✗ (cannot exceed "Read")
        ├── Repository creation ────────────── "Members can create" ✅ (matches)
        ├── Forking ────────────────────────── "Allowed" ✅ (matches enterprise)
        └── Copilot ────────────────────────── "Enabled" (inherited)
```

> **Presenter Note**: *This is critical to understand. Enterprise policies set the FLOOR. Organizations can be MORE restrictive, but they cannot be LESS restrictive. If the enterprise says "forking is allowed," an org can disable it. But if the enterprise says "forking is disabled," no org can re-enable it. This is the governance model that prevents standards drift — you set your security baseline at the enterprise level and let orgs tighten where needed.*

---

## Slide 17: Multi-Org — When to Choose This Pattern

**Choose Multi-Org when:**
- ✅ You have distinct business units or departments that need autonomy
- ✅ Different groups need different SSO/IdP configurations
- ✅ You want consolidated billing but decentralized administration
- ✅ Your developers contribute to public open-source projects
- ✅ You need isolation between teams for regulatory or compliance reasons
- ✅ You're migrating from multiple existing GitHub orgs or other platforms

**Think twice if:**
- ⚠️ You need absolute control over account lifecycle (consider EMU instead)
- ⚠️ Your org count grows past 10–15 — administrative overhead increases
- ⚠️ You need to prevent any code from leaving the enterprise boundary
- ⚠️ Cross-org collaboration is more common than within-org work

> **Presenter Note**: *Multi-Org is the default recommendation for most enterprises. It gives you the right balance of control and flexibility. The main question is whether you combine it with EMU — you can have an EMU enterprise with multiple orgs, getting the best of both worlds: lifecycle control AND organizational isolation.*

---

# SECTION 4: Scenario 3 — Mixed GitHub Enterprise Cloud + On-Prem

---

## Slide 18: Section Divider — Mixed Cloud + On-Prem

# Scenario 3: Mixed GH Enterprise Cloud + On-Prem (GHES)
### Hybrid Topology with GitHub Connect

---

## Slide 19: Mixed Architecture Overview

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

> **Presenter Note**: *This is the hybrid pattern. You run GHEC in the cloud for your non-regulated workloads, open source, and anything that benefits from cloud-native features like Copilot and Codespaces. You run GHES on-premises — in your data center or private cloud — for regulated, sensitive, or air-gap-required workloads. GitHub Connect bridges the two, providing unified search, contribution graphs, Dependabot, and license synchronization. Importantly, the connection is outbound-only from GHES — your on-prem server initiates the connection, no inbound firewall rules needed.*

---

## Slide 20: Mixed — Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Data residency — regulated code stays on-premises | Two platforms to manage, patch, and secure | GHEC license + GHES license (bundled with GHE) |
| Air-gap capable — GHES can run fully disconnected | GHES requires infrastructure: VMs, storage, backups | On-prem infrastructure (VMs, storage, networking) |
| GitHub Connect bridges cloud ↔ on-prem | Copilot, Codespaces, and other cloud-only features unavailable on GHES | Dedicated admin team for GHES operations |
| Unified search across both environments (with Connect) | Developer experience split — different UIs, different versions | GitHub Connect configured (outbound HTTPS 443) |
| Unified contribution graph (with Connect) | GHES version may lag behind GHEC feature set | GHES upgrade schedule (quarterly releases) |
| Compliance — meet regulatory requirements (FedRAMP, ITAR, etc.) | Actions on GHES requires self-hosted runners | Self-hosted runners for on-prem Actions |
| GHAS available on both cloud and on-prem | No single audit log — separate for GHEC and GHES | Backup/DR plan for GHES appliance |
| License sync between GHEC and GHES (with Connect) | Higher total cost of ownership (infra + ops + licensing) | Network connectivity for GitHub Connect |
| Gradual migration path — move workloads cloud-ward over time | Cross-environment PRs/issues not natively supported | |

> **Presenter Note**: *The hybrid pattern is the most operationally complex. You're running two platforms. The key question to ask is: "Do you ACTUALLY need air-gap, or is data residency sufficient?" For data residency without air-gap, GHE.com (GHEC with data residency) gives you regional storage in EU, Australia, US, or Japan with full cloud features including Copilot. GHES is the right choice when you have genuine air-gap requirements or disconnected-network mandates.*

---

## Slide 21: GitHub Connect — Feature Matrix

| GitHub Connect Feature | Description | Requires |
|------------------------|-------------|----------|
| **Unified Search** | Search code across both GHEC and GHES from either interface | GitHub Connect enabled |
| **Unified Contributions** | GHES contributions appear on GitHub.com profile | GitHub Connect enabled |
| **Dependabot** | GHES repos can use GitHub.com advisory database | GitHub Connect enabled |
| **Actions — GitHub.com Actions** | GHES can use Actions from GitHub.com Marketplace | GitHub Connect enabled |
| **Server Statistics** | Aggregated usage data sent to GHEC for analysis | GitHub Connect enabled |
| **License Sync** | Unified license management across GHEC + GHES | GitHub Connect enabled |

> **Presenter Note**: *GitHub Connect is the glue. It's a set of opt-in features that bridge the cloud and on-prem worlds. Each feature can be enabled independently. The most popular features are unified search — so developers don't have to mentally track "which server has this repo?" — and Actions sync, so GHES can use community Actions from the Marketplace without manual import. Note: if you're connecting to an enterprise on GHE.com (data residency), Server Statistics and GitHub.com Actions are not available via GitHub Connect.*

---

## Slide 22: Mixed — When to Choose This Pattern

**Choose Mixed Cloud + On-Prem when:**
- ✅ You need **air-gapped** environments for classified or ultra-sensitive workloads
- ✅ You have existing on-prem infrastructure investments you can't sunset yet
- ✅ Different teams have different compliance levels — cloud is fine for some, on-prem required for others
- ✅ You're in a gradual cloud migration — GHES today, GHEC tomorrow

> **🟣 Consider GHE.com first**: If data residency (not air-gap) is the primary driver, evaluate **GHEC with data residency on GHE.com** before committing to GHES. GHE.com offers regional data storage (EU, Australia, US, Japan) with full cloud features — including Copilot — and avoids GHES operational overhead.
>
> ⚠️ **Note**: Codespaces is **not available** on GHE.com. If Codespaces is a hard requirement, standard GHEC is the only option.

**Think twice if:**
- ⚠️ "On-prem" is driven by perception rather than actual regulatory requirement
- ⚠️ You don't have the ops team to manage GHES upgrades, backups, and infrastructure
- ⚠️ Copilot and Codespaces are critical for your developer experience (not available on GHES)
- ⚠️ Total cost of ownership for GHES infrastructure exceeds the risk mitigation value

> **Presenter Note**: *I want to be honest here: we see a lot of organizations running GHES because "security says we need on-prem" when the actual regulatory requirement could be met with GHEC's built-in controls. The key question is: do you need AIR-GAP, or do you need DATA RESIDENCY? If it's data residency, point them to GHE.com — GHEC with data residency. It gives them regional data storage in the EU, Australia, US, or Japan with full cloud features including Copilot. If they truly need air-gap or disconnected operation, then yes, GHES is the right call. Make sure the on-prem requirement is tied to a specific regulation or certification — not just organizational inertia.*

---

# ☕ BREAK — 10 Minutes

---

## Slide 23: Break Slide

# ☕ 10-Minute Break

> **Presenter Note**: *Good time for a break. When we come back, we'll start with the decision framework — a side-by-side comparison of the three base patterns you just learned — and then cover Azure DevOps integration as an add-on layer.*

---

# SECTION 5: Architecture Decision Framework & Comparison

---

## Slide 24: Section Divider — Decision Framework

# Architecture Decision Framework
### Comparing the Three Base Patterns Side by Side

---

## Slide 25: Master Comparison Matrix — Base Patterns

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

> **Presenter Note**: *This is your cheat sheet for the three base patterns. Notice ADO is not shown here — it's an add-on layer we'll cover next, not a peer-level architecture. No pattern is universally best — each optimizes for different constraints. For most enterprises without specific regulatory requirements, Multi-Org or EMU Only is the right starting point. Mixed is for genuine on-prem needs.*

---

## Slide 26: Decision Flowchart — Two-Step Process

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
                        YES        No
                         │          │
                         ▼          ▼
                  ┌──────────────┐  ┌──────────────┐
                  │ + ADO        │  │ GitHub-only  │
                  │ Integration  │  │ (no ADO      │
                  │ Add-On       │  │  needed)     │
                  └──────────────┘  └──────────────┘
```

> **Presenter Note**: *This is a TWO-STEP decision. Step 1: choose your base GitHub architecture — on-prem needs push you to Mixed, identity control pushes you to EMU, otherwise Multi-Org. Step 2: decide whether to add ADO integration on top. ADO is not an alternative to these three — it's an integration layer. We'll cover it in the next section.*

---

## Slide 27: Common Hybrid Patterns & Combinations

| Hybrid Pattern | Description | When to Use |
|----------------|-------------|-------------|
| **EMU + Multi-Org** | EMU enterprise with multiple orgs per BU | Security-first enterprise with distinct business units — most common pattern |
| **EMU + Non-EMU Org** | EMU enterprise for work + separate non-EMU org for OSS | Developers who contribute to open source on company time |
| **Multi-Org + GHES** | GHEC multi-org with GHES for regulated workloads | Mixed compliance — some code can be cloud, some must be on-prem |
| **Any base + ADO** | ADO integration layered on any pattern above | Organizations with significant ADO Board/Pipeline investment |

> **Presenter Note**: *Real-world architectures are often hybrids. The most common hybrid we see is EMU + Multi-Org — you get lifecycle control AND organizational isolation. Notice the last row: ADO integration is always an "add-on" — it works with any base pattern. An EMU enterprise with ADO integration. A Mixed cloud+GHES deployment with ADO integration. These are all valid combinations.*

---

## Slide 28: Recommendations by Organization Profile

| Organization Profile | Recommended Base Pattern | + ADO Integration? | Key Reason |
|----------------------|--------------------------|---------------------|------------|
| **Startup / Scale-up** | 🟢 Multi-Org (standard GHEC) | No — go all-in on GitHub | Simple, flexible, lowest admin overhead |
| **Mid-size Enterprise** | 🔵 EMU + Multi-Org | Only if ADO Boards investment is significant | Identity control + org isolation |
| **Large Enterprise (no regulation)** | 🔵 EMU + Multi-Org | If migrating from ADO gradually | Full lifecycle automation at scale |
| **Regulated Enterprise (finance, healthcare)** | 🔵 EMU Only, 🟣 GHE.com (data residency), or 🟠 Mixed + EMU | If ADO Boards/Test Plans are entrenched | Data control, compliance; evaluate GHE.com before GHES |
| **Government / Defense** | 🟠 Mixed (GHEC + GHES air-gapped) or 🟣 GHE.com (if no air-gap needed) | Rarely — ADO is also cloud | Data sovereignty, air-gap requirements |
| **ADO-Heavy Enterprise** | 🔵 EMU or 🟢 Multi-Org | ✅ Yes — this is the primary use case | Preserve ADO investments, adopt Copilot/GHAS |
| **Acquisitive Enterprise (M&A)** | 🟢 Multi-Org (org per acquisition) | If acquired companies use ADO | Onboard acquired companies without disruption |
| **OSS-Heavy Enterprise** | 🟢 Multi-Org (standard, no EMU) | Uncommon | Developers need public GitHub.com access |

> **Presenter Note**: *Notice the new column: "+ ADO Integration?" — this reinforces that ADO is a decision layered on top of the base architecture. For most organizations, the base pattern decision comes first. ADO integration is driven by one question: "Do you have significant ADO investment you can't sunset?"*

---

# SECTION 6: Integration Add-On — GitHub + Azure DevOps

---

## Slide 29: Section Divider — Integration Add-On

# Integration Add-On: GitHub + Azure DevOps
### A Layer on Top of Any Base Architecture — Not a Standalone Pattern

---

## Slide 30: ADO as an Integration Layer — Not a Standalone Pattern

**Key Concept: ADO integration is NOT a standalone architecture.**

Azure DevOps integration sits **on top of** whichever base GitHub architecture you chose in the previous section:

| Base Architecture | + ADO Integration = |
|-------------------|---------------------|
| 🔵 EMU Only | EMU enterprise with ADO Boards/Pipelines for work tracking and legacy CI |
| 🟢 Multi-Org | Multi-Org enterprise with ADO Boards for project management layer |
| 🟠 Mixed Cloud + GHES | Hybrid GitHub deployment with ADO for PM and existing pipelines |

**You still need a base pattern.** ADO does not replace your GitHub architecture — it augments it.

**Why coexistence?**
- Many enterprises have **years of investment** in Azure DevOps (Boards, Pipelines, Repos, Artifacts)
- Migrating everything at once is **risky, expensive, and disruptive**
- GitHub excels at **source code management, Copilot, GHAS, and developer experience**
- Azure DevOps excels at **work item tracking (Boards), complex pipeline orchestration, and Test Plans**

> **Presenter Note**: *This is the important reframe. We covered three base architectures — EMU, Multi-Org, and Mixed. ADO integration is NOT a fourth alternative. It's an add-on layer. You pick your base GitHub architecture first, then you decide whether to add ADO integration on top. Think of it like choosing a house (the base) and then deciding whether to add a garage (the integration).*

---

## Slide 31: Integration Architecture Overview

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
│   │  │  🔒 GHAS              │  │  │  │  (Build/Release — or   │ │ │
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

> **Presenter Note**: *Notice the left side now explicitly calls out that it's your base architecture — whichever of the three patterns you chose. On the right, ADO provides work tracking, test plans, artifact feeds, and existing pipelines. The key integration point is AB# linking. And at the bottom, Entra ID provides shared identity across both.*

---

## Slide 32: Key Integration Point — AB# Linking

| Feature | Description |
|---------|-------------|
| **AB# Syntax** | In any GitHub commit message or PR, type `AB#12345` to link to ADO work item #12345 |
| **How it works** | GitHub sends a webhook to ADO, which creates a hyperlink on the work item |
| **Setup** | Install the **Azure Boards** GitHub App on your GitHub org |
| **Supported directions** | GitHub → ADO (commits, PRs, branches linked to work items) |
| **State transitions** | Configure ADO to auto-transition work items when PRs are merged (e.g., `Fixes AB#12345` → moves to Done) |
| **Visibility** | ADO work items show linked GitHub PRs, commits, and branches in the Development section |

**Example Workflow:**
1. Developer picks up work item `AB#4567` in ADO Boards
2. Creates branch in GitHub: `feature/AB#4567-add-login`
3. Commits with message: `Add OAuth login flow AB#4567`
4. Opens PR in GitHub — ADO work item shows the linked PR
5. PR merged → ADO work item transitions to "Done"

> **Presenter Note**: *AB# linking is the integration everyone needs to set up first. It's lightweight — just a GitHub App — and it gives you bidirectional visibility. Your project managers see dev activity on ADO work items, and developers reference work items directly in their commits and PRs.*

---

## Slide 33: What Goes Where — Capability Split

| Capability | GitHub ✅ | Azure DevOps ✅ | Notes |
|------------|-----------|------------------|-------|
| **Source Code** | ✅ Primary | ⚠️ Existing repos (migrate over time) | GitHub for all new repos; migrate ADO Repos to GH gradually |
| **Code Review (PRs)** | ✅ Primary | N/A | All code review happens in GitHub |
| **AI Code Assistance** | ✅ Copilot | ✗ | Copilot only works with GitHub repos |
| **Security Scanning** | ✅ GHAS (includes Secret Protection + Code Security) | ⚠️ Defender for DevOps | GitHub Advanced Security (secret scanning, code scanning, Dependabot) is best-in-class |
| **CI/CD** | ✅ Actions (new work) | ✅ Pipelines (existing) | Migrate pipelines over time; new projects use Actions |
| **Work Tracking** | ⚠️ Issues / Projects | ✅ Boards (primary) | ADO Boards for enterprise PM; GitHub Issues for dev-level tracking |
| **Test Management** | ✗ | ✅ Test Plans | ADO remains the leader for manual test management |
| **Artifact Management** | ⚠️ Packages | ✅ Artifacts (existing) | Use whichever you've standardized on |
| **Wiki / Docs** | ✅ (repo-based) | ✅ Wiki | GitHub repos + Markdown for docs-as-code |

> **Presenter Note**: *The general principle: GitHub for code + security + AI, ADO for project management + testing + existing pipelines. Over time, many organizations migrate more to GitHub — pipelines become Actions, ADO Repos become GitHub Repos — but ADO Boards often stays because the investment in work item types, queries, and dashboards is significant.*

---

## Slide 34: ADO Integration — Pros, Cons & Requirements

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|------------------|
| Leverage best of both platforms | Two platforms = dual admin, dual training, dual cost | GitHub Enterprise Cloud license |
| Adopt Copilot + GHAS without full migration | AB# linking is one-directional (GH → ADO references) | Azure DevOps organization + project |
| Preserve ADO Boards investment (sprints, queries, dashboards) | Developer context-switching between two systems | Azure Boards GitHub App installed |
| Gradual migration — move at your own pace | Unified reporting requires custom dashboards (Power BI, etc.) | Entra ID for shared SSO (strongly recommended) |
| Shared identity via Entra ID | Audit logging split across two systems | Network connectivity between GH and ADO |
| ADO Pipelines can build from GitHub repos (service connection) | Artifact management may be split across both platforms | Service connection configured (for ADO Pipelines) |
| New projects start on GitHub; legacy stays in ADO | Governance complexity — policies in two places | Team training on AB# workflow |
| Works with ANY base GitHub architecture (EMU, Multi-Org, Mixed) | License cost for both platforms during coexistence | |

> **Presenter Note**: *Coexistence is pragmatic but not free. You're paying for two platforms, training on two platforms, and managing policies in two places. The value proposition is: "Get Copilot and GHAS today without the risk of a big-bang migration." Over time, you tilt more toward GitHub, but ADO Boards may remain the long-term work tracking tool — and that's fine.*

---

## Slide 35: When to Add ADO Integration

**Add ADO Integration when:**
- ✅ You have significant ADO Boards investment (custom work items, queries, dashboards)
- ✅ You want to adopt Copilot and GHAS without disrupting existing workflows
- ✅ You're doing a gradual migration from ADO Repos to GitHub Repos
- ✅ Your project managers and stakeholders live in ADO Boards
- ✅ You use ADO Test Plans and can't easily replace them
- ✅ You're already on Entra ID (makes SSO across both platforms seamless)

**Skip ADO Integration if:**
- ⚠️ You're starting fresh — go all-in on GitHub from the start
- ⚠️ You can replace ADO Boards with GitHub Projects V2 (simpler stack = less overhead)
- ⚠️ Total cost of running both platforms exceeds the one-time migration cost
- ⚠️ Developers strongly prefer a single tool — context-switching is a productivity killer

> **Presenter Note**: *If you're a greenfield organization, don't set up coexistence — just go GitHub. This integration add-on is for organizations with significant ADO investment that want a pragmatic path to modernization. The end state might be full GitHub, or it might be permanent coexistence with ADO Boards. Both are valid.*

---

# SECTION 7: Q&A & Discussion

---

## Slide 36: Discussion Questions

**Let's discuss:**

1. **Where does your organization fit** in the decision flowchart? Which base pattern fits best?
2. **What are your biggest identity/access management challenges** today?
3. **Do you have genuine on-prem requirements**, or is it organizational inertia?
4. **Do you need the ADO integration add-on?** How much ADO investment do you have?
5. **What's your open-source contribution story?** Do developers need public GitHub.com access?
6. **What compliance frameworks** are you subject to (SOC2, FedRAMP, HIPAA, ITAR, etc.)?

> **Presenter Note**: *Open this up for discussion. Frame it as two decisions: (1) which base architecture? and (2) do you need ADO integration on top? Expect the most debate around "do we really need on-prem?" and "can we replace ADO Boards?" — those are the highest-stakes decisions.*

---

## Slide 37: Resources

| Resource | Link |
|----------|------|
| GitHub Enterprise Cloud Documentation | `https://docs.github.com/en/enterprise-cloud@latest` |
| Enterprise Managed Users Overview | `https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/using-enterprise-managed-users-for-iam/about-enterprise-managed-users` |
| GitHub Enterprise Server Documentation | `https://docs.github.com/en/enterprise-server@latest` |
| GitHub Connect Documentation | `https://docs.github.com/en/enterprise-server@latest/admin/configuration/configuring-github-connect` |
| Azure Boards + GitHub Integration | `https://learn.microsoft.com/en-us/azure/devops/boards/github/` |
| GitHub Enterprise Cloud Ebook | See `docs/GitHub-Enterprise-Cloud_ebook.pdf` |
| GitHub ESSP Ebook | See `docs/2025-05-28-GitHub-ESSP-Ebook-EZ-Version012.pdf` |

> **Presenter Note**: *Share these links with attendees. The two ebooks in the docs folder provide additional context on GitHub Enterprise Cloud capabilities and partner resources.*

---

## Slide 38: Thank You

# Thank You!

**Questions? Let's keep the conversation going.**

> **Presenter Note**: *Thank the audience. Offer to follow up on specific architecture questions offline. If appropriate, offer to do a deeper-dive session on whichever scenario is most relevant to the customer.*

---

# APPENDIX

---

## Appendix A: Pre-Presentation Checklist

- [ ] Architecture diagrams load correctly in slide tool
- [ ] All comparison tables render cleanly
- [ ] Decision flowchart is readable at presentation resolution
- [ ] Customer/audience context is understood — which scenarios are most relevant?
- [ ] Reference ebooks are available if needed
- [ ] Q&A discussion questions tailored to audience

## Appendix B: Key URLs for Live Reference

| Resource | URL |
|----------|-----|
| GitHub Enterprise Admin Console | `https://github.com/enterprises/{enterprise}/settings` |
| GitHub EMU Setup Guide | `https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/using-enterprise-managed-users-for-iam` |
| GHES Releases | `https://enterprise.github.com/releases` |
| Azure Boards GitHub App | `https://github.com/marketplace/azure-boards` |
| GitHub Actions Documentation | `https://docs.github.com/en/actions` |
| GHAS Overview (Secret Protection + Code Security) | `https://docs.github.com/en/enterprise-cloud@latest/code-security/getting-started/github-security-features` |

## Appendix C: Backup — EMU Supported Identity Providers

**Partner IdPs** (“paved-path” — full GitHub support):

| IdP | SAML SSO | OIDC SSO | SCIM Provisioning | Team Sync | Notes |
|-----|----------|----------|---------------------|-----------|-------|
| **Microsoft Entra ID** | ✅ | ✅ | ✅ | ✅ | Most common; tightest integration. OIDC enables CAP validation |
| **Okta** | ✅ | ✗ | ✅ | ✅ | Well-supported; OIDC not available |
| **PingFederate** | ✅ | ✗ | ✅ | ✅ | Enterprise IdP option; OIDC not available |

> **Note**: Non-partner IdPs that conform to SAML 2.0 and SCIM 2.0 specifications can also work with EMU, but without full GitHub support.

## Appendix D: GHES Version & Feature Parity

| Feature | GHEC | GHES | Notes |
|---------|------|------|-------|
| Actions | ✅ | ✅ (self-hosted runners) | GHES requires self-hosted runners |
| Copilot | ✅ | ✗ | Cloud only — requires github.com connectivity |
| Codespaces | ✅ | ✗ | Cloud only |
| GHAS — Secret Protection (secret scanning, push protection) | ✅ | ✅ | Part of GitHub Advanced Security |
| GHAS — Code Security (code scanning, CodeQL) | ✅ | ✅ | Part of GitHub Advanced Security |
| Dependabot | ✅ | ✅ (with Connect) | Requires GitHub Connect for advisory DB |
| Audit Log Streaming | ✅ | ✅ | Different streaming targets on GHES |
| Repository Rulesets | ✅ | ✅ | Available on GHES 3.11+ |

## Appendix E: ADO-to-GitHub Service Connection Setup (Summary)

1. In Azure DevOps: **Project Settings** → **Service Connections** → **New** → **GitHub**
2. Authentication: Use **GitHub App**, **OAuth**, or **PAT**
3. Authorize the connection to the target GitHub org
4. In ADO Pipelines: Reference the service connection to trigger builds from GitHub repos
5. In ADO Boards: Install the **Azure Boards** GitHub App from the Marketplace
6. Configure AB# linking and state transition rules

---

*Slide deck prepared for GitHub Setup Configurations & Architecture Patterns presentation*
