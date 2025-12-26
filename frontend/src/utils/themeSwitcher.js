// Theme Switcher - Automatic seasonal theme management
// Auto-reverts to default theme on February 1, 2026

import { useState, useEffect } from 'react';

export const THEMES = {
  DEFAULT: 'default-enterprise',
  SEASONAL_2026: 'seasonal-2026'
};

export const THEME_CONFIG = {
  seasonalStart: new Date('2025-12-15T00:00:00+06:30'), // Myanmar Time
  seasonalEnd: new Date('2026-02-01T00:00:00+06:30'),   // Auto-revert date
  checkInterval: 3600000 // Check every hour (ms)
};

/**
 * Determine active theme based on current date
 * Automatically reverts to default on February 1, 2026
 */
export const getActiveTheme = () => {
  const now = new Date();
  
  if (now >= THEME_CONFIG.seasonalStart && now < THEME_CONFIG.seasonalEnd) {
    return THEMES.SEASONAL_2026;
  }
  
  return THEMES.DEFAULT;
};

/**
 * Load theme CSS file dynamically
 */
export const loadThemeCSS = (theme) => {
  // Remove existing theme stylesheets
  const existingTheme = document.getElementById('theme-stylesheet');
  if (existingTheme) {
    existingTheme.remove();
  }
  
  // Don't load additional CSS for default theme (uses base styles)
  if (theme === THEMES.DEFAULT) {
    document.body.classList.remove('theme-seasonal');
    document.body.classList.add('theme-default');
    return;
  }
  
  // Load seasonal theme CSS
  if (theme === THEMES.SEASONAL_2026) {
    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = '/styles/seasonal-2026.css';
    document.head.appendChild(link);
    
    document.body.classList.remove('theme-default');
    document.body.classList.add('theme-seasonal');
  }
};

/**
 * React hook for theme management
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(getActiveTheme());
  const [timeUntilReversion, setTimeUntilReversion] = useState(null);
  
  useEffect(() => {
    // Load initial theme
    loadThemeCSS(theme);
    
    // Calculate time until reversion
    const calculateTimeUntil = () => {
      if (theme === THEMES.SEASONAL_2026) {
        const now = new Date();
        const diff = THEME_CONFIG.seasonalEnd - now;
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          setTimeUntilReversion({ days, hours });
        } else {
          setTimeUntilReversion(null);
        }
      } else {
        setTimeUntilReversion(null);
      }
    };
    
    calculateTimeUntil();
    
    // Check theme periodically and on visibility change
    const checkTheme = () => {
      const newTheme = getActiveTheme();
      if (newTheme !== theme) {
        setTheme(newTheme);
        loadThemeCSS(newTheme);
        console.log(`Theme automatically switched to: ${newTheme}`);
      }
      calculateTimeUntil();
    };
    
    // Check theme every hour
    const intervalId = setInterval(checkTheme, THEME_CONFIG.checkInterval);
    
    // Check when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkTheme();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme]);
  
  return { 
    theme, 
    isSeasonal: theme === THEMES.SEASONAL_2026,
    timeUntilReversion
  };
};

/**
 * Admin override function (for testing)
 * Should be removed or protected in production
 */
export const setThemeOverride = (themeName) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Theme override: ${themeName}`);
    loadThemeCSS(themeName);
    localStorage.setItem('theme-override', themeName);
  }
};

/**
 * Clear theme override
 */
export const clearThemeOverride = () => {
  localStorage.removeItem('theme-override');
  const currentTheme = getActiveTheme();
  loadThemeCSS(currentTheme);
};

/**
 * Get theme with override support (for testing)
 */
export const getThemeWithOverride = () => {
  if (process.env.NODE_ENV === 'development') {
    const override = localStorage.getItem('theme-override');
    if (override) {
      return override;
    }
  }
  return getActiveTheme();
};

const themeSwitcher = {
  THEMES,
  THEME_CONFIG,
  getActiveTheme,
  loadThemeCSS,
  useTheme,
  setThemeOverride,
  clearThemeOverride,
  getThemeWithOverride
};

export default themeSwitcher;
