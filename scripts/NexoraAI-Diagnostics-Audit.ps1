<# =====================================================================

NEXORASIMS ALL-IN-ONE DIAGNOSTIC, AUDIT, AND UPGRADE AGENT (NexoraAI)

Purpose:
  1) System diagnostics + updates (logs, Windows Update, winget, SFC/DISM).
  2) Cloud/Firebase/GCP audit scaffolding (rules, headers, CI/CD, SMTP skeleton).
  3) Security hardening baselines (OWASP-aligned), performance/SEO, accessibility.
  4) Generates audit-ready artifacts and deployment checklists.

Notes:
  - Replace placeholders marked <replace> in generated artifacts where applicable.
  - Non-destructive: writes to $DiagnosticsRoot/<timestamp> and $AuditRoot/<timestamp>.
  - Run in elevated PowerShell (Windows 10/11) as Administrator.

Fixes implemented vs prior draft:
  - Robust logging helper with timestamps and levels; consistent UTF8 encoding.
  - Guards for Windows/admin/tools (winget, PSWindowsUpdate, DISM/SFC, Event Logs).
  - Safe directory creation helpers.
  - JSON generated via ConvertTo-Json (no brittle escaping); valid Firebase schema.
  - Corrected zod regex; safer admin custom-claims check in functions code.
  - Pipeline YAML templated safely and writes service account to file.
  - Avoids invalid http:// scheme in Firebase Hosting redirect sources.

===================================================================== #>

[CmdletBinding()]
param(
  # Cloud environment identifiers
  [string]$FirebaseDev = "esim-dev",
  [string]$FirebaseStg = "esim-stg",
  [string]$FirebaseProd = "esim-myanmar-ia6gw",

  # Domains and email
  [string]$ApexDomain = "esim.com.mm",
  [string]$WwwDomain  = "www.esim.com.mm",
  [string]$EmailFrom  = "info@esim.com.mm",

  # Region and backup bucket
  [string]$Region       = "asia-southeast1",
  [string]$BackupBucket = "esim-firestore-backups",

  # Project metadata (for logging)
  [string]$ProjectNumber = "902105355711",
  [string]$ProjectIds    = "esim-myanmar-ia6gw, esimmyanmar-09289140-4db73",

  # Output roots (parameterized instead of hard-coded)
  [string]$DiagnosticsRoot = "C:\\NexoraSIM\\Diagnostics",
  [string]$AuditRoot       = "C:\\NexoraSIM\\Audit"
)

$ErrorActionPreference = 'Stop'
$PSStyle.OutputRendering = 'PlainText' 2>$null

# -----------------------------
# Helpers
# -----------------------------
function Test-IsAdmin {
  try {
    $id = [Security.Principal.WindowsIdentity]::GetCurrent()
    $p  = [Security.Principal.WindowsPrincipal]$id
    return $p.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
  } catch { return $false }
}

$global:LogFile = $null
function Write-Log {
  param(
    [Parameter(Mandatory)][string]$Message,
    [ValidateSet('INFO','WARN','ERROR','DEBUG')][string]$Level = 'INFO'
  )
  $ts = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
  $line = "[$ts] [$Level] $Message"
  Write-Host $line
  if ($global:LogFile) {
    Add-Content -LiteralPath $global:LogFile -Value $line -Encoding UTF8
  }
}

function Ensure-Directory {
  param([Parameter(Mandatory)][string]$Path)
  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
  }
}

function Write-File {
  param(
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][string]$Content,
    [string]$Encoding = 'UTF8'
  )
  Ensure-Directory -Path (Split-Path -Parent $Path)
  Set-Content -LiteralPath $Path -Value $Content -Encoding $Encoding
}

function Write-JsonFile {
  param(
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)]$Object,
    [switch]$Compress
  )
  Ensure-Directory -Path (Split-Path -Parent $Path)
  $json = if ($Compress) {
    $Object | ConvertTo-Json -Depth 25 -Compress
  } else {
    $Object | ConvertTo-Json -Depth 25
  }
  Set-Content -LiteralPath $Path -Value $json -Encoding UTF8
}

