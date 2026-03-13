import { useContext } from 'react';
import { motion } from 'framer-motion';
import { WifiOff } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function OfflineModal({ isOpen, onReconnect }) {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-80 rounded-2xl p-6 text-center"
        style={{
          background: theme.app.cardBg,
          border: `1px solid ${theme.app.border}`,
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: `${theme.app.accentOrange}20` }}
        >
          <WifiOff width={24} height={24} style={{ color: theme.app.accentOrange }} />
        </div>

        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: theme.app.textPrimary }}
        >
          Working Offline
        </h3>

        <p
          className="text-sm mb-6"
          style={{ color: theme.app.textSecondary }}
        >
          No internet connection detected. Your time is being tracked locally and will sync automatically when you reconnect.
        </p>

        <button
          onClick={onReconnect}
          className="w-full py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
          style={{ background: theme.app.accentBlue, color: 'white' }}
        >
          Reconnect
        </button>
      </motion.div>
    </div>
  );
}
