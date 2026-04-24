param(
    [Parameter(Mandatory = $true)]
    [string]$OrgUrl,  # e.g. "https://dev.azure.com/contoso"

    [string]$OutputPath = ".\ado-baseline-report.json"
)

<#
.SYNOPSIS
    Captures the five baseline metrics defined in the ADO Governance programme.

.DESCRIPTION
    Audits the ADO organisation and produces a structured report covering:
    1. Project inventory with ownership data
    2. Access pattern analysis (direct user vs group-based)
    3. Service connection governance review
    4. Lifecycle state assessment

    Run this in Week 1 to establish the programme baseline. Re-run monthly to track progress.

.PARAMETER OrgUrl
    The Azure DevOps organisation URL, e.g. "https://dev.azure.com/contoso"

.PARAMETER OutputPath
    Path for the JSON report output. Defaults to .\ado-baseline-report.json

.EXAMPLE
    .\audit-ado-baseline.ps1 -OrgUrl "https://dev.azure.com/contoso"

.NOTES
    Requires: Azure CLI authenticated with sufficient ADO permissions (Project Collection Admin recommended)
#>

$ErrorActionPreference = "Stop"

# ============================================================
# AUTH
# ============================================================
Write-Host "`n=== ADO Governance Baseline Audit ===" -ForegroundColor Cyan
Write-Host "Organisation: $OrgUrl"
Write-Host "Timestamp:    $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n"

$token = az account get-access-token --resource "499b84ac-1321-427f-aa17-267ca6975798" --query accessToken -o tsv
if (-not $token) {
    Write-Host "ERROR: Could not get access token. Run 'az login' first." -ForegroundColor Red
    exit 1
}
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

# ============================================================
# METRIC 1: Project Inventory & Ownership
# ============================================================
Write-Host "=== Metric 1: Project Inventory & Ownership ===" -ForegroundColor Cyan

$projects = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects?api-version=7.0&`$top=500" -Headers $headers
$projectData = @()
$noOwnerCount = 0
$singleOwnerCount = 0

foreach ($proj in $projects.value) {
    $projName = $proj.name
    Write-Host "  Scanning project: $projName" -ForegroundColor Gray

    # Get project properties (description, etc.)
    $projDetail = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects/$($proj.id)?api-version=7.0&includeCapabilities=true" -Headers $headers

    # Get project administrators group
    $admins = @()
    try {
        $groups = Invoke-RestMethod -Uri "https://vssps.dev.azure.com/$($OrgUrl.Split('/')[-1])/_apis/graph/groups?scopeDescriptor=$($proj.id)&api-version=7.0-preview.1" -Headers $headers -ErrorAction SilentlyContinue
        $adminGroup = $groups.value | Where-Object { $_.displayName -match "Project Administrators" }
        if ($adminGroup) {
            $members = Invoke-RestMethod -Uri "https://vssps.dev.azure.com/$($OrgUrl.Split('/')[-1])/_apis/graph/memberships/$($adminGroup.descriptor)?direction=down&api-version=7.0-preview.1" -Headers $headers -ErrorAction SilentlyContinue
            $admins = $members.value
        }
    } catch {
        Write-Host "    Could not enumerate admins for $projName" -ForegroundColor Yellow
    }

    $ownerCount = $admins.Count
    if ($ownerCount -eq 0) { $noOwnerCount++ }
    elseif ($ownerCount -eq 1) { $singleOwnerCount++ }

    $projectData += @{
        name         = $projName
        id           = $proj.id
        state        = $proj.state
        lastUpdate   = $proj.lastUpdateTime
        adminCount   = $ownerCount
        description  = $projDetail.description
    }
}

Write-Host "  Total projects: $($projects.count)" -ForegroundColor Green
Write-Host "  No owner:       $noOwnerCount" -ForegroundColor $(if ($noOwnerCount -gt 0) { "Red" } else { "Green" })
Write-Host "  Single owner:   $singleOwnerCount" -ForegroundColor $(if ($singleOwnerCount -gt 0) { "Yellow" } else { "Green" })

# ============================================================
# METRIC 2: Access Pattern Analysis
# ============================================================
Write-Host "`n=== Metric 2: Access Pattern Analysis ===" -ForegroundColor Cyan
Write-Host "  Resolving members of ADO built-in groups via Graph API..." -ForegroundColor Gray

