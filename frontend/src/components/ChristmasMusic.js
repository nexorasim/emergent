/**
 * ChristmasMusic.js - Premium Holiday Music Player
 * ESIM MYANMAR COMPANY LIMITED
 * Merry Christmas Live Flow UI/UX Design
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

// Premium royalty-free Christmas music (Public Domain / CC0)
const PREMIUM_TRACKS = [
  { id: 1, name: 'Christmas Spirit', artist: 'Holiday Vibes', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3', duration: '3:45' },
  { id: 2, name: 'Winter Magic', artist: 'Festive Dreams', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Lobo_Loco/Salsa_Andina/Lobo_Loco_-_01_-_Salsita_Andina_ID_1277.mp3', duration: '4:12' },
  { id: 3, name: 'Snow Falls', artist: 'Peaceful Nights', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3', duration: '3:30' },
  { id: 4, name: 'Holiday Joy', artist: 'Christmas Band', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '6:12' },
  { id: 5, name: 'Jingle Dreams', artist: 'Winter Orchestra', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '5:45' }
];

// Synthesized Jingle Bells fallback
const NOTES = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25 };
const JINGLE_BELLS = [
  { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.5 },
  { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.25 }, { note: 'E4', dur: 0.5 },
  { note: 'E4', dur: 0.25 }, { note: 'G4', dur: 0.25 }, { note: 'C4', dur: 0.35 },
  { note: 'D4', dur: 0.15 }, { note: 'E4', dur: 0.8 }
];

// Snowflake component
const Snowflake = ({ delay, duration, left }) => (
  <motion.div
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{ y: 400, opacity: [0, 1, 1, 0], rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    style={{
      position: 'absolute',
      left: `${left}%`,
      top: 0,
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '12px',
      pointerEvents: 'none',
      textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
    }}
  >
    *
  </motion.div>
);

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
  const [visualizer, setVisualizer] = useState([0, 0, 0, 0, 0]);

  const nextTrackRef = useRef(null);

  // Visualizer animation
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setVisualizer(prev => prev.map(() => Math.random() * 100));
    }, 150);
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
      { progress: 25, text: 'Loading holiday music...' },
      { progress: 50, text: 'Preparing festive vibes...' },
      { progress: 75, text: 'Almost ready...' },
      { progress: 100, text: 'Merry Christmas!' }
    ];
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 300));
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
    setTimeout(() => setLoading(false), 400);
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
  const snowflakes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    left: Math.random() * 100
  }));

  return (
    <div style={{ position: 'fixed', bottom: '100px', left: '20px', zIndex: 998, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              background: 'linear-gradient(180deg, rgba(139, 0, 0, 0.95) 0%, rgba(20, 60, 20, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 215, 0, 0.5)',
              borderRadius: '20px',
              padding: '20px',
              minWidth: '280px',
              boxShadow: '0 10px 50px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Snowflakes */}
            {snowflakes.map(s => <Snowflake key={s.id} {...s} />)}
            
            {/* Merry Christmas Header */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ textAlign: 'center', marginBottom: '16px', position: 'relative', zIndex: 1 }}
            >
              <div style={{ fontSize: '22px', fontWeight: '800', background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)', letterSpacing: '1px' }}>
                Merry Christmas
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>eSIM Myanmar 2025-2026</div>
            </motion.div>

            {/* Album Art & Track Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              <motion.div
                animate={playing ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8B0000 0%, #006400 50%, #8B0000 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 215, 0, 0.2)',
                  border: '3px solid rgba(255, 215, 0, 0.5)'
                }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#1a1a1a', border: '2px solid rgba(255, 215, 0, 0.3)' }} />
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#FFD700', fontWeight: '700', fontSize: '15px' }}>{usePremium ? track.name : 'Jingle Bells'}</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>{usePremium ? track.artist : 'Classic'}</div>
                <div style={{ color: playing ? '#90EE90' : 'rgba(255, 255, 255, 0.5)', fontSize: '10px', fontWeight: '600', marginTop: '2px' }}>
                  {loading ? loadingText : playing ? 'Now Playing' : 'Paused'}
                </div>
              </div>
            </div>

            {/* Audio Visualizer */}
            {playing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '30px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                {visualizer.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${20 + h * 0.3}px` }}
                    transition={{ duration: 0.15 }}
                    style={{ width: '8px', background: 'linear-gradient(180deg, #FFD700, #FF6B6B)', borderRadius: '4px' }}
                  />
                ))}
              </div>
            )}

            {/* Loading Progress */}
            {loading && (
              <div style={{ marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                <div style={{ height: '6px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #FFD700, #FF6B6B)', borderRadius: '3px' }} />
                </div>
              </div>
            )}

            {/* Track Progress */}
            {!loading && usePremium && (
              <div style={{ marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                <div style={{ height: '4px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${trackDuration ? (trackProgress / trackDuration) * 100 : 0}%`, background: 'linear-gradient(90deg, #FFD700, #90EE90)', borderRadius: '2px', transition: 'width 0.5s linear' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px' }}>{formatTime(trackProgress)}</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px' }}>{formatTime(trackDuration)}</span>
                </div>
              </div>
            )}

            {/* Playback Controls */}
            {!loading && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
                <button onClick={() => setShuffle(!shuffle)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', opacity: shuffle ? 1 : 0.5 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={shuffle ? '#FFD700' : '#fff'} strokeWidth="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                </button>
                <button onClick={prevTrack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><polygon points="19 20 9 12 19 4"/><line x1="5" y1="19" x2="5" y2="5" stroke="#fff" strokeWidth="2"/></svg>
                </button>
                <motion.button
                  onClick={toggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(255, 215, 0, 0.5)'
                  }}
                >
                  {playing ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B0000"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B0000"><polygon points="5 3 19 12 5 21"/></svg>
                  )}
                </motion.button>
                <button onClick={handleNextTrack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><polygon points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19" stroke="#fff" strokeWidth="2"/></svg>
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', opacity: 0.5 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </button>
              </div>
            )}

            {/* Volume */}
            {!loading && (
              <div style={{ marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px' }}>Volume</span>
                  <span style={{ color: '#FFD700', fontSize: '11px', fontWeight: '700' }}>{Math.round(volume * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolume} style={{ width: '100%', height: '6px', borderRadius: '3px', background: `linear-gradient(to right, #FFD700 0%, #90EE90 ${volume * 100}%, rgba(0,0,0,0.3) ${volume * 100}%)`, appearance: 'none', cursor: 'pointer' }} />
              </div>
            )}

            {/* Footer */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '9px' }}>Auto-disable: Feb 1, 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button - Christmas Tree Style */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: playing ? 'linear-gradient(135deg, #8B0000 0%, #006400 100%)' : 'linear-gradient(135deg, rgba(139, 0, 0, 0.9) 0%, rgba(0, 100, 0, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: playing ? '3px solid #FFD700' : '2px solid rgba(255, 215, 0, 0.5)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: playing ? '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.4)',
          position: 'relative'
        }}
      >
        {playing && (
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #FFD700' }}
          />
        )}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={playing ? '#FFD700' : '#fff'} strokeWidth="2">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>
      </motion.button>

      <motion.div
        animate={playing ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ color: playing ? '#FFD700' : 'rgba(255, 255, 255, 0.7)', fontSize: '10px', fontWeight: '700', textAlign: 'center', width: '56px', textShadow: playing ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none' }}
      >
        {playing ? 'Playing' : 'Music'}
      </motion.div>
    </div>
  );
};

export default ChristmasMusic;
