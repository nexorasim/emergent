# eSIM Myanmar Deployment Commands
# Execute in order for full platform deployment

# Backend Setup
cd backend
pip install -r requirements.txt
python main.py

# Frontend Setup (new terminal)
cd frontend
yarn install
yarn start

# GitHub Deployment
gh workflow run deploy.yml
gh run list --workflow=deploy.yml

# Verification URLs
# Local Backend: http://localhost:8000
# Local Frontend: http://localhost:3000
# Production: https://esim.com.mm
# Firebase: https://esim-myanmar-ia6gw.web.app

# Health Check Commands
curl -f http://localhost:8000/api/health
curl -f http://localhost:3000
curl -f https://esim.com.mm
curl -f https://esim-myanmar-ia6gw.web.app