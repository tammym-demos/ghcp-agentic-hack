# Bitbucket Cloud to GitHub Enterprise Cloud Migration

## Slide Deck with Presenter Notes

**Duration**: 1 hour  
**Format**: Presentation + Live Demos (intermixed)  
**Audience**: Mixed engineering teams (Engineers + Admins + Managers)

---

> **Presenter Note**: This deck covers end-to-end migration from Bitbucket Cloud to GitHub Enterprise Cloud (GHEC). Each section includes concepts followed by live demos. Look for 🖥️ **SWITCH TO DEMO** markers.

---

## Slide 1: Title

# Bitbucket to GitHub Enterprise
## Migration Workshop

*A Comprehensive Guide to Enterprise-Scale Repository Migration*

---

> **Presenter Note**: Welcome attendees. Set expectations: "Today we'll walk through the complete migration journey—from assessment to cutover. This is hands-on; I'll show you real tools and commands."

---

## Slide 2: Agenda

### What We'll Cover Today

| Time | Topic |
|------|-------|
| 10 min | [Why Migrate & Conceptual Mapping](#section-why-migrate--what-changes) |
| 10 min | [Assessment & Planning](#section-assessment--planning) |
| 15 min | [Technical Migration Process](#section-technical-migration-process) |
| 10 min | [Common Hurdles & Solutions](#section-common-hurdles--solutions) |
| 10 min | [Post-Migration & Cutover](#section-post-migration--cutover) |
| 5 min | [Best Practices & Q&A](#section-best-practices--wrap-up) |

**Format**: Concepts → Live Demo → Discussion (repeat)

---

> **Presenter Note**: "We'll move between slides and live terminal/browser demos. Questions welcome throughout—but I'll also leave dedicated Q&A time at the end."

---

## Slide 3: Why This Matters

### Migration Is More Than Moving Code

A successful migration requires:
- **Data integrity** — Every commit, branch, and PR matters
- **Identity continuity** — Users need seamless access
- **Process preservation** — CI/CD and workflows must continue
- **Minimal disruption** — Teams can't stop delivering

---

> **Presenter Note**: "Migration failures are costly—not just in time, but in developer trust and lost history. That's why we're taking a methodical approach today."

---

# SECTION: Why Migrate & What Changes

---

## Slide 4: Why Organizations Migrate

### Common Drivers for Bitbucket → GitHub

| Driver | Business Impact |
|--------|-----------------|
| **Platform consolidation** | Reduce tooling sprawl, single pane of glass |
| **GitHub Copilot** | AI-assisted development only on GitHub |
| **Advanced security** | Code scanning, secret scanning, Dependabot |
| **Actions ecosystem** | 15,000+ marketplace actions |
| **Enterprise features** | EMU, audit logs, IP allow lists |
| **Developer preference** | GitHub is often the team's choice |

---

> **Presenter Note**: "Most migrations we see are driven by consolidation or wanting GitHub-specific features like Copilot. Understanding your 'why' helps prioritize what to migrate first."

---

## Slide 5: Conceptual Mapping

### Bitbucket Cloud → GitHub Enterprise Cloud

| Bitbucket Cloud | GitHub Enterprise Cloud | Notes |
|-----------------|------------------------|-------|
| Workspace | Organization | 1:1 or N:1 mapping possible |
| Project | Team or repo prefix | No direct equivalent |
| Repository | Repository | Direct mapping |
| Branch permissions | Branch protection rules | Different model (see details) |
| Pull request | Pull request | Migrates with GEI |
| Pipelines | GitHub Actions | Manual conversion required |
| Deployments | Environments | Manual setup |
| Repository variables | Repository secrets/variables | Manual migration |
| Access tokens | Personal access tokens (PATs) | Recreate required |
| User groups | Teams | Manual mapping |

---

> **Presenter Note**: "This mapping is critical. The biggest conceptual difference is Projects—Bitbucket uses them for grouping, GitHub uses Teams and naming conventions. Plan your org structure before migrating."

---

## Slide 6: What Migrates vs. What Doesn't

### Setting Expectations

```
✓ MIGRATES WITH GEI          ✗ REQUIRES MANUAL WORK
─────────────────────────────────────────────────────
✓ Git history (all commits)   ✗ Bitbucket Pipelines
✓ Branches and tags           ✗ Pipeline variables/secrets
✓ Pull requests (open/closed) ✗ Deployments configuration
✓ PR comments and reviews     ✗ Webhooks
✓ Repository settings (some)  ✗ Repository hooks
                              ✗ Downloads/releases
                              ✗ Wiki (different format)
                              ✗ Snippets (use Gists)
                              ✗ Branch permissions (rebuild)
```

---

> **Presenter Note**: "Be very clear with stakeholders: GEI handles the heavy lifting—git history and PRs—but CI/CD is a separate workstream. Don't underestimate Pipelines conversion."

---

## Slide 7: Demo Time

# 🖥️ LIVE DEMO

### Bitbucket & GitHub Comparison

- Show Bitbucket workspace structure
- Show equivalent GitHub organization
- Highlight terminology differences

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 1**. Open Bitbucket Cloud and GitHub side-by-side. Walk through workspace vs. org, project vs. team, settings locations. ~3 minutes.

---

# SECTION: Assessment & Planning

---

## Slide 8: Pre-Migration Assessment

### Discovery Checklist

| Area | Questions to Answer |
|------|---------------------|
| **Inventory** | How many repos? Total size? Largest repo? |
| **Activity** | Which repos are actively developed? |
| **Integrations** | What connects to Bitbucket? (CI, Jira, etc.) |
| **Users** | How many users? Identity provider? |
| **Permissions** | Complex branch permissions? |
| **Pipelines** | How many active pipelines? Complexity? |
| **Timeline** | Hard deadline? Parallel running period? |

---

> **Presenter Note**: "Assessment prevents surprises. I've seen migrations stall because no one knew about a 50GB repo or critical webhook integration. Inventory everything first."

---

## Slide 9: Migration Tool Selection

### Choose Your Path

| Approach | Best For | Limitations |
|----------|----------|-------------|
| **GitHub Enterprise Importer (GEI)** | Full migration with PR history | Requires GitHub CLI, some setup |
| **`git clone` + `git push`** | Simple repos, no PR history needed | Loses PRs, issues, metadata |
| **GitHub Importer (web)** | Quick single-repo imports | No PR history, limited scale |
| **Third-party tools** | Complex scenarios | Additional cost, vendor dependency |

### Recommendation: **GEI for enterprise migrations**

---

> **Presenter Note**: "GEI is the answer for 90% of enterprise migrations. It's free, supported by GitHub, and handles the hard parts—PR migration with comments and review history."

---

## Slide 10: GitHub Enterprise Importer (GEI)

### What It Does

```
┌─────────────────┐         ┌─────────────────┐
│  Bitbucket      │         │    GitHub       │
│  Cloud          │         │    Enterprise   │
│                 │         │    Cloud        │
│  ┌───────────┐  │  GEI    │  ┌───────────┐  │
│  │   Repo    │──┼────────►│  │   Repo    │  │
│  │  + PRs    │  │         │  │  + PRs    │  │
│  │  + History│  │         │  │  + History│  │
│  └───────────┘  │         │  └───────────┘  │
└─────────────────┘         └─────────────────┘
```

**GEI Capabilities for Bitbucket Cloud**:
- Full git history with all branches and tags
- Pull requests (open and merged) with comments
- PR review comments and approvals
- Commit comments

---

> **Presenter Note**: "GEI talks directly to the Bitbucket Cloud API, pulls your data, and pushes it to GitHub. It handles rate limiting and retries automatically."

---

## Slide 11: User Identity Planning

### Mapping Bitbucket Users to GitHub

```
BITBUCKET CLOUD          MAPPING OPTIONS          GITHUB EMU
─────────────────────────────────────────────────────────────
user@company.com    ──►  Automatic (email match)  ──►  user_company
                    ──►  Manual CSV mapping       ──►  
                    ──►  Mannequin (placeholder)  ──►  [unmatched]
```

**Identity Strategies**:

| Strategy | When to Use |
|----------|-------------|
| **Email matching** | Same IdP, consistent emails |
| **CSV mapping file** | Different usernames, known mapping |
| **Mannequin reclaim** | Post-migration user assignment |

---

> **Presenter Note**: "If you're using Enterprise Managed Users (EMU), usernames follow a pattern. Create a mapping file before migration—it's much easier than reclaiming mannequins later."

---

## Slide 12: Planning Your Org Structure

### Bitbucket Workspace → GitHub Organization

**Option 1: Direct Mapping**
```
Bitbucket Workspace: acme-corp
    └── GitHub Org: acme-corp
```

**Option 2: Consolidation**
```
Bitbucket Workspaces: acme-frontend, acme-backend, acme-infra
    └── GitHub Org: acme-corp (all repos)
        └── Teams: frontend-team, backend-team, infra-team
```

**Option 3: Reorganization**
```
Bitbucket: Mixed structure
    └── GitHub: Clean taxonomy with naming conventions
        └── acme-corp/frontend-*, acme-corp/backend-*
```

---

> **Presenter Note**: "Migration is an opportunity to clean up org structure. But don't boil the ocean—migrate first, reorganize second if needed. Each repo rename breaks developer workflows."

---

## Slide 13: Demo Time

# 🖥️ LIVE DEMO

### Migration Assessment

- Bitbucket workspace inventory
- Repository size analysis
- Identify migration candidates

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 2**. Show Bitbucket admin settings, repository list, discuss how to gather inventory. Show a repo's branch permissions to highlight complexity. ~4 minutes.

---

# SECTION: Technical Migration Process

---

## Slide 14: Prerequisites Checklist

### Before You Begin

**Tools Required**:
```bash
# Install GitHub CLI
winget install GitHub.cli    # Windows
brew install gh              # macOS

# Install GEI extension
gh extension install github/gh-gei

# Verify installation
gh gei --version
```

**Access Tokens Needed**:

| Platform | Token Type | Scopes Required |
|----------|------------|-----------------|
| Bitbucket Cloud | App password | `repository:read`, `pullrequest:read` |
| GitHub Enterprise | PAT (classic) | `repo`, `admin:org`, `workflow` |

---

> **Presenter Note**: "Set up tokens BEFORE the demo or migration day. Bitbucket app passwords are per-user; create a dedicated migration service account if possible."

---

## Slide 15: Environment Setup

### Configure Your Migration Environment

```powershell
# Set environment variables (PowerShell)
$env:GH_PAT = "ghp_xxxxxxxxxxxxxxxxxxxx"
$env:BBS_USERNAME = "migration-user"
$env:BBS_PASSWORD = "app-password-here"

# Verify GitHub CLI authentication
gh auth status

# Test Bitbucket connection
gh gei generate-script --github-org "target-org" `
    --bitbucket-workspace "source-workspace" `
    --output "migration-script.ps1"
```

---

> **Presenter Note**: "The `generate-script` command creates a customized migration script for your specific workspace. Review it before running—it shows exactly what will happen."

---

## Slide 16: Single Repository Migration

### Step-by-Step Command

```powershell
# Migrate a single repository
gh gei migrate-repo `
    --github-org "contoso" `
    --github-repo "my-application" `
    --bitbucket-workspace "contoso-workspace" `
    --bitbucket-repo "my-application" `
    --verbose

# Monitor progress
gh gei wait-for-migration --migration-id <id>
```

**What Happens**:
1. GEI exports repository from Bitbucket Cloud
2. Creates new repository in GitHub org
3. Pushes git objects (commits, branches, tags)
4. Migrates pull requests with comments
5. Reports completion status

---

> **Presenter Note**: "Start with one non-critical repo to validate your process. The `--verbose` flag shows what's happening; use it for troubleshooting."

---

## Slide 17: Bulk Migration Script

### Migrating Multiple Repositories

```powershell
# Generate migration script for entire workspace
gh gei generate-script `
    --github-org "contoso" `
    --bitbucket-workspace "contoso-workspace" `
    --output "migrate-all.ps1"

# Review the script (IMPORTANT!)
code migrate-all.ps1

# Execute migration
./migrate-all.ps1

# Or migrate specific repos from a list
$repos = @("repo-1", "repo-2", "repo-3")
foreach ($repo in $repos) {
    gh gei migrate-repo `
        --github-org "contoso" `
        --github-repo $repo `
        --bitbucket-workspace "contoso-workspace" `
        --bitbucket-repo $repo
}
```

---

> **Presenter Note**: "Always generate and REVIEW the script first. Look for repos you might want to exclude—archived repos, forks, test repos. Don't migrate garbage."

---

## Slide 18: Handling Large Repositories

### When Repos are > 1GB

**Warning Signs**:
- Migration timeouts
- Memory errors
- Extremely long migration times

**Solutions**:

| Issue | Solution |
|-------|----------|
| Large binary files | Migrate to Git LFS pre or post migration |
| Deep history | Consider `--git-archive-path` for shallow clone |
| Many branches | Clean up stale branches before migration |
| Submodules | Migrate submodule repos first |

```powershell
# Check repository size before migration
# In Bitbucket: Settings → Repository details → Size

# For Git LFS migration post-migration
git lfs migrate import --include="*.zip,*.jar,*.dll"
```

---

> **Presenter Note**: "Large repos are the #1 cause of migration failures. If a repo is over 2GB, plan extra time and consider history trimming. Talk to the team—do they need 10 years of history?"

---

## Slide 19: Demo Time

# 🖥️ LIVE DEMO

### Execute a Migration

- Configure environment
- Run single repo migration
- Monitor progress
- Verify migrated repository

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 3**. Have tokens pre-configured. Migrate a small test repo live. Show the GitHub repo after completion. ~6-7 minutes.

---

# SECTION: Common Hurdles & Solutions

---

## Slide 20: Top Migration Hurdles

### What Goes Wrong (And How to Fix It)

| Hurdle | Impact | Solution |
|--------|--------|----------|
| **Token permission errors** | Migration fails to start | Verify scopes, recreate tokens |
| **Rate limiting** | Slow migration, timeouts | Use `--wait-for-rate-limit` |
| **Large repos timeout** | Incomplete migration | Break into chunks, use archive |
| **User mapping failures** | Commits show mannequins | Pre-create mapping CSV |
| **PR state mismatch** | Merged PRs show as open | Known limitation, document |
| **Branch permission loss** | Security gap post-migration | Rebuild rules immediately |
| **LFS pointer files** | Broken files in repo | Run LFS fetch post-migration |
| **Webhook not migrated** | Broken integrations | Manual recreation required |
| **Repo naming conflicts** | Migration blocked | Rename or archive existing |
| **Network issues** | Partial migration | Retry with `--resume` |

---

> **Presenter Note**: "This is my battle-tested list. Print this slide. The most common issues are token permissions (90% of first failures) and large repositories."

---

## Slide 21: Branch Permission Mapping

### Bitbucket Model vs. GitHub Model

**Bitbucket Branch Permissions**:
```
Branch: main
├── Prevent direct pushes: ✓
├── Require 2 approvals: ✓
├── Require passing builds: ✓
└── Restrict merge access: [team-leads]
```

**GitHub Branch Protection Rules**:
```
Branch: main
├── Require pull request: ✓
│   └── Required approvals: 2
├── Require status checks: ✓
│   └── Required checks: [build, test]
├── Restrict pushes: ✓
│   └── Allow: [team-leads]
└── Require signed commits: ✓ (GitHub extra!)
```

**Key Difference**: GitHub rules are more granular but require explicit configuration

---

> **Presenter Note**: "Branch permissions don't migrate. This is the most security-critical manual step. Document your current Bitbucket permissions BEFORE migration, rebuild them immediately after."

---

## Slide 22: Branch Protection Script

### Automate Post-Migration Configuration

```powershell
# Apply branch protection via GitHub CLI
gh api repos/{owner}/{repo}/branches/main/protection `
    --method PUT `
    --field required_status_checks='{"strict":true,"contexts":["build"]}' `
    --field enforce_admins=true `
    --field required_pull_request_reviews='{"required_approving_review_count":2}' `
    --field restrictions='null'

# Or use a reusable workflow to apply org-wide rules
# See: .github/workflows/apply-branch-protection.yml
```

**Pro Tip**: Create a branch protection template script and apply consistently across all migrated repos

---

> **Presenter Note**: "Script your branch protection. You don't want to manually configure 200 repos. Create a standard template and apply it programmatically."

---

## Slide 23: Pipelines → Actions Migration

### This Requires Manual Work

**Bitbucket Pipelines** (`bitbucket-pipelines.yml`):
```yaml
pipelines:
  default:
    - step:
        name: Build and test
        image: node:18
        script:
          - npm install
          - npm test
```

**GitHub Actions** (`.github/workflows/ci.yml`):
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

---

> **Presenter Note**: "There's no automatic converter. Plan a dedicated CI/CD migration workstream. Start with your most critical pipelines and work down. GitHub Actions is more powerful but different."

---

## Slide 24: Pipelines Conversion Cheat Sheet

### Quick Reference

| Bitbucket Pipelines | GitHub Actions |
|---------------------|----------------|
| `image: node:18` | `container: node:18` or `setup-node` action |
| `script:` | `run:` |
| `parallel:` | Jobs run in parallel by default |
| `step:` | `- name:` under `steps:` |
| `caches: - node` | `actions/cache@v4` |
| `artifacts:` | `actions/upload-artifact@v4` |
| `deployment:` | `environment:` |
| `$BITBUCKET_COMMIT` | `${{ github.sha }}` |
| `$BITBUCKET_BRANCH` | `${{ github.ref_name }}` |
| Pipelines variables | Repository secrets/variables |

---

> **Presenter Note**: "Keep this cheat sheet handy during conversion. The concepts map, but syntax is different. GitHub has better reusable workflows—invest time learning composite actions."

---

## Slide 25: Handling Mannequins

### When Users Don't Map

```
MANNEQUIN: What You See
──────────────────────────
Commit by: ghost-user-12345
PR author: [Mannequin] john@company.com
```

**Reclaiming Mannequins**:

```powershell
# List mannequins in org
gh api orgs/{org}/migrations/{id}/mannequins

# Reclaim mannequin to real user
gh api orgs/{org}/mannequins/{id}/reattribution `
    --method POST `
    --field target_user="actual-github-username"
```

**Best Practice**: Create user mapping CSV BEFORE migration

```csv
bitbucket_username,github_username
john.doe,jdoe_company
jane.smith,jsmith_company
```

---

> **Presenter Note**: "Mannequins happen when GEI can't match a Bitbucket user to a GitHub user. It's recoverable but tedious. Invest time in the mapping CSV upfront."

---

## Slide 26: Demo Time

# 🖥️ LIVE DEMO

### Troubleshooting Common Issues

- Show a failed migration log
- Demonstrate rate limit handling
- User mannequin example

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 4**. Show migration logs, identify common error patterns. If time, show mannequin in a migrated repo. ~4 minutes.

---

# SECTION: Post-Migration & Cutover

---

## Slide 27: Validation Checklist

### Verify Before Declaring Success

```
POST-MIGRATION VALIDATION
═════════════════════════════════════════════════════
□ Git history complete (spot check commits)
□ All branches present
□ All tags present
□ Open PRs migrated with comments
□ Merged PRs show correct merge commits
□ File contents match (hash comparison)
□ Repository size reasonable
□ Default branch set correctly
□ Repository visibility correct (private/internal)
□ Team access configured
□ Branch protection rules applied
□ Webhooks recreated (if needed)
□ CI/CD (Actions) working
```

---

> **Presenter Note**: "Don't skip validation. Run through this checklist for every migrated repo. Better to catch issues before developers start using it."

---

## Slide 28: Validation Commands

### Automated Verification

```powershell
# Compare commit counts
$bbCommits = (git rev-list --count HEAD)  # In Bitbucket clone
$ghCommits = (git rev-list --count HEAD)  # In GitHub clone

# Compare branch list
git branch -r | Sort-Object  # Should match

# Verify specific commit exists
git log --oneline | Select-String "abc1234"

# Check LFS files are real (not pointers)
git lfs ls-files

# Verify latest commit hash matches
git rev-parse HEAD
```

---

> **Presenter Note**: "Automation is your friend. For large migrations, script these checks and run them against every repo. Generate a validation report."

---

## Slide 29: Cutover Strategy

### Minimizing Disruption

```
PARALLEL RUNNING PERIOD (Recommended: 1-2 weeks)
════════════════════════════════════════════════════════

Week -2:  [Bitbucket: Active]     [GitHub: Migrated, read-only]
          Developers continue in Bitbucket
          Validate GitHub migration

Week -1:  [Bitbucket: Active]     [GitHub: Ready]
          Final sync migration
          Developer training sessions

Day 0:    [Bitbucket: Read-only]  [GitHub: Active]
          CUTOVER - All new work in GitHub
          Bitbucket archived

Week +2:  [Bitbucket: Archived]   [GitHub: Active]
          Delete Bitbucket access (retain archive)
```

---

> **Presenter Note**: "Never do a hard cutover on Friday. Plan for parallel running. The final sync happens as close to cutover as possible to minimize delta."

---

## Slide 30: Developer Communication

### What Your Teams Need to Know

**Pre-Migration** (1-2 weeks before):
- [ ] Announce migration timeline
- [ ] Share new GitHub org URLs
- [ ] Provide GitHub onboarding docs
- [ ] Schedule training sessions

**Cutover Day**:
- [ ] "Bitbucket is now read-only"
- [ ] Step-by-step: update remotes
- [ ] Slack/Teams support channel
- [ ] Office hours for questions

```powershell
# Commands developers will run
git remote set-url origin https://github.com/contoso/my-repo.git
git fetch origin
git pull
```

---

> **Presenter Note**: "Communication is 50% of migration success. Developers hate surprises. Over-communicate the timeline and provide very clear instructions."

---

## Slide 31: Demo Time

# 🖥️ LIVE DEMO

### Post-Migration Validation

- Compare source and target repos
- Verify PR migration
- Show branch protection setup

---

> **Presenter Note**: 🖥️ **SWITCH TO DEMO 5**. Open migrated repo in GitHub, compare to Bitbucket original. Show a migrated PR with comments. Apply branch protection. ~4 minutes.

---

# SECTION: Best Practices & Wrap-Up

---

## Slide 32: Migration Best Practices

### Lessons from the Field

✓ **Pilot first** — Migrate 2-3 repos manually, learn the process

✓ **Inventory everything** — No surprises on migration day

✓ **Script repeatable steps** — Branch protection, team access, webhooks

✓ **Test migrations** — Run against non-production repos first

✓ **Plan CI/CD separately** — It's a parallel workstream

✓ **Communicate early and often** — Developers need time to prepare

✓ **Validate thoroughly** — Don't trust, verify

✓ **Have a rollback plan** — Even if you never use it

---

> **Presenter Note**: "If you remember one thing: pilot first. Every organization has unique quirks. Discover them on a test repo, not your most critical codebase."

---

## Slide 33: Common Pitfalls

### What Goes Wrong

| Pitfall | Consequence | Prevention |
|---------|-------------|------------|
| No pilot migration | Issues discovered at scale | Always pilot 2-3 repos first |
| Ignoring large repos | Timeouts, failures | Assess and plan for >1GB repos |
| Forgetting branch protection | Security gap | Script and apply immediately |
| Skipping user mapping | Mannequin cleanup nightmare | Create mapping CSV upfront |
| Big-bang cutover | Mass confusion, rollback chaos | Parallel running period |
| No developer training | Low adoption, complaints | Invest in enablement |
| Migrating everything | Wasted effort, clutter | Archive inactive repos first |

---

> **Presenter Note**: "I've made most of these mistakes. Learn from others' pain. The most costly is usually skipping the pilot—everything else cascades from there."

---

## Slide 34: Your Action Items

### What to Do Next

- [ ] Complete repository inventory (count, sizes, owners)
- [ ] Identify pilot migration candidates (2-3 low-risk repos)
- [ ] Document current branch permissions
- [ ] Create user identity mapping spreadsheet
- [ ] Set up migration service accounts and tokens
- [ ] Plan CI/CD conversion workstream (separate track)
- [ ] Draft developer communication plan
- [ ] Schedule pilot migration date
- [ ] Create validation checklist for your context

---

> **Presenter Note**: "This is your homework. Start with the inventory—you can't plan what you don't know. I recommend scheduling a follow-up after your pilot migration."

---

## Slide 35: Resources

### Learn More

**GitHub Official**:
- [GitHub Enterprise Importer Documentation](https://docs.github.com/en/migrations/using-github-enterprise-importer)
- [Migrating from Bitbucket Cloud](https://docs.github.com/en/migrations/using-github-enterprise-importer/migrating-from-bitbucket-server-to-github-enterprise-cloud)
- [GEI CLI Reference](https://github.com/github/gh-gei)

**Planning & Strategy**:
- [Migration Best Practices](https://docs.github.com/en/migrations/overview/planning-your-migration-to-github)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

**Support**:
- [GitHub Enterprise Support](https://support.github.com)
- [GitHub Community Discussions](https://github.com/orgs/community/discussions)

---

> **Presenter Note**: "The GEI documentation is excellent—read it. For complex migrations, GitHub Professional Services can help accelerate."

---

## Slide 36: Q&A

# Questions?

### Common Topics

- Handling very large repositories
- Complex Pipelines conversions
- Identity provider integration
- Timeline and resource planning
- Rollback scenarios

---

> **Presenter Note**: Leave 5 minutes for Q&A. Have terminal and browser open for live answers. If no questions, offer deeper dive on any section.

---

## Slide 37: Thank You

# Thank You

**Next Steps**:
1. Complete your repository inventory
2. Schedule pilot migration
3. Reach out if you hit blockers

**Follow-up**: Happy to schedule a deeper dive on CI/CD migration or post-migration governance

---

> **Presenter Note**: Thank attendees, remind them of action items, offer continued support.

---

# Appendix: Quick Reference

## Demo Timing Guide

| After Slide | Demo | Duration |
|-------------|------|----------|
| 7 | Bitbucket & GitHub Comparison | 3 min |
| 13 | Migration Assessment | 4 min |
| 19 | Execute a Migration | 6-7 min |
| 26 | Troubleshooting | 4 min |
| 31 | Post-Migration Validation | 4 min |

**Total demo time**: ~21-22 minutes  
**Total slide time**: ~33-35 minutes  
**Buffer/Q&A**: ~5 minutes

---

## GEI Quick Reference Commands

```powershell
# Install GEI
gh extension install github/gh-gei

# Generate migration script (DRY RUN)
gh gei generate-script `
    --github-org "TARGET-ORG" `
    --bitbucket-workspace "SOURCE-WORKSPACE" `
    --output "migration-script.ps1"

# Migrate single repo
gh gei migrate-repo `
    --github-org "TARGET-ORG" `
    --github-repo "REPO-NAME" `
    --bitbucket-workspace "SOURCE-WORKSPACE" `
    --bitbucket-repo "REPO-NAME" `
    --verbose

# Check migration status
gh gei wait-for-migration --migration-id <ID>

# List migrations
gh gei list-migrations --github-org "TARGET-ORG"
```

---

## Environment Variables

```powershell
# Required for GEI
$env:GH_PAT = "ghp_your_github_pat_here"
$env:BBS_USERNAME = "bitbucket_username"
$env:BBS_PASSWORD = "bitbucket_app_password"

# Optional
$env:GH_SOURCE_PAT = "ghp_source_pat"  # If migrating from GitHub
```

---

## Bitbucket App Password Scopes

Required scopes for migration:
- `repository:read` — Read repository contents
- `pullrequest:read` — Read pull request data
- `account:read` — Read user information (for mapping)

Create at: Bitbucket Settings → Personal Settings → App passwords

---

## Terminology Cheat Sheet

| Bitbucket Cloud | GitHub Enterprise Cloud |
|-----------------|------------------------|
| Workspace | Organization |
| Project | Team / Repo prefix |
| Repository | Repository |
| Pull Request | Pull Request |
| Branch Permissions | Branch Protection Rules |
| Pipelines | GitHub Actions |
| Deployments | Environments |
| Repository Variables | Repository Secrets |
| App Password | Personal Access Token (PAT) |
| User Groups | Teams |
| Access Keys | Deploy Keys |
| Snippets | Gists |
| Downloads | Releases |

---

*Slide deck for Bitbucket Cloud to GitHub Enterprise Cloud Migration Workshop*
