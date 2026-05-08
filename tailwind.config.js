/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: "#1E40AF",
        customPrimaryHover: "#1a56db",
        customPrimaryLight: "#3B82F6",
        customPrimarySoft: "#EFF6FF",

        customGray: "#ABB2BF",
        customBlack: "#1E1E1E",
        customWhite: "#FFFFFF",
        customText: "#F8FAFC",

        customButton: "#1E40AF",
        customButtonHover: "#1D4ED8",

        customBorder: "#BFDBFE",
      },
      fontFamily: {
      bricolage: ["var(--font-bricolage)", "sans-serif"],
      },
      maxWidth: {
      app: "1280px",
    },
      keyframes: {
      "loading-bar": {
        "0%": { transform: "translateX(-100%)" },
        "50%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(300%)" },
      },
    },
    animation: {
      "loading-bar": "loading-bar 1.2s ease-in-out infinite",
    },
    },
  },
  plugins: [],
};
