import React, { useState } from 'react';
import { Smartphone, Monitor, ShieldCheck, Cpu } from 'lucide-react';

interface DesktopWrapperProps {
  children: React.ReactNode;
}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState<'phoneFrame' | 'wideResponsive'>('phoneFrame');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans antialiased selection:bg-[#5A41DE] selection:text-white relative overflow-x-hidden">
      {/* Desktop Header Controls Bar (visible on md/lg screens) */}
      <header className="hidden md:flex items-center justify-between w-full max-w-6xl px-8 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-xs text-slate-400 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5A41DE] to-[#6C56EA] flex items-center justify-center text-white font-bold font-display shadow-sm">
            RS
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-sm">
              RoadSense AI
            </h1>
            <p className="text-[10px] text-slate-400">
              Autonomous Vehicle Perception Suite
            </p>
          </div>
        </div>

        {/* Viewport Layout Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setLayoutMode('phoneFrame')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              layoutMode === 'phoneFrame'
                ? 'bg-[#5A41DE] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Frame</span>
          </button>

          <button
            onClick={() => setLayoutMode('wideResponsive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              layoutMode === 'wideResponsive'
                ? 'bg-[#5A41DE] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Wide Desktop</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-[#1FAE71] animate-ping" />
          <span>YOLOv8 Edge Model Online</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-center justify-center p-0 md:py-8">
        {layoutMode === 'phoneFrame' ? (
          /* Phone Frame Container */
          <div className="w-full h-full md:h-[840px] md:max-w-[430px] md:rounded-[44px] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-white overflow-hidden relative flex flex-col transition-all duration-300">
            
            {/* Phone Speaker Notch bar (desktop only) */}
            <div className="hidden md:flex justify-center pt-2 pb-1 bg-slate-900 shrink-0">
              <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
              </div>
            </div>

            {/* App Screen Content */}
            <div className="flex-1 overflow-y-auto relative bg-slate-50">
              {children}
            </div>
          </div>
        ) : (
          /* Wide Responsive Layout Container */
          <div className="w-full max-w-5xl bg-white md:rounded-3xl md:border md:border-slate-800 md:shadow-2xl overflow-hidden min-h-[780px] text-slate-800 flex flex-col relative transition-all duration-300">
            <div className="flex-1 overflow-y-auto relative bg-slate-50">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
