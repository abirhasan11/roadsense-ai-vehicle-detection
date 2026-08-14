import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Menu,
  Bell,
  Camera,
  Upload,
  History,
  Info,
  ShieldCheck,
  Activity,
  ArrowRight,
  Zap,
  TrendingUp,
  Cpu,
  Moon,
  Sun,
  Globe,
} from 'lucide-react';
import { DashboardSkeleton } from './SkeletonLoader';
import { CountUpNumber } from './CountUpNumber';
import { ModelTransparencyCard } from './ModelTransparencyCard';
import { CitizenContributorCard } from './CitizenContributorCard';
import { RoadSceneSVG } from './RoadSceneSVG';
import { SystemStats, DetectionRecord, Language, ThemeMode } from '../types';
import { getTranslation } from '../lib/translations';
import { useLayout } from '../context/LayoutContext';

interface DashboardScreenProps {
  stats: SystemStats;
  recentDetections: DetectionRecord[];
  onNavigate: (screen: 'detect' | 'history' | 'analytics' | 'profile' | 'map') => void;
  onOpenCameraMode: () => void;
  onOpenUploadMode: () => void;
  onOpenAboutModal: () => void;
  onOpenNotifications: () => void;
  onOpenMenu: () => void;
  onSelectDetectionRecord: (record: DetectionRecord) => void;
  lang: Language;
  onToggleLang?: () => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  stats,
  recentDetections,
  onNavigate,
  onOpenCameraMode,
  onOpenUploadMode,
  onOpenAboutModal,
  onOpenNotifications,
  onOpenMenu,
  onSelectDetectionRecord,
  lang,
  onToggleLang,
  theme = 'light',
  onToggleTheme,
}) => {
  const { isPhoneFrame } = useLayout();
  const [loading, setLoading] = useState(true);

  // Simulated 500ms skeleton loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Helper render for Mobile Single-Column Dashboard
  const renderMobileLayout = () => (
    <div className="space-y-4 sm:space-y-5 max-w-2xl mx-auto w-full">
      {/* Title Section */}
      <div className="px-1">
        <h1 className="text-xl sm:text-2xl font-bold font-space text-slate-900 dark:text-white tracking-tight">
          {getTranslation(lang, 'dashboardTitle')}
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {getTranslation(lang, 'dashboardSub')}
        </p>
      </div>

      {/* System Status Gradient Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1C1745] via-[#2A2368] to-[#5A41DE] text-white p-4 sm:p-5 shadow-xl border border-[#6C56EA]/30"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 rounded-full bg-[#1FAE71]/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-28 h-28 rounded-full bg-[#6C56EA]/30 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FAE71] animate-ping" />
              <span>{getTranslation(lang, 'systemStatus')}: {stats.status}</span>
            </div>

            <span className="text-[10px] sm:text-xs text-purple-200 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5A524]" />
              <CountUpNumber value={stats.avgResponseMs} decimals={0} suffix="ms" /> Latency
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[11px] sm:text-xs font-medium text-purple-200">
                {getTranslation(lang, 'modelAccuracy')}
              </span>
              <span className="text-lg sm:text-xl font-bold font-space text-white">
                <CountUpNumber value={stats.modelAccuracy} decimals={1} suffix="%" />
              </span>
            </div>

            <div className="w-full bg-black/30 h-2 sm:h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-[#1FAE71] to-[#2FD18B] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#1FAE71]"
                style={{ width: `${stats.modelAccuracy}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs text-purple-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1FAE71] shrink-0" />
              <div>
                <p className="text-[9px] sm:text-[10px] text-purple-300">{getTranslation(lang, 'totalScanned')}</p>
                <p className="font-bold text-xs sm:text-sm">
                  <CountUpNumber value={stats.totalDetections} decimals={0} />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-300 shrink-0" />
              <div>
                <p className="text-[9px] sm:text-[10px] text-purple-300">{getTranslation(lang, 'avRatio')}</p>
                <p className="font-bold text-xs sm:text-sm">
                  <CountUpNumber value={stats.autonomousPercentage} decimals={1} suffix="%" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Primary Quick Actions 2-Column Responsive */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onOpenCameraMode}
          className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-violet-600 to-[#5A41DE] text-white shadow-md text-left flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
          </div>
          <div>
            <h3 className="font-space font-bold text-white text-xs sm:text-sm">{getTranslation(lang, 'liveDetection')}</h3>
            <p className="text-[10px] sm:text-[11px] text-purple-200 mt-0.5">{getTranslation(lang, 'liveDetectionSub')}</p>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onOpenUploadMode}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 text-left flex flex-col justify-between cursor-pointer hover:border-emerald-500 transition-colors shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#1FAE71] flex items-center justify-center">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">FILE</span>
          </div>
          <div>
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{getTranslation(lang, 'uploadImage')}</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{getTranslation(lang, 'uploadImageSub')}</p>
          </div>
        </motion.button>
      </div>

      {/* Live Interactive Perception Simulator Station (Mobile) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1FAE71] animate-ping" />
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
              Live AI Perception Feed
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            YOLOv8-AV • 60 FPS
          </span>
        </div>

        {/* Animated Screen Box */}
        <div className="relative h-44 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
          <RoadSceneSVG
            scenePreset="highway"
            showLidarRays={true}
            boundingBoxes={[
              {
                x: 32,
                y: 40,
                width: 36,
                height: 32,
                label: 'Autonomous Vehicle (97.4%)',
                isAutonomous: true,
                confidence: 97.4,
              },
            ]}
          />

          {/* Overlay Tag */}
          <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] text-emerald-400 font-mono border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LiDAR 3D Array Active</span>
          </div>

          {/* Tap to open camera button */}
          <div className="absolute bottom-2 right-2">
            <button
              onClick={onOpenCameraMode}
              className="px-2.5 py-1.5 rounded-lg bg-[#5A41DE]/90 backdrop-blur-md text-white font-bold text-[10px] flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-3 h-3" />
              <span>Start Camera</span>
            </button>
          </div>
        </div>
      </div>

      {/* City Safety Map Widget (Mobile) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-space font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5">
            <span className="text-[#5A41DE]">📍</span>
            <span>City Safety Map</span>
          </h3>
          <button
            onClick={() => onNavigate('map')}
            className="text-[11px] text-[#5A41DE] font-semibold hover:underline cursor-pointer"
          >
            Open Map →
          </button>
        </div>

        <div
          onClick={() => onNavigate('map')}
          className="relative h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#5A41DE_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
          
          <div className="absolute top-2.5 left-3 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Tech Park: 84% AV</span>
          </div>

          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-amber-500/20 text-amber-400 text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-full border border-amber-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Downtown: 58% AV</span>
          </div>

          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 text-[10px] font-bold text-slate-800 dark:text-white shadow-xs">
              View Live Map Heatmap →
            </span>
          </div>
        </div>
      </div>

      {/* Recent Detections List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{getTranslation(lang, 'recentActivity')}</h2>
          <button onClick={() => onNavigate('history')} className="text-xs text-[#5A41DE] font-semibold cursor-pointer hover:underline">{getTranslation(lang, 'viewAll')}</button>
        </div>
        <div className="space-y-2">
          {recentDetections.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDetectionRecord(item)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 cursor-pointer hover:bg-violet-50/50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${item.isAutonomous ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600' : 'bg-red-100 dark:bg-red-950 text-red-600'}`}>
                  {item.isAutonomous ? 'AV' : 'NV'}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{item.vehicleType}</p>
                  <p className="text-[10px] text-slate-400 truncate">{item.time} • {item.location}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#5A41DE] shrink-0 ml-2">{item.confidenceScore}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Citizen Contributor Card */}
      <CitizenContributorCard />

      {/* Model Transparency Card */}
      <ModelTransparencyCard />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 ${isPhoneFrame ? 'pb-28' : 'pb-12 md:pb-8'}`}
    >
      {/* Mobile / Phone Frame Header Bar (hidden on desktop full-window where top navbar is active) */}
      <div className={`${isPhoneFrame ? 'flex' : 'md:hidden flex'} bg-white dark:bg-slate-900 border-b border-[#E4E0FD] dark:border-slate-800 px-4 sm:px-5 py-3 sm:py-4 sticky top-0 z-20 shadow-xs items-center justify-between`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onOpenMenu}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1FAE71] animate-pulse" />
              <span className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base md:text-lg tracking-tight">
                {getTranslation(lang, 'appName')}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[170px] sm:max-w-none">
              {getTranslation(lang, 'appSub')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher for mobile header */}
          {onToggleLang && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-[#E4E0FD] dark:border-slate-700 font-bold text-xs flex items-center gap-1"
              aria-label="Toggle language"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#5A41DE]" />
              <span>{lang === 'en' ? 'BN' : 'EN'}</span>
            </motion.button>
          )}

          {onToggleTheme && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-[#E4E0FD] dark:border-slate-700"
              aria-label="Toggle dark mode"
              title="Toggle Dark / Light Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#5A41DE]" />
              )}
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onOpenNotifications}
            className="relative p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-[#E4E0FD] dark:border-slate-700"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#5A41DE]" />
            <span className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#E5484D] ring-2 ring-white dark:ring-slate-900" />
          </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`w-full mx-auto ${isPhoneFrame ? 'p-4 sm:p-5 max-w-2xl' : 'p-4 sm:p-6 lg:p-8 max-w-[1600px]'}`}>
        {loading ? (
          <DashboardSkeleton />
        ) : isPhoneFrame ? (
          /* Phone Frame Container: Always single clean column, 0 squish, 100% fluid */
          renderMobileLayout()
        ) : (
          <>
            {/* Mobile View Layout (visible on actual small screens < lg) */}
            <div className="lg:hidden">
              {renderMobileLayout()}
            </div>

            {/* Desktop Cockpit Grid (visible on lg/xl screens in Full Window mode) */}
            <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
              {/* Left Column (4 cols): System Health + Citizen XP + Model Transparency */}
              <div className="col-span-4 space-y-4">
                {/* System Status Gradient Card */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1745] via-[#2A2368] to-[#5A41DE] text-white p-5 shadow-xl border border-[#6C56EA]/30"
                >
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 rounded-full bg-[#1FAE71]/20 blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-28 h-28 rounded-full bg-[#6C56EA]/30 blur-xl pointer-events-none" />

                  <div className="relative z-10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#1FAE71] animate-ping" />
                        <span>{getTranslation(lang, 'systemStatus')}: {stats.status}</span>
                      </div>

                      <span className="text-xs text-purple-200 font-mono flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-[#F5A524]" />
                        <CountUpNumber value={stats.avgResponseMs} decimals={0} suffix="ms" /> Latency
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-xs font-medium text-purple-200">
                          {getTranslation(lang, 'modelAccuracy')}
                        </span>
                        <span className="text-2xl font-bold font-space text-white">
                          <CountUpNumber value={stats.modelAccuracy} decimals={1} suffix="%" />
                        </span>
                      </div>

                      <div className="w-full bg-black/30 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div
                          className="bg-gradient-to-r from-[#1FAE71] to-[#2FD18B] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#1FAE71]"
                          style={{ width: `${stats.modelAccuracy}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-white/10 text-xs text-purple-100">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#1FAE71]" />
                        <div>
                          <p className="text-[10px] text-purple-300">{getTranslation(lang, 'totalScanned')}</p>
                          <p className="font-bold text-sm">
                            <CountUpNumber value={stats.totalDetections} decimals={0} />
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-300" />
                        <div>
                          <p className="text-[10px] text-purple-300">{getTranslation(lang, 'avRatio')}</p>
                          <p className="font-bold text-sm">
                            <CountUpNumber value={stats.autonomousPercentage} decimals={1} suffix="%" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Citizen Contributor / Gamification Card */}
                <CitizenContributorCard />

                {/* Model Transparency ML Card */}
                <ModelTransparencyCard />
              </div>

              {/* Center Column (5 cols): Real-Time Detector & Interactive Perception Station */}
              <div className="col-span-5 space-y-4">
                {/* 2 Main Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenCameraMode}
                    className="p-4 rounded-2xl bg-gradient-to-br from-violet-600 to-[#5A41DE] text-white shadow-md hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-mono bg-white/15 px-2 py-0.5 rounded-full">LIVE</span>
                    </div>
                    <div>
                      <h3 className="font-space font-bold text-white text-base">
                        {getTranslation(lang, 'liveDetection')}
                      </h3>
                      <p className="text-xs text-purple-200 mt-0.5">
                        {getTranslation(lang, 'liveDetectionSub')}
                      </p>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpenUploadMode}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 hover:border-[#1FAE71] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#1FAE71] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">FILE</span>
                    </div>
                    <div>
                      <h3 className="font-space font-bold text-slate-900 dark:text-white text-base group-hover:text-[#1FAE71] transition-colors">
                        {getTranslation(lang, 'uploadImage')}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {getTranslation(lang, 'uploadImageSub')}
                      </p>
                    </div>
                  </motion.button>
                </div>

                {/* Embedded Live Perception Simulator Station */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1FAE71] animate-ping" />
                      <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm">
                        Live AI Perception Station (Interactive)
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      YOLOv8-AV • 60 FPS
                    </span>
                  </div>

                  {/* Interactive Live Screen Box */}
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                    <RoadSceneSVG
                      scenePreset="highway"
                      showLidarRays={true}
                      boundingBoxes={[
                        {
                          x: 32,
                          y: 40,
                          width: 36,
                          height: 32,
                          label: 'Autonomous Vehicle (97.4%)',
                          isAutonomous: true,
                          confidence: 97.4,
                        },
                      ]}
                    />

                    {/* Overlay Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-emerald-400 font-mono border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LiDAR Array Active (142k pts)</span>
                    </div>

                    {/* Launch Fullscreen Scanner Button Overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={onOpenCameraMode}
                        className="px-4 py-2 rounded-xl bg-[#5A41DE] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Launch Camera Detector</span>
                      </button>
                    </div>
                  </div>

                  {/* Feature Highlight Banner */}
                  <div className="bg-gradient-to-r from-violet-50 to-emerald-50 dark:from-violet-950/30 dark:to-emerald-950/30 rounded-xl p-3 border border-[#E4E0FD] dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#5A41DE]" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">ISO 26262 Edge Architecture</span>
                    </div>
                    <span className="text-[#1FAE71] font-bold text-[11px]">Hardware Verified</span>
                  </div>
                </div>
              </div>

              {/* Right Column (3 cols): Recent Activity + City Insights Map Widget */}
              <div className="col-span-3 space-y-4">
                {/* Recent Activity Feed */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#5A41DE]" />
                      <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm">
                        {getTranslation(lang, 'recentActivity')}
                      </h3>
                    </div>
                    <button
                      onClick={() => onNavigate('history')}
                      className="text-xs font-semibold text-[#5A41DE] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{getTranslation(lang, 'viewAll')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {recentDetections.slice(0, 3).map((item) => (
                      <motion.div
                        whileHover={{ x: 2 }}
                        key={item.id}
                        onClick={() => onSelectDetectionRecord(item)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-violet-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                              item.isAutonomous
                                ? 'bg-[#1FAE71]/15 text-[#1FAE71]'
                                : 'bg-[#E5484D]/15 text-[#E5484D]'
                            }`}
                          >
                            {item.isAutonomous ? 'AV' : 'NV'}
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white text-xs truncate max-w-[110px]">
                              {item.vehicleType}
                            </h4>
                            <p className="text-[10px] text-slate-400">
                              {item.time}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.isAutonomous
                              ? 'bg-[#1FAE71]/10 text-[#1FAE71]'
                              : 'bg-[#E5484D]/10 text-[#E5484D]'
                          }`}
                        >
                          {item.confidenceScore}%
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* City Insights Map Mini-Preview Widget */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                      <span className="text-[#5A41DE]">📍</span>
                      <span>City Safety Map</span>
                    </h3>
                    <button
                      onClick={() => onNavigate('map')}
                      className="text-xs text-[#5A41DE] font-semibold hover:underline cursor-pointer"
                    >
                      Open Map
                    </button>
                  </div>

                  <div
                    onClick={() => onNavigate('map')}
                    className="relative h-28 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer group"
                  >
                    {/* Visual Grid Map Mockup */}
                    <div className="absolute inset-0 bg-[radial-gradient(#5A41DE_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                    
                    {/* Sector Blips */}
                    <div className="absolute top-4 left-6 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Tech Park: 84% AV</span>
                    </div>

                    <div className="absolute bottom-4 right-6 flex items-center gap-1 bg-amber-500/20 text-amber-400 text-[9px] font-mono px-2 py-0.5 rounded-full border border-amber-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Downtown: 58% AV</span>
                    </div>

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="px-3 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 text-xs font-bold text-slate-800 dark:text-white shadow-xs">
                        View Sector Analytics →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
