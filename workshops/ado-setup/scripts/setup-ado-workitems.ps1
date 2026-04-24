param(
    [string]$OrgUrl = "https://dev.azure.com/tpitest"
)

$ErrorActionPreference = "Stop"

$token = az account get-access-token --resource "499b84ac-1321-427f-aa17-267ca6975798" --query accessToken -o tsv
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
$patchHeaders = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json-patch+json" }

# ============================================================
# PHASE 1: Delete all existing work items in delivery projects
# ============================================================
Write-Host "=== PHASE 1: Cleaning Existing Work Items ===" -ForegroundColor Cyan

$wiql = @{
    query = "SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] IN ('Customer Portal', 'API Platform', 'Employee Hub') ORDER BY [System.Id]"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri "$OrgUrl/_apis/wit/wiql?api-version=7.0" -Headers $headers -Method Post -Body $wiql
$ids = @($result.workItems | ForEach-Object { $_.id })
Write-Host "  Found $($ids.Count) work items to delete" -ForegroundColor Gray

if ($ids.Count -gt 0) {
    foreach ($id in $ids) {
        try {
            $null = Invoke-RestMethod -Uri "$OrgUrl/_apis/wit/workitems/$($id)?destroy=true&api-version=7.0" -Headers $headers -Method Delete
        } catch {
            Write-Host "  Warning: Could not delete #$id" -ForegroundColor Yellow
        }
    }
    Write-Host "  Deleted $($ids.Count) work items" -ForegroundColor Green
} else {
    Write-Host "  No existing items to clean" -ForegroundColor Yellow
}

# ============================================================
# PHASE 2: Create enhanced work items with realistic states
# ============================================================
Write-Host "`n=== PHASE 2: Creating Enhanced Work Items ===" -ForegroundColor Cyan

function New-WorkItem {
    param(
        [string]$Project,
        [string]$Type,
        [string]$Title,
        [string]$IterPath,
        [string]$AreaPath,
        [string]$State = $null,
        [int]$StoryPoints = 0,
        [double]$RemainingWork = 0,
        [double]$CompletedWork = 0,
        [string]$AssignedTo = $null,
        [hashtable[]]$Fields = @(),
        [int]$ParentId = 0
    )

    $ops = @(
        @{ op = "add"; path = "/fields/System.Title"; value = $Title }
    )
    if ($IterPath) { $ops += @{ op = "add"; path = "/fields/System.IterationPath"; value = $IterPath } }
    if ($AreaPath) { $ops += @{ op = "add"; path = "/fields/System.AreaPath"; value = $AreaPath } }
    if ($StoryPoints -gt 0) { $ops += @{ op = "add"; path = "/fields/Microsoft.VSTS.Scheduling.StoryPoints"; value = $StoryPoints } }
    if ($RemainingWork -gt 0) { $ops += @{ op = "add"; path = "/fields/Microsoft.VSTS.Scheduling.RemainingWork"; value = $RemainingWork } }
    if ($CompletedWork -gt 0) { $ops += @{ op = "add"; path = "/fields/Microsoft.VSTS.Scheduling.CompletedWork"; value = $CompletedWork } }
    if ($AssignedTo) { $ops += @{ op = "add"; path = "/fields/System.AssignedTo"; value = $AssignedTo } }
    foreach ($f in $Fields) { $ops += @{ op = "add"; path = "/fields/$($f.name)"; value = $f.value } }
    if ($ParentId -gt 0) {
        $ops += @{ op = "add"; path = "/relations/-"; value = @{ rel = "System.LinkTypes.Hierarchy-Reverse"; url = "$OrgUrl/_apis/wit/workitems/$ParentId" } }
    }

    $body = $ops | ConvertTo-Json -Depth 5
    $encodedType = [Uri]::EscapeDataString($Type)
    $encodedProject = [Uri]::EscapeDataString($Project)
    $wi = Invoke-RestMethod -Uri "$OrgUrl/$encodedProject/_apis/wit/workitems/`$$encodedType`?api-version=7.0" -Headers $patchHeaders -Method Post -Body $body

    if ($State -and $State -ne "New") {
        $stateOps = @( @{ op = "add"; path = "/fields/System.State"; value = $State } )
        $stateBody = ConvertTo-Json -InputObject @($stateOps) -Depth 5
        $wi = Invoke-RestMethod -Uri "$OrgUrl/_apis/wit/workitems/$($wi.id)?api-version=7.0" -Headers $patchHeaders -Method Patch -Body $stateBody
    }

    Write-Host "    $Type #$($wi.id): $Title [$($wi.fields.'System.State')]" -ForegroundColor Green
    return $wi.id
}

$tom = "tom@tpi-test.com"

# ============================================================
# CUSTOMER PORTAL — 1 Epic, 2 Features, 8 Stories, 6 Tasks, 2 Bugs
# ============================================================
Write-Host "`n  Customer Portal..." -ForegroundColor Gray

$cpEpic = New-WorkItem -Project "Customer Portal" -Type "Epic" -Title "Portal Redesign FY26" `
    -IterPath "Customer Portal\FY26" -AreaPath "Customer Portal" -State "Active" `
    -Fields @(
        @{ name = "Custom.Portfolio"; value = "Digital Products" },
        @{ name = "Custom.BusinessPriority"; value = "High" }
    )

$cpFeat1 = New-WorkItem -Project "Customer Portal" -Type "Feature" -Title "User Authentication Overhaul" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpEpic -State "Active" `
    -Fields @(@{ name = "Custom.BusinessPriority"; value = "High" })

$cpFeat2 = New-WorkItem -Project "Customer Portal" -Type "Feature" -Title "Dashboard Analytics Module" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Dashboard" -ParentId $cpEpic -State "Active" `
    -Fields @(@{ name = "Custom.BusinessPriority"; value = "Medium" })

# Sprint 1 — CLOSED
$cpS1 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a user, I can reset my password via email" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpFeat1 `
    -StoryPoints 5 -State "Closed" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Passed" })

$cpS2 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a user, I can view my account security settings" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpFeat1 `
    -StoryPoints 3 -State "Closed" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Passed" })

$null = New-WorkItem -Project "Customer Portal" -Type "Task" -Title "Implement password reset API endpoint" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS1 `
    -RemainingWork 0 -CompletedWork 8 -State "Closed" -AssignedTo $tom

$null = New-WorkItem -Project "Customer Portal" -Type "Task" -Title "Write integration tests for password reset" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS1 `
    -RemainingWork 0 -CompletedWork 4 -State "Closed" -AssignedTo $tom

$null = New-WorkItem -Project "Customer Portal" -Type "Task" -Title "Design email template for password reset" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS1 `
    -RemainingWork 0 -CompletedWork 3 -State "Closed" -AssignedTo $tom

# Sprint 2 — ACTIVE / RESOLVED
$cpS3 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a user, I can enable 2FA on my account" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpFeat1 `
    -StoryPoints 8 -State "Active" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$cpS4 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a user, I can view my login history" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpFeat1 `
    -StoryPoints 3 -State "Resolved" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "In Progress" })

