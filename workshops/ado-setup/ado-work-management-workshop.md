# Azure DevOps Work Management Workshop

**Duration**: 1 hour 50 minutes · **Format**: Presentation + Live Demos · **Audience**: Project managers, portfolio leads, engineering managers, business analysts (5–10 participants) · **Demo Environment**: `dev.azure.com/tpitest/`

## Workshop Overview

This workshop demonstrates how Azure DevOps (ADO) can serve as a unified platform for **portfolio delivery**, **project delivery**, and **team-level workflow management** using a multi-project structure. Participants will see live demos across three team projects showing cross-project Delivery Plans, Power BI analytics with Analytics Views, Microsoft Planner integration, UAT management, and how common Jira workflows translate to ADO.

### Learning Objectives

By the end of this workshop, participants will be able to:

- Structure an ADO organization with multiple team projects for portfolio-level rollup
- Configure area paths and iteration paths for hierarchical delivery tracking
- Use cross-project Delivery Plans to visualize milestones and dependencies across teams
- Connect Power BI to ADO Analytics Views for portfolio-level reporting and dashboards
- Integrate Microsoft Planner for broad business project and task tracking
- Set up and manage UAT workflows inside Azure DevOps Test Plans
- Map Jira concepts to their ADO equivalents
- Understand integration patterns for Jira and ServiceNow

### Prerequisites

| Requirement | Details |
|---|---|
| **Azure DevOps Organization** | `dev.azure.com/tpitest/` with 3 team projects pre-configured (instructor) |
| **Licenses** | Basic + Test Plans license (for UAT demo); Basic for all other sections |
| **Power BI Desktop** | Installed on presenter machine for Analytics Views demo |
| **Remote meeting** | Teams/Zoom with screen-sharing capability |
| **Optional** | Microsoft Planner access (for live Planner integration demo) |

### Demo Environment Structure

The demos use four team projects — one portfolio hub plus three delivery streams — representing two business portfolios:

```
dev.azure.com/tpitest/
├── Project: "Portfolio Delivery"      ← Hub: Delivery Plans, Analytics Views, dashboards, wiki
├── Project: "Customer Portal"        ← Portfolio: Digital Products
│   └── Team: "Portal Dev"
├── Project: "API Platform"           ← Portfolio: Digital Products
│   └── Team: "API Engineering"
└── Project: "Employee Hub"           ← Portfolio: Internal Ops
    └── Team: "Internal Apps"
```

All projects use the **Agile - Portfolio** inherited process template. The **Portfolio Delivery** project owns no code or team-level work — it's the neutral home for cross-project Delivery Plans, Analytics Views, dashboards, and wiki.

## Session Agenda

| Section | Topic | Time |
|---|---|---|
| 1 | Welcome & Discovery | 10 min |
| 2 | ADO Work Management Foundations | 12 min |
| 3 | Portfolio, Project & Team Hierarchy | 18 min |
| 4 | Delivery Plans & Dashboards | 8 min |
| — | ☕ Break | 10 min |
| 5 | Power BI & Analytics Views | 15 min |
| 6 | Microsoft Planner Integration | 12 min |
| 7 | Managing UAT in Azure DevOps | 12 min |
| 8 | Jira Comparison & Integration Patterns | 8 min |
| 9 | Q&A & Next Steps | 5 min |

---

## 1. Welcome & Discovery (10 min)

### Key Points

- Introductions — roles and responsibilities of each participant
- Validate the goals the customer shared ahead of the session:
  - Portfolio-level visibility across business initiatives
  - Project delivery tracking with milestones
  - Team-level sprint/kanban workflow
  - Microsoft Planner integration for broad business task tracking
  - UAT management within ADO
  - Jira feature mapping and integration questions
- Set expectations: this is a **recommendation workshop with live demos**, not a hands-on lab
- Encourage questions at any time — especially "we do this in Jira, how does it work in ADO?"

### Discussion Points

- What tools are teams currently using for work tracking? (ADO, Jira, Planner, spreadsheets?)
- How many teams/projects would roll up into the portfolio view?
- Are there existing ADO organizations or projects we should build on?
- What does "done" look like for UAT today?

---

## 2. ADO Work Management Foundations (12 min)

### Key Points

- **Organizations → Projects → Teams** — the three structural layers in ADO
- **Process templates** determine work item types and workflow states:

| Process | Best For | Work Item Hierarchy |
|---|---|---|
| **Basic** | Simple tracking | Epic → Issue → Task |
| **Agile** | Most software teams | Epic → Feature → User Story → Task |
| **Scrum** | Sprint-based delivery | Epic → Feature → Product Backlog Item → Task |
| **CMMI** | Regulated / formal environments | Epic → Feature → Requirement → Task |

- **Recommendation**: Use **Agile** or **Scrum** process — both support the four-level hierarchy needed for portfolio → project → team views
- **Inherited processes** — customize the base process (add fields, states, work item types) without losing upgrade compatibility

### RAID Log via Custom Work Item Types

ADO doesn't have a built-in RAID log, but inherited processes let you create one natively using **custom work item types**. Each RAID category becomes a first-class work item that flows through boards, queries, dashboards, and Power BI.

| RAID Category | Custom WIT | Key Fields | Workflow States |
|---|---|---|---|
| **Risks** | Risk | Likelihood (High/Med/Low), Impact (High/Med/Low), Mitigation Plan, Risk Owner | Identified → Mitigating → Accepted → Closed |
| **Assumptions** | Assumption | Confidence (High/Med/Low), Validation Method, Validated By | Stated → Validating → Confirmed → Invalidated |
| **Issues** | Issue | Severity (1–4), Impact Description, Resolution Plan, Escalated To | Open → Investigating → Resolved → Closed |
| **Decisions** | Decision | Decision Statement, Rationale, Decided By, Decision Date | Proposed → Under Review → Approved → Superseded |
| **Dependencies** | *(use built-in links)* | Predecessor/Successor link type on existing work items | Visible on Delivery Plans |

**Why custom WITs over tags or wiki tables:**

- Each RAID item gets its own **board column workflow** — drag a Risk from "Identified" to "Mitigating" to track progress
- **Queries and dashboards** — create a "Open Risks by Impact" chart widget or a "RAID Summary" query on the portfolio dashboard
- **Power BI integration** — RAID items flow through Analytics Views into portfolio reports alongside Epics and Features
- **Linking** — link a Risk to the Epic or Feature it threatens; link an Issue to the Bug that resolves it
- **Notifications** — set alerts when a high-impact Risk changes state

**Implementation steps:**

