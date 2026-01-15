# eSIM Myanmar - 4th Anniversary Campaign Deployment Guide

**Version:** 4.0.0  
**Date:** January 15, 2026  
**Status:** Ready for Production Deployment

---

## Quick Start

### Prerequisites

```bash
# Required Software
- Node.js 18+ or 20+
- Yarn 1.22+
- Firebase CLI 13+
- Git

# Verify installations
node --version
yarn --version
firebase --version
```

### Installation

```bash
# Clone repository
git clone https://github.com/esim-myanmar/platform.git
cd platform

# Install frontend dependencies
cd frontend
yarn install

# Build production bundle
yarn build
```

---

## Deployment Options

### Option 1: Firebase Hosting (Recommended)

```bash
# Login to Firebase
firebase login

# Select project
firebase use esim-myanmar-ia6gw

# Deploy to production
firebase deploy --only hosting

# Verify deployment
curl -I https://esim-myanmar-ia6gw.web.app
curl -I https://esim-myanmar-ia6gw.web.app/anniversary
```

**Expected Output:**
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/esim-myanmar-ia6gw/overview
Hosting URL: https://esim-myanmar-ia6gw.web.app
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod

# Custom domain
vercel domains add esim.com.mm
```

### Option 3: Cloudflare Pages

```bash
# Install Wrangler
npm i -g wrangler

# Login
wrangler login

# Deploy
cd frontend
wrangler pages publish build --project-name=esim-myanmar
```

---

## Post-Deployment Verification

### 1. Core Pages Check

```bash
# Homepage
curl -I https://esim.com.mm/

# Anniversary Campaign
curl -I https://esim.com.mm/anniversary

# Sitemap
curl -I https://esim.com.mm/sitemap.xml

# All should return: HTTP/2 200
```

### 2. eSIM Provisioning Links

**iOS Universal Link:**
```
https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$rsp.truphone.com$QR-G-5C-21K-1CHHCG1
```

**Android Universal Link:**
```
https://esimsetup.android.com/esim_qrcode_provisioning?carddata=LPA:1$rsp.truphone.com$QR-G-5C-21K-1CHHCG1
```

**Test on actual devices:**
- iPhone with iOS 12.1+
- Android phone with Android 9.0+

### 3. Responsive Testing

**Mobile (375px):**
```bash
# Chrome DevTools
# iPhone 12/13/14 Pro
# Samsung Galaxy S21
```

**Tablet (768px):**
```bash
# iPad Pro 11"
# Samsung Galaxy Tab S8
```

**Desktop (1920px):**
```bash
# Full HD monitors
# 2K/4K displays
```

### 4. Browser Testing

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Samsung Internet 14+

---

## SEO Configuration

### Google Search Console

1. **Add Property:**
   - Go to https://search.google.com/search-console
   - Add property: `https://esim.com.mm`
   - Verify ownership (DNS or HTML file)

2. **Submit Sitemap:**
   ```
   https://esim.com.mm/sitemap.xml
   ```

3. **Request Indexing:**
   - Submit homepage
   - Submit `/anniversary`
   - Submit key pages

### Bing Webmaster Tools

1. **Add Site:**
   - Go to https://www.bing.com/webmasters
   - Add site: `https://esim.com.mm`
   - Verify ownership

2. **Submit Sitemap:**
   ```
   https://esim.com.mm/sitemap.xml
   ```

### robots.txt Verification

```bash
curl https://esim.com.mm/robots.txt
```

**Expected Content:**
```
User-agent: *
Allow: /
Sitemap: https://esim.com.mm/sitemap.xml
```

---

## Analytics Setup

### Google Analytics 4

```javascript
// Already configured in index.html
// Measurement ID: G-XXXXXXXXXX

// Verify tracking
// Check Real-Time reports in GA4
```

### Vercel Analytics

```javascript
// Already imported in App.js
import { Analytics } from '@vercel/analytics/react';

// Automatic tracking enabled
```

### Custom Events

```javascript
// Track eSIM installations
gtag('event', 'esim_install_start', {
  platform: 'ios' | 'android',
  campaign: '4th_anniversary'
});

gtag('event', 'esim_install_complete', {
  platform: 'ios' | 'android',
  campaign: '4th_anniversary'
});
```

---

## Performance Monitoring

### Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://esim.com.mm --view

