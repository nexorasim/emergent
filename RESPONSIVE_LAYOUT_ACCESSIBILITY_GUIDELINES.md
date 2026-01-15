# eSIM Myanmar - Responsive Layout Guidelines & Accessibility Compliance

**Version:** 2.0.0  
**Last Updated:** January 2026  
**Status:** Production Standard

---

## Part 1: Responsive Layout Guidelines

### 1.1 Breakpoint System

#### Standard Breakpoints
```css
/* Mobile First Approach */
:root {
  --breakpoint-xs: 0px;      /* Extra small devices */
  --breakpoint-sm: 640px;    /* Small devices (tablets) */
  --breakpoint-md: 768px;    /* Medium devices (tablets landscape) */
  --breakpoint-lg: 1024px;   /* Large devices (desktops) */
  --breakpoint-xl: 1280px;   /* Extra large devices */
  --breakpoint-2xl: 1440px;  /* 2X large devices */
}
```

#### Device Categories
- **Mobile:** 320px - 639px (Portrait phones)
- **Tablet:** 640px - 1023px (Tablets, landscape phones)
- **Desktop:** 1024px - 1439px (Laptops, desktops)
- **Large Desktop:** 1440px+ (Large monitors, 4K displays)

### 1.2 Layout Patterns

#### Container Widths
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

/* Tablet */
@media (min-width: 640px) {
  .container {
    padding: 0 24px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
    padding: 0 32px;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .container {
    max-width: 1440px;
  }
}
```

#### Grid Layouts
```css
/* Mobile: 1 column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet: 2 columns */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop: 3-4 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
  
  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 1.3 Typography Scaling

#### Responsive Font Sizes
```css
/* Mobile */
body {
  font-size: 14px;
  line-height: 1.625;
}

h1 { font-size: 30px; }
h2 { font-size: 24px; }
h3 { font-size: 20px; }
h4 { font-size: 18px; }

/* Tablet */
@media (min-width: 640px) {
  body { font-size: 15px; }
  h1 { font-size: 36px; }
  h2 { font-size: 30px; }
  h3 { font-size: 24px; }
  h4 { font-size: 20px; }
}

/* Desktop */
@media (min-width: 1024px) {
  body { font-size: 16px; }
  h1 { font-size: 48px; }
  h2 { font-size: 36px; }
  h3 { font-size: 30px; }
  h4 { font-size: 24px; }
}
```

### 1.4 Component Responsive Behavior

#### Navigation
```
Mobile (< 640px):
- Hamburger menu
- Full-screen overlay
- Vertical menu items
- Logo centered or left
- Height: 56px

Tablet (640px - 1023px):
- Horizontal menu
- Condensed spacing
- Logo left
- Height: 64px

Desktop (1024px+):
- Full horizontal menu
- Standard spacing
- Logo left
- Height: 72px
```

#### Cards
```
Mobile:
- Full width
- Padding: 20px
- Stack vertically
- Image full width

Tablet:
- 2 columns
- Padding: 24px
- Side-by-side
- Image 40% width

Desktop:
- 3-4 columns
- Padding: 32px
- Grid layout
- Image 30% width
```

#### Forms
```
Mobile:
- Single column
- Full width inputs
- Stacked labels
- Large touch targets (48px)

Tablet:
- 2 column for short fields
- Inline labels for checkboxes
- Standard spacing

Desktop:
- Multi-column layouts
- Inline labels option
- Optimized spacing
```

#### Tables
```
Mobile:
- Card-based layout
- Vertical stacking
- Hide non-essential columns
- Horizontal scroll if needed

Tablet:
- Show more columns
- Reduce font size slightly
- Maintain readability

Desktop:
- Full table layout
- All columns visible
- Standard font size
- Hover effects
```

### 1.5 Spacing Scale

#### Responsive Spacing
```css
/* Mobile */
.section { padding: 48px 0; }
.card { padding: 20px; }
.gap { gap: 16px; }

/* Tablet */
@media (min-width: 640px) {
  .section { padding: 64px 0; }
  .card { padding: 24px; }
  .gap { gap: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .section { padding: 80px 0; }
  .card { padding: 32px; }
  .gap { gap: 32px; }
}
```

### 1.6 Image Handling

#### Responsive Images
```html
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="image-desktop.webp"
  />
  <source
    media="(min-width: 640px)"
    srcset="image-tablet.webp"
  />
  <img
    src="image-mobile.webp"
    alt="Descriptive text"
    loading="lazy"
  />
</picture>
```

#### Image Sizes
```
Mobile: 320w, 640w
Tablet: 768w, 1024w
Desktop: 1280w, 1920w
```

### 1.7 Touch Target Guidelines

#### Minimum Sizes
```
Mobile:
- Buttons: 44x44px minimum
- Links: 44x44px tap area
- Form inputs: 48px height
- Icons: 44x44px tap area
- Checkboxes: 24x24px with 44x44px tap area

Desktop:
- Buttons: 40px minimum
- Links: Standard with hover
- Form inputs: 48px height
- Icons: 24px with hover
```

### 1.8 Modal and Dialog Behavior

#### Responsive Modals
```
Mobile:
- Full screen or near full screen
- Bottom sheet style option
- Swipe to dismiss
- Fixed header/footer

Tablet:
- Centered modal
- 80% viewport width
- Max width: 600px
- Backdrop blur

Desktop:
- Centered modal
- Max width: 500px
- Backdrop blur
- Keyboard shortcuts (ESC to close)
```

### 1.9 Performance Considerations

#### Mobile Optimization
- Reduce animation complexity
- Lazy load images
- Defer non-critical CSS
- Minimize JavaScript
- Use system fonts as fallback
- Optimize touch interactions

#### Desktop Optimization
- Enable hover effects
- Use advanced animations
- Load high-res images
- Enable keyboard shortcuts
- Show tooltips
- Use cursor indicators

### 1.10 Testing Checklist

#### Device Testing
- [ ] iPhone SE (375x667)
- [ ] iPhone 14 Pro (393x852)
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)
- [ ] Android Phone (360x640)
- [ ] Android Tablet (800x1280)
- [ ] Desktop 1920x1080
- [ ] Desktop 2560x1440

