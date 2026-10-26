import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1100px",
      },
      colors: {
        brand: {
          navy: "#14285A",
          "navy-hero": "#0B2A63",
          "navy-bottom": "#08204F",
          "navy-dark": "#0B2A63",
          "navy-light": "#1B3B82",
          amber: "#F5A800",
          "amber-hover": "#df9800",
          ink: "#14285A",
          "deep-navy": "#0B2A63",
          "ink-light": "#1B3B82",
          offwhite: "#F6F8FB",
          whatsapp: "#16A34A",
          "whatsapp-dark": "#15803D",
          "nav-pill": "#E8EDF7",
        },
      },
      fontFamily: {
        condensed: ["var(--font-barlow-condensed)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        condensedItalic: ["var(--font-barlow-condensed-italic)", "var(--font-barlow-condensed)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-barlow-condensed)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(11, 27, 58, 0.08)",
        card: "0 8px 30px rgba(11, 27, 58, 0.08)",
        "card-hover": "0 14px 36px rgba(11, 27, 58, 0.14)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
