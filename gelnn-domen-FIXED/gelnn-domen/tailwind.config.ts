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
      },
      colors: {
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
        // ✅ FIXED: terra-50 was missing — caused build errors
        terra: {
          50: "#FFF3EE",
          100: "#FFE6D9",
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
      },
    },
  },
  plugins: [],
};

export default config;
