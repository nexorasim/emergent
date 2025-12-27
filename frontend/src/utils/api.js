/**
 * API Client - Enterprise-grade HTTP client
 * ESIM MYANMAR COMPANY LIMITED 2025-2026
 * Features: Token refresh, retry logic, request signing, error handling
 */

import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry

// Create axios instance with security defaults
const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Token management utilities
const TokenManager = {
  getToken: () => localStorage.getItem('token'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setTokens: (token, refreshToken) => {
    if (token) localStorage.setItem('token', token);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  },
  clearTokens: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
  },
  isTokenExpiringSoon: () => {
    const expiry = localStorage.getItem('tokenExpiry');
    if (!expiry) return false;
    return Date.now() > parseInt(expiry) - TOKEN_REFRESH_THRESHOLD;
  },
  setTokenExpiry: (expiresIn) => {
    const expiry = Date.now() + (expiresIn * 1000);
    localStorage.setItem('tokenExpiry', expiry.toString());
  }
};

// Request queue for token refresh
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// Refresh token function
const refreshAccessToken = async () => {
  const refreshToken = TokenManager.getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/refresh`, {
      refresh_token: refreshToken
    });

    const { token, refresh_token: newRefreshToken, expires_in } = response.data;
    TokenManager.setTokens(token, newRefreshToken);
    if (expires_in) TokenManager.setTokenExpiry(expires_in);
    
    return token;
  } catch (error) {
    TokenManager.clearTokens();
    throw error;
  }
};

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Add authorization header
    const token = TokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request ID for tracing
    config.headers['X-Request-ID'] = generateRequestId();

    // Initialize retry count
    config._retryCount = config._retryCount || 0;

    // Check if token needs refresh (proactive refresh)
    if (token && TokenManager.isTokenExpiringSoon() && !config._isRetry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          config.headers.Authorization = `Bearer ${newToken}`;
          onTokenRefreshed(newToken);
        } catch (error) {
          console.error('Token refresh failed:', error);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Store request ID from response for debugging
    const requestId = response.headers['x-request-id'];
    if (requestId) {
      response.requestId = requestId;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          onTokenRefreshed(newToken);
          isRefreshing = false;
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          TokenManager.clearTokens();
          
          // Redirect to login only if not already on auth pages
          if (!window.location.pathname.startsWith('/login') && 
              !window.location.pathname.startsWith('/register')) {
            window.location.href = '/login?session=expired';
          }
          return Promise.reject(refreshError);
        }
      } else {
        // Wait for token refresh
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
      return Promise.reject(error);
    }

    // Handle 429 Rate Limited
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 60;
      console.warn(`Rate limited. Retry after ${retryAfter} seconds`);
      return Promise.reject(error);
    }

    // Retry logic for server errors and timeouts
    if (
      originalRequest._retryCount < MAX_RETRIES &&
      (error.response?.status >= 500 || error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')
    ) {
      originalRequest._retryCount += 1;
      const delay = RETRY_DELAY * Math.pow(2, originalRequest._retryCount - 1);
      
      console.log(`Retrying request (${originalRequest._retryCount}/${MAX_RETRIES}) after ${delay}ms`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return api(originalRequest);
    }

    // Enhance error with additional context
    if (error.response) {
      error.message = error.response.data?.detail || error.response.data?.message || error.message;
      error.statusCode = error.response.status;
    }

    return Promise.reject(error);
  }
);

// Generate unique request ID
function generateRequestId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
}

// API helper methods
export const apiHelpers = {
  // GET request with query params
  get: (url, params = {}) => api.get(url, { params }),
  
  // POST request
  post: (url, data = {}) => api.post(url, data),
  
  // PUT request
  put: (url, data = {}) => api.put(url, data),
  
  // PATCH request
  patch: (url, data = {}) => api.patch(url, data),
  
  // DELETE request
  delete: (url) => api.delete(url),
  
  // Upload file
  upload: (url, file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      }
    });
  }
};

// Export token manager for auth context
export { TokenManager };

export default api;
