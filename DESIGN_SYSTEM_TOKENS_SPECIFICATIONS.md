# eSIM Myanmar - Design System Tokens & Specifications

**Version:** 2.0.0  
**Last Updated:** January 2026  
**Status:** Production Ready

---

## 1. Design Tokens

### 1.1 Color Tokens

```css
:root {
  /* Primary Brand Colors */
  --color-primary: #00FFFF;
  --color-primary-dark: #00CCCC;
  --color-primary-light: #66FFFF;
  --color-primary-rgb: 0, 255, 255;
  
  /* Background Colors */
  --color-background: #1e2f3c;
  --color-background-light: #2a3f4f;
  --color-background-dark: #141f28;
  
  /* Text Colors */
  --color-text: #F8F9FA;
  --color-text-muted: #9CA3AF;
  --color-text-subtle: #6B7280;
  
  /* Pearl Colors */
  --color-pearl: #F8F9FA;
  --color-pearl-dark: #E9ECEF;
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #0084C8;
  
  /* Glass Effects */
  --glass-light: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-hover: rgba(255, 255, 255, 0.12);
}
```

### 1.2 Typography Tokens

```css
:root {
  /* Font Families */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-myanmar: 'Noto Sans Myanmar', 'Padauk', 'Myanmar Text', sans-serif;
  --font-family-mono: 'Courier New', monospace;
  
  /* Font Sizes - Mobile First */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.8125rem;    /* 13px */
  --font-size-base: 0.875rem;   /* 14px - Mobile body */
  --font-size-md: 0.9375rem;    /* 15px - Tablet body */
  --font-size-lg: 1rem;         /* 16px - Desktop body */
  --font-size-xl: 1.125rem;     /* 18px */
  --font-size-2xl: 1.25rem;     /* 20px */
  --font-size-3xl: 1.5rem;      /* 24px */
  --font-size-4xl: 1.875rem;    /* 30px */
  --font-size-5xl: 2.25rem;     /* 36px */
  --font-size-6xl: 3rem;        /* 48px */
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 1.75;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
}
```

### 1.3 Spacing Tokens

```css
:root {
  /* Spacing Scale - 8px Baseline Grid */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### 1.4 Border Radius Tokens

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;
}
```

### 1.5 Shadow Tokens

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.35);
  --shadow-glow: 0 0 20px rgba(0, 255, 255, 0.3);
  --shadow-glow-strong: 0 0 40px rgba(0, 255, 255, 0.5);
}
```

### 1.6 Transition Tokens

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-slower: 500ms ease;
  
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 1.7 Z-Index Tokens

```css
:root {
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
  --z-notification: 80;
  --z-max: 9999;
}
```

---

## 2. Component Specifications

### 2.1 Button Component

#### Primary Button
```css
.btn-primary {
  /* Dimensions */
  height: 48px;
  min-width: 48px;
  padding: 0 24px;
  
  /* Typography */
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  
  /* Visual */
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: var(--color-background);
  border: none;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 16px rgba(0, 255, 255, 0.25);
  
  /* Interaction */
  cursor: pointer;
  transition: all var(--transition-normal);
  user-select: none;
}

.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(0, 255, 255, 0.4);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 255, 255, 0.2);
}

.btn-primary:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

#### Button Sizes
```css
/* Small Button */
.btn-sm {
  height: 32px;
  min-width: 32px;
  padding: 0 12px;
  font-size: var(--font-size-xs);
}

/* Medium Button */
.btn-md {
  height: 40px;
  min-width: 40px;
  padding: 0 16px;
  font-size: var(--font-size-sm);
}

/* Large Button (Default) */
.btn-lg {
  height: 48px;
  min-width: 48px;
  padding: 0 24px;
  font-size: var(--font-size-base);
}

/* Extra Large Button */
.btn-xl {
  height: 56px;
  min-width: 56px;
  padding: 0 32px;
  font-size: var(--font-size-lg);
}
```

#### Mobile Touch Targets
```css
@media (max-width: 640px) {
  .btn-sm,
  .btn-md {
    min-height: 44px;
    min-width: 44px;
  }
}
```

### 2.2 Input Field Component

```css
.input {
  /* Dimensions */
  display: block;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  
  /* Typography */
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text);
  
  /* Visual */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);
  
  /* Interaction */
  transition: all var(--transition-normal);
}

.input::placeholder {
  color: var(--color-text-subtle);
}

.input:hover {
  border-color: rgba(255, 255, 255, 0.25);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.15);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Error State */
.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* Success State */
.input-success {
  border-color: var(--color-success);
}
```

### 2.3 Card Component

```css
.card {
  /* Visual */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  
  /* Spacing */
  padding: var(--space-5);
  
  /* Interaction */
  transition: all var(--transition-normal);
}

.card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Responsive Padding */
@media (min-width: 640px) {
  .card {
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .card {
    padding: var(--space-8);
  }
}
```

