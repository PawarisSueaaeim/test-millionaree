import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                spin: {
                    from: {
                        transform: 'rotate(0deg)',
                    },
                    to: {
                        transform: 'rotate(360deg)',
                    },
                },
            },
            animation: {
                spin: 'spin 3s linear infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;
