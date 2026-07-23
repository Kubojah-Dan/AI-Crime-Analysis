import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          raised: 'var(--paper-raised)',
          light: 'var(--paper-light, #F8F7F3)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          muted: '#8C96A0',
        },
        hairline: 'var(--hairline)',
        cobalt: {
          DEFAULT: '#2B5AA0',
          dark: '#1E4278',
          light: '#4A78BC',
        },
        stamp: {
          green: '#3F6B57',
          gray: '#6B6A62',
          blue: '#2B5AA0',
        },
        rust: '#A63B2A',
        ochre: '#C1852B',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
