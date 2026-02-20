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
              <img
                src="/logo.png"
                alt="StaffCo"
                className="w-full h-full rounded-xl shadow-lg cursor-pointer"
                style={{
                  objectFit: 'contain',
                }}
              />
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
