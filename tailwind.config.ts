import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './store/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0d0d0d',
          surface: '#1a1a1a',
          border: '#2a2a2a',
          text: '#F0F0F0',
          muted: '#888888',
        },
        cream: {
          bg: '#F5F0E8',
          surface: '#EDE8DC',
          border: '#D8D0C4',
          text: '#1a1a1a',
          muted: '#666666',
        },
        orange: '#FF6B00',
        ps: {
          cross: '#4A90D9',
          circle: '#E8A020',
          triangle: '#5CB85C',
          square: '#D9534F',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('cream', '[data-theme="cream"] &')
    }),
  ],
}

export default config