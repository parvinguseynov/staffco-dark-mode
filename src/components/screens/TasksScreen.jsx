import { useContext } from 'react';
import { Search, Plus, Star, Info, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { Button } from '../ui/Button';
import { AddTaskModal } from '../modals/AddTaskModal';

export function TasksScreen({
  activeTab,
  onTabChange,
  tasks,
  projects,
  activeTask,
  timerRunning,
  elapsedSeconds,
  formatTime,
  onStartTask,
  onStopTask,
  onToggleFavorite,
  onToggleProjectFavorite,
  onProjectClick,
  showAddTaskModal,
  onOpenAddTaskModal,
  onCloseAddTaskModal,
  onAddTask,
}) {
  const { theme, isDarkMode } = useContext(ThemeContext);

  // Sort tasks: favorites first, then others
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  // Sort projects: favorites first, then others
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  // Calculate total time for active task
  const getTotalTime = (task) => {
    if (!task) return '00:00:00';
    const totalSeconds = task.id === activeTask?.id
      ? task.seconds + elapsedSeconds
      : task.seconds;
    return formatTime(totalSeconds);
  };

  // Calculate total time for a project
  const getProjectTotalTime = (projectId) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    const totalSeconds = projectTasks.reduce((sum, task) => {
      const taskSeconds = task.id === activeTask?.id
        ? task.seconds + elapsedSeconds
        : task.seconds;
      return sum + taskSeconds;
    }, 0);
    return formatTime(totalSeconds);
  };

  // Get task count for a project
  const getProjectTaskCount = (projectId) => {
    return tasks.filter(t => t.projectId === projectId).length;
  };

  return (
    <div className="flex flex-col h-full" style={{ background: theme.app.windowBg }}>
      {/* Active Task Card */}
      {activeTask ? (
        <div
          className="mx-5 mt-5 p-5 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${theme.app.accentActiveTask || '#EF4444'}${isDarkMode ? '26' : '1A'} 0%, ${theme.app.accentActiveTask || '#EF4444'}0D 100%)`,
            border: `1px solid ${theme.app.accentActiveTask || '#EF4444'}${isDarkMode ? '33' : '4D'}`,
          }}
        >
          <div className="text-xs mb-1" style={{ color: theme.app.textMuted }}>Active task</div>
          <div className="text-base font-medium mb-2" style={{ color: theme.app.textPrimary }}>
            {activeTask.name}
          </div>
          <div className="flex items-center justify-between">
            <div
              className="px-3 py-1 rounded-full text-xs flex items-center gap-1.5"
              style={{
                background: isDarkMode ? 'rgba(52,211,153,0.15)' : 'rgba(16,185,129,0.1)',
                border: `1px solid ${isDarkMode ? 'rgba(52,211,153,0.3)' : 'rgba(16,185,129,0.3)'}`,
                color: theme.app.accentGreen,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.app.accentGreen }} />
              {activeTask.project}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-semibold tabular-nums" style={{ color: theme.app.textPrimary }}>
                  {formatTime(elapsedSeconds)}
                </div>
                <div className="text-xs" style={{ color: theme.app.textMuted }}>
                  Total: {getTotalTime(activeTask)}
                </div>
              </div>
              <button
                onClick={onStopTask}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{ background: theme.app.accentRed, color: 'white' }}
              >
                <Pause size={16} fill="white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-5 mt-5 p-5 rounded-2xl" style={{ background: theme.app.cardBg, border: `1px solid ${theme.app.border}` }}>
          <div className="text-sm font-medium mb-1" style={{ color: theme.app.textSecondary }}>No active task</div>
          <div className="text-xs" style={{ color: theme.app.textMuted }}>Select a task to begin</div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 px-5 mt-5 mb-4">
        <button
          onClick={() => onTabChange('tasks')}
          className="text-sm font-medium pb-2 cursor-pointer transition-all hover:opacity-80"
          style={{
            color: activeTab === 'tasks' ? theme.app.textPrimary : theme.app.textMuted,
            borderBottom: activeTab === 'tasks' ? `2px solid ${theme.app.accentBlue}` : 'none',
          }}
        >
          Recent Tasks
        </button>
        <button
          onClick={() => onTabChange('projects')}
          className="text-sm font-medium pb-2 cursor-pointer transition-all hover:opacity-80"
          style={{
            color: activeTab === 'projects' ? theme.app.textPrimary : theme.app.textMuted,
            borderBottom: activeTab === 'projects' ? `2px solid ${theme.app.accentBlue}` : 'none',
          }}
        >
          Projects
        </button>
      </div>

      {/* Search + Add Button */}
      <div className="flex gap-2 px-5 mb-4">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ color: theme.app.textMuted }}
          />
          <input
            type="text"
            placeholder={activeTab === 'tasks' ? 'Search by task' : 'Search by project'}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
            style={{
              background: theme.app.cardBg,
              border: `1px solid ${theme.app.border}`,
              color: theme.app.textPrimary,
            }}
          />
        </div>
        <Button icon={<Plus size={16} />} onClick={onOpenAddTaskModal}>
          Add {activeTab === 'tasks' ? 'task' : 'project'}
        </Button>
      </div>

      {/* Content - Tasks or Projects */}
      <div className="flex-1 overflow-y-auto px-5 space-y-2">
        {activeTab === 'tasks' ? (
          // Tasks List
          <>
            {sortedTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                whileHover={{ x: 2, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, hover: { duration: 0.15 } }}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer"
                style={{
                  background: theme.app.cardBg,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <motion.button
                  onClick={() => onToggleFavorite(task.id)}
                  className="cursor-pointer"
                  whileTap={{ scale: 0.8 }}
                  animate={task.isFavorite ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Star
                    size={16}
                    style={{ color: task.isFavorite ? theme.app.accentOrange : theme.app.textMuted }}
                    fill={task.isFavorite ? theme.app.accentOrange : 'none'}
                  />
                </motion.button>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1" style={{ color: theme.app.textPrimary }}>
                    {task.name}
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs"
                    style={{
                      background: isDarkMode ? 'rgba(52,211,153,0.15)' : 'rgba(16,185,129,0.1)',
                      color: theme.app.accentGreen,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.app.accentGreen }} />
                    {task.project}
                  </div>
                </div>
                <Info size={14} style={{ color: theme.app.textMuted }} />
                {task.id === activeTask?.id ? (
                  <span
                    className="text-sm tabular-nums px-3 py-1.5 rounded-lg font-medium"
                    style={{
                      background: theme.app.accentGreen,
                      color: 'white'
                    }}
                  >
                    {getTotalTime(task)}
                  </span>
                ) : (
                  <span className="text-sm tabular-nums" style={{ color: theme.app.textSecondary }}>
                    {getTotalTime(task)}
                  </span>
                )}
                {task.id === activeTask?.id ? (
                  <button
                    onClick={onStopTask}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ background: theme.app.accentRed, color: 'white' }}
                  >
                    <Pause size={14} fill="white" />
                  </button>
                ) : (
                  <button
                    onClick={() => onStartTask(task.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ background: theme.app.accentBlue, color: 'white' }}
                  >
                    <Play size={14} fill="white" />
                  </button>
                )}
              </motion.div>
            ))}
          </>
        ) : (
          // Projects List
          <>
            {sortedProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                whileHover={{ x: 2, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, hover: { duration: 0.15 } }}
                onClick={() => onProjectClick(project)}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer"
                style={{
                  background: theme.app.cardBg,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <motion.button
                  onClick={(e) => { e.stopPropagation(); onToggleProjectFavorite(project.id); }}
                  className="cursor-pointer"
                  whileTap={{ scale: 0.8 }}
                  animate={project.isFavorite ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Star
                    size={16}
                    style={{ color: project.isFavorite ? theme.app.accentOrange : theme.app.textMuted }}
                    fill={project.isFavorite ? theme.app.accentOrange : 'none'}
                  />
                </motion.button>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: project.color }}
                >
                  {project.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1" style={{ color: theme.app.textPrimary }}>
                    {project.name}
                  </div>
                  <div className="text-xs" style={{ color: theme.app.textSecondary }}>
                    {getProjectTaskCount(project.id)} tasks
                  </div>
                </div>
                <Info size={14} style={{ color: theme.app.textMuted }} />
                <span className="text-sm tabular-nums" style={{ color: theme.app.textSecondary }}>
                  {getProjectTotalTime(project.id)}
                </span>
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={onCloseAddTaskModal}
        onAddTask={onAddTask}
        projects={projects}
      />
    </div>
  );
}
