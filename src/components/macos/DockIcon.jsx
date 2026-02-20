import { motion } from 'framer-motion';

export function DockIcon({ children, label, isActive, onHover, onClick, scale = 1 }) {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="flex items-center justify-center"
        onMouseEnter={onHover}
        onClick={onClick}
        animate={{
          scale: scale,
          y: scale > 1 ? -10 * (scale - 1) : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        style={{
          width: '48px',
          height: '48px',
        }}
      >
        {children}
      </motion.div>

      {/* Active indicator dot */}
      {isActive && (
        <div
          className="absolute"
          style={{
            bottom: '-8px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.8)',
          }}
        />
      )}
    </div>
  );
}
