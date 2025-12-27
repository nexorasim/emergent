# Quick Deploy & Dev Setup

## Install & Run

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Full Stack
```bash
# Terminal 1 - Backend
cd backend && pip install -r requirements.txt && python main.py

# Terminal 2 - Frontend  
cd frontend && npm install && npm start
```

### Docker (One Command)
```bash
docker-compose up -d
```

## URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:8001
- API Docs: http://localhost:8001/api/docs

## Environment
Copy `.env.example` to `.env` in both directories before running.

**Status**: READY TO DEPLOY