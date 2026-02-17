# EMU Environment Setup — Copilot Zero to Agents Workshop

**Purpose**: Pre-workshop setup instructions for enterprise administrators running the **GitHub Copilot: Zero to Agents** workshop with EMU (Enterprise Managed Users) participants.

**Why This Is Needed**: EMU accounts cannot fork public repositories or access repos outside the enterprise. The workshop requires participants to fork [microsoft/GitHubCopilot_Customized](https://github.com/microsoft/GitHubCopilot_Customized), which EMU users cannot do. Follow the steps below to import the repo into your enterprise org so everything works smoothly.

---

## Step 1: Import the Demo Repository

Import the public demo repo into an enterprise-owned organization so EMU users can access it.

1. Navigate to the target organization in your enterprise (e.g., `https://github.com/YOUR-EMU-ORG`)
2. Click **+** → **Import repository**
3. Enter the source URL:

```
https://github.com/microsoft/GitHubCopilot_Customized.git
```

4. Set the repository name to `GitHubCopilot_Customized` (or a name of your choice)
5. Set visibility to **Internal** (recommended) or **Private**
6. Click **Begin import** and wait for completion

> **Note**: If your enterprise policy blocks repository imports, use the GitHub CLI instead:
>
> ```bash
> # Clone the public repo locally
> git clone https://github.com/microsoft/GitHubCopilot_Customized.git
> cd GitHubCopilot_Customized
>
> # Create a new repo in your EMU org
> gh repo create YOUR-EMU-ORG/GitHubCopilot_Customized --internal --source=. --push
> ```

---

## Step 2: Configure Repository Settings

The workshop exercises require specific repository features. Configure all of the following on the imported repo:

### 2a. Enable GitHub Actions

1. Go to **Settings → Actions → General**
2. Select **Allow all actions and reusable workflows** (or add `microsoft/*` to the allow list)
3. Under **Workflow permissions**, select **Read and write permissions**
4. Click **Save**

### 2b. Enable Internal Forking

EMU users can fork repos **within the enterprise** if the policy allows it. This is the recommended approach — each attendee gets their own isolated copy, matching the standard workshop flow.

1. Go to **Enterprise Settings → Policies → Repositories**
2. Under **Repository forking**, select **Allow** (for the workshop org, or enterprise-wide)
3. Confirm the imported repo's visibility is **Internal** (so all enterprise members can see and fork it)

> **Note**: If your enterprise policy restricts forking and you cannot change it, attendees can share the repo using branches instead — see the fallback instructions under [Workshop Day](#workshop-day-updated-instructions-for-attendees).

### 2c. Set Up Branch Protection

1. Go to **Settings → Branches**
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: **1**
5. Click **Create**

### 2d. Enable Copilot Coding Agent (Section 9)

1. Go to **Settings → Copilot → Coding Agent**
2. Enable **Copilot Coding Agent** for this repository
3. Ensure the enterprise policy allows Coding Agent usage (check **Enterprise Settings → Policies → Copilot**)

### 2e. Verify Issues and Pull Requests Are Enabled

1. Go to **Settings → General → Features**
2. Ensure **Issues** and **Pull Requests** are enabled (they should be by default)

### 2f. Create a Test Issue (for Section 9 Demo)

1. Go to the **Issues** tab
2. Create a new issue:
   - **Title**: `Add unit test coverage for Product and Supplier API routes`
   - **Body**: `Generate comprehensive unit tests for the Product and Supplier API routes following the patterns in branch.test.ts. Include CRUD operations and error scenarios.`
3. Note the issue number — the facilitator will use this during the Coding Agent demo

---

## Step 3: Grant Access to Workshop Attendees

Attendees need access to the imported repo so they can fork it internally.

### Option A: Team-Based Access (Recommended)

1. Create a **Team** in the org (e.g., `copilot-workshop-attendees`)
2. Add all workshop participants to the team
3. Go to the repo → **Settings → Collaborators and teams**
4. Add the team with **Read** access (sufficient for forking)

### Option B: Individual Access

1. Go to the repo → **Settings → Collaborators and teams**
2. Add each participant individually with **Read** access

> **Note**: Read access is sufficient when attendees fork the repo — they get full control over their own fork. If you're using the shared-repo fallback (no forking), grant **Write** access instead so attendees can push branches.

---

## Step 4: Configure Enterprise Copilot Policies

Verify these enterprise-level Copilot settings are enabled:

1. Go to **Enterprise Settings → Policies → Copilot**
2. Ensure the following are enabled for the workshop org:

| Policy | Required Setting | Used In |
|--------|-----------------|---------|
| **Copilot in the IDE** | Enabled | Entire workshop |
| **Copilot Chat in the IDE** | Enabled | Entire workshop |
| **Copilot Coding Agent** | Enabled | Section 9 |
| **Copilot Code Review** | Enabled | Section 9 |
| **Copilot CLI** | Enabled | Section 8 |

> **Note**: If any of these policies are managed at the enterprise level and set to "Disabled" or "No policy", the workshop facilitator should coordinate with the enterprise admin to temporarily enable them for the workshop org.

---

## Step 5: Verify Setup

Run through this checklist to confirm everything works:

- [ ] Imported repo is accessible at `https://github.com/YOUR-EMU-ORG/GitHubCopilot_Customized`
- [ ] A test EMU user can fork the repo within the enterprise
- [ ] A test EMU user can clone their fork successfully
- [ ] GitHub Actions are enabled and workflows run on the fork
- [ ] Branch protection rule exists on `main` (require PR + 1 reviewer)
- [ ] Copilot Coding Agent is enabled in repo settings
- [ ] At least one Issue exists in the repo
- [ ] Copilot is available in VS Code when signed in with an EMU account
- [ ] Standalone `copilot` CLI works with the EMU account (`copilot --version` shows version)

---

## Workshop Day: Updated Instructions for Attendees

### Recommended: Internal Fork (Matches Standard Workshop Flow)

Attendees fork the imported repo within the enterprise — this gives each person their own isolated copy, just like the standard workshop.

1. Navigate to `https://github.com/YOUR-EMU-ORG/GitHubCopilot_Customized`
2. Click **Fork** → select your personal namespace (or another org you have access to within the enterprise)
3. Clone your fork:

```bash
git clone https://github.com/<YOUR-EMU-USERNAME>/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
```

This is the same flow as the standard workshop — the only difference is the source repo lives in your enterprise org instead of on public GitHub.

### Fallback: Shared Repo with Branches (If Forking Is Disabled)

If enterprise policy restricts internal forking, attendees share the imported repo and work on individual branches:

```bash
git clone https://github.com/YOUR-EMU-ORG/GitHubCopilot_Customized.git
cd GitHubCopilot_Customized
git checkout -b workshop/<your-name>
```

> **Note**: With this approach, grant attendees **Write** access (Step 3) so they can push branches.

### MCP Server Configuration

The `.vscode/mcp.json` file in the repo references MCP servers. EMU users may need to re-authenticate the GitHub MCP server OAuth flow through their enterprise identity. If OAuth fails:

1. Ensure the GitHub OAuth App is approved in the enterprise's OAuth app policy
2. Alternatively, use a fine-grained PAT scoped to the workshop repo with `repo` and `issues` permissions
3. Update `.vscode/mcp.json` to use the PAT-based GitHub MCP configuration if needed

---

## Facilitator Notes

### Adjustments to Demo Scripts

The following sections of the workshop need minor adjustments for EMU environments:

| Section | Adjustment |
|---------|------------|
| **Section 1 (Setup)** | Point attendees to the internal repo URL for forking (or branch-based fallback) |
| **Section 7 (MCP — GitHub)** | Verify OAuth flow works with EMU identity; have PAT fallback ready |
| **Section 9 (Coding Agent)** | Ensure Coding Agent is enabled at enterprise policy level; the facilitator should test assigning an issue to Copilot before the workshop |
| **Section 9 (PR Review)** | Ensure Copilot Code Review is enabled at enterprise policy level |

### If Using Internal Forks (Recommended)

- The workshop flow is nearly identical to the standard instructions — attendees just fork from the enterprise org instead of public GitHub
- Each attendee has full control over their fork (Actions, branches, settings)
- Attendees should enable Coding Agent and branch protection on their own forks for Section 9

### If Using Shared Repo Fallback

- **Branch naming**: Instruct attendees to use `workshop/<name>` branches to avoid conflicts
- **Actions quota**: Multiple attendees running Actions simultaneously will consume org-level Actions minutes — ensure sufficient quota
- **Coding Agent**: Each attendee assigning issues to Copilot will create separate PRs, which is fine — but be aware of concurrent session limits if your enterprise plan has them
- **Cleanup**: After the workshop, delete all `workshop/*` branches and close auto-generated PRs

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| EMU user can't see the repo | Verify they're added to the team/org with at least Read access; check repo visibility (Internal vs Private) |
| Copilot not available in VS Code | Verify Copilot policy is enabled for the org; ensure the user's license includes Copilot |
| GitHub MCP OAuth fails | Check enterprise OAuth app approval policy; fall back to PAT-based auth |
| Coding Agent not available | Verify enterprise policy enables Coding Agent; check repo-level setting |
| `copilot` CLI not working | Run `gh auth login` with the EMU account, then install the standalone `copilot` CLI — see [docs.github.com/copilot/github-copilot-in-the-cli](https://docs.github.com/en/copilot/github-copilot-in-the-cli) |
| Actions workflows fail | Check org-level Actions permissions and workflow permission settings on the repo |

---

*Pre-workshop setup guide for running the GitHub Copilot: Zero to Agents workshop in EMU (Enterprise Managed Users) environments.*
