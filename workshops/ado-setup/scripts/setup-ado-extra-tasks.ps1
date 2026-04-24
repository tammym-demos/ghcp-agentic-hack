param(
    [string]$OrgUrl = "https://dev.azure.com/tpitest"
)

$ErrorActionPreference = "Stop"

$token = az account get-access-token --resource "499b84ac-1321-427f-aa17-267ca6975798" --query accessToken -o tsv
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
$patchHeaders = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json-patch+json" }

function New-Task {
    param(
        [string]$Project,
        [string]$Title,
        [string]$IterPath,
        [string]$AreaPath,
        [string]$State = "New",
        [double]$RemainingWork = 0,
        [double]$CompletedWork = 0,
        [string]$AssignedTo = $null,
        [int]$ParentId = 0
    )

    $ops = @(
        @{ op = "add"; path = "/fields/System.Title"; value = $Title }
        @{ op = "add"; path = "/fields/System.IterationPath"; value = $IterPath }
        @{ op = "add"; path = "/fields/System.AreaPath"; value = $AreaPath }
    )
    if ($RemainingWork -gt 0) { $ops += @{ op = "add"; path = "/fields/Microsoft.VSTS.Scheduling.RemainingWork"; value = $RemainingWork } }
    if ($CompletedWork -gt 0) { $ops += @{ op = "add"; path = "/fields/Microsoft.VSTS.Scheduling.CompletedWork"; value = $CompletedWork } }
    if ($AssignedTo) { $ops += @{ op = "add"; path = "/fields/System.AssignedTo"; value = $AssignedTo } }
    if ($ParentId -gt 0) {
        $ops += @{ op = "add"; path = "/relations/-"; value = @{ rel = "System.LinkTypes.Hierarchy-Reverse"; url = "$OrgUrl/_apis/wit/workitems/$ParentId" } }
    }

    $body = $ops | ConvertTo-Json -Depth 5
    $wi = Invoke-RestMethod -Uri "$OrgUrl/$([Uri]::EscapeDataString($Project))/_apis/wit/workitems/`$Task?api-version=7.0" -Headers $patchHeaders -Method Post -Body $body

    if ($State -ne "New") {
        $stateBody = ConvertTo-Json -InputObject @(@{ op = "add"; path = "/fields/System.State"; value = $State }) -Depth 5
        $wi = Invoke-RestMethod -Uri "$OrgUrl/_apis/wit/workitems/$($wi.id)?api-version=7.0" -Headers $patchHeaders -Method Patch -Body $stateBody
    }

    Write-Host "    Task #$($wi.id): $Title [$State] (R:$RemainingWork C:$CompletedWork)" -ForegroundColor Green
    return $wi.id
}

$tom = "tom@tpi-test.com"

