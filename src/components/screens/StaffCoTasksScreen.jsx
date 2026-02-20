import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Play, Pause, Info } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { mockTasks } from '../../data/mockData';

export function StaffCoTasksScreen() {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleTimer = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isRunning: !task.isRunning }
        : { ...task, isRunning: false }
    ));
  };

  const activeTask = tasks.find(task => task.isRunning);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Active Task Section */}
      {activeTask && (
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active task</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {activeTask.title}
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                  style={{ backgroundColor: activeTask.projectColor }}
                >
                  • {activeTask.project}
                </span>
                <div className="flex items-center">
                  <Avatar initials="C" color="#3B82F6" size="sm" />
                  <Avatar initials="G" color="#10B981" size="sm" className="-ml-2" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                  {activeTask.duration}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total : 4:35:12
                </div>
              </div>
              <button
                onClick={() => handleToggleTimer(activeTask.id)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <Pause size={28} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'recent'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Recent Tasks
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Projects
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by task"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
              >
                {/* Star Icon */}
                <button className="text-gray-300 dark:text-gray-600 hover:text-yellow-500 transition-colors">
                  <Star size={20} />
                </button>

                {/* Task Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: task.projectColor }}
                    >
                      • {task.project}
                    </span>
                    <div className="flex items-center -space-x-1">
                      <Avatar initials="C" color="#3B82F6" size="sm" className="ring-2 ring-white dark:ring-gray-800" />
                      <Avatar initials="G" color="#10B981" size="sm" className="ring-2 ring-white dark:ring-gray-800" />
                    </div>
                  </div>
                </div>

                {/* Duration and Actions */}
                <div className="flex items-center gap-4">
                  {task.status === 'completed' && (
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Info size={16} />
                      <span className="text-sm">{task.duration}</span>
                    </div>
                  )}
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300 tabular-nums min-w-[80px] text-right">
                    {task.duration}
                  </span>
                  <button
                    onClick={() => handleToggleTimer(task.id)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      task.isRunning
                        ? 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {task.isRunning ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm text-gray-500">v1.0.3</span>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Open Dashboard →
        </a>
      </div>
    </div>
  );
}
