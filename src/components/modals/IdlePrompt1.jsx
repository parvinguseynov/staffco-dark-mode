import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

export function IdlePrompt1({ isOpen, onWorking, onBreak, countdownSeconds = 60 }) {
  const { theme } = useContext(ThemeContext);
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(countdownSeconds);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onBreak();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, countdownSeconds, onBreak]);

  if (!isOpen) return null;

  const progress = (timeLeft / countdownSeconds) * 100;
  const circumference = 2 * Math.PI * 52;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(96, 165, 250, 0.1)
          `,
        }}
      >
        {/* Gradient accent line at top */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, #60A5FA, #A78BFA, #60A5FA)',
          }}
        />

        <div className="p-8">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold text-center mb-2"
            style={{ color: '#F1F5F9' }}
          >
            It looks like you've been away
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-center mb-8"
            style={{ color: '#94A3B8' }}
          >
            Are you still working?
          </motion.p>

          {/* Circular Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative w-36 h-36 mx-auto mb-8"
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />

            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(148, 163, 184, 0.1)"
                strokeWidth="8"
              />
              {/* Progress circle with gradient */}
              <defs>
                <linearGradient id="timerGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#timerGradient1)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                style={{
                  transition: 'stroke-dashoffset 1s linear',
                  filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.5))',
                }}
              />
            </svg>

            {/* Timer text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-3xl font-bold tabular-nums"
                style={{
                  color: timeLeft <= 10 ? '#F87171' : '#F1F5F9',
                  textShadow: timeLeft <= 10 ? '0 0 20px rgba(248, 113, 113, 0.5)' : 'none',
                }}
              >
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs mt-1" style={{ color: '#64748B' }}>
                remaining
              </span>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="space-y-3">
            {/* Primary button - Yes, Working */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onWorking}
              className="w-full py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
              style={{
                background: 'linear-gradient(135deg, #34D399, #10B981)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(52, 211, 153, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Yes, I'm working
            </motion.button>

            {/* Secondary button - On Break */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBreak}
              className="w-full py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
              style={{
                background: 'linear-gradient(135deg, #F87171, #EF4444)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(248, 113, 113, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              No, I'm on a break
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
