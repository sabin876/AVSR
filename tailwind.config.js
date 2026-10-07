/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cinema: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#111111',
          800: '#181818',
          700: '#242424',
          600: '#333333',
          400: '#737373',
          200: '#e5e5e5',
          100: '#f5f5f5',
        },
        accent: {
          gold: '#e6b980',
          amber: '#f59e0b',
          glow: 'rgba(230, 185, 128, 0.15)',
          crimson: '#e11d48',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        serif: ['"Cinzel"', 'serif'],
      },
      animation: {
        'glow-pulse': 'glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
