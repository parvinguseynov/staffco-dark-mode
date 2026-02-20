import { Upload, MessageCircle, Settings } from 'lucide-react';
import { StaffCoLogo } from '../ui/StaffCoLogo';
import { Avatar } from '../ui/Avatar';
import { mockUser } from '../../data/mockData';

export function StaffCoHeader({ onSettingsClick, onBack, showBackButton = false }) {
  return (
    <header className="h-20 px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Left side - Logo */}
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBack}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            ← Back
          </button>
        )}
        <StaffCoLogo size="md" showText={true} />
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-teal-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Upload size={20} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MessageCircle size={20} />
        </button>
        <button
          onClick={onSettingsClick}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Settings size={20} />
        </button>
        <Avatar
          initials={mockUser.initials}
          color="#E5E7EB"
          size="md"
          className="!text-gray-700 dark:!text-gray-300 !bg-gray-200 dark:!bg-gray-700"
        />
      </div>
    </header>
  );
}
