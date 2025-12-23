# eSIM Myanmar - Christmas Profile Design Specification
## Version: 1.0 | December 2025

---

## COLOR PALETTE (STRICT)

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Dark Blue/Charcoal | #1e2f3c | rgb(30, 47, 60) | Backgrounds, navigation, headers |
| Cyan/Aqua | #00FFFF | rgb(0, 255, 255) | CTAs, highlights, system states, glow effects |
| Pearl (Off-White) | #F8F9FA | rgb(248, 249, 250) | Cards, readable surfaces, text |
| Dark Background | #0f1a24 | rgb(15, 26, 36) | Gradient end, deep shadows |
| Muted Text | #9CA3AF | rgb(156, 163, 175) | Secondary text |
| Subtle Text | #6B7280 | rgb(107, 114, 128) | Tertiary text, captions |
| Glass Overlay | rgba(248,249,250,0.1) | - | Transparent overlays, modals |

---

## DESIGN DIMENSIONS

### Social Media Sizes
| Platform | Dimensions | Aspect Ratio |
|----------|------------|--------------|
| Facebook/LinkedIn Cover | 1200 x 630 px | 1.91:1 |
| Twitter Header | 1500 x 500 px | 3:1 |
| Instagram Post | 1080 x 1080 px | 1:1 |
| Instagram Story | 1080 x 1920 px | 9:16 |
| YouTube Thumbnail | 1280 x 720 px | 16:9 |

### Print Sizes
| Format | Dimensions | DPI |
|--------|------------|-----|
| Business Card | 3.5 x 2 in | 300 |
| A4 Poster | 210 x 297 mm | 300 |
| Banner | 728 x 90 px | 72 |

---

## TYPOGRAPHY

### Font Family
- Primary: Inter (Google Fonts)
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Font Weights
| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, descriptions |
| 500 | Medium | Subtitles, labels |
| 600 | SemiBold | Subheadings, buttons |
| 700 | Bold | Headings |
| 800 | ExtraBold | Hero titles |

### Font Sizes (Desktop)
| Element | Size | Line Height |
|---------|------|-------------|
| Hero Title | 42px | 1.2 |
| Subtitle | 28px | 1.3 |
| Body | 16px | 1.6 |
| Caption | 12px | 1.4 |
| Button | 16px | 1 |

---

## DESIGN ELEMENTS

### Glassmorphism Card
```css
background: linear-gradient(
  135deg,
  rgba(248, 249, 250, 0.15) 0%,
  rgba(248, 249, 250, 0.05) 100%
);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 24px;
```

### Cyan Glow Effect
```css
filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5));
/* or */
box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
```

### Button Style
```css
background: #00FFFF;
color: #1e2f3c;
border-radius: 24px;
padding: 12px 32px;
font-weight: 700;
box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3);
```

---

## CHRISTMAS ELEMENTS

### Snowflakes
- Color: #F8F9FA (Pearl)
- Opacity: 0.4 - 0.8
- Sizes: 2px - 6px radius
- Distribution: Random, more at top

### Holly Decoration
- Leaves: #2d5a3d (Forest Green)
- Berries: #c41e3a (Christmas Red)
- Position: Corner accents

### Star
- Color: #FFD700 (Gold)
- Glow: Cyan (#00FFFF) subtle glow
- Position: Accent element

---

## LAYER STRUCTURE (PSD)

```
Christmas Profile - eSIM Myanmar
|
+-- Background
|   +-- Gradient Fill (#1e2f3c to #0f1a24)
|   +-- Grid Pattern (3% opacity)
|
+-- Decorations
|   +-- Snowflakes Group
|   +-- Holly Leaves
|   +-- Star
|
+-- Content Card
|   +-- Glass Background
|   +-- Logo Circle
|   +-- Title Text
|   +-- Subtitle Text
|   +-- Tagline
|   +-- CTA Button
|
+-- Phone Mockup
|   +-- Phone Frame
|   +-- Screen Content
|   +-- QR Code
|   +-- Profile Info
|   +-- Status Badge
|
+-- Footer
    +-- Company Name
    +-- Copyright
```

---

## EXPORT SETTINGS

### Web (PNG)
- Format: PNG-24
- Resolution: 72 DPI
- Color Profile: sRGB
- Compression: Lossless

### Web (JPEG)
- Format: JPEG
- Quality: 80-90%
- Resolution: 72 DPI
- Color Profile: sRGB

### Print
- Format: PDF or TIFF
- Resolution: 300 DPI
- Color Profile: CMYK (for print)
- Bleed: 3mm

---

## FILE LOCATIONS

| File | Path |
|------|------|
| SVG Source | frontend/public/assets/christmas-profile-esim-myanmar.svg |
| Design Spec | design/CHRISTMAS_PROFILE_DESIGN_SPEC.md |
| Logo | https://i.ibb.co/qL00rsqJ/Colored.png |

---

## PHOTOSHOP IMPORT INSTRUCTIONS

1. Open Adobe Photoshop
2. File > Open > Select the SVG file
3. Set document size to 1200 x 630 px
4. Resolution: 72 DPI (web) or 300 DPI (print)
5. Color Mode: RGB Color, 8 bit
6. SVG will import as vector smart objects
7. Rasterize layers as needed for effects
8. Add additional effects (blur, noise, etc.)

---

## BRAND GUIDELINES

- Always maintain the color palette strictly
- Cyan (#00FFFF) should be used sparingly for emphasis
- Dark backgrounds create premium feel
- Glassmorphism adds depth without clutter
- Seasonal elements should complement, not overwhelm
- Logo must remain visible and prominent

---

**Created**: December 24, 2025
**Designer**: Kiro AI
**Brand**: ESIM MYANMAR COMPANY LIMITED
