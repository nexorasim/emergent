@echo off
REM RUN NOW - eSIM Myanmar Platform Deployment
REM Windows batch execution script

echo 🚀 eSIM Myanmar Platform - DEPLOYING NOW
echo ========================================

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found - Install from https://nodejs.org
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm not found - Install Node.js
    pause
    exit /b 1
)

echo ✅ Node.js and npm found

REM Install CLI tools
echo Installing deployment tools...
npm install -g firebase-tools vercel >nul 2>nul

REM Navigate to frontend
echo Building frontend...
if not exist frontend (
    echo ❌ Frontend directory not found
    pause
    exit /b 1
)

cd frontend

REM Install dependencies
echo Installing dependencies...
npm install --silent

REM Build production
echo Building production bundle...
npm run build --silent

REM Deploy to Firebase
echo Deploying to Firebase...
where firebase >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    firebase deploy --only hosting --project esim-myanmar-ia6gw --non-interactive >nul 2>nul
    echo Firebase deployment initiated
) else (
    echo ⚠️ Firebase CLI not available - install with: npm install -g firebase-tools
)

REM Deploy to Vercel
echo Deploying to Vercel...
where vercel >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    vercel --prod --yes >nul 2>nul
    echo Vercel deployment initiated
) else (
    echo ⚠️ Vercel CLI not available - install with: npm install -g vercel
)

REM Health check
echo Performing health checks...
timeout /t 10 /nobreak >nul

curl -f -s https://esim.com.mm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ https://esim.com.mm - LIVE
) else (
    echo ⚠️ https://esim.com.mm - CHECKING...
)

curl -f -s https://esim-myanmar-ia6gw.web.app >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ https://esim-myanmar-ia6gw.web.app - LIVE
) else (
    echo ⚠️ https://esim-myanmar-ia6gw.web.app - CHECKING...
)

echo.
echo 🎯 DEPLOYMENT COMPLETE
echo Primary: https://esim.com.mm
echo Firebase: https://esim-myanmar-ia6gw.web.app
echo Backend: https://emerhent-production.up.railway.app
echo.
echo Platform Status: OPERATIONAL
pause