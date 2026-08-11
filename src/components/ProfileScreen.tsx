import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Sliders,
  CheckCircle2,
  Info,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  Sparkles,
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { getTranslation } from '../lib/translations';
import { CitizenContributorCard } from './CitizenContributorCard';

interface ProfileScreenProps {
  onBack: () => void;
  onOpenAboutModal: () => void;
  onStartTour?: () => void;
  lang: Language;
  onToggleLang: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onOpenAboutModal,
  onStartTour,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onShowToast,
}) => {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [showLidarRays, setShowLidarRays] = useState(true);
  const [highPrecisionYolo, setHighPrecisionYolo] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-28"
    >
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-[#E4E0FD] dark:border-slate-800 px-5 py-4 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{getTranslation(lang, 'home')}</span>
        </button>

        <h1 className="font-space font-bold text-base sm:text-lg text-slate-900 dark:text-white">
          {getTranslation(lang, 'profileTitle')}
        </h1>

        <div className="w-8" />
      </div>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5">
        {/* User Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#5A41DE] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            AV
          </div>
          <div className="flex-1">
            <h2 className="font-space font-bold text-slate-900 dark:text-white text-base">
              Autonomous Systems Engineer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              RoadSense Research & Detection Lab
            </p>
            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#1FAE71] text-[10px] font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Model Tier 1 Authorized</span>
            </div>
          </div>
        </div>

        {/* Citizen Contributor / Gamification Card (Prompt 6) */}
        <CitizenContributorCard />

        {/* Quick Preferences Card (Theme & Language) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base border-b border-slate-100 dark:border-slate-800 pb-3">
            System Appearance & Language
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                onToggleTheme();
                onShowToast(getTranslation(lang, 'toastThemeChanged'), `Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
            >
              <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-[#5A41DE]">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {getTranslation(lang, 'darkMode')}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {theme === 'dark' ? 'Dark Active' : 'Light Active'}
                </p>
              </div>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => {
                onToggleLang();
                onShowToast(
                  lang === 'en' ? 'ভাষা পরিবর্তন করা হয়েছে' : 'Language Updated',
                  lang === 'en' ? 'বাংলা ভাষা নির্বাচন করা হয়েছে' : 'English selected',
                  'success'
                );
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
            >
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#1FAE71]">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {getTranslation(lang, 'language')}
                </p>
                <p className="text-[10px] text-[#1FAE71] font-semibold">
                  {lang === 'en' ? 'English (EN)' : 'বাংলা (BN)'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Model Configuration Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-[#5A41DE]" />
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              AI Vision & Model Settings
            </h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Confidence Threshold Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700 dark:text-slate-300">
                  {getTranslation(lang, 'confidenceCutoff')}
                </span>
                <span className="font-mono text-[#5A41DE] font-bold">
                  {confidenceThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-[#5A41DE] cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Ignore detections with confidence lower than {confidenceThreshold}%.
              </p>
            </div>

            {/* Toggle 1: High Precision YOLO */}
            <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {getTranslation(lang, 'highPrecision')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Increases roof sensor dome recognition accuracy.
                </p>
              </div>
              <input
                type="checkbox"
                checked={highPrecisionYolo}
                onChange={(e) => setHighPrecisionYolo(e.target.checked)}
                className="w-5 h-5 accent-[#5A41DE] rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: LiDAR Rays Rendering */}
            <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {getTranslation(lang, 'renderLidar')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Display active laser vector points on preview scenes.
                </p>
              </div>
              <input
                type="checkbox"
                checked={showLidarRays}
                onChange={(e) => setShowLidarRays(e.target.checked)}
                className="w-5 h-5 accent-[#1FAE71] rounded cursor-pointer"
              />
            </div>

            {/* Toggle 3: Real-time Notifications */}
            <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {getTranslation(lang, 'notifications')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Push notifications for unexpected traffic anomalies.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#5A41DE] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Guided Tour & Project Links */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-[#E4E0FD] dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
          {onStartTour && (
            <button
              onClick={onStartTour}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-2xl cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#5A41DE]/15 text-[#5A41DE]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Re-play Guided Tour
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Walk through key features & quick actions
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          )}

          <button
            onClick={onOpenAboutModal}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-2xl cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-[#5A41DE]">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {getTranslation(lang, 'aboutProject')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {getTranslation(lang, 'aboutProjectSub')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
