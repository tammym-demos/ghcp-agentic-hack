param(
    [string]$OrgUrl = "https://dev.azure.com/tpitest"
)

$ErrorActionPreference = "Stop"

# Get token
$token = az account get-access-token --resource "499b84ac-1321-427f-aa17-267ca6975798" --query accessToken -o tsv
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }

# ============================================================
# STEP 1: Find the Agile base process ID
# ============================================================
Write-Host "=== Finding Agile base process ===" -ForegroundColor Cyan
$processes = Invoke-RestMethod -Uri "$OrgUrl/_apis/process/processes?api-version=7.0" -Headers $headers
$agileBase = $processes.value | Where-Object { $_.name -eq "Agile" }
if (-not $agileBase) { Write-Host "ERROR: Agile process not found in org" -ForegroundColor Red; exit 1 }
Write-Host "  Agile base process: $($agileBase.id)" -ForegroundColor Green

# ============================================================
# STEP 2: Create inherited process "Agile - Portfolio"
# ============================================================
Write-Host "`n=== Creating inherited process ===" -ForegroundColor Cyan

# Check if it already exists
$allProcesses = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes?api-version=7.0" -Headers $headers
$existing = $allProcesses.value | Where-Object { $_.name -eq "Agile - Portfolio" }

if ($existing) {
    $ProcessId = $existing.typeId
    Write-Host "  Process 'Agile - Portfolio' already exists (ID: $ProcessId)" -ForegroundColor Yellow
} else {
    $body = @{
        parentProcessTypeId = $agileBase.id
        referenceName = "Custom.AgilePortfolio"
        name = "Agile - Portfolio"
        description = "Inherited from Agile with Portfolio, Business Priority, and UAT Status fields"
    } | ConvertTo-Json
    $proc = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes?api-version=7.0" -Headers $headers -Method Post -Body $body
    $ProcessId = $proc.typeId
    Write-Host "  Created 'Agile - Portfolio' (ID: $ProcessId)" -ForegroundColor Green
}

# ============================================================
# STEP 3: Derive work item types (Epic, Feature, User Story)
# ============================================================
Write-Host "`n=== Deriving work item types ===" -ForegroundColor Cyan

$witsToDerive = @(
    @{ inheritsFrom = "Microsoft.VSTS.WorkItemTypes.Epic"; color = "FF7B00"; icon = "icon_crown" },
    @{ inheritsFrom = "Microsoft.VSTS.WorkItemTypes.Feature"; color = "773B93"; icon = "icon_trophy" },
    @{ inheritsFrom = "Microsoft.VSTS.WorkItemTypes.UserStory"; color = "009CCC"; icon = "icon_book" }
)

foreach ($wit in $witsToDerive) {
    # Check if already derived
    $existingWits = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workitemtypes?api-version=7.1-preview.2" -Headers $headers
    $derived = $existingWits.value | Where-Object { $_.inherits -eq $wit.inheritsFrom -and $_.customization -eq "inherited" }
    if ($derived) {
        Write-Host "  Already derived: $($derived.name) ($($derived.referenceName))" -ForegroundColor Yellow
    } else {
        $body = @{ color = $wit.color; icon = $wit.icon; inheritsFrom = $wit.inheritsFrom } | ConvertTo-Json
        $result = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes?api-version=7.1-preview.2" -Headers $headers -Method Post -Body $body
        Write-Host "  Derived: $($result.name) ($($result.referenceName))" -ForegroundColor Green
    }
}

# Get the derived WIT reference names
$allWits = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workitemtypes?api-version=7.1-preview.2" -Headers $headers
$epicWit = ($allWits.value | Where-Object { $_.inherits -eq "Microsoft.VSTS.WorkItemTypes.Epic" -and $_.customization -eq "inherited" }).referenceName
$featureWit = ($allWits.value | Where-Object { $_.inherits -eq "Microsoft.VSTS.WorkItemTypes.Feature" -and $_.customization -eq "inherited" }).referenceName
$storyWit = ($allWits.value | Where-Object { $_.inherits -eq "Microsoft.VSTS.WorkItemTypes.UserStory" -and $_.customization -eq "inherited" }).referenceName

