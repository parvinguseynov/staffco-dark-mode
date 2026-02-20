import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to get nested object value
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper function to set nested object value
const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  const newObj = JSON.parse(JSON.stringify(obj)); // Deep clone
  let current = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
  return newObj;
};

// Individual Color Picker Component
const ColorPicker = ({ label, value, onChange, isDarkMode }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px',
      background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      borderRadius: '8px',
    }}>
      <span style={{
        fontSize: '13px',
        color: isDarkMode ? '#CBD5E1' : '#475569',
        flex: 1,
      }}>
        {label}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Color preview */}
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          backgroundColor: value,
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
        }} />

        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '80px',
            padding: '4px 8px',
            borderRadius: '6px',
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            color: isDarkMode ? '#CBD5E1' : '#475569',
            fontSize: '12px',
            fontFamily: 'monospace',
          }}
        />

        {/* Native color picker */}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '28px',
            height: '28px',
            padding: 0,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            background: 'transparent',
          }}
        />
      </div>
    </div>
  );
};

const DesignSystemPanel = ({ colors, setColors, isDarkMode, setIsDarkMode, onReset, onResetDemo }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [copiedText, setCopiedText] = useState(null);

  const colorGroups = [
    {
      title: 'Backgrounds',
      colors: [
        { key: 'base', label: 'Base Background', path: 'app.windowBg' },
        { key: 'card', label: 'Card Background', path: 'app.cardBg' },
        { key: 'elevated', label: 'Elevated/Hover', path: 'app.elevatedBg' },
        { key: 'border', label: 'Borders', path: 'app.border' },
      ]
    },
    {
      title: 'Text',
      colors: [
        { key: 'textPrimary', label: 'Primary Text', path: 'app.textPrimary' },
        { key: 'textSecondary', label: 'Secondary Text', path: 'app.textSecondary' },
        { key: 'textMuted', label: 'Muted Text', path: 'app.textMuted' },
      ]
    },
    {
      title: 'Accent Colors',
      colors: [
        { key: 'accentBlue', label: 'Primary (Blue)', path: 'app.accentBlue' },
        { key: 'accentGreen', label: 'Success (Green)', path: 'app.accentGreen' },
        { key: 'accentRed', label: 'Danger (Red)', path: 'app.accentRed' },
        { key: 'accentOrange', label: 'Warning (Orange)', path: 'app.accentOrange' },
        { key: 'accentPurple', label: 'Purple', path: 'app.accentPurple' },
        { key: 'accentActiveTask', label: 'Active Task', path: 'app.accentActiveTask' },
      ]
    }
  ];

  const handleColorChange = (path, newColor) => {
    const newColors = setNestedValue(colors, path, newColor);
    setColors(newColors);
  };

  const exportThemeJSON = () => {
    const json = JSON.stringify(colors, null, 2);
    navigator.clipboard.writeText(json);
    setCopiedText('JSON');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const exportCSSVariables = () => {
    const css = `
:root {
  --color-bg-base: ${colors.app.windowBg};
  --color-bg-card: ${colors.app.cardBg};
  --color-bg-elevated: ${colors.app.elevatedBg};
  --color-border: ${colors.app.border};
  --color-text-primary: ${colors.app.textPrimary};
  --color-text-secondary: ${colors.app.textSecondary};
  --color-text-muted: ${colors.app.textMuted};
  --color-accent-blue: ${colors.app.accentBlue};
  --color-accent-green: ${colors.app.accentGreen};
  --color-accent-red: ${colors.app.accentRed};
  --color-accent-orange: ${colors.app.accentOrange};
  --color-accent-purple: ${colors.app.accentPurple};
  --color-accent-active-task: ${colors.app.accentActiveTask};
}`;
    navigator.clipboard.writeText(css);
    setCopiedText('CSS');
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <>
      {/* Toggle Button (when panel is closed) */}
      {!isPanelOpen && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsPanelOpen(true)}
          style={{
            position: 'fixed',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            zIndex: 100,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          🎨
        </motion.button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              right: 0,
              top: '28px', // Below menu bar
              bottom: 0,
              width: '320px',
              background: isDarkMode
                ? 'rgba(15, 23, 42, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              zIndex: 50,
              overflowY: 'auto',
              padding: '20px',
            }}
          >
            {/* Panel Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '700',
                  color: isDarkMode ? '#F1F5F9' : '#1E293B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  🎨 Design System
                </h2>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '12px',
                  color: isDarkMode ? '#64748B' : '#94A3B8',
                }}>
                  Customize colors in real-time
                </p>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: isDarkMode ? '#94A3B8' : '#64748B',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Theme Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              borderRadius: '12px',
              marginBottom: '24px',
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: isDarkMode ? '#F1F5F9' : '#1E293B',
              }}>
                Theme Mode
              </span>
              <div style={{
                display: 'flex',
                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                borderRadius: '8px',
                padding: '2px',
              }}>
                <button
                  onClick={() => setIsDarkMode(false)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: !isDarkMode ? '#3B82F6' : 'transparent',
                    color: !isDarkMode ? 'white' : (isDarkMode ? '#94A3B8' : '#64748B'),
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => setIsDarkMode(true)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: isDarkMode ? '#3B82F6' : 'transparent',
                    color: isDarkMode ? 'white' : '#64748B',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  🌙 Dark
                </button>
              </div>
            </div>

            {/* Color Groups */}
            {colorGroups.map((group, groupIndex) => (
              <div key={groupIndex} style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: isDarkMode ? '#64748B' : '#94A3B8',
                  marginBottom: '12px',
                }}>
                  {group.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.colors.map((colorItem, colorIndex) => (
                    <ColorPicker
                      key={colorIndex}
                      label={colorItem.label}
                      value={getNestedValue(colors, colorItem.path)}
                      onChange={(newColor) => handleColorChange(colorItem.path, newColor)}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            }}>
              <button
                onClick={onReset}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  background: 'transparent',
                  color: isDarkMode ? '#94A3B8' : '#64748B',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                ↺ Reset to Defaults
              </button>

              <button
                onClick={exportThemeJSON}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                  color: '#60A5FA',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                {copiedText === 'JSON' ? '✓ Copied!' : '📋 Export Theme JSON'}
              </button>

              <button
                onClick={exportCSSVariables}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isDarkMode ? 'rgba(52, 211, 153, 0.2)' : 'rgba(16, 185, 129, 0.1)',
                  color: '#34D399',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                {copiedText === 'CSS' ? '✓ Copied!' : '📝 Copy CSS Variables'}
              </button>
            </div>

            {/* Reset Demo Section */}
            <div style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            }}>
              <button
                onClick={onResetDemo}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                }}
              >
                🔄 Reset Demo
              </button>

              <p style={{
                margin: '12px 0 0 0',
                fontSize: '11px',
                color: isDarkMode ? '#64748B' : '#94A3B8',
                textAlign: 'center',
              }}>
                Resets timer, favorites, colors, and navigation
              </p>
            </div>

            {/* Footer */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <p style={{
                margin: 0,
                fontSize: '11px',
                color: isDarkMode ? '#64748B' : '#94A3B8',
              }}>
                Changes are applied in real-time.<br/>
                Export your theme when ready.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DesignSystemPanel;
