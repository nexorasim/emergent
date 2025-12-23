/**
 * EntraAuth.js - Microsoft Entra ID Authentication
 * eSIM Enterprise Management Portal
 * 
 * Tenant ID: 370dd52c-929e-4fcd-aee3-fb5181eff2b7
 * Client ID: 00f56c44-2d00-4378-bb52-1417c208fcfd
 * Redirect URI: https://www.esim.com.mm/auth
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Microsoft Entra ID Configuration
const ENTRA_CONFIG = {
  tenantId: '370dd52c-929e-4fcd-aee3-fb5181eff2b7',
  clientId: '00f56c44-2d00-4378-bb52-1417c208fcfd',
  redirectUri: 'https://www.esim.com.mm/auth',
  scopes: ['openid', 'profile', 'email', 'User.Read'],
  
  // Endpoints
  authorizeEndpoint: 'https://login.microsoftonline.com/370dd52c-929e-4fcd-aee3-fb5181eff2b7/oauth2/v2.0/authorize',
  tokenEndpoint: 'https://login.microsoftonline.com/370dd52c-929e-4fcd-aee3-fb5181eff2b7/oauth2/v2.0/token',
  graphEndpoint: 'https://graph.microsoft.com/v1.0/me',
  openIdConfig: 'https://login.microsoftonline.com/370dd52c-929e-4fcd-aee3-fb5181eff2b7/v2.0/.well-known/openid-configuration'
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

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
      
      // Verify state
      const savedState = sessionStorage.getItem('entra_state');
      if (state !== savedState) {
        setError('State mismatch - possible CSRF attack');
        setLoading(false);
        return;
      }

      try {
        // Get code verifier for PKCE
        const codeVerifier = sessionStorage.getItem('entra_code_verifier');
        
        // Exchange code for token
        const tokenResponse = await fetch(ENTRA_CONFIG.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: ENTRA_CONFIG.clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: ENTRA_CONFIG.redirectUri,
            code_verifier: codeVerifier
          })
        });

        if (!tokenResponse.ok) {
          throw new Error('Token exchange failed');
        }

        const tokens = await tokenResponse.json();
        
        // Store tokens
        localStorage.setItem('entra_access_token', tokens.access_token);
        if (tokens.refresh_token) {
          localStorage.setItem('entra_refresh_token', tokens.refresh_token);
        }
        localStorage.setItem('entra_id_token', tokens.id_token);

        // Fetch user profile from Microsoft Graph
        const userResponse = await fetch(ENTRA_CONFIG.graphEndpoint, {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          localStorage.setItem('entra_user', JSON.stringify(userData));
          
          // Clear session storage
          sessionStorage.removeItem('entra_state');
          sessionStorage.removeItem('entra_code_verifier');
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  // Initiate login
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Generate PKCE
      const { verifier, challenge } = await generatePKCE();
      const state = generateState();

      // Store for callback verification
      sessionStorage.setItem('entra_state', state);
      sessionStorage.setItem('entra_code_verifier', verifier);

      // Build authorization URL
      const authUrl = new URL(ENTRA_CONFIG.authorizeEndpoint);
      authUrl.searchParams.set('client_id', ENTRA_CONFIG.clientId);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('redirect_uri', ENTRA_CONFIG.redirectUri);
      authUrl.searchParams.set('scope', ENTRA_CONFIG.scopes.join(' '));
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('code_challenge', challenge);
      authUrl.searchParams.set('code_challenge_method', 'S256');
      authUrl.searchParams.set('response_mode', 'query');

      // Redirect to Microsoft login
      window.location.href = authUrl.toString();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('entra_access_token');
    localStorage.removeItem('entra_refresh_token');
    localStorage.removeItem('entra_id_token');
    localStorage.removeItem('entra_user');
    setUser(null);
    
    // Redirect to Microsoft logout
    const logoutUrl = `https://login.microsoftonline.com/${ENTRA_CONFIG.tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(ENTRA_CONFIG.redirectUri)}`;
    window.location.href = logoutUrl;
  };

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('entra_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card text-center"
        >
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <svg className="w-10 h-10 text-background" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              eSIM Enterprise Portal
            </h1>
            <p className="text-gray-400 text-sm">
              Microsoft Entra ID Authentication
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* User Profile (if logged in) */}
          {user ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm mb-2">Authenticated Successfully</p>
                <p className="text-white font-semibold">{user.displayName}</p>
                <p className="text-gray-400 text-sm">{user.mail || user.userPrincipalName}</p>
              </div>

              <div className="text-left space-y-2 p-4 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-500">User ID</p>
                <p className="text-sm text-gray-300 font-mono break-all">{user.id}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 btn-primary"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 btn-secondary"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 21 21" fill="currentColor">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                  </svg>
                )}
                {loading ? 'Signing in...' : 'Sign in with Microsoft'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Alternative Login */}
              <button
                onClick={() => navigate('/login')}
                className="w-full btn-secondary"
              >
                Sign in with Email
              </button>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-2">
              Enterprise Single Sign-On
            </p>
            <p className="text-xs text-gray-600">
              Tenant: {ENTRA_CONFIG.tenantId.substring(0, 8)}...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EntraAuth;
