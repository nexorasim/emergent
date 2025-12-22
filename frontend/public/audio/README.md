# Christmas Audio Assets

This folder contains audio assets for the seasonal Christmas music feature.

## Required Files

For MP3 audio playback, add the following file:
- `christmas-music.mp3` - Holiday background music (optional)

## Current Implementation

The ChristmasMusic.js component uses Web Audio API to generate synthesized holiday music (Jingle Bells melody) without requiring external audio files. This approach:

1. Reduces bundle size
2. Eliminates licensing concerns
3. Provides consistent playback across devices
4. Allows dynamic volume control

## Adding Custom MP3 (Optional)

If you prefer to use a custom MP3 file:

1. Add your licensed MP3 file as `christmas-music.mp3`
2. Update ChristmasMusic.js to use the Audio API instead of Web Audio API
3. Ensure the audio file is properly licensed for commercial use

## Audio Specifications

If adding custom audio:
- Format: MP3 (recommended) or OGG
- Bitrate: 128-192 kbps
- Duration: 2-5 minutes (will loop)
- Volume: Normalized to -14 LUFS

## Licensing

Ensure any audio files added to this folder are:
- Royalty-free
- Licensed for commercial use
- Properly attributed if required

## Seasonal Period

Audio features are active: December 15, 2025 - January 31, 2026
Auto-disable: February 1, 2026
