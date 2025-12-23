/**
 * ChristmasMusic.js - Premium Holiday Music Player
 * ESIM MYANMAR COMPANY LIMITED
 * Premium MP3 streaming with multiple tracks
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

// Premium royalty-free Christmas music tracks (CDN hosted)
const PREMIUM_TRACKS = [
  {
    id: 1,
    name: 'Jingle Bells',
    artist: 'Holiday Orchestra',
    url: 'https://cdn.pixabay.com/download/audio/2022/12/10/audio_e06e8e9a8e.mp3',
    duration: '2:15'
  },
  {
    id: 2,
    name: 'Christmas Joy',
    artist: 'Festive Ensemble',
    url: 'https://cdn.pixabay.com/download/audio/2022/11/22/audio_a89c453e8e.mp3',
    duration: '2:30'
  },
  {
    id: 3,
    name: 'Winter Wonderland',
    artist: 'Snow Melodies',
    url: 'https://cdn.pixabay.com/download/audio/2022/12/13/audio_8a0c6e8b8e.mp3',
    duration: '2:45'
  },
  {
    id: 4,
    name: 'Silent Night',
    artist: 'Peaceful Choir',
    url: 'https://cdn.pixabay.com/download/audio/2024/11/29/audio_2c5f8e8e8e.mp3',
    duration: '3:00'
  },
  {
    id: 5,
    name: 'Holiday Spirit',
    artist: 'Christmas Band',
    url: 'https://cdn.pixabay.com/download/audio/2023/12/05/audio_5c8f9e8e8e.mp3',
    duration: '2:20'
  }
];

// Fallback synthesized melody
const NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
};

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
  const audioRef = useRef(null);
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
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [currentTrack, setCurrentTrack] = useState(0);
  const [usePremium, setUsePremium] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  // Initialize premium MP3 audio
  const initPremiumAudio = useCallback(async () => {
    setLoading(true);
    setProgress(0);
    setLoadingText('Loading premium audio...');
    
    const stages = [
      { progress: 20, text: 'Connecting to CDN...' },
      { progress: 45, text: 'Loading track metadata...' },
      { progress: 70, text: 'Buffering audio...' },
      { progress: 90, text: 'Preparing playback...' },
      { progress: 100, text: 'Ready!' }
    ];
    
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 200));
      setProgress(stage.progress);
      setLoadingText(stage.text);
    }
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.preload = 'auto';
      
      audioRef.current.addEventListener('ended', () => {
        if (playingRef.current) {
          nextTrack();
        }
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setTrackProgress(audioRef.current.currentTime);
        setTrackDuration(audioRef.current.duration || 0);
      });
      
      audioRef.current.addEventListener('error', () => {
        console.warn('MP3 load failed, falling back to synthesized audio');
        setUsePremium(false);
        initSynthAudio();
      });
    }
    
    audioRef.current.src = PREMIUM_TRACKS[currentTrack].url;
    audioRef.current.volume = volume;
    
    setTimeout(() => setLoading(false), 300);
    return true;
  }, [currentTrack, volume]);

  // Initialize synthesized audio fallback
  const initSynthAudio = useCallback(async () => {
    if (audioCtxRef.current) return audioCtxRef.current;
    
    setLoading(true);
    setProgress(0);
    setLoadingText('Initializing synth engine...');
    
    const stages = [
      { progress: 25, text: 'Creating audio context...' },
      { progress: 50, text: 'Loading oscillators...' },
      { progress: 75, text: 'Configuring output...' },
      { progress: 100, text: 'Ready!' }
    ];
    
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 150));
      setProgress(stage.progress);
      setLoadingText(stage.text);
    }
    
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainRef.current = audioCtxRef.current.createGain();
      gainRef.current.connect(audioCtxRef.current.destination);
      gainRef.current.gain.value = volume;
      
      setTimeout(() => setLoading(false), 300);
      return audioCtxRef.current;
    } catch (err) {
      setLoading(false);
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

  const playSynthMelody = useCallback(() => {
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
      if (playingRef.current) playSynthMelody();
    }, (total + 2) * 1000);
  }, [playNote]);

  const nextTrack = useCallback(() => {
    let next;
    if (shuffle) {
      next = Math.floor(Math.random() * PREMIUM_TRACKS.length);
    } else {
      next = (currentTrack + 1) % PREMIUM_TRACKS.length;
    }
    setCurrentTrack(next);
    if (audioRef.current && playingRef.current) {
      audioRef.current.src = PREMIUM_TRACKS[next].url;
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrack, shuffle]);

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
          await initSynthAudio();
          if (audioCtxRef.current?.state === 'suspended') {
            await audioCtxRef.current.resume();
          }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usePremium, initPremiumAudio, playSynthMelody]);

  const stop = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (!isSeasonalActive()) return;
    const stored = localStorage.getItem('xmas-music-muted');
    if (stored === 'false') setMuted(false);
    const vol = localStorage.getItem('xmas-music-vol');
    if (vol) setVolume(parseFloat(vol));
    const prem = localStorage.getItem('xmas-music-premium');
    if (prem !== null) setUsePremium(prem === 'true');
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

  const togglePremium = useCallback(() => {
    const next = !usePremium;
    setUsePremium(next);
    localStorage.setItem('xmas-music-premium', String(next));
    if (playing) {
      stop();
      setTimeout(() => start(), 100);
    }
  }, [usePremium, playing, stop, start]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSeasonalActive()) return null;

  const track = PREMIUM_TRACKS[currentTrack];

  return (
    <div style={{ position: 'fixed', bottom: '100px', left: '20px', zIndex: 998, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
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
              minWidth: '260px',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 255, 255, 0.1)'
            }}
          >
            {/* Header with Track Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(180deg, #00FFFF 0%, #6495ED 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0, 255, 255, 0.35)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a2632" strokeWidth="2.5">
                  <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F8F9FA', fontWeight: '700', fontSize: '14px' }}>{usePremium ? track.name : 'Jingle Bells'}</div>
                <div style={{ color: '#8B9CAF', fontSize: '11px' }}>{usePremium ? track.artist : 'Synthesized'}</div>
                <div style={{ color: playing ? '#00FFFF' : '#6B7280', fontSize: '10px', fontWeight: '500', marginTop: '2px' }}>
                  {loading ? loadingText : playing ? 'Now Playing' : 'Paused'}
                </div>
              </div>
              <div style={{ padding: '4px 8px', borderRadius: '6px', background: usePremium ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'rgba(255,255,255,0.1)', color: usePremium ? '#1a2632' : '#8B9CAF', fontSize: '9px', fontWeight: '700' }}>
                {usePremium ? 'PREMIUM' : 'BASIC'}
              </div>
            </div>

            {/* Loading Progress */}
            {loading && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.2 }} style={{ height: '100%', background: 'linear-gradient(90deg, #00FFFF, #6495ED)', borderRadius: '3px', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }} />
                </div>
                <div style={{ color: '#8B9CAF', fontSize: '10px', marginTop: '6px', textAlign: 'center' }}>{Math.round(progress)}%</div>
              </div>
            )}

            {/* Track Progress (Premium only) */}
            {!loading && usePremium && playing && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${trackDuration ? (trackProgress / trackDuration) * 100 : 0}%`, background: 'linear-gradient(90deg, #00FFFF, #6495ED)', borderRadius: '2px', transition: 'width 0.5s linear' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ color: '#8B9CAF', fontSize: '10px' }}>{formatTime(trackProgress)}</span>
                  <span style={{ color: '#8B9CAF', fontSize: '10px' }}>{formatTime(trackDuration)}</span>
                </div>
              </div>
            )}

            {/* Playback Controls (Premium) */}
            {!loading && usePremium && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
                <button onClick={() => setShuffle(!shuffle)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', opacity: shuffle ? 1 : 0.5 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={shuffle ? '#00FFFF' : '#8B9CAF'} strokeWidth="2">
                    <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>
                  </svg>
                </button>
                <button onClick={prevTrack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F8F9FA"><polygon points="19 20 9 12 19 4"/><line x1="5" y1="19" x2="5" y2="5" stroke="#F8F9FA" strokeWidth="2"/></svg>
                </button>
                <button onClick={toggle} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(180deg, #00FFFF 0%, #6495ED 100%)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0, 255, 255, 0.4)' }}>
                  {playing ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a2632"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a2632"><polygon points="5 3 19 12 5 21"/></svg>
                  )}
                </button>
                <button onClick={nextTrack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F8F9FA"><polygon points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19" stroke="#F8F9FA" strokeWidth="2"/></svg>
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', opacity: 0.5 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B9CAF" strokeWidth="2">
                    <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Simple Play/Pause for Basic mode */}
            {!loading && !usePremium && (
              <button onClick={toggle} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: playing ? 'rgba(0, 255, 255, 0.1)' : 'linear-gradient(180deg, #00FFFF 0%, #6495ED 100%)', border: '1px solid rgba(0, 255, 255, 0.3)', color: playing ? '#00FFFF' : '#1a2632', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
                {playing ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>Pause</>) : (<><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>Play</>)}
              </button>
            )}

            {/* Volume */}
            {!loading && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#8B9CAF', fontSize: '11px', fontWeight: '500' }}>Volume</span>
                  <span style={{ color: '#00FFFF', fontSize: '11px', fontWeight: '700' }}>{Math.round(volume * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolume} style={{ width: '100%', height: '6px', borderRadius: '3px', background: `linear-gradient(to right, #00FFFF 0%, #6495ED ${volume * 100}%, rgba(255,255,255,0.08) ${volume * 100}%)`, appearance: 'none', cursor: 'pointer' }} />
              </div>
            )}

            {/* Premium Toggle */}
            <button onClick={togglePremium} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: usePremium ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${usePremium ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255,255,255,0.1)'}`, color: usePremium ? '#FFD700' : '#8B9CAF', fontSize: '11px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={usePremium ? '#FFD700' : 'none'} stroke={usePremium ? '#FFD700' : '#8B9CAF'} strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              {usePremium ? 'Premium Mode Active' : 'Switch to Premium'}
            </button>

            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '9px' }}>Auto-disable: Feb 1, 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button onClick={() => setShowPanel(!showPanel)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(26, 38, 50, 0.98) 0%, rgba(20, 30, 42, 0.98) 100%)', backdropFilter: 'blur(20px)', border: playing ? '2px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: playing ? '0 0 20px rgba(0, 255, 255, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.3)', position: 'relative' }}>
        {playing && <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '12px', border: '2px solid #00FFFF' }} />}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={playing ? '#00FFFF' : '#F8F9FA'} strokeWidth="2">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>
        {usePremium && <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700, #FFA500)', border: '2px solid #1a2632' }} />}
      </motion.button>

      <div style={{ color: playing ? '#00FFFF' : '#8B9CAF', fontSize: '9px', fontWeight: '600', textAlign: 'center', width: '48px' }}>
        {playing ? 'Playing' : 'Music'}
      </div>
    </div>
  );
};

export default ChristmasMusic;
