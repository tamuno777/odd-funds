import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: "#800020",
        customgray: "#ABB2BF",
        customblack: "#1E1E1E",
        customwhite: "#FFFFFF",
        customtext: "#FFFFF0",
        custombutton: "#003366",
        customborder: "#B87333",
      },
      fontFamily: {
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