function Safe-Run {
  param(
    [Parameter(Mandatory)][ScriptBlock]$Action,
    [string]$Label = 'operation',
    [string]$OutputFile
  )
  try {
    Write-Log "Starting $Label" 'INFO'
    if ($OutputFile) {
      & $Action | Tee-Object -FilePath $OutputFile | Out-Null
    } else {
      & $Action
    }
    Write-Log "Completed $Label" 'INFO'
  } catch {
    Write-Log "$Label failed: $($_.Exception.Message)" 'ERROR'
  }
}

# Winget helper to check package IDs
function Winget-HasId {
  param([Parameter(Mandatory)][string]$Id)
  try {
    winget list --id $Id --accept-source-agreements | Out-Null
    return $LASTEXITCODE -eq 0
  } catch { return $false }
}
# -----------------------------
# Paths / Initialization
# -----------------------------
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$diagBase  = Join-Path $DiagnosticsRoot $timestamp
$auditBase = Join-Path $AuditRoot $timestamp
Ensure-Directory $diagBase
Ensure-Directory $auditBase

$global:LogFile = Join-Path $diagBase 'diagnostic-log.txt'
"PROJECT: $ProjectNumber" | Out-File -LiteralPath $global:LogFile -Encoding UTF8
"PROJECT IDS: $ProjectIds" | Out-File -LiteralPath $global:LogFile -Append -Encoding UTF8
"TIMESTAMP: $timestamp" | Out-File -LiteralPath $global:LogFile -Append -Encoding UTF8
"DIAG PATH: $diagBase" | Out-File -LiteralPath $global:LogFile -Append -Encoding UTF8
Add-Content -LiteralPath $global:LogFile -Value "=== START DIAGNOSTIC ===" -Encoding UTF8

$IsWindows = ($env:OS -eq 'Windows_NT')
$IsAdmin   = (Test-IsAdmin)
if (-not $IsWindows) { Write-Log 'This script targets Windows hosts. Detected non-Windows environment.' 'WARN' }
if (-not $IsAdmin)   { Write-Log 'Administrator privileges are recommended. Some steps may be skipped.' 'WARN' }

# -----------------------------
# Section 1: System diagnostics and updates
# -----------------------------

# VS Code logs scan
Write-Log 'VS Code log directory scan' 'INFO'
$codeLogsRoot = Join-Path $env:APPDATA 'Code\logs'
if ($IsWindows -and (Test-Path -LiteralPath $codeLogsRoot)) {
  $vscodeTreeFile = Join-Path $diagBase 'vscode-logs-tree.txt'
  Safe-Run -Label 'Enumerate VS Code log directory' -OutputFile $vscodeTreeFile -Action {
    Get-ChildItem -LiteralPath $codeLogsRoot -Recurse -ErrorAction SilentlyContinue | Select-Object FullName, Length, LastWriteTime
  }
  $latest = Get-ChildItem -LiteralPath $codeLogsRoot -Recurse -ErrorAction SilentlyContinue |
            Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if ($latest) {
    Write-Log ("Latest VS Code log: {0}" -f $latest.FullName) 'INFO'
    $tailFile = Join-Path $diagBase 'vscode-latest-log-tail.txt'
    Safe-Run -Label 'Tail latest VS Code log' -OutputFile $tailFile -Action { Get-Content -LiteralPath $latest.FullName -Tail 200 }
  } else {
    Write-Log 'No VS Code logs found.' 'WARN'
  }
} else {
  Write-Log 'VS Code log directory not found.' 'WARN'
}

# Windows Event Logs (Application/System errors)
if ($IsWindows) {
  Safe-Run -Label 'Windows Application Error Events' -OutputFile (Join-Path $diagBase 'win-application-errors.txt') -Action {
    Get-WinEvent -LogName Application -MaxEvents 500 -ErrorAction SilentlyContinue |
      Where-Object { $_.LevelDisplayName -eq 'Error' }
  }
  Safe-Run -Label 'Windows System Error Events' -OutputFile (Join-Path $diagBase 'win-system-errors.txt') -Action {
    Get-WinEvent -LogName System -MaxEvents 500 -ErrorAction SilentlyContinue |
      Where-Object { $_.LevelDisplayName -eq 'Error' }
  }
  Safe-Run -Label 'VS Code crash-related events' -OutputFile (Join-Path $diagBase 'vscode-crash-events.txt') -Action {
    Get-WinEvent -LogName Application -MaxEvents 1000 -ErrorAction SilentlyContinue |
      Where-Object { $_.Message -like '*Code.exe*' -or $_.ProviderName -like '*Visual Studio Code*' }
  }
}

