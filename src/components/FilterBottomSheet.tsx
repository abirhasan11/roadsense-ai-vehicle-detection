import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, RotateCcw, Check } from 'lucide-react';
import { FilterOptions, Language } from '../types';
import { getTranslation } from '../lib/translations';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (newFilters: FilterOptions) => void;
  lang: Language;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  lang,
}) => {
  const [draftFilters, setDraftFilters] = React.useState<FilterOptions>(filters);

  React.useEffect(() => {
    setDraftFilters(filters);
  }, [filters, isOpen]);

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      vehicleType: 'all',
      dateRange: 'all',
      sortBy: 'newest',
    };
    setDraftFilters(defaultFilters);
  };

  const handleApply = () => {
    onApplyFilters(draftFilters);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-5 shadow-2xl border-t border-slate-200 dark:border-slate-800 flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Filter className="w-5 h-5 text-[#5A41DE]" />
                <h3 className="text-lg font-bold">
                  {getTranslation(lang, 'filterAndSort')}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vehicle Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Vehicle Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: getTranslation(lang, 'all') },
                  { id: 'autonomous', label: getTranslation(lang, 'autonomous') },
                  { id: 'non-autonomous', label: getTranslation(lang, 'nonAutonomous') },
                ].map((item) => {
                  const active = draftFilters.vehicleType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setDraftFilters({ ...draftFilters, vehicleType: item.id as any })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-center gap-1 ${
                        active
                          ? 'bg-[#5A41DE] text-white border-[#5A41DE] shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Time Period
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'All Time' },
                  { id: 'today', label: 'Today' },
                  { id: 'week', label: 'Past 7 Days' },
                ].map((item) => {
                  const active = draftFilters.dateRange === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setDraftFilters({ ...draftFilters, dateRange: item.id as any })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-center gap-1 ${
                        active
                          ? 'bg-[#5A41DE] text-white border-[#5A41DE] shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sort By
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'newest', label: 'Newest First' },
                  { id: 'oldest', label: 'Oldest First' },
                  { id: 'confidence-high', label: 'Highest Confidence' },
                  { id: 'confidence-low', label: 'Lowest Confidence' },
                ].map((item) => {
                  const active = draftFilters.sortBy === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setDraftFilters({ ...draftFilters, sortBy: item.id as any })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-center gap-1 ${
                        active
                          ? 'bg-[#5A41DE] text-white border-[#5A41DE] shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleApply}
                className="flex-[2] py-3 px-4 rounded-xl bg-[#5A41DE] hover:bg-[#4832be] text-white text-sm font-semibold cursor-pointer shadow-md shadow-[#5A41DE]/25 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
