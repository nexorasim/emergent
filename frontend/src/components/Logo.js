/**
 * eSIM Myanmar Official Logo Component
 * ESIM MYANMAR COMPANY LIMITED
 * Copyright 2025-2026 - All rights reserved
 * Zero emoji - Professional enterprise design
 */

import React from 'react';

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  const sizes = {
    small: { icon: 32, text: 14 },
    default: { icon: 40, text: 18 },
    large: { icon: 56, text: 24 },
    xlarge: { icon: 80, text: 32 }
  };

  const { icon: iconSize, text: textSize } = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: iconSize * 0.25,
          background: 'linear-gradient(135deg, #00FFFF 0%, #00CCCC 50%, #008B9C 100%)',
          boxShadow: '0 4px 20px rgba(0, 255, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Inner glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '30%',
            height: '30%',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            filter: 'blur(4px)'
          }}
        />
        {/* Logo letter */}
        <span
          style={{
            fontSize: iconSize * 0.5,
            fontWeight: 800,
            color: '#1e2f3c',
            fontFamily: 'Inter, system-ui, sans-serif',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}
        >
          e
        </span>
      </div>

      {/* Logo Text */}
      {showText && (
        <div>
          <div
            style={{
              fontSize: textSize,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}
          >
            eSIM Myanmar
          </div>
          <div
            style={{
              fontSize: textSize * 0.5,
              color: '#9CA3AF',
              fontWeight: 500,
              letterSpacing: '0.05em',
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

// Icon-only version for favicon and small displays
export const LogoIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="50%" stopColor="#00CCCC"/>
        <stop offset="100%" stopColor="#008B9C"/>
      </linearGradient>
      <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00FFFF" floodOpacity="0.35"/>
      </filter>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="22" fill="url(#logoGrad)" filter="url(#logoShadow)"/>
    <ellipse cx="25" cy="25" rx="12" ry="10" fill="rgba(255,255,255,0.25)" style={{filter: 'blur(6px)'}}/>
    <text x="50" y="68" fontSize="52" fontWeight="800" fill="#1e2f3c" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">e</text>
  </svg>
);

// Full logo SVG for exports
export const LogoSVG = ({ width = 200 }) => (
  <svg width={width} height={width * 0.35} viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="50%" stopColor="#00CCCC"/>
        <stop offset="100%" stopColor="#008B9C"/>
      </linearGradient>
      <linearGradient id="logoTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="100%" stopColor="#60A5FA"/>
      </linearGradient>
    </defs>
    <rect x="5" y="10" width="50" height="50" rx="12" fill="url(#logoIconGrad)"/>
    <text x="30" y="46" fontSize="28" fontWeight="800" fill="#1e2f3c" textAnchor="middle" fontFamily="Inter">e</text>
    <text x="70" y="38" fontSize="20" fontWeight="700" fill="url(#logoTextGrad)" fontFamily="Inter">eSIM Myanmar</text>
    <text x="70" y="54" fontSize="8" fontWeight="500" fill="#9CA3AF" letterSpacing="0.5" fontFamily="Inter">ENTERTAINMENT SERVER</text>
  </svg>
);

export default Logo;
