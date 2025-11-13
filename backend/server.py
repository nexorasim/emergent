from fastapi import FastAPI, HTTPException, Depends, status, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext
import uuid
import pyotp
import qrcode
import io
import base64
from bson import ObjectId
import json

load_dotenv()

app = FastAPI(
    title="eSIM Myanmar Entertainment Server",
    description="Enterprise eSIM Management Platform for 50M Users",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Configuration
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/esim_myanmar")
SECRET_KEY = os.getenv("SECRET_KEY", "esim_myanmar_secret_key_2025")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))

client = AsyncIOMotorClient(MONGO_URL)
db = client.esim_myanmar

# Collections
users_collection = db.users
esim_profiles_collection = db.esim_profiles
devices_collection = db.devices
transactions_collection = db.transactions
plans_collection = db.plans
orders_collection = db.orders
analytics_collection = db.analytics
partners_collection = db.partners
admin_logs_collection = db.admin_logs

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# WebSocket connections manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

# Pydantic Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone: str
    country: str = "Myanmar"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class eSIMActivation(BaseModel):
    plan_id: str
    device_id: str
    phone_number: Optional[str] = None

class DeviceRegistration(BaseModel):
    device_name: str
    device_type: str  # smartphone, tablet, wearable
    os: str  # iOS, Android
    os_version: str
    imei: Optional[str] = None

class eSIMTransfer(BaseModel):
    esim_id: str
    target_device_id: str
    transfer_type: str  # android_to_ios, ios_to_android, same_platform

class PaymentRequest(BaseModel):
    amount: float
    method: str  # kbz_pay, wave_money, aya_pay
    plan_id: Optional[str] = None

class AdminAction(BaseModel):
    action: str
    target_id: str
    details: Dict[str, Any]

# Utility Functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = await users_collection.find_one({"user_id": user_id})
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
    buffer.seek(0)
    img_str = base64.b64encode(buffer.getvalue()).decode()
    return f"data:image/png;base64,{img_str}"

# API Endpoints

@app.get("/api")
async def root():
    return {
        "service": "eSIM Myanmar Entertainment Server",
        "version": "1.0.0",
        "status": "operational",
        "domain": "esim.com.mm",
        "contact": "info@esim.com.mm | 09650000172 | @eSIMMyanmar"
    }

@app.get("/api/health")
async def health_check():
    try:
        await db.command('ping')
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

# Authentication Endpoints

@app.post("/api/auth/register")
async def register(user: UserRegister):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user.password)
    
    user_doc = {
        "user_id": user_id,
        "email": user.email,
        "password": hashed_password,
        "full_name": user.full_name,
        "phone": user.phone,
        "country": user.country,
        "role": "user",
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "two_factor_enabled": False
    }
    
    await users_collection.insert_one(user_doc)
    
    access_token = create_access_token(data={"sub": user_id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "user_id": user_id,
            "email": user.email,
            "full_name": user.full_name,
            "role": "user"
        }
    }

@app.post("/api/auth/login")
async def login(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user["user_id"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user.get("role", "user")
        }
    }

@app.get("/api/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "phone": current_user["phone"],
        "role": current_user.get("role", "user"),
        "status": current_user.get("status", "active")
    }

# eSIM Management Endpoints

@app.post("/api/esim/activate")
async def activate_esim(activation: eSIMActivation, current_user: dict = Depends(get_current_user)):
    esim_id = str(uuid.uuid4())
    iccid = f"8995{uuid.uuid4().hex[:15]}"
    
    plan = await plans_collection.find_one({"plan_id": activation.plan_id})
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    esim_profile = {
        "esim_id": esim_id,
        "user_id": current_user["user_id"],
        "iccid": iccid,
        "plan_id": activation.plan_id,
        "device_id": activation.device_id,
        "phone_number": activation.phone_number or f"+95965{uuid.uuid4().hex[:7]}",
        "status": "active",
        "activation_date": datetime.utcnow(),
        "expiry_date": datetime.utcnow() + timedelta(days=30),
        "data_used": 0,
        "data_limit": plan.get("data_limit", 10000),
        "features": {
            "5g_enabled": True,
            "volte_enabled": True,
            "roaming_enabled": True
        }
    }
    
    await esim_profiles_collection.insert_one(esim_profile)
    
    qr_data = f"LPA:1${iccid}${esim_id}"
    qr_code = generate_qr_code(qr_data)
    
    await manager.broadcast({
        "type": "esim_activated",
        "user_id": current_user["user_id"],
        "esim_id": esim_id
    })
    
    return {
        "esim_id": esim_id,
        "iccid": iccid,
        "phone_number": esim_profile["phone_number"],
        "qr_code": qr_code,
        "status": "active",
        "message": "eSIM activated successfully"
    }

