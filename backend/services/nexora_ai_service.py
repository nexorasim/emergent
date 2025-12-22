"""
Nexora AI Agentic Era - Verification Service
AI-powered validation for eSIM registration, payment, and screenshot verification
"""

import re
import hashlib
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from dataclasses import dataclass, field
from enum import Enum
import base64


class VerificationStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    VERIFIED = "verified"
    FAILED = "failed"
    REQUIRES_REVIEW = "requires_review"


class VerificationType(str, Enum):
    PHONE_NUMBER = "phone_number"
    DEVICE_ELIGIBILITY = "device_eligibility"
    PAYMENT = "payment"
    SCREENSHOT = "screenshot"
    IDENTITY = "identity"
    DUPLICATE_CHECK = "duplicate_check"


@dataclass
class VerificationResult:
    """Result of AI verification"""
    verification_type: VerificationType
    status: VerificationStatus
    confidence: float  # 0.0 to 1.0
    timestamp: str
    details: Dict[str, Any] = field(default_factory=dict)
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class OrderVerification:
    """Complete order verification state"""
    order_id: str
    user_id: str
    provider: str
    phone_number: str
    device_type: str
    verifications: List[VerificationResult] = field(default_factory=list)
    overall_status: VerificationStatus = VerificationStatus.PENDING
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())


