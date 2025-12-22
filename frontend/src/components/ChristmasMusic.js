/**
 * ChristmasMusic.js - Seasonal Background Music Controller
 * Enterprise-grade audio component with Web Audio API synthesized ambient music
 * Active: December 15, 2025 - January 31, 2026
 * Auto-disable: February 1, 2026
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

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

// Christmas melody notes (frequencies in Hz)
const MELODY_NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
  D5: 587.33, E5: 659.25, G3: 196.00, A3: 220.00
};

// Simple Christmas melody pattern (Jingle Bells inspired ambient)
const MELODY_PATTERN = [
  { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
  { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
  { note: 'E4', duration: 0.3 }, { note: 'G4', duration: 0.3 }, { note: 'C4', duration: 0.3 },
  { note: 'D4', duration: 0.3 }, { note: 'E4', duration: 1.2 },
  { note: 'F4', duration: 0.3 }, { note: 'F4', duration: 0.3 }, { note: 'F4', duration: 0.4 },
  { note: 'F4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 },
  { note: 'E4', duration: 0.2 }, { note: 'E4', duration: 0.2 }, { note: 'D4', duration: 0.3 },
  { note: 'D4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'D4', duration: 0.6 },
  { note: 'G4', duration: 0.8 }
];

const ChristmasMusic = () => {
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const isPlayingRef = useRef(false);
  const melodyTimeoutRef = useRef(null);
  
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);

  // Initialize Web Audio API
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = volume;
    }
    return audioContextRef.current;
  }, [volume]);

  // Play a single note
  const playNote = useCallback((frequency, duration, startTime) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
    noteGain.gain.linearRampToValueAtTime(0.2, startTime + duration * 0.5);
    noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
    
    oscillator.connect(noteGain);
    noteGain.connect(gainNodeRef.current);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.1);
  }, []);

  // Play ambient pad (background harmony)
  const playAmbientPad = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Create soft ambient chord
    const chordNotes = [MELODY_NOTES.C4 / 2, MELODY_NOTES.E4 / 2, MELODY_NOTES.G4 / 2];
    
    chordNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const padGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      padGain.gain.setValueAtTime(0, now);
      padGain.gain.linearRampToValueAtTime(0.08, now + 2);
      padGain.gain.linearRampToValueAtTime(0.08, now + 6);
      padGain.gain.linearRampToValueAtTime(0, now + 8);
      
      osc.connect(padGain);
      padGain.connect(gainNodeRef.current);
      
      osc.start(now);
      osc.stop(now + 8.5);
    });
  }, []);

  // Play melody sequence
  const playMelody = useCallback(() => {
    if (!isPlayingRef.current || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    let currentTime = ctx.currentTime + 0.1;
    
    // Play ambient pad
    playAmbientPad();
    
    // Play melody notes
    MELODY_PATTERN.forEach((item) => {
      const freq = MELODY_NOTES[item.note];
      if (freq) {
        playNote(freq, item.duration * 0.8, currentTime);
      }
      currentTime += item.duration;
    });
    
    // Schedule next loop
    const totalDuration = MELODY_PATTERN.reduce((sum, item) => sum + item.duration, 0);
    melodyTimeoutRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        playMelody();
      }
    }, (totalDuration + 2) * 1000);
  }, [playNote, playAmbientPad]);

  // Start music
  const startMusic = useCallback(() => {
    const ctx = initAudio();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    isPlayingRef.current = true;
    setIsPlaying(true);
    playMelody();
  }, [initAudio, playMelody]);

  // Stop music
  const stopMusic = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (melodyTimeoutRef.current) {
      clearTimeout(melodyTimeoutRef.current);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    if (!isSeasonalActive()) return;

    const storedMute = localStorage.getItem('christmas-music-muted');
    if (storedMute === 'false') {
      setIsMuted(false);
    }

    const storedVolume = localStorage.getItem('christmas-music-volume');
    if (storedVolume) {
      setVolume(parseFloat(storedVolume));
    }

    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopMusic]);

  // Handle play/pause
  useEffect(() => {
    if (!isSeasonalActive()) return;

    if (!isMuted) {
      startMusic();
    } else {
      stopMusic();
    }
  }, [isMuted, startMusic, stopMusic]);

  // Handle volume change
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('christmas-music-muted', String(!newMuted));
  }, [isMuted]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('christmas-music-volume', String(newVolume));
  }, []);

  if (!isSeasonalActive()) return null;

  return (
    <div
      className="christmas-music-container"
      style={{
        position: 'fixed',
        bottom: '130px',
        right: '20px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px'
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Volume Slider */}
      {showControls && (
        <div
          style={{
            background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '120px'
          }}
        >
          <span style={{ color: '#F8F9FA', fontSize: '11px', textAlign: 'center' }}>
            Holiday Music
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: '100%',
              accentColor: '#00FFFF',
              cursor: 'pointer'
            }}
          />
          <span style={{ color: '#00FFFF', fontSize: '10px', textAlign: 'center' }}>
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}

      {/* Music Toggle Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Play holiday music' : 'Mute holiday music'}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e2f3c 0%, #2a4a5c 100%)',
          border: `2px solid ${isPlaying ? '#00FFFF' : 'rgba(0, 255, 255, 0.3)'}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 20px rgba(0, 255, 255, 0.4)' : 'none'
        }}
      >
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F8F9FA" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="music-wave"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="music-wave-outer"/>
          </svg>
        )}
      </button>

      <style>{`
        .music-wave {
          animation: musicPulse 0.8s ease-in-out infinite;
        }
        .music-wave-outer {
          animation: musicPulse 0.8s ease-in-out infinite 0.2s;
        }
        @keyframes musicPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .christmas-music-container * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChristmasMusic;
