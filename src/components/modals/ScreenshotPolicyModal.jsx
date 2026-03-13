import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function ScreenshotPolicyModal({ isOpen, onAccept }) {
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
          style={{ background: `${theme.app.accentPurple}20` }}
        >
          <Camera width={24} height={24} style={{ color: theme.app.accentPurple }} />
        </div>

        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: theme.app.textPrimary }}
        >
          Screenshot Policy
        </h3>

        <p
          className="text-sm mb-6"
          style={{ color: theme.app.textSecondary }}
        >
          StaffCo periodically captures screenshots (every 5–30 mins) to track productivity. Screenshots are securely stored and only visible to authorized managers.
        </p>

        <button
          onClick={onAccept}
          className="w-full py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
          style={{ background: theme.app.accentBlue, color: 'white' }}
        >
          Accept
        </button>
      </motion.div>
    </div>
  );
}
