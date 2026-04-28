# GitHub + Azure DevOps Integration — Hands-On Lab Guide

**Duration**: ~30 minutes of hands-on exercises  
**Format**: Step-by-step lab exercises aligned to workshop sessions  
**Audience**: Enterprise Admins, Engineering Managers, Tech Leads  
**Workshop Guide**: [Workshop](gh-ado-integration-workshop.md)

---

## Lab Overview

These labs cover the key integration points between GitHub and Azure DevOps: connecting Azure Boards to GitHub, using AB# linking in a real workflow, and exploring PR insights and visibility features.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **Azure DevOps** | Organization + project with Azure Boards enabled |
| **GitHub** | Organization with at least one repository |
| **Permissions** | ADO: Project Collection Administrator. GitHub: Org admin or repo admin |
| **Copilot** | (Optional) Copilot Pro, Business, or Enterprise license for Lab 3 |
| **Entra ID** | (Recommended) SSO configured for both GitHub and ADO |

### Environment Setup

> **Instructor note**: For live workshops, pre-provision a sandbox ADO project and GitHub org with the Azure Boards GitHub App already installed. This avoids admin permission delays during the session. Labs 1 and 4 can be run as **instructor demos** if attendees don't have admin access.

If running self-paced, ensure you have:

- ✅ An Azure DevOps project with Boards enabled
- ✅ A GitHub organization you administer
- ✅ At least one GitHub repository in that org
- ✅ A web browser signed into both ADO and GitHub

---

## Lab 1: Connect Azure Boards to GitHub (10 min)

> **Live workshop**: This lab is best run as an **instructor demo** unless all attendees have org admin access. Attendees can follow along and verify the connection afterward.

### Objective

Install the Azure Boards GitHub App and connect your ADO project to a GitHub repository.

### Steps

1. **Open ADO Project Settings**
   - Navigate to your ADO project: `https://dev.azure.com/{org}/{project}`
   - Select **Project Settings** (bottom-left) → **GitHub connections**

2. **Start the connection**
   - For a first-time connection: select **Connect your GitHub account**
   - For subsequent connections: select **New connection** → choose authentication method

