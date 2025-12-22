/**
 * Logo.js - Official eSIM Myanmar Logo
 * ESIM MYANMAR COMPANY LIMITED
 * Gradient: #00FFFF (Cyan) to #007FFF (Azure Blue)
 * Copyright 2025-2026 - All rights reserved
 */

import React from 'react';

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  const sizes = {
    small: { icon: 32, text: 14, sub: 7 },
    default: { icon: 44, text: 20, sub: 9 },
    large: { icon: 60, text: 28, sub: 11 },
    xlarge: { icon: 80, text: 36, sub: 14 }
  };

  const { icon: iconSize, text: textSize, sub: subSize } = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-3 ${className}`} data-testid="esim-logo">
      {/* Logo Icon - Gradient from cyan to azure */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: iconSize * 0.22,
          background: 'linear-gradient(135deg, #00FFFF 0%, #00BFFF 50%, #007FFF 100%)',
          boxShadow: '0 4px 24px rgba(0, 255, 255, 0.4), 0 2px 8px rgba(0, 127, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Shine effect */}
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            width: '35%',
            height: '35%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
            borderRadius: '50%',
            filter: 'blur(3px)'
          }}
        />
        {/* Logo letter */}
        <span
          style={{
            fontSize: iconSize * 0.52,
            fontWeight: 800,
            color: '#1e2f3c',
            fontFamily: 'Inter, system-ui, sans-serif',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.2)'
          }}
        >
          e
        </span>
      </div>

      {/* Logo Text */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: textSize,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00FFFF 0%, #00BFFF 50%, #007FFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            eSIM Myanmar
          </div>
          <div
            style={{
              fontSize: subSize,
              color: '#9CA3AF',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: 2
            }}
          >
            Entertainment Server
          </div>
        </div>
      )}
    </div>
  );
};

// Icon-only SVG for favicon
export const LogoIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="50%" stopColor="#00BFFF"/>
        <stop offset="100%" stopColor="#007FFF"/>
      </linearGradient>
      <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00FFFF" floodOpacity="0.4"/>
      </filter>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#logoGradient)" filter="url(#logoGlow)"/>
    <ellipse cx="28" cy="28" rx="15" ry="12" fill="rgba(255,255,255,0.3)" style={{filter: 'blur(8px)'}}/>
    <text x="50" y="68" fontSize="54" fontWeight="800" fill="#1e2f3c" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">e</text>
  </svg>
);

// Full SVG logo for exports
export const LogoSVG = ({ width = 240 }) => (
  <svg width={width} height={width * 0.3} viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="50%" stopColor="#00BFFF"/>
        <stop offset="100%" stopColor="#007FFF"/>
      </linearGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="50%" stopColor="#00BFFF"/>
        <stop offset="100%" stopColor="#007FFF"/>
      </linearGradient>
      <filter id="iconGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00FFFF" floodOpacity="0.4"/>
      </filter>
    </defs>
    <rect x="6" y="6" width="60" height="60" rx="14" fill="url(#iconGrad)" filter="url(#iconGlow)"/>
    <text x="36" y="48" fontSize="34" fontWeight="800" fill="#1e2f3c" textAnchor="middle" fontFamily="Inter">e</text>
    <text x="82" y="38" fontSize="24" fontWeight="700" fill="url(#textGrad)" fontFamily="Inter">eSIM Myanmar</text>
    <text x="82" y="56" fontSize="10" fontWeight="600" fill="#9CA3AF" letterSpacing="1" fontFamily="Inter">ENTERTAINMENT SERVER</text>
  </svg>
);

export default Logo;