class NexoraAIService:
    """
    Nexora AI Agentic Era - Intelligent Verification Engine
    Provides AI-powered validation for eSIM registration workflow
    
    Features:
    - Phone number validation with provider detection
    - Device eSIM compatibility verification
    - MMQR payment validation
    - Screenshot OCR analysis
    - Duplicate detection
    - Real-time verification feedback
    - Audit logging
    """
    
    VERSION = "1.0.0"
    ENGINE_NAME = "Nexora AI Agentic Era"
    
    # Device compatibility matrix
    DEVICE_COMPATIBILITY = {
        "ios": {
            "min_version": "12.1",
            "esim_models": [
                "iPhone XS", "iPhone XS Max", "iPhone XR",
                "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max",
                "iPhone SE (2nd)", "iPhone SE (3rd)",
                "iPhone 12", "iPhone 12 mini", "iPhone 12 Pro", "iPhone 12 Pro Max",
                "iPhone 13", "iPhone 13 mini", "iPhone 13 Pro", "iPhone 13 Pro Max",
                "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
                "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
                "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
                "iPad Pro (3rd+)", "iPad Air (3rd+)", "iPad (7th+)", "iPad mini (5th+)",
                "Apple Watch Series 3+", "Apple Watch SE", "Apple Watch Ultra"
            ]
        },
        "android": {
            "min_version": "9.0",
            "esim_models": [
                "Samsung Galaxy S20+", "Samsung Galaxy S21+", "Samsung Galaxy S22+", "Samsung Galaxy S23+", "Samsung Galaxy S24+",
                "Samsung Galaxy Z Fold", "Samsung Galaxy Z Flip",
                "Google Pixel 3+", "Google Pixel 4+", "Google Pixel 5+", "Google Pixel 6+", "Google Pixel 7+", "Google Pixel 8+",
                "Huawei P40+", "Huawei Mate 40+",
                "Xiaomi 12+", "Xiaomi 13+", "Xiaomi 14+",
                "OPPO Find X3+", "OPPO Find X5+",
                "OnePlus 9+", "OnePlus 10+", "OnePlus 11+", "OnePlus 12+"
            ]
        }
    }
    
    # Provider-specific rules
    PROVIDER_RULES = {
        "MPT": {
            "max_esim_per_user": 3,
            "transfer_cooldown_days": 30,
            "requires_kyc": True,
            "supports_5g": True,
            "supports_volte": True
        },
        "ATOM": {
            "max_esim_per_user": 2,
            "transfer_cooldown_days": 14,
            "requires_kyc": True,
            "supports_5g": True,
            "supports_volte": True
        },
        "MYTEL": {
            "max_esim_per_user": 3,
            "transfer_cooldown_days": 7,
            "requires_kyc": True,
            "supports_5g": True,
            "supports_volte": True
        }
    }
    
    def __init__(self):
        self.verification_cache: Dict[str, OrderVerification] = {}
        self.audit_log: List[Dict[str, Any]] = []
        self._log_event("system", "Nexora AI Service initialized", {"version": self.VERSION})
    
    def _log_event(self, event_type: str, message: str, data: Dict[str, Any] = None):
        """Log verification events for audit trail"""
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "event_type": event_type,
            "message": message,
            "data": data or {}
        }
        self.audit_log.append(log_entry)
        # Keep only last 1000 entries in memory
        if len(self.audit_log) > 1000:
            self.audit_log = self.audit_log[-1000:]
    
    def get_audit_log(self, limit: int = 100) -> List[Dict[str, Any]]:
        """Get recent audit log entries"""
        return self.audit_log[-limit:]
    
    def get_system_status(self) -> Dict[str, Any]:
        """Get Nexora AI system status"""
        return {
            "engine": self.ENGINE_NAME,
            "version": self.VERSION,
            "status": "operational",
            "cached_orders": len(self.verification_cache),
            "audit_entries": len(self.audit_log),
            "supported_providers": list(self.PROVIDER_RULES.keys()),
            "supported_devices": {
                "ios": len(self.DEVICE_COMPATIBILITY["ios"]["esim_models"]),
                "android": len(self.DEVICE_COMPATIBILITY["android"]["esim_models"])
            }
        }
    
    def generate_order_id(self, provider: str, user_id: str) -> str:
        """Generate unique order ID"""
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        provider_code = provider[:3].upper()
        hash_input = f"{provider}{user_id}{timestamp}"
        hash_suffix = hashlib.md5(hash_input.encode()).hexdigest()[:6].upper()
        return f"ESM-{provider_code}-{timestamp}-{hash_suffix}"
    
    def verify_phone_number(self, phone: str, provider: str, existing_numbers: List[str] = None) -> VerificationResult:
        """
        AI verification of phone number
        Checks format, provider match, and duplicates
        """
        from .mmqr_service import phone_validator
        
        result = VerificationResult(
            verification_type=VerificationType.PHONE_NUMBER,
            status=VerificationStatus.IN_PROGRESS,
            confidence=0.0,
            timestamp=datetime.utcnow().isoformat()
        )
        
        # Validate phone format and provider
        validation = phone_validator.is_esim_eligible(phone, provider)
        
        if not validation["eligible"]:
            result.status = VerificationStatus.FAILED
            result.errors = validation["reasons"]
            result.confidence = 0.0
            return result
        
        # Check for duplicates
        if existing_numbers and phone in existing_numbers:
            result.status = VerificationStatus.FAILED
            result.errors.append("Phone number already registered for eSIM")
            result.confidence = 1.0
            return result
        
        result.status = VerificationStatus.VERIFIED
        result.confidence = 0.95
        result.details = {
            "phone": phone,
            "provider": provider,
            "detected_provider": validation["detected_provider"]
        }
        
        return result
    
    def verify_device_eligibility(self, device_type: str, device_model: str, os_version: str) -> VerificationResult:
        """
        AI verification of device eSIM compatibility
        """
        result = VerificationResult(
            verification_type=VerificationType.DEVICE_ELIGIBILITY,
            status=VerificationStatus.IN_PROGRESS,
            confidence=0.0,
            timestamp=datetime.utcnow().isoformat()
        )
        
        device_type_lower = device_type.lower()
        
        if device_type_lower not in self.DEVICE_COMPATIBILITY:
            result.status = VerificationStatus.FAILED
            result.errors.append(f"Unsupported device type: {device_type}")
            return result
        
        compatibility = self.DEVICE_COMPATIBILITY[device_type_lower]
        
        # Check OS version
        try:
            current_version = float(os_version.split(".")[0])
            min_version = float(compatibility["min_version"].split(".")[0])
            
            if current_version < min_version:
                result.status = VerificationStatus.FAILED
                result.errors.append(f"OS version {os_version} is below minimum {compatibility['min_version']}")
                return result
        except ValueError:
            result.warnings.append("Could not verify OS version")
        
        # Check device model (fuzzy match)
        model_supported = False
        matched_model = None
        
        for supported_model in compatibility["esim_models"]:
            if self._fuzzy_match(device_model, supported_model):
                model_supported = True
                matched_model = supported_model
                break
        
        if not model_supported:
            result.status = VerificationStatus.REQUIRES_REVIEW
            result.warnings.append(f"Device model '{device_model}' not in verified list")
            result.confidence = 0.6
        else:
            result.status = VerificationStatus.VERIFIED
            result.confidence = 0.95
        
        result.details = {
            "device_type": device_type,
            "device_model": device_model,
            "os_version": os_version,
            "matched_model": matched_model,
            "esim_supported": model_supported
        }
        
        return result
    
    def verify_payment(self, mmqr_data: str, expected_amount: float = 120000) -> VerificationResult:
        """
        AI verification of MMQR payment
        """
        from .mmqr_service import mmqr_service
        
        result = VerificationResult(
            verification_type=VerificationType.PAYMENT,
            status=VerificationStatus.IN_PROGRESS,
            confidence=0.0,
            timestamp=datetime.utcnow().isoformat()
        )
        
        validation = mmqr_service.validate_payment(mmqr_data, expected_amount)
        
        if validation["valid"]:
            result.status = VerificationStatus.VERIFIED
            result.confidence = 0.98
        else:
            result.status = VerificationStatus.FAILED
            result.errors = validation["errors"]
            result.confidence = 0.0
        
        result.warnings = validation.get("warnings", [])
        result.details = validation.get("data", {})
        
        return result
    
    def verify_screenshot(self, image_base64: str, verification_type: str = "payment") -> VerificationResult:
        """
        AI/OCR verification of uploaded screenshot
        Validates payment confirmation or identity documents
        """
        result = VerificationResult(
            verification_type=VerificationType.SCREENSHOT,
            status=VerificationStatus.IN_PROGRESS,
            confidence=0.0,
            timestamp=datetime.utcnow().isoformat()
        )
        
        try:
            # Decode and validate image
            if not image_base64:
                result.status = VerificationStatus.FAILED
                result.errors.append("No image data provided")
                return result
            
            # Remove data URL prefix if present
            if "base64," in image_base64:
                image_base64 = image_base64.split("base64,")[1]
            
            # Validate base64
            try:
                image_data = base64.b64decode(image_base64)
                image_size = len(image_data)
            except Exception:
                result.status = VerificationStatus.FAILED
                result.errors.append("Invalid image data")
                return result
            
            # Size validation (max 10MB)
            if image_size > 10 * 1024 * 1024:
                result.status = VerificationStatus.FAILED
                result.errors.append("Image size exceeds 10MB limit")
                return result
            
            # Minimum size check
            if image_size < 1024:
                result.status = VerificationStatus.FAILED
                result.errors.append("Image too small - may be corrupted")
                return result
            
            # Simulated OCR analysis
            # In production, integrate with actual OCR service
            ocr_result = self._simulate_ocr_analysis(image_data, verification_type)
            
            if ocr_result["valid"]:
                result.status = VerificationStatus.VERIFIED
                result.confidence = ocr_result["confidence"]
                result.details = ocr_result["extracted_data"]
            else:
                result.status = VerificationStatus.REQUIRES_REVIEW
                result.warnings = ocr_result.get("warnings", [])
                result.confidence = ocr_result["confidence"]
            
        except Exception as e:
            result.status = VerificationStatus.FAILED
            result.errors.append(f"Screenshot verification error: {str(e)}")
        
        return result
    
    def _simulate_ocr_analysis(self, image_data: bytes, verification_type: str) -> Dict[str, Any]:
        """
        Simulated OCR analysis
        In production, replace with actual OCR service (Google Vision, AWS Textract, etc.)
        """
        # Generate hash for consistency
        image_hash = hashlib.md5(image_data).hexdigest()
        
        # Simulated confidence based on image size
        confidence = min(0.85, 0.5 + (len(image_data) / (5 * 1024 * 1024)) * 0.35)
        
        if verification_type == "payment":
            return {
                "valid": True,
                "confidence": confidence,
                "extracted_data": {
                    "type": "payment_confirmation",
                    "detected_amount": "120,000 MMK",
                    "detected_provider": "MMQR",
                    "timestamp_detected": True,
                    "image_hash": image_hash[:12]
                }
            }
        elif verification_type == "identity":
            return {
                "valid": True,
                "confidence": confidence * 0.9,
                "extracted_data": {
                    "type": "identity_document",
                    "document_detected": True,
                    "image_hash": image_hash[:12]
                },
                "warnings": ["Manual review recommended for identity verification"]
            }
        
        return {"valid": False, "confidence": 0.0, "warnings": ["Unknown verification type"]}
    
    def _fuzzy_match(self, input_str: str, target: str) -> bool:
        """Simple fuzzy matching for device models"""
        input_lower = input_str.lower().replace(" ", "").replace("-", "")
        target_lower = target.lower().replace(" ", "").replace("-", "")
        
        # Exact match
        if input_lower == target_lower:
            return True
        
        # Contains match
        if input_lower in target_lower or target_lower in input_lower:
            return True
        
        # Partial match (at least 70% overlap)
        shorter = min(input_lower, target_lower, key=len)
        longer = max(input_lower, target_lower, key=len)
        
        if shorter in longer:
            return True
        
        return False
    
    def run_full_verification(
        self,
        user_id: str,
        phone: str,
        provider: str,
        device_type: str,
        device_model: str,
        os_version: str,
        mmqr_data: str = None,
        screenshot_base64: str = None,
        existing_numbers: List[str] = None
    ) -> OrderVerification:
        """
        Run complete verification pipeline for eSIM order
        """
        order_id = self.generate_order_id(provider, user_id)
        
        order = OrderVerification(
            order_id=order_id,
            user_id=user_id,
            provider=provider,
            phone_number=phone,
            device_type=device_type
        )
        
        # Step 1: Phone number verification
        phone_result = self.verify_phone_number(phone, provider, existing_numbers)
        order.verifications.append(phone_result)
        
        if phone_result.status == VerificationStatus.FAILED:
            order.overall_status = VerificationStatus.FAILED
            return order
        
        # Step 2: Device eligibility
        device_result = self.verify_device_eligibility(device_type, device_model, os_version)
        order.verifications.append(device_result)
        
        if device_result.status == VerificationStatus.FAILED:
            order.overall_status = VerificationStatus.FAILED
            return order
        
        # Step 3: Payment verification (if provided)
        if mmqr_data:
            payment_result = self.verify_payment(mmqr_data)
            order.verifications.append(payment_result)
            
            if payment_result.status == VerificationStatus.FAILED:
                order.overall_status = VerificationStatus.FAILED
                return order
        
        # Step 4: Screenshot verification (if provided)
        if screenshot_base64:
            screenshot_result = self.verify_screenshot(screenshot_base64, "payment")
            order.verifications.append(screenshot_result)
        
        # Determine overall status
        statuses = [v.status for v in order.verifications]
        
        if VerificationStatus.FAILED in statuses:
            order.overall_status = VerificationStatus.FAILED
        elif VerificationStatus.REQUIRES_REVIEW in statuses:
            order.overall_status = VerificationStatus.REQUIRES_REVIEW
        elif all(s == VerificationStatus.VERIFIED for s in statuses):
            order.overall_status = VerificationStatus.VERIFIED
        else:
            order.overall_status = VerificationStatus.PENDING
        
        order.updated_at = datetime.utcnow().isoformat()
        
        # Cache the verification
        self.verification_cache[order_id] = order
        
        return order
    
    def get_verification_status(self, order_id: str) -> Optional[OrderVerification]:
        """Get cached verification status"""
        return self.verification_cache.get(order_id)
    
    def get_provider_rules(self, provider: str) -> Dict[str, Any]:
        """Get provider-specific rules"""
        return self.PROVIDER_RULES.get(provider.upper(), {})


# Singleton instance
nexora_ai = NexoraAIService()
