/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-light": "#D8D8D8",
        "gray-dark": "#707070",
        accent: "#A18A68",
      },
      spacing: {
        5.5: "22px",
        13: "52px",
        11.5: "46px",
        17: "68px",
        22.5: "90px",
        19: "76px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
