/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "node_modules/flowbite-react/**/*",
    "index.html",
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#118a7e",
        secondary: "#3baea0",
        buttonMain: "#1f6f78",
        buttonSecond: "#93e4c1",
        neutralSilver: "#F5F7FA",
        neutralGrey: "#4D4D4D",
        gray900: "#18191F",
      },
      spacing: {
        clearNav: "72px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