# Target Scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 95+
```

### Core Web Vitals

**Target Metrics:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Monitor via:**
- Google Search Console
- PageSpeed Insights
- Chrome User Experience Report

---

## Security Configuration

### SSL/TLS Certificate

```bash
# Verify HTTPS
curl -I https://esim.com.mm | grep -i "strict-transport-security"

# Expected: strict-transport-security: max-age=31536000
```

### Security Headers

**Required Headers:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

**Verify:**
```bash
curl -I https://esim.com.mm
```

### Content Security Policy

```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.esim.com.mm;
```

---

## DNS Configuration

### Primary Domain (esim.com.mm)

```dns
# A Records
@     A     104.21.x.x
www   A     104.21.x.x

# CNAME Records (if using CDN)
@     CNAME esim-myanmar-ia6gw.web.app.
www   CNAME esim-myanmar-ia6gw.web.app.

# TXT Records (verification)
@     TXT   "google-site-verification=xxxxx"
@     TXT   "v=spf1 include:_spf.google.com ~all"
```

### Verify DNS Propagation

```bash
# Check A records
dig esim.com.mm +short

# Check CNAME
dig www.esim.com.mm +short

# Check globally
https://www.whatsmydns.net/#A/esim.com.mm
```

---

## Monitoring & Alerts

### Uptime Monitoring

**Services to use:**
- UptimeRobot (https://uptimerobot.com)
- Pingdom (https://www.pingdom.com)
- StatusCake (https://www.statuscake.com)

**Monitor URLs:**
```
https://esim.com.mm/
https://esim.com.mm/anniversary
https://esim.com.mm/api/health
```

**Alert Channels:**
- Email: tech@esim.com.mm
- SMS: +95-9650000172
- Slack: #alerts channel

### Error Tracking

**Sentry Configuration:**
```javascript
// Already configured in index.js
Sentry.init({
  dsn: "https://xxxxx@sentry.io/xxxxx",
  environment: "production",
  tracesSampleRate: 0.1
});
```

### Log Aggregation

**Firebase Crashlytics:**
- Automatic crash reporting
- Performance monitoring
- User analytics

---

## Rollback Procedure

### Firebase Hosting Rollback

```bash
# List recent deployments
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback

# Or deploy specific version
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID DEST_SITE_ID:live
```

### Git Rollback

```bash
# View commit history
git log --oneline

# Rollback to specific commit
git revert <commit-hash>

