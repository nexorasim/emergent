/**
 * Navigation.js - Premium Enterprise Navigation
 * 2026 UI/UX Design with glassmorphism
 * Zero emoji - Professional enterprise design
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { isSeasonalActive } from '../utils/seasonalConfig';
import Logo from './Logo';
import Countdown2026 from './Countdown2026';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/anniversary', label: '4th Anniversary', highlight: true, special: true },
    { path: '/anniversary', label: t?.getFreeEsim || 'Get Free eSIM', highlight: true },
    { path: '/features', label: t?.features || 'Features' },
    { path: '/coverage', label: t?.coverage || 'Coverage' },
    { path: '/support', label: t?.support || 'Support' },
    { path: '/partners', label: t?.partners || 'Partners' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}
      role="navigation" 
      aria-label="Main navigation"
      style={{
        background: scrolled 
          ? 'rgba(30, 47, 60, 0.95)' 
          : 'rgba(30, 47, 60, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 group" 
            aria-label="eSIM Myanmar Home"
          >
            <Logo size="default" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-cyan-400' 
                    : link.special
                      ? 'text-purple-400 font-semibold'
                      : link.highlight 
                        ? 'text-cyan-400 font-semibold' 
                        : 'text-gray-300 hover:text-white'
                }`}
                style={
                  isActive(link.path) 
                    ? { background: 'rgba(0, 255, 255, 0.1)' } 
                    : link.special
                      ? { background: 'rgba(139, 92, 246, 0.1)' }
                      : {}
                }
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button 
              onClick={() => changeLanguage(language === 'en' ? 'mm' : 'en')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-cyan-400 transition-colors"
              aria-label={`Switch to ${language === 'en' ? 'Myanmar' : 'English'} language`}
            >
              {language === 'en' ? 'MM' : 'EN'}
            </button>

            {/* Seasonal Countdown (compact) */}
            {isSeasonalActive() && (
              <div className="ml-2">
                <Countdown2026 compact />
              </div>
            )}
            
            {/* CTA Section (No login/register) */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
              <Link 
                to="/anniversary" 
                className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 100%)',
                  color: '#1e2f3c',
                  boxShadow: '0 4px 16px rgba(0, 255, 255, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t?.getFreeEsim || 'Get Free eSIM'}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: mobileMenuOpen ? 'rgba(0, 255, 255, 0.1)' : 'transparent' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="lg:hidden"
          style={{
            background: 'rgba(30, 47, 60, 0.98)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(0, 255, 255, 0.1)'
          }}
          role="menu"
        >
          <div className="container mx-auto px-4 py-4">
            {/* Seasonal Countdown for Mobile */}
            {isSeasonalActive() && (
              <div className="mb-4 pb-4 border-b border-white/10">
                <Countdown2026 compact />
              </div>
            )}
            
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : link.special
                        ? 'text-purple-400 bg-purple-400/10'
                        : link.highlight
                          ? 'text-cyan-400'
                          : 'text-white hover:text-cyan-400 hover:bg-white/5'
                  }`}
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4 mt-4 space-y-1">
              <Link 
                to="/anniversary" 
                className="block py-3 px-4 rounded-lg text-sm font-semibold text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t?.getFreeEsim || 'Get Free eSIM'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
