import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

export function LogoutModal({ isOpen, onLogout, onCancel }) {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
        onClick={onCancel}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-72 rounded-2xl p-6 text-center"
        style={{
          background: theme.app.cardBg,
          border: `1px solid ${theme.app.border}`,
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: theme.app.textPrimary }}
        >
          Log out?
        </h3>
        <p
          className="text-sm mb-6"
          style={{ color: theme.app.textSecondary }}
        >
          Are you sure you want to log out?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: theme.app.elevatedBg,
              color: theme.app.textPrimary,
              border: `1px solid ${theme.app.border}`,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: theme.app.accentRed, color: 'white' }}
          >
            Log out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
