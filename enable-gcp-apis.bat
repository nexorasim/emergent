@echo off
REM =====================================================================
REM Complete API Enable Script (Maximum Coverage, Free-Tier Compatible)
REM Project: still-habitat-459915-i5
REM Project Number: 75981602115
REM =====================================================================

set PROJECT_ID=still-habitat-459915-i5
set PROJECT_NUM=75981602115

REM Set project context
gcloud config set project %PROJECT_ID%

echo Enabling all required APIs for project: %PROJECT_ID% (%PROJECT_NUM%)...

REM Enable all APIs in one command
gcloud services enable ^
  cloudresourcemanager.googleapis.com ^
  serviceusage.googleapis.com ^
  iam.googleapis.com ^
  iamcredentials.googleapis.com ^
  sts.googleapis.com ^
  firebase.googleapis.com ^
  firebasehosting.googleapis.com ^
  firebaserules.googleapis.com ^
  identitytoolkit.googleapis.com ^
  securetoken.googleapis.com ^
  firebaseappcheck.googleapis.com ^
  firestore.googleapis.com ^
  firebasedatabase.googleapis.com ^
  storage.googleapis.com ^
  cloudfunctions.googleapis.com ^
  run.googleapis.com ^
  eventarc.googleapis.com ^
  pubsub.googleapis.com ^
  compute.googleapis.com ^
  artifactregistry.googleapis.com ^
  cloudbuild.googleapis.com ^
  logging.googleapis.com ^
  monitoring.googleapis.com ^
  cloudtrace.googleapis.com ^
  cloudprofiler.googleapis.com ^
  clouddebugger.googleapis.com ^
  secretmanager.googleapis.com ^
  cloudtasks.googleapis.com ^
  cloudscheduler.googleapis.com ^
  apikeys.googleapis.com ^
  servicemanagement.googleapis.com ^
  servicecontrol.googleapis.com ^
  dns.googleapis.com ^
  domains.googleapis.com ^
  certificatemanager.googleapis.com ^
  trafficdirector.googleapis.com ^
  runapps.googleapis.com ^
  workflowexecutions.googleapis.com ^
  workflows.googleapis.com ^
  notebooks.googleapis.com ^
  bigquery.googleapis.com

echo Completed. All required APIs have been enabled for project: %PROJECT_ID%
pause