# APPROACH:
# 1. List all groups scoped to each project (ADO Graph returns origin + subjectKind)
# 2. Build a descriptor → { origin, subjectKind, displayName } lookup for all groups
# 3. Fetch all org-level users to build a user descriptor → origin lookup
# 4. For each built-in ADO group (origin=vsts), enumerate its direct members
# 5. Resolve each member against our lookups to determine:
#      - Entra ID group (origin=aad, subjectKind=group)  → Governance-compliant
#      - Direct user   (subjectKind=user)                → Needs remediation
#      - ADO-native group nesting (origin=vsts)           → Structural, EXCLUDED from totals
#
# The governance question is: "Of the non-structural members in ADO built-in groups,
# how many are Entra ID groups vs direct user assignments?"

$orgName = $OrgUrl.TrimEnd('/').Split('/')[-1]
$vsspsBase = "https://vssps.dev.azure.com/$orgName"

# Build org-wide user lookup: descriptor → { origin, displayName }
Write-Host "  Building org-wide user lookup..." -ForegroundColor Gray
$userLookup = @{}
try {
    $continuationToken = $null
    do {
        $userUrl = "$vsspsBase/_apis/graph/users?api-version=7.0-preview.1"
        if ($continuationToken) { $userUrl += "&continuationToken=$continuationToken" }
        $usersResp = Invoke-WebRequest -Uri $userUrl -Headers $headers -ErrorAction Stop
        $usersData = $usersResp.Content | ConvertFrom-Json
        foreach ($u in $usersData.value) {
            $userLookup[$u.descriptor] = @{
                origin      = $u.origin        # "aad" or "msa"
                displayName = $u.displayName
                subjectKind = "user"
            }
        }
        $continuationToken = $usersResp.Headers['X-MS-ContinuationToken']
    } while ($continuationToken)
    Write-Host "  User lookup built: $($userLookup.Count) users" -ForegroundColor Gray
} catch {
    Write-Host "  WARNING: Could not build full user lookup. Member resolution may be incomplete." -ForegroundColor Yellow
}

$directUserCount = 0
$entraGroupCount = 0
$adoGroupCount = 0
$accessDetails = @()

