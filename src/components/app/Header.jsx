import { useContext, useState } from 'react';
import { MessageCircle, Settings } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { UserDropdownMenu } from './UserDropdownMenu';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
        style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)' }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M5 3h6v6H5V3z" fill="white" opacity="0.9" />
          <path d="M13 3h6v6h-6V3z" fill="white" opacity="0.7" />
          <path d="M5 13h6v6H5v-6z" fill="white" opacity="0.5" />
          <path d="M13 13h6v6h-6v-6z" fill="white" opacity="0.6" />
        </svg>
      </div>
      <span className="font-semibold">StaffCo</span>
    </div>
  );
}

export function Header({ onSettingsClick, onUserAvatarClick, showBackButton, onBackClick, onLogout }) {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{
        borderBottom: `1px solid ${theme.app.border}`,
        color: theme.app.textPrimary,
      }}
    >
      {showBackButton ? (
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity cursor-pointer"
          style={{ color: theme.app.textSecondary }}
        >
          ← Back
        </button>
      ) : (
        <Logo />
      )}

      <div className="flex items-center gap-3 relative">
        <button
          className="p-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer"
          title="Messages"
        >
          <MessageCircle size={20} style={{ color: theme.app.accentBlue }} />
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer"
          title="Settings"
        >
          <Settings size={20} style={{ color: theme.app.textSecondary }} />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer"
            style={{
              background: theme.app.elevatedBg,
              color: theme.app.textPrimary,
            }}
            title="User Menu"
          >
            PH
          </button>
          <UserDropdownMenu
            isOpen={showUserMenu}
            onClose={() => setShowUserMenu(false)}
            onSettingsClick={() => {
              setShowUserMenu(false);
              onSettingsClick();
            }}
            onCompanyClick={() => {
              setShowUserMenu(false);
              onUserAvatarClick();
            }}
            onLogoutClick={() => {
              setShowUserMenu(false);
              onLogout();
            }}
          />
        </div>
      </div>
    </div>
  );
}