$cpS5 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a PM, I can see real-time usage charts" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Dashboard" -ParentId $cpFeat2 `
    -StoryPoints 5 -State "Active" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$cpS6 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a PM, I can filter dashboard by date range" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Dashboard" -ParentId $cpFeat2 `
    -StoryPoints 3 -State "Resolved" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "In Progress" })

$null = New-WorkItem -Project "Customer Portal" -Type "Task" -Title "Build 2FA enrollment UI" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpS3 `
    -RemainingWork 6 -CompletedWork 4 -State "Active" -AssignedTo $tom

$null = New-WorkItem -Project "Customer Portal" -Type "Task" -Title "Integrate TOTP library for 2FA" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpS3 `
    -RemainingWork 4 -CompletedWork 0 -State "New" -AssignedTo $tom

# Sprint 3 — NEW
$cpS7 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a PM, I can export dashboard data to CSV" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 3" -AreaPath "Customer Portal\Dashboard" -ParentId $cpFeat2 `
    -StoryPoints 3 -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$cpS8 = New-WorkItem -Project "Customer Portal" -Type "User Story" -Title "As a user, I can manage trusted devices for 2FA" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 3" -AreaPath "Customer Portal\Authentication" -ParentId $cpFeat1 `
    -StoryPoints 5 -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

# BUGS
$null = New-WorkItem -Project "Customer Portal" -Type "Bug" -Title "Password reset email contains broken link on mobile" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" `
    -State "Active" -AssignedTo $tom `
    -Fields @(@{ name = "Microsoft.VSTS.Common.Priority"; value = 2 })

$null = New-WorkItem -Project "Customer Portal" -Type "Bug" -Title "Login history shows UTC timestamps instead of local time" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" `
    -State "New" -Fields @(@{ name = "Microsoft.VSTS.Common.Priority"; value = 3 })

# ============================================================
# API PLATFORM — 1 Epic, 2 Features, 6 Stories, 4 Tasks, 1 Bug
# ============================================================
Write-Host "`n  API Platform..." -ForegroundColor Gray

