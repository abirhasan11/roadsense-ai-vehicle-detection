import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ShieldCheck, Database, Zap, ChevronDown, ChevronUp, FileCode, CheckCircle2 } from 'lucide-react';

export const ModelTransparencyCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-3.5 sm:space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-[#5A41DE] shrink-0">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-xs sm:text-sm md:text-base truncate">
              About the Model (ML Card)
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Technical specifications & benchmarks
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs font-semibold shrink-0"
        >
          <span>{expanded ? 'Collapse' : 'Details'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>

      {/* Primary Highlights Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block">Architecture</span>
          <span className="font-bold font-mono text-[#5A41DE] text-xs sm:text-sm">YOLOv8-AV</span>
        </div>

        <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block">Training Set</span>
          <span className="font-bold font-mono text-slate-800 dark:text-slate-200 text-xs sm:text-sm">12,400 frames</span>
        </div>

        <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block">Avg Latency</span>
          <span className="font-bold font-mono text-[#1FAE71] text-xs sm:text-sm">12.4 ms</span>
        </div>

        <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium block">mAP @ 0.5</span>
          <span className="font-bold font-mono text-[#F5A524] text-xs sm:text-sm">94.2%</span>
        </div>
      </div>

      {/* Expandable Model Specs Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs overflow-hidden"
          >
            <div className="space-y-2 text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs">
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-100 dark:border-slate-800 gap-0.5">
                <span className="font-semibold text-slate-500">Backbone Network:</span>
                <span className="font-mono text-slate-900 dark:text-white">CSPDarknet53 + PANet Neck</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-100 dark:border-slate-800 gap-0.5">
                <span className="font-semibold text-slate-500">Quantization Precision:</span>
                <span className="font-mono text-slate-900 dark:text-white">FP16 Half-Precision GPU</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-100 dark:border-slate-800 gap-0.5">
                <span className="font-semibold text-slate-500">Dataset Sources:</span>
                <span className="font-mono text-slate-900 dark:text-white">NuScenes + Waymo Open + Lab</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-100 dark:border-slate-800 gap-0.5">
                <span className="font-semibold text-slate-500">Primary Classes:</span>
                <span className="font-mono text-[#5A41DE] font-bold">AV Dome, LiDAR Pod, Shuttle, Standard Car</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-100 dark:border-slate-800 gap-0.5">
                <span className="font-semibold text-slate-500">Safety Standard:</span>
                <span className="font-mono text-[#1FAE71] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ISO 26262 ASIL-B
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between py-1 gap-0.5">
                <span className="font-semibold text-slate-500">Last Fine-Tuned:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">August 2026</span>
              </div>
            </div>

            <div className="p-3 rounded-xl sm:rounded-2xl bg-violet-50 dark:bg-slate-800/80 border border-[#E4E0FD] dark:border-slate-700 text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Model Card Note:</strong> Designed specifically for real-time edge hardware deployments. Combines 2D optical frame feature extraction with 3D LiDAR point cloud sensor fusion to eliminate false positives in direct sunlight or heavy rain.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
