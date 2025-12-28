import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone_number') {
      const cleaned = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(09|\+?959)\d{7,9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain a number';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePhone(formData.phone_number)) {
      setError('Please enter a valid Myanmar phone number (e.g., 09xxxxxxxxx or 959xxxxxxxxx)');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      let phoneNumber = formData.phone_number;
      if (phoneNumber.startsWith('959')) {
        phoneNumber = '0' + phoneNumber.substring(3);
      }

      await register({
        full_name: formData.full_name,
        email: formData.email,
        phone_number: phoneNumber,
        password: formData.password,
        country: 'Myanmar'
      });
      navigate('/dashboard');
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        (err.code === 'ERR_NETWORK'
          ? 'Unable to connect to server. Please try again later.'
          : 'Registration failed. Please try again.');
      setError(errorMessage);
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
      data-testid="register-page"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(100, 149, 237, 0.15) 0%, transparent 50%)
        `,
          pointerEvents: 'none'
        }}
      />

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
            boxShadow:
              '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="text-center mb-8">
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
                <path d="M20 14V26M14 20H26" stroke="#1e2f3c" strokeWidth="4" strokeLinecap="round" />
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
              Create Account
            </h1>
            <p className="text-base text-gray-300 font-medium">Join 50M+ users on eSIM Myanmar</p>
          </div>

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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-gray-200 mb-2">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300"
                style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
                onFocus={(e) => (e.target.style.border = '2px solid #00FFFF')}
                onBlur={(e) => (e.target.style.border = '2px solid rgba(0, 255, 255, 0.2)')}
                placeholder="Your full name"
                autoComplete="name"
                data-testid="register-name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
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
                data-testid="register-email"
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-200 mb-2">
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300"
                style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
                onFocus={(e) => (e.target.style.border = '2px solid #00FFFF')}
                onBlur={(e) => (e.target.style.border = '2px solid rgba(0, 255, 255, 0.2)')}
                placeholder="09xxxxxxxxx or 959xxxxxxxxx"
                autoComplete="tel"
                data-testid="register-phone"
              />
              <p className="text-xs text-gray-400 mt-2 font-medium">Myanmar mobile number (8-10 digits)</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-4 pr-14 rounded-2xl text-base outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(0, 255, 255, 0.05)',
                    border: '2px solid rgba(0, 255, 255, 0.2)',
                    color: '#FFFFFF'
                  }}
                  onFocus={(e) => (e.target.style.border = '2px solid #00FFFF')}
                  onBlur={(e) => (e.target.style.border = '2px solid rgba(0, 255, 255, 0.2)')}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  data-testid="register-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00FFFF] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">Min 8 characters with uppercase, lowercase, and number</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300"
                style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
                onFocus={(e) => (e.target.style.border = '2px solid #00FFFF')}
                onBlur={(e) => (e.target.style.border = '2px solid rgba(0, 255, 255, 0.2)')}
                placeholder="Confirm your password"
                autoComplete="new-password"
                data-testid="register-confirm-password"
              />
            </div>

            <div className="flex items-start gap-3 pt-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-5 w-5 rounded-lg mt-0.5"
                style={{ accentColor: '#00FFFF' }}
              />
              <label htmlFor="terms" className="text-sm text-gray-300 font-medium">
                I agree to the{' '}
                <Link to="/terms" className="font-bold" style={{ color: '#00FFFF' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="font-bold" style={{ color: '#00FFFF' }}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 mt-8"
              style={{
                background: loading ? 'rgba(0, 255, 255, 0.5)' : 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                color: '#0a1520',
                boxShadow: loading ? 'none' : '0 8px 32px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)',
                transform: loading ? 'scale(0.98)' : 'scale(1)'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => !loading && (e.target.style.transform = 'scale(1)')}
              data-testid="register-submit-btn"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-base text-gray-300 font-medium">
              Already have an account?{' '}
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

export default RegisterPage;
