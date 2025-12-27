@echo off
cd frontend
call npm run build
call firebase login
call firebase deploy --project esim-myanmar-ia6gw
pause