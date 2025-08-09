/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  extend: {
  		fontFamily: {
  			geist: [
  				'Geist',
  				'sans-serif'
  			],
  			fugaz: [
  				'Fugaz One',
  				'sans-serif'
  			],
  			Cal: [
  				'Cal Sans',
  				'sans-serif'
  			]
  		},
    },
  plugins: [require("daisyui")],
}

