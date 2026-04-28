---
theme: ../../themes/github
title: "GitHub + Azure DevOps Integration (30 min)"
info: |
  30-minute condensed version.
  Essential integration points: AB# linking, Copilot + ADO Boards, decision framework.
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

## 30-Minute Condensed Edition

*AB# Linking · Copilot from ADO Boards · Decision Framework*

<!--
"This is a 30-minute condensed version covering the essentials. We'll focus on the primary integration point (AB# linking), the new Copilot feature from Azure Boards, how GitHub and ADO layer together, and how to decide whether this integration is right for your organization."
-->

---
class: text-xs
---

# Today's Agenda (30 min)

| Section | Time | Topic |
|---------|------|-------|
| 1 | 3 min | GitHub + ADO Architecture |
| 2 | 8 min | AB# Linking Explained |
| 3 | 2 min | AB# in Practice |
| 4 | 3 min | Copilot from Azure Boards |
| 5 | 2 min | PR Insights & Features |
| 6 | 5 min | Decision Framework |
| 7 | 4 min | Q&A |

**Total: 30 minutes**

<!--
"Five content sections plus Q&A. We'll start with how the layers work, then dive into the primary integration point (AB# linking), show you a real example, cover the new Copilot feature, mention other visibility features, and finish with a decision framework to help you decide whether this is right for your organization."
-->

---

# Section 1: GitHub + ADO Architecture (3 min)

---

## How They Layer Together

ADO sits **on top of** your base GitHub architecture:

```
Base: 🔵 EMU | 🟢 Multi-Org | 🟠 Mixed + GHES
   ↓
+ ADO Integration (Boards, Pipelines, Test Plans)
   ↓
= Full "Better Together" Stack
```

### The Capability Split

| GitHub (Source of Truth) | Azure DevOps (PM Layer) |
|---|---|
| Repos, PRs, code scanning, Copilot | Boards, work items, sprints, dashboards |
| Branch protection, CI/CD (Actions) | Test Plans, Artifacts, legacy pipelines |

**Key point**: ADO **augments** GitHub — doesn't replace it. You still need a base GitHub architecture.

<!--
"Azure DevOps integration is not a standalone architecture. It sits on top of whichever base GitHub pattern you've chosen — EMU, Multi-Org, or Mixed Cloud + GHES. The 'better together' approach uses the right tool for each job: GitHub for source code, security, and AI assistance; Azure DevOps for work item tracking, test management, and project management."
-->

---

# Section 2: AB# Linking Explained (8 min)

---

## The Syntax

Use `AB#NNNNN` in GitHub to link to ADO work item #NNNNN.

**Where it works:**
- ✅ Commit messages
- ✅ PR descriptions
- ✅ Issue descriptions

**Where it does NOT work:**
- ❌ PR titles
- ❌ PR comments (only the description counts)

---

## How It Works

| Step | What Happens |
|------|--------------|
| **Dev writes** | Commit message: `Fix login flow AB#4567` |
| **GitHub sends webhook** | Azure Boards GitHub App receives the update |
| **Work item is linked** | ADO work item #4567 now shows the linked commit in its "Development" section |
| **State transitions** | PR merged with `Fixes AB#4567` → work item auto-moves to "Done" (if configured) |
| **Visibility** | PM can see PR progress in ADO Boards without leaving the platform |

---

## Key Limitations

| Limitation | Impact |
|-----------|--------|
| **One direction only** | GitHub → ADO (not bidirectional) |
| **Default branch only** | State transitions only happen when merged to `main`/`master` |
| **Setup required** | Azure Boards GitHub App must be installed on your org |
| **Scope** | One connection per GitHub org; connect to one ADO org |

<!--
"AB# linking is the primary integration point. It's simple but has some important limitations. It's one-directional from GitHub to ADO, state transitions only work on the default branch, and you need to have the Azure Boards app installed."
-->

---

# Section 3: AB# in Practice (2 min)

---

## Real Example: Plum Smart Performance Optimization

**ADO Work Item**: `AB#12340` — "Optimize query performance in checkout"

### Developer Flow

```
1. Developer grabs AB#12340 from ADO Boards
2. Creates branch: feature/AB12340-checkout-performance
3. Commits: "Optimize DB index for checkout queries AB#12340"
4. Opens PR with description mentioning AB#12340
   → ADO work item automatically shows the linked PR
5. Code review in GitHub
6. PR merged with commit message: "Fixes AB#12340"
   → ADO work item auto-transitions to Done
7. PM sees completion in ADO Boards dashboard
```

