from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
import uuid
import qrcode
import io
import base64

load_dotenv()

app = FastAPI(
    title="eSIM Myanmar Entertainment Server API - NexoraAI Enhanced",
    version="2.0.0",
    description="Enterprise eSIM Platform with NexoraAI Orchestration"
)

# Import Routers
from routers import nexora, payment

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "esim_myanmar_secret_key_2025")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 10080))

# MongoDB Connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/esim_myanmar")
client = AsyncIOMotorClient(MONGO_URL)
db = client.get_database()

# Collections
users_collection = db.users
esim_profiles_collection = db.esim_profiles
devices_collection = db.devices
transactions_collection = db.transactions
plans_collection = db.plans
support_tickets_collection = db.support_tickets

# Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone_number: str
    country: str = "Myanmar"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Helper Functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = await users_collection.find_one({"email": email})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

def generate_qr_code(data: str) -> str:
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    return f"data:image/png;base64,{img_str}"

# API Endpoints
@app.get("/api")
async def root():
    return {
        "message": "eSIM Myanmar Entertainment Server API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/api/auth/register")
async def register(user: UserRegister):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_doc = {
        "user_id": str(uuid.uuid4()),
        "email": user.email,
        "password": hashed_password,
        "full_name": user.full_name,
        "phone_number": user.phone_number,
        "country": user.country,
        "role": "customer",
        "status": "active",
        "created_at": datetime.utcnow()
    }
    
    await users_collection.insert_one(user_doc)
    token = create_access_token({"sub": user.email})
    
    return {
        "message": "User registered successfully",
        "token": token,
        "user": {
            "user_id": user_doc["user_id"],
            "email": user_doc["email"],
            "full_name": user_doc["full_name"],
            "role": user_doc["role"]
        }
    }

@app.post("/api/auth/login")
async def login(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": credentials.email})
    
    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user.get("role", "customer")
        }
    }

@app.get("/api/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return {
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "phone_number": current_user.get("phone_number"),
        "role": current_user.get("role", "customer"),
        "status": current_user.get("status")
    }

@app.post("/api/esim/profiles")
async def create_esim_profile(current_user: dict = Depends(get_current_user)):
    profile = {
        "profile_id": str(uuid.uuid4()),
        "user_id": current_user["user_id"],
        "iccid": f"89959{uuid.uuid4().hex[:15]}",
        "status": "inactive",
        "qr_code": None,
        "activation_date": None,
        "expiry_date": None,
        "data_used": 0.0,
        "data_limit": 0.0,
        "created_at": datetime.utcnow()
    }
    
    qr_data = f"LPA:1$esim.com.mm${profile['iccid']}$"
    profile["qr_code"] = generate_qr_code(qr_data)
    
    await esim_profiles_collection.insert_one(profile)
    
    return {"message": "eSIM profile created", "profile": profile}

@app.get("/api/esim/profiles")
async def get_user_esim_profiles(current_user: dict = Depends(get_current_user)):
    profiles = await esim_profiles_collection.find({"user_id": current_user["user_id"]}).to_list(100)
    return {"profiles": profiles}

@app.get("/api/plans")
async def get_plans():
    plans = await plans_collection.find({}).to_list(100)
    if not plans:
        default_plans = [
            {
                "plan_id": str(uuid.uuid4()),
                "name": "Basic 5G",
                "data_gb": 10.0,
                "validity_days": 30,
                "price": 5000,
                "currency": "MMK",
                "features": ["5G", "VoLTE", "Roaming"],
                "type": "prepaid"
            },
            {
                "plan_id": str(uuid.uuid4()),
                "name": "Premium 5G",
                "data_gb": 50.0,
                "validity_days": 30,
                "price": 20000,
                "currency": "MMK",
                "features": ["5G", "VoLTE", "Roaming", "Entertainment"],
                "type": "prepaid"
            },
            {
                "plan_id": str(uuid.uuid4()),
                "name": "Enterprise Unlimited",
                "data_gb": 999.0,
                "validity_days": 365,
                "price": 500000,
                "currency": "MMK",
                "features": ["5G", "VoLTE", "Roaming", "Priority Support"],
                "type": "postpaid"
            }
        ]
        await plans_collection.insert_many(default_plans)
        plans = default_plans
    
    return {"plans": plans}

# Include Routers
app.include_router(nexora.router)
app.include_router(payment.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)