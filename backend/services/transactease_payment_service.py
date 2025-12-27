"""Transactease Payment Gateway Integration Service
eSIM Myanmar Payment Processing
"""

import hmac
import hashlib
import base64
from datetime import datetime, timedelta
from typing import Dict, Optional, Any
import uuid
import json


class TransacteaseConfig:
    """Transactease Gateway Configuration"""
    
    # Merchant Credentials
    MERCHANT_USER_ID = "PGW20250128668036906"
    CHANNEL = "eSIM Myanmar"
    ACCESS_KEY = "a2be3465a5e21c36792a0d74cbb37344"
    SECRET_KEY = "f2009ac218fb7a871e7b175ea09a67bf336ea0758f902600ee3dcbf3623e0d488619961ba03bdc8105f35bfba160633c0b63727767e56af31dcfae4c9aa901a5c3c4268f4631e170e77ac19eb66e3bb378d41405c9a7ae4733d1739b18d71db24cc20aa8cf809b505f1cfe9d4d954142fa91c96ac24957482aa045d7673e9750"
    
    # Environment URLs
    UAT_BASE_URL = "https://uatpgw.transactease.com.mm"
    PRODUCTION_BASE_URL = "https://pgw.transactease.com.mm"
    
    # Payment Methods
    PAYMENT_METHODS = "mmqr,visa_master"
    
    # Default Settings
    CURRENCY = "MMK"
    EXPIRED_IN_SECONDS = 300  # 5 minutes
    
    @staticmethod
    def get_base_url(is_production: bool = False) -> str:
        """Get appropriate base URL"""
        return TransacteaseConfig.PRODUCTION_BASE_URL if is_production else TransacteaseConfig.UAT_BASE_URL


class TransacteaseSignature:
    """Signature generation and validation for Transactease"""
    
    @staticmethod
    def compute_hmac_sha256(plain_text: str, secret_key: str) -> str:
        """Compute HMAC SHA256 signature"""
        key_bytes = secret_key.encode('utf-8')
        message_bytes = plain_text.encode('utf-8')
        
        hmac_obj = hmac.new(key_bytes, message_bytes, hashlib.sha256)
        signature = base64.b64encode(hmac_obj.digest()).decode('utf-8')
        
        return signature
    
    @staticmethod
    def generate_hosted_payment_signature(
        form_fields: Dict[str, str],
        secret_key: str
    ) -> str:
        """Generate signature for hosted payment request"""
        
        # Extract required fields
        signed_datetime = form_fields.get("SignedDateTime")
        request_id = form_fields.get("RequestID")
        signed_fields = form_fields.get("SignedFields", "")
        
        # Build form body string from signed fields order
        field_order = signed_fields.split(',')
        form_body_parts = []
        
        for field in field_order:
            if field in form_fields:
                value = form_fields[field]
                form_body_parts.append(f"{field}={value}")
        
        form_body_string = ",".join(form_body_parts)
        
        # Build string to sign
        string_to_sign = f"POST|/Payments/Request|{signed_datetime}|{request_id}|{form_body_string}"
        
        # Compute signature
        return TransacteaseSignature.compute_hmac_sha256(string_to_sign, secret_key)
    
    @staticmethod
    def validate_callback_signature(
        method: str,
        uri: str,
        timestamp: str,
        nonce: str,
        payload_json: str,
        received_signature: str,
        secret_key: str
    ) -> bool:
        """Validate callback signature from Transactease"""
        
        string_to_sign = f"{method}|{uri}|{timestamp}|{nonce}|{payload_json}"
        computed_signature = TransacteaseSignature.compute_hmac_sha256(string_to_sign, secret_key)
        
        return computed_signature == received_signature
    
    @staticmethod
    def validate_redirect_signature(
        method: str,
        uri: str,
        request_id: str,
        query_params: Dict[str, str],
        received_signature: str,
        secret_key: str
    ) -> bool:
        """Validate success/cancel redirect signature"""
        
        # Remove Signature from query params
        params = query_params.copy()
        params.pop("Signature", None)
        
        # Build query params string in order
        query_params_string = ",".join([f"{k}={v}" for k, v in params.items()])
        
        # Build string to sign
        string_to_sign = f"{method}|{uri}|{request_id}|{query_params_string}"
        
        # Compute signature
        computed_signature = TransacteaseSignature.compute_hmac_sha256(string_to_sign, secret_key)
        
        return computed_signature == received_signature


