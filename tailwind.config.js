module.exports = {
  prefix: 'tw-',
  content: [
    './index.html',
    './src/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    minWidth: {
      '120': '120px',
    },
    screens: {
      mobile: '370px',
      desktop: '660px',
      'real-desktop': '1025px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#35495E',
      green: '#42B983',
      gray: '#CCD1D9',
      'gray-light': '#EFEFEF',
      yellow: '#FFEB3B',
    },
    extend: {
      zIndex: {
        'hidden': '-9999',
        '6000': '6000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
