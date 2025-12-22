/**
 * ChristmasMusic.js - Premium Holiday Music Player
 * ESIM MYANMAR COMPANY LIMITED
 * Enhanced MP3 loading flow with progress animation
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

// Musical notes frequencies
const NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
};

// Jingle Bells melody
const JINGLE_BELLS = [
  { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.5 },
  { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.5 },
  { note: 'E4', dur: 0.25 }, { note: 'G4', dur: 0.25 }, { note: 'C4', dur: 0.35 },
  { note: 'D4', dur: 0.15 }, { note: 'E4', dur: 0.8 },
  { note: 'F4', dur: 0.25 }, { note: 'F4', dur: 0.25 }, { note: 'F4', dur: 0.35 },
  { note: 'F4', dur: 0.15 }, { note: 'F4', dur: 0.25 }, { note: 'E4', dur: 0.25 },
  { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.125 }, { note: 'E4', dur: 0.125 },
  { note: 'E4', dur: 0.25 }, { note: 'D4', dur: 0.25 }, { note: 'D4', dur: 0.25 },
  { note: 'E4', dur: 0.25 }, { note: 'D4', dur: 0.5 }, { note: 'G4', dur: 0.5 }
];

const ChristmasMusic = () => {
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const playingRef = useRef(false);
  const timeoutRef = useRef(null);
  
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing...');

  // Initialize audio with loading animation
  const initAudio = useCallback(async () => {
    if (audioCtxRef.current) return audioCtxRef.current;
    
    setLoading(true);
    setProgress(0);
    setLoadingText('Initializing audio engine...');
    
    // Simulate loading stages
    const stages = [
      { progress: 15, text: 'Loading audio context...' },
      { progress: 35, text: 'Preparing sound engine...' },
      { progress: 55, text: 'Loading holiday melodies...' },
      { progress: 75, text: 'Configuring audio output...' },
      { progress: 90, text: 'Almost ready...' },
      { progress: 100, text: 'Ready to play!' }
    ];
    
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 150 + Math.random() * 100));
      setProgress(stage.progress);
      setLoadingText(stage.text);
    }
    
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainRef.current = audioCtxRef.current.createGain();
      gainRef.current.connect(audioCtxRef.current.destination);
      gainRef.current.gain.value = volume;
      
      setTimeout(() => {
        setLoading(false);
        setReady(true);
      }, 400);
      
      return audioCtxRef.current;
    } catch (err) {
      setLoading(false);
      console.error('Audio init failed');
      return null;
    }
  }, [volume]);

  const playNote = useCallback((freq, duration, start) => {
    if (!audioCtxRef.current || !gainRef.current || !freq) return;
    
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    noteGain.gain.setValueAtTime(0, start);
    noteGain.gain.linearRampToValueAtTime(0.3, start + 0.02);
    noteGain.gain.linearRampToValueAtTime(0.15, start + duration * 0.7);
    noteGain.gain.linearRampToValueAtTime(0, start + duration);
    
    osc.connect(noteGain);
    noteGain.connect(gainRef.current);
    
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }, []);

  const playMelody = useCallback(() => {
    if (!playingRef.current || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    let time = ctx.currentTime + 0.1;
    
    JINGLE_BELLS.forEach(item => {
      if (item.note && NOTES[item.note]) {
        playNote(NOTES[item.note], item.dur * 0.85, time);
      }
      time += item.dur;
    });
    
    const total = JINGLE_BELLS.reduce((s, i) => s + i.dur, 0);
    timeoutRef.current = setTimeout(() => {
      if (playingRef.current) playMelody();
    }, (total + 2) * 1000);
  }, [playNote]);

  const start = useCallback(async () => {
    const ctx = await initAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') await ctx.resume();
    playingRef.current = true;
    setPlaying(true);
    playMelody();
  }, [initAudio, playMelody]);

  const stop = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (!isSeasonalActive()) return;
    const stored = localStorage.getItem('xmas-music-muted');
    if (stored === 'false') setMuted(false);
    const vol = localStorage.getItem('xmas-music-vol');
    if (vol) setVolume(parseFloat(vol));
    return () => {
      stop();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [stop]);

  useEffect(() => {
    if (!isSeasonalActive()) return;
    if (!muted) start();
    else stop();
  }, [muted, start, stop]);

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume;
  }, [volume]);

  const toggle = useCallback(() => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem('xmas-music-muted', String(!next));
  }, [muted]);

  const handleVolume = useCallback((e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    localStorage.setItem('xmas-music-vol', String(v));
  }, []);

  if (!isSeasonalActive()) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '20px',
        zIndex: 998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px'
      }}
    >
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, rgba(26, 38, 50, 0.98) 0%, rgba(20, 30, 42, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '16px',
              padding: '18px',
              minWidth: '200px',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 255, 255, 0.1)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(180deg, #00FFFF 0%, #6495ED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0, 255, 255, 0.35)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a2632" strokeWidth="2.5">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div>
                <div style={{ color: '#F8F9FA', fontWeight: '700', fontSize: '14px' }}>Holiday Music</div>
                <div style={{ color: playing ? '#00FFFF' : '#8B9CAF', fontSize: '11px', fontWeight: '500' }}>
                  {loading ? loadingText : playing ? 'Now Playing' : 'Paused'}
                </div>
              </div>
            </div>

            {/* Loading Progress */}
            {loading && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                    style={{ 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #00FFFF, #6495ED)', 
                      borderRadius: '3px',
                      boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                    }}
                  />
                </div>
                <div style={{ color: '#8B9CAF', fontSize: '10px', marginTop: '6px', textAlign: 'center' }}>
                  {Math.round(progress)}% - {loadingText}
                </div>
              </div>
            )}

            {/* Volume */}
            {!loading && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#8B9CAF', fontSize: '11px', fontWeight: '500' }}>Volume</span>
                  <span style={{ color: '#00FFFF', fontSize: '11px', fontWeight: '700' }}>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolume}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: `linear-gradient(to right, #00FFFF 0%, #6495ED ${volume * 100}%, rgba(255,255,255,0.08) ${volume * 100}%)`,
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={toggle}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: playing ? 'rgba(0, 255, 255, 0.1)' : 'linear-gradient(180deg, #00FFFF 0%, #6495ED 100%)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                color: playing ? '#00FFFF' : '#1a2632',
                fontWeight: '700',
                fontSize: '13px',
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.5 : 1,
                boxShadow: playing ? 'none' : '0 4px 16px rgba(0, 255, 255, 0.3)'
              }}
            >
              {playing ? (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Pause</>
              ) : (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>Play</>
              )}
            </button>

            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '9px' }}>Auto-disable: Feb 1, 2026</span>
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
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(26, 38, 50, 0.98) 0%, rgba(20, 30, 42, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: playing ? '2px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: playing ? '0 0 20px rgba(0, 255, 255, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        }}
      >
        {playing && (
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '12px', border: '2px solid #00FFFF' }}
          />
        )}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={playing ? '#00FFFF' : '#F8F9FA'} strokeWidth="2">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      </motion.button>

      <div style={{ color: playing ? '#00FFFF' : '#8B9CAF', fontSize: '9px', fontWeight: '600', textAlign: 'center', width: '48px' }}>
        {playing ? 'Playing' : 'Music'}
      </div>
    </div>
  );
};

export default ChristmasMusic;