class TransacteasePaymentService:
    """Transactease Payment Service"""
    
    def __init__(self, is_production: bool = False):
        self.base_url = TransacteaseConfig.get_base_url(is_production)
        self.merchant_user_id = TransacteaseConfig.MERCHANT_USER_ID
        self.channel = TransacteaseConfig.CHANNEL
        self.access_key = TransacteaseConfig.ACCESS_KEY
        self.secret_key = TransacteaseConfig.SECRET_KEY
    
    def generate_request_id(self) -> str:
        """Generate unique request ID"""
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        unique_id = str(uuid.uuid4().hex[:8]).upper()
        return f"REQ{timestamp}{unique_id}"
    
    def create_hosted_payment_form(
        self,
        amount: float,
        invoice_no: str,
        customer_info: Dict[str, str],
        remark: str = "eSIM Purchase",
        success_url: Optional[str] = None,
        cancel_url: Optional[str] = None
    ) -> Dict[str, str]:
        """Create form fields for hosted payment request"""
        
        request_id = self.generate_request_id()
        signed_datetime = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S")
        
        # Build form fields
        form_fields = {
            "MerchantUserID": self.merchant_user_id,
            "AccessKey": self.access_key,
            "Channel": self.channel,
            "RequestID": request_id,
            "PaymentMethod": TransacteaseConfig.PAYMENT_METHODS,
            "Amount": f"{amount:.2f}",
            "Currency": TransacteaseConfig.CURRENCY,
            "InvoiceNo": invoice_no,
            "BillToAddressLine1": customer_info.get("address_line1", ""),
            "BillToAddressLine2": customer_info.get("address_line2", ""),
            "BillToAddressCity": customer_info.get("city", "Yangon"),
            "BillToAddressPostalCode": customer_info.get("postal_code", "11211"),
            "BillToAddressState": customer_info.get("state", "Yangon"),
            "BillToAddressCountry": customer_info.get("country", "MM"),
            "BillToForename": customer_info.get("first_name", ""),
            "BillToSurname": customer_info.get("last_name", ""),
            "BillToPhone": customer_info.get("phone", ""),
            "BillToEmail": customer_info.get("email", ""),
            "ExpiredInSeconds": str(TransacteaseConfig.EXPIRED_IN_SECONDS),
            "Remark": remark,
            "UserDefined1": customer_info.get("user_id", ""),
            "UserDefined2": customer_info.get("plan_id", ""),
            "UserDefined3": "",
            "UserDefined4": "",
            "UserDefined5": "",
            "SignedDateTime": signed_datetime
        }
        
        # Add success/cancel URLs if provided
        if success_url:
            form_fields["SuccessURL"] = success_url
        if cancel_url:
            form_fields["CancelURL"] = cancel_url
        
        # Define signed fields order
        signed_fields = [
            "MerchantUserID", "AccessKey", "Channel", "RequestID", "PaymentMethod",
            "Amount", "Currency", "InvoiceNo", "BillToAddressLine1", "BillToAddressLine2",
            "BillToAddressCity", "BillToAddressPostalCode", "BillToAddressState",
            "BillToAddressCountry", "BillToForename", "BillToSurname", "BillToPhone",
            "BillToEmail", "ExpiredInSeconds", "Remark", "UserDefined1", "UserDefined2",
            "UserDefined3", "UserDefined4", "UserDefined5", "SignedDateTime"
        ]
        
        form_fields["SignedFields"] = ",".join(signed_fields)
        
        # Generate signature
        signature = TransacteaseSignature.generate_hosted_payment_signature(
            form_fields,
            self.secret_key
        )
        
        form_fields["Signature"] = signature
        
        return {
            "form_action": f"{self.base_url}/Payments/Request",
            "form_fields": form_fields,
            "request_id": request_id
        }
    
    def validate_payment_callback(
        self,
        method: str,
        uri: str,
        headers: Dict[str, str],
        payload: str
    ) -> tuple[bool, Optional[Dict[str, Any]]]:
        """Validate payment callback from Transactease"""
        
        try:
            # Extract headers
            access_key = headers.get("X-Auth-AccessKey")
            timestamp = headers.get("X-Auth-Timestamp")
            nonce = headers.get("X-Auth-Nonce")
            received_signature = headers.get("X-Auth-Signature")
            
            # Validate access key
            if access_key != self.access_key:
                return False, {"error": "Invalid access key"}
            
            # Validate signature
            is_valid = TransacteaseSignature.validate_callback_signature(
                method,
                uri,
                timestamp,
                nonce,
                payload,
                received_signature,
                self.secret_key
            )
            
            if not is_valid:
                return False, {"error": "Invalid signature"}
            
            # Parse payload
            callback_data = json.loads(payload)
            
            return True, callback_data
            
        except Exception as e:
            return False, {"error": str(e)}
    
    def validate_payment_redirect(
        self,
        method: str,
        uri: str,
        query_params: Dict[str, str]
    ) -> tuple[bool, Optional[Dict[str, str]]]:
        """Validate success/cancel redirect"""
        
        try:
            request_id = query_params.get("RequestID")
            received_signature = query_params.get("Signature")
            
            if not request_id or not received_signature:
                return False, {"error": "Missing required parameters"}
            
            # Validate signature
            is_valid = TransacteaseSignature.validate_redirect_signature(
                method,
                uri,
                request_id,
                query_params,
                received_signature,
                self.secret_key
            )
            
            if not is_valid:
                return False, {"error": "Invalid signature"}
            
            return True, query_params
            
        except Exception as e:
            return False, {"error": str(e)}
    
    def parse_transaction_status(self, status_code: str) -> Dict[str, Any]:
        """Parse transaction status code"""
        
        status_map = {
            "000": {"status": "success", "description": "Transaction Successful"},
            "001": {"status": "failed", "description": "Transaction Failed"},
            "002": {"status": "canceled", "description": "Transaction Canceled"},
            "012": {"status": "error", "description": "Invalid Field Information"},
            "016": {"status": "error", "description": "Invalid Hash Value"},
            "998": {"status": "error", "description": "Invalid Authorization"},
            "999": {"status": "error", "description": "Invalid Authentication"}
        }
        
        return status_map.get(status_code, {
            "status": "unknown",
            "description": f"Unknown status code: {status_code}"
        })


# Singleton instance
transactease_service = TransacteasePaymentService(is_production=False)
