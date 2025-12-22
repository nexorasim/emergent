#!/bin/bash
# GitHub Deployment Script
# ESIM MYANMAR COMPANY LIMITED
# Deploy to github.com/nexorasim/Jan

set -e

echo "========================================"
echo "eSIM Myanmar - GitHub Deployment"
echo "Repository: nexorasim/Jan"
echo "========================================"

cd /app

# Build frontend
echo "Building frontend..."
cd frontend
yarn build
cd ..

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git branch -M main
fi

# Configure git
git config user.email "info@esim.com.mm"
git config user.name "eSIM Myanmar"

# Add all files
echo "Adding files..."
git add .

# Commit
echo "Committing changes..."
git commit -m "eSIM Myanmar Entertainment Server - $(date +%Y-%m-%d)

- Updated Logo (Gradient #00FFFF to #6495ED)
- Running Santa Claus Animation
- MP3 Loading Flow Enhanced
- Copy Protection System
- All Information 100% Accurate
- Domain: esim.com.mm
- Copyright 2025-2026 ESIM MYANMAR COMPANY LIMITED"

# Set remote
echo "Setting remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/nexorasim/Jan.git

# Push
echo "Pushing to GitHub..."
git push -u origin main --force

echo "========================================"
echo "Deployment Complete!"
echo "Repository: https://github.com/nexorasim/Jan"
echo "========================================"
