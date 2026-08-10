import type { Config } from "tailwindcss";

const config: Config = {
  // Switched from "media" to "class": AVSEC's own dark mode still follows the
  // system preference by default (see the theme-init script in the root
  // layout, which falls back to prefers-color-scheme when nothing is stored)
  // — but this also lets the ICMS module's manual light/dark toggle work.
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        // AirAsia red — matches the AirAsia / AVSEC AirAsia badge logos.
        brand: {
          50: "#fff1f0",
          100: "#ffdcda",
          200: "#ffbab6",
          300: "#ff8d86",
          400: "#ff5951",
          500: "#fb2920",
          600: "#e2001a",
          700: "#b80016",
          800: "#8f0014",
          900: "#6e0512",
        },
        // AVSEC badge gold — used sparingly for accents/highlights alongside brand red.
        gold: {
          50: "#fffceb",
          100: "#fff6c2",
          200: "#ffec85",
          300: "#ffdc40",
          400: "#ffc915",
          500: "#f5b400",
          600: "#d18f00",
          700: "#a86b02",
          800: "#8a5408",
          900: "#74450b",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        // ICMS module tokens (shadcn-style, hsl(var(--x)) — see globals.css).
        // Named "icms-*"/generic-additive only: "brand" above already means
        // AVSEC's red shade scale, so the ICMS module's own equivalent single
        // accent color is namespaced as icms-brand to avoid colliding with it.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "icms-brand": {
          DEFAULT: "hsl(var(--icms-brand))",
          foreground: "hsl(var(--icms-brand-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        base: ["1rem", "1.5rem"],
      },
    },
  },
  plugins: [],
};

export default config;
