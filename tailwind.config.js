/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom colors for Azaan Fitness brand
      colors: {
        brand: {
          orange: "#f97316",
          "orange-dark": "#ea580c",
          black: "#0a0a0a",
          card: "rgba(255,255,255,0.03)",
        },
      },
      // Custom font families
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
