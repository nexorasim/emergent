"""
Configuration Management for eSIM Myanmar Platform
Centralized settings with environment variable support
Enterprise-grade security configuration (Pydantic v2 compliant)
"""

from __future__ import annotations

import os
from functools import lru_cache
from typing import List, Optional, Literal

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings with environment variable support.

    Notes:
    - Uses Pydantic v2 SettingsConfigDict for .env loading and strict handling
    - Avoids os.getenv in field defaults to keep BaseSettings behavior consistent
    - Provides production-only validations for secrets and critical config
    """

    # Pydantic v2 settings config
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # Application
    APP_NAME: str = "eSIM Myanmar Platform"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = False
    # Prefer APP_ENV if present; ENVIRONMENT remains for backward compatibility
    ENVIRONMENT: str = "development"  # development | staging | production

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8001

    # Database backend selection and URLs
    DB_BACKEND: Literal["mongo", "postgres", "both"] = "mongo"

    # MongoDB
    MONGO_URL: Optional[str] = None
    MONGO_DB_NAME: str = "esim_myanmar"
    MONGO_MAX_POOL_SIZE: int = 100
    MONGO_MIN_POOL_SIZE: int = 10

    # PostgreSQL (e.g., Neon)
    DATABASE_URL: Optional[str] = None

    # Supabase
    SUPABASE_URL: Optional[str] = None
    SUPABASE_ANON_KEY: Optional[str] = None
    SUPABASE_SERVICE_ROLE_KEY: Optional[str] = None

    # Security - Always use environment variables in production
    SECRET_KEY: Optional[str] = None
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # adjustable via env
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Security hardening
    MIN_PASSWORD_LENGTH: int = 12
    MAX_LOGIN_ATTEMPTS: int = 5
    LOCKOUT_DURATION_MINUTES: int = 30
    SESSION_TIMEOUT_MINUTES: int = 30

    # CORS
    # Allow override via CSV env: CORS_ORIGINS="https://a.com,https://b.com"
    CORS_ORIGINS: List[str] = [
        "https://esim.com.mm",
        "https://www.esim.com.mm",
        "https://admin.esim.com.mm",
        "https://partner.esim.com.mm",
        "https://esim-myanmar.pages.dev",
        "https://esim-myanmar-ia6gw.web.app",
        "https://esimmyanmar-09289140-4db73.web.app",
    ]

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_BURST: int = 10
    AUTH_RATE_LIMIT_PER_MINUTE: int = 5
    PAYMENT_RATE_LIMIT_PER_MINUTE: int = 10

    # Email (SMTP)
    SMTP_HOST: str = "smtp.hostinger.com"
    SMTP_PORT: int = 587  # 587 for STARTTLS, 465 for SSL
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM_EMAIL: Optional[str] = None
    SMTP_FROM_NAME: str = "eSIM Myanmar"
    SMTP_USE_TLS: bool = True
    SMTP_USE_SSL: bool = False
    SMTP_VALIDATE_CERTS: bool = True

    # External Services
    SMDP_API_URL: Optional[str] = None
    SMDP_API_KEY: Optional[str] = None

    # Payment Gateways (never hardcode; env only)
    KBZ_PAY_MERCHANT_ID: Optional[str] = None
    KBZ_PAY_API_KEY: Optional[str] = None
    KBZ_PAY_WEBHOOK_SECRET: Optional[str] = None
    WAVE_MONEY_MERCHANT_ID: Optional[str] = None
    WAVE_MONEY_API_KEY: Optional[str] = None
    WAVE_MONEY_WEBHOOK_SECRET: Optional[str] = None
    AYA_PAY_MERCHANT_ID: Optional[str] = None
    AYA_PAY_API_KEY: Optional[str] = None

    # Audit and Logging
    ENABLE_AUDIT_LOGGING: bool = True
    LOG_LEVEL: str = "INFO"
    LOG_JSON: bool = True  # prefer structured logging
    LOG_FORMAT: str = (
        "%(asctime)s %(levelname)s %(name)s %(trace_id)s %(message)s"
    )

    # API Documentation - Disabled in production by default
    ENABLE_DOCS: bool = False

    # Redis (for caching and rate limiting)
    REDIS_URL: Optional[str] = None

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def _parse_cors_origins(cls, v):
        """Allow comma-separated CORS_ORIGINS value from environment."""
        if isinstance(v, str):
            items = [i.strip() for i in v.split(",") if i.strip()]
            return items
        return v

    @model_validator(mode="after")
    def _validate_security_and_env(self) -> "Settings":
        env = (os.getenv("APP_ENV") or self.ENVIRONMENT or "development").lower()

        # SMTP validation
        if self.SMTP_USE_SSL and self.SMTP_USE_TLS:
            raise ValueError("SMTP_USE_SSL and SMTP_USE_TLS are mutually exclusive")
        if self.SMTP_USE_SSL and self.SMTP_PORT not in (465,):
            raise ValueError("When SMTP_USE_SSL=True, SMTP_PORT should typically be 465")
        if self.SMTP_USE_TLS and self.SMTP_PORT not in (587, 25):
            # STARTTLS standard ports
            pass

        # Token lifetime sanity
        if self.ACCESS_TOKEN_EXPIRE_MINUTES <= 0:
            raise ValueError("ACCESS_TOKEN_EXPIRE_MINUTES must be > 0")
        if self.REFRESH_TOKEN_EXPIRE_DAYS <= 0:
            raise ValueError("REFRESH_TOKEN_EXPIRE_DAYS must be > 0")

        # Production-only strict checks
        if env == "production":
            if not self.SECRET_KEY or len(self.SECRET_KEY) < 32:
                raise ValueError(
                    "SECRET_KEY must be set and at least 32 characters in production"
                )

            # SMTP required in production for auth flows, notifications, etc.
            if not self.SMTP_PASSWORD:
                raise ValueError("SMTP_PASSWORD must be set in production")
            if not self.SMTP_USER or not self.SMTP_FROM_EMAIL:
                raise ValueError(
                    "SMTP_USER and SMTP_FROM_EMAIL must be set in production"
                )

            # Database requirements based on backend selection
            if self.DB_BACKEND in ("mongo", "both") and not self.MONGO_URL:
                raise ValueError("MONGO_URL must be set in production when using MongoDB")
            if self.DB_BACKEND in ("postgres", "both") and not self.DATABASE_URL:
                raise ValueError(
                    "DATABASE_URL must be set in production when using PostgreSQL"
                )

        return self


@lru_cache()
def get_settings() -> Settings:
    """Return environment-specific settings (cached)."""
    env = (os.getenv("APP_ENV") or os.getenv("ENVIRONMENT", "development")).lower()
    if env == "production":
        return ProductionSettings()
    return DevelopmentSettings()


# Development settings override
class DevelopmentSettings(Settings):
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        # Allow production origins to enable local development with prod APIs when needed
        "https://esim.com.mm",
        "https://www.esim.com.mm",
    ]
    ENABLE_DOCS: bool = True


# Production settings override
class ProductionSettings(Settings):
    DEBUG: bool = False
    ENVIRONMENT: str = "production"
    # Maintain defaults from base; production docs disabled by default
    ENABLE_DOCS: bool = False
