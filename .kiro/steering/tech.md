# Tech Stack

## Backend
- **Framework**: FastAPI 0.109+ (Python 3.11+)
- **Database**: MongoDB with Motor async driver
- **Auth**: JWT (python-jose), bcrypt password hashing, TOTP 2FA (pyotp)
- **Server**: Uvicorn ASGI
- **Security**: Rate limiting, security headers, request logging

## Frontend
- **Framework**: React 18 with Create React App
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom theme
- **Animation**: Framer Motion, GSAP (seasonal)
- **State**: Zustand, React Context
- **HTTP**: Axios with interceptors
- **Charts**: Recharts

## Infrastructure
- Docker Compose for local development
- MongoDB 7 container
- Nginx reverse proxy (production)
- GitHub Actions CI/CD

## Design System
- Primary: #00FFFF (Cyan)
- Background: #1e2f3c (Dark Blue)
- Pearl: #F8F9FA (Cards, surfaces)
- Glassmorphism for overlays and modals

## Common Commands

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py              # Modular app on :8001
python server.py            # Legacy app on :8001
```

### Frontend
```bash
cd frontend
yarn install
yarn start                  # Dev server on :3000
yarn build                  # Production build
yarn test                   # Run tests
```

### Docker
```bash
docker-compose up -d        # Start all services
docker-compose down         # Stop services
docker-compose logs -f      # View logs
```

## Environment Variables

### Backend
- `MONGO_URL` - MongoDB connection string
- `SECRET_KEY` - JWT signing key (required, min 32 chars)
- `ALGORITHM` - JWT algorithm (HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiry (default: 1440)
- `ENVIRONMENT` - development/staging/production
- `RATE_LIMIT_PER_MINUTE` - API rate limit (default: 60)

### Frontend
- `REACT_APP_BACKEND_URL` - API base URL
- `REACT_APP_DOMAIN` - Site domain

## Seasonal Features
- Active: December 15, 2025 - January 31, 2026
- Auto-reversion: February 1, 2026
- Config: `frontend/src/utils/seasonalConfig.js`
- Components: SeasonalSanta, SeasonalBanner, Countdown2026
