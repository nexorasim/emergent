"""
Transactease Payment Gateway Router
"""

from fastapi import APIRouter, Request, HTTPException, Depends, Header
from fastapi.responses import HTMLResponse, RedirectResponse
from typing import Optional, Dict, Any
import json
import logging

from services.transactease_service import (
    TransacteaseService,
    PaymentRequest,
    get_response_message
)

router = APIRouter(prefix="/api/payments/transactease", tags=["Transactease"])
logger = logging.getLogger(__name__)

# Initialize service (use UAT by default)
payment_service = TransacteaseService(use_production=False)


@router.post("/initiate")
async def initiate_payment(payment: PaymentRequest):
    """
    Initiate a payment request and return form data for hosted payment
    """
    try:
        form_data = payment_service.generate_payment_form_data(payment)
        payment_url = payment_service.get_payment_url()
        
        return {
            "success": True,
            "payment_url": payment_url,
            "form_data": form_data,
            "request_id": form_data["RequestID"]
        }
    except Exception as e:
        logger.error(f"Payment initiation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/callback")
async def payment_callback(
    request: Request,
    x_auth_accesskey: str = Header(..., alias="X-Auth-AccessKey"),
    x_auth_timestamp: str = Header(..., alias="X-Auth-Timestamp"),
    x_auth_nonce: str = Header(..., alias="X-Auth-Nonce"),
    x_auth_signature: str = Header(..., alias="X-Auth-Signature")
):
    """
    Handle payment callback from Transactease
    """
    try:
        # Get raw body
        body = await request.body()
        payload_json = body.decode('utf-8')
        
        # Validate signature
        is_valid = payment_service.validate_callback_signature(
            method="POST",
            uri="/api/payments/transactease/callback",
            timestamp=x_auth_timestamp,
            nonce=x_auth_nonce,
            payload_json=payload_json,
            received_signature=x_auth_signature
        )
        
        if not is_valid:
            logger.warning(f"Invalid callback signature for nonce: {x_auth_nonce}")
            raise HTTPException(status_code=401, detail="Invalid signature")
        
        # Parse payload
        payload = json.loads(payload_json)
        
        # Extract transaction details
        response_code = payload.get("ResponseCode", "999")
        request_id = payload.get("RequestID")
        transaction_id = payload.get("TransactionID")
        transaction_ref = payload.get("TransactionReferenceNumber")
        amount = payload.get("Amount")
        
        logger.info(f"Payment callback received: RequestID={request_id}, Code={response_code}")
        
        # TODO: Update transaction status in database
        # await update_transaction_status(request_id, response_code, transaction_id)
        
        return {
            "success": response_code == "000",
            "response_code": response_code,
            "message": get_response_message(response_code),
            "request_id": request_id,
            "transaction_id": transaction_id,
            "transaction_reference": transaction_ref,
            "amount": amount
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    except Exception as e:
        logger.error(f"Callback processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/success")
async def payment_success(
    request: Request,
    RequestID: str,
    TransactionReferenceNumber: str,
    TransactionID: str,
    Signature: str
):
    """
    Handle successful payment redirect
    """
    try:
        # Validate redirect signature
        query_params = {
            "RequestID": RequestID,
            "TransactionReferenceNumber": TransactionReferenceNumber,
            "TransactionID": TransactionID
        }
        
        is_valid = payment_service.validate_redirect_signature(
            method="GET",
            uri="/api/payments/transactease/success",
            request_id=RequestID,
            query_params=query_params,
            received_signature=Signature
        )
        
        if not is_valid:
            logger.warning(f"Invalid success redirect signature for RequestID: {RequestID}")
            # Still process but log the warning
        
        logger.info(f"Payment success: RequestID={RequestID}, TxnID={TransactionID}")
        
        # TODO: Update transaction and redirect to frontend success page
        # Redirect to frontend with success status
        frontend_url = f"/payment/success?request_id={RequestID}&transaction_id={TransactionID}"
        
        return {
            "success": True,
            "message": "Payment completed successfully",
            "request_id": RequestID,
            "transaction_id": TransactionID,
            "transaction_reference": TransactionReferenceNumber,
            "redirect_url": frontend_url
        }
        
    except Exception as e:
        logger.error(f"Success redirect processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/cancel")
async def payment_cancel(
    request: Request,
    RequestID: str,
    TransactionReferenceNumber: str,
    Signature: str
):
    """
    Handle cancelled payment redirect
    """
    try:
        # Validate redirect signature
        query_params = {
            "RequestID": RequestID,
            "TransactionReferenceNumber": TransactionReferenceNumber
        }
        
        is_valid = payment_service.validate_redirect_signature(
            method="GET",
            uri="/api/payments/transactease/cancel",
            request_id=RequestID,
            query_params=query_params,
            received_signature=Signature
        )
        
        if not is_valid:
            logger.warning(f"Invalid cancel redirect signature for RequestID: {RequestID}")
        
        logger.info(f"Payment cancelled: RequestID={RequestID}")
        
        # TODO: Update transaction status to cancelled
        frontend_url = f"/payment/cancel?request_id={RequestID}"
        
        return {
            "success": False,
            "message": "Payment was cancelled",
            "request_id": RequestID,
            "transaction_reference": TransactionReferenceNumber,
            "redirect_url": frontend_url
        }
        
    except Exception as e:
        logger.error(f"Cancel redirect processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{request_id}")
async def get_payment_status(request_id: str):
    """
    Get payment status by request ID
    """
    try:
        # TODO: Implement API login to get access token
        # For now, return placeholder
        return {
            "request_id": request_id,
            "status": "pending",
            "message": "Status check requires API authentication"
        }
    except Exception as e:
        logger.error(f"Status check failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/form/{request_id}")
async def get_payment_form(request_id: str):
    """
    Generate HTML payment form for redirect
    """
    # This would typically be called after initiate to get a ready-to-submit form
    return HTMLResponse(content="""
    <html>
    <head><title>Redirecting to Payment...</title></head>
    <body>
        <p>Redirecting to payment gateway...</p>
        <script>
            // Form would be auto-submitted here
        </script>
    </body>
    </html>
    """)
