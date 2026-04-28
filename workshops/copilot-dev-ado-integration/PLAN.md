# Plan: GitHub + Azure DevOps Integration Workshop Review & Enhancement

## Problem Statement

Review the existing `github-ado-integration` workshop against the latest Microsoft Learn documentation and identify improvements needed for the workshop guide, labs (currently missing), and slide deck. Produce a detailed outline with discussion topics.

## Sources Reviewed

- **Existing workshop files**: `gh-ado-integration-workshop.md`, `gh-ado-integration-slides.md`
- **MS Learn — Connect Azure Boards to GitHub**: https://learn.microsoft.com/en-us/azure/devops/boards/github/connect-to-github
- **MS Learn — Integration Overview & Capabilities**: https://learn.microsoft.com/en-us/azure/devops/cross-service/github-integration

---

## Current State Assessment

### What Exists
| File | Status | Content |
|------|--------|---------|
| `gh-ado-integration-workshop.md` | ✅ Complete (draft) | 4 sections, ~45-60 min, solid "better together" framing |
| `gh-ado-integration-slides.md` | ✅ Complete (draft) | 14 slides + appendix, mirrors workshop |
| `gh-ado-integration-LAB.md` | ❌ Missing | No hands-on lab exists |
| `.draft` | ⚠️ Present | Empty file — marks this as draft/not finalized |

### What's Good
- Strong "ADO is an add-on layer" framing — architecturally correct
- Clear capability matrix and "what goes where" table
- Practical AB# linking workflow with developer example
- ADO Pipelines building from GitHub repos (YAML example)
- Decision framework (when to add / when to skip)
- Clean slide deck with presenter notes

### Gaps Found (from MS Learn docs)

#### 🔴 Critical Gaps

| # | Gap | Source | Impact |
|---|-----|--------|--------|
| 1 | **GitHub Copilot + Azure Boards work items** | Integration overview doc: "Delegate work items to GitHub Copilot for automated code generation and pull request creation" | **Huge gap** — directly relevant to the Copilot pilot. Workshop says "Copilot only works with GitHub repos" but doesn't mention that Copilot can now work with ADO Boards work items. |
| 2 | **No hands-on lab** | — | Workshops in the curriculum all have LAB.md files. This one doesn't. Attendees need guided exercises to practice AB# linking and connection setup. |
| 3 | **Authentication & connection setup details** | Connect doc: GitHub credentials, PAT (with SSO requirement), OAuth for GHES | Workshop mentions auth options briefly in the Pipelines section but lacks the complete Boards connection walkthrough (Project Settings → GitHub connections → auth method → repo selection → confirm). |

#### 🟡 Moderate Gaps

| # | Gap | Source | Notes |
|---|-----|--------|-------|
| 4 | **PR insights in ADO work items** | Integration overview: "View draft status, review status, and Checks status for linked GitHub PRs directly from the Development section" | Workshop mentions "Visibility" in the AB# table but doesn't explain the rich PR insights feature. |
| 5 | **`!` mentions for GitHub PRs** | Integration overview: "Use `!` mentions to reference and discuss GitHub pull requests from any work item text field" | Not mentioned in workshop at all. This is a useful productivity feature. |
| 6 | **GitHub Issues sync to ADO** | Integration overview: "Sync GitHub Issues to Azure Boards Work Items using the GitHub Action" | Not mentioned. Provides an alternative/complement to AB# linking. |
| 7 | **Build traceability (Integrated in build)** | Integration overview: "Automatically create Integrated in build links on work items when using Azure Pipelines YAML with a GitHub repository" | Workshop mentions Pipelines building from GH repos but not this traceability feature. |
| 8 | **Status badges** | Both docs: "Add status badges of Azure Boards to a GitHub repository README" | Quick win for visibility — not mentioned. |
| 9 | **Troubleshooting & connection issues** | Connect doc: Red-X alerts, grant org access, SAML/SSO for PAT, 1,000 repo limit | No troubleshooting guidance in workshop. Important for real deployments. |
| 10 | **GitHub Checks integration** | Integration overview: "Display status for each pipeline job in GitHub Checks" | Not mentioned. Enhances the bi-directional visibility story. |

---

## Proposed Workshop Outline (Updated)

### Workshop Guide (`gh-ado-integration-workshop.md`)

**Duration**: 60–75 minutes (expanded from 45-60)
**Format**: Presentation + Discussion + Hands-On Lab

