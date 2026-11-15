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
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        mist: "var(--mist)",
        paper: "var(--paper)",
        amber: "var(--amber)",
        "amber-hot": "var(--amber-hot)",
        teal: "var(--teal)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px var(--glow)",
      },
    },
  },
  plugins: [],
} satisfies Config;
