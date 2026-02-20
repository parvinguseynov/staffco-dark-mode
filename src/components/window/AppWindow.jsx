import { useContext } from 'react';
import { motion } from 'framer-motion';
import { TrafficLights } from './TrafficLights';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function AppWindow({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 pt-7 pb-20">
      <motion.div
        className="flex flex-col overflow-hidden app-window"
        style={{
          width: '420px',
          height: '680px',
          background: theme.app.windowBg,
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center h-10 relative flex-shrink-0"
          style={{
            background: theme.app.cardBg,
            borderBottom: `1px solid ${theme.app.border}`,
            borderRadius: '12px 12px 0 0',
          }}
        >
          <TrafficLights />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 text-xs font-medium"
            style={{ color: theme.app.textSecondary }}
          >
            StaffCo
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto app-content">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
