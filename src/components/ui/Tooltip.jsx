import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Tooltip({ children, text, position = 'bottom' }) {
  const [show, setShow] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowPositions = {
    bottom: '-top-1 left-1/2 -translate-x-1/2',
    top: '-bottom-1 left-1/2 -translate-x-1/2',
    left: '-right-1 top-1/2 -translate-y-1/2',
    right: '-left-1 top-1/2 -translate-y-1/2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`absolute ${positions[position]} z-50 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none`}
            style={{
              background: '#1E293B',
              color: '#F1F5F9',
              border: '1px solid #334155',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {text}
            {/* Arrow */}
            <div
              className={`absolute w-2 h-2 rotate-45 ${arrowPositions[position]}`}
              style={{ background: '#1E293B', border: '1px solid #334155' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
