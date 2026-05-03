import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
        display: ["Cairo", "sans-serif"],
      },
      colors: {
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        brand: {
          50: "#FFF8ED",
          100: "#FEEFD3",
          200: "#FDD9A0",
          300: "#FBB850",
          400: "#F99A1C",
          500: "#D4780A",
          600: "#A85C08",
          700: "#7A430A",
          800: "#4E2B09",
          900: "#2D1800",
        },
        terra: {
          300: "#F4A88A",
          400: "#E88A65",
          500: "#E07B54",
          600: "#C45A33",
        },
      },
      animation: {
        "slide-in": "slideIn 0.4s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "bounce-soft": "bounceSoft 0.6s ease-out",
        "flash": "flash 0.5s ease-in-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceSoft: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "60%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        flash: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "30%": { opacity: "1", transform: "scale(1)" },
          "70%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
