/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],  
  theme: {
    extend: {
      gridTemplateColumns: {
        'login': '30% 70%',
        'account-summary-col': '40% 1fr',
        'account-item-row': 'repeat(2, 1fr)',
        'account-summary-item-col-9ch': '9ch 1fr',
        'account-summary-item-col-15ch': '15ch 1fr',
      },
      boxShadow: {
        'nav': '0 0 10px 5px #ddd',
      },
      screens: {
        xs: '540px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      keyframes: {
        typing: {
          '0%': {
            width: '0ch'
          }
        }
      },
      animation: {
        typewriter: 'typing 2.5s steps(25)'
      }
    },
  },
  plugins: [],
}