import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenType, DetectionRecord, SystemStats, Language, ThemeMode, ToastMessage } from './types';
import { initialSystemStats, initialDetectionHistory } from './data/mockData';

// Screens & Components
import { DesktopWrapper } from './components/DesktopWrapper';
import { SplashScreen } from './components/SplashScreen';
import { PermissionScreen } from './components/PermissionScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { DetectVehicleScreen } from './components/DetectVehicleScreen';
import { DetectionResultScreen } from './components/DetectionResultScreen';
import { DetectionHistoryScreen } from './components/DetectionHistoryScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { InsightsMapScreen } from './components/InsightsMapScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AboutProjectModal } from './components/AboutProjectModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { GuidedTour } from './components/GuidedTour';
import { BottomNavBar } from './components/BottomNavBar';
import { ToastContainer } from './components/Toast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [systemStats, setSystemStats] = useState<SystemStats>(initialSystemStats);
  const [detectionHistory, setDetectionHistory] = useState<DetectionRecord[]>(initialDetectionHistory);
  const [activeDetection, setActiveDetection] = useState<DetectionRecord | null>(initialDetectionHistory[0]);
  const [detectInputMethod, setDetectInputMethod] = useState<'camera' | 'gallery'>('camera');

  // Modals, Drawers & Tour
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Sync dark class on document root or wrapper
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check guided tour auto-start on first dashboard entry
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      const tourDone = localStorage.getItem('roadsense_tour_completed');
      if (!tourDone) {
        setIsTourOpen(true);
      }
    }
  }, [currentScreen]);

  const handleCloseTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('roadsense_tour_completed', 'true');
  };

  const handleStartTourManual = () => {
    setIsTourOpen(true);
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      message,
      type,
    };
    setToasts((prev) => [...prev.slice(-2), newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Navigation handlers
  const handleGetStartedFromSplash = () => {
    setCurrentScreen('permission');
  };

  const handlePermissionGranted = () => {
    showToast("Permissions Configured", "Camera & GPS location access active", "success");
    setCurrentScreen('dashboard');
  };

  const handlePermissionSkipped = () => {
    setCurrentScreen('dashboard');
  };

  const handleOpenCameraDetect = () => {
    setDetectInputMethod('camera');
    setCurrentScreen('detect');
  };

  const handleOpenUploadDetect = () => {
    setDetectInputMethod('gallery');
    setCurrentScreen('detect');
  };

  const handleDetectionComplete = (newRecord: DetectionRecord) => {
    setDetectionHistory((prev) => [newRecord, ...prev]);
    setActiveDetection(newRecord);
    setSystemStats((prev) => {
      const newTotal = prev.totalDetections + 1;
      const totalAutonomous = Math.round((prev.totalDetections * prev.autonomousPercentage) / 100) + (newRecord.isAutonomous ? 1 : 0);
      const newAutoPercent = +((totalAutonomous / newTotal) * 100).toFixed(1);

      return {
        ...prev,
        totalDetections: newTotal,
        autonomousPercentage: newAutoPercent,
      };
    });

    setCurrentScreen('result');
  };

  const handleSelectRecord = (record: DetectionRecord) => {
    setActiveDetection(record);
    setCurrentScreen('result');
  };

  const handleClearHistory = () => {
    setDetectionHistory([]);
  };

  return (
    <DesktopWrapper
      currentScreen={currentScreen}
      onNavigate={(screen) => setCurrentScreen(screen)}
      onOpenDetect={handleOpenCameraDetect}
      lang={lang}
      onToggleLang={handleToggleLang}
      theme={theme}
      onToggleTheme={handleToggleTheme}
      onOpenNotifications={() => setIsNotificationOpen(true)}
    >
      <div className={`relative min-h-full w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        
        {/* Toast Notification Container */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />

        {/* Screen Transitions with AnimatePresence */}
        <AnimatePresence mode="wait">
          {currentScreen === 'splash' && (
            <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SplashScreen onGetStarted={handleGetStartedFromSplash} />
            </motion.div>
          )}

          {currentScreen === 'permission' && (
            <motion.div key="permission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PermissionScreen
                onGrant={handlePermissionGranted}
                onSkip={handlePermissionSkipped}
                lang={lang}
              />
            </motion.div>
          )}

          {currentScreen === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DashboardScreen
                stats={systemStats}
                recentDetections={detectionHistory}
                onNavigate={(screen) => setCurrentScreen(screen)}
                onOpenCameraMode={handleOpenCameraDetect}
                onOpenUploadMode={handleOpenUploadDetect}
                onOpenAboutModal={() => setIsAboutModalOpen(true)}
                onOpenNotifications={() => setIsNotificationOpen(true)}
                onOpenMenu={() => setIsAboutModalOpen(true)}
                onSelectDetectionRecord={handleSelectRecord}
                lang={lang}
                onToggleLang={handleToggleLang}
                theme={theme}
                onToggleTheme={handleToggleTheme}
              />
            </motion.div>
          )}

          {currentScreen === 'detect' && (
            <motion.div key="detect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DetectVehicleScreen
                initialInputMethod={detectInputMethod}
                onBack={() => setCurrentScreen('dashboard')}
                onDetectionComplete={handleDetectionComplete}
                lang={lang}
                onShowToast={showToast}
              />
            </motion.div>
          )}

          {currentScreen === 'result' && activeDetection && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DetectionResultScreen
                record={activeDetection}
                onBack={() => setCurrentScreen('dashboard')}
                onViewAnalytics={() => setCurrentScreen('analytics')}
                onScanAnother={handleOpenCameraDetect}
                lang={lang}
                onShowToast={showToast}
              />
            </motion.div>
          )}

          {currentScreen === 'history' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DetectionHistoryScreen
                history={detectionHistory}
                onSelectRecord={handleSelectRecord}
                onBack={() => setCurrentScreen('dashboard')}
                onClearHistory={handleClearHistory}
                lang={lang}
                onShowToast={showToast}
              />
            </motion.div>
          )}

          {currentScreen === 'analytics' && (
            <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnalyticsScreen
                stats={systemStats}
                onBack={() => setCurrentScreen('dashboard')}
                onOpenDetect={handleOpenCameraDetect}
                lang={lang}
              />
            </motion.div>
          )}

          {currentScreen === 'map' && (
            <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <InsightsMapScreen
                history={detectionHistory}
                onBack={() => setCurrentScreen('dashboard')}
                onSelectRecord={handleSelectRecord}
                lang={lang}
              />
            </motion.div>
          )}

          {currentScreen === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProfileScreen
                onBack={() => setCurrentScreen('dashboard')}
                onOpenAboutModal={() => setIsAboutModalOpen(true)}
                onStartTour={handleStartTourManual}
                lang={lang}
                onToggleLang={handleToggleLang}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                onShowToast={showToast}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Bottom Navigation Bar */}
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenDetect={handleOpenCameraDetect}
          lang={lang}
        />

        {/* Guided Tour Walkthrough */}
        <GuidedTour
          isOpen={isTourOpen}
          onClose={handleCloseTour}
          lang={lang}
        />

        {/* Modals & Drawers */}
        <AboutProjectModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />

        <NotificationDrawer
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />
      </div>
    </DesktopWrapper>
  );
}
