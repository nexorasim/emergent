@echo off
echo Firebase CLI Install, Login, Deploy - https://esim-myanmar-ia6gw.web.app

echo [10%] Installing Firebase CLI...
npm install -g firebase-tools

echo [20%] Firebase login (browser will open)...
firebase login

echo [30%] Setting Firebase project...
firebase use esim-myanmar-ia6gw

echo [40%] Initializing Firebase hosting...
cd frontend
firebase init hosting

echo [50%] Building application...
npm run build

echo [70%] Deploying to Firebase hosting...
firebase deploy --only hosting

echo [90%] Deployment verification...
echo Live URL: https://esim-myanmar-ia6gw.web.app

echo [100%] Firebase deployment complete!
echo eSIM Myanmar is now live at: https://esim-myanmar-ia6gw.web.app

pause