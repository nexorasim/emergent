"""
Transactease Payment Gateway Integration Service
Version: 1.7
"""

import hmac
import hashlib
import base64
import uuid
import httpx
from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel


class TransacteaseConfig:
    """Transactease Payment Gateway Configuration"""
    MERCHANT_USER_ID = "PGW20250128668036906"
    CHANNEL = "eSIM Myanmar"
    ACCESS_KEY = "a2be3465a5e21c36792a0d74cbb37344"
    SECRET_KEY = "f2009ac218fb7a871e7b175ea09a67bf336ea0758f902600ee3dcbf3623e0d488619961ba03bdc8105f35bfba160633c0b63727767e56af31dcfae4c9aa901a5c3c4268f4631e170e77ac19eb66e3bb378d41405c9a7ae4733d1739b18d71db24cc20aa8cf809b505f1cfe9d4d954142fa91c96ac24957482aa045d7673e9750"
    
    # Environment URLs
    UAT_URL = "https://uatpgw.transactease.com.mm"
    PRODUCTION_URL = "https://pgw.transactease.com.mm"
    
    # Default to UAT for development
    BASE_URL = UAT_URL
    
    # Payment methods
    PAYMENT_METHODS = "mmqr,visa_master"
    DEFAULT_CURRENCY = "MMK"
    DEFAULT_EXPIRED_SECONDS = 300


class PaymentRequest(BaseModel):
    """Payment request model"""
    amount: float
    invoice_no: str
    customer_name: str
    customer_phone: str
    customer_email: str
    address_line1: str = "Yangon"
    address_line2: str = "Myanmar"
    city: str = "Yangon"
    postal_code: str = "11211"
    state: str = "Yangon"
    country: str = "MM"
    remark: Optional[str] = "eSIM Purchase"
    user_defined1: Optional[str] = ""
    user_defined2: Optional[str] = ""
    user_defined3: Optional[str] = ""
    user_defined4: Optional[str] = ""
    user_defined5: Optional[str] = ""


