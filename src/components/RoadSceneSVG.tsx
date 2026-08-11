import React from 'react';
import { BoundingBox } from '../types';

interface RoadSceneSVGProps {
  scenePreset?: 'highway' | 'urban' | 'night' | 'testtrack' | 'custom';
  customImageUri?: string | null;
  boundingBoxes?: BoundingBox[];
  showScanAnimation?: boolean;
  showLidarRays?: boolean;
  className?: string;
}

export const RoadSceneSVG: React.FC<RoadSceneSVGProps> = ({
  scenePreset = 'highway',
  customImageUri,
  boundingBoxes = [],
  showScanAnimation = false,
  showLidarRays = true,
  className = '',
}) => {
  // If custom user image uploaded, render image background with bounding box overlay
  if (customImageUri) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center ${className}`}>
        <img
          src={customImageUri}
          alt="Custom Captured Frame"
          className="w-full h-full object-cover"
        />

        {/* Scan Animation overlay */}
        {showScanAnimation && (
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#1FAE71] to-transparent shadow-[0_0_15px_#1FAE71] animate-scan-line relative" />
            <div className="absolute inset-0 bg-[#5A41DE]/15 backdrop-blur-[1px]" />
            <div className="absolute top-4 left-4 bg-black/70 text-[#1FAE71] font-mono text-xs px-3 py-1 rounded-full border border-[#1FAE71]/40 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1FAE71] animate-ping" />
              SCANNING FRAME...
            </div>
          </div>
        )}

        {/* Bounding Box Overlay */}
        {boundingBoxes.map((box, idx) => (
          <div
            key={idx}
            className={`absolute border-2 transition-all duration-300 pointer-events-none z-10 ${
              box.isAutonomous
                ? 'border-[#1FAE71] bg-[#1FAE71]/10 shadow-[0_0_12px_rgba(31,174,113,0.3)]'
                : 'border-[#E5484D] bg-[#E5484D]/10 shadow-[0_0_12px_rgba(229,72,77,0.3)]'
            }`}
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
            }}
          >
            {/* Corner Bracket Accents */}
            <div className={`absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />
            <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />
            <div className={`absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />
            <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />

            {/* Tag Label Header */}
            <div
              className={`absolute -top-7 left-0 px-2 py-0.5 rounded-t text-[10px] sm:text-xs font-semibold whitespace-nowrap flex items-center gap-1 shadow-md ${
                box.isAutonomous
                  ? 'bg-[#1FAE71] text-white'
                  : 'bg-[#E5484D] text-white'
              }`}
            >
              <span>{box.label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Pre-built SVG Illustrated Scenes
  const isNight = scenePreset === 'night';
  const isTestTrack = scenePreset === 'testtrack';
  const isUrban = scenePreset === 'urban';

  const bgColor = isNight
    ? 'from-[#0B091A] via-[#151233] to-[#0A0817]'
    : isTestTrack
    ? 'from-[#1A182E] via-[#221D47] to-[#141226]'
    : isUrban
    ? 'from-[#1E1B38] via-[#2A2452] to-[#17142E]'
    : 'from-[#1C1745] via-[#2D2661] to-[#151233]';

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b ${bgColor} flex items-center justify-center select-none ${className}`}>
      {/* Background Grid Lines & Road Perspective */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="roadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6C56EA" strokeWidth="0.5" strokeDasharray="2 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#roadGrid)" />
      </svg>

      {/* SVG Road and Car Vector */}
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky / Horizon backdrop */}
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isNight ? "#0A0817" : "#1A153D"} />
            <stop offset="100%" stopColor={isNight ? "#1C1745" : "#2E2663"} />
          </linearGradient>

          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E1B33" />
            <stop offset="100%" stopColor="#110E22" />
          </linearGradient>

          <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C56EA" />
            <stop offset="100%" stopColor="#3B28A8" />
          </linearGradient>

          <linearGradient id="carGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#80E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#103852" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="lidarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1FAE71" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1FAE71" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1FAE71" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="800" height="450" fill="url(#skyGrad)" />

        {/* Cityscape Silhouette on Horizon for Urban / Night */}
        {(isUrban || isNight) && (
          <g opacity="0.25" fill="#6C56EA">
            <rect x="50" y="100" width="40" height="120" rx="2" />
            <rect x="100" y="70" width="55" height="150" rx="2" />
            <rect x="165" y="120" width="35" height="100" rx="2" />
            <rect x="600" y="80" width="60" height="140" rx="2" />
            <rect x="670" y="110" width="45" height="110" rx="2" />
            <rect x="725" y="130" width="35" height="90" rx="2" />
          </g>
        )}

        {/* Perspective Road Canvas */}
        <polygon points="350,180 450,180 780,450 20,450" fill="url(#roadGrad)" stroke="#3A3366" strokeWidth="2" />

        {/* Road Lane Marking Dashes */}
        <line x1="400" y1="180" x2="400" y2="450" stroke="#F5A524" strokeWidth="4" strokeDasharray="20 15" opacity="0.8" />
        <line x1="370" y1="180" x2="160" y2="450" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="12 12" opacity="0.4" />
        <line x1="430" y1="180" x2="640" y2="450" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="12 12" opacity="0.4" />

        {/* Side Sensor Poles / Traffic lights if Test Track or Urban */}
        {isTestTrack && (
          <g opacity="0.6">
            <line x1="100" y1="200" x2="100" y2="380" stroke="#1FAE71" strokeWidth="2" />
            <circle cx="100" cy="200" r="6" fill="#1FAE71" className="animate-pulse" />
            <line x1="700" y1="200" x2="700" y2="380" stroke="#1FAE71" strokeWidth="2" />
            <circle cx="700" cy="200" r="6" fill="#1FAE71" className="animate-pulse" />
          </g>
        )}

        {/* LiDAR Scanning Rays Originating from Autonomous Vehicle Dome */}
        {showLidarRays && (
          <g opacity="0.65">
            {/* Spinning/pulsing LiDAR 360 degree field */}
            <ellipse cx="400" cy="235" rx="190" ry="60" fill="url(#lidarGlow)" className="animate-pulse-glow" />
            
            {/* Laser Beam vectors */}
            <line x1="400" y1="230" x2="220" y2="310" stroke="#1FAE71" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
            <line x1="400" y1="230" x2="580" y2="310" stroke="#1FAE71" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
            <line x1="400" y1="230" x2="310" y2="370" stroke="#1FAE71" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
            <line x1="400" y1="230" x2="490" y2="370" stroke="#1FAE71" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
            <line x1="400" y1="230" x2="400" y2="390" stroke="#1FAE71" strokeWidth="1.5" opacity="0.9" />

            {/* Target Echo Points */}
            <circle cx="220" cy="310" r="3" fill="#1FAE71" />
            <circle cx="580" cy="310" r="3" fill="#1FAE71" />
            <circle cx="310" cy="370" r="3" fill="#1FAE71" />
            <circle cx="490" cy="370" r="3" fill="#1FAE71" />
            <circle cx="400" cy="390" r="3.5" fill="#1FAE71" />
          </g>
        )}

        {/* MAIN CAR ILLUSTRATION (AUTONOMOUS VEHICLE WITH TOP SENSOR DOME) */}
        <g id="autonomousCarGroup" transform="translate(240, 200)">
          {/* Shadow beneath car */}
          <ellipse cx="160" cy="130" rx="140" ry="20" fill="#000000" opacity="0.6" />

          {/* Car Body Base */}
          <path
            d="M 30 110 L 45 75 C 60 45, 110 38, 160 38 C 210 38, 260 45, 275 75 L 290 110 C 300 115, 310 125, 305 130 L 15 130 C 10 125, 20 115, 30 110 Z"
            fill="url(#carBodyGrad)"
            stroke="#A799FF"
            strokeWidth="1.5"
          />

          {/* Glass Roofline & Cabin Windows */}
          <path
            d="M 70 75 Q 160 45 250 75 Q 210 52 160 52 Q 110 52 70 75 Z"
            fill="url(#carGlassGrad)"
            stroke="#92ECFF"
            strokeWidth="1"
          />

          {/* Rear Headlights & Front LED Bar */}
          <rect x="25" y="105" width="25" height="8" rx="4" fill="#1FAE71" />
          <rect x="270" y="105" width="25" height="8" rx="4" fill="#1FAE71" />
          <line x1="50" y1="109" x2="270" y2="109" stroke="#1FAE71" strokeWidth="2" opacity="0.8" />

          {/* Wheels */}
          <rect x="50" y="120" width="45" height="16" rx="5" fill="#120F26" stroke="#4C3CA8" strokeWidth="2" />
          <rect x="225" y="120" width="45" height="16" rx="5" fill="#120F26" stroke="#4C3CA8" strokeWidth="2" />

          {/* TOP-MOUNTED AUTONOMOUS SENSOR / LIDAR DOME */}
          <g id="topSensorDome" transform="translate(140, 20)">
            {/* Base Mount Stand */}
            <rect x="12" y="18" width="16" height="8" fill="#110E24" stroke="#6C56EA" strokeWidth="1" />
            
            {/* Spinning Cylindrical LiDAR Sensor */}
            <rect x="4" y="2" width="32" height="16" rx="8" fill="#1FAE71" className="animate-pulse" />
            <circle cx="20" cy="10" r="5" fill="#0D0A1C" />
            <circle cx="20" cy="10" r="2" fill="#80FFCA" />

            {/* Radar wave rings emission */}
            <circle cx="20" cy="10" r="14" fill="none" stroke="#1FAE71" strokeWidth="1" opacity="0.6" className="animate-ping" />
            
            {/* Sensor Tag */}
            <text x="20" y="-4" textAnchor="middle" fill="#1FAE71" fontSize="10" fontFamily="Space Grotesk" fontWeight="bold">
              360° LiDAR Dome
            </text>
          </g>
        </g>
      </svg>

      {/* Radar scanning Overlay Effect when scanning */}
      {showScanAnimation && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#1FAE71] to-transparent shadow-[0_0_18px_#1FAE71] animate-scan-line relative" />
          <div className="absolute inset-0 bg-[#5A41DE]/15 backdrop-blur-[1px]" />
          <div className="absolute top-4 left-4 bg-slate-900/80 text-[#1FAE71] font-mono text-xs px-3 py-1.5 rounded-full border border-[#1FAE71]/50 flex items-center gap-2 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1FAE71] animate-ping" />
            RUNNING LEANER-YOLO AI DETECTION...
          </div>
        </div>
      )}

      {/* Render Bounding Boxes on Top of SVG Scene */}
      {boundingBoxes.map((box, idx) => (
        <div
          key={idx}
          className={`absolute border-2 transition-all duration-300 pointer-events-none z-10 ${
            box.isAutonomous
              ? 'border-[#1FAE71] bg-[#1FAE71]/15 shadow-[0_0_15px_rgba(31,174,113,0.4)]'
              : 'border-[#E5484D] bg-[#E5484D]/15 shadow-[0_0_15px_rgba(229,72,77,0.4)]'
          }`}
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
          }}
        >
          {/* Corner Brackets */}
          <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />
          <div className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />
          <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${box.isAutonomous ? 'border-[#1FAE71]' : 'border-[#E5484D]'}`} />

          {/* Label Header */}
          <div
            className={`absolute -top-7 left-0 px-2.5 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap flex items-center gap-1.5 shadow-md ${
              box.isAutonomous
                ? 'bg-[#1FAE71] text-white'
                : 'bg-[#E5484D] text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{box.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
