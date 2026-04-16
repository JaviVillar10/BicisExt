/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-dehesa': '#3D5229',
        'gris-asfalto': '#1F2937',
        'blanco-humo': '#F9FAFB',
        'naranja-alerta': '#F59E0B'
      }
    },
  },
  plugins: [],
}