export function StaffCoLogo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  };

  const { icon: iconSize, text: textSize } = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Logo Icon */}
      <div
        className="rounded-lg flex items-center justify-center shadow-sm"
        style={{
          width: iconSize,
          height: iconSize,
          background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
        }}
      >
        <svg
          width={iconSize * 0.6}
          height={iconSize * 0.6}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 3H4C3.44772 3 3 3.44772 3 4V9C3 9.55228 3.44772 10 4 10H9C9.55228 10 10 9.55228 10 9V4C10 3.44772 9.55228 3 9 3Z"
            fill="white"
            fillOpacity="0.9"
          />
          <path
            d="M20 3H15C14.4477 3 14 3.44772 14 4V9C14 9.55228 14.4477 10 15 10H20C20.5523 10 21 9.55228 21 9V4C21 3.44772 20.5523 3 20 3Z"
            fill="white"
            fillOpacity="0.7"
          />
          <path
            d="M9 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20V15C10 14.4477 9.55228 14 9 14Z"
            fill="white"
            fillOpacity="0.5"
          />
          <path
            d="M20 14H15C14.4477 14 14 14.4477 14 15V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20V15C21 14.4477 20.5523 14 20 14Z"
            fill="white"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`font-semibold text-gray-700 dark:text-gray-300 ${textSize}`}>
          StaffCo
        </span>
      )}
    </div>
  );
}
