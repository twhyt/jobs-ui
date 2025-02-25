import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // ## Set Up Hero UI ##
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
      },
      fontSize: {
        xs: "var(--font-xs)",
        sm: "var(--font-sm)",
        base: "var(--font-base)",
        lg: "var(--font-lg)",
        xl: "var(--font-xl)",
        "2xl": "var(--font-2xl)",
        "3xl": "var(--font-3xl)",
        "4xl": "var(--font-4xl)",
        "5xl": "var(--font-5xl)",
        "6xl": "var(--font-6xl)",
        "7xl": "var(--font-7xl)",
        "8xl": "var(--font-8xl)",
        "9xl": "var(--font-9xl)",
        "10xl": "var(--font-10xl)",
      },
      borderRadius: {
        sm: "var(--border-radius-1)", // 16px
        md: "var(--border-radius-2)", // 32px
        lg: "var(--border-radius-3)", // 48px
        xl: "var(--border-radius-4)", // 64px
        full: "var(--border-radius-full)", // Fully rounded
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "light-blue": {
          50: "var(--color-light-blue-1)",
          100: "var(--color-light-blue-2)",
          200: "var(--color-light-blue-3)",
          300: "var(--color-light-blue-4)",
          400: "var(--color-light-blue-5)",
          500: "var(--color-light-blue-6)",
          600: "var(--color-light-blue-7)",
          700: "var(--color-light-blue-8)",
          800: "var(--color-light-blue-9)",
          900: "var(--color-light-blue-10)",
        },
        "light-green": {
          50: "var(--color-light-green-1)",
          100: "var(--color-light-green-2)",
          200: "var(--color-light-green-3)",
          300: "var(--color-light-green-4)",
          400: "var(--color-light-green-5)",
          500: "var(--color-light-green-6)",
          600: "var(--color-light-green-7)",
          700: "var(--color-light-green-8)",
          800: "var(--color-light-green-9)",
          900: "var(--color-light-green-10)",
        },
        "light-cyan": {
          50: "var(--color-light-cyan-1)",
          100: "var(--color-light-cyan-2)",
          200: "var(--color-light-cyan-3)",
          300: "var(--color-light-cyan-4)",
          400: "var(--color-light-cyan-5)",
          500: "var(--color-light-cyan-6)",
          600: "var(--color-light-cyan-7)",
          700: "var(--color-light-cyan-8)",
          800: "var(--color-light-cyan-9)",
          900: "var(--color-light-cyan-10)",
        },
        "dark-blue": {
          50: "var(--color-dark-blue-1)",
          100: "var(--color-dark-blue-2)",
          200: "var(--color-dark-blue-3)",
          300: "var(--color-dark-blue-4)",
          400: "var(--color-dark-blue-5)",
          500: "var(--color-dark-blue-6)",
          600: "var(--color-dark-blue-7)",
          700: "var(--color-dark-blue-8)",
          800: "var(--color-dark-blue-9)",
          900: "var(--color-dark-blue-10)",
        },
        "dark-green": {
          50: "var(--color-dark-green-1)",
          100: "var(--color-dark-green-2)",
          200: "var(--color-dark-green-3)",
          300: "var(--color-dark-green-4)",
          400: "var(--color-dark-green-5)",
          500: "var(--color-dark-green-6)",
          600: "var(--color-dark-green-7)",
          700: "var(--color-dark-green-8)",
          800: "var(--color-dark-green-9)",
          900: "var(--color-dark-green-10)",
        },
        "dark-cyan": {
          50: "var(--color-dark-cyan-1)",
          100: "var(--color-dark-cyan-2)",
          200: "var(--color-dark-cyan-3)",
          300: "var(--color-dark-cyan-4)",
          400: "var(--color-dark-cyan-5)",
          500: "var(--color-dark-cyan-6)",
          600: "var(--color-dark-cyan-7)",
          700: "var(--color-dark-cyan-8)",
          800: "var(--color-dark-cyan-9)",
          900: "var(--color-dark-cyan-10)",
        },
      },
    },
  },
  plugins: [heroui()],
};
export default config;