foreach ($proj in $projects.value) {
    $projName = $proj.name
    $projDirect = 0
    $projEntraGroups = 0
    $projAdoGroups = 0
    $projMembers = @()

    try {
        # Get the project scope descriptor
        $descriptorResp = Invoke-RestMethod -Uri "$vsspsBase/_apis/graph/descriptors/$($proj.id)?api-version=7.0-preview.1" -Headers $headers -ErrorAction Stop
        $scopeDescriptor = $descriptorResp.value

        # List ALL groups in this project scope — returns full objects with origin field
        $groupsResp = Invoke-RestMethod -Uri "$vsspsBase/_apis/graph/groups?scopeDescriptor=$scopeDescriptor&api-version=7.0-preview.1" -Headers $headers -ErrorAction Stop

        # Build a group descriptor → { origin, displayName } lookup for this project scope
        $groupLookup = @{}
        foreach ($g in $groupsResp.value) {
            $groupLookup[$g.descriptor] = @{
                origin      = $g.origin           # "vsts" = ADO-native, "aad" = Entra
                displayName = $g.displayName
                subjectKind = "group"
            }
        }

        # Identify the built-in ADO groups we care about (origin = "vsts")
        # These are the groups that SHOULD contain Entra groups as members
        $builtInGroups = $groupsResp.value | Where-Object { $_.origin -eq "vsts" }

        foreach ($group in $builtInGroups) {
            # Get direct members of this built-in ADO group
            $membershipsResp = Invoke-RestMethod -Uri "$vsspsBase/_apis/graph/memberships/$($group.descriptor)?direction=down&api-version=7.0-preview.1" -Headers $headers -ErrorAction SilentlyContinue

            foreach ($membership in $membershipsResp.value) {
                $memberDesc = $membership.memberDescriptor

                # Try to resolve from our group lookup first
                if ($groupLookup.ContainsKey($memberDesc)) {
                    $resolved = $groupLookup[$memberDesc]
                    if ($resolved.origin -eq "aad") {
                        # Entra ID group added to a built-in ADO group — COMPLIANT
                        $projEntraGroups++
                        $projMembers += @{
                            parentGroup = $group.displayName
                            memberName  = $resolved.displayName
                            type        = "Entra ID Group"
                            origin      = "aad"
                        }
                    } elseif ($resolved.origin -eq "vsts") {
                        # ADO-native group nested inside another ADO group
                        $projAdoGroups++
                        $projMembers += @{
                            parentGroup = $group.displayName
                            memberName  = $resolved.displayName
                            type        = "ADO Group"
                            origin      = "vsts"
                        }
                    } else {
                        # Other group origin — count as needing review
                        $projDirect++
                        $projMembers += @{
                            parentGroup = $group.displayName
                            memberName  = $resolved.displayName
                            type        = "Unknown Group (origin: $($resolved.origin))"
                            origin      = $resolved.origin
                        }
                    }
                }
                # Try user lookup
                elseif ($userLookup.ContainsKey($memberDesc)) {
                    $resolved = $userLookup[$memberDesc]
                    # Any user (aad or msa origin) added directly to an ADO group = direct user
                    $projDirect++
                    $projMembers += @{
                        parentGroup = $group.displayName
                        memberName  = $resolved.displayName
                        type        = "Direct User"
                        origin      = $resolved.origin
                    }
                }
                # Not in either lookup — resolve individually via API
                else {
                    $memberResolved = $false

                    # Try resolving as a group
                    try {
                        $resolvedGroup = Invoke-RestMethod -Uri "$vsspsBase/_apis/graph/groups/$memberDesc`?api-version=7.0-preview.1" -Headers $headers -ErrorAction Stop
                        if ($resolvedGroup.origin -eq "aad") {
                            $projEntraGroups++
                            $projMembers += @{
                                parentGroup = $group.displayName
                                memberName  = $resolvedGroup.displayName
                                type        = "Entra ID Group"
                                origin      = "aad"
                            }
                        } elseif ($resolvedGroup.origin -eq "vsts") {
                            $projAdoGroups++
                            $projMembers += @{
                                parentGroup = $group.displayName
                                memberName  = $resolvedGroup.displayName
                                type        = "ADO Group"
                                origin      = "vsts"
                            }
                        } else {
                            $projDirect++
                            $projMembers += @{
                                parentGroup = $group.displayName
                                memberName  = $resolvedGroup.displayName
                                type        = "Unknown Group (origin: $($resolvedGroup.origin))"
                                origin      = $resolvedGroup.origin
                            }
                        }
                        $memberResolved = $true
                    } catch {}

                    if (-not $memberResolved) {
                        # Try resolving as a user
                        try {
                            $resolvedUser = Invoke-RestMethod -Uri "$vsspsBase/_apis/graph/users/$memberDesc`?api-version=7.0-preview.1" -Headers $headers -ErrorAction Stop
                            $projDirect++
                            $projMembers += @{
                                parentGroup = $group.displayName
                                memberName  = $resolvedUser.displayName
                                type        = "Direct User"
                                origin      = $resolvedUser.origin
                            }
                            $memberResolved = $true
                        } catch {}
                    }

                    if (-not $memberResolved) {
                        # Could not resolve — count conservatively as direct user
                        $projDirect++
                        $projMembers += @{
                            parentGroup = $group.displayName
                            memberName  = "(unresolved: $($memberDesc.Substring(0, [Math]::Min(20, $memberDesc.Length)))...)"
                            type        = "Unresolved (counted as Direct User)"
                            origin      = "unknown"
                        }
                    }
                }
            }
        }
    } catch {
        Write-Host "    Could not audit access for $projName" -ForegroundColor Yellow
        $accessDetails += @{
            project     = $projName
            directUsers = -1
            entraGroups = -1
            adoGroups   = -1
            pattern     = "Unknown"
            members     = @()
        }
        continue
    }

    $directUserCount += $projDirect
    $entraGroupCount += $projEntraGroups
    $adoGroupCount += $projAdoGroups

    # Classify the project's access pattern
    $pattern = if ($projEntraGroups -gt 0 -and $projDirect -eq 0) {
        "Entra-only"
    } elseif ($projEntraGroups -gt 0 -and $projDirect -gt 0) {
        "Mixed (Entra groups + direct users)"
    } elseif ($projDirect -gt 0 -and $projEntraGroups -eq 0) {
        "Direct-only (no Entra groups)"
    } else {
        "ADO groups only (no Entra groups, no direct users)"
    }

    $accessDetails += @{
        project     = $projName
        directUsers = $projDirect
        entraGroups = $projEntraGroups
        adoGroups   = $projAdoGroups
        pattern     = $pattern
        members     = $projMembers
    }

    Write-Host "  $projName : $pattern  (Entra: $projEntraGroups, ADO: $projAdoGroups, Direct: $projDirect)" -ForegroundColor $(
        if ($pattern -eq "Entra-only") { "Green" }
        elseif ($pattern -match "Mixed") { "Yellow" }
        else { "Red" }
    )
}