3. **Authenticate with GitHub**
   - Sign in with your GitHub credentials (recommended method)
   - If using a PAT instead: create one at [GitHub Developer Settings](https://github.com/settings/tokens) with scopes: `repo, read:user, user:email, admin:repo_hook`
   - If your GitHub org uses SAML, configure SSO for the PAT

4. **Select repositories**
   - Choose the GitHub organization to connect
   - Select the repositories to link (you can connect up to 1,000 per connection)
   - Select **Save**

5. **Confirm on GitHub**
   - On the GitHub prompt: select **Approve, Install, & Authorize**
   - Enter GitHub credentials to confirm if prompted

6. **Verify the connection**
   - Back in ADO: **Project Settings** → **GitHub connections**
   - ✅ Verify your connection appears with the selected repositories listed

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Repositories not listed | Grant org access: GitHub **Settings** → **Applications** → **Azure Boards** → **Grant** |
| Red-X on connection | Credentials expired — remove connection and recreate |
| PAT not listing repos | Enable SSO for the PAT if the org uses SAML |

---

## Lab 2: AB# Linking Workflow (10 min)

### Objective

Create a work item in ADO, link it to a GitHub commit and PR using AB# syntax, and verify bi-directional visibility.

### Steps

1. **Create a work item in ADO Boards**
   - Go to **Boards** → **Work Items** → **New Work Item** → **User Story** (or Task)
   - Title: `Lab exercise: Add README update`
   - Note the work item number (e.g., `4567`)
   - Save the work item

2. **Create a branch in GitHub**
   - In your connected GitHub repo, create a new branch:
     ```bash
     git checkout -b feature/AB4567-readme-update
     ```
   - (Replace `4567` with your actual work item number)

3. **Make a commit with AB# reference**
   - Make a small change (e.g., add a line to README.md)
   - Commit with the AB# syntax in the message:
     ```bash
     git add README.md
     git commit -m "Update README with project info AB#4567"
     git push origin feature/AB4567-readme-update
     ```

4. **Open a PR with AB# reference**
   - Open a Pull Request in GitHub
   - In the **PR description** (not the title), include: `Fixes AB#4567`
   - Submit the PR

5. **Verify the link in ADO**
   - Go back to ADO Boards → open work item `#4567`
   - ✅ Check the **Development** section — you should see the linked GitHub commit and PR
   - ✅ The PR status (draft, review, checks) should be visible

6. **Test state transition (optional)**
   - Merge the PR into the default branch
   - ✅ Verify the ADO work item automatically transitions to "Done" (if `Fixes AB#` was used and state transitions are configured)

### Key Takeaways

- `AB#` must appear in **commit messages**, **PR descriptions**, or **issue descriptions** — not PR titles or comments
- State transitions only trigger on merges to the **default branch**
- Each repo should be connected to a **single ADO organization** to avoid unexpected linking

---

## Lab 3: PR Insights & Visibility (5 min)

### Objective

Explore the bi-directional visibility features: PR insights in ADO work items and `!` mentions.

### Steps

1. **View PR insights in ADO**
   - Open the work item from Lab 2
   - In the **Development** section, observe the linked PR
   - ✅ Verify you can see: PR title, status (open/merged), review status, and Checks status
   - Click the PR link to navigate directly to GitHub

2. **Use `!` mention in a work item**
   - In the work item **Discussion** section, add a comment
   - Type `!` followed by the PR number or search for the GitHub PR
   - ✅ Verify the PR reference appears as a clickable link in the comment

3. **(Optional) Copilot + ADO Boards**
   - If you have a Copilot license and the Copilot + Boards integration is enabled:
   - From a work item, look for the option to delegate to Copilot
   - Observe what data (title, description) is sent as context
   - ✅ Note: This requires GitHub App authentication (not PAT)

### Key Takeaways

- PMs can track GitHub development progress without leaving ADO Boards
- `!` mentions provide inline discussion of GitHub PRs within ADO work items
- Copilot + Boards delegates work items to Copilot but still requires GitHub repos for code

---

## Lab 4: ADO Pipeline from GitHub Repo (5 min — Optional)

> **Live workshop**: This lab is best run as an **instructor demo** due to service connection requirements.

### Objective

Configure an ADO Pipeline to build from a GitHub repository using a service connection.

### Steps

1. **Create a service connection**
   - In ADO: **Project Settings** → **Service connections** → **New service connection** → **GitHub**
   - Choose **GitHub App** (recommended) for auth
   - Authorize and name the connection (e.g., `github-lab-connection`)

2. **Create a simple pipeline**
   - Go to **Pipelines** → **New Pipeline**
   - Select **GitHub** as the source
   - Select the connected repo
   - Use this starter YAML:
     ```yaml
     trigger:
       branches:
         include:
           - main

     pool:
       vmImage: 'ubuntu-latest'

     steps:
       - checkout: self
       - script: |
           echo "Building from GitHub repo!"
           echo "Repository: $(Build.Repository.Name)"
           echo "Branch: $(Build.SourceBranchName)"
         displayName: 'Verify GitHub checkout'
     ```

3. **Run and verify**
   - Save and run the pipeline
   - ✅ Verify the pipeline checks out code from the GitHub repo
   - ✅ Check the GitHub PR (if triggered) — ADO pipeline status should appear in GitHub Checks

### Key Takeaways

- ADO Pipelines can build from GitHub repos without migrating pipelines to Actions
- New projects should consider starting with GitHub Actions for tighter integration
- "Integrated in build" links are automatically created on ADO work items when using YAML pipelines with GitHub repos

---

## Lab Wrap-Up

### What You Accomplished

- ✅ Connected Azure Boards to a GitHub repository
- ✅ Used AB# linking to connect commits and PRs to ADO work items
- ✅ Explored PR insights and `!` mentions for bi-directional visibility
- ✅ (Optional) Configured an ADO Pipeline to build from a GitHub repo

### Next Steps

- [ ] Install the Azure Boards GitHub App on your production GitHub org
- [ ] Test AB# linking with your team on a pilot project
- [ ] Configure state transition rules for automated work item updates
- [ ] Set up Entra ID SSO for seamless identity across both platforms
- [ ] Review the [Capability Matrix](gh-ado-integration-workshop.md#4-capability-matrix--decision-framework-10-min) to define your "what goes where" strategy

### Resources

| Resource | URL |
|----------|-----|
| Connect Azure Boards to GitHub | `https://learn.microsoft.com/en-us/azure/devops/boards/github/connect-to-github` |
| Integration Overview & Capabilities | `https://learn.microsoft.com/en-us/azure/devops/cross-service/github-integration` |
| Copilot + ADO Boards Work Items | `https://learn.microsoft.com/en-us/azure/devops/boards/github/work-item-integration-github-copilot` |
| Azure Boards GitHub App | `https://github.com/marketplace/azure-boards` |

*Lab guide for GitHub + Azure DevOps Integration Workshop*
