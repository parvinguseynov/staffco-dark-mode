import { useState, useContext } from 'react';
import { Settings as SettingsIcon, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { Toggle } from '../ui/Toggle';

export function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [launchAtStartup, setLaunchAtStartup] = useState(true);
  const [alwaysOnTimer, setAlwaysOnTimer] = useState(true);

  return (
    <div className="flex flex-col h-full p-5" style={{ background: theme.app.windowBg }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: theme.app.textPrimary }}>
          Settings
        </h1>
        <p className="text-sm" style={{ color: theme.app.textSecondary }}>
          Configure how the app works for you
        </p>
      </div>

      {/* Main Settings */}
      <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${theme.app.border}` }}>
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ background: theme.app.cardBg, borderBottom: `1px solid ${theme.app.border}` }}
        >
          <SettingsIcon size={16} style={{ color: theme.app.accentOrange }} />
          <span className="text-sm font-semibold" style={{ color: theme.app.textPrimary }}>Main</span>
        </div>

        <div className="divide-y" style={{ background: theme.app.cardBg, borderColor: theme.app.border }}>
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium mb-1" style={{ color: theme.app.textPrimary }}>
                Launch at Startup
              </div>
              <div className="text-xs" style={{ color: theme.app.textSecondary }}>
                Auto start when computer...
              </div>
            </div>
            <Toggle enabled={launchAtStartup} onChange={setLaunchAtStartup} />
          </div>

          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium mb-1" style={{ color: theme.app.textPrimary }}>
                Always-On Timer
              </div>
              <div className="text-xs" style={{ color: theme.app.textSecondary }}>
                Small floating timer...
              </div>
            </div>
            <Toggle enabled={alwaysOnTimer} onChange={setAlwaysOnTimer} />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${theme.app.border}`, background: theme.app.cardBg }}>
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>Appearance</div>
            <div className="text-xs mt-1" style={{ color: theme.app.textSecondary }}>Choose theme</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => !isDarkMode || toggleTheme()}
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: !isDarkMode ? theme.app.elevatedBg : 'transparent' }}
            >
              <Sun size={18} style={{ color: theme.app.textPrimary }} />
            </button>
            <button
              onClick={() => isDarkMode || toggleTheme()}
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: isDarkMode ? theme.app.elevatedBg : 'transparent' }}
            >
              <Moon size={18} style={{ color: theme.app.textPrimary }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
