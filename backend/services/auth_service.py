"""
Authentication Service for eSIM Myanmar Platform
Handles user authentication, token management, password resets, and 2FA
"""

from datetime import datetime, timedelta
from typing import Optional, Tuple
from jose import JWTError, jwt
from passlib.context import CryptContext
import pyotp
import uuid
import logging
import secrets

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
        access_token_expire_minutes: int = 60,
        refresh_token_expire_days: int = 7,
        min_password_length: int = 12,
        max_failed_attempts: int = 5,
        lockout_duration_minutes: int = 30,
    ):
        self.db = db
        self.users = db.users
        self.refresh_tokens = db.refresh_tokens
        self.password_reset_tokens = db.password_reset_tokens
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.access_token_expire_minutes = access_token_expire_minutes
        self.refresh_token_expire_days = refresh_token_expire_days

        # Account policies
        self.min_password_length = min_password_length
        self.max_failed_attempts = max_failed_attempts
        self.lockout_duration_minutes = lockout_duration_minutes

    # ------------------ Password hashing and validation ------------------
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify password against hash"""
        try:
            verified = pwd_context.verify(plain_password, hashed_password)
            return verified
        except Exception:
            return False

    def get_password_hash(self, password: str) -> str:
        """Hash password"""
        return pwd_context.hash(password)

    def validate_password(self, password: str) -> None:
        """Validate password policy."""
        if not password or len(password) < self.min_password_length:
            raise ValueError(
                f"Password must be at least {self.min_password_length} characters long"
            )

    # ------------------ JWT handling ------------------
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

    async def rotate_refresh_token(self, user_id: str, old_token_id: str) -> Tuple[str, datetime]:
        """Rotate refresh token: revoke old and issue a new one."""
        await self.revoke_refresh_token(old_token_id)
        new_token, new_expires = self.create_refresh_token(user_id)
        payload = self.decode_token(new_token) or {}
        await self.store_refresh_token(user_id, payload.get("token_id", ""), new_expires)
        return new_token, new_expires

    def decode_token(self, token: str) -> Optional[dict]:
        """Decode and validate JWT token"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except JWTError as e:
            logger.warning(f"Token decode error: {e}")
            return None

    # ------------------ Authentication ------------------
    async def authenticate_user(self, email: str, password: str) -> Optional[dict]:
        """Authenticate user with email and password"""
        email_norm = email.lower()
        user = await self.users.find_one({"email": email_norm})
        if not user:
            # Delay: optional constant-time mitigation could be implemented here
            return None

        # Check if account is locked
        if user.get("locked_until") and user["locked_until"] > datetime.utcnow():
            logger.warning("Login attempt on locked account", extra={"email": email_norm})
            return None

        # Verify password
        if not self.verify_password(password, user.get("password", "")):
            # Increment failed attempts
            await self._handle_failed_login(user)
            return None

        # Reset failed attempts on successful login
        update_doc = {
            "$set": {
                "failed_login_attempts": 0,
                "locked_until": None,
                "last_login": datetime.utcnow(),
            }
        }
        # Optional: rehash password if needed
        try:
            if pwd_context.needs_update(user.get("password", "")):
                update_doc["$set"]["password"] = self.get_password_hash(password)
        except Exception:
            pass

        await self.users.update_one({"_id": user["_id"]}, update_doc)
        return user

    async def _handle_failed_login(self, user: dict):
        """Handle failed login attempt"""
        failed_attempts = user.get("failed_login_attempts", 0) + 1
        update_data = {"failed_login_attempts": failed_attempts}
        if failed_attempts >= self.max_failed_attempts:
            update_data["locked_until"] = datetime.utcnow() + timedelta(minutes=self.lockout_duration_minutes)
            logger.warning("Account locked due to failed attempts", extra={"email": user.get("email")})
        await self.users.update_one({"_id": user["_id"]}, {"$set": update_data})

    async def register_user(self, user_data: dict) -> dict:
        """Register new user"""
        # Policy enforcement
        self.validate_password(user_data.get("password", ""))

        email_norm = user_data["email"].lower()
        # Check if email exists
        existing = await self.users.find_one({"email": email_norm})
        if existing:
            raise ValueError("Email already registered")

        # Create user document
        user_doc = {
            "user_id": str(uuid.uuid4()),
            "email": email_norm,
            "password": self.get_password_hash(user_data["password"]),
            "full_name": user_data["full_name"],
            "phone_number": user_data["phone_number"],
            "country": user_data.get("country", "Myanmar"),
            "role": "customer",
            "status": "active",  # consider 'pending_verification' then activate after email verification
            "created_at": datetime.utcnow(),
            "failed_login_attempts": 0,
            "two_factor_enabled": False,
        }

        await self.users.insert_one(user_doc)
        logger.info("New user registered", extra={"email": email_norm})
        return user_doc

    # ------------------ Password reset flow ------------------
    async def create_password_reset_token(self, user_id: str) -> Tuple[str, datetime]:
        """Create a single-use password reset token for the user.
        Returns the plaintext token and its expiry.
        """
        token_id = str(uuid.uuid4())
        secret_part = secrets.token_urlsafe(32)
        plaintext_token = f"{token_id}.{secret_part}"
        token_hash = self.get_password_hash(plaintext_token)
        expires_at = datetime.utcnow() + timedelta(minutes=30)  # 30 minutes validity

        await self.password_reset_tokens.insert_one({
            "token_id": token_id,
            "user_id": user_id,
            "token_hash": token_hash,
            "created_at": datetime.utcnow(),
            "expires_at": expires_at,
            "used": False,
        })
        return plaintext_token, expires_at

    async def verify_and_consume_password_reset(self, token: str, new_password: str) -> Optional[dict]:
        """Verify a reset token and update the user's password if valid.
        Returns the user document on success or None on failure.
        """
        try:
            token_id, secret_part = token.split(".", 1)
        except ValueError:
            return None

        rec = await self.password_reset_tokens.find_one({"token_id": token_id})
        if not rec:
            return None
        if rec.get("used"):
            return None
        if rec.get("expires_at") and rec["expires_at"] < datetime.utcnow():
            return None

        # Verify token hash against full plaintext token
        if not self.verify_password(token, rec.get("token_hash", "")):
            return None

        # Enforce password policy
        self.validate_password(new_password)

        # Update user password
        user = await self.users.find_one({"user_id": rec["user_id"]})
        if not user:
            return None

        await self.users.update_one(
            {"user_id": rec["user_id"]},
            {"$set": {"password": self.get_password_hash(new_password), "updated_at": datetime.utcnow()}}
        )

        # Mark token as used
        await self.password_reset_tokens.update_one(
            {"token_id": token_id}, {"$set": {"used": True, "used_at": datetime.utcnow()}}
        )

        # Optionally revoke all refresh tokens for safety
        await self.revoke_all_user_tokens(rec["user_id"])
        return user

    # ------------------ 2FA Methods ------------------
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

    async def set_pending_2fa_secret(self, user_id: str, secret: str):
        """Temporarily store a pending 2FA secret until user verifies."""
        await self.users.update_one(
            {"user_id": user_id},
            {"$set": {"pending_two_factor_secret": secret, "pending_two_factor_at": datetime.utcnow()}}
        )

    async def get_pending_2fa_secret(self, user_id: str) -> Optional[str]:
        user = await self.users.find_one({"user_id": user_id}, {"pending_two_factor_secret": 1})
        return user.get("pending_two_factor_secret") if user else None

    async def clear_pending_2fa_secret(self, user_id: str):
        await self.users.update_one(
            {"user_id": user_id},
            {"$unset": {"pending_two_factor_secret": "", "pending_two_factor_at": ""}}
        )

    async def enable_2fa(self, user_id: str, secret: str):
        """Enable 2FA for user"""
        await self.users.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "two_factor_enabled": True,
                    "two_factor_secret": secret,
                    "two_factor_enabled_at": datetime.utcnow(),
                }
            }
        )
        await self.clear_pending_2fa_secret(user_id)

    async def disable_2fa(self, user_id: str):
        """Disable 2FA for user"""
        await self.users.update_one(
            {"user_id": user_id},
            {
                "$set": {
                    "two_factor_enabled": False,
                    "two_factor_secret": None,
                    "two_factor_disabled_at": datetime.utcnow(),
                }
            }
        )
        await self.clear_pending_2fa_secret(user_id)
