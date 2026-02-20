import { useState, useContext } from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { Button } from '../ui/Button';

export function AddTaskModal({ isOpen, onClose, onAddTask, projects, selectedProjectId }) {
  const { theme } = useContext(ThemeContext);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(selectedProjectId || projects[0]?.id || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask({ name: taskName, projectId, description });
      setTaskName('');
      setDescription('');
      setProjectId(selectedProjectId || projects[0]?.id || 1);
      onClose();
    }
  };

  const handleClose = () => {
    setTaskName('');
    setDescription('');
    setProjectId(selectedProjectId || projects[0]?.id || 1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl shadow-2xl"
              style={{
                background: theme.app.windowBg,
                border: `1px solid ${theme.app.border}`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <h2 className="text-xl font-bold" style={{ color: theme.app.textPrimary }}>
                  New Task
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                  style={{ background: theme.app.elevatedBg }}
                >
                  <X size={20} style={{ color: theme.app.textMuted }} />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
                <div>
                  <label className="block text-base font-medium mb-3" style={{ color: theme.app.textSecondary }}>
                    Project
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl text-base"
                    style={{
                      background: theme.app.elevatedBg,
                      border: 'none',
                      color: theme.app.textPrimary,
                    }}
                  >
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 mt-2" style={{ color: theme.app.textMuted }}>
                    <Info size={16} />
                    <span className="text-sm">
                      This task will be added to {projects.find(p => p.id === projectId)?.name} project
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium mb-3" style={{ color: theme.app.textSecondary }}>
                    Task name <span style={{ color: theme.app.accentRed }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Type task title here"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl text-base"
                    style={{
                      background: theme.app.elevatedBg,
                      border: 'none',
                      color: theme.app.textPrimary,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-base font-medium mb-3" style={{ color: theme.app.textSecondary }}>
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details or context if needed (Optional)"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-base resize-none"
                    style={{
                      background: theme.app.elevatedBg,
                      border: 'none',
                      color: theme.app.textPrimary,
                    }}
                  />
                </div>

                {/* Actions */}
                <Button
                  type="submit"
                  className="w-full py-3 text-base"
                  disabled={!taskName.trim()}
                >
                  Create
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
