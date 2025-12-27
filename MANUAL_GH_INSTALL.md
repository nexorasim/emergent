# GitHub CLI Installation

## Manual Install Required

**Download**: https://github.com/cli/cli/releases/latest

**Windows Installer**: 
- Download `gh_*_windows_amd64.msi`
- Run installer
- Restart terminal

## After Installation
```bash
gh auth login
git add . && git commit -m "Deploy: Production ready" && git push origin main
```

**Status**: Manual installation required - winget not available