param(
    [Parameter(Mandatory = $true)]
    [string]$OrgUrl,  # e.g. "https://dev.azure.com/contoso"

    [string]$OutputPath = ".\lifecycle-review-report.json",

    [switch]$EnforceArchive  # If set, actually archives non-compliant projects
)

<#
.SYNOPSIS
    Reviews all ADO projects against the lifecycle model and flags non-compliant projects.

.DESCRIPTION
    Implements the Annual Review mechanism by:
    1. Identifying projects in each lifecycle state
    2. Flagging Provisioned projects that have exceeded the 30-day activation window
    3. Identifying Active projects due for annual review
    4. Flagging Archived projects eligible for Retirement (12+ months)
    5. Optionally archiving non-compliant projects (with -EnforceArchive)

    Uses project description metadata to track lifecycle state (stored as JSON tag
    in the project description until a proper metadata store is implemented).

.PARAMETER OrgUrl
    The Azure DevOps organisation URL.

.PARAMETER OutputPath
    Path for the JSON report. Defaults to .\lifecycle-review-report.json

.PARAMETER EnforceArchive
    If set, projects flagged for archiving will be disabled (set to "disabled" state).
    Without this flag, the script only reports — it does not make changes.

.EXAMPLE
    # Report only
    .\review-lifecycle.ps1 -OrgUrl "https://dev.azure.com/contoso"

    # Report and enforce archiving
    .\review-lifecycle.ps1 -OrgUrl "https://dev.azure.com/contoso" -EnforceArchive

.NOTES
    Lifecycle states are tracked via a JSON tag in project descriptions:
    [governance:{"state":"Active","since":"2026-01-15","lastReview":"2026-01-15"}]

    Projects without this tag are classified as "Unmanaged" (pre-governance brownfield).
#>

$ErrorActionPreference = "Stop"

# ============================================================
# AUTH
# ============================================================
Write-Host "`n=== ADO Lifecycle Review ===" -ForegroundColor Cyan
Write-Host "Organisation: $OrgUrl"
Write-Host "Mode:         $(if ($EnforceArchive) { 'ENFORCE' } else { 'REPORT ONLY' })"
Write-Host "Date:         $(Get-Date -Format 'yyyy-MM-dd')`n"

$token = az account get-access-token --resource "499b84ac-1321-427f-aa17-267ca6975798" --query accessToken -o tsv
if (-not $token) {
    Write-Host "ERROR: Could not get access token. Run 'az login' first." -ForegroundColor Red
    exit 1
}
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

# ============================================================
# FUNCTIONS
# ============================================================

function Get-GovernanceTag {
    param([string]$Description)
    if ($Description -match '\[governance:({.*?})\]') {
        return $Matches[1] | ConvertFrom-Json
    }
    return $null
}