#### Browser Testing
- [ ] Chrome (mobile + desktop)
- [ ] Safari (mobile + desktop)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Samsung Internet (mobile)

#### Orientation Testing
- [ ] Portrait mode
- [ ] Landscape mode
- [ ] Rotation handling
- [ ] Layout reflow

---

## Part 2: Accessibility Compliance Checklist

### 2.1 WCAG 2.2 Level AA Compliance

#### Perceivable

**1.1 Text Alternatives**
- [ ] All images have alt text
- [ ] Decorative images have empty alt=""
- [ ] Complex images have long descriptions
- [ ] Icons have aria-labels
- [ ] SVGs have title and desc elements

**1.2 Time-based Media**
- [ ] Videos have captions
- [ ] Audio has transcripts
- [ ] No auto-playing media
- [ ] Media controls accessible

**1.3 Adaptable**
- [ ] Semantic HTML used
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Landmark regions defined
- [ ] Reading order logical
- [ ] Form labels associated
- [ ] Tables have proper headers

**1.4 Distinguishable**
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Color contrast ratio ≥ 3:1 for UI components
- [ ] Color not sole indicator
- [ ] Text resizable to 200%
- [ ] No horizontal scrolling at 320px
- [ ] Images of text avoided
- [ ] Focus indicators visible

#### Operable

**2.1 Keyboard Accessible**
- [ ] All functionality keyboard accessible
- [ ] No keyboard traps
- [ ] Keyboard shortcuts documented
- [ ] Skip links provided
- [ ] Focus order logical
- [ ] Tab navigation works

**2.2 Enough Time**
- [ ] No time limits or adjustable
- [ ] Auto-save implemented
- [ ] Session timeout warnings
- [ ] Pause/stop/hide for moving content

**2.3 Seizures and Physical Reactions**
- [ ] No flashing content > 3 times/second
- [ ] Animation can be disabled
- [ ] Motion can be reduced

**2.4 Navigable**
- [ ] Page titles descriptive
- [ ] Focus order meaningful
- [ ] Link purpose clear
- [ ] Multiple navigation methods
- [ ] Headings and labels descriptive
- [ ] Focus visible
- [ ] Breadcrumbs provided

**2.5 Input Modalities**
- [ ] Touch targets ≥ 44x44px
- [ ] Pointer gestures have alternatives
- [ ] Motion actuation can be disabled
- [ ] Target size adequate

#### Understandable

