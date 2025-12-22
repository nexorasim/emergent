/**
 * ChristmasMusic.js - Seasonal Background Music Controller
 * Enterprise-grade audio component with mute toggle
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

const ChristmasMusic = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);

  // Initialize audio on mount
  useEffect(() => {
    if (!isSeasonalActive()) return;

    // Check stored preference
    const storedMute = localStorage.getItem('christmas-music-muted');
    if (storedMute === 'false') {
      setIsMuted(false);
    }

    const storedVolume = localStorage.getItem('christmas-music-volume');
    if (storedVolume) {
      setVolume(parseFloat(storedVolume));
    }
  }, []);

  // Handle audio playback
  useEffect(() => {
    if (!audioRef.current || !isSeasonalActive()) return;

    audioRef.current.volume = volume;
    
    if (!isMuted) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Audio autoplay blocked:', error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isMuted, volume]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('christmas-music-muted', String(!newMuted));
  }, [isMuted]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('christmas-music-volume', String(newVolume));
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Don't render if not seasonal
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
      {/* Volume Slider - Shows on hover */}
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
            Volume
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
        </div>
      )}

      {/* Music Toggle Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Play Christmas music' : 'Mute Christmas music'}
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
          // Muted icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F8F9FA" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          // Playing icon with animation
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" style={{ animation: 'pulse 1s ease-in-out infinite' }}/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" style={{ animation: 'pulse 1s ease-in-out infinite 0.2s' }}/>
          </svg>
        )}
      </button>

      {/* Audio Element - Using royalty-free placeholder */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="/audio/christmas-ambient.mp3"
      >
        Your browser does not support the audio element.
      </audio>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
