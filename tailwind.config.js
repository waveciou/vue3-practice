module.exports = {
  prefix: 'tw-',
  content: [
    './index.html',
    './src/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    screens: {
      desktop: '660px',
      'real-desktop': '1025px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#35495E',
      green: '#42B983',
      'blue-green': '#35495E',
      gray: '#CCD1D9',
      yellow: '#FFEB3B',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
