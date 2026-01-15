# DEPLOYMENT AUTHENTICATION GUIDE

## CLI Tools Installed Successfully

- Firebase CLI: Installed
- Wrangler CLI: Installed  
- Vercel CLI: Installed

## Authentication Required

All CLI tools require interactive browser-based authentication which cannot be automated in this environment.

## Manual Deployment Steps

### 1. Firebase Hosting

```bash
firebase login
cd /app/frontend
firebase deploy --only hosting --project esim-myanmar-ia6gw
```

**Alternative - CI/CD Token:**
```bash
firebase login:ci
# Copy the token
export FIREBASE_TOKEN="your-token"
firebase deploy --only hosting --project esim-myanmar-ia6gw --token "$FIREBASE_TOKEN"
```

### 2. Cloudflare Pages

```bash
wrangler login
cd /app/frontend
wrangler pages publish build --project-name=esim-myanmar
```

**Alternative - API Token:**
```bash
export CLOUDFLARE_API_TOKEN="your-token"
wrangler pages publish build --project-name=esim-myanmar
```

### 3. Vercel

```bash
vercel login
cd /app/frontend
vercel --prod
```

**Alternative - Token:**
```bash
export VERCEL_TOKEN="your-token"
vercel --prod --token "$VERCEL_TOKEN"
```

### 4. Git Push

```bash
# Option 1: Personal Access Token
git remote set-url origin https://YOUR_TOKEN@github.com/nexorasim/emergent.git
git push origin main --force

# Option 2: GitHub CLI
gh auth login
git push origin main --force
```

## Web Console Deployment (No CLI Required)

### Firebase
1. Go to https://console.firebase.google.com
2. Select: esim-myanmar-ia6gw
3. Hosting > Add release
4. Upload: /app/frontend/build

### Cloudflare
1. Go to https://dash.cloudflare.com
2. Pages > esim-myanmar
3. Create deployment
4. Upload: /app/frontend/build

### Vercel
1. Go to https://vercel.com/dashboard
2. Add New > Project
3. Import or drag-drop: /app/frontend/build

### GitHub
1. Go to https://github.com/nexorasim/emergent
2. Upload files or use GitHub Desktop
3. Commit: "Complete optimization 2026-01-15"

## Build Ready

**Location:** /app/frontend/build
**Status:** Production-ready
**Size:** Optimized
**Commits:** 276 on main branch

## Verification URLs

After deployment, verify at:
- https://esim-myanmar-ia6gw.web.app
- https://esim-myanmar.pages.dev
- https://esim-myanmar.vercel.app
- https://esim.com.mm

---

ESIM MYANMAR COMPANY LIMITED
Copyright 2025-2026
