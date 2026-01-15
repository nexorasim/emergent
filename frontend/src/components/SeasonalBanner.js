/**
 * SeasonalBanner.js - Premium Holiday Banner Component
 * Enterprise-grade seasonal messaging with glassmorphism
 * Active: December 15, 2025 - January 31, 2026
 * Zero emoji - Professional enterprise design
 */

import React, { useState, useEffect } from 'react';

const SEASONAL_CONFIG = {
  startDate: new Date('2024-01-01T00:00:00'),
  endDate: new Date('2027-12-31T23:59:59'),
  anniversaryDate: new Date('2026-01-15T00:00:00'),
  enabled: true
};

const isSeasonalActive = () => {
  if (!SEASONAL_CONFIG.enabled) return false;
  const now = new Date();
  return now >= SEASONAL_CONFIG.startDate && now < SEASONAL_CONFIG.endDate;
};

const getSeasonalMessage = () => {
  return {
    title: 'Celebrating 4th Anniversary',
    subtitle: 'Get your free eSIM - iOS & Android supported',
    icon: 'star'
  };
};

const SeasonalBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('seasonal-banner-dismissed');
    if (stored === 'true') {
      setDismissed(true);
    }
    
    // Stop shimmer animation after 10 seconds for performance
    const timer = setTimeout(() => setIsAnimating(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('seasonal-banner-dismissed', 'true');
  };

  if (!isSeasonalActive() || dismissed) return null;

  const message = getSeasonalMessage();

  const IconComponent = () => {
    if (message.icon === 'star') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    );
  };

  return (
    <div
      className="seasonal-banner"
      data-testid="seasonal-banner"
      role="banner"
      aria-label="Seasonal greeting"
      style={{
        background: 'linear-gradient(90deg, rgba(30, 47, 60, 0.98) 0%, rgba(42, 74, 92, 0.98) 50%, rgba(30, 47, 60, 0.98) 100%)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.25)',
        padding: '14px 24px',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Animated accent lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
          animation: isAnimating ? 'bannerSlide 4s ease-in-out infinite' : 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)'
        }}
      />

      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          position: 'relative'
        }}
      >
        {/* Icon with glow */}
        <div
          style={{
            width: '40px',
            height: '40px',
            background: 'rgba(0, 255, 255, 0.1)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 255, 255, 0.25)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.15)',
            flexShrink: 0
          }}
        >
          <IconComponent />
        </div>

        {/* Message */}
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              color: '#00FFFF',
              fontWeight: '700',
              fontSize: '15px',
              letterSpacing: '0.02em',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
          >
            {message.title}
          </span>
          <span
            style={{
              color: '#F8F9FA',
              fontSize: '14px',
              marginLeft: '12px',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            {message.subtitle}
          </span>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss seasonal banner"
          data-testid="banner-dismiss-btn"
          style={{
            position: 'absolute',
            right: '0',
            background: 'rgba(0, 255, 255, 0.08)',
            border: '1px solid rgba(0, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.4)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F8F9FA" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes bannerSlide {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @media (max-width: 768px) {
          .seasonal-banner > div > div:nth-child(2) span:last-child {
            display: none;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .seasonal-banner * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalBanner;
