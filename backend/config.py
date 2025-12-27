"""
Configuration Management for eSIM Myanmar Platform
Centralized settings with environment variable support
Enterprise-grade security configuration
"""

from pydantic_settings import BaseSettings
from typing import List, Optional
from functools import lru_cache
import os
import secrets


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # Application
    APP_NAME: str = "eSIM Myanmar Entertainment Server"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "production"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8001
    
    # Database - MongoDB Atlas (use environment variable)
    MONGO_URL: str = os.getenv("MONGO_URL", "")
    MONGO_DB_NAME: str = "esim_myanmar"
    MONGO_MAX_POOL_SIZE: int = 100
    MONGO_MIN_POOL_SIZE: int = 10
    
    # PostgreSQL - Neon (use environment variable)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # Supabase (use environment variables)
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://ksctoosqlpemoptcaxdr.supabase.co")
    SUPABASE_ANON_KEY: Optional[str] = os.getenv("SUPABASE_ANON_KEY")
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    # Security - CRITICAL: Always use environment variables in production
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # 1 hour (security hardened)
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Security hardening
    MIN_PASSWORD_LENGTH: int = 8
    MAX_LOGIN_ATTEMPTS: int = 5
    LOCKOUT_DURATION_MINUTES: int = 30
    SESSION_TIMEOUT_MINUTES: int = 30
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Validate SECRET_KEY in production
        if self.ENVIRONMENT == "production":
            if not self.SECRET_KEY or len(self.SECRET_KEY) < 32:
                raise ValueError("SECRET_KEY must be set and at least 32 characters in production")
            if not self.MONGO_URL:
                raise ValueError("MONGO_URL must be set in production")
        elif not self.SECRET_KEY:
            # Generate secure key for development only
            self.SECRET_KEY = secrets.token_urlsafe(32)
            print("WARNING: Using generated SECRET_KEY for development only")
    
    # CORS - Production domains only
    CORS_ORIGINS: List[str] = [
        "https://esim.com.mm",
        "https://www.esim.com.mm",
        "https://admin.esim.com.mm",
        "https://partner.esim.com.mm",
        "https://esim-myanmar.pages.dev",
        "https://esim-myanmar-ia6gw.web.app",
        "https://esimmyanmar-09289140-4db73.web.app"
    ]
    
    # Rate Limiting - Security hardened
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_BURST: int = 10
    AUTH_RATE_LIMIT_PER_MINUTE: int = 5
    PAYMENT_RATE_LIMIT_PER_MINUTE: int = 10
    
    # Email (SMTP) - Use environment variables
    SMTP_HOST: str = "smtp.hostinger.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = os.getenv("SMTP_USER", "info@esim.com.mm")
    SMTP_PASSWORD: Optional[str] = os.getenv("SMTP_PASSWORD")
    SMTP_FROM_EMAIL: str = "info@esim.com.mm"
    SMTP_FROM_NAME: str = "eSIM Myanmar"
    SMTP_USE_TLS: bool = True
    
    # External Services - Use environment variables
    SMDP_API_URL: Optional[str] = os.getenv("SMDP_API_URL")
    SMDP_API_KEY: Optional[str] = os.getenv("SMDP_API_KEY")
    
    # Payment Gateways - Use environment variables (NEVER hardcode)
    KBZ_PAY_MERCHANT_ID: Optional[str] = os.getenv("KBZ_PAY_MERCHANT_ID")
    KBZ_PAY_API_KEY: Optional[str] = os.getenv("KBZ_PAY_API_KEY")
    KBZ_PAY_WEBHOOK_SECRET: Optional[str] = os.getenv("KBZ_PAY_WEBHOOK_SECRET")
    WAVE_MONEY_MERCHANT_ID: Optional[str] = os.getenv("WAVE_MONEY_MERCHANT_ID")
    WAVE_MONEY_API_KEY: Optional[str] = os.getenv("WAVE_MONEY_API_KEY")
    WAVE_MONEY_WEBHOOK_SECRET: Optional[str] = os.getenv("WAVE_MONEY_WEBHOOK_SECRET")
    AYA_PAY_MERCHANT_ID: Optional[str] = os.getenv("AYA_PAY_MERCHANT_ID")
    AYA_PAY_API_KEY: Optional[str] = os.getenv("AYA_PAY_API_KEY")
    
    # Audit and Logging
    ENABLE_AUDIT_LOGGING: bool = True
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # API Documentation - Disable in production
    ENABLE_DOCS: bool = os.getenv("ENABLE_DOCS", "false").lower() == "true"
    
    # Redis (for caching and rate limiting)
    REDIS_URL: Optional[str] = os.getenv("REDIS_URL")
    
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
