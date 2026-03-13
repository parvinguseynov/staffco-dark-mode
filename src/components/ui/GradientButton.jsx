import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

export function GradientButton({
  children,
  onClick,
  variant = 'blue',
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) {
  const { theme } = useContext(ThemeContext);

  const sizes = {
    small: 'py-2 px-4 text-xs rounded-xl',
    medium: 'py-3 px-6 text-sm rounded-2xl',
    large: 'py-4 px-8 text-base rounded-2xl',
  };

  const getButtonStyle = () => {
    if (variant === 'secondary') {
      return {
        background: theme.app.gradients.cardGlass,
        color: theme.app.textPrimary,
        border: `1px solid ${theme.app.border}`,
        boxShadow: theme.app.shadows.card,
      };
    }

    const gradientMap = {
      blue: {
        gradient: theme.app.gradients.blue,
        shadow: theme.app.shadows.button,
      },
      green: {
        gradient: theme.app.gradients.green,
        shadow: theme.app.shadows.buttonGreen,
      },
      red: {
        gradient: theme.app.gradients.red,
        shadow: theme.app.shadows.buttonRed,
      },
      orange: {
        gradient: theme.app.gradients.orange,
        shadow: theme.app.shadows.button,
      },
      purple: {
        gradient: theme.app.gradients.purple,
        shadow: theme.app.shadows.button,
      },
    };

    const style = gradientMap[variant] || gradientMap.blue;

    return {
      background: style.gradient,
      color: 'white',
      boxShadow: style.shadow,
    };
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      className={`font-semibold transition-all ${sizes[size]} ${className}`}
      style={{
        ...getButtonStyle(),
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