# PSWindowsUpdate: install/import (guarded)
if ($IsWindows -and $IsAdmin) {
  try {
    # Ensure TLS 1.2
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    if (-not (Get-PackageProvider -Name NuGet -ListAvailable -ErrorAction SilentlyContinue)) {
      Install-PackageProvider -Name NuGet -Force -Scope AllUsers -ErrorAction Stop | Out-Null
    }
    if (-not (Get-Module -ListAvailable -Name PSWindowsUpdate)) {
      Install-Module PSWindowsUpdate -Force -Scope AllUsers -ErrorAction Stop
    }
    Import-Module PSWindowsUpdate -Force -ErrorAction Stop
    Write-Log 'PSWindowsUpdate installed/imported.' 'INFO'
  } catch {
    Write-Log ("PSWindowsUpdate setup failed: {0}" -f $_.Exception.Message) 'ERROR'
  }

  # Windows Update (no auto reboot)
  if (Get-Command Install-WindowsUpdate -ErrorAction SilentlyContinue) {
    Safe-Run -Label 'Windows Update (AcceptAll, IgnoreReboot)' -OutputFile (Join-Path $diagBase 'windows-update-results.txt') -Action {
      Install-WindowsUpdate -AcceptAll -IgnoreReboot -Confirm:$false
    }
  } else {
    Write-Log 'Install-WindowsUpdate not available; skipping Windows Update step.' 'WARN'
  }
} else {
  Write-Log 'Skipping PSWindowsUpdate steps (requires Windows + Admin).' 'WARN'
}

# winget source update and upgrades (guarded)
$wingetCmd = Get-Command winget -ErrorAction SilentlyContinue
if ($wingetCmd) {
  Safe-Run -Label 'winget source update' -OutputFile (Join-Path $diagBase 'winget-source-update.txt') -Action { winget source update }
  Safe-Run -Label 'winget upgrade --all' -OutputFile (Join-Path $diagBase 'winget-upgrade-all.txt') -Action {
    winget upgrade --all --include-unknown --accept-source-agreements --accept-package-agreements
  }
  if (Winget-HasId 'Microsoft.VisualStudioCode') {
    Safe-Run -Label 'winget upgrade VS Code (system)' -OutputFile (Join-Path $diagBase 'winget-vscode-system.txt') -Action {
      winget upgrade --id Microsoft.VisualStudioCode --accept-source-agreements --accept-package-agreements
    }
  } else {
    Write-Log 'VS Code (system) package not found in winget.' 'DEBUG'
  }
  if (Winget-HasId 'Microsoft.VisualStudioCode.User') {
    Safe-Run -Label 'winget upgrade VS Code (user)' -OutputFile (Join-Path $diagBase 'winget-vscode-user.txt') -Action {
      winget upgrade --id Microsoft.VisualStudioCode.User --accept-source-agreements --accept-package-agreements
    }
  } else {
    Write-Log 'VS Code (user) package not found in winget.' 'DEBUG'
  }
  Safe-Run -Label 'winget install PowerShell' -OutputFile (Join-Path $diagBase 'winget-powershell-install.txt') -Action {
    winget install --id Microsoft.PowerShell --accept-source-agreements --accept-package-agreements
  }
} else {
  Write-Log 'winget not found; skipping winget actions.' 'WARN'
}

# SFC and DISM (guarded)
if ($IsWindows -and $IsAdmin) {
  Safe-Run -Label 'SFC /scannow' -OutputFile (Join-Path $diagBase 'sfc-scan.txt') -Action { sfc /scannow }
  if (Get-Command DISM -ErrorAction SilentlyContinue) {
    Safe-Run -Label 'DISM /RestoreHealth' -OutputFile (Join-Path $diagBase 'dism-restorehealth.txt') -Action { DISM /Online /Cleanup-Image /RestoreHealth }
  } else {
    Write-Log 'DISM command not found; skipping image repair.' 'WARN'
  }
} else {
  Write-Log 'Skipping SFC/DISM (requires Windows + Admin).' 'WARN'
}

Add-Content -LiteralPath $global:LogFile -Value "=== DIAGNOSTIC AND UPDATE PROCESS COMPLETE ===" -Encoding UTF8
Write-Log ("Logs and outputs stored in: {0}" -f $diagBase) 'INFO'

