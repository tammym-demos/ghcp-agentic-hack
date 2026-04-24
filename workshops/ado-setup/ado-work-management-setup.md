# Azure DevOps Work Management — Demo Environment Setup Guide

**Purpose**: Step-by-step instructions for building the ADO demo environment used in the Azure DevOps Work Management Workshop. Covers both automated setup (PowerShell scripts) and manual configuration (Delivery Plans, Analytics Views, dashboards, Power BI, Test Plans).

**Target audience**: Workshop instructor (pre-workshop setup) and customer administrators (replicating the structure in their own organization).

**Demo environment**: `dev.azure.com/tpitest/`

---

## Table of Contents

| Step | What | Method | Time |
|---|---|---|---|
| 1 | Create inherited process template | Script: `setup-ado-process.ps1` | 2 min |
| 2 | Create team projects | Script: `setup-ado-projects.ps1` | 3 min |
| 3 | Create sample work items | Script: `setup-ado-workitems.ps1` | 2 min |
| 4 | Create cross-project Delivery Plan | Manual (ADO UI) | 5 min |
| 5 | Configure portfolio dashboards | Manual (ADO UI) | 10 min |
| 6 | Create Analytics View | Manual (ADO UI) | 5 min |
| 7 | Build Power BI portfolio report | Manual (Power BI Desktop) | 30 min |
| 8 | Create Test Plan for UAT demo | Manual (ADO UI) | 10 min |
| 9 | Set up Microsoft Planner integration | Manual (Power Automate) | 15 min |
| 10 | Verification checklist | Manual | 5 min |

---

## Prerequisites

| Requirement | Details |
|---|---|
| **Azure DevOps Organization** | An ADO org you have admin access to (e.g., `dev.azure.com/tpitest/`) |
| **Azure CLI** | Installed with the `azure-devops` extension (`az extension add --name azure-devops`) |
| **Azure AD login** | Authenticated via `az login` with an account that has ADO org admin rights |
| **Power BI Desktop** | Installed on your machine (for Step 7) |
| **Power Automate** | Access to Power Automate with standard ADO + Planner connectors (for Step 9) |
| **Microsoft Planner** | A Planner plan available in your M365 tenant (for Step 9) |

---

## Step 1: Create Inherited Process Template (Scripted)

**Script**: `workshops/ado-setup/scripts/setup-ado-process.ps1`

This creates an inherited process called **"Agile - Portfolio"** based on the stock Agile template, with four custom additions:

| Custom Addition | Work Item Type | Values |
|---|---|---|
| **Portfolio** field (picklist) | Epic | Digital Products, Internal Ops |
| **Business Priority** field (picklist) | Epic, Feature | High, Medium, Low |
| **UAT Status** field (picklist) | User Story | Not Started, In Progress, Passed, Failed |
| **UAT** workflow state | User Story | Added between Resolved and Closed |

### Run the script

```powershell
az login --tenant <your-tenant>
.\workshops\ado-setup\scripts\setup-ado-process.ps1 -OrgUrl "https://dev.azure.com/tpitest"
```

### What the script does

1. Creates three **picklists** at the org level (Portfolio, Business Priority, UAT Status)
2. Creates three **org-level fields** referencing those picklists
3. Creates an **inherited process** named "Agile - Portfolio" from the Agile base
4. **Derives** Epic, Feature, and User Story work item types in the inherited process
5. **Adds** the custom fields to the derived work item types:
   - Portfolio → Epic
   - Business Priority → Epic + Feature
   - UAT Status → User Story
6. Adds a **UAT state** to the User Story workflow (InProgress category, between Resolved and Closed)

### Verify

After running, you should see:

```
Custom fields on Epic: 2
  - Portfolio (Custom.Portfolio)
  - Business Priority (Custom.BusinessPriority)
Custom fields on Feature: 1
  - Business Priority (Custom.BusinessPriority)
Custom fields on User Story: 1
  - UAT Status (Custom.UATStatus)

User Story workflow states:
  New (Proposed)
  Active (InProgress)
  Resolved (InProgress)
  UAT (InProgress)
  Closed (Completed)
  Removed (Removed)
```

> **Note**: The process ID output by the script (e.g., `f08fd53e-ac08-4f6f-b368-e597635e36f8`) is needed for Step 2. The script passes it automatically if run in sequence.

---

## Step 2: Create Team Projects (Scripted)

**Script**: `workshops/ado-setup/scripts/setup-ado-projects.ps1`

This creates four projects, teams, iteration paths, and area paths.

### Run the script

```powershell
.\workshops\ado-setup\scripts\setup-ado-projects.ps1 -OrgUrl "https://dev.azure.com/tpitest" -ProcessId "<process-id-from-step-1>"
```

