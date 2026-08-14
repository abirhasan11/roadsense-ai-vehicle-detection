import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Layers,
  ShieldCheck,
  TrendingUp,
  Filter,
  Info,
  Car,
  AlertTriangle,
  Navigation,
  Compass,
} from 'lucide-react';
import { DetectionRecord, Language } from '../types';
import { getTranslation } from '../lib/translations';
import { useLayout } from '../context/LayoutContext';

interface InsightsMapScreenProps {
  history: DetectionRecord[];
  onBack: () => void;
  onSelectRecord: (record: DetectionRecord) => void;
  lang: Language;
}

interface SectorInfo {
  id: string;
  name: string;
  density: 'high' | 'medium' | 'low';
  avPercentage: number;
  activeVehicles: number;
  x: number; // percentage
  y: number; // percentage
  radius: number;
  description: string;
}

export const InsightsMapScreen: React.FC<InsightsMapScreenProps> = ({
  history,
  onBack,
  onSelectRecord,
  lang,
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorInfo | null>(null);
  const [selectedPinRecord, setSelectedPinRecord] = useState<DetectionRecord | null>(null);
  const [timeFilter, setTimeFilter] = useState<'all' | 'peak' | 'night'>('all');

  // Sector heatzones mock data representing city sectors
  const sectors: SectorInfo[] = [
    {
      id: 'sec-1',
      name: 'Tech Park Sector B',
      density: 'high',
      avPercentage: 84,
      activeVehicles: 42,
      x: 35,
      y: 32,
      radius: 70,
      description: 'Primary autonomous shuttle deployment area and LiDAR test track.',
    },
    {
      id: 'sec-2',
      name: 'Downtown Commercial Core',
      density: 'medium',
      avPercentage: 58,
      activeVehicles: 28,
      x: 65,
      y: 45,
      radius: 65,
      description: 'Mixed passenger traffic with Waymo & Cruise robotaxi fleets.',
    },
    {
      id: 'sec-3',
      name: 'Express Highway 101 Zone',
      density: 'high',
      avPercentage: 76,
      activeVehicles: 39,
      x: 50,
      y: 72,
      radius: 80,
      description: 'Autonomous freight truck corridor and high-speed convoy testing.',
    },
    {
      id: 'sec-4',
      name: 'University Science Campus',
      density: 'low',
      avPercentage: 22,
      activeVehicles: 11,
      x: 20,
      y: 60,
      radius: 50,
      description: 'Low speed zone with manual student vehicles and electric carts.',
    },
    {
      id: 'sec-5',
      name: 'Harbor Logistics Hub',
      density: 'medium',
      avPercentage: 62,
      activeVehicles: 31,
      x: 80,
      y: 25,
      radius: 60,
      description: 'Automated delivery droids and heavy autonomous yard tractors.',
    },
  ];

  const { isPhoneFrame } = useLayout();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 space-y-5 ${isPhoneFrame ? 'pb-28' : 'pb-12 md:pb-8'}`}
    >
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-[#E4E0FD] dark:border-slate-800 px-5 py-4 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{getTranslation(lang, 'home')}</span>
        </button>

        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#5A41DE]" />
          <h1 className="font-space font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            {getTranslation(lang, 'insightsMap')}
          </h1>
        </div>

        <div className="w-8" />
      </div>

      <div className={`w-full mx-auto space-y-5 ${isPhoneFrame ? 'p-4 sm:p-5 max-w-2xl' : 'p-4 sm:p-6 lg:p-8 max-w-5xl'}`}>
        {/* Banner Intro */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#1C1745] to-[#5A41DE] text-white shadow-md flex items-center justify-between">
          <div>
            <h2 className="font-space font-bold text-base sm:text-lg">
              City-Wide AV Density Heatmap
            </h2>
            <p className="text-xs text-purple-200 mt-0.5">
              Macro traffic safety planning & autonomous fleet concentration zones
            </p>
          </div>
          <div className="hidden sm:block p-3 rounded-2xl bg-white/10 backdrop-blur-md">
            <Layers className="w-6 h-6 text-amber-300" />
          </div>
        </div>

        {/* Filters & Legend Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-[#E4E0FD] dark:border-slate-800 shadow-xs text-xs">
          {/* Time Filter Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-[#5A41DE] dark:text-purple-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Hours
            </button>
            <button
              onClick={() => setTimeFilter('peak')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeFilter === 'peak'
                  ? 'bg-white dark:bg-slate-700 text-[#5A41DE] dark:text-purple-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Peak (2–5 PM)
            </button>
          </div>

          {/* Color Scale Legend */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-semibold text-[10px] sm:text-[11px]">
            <span className="text-slate-400">AV Density:</span>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300">Low (&lt;30%)</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-600 dark:text-slate-300">Med (30-65%)</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-slate-600 dark:text-slate-300">High (&gt;65%)</span>
            </div>
          </div>
        </div>

        {/* Interactive Stylized City Vector Map Canvas */}
        <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#E4E0FD] dark:border-slate-800 bg-slate-950 shadow-lg">
          {/* Stylized City Grid SVG */}
          <svg className="w-full h-full object-cover">
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
              </pattern>

              {/* Heat radial gradients */}
              <radialGradient id="gradHigh" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.65" />
                <stop offset="60%" stopColor="#f97316" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
              </radialGradient>

              <radialGradient id="gradMed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#eab308" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </radialGradient>

              <radialGradient id="gradLow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </radialGradient>
            </defs>

            <rect width="100%" height="100%" fill="#090d16" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* City Roads Vector Lines */}
            <path d="M 0 120 Q 200 80 400 150 T 800 120" stroke="#334155" strokeWidth="8" fill="none" />
            <path d="M 220 0 L 220 400" stroke="#334155" strokeWidth="6" fill="none" />
            <path d="M 520 0 L 520 400" stroke="#334155" strokeWidth="6" fill="none" />
            <path d="M 0 280 L 800 280" stroke="#334155" strokeWidth="7" fill="none" strokeDasharray="12 6" />

            {/* Heat Zones Circles */}
            {sectors.map((sec) => {
              const gradId = sec.density === 'high' ? 'url(#gradHigh)' : sec.density === 'medium' ? 'url(#gradMed)' : 'url(#gradLow)';
              return (
                <g key={sec.id} className="cursor-pointer" onClick={() => setSelectedSector(sec)}>
                  <circle
                    cx={`${sec.x}%`}
                    cy={`${sec.y}%`}
                    r={sec.radius}
                    fill={gradId}
                    className="animate-pulse"
                  />
                  <circle
                    cx={`${sec.x}%`}
                    cy={`${sec.y}%`}
                    r="6"
                    fill={sec.density === 'high' ? '#ef4444' : sec.density === 'medium' ? '#f59e0b' : '#10b981'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Detection Pin Markers overlay */}
          {history.slice(0, 6).map((item, idx) => {
            const posX = 20 + (idx * 14) % 70;
            const posY = 25 + (idx * 21) % 55;

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.25 }}
                onClick={() => {
                  setSelectedPinRecord(item);
                  setSelectedSector(null);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border-2 shadow-lg cursor-pointer ${
                  item.isAutonomous
                    ? 'bg-[#1FAE71] border-white text-white'
                    : 'bg-[#E5484D] border-white text-white'
                }`}
                style={{ left: `${posX}%`, top: `${posY}%` }}
                title={`${item.vehicleType} (${item.time})`}
              >
                <MapPin className="w-3.5 h-3.5" />
              </motion.button>
            );
          })}

          {/* Watermark Label */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-[11px] font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1FAE71] animate-ping" />
            <span>METRO TRAFFIC SENSOR NETWORK ACTIVE</span>
          </div>
        </div>

        {/* Selected Sector or Pin Card Detail Popup */}
        <AnimatePresence>
          {selectedSector && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-[#5A41DE] shadow-md space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-xl text-white ${
                      selectedSector.density === 'high' ? 'bg-red-500' : selectedSector.density === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {selectedSector.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {selectedSector.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSector(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 font-medium block">AV Concentration</span>
                  <span className="font-bold font-mono text-[#5A41DE] text-sm">{selectedSector.avPercentage}%</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 font-medium block">Active Fleets</span>
                  <span className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm">{selectedSector.activeVehicles} units</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 font-medium block">Sector Status</span>
                  <span
                    className={`font-bold font-mono text-xs uppercase ${
                      selectedSector.density === 'high' ? 'text-red-500' : selectedSector.density === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                    }`}
                  >
                    {selectedSector.density} DENSITY
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {selectedPinRecord && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-[#1FAE71] shadow-md space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#1FAE71]">
                    DETECTION RECORD #{selectedPinRecord.id}
                  </span>
                  <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {selectedPinRecord.vehicleType}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedPinRecord(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>Location: <strong>{selectedPinRecord.location}</strong></span>
                <span>Time: <strong>{selectedPinRecord.time}</strong></span>
              </div>

              <button
                onClick={() => onSelectRecord(selectedPinRecord)}
                className="w-full py-2.5 rounded-2xl bg-[#5A41DE] hover:bg-[#4E35CD] text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                View Complete AI Detection Log →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Traffic Safety Planning Insights Summary Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#5A41DE]" />
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              City Traffic Safety Planning Insights
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              • <strong>Tech Park Sector B</strong> exhibits the highest autonomous vehicle density (84%), predominantly Waymo autonomous taxis and electric shuttle buses.
            </p>
            <p>
              • <strong>Speed Compliance Metric:</strong> Autonomous fleets in high-density zones exhibit a 99.4% speed limit adherence rate compared to 82.1% for human drivers.
            </p>
            <p>
              • <strong>Pedestrian Safety Recommendation:</strong> Dedicated V2X smart beacons recommended at 3 intersections along Express Highway 101.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