1. Open Organization Settings → Process → select your inherited process (e.g., Agile - Portfolio)
2. Click **+ New work item type** for each RAID category (Risk, Assumption, Issue, Decision)
3. Add custom fields (Likelihood, Impact, Mitigation Plan, etc.) to each WIT
4. Configure the workflow states for each WIT
5. Set the **backlog level** — place RAID items at the same level as Epics (portfolio backlog) so portfolio leads see them alongside business initiatives
6. **Link RAID items to delivery work** — use Related link type to connect a Risk or Decision to the Epic, Feature, or Story it impacts
7. Dependencies don't need a custom WIT — use the built-in **Predecessor/Successor** link type, which renders automatically on Delivery Plans

> **Note**: Custom WITs appear on boards and backlogs alongside standard work items. Use board column rules or swimlanes to separate RAID items visually if needed.

### Process Rules & Governance

Inherited processes support **custom rules** that enforce governance without manual policing:

| Rule | Condition | Action | Governance Value |
|---|---|---|---|
| Require Story Points on Resolved | State changes to `Resolved` | Make `Story Points` required | Ensures velocity data is always accurate |
| Auto-assign on Active | State changes to `Active` | Set `Assigned To` = current user | No orphan work items in progress |
| Require Mitigation on Risk | Risk state changes to `Mitigating` | Make `Mitigation Plan` required | Forces risk documentation before action |
| Default Business Priority | Work item is created | Set `Business Priority` = `Medium` | Every item starts with a baseline priority |
| Read-only UAT Status until Resolved | State = `New` or `Active` | Make `UAT Status` read-only | UAT field only editable at the right stage |

- Rules are configured per work item type under Organization Settings → Process → WIT → **Rules** tab
- Business/solution owners can define the rules; ADO enforces them automatically on every save

### Versioning & History

Every work item in ADO maintains a **complete audit trail**:

- **History tab** — shows every field change with timestamp, old value, new value, and who changed it
- **Discussion thread** — chronological comments and @mentions attached to each work item
- **Revision API** — programmatic access to all historical revisions (useful for compliance auditing)
- **No delete by default** — work items are soft-deleted (moved to Recycle Bin); admins can permanently delete if needed
- **Link history** — parent-child and related link changes are also tracked

### Single Project vs. Multiple Projects

| Factor | Single Project | Multiple Projects |
|---|---|---|
| **Cross-team visibility** | Easy — all teams share one backlog | Requires cross-project Delivery Plans + Power BI |
| **Access control** | Area Path–based permissions | Project-level isolation (stronger boundaries) |
| **Repos & pipelines** | Shared within one project | Separated per project (better for distinct codebases) |
| **Portfolio rollup** | Backlog levels + Delivery Plans | Delivery Plans + Power BI Analytics Views |
| **Scalability** | Can get cluttered with 10+ teams | Cleaner separation of concerns |
| **Best for** | One product / one department | Multiple business units / distinct delivery streams |

> **Note**: For this customer, we recommend **multiple team projects** — one per major delivery stream — with **cross-project Delivery Plans** for portfolio visibility and **Power BI Analytics Views** for consolidated reporting.

### Area Paths & Iteration Paths

Two axes for organizing work within each project:

- **Area Paths** — organize work by team, component, or feature area (hierarchical within a project)
- **Iteration Paths** — organize work by time (sprints, releases, fiscal quarters)
- **Consistent iteration naming** across projects enables cross-project Delivery Plans to align timelines

### 🖥️ Demo: Multi-Project Structure Walkthrough

- Show `dev.azure.com/tpitest/` with three team projects: Customer Portal, API Platform, Employee Hub
- Walk through Project Settings → Teams, Area Paths, Iteration Paths in Customer Portal
- Show consistent Iteration Paths across all three projects (FY26 → Q3 → Sprint 1, 2, 3)
- Show the Agile process template and the work item hierarchy

### Discussion Points

- Which process template aligns best with how your teams work today?
- How many distinct delivery streams do you have? (Each could be a project)
- Are there custom fields or states you'd need beyond the defaults?
- What governance rules would you want enforced automatically? (e.g., mandatory fields on state change)

---

## 3. Portfolio, Project & Team Hierarchy (18 min)

### Key Points

- **Multi-project portfolio structure** at `dev.azure.com/tpitest/`:

```
Portfolio: Digital Products
├── Project: "Customer Portal"
│   ├── Epic: "Portal Redesign FY26"
│   │   ├── Feature: "User Authentication Overhaul"
│   │   └── Feature: "Dashboard Analytics Module"
│   └── Team: "Portal Dev"
│
├── Project: "API Platform"
│   ├── Epic: "API Gateway Modernization"
│   │   └── Feature: "Rate Limiting & Throttling"
│   └── Team: "API Engineering"

Portfolio: Internal Ops
└── Project: "Employee Hub"
    ├── Epic: "Employee Onboarding Automation"
    │   └── Feature: "Self-Service Benefits Enrollment"
    └── Team: "Internal Apps"
```

- **Epics** = business initiatives / portfolio items (owned by portfolio leads)
- **Features** = project deliverables / milestones (owned by project managers)
- **User Stories** = team-level work (owned by team leads / developers)
- **Tasks** = individual work items within a story (owned by team members)
- **Parent-child linking** rolls up status, effort, and completion from tasks → stories → features → epics

### Unified Team Backlog

Each delivery team manages a **single backlog** that includes work from multiple sources:

| Work Source | Work Item Type | How It Gets There |
|---|---|---|
| **Project work** | User Stories (from multiple Epics/Features) | Parent-child links from approved projects |
| **Defects** | Bug | Created from Test Plans, production incidents, or manual entry |
| **Small enhancements** | User Story (tagged "Enhancement") | Added directly to backlog by team or product owner |
| **Technical debt** | User Story (tagged "Tech Debt") or custom WIT | Added directly by engineering leads |

- All item types appear on the **same board and sprint backlog** — the team prioritizes everything together
- Use **tags** or a **custom "Work Category" field** to distinguish project work from tech debt and enhancements
- **Bugs are prioritized against stories** — they share the same priority and sprint assignment, so the team makes explicit trade-offs
- **Board swimlanes** can separate defects from stories visually while keeping them in one prioritization flow

### Priority & Governance Model

| Level | Who Prioritizes | Mechanism in ADO |
|---|---|---|
| **Feature / Epic** | Business & solution owners (in partnership with IT) | Backlog ordering + Business Priority custom field |
| **User Story / Bug** | Product owner + team | Backlog ordering within the sprint; defects prioritized alongside stories |
| **Task** | Individual team members | Task assignment on the sprint taskboard; any team member can assign tasks to others |

- **Feature-level prioritization** by business owners uses the `Business Priority` custom field (High/Medium/Low) and drag-and-drop reordering on the backlog
- **Defects compete with stories** for sprint capacity — they’re not in a separate queue
- **Task assignment** is peer-to-peer: any team member can assign a task to another team member directly on the taskboard

### Traceability & Documentation

ADO supports **end-to-end traceability** from approved project through to deployment:

