# EMU + Open Source Consumption — Step-by-Step Setup Guide

**Target upstream repository**: `https://github.com/thomasiverson/github-api-explorer`  
**Target EMU organization**: `tpi-thirdparty-oss`  
**Upstream tech stack**: Next.js 16 · TypeScript · npm · Tailwind CSS · Octokit · better-sqlite3

> **Note**: This guide walks through setting up all three OSS consumption patterns using a real upstream repository. Complete each section in order — later sections build on earlier ones.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Part 1 — Organization Setup & Repository Policies](#part-1--organization-setup--repository-policies)
- [Part 2 — Source Mirroring (Scenario 2)](#part-2--source-mirroring-scenario-2)
- [Part 3 — Dependabot Alerts for Vulnerability Visibility](#part-3--dependabot-alerts-for-vulnerability-visibility)
- [Part 4 — Automated Mirror Sync with GitHub Actions](#part-4--automated-mirror-sync-with-github-actions)
- [Part 5 — Verification & Testing](#part-5--verification--testing)
- [Appendix — Troubleshooting](#appendix--troubleshooting)

---

## Prerequisites

Before you begin, confirm the following:

| Requirement | How to Verify |
|-------------|---------------|
| **EMU enterprise access** | You can sign in as an enterprise owner at `https://github.com/enterprises/<your-enterprise>` |
| **`tpi-thirdparty-oss` org exists** | Navigate to `https://github.com/tpi-thirdparty-oss` — if it doesn't exist, you'll create it in Part 1 |
| **Organization owner role** | Go to `tpi-thirdparty-oss` → Settings — if you see the full settings sidebar, you have owner access |
| **Git installed locally** | Run `git --version` in a terminal — requires Git 2.30+ |
| **GitHub CLI installed** | Run `gh --version` — optional but recommended for scripted steps |
| **GHAS license** | Required for Dependency Review on private/internal repos — verify at Enterprise → Settings → Code security and analysis |

> **Note**: This guide uses a **GitHub App** for authentication instead of a Personal Access Token (PAT). GitHub Apps are the recommended approach for permanent automation because they are not tied to an individual user account, generate short-lived installation tokens (1 hour), provide a clear audit trail, and offer higher API rate limits.

### Create the `oss-mirror-sync` GitHub App

You'll register a GitHub App in the `tpi-thirdparty-oss` organization. This app provides authentication for the automated mirror sync workflow.

**Step 1 — Register the app**

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/settings/apps>
2. Click **New GitHub App**
3. Fill in the registration form:

   | Setting | Value |
   |---------|-------|
   | **GitHub App name** | `oss-mirror-sync` (must be globally unique — append your enterprise short name if needed, e.g., `oss-mirror-sync-tpi`) |
   | **Description** | `Automated mirror sync for upstream OSS repositories into the tpi-thirdparty-oss organization` |
   | **Homepage URL** | `https://github.com/tpi-thirdparty-oss` |
   | **Webhook** | Uncheck **Active** — this app does not need webhooks |

4. Under **Repository permissions**, grant:

   | Permission | Access | Why |
   |------------|--------|-----|
   | **Contents** | Read and write | Push mirrored code to the mirror repo |
   | **Metadata** | Read-only | Required by GitHub (auto-selected) |

5. Under **Where can this GitHub App be installed?**, select:
   - **Only on this account** (restricts installation to `tpi-thirdparty-oss`)

6. Click **Create GitHub App**

7. On the app summary page, note the **App ID** — you'll need this later. It's displayed at the top of the page (e.g., `App ID: 123456`).

**Step 2 — Generate a private key**

1. On the app page, scroll to **Private keys**
2. Click **Generate a private key**
3. A `.pem` file will download automatically — **save this securely**
4. You'll store this as an organization secret in Part 5

> **Important**: The private key is the only credential for this app. Treat it like a production secret — store in a vault, never commit to a repo.

> **Note**: You'll install the app on specific repositories in Part 5 — after the mirror repo and sync repo are created. For now, you just need the App ID and private key.

**Summary — what you should have now:**

| Item | Where to Find It | Example |
|------|-------------------|---------|
| **App ID** | App settings page → top of page | `123456` |
| **Private key (.pem file)** | Downloaded during key generation | `oss-mirror-sync.2026-04-09.private-key.pem` |

---

## Part 1 — Organization Setup & Repository Policies

### Step 1.1 — Verify or Create the `tpi-thirdparty-oss` Organization

If the organization already exists, skip to Step 1.2.

**To create a new organization in your EMU enterprise:**

1. Navigate to your enterprise page: `https://github.com/enterprises/<your-enterprise>`
2. Click **Organizations** in the left sidebar
3. Click **New organization**
4. Configure:

   | Setting | Value |
   |---------|-------|
   | **Organization name** | `tpi-thirdparty-oss` |
   | **Contact email** | Your team's distribution list or admin email |
   | **This organization belongs to** | Your enterprise (should be pre-selected in EMU) |

5. Click **Create organization**

### Step 1.2 — Configure Organization Repository Policies

Lock down the organization so repositories are created intentionally, not ad-hoc.

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/settings>
2. Go to **Member privileges** in the left sidebar
3. Configure:

   | Setting | Value | Why |
   |---------|-------|-----|
   | **Base permissions** | `Read` | Members can read all repos but not write by default |
   | **Repository creation** | `Disabled` for members | Only org owners/admins create mirror repos |
   | **Repository forking** | `Disabled` | Forks of mirrors stay within the org boundary |
   | **Repository visibility change** | `Disabled` | Prevent mirrors from being made public |
   | **Repository deletion and transfer** | `Disabled` for members | Protect mirror repos from accidental deletion |
   | **Team creation** | `Disabled` for members | Only org owners manage team structure |

4. Click **Save** at the bottom of each section

### Step 1.3 — Create Teams for Access Control

1. Navigate to <https://github.com/orgs/tpi-thirdparty-oss/teams>
2. Click **New team** and create the following teams:

   | Team Name | Description | Visibility |
   |-----------|-------------|------------|
   | `oss-admins` | Manages mirror repos, sync workflows, and governance | Visible |
   | `oss-consumers` | Read access to all mirrored repos | Visible |

3. Add yourself (and other platform engineers) to `oss-admins`
4. Add developer teams who will consume mirrored code to `oss-consumers`

---

## Part 2 — Source Mirroring (Scenario 2)

This section creates an internal mirror of `thomasiverson/github-api-explorer` inside `tpi-thirdparty-oss`.

### Step 2.1 — Create the Target Mirror Repository

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/repositories/new>
2. Configure:

   | Setting | Value |
   |---------|-------|
   | **Repository name** | `github-api-explorer` |
   | **Description** | `Mirror of https://github.com/thomasiverson/github-api-explorer — synced automatically` |
   | **Visibility** | `Internal` (visible to all enterprise members) or `Private` (restricted to org members) |
   | **Initialize** | Do NOT add a README, .gitignore, or license (the mirror push will populate everything) |

3. Click **Create repository**

4. Set team permissions on the new repo:
   - Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer/settings/access>
   - Add `oss-admins` with **Admin** access
   - Add `oss-consumers` with **Read** access

### Step 2.2 — Create the Initial Mirror (Local Machine)

Open a **PowerShell** terminal and run the following commands.

**1. Choose a working directory for your mirror clones** — this is a local admin workspace, not a place developers will use:

```powershell
mkdir C:\oss-mirrors
cd C:\oss-mirrors
```

**2. Create a bare mirrored clone of the upstream repository:**

```powershell
git clone --mirror https://github.com/thomasiverson/github-api-explorer.git
```

This creates a `github-api-explorer.git` directory containing the full repository (all branches, tags, refs) in a bare format.

**3. Navigate into the bare clone:**

```powershell
cd github-api-explorer.git
```

**4. Set the push URL to your EMU organization mirror repo:**

```powershell
git remote set-url --push origin https://github.com/tpi-thirdparty-oss/github-api-explorer.git
```

**5. Verify the remote configuration:**

```powershell
git remote -v
```

You should see the fetch URL pointing to the public upstream and the push URL pointing to your enterprise mirror:

```
origin  https://github.com/thomasiverson/github-api-explorer.git (fetch)
origin  https://github.com/tpi-thirdparty-oss/github-api-explorer.git (push)
```

**6. Authenticate with your EMU account using the GitHub CLI:**

Before pushing, ensure Git is authenticated with your EMU identity. If you have multiple GitHub accounts (personal + EMU), the GitHub CLI browser flow is the most reliable method:

```powershell
gh auth login -h github.com -w
```

When the browser opens, sign in with your **EMU account** (e.g., `tom_tpitest`). If you're already signed into GitHub with a personal account, sign out first or use a private/incognito window. After authentication completes, configure Git to use the `gh` CLI as its credential helper:

```powershell
gh auth setup-git
```

**7. Push the initial mirror to your EMU organization:**

```powershell
git push --mirror
```

> **Note**: This is a one-time manual operation. The GitHub App takes over for all automated syncs starting in Part 5.

Expected output:

```
Enumerating objects: ...
Counting objects: ...
Delta compression using up to X threads
Compressing objects: ...
Writing objects: 100% ...
To https://github.com/tpi-thirdparty-oss/github-api-explorer.git
 * [new branch]      main -> main
 * [new tag]          ... (if any tags exist)
```

### Step 2.3 — Lock Down the Mirror Repo (Sync App as Sole Writer) *(Optional for Demo)*

> **Note**: This step is **optional for demo/testing** but **recommended for production**. It requires the GitHub App to be installed on the mirror repo, which happens in Part 4 (Step 4.2). If you want to set this up, **skip ahead to Part 4**, complete Steps 4.1–4.2 (create the sync repo and install the app), then come back here to create the ruleset. For a demo, you can skip this entirely and move to Step 2.4.

The mirror should only be written to by the automated sync workflow. Add a repository ruleset that blocks all direct pushes except from the GitHub App.

1. Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer/settings/rules>
2. Click **New ruleset**
3. Configure:

   | Setting | Value |
   |---------|-------|
   | **Ruleset name** | `mirror-write-protection` |
   | **Enforcement status** | `Active` |
   | **Target branches** | Add target → Include by pattern → `*` (all branches) |

4. Under **Bypass list**, click **Add bypass** and add:
   - The `oss-mirror-sync` GitHub App (search for it by name)
   - This allows the sync workflow to push while blocking everyone else

5. Under **Branch rules**, enable:

   | Rule | Why |
   |------|-----|
   | **Restrict pushes** | Prevents anyone not on the bypass list from pushing |
   | **Block force pushes** | *(Leave unchecked)* — the sync app needs `--force` to mirror |

   > **Important**: Do **not** enable "Block force pushes" here. The sync workflow uses `git push --mirror --force`, which requires force push. The ruleset already restricts *who* can push — only the GitHub App can.

6. Click **Create**

**What this achieves:**

- `oss-consumers` (Read): Can clone and pull. Cannot push. *(Already enforced by team permissions.)*
- `oss-admins` (Admin): Can manage repo settings, but **cannot push code**. *(Enforced by the ruleset.)*
- `oss-mirror-sync` GitHub App: **Can push** via the bypass. This is the sole writer.
- No one can manually commit, merge PRs, or add files to the mirror

### Step 2.4 — Verify the Mirror

1. Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer>
2. Confirm you see:
   - All branches from upstream (at minimum: `main`)
   - All files: `package.json`, `src/`, `docs/`, `scripts/`, `next.config.ts`, etc.
   - Commit history matches the upstream repository
   - The description shows your mirror note

3. Click on `package.json` to verify the contents are correct — you should see dependencies like `next`, `octokit`, `better-sqlite3`, `tailwindcss`

### Step 2.5 — Manual Sync (How to Update the Mirror Later)

When you need to pull the latest changes from upstream:

```powershell
# Navigate to your bare clone directory
cd C:\oss-mirrors\github-api-explorer.git
```

```powershell
# Fetch the latest from upstream (prune deleted branches)
git fetch -p origin
```

```powershell
# Push to your enterprise mirror
git push --mirror
```

You'll automate this in Part 4 — but it's useful to know the manual process.

---

## Part 3 — Dependabot Alerts for Vulnerability Visibility

Now that the mirror exists, enable Dependabot to give your security team visibility into known vulnerabilities in the upstream code.

> **Important**: The mirror is a **read-only copy** of upstream. Do not merge Dependabot PRs or make dependency changes on the mirror — those changes would be overwritten on the next sync. Upstream owns the dependency updates. Dependabot alerts on the mirror serve as a **risk assessment tool** so your teams know what vulnerabilities exist in the code they're consuming.

### Step 3.1 — Enable Dependabot Alerts at the Organization Level

The recommended way to enable Dependabot at scale is through **Security configurations**, which apply to all repos in the organization.

**Option A — Use the GitHub-recommended security configuration (quickest):**

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/settings/security_products>
2. You'll see **Security configurations** — these are pre-built collections of security settings
3. Find the **GitHub recommended** configuration and click **Apply to** → select **All repositories**
4. This enables Dependency graph, Dependabot alerts, and other recommended security features across all repos

**Option B — Create a custom security configuration (more control):**

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/settings/security_products>
2. Click **New configuration**
3. Name it (e.g., `oss-mirror-security`) and enable:
   - **Dependency graph** — ✓ Enabled
   - **Dependabot alerts** — ✓ Enabled
   - Leave other features (code scanning, secret scanning, etc.) at your discretion
4. Click **Save configuration**
5. Apply it to all repositories (or just the mirror repos)

**Option C — Enable per-repository (if you prefer granular control):**

1. Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer/settings>
2. In the left sidebar under **Security**, click **Advanced Security**
3. Enable **Dependency graph** and **Dependabot alerts**

> **Note**: Whichever option you choose, the settings will apply to any future mirrors you add to `tpi-thirdparty-oss` if you used a security configuration (Options A/B). Per-repo settings (Option C) must be repeated for each new mirror.

### Step 3.2 — Verify Dependabot Alerts Are Working

After enabling, Dependabot will analyze the mirrored repository:

1. Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer/security/dependabot>
2. You should see Dependabot alerts for any known vulnerabilities in the current dependencies (may take up to 24 hours after initial enable)
3. Review alert severity levels — Critical and High alerts indicate upstream dependencies that may need attention

### Step 3.3 — How to Act on Alerts

Since the mirror is read-only, you have three options when Dependabot surfaces a vulnerability:

- **Wait for upstream to fix it** — check if the upstream project has already addressed the vulnerability in a newer release. Trigger a manual sync (Part 4) to pull the fix once it's available
- **Evaluate risk** — use the alert details (severity, exploitability, affected component) to decide whether the mirrored code is safe to consume in its current state
- **Block consumption** — if the vulnerability is Critical and upstream hasn't fixed it, inform your product teams to hold off on using this version until a fix lands

> **Note**: If your product teams consume packages from the mirrored code (rather than the source directly), configure Dependabot version updates and Dependency Review on your **product repositories** — not on the mirror. That's where dependency management PRs belong. See the [Artifact Proxy Setup Guide](ghe-emu-artifact-setup.md) for details.

---

## Part 4 — Automated Mirror Sync with GitHub Actions

Automate the upstream sync so the mirror stays current without manual intervention.

> **Important**: The `git push --mirror` command overwrites **everything** in the mirror with the upstream content. This is the correct behavior — the mirror should always be an exact copy of upstream. Do not add files to the mirror that you need to persist (like `dependabot.yml` or workflows) — those belong in your product repos, not the mirror.

### Step 4.1 — Create a Dedicated Sync Repository

Since `git push --mirror` overwrites the mirror repo's content (including workflows), store the sync workflow in a **separate** repository.

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/repositories/new>
2. Create:

   | Setting | Value |
   |---------|-------|
   | **Repository name** | `oss-mirror-sync` |
   | **Description** | `Automated sync workflows for upstream OSS mirrors` |
   | **Visibility** | `Internal` or `Private` |
   | **Initialize** | ✓ Add a README |

3. Click **Create repository**

### Step 4.2 — Install the GitHub App on Both Repositories

Now that both the mirror repo (`github-api-explorer` from Part 2) and the sync repo (`oss-mirror-sync` from Step 4.1) exist, install the GitHub App you created in the Prerequisites.

> **Note**: *(Optional for demo)* After completing this step, you can **go back to Step 2.3** to create the write-protection ruleset on the mirror repo. The ruleset locks the mirror so only the GitHub App can push — recommended for production, but not required for demo/testing.

1. Navigate to the org settings: click your **profile picture** (top-right) → **Your organizations** → click **Settings** next to `tpi-thirdparty-oss`
2. In the left sidebar, click **Developer settings**
3. In the left sidebar, click **GitHub Apps**
4. Find the `oss-mirror-sync` app and click **Edit**
5. In the app's left sidebar, click **Install App**
6. Click **Install** next to `tpi-thirdparty-oss`
7. Choose repository access:
   - Select **Only select repositories**
   - Add `github-api-explorer` (the mirror repo)
   - Add `oss-mirror-sync` (the sync workflow repo)
   - You can add more mirror repos later as needed
5. Click **Install**

> **Note**: You already have the **App ID** from the Prerequisites. That and the private key are the only two credentials needed. The sync workflow (Step 4.4) uses a publicly available GitHub Action (`actions/create-github-app-token`) to automatically generate a short-lived token at runtime — no additional setup required.

### Step 4.3 — Store GitHub App Credentials as Organization Secrets

The sync workflow needs two secrets to authenticate as the GitHub App and generate short-lived installation tokens. These are the **App ID** and **private key (.pem file)** you obtained in the Prerequisites when you registered the GitHub App.

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/settings/secrets/actions>
2. Click **New organization secret** and create each of the following:

   | Secret Name | Value | Repository Access |
   |-------------|-------|-------------------|
   | `APP_ID` | The App ID from the Prerequisites (e.g., `123456`) | Select `oss-mirror-sync` |
   | `APP_PRIVATE_KEY` | The **entire contents** of the `.pem` file (open in a text editor, copy all text including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`) | Select `oss-mirror-sync` |

3. Verify both secrets are listed under the organization secrets page

 > **Important**: Restrict secret repository access to **only** `oss-mirror-sync`. This controls which repos' workflows can *read* the secret — it is separate from the GitHub App installation (Step 4.2), which controls which repos the app can *write to*. The private key should be readable by the fewest repositories possible. The sync workflow generates a short-lived installation token at runtime — that token is what actually pushes to the mirror repos.

**Production note — alternatives to storing the private key in GitHub secrets:**

GitHub org secrets are encrypted at rest (libsodium sealed box), only decrypted at workflow runtime on ephemeral runners, auto-masked in logs, and audit-logged. This is acceptable for most enterprises. For regulated environments (finance, healthcare, government) or organizations that require centralized secret management, consider these alternatives:

| Approach | Security Level | Complexity |
|----------|:-:|:-:|
| **GitHub org secret** (this guide) | Good | Low |
| **GitHub org secret + enterprise IP allow list** | Better | Low |
| **Azure Key Vault / AWS Secrets Manager / HashiCorp Vault** | Best | Medium |

If you already use **Azure Key Vault**, the workflow can fetch the private key at runtime instead of reading it from a GitHub secret. This keeps the key out of GitHub entirely:

1. Store the `.pem` private key in Azure Key Vault as a secret
2. Add `azure/login` and `azure/key-vault-secrets` steps to the sync workflow before the token generation step
3. Pass the fetched key to `actions/create-github-app-token` via an environment variable

This adds two workflow steps but ensures the private key is managed in the customer's existing vault infrastructure with their standard rotation and access policies.

### Step 4.4 — Create the Sync Workflow

1. Navigate to <https://github.com/tpi-thirdparty-oss/oss-mirror-sync>
2. Create the file `.github/workflows/sync-github-api-explorer.yml`:

```yaml
name: "Sync: github-api-explorer"

on:
  schedule:
    # Run every Monday at 2:00 AM Central Time
    - cron: "0 7 * * 1"  # 7 UTC = 2 AM CDT / 1 AM CST
  workflow_dispatch:
    inputs:
      force:
        description: "Force sync even if no upstream changes"
        required: false
        type: boolean
        default: false

permissions:
  contents: read

env:
  UPSTREAM_REPO: "https://github.com/thomasiverson/github-api-explorer.git"

jobs:
  sync-mirror:
    runs-on: ubuntu-latest
    steps:
      # Generate a short-lived installation token from the GitHub App.
      # This token expires in 1 hour — no long-lived secrets are used
      # for git push operations.
      - name: Generate GitHub App installation token
        id: app-token
        uses: actions/create-github-app-token@v1
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
          owner: tpi-thirdparty-oss
          repositories: github-api-explorer

      - name: Configure Git
        run: |
          git config --global user.name "oss-mirror-sync[bot]"
          git config --global user.email "oss-mirror-sync[bot]@users.noreply.github.com"

      - name: Clone upstream as bare mirror
        run: |
          git clone --mirror "$UPSTREAM_REPO" upstream.git

      - name: Set push URL to enterprise mirror
        run: |
          cd upstream.git
          git remote set-url --push origin \
            "https://x-access-token:${{ steps.app-token.outputs.token }}@github.com/tpi-thirdparty-oss/github-api-explorer.git"

      - name: Push mirror to enterprise
        run: |
          cd upstream.git
          git push --mirror --force
        continue-on-error: false

      - name: Summary
        run: |
          echo "## Mirror Sync Complete ✓" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Detail | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| **Upstream** | \`thomasiverson/github-api-explorer\` |" >> $GITHUB_STEP_SUMMARY
          echo "| **Mirror** | \`tpi-thirdparty-oss/github-api-explorer\` |" >> $GITHUB_STEP_SUMMARY
          echo "| **Synced at** | $(date -u +"%Y-%m-%d %H:%M:%S UTC") |" >> $GITHUB_STEP_SUMMARY
          echo "| **Triggered by** | ${{ github.event_name }} |" >> $GITHUB_STEP_SUMMARY
```

3. Commit the file to `main`

### Step 4.5 — Test the Automated Sync

1. Navigate to <https://github.com/tpi-thirdparty-oss/oss-mirror-sync/actions>
2. Click **Sync: github-api-explorer** in the left sidebar
3. Click **Run workflow** → **Run workflow** (the `workflow_dispatch` trigger)
4. Monitor the run — each step should show ✓ green
5. Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer> and verify:
   - The code matches upstream
   - Commit history is identical to the upstream repository

### Step 4.6 — Set Up Sync Failure Notifications

If the sync fails, you need to know immediately. GitHub sends workflow failure notifications via email by default. To verify or configure this:

1. Click your **profile picture** (top-right) → **Settings**
2. In the left sidebar, click **Notifications**
3. Under **Actions**, ensure **Send notifications for failed workflows only** is selected
4. This applies to all repos you're watching — since you're an admin on `oss-mirror-sync`, you'll get failure emails automatically

For team-wide visibility, add a notification step directly in the sync workflow (Step 4.4) that posts to Teams, Slack, or email on failure:

```yaml
      - name: Notify on failure
        if: failure()
        run: |
          echo "::error::Mirror sync for github-api-explorer failed! Check the workflow run for details."
          # Add your notification integration here (Teams webhook, Slack, etc.)
```

---

## Part 5 — Verification & Testing

Run through this checklist to confirm everything is working end-to-end.

### Mirror Verification

- [ ] Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer>
- [ ] Confirm all branches and tags from upstream are present
- [ ] Confirm the commit history matches upstream
- [ ] Confirm `package.json` shows the expected dependencies (next, octokit, better-sqlite3, tailwindcss, etc.)

### Dependabot Verification

- [ ] Navigate to <https://github.com/tpi-thirdparty-oss/github-api-explorer/security/dependabot>
- [ ] Confirm Dependabot alerts are populated (may take up to 24 hours after initial enable)
- [ ] Review alert severity levels — confirm Critical/High alerts are visible

### Sync Automation Verification

- [ ] Navigate to <https://github.com/tpi-thirdparty-oss/oss-mirror-sync/actions>
- [ ] Trigger a manual workflow run via **Run workflow**
- [ ] Confirm all steps pass with ✓
- [ ] Confirm the mirror repo matches upstream after sync
- [ ] Confirm the schedule-based run is listed (next scheduled: Monday 7:00 UTC)

### Access Control Verification

- [ ] Confirm `oss-admins` team has Admin access to `github-api-explorer`
- [ ] Confirm `oss-consumers` team has Read access to `github-api-explorer`
- [ ] Confirm a regular member of `oss-consumers` can clone the mirror repo
- [ ] Confirm a regular member cannot push directly to the mirror repo

---

## Appendix — Troubleshooting

### `git push --mirror` fails with 403

**Cause**: The GitHub App installation token doesn't have write access to the target repository.

**Fix**:

1. Navigate to <https://github.com/organizations/tpi-thirdparty-oss/settings/installations> and click on the `oss-mirror-sync` app
2. Verify the app is installed with access to the `github-api-explorer` repository
3. Navigate to the app settings at `https://github.com/organizations/tpi-thirdparty-oss/settings/apps/oss-mirror-sync`
4. Verify the app has `Contents: Read and write` permission
5. Check the `APP_PRIVATE_KEY` org secret — the full `.pem` file contents must be stored, including the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines
6. Verify the `APP_ID` secret matches the App ID shown on the app settings page

### Dependabot alerts don't appear

**Cause**: Dependabot may take up to 24 hours to perform the initial analysis.

**Fix**:

1. Confirm Dependabot is enabled at `tpi-thirdparty-oss` → Settings → Code security and analysis
2. Confirm the dependency graph is enabled (required for Dependabot)
3. Check that `package.json` and `package-lock.json` exist in the repo root
4. Wait 24 hours, then check again

### Mirror sync overwrites my changes

**Cause**: `git push --mirror` replaces the entire remote with the upstream content. This is by design — the mirror is a read-only copy.

**Fix**:

- **Do not add files** (workflows, dependabot.yml, etc.) to the mirror repo. Those belong on product repos
- If you need to patch upstream code, create a **separate fork repo** within the enterprise (not the mirror) and maintain your patches there
- The mirror should always be an exact copy of upstream

### Dependency Review action fails with "Resource not accessible by integration"

**Cause**: GHAS is not enabled on the repository or organization. This applies to product repos where you set up Dependency Review (see [Artifact Proxy Setup Guide](ghe-emu-artifact-setup.md)).

**Fix**:

1. Navigate to Enterprise → Settings → Code security and analysis
2. Confirm GHAS is enabled for the `tpi-thirdparty-oss` organization
3. Navigate to `tpi-thirdparty-oss` → Settings → Code security and analysis
4. Confirm "GitHub Advanced Security" is enabled

### Sync workflow doesn't trigger on schedule

**Cause**: GitHub disables scheduled workflows on repos with no activity for 60 days.

**Fix**:

1. Navigate to `tpi-thirdparty-oss/oss-mirror-sync` → Actions
2. Check if the workflow shows a warning about being disabled
3. Click **Enable workflow** if prompted
4. To prevent this, ensure the repo has at least one commit or workflow run within every 60-day window

### How to add additional mirrors

To mirror another upstream repository, repeat Parts 2–4 with:

1. Create a new repo in `tpi-thirdparty-oss` (Step 2.1)
2. Run the local mirror commands with the new upstream URL (Step 2.2)
3. Dependabot alerts are automatic if enabled at the org level (Step 3.1)
4. Create a new sync workflow in `oss-mirror-sync` named `sync-<repo-name>.yml` (Step 4.4)
5. Add the new mirror repo to the GitHub App installation (Step 4.2)

---

*Setup guide for GitHub Enterprise EMU + Open Source Consumption Workshop*
