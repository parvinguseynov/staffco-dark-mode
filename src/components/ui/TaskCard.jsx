import { motion } from 'framer-motion';
import { Play, Pause, Clock } from 'lucide-react';

export function TaskCard({ task, onToggleTimer }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            {task.title}
          </h3>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white"
              style={{ backgroundColor: task.projectColor }}
            >
              {task.project}
            </span>
            <span className="flex items-center gap-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <Clock size={14} />
              {task.duration}
            </span>
          </div>
        </div>
        <motion.button
          onClick={() => onToggleTimer && onToggleTimer(task.id)}
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center
            ${task.isRunning
              ? 'bg-light-accent-red dark:bg-dark-accent-red text-white'
              : 'bg-light-accent-blue dark:bg-dark-accent-blue text-white'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {task.isRunning ? <Pause size={18} /> : <Play size={18} />}
        </motion.button>
      </div>
    </motion.div>
  );
}
