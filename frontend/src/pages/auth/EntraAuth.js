/**
 * EntraAuth.js - Microsoft Entra ID (Azure AD) Authentication
 * Enterprise SSO for eSIM Myanmar Management Portal
 * 
 * Tenant ID: 370dd52c-929e-4fcd-aee3-fb5181eff2b7
 * Client ID: 00f56c44-2d00-4378-bb52-1417c208fcfd
 * Redirect URI: https://www.esim.com.mm/auth
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// Microsoft Entra ID Configuration
const MSAL_CONFIG = {
  clientId: '00f56c44-2d00-4378-bb52-1417c208fcfd',
  tenantId: '370dd52c-929e-4fcd-aee3-fb5181eff2b7',
  redirectUri: 'https://www.esim.com.mm/auth',
  authority: 'https://login.microsoftonline.com/370dd52c-929e-4fcd-aee3-fb5181eff2b7',
  scopes: ['openid', 'profile', 'email', 'User.Read'],
  endpoints: {
    authorize: 'https://login.microsoftonline.com/370dd52c-929e-4fcd-aee3-fb5181eff2b7/oauth2/v2.0/authorize',
    token: 'https://login.microsoftonline.com/370dd52c-929e-4fcd-aee3-fb5181eff2b7/oauth2/v2.0/token',
    logout: 'https://login.microsoftonline.com/370dd52c-929e-4fcd-aee3-fb5181eff2b7/oauth2/v2.0/logout'
  }
};

// Generate random state for CSRF protection
const generateState = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Generate PKCE code verifier and challenge
const generatePKCE = async () => {
  const verifier = generateState();
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  const challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return { verifier, challenge };
};

const EntraAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Handle OAuth callback
  const handleCallback = useCallback(async () => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (errorParam) {
      setError(`${errorParam}: ${errorDescription}`);
      return;
    }

    if (code) {
      setLoading(true);
      const savedState = sessionStorage.getItem('msal_state');
      const codeVerifier = sessionStorage.getItem('msal_code_verifier');

      if (state !== savedState) {
        setError('State mismatch - possible CSRF attack');
        setLoading(false);
        return;
      }

      try {
        // Exchange code for tokens
        const tokenResponse = await fetch(MSAL_CONFIG.endpoints.token, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: MSAL_CONFIG.clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: MSAL_CONFIG.redirectUri,
            code_verifier: codeVerifier,
            scope: MSAL_CONFIG.scopes.join(' ')
          })
        });

        if (!tokenResponse.ok) {
          throw new Error('Token exchange failed');
        }

        const tokens = await tokenResponse.json();
        
        // Get user info from Microsoft Graph
        const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`
          }
        });

        if (graphResponse.ok) {
          const user = await graphResponse.json();
          setUserInfo(user);
          
          // Store tokens and login
          localStorage.setItem('entra_access_token', tokens.access_token);
          localStorage.setItem('entra_id_token', tokens.id_token);
          if (tokens.refresh_token) {
            localStorage.setItem('entra_refresh_token', tokens.refresh_token);
          }

          // Login to app with Entra user
          await login({
            email: user.mail || user.userPrincipalName,
            full_name: user.displayName,
            provider: 'microsoft',
            entra_id: user.id
          });

          // Redirect to dashboard
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        sessionStorage.removeItem('msal_state');
        sessionStorage.removeItem('msal_code_verifier');
      }
    }
  }, [searchParams, login, navigate]);

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  // Initiate Microsoft login
  const handleMicrosoftLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const state = generateState();
      const { verifier, challenge } = await generatePKCE();

      sessionStorage.setItem('msal_state', state);
      sessionStorage.setItem('msal_code_verifier', verifier);

      const authUrl = new URL(MSAL_CONFIG.endpoints.authorize);
      authUrl.searchParams.set('client_id', MSAL_CONFIG.clientId);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('redirect_uri', MSAL_CONFIG.redirectUri);
      authUrl.searchParams.set('scope', MSAL_CONFIG.scopes.join(' '));
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('code_challenge', challenge);
      authUrl.searchParams.set('code_challenge_method', 'S256');
      authUrl.searchParams.set('response_mode', 'query');
      authUrl.searchParams.set('prompt', 'select_account');

      window.location.href = authUrl.toString();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('entra_access_token');
    localStorage.removeItem('entra_id_token');
    localStorage.removeItem('entra_refresh_token');
    
    const logoutUrl = new URL(MSAL_CONFIG.endpoints.logout);
    logoutUrl.searchParams.set('post_logout_redirect_uri', 'https://www.esim.com.mm');
    
    window.location.href = logoutUrl.toString();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="glass-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-background" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.5 2.5H2.5V11.5H11.5V2.5Z" />
                <path d="M21.5 2.5H12.5V11.5H21.5V2.5Z" />
                <path d="M11.5 12.5H2.5V21.5H11.5V12.5Z" />
                <path d="M21.5 12.5H12.5V21.5H21.5V12.5Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              eSIM Enterprise Portal
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in with your Microsoft account
            </p>
          </div>

          {/* Success State */}
          {userInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-6"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Welcome, {userInfo.displayName}</h2>
              <p className="text-gray-400 text-sm mb-4">{userInfo.mail || userInfo.userPrincipalName}</p>
              <p className="text-primary text-sm">Redirecting to dashboard...</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && !userInfo && (
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400">Authenticating...</p>
            </div>
          )}

          {/* Login Button */}
          {!loading && !userInfo && (
            <div className="space-y-4">
              <button
                onClick={handleMicrosoftLogin}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                </svg>
                Sign in with Microsoft
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-gray-400">or</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="w-full btn-secondary"
              >
                Sign in with Email
              </button>
            </div>
          )}

          {/* Logout Button (when logged in) */}
          {userInfo && (
            <button
              onClick={handleLogout}
              className="w-full btn-secondary mt-4"
            >
              Sign out
            </button>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Protected by Microsoft Entra ID
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Tenant: igsim.onmicrosoft.com
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EntraAuth;
