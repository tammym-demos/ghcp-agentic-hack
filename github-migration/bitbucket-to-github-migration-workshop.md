# Bitbucket Cloud to GitHub Enterprise Cloud Migration Workshop

**Duration**: 1 hour  
**Format**: Presentation + Live Demo  
**Audience**: Mixed engineering teams (Engineers + Admins + Managers)  
**Focus**: Full migration with GitHub Enterprise Importer (GEI)

---

## Workshop Overview

This session provides engineering teams with a comprehensive guide to migrating from Bitbucket Cloud to GitHub Enterprise Cloud. The format combines presentation slides with live terminal and browser demos, enabling attendees to see real migration workflows in action.

### Learning Objectives

- Understand the conceptual mapping between Bitbucket Cloud and GitHub Enterprise Cloud
- Plan and execute migrations using GitHub Enterprise Importer (GEI)
- Navigate common migration hurdles and their solutions
- Configure post-migration security controls (branch protection, permissions)
- Develop a cutover strategy that minimizes disruption

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | [Why Migrate & Conceptual Mapping](#1-why-migrate--conceptual-mapping-10-min) | 10 min |
| 2 | [Assessment & Planning](#2-assessment--planning-10-min) | 10 min |
| 3 | [Technical Migration Process](#3-technical-migration-process-15-min) | 15 min |
| 4 | [Common Hurdles & Solutions](#4-common-hurdles--solutions-10-min) | 10 min |
| 5 | [Post-Migration & Cutover](#5-post-migration--cutover-10-min) | 10 min |
| 6 | [Best Practices & Wrap-up](#6-best-practices--wrap-up-5-min) | 5 min |

---

## 1. Why Migrate & Conceptual Mapping (10 min)

### Key Points

- Workshop objectives and what attendees will walk away with
- Common drivers for Bitbucket → GitHub migration
- Critical conceptual differences between platforms

### Why Organizations Migrate

| Driver | Business Impact |
|--------|-----------------|
| **Platform consolidation** | Reduce tooling sprawl, single pane of glass |
| **GitHub Copilot** | AI-assisted development only on GitHub |
| **Advanced security** | Code scanning, secret scanning, Dependabot |
| **Actions ecosystem** | 15,000+ marketplace actions |
| **Enterprise features** | EMU, audit logs, IP allow lists |
| **Developer preference** | GitHub is often the team's choice |

### Conceptual Mapping: Bitbucket → GitHub

| Bitbucket Cloud | GitHub Enterprise Cloud | Notes |
|-----------------|------------------------|-------|
| Workspace | Organization | 1:1 or N:1 mapping possible |
| Project | Team or repo prefix | No direct equivalent—use naming conventions |
| Repository | Repository | Direct mapping |
| Branch permissions | Branch protection rules | Different model, requires rebuild |
| Pull request | Pull request | Migrates with GEI |
| Pipelines | GitHub Actions | **Manual conversion required** |
| Deployments | Environments | Manual setup |
| Repository variables | Repository secrets/variables | Manual migration |
| App passwords | Personal access tokens (PATs) | Recreate required |
| User groups | Teams | Manual mapping |
| Access keys | Deploy keys | Manual recreation |
| Snippets | Gists | Manual migration |

### What Migrates vs. What Doesn't

**Migrates with GEI**:
- ✓ Full git history (all commits, all branches, all tags)
- ✓ Pull requests (open and closed) with comments
- ✓ PR review comments and approvals
- ✓ Commit comments

**Requires Manual Work**:
- ✗ Bitbucket Pipelines → GitHub Actions
- ✗ Pipeline variables/secrets
- ✗ Deployment configurations
- ✗ Webhooks
- ✗ Repository hooks
- ✗ Downloads/releases
- ✗ Wiki content (different format)
- ✗ Branch permissions (must rebuild as protection rules)

### Discussion Points

- What's driving your migration decision?
- What's your timeline and any hard deadlines?
- Have you inventoried your Bitbucket repositories?

---

## 2. Assessment & Planning (10 min)

### Pre-Migration Assessment Checklist

| Area | Questions to Answer |
|------|---------------------|
| **Inventory** | How many repos? Total size? Largest repo? |
| **Activity** | Which repos are actively developed? |
| **Integrations** | What connects to Bitbucket? (CI, Jira, Slack, etc.) |
| **Users** | How many users? What identity provider? |
| **Permissions** | Complex branch permissions? Who are repo admins? |
| **Pipelines** | How many active pipelines? What complexity? |
| **Timeline** | Hard deadline? Parallel running period acceptable? |

### Migration Tool Selection

| Approach | Best For | Limitations |
|----------|----------|-------------|
| **GitHub Enterprise Importer (GEI)** | Full migration with PR history | Requires GitHub CLI, some setup |
| **`git clone` + `git push`** | Simple repos, no PR history needed | Loses PRs, issues, metadata |
| **GitHub Importer (web)** | Quick single-repo imports | No PR history, limited scale |
| **Third-party tools** | Complex scenarios | Additional cost, vendor lock-in |

**Recommendation**: GEI for enterprise migrations—it's free, supported by GitHub, and handles PR history.

### GitHub Enterprise Importer Architecture

```
┌─────────────────────┐           ┌─────────────────────┐
│   Bitbucket Cloud   │           │  GitHub Enterprise  │
│                     │           │       Cloud         │
│  ┌───────────────┐  │    GEI    │  ┌───────────────┐  │
│  │  Repository   │  │ ────────► │  │  Repository   │  │
│  │  + History    │  │           │  │  + History    │  │
│  │  + PRs        │  │           │  │  + PRs        │  │
│  │  + Comments   │  │           │  │  + Comments   │  │
│  └───────────────┘  │           │  └───────────────┘  │
└─────────────────────┘           └─────────────────────┘
         │                                   │
         └───── Bitbucket API ◄──── GEI ────►└── GitHub API
```

### User Identity Mapping

```
BITBUCKET CLOUD           MAPPING OPTIONS           GITHUB EMU
───────────────────────────────────────────────────────────────
user@company.com    ──►  Automatic (email match)  ──►  user_company
                    ──►  Manual CSV mapping       ──►  
                    ──►  Mannequin (placeholder)  ──►  [unmatched]
```

**Identity Strategies**:

| Strategy | When to Use |
|----------|-------------|
| **Email matching** | Same IdP, consistent emails across platforms |
| **CSV mapping file** | Different usernames, known mapping exists |
| **Mannequin reclaim** | Post-migration user assignment (slower) |

**Best Practice**: Create user mapping CSV BEFORE migration

```csv
bitbucket_username,github_username
john.doe,jdoe_company
jane.smith,jsmith_company
svc-build,svc-build_company
```

### 🖥️ Demo: Migration Assessment

**Location**: Bitbucket Cloud Admin + Terminal

1. Navigate to Bitbucket workspace settings
2. Show repository list and sizes
3. Identify migration complexity factors
4. Discuss workspace-to-org mapping strategy

---

## 3. Technical Migration Process (15 min)

### Prerequisites Checklist

**Tools Required**:

```powershell
# Install GitHub CLI (Windows)
winget install GitHub.cli

# Install GitHub CLI (macOS)
brew install gh

# Verify installation
gh --version

# Install GEI extension
gh extension install github/gh-gei

# Verify GEI
gh gei --version
```

**Access Tokens Needed**:

| Platform | Token Type | Scopes Required |
|----------|------------|-----------------|
| Bitbucket Cloud | App password | `repository:read`, `pullrequest:read`, `account:read` |
| GitHub Enterprise | PAT (classic) | `repo`, `admin:org`, `workflow` |

### Creating Bitbucket App Password

1. Navigate to: Bitbucket → Personal Settings → App passwords
2. Click "Create app password"
3. Label: `github-migration`
4. Permissions:
   - ✓ Repository: Read
   - ✓ Pull requests: Read
   - ✓ Account: Read
5. Copy and save the password securely

### Creating GitHub Personal Access Token

1. Navigate to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Note: `GEI Migration Token`
4. Expiration: Set appropriate timeframe
5. Scopes:
   - ✓ repo (all)
   - ✓ admin:org (all)
   - ✓ workflow
6. Generate and copy token

### Environment Setup

```powershell
# Set environment variables (PowerShell)
$env:GH_PAT = "ghp_xxxxxxxxxxxxxxxxxxxx"
$env:BBS_USERNAME = "your-bitbucket-username"
$env:BBS_PASSWORD = "your-app-password"

# Verify GitHub CLI authentication
gh auth status

# Verify GEI can connect
gh gei --help
```

```bash
# Set environment variables (Bash/macOS/Linux)
export GH_PAT="ghp_xxxxxxxxxxxxxxxxxxxx"
export BBS_USERNAME="your-bitbucket-username"
export BBS_PASSWORD="your-app-password"

# Verify GitHub CLI authentication
gh auth status
```

### Generate Migration Script (Dry Run)

```powershell
# Generate a migration script for your entire workspace
gh gei generate-script `
    --github-org "target-github-org" `
    --bitbucket-workspace "source-bitbucket-workspace" `
    --output "migration-script.ps1"

# IMPORTANT: Review the script before running
code migration-script.ps1
```

**What to look for in the script**:
- Repository names that should be excluded
- Archived repositories
- Forked repositories
- Test/sandbox repositories

### Single Repository Migration

```powershell
# Migrate a single repository
gh gei migrate-repo `
    --github-org "contoso" `
    --github-repo "my-application" `
    --bitbucket-workspace "contoso-workspace" `
    --bitbucket-repo "my-application" `
    --verbose

# The command returns a migration ID
# Monitor progress with:
gh gei wait-for-migration --migration-id <MIGRATION_ID>
```

**What Happens During Migration**:
1. GEI authenticates to Bitbucket Cloud API
2. Exports repository data (git objects, PRs, comments)
3. Creates new repository in GitHub organization
4. Pushes git objects (commits, branches, tags)
5. Migrates pull requests with all comments and reviews
6. Reports completion status

### Bulk Migration

```powershell
# Option 1: Use generated script
./migration-script.ps1

# Option 2: Migrate specific repos from a list
$repos = @("api-service", "web-frontend", "shared-libs")

foreach ($repo in $repos) {
    Write-Host "Migrating $repo..."
    gh gei migrate-repo `
        --github-org "contoso" `
        --github-repo $repo `
        --bitbucket-workspace "contoso-workspace" `
        --bitbucket-repo $repo
}

# Option 3: Parallel migrations (advanced)
# Use separate terminal sessions or background jobs
```

### Handling Large Repositories (>1GB)

**Warning Signs**:
- Migration timeouts
- Memory errors
- Extremely long migration times (>1 hour per repo)

**Pre-Migration Cleanup**:

```bash
# Check repository size (in local clone)
git count-objects -vH

# Find large files
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sort -k3 -n -r | head -20

# Consider cleaning before migration
git filter-repo --strip-blobs-bigger-than 100M
```

**Solutions**:

| Issue | Solution |
|-------|----------|
| Large binary files | Migrate to Git LFS post-migration |
| Deep history (10+ years) | Consider shallow clone or history truncation |
| Many stale branches | Clean up branches before migration |
| Submodules | Migrate submodule repos first |

### 🖥️ Demo: Execute a Migration

**Environment**: Terminal + GitHub browser

1. Configure environment variables
2. Run single repo migration with `--verbose`
3. Monitor migration progress
4. Verify migrated repository in GitHub
5. Compare commit counts and branches

---

## 4. Common Hurdles & Solutions (10 min)

### Top 10 Migration Hurdles

| # | Hurdle | Impact | Solution |
|---|--------|--------|----------|
| 1 | Token permission errors | Migration fails to start | Verify scopes, recreate tokens |
| 2 | Rate limiting | Slow migration, timeouts | Use `--wait-for-rate-limit` flag |
| 3 | Large repos timeout | Incomplete migration | Break into chunks, use archive method |
| 4 | User mapping failures | Commits show mannequins | Pre-create mapping CSV |
| 5 | Branch permission loss | Security gap post-migration | Rebuild rules immediately |
| 6 | LFS pointer files | Broken binary files | Run `git lfs fetch --all` post-migration |
| 7 | Webhook not migrated | Broken integrations | Manual recreation required |
| 8 | Repo naming conflicts | Migration blocked | Rename or archive existing GitHub repo |
| 9 | Network timeouts | Partial migration | Retry with `--resume` |
| 10 | PR state mismatch | Merged PRs show incorrectly | Known limitation, document for team |

### Branch Permission Mapping

**This is the most security-critical manual step.** Branch permissions do NOT migrate.

**Bitbucket Branch Permissions Model**:
```yaml
Branch: main
  - Prevent direct pushes: Yes
  - Require 2 approvals: Yes
  - Require passing builds: Yes
  - Restrict merge access: team-leads group
```

**GitHub Branch Protection Rules Model**:
```yaml
Branch: main
  - Require pull request before merging: Yes
    - Required approving reviews: 2
    - Dismiss stale reviews: Yes
    - Require review from code owners: Optional
  - Require status checks to pass: Yes
    - Required checks: [build, test]
  - Restrict who can push: Yes
    - Allowed: team-leads team
  - Require signed commits: Yes (GitHub additional feature)
  - Include administrators: Optional
```

### Branch Protection Script

```powershell
# Apply branch protection via GitHub CLI
gh api repos/contoso/my-application/branches/main/protection `
    --method PUT `
    --header "Accept: application/vnd.github+json" `
    --field required_status_checks='{"strict":true,"contexts":["build","test"]}' `
    --field enforce_admins=true `
    --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true}' `
    --field restrictions='null' `
    --field required_linear_history=false `
    --field allow_force_pushes=false `
    --field allow_deletions=false
```

**Pro Tip**: Create a reusable script that applies consistent branch protection across all migrated repos:

```powershell
# apply-branch-protection.ps1
param(
    [Parameter(Mandatory)]
    [string]$Org,
    
    [Parameter(Mandatory)]
    [string]$Repo,
    
    [string]$Branch = "main"
)

gh api repos/$Org/$Repo/branches/$Branch/protection `
    --method PUT `
    --input protection-template.json
```

### Pipelines → Actions Conversion

**There is no automatic converter.** Plan this as a separate workstream.

**Bitbucket Pipelines** (`bitbucket-pipelines.yml`):
```yaml
image: node:18

pipelines:
  default:
    - step:
        name: Build and test
        caches:
          - node
        script:
          - npm ci
          - npm test
          - npm run build
        artifacts:
          - dist/**
    
    - step:
        name: Deploy
        deployment: production
        script:
          - npm run deploy
```

**Equivalent GitHub Actions** (`.github/workflows/ci.yml`):
```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm test
      - run: npm run build
      
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - run: npm run deploy
```

### Pipelines Conversion Cheat Sheet

| Bitbucket Pipelines | GitHub Actions |
|---------------------|----------------|
| `image: node:18` | `container: node:18` OR `setup-node` action |
| `script:` | `run:` |
| `parallel:` | Jobs run in parallel by default |
| `step:` | `- name:` under `steps:` |
| `caches: - node` | `actions/cache@v4` or built-in cache in setup actions |
| `artifacts:` | `actions/upload-artifact@v4` |
| `deployment: prod` | `environment: production` |
| `$BITBUCKET_COMMIT` | `${{ github.sha }}` |
| `$BITBUCKET_BRANCH` | `${{ github.ref_name }}` |
| `$BITBUCKET_REPO_SLUG` | `${{ github.event.repository.name }}` |
| Pipelines variables | Repository secrets (`${{ secrets.NAME }}`) |
| Pipelines secure variables | Repository secrets (encrypted) |

### Handling Mannequins

When GEI can't match a Bitbucket user to a GitHub user, it creates a "mannequin"—a placeholder identity.

**What You See**:
```
Commit author: mona-ghost-abc123
PR created by: [Mannequin] john@company.com
```

**Reclaiming Process**:

```powershell
# List all mannequins in the organization
gh api orgs/contoso/migrations --jq '.[].id' | ForEach-Object {
    gh api orgs/contoso/migrations/$_/mannequins
}

# Reclaim a specific mannequin
gh api orgs/contoso/mannequins/<mannequin-id>/reattribution `
    --method POST `
    --field target_user="actual-github-username"
```

**Prevention**: Create and use mapping file during migration:

```powershell
gh gei migrate-repo `
    --github-org "contoso" `
    --github-repo "my-app" `
    --bitbucket-workspace "contoso-workspace" `
    --bitbucket-repo "my-app" `
    --user-mappings-path "./user-mappings.csv"
```

### 🖥️ Demo: Troubleshooting

**Environment**: Terminal + GitHub browser

1. Show migration log analysis
2. Demonstrate error identification
3. Show mannequin in a migrated repo
4. Walk through reclaim process

---

## 5. Post-Migration & Cutover (10 min)

### Validation Checklist

Run through this for **every** migrated repository:

```
POST-MIGRATION VALIDATION
════════════════════════════════════════════════════════
□ Git history complete
    → Compare commit counts: Bitbucket vs GitHub
    → Spot check specific commits exist
    
□ Branches present
    → Compare branch list
    → Verify default branch is correct
    
□ Tags present
    → Compare tag list
    → Verify release tags exist
    
□ Pull requests migrated
    → Open PRs viewable with comments
    → Merged PRs show correct merge commits
    → PR review threads intact
    
□ File contents match
    → Spot check critical files
    → Verify file sizes (especially binaries)
    
□ Security configured
    → Branch protection rules applied
    → Team access configured
    → Repository visibility correct (private/internal)
    
□ CI/CD operational (if converted)
    → GitHub Actions workflows running
    → Required status checks configured
```

### Validation Scripts

```powershell
# Compare commit counts
function Compare-CommitCounts {
    param($BitbucketClone, $GitHubClone)
    
    $bbCount = (git -C $BitbucketClone rev-list --count HEAD)
    $ghCount = (git -C $GitHubClone rev-list --count HEAD)
    
    if ($bbCount -eq $ghCount) {
        Write-Host "✓ Commit counts match: $bbCount" -ForegroundColor Green
    } else {
        Write-Host "✗ Mismatch! Bitbucket: $bbCount, GitHub: $ghCount" -ForegroundColor Red
    }
}

# Compare branches
function Compare-Branches {
    param($BitbucketClone, $GitHubClone)
    
    $bbBranches = git -C $BitbucketClone branch -r | Sort-Object
    $ghBranches = git -C $GitHubClone branch -r | Sort-Object
    
    Compare-Object $bbBranches $ghBranches
}

# Verify latest commit hash
function Verify-LatestCommit {
    param($BitbucketClone, $GitHubClone)
    
    $bbHash = git -C $BitbucketClone rev-parse HEAD
    $ghHash = git -C $GitHubClone rev-parse HEAD
    
    if ($bbHash -eq $ghHash) {
        Write-Host "✓ HEAD matches: $bbHash" -ForegroundColor Green
    } else {
        Write-Host "✗ HEAD mismatch!" -ForegroundColor Red
    }
}
```

### Cutover Strategy

**Recommended: Parallel Running Period (1-2 weeks)**

```
TIMELINE
═══════════════════════════════════════════════════════════════

Week -2:  PREPARATION
          ├── Migration complete
          ├── GitHub repos in read-only/testing mode
          ├── Validation in progress
          └── Bitbucket: Active development continues

Week -1:  FINAL PREP
          ├── Developer training sessions
          ├── Communication sent to all teams
          ├── Final sync migration (delta)
          └── Bitbucket: Still active

Day 0:    CUTOVER
          ├── Bitbucket → Read-only mode
          ├── GitHub → Active (all new work here)
          ├── Support channel active
          └── Office hours for questions

Week +1:  STABILIZATION
          ├── Monitor for issues
          ├── Address stragglers
          └── Bitbucket: Read-only archive

Week +2:  CLOSURE
          ├── Revoke Bitbucket write access
          ├── Archive or delete Bitbucket workspace
          └── Post-migration retrospective
```

### Developer Communication Plan

**Pre-Migration (2 weeks before)**:
- [ ] Email announcement with timeline
- [ ] Updated URLs/bookmarks document
- [ ] GitHub access verification instructions
- [ ] Training session invites

**Pre-Migration (1 week before)**:
- [ ] Reminder email with checklist
- [ ] "How to update your remotes" guide
- [ ] FAQ document published
- [ ] Support channel created (Slack/Teams)

**Cutover Day**:
- [ ] "Bitbucket is now read-only" announcement
- [ ] Step-by-step remote update instructions
- [ ] Office hours schedule
- [ ] Escalation path for blockers

### Remote Update Instructions for Developers

```bash
# Step 1: Verify current remote
git remote -v
# origin  https://bitbucket.org/workspace/repo.git (fetch)
# origin  https://bitbucket.org/workspace/repo.git (push)

# Step 2: Update remote URL
git remote set-url origin https://github.com/org/repo.git

# Step 3: Verify new remote
git remote -v
# origin  https://github.com/org/repo.git (fetch)
# origin  https://github.com/org/repo.git (push)

# Step 4: Fetch from new remote
git fetch origin

# Step 5: Ensure local branch tracks new remote
git branch --set-upstream-to=origin/main main

# Step 6: Pull latest
git pull
```

### 🖥️ Demo: Post-Migration Validation

**Environment**: GitHub browser + Terminal

1. Compare source and target repositories
2. Verify a migrated PR with comments
3. Apply branch protection rules
4. Show developer remote update commands

---

## 6. Best Practices & Wrap-up (5 min)

### Migration Best Practices Summary

✓ **Pilot first** — Migrate 2-3 non-critical repos, learn the process, refine approach

✓ **Inventory everything** — Know your repo count, sizes, and complexity before starting

✓ **Script repeatable steps** — Branch protection, team access, webhooks should be automated

✓ **Test migrations** — Run against non-production repos; verify before declaring success

✓ **Plan CI/CD separately** — It's a parallel workstream with different skills needed

✓ **Create user mapping upfront** — Prevents mannequin cleanup nightmare

✓ **Communicate early and often** — Developers need time to prepare; over-communicate

✓ **Validate thoroughly** — Don't trust, verify every migrated repo

✓ **Have a rollback plan** — Even if you don't use it, stakeholders need confidence

✓ **Document everything** — Future you will thank present you

### Common Pitfalls to Avoid

| Pitfall | Consequence | Prevention |
|---------|-------------|------------|
| No pilot migration | Issues discovered at scale, panic | Always pilot 2-3 repos first |
| Ignoring large repos | Timeouts, failures, delays | Assess and plan for >1GB repos |
| Skipping branch protection | Security gap, compliance issue | Script and apply immediately |
| No user mapping | Mannequin cleanup takes weeks | Create mapping CSV upfront |
| Big-bang cutover | Mass confusion, rollback chaos | Parallel running period |
| No developer training | Low adoption, frustrated teams | Invest in enablement |
| Migrating everything | Wasted effort, clutter | Archive inactive repos first |
| Underestimating Pipelines | CI/CD breaks, blocked releases | Separate workstream, dedicated time |

### Your Action Items

**Immediate (This Week)**:
- [ ] Complete repository inventory (count, sizes, owners)
- [ ] Identify pilot migration candidates (2-3 low-risk repos)
- [ ] Document current branch permissions for critical repos
- [ ] Create user identity mapping spreadsheet

**Short-Term (Next 2 Weeks)**:
- [ ] Set up migration service accounts and tokens
- [ ] Execute pilot migration
- [ ] Develop branch protection scripts
- [ ] Plan CI/CD conversion workstream (separate track)

**Pre-Cutover**:
- [ ] Draft developer communication plan
- [ ] Create validation checklist customized for your repos
- [ ] Schedule training sessions
- [ ] Define rollback criteria and process

### Q&A Topics to Prepare For

- Very large repository handling (>5GB)
- Complex Pipelines with deployment targets
- Jira integration migration
- Multiple workspace consolidation
- Timeline and resource estimation
- Handling resistance from teams

---

## Appendix: Quick Reference

### Key URLs

| Resource | URL |
|----------|-----|
| GEI Documentation | `docs.github.com/en/migrations/using-github-enterprise-importer` |
| Bitbucket Cloud Migration Guide | `docs.github.com/en/migrations/using-github-enterprise-importer/migrating-from-bitbucket-server-to-github` |
| GEI CLI (gh-gei) | `github.com/github/gh-gei` |
| GitHub Actions Docs | `docs.github.com/en/actions` |
| Branch Protection API | `docs.github.com/en/rest/branches/branch-protection` |

### GEI Quick Reference Commands

```powershell
# Install GEI extension
gh extension install github/gh-gei

# Verify installation
gh gei --version

# Generate migration script (review before running!)
gh gei generate-script `
    --github-org "TARGET-ORG" `
    --bitbucket-workspace "SOURCE-WORKSPACE" `
    --output "migration-script.ps1"

# Migrate single repository
gh gei migrate-repo `
    --github-org "TARGET-ORG" `
    --github-repo "REPO-NAME" `
    --bitbucket-workspace "SOURCE-WORKSPACE" `
    --bitbucket-repo "REPO-NAME" `
    --verbose

# With user mapping
gh gei migrate-repo `
    --github-org "TARGET-ORG" `
    --github-repo "REPO-NAME" `
    --bitbucket-workspace "SOURCE-WORKSPACE" `
    --bitbucket-repo "REPO-NAME" `
    --user-mappings-path "./user-mappings.csv"

# Check migration status
gh gei wait-for-migration --migration-id <ID>

# List all migrations for an org
gh gei list-migrations --github-org "TARGET-ORG"

# Get migration details
gh gei get-migration --migration-id <ID>
```

### Environment Variables Reference

```powershell
# Required for GEI (PowerShell)
$env:GH_PAT = "ghp_your_github_pat_here"           # GitHub PAT
$env:BBS_USERNAME = "bitbucket_username"            # Bitbucket username
$env:BBS_PASSWORD = "bitbucket_app_password"        # Bitbucket app password

# Required for GEI (Bash)
export GH_PAT="ghp_your_github_pat_here"
export BBS_USERNAME="bitbucket_username"
export BBS_PASSWORD="bitbucket_app_password"
```

### Bitbucket App Password Required Scopes

| Scope | Required For |
|-------|--------------|
| `repository:read` | Read repository contents |
| `pullrequest:read` | Read pull request data |
| `account:read` | Read user information for mapping |

**Create at**: Bitbucket → Personal Settings → App passwords

### GitHub PAT Required Scopes

| Scope | Required For |
|-------|--------------|
| `repo` (all) | Create and write to repositories |
| `admin:org` (all) | Create repos in organization |
| `workflow` | Migrate workflow files |

**Create at**: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

### Terminology Cheat Sheet

| Bitbucket Cloud | GitHub Enterprise Cloud |
|-----------------|------------------------|
| Workspace | Organization |
| Project | Team / Repo naming prefix |
| Repository | Repository |
| Pull Request | Pull Request |
| Branch Permissions | Branch Protection Rules |
| Pipelines | GitHub Actions |
| Pipelines Variables | Repository/Org Secrets |
| Deployments | Environments |
| App Password | Personal Access Token (PAT) |
| User Groups | Teams |
| Access Keys | Deploy Keys |
| Snippets | Gists |
| Downloads | Releases |

---

## Live Demo Scripts (Instructor Reference)

> **Environment**: Terminal (PowerShell or Bash) + GitHub Browser + Bitbucket Browser  
> **Prerequisites**: GEI installed, tokens configured, test workspace available

---

### Demo 1: Bitbucket & GitHub Comparison (Section 1)

**Objective**: Show conceptual mapping between platforms side-by-side

#### Setup Before Demo
- Have Bitbucket workspace open in one browser tab
- Have equivalent GitHub org open in another tab
- Prepare a repository that exists in both for comparison

#### Step-by-Step Script

1. **Show Bitbucket Workspace Structure**
   ```
   URL: https://bitbucket.org/[WORKSPACE]/workspace/overview
   ```
   - Point out: Workspace name, Projects grouping, Repository list
   - **Talking point**: "Workspaces are your top-level container in Bitbucket. Notice how Projects group repositories—GitHub doesn't have this exact concept."

2. **Show GitHub Organization Structure**
   ```
   URL: https://github.com/orgs/[ORG]/repositories
   ```
   - Point out: Organization name, Teams, Repository list
   - **Talking point**: "In GitHub, Teams provide grouping and permissions. Repository naming conventions can replicate Bitbucket's Project grouping."

3. **Compare Repository Settings**
   - Bitbucket: Repository Settings → Branch permissions
   - GitHub: Repository Settings → Branches → Branch protection rules
   - **Talking point**: "Branch permissions won't migrate—we'll need to recreate these as protection rules."

4. **Show Pipelines vs Actions**
   - Bitbucket: Repository → Pipelines
   - GitHub: Repository → Actions
   - **Talking point**: "CI/CD is a separate migration workstream. The syntax differs significantly."

#### Key Points to Emphasize
- Terminology differs but concepts map
- Branch permissions are a critical rebuild item
- Pipelines require manual conversion

---

### Demo 2: Migration Assessment (Section 2)

**Objective**: Show how to inventory and assess a Bitbucket workspace

#### Step-by-Step Script

1. **Navigate to Workspace Settings**
   ```
   URL: https://bitbucket.org/[WORKSPACE]/workspace/settings/repository-list
   ```
   - Show the complete repository list
   - **Talking point**: "This is your inventory. Note the repository count and pay attention to unusually large repos."

2. **Check Repository Sizes**
   - Click into a repository → Settings → Repository details
   - Show the size metric
   - **Talking point**: "Repos over 1GB need special attention. Very large repos may timeout during migration."

3. **Review Branch Permissions** (for a sample repo)
   ```
   URL: https://bitbucket.org/[WORKSPACE]/[REPO]/admin/branch-permissions
   ```
   - Document the current settings
   - **Talking point**: "Screenshot or document these now. You'll recreate them as GitHub branch protection rules."

4. **Check Active Pipelines**
   ```
   URL: https://bitbucket.org/[WORKSPACE]/[REPO]/pipelines
   ```
   - Show pipeline configuration
   - **Talking point**: "Identify which repos have active pipelines. These are your CI/CD conversion candidates."

5. **User List** (for mapping)
   ```
   URL: https://bitbucket.org/[WORKSPACE]/workspace/settings/groups
   ```
   - Show user groups and members
   - **Talking point**: "Export this user list. You'll create a mapping file to GitHub usernames."

---

### Demo 3: Execute a Migration (Section 3)

**Objective**: Perform a live repository migration using GEI

#### Setup Before Demo
- Environment variables configured
- A small test repository ready in Bitbucket
- Target GitHub org created

#### Step-by-Step Script

1. **Verify Environment**
   ```powershell
   # Check GEI installed
   gh gei --version
   
   # Verify GitHub auth
   gh auth status
   
   # Confirm env vars (don't display passwords!)
   Write-Host "Bitbucket user: $env:BBS_USERNAME"
   ```

2. **Generate Migration Script (Dry Run)**
   ```powershell
   gh gei generate-script `
       --github-org "demo-target-org" `
       --bitbucket-workspace "demo-workspace" `
       --output "demo-migration.ps1"
   
   # Open and review
   code demo-migration.ps1
   ```
   - **Talking point**: "Always generate and review first. This shows exactly what will be migrated."

3. **Execute Single Repo Migration**
   ```powershell
   gh gei migrate-repo `
       --github-org "demo-target-org" `
       --github-repo "demo-repo" `
       --bitbucket-workspace "demo-workspace" `
       --bitbucket-repo "demo-repo" `
       --verbose
   ```
   - Watch the progress output
   - **Talking point**: "The verbose flag shows each step. This is invaluable for troubleshooting."

4. **Verify Migration**
   ```
   URL: https://github.com/demo-target-org/demo-repo
   ```
   - Show commit history
   - Show branches
   - Show migrated PRs (if any)
   - **Talking point**: "Always verify. Compare commit counts, check that PRs include comments."

5. **Compare Commit Counts**
   ```powershell
   # Quick verification
   git clone https://github.com/demo-target-org/demo-repo gh-clone
   cd gh-clone
   git rev-list --count HEAD
   # Compare to Bitbucket commit count
   ```

---

### Demo 4: Troubleshooting (Section 4)

**Objective**: Show how to identify and resolve common migration issues

#### Step-by-Step Script

1. **Show Migration Logs**
   ```powershell
   # List recent migrations
   gh gei list-migrations --github-org "demo-target-org"
   
   # Get details of a specific migration
   gh gei get-migration --migration-id <ID>
   ```
   - **Talking point**: "If a migration fails, this is where you start. The log shows exactly what went wrong."

2. **Demonstrate Error Patterns**
   - Show example of auth error (if you have one)
   - Show rate limit handling
   - **Talking point**: "Auth errors are 90% of first-time failures. Double-check token scopes."

3. **Show Mannequin** (if available)
   - Navigate to a migrated repo
   - Find a commit or PR from unmapped user
   - **Talking point**: "Mannequins happen when we can't match a Bitbucket user. This is why the mapping file is important."

4. **Mannequin Reclaim API** (explain, don't run live)
   ```powershell
   # Example command to reclaim
   gh api orgs/demo-target-org/mannequins/<id>/reattribution `
       --method POST `
       --field target_user="real-github-username"
   ```

---

### Demo 5: Post-Migration Validation (Section 5)

**Objective**: Show validation process and branch protection setup

#### Step-by-Step Script

1. **Compare Repositories**
   - Open Bitbucket repo and GitHub repo side-by-side
   - Compare: Commit count, branch list, recent commits
   - **Talking point**: "Visual comparison is quick but not sufficient for sign-off. Use scripts for thorough validation."

2. **Verify a Migrated PR**
   ```
   URL: https://github.com/demo-target-org/demo-repo/pulls?q=is:closed
   ```
   - Open a closed PR
   - Show comments migrated
   - Show review threads intact
   - **Talking point**: "PR history is often the most valuable metadata. Verify comments survived."

3. **Apply Branch Protection**
   ```powershell
   gh api repos/demo-target-org/demo-repo/branches/main/protection `
       --method PUT `
       --field required_status_checks='{"strict":true,"contexts":[]}' `
       --field enforce_admins=true `
       --field required_pull_request_reviews='{"required_approving_review_count":1}'
   ```
   - **Talking point**: "Script this. You don't want to manually configure 100 repos."

4. **Show Branch Protection in UI**
   ```
   URL: https://github.com/demo-target-org/demo-repo/settings/branches
   ```
   - Show the rule now applied
   - **Talking point**: "Verify in the UI that your API call worked correctly."

5. **Developer Remote Update**
   ```bash
   # What developers will run
   git remote set-url origin https://github.com/demo-target-org/demo-repo.git
   git fetch origin
   git pull
   ```
   - **Talking point**: "Share these exact commands with your developers. Keep it simple."

---

### Pre-Demo Checklist

Run through this before the workshop:

- [ ] GEI extension installed and working (`gh gei --version`)
- [ ] GitHub PAT created with correct scopes
- [ ] Bitbucket app password created with correct scopes
- [ ] Environment variables set in terminal
- [ ] Test Bitbucket workspace with 2-3 small repos
- [ ] Target GitHub org created and accessible
- [ ] Network connectivity to both platforms verified
- [ ] Screen sharing shows terminal clearly (increase font size)
- [ ] Backup screenshots ready in case of connectivity issues
- [ ] Have the existing governance slides open for format reference

### Backup Plan

If live demo fails:
1. Use pre-recorded terminal session
2. Switch to GitHub Docs walkthrough: https://docs.github.com/en/migrations
3. Show screenshots of successful migrations
4. Engage audience with Q&A while troubleshooting

### Timing Guide

| After Section | Demo | Duration |
|---------------|------|----------|
| Section 1 | Bitbucket & GitHub Comparison | 3 min |
| Section 2 | Migration Assessment | 4 min |
| Section 3 | Execute a Migration | 6-7 min |
| Section 4 | Troubleshooting | 4 min |
| Section 5 | Post-Migration Validation | 4 min |

**Total demo time**: ~21-22 minutes  
**Total presentation time**: ~33-35 minutes  
**Buffer/Q&A**: ~5 minutes

---

## Post-Workshop Actions

- [ ] Complete repository inventory with sizes and owners
- [ ] Identify 2-3 pilot repositories for test migration
- [ ] Document current branch permissions for critical repos
- [ ] Create user identity mapping CSV file
- [ ] Set up migration service account with required tokens
- [ ] Execute pilot migration and validate
- [ ] Develop branch protection automation scripts
- [ ] Plan CI/CD conversion workstream timeline
- [ ] Draft developer communication and training plan
- [ ] Schedule follow-up session after pilot completion

---

*Workshop materials prepared for Bitbucket Cloud to GitHub Enterprise Cloud migration training*
