import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function Desktop({ children }) {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{ background: theme.desktop.wallpaper }}
    >
      {children}
    </div>
  );
}
