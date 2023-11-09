/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        drawUp: "drawUp 1s ease-in-out forwards",
        drawDown: "drawDown 1s ease-in-out forwards",
      },

      keyframes: {
        drawUp: {
          "100%": { transform: "scaleY(0)", display: "none" },
        },
        drawDown: {
          "0%": { transform: "scaleY(0)", display: "block" },
          "100%": { transform: "scaleY(1)", display: "block" },
        },
      },
    },
  },
  plugins: [],
};
