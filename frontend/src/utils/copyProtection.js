/**
 * Copy Protection System
 * Enterprise-grade content protection
 * Copyright ESIM MYANMAR COMPANY LIMITED 2025-2026
 * All rights reserved
 */

// Disable right-click context menu
export const disableRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};

// Disable text selection
export const disableTextSelection = () => {
  document.addEventListener('selectstart', (e) => {
    if (!e.target.closest('input, textarea')) {
      e.preventDefault();
      return false;
    }
  });
  
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';
  document.body.style.mozUserSelect = 'none';
};

// Disable keyboard shortcuts for copy/paste/save
export const disableKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+A, Ctrl+U, F12
    if (
      (e.ctrlKey && ['c', 'v', 'x', 's', 'a', 'u', 'p'].includes(e.key.toLowerCase())) ||
      (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) ||
      e.key === 'F12' ||
      (e.ctrlKey && e.key === 'F12')
    ) {
      // Allow in input fields for normal functionality
      if (!e.target.closest('input, textarea')) {
        e.preventDefault();
        return false;
      }
    }
  });
};

// Disable drag and drop
export const disableDragDrop = () => {
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    return false;
  });
};

// Disable developer tools detection
export const detectDevTools = () => {
  const threshold = 160;
  
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      // Dev tools might be open
      console.clear();
    }
  };
  
  setInterval(checkDevTools, 1000);
};

// Disable printing
export const disablePrinting = () => {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body * {
        display: none !important;
      }
      body::after {
        content: 'Printing is disabled. Copyright ESIM MYANMAR COMPANY LIMITED';
        display: block;
        font-size: 24px;
        text-align: center;
        padding: 50px;
      }
    }
  `;
  document.head.appendChild(style);
  
  window.addEventListener('beforeprint', (e) => {
    e.preventDefault();
  });
};

// Add watermark
export const addWatermark = () => {
  const watermark = document.createElement('div');
  watermark.id = 'esim-watermark';
  watermark.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.03;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 200px,
      rgba(0, 255, 255, 0.1) 200px,
      rgba(0, 255, 255, 0.1) 201px
    );
  `;
  document.body.appendChild(watermark);
};

// Console protection message
export const consoleProtection = () => {
  const warningStyle = 'color: #FF0000; font-size: 24px; font-weight: bold;';
  const infoStyle = 'color: #00FFFF; font-size: 14px;';
  
  console.log('%cSTOP!', warningStyle);
  console.log('%cThis is a protected application. Unauthorized access or copying is prohibited.', infoStyle);
  console.log('%cCopyright ESIM MYANMAR COMPANY LIMITED 2025-2026. All rights reserved.', infoStyle);
};

// Initialize all protections
export const initCopyProtection = () => {
  if (typeof window !== 'undefined') {
    disableRightClick();
    disableTextSelection();
    disableKeyboardShortcuts();
    disableDragDrop();
    detectDevTools();
    disablePrinting();
    consoleProtection();
    
    // Add subtle watermark in production
    if (process.env.NODE_ENV === 'production') {
      addWatermark();
    }
  }
};

export default initCopyProtection;
