# EMU + Open Source Consumption: 3 Practical Patterns (Approve → Mirror → Consume → Stay Updated)

> **Context (why this is needed):** In GitHub Enterprise Managed Users (EMU), managed user accounts can *view* public repositories but **cannot interact** with repos outside the enterprise (including **starring, watching, forking**, opening issues/PRs, commenting, or pushing code).

---

## Scenario 1 — **Consumption only (Packages): Dependabot + Dependency Review**

> **Governance levels**: There are two levels of control for package consumption. **Merge-time governance** (Dependabot + Dependency Review — this section) enforces policy at PR merge and requires no additional infrastructure. **Download-time governance** (artifact proxy — Azure Artifacts, Artifactory, Nexus) blocks unapproved packages before they reach a developer machine or CI runner, and caches packages for offline/air-gapped builds. These are complementary — start with merge-time, add a proxy when stricter control is needed. Note: **GitHub Packages does not proxy public registries** (npmjs.com, nuget.org); it is for publishing internal packages only.

### When to use

Use this pattern when developers primarily consume **packages** (npm, Maven, NuGet, PyPI, container base images, etc.) and you want a controlled, scalable way to **approve**, **consume**, and **keep dependencies up to date** without public repo interactions.

### Recommended architecture

1. **Create a dedicated "OSS Intake / Packages" organization** in your enterprise (e.g., `oss-intake` or `third-party`) to host governance artifacts and (optionally) an internal artifact proxy.
2. Apply **enterprise/organization repository policies** to keep repository creation/visibility/deletion/transfer controlled and auditable.

### Process (step-by-step)

#### Step 1 — Approve package sources

- Define your internal **approval criteria** (license allow-list, minimum maintainer hygiene, known-vuln thresholds).
- Use **Dependency Review** to enforce policy at PR time (licenses/vulns) so teams don't bypass intake rules.

#### Step 2 — Host packages internally (or proxy to private registries)

- Dependabot supports **private registries** and multiple ecosystems, but must be able to resolve all dependencies to validate updates in some ecosystems.

#### Step 3 — Keep packages up to date with Dependabot

- Enable:
  - **Dependabot alerts** (vulnerability detection)
  - **Dependabot security updates** (PRs for vulnerable deps)
  - **Dependabot version updates** (PRs for new versions)

**Minimal `dependabot.yml` example** (version updates):

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

#### Step 4 — Scale Dependabot access across internal repos

- If dependencies are stored in **internal repositories**, use org-level mechanisms to grant Dependabot access at scale (especially helpful when internal dependencies must be resolvable).

### Pros / Cons

- ✅ Best for continuous updates of **package ecosystems** via automated PRs.
- ✅ Keeps EMU users fully inside enterprise boundary while still consuming OSS.
- ⚠️ Requires a clear private registry strategy and access configuration for Dependabot if using an artifact proxy.

---

## Scenario 2 — **Consumption only (Source): Internal repo mirrors + scheduled sync**

### When to use

Use this pattern when you need the **source repository itself** inside the enterprise for vendoring, patching, building, scanning, or offline build scenarios — and EMU prevents forking external repositories.

### Recommended architecture

1. Create a dedicated **mirror org** (e.g., `oss-mirrors`) where each approved upstream repo is mirrored as an internal/private repo.
2. Apply enterprise repository policies (creation/visibility controls) so mirroring remains governed.

### Process (step-by-step)

#### Step 1 — Create the internal mirror

GitHub supports the following mirroring approach:

- Create a bare clone and `push --mirror` to a new repository.

Example (mirroring mechanics):

```bash
# 1) Create a mirrored clone of upstream
git clone --mirror https://github.com/UPSTREAM/REPO.git
cd REPO.git

# 2) Set the push URL to your enterprise mirror repository
git remote set-url --push origin https://github.com/ENTERPRISE-ORG/REPO-MIRROR.git

# 3) Update mirror periodically
git fetch -p origin
git push --mirror
```

#### Step 2 — Automate upstream refresh

- Schedule a job (e.g., nightly/weekly) to run:
  - `git fetch` from upstream
  - `git push --mirror` to the enterprise mirror
- Optionally open an internal PR/tag/release process in downstream repos that consume this mirror.

#### Step 3 — Consumers use the internal mirror

- Developers reference `oss-mirrors/<repo>` as the source of truth.
- This avoids external forks entirely, aligning with EMU restrictions.

#### Step 4 — Keep mirrored repos safe

- Add supply chain checks:
  - **Dependabot** (if the mirrored repo includes manifests/lockfiles)
  - **Dependency Review** action for PRs in downstream repos so new dependencies are checked before merge.

> **Important**: Do not add files to the mirror repo (e.g., `dependabot.yml`, workflows) — `git push --mirror` overwrites everything on each sync. Those files belong on product repos.

