import { useContext } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function DesktopTrackingModal({ isOpen, onOpenApp }) {
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
          style={{ background: `${theme.app.accentGreen}20` }}
        >
          <CheckCircle width={24} height={24} style={{ color: theme.app.accentGreen }} />
        </div>

        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: theme.app.textPrimary }}
        >
          Tracking via Desktop App
        </h3>

        <p
          className="text-sm mb-6"
          style={{ color: theme.app.textSecondary }}
        >
          Your time is being tracked through the StaffCo Desktop application.
        </p>

        <button
          onClick={onOpenApp}
          className="text-sm font-medium flex items-center justify-center gap-1 mx-auto transition-all hover:opacity-80"
          style={{ color: theme.app.accentBlue }}
        >
          Open desktop app →
        </button>
      </motion.div>
    </div>
  );
}