@app.get("/api/esim/profiles")
async def get_esim_profiles(current_user: dict = Depends(get_current_user)):
    profiles = await esim_profiles_collection.find({"user_id": current_user["user_id"]}).to_list(100)
    for profile in profiles:
        profile["_id"] = str(profile["_id"])
    return {"profiles": profiles}

@app.post("/api/esim/transfer")
async def transfer_esim(transfer: eSIMTransfer, current_user: dict = Depends(get_current_user)):
    esim = await esim_profiles_collection.find_one({
        "esim_id": transfer.esim_id,
        "user_id": current_user["user_id"]
    })
    
    if not esim:
        raise HTTPException(status_code=404, detail="eSIM profile not found")
    
    transfer_id = str(uuid.uuid4())
    
    await esim_profiles_collection.update_one(
        {"esim_id": transfer.esim_id},
        {
            "$set": {
                "device_id": transfer.target_device_id,
                "updated_at": datetime.utcnow(),
                "transfer_history": {
                    "transfer_id": transfer_id,
                    "type": transfer.transfer_type,
                    "date": datetime.utcnow()
                }
            }
        }
    )
    
    return {
        "transfer_id": transfer_id,
        "status": "completed",
        "message": f"eSIM transferred successfully ({transfer.transfer_type})"
    }

@app.get("/api/esim/qr/{esim_id}")
async def get_esim_qr(esim_id: str, current_user: dict = Depends(get_current_user)):
    esim = await esim_profiles_collection.find_one({
        "esim_id": esim_id,
        "user_id": current_user["user_id"]
    })
    
    if not esim:
        raise HTTPException(status_code=404, detail="eSIM profile not found")
    
    qr_data = f"LPA:1${esim['iccid']}${esim_id}"
    qr_code = generate_qr_code(qr_data)
    
    return {"qr_code": qr_code, "esim_id": esim_id, "iccid": esim["iccid"]}

# Device Management

@app.post("/api/devices/register")
async def register_device(device: DeviceRegistration, current_user: dict = Depends(get_current_user)):
    device_id = str(uuid.uuid4())
    
    device_doc = {
        "device_id": device_id,
        "user_id": current_user["user_id"],
        "device_name": device.device_name,
        "device_type": device.device_type,
        "os": device.os,
        "os_version": device.os_version,
        "imei": device.imei,
        "status": "active",
        "registered_at": datetime.utcnow()
    }
    
    await devices_collection.insert_one(device_doc)
    
    return {"device_id": device_id, "status": "registered"}

@app.get("/api/devices")
async def get_devices(current_user: dict = Depends(get_current_user)):
    devices = await devices_collection.find({"user_id": current_user["user_id"]}).to_list(100)
    for device in devices:
        device["_id"] = str(device["_id"])
    return {"devices": devices}

# Plans and Pricing

@app.get("/api/plans")
async def get_plans():
    plans = await plans_collection.find().to_list(100)
    if not plans:
        # Initialize default plans
        default_plans = [
            {
                "plan_id": str(uuid.uuid4()),
                "name": "Entertainment Basic",
                "data_limit": 5000,
                "validity_days": 30,
                "price": 5000,
                "currency": "MMK",
                "features": ["5G", "VoLTE", "Unlimited Social Media"],
                "category": "basic"
            },
            {
                "plan_id": str(uuid.uuid4()),
                "name": "Entertainment Pro",
                "data_limit": 20000,
                "validity_days": 30,
                "price": 15000,
                "currency": "MMK",
                "features": ["5G", "VoLTE", "Roaming", "HD Streaming"],
                "category": "pro"
            },
            {
                "plan_id": str(uuid.uuid4()),
                "name": "Entertainment Ultimate",
                "data_limit": 100000,
                "validity_days": 30,
                "price": 50000,
                "currency": "MMK",
                "features": ["5G", "VoLTE", "Global Roaming", "4K Streaming", "Priority Support"],
                "category": "ultimate"
            }
        ]
        await plans_collection.insert_many(default_plans)
        plans = default_plans
    
    for plan in plans:
        if "_id" in plan:
            plan["_id"] = str(plan["_id"])
    return {"plans": plans}