### What the script creates

**Projects** (all using the Agile - Portfolio process):

| Project | Purpose |
|---|---|
| **Portfolio Delivery** | Hub — Delivery Plans, Analytics Views, dashboards, wiki |
| **Customer Portal** | Delivery stream — Digital Products portfolio |
| **API Platform** | Delivery stream — Digital Products portfolio |
| **Employee Hub** | Delivery stream — Internal Ops portfolio |

**Teams** (in delivery projects only):

| Project | Teams |
|---|---|
| Customer Portal | Portal Dev |
| API Platform | API Engineering |
| Employee Hub | Internal Apps |

**Iteration Paths** (same in all 4 projects):

```
FY26
├── Q3
│   ├── Sprint 1 (Mar 2–13)
│   ├── Sprint 2 (Mar 16–27)
│   └── Sprint 3 (Mar 30–Apr 10)
└── Q4
    ├── Sprint 4 (Apr 13–24)
    ├── Sprint 5 (Apr 27–May 8)
    └── Sprint 6 (May 11–22)
```

**Area Paths** (per delivery project):

| Project | Area Paths |
|---|---|
| Customer Portal | Authentication, Dashboard, User Profile |
| API Platform | Gateway, Rate Limiting, Developer Portal |
| Employee Hub | Onboarding, Benefits, Directory |

**Team settings**: Each team gets a default backlog iteration (FY26) and current iteration (Sprint 2).

---

## Step 3: Create Sample Work Items (Scripted)

**Script**: `workshops/ado-setup/scripts/setup-ado-workitems.ps1`

This creates a full hierarchy of work items with parent-child links, custom field values, **varied states** (Closed, Active, Resolved, New), **bugs**, **remaining work on tasks**, and **assigned-to** values for a realistic demo.

The script is **idempotent** — it deletes all existing work items in the delivery projects before creating new ones, so you can re-run safely to reset the demo.

### Run the script

```powershell
.\workshops\ado-setup\scripts\setup-ado-workitems.ps1 -OrgUrl "https://dev.azure.com/tpitest"
```

### What the script creates

**Customer Portal** (18 items):

| Type | Title | Parent | Sprint | State | Story Points |
|---|---|---|---|---|---|
| Epic | Portal Redesign FY26 | — | FY26 | Active | — |
| Feature | User Authentication Overhaul | Epic | Q3 | Active | — |
| Feature | Dashboard Analytics Module | Epic | Q3 | Active | — |
| User Story | As a user, I can reset my password via email | Feature 1 | Sprint 1 | **Closed** | 5 |
| User Story | As a user, I can view my account security settings | Feature 1 | Sprint 1 | **Closed** | 3 |
| Task | Implement password reset API endpoint | Story 1 | Sprint 1 | **Closed** | — |
| Task | Write integration tests for password reset | Story 1 | Sprint 1 | **Closed** | — |
| Task | Design email template for password reset | Story 1 | Sprint 1 | **Closed** | — |
| User Story | As a user, I can enable 2FA on my account | Feature 1 | Sprint 2 | Active | 8 |
| User Story | As a user, I can view my login history | Feature 1 | Sprint 2 | **Resolved** | 3 |
| User Story | As a PM, I can see real-time usage charts | Feature 2 | Sprint 2 | Active | 5 |
| User Story | As a PM, I can filter dashboard by date range | Feature 2 | Sprint 2 | **Resolved** | 3 |
| Task | Build 2FA enrollment UI | Story 3 | Sprint 2 | Active | — |
| Task | Integrate TOTP library for 2FA | Story 3 | Sprint 2 | New | — |
| User Story | As a PM, I can export dashboard data to CSV | Feature 2 | Sprint 3 | New | 3 |
| User Story | As a user, I can manage trusted devices for 2FA | Feature 1 | Sprint 3 | New | 5 |
| Bug | Password reset email contains broken link on mobile | — | Sprint 2 | Active | — |
| Bug | Login history shows UTC timestamps instead of local time | — | Sprint 2 | New | — |

**API Platform** (14 items):

