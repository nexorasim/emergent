#!/bin/bash
# eSIM Myanmar - Deploy All Platforms
# Date: December 26, 2025

echo "Starting deployment to all platforms..."

# Frontend Build
cd frontend
echo "Building frontend..."
npm install
npm run build

# Firebase Deployment
echo "Deploying to Firebase..."
firebase login
firebase deploy --project esim-myanmar-ia6gw

# Vercel Deployment
echo "Deploying to Vercel..."
vercel --prod

# Cloudflare Pages
echo "Deploying to Cloudflare..."
git add .
git commit -m "Deploy: $(date)"
git push origin main

# Backend Railway (auto-deploys on push)
echo "Backend deployment triggered via Railway..."

echo "All deployments initiated successfully!"
echo "URLs:"
echo "- Firebase: https://esim-myanmar-ia6gw.web.app"
echo "- Vercel: https://esim.com.mm"
echo "- Cloudflare: https://esim-myanmar.pages.dev"
echo "- Backend: https://emerhent-production.up.railway.app"