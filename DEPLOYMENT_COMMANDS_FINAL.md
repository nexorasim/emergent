# DEPLOYMENT COMMANDS - IMMEDIATE EXECUTION
## eSIM Myanmar Platform - Production Ready

---

## FRONTEND DEPLOYMENT

### Firebase Deployment
```bash
firebase deploy --only hosting --project esim-myanmar-ia6gw
```

### Vercel Deployment
```bash
vercel --prod
```

### Netlify Deployment
```bash
netlify deploy --prod --dir=build
```

### Cloudflare Pages
```bash
wrangler pages publish build --project-name=esim-myanmar
```

---

## BACKEND DEPLOYMENT

### Railway Deployment
```bash
railway up
```

### Environment Variables Check
```bash
# Verify all environment variables are set
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=...
FIREBASE_CONFIG=...
```

---

## MOBILE DEPLOYMENT

### .NET MAUI Android
```bash
dotnet build -c Release -f net8.0-android
dotnet publish -c Release -f net8.0-android
```

### .NET MAUI iOS
```bash
dotnet build -c Release -f net8.0-ios
dotnet publish -c Release -f net8.0-ios
```

---

## VERIFICATION COMMANDS

### Health Check All Services
```bash
curl -f https://esim.com.mm/api/health
curl -f https://www.esim.com.mm/api/health
curl -f https://esim-myanmar-ia6gw.web.app/api/health
curl -f https://emerhent-production.up.railway.app/api/health
```

### Performance Test
```bash
# Load test with 100 concurrent users
ab -n 1000 -c 100 https://esim.com.mm/
```

### Security Scan
```bash
# OWASP ZAP security scan
zap-baseline.py -t https://esim.com.mm
```

---

## MONITORING SETUP

### Datadog Agent
```bash
# Install Datadog agent
DD_API_KEY=your_key bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

### Uptime Monitoring
```bash
# Setup uptime checks for all domains
curl -X POST "https://api.uptimerobot.com/v2/newMonitor" \
  -d "api_key=your_key" \
  -d "format=json" \
  -d "type=1" \
  -d "url=https://esim.com.mm" \
  -d "friendly_name=eSIM Myanmar Primary"
```

---

## DATABASE OPERATIONS

### Backup Creation
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Migration Run
```bash
# Run pending migrations
npm run migrate:up
```

---

## SSL CERTIFICATE VERIFICATION

### Certificate Check
```bash
# Verify SSL certificates
openssl s_client -connect esim.com.mm:443 -servername esim.com.mm
openssl s_client -connect www.esim.com.mm:443 -servername www.esim.com.mm
```

---

## FINAL DEPLOYMENT CHECKLIST

- [ ] Frontend build successful
- [ ] Backend deployment complete
- [ ] Database migrations applied
- [ ] SSL certificates valid
- [ ] Health checks passing
- [ ] Monitoring active
- [ ] Backups configured
- [ ] Security scan clean
- [ ] Performance test passed
- [ ] All domains resolving

---

**DEPLOYMENT STATUS: READY FOR EXECUTION**
**ESTIMATED TIME: 15 minutes**
**ROLLBACK PLAN: Automated via CI/CD**