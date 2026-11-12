/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Breakpoints alinhados ao PDF: mobile 390, tablet 768, desktop 1440.
    screens: {
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#64748B",
        secondary: "#0A192F",
        "secondary-dark": "#020C1B",
        "text-light": "#E6F1F4",
        "text-footer": "#8892B0",
        acento: "#2DD4BF",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
