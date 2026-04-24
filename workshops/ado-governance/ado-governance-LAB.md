# Azure DevOps Governance — Hands-On Lab Guide

**Duration**: ~60 minutes of hands-on exercises (across the 3-hour workshop)
**Format**: Step-by-step lab exercises aligned to workshop sections
**Audience**: Service Run team, platform administrators, project managers
**Prerequisites**: Access to the ADO organisation, Azure CLI, and Entra admin portal

---

## Lab Overview

These labs transform the governance model from policy into practice. Each lab maps to a workshop section and produces a real deliverable — baseline data, a provisioned project, or a working lifecycle review. You'll use the actual scripts and templates from the `scripts/` and `templates/` folders.

### Prerequisites

| Requirement | Details |
|-------------|---------|
| **Azure CLI** | Authenticated with `az login` — Project Collection Admin permissions |
| **ADO Organisation** | Access to the target organisation (or a sandbox org for labs) |
| **Entra ID Access** | Permissions to create security groups (Group.ReadWrite.All) |
| **PowerShell 7+** | For running provisioning and audit scripts |
| **ServiceNow Dev Instance** | For Lab 4 (optional — can use the free dev instance at <https://developer.servicenow.com>) |

### Lab Summary

| Lab | Workshop Section | Duration | Deliverable |
|-----|-----------------|----------|-------------|
| 1 | Current State Assessment | 15 min | Baseline audit report (JSON) |
| 2 | Role & Permission Framework | 10 min | Entra group structure + naming convention |
| 3 | Project Provisioning | 15 min | Provisioned project with all guardrails |
| 4 | ServiceNow Integration | 10 min | Catalog item specification |
| 5 | Lifecycle Management | 10 min | Lifecycle review report |

---

<details>
<summary><h2>Lab 1: Baseline Audit — Current State Assessment (15 min)</h2></summary>

> **Workshop Section**: 2 — Current State Assessment & Baselining

### Objective

Run the baseline audit script against your ADO organisation and capture the five programme metrics. This data becomes the official starting point for measuring programme success.

### Steps

**Step 1: Clone the governance scripts**

```powershell
cd workshops/ado-governance
```

**Step 2: Authenticate**

```powershell
az login
```

Verify you have the correct account:

```powershell
az account show --query "{name:name, user:user.name}" -o table
```

**Step 3: Run the baseline audit**

```powershell
.\scripts\audit-ado-baseline.ps1 -OrgUrl "https://dev.azure.com/YOUR-ORG"
```

**Step 4: Review the output**

The script produces a console summary and a JSON report (`ado-baseline-report.json`). Review:

- **Total projects** — how many exist?
- **No owner / single owner** — which projects lack the two-owner minimum?
- **Access breakdown** — the script classifies every membership into three categories:
  - **Entra ID groups** (`origin: aad`) — external Entra security groups. This is the governance target.
  - **ADO-native groups** (`origin: vsts`) — built-in groups like Project Administrators, Build Administrators. These are structural and always present.
  - **Direct users** — individual user accounts added directly to ADO groups. For new projects, this should be zero.
- **Ungoverned service connections** — how many connections lack platform governance?
- **Projects without lifecycle state** — expected to be 100% pre-programme

> **Note**: A healthy governed project should show Entra ID groups as the dominant access type, with ADO-native groups being a small structural percentage and direct users at zero.

**Step 5: Record baseline**

Open the JSON report and transfer the five baseline values into the programme tracking document:

```powershell
Get-Content .\ado-baseline-report.json | ConvertFrom-Json | Select-Object -ExpandProperty baseline | Format-List
```

> **Note**: The `averageProvisioningTimeDays` field requires manual entry. Discuss with the team: how long does a project request typically take today?

### Success Criteria

- ✅ Audit script executed successfully against the target organisation
- ✅ JSON report generated with all five metric categories
- ✅ Baseline values reviewed and discussed with the team
- ✅ Average provisioning time estimated (manual entry)

</details>

---

<details>
<summary><h2>Lab 2: Entra Group Structure & Naming Convention (10 min)</h2></summary>

> **Workshop Section**: 4 — Role & Permission Framework

### Objective

Define and validate the Entra security group naming convention, then create a test set of groups for a sample project.

### Steps

**Step 1: Agree on naming convention**

Review the proposed naming convention with the team:

| Element | Convention | Example |
|---------|------------|---------|
| Prefix | `ADO` | — |
| Separator | `-` (hyphen) | — |
| Project name | PascalCase or hyphenated, no spaces | `Data-Analytics-Platform` |
| Role suffix | `Admins`, `Contributors`, `Readers` | — |
| Full format | `ADO-[ProjectName]-[Role]` | `ADO-Data-Analytics-Platform-Admins` |

Decide as a team:

- Is the `ADO` prefix correct, or should it be more specific (e.g., `ADO-BU`)?
- How should project names with spaces be handled?
- Should the naming convention include the environment (dev/prod)?

**Step 2: Create test groups (dry run)**

Use the provisioning script in dry-run mode to validate the naming:

```powershell
.\scripts\provision-ado-project.ps1 `
    -OrgUrl "https://dev.azure.com/YOUR-ORG" `
    -ProjectName "Governance Lab Test" `
    -PrimaryOwnerEmail "primary@contoso.com" `
    -SecondaryOwnerEmail "secondary@contoso.com" `
    -Description "Test project for governance lab exercise" `
    -DryRun
```

Review the output — the groups that would be created and their names.

**Step 3: Validate in Entra (if using sandbox)**

If working in a sandbox environment, run without `-DryRun` and verify:

1. Open <https://entra.microsoft.com> → Groups
2. Search for `ADO-Governance-Lab-Test`
3. Verify three groups exist with correct naming
4. Check both owners are members of the Admins group

### Success Criteria

- ✅ Naming convention agreed upon by the team
- ✅ Dry run output reviewed and naming validated
- ✅ Convention documented for use in the provisioning SOP

</details>

---

<details>
<summary><h2>Lab 3: Provision a Governed Project (15 min)</h2></summary>

> **Workshop Section**: 5 — Project Provisioning & ServiceNow Integration

### Objective

Provision a complete ADO project following the governance model — Entra groups, permissions, lifecycle tag, and provisioning receipt. This exercise uses a sandbox project to validate the full provisioning SOP end-to-end.

### Steps

**Step 1: Review the Provisioning SOP**

Open `templates/provisioning-sop.md` and walk through each step with the team. Identify any gaps or questions.

**Step 2: Provision a lab project**

> **Important**: Use a sandbox/test ADO organisation for this lab. Do not provision in production without Sponsor approval.

```powershell
.\scripts\provision-ado-project.ps1 `
    -OrgUrl "https://dev.azure.com/YOUR-SANDBOX-ORG" `
    -ProjectName "Governance Lab Project" `
    -PrimaryOwnerEmail "primary@contoso.com" `
    -SecondaryOwnerEmail "secondary@contoso.com" `
    -Description "Lab exercise - testing governed provisioning workflow"
```

**Step 3: Verify the provisioned project**

Walk through each guardrail and confirm it was applied:

| Guardrail | How to Verify | Pass? |
|-----------|---------------|:-----:|
| Two-owner rule | Check Admins Entra group has 2 members | ☐ |
| Group-based access | Project Settings → Permissions → Entra groups mapped | ☐ |
| No direct user access | No individual users in permission groups | ☐ |
| Lifecycle state | Project description contains `[governance:{"state":"Provisioned",...}]` | ☐ |
| Service connections | None created (Platform Admin responsibility) | ☐ |

**Step 4: Review the provisioning receipt**

```powershell
Get-Content .\provisioning-receipt-Governance-Lab-Project.json | ConvertFrom-Json | Format-List
```

**Step 5: Test the two-owner guardrail (should fail)**

Try provisioning with the same person as both owners:

```powershell
.\scripts\provision-ado-project.ps1 `
    -OrgUrl "https://dev.azure.com/YOUR-SANDBOX-ORG" `
    -ProjectName "Should Fail" `
    -PrimaryOwnerEmail "same@contoso.com" `
    -SecondaryOwnerEmail "same@contoso.com"
```

Confirm the script rejects this with the two-owner rule error.

### Success Criteria

- ✅ Project provisioned with all five guardrails applied
- ✅ Entra groups created and mapped to ADO permissions
- ✅ Provisioning receipt generated
- ✅ Two-owner rule validation demonstrated (rejection)
- ✅ SOP gaps identified and documented

</details>

---

<details>
<summary><h2>Lab 4: ServiceNow Catalog Item Design (10 min)</h2></summary>

> **Workshop Section**: 5 — Project Provisioning & ServiceNow Integration

### Objective

Design the ServiceNow catalog item that will be the front door for all ADO project requests. This lab produces the specification that Sophia will use to build the actual ServiceNow workflow.

### Steps

**Step 1: Define the request form fields**

Map each governance requirement to a ServiceNow form field:

| Field | Type | Required | Validation Rules |
|-------|------|:--------:|------------------|
| Project Name | Single-line text | ✓ | Max 64 chars, alphanumeric + spaces + hyphens only |
| Business Justification | Multi-line text | ✓ | Min 20 chars |
| Primary Owner | Reference (sys_user) | ✓ | Must be in BU FTE group |
| Secondary Owner | Reference (sys_user) | ✓ | Must differ from Primary Owner |
| Cost Centre | Reference (cost_center) | ✓ | Must be active BU cost centre |
| Requested Services | Checkbox group | ✓ | At least one: Repos, Pipelines, Boards, Artifacts, Test Plans |
| Initial Contributors | List collector (sys_user) | ✗ | Optional — added to Contributors group |
| Process Template | Choice list | ✗ | Default: Agile. Options: Agile, Scrum, CMMI |
| Additional Notes | Multi-line text | ✗ | Free text |

**Step 2: Define the approval workflow**

```
Request Submitted
       │
       ▼
Auto-Validation (client-side)
  • Primary ≠ Secondary owner
  • All required fields populated
  • Cost centre is valid
       │
       ├── FAIL → Return to requestor with specific errors
       │
       ▼ PASS
Manager Approval
  • Primary Owner's manager approves
       │
       ├── REJECTED → Notify requestor with reason
       │
       ▼ APPROVED
Service Run Fulfillment
  • Assignment group: Service Run Team
  • SLA: 1 business day
  • Fulfiller executes provisioning SOP
       │
       ▼
Requestor Notified
  • Project URL provided
  • Entra group names provided
```

**Step 3: Define the ServiceNow KB article**

Draft the consumer-facing knowledge article structure:

1. **Title**: "How to Request a New Azure DevOps Project"
2. **Sections**:
   - What is the new provisioning model?
   - What information do I need before submitting?
   - How to submit the request (step-by-step with screenshots)
   - What happens after I submit?
   - How long will it take? (SLA: 1 business day)
   - FAQ (common questions and answers)

### Success Criteria

- ✅ All form fields defined with types and validation rules
- ✅ Approval workflow mapped with decision points
- ✅ Knowledge article structure drafted
- ✅ Specification ready for Sophia to implement

</details>

---

<details>
<summary><h2>Lab 5: Lifecycle Review Simulation (10 min)</h2></summary>

> **Workshop Section**: 8 — Project Lifecycle Model

### Objective

Run the lifecycle review script against the lab environment and simulate the annual review process — including the non-compliance enforcement path.

### Steps

**Step 1: Set up test lifecycle data**

If you provisioned a project in Lab 3, it should have a governance tag. Let's add a few more states for testing. Update project descriptions in ADO to include governance tags:

For a project that should trigger "overdue provisioned" (set the date 45 days ago):

```
[governance:{"state":"Provisioned","since":"2026-02-14"}]
```

For a project that should trigger "annual review due" (set the date 400 days ago):

```
[governance:{"state":"Active","since":"2025-01-15","lastReview":"2025-01-15"}]
```

For a project that's eligible for retirement (archived 13 months ago):

```
[governance:{"state":"Archived","since":"2025-02-01"}]
```

**Step 2: Run the lifecycle review (report only)**

```powershell
.\scripts\review-lifecycle.ps1 -OrgUrl "https://dev.azure.com/YOUR-SANDBOX-ORG"
```

Review the output:

- Which projects are flagged as overdue Provisioned?
- Which Active projects need annual review?
- Which Archived projects are eligible for Retirement?

**Step 3: Simulate enforcement**

Run with the `-EnforceArchive` flag to see what would happen to overdue Provisioned projects:

```powershell
.\scripts\review-lifecycle.ps1 -OrgUrl "https://dev.azure.com/YOUR-SANDBOX-ORG" -EnforceArchive
```

Verify the governance tag was updated to `"state":"Archived"`.

**Step 4: Walk through the Annual Review Checklist**

Open `templates/annual-review-checklist.md` and complete it for one of the lab projects:

1. Fill in the ownership section
2. Review the (simulated) access group membership
3. Make a lifecycle decision
4. Discuss: Is this checklist sufficient? What's missing?

### Success Criteria

- ✅ Lifecycle review script runs and correctly categorises projects
- ✅ Non-compliance enforcement demonstrated (archive of overdue project)
- ✅ Annual review checklist completed for at least one project
- ✅ Team agrees the lifecycle model is practical and enforceable

</details>

---

## Lab Environment Cleanup

After the labs, clean up sandbox resources:

```powershell
# Delete test projects (requires Project Collection Admin)
# WARNING: This permanently deletes projects — confirm you're targeting the sandbox org

# List projects to confirm
az devops project list --org "https://dev.azure.com/YOUR-SANDBOX-ORG" --query "value[?contains(name,'Lab')].name" -o table

# Delete (one at a time, confirm each)
az devops project delete --id "PROJECT-ID" --org "https://dev.azure.com/YOUR-SANDBOX-ORG" --yes
```

Clean up Entra groups:

```powershell
# List lab groups
az ad group list --filter "startswith(displayName,'ADO-Governance-Lab')" --query "[].displayName" -o table

# Delete each group
az ad group delete --group "ADO-Governance-Lab-Test-Admins"
az ad group delete --group "ADO-Governance-Lab-Test-Contributors"
az ad group delete --group "ADO-Governance-Lab-Test-Readers"
```

---

## Quick Reference: Script Inventory

| Script | Purpose | Section |
|--------|---------|---------|
| `scripts/audit-ado-baseline.ps1` | Capture the 5 baseline metrics | Lab 1 |
| `scripts/provision-ado-project.ps1` | Full project provisioning with guardrails | Lab 3 |
| `scripts/review-lifecycle.ps1` | Lifecycle state review and enforcement | Lab 5 |
| `templates/container-build.yml` | Standard container build pipeline | Section 7 |
| `templates/provisioning-sop.md` | Manual provisioning SOP (9 steps) | Lab 3 |
| `templates/annual-review-checklist.md` | Annual review form for Active projects | Lab 5 |

---

*Hands-on lab guide for Azure DevOps Governance Workshop*
