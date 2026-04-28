---
theme: ../../themes/github
title: "GitHub + Azure DevOps Integration"
info: |
  How to layer Azure DevOps integration on top of your GitHub Enterprise architecture.
  Covers the "better together" thesis, AB# linking, Copilot + ADO Boards, and decision criteria.
ghFooterTitle: "GitHub + ADO Integration"
ghFooterLabel: ""
drawings:
  persist: false
mermaid:
  theme: dark
transition: slide-left
mdc: true
layout: cover
---
<!-- markdownlint-disable -->

# GitHub + Azure DevOps Integration

## Layering ADO on Top of Your GitHub Enterprise Architecture

*Better Together · AB# Linking · Copilot + ADO Boards · Decision Framework*

<!--
"This session is about how Azure DevOps and GitHub work together. ADO integration is not a standalone architecture — it's an add-on layer that sits on top of whichever base GitHub pattern you've chosen. We'll cover the key integration points, the capability split, and how to decide whether this add-on is right for your organization."
-->

---
class: text-xs
---

# What We'll Cover Today

| Time | Topic |
|------|-------|
| **Section 1** | **ADO as an Integration Layer (10 min)** |
| | Framing, "why coexistence," capability mapping |
| **Section 2** | **Integration Architecture & Key Features (20 min)** |
| | AB# linking, Copilot + ADO Boards, PR insights, Pipelines |
| **Section 3** | **Security, Governance & Connection Overview (10 min)** |
| | Data flow, permissions, auth options, troubleshooting |
| **Section 4** | **Capability Matrix & Decision Framework (10 min)** |
| | "What goes where," pros/cons, when to add/skip |
| **Section 5** | **Q&A & Discussion (10 min)** |
| | Open discussion, your specific scenario |

<!--
"Five sections. We start with framing, dive into the features, cover security and governance, look at the decision framework, and close with open Q&A. This session assumes you already understand the three base GitHub architecture patterns — EMU, Multi-Org, and Mixed Cloud + GHES."
-->

---

# SECTION 1: ADO as an Integration Layer

---

# ADO Integration = Add-On Layer

| Base Architecture | + ADO Integration = |
|-------------------|---------------------|
| 🔵 EMU Only | EMU enterprise with ADO Boards/Pipelines for work tracking and legacy CI |
| 🟢 Multi-Org | Multi-Org enterprise with ADO Boards for project management layer |
| 🟠 Mixed Cloud + GHES | Hybrid GitHub deployment with ADO for PM and existing pipelines |

**You still need a base pattern.** ADO does not replace your GitHub architecture — it augments it.

<!--
"This is the key framing for the entire session. ADO integration is NOT a fourth architecture pattern — it's a layer you add on top of whatever base you chose. You could be running EMU, Multi-Org, or Mixed — the ADO add-on works with all of them. Think of it like choosing your car (base architecture) and then deciding on accessories (ADO integration)."
-->

---
class: text-xs
---

# The "Better Together" Thesis

| Domain | Best Tool | Why |
|--------|-----------|-----|
| **Source Code** | GitHub | Developer experience, Copilot, rulesets |
| **AI Code Assistance** | GitHub Copilot | Works with GitHub repos; ADO Boards can delegate work items |
| **Security Scanning** | GitHub (GHAS) | Secret Protection + Code Security |
| **Code Review** | GitHub PRs | CODEOWNERS, review assignments |
| **CI/CD (new)** | GitHub Actions | Tight GitHub integration, marketplace |
| **Work Tracking** | ADO Boards | Custom work items, sprints, dashboards |
| **CI/CD (existing)** | ADO Pipelines | Preserve existing investment |
| **Test Management** | ADO Test Plans | No GitHub equivalent |
| **Artifacts** | ADO Artifacts | Existing feeds, universal packages |

<!--
"Many enterprises have years of ADO investment — custom work items, Board queries, dashboards, pipeline YAML, test plans. The 'better together' thesis says use each tool for what it does best. GitHub wins on source code, Copilot, security scanning, and code review. ADO wins on project management, test management, and artifacts. The question is whether maintaining both is worth the complexity."
-->

---

# SECTION 2: Integration Architecture & Key Features

---

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

<!--
"Here's the big picture. On the left: GitHub handles source code, PRs, Copilot, security scanning, and Actions for new CI/CD. On the right: ADO handles Boards (work tracking), Test Plans, Artifacts, and existing Pipelines. The connecting tissue is AB# linking between GitHub repos and ADO work items, and Entra ID for shared identity. Notice both live under one developer workflow — the goal is minimal context-switching."
-->

---
class: text-xs
---

# AB# Linking — GitHub ↔ ADO

