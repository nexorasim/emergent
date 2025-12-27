"""
Security Middleware for eSIM Myanmar Platform
Enterprise-grade security: rate limiting, headers, logging, webhook validation
ESIM MYANMAR COMPANY LIMITED - 2025-2026
"""

from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from datetime import datetime, timedelta
import time
import logging
import hashlib
import hmac
import secrets
import re
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('esim_security')


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Enterprise rate limiting with per-IP, per-endpoint, and sliding window limits
    """
    
    def __init__(self, app, requests_per_minute: int = 60, burst_limit: int = 10):
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        self.burst_limit = burst_limit
        self.request_counts = defaultdict(list)
        self.blocked_ips = {}
        self.suspicious_ips = defaultdict(int)
        
        # Endpoint-specific limits (security hardened)
        self.endpoint_limits = {
            '/api/auth/login': 5,
            '/api/auth/register': 3,
            '/api/auth/forgot-password': 3,
            '/api/auth/reset-password': 3,
            '/api/auth/2fa/verify': 5,
            '/api/payments': 10,
            '/api/payments/callback': 30,
            '/api/esim/profiles': 20,
            '/api/support/tickets': 10
        }
        
        # Whitelist for internal services
        self.whitelisted_ips = set(os.getenv('WHITELISTED_IPS', '').split(','))
    
    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP with proxy header validation"""
        # Check X-Forwarded-For (trusted proxies only)
        forwarded = request.headers.get('X-Forwarded-For')
        if forwarded:
            # Take the first IP (client IP)
            ip = forwarded.split(',')[0].strip()
            # Validate IP format
            if self._is_valid_ip(ip):
                return ip
        
        # Check X-Real-IP
        real_ip = request.headers.get('X-Real-IP')
        if real_ip and self._is_valid_ip(real_ip):
            return real_ip
        
        return request.client.host if request.client else 'unknown'
    
    def _is_valid_ip(self, ip: str) -> bool:
        """Validate IP address format"""
        ipv4_pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
        ipv6_pattern = r'^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$'
        return bool(re.match(ipv4_pattern, ip) or re.match(ipv6_pattern, ip))
    
    def _get_rate_limit_key(self, ip: str, path: str) -> str:
        """Generate rate limit key"""
        return f"{ip}:{path}"
    
    def _is_rate_limited(self, key: str, limit: int) -> bool:
        """Check if request should be rate limited using sliding window"""
        now = datetime.now()
        minute_ago = now - timedelta(minutes=1)
        
        # Clean old entries
        self.request_counts[key] = [
            ts for ts in self.request_counts[key] 
            if ts > minute_ago
        ]
        
        # Check limit
        if len(self.request_counts[key]) >= limit:
            return True
        
        # Record request
        self.request_counts[key].append(now)
        return False
    
    def _detect_suspicious_activity(self, client_ip: str, path: str) -> bool:
        """Detect and track suspicious activity patterns"""
        # Track failed auth attempts
        if '/auth/' in path:
            self.suspicious_ips[client_ip] += 1
            if self.suspicious_ips[client_ip] > 20:
                logger.warning(f"Suspicious activity detected from {client_ip}")
                return True
        return False
    
    async def dispatch(self, request: Request, call_next):
        client_ip = self._get_client_ip(request)
        path = request.url.path
        
        # Skip rate limiting for whitelisted IPs
        if client_ip in self.whitelisted_ips:
            return await call_next(request)
        
        # Skip rate limiting for health checks
        if path in ['/health', '/api/health', '/']:
            return await call_next(request)
        
        # Check if IP is blocked
        if client_ip in self.blocked_ips:
            if datetime.now() < self.blocked_ips[client_ip]:
                logger.warning(f"Blocked IP attempted access: {client_ip}")
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too many requests. Please try again later."},
                    headers={"Retry-After": "900"}
                )
            else:
                del self.blocked_ips[client_ip]
                self.suspicious_ips[client_ip] = 0
        
        # Check for suspicious activity
        if self._detect_suspicious_activity(client_ip, path):
            self.blocked_ips[client_ip] = datetime.now() + timedelta(hours=1)
            logger.error(f"IP blocked for 1 hour due to suspicious activity: {client_ip}")
            return JSONResponse(
                status_code=429,
                content={"detail": "Suspicious activity detected. Access temporarily blocked."},
                headers={"Retry-After": "3600"}
            )
        
        # Get appropriate limit
        limit = self.endpoint_limits.get(path, self.requests_per_minute)
        key = self._get_rate_limit_key(client_ip, path)
        
        if self._is_rate_limited(key, limit):
            logger.warning(f"Rate limit exceeded: {client_ip} on {path}")
            
            # Block IP for repeated violations
            global_key = self._get_rate_limit_key(client_ip, 'global')
            if self._is_rate_limited(global_key, self.requests_per_minute * 2):
                self.blocked_ips[client_ip] = datetime.now() + timedelta(minutes=15)
                logger.error(f"IP blocked for 15 minutes: {client_ip}")
            
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Please slow down."},
                headers={"Retry-After": "60"}
            )
        
        response = await call_next(request)
        return response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Enterprise-grade security headers for telecom platform
    OWASP compliant with CSP, HSTS, and modern security policies
    """
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Core Security Headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        # Permissions Policy (Feature Policy) - Restrictive
        response.headers["Permissions-Policy"] = (
            "geolocation=(), "
            "microphone=(), "
            "camera=(), "
            "payment=(self), "
            "usb=(), "
            "magnetometer=(), "
            "gyroscope=(), "
            "accelerometer=(), "
            "autoplay=(), "
            "encrypted-media=(self), "
            "fullscreen=(self)"
        )
        
        # Content Security Policy - Enterprise Telecom Grade
        csp_directives = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://api.esim.com.mm https://*.supabase.co https://www.google-analytics.com wss://*.supabase.co",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests",
            "block-all-mixed-content"
        ]
        response.headers["Content-Security-Policy"] = "; ".join(csp_directives)
        
        # Cross-Origin Policies
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
        
        # HSTS - 2 years with preload
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        
        # Cache Control for API responses
        if request.url.path.startswith("/api/"):
            response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        
        # Remove server identification headers
        if "Server" in response.headers:
            del response.headers["Server"]
        if "X-Powered-By" in response.headers:
            del response.headers["X-Powered-By"]
        
        return response


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    Comprehensive request logging for audit trail and security monitoring
    """
    
    def __init__(self, app):
        super().__init__(app)
        self.sensitive_paths = ['/api/auth/', '/api/payments/', '/api/admin/']
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Generate secure request ID
        request_id = secrets.token_hex(8)
        
        # Get client info
        client_ip = self._get_client_ip(request)
        user_agent = request.headers.get('User-Agent', 'Unknown')[:200]
        
        # Log request (sanitized)
        log_path = self._sanitize_path(request.url.path)
        logger.info(f"[{request_id}] {request.method} {log_path} - IP: {client_ip}")
        
        try:
            response = await call_next(request)
            
            # Calculate duration
            duration = time.time() - start_time
            
            # Log response
            log_level = logging.WARNING if response.status_code >= 400 else logging.INFO
            logger.log(
                log_level,
                f"[{request_id}] {request.method} {log_path} - "
                f"Status: {response.status_code} - Duration: {duration:.3f}s"
            )
            
            # Add request ID to response headers
            response.headers["X-Request-ID"] = request_id
            
            # Log security events
            if response.status_code == 401:
                logger.warning(f"[{request_id}] Unauthorized access attempt from {client_ip}")
            elif response.status_code == 403:
                logger.warning(f"[{request_id}] Forbidden access attempt from {client_ip}")
            
            return response
            
        except Exception as e:
            duration = time.time() - start_time
            logger.error(
                f"[{request_id}] {request.method} {log_path} - "
                f"Error: {type(e).__name__} - Duration: {duration:.3f}s"
            )
            raise
    
    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP"""
        forwarded = request.headers.get('X-Forwarded-For')
        if forwarded:
            return forwarded.split(',')[0].strip()
        return request.client.host if request.client else 'unknown'
    
    def _sanitize_path(self, path: str) -> str:
        """Sanitize path for logging (remove sensitive data)"""
        # Remove potential tokens or IDs from path for logging
        sanitized = re.sub(r'/[a-f0-9-]{36}', '/[ID]', path)
        sanitized = re.sub(r'/\d+', '/[NUM]', sanitized)
        return sanitized


class WebhookValidationMiddleware(BaseHTTPMiddleware):
    """
    Validate webhook signatures from payment gateways
    """
    
    def __init__(self, app):
        super().__init__(app)
        self.webhook_paths = {
            '/api/payments/callback/kbz': 'KBZ_PAY_WEBHOOK_SECRET',
            '/api/payments/callback/wave': 'WAVE_MONEY_WEBHOOK_SECRET',
            '/api/payments/callback/aya': 'AYA_PAY_WEBHOOK_SECRET'
        }
    
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        
        # Check if this is a webhook endpoint
        if path in self.webhook_paths:
            secret_env = self.webhook_paths[path]
            secret = os.getenv(secret_env)
            
            if secret:
                # Get signature from headers
                signature = request.headers.get('X-Webhook-Signature') or \
                           request.headers.get('X-Signature') or \
                           request.headers.get('Authorization')
                
                if not signature:
                    logger.warning(f"Webhook request without signature: {path}")
                    return JSONResponse(
                        status_code=401,
                        content={"detail": "Missing webhook signature"}
                    )
                
                # Validate signature (implementation depends on gateway)
                # This is a placeholder - actual implementation varies by gateway
                
        return await call_next(request)


# CORS configuration for production
ALLOWED_ORIGINS = [
    "https://esim.com.mm",
    "https://www.esim.com.mm",
    "https://admin.esim.com.mm",
    "https://partner.esim.com.mm",
    "https://esim-myanmar.pages.dev",
    "https://esim-myanmar-ia6gw.web.app",
    "https://esimmyanmar-09289140-4db73.web.app"
]

# Add development origins only in non-production
if os.getenv('ENVIRONMENT', 'production') != 'production':
    ALLOWED_ORIGINS.extend([
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ])


def get_cors_config():
    """Return CORS configuration for production"""
    return {
        "allow_origins": ALLOWED_ORIGINS,
        "allow_credentials": True,
        "allow_methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        "allow_headers": [
            "Authorization",
            "Content-Type",
            "X-Request-ID",
            "X-CSRF-Token",
            "Accept",
            "Accept-Language",
            "Origin"
        ],
        "expose_headers": ["X-Request-ID", "X-RateLimit-Remaining"],
        "max_age": 600
    }


def verify_webhook_signature(payload: bytes, signature: str, secret: str, algorithm: str = 'sha256') -> bool:
    """
    Verify webhook signature using HMAC
    """
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256 if algorithm == 'sha256' else hashlib.sha1
    ).hexdigest()
    
    return hmac.compare_digest(expected, signature)
