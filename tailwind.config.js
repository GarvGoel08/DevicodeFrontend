/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#020416',
        'secondary-bg': '#050820',
        'theme-color-primary': '#2196F3',
        'theme-color-secondary': '#1565C0', 
        'text-normal': '#ffffff',
        'text-light': 'rgb(156 163 175 / var(--tw-text-opacity, 1))',
      },
      backgroundImage: {
        'blue-grad': 'linear-gradient(to right, #141a2c, #020715)'
      },
    },
  },
  plugins: [],
};
