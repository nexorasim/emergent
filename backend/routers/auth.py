"""
Authentication Router for eSIM Myanmar Platform
"""

from fastapi import APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

router = APIRouter(prefix="/api/auth", tags=["Authentication"])
security = HTTPBearer()


# Request/Response Models
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone_number: str
    country: str = "Myanmar"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    totp_code: Optional[str] = None


class TokenResponse(BaseModel):
    message: str
    token: str
    refresh_token: Optional[str] = None
    user: dict


class Enable2FARequest(BaseModel):
    password: str


class Verify2FARequest(BaseModel):
    code: str
    secret: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


# Dependency to get current user
async def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get current authenticated user"""
    auth_service = request.app.state.auth_service
    
    payload = auth_service.decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type"
        )
    
    email = payload.get("sub")
    user = await auth_service.users.find_one({"email": email})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    if user.get("status") != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is not active"
        )
    
    return user


# Admin dependency
async def get_admin_user(current_user: dict = Depends(get_current_user)):
    """Require admin role"""
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user


@router.post("/register", response_model=TokenResponse)
async def register(request: Request, data: RegisterRequest):
    """Register new user account"""
    auth_service = request.app.state.auth_service
    
    try:
        user = await auth_service.register_user(data.dict())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    # Generate tokens
    access_token = auth_service.create_access_token({"sub": user["email"]})
    refresh_token, expires = auth_service.create_refresh_token(user["user_id"])
    
    # Store refresh token
    await auth_service.store_refresh_token(
        user["user_id"],
        auth_service.decode_token(refresh_token)["token_id"],
        expires
    )
    
    return {
        "message": "Registration successful",
        "token": access_token,
        "refresh_token": refresh_token,
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user["role"]
        }
    }


@router.post("/login", response_model=TokenResponse)
async def login(request: Request, data: LoginRequest):
    """User login"""
    auth_service = request.app.state.auth_service
    
    user = await auth_service.authenticate_user(data.email, data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check 2FA if enabled
    if user.get("two_factor_enabled"):
        if not data.totp_code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="2FA code required"
            )
        
        if not auth_service.verify_2fa_code(user["two_factor_secret"], data.totp_code):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid 2FA code"
            )
    
    # Generate tokens
    access_token = auth_service.create_access_token({"sub": user["email"]})
    refresh_token, expires = auth_service.create_refresh_token(user["user_id"])
    
    # Store refresh token
    await auth_service.store_refresh_token(
        user["user_id"],
        auth_service.decode_token(refresh_token)["token_id"],
        expires
    )
    
    return {
        "message": "Login successful",
        "token": access_token,
        "refresh_token": refresh_token,
        "user": {
            "user_id": user["user_id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user.get("role", "customer")
        }
    }


@router.post("/refresh")
async def refresh_token(request: Request, data: RefreshTokenRequest):
    """Refresh access token"""
    auth_service = request.app.state.auth_service
    
    payload = auth_service.decode_token(data.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Check if token is revoked
    token_record = await auth_service.refresh_tokens.find_one({
        "token_id": payload["token_id"],
        "revoked": False
    })
    
    if not token_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked"
        )
    
    # Get user
    user = await auth_service.users.find_one({"user_id": payload["sub"]})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    # Generate new access token
    access_token = auth_service.create_access_token({"sub": user["email"]})
    
    return {
        "token": access_token,
        "token_type": "bearer"
    }


@router.post("/logout")
async def logout(
    request: Request,
    current_user: dict = Depends(get_current_user)
):
    """Logout and revoke all tokens"""
    auth_service = request.app.state.auth_service
    
    await auth_service.revoke_all_user_tokens(current_user["user_id"])
    
    return {"message": "Logged out successfully"}


@router.get("/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    return {
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "phone_number": current_user.get("phone_number"),
        "role": current_user.get("role", "customer"),
        "status": current_user.get("status"),
        "two_factor_enabled": current_user.get("two_factor_enabled", False),
        "created_at": current_user.get("created_at")
    }


@router.post("/2fa/setup")
async def setup_2fa(
    request: Request,
    data: Enable2FARequest,
    current_user: dict = Depends(get_current_user)
):
    """Setup 2FA for account"""
    auth_service = request.app.state.auth_service
    
    # Verify password
    if not auth_service.verify_password(data.password, current_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )
    
    # Generate secret
    secret = auth_service.generate_2fa_secret()
    uri = auth_service.get_2fa_uri(secret, current_user["email"])
    
    return {
        "secret": secret,
        "uri": uri,
        "message": "Scan QR code with authenticator app, then verify with /2fa/verify"
    }


@router.post("/2fa/verify")
async def verify_2fa(
    request: Request,
    data: Verify2FARequest,
    current_user: dict = Depends(get_current_user)
):
    """Verify and enable 2FA"""
    auth_service = request.app.state.auth_service
    
    if not auth_service.verify_2fa_code(data.secret, data.code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification code"
        )
    
    await auth_service.enable_2fa(current_user["user_id"], data.secret)
    
    return {"message": "2FA enabled successfully"}


@router.post("/2fa/disable")
async def disable_2fa(
    request: Request,
    data: Enable2FARequest,
    current_user: dict = Depends(get_current_user)
):
    """Disable 2FA"""
    auth_service = request.app.state.auth_service
    
    # Verify password
    if not auth_service.verify_password(data.password, current_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )
    
    await auth_service.disable_2fa(current_user["user_id"])
    
    return {"message": "2FA disabled successfully"}
