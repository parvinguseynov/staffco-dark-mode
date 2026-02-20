import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function Toggle({ enabled, onChange }) {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <button
      onClick={() => onChange(!enabled)}
      className="relative w-11 h-6 rounded-xl transition-colors"
      style={{
        background: enabled ? theme.app.accentBlue : theme.app.elevatedBg,
      }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
        animate={{
          left: enabled ? '22px' : '2px',
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}
