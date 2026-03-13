import { useState, useContext } from 'react';
import { OpenNewWindow } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';
import { TalyvnLogo } from '../brand/TalyvnLogo';

export function LoginScreen({ onLogin }) {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col h-full" style={{ background: theme.app.windowBg }}>
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Logo */}
        <div className="mb-8">
          <TalyvnLogo
            size="lg"
            showWordmark={true}
            style={{ color: theme.app.textPrimary }}
          />
        </div>

        {/* Email field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-sm mb-3 px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
            color: theme.app.textPrimary,
          }}
        />

        {/* Password field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-sm mb-4 px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
            color: theme.app.textPrimary,
          }}
        />

        {/* Forgot password */}
        <button
          className="text-sm mb-6 hover:underline transition-all"
          style={{ color: theme.app.accentBlue }}
        >
          Forgot password?
        </button>

        {/* Sign in button */}
        <button
          onClick={onLogin}
          className="w-full max-w-sm py-3 rounded-xl text-sm font-medium mb-4 transition-all hover:opacity-90"
          style={{ background: theme.app.accentBlue, color: 'white' }}
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-sm mb-4">
          <div className="flex-1 h-px" style={{ background: theme.app.border }} />
          <span className="text-xs" style={{ color: theme.app.textMuted }}>or</span>
          <div className="flex-1 h-px" style={{ background: theme.app.border }} />
        </div>

        {/* Google Sign In */}
        <button
          onClick={onLogin}
          className="w-full max-w-sm py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{
            background: theme.app.cardBg,
            color: theme.app.textPrimary,
            border: `1px solid ${theme.app.border}`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M18 10.2c0-.6-.1-1.2-.2-1.8H10v3.4h4.5c-.2 1-.8 1.9-1.7 2.4v2.2h2.7c1.6-1.5 2.5-3.7 2.5-6.2z" fill="#4285F4"/>
            <path d="M10 18c2.3 0 4.2-.8 5.6-2.1l-2.7-2.2c-.8.5-1.7.8-2.9.8-2.2 0-4.1-1.5-4.8-3.5H2.4v2.3C3.8 16 6.7 18 10 18z" fill="#34A853"/>
            <path d="M5.2 11c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V5.3H2.4C1.5 6.9 1 8.4 1 10s.5 3.1 1.4 4.7l2.8-2.3z" fill="#FBBC05"/>
            <path d="M10 4.2c1.2 0 2.3.4 3.2 1.2l2.4-2.4C14.2 1.6 12.3.8 10 .8 6.7.8 3.8 2.8 2.4 5.5l2.8 2.3C5.9 5.7 7.8 4.2 10 4.2z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-4 border-t"
        style={{ borderColor: theme.app.border }}
      >
        <span className="text-xs" style={{ color: theme.app.textMuted }}>
          v2.1.0.3
        </span>
        <button
          className="text-xs flex items-center gap-1 transition-all hover:opacity-80"
          style={{ color: theme.app.accentBlue }}
        >
          Open Dashboard
          <OpenNewWindow width={12} height={12} />
        </button>
      </div>
    </div>
  );
}
