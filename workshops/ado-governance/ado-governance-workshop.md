# Azure DevOps Governance Workshop

**Duration**: 3 hours (180 minutes)
**Format**: Presentation + Discussion + Hands-on Labs
**Audience**: IT leadership, platform administrators, service run teams, project managers
**Focus**: Establishing Azure DevOps as a curated managed service with formal governance
**Lab Guide**: [ado-governance-LAB.md](ado-governance-LAB.md) (5 hands-on exercises)

---

## Workshop Overview

This workshop guides the Business Unit through establishing a formal Azure DevOps governance model — covering operating principles, role and permission frameworks, project provisioning via ServiceNow, access management guardrails, container pipeline standards, project lifecycle management, and chargeback model design.

This is a **stabilisation and repeatability program**, not an enterprise transformation. The intent is to put controls in place from this point forward. The model applies to all new projects from the point of adoption. Existing projects are excluded from mandatory remediation but may voluntarily align over time.

### Learning Objectives

- Define and agree on the ADO operating model, governance principles, and decision rights
- Establish a role and permission framework with guardrails for all new projects
- Design a ServiceNow-gated provisioning workflow with a one-business-day SLA
- Implement 100% group-based access control via Entra security groups
- Define a four-state project lifecycle model with retention periods and annual review
- Understand the container build pipeline and ACR targeting standards
- Outline a chargeback model for BU consumption
- Capture current-state baseline metrics to measure programme success

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | [Opening & Programme Context](#1-opening--programme-context-10-min) | 10 min |
| 2 | [Current State Assessment & Baselining](#2-current-state-assessment--baselining-15-min) | 15 min |
| 3 | [Operating Model & Governance Principles](#3-operating-model--governance-principles-20-min) | 20 min |
| 4 | [Role & Permission Framework](#4-role--permission-framework-20-min) | 20 min |
| ☕ | Break | 10 min |
| 5 | [Project Provisioning & ServiceNow Integration](#5-project-provisioning--servicenow-integration-25-min) | 25 min |
| 6 | [Access Management & Guardrails](#6-access-management--guardrails-15-min) | 15 min |
| 7 | [Container & Pipeline Standards](#7-container--pipeline-standards-15-min) | 15 min |
| 8 | [Project Lifecycle Model](#8-project-lifecycle-model-20-min) | 20 min |
| 9 | [Chargeback & Consumer Adoption](#9-chargeback--consumer-adoption-15-min) | 15 min |
| 10 | [Delivery Timeline, Risk & Next Steps](#10-delivery-timeline-risk--next-steps-15-min) | 15 min |

---

## 1. Opening & Programme Context (10 min)

### Key Points

- Azure DevOps is currently deployed within a single organisation supporting engineering analytics and development workloads
- Usage has grown organically — now requires formalisation to establish clear ownership, controlled provisioning, consistent access management, and a sustainable lifecycle model
- This initiative formally establishes ADO as a **curated managed service** for the BU
- The model applies to **all new projects** from the point of adoption — existing projects are excluded from mandatory remediation

### Programme Sponsorship & Accountability

| Role | Name | Accountability |
|------|------|----------------|
| **Sponsor / ADO Org Owner** | Jonathan Lewis | Governance authority, escalation, sponsor decisions |
| **IT Design – Service Run** | Daniel Walter | Day-to-day operations, provisioning, automation |
| **Enterprise DevOps – Advisory** | Erick Shieve | Technical standards alignment, advisory (non-blocking) |
| **Project Manager** | Roberta Solari | Delivery coordination, risk tracking, reporting |
| **Microsoft Advisory** | TBC – Fill by Week 4 | Platform guidance, ACR and pipeline validation |
| **ServiceNow Developer** | Sophia Strickler | ServiceNow automation development, inc AD Group and ADO REST |

> **Note**: The Enterprise DevOps advisory role is defined as **non-blocking**. Input will be sought and documented, but it does not carry veto authority over operational decisions within this programme scope. Where advisory input conflicts with the Service Run position, the Sponsor resolves.

### Programme Objectives

| # | Objective | Primary Owner |
|---|-----------|---------------|
| 1 | Establish a defined Azure DevOps operating model for the BU | Sponsor + Service Run |
| 2 | Implement a curated project provisioning process via ServiceNow | SNOW Dev + PM |
| 3 | Enforce 100% group-based access control for all new projects | Service Run |
| 4 | Define and implement a formal role and permission baseline | PM + Service Run + Advisory |
| 5 | Standardise container build pipelines targeting approved ACRs | PM + Service Run + Advisory |
| 6 | Define and implement a lifecycle model with retention periods and enforcement | PM + Service Run + Advisory |
| 7 | Achieve project and user provisioning within one business day of approved request | SNOW Dev + Service Run + PM |
| 8 | Define and publish chargeback model for BU consumption | Sponsor + PM |

### Discussion Points

- What specific pain points have driven the need for formalisation?
- How has organic growth created governance gaps today?
- Are there any immediate risks that need addressing before the programme begins?

---

## 2. Current State Assessment & Baselining (15 min)

### Key Points

Before success criteria can be measured, baseline metrics must be captured. This exercise establishes the programme starting point and provides the data against which all success criteria will be measured.

### Baseline Metrics to Capture

| Metric | Current Value | Target | Measured By |
|--------|---------------|--------|-------------|
| Average provisioning time (days) | *Capture in Week 1* | < 1 business day | ServiceNow data |
| Active projects with no named owner or single owner | *Capture in Week 1* | 0 (for new projects) | ADO audit |
| % access via Entra ID groups vs ADO groups vs direct users | *Capture in Week 1* | 100% Entra ID group-based (new projects) | ADO Graph API audit |
| Service connections without platform admin governance | *Capture in Week 1* | 0 (for new projects) | Service Run review |
| Active projects without a defined lifecycle state | *Capture in Week 1* | 0 (for new projects) | Provisioning log |

> **Important**: The audit distinguishes between three types of access:
>
> - **Entra ID groups** (`origin: aad`) — external security groups from Microsoft Entra ID. This is the governance target — all project access should flow through these.
> - **ADO-native groups** (`origin: vsts`) — built-in groups like Project Administrators, Contributors, Build Administrators. These are structural — they always exist. The key question is what percentage of the total they represent vs. Entra groups.
> - **Direct users** — individual user accounts added directly to ADO project groups. For new projects under the governance model, this should be zero.

> **Note**: Baseline data will be owned by the Service Run Team and reviewed by the Sponsor at Month 1.

### 🖥️ Demo: ADO Organisation Audit

1. Navigate to the ADO organisation settings
2. Review current project inventory and ownership data
3. Examine existing access patterns (direct user vs. group-based)
4. Identify service connections and their current governance state
5. Document findings as the programme baseline

### Hands-On: Baseline Data Collection (Lab 1)

Run the baseline audit script to automatically capture all five metrics:

```powershell
.\scripts\audit-ado-baseline.ps1 -OrgUrl "https://dev.azure.com/YOUR-ORG"
```

The script produces:

- Console summary with colour-coded findings
- Structured JSON report (`ado-baseline-report.json`) containing:
  - Project inventory with ownership counts
  - Access pattern analysis (direct user vs group-based percentages)
  - Service connection governance audit
  - Lifecycle state assessment

Review the report and transfer baseline values into the programme tracking document:

```powershell
Get-Content .\ado-baseline-report.json | ConvertFrom-Json | Select-Object -ExpandProperty baseline | Format-List
```

> **Note**: `averageProvisioningTimeDays` requires manual entry based on ServiceNow ticket history or team survey.

Full lab instructions: see **Lab 1** in [ado-governance-LAB.md](ado-governance-LAB.md)

### Success Criteria

- ✅ All five baseline metrics captured and documented
- ✅ Service Run Team confirmed as baseline data owner
- ✅ Sponsor review checkpoint scheduled for Month 1

### Discussion Points

- Are there additional metrics that would be valuable to baseline?
- How confident are we in the accuracy of the current-state data?
- Are there any projects that should be flagged for immediate attention?

---

## 3. Operating Model & Governance Principles (20 min)

### Key Points

This section defines what is in scope for Phase 1, what is explicitly excluded, and the operating principles that govern all programme decisions.

### Scope — In Scope

- Role and permission model definition
- Guardrail definition (2-owner rule, group-only access, owner departure handling)
- Manual provisioning SOP and supporting runbook
- ServiceNow workflow design and integration
- Automation via ADO APIs
- Standard container build template
- Approved ACR targeting model (federated, Phase 1)
- Lifecycle state definition with retention periods
- Annual access and ownership review process with defined enforcement consequences
- Chargeback model design and approval
- Consumer onboarding communication plan

### Scope — Out of Scope (Phase 1)

- Brownfield remediation of existing projects (voluntary alignment supported)
- Enterprise GitHub migration
- Enterprise DevOps transformation
- ACR or Key Vault consolidation
- Advanced compliance certification implementation
- Infrastructure-as-Code platform design

### Brownfield Boundary Clarification

Existing projects are **not required** to adopt the new model. However, teams that wish to partially align — for example, migrating to group-based access without full reprovisioning — may do so via a defined lightweight alignment path. The Service Run Team will maintain a register of partially and fully aligned legacy projects. This is voluntary, not tracked as a programme deliverable.

### Operating Principles

| Principle | What It Means in Practice |
|-----------|---------------------------|
| **Governance forward, not retroactive** | New projects comply from day one. Existing projects are not disrupted. |
| **Definition before automation** | SOPs are defined and agreed before any workflow is automated. |
| **Simplicity** | Minimum viable governance, not complex governance models. |
| **Least privilege maintained** | Project creation is gated. Self-service provisioning is not supported in Phase 1. |
| **Decisions time-bound and documented** | Open decisions have a named owner and a resolution date. All decisions are logged. |
| **Escalation defined** | Stalled decisions (>5 business days without resolution) are escalated to Sponsor. PM is accountable for triggering escalation. |

### Discussion Points

- Do the operating principles adequately cover the BU's risk appetite?
- Are there any items currently out of scope that should be reconsidered?
- How will the brownfield voluntary alignment path be communicated to existing teams?

---

## 4. Role & Permission Framework (20 min)

### Key Points

This section defines the organisation-level roles, project-level requirements, and the decision rights matrix (RACI) that governs all programme activities.

### Organisation-Level Roles

| Role | Responsibilities |
|------|------------------|
| **Org Owner** | Accountable for governance and structural decisions. Emergency access retained — used only under defined exceptional circumstances. |
| **Platform Administrators** | Operate provisioning workflow, manage service connections, maintain automation, enforce guardrails, conduct annual reviews. |

### Project-Level Requirements

Every project provisioned under this model must include the following at the point of creation:

- Minimum **two named Project Owners** (at least one must be a BU FTE)
- **Project Admin Group** (Entra security group)
- **Contributors Group** (Entra security group)
- **Readers Group** (Entra security group)
- **Declared lifecycle state** (defaults to Provisioned at creation)

### Permission Model

```
┌─────────────────────────────────────────────────┐
│              ADO Organisation                    │
│                                                  │
│  ┌─────────────────────┐                         │
│  │  Org Owner          │  Governance authority    │
│  │  (Jonathan Lewis)   │  Emergency access only   │
│  └─────────┬───────────┘                         │
│            │                                      │
│  ┌─────────▼───────────┐                         │
│  │  Platform Admins    │  Provisioning, service   │
│  │  (Service Run Team) │  connections, automation │
│  └─────────┬───────────┘                         │
│            │                                      │
│  ┌─────────▼───────────────────────────────┐     │
│  │  Project (per provisioned project)       │     │
│  │                                          │     │
│  │  ┌──────────────┐  Entra Security Groups │     │
│  │  │ Project Admin │  Min 2 named owners   │     │
│  │  │ Contributors  │  Group-only access    │     │
│  │  │ Readers       │  No direct assignment │     │
│  │  └──────────────┘                        │     │
│  └──────────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
```

### Decision Rights — RACI Matrix

| Decision / Activity | Sponsor | Service Run | Advisory | PM |
|---------------------|:-------:|:-----------:|:--------:|:--:|
| Approve new project provisioning | A | R | I | I |
| Reject provisioning request | A | R | C | I |
| Define role & permission baseline | A | R | C | I |
| Approve standard pipeline template | A | R | C | I |
| Approve chargeback model | A/R | C | I | C |
| Trigger annual access review | A | R | I | I |
| Enforce review non-compliance (archive) | A | R | I | I |
| Retire a project (delete) | A | R | I | I |
| Resolve stalled/conflicting decisions | A/R | C | C | I |
| Escalate stalled decisions (>5 days) | I | C | I | R |

**R** = Responsible | **A** = Accountable | **C** = Consulted | **I** = Informed

### Discussion Points

- Is the two-owner minimum requirement practical for all project types?
- Are the Entra security group naming conventions already defined?
- Does the RACI matrix accurately reflect how decisions will flow in practice?
- How will the advisory (non-blocking) role be enforced when disagreements arise?

---

## ☕ Break — 10 Minutes

---

## 5. Project Provisioning & ServiceNow Integration (25 min)

### Key Points

The transition from organic/ad-hoc project creation to a ServiceNow-gated provisioning model is a core programme deliverable. This section covers the target workflow, SOP definition, and automation approach.

### Provisioning Workflow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Consumer   │     │  ServiceNow  │     │   Service    │     │     ADO      │
│   Request    │────►│   Workflow   │────►│   Run Team   │────►│   Project    │
│              │     │   Approval   │     │  Provisioning│     │   Created    │
└──────────────┘     └──────┬───────┘     └──────────────┘     └──────┬───────┘
                            │                                         │
                     ┌──────▼───────┐                          ┌──────▼───────┐
                     │   Automatic  │                          │  Entra Groups│
                     │   Rejection  │                          │  Created &   │
                     │  (incomplete │                          │  Assigned    │
                     │   requests)  │                          └──────────────┘
                     └──────────────┘
```

**Target SLA**: < 1 business day from approved, complete request

### ServiceNow Request Fields

| Field | Required | Description |
|-------|:--------:|-------------|
| Project Name | ✓ | Descriptive name following naming convention |
| Business Justification | ✓ | Why this project is needed |
| Primary Owner (FTE) | ✓ | Must be a BU full-time employee |
| Secondary Owner | ✓ | Backup owner (2-owner rule) |
| Cost Centre | ✓ | BU cost centre for chargeback attribution |
| Requested Services | ✓ | Repos, Pipelines, Boards, Artifacts, Test Plans |
| Initial Contributors | ✗ | List of team members for Contributors group |

### Phased Automation Approach

| Phase | Approach | Detail |
|-------|----------|--------|
| **Phase 1** (Weeks 1–10) | Manual SOP | Provisioning via documented runbook. Service Run executes manually. |
| **Phase 2** (Weeks 11–14) | ServiceNow Workflow | ServiceNow form, approval routing, request tracking live. |
| **Phase 3** (Weeks 15–24) | ADO API Automation | Full automation: ServiceNow triggers ADO API to create project, groups, and apply template. |

> **Note**: SOPs are defined and agreed **before** any workflow is automated. This follows the "Definition before automation" operating principle.

### Manual Provisioning SOP

The full 9-step provisioning SOP is documented in [templates/provisioning-sop.md](templates/provisioning-sop.md) with detailed instructions, time estimates (~31 minutes total), rejection criteria, and exception handling.

SOP steps at a glance:

1. Validate request completeness
2. Create Entra security groups (Admin, Contributors, Readers)
3. Add owners to Admin group
4. Create ADO project
5. Map Entra groups to ADO permissions
6. Set lifecycle state (governance tag)
7. Disable pipelines (Provisioned state)
8. Close ServiceNow ticket
9. Notify requestor

### 🖥️ Demo: Automated Provisioning (Lab 3)

The provisioning script automates the entire SOP. First, validate with a dry run:

```powershell
.\scripts\provision-ado-project.ps1 `
    -OrgUrl "https://dev.azure.com/YOUR-ORG" `
    -ProjectName "Data Analytics Platform" `
    -PrimaryOwnerEmail "jsmith@contoso.com" `
    -SecondaryOwnerEmail "mjones@contoso.com" `
    -Description "Analytics and reporting" `
    -DryRun
```

The script enforces all guardrails automatically:

- Validates both owner UPNs exist in Entra ID
- Rejects if primary and secondary owner are the same person
- Creates three Entra security groups with standard naming
- Creates the ADO project and maps groups to permission levels
- Generates a provisioning receipt (JSON) for audit trail

Full lab instructions: see **Lab 3** in [ado-governance-LAB.md](ado-governance-LAB.md)

### Discussion Points

- What is the current average provisioning time, and what are the bottlenecks?
- Are there edge cases in the ServiceNow workflow that need special handling?
- How will incomplete requests be communicated back to the consumer?
- Is the 1-business-day SLA achievable with manual provisioning in Phase 1?

---

## 6. Access Management & Guardrails (15 min)

### Key Points

All access for new projects is managed exclusively via Entra security groups. No direct user assignments are permitted. This section covers the guardrails that enforce this model.

### Group-Based Access Model

| Level | Entra Group Name | ADO Permission Level |
|-------|------------------|----------------------|
| **Project Admin** | `ADO-[ProjectName]-Admins` | Project Administrators |
| **Contributors** | `ADO-[ProjectName]-Contributors` | Contributors |
| **Readers** | `ADO-[ProjectName]-Readers` | Readers |

> **Note**: All groups are **Entra security groups** managed via standard identity processes. Group membership changes take effect on next ADO sign-in.

The naming convention is validated in **Lab 2** — the team agrees on the prefix, separator, and project name format before any groups are created. See [ado-governance-LAB.md](ado-governance-LAB.md) for the naming convention exercise.

### Guardrails

| Guardrail | Detail | Enforcement |
|-----------|--------|-------------|
| **No direct user assignment** | All access via Entra security groups only. No individual user assignments at project level. | Audit at provisioning; annual review |
| **Two-owner requirement** | Projects with fewer than two named owners cannot be provisioned and cannot be moved to Active. | Provisioning validation |
| **Service connection governance** | Service connections created and managed by Platform Administrators only. | Platform Admin process |
| **Owner departure** | Departure of a named owner triggers a 30-day reassignment window. If unresolved after 30 days, project is flagged for Sponsor review. | HR departure triggers |
| **Annual review non-compliance** | Projects that do not complete annual review within 30 days of notification are automatically moved to Archived state by Service Run. | Service Run enforcement |

### Owner Departure Handling

```
Owner Departs
     │
     ▼
30-Day Reassignment Window
     │
     ├── YES: New owner assigned ──► Continue as Active
     │
     └── NO: Unresolved ──► Flagged for Sponsor Review
                                    │
                                    ├── Sponsor assigns new owner
                                    │
                                    └── Sponsor approves Archive
```

### Discussion Points

- How will owner departure notifications be triggered (HR system integration)?
- What happens when a project has exactly two owners and one departs during a critical delivery?
- Are there scenarios where direct user access would be justified as an exception?

---

## 7. Container & Pipeline Standards (15 min)

### Key Points

Phase 1 establishes a federated ACR model with a standard container build template maintained by Service Run. This section covers pipeline standards, secret management, and future direction.

### Phase 1 — Federated ACR Model

| Requirement | Detail |
|-------------|--------|
| **Standard template** | Container build template provided and maintained by Service Run |
| **ACR targeting** | Builds must push to platform-approved named ACRs only |
| **Version tagging** | Mandatory on all image builds |
| **Secret management** | Secrets must not be stored in YAML — Key Vault integration required |
| **Service connections** | Governed centrally by Platform Administrators |

### Standard Pipeline Template

The full production-ready template is at [templates/container-build.yml](templates/container-build.yml). It implements a three-stage pipeline:

| Stage | Purpose |
|-------|--------|
| **Validate** | Governance pre-flight checks, Dockerfile verification, secret detection |
| **Build** | Docker build with mandatory version tagging, push to approved ACR only |
| **Record** | Governance metadata logging for audit trail |

Teams consume the template by referencing it from a shared repository:

```yaml
# In your project pipeline YAML:
resources:
  repositories:
    - repository: governance
      type: git
      name: Platform-Templates/ado-governance
extends:
  template: templates/container-build.yml@governance
  parameters:
    acrName: 'myapproved-acr'
    imageName: 'my-service'
    keyVaultName: 'my-keyvault'  # Optional — Key Vault for secrets
```

Key governance features baked into the template:

- Automatically applies version tags (`BuildId`, `BranchName-BuildId`, `latest`)
- OCI labels for source traceability (repo URL, commit SHA)
- Pre-flight check warns if secrets are detected in YAML files
- Service connection name enforces platform-governed ACR targeting
- Governance record stage logs build metadata for compliance audit

> **Important**: Future direction may include ACR consolidation subject to Azure RBAC maturity. This is explicitly out of scope for Phase 1 and will be assessed as a separate initiative.

### Dependency: Microsoft Advisory

Pipeline template design should be validated against Microsoft Advisory guidance before Phase 2 delivery. If the advisory seat remains unfilled by Week 8, the template will proceed based on Service Run and Enterprise DevOps review, with a post-fill validation checkpoint.

### Discussion Points

- Are there existing container build patterns in use that should inform the standard template?
- Which ACRs are currently approved, and is the naming convention documented?
- How will teams be onboarded to the standard pipeline template?
- What validation is needed before the template is adopted?

---

## 8. Project Lifecycle Model (20 min)

### Key Points

All projects follow a defined four-state lifecycle. State transitions require a named trigger and are logged by the Service Run Team. Annual review is mandatory for all Active projects.

### Lifecycle States

| State | Definition | Transition Trigger | Retention / Timeframe |
|-------|------------|--------------------|-----------------------|
| **Provisioned** | Project created. Owners assigned, groups mapped. Pipelines not yet enabled. | Provisioning request approved and completed | Up to 30 days before Active or archived |
| **Active** | Fully operational. Pipelines enabled. Owners accountable for ongoing access and pipeline hygiene. | Owner confirms readiness or first pipeline run occurs | No maximum — subject to annual review |
| **Archived** | Read-only. Pipelines disabled. Retained for audit and reference. | Owner request, annual review non-compliance, or Sponsor decision | Minimum 12 months before eligible for Retirement |
| **Retired** | Permanently deleted following retention review and sponsor approval. | Sponsor approval after minimum 12-month Archive period and retention review | Irreversible. Logged in permanent register. |

### Lifecycle Flow

```
┌──────────────┐     Owner confirms      ┌──────────────┐
│              │     readiness or         │              │
│  Provisioned │────first pipeline run───►│    Active     │
│              │                          │              │
└──────┬───────┘                          └──────┬───────┘
       │                                         │
       │  Not activated                          │  Owner request,
       │  within 30 days                         │  non-compliance,
       │                                         │  or Sponsor decision
       │         ┌───────────────┐               │
       └────────►│               │◄──────────────┘
                 │   Archived    │
                 │   (Read-only) │
                 └───────┬───────┘
                         │
                         │  Sponsor approval
                         │  after 12-month
                         │  minimum archive
                         │
                 ┌───────▼───────┐
                 │               │
                 │   Retired     │
                 │  (Permanent   │
                 │   deletion)   │
                 └───────────────┘
```

### Annual Review Process

Annual review is **mandatory** for all Active projects. Review must confirm:

1. **Current ownership** — are both named owners still appropriate and active?
2. **Access group membership** — is the Contributors/Readers membership current?
3. **Lifecycle decision** — should the project remain Active, be Archived, or be scheduled for Retirement?

### Non-Compliance Enforcement

| Timeline | Action |
|----------|--------|
| **Day 0** | Annual review notification sent to project owners |
| **Day 14** | Reminder sent if review not completed |
| **Day 30** | Project automatically moved to Archived state by Service Run |
| **Post-archive** | Project can be reactivated by completing review + Sponsor approval |

### Annual Review Checklist

A printable checklist template is provided at [templates/annual-review-checklist.md](templates/annual-review-checklist.md). It covers ownership review, access group membership audit, service connection review, pipeline compliance, and the lifecycle decision — with signature fields for owner and Service Run sign-off.

### 🖥️ Demo: Lifecycle Review Automation (Lab 5)

The lifecycle review script scans all projects and categorises them by state:

```powershell
.\scripts\review-lifecycle.ps1 -OrgUrl "https://dev.azure.com/YOUR-ORG"
```

The script identifies:

- **Provisioned > 30 days**: Should be archived (activation window exceeded)
- **Active > 365 days since last review**: Annual review overdue
- **Archived > 12 months**: Eligible for Retirement (Sponsor approval needed)
- **Unmanaged**: Brownfield projects without governance tags

To enforce archiving of overdue Provisioned projects:

```powershell
.\scripts\review-lifecycle.ps1 -OrgUrl "https://dev.azure.com/YOUR-ORG" -EnforceArchive
```

Full lab instructions: see **Lab 5** in [ado-governance-LAB.md](ado-governance-LAB.md)

### Discussion Points

- Is the 30-day "Provisioned → Archived" timeout appropriate for all project types?
- How will the permanent retirement register be maintained and audited?
- What data retention obligations apply to Archived projects (regulatory, contractual)?
- Should there be an "exception" path for projects that need longer than 30 days to activate?

---

## 9. Chargeback & Consumer Adoption (15 min)

### Key Points

Chargeback for ADO consumption is in scope for Phase 1 definition but will not be operational until Month 5 at the earliest. This section also covers the consumer communication plan for the ServiceNow-gated provisioning transition.

### Chargeback Model Design

| Design Element | Detail |
|----------------|--------|
| **Model type** | To be confirmed: per-project flat allocation vs consumption-based (license, pipeline minutes, storage) vs hybrid |
| **Data source** | ADO usage reporting and Azure billing data |
| **Allocation method** | BU cost centre attribution via ServiceNow request metadata |
| **Finance engagement** | Required by Month 3 to align on reporting format and billing cycle |
| **Approval** | Chargeback model approved by Sponsor before Month 5 |
| **Interim state** | Until operational, ADO usage fully charged to IT Design cost centre |

> **Note**: If Finance engagement is delayed beyond Month 3, chargeback implementation will slip to Phase 2. This is an acceptable fallback but must be flagged to Sponsor at Month 3 review.

### Consumer Communication Plan

The transition from organic/ad-hoc project creation to a ServiceNow-gated provisioning model represents a change in how developer and analytics teams interact with ADO. Without a structured communication plan, adoption risk is high.

| When | Message | Channel | Owner |
|------|---------|---------|-------|
| **Week 6** | Heads-up: new provisioning model coming. What changes and when. | Email + Team announcement | Sponsor / PM |
| **Week 10** | How to request a new ADO project via ServiceNow. Step-by-step guide published. | ServiceNow KB | Service Run |
| **Week 15** | Go-live confirmation. Old process closed. New process is the only path. | Email + Team | Sponsor |
| **Ongoing** | FAQ and self-service guidance maintained on ServiceNow. Feedback channel open. | ServiceNow | Service Run |

**Key message to consumers**: Requests will be fulfilled within **one business day** of a complete and approved ServiceNow submission. Incomplete submissions will be returned, not held.

### Discussion Points

- Which chargeback model type (flat, consumption-based, hybrid) best fits the BU's needs?
- Is the Finance team aware of the Month 3 engagement timeline?
- How will consumer feedback be captured and acted upon post-go-live?
- Are there teams that will need additional support during the transition?

---

## 10. Delivery Timeline, Risk & Next Steps (15 min)

### Key Points

This section covers the three-phase delivery timeline, key risks, success criteria, and immediate next steps for programme kickoff.

### Delivery Timeline

| Phase | Weeks | Key Deliverables |
|-------|-------|------------------|
| **Phase 1 — Define** | 1–10 | Baseline capture; role & permission model; guardrail definitions; manual provisioning SOP; lifecycle state definitions with retention; chargeback model design commenced; consumer comms plan drafted; Finance engagement initiated |
| **Phase 2 — Implement** | 11–14 | Baseline implementation of role model; ServiceNow workflow design; standard container build template; ACR targeting model; Sponsor review checkpoint; Finance engagement complete |
| **Phase 3 — Automate & Activate** | 15–24 | ADO API automation; lifecycle review mechanism operational; go-live communication; chargeback model approved; first provisioning under new model; Month 6 success criteria review |

### Milestones Requiring Sponsor Sign-Off

| Milestone | Target |
|-----------|--------|
| Role model approval | Week 10 |
| Chargeback model approval | Month 5 |
| Programme close and handover to BAU | Month 6 |

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|:----------:|:------:|------------|
| ServiceNow development capacity — Sophia LDP rolloff | Medium | High | Ensure timeline is met and automation workflow is defined with sufficient lead time for development, testing and rework cycles. |
| Microsoft Advisory seat unfilled — pipeline and ACR decisions lack platform validation | Medium | Medium | Fill-by date: Week 4. If missed, Sponsor escalation. Design proceeds with Service Run + Advisory review; post-fill validation checkpoint added. |
| Enterprise DevOps advisory role creates competing or conflicting standards | Low | Medium | Advisory is non-blocking. Decision rights matrix is explicit. Sponsor resolves conflicts. Document all advisory inputs. |
| Service Run team is a single-person dependency (key person risk) | Medium | High | Confirm team composition in Week 1. Agree IT Design team internal support organisation to backup Daniel. |
| Unmanaged brownfield projects create demand until new model goes live | Medium | Low | Communicate scope boundary clearly. Voluntary alignment path exists. Do not expand mandatory scope without Sponsor approval. |
| Adoption resistance to ServiceNow-gated provisioning | Low | Medium | Structured communication plan (Section 9). Clear SLA communicated. Feedback channel maintained. |

### Success Criteria

All criteria measured against baseline captured in Week 1 (see Section 2).

| Criterion | Target | Measured By |
|-----------|--------|-------------|
| All new projects provisioned via defined workflow | 100% by Month 4 | Service Run |
| Provisioning time | < 1 business day from approved request | ServiceNow data |
| Group-based access control | 100% of new projects | ADO audit |
| Two-owner rule enforced | 100% of new projects | Provisioning log |
| Standard container pipeline adopted | Adopted by all new projects in scope | Service Run review |
| Lifecycle review mechanism operational | First annual review cycle initiated by Month 6 | Service Run |
| Chargeback model defined | Model approved by Sponsor by Month 5 | PM |
| Consumer communication completed | Go-live communication issued by Week 15 | PM |

### Discussion Points

- Are the phase timelines realistic given current team capacity?
- Which risks require immediate action before the programme formally begins?
- What does "handover to BAU" look like at Month 6?

---

## Appendix

### Workshop Materials

| Material | Path | Purpose |
|----------|------|---------|
| **Lab Guide** | [ado-governance-LAB.md](ado-governance-LAB.md) | 5 hands-on exercises (60 min total) |
| **Baseline Audit Script** | [scripts/audit-ado-baseline.ps1](scripts/audit-ado-baseline.ps1) | Capture 5 baseline metrics automatically |
| **Provisioning Script** | [scripts/provision-ado-project.ps1](scripts/provision-ado-project.ps1) | Automated project provisioning with guardrails |
| **Lifecycle Review Script** | [scripts/review-lifecycle.ps1](scripts/review-lifecycle.ps1) | Lifecycle state review and enforcement |
| **Container Pipeline Template** | [templates/container-build.yml](templates/container-build.yml) | Standard 3-stage build pipeline for ACR |
| **Provisioning SOP** | [templates/provisioning-sop.md](templates/provisioning-sop.md) | 9-step manual provisioning runbook |
| **Annual Review Checklist** | [templates/annual-review-checklist.md](templates/annual-review-checklist.md) | Printable review form for Active projects |

### Key URLs

| Resource | URL |
|----------|-----|
| Azure DevOps Organisation | `dev.azure.com/[org-name]` |
| ServiceNow Portal | *To be configured* |
| Microsoft Entra Admin Centre | <https://entra.microsoft.com> |
| ADO REST API Reference | <https://learn.microsoft.com/en-us/rest/api/azure/devops/> |

### Glossary

| Term | Definition |
|------|------------|
| **ADO** | Azure DevOps |
| **ACR** | Azure Container Registry |
| **AKV** | Azure Key Vault |
| **BU** | Business Unit |
| **Entra** | Microsoft Entra ID (formerly Azure Active Directory) |
| **FTE** | Full-Time Employee |
| **RACI** | Responsible, Accountable, Consulted, Informed — decision rights framework |
| **SOP** | Standard Operating Procedure |
| **BAU** | Business As Usual — ongoing operational state post programme |

### Decision Log Template

| Decision | Date | Owner | Rationale | Dissenting Input |
|----------|------|-------|-----------|------------------|
| *To be populated during programme* | | | | |

### Post-Workshop Actions

- [ ] Capture all five baseline metrics (Section 2)
- [ ] Confirm team composition and backup for Service Run (Week 1)
- [ ] Fill Microsoft Advisory seat (target: Week 4)
- [ ] Define Entra security group naming conventions
- [ ] Draft manual provisioning SOP and runbook
- [ ] Initiate Finance engagement for chargeback model (by Month 3)
- [ ] Draft consumer communication for Week 6 announcement
- [ ] Schedule Sponsor review checkpoint for Week 10

---

*Workshop guide for Azure DevOps Governance — Establishing ADO as a Curated Managed Service*
