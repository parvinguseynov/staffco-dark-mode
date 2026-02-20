import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export function StaffCoLogo({ size = 'md', showText = false }) {
  const { isDarkMode } = useContext(ThemeContext);

  const sizes = {
    sm: { icon: 24 },
    md: { icon: 32 },
    lg: { icon: 48 },
  };

  const { icon: iconSize } = sizes[size];

  return (
    <div className="flex items-center">
      <img
        src={isDarkMode ? "/white_logo.png" : "/logo.png"}
        alt="StaffCo"
        style={{
          height: iconSize,
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
