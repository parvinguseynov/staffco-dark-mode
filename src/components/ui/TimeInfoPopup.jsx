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
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button className="p-1 rounded hover:opacity-70 transition-opacity">
        <InfoCircle
          width={16}
          height={16}
          style={{ color: theme.app.textMuted }}
        />
      </button>

      {show && (
        <div
          className="absolute right-0 top-full mt-2 w-44 rounded-xl p-3 z-50"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <div className="text-xs font-semibold mb-2" style={{ color: theme.app.textMuted }}>
            TIME TRACKED
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: theme.app.textSecondary }}>Today</span>
              <span className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                {timeData.today}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: theme.app.textSecondary }}>This Week</span>
              <span className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                {timeData.thisWeek}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: theme.app.textSecondary }}>This Month</span>
              <span className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                {timeData.thisMonth}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
