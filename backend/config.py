"""
Configuration Management for eSIM Myanmar Platform
Centralized settings with environment variable support
"""

from pydantic_settings import BaseSettings
from typing import List, Optional
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # Application
    APP_NAME: str = "eSIM Myanmar Entertainment Server"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8001
    
    # Database - MongoDB Atlas
    MONGO_URL: str = "mongodb+srv://Vercel-Admin-esimmyanmar:NpZtcT6vgURsJmv9@esimmyanmar.adullha.mongodb.net/?retryWrites=true&w=majority"
    MONGO_DB_NAME: str = "esim_myanmar"
    MONGO_MAX_POOL_SIZE: int = 100
    MONGO_MIN_POOL_SIZE: int = 10
    
    # PostgreSQL - Neon (Pooled)
    DATABASE_URL: str = "postgresql://neondb_owner:npg_VAK0OQFDW8nG@ep-dry-cake-adwfkrqz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
    
    # Supabase
    SUPABASE_URL: str = "https://ksctoosqlpemoptcaxdr.supabase.co"
    SUPABASE_ANON_KEY: Optional[str] = None
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = None
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours (reduced from 7 days)
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "https://esim.com.mm",
        "https://www.esim.com.mm",
        "https://admin.esim.com.mm",
        "https://partner.esim.com.mm"
    ]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_BURST: int = 10
    
    # Email (SMTP)
    SMTP_HOST: str = "smtp.hostinger.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = "info@esim.com.mm"
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM_EMAIL: str = "info@esim.com.mm"
    SMTP_FROM_NAME: str = "eSIM Myanmar"
    
    # External Services
    SMDP_API_URL: Optional[str] = None
    SMDP_API_KEY: Optional[str] = None
    
    # Payment Gateways
    KBZ_PAY_MERCHANT_ID: Optional[str] = None
    KBZ_PAY_API_KEY: Optional[str] = None
    WAVE_MONEY_MERCHANT_ID: Optional[str] = None
    WAVE_MONEY_API_KEY: Optional[str] = None
    AYA_PAY_MERCHANT_ID: Optional[str] = None
    AYA_PAY_API_KEY: Optional[str] = None
    
    # Redis (for caching and rate limiting)
    REDIS_URL: Optional[str] = None
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


# Development settings override
class DevelopmentSettings(Settings):
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://esim.com.mm",
        "https://www.esim.com.mm"
    ]


# Production settings override
class ProductionSettings(Settings):
    DEBUG: bool = False
    ENVIRONMENT: str = "production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # 1 hour in production