| Type | Title | Parent | Sprint | State | Story Points |
|---|---|---|---|---|---|
| Epic | API Gateway Modernization | — | FY26 | Active | — |
| Feature | Rate Limiting & Throttling | Epic | Q3 | Active | — |
| Feature | Developer Portal Refresh | Epic | Q3 | Active | — |
| User Story | As an API consumer, I get throttled at 1000 req/min | Feature 1 | Sprint 1 | **Closed** | 8 |
| User Story | As an admin, I can view rate limit metrics | Feature 1 | Sprint 1 | **Closed** | 5 |
| Task | Implement sliding window rate limiter | Story 1 | Sprint 1 | **Closed** | — |
| Task | Add rate limit headers to API responses | Story 1 | Sprint 1 | **Closed** | — |
| User Story | As an admin, I can configure rate limits per API key | Feature 1 | Sprint 2 | Active | 5 |
| User Story | As a developer, I can view API docs in the new portal | Feature 2 | Sprint 2 | **Resolved** | 5 |
| Task | Build API key management admin UI | Story 3 | Sprint 2 | Active | — |
| Task | Write OpenAPI spec renderer for dev portal | Story 4 | Sprint 2 | Active | — |
| User Story | As a developer, I can try API calls from the portal | Feature 2 | Sprint 3 | New | 8 |
| User Story | As an admin, I can set burst limits per endpoint | Feature 1 | Sprint 3 | New | 5 |
| Bug | Rate limiter returns 500 instead of 429 when Redis is unavailable | — | Sprint 2 | Active | — |

**Employee Hub** (14 items):

| Type | Title | Parent | Sprint | State | Story Points |
|---|---|---|---|---|---|
| Epic | Employee Onboarding Automation | — | FY26 | Active | — |
| Feature | Self-Service Benefits Enrollment | Epic | Q3 | Active | — |
| Feature | Automated IT Provisioning | Epic | Q3 | Active | — |
| User Story | As a new hire, I can select my benefits plan online | Feature 1 | Sprint 1 | **Closed** | 8 |
| User Story | As a new hire, I can upload my ID documents | Feature 2 | Sprint 1 | **Closed** | 5 |
| Task | Build benefits plan selection UI | Story 1 | Sprint 1 | **Closed** | — |
| Task | Integrate with benefits provider API | Story 1 | Sprint 1 | **Closed** | — |
| User Story | As HR, I can review pending benefit elections | Feature 1 | Sprint 2 | Active | 5 |
| User Story | As IT, new hire accounts are auto-provisioned from HR data | Feature 2 | Sprint 2 | Active | 13 |
| Task | Build HR review queue UI | Story 3 | Sprint 2 | Active | — |
| Task | Build Active Directory provisioning integration | Story 4 | Sprint 2 | Active | — |
| User Story | As HR, I can generate onboarding status reports | Feature 2 | Sprint 3 | New | 5 |
| User Story | As a new hire, I can view my onboarding checklist | Feature 2 | Sprint 3 | New | 3 |
| Bug | Benefits enrollment form loses data when browser tab is backgrounded | — | Sprint 2 | New | — |

**Custom fields set on all items**:

- Epics: `Portfolio` = "Digital Products" or "Internal Ops", `Business Priority` = "High" or "Medium"
- Features: `Business Priority` = "High" or "Medium"
- User Stories: `UAT Status` = Passed (Sprint 1 closed), In Progress (Sprint 2 resolved), Not Started (others)
- Tasks (Sprint 2): `Remaining Work` and `Completed Work` set for capacity/burndown demos
- Bugs: `Priority` = 1, 2, or 3
- All Sprint 1–2 items: `Assigned To` = `tom@tpi-test.com`

**Totals**: 3 Epics, 6 Features, 20 User Stories, 14 Tasks, 4 Bugs = **46 work items**

**State distribution**:

| State | Sprint | Items |
|---|---|---|
| **Closed** | Sprint 1 | 6 Stories + 7 Tasks |
| **Active** | Sprint 2 | 5 Stories + 5 Tasks + 2 Bugs |
| **Resolved** | Sprint 2 | 3 Stories |
| **New** | Sprint 3 | 6 Stories + 1 Task + 2 Bugs |
| **Active** | FY26/Q3 | 3 Epics + 6 Features |

---

## Step 4: Create Cross-Project Delivery Plan (Manual)

Delivery Plans must be created in the ADO UI — the API doesn't support plan creation.

### Steps

1. Navigate to `dev.azure.com/tpitest/Portfolio Delivery`
2. Click **Boards** → **Delivery Plans** → **+ New Plan**
3. **Name**: `Digital Portfolio Roadmap`
4. **Add backlog rows** (click "Add team" for each):

   | Project | Team | Backlog Level |
   |---|---|---|
   | Customer Portal | Portal Dev | Features |
   | API Platform | API Engineering | Features |
   | Employee Hub | Internal Apps | Features |

5. Click **Create**
6. The plan opens showing all four team backlogs on a timeline

### Add a milestone

