# GitHub + Azure DevOps Integration

## Slide Deck — Presenter Guide

**Duration**: 45–60 minutes  
**Format**: Presentation + Discussion + Architecture Diagrams  
**Audience**: Enterprise Admins, IT Decision Makers, Engineering Managers, Tech Leads  
**Focus**: Azure DevOps Integration as an Add-On Layer to GitHub Enterprise  
**Prerequisite**: Familiarity with GitHub Enterprise architecture patterns (EMU, Multi-Org, Mixed Cloud + GHES)

---

## Slide 1: Title Slide

# GitHub + Azure DevOps Integration

**Layering ADO on Top of Your GitHub Enterprise Architecture**

> **Presenter Note**: *"This session is about how Azure DevOps and GitHub work together. ADO integration is not a standalone architecture — it's an add-on layer that sits on top of whichever base GitHub pattern you've chosen. We'll cover the key integration points, the capability split, and how to decide whether this add-on is right for your organization."*

---

## Slide 2: Agenda

| # | Section | Time |
|---|---------|------|
| 1 | [ADO as an Integration Layer](#section-1-ado-as-an-integration-layer) | 10 min |
| 2 | [Integration Architecture & AB# Linking](#section-2-integration-architecture--ab-linking) | 15 min |
| 3 | [Capability Matrix & Decision Framework](#section-3-capability-matrix--decision-framework) | 10 min |
| 4 | [Q&A & Discussion](#section-4-qa--discussion) | 10 min |

> **Presenter Note**: *"We have four sections. First, we'll frame how ADO fits as a layer on top of GitHub. Then we'll look at the architecture and AB# linking in detail. After that, the capability matrix and decision criteria. And we'll close with open Q&A. This session assumes you already understand the three base GitHub architecture patterns — EMU, Multi-Org, and Mixed Cloud + GHES."*

---

# SECTION 1: ADO as an Integration Layer

---

## Slide 3: ADO Is Not a Standalone Architecture

# ADO Integration = Add-On Layer

| Base Architecture | + ADO Integration = |
|-------------------|---------------------|
| 🔵 EMU Only | EMU enterprise with ADO Boards/Pipelines for work tracking and legacy CI |
| 🟢 Multi-Org | Multi-Org enterprise with ADO Boards for project management layer |
| 🟠 Mixed Cloud + GHES | Hybrid GitHub deployment with ADO for PM and existing pipelines |

**You still need a base pattern.** ADO does not replace your GitHub architecture — it augments it.

> **Presenter Note**: *"This is the key framing for the entire session. ADO integration is NOT a fourth architecture pattern — it's a layer you add on top of whatever base you chose. You could be running EMU, Multi-Org, or Mixed — the ADO add-on works with all of them. Think of it like choosing your car (base architecture) and then deciding on accessories (ADO integration)."*

---

## Slide 4: Why Coexistence?

# The "Better Together" Thesis

| Domain | Best Tool | Why |
|--------|-----------|-----|
| **Source Code** | GitHub | Developer experience, Copilot, rulesets |
| **AI Code Assistance** | GitHub Copilot | Only works with GitHub repos |
| **Security Scanning** | GitHub (GHAS) | Secret Protection + Code Security |
| **Code Review** | GitHub PRs | CODEOWNERS, review assignments |
| **CI/CD (new)** | GitHub Actions | Tight GitHub integration, marketplace |
| **Work Tracking** | ADO Boards | Custom work items, sprints, dashboards |
| **CI/CD (existing)** | ADO Pipelines | Preserve existing investment |
| **Test Management** | ADO Test Plans | No GitHub equivalent |
| **Artifacts** | ADO Artifacts | Existing feeds, universal packages |

> **Presenter Note**: *"Many enterprises have years of ADO investment — custom work items, Board queries, dashboards, pipeline YAML, test plans. The 'better together' thesis says use each tool for what it does best. GitHub wins on source code, Copilot, security scanning, and code review. ADO wins on project management, test management, and artifacts. The question is whether maintaining both is worth the complexity."*

---

# SECTION 2: Integration Architecture & AB# Linking

---

## Slide 5: Integration Architecture

# GitHub + ADO Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
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

> **Presenter Note**: *"Here's the big picture. On the left: GitHub handles source code, PRs, Copilot, security scanning, and Actions for new CI/CD. On the right: ADO handles Boards (work tracking), Test Plans, Artifacts, and existing Pipelines. The connecting tissue is AB# linking between GitHub repos and ADO work items, and Entra ID for shared identity. Notice both live under one developer workflow — the goal is minimal context-switching."*

---

## Slide 6: AB# Linking Deep Dive

# AB# Linking — GitHub ↔ ADO

| Aspect | Detail |
|--------|--------|
| **Syntax** | `AB#12345` in commit messages, PR descriptions, or issue descriptions |
| **How it works** | GitHub webhook → ADO creates hyperlink on work item |
| **Setup** | Install **Azure Boards** GitHub App |
| **Direction** | GitHub → ADO (commits, PRs, branches → work items) |
| **State transitions** | `Fixes AB#12345` → auto-moves work item to Done (default branch merges only) |
| **Visibility** | ADO work items show linked GitHub PRs, commits, and branches |

> **Note**: `AB#` in PR titles or comments does **not** create a link — only commit messages, PR descriptions, and issue descriptions.

> **Presenter Note**: *"AB# linking is the primary integration point. Developers type AB# followed by the work item number in their commit messages or PR descriptions. GitHub sends a webhook to ADO, which creates a link on the work item. You can even configure state transitions — so 'Fixes AB#4567' in a PR merged to main automatically moves the work item to Done. The key limitation: it only works in commit messages, PR descriptions, and issue descriptions — not in PR titles or comments."*

---

## Slide 7: Developer Workflow Example

# AB# in Practice

```
1. Developer picks up work item AB#4567 in ADO Boards
2. Creates branch in GitHub: feature/AB4567-add-login
3. Commits: "Add OAuth login flow AB#4567"
4. Opens PR in GitHub referencing AB#4567
   → ADO work item shows the linked PR
5. Code review + CI happen entirely in GitHub
6. PR merged → ADO work item auto-transitions to "Done"
7. PM sees completed work in ADO Boards dashboard
```

> **Presenter Note**: *"Here's what the daily workflow looks like. Developer starts in ADO Boards, works in GitHub, and the link flows back. Project managers never have to leave ADO Boards. Developers rarely have to leave GitHub. That's the 'better together' experience."*

---

## Slide 8: ADO Pipelines with GitHub Repos

# ADO Pipelines + GitHub Repos

**ADO Pipelines can build from GitHub repos via service connection.**

Setup:
1. **Project Settings** → **Service Connections** → **New** → **GitHub**
2. Auth: GitHub App (recommended), OAuth, or PAT
3. Reference GitHub repo in pipeline YAML

```yaml
resources:
  repositories:
    - repository: my-github-repo
      type: github
      endpoint: 'my-github-service-connection'
      name: 'contoso/my-app'
```

> **Note**: For new projects, consider starting with GitHub Actions. Migrate ADO Pipelines gradually.

> **Presenter Note**: *"If you have existing ADO Pipelines you're not ready to migrate, they can still build from GitHub repos. You set up a service connection, point the pipeline YAML at the GitHub repo, and you're done. But for new projects, we recommend starting with GitHub Actions — it's natively integrated and reduces context-switching."*

---

# SECTION 3: Capability Matrix & Decision Framework

---

## Slide 9: What Goes Where

# Capability Matrix

| Capability | GitHub ✅ | Azure DevOps ✅ | Recommendation |
|------------|-----------|------------------|----------------|
| **Source Code** | ✅ Primary | ⚠️ Legacy | New repos → GitHub; migrate gradually |
| **Code Review** | ✅ PRs | N/A | All review in GitHub |
| **AI Assistance** | ✅ Copilot | ✗ | Copilot requires GitHub |
| **Security** | ✅ GHAS | ⚠️ Defender | GHAS for comprehensive coverage |
| **CI/CD** | ✅ Actions (new) | ✅ Pipelines (existing) | New → Actions; existing → migrate |
| **Work Tracking** | ⚠️ Issues | ✅ Boards | ADO Boards for enterprise PM |
| **Test Mgmt** | ✗ | ✅ Test Plans | ADO — no GitHub equivalent |
| **Artifacts** | ⚠️ Packages | ✅ Artifacts | Use your standard |

> **Presenter Note**: *"This is your cheat sheet for 'what goes where.' The left side is where GitHub wins. The right side is where ADO wins. The recommendation column tells you the pragmatic path. Notice the asymmetry — GitHub wins on developer tools, ADO wins on project management tools. That's why the 'better together' approach works."*

---

## Slide 10: Pros, Cons & Requirements

# ADO Integration — Trade-offs

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|-----------------|
| Best of both platforms | Dual admin & cost | GHEC license |
| Copilot + GHAS without full migration | AB# is GitHub → ADO only | ADO org + project |
| Preserve ADO Boards investment | Developer context-switching | Azure Boards GitHub App |
| Gradual migration path | Split audit logging | Entra ID SSO (recommended) |
| Shared identity via Entra ID | Governance in two places | Service connection (if Pipelines) |
| Works with ANY base architecture | Dual license cost | AB# workflow training |

> **Presenter Note**: *"The pros are compelling — you get Copilot and GHAS without a big-bang migration. The cons are real too — you're operating two platforms, so admin, training, cost, and governance all double. The requirements column is your checklist — if you decide to go this route, make sure all of these are in place."*

---

## Slide 11: When to Add / When to Skip

# Decision Criteria

**✅ Add ADO integration when:**
- Significant ADO Boards investment (custom work items, queries, dashboards)
- Want Copilot + GHAS without disrupting existing workflows
- Gradual migration from ADO Repos to GitHub
- PMs and stakeholders live in ADO Boards
- ADO Test Plans are critical and can't be replaced
- Already on Entra ID for SSO

**⚠️ Skip ADO integration if:**
- Starting fresh — go all-in on GitHub
- GitHub Projects V2 can replace ADO Boards
- Dual platform cost exceeds one-time migration cost
- Developers strongly prefer a single tool

> **Presenter Note**: *"This is the key decision slide. On the left: reasons to layer ADO on top of GitHub. On the right: reasons to skip it and go GitHub-only. The most common answer I see is 'add it for now, plan to converge later.' That's a valid strategy as long as you actually execute the convergence plan."*

---

# SECTION 4: Q&A & Discussion

---

## Slide 12: Discussion Questions

# Q&A & Discussion

1. **Current State**: What's your current split between GitHub and Azure DevOps?
2. **Migration Appetite**: Coexistence long-term, or gradual full migration?
3. **Copilot Priority**: Is AI-assisted development a key driver?
4. **Stakeholder Impact**: How will PMs and non-developers be affected?
5. **Timeline**: What's your target timeline for integration setup?

> **Presenter Note**: *"Let's open it up. These questions are designed to help you self-assess whether ADO integration is right for your situation. We can also dig into any specific technical questions about AB# linking, pipeline setup, or migration planning."*

---

## Slide 13: Resources

# Key Resources

| Resource | URL |
|----------|-----|
| Azure Boards + GitHub Integration | `https://learn.microsoft.com/en-us/azure/devops/boards/github/` |
| Azure Boards GitHub App | `https://github.com/marketplace/azure-boards` |
| ADO Service Connections | `https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints` |
| GitHub Actions Migration Guide | `https://docs.github.com/en/actions/migrating-to-github-actions/migrating-from-azure-pipelines-to-github-actions` |

> **Presenter Note**: *"Here are the key resources. The Azure Boards GitHub integration docs are your primary reference. The Actions migration guide is excellent if you're planning to move pipelines over time."*

---

## Slide 14: Thank You

# Thank You!

**Questions? Let's discuss your specific scenario.**

> **Presenter Note**: *"Thank you everyone. Happy to stay for any follow-up questions about your specific ADO + GitHub integration needs."*

---

# APPENDIX

## Appendix A: ADO + GitHub Integration Setup Checklist

- [ ] Azure Boards GitHub App installed on GitHub org
- [ ] ADO project connected to GitHub org
- [ ] AB# linking tested (commit + PR)
- [ ] State transition rules configured (e.g., `Fixes AB#` → Done)
- [ ] Service connection created in ADO for GitHub (if using ADO Pipelines with GH repos)
- [ ] Entra ID SSO configured for both GitHub and Azure DevOps
- [ ] Team trained on AB# syntax and workflow
- [ ] Reporting dashboard built to span both platforms (Power BI or similar)

## Appendix B: ADO Service Connection Setup

**Steps to create a GitHub service connection in Azure DevOps:**

1. Navigate to **Project Settings** → **Service connections**
2. Click **New service connection** → Select **GitHub**
3. Choose authentication method:
   - **GitHub App** (recommended) — most secure, org-level
   - **OAuth** — user-level, requires re-auth on token expiry
   - **PAT** — simplest but least secure, scoped to one user
4. Authorize and name the connection
5. Reference in pipeline YAML: `endpoint: 'connection-name'`
6. Test by running a pipeline that checks out a GitHub repo

## Appendix C: Backup Plan

If the presentation tool fails:
1. Share the slide deck as a Markdown file or PDF
2. Use the companion workshop document as a reference for discussion
3. Focus on the capability matrix (Slide 9) and pros/cons (Slide 10)
4. Drive discussion with the questions in Slide 12

*Slide deck for GitHub + Azure DevOps Integration Workshop*
