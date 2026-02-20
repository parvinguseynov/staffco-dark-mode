import { useState, useEffect, useContext } from 'react';
import { Apple, Battery, Wifi, Search } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';

export function MenuBar() {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return `${day} ${month} ${dateNum} ${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const textColor = isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)';

  return (
    <div
      className="fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-4 z-50"
      style={{
        background: theme.desktop.menuBar,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.desktop.menuBarBorder}`,
        color: textColor,
      }}
    >
      {/* Left side */}
      <div className="flex items-center gap-4 text-menu font-sans">
        <Apple size={14} className="opacity-90" />
        <span className="font-semibold">StaffCo</span>
        <span className="opacity-80">File</span>
        <span className="opacity-80">Edit</span>
        <span className="opacity-80">View</span>
        <span className="opacity-80">Window</span>
        <span className="opacity-80">Help</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 text-menu">
        <Battery size={16} className="opacity-80" />
        <Wifi size={16} className="opacity-80" />
        <Search size={14} className="opacity-80" />
        <span className="opacity-90">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
}
