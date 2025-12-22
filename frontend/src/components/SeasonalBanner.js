/**
 * SeasonalBanner.js - Holiday Banner Component
 * Enterprise-grade seasonal messaging
 * Active: December 15, 2025 - January 31, 2026
 */

import React, { useState, useEffect } from 'react';

const SEASONAL_CONFIG = {
  startDate: new Date('2025-12-15T00:00:00'),
  endDate: new Date('2026-02-01T00:00:00'),
  newYearDate: new Date('2026-01-01T00:00:00'),
  enabled: true
};

const isSeasonalActive = () => {
  if (!SEASONAL_CONFIG.enabled) return false;
  const now = new Date();
  return now >= SEASONAL_CONFIG.startDate && now < SEASONAL_CONFIG.endDate;
};

const getSeasonalMessage = () => {
  const now = new Date();
  if (now >= SEASONAL_CONFIG.newYearDate) {
    return {
      title: 'Happy New Year 2026',
      subtitle: 'Wishing you seamless connectivity in the new year'
    };
  }
  return {
    title: 'Season Greetings',
    subtitle: 'Celebrating the holidays with enterprise connectivity'
  };
};

const SeasonalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('seasonal-banner-dismissed');
    if (stored === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('seasonal-banner-dismissed', 'true');
  };

  if (!isSeasonalActive() || dismissed || !isVisible) return null;

  const message = getSeasonalMessage();

  return (
    <div
      className="seasonal-banner-wrapper"
      style={{
        background: 'linear-gradient(90deg, #1e2f3c 0%, #2a4a5c 50%, #1e2f3c 100%)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
        padding: '12px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
          animation: 'bannerSlide 3s ease-in-out infinite'
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
        {/* Icon */}
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'rgba(0, 255, 255, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 255, 255, 0.3)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>

        {/* Message */}
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              color: '#00FFFF',
              fontWeight: '700',
              fontSize: '14px',
              letterSpacing: '0.02em'
            }}
          >
            {message.title}
          </span>
          <span
            style={{
              color: '#F8F9FA',
              fontSize: '14px',
              marginLeft: '8px',
              opacity: 0.9
            }}
          >
            {message.subtitle}
          </span>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss seasonal banner"
          style={{
            position: 'absolute',
            right: '0',
            background: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 255, 255, 0.1)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F8F9FA" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes bannerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .seasonal-banner-wrapper * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalBanner;
