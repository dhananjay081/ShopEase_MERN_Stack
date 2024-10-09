/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        tomato: '#ff6347',
        mango: '#dc26262',
      },
      fontFamily: {
        cursive: ['YourCursiveFontName', 'cursive'],
      },
    },
  },
  plugins: [],
}

