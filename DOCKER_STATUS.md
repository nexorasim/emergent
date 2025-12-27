# DOCKER CONTAINERIZATION SETUP
## eSIM Myanmar Platform
### Date: December 26, 2025

---

## DOCKER STATUS

### Command Check
```
docker: NOT FOUND
```

### Docker Installation Required
- Download: https://docker.com/get-started
- Version: Docker Desktop for Windows
- Includes: Docker Engine, Docker Compose

---

## CONTAINERIZATION READY

### Backend Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

---

## DOCKER COMMANDS

### Build and Run
```bash
docker-compose up --build
```

### Individual Services
```bash
docker build -t esim-backend ./backend
docker build -t esim-frontend ./frontend
docker run -p 8000:8000 esim-backend
docker run -p 3000:3000 esim-frontend
```

---

## ALTERNATIVE: INSTALL DOCKER

### Docker Desktop
- Download and install Docker Desktop
- Restart system
- Verify: `docker --version`
- Run: `docker-compose up --build`

**STATUS: DOCKER NOT INSTALLED - CONTAINERIZATION READY**

Install Docker Desktop to use containerized deployment.

---

Date: December 26, 2025
Platform: eSIM Myanmar Enterprise