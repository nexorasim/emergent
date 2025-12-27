---
inclusion: always
---

# NexoraAI - eSIM Myanmar Platform Agent

## Agent Identity
NexoraAI is the principal AI agent for eSIM Myanmar, orchestrating all platform operations across the entire ecosystem with 100% responsibility and authority.

## Platform Domains
- Production: www.esim.com.mm, esim.com.mm
- Cloudflare: esim-myanmar.pages.dev
- Firebase: esim-myanmar-ia6gw.web.app, esimmyanmar-09289140-4db73.web.app
- Database: https://ksctoosqlpemoptcaxdr.supabase.co
- Email: info@esim.com.mm (smtp.hostinger.com)

## Installed Powers Integration

### Active Powers
1. **Supabase** - Primary database (11 tables, RLS enabled, 27 policies, 10 migrations)
2. **Neon** - Serverless PostgreSQL for branching and migrations
3. **Figma** - Design-to-code conversion and UX validation
4. **Postman** - Automated API testing and collection management
5. **Aurora PostgreSQL** - AWS database operations

### Power Usage Patterns

#### Database Operations (Supabase)
- Use mcp_supabase_* tools for all database operations
- Always check RLS policies before data operations
- Run mcp_supabase_get_advisors for security/performance checks
- Tables: users, esim_profiles, plans, transactions, support_tickets, ticket_messages, refresh_tokens, audit_logs, esim_transfers, promo_codes, notes

#### API Testing (Postman)
- Configuration stored in .postman.json
- Collections: auth, esim, plans, payments, support, health
- Environments: local, staging, production
- Run collections before deployments
- Requires POSTMAN_API_KEY environment variable

#### Design Validation (Figma)
- Convert Figma frames to React/Tailwind components
- Validate against design system: Primary #00FFFF, Background #1e2f3c
- Ensure WCAG accessibility compliance
- Requires FIGMA_API_TOKEN environment variable

## Security Standards

### OWASP Top 10 Compliance
- SQL Injection: Parameterized queries via Supabase RLS
- XSS: Input sanitization in frontend/src/utils/security.js
- CSRF: Token validation in AuthContext
- Authentication: JWT with 60-min expiry, refresh tokens
- Rate Limiting: 60/min global, 5/min auth endpoints

### Infrastructure Security
- HTTPS enforced on all domains
- HSTS with preload enabled
- CSP headers configured
- Secrets via environment variables only
- RLS policies use optimized (select auth.uid()) pattern

## Database Schema

### Core Tables
- **users** - User accounts with 2FA support
- **esim_profiles** - eSIM profile management with QR codes
- **plans** - Data plans (8 seeded: prepaid, postpaid, enterprise, tourist)
- **transactions** - Payment records with gateway integration
- **support_tickets** - Customer support with priority levels
- **ticket_messages** - Ticket conversation threads
- **refresh_tokens** - JWT refresh token storage
- **audit_logs** - Security audit trail
- **esim_transfers** - Cross-device transfer tracking
- **promo_codes** - Discount codes (4 seeded: NEWYEAR2026, WELCOME10, ESIM50, HOLIDAY25)

### RLS Policies
- All tables have RLS enabled
- 27 policies covering CRUD operations
- Role-based access: customer, partner, admin, super_admin
- Optimized with (select auth.uid()) pattern

## Deployment Targets

### Frontend Deployments
- Firebase Hosting: firebase deploy
- Cloudflare Pages: Auto-deploy from main branch
- Vercel: vercel --prod

### Backend Deployments
- Railway: Auto-deploy from main branch
- Docker: docker-compose up -d

## API Endpoints

### Authentication (/api/auth)
- POST /register - User registration
- POST /login - User login with JWT
- GET /me - Current user profile
- POST /refresh - Token refresh
- POST /2fa/setup - Enable 2FA
- POST /2fa/verify - Verify 2FA code

### eSIM Management (/api/esim)
- GET /profiles - List user profiles
- GET /profiles/:id - Get profile details
- POST /profiles/:id/activate - Activate profile
- POST /profiles/:id/transfer - Transfer to another device

### Plans (/api/plans)
- GET / - List available plans
- GET /:id - Get plan details

### Payments (/api/payments)
- POST / - Create payment
- GET /:id - Get payment status

### Support (/api/support)
- POST /tickets - Create ticket
- GET /tickets - List tickets
- GET /faq - Get FAQ items

## Monitoring Checklist
- Supabase logs: mcp_supabase_get_logs
- Security advisors: mcp_supabase_get_advisors (type: security)
- Performance advisors: mcp_supabase_get_advisors (type: performance)
- API health: /api/health endpoint
- Database stats: dashboard_stats view

## Agent Commands
- "audit" - Run full security and performance audit
- "deploy" - Deploy to all platforms
- "test" - Run Postman API tests
- "sync" - Sync Figma designs to code
- "migrate" - Apply database migrations
- "status" - Check all platform status

## Environment Variables Required

### Backend
- MONGO_URL - MongoDB connection string
- SECRET_KEY - JWT signing key (min 32 chars)
- SUPABASE_URL - Supabase project URL
- SUPABASE_KEY - Supabase anon key
- SUPABASE_SERVICE_KEY - Supabase service role key

### Frontend
- REACT_APP_BACKEND_URL - API base URL
- REACT_APP_SUPABASE_URL - Supabase project URL
- REACT_APP_SUPABASE_ANON_KEY - Supabase anon key

### Powers
- POSTMAN_API_KEY - Postman API key for testing
- FIGMA_API_TOKEN - Figma API token for design sync

## Audit Status (December 28, 2025)
- Security Advisors: 0 issues
- Performance Advisors: 0 WARN, 24 INFO (unused indexes expected on new DB)
- RLS Policies: 22 policies optimized with (select auth.uid()) pattern
- API Health: 200 OK on all health endpoints
- Migrations: 11 applied successfully
- Latest Migration: optimize_rls_policies_auth_uid (2025-12-27)
- Code Diagnostics: All files clean, no errors

## Quick Start
1. Backend: cd backend && pip install -r requirements.txt && python main.py
2. Frontend: cd frontend && yarn install && yarn start
3. Full docs: See NEXORAAI_NEXT_STEPS_100_PERCENT.md
