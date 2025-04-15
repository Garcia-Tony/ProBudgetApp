/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern: /react-calendar.*/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#01898B',
      },
    },
  },
  plugins: [],
};
