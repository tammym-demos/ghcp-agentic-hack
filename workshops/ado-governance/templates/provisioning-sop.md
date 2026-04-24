# ADO Project Provisioning — Standard Operating Procedure

**Version**: 1.0
**Owner**: Service Run Team
**Effective**: Upon Sponsor approval (Phase 1, Week 10)
**Review Cycle**: Quarterly or upon process change

---

## Purpose

This SOP defines the step-by-step process for provisioning a new Azure DevOps project under the governance model. It is the manual process used in Phase 1 and serves as the specification for ServiceNow automation in Phase 2.

---

## Prerequisites

| Requirement | Detail |
|-------------|--------|
| Approved ServiceNow request | All required fields populated, approval chain complete |
| Azure CLI access | Authenticated with Project Collection Admin permissions |
| Microsoft Graph access | Permissions for Entra security group creation (Group.ReadWrite.All) |
| Naming convention reference | [See Appendix A](#appendix-a-naming-conventions) |

---

## Procedure

### Step 1: Validate Request Completeness

**Time**: 5 minutes

Review the ServiceNow request and confirm all required fields are populated:

- [ ] Project Name — follows naming convention
- [ ] Business Justification — non-empty, meaningful
- [ ] Primary Owner — valid UPN, confirmed as BU FTE
- [ ] Secondary Owner — valid UPN, different from primary
- [ ] Cost Centre — valid BU cost centre code
- [ ] Requested Services — at least one ADO service selected

**If incomplete**: Return to requestor via ServiceNow with specific missing fields noted. Do not hold incomplete requests.

### Step 2: Create Entra Security Groups

**Time**: 5 minutes

Create three Entra security groups using the naming convention:

| Group | Name Format | Example |
|-------|-------------|---------|
| Admins | `ADO-[SafeProjectName]-Admins` | `ADO-Data-Analytics-Platform-Admins` |
| Contributors | `ADO-[SafeProjectName]-Contributors` | `ADO-Data-Analytics-Platform-Contributors` |
| Readers | `ADO-[SafeProjectName]-Readers` | `ADO-Data-Analytics-Platform-Readers` |

**Using Azure Portal**:

1. Navigate to Microsoft Entra ID → Groups → New Group
2. Group type: **Security**
3. Group name: per convention above
4. Group description: "Project [Admins/Contributors/Readers] for [Project Name]"
5. Membership type: **Assigned**
6. Create

**Or use the provisioning script**:

```powershell
.\scripts\provision-ado-project.ps1 -OrgUrl "https://dev.azure.com/contoso" `
    -ProjectName "Data Analytics Platform" `
    -PrimaryOwnerEmail "jsmith@contoso.com" `
    -SecondaryOwnerEmail "mjones@contoso.com" `
    -DryRun  # Remove -DryRun for live execution
```

### Step 3: Add Owners to Admin Group

**Time**: 2 minutes

Add both named owners to the `ADO-[ProjectName]-Admins` Entra group:

1. Open the Admins group in Entra → Members → Add members
2. Search for and add the Primary Owner
3. Search for and add the Secondary Owner
4. Verify both members appear in the group

### Step 4: Create ADO Project

**Time**: 5 minutes (plus up to 2 minutes for creation to complete)

1. Navigate to `dev.azure.com/[org]` → **Organization settings** → **Projects** → **New project**
2. Configure:
   - **Name**: Exactly as specified in the request
   - **Description**: From request + governance tag (see Step 6)
   - **Visibility**: Private
   - **Version control**: Git
   - **Work item process**: As specified (default: Agile)
3. Click **Create**
4. Wait for project creation to complete

### Step 5: Map Entra Groups to Project Permissions

**Time**: 5 minutes

Navigate to **Project Settings** → **Permissions**:

1. **Add the Admins group**:
   - Click "Add" → search for `ADO-[ProjectName]-Admins`
   - Add to the **Project Administrators** built-in group

2. **Add the Contributors group**:
   - Click "Add" → search for `ADO-[ProjectName]-Contributors`
   - Add to the **Contributors** built-in group

3. **Add the Readers group**:
   - Click "Add" → search for `ADO-[ProjectName]-Readers`
   - Add to the **Readers** built-in group

4. **Remove default access** (if applicable):
   - Review the default "[Project Name] Team" group permissions
   - Ensure no direct user assignments exist

### Step 6: Set Lifecycle State

**Time**: 2 minutes

Add the governance tag to the project description:

1. Navigate to **Project Settings** → **Overview**
2. Append to the description:

```
[governance:{"state":"Provisioned","since":"YYYY-MM-DD"}]
```

3. Replace `YYYY-MM-DD` with today's date
4. Save

### Step 7: Disable Pipelines (Provisioned State)

**Time**: 2 minutes

Projects in the Provisioned state should not have active pipelines:

1. Navigate to **Project Settings** → **Pipelines** → **Settings**
2. Toggle **Disable creation of classic build pipelines**: ON
3. Toggle **Disable creation of classic release pipelines**: ON
4. YAML pipelines remain available but should not be configured until Active

### Step 8: Close ServiceNow Ticket

**Time**: 3 minutes

1. Update the ServiceNow ticket with:
   - Completion confirmation
   - Project URL: `dev.azure.com/[org]/[ProjectName]`
   - Entra group names created
   - Lifecycle state: Provisioned
2. Attach the provisioning receipt (if script was used)
3. Resolve the ticket

### Step 9: Notify Requestor

**Time**: 2 minutes

Send confirmation to the requestor and both named owners:

**Subject**: ADO Project Provisioned — [Project Name]

**Body**:

```
Your Azure DevOps project has been provisioned.

Project: [Project Name]
URL: https://dev.azure.com/[org]/[Project Name]
Status: Provisioned

Owners:
  - [Primary Owner Name] (Primary)
  - [Secondary Owner Name] (Secondary)

Entra Groups:
  - ADO-[SafeName]-Admins (you are a member)
  - ADO-[SafeName]-Contributors (add your team members)
  - ADO-[SafeName]-Readers (add stakeholders)

NEXT STEPS:
  1. Add team members to the Contributors group via Entra
  2. Confirm readiness to move to Active state
  3. If not activated within 30 days, the project will be archived

To request service connections, submit a separate ServiceNow request.
```

---

## Total Estimated Time

| Step | Time |
|------|------|
| Validate request | 5 min |
| Create Entra groups | 5 min |
| Add owners | 2 min |
| Create ADO project | 5 min |
| Map permissions | 5 min |
| Set lifecycle state | 2 min |
| Disable pipelines | 2 min |
| Close ticket | 3 min |
| Notify requestor | 2 min |
| **Total** | **~31 min** |

Target: Complete within 1 business day of approved request.

---

## Appendix A: Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Project Name | Descriptive, title case, spaces allowed | `Data Analytics Platform` |
| Safe Name (for groups) | Hyphens, no spaces or special chars | `Data-Analytics-Platform` |
| Entra Group | `ADO-[SafeName]-[Role]` | `ADO-Data-Analytics-Platform-Admins` |
| Cost Centre | BU standard format | `CC-1234-ENG` |

## Appendix B: Rejection Criteria

Reject the request (return to requestor) if:

- [ ] Primary and secondary owners are the same person
- [ ] Primary owner is not a BU FTE
- [ ] Project name conflicts with an existing project
- [ ] Business justification is empty or unclear
- [ ] Cost centre is missing or invalid
- [ ] Request is a duplicate of an existing project

## Appendix C: Exception Handling

| Scenario | Action |
|----------|--------|
| Requestor wants direct user access (no groups) | **Denied**. Explain group-based access policy. Offer to add individuals to appropriate Entra group. |
| Only one owner available | **Denied**. Two-owner rule is mandatory. Request must identify a second owner. |
| Urgent request (same-day) | Process as priority. Notify requestor by email/Teams. Still requires all fields. |
| Service connection needed at provisioning | Submit separate ServiceNow request. Service connections are Platform Admin-governed. |
| Brownfield project wants to align | Use the lightweight alignment checklist (separate runbook). Not this SOP. |

---

*Standard Operating Procedure for ADO Project Provisioning — v1.0*
