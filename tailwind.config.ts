import type { Config } from "tailwindcss";


/** Tailwind CSS Configuration */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-primary)",
      secondary: "var(--font-secondary)",
      tertiary: "var(--font-tertiary)",
    },
    extend: {
      colors: {
        primary: "#d6d95d",
        secondary: "#67a7bc",
        background: "#000000",
        foreground: "#4e6663",
        text: "#eeeeee",
      },
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)',
      // }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
