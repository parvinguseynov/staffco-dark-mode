export function WindowFrame({ children, title = 'StaffCo' }) {
  return (
    <div className="h-full flex flex-col bg-light-base dark:bg-dark-base">
      {/* macOS Title Bar */}
      <div className="h-10 flex items-center justify-between px-4 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Window Title */}
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
          {title}
        </div>

        {/* Spacer for symmetry */}
        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
