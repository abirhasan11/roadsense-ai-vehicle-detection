import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, PieChart, TrendingUp, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { weeklyAccuracyData } from '../data/mockData';
import { SystemStats, Language } from '../types';
import { getTranslation } from '../lib/translations';
import { useLayout } from '../context/LayoutContext';

interface AnalyticsScreenProps {
  stats: SystemStats;
  onBack: () => void;
  onOpenDetect: () => void;
  lang: Language;
}

const trend30Data = [
  { day: 'Day 1', accuracy: 91.2 },
  { day: 'Day 5', accuracy: 92.5 },
  { day: 'Day 10', accuracy: 93.8 },
  { day: 'Day 15', accuracy: 94.6 },
  { day: 'Day 20', accuracy: 95.1 },
  { day: 'Day 25', accuracy: 96.0 },
  { day: 'Day 30', accuracy: 96.8 },
];

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  stats,
  onBack,
  lang,
}) => {
  const { isPhoneFrame } = useLayout();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 ${isPhoneFrame ? 'pb-28' : 'pb-12 md:pb-8'}`}
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
          {getTranslation(lang, 'analyticsTitle')}
        </h1>

        <div className="w-8" />
      </div>

      <div className={`w-full mx-auto space-y-5 ${isPhoneFrame ? 'p-4 sm:p-5 max-w-2xl' : 'p-4 sm:p-6 lg:p-8 max-w-6xl'}`}>
        <div className={isPhoneFrame ? "space-y-5" : "grid grid-cols-1 lg:grid-cols-2 gap-5 items-start"}>
          {/* Column 1: Weekly Accuracy & 2-Column KPI Cards */}
          <div className="space-y-5">
            {/* Weekly Accuracy Bar Chart with Recharts */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#5A41DE]" />
                    <h2 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {getTranslation(lang, 'weeklyAccuracy')}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Average detection precision across 7-day test cycles
                  </p>
                </div>
                <span className="text-xs font-bold text-[#1FAE71] bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-[#1FAE71]/30">
                  Avg: {stats.modelAccuracy}%
                </span>
              </div>

              <div className="h-48 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAccuracyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis domain={[80, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFF',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                      formatter={(val: any) => [`${val}%`, 'Accuracy']}
                    />
                    <Bar dataKey="accuracy" fill="#5A41DE" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2-Column KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-[#5A41DE] flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <p className="text-[11px] uppercase font-semibold text-slate-400">
                  {getTranslation(lang, 'inferenceSpeed')}
                </p>
                <p className="text-xl font-bold font-space text-slate-900 dark:text-white">
                  {stats.avgResponseMs} ms
                </p>
                <p className="text-[10px] text-emerald-600 font-medium">
                  Real-time 60 FPS
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#1FAE71] flex items-center justify-center">
                  <PieChart className="w-4 h-4" />
                </div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">
                  {getTranslation(lang, 'autonomousRatio')}
                </p>
                <p className="text-xl font-bold font-space text-slate-900 dark:text-white">
                  {stats.autonomousPercentage}%
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Self-Driving Fleet Ratio
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: 30-Day Trend & Category Distribution */}
          <div className="space-y-5">
            {/* 30-Day Trend Line Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#1FAE71]" />
                    <h2 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {getTranslation(lang, 'accuracyTrend30')}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Model optimization gain over past 30 days
                  </p>
                </div>
                <span className="text-xs font-bold text-[#5A41DE] bg-violet-50 dark:bg-violet-950/50 px-2.5 py-1 rounded-full border border-[#5A41DE]/30">
                  +5.6% Growth
                </span>
              </div>

              <div className="h-48 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend30Data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis domain={[90, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFF',
                        fontSize: '12px',
                      }}
                      formatter={(val: any) => [`${val}%`, 'Accuracy']}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#1FAE71"
                      strokeWidth={3}
                      dot={{ fill: '#1FAE71', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detection Volume Breakdown */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm">
                {getTranslation(lang, 'categoryDistribution')}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Autonomous Vehicles (Level 4/5)</span>
                    <span className="text-[#1FAE71]">68.4%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-[#1FAE71] h-full rounded-full" style={{ width: '68.4%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Conventional Non-Autonomous</span>
                    <span className="text-[#E5484D]">24.2%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-[#E5484D] h-full rounded-full" style={{ width: '24.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Autonomous Shuttles & Delivery</span>
                    <span className="text-[#F5A524]">7.4%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-[#F5A524] h-full rounded-full" style={{ width: '7.4%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
