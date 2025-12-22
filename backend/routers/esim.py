"""
eSIM Router for eSIM Myanmar Platform
"""

from fastapi import APIRouter, HTTPException, Depends, Request, status
from pydantic import BaseModel
from typing import Optional, List
from .auth import get_current_user

router = APIRouter(prefix="/api/esim", tags=["eSIM Management"])


# Request Models
class CreateProfileRequest(BaseModel):
    plan_id: Optional[str] = None
    device_type: Optional[str] = None


class ActivateProfileRequest(BaseModel):
    device_type: str
    device_model: Optional[str] = None
    device_imei: Optional[str] = None


class TransferProfileRequest(BaseModel):
    target_device_type: str
    target_device_model: Optional[str] = None
    target_device_imei: Optional[str] = None
    transfer_reason: Optional[str] = None


@router.post("/profiles")
async def create_profile(
    request: Request,
    data: CreateProfileRequest,
    current_user: dict = Depends(get_current_user)
):
    """Create new eSIM profile"""
    esim_service = request.app.state.esim_service
    
    profile = await esim_service.create_profile(
        user_id=current_user["user_id"],
        plan_id=data.plan_id,
        device_type=data.device_type
    )
    
    return {"message": "eSIM profile created", "profile": profile}


@router.get("/profiles")
async def get_profiles(
    request: Request,
    current_user: dict = Depends(get_current_user)
):
    """Get all user's eSIM profiles"""
    esim_service = request.app.state.esim_service
    
    profiles = await esim_service.get_user_profiles(current_user["user_id"])
    
    return {"profiles": profiles}


@router.get("/profiles/{profile_id}")
async def get_profile(
    request: Request,
    profile_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get specific eSIM profile"""
    esim_service = request.app.state.esim_service
    
    profile = await esim_service.get_profile(profile_id, current_user["user_id"])
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    return {"profile": profile}


@router.post("/profiles/{profile_id}/activate")
async def activate_profile(
    request: Request,
    profile_id: str,
    data: ActivateProfileRequest,
    current_user: dict = Depends(get_current_user)
):
    """Activate eSIM profile"""
    esim_service = request.app.state.esim_service
    
    try:
        profile = await esim_service.activate_profile(
            profile_id=profile_id,
            user_id=current_user["user_id"],
            device_type=data.device_type,
            device_model=data.device_model,
            device_imei=data.device_imei
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"message": "eSIM activated successfully", "profile": profile}


@router.post("/profiles/{profile_id}/transfer")
async def transfer_profile(
    request: Request,
    profile_id: str,
    data: TransferProfileRequest,
    current_user: dict = Depends(get_current_user)
):
    """Transfer eSIM to new device"""
    esim_service = request.app.state.esim_service
    
    try:
        result = await esim_service.transfer_profile(
            profile_id=profile_id,
            user_id=current_user["user_id"],
            target_device_type=data.target_device_type,
            target_device_model=data.target_device_model,
            target_device_imei=data.target_device_imei,
            transfer_reason=data.transfer_reason
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return result


@router.get("/profiles/{profile_id}/usage")
async def get_profile_usage(
    request: Request,
    profile_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get eSIM usage statistics"""
    esim_service = request.app.state.esim_service
    
    try:
        usage = await esim_service.get_usage(profile_id, current_user["user_id"])
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    return {"usage": usage}


@router.post("/profiles/{profile_id}/qr/regenerate")
async def regenerate_qr(
    request: Request,
    profile_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Regenerate QR code for profile"""
    esim_service = request.app.state.esim_service
    
    try:
        result = await esim_service.regenerate_qr(profile_id, current_user["user_id"])
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    return result


# Legacy endpoint for backward compatibility
@router.post("/activate/{profile_id}")
async def activate_profile_legacy(
    request: Request,
    profile_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Activate eSIM profile (legacy endpoint)"""
    esim_service = request.app.state.esim_service
    
    try:
        profile = await esim_service.activate_profile(
            profile_id=profile_id,
            user_id=current_user["user_id"],
            device_type="unknown"
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"message": "eSIM activated", "profile": profile}


@router.post("/transfer")
async def transfer_esim_legacy(
    request: Request,
    data: dict,
    current_user: dict = Depends(get_current_user)
):
    """Transfer eSIM (legacy endpoint)"""
    esim_service = request.app.state.esim_service
    
    profile_id = data.get("profile_id")
    if not profile_id:
        raise HTTPException(status_code=400, detail="profile_id required")
    
    try:
        result = await esim_service.transfer_profile(
            profile_id=profile_id,
            user_id=current_user["user_id"],
            target_device_type=data.get("target_device_type", "unknown")
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return result
