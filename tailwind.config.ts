import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "bluewoods-sky": "#84C7FF",
        "bluewoods-deep": "#0A3E6B",
        "bluewoods-ink": "#133554",
        "bluewoods-mist": "#F5FAFF",
        "bluewoods-cloud": "#E8F2FB"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 30px rgba(10, 62, 107, 0.12)",
        glass: "0 20px 50px rgba(8, 44, 78, 0.18)"
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(180deg, rgba(4,16,30,0.24) 0%, rgba(4,16,30,0.62) 70%, rgba(6,20,36,0.86) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
