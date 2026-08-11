import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, Upload, Home, ArrowRight, Check } from 'lucide-react';
import { Language } from '../types';

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: "Real-Time Camera & Simulator",
      description: "Tap the Camera action to activate live webcam detection with real shutter capture and bounding box recognition.",
      icon: <Camera className="w-6 h-6 text-[#1FAE71]" />,
      targetLabel: "Step 1 of 3: Live Scanner",
    },
    {
      title: "Gallery Photo Analysis",
      description: "Upload actual vehicle photos from your gallery. RoadSense AI detects LiDAR arrays and classifies vehicle autonomy.",
      icon: <Upload className="w-6 h-6 text-[#5A41DE]" />,
      targetLabel: "Step 2 of 3: Photo Upload",
    },
    {
      title: "Analytics & History Logs",
      description: "Explore 30-day accuracy trends, LiDAR point density, interactive map coordinates, and export PDF/share reports.",
      icon: <Home className="w-6 h-6 text-[#F5A524]" />,
      targetLabel: "Step 3 of 3: Navigation & Reports",
    },
  ];

  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-slate-900 border-2 border-[#5A41DE] text-white p-6 rounded-3xl max-w-sm w-full shadow-[0_20px_50px_rgba(90,65,222,0.3)] space-y-5 relative overflow-hidden"
        >
          {/* Subtle glow background */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#5A41DE]/30 rounded-full blur-2xl pointer-events-none" />

          {/* Step Header */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold bg-[#5A41DE]/20 text-purple-300 px-3 py-1 rounded-full border border-[#5A41DE]/40">
              {step.targetLabel}
            </span>
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Skip
            </button>
          </div>

          {/* Icon & Content */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 shrink-0 shadow-inner">
              {step.icon}
            </div>
            <div className="space-y-1">
              <h3 className="font-space font-bold text-lg text-white">{step.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
            </div>
          </div>

          {/* Step Progress Dots & Action Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              {tourSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep ? 'w-6 bg-[#1FAE71]' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="py-2.5 px-4 rounded-xl bg-[#5A41DE] hover:bg-[#6C56EA] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              {currentStep === tourSteps.length - 1 ? (
                <>
                  <span>Got It!</span>
                  <Check className="w-4 h-4 text-[#1FAE71]" />
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