**3.1 Readable**
- [ ] Language of page identified
- [ ] Language changes marked
- [ ] Unusual words explained
- [ ] Abbreviations expanded
- [ ] Reading level appropriate

**3.2 Predictable**
- [ ] Focus doesn't trigger changes
- [ ] Input doesn't trigger changes
- [ ] Navigation consistent
- [ ] Components consistent
- [ ] Changes on request only

**3.3 Input Assistance**
- [ ] Error identification clear
- [ ] Labels and instructions provided
- [ ] Error suggestions given
- [ ] Error prevention for legal/financial
- [ ] Help available
- [ ] Confirmation for submissions

#### Robust

**4.1 Compatible**
- [ ] Valid HTML
- [ ] Name, role, value for components
- [ ] Status messages announced
- [ ] ARIA used correctly
- [ ] No ARIA errors

### 2.2 Detailed Component Checklist

#### Buttons
- [ ] Semantic button element used
- [ ] Clear label text
- [ ] Focus indicator visible (3px outline)
- [ ] Disabled state clear
- [ ] Loading state accessible
- [ ] Keyboard activation (Enter/Space)
- [ ] Touch target ≥ 44x44px
- [ ] Color contrast ≥ 4.5:1

#### Links
- [ ] Semantic anchor element
- [ ] Descriptive link text
- [ ] External links indicated
- [ ] Focus indicator visible
- [ ] Underlined or clearly distinguished
- [ ] Touch target ≥ 44x44px
- [ ] Opens in same window (or warned)

#### Forms
- [ ] Labels associated with inputs
- [ ] Required fields indicated
- [ ] Error messages clear
- [ ] Error messages announced
- [ ] Field instructions provided
- [ ] Autocomplete attributes
- [ ] Fieldset and legend for groups
- [ ] Validation on submit
- [ ] Success confirmation

#### Navigation
- [ ] nav element used
- [ ] aria-label for multiple navs
- [ ] Current page indicated
- [ ] Skip link provided
- [ ] Keyboard accessible
- [ ] Mobile menu accessible
- [ ] Focus management

#### Modals/Dialogs
- [ ] role="dialog" or role="alertdialog"
- [ ] aria-labelledby for title
- [ ] aria-describedby for description
- [ ] Focus trapped in modal
- [ ] ESC key closes modal
- [ ] Focus returned on close
- [ ] Backdrop prevents interaction

#### Tables
- [ ] table element used
- [ ] th elements for headers
- [ ] scope attribute on headers
- [ ] caption element provided
- [ ] Complex tables have summary
- [ ] Responsive on mobile

#### Images
- [ ] alt attribute present
- [ ] Alt text descriptive
- [ ] Decorative images alt=""
- [ ] Complex images have longdesc
- [ ] SVG has title and desc
- [ ] Image maps accessible

#### Videos
- [ ] Captions provided
- [ ] Transcript available
- [ ] Audio description option
- [ ] Controls accessible
- [ ] No auto-play
- [ ] Keyboard controls

### 2.3 Screen Reader Testing

#### NVDA (Windows)
- [ ] All content announced
- [ ] Navigation works
- [ ] Forms usable
- [ ] Tables navigable
- [ ] Landmarks recognized

#### JAWS (Windows)
- [ ] All content announced
- [ ] Navigation works
- [ ] Forms usable
- [ ] Tables navigable
- [ ] Landmarks recognized

#### VoiceOver (macOS/iOS)
- [ ] All content announced
- [ ] Gestures work
- [ ] Forms usable
- [ ] Navigation clear
- [ ] Rotor navigation works

#### TalkBack (Android)
- [ ] All content announced
- [ ] Gestures work
- [ ] Forms usable
- [ ] Navigation clear

### 2.4 Keyboard Navigation Testing

#### Tab Navigation
- [ ] Tab order logical
- [ ] All interactive elements reachable
- [ ] Focus visible at all times
- [ ] No keyboard traps
- [ ] Skip links work

#### Keyboard Shortcuts
- [ ] Enter activates buttons/links
- [ ] Space activates buttons
- [ ] Arrow keys navigate menus
- [ ] ESC closes modals
- [ ] Shortcuts documented

### 2.5 Color Contrast Testing

#### Text Contrast
- [ ] Body text: ≥ 4.5:1
- [ ] Large text (18pt+): ≥ 3:1
- [ ] UI components: ≥ 3:1
- [ ] Focus indicators: ≥ 3:1

