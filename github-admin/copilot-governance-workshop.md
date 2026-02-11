# GitHub Copilot Admin, Licensing & Governance Workshop

**Duration**: 1 hour  
**Format**: Presentation + Live Demo  
**Audience**: Mixed engineering teams (Admins + Managers)  
**Focus**: GitHub Copilot Enterprise

---

## Workshop Overview

This session provides engineering teams with a practical understanding of GitHub Copilot Enterprise governance—covering licensing models, security controls, policy configuration, and operational best practices. The format combines presentation slides with live demos in the GitHub admin portal, enabling attendees to see real configurations in action.

### Learning Objectives

- Understand Copilot Enterprise licensing and seat management strategies
- Configure security controls including content exclusions and public code filters
- Navigate the policy hierarchy (Enterprise → Org → Repo)
- Use usage analytics for operational governance and compliance readiness

---

## Session Agenda

| Section | Topic | Time |
|---------|-------|------|
| 1 | Opening & Context Setting | 5 min |
| 2 | Licensing & Seat Management | 10 min |
| 3 | Security Controls & IP Protection | 15 min |
| 4 | Policy Configuration | 15 min |
| 5 | Operational Governance | 10 min |
| 6 | Rollout Best Practices & Wrap-up | 5 min |

---

## 1. Opening & Context Setting (5 min)

### Key Points

- Workshop objectives and what attendees will walk away with
- Brief overview of Copilot Enterprise vs. Business capabilities
- Frame the "why governance matters" for AI-assisted development:
  - IP protection
  - Compliance requirements
  - Adoption consistency across teams

### Copilot Enterprise vs. Business Quick Compare

| Feature | Business | Enterprise |
|---------|----------|------------|
| Code completions | ✓ | ✓ |
| Chat in IDE | ✓ | ✓ |
| CLI support | ✓ | ✓ |
| Knowledge bases | ✗ | ✓ |
| Fine-tuned models | ✗ | ✓ |
| Enterprise policy controls | Limited | Full |
| SAML/SSO enforcement | Org-level | Enterprise-level |

---

## 2. Licensing & Seat Management (10 min)

### Presentation Topics

- **Licensing model**: Per-seat, assigned at org or enterprise level
- **Seat allocation strategies**:
  - Org-wide enablement (all members get access)
  - Team-based enablement (selective assignment)
  - Hybrid approach (default off, request-based)
- **Cost visibility**: Usage metrics dashboard, identifying inactive seats
- **Decision framework**: Who should get seats first?
  - High-leverage roles (senior engineers, architects)
  - Pilot teams for initial validation
  - Teams with highest code velocity

### 🖥️ Demo: Seat Assignment

**Location**: GitHub Enterprise Settings → Policies → Copilot

1. Navigate to enterprise settings
2. Show Copilot access management panel
3. Demonstrate seat assignment at enterprise level
4. Show policy inheritance: Enterprise → Org → Repo
5. Review usage metrics for cost optimization

### Discussion Points

- How do you currently track software license utilization?
- What's your process for onboarding new tools to engineering teams?

---

## 3. Security Controls & IP Protection (15 min)

### Security Architecture Overview

- **Data handling**: How prompts and suggestions flow
- **Telemetry**: What metadata is collected
- **Training guarantee**: Enterprise code is NOT used to train models
- **Data residency**: Where data is processed and stored

### Content Exclusions

Prevent sensitive repositories from being included in Copilot context:

```
# Example: .github/copilot-content-exclusion.yaml
# Excludes specific paths from Copilot suggestions

exclusions:
  - "**/*.env"
  - "**/secrets/**"
  - "**/internal-api/**"
```

**Use cases**:
- Proprietary algorithms
- Security-sensitive code
- Compliance-restricted content

### 🖥️ Demo: Content Exclusions

1. Navigate to Organization Settings → Copilot → Content Exclusions
2. Add exclusion patterns
3. Show how exclusions propagate to repos

### Public Code Filter

- Blocks suggestions that match publicly available code
- Reduces IP/licensing risk from open source code inclusion
- Configurable at org and enterprise level

### 🖥️ Demo: Public Code Filter

1. Enterprise Settings → Copilot → Suggestions matching public code
2. Enable "Block" setting
3. Discuss trade-offs (fewer suggestions vs. IP protection)

### Audit Logging

| Event Type | What's Captured | Retention |
|------------|-----------------|-----------|
| Policy changes | Who changed what, when | Per enterprise config |
| Seat assignment | User additions/removals | Per enterprise config |
| Feature enablement | Copilot features toggled | Per enterprise config |

