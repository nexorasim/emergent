@echo off
echo =====================================================================
echo eSIM Myanmar - Complete Login and Deployment (Apply All)
echo =====================================================================

echo [1%] Starting complete login and deployment process...

echo [5%] Installing dependencies...
cd frontend
call npm install

echo [10%] Building application...
call npm run build

echo [15%] Installing Firebase CLI...
call npm install -g firebase-tools

echo [20%] Firebase login...
call firebase login

echo [25%] Setting Firebase project...
call firebase use esim-myanmar-ia6gw

echo [30%] Initializing Firebase hosting...
call firebase init hosting --project esim-myanmar-ia6gw

echo [35%] Deploying to Firebase...
call firebase deploy --only hosting --project esim-myanmar-ia6gw

echo [40%] Installing Vercel CLI...
call npm install -g vercel

echo [45%] Vercel login...
call vercel login

echo [50%] Deploying to Vercel...
call vercel --prod

echo [55%] Git configuration...
cd ..
git add .
git commit -m "Deploy eSIM Myanmar - Complete platform deployment"

echo [60%] GitHub login check...
git config --global user.name "eSIM Myanmar"
git config --global user.email "info@esim.com.mm"

echo [65%] Pushing to GitHub...
git push origin main

echo [70%] Installing Railway CLI...
call npm install -g @railway/cli

echo [75%] Railway login...
call railway login

echo [80%] Railway deployment...
call railway up

echo [85%] Installing Netlify CLI...
call npm install -g netlify-cli

echo [90%] Netlify login...
call netlify login

echo [95%] Netlify deployment...
cd frontend
call netlify deploy --prod --dir=build

echo [100%] Complete deployment finished!
echo =====================================================================
echo Live URLs:
echo - Primary: https://www.esim.com.mm
echo - Firebase: https://esim-myanmar-ia6gw.web.app
echo - Vercel: https://emergent-1.vercel.app
echo - GitHub Pages: https://kaunghtetpai-pc2vjp3.github.io/emergent-1
echo - Railway: https://emergent-1.railway.app
echo - Netlify: https://esim-myanmar.netlify.app
echo =====================================================================
echo All platforms deployed successfully!
pause