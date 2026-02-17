/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		// Dynamic color classes used in PersonalModules
		'border-brand-primary/30', 'text-brand-primary', 'bg-brand-primary/10', 'hover:border-brand-primary/50',
		'border-purple-500/30', 'text-purple-500', 'bg-purple-500/10', 'hover:border-purple-500/50',
		'border-green-500/30', 'text-green-500', 'bg-green-500/10', 'hover:border-green-500/50',
		'border-blue-500/30', 'text-blue-500', 'bg-blue-500/10', 'hover:border-blue-500/50',
		'border-rose-500/30', 'text-rose-500', 'bg-rose-500/10', 'hover:border-rose-500/50',
		'border-cyan-500/30', 'text-cyan-500', 'bg-cyan-500/10', 'hover:border-cyan-500/50',
		'border-orange-500/30', 'text-orange-500', 'bg-orange-500/10', 'hover:border-orange-500/50',
		'border-amber-500/30', 'text-amber-500', 'bg-amber-500/10', 'hover:border-amber-500/50',
		'border-teal-500/30', 'text-teal-500', 'bg-teal-500/10', 'hover:border-teal-500/50',
	],
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
