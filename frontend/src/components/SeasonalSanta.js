/**
 * SeasonalSanta.js - Premium GSAP Animated Santa UI Guide
 * Enterprise-grade seasonal animation component
 * Active: December 15, 2025 - January 31, 2026
 * Auto-disable: February 1, 2026
 * Zero emoji - Professional enterprise design
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

// Feature flag for seasonal mode
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

const isNewYearPeriod = () => {
  const now = new Date();
  return now >= SEASONAL_CONFIG.newYearDate && now < SEASONAL_CONFIG.endDate;
};

const SeasonalSanta = () => {
  const santaRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const gsapRef = useRef(null);
  const timelineRef = useRef(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Load GSAP dynamically
  useEffect(() => {
    if (!isSeasonalActive() || prefersReducedMotion) return;

    const loadGSAP = async () => {
      try {
        const gsap = (await import('gsap')).default;
        gsapRef.current = gsap;
        setGsapLoaded(true);
      } catch (error) {
        console.warn('GSAP not available, Santa animations disabled');
      }
    };

    loadGSAP();
  }, [prefersReducedMotion]);

  // Initialize animations
  useEffect(() => {
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion || isMinimized) return;

    const gsap = gsapRef.current;
    const santa = santaRef.current;

    // Entry animation with elastic bounce
    const entryTl = gsap.timeline();
    entryTl
      .set(santa, { opacity: 0, y: 200, scale: 0.3, rotation: -15 })
      .to(santa, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.4)',
        onComplete: () => {
          setIsVisible(true);
          setTimeout(() => setShowTooltip(true), 800);
          setTimeout(() => setShowTooltip(false), 5000);
        }
      });

    // Subtle breathing animation
    const breatheTl = gsap.timeline({ repeat: -1, yoyo: true });
    breatheTl.to(santa, {
      scaleY: 1.02,
      scaleX: 0.99,
      duration: 3,
      ease: 'sine.inOut'
    });

    // Gentle floating animation
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(santa, {
      y: -10,
      duration: 4,
      ease: 'sine.inOut'
    });

    // Wave animation every 10-15 seconds
    const waveInterval = setInterval(() => {
      if (!santaRef.current || isMinimized) return;
      const hand = santa.querySelector('.santa-wave-hand');
      if (hand) {
        gsap.timeline()
          .to(hand, { rotation: 25, duration: 0.2, ease: 'power2.out', transformOrigin: 'bottom center' })
          .to(hand, { rotation: -20, duration: 0.15 })
          .to(hand, { rotation: 20, duration: 0.15 })
          .to(hand, { rotation: -15, duration: 0.15 })
          .to(hand, { rotation: 10, duration: 0.15 })
          .to(hand, { rotation: 0, duration: 0.3, ease: 'power2.in' });
      }
    }, 10000 + Math.random() * 5000);

    // Blink animation every 3-6 seconds
    const blinkInterval = setInterval(() => {
      if (!santaRef.current || isMinimized) return;
      const eyes = santa.querySelectorAll('.santa-eye');
      eyes.forEach(eye => {
        gsap.timeline()
          .to(eye, { scaleY: 0.1, duration: 0.06 })
          .to(eye, { scaleY: 1, duration: 0.06 });
      });
    }, 3000 + Math.random() * 3000);

    // Occasional head tilt
    const tiltInterval = setInterval(() => {
      if (!santaRef.current || isMinimized) return;
      const head = santa.querySelector('.santa-head-group');
      if (head) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        gsap.timeline()
          .to(head, { rotation: 5 * direction, duration: 0.4, ease: 'power2.out' })
          .to(head, { rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      }
    }, 15000 + Math.random() * 10000);

    timelineRef.current = { entryTl, breatheTl, floatTl };

    return () => {
      clearInterval(waveInterval);
      clearInterval(blinkInterval);
      clearInterval(tiltInterval);
      entryTl.kill();
      breatheTl.kill();
      floatTl.kill();
    };
  }, [gsapLoaded, prefersReducedMotion, isMinimized]);

  // Scroll-based interactions
  useEffect(() => {
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion || isMinimized) return;

    const gsap = gsapRef.current;
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      if (Math.abs(delta) > 10) {
        gsap.to(santaRef.current, {
          rotation: delta > 0 ? 5 : -5,
          duration: 0.2,
          ease: 'power2.out'
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (santaRef.current) {
            gsap.to(santaRef.current, {
              rotation: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.4)'
            });
          }
        }, 150);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [gsapLoaded, prefersReducedMotion, isMinimized]);

  // Interaction handlers
  const handleCTAHover = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion || isMinimized) return;
    const gsap = gsapRef.current;
    
    gsap.timeline()
      .to(santaRef.current, { rotation: 10, y: -8, duration: 0.2, ease: 'power2.out' })
      .to(santaRef.current, { rotation: -6, duration: 0.12 })
      .to(santaRef.current, { rotation: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
  }, [prefersReducedMotion, isMinimized]);

  const handleSuccess = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion || isMinimized) return;
    const gsap = gsapRef.current;
    
    gsap.timeline()
      .to(santaRef.current, { y: -40, scaleY: 1.15, scaleX: 0.9, duration: 0.3, ease: 'power2.out' })
      .to(santaRef.current, { y: 0, scaleY: 1, scaleX: 1, duration: 0.6, ease: 'bounce.out' });
  }, [prefersReducedMotion, isMinimized]);

  const handleMouseEnter = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    setIsHovered(true);
    const gsap = gsapRef.current;
    
    gsap.to(santaRef.current, {
      scale: 1.08,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    setIsHovered(false);
    const gsap = gsapRef.current;
    
    gsap.to(santaRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [prefersReducedMotion]);

  const handleMinimize = useCallback(() => {
    if (!gsapRef.current || !santaRef.current) return;
    const gsap = gsapRef.current;
    
    if (isMinimized) {
      setIsMinimized(false);
      gsap.to(santaRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to(santaRef.current, {
        scale: 0.3,
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setIsMinimized(true)
      });
    }
  }, [isMinimized]);

  // Expose methods globally for other components
  useEffect(() => {
    window.santaAnimations = {
      onCTAHover: handleCTAHover,
      onSuccess: handleSuccess
    };
    return () => { delete window.santaAnimations; };
  }, [handleCTAHover, handleSuccess]);

  // Don't render if not seasonal or reduced motion
  if (!isSeasonalActive() || prefersReducedMotion) return null;

  const seasonMessage = isNewYearPeriod() 
    ? { title: 'Happy 2026', subtitle: 'New Year Blessings from eSIM Myanmar' }
    : { title: 'Season Greetings', subtitle: 'Happy Holidays from eSIM Myanmar' };

  return (
    <div
      ref={containerRef}
      className="santa-container"
      data-testid="seasonal-santa-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        pointerEvents: 'auto',
        willChange: 'transform'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Minimize/Expand Button */}
      <button
        onClick={handleMinimize}
        aria-label={isMinimized ? 'Expand Santa' : 'Minimize Santa'}
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '24px',
          height: '24px',
          background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
          border: '1px solid rgba(0, 255, 255, 0.4)',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: isHovered || isMinimized ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
          {isMinimized ? (
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          ) : (
            <path d="M4 14h6v6M14 4h6v6M20 4l-6 6M4 20l6-6" />
          )}
        </svg>
      </button>

      {/* Tooltip */}
      {(showTooltip || isHovered) && isVisible && !isMinimized && (
        <div
          style={{
            position: 'absolute',
            bottom: '140px',
            right: '0',
            background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
            border: '1px solid rgba(0, 255, 255, 0.4)',
            borderRadius: '12px',
            padding: '14px 18px',
            fontSize: '12px',
            color: '#F8F9FA',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2), 0 0 60px rgba(0, 255, 255, 0.1)',
            animation: 'tooltipFadeIn 0.3s ease-out',
            backdropFilter: 'blur(12px)'
          }}
        >
          <div style={{ color: '#00FFFF', fontWeight: '700', marginBottom: '6px', fontSize: '13px' }}>
            {seasonMessage.title}
          </div>
          <div style={{ opacity: 0.85, fontSize: '11px', lineHeight: 1.4 }}>
            {seasonMessage.subtitle}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-7px',
              right: '35px',
              width: '14px',
              height: '14px',
              background: 'linear-gradient(135deg, #2a4a5c 0%, #1e2f3c 100%)',
              border: '1px solid rgba(0, 255, 255, 0.4)',
              borderTop: 'none',
              borderLeft: 'none',
              transform: 'rotate(45deg)'
            }}
          />
        </div>
      )}

      <div
        ref={santaRef}
        className="santa-character"
        data-testid="santa-animation"
        style={{
          width: '100px',
          height: '130px',
          opacity: 0,
          transform: 'translateZ(0)',
          cursor: 'pointer',
          filter: isHovered ? 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))' : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
          transition: 'filter 0.3s ease'
        }}
      >
        {/* Premium Enterprise IoT-Style Santa SVG */}
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Glow effects */}
            <filter id="santaGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Gradients */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2f3c"/>
              <stop offset="50%" stopColor="#2a4a5c"/>
              <stop offset="100%" stopColor="#1e2f3c"/>
            </linearGradient>
            <linearGradient id="beltGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141f28"/>
              <stop offset="100%" stopColor="#1e2f3c"/>
            </linearGradient>
            <linearGradient id="trimGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="100%" stopColor="#E8E8E8"/>
            </linearGradient>
            <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF"/>
              <stop offset="100%" stopColor="#00CCCC"/>
            </linearGradient>
            
            {/* Patterns */}
            <pattern id="subtlePattern" patternUnits="userSpaceOnUse" width="4" height="4">
              <circle cx="2" cy="2" r="0.5" fill="rgba(0,255,255,0.1)"/>
            </pattern>
          </defs>
          
          {/* Body */}
          <ellipse cx="50" cy="90" rx="32" ry="35" fill="url(#bodyGradient)" stroke="#00FFFF" strokeWidth="1.5" strokeOpacity="0.6"/>
          <ellipse cx="50" cy="90" rx="32" ry="35" fill="url(#subtlePattern)"/>
          
          {/* Body trim - bottom */}
          <path d="M18 105 Q50 118 82 105" fill="none" stroke="url(#trimGradient)" strokeWidth="8" strokeLinecap="round"/>
          
          {/* Belt */}
          <rect x="18" y="82" width="64" height="14" rx="3" fill="url(#beltGradient)" stroke="#00FFFF" strokeWidth="1" strokeOpacity="0.5"/>
          
          {/* Belt buckle */}
          <rect x="40" y="79" width="20" height="20" rx="4" fill="url(#cyanGlow)" filter="url(#softGlow)"/>
          <rect x="45" y="84" width="10" height="10" rx="2" fill="#1e2f3c"/>
          
          {/* Body buttons */}
          <circle cx="50" cy="65" r="4" fill="#00FFFF" opacity="0.7" filter="url(#softGlow)"/>
          <circle cx="50" cy="100" r="4" fill="#00FFFF" opacity="0.7" filter="url(#softGlow)"/>
          
          {/* Head group for tilt animation */}
          <g className="santa-head-group" style={{ transformOrigin: '50px 45px' }}>
            {/* Face */}
            <circle cx="50" cy="38" r="24" fill="#F8E6D9" stroke="#1e2f3c" strokeWidth="1"/>
            
            {/* Cheeks - subtle glow */}
            <ellipse cx="35" cy="42" r="5" ry="4" fill="#00FFFF" opacity="0.15"/>
            <ellipse cx="65" cy="42" r="5" ry="4" fill="#00FFFF" opacity="0.15"/>
            
            {/* Eyes */}
            <ellipse className="santa-eye" cx="40" cy="35" rx="3" ry="3.5" fill="#1e2f3c" style={{ transformOrigin: '40px 35px' }}/>
            <ellipse className="santa-eye" cx="60" cy="35" rx="3" ry="3.5" fill="#1e2f3c" style={{ transformOrigin: '60px 35px' }}/>
            
            {/* Eye highlights */}
            <circle cx="41" cy="34" r="1" fill="#FFFFFF"/>
            <circle cx="61" cy="34" r="1" fill="#FFFFFF"/>
            
            {/* Nose */}
            <ellipse cx="50" cy="43" r="5" ry="4" fill="#E8B89D"/>
            <ellipse cx="50" cy="42" r="2" ry="1.5" fill="#00FFFF" opacity="0.2"/>
            
            {/* Smile */}
            <path d="M42 50 Q50 57 58 50" stroke="#1e2f3c" strokeWidth="2" fill="none" strokeLinecap="round"/>
            
            {/* Beard */}
            <path d="M26 45 Q30 48 35 50 Q50 72 65 50 Q70 48 74 45" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="0.5"/>
            <path d="M32 52 Q50 68 68 52" fill="#F8F8F8" opacity="0.8"/>
            <path d="M38 56 Q50 65 62 56" fill="#FFFFFF" opacity="0.6"/>
            
            {/* Mustache */}
            <path d="M35 48 Q42 52 50 48 Q58 52 65 48" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="0.3"/>
            
            {/* Hat */}
            <path d="M26 35 Q30 28 35 22 Q50 5 65 22 Q70 28 74 35" fill="url(#bodyGradient)" stroke="#00FFFF" strokeWidth="1.5" strokeOpacity="0.6"/>
            <ellipse cx="50" cy="35" rx="26" ry="7" fill="url(#trimGradient)"/>
            
            {/* Hat pom-pom */}
            <circle cx="72" cy="12" r="9" fill="#FFFFFF" filter="url(#santaGlow)"/>
            <circle cx="72" cy="12" r="6" fill="#F8F8F8"/>
          </g>
          
          {/* Waving hand */}
          <g className="santa-wave-hand" style={{ transformOrigin: '82px 72px' }}>
            <ellipse cx="85" cy="68" rx="12" ry="9" fill="#F8E6D9" stroke="#1e2f3c" strokeWidth="0.8"/>
            {/* Mitten cuff */}
            <ellipse cx="77" cy="72" rx="8" ry="6" fill="url(#trimGradient)"/>
            {/* Thumb hint */}
            <ellipse cx="92" cy="65" rx="4" ry="3" fill="#F8E6D9"/>
          </g>
          
          {/* Arm connector */}
          <path d="M68 62 Q76 58 82 68" stroke="url(#bodyGradient)" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M68 62 Q76 58 82 68" stroke="#00FFFF" strokeWidth="1" fill="none" strokeLinecap="round" strokeOpacity="0.3"/>
          
          {/* Subtle sparkles */}
          <circle cx="25" cy="25" r="1.5" fill="#00FFFF" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="80" cy="30" r="1" fill="#00FFFF" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="15" cy="70" r="1.2" fill="#00FFFF" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <style>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .santa-container:hover .santa-character {
          filter: drop-shadow(0 0 25px rgba(0, 255, 255, 0.5));
        }
        
        @media (max-width: 640px) {
          .santa-container {
            bottom: 16px !important;
            right: 16px !important;
          }
          .santa-character {
            width: 80px !important;
            height: 104px !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .santa-container * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalSanta;
