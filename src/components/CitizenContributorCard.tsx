import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Zap, Star, Trophy, CheckCircle2, ChevronRight } from 'lucide-react';

interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  desc: string;
}

export const CitizenContributorCard: React.FC = () => {
  const points = 850;
  const nextLevelPoints = 1000;
  const progressPercent = (points / nextLevelPoints) * 100;

  const badges: BadgeItem[] = [
    { id: 'b1', name: 'First Scan', icon: '⚡', unlocked: true, desc: 'Logged 1st vehicle' },
    { id: 'b2', name: 'LiDAR Scout', icon: '🛰️', unlocked: true, desc: 'Identified AV dome' },
    { id: 'b3', name: 'City Mapper', icon: '🏙️', unlocked: true, desc: 'Mapped 3+ sectors' },
    { id: 'b4', name: 'Gold Guardian', icon: '🏆', unlocked: false, desc: 'Reach 1,000 XP' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-[#F5A524]">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Citizen Safety Contributor
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Community AV safety monitoring gamification
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/15 text-[#F5A524] text-xs font-bold border border-amber-500/30">
          Level 3: AV Sentinel
        </span>
      </div>

      {/* XP Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-700 dark:text-slate-300">Level 3 Progress</span>
          <span className="font-mono text-[#F5A524]">
            {points} / {nextLevelPoints} XP
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full shadow-[0_0_8px_#f5a524]"
          />
        </div>
        <p className="text-[10px] text-slate-400 text-right">
          Earn +50 XP for every verified road vehicle detection log.
        </p>
      </div>

      {/* Badges Grid */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
          Achievement Badges
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border text-center transition-all ${
                b.unlocked
                  ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-500/40 text-amber-950 dark:text-amber-100'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
              }`}
            >
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="font-bold text-xs truncate">{b.name}</p>
              <p className="text-[10px] mt-0.5 truncate">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Citizen Impact Summary Footer */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs flex items-center justify-between text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1FAE71]" />
          <span>Community Rank: <strong>Top 5% Contributor</strong></span>
        </div>
        <span className="font-bold text-[#5A41DE]">17 Verified Logs</span>
      </div>
    </div>
  );
};
