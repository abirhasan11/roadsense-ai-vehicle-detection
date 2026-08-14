import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  ShieldCheck,
  Cpu,
  Home,
  Camera,
  History,
  BarChart3,
  MapPin,
  User,
  Moon,
  Sun,
  Globe,
  Bell,
} from 'lucide-react';
import { ScreenType, Language, ThemeMode } from '../types';
import { getTranslation, translations } from '../lib/translations';
import { LayoutContext, LayoutMode } from '../context/LayoutContext';

interface DesktopWrapperProps {
  children: React.ReactNode;
  currentScreen?: ScreenType;
  onNavigate?: (screen: ScreenType) => void;
  onOpenDetect?: () => void;
  lang?: Language;
  onToggleLang?: () => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenNotifications?: () => void;
}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
  children,
  currentScreen = 'dashboard',
  onNavigate,
  onOpenDetect,
  lang = 'en',
  onToggleLang,
  theme = 'light',
  onToggleTheme,
  onOpenNotifications,
}) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('wideResponsive');

  const navItems: { screen: ScreenType; labelKey: keyof typeof translations['en']; icon: any }[] = [
    { screen: 'dashboard', labelKey: 'home', icon: Home },
    { screen: 'detect', labelKey: 'detectTitle', icon: Camera },
    { screen: 'history', labelKey: 'history', icon: History },
    { screen: 'map', labelKey: 'insightsMap', icon: MapPin },
    { screen: 'analytics', labelKey: 'analytics', icon: BarChart3 },
    { screen: 'profile', labelKey: 'profile', icon: User },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'} flex flex-col font-sans antialiased selection:bg-[#5A41DE] selection:text-white relative overflow-x-hidden transition-colors duration-200`}>
      {/* Desktop Header Navigation Bar (visible only on md/lg screens) */}
      <header className="hidden md:flex items-center justify-between w-full px-6 lg:px-10 py-3 bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-xs text-slate-400 sticky top-0 z-50">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5A41DE] to-[#6C56EA] flex items-center justify-center text-white font-bold font-space shadow-md group-hover:scale-105 transition-transform">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-space font-bold text-white text-sm tracking-tight group-hover:text-purple-300 transition-colors">
                RoadSense AI
              </h1>
              <span className="w-2 h-2 rounded-full bg-[#1FAE71] animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400">
              Autonomous Vehicle Perception Suite
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {onNavigate && currentScreen !== 'splash' && currentScreen !== 'permission' && (
          <nav className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => {
                    if (item.screen === 'detect' && onOpenDetect) {
                      onOpenDetect();
                    } else {
                      onNavigate(item.screen);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer text-xs ${
                    isActive
                      ? 'bg-[#5A41DE] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{getTranslation((lang as Language) || 'en', item.labelKey)}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Tools: Mode Switcher, Lang, Theme, Notifications */}
        <div className="flex items-center gap-2.5">
          {/* Viewport Layout Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setLayoutMode('wideResponsive')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                layoutMode === 'wideResponsive'
                  ? 'bg-[#5A41DE] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Full Window View (No vertical scroll)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full Window</span>
            </button>

            <button
              onClick={() => setLayoutMode('phoneFrame')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                layoutMode === 'phoneFrame'
                  ? 'bg-[#5A41DE] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Phone Simulation Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone</span>
            </button>
          </div>

          {/* Language Toggle */}
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1 font-bold text-xs cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'en' ? 'BN' : 'EN'}</span>
            </button>
          )}

          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-purple-300" />
              )}
            </button>
          )}

          {/* Notifications */}
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="System Alerts"
            >
              <Bell className="w-4 h-4 text-[#5A41DE]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5484D]" />
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-start justify-center p-0 md:py-4 md:px-6">
        <LayoutContext.Provider value={{ layoutMode, setLayoutMode, isPhoneFrame: layoutMode === 'phoneFrame' }}>
          {layoutMode === 'phoneFrame' ? (
            /* Phone Frame Container on Desktop */
            <div className="w-full min-h-screen md:min-h-0 md:h-[840px] md:max-w-[430px] md:rounded-[44px] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden relative flex flex-col transition-all duration-300 my-auto">
              {/* Phone Speaker Notch bar (desktop only) */}
              <div className="hidden md:flex justify-center pt-2 pb-1 bg-slate-900 shrink-0">
                <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-800 rounded-full" />
                </div>
              </div>

              {/* App Screen Content */}
              <div className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-950">
                {children}
              </div>
            </div>
          ) : (
            /* Full Window Responsive Container */
            <div className="w-full max-w-7xl bg-slate-50 dark:bg-slate-950 md:rounded-3xl md:border md:border-slate-800 md:shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col relative transition-all duration-300 min-h-screen md:min-h-[calc(100vh-80px)]">
              <div className="flex-1 relative bg-slate-50 dark:bg-slate-950">
                {children}
              </div>
            </div>
          )}
        </LayoutContext.Provider>
      </main>
    </div>
  );
};