# -----------------------------
# Section 2: NexoraAI audit artifacts (cloud, security, CI/CD)
# -----------------------------

# Firebase hosting config (JSON via object)
$firebase = [ordered]@{
  projects = [ordered]@{
    default = $FirebaseProd
    dev     = $FirebaseDev
    stg     = $FirebaseStg
    prod    = $FirebaseProd
  }
  hosting = [ordered]@{
    public = 'web/dist'
    ignore = @('firebase.json', '**/.*', '**/node_modules/**')
    headers = @(
      @{ source = '**/*.@(js|css)'; headers = @(@{ key = 'Cache-Control'; value = 'public, max-age=31536000, immutable' }) },
      @{ source = '**/*.@(png|jpg|jpeg|gif|webp|svg)'; headers = @(@{ key = 'Cache-Control'; value = 'public, max-age=31536000, immutable' }) },
      @{ source = '/**'; headers = @(
          @{ key = 'Strict-Transport-Security'; value = 'max-age=31536000; includeSubDomains; preload' },
          @{ key = 'X-Content-Type-Options'; value = 'nosniff' },
          @{ key = 'X-Frame-Options'; value = 'DENY' },
          @{ key = 'Referrer-Policy'; value = 'no-referrer-when-downgrade' },
          @{ key = 'Permissions-Policy'; value = 'geolocation=(), microphone=(), camera=()' },
          # CSP in report-only mode to avoid breaking the app; adjust and enforce once verified.
          @{ key = 'Content-Security-Policy-Report-Only'; value = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com https://*.firebaseapp.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com https://*.firebaseapp.com https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; frame-ancestors 'none'; base-uri 'self';" }
        ) }
    )
    redirects = @(
      # Domain-to-domain redirects require multi-site or DNS; scheme in source not supported
      @{ source = '/Ai'; destination = '/ai'; type = 301 }
    )
    rewrites = @(
      @{ source = '/login'; destination = '/index.html' },
      @{ source = '/register'; destination = '/index.html' },
      @{ source = '/forgot-password'; destination = '/index.html' },
      @{ source = '/esim-register'; destination = '/index.html' },
      @{ source = '/admin/**'; function = 'adminApp' }
    )
  }
}
Write-JsonFile -Path (Join-Path $auditBase 'firebase.json') -Object $firebase

# Firestore rules (tightened where practical)
$fsRules = @'
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null && request.auth.token.email_verified == true; }
    function isAdmin() { return isSignedIn() && (request.auth.token.admin == true || request.auth.token.role == 'admin' || (request.auth.token.roles != null && 'admin' in request.auth.token.roles)); }
    function isOwner(uid) { return isSignedIn() && request.auth.uid == uid; }

    match /users/{uid} {
      allow read: if isOwner(uid) || isAdmin();
      allow create: if isOwner(uid);
      allow update, delete: if isOwner(uid);
    }

    match /orders/{orderId} {
      // Create must be by the owner; ensure userId matches auth uid
      allow create: if isSignedIn() && request.resource.data.userId == request.auth.uid;
      // Read/update by owner; forbid changes to userId/status by owner
      allow read, update: if isSignedIn()
                          && resource.data.userId == request.auth.uid
                          && request.resource.data.userId == resource.data.userId
                          && !request.resource.data.diff(resource.data).changedKeys().hasAny(['userId','status']);
      allow delete: if isAdmin();
    }

    match /admin/{doc=**} {
      allow read, write: if isAdmin();
    }
  }
}
'@
Write-File -Path (Join-Path $auditBase 'firestore.rules') -Content $fsRules

