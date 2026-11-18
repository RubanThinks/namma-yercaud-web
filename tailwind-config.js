tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFC800',
          yellowLight: '#FFF8D6',
          gold: '#F59E0B',
          amber: '#D97706',
          orange: '#FF5A1F',
          cream: '#FFFDF7',
          warmBg: '#FAF6EE',
          navy: '#1A233A',
          navyLight: '#263454',
          slate: '#334155',
          dark: '#121826',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'solid-black': '4px 4px 0px #000000',
        'solid-yellow': '4px 4px 0px #FFC800',
      }
    }
  }
};
