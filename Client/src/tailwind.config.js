import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#3b82f6",
                    "secondary": "#14b8a6",
                    "accent": "#f43f5e",
                    "neutral": "#3d4451",
                    "base-100": "#ffffff",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
            {
                dark: {
                    "primary": "#60a5fa",
                    "secondary": "#2dd4bf",
                    "accent": "#f472b6",
                    "neutral": "#191d24",
                    "base-100": "#1f2937",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
        darkTheme: "dark",
    },
};

export default config;