1. In the Delivery Plan, click **Settings**
2. Go to the **Markers** tab
3. Click **+ Add marker**
4. **Label**: `Q3 Business Review`
5. **Date**: April 13, 2026
6. **Color**: Blue
7. Click **Save**
8. The milestone appears as a diamond marker on the timeline

### Add a dependency

ADO Delivery Plans visualize work items linked with the **Predecessor/Successor** link type. Create the link on either work item — the Delivery Plan renders it automatically.

1. Navigate to `API Platform` → **Boards** → **Backlogs**

   > **Note**: Make sure to switch the team selector to **API Engineering** (not "API Platform Team"). The default team has no backlog configured — only the named teams created by the setup script have area paths and iterations assigned.
2. Open the Feature "Rate Limiting & Throttling"
3. Click the **🔗 Related Work** tab (or **Links** tab)
4. Click **Add link** → **Existing item**
5. **Link type**: Select **Successor**
6. In the search box, type "User Authentication Overhaul" and select it from Customer Portal
7. Click **Add Link** → **Save & Close**
8. Return to the Delivery Plan in Portfolio Delivery
9. Click the **top or bottom edge** of either the "Rate Limiting" or "User Auth Overhaul" card — a dependency line appears connecting the two cards across team rows
10. Click the card edge again (or click elsewhere) to hide the line

> **Note**: If the dependency has a scheduling conflict (successor scheduled before predecessor), the line appears **red** and the card shows a red dependency icon. If there's no conflict, the line is **black** and the icon is **green**. See [Track dependencies in Delivery Plans](https://learn.microsoft.com/en-us/azure/devops/boards/plans/track-dependencies) for details.

### Verify

The Delivery Plan should show:

- 3 rows (one per team) across 3 projects
- Feature cards plotted on the Sprint 1–3 timeline
- A "Q3 Business Review" milestone marker on Apr 13
- Green dependency icons on the "Rate Limiting" and "User Auth Overhaul" cards (click a card edge to see the connecting line)

---

## Step 5: Configure Portfolio Dashboards (Manual)

Create two dashboards: one in Portfolio Delivery (cross-project) and one in Customer Portal (team-level).

### Portfolio Dashboard (in Portfolio Delivery)

1. Navigate to `dev.azure.com/tpitest/Portfolio Delivery`
2. Click **Overview** → **Dashboards** → **+ New Dashboard**
3. **Name**: `Portfolio Overview`
4. **Team**: Portfolio Delivery Team (default)
5. Click **Create**

**Add widgets** (click **Edit** → **+ Add Widget** for each):

| Widget Type | Configuration |
|---|---|
| **Query Results** | Create a cross-project query: Work Item Type = Epic, State <> Removed. Title: "All Epics" |
| **Chart for Work Items** | Create a query: Work Item Type IN (Epic, Feature, User Story), grouped by Project. Chart type: Pie. Title: "Work Items by Project" |
| **Query Results** | Query: Work Item Type = Feature, State = Active, sorted by Business Priority. Title: "Active Features" |
| **Markdown** | Add a text widget with: "Portfolio Delivery Hub — Digital Products + Internal Ops" |

> **Note**: ADO's built-in dashboard widgets are scoped to the current project by default. For true cross-project burndown and velocity, use Power BI (Step 7). The dashboard here provides quick links and query-based views.

### Team Dashboard (in Customer Portal)

1. Navigate to `dev.azure.com/tpitest/Customer Portal`
2. Click **Overview** → **Dashboards** → **+ New Dashboard**
3. **Name**: `Portal Dev Sprint Dashboard`
4. **Team**: Portal Dev
5. Click **Create**

**Add widgets**:

| Widget Type | Configuration |
|---|---|
| **Sprint Burndown** | Team: Portal Dev, Sprint: Sprint 1 (current) |
| **Velocity** | Team: Portal Dev, last 3 iterations |
| **Cumulative Flow Diagram** | Team: Portal Dev, last 30 days |
| **New Work Item** | Type: User Story (quick-create widget) |
| **Work Links** | Links to Board, Backlog, Sprint views |

> **Note**: The sprint dates are set so that Sprint 1 is the current sprint when running the scripts. If you set up the demo environment well in advance and the sprint dates have passed, use the **Burndown** widget (Analytics section) instead of Sprint Burndown — it lets you specify a custom date range.

6. Click **Done Editing**

---

## Step 6: Create Analytics View (Manual)

Analytics Views are the bridge between ADO and Power BI. Create this in the Portfolio Delivery project.

### Steps

1. Navigate to `dev.azure.com/tpitest/Portfolio Delivery`
2. In the left sidebar, click **Boards** → **Analytics views**
3. Click **+ New view**

### Configure the view

**General tab**:

