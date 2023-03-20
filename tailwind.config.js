// /** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    screens: {
      phone: { max: '525px' },
      // => @media (max-width: 525px) { ... }

      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