$apEpic = New-WorkItem -Project "API Platform" -Type "Epic" -Title "API Gateway Modernization" `
    -IterPath "API Platform\FY26" -AreaPath "API Platform" -State "Active" `
    -Fields @(
        @{ name = "Custom.Portfolio"; value = "Digital Products" },
        @{ name = "Custom.BusinessPriority"; value = "High" }
    )

$apFeat1 = New-WorkItem -Project "API Platform" -Type "Feature" -Title "Rate Limiting & Throttling" `
    -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apEpic -State "Active" `
    -Fields @(@{ name = "Custom.BusinessPriority"; value = "High" })

$apFeat2 = New-WorkItem -Project "API Platform" -Type "Feature" -Title "Developer Portal Refresh" `
    -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Developer Portal" -ParentId $apEpic -State "Active" `
    -Fields @(@{ name = "Custom.BusinessPriority"; value = "Medium" })

# Sprint 1 — CLOSED
$apS1 = New-WorkItem -Project "API Platform" -Type "User Story" -Title "As an API consumer, I get throttled at 1000 req/min" `
    -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apFeat1 `
    -StoryPoints 8 -State "Closed" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Passed" })

$apS2 = New-WorkItem -Project "API Platform" -Type "User Story" -Title "As an admin, I can view rate limit metrics" `
    -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apFeat1 `
    -StoryPoints 5 -State "Closed" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Passed" })

$null = New-WorkItem -Project "API Platform" -Type "Task" -Title "Implement sliding window rate limiter" `
    -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apS1 `
    -RemainingWork 0 -CompletedWork 12 -State "Closed" -AssignedTo $tom

$null = New-WorkItem -Project "API Platform" -Type "Task" -Title "Add rate limit headers to API responses" `
    -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apS1 `
    -RemainingWork 0 -CompletedWork 4 -State "Closed" -AssignedTo $tom

# Sprint 2 — ACTIVE / RESOLVED
$apS3 = New-WorkItem -Project "API Platform" -Type "User Story" -Title "As an admin, I can configure rate limits per API key" `
    -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Rate Limiting" -ParentId $apFeat1 `
    -StoryPoints 5 -State "Active" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$apS4 = New-WorkItem -Project "API Platform" -Type "User Story" -Title "As a developer, I can view API docs in the new portal" `
    -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Developer Portal" -ParentId $apFeat2 `
    -StoryPoints 5 -State "Resolved" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "In Progress" })

$null = New-WorkItem -Project "API Platform" -Type "Task" -Title "Build API key management admin UI" `
    -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Rate Limiting" -ParentId $apS3 `
    -RemainingWork 8 -CompletedWork 4 -State "Active" -AssignedTo $tom

$null = New-WorkItem -Project "API Platform" -Type "Task" -Title "Write OpenAPI spec renderer for dev portal" `
    -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Developer Portal" -ParentId $apS4 `
    -RemainingWork 2 -CompletedWork 10 -State "Active" -AssignedTo $tom

# Sprint 3 — NEW
$apS5 = New-WorkItem -Project "API Platform" -Type "User Story" -Title "As a developer, I can try API calls from the portal" `
    -IterPath "API Platform\FY26\Q3\Sprint 3" -AreaPath "API Platform\Developer Portal" -ParentId $apFeat2 `
    -StoryPoints 8 -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$apS6 = New-WorkItem -Project "API Platform" -Type "User Story" -Title "As an admin, I can set burst limits per endpoint" `
    -IterPath "API Platform\FY26\Q3\Sprint 3" -AreaPath "API Platform\Rate Limiting" -ParentId $apFeat1 `
    -StoryPoints 5 -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$null = New-WorkItem -Project "API Platform" -Type "Bug" -Title "Rate limiter returns 500 instead of 429 when Redis is unavailable" `
    -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Rate Limiting" `
    -State "Active" -AssignedTo $tom `
    -Fields @(@{ name = "Microsoft.VSTS.Common.Priority"; value = 1 })

# ============================================================
# EMPLOYEE HUB — 1 Epic, 2 Features, 6 Stories, 4 Tasks, 1 Bug
# ============================================================
Write-Host "`n  Employee Hub..." -ForegroundColor Gray

$ehEpic = New-WorkItem -Project "Employee Hub" -Type "Epic" -Title "Employee Onboarding Automation" `
    -IterPath "Employee Hub\FY26" -AreaPath "Employee Hub" -State "Active" `
    -Fields @(
        @{ name = "Custom.Portfolio"; value = "Internal Ops" },
        @{ name = "Custom.BusinessPriority"; value = "Medium" }
    )

