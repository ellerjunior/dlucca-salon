import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        ink: "var(--color-ink)",
        umber: "var(--color-umber)",
        taupe: "var(--color-taupe)",
        sand: "var(--color-sand)",
        linen: "var(--color-linen)",
        alabaster: "var(--color-alabaster)",
        brass: "var(--color-brass)",
        void: "var(--color-void)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        label: ["var(--font-label)", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "90rem",
        measure: "72ch",
      },
      transitionTimingFunction: {
        house: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
