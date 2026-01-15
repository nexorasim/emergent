# Image Optimization Guide

## Current Status
Images are being served from external CDN (i.ibb.co)

## Optimization Strategies

### 1. Use WebP Format
- Convert PNG/JPG to WebP for 25-35% size reduction
- Fallback to original format for older browsers

### 2. Responsive Images
```html
<picture>
  <source srcset="image-320w.webp 320w, image-640w.webp 640w" type="image/webp">
  <source srcset="image-320w.jpg 320w, image-640w.jpg 640w" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### 3. Lazy Loading
- Add loading="lazy" to all images below fold
- Use Intersection Observer for custom lazy loading

### 4. Image CDN
- Current: i.ibb.co
- Recommended: Cloudflare Images, Imgix, or Cloudinary
- Benefits: Auto-optimization, format conversion, resizing

### 5. Compression Tools
- Online: TinyPNG, Squoosh, ImageOptim
- CLI: imagemagick, sharp, svgo
- Build: image-webpack-loader

### 6. SVG Optimization
```bash
npm install -g svgo
svgo -f ./assets -o ./assets-optimized
```

### 7. Dimensions
- Always specify width and height attributes
- Prevents layout shift (CLS)

### 8. Alt Text
- Descriptive and concise
- Include keywords naturally
- Empty alt="" for decorative images

## Implementation Checklist
- [ ] Convert images to WebP
- [ ] Implement responsive images
- [ ] Add lazy loading
- [ ] Optimize SVGs
- [ ] Specify dimensions
- [ ] Add proper alt texts
- [ ] Use CDN with auto-optimization
- [ ] Implement blur-up placeholder
- [ ] Test on slow connections
- [ ] Monitor Core Web Vitals

## Tools
- Lighthouse: Performance audit
- WebPageTest: Detailed analysis
- Chrome DevTools: Network tab
- ImageOptim: Batch optimization

ESIM MYANMAR COMPANY LIMITED
