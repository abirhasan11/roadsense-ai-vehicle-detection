import React from 'react';
import { motion } from 'motion/react';
import { Camera, MapPin, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../lib/translations';

interface PermissionScreenProps {
  onGrant: () => void;
  onSkip: () => void;
  lang: Language;
}

export const PermissionScreen: React.FC<PermissionScreenProps> = ({
  onGrant,
  onSkip,
  lang,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#5A41DE]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-60 h-60 bg-[#1FAE71]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 flex justify-between items-center"
      >
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-xs font-medium text-[#6C56EA]">
          <ShieldCheck className="w-4 h-4 text-[#1FAE71]" />
          <span>RoadSense AI Security</span>
        </div>
        <button
          onClick={onSkip}
          className="text-xs text-slate-400 hover:text-white font-medium underline underline-offset-4 cursor-pointer"
        >
          {getTranslation(lang, 'skipNow')}
        </button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="my-auto space-y-6 max-w-sm mx-auto w-full"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5A41DE] to-[#6C56EA] p-0.5 shadow-xl shadow-[#5A41DE]/30 mx-auto flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Zap className="w-8 h-8 text-[#1FAE71]" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-space text-white">
            {getTranslation(lang, 'permissionTitle')}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {getTranslation(lang, 'permissionSub')}
          </p>
        </div>

        {/* Feature Permission List */}
        <div className="space-y-3">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#5A41DE]/20 text-[#6C56EA] shrink-0">
              <Camera className="w-5 h-5 text-[#6C56EA]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">
                {getTranslation(lang, 'allowCamera')}
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight">
                {getTranslation(lang, 'allowCameraSub')}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#1FAE71]/20 text-[#1FAE71] shrink-0">
              <MapPin className="w-5 h-5 text-[#1FAE71]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">
                {getTranslation(lang, 'allowLocation')}
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight">
                {getTranslation(lang, 'allowLocationSub')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pb-6 space-y-3 max-w-sm mx-auto w-full"
      >
        <button
          onClick={onGrant}
          className="w-full py-4 px-6 bg-[#5A41DE] hover:bg-[#4832be] text-white font-semibold text-sm rounded-2xl shadow-lg shadow-[#5A41DE]/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
        >
          <span>{getTranslation(lang, 'allowAccess')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