### 2.4 Navigation Component

```css
.nav {
  /* Position */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  
  /* Visual */
  background: rgba(30, 47, 60, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  
  /* Interaction */
  transition: all var(--transition-normal);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 1024px) {
  .nav-container {
    height: 72px;
  }
}

.nav-link {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
  background: rgba(0, 255, 255, 0.08);
}

.nav-link.active {
  color: var(--color-primary);
  background: rgba(0, 255, 255, 0.1);
}
```

### 2.5 Badge Component

```css
.badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  background: rgba(0, 255, 255, 0.15);
  color: var(--color-primary);
}

.badge-success {
  background: rgba(16, 185, 129, 0.15);
  color: var(--color-success);
}

.badge-warning {
  background: rgba(245, 158, 11, 0.15);
  color: var(--color-warning);
}

.badge-error {
  background: rgba(239, 68, 68, 0.15);
  color: var(--color-error);
}
```

### 2.6 Modal Component

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal-backdrop);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: var(--z-modal);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  
  background: rgba(30, 47, 60, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  padding: var(--space-6);
}

@media (min-width: 640px) {
  .modal {
    padding: var(--space-8);
  }
}
```

### 2.7 Table Component

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.table th,
.table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table th {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.table tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

---

## 3. Responsive Breakpoints

```css
/* Mobile First Breakpoints */
:root {
  --breakpoint-sm: 640px;   /* Tablet */
  --breakpoint-md: 768px;   /* Tablet Large */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Desktop Large */
  --breakpoint-2xl: 1440px; /* Desktop XL */
}

/* Usage */
@media (min-width: 640px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1440px) {
  /* Large desktop styles */
}
```

---

## 4. Layout Specifications

### 4.1 Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

### 4.2 Grid System

```css
.grid {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .grid {
    gap: var(--space-6);
  }
  
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: var(--space-8);
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 4.3 Section Spacing

```css
.section {
  padding: var(--space-12) 0;
}

@media (min-width: 640px) {
  .section {
    padding: var(--space-16) 0;
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--space-20) 0;
  }
}
```

---

## 5. Accessibility Specifications

### 5.1 Focus States

```css
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

:focus:not(:focus-visible) {
  outline: none;
}

button:focus-visible,
[role="button"]:focus-visible,
a:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(0, 255, 255, 0.25);
}
```

### 5.2 Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 5.3 Skip Link

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-background);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--font-weight-semibold);
  z-index: var(--z-max);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

### 5.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. Animation Specifications

### 6.1 Standard Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fadeIn var(--transition-slow) ease-out;
}

.animate-slide-up {
  animation: slideUp var(--transition-slow) ease-out;
}

.loading-spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(0, 255, 255, 0.3);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

### 6.2 GPU Acceleration

```css
.btn,
.card-hover,
.nav-link {
  will-change: transform;
}

.animate-fade-in,
.animate-slide-up {
  will-change: opacity, transform;
}
```

---

## 7. Print Styles

```css
@media print {
  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
  }
  
  body {
    font-size: 12pt;
  }
  
  .nav,
  .footer,
  .no-print {
    display: none !important;
  }
  
  .card {
    border: 1px solid #ccc;
    background: white;
  }
  
  a[href]:after {
    content: " (" attr(href) ")";
  }
}
```

---

## 8. Usage Guidelines

### 8.1 Component Usage

**Button Usage:**
- Use primary buttons for main actions
- Use secondary buttons for alternative actions
- Use ghost buttons for tertiary actions
- Ensure minimum 44px touch targets on mobile
- Always include focus states

**Input Usage:**
- Always pair with labels
- Include helper text when needed
- Show error states clearly
- Provide validation feedback
- Ensure 48px minimum height

**Card Usage:**
- Use for grouping related content
- Apply hover effects for interactive cards
- Maintain consistent padding
- Use glass effect for premium feel

### 8.2 Accessibility Requirements

- All interactive elements must be keyboard accessible
- Focus indicators must be visible (3px outline)
- Color contrast must meet WCAG AA (4.5:1 for text)
- Touch targets must be minimum 44x44px on mobile
- Provide text alternatives for images
- Use semantic HTML
- Include ARIA labels where needed
- Support screen readers
- Respect prefers-reduced-motion

### 8.3 Performance Guidelines

- Use CSS custom properties for theming
- Implement lazy loading for images
- Use code splitting for routes
- Optimize animations with GPU acceleration
- Minimize repaints and reflows
- Use will-change sparingly
- Implement proper caching strategies

---

**Document Maintained By:** eSIM Myanmar Design Team  
**Last Review:** January 2026  
**Next Review:** February 2026
