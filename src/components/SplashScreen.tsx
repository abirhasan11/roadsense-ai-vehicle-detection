import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Radio, Cpu, Scan } from 'lucide-react';
import { RoadSceneSVG } from './RoadSceneSVG';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-full w-full bg-gradient-to-b from-[#1C1745] via-[#161239] to-[#151233] text-white flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
      {/* Background Radial Glow & Futuristic Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#5A41DE]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#1FAE71]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-purple-200">
          <Cpu className="w-3.5 h-3.5 text-[#1FAE71]" />
          <span>YOLOv8 & LiDAR Sensor Fusion</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-[#1FAE71]/10 px-2.5 py-1 rounded-full border border-[#1FAE71]/30">
          <span className="w-2 h-2 rounded-full bg-[#1FAE71] animate-ping" />
          <span>AI v2.4 Live</span>
        </div>
      </div>

      {/* Main Illustration Area */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center text-center">
        {/* Animated Radar & Sensor Dome Graphic Container */}
        <div className="relative w-full max-w-sm h-52 sm:h-60 rounded-2xl overflow-hidden border border-[#6C56EA]/40 shadow-[0_0_35px_rgba(90,65,222,0.3)] bg-[#110E24] mb-8 group">
          
          {/* Radar Scanner Overlay with Rotating Sweeper */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            {/* Concentric Radar Circles */}
            <div className="w-44 h-44 rounded-full border border-purple-500/20 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border border-purple-500/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-[#1FAE71]/40 flex items-center justify-center">
                  <Scan className="w-6 h-6 text-[#1FAE71] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Radar Sweep Arc */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-t-2 border-[#1FAE71] animate-radar-sweep opacity-75" />
            </div>
          </div>

          {/* SVG Road Scene with Top-Mounted Sensor Autonomous Car */}
          <RoadSceneSVG
            scenePreset="testtrack"
            showLidarRays={true}
            boundingBoxes={[
              {
                x: 25,
                y: 30,
                width: 50,
                height: 48,
                label: 'Autonomous Vehicle Identified',
                isAutonomous: true,
                confidence: 96.8,
              },
            ]}
          />
        </div>

        {/* Title and Tagline */}
        <div className="space-y-3 max-w-md">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1FAE71] bg-[#1FAE71]/10 px-3 py-1 rounded-full">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Autonomous Detection System</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white leading-tight">
            AI Based Leaner Autonomous Vehicle Detection
          </h1>

          <p className="text-sm sm:text-base text-purple-200/80 font-normal">
            Detect. Predict. Prevent.
          </p>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            Instantly distinguish self-driving vehicles from conventional traffic using computer vision and sensor metadata.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-4 pb-2 space-y-4">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#5A41DE] to-[#6C56EA] hover:from-[#4E35CD] hover:to-[#5C46DE] active:scale-[0.99] text-white font-semibold text-base shadow-[0_10px_25px_rgba(90,65,222,0.4)] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-purple-300/70">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A524]" />
          <span>Powered by AI & YOLOv8 Vision Engine</span>
          <ShieldCheck className="w-3.5 h-3.5 text-[#1FAE71] ml-1" />
        </div>
      </div>
    </div>
  );
};
