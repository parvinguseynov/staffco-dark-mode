import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function Button({ children, variant = 'primary', onClick, className = '', icon, disabled = false, type = 'button' }) {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const getStyles = () => {
    if (variant === 'primary') {
      return {
        background: theme.app.accentBlue,
        color: theme.app.textInverse,
        boxShadow: `0 4px 12px ${isDarkMode ? 'rgba(96,165,250,0.3)' : 'rgba(59,130,246,0.3)'}`,
      };
    }
    return {
      background: theme.app.elevatedBg,
      color: theme.app.textPrimary,
    };
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 ${className}`}
      style={{
        ...getStyles(),
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {icon}
      {children}
    </motion.button>
  );
}
