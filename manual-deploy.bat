@echo off
echo Manual Deployment Commands for eSIM Myanmar

echo Firebase:
echo cd frontend && npm run build && firebase deploy

echo Vercel:
echo cd frontend && vercel --prod

echo Cloudflare:
echo Auto-deploys from main branch if connected

pause