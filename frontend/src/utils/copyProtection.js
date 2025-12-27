/**
 * copyProtection.js - Advanced Copy Protection System
 * ESIM MYANMAR COMPANY LIMITED
 * Enterprise-grade content protection - NO UNAUTHORIZED COPYING
 * Copyright 2025-2026 - All rights reserved
 */

// Disable right-click context menu everywhere
export const disableRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);
};

// Disable all text selection
export const disableTextSelection = () => {
  document.addEventListener('selectstart', (e) => {
    if (!e.target.closest('input, textarea, [contenteditable="true"]')) {
      e.preventDefault();
      return false;
    }
  }, true);
  
  // Apply CSS protection
  const style = document.createElement('style');
  style.id = 'esim-protection-styles';
  style.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    input, textarea, [contenteditable="true"] {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
    img, svg, canvas {
      pointer-events: none !important;
      -webkit-user-drag: none !important;
      -khtml-user-drag: none !important;
      -moz-user-drag: none !important;
      -o-user-drag: none !important;
      user-drag: none !important;
    }
  `;
  document.head.appendChild(style);
};

// Disable keyboard shortcuts for copy/paste/save/print/view-source
export const disableKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // Blocked combinations
    const blockedKeys = [
      { ctrl: true, key: 'c' },   // Copy
      { ctrl: true, key: 'v' },   // Paste  
      { ctrl: true, key: 'x' },   // Cut
      { ctrl: true, key: 's' },   // Save
      { ctrl: true, key: 'a' },   // Select All
      { ctrl: true, key: 'u' },   // View Source
      { ctrl: true, key: 'p' },   // Print
      { ctrl: true, shift: true, key: 'i' }, // DevTools
      { ctrl: true, shift: true, key: 'j' }, // Console
      { ctrl: true, shift: true, key: 'c' }, // Inspect
      { key: 'F12' },             // DevTools
      { ctrl: true, key: 'F12' }, // DevTools
    ];
    
    const isBlocked = blockedKeys.some(combo => {
      const ctrlMatch = combo.ctrl ? (e.ctrlKey || e.metaKey) : true;
      const shiftMatch = combo.shift ? e.shiftKey : !combo.shift;
      const keyMatch = e.key.toLowerCase() === combo.key?.toLowerCase() || e.key === combo.key;
      return ctrlMatch && shiftMatch && keyMatch;
    });
    
    if (isBlocked && !e.target.closest('input, textarea')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
};

// Disable all drag and drop operations
export const disableDragDrop = () => {
  ['dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    document.addEventListener(event, (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);
  });
};

// Disable copy event
export const disableCopyEvent = () => {
  document.addEventListener('copy', (e) => {
    if (!e.target.closest('input, textarea')) {
      e.preventDefault();
      e.clipboardData?.setData('text/plain', 'Copying is disabled. Copyright ESIM MYANMAR COMPANY LIMITED');
      return false;
    }
  }, true);
};

// Detect and warn about DevTools
export const detectDevTools = () => {
  const threshold = 160;
  let devToolsOpen = false;
  
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if ((widthThreshold || heightThreshold) && !devToolsOpen) {
      devToolsOpen = true;
      console.clear();
      console.log('%c STOP!', 'color: #FF0000; font-size: 60px; font-weight: bold;');
      console.log('%c This is protected content.', 'color: #00FFFF; font-size: 18px;');
      console.log('%c Unauthorized access or copying is strictly prohibited.', 'color: #FFA500; font-size: 14px;');
      console.log('%c Copyright ESIM MYANMAR COMPANY LIMITED 2025-2026', 'color: #888; font-size: 12px;');
    } else if (!widthThreshold && !heightThreshold) {
      devToolsOpen = false;
    }
  };
  
  const intervalId = setInterval(checkDevTools, 500);
  window.addEventListener('resize', checkDevTools);
  
  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('resize', checkDevTools);
  };
};

// Disable printing completely
export const disablePrinting = () => {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      html, body {
        display: none !important;
        visibility: hidden !important;
      }
      body::before {
        content: 'Printing is disabled. Copyright ESIM MYANMAR COMPANY LIMITED 2025-2026';
        display: block !important;
        visibility: visible !important;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        text-align: center;
        color: #000;
      }
    }
  `;
  document.head.appendChild(style);
  
  window.addEventListener('beforeprint', (e) => {
    e.preventDefault();
    alert('Printing is disabled for this protected content.');
    return false;
  });
};

// Add invisible watermark
export const addWatermark = () => {
  const watermark = document.createElement('div');
  watermark.id = 'esim-protection-watermark';
  watermark.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99999;
    opacity: 0.012;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 300px,
      rgba(0, 255, 255, 0.08) 300px,
      rgba(0, 255, 255, 0.08) 301px
    );
    mix-blend-mode: overlay;
  `;
  document.body.appendChild(watermark);
};

// Console protection message
export const consoleProtection = () => {
  // Clear and display warning
  console.clear();
  console.log('%c ESIM MYANMAR', 'color: #00FFFF; font-size: 36px; font-weight: bold; text-shadow: 2px 2px 4px #000;');
  console.log('%c Entertainment Server', 'color: #6495ED; font-size: 18px;');
  console.log('%c -----------------------------------------', 'color: #444;');
  console.log('%c WARNING: This is protected content.', 'color: #FF6600; font-size: 14px; font-weight: bold;');
  console.log('%c Unauthorized copying, reproduction, or', 'color: #888; font-size: 12px;');
  console.log('%c distribution is strictly prohibited.', 'color: #888; font-size: 12px;');
  console.log('%c -----------------------------------------', 'color: #444;');
  console.log('%c Copyright 2025-2026 ESIM MYANMAR COMPANY LIMITED', 'color: #666; font-size: 11px;');
  console.log('%c Domain: esim.com.mm | www.esim.com.mm', 'color: #666; font-size: 11px;');
  console.log('%c Email: info@esim.com.mm', 'color: #666; font-size: 11px;');
};

// Disable image saving
export const disableImageSaving = () => {
  document.querySelectorAll('img, svg').forEach(el => {
    el.setAttribute('draggable', 'false');
    el.style.pointerEvents = 'none';
    el.addEventListener('contextmenu', e => e.preventDefault());
  });
  
  // Observer for dynamically added images
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeName === 'IMG' || node.nodeName === 'SVG') {
          node.setAttribute('draggable', 'false');
          node.style.pointerEvents = 'none';
        }
      });
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
};

// Initialize all protections
export const initCopyProtection = () => {
  if (typeof window === 'undefined') return;
  
  // Apply all protections
  disableRightClick();
  disableTextSelection();
  disableKeyboardShortcuts();
  disableDragDrop();
  disableCopyEvent();
  detectDevTools();
  disablePrinting();
  consoleProtection();
  disableImageSaving();
  
  // Add watermark in production
  if (process.env.NODE_ENV === 'production') {
    addWatermark();
  }
  
  // Re-apply on dynamic content
  setTimeout(() => {
    disableImageSaving();
  }, 2000);
};

export default initCopyProtection;
