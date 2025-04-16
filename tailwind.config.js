/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: false, // ← aktifkan dark mode class-based
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}", // semua file dalam app
        "./src/components/**/*.{js,ts,jsx,tsx}", // semua komponen
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
