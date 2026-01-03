@echo off
echo [Firebase Deployment - https://esimmyanmar-09289140-4db73.web.app]
cd frontend
npm run build
firebase deploy --project esimmyanmar-09289140-4db73
echo Live at: https://esimmyanmar-09289140-4db73.web.app
cd ..