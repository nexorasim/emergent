# eSIM Enterprise Management Portal - All-in-One Workflow (PowerShell)
# Tenant ID: 370dd52c-929e-4fcd-aee3-fb5181eff2b7
# Client ID: 00f56c44-2d00-4378-bb52-1417c208fcfd
# User: admin@mdm.esim.com.mm

$ErrorActionPreference = "Continue"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "eSIM Myanmar Enterprise Workflow" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Step 1: Install required tools globally
Write-Host "[1/9] Installing required tools..." -ForegroundColor Yellow
npm install -g lighthouse newman eslint @azure/cli 2>$null

# Step 2: Create logs directory
Write-Host "[2/9] Creating logs directory..." -ForegroundColor Yellow
if (-not (Test-Path "./logs")) { New-Item -ItemType Directory -Path "./logs" | Out-Null }

# Step 3: Run site health checks
Write-Host "[3/9] Running site health checks..." -ForegroundColor Yellow
$urls = @(
    "https://esim.com.mm",
    "https://www.esim.com.mm",
    "https://esim-myanmar.pages.dev",
    "https://esimmyanmar-09289140-4db73.web.app"
)

$results = @()
foreach ($url in $urls) {
    try {
        $start = Get-Date
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
        $end = Get-Date
        $results += [PSCustomObject]@{
            URL = $url
            Status = $response.StatusCode
            LoadTime = ($end - $start).TotalMilliseconds
            Timestamp = (Get-Date).ToString("o")
        }
        Write-Host "  $url - $($response.StatusCode) OK" -ForegroundColor Green
    } catch {
        $results += [PSCustomObject]@{
            URL = $url
            Status = "ERROR"
            LoadTime = 0
            Timestamp = (Get-Date).ToString("o")
        }
        Write-Host "  $url - ERROR" -ForegroundColor Red
    }
}
$results | ConvertTo-Json | Out-File "./logs/site-health.json"

# Step 4: Run Newman API tests
Write-Host "[4/9] Running Newman API tests..." -ForegroundColor Yellow
newman run postman/esim-myanmar-api.postman_collection.json -e postman/esim-myanmar-environment.postman_environment.json --reporters cli,json --reporter-json-export ./logs/api-errors.json 2>$null

# Step 5: Run ESLint
Write-Host "[5/9] Running ESLint..." -ForegroundColor Yellow
Push-Location frontend
npx eslint ./src --format json -o ../logs/eslint.json 2>$null
Pop-Location

# Step 6: Azure CLI login
Write-Host "[6/9] Azure CLI login..." -ForegroundColor Yellow
Write-Host "  Tenant: 370dd52c-929e-4fcd-aee3-fb5181eff2b7" -ForegroundColor Gray
Write-Host "  User: admin@mdm.esim.com.mm" -ForegroundColor Gray

try {
    az login --tenant 370dd52c-929e-4fcd-aee3-fb5181eff2b7 2>$null
} catch {
    Write-Host "  Azure login skipped or failed" -ForegroundColor Yellow
}

# Step 7: Acquire Microsoft Graph access token
Write-Host "[7/9] Acquiring Microsoft Graph token..." -ForegroundColor Yellow
try {
    $TOKEN = az account get-access-token --resource https://graph.microsoft.com --query accessToken -o tsv 2>$null
} catch {
    $TOKEN = $null
}

if ($TOKEN) {
    # Step 8: Call Microsoft Graph API
    Write-Host "[8/9] Fetching Microsoft Graph data..." -ForegroundColor Yellow
    
    $headers = @{ "Authorization" = "Bearer $TOKEN" }
    
    Write-Host "  Fetching user profile..." -ForegroundColor Gray
    Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/me" -Headers $headers | ConvertTo-Json | Out-File "./logs/graph-me.json"
    
    Write-Host "  Fetching organization..." -ForegroundColor Gray
    Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/organization" -Headers $headers | ConvertTo-Json | Out-File "./logs/graph-org.json"
    
    Write-Host "  Fetching applications..." -ForegroundColor Gray
    Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/applications" -Headers $headers | ConvertTo-Json | Out-File "./logs/graph-apps.json"
    
    Write-Host "  Fetching devices..." -ForegroundColor Gray
    Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/devices" -Headers $headers | ConvertTo-Json | Out-File "./logs/graph-devices.json"
    
    Write-Host "  Fetching groups..." -ForegroundColor Gray
    Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/groups" -Headers $headers | ConvertTo-Json | Out-File "./logs/graph-groups.json"
    
    Write-Host "  Fetching users..." -ForegroundColor Gray
    Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/users" -Headers $headers | ConvertTo-Json | Out-File "./logs/graph-users.json"
} else {
    Write-Host "[8/9] Skipping Graph API calls - no token available" -ForegroundColor Yellow
}

# Step 9: Summary
Write-Host "[9/9] Generating summary..." -ForegroundColor Yellow

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Enterprise Workflow Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Logs saved in ./logs/" -ForegroundColor Gray
Write-Host ""
Write-Host "Azure Entra ID Configuration:" -ForegroundColor White
Write-Host "  Tenant ID: 370dd52c-929e-4fcd-aee3-fb5181eff2b7" -ForegroundColor Gray
Write-Host "  Client ID: 00f56c44-2d00-4378-bb52-1417c208fcfd" -ForegroundColor Gray
Write-Host "  Admin: admin@mdm.esim.com.mm" -ForegroundColor Gray
