/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:['Roboto', 'sans-serif']
      },
      boxShadow: {
        'custom-shadow': '10px 4px 20px 0px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
}