```
Project (Epic) → Feature → Story → Test Case → Defect (Bug)
                     │           │
                     ├─ Risk     ├─ Acceptance Criteria (in Description)
                     ├─ Decision └─ Design Artifacts (link/attachment)
                     └─ Assumption
```

**Linking and attaching artifacts:**

- **Acceptance criteria** — use the built-in Acceptance Criteria field on User Stories, or add a custom rich-text field
- **Design documents / requirements** — attach files directly to work items, or use **Hyperlink** links to SharePoint, Confluence, or other document stores
- **Decisions and risks** — link Decision and Risk custom WITs to the Feature or Story they impact using **Related** link type
- **Test cases** — linked to Stories/Features via **Tests / Tested By** link type (created automatically in Test Plans)
- **Defects** — linked to test cases via **Tested By** and to Stories via **Related** or **Child** link type
- **Wiki pages** — reference ADO wiki pages from work items for detailed design documentation

> **Note**: All link types are queryable — you can build a query showing "all Risks linked to Feature X" or "all Test Cases covering Story Y."

### How the Three Views Map to ADO

| View | ADO Concept | What You See |
|---|---|---|
| **Portfolio delivery** | Cross-project Delivery Plan + Power BI | Roadmap across all projects, milestones, dependencies |
| **Project delivery** | Backlogs & Boards within a project | Features and Stories for one delivery stream |
| **Team view** | Sprint Board or Kanban Board per team | Day-to-day tasks, capacity, burndown |

### Portfolio View: Cross-Project Delivery Plans

- **Delivery Plans** can span multiple team projects (added in ADO 2022 update)
- Configure rows to show backlogs from different projects on one timeline
- **Milestones** as diamond markers on calendar dates (shared across projects)
- **Dependencies** drawn between work items — even across project boundaries
- **Limitations**: All projects must use the same process template for consistent work item types

### Project View: Boards & Backlogs

- Each project has its own backlog — filter by Area Path to scope further
- **Board view** at User Story level for kanban-style tracking
- Configure **swimlanes** by priority, type, or custom field
- Add **board columns** matching your workflow (e.g., New → Analysis → Dev → Code Review → Test → Done)

### Team View: Sprints & Taskboards

- Each team has its own **Sprint board** within the current iteration
- **Taskboard** cards show assigned-to, remaining work, and state
- **Burndown/Burnup charts** per sprint and per team

### 🖥️ Demo: Building the Hierarchy Across Projects

1. Open Customer Portal project → create Epic: "Portal Redesign FY26"
2. Create Features under it: "User Auth Overhaul," "Dashboard Analytics Module"
3. Create User Stories under a Feature and assign to Portal Dev team
4. Create Tasks under a User Story
5. Switch to API Platform project → show Epic: "API Gateway Modernization"
6. Show the **Backlogs** view at Epic level in Customer Portal — all items roll up
7. Show the **cross-project Delivery Plan** — all three projects on one timeline
8. Show **Board** view for Portal Dev — filtered to their work only
9. Show **Sprint** view — taskboard with capacity

### Discussion Points

- How many portfolio-level initiatives do you typically track at once?
- Do project managers manage within one project, or need cross-project views?
- Would you want the portfolio view in ADO Delivery Plans, Power BI, or both?

---

## 4. Delivery Plans & Dashboards (8 min)

### Key Points

- **Capacity planning** — set per-team-member capacity in hours per sprint
  - Account for days off, meetings, and other commitments
  - Configure **activity types** (Design, Development, QA, DevOps) — each team member sets hours per activity
  - ADO warns when a sprint is over-allocated — broken down by activity type so you can see if QA is overloaded while Dev has room
  - **Historical velocity** (story points completed per sprint) feeds forecasting — ADO’s Forecast toggle on the backlog shows how many sprints remaining work will take based on rolling velocity
- **Cross-project Delivery Plans** — the portfolio roadmap view:
  - Show work from teams across Customer Portal, API Platform, and Employee Hub on one timeline
  - Drag-and-drop to replan across iterations
  - Add **milestones** as markers (calendar dates) — these represent business deadlines
  - Draw **dependency lines** between work items across projects
  - Include **business deliverables** alongside IT delivery — business teams can have their own row on the Delivery Plan (e.g., "Change Management," "Training," "Business Process") so the schedule shows both IT and business work on one timeline
- **Dashboards** — customizable per-project or per-team views with widgets:
  - Burndown/Burnup charts
  - Velocity widget (story points completed per sprint)
  - Lead time / Cycle time analytics
  - Query-based charts (work items by state, by assigned-to, by project)

> **Note**: For cross-project consolidated analytics (portfolio-level burndown, velocity trends across all projects), see Section 5 — Power BI & Analytics Views.

### 🖥️ Demo: Cross-Project Delivery Plan & Dashboard

1. Open **Portfolio Delivery** project → Boards → **Delivery Plans** → open "Digital Portfolio Roadmap"
2. Point out milestone markers for Q3 business deadlines
3. Show how dragging a Feature to a later sprint updates the timeline
4. Show a dependency line between a Customer Portal Feature and an API Platform Feature
5. Switch to a pre-built Dashboard in **Portfolio Delivery**: cross-project burndown, velocity, status widgets
6. Show how to create a cross-project query chart widget

### Discussion Points

- What business milestones or deadlines should appear on the delivery plan?
- Who needs access to dashboards — just leads, or business stakeholders too?
- Are you currently using Power BI or another BI tool for reporting?

---

## ☕ Break — 10 Minutes

---

## 5. Power BI & Analytics Views (15 min)

### Key Points

- **Why Power BI matters for multi-project portfolios** — ADO dashboards are per-project; Power BI provides the **cross-project consolidated view** that portfolio leads need
- **Analytics Views** — curated OData feeds built into ADO:
  - Select which projects, work item types, fields, and history to include
  - ADO pre-aggregates the data — no raw OData queries needed
  - Created in the **Portfolio Delivery** project → Boards → Analytics views → + New View

### Creating an Analytics View

| Setting | Recommended Value |
|---|---|
| **Name** | "Portfolio — All Projects" |
| **Projects** | Customer Portal, API Platform, Employee Hub |
| **Work item types** | Epic, Feature, User Story |
| **Fields** | Title, State, Story Points, Iteration Path, Area Path, Assigned To, Tags, Changed Date |
| **History** | Last 30 days (rolling) or "All history" for trend analysis |
| **Filter** | Active and Closed items (exclude Removed) |

### Connecting Power BI Desktop

1. Open Power BI Desktop → **Get Data** → **OData Feed**
2. URL format: `https://analytics.dev.azure.com/tpitest/_odata/v4.0-preview/WorkItems?$filter=...`
3. Or use the **Azure DevOps connector** (built-in): Get Data → Azure DevOps → select org + Analytics View
4. Authenticate with Azure AD (same credentials as ADO)
5. Power BI imports the data and creates a dataset

### Pre-Built Portfolio Report: Key Visuals

