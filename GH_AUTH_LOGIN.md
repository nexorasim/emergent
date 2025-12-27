# GitHub CLI Authentication

## Command
```bash
gh auth login
```

## Steps
1. Select GitHub.com
2. Choose HTTPS or SSH
3. Authenticate via web browser
4. Follow prompts

## Alternative
```bash
# Using token
gh auth login --with-token < token.txt

# Web browser
gh auth login --web
```

## Verify
```bash
gh auth status
```

**Status**: Ready for GitHub CLI authentication