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
        // Official SEEES (Society of Electrical and Electronic Engineering Students) 60-30-10 Palette
        'seees-blue': '#1E3A8A', // Deep Blue (blue-900) - Primary / Authority (60%)
        'seees-primary': '#1E3A8A',
        'seees-red': '#DC2626', // Red (red-600) - Strict Accent (10%)
        'seees-accent': '#DC2626',
        'seees-bg': '#FFFFFF', // Crisp White (30%)
        'seees-surface': '#F8FAFC', // Slate-50 subtle off-white
        
        // Brand mappings
        'uniport-navy': '#1E3A8A',
        'uniport-blue': '#1E3A8A',
      }
    },
  },
  plugins: [],
}
export default config