"""
eSIM Profile Models for eSIM Myanmar Platform
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, Literal, List
from datetime import datetime
from enum import Enum


class ESIMStatus(str, Enum):
    INACTIVE = "inactive"
    ACTIVE = "active"
    SUSPENDED = "suspended"
    EXPIRED = "expired"
    TRANSFERRED = "transferred"


class DeviceType(str, Enum):
    IPHONE = "iphone"
    ANDROID = "android"
    IPAD = "ipad"
    APPLE_WATCH = "apple_watch"
    WEARABLE = "wearable"
    OTHER = "other"


class ESIMProfileBase(BaseModel):
    """Base eSIM profile model"""
    pass


class ESIMProfileCreate(ESIMProfileBase):
    """Create eSIM profile request"""
    plan_id: Optional[str] = None
    device_type: Optional[DeviceType] = None


class ESIMProfile(ESIMProfileBase):
    """eSIM profile response model"""
    profile_id: str
    user_id: str
    iccid: str
    eid: Optional[str] = None
    msisdn: Optional[str] = None  # Phone number
    status: ESIMStatus = ESIMStatus.INACTIVE
    qr_code: Optional[str] = None
    activation_code: Optional[str] = None
    
    # Plan details
    plan_id: Optional[str] = None
    plan_name: Optional[str] = None
    data_limit_gb: float = 0.0
    data_used_gb: float = 0.0
    
    # Dates
    created_at: datetime
    activation_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None
    
    # Device info
    device_type: Optional[DeviceType] = None
    device_model: Optional[str] = None
    device_imei: Optional[str] = None
    
    # Features
    is_5g_enabled: bool = True
    is_volte_enabled: bool = True
    is_roaming_enabled: bool = False


class ESIMActivation(BaseModel):
    """eSIM activation request"""
    profile_id: str
    device_type: DeviceType
    device_model: Optional[str] = None
    device_imei: Optional[str] = None
    
    @validator('device_imei')
    def validate_imei(cls, v):
        if v and len(v) != 15:
            raise ValueError('IMEI must be 15 digits')
        return v


class ESIMTransfer(BaseModel):
    """eSIM transfer request"""
    profile_id: str
    target_device_type: DeviceType
    target_device_model: Optional[str] = None
    target_device_imei: Optional[str] = None
    transfer_reason: Optional[str] = None


class ESIMTransferResponse(BaseModel):
    """eSIM transfer response"""
    transfer_id: str
    profile_id: str
    status: Literal["pending", "completed", "failed"] = "pending"
    new_qr_code: Optional[str] = None
    new_activation_code: Optional[str] = None
    message: str


class ESIMUsage(BaseModel):
    """eSIM usage statistics"""
    profile_id: str
    period_start: datetime
    period_end: datetime
    data_used_mb: float
    voice_minutes: float = 0.0
    sms_count: int = 0
    roaming_data_mb: float = 0.0


class QRCodeResponse(BaseModel):
    """QR code generation response"""
    profile_id: str
    qr_code_base64: str
    activation_code: str
    expires_at: datetime
    instructions: List[str] = [
        "Open Settings on your device",
        "Navigate to Cellular/Mobile Data",
        "Select Add eSIM or Add Cellular Plan",
        "Scan the QR code or enter activation code manually",
        "Follow on-screen instructions to complete activation"
    ]
