import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ShieldAlert, Clock, Eye, CheckCircle2 } from 'lucide-react';

interface RiskAssessmentCardProps {
  isAutonomous: boolean;
  location: string;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({
  isAutonomous,
  location,
}) => {
  const riskScore = isAutonomous ? 68 : 24;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/40 text-amber-950 dark:text-amber-100 shadow-xs space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-space font-bold text-sm sm:text-base text-amber-900 dark:text-amber-200">
              Predictive AI Risk Assessment
            </h3>
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              Pattern analysis for {location}
            </p>
          </div>
        </div>

        {/* Risk Severity Badge */}
        <div className="text-right">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 font-mono text-xs font-bold border border-amber-500/40">
            {isAutonomous ? 'MODERATE RISK (68%)' : 'LOW RISK (24%)'}
          </span>
        </div>
      </div>

      {/* Warning Alert Text */}
      <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
        {isAutonomous ? (
          <p>
            <strong>⚠ Traffic Safety Alert:</strong> High autonomous-vehicle testing density detected in this sector. Pedestrians & cyclists are advised to maintain a <strong>15–20m safety buffer</strong> during peak afternoon hours (2:00 PM – 4:30 PM).
          </p>
        ) : (
          <p>
            <strong>✓ Standard Traffic Conditions:</strong> Standard human-operated vehicle detected. Regular braking distances and standard driver reaction times apply in this lane.
          </p>
        )}
      </div>

      {/* Safety Micro Badges */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold">
        <div className="px-2.5 py-1 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-500" />
          <span>Testing Peak: 2–4 PM</span>
        </div>
        <div className="px-2.5 py-1 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-center gap-1">
          <Eye className="w-3 h-3 text-amber-500" />
          <span>V2X Beacon Active</span>
        </div>
        <div className="px-2.5 py-1 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-[#1FAE71]" />
          <span>Speed Limit: 40 km/h</span>
        </div>
      </div>
    </motion.div>
  );
};
