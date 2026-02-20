import { useContext } from 'react';
import { ExternalLink } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function Footer() {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div
      className="flex items-center justify-between px-5 py-3 text-sm"
      style={{
        borderTop: `1px solid ${theme.app.border}`,
        color: theme.app.textMuted,
      }}
    >
      <span>v2.1.0.2</span>
      <a
        href="#"
        className="flex items-center gap-1 hover:underline"
        style={{ color: theme.app.accentBlue }}
      >
        Open Dashboard
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
