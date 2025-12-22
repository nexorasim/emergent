/**
 * ChristmasMusic.js - Premium Holiday Music Controller
 * 2026 UI/UX Glassmorphism Design with Web Audio API
 * Active: December 15, 2025 - January 31, 2026
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Enhanced Christmas melody (Jingle Bells + Silent Night blend)
const MELODY_NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
  D5: 587.33, E5: 659.25, G3: 196.00, A3: 220.00,
  B3: 246.94, F5: 698.46
};

const MELODY_PATTERN = [
  { note: 'E4', duration: 0.25 }, { note: 'E4', duration: 0.25 }, { note: 'E4', duration: 0.5 },
  { note: 'E4', duration: 0.25 }, { note: 'E4', duration: 0.25 }, { note: 'E4', duration: 0.5 },
  { note: 'E4', duration: 0.25 }, { note: 'G4', duration: 0.25 }, { note: 'C4', duration: 0.35 },
  { note: 'D4', duration: 0.15 }, { note: 'E4', duration: 0.8 },
  { note: 'F4', duration: 0.25 }, { note: 'F4', duration: 0.25 }, { note: 'F4', duration: 0.35 },
  { note: 'F4', duration: 0.15 }, { note: 'F4', duration: 0.25 }, { note: 'E4', duration: 0.25 },
  { note: 'E4', duration: 0.25 }, { note: 'E4', duration: 0.125 }, { note: 'E4', duration: 0.125 },
  { note: 'E4', duration: 0.25 }, { note: 'D4', duration: 0.25 }, { note: 'D4', duration: 0.25 },
  { note: 'E4', duration: 0.25 }, { note: 'D4', duration: 0.5 }, { note: 'G4', duration: 0.5 },
  { note: null, duration: 0.5 }
];

const ChristmasMusic = () => {
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const isPlayingRef = useRef(false);
  const melodyTimeoutRef = useRef(null);
  
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showPanel, setShowPanel] = useState(false);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = volume;
    }
    return audioContextRef.current;
  }, [volume]);

  const playNote = useCallback((frequency, duration, startTime) => {
    if (!audioContextRef.current || !gainNodeRef.current || !frequency) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
    noteGain.gain.linearRampToValueAtTime(0.15, startTime + duration * 0.6);
    noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
    
    oscillator.connect(noteGain);
    noteGain.connect(gainNodeRef.current);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
  }, []);

  const playAmbientPad = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const chordNotes = [MELODY_NOTES.C4 / 2, MELODY_NOTES.E4 / 2, MELODY_NOTES.G4 / 2];
    
    chordNotes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const padGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      padGain.gain.setValueAtTime(0, now);
      padGain.gain.linearRampToValueAtTime(0.06, now + 1.5);
      padGain.gain.linearRampToValueAtTime(0.06, now + 5);
      padGain.gain.linearRampToValueAtTime(0, now + 7);
      
      osc.connect(padGain);
      padGain.connect(gainNodeRef.current);
      
      osc.start(now);
      osc.stop(now + 7.5);
    });
  }, []);

  const playMelody = useCallback(() => {
    if (!isPlayingRef.current || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    let currentTime = ctx.currentTime + 0.1;
    
    playAmbientPad();
    
    MELODY_PATTERN.forEach((item) => {
      if (item.note) {
        const freq = MELODY_NOTES[item.note];
        if (freq) playNote(freq, item.duration * 0.85, currentTime);
      }
      currentTime += item.duration;
    });
    
    const totalDuration = MELODY_PATTERN.reduce((sum, item) => sum + item.duration, 0);
    melodyTimeoutRef.current = setTimeout(() => {
      if (isPlayingRef.current) playMelody();
    }, (totalDuration + 1.5) * 1000);
  }, [playNote, playAmbientPad]);

  const startMusic = useCallback(() => {
    const ctx = initAudio();
    if (ctx.state === 'suspended') ctx.resume();
    isPlayingRef.current = true;
    setIsPlaying(true);
    playMelody();
  }, [initAudio, playMelody]);

  const stopMusic = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (melodyTimeoutRef.current) clearTimeout(melodyTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!isSeasonalActive()) return;
    const storedMute = localStorage.getItem('christmas-music-muted');
    if (storedMute === 'false') setIsMuted(false);
    const storedVolume = localStorage.getItem('christmas-music-volume');
    if (storedVolume) setVolume(parseFloat(storedVolume));
    return () => {
      stopMusic();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stopMusic]);

  useEffect(() => {
    if (!isSeasonalActive()) return;
    if (!isMuted) startMusic();
    else stopMusic();
  }, [isMuted, startMusic, stopMusic]);

  useEffect(() => {
    if (gainNodeRef.current) gainNodeRef.current.gain.value = volume;
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
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px'
      }}
    >
      {/* Expanded Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(22, 36, 48, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              minWidth: '200px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 255, 255, 0.1)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e2f3c" strokeWidth="2.5">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div>
                <div style={{ color: '#F8F9FA', fontWeight: '700', fontSize: '14px' }}>Holiday Music</div>
                <div style={{ color: '#00FFFF', fontSize: '11px' }}>
                  {isPlaying ? 'Now Playing' : 'Paused'}
                </div>
              </div>
            </div>

            {/* Volume Control */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Volume</span>
                <span style={{ color: '#00FFFF', fontSize: '12px', fontWeight: '600' }}>
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: `linear-gradient(to right, #00FFFF 0%, #00FFFF ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`,
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={toggleMute}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: isPlaying 
                  ? 'rgba(0, 255, 255, 0.15)' 
                  : 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                color: isPlaying ? '#00FFFF' : '#1e2f3c',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isPlaying ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Play
                </>
              )}
            </button>

            {/* Info */}
            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '10px' }}>
                Auto-disable: Feb 1, 2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(22, 36, 48, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: isPlaying ? '2px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isPlaying 
            ? '0 0 20px rgba(0, 255, 255, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                border: '2px solid #00FFFF'
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                border: '2px solid #00FFFF'
              }}
            />
          </>
        )}
        
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isPlaying ? '#00FFFF' : '#F8F9FA'} 
          strokeWidth="2"
        >
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      </motion.button>
    </div>
  );
};

export default ChristmasMusic;
