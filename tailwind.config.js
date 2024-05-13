/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  corePlugins: {
    container: false,
  },
  theme: {
    darkMode: "media",
    fontFamily: {},
    extend: {
      colors: {
        "text-color": "rgba(var(--text-color))",
        "secondary-text": "rgba(var(--secondary-text))",
        gray: "rgba(var(--gray))",
        "primary-color": "rgba(var(--primary-color))",
        "primary-background": "rgba(var(--primary-background))",
        "secondary-background": "rgba(var(--secondary-background))",
        "warning-color": "rgba(var(--warning-color))",
        "success-color": "rgba(var(--success-color))",
      },
      fontSize: {
        h1: "var(--heading1)",
        h2: "var(--heading2)",
        h3: "var(--heading3)",
        xsmall: "var(--xsmall-text)",
        small: "var(--small-text)",
        medium: "var(--medium-text)",
        large: "var(--large-text)",
      },
      screens: {
        mb: { min: "0px", max: "640px" },
      },
    },
  },
  plugins: [],
};
