/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        genisysDark: '#3f444a',
        genisysDarker: '#2d3136',
        genisysBlue: '#0066b2',
        genisysOrange: '#f37021',
        genisysGreen: '#23b14d',
        genisysYellow: '#ffc20e',
        genisysPurple: '#92278f',
      }
    },
  },
  plugins: [],
}
