# REPOSITORY SECRETS CONFIGURATION
## GitHub Repository: nexorasim/emergent
### Required for Deployment Success

---

## SECRETS TO ADD

Navigate to: https://github.com/nexorasim/emergent/settings/secrets/actions

### Firebase Deployment
**Name**: FIREBASE_SERVICE_ACCOUNT
**Value**: Firebase service account JSON
```json
{
  "type": "service_account",
  "project_id": "esim-myanmar-ia6gw",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

### Vercel Deployment
**Name**: VERCEL_TOKEN
**Value**: Vercel deployment token
- Get from: https://vercel.com/account/tokens

**Name**: VERCEL_ORG_ID
**Value**: Vercel organization ID
- Get from: Vercel project settings

**Name**: VERCEL_PROJECT_ID
**Value**: Vercel project ID
- Get from: Vercel project settings

---

## GITHUB PAGES SETUP

Repository Settings > Pages:
- Source: GitHub Actions
- Custom domain: esim.com.mm
- Enforce HTTPS: Enabled

---

## WORKFLOW FIXES APPLIED

### Error Handling
- Build failures: Stop execution
- Deployment failures: Continue with other platforms
- Production dependencies only

### Optimizations
- Node.js 18 LTS
- npm ci for deterministic builds
- Proper working directories
- Sequential deployment

---

**STATUS: ALL FIXES APPLIED - CONFIGURE SECRETS TO DEPLOY**

Add repository secrets and workflow will execute successfully.

---

Date: December 26, 2025
Repository: nexorasim/emergent
Status: READY FOR SECRETS CONFIGURATION