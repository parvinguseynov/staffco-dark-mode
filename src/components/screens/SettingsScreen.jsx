import { useState, useContext } from 'react';
import { Settings as SettingsIcon, SunLight, HalfMoon } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';
import { Toggle } from '../ui/Toggle';

export function SettingsScreen() {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);
  const [launchAtStartup, setLaunchAtStartup] = useState(true);
  const [alwaysOnTimer, setAlwaysOnTimer] = useState(true);

  return (
    <div className="flex flex-col h-full" style={{ background: theme.app.windowBg }}>
      <div className="p-5 overflow-y-auto flex-1">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: theme.app.textPrimary }}>
            Settings
          </h1>
          <p className="text-sm" style={{ color: theme.app.textSecondary }}>
            Configure how the app works for you
          </p>
        </div>

        {/* Main Settings Card */}
        <div
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ borderBottom: `1px solid ${theme.app.border}` }}
          >
            <SettingsIcon width={16} height={16} style={{ color: theme.app.accentOrange }} />
            <span className="text-sm font-semibold" style={{ color: theme.app.textPrimary }}>
              Main
            </span>
          </div>

          {/* Settings rows */}
          <div>
            <div
              className="px-4 py-4 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${theme.app.border}` }}
            >
              <div>
                <div className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                  Launch at Startup
                </div>
                <div className="text-xs mt-0.5" style={{ color: theme.app.textSecondary }}>
                  Auto start when computer boots
                </div>
              </div>
              <Toggle enabled={launchAtStartup} onChange={setLaunchAtStartup} />
            </div>

            <div className="px-4 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                  Always-On Timer
                </div>
                <div className="text-xs mt-0.5" style={{ color: theme.app.textSecondary }}>
                  Small floating timer widget
                </div>
              </div>
              <Toggle enabled={alwaysOnTimer} onChange={setAlwaysOnTimer} />
            </div>
          </div>
        </div>

        {/* Appearance Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
          }}
        >
          <div className="px-4 py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                Appearance
              </div>
              <div className="text-xs mt-0.5" style={{ color: theme.app.textSecondary }}>
                Choose theme
              </div>
            </div>
            <div
              className="flex rounded-xl overflow-hidden"
              style={{
                background: theme.app.elevatedBg,
                border: `1px solid ${theme.app.border}`,
              }}
            >
              <button
                onClick={() => isDarkMode && toggleTheme()}
                className="w-10 h-10 flex items-center justify-center transition-all"
                style={{
                  background: !isDarkMode ? theme.app.accentBlue : 'transparent',
                }}
              >
                <SunLight
                  width={18}
                  height={18}
                  style={{ color: !isDarkMode ? 'white' : theme.app.textMuted }}
                />
              </button>
              <button
                onClick={() => !isDarkMode && toggleTheme()}
                className="w-10 h-10 flex items-center justify-center transition-all"
                style={{
                  background: isDarkMode ? theme.app.accentBlue : 'transparent',
                }}
              >
                <HalfMoon
                  width={18}
                  height={18}
                  style={{ color: isDarkMode ? 'white' : theme.app.textMuted }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
