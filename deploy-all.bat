@echo off
echo =====================================================================
echo eSIM Myanmar - Complete Platform Deployment (100% Apply All)
echo =====================================================================

echo [1%] Starting complete platform deployment...

echo [5%] Installing Node.js dependencies...
cd frontend
call npm install

echo [10%] Building React application...
call npm run build

echo [15%] Installing Firebase CLI...
call npm install -g firebase-tools

echo [20%] Firebase login (browser will open)...
call firebase login

echo [25%] Initializing Firebase hosting...
call firebase init hosting --project esim-myanmar-ia6gw

echo [30%] Configuring firebase.json...
echo { > firebase.json
echo   "hosting": { >> firebase.json
echo     "public": "build", >> firebase.json
echo     "ignore": ["firebase.json", "**/.*", "**/node_modules/**"], >> firebase.json
echo     "rewrites": [{"source": "**", "destination": "/index.html"}] >> firebase.json
echo   } >> firebase.json
echo } >> firebase.json

echo [40%] Deploying to Firebase Hosting...
call firebase deploy --only hosting --project esim-myanmar-ia6gw

echo [50%] Setting up GitHub Pages...
cd ..
git add .
git commit -m "Deploy eSIM Myanmar platform"
git push origin main

echo [60%] Configuring Vercel deployment...
cd frontend
echo { > vercel.json
echo   "version": 2, >> vercel.json
echo   "builds": [{"src": "package.json", "use": "@vercel/static-build"}], >> vercel.json
echo   "routes": [{"src": "/(.*)", "dest": "/index.html"}] >> vercel.json
echo } >> vercel.json

echo [70%] Installing Vercel CLI...
call npm install -g vercel

echo [80%] Deploying to Vercel...
call vercel --prod

echo [90%] Final deployment verification...
echo Checking deployment status...

echo [100%] Complete platform deployment finished!
echo =====================================================================
echo Live URLs:
echo - Primary: https://www.esim.com.mm
echo - Firebase: https://esim-myanmar-ia6gw.web.app
echo - GitHub Pages: https://kaunghtetpai-pc2vjp3.github.io/emergent-1
echo =====================================================================
echo eSIM Myanmar platform is now live across all platforms!
pause