/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: '#060606',
        surface: '#0E0E0E',
        card: '#131313',
        border: 'rgba(255,255,255,0.07)',
        accent: '#FF5E1A',
        green: '#22FF88',
        text: {
          DEFAULT: '#E8E4DC',
          muted: 'rgba(232,228,220,0.45)',
          bright: '#FFFFFF',
        },
      },
      fontSize: {
        display: ['clamp(3rem,8vw,7.5rem)', { lineHeight: '0.93', letterSpacing: '-0.03em' }],
        title:   ['clamp(2rem,5vw,4.5rem)',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        lead:    ['clamp(1rem,2vw,1.25rem)',  { lineHeight: '1.65' }],
      },
      animation: {
        'grid-drift': 'grid-drift 25s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'grid-drift': {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
      },
    },
  },
  plugins: [],
}
