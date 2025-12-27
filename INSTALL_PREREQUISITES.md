# eSIM Myanmar - Prerequisites Installation Guide
## NexoraAI - December 28, 2025

---

## REQUIRED SOFTWARE

The following software needs to be installed to run the eSIM Myanmar platform:

### 1. Node.js (for Frontend)

Download and install from: https://nodejs.org/

Recommended: Node.js 20 LTS

After installation, verify:
```cmd
node --version
npm --version
```

Then install Yarn (optional but recommended):
```cmd
npm install -g yarn
```

### 2. Python 3.11+ (for Backend)

Download and install from: https://www.python.org/downloads/

During installation, check "Add Python to PATH"

After installation, verify:
```cmd
python --version
pip --version
```

### 3. MongoDB (Optional - for local development)

Download and install from: https://www.mongodb.com/try/download/community

Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas

---

## INSTALLATION COMMANDS

After installing prerequisites, run:

### Backend Setup
```cmd
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend Setup
```cmd
cd frontend
npm install
npm start
```

Or with Yarn:
```cmd
cd frontend
yarn install
yarn start
```

---

## ALTERNATIVE: Use Docker

If you have Docker installed, you can run everything without installing Node.js or Python:

```cmd
docker-compose up -d
```

This will start:
- Backend on http://localhost:8001
- Frontend on http://localhost:3000
- MongoDB on localhost:27017

---

## GITHUB CLI (Already Installed)

GitHub CLI is authenticated as: nexorasim
- Account: nexorasim
- Scopes: gist, read:org, repo, workflow

To trigger deployment:
```cmd
gh workflow run deploy.yml
gh run list --workflow=deploy.yml
```

---

## CURRENT STATUS

| Tool | Status |
|------|--------|
| GitHub CLI | Installed and authenticated |
| Node.js/npm | NOT INSTALLED |
| Yarn | NOT INSTALLED |
| Python | NOT INSTALLED |
| Docker | Installed (v29.1.3) - Daemon not running |

To start Docker Desktop on Windows:
1. Open Docker Desktop application
2. Wait for Docker to start (whale icon in system tray)
3. Then run: docker-compose up -d

---

## QUICK INSTALL (Windows)

### Using winget (Windows Package Manager):
```cmd
winget install OpenJS.NodeJS.LTS
winget install Python.Python.3.11
```

### Using Chocolatey:
```cmd
choco install nodejs-lts python311
```

### Using Scoop:
```cmd
scoop install nodejs-lts python
```

---

NexoraAI - eSIM Myanmar Platform Agent
