import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3" aria-label="eSIM Myanmar Home">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <span className="text-lg sm:text-2xl font-bold text-background">e</span>
            </div>
            <span className="text-base sm:text-lg font-bold gradient-text">eSIM Myanmar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link to="/esim-register" className="nav-link text-primary font-semibold">Get eSIM</Link>
            <Link to="/plans" className="nav-link">{t.plans}</Link>
            <Link to="/features" className="nav-link">{t.features}</Link>
            <Link to="/coverage" className="nav-link">{t.coverage}</Link>
            <Link to="/support" className="nav-link">{t.support}</Link>
            <Link to="/partners" className="nav-link">{t.partners}</Link>
            
            <button 
              onClick={() => changeLanguage(language === 'en' ? 'mm' : 'en')}
              className="nav-link font-semibold"
              aria-label={`Switch to ${language === 'en' ? 'Myanmar' : 'English'} language`}
            >
              {language === 'en' ? 'MM' : 'EN'}
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-2">
                <Link to="/dashboard" className="nav-link">
                  {t.dashboard}
                </Link>
                <span className="text-xs text-gray-300 hidden xl:inline">{user?.full_name}</span>
                <button onClick={handleLogout} className="btn-primary h-9 px-4 text-xs">
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/login" className="nav-link">{t.login}</Link>
                <Link to="/register" className="btn-primary h-9 px-4 text-xs">{t.getStarted}</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
          className="lg:hidden glass-effect border-t border-primary/20"
          role="menu"
        >
          <div className="container py-4 space-y-1">
            <Link 
              to="/esim-register" 
              className="block py-3 px-4 text-sm text-primary font-semibold rounded-lg hover:bg-white/5 transition-colors"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get eSIM
            </Link>
            <Link 
              to="/plans" 
              className="block py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Plans
            </Link>
            <Link 
              to="/features" 
              className="block py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/coverage" 
              className="block py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Coverage
            </Link>
            <Link 
              to="/support" 
              className="block py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              to="/partners" 
              className="block py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partners
            </Link>
            
            <div className="border-t border-white/10 pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                    role="menuitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full text-left py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block py-3 px-4 text-sm text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                    role="menuitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-3 px-4 text-sm text-primary font-semibold hover:bg-white/5 rounded-lg transition-colors"
                    role="menuitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;