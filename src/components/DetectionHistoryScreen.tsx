import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Clock,
  MapPin,
  X,
  Trash2,
  SlidersHorizontal,
  Car,
} from 'lucide-react';
import { RoadSceneSVG } from './RoadSceneSVG';
import { FilterBottomSheet } from './FilterBottomSheet';
import { HistorySkeleton } from './SkeletonLoader';
import { DetectionRecord, FilterOptions, Language } from '../types';
import { getTranslation } from '../lib/translations';

interface DetectionHistoryScreenProps {
  history: DetectionRecord[];
  onSelectRecord: (record: DetectionRecord) => void;
  onBack: () => void;
  onClearHistory?: () => void;
  lang: Language;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DetectionHistoryScreen: React.FC<DetectionHistoryScreenProps> = ({
  history,
  onSelectRecord,
  onBack,
  onClearHistory,
  lang,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    vehicleType: 'all',
    dateRange: 'all',
    sortBy: 'newest',
  });

  // Simulated 600ms skeleton loading on mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort records
  const filteredHistory = history
    .filter((item) => {
      // Vehicle Type Filter
      if (filters.vehicleType === 'autonomous' && !item.isAutonomous) return false;
      if (filters.vehicleType === 'non-autonomous' && item.isAutonomous) return false;

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          item.vehicleType.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.objectType.toLowerCase().includes(query);
        if (!matches) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'oldest') return a.id.localeCompare(b.id);
      if (filters.sortBy === 'confidence-high') return b.confidenceScore - a.confidenceScore;
      if (filters.sortBy === 'confidence-low') return a.confidenceScore - b.confidenceScore;
      return b.id.localeCompare(a.id); // newest first
    });

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    onShowToast("Filters Applied", "History list updated with selected criteria", "info");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-28"
    >
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-[#E4E0FD] dark:border-slate-800 px-5 py-4 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{getTranslation(lang, 'home')}</span>
        </button>

        <h1 className="font-space font-bold text-base sm:text-lg text-slate-900 dark:text-white">
          {getTranslation(lang, 'historyTitle')}
        </h1>

        {onClearHistory && (
          <button
            onClick={() => {
              onClearHistory();
              onShowToast("History Cleared", "All logs removed from local state", "warning");
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
            title="Clear History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-4">
        {/* Search & Filter Controls */}
        <div className="space-y-3">
          {/* Search Row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getTranslation(lang, 'searchPlaceholder')}
                className="w-full bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#5A41DE]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Bottom Sheet Trigger */}
            <button
              onClick={() => setIsFilterSheetOpen(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#5A41DE] font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#5A41DE]" />
              <span className="hidden sm:inline">{getTranslation(lang, 'filterAndSort')}</span>
            </button>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button
              onClick={() => setFilters({ ...filters, vehicleType: 'all' })}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                filters.vehicleType === 'all'
                  ? 'bg-[#5A41DE] text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-[#E4E0FD] dark:border-slate-800'
              }`}
            >
              {getTranslation(lang, 'all')} ({history.length})
            </button>

            <button
              onClick={() => setFilters({ ...filters, vehicleType: 'autonomous' })}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                filters.vehicleType === 'autonomous'
                  ? 'bg-[#1FAE71] text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-[#E4E0FD] dark:border-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>{getTranslation(lang, 'autonomous')}</span>
            </button>

            <button
              onClick={() => setFilters({ ...filters, vehicleType: 'non-autonomous' })}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                filters.vehicleType === 'non-autonomous'
                  ? 'bg-[#E5484D] text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-[#E4E0FD] dark:border-slate-800'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>{getTranslation(lang, 'nonAutonomous')}</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton OR Records List */}
        {loading ? (
          <HistorySkeleton />
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-[#E4E0FD] dark:border-slate-800 p-6 text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-slate-800 text-[#5A41DE] flex items-center justify-center mx-auto">
              <Car className="w-6 h-6" />
            </div>
            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
              {getTranslation(lang, 'noRecordsFound')}
            </p>
            <p className="text-xs text-slate-400">
              Try clearing search terms or adjusting the filter options.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({ vehicleType: 'all', dateRange: 'all', sortBy: 'newest' });
              }}
              className="px-4 py-2 bg-[#5A41DE] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((record) => (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-[#E4E0FD] dark:border-slate-800 hover:border-[#5A41DE] hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group"
              >
                {/* Thumbnail Preview Box */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800">
                  <RoadSceneSVG
                    scenePreset={record.scenePreset}
                    customImageUri={record.imageUrl}
                    boundingBoxes={record.boundingBoxes}
                    showLidarRays={false}
                  />
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">
                      {record.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        record.isAutonomous
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#1FAE71]'
                          : 'bg-red-100 dark:bg-red-950/60 text-[#E5484D]'
                      }`}
                    >
                      {record.isAutonomous ? getTranslation(lang, 'autonomous') : getTranslation(lang, 'nonAutonomous')}
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm truncate group-hover:text-[#5A41DE] transition-colors">
                    {record.vehicleType}
                  </h3>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      {record.time}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {record.location}
                    </span>
                  </div>
                </div>

                {/* Score & Arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-slate-400 font-medium">Match</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {record.confidenceScore}%
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#5A41DE] group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet Modal */}
      <FilterBottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
        lang={lang}
      />
    </motion.div>
  );
};
