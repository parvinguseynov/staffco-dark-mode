import { useState, useRef, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function TwoFactorScreen({
  onVerify,
  onBack,
  onBackupCode,
  error = null,  // 'invalid' | 'expired' | null
  isSuccess = false,
}) {
  const { theme } = useContext(ThemeContext);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupCode, setBackupCode] = useState('');
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace - move to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setCode(newCode.slice(0, 6));
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onVerify(fullCode);
    }
  };

  const handleBackupVerify = () => {
    if (backupCode.trim()) {
      onBackupCode(backupCode.trim());
      setShowBackupModal(false);
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: theme?.app?.windowBg || '#FFFFFF',
      }}
    >
      {/* Back button */}
      <div style={{ padding: '16px 20px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: theme?.app?.textSecondary || '#64748B',
          }}
        >
          <ArrowLeft width={16} height={16} />
          Back
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 32px', display: 'flex', flexDirection: 'column' }}>
        {/* Shield Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <Shield width={24} height={24} style={{ color: '#3B82F6' }} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: theme?.app?.textPrimary || '#1E293B',
            marginBottom: '8px',
          }}
        >
          Two-Factor Authentication
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: theme?.app?.textSecondary || '#64748B',
            marginBottom: '32px',
            lineHeight: 1.5,
          }}
        >
          Enter the 6-digit code from your authenticator app.
          <br />
          Codes refresh every 30 seconds.
        </p>

        {/* Code Inputs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
          }}
          onPaste={handlePaste}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              style={{
                width: '48px',
                height: '56px',
                borderRadius: '12px',
                border: `2px solid ${
                  error ? '#EF4444' :
                  isSuccess ? '#10B981' :
                  digit ? '#3B82F6' :
                  theme?.app?.border || '#E2E8F0'
                }`,
                background: theme?.app?.cardBg || '#F8FAFC',
                fontSize: '20px',
                fontWeight: 600,
                textAlign: 'center',
                color: theme?.app?.textPrimary || '#1E293B',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>

        {/* Error Message */}
        {error === 'invalid' && (
          <p style={{ fontSize: '13px', color: '#EF4444', marginBottom: '16px' }}>
            The code you entered is not valid. Please try again.
          </p>
        )}
        {error === 'expired' && (
          <p style={{ fontSize: '13px', color: '#EF4444', marginBottom: '16px' }}>
            Your code has expired. Enter a new code.
          </p>
        )}

        {/* Verify Button */}
        <motion.button
          whileHover={{ scale: isCodeComplete ? 1.02 : 1 }}
          whileTap={{ scale: isCodeComplete ? 0.98 : 1 }}
          onClick={handleVerify}
          disabled={!isCodeComplete}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: isCodeComplete
              ? 'linear-gradient(135deg, #60A5FA, #3B82F6)'
              : '#E2E8F0',
            color: isCodeComplete ? 'white' : '#94A3B8',
            fontSize: '14px',
            fontWeight: 600,
            cursor: isCodeComplete ? 'pointer' : 'not-allowed',
            marginBottom: '24px',
          }}
        >
          Verify
        </motion.button>

        {/* Didn't get a code / Backup code link */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setShowBackupModal(true)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: theme?.app?.textSecondary || '#64748B',
              cursor: 'pointer',
            }}
          >
            Can't access your authenticator app?
            <br />
            <span style={{ color: theme?.app?.textPrimary || '#1E293B', fontWeight: 600 }}>
              Use a backup code
            </span>
          </button>
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#3B82F6',
              cursor: 'pointer',
            }}
          >
            Didn't get a code?
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderTop: `1px solid ${theme?.app?.border || '#E2E8F0'}`,
        }}
      >
        <span style={{ fontSize: '12px', color: theme?.app?.textMuted || '#94A3B8' }}>
          v1.0.3
        </span>
        <button
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            color: '#3B82F6',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Open Dashboard ↗
        </button>
      </div>

      {/* Backup Code Modal */}
      {showBackupModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              width: '100%',
              maxWidth: '320px',
              background: theme?.app?.cardBg || 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Header with close button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: theme?.app?.textPrimary || '#1E293B', marginBottom: '4px' }}>
                  Enter a backup code
                </h3>
                <p style={{ fontSize: '12px', color: theme?.app?.textSecondary || '#64748B' }}>
                  Use one of your saved backup codes. Each code can only be used once.
                </p>
              </div>
              <button
                onClick={() => setShowBackupModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: theme?.app?.textMuted || '#64748B',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            {/* Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: theme?.app?.textPrimary || '#1E293B', display: 'block', marginBottom: '6px' }}>
                One time code
              </label>
              <input
                type="text"
                placeholder="Enter one-time backup code"
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme?.app?.border || '#E2E8F0'}`,
                  background: theme?.app?.cardBg || 'white',
                  color: theme?.app?.textPrimary || '#1E293B',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Verify button */}
            <button
              onClick={handleBackupVerify}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '12px',
              }}
            >
              Verify
            </button>

            <p style={{ fontSize: '12px', color: theme?.app?.textSecondary || '#64748B', textAlign: 'center' }}>
              Having trouble? <span style={{ color: theme?.app?.textPrimary || '#1E293B', fontWeight: 600, cursor: 'pointer' }}>Contact support</span>
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