### Pros / Cons

- ✅ Best when you require the **source code** inside your enterprise boundary.
- ✅ Works cleanly with EMU's restriction on forking external repos.
- ⚠️ You own the sync automation and monitoring.

---

## Scenario 3 — **Contribute upstream (optional): GitHub Private Mirrors App (PMA) "airlock"**

### When to use

Use this pattern when your policy allows contributions to upstream open source, but you must:

- keep internal development and review private,
- avoid unmanaged public forks/PRs,
- and work within EMU constraints (managed users can't interact with public repos).

### What PMA is

GitHub's **Private Mirrors App (PMA)** is an open-source GitHub App that:

- manages **private mirrors** of public upstream repositories,
- supports private internal review,
- and syncs approved work to a public fork for upstream PRs.

GitHub explicitly notes PMA helps when development happens inside an **EMU organization whose users ordinarily can't interact with public GitHub repos**.

### Recommended architecture

- `oss-public` org (where **public forks** live, with very limited admin control)
- `oss-private-mirrors` org (where **private mirrors** live and internal work happens)
- PMA installed into the relevant org(s), managing mirror lifecycle and sync flows.

### Process (step-by-step)

#### Step 1 — Create a separate org boundary for OSS work

PMA docs recommend using a dedicated organization for open-source efforts to keep clean security/admin boundaries.

#### Step 2 — Install and run PMA

- PMA is currently designed as a self-hosted GitHub App + UI (per PMA docs).

#### Step 3 — Fork upstream into your org and create a private mirror

- PMA workflow: fork upstream into the org namespace → use the app to create a **private mirror** of that fork.

#### Step 4 — Develop and review internally in the private mirror

- This is the "airlock": internal review gates (security/legal) happen before any code becomes public.

#### Step 5 — Sync approved changes outward

- PMA syncs the private mirror's default branch to a branch on the public fork, enabling an upstream PR only after approval.

### Strong recommended controls for upstream contributions

1. **Dependency Review Action** for license/vuln gates on PRs — designed to catch vulnerable dependencies before merge and can be configured to enforce license policies.

Example workflow:

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

2. Keep mirrors aligned to upstream — use periodic sync (or PMA sync semantics) so contributions aren't built on stale baselines.

### Pros / Cons

- ✅ Best for compliant upstream contributions under EMU constraints.
- ✅ Purpose-built "private first, publish approved only" workflow.
- ⚠️ Requires operating PMA and maintaining its deployment.

---

# Enterprise Operating Model (Recommended)

## Organization layout (common)

- **`oss-intake`** — governance, approvals, policies, allowlists
- **`oss-mirrors`** — internal mirrors of approved upstream repos
- **`oss-public`** (optional) — only if you contribute upstream via PMA

Use repository policies at the enterprise/org level to centralize controls for creation, visibility, deletion, transfer, and naming.

## Automation standards

- **Mirrors:** Scheduled `fetch` + `push --mirror` to keep internal mirrors current.
- **Dependencies:** Dependabot security + version updates, tuned by `dependabot.yml`.
- **Gates:** Dependency Review action to enforce vulnerability and license policies.

## Communicating the "why" to stakeholders

- EMU accounts are intentionally constrained: managed users can view public repos but cannot interact with them (including star/watch/fork).
- EMU users also cannot fork repositories from outside the enterprise.
- Therefore, the standard pattern is **governed intake + internal mirroring** rather than enabling public interactions.

---

# References

| Resource | URL |
|----------|-----|
| EMU Abilities & Restrictions | <https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/understanding-iam-for-enterprises/abilities-and-restrictions-of-managed-user-accounts> |
| Fork a Repository (EMU note) | <https://docs.github.com/en/enterprise-cloud@latest/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo> |
| Duplicating / Mirroring Repos | <https://docs.github.com/en/enterprise-cloud@latest/repositories/creating-and-managing-repositories/duplicating-a-repository> |
| Private Mirrors App (PMA) | <https://github.com/github-community-projects/private-mirrors> |
| PMA Announcement (Public Beta) | <https://github.blog/changelog/2024-07-25-github-private-mirrors-app-public-beta/> |
| Dependabot Version Updates | <https://docs.github.com/en/enterprise-cloud@latest/code-security/concepts/supply-chain-security/about-dependabot-version-updates> |
| Dependabot Options Reference | <https://docs.github.com/enterprise-cloud@latest/code-security/dependabot/working-with-dependabot/dependabot-options-reference> |
| Dependency Review Action Config | <https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/configuring-the-dependency-review-action> |
| Enterprise Repository Policies | <https://docs.github.com/en/enterprise-cloud@latest/admin/policies/enforcing-policies-for-your-enterprise/enforcing-repository-management-policies-in-your-enterprise> |