| Aspect | Detail |
|--------|--------|
| **Syntax** | `AB#12345` in commit messages, PR descriptions, or issue descriptions |
| **How it works** | GitHub webhook → ADO creates hyperlink on work item |
| **Setup** | Install **Azure Boards** GitHub App |
| **Direction** | GitHub → ADO (commits, PRs, branches → work items) |
| **State transitions** | `Fixes AB#12345` → auto-moves work item to Done (default branch merges only) |
| **Visibility** | ADO work items show linked GitHub PRs, commits, and branches |
| **Scope** | Connect each repo to a **single** ADO organization to avoid unexpected linking |

> `AB#` in PR titles or comments does **not** create a link — only commit messages, PR descriptions, and issue descriptions.

<!--
"AB# linking is the primary integration point. Developers type AB# followed by the work item number in their commit messages or PR descriptions. GitHub sends a webhook to ADO, which creates a link on the work item. You can even configure state transitions — so 'Fixes AB#4567' in a PR merged to main automatically moves the work item to Done. The key limitation: it only works in commit messages, PR descriptions, and issue descriptions — not in PR titles or comments."
-->

---

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

<!--
"Here's what the daily workflow looks like. Developer starts in ADO Boards, works in GitHub, and the link flows back. Project managers never have to leave ADO Boards. Developers rarely have to leave GitHub. That's the 'better together' experience."
-->

---
class: text-sm
---

# Copilot from Azure Boards Work Items

### GitHub Repos Only — Not Azure Repos

| Aspect | Detail |
|--------|--------|
| **What it does** | Delegate ADO work items to Copilot → code generation + PR creation |
| **Data shared** | Work item title, description, comments sent as context |
| **Source code** | Requires a **GitHub repo** — does not work with Azure Repos |
| **Auth** | Requires **GitHub App** auth (PAT not supported for this flow) |
| **License** | Copilot Pro, Business, or Enterprise |

<div class="gh-callout gh-callout-yellow">

**Governance note**: Work item titles, descriptions, and comments are sent to Copilot as context. Evaluate whether this meets your organization's data handling requirements. Enterprise Copilot data is **not used for model training**.

</div>

<!--
"This is a new integration point. From an ADO work item, you can delegate to Copilot, which generates code and opens a PR in the linked GitHub repo. The key caveat: your source code still has to live in GitHub. This doesn't enable Copilot for Azure Repos. And be aware of what data flows — work item content goes to Copilot for context. For enterprise plans, that data is not used for training."
-->

---

# PR Insights & Additional Features

### Bi-directional visibility without leaving your tool

**PR Insights** — View draft status, review status, and Checks status for linked GitHub PRs directly from the **Development section** of an ADO work item.

**`!` Mentions** — Reference and discuss GitHub PRs from any ADO work item text field or comment using `!` mentions.

**Build Traceability** — "Integrated in build" links auto-created on work items when using ADO Pipelines YAML with GitHub repos.

<!--
"Beyond AB# linking, there are several features that improve bi-directional visibility. PR insights let PMs see PR status right in the ADO work item. Exclamation mark mentions let you reference PRs in work item discussions. And build traceability automatically links builds to work items. Together, these mean PMs and developers can each stay in their preferred tool while staying in sync."
-->

---

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

> For new projects, consider starting with GitHub Actions. Migrate ADO Pipelines gradually.

<!--
"If you have existing ADO Pipelines you're not ready to migrate, they can still build from GitHub repos. You set up a service connection, point the pipeline YAML at the GitHub repo, and you're done. But for new projects, we recommend starting with GitHub Actions — it's natively integrated and reduces context-switching."
-->

---

# SECTION 3: Security, Governance & Connection

---
class: text-xs
---

# Data Flow & Permissions

| Integration | Data Flow | Direction | Controlled By |
|-------------|-----------|-----------|---------------|
| **AB# Linking** | Commit messages, PR metadata, branch names | GitHub → ADO | Azure Boards GitHub App |
| **Copilot + Boards** | Work item title, description, comments | ADO → GitHub Copilot | GitHub App auth |
| **PR Insights** | PR status, review status, Checks results | GitHub → ADO | Azure Boards GitHub App |
| **ADO Pipelines** | Source code checkout | GitHub → ADO Pipeline agent | Service connection |

### GitHub App Permission Model

| Aspect | Detail |
|--------|--------|
| **Scope** | Installed at GitHub **organization** level |
| **Repo limit** | Up to **1,000 repositories** per connection |
| **Admin required** | GitHub org admin + ADO Project Collection Administrator |
| **SAML note** | If org uses SAML, configure SSO for any PAT used |

<!--
"This is the security slide. Understand what data flows where. AB# linking sends commit and PR metadata to ADO — not source code. Copilot + Boards sends work item content to Copilot. ADO Pipelines do check out source code, but that stays on the pipeline agent. The Azure Boards GitHub App is installed at the org level and requires admin rights on both sides."
-->

---

# Troubleshooting Quick Reference

