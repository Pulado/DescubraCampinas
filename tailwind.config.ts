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
        background: '#04070D',
        'background-secondary': '#08111F',
        surface: '#08111F',
        card: '#0B1628',
        sidebar: '#08111A',
        primary: '#22C55E',
        secondary: '#3B82F6',
        accent: '#FACC15',
        purple: '#8B5CF6',
        orange: '#F59E0B',
        red: '#EF4444',
        yellow: '#FACC15',
        text: '#FFFFFF',
        'text-secondary': '#A6B1C2',
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-orange': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-yellow': '0 0 20px rgba(250, 204, 21, 0.3)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        'safe-bottom': '100px',
      },
    },
  },
  plugins: [],
}
export default config
