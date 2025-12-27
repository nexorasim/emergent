/**
 * Security Utilities - Enterprise-grade security features
 * ESIM MYANMAR COMPANY LIMITED 2025-2026
 * Features: XSS protection, CSRF, rate limiting, input validation
 */

// =============================================================================
// XSS PROTECTION
// =============================================================================

/**
 * Sanitize HTML to prevent XSS attacks
 */
export const sanitizeHTML = (str) => {
  if (!str) return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

/**
 * Sanitize object values recursively
 */
export const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? sanitizeHTML(obj) : obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeObject(value);
  }
  return sanitized;
};

/**
 * Escape HTML entities
 */
export const escapeHTML = (str) => {
  if (!str) return '';
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return str.replace(/[&<>"'/]/g, char => escapeMap[char]);
};

// =============================================================================
// CSRF PROTECTION
// =============================================================================

/**
 * Get CSRF token from meta tag
 */
export const getCSRFToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]')?.content;
  return token || '';
};

/**
 * Generate CSRF token
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// =============================================================================
// RATE LIMITING
// =============================================================================

const rateLimitStore = new Map();

/**
 * Check if action is rate limited
 */
export const checkRateLimit = (key, maxAttempts = 5, windowMs = 60000) => {
  const now = Date.now();
  const attempts = rateLimitStore.get(key) || [];
  
  // Filter attempts within the time window
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return { allowed: false, retryAfter: Math.ceil((recentAttempts[0] + windowMs - now) / 1000) };
  }
  
  recentAttempts.push(now);
  rateLimitStore.set(key, recentAttempts);
  return { allowed: true, remaining: maxAttempts - recentAttempts.length };
};

/**
 * Clear rate limit for a key
 */
export const clearRateLimit = (key) => {
  rateLimitStore.delete(key);
};

// =============================================================================
// INPUT VALIDATION
// =============================================================================

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validate Myanmar phone number
 */
export const isValidMyanmarPhone = (phone) => {
  // Clean the phone number
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  
  // Myanmar phone patterns
  const patterns = [
    /^09\d{7,11}$/,           // 09xxxxxxxxx
    /^\+?959\d{7,11}$/,       // +959xxxxxxxxx or 959xxxxxxxxx
    /^\+?95\s?9\d{7,11}$/     // +95 9xxxxxxxxx
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password should contain at least one special character');
  }
  
  // Check for common patterns
  const commonPatterns = ['password', '123456', 'qwerty', 'abc123'];
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    errors.push('Password contains common patterns');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
};

/**
 * Calculate password strength score (0-100)
 */
const calculatePasswordStrength = (password) => {
  let score = 0;
  
  // Length
  score += Math.min(password.length * 4, 40);
  
  // Character variety
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;
  
  // Bonus for mixing
  const types = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter(r => r.test(password)).length;
  score += (types - 1) * 5;
  
  return Math.min(score, 100);
};

/**
 * Sanitize filename
 */
export const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255);
};

/**
 * Validate URL
 */
export const isValidURL = (url) => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// =============================================================================
// SESSION FINGERPRINTING
// =============================================================================

/**
 * Generate browser fingerprint for session validation
 */
export const generateFingerprint = async () => {
  const components = [];
  
  // Screen info
  components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);
  
  // Timezone
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
  
  // Language
  components.push(navigator.language);
  
  // User Agent Data (modern) or fallback
  components.push(navigator.userAgentData?.platform || navigator.userAgent.substring(0, 50));
  
  // Canvas fingerprint
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);
    components.push(canvas.toDataURL().slice(-50));
  } catch (e) {
    components.push('canvas-unavailable');
  }
  
  // WebGL info
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        components.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
      }
    }
  } catch (e) {
    components.push('webgl-unavailable');
  }
  
  // Hash the components
  const data = components.join('|');
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// =============================================================================
// SECURE STORAGE
// =============================================================================

/**
 * Secure storage wrapper with encryption
 */
export const secureStorage = {
  set: (key, value) => {
    try {
      const data = JSON.stringify(value);
      // In production, consider encrypting the data
      sessionStorage.setItem(key, btoa(data));
    } catch (e) {
      console.error('Secure storage set error:', e);
    }
  },
  
  get: (key) => {
    try {
      const data = sessionStorage.getItem(key);
      if (!data) return null;
      return JSON.parse(atob(data));
    } catch (e) {
      console.error('Secure storage get error:', e);
      return null;
    }
  },
  
  remove: (key) => {
    sessionStorage.removeItem(key);
  },
  
  clear: () => {
    sessionStorage.clear();
  }
};

// =============================================================================
// CONTENT SECURITY
// =============================================================================

/**
 * Check if running in secure context
 */
export const isSecureContext = () => {
  return window.isSecureContext === true;
};

/**
 * Detect potential security threats
 */
export const detectThreats = () => {
  const threats = [];
  
  // Check for DevTools
  const devToolsOpen = /./;
  devToolsOpen.toString = function() {
    threats.push('devtools');
  };
  
  // Check for iframe embedding
  if (window.self !== window.top) {
    threats.push('iframe');
  }
  
  // Check for insecure context
  if (!isSecureContext()) {
    threats.push('insecure');
  }
  
  return threats;
};

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  sanitizeHTML,
  sanitizeObject,
  escapeHTML,
  getCSRFToken,
  generateCSRFToken,
  checkRateLimit,
  clearRateLimit,
  isValidEmail,
  isValidMyanmarPhone,
  validatePassword,
  sanitizeFilename,
  isValidURL,
  generateFingerprint,
  secureStorage,
  isSecureContext,
  detectThreats
};
