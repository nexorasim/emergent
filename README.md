# eSIM Myanmar Entertainment Server

## Enterprise eSIM Management Platform

Full-featured eSIM management platform serving 50M+ users across ASEAN with advanced features including 5G, VoLTE, cross-platform device transfer, and entertainment services.

## Features

### Core eSIM Features
- eSIM Transfer between Android and Apple devices
- Phone Number Registration
- 5G Network Support
- SIM to eSIM Migration
- VoLTE Enabled
- Advanced International Roaming
- Multi-device Support (iPad, Apple Watch, Wearables)
- Instant QR Code Activation

### Platform Capabilities
- Cloud-native Microservices Architecture
- Network Authentication (OpenID, 2FA)
- Real-time Analytics and Reporting
- Device Management
- Payment Integration (KBZ Pay, Wave Money, AYA Pay)
- SM-DP+ GSMA Compliant

### Entertainment Services
- TV Streaming
- Movies & Series
- Cloud Gaming
- Music Streaming

## Technology Stack

### Backend
- FastAPI 0.109+
- MongoDB (Motor async driver)
- JWT Authentication
- Python 3.11+

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB
- Yarn package manager

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python server.py
```

Backend runs on http://localhost:8001

### Frontend Setup

```bash
cd frontend
yarn install
yarn start
```

Frontend runs on http://localhost:3000

### MongoDB Setup

Ensure MongoDB is running locally or update the MONGO_URL in `.env`:

```bash
mongod --dbpath /path/to/data
```

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/esim_myanmar
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_DOMAIN=esim.com.mm
REACT_APP_CONTACT_EMAIL=info@esim.com.mm
REACT_APP_CONTACT_PHONE=09650000172
REACT_APP_SOCIAL_HANDLE=@eSIMMyanmar
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### eSIM Management
- `POST /api/esim/profiles` - Create eSIM profile
- `GET /api/esim/profiles` - List user profiles
- `POST /api/esim/activate/{profile_id}` - Activate eSIM
- `POST /api/esim/transfer` - Transfer eSIM to new device

### Plans & Pricing
- `GET /api/plans` - List available plans

### Payments
- `POST /api/payments` - Create payment transaction
- `GET /api/payments/{transaction_id}` - Check payment status

### Support
- `POST /api/support/tickets` - Create support ticket
- `GET /api/support/tickets` - List user tickets

## Application Structure

### 100 Pages Architecture

#### Public Pages (30 pages)
- Home, About, Coverage, Speed Test
- Entertainment: TV, Movies, Games, Music
- Products & Plans
- Support & FAQ

#### Customer Portal (30 pages)
- Dashboard, Profile Management
- eSIM Activation & QR Generation
- Usage Analytics
- Device Management
- Transfer & Swap
- Top-up & Payments

#### Partner Portal (20 pages)
- Affiliate Dashboard
- Reseller Management
- Enterprise Solutions
- API Documentation
- Commission Reports

#### Admin Portal (15 pages)
- User Management
- eSIM Inventory
- Payment Management
- Analytics Dashboard
- System Configuration

#### Compliance (5 pages)
- Privacy Policy
- Terms of Service
- GDPR Portal
- Audit Logs

## Contact Information

- Website: esim.com.mm
- Email: info@esim.com.mm
- Phone: 09650000172
- Social: @eSIMMyanmar

## License

Copyright 2025 eSIM Myanmar Entertainment Server. All rights reserved.

## Deployment

### Production Deployment

1. Build frontend:
```bash
cd frontend
yarn build
```

2. Configure production environment variables
3. Deploy to cloud platform (AWS, Azure, GCP)
4. Set up MongoDB Atlas or managed database
5. Configure domain and SSL certificates
6. Set up CI/CD pipeline

### Docker Deployment

Dockerfiles and docker-compose.yml coming soon.

## Support

For support and inquiries, contact our 24/7 support team:
- Email: info@esim.com.mm
- Phone: 09650000172

---

Built with premium design and enterprise-grade technology for Myanmar and ASEAN markets.