function Set-GovernanceTag {
    param(
        [string]$OrgUrl,
        [string]$ProjectId,
        [string]$CurrentDescription,
        [hashtable]$State,
        [hashtable]$Headers
    )
    $tag = "[governance:$($State | ConvertTo-Json -Compress)]"
    $cleanDesc = $CurrentDescription -replace '\[governance:\{.*?\}\]', ''
    $newDesc = "$($cleanDesc.Trim()) $tag"

    $body = @{ description = $newDesc } | ConvertTo-Json
    Invoke-RestMethod -Uri "$OrgUrl/_apis/projects/${ProjectId}?api-version=7.0" `
        -Headers $Headers -Method Patch -Body $body | Out-Null
}

# ============================================================
# SCAN ALL PROJECTS
# ============================================================
Write-Host "=== Scanning Projects ===" -ForegroundColor Cyan

$projects = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects?api-version=7.0&`$top=500" -Headers $headers
$today = Get-Date

$results = @{
    unmanaged          = @()
    provisioned        = @()
    provisionedOverdue = @()
    active             = @()
    activeNeedsReview  = @()
    archived           = @()
    archivedEligible   = @()
    retired            = @()
}

foreach ($proj in $projects.value) {
    $tag = Get-GovernanceTag -Description $proj.description

    if (-not $tag) {
        # Pre-governance project — no lifecycle tag
        $results.unmanaged += @{
            name       = $proj.name
            id         = $proj.id
            lastUpdate = $proj.lastUpdateTime
            note       = "No governance tag. Brownfield — voluntary alignment."
        }
        Write-Host "  $($proj.name): Unmanaged (no governance tag)" -ForegroundColor Gray
        continue
    }

    $stateDate = [datetime]::Parse($tag.since)
    $daysSince = ($today - $stateDate).Days

    switch ($tag.state) {
        "Provisioned" {
            if ($daysSince -gt 30) {
                $results.provisionedOverdue += @{
                    name          = $proj.name
                    id            = $proj.id
                    provisionedOn = $tag.since
                    daysOverdue   = $daysSince - 30
                    action        = "Should be Archived (exceeded 30-day activation window)"
                }
                Write-Host "  $($proj.name): Provisioned — OVERDUE ($daysSince days)" -ForegroundColor Red
            } else {
                $results.provisioned += @{
                    name          = $proj.name
                    id            = $proj.id
                    provisionedOn = $tag.since
                    daysRemaining = 30 - $daysSince
                }
                Write-Host "  $($proj.name): Provisioned ($( 30 - $daysSince) days remaining)" -ForegroundColor Yellow
            }
        }
        "Active" {
            $lastReview = if ($tag.lastReview) { [datetime]::Parse($tag.lastReview) } else { $stateDate }
            $daysSinceReview = ($today - $lastReview).Days

            if ($daysSinceReview -gt 365) {
                $results.activeNeedsReview += @{
                    name            = $proj.name
                    id              = $proj.id
                    activeSince     = $tag.since
                    lastReview      = $tag.lastReview
                    daysSinceReview = $daysSinceReview
                    action          = "Annual review overdue — $daysSinceReview days since last review"
                }
                Write-Host "  $($proj.name): Active — REVIEW OVERDUE ($daysSinceReview days)" -ForegroundColor Red
            } else {
                $results.active += @{
                    name            = $proj.name
                    id              = $proj.id
                    activeSince     = $tag.since
                    lastReview      = $tag.lastReview
                    nextReviewIn    = 365 - $daysSinceReview
                }
                Write-Host "  $($proj.name): Active (review in $(365 - $daysSinceReview) days)" -ForegroundColor Green
            }
        }
        "Archived" {
            if ($daysSince -gt 365) {
                $results.archivedEligible += @{
                    name        = $proj.name
                    id          = $proj.id
                    archivedOn  = $tag.since
                    daysArchived = $daysSince
                    action      = "Eligible for Retirement (12+ months archived). Requires Sponsor approval."
                }
                Write-Host "  $($proj.name): Archived — ELIGIBLE FOR RETIREMENT ($daysSince days)" -ForegroundColor Magenta
            } else {
                $results.archived += @{
                    name         = $proj.name
                    id           = $proj.id
                    archivedOn   = $tag.since
                    daysArchived = $daysSince
                    retirementIn = 365 - $daysSince
                }
                Write-Host "  $($proj.name): Archived (retirement eligible in $(365 - $daysSince) days)" -ForegroundColor DarkGray
            }
        }
        "Retired" {
            $results.retired += @{
                name      = $proj.name
                id        = $proj.id
                retiredOn = $tag.since
            }
            Write-Host "  $($proj.name): Retired" -ForegroundColor DarkGray
        }
    }
}

# ============================================================
# ENFORCE ARCHIVING (if flag set)
# ============================================================
if ($EnforceArchive -and $results.provisionedOverdue.Count -gt 0) {
    Write-Host "`n=== Enforcing Archive for Overdue Provisioned Projects ===" -ForegroundColor Yellow

    foreach ($p in $results.provisionedOverdue) {
        Write-Host "  Archiving: $($p.name)..." -ForegroundColor Yellow

        # Update lifecycle tag
        $proj = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects/$($p.id)?api-version=7.0" -Headers $headers
        Set-GovernanceTag -OrgUrl $OrgUrl -ProjectId $p.id -CurrentDescription $proj.description `
            -State @{ state = "Archived"; since = (Get-Date -Format 'yyyy-MM-dd') } -Headers $headers

        Write-Host "  Archived: $($p.name)" -ForegroundColor Green
    }
}

# ============================================================
# REPORT
# ============================================================
$report = @{
    metadata = @{
        organisation = $OrgUrl
        reviewDate   = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
        reviewedBy   = (az account show --query user.name -o tsv)
        enforced     = [bool]$EnforceArchive
    }
    summary = @{
        totalProjects    = $projects.count
        unmanaged        = $results.unmanaged.Count
        provisioned      = $results.provisioned.Count
        provisionedOverdue = $results.provisionedOverdue.Count
        active           = $results.active.Count
        activeNeedsReview = $results.activeNeedsReview.Count
        archived         = $results.archived.Count
        archivedEligible = $results.archivedEligible.Count
        retired          = $results.retired.Count
    }
    details = $results
}

$report | ConvertTo-Json -Depth 5 | Out-File -FilePath $OutputPath -Encoding utf8

Write-Host "`n=== Lifecycle Review Summary ===" -ForegroundColor Green
Write-Host "  ┌────────────────────────────────────────────────┐"
Write-Host "  │ Total Projects:        $($projects.count)"
Write-Host "  │ Unmanaged (brownfield): $($results.unmanaged.Count)"
Write-Host "  │ Provisioned:           $($results.provisioned.Count)  (overdue: $($results.provisionedOverdue.Count))"
Write-Host "  │ Active:                $($results.active.Count)  (review due: $($results.activeNeedsReview.Count))"
Write-Host "  │ Archived:              $($results.archived.Count)  (retirement eligible: $($results.archivedEligible.Count))"
Write-Host "  │ Retired:               $($results.retired.Count)"
Write-Host "  └────────────────────────────────────────────────┘"
Write-Host "  Report: $OutputPath`n"

if ($results.provisionedOverdue.Count -gt 0 -and -not $EnforceArchive) {
    Write-Host "  ACTION REQUIRED: $($results.provisionedOverdue.Count) overdue Provisioned project(s)." -ForegroundColor Red
    Write-Host "  Run with -EnforceArchive to auto-archive, or resolve manually.`n" -ForegroundColor Yellow
}

if ($results.activeNeedsReview.Count -gt 0) {
    Write-Host "  ACTION REQUIRED: $($results.activeNeedsReview.Count) Active project(s) need annual review." -ForegroundColor Red
    Write-Host "  Notify owners. Non-compliance after 30 days triggers auto-archive.`n" -ForegroundColor Yellow
}

if ($results.archivedEligible.Count -gt 0) {
    Write-Host "  INFO: $($results.archivedEligible.Count) Archived project(s) eligible for Retirement." -ForegroundColor Magenta
    Write-Host "  Present to Sponsor for approval.`n" -ForegroundColor Yellow
}
