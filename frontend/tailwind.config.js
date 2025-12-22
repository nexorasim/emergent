module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ffff',
          dark: '#00cccc',
          light: '#66ffff',
        },
        background: {
          DEFAULT: '#1e2f3c',
          light: '#2a3f4f',
          dark: '#141f28',
        },
        pearl: {
          DEFAULT: '#F8F9FA',
          dark: '#E9ECEF',
          light: '#FFFFFF',
        },
        glass: {
          DEFAULT: 'rgba(248, 249, 250, 0.08)',
          border: 'rgba(255, 255, 255, 0.18)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        myanmar: ['Noto Sans Myanmar', 'Padauk', 'Myanmar Text', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],      // 12px
        'sm': ['0.8125rem', { lineHeight: '1.5' }],   // 13px
        'base': ['0.875rem', { lineHeight: '1.625' }], // 14px - Mobile
        'md': ['0.9375rem', { lineHeight: '1.625' }],  // 15px - Tablet
        'lg': ['1rem', { lineHeight: '1.625' }],       // 16px - Desktop
        'xl': ['1.125rem', { lineHeight: '1.5' }],     // 18px
        '2xl': ['1.25rem', { lineHeight: '1.375' }],   // 20px
        '3xl': ['1.5rem', { lineHeight: '1.375' }],    // 24px
        '4xl': ['1.875rem', { lineHeight: '1.25' }],   // 30px
        '5xl': ['2.25rem', { lineHeight: '1.25' }],    // 36px
        '6xl': ['3rem', { lineHeight: '1.25' }],       // 48px
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff' },
          '100%': { boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff' },
        },
      },
    },
  },
  plugins: [],
}