| # | Section | Time | Changes |
|---|---------|------|---------|
| 1 | **ADO as an Integration Layer** | 10 min | ✅ Keep as-is. Strong framing. |
| 2 | **Integration Architecture & Key Features** | 20 min | 🔄 Expand: Add Copilot + ADO Boards work items, PR insights, `!` mentions, GitHub Issues sync, status badges, GitHub Checks. Rename from "AB# Linking" since coverage is now broader. |
| 3 | **Connection Setup & Authentication** | 10 min | 🆕 New section: Walkthrough of connecting Azure Boards to GitHub (auth options, repo selection, confirm connection). Cover GHES OAuth setup. Troubleshooting tips. |
| 4 | **Capability Matrix & Decision Framework** | 10 min | 🔄 Minor update: Add Copilot + ADO Boards to the capability matrix (currently says "Copilot only works with GitHub repos" — needs nuance). |
| 5 | **Q&A & Discussion** | 10 min | ✅ Keep as-is. |

### New Content to Add in Section 2

#### 2a. Copilot + Azure Boards Work Items (NEW)
- Copilot can now work with ADO Boards work items
- Delegate work items to Copilot for code generation and PR creation
- This bridges the "Copilot requires GitHub repos" gap — teams using ADO Boards can still benefit
- **Discussion topic**: How does this change your evaluation of the "better together" story?

#### 2b. AB# Linking (existing — keep)
- AB# syntax, state transitions, developer workflow example
- Add: `AB#` only works in commit messages, PR descriptions, issue descriptions (not titles/comments)
- Add: Connect each GitHub repo to a single ADO org to avoid unexpected AB# linking

#### 2c. PR Insights & `!` Mentions (NEW)
- PR insights: View draft/review/Checks status directly from ADO work item Development section
- `!` mentions: Reference GitHub PRs from any work item text field or comment
- **Discussion topic**: Does this provide enough visibility for PMs who live in ADO Boards?

#### 2d. GitHub Issues Sync (NEW)
- GitHub Action to sync GitHub Issues → ADO Work Items
- Alternative to AB# for teams that want to work primarily in GitHub Issues
- **Discussion topic**: Would your team prefer AB# linking or full Issues sync?

#### 2e. Build Traceability & Status Badges (NEW)
- "Integrated in build" links auto-created on work items with YAML Pipelines + GitHub repos
- Status badges for Azure Boards in GitHub README files
- GitHub Checks showing per-job pipeline status

### New Section 3: Connection Setup & Authentication

#### 3a. Connecting Azure Boards to GitHub.com
- Step-by-step: Project Settings → GitHub connections → auth method → select repos → confirm
- Auth options: GitHub credentials (recommended) or PAT (require SSO if SAML org)
- Limit: 1,000 repos per connection; one connection per GitHub org

#### 3b. Connecting to GitHub Enterprise Server
- OAuth registration in GHES + Azure DevOps
- PAT and credential options
- Network requirements (GHES must be Internet-accessible, DNS resolution)

#### 3c. Troubleshooting
- Red-X alert = credentials invalid → remove and recreate connection
- Grant org access for OAuth apps
- SAML/SSO requirement for PATs

---

## Proposed Lab Outline (`gh-ado-integration-LAB.md`)

**Duration**: ~30 minutes
**Format**: Step-by-step exercises aligned to workshop sections

| Lab | Title | Time | Description |
|-----|-------|------|-------------|
| Lab 1 | **Connect Azure Boards to GitHub** | 10 min | Install Azure Boards GitHub App, connect repos, verify connection in Project Settings. |
| Lab 2 | **AB# Linking Workflow** | 10 min | Create a work item in ADO Boards, create a branch in GitHub with AB# reference, commit with AB# syntax, open a PR, verify the link appears in ADO. Test state transition with `Fixes AB#`. |
| Lab 3 | **PR Insights & Visibility** | 5 min | Verify PR insights appear in ADO work item Development section. Add a `!` mention in a work item comment. Add a status badge to the repo README. |
| Lab 4 | **ADO Pipeline from GitHub Repo** (Optional) | 5 min | Create a service connection, configure a simple ADO Pipeline YAML to build from a GitHub repo, verify the build runs. |

### Lab Prerequisites
- Azure DevOps organization + project (with Boards enabled)
- GitHub organization with at least one repo
- Admin rights on both the ADO project and GitHub repo
- (Optional) Entra ID SSO configured for both

---

## Proposed Slide Deck Updates (`gh-ado-integration-slides.md`)

