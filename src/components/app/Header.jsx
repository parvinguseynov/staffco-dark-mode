import { useContext, useState } from 'react';
import { ChatBubble, Settings } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserDropdownMenu } from './UserDropdownMenu';
import { Tooltip } from '../ui/Tooltip';

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
        <Tooltip text="Messages" position="bottom">
          <button
            className="p-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer"
          >
            <ChatBubble width={20} height={20} style={{ color: theme.app.accentBlue }} />
          </button>
        </Tooltip>
        <Tooltip text="Settings" position="bottom">
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer"
          >
            <Settings width={20} height={20} style={{ color: theme.app.textSecondary }} />
          </button>
        </Tooltip>
        <div className="relative">
          <Tooltip text="Account" position="bottom">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer"
              style={{
                background: theme.app.elevatedBg,
                color: theme.app.textPrimary,
              }}
            >
              PH
            </button>
          </Tooltip>
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
