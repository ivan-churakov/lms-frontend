/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "blue-color": "var(--blue-color)",
        "font-color": "var(--font-color)",
        "font-opacity-color": "var(--font-opacity-color)",
      },
      backgroundImage: {
        'background': "url('/src/images/background.png')",
      },
      boxShadow: {
        'card': '0px 4px 6px 8px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}