"""
Payments Router for eSIM Myanmar Platform
"""

from fastapi import APIRouter, HTTPException, Depends, Request, status
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from .auth import get_current_user

router = APIRouter(prefix="/api/payments", tags=["Payments"])


# Request Models
class CreatePaymentRequest(BaseModel):
    plan_id: str
    payment_method: str  # kbz_pay, wave_money, aya_pay, card
    currency: str = "MMK"
    promo_code: Optional[str] = None
    profile_id: Optional[str] = None  # For top-up


class PaymentCallbackRequest(BaseModel):
    transaction_id: str
    gateway_transaction_id: str
    status: str
    gateway_response: dict


class RefundRequest(BaseModel):
    reason: str
    amount: Optional[float] = None


@router.post("")
async def create_payment(
    request: Request,
    data: CreatePaymentRequest,
    current_user: dict = Depends(get_current_user)
):
    """Create payment transaction"""
    payment_service = request.app.state.payment_service
    
    try:
        transaction = await payment_service.create_payment(
            user_id=current_user["user_id"],
            plan_id=data.plan_id,
            payment_method=data.payment_method,
            currency=data.currency,
            promo_code=data.promo_code,
            profile_id=data.profile_id
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {
        "message": "Payment initiated",
        "transaction": transaction
    }


@router.get("/{transaction_id}")
async def get_payment(
    request: Request,
    transaction_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get payment transaction details"""
    payment_service = request.app.state.payment_service
    
    transaction = await payment_service.get_transaction(
        transaction_id,
        current_user["user_id"]
    )
    
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    
    return {"transaction": transaction}


@router.get("")
async def get_payment_history(
    request: Request,
    limit: int = 50,
    current_user: dict = Depends(get_current_user)
):
    """Get user's payment history"""
    payment_service = request.app.state.payment_service
    
    transactions = await payment_service.get_user_transactions(
        current_user["user_id"],
        limit=limit
    )
    
    return {"transactions": transactions}


@router.post("/callback")
async def payment_callback(
    request: Request,
    data: PaymentCallbackRequest
):
    """Handle payment gateway callback"""
    payment_service = request.app.state.payment_service
    
    try:
        transaction = await payment_service.process_callback(
            transaction_id=data.transaction_id,
            gateway_transaction_id=data.gateway_transaction_id,
            status=data.status,
            gateway_response=data.gateway_response
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"message": "Callback processed", "transaction": transaction}


@router.post("/{transaction_id}/refund")
async def request_refund(
    request: Request,
    transaction_id: str,
    data: RefundRequest,
    current_user: dict = Depends(get_current_user)
):
    """Request refund for transaction"""
    payment_service = request.app.state.payment_service
    
    try:
        result = await payment_service.request_refund(
            transaction_id=transaction_id,
            user_id=current_user["user_id"],
            reason=data.reason,
            amount=data.amount
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"message": "Refund requested", "refund": result}


@router.get("/methods/available")
async def get_payment_methods(request: Request):
    """Get available payment methods"""
    return {
        "methods": [
            {
                "id": "kbz_pay",
                "name": "KBZ Pay",
                "icon": "kbz",
                "description": "Pay with KBZ Pay mobile wallet",
                "currencies": ["MMK"],
                "is_available": True
            },
            {
                "id": "wave_money",
                "name": "Wave Money",
                "icon": "wave",
                "description": "Pay with Wave Money mobile wallet",
                "currencies": ["MMK"],
                "is_available": True
            },
            {
                "id": "aya_pay",
                "name": "AYA Pay",
                "icon": "aya",
                "description": "Pay with AYA Pay mobile wallet",
                "currencies": ["MMK"],
                "is_available": True
            },
            {
                "id": "card",
                "name": "Credit/Debit Card",
                "icon": "card",
                "description": "Pay with Visa or Mastercard",
                "currencies": ["MMK", "USD"],
                "is_available": False  # Coming soon
            }
        ]
    }


@router.post("/validate-promo")
async def validate_promo_code(
    request: Request,
    promo_code: str,
    plan_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Validate promo code"""
    db = request.app.state.db
    
    promo = await db.promo_codes.find_one({
        "code": promo_code.upper(),
        "is_active": True,
        "valid_until": {"$gte": datetime.utcnow()}
    })
    
    if not promo:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired promo code"
        )
    
    # Check if applicable to plan
    if promo.get("applicable_plans") and plan_id not in promo["applicable_plans"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Promo code not applicable to this plan"
        )
    
    return {
        "valid": True,
        "discount_percent": promo.get("discount_percent", 0),
        "description": promo.get("description", "")
    }
