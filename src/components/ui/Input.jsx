import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function Input({ label, type = 'text', placeholder, value, onChange, icon }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: theme.app.textPrimary }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
            color: theme.app.textPrimary,
          }}
        />
        {icon && (
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            style={{ color: theme.app.textMuted }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
