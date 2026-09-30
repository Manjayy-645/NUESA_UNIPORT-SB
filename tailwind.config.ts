import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'uniport-navy': '#0B1B3D',
        'uniport-blue': '#1D4ED8',
        'uniport-gold': '#EAB308',
        'nuesa-orange': '#EA580C',
        'nuesa-amber': '#F59E0B',
        'nuesa-green': '#16A34A',
      }
    },
  },
  plugins: [],
}
export default config
