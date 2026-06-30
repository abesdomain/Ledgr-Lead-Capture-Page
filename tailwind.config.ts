import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        '#0D0F1A',
        card:      '#13162A',
        text:      '#F5F0E8',
        muted:     '#9B9690',
        accent:    '#C9913D',
        secondary: '#4A6B5E',
        urgent:    '#D4521A',
        border:    '#2A2D40',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-dm-mono)', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
