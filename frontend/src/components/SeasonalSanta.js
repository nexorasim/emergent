/**
 * SeasonalSanta.js - Premium Big Santa Claus Animation
 * Enterprise-grade seasonal animation with large character
 * Active: December 15, 2025 - January 31, 2026
 * Auto-disable: February 1, 2026
 * Zero emoji - Professional enterprise design
 * Copyright Protected - ESIM MYANMAR COMPANY LIMITED
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isSeasonalActive() || prefersReducedMotion) return;

    const loadGSAP = async () => {
      try {
        const gsap = (await import('gsap')).default;
        gsapRef.current = gsap;
        setGsapLoaded(true);
      } catch (error) {
        console.warn('GSAP not available');
      }
    };

    loadGSAP();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion || isMinimized) return;

    const gsap = gsapRef.current;
    const santa = santaRef.current;

    const entryTl = gsap.timeline();
    entryTl
      .set(santa, { opacity: 0, y: 250, scale: 0.2, rotation: -20 })
      .to(santa, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.8,
        ease: 'elastic.out(1, 0.35)',
        onComplete: () => {
          setIsVisible(true);
          setTimeout(() => setShowTooltip(true), 1000);
          setTimeout(() => setShowTooltip(false), 6000);
        }
      });

    const breatheTl = gsap.timeline({ repeat: -1, yoyo: true });
    breatheTl.to(santa, {
      scaleY: 1.015,
      scaleX: 0.99,
      duration: 3.5,
      ease: 'sine.inOut'
    });

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(santa, {
      y: -12,
      duration: 4.5,
      ease: 'sine.inOut'
    });

    const waveInterval = setInterval(() => {
      if (!santaRef.current || isMinimized) return;
      const hand = santa.querySelector('.santa-wave-hand');
      if (hand) {
        gsap.timeline()
          .to(hand, { rotation: 30, duration: 0.25, ease: 'power2.out', transformOrigin: 'bottom center' })
          .to(hand, { rotation: -25, duration: 0.18 })
          .to(hand, { rotation: 25, duration: 0.18 })
          .to(hand, { rotation: -20, duration: 0.18 })
          .to(hand, { rotation: 15, duration: 0.18 })
          .to(hand, { rotation: 0, duration: 0.35, ease: 'power2.in' });
      }
    }, 8000 + Math.random() * 4000);

    const blinkInterval = setInterval(() => {
      if (!santaRef.current || isMinimized) return;
      const eyes = santa.querySelectorAll('.santa-eye');
      eyes.forEach(eye => {
        gsap.timeline()
          .to(eye, { scaleY: 0.08, duration: 0.05 })
          .to(eye, { scaleY: 1, duration: 0.05 });
      });
    }, 2500 + Math.random() * 2500);

    const tiltInterval = setInterval(() => {
      if (!santaRef.current || isMinimized) return;
      const head = santa.querySelector('.santa-head-group');
      if (head) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        gsap.timeline()
          .to(head, { rotation: 6 * direction, duration: 0.5, ease: 'power2.out' })
          .to(head, { rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      }
    }, 12000 + Math.random() * 8000);

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

  useEffect(() => {
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion || isMinimized) return;

    const gsap = gsapRef.current;
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      if (Math.abs(delta) > 12) {
        gsap.to(santaRef.current, {
          rotation: delta > 0 ? 6 : -6,
          duration: 0.25,
          ease: 'power2.out'
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (santaRef.current) {
            gsap.to(santaRef.current, {
              rotation: 0,
              duration: 0.7,
              ease: 'elastic.out(1, 0.35)'
            });
          }
        }, 200);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [gsapLoaded, prefersReducedMotion, isMinimized]);

  const handleCTAHover = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion || isMinimized) return;
    const gsap = gsapRef.current;
    
    gsap.timeline()
      .to(santaRef.current, { rotation: 12, y: -10, duration: 0.25, ease: 'power2.out' })
      .to(santaRef.current, { rotation: -8, duration: 0.15 })
      .to(santaRef.current, { rotation: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.35)' });
  }, [prefersReducedMotion, isMinimized]);

  const handleSuccess = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion || isMinimized) return;
    const gsap = gsapRef.current;
    
    gsap.timeline()
      .to(santaRef.current, { y: -50, scaleY: 1.18, scaleX: 0.88, duration: 0.35, ease: 'power2.out' })
      .to(santaRef.current, { y: 0, scaleY: 1, scaleX: 1, duration: 0.7, ease: 'bounce.out' });
  }, [prefersReducedMotion, isMinimized]);

  const handleMouseEnter = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    setIsHovered(true);
    const gsap = gsapRef.current;
    
    gsap.to(santaRef.current, {
      scale: 1.06,
      duration: 0.35,
      ease: 'power2.out'
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (!gsapRef.current || !santaRef.current || prefersReducedMotion) return;
    setIsHovered(false);
    const gsap = gsapRef.current;
    
    gsap.to(santaRef.current, {
      scale: 1,
      duration: 0.35,
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
        duration: 0.45,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to(santaRef.current, {
        scale: 0.25,
        opacity: 0.5,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setIsMinimized(true)
      });
    }
  }, [isMinimized]);

  useEffect(() => {
    window.santaAnimations = {
      onCTAHover: handleCTAHover,
      onSuccess: handleSuccess
    };
    return () => { delete window.santaAnimations; };
  }, [handleCTAHover, handleSuccess]);

  if (!isSeasonalActive() || prefersReducedMotion) return null;

  const seasonMessage = isNewYearPeriod() 
    ? { title: 'Happy New Year 2026', subtitle: 'Wishing you seamless connectivity' }
    : { title: 'Merry Christmas', subtitle: 'Season Greetings from eSIM Myanmar' };

  return (
    <div
      ref={containerRef}
      className="santa-container"
      data-testid="seasonal-santa-container"
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
      <button
        onClick={handleMinimize}
        aria-label={isMinimized ? 'Show Santa' : 'Hide Santa'}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '28px',
          height: '28px',
          background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
          border: '1px solid rgba(0, 255, 255, 0.5)',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: isHovered || isMinimized ? 1 : 0,
          transition: 'opacity 0.25s ease',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2.5">
          {isMinimized ? (
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          ) : (
            <path d="M4 14h6v6M14 4h6v6M20 4l-6 6M4 20l6-6" />
          )}
        </svg>
      </button>

      {(showTooltip || isHovered) && isVisible && !isMinimized && (
        <div
          style={{
            position: 'absolute',
            bottom: '175px',
            right: '0',
            background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
            border: '1px solid rgba(0, 255, 255, 0.5)',
            borderRadius: '14px',
            padding: '16px 20px',
            fontSize: '13px',
            color: '#F8F9FA',
            whiteSpace: 'nowrap',
            boxShadow: '0 10px 40px rgba(0, 255, 255, 0.25), 0 0 80px rgba(0, 255, 255, 0.1)',
            animation: 'tooltipFadeIn 0.35s ease-out',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ color: '#00FFFF', fontWeight: '700', marginBottom: '6px', fontSize: '15px' }}>
            {seasonMessage.title}
          </div>
          <div style={{ opacity: 0.85, fontSize: '12px', lineHeight: 1.5 }}>
            {seasonMessage.subtitle}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '45px',
              width: '16px',
              height: '16px',
              background: 'linear-gradient(135deg, #2a4a5c 0%, #1e2f3c 100%)',
              border: '1px solid rgba(0, 255, 255, 0.5)',
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
          width: '140px',
          height: '170px',
          opacity: 0,
          transform: 'translateZ(0)',
          cursor: 'pointer',
          filter: isHovered ? 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.5))' : 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.4))',
          transition: 'filter 0.35s ease'
        }}
      >
        <svg viewBox="0 0 140 170" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="santaGlowLarge" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="softGlowLarge" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="bodyGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2f3c"/>
              <stop offset="50%" stopColor="#2a4a5c"/>
              <stop offset="100%" stopColor="#1e2f3c"/>
            </linearGradient>
            <linearGradient id="beltGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141f28"/>
              <stop offset="100%" stopColor="#1e2f3c"/>
            </linearGradient>
            <linearGradient id="trimGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="100%" stopColor="#E8E8E8"/>
            </linearGradient>
            <linearGradient id="cyanGlowLarge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF"/>
              <stop offset="100%" stopColor="#00CCCC"/>
            </linearGradient>
            <radialGradient id="faceGradLarge" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFE4D0"/>
              <stop offset="100%" stopColor="#F8D4BC"/>
            </radialGradient>
          </defs>
          
          <ellipse cx="70" cy="118" rx="45" ry="48" fill="url(#bodyGradLarge)" stroke="#00FFFF" strokeWidth="2" strokeOpacity="0.5"/>
          
          <path d="M25 140 Q70 158 115 140" fill="none" stroke="url(#trimGradLarge)" strokeWidth="12" strokeLinecap="round"/>
          
          <rect x="25" y="108" width="90" height="18" rx="4" fill="url(#beltGradLarge)" stroke="#00FFFF" strokeWidth="1.5" strokeOpacity="0.5"/>
          
          <rect x="55" y="103" width="30" height="28" rx="6" fill="url(#cyanGlowLarge)" filter="url(#softGlowLarge)"/>
          <rect x="62" y="110" width="16" height="14" rx="3" fill="#1e2f3c"/>
          
          <circle cx="70" cy="82" r="6" fill="#00FFFF" opacity="0.7" filter="url(#softGlowLarge)"/>
          <circle cx="70" cy="135" r="6" fill="#00FFFF" opacity="0.7" filter="url(#softGlowLarge)"/>
          
          <g className="santa-head-group" style={{ transformOrigin: '70px 55px' }}>
            <circle cx="70" cy="48" r="32" fill="url(#faceGradLarge)" stroke="#1e2f3c" strokeWidth="1.5"/>
            
            <ellipse cx="50" cy="54" rx="7" ry="5" fill="#00FFFF" opacity="0.12"/>
            <ellipse cx="90" cy="54" rx="7" ry="5" fill="#00FFFF" opacity="0.12"/>
            
            <ellipse className="santa-eye" cx="55" cy="44" rx="4.5" ry="5" fill="#1e2f3c" style={{ transformOrigin: '55px 44px' }}/>
            <ellipse className="santa-eye" cx="85" cy="44" rx="4.5" ry="5" fill="#1e2f3c" style={{ transformOrigin: '85px 44px' }}/>
            
            <circle cx="56.5" cy="42.5" r="1.8" fill="#FFFFFF"/>
            <circle cx="86.5" cy="42.5" r="1.8" fill="#FFFFFF"/>
            
            <ellipse cx="70" cy="56" rx="7" ry="5.5" fill="#E8B89D"/>
            <ellipse cx="70" cy="54" r="3" fill="#00FFFF" opacity="0.18"/>
            
            <path d="M58 66 Q70 76 82 66" stroke="#1e2f3c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            
            <path d="M38 58 Q44 62 52 66 Q70 95 88 66 Q96 62 102 58" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="0.8"/>
            <path d="M46 68 Q70 90 94 68" fill="#F8F8F8" opacity="0.85"/>
            <path d="M54 74 Q70 86 86 74" fill="#FFFFFF" opacity="0.65"/>
            
            <path d="M48 62 Q58 68 70 62 Q82 68 92 62" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="0.5"/>
            
            <path d="M38 44 Q44 34 52 26 Q70 4 88 26 Q96 34 102 44" fill="url(#bodyGradLarge)" stroke="#00FFFF" strokeWidth="2" strokeOpacity="0.6"/>
            <ellipse cx="70" cy="44" rx="36" ry="10" fill="url(#trimGradLarge)"/>
            
            <circle cx="102" cy="14" r="12" fill="#FFFFFF" filter="url(#santaGlowLarge)"/>
            <circle cx="102" cy="14" r="8" fill="#F8F8F8"/>
          </g>
          
          <g className="santa-wave-hand" style={{ transformOrigin: '118px 95px' }}>
            <ellipse cx="122" cy="88" rx="16" ry="12" fill="#FFE4D0" stroke="#1e2f3c" strokeWidth="1"/>
            <ellipse cx="112" cy="94" rx="11" ry="8" fill="url(#trimGradLarge)"/>
            <ellipse cx="132" cy="84" rx="6" ry="4" fill="#FFE4D0"/>
          </g>
          
          <path d="M95 78 Q108 72 118 88" stroke="url(#bodyGradLarge)" strokeWidth="18" fill="none" strokeLinecap="round"/>
          <path d="M95 78 Q108 72 118 88" stroke="#00FFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.35"/>
          
          <circle cx="30" cy="30" r="2.5" fill="#00FFFF" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="115" cy="35" r="2" fill="#00FFFF" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.15;0.6" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="95" r="2" fill="#00FFFF" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="125" cy="130" r="1.5" fill="#00FFFF" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <style>{`
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .santa-container:hover .santa-character {
          filter: drop-shadow(0 0 35px rgba(0, 255, 255, 0.55));
        }
        
        @media (max-width: 640px) {
          .santa-container {
            bottom: 14px !important;
            right: 14px !important;
          }
          .santa-character {
            width: 110px !important;
            height: 135px !important;
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
