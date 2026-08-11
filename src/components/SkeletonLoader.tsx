import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Hero Stats Card Skeleton */}
      <div className="h-40 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />

      {/* Quick Action Grid Skeleton */}
      <div className="grid grid-cols-2 gap-3">
        <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>

      {/* Recent Activity Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
};

export const HistorySkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
      <div className="flex gap-2">
        <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
      ))}
    </div>
  );
};