# Payment Processing

@app.post("/api/payment/process")
async def process_payment(payment: PaymentRequest, current_user: dict = Depends(get_current_user)):
    transaction_id = str(uuid.uuid4())
    
    transaction = {
        "transaction_id": transaction_id,
        "user_id": current_user["user_id"],
        "amount": payment.amount,
        "method": payment.method,
        "plan_id": payment.plan_id,
        "status": "completed",
        "timestamp": datetime.utcnow()
    }
    
    await transactions_collection.insert_one(transaction)
    
    return {
        "transaction_id": transaction_id,
        "status": "completed",
        "message": "Payment processed successfully"
    }

@app.get("/api/payment/history")
async def payment_history(current_user: dict = Depends(get_current_user)):
    transactions = await transactions_collection.find({"user_id": current_user["user_id"]}).to_list(100)
    for transaction in transactions:
        transaction["_id"] = str(transaction["_id"])
    return {"transactions": transactions}

# Analytics

@app.get("/api/analytics/dashboard")
async def get_analytics(current_user: dict = Depends(get_current_user)):
    total_users = await users_collection.count_documents({})
    active_esims = await esim_profiles_collection.count_documents({"status": "active"})
    total_revenue = await transactions_collection.aggregate([
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ]).to_list(1)
    
    return {
        "total_users": total_users,
        "active_esims": active_esims,
        "total_revenue": total_revenue[0]["total"] if total_revenue else 0,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/analytics/usage")
async def get_usage_analytics(current_user: dict = Depends(get_current_user)):
    profiles = await esim_profiles_collection.find({"user_id": current_user["user_id"]}).to_list(100)
    
    usage_data = []
    for profile in profiles:
        usage_data.append({
            "esim_id": profile["esim_id"],
            "data_used": profile.get("data_used", 0),
            "data_limit": profile.get("data_limit", 0),
            "percentage": (profile.get("data_used", 0) / profile.get("data_limit", 1)) * 100
        })
    
    return {"usage": usage_data}

# Admin Endpoints

@app.get("/api/admin/users")
async def admin_get_users(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    users = await users_collection.find().to_list(1000)
    for user in users:
        user["_id"] = str(user["_id"])
        user.pop("password", None)
    return {"users": users}

@app.post("/api/admin/action")
async def admin_action(action: AdminAction, current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    log_entry = {
        "log_id": str(uuid.uuid4()),
        "admin_id": current_user["user_id"],
        "action": action.action,
        "target_id": action.target_id,
        "details": action.details,
        "timestamp": datetime.utcnow()
    }
    
    await admin_logs_collection.insert_one(log_entry)
    
    return {"status": "logged", "log_id": log_entry["log_id"]}

# Partner Portal

@app.post("/api/partner/register")
async def register_partner(partner_data: dict, current_user: dict = Depends(get_current_user)):
    partner_id = str(uuid.uuid4())
    
    partner_doc = {
        "partner_id": partner_id,
        "user_id": current_user["user_id"],
        "company_name": partner_data.get("company_name"),
        "partner_type": partner_data.get("partner_type"),  # affiliate, reseller, enterprise
        "commission_rate": partner_data.get("commission_rate", 10),
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    await partners_collection.insert_one(partner_doc)
    
    return {"partner_id": partner_id, "status": "pending_approval"}

@app.get("/api/partner/dashboard")
async def partner_dashboard(current_user: dict = Depends(get_current_user)):
    partner = await partners_collection.find_one({"user_id": current_user["user_id"]})
    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")
    
    return {
        "partner_id": partner["partner_id"],
        "sales": 0,
        "commissions": 0,
        "status": partner["status"]
    }

# WebSocket for real-time updates

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast({"user_id": user_id, "message": data})
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)