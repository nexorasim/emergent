#!/bin/bash

# eSIM Myanmar - Vercel Deployment
# Custom Domain: anniversary.esim.com.mm

echo "================================================"
echo "eSIM Myanmar - Vercel Deployment"
echo "================================================"
echo ""

export VERCEL_TOKEN="xnvIeRwBPqJnUzkWeeQi7mxn"

cd frontend

echo "Building production bundle..."
yarn build

echo ""
echo "Deploying to Vercel..."
vercel deploy --prod --token $VERCEL_TOKEN --yes --name esim-myanmar-anniversary

echo ""
echo "================================================"
echo "Deployment Instructions"
echo "================================================"
echo ""
echo "1. After deployment, add custom domain:"
echo "   vercel domains add anniversary.esim.com.mm --token $VERCEL_TOKEN"
echo ""
echo "2. Configure DNS:"
echo "   CNAME  anniversary  cname.vercel-dns.com"
echo ""
echo "3. Verify deployment:"
echo "   curl -I https://anniversary.esim.com.mm"
echo ""
