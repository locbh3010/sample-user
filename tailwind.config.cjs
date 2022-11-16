/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-light": "#D8D8D8",
        accent: "#A18A68",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
