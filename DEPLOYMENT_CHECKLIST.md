# eSIM Myanmar Platform - Deployment Checklist

## Pre-Deployment Verification

### Code Quality
- [ ] All tests passing (backend and frontend)
- [ ] No critical linting errors
- [ ] Code review completed
- [ ] Security scan passed (no critical vulnerabilities)

### Configuration
- [ ] Environment variables set for target environment
- [ ] SECRET_KEY is unique and secure (min 32 characters)
- [ ] CORS origins configured for production domains only
- [ ] Rate limiting configured appropriately
- [ ] Database connection string verified

### Database
- [ ] MongoDB indexes created
- [ ] Database backup completed
- [ ] Migration scripts ready (if applicable)
- [ ] Connection pooling configured

### Security
- [ ] HTTPS/SSL certificates valid
- [ ] Security headers enabled
- [ ] Rate limiting active
- [ ] JWT token expiry set appropriately (1-24 hours recommended)
- [ ] Sensitive data encrypted at rest
- [ ] API keys and secrets in secure storage

---

## Deployment Steps

### 1. Backend Deployment

```bash
# Build Docker image
docker build -f Dockerfile.backend -t esim-backend:latest .

# Push to registry
docker push your-registry/esim-backend:latest

# Deploy (example for Docker Compose)
docker-compose -f docker-compose.prod.yml up -d backend
```

### 2. Frontend Deployment

```bash
# Build production bundle
cd frontend
yarn build

# Build Docker image
docker build -f Dockerfile.frontend -t esim-frontend:latest .

# Push to registry
docker push your-registry/esim-frontend:latest

# Deploy
docker-compose -f docker-compose.prod.yml up -d frontend
```

### 3. Database Setup

```bash
# Connect to MongoDB and create indexes
mongosh "mongodb://your-mongo-url/esim_myanmar"

# Run index creation
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "user_id": 1 }, { unique: true })
db.esim_profiles.createIndex({ "user_id": 1 })
db.esim_profiles.createIndex({ "iccid": 1 }, { unique: true })
db.transactions.createIndex({ "user_id": 1, "created_at": -1 })
```

---

## Post-Deployment Verification

### Health Checks
- [ ] Backend health endpoint responding: `GET /api/health`
- [ ] Frontend loading correctly
- [ ] Database connection healthy
- [ ] All services running

### Functional Tests
- [ ] User registration working
- [ ] User login working
- [ ] eSIM profile creation working
- [ ] QR code generation working
- [ ] Payment flow working (sandbox)

### Performance
- [ ] Response times acceptable (< 500ms for API)
- [ ] No memory leaks detected
- [ ] CPU usage normal
- [ ] Database query performance acceptable

### Monitoring
- [ ] Logging configured and working
- [ ] Error tracking active
- [ ] Alerts configured for critical issues
- [ ] Dashboard accessible

---

## Rollback Plan

### Quick Rollback

```bash
# Rollback to previous version
docker-compose -f docker-compose.prod.yml down
docker tag esim-backend:previous esim-backend:latest
docker tag esim-frontend:previous esim-frontend:latest
docker-compose -f docker-compose.prod.yml up -d
```

### Database Rollback
- Restore from backup if schema changes were made
- Document any data migrations that need reversal

---

## Seasonal Design Notes

### Current Status
- Seasonal mode: Active (December 15, 2025 - January 31, 2026)
- Auto-reversion: February 1, 2026

### Manual Override (if needed)
Edit `frontend/src/utils/seasonalConfig.js`:
```javascript
export const SEASONAL_CONFIG = {
  enabled: false,  // Set to false to disable immediately
  // ...
};
```

### Components Affected
- SeasonalBanner (top banner)
- SeasonalSanta (bottom-right animated guide)
- Countdown2026 (New Year countdown)

---

## Contact Information

- Technical Lead: [Contact]
- DevOps: [Contact]
- On-Call: [Contact]

---

## Deployment Log

| Date | Version | Deployer | Notes |
|------|---------|----------|-------|
| YYYY-MM-DD | 1.0.0 | Name | Initial deployment |
