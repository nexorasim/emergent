# FIREBASE DEPLOYMENT INSTRUCTIONS

## Interactive Login Required

Firebase requires interactive browser authentication.

### Option 1: Generate CI Token (Recommended)

Run on your local machine:
```bash
firebase login:ci
```

Copy the token, then deploy:
```bash
cd /app/frontend
firebase deploy --only hosting --project esim-myanmar-ia6gw --token YOUR_TOKEN
```

### Option 2: Use Firebase Console

1. Go to https://console.firebase.google.com
2. Select project: esim-myanmar-ia6gw
3. Navigate to: Hosting
4. Click: Add release
5. Upload directory: /app/frontend/build

### Option 3: Local Machine Deployment

On your local machine with browser access:
```bash
firebase login
cd /app/frontend
firebase deploy --only hosting --project esim-myanmar-ia6gw
```

## Build Ready

Location: /app/frontend/build
Status: Production-ready
Size: Optimized

## Verification

After deployment, verify at:
https://esim-myanmar-ia6gw.web.app

---

ESIM MYANMAR COMPANY LIMITED