The demo report includes the following pages:

- **Story Points by State** — stacked bar chart showing story points across Closed/Active/Resolved/New per project
- **Velocity by Sprint** — clustered column chart comparing story points per sprint per project
- **User Stories by State** — donut chart showing the distribution of user story states across the portfolio
- **Story Points by Area** — treemap showing story point allocation across projects and area paths
- **Demand vs. Capacity** — clustered bar chart comparing total story points (demand) against team velocity (capacity) per project, highlighting over- or under-allocation
- **Portfolio Risks** — table/matrix showing open Risk work items by Impact and Likelihood, linked to Epics

### Key DAX Patterns

| Measure | DAX Formula | Purpose |
|---|---|---|
| **% Complete** | `DIVIDE(SUM(Closed Story Points), SUM(Total Story Points), 0)` | Rollup completion for Epics/Features |
| **Cross-Project Filter** | `CALCULATE([Total Points], ALL(Project))` | Remove project filter for portfolio totals |
| **Sprint Velocity** | `CALCULATE(SUM(Story Points), State = "Closed")` filtered by Iteration | Points completed per sprint |
| **Aging Days** | `DATEDIFF([Created Date], TODAY(), DAY)` | How old is each open item |
| **Rolling 30-Day Trend** | `CALCULATE([% Complete], DATESINPERIOD(Date, MAX(Date), -30, DAY))` | Trend line over last 30 days |

### Publishing & Sharing

- **Power BI Service** — publish the report to a workspace; share with portfolio leads and stakeholders
- **Row-level security (RLS)** — scope portfolio leads to their portfolio's projects only:
  - Create a role "Digital Products" → filter Project IN ("Customer Portal", "API Platform")
  - Create a role "Internal Ops" → filter Project = "Employee Hub"
  - Assign users to roles in Power BI Service
- **Scheduled refresh** — set the dataset to refresh daily or every few hours to keep dashboards current
- **Embed in Teams** — pin the Power BI report as a Teams tab for easy stakeholder access

### 🖥️ Demo: Power BI Analytics Report

1. Open ADO → Boards → Analytics views → show the pre-built "Portfolio — All Projects" view
2. Open Power BI Desktop → show the Azure DevOps connector pulling from that view
3. Walk through the pre-built report: Story Points by State, Velocity by Sprint, Stories by State
4. Show a DAX measure: % Complete rolling up from Stories to Features to Epics
5. Show row-level security configuration for portfolio scoping
6. Discuss publishing to Power BI Service and embedding in Teams

### Discussion Points

- Who are the primary consumers of portfolio-level reports? (Execs, PMO, finance?)
- Do you already have a Power BI workspace and licensing for report consumers?
- What scheduling cadence makes sense — real-time, daily, or weekly refresh?
- Are there specific KPIs beyond burndown and velocity that leadership tracks?

---

## 6. Microsoft Planner Integration (12 min)

### Key Points

- **Why integrate?** — Business stakeholders prefer Planner for lightweight task management; engineering teams work in ADO. Integration keeps both views in sync.
- **Integration approaches**:

| Approach | Complexity | Best For |
|---|---|---|
| **Power Automate** (recommended) | 🟡 Medium | Bi-directional sync between Planner tasks and ADO work items |
| **Azure Logic Apps** | 🟡 Medium | Same as Power Automate but with enterprise governance (Azure-hosted) |
| **Microsoft Graph API** | 🔴 High | Custom integration with full control over mapping and filtering |
| **Manual / Hybrid** | 🟢 Low | Business milestones in Planner, link to ADO Epics via URLs |

- **Recommended pattern — Power Automate**:
  1. **Planner → ADO**: When a Planner task is created in "Business Milestones" plan, create a corresponding ADO Epic
  2. **ADO → Planner**: When an ADO Epic changes state (moves to "Closed"), update the corresponding Planner task
  3. Use a shared identifier (ADO work item ID stored in Planner task notes) for bi-directional linking

- **Building to business milestones** — map Planner "buckets" to ADO milestones on the Delivery Plan:
  - Planner Bucket: "Q3 Deliverables" → ADO Milestone on Delivery Plan
  - Planner Task: "Launch Customer Portal" → ADO Epic in Customer Portal project
  - Progress in ADO (Features completing) rolls up and triggers Planner task % updates via Power Automate

### 🖥️ Demo: Power Automate Flow

1. Show a pre-built Power Automate flow: "When a Planner task is created → Create ADO Work Item"
2. Walk through the field mappings (Title, Due Date, Bucket → Project + Area Path)
3. Create a task in Planner → watch it appear as an ADO Epic in Customer Portal
4. Show the reverse flow: ADO state change → Planner task update

> **Note**: The standard Power Automate license covers the ADO and Planner connectors. No Premium license required.

### Discussion Points

- Which business stakeholders would use Planner vs. ADO directly?
- What fields need to stay synchronized between the two systems?
- Would a simple URL-link approach (Planner task links to ADO Epic) be sufficient for phase 1?

---

## 7. Managing UAT in Azure DevOps (12 min)

### Key Points

- **Azure Test Plans** — the ADO module for manual and exploratory testing
  - Requires **Basic + Test Plans** license (or Visual Studio Enterprise subscription)
  - Stakeholder-access users **cannot** execute test plans (need Basic + Test Plans license)
- **UAT workflow in ADO**:

| Step | ADO Feature | Who |
|---|---|---|
| 1. Define test plan | Test Plans → New Test Plan (scoped to iteration/area path) | QA / PM |
| 2. Create test suites | Organize by feature, requirement, or user workflow | QA / PM |
| 3. Author test cases | Step-by-step test cases with expected results | QA / BA |
| 4. Assign testers | Assign business users as testers on specific test suites | QA / PM |
| 5. Execute tests | Business users run tests via web UI (mark pass/fail per step) | Business users |
| 6. Log bugs | Failed step → "Create Bug" (auto-attaches repro steps + screenshot) | Business users |
| 7. Track progress | Test Plan charts show pass/fail/blocked/not-run rates | PM / Leads |

- **Stakeholder access** — business users doing UAT can use **Stakeholder** license (free in ADO):
  - Can view boards, dashboards, and work items
  - Can provide feedback via the **Test & Feedback** browser extension
  - **Cannot** execute test plans or author test cases (need Basic + Test Plans)

> **Note**: To allow business users to run tests, they need at minimum **Basic + Test Plans** or a **Visual Studio Enterprise** subscription. Stakeholder access alone does not include Test Plans execution. Consider assigning temporary Basic + Test Plans licenses during UAT sprints.

- **Tracing UAT to requirements** — link test suites to User Stories/Requirements for coverage tracking
- **Test analytics** show pass rates and trends over time

### 🖥️ Demo: UAT Setup & Execution

