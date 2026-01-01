#!/usr/bin/env bash

# =====================================================================
# Complete API Enable Script (Maximum Coverage, Free-Tier Compatible)
# Project: still-habitat-459915-i5
# Project Number: 75981602115
# =====================================================================

PROJECT_ID="still-habitat-459915-i5"
PROJECT_NUM="75981602115"

# Set project context
gcloud config set project "$PROJECT_ID"

# =====================================================================
# API List: Firebase + Auth + Hosting + Firestore + Functions v2 + Docker
# =====================================================================

APIS=(

  # -------------------------------------------------------------------
  # Core GCP
  # -------------------------------------------------------------------
  "cloudresourcemanager.googleapis.com"
  "serviceusage.googleapis.com"
  "iam.googleapis.com"
  "iamcredentials.googleapis.com"
  "sts.googleapis.com"

  # -------------------------------------------------------------------
  # Firebase Core
  # -------------------------------------------------------------------
  "firebase.googleapis.com"
  "firebasehosting.googleapis.com"
  "firebaserules.googleapis.com"

  # -------------------------------------------------------------------
  # Authentication
  # -------------------------------------------------------------------
  "identitytoolkit.googleapis.com"
  "securetoken.googleapis.com"
  "firebaseappcheck.googleapis.com"

  # -------------------------------------------------------------------
  # Firestore + Realtime Database
  # -------------------------------------------------------------------
  "firestore.googleapis.com"
  "firebasedatabase.googleapis.com"

  # -------------------------------------------------------------------
  # Cloud Storage
  # -------------------------------------------------------------------
  "storage.googleapis.com"

  # -------------------------------------------------------------------
  # Cloud Functions v2 (requires Run + Eventarc + Pub/Sub)
  # -------------------------------------------------------------------
  "cloudfunctions.googleapis.com"
  "run.googleapis.com"
  "eventarc.googleapis.com"
  "pubsub.googleapis.com"
  "compute.googleapis.com"

  # -------------------------------------------------------------------
  # Docker / Artifact Registry / Build System
  # -------------------------------------------------------------------
  "artifactregistry.googleapis.com"
  "cloudbuild.googleapis.com"

  # -------------------------------------------------------------------
  # Monitoring / Logging / Tracing
  # -------------------------------------------------------------------
  "logging.googleapis.com"
  "monitoring.googleapis.com"
  "cloudtrace.googleapis.com"
  "cloudprofiler.googleapis.com"
  "clouddebugger.googleapis.com"

  # -------------------------------------------------------------------
  # Secret Manager
  # -------------------------------------------------------------------
  "secretmanager.googleapis.com"

  # -------------------------------------------------------------------
  # Task / Scheduler / Queue
  # -------------------------------------------------------------------
  "cloudtasks.googleapis.com"
  "cloudscheduler.googleapis.com"

  # -------------------------------------------------------------------
  # MCP-compatible backend services
  # -------------------------------------------------------------------
  "apikeys.googleapis.com"
  "servicemanagement.googleapis.com"
  "servicecontrol.googleapis.com"

  # -------------------------------------------------------------------
  # Networking (free-tier safe)
  # -------------------------------------------------------------------
  "compute.googleapis.com"
  "dns.googleapis.com"
  "domains.googleapis.com"
  "certificatemanager.googleapis.com"
  "trafficdirector.googleapis.com"

  # -------------------------------------------------------------------
  # Serverless + Eventing
  # -------------------------------------------------------------------
  "runapps.googleapis.com"
  "workflowexecutions.googleapis.com"
  "workflows.googleapis.com"

  # -------------------------------------------------------------------
  # Optional but free-tier safe
  # -------------------------------------------------------------------
  "notebooks.googleapis.com"
  "bigquery.googleapis.com"
)

# =====================================================================
# Enable all APIs
# =====================================================================

echo "Enabling all required APIs for project: $PROJECT_ID ($PROJECT_NUM)..."
gcloud services enable "${APIS[@]}"

echo "Completed. All required APIs have been enabled for project: $PROJECT_ID"