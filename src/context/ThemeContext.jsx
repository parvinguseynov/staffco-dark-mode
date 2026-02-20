import { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../theme/colors';

// Create context with default value to prevent undefined errors
export const ThemeContext = createContext({
  isDarkMode: true,
  theme: darkTheme,
  toggleTheme: () => {},
  customColors: null,
  setCustomColors: () => {},
  resetToDefaultTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('staffco-theme');
    return saved !== 'light'; // Default to dark mode
  });

  // Custom colors state - load from localStorage with validation
  const [customColors, setCustomColors] = useState(() => {
    const savedColors = localStorage.getItem('staffco-custom-colors');
    if (savedColors) {
      try {
        const parsed = JSON.parse(savedColors);
        // Validate structure - must have both app and desktop properties
        if (parsed && parsed.app && parsed.desktop) {
          return parsed;
        }
        // Invalid structure, clear it
        console.warn('Clearing corrupted custom colors from localStorage');
        localStorage.removeItem('staffco-custom-colors');
        return null;
      } catch (e) {
        console.error('Failed to parse custom colors, clearing:', e);
        localStorage.removeItem('staffco-custom-colors');
        return null;
      }
    }
    return null;
  });

  const baseTheme = isDarkMode ? darkTheme : lightTheme;

  // Safe theme merge - ensures app and desktop properties always exist
  const currentTheme = customColors
    ? {
        ...baseTheme,
        ...customColors,
        app: {
          ...baseTheme.app,
          ...(customColors.app || {}),
        },
        desktop: {
          ...baseTheme.desktop,
          ...(customColors.desktop || {}),
        },
      }
    : baseTheme;

  // Final safety check - guarantee app and desktop properties exist
  const safeTheme = {
    ...currentTheme,
    app: currentTheme.app || baseTheme.app,
    desktop: currentTheme.desktop || baseTheme.desktop,
  };

  useEffect(() => {
    localStorage.setItem('staffco-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Save custom colors to localStorage
  useEffect(() => {
    if (customColors) {
      localStorage.setItem('staffco-custom-colors', JSON.stringify(customColors));
    }
  }, [customColors]);

  // Debug logging
  useEffect(() => {
    console.log('=== ThemeProvider State ===', {
      isDarkMode,
      hasCustomColors: !!customColors,
      themeValid: !!(safeTheme && safeTheme.app && safeTheme.desktop),
      appExists: !!safeTheme?.app,
      desktopExists: !!safeTheme?.desktop,
      windowBg: safeTheme?.app?.windowBg,
      appColorKeys: Object.keys(safeTheme?.app || {}).length,
      desktopColorKeys: Object.keys(safeTheme?.desktop || {}).length,
    });
  }, [isDarkMode, customColors, safeTheme]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    // Reset custom colors when switching theme
    setCustomColors(null);
    localStorage.removeItem('staffco-custom-colors');
  };

  const updateCustomColors = (newColors) => {
    // Ensure the new colors have proper structure
    if (newColors) {
      const merged = {
        ...baseTheme,
        ...newColors,
        app: {
          ...baseTheme.app,
          ...(newColors.app || {}),
        },
        desktop: {
          ...baseTheme.desktop,
          ...(newColors.desktop || {}),
        },
      };
      setCustomColors(merged);
    } else {
      setCustomColors(null);
    }
  };

  const resetToDefaultTheme = () => {
    setCustomColors(null);
    localStorage.removeItem('staffco-custom-colors');
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      theme: safeTheme,
      customColors,
      setCustomColors: updateCustomColors,
      resetToDefaultTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
