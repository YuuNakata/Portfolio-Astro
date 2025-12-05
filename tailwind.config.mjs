/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  // Asegúrate de que las rutas cubran todos tus archivos
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0a0a0a",
        foreground: "#e5e5e5",
        primary: "#22d3ee", // Cyan
        secondary: "#c084fc", // Purple
        muted: "#525252",
      },
      fontFamily: {
        pixel: ["Silkscreen", "cursive"],
        "pixel-serif": ["Jacquard 12", "serif"],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      animation: {
        glitch: "glitch 1s linear infinite",
        // Animaciones personalizadas
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
