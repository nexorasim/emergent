/**
 * Countdown2026.js - New Year Countdown Component
 * IoT-style dashboard widget for 2026 countdown
 */

import React, { useState, useEffect } from 'react';
import { isSeasonalActive, getCountdownToNewYear, isNewYearPeriod } from '../utils/seasonalConfig';

const Countdown2026 = ({ compact = false }) => {
  const [countdown, setCountdown] = useState(getCountdownToNewYear());

  useEffect(() => {
    if (!isSeasonalActive() || isNewYearPeriod()) return;

    const interval = setInterval(() => {
      setCountdown(getCountdownToNewYear());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isSeasonalActive() || countdown.expired) return null;

  const blocks = [
    { value: countdown.days, label: 'Days' },
    { value: countdown.hours, label: 'Hours' },
    { value: countdown.minutes, label: 'Minutes' },
    { value: countdown.seconds, label: 'Seconds' }
  ];

  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(30, 47, 60, 0.9)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 255, 255, 0.3)'
        }}
      >
        <span style={{ color: '#F8F9FA', fontSize: '12px', fontWeight: '500' }}>2026 in</span>
        <span style={{ color: '#00FFFF', fontSize: '14px', fontWeight: '700', fontFamily: 'monospace' }}>
          {String(countdown.days).padStart(2, '0')}:{String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        padding: '24px 0'
      }}
    >
      {blocks.map((block, index) => (
        <div
          key={block.label}
          style={{
            background: 'rgba(30, 47, 60, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '12px',
            padding: '20px 24px',
            minWidth: '90px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated top border */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
              animation: `countdownPulse ${2 + index * 0.5}s ease-in-out infinite`
            }}
          />
          
          <div
            style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#00FFFF',
              lineHeight: 1,
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {String(block.value).padStart(2, '0')}
          </div>
          
          <div
            style={{
              fontSize: '11px',
              color: '#F8F9FA',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: '8px',
              opacity: 0.8
            }}
          >
            {block.label}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes countdownPulse {
          0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Countdown2026;
