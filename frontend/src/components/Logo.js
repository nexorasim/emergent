/**
 * Logo.js - Official eSIM Myanmar Logo
 * ESIM MYANMAR COMPANY LIMITED
 * Gradient: #00FFFF (Cyan) to #6495ED (Cornflower Blue)
 * Copyright 2025-2026 - All rights reserved
 * PROTECTED - Unauthorized copying prohibited
 */

import React from 'react';

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  const sizes = {
    small: { icon: 32, text: 14, sub: 6 },
    default: { icon: 44, text: 20, sub: 8 },
    large: { icon: 60, text: 28, sub: 10 },
    xlarge: { icon: 80, text: 36, sub: 12 }
  };

  const { icon: iconSize, text: textSize, sub: subSize } = sizes[size] || sizes.default;

  return (
    <div 
      className={`flex items-center gap-3 ${className}`} 
      data-testid="esim-myanmar-logo"
      data-protected="true"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Logo Icon - Official Gradient #00FFFF to #6495ED */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: iconSize * 0.22,
          background: 'linear-gradient(180deg, #00FFFF 0%, #00D4FF 35%, #6495ED 100%)',
          boxShadow: '0 4px 24px rgba(0, 255, 255, 0.45), 0 2px 8px rgba(100, 149, 237, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
            top: '6%',
            left: '6%',
            width: '40%',
            height: '40%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 100%)',
            borderRadius: '50%',
            filter: 'blur(2px)'
          }}
        />
        {/* Logo letter e */}
        <span
          style={{
            fontSize: iconSize * 0.55,
            fontWeight: 800,
            color: '#1a2632',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.25)'
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
              background: 'linear-gradient(180deg, #00FFFF 0%, #00D4FF 40%, #6495ED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
          >
            eSIM Myanmar
          </div>
          <div
            style={{
              fontSize: subSize,
              color: '#8B9CAF',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 1,
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
          >
            Entertainment Server
          </div>
        </div>
      )}
    </div>
  );
};

// Icon-only SVG for favicon and app icon
export const LogoIcon = ({ size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    data-protected="true"
  >
    <defs>
      <linearGradient id="esimLogoGradient" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="35%" stopColor="#00D4FF"/>
        <stop offset="100%" stopColor="#6495ED"/>
      </linearGradient>
      <filter id="esimLogoGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#00FFFF" floodOpacity="0.45"/>
      </filter>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="20" fill="url(#esimLogoGradient)" filter="url(#esimLogoGlow)"/>
    <ellipse cx="30" cy="30" rx="18" ry="15" fill="rgba(255,255,255,0.35)"/>
    <text x="50" y="68" fontSize="56" fontWeight="800" fill="#1a2632" textAnchor="middle" fontFamily="Inter, system-ui">e</text>
  </svg>
);

// Full SVG logo for exports and marketing
export const LogoSVG = ({ width = 260 }) => (
  <svg 
    width={width} 
    height={width * 0.28} 
    viewBox="0 0 260 72" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    data-protected="true"
  >
    <defs>
      <linearGradient id="esimIconGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="35%" stopColor="#00D4FF"/>
        <stop offset="100%" stopColor="#6495ED"/>
      </linearGradient>
      <linearGradient id="esimTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="40%" stopColor="#00D4FF"/>
        <stop offset="100%" stopColor="#6495ED"/>
      </linearGradient>
      <filter id="esimIconGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#00FFFF" floodOpacity="0.45"/>
      </filter>
    </defs>
    <rect x="6" y="6" width="60" height="60" rx="13" fill="url(#esimIconGrad)" filter="url(#esimIconGlow)"/>
    <ellipse cx="22" cy="22" rx="12" ry="10" fill="rgba(255,255,255,0.35)"/>
    <text x="36" y="48" fontSize="36" fontWeight="800" fill="#1a2632" textAnchor="middle" fontFamily="Inter">e</text>
    <text x="82" y="38" fontSize="26" fontWeight="700" fill="url(#esimTextGrad)" fontFamily="Inter">eSIM Myanmar</text>
    <text x="82" y="56" fontSize="9" fontWeight="600" fill="#8B9CAF" letterSpacing="1.2" fontFamily="Inter">ENTERTAINMENT SERVER</text>
  </svg>
);

export default Logo;
