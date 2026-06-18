/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#1a1a1a',
        'bg-surface': '#2a2a2a',
        'bg-surface2': '#313131',
        'accent': '#7c2d9e',
        'accent-hover': '#9535ba',
        'text-main': '#f2f2f2',
        'text-secondary': '#888',
        'text-tertiary': '#555',
      },
      fontFamily: {
        'clash': ['Clash Display', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
