# Project Structure

```
├── backend/
│   ├── main.py             # FastAPI app entry point (modular)
│   ├── server.py           # Legacy single-file app
│   ├── config.py           # Centralized configuration
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment template
│   ├── models/             # Pydantic models
│   │   ├── user.py         # User models with validation
│   │   ├── esim.py         # eSIM profile models
│   │   ├── payment.py      # Payment/transaction models
│   │   └── support.py      # Support ticket models
│   ├── routers/            # API route handlers
│   │   ├── auth.py         # Authentication endpoints
│   │   ├── esim.py         # eSIM management endpoints
│   │   ├── plans.py        # Plans and pricing
│   │   ├── payments.py     # Payment processing
│   │   └── support.py      # Support tickets
│   ├── services/           # Business logic
│   │   ├── auth_service.py # Auth, JWT, 2FA
│   │   ├── esim_service.py # eSIM operations
│   │   └── payment_service.py # Payment gateways
│   └── middleware/         # Request middleware
│       └── security.py     # Rate limiting, headers, logging
│
├── frontend/
│   ├── public/             # Static assets
│   └── src/
│       ├── App.js          # Root component, routing
│       ├── components/     # Shared UI components
│       │   ├── Navigation.js
│       │   ├── Footer.js
│       │   ├── SeasonalSanta.js    # GSAP animated Santa
│       │   ├── SeasonalBanner.js   # Holiday banner
│       │   ├── Countdown2026.js    # New Year countdown
│       │   └── IoTDashboard.js     # IoT-style widgets
│       ├── context/        # React contexts
│       ├── i18n/           # Translations (EN/MM)
│       ├── pages/          # Route components
│       │   ├── auth/       # Login, Register
│       │   ├── admin/      # Admin dashboard
│       │   ├── customer/   # Customer dashboard
│       │   ├── partner/    # Partner dashboard
│       │   └── EnterpriseHome.js   # Enterprise landing
│       ├── styles/         # CSS themes
│       │   ├── enterprise.css      # Enterprise design system
│       │   └── seasonal-2026.css   # Seasonal theme
│       └── utils/
│           ├── api.js              # Axios instance
│           ├── seasonalConfig.js   # Seasonal feature flags
│           └── themeSwitcher.js
│
├── .github/workflows/      # CI/CD pipelines
│   └── ci-cd.yml           # Test, build, deploy
├── docker-compose.yml      # Local dev environment
├── Dockerfile.backend      # Backend container
├── Dockerfile.frontend     # Frontend container
└── nginx.conf              # Production proxy config
```

## Conventions

### Frontend
- Pages in `pages/` organized by role (admin, customer, partner, auth)
- Shared components in `components/`
- API calls via `utils/api.js` axios instance
- Auth state via `AuthContext`, i18n via `LanguageContext`
- Tailwind for styling with custom colors (primary: #00FFFF cyan, background: #1e2f3c dark blue)
- Seasonal features controlled via `utils/seasonalConfig.js`
- GSAP for advanced animations (lazy-loaded)

### Backend
- Modular structure: routers, services, models, middleware
- Legacy `server.py` maintained for backward compatibility
- Use `main.py` for new deployments
- Pydantic models for request/response validation
- MongoDB collections: users, esim_profiles, devices, transactions, plans, support_tickets, refresh_tokens
- JWT Bearer auth via `get_current_user` dependency
- Rate limiting and security headers via middleware

### API Pattern
- All endpoints prefixed with `/api/`
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/refresh`
- eSIM: `/api/esim/profiles`, `/api/esim/profiles/{id}/activate`, `/api/esim/profiles/{id}/transfer`
- Plans: `/api/plans`
- Payments: `/api/payments`
- Support: `/api/support/tickets`, `/api/support/faq`
- Protected routes use `Depends(get_current_user)`
- Admin routes use `Depends(get_admin_user)`
