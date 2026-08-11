import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface LocationMapPreviewProps {
  location: string;
  coordinates?: { lat: number; lng: number };
}

export const LocationMapPreview: React.FC<LocationMapPreviewProps> = ({
  location,
  coordinates = { lat: 23.8103, lng: 90.4125 },
}) => {
  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 group shadow-sm">
      {/* Dark Vector Map Background Grid */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Vector Road Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-40">
        <path d="M -20 80 Q 120 40 300 120 T 500 80" stroke="#5A41DE" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 80 -10 L 80 200" stroke="#6C56EA" strokeWidth="4" strokeDasharray="6,6" fill="none" />
        <path d="M 220 -10 L 220 200" stroke="#1FAE71" strokeWidth="3" fill="none" />
        <path d="M -10 140 L 500 140" stroke="#475569" strokeWidth="6" fill="none" />
      </svg>

      {/* Pulsing Radar Location Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full bg-[#5A41DE]/30 animate-ping" />
          <div className="relative w-9 h-9 rounded-full bg-[#5A41DE] text-white flex items-center justify-center shadow-lg border-2 border-white">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="mt-1.5 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-200 border border-slate-700 shadow-md flex items-center gap-1">
          <Navigation className="w-2.5 h-2.5 text-[#1FAE71] animate-pulse" />
          <span>{location}</span>
        </div>
      </div>

      {/* Compass / Overlay Controls */}
      <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-slate-950/70 backdrop-blur-md rounded-lg text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5">
        <Compass className="w-3 h-3 text-[#5A41DE]" />
        <span>{coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E</span>
      </div>

      <div className="absolute bottom-2.5 right-2.5 px-2 py-1 bg-slate-950/80 backdrop-blur-md rounded-md text-[9px] text-slate-400 border border-slate-800 uppercase tracking-wider font-semibold">
        Smart Node GPS Logged
      </div>
    </div>
  );
};