- **Name**: `Portfolio — All Projects`
- **Description**: Cross-project view for Power BI portfolio reporting

**Work Items tab**:

| Setting | Value |
|---|---|
| **Teams** | Customer Portal (All teams), API Platform (All teams), Employee Hub (All teams) |
| **Work items** | Epic, Feature, User Story (add each individually from the dropdown) |
| **Field criteria** | State <> Removed |

**Fields tab** — select these fields:

- System fields: Title, Work Item Type, State, Created Date, Changed Date, Closed Date, Area Path, Iteration Path, Assigned To, Tags
- Agile fields: Story Points
- Custom fields: Portfolio, Business Priority, UAT Status
- Parent: Include parent work item ID (for hierarchy rollup in Power BI)

**History tab**:

- Select **Rolling period: Last 30 days**
- This gives Power BI trend data for burndown charts

**Verification tab**:

- Click **Verify** — ADO previews the estimated row count
- You should see ~800–900 rows (29 Epics/Features/Stories × 30 days of history snapshots)
- Click **Save**

### Make it shared

1. After saving, click the **⋮** menu on the view
2. Click **Edit**
3. Change sharing to **Shared** (so other Power BI users can connect to it)
4. Click **Save**

---

## Step 7: Build Power BI Portfolio Report (Manual)

### Connect Power BI Desktop to the Analytics View

