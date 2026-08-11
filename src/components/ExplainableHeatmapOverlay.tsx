import React from 'react';
import { motion } from 'motion/react';
import { Eye, Info, Sparkles, Layers } from 'lucide-react';

interface ExplainableHeatmapOverlayProps {
  isAutonomous: boolean;
  confidenceScore: number;
}

export const ExplainableHeatmapOverlay: React.FC<ExplainableHeatmapOverlayProps> = ({
  isAutonomous,
  confidenceScore,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-3xl"
    >
      {/* Grad-CAM Saliency Heatmap Canvas Simulation */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]">
        {/* Heatmap Spot 1: Roof LiDAR Sensor Array (Primary High-Activation Red Hotspot) */}
        {isAutonomous && (
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 0.95, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[50%] -translate-x-1/2 w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(239,68,68,0.9) 0%, rgba(249,115,22,0.7) 40%, rgba(234,179,8,0.4) 70%, transparent 100%)',
              filter: 'blur(12px)',
            }}
          />
        )}

        {/* Heatmap Spot 2: Front Grille Radar & Bumper Assembly */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.75, 0.9, 0.75] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute top-[58%] left-[50%] -translate-x-1/2 w-40 h-28 rounded-full"
          style={{
            background: isAutonomous
              ? 'radial-gradient(circle, rgba(249,115,22,0.85) 0%, rgba(234,179,8,0.6) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(14,165,233,0.5) 50%, transparent 100%)',
            filter: 'blur(14px)',
          }}
        />

        {/* Heatmap Spot 3: Side Camera Pods */}
        <div
          className="absolute top-[42%] left-[28%] w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.75) 0%, transparent 80%)',
            filter: 'blur(10px)',
          }}
        />
        <div
          className="absolute top-[42%] right-[28%] w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.75) 0%, transparent 80%)',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* Grad-CAM Focus Points Annotation Pins */}
      <div className="absolute inset-0 p-3 pointer-events-auto">
        {isAutonomous && (
          <div className="absolute top-[18%] left-[50%] -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-red-500/60 shadow-lg flex items-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Roof LiDAR Dome (48% Activation)</span>
          </div>
        )}

        <div className="absolute top-[65%] left-[50%] -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-amber-500/60 shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Front Grille Radar (32% Activation)</span>
        </div>

        {/* Grad-CAM Watermark Badge */}
        <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md text-white p-2.5 rounded-2xl border border-violet-500/40 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-200">Grad-CAM Feature Activation Map</span>
          </div>
          <span className="font-mono text-amber-300 font-bold">{confidenceScore}% saliency</span>
        </div>
      </div>
    </motion.div>
  );
};
