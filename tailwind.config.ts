// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ disables system-based dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