#### Testing Tools
- [ ] Chrome DevTools Contrast Checker
- [ ] WebAIM Contrast Checker
- [ ] Colour Contrast Analyser
- [ ] axe DevTools

### 2.6 Automated Testing Tools

#### Required Tools
- [ ] axe DevTools (browser extension)
- [ ] WAVE (browser extension)
- [ ] Lighthouse (Chrome DevTools)
- [ ] Pa11y (CI integration)

#### Testing Frequency
- [ ] Every pull request
- [ ] Before deployment
- [ ] Weekly full scan
- [ ] Monthly manual audit

### 2.7 Manual Testing Checklist

#### Visual Testing
- [ ] Zoom to 200% - no horizontal scroll
- [ ] High contrast mode works
- [ ] Dark mode accessible
- [ ] Print styles accessible
- [ ] Focus indicators visible

#### Interaction Testing
- [ ] Keyboard only navigation
- [ ] Screen reader navigation
- [ ] Touch navigation (mobile)
- [ ] Voice control (if supported)

#### Content Testing
- [ ] Headings logical
- [ ] Links descriptive
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Errors clear

### 2.8 Accessibility Statement

**Required Content:**
- Commitment to accessibility
- WCAG 2.2 AA compliance claim
- Known limitations
- Contact for accessibility issues
- Feedback mechanism
- Last updated date

**Location:**
- Footer link
- Dedicated page
- Easy to find

### 2.9 Remediation Priority

#### Critical (Fix Immediately)
- Missing alt text on images
- Form inputs without labels
- Insufficient color contrast
- Keyboard traps
- Missing page titles

#### High (Fix Within 1 Week)
- Improper heading hierarchy
- Missing ARIA labels
- Focus indicators not visible
- Touch targets too small
- Unclear error messages

#### Medium (Fix Within 2 Weeks)
- Inconsistent navigation
- Missing skip links
- Unclear link text
- Missing landmarks
- Improper table structure

#### Low (Fix Within 1 Month)
- Missing language attributes
- Redundant ARIA
- Minor contrast issues
- Optimization opportunities

### 2.10 Ongoing Compliance

#### Monthly Tasks
- [ ] Run automated scans
- [ ] Review new content
- [ ] Test new features
- [ ] Update documentation
- [ ] Train team members

#### Quarterly Tasks
- [ ] Full manual audit
- [ ] Screen reader testing
- [ ] User testing with disabled users
- [ ] Review and update policies
- [ ] Accessibility training

#### Annual Tasks
- [ ] Third-party audit
- [ ] Comprehensive review
- [ ] Update accessibility statement
- [ ] Review legal compliance
- [ ] Strategic planning

---

## Part 3: Implementation Guidelines

### 3.1 Development Workflow

#### Before Development
1. Review design for accessibility
2. Check color contrast
3. Plan keyboard navigation
4. Identify ARIA requirements
5. Plan responsive behavior

#### During Development
1. Use semantic HTML
2. Add ARIA attributes
3. Implement keyboard support
4. Test with screen reader
5. Verify responsive behavior

#### After Development
1. Run automated tests
2. Manual keyboard testing
3. Screen reader testing
4. Responsive testing
5. Document any issues

### 3.2 Code Review Checklist

#### HTML
- [ ] Semantic elements used
- [ ] Proper heading hierarchy
- [ ] ARIA attributes correct
- [ ] Alt text present
- [ ] Form labels associated

#### CSS
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Responsive breakpoints
- [ ] Print styles included
- [ ] Reduced motion support

#### JavaScript
- [ ] Keyboard events handled
- [ ] Focus management
- [ ] ARIA states updated
- [ ] Error handling accessible
- [ ] No accessibility blockers

### 3.3 Documentation Requirements

#### Component Documentation
- Accessibility features
- Keyboard shortcuts
- ARIA attributes
- Screen reader behavior
- Known limitations

#### User Documentation
- Accessibility features guide
- Keyboard shortcuts list
- Screen reader instructions
- Assistive technology support
- Contact for issues

---

**Document Maintained By:** eSIM Myanmar Accessibility Team  
**Last Updated:** January 2026  
**Next Review:** February 2026  
**WCAG Version:** 2.2 Level AA
