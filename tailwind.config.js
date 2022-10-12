/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['JetBrains Mono'],
      },
      colors: {
        darkgrey: '#24232C',
        grey: '#817D92',
        almostwhite: '#E6E5EA',
        verydarkgrey: '#18171F',
        neongreen: '#A4FFAF',
        red: '#F64A4A',
        orange: '#FB7C58',
        yellow: '#F8CD65',
        gradientbg1: '#14131B',
        gradientbg2: '#08070B'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
