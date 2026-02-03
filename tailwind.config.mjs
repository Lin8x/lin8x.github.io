/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                brand: {
                    primary: '#0dbb63',
                    secondary: '#2D6CDF',
                    dark: '#000000'
                }
            }
        },
	},
	plugins: [],
}
