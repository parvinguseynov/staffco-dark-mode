import { useContext, useState } from 'react';
import { MessageCircle, Settings } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { UserDropdownMenu } from './UserDropdownMenu';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="StaffCo"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          objectFit: 'contain',
        }}
      />
      <span className="font-semibold">StaffCo</span>
    </div>
  );
}

export function Header({ onSettingsClick, onUserAvatarClick, showBackButton, onBackClick, onLogout, backButtonText = 'Back' }) {
  const { theme } = useContext(ThemeContext);
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