# Compute percentages across all three categories
$totalMemberships = $entraGroupCount + $adoGroupCount + $directUserCount
$entraPct = if ($totalMemberships -gt 0) { [math]::Round(($entraGroupCount / $totalMemberships) * 100, 1) } else { 0 }
$adoGroupPct = if ($totalMemberships -gt 0) { [math]::Round(($adoGroupCount / $totalMemberships) * 100, 1) } else { 0 }
$directPct = if ($totalMemberships -gt 0) { [math]::Round(($directUserCount / $totalMemberships) * 100, 1) } else { 0 }

Write-Host "`n  Access Summary:" -ForegroundColor Cyan
Write-Host "  Entra ID group memberships:  $entraGroupCount ($entraPct%)" -ForegroundColor $(if ($entraPct -gt 0) { "Green" } else { "Yellow" })
Write-Host "  ADO-native group nestings:   $adoGroupCount ($adoGroupPct%)" -ForegroundColor Gray
Write-Host "  Direct user assignments:     $directUserCount ($directPct%)" -ForegroundColor $(if ($directUserCount -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "  Entra ID = external Entra security groups (governance target)" -ForegroundColor Gray
Write-Host "  ADO      = built-in ADO groups nested in other ADO groups (structural)" -ForegroundColor Gray
Write-Host "  Direct   = individual user accounts added to ADO groups (needs remediation)" -ForegroundColor Gray

# ============================================================
# METRIC 3: Service Connection Governance
# ============================================================
Write-Host "`n=== Metric 3: Service Connection Governance ===" -ForegroundColor Cyan

$serviceConnections = @()
$ungoverned = 0

foreach ($proj in $projects.value) {
    $projName = $proj.name
    try {
        $endpoints = Invoke-RestMethod -Uri "$OrgUrl/$projName/_apis/serviceendpoint/endpoints?api-version=7.0" -Headers $headers -ErrorAction SilentlyContinue
        foreach ($ep in $endpoints.value) {
            $isShared = $ep.isShared -eq $true
            $createdBy = $ep.createdBy.displayName

            $serviceConnections += @{
                project     = $projName
                name        = $ep.name
                type        = $ep.type
                createdBy   = $createdBy
                isShared    = $isShared
            }

            # Flag connections not created by known platform admins
            # (In production, compare against a list of Platform Admin UPNs)
            if (-not $isShared) {
                $ungoverned++
            }
        }
    } catch {
        Write-Host "    Could not audit service connections for $projName" -ForegroundColor Yellow
    }
}

Write-Host "  Total service connections: $($serviceConnections.Count)" -ForegroundColor Green
Write-Host "  Potentially ungoverned:   $ungoverned" -ForegroundColor $(if ($ungoverned -gt 0) { "Yellow" } else { "Green" })

# ============================================================
# METRIC 4 & 5: Lifecycle State Summary
# ============================================================
Write-Host "`n=== Metric 4: Lifecycle State Summary ===" -ForegroundColor Cyan

$noLifecycleState = $projects.count  # All projects lack lifecycle state until the model is adopted
Write-Host "  Projects without defined lifecycle state: $noLifecycleState" -ForegroundColor Yellow
Write-Host "  (Expected: all projects pre-programme lack lifecycle state)" -ForegroundColor Gray

# ============================================================
# COMPILE REPORT
# ============================================================
$report = @{
    metadata = @{
        organisation = $OrgUrl
        auditDate    = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
        auditedBy    = (az account show --query user.name -o tsv)
    }
    summary = @{
        totalProjects                 = $projects.count
        projectsNoOwner               = $noOwnerCount
        projectsSingleOwner           = $singleOwnerCount
        entraGroupMemberships         = $entraGroupCount
        entraGroupPercentage          = $entraPct
        adoGroupMemberships           = $adoGroupCount
        adoGroupPercentage            = $adoGroupPct
        directUserAssignments         = $directUserCount
        directUserPercentage          = $directPct
        totalServiceConnections       = $serviceConnections.Count
        ungovernedServiceConnections  = $ungoverned
        projectsWithoutLifecycleState = $noLifecycleState
    }
    baseline = @{
        averageProvisioningTimeDays   = "MANUAL_ENTRY_REQUIRED"
        projectsNoOrSingleOwner       = $noOwnerCount + $singleOwnerCount
        accessBreakdown               = "${entraPct}% Entra ID groups / ${adoGroupPct}% ADO groups / ${directPct}% direct users"
        entraGroupMemberships         = $entraGroupCount
        adoGroupMemberships           = $adoGroupCount
        directUserAssignments         = $directUserCount
        ungovernedServiceConnections  = $ungoverned
        projectsWithoutLifecycleState = $noLifecycleState
    }
    projects           = $projectData
    accessAnalysis     = $accessDetails
    serviceConnections = $serviceConnections
}

$report | ConvertTo-Json -Depth 5 | Out-File -FilePath $OutputPath -Encoding utf8
Write-Host "`n=== Baseline Report ===" -ForegroundColor Green
Write-Host "  Report saved to: $OutputPath"
Write-Host "`n  SUMMARY:" -ForegroundColor Cyan
Write-Host "  ┌────────────────────────────────────────────────────────┐"
Write-Host "  │ Total Projects:              $($projects.count)"
Write-Host "  │ No Owner / Single Owner:     $noOwnerCount / $singleOwnerCount"
Write-Host "  │"
Write-Host "  │ Access Breakdown:"
Write-Host "  │   Entra ID Groups:           $entraGroupCount ($entraPct%)"
Write-Host "  │   ADO-Native Groups:         $adoGroupCount ($adoGroupPct%)"
Write-Host "  │   Direct Users:              $directUserCount ($directPct%)"
Write-Host "  │"
Write-Host "  │ Ungoverned Svc Connections:  $ungoverned"
Write-Host "  │ No Lifecycle State:          $noLifecycleState"
Write-Host "  └────────────────────────────────────────────────────────┘"
Write-Host "`n  NOTE: 'averageProvisioningTimeDays' requires manual entry" -ForegroundColor Yellow
Write-Host "        based on ServiceNow ticket history or team survey.`n"
