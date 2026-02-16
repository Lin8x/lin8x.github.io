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
            },
            typography: {
                DEFAULT: {
                    css: {
                        '--tw-prose-body': '#d1d5db',
                        '--tw-prose-headings': '#ffffff',
                        '--tw-prose-lead': '#9ca3af',
                        '--tw-prose-links': '#0dbb63',
                        '--tw-prose-bold': '#0dbb63',
                        '--tw-prose-counters': '#9ca3af',
                        '--tw-prose-bullets': '#4b5563',
                        '--tw-prose-hr': '#374151',
                        '--tw-prose-quotes': '#f3f4f6',
                        '--tw-prose-quote-borders': '#0dbb63',
                        '--tw-prose-captions': '#9ca3af',
                        '--tw-prose-code': '#2D6CDF',
                        '--tw-prose-pre-code': '#e5e7eb',
                        '--tw-prose-pre-bg': '#111827',
                        '--tw-prose-th-borders': '#4b5563',
                        '--tw-prose-td-borders': '#374151',
                    },
                },
            },
        },
	},
	plugins: [
        require('@tailwindcss/typography'),
    ],
}
