/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#26a1ab', // Teal - Primary brand color
          dark: '#1e7e86', // Darker teal for text
          light: '#d9f2f4', // Light teal/grey for backgrounds
        },
        teal: {
          50: '#f0fafb',
          100: '#d9f2f4',
          200: '#b8e7eb',
          300: '#87d5dc',
          400: '#4eb9c5',
          500: '#32a1ab',
          600: '#26a1ab', // Primary brand color
          700: '#1e7e86', // Darker teal for text
          800: '#1d656d',
          900: '#1c545b',
          950: '#0d363d',
        },
        background: {
          DEFAULT: '#f9fafb', // Very light grey for body background
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

