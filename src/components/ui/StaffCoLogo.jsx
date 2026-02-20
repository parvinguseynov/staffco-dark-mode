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
      <img
        src="/logo.png"
        alt="StaffCo"
        className="rounded-lg shadow-sm"
        style={{
          width: iconSize,
          height: iconSize,
          objectFit: 'contain',
        }}
      />

      {/* Logo Text */}
      {showText && (
        <span className={`font-semibold text-gray-700 dark:text-gray-300 ${textSize}`}>
          StaffCo
        </span>
      )}
    </div>
  );
}
