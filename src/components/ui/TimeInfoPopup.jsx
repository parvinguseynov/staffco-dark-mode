import { useState, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { InfoCircle } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function TimeInfoPopup({ task }) {
  const { theme } = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const timeData = {
    today: '2h 15m',
    thisWeek: '12h 30m',
    thisMonth: '45h 20m',
  };

  // Calculate position when showing
  useEffect(() => {
    if (show && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left - 140 + rect.width / 2, // Center the popup
      });
    }
  }, [show]);

  const tooltipContent = show ? (
    <div
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        width: '176px',
        padding: '12px',
        borderRadius: '12px',
        background: theme?.app?.cardBg || '#1E293B',
        border: `1px solid ${theme?.app?.border || '#334155'}`,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        zIndex: 999999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: theme?.app?.textMuted || '#64748B',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        TIME TRACKED
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: theme?.app?.textSecondary || '#94A3B8' }}>Today</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: theme?.app?.textPrimary || '#F1F5F9' }}>
            {timeData.today}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: theme?.app?.textSecondary || '#94A3B8' }}>This Week</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: theme?.app?.textPrimary || '#F1F5F9' }}>
            {timeData.thisWeek}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: theme?.app?.textSecondary || '#94A3B8' }}>This Month</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: theme?.app?.textPrimary || '#F1F5F9' }}>
            {timeData.thisMonth}
          </span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          padding: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InfoCircle
          width={16}
          height={16}
          style={{ color: theme?.app?.textMuted || '#64748B' }}
        />
      </button>

      {/* Render tooltip via Portal - outside normal DOM hierarchy */}
      {typeof document !== 'undefined' && createPortal(
        tooltipContent,
        document.body
      )}
    </>
  );
}
