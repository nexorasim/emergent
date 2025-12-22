/**
 * Logo.js - eSIM Myanmar Logo with Christmas Santa
 * ESIM MYANMAR COMPANY LIMITED
 * Seasonal Design: December 15, 2025 - January 31, 2026
 */

import React from 'react';
import { motion } from 'framer-motion';

const LOGO_URL = 'https://i.ibb.co/qL00rsqJ/Colored.png';

const isSeasonalActive = () => {
  const now = new Date();
  const start = new Date('2025-12-15T00:00:00');
  const end = new Date('2026-02-01T00:00:00');
  return now >= start && now < end;
};

const MiniSanta = ({ size = 28 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    animate={{ y: [0, -2, 0], rotate: [0, 3, 0, -3, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    style={{ display: 'block' }}
  >
    <defs>
      <linearGradient id="santaBody" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#1a2632"/>
        <stop offset="100%" stopColor="#2a3f52"/>
      </linearGradient>
      <linearGradient id="santaCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="100%" stopColor="#6495ED"/>
      </linearGradient>
    </defs>
    {/* Body */}
    <ellipse cx="20" cy="28" rx="10" ry="10" fill="url(#santaBody)" stroke="#00FFFF" strokeWidth="0.5" strokeOpacity="0.5"/>
    {/* Belt */}
    <rect x="10" y="26" width="20" height="4" rx="1" fill="#141f28"/>
    <rect x="17" y="25" width="6" height="6" rx="1.5" fill="url(#santaCyan)"/>
    {/* Head */}
    <circle cx="20" cy="14" r="8" fill="#F8E6D9"/>
    {/* Hat */}
    <path d="M12 13 Q16 8 18 5 Q20 0 22 5 Q24 8 28 13" fill="url(#santaBody)" stroke="#00FFFF" strokeWidth="0.5" strokeOpacity="0.5"/>
    <ellipse cx="20" cy="13" rx="9" ry="2.5" fill="white"/>
    <circle cx="27" cy="3" r="3" fill="white"/>
    {/* Face */}
    <circle cx="17" cy="13" r="1.2" fill="#1a2632"/>
    <circle cx="23" cy="13" r="1.2" fill="#1a2632"/>
    <ellipse cx="20" cy="16" rx="1.5" ry="1" fill="#E8B89D"/>
    <path d="M17 18 Q20 21 23 18" stroke="#1a2632" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    {/* Beard */}
    <path d="M12 16 Q16 18 20 22 Q24 18 28 16" fill="white"/>
    {/* Wave hand */}
    <motion.g
      animate={{ rotate: [0, 15, 0, -10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '30px 24px' }}
    >
      <ellipse cx="32" cy="22" rx="4" ry="3" fill="#F8E6D9"/>
      <ellipse cx="30" cy="24" rx="3" ry="2" fill="white"/>
    </motion.g>
  </motion.svg>
);

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  const sizes = {
    small: { icon: 32, text: 14, sub: 6, santa: 22 },
    default: { icon: 44, text: 20, sub: 8, santa: 28 },
    large: { icon: 60, text: 28, sub: 10, santa: 36 },
    xlarge: { icon: 80, text: 36, sub: 12, santa: 44 }
  };

  const { icon: iconSize, text: textSize, sub: subSize, santa: santaSize } = sizes[size] || sizes.default;
  const seasonal = isSeasonalActive();

  return (
    <div 
      className={`flex items-center gap-3 ${className}`} 
      data-testid="esim-myanmar-logo"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Logo with Santa */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
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
        {seasonal && (
          <div style={{ position: 'absolute', top: -santaSize * 0.3, right: -santaSize * 0.6 }}>
            <MiniSanta size={santaSize} />
          </div>
        )}
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

export const LogoIcon = ({ size = 40 }) => {
  const seasonal = isSeasonalActive();
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
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
      />
      {seasonal && (
        <div style={{ position: 'absolute', top: -size * 0.2, right: -size * 0.35 }}>
          <MiniSanta size={size * 0.6} />
        </div>
      )}
    </div>
  );
};

export default Logo;