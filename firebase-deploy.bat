@echo off
echo [1%] Firebase CLI Installation and Deployment Setup

echo [10%] Installing Firebase CLI...
npm install -g firebase-tools

echo [20%] Firebase Login (browser will open)...
firebase login

echo [30%] Initializing Firebase project...
cd frontend
firebase init hosting

echo [40%] Configuring firebase.json...
echo { > firebase.json
echo   "hosting": { >> firebase.json
echo     "public": "build", >> firebase.json
echo     "ignore": [ >> firebase.json
echo       "firebase.json", >> firebase.json
echo       "**/.*", >> firebase.json
echo       "**/node_modules/**" >> firebase.json
echo     ], >> firebase.json
echo     "rewrites": [ >> firebase.json
echo       { >> firebase.json
echo         "source": "**", >> firebase.json
echo         "destination": "/index.html" >> firebase.json
echo       } >> firebase.json
echo     ] >> firebase.json
echo   } >> firebase.json
echo } >> firebase.json

echo [60%] Building React application...
npm run build

echo [80%] Deploying to Firebase Hosting...
firebase deploy --only hosting --project esim-myanmar-ia6gw

echo [100%] Firebase deployment complete!
echo Live URL: https://esim-myanmar-ia6gw.web.app
echo Custom domain: https://www.esim.com.mm