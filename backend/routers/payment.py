"""Transactease Payment Router
Payment processing endpoints for eSIM Myanmar
"""

from fastapi import APIRouter, HTTPException, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime
import uuid

from services.transactease_payment_service import transactease_service

router = APIRouter(prefix="/api/payment", tags=["Payment"])


class PaymentInitiateRequest(BaseModel):
    amount: float
    plan_id: str
    user_id: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address_line1: str = "eSIM Myanmar"
    address_line2: str = "Yangon"
    city: str = "Yangon"
    postal_code: str = "11211"
    state: str = "Yangon"
    country: str = "MM"


class PaymentCallbackData(BaseModel):
    request_id: str
    transaction_id: Optional[str] = None
    status: str
    amount: Optional[float] = None


@router.post("/initiate")
async def initiate_payment(payment_request: PaymentInitiateRequest):
    """Initiate payment with Transactease"""
    
    try:
        # Generate invoice number
        invoice_no = f"INV{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        
        # Prepare customer info
        customer_info = {
            "first_name": payment_request.first_name,
            "last_name": payment_request.last_name,
            "email": payment_request.email,
            "phone": payment_request.phone,
            "address_line1": payment_request.address_line1,
            "address_line2": payment_request.address_line2,
            "city": payment_request.city,
            "postal_code": payment_request.postal_code,
            "state": payment_request.state,
            "country": payment_request.country,
            "user_id": payment_request.user_id,
            "plan_id": payment_request.plan_id
        }
        
        # Create hosted payment form
        payment_form = transactease_service.create_hosted_payment_form(
            amount=payment_request.amount,
            invoice_no=invoice_no,
            customer_info=customer_info,
            remark=f"eSIM Plan Purchase - {payment_request.plan_id}"
        )
        
        return {
            "success": True,
            "payment_url": payment_form["form_action"],
            "form_fields": payment_form["form_fields"],
            "request_id": payment_form["request_id"],
            "invoice_no": invoice_no
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/form/{request_id}")
async def get_payment_form(request_id: str):
    """Generate HTML payment form for auto-submit"""
    
    # This endpoint would retrieve stored payment form data
    # and generate an auto-submitting HTML form
    
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Processing Payment...</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #1e2f3c 0%, #0d1821 100%);
                color: white;
            }
            .loader {
                text-align: center;
            }
            .spinner {
                border: 4px solid rgba(0, 255, 255, 0.3);
                border-radius: 50%;
                border-top: 4px solid #00FFFF;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <div class="loader">
            <div class="spinner"></div>
            <h2>Processing Payment</h2>
            <p>Please wait while we redirect you to the payment gateway...</p>
        </div>
        <form id="paymentForm" method="post" action="" style="display:none;">
            <!-- Form fields will be injected here -->
        </form>
        <script>
            // Auto-submit form after page load
            window.onload = function() {
                setTimeout(function() {
                    document.getElementById('paymentForm').submit();
                }, 1000);
            };
        </script>
    </body>
    </html>
    """
    
    return HTMLResponse(content=html_content)


@router.post("/callback")
async def payment_callback(request: Request):
    """Handle payment callback from Transactease"""
    
    try:
        # Extract headers
        headers = {
            "X-Auth-AccessKey": request.headers.get("X-Auth-AccessKey"),
            "X-Auth-Timestamp": request.headers.get("X-Auth-Timestamp"),
            "X-Auth-Nonce": request.headers.get("X-Auth-Nonce"),
            "X-Auth-Signature": request.headers.get("X-Auth-Signature")
        }
        
        # Get request body
        body = await request.body()
        payload = body.decode('utf-8')
        
        # Validate callback
        is_valid, callback_data = transactease_service.validate_payment_callback(
            method="POST",
            uri="/api/payment/callback",
            headers=headers,
            payload=payload
        )
        
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid callback signature")
        
        # Process callback data
        # Here you would:
        # 1. Update transaction status in database
        # 2. Activate eSIM profile if payment successful
        # 3. Send confirmation email
        # 4. Log transaction details
        
        return {
            "success": True,
            "message": "Callback processed",
            "data": callback_data
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/success")
async def payment_success(
    RequestID: str,
    TransactionReferenceNumber: str,
    TransactionID: str,
    Signature: str
):
    """Handle payment success redirect"""
    
    try:
        query_params = {
            "RequestID": RequestID,
            "TransactionReferenceNumber": TransactionReferenceNumber,
            "TransactionID": TransactionID,
            "Signature": Signature
        }
        
        # Validate redirect signature
        is_valid, validated_params = transactease_service.validate_payment_redirect(
            method="GET",
            uri="/api/payment/success",
            query_params=query_params
        )
        
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        # Redirect to frontend success page
        frontend_url = "/payment/success"
        redirect_url = f"{frontend_url}?request_id={RequestID}&transaction_id={TransactionID}"
        
        return RedirectResponse(url=redirect_url)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/cancel")
async def payment_cancel(
    RequestID: str,
    TransactionReferenceNumber: str,
    Signature: str
):
    """Handle payment cancellation redirect"""
    
    try:
        query_params = {
            "RequestID": RequestID,
            "TransactionReferenceNumber": TransactionReferenceNumber,
            "Signature": Signature
        }
        
        # Validate redirect signature
        is_valid, validated_params = transactease_service.validate_payment_redirect(
            method="GET",
            uri="/api/payment/cancel",
            query_params=query_params
        )
        
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        # Redirect to frontend cancel page
        frontend_url = "/payment/cancel"
        redirect_url = f"{frontend_url}?request_id={RequestID}"
        
        return RedirectResponse(url=redirect_url)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{request_id}")
async def get_payment_status(request_id: str):
    """Get payment status by request ID"""
    
    try:
        # This would query your database for the payment status
        # For now, return a placeholder
        
        return {
            "request_id": request_id,
            "status": "pending",
            "message": "Payment status check"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/test")
async def test_payment_gateway():
    """Test Transactease gateway configuration"""
    
    try:
        # Test payment form generation
        test_customer = {
            "first_name": "Test",
            "last_name": "User",
            "email": "test@esim.com.mm",
            "phone": "09950000001",
            "address_line1": "Test Address",
            "address_line2": "Yangon",
            "city": "Yangon",
            "postal_code": "11211",
            "state": "Yangon",
            "country": "MM",
            "user_id": "test_user_123",
            "plan_id": "basic_5g"
        }
        
        payment_form = transactease_service.create_hosted_payment_form(
            amount=1000.00,
            invoice_no="TEST001",
            customer_info=test_customer,
            remark="Test Payment"
        )
        
        return {
            "success": True,
            "message": "Payment gateway configured correctly",
            "test_data": {
                "merchant_id": transactease_service.merchant_user_id,
                "base_url": transactease_service.base_url,
                "request_id": payment_form["request_id"],
                "signature_generated": True
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
