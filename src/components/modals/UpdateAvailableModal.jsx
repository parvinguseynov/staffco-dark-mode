import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function UpdateAvailableModal({ isOpen, version = '2.2.0', onUpdate, onLater }) {
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
        {/* Update Icon */}
        <div
          className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: `${theme.app.accentBlue}20` }}
        >
          <Download width={28} height={28} style={{ color: theme.app.accentBlue }} />
        </div>

        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: theme.app.textPrimary }}
        >
          Update Available
        </h3>

        <p
          className="text-sm mb-1"
          style={{ color: theme.app.textSecondary }}
        >
          A new version of StaffCo is available
        </p>

        <p
          className="text-sm font-medium mb-6"
          style={{ color: theme.app.accentBlue }}
        >
          Version {version}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onLater}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: theme.app.elevatedBg,
              color: theme.app.textPrimary,
              border: `1px solid ${theme.app.border}`,
            }}
          >
            Later
          </button>
          <button
            onClick={onUpdate}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: theme.app.accentBlue, color: 'white' }}
          >
            Update Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