### Network Controls

- Proxy configuration for enterprise networks
- IP allowlisting considerations
- Firewall rules for Copilot endpoints

---

## 4. Policy Configuration (15 min)

### Policy Hierarchy

```
Enterprise Policies (highest precedence)
    ↓
Organization Policies
    ↓
Repository Settings (lowest precedence)
```

**Key principle**: Higher levels can enforce or delegate to lower levels

### Key Policy Settings

| Policy | Options | Scope |
|--------|---------|-------|
| Copilot in IDE | Enabled / Disabled / No Policy | Enterprise, Org |
| Copilot Chat | Enabled / Disabled / No Policy | Enterprise, Org |
| Copilot in CLI | Enabled / Disabled / No Policy | Enterprise, Org |
| Knowledge Bases | Enabled / Disabled | Enterprise |
| Public code filter | Allow / Block | Enterprise, Org |
| Content exclusions | Pattern-based | Org, Repo |

### 🖥️ Demo: Policy Configuration

1. Enterprise Settings → Policies → Copilot
2. Walk through each policy option
3. Show "Enforce" vs. "Allow" vs. "No Policy" settings
4. Demonstrate org-level override (where permitted)

### IDE-Level Controls

For VS Code, organizations can push settings via MDM or settings sync:

```json
// settings.json - Org-managed defaults
{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true
  },
  "github.copilot.advanced": {
    "length": 500,
    "temperature": ""
  }
}
```

### Custom Instructions

Create org-wide coding standards with `.github/copilot-instructions.md`:

```markdown
# Copilot Instructions for [Org Name]

## Code Style
- Use TypeScript strict mode
- Prefer functional components in React
- All functions must have JSDoc comments

## Security Requirements
- Never hardcode credentials
- Use parameterized queries for database access
- Validate all user inputs

## Testing
- Include unit tests for all new functions
- Minimum 80% code coverage
```

---

## 5. Operational Governance (10 min)

### Role-Based Administration

| Role | Capabilities |
|------|--------------|
| Enterprise Owner | Full policy control, billing, all orgs |
| Organization Admin | Org-level policies, seat management |
| Billing Manager | View usage, manage payment |
| Security Manager | Audit logs, compliance reports |

### 🖥️ Demo: Usage Analytics

**Location**: Enterprise/Org Settings → Copilot → Usage

Metrics available:
- **Active users**: Daily/weekly/monthly unique users
- **Acceptance rate**: % of suggestions accepted
- **Language breakdown**: Usage by programming language
- **Lines of code suggested**: Volume metrics

### ROI Tracking

Consider tracking:
- Time saved per developer (survey-based)
- Code review cycle time changes
- Onboarding time for new team members
- Developer satisfaction scores

### Compliance & Audit Readiness

**Certifications**:
- SOC 2 Type II
- GDPR compliant
- ISO 27001

**Audit preparation**:
- Export usage reports
- Document policy configurations
- Maintain change log for policy updates

### Incident Response

If a security concern arises:

1. **Immediate**: Disable Copilot at enterprise level (kills all access)
2. **Investigate**: Review audit logs for affected timeframe
3. **Scope**: Identify affected users/repos via usage data
4. **Remediate**: Update policies, re-enable with restrictions
5. **Document**: Create incident report for compliance

---

## 6. Rollout Best Practices & Wrap-up (5 min)

### Phased Enablement Strategy

```
Phase 1: Pilot (2-4 weeks)
├── Select 2-3 teams (50-100 developers)
├── Establish baseline metrics
├── Gather feedback weekly
└── Refine policies based on learnings

Phase 2: Expand (4-8 weeks)
├── Enable for additional orgs/teams
├── Train team leads on governance
├── Monitor usage and security metrics
└── Address edge cases

Phase 3: Enterprise-Wide
├── Enable default access
├── Maintain exceptions list
├── Ongoing monitoring and optimization
└── Regular policy reviews
```

### Internal Communication Templates

**Security FAQ for Developers**:
- "Is my code being used to train AI models?" → No (Enterprise guarantee)
- "Can Copilot access our private repos?" → Only repos you have access to
- "What happens to my prompts?" → Processed, not retained for training