1. Create a Test Plan: "Q3 Customer Portal UAT" in the Customer Portal project
2. Add a Test Suite: "User Login Workflows"
3. Create a Test Case with step-by-step instructions and expected results
4. Run the test — mark one step as failed
5. Show the "Create Bug" flow from a failed test step (auto-attached details)
6. Show Test Plan progress charts (pass/fail/not run)

### Discussion Points

- Who writes the test cases today — QA, business analysts, or the business users themselves?
- How many business users would need to execute UAT tests simultaneously?
- Do you need UAT sign-off tracked as a formal gate before deployment?

---

## 8. Jira Comparison & Integration Patterns (8 min)

### Key Points

- **Jira → ADO concept mapping** — the most common "we do this in Jira" translations:

| Jira Concept | ADO Equivalent | Notes |
|---|---|---|
| Jira Project | ADO Project | 1:1 mapping |
| Epic | Epic | Same concept |
| Story | User Story (Agile) / PBI (Scrum) | Same purpose, different name |
| Task / Sub-task | Task | Linked as child of Story |
| Sprint | Iteration (Sprint) | Configured via Iteration Paths |
| Board (Kanban / Scrum) | Board (Kanban / Sprint) | Per-team boards in ADO |
| JQL (Jira Query Language) | WIQL (Work Item Query Language) | Similar syntax, different keywords |
| Filters / Saved Filters | Queries (Shared Queries) | Folder-organized in ADO |
| Dashboard + Gadgets | Dashboard + Widgets | Similar capability, different widget library |
| Components | Area Paths | Hierarchical in ADO (advantage) |
| Versions / Releases | Iteration Paths / Delivery Plans | ADO has richer timeline views |
| Jira Automation | Power Automate / Service Hooks | ADO uses Power Automate or webhooks |
| Confluence | Azure DevOps Wiki | Built-in wiki per project |
| Jira Align / Portfolio | Delivery Plans + Epics/Features | Built-in, no separate product needed |
| Tempo (time tracking) | Capacity Planning + Remaining Work | Native in ADO sprint planning |

- **Key ADO advantages** for this customer scenario:
  - Native four-level hierarchy (Epic → Feature → Story → Task) without plugins
  - Built-in Delivery Plans for cross-project portfolio views (Jira needs Advanced Roadmaps / Jira Align)
  - Test Plans included in the platform (Jira needs Zephyr or Xray plugin for UAT)
  - Tighter Microsoft 365 integration (Planner, Teams, Power BI)

### Integration Patterns

| Integration | Approach | Complexity |
|---|---|---|
| **Jira ↔ ADO sync** | Third-party: Exalate, Getint, OpsHub | 🟡 Medium |
| **Jira ↔ ADO migration** | ADO built-in import, or Jira Cloud Migration Assistant | 🟡 Medium |
| **ServiceNow → ADO** | Power Automate connector or ServiceNow ADO spoke | 🟡 Medium |
| **ADO → ServiceNow** | ADO Release pipeline gate → ServiceNow Change Request API | 🔴 High |

### ServiceNow Incident → ADO Defect Flow

The customer uses ServiceNow for incident and problem management. When a production incident reveals a software defect, that defect needs to flow into an ADO team backlog for prioritization:

| Step | System | What Happens |
|---|---|---|
| 1. Incident logged | ServiceNow | Support team creates an incident |
| 2. Root cause = code defect | ServiceNow | Incident is linked to a Problem record; support identifies it as a code issue |
| 3. Bug created in ADO | Power Automate / ServiceNow spoke | Automated flow creates a Bug in the appropriate ADO project with incident details |
| 4. Bug prioritized | ADO | Team prioritizes the Bug against other stories in the sprint backlog |
| 5. Bug resolved | ADO | Developer fixes and closes the Bug |
| 6. Incident updated | Power Automate | ADO state change triggers an update back to the ServiceNow incident |

- **Power Automate** is the recommended connector — no custom code needed
- The Bug in ADO links back to the ServiceNow incident via a **Hyperlink** field for traceability
- Defects from production follow the same prioritization model as all other backlog items — they compete with stories for sprint capacity

- **Jira coexistence** — if some teams stay on Jira while others move to ADO:
  - Use Exalate or Getint for bi-directional sync of Epics/Stories
  - Agree on a **system of record** per work item type — sync status and key fields only

### Discussion Points

- Which teams are currently on Jira, and are they migrating or coexisting?
- What Jira workflows or automations are most critical to replicate?
- Is ServiceNow your ITSM tool? What's the primary integration need — incidents, changes, or both?

---

## 9. Q&A & Next Steps (5 min)

### Key Points

- Open floor for remaining questions
- Summarize key recommendations:
  1. **Structure**: Portfolio Delivery hub project + multiple team projects (one per delivery stream) with cross-project Delivery Plans
  2. **Process**: Agile - Portfolio inherited process template (consistent across all projects)
  3. **Power BI**: Analytics Views for portfolio-level reporting across all projects
  4. **Planner**: Power Automate integration for business milestone sync
  5. **UAT**: Azure Test Plans with business user access for structured UAT execution
  6. **RAID**: Custom work item types (Risk, Assumption, Issue, Decision) linked to delivery work
  7. **Unified backlog**: Project work, defects, enhancements, and tech debt on one prioritized backlog per team
  8. **Jira**: Feature-by-feature mapping with coexistence tooling if needed
  9. **ServiceNow**: Power Automate for incident → defect flow and change request integration

### Suggested Next Steps

| Step | Action | Timeline |
|---|---|---|
| 1 | Choose process template (Agile or Scrum) and validate with teams | Week 1 |
| 2 | Create team projects and configure Area/Iteration Paths | Week 1–2 |
| 3 | Stand up a pilot with 1–2 projects and their teams | Week 2–3 |
| 4 | Create cross-project Delivery Plan | Week 3 |
| 5 | Build Power BI report from Analytics Views | Week 3–4 |
| 6 | Build Power Automate flows for Planner integration | Week 4–5 |
| 7 | Configure Test Plans for UAT pilot | Week 5–6 |
| 8 | Evaluate Jira coexistence tool (if needed) | Week 5–7 |
| 9 | Roll out to remaining teams with training | Week 7+ |

### Discussion Points

- What's the preferred timeline for a pilot project?
- Who should be the ADO project administrators?
- Would a follow-up hands-on session be useful after the pilot is running?

---

## Appendix

### Key URLs

| Resource | URL |
|---|---|
| Azure DevOps documentation | <https://learn.microsoft.com/azure/devops/> |
| Delivery Plans | <https://learn.microsoft.com/azure/devops/boards/plans/review-team-plans> |
| Analytics Views | <https://learn.microsoft.com/azure/devops/report/powerbi/what-are-analytics-views> |
| Connect Power BI to ADO | <https://learn.microsoft.com/azure/devops/report/powerbi/create-quick-report> |
| Azure Test Plans | <https://learn.microsoft.com/azure/devops/test/> |
| Power Automate ADO connector | <https://learn.microsoft.com/connectors/visualstudioteamservices/> |
| Power Automate Planner connector | <https://learn.microsoft.com/connectors/planner/> |
| Jira to ADO migration | <https://learn.microsoft.com/azure/devops/boards/work-items/office/migrate-jira-to-devops> |
| ServiceNow ADO integration | <https://learn.microsoft.com/azure/devops/service-hooks/services/servicenow> |
| ADO pricing and licensing | <https://azure.microsoft.com/pricing/details/devops/azure-devops-services/> |

