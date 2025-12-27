@echo off
echo Starting eSIM Myanmar Platform Deployment
echo ========================================

echo.
echo [1/5] Backend Setup
cd backend
pip install -r requirements.txt
start /B python main.py
cd ..

echo.
echo [2/5] Frontend Setup
cd frontend
yarn install
start /B yarn start
cd ..

echo.
echo [3/5] GitHub Deployment Trigger
gh workflow run deploy.yml

echo.
echo [4/5] Checking Deployment Status
gh run list --workflow=deploy.yml

echo.
echo [5/5] Deployment Complete
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo GitHub Pages: https://nexorasim.github.io/emergent
echo Custom Domain: https://esim.com.mm

pause