"""
Supabase Service for eSIM Myanmar Platform
Provides integration with Supabase PostgreSQL database
ESIM MYANMAR COMPANY LIMITED 2025-2026
"""

import os
import logging
from typing import Optional, Dict, Any, List
from datetime import datetime
import httpx

logger = logging.getLogger(__name__)


class SupabaseService:
    """Service for Supabase database operations"""
    
    def __init__(
        self,
        url: Optional[str] = None,
        anon_key: Optional[str] = None,
        service_role_key: Optional[str] = None
    ):
        self.url = url or os.getenv("SUPABASE_URL", "https://ksctoosqlpemoptcaxdr.supabase.co")
        self.anon_key = anon_key or os.getenv("SUPABASE_ANON_KEY")
        self.service_role_key = service_role_key or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        self.rest_url = f"{self.url}/rest/v1"
        
        if not self.anon_key:
            logger.warning("SUPABASE_ANON_KEY not set")
    
    def _get_headers(self, use_service_role: bool = False) -> Dict[str, str]:
        """Get headers for Supabase API requests"""
        key = self.service_role_key if use_service_role else self.anon_key
        return {
            "apikey": key or "",
            "Authorization": f"Bearer {key or ''}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
    
    async def _request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict] = None,
        params: Optional[Dict] = None,
        use_service_role: bool = False
    ) -> Optional[Any]:
        """Make HTTP request to Supabase REST API"""
        url = f"{self.rest_url}/{endpoint}"
        headers = self._get_headers(use_service_role)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.request(
                    method=method,
                    url=url,
                    headers=headers,
                    json=data,
                    params=params,
                    timeout=30.0
                )
                
                if response.status_code >= 400:
                    logger.error(f"Supabase error: {response.status_code} - {response.text}")
                    return None
                
                if response.text:
                    return response.json()
                return None
                
        except Exception as e:
            logger.error(f"Supabase request failed: {e}")
            return None
    
    # User operations
    async def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict]:
        """Create user in Supabase"""
        return await self._request("POST", "users", data=user_data, use_service_role=True)
    
    async def get_user_by_email(self, email: str) -> Optional[Dict]:
        """Get user by email"""
        result = await self._request(
            "GET", "users",
            params={"email": f"eq.{email}", "limit": "1"},
            use_service_role=True
        )
        return result[0] if result else None
    
    async def update_user(self, user_id: str, data: Dict[str, Any]) -> Optional[Dict]:
        """Update user data"""
        return await self._request(
            "PATCH", "users",
            data=data,
            params={"id": f"eq.{user_id}"},
            use_service_role=True
        )
    
    # eSIM Profile operations
    async def create_esim_profile(self, profile_data: Dict[str, Any]) -> Optional[Dict]:
        """Create eSIM profile"""
        return await self._request("POST", "esim_profiles", data=profile_data, use_service_role=True)
    
    async def get_user_profiles(self, user_id: str) -> List[Dict]:
        """Get all eSIM profiles for a user"""
        result = await self._request(
            "GET", "esim_profiles",
            params={"user_id": f"eq.{user_id}", "order": "created_at.desc"},
            use_service_role=True
        )
        return result or []
    
    async def update_profile_status(self, profile_id: str, status: str) -> Optional[Dict]:
        """Update eSIM profile status"""
        return await self._request(
            "PATCH", "esim_profiles",
            data={"status": status, "updated_at": datetime.utcnow().isoformat()},
            params={"id": f"eq.{profile_id}"},
            use_service_role=True
        )
    
    # Transaction operations
    async def create_transaction(self, transaction_data: Dict[str, Any]) -> Optional[Dict]:
        """Create transaction record"""
        return await self._request("POST", "transactions", data=transaction_data, use_service_role=True)
    
    async def get_user_transactions(self, user_id: str, limit: int = 50) -> List[Dict]:
        """Get user transactions"""
        result = await self._request(
            "GET", "transactions",
            params={
                "user_id": f"eq.{user_id}",
                "order": "created_at.desc",
                "limit": str(limit)
            },
            use_service_role=True
        )
        return result or []
    
    async def update_transaction_status(self, transaction_id: str, status: str, gateway_response: Optional[Dict] = None) -> Optional[Dict]:
        """Update transaction status"""
        data = {"status": status, "updated_at": datetime.utcnow().isoformat()}
        if gateway_response:
            data["gateway_response"] = gateway_response
        
        return await self._request(
            "PATCH", "transactions",
            data=data,
            params={"id": f"eq.{transaction_id}"},
            use_service_role=True
        )
    
    # Plans operations
    async def get_active_plans(self) -> List[Dict]:
        """Get all active plans"""
        result = await self._request(
            "GET", "plans",
            params={"is_active": "eq.true", "order": "sort_order.asc"}
        )
        return result or []
    
    async def get_plan_by_id(self, plan_id: str) -> Optional[Dict]:
        """Get plan by ID"""
        result = await self._request(
            "GET", "plans",
            params={"id": f"eq.{plan_id}", "limit": "1"}
        )
        return result[0] if result else None
    
    # Support ticket operations
    async def create_support_ticket(self, ticket_data: Dict[str, Any]) -> Optional[Dict]:
        """Create support ticket"""
        return await self._request("POST", "support_tickets", data=ticket_data, use_service_role=True)
    
    async def get_user_tickets(self, user_id: str) -> List[Dict]:
        """Get user support tickets"""
        result = await self._request(
            "GET", "support_tickets",
            params={"user_id": f"eq.{user_id}", "order": "created_at.desc"},
            use_service_role=True
        )
        return result or []
    
    async def add_ticket_message(self, message_data: Dict[str, Any]) -> Optional[Dict]:
        """Add message to support ticket"""
        return await self._request("POST", "ticket_messages", data=message_data, use_service_role=True)
    
    # Promo code operations
    async def validate_promo_code(self, code: str) -> Optional[Dict]:
        """Validate promo code"""
        result = await self._request(
            "GET", "promo_codes",
            params={
                "code": f"eq.{code}",
                "is_active": "eq.true",
                "limit": "1"
            }
        )
        
        if not result:
            return None
        
        promo = result[0]
        now = datetime.utcnow()
        
        # Check validity period
        if promo.get("valid_from") and datetime.fromisoformat(promo["valid_from"].replace("Z", "")) > now:
            return None
        if promo.get("valid_until") and datetime.fromisoformat(promo["valid_until"].replace("Z", "")) < now:
            return None
        
        # Check usage limit
        if promo.get("usage_limit") and promo.get("used_count", 0) >= promo["usage_limit"]:
            return None
        
        return promo
    
    async def increment_promo_usage(self, promo_id: str) -> Optional[Dict]:
        """Increment promo code usage count"""
        # Get current count
        result = await self._request(
            "GET", "promo_codes",
            params={"id": f"eq.{promo_id}", "limit": "1"},
            use_service_role=True
        )
        
        if not result:
            return None
        
        current_count = result[0].get("used_count", 0)
        
        return await self._request(
            "PATCH", "promo_codes",
            data={"used_count": current_count + 1},
            params={"id": f"eq.{promo_id}"},
            use_service_role=True
        )
    
    # Audit logging
    async def log_audit(
        self,
        user_id: Optional[str],
        action: str,
        resource_type: str,
        resource_id: Optional[str] = None,
        old_values: Optional[Dict] = None,
        new_values: Optional[Dict] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> Optional[Dict]:
        """Create audit log entry"""
        return await self._request(
            "POST", "audit_logs",
            data={
                "user_id": user_id,
                "action": action,
                "resource_type": resource_type,
                "resource_id": resource_id,
                "old_values": old_values,
                "new_values": new_values,
                "ip_address": ip_address,
                "user_agent": user_agent
            },
            use_service_role=True
        )
    
    # eSIM Transfer operations
    async def create_transfer(self, transfer_data: Dict[str, Any]) -> Optional[Dict]:
        """Create eSIM transfer record"""
        return await self._request("POST", "esim_transfers", data=transfer_data, use_service_role=True)
    
    async def update_transfer_status(self, transfer_id: str, status: str) -> Optional[Dict]:
        """Update transfer status"""
        data = {"status": status}
        if status == "completed":
            data["completed_at"] = datetime.utcnow().isoformat()
        
        return await self._request(
            "PATCH", "esim_transfers",
            data=data,
            params={"id": f"eq.{transfer_id}"},
            use_service_role=True
        )
    
    # Dashboard stats
    async def get_dashboard_stats(self) -> Optional[Dict]:
        """Get dashboard statistics"""
        result = await self._request("GET", "dashboard_stats", use_service_role=True)
        return result[0] if result else None


# Singleton instance
_supabase_service: Optional[SupabaseService] = None


def get_supabase_service() -> SupabaseService:
    """Get or create Supabase service instance"""
    global _supabase_service
    if _supabase_service is None:
        _supabase_service = SupabaseService()
    return _supabase_service
