import { Search, Settings, ListTodo, FolderKanban } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { ThemeToggle } from '../ui/ThemeToggle';
import { mockUser } from '../../data/mockData';

export function Header({ showSearch = true, onSettingsClick, onNavigate, currentScreen }) {
  return (
    <header className="h-16 px-6 flex items-center justify-between bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
      <div className="flex items-center gap-6 flex-1">
        {/* Navigation */}
        <nav className="flex gap-2">
          <button
            onClick={() => onNavigate && onNavigate('tasks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentScreen === 'tasks'
                ? 'bg-light-accent-blue dark:bg-dark-accent-blue text-white'
                : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-elevated dark:hover:bg-dark-elevated'
            }`}
          >
            <ListTodo size={18} />
            Tasks
          </button>
          <button
            onClick={() => onNavigate && onNavigate('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentScreen === 'projects'
                ? 'bg-light-accent-blue dark:bg-dark-accent-blue text-white'
                : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-elevated dark:hover:bg-dark-elevated'
            }`}
          >
            <FolderKanban size={18} />
            Projects
          </button>
        </nav>

        {/* Search */}
        {showSearch && (
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-muted dark:text-dark-text-muted"
              />
              <input
                type="text"
                placeholder="Search tasks, projects..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-light-elevated dark:bg-dark-elevated border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-2 focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue"
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSettingsClick}
          className="w-10 h-10 rounded-lg bg-light-elevated dark:bg-dark-elevated flex items-center justify-center text-light-text-primary dark:text-dark-text-primary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
        >
          <Settings size={20} />
        </button>
        <ThemeToggle />
        <Avatar
          initials={mockUser.initials}
          color={mockUser.color}
          size="md"
        />
      </div>
    </header>
  );
}
