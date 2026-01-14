"""
Plans Router for eSIM Myanmar Platform
"""

from fastapi import APIRouter, HTTPException, Depends, Request, status
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

from .auth import get_current_user, get_admin_user
from utils.serialization import serialize_doc, serialize_list

router = APIRouter(prefix="/api/plans", tags=["Plans"])


# Request Models
class PlanCreate(BaseModel):
    name: str
    data_gb: float
    validity_days: int
    price: float
    currency: str = "MMK"
    features: List[str] = []
    plan_type: str = "prepaid"
    is_popular: bool = False
    discount_percent: Optional[float] = None


class PlanUpdate(BaseModel):
    name: Optional[str] = None
    data_gb: Optional[float] = None
    validity_days: Optional[int] = None
    price: Optional[float] = None
    features: Optional[List[str]] = None
    is_popular: Optional[bool] = None
    discount_percent: Optional[float] = None
    is_active: Optional[bool] = None


# Default plans
DEFAULT_PLANS = [
    {
        "plan_id": "plan_basic_5g",
        "name": "Basic 5G",
        "data_gb": 10.0,
        "validity_days": 30,
        "price": 5000,
        "currency": "MMK",
        "features": ["5G Network", "VoLTE", "Basic Roaming"],
        "plan_type": "prepaid",
        "is_popular": False,
        "is_active": True
    },
    {
        "plan_id": "plan_premium_5g",
        "name": "Premium 5G",
        "data_gb": 50.0,
        "validity_days": 30,
        "price": 20000,
        "currency": "MMK",
        "features": ["5G Network", "VoLTE", "Advanced Roaming", "Entertainment Bundle"],
        "plan_type": "prepaid",
        "is_popular": True,
        "is_active": True
    },
    {
        "plan_id": "plan_enterprise",
        "name": "Enterprise Unlimited",
        "data_gb": 999.0,
        "validity_days": 365,
        "price": 500000,
        "currency": "MMK",
        "features": ["5G Network", "VoLTE", "Global Roaming", "Priority Support", "Dedicated Account Manager"],
        "plan_type": "postpaid",
        "is_popular": False,
        "is_active": True
    },
    {
        "plan_id": "plan_tourist_7d",
        "name": "Tourist 7-Day",
        "data_gb": 5.0,
        "validity_days": 7,
        "price": 3000,
        "currency": "MMK",
        "features": ["4G/5G Network", "VoLTE"],
        "plan_type": "prepaid",
        "is_popular": False,
        "is_active": True
    },
    {
        "plan_id": "plan_data_booster",
        "name": "Data Booster 20GB",
        "data_gb": 20.0,
        "validity_days": 30,
        "price": 8000,
        "currency": "MMK",
        "features": ["5G Network", "VoLTE", "Roaming"],
        "plan_type": "prepaid",
        "is_popular": False,
        "is_active": True
    }
]


async def ensure_default_plans(db):
    """Ensure default plans exist in database"""
    plans_collection = db.plans
    
    existing = await plans_collection.count_documents({})
    if existing == 0:
        for plan in DEFAULT_PLANS:
            plan["created_at"] = datetime.utcnow()
            await plans_collection.insert_one(plan)


@router.get("")
async def get_plans(
    request: Request,
    plan_type: Optional[str] = None,
    is_active: bool = True
):
    """Get all available plans"""
    db = request.app.state.db
    
    # Ensure default plans exist
    await ensure_default_plans(db)
    
    # Build query
    query = {"is_active": is_active}
    if plan_type:
        query["plan_type"] = plan_type
    
    cursor = db.plans.find(query)
    plans = await cursor.to_list(length=100)
    
    return {"plans": serialize_list(plans)}


@router.get("/{plan_id}")
async def get_plan(request: Request, plan_id: str):
    """Get specific plan by ID"""
    db = request.app.state.db
    
    plan = await db.plans.find_one({"plan_id": plan_id})
    
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan not found"
        )
    
    return {"plan": serialize_doc(plan)}


@router.post("")
async def create_plan(
    request: Request,
    data: PlanCreate,
    admin_user: dict = Depends(get_admin_user)
):
    """Create new plan (admin only)"""
    db = request.app.state.db
    
    plan = {
        "plan_id": str(uuid.uuid4()),
        **data.dict(),
        "is_active": True,
        "created_at": datetime.utcnow(),
        "created_by": admin_user["user_id"]
    }
    
    await db.plans.insert_one(plan)
    plan.pop("_id", None)
    
    return {"message": "Plan created", "plan": plan}


@router.put("/{plan_id}")
async def update_plan(
    request: Request,
    plan_id: str,
    data: PlanUpdate,
    admin_user: dict = Depends(get_admin_user)
):
    """Update plan (admin only)"""
    db = request.app.state.db
    
    # Get existing plan
    existing = await db.plans.find_one({"plan_id": plan_id})
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan not found"
        )
    
    # Build update
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    update_data["updated_by"] = admin_user["user_id"]
    
    await db.plans.update_one(
        {"plan_id": plan_id},
        {"$set": update_data}
    )
    
    # Get updated plan
    plan = await db.plans.find_one({"plan_id": plan_id})
    plan.pop("_id", None)
    
    return {"message": "Plan updated", "plan": plan}


@router.delete("/{plan_id}")
async def delete_plan(
    request: Request,
    plan_id: str,
    admin_user: dict = Depends(get_admin_user)
):
    """Soft delete plan (admin only)"""
    db = request.app.state.db
    
    result = await db.plans.update_one(
        {"plan_id": plan_id},
        {
            "$set": {
                "is_active": False,
                "deleted_at": datetime.utcnow(),
                "deleted_by": admin_user["user_id"]
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan not found"
        )
    
    return {"message": "Plan deleted"}


@router.get("/compare/{plan_ids}")
async def compare_plans(request: Request, plan_ids: str):
    """Compare multiple plans"""
    db = request.app.state.db
    
    ids = plan_ids.split(",")
    if len(ids) < 2 or len(ids) > 4:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Provide 2-4 plan IDs separated by commas"
        )
    
    cursor = db.plans.find({"plan_id": {"$in": ids}})
    plans = await cursor.to_list(length=4)
    
    for plan in plans:
        plan.pop("_id", None)
    
    return {"plans": plans, "comparison_count": len(plans)}
