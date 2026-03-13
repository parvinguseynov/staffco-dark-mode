import { useState, useContext } from 'react';
import { InfoCircle } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function TimeInfoPopup({ task }) {
  const { theme } = useContext(ThemeContext);
  const [show, setShow] = useState(false);

  // Mock data - in real app, calculate from task history
  const timeData = {
    today: '2h 15m',
    thisWeek: '12h 30m',
    thisMonth: '45h 20m',
  };

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        position: 'relative',
        zIndex: show ? 9999 : 1,  // CRITICAL: Lift entire container when showing
      }}
    >
      <button
        style={{
          padding: '4px',
          borderRadius: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          opacity: 1,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        <InfoCircle width={16} height={16} style={{ color: theme.app.textMuted }} />
      </button>

      {show && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: '8px',
            width: '176px',
            padding: '12px',
            borderRadius: '12px',
            background: theme.app.cardBg || '#1E293B',
            border: `1px solid ${theme.app.border || '#334155'}`,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 99999,  // VERY HIGH z-index
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: theme.app.textMuted,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            TIME TRACKED
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: theme.app.textSecondary }}>Today</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: theme.app.textPrimary }}>
                {timeData.today}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: theme.app.textSecondary }}>This Week</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: theme.app.textPrimary }}>
                {timeData.thisWeek}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: theme.app.textSecondary }}>This Month</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: theme.app.textPrimary }}>
                {timeData.thisMonth}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
