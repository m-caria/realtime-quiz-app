/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			body: ['Montserrat', 'sans-serif'],
			secondary: ['Preahvihear', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: '#FB923C',
				stone: '#A1A1AA',
				transparent: 'transparent',
			},
		},
	},
	plugins: [],
};
