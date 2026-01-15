#!/bin/bash

# eSIM Myanmar - Cloudflare Pages Deployment
# Version: 4.0.0

echo "================================================"
echo "eSIM Myanmar - Cloudflare Pages Deployment"
echo "================================================"
echo ""

# Set Cloudflare API Token
export CLOUDFLARE_API_TOKEN="0R2Kw5TLj39aO6Z7JNc0O-wTVcWI4IJS8qELhfhL"

# Navigate to frontend
cd frontend

echo "1. Installing dependencies..."
yarn install

echo ""
echo "2. Building production bundle..."
yarn build

echo ""
echo "3. Deploying to Cloudflare Pages..."
wrangler pages deploy build --project-name=esim-myanmar --branch=main

echo ""
echo "================================================"
echo "Deployment Complete!"
echo "================================================"
echo ""
echo "Live URL: https://esim-myanmar.pages.dev"
echo "Anniversary: https://esim-myanmar.pages.dev/anniversary"
echo ""
