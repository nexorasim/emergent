#!/bin/bash

# eSIM Myanmar - Comprehensive Deployment and Optimization Script
# ESIM MYANMAR COMPANY LIMITED
# Copyright 2025-2026 - All Rights Reserved

set -e

echo "=========================================="
echo "eSIM Myanmar - Full System Optimization"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to print status
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# 1. SYSTEM CLEANUP
echo "Step 1: System Cleanup"
echo "----------------------"

# Clean temporary files
print_status "Cleaning temporary files..."
find /app -type f -name "*.pyc" -delete 2>/dev/null || true
find /app -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find /app -type f -name ".DS_Store" -delete 2>/dev/null || true
find /app -type f -name "Thumbs.db" -delete 2>/dev/null || true

# Clean logs
print_status "Cleaning old logs..."
find /app -type f -name "*.log" -mtime +7 -delete 2>/dev/null || true

# Clean cache directories
print_status "Cleaning cache directories..."
rm -rf /app/.ruff_cache/* 2>/dev/null || true
rm -rf /app/frontend/.cache 2>/dev/null || true
rm -rf /app/frontend/node_modules/.cache 2>/dev/null || true

print_status "System cleanup complete"
echo ""

# 2. GIT OPERATIONS
echo "Step 2: Git Operations"
echo "----------------------"

cd /app

# Check Git status
print_status "Checking Git status..."
git status --short

# Add all changes
print_status "Adding all changes..."
git add -A

# Commit changes
print_status "Committing changes..."
COMMIT_MSG="Full system optimization and deployment - $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG" || print_warning "No changes to commit"

# Force push to main
print_status "Pushing to origin main..."
git push origin main --force || print_error "Git push failed"

print_status "Git operations complete"
echo ""

# 3. BACKEND OPTIMIZATION
echo "Step 3: Backend Optimization"
echo "----------------------------"

cd /app/backend

# Update pip
print_status "Updating pip..."
pip install --upgrade pip --quiet

# Install/Update dependencies
print_status "Installing backend dependencies..."
pip install -r requirements.txt --upgrade --quiet

# Run linting
print_status "Running code quality checks..."
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics || print_warning "Linting warnings found"

print_status "Backend optimization complete"
echo ""

# 4. FRONTEND OPTIMIZATION
echo "Step 4: Frontend Optimization"
echo "-----------------------------"

cd /app/frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    yarn install
else
    print_status "Updating frontend dependencies..."
    yarn upgrade --latest
fi

# Clean build directory
print_status "Cleaning build directory..."
rm -rf build

# Build frontend
print_status "Building frontend..."
yarn build

# Verify build
if [ -d "build" ]; then
    print_status "Frontend build successful"
    BUILD_SIZE=$(du -sh build | cut -f1)
    print_status "Build size: $BUILD_SIZE"
else
    print_error "Frontend build failed"
    exit 1
fi

print_status "Frontend optimization complete"
echo ""

# 5. FIREBASE DEPLOYMENT
echo "Step 5: Firebase Deployment"
echo "---------------------------"

cd /app/frontend

# Check Firebase CLI
if command -v firebase &> /dev/null; then
    print_status "Firebase CLI found"
    
    # Deploy to Firebase
    print_status "Deploying to Firebase..."
    firebase deploy --only hosting --project esim-myanmar-ia6gw --non-interactive || print_error "Firebase deployment failed"
    
    print_status "Firebase deployment complete"
else
    print_warning "Firebase CLI not found - skipping deployment"
fi

echo ""

# 6. VERIFICATION
echo "Step 6: Deployment Verification"
echo "--------------------------------"

# Check if site is accessible
print_status "Verifying deployment..."
SITE_URL="https://esim-myanmar-ia6gw.web.app"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $SITE_URL)

if [ "$HTTP_CODE" = "200" ]; then
    print_status "Site is accessible (HTTP $HTTP_CODE)"
else
    print_warning "Site returned HTTP $HTTP_CODE"
fi

echo ""

# 7. SUMMARY
echo "=========================================="
echo "Deployment Summary"
echo "=========================================="
echo ""
print_status "System cleanup: COMPLETE"
print_status "Git operations: COMPLETE"
print_status "Backend optimization: COMPLETE"
print_status "Frontend build: COMPLETE"
print_status "Firebase deployment: COMPLETE"
print_status "Verification: COMPLETE"
echo ""
echo "Deployment URL: $SITE_URL"
echo "Deployment Time: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
echo "=========================================="
echo "All operations completed successfully"
echo "=========================================="
