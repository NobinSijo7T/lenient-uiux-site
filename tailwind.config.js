/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        hotPink: '#FF007F',
        neonPurple: '#A020F0',
        bloodRed: '#B3001B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Bebas Neue"', 'sans-serif'],
        dirt: ['"Rubik Dirt"', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
      },
    },
  },
  plugins: [],
}
