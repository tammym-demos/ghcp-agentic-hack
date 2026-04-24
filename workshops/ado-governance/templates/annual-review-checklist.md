# ADO Project Annual Review Checklist

**Project**: ___________________________________
**Review Date**: ___________________________________
**Reviewed By**: ___________________________________

---

## Ownership Review

- [ ] **Primary Owner**: _____________________ — Still active and appropriate? ☐ Yes ☐ No
- [ ] **Secondary Owner**: _____________________ — Still active and appropriate? ☐ Yes ☐ No
- [ ] Both owners are aware of their accountability for this project
- [ ] If an owner has departed, replacement assigned within 30 days? ☐ Yes ☐ No ☐ N/A

**Action needed**: _____________________________________________________________

---

## Access Group Membership Review

### ADO-[ProjectName]-Admins

| Member | Still Required? | Action |
|--------|:--------------:|--------|
| | ☐ Yes ☐ No | |
| | ☐ Yes ☐ No | |
| | ☐ Yes ☐ No | |

### ADO-[ProjectName]-Contributors

| Member / Group | Still Required? | Action |
|----------------|:--------------:|--------|
| | ☐ Yes ☐ No | |
| | ☐ Yes ☐ No | |
| | ☐ Yes ☐ No | |
| | ☐ Yes ☐ No | |

### ADO-[ProjectName]-Readers

| Member / Group | Still Required? | Action |
|----------------|:--------------:|--------|
| | ☐ Yes ☐ No | |
| | ☐ Yes ☐ No | |

### Access Compliance

- [ ] **No direct user assignments** exist at the project level
- [ ] All access is via Entra security groups only
- [ ] No stale/orphaned accounts in any group

**Action needed**: _____________________________________________________________

---

## Service Connection Review

| Connection Name | Type | Still Required? | Least Privilege? |
|----------------|------|:--------------:|:----------------:|
| | | ☐ Yes ☐ No | ☐ Yes ☐ No |
| | | ☐ Yes ☐ No | ☐ Yes ☐ No |

- [ ] All service connections are Platform Admin-governed
- [ ] No project-level service connections created outside governance

**Action needed**: _____________________________________________________________

---

## Pipeline & Container Review

- [ ] Pipelines use the standard container build template (where applicable)
- [ ] All container images push to platform-approved ACRs only
- [ ] Version tagging is applied to all image builds
- [ ] No secrets stored in pipeline YAML — Key Vault integration used
- [ ] No deprecated pipeline tasks in use

**Action needed**: _____________________________________________________________

---

## Lifecycle Decision

Based on this review, the project should:

- [ ] **Remain Active** — project is in active use, ownership and access are current
- [ ] **Be Archived** — project is no longer actively used, move to read-only
- [ ] **Be scheduled for Retirement** — project should be permanently deleted (requires Sponsor approval)

**Justification**: _____________________________________________________________

---

## Signatures

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Primary Owner | | | |
| Secondary Owner | | | |
| Service Run Reviewer | | | |

---

## Service Run Use Only

| Field | Value |
|-------|-------|
| Review logged in register | ☐ Yes |
| Governance tag updated | ☐ Yes |
| Next review date | |
| Actions assigned to | |
| Actions due by | |

---

*Annual Review Checklist — ADO Governance Programme*
