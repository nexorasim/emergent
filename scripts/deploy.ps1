# eSIM Myanmar Entertainment Server - Deployment Script
# PowerShell script for Windows deployment
# Usage: .\scripts\deploy.ps1 -Environment [development|staging|production]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("development", "staging", "production")]
    [string]$Environment = "development",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipTests,
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipBuild,
    
    [Parameter(Mandatory=$false)]
    [switch]$FirebaseOnly
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Step($message) {
    Write-Host ""
    Write-Host "=== $message ===" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Success($message) {
    Write-Host "[SUCCESS] $message" -ForegroundColor Green
}

function Write-Warning($message) {
    Write-Host "[WARNING] $message" -ForegroundColor Yellow
}

function Write-Error($message) {
    Write-Host "[ERROR] $message" -ForegroundColor Red
}

# Banner
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  eSIM Myanmar Entertainment Server" -ForegroundColor Cyan
Write-Host "  Deployment Script v1.0.0" -ForegroundColor Cyan
Write-Host "  Environment: $Environment" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Step "Checking Prerequisites"

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js: $nodeVersion"
} catch {
    Write-Error "Node.js not found. Please install Node.js 18+"
    exit 1
}

# Check Yarn
try {
    $yarnVersion = yarn --version
    Write-Success "Yarn: $yarnVersion"
} catch {
    Write-Warning "Yarn not found. Installing..."
    npm install -g yarn
}

# Check Python
try {
    $pythonVersion = python --version
    Write-Success "Python: $pythonVersion"
} catch {
    Write-Error "Python not found. Please install Python 3.11+"
    exit 1
}

# Check Firebase CLI
try {
    $firebaseVersion = firebase --version
    Write-Success "Firebase CLI: $firebaseVersion"
} catch {
    Write-Warning "Firebase CLI not found. Installing..."
    npm install -g firebase-tools
}

# Frontend Build
if (-not $SkipBuild) {
    Write-Step "Building Frontend"
    
    Set-Location frontend
    
    # Install dependencies
    Write-Host "Installing dependencies..."
    yarn install --frozen-lockfile
    
    # Set environment variables
    $env:REACT_APP_BACKEND_URL = switch ($Environment) {
        "production" { "https://api.esim.com.mm" }
        "staging" { "https://staging-api.esim.com.mm" }
        default { "http://localhost:8001" }
    }
    $env:REACT_APP_DOMAIN = switch ($Environment) {
        "production" { "esim.com.mm" }
        "staging" { "staging.esim.com.mm" }
        default { "localhost:3000" }
    }
    
    Write-Host "Building for $Environment..."
    yarn build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Frontend build failed"
        exit 1
    }
    
    Write-Success "Frontend build completed"
    Set-Location ..
}

# Run Tests
if (-not $SkipTests) {
    Write-Step "Running Tests"
    
    # Frontend tests
    Write-Host "Running frontend tests..."
    Set-Location frontend
    yarn test --watchAll=false --passWithNoTests
    Set-Location ..
    
    # Backend tests (if pytest available)
    Write-Host "Running backend tests..."
    Set-Location backend
    if (Test-Path "tests") {
        python -m pytest tests/ -v --tb=short 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Some backend tests failed"
        }
    } else {
        Write-Warning "No backend tests found"
    }
    Set-Location ..
    
    Write-Success "Tests completed"
}

# Firebase Deployment
Write-Step "Deploying to Firebase"

Set-Location frontend

# Check Firebase login
Write-Host "Checking Firebase authentication..."
$firebaseProjects = firebase projects:list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Firebase..."
    firebase login
}

# Deploy to Firebase Hosting
Write-Host "Deploying to Firebase Hosting..."

$firebaseProject = switch ($Environment) {
    "production" { "esim-myanmar-ia6gw" }
    "staging" { "esim-myanmar-staging" }
    default { "esim-myanmar-dev" }
}

firebase deploy --only hosting --project $firebaseProject

if ($LASTEXITCODE -ne 0) {
    Write-Error "Firebase deployment failed"
    Set-Location ..
    exit 1
}

Write-Success "Firebase deployment completed"
Set-Location ..

# Post-deployment verification
Write-Step "Post-Deployment Verification"

$siteUrl = switch ($Environment) {
    "production" { "https://www.esim.com.mm" }
    "staging" { "https://staging.esim.com.mm" }
    default { "http://localhost:3000" }
}

Write-Host "Verifying deployment at $siteUrl..."

try {
    $response = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Success "Site is accessible"
    }
} catch {
    Write-Warning "Could not verify site accessibility"
}

# Summary
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Environment: $Environment" -ForegroundColor Yellow
Write-Host "Site URL: $siteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor White
Write-Host "1. Verify the deployment at $siteUrl"
Write-Host "2. Check browser console for errors"
Write-Host "3. Test critical user flows"
Write-Host "4. Monitor error tracking"
Write-Host ""

# Seasonal reminder
$today = Get-Date
$seasonalEnd = Get-Date "2026-02-01"
if ($today -lt $seasonalEnd) {
    Write-Host "Note: Seasonal features are ACTIVE until Feb 1, 2026" -ForegroundColor Magenta
}

exit 0