if (-not $epicWit -or -not $featureWit -or -not $storyWit) {
    # Fallback: use system WIT names if derived names aren't found
    $epicWit = if ($epicWit) { $epicWit } else { "Microsoft.VSTS.WorkItemTypes.Epic" }
    $featureWit = if ($featureWit) { $featureWit } else { "Microsoft.VSTS.WorkItemTypes.Feature" }
    $storyWit = if ($storyWit) { $storyWit } else { "Microsoft.VSTS.WorkItemTypes.UserStory" }
}

Write-Host "  Epic WIT: $epicWit"
Write-Host "  Feature WIT: $featureWit"
Write-Host "  UserStory WIT: $storyWit"

# ============================================================
# STEP 4: Create picklists
# ============================================================
Write-Host "`n=== Creating picklists ===" -ForegroundColor Cyan

$picklistDefs = @(
    @{ name = "Portfolio"; items = @("Digital Products", "Internal Ops") },
    @{ name = "BusinessPriority"; items = @("High", "Medium", "Low") },
    @{ name = "UATStatus"; items = @("Not Started", "In Progress", "Passed", "Failed") }
)

$picklistIds = @{}

foreach ($pl in $picklistDefs) {
    # Check if picklist already exists by listing all picklists
    $existingLists = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/lists?api-version=7.1-preview.1" -Headers $headers
    $existingPl = $existingLists.value | Where-Object { $_.name -eq $pl.name }

    if ($existingPl) {
        $picklistIds[$pl.name] = $existingPl.id
        Write-Host "  Picklist '$($pl.name)' already exists (ID: $($existingPl.id))" -ForegroundColor Yellow
    } else {
        $body = @{ name = $pl.name; type = "String"; isSuggested = $false; items = $pl.items } | ConvertTo-Json
        $result = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/lists?api-version=7.1-preview.1" -Headers $headers -Method Post -Body $body
        $picklistIds[$pl.name] = $result.id
        Write-Host "  Created picklist '$($pl.name)' (ID: $($result.id))" -ForegroundColor Green
    }
}

# ============================================================
# STEP 5: Create org-level fields
# ============================================================
Write-Host "`n=== Creating org-level custom fields ===" -ForegroundColor Cyan

$fieldsToCreate = @(
    @{ name = "Portfolio"; refName = "Custom.Portfolio"; desc = "Business portfolio grouping"; picklistKey = "Portfolio" },
    @{ name = "Business Priority"; refName = "Custom.BusinessPriority"; desc = "Portfolio-level priority"; picklistKey = "BusinessPriority" },
    @{ name = "UAT Status"; refName = "Custom.UATStatus"; desc = "User acceptance testing status"; picklistKey = "UATStatus" }
)

foreach ($f in $fieldsToCreate) {
    $body = @{
        name = $f.name
        referenceName = $f.refName
        description = $f.desc
        type = "string"
        usage = "workItem"
        readOnly = $false
        canSortBy = $true
        isQueryable = $true
        isPicklist = $true
        isPicklistSuggested = $false
        picklistId = $picklistIds[$f.picklistKey]
    } | ConvertTo-Json

    try {
        $null = Invoke-RestMethod -Uri "$OrgUrl/_apis/wit/fields?api-version=7.0" -Headers $headers -Method Post -Body $body
        Write-Host "  Created org field: $($f.name)" -ForegroundColor Green
    } catch {
        $errMsg = $_.ErrorDetails.Message | ConvertFrom-Json | Select-Object -ExpandProperty message
        if ($errMsg -like "*already exists*" -or $errMsg -like "*already in use*") {
            Write-Host "  Org field already exists: $($f.name)" -ForegroundColor Yellow
        } else {
            Write-Host "  ERROR creating $($f.name): $errMsg" -ForegroundColor Red
        }
    }
}

# ============================================================
# STEP 6: Add fields to work item types
# ============================================================
Write-Host "`n=== Adding fields to work item types ===" -ForegroundColor Cyan

$fieldAssignments = @(
    @{ wit = $epicWit; refName = "Custom.Portfolio"; label = "Portfolio on Epic" },
    @{ wit = $epicWit; refName = "Custom.BusinessPriority"; label = "Business Priority on Epic" },
    @{ wit = $featureWit; refName = "Custom.BusinessPriority"; label = "Business Priority on Feature" },
    @{ wit = $storyWit; refName = "Custom.UATStatus"; label = "UAT Status on User Story" }
)

