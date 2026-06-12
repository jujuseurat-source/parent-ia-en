import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
      },
      colors: {
        paper: '#FBF8F0',
        beige: {
          50:  '#FDFAF5',
          100: '#FAF5EC',
          200: '#F2E8D5',
          300: '#E3D7BD',
          DEFAULT: '#F5EFE0',
        },
        sauge: {
          100: '#D4E4D4',
          200: '#AECBAE',
          300: '#8FAF8F',
          400: '#6E926E',
          DEFAULT: '#7A9E7A',
          600: '#5C7E5C',
        },
        terracotta: {
          100: '#F2D5C8',
          200: '#DFA68D',
          300: '#C4704A',
          DEFAULT: '#B86A3E',
          500: '#9A5530',
        },
        brun: {
          DEFAULT: '#3D3028',
          light: '#8B7B6B',
          lighter: '#B5A898',
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
