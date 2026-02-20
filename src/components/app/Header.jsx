import { useContext, useState } from 'react';
import { MessageCircle, Settings } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserDropdownMenu } from './UserDropdownMenu';

export function Header({ onSettingsClick, onUserAvatarClick, showBackButton, onBackClick, onLogout, backButtonText = 'Back' }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
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
          ← {backButtonText}
        </button>
      ) : (
        <div className="flex items-center">
          <img
            src={isDarkMode ? "/white_logo.png" : "/logo.png"}
            alt="StaffCo"
            style={{
              height: '28px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
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
