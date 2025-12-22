/**
 * SeasonalSanta.js - GSAP Animated Santa UI Guide
 * Enterprise-grade seasonal animation component
 * Active: December 15, 2025 - January 31, 2026
 * Auto-disable: February 1, 2026
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
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion) return;

    const gsap = gsapRef.current;
    const santa = santaRef.current;

    // Entry animation with bounce
    const entryTl = gsap.timeline();
    entryTl
      .set(santa, { opacity: 0, y: 150, scale: 0.5, rotation: -10 })
      .to(santa, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        onComplete: () => {
          setIsVisible(true);
          // Show tooltip after entry
          setTimeout(() => setShowTooltip(true), 500);
          setTimeout(() => setShowTooltip(false), 4000);
        }
      });

    // Idle breathing animation
    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    idleTl.to(santa, {
      scaleY: 1.03,
      scaleX: 0.98,
      duration: 2.5,
      ease: 'sine.inOut'
    });

    // Subtle floating animation
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(santa, {
      y: -8,
      duration: 3,
      ease: 'sine.inOut'
    });

    // Wave animation every 8-12 seconds
    const waveInterval = setInterval(() => {
      if (!santaRef.current) return;
      const hand = santa.querySelector('.santa-hand');
      if (hand) {
        gsap.timeline()
          .to(hand, { rotation: 20, duration: 0.25, ease: 'power2.out' })
          .to(hand, { rotation: -15, duration: 0.15 })
          .to(hand, { rotation: 15, duration: 0.15 })
          .to(hand, { rotation: -10, duration: 0.15 })
          .to(hand, { rotation: 0, duration: 0.25, ease: 'power2.in' });
      }
    }, 8000 + Math.random() * 4000);

    // Blink animation every 3-5 seconds
    const blinkInterval = setInterval(() => {
      if (!santaRef.current) return;
      const eyes = santa.querySelectorAll('.santa-eye');
      eyes.forEach(eye => {
        gsap.timeline()
          .to(eye, { scaleY: 0.1, duration: 0.08 })
          .to(eye, { scaleY: 1, duration: 0.08 });
      });
    }, 3000 + Math.random() * 2000);

    timelineRef.current = { entryTl, idleTl, floatTl };

    return () => {
      clearInterval(waveInterval);
      clearInterval(blinkInterval);
      entryTl.kill();
      idleTl.kill();
      floatTl.kill();
    };
  }, [gsapLoaded, prefersReducedMotion]);

  // Scroll-based interactions
  useEffect(() => {
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion) return;

    const gsap = gsapRef.current;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // Santa leans in scroll direction
      if (Math.abs(delta) > 5) {
        gsap.to(santaRef.current, {
          rotation: delta > 0 ? 3 : -3,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        setTimeout(() => {
          if (santaRef.current) {
            gsap.to(santaRef.current, {
              rotation: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)'
            });
          }
        }, 300);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [gsapLoaded, prefersReducedMotion]);

  // Interaction handlers
  const handleCTAHover = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    const gsap = gsapRef.current;
    
    // Santa nods approvingly
    gsap.timeline()
      .to(santaRef.current, { rotation: 8, y: -5, duration: 0.2, ease: 'power2.out' })
      .to(santaRef.current, { rotation: -5, duration: 0.15 })
      .to(santaRef.current, { rotation: 0, y: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
  }, [prefersReducedMotion]);

  const handleSuccess = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    const gsap = gsapRef.current;
    
    // Celebratory jump
    gsap.timeline()
      .to(santaRef.current, { y: -30, scaleY: 1.1, duration: 0.25, ease: 'power2.out' })
      .to(santaRef.current, { y: 0, scaleY: 1, duration: 0.5, ease: 'bounce.out' });
  }, [prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    setIsHovered(true);
    const gsap = gsapRef.current;
    
    gsap.to(santaRef.current, {
      scale: 1.1,
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
    ? { title: 'Happy 2026', subtitle: 'New Year Blessings' }
    : { title: 'Season Greetings', subtitle: 'Happy Holidays' };

  return (
    <div
      ref={containerRef}
      className="santa-container"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        pointerEvents: 'auto',
        willChange: 'transform'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tooltip */}
      {(showTooltip || isHovered) && isVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '115px',
            right: '0',
            background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
            border: '1px solid #00FFFF',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#F8F9FA',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 255, 255, 0.25)',
            animation: 'fadeInUp 0.3s ease-out'
          }}
        >
          <div style={{ color: '#00FFFF', fontWeight: '700', marginBottom: '4px' }}>
            {seasonMessage.title}
          </div>
          <div style={{ opacity: 0.8, fontSize: '11px' }}>
            {seasonMessage.subtitle}
          </div>
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '30px',
              width: '12px',
              height: '12px',
              background: '#2a4a5c',
              border: '1px solid #00FFFF',
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
        style={{
          width: '90px',
          height: '110px',
          opacity: 0,
          transform: 'translateZ(0)',
          cursor: 'pointer',
          filter: isHovered ? 'drop-shadow(0 0 12px rgba(0, 255, 255, 0.5))' : 'none',
          transition: 'filter 0.3s ease'
        }}
      >
        {/* Enhanced Santa SVG - Enterprise IoT Style */}
        <svg viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glow effect */}
          <defs>
            <filter id="santaGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2f3c"/>
              <stop offset="100%" stopColor="#2a4a5c"/>
            </linearGradient>
          </defs>
          
          {/* Body */}
          <ellipse cx="45" cy="75" rx="28" ry="30" fill="url(#bodyGrad)" stroke="#00FFFF" strokeWidth="1.5"/>
          
          {/* Belt */}
          <rect x="17" y="70" width="56" height="10" rx="2" fill="#1e2f3c" stroke="#00FFFF" strokeWidth="1"/>
          <rect x="38" y="68" width="14" height="14" rx="3" fill="#00FFFF"/>
          <rect x="42" y="72" width="6" height="6" rx="1" fill="#1e2f3c"/>
          
          {/* Head */}
          <circle cx="45" cy="32" r="20" fill="#F8F9FA" stroke="#1e2f3c" strokeWidth="1.5"/>
          
          {/* Hat */}
          <path d="M25 32 Q45 2 65 32" fill="url(#bodyGrad)" stroke="#00FFFF" strokeWidth="1.5"/>
          <ellipse cx="45" cy="32" rx="22" ry="6" fill="#F8F9FA"/>
          <circle cx="65" cy="10" r="7" fill="#F8F9FA" filter="url(#santaGlow)"/>
          
          {/* Face */}
          <ellipse className="santa-eye" cx="38" cy="30" rx="2.5" ry="3" fill="#1e2f3c" style={{ transformOrigin: '38px 30px' }}/>
          <ellipse className="santa-eye" cx="52" cy="30" rx="2.5" ry="3" fill="#1e2f3c" style={{ transformOrigin: '52px 30px' }}/>
          
          {/* Cheeks */}
          <circle cx="32" cy="36" r="4" fill="#00FFFF" opacity="0.2"/>
          <circle cx="58" cy="36" r="4" fill="#00FFFF" opacity="0.2"/>
          
          {/* Nose */}
          <ellipse cx="45" cy="38" rx="4" ry="3" fill="#00FFFF" opacity="0.4"/>
          
          {/* Smile */}
          <path d="M38 44 Q45 50 52 44" stroke="#1e2f3c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          
          {/* Beard */}
          <path d="M28 40 Q45 65 62 40" fill="#F8F9FA" stroke="#1e2f3c" strokeWidth="0.5"/>
          <path d="M32 45 Q45 58 58 45" fill="#F8F9FA" opacity="0.8"/>
          
          {/* Hand */}
          <g className="santa-hand" style={{ transformOrigin: '72px 60px' }}>
            <ellipse cx="75" cy="58" rx="10" ry="7" fill="#F8F9FA" stroke="#1e2f3c" strokeWidth="1"/>
            {/* Fingers hint */}
            <path d="M80 55 Q85 52 82 58" stroke="#1e2f3c" strokeWidth="0.5" fill="none"/>
          </g>
          
          {/* Arm */}
          <path d="M60 55 Q68 52 75 58" stroke="#1e2f3c" strokeWidth="3" fill="none"/>
          
          {/* Buttons */}
          <circle cx="45" cy="85" r="3" fill="#00FFFF" opacity="0.6"/>
          <circle cx="45" cy="95" r="3" fill="#00FFFF" opacity="0.6"/>
        </svg>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
