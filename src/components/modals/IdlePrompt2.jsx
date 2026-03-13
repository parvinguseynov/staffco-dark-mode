import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

export function IdlePrompt2({ isOpen, onResume, onBreak, countdownSeconds = 60 }) {
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
          onBreak(); // Auto-select break when timer expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, countdownSeconds, onBreak]);

  if (!isOpen) return null;

  const progress = (timeLeft / countdownSeconds) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-80 rounded-2xl p-6 text-center"
        style={{
          background: theme.app.cardBg,
          border: `1px solid ${theme.app.border}`,
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Circular Timer */}
        <div className="relative w-28 h-28 mx-auto mb-5">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="56"
              cy="56"
              r="45"
              fill="none"
              stroke={theme.app.border}
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="56"
              cy="56"
              r="45"
              fill="none"
              stroke={theme.app.accentOrange}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          {/* Timer text */}
          <div
            className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
            style={{ color: theme.app.textPrimary }}
          >
            {timeLeft}s
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: theme.app.textPrimary }}
        >
          You've been idle
        </h3>
        <p
          className="text-sm mb-6"
          style={{ color: theme.app.textSecondary }}
        >
          Do you want to resume tracking or continue your break?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onBreak}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: theme.app.accentRed,
              color: 'white',
            }}
          >
            I'm on a break
          </button>
          <button
            onClick={onResume}
            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: theme.app.accentGreen,
              color: 'white',
            }}
          >
            Start working again
          </button>
        </div>
      </motion.div>
    </div>
  );
}