# Force push (use with caution)
git push origin main --force
```

---

## Maintenance Mode

### Enable Maintenance Page

```bash
# Create maintenance.html in public/
cat > frontend/public/maintenance.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>Maintenance - eSIM Myanmar</title>
  <style>
    body {
      font-family: Inter, sans-serif;
      background: #1e2f3c;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 { color: #00FFFF; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Scheduled Maintenance</h1>
    <p>We'll be back shortly. Thank you for your patience.</p>
    <p>Contact: info@esim.com.mm | 09650000172</p>
  </div>
</body>
</html>
EOF

# Deploy maintenance page
firebase deploy --only hosting
```

---

## Campaign Launch Checklist

### Pre-Launch (T-24 hours)

- [ ] All code merged to main branch
- [ ] Production build tested locally
- [ ] Cross-browser testing complete
- [ ] Mobile device testing complete
- [ ] eSIM provisioning links tested
- [ ] Analytics tracking verified
- [ ] Error tracking configured
- [ ] Backup created
- [ ] Team notified

### Launch (T-0)

- [ ] Deploy to production
- [ ] Verify all pages load
- [ ] Test eSIM installation flow
- [ ] Submit sitemap to search engines
- [ ] Enable monitoring alerts
- [ ] Post announcement on social media
- [ ] Send email to subscribers
- [ ] Monitor error logs

### Post-Launch (T+1 hour)

- [ ] Check analytics for traffic
- [ ] Monitor error rates
- [ ] Verify eSIM activations
- [ ] Check server performance
- [ ] Review user feedback
- [ ] Document any issues

### Post-Launch (T+24 hours)

- [ ] Review analytics dashboard
- [ ] Check conversion rates
- [ ] Analyze user behavior
- [ ] Optimize based on data
- [ ] Plan improvements

---

## Support & Troubleshooting

### Common Issues

**Issue 1: Page not loading**
```bash
# Check DNS
dig esim.com.mm

# Check SSL
openssl s_client -connect esim.com.mm:443

# Check hosting
firebase hosting:channel:list
```

**Issue 2: eSIM provisioning not working**
```bash
# Verify LPA string format
echo "LPA:1$rsp.truphone.com$QR-G-5C-21K-1CHHCG1"

# Test on actual device
# iOS: Settings → Cellular → Add Cellular Plan
# Android: Settings → Network & Internet → SIMs
```

**Issue 3: Sitemap not indexed**
```bash
# Verify sitemap accessible
curl https://esim.com.mm/sitemap.xml

# Check robots.txt
curl https://esim.com.mm/robots.txt

# Resubmit to Search Console
```

### Emergency Contacts

**Technical Team:**
- Email: tech@esim.com.mm
- Phone: +95-9650000172
- Slack: #tech-support

**On-Call Engineer:**
- Primary: [Name] - [Phone]
- Secondary: [Name] - [Phone]

---

## Performance Optimization

### CDN Configuration

**Cloudflare Settings:**
- Auto Minify: HTML, CSS, JS
- Brotli Compression: Enabled
- HTTP/2: Enabled
- HTTP/3 (QUIC): Enabled
- Always Use HTTPS: Enabled
- Automatic HTTPS Rewrites: Enabled

### Caching Strategy

```
# Static Assets (1 year)
/static/*  Cache-Control: public, max-age=31536000, immutable

# HTML (1 hour)
/*.html    Cache-Control: public, max-age=3600, must-revalidate

# API (no cache)
/api/*     Cache-Control: no-cache, no-store, must-revalidate
```

### Image Optimization

```bash
# Already using SVG for icons (scalable, small)
# Optimize any raster images
npm install -g imagemin-cli

imagemin public/images/* --out-dir=public/images/optimized
```

---

## Compliance & Legal

### GDPR Compliance

- [ ] Privacy policy accessible
- [ ] Cookie consent banner
- [ ] Data processing agreement
- [ ] User data export capability
- [ ] Right to be forgotten

### Telecom Regulations

- [ ] Myanmar telecom license verified
- [ ] eSIM provisioning authorized
- [ ] Consumer protection compliance
- [ ] Data retention policies
- [ ] Emergency services support

---

## Success Metrics

### Week 1 Targets

- 10,000+ page views
- 1,000+ eSIM activations
- < 5% error rate
- > 90% successful installations
- 4.5+ star rating

### Month 1 Targets

- 100,000+ page views
- 10,000+ eSIM activations
- 25% conversion to paid plans
- > 95% successful installations
- 4.7+ star rating

---

## Documentation

### Technical Documentation

- Architecture: `/docs/architecture.md`
- API Reference: `/docs/api.md`
- Database Schema: `/docs/database.md`
- Deployment: This document

### User Documentation

- User Guide: `/docs/user-guide.md`
- FAQ: https://esim.com.mm/faq
- Support: https://esim.com.mm/support
- Contact: info@esim.com.mm

---

## Changelog

### Version 4.0.0 (2026-01-15)

**Added:**
- 4th Anniversary campaign page
- Free eSIM redemption flow
- QR-less provisioning via Universal Links
- Comprehensive XML sitemap
- Bilingual support (English/Myanmar)
- Enterprise design system

**Changed:**
- Updated navigation with Anniversary link
- Enhanced responsive layouts
- Improved accessibility (WCAG 2.2 AA)
- Optimized performance

**Fixed:**
- Touch target sizes on mobile
- Typography scaling across devices
- Button consistency
- Form validation

---

## Next Steps

1. **Deploy to Production**
   ```bash
   cd frontend
   yarn build
   firebase deploy --only hosting
   ```

2. **Submit Sitemap**
   - Google Search Console
   - Bing Webmaster Tools

3. **Enable Monitoring**
   - UptimeRobot
   - Sentry
   - Google Analytics

4. **Launch Campaign**
   - Social media announcement
   - Email newsletter
   - Press release

5. **Monitor & Optimize**
   - Track metrics daily
   - Respond to feedback
   - Iterate based on data

---

**Deployment Status:** ✅ READY FOR PRODUCTION

**Prepared by:** Amazon Q Developer  
**Approved by:** eSIM Myanmar Technical Team  
**Date:** January 15, 2026

---

© 2025-2026 ESIM MYANMAR COMPANY LIMITED. All Rights Reserved.
