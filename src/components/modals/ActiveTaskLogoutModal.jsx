import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function ActiveTaskLogoutModal({ isOpen, onStopAndLogout, onCancel, taskName }) {
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
        className="relative w-80 rounded-2xl p-6"
        style={{
          background: theme.app.cardBg,
          border: `1px solid ${theme.app.border}`,
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Warning Icon */}
        <div
          className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: `${theme.app.accentOrange}20` }}
        >
          <Clock width={24} height={24} style={{ color: theme.app.accentOrange }} />
        </div>

        <h3
          className="text-lg font-semibold text-center mb-2"
          style={{ color: theme.app.textPrimary }}
        >
          You have an active task running
        </h3>

        <p
          className="text-sm text-center mb-6"
          style={{ color: theme.app.textSecondary }}
        >
          Your timer is still tracking "{taskName}". Would you like to stop and log out?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: theme.app.elevatedBg,
              color: theme.app.textPrimary,
              border: `1px solid ${theme.app.border}`,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onStopAndLogout}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: theme.app.accentRed, color: 'white' }}
          >
            Stop & Log out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
