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
				secondary: '#166534',
				transparent: 'transparent',
				danger: '#DC2626',
				black: '#121212',
			},
		},
	},
	plugins: [],
};
