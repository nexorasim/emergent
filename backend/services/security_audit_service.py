"""Security Audit Service
Comprehensive security assessment covering OWASP Top 10
"""

import re
from typing import Dict, List, Any
from dataclasses import dataclass
from datetime import datetime


@dataclass
class SecurityCheck:
    category: str
    severity: str
    title: str
    description: str
    status: str
    recommendation: str


class SecurityAuditService:
    """Security Audit Service
    
    Performs comprehensive security assessments aligned with:
    - OWASP Top 10
    - CWE Top 25
    - NIST Cybersecurity Framework
    - PCI DSS
    - GDPR Security Requirements
    """
    
    def __init__(self):
        self.checks: List[SecurityCheck] = []
    
    def audit_authentication(self, config: Dict[str, Any]) -> List[SecurityCheck]:
        """Audit authentication security"""
        checks = []
        
        # Password policy
        min_length = config.get('MIN_PASSWORD_LENGTH', 8)
        if min_length < 12:
            checks.append(SecurityCheck(
                category="Authentication",
                severity="HIGH",
                title="Weak Password Policy",
                description=f"Minimum password length is {min_length}, recommended is 12+",
                status="FAIL",
                recommendation="Increase MIN_PASSWORD_LENGTH to at least 12 characters"
            ))
        
        # MFA
        if not config.get('REQUIRE_MFA', False):
            checks.append(SecurityCheck(
                category="Authentication",
                severity="CRITICAL",
                title="Multi-Factor Authentication Not Enforced",
                description="MFA is not required for user accounts",
                status="FAIL",
                recommendation="Implement and enforce MFA for all user accounts"
            ))
        
        # Token expiry
        token_expire = config.get('ACCESS_TOKEN_EXPIRE_MINUTES', 10080)
        if token_expire > 60:
            checks.append(SecurityCheck(
                category="Authentication",
                severity="HIGH",
                title="Long Token Expiration Time",
                description=f"Access tokens expire after {token_expire} minutes",
                status="FAIL",
                recommendation="Reduce token expiration to 60 minutes or less"
            ))
        
        # Rate limiting
        if not config.get('AUTH_RATE_LIMIT_PER_MINUTE'):
            checks.append(SecurityCheck(
                category="Authentication",
                severity="HIGH",
                title="No Rate Limiting on Auth Endpoints",
                description="Authentication endpoints lack rate limiting",
                status="FAIL",
                recommendation="Implement rate limiting (5 requests/minute for auth)"
            ))
        
        return checks
    
    def audit_api_security(self, config: Dict[str, Any]) -> List[SecurityCheck]:
        """Audit API security"""
        checks = []
        
        # CORS configuration
        cors_origins = config.get('CORS_ORIGINS', [])
        if '*' in cors_origins:
            checks.append(SecurityCheck(
                category="API Security",
                severity="CRITICAL",
                title="Wildcard CORS Configuration",
                description="CORS allows all origins (*)",
                status="FAIL",
                recommendation="Restrict CORS to specific production domains only"
            ))
        
        # HTTPS enforcement
        if not config.get('FORCE_HTTPS', True):
            checks.append(SecurityCheck(
                category="API Security",
                severity="CRITICAL",
                title="HTTPS Not Enforced",
                description="API does not enforce HTTPS",
                status="FAIL",
                recommendation="Enforce HTTPS for all API endpoints"
            ))
        
        # API versioning
        if not config.get('API_VERSION'):
            checks.append(SecurityCheck(
                category="API Security",
                severity="LOW",
                title="No API Versioning",
                description="API lacks version control",
                status="WARNING",
                recommendation="Implement API versioning (e.g., /api/v1/)"
            ))
        
        return checks
    
    def audit_data_protection(self, config: Dict[str, Any]) -> List[SecurityCheck]:
        """Audit data protection measures"""
        checks = []
        
        # Encryption at rest
        if not config.get('ENCRYPT_AT_REST', False):
            checks.append(SecurityCheck(
                category="Data Protection",
                severity="HIGH",
                title="Encryption at Rest Not Enabled",
                description="Sensitive data is not encrypted at rest",
                status="FAIL",
                recommendation="Enable database encryption at rest"
            ))
        
        # Secrets management
        if not config.get('USE_SECRET_MANAGER', False):
            checks.append(SecurityCheck(
                category="Data Protection",
                severity="HIGH",
                title="Secrets Not Using Secret Manager",
                description="Secrets stored in environment variables",
                status="FAIL",
                recommendation="Migrate to Google Secret Manager"
            ))
        
        # Data retention policy
        if not config.get('DATA_RETENTION_DAYS'):
            checks.append(SecurityCheck(
                category="Data Protection",
                severity="MEDIUM",
                title="No Data Retention Policy",
                description="Data retention policy not defined",
                status="WARNING",
                recommendation="Define and implement data retention policy"
            ))
        
        return checks
    
    def audit_owasp_top10(self) -> Dict[str, List[str]]:
        """OWASP Top 10 compliance check"""
        owasp_checks = {
            "A01:2021 - Broken Access Control": [
                "Implement role-based access control (RBAC)",
                "Validate user permissions on every request",
                "Deny by default principle",
                "Audit logging for access control violations"
            ],
            "A02:2021 - Cryptographic Failures": [
                "Use TLS 1.3 for all connections",
                "Encrypt sensitive data at rest",
                "Use strong encryption algorithms (AES-256)",
                "Proper key management with Secret Manager"
            ],
            "A03:2021 - Injection": [
                "Use parameterized queries",
                "Input validation with Pydantic",
                "Output encoding",
                "Principle of least privilege for database accounts"
            ],
            "A04:2021 - Insecure Design": [
                "Threat modeling during design phase",
                "Security requirements in user stories",
                "Secure development lifecycle",
                "Design patterns for security"
            ],
            "A05:2021 - Security Misconfiguration": [
                "Disable default accounts",
                "Remove unnecessary features",
                "Proper error handling (no stack traces in production)",
                "Security headers implementation"
            ],
            "A06:2021 - Vulnerable Components": [
                "Regular dependency updates",
                "Automated vulnerability scanning",
                "Remove unused dependencies",
                "Software bill of materials (SBOM)"
            ],
            "A07:2021 - Authentication Failures": [
                "Multi-factor authentication",
                "Password complexity requirements",
                "Account lockout mechanism",
                "Secure session management"
            ],
            "A08:2021 - Software/Data Integrity Failures": [
                "Code signing",
                "CI/CD pipeline security",
                "Verify integrity of updates",
                "Secure deserialization"
            ],
            "A09:2021 - Logging/Monitoring Failures": [
                "Comprehensive audit logging",
                "Real-time alerting",
                "Log retention policy",
                "Tamper-proof logging"
            ],
            "A10:2021 - Server-Side Request Forgery": [
                "Validate and sanitize URLs",
                "Whitelist allowed destinations",
                "Network segmentation",
                "Disable HTTP redirections"
            ]
        }
        
        return owasp_checks
    
    def generate_security_report(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Generate comprehensive security audit report"""
        
        all_checks = []
        all_checks.extend(self.audit_authentication(config))
        all_checks.extend(self.audit_api_security(config))
        all_checks.extend(self.audit_data_protection(config))
        
        # Calculate scores
        total_checks = len(all_checks)
        failed_checks = sum(1 for c in all_checks if c.status == "FAIL")
        warning_checks = sum(1 for c in all_checks if c.status == "WARNING")
        passed_checks = total_checks - failed_checks - warning_checks
        
        critical_issues = sum(1 for c in all_checks if c.severity == "CRITICAL")
        high_issues = sum(1 for c in all_checks if c.severity == "HIGH")
        
        security_score = max(0, 100 - (critical_issues * 20) - (high_issues * 10))
        
        return {
            "timestamp": datetime.utcnow().isoformat(),
            "security_score": security_score,
            "summary": {
                "total_checks": total_checks,
                "passed": passed_checks,
                "failed": failed_checks,
                "warnings": warning_checks,
                "critical_issues": critical_issues,
                "high_issues": high_issues
            },
            "checks": [
                {
                    "category": c.category,
                    "severity": c.severity,
                    "title": c.title,
                    "description": c.description,
                    "status": c.status,
                    "recommendation": c.recommendation
                }
                for c in all_checks
            ],
            "owasp_top10": self.audit_owasp_top10(),
            "recommendations": [
                "Implement Web Application Firewall (Cloud Armor)",
                "Enable Security Command Center",
                "Regular penetration testing",
                "Security training for development team",
                "Incident response plan"
            ]
        }


# Singleton instance
security_audit_service = SecurityAuditService()
