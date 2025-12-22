#!/bin/bash
# Multi-Platform Deployment Script
# ESIM MYANMAR COMPANY LIMITED
# Copyright 2025-2026

set -e

echo "========================================"
echo "eSIM Myanmar Multi-Platform Deployment"
echo "========================================"

cd /app/frontend

# Build production bundle
echo "Building production bundle..."
yarn build

# Deploy to Firebase
echo "\n[1/4] Deploying to Firebase..."
if command -v firebase &> /dev/null; then
    firebase deploy --only hosting --project esim-myanmar-ia6gw
    echo "Firebase deployment complete: https://esim-myanmar-ia6gw.web.app"
else
    echo "Firebase CLI not found. Skipping Firebase deployment."
fi

# Deploy to Vercel
echo "\n[2/4] Deploying to Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod --yes
    echo "Vercel deployment complete!"
else
    echo "Vercel CLI not found. Skipping Vercel deployment."
fi

# Deploy to Cloudflare Pages
echo "\n[3/4] Deploying to Cloudflare..."
if command -v wrangler &> /dev/null; then
    wrangler pages publish build --project-name=esim-myanmar
    echo "Cloudflare deployment complete!"
else
    echo "Wrangler CLI not found. Skipping Cloudflare deployment."
fi

# Push to GitHub
echo "\n[4/4] Pushing to GitHub..."
if [ -d ".git" ]; then
    git add .
    git commit -m "Production deployment $(date +%Y-%m-%d_%H:%M:%S)" || true
    git push origin main || git push origin master
    echo "GitHub push complete!"
else
    echo "Git repository not found. Skipping GitHub push."
fi

echo "\n========================================"
echo "All deployments complete!"
echo "========================================"
echo "Firebase: https://esim-myanmar-ia6gw.web.app"
echo "Primary: https://www.esim.com.mm"
echo "Mirror: https://esim.com.mm"
echo "========================================"
