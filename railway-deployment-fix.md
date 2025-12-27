# Railway Deployment Fix
# Project: 7825338f-5e57-49aa-9f75-0a6575bee178
# Environment: fb4ae5f9-cc5b-4255-aded-372a8115d5a9

# railway.json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && pip install -r requirements.txt"
  },
  "deploy": {
    "startCommand": "cd backend && python main.py",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}

# Environment Variables Required
PORT=8000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=${{JWT_SECRET}}
ENVIRONMENT=production
CORS_ORIGINS=https://esim.com.mm,https://www.esim.com.mm,https://esim-myanmar-ia6gw.web.app

# Deployment Commands
railway login
railway link 7825338f-5e57-49aa-9f75-0a6575bee178
railway up --detach

# Health Check
curl -f https://emerhent-production.up.railway.app/api/health