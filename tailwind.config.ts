import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green': '#0B8888',
        'brand-lightgreen': '#63DBC0'
      },
    },
  },
  plugins: [],
} satisfies Config

