import { useState, useContext } from 'react';
import { Folder, Compass, MessageCircle, Mail, Calendar, FileText, Trash2 } from 'lucide-react';
import { DockIcon } from './DockIcon';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

const dockApps = [
  { id: 'finder', icon: Folder, gradient: 'linear-gradient(180deg, #5AC8FA 0%, #007AFF 100%)', label: 'Finder' },
  { id: 'safari', icon: Compass, gradient: 'linear-gradient(180deg, #00C6FF 0%, #0072FF 100%)', label: 'Safari' },
  { id: 'messages', icon: MessageCircle, gradient: 'linear-gradient(180deg, #34C759 0%, #30D158 100%)', label: 'Messages' },
  { id: 'mail', icon: Mail, gradient: 'linear-gradient(180deg, #007AFF 0%, #0040DD 100%)', label: 'Mail' },
  { id: 'calendar', icon: Calendar, gradient: 'linear-gradient(180deg, #FF3B30 0%, #FF453A 100%)', label: 'Calendar' },
  { id: 'notes', icon: FileText, gradient: 'linear-gradient(180deg, #FFD60A 0%, #FFC900 100%)', label: 'Notes' },
  { id: 'divider1', type: 'divider' },
  { id: 'staffco', type: 'staffco', label: 'StaffCo', isActive: false },
  { id: 'divider2', type: 'divider' },
  { id: 'trash', icon: Trash2, gradient: 'linear-gradient(180deg, #8E8E93 0%, #636366 100%)', label: 'Trash' },
];

export function Dock({ onStaffCoClick }) {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.15;
    return 1;
  };

  const handleIconClick = (app) => {
    if (app.type === 'staffco') {
      onStaffCoClick();
    }
  };

  return (
    <div
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40 flex items-end gap-2 px-2 py-1 rounded-2xl"
      style={{
        background: theme.desktop.dock,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.desktop.dockBorder}`,
      }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {dockApps.map((app, index) => {
        if (app.type === 'divider') {
          return (
            <div
              key={app.id}
              className="w-px self-stretch mx-1"
              style={{
                background: 'rgba(255,255,255,0.2)',
                height: '50%',
              }}
            />
          );
        }

        if (app.type === 'staffco') {
          return (
            <DockIcon
              key={app.id}
              label={app.label}
              isActive={app.isActive}
              onHover={() => setHoveredIndex(index)}
              onClick={() => handleIconClick(app)}
              scale={getScale(index)}
            >
              <div
                className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold shadow-lg cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)',
                }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M5 3h6v6H5V3z" fill="white" opacity="0.9" />
                  <path d="M13 3h6v6h-6V3z" fill="white" opacity="0.7" />
                  <path d="M5 13h6v6H5v-6z" fill="white" opacity="0.5" />
                  <path d="M13 13h6v6h-6v-6z" fill="white" opacity="0.6" />
                </svg>
              </div>
            </DockIcon>
          );
        }

        const Icon = app.icon;
        return (
          <DockIcon
            key={app.id}
            label={app.label}
            isActive={app.isActive}
            onHover={() => setHoveredIndex(index)}
            scale={getScale(index)}
          >
            <div
              className="w-full h-full rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
              style={{ background: app.gradient }}
            >
              <Icon size={24} strokeWidth={2} />
            </div>
          </DockIcon>
        );
      })}
    </div>
  );
}
