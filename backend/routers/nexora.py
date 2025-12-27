"""NexoraAI Router
API endpoints for comprehensive platform audit and orchestration
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio

from ..services.nexora_orchestrator import nexora_orchestrator
from ..services.firebase_audit_service import firebase_audit_service

router = APIRouter(prefix="/api/nexora", tags=["NexoraAI"])


class AuditRequest(BaseModel):
    platforms: Optional[List[str]] = None
    audit_type: str = "comprehensive"  # comprehensive, security, performance, compliance


class AuditStatusResponse(BaseModel):
    audit_id: str
    platform: str
    status: str
    completion_percentage: int
    total_findings: int
    summary: Dict[str, int]
    health_score: int


@router.get("/")
async def nexora_info():
    """Get NexoraAI service information"""
    return {
        "agent": nexora_orchestrator.AGENT_NAME,
        "version": nexora_orchestrator.VERSION,
        "description": "Principal Systems Architect for eSIM Myanmar Ecosystem",
        "capabilities": [
            "Infrastructure Audit",
            "Security Assessment (OWASP Top 10)",
            "Performance Optimization (Core Web Vitals)",
            "UX/UI Validation (WCAG 2.2 AA)",
            "SEO Audit",
            "Compliance Verification (GSMA eSIM)",
            "Firebase/GCP Audit",
            "Automated Remediation"
        ],
        "platforms": nexora_orchestrator.platforms,
        "status": "operational"
    }


@router.post("/audit/start")
async def start_audit(request: AuditRequest, background_tasks: BackgroundTasks):
    """Start comprehensive platform audit"""
    try:
        result = await nexora_orchestrator.start_comprehensive_audit(
            platforms=request.platforms
        )
        
        return {
            "status": "success",
            "message": "Audit initiated successfully",
            "audit_ids": result["audit_ids"],
            "platforms": result["platforms"],
            "timestamp": result["timestamp"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/audit/status/{audit_id}")
async def get_audit_status(audit_id: str):
    """Get current audit status"""
    status = nexora_orchestrator.get_audit_status(audit_id)
    
    if not status:
        raise HTTPException(status_code=404, detail="Audit not found")
    
    return status


@router.get("/audit/report/{audit_id}")
async def get_audit_report(audit_id: str):
    """Get complete audit report"""
    report = nexora_orchestrator.get_full_report(audit_id)
    
    if not report:
        raise HTTPException(status_code=404, detail="Audit report not found")
    
    return report


@router.get("/audit/export/{audit_id}")
async def export_audit_report(audit_id: str, format: str = "json"):
    """Export audit report in specified format"""
    report = nexora_orchestrator.export_report(audit_id, format)
    
    if not report:
        raise HTTPException(status_code=404, detail="Audit report not found")
    
    return {"format": format, "report": report}


@router.get("/firebase/audit")
async def firebase_audit():
    """Get Firebase/GCP comprehensive audit"""
    try:
        report = firebase_audit_service.generate_comprehensive_report()
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/firebase/hosting")
async def firebase_hosting_audit():
    """Audit Firebase Hosting configuration"""
    return firebase_audit_service.audit_hosting_config()


@router.get("/firebase/firestore-rules")
async def firestore_rules_audit():
    """Audit Firestore security rules"""
    return firebase_audit_service.audit_firestore_rules()


@router.get("/firebase/storage-rules")
async def storage_rules_audit():
    """Audit Cloud Storage security rules"""
    return firebase_audit_service.audit_storage_rules()


@router.get("/firebase/functions")
async def cloud_functions_audit():
    """Audit Cloud Functions configuration"""
    return firebase_audit_service.audit_cloud_functions()


@router.get("/firebase/iam")
async def iam_audit():
    """Audit IAM roles and permissions"""
    return firebase_audit_service.audit_iam_security()


@router.get("/health")
async def nexora_health():
    """NexoraAI health check"""
    return {
        "status": "healthy",
        "agent": nexora_orchestrator.AGENT_NAME,
        "version": nexora_orchestrator.VERSION,
        "active_audits": len(nexora_orchestrator.active_audits),
        "cached_reports": len(nexora_orchestrator.audit_reports)
    }
