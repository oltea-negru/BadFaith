/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/src/assets/images/main.jpg')",
      },
      fontFamily: {
        'bloomberg': ['Bloomberg', 'sans-serif'],
      }
    },
    plugins: [],
  }
}