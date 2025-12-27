# CLI Installation & Deployment Guide

## Install CLIs

### Google Cloud CLI
```bash
# Download: https://cloud.google.com/sdk/docs/install
gcloud auth login
gcloud config set project esim-myanmar-ia6gw
```

### Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### GitHub CLI
```bash
# Download: https://cli.github.com/
gh auth login
```

### Cloudflare Workers CLI
```bash
npm install -g wrangler
wrangler login
```

## Deploy Commands
```bash
# GitHub
git add . && git commit -m "Deploy: All CLIs ready" && git push origin main

# Firebase
cd frontend && firebase deploy --only hosting

# Vercel (if available)
vercel --prod

# Cloudflare Workers
wrangler pages publish build --project-name=esim-myanmar
```

## Status
- All CLI tools ready for installation
- Deployment commands prepared
- Project: esim-myanmar-ia6gw

**Install CLIs then execute deployment commands**