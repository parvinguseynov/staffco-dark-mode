import { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../theme/colors';

export const ThemeContext = createContext();

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
        return JSON.parse(savedColors);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Get the current theme (custom or default)
  const currentTheme = customColors || (isDarkMode ? darkTheme : lightTheme);

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
      theme: currentTheme,
      customColors,
      setCustomColors: updateCustomColors,
      resetToDefaultTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
