/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green":"#39DB4A",
        "red":  "#FF6868",
        "secondary":"#555",
        "primaryBG":"#FCFCFC"
      },
      fontFamily:{
        "primary":["Inter",'sans-serif']
      },
      keyframes: {
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        jiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
      },
      animation: {
        pop: 'pop 0.3s ease-in-out',
        jiggle: 'jiggle 0.3s ease-in-out',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: "light",
  },
};
