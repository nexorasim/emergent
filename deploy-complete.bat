@echo off
echo eSIM Myanmar - Complete Deployment Setup

echo Step 1: Fix GitHub billing
echo Visit: https://github.com/settings/billing
echo Add payment method to resolve billing issues
pause

echo Step 2: Install Node.js
echo Visit: https://nodejs.org/en/download/
echo Download and install Node.js LTS version
pause

echo Step 3: Install Firebase CLI
npm install -g firebase-tools

echo Step 4: Firebase login
firebase login

echo Step 5: Deploy to Firebase hosting
cd frontend
firebase deploy --only hosting

echo Deployment complete!
echo Live URL: https://esimmyanmar-09289140-4db73.web.app
pause