/**
 * Phone Validation Utility
 * ESIM MYANMAR COMPANY LIMITED
 * Comprehensive Myanmar phone number validation
 */

// Myanmar phone number patterns
const MYANMAR_PREFIXES = {
  MPT: ['09', '097', '098'],
  OOREDOO: ['095', '0996', '0997'],
  TELENOR: ['0975', '0976', '0977', '0978', '0979'],
  MYTEL: ['0966', '0967', '0968', '0969'],
  ATOM: ['094', '0944', '0945'],
  U9: ['095', '096']
};

// Validate Myanmar phone number
export const validateMyanmarPhone = (phone) => {
  if (!phone) return { valid: false, error: 'Phone number is required' };
  
  // Clean the phone number - remove spaces, dashes, parentheses, dots
  let cleaned = phone.replace(/[\s\-().]/g, '');
  
  // Handle various formats
  if (cleaned.startsWith('+95')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('95') && !cleaned.startsWith('09')) {
    cleaned = '0' + cleaned.slice(2);
  }
  
  // Check if it starts with 09 and has correct length
  if (!cleaned.startsWith('09')) {
    return { valid: false, error: 'Myanmar phone numbers must start with 09' };
  }
  
  // Check length (09 + 7-11 digits = 9-13 total)
  if (cleaned.length < 9 || cleaned.length > 13) {
    return { valid: false, error: 'Phone number must be 9-13 digits' };
  }
  
  // Check if all characters are digits
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: 'Phone number can only contain digits' };
  }
  
  return { valid: true, cleaned, formatted: formatMyanmarPhone(cleaned) };
};

// Format phone number for display
export const formatMyanmarPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    // Format: 09-xxx-xxx-xxx
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  } else if (cleaned.length === 10) {
    // Format: 09-xxx-xxx-xx
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  } else if (cleaned.length === 9) {
    // Format: 09-xxx-xxxx
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
  }
  
  return phone;
};

// Detect provider from phone number
export const detectProvider = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Normalize to start with 09
  let normalized = cleaned;
  if (cleaned.startsWith('+95')) {
    normalized = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('95') && !cleaned.startsWith('09')) {
    normalized = '0' + cleaned.slice(2);
  }
  
  // Check against known prefixes
  for (const [provider, prefixes] of Object.entries(MYANMAR_PREFIXES)) {
    for (const prefix of prefixes) {
      if (normalized.startsWith(prefix)) {
        return provider;
      }
    }
  }
  
  return 'Unknown';
};

const phoneValidation = {
  validateMyanmarPhone,
  formatMyanmarPhone,
  detectProvider,
  MYANMAR_PREFIXES
};

export default phoneValidation;
