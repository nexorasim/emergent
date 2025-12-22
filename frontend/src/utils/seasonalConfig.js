/**
 * seasonalConfig.js - Centralized Configuration
 * ESIM MYANMAR COMPANY LIMITED
 * All information 100% accurate for esim.com.mm
 * Copyright 2025-2026 - All rights reserved
 */

// OFFICIAL COMPANY INFORMATION - 100% ACCURATE
export const COMPANY_INFO = {
  // Legal Entity
  legalName: 'ESIM MYANMAR COMPANY LIMITED',
  tradingName: 'eSIM Myanmar',
  brandName: 'eSIM Myanmar Entertainment Server',
  
  // Domains
  primaryDomain: 'esim.com.mm',
  domains: ['esim.com.mm', 'www.esim.com.mm'],
  firebaseUrl: 'esimmyanmar-09289140-4db73.web.app',
  
  // Contact Information
  email: 'info@esim.com.mm',
  phone: '09650000172',
  phoneFormatted: '09-650-000-172',
  
  // Social Media
  social: {
    handle: '@eSIMMyanmar',
    telegram: '@eSIMMyanmar',
    facebook: 'eSIMMyanmar'
  },
  
  // Business Metrics
  metrics: {
    users: '50M+',
    usersNumeric: 50000000,
    countries: '190+',
    countriesNumeric: 190,
    uptime: '99.9%',
    uptimeNumeric: 99.9,
    support: '24/7'
  },
  
  // Technology
  technology: {
    network: ['5G', '4G LTE', 'VoLTE'],
    features: [
      'eSIM Transfer Android to Apple',
      'Phone Number Registration',
      'SIM to eSIM Migration',
      'iOS Quick Transfer',
      'Apple Watch Support',
      'iPad Support',
      'Advanced Roaming',
      'Multi-device Support'
    ],
    carriers: ['MPT', 'OOREDOO', 'TELENOR', 'MYTEL', 'ATOM']
  },
  
  // Legal
  copyright: {
    year: '2025-2026',
    holder: 'ESIM MYANMAR COMPANY LIMITED',
    statement: 'Copyright 2025-2026 ESIM MYANMAR COMPANY LIMITED. All rights reserved.'
  },
  
  // SMTP Configuration (for reference only)
  smtp: {
    host: 'smtp.hostinger.com',
    email: 'info@esim.com.mm'
  }
};

// Seasonal Configuration
export const SEASONAL_CONFIG = {
  enabled: true,
  startDate: new Date('2025-12-15T00:00:00'),
  endDate: new Date('2026-02-01T00:00:00'),
  newYearDate: new Date('2026-01-01T00:00:00'),
  
  features: {
    banner: true,
    santa: true,
    countdown: true,
    music: true,
    snowEffect: false,
    themeOverride: true
  },
  
  colors: {
    primary: '#00FFFF',
    secondary: '#6495ED',
    darkBlue: '#1a2632',
    pearl: '#F8F9FA',
    glass: 'rgba(248, 249, 250, 0.08)',
    glassBorder: 'rgba(0, 255, 255, 0.15)'
  }
};

export const isSeasonalActive = () => {
  if (!SEASONAL_CONFIG.enabled) return false;
  const now = new Date();
  return now >= SEASONAL_CONFIG.startDate && now < SEASONAL_CONFIG.endDate;
};

export const isNewYearPeriod = () => {
  if (!isSeasonalActive()) return false;
  const now = new Date();
  return now >= SEASONAL_CONFIG.newYearDate;
};

export const isFeatureEnabled = (feature) => {
  if (!isSeasonalActive()) return false;
  return SEASONAL_CONFIG.features[feature] === true;
};

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
    greeting: 'Merry Christmas',
    subtitle: 'Season Greetings from eSIM Myanmar',
    cta: 'Gift an eSIM'
  };
};

export const getDaysUntilReversion = () => {
  const diff = SEASONAL_CONFIG.endDate - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export default SEASONAL_CONFIG;
