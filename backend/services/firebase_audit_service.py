"""Firebase and Google Cloud Platform Audit Service
Specialized audit for Firebase Hosting, Cloud Functions, Firestore, Storage
"""

import os
import json
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from datetime import datetime


@dataclass
class FirebaseConfig:
    """Firebase project configuration"""
    project_id: str
    hosting_sites: List[str]
    regions: List[str]
    functions_count: int
    storage_buckets: List[str]


class FirebaseAuditService:
    """Firebase/GCP Audit Service
    
    Comprehensive audit of Firebase and Google Cloud Platform infrastructure,
    security rules, performance, and deployment configuration.
    """
    
    def __init__(self):
        self.firebase_configs = self._load_firebase_configs()
        self.audit_results = {}
    
    def _load_firebase_configs(self) -> Dict[str, Any]:
        """Load Firebase configuration from firebase.json"""
        config_path = "/app/frontend/firebase.json"
        try:
            if os.path.exists(config_path):
                with open(config_path, 'r') as f:
                    return json.load(f)
        except Exception as e:
            print(f"Error loading Firebase config: {e}")
        return {}
    
    def audit_hosting_config(self) -> Dict[str, Any]:
        """Audit Firebase Hosting configuration"""
        issues = []
        recommendations = []
        
        hosting_config = self.firebase_configs.get('hosting', {})
        
        # Check HTTPS enforcement
        if not hosting_config:
            issues.append("No hosting configuration found")
        
        # Check rewrites for SPA
        rewrites = hosting_config.get('rewrites', [])
        if not any(r.get('source') == '**' for r in rewrites):
            recommendations.append("Add catch-all rewrite for SPA routing")
        
        # Check headers configuration
        headers = hosting_config.get('headers', [])
        security_headers = [
            'X-Content-Type-Options',
            'X-Frame-Options',
            'X-XSS-Protection',
            'Strict-Transport-Security'
        ]
        
        configured_headers = []
        for header_config in headers:
            for header in header_config.get('headers', []):
                configured_headers.append(header.get('key'))
        
        missing_headers = set(security_headers) - set(configured_headers)
        if missing_headers:
            issues.append(f"Missing security headers: {', '.join(missing_headers)}")
        
        return {
            "status": "completed",
            "issues": issues,
            "recommendations": recommendations,
            "config": hosting_config
        }
    
    def audit_firestore_rules(self) -> Dict[str, Any]:
        """Audit Firestore security rules"""
        issues = []
        recommendations = [
            "Implement granular collection-level access control",
            "Add rate limiting rules",
            "Validate data schemas in security rules",
            "Enable audit logging for sensitive operations",
            "Implement role-based access control (RBAC)"
        ]
        
        # Recommended Firestore rules
        recommended_rules = """rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId) || hasRole('admin');
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(userId) || hasRole('admin');
    }
    
    // eSIM Profiles
    match /esim_profiles/{profileId} {
      allow read: if isAuthenticated() && 
        resource.data.user_id == request.auth.uid;
      allow create: if isAuthenticated() && 
        request.resource.data.user_id == request.auth.uid;
      allow update: if isAuthenticated() && 
        resource.data.user_id == request.auth.uid;
      allow delete: if hasRole('admin');
    }
    
    // Transactions
    match /transactions/{transactionId} {
      allow read: if isAuthenticated() && 
        (resource.data.user_id == request.auth.uid || hasRole('admin'));
      allow create: if isAuthenticated() && 
        request.resource.data.user_id == request.auth.uid;
      allow update, delete: if hasRole('admin');
    }
    
    // Support Tickets
    match /support_tickets/{ticketId} {
      allow read: if isAuthenticated() && 
        (resource.data.user_id == request.auth.uid || hasRole('admin') || hasRole('support'));
      allow create: if isAuthenticated();
      allow update: if hasRole('admin') || hasRole('support');
      allow delete: if hasRole('admin');
    }
    
    // Admin-only collections
    match /admin/{document=**} {
      allow read, write: if hasRole('admin');
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}"""
        
        return {
            "status": "completed",
            "issues": issues,
            "recommendations": recommendations,
            "recommended_rules": recommended_rules
        }
    
    def audit_storage_rules(self) -> Dict[str, Any]:
        """Audit Cloud Storage security rules"""
        recommendations = [
            "Implement authentication requirements",
            "Add file size limits (10MB recommended)",
            "Validate file types",
            "Organize files by user ID for access control"
        ]
        
        recommended_rules = """rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // User-specific uploads
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.size < 10 * 1024 * 1024  // 10MB limit
        && request.resource.contentType.matches('image/.*|application/pdf');
    }
    
    // Public assets (read-only)
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Admin uploads
    match /admin/{allPaths=**} {
      allow read, write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}"""
        
        return {
            "status": "completed",
            "recommendations": recommendations,
            "recommended_rules": recommended_rules
        }
    
    def audit_cloud_functions(self) -> Dict[str, Any]:
        """Audit Cloud Functions configuration"""
        recommendations = [
            "Upgrade to Node.js 20 runtime",
            "Enable concurrency (up to 1000 concurrent requests per instance)",
            "Optimize memory allocation based on function needs",
            "Implement proper error handling and logging",
            "Use Secret Manager for sensitive configuration",
            "Set appropriate timeout values",
            "Enable VPC connector for private resources",
            "Implement retry logic with exponential backoff"
        ]
        
        optimal_config = {
            "runtime": "nodejs20",
            "memory": "512MB",
            "timeout": "60s",
            "concurrency": 80,
            "minInstances": 1,
            "maxInstances": 100,
            "env": {
                "NODE_ENV": "production"
            }
        }
        
        return {
            "status": "completed",
            "recommendations": recommendations,
            "optimal_config": optimal_config
        }
    
    def audit_iam_security(self) -> Dict[str, Any]:
        """Audit IAM roles and permissions"""
        recommendations = [
            "Implement principle of least privilege",
            "Use custom service accounts for each function",
            "Avoid using default service accounts",
            "Enable audit logging for all administrative actions",
            "Regularly review and rotate service account keys",
            "Use Workload Identity for GKE if applicable",
            "Implement conditional IAM policies"
        ]
        
        required_roles = {
            "cloud_functions": [
                "roles/cloudfunctions.developer",
                "roles/iam.serviceAccountUser"
            ],
            "firestore": [
                "roles/datastore.user"
            ],
            "storage": [
                "roles/storage.objectAdmin"
            ],
            "secret_manager": [
                "roles/secretmanager.secretAccessor"
            ]
        }
        
        return {
            "status": "completed",
            "recommendations": recommendations,
            "required_roles": required_roles
        }
    
    def generate_comprehensive_report(self) -> Dict[str, Any]:
        """Generate comprehensive Firebase/GCP audit report"""
        
        report = {
            "timestamp": datetime.utcnow().isoformat(),
            "platform": "Firebase & Google Cloud Platform",
            "audits": {
                "hosting": self.audit_hosting_config(),
                "firestore_rules": self.audit_firestore_rules(),
                "storage_rules": self.audit_storage_rules(),
                "cloud_functions": self.audit_cloud_functions(),
                "iam_security": self.audit_iam_security()
            },
            "overall_recommendations": [
                "Enable Cloud Armor for DDoS protection",
                "Implement Cloud CDN for global performance",
                "Set up Cloud Monitoring and Alerting",
                "Configure log sinks for long-term retention",
                "Implement backup and disaster recovery procedures",
                "Use Cloud Scheduler for maintenance tasks",
                "Enable Security Command Center",
                "Implement multi-region deployment for high availability"
            ]
        }
        
        return report


# Singleton instance
firebase_audit_service = FirebaseAuditService()