class TransacteaseService:
    """Transactease Payment Gateway Service"""
    
    def __init__(self, use_production: bool = False):
        self.config = TransacteaseConfig()
        self.base_url = self.config.PRODUCTION_URL if use_production else self.config.UAT_URL
    
    def _compute_signature(self, plain_text: str) -> str:
        """Compute HMAC SHA256 signature"""
        key_bytes = self.config.SECRET_KEY.encode('utf-8')
        message_bytes = plain_text.encode('utf-8')
        hmac_obj = hmac.new(key_bytes, message_bytes, hashlib.sha256)
        return base64.b64encode(hmac_obj.digest()).decode('utf-8')
    
    def _generate_request_id(self) -> str:
        """Generate unique request ID"""
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        unique_id = str(uuid.uuid4().hex)[:6].upper()
        return f"REQ{timestamp}{unique_id}"
    
    def _get_signed_datetime(self) -> str:
        """Get current datetime in required format"""
        return datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    
    def generate_payment_form_data(self, payment: PaymentRequest) -> Dict[str, str]:
        """Generate form data for hosted payment request"""
        request_id = self._generate_request_id()
        signed_datetime = self._get_signed_datetime()
        
        # Split customer name into forename and surname
        name_parts = payment.customer_name.split(" ", 1)
        forename = name_parts[0]
        surname = name_parts[1] if len(name_parts) > 1 else name_parts[0]
        
        # Build form fields
        form_fields = {
            "MerchantUserID": self.config.MERCHANT_USER_ID,
            "AccessKey": self.config.ACCESS_KEY,
            "Channel": self.config.CHANNEL,
            "RequestID": request_id,
            "PaymentMethod": self.config.PAYMENT_METHODS,
            "Amount": f"{payment.amount:.2f}",
            "Currency": self.config.DEFAULT_CURRENCY,
            "InvoiceNo": payment.invoice_no,
            "BillToAddressLine1": payment.address_line1,
            "BillToAddressLine2": payment.address_line2,
            "BillToAddressCity": payment.city,
            "BillToAddressPostalCode": payment.postal_code,
            "BillToAddressState": payment.state,
            "BillToAddressCountry": payment.country,
            "BillToForename": forename,
            "BillToSurname": surname,
            "BillToPhone": payment.customer_phone,
            "BillToEmail": payment.customer_email,
            "ExpiredInSeconds": str(self.config.DEFAULT_EXPIRED_SECONDS),
            "Remark": payment.remark or "",
            "UserDefined1": payment.user_defined1 or "",
            "UserDefined2": payment.user_defined2 or "",
            "UserDefined3": payment.user_defined3 or "",
            "UserDefined4": payment.user_defined4 or "",
            "UserDefined5": payment.user_defined5 or "",
            "SignedDateTime": signed_datetime,
        }
        
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
        
        # Build form body string for signature
        form_body_parts = [f"{field}={form_fields[field]}" for field in signed_fields]
        form_body_string = ",".join(form_body_parts)
        
        # Build string to sign
        string_to_sign = f"POST|/Payments/Request|{signed_datetime}|{request_id}|{form_body_string}"
        
        # Compute signature
        form_fields["Signature"] = self._compute_signature(string_to_sign)
        
        return form_fields
    
    def get_payment_url(self) -> str:
        """Get the payment request URL"""
        return f"{self.base_url}/Payments/Request"
    
    def validate_callback_signature(
        self,
        method: str,
        uri: str,
        timestamp: str,
        nonce: str,
        payload_json: str,
        received_signature: str
    ) -> bool:
        """Validate callback signature from Transactease"""
        string_to_sign = f"{method}|{uri}|{timestamp}|{nonce}|{payload_json}"
        computed_signature = self._compute_signature(string_to_sign)
        return hmac.compare_digest(computed_signature, received_signature)
    
    def validate_redirect_signature(
        self,
        method: str,
        uri: str,
        request_id: str,
        query_params: Dict[str, str],
        received_signature: str
    ) -> bool:
        """Validate redirect signature (success/cancel pages)"""
        # Remove Signature from params
        params = {k: v for k, v in query_params.items() if k != "Signature"}
        
        # Build query params string
        query_params_string = ",".join([f"{k}={v}" for k, v in params.items()])
        
        # Build string to sign
        string_to_sign = f"{method}|{uri}|{request_id}|{query_params_string}"
        computed_signature = self._compute_signature(string_to_sign)
        
        return hmac.compare_digest(computed_signature, received_signature)
    
    async def get_transaction_status(
        self,
        request_id: str,
        access_token: str
    ) -> Dict[str, Any]:
        """Get transaction status via API"""
        timestamp = datetime.now().strftime("%Y%m%dHHmmss")
        msg_id = f"M{timestamp}{uuid.uuid4().hex[:6].upper()}"
        
        request_body = {
            "MsgInfo": {
                "VersionNo": "1.0.0",
                "MsgID": msg_id,
                "TimeStamp": timestamp,
                "MsgType": "GET_TRANSACTION_STATUS",
                "InsID": "25050001"
            },
            "MsgData": {
                "RequestID": request_id,
                "MerchantUserID": self.config.MERCHANT_USER_ID
            }
        }
        
        # Compute signature for API request
        nonce = msg_id
        auth_timestamp = self._get_signed_datetime()
        string_to_sign = f"POST|/api/transaction/status|{auth_timestamp}|{nonce}|{str(request_body)}"
        signature = self._compute_signature(string_to_sign)
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "X-Auth-AccessKey": self.config.ACCESS_KEY,
            "X-Auth-Timestamp": auth_timestamp,
            "X-Auth-Nonce": nonce,
            "X-Auth-Signature": signature,
            "Content-Type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/api/transaction/status",
                json=request_body,
                headers=headers
            )
            return response.json()


# Response codes mapping
RESPONSE_CODES = {
    "000": "Success",
    "001": "Transaction Failed",
    "002": "Transaction Canceled",
    "012": "Invalid Field Information",
    "016": "Invalid Hash Value",
    "998": "Invalid Authorization",
    "999": "Invalid Authentication"
}


def get_response_message(code: str) -> str:
    """Get human-readable response message"""
    return RESPONSE_CODES.get(code, "Unknown Error")
