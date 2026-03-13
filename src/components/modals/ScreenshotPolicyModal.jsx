import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function ScreenshotPolicyModal({ isOpen, onAccept }) {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(167, 139, 250, 0.15)
          `,
        }}
      >
        {/* Gradient accent line at top - Purple */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, #A78BFA, #8B5CF6, #A78BFA)',
          }}
        />

        <div className="p-8">
          {/* Camera Icon with glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="relative w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(139, 92, 246, 0.2))',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)',
            }}
          >
            <Camera width={32} height={32} style={{ color: '#A78BFA' }} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl font-bold text-center mb-3"
            style={{ color: '#F1F5F9' }}
          >
            Screenshot Policy
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-center mb-6"
            style={{ color: '#94A3B8', lineHeight: '1.6' }}
          >
            talyvn periodically captures screenshots (every 5–30 mins) to track productivity. Screenshots are securely stored and only visible to authorized managers.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAccept}
            className="w-full py-4 rounded-2xl text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(167, 139, 250, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            Accept
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
