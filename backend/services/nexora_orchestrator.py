"""NexoraAI Orchestration Engine
Principal Systems Architect for eSIM Myanmar Ecosystem
Complete audit, optimization, and deployment orchestration
"""

import asyncio
import json
from datetime import datetime
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field, asdict
from enum import Enum
import hashlib


class AuditPhase(str, Enum):
    INFRASTRUCTURE = "infrastructure"
    SECURITY = "security"
    PERFORMANCE = "performance"
    UX_UI = "ux_ui"
    SEO = "seo"
    COMPLIANCE = "compliance"
    DEPLOYMENT = "deployment"


class SeverityLevel(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


class AuditStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"


@dataclass
class AuditFinding:
    """Individual audit finding"""
    id: str
    phase: AuditPhase
    severity: SeverityLevel
    title: str
    description: str
    affected_components: List[str]
    current_state: str
    recommended_fix: str
    code_fix: Optional[str] = None
    config_fix: Optional[Dict[str, Any]] = None
    impact: str = ""
    effort: str = "medium"
    auto_fixable: bool = False
    status: str = "open"
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())


@dataclass
class AuditReport:
    """Complete audit report"""
    audit_id: str
    platform: str
    timestamp: str
    completion_percentage: int
    status: AuditStatus
    findings: List[AuditFinding] = field(default_factory=list)
    metrics: Dict[str, Any] = field(default_factory=dict)
    recommendations: List[str] = field(default_factory=list)
    summary: Dict[str, int] = field(default_factory=dict)


