/**
 * seasonalConfig.js - Centralized Seasonal Feature Configuration
 * Controls all seasonal theming and features
 * Auto-reversion: February 1, 2026
 */

export const SEASONAL_CONFIG = {
  // Feature toggle - master switch
  enabled: true,
  
  // Date boundaries
  startDate: new Date('2025-12-15T00:00:00'),
  endDate: new Date('2026-02-01T00:00:00'),
  newYearDate: new Date('2026-01-01T00:00:00'),
  
  // Feature flags
  features: {
    banner: true,
    santa: true,
    countdown: true,
    snowEffect: false, // Disabled for performance
    themeOverride: true
  },
  
  // Color palette (strict adherence)
  colors: {
    darkBlue: '#1e2f3c',
    cyan: '#00FFFF',
    pearl: '#F8F9FA',
    glass: 'rgba(248, 249, 250, 0.08)',
    glassBorder: 'rgba(255, 255, 255, 0.18)'
  }
};

/**
 * Check if seasonal mode is currently active
 */
export const isSeasonalActive = () => {
  if (!SEASONAL_CONFIG.enabled) return false;
  const now = new Date();
  return now >= SEASONAL_CONFIG.startDate && now < SEASONAL_CONFIG.endDate;
};

/**
 * Check if we're in the New Year period (post Jan 1)
 */
export const isNewYearPeriod = () => {
  if (!isSeasonalActive()) return false;
  const now = new Date();
  return now >= SEASONAL_CONFIG.newYearDate;
};

/**
 * Check if a specific feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  if (!isSeasonalActive()) return false;
  return SEASONAL_CONFIG.features[featureName] === true;
};

/**
 * Get time remaining until New Year 2026
 */
export const getCountdownToNewYear = () => {
  const now = new Date();
  const target = SEASONAL_CONFIG.newYearDate;
  
  if (now >= target) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  
  const diff = target - now;
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    expired: false
  };
};

/**
 * Get seasonal messaging based on current date
 */
export const getSeasonalMessage = () => {
  if (!isSeasonalActive()) return null;
  
  if (isNewYearPeriod()) {
    return {
      greeting: 'Happy New Year 2026',
      subtitle: 'Wishing you seamless connectivity',
      cta: 'Start Fresh with eSIM'
    };
  }
  
  return {
    greeting: 'Season Greetings',
    subtitle: 'Celebrating the holidays',
    cta: 'Gift an eSIM'
  };
};

/**
 * Days until seasonal mode ends
 */
export const getDaysUntilReversion = () => {
  const now = new Date();
  const diff = SEASONAL_CONFIG.endDate - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export default SEASONAL_CONFIG;
