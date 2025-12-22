"""
MMQR Payment Service
Parses and validates MMQR QR code strings for Myanmar mobile payments
Supports MPT, ATOM U9, MYTEL payment verification
"""

import re
from datetime import datetime
from typing import Optional, Dict, Any
from dataclasses import dataclass
from enum import Enum


class MMQRParseError(Exception):
    """Custom exception for MMQR parsing errors"""
    pass


class PaymentStatus(str, Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    FAILED = "failed"
    EXPIRED = "expired"


@dataclass
class MMQRData:
    """Parsed MMQR data structure"""
    payload_format: str
    point_of_initiation: str
    merchant_account: str
    merchant_id: str
    merchant_name: str
    merchant_city: str
    postal_code: str
    currency: str
    amount: Optional[float]
    country_code: str
    additional_data: Dict[str, str]
    crc: str
    raw_data: str


class MMQRService:
    """
    MMQR Payment Parsing and Validation Service
    Handles Myanmar QR payment standard parsing
    """
    
    # MMQR Tag definitions
    TAGS = {
        "00": "payload_format",
        "01": "point_of_initiation",
        "26": "merchant_account_info",
        "52": "merchant_category_code",
        "53": "currency",
        "54": "amount",
        "58": "country_code",
        "59": "merchant_name",
        "60": "merchant_city",
        "61": "postal_code",
        "62": "additional_data",
        "63": "crc"
    }
    
    # Myanmar currency code
    MMK_CURRENCY = "104"
    
    # eSIM price in MMK
    ESIM_PRICE = 120000
    
    # Supported providers
    SUPPORTED_PROVIDERS = ["MPT", "ATOM", "MYTEL", "OOREDOO"]
    
    def __init__(self):
        self.parsed_data: Optional[MMQRData] = None
    
    def parse_tlv(self, data: str) -> Dict[str, str]:
        """
        Parse TLV (Tag-Length-Value) encoded MMQR string
        """
        result = {}
        index = 0
        
        while index < len(data):
            if index + 4 > len(data):
                break
                
            tag = data[index:index + 2]
            length = int(data[index + 2:index + 4])
            value = data[index + 4:index + 4 + length]
            
            result[tag] = value
            index += 4 + length
        
        return result
    
    def parse_mmqr(self, qr_string: str) -> MMQRData:
        """
        Parse complete MMQR string and extract all fields
        
        Example MMQR:
        00020101021126500015com.mmqrpay.www01152235110100152220208100165355204481253031045802MM5912ESIM Myanmar6006Hlaing61051105164330002MY0113...0206...63041C92
        """
        if not qr_string or len(qr_string) < 20:
            raise MMQRParseError("Invalid MMQR string: too short")
        
        try:
            parsed = self.parse_tlv(qr_string)
            
            # Extract merchant account info (tag 26)
            merchant_account_raw = parsed.get("26", "")
            merchant_account_parsed = self.parse_tlv(merchant_account_raw) if merchant_account_raw else {}
            
            # Extract additional data (tag 62)
            additional_raw = parsed.get("62", "")
            additional_parsed = self.parse_tlv(additional_raw) if additional_raw else {}
            
            # Parse amount if present
            amount_str = parsed.get("54", "")
            amount = float(amount_str) if amount_str else None
            
            self.parsed_data = MMQRData(
                payload_format=parsed.get("00", ""),
                point_of_initiation=parsed.get("01", ""),
                merchant_account=merchant_account_raw,
                merchant_id=merchant_account_parsed.get("01", ""),
                merchant_name=parsed.get("59", ""),
                merchant_city=parsed.get("60", ""),
                postal_code=parsed.get("61", ""),
                currency=parsed.get("53", ""),
                amount=amount,
                country_code=parsed.get("58", ""),
                additional_data=additional_parsed,
                crc=parsed.get("63", ""),
                raw_data=qr_string
            )
            
            return self.parsed_data
            
        except Exception as e:
            raise MMQRParseError(f"Failed to parse MMQR: {str(e)}")
    
    def validate_payment(self, qr_string: str, expected_amount: float = None) -> Dict[str, Any]:
        """
        Validate MMQR payment data
        Returns validation result with status and details
        """
        if expected_amount is None:
            expected_amount = self.ESIM_PRICE
        
        result = {
            "valid": False,
            "status": PaymentStatus.PENDING,
            "errors": [],
            "warnings": [],
            "data": None,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        try:
            parsed = self.parse_mmqr(qr_string)
            result["data"] = {
                "merchant_name": parsed.merchant_name,
                "merchant_city": parsed.merchant_city,
                "amount": parsed.amount,
                "currency": parsed.currency,
                "country_code": parsed.country_code,
                "merchant_id": parsed.merchant_id
            }
            
            # Validate country code
            if parsed.country_code != "MM":
                result["errors"].append("Invalid country code: must be MM (Myanmar)")
            
            # Validate currency
            if parsed.currency != self.MMK_CURRENCY:
                result["errors"].append(f"Invalid currency: expected {self.MMK_CURRENCY} (MMK)")
            
            # Validate amount
            if parsed.amount is not None:
                if parsed.amount < expected_amount:
                    result["errors"].append(f"Insufficient amount: {parsed.amount} MMK (required: {expected_amount} MMK)")
                elif parsed.amount > expected_amount:
                    result["warnings"].append(f"Overpayment detected: {parsed.amount} MMK (required: {expected_amount} MMK)")
            
            # Validate CRC
            if not parsed.crc:
                result["warnings"].append("CRC checksum missing")
            
            # Set final status
            if not result["errors"]:
                result["valid"] = True
                result["status"] = PaymentStatus.VERIFIED
            else:
                result["status"] = PaymentStatus.FAILED
                
        except MMQRParseError as e:
            result["errors"].append(str(e))
            result["status"] = PaymentStatus.FAILED
        
        return result
    
    def generate_payment_qr(self, amount: float = None, order_id: str = None) -> str:
        """
        Generate MMQR string for eSIM payment
        """
        if amount is None:
            amount = self.ESIM_PRICE
        
        # Build MMQR components
        payload_format = "000201"
        point_of_initiation = "010211"
        
        # Merchant account info
        merchant_domain = "com.mmqrpay.www"
        merchant_id = "223511010015222"
        merchant_account = f"26{len(merchant_domain) + len(merchant_id) + 8:02d}0015{merchant_domain}0115{merchant_id}"
        
        # Transaction details
        mcc = "52044812"  # Merchant Category Code
        currency = f"5303{self.MMK_CURRENCY}"
        amount_str = f"54{len(str(int(amount))):02d}{int(amount)}"
        country = "5802MM"
        merchant_name = "5912ESIM Myanmar"
        city = "6006Yangon"
        postal_code = "610511051"
        
        # Additional data with order reference
        additional = ""
        if order_id:
            additional = f"62{len(order_id) + 4:02d}05{len(order_id):02d}{order_id}"
        
        # Combine all parts (CRC placeholder)
        qr_data = f"{payload_format}{point_of_initiation}{merchant_account}{mcc}{currency}{amount_str}{country}{merchant_name}{city}{postal_code}{additional}6304"
        
        # Calculate CRC-16 CCITT
        crc = self._calculate_crc(qr_data)
        
        return f"{qr_data}{crc}"
    
    def _calculate_crc(self, data: str) -> str:
        """Calculate CRC-16 CCITT checksum"""
        crc = 0xFFFF
        polynomial = 0x1021
        
        for char in data:
            crc ^= ord(char) << 8
            for _ in range(8):
                if crc & 0x8000:
                    crc = (crc << 1) ^ polynomial
                else:
                    crc <<= 1
                crc &= 0xFFFF
        
        return f"{crc:04X}"


class PhoneNumberValidator:
    """
    Myanmar Phone Number Validation
    Supports MPT, ATOM U9, MYTEL, Ooredoo prefixes
    """
    
    # Provider prefix mappings
    PROVIDER_PREFIXES = {
        "MPT": ["09", "097", "098"],
        "ATOM": ["094", "0944", "0945"],
        "MYTEL": ["096", "0966", "0967", "0968", "0969"],
        "OOREDOO": ["099", "0995", "0996", "0997"]
    }
    
    # Full regex pattern for Myanmar numbers
    MYANMAR_PHONE_PATTERN = r"^(09|959|\+959)[0-9]{7,9}$"
    
    @classmethod
    def validate(cls, phone: str) -> Dict[str, Any]:
        """
        Validate Myanmar phone number and detect provider
        """
        result = {
            "valid": False,
            "provider": None,
            "normalized": None,
            "errors": []
        }
        
        # Clean the number
        cleaned = re.sub(r"[\s\-\(\)]", "", phone)
        
        # Normalize to 09 format
        if cleaned.startswith("+959"):
            cleaned = "09" + cleaned[4:]
        elif cleaned.startswith("959"):
            cleaned = "09" + cleaned[3:]
        
        result["normalized"] = cleaned
        
        # Validate format
        if not re.match(cls.MYANMAR_PHONE_PATTERN, cleaned):
            result["errors"].append("Invalid Myanmar phone number format")
            return result
        
        # Detect provider
        for provider, prefixes in cls.PROVIDER_PREFIXES.items():
            for prefix in prefixes:
                if cleaned.startswith(prefix):
                    result["provider"] = provider
                    break
            if result["provider"]:
                break
        
        if not result["provider"]:
            result["provider"] = "UNKNOWN"
            result["errors"].append("Unable to detect provider from phone number")
        
        if not result["errors"]:
            result["valid"] = True
        
        return result
    
    @classmethod
    def is_esim_eligible(cls, phone: str, provider: str) -> Dict[str, Any]:
        """
        Check if phone number is eligible for eSIM activation
        """
        validation = cls.validate(phone)
        
        result = {
            "eligible": False,
            "phone_valid": validation["valid"],
            "detected_provider": validation["provider"],
            "requested_provider": provider,
            "reasons": []
        }
        
        if not validation["valid"]:
            result["reasons"].extend(validation["errors"])
            return result
        
        # Check provider match
        if validation["provider"] != provider.upper():
            result["reasons"].append(
                f"Phone number belongs to {validation['provider']}, not {provider}"
            )
            return result
        
        # Check if provider supports eSIM
        supported_esim_providers = ["MPT", "ATOM", "MYTEL"]
        if provider.upper() not in supported_esim_providers:
            result["reasons"].append(f"{provider} does not support eSIM activation")
            return result
        
        result["eligible"] = True
        return result


# Singleton instance
mmqr_service = MMQRService()
phone_validator = PhoneNumberValidator()
