import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Activity, CheckCircle2 } from 'lucide-react';

interface ConfidenceTimelineChartProps {
  finalConfidence: number;
  processingTimeMs: number;
}

export const ConfidenceTimelineChart: React.FC<ConfidenceTimelineChartProps> = ({
  finalConfidence,
  processingTimeMs,
}) => {
  // Generate 5 confidence checkpoints converging on finalConfidence
  const checkpoints = [
    { time: '0ms', stage: 'Frame Input', score: 32 },
    { time: `${Math.round(processingTimeMs * 0.25)}ms`, stage: 'YOLO Anchor', score: 58 },
    { time: `${Math.round(processingTimeMs * 0.55)}ms`, stage: 'LiDAR Mesh', score: 76 },
    { time: `${Math.round(processingTimeMs * 0.8)}ms`, stage: 'Sensor Fusion', score: Math.min(92, Math.round(finalConfidence * 0.94)) },
    { time: `${processingTimeMs}ms`, stage: 'Final Class', score: finalConfidence },
  ];

  // SVG dimensions for smooth curve path
  const svgWidth = 320;
  const svgHeight = 90;

  const points = checkpoints.map((cp, idx) => {
    const x = (idx / (checkpoints.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - 15 - (cp.score / 100) * (svgHeight - 30);
    return { x, y, ...cp };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#5A41DE]" />
          <h3 className="font-space font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
            AI Model Convergence Timeline
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#1FAE71] font-bold">
          {processingTimeMs} ms Total
        </span>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Confidence score evolution across neural network inference layers:
      </p>

      {/* SVG Animated Graph */}
      <div className="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-950/80 rounded-2xl p-3 border border-slate-200 dark:border-slate-800">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-24 overflow-visible">
          {/* Subtle grid lines */}
          <line x1="10" y1="20" x2={svgWidth - 10} y2="20" stroke="currentColor" strokeDasharray="3 3" className="text-slate-200 dark:text-slate-800" />
          <line x1="10" y1="50" x2={svgWidth - 10} y2="50" stroke="currentColor" strokeDasharray="3 3" className="text-slate-200 dark:text-slate-800" />
          <line x1="10" y1="80" x2={svgWidth - 10} y2="80" stroke="currentColor" strokeDasharray="3 3" className="text-slate-200 dark:text-slate-800" />

          {/* Area Fill Gradient */}
          <defs>
            <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5A41DE" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5A41DE" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d={`${pathD} L ${points[points.length - 1].x} ${svgHeight - 10} L ${points[0].x} ${svgHeight - 10} Z`}
            fill="url(#confidenceGrad)"
          />

          {/* Animated Line Path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#5A41DE"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Checkpoint Circles */}
          {points.map((pt, i) => (
            <g key={i}>
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill={i === points.length - 1 ? '#1FAE71' : '#5A41DE'}
                stroke="#ffffff"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 * i, duration: 0.3 }}
              />
              <text
                x={pt.x}
                y={pt.y - 10}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                className="fill-slate-800 dark:fill-slate-200 font-mono"
              >
                {pt.score}%
              </text>
            </g>
          ))}
        </svg>

        {/* Milestone Stage Badges */}
        <div className="grid grid-cols-5 gap-1 pt-1 text-[9px] text-center font-mono text-slate-500 dark:text-slate-400">
          {checkpoints.map((cp, idx) => (
            <div key={idx} className="truncate">
              <span className="block font-bold text-slate-700 dark:text-slate-300">{cp.stage}</span>
              <span>{cp.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
