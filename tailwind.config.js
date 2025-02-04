/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      boxShadow: {
        '4xl': '25px 25px 0px white,5px 5px 25px cyan',
      },
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', 'sans-serif'],
        edu: ['"Edu SA Beginner"', 'cursive'],
      },
      colors: {
        richblack:{
          200: "#f0f0f0",
          300: "#f6f6f6",
          800: "#1d1d1d",
          900: "#121220"
        },
      },
    },
  },
  plugins: [],
};
