@echo off
echo Firebase Login and Deploy - esimmyanmar-09289140-4db73

echo Login to Firebase...
firebase login

echo Deploy to hosting...
cd frontend
firebase deploy --only hosting --project esimmyanmar-09289140-4db73

echo Deployment complete!
echo Live URL: https://esimmyanmar-09289140-4db73.web.app

pause