$ehFeat1 = New-WorkItem -Project "Employee Hub" -Type "Feature" -Title "Self-Service Benefits Enrollment" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Benefits" -ParentId $ehEpic -State "Active" `
    -Fields @(@{ name = "Custom.BusinessPriority"; value = "Medium" })

$ehFeat2 = New-WorkItem -Project "Employee Hub" -Type "Feature" -Title "Automated IT Provisioning" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Onboarding" -ParentId $ehEpic -State "Active" `
    -Fields @(@{ name = "Custom.BusinessPriority"; value = "High" })

# Sprint 1 — CLOSED
$ehS1 = New-WorkItem -Project "Employee Hub" -Type "User Story" -Title "As a new hire, I can select my benefits plan online" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Benefits" -ParentId $ehFeat1 `
    -StoryPoints 8 -State "Closed" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Passed" })

$ehS2 = New-WorkItem -Project "Employee Hub" -Type "User Story" -Title "As a new hire, I can upload my ID documents" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Onboarding" -ParentId $ehFeat2 `
    -StoryPoints 5 -State "Closed" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Passed" })

$null = New-WorkItem -Project "Employee Hub" -Type "Task" -Title "Build benefits plan selection UI" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Benefits" -ParentId $ehS1 `
    -RemainingWork 0 -CompletedWork 10 -State "Closed" -AssignedTo $tom

$null = New-WorkItem -Project "Employee Hub" -Type "Task" -Title "Integrate with benefits provider API" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Benefits" -ParentId $ehS1 `
    -RemainingWork 0 -CompletedWork 8 -State "Closed" -AssignedTo $tom

# Sprint 2 — ACTIVE
$ehS3 = New-WorkItem -Project "Employee Hub" -Type "User Story" -Title "As HR, I can review pending benefit elections" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Benefits" -ParentId $ehFeat1 `
    -StoryPoints 5 -State "Active" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$ehS4 = New-WorkItem -Project "Employee Hub" -Type "User Story" -Title "As IT, new hire accounts are auto-provisioned from HR data" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Onboarding" -ParentId $ehFeat2 `
    -StoryPoints 13 -State "Active" -AssignedTo $tom `
    -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$null = New-WorkItem -Project "Employee Hub" -Type "Task" -Title "Build HR review queue UI" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Benefits" -ParentId $ehS3 `
    -RemainingWork 6 -CompletedWork 2 -State "Active" -AssignedTo $tom

$null = New-WorkItem -Project "Employee Hub" -Type "Task" -Title "Build Active Directory provisioning integration" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS4 `
    -RemainingWork 12 -CompletedWork 4 -State "Active" -AssignedTo $tom

# Sprint 3 — NEW
$ehS5 = New-WorkItem -Project "Employee Hub" -Type "User Story" -Title "As HR, I can generate onboarding status reports" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 3" -AreaPath "Employee Hub\Onboarding" -ParentId $ehFeat2 `
    -StoryPoints 5 -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$ehS6 = New-WorkItem -Project "Employee Hub" -Type "User Story" -Title "As a new hire, I can view my onboarding checklist" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 3" -AreaPath "Employee Hub\Onboarding" -ParentId $ehFeat2 `
    -StoryPoints 3 -Fields @(@{ name = "Custom.UATStatus"; value = "Not Started" })

$null = New-WorkItem -Project "Employee Hub" -Type "Bug" -Title "Benefits enrollment form loses data when browser tab is backgrounded" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Benefits" `
    -State "New" -Fields @(@{ name = "Microsoft.VSTS.Common.Priority"; value = 2 })

# ============================================================
# SUMMARY
# ============================================================
Write-Host "`n=== ENHANCED WORK ITEMS COMPLETE ===" -ForegroundColor Green
Write-Host "  Customer Portal: 1 Epic, 2 Features, 8 Stories, 5 Tasks, 2 Bugs = 18 items"
Write-Host "  API Platform:    1 Epic, 2 Features, 6 Stories, 4 Tasks, 1 Bug  = 14 items"
Write-Host "  Employee Hub:    1 Epic, 2 Features, 6 Stories, 4 Tasks, 1 Bug  = 14 items"
Write-Host "  Total: 46 work items"
Write-Host ""
Write-Host "State distribution:" -ForegroundColor Cyan
Write-Host "  Closed (Sprint 1):     6 Stories + 7 Tasks"
Write-Host "  Active (Sprint 2):     5 Stories + 5 Tasks + 2 Bugs"
Write-Host "  Resolved (Sprint 2):   3 Stories"
Write-Host "  New (Sprint 3+):       6 Stories + 1 Task + 2 Bugs"
Write-Host "  Epics/Features:        3 Epics (Active) + 6 Features (Active)"