| Slide | Change |
|-------|--------|
| Slide 4 (Better Together) | Add row: "AI + Work Items → GitHub Copilot + ADO Boards" |
| NEW Slide 5a | **Copilot + ADO Boards** — Delegate work items to Copilot, code gen + PR creation |
| Slide 6 (AB# Linking) | Add note about `!` mentions and PR insights |
| NEW Slide 6a | **Additional Integration Features** — Issues sync, build traceability, status badges, GitHub Checks |
| NEW Slide 7a | **Connection Setup** — Auth options diagram, step-by-step, troubleshooting tips |
| Slide 9 (Capability Matrix) | Update "AI Assistance" row to reflect Copilot + ADO Boards integration |
| Slide 13 (Resources) | Add the two MS Learn URLs from this review |

---

## Discussion Topics (Consolidated)

### Strategic
1. How does Copilot + ADO Boards work items change your evaluation of the "better together" story?
2. Is your goal coexistence long-term, or gradual full migration to GitHub?
3. What's the right balance between preserving ADO investment and simplifying the toolchain?

### Practical
4. What percentage of your development workflow currently lives in ADO?
5. Which ADO capabilities are most critical to preserve? (Boards, Pipelines, Test Plans, Artifacts)
6. Would your team prefer AB# linking or full GitHub Issues sync?
7. Does PR insights in ADO provide enough visibility for PMs?
8. How many ADO Pipelines would need to build from GitHub repos?

### Technical
9. Are you on Entra ID for both platforms? (SSO is critical for seamless experience)
10. Do you use SAML/SSO on your GitHub org? (Affects PAT configuration)
11. Who manages the Azure Boards GitHub App installation and permissions?
12. How will you handle unified reporting across both platforms? (Power BI, etc.)

### Governance
13. How will you manage audit logging across two platforms?
14. Who owns the governance policies in each platform?
15. What's your security team's posture on the Azure Boards GitHub App permissions?

---

## Implementation Todos

1. **Update `gh-ado-integration-workshop.md`** — Add Copilot+ADO Boards, PR insights, `!` mentions, Issues sync, build traceability, status badges, connection setup section, troubleshooting. Update capability matrix.
2. **Create `gh-ado-integration-LAB.md`** — New file with 4 labs covering connection, AB# linking, PR insights, and optional pipeline setup.
3. **Convert slides to Slidev format** — Rename `gh-ado-integration-slides.md` → `gh-ado-integration.slidev.md` with proper Slidev frontmatter (theme, transition, layout). Add new slides for Copilot+ADO, additional features, connection setup. The current slide deck is plain Markdown, not Slidev format. All other workshops use `*.slidev.md` with YAML frontmatter.
4. **Add npm dev script** — Add `"dev:ado-integration": "slidev workshops/github-ado-integration/gh-ado-integration.slidev.md"` to `package.json`.

> **Note**: `.draft` marker will NOT be removed — user will remove manually when ready. No git commits will be made — user will commit when ready.

## Status

- ✅ `gh-ado-integration-workshop.md` — Updated with all new content
- ✅ `gh-ado-integration-LAB.md` — Created with 4 labs
- ✅ `gh-ado-integration.slidev.md` — Created in proper Slidev format
- ✅ `package.json` — npm dev script added (`dev:ado-integration`)
- ⏳ `gh-ado-integration-slides.md` — Old plain-Markdown slides retained (can be removed once Slidev version is validated)
- ⏳ `.draft` — Retained, user will remove manually

## Local Preview

The repo uses **Slidev** (`@slidev/cli ^52.0.0`) with a custom `../../themes/github` theme.

```bash
cd ghcp-content
npm install                    # install Slidev + deps
npx slidev workshops/github-ado-integration/gh-ado-integration.slidev.md   # preview slides
```

Workshop and LAB markdown can be reviewed directly in VS Code or any Markdown previewer.

---

## Key References

| Resource | URL |
|----------|-----|
| Connect Azure Boards to GitHub | https://learn.microsoft.com/en-us/azure/devops/boards/github/connect-to-github |
| Integration Overview & Capabilities | https://learn.microsoft.com/en-us/azure/devops/cross-service/github-integration |
| Azure Boards GitHub App | https://github.com/marketplace/azure-boards |
| ADO Service Connections | https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints |
| GitHub Actions Migration Guide | https://docs.github.com/en/actions/migrating-to-github-actions/migrating-from-azure-pipelines-to-github-actions |
| Copilot + ADO Boards Work Items | https://learn.microsoft.com/en-us/azure/devops/boards/github/work-item-integration-github-copilot |