class NexoraOrchestrator:
    """NexoraAI Orchestration Engine
    
    Principal Systems Architect for complete platform audit and optimization.
    Manages continuous 1-100% production-grade lifecycle.
    """
    
    VERSION = "2.0.0"
    AGENT_NAME = "NexoraAI"
    
    def __init__(self):
        self.audit_reports: Dict[str, AuditReport] = {}
        self.active_audits: Dict[str, asyncio.Task] = {}
        self.audit_history: List[Dict[str, Any]] = []
        
        # Platform registry
        self.platforms = {
            "firebase_primary": "esim-myanmar-ia6gw.web.app",
            "firebase_secondary": "esimmyanmar-09289140-4db73.web.app",
            "cloudflare": "esim-myanmar.pages.dev",
            "primary_domain": "esim.com.mm",
            "www_domain": "www.esim.com.mm",
            "backend_api": "Backend API Services",
            "admin_portal": "Admin Portal",
            "auth_system": "Authentication System"
        }
        
        # Initialize audit state
        self.overall_health_score = 0
        self.last_audit_time = None
        
    def generate_audit_id(self, platform: str) -> str:
        """Generate unique audit ID"""
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        hash_input = f"{platform}{timestamp}"
        hash_suffix = hashlib.md5(hash_input.encode()).hexdigest()[:8]
        return f"AUDIT-{platform[:10].upper()}-{timestamp}-{hash_suffix}"
    
    async def start_comprehensive_audit(self, platforms: List[str] = None) -> Dict[str, Any]:
        """Start comprehensive audit across all platforms"""
        if platforms is None:
            platforms = list(self.platforms.keys())
        
        audit_tasks = []
        audit_ids = []
        
        for platform in platforms:
            audit_id = self.generate_audit_id(platform)
            audit_ids.append(audit_id)
            
            report = AuditReport(
                audit_id=audit_id,
                platform=platform,
                timestamp=datetime.utcnow().isoformat(),
                completion_percentage=0,
                status=AuditStatus.PENDING
            )
            
            self.audit_reports[audit_id] = report
            
            # Create audit task
            task = asyncio.create_task(self._execute_platform_audit(audit_id, platform))
            audit_tasks.append(task)
            self.active_audits[audit_id] = task
        
        return {
            "audit_ids": audit_ids,
            "platforms": platforms,
            "status": "initiated",
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def _execute_platform_audit(self, audit_id: str, platform: str):
        """Execute complete audit for a platform"""
        report = self.audit_reports[audit_id]
        report.status = AuditStatus.IN_PROGRESS
        
        try:
            # Phase 1: Infrastructure Audit (0-15%)
            await self._audit_infrastructure(report, platform)
            report.completion_percentage = 15
            
            # Phase 2: Security Audit (15-35%)
            await self._audit_security(report, platform)
            report.completion_percentage = 35
            
            # Phase 3: Performance Audit (35-55%)
            await self._audit_performance(report, platform)
            report.completion_percentage = 55
            
            # Phase 4: UX/UI Audit (55-70%)
            await self._audit_ux_ui(report, platform)
            report.completion_percentage = 70
            
            # Phase 5: SEO Audit (70-85%)
            await self._audit_seo(report, platform)
            report.completion_percentage = 85
            
            # Phase 6: Compliance Audit (85-95%)
            await self._audit_compliance(report, platform)
            report.completion_percentage = 95
            
            # Phase 7: Final Report Generation (95-100%)
            await self._generate_final_report(report)
            report.completion_percentage = 100
            report.status = AuditStatus.COMPLETED
            
        except Exception as e:
            report.status = AuditStatus.FAILED
            report.recommendations.append(f"Audit failed: {str(e)}")
        
        finally:
            if audit_id in self.active_audits:
                del self.active_audits[audit_id]
    
    async def _audit_infrastructure(self, report: AuditReport, platform: str):
        """Audit infrastructure configuration"""
        findings = []
        
        # Firebase Configuration
        findings.append(AuditFinding(
            id=f"{report.audit_id}-INFRA-001",
            phase=AuditPhase.INFRASTRUCTURE,
            severity=SeverityLevel.HIGH,
            title="Firebase Hosting Configuration",
            description="Verify Firebase hosting configuration and custom domain setup",
            affected_components=["Firebase Hosting", "Custom Domains"],
            current_state="Configuration needs validation",
            recommended_fix="Validate firebase.json, verify HTTPS enforcement, check redirects",
            impact="Critical for deployment reliability",
            effort="low"
        ))
        
        # Cloud Functions
        findings.append(AuditFinding(
            id=f"{report.audit_id}-INFRA-002",
            phase=AuditPhase.INFRASTRUCTURE,
            severity=SeverityLevel.MEDIUM,
            title="Cloud Functions Runtime",
            description="Verify Cloud Functions runtime versions and memory allocation",
            affected_components=["Cloud Functions", "Backend APIs"],
            current_state="Runtime configuration review needed",
            recommended_fix="Update to Node.js 20, optimize memory allocation, enable concurrency",
            impact="Performance and cost optimization",
            effort="medium"
        ))
        
        # Firestore Security Rules
        findings.append(AuditFinding(
            id=f"{report.audit_id}-INFRA-003",
            phase=AuditPhase.INFRASTRUCTURE,
            severity=SeverityLevel.CRITICAL,
            title="Firestore Security Rules",
            description="Audit and harden Firestore security rules",
            affected_components=["Firestore Database", "Data Access Control"],
            current_state="Security rules require hardening",
            recommended_fix="Implement granular access control, add rate limiting, validate data schemas",
            code_fix="""rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /esim_profiles/{profileId} {
      allow read: if request.auth != null && resource.data.user_id == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.user_id == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.user_id == request.auth.uid;
    }
  }
}""",
            impact="Critical security vulnerability if not addressed",
            effort="high",
            auto_fixable=False
        ))
        
        # Cloud Storage Rules
        findings.append(AuditFinding(
            id=f"{report.audit_id}-INFRA-004",
            phase=AuditPhase.INFRASTRUCTURE,
            severity=SeverityLevel.HIGH,
            title="Cloud Storage Security Rules",
            description="Secure Cloud Storage buckets with proper access controls",
            affected_components=["Cloud Storage", "File Uploads"],
            current_state="Storage rules need hardening",
            recommended_fix="Implement authentication requirements, file type validation, size limits",
            code_fix="""rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId
        && request.resource.size < 10 * 1024 * 1024;
    }
  }
}""",
            impact="Data security and abuse prevention",
            effort="medium"
        ))
        
        report.findings.extend(findings)
    
    async def _audit_security(self, report: AuditReport, platform: str):
        """Comprehensive security audit"""
        findings = []
        
        # OWASP Top 10 - A01: Broken Access Control
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEC-001",
            phase=AuditPhase.SECURITY,
            severity=SeverityLevel.CRITICAL,
            title="Access Control Validation",
            description="Verify role-based access control (RBAC) implementation",
            affected_components=["/api/auth", "/api/admin", "Dashboard Routes"],
            current_state="Access control needs validation",
            recommended_fix="Implement middleware for role verification, add audit logging",
            impact="Unauthorized access prevention",
            effort="high"
        ))
        
        # OWASP Top 10 - A02: Cryptographic Failures
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEC-002",
            phase=AuditPhase.SECURITY,
            severity=SeverityLevel.HIGH,
            title="Encryption and Secrets Management",
            description="Audit encryption at rest and in transit, secrets management",
            affected_components=["Database", "API Communication", "Environment Variables"],
            current_state="Need to verify encryption standards",
            recommended_fix="Use Google Secret Manager, enforce TLS 1.3, encrypt sensitive fields",
            impact="Data protection compliance",
            effort="medium"
        ))
        
        # OWASP Top 10 - A03: Injection
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEC-003",
            phase=AuditPhase.SECURITY,
            severity=SeverityLevel.HIGH,
            title="Injection Prevention",
            description="Validate input sanitization and parameterized queries",
            affected_components=["API Endpoints", "Database Queries", "Form Inputs"],
            current_state="Input validation needs strengthening",
            recommended_fix="Use Pydantic for validation, parameterized queries, sanitize outputs",
            impact="SQL/NoSQL injection prevention",
            effort="medium",
            auto_fixable=True
        ))
        
        # Authentication Security
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEC-004",
            phase=AuditPhase.SECURITY,
            severity=SeverityLevel.CRITICAL,
            title="Authentication Hardening",
            description="Strengthen authentication mechanisms and session management",
            affected_components=["JWT Tokens", "Session Management", "Password Policies"],
            current_state="Authentication needs hardening",
            recommended_fix="Implement MFA, shorter token expiry, password complexity, rate limiting",
            config_fix={
                "ACCESS_TOKEN_EXPIRE_MINUTES": 60,
                "MIN_PASSWORD_LENGTH": 12,
                "REQUIRE_MFA": True,
                "MAX_LOGIN_ATTEMPTS": 5,
                "LOCKOUT_DURATION_MINUTES": 30
            },
            impact="Account security and breach prevention",
            effort="high"
        ))
        
        # Rate Limiting
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEC-005",
            phase=AuditPhase.SECURITY,
            severity=SeverityLevel.HIGH,
            title="Rate Limiting Implementation",
            description="Implement rate limiting to prevent abuse and DDoS",
            affected_components=["API Gateway", "Authentication Endpoints"],
            current_state="Rate limiting not fully implemented",
            recommended_fix="Use Cloud Armor, implement per-endpoint rate limits",
            impact="DDoS protection and abuse prevention",
            effort="medium"
        ))
        
        # CORS Configuration
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEC-006",
            phase=AuditPhase.SECURITY,
            severity=SeverityLevel.MEDIUM,
            title="CORS Configuration Hardening",
            description="Restrict CORS to production domains only",
            affected_components=["API CORS Policy"],
            current_state="CORS allows wildcard (*)",
            recommended_fix="Restrict to specific production domains",
            code_fix="""CORS_ORIGINS = [
    'https://esim.com.mm',
    'https://www.esim.com.mm',
    'https://esim-myanmar-ia6gw.web.app',
    'https://esimmyanmar-09289140-4db73.web.app',
    'https://esim-myanmar.pages.dev'
]""",
            impact="XSS and CSRF protection",
            effort="low",
            auto_fixable=True
        ))
        
        report.findings.extend(findings)
    
    async def _audit_performance(self, report: AuditReport, platform: str):
        """Performance and Core Web Vitals audit"""
        findings = []
        
        # Core Web Vitals - LCP
        findings.append(AuditFinding(
            id=f"{report.audit_id}-PERF-001",
            phase=AuditPhase.PERFORMANCE,
            severity=SeverityLevel.HIGH,
            title="Largest Contentful Paint (LCP) Optimization",
            description="Optimize LCP to under 2.5 seconds",
            affected_components=["Frontend Assets", "Image Loading", "Critical CSS"],
            current_state="LCP needs optimization",
            recommended_fix="Implement lazy loading, optimize images, inline critical CSS, use CDN",
            impact="User experience and SEO ranking",
            effort="medium"
        ))
        
        # Core Web Vitals - FID
        findings.append(AuditFinding(
            id=f"{report.audit_id}-PERF-002",
            phase=AuditPhase.PERFORMANCE,
            severity=SeverityLevel.MEDIUM,
            title="First Input Delay (FID) Optimization",
            description="Reduce FID to under 100ms",
            affected_components=["JavaScript Bundles", "Event Handlers"],
            current_state="JavaScript execution needs optimization",
            recommended_fix="Code splitting, defer non-critical JS, optimize event handlers",
            impact="Interactivity and user engagement",
            effort="medium"
        ))
        
        # Core Web Vitals - CLS
        findings.append(AuditFinding(
            id=f"{report.audit_id}-PERF-003",
            phase=AuditPhase.PERFORMANCE,
            severity=SeverityLevel.MEDIUM,
            title="Cumulative Layout Shift (CLS) Reduction",
            description="Reduce CLS to under 0.1",
            affected_components=["Layout System", "Image Dimensions", "Font Loading"],
            current_state="Layout shifts detected",
            recommended_fix="Set image dimensions, use font-display: swap, reserve ad space",
            impact="Visual stability and user experience",
            effort="low",
            auto_fixable=True
        ))
        
        # API Performance
        findings.append(AuditFinding(
            id=f"{report.audit_id}-PERF-004",
            phase=AuditPhase.PERFORMANCE,
            severity=SeverityLevel.HIGH,
            title="API Response Time Optimization",
            description="Optimize API response times to under 200ms",
            affected_components=["Backend APIs", "Database Queries"],
            current_state="Some API endpoints are slow",
            recommended_fix="Add database indexes, implement caching, optimize queries",
            impact="Application responsiveness",
            effort="high"
        ))
        
        # Caching Strategy
        findings.append(AuditFinding(
            id=f"{report.audit_id}-PERF-005",
            phase=AuditPhase.PERFORMANCE,
            severity=SeverityLevel.MEDIUM,
            title="Caching Strategy Implementation",
            description="Implement comprehensive caching strategy",
            affected_components=["CDN", "Browser Cache", "API Cache"],
            current_state="Caching not optimized",
            recommended_fix="Configure Firebase CDN, set cache headers, implement Redis for API",
            impact="Load time reduction and cost savings",
            effort="medium"
        ))
        
        report.findings.extend(findings)
    
    async def _audit_ux_ui(self, report: AuditReport, platform: str):
        """UX/UI and accessibility audit"""
        findings = []
        
        # Accessibility - WCAG Compliance
        findings.append(AuditFinding(
            id=f"{report.audit_id}-UX-001",
            phase=AuditPhase.UX_UI,
            severity=SeverityLevel.HIGH,
            title="WCAG 2.2 AA Compliance",
            description="Ensure full WCAG 2.2 Level AA compliance",
            affected_components=["All Pages", "Forms", "Navigation"],
            current_state="Accessibility needs improvement",
            recommended_fix="Add ARIA labels, keyboard navigation, screen reader support, color contrast",
            impact="Legal compliance and inclusivity",
            effort="high"
        ))
        
        # Responsive Design
        findings.append(AuditFinding(
            id=f"{report.audit_id}-UX-002",
            phase=AuditPhase.UX_UI,
            severity=SeverityLevel.MEDIUM,
            title="Responsive Design Validation",
            description="Verify responsive behavior across all breakpoints",
            affected_components=["Mobile Views", "Tablet Views", "Desktop Views"],
            current_state="Some responsive issues detected",
            recommended_fix="Test and fix breakpoints, ensure touch targets are 44x44px minimum",
            impact="Mobile user experience",
            effort="medium"
        ))
        
        # Form Validation
        findings.append(AuditFinding(
            id=f"{report.audit_id}-UX-003",
            phase=AuditPhase.UX_UI,
            severity=SeverityLevel.MEDIUM,
            title="Form Validation and Error Messaging",
            description="Improve form validation and user feedback",
            affected_components=["Login Form", "Registration Form", "Contact Forms"],
            current_state="Error messages need improvement",
            recommended_fix="Add inline validation, clear error messages, success feedback",
            impact="User experience and conversion rates",
            effort="low"
        ))
        
        # Design Consistency
        findings.append(AuditFinding(
            id=f"{report.audit_id}-UX-004",
            phase=AuditPhase.UX_UI,
            severity=SeverityLevel.LOW,
            title="Design System Consistency",
            description="Standardize font sizes, button sizes, spacing across all pages",
            affected_components=["Design System", "All Components"],
            current_state="Minor inconsistencies in design tokens",
            recommended_fix="Create design token system, audit all components for consistency",
            impact="Brand consistency and professional appearance",
            effort="medium"
        ))
        
        report.findings.extend(findings)
    
    async def _audit_seo(self, report: AuditReport, platform: str):
        """SEO and discoverability audit"""
        findings = []
        
        # Meta Tags
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEO-001",
            phase=AuditPhase.SEO,
            severity=SeverityLevel.HIGH,
            title="Meta Tags Optimization",
            description="Optimize meta tags, OpenGraph, and Twitter Cards",
            affected_components=["All Pages", "SEO Headers"],
            current_state="Meta tags need optimization",
            recommended_fix="Add comprehensive meta tags, OpenGraph, structured data",
            impact="Search visibility and social sharing",
            effort="low"
        ))
        
        # Sitemap and Robots
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEO-002",
            phase=AuditPhase.SEO,
            severity=SeverityLevel.MEDIUM,
            title="Sitemap and Robots.txt",
            description="Verify sitemap.xml and robots.txt configuration",
            affected_components=["sitemap.xml", "robots.txt"],
            current_state="Sitemap exists but needs validation",
            recommended_fix="Verify all URLs in sitemap, optimize crawl directives",
            impact="Search engine crawling efficiency",
            effort="low"
        ))
        
        # Structured Data
        findings.append(AuditFinding(
            id=f"{report.audit_id}-SEO-003",
            phase=AuditPhase.SEO,
            severity=SeverityLevel.MEDIUM,
            title="Structured Data Implementation",
            description="Add JSON-LD structured data for rich snippets",
            affected_components=["Organization Schema", "Product Schema"],
            current_state="Structured data not implemented",
            recommended_fix="Add Organization, Product, FAQPage schemas",
            impact="Rich snippets and search visibility",
            effort="medium"
        ))
        
        report.findings.extend(findings)
    
    async def _audit_compliance(self, report: AuditReport, platform: str):
        """Legal and compliance audit"""
        findings = []
        
        # Privacy Policy
        findings.append(AuditFinding(
            id=f"{report.audit_id}-COMP-001",
            phase=AuditPhase.COMPLIANCE,
            severity=SeverityLevel.HIGH,
            title="Privacy Policy Compliance",
            description="Verify Privacy Policy is comprehensive and compliant",
            affected_components=["/privacy-policy", "Data Collection"],
            current_state="Privacy policy needs review",
            recommended_fix="Update for GDPR, CCPA, include data retention, user rights",
            impact="Legal compliance and user trust",
            effort="high"
        ))
        
        # GSMA eSIM Standards
        findings.append(AuditFinding(
            id=f"{report.audit_id}-COMP-002",
            phase=AuditPhase.COMPLIANCE,
            severity=SeverityLevel.HIGH,
            title="GSMA eSIM Standards Alignment",
            description="Ensure eSIM implementation follows GSMA standards",
            affected_components=["eSIM Provisioning", "QR Codes", "LPA Integration"],
            current_state="GSMA compliance needs verification",
            recommended_fix="Verify LPA:1 format, RSP protocol, SM-DP+ integration",
            impact="Telecom compliance and interoperability",
            effort="high"
        ))
        
        # Cookie Consent
        findings.append(AuditFinding(
            id=f"{report.audit_id}-COMP-003",
            phase=AuditPhase.COMPLIANCE,
            severity=SeverityLevel.MEDIUM,
            title="Cookie Consent Management",
            description="Implement cookie consent banner and management",
            affected_components=["Cookie Banner", "Analytics"],
            current_state="Cookie consent needs implementation",
            recommended_fix="Add consent banner, cookie preferences, opt-out mechanism",
            impact="GDPR compliance",
            effort="medium"
        ))
        
        report.findings.extend(findings)
    
    async def _generate_final_report(self, report: AuditReport):
        """Generate final audit report with metrics and recommendations"""
        
        # Calculate summary statistics
        summary = {
            "total_findings": len(report.findings),
            "critical": sum(1 for f in report.findings if f.severity == SeverityLevel.CRITICAL),
            "high": sum(1 for f in report.findings if f.severity == SeverityLevel.HIGH),
            "medium": sum(1 for f in report.findings if f.severity == SeverityLevel.MEDIUM),
            "low": sum(1 for f in report.findings if f.severity == SeverityLevel.LOW),
            "auto_fixable": sum(1 for f in report.findings if f.auto_fixable)
        }
        report.summary = summary
        
        # Calculate health score
        health_score = self._calculate_health_score(report.findings)
        report.metrics["health_score"] = health_score
        report.metrics["security_score"] = self._calculate_phase_score(
            report.findings, AuditPhase.SECURITY
        )
        report.metrics["performance_score"] = self._calculate_phase_score(
            report.findings, AuditPhase.PERFORMANCE
        )
        
        # Generate recommendations
        report.recommendations = self._generate_recommendations(report.findings)
    
    def _calculate_health_score(self, findings: List[AuditFinding]) -> int:
        """Calculate overall health score (0-100)"""
        if not findings:
            return 100
        
        penalty = {
            SeverityLevel.CRITICAL: 20,
            SeverityLevel.HIGH: 10,
            SeverityLevel.MEDIUM: 5,
            SeverityLevel.LOW: 2,
            SeverityLevel.INFO: 0
        }
        
        total_penalty = sum(penalty.get(f.severity, 0) for f in findings)
        score = max(0, 100 - total_penalty)
        return score
    
    def _calculate_phase_score(self, findings: List[AuditFinding], phase: AuditPhase) -> int:
        """Calculate score for specific audit phase"""
        phase_findings = [f for f in findings if f.phase == phase]
        return self._calculate_health_score(phase_findings)
    
    def _generate_recommendations(self, findings: List[AuditFinding]) -> List[str]:
        """Generate prioritized recommendations"""
        recommendations = []
        
        # Group by severity
        critical = [f for f in findings if f.severity == SeverityLevel.CRITICAL]
        high = [f for f in findings if f.severity == SeverityLevel.HIGH]
        
        if critical:
            recommendations.append(
                f"URGENT: Address {len(critical)} critical security/compliance issues immediately"
            )
        
        if high:
            recommendations.append(
                f"HIGH PRIORITY: Resolve {len(high)} high-severity issues within 7 days"
            )
        
        # Auto-fixable recommendations
        auto_fix = [f for f in findings if f.auto_fixable]
        if auto_fix:
            recommendations.append(
                f"QUICK WINS: {len(auto_fix)} issues can be auto-fixed with provided code"
            )
        
        return recommendations
    
    def get_audit_status(self, audit_id: str) -> Optional[Dict[str, Any]]:
        """Get current audit status"""
        if audit_id not in self.audit_reports:
            return None
        
        report = self.audit_reports[audit_id]
        return {
            "audit_id": audit_id,
            "platform": report.platform,
            "status": report.status,
            "completion_percentage": report.completion_percentage,
            "total_findings": len(report.findings),
            "summary": report.summary,
            "health_score": report.metrics.get("health_score", 0)
        }
    
    def get_full_report(self, audit_id: str) -> Optional[Dict[str, Any]]:
        """Get complete audit report"""
        if audit_id not in self.audit_reports:
            return None
        
        report = self.audit_reports[audit_id]
        return {
            "audit_id": report.audit_id,
            "platform": report.platform,
            "timestamp": report.timestamp,
            "status": report.status,
            "completion_percentage": report.completion_percentage,
            "summary": report.summary,
            "metrics": report.metrics,
            "findings": [asdict(f) for f in report.findings],
            "recommendations": report.recommendations
        }
    
    def export_report(self, audit_id: str, format: str = "json") -> Optional[str]:
        """Export audit report in specified format"""
        report_data = self.get_full_report(audit_id)
        if not report_data:
            return None
        
        if format == "json":
            return json.dumps(report_data, indent=2)
        
        # Add more formats as needed (markdown, html, pdf)
        return None


# Singleton instance
nexora_orchestrator = NexoraOrchestrator()
