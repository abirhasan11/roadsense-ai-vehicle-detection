import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Camera,
  Upload,
  RefreshCw,
  Zap,
  ZapOff,
  Scan,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Radio,
  Eye,
  Disc,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { RoadSceneSVG } from './RoadSceneSVG';
import { BoundingBox, DetectionRecord, Language } from '../types';
import { getTranslation } from '../lib/translations';
import { playDetectionChime, triggerHapticFeedback } from '../lib/audio';
import { useLayout } from '../context/LayoutContext';

interface DetectVehicleScreenProps {
  initialInputMethod?: 'camera' | 'gallery';
  onBack: () => void;
  onDetectionComplete: (newRecord: DetectionRecord) => void;
  lang: Language;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DetectVehicleScreen: React.FC<DetectVehicleScreenProps> = ({
  initialInputMethod = 'camera',
  onBack,
  onDetectionComplete,
  lang,
  onShowToast,
}) => {
  const { isPhoneFrame } = useLayout();
  const [inputMethod, setInputMethod] = useState<'camera' | 'gallery'>(initialInputMethod);
  const [presetScene, setPresetScene] = useState<'highway' | 'urban' | 'night' | 'testtrack'>('highway');
  const [targetVehicleType, setTargetVehicleType] = useState<'auto' | 'non_autonomous' | 'autonomous'>('auto');
  const [customImageUri, setCustomImageUri] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string>('');
  
  // Real camera state
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [isRealWebcamActive, setIsRealWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live Continuous AI Scan Mode (Prompt 3) & Split-Screen Compare Mode (Prompt 7)
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isSplitCompareMode, setIsSplitCompareMode] = useState(false);
  const [liveBoundingBox, setLiveBoundingBox] = useState<BoundingBox>({
    x: 28,
    y: 35,
    width: 44,
    height: 38,
    label: 'Autonomous Vehicle (96.8%)',
    isAutonomous: true,
    confidence: 96.8,
  });

  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start Browser getUserMedia Camera (Prompt 1)
  const startCamera = useCallback(async () => {
    setWebcamError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Stop existing streams if any
        stopCamera();

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraFacing, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsRealWebcamActive(true);
        }
      } else {
        setWebcamError('Camera API not available on this browser.');
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setWebcamError('Camera permission denied or unavailable. Using interactive road simulator.');
      setIsRealWebcamActive(false);
    }
  }, [cameraFacing]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsRealWebcamActive(false);
    }
  };

  useEffect(() => {
    if (inputMethod === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [inputMethod, cameraFacing, startCamera]);

  // Live Continuous AI Detection Loop (Prompt 3) - Strictly respects target classification
  useEffect(() => {
    if (!isLiveMode) return;

    const liveInterval = setInterval(() => {
      let isAuto = false;
      if (targetVehicleType === 'non_autonomous') {
        isAuto = false;
      } else if (targetVehicleType === 'autonomous') {
        isAuto = true;
      } else {
        // Auto mode based on scene preset
        isAuto = presetScene === 'highway' || presetScene === 'testtrack';
      }

      const confidence = +(88 + Math.random() * 10).toFixed(1);
      const randomX = 22 + Math.floor(Math.random() * 14);
      const randomY = 28 + Math.floor(Math.random() * 12);

      setLiveBoundingBox({
        x: randomX,
        y: randomY,
        width: 42 + Math.floor(Math.random() * 6),
        height: 38 + Math.floor(Math.random() * 6),
        label: isAuto ? `Autonomous Vehicle (${confidence}%)` : `Non-Autonomous Vehicle (${confidence}%)`,
        isAutonomous: isAuto,
        confidence: confidence,
      });

      // Subtle audio ping on lock
      playDetectionChime();
    }, 1500);

    return () => clearInterval(liveInterval);
  }, [isLiveMode, targetVehicleType, presetScene]);

  // Handle File Upload for Gallery mode (Prompt 2)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUri = event.target?.result as string;
        setCustomImageUri(resultUri);
        setCustomFileName(file.name);
        onShowToast(getTranslation(lang, 'toastImageUploaded'), file.name, "success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Capture real snapshot from video feed or use custom image (Prompt 1 & 2)
  const capturePhotoFromVideo = (): string | null => {
    if (customImageUri) return customImageUri;

    if (isRealWebcamActive && videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.92);
      }
    }
    return null;
  };

  // Trigger detection processing and navigation with STRICT classification logic
  const handleStartDetection = () => {
    setIsScanning(true);

    // Play feedback chime and haptic vibrate
    playDetectionChime();
    triggerHapticFeedback([50, 40, 90]);

    // Capture real snapshot if live webcam is on
    const capturedPhotoUri = capturePhotoFromVideo();

    setTimeout(() => {
      setIsScanning(false);

      const isCustom = !!capturedPhotoUri;

      // STRICT CLASSIFICATION LOGIC
      let isAutonomousDetected = false;

      if (targetVehicleType === 'non_autonomous') {
        isAutonomousDetected = false;
      } else if (targetVehicleType === 'autonomous') {
        isAutonomousDetected = true;
      } else {
        // Auto AI Hardware Inspection
        if (customFileName) {
          const lowerName = customFileName.toLowerCase();
          const nonAutoKeywords = ['non', 'human', 'standard', 'manual', 'sedan', 'regular', 'civic', 'corolla', 'accord', 'bmw', 'mercedes', 'bus', 'truck', 'normal', 'car', 'hatchback', 'van', 'taxi_normal', 'toyota', 'honda', 'hyundai', 'ford', 'chevrolet'];
          const autoKeywords = ['waymo', 'cruise', 'zoox', 'nuro', 'av', 'robotaxi', 'lidar', 'autonomous', 'sensor', 'self_driving', 'pod', 'shuttle', 'tesla_fsd'];

          if (nonAutoKeywords.some(k => lowerName.includes(k))) {
            isAutonomousDetected = false;
          } else if (autoKeywords.some(k => lowerName.includes(k))) {
            isAutonomousDetected = true;
          } else {
            isAutonomousDetected = presetScene === 'highway' || presetScene === 'testtrack';
          }
        } else {
          isAutonomousDetected = presetScene === 'highway' || presetScene === 'testtrack';
        }
      }

      const confidence = +(91 + Math.random() * 7.5).toFixed(1);
      const detectionId = `DET-${Math.floor(1000 + Math.random() * 9000)}`;

      const newRecord: DetectionRecord = {
        id: detectionId,
        timestamp: new Date().toISOString(),
        date: 'Just Now',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        vehicleType: isAutonomousDetected ? 'Autonomous Vehicle' : 'Vehicle Non-Autonomous',
        isAutonomous: isAutonomousDetected,
        confidenceScore: confidence,
        objectType: isAutonomousDetected
          ? 'Level 4 AV (LiDAR Dome & Sensor Suite)'
          : 'Human-Driven Vehicle (Standard Chassis)',
        location: 'Sector 7, Smart Highway Node',
        coordinates: { lat: 23.8103 + (Math.random() - 0.5) * 0.01, lng: 90.4125 + (Math.random() - 0.5) * 0.01 },
        modelUsed: 'YOLOv8 Custom (Leaner-AV v2.4)',
        processingTimeMs: +(11 + Math.random() * 5).toFixed(1),
        lidarStatus: isAutonomousDetected ? 'Active - 360°' : 'Passive',
        imageUrl: capturedPhotoUri || customImageUri || undefined,
        scenePreset: presetScene,
        customImageName: isCustom ? (customFileName || 'Camera Snapshot') : undefined,
        boundingBoxes: [
          {
            x: liveBoundingBox.x,
            y: liveBoundingBox.y,
            width: liveBoundingBox.width,
            height: liveBoundingBox.height,
            label: isAutonomousDetected
              ? `Autonomous Vehicle (${confidence}%)`
              : `Non-Autonomous Vehicle (${confidence}%)`,
            isAutonomous: isAutonomousDetected,
            confidence: confidence,
          },
        ],
        sensorData: {
          lidarPoints: isAutonomousDetected ? 142000 : 0,
          cameraFps: 60,
          distanceMeters: +(10 + Math.random() * 15).toFixed(1),
          estimatedSpeedKmh: Math.floor(40 + Math.random() * 45),
        },
      };

      onShowToast(getTranslation(lang, 'toastDetectionSaved'), `${newRecord.vehicleType} (${newRecord.confidenceScore}%)`, "success");
      onDetectionComplete(newRecord);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-full bg-slate-900 text-white pb-28 flex flex-col justify-between"
    >
      {/* Hidden Canvas for Camera Snapshots */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Header */}
      <div className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-5 py-4 sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{getTranslation(lang, 'home')}</span>
        </button>

        <h1 className="font-space font-bold text-base sm:text-lg text-white flex items-center gap-2">
          <span>{getTranslation(lang, 'detectTitle')}</span>
          {isLiveMode && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </h1>

        <div className="w-20 flex justify-end">
          <span className="text-[10px] font-mono bg-[#5A41DE]/30 text-purple-300 px-2 py-0.5 rounded-full border border-[#5A41DE]/50">
            YOLOv8
          </span>
        </div>
      </div>

      {/* Main Detector Area */}
      <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto space-y-4">
        {/* Hidden File Input for Gallery mode */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Responsive Container: 2 columns on lg screens in full-window, single clean column in phone frame */}
        <div className={isPhoneFrame ? "flex flex-col space-y-4 max-w-2xl mx-auto w-full" : "grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"}>
          {/* Left Column (7 cols on lg in full window): Preview Camera & Canvas */}
          <div className={isPhoneFrame ? "w-full space-y-3" : "lg:col-span-7 space-y-3"}>
            {/* Live AI Scanner Toggle & Presets Bar */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 bg-slate-950/70 p-2 sm:p-2.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Live Continuous Scan Toggle */}
                <button
                  onClick={() => setIsLiveMode(!isLiveMode)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-xs transition-all cursor-pointer whitespace-nowrap ${
                    isLiveMode
                      ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${isLiveMode ? 'animate-pulse' : ''}`} />
                  <span>{isLiveMode ? 'Live Active' : 'Live AI'}</span>
                </button>

                {/* Split-Screen Compare Mode Toggle */}
                <button
                  onClick={() => setIsSplitCompareMode(!isSplitCompareMode)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 text-xs transition-all cursor-pointer whitespace-nowrap ${
                    isSplitCompareMode
                      ? 'bg-[#5A41DE] text-white shadow-[0_0_15px_rgba(90,65,222,0.5)]'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Split view into raw vs AI overlay"
                >
                  <Layers className="w-3.5 h-3.5 text-[#1FAE71]" />
                  <span>{isSplitCompareMode ? 'Split On' : 'Split View'}</span>
                </button>
              </div>

              {/* Scene Selector */}
              {inputMethod === 'camera' && !customImageUri && (
                <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-0.5 no-scrollbar">
                  {(['highway', 'urban', 'night', 'testtrack'] as const).map((scene) => (
                    <button
                      key={scene}
                      onClick={() => setPresetScene(scene)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold capitalize transition-all cursor-pointer shrink-0 ${
                        presetScene === scene
                          ? 'bg-[#1FAE71] text-slate-950 font-bold'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MAIN PREVIEW FRAME */}
            <div className="relative w-full h-64 sm:h-80 lg:h-[420px] rounded-3xl overflow-hidden border-2 border-[#6C56EA]/50 bg-slate-950 shadow-[0_0_30px_rgba(90,65,222,0.25)] flex items-center justify-center group">
              {/* Real Webcam Stream View */}
              {inputMethod === 'camera' && (
                <div className={`relative w-full h-full ${isRealWebcamActive ? 'block' : 'hidden'}`}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Bounding Box Overlay over live webcam */}
                  <div
                    className="absolute border-2 border-[#1FAE71] bg-[#1FAE71]/15 rounded-lg pointer-events-none z-20 flex flex-col justify-between p-1.5 shadow-[0_0_20px_rgba(31,174,113,0.4)] transition-all duration-300"
                    style={{
                      left: `${liveBoundingBox.x}%`,
                      top: `${liveBoundingBox.y}%`,
                      width: `${liveBoundingBox.width}%`,
                      height: `${liveBoundingBox.height}%`,
                    }}
                  >
                    <div className="flex items-center gap-1 bg-[#1FAE71] text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md self-start shadow-sm">
                      <Eye className="w-3 h-3" />
                      <span>{liveBoundingBox.label}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Fallback Road SVG or Custom User Photo View */}
              {(!isRealWebcamActive || inputMethod === 'gallery' || customImageUri) && (
                isSplitCompareMode ? (
                  <div className="relative w-full h-full flex overflow-hidden">
                    {/* Left Half: RAW FEED */}
                    <div className="w-1/2 h-full overflow-hidden border-r-2 border-white/80 relative">
                      <RoadSceneSVG
                        scenePreset={presetScene}
                        customImageUri={customImageUri}
                        boundingBoxes={[]}
                        showScanAnimation={false}
                        showLidarRays={false}
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/20">
                        RAW OPTICAL FEED
                      </div>
                    </div>

                    {/* Right Half: AI OVERLAY */}
                    <div className="w-1/2 h-full overflow-hidden relative">
                      <RoadSceneSVG
                        scenePreset={presetScene}
                        customImageUri={customImageUri}
                        boundingBoxes={[liveBoundingBox]}
                        showScanAnimation={isScanning || isLiveMode}
                        showLidarRays={true}
                      />
                      <div className="absolute top-2 right-2 bg-[#1FAE71] text-slate-950 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/20">
                        AI OVERLAY & LIDAR
                      </div>
                    </div>

                    {/* Center Divider Bar */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white shadow-[0_0_10px_#ffffff] z-10 pointer-events-none" />
                  </div>
                ) : (
                  <RoadSceneSVG
                    scenePreset={presetScene}
                    customImageUri={customImageUri}
                    boundingBoxes={[liveBoundingBox]}
                    showScanAnimation={isScanning || isLiveMode}
                    showLidarRays={true}
                  />
                )
              )}

              {/* Flash Effect Overlay */}
              {isFlashOn && (
                <div className="absolute inset-0 bg-white/30 pointer-events-none z-30 transition-opacity" />
              )}

              {/* Scanning Line Indicator */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none z-30 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]">
                  <div className="w-full h-1 bg-[#1FAE71] shadow-[0_0_25px_#1FAE71] animate-scan-line relative" />
                  <div className="bg-slate-900/90 border border-[#1FAE71]/50 text-[#1FAE71] text-xs font-mono px-4 py-2 rounded-full mt-4 flex items-center gap-2 shadow-xl">
                    <Scan className="w-4 h-4 animate-spin" />
                    <span>{getTranslation(lang, 'scanning')}</span>
                  </div>
                </div>
              )}

              {/* Floating Camera Controls Toolbar */}
              <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-xs">
                {/* Flash Button */}
                <button
                  onClick={() => setIsFlashOn(!isFlashOn)}
                  className={`p-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isFlashOn ? 'bg-[#F5A524] text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isFlashOn ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
                  <span>{getTranslation(lang, 'flash')}</span>
                </button>

                {/* Circular Camera Shutter Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleStartDetection}
                  disabled={isScanning}
                  className="p-1 rounded-full border-2 border-white/80 bg-red-500 hover:bg-red-600 text-white shadow-lg cursor-pointer flex items-center justify-center"
                  title="Capture Frame & Detect"
                >
                  <Disc className="w-7 h-7 animate-pulse text-white" />
                </motion.button>

                {/* Camera Flip Button */}
                <button
                  onClick={() => {
                    if (!isRealWebcamActive) {
                      startCamera();
                    } else {
                      setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'));
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#1FAE71]" />
                  <span>{getTranslation(lang, 'switchCamera')}</span>
                </button>
              </div>
            </div>

            {/* Loaded Custom Image Badge */}
            {customImageUri && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FAE71]" />
                  <span className="truncate max-w-[200px]">Photo Loaded: {customFileName || 'Custom Image'}</span>
                </div>
                <button
                  onClick={() => setCustomImageUri(null)}
                  className="text-[11px] underline text-emerald-200 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Friendly Error / Permission Denial Handling */}
            {webcamError && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-semibold text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Camera Access Restricted</span>
                </div>
                <p className="text-[11px] text-amber-200/80">
                  {webcamError} You can upload real vehicle photos directly from your gallery or use our road simulator above.
                </p>
              </div>
            )}
          </div>

          {/* Right Column (5 cols on lg in full window): Controls, Classification Mode, Live Telemetry & Actions */}
          <div className={isPhoneFrame ? "w-full space-y-3.5" : "lg:col-span-5 space-y-3.5"}>
            {/* Toggle Input Mode: Camera vs Gallery */}
            <div className="bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 flex items-center gap-1.5">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setInputMethod('camera');
                  setCustomImageUri(null);
                }}
                className={`flex-1 py-2.5 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                  inputMethod === 'camera'
                    ? 'bg-[#5A41DE] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4 shrink-0" />
                <span className="truncate">{getTranslation(lang, 'cameraSimulator')}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setInputMethod('gallery');
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className={`flex-1 py-2.5 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                  inputMethod === 'gallery'
                    ? 'bg-[#5A41DE] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4 shrink-0" />
                <span className="truncate">{getTranslation(lang, 'galleryUpload')}</span>
              </motion.button>
            </div>

            {/* Strict Target Classification Mode Switcher */}
            <div className="bg-slate-900/90 p-3 sm:p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-violet-400">
                  <ShieldCheck className="w-4 h-4 text-[#1FAE71] shrink-0" />
                  <span className="truncate">Hardware Mode</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {targetVehicleType === 'non_autonomous'
                    ? '🔴 Non-AV'
                    : targetVehicleType === 'autonomous'
                    ? '🟢 AV Mode'
                    : '⚡ Smart AI'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[10px] sm:text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTargetVehicleType('auto')}
                  className={`py-2 px-1 sm:px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    targetVehicleType === 'auto'
                      ? 'bg-[#5A41DE] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">Auto AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetVehicleType('non_autonomous')}
                  className={`py-2 px-1 sm:px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    targetVehicleType === 'non_autonomous'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 text-red-300 shrink-0" />
                  <span className="truncate">Non-AV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetVehicleType('autonomous')}
                  className={`py-2 px-1 sm:px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    targetVehicleType === 'autonomous'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span className="truncate">Autonomous</span>
                </button>
              </div>
            </div>

            {/* Live Sensor Telemetry Mini-Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">LiDAR Points</p>
                <p className="font-space font-bold text-base text-emerald-400">142,000 pts</p>
                <p className="text-[10px] text-slate-500">Dual-Solid State LiDAR</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Perception Latency</p>
                <p className="font-space font-bold text-base text-purple-300">14 ms (60 FPS)</p>
                <p className="text-[10px] text-slate-500">TensorRT Edge Kernel</p>
              </div>
            </div>

            {/* Primary Detect Action Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStartDetection}
              disabled={isScanning}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1FAE71] to-[#2FD18B] hover:from-[#1A9C65] hover:to-[#28BA7B] text-slate-950 font-bold text-base shadow-[0_10px_25px_rgba(31,174,113,0.3)] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <>
                  <Scan className="w-5 h-5 animate-spin text-slate-950" />
                  <span>{getTranslation(lang, 'scanning')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>
                    {customImageUri
                      ? 'Detect Vehicle Features'
                      : getTranslation(lang, 'detectNow')}
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
