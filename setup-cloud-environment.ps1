# =====================================================================
# All-in-One Cloud Environment + GCP APIs Setup (Windows PowerShell)
# - Installs: Chocolatey, Git, Node.js, Python, Google Cloud SDK, Docker
# - Installs: Firebase CLI, Google AI SDK (Gemini), gen CLI
# - Configures: gcloud project
# - Enables: Firebase + Auth + Firestore + Functions v2 + Cloud Run + Docker + MCP APIs
# - Updated: Firebase URL https://esim-myanmar-ia6gw.web.app
# =====================================================================

# -----------------------------
# Project configuration
# -----------------------------
$PROJECT_ID  = "still-habitat-459915-i5"
$PROJECT_NUM = "75981602115"
$FIREBASE_PROJECT = "esimmyanmar-09289140-4db73"
$FIREBASE_URL = "https://esimmyanmar-09289140-4db73.web.app"

Write-Host "[1%] Starting unified installation and configuration for project: $PROJECT_ID ($PROJECT_NUM)..."
Write-Host "Firebase URL: $FIREBASE_URL"

# =====================================================================
# 1. Install Chocolatey (package manager)
# =====================================================================
Write-Host "[5%] Installing Chocolatey..."
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Reload environment
if (Get-Command refreshenv -ErrorAction SilentlyContinue) {
    refreshenv
}

# =====================================================================
# 2. Install base tools: Git, Node.js, Python, Docker Desktop
# =====================================================================
Write-Host "[10%] Installing Git..."
choco install git -y

Write-Host "[15%] Installing Node.js..."
choco install nodejs -y

Write-Host "[20%] Installing Python..."
choco install python -y

Write-Host "[25%] Installing Docker Desktop..."
choco install docker-desktop -y

# Reload environment after installs
if (Get-Command refreshenv -ErrorAction SilentlyContinue) {
    refreshenv
}

# =====================================================================
# 3. Install Google Cloud SDK
# =====================================================================
Write-Host "[30%] Installing Google Cloud SDK..."
choco install gcloudsdk -y

# Reload environment to get gcloud on PATH
if (Get-Command refreshenv -ErrorAction SilentlyContinue) {
    refreshenv
}

# =====================================================================
# 4. Initialize gcloud and set project
# =====================================================================
Write-Host "[40%] Initializing gcloud (you will be prompted to login)..."
gcloud init

Write-Host "[45%] Setting gcloud project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# =====================================================================
# 5. Install Firebase CLI, Google AI SDK, gen CLI
# =====================================================================
Write-Host "[50%] Installing Firebase CLI..."
npm install -g firebase-tools

Write-Host "[55%] Installing Google AI SDK (Gemini)..."
pip install google-generativeai

Write-Host "[60%] Installing gen CLI..."
pip install google-genai

# =====================================================================
# 6. Enable required Google Cloud APIs for this project
# =====================================================================
Write-Host "[70%] Enabling required Google Cloud APIs for project: $PROJECT_ID ($PROJECT_NUM)..."

$apis = @(
    # Core GCP
    "cloudresourcemanager.googleapis.com",
    "serviceusage.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "sts.googleapis.com",

    # Firebase Core
    "firebase.googleapis.com",
    "firebasehosting.googleapis.com",
    "firebaserules.googleapis.com",

    # Authentication
    "identitytoolkit.googleapis.com",
    "securetoken.googleapis.com",
    "firebaseappcheck.googleapis.com",

    # Firestore + Realtime Database
    "firestore.googleapis.com",
    "firebasedatabase.googleapis.com",

    # Cloud Storage
    "storage.googleapis.com",

    # Cloud Functions v2 stack (Run + Eventarc + Pub/Sub + Compute)
    "cloudfunctions.googleapis.com",
    "run.googleapis.com",
    "eventarc.googleapis.com",
    "pubsub.googleapis.com",
    "compute.googleapis.com",

    # Docker / Artifact Registry / Build
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",

    # Monitoring / Logging / Tracing
    "logging.googleapis.com",
    "monitoring.googleapis.com",
    "cloudtrace.googleapis.com",
    "cloudprofiler.googleapis.com",
    "clouddebugger.googleapis.com",

    # Secret Manager
    "secretmanager.googleapis.com",

    # Task / Scheduler
    "cloudtasks.googleapis.com",
    "cloudscheduler.googleapis.com",

    # MCP-compatible backend services
    "apikeys.googleapis.com",
    "servicemanagement.googleapis.com",
    "servicecontrol.googleapis.com",

    # Networking (free-tier safe)
    "dns.googleapis.com",
    "domains.googleapis.com",
    "certificatemanager.googleapis.com",
    "trafficdirector.googleapis.com",

    # Serverless + Workflows
    "runapps.googleapis.com",
    "workflowexecutions.googleapis.com",
    "workflows.googleapis.com",

    # Optional but free-tier safe
    "notebooks.googleapis.com",
    "bigquery.googleapis.com"
)

# Enable all APIs in one call
Write-Host "[80%] Enabling APIs..."
gcloud services enable $apis

# =====================================================================
# 7. Final checks
# =====================================================================
Write-Host "[90%] Verifying installations and configuration..."

Write-Host "`n=== gcloud version ==="
gcloud --version

Write-Host "`n=== Firebase CLI version ==="
firebase --version

Write-Host "`n=== Google AI SDK version ==="
python -c "import google.generativeai as gen; print(gen.__version__)"

Write-Host "`n=== gen CLI help ==="
gen --help

Write-Host "`nProject configuration:"
gcloud config list

Write-Host "[100%] All tools installed and APIs enabled for project: $PROJECT_ID ($PROJECT_NUM)."
Write-Host "Firebase project: $FIREBASE_PROJECT"
Write-Host "Firebase URL: $FIREBASE_URL"
Write-Host "Custom domain: https://www.esim.com.mm"
Write-Host "Unified setup completed successfully."