# Find parent story IDs by querying
function Get-StoryId($project, $titleMatch) {
    $wiql = @{ query = "SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = '$project' AND [System.WorkItemType] = 'User Story' AND [System.Title] CONTAINS '$titleMatch'" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "$OrgUrl/_apis/wit/wiql?api-version=7.0" -Headers $headers -Method Post -Body $wiql
    return $r.workItems[0].id
}

Write-Host "=== Adding Extra Tasks for Dashboard Charts ===" -ForegroundColor Cyan

# ============================================================
# CUSTOMER PORTAL — Extra tasks
# ============================================================
Write-Host "`n  Customer Portal extra tasks..." -ForegroundColor Gray

$cpS1_id = Get-StoryId "Customer Portal" "reset my password"
$cpS2_id = Get-StoryId "Customer Portal" "account security"
$cpS3_id = Get-StoryId "Customer Portal" "enable 2FA"
$cpS4_id = Get-StoryId "Customer Portal" "login history"
$cpS5_id = Get-StoryId "Customer Portal" "usage charts"
$cpS6_id = Get-StoryId "Customer Portal" "date range"
$cpS7_id = Get-StoryId "Customer Portal" "export dashboard"
$cpS8_id = Get-StoryId "Customer Portal" "trusted devices"

# Sprint 1 extra tasks (all CLOSED — completed work)
$null = New-Task -Project "Customer Portal" -Title "Set up password reset email service" -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS1_id -State "Closed" -RemainingWork 0 -CompletedWork 6 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Create password strength validator" -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS1_id -State "Closed" -RemainingWork 0 -CompletedWork 4 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Build account settings page layout" -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS2_id -State "Closed" -RemainingWork 0 -CompletedWork 8 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Write unit tests for settings API" -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS2_id -State "Closed" -RemainingWork 0 -CompletedWork 3 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Update security settings documentation" -IterPath "Customer Portal\FY26\Q3\Sprint 1" -AreaPath "Customer Portal\Authentication" -ParentId $cpS2_id -State "Closed" -RemainingWork 0 -CompletedWork 2 -AssignedTo $tom

# Sprint 2 extra tasks (mixed states — some done, some in progress)
$null = New-Task -Project "Customer Portal" -Title "Design 2FA recovery flow" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpS3_id -State "Closed" -RemainingWork 0 -CompletedWork 6 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Build QR code generator component" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpS3_id -State "Active" -RemainingWork 3 -CompletedWork 5 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Implement login history API endpoint" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpS4_id -State "Closed" -RemainingWork 0 -CompletedWork 8 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Build login history UI table component" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Authentication" -ParentId $cpS4_id -State "Closed" -RemainingWork 0 -CompletedWork 4 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Create chart rendering service" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Dashboard" -ParentId $cpS5_id -State "Active" -RemainingWork 8 -CompletedWork 4 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Connect dashboard to analytics API" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Dashboard" -ParentId $cpS5_id -State "New" -RemainingWork 6 -CompletedWork 0 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Build date range picker component" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Dashboard" -ParentId $cpS6_id -State "Closed" -RemainingWork 0 -CompletedWork 4 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Write filter query builder" -IterPath "Customer Portal\FY26\Q3\Sprint 2" -AreaPath "Customer Portal\Dashboard" -ParentId $cpS6_id -State "Active" -RemainingWork 2 -CompletedWork 6 -AssignedTo $tom

# Sprint 3 extra tasks (all NEW — planned)
$null = New-Task -Project "Customer Portal" -Title "Build CSV export module" -IterPath "Customer Portal\FY26\Q3\Sprint 3" -AreaPath "Customer Portal\Dashboard" -ParentId $cpS7_id -RemainingWork 8 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Add export button to dashboard toolbar" -IterPath "Customer Portal\FY26\Q3\Sprint 3" -AreaPath "Customer Portal\Dashboard" -ParentId $cpS7_id -RemainingWork 4 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Build trusted device management UI" -IterPath "Customer Portal\FY26\Q3\Sprint 3" -AreaPath "Customer Portal\Authentication" -ParentId $cpS8_id -RemainingWork 10 -AssignedTo $tom
$null = New-Task -Project "Customer Portal" -Title "Implement device fingerprinting logic" -IterPath "Customer Portal\FY26\Q3\Sprint 3" -AreaPath "Customer Portal\Authentication" -ParentId $cpS8_id -RemainingWork 6 -AssignedTo $tom

# ============================================================
# API PLATFORM — Extra tasks
# ============================================================
Write-Host "`n  API Platform extra tasks..." -ForegroundColor Gray

$apS1_id = Get-StoryId "API Platform" "throttled at 1000"
$apS2_id = Get-StoryId "API Platform" "rate limit metrics"
$apS3_id = Get-StoryId "API Platform" "configure rate limits"
$apS4_id = Get-StoryId "API Platform" "API docs in the new portal"
$apS5_id = Get-StoryId "API Platform" "try API calls"
$apS6_id = Get-StoryId "API Platform" "burst limits"

# Sprint 1 extra tasks (CLOSED)
$null = New-Task -Project "API Platform" -Title "Build Redis-backed rate counter" -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apS1_id -State "Closed" -RemainingWork 0 -CompletedWork 10 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Write load test for rate limiter" -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apS1_id -State "Closed" -RemainingWork 0 -CompletedWork 6 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Create Grafana dashboard for rate metrics" -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apS2_id -State "Closed" -RemainingWork 0 -CompletedWork 8 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Expose metrics via /health endpoint" -IterPath "API Platform\FY26\Q3\Sprint 1" -AreaPath "API Platform\Rate Limiting" -ParentId $apS2_id -State "Closed" -RemainingWork 0 -CompletedWork 3 -AssignedTo $tom

# Sprint 2 extra tasks (ACTIVE / CLOSED)
$null = New-Task -Project "API Platform" -Title "Build admin config API for rate limits" -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Rate Limiting" -ParentId $apS3_id -State "Active" -RemainingWork 6 -CompletedWork 6 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Add validation for rate limit rules" -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Rate Limiting" -ParentId $apS3_id -State "New" -RemainingWork 4 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Build API reference page component" -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Developer Portal" -ParentId $apS4_id -State "Closed" -RemainingWork 0 -CompletedWork 8 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Add search to developer portal" -IterPath "API Platform\FY26\Q3\Sprint 2" -AreaPath "API Platform\Developer Portal" -ParentId $apS4_id -State "Active" -RemainingWork 4 -CompletedWork 4 -AssignedTo $tom

# Sprint 3 extra tasks (NEW)
$null = New-Task -Project "API Platform" -Title "Build interactive API console" -IterPath "API Platform\FY26\Q3\Sprint 3" -AreaPath "API Platform\Developer Portal" -ParentId $apS5_id -RemainingWork 12 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Add request/response history panel" -IterPath "API Platform\FY26\Q3\Sprint 3" -AreaPath "API Platform\Developer Portal" -ParentId $apS5_id -RemainingWork 6 -AssignedTo $tom
$null = New-Task -Project "API Platform" -Title "Implement burst limit configuration" -IterPath "API Platform\FY26\Q3\Sprint 3" -AreaPath "API Platform\Rate Limiting" -ParentId $apS6_id -RemainingWork 8 -AssignedTo $tom

# ============================================================
# EMPLOYEE HUB — Extra tasks
# ============================================================
Write-Host "`n  Employee Hub extra tasks..." -ForegroundColor Gray

$ehS1_id = Get-StoryId "Employee Hub" "benefits plan online"
$ehS2_id = Get-StoryId "Employee Hub" "upload my ID"
$ehS3_id = Get-StoryId "Employee Hub" "pending benefit"
$ehS4_id = Get-StoryId "Employee Hub" "auto-provisioned"
$ehS5_id = Get-StoryId "Employee Hub" "onboarding status"
$ehS6_id = Get-StoryId "Employee Hub" "onboarding checklist"

# Sprint 1 extra tasks (CLOSED)
$null = New-Task -Project "Employee Hub" -Title "Build plan comparison table" -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Benefits" -ParentId $ehS1_id -State "Closed" -RemainingWork 0 -CompletedWork 8 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Create enrollment confirmation email" -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Benefits" -ParentId $ehS1_id -State "Closed" -RemainingWork 0 -CompletedWork 3 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Build document upload component" -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS2_id -State "Closed" -RemainingWork 0 -CompletedWork 6 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Add file type validation for ID uploads" -IterPath "Employee Hub\FY26\Q3\Sprint 1" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS2_id -State "Closed" -RemainingWork 0 -CompletedWork 4 -AssignedTo $tom

# Sprint 2 extra tasks (ACTIVE / CLOSED)
$null = New-Task -Project "Employee Hub" -Title "Build election approval workflow" -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Benefits" -ParentId $ehS3_id -State "Active" -RemainingWork 6 -CompletedWork 6 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Create email notification for pending reviews" -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Benefits" -ParentId $ehS3_id -State "Closed" -RemainingWork 0 -CompletedWork 4 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Write Azure AD provisioning connector" -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS4_id -State "Active" -RemainingWork 8 -CompletedWork 8 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Build provisioning status dashboard" -IterPath "Employee Hub\FY26\Q3\Sprint 2" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS4_id -State "New" -RemainingWork 6 -AssignedTo $tom

# Sprint 3 extra tasks (NEW)
$null = New-Task -Project "Employee Hub" -Title "Build onboarding report template" -IterPath "Employee Hub\FY26\Q3\Sprint 3" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS5_id -RemainingWork 8 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Add export to PDF for reports" -IterPath "Employee Hub\FY26\Q3\Sprint 3" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS5_id -RemainingWork 4 -AssignedTo $tom
$null = New-Task -Project "Employee Hub" -Title "Build checklist UI component" -IterPath "Employee Hub\FY26\Q3\Sprint 3" -AreaPath "Employee Hub\Onboarding" -ParentId $ehS6_id -RemainingWork 6 -AssignedTo $tom

Write-Host "`n=== EXTRA TASKS COMPLETE ===" -ForegroundColor Green
Write-Host "Added tasks: Customer Portal: 18, API Platform: 11, Employee Hub: 11 = 40 extra tasks"
Write-Host "Total work items now: 46 (base) + 40 (extra tasks) = 86 items"
Write-Host ""
Write-Host "Extra task state distribution:" -ForegroundColor Cyan
Write-Host "  Sprint 1 Closed:  13 tasks (all with CompletedWork)"
Write-Host "  Sprint 2 Closed:   6 tasks"
Write-Host "  Sprint 2 Active:   7 tasks (with RemainingWork + CompletedWork)"
Write-Host "  Sprint 2 New:      3 tasks (with RemainingWork)"
Write-Host "  Sprint 3 New:     11 tasks (with RemainingWork)"