1. Open **Power BI Desktop** (download from <https://powerbi.microsoft.com/desktop> if not installed)
2. On the Home screen, click **Get data from another source** (or from the ribbon: **Home** → **Get Data** → **More...**)
3. In the "Get Data" dialog, type `Azure DevOps` in the search box
4. Select **Azure DevOps (Boards only)** from the results → click **Connect**
5. In the connection dialog, enter **Organization URL**: `https://dev.azure.com/tpitest` → click **OK**
6. If prompted to authenticate, select **Organizational account** → click **Sign in** → log in with your Azure AD credentials → click **Connect**
7. The **Navigator** pane opens showing your ADO projects. Expand **Portfolio Delivery** → check the box next to **Portfolio — All Projects** (the Analytics View you created in Step 6)
8. Click **Load** (not "Transform Data") — Power BI imports the data into a table called "Work Items"
9. Wait for the data to load — you should see ~870 rows in the status bar at the bottom

### Create report pages

Each page is a separate tab at the bottom of Power BI Desktop. Click **+** next to the existing "Page 1" tab to add new pages.

> **Note**: The burndown trend chart (Page 1) requires multiple days of Analytics history to show a trend line. If you just created the work items today, the burndown will only show a single data point. Set up the demo environment at least 3–5 days before the workshop so ADO accumulates daily snapshots. Pages 2–4 work immediately.

**Page 1: Story Points by State (Portfolio Overview)**

1. With the blank canvas visible, go to the **Visualizations** pane on the right
2. Click the **Stacked Bar Chart** icon
3. From the **Data** pane (far right), drag these fields:
   - Drag `State` → drop on **Y-axis**
   - Drag `Story Points` → drop on **X-axis** (it auto-sums)
   - Drag `Area Path` → drop on **Legend**
4. In the **Filters** pane, drag `Work Item Type` to **Filters on this visual** → select only **User Story**
5. Also filter out `Is Current` = True (if that field exists) to show only current snapshot, not historical duplicates
6. Double-click the chart title to rename it: "Story Points by State — All Projects"

> **Note**: This shows the current breakdown of story points across Closed/Active/Resolved/New per project — works immediately without historical data.

**Page 2: Story Points by Iteration (Velocity)**

1. Click **+** at the bottom to add a new page → double-click the tab to rename it "Velocity"
2. Click the **Clustered Column Chart** icon in the Visualizations pane
3. From the Data pane:
   - Drag `Iteration Path` → drop on **X-axis**
   - Drag `Story Points` → drop on **Y-axis**
   - Drag `Area Path` → drop on **Legend**
4. In the Filters pane, drag `Work Item Type` → select only **User Story**
5. Filter `Is Current` = True (if available)
6. Rename the title: "Story Points by Sprint — All Projects"

**Page 3: Work Items by State (Donut Chart)**

1. Click **+** → rename page "Status Overview"
2. Click the **Donut Chart** icon in the Visualizations pane
3. From the Data pane:
   - Drag `State` → drop on **Legend**
   - Drag `Work Item Id` → drop on **Values** (it auto-counts)
4. Filter `Is Current` = True and `Work Item Type` = User Story
5. Rename the title: "User Stories by State"

**Page 4: Story Points by Area Path (Treemap)**

1. Click **+** → rename page "By Project"
2. Click the **Treemap** icon in the Visualizations pane
3. From the Data pane:
   - Drag `Area Path` → drop on **Category**
   - Drag `Story Points` → drop on **Values**
4. Filter `Is Current` = True and `Work Item Type` = User Story
5. Rename the title: "Story Points Distribution by Project & Area"

> **Note**: These four pages use simple, immediate-data visuals that work on day one. For a true time-series burndown, set up the environment a few days in advance so the Analytics View accumulates daily history snapshots.

### Key DAX measures

DAX measures are custom calculations. To create one:

1. Click the **Modeling** tab in the top ribbon
2. Click **New Measure**
3. A formula bar appears — type the measure formula and press **Enter**
4. The measure appears in the Data pane under the table

Create these four measures:

```dax
% Complete =
DIVIDE(
    CALCULATE(SUM('Work Items'[Story Points]), 'Work Items'[State] = "Closed"),
    SUM('Work Items'[Story Points]),
    0
)
```

```dax
Cross-Project Total =
CALCULATE(
    SUM('Work Items'[Story Points]),
    ALL('Work Items'[Project])
)
```

```dax
Sprint Velocity =
CALCULATE(
    SUM('Work Items'[Story Points]),
    'Work Items'[State] = "Closed"
)
```

```dax
Aging Days =
IF(
    'Work Items'[State] <> "Closed" && 'Work Items'[State] <> "Removed",
    DATEDIFF('Work Items'[Created Date], TODAY(), DAY),
    BLANK()
)
```

### Configure row-level security

1. Go to **Modeling** tab → **Manage Roles**
2. Create role: **Digital Products**
   - Table: `Work Items`
   - Filter: `[Project] = "Customer Portal" || [Project] = "API Platform"`
3. Create role: **Internal Ops**
   - Table: `Work Items`
   - Filter: `[Project] = "Employee Hub"`
4. Create role: **Executive** (no filter — sees all data)
5. Click **Save**

### Test RLS

1. Go to **Modeling** tab → **View as Roles**
2. Select "Digital Products" → verify only Customer Portal and API Platform data shows
3. Select "Internal Ops" → verify only Employee Hub data shows

### Publish to Power BI Service

1. Click **File** → **Publish** → select a Power BI workspace
2. After publishing, go to the workspace in Power BI Service (`app.powerbi.com`)
3. Click the **dataset** → **Settings** → **Scheduled refresh** → set to daily
4. Click **Security** → assign users to the Digital Products, Internal Ops, and Executive roles

### Embed in Microsoft Teams (optional)

1. In a Teams channel, click **+** → **Power BI** → select the published report
2. Portfolio leads can access the report directly from their Teams tab

---

## Step 8: Create Test Plan for UAT Demo (Manual)

### Create the Test Plan

1. Navigate to `dev.azure.com/tpitest/Customer Portal`
2. Click **Test Plans** → **+ New Test Plan**
3. **Name**: `Q3 Customer Portal UAT`
4. **Area Path**: Customer Portal
5. **Iteration**: Customer Portal\FY26\Q3
6. Click **Create**

### Add a Test Suite

1. In the Test Plan, right-click the root suite → **New suite** → **Static suite**
2. **Name**: `User Login Workflows`

### Author Test Cases

**Test Case 1: Verify password reset sends email**

1. Click **+ New Test Case** in the "User Login Workflows" suite
2. **Title**: `Verify password reset sends email`
3. Add steps:

   | # | Action | Expected Result |
   |---|---|---|
   | 1 | Navigate to the login page at `https://portal.example.com/login` | Login page loads with "Forgot Password" link visible |
   | 2 | Click "Forgot Password" | Password reset form appears with email field |
   | 3 | Enter `testuser@example.com` and click Submit | Confirmation message: "Password reset email sent" |
   | 4 | Check email inbox for `testuser@example.com` | Reset email received within 2 minutes with a valid reset link |

4. Click **Save & Close**

**Test Case 2: Verify 2FA enrollment**

1. Click **+ New Test Case**
2. **Title**: `Verify 2FA enrollment flow`
3. Add steps:

   | # | Action | Expected Result |
   |---|---|---|
   | 1 | Log in to the portal with valid credentials | Dashboard loads successfully |
   | 2 | Navigate to Settings → Security → Two-Factor Authentication | 2FA setup page appears |
   | 3 | Click "Enable 2FA" and select "Authenticator App" | QR code displayed for scanning |
   | 4 | Scan QR code with authenticator app, enter the 6-digit code | 2FA enabled confirmation message shown |

4. Click **Save & Close**

**Test Case 3: Verify login history display**

1. Click **+ New Test Case**
2. **Title**: `Verify login history is visible`
3. Add steps:

   | # | Action | Expected Result |
   |---|---|---|
   | 1 | Log in to the portal with valid credentials | Dashboard loads successfully |
   | 2 | Navigate to Settings → Security → Login History | Login history table appears |
   | 3 | Verify the table shows date, time, IP address, and device columns | All four columns present with at least the current session |

4. Click **Save & Close**

### Link test suite to requirements (optional)

1. In the Test Plan, right-click "User Login Workflows" suite
2. Select **Requirement based suite** → search for Feature "User Authentication Overhaul"
3. This links test coverage to the Feature for traceability reporting

---

## Step 9: Set Up Microsoft Planner Integration (Manual)

### Create the Planner plan

1. Open **Microsoft Planner** (planner.cloud.microsoft)
2. Click **+ New Plan**
3. **Name**: `Business Milestones`
4. **Group**: Select an existing M365 group or create one
5. Create two **buckets**: `Q3 Deliverables` and `Q4 Deliverables`
6. Add a sample task in "Q3 Deliverables": **Title**: "Launch Customer Portal Redesign", **Due date**: Apr 10, 2026

### Build Power Automate flow 1: Planner → ADO

1. Open **Power Automate** (make.powerautomate.com)
2. Click **+ Create** → **Automated cloud flow**
3. **Name**: `Planner Task Created → ADO Epic`
4. **Trigger**: Planner → **When a new task is created**
   - Group: your M365 group
   - Plan: "Business Milestones"

5. **Add action**: Azure DevOps → **Create a work item**
   - Organization: `tpitest`
   - Project: `Customer Portal`
   - Work Item Type: `Epic`
   - Title: `@{triggerOutputs()?['body/title']}`
   - (Optional) Description: `Created from Planner task. Planner task ID: @{triggerOutputs()?['body/id']}`

6. **Add action**: Planner → **Update a task**
   - Task ID: `@{triggerOutputs()?['body/id']}`
   - Notes/Description: `ADO Work Item: #@{outputs('Create_a_work_item')?['body/id']} — https://dev.azure.com/tpitest/Customer Portal/_workitems/edit/@{outputs('Create_a_work_item')?['body/id']}`

7. Click **Save** → **Test** with a sample Planner task

### Build Power Automate flow 2: ADO → Planner

1. Click **+ Create** → **Automated cloud flow**
2. **Name**: `ADO Epic Closed → Planner Task Complete`
3. **Trigger**: Azure DevOps → **When a work item is updated**
   - Organization: `tpitest`
   - Project: `Customer Portal`
   - Type: `Epic`

4. **Add condition**: `State` is equal to `Closed`

5. **If yes** → **Add action**: Planner → **Update a task**
   - You'll need to find the corresponding Planner task — parse the Description field for the Planner task ID, or use a "List tasks" action filtered by title

6. Set **Percent complete**: `100`

7. Click **Save**

> **Note**: The reverse flow (ADO → Planner) is more complex because you need to look up the Planner task. For the demo, it's sufficient to show the flow designer and explain the logic — you don't need it to work end-to-end live. Flow 1 (Planner → ADO) is the live demo trigger.

### Verify flow 1

1. Go to Microsoft Planner → "Business Milestones" plan → "Q3 Deliverables" bucket
2. Create a new task: "Mobile App Beta Launch"
3. Wait 10–15 seconds
4. Navigate to `dev.azure.com/tpitest/Customer Portal` → Backlogs → Epics
5. Verify the new Epic "Mobile App Beta Launch" was created
6. Open the Planner task → verify the notes contain the ADO work item link

---

## Step 10: Verification Checklist

Run through this checklist before the workshop to confirm everything is working:

### Projects & Structure

- [ ] `dev.azure.com/tpitest/` shows 4 workshop projects: Portfolio Delivery, Customer Portal, API Platform, Employee Hub
- [ ] All 4 projects use the "Agile - Portfolio" process template
- [ ] Customer Portal has team: Portal Dev
- [ ] API Platform has team: API Engineering
- [ ] Employee Hub has team: Internal Apps
- [ ] All projects have identical Iteration Paths: FY26 → Q3 (Sprint 1–3) → Q4 (Sprint 4–6)

### Custom Process

- [ ] Open any Epic → verify "Portfolio" and "Business Priority" fields are visible
- [ ] Open any Feature → verify "Business Priority" field is visible
- [ ] Open any User Story → verify "UAT Status" field is visible
- [ ] Open a User Story board → verify "UAT" column appears between "Resolved" and "Closed"

### Work Items

- [ ] Customer Portal: 1 Epic, 2 Features, 8 User Stories, 5 Tasks, 2 Bugs (varied states)
- [ ] API Platform: 1 Epic, 2 Features, 6 User Stories, 4 Tasks, 1 Bug (varied states)
- [ ] Employee Hub: 1 Epic, 2 Features, 6 User Stories, 4 Tasks, 1 Bug (varied states)
- [ ] Epic rollup shows aggregated Story Points from closed + open items
- [ ] Sprint 1 items are Closed; Sprint 2 items are Active/Resolved; Sprint 3 items are New
- [ ] Bugs visible on boards and in cross-project queries
- [ ] Tasks show Remaining Work and Completed Work for capacity demos

### Delivery Plan

- [ ] Portfolio Delivery → Delivery Plans → "Digital Portfolio Roadmap" opens
- [ ] Plan shows 3 rows (Portal Dev, API Engineering, Internal Apps)
- [ ] Feature cards visible on the Sprint 1–3 timeline
- [ ] "Q3 Business Review" milestone marker visible on Apr 13
- [ ] Dependency line visible between Customer Portal and API Platform Features

### Dashboards

- [ ] Portfolio Delivery → Dashboards → "Portfolio Overview" loads with widgets
- [ ] Customer Portal → Dashboards → "Portal Dev Sprint Dashboard" shows burndown, velocity

### Analytics View & Power BI

- [ ] Portfolio Delivery → Project Settings → Analytics Views → "Portfolio — All Projects" exists
- [ ] Power BI Desktop opens the .pbix report without errors
- [ ] All 4 report pages render: Portfolio Burndown, Cross-Project Velocity, Feature Progress, Work Item Aging
- [ ] RLS: "Digital Products" role shows only Customer Portal + API Platform data

### Test Plans

- [ ] Customer Portal → Test Plans → "Q3 Customer Portal UAT" exists
- [ ] Test Suite "User Login Workflows" has 3 test cases
- [ ] At least one test case has step-by-step actions and expected results

### Planner Integration

- [ ] Power Automate → "Planner Task Created → ADO Epic" flow is active
- [ ] Creating a Planner task in "Business Milestones" creates an ADO Epic within 15 seconds
- [ ] The Planner task notes contain the ADO work item link

### Screen Sharing

- [ ] ADO (dev.azure.com/tpitest/) accessible and logged in
- [ ] Power BI Desktop open with the report loaded
- [ ] Power Automate open with flows visible
- [ ] Microsoft Planner open with "Business Milestones" plan
- [ ] All browser tabs pre-loaded for smooth demo transitions

---

## Teardown (Optional)

If you need to reset the demo environment after a workshop:

1. **Delete work items** created during live demos — or simply re-run the script: `.\workshops\ado-setup\scripts\setup-ado-workitems.ps1`
2. **Reset the Delivery Plan** — drag any moved Features back to their original sprints
3. **Reset Planner tasks** — delete any tasks created during the Planner demo
4. **Re-run scripts** to recreate a clean set of work items: `.\workshops\ado-setup\scripts\setup-ado-workitems.ps1`

To completely remove the demo environment:

```powershell
# Delete projects (irreversible — confirm before running)
az devops project delete --id <project-id> --org https://dev.azure.com/tpitest --yes
```

> **Important**: Deleting projects is irreversible. Only do this if you need to start from scratch.

---

## Script Reference

| Script | Purpose | Idempotent? |
|---|---|---|
| `workshops/ado-setup/scripts/setup-ado-process.ps1` | Create "Agile - Portfolio" inherited process with custom fields | Yes — skips existing fields/states |
| `workshops/ado-setup/scripts/setup-ado-projects.ps1` | Create 4 projects, teams, iterations, area paths | Yes — skips existing projects/teams |
| `workshops/ado-setup/scripts/setup-ado-workitems.ps1` | Create 46 work items with varied states, bugs, and assignments | Yes — deletes existing items before creating |

### Running all scripts in sequence

```powershell
# Authenticate
az login --tenant <your-tenant>

# 1. Process template
.\workshops\ado-setup\scripts\setup-ado-process.ps1 -OrgUrl "https://dev.azure.com/tpitest"

# 2. Projects, teams, iterations, area paths
.\workshops\ado-setup\scripts\setup-ado-projects.ps1 -OrgUrl "https://dev.azure.com/tpitest" -ProcessId "<id-from-step-1>"

# 3. Sample work items
.\workshops\ado-setup\scripts\setup-ado-workitems.ps1 -OrgUrl "https://dev.azure.com/tpitest"
```

Then complete Steps 4–9 manually in the ADO and Power BI UIs.

*Setup guide for Azure DevOps Work Management Workshop demo environment*
