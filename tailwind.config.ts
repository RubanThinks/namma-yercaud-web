import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFC800',
          yellowLight: '#FFF8D6',
          yellowHover: '#EBB500',
          gold: '#F59E0B',
          amber: '#D97706',
          orange: '#FF5A1F',
          cream: '#FFFDF7',
          warmBg: '#FAF6EE',
          warmCard: '#FFFFFF',
          navy: '#1A233A',
          navyLight: '#263454',
          slate: '#334155',
          dark: '#121826',
          light: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'solid-black': '4px 4px 0px #000000',
        'solid-yellow': '4px 4px 0px #FFC800',
        'solid-sm': '2px 2px 0px #000000',
        'trendy': '0 12px 32px -8px rgba(26, 35, 58, 0.08)',
        'trendy-hover': '0 20px 40px -10px rgba(255, 200, 0, 0.35)',
      }
    },
  },
  plugins: [],
};

export default config;
