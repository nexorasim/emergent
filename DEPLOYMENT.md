# eSIM Myanmar Entertainment Server - Deployment Guide

## Quick Deployment

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB
- Yarn package manager

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/esim-myanmar.git
cd esim-myanmar
```

2. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

3. Install Frontend Dependencies
```bash
cd frontend
yarn install
```

4. Configure Environment Variables

Backend (.env):
```env
MONGO_URL=mongodb://localhost:27017/esim_myanmar
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

Frontend (.env):
```env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_DOMAIN=esim.com.mm
REACT_APP_CONTACT_EMAIL=info@esim.com.mm
REACT_APP_CONTACT_PHONE=09650000172
REACT_APP_SOCIAL_HANDLE=@eSIMMyanmar
```

5. Start MongoDB
```bash
mongod --dbpath /path/to/data
```

6. Start Backend
```bash
cd backend
python server.py
# Backend runs on http://localhost:8001
```

7. Start Frontend
```bash
cd frontend
yarn start
# Frontend runs on http://localhost:3000
```

## Production Deployment

### Option 1: Traditional VPS/Cloud Deployment

#### Backend Deployment

1. Install dependencies
```bash
sudo apt update
sudo apt install python3-pip mongodb nginx
pip3 install -r backend/requirements.txt
```

2. Configure systemd service for backend
```bash
sudo nano /etc/systemd/system/esim-backend.service
```

```ini
[Unit]
Description=eSIM Myanmar Backend
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/esim-myanmar/backend
Environment="PATH=/usr/bin"
ExecStart=/usr/bin/python3 /var/www/esim-myanmar/backend/server.py
Restart=always

[Install]
WantedBy=multi-user.target
```

3. Start backend service
```bash
sudo systemctl enable esim-backend
sudo systemctl start esim-backend
```

#### Frontend Deployment

1. Build frontend
```bash
cd frontend
yarn build
```

2. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/esim.com.mm
```

```nginx
server {
    listen 80;
    server_name esim.com.mm www.esim.com.mm;

    root /var/www/esim-myanmar/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable site and restart Nginx
```bash
sudo ln -s /etc/nginx/sites-available/esim.com.mm /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

4. Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d esim.com.mm -d www.esim.com.mm
```

### Option 2: Docker Deployment

Create Dockerfile for backend:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
EXPOSE 8001
CMD ["python", "server.py"]
```

Create Dockerfile for frontend:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install
COPY frontend/ .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Docker Compose:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: esim_myanmar

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8001:8001"
    environment:
      MONGO_URL: mongodb://mongodb:27017/esim_myanmar
    depends_on:
      - mongodb

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Deploy with Docker:
```bash
docker-compose up -d
```

### Option 3: Cloud Platform Deployment

#### Heroku

1. Install Heroku CLI
2. Create Procfile:
```
web: cd backend && python server.py
```

3. Deploy:
```bash
heroku create esim-myanmar
heroku addons:create mongolab
git push heroku main
```

#### AWS (EC2 + RDS)

1. Launch EC2 instance (Ubuntu 22.04)
2. Create MongoDB database (DocumentDB or self-hosted)
3. Follow traditional VPS deployment steps
4. Configure security groups
5. Setup load balancer and auto-scaling

#### Vercel (Frontend only)

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Deploy frontend
```bash
cd frontend
vercel --prod
```

3. Configure environment variables in Vercel dashboard

#### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

## GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy eSIM Myanmar

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Setup Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        cd frontend && yarn install
        cd ../backend && pip install -r requirements.txt
    
    - name: Build frontend
      run: cd frontend && yarn build
    
    - name: Deploy to server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        source: "."
        target: "/var/www/esim-myanmar"
    
    - name: Restart services
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          sudo systemctl restart esim-backend
          sudo systemctl restart nginx
```

## Post-Deployment

### 1. Verify Deployment
```bash
curl https://esim.com.mm/api
curl https://esim.com.mm
```

### 2. Setup Monitoring
- Configure application monitoring (New Relic, Datadog)
- Setup uptime monitoring
- Configure log aggregation

### 3. Performance Optimization
- Enable CDN (Cloudflare, AWS CloudFront)
- Configure caching
- Optimize database indexes
- Enable compression

### 4. Security Hardening
- Configure firewall rules
- Enable rate limiting
- Setup DDoS protection
- Regular security audits

## Scaling

### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Deploy multiple backend instances
- Setup MongoDB replica set
- Use Redis for session storage

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Use connection pooling
- Implement caching strategies

## Backup & Recovery

### MongoDB Backup
```bash
mongodump --out=/backup/$(date +%Y%m%d)
```

### Automated Backups
```bash
0 2 * * * /usr/bin/mongodump --out=/backup/$(date +\%Y\%m\%d)
```

## Support

For deployment support:
- Email: info@esim.com.mm
- Phone: 09650000172
- Website: esim.com.mm

---

Copyright 2025 eSIM Myanmar Entertainment Server. All rights reserved.