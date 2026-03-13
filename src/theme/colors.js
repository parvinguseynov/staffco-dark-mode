export const darkTheme = {
  // macOS Desktop
  desktop: {
    wallpaper: 'linear-gradient(145deg, #0A0E17 0%, #12182B 40%, #1A1F3D 70%, #0A0E17 100%)',
    menuBar: 'rgba(10, 14, 23, 0.9)',
    menuBarBorder: 'rgba(255, 255, 255, 0.08)',
    dock: 'rgba(10, 14, 23, 0.85)',
    dockBorder: 'rgba(255, 255, 255, 0.12)',
  },

  // StaffCo App
  app: {
    // Backgrounds - deeper, richer blacks
    windowBg: '#0A0E17',
    cardBg: '#12182B',
    elevatedBg: '#1E2942',
    hoverBg: '#283654',

    // Borders - subtle but visible
    border: 'rgba(148, 163, 184, 0.12)',
    borderLight: 'rgba(148, 163, 184, 0.08)',
    borderFocus: 'rgba(96, 165, 250, 0.5)',

    // Text
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#0A0E17',

    // Accents - vibrant colors
    accentBlue: '#60A5FA',
    accentBlueGradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)',

    accentGreen: '#34D399',
    accentGreenGradient: 'linear-gradient(135deg, #34D399, #10B981)',

    accentRed: '#F87171',
    accentRedGradient: 'linear-gradient(135deg, #F87171, #EF4444)',

    accentOrange: '#FBBF24',
    accentOrangeGradient: 'linear-gradient(135deg, #FBBF24, #F59E0B)',

    accentPurple: '#A78BFA',
    accentPurpleGradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',

    accentPink: '#F472B6',
    accentTeal: '#2DD4BF',
    accentTealGradient: 'linear-gradient(135deg, #2DD4BF, #14B8A6)',

    accentActiveTask: '#34D399',

    // Active task styling
    activeTaskBg: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(16, 185, 129, 0.08))',
    activeTaskBorder: 'rgba(52, 211, 153, 0.3)',

    // Gradient Definitions
    gradients: {
      // Button gradients
      blue: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
      green: 'linear-gradient(135deg, #34D399, #10B981)',
      red: 'linear-gradient(135deg, #F87171, #EF4444)',
      orange: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
      purple: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',

      // Accent lines (for modal tops)
      blueAccent: 'linear-gradient(90deg, #60A5FA, #3B82F6, #60A5FA)',
      greenAccent: 'linear-gradient(90deg, #34D399, #10B981, #34D399)',
      redAccent: 'linear-gradient(90deg, #F87171, #EF4444, #F87171)',
      orangeAccent: 'linear-gradient(90deg, #FBBF24, #F59E0B, #FBBF24)',
      purpleAccent: 'linear-gradient(90deg, #A78BFA, #8B5CF6, #A78BFA)',

      // Card backgrounds
      cardGlass: 'linear-gradient(145deg, rgba(18, 24, 43, 0.9), rgba(10, 14, 23, 0.95))',
      modalGlass: 'linear-gradient(145deg, rgba(18, 24, 43, 0.98), rgba(10, 14, 23, 0.99))',
    },

    // Shadow Definitions
    shadows: {
      button: '0 4px 15px rgba(96, 165, 250, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
      buttonGreen: '0 4px 15px rgba(52, 211, 153, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
      buttonRed: '0 4px 15px rgba(248, 113, 113, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
      card: '0 0 0 1px rgba(255, 255, 255, 0.03), 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.15)',
      modal: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      shadowSm: '0 2px 4px rgba(0, 0, 0, 0.2)',
      shadowMd: '0 4px 12px rgba(0, 0, 0, 0.3)',
      shadowLg: '0 8px 24px rgba(0, 0, 0, 0.4)',
      shadowXl: '0 16px 48px rgba(0, 0, 0, 0.5)',
      glow: '0 0 30px rgba(96, 165, 250, 0.3)',
      glowBlue: '0 0 20px rgba(96, 165, 250, 0.4)',
      glowGreen: '0 0 20px rgba(52, 211, 153, 0.4)',
      glowRed: '0 0 20px rgba(248, 113, 113, 0.4)',
      glowOrange: '0 0 20px rgba(251, 191, 36, 0.4)',
    },
  }
};

export const lightTheme = {
  // macOS Desktop
  desktop: {
    wallpaper: 'linear-gradient(145deg, #89CFF0 0%, #a0c4ff 30%, #cdb4db 60%, #ffc8dd 100%)',
    menuBar: 'rgba(255, 255, 255, 0.85)',
    menuBarBorder: 'rgba(0, 0, 0, 0.1)',
    dock: 'rgba(255, 255, 255, 0.75)',
    dockBorder: 'rgba(0, 0, 0, 0.1)',
  },

  // StaffCo App
  app: {
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
    accentActiveTask: '#EF4444',

    // Gradient Definitions
    gradients: {
      // Button gradients
      blue: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      green: 'linear-gradient(135deg, #10B981, #059669)',
      red: 'linear-gradient(135deg, #EF4444, #DC2626)',
      orange: 'linear-gradient(135deg, #F59E0B, #D97706)',
      purple: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',

      // Accent lines (for modal tops)
      blueAccent: 'linear-gradient(90deg, #3B82F6, #2563EB, #3B82F6)',
      greenAccent: 'linear-gradient(90deg, #10B981, #059669, #10B981)',
      redAccent: 'linear-gradient(90deg, #EF4444, #DC2626, #EF4444)',
      orangeAccent: 'linear-gradient(90deg, #F59E0B, #D97706, #F59E0B)',
      purpleAccent: 'linear-gradient(90deg, #8B5CF6, #7C3AED, #8B5CF6)',

      // Card backgrounds
      cardGlass: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.95))',
      modalGlass: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.98))',
    },

    // Shadow Definitions
    shadows: {
      button: '0 4px 15px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
      buttonGreen: '0 4px 15px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
      buttonRed: '0 4px 15px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
      card: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.08)',
      modal: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      glow: '0 0 30px rgba(59, 130, 246, 0.3)',
      glowGreen: '0 0 30px rgba(16, 185, 129, 0.3)',
      glowRed: '0 0 30px rgba(239, 68, 68, 0.3)',
      glowOrange: '0 0 30px rgba(245, 158, 11, 0.3)',
    },
  }
};