foreach ($fa in $fieldAssignments) {
    $body = @{
        referenceName = $fa.refName
        readOnly = $false
        required = $false
    } | ConvertTo-Json

    try {
        $null = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes/$($fa.wit)/fields?api-version=7.1-preview.2" -Headers $headers -Method Post -Body $body
        Write-Host "  Added: $($fa.label)" -ForegroundColor Green
    } catch {
        $errMsg = $_.ErrorDetails.Message | ConvertFrom-Json | Select-Object -ExpandProperty message
        if ($errMsg -like "*already exists*") {
            Write-Host "  Already assigned: $($fa.label)" -ForegroundColor Yellow
        } else {
            Write-Host "  ERROR: $($fa.label) - $errMsg" -ForegroundColor Red
        }
    }
}

# ============================================================
# STEP 7: Add UAT state to User Story workflow
# ============================================================
Write-Host "`n=== Adding UAT state to User Story workflow ===" -ForegroundColor Cyan

$states = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes/$storyWit/states?api-version=7.1-preview.1" -Headers $headers
$uatState = $states.value | Where-Object { $_.name -eq "UAT" }

if ($uatState) {
    Write-Host "  UAT state already exists on User Story" -ForegroundColor Yellow
} else {
    $stateBody = @{
        name = "UAT"
        color = "007ACC"
        stateCategory = "InProgress"
        order = $null
    } | ConvertTo-Json

    try {
        $null = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes/$storyWit/states?api-version=7.1-preview.1" -Headers $headers -Method Post -Body $stateBody
        Write-Host "  Added UAT state to User Story workflow" -ForegroundColor Green
    } catch {
        $errMsg = $_.ErrorDetails.Message | ConvertFrom-Json | Select-Object -ExpandProperty message
        Write-Host "  ERROR adding UAT state: $errMsg" -ForegroundColor Red
    }
}

# ============================================================
# VERIFICATION
# ============================================================
Write-Host "`n=== Verification ===" -ForegroundColor Cyan

$epicFields = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes/$epicWit/fields?api-version=7.1-preview.2" -Headers $headers
$customEpic = $epicFields.value | Where-Object { $_.referenceName -like "Custom.*" }
Write-Host "Custom fields on Epic: $($customEpic.Count)"
$customEpic | ForEach-Object { Write-Host "  - $($_.name) ($($_.referenceName))" }

$featureFields = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes/$featureWit/fields?api-version=7.1-preview.2" -Headers $headers
$customFeature = $featureFields.value | Where-Object { $_.referenceName -like "Custom.*" }
Write-Host "Custom fields on Feature: $($customFeature.Count)"
$customFeature | ForEach-Object { Write-Host "  - $($_.name) ($($_.referenceName))" }

$storyFields = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes/$storyWit/fields?api-version=7.1-preview.2" -Headers $headers
$customStory = $storyFields.value | Where-Object { $_.referenceName -like "Custom.*" }
Write-Host "Custom fields on User Story: $($customStory.Count)"
$customStory | ForEach-Object { Write-Host "  - $($_.name) ($($_.referenceName))" }

$states = Invoke-RestMethod -Uri "$OrgUrl/_apis/work/processes/$ProcessId/workItemTypes/$storyWit/states?api-version=7.1-preview.1" -Headers $headers
Write-Host "`nUser Story workflow states:"
$states.value | ForEach-Object { Write-Host "  $($_.name) ($($_.stateCategory))" }

Write-Host "`n=== DONE ===" -ForegroundColor Green
Write-Host "Process 'Agile - Portfolio' (ID: $ProcessId) is ready."
Write-Host "Custom additions:"
Write-Host "  1. Portfolio field on Epics (picklist: Digital Products, Internal Ops)"
Write-Host "  2. Business Priority field on Epics+Features (picklist: High, Medium, Low)"
Write-Host "  3. UAT Status field on User Stories (picklist: Not Started, In Progress, Passed, Failed)"
Write-Host "  4. UAT state in User Story workflow (board column)"
Write-Host ""
Write-Host "Use this Process ID for setup-ado-projects.ps1:" -ForegroundColor Cyan
Write-Host "  .\workshops\ado-setup\scripts\setup-ado-projects.ps1 -OrgUrl `"$OrgUrl`" -ProcessId `"$ProcessId`""
