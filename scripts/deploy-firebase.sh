#!/bin/bash
# Firebase Deployment Script
# ESIM MYANMAR COMPANY LIMITED
# Copyright 2025-2026

set -e

echo "========================================"
echo "eSIM Myanmar Firebase Deployment"
echo "========================================"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Navigate to frontend directory
cd /app/frontend

# Install dependencies
echo "Installing dependencies..."
yarn install --frozen-lockfile

# Build for production
echo "Building for production..."
NODE_ENV=production yarn build

# Login to Firebase (if not already logged in)
echo "Checking Firebase authentication..."
firebase login --no-localhost || true

# Deploy to Firebase Hosting
echo "Deploying to Firebase..."
firebase deploy --only hosting --project esim-myanmar-ia6gw

echo "========================================"
echo "Deployment Complete!"
echo "Site: https://esim-myanmar-ia6gw.web.app"
echo "========================================"
