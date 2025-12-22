/**
 * Countdown2026.js - Premium New Year Countdown Component
 * IoT-style dashboard widget for 2026 countdown
 * Glassmorphism design with GSAP-ready animations
 * Zero emoji - Professional enterprise design
 */

import React, { useState, useEffect, useRef } from 'react';
import { isSeasonalActive, getCountdownToNewYear, isNewYearPeriod } from '../utils/seasonalConfig';

const Countdown2026 = ({ compact = false, showLabel = true }) => {
  const [countdown, setCountdown] = useState(getCountdownToNewYear());
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isSeasonalActive() || isNewYearPeriod()) return;

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    const interval = setInterval(() => {
      setCountdown(getCountdownToNewYear());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isSeasonalActive() || countdown.expired) return null;

  const blocks = [
    { value: countdown.days, label: 'Days', color: '#00FFFF' },
    { value: countdown.hours, label: 'Hours', color: '#00FFFF' },
    { value: countdown.minutes, label: 'Minutes', color: '#00FFFF' },
    { value: countdown.seconds, label: 'Seconds', color: '#00FFFF' }
  ];

  if (compact) {
    return (
      <div
        data-testid="countdown-compact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 18px',
          background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(42, 74, 92, 0.95) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <span style={{ color: '#F8F9FA', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>2026</span>
        <div style={{ width: '1px', height: '16px', background: 'rgba(0, 255, 255, 0.3)' }} />
        <span 
          style={{ 
            color: '#00FFFF', 
            fontSize: '15px', 
            fontWeight: '700', 
            fontFamily: '"SF Mono", "Fira Code", monospace',
            letterSpacing: '0.1em',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
          }}
        >
          {String(countdown.days).padStart(2, '0')}:{String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-testid="countdown-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '24px 0',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {showLabel && (
        <div style={{ textAlign: 'center' }}>
          <h3 
            style={{ 
              color: '#00FFFF', 
              fontSize: '14px', 
              fontWeight: '700', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: 0,
              textShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
            }}
          >
            Countdown to 2026
          </h3>
        </div>
      )}
      
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        {blocks.map((block, index) => (
          <div
            key={block.label}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.98) 0%, rgba(42, 74, 92, 0.95) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '20px 24px',
              minWidth: '85px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
                borderRadius: '1px'
              }}
            />
            
            {/* Animated pulse ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-1px',
                borderRadius: '16px',
                border: '1px solid transparent',
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), transparent, rgba(0, 255, 255, 0.1)) border-box',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                animation: block.label === 'Seconds' ? 'pulseRing 1s ease-in-out infinite' : 'none',
                opacity: 0.6
              }}
            />
            
            {/* Value */}
            <div
              style={{
                fontSize: '42px',
                fontWeight: '800',
                color: block.color,
                lineHeight: 1,
                textShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
                fontFamily: 'Inter, system-ui, sans-serif',
                position: 'relative'
              }}
            >
              {String(block.value).padStart(2, '0')}
            </div>
            
            {/* Label */}
            <div
              style={{
                fontSize: '10px',
                color: '#F8F9FA',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginTop: '10px',
                opacity: 0.75,
                fontWeight: '600'
              }}
            >
              {block.label}
            </div>

            {/* Corner accents */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '8px', height: '8px', borderTop: '2px solid rgba(0, 255, 255, 0.4)', borderLeft: '2px solid rgba(0, 255, 255, 0.4)', borderRadius: '2px 0 0 0' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderTop: '2px solid rgba(0, 255, 255, 0.4)', borderRight: '2px solid rgba(0, 255, 255, 0.4)', borderRadius: '0 2px 0 0' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '8px', height: '8px', borderBottom: '2px solid rgba(0, 255, 255, 0.4)', borderLeft: '2px solid rgba(0, 255, 255, 0.4)', borderRadius: '0 0 0 2px' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '8px', height: '8px', borderBottom: '2px solid rgba(0, 255, 255, 0.4)', borderRight: '2px solid rgba(0, 255, 255, 0.4)', borderRadius: '0 0 2px 0' }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulseRing {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @media (max-width: 480px) {
          [data-testid="countdown-full"] > div:last-of-type {
            gap: 8px;
          }
          [data-testid="countdown-full"] > div:last-of-type > div {
            min-width: 70px;
            padding: 16px 18px;
          }
          [data-testid="countdown-full"] > div:last-of-type > div > div:first-child {
            font-size: 32px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Countdown2026;