| Issue | Resolution |
|-------|-----------|
| **Red-X alert on connection** | Credentials invalid — remove and recreate |
| **Repos not listed** | Grant org access in GitHub Settings → Applications |
| **AB# links not appearing** | Verify App installed, repos connected, AB# in correct location |
| **GHES connection fails** | Verify Internet accessibility and DNS resolution |
| **PAT not working** | Enable SSO if org uses SAML authentication |

<!--
"Quick troubleshooting reference. The most common issue is the red-X alert, which means credentials have expired — just remove and recreate the connection. For PATs with SAML orgs, you must enable SSO or the repos won't be listed."
-->

---

# SECTION 4: Capability Matrix & Decision Framework

---
class: text-xs
---

# Capability Matrix

| Capability | GitHub ✅ | Azure DevOps ✅ | Recommendation |
|------------|-----------|------------------|----------------|
| **Source Code** | ✅ Primary | ⚠️ Legacy | New repos → GitHub; migrate gradually |
| **Code Review** | ✅ PRs | N/A | All review in GitHub |
| **AI Assistance** | ✅ Copilot | ⚠️ Via Boards (GH repos only) | Copilot requires GitHub repos |
| **Security** | ✅ GHAS | ⚠️ Defender | GHAS for comprehensive coverage |
| **CI/CD** | ✅ Actions (new) | ✅ Pipelines (existing) | New → Actions; existing → migrate |
| **Work Tracking** | ⚠️ Issues | ✅ Boards | ADO Boards for enterprise PM |
| **Test Mgmt** | ✗ | ✅ Test Plans | ADO — no GitHub equivalent |
| **Artifacts** | ⚠️ Packages | ✅ Artifacts | Use your standard |

<!--
"This is your cheat sheet for 'what goes where.' The left side is where GitHub wins. The right side is where ADO wins. Notice the AI Assistance row now shows that ADO Boards can delegate to Copilot — but your code still needs to live in GitHub repos. That's why the 'better together' approach works."
-->

---
class: text-xs
---

# ADO Integration — Trade-offs

| ✅ Pros | ✗ Cons | 📋 Requirements |
|---------|--------|-----------------|
| Best of both platforms | Dual admin & cost | GHEC license |
| Copilot + GHAS without full migration | AB# is GitHub → ADO only | ADO org + project |
| Preserve ADO Boards investment | Developer context-switching | Azure Boards GitHub App |
| Gradual migration path | Split audit logging | Entra ID SSO (recommended) |
| Shared identity via Entra ID | Governance in two places | Service connection (if Pipelines) |
| Works with ANY base architecture | Dual license cost | AB# workflow training |

<!--
"The pros are compelling — you get Copilot and GHAS without a big-bang migration. The cons are real too — you're operating two platforms, so admin, training, cost, and governance all double. The requirements column is your checklist — if you decide to go this route, make sure all of these are in place."
-->

---

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

<!--
"This is the key decision slide. On the left: reasons to layer ADO on top of GitHub. On the right: reasons to skip it and go GitHub-only. The most common answer I see is 'add it for now, plan to converge later.' That's a valid strategy as long as you actually execute the convergence plan."
-->

---

# SECTION 5: Q&A & Discussion

---

# Q&A & Discussion

1. **Current State**: What's your current split between GitHub and Azure DevOps?
2. **Migration Appetite**: Coexistence long-term, or gradual full migration?
3. **Copilot Priority**: Is AI-assisted development a key driver?
4. **Stakeholder Impact**: How will PMs and non-developers be affected?
5. **Security**: What does your security team need before approving the GitHub App?
6. **Identity**: Is Entra ID your identity provider for both platforms?
7. **Timeline**: What's your target timeline for integration setup?

<!--
"Let's open it up. These questions are designed to help you self-assess whether ADO integration is right for your situation. We can also dig into any specific technical questions about AB# linking, Copilot + Boards, pipeline setup, or migration planning."
-->

---

# Key Resources

| Resource | URL |
|----------|-----|
| Azure Boards + GitHub Integration | `learn.microsoft.com/azure/devops/boards/github/` |
| Connect Azure Boards to GitHub | `learn.microsoft.com/azure/devops/boards/github/connect-to-github` |
| Integration Overview | `learn.microsoft.com/azure/devops/cross-service/github-integration` |
| Copilot + ADO Boards | `learn.microsoft.com/azure/devops/boards/github/work-item-integration-github-copilot` |
| Azure Boards GitHub App | `github.com/marketplace/azure-boards` |
| Actions Migration Guide | `docs.github.com/actions/migrating-to-github-actions` |

<!--
"Here are the key resources. The Azure Boards GitHub integration docs are your primary reference. The Copilot + ADO Boards doc is new and worth reviewing. The Actions migration guide is excellent if you're planning to move pipelines over time."
-->

---
layout: cover
---

# Thank You

**Questions? Let's discuss your specific scenario.**

<!--
"Thank you everyone. Happy to stay for any follow-up questions about your specific ADO + GitHub integration needs."
-->
