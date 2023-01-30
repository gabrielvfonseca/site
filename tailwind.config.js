const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
     "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
      serif: ["var(--font-serif)", ...fontFamily.serif],
    },
    keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",

      background: {
        dark: "#090a0a",
        light: "#FAFAFA"
      },

      over: {
        dark: "#0E0F0F",
        light: "#FFF"
      },

      gray: {
        dark: "#FAFAFA",
        light: "#6E6E6E"
      },
      border: "#414040",

      hover: {
        light: "#E6E6E6",
        dark: "#101011"
      }

    },
    borderWidth: {
      1: "0.6px",
      2: "2px",
    },
  },
  plugins: [],
}