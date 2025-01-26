/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.html", "./frontend/pages/**/*.html", "./frontend/pages/**/*.js"],
  theme: {
    extend: {
      colors: {
        'primary-white': '#F6F6F6',
        'secondary-gray': '#BFBFBF',
        'dark-purple': '#2A0052',
        'light-purple': '#BEA5E7',
        'tertiary-gray': '#4D4D4D',
        'primary-black': '#0D0D0D',
      },
      backgroundColor: {
        'primary': '#0D0D0D',
        'secondary': '#141414',
        'tertiary': '#4D4D4D',
        'primary-white': '#F6F6F6',
      },
    },
  },
  plugins: [],
}

