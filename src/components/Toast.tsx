import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-4 inset-x-4 z-50 max-w-md mx-auto pointer-events-none flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-700 shadow-xl flex items-center justify-between gap-3 overflow-hidden relative"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-xl bg-[#5A41DE]/20 text-[#1FAE71]">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#1FAE71]" />
          ) : toast.type === 'warning' ? (
            <AlertCircle className="w-5 h-5 text-[#F5A524]" />
          ) : (
            <Info className="w-5 h-5 text-[#5A41DE]" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-xs text-white">{toast.title}</h4>
          <p className="text-[11px] text-slate-300">{toast.message}</p>
        </div>
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 3.2, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-0.5 bg-[#5A41DE]"
      />
    </motion.div>
  );
};
