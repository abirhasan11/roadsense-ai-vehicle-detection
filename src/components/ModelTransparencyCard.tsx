import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ShieldCheck, Database, Zap, ChevronDown, ChevronUp, FileCode, CheckCircle2 } from 'lucide-react';

export const ModelTransparencyCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-[#5A41DE]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              About the Model (ML Model Card)
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Technical specifications & training benchmarks
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
        >
          <span>{expanded ? 'Collapse' : 'Expand'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Highlights Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-medium block">Architecture</span>
          <span className="font-bold font-mono text-[#5A41DE]">YOLOv8-AV</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-medium block">Training Dataset</span>
          <span className="font-bold font-mono text-slate-800 dark:text-slate-200">12,400 frames</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-medium block">Avg Inference</span>
          <span className="font-bold font-mono text-[#1FAE71]">12.4 ms/frame</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-[10px] text-slate-400 font-medium block">mAP @ 0.5</span>
          <span className="font-bold font-mono text-[#F5A524]">94.2%</span>
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
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-500">Backbone Network:</span>
                <span className="font-mono text-slate-900 dark:text-white">CSPDarknet53 + PANet Neck</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-500">Quantization Precision:</span>
                <span className="font-mono text-slate-900 dark:text-white">FP16 Half-Precision GPU</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-500">Dataset Sources:</span>
                <span className="font-mono text-slate-900 dark:text-white text-right">NuScenes + Waymo Open + Custom Lab</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-500">Primary Classes:</span>
                <span className="font-mono text-[#5A41DE] font-bold">AV Dome, LiDAR Pod, Shuttle, Standard Car</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-500">Safety Standard:</span>
                <span className="font-mono text-[#1FAE71] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ISO 26262 ASIL-B
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-500">Last Fine-Tuned:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">August 2026</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-violet-50 dark:bg-slate-800/80 border border-[#E4E0FD] dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Model Card Note:</strong> Designed specifically for real-time edge hardware deployments. Combines 2D optical frame feature extraction with 3D LiDAR point cloud sensor fusion to eliminate false positives in direct sunlight or heavy rain.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
