# GitHub + Azure DevOps Integration Workshop Guide

**Duration**: 45–60 minutes  
**Format**: Presentation + Discussion + Architecture Diagrams  
**Audience**: Enterprise Admins, IT Decision Makers, Engineering Managers, Tech Leads  
**Focus**: Azure DevOps Integration as an Add-On Layer to GitHub Enterprise  
**Prerequisite**: Familiarity with GitHub Enterprise architecture patterns (EMU, Multi-Org, Mixed Cloud + GHES)

---

## Workshop Overview

This workshop explores how to layer Azure DevOps (ADO) integration on top of an existing GitHub Enterprise architecture. ADO integration is **not a standalone architecture** — it augments whichever base GitHub pattern your organization has chosen (EMU, Multi-Org, or Mixed Cloud + GHES). This session covers the "better together" thesis, key integration points, decision criteria, and practical setup guidance.

### Learning Objectives

After completing this workshop, participants will be able to:

- Explain how Azure DevOps integration layers on top of a base GitHub architecture
- Understand the "better together" thesis and the capability split between GitHub and ADO
- Configure AB# linking between GitHub and Azure DevOps Boards
- Evaluate when ADO integration adds value vs. when to go all-in on GitHub
- Plan a gradual migration path from ADO to GitHub

### Workshop Agenda

| # | Section | Time | Focus |
|---|---------|------|-------|
| 1 | ADO as an Integration Layer | 10 min | Framing, "why coexistence," capability mapping |
| 2 | Integration Architecture & AB# Linking | 15 min | Architecture diagram, AB# workflow, ADO Pipelines with GitHub repos |
| 3 | Capability Matrix & Decision Framework | 10 min | "What goes where," pros/cons/requirements, when to add/skip |
| 4 | Q&A & Discussion | 10 min | Open discussion, organization-specific questions |

---

## 1. ADO as an Integration Layer (10 min)

### Key Concept

**ADO integration is NOT a standalone architecture.** Azure DevOps integration sits **on top of** whichever base GitHub architecture you chose:

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

### Discussion Points
- What percentage of your development workflow currently lives in Azure DevOps?
- Which ADO capabilities are most critical to preserve during a GitHub adoption?

---

## 2. Integration Architecture & AB# Linking (15 min)

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                       DEVELOPER WORKFLOW                             │
│                                                                      │
│   ┌─────────────────────────────────┐  ┌──────────────────────────────┐ │
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

### Example Developer Workflow

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

### Discussion Points
- Are your teams currently using AB# linking? If not, what's the barrier?
- How many ADO pipelines would need to build from GitHub repos during the transition?

---

## 3. Capability Matrix & Decision Framework (10 min)

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
|---------|--------|-----------------|
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

## 4. Q&A & Discussion (10 min)

### Guided Discussion Questions

1. **Current State**: What's your current split between GitHub and Azure DevOps?
2. **Migration Appetite**: Is your goal coexistence long-term, or gradual full migration to GitHub?
3. **Copilot Priority**: Is AI-assisted development a key driver for your GitHub adoption?
4. **Stakeholder Impact**: How will project managers and non-developer stakeholders be affected?
5. **Timeline**: What's your target timeline for the integration setup?

### Recommended Next Steps

- [ ] **Pilot AB# linking** — Install the Azure Boards GitHub App on a pilot org and test AB# linking with a small team
- [ ] **Audit ADO usage** — Identify which ADO services are actively used (Boards, Pipelines, Test Plans, Artifacts, Repos)
- [ ] **Define "what goes where"** — Use the capability matrix to create a clear division of responsibility
- [ ] **Set up shared identity** — Ensure Entra ID SSO is configured for both GitHub and Azure DevOps
- [ ] **Plan pipeline migration** — For new projects, start with GitHub Actions; for existing, create a phased migration plan
- [ ] **Build unified reporting** — If needed, set up Power BI dashboards that pull from both GitHub and ADO

---

## Appendix

### A. Key URLs

| Resource | URL |
|----------|-----|
| Azure Boards + GitHub Integration | `https://learn.microsoft.com/en-us/azure/devops/boards/github/` |
| Azure Boards GitHub App | `https://github.com/marketplace/azure-boards` |
| ADO Service Connections | `https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints` |
| GitHub Actions Migration from ADO Pipelines | `https://docs.github.com/en/actions/migrating-to-github-actions/migrating-from-azure-pipelines-to-github-actions` |

### B. ADO + GitHub Integration Setup Checklist

- [ ] Azure Boards GitHub App installed on GitHub org
- [ ] ADO project connected to GitHub org
- [ ] AB# linking tested (commit + PR)
- [ ] State transition rules configured (e.g., `Fixes AB#` → Done)
- [ ] Service connection created in ADO for GitHub (if using ADO Pipelines with GH repos)
- [ ] Entra ID SSO configured for both GitHub and Azure DevOps
- [ ] Team trained on AB# syntax and workflow
- [ ] Reporting dashboard built to span both platforms (Power BI or similar)

### C. Backup Plan

If the presentation tool fails:
1. Share the slide deck as a Markdown file or PDF
2. Use this workshop document as a reference for discussion
3. Focus on the capability matrix (Section 3) and pros/cons table
4. Drive discussion with the guided questions in Section 4

*Workshop guide for GitHub + Azure DevOps Integration Workshop*
