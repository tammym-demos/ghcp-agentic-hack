# GitHub + Azure DevOps Integration Workshop Guide (30-Minute Edition)

**Duration**: 30 minutes  
**Format**: Presentation + Discussion  
**Audience**: Engineering Managers, Tech Leads, Decision Makers  
**Focus**: Essential integration points and decision framework  
**Lab Guide**: [Hands-On Lab (Self-Paced)](gh-ado-integration-LAB.md) — optional after session

> **Note**: This is the condensed 30-minute version for pilot sessions. For comprehensive coverage of security, governance, and advanced features, see **Appendix A**.

---

## Workshop Overview

This 30-minute workshop covers how to layer Azure DevOps (ADO) integration on top of your existing GitHub Enterprise architecture. ADO integration is **not a standalone architecture** — it augments whichever base GitHub pattern you've chosen (EMU, Multi-Org, or Mixed Cloud + GHES).

### Learning Objectives

By the end of this session, you'll understand:

- How ADO integration layers on top of GitHub architecture
- The AB# linking workflow (the primary integration point)
- How GitHub Copilot works with Azure Boards work items (and why GitHub repos are required)
- What PR Insights and additional integration features offer
- Whether ADO integration is right for your organization

### Workshop Agenda

| # | Section | Time | Focus |
|---|---------|------|-------|
| 1 | [GitHub + ADO Architecture](#1-github--ado-architecture-3-min) | 3 min | How ADO layers on GitHub; capability split |
| 2 | [AB# Linking Explained](#2-ab-linking-explained-8-min) | 8 min | Syntax, workflow, limitations |
| 3 | [AB# in Practice](#3-ab-in-practice-2-min) | 2 min | Real developer scenario |
| 4 | [Copilot from Azure Boards Work Items](#4-copilot-from-azure-boards-work-items-3-min) | 3 min | What it is, GitHub-repos requirement, data governance |
| 5 | [PR Insights & Additional Features](#5-pr-insights--additional-features-2-min) | 2 min | PR status, `!` mentions, visibility |
| 6 | [Decision Framework](#6-decision-framework-5-min) | 5 min | When to add ADO integration, when to skip |
| 7 | [Q&A](#7-qa-4-min) | 4 min | Open questions |

**Total: 30 minutes**

---

## 1. GitHub + ADO Architecture (3 min)

### The Model

ADO integration sits **on top of** whichever base GitHub architecture you chose:

| Base Architecture | + ADO Integration = |
|---|---|
| 🔵 **EMU Only** | EMU enterprise with ADO Boards/Pipelines for work tracking + legacy CI |
| 🟢 **Multi-Org** | Multi-Org enterprise with ADO Boards for project management |
| 🟠 **Mixed Cloud + GHES** | Hybrid GitHub deployment with ADO for work tracking + existing pipelines |

**You still need a base pattern.** ADO augments — it doesn't replace — your GitHub architecture.

### Why Coexistence?

Most enterprises have significant Azure DevOps investment: work items, queries, dashboards, pipelines, test plans. The "better together" thesis uses the right tool for each job:

| Domain | Best Tool |
|--------|-----------|
| Source Code, PRs, Security, AI Code Assistance | **GitHub** (+ Copilot) |
| Work Item Tracking, Test Plans, Artifact Management | **Azure DevOps** |
| CI/CD | GitHub Actions (new) or ADO Pipelines (existing) |

---

## 2. AB# Linking Explained (8 min)

### The Syntax

Use `AB#NNNNN` in GitHub commit messages, PR descriptions, or issue descriptions to link to Azure DevOps work item #NNNNN.

| Aspect | Detail |
|--------|--------|
| **Where it works** | Commit messages, PR descriptions, issue descriptions |
| **Where it does NOT work** | PR titles, comments (only the initial description) |
| **What happens** | GitHub sends a webhook to ADO, creating a hyperlink on the work item |
| **Setup** | Install the **Azure Boards** GitHub App on your GitHub org |
| **State transitions** | Merge to default branch with `Fixes AB#12345` → ADO work item auto-transitions to Done |
| **Visibility** | ADO work item's "Development" section shows linked GitHub PRs, commits, and branches |

### Example Workflow

1. **Dev picks up work** — Grabs `AB#4567` from ADO Boards
2. **Creates branch** — `feature/AB4567-add-login` in GitHub repo
3. **Commits with reference** — Message: `Add OAuth login flow AB#4567`
4. **Opens PR** — PR description mentions `AB#4567` → ADO shows linked PR automatically
5. **Merges PR** — PR merged to main + commit says `Fixes AB#4567` → ADO auto-transitions work item to Done
6. **PM sees completion** — ADO Boards dashboard now shows the work item as Done with linked GitHub activity

---

## 3. AB# in Practice (2 min)

### Real Scenario: Plum Smart Performance Optimization

**Setup**: ADO work item `AB#12340` — "Optimize query performance in Plum Smart checkout"

**Developer flow**:
```
Commit message: "Optimize DB index for checkout queries AB#12340"
PR description: "Closes AB#12340. Added composite index on transactions table. See attached performance benchmarks."
ADO result: Work item shows linked PR, commits, and associated GitHub branches in Development section
On PR merge: Work item automatically moves from "In Progress" → "Done"
```

**Benefit**: Project manager sees real-time progress in ADO Boards without switching to GitHub. Developers stay in their GitHub workflow.

---

## 4. Copilot from Azure Boards Work Items (3 min)

### What It Is

Azure Boards now integrates with GitHub Copilot. From an ADO work item, you can delegate to Copilot for automated code generation and PR creation — **directly from ADO Boards**.

| Aspect | Detail |
|--------|--------|
| **What it does** | Click "Generate with Copilot" on an ADO work item → Copilot generates code + opens PR in linked GitHub repo |
| **Data shared** | Work item title, description, comments are sent to Copilot for context |
| **Source code** | **Requires GitHub repos** — Copilot does not work with Azure Repos |
| **Auth** | Requires **GitHub App** authentication (PAT not supported for this flow) |
| **License** | Requires valid Copilot license (Pro, Business, or Enterprise) |
| **Important caveat** | This feature **only works with GitHub repositories**, not Azure Repos. If your source lives in Azure Repos, you can't use this integration. |

### Governance Consideration

⚠️ **Data flows from ADO to Copilot**: Work item titles, descriptions, and comments are sent as context. Evaluate whether this meets your organization's data handling requirements. (Not used for model training in Copilot Enterprise.)

---

## 5. PR Insights & Additional Features (2 min)

### PR Insights

View GitHub pull request status directly from ADO work items:

- **PR draft status** — Is it still a draft?
- **Review status** — Approved, changes requested, or waiting for review?
- **Check status** — CI status, policy compliance

Appears in the **Development section** of ADO work items. Project managers can track PR progress without leaving ADO Boards.

### `!` Mentions

Use `!` to reference and discuss GitHub pull requests from ADO work item text fields or comments:

```
!{org/repo}/pull/{pr-number}
```

Example: `!microsoft/ghcp-content/pull/42` links discussion to that PR.

---

## 6. Decision Framework (5 min)

### When to Add ADO Integration

✅ **Add ADO integration when:**

- You have significant ADO Boards investment (custom work items, queries, dashboards)
- You want Copilot + GHAS without disrupting existing workflows
- You're doing gradual migration from ADO Repos to GitHub
- Your PMs and stakeholders live in ADO Boards
- You use ADO Test Plans

### When to Skip ADO Integration

⚠️ **Skip ADO integration if:**

- You're starting fresh — go all-in on GitHub from the start
- GitHub Projects V2 can replace ADO Boards (simpler = less overhead)
- Total cost of running both platforms > one-time migration cost
- Developers strongly prefer a single tool (context-switching harms productivity)

### Key Pros & Cons

| ✅ Pros | ✗ Cons |
|---------|--------|
| Leverage best of both platforms | Two platforms = dual admin, dual training, dual cost |
| Adopt Copilot + GHAS without full migration | AB# linking is GitHub → ADO (not bidirectional) |
| Preserve ADO Boards investment | Developer context-switching between systems |
| Gradual migration — move at your own pace | Unified reporting requires custom dashboards |

---

## 7. Q&A (4 min)

Open discussion. Questions to consider:

- How much of your team's workflow currently lives in ADO Boards?
- Could GitHub Projects V2 replace your ADO usage?
- Do you have ADO Pipelines that would be difficult to migrate?
- Is Entra ID your identity provider for both platforms?

---

## Reference Materials

- **AB# Linking Setup**: [Microsoft Learn Guide](https://learn.microsoft.com/en-us/azure/devops/boards/github/connect-to-github)
- **Integration Overview**: [Microsoft Learn](https://learn.microsoft.com/en-us/azure/devops/cross-service/github-integration)
- **Hands-On Lab** (self-paced): [Lab Guide](gh-ado-integration-LAB.md)

---

---

# Appendix A: Comprehensive Content (For Reference)

> This appendix contains the full sections from the 60–75 minute comprehensive workshop. Reference this for deep dives into security, governance, architecture, and advanced features.

## A1. Integration Architecture Deep Dive

Full architecture diagram and detailed explanation of data flows between GitHub and ADO systems.

## A2. Security, Governance & Connection Overview

### Connection Setup

- **Admin Permissions** required: GitHub org admin, ADO Project Collection Administrator
- **Repo Limit**: Up to 1,000 repositories per connection
- **Org Limit**: One connection per GitHub organization

### Authentication Options

| Platform | Recommended | Also Supported |
|----------|-----------|----------------|
| **GitHub.com** | GitHub credentials (user account) | PAT (requires SSO if SAML org) |
| **GitHub Enterprise Server** | OAuth (register app in GHES + ADO) | PAT, GitHub credentials |

### Audit & Governance

| Concern | Guidance |
|---------|----------|
| **Audit logging** | Split across two platforms — GitHub audit log + ADO audit log. Consider unified reporting via Power BI or SIEM. |
| **Policy ownership** | Define clearly: who owns branch protection (GitHub) vs. Board process templates (ADO)? |
| **IP protection** | Source code remains in GitHub; ADO receives metadata only (commit messages, PR descriptions), not source code. Exception: ADO Pipelines check out source code to build. |

### Troubleshooting Quick Reference

| Issue | Resolution |
|-------|-----------|
| **Red-X alert on connection** | Credentials invalid — remove connection and create new one |
| **Repositories not listed** | Grant org access for Azure Boards OAuth app in GitHub Settings → Applications |
| **AB# links not appearing** | Verify Azure Boards GitHub App is installed, repos are connected, and `AB#` is in the correct location |
| **GHES connection fails** | Verify server is Internet-accessible and Azure DNS can resolve the server name |

## A3. Advanced Features

### ADO Pipelines Building from GitHub Repos

Even when source code lives in GitHub, ADO Pipelines can still build it:

1. In Azure DevOps: **Project Settings** → **Service Connections** → **New** → **GitHub**
2. Authorize the connection to the target GitHub org
3. In ADO Pipeline YAML, reference the GitHub repo:

```yaml
resources:
  repositories:
    - repository: my-github-repo
      type: github
      endpoint: github-connection
      name: org/repo-name
```

### Test Plans & Artifacts

Azure DevOps Test Plans and Artifacts remain the leading tools in these domains with no GitHub equivalents.

## A4. Comprehensive Decision Matrix

| Capability | GitHub | Azure DevOps | Recommendation |
|------------|--------|--------------|-----------------|
| **Source Code** | ✅ Primary | ⚠️ Legacy repos | All new repos in GitHub; migrate ADO gradually |
| **Code Review (PRs)** | ✅ Primary | N/A | All code review in GitHub |
| **AI Code Assistance** | ✅ Copilot | ⚠️ Via Boards (GH repos only) | Copilot requires GitHub repos |
| **Security Scanning** | ✅ GHAS | ⚠️ Defender | GitHub Advanced Security for comprehensive coverage |
| **CI/CD** | ✅ Actions (new) | ✅ Pipelines (existing) | Actions for new; Pipelines for legacy migration |
| **Work Tracking** | ⚠️ Issues/Projects | ✅ Boards (primary) | ADO Boards for enterprise PM |
| **Test Management** | ✗ | ✅ Test Plans | ADO Test Plans only option |
| **Artifacts** | ⚠️ Packages | ✅ Artifacts | Whichever you've standardized on |

---

## A5. Migration Roadmap Example

**Phase 1 (Months 1–3)**: GitHub + ADO Coexistence
- New projects start in GitHub
- ADO Boards remains the PM system
- AB# linking tracks GitHub PRs in ADO work items

**Phase 2 (Months 4–12)**: Gradual ADO Repos → GitHub Migration
- Migrate critical repos to GitHub
- Evaluate GitHub Projects V2 as ADO Boards alternative
- ADO Pipelines → GitHub Actions for new CI/CD

**Phase 3 (Year 2+)**: ADO Sunset (Optional)
- All source code in GitHub
- ADO Boards → GitHub Projects (if suitable)
- Decommission ADO when benefits of coexistence diminish

---

**End of Appendix**
