@echo off
REM eSIM Myanmar - Deploy All Platforms
REM Date: December 26, 2025

echo Starting deployment to all platforms...

REM Frontend Build
cd frontend
echo Building frontend...
call npm install
call npm run build

REM Firebase Deployment
echo Deploying to Firebase...
call firebase login
call firebase deploy --project esim-myanmar-ia6gw

REM Vercel Deployment
echo Deploying to Vercel...
call vercel --prod

REM Cloudflare Pages
echo Deploying to Cloudflare...
cd ..
git add .
git commit -m "Deploy: %date% %time%"
git push origin main

echo All deployments initiated successfully!
echo URLs:
echo - Firebase: https://esim-myanmar-ia6gw.web.app
echo - Vercel: https://esim.com.mm
echo - Cloudflare: https://esim-myanmar.pages.dev
echo - Backend: https://emerhent-production.up.railway.app

pause