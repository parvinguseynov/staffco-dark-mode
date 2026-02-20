import { useContext } from 'react';
import { Search, Plus, Star, Info, Play, Pause } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { Button } from '../ui/Button';
import { AddTaskModal } from '../modals/AddTaskModal';

export function ProjectDetailScreen({
  project,
  tasks,
  activeTask,
  timerRunning,
  elapsedSeconds,
  formatTime,
  onStartTask,
  onStopTask,
  onToggleFavorite,
  showAddTaskModal,
  onOpenAddTaskModal,
  onCloseAddTaskModal,
  onAddTask,
}) {
  const { theme } = useContext(ThemeContext);

  console.log('ProjectDetailScreen render:', {
    projectExists: !!project,
    project,
    tasksCount: tasks?.length,
    themeExists: !!theme,
    themeApp: theme?.app,
  });

  if (!theme || !theme.app) {
    console.error('ERROR: Theme or theme.app is undefined in ProjectDetailScreen!');
    return (
      <div style={{ padding: '20px', color: 'white', background: '#0F172A' }}>
        <h2>Error: Theme not loaded</h2>
        <pre>{JSON.stringify({ theme, project }, null, 2)}</pre>
      </div>
    );
  }

  if (!project) {
    console.error('ProjectDetailScreen: No project provided');
    return <div style={{ padding: '20px', color: theme.app.textPrimary }}>Project not found</div>;
  }

  // Calculate total time for this project
  const getTotalTime = (task) => {
    if (!task) return '00:00:00';
    const totalSeconds = task.id === activeTask?.id
      ? task.seconds + elapsedSeconds
      : task.seconds;
    return formatTime(totalSeconds);
  };

  const projectTotalSeconds = tasks.reduce((sum, task) => {
    const taskSeconds = task.id === activeTask?.id
      ? task.seconds + elapsedSeconds
      : task.seconds;
    return sum + taskSeconds;
  }, 0);

  return (
    <div className="flex flex-col h-full" style={{ background: theme.app.windowBg }}>
      {/* Project Header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${theme.app.border}` }}>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg"
            style={{ background: project.color }}
          >
            {project.initials}
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: theme.app.textPrimary }}>
              {project.name}
            </h1>
            <p className="text-xs" style={{ color: theme.app.textSecondary }}>
              {tasks.length} tasks · {formatTime(projectTotalSeconds)} total
            </p>
          </div>
        </div>
      </div>

      {/* Search + Add Task */}
      <div className="flex gap-2 px-5 py-4">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ color: theme.app.textMuted }}
          />
          <input
            type="text"
            placeholder="Search tasks"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
            style={{
              background: theme.app.cardBg,
              border: `1px solid ${theme.app.border}`,
              color: theme.app.textPrimary,
            }}
          />
        </div>
        <Button icon={<Plus size={16} />} onClick={onOpenAddTaskModal}>
          Add task
        </Button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto px-5 space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8" style={{ color: theme.app.textMuted }}>
            <p className="text-sm">No tasks in this project yet</p>
          </div>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3.5 rounded-xl hover:opacity-80 transition-all"
              style={{ background: theme.app.cardBg }}
            >
              <button onClick={() => onToggleFavorite(task.id)} className="cursor-pointer">
                <Star
                  size={16}
                  style={{ color: task.isFavorite ? theme.app.accentOrange : theme.app.textMuted }}
                  fill={task.isFavorite ? theme.app.accentOrange : 'none'}
                />
              </button>
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: theme.app.textPrimary }}>
                  {task.name}
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
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={onCloseAddTaskModal}
        onAddTask={onAddTask}
        projects={[project]}
        selectedProjectId={project.id}
      />
    </div>
  );
}
