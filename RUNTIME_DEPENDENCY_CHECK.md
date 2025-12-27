# RUNTIME DEPENDENCY CHECK
## eSIM Myanmar Platform
### Date: December 26, 2025

---

## DEPENDENCY STATUS

### Command Check Results
```
node: NOT FOUND
npm: NOT FOUND  
yarn: NOT FOUND
python: NOT FOUND
```

### System Status
- Windows PATH: Limited command availability
- PowerShell: Available
- Command Prompt: Available
- Runtime installations: REQUIRED

---

## INSTALLATION REQUIREMENTS

### Node.js (Required for Frontend)
- Download: https://nodejs.org
- Version: 18+ LTS recommended
- Includes: npm package manager
- Verify: `node --version && npm --version`

### Python (Required for Backend)
- Download: https://python.org
- Version: 3.8+ recommended
- Includes: pip package manager
- Verify: `python --version && pip --version`

### Yarn (Optional - Alternative to npm)
- Install: `npm install -g yarn`
- Verify: `yarn --version`

### GitHub CLI (Required for Deployment)
- Download: https://cli.github.com
- Install: `winget install GitHub.cli`
- Verify: `gh --version`

---

## POST-INSTALLATION COMMANDS

### Backend Startup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend Startup
```bash
cd frontend
npm install
npm start
```

### Deployment Trigger
```bash
gh auth login
gh workflow run deploy.yml
```

---

## VERIFICATION STEPS

### After Installation
1. Open new terminal/PowerShell
2. Run version checks
3. Execute platform commands
4. Verify local servers running
5. Trigger production deployment

---

**STATUS: RUNTIME DEPENDENCIES REQUIRED**

Install Node.js, Python, and GitHub CLI to execute platform commands.

---

Date: December 26, 2025
Platform: eSIM Myanmar Enterprise