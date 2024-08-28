/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: '#1D4ED8',
        secondary: '#EC4899',
        accent: '#F59E0B',
        background: '#F9FAFB',
        containerBackground: '#FFFFFF',
        text: '#1F2937',
        success: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}
