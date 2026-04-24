param(
    [string]$OrgUrl = "https://dev.azure.com/tpitest",
    [string]$ProcessId = ""
)

$ErrorActionPreference = "Stop"

# Get token
$token = az account get-access-token --resource "499b84ac-1321-427f-aa17-267ca6975798" --query accessToken -o tsv
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

# Auto-detect ProcessId if not provided
if (-not $ProcessId) {
    $allProcesses = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes?api-version=7.0" -Headers $headers
    $agilePortfolio = $allProcesses.value | Where-Object { $_.name -eq "Agile - Portfolio" }
    if ($agilePortfolio) {
        $ProcessId = $agilePortfolio.typeId
        Write-Host "Auto-detected 'Agile - Portfolio' process (ID: $ProcessId)" -ForegroundColor Cyan
    } else {
        Write-Host "ERROR: 'Agile - Portfolio' process not found. Run setup-ado-process.ps1 first." -ForegroundColor Red
        exit 1
    }
}

# ============================================================
# STEP 1: Create Team Projects
# ============================================================
Write-Host "`n=== STEP 1: Creating Team Projects ===" -ForegroundColor Cyan

$projects = @(
    @{ name = "Portfolio Delivery"; desc = "Portfolio hub — cross-project Delivery Plans, Analytics Views, dashboards, and wiki. No code or team-level work items." },
    @{ name = "Customer Portal"; desc = "Customer-facing web portal — part of the Digital Products portfolio." },
    @{ name = "API Platform"; desc = "Shared API gateway and microservices — part of the Digital Products portfolio." },
    @{ name = "Employee Hub"; desc = "Internal employee self-service portal — part of the Internal Ops portfolio." }
)

$projectIds = @{}

