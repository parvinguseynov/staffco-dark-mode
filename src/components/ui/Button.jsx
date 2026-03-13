import { motion } from 'framer-motion';

export function Button({
  children,
  variant = 'primary',
  icon,
  onClick,
  disabled,
  fullWidth,
  size = 'md',
  type = 'button',
  className = '',
}) {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(96, 165, 250, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
    },
    success: {
      background: 'linear-gradient(135deg, #34D399, #10B981)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(52, 211, 153, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
    },
    danger: {
      background: 'linear-gradient(135deg, #F87171, #EF4444)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(248, 113, 113, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
    },
    secondary: {
      background: 'rgba(51, 65, 85, 0.5)',
      color: '#F1F5F9',
      boxShadow: 'none',
      border: '1px solid rgba(148, 163, 184, 0.2)',
    },
    ghost: {
      background: 'transparent',
      color: '#94A3B8',
      boxShadow: 'none',
    },
  };

  const sizes = {
    sm: { padding: '8px 16px', fontSize: '13px' },
    md: { padding: '12px 20px', fontSize: '14px' },
    lg: { padding: '16px 28px', fontSize: '15px' },
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...variants[variant],
        ...sizes[size],
        width: fullWidth ? '100%' : 'auto',
        borderRadius: '14px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        border: variants[variant].border || 'none',
      }}
    >
      {icon}
      {children}
    </motion.button>
  );
}
