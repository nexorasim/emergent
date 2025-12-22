"""
User Models for eSIM Myanmar Platform
"""

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, Literal
from datetime import datetime
import re


class UserBase(BaseModel):
    """Base user model"""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    phone_number: str = Field(..., min_length=9, max_length=15)
    country: str = "Myanmar"


class UserCreate(UserBase):
    """User registration model"""
    password: str = Field(..., min_length=8, max_length=128)
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one digit')
        return v
    
    @validator('phone_number')
    def validate_phone(cls, v):
        # Myanmar phone format validation
        cleaned = re.sub(r'[^\d+]', '', v)
        if not re.match(r'^(\+?95|0)?9\d{7,9}$', cleaned):
            raise ValueError('Invalid Myanmar phone number format')
        return cleaned


class UserLogin(BaseModel):
    """User login model"""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """User response model (public data)"""
    user_id: str
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    role: Literal["customer", "partner", "admin"] = "customer"
    status: Literal["active", "inactive", "suspended"] = "active"
    created_at: Optional[datetime] = None


class UserInDB(UserBase):
    """User model as stored in database"""
    user_id: str
    password: str  # Hashed
    role: Literal["customer", "partner", "admin"] = "customer"
    status: Literal["active", "inactive", "suspended"] = "active"
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    failed_login_attempts: int = 0
    locked_until: Optional[datetime] = None
    two_factor_enabled: bool = False
    two_factor_secret: Optional[str] = None


class TokenResponse(BaseModel):
    """Token response model"""
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    expires_in: int


class RefreshTokenRequest(BaseModel):
    """Refresh token request"""
    refresh_token: str
