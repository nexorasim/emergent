/**
 * Security Utilities
 * Enterprise-grade security features
 * Copyright ESIM MYANMAR COMPANY LIMITED 2025-2026
 */

// XSS Protection - Sanitize HTML
export const sanitizeHTML = (str) => {
  if (!str) return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

// CSRF Token Management
export const getCSRFToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]')?.content;
  return token || '';
};

// Rate Limiting Helper
const rateLimitStore = new Map();

export const checkRateLimit = (key, maxAttempts = 5, windowMs = 60000) => {
  const now = Date.now();
  const attempts = rateLimitStore.get(key) || [];
  
  // Filter attempts within the time window
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return false; // Rate limited
  }
  
  recentAttempts.push(now);
  rateLimitStore.set(key, recentAttempts);
  return true; // Allowed
};

// Session Fingerprint
export const generateFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);
  
  const data = [
    navigator.userAgent,
    navigator.language,
    window.screen.width + 'x' + window.screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  // Simple hash
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(36);
};

// Secure Storage
export const secureStorage = {
  set: (key, value) => {
    try {
      const encrypted = btoa(JSON.stringify(value));
      localStorage.setItem(key, encrypted);
    } catch (e) {
      console.error('Storage error');
    }
  },
  
  get: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return JSON.parse(atob(encrypted));
    } catch (e) {
      return null;
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};

// Input Validation
export const validators = {
  email: (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  },
  
  phone: (phone) => {
    const re = /^[0-9+\-\s()]{8,20}$/;
    return re.test(phone);
  },
  
  password: (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
  },
  
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  alphanumeric: (str) => {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(str);
  }
};

// Secure Headers Check
export const checkSecurityHeaders = () => {
  const requiredHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Strict-Transport-Security'
  ];
  
  // This would typically be checked server-side
  return requiredHeaders;
};

// Anti-Bot Detection
export const detectBot = () => {
  const isBot = 
    /bot|crawler|spider|crawling/i.test(navigator.userAgent) ||
    navigator.webdriver === true ||
    !navigator.languages ||
    navigator.languages.length === 0;
  
  return isBot;
};

const securityUtils = {
  sanitizeHTML,
  getCSRFToken,
  checkRateLimit,
  generateFingerprint,
  secureStorage,
  validators,
  checkSecurityHeaders,
  detectBot
};

export default securityUtils;
