param(
    [string]$OrgUrl = "https://dev.azure.com/tpitest"
)

$token = az account get-access-token --resource "499b84ac-1321-427f-aa17-267ca6975798" --query accessToken -o tsv 2>$null
$headers = @{
    Authorization  = "Bearer $token"
    "Content-Type" = "application/json-patch+json"
}

function New-Feature {
    param($Project, $Title, $IterPath, $AreaPath, $ParentId, $Priority)

    $body = ConvertTo-Json -Depth 3 @(
        @{ op = "add"; path = "/fields/System.Title"; value = $Title }
        @{ op = "add"; path = "/fields/System.IterationPath"; value = $IterPath }
        @{ op = "add"; path = "/fields/System.AreaPath"; value = $AreaPath }
        @{ op = "add"; path = "/fields/System.AssignedTo"; value = "tom@tpi-test.com" }
        @{ op = "add"; path = "/fields/Custom.BusinessPriority"; value = $Priority }
    )

    $encProject = [Uri]::EscapeDataString($Project)
    $wi = Invoke-RestMethod -Uri "$OrgUrl/$encProject/_apis/wit/workitems/`$Feature?api-version=7.0" `
        -Method Post -Headers $headers -Body $body

    # Link to parent Epic
    $linkBody = ConvertTo-Json -Depth 5 @(
        @{
            op    = "add"
            path  = "/relations/-"
            value = @{
                rel = "System.LinkTypes.Hierarchy-Reverse"
                url = "$OrgUrl/_apis/wit/workitems/$ParentId"
            }
        }
    )
    Invoke-RestMethod -Uri "$OrgUrl/$encProject/_apis/wit/workitems/$($wi.id)?api-version=7.0" `
        -Method Patch -Headers $headers -Body $linkBody | Out-Null

    Write-Host "Created Feature #$($wi.id): $Title [$IterPath]" -ForegroundColor Green
    return $wi.id
}

function Add-Dependency {
    param($Project, $WorkItemId, $PredecessorId)

    $body = ConvertTo-Json -Depth 5 @(
        @{
            op    = "add"
            path  = "/relations/-"
            value = @{
                rel = "System.LinkTypes.Dependency-Reverse"
                url = "$OrgUrl/_apis/wit/workitems/$PredecessorId"
            }
        }
    )
    $encProject = [Uri]::EscapeDataString($Project)
    Invoke-RestMethod -Uri "$OrgUrl/$encProject/_apis/wit/workitems/${WorkItemId}?api-version=7.0" `
        -Method Patch -Headers $headers -Body $body | Out-Null
    Write-Host "  Dependency: #$WorkItemId depends on #$PredecessorId" -ForegroundColor Cyan
}

# ── Create Features ──────────────────────────────────────────────────────────

Write-Host "`n--- Customer Portal (Epic #530) ---" -ForegroundColor Yellow
$cpF3 = New-Feature -Project "Customer Portal" -Title "User Profile Management" `
    -IterPath "Customer Portal\FY26\Q3\Sprint 3" -AreaPath "Customer Portal\User Profile" `
    -ParentId 530 -Priority "Medium"

$cpF4 = New-Feature -Project "Customer Portal" -Title "Notification Center" `
    -IterPath "Customer Portal\FY26\Q4\Sprint 4" -AreaPath "Customer Portal\Dashboard" `
    -ParentId 530 -Priority "Low"

Write-Host "`n--- API Platform (Epic #548) ---" -ForegroundColor Yellow
$apF3 = New-Feature -Project "API Platform" -Title "API Analytics Dashboard" `
    -IterPath "API Platform\FY26\Q3\Sprint 3" -AreaPath "API Platform\Gateway" `
    -ParentId 548 -Priority "High"

$apF4 = New-Feature -Project "API Platform" -Title "GraphQL Gateway" `
    -IterPath "API Platform\FY26\Q4\Sprint 5" -AreaPath "API Platform\Gateway" `
    -ParentId 548 -Priority "Medium"

Write-Host "`n--- Employee Hub (Epic #562) ---" -ForegroundColor Yellow
$ehF3 = New-Feature -Project "Employee Hub" -Title "Employee Directory Search" `
    -IterPath "Employee Hub\FY26\Q3\Sprint 3" -AreaPath "Employee Hub\Directory" `
    -ParentId 562 -Priority "Medium"

$ehF4 = New-Feature -Project "Employee Hub" -Title "Training Module Integration" `
    -IterPath "Employee Hub\FY26\Q4\Sprint 4" -AreaPath "Employee Hub\Onboarding" `
    -ParentId 562 -Priority "Low"

# ── Add Cross-Project Dependencies ───────────────────────────────────────────

Write-Host "`n--- Adding cross-project dependencies ---" -ForegroundColor Yellow

# API Analytics Dashboard depends on Dashboard Analytics Module (#532)
Add-Dependency -Project "API Platform" -WorkItemId $apF3 -PredecessorId 532

# Employee Directory Search depends on User Profile Management
Add-Dependency -Project "Employee Hub" -WorkItemId $ehF3 -PredecessorId $cpF3

# GraphQL Gateway depends on Rate Limiting & Throttling (#549)
Add-Dependency -Project "API Platform" -WorkItemId $apF4 -PredecessorId 549

Write-Host "`nDone! Refresh the Delivery Plan to see changes." -ForegroundColor Green
