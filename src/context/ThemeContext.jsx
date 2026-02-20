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

  // Custom colors state - load from localStorage if available
  const [customColors, setCustomColors] = useState(() => {
    const savedColors = localStorage.getItem('staffco-custom-colors');
    if (savedColors) {
      try {
        const parsed = JSON.parse(savedColors);
        // Validate that parsed colors have the required structure
        if (parsed && parsed.app && parsed.desktop) {
          return parsed;
        }
        console.warn('Invalid custom colors in localStorage, resetting');
        localStorage.removeItem('staffco-custom-colors');
        return null;
      } catch (e) {
        console.error('Failed to parse custom colors:', e);
        return null;
      }
    }
    return null;
  });

  // Get the current theme (custom or default)
  // CRITICAL: Always ensure we return a valid theme with app and desktop properties
  const baseTheme = isDarkMode ? darkTheme : lightTheme;
  const currentTheme = customColors || baseTheme;

  // Safety check: Ensure theme always has required properties
  const safeTheme = {
    app: currentTheme?.app || baseTheme.app,
    desktop: currentTheme?.desktop || baseTheme.desktop,
  };

  // Debug logging
  useEffect(() => {
    console.log('=== ThemeProvider State ===', {
      isDarkMode,
      hasCustomColors: !!customColors,
      themeValid: !!(safeTheme && safeTheme.app && safeTheme.desktop),
      appColors: Object.keys(safeTheme?.app || {}),
      desktopColors: Object.keys(safeTheme?.desktop || {}),
    });
  }, [isDarkMode, customColors, safeTheme]);

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

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    // Reset custom colors when switching theme
    setCustomColors(null);
    localStorage.removeItem('staffco-custom-colors');
  };

  const updateCustomColors = (newColors) => {
    setCustomColors(newColors);
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
