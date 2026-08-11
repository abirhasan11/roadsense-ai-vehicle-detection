import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Share2,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Download,
  RotateCcw,
  ShieldCheck,
  Clock,
  MapPin,
  Cpu,
  Radio,
  Check,
  Layers,
  Sparkles,
} from 'lucide-react';
import { RoadSceneSVG } from './RoadSceneSVG';
import { ConfidenceRing } from './ConfidenceRing';
import { LocationMapPreview } from './LocationMapPreview';
import { ImageCompareSlider } from './ImageCompareSlider';
import { ExplainableHeatmapOverlay } from './ExplainableHeatmapOverlay';
import { RiskAssessmentCard } from './RiskAssessmentCard';
import { ConfidenceTimelineChart } from './ConfidenceTimelineChart';
import { DetectionRecord, Language } from '../types';
import { getTranslation } from '../lib/translations';
import { speakText, stopTextToSpeech } from '../lib/speech';
import { Volume2, VolumeX, Eye, Sparkles as SparklesIcon } from 'lucide-react';

interface DetectionResultScreenProps {
  record: DetectionRecord;
  onBack: () => void;
  onViewAnalytics: () => void;
  onScanAnother: () => void;
  lang: Language;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DetectionResultScreen: React.FC<DetectionResultScreenProps> = ({
  record,
  onBack,
  onViewAnalytics,
  onScanAnother,
  lang,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'compare'>('standard');
  const [showExplainableHeatmap, setShowExplainableHeatmap] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Prompt 3: Voice Narration for Accessibility Mode
  const handleToggleVoiceNarration = () => {
    if (isSpeaking) {
      stopTextToSpeech();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `${record.isAutonomous ? 'Autonomous Vehicle Identified' : 'Non-Autonomous Vehicle Identified'}. Confidence Score is ${record.confidenceScore} percent. Location: ${record.location}. LiDAR Point Cloud Density is ${record.sensorData.lidarPoints} points.`;
      const spoken = speakText(textToSpeak, lang);
      if (spoken) {
        setIsSpeaking(true);
        onShowToast("Voice Narration Active", "Speaking detection result aloud", "info");
      }
    }
  };

  // Prompt 4: Shareable Summary Card / Native Web Share API
  const handleShareReport = async () => {
    const reportText = `🚗 [RoadSense AI Report - ${record.id}]\nClassification: ${record.vehicleType}\nConfidence: ${record.confidenceScore}%\nLocation: ${record.location}\nTime: ${record.date} ${record.time}\nModel: ${record.modelUsed}`;

    // Create report image canvas
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Draw gradient background
      const grad = ctx.createLinearGradient(0, 0, 800, 600);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 800, 600);

      // Card Header
      ctx.fillStyle = '#5A41DE';
      ctx.fillRect(40, 40, 720, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('RoadSense AI — Autonomous Detection Report', 60, 90);

      // Metadata
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px monospace';
      ctx.fillText(`ID: ${record.id}`, 60, 180);
      ctx.fillText(`Type: ${record.vehicleType}`, 60, 220);
      ctx.fillText(`Confidence Score: ${record.confidenceScore}%`, 60, 260);
      ctx.fillText(`GPS: ${record.location}`, 60, 300);
      ctx.fillText(`Timestamp: ${record.date} at ${record.time}`, 60, 340);
      ctx.fillText(`LiDAR Point Cloud: ${record.sensorData.lidarPoints.toLocaleString()} pts`, 60, 380);

      // Footer
      ctx.fillStyle = '#1FAE71';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`Status: ${record.isAutonomous ? 'AUTONOMOUS VEHICLE IDENTIFIED' : 'NON-AUTONOMOUS VEHICLE'}`, 60, 460);

      canvas.toBlob(async (blob) => {
        if (blob && navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'report.png', { type: 'image/png' })] })) {
          try {
            const file = new File([blob], `RoadSense_Report_${record.id}.png`, { type: 'image/png' });
            await navigator.share({
              title: `RoadSense AI Detection Report (${record.id})`,
              text: reportText,
              files: [file],
            });
            onShowToast("Report Shared", "Detection report shared via system dialog", "success");
            return;
          } catch (err) {
            // Share cancelled or failed fallback
          }
        }