### Pre-Workshop Checklist (Instructor)

- [ ] ADO demo organization at `dev.azure.com/tpitest/` with 4 projects (Portfolio Delivery + 3 team projects)
- [ ] Projects: Portfolio Delivery, Customer Portal, API Platform, Employee Hub — all using Agile - Portfolio process
- [ ] Teams configured: Portal Dev, API Engineering, Internal Apps
- [ ] Consistent Iteration Paths across all projects: FY26 → Q3 → Sprint 1, Sprint 2, Sprint 3
- [ ] Sample Epics, Features, User Stories, and Tasks pre-created across delivery projects
- [ ] Cross-project Delivery Plan in Portfolio Delivery spanning all three delivery projects
- [ ] Portfolio dashboards with cross-project widgets in Portfolio Delivery project
- [ ] Analytics View created in Portfolio Delivery: "Portfolio — All Projects" (Epics + Features + User Stories)
- [ ] Power BI Desktop report (.pbix) connected to the Analytics View with portfolio visuals
- [ ] Row-level security configured in the Power BI report for two portfolios
- [ ] Power Automate flow pre-built: Planner → ADO work item creation
- [ ] Microsoft Planner plan with sample buckets (Q3 Deliverables, Q4 Deliverables)
- [ ] Test Plan with a sample test suite and test cases in Customer Portal project
- [ ] At least one test case with step-by-step instructions ready to execute
- [ ] Verify screen sharing works with ADO, Planner, Power Automate, and Power BI Desktop open
- [ ] Prepare a "Jira → ADO" cheat sheet handout (the mapping table from Section 8)

### Backup Plan

If the live demo environment is unavailable:

- Use pre-recorded screen captures of each demo section
- Walk through the ADO documentation with annotated screenshots
- Use the Mermaid diagrams and tables in the slide deck to illustrate concepts
- For Power BI: show static screenshots of the portfolio report pages
- Offer to schedule a follow-up demo session once the environment is restored

---

## Live Demo Scripts (Instructor Reference)

> **Environment**: `dev.azure.com/tpitest/` with three team projects (Customer Portal, API Platform, Employee Hub)
> **Pre-requisites**: All projects using Agile process template, consistent Iteration Paths, sample work items pre-created (see Pre-Workshop Checklist)

### Demo 1: ADO Org & Multi-Project Structure (Section 2)

**Objective**: Show participants the three-project demo environment and how ADO organizations, projects, and teams relate.
**Duration**: 4 min

#### Setup Before Demo

- [ ] All four projects created and accessible at `dev.azure.com/tpitest/`
- [ ] Portfolio Delivery project visible as the hub (no teams, no work items)
- [ ] Teams configured: Portal Dev (Customer Portal), API Engineering (API Platform), Internal Apps (Employee Hub)
- [ ] Consistent Iteration Paths in all projects: FY26 → Q3 → Sprint 1 (Mar 2–13), Sprint 2 (Mar 16–27), Sprint 3 (Mar 30–Apr 10)

#### Step-by-Step Script

1. **Open the ADO organization** → Navigate to `dev.azure.com/tpitest/`
2. **Show the organization home page** → Point out the four projects listed: Portfolio Delivery, Customer Portal, API Platform, Employee Hub
3. **Talking point**: *"Portfolio Delivery is the hub — it's where portfolio leads go for Delivery Plans, dashboards, and Analytics Views. The other three projects are delivery streams: Customer Portal and API Platform are Digital Products; Employee Hub is Internal Ops."*
4. **Click into Customer Portal** → Navigate to **Project Settings** → **Teams**
5. **Show the team**: Portal Dev → Point out that the team has its own board and sprint cadence
6. **Navigate to Project Settings** → **Project configuration** → **Iteration Paths**
7. **Show the hierarchy**: FY26 → Q3 → Sprint 1, Sprint 2, Sprint 3
8. **Talking point**: *"Iteration Paths are configured identically across all three projects — this is critical for cross-project Delivery Plans to align on the same timeline."*
9. **Navigate to Project Settings** → **Project configuration** → **Area Paths**
10. **Show the area paths** for Customer Portal (e.g., Customer Portal → Authentication, Customer Portal → Dashboard)
11. **Quick switch** to API Platform project → show its teams and iterations are consistent
12. **Talking point**: *"All three projects use the Agile process template. Consistency here means Epics, Features, User Stories, and Tasks work the same way everywhere."*

#### Key Points to Emphasize

- Projects provide strong boundaries — separate repos, pipelines, permissions
- Teams within a project share the backlog but get their own boards and sprints
- Consistent iteration naming is the key to making cross-project Delivery Plans work

---

### Demo 2: Work Item Hierarchy & Cross-Project Linking (Section 3)

**Objective**: Build the Epic → Feature → User Story → Task hierarchy across projects and show rollup.
**Duration**: 6 min

#### Setup Before Demo

- [ ] Pre-created Epics in each project: "Portal Redesign FY26" (Customer Portal), "API Gateway Modernization" (API Platform), "Employee Onboarding Automation" (Employee Hub)
- [ ] Pre-created Features under each Epic
- [ ] A few User Stories and Tasks under Features in Customer Portal

#### Step-by-Step Script

1. **Open Customer Portal** → navigate to **Backlogs** → switch to **Epics** backlog level
2. **Show the Epic**: "Portal Redesign FY26" → expand to show child Features: "User Auth Overhaul," "Dashboard Analytics Module"
3. **Expand a Feature** → show child User Stories: "As a user, I can reset my password via email"
4. **Click into a User Story** → show child Tasks: "Implement password reset API endpoint," "Write integration tests"
5. **Talking point**: *"This four-level hierarchy — Epic, Feature, Story, Task — maps directly to your three-tier view. Epics are portfolio items. Features are project deliverables. Stories and Tasks are team-level work."*
6. **Show the rollup column** on the backlog → point out the aggregated Story Points rolling up from Stories to Features to Epics
7. **Create a new User Story live**: Title: "As a user, I can enable 2FA on my account"
   - Set the Area Path to Customer Portal → Authentication
   - Set the Iteration to FY26 → Q3 → Sprint 2
   - Set Story Points to 5
   - Link it as a child of Feature "User Auth Overhaul"
