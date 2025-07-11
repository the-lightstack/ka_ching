/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	theme: {
		extend: {},
	},
	plugins: [
		function({ addVariant }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		}
	],
}
