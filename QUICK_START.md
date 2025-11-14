# eSIM Myanmar Entertainment Server - Quick Start Guide

## Instant Setup (3 Minutes)

### Prerequisites Check
```bash
# Check Node.js
node --version  # Should be 18+

# Check Python
python3 --version  # Should be 3.11+

# Check Yarn
yarn --version

# Check MongoDB
mongod --version
```

## Method 1: Local Development (Recommended for Testing)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/esim-myanmar.git
cd esim-myanmar
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

**Frontend:**
```bash
cd frontend
yarn install
cd ..
```

### Step 3: Start Services

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
python server.py
# Backend running on http://localhost:8001
```

**Terminal 3 - Frontend:**
```bash
cd frontend
yarn start
# Frontend running on http://localhost:3000
```

### Step 4: Open Browser
Navigate to: http://localhost:3000

## Method 2: Docker Deployment (Production-Ready)

### Single Command Deployment
```bash
docker-compose up -d
```

**Access:**
- Frontend: http://localhost
- Backend API: http://localhost:8001/api

### Stop Services
```bash
docker-compose down
```

## Method 3: Existing Environment (Current Setup)

Services are already running via supervisor:

```bash
# Check status
sudo supervisorctl -c /etc/supervisor/supervisord.conf status

# Restart services
sudo supervisorctl -c /etc/supervisor/supervisord.conf restart all

# View logs
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/frontend.out.log
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api

## Quick Test

### 1. Test Backend API
```bash
curl http://localhost:8001/api
```

Expected response:
```json
{
  "message": "eSIM Myanmar Entertainment Server API",
  "version": "1.0.0",
  "status": "operational"
}
```

### 2. Test Frontend
Open browser: http://localhost:3000

You should see:
- Premium landing page with gradient effects
- Navigation bar with menu items
- Hero section with statistics
- Feature showcase
- Entertainment services
- Footer with contact information

### 3. Test Registration
1. Click "Get Started" or "Register"
2. Fill in the form:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 09123456789
   - Password: Test123!
3. Click "Create Account"
4. You should be redirected to the dashboard

### 4. Test eSIM Creation
1. In dashboard, click "Create New eSIM"
2. Confirm creation
3. View QR code for activation
4. Check profile details

## Troubleshooting

### Backend Not Starting
```bash
# Check logs
tail -50 /var/log/supervisor/backend.err.log

# Common fixes
cd backend
pip install -r requirements.txt --force-reinstall
python server.py
```

### Frontend Not Loading
```bash
# Check logs
tail -50 /var/log/supervisor/frontend.err.log

# Common fixes
cd frontend
rm -rf node_modules
yarn install
yarn start
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Or manually
mongod --dbpath /data/db
```

### Port Already in Use
```bash
# Backend (8001)
lsof -ti:8001 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

## Default Plans

The system comes with 3 pre-configured plans:

1. **Basic 5G**
   - 10 GB data
   - 30 days validity
   - 5,000 MMK
   - Features: 5G, VoLTE, Roaming

2. **Premium 5G**
   - 50 GB data
   - 30 days validity
   - 20,000 MMK
   - Features: 5G, VoLTE, Roaming, Entertainment

3. **Enterprise Unlimited**
   - 999 GB data
   - 365 days validity
   - 500,000 MMK
   - Features: 5G, VoLTE, Roaming, Priority Support

## API Endpoints Quick Reference

### Public Endpoints
```bash
GET  /api                     # API information
GET  /api/health              # Health check
GET  /api/plans               # List plans
```

### Authentication
```bash
POST /api/auth/register       # Register user
POST /api/auth/login          # Login
GET  /api/auth/me             # Get current user (requires token)
```

### eSIM Management (Requires Authentication)
```bash
POST /api/esim/profiles       # Create eSIM profile
GET  /api/esim/profiles       # List user profiles
POST /api/esim/activate/{id}  # Activate eSIM
POST /api/esim/transfer       # Transfer eSIM
```

## Environment Variables

### Quick Setup

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017/esim_myanmar
SECRET_KEY=change_this_in_production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_DOMAIN=esim.com.mm
REACT_APP_CONTACT_EMAIL=info@esim.com.mm
REACT_APP_CONTACT_PHONE=09650000172
REACT_APP_SOCIAL_HANDLE=@eSIMMyanmar
```

## Development Workflow

### Making Changes

1. **Backend Changes:**
   - Edit files in `/app/backend/`
   - Server auto-reloads (hot reload enabled)
   - Test API: `curl http://localhost:8001/api`

2. **Frontend Changes:**
   - Edit files in `/app/frontend/src/`
   - Browser auto-reloads (hot reload enabled)
   - View changes instantly

### Adding New Pages

1. Create component in `/app/frontend/src/pages/`
2. Add route in `/app/frontend/src/App.js`
3. Update navigation if needed
4. Test in browser

### Adding New API Endpoints

1. Add endpoint in `/app/backend/server.py`
2. Test with curl or Postman
3. Update frontend API calls in `/app/frontend/src/utils/api.js`

## Production Deployment

### Quick Deploy to VPS
```bash
# 1. Clone on server
git clone https://github.com/yourusername/esim-myanmar.git
cd esim-myanmar

# 2. Run deployment script
chmod +x deploy.sh
./deploy.sh
```

### Quick Deploy with Docker
```bash
# On server
git clone https://github.com/yourusername/esim-myanmar.git
cd esim-myanmar
docker-compose up -d
```

## Getting Help

### Documentation
- Full Documentation: README.md
- Deployment Guide: DEPLOYMENT.md
- Project Summary: PROJECT_SUMMARY.md
- Page Structure: PAGES_STRUCTURE.md

### Support Channels
- Email: info@esim.com.mm
- Phone: 09650000172
- Website: esim.com.mm
- Social: @eSIMMyanmar

### Common Issues
- Check logs first
- Verify all services are running
- Ensure ports are available
- Check environment variables
- Verify MongoDB is accessible

## Success Checklist

- [ ] All services started
- [ ] Backend API responding
- [ ] Frontend loading
- [ ] Can register new user
- [ ] Can login
- [ ] Can create eSIM profile
- [ ] Dashboard displays correctly
- [ ] Plans page loads
- [ ] Navigation works

## Next Steps

1. Explore all implemented pages
2. Test eSIM creation and management
3. Review API documentation
4. Customize branding and content
5. Configure production environment
6. Set up domain and SSL
7. Deploy to production
8. Monitor and maintain

---

**Application is ready for deployment and testing!**

Contact: esim.com.mm | info@esim.com.mm | 09650000172 | @eSIMMyanmar