8. **Show the Epic's rollup update** → Story Points total increased
9. **Switch to API Platform project** → show its Epic "API Gateway Modernization" with Features
10. **Talking point**: *"Each project owns its own backlog, but we'll see in a moment how Delivery Plans and Power BI pull all of this together into a single portfolio view."*

#### Key Points to Emphasize

- Parent-child linking drives automatic rollup of effort and progress
- Each team only sees their own backlog — no noise from other projects
- The hierarchy is the foundation for every view: portfolio, project, and team

---

### Demo 3: Cross-Project Delivery Plan (Section 3/4)

**Objective**: Show the cross-project Delivery Plan as the portfolio roadmap view with milestones and dependencies.
**Duration**: 5 min

#### Setup Before Demo

- [ ] Cross-project Delivery Plan created in **Portfolio Delivery** project named "Digital Portfolio Roadmap"
- [ ] Plan includes backlogs from all three delivery projects
- [ ] At least one milestone marker set (e.g., "Q3 Business Review — Apr 13")
- [ ] At least one dependency between a Customer Portal Feature and an API Platform Feature

#### Step-by-Step Script

1. **Navigate to Portfolio Delivery** project → **Boards** → **Delivery Plans** → open "Digital Portfolio Roadmap"
2. **Orient the audience**: *"Each row is a team backlog from one of our three projects. The columns are sprint iterations. The cards are work items plotted on the timeline."*
3. **Point out the rows**: Portal Dev (Customer Portal), API Engineering (API Platform), Internal Apps (Employee Hub)
4. **Point out milestone markers**: "Q3 Business Review — Apr 13" diamond marker on the timeline
5. **Show a dependency line** between "User Auth Overhaul" (Customer Portal) and "Rate Limiting & Throttling" (API Platform)
6. **Talking point**: *"This dependency means the API team needs to deliver rate limiting before the portal team can complete their auth overhaul. The line makes this visible to everyone."*
7. **Drag a Feature card** from Sprint 2 to Sprint 3 → show the timeline update in real-time
8. **Talking point**: *"Replanning is drag-and-drop. Move a card and the whole timeline adjusts. This is the view your portfolio leads and project managers will live in."*
9. **Zoom out** to show the full quarter view → all three projects on one screen

#### Key Points to Emphasize

- Cross-project Delivery Plans are built-in — no extra product required (unlike Jira Align)
- Dependencies across projects are visible and trackable
- Portfolio leads get a live, always-current roadmap — not a static slide deck

---

### Demo 4: Dashboards & Capacity (Section 4)

**Objective**: Show portfolio dashboards in Portfolio Delivery and team dashboards/capacity in a delivery project.
**Duration**: 3 min

#### Setup Before Demo

- [ ] Portfolio dashboard in Portfolio Delivery with widgets: cross-project burndown, velocity by project, work items by state
- [ ] Team dashboard in Customer Portal with widgets: Burndown, Velocity, Work Items by State
- [ ] Sprint capacity configured for Portal Dev team (at least 2 team members with hours set)

#### Step-by-Step Script

1. **Navigate to Portfolio Delivery** → **Overview** → **Dashboards**
2. **Show the portfolio dashboard**: cross-project burndown, velocity by project, all-projects work items by state
3. **Talking point**: *"Portfolio Delivery is the neutral hub — portfolio leads and execs bookmark this project. It has no code or team work, just the views they need."*
4. **Switch to Customer Portal** → **Overview** → **Dashboards** → show the team-level dashboard
5. **Navigate to Boards** → **Sprints** → select Sprint 2 → **Capacity** tab
6. **Show capacity details**: each team member has hours/day set, days-off configured
7. **Point out the capacity bar**: if over-allocated, it shows red; green means the sprint is balanced
8. **Talking point**: *"Portfolio Delivery has the cross-project views. Each team project has its own team-level dashboards. Power BI bridges both with Analytics Views — we'll see that after the break."*

#### Key Points to Emphasize

- Portfolio Delivery = portfolio-level dashboards; team projects = team-level dashboards
- Capacity planning prevents sprint overcommitment
- Power BI with Analytics Views fills the gap for deep analytics

---

### Demo 5: Power BI Analytics Report (Section 5)

**Objective**: Show Analytics Views in ADO and the pre-built Power BI report for cross-project portfolio analytics.
**Duration**: 8 min

#### Setup Before Demo

- [ ] Analytics View "Portfolio — All Projects" created in **Portfolio Delivery** project (includes all 3 delivery projects, Epics + Features + User Stories)
- [ ] Power BI Desktop installed with the .pbix report pre-built and data refreshed
- [ ] Report pages: Story Points by State, Velocity by Sprint, User Stories by State, Story Points by Area
- [ ] Row-level security configured with "Digital Products" and "Internal Ops" roles

#### Step-by-Step Script

1. **Open Portfolio Delivery** → **Boards** → **Analytics views**
2. **Show the "Portfolio — All Projects" view** → walk through the configuration:
   - Projects selected: Customer Portal, API Platform, Employee Hub
   - Work item types: Epic, Feature, User Story
   - Fields: Title, State, Story Points, Iteration Path, Area Path, Assigned To, Changed Date
   - History: Last 30 days
3. **Talking point**: *"An Analytics View is a curated OData feed. You decide which projects, work item types, and fields to expose. ADO pre-aggregates the data so Power BI gets clean, fast queries."*
4. **Switch to Power BI Desktop** → open the pre-built report
5. **Show the data connection**: Get Data → Azure DevOps → select the Analytics View
6. **Page 1: Story Points by State** → stacked bar chart showing Story Points across Closed/Active/Resolved/New per project
7. **Talking point**: *"This breaks down where your story points sit right now — how much is closed, in progress, or still ahead — stacked by project so you can compare at a glance."*
8. **Page 2: Velocity by Sprint** → clustered column chart: story points per sprint per project
9. **Talking point**: *"Velocity per project lets you spot which teams are accelerating and which might need help. The portfolio lead can see trends without drilling into individual sprints."*
10. **Page 3: User Stories by State** → donut chart: distribution of user story states across the portfolio
11. **Talking point**: *"A quick health check — what percentage of stories are closed vs. still active or new. Click a slice to filter the whole report."*
12. **Show a DAX measure** in the formula bar:

    ```dax
    % Complete =
    DIVIDE(
        CALCULATE(SUM('Work Items'[Story Points]), 'Work Items'[State] = "Closed"),
        SUM('Work Items'[Story Points]),
        0
    )
    ```

13. **Page 4: Story Points by Area** → treemap showing story point allocation across projects and area paths
14. **Talking point**: *"This shows where your investment is going — which projects and areas have the most story points. It highlights imbalances at a glance."*
15. **Show row-level security**: Modeling tab → Manage Roles → "Digital Products" filters to Customer Portal + API Platform projects only
16. **Talking point**: *"When you publish this to Power BI Service, row-level security ensures portfolio leads only see their own projects. Finance sees everything."*
17. **Discuss publishing**: Power BI Service → schedule daily refresh → embed as a Teams tab for stakeholder access

