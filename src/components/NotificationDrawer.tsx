import React from 'react';
import { X, Bell, CheckCircle2, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Autonomous Vehicle Identified',
      description: 'Level 4 RoboTaxi detected with 96.8% confidence in Sector 4 Express Highway.',
      time: '5 mins ago',
      type: 'success',
    },
    {
      id: '2',
      title: 'YOLOv8 Model Calibrated',
      description: 'Model accuracy updated to 92.6% with 14.2ms edge latency.',
      time: '1 hour ago',
      type: 'info',
    },
    {
      id: '3',
      title: 'Non-Autonomous Vehicle Alert',
      description: 'Human-driven sedan detected in Main Street junction.',
      time: '2 hours ago',
      type: 'warning',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm h-full shadow-2xl p-5 flex flex-col justify-between border-l border-[#E4E0FD] dark:border-slate-800 animate-slide-left text-slate-900 dark:text-slate-100">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950/70 text-[#5A41DE] dark:text-purple-300">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="font-display font-bold text-slate-900 dark:text-white text-base">
                System Alerts
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {n.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#1FAE71]" />
                    ) : n.type === 'warning' ? (
                      <AlertCircle className="w-4 h-4 text-[#F5A524]" />
                    ) : (
                      <Zap className="w-4 h-4 text-[#5A41DE]" />
                    )}
                    <h3 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {n.title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                  {n.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
        >
          Dismiss Alerts
        </button>
      </div>
    </div>
  );
};
