# EMU + Open Source Package Consumption — Artifact Proxy Setup Guide

**Target EMU enterprise**: `tpi-test`  
**Target EMU organization**: `tpi-thirdparty-oss`  
**Package ecosystems**: npm, NuGet (extensible to Maven, PyPI, containers)  
**Demo upstream repo**: `tpi-thirdparty-oss/github-api-explorer` (mirrored in the source mirroring guide)

> **Note**: This guide covers **Scenario 1 — Package Consumption** from the EMU + OSS workshop. It sets up a governed pathway for developers to consume open source packages (npm, NuGet) from public registries while maintaining visibility, license compliance, and vulnerability awareness inside the enterprise.

---

## Table of Contents

- [The Problem](#the-problem)
- [Architecture Overview](#architecture-overview)
- [Part 1 — Choose Your Governance Model](#part-1--choose-your-governance-model)
- [Part 1A — GitHub Packages for Internal Libraries (Optional)](#part-1a--github-packages-for-internal-libraries-optional)
- [Part 2 — Dependabot on Product Repos](#part-2--dependabot-on-product-repos)
- [Part 3 — Dependency Review Gate on Product Repos](#part-3--dependency-review-gate-on-product-repos)
- [Part 4 — Package Allowlist Enforcement (GitHub Actions)](#part-4--package-allowlist-enforcement-github-actions)
- [Part 5 — Azure Artifacts as a Full Proxy (Production Pattern)](#part-5--azure-artifacts-as-a-full-proxy-production-pattern)
- [Part 6 — Verification & Testing](#part-6--verification--testing)
- [Appendix — FAQ](#appendix--faq)

---

## The Problem

EMU restricts managed users from **git-level interactions** with public repositories (fork, PR, issue, comment). However, EMU does **not** block package downloads — running `npm install` or `dotnet restore` from a developer workstation or CI runner works fine because those tools use package registry APIs (npmjs.com, nuget.org), not GitHub's git API.

So the challenge isn't access — it's **governance**:

- How do you know what open source packages are in use across your enterprise?
- How do you enforce license compliance (e.g., block GPL-licensed packages)?
- How do you ensure vulnerable packages are detected and updated?
- How do you prevent developers from adding unapproved dependencies?

This guide sets up the governance layer using GitHub-native tools, with an optional Azure Artifacts proxy for enterprises that want full registry-level control.

---

## Architecture Overview

### Demo Architecture (Parts 1–4)

Uses GitHub-native tools only — no external infrastructure required.

```
┌──────────────────────────────────────────────────────────────┐
│                  Enterprise (EMU)                             │
│                                                              │
│   ┌──────────────────┐    ┌──────────────────────────────┐  │
│   │  tpi-thirdparty- │    │   product-org/my-app         │  │
│   │  oss (mirrors)   │    │                              │  │
│   │                  │    │   package.json                │  │
│   │  Dependabot      │    │   .github/dependabot.yml     │  │
│   │  alerts          │    │   .github/workflows/         │  │
│   │  (visibility)    │    │     dependency-review.yml    │  │
│   │                  │    │     license-check.yml        │  │
│   └──────────────────┘    └──────────┬───────────────────┘  │
│                                      │                       │
│   ┌──────────────────┐               │ npm install           │
│   │  GitHub Packages │               │ dotnet restore        │
│   │  (internal pkgs) │◄──────────────┤                       │
│   └──────────────────┘               │                       │
│                                      ▼                       │
├───────────────────────────── network boundary ───────────────┤
│                                                              │
│   ┌──────────────────┐    ┌──────────────────┐              │
│   │  npmjs.com       │    │  nuget.org       │              │
│   │  (public pkgs)   │    │  (public pkgs)   │              │
│   └──────────────────┘    └──────────────────┘              │
└──────────────────────────────────────────────────────────────┘
```

### Production Architecture (Part 5)

Adds Azure Artifacts as a proxy between developers and public registries.

```
┌──────────────────────────────────────────────────────────────┐
│                  Enterprise (EMU)                             │
│                                                              │
│   product-org/my-app                                         │
│        │                                                     │
│        │ npm install / dotnet restore                        │
│        ▼                                                     │
│   ┌──────────────────────────────────────┐                  │
│   │  Azure Artifacts                      │                  │
│   │  (proxy + cache)                      │                  │
│   │                                       │                  │
│   │  • Upstream source: npmjs.com         │                  │
│   │  • Upstream source: nuget.org         │                  │
│   │  • Package allowlist/denylist         │                  │
│   │  • License scanning                   │                  │
│   │  • Vulnerability blocking             │                  │
│   │  • Cached copies (offline available)  │                  │
│   └───────────────────┬──────────────────┘                  │
│                       │                                      │
├────────────────── network boundary ──────────────────────────┤
│                       ▼                                      │
│   ┌──────────────┐  ┌──────────────┐                        │
│   │  npmjs.com   │  │  nuget.org   │                        │
│   └──────────────┘  └──────────────┘                        │
└──────────────────────────────────────────────────────────────┘
```

---

## Part 1 — Choose Your Governance Model

Before setting up any tooling, decide which level of control you need over public package consumption. This is a conversation to have with your security and platform engineering teams.

### Option A — Merge-Time Governance (GitHub-Native)

Developers pull packages directly from public registries (npmjs.com, nuget.org). Governance is enforced at **PR merge time** — not at download time.

```
Developer runs npm install
        │
        ▼
Public registry (npmjs.com, nuget.org)
        │
        ▼
Packages installed locally / in CI
        │
        ▼
Developer opens PR
        │
        ▼
┌─────────────────────────────────────┐
│  Governance gates (GitHub Actions)  │
│  • Dependabot alerts (vulns)        │
│  • Dependency Review (license/vuln) │
│  • Package allowlist (approved list)│
└─────────────────────────────────────┘
        │
        ▼
Merge or block
```

**When to use this:**

- You want governance without standing up additional infrastructure
- Your security team is comfortable with gate-at-merge rather than block-at-download
- You're starting out and want to get visibility before enforcing hard blocks

**What it does NOT do:**

- Does not prevent a developer from downloading an unapproved package to their machine or CI
- Does not cache packages for offline or air-gapped builds
- Does not block at the network level

**Setup:** Parts 2–4 of this guide (Dependabot, Dependency Review, Package Allowlist)

---

### Option B — Download-Time Governance (Artifact Proxy)

All package downloads go through a proxy (Azure Artifacts, Artifactory, or Nexus). Developers never hit public registries directly. Governance is enforced **before the package is even downloaded**.

```
Developer runs npm install
        │
        ▼
┌─────────────────────────────────────┐
│  Artifact proxy (Azure Artifacts)   │
│  • Allowlist/denylist enforcement   │
│  • License scanning                 │
│  • Vulnerability blocking           │
│  • Caches packages locally          │
│  • Proxies npmjs.com / nuget.org    │
└─────────────────────────────────────┘
        │
        ▼
Public registry (only if approved)
        │
        ▼
Package cached in proxy for future use
```

**When to use this:**

- You need to block unapproved packages before they reach developer machines or CI
- You have air-gapped or offline build environments that need cached packages
- Your security policy requires centralized control over all package sources
- You already have Azure Artifacts, Artifactory, or Nexus in your stack

**What it adds over Option A:**

- Blocks unapproved packages at download time — not just at merge time
- Caches packages for offline availability and faster builds
- Centralizes all package governance in one place (the proxy)

**Setup:** Part 5 of this guide (Azure Artifacts), plus Parts 2–4 for additional GitHub-level gates

---

### Which Option Should You Choose?

| Factor | Option A (Merge-Time) | Option B (Artifact Proxy) |
|--------|:---------------------:|:-------------------------:|
| Blocks bad packages before download | | ✓ |
| Blocks bad packages before merge | ✓ | ✓ |
| Requires additional infrastructure | | ✓ |
| Supports offline / air-gapped builds | | ✓ |
| Time to implement | Hours | Days |
| Best for | Getting started, visibility-first | Regulated, full control |

> **Note**: Options A and B are not mutually exclusive. Most enterprises start with Option A to get immediate visibility and enforcement at merge time, then add Option B when they need download-time blocking or offline caching. Parts 2–4 of this guide apply to both options.

---

### Choosing a Proxy Tool (Option B)

If you go with Option B, you have several proxy options. The right choice depends on your existing toolchain and requirements.

| Tool | Host Model | npm | NuGet | Maven | PyPI | Containers | Best For |
|------|-----------|:---:|:-----:|:-----:|:----:|:----------:|----------|
| **Azure Artifacts** | SaaS (Azure DevOps) | ✓ | ✓ | ✓ | ✓ | | Teams already on Azure DevOps |
| **AWS CodeArtifact** | SaaS (AWS) | ✓ | ✓ | ✓ | ✓ | | Teams already on AWS |
| **Google Artifact Registry** | SaaS (GCP) | ✓ | ✓ | ✓ | ✓ | ✓ | Teams already on GCP; best container support |
| **JFrog Artifactory** | Self-hosted or SaaS | ✓ | ✓ | ✓ | ✓ | ✓ | Large enterprises, all ecosystems |
| **Sonatype Nexus OSS** | Self-hosted (free) | ✓ | ✓ | ✓ | ✓ | ✓ | On-prem with no additional budget |
| **Cloudsmith** | SaaS | ✓ | ✓ | ✓ | ✓ | ✓ | Vendor-neutral, minimal infra, quick start |
| **Verdaccio** | Self-hosted (free) | ✓ | | | | | npm-only; fastest setup (`docker run verdaccio/verdaccio`) |
| **ProGet** (Inedo) | Self-hosted or SaaS | ✓ | ✓ | ✓ | ✓ | ✓ | Windows-heavy shops |

**Recommended starting point by situation:**

- **Already on Azure DevOps** → **Azure Artifacts** — it's a built-in feature, feeds take minutes to create, no new infra. Part 5 of this guide walks through this option.
- **Already on AWS** → **AWS CodeArtifact** — same story, fully managed, no servers.
- **Already on GCP** → **Google Artifact Registry** — managed service with the best container image proxy support.
- **Need all ecosystems, cloud-neutral, prefer SaaS** → **Cloudsmith** — free tier available, zero infra to operate.
- **Need all ecosystems, on-prem, no budget** → **Nexus OSS** (free, self-hosted).
- **npm governance only, need something running today** → **Verdaccio** — one Docker command, configure `.npmrc` to point at it, done.

> **Note**: Part 5 of this guide uses **Azure Artifacts** as the reference implementation. The underlying patterns (proxy feed configuration, `.npmrc`/`NuGet.Config` pointing to the proxy, Dependabot registry config) apply to all proxy tools — only the UI steps and URLs differ.

---

## Part 1A — GitHub Packages for Internal Libraries *(Optional)*

> **Note**: This section is **only relevant if your teams publish their own internal packages** (shared libraries, internal SDKs, etc.) that other teams consume within the enterprise. If you only consume public open source packages, skip to Part 2.

GitHub Packages lets your organization publish and consume internal packages without putting them on public registries.

### Step 1.1 — Enable GitHub Packages for the Organization

1. Navigate to `https://github.com/organizations/tpi-thirdparty-oss/settings/packages`
2. Under **Package creation**, ensure it's set to **Public** or **Internal** depending on your visibility needs
3. Under **Default package setting**, set to **Internal** (visible to all enterprise members)

### Step 1.2 — Configure npm to Use GitHub Packages for Scoped Packages

For packages published by your organization, configure `.npmrc` in your product repos to pull `@tpi-thirdparty-oss` scoped packages from GitHub Packages while still pulling everything else from npmjs.com.

Create or update `.npmrc` in the root of your product repository:

```ini
# Pull @tpi-thirdparty-oss scoped packages from GitHub Packages
@tpi-thirdparty-oss:registry=https://npm.pkg.github.com

# Everything else comes from the default npm registry (npmjs.com)
# (This is the default behavior — no config needed for public packages)
```

> **Note**: Developers will need a GitHub token with `read:packages` scope to pull from GitHub Packages. In an EMU environment, this is typically handled via `gh auth setup-git` or by adding a token to `.npmrc`. For CI/CD, use a GitHub Actions `GITHUB_TOKEN` or a GitHub App installation token.

### Step 1.3 — Configure NuGet to Use GitHub Packages for Internal Packages

Create or update `NuGet.Config` in the root of your product repository:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <!-- Default public NuGet registry -->
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <!-- GitHub Packages for internal org packages -->
    <add key="github" value="https://nuget.pkg.github.com/tpi-thirdparty-oss/index.json" />
  </packageSources>
  <packageSourceCredentials>
    <github>
      <add key="Username" value="EMU_USERNAME" />
      <add key="ClearTextPassword" value="%GITHUB_TOKEN%" />
    </github>
  </packageSourceCredentials>
</configuration>
```

> **Important**: Never commit actual tokens to `NuGet.Config`. Use environment variables (`%GITHUB_TOKEN%`) or CI/CD secrets. In GitHub Actions, the `GITHUB_TOKEN` is injected automatically.

---

## Part 2 — Dependabot on Product Repos

Unlike the mirror (which is read-only), product repos are where your teams make changes. This is where Dependabot version updates and security updates belong.

### Step 2.1 — Create `dependabot.yml` in Your Product Repository

This example is for a product repo that consumes npm packages (like if your team uses `github-api-explorer` as a dependency or builds on top of it).

Navigate to your product repository and create `.github/dependabot.yml`:

```yaml
# Dependabot configuration for product repository
# Docs: https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference
version: 2
updates:
  # npm dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "America/Chicago"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "chore(deps):"
    # Group minor and patch updates to reduce PR noise
    groups:
      minor-and-patch:
        update-types:
          - "minor"
          - "patch"

  # NuGet dependencies (if applicable)
  - package-ecosystem: "nuget"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    labels:
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "chore(deps):"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    commit-message:
      prefix: "chore(actions):"
```

### Step 2.2 — Configure Dependabot with Private Registry Access (if using GitHub Packages)

If your product repo pulls internal packages from GitHub Packages, add registry credentials so Dependabot can resolve them:

```yaml
version: 2
registries:
  github-packages:
    type: npm-registry
    url: https://npm.pkg.github.com
    token: ${{secrets.GHPR_TOKEN}}
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    registries:
      - github-packages
```

> **Note**: Create a `GHPR_TOKEN` repository or organization secret with a token that has `read:packages` scope. In an EMU environment, this can be a token from the GitHub App or a fine-grained token scoped to the org.

### Step 2.3 — Review and Merge Dependabot PRs

On product repos (unlike mirrors), you **should** review and merge Dependabot PRs:

1. Dependabot opens a PR when a dependency has a new version or a known vulnerability
2. Review the changelog, compatibility score, and diff
3. If CI passes and the change is safe, **merge the PR**
4. If the update is risky (major version bump, breaking changes), investigate before merging or close with a comment

> **Note**: This is the correct place for dependency management. The mirror stays in sync with upstream — your product repos are where you manage your own dependency versions.

---

## Part 3 — Dependency Review Gate on Product Repos

This gates PRs in product repos to block disallowed licenses or critical vulnerabilities before merge.

### Step 3.1 — Create the Dependency Review Workflow

Navigate to your product repository and create `.github/workflows/dependency-review.yml`:

```yaml
name: Dependency Review
on: [pull_request]

permissions:
  contents: read
  pull-requests: write

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Dependency Review
        uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: high
          deny-licenses: |
            LGPL-2.0
            LGPL-2.1
            LGPL-3.0
            GPL-2.0
            GPL-3.0
            AGPL-3.0
            SSPL-1.0
            BSL-1.1
          comment-summary-in-pr: always
```

### Step 3.2 — Add a Branch Ruleset to Require the Check

1. Navigate to your product repository → Settings → Rules
2. Click **New ruleset**
3. Configure:
   - **Ruleset name**: `main-branch-protection`
   - **Enforcement status**: `Active`
   - **Target branches**: `main`
4. Enable:
   - **Require status checks to pass before merging** → Add `dependency-review`
   - **Block force pushes**
5. Click **Create**

---

## Part 4 — Package Allowlist Enforcement (GitHub Actions)

For enterprises that want to go beyond vulnerability and license scanning, you can enforce a package allowlist — a curated list of approved packages that teams are permitted to use.

### Step 4.1 — Create the Allowlist File

In your product repository (or in a shared governance repo), create `.github/package-allowlist.json`:

```json
{
  "description": "Approved npm packages for enterprise use",
  "lastUpdated": "2026-04-11",
  "approvedBy": "oss-admins team",
  "npm": {
    "approved": [
      "next",
      "react",
      "react-dom",
      "typescript",
      "tailwindcss",
      "@octokit/rest",
      "@octokit/core",
      "better-sqlite3",
      "eslint",
      "prettier",
      "postcss",
      "autoprefixer"
    ]
  },
  "nuget": {
    "approved": [
      "Newtonsoft.Json",
      "Microsoft.Extensions.*",
      "System.Text.Json",
      "Polly"
    ]
  }
}
```

### Step 4.2 — Create the Allowlist Check Workflow

Create `.github/workflows/package-allowlist.yml`:

```yaml
name: Package Allowlist Check
on: [pull_request]

permissions:
  contents: read
  pull-requests: write

jobs:
  check-allowlist:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Check npm dependencies against allowlist
        run: |
          echo "## Package Allowlist Check" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY

          # Extract production dependencies from package.json
          DEPS=$(jq -r '.dependencies // {} | keys[]' package.json 2>/dev/null)
          DEV_DEPS=$(jq -r '.devDependencies // {} | keys[]' package.json 2>/dev/null)
          ALL_DEPS=$(echo -e "${DEPS}\n${DEV_DEPS}" | sort -u | grep -v '^$')

          # Load allowlist
          ALLOWED=$(jq -r '.npm.approved[]' .github/package-allowlist.json 2>/dev/null)

          UNAPPROVED=""
          for dep in $ALL_DEPS; do
            # Check exact match or wildcard match
            FOUND=false
            for allowed in $ALLOWED; do
              if [[ "$dep" == "$allowed" ]] || [[ "$allowed" == *"*" && "$dep" == ${allowed%\*}* ]]; then
                FOUND=true
                break
              fi
            done
            if [[ "$FOUND" == "false" ]]; then
              UNAPPROVED="${UNAPPROVED}\n- \`${dep}\`"
            fi
          done

          if [[ -n "$UNAPPROVED" ]]; then
            echo "### ⚠️ Unapproved packages detected" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "The following packages are not on the approved list:" >> $GITHUB_STEP_SUMMARY
            echo -e "$UNAPPROVED" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "Contact the **oss-admins** team to request approval." >> $GITHUB_STEP_SUMMARY
            echo ""
            echo "::warning::Unapproved packages found. See the job summary for details."
            # To make this a hard block, uncomment the next line:
            # exit 1
          else
            echo "### ✅ All packages are approved" >> $GITHUB_STEP_SUMMARY
          fi
```

> **Note**: The workflow above runs as a **warning** by default. Uncomment `exit 1` to make it a hard block. Start with warnings to identify gaps in your allowlist before enforcing.

### Step 4.3 — How to Maintain the Allowlist

- The `oss-admins` team owns the allowlist file
- Developers request additions via an issue or PR to the allowlist file
- The admins evaluate the package against approval criteria (license, maintenance, vulnerabilities, alternatives)
- Once approved, add it to the allowlist and merge

---

## Part 5 — Azure Artifacts as a Full Proxy (Production Pattern)

For enterprises that need full registry-level control — blocking unapproved packages before they're even downloaded — Azure Artifacts provides a proxy/cache layer between developers and public registries.

> **Note**: This section is a reference architecture. It requires an Azure subscription and Azure DevOps organization. The demo (Parts 1–4) works without any Azure infrastructure.

### Why Azure Artifacts?

| Capability | GitHub-native (Parts 1–4) | Azure Artifacts Proxy |
|------------|:-------------------------:|:---------------------:|
| Vulnerability alerts | ✓ (Dependabot) | ✓ (built-in) |
| License compliance | ✓ (Dependency Review) | ✓ (built-in) |
| Block unapproved packages at download | | ✓ |
| Cache packages for offline/air-gapped use | | ✓ |
| Central package allowlist | ✓ (workflow-based) | ✓ (native) |
| No external infrastructure needed | ✓ | |
| Works with npm, NuGet, Maven, PyPI | ✓ (Dependabot) | ✓ (upstream sources) |

### Step 5.1 — Create an Azure Artifacts Feed

1. Navigate to your Azure DevOps organization → **Artifacts**
2. Click **Create Feed**
3. Configure:
   - **Name**: `oss-approved-packages`
   - **Visibility**: Organization-scoped (or project-scoped for tighter control)
   - **Upstream sources**: ✓ Enable — this allows the feed to proxy npmjs.com and nuget.org

### Step 5.2 — Add Upstream Sources

Azure Artifacts can proxy public registries, caching packages on first download:

1. Open the `oss-approved-packages` feed → **Feed settings** → **Upstream sources**
2. Add:
   - **npmjs** → `https://registry.npmjs.org` (pre-configured upstream)
   - **NuGet Gallery** → `https://api.nuget.org/v3/index.json` (pre-configured upstream)

### Step 5.3 — Configure Developer Machines to Use the Feed

**For npm** — create `.npmrc` in the product repo:

```ini
registry=https://pkgs.dev.azure.com/YOUR_ORG/_packaging/oss-approved-packages/npm/registry/
always-auth=true
```

Developers authenticate with:

```powershell
npx vsts-npm-auth -config .npmrc
```

**For NuGet** — create `NuGet.Config` in the product repo:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="oss-approved-packages"
         value="https://pkgs.dev.azure.com/YOUR_ORG/_packaging/oss-approved-packages/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

> **Important**: The `<clear />` element removes all default sources, ensuring **only** the Azure Artifacts feed is used. This prevents developers from pulling directly from nuget.org.

### Step 5.4 — Block Direct Access to Public Registries (Optional)

For maximum control, configure your network or proxy to block direct access to `registry.npmjs.org` and `api.nuget.org` from developer machines and CI runners. All package downloads must go through the Azure Artifacts feed.

### Step 5.5 — Configure Dependabot with Azure Artifacts

Add the Azure Artifacts feed as a private registry in your product repo's `dependabot.yml`:

```yaml
version: 2
registries:
  azure-artifacts-npm:
    type: npm-registry
    url: https://pkgs.dev.azure.com/YOUR_ORG/_packaging/oss-approved-packages/npm/registry/
    token: ${{secrets.AZURE_ARTIFACTS_TOKEN}}
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    registries:
      - azure-artifacts-npm
```

---

## Part 6 — Verification & Testing

### GitHub-Native Governance (Parts 1–4)

- [ ] Product repo has `.github/dependabot.yml` configured for npm/NuGet
- [ ] Dependabot is creating PRs for vulnerable and outdated dependencies
- [ ] Dependency Review workflow runs on PRs and blocks disallowed licenses
- [ ] Package allowlist workflow warns on unapproved packages
- [ ] Branch ruleset requires `dependency-review` to pass before merge

### GitHub Packages (Part 1)

- [ ] Internal packages can be published to `https://npm.pkg.github.com`
- [ ] Product repos can pull `@tpi-thirdparty-oss` scoped packages from GitHub Packages
- [ ] `.npmrc` correctly scopes internal packages vs. public packages

### Azure Artifacts Proxy (Part 5, if applicable)

- [ ] Azure Artifacts feed is created with upstream sources for npmjs and NuGet
- [ ] Developer machines are configured to pull from the Azure Artifacts feed
- [ ] `npm install` resolves packages through the feed (check with `npm config get registry`)
- [ ] Packages are cached in the feed after first download
- [ ] Direct access to public registries is blocked (if enforcing)

### End-to-End Demo Walkthrough

To demo the full governance pipeline:

1. **Show the mirror** — navigate to `tpi-thirdparty-oss/github-api-explorer` and show Dependabot alerts (vulnerability visibility on upstream code)
2. **Show a product repo** — open a product repo that depends on npm packages
3. **Show Dependabot PR** — walk through an open Dependabot PR with changelog, compatibility score, and diff
4. **Show Dependency Review** — open a PR that adds a new dependency and show the license/vulnerability check
5. **Show allowlist check** — open a PR that adds an unapproved package and show the warning
6. **Show GitHub Packages** — navigate to the org's Packages page and show an internal package
7. **(Optional) Show Azure Artifacts** — navigate to the Azure Artifacts feed and show cached packages from upstream

---

## Appendix — FAQ

### Do EMU restrictions block npm/NuGet package downloads?

No. EMU restricts **git-level interactions** (fork, PR, issue, comment) with public repositories. Package managers (npm, NuGet, Maven, pip) use registry APIs, not GitHub's git API. Developers can `npm install` and `dotnet restore` normally.

### Why not just use Artifactory/Nexus?

You absolutely can. Artifactory and Nexus are the industry-standard artifact proxies and work great for this use case. This guide uses Azure Artifacts because EMU enterprises often already have Azure (Entra ID for EMU provisioning). The governance patterns (Dependabot, Dependency Review, allowlist) work the same regardless of which proxy you use.

### Should I put the Dependency Review workflow on the mirror or the product repo?

**Product repo.** The mirror is a read-only copy of upstream — it syncs on a schedule and `git push --mirror` overwrites everything. Dependency Review, Dependabot version updates, and allowlist checks belong on repos where your teams are making changes.

### What about container images (Docker)?

The same pattern applies. Azure Artifacts or Artifactory can proxy Docker Hub and other container registries. GitHub Packages also supports container images (`ghcr.io`). Configure Dependabot for the `docker` ecosystem in your `dependabot.yml`.

### How do I handle transitive dependencies?

Transitive dependencies (dependencies of your dependencies) are covered by:

- **Dependabot alerts** — scans the full dependency tree, not just direct dependencies
- **Dependency Review** — checks the full tree when a PR changes `package-lock.json` or `packages.lock.json`
- **Azure Artifacts** — caches the full tree since every package download goes through the proxy

The allowlist workflow (Part 4) only checks direct dependencies in `package.json`. For transitive dependency governance, Dependabot + Dependency Review are the primary tools.

---

*Setup guide for EMU + Open Source Package Consumption (Artifact Proxy Pattern)*
