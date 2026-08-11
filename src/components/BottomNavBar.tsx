import React from 'react';
import { motion } from 'motion/react';
import { Home, History, Camera, BarChart3, MapPin, User } from 'lucide-react';
import { ScreenType, Language } from '../types';
import { getTranslation } from '../lib/translations';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenDetect: () => void;
  lang: Language;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenDetect,
  lang,
}) => {
  if (currentScreen === 'splash' || currentScreen === 'permission') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-2xl mx-auto px-2 pb-3 pt-1 pointer-events-none">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-[#E4E0FD] dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-3xl p-1.5 flex items-center justify-around pointer-events-auto">
        {/* Home Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all cursor-pointer ${
            currentScreen === 'dashboard'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[9px] sm:text-[10px]">{getTranslation(lang, 'home')}</span>
        </motion.button>

        {/* History Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('history')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all cursor-pointer ${
            currentScreen === 'history'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <History className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[9px] sm:text-[10px]">{getTranslation(lang, 'history')}</span>
        </motion.button>

        {/* Central Floating Detect Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenDetect}
          className="relative -top-5 p-3 rounded-full bg-gradient-to-r from-[#5A41DE] to-[#6C56EA] text-white shadow-[0_8px_20px_rgba(90,65,222,0.4)] transition-all cursor-pointer group ring-4 ring-slate-50 dark:ring-slate-950"
          title="Detect Autonomous Vehicle"
        >
          <Camera className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
        </motion.button>

        {/* Analytics Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('analytics')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all cursor-pointer ${
            currentScreen === 'analytics'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[9px] sm:text-[10px]">{getTranslation(lang, 'analytics')}</span>
        </motion.button>

        {/* Map Tab (Prompt 2) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all cursor-pointer ${
            currentScreen === 'map'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[9px] sm:text-[10px]">{getTranslation(lang, 'insightsMap')}</span>
        </motion.button>

        {/* Profile Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all cursor-pointer ${
            currentScreen === 'profile'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[9px] sm:text-[10px]">{getTranslation(lang, 'profile')}</span>
        </motion.button>
      </div>
    </div>
  );
};
