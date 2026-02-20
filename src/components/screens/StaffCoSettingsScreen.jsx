import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { Toggle } from '../ui/Toggle';
import { useTheme } from '../../hooks/useTheme';

export function StaffCoSettingsScreen({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const [launchAtStart, setLaunchAtStart] = useState(true);
  const [alwaysOnTimer, setAlwaysOnTimer] = useState(true);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Back Button */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure how the app works for you
            </p>
          </div>

          {/* Settings Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Group Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="text-yellow-500">
                  <SettingsIcon size={20} />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  Main
                </h2>
              </div>
            </div>

            {/* Settings Items */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Launch at Start */}
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Launch at Start
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically start the app when your computer starts.
                  </p>
                </div>
                <Toggle
                  enabled={launchAtStart}
                  onChange={setLaunchAtStart}
                  label="Launch at Start"
                />
              </div>

              {/* Always-On Timer */}
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Always-On Timer
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A small floating timer that stays visible while you work, so you can track time without opening the app.
                  </p>
                </div>
                <Toggle
                  enabled={alwaysOnTimer}
                  onChange={setAlwaysOnTimer}
                  label="Always-On Timer"
                />
              </div>

              {/* Dark Mode */}
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use dark theme across the app
                  </p>
                </div>
                <Toggle
                  enabled={isDark}
                  onChange={toggleTheme}
                  label="Dark Mode"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm text-gray-500">v1.0.3</span>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Open Dashboard →
        </a>
      </div>
    </div>
  );
}
