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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        myanmar: ['Pyidaungsu', 'Arial', 'sans-serif'],
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