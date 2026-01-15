#!/bin/bash

echo "=========================================="
echo "IMAGE OPTIMIZATION"
echo "=========================================="
echo ""

cd /app/frontend/public

echo "[1/5] Analyzing images..."
echo "PNG files:"
find . -name "*.png" -type f -exec ls -lh {} \; | awk '{print $9, $5}'
echo ""
echo "JPG files:"
find . -name "*.jpg" -o -name "*.jpeg" -type f -exec ls -lh {} \; | awk '{print $9, $5}'
echo ""
echo "SVG files:"
find . -name "*.svg" -type f -exec ls -lh {} \; | awk '{print $9, $5}'

echo ""
echo "[2/5] Image optimization recommendations..."
cat > /app/IMAGE_OPTIMIZATION_GUIDE.md << 'EOF'
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
EOF

echo "Optimization guide created"

echo ""
echo "[3/5] Checking image attributes in HTML..."
cd /app/frontend/public
if grep -r "loading=\"lazy\"" . 2>/dev/null | head -5; then
  echo "Lazy loading: IMPLEMENTED"
else
  echo "Lazy loading: NEEDS IMPLEMENTATION"
fi

echo ""
echo "[4/5] SVG optimization check..."
SVG_COUNT=$(find . -name "*.svg" -type f | wc -l)
echo "Total SVG files: $SVG_COUNT"

echo ""
echo "[5/5] Image optimization summary..."
echo "- External CDN in use: i.ibb.co"
echo "- Lazy loading: Check components"
echo "- WebP format: Recommended"
echo "- Responsive images: Recommended"
echo ""
echo "See IMAGE_OPTIMIZATION_GUIDE.md for details"
echo ""
echo "=========================================="
echo "IMAGE ANALYSIS COMPLETE"
echo "=========================================="
