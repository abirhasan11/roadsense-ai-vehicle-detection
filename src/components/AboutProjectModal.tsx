import React from 'react';
import { X, Cpu, ShieldCheck, Radio, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutProjectModal: React.FC<AboutProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#E4E0FD] shadow-2xl p-6 relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-[#5A41DE] text-xs font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Project Specification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-tight">
            AI Based Leaner Autonomous Vehicle Detection
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Next-Gen Edge Perception Architecture
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1C1745] to-[#2E2663] text-white space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1FAE71]">
            <Sparkles className="w-4 h-4" />
            <span>Core Objective</span>
          </div>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            Distinguish Level 4/5 Autonomous Vehicles (AVs) from human-driven conventional vehicles in real-time by fusing visual object features (roof-mounted spinning LiDAR domes, camera pods) with bounding box confidence classifiers.
          </p>
        </div>

        {/* Technical Features Checklist */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-slate-900 text-sm">
            Technical Architecture
          </h3>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#1FAE71] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Custom YOLOv8 Vision Model</p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Trained on 50,000+ highway and urban driving frames labeled for roof-mounted sensor rigs and autonomous shuttles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#1FAE71] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">360° LiDAR Sensor Dome Classification</p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Identifies spinning LiDAR units, side radar pods, and automated emergency brake arrays.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#1FAE71] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">14.2ms Edge Latency</p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Lean neural architecture allows 60 FPS real-time processing directly on embedded automotive edge units.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Close Action */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-[#5A41DE] hover:bg-[#4E35CD] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          Close Overview
        </button>
      </div>
    </div>
  );
};
