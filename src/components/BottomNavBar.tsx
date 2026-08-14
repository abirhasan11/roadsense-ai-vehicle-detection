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
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto px-3 pb-4 pt-1 pointer-events-none md:hidden">
      <nav 
        role="navigation" 
        aria-label="Mobile Navigation"
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_36px_rgba(0,0,0,0.18)] rounded-2xl sm:rounded-3xl px-2 py-1.5 flex items-center justify-around pointer-events-auto"
      >
        {/* Home Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('dashboard')}
          aria-label={getTranslation(lang, 'home')}
          className={`flex flex-col items-center justify-center min-w-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'dashboard'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] leading-tight tracking-tight mt-0.5 whitespace-nowrap">{getTranslation(lang, 'home')}</span>
        </motion.button>

        {/* History Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('history')}
          aria-label={getTranslation(lang, 'history')}
          className={`flex flex-col items-center justify-center min-w-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'history'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] leading-tight tracking-tight mt-0.5 whitespace-nowrap">{getTranslation(lang, 'history')}</span>
        </motion.button>

        {/* Central Floating Detect Action Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenDetect}
          aria-label="Scan and Detect Vehicle"
          className="relative -top-4 p-3 rounded-full bg-gradient-to-tr from-[#5A41DE] via-[#6C56EA] to-[#7B68EE] text-white shadow-[0_8px_24px_rgba(90,65,222,0.45)] transition-all cursor-pointer ring-4 ring-slate-100 dark:ring-slate-950 flex items-center justify-center"
          title="Detect Autonomous Vehicle"
        >
          <Camera className="w-6 h-6" />
        </motion.button>

        {/* Map Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('map')}
          aria-label={getTranslation(lang, 'insightsMap')}
          className={`flex flex-col items-center justify-center min-w-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'map'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] leading-tight tracking-tight mt-0.5 whitespace-nowrap">{getTranslation(lang, 'insightsMap')}</span>
        </motion.button>

        {/* Analytics Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('analytics')}
          aria-label={getTranslation(lang, 'analytics')}
          className={`flex flex-col items-center justify-center min-w-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'analytics'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] leading-tight tracking-tight mt-0.5 whitespace-nowrap">{getTranslation(lang, 'analytics')}</span>
        </motion.button>

        {/* Profile Tab */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate('profile')}
          aria-label={getTranslation(lang, 'profile')}
          className={`flex flex-col items-center justify-center min-w-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'profile'
              ? 'text-[#5A41DE] font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] leading-tight tracking-tight mt-0.5 whitespace-nowrap">{getTranslation(lang, 'profile')}</span>
        </motion.button>
      </nav>
    </div>
  );
};
