# Module 4: GitHub + ADO Integration — Hands-On Lab

**Duration**: ~5 minutes  
**Format**: Optional hands-on lab or instructor-led demo

## Overview

This short lab reinforces the **AB# linking** workflow between GitHub and Azure Boards. You will create a branch, make a small change, open a pull request, and verify that the linked Azure Boards work item updates after merge.

This lab requires an Azure DevOps project with Azure Boards already connected to a GitHub repository. If attendees do not have Azure DevOps access, the instructor will run this as a demo.

## Exercise 1: AB# Linking (5 min)

### Prerequisites

- Azure Boards connection to the GitHub repo is already configured by the instructor
- Access to the connected GitHub repository
- An Azure Boards work item ID to reference

### Steps

**Step 1: Create a branch and make a small change**

Create a new branch in your GitHub repository and make a small code or README change.

```bash
git checkout -b feature/ab12345-input-validation
```

**Step 2: Commit with an AB# reference**

Stage your change and use the work item ID in the commit message.

```bash
git add .
git commit -m "Add input validation AB#12345"
```

**Step 3: Push the branch and create a pull request**

```bash
git push -u origin feature/ab12345-input-validation
```

Open a pull request in GitHub for your branch.

**Step 4: Add the work item reference to the PR description**

In the PR description, add:

```markdown
This PR adds input validation to the user registration endpoint.

Fixes AB#12345
```

**Step 5: Merge and verify in Azure Boards**

- Merge the pull request into the default branch
- Open the related work item in Azure Boards
- Confirm the linked commit and PR appear in the **Development** section
- Confirm the work item transitions to **Done** or **Resolved**

### Where AB# Linking Works

- ✅ Commit messages
- ✅ PR descriptions
- ✅ Issue descriptions
- ✗ PR titles
- ✗ PR comments

### Success Criteria

- ✅ Created a commit with an `AB#` reference
- ✅ Added `Fixes AB#` to a PR description
- ✅ Understood where AB# linking works and does not
- ✅ Verified the work item linked in Azure Boards after merge

> **Note**: Replace `12345` with an actual work item ID from your Azure Boards project. If you do not have Azure DevOps access, follow along with the instructor's demo.

*Hands-on lab for Module 4: GitHub + ADO Integration — Copilot Developer Training*
