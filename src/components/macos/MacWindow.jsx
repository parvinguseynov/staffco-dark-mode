import { motion } from 'framer-motion';

export function MacWindow({ children, title = 'StaffCo', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden ${className}`}
      style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Title Bar */}
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 select-none">
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer" />
        </div>

        {/* Title */}
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}
