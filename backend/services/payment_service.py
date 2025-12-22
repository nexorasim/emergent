"""
Payment Service for eSIM Myanmar Platform
Handles payment processing with multiple gateways
"""

from datetime import datetime
from typing import Optional, Dict, Any
import uuid
import logging
import hashlib
import hmac

from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)


class PaymentGateway:
    """Base payment gateway interface"""
    
    async def create_payment(self, amount: float, currency: str, order_id: str, **kwargs) -> Dict[str, Any]:
        raise NotImplementedError
    
    async def verify_payment(self, transaction_id: str, **kwargs) -> Dict[str, Any]:
        raise NotImplementedError
    
    async def refund_payment(self, transaction_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        raise NotImplementedError


class KBZPayGateway(PaymentGateway):
    """KBZ Pay integration"""
    
    def __init__(self, merchant_id: str, api_key: str, sandbox: bool = True):
        self.merchant_id = merchant_id
        self.api_key = api_key
        self.base_url = "https://sandbox.kbzpay.com" if sandbox else "https://api.kbzpay.com"
    
    async def create_payment(self, amount: float, currency: str, order_id: str, **kwargs) -> Dict[str, Any]:
        # KBZ Pay integration placeholder
        # In production, this would make actual API calls
        return {
            "gateway": "kbz_pay",
            "gateway_transaction_id": f"KBZ{uuid.uuid4().hex[:12].upper()}",
            "payment_url": f"{self.base_url}/pay/{order_id}",
            "qr_code": None,
            "status": "pending"
        }
    
    async def verify_payment(self, transaction_id: str, **kwargs) -> Dict[str, Any]:
        return {"status": "completed", "verified": True}
    
    async def refund_payment(self, transaction_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        return {"status": "refunded", "refund_id": f"REF{uuid.uuid4().hex[:8].upper()}"}


class WaveMoneyGateway(PaymentGateway):
    """Wave Money integration"""
    
    def __init__(self, merchant_id: str, api_key: str, sandbox: bool = True):
        self.merchant_id = merchant_id
        self.api_key = api_key
        self.base_url = "https://sandbox.wavemoney.io" if sandbox else "https://api.wavemoney.io"
    
    async def create_payment(self, amount: float, currency: str, order_id: str, **kwargs) -> Dict[str, Any]:
        return {
            "gateway": "wave_money",
            "gateway_transaction_id": f"WV{uuid.uuid4().hex[:12].upper()}",
            "payment_url": f"{self.base_url}/checkout/{order_id}",
            "qr_code": None,
            "status": "pending"
        }
    
    async def verify_payment(self, transaction_id: str, **kwargs) -> Dict[str, Any]:
        return {"status": "completed", "verified": True}
    
    async def refund_payment(self, transaction_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        return {"status": "refunded", "refund_id": f"REF{uuid.uuid4().hex[:8].upper()}"}


class AYAPayGateway(PaymentGateway):
    """AYA Pay integration"""
    
    def __init__(self, merchant_id: str, api_key: str, sandbox: bool = True):
        self.merchant_id = merchant_id
        self.api_key = api_key
        self.base_url = "https://sandbox.ayapay.com" if sandbox else "https://api.ayapay.com"
    
    async def create_payment(self, amount: float, currency: str, order_id: str, **kwargs) -> Dict[str, Any]:
        return {
            "gateway": "aya_pay",
            "gateway_transaction_id": f"AYA{uuid.uuid4().hex[:12].upper()}",
            "payment_url": f"{self.base_url}/pay/{order_id}",
            "qr_code": None,
            "status": "pending"
        }
    
    async def verify_payment(self, transaction_id: str, **kwargs) -> Dict[str, Any]:
        return {"status": "completed", "verified": True}
    
    async def refund_payment(self, transaction_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        return {"status": "refunded", "refund_id": f"REF{uuid.uuid4().hex[:8].upper()}"}


class PaymentService:
    """Payment processing service"""
    
    def __init__(self, db: AsyncIOMotorDatabase, gateways: Dict[str, PaymentGateway] = None):
        self.db = db
        self.transactions = db.transactions
        self.plans = db.plans
        self.gateways = gateways or {}
    
    def add_gateway(self, name: str, gateway: PaymentGateway):
        """Add payment gateway"""
        self.gateways[name] = gateway
    
    async def get_plan(self, plan_id: str) -> Optional[dict]:
        """Get plan by ID"""
        plan = await self.plans.find_one({"plan_id": plan_id})
        if plan:
            plan.pop("_id", None)
        return plan
    
    async def create_payment(
        self,
        user_id: str,
        plan_id: str,
        payment_method: str,
        currency: str = "MMK",
        promo_code: Optional[str] = None,
        profile_id: Optional[str] = None
    ) -> dict:
        """Create payment transaction"""
        
        # Get plan details
        plan = await self.get_plan(plan_id)
        if not plan:
            raise ValueError("Plan not found")
        
        # Calculate amounts
        amount = plan["price"]
        discount_amount = 0.0
        
        # Apply promo code if provided
        if promo_code:
            discount = await self._validate_promo_code(promo_code, plan_id)
            if discount:
                discount_amount = amount * (discount / 100)
        
        final_amount = amount - discount_amount
        
        # Create transaction record
        transaction_id = str(uuid.uuid4())
        transaction = {
            "transaction_id": transaction_id,
            "user_id": user_id,
            "plan_id": plan_id,
            "profile_id": profile_id,
            "amount": amount,
            "currency": currency,
            "discount_amount": discount_amount,
            "final_amount": final_amount,
            "promo_code": promo_code,
            "payment_method": payment_method,
            "status": "pending",
            "gateway_transaction_id": None,
            "gateway_response": None,
            "created_at": datetime.utcnow(),
            "completed_at": None
        }
        
        # Process with payment gateway
        gateway = self.gateways.get(payment_method)
        if gateway:
            gateway_response = await gateway.create_payment(
                amount=final_amount,
                currency=currency,
                order_id=transaction_id
            )
            transaction["gateway_transaction_id"] = gateway_response.get("gateway_transaction_id")
            transaction["payment_url"] = gateway_response.get("payment_url")
            transaction["qr_code"] = gateway_response.get("qr_code")
        
        await self.transactions.insert_one(transaction)
        
        logger.info(f"Created payment transaction: {transaction_id} for user: {user_id}")
        
        # Remove MongoDB _id
        transaction.pop("_id", None)
        return transaction
    
    async def _validate_promo_code(self, code: str, plan_id: str) -> Optional[float]:
        """Validate promo code and return discount percentage"""
        promo = await self.db.promo_codes.find_one({
            "code": code.upper(),
            "is_active": True,
            "valid_until": {"$gte": datetime.utcnow()}
        })
        
        if promo:
            # Check if applicable to plan
            if promo.get("applicable_plans") and plan_id not in promo["applicable_plans"]:
                return None
            return promo.get("discount_percent", 0)
        
        return None
    
    async def get_transaction(self, transaction_id: str, user_id: Optional[str] = None) -> Optional[dict]:
        """Get transaction by ID"""
        query = {"transaction_id": transaction_id}
        if user_id:
            query["user_id"] = user_id
        
        transaction = await self.transactions.find_one(query)
        if transaction:
            transaction.pop("_id", None)
        return transaction
    
    async def process_callback(
        self,
        transaction_id: str,
        gateway_transaction_id: str,
        status: str,
        gateway_response: dict
    ) -> dict:
        """Process payment gateway callback"""
        
        transaction = await self.get_transaction(transaction_id)
        if not transaction:
            raise ValueError("Transaction not found")
        
        # Update transaction
        update_data = {
            "status": status,
            "gateway_transaction_id": gateway_transaction_id,
            "gateway_response": gateway_response,
            "updated_at": datetime.utcnow()
        }
        
        if status == "completed":
            update_data["completed_at"] = datetime.utcnow()
            
            # Activate or top-up eSIM profile
            await self._fulfill_order(transaction)
        
        await self.transactions.update_one(
            {"transaction_id": transaction_id},
            {"$set": update_data}
        )
        
        logger.info(f"Payment callback processed: {transaction_id} - {status}")
        
        return await self.get_transaction(transaction_id)
    
    async def _fulfill_order(self, transaction: dict):
        """Fulfill order after successful payment"""
        user_id = transaction["user_id"]
        plan_id = transaction["plan_id"]
        profile_id = transaction.get("profile_id")
        
        plan = await self.get_plan(plan_id)
        if not plan:
            return
        
        if profile_id:
            # Top-up existing profile
            await self.db.esim_profiles.update_one(
                {"profile_id": profile_id},
                {
                    "$inc": {"data_limit_gb": plan["data_gb"]},
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
        else:
            # Create new profile (handled by eSIM service)
            pass
        
        logger.info(f"Order fulfilled: {transaction['transaction_id']}")
    
    async def get_user_transactions(self, user_id: str, limit: int = 50) -> list:
        """Get user's transaction history"""
        cursor = self.transactions.find(
            {"user_id": user_id}
        ).sort("created_at", -1).limit(limit)
        
        transactions = await cursor.to_list(length=limit)
        
        for t in transactions:
            t.pop("_id", None)
        
        return transactions
    
    async def request_refund(
        self,
        transaction_id: str,
        user_id: str,
        reason: str,
        amount: Optional[float] = None
    ) -> dict:
        """Request refund for transaction"""
        
        transaction = await self.get_transaction(transaction_id, user_id)
        if not transaction:
            raise ValueError("Transaction not found")
        
        if transaction["status"] != "completed":
            raise ValueError("Only completed transactions can be refunded")
        
        # Create refund request
        refund_id = str(uuid.uuid4())
        refund_amount = amount or transaction["final_amount"]
        
        refund_record = {
            "refund_id": refund_id,
            "transaction_id": transaction_id,
            "user_id": user_id,
            "amount": refund_amount,
            "reason": reason,
            "status": "pending",
            "created_at": datetime.utcnow()
        }
        
        await self.db.refunds.insert_one(refund_record)
        
        # Process with gateway
        gateway = self.gateways.get(transaction["payment_method"])
        if gateway:
            refund_response = await gateway.refund_payment(
                transaction["gateway_transaction_id"],
                refund_amount
            )
            
            await self.db.refunds.update_one(
                {"refund_id": refund_id},
                {"$set": {"gateway_response": refund_response, "status": refund_response.get("status", "pending")}}
            )
        
        logger.info(f"Refund requested: {refund_id} for transaction: {transaction_id}")
        
        return {"refund_id": refund_id, "status": "pending", "amount": refund_amount}
