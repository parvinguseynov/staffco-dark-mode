import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock } from 'iconoir-react';
import { ThemeContext } from '../../context/ThemeContext';

export function TaskCard({ task, onToggleTimer }) {
  const { theme } = useContext(ThemeContext);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl p-4"
      style={{
        background: theme.app.gradients.cardGlass,
        border: `1px solid ${theme.app.border}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: theme.app.shadows.card,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-2" style={{ color: theme.app.textPrimary }}>
            {task.title}
          </h3>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-white"
              style={{ backgroundColor: task.projectColor }}
            >
              {task.project}
            </span>
            <span className="flex items-center gap-1 text-sm" style={{ color: theme.app.textSecondary }}>
              <Clock width={14} height={14} />
              {task.duration}
            </span>
          </div>
        </div>
        <motion.button
          onClick={() => onToggleTimer && onToggleTimer(task.id)}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: task.isRunning ? theme.app.gradients.red : theme.app.gradients.blue,
            color: 'white',
            boxShadow: task.isRunning ? theme.app.shadows.buttonRed : theme.app.shadows.button,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {task.isRunning ? <Pause width={18} height={18} /> : <Play width={18} height={18} />}
        </motion.button>
      </div>
    </motion.div>
  );
}
