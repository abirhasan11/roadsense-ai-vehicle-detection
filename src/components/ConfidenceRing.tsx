import React from 'react';
import { motion } from 'motion/react';

interface ConfidenceRingProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  isAutonomous?: boolean;
}

export const ConfidenceRing: React.FC<ConfidenceRingProps> = ({
  score,
  size = 110,
  strokeWidth = 9,
  isAutonomous = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const strokeColor = isAutonomous ? '#1FAE71' : '#F5A524';

  return (
    <div className="relative flex flex-col items-center justify-center inline-block">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800"
          fill="transparent"
        />
        {/* Animated Progress Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {score.toFixed(1)}%
        </span>
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
          MATCH
        </span>
      </div>
    </div>
  );
};
