/**
 * AuthContext - Enterprise Authentication Context
 * ESIM MYANMAR COMPANY LIMITED 2025-2026
 * Features: Token refresh, session management, 2FA support
 */

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import api, { TokenManager } from '../utils/api';

const AuthContext = createContext();

// Session timeout (30 minutes of inactivity)
const SESSION_TIMEOUT = 30 * 60 * 1000;
const TOKEN_CHECK_INTERVAL = 60 * 1000; // Check token every minute

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const [sessionExpiring, setSessionExpiring] = useState(false);
  
  const lastActivityRef = useRef(Date.now());
  const sessionTimeoutRef = useRef(null);
  const tokenCheckRef = useRef(null);

  // Track user activity
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSessionExpiring(false);
  }, []);

  // Logout function
  const logout = useCallback(async (reason = null) => {
    try {
      // Notify server of logout
      await api.post('/auth/logout').catch(() => {});
    } finally {
      TokenManager.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      setRequires2FA(false);
      setSessionExpiring(false);

      if (reason) {
        // Store logout reason for display on login page
        sessionStorage.setItem('logoutReason', reason);
      }
    }
  }, []);

  // Check session timeout
  const checkSession = useCallback(() => {
    if (!isAuthenticated) return;
    
    const inactiveTime = Date.now() - lastActivityRef.current;
    
    if (inactiveTime > SESSION_TIMEOUT) {
      // Session expired due to inactivity
      logout('Session expired due to inactivity');
    } else if (inactiveTime > SESSION_TIMEOUT - 5 * 60 * 1000) {
      // Warn user 5 minutes before expiry
      setSessionExpiring(true);
    }
  }, [isAuthenticated, logout]);

  // Extend session
  const extendSession = useCallback(() => {
    updateActivity();
    setSessionExpiring(false);
  }, [updateActivity]);

  // Setup 2FA
  const setup2FA = async (password) => {
    const response = await api.post('/auth/2fa/setup', { password });
    return response.data;
  };

  // Verify 2FA setup
  const verify2FASetup = async (code, secret) => {
    const response = await api.post('/auth/2fa/verify', { code, secret });
    if (response.data.success) {
      setUser(prev => ({ ...prev, two_factor_enabled: true }));
    }
    return response.data;
  };

  // Disable 2FA
  const disable2FA = async (password, code) => {
    const response = await api.post('/auth/2fa/disable', { password, code });
    if (response.data.success) {
      setUser(prev => ({ ...prev, two_factor_enabled: false }));
    }
    return response.data;
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    setUser(response.data.user || response.data);
    return response.data;
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  };

  const value = {
    // State
    isAuthenticated,
    user,
    loading,
    requires2FA,
    sessionExpiring,
    
    // Auth methods
    login,
    register,
    logout,
    
    // Session management
    extendSession,
    updateActivity,
    
    // 2FA methods
    setup2FA,
    verify2FASetup,
    disable2FA,
    
    // Profile methods
    updateProfile,
    changePassword,
    
    // Utilities
    verifyToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
