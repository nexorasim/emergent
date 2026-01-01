# DEPLOYMENT SETUP & TROUBLESHOOTING
## eSIM Myanmar Platform - CLI Tools & Authentication
### Date: December 28, 2025

---

## SETUP COMMANDS

### Install Required Tools
```bash
npm install -g firebase-tools vercel
```
Status: READY TO EXECUTE
Installs: Firebase CLI + Vercel CLI globally

### Authentication Setup
```bash
firebase login
vercel login
```
Status: AUTHENTICATION REQUIRED
Opens: Browser-based login for both services

### Build Troubleshooting
```bash
npm cache clean --force && npm install
```
Status: FALLBACK COMMAND
Use: When build fails or dependencies corrupt

---

## EXECUTION SEQUENCE

### Step 1: Tool Installation
```bash
# Install CLI tools globally
npm install -g firebase-tools vercel

# Verify installation
firebase --version
vercel --version
```

### Step 2: Service Authentication
```bash
# Firebase authentication
firebase login
# Opens browser, login with Google account

# Vercel authentication  
vercel login
# Opens browser, login with GitHub/GitLab/Bitbucket
```

### Step 3: Project Setup
```bash
# Firebase project selection
firebase use esim-myanmar-ia6gw

# Vercel project linking
vercel link
# Select: nexorasim/esim-myanmar
```

---

## TROUBLESHOOTING SCENARIOS

### Scenario 1: Tools Missing
```bash
# Check if Node.js installed
node --version
npm --version

# Install tools if missing
npm install -g firebase-tools vercel
```

### Scenario 2: Authentication Issues
```bash
# Re-authenticate Firebase
firebase logout
firebase login --reauth

# Re-authenticate Vercel
vercel logout
vercel login
```

### Scenario 3: Build Failures
```bash
# Clear npm cache and reinstall
npm cache clean --force && npm install

# Alternative: Delete node_modules
rm -rf node_modules package-lock.json
npm install
```

### Scenario 4: Permission Errors
```bash
# Fix npm permissions (Unix/Linux/Mac)
sudo chown -R $(whoami) ~/.npm

# Windows: Run as Administrator
# Right-click Command Prompt > Run as Administrator
```

---

## VERIFICATION COMMANDS

### Tool Verification
```bash
# Check installations
firebase --version
vercel --version
node --version
npm --version
```

### Authentication Status
```bash
# Check Firebase auth
firebase projects:list

# Check Vercel auth
vercel whoami
vercel ls
```

### Project Configuration
```bash
# Firebase project status
firebase use

# Vercel project status
vercel inspect
```

---

## DEPLOYMENT READINESS CHECK

### Pre-deployment Checklist
- [ ] Node.js installed
- [ ] Firebase CLI installed
- [ ] Vercel CLI installed
- [ ] Firebase authenticated
- [ ] Vercel authenticated
- [ ] Project linked
- [ ] Dependencies installed

### Quick Test
```bash
# Test Firebase connection
firebase projects:list | grep esim-myanmar-ia6gw

# Test Vercel connection
vercel ls | grep esim

# Test build process
cd frontend
npm run build
```

---

## COMMON ERROR SOLUTIONS

### Error: "firebase: command not found"
```bash
npm install -g firebase-tools
# or
npm install -g firebase-tools --force
```

### Error: "vercel: command not found"
```bash
npm install -g vercel
# or
npm install -g @vercel/cli
```

### Error: "Permission denied"
```bash
# Use sudo (Unix/Linux/Mac)
sudo npm install -g firebase-tools vercel

# Or fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### Error: "Build failed"
```bash
# Clear cache and reinstall
npm cache clean --force && npm install

# Check Node.js version compatibility
node --version
# Ensure Node.js 16+ for React 19
```

---

## DEPLOYMENT EXECUTION

### Full Deployment Sequence
```bash
# 1. Setup (if needed)
npm install -g firebase-tools vercel
firebase login
vercel login

# 2. Build and deploy
cd frontend
npm install
npm run build
firebase deploy --only hosting --project esim-myanmar-ia6gw
vercel --prod --confirm

# 3. Verify
curl -f https://esim.com.mm
curl -f https://esim-myanmar-ia6gw.web.app
```

---

**STATUS: DEPLOYMENT TOOLS & TROUBLESHOOTING READY**

All setup commands and troubleshooting solutions prepared for deployment execution.

---

Date: December 28, 2025
Platform: eSIM Myanmar Enterprise
Tools: Firebase CLI, Vercel CLI
Status: SETUP READY