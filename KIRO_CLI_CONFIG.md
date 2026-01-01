# KIRO CLI CONFIGURATION
## eSIM Myanmar Platform Management
### Command Line Interface for Kiro Powers

---

## KIRO CLI INSTALLATION

### Install Kiro CLI
```bash
npm install -g @kiro/cli
# or
yarn global add @kiro/cli
```

### Initialize Kiro Project
```bash
kiro init esim-myanmar
cd esim-myanmar
kiro config set project esim-myanmar
```

---

## KIRO POWERS MANAGEMENT

### List Available Powers
```bash
kiro powers list
kiro powers status
```

### Activate Powers
```bash
# Database powers
kiro power activate supabase --project ksctoosqlpemoptcaxdr
kiro power activate aurora-postgresql
kiro power activate neon-database

# Hosting powers
kiro power activate firebase --project esim-myanmar-ia6gw
kiro power activate vercel --domain esim.com.mm
kiro power activate cloudflare --zone esim.com.mm
kiro power activate hostinger --domain esim.com.mm

# Development powers
kiro power activate github --repo nexorasim/emergent
kiro power activate terraform
kiro power activate aws-cdk
```

### Power Configuration
```bash
# Configure Supabase
kiro power config supabase \
  --url https://ksctoosqlpemoptcaxdr.supabase.co \
  --key sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl

# Configure Firebase
kiro power config firebase \
  --project esim-myanmar-ia6gw \
  --hosting true

# Configure Vercel
kiro power config vercel \
  --domain esim.com.mm \
  --prod true
```

---

## DEPLOYMENT COMMANDS

### Multi-Platform Deploy
```bash
# Deploy to all platforms
kiro deploy --all

# Deploy specific platforms
kiro deploy --firebase
kiro deploy --vercel
kiro deploy --cloudflare
kiro deploy --railway
```

### Environment Management
```bash
# Set environment variables
kiro env set SUPABASE_URL https://ksctoosqlpemoptcaxdr.supabase.co
kiro env set SUPABASE_KEY sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl
kiro env set RAILWAY_TOKEN your_railway_token

# List environment variables
kiro env list

# Deploy with environment
kiro deploy --env production
```

---

## DATABASE OPERATIONS

### Supabase Management
```bash
# Connect to Supabase
kiro db connect supabase

# Run migrations
kiro db migrate --up
kiro db migrate --down

# Seed data
kiro db seed --file seeds/initial_data.sql

# Backup database
kiro db backup --output backup_$(date +%Y%m%d).sql
```

### Database Status
```bash
# Check database health
kiro db status
kiro db tables
kiro db policies
```

---

## MONITORING AND LOGS

### Real-time Monitoring
```bash
# Monitor all services
kiro monitor --all

# Monitor specific service
kiro monitor --service firebase
kiro monitor --service vercel
kiro monitor --service railway

# View logs
kiro logs --service backend --tail
kiro logs --service frontend --lines 100
```

### Health Checks
```bash
# Check all endpoints
kiro health check --all

# Check specific endpoints
kiro health check --url https://esim.com.mm
kiro health check --url https://esim-myanmar-ia6gw.web.app
```

---

## AI AGENT MANAGEMENT

### NexoraAI Agent
```bash
# Start NexoraAI agent
kiro agent start nexoraai

# Configure agent
kiro agent config nexoraai \
  --role "Principal Systems Architect" \
  --scope "eSIM Myanmar Ecosystem"

# Agent status
kiro agent status nexoraai
kiro agent logs nexoraai
```

### Agent Operations
```bash
# Run security audit
kiro agent run nexoraai --task security-audit

# Performance optimization
kiro agent run nexoraai --task performance-optimize

# Compliance check
kiro agent run nexoraai --task compliance-validate
```

---

## INFRASTRUCTURE MANAGEMENT

### Terraform Operations
```bash
# Initialize Terraform
kiro terraform init

# Plan infrastructure
kiro terraform plan --env production

# Apply changes
kiro terraform apply --auto-approve

# Destroy resources
kiro terraform destroy --target aws_cloudfront_distribution.esim_cdn
```

### AWS CDK Operations
```bash
# Deploy CDK stack
kiro cdk deploy --stack esim-myanmar-stack

# Diff changes
kiro cdk diff

# Synthesize CloudFormation
kiro cdk synth > template.yaml
```

---

## SECURITY OPERATIONS

### Security Scanning
```bash
# OWASP security scan
kiro security scan --owasp

# Dependency audit
kiro security audit --dependencies

# Vulnerability check
kiro security vulnerabilities --fix
```

### Compliance Validation
```bash
# GSMA eSIM compliance
kiro compliance check --standard gsma-esim

# GDPR compliance
kiro compliance check --standard gdpr

# Generate compliance report
kiro compliance report --output compliance_report.pdf
```

---

## WORKFLOW AUTOMATION

### CI/CD Pipeline
```bash
# Create workflow
kiro workflow create deploy \
  --trigger push \
  --branch main \
  --steps "build,test,deploy"

# Run workflow
kiro workflow run deploy

# Workflow status
kiro workflow status deploy
kiro workflow logs deploy
```

### Scheduled Tasks
```bash
# Schedule backup
kiro schedule create backup \
  --cron "0 2 * * *" \
  --command "kiro db backup"

# Schedule security scan
kiro schedule create security-scan \
  --cron "0 0 * * 0" \
  --command "kiro security scan --all"
```

---

## CONFIGURATION FILES

### kiro.config.js
```javascript
module.exports = {
  project: 'esim-myanmar',
  powers: {
    supabase: {
      url: 'https://ksctoosqlpemoptcaxdr.supabase.co',
      key: 'sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl'
    },
    firebase: {
      project: 'esim-myanmar-ia6gw'
    },
    vercel: {
      domain: 'esim.com.mm'
    },
    railway: {
      project: '7825338f-5e57-49aa-9f75-0a6575bee178'
    }
  },
  agents: {
    nexoraai: {
      role: 'Principal Systems Architect',
      scope: 'eSIM Myanmar Ecosystem',
      powers: 'all'
    }
  }
}
```

---

## QUICK COMMANDS

### Development
```bash
# Start development environment
kiro dev start

# Build project
kiro build --env production

# Test project
kiro test --coverage
```

### Production
```bash
# Deploy to production
kiro deploy --env production --confirm

# Rollback deployment
kiro rollback --version previous

# Scale services
kiro scale --service backend --replicas 3
```

---

**STATUS: KIRO CLI CONFIGURED**

Command line interface ready for eSIM Myanmar platform management.

---

Date: December 28, 2025
CLI Version: Latest
Project: esim-myanmar
Status: CONFIGURED