module.exports = {
  mode: 'jit',
  separator: '_',
  purge: {
    content: [
      './src/**/*.pug',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    options: {
      safelist: [],
      blocklist: [/^debug-/],
      keyframes: false,
      fontFace: true,
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '380px'
      },
      colors: {
        color1: '#3C3E42',
        color2: '#423C3C',
        color3: '#DC5953',
        'color3-60': '#DC595399',
        color4: '#FD6F31',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(265.78deg, #DC5953 6.89%, #FD6F31 95.01%)',
        'gradient-1-to-transparent': 'linear-gradient(265.78deg, #DC5953 6.89%, #FD6F31 30%, #FFF0 65%)',
        'gradient-2': 'linear-gradient(180deg, rgba(220, 89, 83, 0.06) 0%, rgba(74, 17, 15, 0.24) 100%)'
      },
      fontFamily: {
        raleway: ['Raleway'],
        roboto: ['Roboto']
      },
      fontSize: {
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '24': '24px',
        '28': '28px',
        '36': '36px',
        '44': '44px',
        '54': '54px',
        '60': '60px',
        '70': '70px',
        '144': '144px',
        '350': '350px',
      },
      zIndex: {
        '-1': '-1',
      },
      borderWidth: {
        '1': '1px',
        '20': '20px',
      },
      scale: {
        '25': '.25',
        '40': '.4',
      },
      rotate: {
        '135': '135deg',
        '-135': '-135deg',
      },
      boxShadow: {
        '1': '4px 4px 20px 1px rgba(124, 40, 36, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
