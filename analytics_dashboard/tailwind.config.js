// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/adapters/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#1f1f1f",
        border: "#2a2a2a",
        foreground: "#e5e5e5",
        muted: "#888888",
        accent: "#2563eb",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
