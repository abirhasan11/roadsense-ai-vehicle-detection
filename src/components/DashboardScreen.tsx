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
} from 'lucide-react';
import { DashboardSkeleton } from './SkeletonLoader';
import { CountUpNumber } from './CountUpNumber';
import { ModelTransparencyCard } from './ModelTransparencyCard';
import { CitizenContributorCard } from './CitizenContributorCard';
import { SystemStats, DetectionRecord, Language } from '../types';
import { getTranslation } from '../lib/translations';

interface DashboardScreenProps {
  stats: SystemStats;
  recentDetections: DetectionRecord[];
  onNavigate: (screen: 'detect' | 'history' | 'analytics' | 'profile') => void;
  onOpenCameraMode: () => void;
  onOpenUploadMode: () => void;
  onOpenAboutModal: () => void;
  onOpenNotifications: () => void;
  onOpenMenu: () => void;
  onSelectDetectionRecord: (record: DetectionRecord) => void;
  lang: Language;
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
}) => {
  const [loading, setLoading] = useState(true);

  // Simulated 500ms skeleton loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-28"
    >
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-[#E4E0FD] dark:border-slate-800 px-5 py-4 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
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
              <span className="font-space font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                {getTranslation(lang, 'appName')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {getTranslation(lang, 'appSub')}
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-[#E4E0FD] dark:border-slate-700"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-[#5A41DE]" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#E5484D] ring-2 ring-white dark:ring-slate-900" />
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Title Section */}
            <div>
              <h1 className="text-2xl font-bold font-space text-slate-900 dark:text-white">
                {getTranslation(lang, 'dashboardTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {getTranslation(lang, 'dashboardSub')}
              </p>
            </div>

            {/* System Status Gradient Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1745] via-[#2A2368] to-[#5A41DE] text-white p-5 sm:p-6 shadow-xl border border-[#6C56EA]/30"
            >
              {/* Decorative Glow Elements */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full bg-[#1FAE71]/20 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 rounded-full bg-[#6C56EA]/30 blur-xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
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

                <div className="pt-1">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs sm:text-sm font-medium text-purple-200">
                      {getTranslation(lang, 'modelAccuracy')}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-space text-white">
                      <CountUpNumber value={stats.modelAccuracy} decimals={1} suffix="%" />
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="bg-gradient-to-r from-[#1FAE71] to-[#2FD18B] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#1FAE71]"
                      style={{ width: `${stats.modelAccuracy}%` }}
                    />
                  </div>
                </div>

                {/* Sub Stats Row with Animated Count-Up Numbers (Prompt 5) */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs text-purple-100">
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

            {/* 2x2 Quick Action Cards Grid */}
            <div>
              <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                {getTranslation(lang, 'quickActions')}
              </h2>
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                {/* Action 1: Live Detection */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenCameraMode}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 hover:border-[#5A41DE] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-[#5A41DE] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-slate-900 dark:text-white text-base group-hover:text-[#5A41DE] transition-colors">
                      {getTranslation(lang, 'liveDetection')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {getTranslation(lang, 'liveDetectionSub')}
                    </p>
                  </div>
                </motion.button>

                {/* Action 2: Upload Image */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenUploadMode}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 hover:border-[#5A41DE] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#1FAE71] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-slate-900 dark:text-white text-base group-hover:text-[#1FAE71] transition-colors">
                      {getTranslation(lang, 'uploadImage')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {getTranslation(lang, 'uploadImageSub')}
                    </p>
                  </div>
                </motion.button>

                {/* Action 3: Detection History */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('history')}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 hover:border-[#5A41DE] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-[#F5A524] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-slate-900 dark:text-white text-base group-hover:text-[#F5A524] transition-colors">
                      {getTranslation(lang, 'historyLogs')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {getTranslation(lang, 'historyLogsSub')}
                    </p>
                  </div>
                </motion.button>

                {/* Action 4: About Project */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenAboutModal}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 hover:border-[#5A41DE] hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-slate-900 dark:text-white text-base group-hover:text-slate-900 transition-colors">
                      {getTranslation(lang, 'aboutProject')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {getTranslation(lang, 'aboutProjectSub')}
                    </p>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Recent Detections Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#5A41DE]" />
                  <h2 className="font-space font-bold text-slate-900 dark:text-white text-base">
                    {getTranslation(lang, 'recentActivity')}
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate('history')}
                  className="text-xs font-semibold text-[#5A41DE] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{getTranslation(lang, 'viewAll')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {recentDetections.slice(0, 3).map((item) => (
                  <motion.div
                    whileHover={{ x: 3 }}
                    key={item.id}
                    onClick={() => onSelectDetectionRecord(item)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-violet-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                          item.isAutonomous
                            ? 'bg-[#1FAE71]/15 text-[#1FAE71]'
                            : 'bg-[#E5484D]/15 text-[#E5484D]'
                        }`}
                      >
                        {item.isAutonomous ? 'AV' : 'NV'}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white text-xs sm:text-sm">
                          {item.vehicleType}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.time} • {item.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          item.isAutonomous
                            ? 'bg-[#1FAE71]/10 text-[#1FAE71]'
                            : 'bg-[#E5484D]/10 text-[#E5484D]'
                        }`}
                      >
                        {item.confidenceScore}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Citizen Contributor / Gamification Section (Prompt 6) */}
            <CitizenContributorCard />

            {/* ML Model Card Transparency Section (Prompt 8) */}
            <ModelTransparencyCard />

            {/* Model Feature Banner */}
            <div className="bg-gradient-to-r from-violet-50 to-emerald-50 dark:from-violet-950/40 dark:to-emerald-950/40 rounded-2xl p-4 border border-[#E4E0FD] dark:border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#5A41DE] text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Leaner-YOLO AI Engine Active
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  Optimized 3D bounding box detection with zero latency lag.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
