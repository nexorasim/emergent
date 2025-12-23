/**
 * ChristmasMusic.js - eSIM Myanmar Holiday Music Player
 * ESIM MYANMAR COMPANY LIMITED
 * Brand-aligned UI with Cyan/Dark Blue theme
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

// Premium royalty-free music tracks
const PREMIUM_TRACKS = [
  { id: 1, name: 'Holiday Vibes', artist: 'eSIM Myanmar', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '6:12' },
  { id: 2, name: 'Winter Dreams', artist: 'Festive Mix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '5:45' },
  { id: 3, name: 'Snow Melody', artist: 'Chill Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '5:30' },
  { id: 4, name: 'Peaceful Night', artist: 'Ambient', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '4:58' },
  { id: 5, name: 'New Year 2026', artist: 'Celebration', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '5:15' }
];

// Synthesized Jingle Bells fallback
const NOTES = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25 };
const JINGLE_BELLS = [
  { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.5 },
  { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.5 },
  { note: 'E4', dur: 0.25 }, { note: 'G4', dur: 0.25 }, { note: 'C4', dur: 0.35 },
  { note: 'D4', dur: 0.15 }, { note: 'E4', dur: 0.8 }
];

const ChristmasMusic = () => {
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const playingRef = useRef(false);
  const timeoutRef = useRef(null);
  
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [currentTrack, setCurrentTrack] = useState(0);
  const [usePremium, setUsePremium] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [visualizer, setVisualizer] = useState([0, 0, 0, 0, 0, 0, 0]);

  const nextTrackRef = useRef(null);

  // Visualizer animation
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setVisualizer(prev => prev.map(() => 20 + Math.random() * 80));
    }, 120);
    return () => clearInterval(interval);
  }, [playing]);

  const handleNextTrack = useCallback(() => {
    let next = shuffle ? Math.floor(Math.random() * PREMIUM_TRACKS.length) : (currentTrack + 1) % PREMIUM_TRACKS.length;
    setCurrentTrack(next);
    if (audioRef.current && playingRef.current) {
      audioRef.current.src = PREMIUM_TRACKS[next].url;
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrack, shuffle]);

  nextTrackRef.current = handleNextTrack;

  const initSynthAudio = useCallback(async () => {
    if (audioCtxRef.current) return audioCtxRef.current;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      gainRef.current = audioCtxRef.current.createGain();
      gainRef.current.connect(audioCtxRef.current.destination);
      gainRef.current.gain.value = volume;
      return audioCtxRef.current;
    } catch (err) {
      return null;
    }
  }, [volume]);

  const initPremiumAudio = useCallback(async () => {
    setLoading(true);
    setProgress(0);
    const stages = [
      { progress: 30, text: 'Connecting...' },
      { progress: 60, text: 'Loading track...' },
      { progress: 90, text: 'Buffering...' },
      { progress: 100, text: 'Ready!' }
    ];
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 250));
      setProgress(stage.progress);
      setLoadingText(stage.text);
    }
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.preload = 'auto';
      audioRef.current.addEventListener('ended', () => {
        if (playingRef.current && nextTrackRef.current) nextTrackRef.current();
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setTrackProgress(audioRef.current.currentTime);
        setTrackDuration(audioRef.current.duration || 0);
      });
      audioRef.current.addEventListener('error', () => setUsePremium(false));
    }
    audioRef.current.src = PREMIUM_TRACKS[currentTrack].url;
    audioRef.current.volume = volume;
    setTimeout(() => setLoading(false), 300);
    return true;
  }, [currentTrack, volume]);

  const playNote = useCallback((freq, duration, startTime) => {
    if (!audioCtxRef.current || !gainRef.current || !freq) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
    noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
    osc.connect(noteGain);
    noteGain.connect(gainRef.current);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }, []);

  const playSynthMelody = useCallback(() => {
    if (!playingRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    let time = ctx.currentTime + 0.1;
    JINGLE_BELLS.forEach(item => {
      if (item.note && NOTES[item.note]) playNote(NOTES[item.note], item.dur * 0.85, time);
      time += item.dur;
    });
    const total = JINGLE_BELLS.reduce((s, i) => s + i.dur, 0);
    timeoutRef.current = setTimeout(() => { if (playingRef.current) playSynthMelody(); }, (total + 2) * 1000);
  }, [playNote]);

  const prevTrack = useCallback(() => {
    const prev = currentTrack === 0 ? PREMIUM_TRACKS.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    if (audioRef.current && playingRef.current) {
      audioRef.current.src = PREMIUM_TRACKS[prev].url;
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrack]);

  const start = useCallback(async () => {
    if (usePremium) {
      await initPremiumAudio();
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          playingRef.current = true;
          setPlaying(true);
        } catch (err) {
          setUsePremium(false);
          const ctx = await initSynthAudio();
          if (ctx && ctx.state === 'suspended') await ctx.resume();
          playingRef.current = true;
          setPlaying(true);
          playSynthMelody();
        }
      }
    } else {
      const ctx = await initSynthAudio();
      if (!ctx) return;
      if (ctx.state === 'suspended') await ctx.resume();
      playingRef.current = true;
      setPlaying(true);
      playSynthMelody();
    }
  }, [usePremium, initPremiumAudio, initSynthAudio, playSynthMelody]);

  const stop = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    if (audioRef.current) audioRef.current.pause();
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
      if (audioRef.current) audioRef.current.src = '';
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [stop]);

  useEffect(() => {
    if (!isSeasonalActive()) return;
    if (!muted) start();
    else stop();
  }, [muted, start, stop]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
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

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSeasonalActive()) return null;

  const track = PREMIUM_TRACKS[currentTrack];

  return (
    <div style={{ position: 'fixed', bottom: '100px', left: '20px', zIndex: 998, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.98) 0%, rgba(15, 25, 35, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '16px',
              padding: '16px',
              width: '280px',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Glow effect */}
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #00FFFF, #0099CC)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e2f3c" strokeWidth="2.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </div>
                <div>
                  <div style={{ color: '#F8F9FA', fontWeight: '700', fontSize: '13px' }}>eSIM Myanmar</div>
                  <div style={{ color: '#00FFFF', fontSize: '10px', fontWeight: '500' }}>Holiday Music</div>
                </div>
              </div>
              <button onClick={() => setShowPanel(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B9CAF" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Track Info */}
            <div style={{ background: 'rgba(0, 255, 255, 0.05)', borderRadius: '12px', padding: '12px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.div
                  animate={playing ? { rotate: 360 } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e2f3c 0%, #0a1520 100%)',
                    border: '2px solid rgba(0, 255, 255, 0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: playing ? '0 0 20px rgba(0, 255, 255, 0.3)' : 'none'
                  }}
                >
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#00FFFF', opacity: 0.8 }} />
                </motion.div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#F8F9FA', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{usePremium ? track.name : 'Jingle Bells'}</div>
                  <div style={{ color: '#8B9CAF', fontSize: '11px' }}>{usePremium ? track.artist : 'Classic'}</div>
                  <div style={{ color: playing ? '#00FFFF' : '#6B7280', fontSize: '10px', fontWeight: '500', marginTop: '2px' }}>
                    {loading ? loadingText : playing ? 'Now Playing' : 'Paused'}
                  </div>
                </div>
              </div>
            </div>

            {/* Visualizer */}
            {playing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', height: '24px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                {visualizer.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${h * 0.24}px` }}
                    transition={{ duration: 0.1 }}
                    style={{ width: '4px', background: 'linear-gradient(180deg, #00FFFF, #0066AA)', borderRadius: '2px', minHeight: '4px' }}
                  />
                ))}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div style={{ marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #00FFFF, #00D4AA)', borderRadius: '2px' }} />
                </div>
              </div>
            )}

            {/* Progress */}
            {!loading && usePremium && (
              <div style={{ marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${trackDuration ? (trackProgress / trackDuration) * 100 : 0}%`, background: 'linear-gradient(90deg, #00FFFF, #00D4AA)', borderRadius: '2px', transition: 'width 0.3s linear' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ color: '#8B9CAF', fontSize: '10px' }}>{formatTime(trackProgress)}</span>
                  <span style={{ color: '#8B9CAF', fontSize: '10px' }}>{formatTime(trackDuration)}</span>
                </div>
              </div>
            )}

            {/* Controls */}
            {!loading && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                <button onClick={() => setShuffle(!shuffle)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', opacity: shuffle ? 1 : 0.4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={shuffle ? '#00FFFF' : '#8B9CAF'} strokeWidth="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                </button>
                <button onClick={prevTrack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F8F9FA"><polygon points="19 20 9 12 19 4"/><line x1="5" y1="19" x2="5" y2="5" stroke="#F8F9FA" strokeWidth="2"/></svg>
                </button>
                <motion.button
                  onClick={toggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0, 255, 255, 0.4)'
                  }}
                >
                  {playing ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1e2f3c"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1e2f3c"><polygon points="5 3 19 12 5 21"/></svg>
                  )}
                </motion.button>
                <button onClick={handleNextTrack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F8F9FA"><polygon points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19" stroke="#F8F9FA" strokeWidth="2"/></svg>
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', opacity: 0.4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B9CAF" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </button>
              </div>
            )}

            {/* Volume */}
            {!loading && (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B9CAF" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolume} style={{ flex: 1, height: '4px', borderRadius: '2px', background: `linear-gradient(to right, #00FFFF 0%, #0099CC ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`, appearance: 'none', cursor: 'pointer' }} />
                  <span style={{ color: '#00FFFF', fontSize: '10px', fontWeight: '600', minWidth: '28px' }}>{Math.round(volume * 100)}%</span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(0, 255, 255, 0.1)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <span style={{ color: '#6B7280', fontSize: '9px' }}>Season: Dec 15, 2025 - Jan 31, 2026</span>
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
          width: '48px', height: '48px', borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(15, 25, 35, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: playing ? '2px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: playing ? '0 0 25px rgba(0, 255, 255, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        }}
      >
        {playing && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '12px', border: '2px solid #00FFFF' }}
          />
        )}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={playing ? '#00FFFF' : '#F8F9FA'} strokeWidth="2">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>
      </motion.button>

      <div style={{ color: playing ? '#00FFFF' : '#8B9CAF', fontSize: '9px', fontWeight: '600', textAlign: 'center', width: '48px' }}>
        {playing ? 'Playing' : 'Music'}
      </div>
    </div>
  );
};

export default ChristmasMusic;