#### Key Points to Emphasize

- Analytics Views are the bridge between ADO and Power BI — no raw OData queries needed
- The pre-built report takes about a day to set up; after that it refreshes automatically
- Row-level security makes one report serve multiple audiences
- This is the true portfolio view that spans all projects — Delivery Plans show the roadmap, Power BI shows the analytics

---

### Demo 6: Power Automate — Planner ↔ ADO (Section 6)

**Objective**: Show bi-directional sync between Microsoft Planner and ADO using Power Automate.
**Duration**: 4 min

#### Setup Before Demo

- [ ] Microsoft Planner plan: "Business Milestones" with buckets "Q3 Deliverables" and "Q4 Deliverables"
- [ ] Power Automate flow 1: "When a Planner task is created → Create ADO Work Item (Epic) in Customer Portal"
- [ ] Power Automate flow 2: "When an ADO work item state changes → Update Planner task"
- [ ] Both flows tested and active

#### Step-by-Step Script

1. **Open Power Automate** → **My Flows** → show the two pre-built flows
2. **Open flow 1**: "Planner Task Created → ADO Epic" → walk through the steps:
   - Trigger: When a task is created in "Business Milestones" plan
   - Action: Create Work Item in Azure DevOps — type: Epic, Project: Customer Portal
   - Field mappings: Title from Planner task title, Due Date from Planner due date
   - Final action: Update Planner task notes with ADO work item ID (for reverse linking)
3. **Talking point**: *"The key is storing the ADO work item ID in the Planner task notes. That's how the reverse flow knows which item to update."*
4. **Switch to Microsoft Planner** → create a new task in "Q3 Deliverables" bucket: "Mobile App Beta Launch"
5. **Wait 10–15 seconds** → switch to ADO Customer Portal → navigate to Backlogs → Epics
6. **Show the new Epic** "Mobile App Beta Launch" that was auto-created by the flow
7. **Show flow 2**: "ADO State Change → Planner Update" → explain the reverse direction
8. **Talking point**: *"Business stakeholders manage milestones in Planner. Engineering teams work in ADO. Power Automate keeps them in sync automatically."*

#### Key Points to Emphasize

- Standard Power Automate licensing covers both ADO and Planner connectors — no Premium required
- The shared identifier pattern (ADO ID in Planner notes) enables reliable bi-directional sync
- Start simple: sync title, status, and due date; add more fields later as needed

#### Backup Plan

If Power Automate is unavailable:

1. Show screenshots of the flow designer and field mappings
2. Walk through the flow logic verbally using the workshop slide
3. Show the ADO and Planner connectors in the Power Automate documentation

---

### Demo 7: UAT with Test Plans (Section 7)

**Objective**: Walk through the full UAT lifecycle — creating a test plan, executing tests, and logging bugs from failures.
**Duration**: 5 min

#### Setup Before Demo

- [ ] Test Plan "Q3 Customer Portal UAT" created in Customer Portal project
- [ ] Test Suite "User Login Workflows" with 2–3 test cases pre-authored
- [ ] At least one test case with 4–5 steps and expected results filled in

#### Step-by-Step Script

1. **Open Customer Portal** → **Test Plans** → show "Q3 Customer Portal UAT"
2. **Show the test plan structure**: Test Suite "User Login Workflows" → 3 test cases listed
3. **Open a test case**: "Verify password reset sends email" → show the step-by-step format:
   - Step 1: Navigate to login page → Expected: Login page loads
   - Step 2: Click "Forgot Password" → Expected: Password reset form appears
   - Step 3: Enter email and submit → Expected: Confirmation message shown
   - Step 4: Check email inbox → Expected: Reset email received within 2 minutes
4. **Talking point**: *"Test cases are defined by QA or BAs. Business users run them — they get a simple web-based test runner. No tooling to install."*
5. **Click "Run"** on the test case → the web test runner opens
6. **Mark Steps 1–3 as Pass** → click the green check for each
7. **Mark Step 4 as Fail** → click the red X
8. **Click "Create Bug"** from the failed step → show the bug form:
   - Title auto-populated: "Verify password reset sends email — Step 4 failed"
   - Repro steps auto-attached (all 4 steps with pass/fail status)
   - System info captured automatically
9. **Talking point**: *"The bug auto-attaches everything — repro steps, expected vs. actual, system info. The developer gets a complete bug report without the tester writing a novel."*
10. **Go back to the Test Plan** → show the progress chart: 1 passed, 1 failed, 1 not yet run

#### Key Points to Emphasize

- Business users get a simple, guided test execution experience — no ADO expertise needed
- Bugs from failed steps auto-attach repro context — massive time saver
- Test Plan charts give PMs real-time UAT progress visibility
- Requires Basic + Test Plans license for test execution (consider temporary assignment during UAT sprints)

#### Backup Plan

If Test Plans are not licensed in the demo environment:

1. Walk through the Test Plans UI using screenshots
2. Show the test case editor and explain the step/expected-result format
3. Reference the Azure Test Plans documentation

---

### Demo 8: Jira Concept Walkthrough (Section 8)

**Objective**: Walk through the Jira → ADO mapping table with live ADO examples for each concept.
**Duration**: 3 min

#### Setup Before Demo

- [ ] The Jira → ADO mapping table from Section 8 displayed on a slide or handout
- [ ] ADO open to Customer Portal project (to show live examples of each concept)

#### Step-by-Step Script

1. **Display the mapping table** from the slide deck (or share screen with the workshop doc Section 8)
2. **Walk through key rows**, showing the ADO equivalent live:
   - "Jira Boards → ADO Boards" → switch to Customer Portal → Boards → show the kanban board
   - "JQL → WIQL" → navigate to Boards → Queries → show a Shared Query → point out the query editor
   - "Components → Area Paths" → show Customer Portal Area Paths (Authentication, Dashboard)
   - "Confluence → Wiki" → navigate to Overview → Wiki → show the project wiki
3. **Talking point**: *"The concepts map almost 1:1. The biggest differences are terminology and the fact that ADO bundles things like Delivery Plans, Test Plans, and Wiki that Jira charges extra for."*
4. **Briefly mention integration tools**: "If some teams stay on Jira, Exalate or Getint handle bi-directional sync. For ServiceNow, Power Automate connectors handle incidents and change requests."
5. **Talking point**: *"We have the full mapping table as a handout for your team. The key takeaway: nothing you do in Jira lacks an ADO equivalent."*

#### Key Points to Emphasize

- ADO and Jira are conceptually similar — the learning curve is about terminology, not fundamentals
- ADO bundles portfolio roadmaps, test management, and wiki — Jira requires paid add-ons
- Coexistence is possible with third-party sync tools if migration is gradual

---

*Workshop materials prepared for Azure DevOps Work Management training*
