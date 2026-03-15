import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

export function LoginScreen({ onLogin, onRegister, onForgotPassword }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: theme?.app?.windowBg || '#0F172A',
        overflow: 'hidden',
      }}
    >
      {/* Scrollable content area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo - just the wordmark image, no separate text */}
        <img
          src="/talyvn-wordmark-dark.png"
          alt="talyvn"
          style={{
            height: '36px',
            width: 'auto',
            objectFit: 'contain',
            alignSelf: 'flex-start',
            marginBottom: '32px',
          }}
        />
        {/* Title */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 700,
            color: theme?.app?.textPrimary || '#F1F5F9',
            marginBottom: '8px',
          }}
        >
          Welcome to talyvn
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: theme?.app?.textSecondary || '#94A3B8',
            marginBottom: '28px',
          }}
        >
          Enter your email and password to continue.
        </p>

        {/* Email Field */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: theme?.app?.textPrimary || '#F1F5F9',
              marginBottom: '8px',
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: `1px solid ${theme?.app?.border || '#334155'}`,
              background: theme?.app?.cardBg || '#1E293B',
              fontSize: '14px',
              color: theme?.app?.textPrimary || '#F1F5F9',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: theme?.app?.textPrimary || '#F1F5F9',
              marginBottom: '8px',
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: `1px solid ${theme?.app?.border || '#334155'}`,
              background: theme?.app?.cardBg || '#1E293B',
              fontSize: '14px',
              color: theme?.app?.textPrimary || '#F1F5F9',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Remember me + Forgot Password */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '18px',
                height: '18px',
                accentColor: '#3B82F6',
              }}
            />
            <span style={{ fontSize: '13px', color: theme?.app?.textSecondary || '#94A3B8' }}>
              Remember me
            </span>
          </label>
          <button
            onClick={onForgotPassword}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '13px',
              color: '#60A5FA',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogin}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Sign in
        </motion.button>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: theme?.app?.border || '#334155' }} />
          <span style={{ fontSize: '13px', color: theme?.app?.textMuted || '#64748B' }}>
            Or login with
          </span>
          <div style={{ flex: 1, height: '1px', background: theme?.app?.border || '#334155' }} />
        </div>

        {/* Social Login Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          {/* Google */}
          <button
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '12px',
              border: `1px solid ${theme?.app?.border || '#334155'}`,
              background: theme?.app?.cardBg || '#1E293B',
              fontSize: '14px',
              fontWeight: 500,
              color: theme?.app?.textPrimary || '#F1F5F9',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          {/* GitHub */}
          <button
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '12px',
              border: `1px solid ${theme?.app?.border || '#334155'}`,
              background: theme?.app?.cardBg || '#1E293B',
              fontSize: '14px',
              fontWeight: 500,
              color: theme?.app?.textPrimary || '#F1F5F9',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#F1F5F9">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Github
          </button>
        </div>

        {/* Register Link */}
        <div
          style={{
            padding: '14px',
            borderRadius: '12px',
            border: `1px solid ${theme?.app?.border || '#334155'}`,
            textAlign: 'center',
            background: theme?.app?.cardBg || '#1E293B',
          }}
        >
          <span style={{ fontSize: '14px', color: theme?.app?.textSecondary || '#94A3B8' }}>
            Don't have an account?{' '}
          </span>
          <button
            onClick={onRegister}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#60A5FA',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Register
          </button>
        </div>
      </div>

      {/* Footer - fixed at bottom */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 20px',
          borderTop: `1px solid ${theme?.app?.border || '#334155'}`,
          background: theme?.app?.windowBg || '#0F172A',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '12px', color: theme?.app?.textMuted || '#64748B' }}>
          v1.0.3
        </span>
        <button
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            color: '#60A5FA',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Open Dashboard ↗
        </button>
      </div>
    </div>
  );
}
