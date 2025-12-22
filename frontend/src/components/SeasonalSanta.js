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
  enabled: true
};

const isSeasonalActive = () => {
  if (!SEASONAL_CONFIG.enabled) return false;
  const now = new Date();
  return now >= SEASONAL_CONFIG.startDate && now < SEASONAL_CONFIG.endDate;
};

const SeasonalSanta = () => {
  const santaRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);
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

    // Entry animation
    const entryTl = gsap.timeline();
    entryTl
      .set(santa, { opacity: 0, y: 100, scale: 0.8 })
      .to(santa, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => setIsVisible(true)
      });

    // Idle breathing animation
    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    idleTl.to(santa, {
      scaleY: 1.02,
      duration: 2,
      ease: 'sine.inOut'
    });

    // Wave animation every 8-12 seconds
    const waveInterval = setInterval(() => {
      if (!santaRef.current) return;
      const hand = santa.querySelector('.santa-hand');
      if (hand) {
        gsap.timeline()
          .to(hand, { rotation: 15, duration: 0.3, ease: 'power2.out' })
          .to(hand, { rotation: -10, duration: 0.2 })
          .to(hand, { rotation: 10, duration: 0.2 })
          .to(hand, { rotation: 0, duration: 0.3, ease: 'power2.in' });
      }
    }, 8000 + Math.random() * 4000);

    timelineRef.current = { entryTl, idleTl };

    return () => {
      clearInterval(waveInterval);
      entryTl.kill();
      idleTl.kill();
    };
  }, [gsapLoaded, prefersReducedMotion]);

  // Interaction handlers
  const handleCTAHover = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    const gsap = gsapRef.current;
    gsap.to(santaRef.current, {
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    });
  }, [prefersReducedMotion]);

  const handleSuccess = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    const gsap = gsapRef.current;
    gsap.timeline()
      .to(santaRef.current, { y: -20, duration: 0.3, ease: 'power2.out' })
      .to(santaRef.current, { y: 0, duration: 0.5, ease: 'bounce.out' });
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

  return (
    <div
      ref={containerRef}
      className="santa-container"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        pointerEvents: 'none',
        willChange: 'transform'
      }}
    >
      <div
        ref={santaRef}
        className="santa-character"
        style={{
          width: '80px',
          height: '100px',
          opacity: 0,
          transform: 'translateZ(0)'
        }}
      >
        {/* Santa SVG - Minimalist Enterprise Style */}
        <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <ellipse cx="40" cy="70" rx="25" ry="28" fill="#1e2f3c" stroke="#00FFFF" strokeWidth="1.5"/>
          
          {/* Belt */}
          <rect x="15" y="65" width="50" height="8" fill="#1e2f3c" stroke="#00FFFF" strokeWidth="1"/>
          <rect x="35" y="63" width="10" height="12" rx="2" fill="#00FFFF"/>
          
          {/* Head */}
          <circle cx="40" cy="30" r="18" fill="#F8F9FA" stroke="#1e2f3c" strokeWidth="1.5"/>
          
          {/* Hat */}
          <path d="M22 30 Q40 5 58 30" fill="#1e2f3c" stroke="#00FFFF" strokeWidth="1"/>
          <ellipse cx="40" cy="30" rx="20" ry="5" fill="#F8F9FA"/>
          <circle cx="58" cy="12" r="6" fill="#F8F9FA"/>
          
          {/* Face */}
          <circle cx="34" cy="28" r="2" fill="#1e2f3c"/>
          <circle cx="46" cy="28" r="2" fill="#1e2f3c"/>
          <ellipse cx="40" cy="36" rx="4" ry="2" fill="#00FFFF" opacity="0.6"/>
          
          {/* Beard */}
          <path d="M28 35 Q40 55 52 35" fill="#F8F9FA" stroke="#1e2f3c" strokeWidth="0.5"/>
          
          {/* Hand */}
          <g className="santa-hand" style={{ transformOrigin: '60px 55px' }}>
            <ellipse cx="65" cy="55" rx="8" ry="6" fill="#F8F9FA" stroke="#1e2f3c" strokeWidth="1"/>
          </g>
        </svg>
      </div>
      
      {/* Seasonal Badge */}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '105px',
            right: '0',
            background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
            border: '1px solid #00FFFF',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '11px',
            color: '#F8F9FA',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0, 255, 255, 0.2)'
          }}
        >
          <span style={{ color: '#00FFFF', fontWeight: '600' }}>2026</span> Season Greetings
        </div>
      )}
    </div>
  );
};

export default SeasonalSanta;
