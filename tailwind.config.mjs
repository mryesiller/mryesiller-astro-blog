/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        serif: ['Helvetica', 'Arial', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#f4f7f9',
          100: '#e2eaf2',
          200: '#c7d7e7',
          300: '#9db8d6',
          400: '#6d93c0',
          500: '#4b74aa',
          600: '#385c8f',
          700: '#2e4b74',
          800: '#294162',
          900: '#263754',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
