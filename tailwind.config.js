/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          // Desktop
          wallpaper: '#1a1a2e',
          menuBar: 'rgba(22, 22, 30, 0.85)',
          dock: 'rgba(30, 30, 40, 0.75)',

          // App
          windowBg: '#0F172A',
          cardBg: '#1E293B',
          elevatedBg: '#334155',
          hoverBg: '#3B4963',
          border: '#334155',

          textPrimary: '#F1F5F9',
          textSecondary: '#94A3B8',
          textMuted: '#64748B',
          textInverse: '#0F172A',

          accentBlue: '#60A5FA',
          accentGreen: '#34D399',
          accentRed: '#F87171',
          accentOrange: '#FBBF24',
          accentPurple: '#A78BFA',
          accentPink: '#F472B6',
          accentTeal: '#2DD4BF',
        },

        // Light theme colors
        light: {
          // Desktop
          wallpaper: '#89CFF0',
          menuBar: 'rgba(255, 255, 255, 0.85)',
          dock: 'rgba(255, 255, 255, 0.75)',

          // App
          windowBg: '#F8FAFC',
          cardBg: '#FFFFFF',
          elevatedBg: '#F1F5F9',
          hoverBg: '#E2E8F0',
          border: '#E2E8F0',

          textPrimary: '#1E293B',
          textSecondary: '#64748B',
          textMuted: '#94A3B8',
          textInverse: '#FFFFFF',

          accentBlue: '#3B82F6',
          accentGreen: '#10B981',
          accentRed: '#EF4444',
          accentOrange: '#F59E0B',
          accentPurple: '#8B5CF6',
          accentPink: '#EC4899',
          accentTeal: '#14B8A6',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'menu': ['13px', '18px'],
      },
    },
  },
  plugins: [],
}
