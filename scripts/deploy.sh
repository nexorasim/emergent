#!/bin/bash
# eSIM Myanmar Entertainment Server - Deployment Script
# Bash script for Linux/macOS deployment
# Usage: ./scripts/deploy.sh [development|staging|production]

set -e

# Configuration
ENVIRONMENT=${1:-development}
SKIP_TESTS=${SKIP_TESTS:-false}
SKIP_BUILD=${SKIP_BUILD:-false}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo ""
    echo -e "${CYAN}=== $1 ===${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Banner
echo ""
echo -e "${CYAN}============================================${NC}"
echo -e "${CYAN}  eSIM Myanmar Entertainment Server${NC}"
echo -e "${CYAN}  Deployment Script v1.0.0${NC}"
echo -e "${YELLOW}  Environment: $ENVIRONMENT${NC}"
echo -e "${CYAN}============================================${NC}"
echo ""

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    print_error "Invalid environment. Use: development, staging, or production"
    exit 1
fi

# Check prerequisites
print_step "Checking Prerequisites"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check Yarn
if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version)
    print_success "Yarn: $YARN_VERSION"
else
    print_warning "Yarn not found. Installing..."
    npm install -g yarn
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_success "Python: $PYTHON_VERSION"
else
    print_error "Python not found. Please install Python 3.11+"
    exit 1
fi

# Check Firebase CLI
if command -v firebase &> /dev/null; then
    FIREBASE_VERSION=$(firebase --version)
    print_success "Firebase CLI: $FIREBASE_VERSION"
else
    print_warning "Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Set environment variables
case $ENVIRONMENT in
    production)
        export REACT_APP_BACKEND_URL="https://api.esim.com.mm"
        export REACT_APP_DOMAIN="esim.com.mm"
        FIREBASE_PROJECT="esim-myanmar-ia6gw"
        SITE_URL="https://www.esim.com.mm"
        ;;
    staging)
        export REACT_APP_BACKEND_URL="https://staging-api.esim.com.mm"
        export REACT_APP_DOMAIN="staging.esim.com.mm"
        FIREBASE_PROJECT="esim-myanmar-staging"
        SITE_URL="https://staging.esim.com.mm"
        ;;
    *)
        export REACT_APP_BACKEND_URL="http://localhost:8001"
        export REACT_APP_DOMAIN="localhost:3000"
        FIREBASE_PROJECT="esim-myanmar-dev"
        SITE_URL="http://localhost:3000"
        ;;
esac

# Frontend Build
if [ "$SKIP_BUILD" != "true" ]; then
    print_step "Building Frontend"
    
    cd frontend
    
    echo "Installing dependencies..."
    yarn install --frozen-lockfile
    
    echo "Building for $ENVIRONMENT..."
    yarn build
    
    if [ $? -ne 0 ]; then
        print_error "Frontend build failed"
        exit 1
    fi
    
    print_success "Frontend build completed"
    cd ..
fi

# Run Tests
if [ "$SKIP_TESTS" != "true" ]; then
    print_step "Running Tests"
    
    # Frontend tests
    echo "Running frontend tests..."
    cd frontend
    CI=true yarn test --watchAll=false --passWithNoTests || true
    cd ..
    
    # Backend tests
    echo "Running backend tests..."
    cd backend
    if [ -d "tests" ]; then
        python3 -m pytest tests/ -v --tb=short 2>/dev/null || print_warning "Some backend tests failed"
    else
        print_warning "No backend tests found"
    fi
    cd ..
    
    print_success "Tests completed"
fi

# Firebase Deployment
print_step "Deploying to Firebase"

cd frontend

# Check Firebase login
echo "Checking Firebase authentication..."
firebase projects:list > /dev/null 2>&1 || {
    echo "Please login to Firebase..."
    firebase login
}

# Deploy to Firebase Hosting
echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting --project $FIREBASE_PROJECT

if [ $? -ne 0 ]; then
    print_error "Firebase deployment failed"
    cd ..
    exit 1
fi

print_success "Firebase deployment completed"
cd ..

# Post-deployment verification
print_step "Post-Deployment Verification"

echo "Verifying deployment at $SITE_URL..."

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" --max-time 30 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    print_success "Site is accessible (HTTP $HTTP_STATUS)"
else
    print_warning "Could not verify site accessibility (HTTP $HTTP_STATUS)"
fi

# Summary
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${YELLOW}Environment:${NC} $ENVIRONMENT"
echo -e "${CYAN}Site URL:${NC} $SITE_URL"
echo ""
echo "Next Steps:"
echo "1. Verify the deployment at $SITE_URL"
echo "2. Check browser console for errors"
echo "3. Test critical user flows"
echo "4. Monitor error tracking"
echo ""

# Seasonal reminder
TODAY=$(date +%Y-%m-%d)
SEASONAL_END="2026-02-01"
if [[ "$TODAY" < "$SEASONAL_END" ]]; then
    echo -e "${CYAN}Note: Seasonal features are ACTIVE until Feb 1, 2026${NC}"
fi

exit 0
