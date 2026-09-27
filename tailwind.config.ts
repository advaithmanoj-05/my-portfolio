import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Auralis System Palette (Ref2)
        auralis: {
          bg: '#F7F7F5',
          panel: '#F3F2EF',
          card: '#FCFCFB',
          border: '#E7E7E4',
          primary: '#111111',
          secondary: '#6B6B6B',
          accent: '#000000',
          // Dark Mode Counterparts
          darkBg: '#090a0c',
          darkPanel: '#111319',
          darkCard: '#171a23',
          darkBorder: '#242936',
          darkText: '#f3f4f6',
          darkMuted: '#9ca3af',
        }
      },
      fontFamily: {
        geist: ['Geist', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
