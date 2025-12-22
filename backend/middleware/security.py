"""
Security Middleware for eSIM Myanmar Platform
Implements rate limiting, request logging, and security headers
"""

from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from datetime import datetime, timedelta
import time
import logging
import hashlib

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('esim_security')


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Rate limiting middleware with per-IP and per-endpoint limits
    """
    
    def __init__(self, app, requests_per_minute: int = 60, burst_limit: int = 10):
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        self.burst_limit = burst_limit
        self.request_counts = defaultdict(list)
        self.blocked_ips = {}
        
        # Endpoint-specific limits (more restrictive for auth)
        self.endpoint_limits = {
            '/api/auth/login': 5,
            '/api/auth/register': 3,
            '/api/auth/forgot-password': 3,
            '/api/payments': 10
        }
    
    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP, considering proxy headers"""
        forwarded = request.headers.get('X-Forwarded-For')
        if forwarded:
            return forwarded.split(',')[0].strip()
        return request.client.host if request.client else 'unknown'
    
    def _get_rate_limit_key(self, ip: str, path: str) -> str:
        """Generate rate limit key"""
        return f"{ip}:{path}"
    
    def _is_rate_limited(self, key: str, limit: int) -> bool:
        """Check if request should be rate limited"""
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
    
    async def dispatch(self, request: Request, call_next):
        client_ip = self._get_client_ip(request)
        path = request.url.path
        
        # Check if IP is blocked
        if client_ip in self.blocked_ips:
            if datetime.now() < self.blocked_ips[client_ip]:
                logger.warning(f"Blocked IP attempted access: {client_ip}")
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too many requests. Please try again later."}
                )
            else:
                del self.blocked_ips[client_ip]
        
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
    Add security headers to all responses
    """
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        
        # Content Security Policy
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: https:; "
            "connect-src 'self' https://api.esim.com.mm;"
        )
        
        # HSTS (only in production)
        # response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        return response


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    Log all requests for audit trail
    """
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Generate request ID
        request_id = hashlib.md5(
            f"{time.time()}{request.client.host if request.client else ''}".encode()
        ).hexdigest()[:12]
        
        # Log request
        logger.info(f"[{request_id}] {request.method} {request.url.path} - Started")
        
        try:
            response = await call_next(request)
            
            # Calculate duration
            duration = time.time() - start_time
            
            # Log response
            logger.info(
                f"[{request_id}] {request.method} {request.url.path} - "
                f"Status: {response.status_code} - Duration: {duration:.3f}s"
            )
            
            # Add request ID to response headers
            response.headers["X-Request-ID"] = request_id
            
            return response
            
        except Exception as e:
            duration = time.time() - start_time
            logger.error(
                f"[{request_id}] {request.method} {request.url.path} - "
                f"Error: {str(e)} - Duration: {duration:.3f}s"
            )
            raise


# CORS configuration for production
ALLOWED_ORIGINS = [
    "https://esim.com.mm",
    "https://www.esim.com.mm",
    "https://admin.esim.com.mm",
    "https://partner.esim.com.mm",
    # Development origins (remove in production)
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

def get_cors_config():
    """Return CORS configuration for production"""
    return {
        "allow_origins": ALLOWED_ORIGINS,
        "allow_credentials": True,
        "allow_methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Authorization", "Content-Type", "X-Request-ID"],
        "expose_headers": ["X-Request-ID"],
        "max_age": 600
    }
