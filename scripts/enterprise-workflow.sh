#!/bin/bash
# eSIM Enterprise Management Portal - All-in-One Workflow
# Tenant ID: 370dd52c-929e-4fcd-aee3-fb5181eff2b7
# Client ID: 00f56c44-2d00-4378-bb52-1417c208fcfd
# User: admin@mdm.esim.com.mm

set -e

echo "=========================================="
echo "eSIM Myanmar Enterprise Workflow"
echo "=========================================="

# Step 1: Install required tools globally
echo "[1/9] Installing required tools..."
npm install -g lighthouse newman eslint azure-cli 2>/dev/null || true

# Step 2: Create logs directory
echo "[2/9] Creating logs directory..."
mkdir -p ./logs

# Step 3: Run Lighthouse audits for each domain
echo "[3/9] Running Lighthouse audits..."
lighthouse https://frontend-pxngk5w7v-nexorasims-projects.vercel.app --output=json --output-path=./logs/frontend.json --chrome-flags="--headless --no-sandbox" || true
lighthouse https://www.esim.com.mm --output=json --output-path=./logs/esim-www.json --chrome-flags="--headless --no-sandbox" || true
lighthouse https://esim.com.mm --output=json --output-path=./logs/esim.json --chrome-flags="--headless --no-sandbox" || true
lighthouse https://esim-myanmar.pages.dev --output=json --output-path=./logs/pagesdev.json --chrome-flags="--headless --no-sandbox" || true
lighthouse https://esimmyanmar-09289140-4db73.web.app --output=json --output-path=./logs/webapp.json --chrome-flags="--headless --no-sandbox" || true

# Step 4: Run API error log checks
echo "[4/9] Running Newman API tests..."
newman run postman/esim-myanmar-api.postman_collection.json -e postman/esim-myanmar-environment.postman_environment.json --reporters cli,json --reporter-json-export ./logs/api-errors.json || true

# Step 5: Capture console/runtime errors via Puppeteer script
echo "[5/9] Capturing console errors..."
node scripts/captureConsoleErrors.js || true

# Step 6: Run linting for frontend code
echo "[6/9] Running ESLint..."
cd frontend && npx eslint ./src --format json -o ../logs/eslint.json || true
cd ..

# Step 7: Azure CLI login
echo "[7/9] Azure CLI login..."
az login --tenant 370dd52c-929e-4fcd-aee3-fb5181eff2b7 --username admin@mdm.esim.com.mm || true

# Step 8: Acquire Microsoft Graph access token
echo "[8/9] Acquiring Microsoft Graph token..."
TOKEN=$(az account get-access-token --resource https://graph.microsoft.com --query accessToken -o tsv 2>/dev/null)

if [ -n "$TOKEN" ]; then
    # Step 9: Call Microsoft Graph API for validation
    echo "[9/9] Fetching Microsoft Graph data..."
    
    echo "Fetching signed-in user profile..."
    curl -s -H "Authorization: Bearer $TOKEN" https://graph.microsoft.com/v1.0/me > ./logs/graph-me.json
    
    echo "Fetching directory info..."
    curl -s -H "Authorization: Bearer $TOKEN" https://graph.microsoft.com/v1.0/organization > ./logs/graph-org.json
    
    echo "Fetching registered applications..."
    curl -s -H "Authorization: Bearer $TOKEN" https://graph.microsoft.com/v1.0/applications > ./logs/graph-apps.json
    
    echo "Fetching devices..."
    curl -s -H "Authorization: Bearer $TOKEN" https://graph.microsoft.com/v1.0/devices > ./logs/graph-devices.json
    
    echo "Fetching groups..."
    curl -s -H "Authorization: Bearer $TOKEN" https://graph.microsoft.com/v1.0/groups > ./logs/graph-groups.json
    
    echo "Fetching users..."
    curl -s -H "Authorization: Bearer $TOKEN" https://graph.microsoft.com/v1.0/users > ./logs/graph-users.json
else
    echo "Skipping Graph API calls - no token available"
fi

echo "=========================================="
echo "All-in-one workflow complete!"
echo "Logs saved in ./logs/"
echo "=========================================="