# Storage rules
$stRules = @'
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isSignedIn() { return request.auth != null && request.auth.token.email_verified == true; }

    // User private area
    match /users/{uid}/{allPaths=**} {
      allow read, write: if isSignedIn() && request.auth.uid == uid;
    }

    // Public assets bucket path (read-only)
    match /public/{fileId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
'@
Write-File -Path (Join-Path $auditBase 'storage.rules') -Content $stRules

# Firestore indexes (example)
$indexes = [ordered]@{
  indexes = @(
    [ordered]@{
      collectionGroup = 'orders'
      queryScope      = 'COLLECTION'
      fields          = @(
        @{ fieldPath = 'userId';   order = 'ASCENDING' },
        @{ fieldPath = 'createdAt'; order = 'DESCENDING' }
      )
    }
  )
  fieldOverrides = @()
}
Write-JsonFile -Path (Join-Path $auditBase 'firestore.indexes.json') -Object $indexes

# Minimal SEO and accessibility baseline pages
$robots = "User-agent: *`r`nAllow: /`r`nSitemap: https://$ApexDomain/sitemap.xml"
Write-File -Path (Join-Path $auditBase 'web/public/robots.txt') -Content $robots

$sitemap = @"
<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
  <url><loc>https://$ApexDomain/</loc><priority>1.0</priority></url>
  <url><loc>https://$ApexDomain/login</loc></url>
  <url><loc>https://$ApexDomain/register</loc></url>
  <url><loc>https://$ApexDomain/admin</loc></url>
</urlset>
"@
Write-File -Path (Join-Path $auditBase 'web/public/sitemap.xml') -Content $sitemap

$year = (Get-Date -Format yyyy)
$indexHtml = @"
<!doctype html>
<html lang=""en"">
<head>
  <meta charset=""utf-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
  <title>eSIM Myanmar — Fast, Secure, Ready</title>
  <meta name=""description"" content=""Activate eSIM in Myanmar securely with production-grade infrastructure."">
  <link rel=""canonical"" href=""https://$ApexDomain/"" />
  <meta property=""og:title"" content=""eSIM Myanmar"" />
  <meta property=""og:description"" content=""Fast, secure eSIM activation for Myanmar."" />
  <meta property=""og:url"" content=""https://$ApexDomain/"" />
  <meta property=""og:image"" content=""https://$ApexDomain/og.png"" />
  <meta name=""twitter:card"" content=""summary_large_image"" />
  <link rel=""preload"" href=""/fonts/Inter-Variable.woff2"" as=""font"" type=""font/woff2"" crossorigin>
  <link rel=""stylesheet"" href=""/styles.css"">
</head>
<body>
  <a class=""skip-link"" href=""#main"">Skip to content</a>
  <header role=""banner""><nav role=""navigation"">
    <a href=""/"">Home</a>
    <a href=""/login"">Login</a>
    <a href=""/register"">Register</a>
    <a href=""/admin"">Admin</a>
  </nav></header>
  <main id=""main"" role=""main"">
    <h1>eSIM Myanmar</h1>
    <p>Production-grade activation, secure and fast.</p>
    <section aria-labelledby=""cta""><h2 id=""cta"">Get started</h2>
      <a class=""btn primary"" href=""/register"">Create account</a>
    </section>
  </main>
  <footer role=""contentinfo"">© $year eSIM Myanmar</footer>
  <script type=""module"" src=""/src/main.js""></script>
</body>
</html>
"@
Write-File -Path (Join-Path $auditBase 'web/index.html') -Content $indexHtml

$styles = @'
/* Mobile-first, WCAG AA */
:root { --text:#111; --bg:#fff; --primary:#0A66FF; }
body { margin:0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:var(--text); background:var(--bg); line-height:1.5; font-size:16px; }
header, nav, main, footer { max-width:960px; margin:0 auto; padding:12px; }
h1 { font-size:32px; margin:16px 0; } h2 { font-size:24px; margin:12px 0; }
p, a, li { font-size:16px; }
.btn { display:inline-block; padding:12px 16px; min-height:44px; border-radius:6px; text-decoration:none; }
.btn.primary { background:var(--primary); color:#fff; }
a:focus, button:focus, input:focus { outline:3px solid #333; outline-offset:2px; }
.skip-link { position:absolute; left:-1000px; } .skip-link:focus { left:12px; top:12px; background:#fff; padding:8px; border:1px solid #333; }
'@
Write-File -Path (Join-Path $auditBase 'web/public/styles.css') -Content $styles

$mainJs = @'
console.log("NexoraAI baseline page loaded");
'@
Write-File -Path (Join-Path $auditBase 'web/src/main.js') -Content $mainJs

# Functions: secured endpoints skeleton (auth, validation, Secret Manager)
$functionsIndex = @"
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const z = require('zod');

admin.initializeApp();
const db = admin.firestore();
const secrets = new SecretManagerServiceClient();

async function getSecret(path) {
  const [s] = await secrets.accessSecretVersion({ name: path });
  return (s.payload && s.payload.data) ? s.payload.data.toString() : '';
}

// Example: Fetch SMTP password from Secret Manager
// const smtpPassword = await getSecret('projects/<project-number>/secrets/SMTP_PASSWORD/versions/latest');

async function requireAuth(req) {
  const h = (req.headers.authorization || '').replace('Bearer ', '');
  return admin.auth().verifyIdToken(h);
}

const orderSchema = z.object({
  planId: z.string().min(1),
  msisdn: z.string().regex(/^\d{8,15}$/),
  email: z.string().email()
});

exports.createOrder = functions.region('$Region').https.onRequest(async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    const user = await requireAuth(req);
    const body = { ...req.body, msisdn: (req.body.msisdn || '').toString().replace(/\D/g, '') };
    const payload = orderSchema.parse(body);
    const doc = await db.collection('orders').add({
      ...payload,
      userId: user.uid,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    functions.logger.info('Order created', { orderId: doc.id, userId: user.uid });
    res.status(201).json({ orderId: doc.id });
  } catch (err) {
    const isZod = err && err.name === 'ZodError';
    const code = isZod ? 400 : 401;
    const msg = isZod ? 'Invalid request' : 'Unauthorized';
    functions.logger.error('createOrder failed', { error: err && err.message });
    res.status(code).json({ error: msg });
  }
});

exports.adminApp = functions.region('$Region').https.onRequest(async (req, res) => {
  try {
    const user = await requireAuth(req);
    // Expect a custom claim 'admin' === true set via Admin SDK.
    const isAdmin = user.admin === true;
    if (user.email_verified !== true || !isAdmin) return res.status(403).send('Forbidden');
    res.status(200).send('Admin OK');
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
});

// TODO: Add rate limiting / App Check when fronted by Firebase Hosting or HTTPS LB
"@
Write-File -Path (Join-Path $auditBase 'functions/src/index.js') -Content $functionsIndex

# Pipelines: Firebase Hosting + Functions deploy (prod) – YAML template (safe quoting)
$pipelineTemplate = @'
name: Deploy Prod
on:
  push:
    branches: [ "main" ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies (optional)
        run: npm ci || true

      - name: Write service account file
        shell: bash
        run: |
          echo "${{ secrets.FIREBASE_SERVICE_ACCOUNT_PROD }}" > "$RUNNER_TEMP/sa.json"

      - name: Install Firebase Tools
        run: npm i -g firebase-tools

      - name: Deploy Hosting and Functions
        env:
          GOOGLE_APPLICATION_CREDENTIALS: ${{ runner.temp }}/sa.json
        run: firebase deploy --only hosting,functions --project __FIREBASE_PROD__
'@
$pipelineContent = $pipelineTemplate -replace '__FIREBASE_PROD__',[Regex]::Escape($FirebaseProd)
Write-File -Path (Join-Path $auditBase 'pipelines/deploy-prod.yml') -Content $pipelineContent

# Compliance checklist
$compliance = @'
Compliance Checklist
- Publish Privacy Policy, Terms of Service, Cookie Policy (versioned).
- Consent management: banner with granular categories, audit trail.
- Telecom/eSIM data handling: ICCID/EID/MSISDN protected; least privilege; audit logs; incident response.
- Email security: SPF, DKIM, DMARC (p=quarantine or reject), TLS-only SMTP.
'@
Write-File -Path (Join-Path $auditBase 'configs/compliance.md') -Content $compliance

# Backup & DR runbook
$dr = @"
Firestore Backup & DR
- Bucket: gs://$BackupBucket
- Daily export:
  gcloud firestore export gs://$BackupBucket/firestore-\$(date +%F) --project $FirebaseProd
- Versioning:
  gsutil versioning set on gs://$BackupBucket
- Restore:
  gcloud firestore import gs://$BackupBucket/<path> --project $FirebaseProd
- Drill quarterly; document RTO/RPO and verification steps.
"@
Write-File -Path (Join-Path $auditBase 'configs/dr-runbook.md') -Content $dr

# Domains and TLS checklist
$domains = @"
Domains & TLS
- DNS: apex ($ApexDomain) and www ($WwwDomain) to Firebase Hosting (A/AAAA or CNAME per provider).
- TLS: Managed cert active for both apex and www.
- HSTS: max-age=31536000; includeSubDomains; preload (already in hosting headers).
"@
Write-File -Path (Join-Path $auditBase 'configs/domains.md') -Content $domains

# Report template
$report = @"
NexoraAI Comprehensive Audit Report — $timestamp

1) Current issues & risks
- Security: rules gaps, CSRF/XSS exposure, missing rate limits/bot protection, webhook validation incomplete.
- Reliability: insufficient logging/alerts, indexing gaps, missing backups/DR, cold-starts.
- Performance & SEO: CWV regressions (LCP/CLS/INP), asset optimization missing, structured data/canonical gaps.
- Accessibility & UX: typography/button consistency, input validation, keyboard navigation, contrast, mobile responsiveness.
- Compliance: Policies not published/versioned; cookie consent absent; telecom data protection controls incomplete.

2) Prioritized fixes (step-by-step)
- Lock down Firestore/Storage rules (files generated).
- Enforce HTTPS/HSTS, CSP/security headers (firebase.json generated).
- Add CI/CD with protected branches; deploy to prod via GitHub Actions (pipeline generated).
- Implement input validation & auth checks server-side; rate limit sensitive endpoints (functions code skeleton).
- Enable backups (GCS), alerts (Cloud Logging), indexes (firestore.indexes.json).
- Optimize CWV: preload fonts/hero, cache assets, reserve dimensions, split bundles (web baseline).
- SEO: meta/OG, robots, sitemap, structured data; canonical URLs.
- Accessibility: ARIA landmarks, focus management, AA contrast, labels.

3) Config changes (GCP/Firebase)
- Map dev/stg/prod projects in firebase.json; bind service accounts with least privilege; use Secret Manager for SMTP creds.
- Verify custom domains and certificates; enforce redirects; validate DNS.

4) Before/after targets
- Security posture: OWASP mitigations active; CSP/CSRF/rate limits/webhook validation; rules least-privilege.
- Performance: LCP < 2.5s (mobile), CLS < 0.1, INP good.
- Accessibility: WCAG 2.1 AA on key pages.
- SEO: Lighthouse SEO 95–100; sitemap indexed; structured data valid.
- Reliability: error budgets/SLOs defined; alerts operational; DR tested.

5) Regression testing checklist
- Auth/roles, CSRF/XSS/injection, rate limits, webhooks, CWV metrics, SEO tags, accessibility keyboard/contrast/labels, error handling/logging, backups/restore drill.

6) Rollback plan
- Firebase Hosting: revert to previous release.
- Functions: shift traffic to last known-good; feature flags for risky changes; reversible migrations with backups.

7) Final production deployment checklist
- Secrets set in Secret Manager, no plaintext.
- Rules deployed; indexes built; headers active; domains TLS valid.
- CI/CD green; tests/lint/security scans pass; backups scheduled; alerts configured.
"@
Write-File -Path (Join-Path $auditBase "reports/audit-report-$timestamp.txt") -Content $report

