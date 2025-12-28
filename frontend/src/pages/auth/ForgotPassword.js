import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Unable to process request. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4"
      style={{
        background: 'linear-gradient(135deg, #0a1520 0%, #1e2f3c 50%, #0a1520 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(100, 149, 237, 0.15) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.7) 0%, rgba(22, 36, 48, 0.8) 100%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                boxShadow: '0 8px 32px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)'
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 12V16M20 24H20.02M12 8H28C29.1046 8 30 8.89543 30 10V30C30 31.1046 29.1046 32 28 32H12C10.8954 32 10 31.1046 10 30V10C10 8.89543 10.8954 8 12 8Z"
                  stroke="#1e2f3c"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            <h1
              className="text-3xl sm:text-4xl font-black mb-3"
              style={{
                background: 'linear-gradient(135deg, #00FFFF 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              Reset Password
            </h1>
            <p className="text-base text-gray-300 font-medium">
              {success
                ? 'Check your email for reset instructions'
                : 'Enter your email to receive a password reset link'}
            </p>
          </div>

          {!success ? (
            <>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl text-sm font-medium"
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#FF6B6B',
                    backdropFilter: 'blur(10px)'
                  }}
                  role="alert"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(0, 255, 255, 0.05)',
                      border: '2px solid rgba(0, 255, 255, 0.2)',
                      color: '#FFFFFF'
                    }}
                    onFocus={(e) => (e.target.style.border = '2px solid #00FFFF')}
                    onBlur={(e) => (e.target.style.border = '2px solid rgba(0, 255, 255, 0.2)')}
                    placeholder="your@email.com"
                    autoComplete="email"
                    data-testid="forgot-email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 mt-8"
                  style={{
                    background: loading
                      ? 'rgba(0, 255, 255, 0.5)'
                      : 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                    color: '#0a1520',
                    boxShadow: loading
                      ? 'none'
                      : '0 8px 32px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)',
                    transform: loading ? 'scale(0.98)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => !loading && (e.target.style.transform = 'scale(1)')}
                  data-testid="forgot-submit-btn"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="inline-block p-6 rounded-full"
                style={{ background: 'rgba(0, 255, 255, 0.1)', border: '2px solid #00FFFF' }}
              >
                <svg className="w-16 h-16 text-[#00FFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                <p className="text-gray-300">
                  We've sent password reset instructions to <strong style={{ color: '#00FFFF' }}>{email}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl" style={{ background: 'rgba(0, 255, 255, 0.05)' }}>
                <p className="text-sm text-gray-400">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail('');
                    }}
                    className="font-semibold hover:underline"
                    style={{ color: '#00FFFF' }}
                  >
                    try again
                  </button>
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-base text-gray-300 font-medium">
              Remember your password?{' '}
              <Link to="/login" className="font-bold hover:underline" style={{ color: '#00FFFF' }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8 font-medium">
          2025-2026 eSIM MYANMAR COMPANY LIMITED. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
