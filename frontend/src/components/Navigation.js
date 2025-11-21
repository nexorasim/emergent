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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-background">e</span>
            </div>
            <span className="text-xl font-bold gradient-text">eSIM Myanmar</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/plans" className="nav-link">{t.plans}</Link>
            <Link to="/features" className="nav-link">{t.features}</Link>
            <Link to="/coverage" className="nav-link">{t.coverage}</Link>
            <Link to="/support" className="nav-link">{t.support}</Link>
            <Link to="/partners" className="nav-link">{t.partners}</Link>
            
            <button 
              onClick={() => changeLanguage(language === 'en' ? 'mm' : 'en')}
              className="nav-link text-sm font-semibold"
            >
              {language === 'en' ? 'MM' : 'EN'}
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="nav-link">
                  {t.dashboard}
                </Link>
                <span className="text-sm text-gray-300">{user?.full_name}</span>
                <button onClick={handleLogout} className="btn-primary text-sm">
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="nav-link">{t.login}</Link>
                <Link to="/register" className="btn-primary text-sm">{t.getStarted}</Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-primary/20">
          <div className="px-4 py-4 space-y-3">
            <Link to="/plans" className="block py-2 text-white hover:text-primary">Plans</Link>
            <Link to="/features" className="block py-2 text-white hover:text-primary">Features</Link>
            <Link to="/coverage" className="block py-2 text-white hover:text-primary">Coverage</Link>
            <Link to="/support" className="block py-2 text-white hover:text-primary">Support</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-white hover:text-primary">Dashboard</Link>
                <button onClick={handleLogout} className="w-full text-left py-2 text-white hover:text-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-white hover:text-primary">Login</Link>
                <Link to="/register" className="block py-2 text-white hover:text-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          @apply text-white hover:text-primary transition-colors duration-200;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;