        // Fallback: Download report card image & copy text
        const downloadUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `RoadSense_Report_${record.id}.png`;
        link.click();

        navigator.clipboard.writeText(reportText);
        setCopied(true);
        onShowToast("Report Downloaded", "Summary report saved as image & copied to clipboard", "success");
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      navigator.clipboard.writeText(reportText);
      setCopied(true);
      onShowToast("Report Copied", "Text summary copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `roadsense-${record.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExported(true);
    onShowToast("Export Complete", `Saved roadsense-${record.id}.json`, "info");
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-28 space-y-5"
    >
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-[#E4E0FD] dark:border-slate-800 px-5 py-4 sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{getTranslation(lang, 'home')}</span>
        </button>

        <h1 className="font-space font-bold text-base sm:text-lg text-slate-900 dark:text-white">
          {getTranslation(lang, 'resultTitle')}
        </h1>

        <div className="flex items-center gap-2">
          {/* Voice Narration Button (Prompt 3) */}
          <button
            onClick={handleToggleVoiceNarration}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_12px_#f5a524]'
                : 'text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 border-[#E4E0FD] dark:border-slate-700'
            }`}
            title="Voice Accessibility Read Aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#5A41DE]" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Voice'}</span>
          </button>

          <button
            onClick={handleShareReport}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-[#E4E0FD] dark:border-slate-700 flex items-center gap-1 text-xs font-bold"
            title="Share Report"
          >
            {copied ? <Check className="w-4 h-4 text-[#1FAE71]" /> : <Share2 className="w-4 h-4 text-[#5A41DE]" />}
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5">
        {/* Banner Alert Header */}
        {record.isAutonomous ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-[#1FAE71]/40 text-emerald-950 dark:text-emerald-200 flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-[#1FAE71] text-white shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-space font-bold text-sm sm:text-base">
                {getTranslation(lang, 'autonomousDetected')}
              </h2>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">
                {getTranslation(lang, 'autonomousDetectedSub')}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-[#E5484D]/40 text-red-950 dark:text-red-200 flex items-center gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-[#E5484D] text-white shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-space font-bold text-sm sm:text-base">
                {getTranslation(lang, 'nonAutonomousDetected')}
              </h2>
              <p className="text-xs text-red-800 dark:text-red-300 mt-0.5">
                {getTranslation(lang, 'nonAutonomousDetectedSub')}
              </p>
            </div>
          </div>
        )}

        {/* View Mode & Explainable AI Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-200 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1 flex-1">
            <button
              onClick={() => {
                setViewMode('standard');
                setShowExplainableHeatmap(false);
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'standard' && !showExplainableHeatmap
                  ? 'bg-white dark:bg-slate-800 text-[#5A41DE] dark:text-purple-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Overlay</span>
            </button>

            <button
              onClick={() => {
                setViewMode('compare');
                setShowExplainableHeatmap(false);
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-white dark:bg-slate-800 text-[#5A41DE] dark:text-purple-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#1FAE71]" />
              <span>Compare</span>
            </button>
          </div>

          {/* Explainable AI (Grad-CAM) Heatmap Toggle (Prompt 1) */}
          <button
            onClick={() => {
              setShowExplainableHeatmap(!showExplainableHeatmap);
              if (!showExplainableHeatmap) setViewMode('standard');
            }}
            className={`py-2 px-3.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showExplainableHeatmap
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_#f5a524]'
                : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25 border border-amber-500/30'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Why did AI detect this? (Grad-CAM)</span>
          </button>
        </div>

        {/* Frame Display with Bounding Box, Compare Slider, or XAI Heatmap */}
        <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden border border-[#E4E0FD] dark:border-slate-800 bg-slate-950 shadow-md">
          {viewMode === 'standard' ? (
            <RoadSceneSVG
              scenePreset={record.scenePreset}
              customImageUri={record.imageUrl}
              boundingBoxes={record.boundingBoxes}
              showLidarRays={record.isAutonomous}
            />
          ) : (
            <ImageCompareSlider
              rawContent={
                <RoadSceneSVG
                  scenePreset={record.scenePreset}
                  customImageUri={record.imageUrl}
                  boundingBoxes={[]} // Clean raw image
                  showLidarRays={false}
                />
              }
              annotatedContent={
                <RoadSceneSVG
                  scenePreset={record.scenePreset}
                  customImageUri={record.imageUrl}
                  boundingBoxes={record.boundingBoxes}
                  showLidarRays={record.isAutonomous}
                />
              }
            />
          )}

          {/* Explainable AI Grad-CAM Saliency Overlay (Prompt 1) */}
          {showExplainableHeatmap && (
            <ExplainableHeatmapOverlay
              isAutonomous={record.isAutonomous}
              confidenceScore={record.confidenceScore}
            />
          )}

          {/* Record Timestamp Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full border border-white/20 z-20 pointer-events-none">
            {record.time}
          </div>
        </div>

        {/* Predictive AI Risk Assessment Card (Prompt 4) */}
        <RiskAssessmentCard
          isAutonomous={record.isAutonomous}
          location={record.location}
        />

        {/* AI Confidence Convergence Timeline Chart (Prompt 5) */}
        <ConfidenceTimelineChart
          finalConfidence={record.confidenceScore}
          processingTimeMs={record.processingTimeMs}
        />

        {/* Circular Gauge Score + Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          {/* Circular Progress Gauge */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 shadow-xs flex flex-col items-center justify-center gap-2">
            <ConfidenceRing
              score={record.confidenceScore}
              isAutonomous={record.isAutonomous}
            />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {getTranslation(lang, 'confidenceScore')}
            </span>
          </div>

          {/* 3 Metric Cards */}
          <div className="sm:col-span-2 grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 shadow-xs">
              <p className="text-[10px] uppercase font-semibold text-slate-400">
                Latency
              </p>
              <p className="text-lg font-bold font-space text-[#5A41DE] mt-0.5">
                {record.processingTimeMs} ms
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 shadow-xs">
              <p className="text-[10px] uppercase font-semibold text-slate-400">
                {getTranslation(lang, 'sensorState')}
              </p>
              <p className="text-sm font-bold font-space text-slate-800 dark:text-slate-200 mt-1 truncate">
                {record.lidarStatus}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 shadow-xs col-span-2">
              <p className="text-[10px] uppercase font-semibold text-slate-400">
                {getTranslation(lang, 'estDistance')}
              </p>
              <p className="text-lg font-bold font-space text-slate-800 dark:text-slate-200 mt-0.5">
                {record.sensorData.distanceMeters} m ({record.sensorData.estimatedSpeedKmh} km/h)
              </p>
            </div>
          </div>
        </div>

        {/* Location Map Preview */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {getTranslation(lang, 'locationMap')}
          </h3>
          <LocationMapPreview
            location={record.location}
            coordinates={record.coordinates}
          />
        </div>

        {/* Detailed Metadata List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-[#E4E0FD] dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm sm:text-base border-b border-slate-100 dark:border-slate-800 pb-2">
            {getTranslation(lang, 'metadataTitle')}
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5A41DE]" />
                {getTranslation(lang, 'classification')}:
              </span>
              <span className="font-semibold text-slate-900 dark:text-white text-right">
                {record.objectType}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#5A41DE]" />
                {getTranslation(lang, 'aiModel')}:
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {record.modelUsed}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5A41DE]" />
                {getTranslation(lang, 'timestamp')}:
              </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {record.date} ({record.time})
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#5A41DE]" />
                {getTranslation(lang, 'gpsLocation')}:
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {record.location}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#1FAE71]" />
                {getTranslation(lang, 'lidarDensity')}:
              </span>
              <span className="font-mono font-bold text-[#1FAE71]">
                {record.sensorData.lidarPoints.toLocaleString()} pts
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onViewAnalytics}
              className="py-3 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#5A41DE] text-[#5A41DE] hover:bg-violet-50 dark:hover:bg-violet-950/40 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <BarChart3 className="w-4 h-4" />
              <span>{getTranslation(lang, 'analytics')}</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="py-3 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#E4E0FD] dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>{exported ? 'Downloaded!' : getTranslation(lang, 'exportJson')}</span>
            </button>
          </div>

          <button
            onClick={onScanAnother}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#5A41DE] hover:bg-[#4E35CD] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{getTranslation(lang, 'scanAnother')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
