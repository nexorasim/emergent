"""
eSIM Service for eSIM Myanmar Platform
Handles eSIM profile management, activation, and transfers
"""

from datetime import datetime, timedelta
from typing import Optional, List
import uuid
import qrcode
import io
import base64
import logging

from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)


class ESIMService:
    """eSIM profile management service"""
    
    def __init__(self, db: AsyncIOMotorDatabase, smdp_client=None):
        self.db = db
        self.profiles = db.esim_profiles
        self.devices = db.devices
        self.transfers = db.esim_transfers
        self.smdp_client = smdp_client  # SM-DP+ integration client
    
    def _generate_iccid(self) -> str:
        """Generate ICCID (Integrated Circuit Card Identifier)"""
        # Format: 89 (telecom) + 95 (Myanmar) + 9 (mobile) + 15 random digits
        return f"89959{uuid.uuid4().hex[:15].upper()}"
    
    def _generate_activation_code(self) -> str:
        """Generate activation code for manual entry"""
        return f"LPA:1$esim.com.mm${uuid.uuid4().hex[:20].upper()}$"
    
    def _generate_qr_code(self, data: str) -> str:
        """Generate QR code as base64 string"""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=4
        )
        qr.add_data(data)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="#1e2f3c", back_color="white")
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        return f"data:image/png;base64,{img_str}"
    
    async def create_profile(
        self,
        user_id: str,
        plan_id: Optional[str] = None,
        device_type: Optional[str] = None
    ) -> dict:
        """Create new eSIM profile"""
        
        iccid = self._generate_iccid()
        activation_code = self._generate_activation_code()
        qr_data = activation_code
        
        profile = {
            "profile_id": str(uuid.uuid4()),
            "user_id": user_id,
            "iccid": iccid,
            "eid": None,
            "msisdn": None,
            "status": "inactive",
            "qr_code": self._generate_qr_code(qr_data),
            "activation_code": activation_code,
            "plan_id": plan_id,
            "data_limit_gb": 0.0,
            "data_used_gb": 0.0,
            "created_at": datetime.utcnow(),
            "activation_date": None,
            "expiry_date": None,
            "device_type": device_type,
            "device_model": None,
            "device_imei": None,
            "is_5g_enabled": True,
            "is_volte_enabled": True,
            "is_roaming_enabled": False
        }
        
        await self.profiles.insert_one(profile)
        logger.info(f"Created eSIM profile: {profile['profile_id']} for user: {user_id}")
        
        return profile
    
    async def get_user_profiles(self, user_id: str) -> List[dict]:
        """Get all profiles for a user"""
        cursor = self.profiles.find({"user_id": user_id})
        profiles = await cursor.to_list(length=100)
        
        # Remove MongoDB _id from response
        for profile in profiles:
            profile.pop("_id", None)
        
        return profiles
    
    async def get_profile(self, profile_id: str, user_id: Optional[str] = None) -> Optional[dict]:
        """Get single profile by ID"""
        query = {"profile_id": profile_id}
        if user_id:
            query["user_id"] = user_id
        
        profile = await self.profiles.find_one(query)
        if profile:
            profile.pop("_id", None)
        
        return profile
    
    async def activate_profile(
        self,
        profile_id: str,
        user_id: str,
        device_type: str,
        device_model: Optional[str] = None,
        device_imei: Optional[str] = None
    ) -> dict:
        """Activate eSIM profile"""
        
        profile = await self.get_profile(profile_id, user_id)
        if not profile:
            raise ValueError("Profile not found")
        
        if profile["status"] == "active":
            raise ValueError("Profile is already active")
        
        # Get plan details if plan_id exists
        plan = None
        if profile.get("plan_id"):
            plan = await self.db.plans.find_one({"plan_id": profile["plan_id"]})
        
        # Calculate expiry date
        validity_days = plan.get("validity_days", 30) if plan else 30
        expiry_date = datetime.utcnow() + timedelta(days=validity_days)
        
        # Update profile
        update_data = {
            "status": "active",
            "activation_date": datetime.utcnow(),
            "expiry_date": expiry_date,
            "device_type": device_type,
            "device_model": device_model,
            "device_imei": device_imei,
            "data_limit_gb": plan.get("data_gb", 0) if plan else 0
        }
        
        await self.profiles.update_one(
            {"profile_id": profile_id},
            {"$set": update_data}
        )
        
        # Record device
        await self._record_device(user_id, profile_id, device_type, device_model, device_imei)
        
        logger.info(f"Activated eSIM profile: {profile_id}")
        
        # Return updated profile
        return await self.get_profile(profile_id)
    
    async def transfer_profile(
        self,
        profile_id: str,
        user_id: str,
        target_device_type: str,
        target_device_model: Optional[str] = None,
        target_device_imei: Optional[str] = None,
        transfer_reason: Optional[str] = None
    ) -> dict:
        """Transfer eSIM to new device"""
        
        profile = await self.get_profile(profile_id, user_id)
        if not profile:
            raise ValueError("Profile not found")
        
        if profile["status"] != "active":
            raise ValueError("Only active profiles can be transferred")
        
        # Create transfer record
        transfer_id = str(uuid.uuid4())
        transfer_record = {
            "transfer_id": transfer_id,
            "profile_id": profile_id,
            "user_id": user_id,
            "from_device_type": profile.get("device_type"),
            "from_device_model": profile.get("device_model"),
            "to_device_type": target_device_type,
            "to_device_model": target_device_model,
            "to_device_imei": target_device_imei,
            "reason": transfer_reason,
            "status": "completed",
            "created_at": datetime.utcnow(),
            "completed_at": datetime.utcnow()
        }
        
        await self.transfers.insert_one(transfer_record)
        
        # Generate new QR code
        new_activation_code = self._generate_activation_code()
        new_qr_code = self._generate_qr_code(new_activation_code)
        
        # Update profile with new device info
        await self.profiles.update_one(
            {"profile_id": profile_id},
            {
                "$set": {
                    "device_type": target_device_type,
                    "device_model": target_device_model,
                    "device_imei": target_device_imei,
                    "qr_code": new_qr_code,
                    "activation_code": new_activation_code,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        # Record new device
        await self._record_device(user_id, profile_id, target_device_type, target_device_model, target_device_imei)
        
        logger.info(f"Transferred eSIM profile: {profile_id} to {target_device_type}")
        
        return {
            "transfer_id": transfer_id,
            "profile_id": profile_id,
            "status": "completed",
            "new_qr_code": new_qr_code,
            "new_activation_code": new_activation_code,
            "message": f"eSIM successfully transferred to {target_device_type}"
        }
    
    async def _record_device(
        self,
        user_id: str,
        profile_id: str,
        device_type: str,
        device_model: Optional[str],
        device_imei: Optional[str]
    ):
        """Record device information"""
        device_record = {
            "device_id": str(uuid.uuid4()),
            "user_id": user_id,
            "profile_id": profile_id,
            "device_type": device_type,
            "device_model": device_model,
            "device_imei": device_imei,
            "registered_at": datetime.utcnow(),
            "is_active": True
        }
        
        # Deactivate previous device for this profile
        await self.devices.update_many(
            {"profile_id": profile_id, "is_active": True},
            {"$set": {"is_active": False}}
        )
        
        await self.devices.insert_one(device_record)
    
    async def get_usage(self, profile_id: str, user_id: str) -> dict:
        """Get usage statistics for profile"""
        profile = await self.get_profile(profile_id, user_id)
        if not profile:
            raise ValueError("Profile not found")
        
        return {
            "profile_id": profile_id,
            "data_used_gb": profile.get("data_used_gb", 0),
            "data_limit_gb": profile.get("data_limit_gb", 0),
            "data_remaining_gb": max(0, profile.get("data_limit_gb", 0) - profile.get("data_used_gb", 0)),
            "usage_percent": (profile.get("data_used_gb", 0) / profile.get("data_limit_gb", 1)) * 100 if profile.get("data_limit_gb") else 0,
            "expiry_date": profile.get("expiry_date"),
            "days_remaining": (profile.get("expiry_date") - datetime.utcnow()).days if profile.get("expiry_date") else None
        }
    
    async def regenerate_qr(self, profile_id: str, user_id: str) -> dict:
        """Regenerate QR code for profile"""
        profile = await self.get_profile(profile_id, user_id)
        if not profile:
            raise ValueError("Profile not found")
        
        new_activation_code = self._generate_activation_code()
        new_qr_code = self._generate_qr_code(new_activation_code)
        
        await self.profiles.update_one(
            {"profile_id": profile_id},
            {
                "$set": {
                    "qr_code": new_qr_code,
                    "activation_code": new_activation_code,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return {
            "profile_id": profile_id,
            "qr_code": new_qr_code,
            "activation_code": new_activation_code,
            "expires_at": datetime.utcnow() + timedelta(hours=24)
        }
