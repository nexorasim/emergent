/**
 * SeasonalSanta.js - Running Santa Claus Animation
 * ESIM MYANMAR COMPANY LIMITED
 * Premium running style animation - Copyright Protected
 * Active: December 15, 2025 - January 31, 2026
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
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runPosition, setRunPosition] = useState(105);
  const [legPhase, setLegPhase] = useState(0);
  const gsapRef = useRef(null);
  const runIntervalRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isSeasonalActive() || prefersReducedMotion) return;
    const loadGSAP = async () => {
      try {
        const gsap = (await import('gsap')).default;
        gsapRef.current = gsap;
        setGsapLoaded(true);
      } catch (e) { console.warn('GSAP unavailable'); }
    };
    loadGSAP();
  }, [prefersReducedMotion]);

  // Running animation across screen
  useEffect(() => {
    if (!gsapLoaded || prefersReducedMotion) return;

    const startRun = () => {
      setIsRunning(true);
      setRunPosition(105);
      let pos = 105;
      let phase = 0;
      
      runIntervalRef.current = setInterval(() => {
        pos -= 1.8;
        phase = (phase + 1) % 8;
        setRunPosition(pos);
        setLegPhase(phase);
        
        if (pos < -15) {
          clearInterval(runIntervalRef.current);
          setIsRunning(false);
          setRunPosition(105);
        }
      }, 40);
    };

    const runTimer = setInterval(startRun, 50000);
    const initialRun = setTimeout(startRun, 4000);

    return () => {
      clearInterval(runTimer);
      clearTimeout(initialRun);
      if (runIntervalRef.current) clearInterval(runIntervalRef.current);
    };
  }, [gsapLoaded, prefersReducedMotion]);

  // Idle animations
  useEffect(() => {
    if (!gsapLoaded || !santaRef.current || prefersReducedMotion || isMinimized || isRunning) return;

    const gsap = gsapRef.current;
    const santa = santaRef.current;

    const entry = gsap.timeline();
    entry
      .set(santa, { opacity: 0, y: 180, scale: 0.3, rotation: -12 })
      .to(santa, {
        opacity: 1, y: 0, scale: 1, rotation: 0,
        duration: 1.4, ease: 'elastic.out(1, 0.45)',
        onComplete: () => {
          setIsVisible(true);
          setTimeout(() => setShowTooltip(true), 600);
          setTimeout(() => setShowTooltip(false), 4500);
        }
      });

    const breathe = gsap.timeline({ repeat: -1, yoyo: true });
    breathe.to(santa, { scaleY: 1.015, scaleX: 0.985, duration: 2.8, ease: 'sine.inOut' });

    const float = gsap.timeline({ repeat: -1, yoyo: true });
    float.to(santa, { y: -6, duration: 3.5, ease: 'sine.inOut' });

    const waveInt = setInterval(() => {
      if (!santaRef.current || isMinimized || isRunning) return;
      const hand = santa.querySelector('.santa-hand');
      if (hand) {
        gsap.timeline()
          .to(hand, { rotation: 22, duration: 0.18, ease: 'power2.out', transformOrigin: 'bottom center' })
          .to(hand, { rotation: -18, duration: 0.12 })
          .to(hand, { rotation: 12, duration: 0.12 })
          .to(hand, { rotation: 0, duration: 0.25, ease: 'power2.in' });
      }
    }, 9000 + Math.random() * 4000);

    const blinkInt = setInterval(() => {
      if (!santaRef.current || isMinimized || isRunning) return;
      santa.querySelectorAll('.santa-eye').forEach(eye => {
        gsap.timeline().to(eye, { scaleY: 0.1, duration: 0.04 }).to(eye, { scaleY: 1, duration: 0.04 });
      });
    }, 2800 + Math.random() * 1800);

    return () => {
      clearInterval(waveInt);
      clearInterval(blinkInt);
      entry.kill();
      breathe.kill();
      float.kill();
    };
  }, [gsapLoaded, prefersReducedMotion, isMinimized, isRunning]);

  const handleMinimize = useCallback(() => {
    if (!gsapRef.current || !santaRef.current) return;
    const gsap = gsapRef.current;
    if (isMinimized) {
      setIsMinimized(false);
      gsap.to(santaRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' });
    } else {
      gsap.to(santaRef.current, { scale: 0.2, opacity: 0.4, duration: 0.25, ease: 'power2.in', onComplete: () => setIsMinimized(true) });
    }
  }, [isMinimized]);

  useEffect(() => {
    window.santaAnimations = {
      onCTAHover: () => {
        if (gsapRef.current && santaRef.current && !isRunning) {
          gsapRef.current.timeline().to(santaRef.current, { rotation: 8, y: -6, duration: 0.18 }).to(santaRef.current, { rotation: 0, y: 0, duration: 0.35, ease: 'elastic.out(1, 0.4)' });
        }
      },
      onSuccess: () => {
        if (gsapRef.current && santaRef.current && !isRunning) {
          gsapRef.current.timeline().to(santaRef.current, { y: -35, scaleY: 1.12, duration: 0.25 }).to(santaRef.current, { y: 0, scaleY: 1, duration: 0.45, ease: 'bounce.out' });
        }
      }
    };
    return () => { delete window.santaAnimations; };
  }, [isRunning]);

  if (!isSeasonalActive() || prefersReducedMotion) return null;

  const msg = isNewYearPeriod()
    ? { title: 'Happy New Year 2026', sub: 'esim.com.mm' }
    : { title: 'Merry Christmas', sub: 'Season Greetings from eSIM Myanmar' };

  // Running Santa
  if (isRunning) {
    const legAngle = Math.sin(legPhase * 0.8) * 25;
    const armAngle = -legAngle * 0.6;
    
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '70px',
          left: `${runPosition}%`,
          transform: 'translateX(-50%) scaleX(-1)',
          zIndex: 1001,
          pointerEvents: 'none'
        }}
        data-testid="running-santa"
      >
        <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
          <defs>
            <linearGradient id="runBody" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#1a2632"/>
              <stop offset="100%" stopColor="#2a3f52"/>
            </linearGradient>
            <linearGradient id="runCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF"/>
              <stop offset="100%" stopColor="#6495ED"/>
            </linearGradient>
          </defs>
          
          {/* Body */}
          <ellipse cx="45" cy="70" rx="25" ry="28" fill="url(#runBody)" stroke="#00FFFF" strokeWidth="1" strokeOpacity="0.4"/>
          
          {/* Belt */}
          <rect x="20" y="65" width="50" height="10" rx="2" fill="#141f28"/>
          <rect x="38" y="62" width="14" height="16" rx="3" fill="url(#runCyan)"/>
          <rect x="42" y="66" width="6" height="8" rx="1.5" fill="#1a2632"/>
          
          {/* Running Legs */}
          <g transform={`rotate(${legAngle} 35 88)`}>
            <ellipse cx="32" cy="95" rx="7" ry="10" fill="url(#runBody)"/>
            <ellipse cx="32" cy="102" rx="5" ry="4" fill="#1a2632"/>
          </g>
          <g transform={`rotate(${-legAngle} 55 88)`}>
            <ellipse cx="58" cy="95" rx="7" ry="10" fill="url(#runBody)"/>
            <ellipse cx="58" cy="102" rx="5" ry="4" fill="#1a2632"/>
          </g>
          
          {/* Head */}
          <circle cx="45" cy="32" r="20" fill="#F8E6D9" stroke="#1a2632" strokeWidth="0.8"/>
          
          {/* Hat */}
          <path d="M25 30 Q32 20 38 14 Q45 2 52 14 Q58 20 65 30" fill="url(#runBody)" stroke="#00FFFF" strokeWidth="1" strokeOpacity="0.4"/>
          <ellipse cx="45" cy="30" rx="22" ry="6" fill="white"/>
          <circle cx="62" cy="8" r="7" fill="white"/>
          
          {/* Face */}
          <ellipse cx="38" cy="30" rx="2.5" ry="3" fill="#1a2632"/>
          <ellipse cx="52" cy="30" rx="2.5" ry="3" fill="#1a2632"/>
          <ellipse cx="45" cy="38" rx="4" ry="3" fill="#E8B89D"/>
          <path d="M38 44 Q45 50 52 44" stroke="#1a2632" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          
          {/* Beard */}
          <path d="M26 38 Q32 42 38 45 Q45 58 52 45 Q58 42 64 38" fill="white"/>
          
          {/* Running Arms */}
          <g transform={`rotate(${armAngle} 25 55)`}>
            <ellipse cx="18" cy="52" rx="9" ry="6" fill="#F8E6D9"/>
            <ellipse cx="14" cy="56" rx="6" ry="4" fill="white"/>
          </g>
          <g transform={`rotate(${-armAngle} 65 55)`}>
            <ellipse cx="72" cy="52" rx="9" ry="6" fill="#F8E6D9"/>
            <ellipse cx="76" cy="56" rx="6" ry="4" fill="white"/>
          </g>
          
          {/* Speed Lines */}
          <line x1="85" y1="35" x2="100" y2="35" stroke="#00FFFF" strokeWidth="2" opacity="0.6"/>
          <line x1="85" y1="50" x2="105" y2="50" stroke="#00FFFF" strokeWidth="2" opacity="0.45"/>
          <line x1="85" y1="65" x2="98" y2="65" stroke="#00FFFF" strokeWidth="2" opacity="0.55"/>
        </svg>
      </div>
    );
  }

  // Idle Santa
  return (
    <div
      className="santa-container"
      data-testid="seasonal-santa"
      style={{ position: 'fixed', bottom: '18px', right: '18px', zIndex: 1000, pointerEvents: 'auto' }}
      onMouseEnter={() => !isRunning && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleMinimize}
        aria-label={isMinimized ? 'Show' : 'Hide'}
        style={{
          position: 'absolute', top: '-8px', right: '-8px',
          width: '24px', height: '24px',
          background: 'linear-gradient(135deg, #1a2632 0%, #2a3f52 100%)',
          border: '1px solid rgba(0, 255, 255, 0.45)',
          borderRadius: '50%', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10, opacity: isHovered || isMinimized ? 1 : 0,
          transition: 'opacity 0.2s'
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2.5">
          {isMinimized ? <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/> : <path d="M4 14h6v6M14 4h6v6M20 4l-6 6M4 20l6-6"/>}
        </svg>
      </button>

      {(showTooltip || isHovered) && isVisible && !isMinimized && (
        <div
          style={{
            position: 'absolute', bottom: '145px', right: '0',
            background: 'linear-gradient(135deg, #1a2632 0%, #2a3f52 100%)',
            border: '1px solid rgba(0, 255, 255, 0.45)',
            borderRadius: '12px', padding: '12px 16px',
            fontSize: '11px', color: '#F8F9FA', whiteSpace: 'nowrap',
            boxShadow: '0 6px 28px rgba(0, 255, 255, 0.18)',
            animation: 'fadeIn 0.25s ease-out', backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ color: '#00FFFF', fontWeight: '700', marginBottom: '3px', fontSize: '13px' }}>{msg.title}</div>
          <div style={{ opacity: 0.85, fontSize: '10px' }}>{msg.sub}</div>
          <div style={{ position: 'absolute', bottom: '-6px', right: '35px', width: '12px', height: '12px', background: 'linear-gradient(135deg, #2a3f52, #1a2632)', border: '1px solid rgba(0, 255, 255, 0.45)', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)' }}/>
        </div>
      )}

      <div
        ref={santaRef}
        className="santa-char"
        data-testid="santa-idle"
        style={{
          width: '110px', height: '138px', opacity: 0,
          cursor: 'pointer',
          filter: isHovered ? 'drop-shadow(0 0 22px rgba(0, 255, 255, 0.5))' : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
          transition: 'filter 0.25s'
        }}
      >
        <svg viewBox="0 0 110 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="idleBody" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#1a2632"/>
              <stop offset="100%" stopColor="#2a3f52"/>
            </linearGradient>
            <linearGradient id="idleCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF"/>
              <stop offset="100%" stopColor="#6495ED"/>
            </linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          
          {/* Body */}
          <ellipse cx="55" cy="96" rx="35" ry="38" fill="url(#idleBody)" stroke="#00FFFF" strokeWidth="1.2" strokeOpacity="0.4"/>
          <path d="M20 115 Q55 132 90 115" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round"/>
          
          {/* Belt */}
          <rect x="20" y="88" width="70" height="12" rx="2" fill="#141f28" stroke="#00FFFF" strokeWidth="0.8" strokeOpacity="0.35"/>
          <rect x="46" y="84" width="18" height="20" rx="4" fill="url(#idleCyan)" filter="url(#glow)"/>
          <rect x="51" y="89" width="8" height="10" rx="2" fill="#1a2632"/>
          
          {/* Buttons */}
          <circle cx="55" cy="70" r="4.5" fill="#00FFFF" opacity="0.7" filter="url(#glow)"/>
          <circle cx="55" cy="108" r="4.5" fill="#00FFFF" opacity="0.7" filter="url(#glow)"/>
          
          {/* Head */}
          <g className="santa-head" style={{ transformOrigin: '55px 40px' }}>
            <circle cx="55" cy="40" r="26" fill="#F8E6D9" stroke="#1a2632" strokeWidth="0.8"/>
            <ellipse cx="40" cy="46" rx="5" ry="3.5" fill="#00FFFF" opacity="0.1"/>
            <ellipse cx="70" cy="46" rx="5" ry="3.5" fill="#00FFFF" opacity="0.1"/>
            <ellipse className="santa-eye" cx="44" cy="36" rx="3.5" ry="4" fill="#1a2632" style={{ transformOrigin: '44px 36px' }}/>
            <ellipse className="santa-eye" cx="66" cy="36" rx="3.5" ry="4" fill="#1a2632" style={{ transformOrigin: '66px 36px' }}/>
            <circle cx="45.2" cy="34.5" r="1.3" fill="white"/>
            <circle cx="67.2" cy="34.5" r="1.3" fill="white"/>
            <ellipse cx="55" cy="47" rx="5.5" ry="4.5" fill="#E8B89D"/>
            <ellipse cx="55" cy="45.5" r="2" fill="#00FFFF" opacity="0.12"/>
            <path d="M46 54 Q55 63 64 54" stroke="#1a2632" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
            <path d="M29 50 Q37 55 44 57 Q55 77 66 57 Q73 55 81 50" fill="white" stroke="#E8E8E8" strokeWidth="0.4"/>
            <path d="M37 58 Q55 72 73 58" fill="#F8F8F8" opacity="0.8"/>
            <path d="M40 52 Q48 57 55 52 Q62 57 70 52" fill="white"/>
            <path d="M29 36 Q37 26 44 19 Q55 3 66 19 Q73 26 81 36" fill="url(#idleBody)" stroke="#00FFFF" strokeWidth="1.2" strokeOpacity="0.4"/>
            <ellipse cx="55" cy="36" rx="28" ry="7" fill="white"/>
            <circle cx="80" cy="10" r="9" fill="white" filter="url(#glow)"/>
          </g>
          
          {/* Wave Hand */}
          <g className="santa-hand" style={{ transformOrigin: '95px 76px' }}>
            <ellipse cx="98" cy="72" rx="13" ry="9" fill="#F8E6D9" stroke="#1a2632" strokeWidth="0.6"/>
            <ellipse cx="89" cy="78" rx="8" ry="6" fill="white"/>
          </g>
          <path d="M76 65 Q86 60 94 72" stroke="url(#idleBody)" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M76 65 Q86 60 94 72" stroke="#00FFFF" strokeWidth="0.8" fill="none" strokeOpacity="0.25"/>
          
          {/* Sparkles */}
          <circle cx="22" cy="24" r="1.8" fill="#00FFFF" opacity="0.55"><animate attributeName="opacity" values="0.55;0.15;0.55" dur="2.2s" repeatCount="indefinite"/></circle>
          <circle cx="92" cy="28" r="1.4" fill="#00FFFF" opacity="0.45"><animate attributeName="opacity" values="0.45;0.1;0.45" dur="2.8s" repeatCount="indefinite"/></circle>
          <circle cx="16" cy="75" r="1.6" fill="#00FFFF" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="3.2s" repeatCount="indefinite"/></circle>
        </svg>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .santa-container:hover .santa-char { filter: drop-shadow(0 0 26px rgba(0, 255, 255, 0.55)); }
        @media (max-width: 640px) { .santa-container { bottom: 12px !important; right: 12px !important; } .santa-char { width: 88px !important; height: 110px !important; } }
        @media (prefers-reduced-motion: reduce) { .santa-container * { animation: none !important; } }
      `}</style>
    </div>
  );
};

export default SeasonalSanta;
