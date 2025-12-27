# GITHUB CLI LOG STATUS
## eSIM Myanmar Platform
### Date: December 26, 2025

---

## COMMAND STATUS

### GitHub CLI Check
```bash
gh run view --log-failed
```
Status: COMMAND NOT AVAILABLE
Reason: GitHub CLI not installed

---

## GITHUB CLI INSTALLATION

### Download and Install
- URL: https://cli.github.com
- Windows: Download installer or use winget
- Command: `winget install GitHub.cli`

### Authentication Required
```bash
gh auth login
```

---

## LOG VIEWING COMMANDS

### After GitHub CLI Installation
```bash
# View failed workflow logs
gh run view --log-failed

# List all workflow runs
gh run list --workflow=deploy.yml

# View specific run logs
gh run view [RUN_ID] --log

# View workflow status
gh workflow view deploy.yml
```

---

## ALTERNATIVE LOG ACCESS

### GitHub Web Interface
- Navigate to: https://github.com/nexorasim/emergent/actions
- Select workflow run
- View logs in browser
- Download log files

### Workflow Status Check
- Repository: nexorasim/emergent
- Workflow: deploy.yml
- Status: CONFIGURED (not executed)

---

## DEPLOYMENT WORKFLOW STATUS

### Configuration: READY
- Workflow file: CREATED
- Deployment targets: CONFIGURED
- Secrets: REQUIRED (manual setup)
- Triggers: Push to main, manual dispatch

### Required Secrets
```
FIREBASE_SERVICE_ACCOUNT
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

---

**STATUS: GITHUB CLI NOT INSTALLED**

Install GitHub CLI to view workflow logs and manage deployments.

---

Date: December 26, 2025
Platform: eSIM Myanmar Enterprise