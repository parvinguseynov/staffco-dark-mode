import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Star, StarSolid, Play, Pause } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';
import { TimeInfoPopup } from '../ui/TimeInfoPopup';
import { Tooltip } from '../ui/Tooltip';

export function ProjectDetailScreen({
  project,
  tasks = [],
  activeTask,
  elapsedSeconds,
  formatTime,
  onStartTask,
  onStopTask,
  onToggleFavorite,
  onOpenAddTaskModal,
}) {
  const { theme } = useContext(ThemeContext);

  // Debug logging
  console.log('=== ProjectDetailScreen Render ===');
  console.log('project:', project);
  console.log('tasks:', tasks);
  console.log('tasks is array:', Array.isArray(tasks));
  console.log('activeTask:', activeTask);

  // Safety check
  if (!project) {
    console.error('ProjectDetailScreen: No project provided');
    return (
      <div className="flex items-center justify-center h-full" style={{ color: theme.app.textMuted }}>
        Project not found
      </div>
    );
  }

  // Safe array filtering
  const projectTasks = Array.isArray(tasks)
    ? tasks.filter(t => t?.projectId === project.id)
    : [];

  console.log('projectTasks filtered:', projectTasks);

  // Sort: favorites first
  const sortedTasks = [...projectTasks].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  console.log('sortedTasks:', sortedTasks);

  const getTotalTime = (task) => {
    const totalSeconds = task.id === activeTask?.id
      ? task.seconds + elapsedSeconds
      : task.seconds;
    return formatTime(totalSeconds);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: theme.app.windowBg }}>
      {/* Project Header */}
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
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold"
            style={{ background: project.color }}
          >
            {project.initials}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold" style={{ color: theme.app.textPrimary }}>
              {project.name}
            </div>
            <div className="text-xs" style={{ color: theme.app.textSecondary }}>
              {sortedTasks.length} {sortedTasks.length === 1 ? 'task' : 'tasks'}
            </div>
          </div>
        </div>
      </div>

      {/* Search + Add Task */}
      <div className="flex gap-3 px-5 py-4">
        <div
          className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{
            background: theme.app.cardBg,
            border: `1px solid ${theme.app.border}`,
          }}
        >
          <Search width={18} height={18} style={{ color: theme.app.textMuted }} />
          <input
            type="text"
            placeholder="Search by task"
            className="bg-transparent outline-none text-sm flex-1"
            style={{ color: theme.app.textPrimary }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenAddTaskModal}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3)',
          }}
        >
          <Plus width={16} height={16} />
          Add task
        </motion.button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto px-5 space-y-2 pb-4">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12" style={{ color: theme.app.textMuted }}>
            <p className="text-sm">No tasks in this project yet</p>
            <p className="text-xs mt-1">Click "Add task" to create one</p>
          </div>
        ) : (
          sortedTasks.map(task => (
            <motion.div
              key={task.id}
              layout
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer"
              style={{
                position: 'relative',
                zIndex: 1,
                background: task.id === activeTask?.id
                  ? 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(16, 185, 129, 0.08))'
                  : theme.app.gradients.cardGlass,
                border: `1px solid ${task.id === activeTask?.id ? 'rgba(52, 211, 153, 0.3)' : theme.app.border}`,
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
                    background: 'rgba(52,211,153,0.15)',
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
          ))
        )}
      </div>
    </div>
  );
}
