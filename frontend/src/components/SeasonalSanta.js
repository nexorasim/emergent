/**
 * SeasonalSanta.js - Running Santa Claus Animation
 * ESIM MYANMAR COMPANY LIMITED
 * Running style animation across screen
 * Zero emoji - Professional enterprise design
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';

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
  const [isRunning, setIsRunning] = useState(false);
  const [runPosition, setRunPosition] = useState(100);
  const gsapRef = useRef(null);
  const runIntervalRef = useRef(null);
  const legPhase = useRef(0);

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

  // Running animation - Santa runs across screen periodically
  useEffect(() => {
    if (!gsapLoaded || prefersReducedMotion) return;

    const startRunning = () => {
      setIsRunning(true);
      setRunPosition(110);
      
      // Animate running across screen
      let pos = 110;
      runIntervalRef.current = setInterval(() => {
        pos -= 2;
        legPhase.current = (legPhase.current + 1) % 4;
        setRunPosition(pos);
        
        if (pos < -20) {
          clearInterval(runIntervalRef.current);
          setIsRunning(false);
          setRunPosition(100);
        }
      }, 50);
    };

    // Run across screen every 45 seconds
    const runTimer = setInterval(startRunning, 45000);
    
    // Initial run after 5 seconds
    const initialRun = setTimeout(startRunning, 5000);

    return () => {
      clearInterval(runTimer);
      clearTimeout(initialRun);
      if (runIntervalRef.current) clearInterval(runIntervalRef.current);
    };
  }, [gsapLoaded, prefersReducedMotion]);

  // Idle animations when not running
  useEffect(() => {
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion || isMinimized || isRunning) return;

    const gsap = gsapRef.current;
    const santa = santaRef.current;

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

    const breatheTl = gsap.timeline({ repeat: -1, yoyo: true });
    breatheTl.to(santa, { scaleY: 1.02, scaleX: 0.98, duration: 3, ease: 'sine.inOut' });

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(santa, { y: -8, duration: 4, ease: 'sine.inOut' });

    const waveInterval = setInterval(() => {
      if (!santaRef.current || isMinimized || isRunning) return;
      const hand = santa.querySelector('.santa-wave-hand');
      if (hand) {
        gsap.timeline()
          .to(hand, { rotation: 25, duration: 0.2, ease: 'power2.out', transformOrigin: 'bottom center' })
          .to(hand, { rotation: -20, duration: 0.15 })
          .to(hand, { rotation: 15, duration: 0.15 })
          .to(hand, { rotation: 0, duration: 0.3, ease: 'power2.in' });
      }
    }, 10000 + Math.random() * 5000);

    const blinkInterval = setInterval(() => {
      if (!santaRef.current || isMinimized || isRunning) return;
      const eyes = santa.querySelectorAll('.santa-eye');
      eyes.forEach(eye => {
        gsap.timeline()
          .to(eye, { scaleY: 0.1, duration: 0.05 })
          .to(eye, { scaleY: 1, duration: 0.05 });
      });
    }, 3000 + Math.random() * 2000);

    return () => {
      clearInterval(waveInterval);
      clearInterval(blinkInterval);
      entryTl.kill();
      breatheTl.kill();
      floatTl.kill();
    };
  }, [gsapLoaded, prefersReducedMotion, isMinimized, isRunning]);

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion || isRunning) return;
    setIsHovered(true);
  }, [prefersReducedMotion, isRunning]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMinimize = useCallback(() => {
    if (!gsapRef.current || !santaRef.current) return;
    const gsap = gsapRef.current;
    
    if (isMinimized) {
      setIsMinimized(false);
      gsap.to(santaRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
    } else {
      gsap.to(santaRef.current, {
        scale: 0.25, opacity: 0.5, duration: 0.3, ease: 'power2.in',
        onComplete: () => setIsMinimized(true)
      });
    }
  }, [isMinimized]);

  useEffect(() => {
    window.santaAnimations = {
      onCTAHover: () => {
        if (gsapRef.current && santaRef.current && !isRunning) {
          gsapRef.current.timeline()
            .to(santaRef.current, { rotation: 10, y: -8, duration: 0.2 })
            .to(santaRef.current, { rotation: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        }
      },
      onSuccess: () => {
        if (gsapRef.current && santaRef.current && !isRunning) {
          gsapRef.current.timeline()
            .to(santaRef.current, { y: -40, scaleY: 1.15, duration: 0.3 })
            .to(santaRef.current, { y: 0, scaleY: 1, duration: 0.5, ease: 'bounce.out' });
        }
      }
    };
    return () => { delete window.santaAnimations; };
  }, [isRunning]);

  if (!isSeasonalActive() || prefersReducedMotion) return null;

  const seasonMessage = isNewYearPeriod() 
    ? { title: 'Happy New Year 2026', subtitle: 'Wishing you seamless connectivity' }
    : { title: 'Merry Christmas', subtitle: 'Season Greetings from eSIM Myanmar' };

  // Running Santa across screen
  if (isRunning) {
    const legOffset = [0, -10, 0, 10][legPhase.current];
    const armOffset = [-legOffset * 0.5, legOffset * 0.5];
    
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '80px',
          left: `${runPosition}%`,
          transform: 'translateX(-50%) scaleX(-1)',
          zIndex: 1001,
          pointerEvents: 'none',
          transition: 'none'
        }}
      >
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <defs>
            <linearGradient id="runBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2f3c"/>
              <stop offset="50%" stopColor="#2a4a5c"/>
              <stop offset="100%" stopColor="#1e2f3c"/>
            </linearGradient>
            <linearGradient id="runCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF"/>
              <stop offset="100%" stopColor="#00BFFF"/>
            </linearGradient>
          </defs>
          
          {/* Body */}
          <ellipse cx="50" cy="75" rx="28" ry="32" fill="url(#runBodyGrad)" stroke="#00FFFF" strokeWidth="1.5" strokeOpacity="0.5"/>
          
          {/* Belt */}
          <rect x="22" y="70" width="56" height="12" rx="3" fill="#141f28" stroke="#00FFFF" strokeWidth="1" strokeOpacity="0.4"/>
          <rect x="42" y="67" width="16" height="18" rx="4" fill="url(#runCyanGrad)"/>
          <rect x="47" y="72" width="6" height="8" rx="2" fill="#1e2f3c"/>
          
          {/* Running legs */}
          <g transform={`rotate(${legOffset * 2} 50 95)`}>
            <ellipse cx="35" cy="105" rx="8" ry="12" fill="url(#runBodyGrad)"/>
          </g>
          <g transform={`rotate(${-legOffset * 2} 50 95)`}>
            <ellipse cx="65" cy="105" rx="8" ry="12" fill="url(#runBodyGrad)"/>
          </g>
          
          {/* Head */}
          <circle cx="50" cy="35" r="22" fill="#F8E6D9" stroke="#1e2f3c" strokeWidth="1"/>
          
          {/* Hat */}
          <path d="M28 32 Q35 22 42 15 Q50 2 58 15 Q65 22 72 32" fill="url(#runBodyGrad)" stroke="#00FFFF" strokeWidth="1.5" strokeOpacity="0.5"/>
          <ellipse cx="50" cy="32" rx="24" ry="7" fill="white"/>
          <circle cx="70" cy="8" r="8" fill="white"/>
          
          {/* Face */}
          <ellipse cx="42" cy="32" rx="3" ry="3.5" fill="#1e2f3c"/>
          <ellipse cx="58" cy="32" rx="3" ry="3.5" fill="#1e2f3c"/>
          <ellipse cx="50" cy="40" rx="5" ry="4" fill="#E8B89D"/>
          <path d="M42 48 Q50 55 58 48" stroke="#1e2f3c" strokeWidth="2" fill="none" strokeLinecap="round"/>
          
          {/* Beard */}
          <path d="M28 42 Q35 48 42 50 Q50 65 58 50 Q65 48 72 42" fill="white"/>
          
          {/* Running arms */}
          <g transform={`rotate(${armOffset[0] * 3} 30 60)`}>
            <ellipse cx="20" cy="55" rx="10" ry="7" fill="#F8E6D9"/>
          </g>
          <g transform={`rotate(${armOffset[1] * 3} 70 60)`}>
            <ellipse cx="80" cy="55" rx="10" ry="7" fill="#F8E6D9"/>
          </g>
          
          {/* Speed lines */}
          <line x1="95" y1="40" x2="110" y2="40" stroke="#00FFFF" strokeWidth="2" opacity="0.6"/>
          <line x1="95" y1="55" x2="115" y2="55" stroke="#00FFFF" strokeWidth="2" opacity="0.4"/>
          <line x1="95" y1="70" x2="108" y2="70" stroke="#00FFFF" strokeWidth="2" opacity="0.5"/>
        </svg>
      </div>
    );
  }

  // Idle Santa in corner
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
          width: '26px',
          height: '26px',
          background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
          border: '1px solid rgba(0, 255, 255, 0.5)',
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
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2.5">
          {isMinimized ? <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /> : <path d="M4 14h6v6M14 4h6v6M20 4l-6 6M4 20l6-6" />}
        </svg>
      </button>

      {(showTooltip || isHovered) && isVisible && !isMinimized && (
        <div
          style={{
            position: 'absolute',
            bottom: '155px',
            right: '0',
            background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
            border: '1px solid rgba(0, 255, 255, 0.5)',
            borderRadius: '14px',
            padding: '14px 18px',
            fontSize: '12px',
            color: '#F8F9FA',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2)',
            animation: 'tooltipFadeIn 0.3s ease-out',
            backdropFilter: 'blur(12px)'
          }}
        >
          <div style={{ color: '#00FFFF', fontWeight: '700', marginBottom: '4px', fontSize: '14px' }}>
            {seasonMessage.title}
          </div>
          <div style={{ opacity: 0.85, fontSize: '11px' }}>
            {seasonMessage.subtitle}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-7px',
              right: '40px',
              width: '14px',
              height: '14px',
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
          width: '120px',
          height: '150px',
          opacity: 0,
          transform: 'translateZ(0)',
          cursor: 'pointer',
          filter: isHovered ? 'drop-shadow(0 0 25px rgba(0, 255, 255, 0.5))' : 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.35))',
          transition: 'filter 0.3s ease'
        }}
      >
        <svg viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2f3c"/>
              <stop offset="50%" stopColor="#2a4a5c"/>
              <stop offset="100%" stopColor="#1e2f3c"/>
            </linearGradient>
            <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF"/>
              <stop offset="100%" stopColor="#00BFFF"/>
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          
          {/* Body */}
          <ellipse cx="60" cy="105" rx="38" ry="42" fill="url(#bodyGrad)" stroke="#00FFFF" strokeWidth="1.5" strokeOpacity="0.5"/>
          
          {/* Trim */}
          <path d="M22 125 Q60 142 98 125" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"/>
          
          {/* Belt */}
          <rect x="22" y="95" width="76" height="14" rx="3" fill="#141f28" stroke="#00FFFF" strokeWidth="1" strokeOpacity="0.4"/>
          <rect x="50" y="91" width="20" height="22" rx="5" fill="url(#cyanGrad)" filter="url(#glow)"/>
          <rect x="56" y="97" width="8" height="10" rx="2" fill="#1e2f3c"/>
          
          {/* Buttons */}
          <circle cx="60" cy="75" r="5" fill="#00FFFF" opacity="0.7" filter="url(#glow)"/>
          <circle cx="60" cy="118" r="5" fill="#00FFFF" opacity="0.7" filter="url(#glow)"/>
          
          {/* Head */}
          <g className="santa-head-group" style={{ transformOrigin: '60px 42px' }}>
            <circle cx="60" cy="42" r="28" fill="#F8E6D9" stroke="#1e2f3c" strokeWidth="1"/>
            
            {/* Cheeks */}
            <ellipse cx="42" cy="48" rx="6" ry="4" fill="#00FFFF" opacity="0.12"/>
            <ellipse cx="78" cy="48" rx="6" ry="4" fill="#00FFFF" opacity="0.12"/>
            
            {/* Eyes */}
            <ellipse className="santa-eye" cx="48" cy="38" rx="4" ry="4.5" fill="#1e2f3c" style={{ transformOrigin: '48px 38px' }}/>
            <ellipse className="santa-eye" cx="72" cy="38" rx="4" ry="4.5" fill="#1e2f3c" style={{ transformOrigin: '72px 38px' }}/>
            <circle cx="49.5" cy="36.5" r="1.5" fill="white"/>
            <circle cx="73.5" cy="36.5" r="1.5" fill="white"/>
            
            {/* Nose */}
            <ellipse cx="60" cy="50" rx="6" ry="5" fill="#E8B89D"/>
            <ellipse cx="60" cy="48" r="2.5" fill="#00FFFF" opacity="0.15"/>
            
            {/* Smile */}
            <path d="M50 58 Q60 67 70 58" stroke="#1e2f3c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            
            {/* Beard */}
            <path d="M32 52 Q40 58 48 60 Q60 82 72 60 Q80 58 88 52" fill="white" stroke="#E8E8E8" strokeWidth="0.5"/>
            <path d="M40 62 Q60 78 80 62" fill="#F8F8F8" opacity="0.8"/>
            
            {/* Mustache */}
            <path d="M42 55 Q50 60 60 55 Q70 60 78 55" fill="white"/>
            
            {/* Hat */}
            <path d="M32 38 Q40 28 48 20 Q60 2 72 20 Q80 28 88 38" fill="url(#bodyGrad)" stroke="#00FFFF" strokeWidth="1.5" strokeOpacity="0.5"/>
            <ellipse cx="60" cy="38" rx="30" ry="8" fill="white"/>
            <circle cx="88" cy="10" r="10" fill="white" filter="url(#glow)"/>
          </g>
          
          {/* Wave hand */}
          <g className="santa-wave-hand" style={{ transformOrigin: '100px 82px' }}>
            <ellipse cx="104" cy="78" rx="14" ry="10" fill="#F8E6D9" stroke="#1e2f3c" strokeWidth="0.8"/>
            <ellipse cx="94" cy="84" rx="9" ry="7" fill="white"/>
          </g>
          
          {/* Arm */}
          <path d="M82 70 Q92 66 100 78" stroke="url(#bodyGrad)" strokeWidth="14" fill="none" strokeLinecap="round"/>
          <path d="M82 70 Q92 66 100 78" stroke="#00FFFF" strokeWidth="1" fill="none" strokeLinecap="round" strokeOpacity="0.3"/>
          
          {/* Sparkles */}
          <circle cx="25" cy="25" r="2" fill="#00FFFF" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="30" r="1.5" fill="#00FFFF" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="18" cy="80" r="1.8" fill="#00FFFF" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <style>{`
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .santa-container:hover .santa-character {
          filter: drop-shadow(0 0 30px rgba(0, 255, 255, 0.55));
        }
        @media (max-width: 640px) {
          .santa-container { bottom: 14px !important; right: 14px !important; }
          .santa-character { width: 95px !important; height: 120px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .santa-container * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

export default SeasonalSanta;
