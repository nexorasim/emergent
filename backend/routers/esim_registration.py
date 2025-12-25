"""
eSIM Registration Router
Handles MPT, ATOM U9, MYTEL eSIM registration, payment, and QR issuance
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
import base64
import re

from services.mmqr_service import mmqr_service, phone_validator, PaymentStatus
from services.nexora_ai_service import nexora_ai, VerificationStatus


router = APIRouter(prefix="/api/esim-registration", tags=["eSIM Registration"])


# Request/Response Models
class PhoneValidationRequest(BaseModel):
    phone_number: str = Field(..., description="Myanmar phone number")
    provider: str = Field(..., description="Telecom provider: MPT, ATOM, MYTEL")
    
    @validator("provider")
    def validate_provider(cls, v):
        valid_providers = ["MPT", "ATOM", "MYTEL"]
        if v.upper() not in valid_providers:
            raise ValueError(f"Provider must be one of: {', '.join(valid_providers)}")
        return v.upper()


class DeviceInfo(BaseModel):
    device_type: str = Field(..., description="ios, android, tablet, wearable")
    device_model: str = Field(..., description="Device model name")
    os_version: str = Field(..., description="Operating system version")
    
    @validator("device_type")
    def validate_device_type(cls, v):
        valid_types = ["ios", "android", "tablet", "wearable"]
        if v.lower() not in valid_types:
            raise ValueError(f"Device type must be one of: {', '.join(valid_types)}")
        return v.lower()


class RegistrationRequest(BaseModel):
    phone_number: str
    provider: str
    device_info: DeviceInfo
    user_id: Optional[str] = None
    secondary_device: Optional[DeviceInfo] = None
    
    @validator("provider")
    def validate_provider(cls, v):
        valid_providers = ["MPT", "ATOM", "MYTEL"]
        if v.upper() not in valid_providers:
            raise ValueError(f"Provider must be one of: {', '.join(valid_providers)}")
        return v.upper()


class PaymentVerificationRequest(BaseModel):
    order_id: str
    mmqr_data: str = Field(..., description="MMQR QR code string")
    screenshot_base64: Optional[str] = Field(None, description="Payment screenshot in base64")


class VerificationResponse(BaseModel):
    success: bool
    order_id: Optional[str] = None
    status: str
    message: str
    details: dict = {}
    timestamp: str


class OrderStatusResponse(BaseModel):
    order_id: str
    status: str
    provider: str
    phone_number: str
    device_type: str
    verifications: List[dict]
    qr_code: Optional[str] = None
    created_at: str
    updated_at: str


# Endpoints

@router.post("/validate-phone", response_model=VerificationResponse)
async def validate_phone_number(request: PhoneValidationRequest):
    """
    Step 1: Validate Myanmar phone number and detect provider
    """
    validation = phone_validator.is_esim_eligible(request.phone_number, request.provider)
    
    return VerificationResponse(
        success=validation["eligible"],
        status="valid" if validation["eligible"] else "invalid",
        message="Phone number is eligible for eSIM" if validation["eligible"] else "; ".join(validation["reasons"]),
        details={
            "phone": request.phone_number,
            "provider": request.provider,
            "detected_provider": validation["detected_provider"],
            "eligible": validation["eligible"]
        },
        timestamp=datetime.utcnow().isoformat()
    )


@router.post("/check-device", response_model=VerificationResponse)
async def check_device_compatibility(device: DeviceInfo):
    """
    Step 2: Check device eSIM compatibility
    """
    result = nexora_ai.verify_device_eligibility(
        device.device_type,
        device.device_model,
        device.os_version
    )
    
    return VerificationResponse(
        success=result.status == VerificationStatus.VERIFIED,
        status=result.status.value,
        message="Device is eSIM compatible" if result.status == VerificationStatus.VERIFIED else "; ".join(result.errors + result.warnings),
        details=result.details,
        timestamp=result.timestamp
    )


@router.post("/register", response_model=VerificationResponse)
async def register_esim(request: RegistrationRequest):
    """
    Step 3: Register for eSIM - creates order and runs initial verification
    """
    # Generate user ID if not provided
    user_id = request.user_id or f"user_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
    
    # Run full verification (without payment yet)
    order = nexora_ai.run_full_verification(
        user_id=user_id,
        phone=request.phone_number,
        provider=request.provider,
        device_type=request.device_info.device_type,
        device_model=request.device_info.device_model,
        os_version=request.device_info.os_version
    )
    
    # Generate payment QR
    payment_qr = mmqr_service.generate_payment_qr(
        amount=120000,
        order_id=order.order_id
    )
    
    return VerificationResponse(
        success=order.overall_status != VerificationStatus.FAILED,
        order_id=order.order_id,
        status=order.overall_status.value,
        message=_get_status_message(order.overall_status),
        details={
            "order_id": order.order_id,
            "provider": order.provider,
            "phone_number": order.phone_number,
            "device_type": order.device_type,
            "payment_amount": 120000,
            "payment_currency": "MMK",
            "payment_qr": payment_qr,
            "verifications": [
                {
                    "type": v.verification_type.value,
                    "status": v.status.value,
                    "confidence": v.confidence
                }
                for v in order.verifications
            ]
        },
        timestamp=order.created_at
    )


@router.post("/verify-payment", response_model=VerificationResponse)
async def verify_payment(request: PaymentVerificationRequest):
    """
    Step 4: Verify MMQR payment
    """
    # Get existing order
    order = nexora_ai.get_verification_status(request.order_id)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Verify payment
    payment_result = nexora_ai.verify_payment(request.mmqr_data)
    order.verifications.append(payment_result)
    
    # Verify screenshot if provided
    if request.screenshot_base64:
        screenshot_result = nexora_ai.verify_screenshot(request.screenshot_base64, "payment")
        order.verifications.append(screenshot_result)
    
    # Update overall status
    statuses = [v.status for v in order.verifications]
    
    if VerificationStatus.FAILED in statuses:
        order.overall_status = VerificationStatus.FAILED
    elif all(s == VerificationStatus.VERIFIED for s in statuses):
        order.overall_status = VerificationStatus.VERIFIED
    else:
        order.overall_status = VerificationStatus.REQUIRES_REVIEW
    
    order.updated_at = datetime.utcnow().isoformat()
    
    return VerificationResponse(
        success=payment_result.status == VerificationStatus.VERIFIED,
        order_id=order.order_id,
        status=order.overall_status.value,
        message="Payment verified successfully" if payment_result.status == VerificationStatus.VERIFIED else "; ".join(payment_result.errors),
        details={
            "payment_status": payment_result.status.value,
            "payment_confidence": payment_result.confidence,
            "payment_details": payment_result.details,
            "overall_status": order.overall_status.value
        },
        timestamp=datetime.utcnow().isoformat()
    )


@router.post("/upload-screenshot")
async def upload_screenshot(
    order_id: str = Form(...),
    verification_type: str = Form(default="payment"),
    file: UploadFile = File(...)
):
    """
    Upload and verify screenshot for payment or identity
    """
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
        )
    
    # Read and encode file
    contents = await file.read()
    
    if len(contents) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit")
    
    base64_data = base64.b64encode(contents).decode()
    
    # Verify screenshot
    result = nexora_ai.verify_screenshot(base64_data, verification_type)
    
    # Update order if exists
    order = nexora_ai.get_verification_status(order_id)
    if order:
        order.verifications.append(result)
        order.updated_at = datetime.utcnow().isoformat()
    
    return VerificationResponse(
        success=result.status in [VerificationStatus.VERIFIED, VerificationStatus.REQUIRES_REVIEW],
        order_id=order_id,
        status=result.status.value,
        message="Screenshot verified" if result.status == VerificationStatus.VERIFIED else "Screenshot requires manual review",
        details={
            "verification_type": verification_type,
            "confidence": result.confidence,
            "extracted_data": result.details
        },
        timestamp=result.timestamp
    )


@router.post("/issue-esim", response_model=VerificationResponse)
async def issue_esim(order_id: str):
    """
    Step 5: Issue eSIM QR code after all verifications pass
    """
    order = nexora_ai.get_verification_status(order_id)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.overall_status != VerificationStatus.VERIFIED:
        raise HTTPException(
            status_code=400,
            detail=f"Order not ready for eSIM issuance. Status: {order.overall_status.value}"
        )
    
    # Generate eSIM QR code (simulated)
    esim_qr = _generate_esim_qr(order)
    
    return VerificationResponse(
        success=True,
        order_id=order.order_id,
        status="esim_issued",
        message="eSIM QR code generated successfully",
        details={
            "esim_qr": esim_qr,
            "provider": order.provider,
            "phone_number": order.phone_number,
            "activation_instructions": _get_activation_instructions(order.device_type),
            "support_contact": "info@esim.com.mm"
        },
        timestamp=datetime.utcnow().isoformat()
    )


@router.get("/order/{order_id}", response_model=OrderStatusResponse)
async def get_order_status(order_id: str):
    """
    Get order status and verification details
    """
    order = nexora_ai.get_verification_status(order_id)
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return OrderStatusResponse(
        order_id=order.order_id,
        status=order.overall_status.value,
        provider=order.provider,
        phone_number=order.phone_number,
        device_type=order.device_type,
        verifications=[
            {
                "type": v.verification_type.value,
                "status": v.status.value,
                "confidence": v.confidence,
                "timestamp": v.timestamp,
                "errors": v.errors,
                "warnings": v.warnings
            }
            for v in order.verifications
        ],
        qr_code=None,  # Only provided after issuance
        created_at=order.created_at,
        updated_at=order.updated_at
    )


@router.get("/parse-mmqr")
async def parse_mmqr(qr_string: str):
    """
    Parse and display MMQR data (for debugging/testing)
    """
    try:
        parsed = mmqr_service.parse_mmqr(qr_string)
        validation = mmqr_service.validate_payment(qr_string)
        
        return {
            "success": True,
            "parsed_data": {
                "merchant_name": parsed.merchant_name,
                "merchant_city": parsed.merchant_city,
                "merchant_id": parsed.merchant_id,
                "amount": parsed.amount,
                "currency": parsed.currency,
                "country_code": parsed.country_code,
                "crc": parsed.crc
            },
            "validation": validation
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/providers")
async def get_providers():
    """
    Get list of supported eSIM providers with rules
    """
    providers = []
    for provider in ["MPT", "ATOM", "MYTEL"]:
        rules = nexora_ai.get_provider_rules(provider)
        providers.append({
            "name": provider,
            "esim_price": 120000,
            "currency": "MMK",
            "supports_5g": rules.get("supports_5g", False),
            "supports_volte": rules.get("supports_volte", False),
            "max_esim_per_user": rules.get("max_esim_per_user", 1),
            "requires_kyc": rules.get("requires_kyc", True)
        })
    
    return {"providers": providers}


@router.get("/nexora-ai/status")
async def get_nexora_ai_status():
    """
    Get Nexora AI system status and capabilities
    """
    return {
        "success": True,
        "data": nexora_ai.get_system_status(),
        "timestamp": datetime.utcnow().isoformat()
    }


@router.get("/nexora-ai/audit-log")
async def get_audit_log(limit: int = 50):
    """
    Get Nexora AI audit log entries
    """
    return {
        "success": True,
        "entries": nexora_ai.get_audit_log(limit),
        "total": len(nexora_ai.audit_log),
        "timestamp": datetime.utcnow().isoformat()
    }


# Helper functions

def _get_status_message(status: VerificationStatus) -> str:
    messages = {
        VerificationStatus.PENDING: "Verification pending",
        VerificationStatus.IN_PROGRESS: "Verification in progress",
        VerificationStatus.VERIFIED: "All verifications passed",
        VerificationStatus.FAILED: "Verification failed",
        VerificationStatus.REQUIRES_REVIEW: "Manual review required"
    }
    return messages.get(status, "Unknown status")


def _generate_esim_qr(order) -> str:
    """Generate eSIM activation QR code"""
    # In production, this would call the actual SM-DP+ API
    # For now, generate a simulated QR code data
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    return f"LPA:1${order.provider.lower()}.esim.com.mm$ESIM-{order.order_id}-{timestamp}"


def _get_activation_instructions(device_type: str) -> List[str]:
    """Get device-specific activation instructions"""
    if device_type == "ios":
        return [
            "Go to Settings > Cellular > Add Cellular Plan",
            "Scan the eSIM QR code",
            "Follow the on-screen instructions",
            "Label your new plan (e.g., 'eSIM Myanmar')",
            "Choose your default line settings"
        ]
    elif device_type == "android":
        return [
            "Go to Settings > Network & Internet > SIMs",
            "Tap 'Add' or '+' to add a new SIM",
            "Select 'Download a SIM instead'",
            "Scan the eSIM QR code",
            "Follow the on-screen instructions"
        ]
    else:
        return [
            "Open your device's cellular/mobile settings",
            "Look for 'Add eSIM' or 'Add Cellular Plan'",
            "Scan the provided QR code",
            "Follow the on-screen instructions"
        ]