foreach ($p in $projects) {
    # Check if project already exists
    try {
        $existing = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects/$($p.name)?api-version=7.0" -Headers $headers -ErrorAction Stop
        Write-Host "  Project '$($p.name)' already exists (id: $($existing.id))" -ForegroundColor Yellow
        $projectIds[$p.name] = $existing.id
        continue
    } catch {}

    $body = @{
        name = $p.name
        description = $p.desc
        capabilities = @{
            versioncontrol = @{ sourceControlType = "Git" }
            processTemplate = @{ templateTypeId = $ProcessId }
        }
    } | ConvertTo-Json -Depth 4

    $op = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects?api-version=7.0" -Headers $headers -Method Post -Body $body
    Write-Host "  Creating '$($p.name)'... (operation: $($op.id))" -ForegroundColor Gray

    # Poll until project creation is complete
    $maxWait = 60
    $waited = 0
    do {
        Start-Sleep -Seconds 3
        $waited += 3
        $status = Invoke-RestMethod -Uri "$OrgUrl/_apis/operations/$($op.id)?api-version=7.0" -Headers $headers
    } while ($status.status -ne "succeeded" -and $status.status -ne "failed" -and $waited -lt $maxWait)

    if ($status.status -eq "succeeded") {
        $proj = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects/$($p.name)?api-version=7.0" -Headers $headers
        $projectIds[$p.name] = $proj.id
        Write-Host "  Created '$($p.name)' (id: $($proj.id))" -ForegroundColor Green
    } else {
        Write-Host "  FAILED to create '$($p.name)': $($status.status)" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`nProject IDs:"
$projectIds.GetEnumerator() | ForEach-Object { Write-Host "  $($_.Key) = $($_.Value)" }

# ============================================================
# STEP 2: Create Teams
# ============================================================
Write-Host "`n=== STEP 2: Creating Teams ===" -ForegroundColor Cyan

$teamDefs = @(
    @{ project = "Customer Portal"; teams = @("Portal Dev") },
    @{ project = "API Platform"; teams = @("API Engineering") },
    @{ project = "Employee Hub"; teams = @("Internal Apps") }
)

$teamIds = @{}

foreach ($td in $teamDefs) {
    foreach ($teamName in $td.teams) {
        $projName = $td.project
        # Check if team already exists
        try {
            $existingTeams = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects/$projName/teams?api-version=7.0" -Headers $headers
            $existing = $existingTeams.value | Where-Object { $_.name -eq $teamName }
            if ($existing) {
                Write-Host "  Team '$teamName' in '$projName' already exists" -ForegroundColor Yellow
                $teamIds["$projName/$teamName"] = $existing.id
                continue
            }
        } catch {}

        $body = @{ name = $teamName; description = "$teamName team for $projName" } | ConvertTo-Json
        try {
            $team = Invoke-RestMethod -Uri "$OrgUrl/_apis/projects/$projName/teams?api-version=7.0" -Headers $headers -Method Post -Body $body
            Write-Host "  Created team '$teamName' in '$projName'" -ForegroundColor Green
            $teamIds["$projName/$teamName"] = $team.id
        } catch {
            $errMsg = ($_.ErrorDetails.Message | ConvertFrom-Json).message
            Write-Host "  ERROR creating team '$teamName': $errMsg" -ForegroundColor Red
        }
    }
}

# ============================================================
# STEP 3: Configure Iteration Paths
# ============================================================
Write-Host "`n=== STEP 3: Configuring Iteration Paths ===" -ForegroundColor Cyan

# Iteration structure: FY26 > Q3 > Sprint 1..3, Q4 > Sprint 4..6
$iterations = @(
    @{ name = "FY26"; path = ""; startDate = $null; finishDate = $null },
    @{ name = "Q3"; path = "FY26"; startDate = $null; finishDate = $null },
    @{ name = "Sprint 1"; path = "FY26\Q3"; startDate = "2026-03-02T00:00:00Z"; finishDate = "2026-03-13T00:00:00Z" },
    @{ name = "Sprint 2"; path = "FY26\Q3"; startDate = "2026-03-16T00:00:00Z"; finishDate = "2026-03-27T00:00:00Z" },
    @{ name = "Sprint 3"; path = "FY26\Q3"; startDate = "2026-03-30T00:00:00Z"; finishDate = "2026-04-10T00:00:00Z" },
    @{ name = "Q4"; path = "FY26"; startDate = $null; finishDate = $null },
    @{ name = "Sprint 4"; path = "FY26\Q4"; startDate = "2026-04-13T00:00:00Z"; finishDate = "2026-04-24T00:00:00Z" },
    @{ name = "Sprint 5"; path = "FY26\Q4"; startDate = "2026-04-27T00:00:00Z"; finishDate = "2026-05-08T00:00:00Z" },
    @{ name = "Sprint 6"; path = "FY26\Q4"; startDate = "2026-05-11T00:00:00Z"; finishDate = "2026-05-22T00:00:00Z" }
)

foreach ($projName in @("Portfolio Delivery", "Customer Portal", "API Platform", "Employee Hub")) {
    Write-Host "  Configuring iterations for '$projName'..." -ForegroundColor Gray
    foreach ($iter in $iterations) {
        $parentPath = if ($iter.path) { "\$projName\Iteration\$($iter.path)" } else { "\$projName\Iteration" }

        $body = @{ name = $iter.name }
        if ($iter.startDate) {
            $body["attributes"] = @{
                startDate = $iter.startDate
                finishDate = $iter.finishDate
            }
        }
        $bodyJson = $body | ConvertTo-Json -Depth 3

        try {
            $null = Invoke-RestMethod -Uri "$OrgUrl/$projName/_apis/wit/classificationnodes/iterations/$($iter.path)?api-version=7.0" -Headers $headers -Method Post -Body $bodyJson
            Write-Host "    Created: $($iter.path)\$($iter.name)" -ForegroundColor Green
        } catch {
            $errMsg = ($_.ErrorDetails.Message | ConvertFrom-Json).message
            if ($errMsg -like "*already exists*" -or $errMsg -like "*TF200020*" -or $errMsg -like "*VS402371*" -or $errMsg -like "*already in use*") {
                Write-Host "    Already exists: $($iter.path)\$($iter.name)" -ForegroundColor Yellow
            } else {
                Write-Host "    ERROR: $($iter.path)\$($iter.name) - $errMsg" -ForegroundColor Red
            }
        }
    }
}

# ============================================================
# STEP 4: Configure Area Paths
# ============================================================
Write-Host "`n=== STEP 4: Configuring Area Paths ===" -ForegroundColor Cyan

$areaDefs = @(
    @{ project = "Customer Portal"; areas = @("Authentication", "Dashboard", "User Profile") },
    @{ project = "API Platform"; areas = @("Gateway", "Rate Limiting", "Developer Portal") },
    @{ project = "Employee Hub"; areas = @("Onboarding", "Benefits", "Directory") }
)

foreach ($ad in $areaDefs) {
    Write-Host "  Configuring areas for '$($ad.project)'..." -ForegroundColor Gray
    foreach ($area in $ad.areas) {
        $body = @{ name = $area } | ConvertTo-Json
        try {
            $null = Invoke-RestMethod -Uri "$OrgUrl/$($ad.project)/_apis/wit/classificationnodes/areas?api-version=7.0" -Headers $headers -Method Post -Body $body
            Write-Host "    Created: $area" -ForegroundColor Green
        } catch {
            $errMsg = ($_.ErrorDetails.Message | ConvertFrom-Json).message
            if ($errMsg -like "*already exists*" -or $errMsg -like "*TF200020*" -or $errMsg -like "*VS402371*" -or $errMsg -like "*already in use*") {
                Write-Host "    Already exists: $area" -ForegroundColor Yellow
            } else {
                Write-Host "    ERROR: $area - $errMsg" -ForegroundColor Red
            }
        }
    }
}

# ============================================================
# STEP 5: Set Team Area Paths, Backlog Iterations, and Sprint Subscriptions
# ============================================================
Write-Host "`n=== STEP 5: Configuring Team Settings ===" -ForegroundColor Cyan

$teamSettings = @(
    @{ project = "Customer Portal"; team = "Portal Dev"; area = "Customer Portal" },
    @{ project = "API Platform"; team = "API Engineering"; area = "API Platform" },
    @{ project = "Employee Hub"; team = "Internal Apps"; area = "Employee Hub" }
)

foreach ($ts in $teamSettings) {
    $projTeam = "$($ts.project)\$($ts.team)"
    $encodedTeam = [Uri]::EscapeDataString($ts.team)

    # Set area path (include children so team sees all sub-areas)
    $areaBody = @{
        defaultValue = $ts.area
        values = @(@{ value = $ts.area; includeChildren = $true })
    } | ConvertTo-Json -Depth 3
    try {
        $null = Invoke-RestMethod -Uri "$OrgUrl/$($ts.project)/$encodedTeam/_apis/work/teamsettings/teamfieldvalues?api-version=7.0" -Headers $headers -Method Patch -Body $areaBody
        Write-Host "  Set area path for $projTeam" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR setting area for $projTeam" -ForegroundColor Red
    }

    # Set backlog iteration using CLI (REST API has a known issue with this field)
    $fy26Node = Invoke-RestMethod -Uri "$OrgUrl/$($ts.project)/_apis/wit/classificationnodes/iterations/FY26?api-version=7.0" -Headers $headers
    $null = az boards iteration team set-backlog-iteration --id $fy26Node.identifier --team $ts.team --project $ts.project --org $OrgUrl 2>$null
    Write-Host "  Set backlog iteration (FY26) for $projTeam" -ForegroundColor Green

    # Subscribe team to all sprint iterations
    $sprintsNode = Invoke-RestMethod -Uri "$OrgUrl/$($ts.project)/_apis/wit/classificationnodes/iterations/FY26?`$depth=2&api-version=7.0" -Headers $headers
    foreach ($q in $sprintsNode.children) {
        foreach ($sp in $q.children) {
            $null = az boards iteration team add --id $sp.identifier --team $ts.team --project $ts.project --org $OrgUrl 2>$null
        }
    }
    Write-Host "  Subscribed sprints for $projTeam" -ForegroundColor Green
}

# ============================================================
# SUMMARY
# ============================================================
Write-Host "`n=== SETUP COMPLETE ===" -ForegroundColor Green
Write-Host "Process: Agile - Portfolio ($ProcessId)"
Write-Host "`nProjects created:"
$projectIds.GetEnumerator() | ForEach-Object { Write-Host "  $($_.Key): $($_.Value)" }
Write-Host "`nTeams created:"
$teamIds.GetEnumerator() | ForEach-Object { Write-Host "  $($_.Key): $($_.Value)" }
Write-Host "`nIteration structure (same in all 4 projects):"
Write-Host "  FY26 > Q3 > Sprint 1 (Mar 2-13), Sprint 2 (Mar 16-27), Sprint 3 (Mar 30-Apr 10)"
Write-Host "  FY26 > Q4 > Sprint 4 (Apr 13-24), Sprint 5 (Apr 27-May 8), Sprint 6 (May 11-22)"
Write-Host "`nNext: Run setup-ado-workitems.ps1 to create sample work items:" -ForegroundColor Cyan
Write-Host "  .\workshops\ado-setup\scripts\setup-ado-workitems.ps1 -OrgUrl `"$OrgUrl`""
