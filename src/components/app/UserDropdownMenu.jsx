import { useContext, useEffect, useRef } from 'react';
import { Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function UserDropdownMenu({
  isOpen,
  onClose,
  onSettingsClick,
  onCompanyClick,
  onLogoutClick,
  userInitials = 'PH',
  userName = 'Parvin Huseynov',
  userEmail = 'pervin.guseynov@gmail.com',
  currentCompany = 'Thinking IT',
  currentCompanyInitials = 'TI',
}) {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full right-0 mt-2 w-72 rounded-xl overflow-hidden z-50"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
            boxShadow: `
              0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 10px 15px -3px rgba(0, 0, 0, 0.2),
              0 20px 25px -5px rgba(0, 0, 0, 0.15)
            `,
          }}
        >
          {/* User Profile Section */}
          <div className="p-4" style={{ borderBottom: `1px solid ${theme.app.border}` }}>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold"
                style={{
                  background: theme.app.elevatedBg,
                  color: theme.app.textPrimary,
                }}
              >
                {userInitials}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ color: theme.app.textPrimary }}>
                  {userName}
                </div>
                <div className="text-xs" style={{ color: theme.app.textMuted }}>
                  {userEmail}
                </div>
              </div>
            </div>
          </div>

          {/* Current Company Section */}
          <div className="p-4" style={{ borderBottom: `1px solid ${theme.app.border}` }}>
            <div className="text-xs mb-2" style={{ color: theme.app.textMuted }}>
              You're working in
            </div>
            <button
              onClick={onCompanyClick}
              className="w-full p-3 rounded-lg flex items-center gap-3 hover:opacity-80 transition-opacity"
              style={{ background: theme.app.elevatedBg }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold text-white"
                style={{ background: theme.app.accentBlue }}
              >
                {currentCompanyInitials}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                  {currentCompany}
                </div>
                <div className="text-xs" style={{ color: theme.app.textMuted }}>
                  Tap to switch company
                </div>
              </div>
              <ChevronRight size={16} style={{ color: theme.app.textMuted }} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={onSettingsClick}
              className="w-full px-4 py-3 flex items-center gap-3 hover:opacity-80 transition-opacity"
              style={{ background: 'transparent' }}
            >
              <Settings size={16} style={{ color: theme.app.textMuted }} />
              <span className="text-sm" style={{ color: theme.app.textPrimary }}>
                Account Settings
              </span>
            </button>

            <button
              className="w-full px-4 py-3 flex items-center gap-3 hover:opacity-80 transition-opacity"
              style={{ background: 'transparent' }}
            >
              <HelpCircle size={16} style={{ color: theme.app.textMuted }} />
              <span className="text-sm" style={{ color: theme.app.textPrimary }}>
                FAQ
              </span>
            </button>

            <button
              onClick={onLogoutClick}
              className="w-full px-4 py-3 flex items-center gap-3 hover:opacity-80 transition-opacity"
              style={{ background: 'transparent' }}
            >
              <LogOut size={16} style={{ color: theme.app.accentRed }} />
              <span className="text-sm font-medium" style={{ color: theme.app.accentRed }}>
                Log out
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
