"""
Payment Models for eSIM Myanmar Platform
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, Literal, List
from datetime import datetime
from enum import Enum


class PaymentMethod(str, Enum):
    KBZ_PAY = "kbz_pay"
    WAVE_MONEY = "wave_money"
    AYA_PAY = "aya_pay"
    CARD = "card"
    BANK_TRANSFER = "bank_transfer"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    CANCELLED = "cancelled"


class Currency(str, Enum):
    MMK = "MMK"
    USD = "USD"


class PaymentCreate(BaseModel):
    """Create payment request"""
    plan_id: str
    payment_method: PaymentMethod
    currency: Currency = Currency.MMK
    promo_code: Optional[str] = None
    
    # For existing profile top-up
    profile_id: Optional[str] = None


class PaymentResponse(BaseModel):
    """Payment response model"""
    transaction_id: str
    user_id: str
    plan_id: str
    profile_id: Optional[str] = None
    
    # Amount details
    amount: float
    currency: Currency
    discount_amount: float = 0.0
    final_amount: float
    
    # Payment info
    payment_method: PaymentMethod
    status: PaymentStatus = PaymentStatus.PENDING
    
    # Gateway response
    gateway_transaction_id: Optional[str] = None
    gateway_response: Optional[dict] = None
    
    # Timestamps
    created_at: datetime
    completed_at: Optional[datetime] = None
    
    # Redirect URL for payment gateway
    payment_url: Optional[str] = None
    qr_code: Optional[str] = None  # For mobile payment QR


class PaymentCallback(BaseModel):
    """Payment gateway callback"""
    transaction_id: str
    gateway_transaction_id: str
    status: PaymentStatus
    gateway_response: dict


class PaymentHistory(BaseModel):
    """Payment history item"""
    transaction_id: str
    plan_name: str
    amount: float
    currency: Currency
    payment_method: PaymentMethod
    status: PaymentStatus
    created_at: datetime


class RefundRequest(BaseModel):
    """Refund request model"""
    transaction_id: str
    reason: str
    amount: Optional[float] = None  # Partial refund


class PlanPricing(BaseModel):
    """Plan pricing model"""
    plan_id: str
    name: str
    data_gb: float
    validity_days: int
    price: float
    currency: Currency = Currency.MMK
    features: List[str] = []
    plan_type: Literal["prepaid", "postpaid"] = "prepaid"
    is_popular: bool = False
    discount_percent: Optional[float] = None
