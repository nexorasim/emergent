/**
 * Logo.js - Official eSIM Myanmar Logo
 * ESIM MYANMAR COMPANY LIMITED
 * Copyright 2025-2026 - All rights reserved
 * PROTECTED - Unauthorized copying prohibited
 */

import React from 'react';

// Official logo image URL
const LOGO_URL = 'https://i.ibb.co/qL00rsqJ/Colored.png';

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
      {/* Logo Image */}
      <img
        src={LOGO_URL}
        alt="eSIM Myanmar"
        style={{
          width: iconSize,
          height: iconSize,
          objectFit: 'contain',
          borderRadius: iconSize * 0.15,
          filter: 'drop-shadow(0 4px 12px rgba(0, 255, 255, 0.3))'
        }}
        draggable="false"
      />

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

// Icon-only component
export const LogoIcon = ({ size = 40 }) => (
  <img
    src={LOGO_URL}
    alt="eSIM Myanmar"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      borderRadius: size * 0.15,
      filter: 'drop-shadow(0 4px 12px rgba(0, 255, 255, 0.3))'
    }}
    draggable="false"
    data-protected="true"
  />
);

// Full logo with text for exports
export const LogoSVG = ({ width = 260 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, width }}>
    <img
      src={LOGO_URL}
      alt="eSIM Myanmar"
      style={{
        width: 60,
        height: 60,
        objectFit: 'contain',
        borderRadius: 10,
        filter: 'drop-shadow(0 4px 12px rgba(0, 255, 255, 0.3))'
      }}
      draggable="false"
    />
    <div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          background: 'linear-gradient(180deg, #00FFFF 0%, #00D4FF 40%, #6495ED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Inter, system-ui'
        }}
      >
        eSIM Myanmar
      </div>
      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          color: '#8B9CAF',
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          fontFamily: 'Inter, system-ui'
        }}
      >
        ENTERTAINMENT SERVER
      </div>
    </div>
  </div>
);

export default Logo;
