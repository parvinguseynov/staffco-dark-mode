// Theme Presets - Ready-made color schemes
// Users can apply these with one click from Settings

export const themePresets = [
  {
    id: 'default-dark',
    name: 'Default Dark',
    description: 'Original dark theme',
    icon: '🌙',
    theme: {
      app: {
        windowBg: '#0F172A',
        cardBg: '#1E293B',
        elevatedBg: '#334155',
        hoverBg: '#3E4C63',
        border: 'rgba(148, 163, 184, 0.15)',
        textPrimary: '#F1F5F9',
        textSecondary: '#CBD5E1',
        textMuted: '#94A3B8',
        accentBlue: '#3B82F6',
        accentGreen: '#10B981',
        accentRed: '#EF4444',
        accentOrange: '#F59E0B',
        accentPurple: '#8B5CF6',
        accentActiveTask: '#34D399',
      },
    },
  },
  {
    id: 'default-light',
    name: 'Default Light',
    description: 'Clean and bright',
    icon: '☀️',
    theme: {
      app: {
        windowBg: '#F8FAFC',
        cardBg: '#FFFFFF',
        elevatedBg: '#F1F5F9',
        hoverBg: '#E2E8F0',
        border: 'rgba(71, 85, 105, 0.15)',
        textPrimary: '#0F172A',
        textSecondary: '#475569',
        textMuted: '#64748B',
        accentBlue: '#2563EB',
        accentGreen: '#059669',
        accentRed: '#DC2626',
        accentOrange: '#D97706',
        accentPurple: '#7C3AED',
        accentActiveTask: '#10B981',
      },
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep purple accents',
    icon: '🌆',
    theme: {
      app: {
        windowBg: '#0F0D1A',        // Deep purple-black
        cardBg: '#1A1726',          // Purple-tinted cards (more distinct)
        elevatedBg: '#252136',
        hoverBg: '#302846',
        border: 'rgba(139, 92, 246, 0.15)',
        textPrimary: '#F1F5F9',
        textSecondary: '#A5A0B8',   // Purple-tinted secondary text
        textMuted: '#6E6880',       // Purple-tinted muted
        accentBlue: '#818CF8',
        accentGreen: '#34D399',
        accentRed: '#F87171',
        accentOrange: '#FBBF24',
        accentPurple: '#8B5CF6',    // Purple accent
        accentActiveTask: '#A78BFA',
      },
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blue tones',
    icon: '🌊',
    theme: {
      app: {
        windowBg: '#0A1018',        // Deep ocean blue-black
        cardBg: '#111B27',          // Teal-tinted cards (more distinct)
        elevatedBg: '#1A2836',
        hoverBg: '#233545',
        border: 'rgba(6, 182, 212, 0.12)',
        textPrimary: '#F1F5F9',
        textSecondary: '#8FAAB8',   // Teal-tinted secondary text
        textMuted: '#5A7585',       // Teal-tinted muted
        accentBlue: '#38BDF8',
        accentGreen: '#2DD4BF',
        accentRed: '#FB7185',
        accentOrange: '#FDBA74',
        accentPurple: '#C084FC',
        accentActiveTask: '#06B6D4', // Cyan accent
      },
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Neutral grays',
    icon: '⚫',
    theme: {
      app: {
        windowBg: '#18181B',        // Pure dark gray (no blue tint)
        cardBg: '#27272A',          // Neutral gray cards (more distinct)
        elevatedBg: '#3F3F46',
        hoverBg: '#52525B',
        border: 'rgba(161, 161, 170, 0.12)',
        textPrimary: '#FAFAFA',
        textSecondary: '#A1A1AA',   // Neutral gray secondary
        textMuted: '#71717A',       // Neutral gray muted
        accentBlue: '#60A5FA',
        accentGreen: '#3FB950',
        accentRed: '#F87171',
        accentOrange: '#FB923C',
        accentPurple: '#A78BFA',
        accentActiveTask: '#A1A1AA', // Gray accent
      },
    },
  },
];
