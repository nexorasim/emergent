#!/bin/bash

# eSIM Myanmar - 4th Anniversary Verification Script
# Version: 4.0.0
# Date: January 15, 2026

echo "================================================"
echo "eSIM Myanmar - 4th Anniversary Verification"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} File exists: $1"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} File missing: $1"
        ((FAILED++))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: $1"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} Directory missing: $1"
        ((FAILED++))
        return 1
    fi
}

# Function to check string in file
check_string() {
    if grep -q "$2" "$1"; then
        echo -e "${GREEN}✓${NC} Found '$2' in $1"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} Missing '$2' in $1"
        ((FAILED++))
        return 1
    fi
}

echo "1. Checking Core Files..."
echo "-----------------------------------"
check_file "frontend/src/pages/Anniversary.js"
check_file "frontend/public/sitemap.xml"
check_file "ENTERPRISE_4TH_ANNIVERSARY_AUDIT_COMPLETE.md"
check_file "4TH_ANNIVERSARY_DEPLOYMENT_GUIDE.md"
check_file "4TH_ANNIVERSARY_IMPLEMENTATION_SUMMARY.md"
echo ""

echo "2. Checking Modified Files..."
echo "-----------------------------------"
check_file "frontend/src/App.js"
check_file "frontend/src/components/Navigation.js"
echo ""

echo "3. Checking Design System..."
echo "-----------------------------------"
check_file "frontend/src/styles/design-system.css"
check_file "frontend/src/index.css"
echo ""

echo "4. Verifying Anniversary Page Content..."
echo "-----------------------------------"
check_string "frontend/src/pages/Anniversary.js" "4th Anniversary"
check_string "frontend/src/pages/Anniversary.js" "Free eSIM"
check_string "frontend/src/pages/Anniversary.js" "iOS Install eSIM"
check_string "frontend/src/pages/Anniversary.js" "Android Install eSIM"
check_string "frontend/src/pages/Anniversary.js" "LPA:1"
check_string "frontend/src/pages/Anniversary.js" "esimsetup.apple.com"
check_string "frontend/src/pages/Anniversary.js" "esimsetup.android.com"
echo ""

echo "5. Verifying Navigation Updates..."
echo "-----------------------------------"
check_string "frontend/src/components/Navigation.js" "anniversary"
check_string "frontend/src/components/Navigation.js" "4th Anniversary"
echo ""

echo "6. Verifying App.js Routes..."
echo "-----------------------------------"
check_string "frontend/src/App.js" "Anniversary"
check_string "frontend/src/App.js" "/anniversary"
echo ""

echo "7. Verifying Sitemap..."
echo "-----------------------------------"
check_string "frontend/public/sitemap.xml" "https://esim.com.mm/anniversary"
check_string "frontend/public/sitemap.xml" "https://esim.com.mm/anniversary/get-esim-free"
check_string "frontend/public/sitemap.xml" "https://esim.com.mm/mm/anniversary"
check_string "frontend/public/sitemap.xml" "priority>0.9"
echo ""

echo "8. Checking No Emoji Usage..."
echo "-----------------------------------"
# Check for common emoji patterns in key files
if grep -P "[\x{1F300}-\x{1F9FF}]" frontend/src/pages/Anniversary.js 2>/dev/null; then
    echo -e "${RED}✗${NC} Emoji found in Anniversary.js"
    ((FAILED++))
else
    echo -e "${GREEN}✓${NC} No emoji in Anniversary.js"
    ((PASSED++))
fi

if grep -P "[\x{1F300}-\x{1F9FF}]" frontend/src/components/Navigation.js 2>/dev/null; then
    echo -e "${RED}✗${NC} Emoji found in Navigation.js"
    ((FAILED++))
else
    echo -e "${GREEN}✓${NC} No emoji in Navigation.js"
    ((PASSED++))
fi
echo ""

echo "9. Checking Dependencies..."
echo "-----------------------------------"
if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json exists"
    ((PASSED++))
    
    # Check for required dependencies
    check_string "frontend/package.json" "react"
    check_string "frontend/package.json" "react-router-dom"
    check_string "frontend/package.json" "framer-motion"
    check_string "frontend/package.json" "react-helmet-async"
else
    echo -e "${RED}✗${NC} package.json missing"
    ((FAILED++))
fi
echo ""

echo "10. Checking Build Configuration..."
echo "-----------------------------------"
check_file "frontend/firebase.json"
check_file "frontend/vercel.json"
check_file "frontend/tailwind.config.js"
echo ""

echo "================================================"
echo "Verification Summary"
echo "================================================"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready for deployment.${NC}"
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please review the errors above.${NC}"
    exit 1
fi
