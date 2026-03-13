import { useContext } from 'react';
import { Search, Plus, Star, StarSolid, InfoCircle, Play, Pause, NavArrowRight } from 'iconoir-react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { Button } from '../ui/Button';
import { AddTaskModal } from '../modals/AddTaskModal';
import { Tooltip } from '../ui/Tooltip';
import { TimeInfoPopup } from '../ui/TimeInfoPopup';

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
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(239, 68, 68, 0.4)',
              '0 0 0 10px rgba(239, 68, 68, 0)',
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mx-5 mt-5 p-5 rounded-2xl relative"
          style={{
            background: theme.app.gradients.cardGlass,
            border: `1px solid ${theme.app.accentActiveTask}33`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: theme.app.shadows.glowRed,
          }}
        >
          {/* Gradient accent line at top */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{
              background: theme.app.gradients.redAccent,
            }}
          />

          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: theme.app.accentActiveTask, letterSpacing: '0.5px' }}>
            Active task
          </div>
          <div className="text-lg font-bold mb-3" style={{ color: theme.app.textPrimary }}>
            {activeTask.name}
          </div>
          <div className="flex items-center justify-between">
            <div
              className="px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5"
              style={{
                background: 'rgba(52,211,153,0.15)',
                border: '1px solid rgba(52,211,153,0.3)',
                color: theme.app.accentGreen,
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: theme.app.accentGreen }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {activeTask.project}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl font-bold tabular-nums" style={{ color: theme.app.textPrimary }}>
                  {formatTime(elapsedSeconds)}
                </div>
                <div className="text-xs font-medium" style={{ color: theme.app.textSecondary }}>
                  Total: {getTotalTime(activeTask)}
                </div>
              </div>
              <Tooltip text="Stop tracking" position="bottom">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStopTask}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: theme.app.gradients.red,
                    color: 'white',
                    boxShadow: theme.app.shadows.buttonRed,
                  }}
                >
                  <Pause width={18} height={18} />
                </motion.button>
              </Tooltip>
            </div>
          </div>
        </motion.div>
      ) : (
        <div
          className="mx-5 mt-5 p-5 rounded-2xl"
          style={{
            background: theme.app.gradients.cardGlass,
            border: `1px solid ${theme.app.border}`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: theme.app.shadows.card,
          }}
        >
          <div className="text-sm font-semibold mb-1" style={{ color: theme.app.textSecondary }}>No active task</div>
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
      <div className="px-5 mb-4">
        {activeTab === 'tasks' ? (
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search
                width={16}
                height={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: theme.app.textMuted }}
              />
              <input
                type="text"
                placeholder="Search by task"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                style={{
                  background: theme.app.cardBg,
                  border: `1px solid ${theme.app.border}`,
                  color: theme.app.textPrimary,
                }}
              />
            </div>
            <Button icon={<Plus width={16} height={16} />} onClick={onOpenAddTaskModal}>
              Add task
            </Button>
          </div>
        ) : (
          <div className="relative">
            <Search
              width={16}
              height={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: theme.app.textMuted }}
            />
            <input
              type="text"
              placeholder="Search projects"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
              style={{
                background: theme.app.cardBg,
                border: `1px solid ${theme.app.border}`,
                color: theme.app.textPrimary,
              }}
            />
          </div>
        )}
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
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  background: theme.app.gradients.cardGlass,
                  border: `1px solid ${theme.app.border}`,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: theme.app.shadows.card,
                }}
              >
                <Tooltip text={task.isFavorite ? "Remove from favorites" : "Add to favorites"} position="top">
                  <motion.button
                    onClick={() => onToggleFavorite(task.id)}
                    className="cursor-pointer"
                    whileTap={{ scale: 0.8 }}
                    animate={task.isFavorite ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {task.isFavorite ? (
                      <StarSolid
                        width={16}
                        height={16}
                        style={{ color: theme.app.accentOrange }}
                      />
                    ) : (
                      <Star
                        width={16}
                        height={16}
                        style={{ color: theme.app.textMuted }}
                      />
                    )}
                  </motion.button>
                </Tooltip>
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
                <TimeInfoPopup task={task} />
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
                  <Tooltip text="Stop tracking" position="left">
                    <button
                      onClick={onStopTask}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ background: theme.app.accentRed, color: 'white' }}
                    >
                      <Pause width={14} height={14} />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip text="Start tracking" position="left">
                    <button
                      onClick={() => onStartTask(task.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ background: theme.app.accentBlue, color: 'white' }}
                    >
                      <Play width={14} height={14} />
                    </button>
                  </Tooltip>
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
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                onClick={() => onProjectClick(project)}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  background: theme.app.gradients.cardGlass,
                  border: `1px solid ${theme.app.border}`,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: theme.app.shadows.card,
                }}
              >
                <Tooltip text={project.isFavorite ? "Remove from favorites" : "Add to favorites"} position="top">
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); onToggleProjectFavorite(project.id); }}
                    className="cursor-pointer"
                    whileTap={{ scale: 0.8 }}
                    animate={project.isFavorite ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {project.isFavorite ? (
                      <StarSolid
                        width={16}
                        height={16}
                        style={{ color: theme.app.accentOrange }}
                      />
                    ) : (
                      <Star
                        width={16}
                        height={16}
                        style={{ color: theme.app.textMuted }}
                      />
                    )}
                  </motion.button>
                </Tooltip>
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
                <span className="text-sm tabular-nums" style={{ color: theme.app.textSecondary }}>
                  {getProjectTotalTime(project.id)}
                </span>
                <NavArrowRight width={18} height={18} style={{ color: theme.app.textMuted }} />
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
