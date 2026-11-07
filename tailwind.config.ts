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
        // Official Department of Electrical & Electronics Engineering Color System
        // 60-30-10 Institutional Tech Palette
        'eee-navy': '#0A192F',      // Dominant Executive Navy (60% background/authority)
        'eee-blue': '#2563EB',      // Tech Blue (30% interactive energy)
        'eee-cyan': '#0EA5E9',      // Circuit Accent (10% high-tech highlights)
        'eee-gold': '#F59E0B',      // Academic Excellence Gold
        'eee-surface': '#F8FAFC',   // Crisp Slate-50 backdrop

        // UniPort & Engineering Brand Mappings
        'uniport-navy': '#0A192F',
        'uniport-blue': '#1D4ED8',
        'uniport-gold': '#D97706',
        
        // Semantic Roles
        'primary': '#0A192F',
        'primary-light': '#1E293B',
        'electric': '#2563EB',
        'electric-dark': '#1D4ED8',
        'accent': '#2563EB',
        'accent-gold': '#F59E0B',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'elevated': '0 10px 25px -3px rgba(10, 25, 47, 0.08), 0 4px 6px -4px rgba(10, 25, 47, 0.04)',
      }
    },
  },
  plugins: [],
}
export default config
