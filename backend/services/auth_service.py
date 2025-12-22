"""
Authentication Service for eSIM Myanmar Platform
Handles user authentication, token management, and 2FA
"""

from datetime import datetime, timedelta
from typing import Optional, Tuple
from jose import JWTError, jwt
from passlib.context import CryptContext
import pyotp
import uuid
import logging

from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """Authentication service with enhanced security"""
    
    def __init__(
        self,
        db: AsyncIOMotorDatabase,
        secret_key: str,
        algorithm: str = "HS256",
        access_token_expire_minutes: int = 1440,
        refresh_token_expire_days: int = 7
    ):
        self.db = db
        self.users = db.users
        self.refresh_tokens = db.refresh_tokens
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.access_token_expire_minutes = access_token_expire_minutes
        self.refresh_token_expire_days = refresh_token_expire_days
        
        # Account lockout settings
        self.max_failed_attempts = 5
        self.lockout_duration_minutes = 30
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify password against hash"""
        return pwd_context.verify(plain_password, hashed_password)
    
    def get_password_hash(self, password: str) -> str:
        """Hash password"""
        return pwd_context.hash(password)
    
    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=self.access_token_expire_minutes))
        to_encode.update({
            "exp": expire,
            "type": "access",
            "iat": datetime.utcnow()
        })
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    def create_refresh_token(self, user_id: str) -> Tuple[str, datetime]:
        """Create refresh token"""
        token_id = str(uuid.uuid4())
        expires = datetime.utcnow() + timedelta(days=self.refresh_token_expire_days)
        
        to_encode = {
            "sub": user_id,
            "token_id": token_id,
            "exp": expires,
            "type": "refresh",
            "iat": datetime.utcnow()
        }
        
        token = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return token, expires
    
    async def store_refresh_token(self, user_id: str, token_id: str, expires: datetime):
        """Store refresh token in database"""
        await self.refresh_tokens.insert_one({
            "token_id": token_id,
            "user_id": user_id,
            "expires_at": expires,
            "created_at": datetime.utcnow(),
            "revoked": False
        })
    
    async def revoke_refresh_token(self, token_id: str):
        """Revoke a refresh token"""
        await self.refresh_tokens.update_one(
            {"token_id": token_id},
            {"$set": {"revoked": True, "revoked_at": datetime.utcnow()}}
        )
    
    async def revoke_all_user_tokens(self, user_id: str):
        """Revoke all refresh tokens for a user"""
        await self.refresh_tokens.update_many(
            {"user_id": user_id, "revoked": False},
            {"$set": {"revoked": True, "revoked_at": datetime.utcnow()}}
        )
    
    def decode_token(self, token: str) -> Optional[dict]:
        """Decode and validate JWT token"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except JWTError as e:
            logger.warning(f"Token decode error: {e}")
            return None
    
    async def authenticate_user(self, email: str, password: str) -> Optional[dict]:
        """Authenticate user with email and password"""
        user = await self.users.find_one({"email": email.lower()})
        
        if not user:
            return None
        
        # Check if account is locked
        if user.get("locked_until") and user["locked_until"] > datetime.utcnow():
            logger.warning(f"Login attempt on locked account: {email}")
            return None
        
        # Verify password
        if not self.verify_password(password, user["password"]):
            # Increment failed attempts
            await self._handle_failed_login(user)
            return None
        
        # Reset failed attempts on successful login
        await self.users.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "failed_login_attempts": 0,
                    "locked_until": None,
                    "last_login": datetime.utcnow()
                }
            }
        )
        
        return user
    
    async def _handle_failed_login(self, user: dict):
        """Handle failed login attempt"""
        failed_attempts = user.get("failed_login_attempts", 0) + 1
        
        update_data = {"failed_login_attempts": failed_attempts}
        
        if failed_attempts >= self.max_failed_attempts:
            update_data["locked_until"] = datetime.utcnow() + timedelta(minutes=self.lockout_duration_minutes)
            logger.warning(f"Account locked due to failed attempts: {user['email']}")
        
        await self.users.update_one(
            {"_id": user["_id"]},
            {"$set": update_data}
        )
    
    async def register_user(self, user_data: dict) -> dict:
        """Register new user"""
        # Check if email exists
        existing = await self.users.find_one({"email": user_data["email"].lower()})
        if existing:
            raise ValueError("Email already registered")
        
        # Create user document
        user_doc = {
            "user_id": str(uuid.uuid4()),
            "email": user_data["email"].lower(),
            "password": self.get_password_hash(user_data["password"]),
            "full_name": user_data["full_name"],
            "phone_number": user_data["phone_number"],
            "country": user_data.get("country", "Myanmar"),
            "role": "customer",
            "status": "active",
            "created_at": datetime.utcnow(),
            "failed_login_attempts": 0,
            "two_factor_enabled": False
        }
        
        await self.users.insert_one(user_doc)
        
        logger.info(f"New user registered: {user_doc['email']}")
        return user_doc
    
    # 2FA Methods
    def generate_2fa_secret(self) -> str:
        """Generate TOTP secret for 2FA"""
        return pyotp.random_base32()
    
    def get_2fa_uri(self, secret: str, email: str) -> str:
        """Get TOTP URI for QR code generation"""
        totp = pyotp.TOTP(secret)
        return totp.provisioning_uri(name=email, issuer_name="eSIM Myanmar")
    
    def verify_2fa_code(self, secret: str, code: str) -> bool:
        """Verify 2FA TOTP code"""
        totp = pyotp.TOTP(secret)
        return totp.verify(code, valid_window=1)
    
    async def enable_2fa(self, user_id: str, secret: str):
        """Enable 2FA for user"""
        await self.users.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "two_factor_enabled": True,
                    "two_factor_secret": secret
                }
            }
        )
    
    async def disable_2fa(self, user_id: str):
        """Disable 2FA for user"""
        await self.users.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "two_factor_enabled": False,
                    "two_factor_secret": None
                }
            }
        )
