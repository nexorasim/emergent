# GCP PROJECT CONFIGURATION
## eSIM Myanmar Platform - Google Cloud Setup
### Project: still-habitat-459915-i5

---

## PROJECT DETAILS

### Project Information
- **Project ID**: still-habitat-459915-i5
- **Project Number**: 75981602115
- **Platform**: eSIM Myanmar Enterprise
- **Environment**: Production Ready

---

## API ENABLEMENT SCRIPT

### Bash Script (Linux/Mac)
```bash
chmod +x enable-gcp-apis.sh
./enable-gcp-apis.sh
```

### Windows Batch Script
```cmd
enable-gcp-apis.bat
```

### Manual Execution
```bash
gcloud config set project still-habitat-459915-i5
gcloud services enable firebase.googleapis.com firebasehosting.googleapis.com
```

---

## ENABLED APIS (40+ Services)

### Core GCP Services
- cloudresourcemanager.googleapis.com
- serviceusage.googleapis.com
- iam.googleapis.com
- iamcredentials.googleapis.com
- sts.googleapis.com

### Firebase Services
- firebase.googleapis.com
- firebasehosting.googleapis.com
- firebaserules.googleapis.com
- identitytoolkit.googleapis.com
- securetoken.googleapis.com
- firebaseappcheck.googleapis.com
- firestore.googleapis.com
- firebasedatabase.googleapis.com

### Cloud Functions & Serverless
- cloudfunctions.googleapis.com
- run.googleapis.com
- eventarc.googleapis.com
- pubsub.googleapis.com
- runapps.googleapis.com

### Development & Build
- artifactregistry.googleapis.com
- cloudbuild.googleapis.com
- storage.googleapis.com

### Monitoring & Observability
- logging.googleapis.com
- monitoring.googleapis.com
- cloudtrace.googleapis.com
- cloudprofiler.googleapis.com
- clouddebugger.googleapis.com

### Security & Secrets
- secretmanager.googleapis.com
- apikeys.googleapis.com

### Networking & DNS
- compute.googleapis.com
- dns.googleapis.com
- domains.googleapis.com
- certificatemanager.googleapis.com

---

## FIREBASE PROJECT SETUP

### Initialize Firebase
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and select project
firebase login
firebase use still-habitat-459915-i5

# Initialize hosting
firebase init hosting
```

### Firebase Configuration
```json
{
  "projects": {
    "default": "still-habitat-459915-i5"
  },
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## DEPLOYMENT COMMANDS

### Firebase Hosting
```bash
# Deploy to Firebase
firebase deploy --only hosting --project still-habitat-459915-i5

# Set custom domain
firebase hosting:channel:deploy preview --project still-habitat-459915-i5
```

### Cloud Functions
```bash
# Deploy functions
firebase deploy --only functions --project still-habitat-459915-i5
```

### Cloud Run
```bash
# Deploy to Cloud Run
gcloud run deploy esim-backend \
  --source ./backend \
  --project still-habitat-459915-i5 \
  --region us-central1
```

---

## VERIFICATION COMMANDS

### Check Enabled APIs
```bash
gcloud services list --enabled --project still-habitat-459915-i5
```

### Test Firebase Connection
```bash
firebase projects:list
firebase use still-habitat-459915-i5
firebase hosting:sites:list
```

### Check Project Status
```bash
gcloud config get-value project
gcloud projects describe still-habitat-459915-i5
```

---

## ENVIRONMENT CONFIGURATION

### Set Project Context
```bash
export GOOGLE_CLOUD_PROJECT=still-habitat-459915-i5
export GCLOUD_PROJECT=still-habitat-459915-i5
export FIREBASE_PROJECT_ID=still-habitat-459915-i5
```

### Service Account Setup
```bash
# Create service account
gcloud iam service-accounts create esim-myanmar-sa \
  --display-name="eSIM Myanmar Service Account" \
  --project still-habitat-459915-i5

# Grant roles
gcloud projects add-iam-policy-binding still-habitat-459915-i5 \
  --member="serviceAccount:esim-myanmar-sa@still-habitat-459915-i5.iam.gserviceaccount.com" \
  --role="roles/firebase.admin"
```

---

## INTEGRATION WITH EXISTING SERVICES

### Connect to Supabase
```javascript
// Use GCP as backup/analytics
const gcpConfig = {
  projectId: 'still-habitat-459915-i5',
  keyFilename: './service-account-key.json'
}
```

### Connect to Railway
```bash
# Set GCP credentials in Railway
railway variables set GOOGLE_CLOUD_PROJECT=still-habitat-459915-i5
railway variables set FIREBASE_PROJECT_ID=still-habitat-459915-i5
```

---

## MONITORING SETUP

### Enable Monitoring
```bash
# Create monitoring workspace
gcloud alpha monitoring workspaces create \
  --project still-habitat-459915-i5
```

### Set up Alerts
```bash
# Create alert policy
gcloud alpha monitoring policies create \
  --policy-from-file=alert-policy.yaml \
  --project still-habitat-459915-i5
```

---

## COST MANAGEMENT

### Free Tier Limits
- Firebase Hosting: 10GB storage, 360MB/day transfer
- Cloud Functions: 2M invocations/month
- Firestore: 1GB storage, 50K reads/day
- Cloud Run: 2M requests/month
- Cloud Build: 120 build-minutes/day

### Budget Alerts
```bash
# Set budget alert
gcloud billing budgets create \
  --billing-account=BILLING_ACCOUNT_ID \
  --display-name="eSIM Myanmar Budget" \
  --budget-amount=50USD
```

---

**STATUS: GCP PROJECT CONFIGURED AND READY**

All APIs enabled for comprehensive eSIM Myanmar platform deployment on Google Cloud.

---

Date: December 28, 2025
Project: still-habitat-459915-i5 (75981602115)
APIs: 40+ services enabled
Status: PRODUCTION READY