### The Benefit

Developers stay in GitHub. Project managers stay in ADO Boards. Both have visibility — no context-switching for status updates.

<!--
"Here's a real scenario. A developer picks up a performance optimization work item from ADO Boards, creates a branch and commits with the AB# reference, opens a PR, and once that PR is merged, the work item automatically moves to Done in ADO. The PM sees all of this in their ADO dashboard without ever opening GitHub."
-->

---

# Section 4: Copilot from Azure Boards Work Items (3 min)

---

## What It Is

Delegate work items to GitHub Copilot **directly from ADO Boards** for automated code generation + PR creation.

### Example: "Generate with Copilot"

```
ADO Work Item: "Add two-factor authentication"
↓
Click "Generate with Copilot" in ADO
↓
Copilot reads: title, description, comments
↓
Copilot generates code + opens PR in linked GitHub repo
```

---

## Important Details

| Aspect | Detail |
|--------|--------|
| **Data shared** | Work item title, description, comments sent to Copilot as context |
| **Source code** | **REQUIRES GitHub repos** — does not work with Azure Repos |
| **Auth** | Requires GitHub App authentication (PAT not supported) |
| **License** | Requires Copilot Pro, Business, or Enterprise license |
| **Governance** | Work item content is sent to Copilot; evaluate data handling requirements |

### Critical Caveat

⚠️ **This feature only works with GitHub repositories.** If your source code lives in Azure Repos, you cannot use Copilot with ADO Boards work items. Your code must be in GitHub.

<!--
"Copilot + ADO Boards is a new feature, but it has a critical limitation: it only works with GitHub repositories. If you're storing source code in Azure Repos, this integration won't help you. That's an important distinction as you evaluate the 'better together' story for your organization."
-->

---

# Section 5: PR Insights & Additional Features (2 min)

---

## PR Insights

View GitHub pull request status directly from ADO work items:

- **Draft status** — Is it still a draft?
- **Review status** — Approved, changes requested, waiting?
- **Check status** — CI passing, policy compliance?

Shows in the **Development section** of the work item. PMs track progress without switching to GitHub.

---

## `!` Mentions

Reference GitHub pull requests from ADO using `!` syntax:

```
!{org/repo}/pull/{pr-number}
```

**Example**: `!microsoft/ghcp-content/pull/42` links and highlights that PR in the work item discussion.

---

# Section 6: Decision Framework (5 min)

---

## When to Add ADO Integration

✅ **Add when:**

- Significant ADO Boards investment (custom work items, queries, dashboards)
- Want Copilot + GHAS without full migration
- Doing gradual ADO Repos → GitHub migration
- PMs/stakeholders live in ADO Boards
- Using ADO Test Plans

---

## When to Skip ADO Integration

⚠️ **Skip when:**

- Starting fresh — go all-in on GitHub from day one
- GitHub Projects V2 can replace ADO Boards
- Cost of two platforms > one-time migration cost
- Team prefers single tool (context-switching harms productivity)

---

## Pros & Cons

| ✅ Pros | ✗ Cons |
|---------|--------|
| Leverage best of both platforms | Dual admin, dual training, dual cost |
| Adopt Copilot + GHAS without migration | One-way integration (GH → ADO) |
| Preserve ADO Boards investment | Developer context-switching |
| Gradual migration path | Split audit logs, unified reporting complex |

<!--
"The decision comes down to your organization's maturity with Azure DevOps. If you have a lot invested in ADO Boards and you want to adopt GitHub without disrupting that, ADO integration makes sense. If you're starting fresh or have the bandwidth to migrate, going all-in on GitHub might be simpler."
-->

---

# Section 7: Q&A (4 min)

---

## Discussion Questions

- How much of your workflow currently lives in ADO Boards?
- Could GitHub Projects V2 replace your ADO usage?
- Do you have ADO Pipelines that would be difficult to migrate?
- Is Entra ID your identity provider for both platforms?

<!--
"Let's open it up for questions. These are some framing questions to think about, but ask whatever's on your mind."
-->

---

## Reference Materials

- [Microsoft Learn: Connect Azure Boards to GitHub](https://learn.microsoft.com/en-us/azure/devops/boards/github/connect-to-github)
- [Integration Overview & Capabilities](https://learn.microsoft.com/en-us/azure/devops/cross-service/github-integration)
- [Hands-On Lab Guide (Self-Paced)](gh-ado-integration-LAB.md)

---

## Thank You

**Questions? Comments? Let's discuss!**

