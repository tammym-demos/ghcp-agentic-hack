# GitHub Enterprise EMU + Open Source Consumption Workshop

**Duration**: ~1 hour 30 minutes (with break)  
**Format**: Presentation + Live Demos  
**Audience**: Enterprise Admins, Platform Engineers, Engineering Managers, Security/Compliance Teams  
**Focus**: Consuming open source within GitHub Enterprise Managed Users (EMU)

---

## Workshop Overview

This workshop covers the practical patterns for consuming open source software inside a GitHub Enterprise Managed Users (EMU) environment. EMU accounts are intentionally constrained — managed users can view public repositories but cannot interact with them (star, watch, fork, open issues/PRs, comment, or push). This session walks through three proven patterns — package consumption via Dependabot, source mirroring, and upstream contribution via the Private Mirrors App — so teams can adopt open source safely while staying within enterprise governance boundaries.

### Learning Objectives

- Understand EMU's interaction restrictions and why they exist
- Design a governed open source intake process with approval criteria
- Configure Dependabot for private registries and automated dependency updates
- Set up internal source mirrors with automated upstream synchronization
- Evaluate the GitHub Private Mirrors App (PMA) for upstream contributions
- Implement supply chain security gates with Dependency Review
- Communicate the "why" behind governed OSS consumption to stakeholders

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | Enterprise Cloud with EMU enabled |
| **Enterprise Access** | Enterprise owner or organization owner role |
| **Test Organization** | At least one organization for demos |
| **Browser** | Modern browser with access to github.com |
| **GHAS License** | Recommended for Dependency Review features |

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | [Opening & EMU Constraint Overview](#1-opening--emu-constraint-overview-10-min) | 10 min |
| 2 | [Enterprise Operating Model for OSS](#2-enterprise-operating-model-for-oss-10-min) | 10 min |
| 3 | [Scenario 1 — Package Consumption with Dependabot](#3-scenario-1--package-consumption-with-dependabot-20-min) | 20 min |
| ☕ | **Break** | 10 min |
| 4 | [Scenario 2 — Source Mirroring](#4-scenario-2--source-mirroring-20-min) | 20 min |
| 5 | [Scenario 3 — Upstream Contributions with PMA](#5-scenario-3--upstream-contributions-with-pma-15-min) | 15 min |
| 6 | [Rollout Strategy & Wrap-Up](#6-rollout-strategy--wrap-up-10-min) | 10 min |

**Total**: ~1 hour 35 minutes including break

---

## 1. Opening & EMU Constraint Overview (10 min)

### Key Points

- GitHub Enterprise Managed Users (EMU) gives enterprises full identity control — managed user accounts are provisioned and governed by the enterprise IdP
- The tradeoff: managed users **cannot interact** with repositories outside the enterprise
- This is intentional — it prevents data leakage and ensures all work stays within enterprise governance boundaries
- The challenge: enterprises still need to consume open source packages and source code

### EMU Interaction Restrictions

| Action | EMU Managed User |
|--------|:----------------:|
| View public repositories | ✓ |
| Star / Watch public repos | ✗ |
| Fork external repos | ✗ |
| Open issues / PRs on external repos | ✗ |
| Comment on external repos | ✗ |
| Push code to external repos | ✗ |
| Create repos within enterprise orgs | ✓ |
| Fork repos within enterprise | ✓ |

> **Note**: These restrictions apply to all managed user accounts. They cannot be selectively disabled. This is by design to maintain the enterprise security boundary.

### Why These Restrictions Exist

```
┌──────────────────────────────────────────────────────────┐
│                    Enterprise Boundary                    │
│                                                          │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐           │
│   │  Org A   │   │  Org B   │   │  Org C   │           │
│   │ (teams)  │   │ (teams)  │   │ (teams)  │           │
│   └──────────┘   └──────────┘   └──────────┘           │
│                                                          │
│   EMU users can collaborate freely WITHIN this boundary  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│   ✗ No interaction with repos OUTSIDE this boundary      │
│   ✗ No forking external repos into the enterprise        │
│   ✓ Can VIEW public repos (read-only)                    │
└──────────────────────────────────────────────────────────┘
```

### Discussion Points

- How does your organization currently consume open source software?
- What approval or vetting processes exist for new open source dependencies?
- Have you encountered friction from EMU restrictions when developers need external packages or source code?

---

## 2. Enterprise Operating Model for OSS (10 min)

### Key Points

- A governed OSS intake model replaces ad-hoc dependency adoption with a consistent, auditable process
- Dedicated organizations within the enterprise separate OSS governance from product development
- Three patterns address different consumption needs — choose one or combine as needed

### Recommended Organization Layout

```
┌─────────────────────────────────────────────────────────────┐
│                     Enterprise                              │
│                                                             │
│   ┌─────────────────┐  ┌──────────────────┐                │
│   │   oss-intake     │  │   oss-mirrors    │                │
│   │                 │  │                  │                │
│   │  • Governance   │  │  • Approved repo │                │
│   │  • Approvals    │  │    mirrors       │                │
│   │  • Policies     │  │  • Automated     │                │
│   │  • Allowlists   │  │    sync jobs     │                │
│   └─────────────────┘  └──────────────────┘                │
│                                                             │
│   ┌─────────────────┐  ┌──────────────────┐                │
│   │   oss-public     │  │  product-org-*   │                │
│   │  (optional)     │  │                  │                │
│   │                 │  │  • Product code  │                │
│   │  • Public forks │  │  • Consumes from │                │
│   │  • Upstream PRs │  │    oss-mirrors   │                │
│   │  (PMA managed)  │  │    & registries  │                │
│   └─────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Approval Criteria (Example)

Define internal criteria for approving OSS for enterprise use:

| Criterion | Threshold |
|-----------|-----------|
| **License** | Must be on approved license allowlist (MIT, Apache 2.0, BSD, etc.) |
| **Maintenance** | Active commits within last 12 months |
| **Vulnerabilities** | No unpatched Critical/High CVEs |
| **Popularity** | Minimum star count or download threshold (context-dependent) |
| **Alternatives** | Evaluate if an internal solution or approved alternative exists |

### Three Patterns — Decision Guide

| Pattern | Use When | Complexity |
|---------|----------|:----------:|
| **1. Package Consumption** | You consume packages (npm, Maven, NuGet, PyPI, containers) | 🟢 Low |
| **2. Source Mirroring** | You need source code for vendoring, patching, building, scanning | 🟡 Medium |
| **3. Upstream Contributions (PMA)** | You contribute back to upstream open source projects | 🔴 High |

### Discussion Points

- Does your organization have a formal OSS approval process today?
- Who owns the decision to adopt a new open source dependency — individual developers, team leads, or a central team?
- How do you handle license compliance for open source in your products?

---

## 3. Scenario 1 — Package Consumption with Dependabot (20 min)

### Key Points

- Most enterprise OSS consumption is through **packages** — npm, Maven, NuGet, PyPI, container base images
- Dependabot provides three layers: vulnerability **alerts**, automated **security updates**, and scheduled **version updates**
- Dependabot supports private registries, enabling enterprises to proxy or host packages internally
- Dependency Review enforces license and vulnerability policies at PR time

### How It Works

```
┌────────────────────────────────────────────────────────────┐
│            Package Consumption Flow (EMU)                   │
│                                                            │
│   Public Registry          Internal Registry / Proxy       │
│   (npmjs.com, etc.)        (Artifactory, Nexus, etc.)     │
│        │                          │                        │
│        └─────────┬────────────────┘                        │
│                  │                                         │
│                  ▼                                         │
│        ┌─────────────────┐                                 │
│        │  Dependabot      │                                │
│        │  (configured via │                                │
│        │  dependabot.yml) │                                │
│        └────────┬────────┘                                 │
│                 │                                          │
│        ┌────────┴────────┐                                 │
│        ▼                 ▼                                 │
│   Security Update    Version Update                        │
│   PRs (vuln fix)     PRs (new version)                     │
│        │                 │                                 │
│        └────────┬────────┘                                 │
│                 ▼                                          │
│        Dependency Review                                   │
│        (license + vuln gate)                               │
│                 │                                          │
│                 ▼                                          │
│        Merge → Deploy                                      │
└────────────────────────────────────────────────────────────┘
```

### Dependabot Configuration

**Step 1 — Enable Dependabot at the organization level**

Navigate: Organization → Settings → Code security and analysis → Enable Dependabot alerts + security updates

**Step 2 — Configure version updates per repository**

Create `.github/dependabot.yml` in each repository:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

**Step 3 — Configure private registry access (if applicable)**

```yaml
version: 2
registries:
  npm-internal:
    type: npm-registry
    url: https://npm.internal.example.com
    token: ${{secrets.INTERNAL_NPM_TOKEN}}
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    registries:
      - npm-internal
```

**Step 4 — Scale Dependabot access to internal repositories**

- Grant Dependabot access to internal repositories at the organization level
- This is critical when your packages live in internal repos that Dependabot must resolve

> **Note**: There are two levels of governance for package consumption. **Option A — Merge-time governance** (this section — Dependabot + Dependency Review) enforces policy when a developer opens a PR; no additional infrastructure required. **Option B — Download-time governance** (an artifact proxy such as Azure Artifacts, Artifactory, or Nexus) blocks unapproved packages before they ever reach a developer machine or CI runner, and caches packages for offline/air-gapped builds. The two approaches are complementary — most enterprises start with Option A to get immediate visibility and enforcement, then add Option B when they need download-time blocking or offline caching. For a full comparison and proxy tool selection guide, see the [Artifact Proxy Setup Guide](ghe-emu-artifact-setup.md).

> **Note**: GitHub Packages is for publishing and consuming **internal** packages (shared libraries, SDKs). It does not proxy public registries like npmjs.com or nuget.org. For proxying public packages, use Azure Artifacts, Artifactory, or Nexus.

### Dependency Review Gate

Add a PR workflow that blocks merges if new dependencies introduce vulnerabilities or disallowed licenses:

```yaml
name: Dependency Review
on: [pull_request]
permissions:
  contents: read
jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: critical
          deny-licenses: LGPL-2.0, BSD-2-Clause
```

### Pros / Cons

| ✅ Pros | ✗ Cons |
|---------|--------|
| Automated PRs for vulnerable and outdated dependencies | Requires private registry strategy if proxying packages |
| EMU users stay fully inside enterprise boundary | Dependabot must be able to resolve all dependencies in some ecosystems |
| Scales across many repositories with org-level enablement | Initial configuration effort per ecosystem |
| License + vulnerability enforcement via Dependency Review | Dependency Review requires GHAS license for private repos |

### 🖥️ Demo: Dependabot Configuration

1. Navigate to Organization → Settings → Code security and analysis
2. Show Dependabot alerts and security updates enablement
3. Open a test repository with a `dependabot.yml` file
4. Walk through an open Dependabot PR — show changelog, compatibility score, and diff
5. Show Dependency Review action results on a PR with a flagged license

### Discussion Points

- What package ecosystems does your organization primarily use?
- Do you currently use a private registry or artifact proxy (Artifactory, Nexus, Azure Artifacts)?
- How do you handle transitive dependency vulnerabilities today?

---

## 4. Scenario 2 — Source Mirroring (20 min)

### Key Points

- Some use cases require the **source code itself** inside the enterprise — vendoring, patching, building from source, or offline builds
- EMU prevents forking external repos, so the pattern is: **bare clone → push mirror → scheduled sync**
- A dedicated mirror organization keeps upstream mirrors separate from product code
- Supply chain checks (Dependabot, Dependency Review) should be applied to mirrored repos

### Mirror Architecture

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   Public GitHub                Enterprise (EMU)          │
│                                                          │
│   ┌──────────────┐           ┌──────────────────┐       │
│   │ upstream/repo │ ──fetch── │ oss-mirrors/repo │       │
│   └──────────────┘   (cron)  └────────┬─────────┘       │
│                                       │                  │
│                                       │ reference        │
│                                       ▼                  │
│                              ┌──────────────────┐       │
│                              │ product-org/app  │       │
│                              │ (consumes mirror) │       │
│                              └──────────────────┘       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Process (Step-by-Step)

**Step 1 — Create the initial mirror**

```bash
# Create a mirrored clone of the upstream repository
git clone --mirror https://github.com/UPSTREAM/REPO.git
cd REPO.git

# Set the push URL to your enterprise mirror repository
git remote set-url --push origin https://github.com/ENTERPRISE-ORG/REPO-MIRROR.git

# Push the initial mirror
git push --mirror
```

**Step 2 — Automate upstream refresh**

Schedule a job (GitHub Actions, cron, CI system) to periodically sync:

```bash
# Run on a schedule (e.g., nightly or weekly)
cd REPO.git
git fetch -p origin
git push --mirror
```

Example GitHub Actions workflow for automated sync:

```yaml
name: Mirror Sync
on:
  schedule:
    - cron: '0 2 * * 1'  # Weekly on Monday at 2 AM
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Clone mirror
        run: |
          git clone --mirror https://github.com/UPSTREAM/REPO.git
          cd REPO.git
          git remote set-url --push origin https://github.com/ENTERPRISE-ORG/REPO-MIRROR.git
          git push --mirror
```

> **Note**: The sync workflow needs write access to the mirror repository. For permanent automation, use a **GitHub App** with `Contents: Read and write` permissions — it generates short-lived installation tokens at runtime and isn't tied to an individual user account. Store the App ID and private key as organization secrets.

**Step 3 — Consumers reference the internal mirror**

Developers use `oss-mirrors/<repo>` as the source of truth. This avoids any external fork interactions.

**Step 4 — Apply supply chain checks to mirrors**

- Enable Dependabot alerts on mirrored repos (if they contain manifests/lockfiles)
- Add Dependency Review to downstream repos that consume mirrored code

### Pros / Cons

| ✅ Pros | ✗ Cons |
|---------|--------|
| Full source code inside enterprise boundary | You own the sync automation and monitoring |
| Works cleanly with EMU fork restrictions | Mirrors can drift if sync jobs fail silently |
| Enables vendoring, patching, and offline builds | Each mirrored repo requires setup and maintenance |
| Can apply GHAS scanning to mirrored source | Does not support contributing back upstream |

### 🖥️ Demo: Repository Mirroring

1. Show the `oss-mirrors` organization structure
2. Walk through the `git clone --mirror` and `git push --mirror` commands
3. Show a GitHub Actions workflow that automates the sync schedule
4. Navigate to a mirrored repo and show Dependabot alerts on mirrored dependencies

### Discussion Points

- Which upstream repositories would you need to mirror for vendoring or patching?
- Do you have offline or air-gapped build environments that require local source?
- What's your tolerance for mirror staleness — daily sync, weekly, or on-demand?

---

## 5. Scenario 3 — Upstream Contributions with PMA (15 min)

### Key Points

- Some enterprises want to contribute back to open source — bug fixes, features, documentation
- EMU users cannot interact with public repos, so standard fork-and-PR workflows don't work
- The GitHub **Private Mirrors App (PMA)** provides a "private first, publish approved only" workflow
- PMA is an open-source GitHub App that manages the airlock between internal review and public contribution

### PMA Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   Public GitHub                 Enterprise (EMU)             │
│                                                              │
│   ┌──────────────┐            ┌───────────────────┐         │
│   │ upstream/repo │            │ oss-private-mirrors│         │
│   └──────┬───────┘            │ /repo-mirror       │         │
│          │                    │ (internal review)  │         │
│          │                    └────────┬──────────┘         │
│          │                             │                     │
│          │                     PMA sync (approved only)      │
│          │                             │                     │
│          │     ┌──────────────┐        │                     │
│          │     │ oss-public/  │◄───────┘                     │
│          │     │ repo-fork    │                               │
│          │     └──────┬───────┘                               │
│          │            │                                       │
│          ◄────────────┘                                       │
│        Upstream PR                                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### PMA Workflow

| Step | Action | Where |
|------|--------|-------|
| 1 | Fork upstream into the org namespace | `oss-public` org |
| 2 | PMA creates a private mirror of the fork | `oss-private-mirrors` org |
| 3 | Developers work in the private mirror | Internal PRs, code review, security/legal gates |
| 4 | Approved changes synced to public fork | PMA syncs default branch → public fork branch |
| 5 | Open PR to upstream | From `oss-public/fork` to `upstream/repo` |

### Internal Review Gates

Before any code becomes public, enforce:

- **Code review** — standard PR review within the private mirror
- **Security scan** — GHAS code scanning and secret scanning
- **License compliance** — Dependency Review action for license gates
- **Legal/IP review** — custom approval workflow if required by policy

### Pros / Cons

| ✅ Pros | ✗ Cons |
|---------|--------|
| Purpose-built "private first, publish approved only" workflow | Requires deploying and maintaining PMA (self-hosted GitHub App) |
| Enables compliant upstream contributions under EMU constraints | Additional org boundary and access management complexity |
| Internal review gates ensure security/legal sign-off before publication | PMA is currently in public beta |
| All contribution history stays auditable within the enterprise | Requires dedicated admin to manage the PMA lifecycle |

### 🖥️ Demo: Private Mirrors App Overview

1. Show the PMA repository on GitHub: `github-community-projects/private-mirrors`
2. Walk through the PMA documentation and installation requirements
3. Demonstrate the mirror creation flow (or show documentation screenshots)
4. Explain the sync workflow from private mirror → public fork → upstream PR

### Discussion Points

- Does your organization currently contribute to open source projects?
- What legal or IP review processes would need to be in place before public contributions?
- Would a "private airlock" model like PMA address your compliance concerns?

---

## 6. Rollout Strategy & Wrap-Up (10 min)

### Key Points

- Start with the simplest pattern that meets your needs — most enterprises begin with package consumption
- Layer on source mirroring only for repos where you need the actual source code
- PMA is for organizations that explicitly want to contribute upstream

### Recommended Rollout Phases

| Phase | Pattern | Actions |
|-------|---------|---------|
| **Phase 1** (Week 1–2) | Package Consumption | Enable Dependabot alerts + security updates enterprise-wide. Deploy Dependency Review action on key repos |
| **Phase 2** (Week 3–4) | Package Consumption (advanced) | Configure `dependabot.yml` for version updates. Set up private registry access if needed |
| **Phase 3** (Month 2) | Source Mirroring | Create `oss-mirrors` org. Mirror top 5–10 critical upstream repos. Set up automated sync |
| **Phase 4** (Month 3+) | Upstream Contributions | Evaluate PMA if contribution is a business requirement. Pilot with one upstream project |

### Pattern Selection Flowchart

```
Do you need the upstream SOURCE CODE inside your enterprise?
    │
    ├── NO → Do you consume PACKAGES from public registries?
    │           │
    │           ├── YES → Scenario 1: Package Consumption (Dependabot)
    │           │
    │           └── NO → No action needed (EMU default is sufficient)
    │
    └── YES → Do you need to CONTRIBUTE BACK upstream?
                │
                ├── NO → Scenario 2: Source Mirroring
                │
                └── YES → Scenario 3: PMA (Private Mirrors App)
```

### Communicating to Stakeholders

Frame the conversation around **why** governed intake matters:

- EMU restrictions are a **feature, not a bug** — they prevent data leakage and ensure governance
- The standard enterprise pattern is **governed intake + internal mirroring**, not enabling public interactions
- This approach gives security and compliance teams **auditability** over all OSS entering the enterprise
- Developers still get access to the OSS they need — through a consistent, approved channel

### Action Items Checklist

After this workshop, your team should:

- [ ] Define OSS approval criteria (license allowlist, vulnerability thresholds, maintenance requirements)
- [ ] Create the `oss-intake` organization for governance artifacts and policies
- [ ] Enable Dependabot alerts and security updates across all organizations
- [ ] Deploy the Dependency Review action on repositories with external dependencies
- [ ] Identify the top upstream repositories that need source mirroring
- [ ] Create the `oss-mirrors` organization and set up initial mirrors with automated sync
- [ ] Evaluate whether upstream contribution (PMA) is a business requirement
- [ ] Document and communicate the OSS intake process to engineering teams

### Discussion Points

- Which pattern addresses your most immediate need?
- What's the biggest barrier to implementing governed OSS intake in your organization?
- Who should own the OSS intake process — platform engineering, security, or a dedicated OSS program office?

---

## Appendix: Key URLs

> **Note**: GitHub's UI is regularly updated. The URLs below reflect the current structure. Verify against the live UI as GitHub periodically updates navigation.

| Resource | URL |
|----------|-----|
| EMU Abilities & Restrictions | <https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/understanding-iam-for-enterprises/abilities-and-restrictions-of-managed-user-accounts> |
| Fork a Repository (EMU note) | <https://docs.github.com/en/enterprise-cloud@latest/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo> |
| Duplicating / Mirroring Repos | <https://docs.github.com/en/enterprise-cloud@latest/repositories/creating-and-managing-repositories/duplicating-a-repository> |
| Private Mirrors App (PMA) | <https://github.com/github-community-projects/private-mirrors> |
| PMA Announcement (Public Beta) | <https://github.blog/changelog/2024-07-25-github-private-mirrors-app-public-beta/> |
| Dependabot Version Updates | <https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/supply-chain-security/about-dependabot-version-updates> |
| Dependabot Options Reference | <https://docs.github.com/enterprise-cloud@latest/code-security/dependabot/working-with-dependabot/dependabot-options-reference> |
| Dependency Review Action | <https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/configuring-the-dependency-review-action> |
| Enterprise Repository Policies | <https://docs.github.com/en/enterprise-cloud@latest/admin/policies/enforcing-policies-for-your-enterprise/enforcing-repository-management-policies-in-your-enterprise> |

## Appendix: Pattern Comparison Matrix

| Capability | Scenario 1: Packages | Scenario 2: Source Mirror | Scenario 3: PMA |
|------------|:--------------------:|:-------------------------:|:----------------:|
| Consumes packages | ✓ | | |
| Source code inside enterprise | | ✓ | ✓ |
| Automated vulnerability alerts | ✓ | ✓ | ✓ |
| Automated update PRs | ✓ | | |
| Upstream sync automation | | ✓ | ✓ |
| Upstream contribution | | | ✓ |
| Private internal review | | ✓ | ✓ |
| Setup complexity | 🟢 Low | 🟡 Medium | 🔴 High |
| Ongoing maintenance | 🟢 Low | 🟡 Medium | 🔴 High |

## Appendix: Pre-Workshop Checklist

Run through this before the workshop:

- [ ] Verify enterprise owner or organization owner access
- [ ] Confirm EMU is enabled on the enterprise
- [ ] Have at least one organization with Dependabot enabled
- [ ] Create a test repository with a `dependabot.yml` and known outdated dependencies
- [ ] Prepare a mirrored repository example (or have the `git clone --mirror` commands ready)
- [ ] Bookmark the PMA repository and documentation
- [ ] Verify Dependency Review action is configured on at least one test repo
- [ ] Bookmark all demo URLs in a dedicated browser folder
- [ ] Prepare backup screenshots for each demo section
- [ ] Test screen sharing shows GitHub UI clearly

### Backup Plan

If live demos fail:

1. Use screenshots captured during prep
2. Switch to GitHub Docs walkthrough for the relevant section
3. Engage audience with Q&A while troubleshooting
4. Use the reference URLs in the appendix as a guided tour

---

*Workshop materials for GitHub Enterprise EMU + Open Source Consumption training*
