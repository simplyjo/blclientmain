/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {

      colors: {
        'yellow': '#f2ea1b',
      },


    },
  },
  plugins: [
    require('flowbite/plugin')
    
  ],
}