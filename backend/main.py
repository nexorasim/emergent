"""
eSIM Myanmar Entertainment Server - Main Application
Enterprise-grade eSIM management platform
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
import logging
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from routers import auth_router, esim_router, plans_router, payments_router, support_router
from routers.esim_registration import router as esim_registration_router

# Import services
from services.auth_service import AuthService
from services.esim_service import ESIMService
from services.payment_service import PaymentService, KBZPayGateway, WaveMoneyGateway, AYAPayGateway

# Import middleware
from middleware.security import (
    RateLimitMiddleware,
    SecurityHeadersMiddleware,
    RequestLoggingMiddleware,
    get_cors_config
)

# Configure logging
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/esim_myanmar")
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    logger.warning("SECRET_KEY not set! Using default for development only.")
    SECRET_KEY = "dev_secret_key_change_in_production"

ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info(f"Starting eSIM Myanmar Server in {ENVIRONMENT} mode")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.get_database()
    
    # Test connection
    try:
        await client.admin.command('ping')
        logger.info("MongoDB connection established")
    except Exception as e:
        logger.error(f"MongoDB connection failed: {e}")
        raise
    
    # Initialize services
    auth_service = AuthService(
        db=db,
        secret_key=SECRET_KEY,
        algorithm=ALGORITHM,
        access_token_expire_minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )
    
    esim_service = ESIMService(db=db)
    
    payment_service = PaymentService(db=db)
    
    # Add payment gateways (sandbox mode for development)
    is_sandbox = ENVIRONMENT != "production"
    
    if os.getenv("KBZ_PAY_MERCHANT_ID"):
        payment_service.add_gateway(
            "kbz_pay",
            KBZPayGateway(
                merchant_id=os.getenv("KBZ_PAY_MERCHANT_ID"),
                api_key=os.getenv("KBZ_PAY_API_KEY", ""),
                sandbox=is_sandbox
            )
        )
    
    if os.getenv("WAVE_MONEY_MERCHANT_ID"):
        payment_service.add_gateway(
            "wave_money",
            WaveMoneyGateway(
                merchant_id=os.getenv("WAVE_MONEY_MERCHANT_ID"),
                api_key=os.getenv("WAVE_MONEY_API_KEY", ""),
                sandbox=is_sandbox
            )
        )
    
    if os.getenv("AYA_PAY_MERCHANT_ID"):
        payment_service.add_gateway(
            "aya_pay",
            AYAPayGateway(
                merchant_id=os.getenv("AYA_PAY_MERCHANT_ID"),
                api_key=os.getenv("AYA_PAY_API_KEY", ""),
                sandbox=is_sandbox
            )
        )
    
    # Store in app state
    app.state.db = db
    app.state.mongo_client = client
    app.state.auth_service = auth_service
    app.state.esim_service = esim_service
    app.state.payment_service = payment_service
    
    # Create indexes
    await create_indexes(db)
    
    logger.info("Application startup complete")
    
    yield
    
    # Shutdown
    logger.info("Shutting down application")
    client.close()
    logger.info("MongoDB connection closed")


async def create_indexes(db):
    """Create database indexes for performance"""
    try:
        # Users collection
        await db.users.create_index("email", unique=True)
        await db.users.create_index("user_id", unique=True)
        await db.users.create_index("phone_number")
        
        # eSIM profiles collection
        await db.esim_profiles.create_index("user_id")
        await db.esim_profiles.create_index("iccid", unique=True)
        await db.esim_profiles.create_index("profile_id", unique=True)
        await db.esim_profiles.create_index([("user_id", 1), ("status", 1)])
        
        # Transactions collection
        await db.transactions.create_index("transaction_id", unique=True)
        await db.transactions.create_index("user_id")
        await db.transactions.create_index([("user_id", 1), ("created_at", -1)])
        
        # Support tickets collection
        await db.support_tickets.create_index("ticket_id", unique=True)
        await db.support_tickets.create_index("user_id")
        await db.support_tickets.create_index([("status", 1), ("priority", 1)])
        
        # Refresh tokens collection
        await db.refresh_tokens.create_index("token_id", unique=True)
        await db.refresh_tokens.create_index("user_id")
        await db.refresh_tokens.create_index("expires_at", expireAfterSeconds=0)
        
        logger.info("Database indexes created")
    except Exception as e:
        logger.warning(f"Index creation warning: {e}")


# Create FastAPI application
app = FastAPI(
    title="eSIM Myanmar Entertainment Server API",
    description="Enterprise eSIM Management Platform for Myanmar and ASEAN",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs" if ENVIRONMENT != "production" else None,
    redoc_url="/api/redoc" if ENVIRONMENT != "production" else None
)

# Add middleware (order matters - last added is first executed)
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    RateLimitMiddleware,
    requests_per_minute=int(os.getenv("RATE_LIMIT_PER_MINUTE", 60)),
    burst_limit=int(os.getenv("RATE_LIMIT_BURST", 10))
)

# CORS configuration
cors_config = get_cors_config()
if ENVIRONMENT == "development":
    cors_config["allow_origins"].extend(["http://localhost:3000", "http://127.0.0.1:3000"])

app.add_middleware(
    CORSMiddleware,
    **cors_config
)

# Include routers
app.include_router(auth_router)
app.include_router(esim_router)
app.include_router(plans_router)
app.include_router(payments_router)
app.include_router(support_router)
app.include_router(esim_registration_router)


# Root endpoints
@app.get("/api")
async def root():
    """API root endpoint"""
    return {
        "message": "eSIM Myanmar Entertainment Server API",
        "version": "1.0.0",
        "status": "operational",
        "documentation": "/api/docs" if ENVIRONMENT != "production" else "Contact support"
    }


@app.get("/api/health")
async def health_check(request: Request):
    """Health check endpoint"""
    try:
        # Check MongoDB connection
        await request.app.state.mongo_client.admin.command('ping')
        db_status = "healthy"
    except Exception:
        db_status = "unhealthy"
    
    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "database": db_status,
        "environment": ENVIRONMENT
    }


@app.get("/api/status")
async def system_status(request: Request):
    """System status endpoint"""
    db = request.app.state.db
    
    # Get counts
    user_count = await db.users.count_documents({})
    profile_count = await db.esim_profiles.count_documents({})
    active_profiles = await db.esim_profiles.count_documents({"status": "active"})
    
    return {
        "status": "operational",
        "metrics": {
            "total_users": user_count,
            "total_profiles": profile_count,
            "active_profiles": active_profiles
        },
        "version": "1.0.0"
    }


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal error occurred. Please try again later.",
            "error_id": request.headers.get("X-Request-ID", "unknown")
        }
    )


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8001)),
        reload=ENVIRONMENT == "development",
        log_level=os.getenv("LOG_LEVEL", "info").lower()
    )