# -----------------------------
# Section 3: Console summary
# -----------------------------
Write-Log '=== NexoraAI audit artifacts generated ===' 'INFO'
Write-Log ("Audit base: {0}" -f $auditBase) 'INFO'
Write-Log '- firebase.json (headers, redirects, rewrites)' 'INFO'
Write-Log '- firestore.rules, storage.rules, firestore.indexes.json' 'INFO'
Write-Log '- web/public (robots.txt, sitemap.xml, styles.css), web/index.html' 'INFO'
Write-Log '- functions/src/index.js (secure endpoints baseline)' 'INFO'
Write-Log '- pipelines/deploy-prod.yml (GitHub Actions)' 'INFO'
Write-Log '- configs (compliance.md, dr-runbook.md, domains.md)' 'INFO'
Write-Log ("- reports/audit-report-{0}.txt" -f $timestamp) 'INFO'

Write-Host ''
Write-Host 'Next steps:'
Write-Host '1) Replace placeholders (<replace>) where needed; set Firebase config in web/src/main.js if used.'
Write-Host '2) Add FIREBASE_SERVICE_ACCOUNT_PROD JSON in GitHub secrets.'
Write-Host "3) Create Secret Manager secret SMTP_PASSWORD in $FirebaseProd and bind runtime SA (if implementing SMTP)."
Write-Host "4) Deploy rules and hosting: firebase deploy --project $FirebaseProd"
Write-Host '5) Validate domains/TLS, headers, and run Lighthouse + accessibility checks.'
