/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CAMBIAMOS EL VERDE OSCURO POR EL VERDE BONITO DE EXTREMADURA
        'verde-dehesa': '#009739', 
        'gris-asfalto': '#333333',
      }
    },
  },
  plugins: [],
}