### Training & Enablement Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub Skills - Copilot](https://skills.github.com/)
- [VS Code Copilot Extension Guide](https://code.visualstudio.com/docs/copilot/overview)

### Q&A Topics to Prepare For

- Cost justification and ROI metrics
- Integration with existing security tools (SIEM, DLP)
- Handling developer resistance or over-reliance
- Compliance with industry-specific regulations

---

## Appendix: Quick Reference

### Key URLs

| Resource | URL |
|----------|-----|
| Enterprise Copilot Settings | `github.com/enterprises/[name]/settings/copilot` |
| Org Copilot Settings | `github.com/organizations/[name]/settings/copilot` |
| Usage Dashboard | `github.com/enterprises/[name]/settings/copilot/usage` |
| Audit Log | `github.com/enterprises/[name]/settings/audit-log` |

### Policy Decision Matrix

| Scenario | Recommended Setting |
|----------|---------------------|
| High-security environment | Public code filter: Block, Content exclusions: Extensive |
| Rapid adoption priority | Org-wide enablement, Public code filter: Allow |
| Compliance-heavy industry | All audit features enabled, Content exclusions for PII |
| Cost-conscious rollout | Team-based enablement, Regular seat utilization reviews |

---

## Post-Workshop Actions

- [ ] Review current Copilot configuration against best practices
- [ ] Identify pilot teams for initial rollout (if not yet deployed)
- [ ] Document content exclusion requirements with security team
- [ ] Establish usage metrics baseline
- [ ] Create internal Copilot governance policy document
- [ ] Schedule follow-up session for Q&A after initial rollout

---

## Live Demo Scripts (Instructor Reference)

> **Environment**: GitHub Enterprise with EMU  
> **Pre-requisites**: Enterprise Owner access, at least one organization with Copilot enabled

---

### Demo 1: Seat Assignment & Policy Inheritance (Section 2)

**Objective**: Show how Copilot access is managed at enterprise and org levels

#### Setup Before Demo
- Ensure you have at least 2 organizations in your enterprise
- Have a test user account ready that you can toggle access for

#### Step-by-Step Script

1. **Navigate to Enterprise Copilot Settings**
   ```
   URL: https://github.com/enterprises/[YOUR-ENTERPRISE]/settings/copilot/policies
   ```
   - Click your profile avatar (top-right) → "Your enterprises"
   - Select your enterprise
   - Left sidebar: Settings → Copilot → Policies

2. **Show the Policy Options**
   - Point out the three policy states:
     - **Enabled**: All orgs get Copilot by default
     - **Disabled**: No orgs can use Copilot
     - **No policy**: Each org decides independently
   - **Talking point**: "This is your master switch. In regulated environments, you might start with 'Disabled' and explicitly enable per-org."

3. **Navigate to Access Management**
   ```
   URL: https://github.com/enterprises/[YOUR-ENTERPRISE]/settings/copilot/seat_management
   ```
   - Left sidebar: Copilot → Seat management

4. **Show Seat Assignment Options**
   - Demonstrate the two assignment models:
     - **All members**: Every enterprise member gets a seat
     - **Selected members**: Granular assignment
   - If using "Selected members", show how to search and add users

5. **Show Organization-Level Inheritance**
   ```
   URL: https://github.com/orgs/[YOUR-ORG]/settings/copilot/policies
   ```
   - Navigate to one of your organizations
   - Settings → Copilot → Policies
   - **Talking point**: "Notice how org settings show 'Enforced by enterprise' for policies set at the enterprise level. Orgs can only configure what the enterprise delegates."

6. **Demonstrate a Live Toggle (Optional)**
   - If you have a test user, show adding/removing their seat
   - Show how changes appear in the usage dashboard

#### Key Points to Emphasize
- EMU provides centralized identity management—users can't bypass enterprise policies
- Policy inheritance flows down: Enterprise → Org → Repo
- Seat count directly impacts billing

---

### Demo 2: Content Exclusions (Section 3)

**Objective**: Configure content exclusions to protect sensitive code

#### Setup Before Demo
- Identify a repository that could serve as a "sensitive" example
- Consider creating a test repo with folders like `/secrets/` or `/proprietary/`

#### Step-by-Step Script

1. **Navigate to Content Exclusions**
   ```
   URL: https://github.com/orgs/[YOUR-ORG]/settings/copilot/content_exclusion
   ```
   - Organization Settings → Copilot → Content exclusion

2. **Explain the Interface**
   - **Talking point**: "Content exclusions prevent Copilot from reading or suggesting code from specific paths. This is critical for protecting trade secrets, security-sensitive code, or compliance-restricted content."

3. **Add an Exclusion Pattern**
   - Click "Add exclusion"
   - Repository: Select a specific repo OR use `*` for all repos
   - Paths: Enter patterns like:
     ```
     **/secrets/**
     **/*.env
     **/internal-api/**
     src/proprietary/**
     ```
   - Click "Save"

4. **Explain Pattern Syntax**
   | Pattern | What it Excludes |
   |---------|------------------|
   | `**/secrets/**` | Any `secrets` folder at any depth |
   | `**/*.env` | All `.env` files anywhere |
   | `src/auth/*` | Everything directly in `src/auth/` |
   | `*.key` | All `.key` files in repo root |

5. **Show the Exclusion List**
   - After saving, show the list of active exclusions
   - **Talking point**: "These exclusions take effect immediately. Developers don't need to do anything—Copilot simply won't include these paths in its context."

6. **Verify Exclusion is Active (Optional Live Test)**
   - Open VS Code with Copilot connected to your enterprise
   - Navigate to an excluded file
   - Show that Copilot doesn't provide suggestions in that context
   - **Note**: This requires VS Code setup; can skip if time-constrained

#### Key Points to Emphasize
- Exclusions are additive—you can set them at both org and repo level
- No developer action required; enforcement is automatic
- Audit log captures exclusion changes

---

### Demo 3: Public Code Filter (Section 3)

**Objective**: Enable the filter that blocks suggestions matching public code

#### Step-by-Step Script

1. **Navigate to Enterprise Copilot Policies**
   ```
   URL: https://github.com/enterprises/[YOUR-ENTERPRISE]/settings/copilot/policies
   ```

2. **Locate the Public Code Setting**
   - Find "Suggestions matching public code"
   - Show the options:
     - **Allowed**: Copilot may suggest code similar to public repositories
     - **Blocked**: Copilot filters out suggestions matching public code
     - **No policy**: Organizations decide

3. **Change the Setting (Live)**
   - Select "Blocked"
   - Click "Save"
   - **Talking point**: "When blocked, Copilot runs a real-time check against its index of public code. If a suggestion matches, it's filtered out. This adds ~100ms latency but significantly reduces IP risk."

4. **Show Organization Override (If No Policy Selected)**
   ```
   URL: https://github.com/orgs/[YOUR-ORG]/settings/copilot/policies
   ```
   - If enterprise is set to "No policy", show how orgs can set their own preference
   - **Talking point**: "Some orgs may want this blocked for compliance, while internal tools teams might allow it for faster development. The hierarchy lets you be flexible."

5. **Discuss Trade-offs**
   - **Blocked**: Fewer suggestions, more IP protection
   - **Allowed**: More suggestions, requires developer judgment
   - **Recommendation**: Start with "Blocked" for regulated industries; "Allowed" for internal tools/prototypes

#### Key Points to Emphasize
- This is not 100% foolproof—it catches exact and near matches, not all derivative code
- Developers should still review suggestions for licensing concerns
- Legal/compliance teams often require this as a baseline control

---

### Demo 4: Full Policy Walkthrough (Section 4)

**Objective**: Tour all Copilot policy settings and explain each option

#### Step-by-Step Script

1. **Navigate to Enterprise Policies**
   ```
   URL: https://github.com/enterprises/[YOUR-ENTERPRISE]/settings/copilot/policies
   ```

2. **Walk Through Each Policy Setting**

   | Setting | Location | Options to Show |
   |---------|----------|-----------------|
   | Copilot in IDE | Policies page | Enabled / Disabled / No policy |
   | Copilot Chat | Policies page | Enabled / Disabled / No policy |
   | Copilot in CLI | Policies page | Enabled / Disabled / No policy |
   | Public code filter | Policies page | Allowed / Blocked / No policy |

3. **Explain "Enforce" vs "No Policy"**
   - **Talking point**: "When you select 'Enabled' or 'Disabled', you're enforcing that setting across all organizations. 'No policy' delegates the decision downward."
   - Show the visual indicator when a policy is enforced

4. **Navigate to Knowledge Bases (Enterprise Feature)**
   ```
   URL: https://github.com/enterprises/[YOUR-ENTERPRISE]/settings/copilot/knowledge_bases
   ```
   - **Talking point**: "Knowledge bases let Copilot Chat reference your internal documentation. You can connect repos containing docs, wikis, or code examples."
   - Show how to create a knowledge base (or show existing one)

5. **Show Organization-Level View**
   ```
   URL: https://github.com/orgs/[YOUR-ORG]/settings/copilot/policies
   ```
   - Point out which settings show "Enforced by enterprise policy"
   - Show which settings the org can still control

6. **Demonstrate a Policy Change**
   - Toggle one setting (e.g., Copilot CLI from "No policy" to "Enabled")
   - Save and show the confirmation
   - **Talking point**: "Changes take effect immediately. Users may need to restart their IDE to pick up new permissions."

#### Key Points to Emphasize
- EMU + enterprise policies = centralized control
- Start restrictive, then loosen based on feedback
- Document your policy decisions for audit purposes

---

### Demo 5: Usage Analytics Dashboard (Section 5)

**Objective**: Show how to monitor Copilot adoption and ROI metrics

#### Step-by-Step Script

1. **Navigate to Usage Dashboard**
   ```
   URL: https://github.com/enterprises/[YOUR-ENTERPRISE]/settings/copilot/usage
   ```
   - Enterprise Settings → Copilot → Usage

2. **Tour the Dashboard Sections**

   **Active Users Section**
   - Show daily/weekly/monthly active user counts
   - **Talking point**: "This tells you actual adoption, not just seat assignment. If you have 500 seats but only 200 active users, you have optimization opportunities."

   **Acceptance Rate**
   - Show the percentage of suggestions accepted
   - **Talking point**: "High acceptance rates (60%+) indicate Copilot is providing relevant suggestions. Low rates might mean developers need training or your codebase has unique patterns Copilot hasn't learned."

   **Language Breakdown**
   - Show which languages have highest usage
   - **Talking point**: "This helps prioritize training and identify which teams are getting the most value."

3. **Show Time Range Selector**
   - Change from "Last 7 days" to "Last 28 days" or custom range
   - Show how trends appear over time

4. **Export Data (If Available)**
   - Show the export/download option
   - **Talking point**: "For compliance and ROI reporting, you can export this data to share with leadership or audit teams."

5. **Organization-Level Drill-Down**
   ```
   URL: https://github.com/orgs/[YOUR-ORG]/settings/copilot/usage
   ```
   - Show how org admins see only their organization's metrics
   - **Talking point**: "This lets team leads monitor their own adoption without enterprise-wide visibility."

#### Metrics to Highlight

| Metric | What It Tells You | Action If Low |
|--------|-------------------|---------------|
| Active users / Seats | Adoption rate | Training, awareness |
| Acceptance rate | Suggestion quality | Refine custom instructions |
| Lines suggested | Volume impact | Calculate time savings |

---

### Demo 6: Audit Log Review (Section 5)

**Objective**: Show where to find Copilot-related audit events

#### Step-by-Step Script

1. **Navigate to Enterprise Audit Log**
   ```
   URL: https://github.com/enterprises/[YOUR-ENTERPRISE]/settings/audit-log
   ```

2. **Filter for Copilot Events**
   - In the search box, enter: `action:copilot`
   - Or use specific filters:
     ```
     action:copilot.policy_update
     action:copilot.seat_assignment
     action:copilot.content_exclusion
     ```

3. **Show Event Details**
   - Click on an event to expand details
   - Point out:
     - **Actor**: Who made the change
     - **Timestamp**: When it happened
     - **Details**: What specifically changed

4. **Export Audit Log**
   - Show the "Export" button
   - **Talking point**: "For compliance audits, you can export logs in JSON or CSV format. These integrate with your SIEM or compliance tools."

5. **Discuss Retention**
   - **Talking point**: "Enterprise audit logs are retained for [X days/months based on your plan]. For longer retention, set up streaming to external storage."

#### Audit Events to Know

| Event | Trigger |
|-------|---------|
| `copilot.seat_added` | User granted Copilot access |
| `copilot.seat_removed` | User access revoked |
| `copilot.policy_update` | Policy setting changed |
| `copilot.content_exclusion_create` | New exclusion added |
| `copilot.content_exclusion_delete` | Exclusion removed |

---

### Pre-Demo Checklist

Run through this before the workshop:

- [ ] Verify enterprise owner access works
- [ ] Confirm at least one org has Copilot enabled
- [ ] Check that usage dashboard has data (use Copilot yourself to generate activity)
- [ ] Create a test repo with `/secrets/` folder for content exclusion demo
- [ ] Test screen sharing shows the GitHub UI clearly
- [ ] Have backup screenshots ready in case of connectivity issues
- [ ] Bookmark all demo URLs in a dedicated browser folder

### Backup Plan

If live demo fails:
1. Use screenshots captured during prep
2. Switch to GitHub Docs walkthrough: https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization
3. Engage audience with Q&A while troubleshooting

---

*Workshop materials prepared for GitHub Copilot Enterprise governance training*
