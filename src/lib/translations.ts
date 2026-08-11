import { Language } from '../types';

export const translations = {
  en: {
    // App header & subtitle
    appName: "RoadSense AI",
    appSub: "Autonomous Vehicle Detector",
    tagline: "Detect. Predict. Prevent.",
    poweredBy: "Powered by AI & YOLOv8",

    // Navigation & Tabs
    home: "Home",
    history: "History",
    detect: "Detect",
    analytics: "Analytics",
    insightsMap: "Insights Map",
    profile: "Profile",
    settings: "Settings",

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardSub: "Monitor & detect in real-time",
    systemStatus: "System Status",
    active: "Active",
    modelAccuracy: "Model Accuracy",
    latency: "Latency",
    totalScanned: "Total Scanned",
    avRatio: "AV Ratio",
    quickActions: "Quick Actions",
    liveDetection: "Live Detection",
    liveDetectionSub: "Use camera or road simulator",
    uploadImage: "Upload Image",
    uploadImageSub: "Analyze photo from gallery",
    historyLogs: "History Logs",
    historyLogsSub: "View past detection records",
    aboutProject: "About Project",
    aboutProjectSub: "AI architecture & specs",
    recentActivity: "Recent Activity",
    viewAll: "View All",

    // Detect Screen
    detectTitle: "Detect Vehicle",
    cameraSimulator: "Camera / Simulator",
    galleryUpload: "Gallery Upload",
    presetScene: "Preset Scene",
    flash: "Flash",
    switchCamera: "Switch Camera",
    detectNow: "Detect Now",
    scanning: "Scanning frame & sensor feeds...",

    // Result Screen
    resultTitle: "Detection Result",
    autonomousDetected: "Vehicle Detected — Autonomous Vehicle Identified",
    autonomousDetectedSub: "Roof-mounted LiDAR dome and AV sensor pod detected with high confidence.",
    nonAutonomousDetected: "Vehicle Detected — Non-Autonomous Vehicle",
    nonAutonomousDetectedSub: "Standard human-driven vehicle detected (no top LiDAR array present).",
    confidenceScore: "Confidence Score",
    sensorState: "Sensor State",
    estDistance: "Est. Distance",
    metadataTitle: "Detection Record Metadata",
    classification: "Object Classification",
    aiModel: "AI Model Engine",
    timestamp: "Detection Timestamp",
    gpsLocation: "GPS Location",
    locationMap: "Detection Location Map",
    lidarDensity: "LiDAR Point Cloud Density",
    shareReport: "Share Report",
    exportJson: "Export JSON",
    scanAnother: "Scan Another Frame",

    // History Screen
    historyTitle: "Detection History",
    searchPlaceholder: "Search by ID, location or vehicle...",
    all: "All",
    autonomous: "Autonomous",
    nonAutonomous: "Non-Autonomous",
    filterAndSort: "Filter & Sort",
    noRecordsFound: "No matching detection logs found",
    clearHistory: "Clear History",

    // Analytics Screen
    analyticsTitle: "Analytics & Metrics",
    weeklyAccuracy: "Weekly Model Accuracy Trend",
    accuracyTrend30: "30-Day Accuracy Progression",
    inferenceSpeed: "Inference Speed",
    autonomousRatio: "Autonomous Ratio",
    categoryDistribution: "Vehicle Category Distribution",

    // Profile & Settings
    profileTitle: "Settings & Profile",
    darkMode: "Dark Mode Theme",
    language: "Language / ভাষা",
    confidenceCutoff: "Detection Confidence Cutoff",
    highPrecision: "YOLOv8 FP16 High Precision Mode",
    renderLidar: "Render 360° LiDAR Scan Rays",
    notifications: "Real-time System Alerts",

    // Permission Screen
    permissionTitle: "Sensor & Camera Access",
    permissionSub: "RoadSense AI requires camera and location access to detect autonomous vehicles and log spatial coordinates.",
    allowCamera: "Camera Access",
    allowCameraSub: "Captures live road traffic feed for real-time vision processing",
    allowLocation: "Location Access",
    allowLocationSub: "Attaches precise GPS coordinates to autonomous vehicle logs",
    allowAccess: "Allow & Continue",
    skipNow: "Not Now (Use Simulator)",

    // Toast
    toastDetectionSaved: "Detection saved to history logs!",
    toastImageUploaded: "Image uploaded successfully!",
    toastFilterApplied: "Filters applied to list",
    toastCopied: "Detection report copied to clipboard!",
    toastThemeChanged: "Theme updated",
    toastLanguageChanged: "Language changed to English",
  },
  bn: {
    // App header & subtitle
    appName: "রোডসেন্স এআই",
    appSub: "স্বায়ত্তশাসিত যান সনাক্তকরণ সিস্টেম",
    tagline: "সনাক্ত করুন। পূর্বাভাস দিন। প্রতিরোধ করুন।",
    poweredBy: "এআই এবং YOLOv8 দ্বারা পরিচালিত",

    // Navigation & Tabs
    home: "হোম",
    history: "হিস্ট্রি",
    detect: "ডিটেক্ট",
    analytics: "অ্যানালিটিক্স",
    insightsMap: "ইনসাইটস ম্যাপ",
    profile: "প্রোফাইল",
    settings: "সেটিংস",

    // Dashboard
    dashboardTitle: "ড্যাশবোর্ড",
    dashboardSub: "রিয়েল-টাইমে মনিটর ও সনাক্ত করুন",
    systemStatus: "সিস্টেম স্ট্যাটাস",
    active: "সক্রিয়",
    modelAccuracy: "মডেল নির্ভুলতা",
    latency: "ল্যাটেন্সি",
    totalScanned: "মোট স্ক্যানকৃত",
    avRatio: "এভি অনুপাত",
    quickActions: "দ্রুত অ্যাকশন",
    liveDetection: "লাইভ ডিটেকশন",
    liveDetectionSub: "ক্যামেরা বা রোড সিমুলেটর ব্যবহার করুন",
    uploadImage: "ছবি আপলোড",
    uploadImageSub: "গ্যালারি থেকে ছবি স্ক্যান করুন",
    historyLogs: "হিস্ট্রি লগ",
    historyLogsSub: "পূর্বের সনাক্তকরণের তথ্য দেখুন",
    aboutProject: "প্রজেক্ট সম্পর্কিত",
    aboutProjectSub: "এআই আর্কিটেকচার ও স্পেকস",
    recentActivity: "সাম্প্রতিক কার্যক্রম",
    viewAll: "সব দেখুন",

    // Detect Screen
    detectTitle: "যানবাহন সনাক্তকরণ",
    cameraSimulator: "ক্যামেরা / সিমুলেটর",
    galleryUpload: "গ্যালারি আপলোড",
    presetScene: "প্রিসেট সিন",
    flash: "ফ্ল্যাশ",
    switchCamera: "ক্যামেরা পরিবর্তন",
    detectNow: "এখনই সনাক্ত করুন",
    scanning: "ফ্রেম এবং সেন্সর ডেটা স্ক্যান হচ্ছে...",

    // Result Screen
    resultTitle: "সনাক্তকরণের ফলাফল",
    autonomousDetected: "যানবাহন চিহ্নিত — স্বায়ত্তশাসিত (Autonomous) যান সনাক্ত হয়েছে",
    autonomousDetectedSub: "ছাদের উপরে লাইডার (LiDAR) ডোম এবং এভি সেন্সর পড সনাক্ত করা হয়েছে।",
    nonAutonomousDetected: "যানবাহন চিহ্নিত — সাধারণ (Non-Autonomous) ম্যানুয়াল যান",
    nonAutonomousDetectedSub: "সাধারণ মানুষ-চালিত গাড়ি (ছাদে কোনো লাইডার সেন্সর নেই)।",
    confidenceScore: "কনফিডেন্স স্কোর",
    sensorState: "সেন্সর অবস্থা",
    estDistance: "আনুমানিক দূরত্ব",
    metadataTitle: "সনাক্তকরণ রেকর্ডের বিস্তারিত",
    classification: "অবজেক্ট ক্লাসিফিকেশন",
    aiModel: "এআই মডেল ইঞ্জিন",
    timestamp: "সনাক্তকরণের সময়",
    gpsLocation: "জিপিএস অবস্থান",
    locationMap: "সনাক্তকরণের ম্যাপ লোকেশন",
    lidarDensity: "লাইডার পয়েন্ট ক্লাউড ডেনসিটি",
    shareReport: "রিপোর্ট শেয়ার করুন",
    exportJson: "JSON এক্সপোর্ট",
    scanAnother: "পুনরায় স্ক্যান করুন",

    // History Screen
    historyTitle: "সনাক্তকরণের ইতিহাস",
    searchPlaceholder: "আইডি, লোকেশন বা গাড়ির ধরন খুঁজুন...",
    all: "সব",
    autonomous: "স্বায়ত্তশাসিত (AV)",
    nonAutonomous: "সাধারণ যান",
    filterAndSort: "ফিল্টার ও সাজান",
    noRecordsFound: "কোনো মেলানো সনাক্তকরণ লগ পাওয়া যায়নি",
    clearHistory: "হিস্ট্রি মুছুন",

    // Analytics Screen
    analyticsTitle: "অ্যানালিটিক্স ও মেট্রিক্স",
    weeklyAccuracy: "সাপ্তাহিক মডেল অ্যাকুরেসি ট্রেন্ড",
    accuracyTrend30: "৩০ দিনের অ্যাকুরেসি প্রগ্রেস",
    inferenceSpeed: "ইনফারেন্স স্পিড",
    autonomousRatio: "স্বায়ত্তশাসিত অনুপাত",
    categoryDistribution: "যানবাহনের ক্যাটাগরি ডিস্ট্রিবিউশন",

    // Profile & Settings
    profileTitle: "সেটিংস ও প্রোফাইল",
    darkMode: "ডার্ক মোড থিম",
    language: "ভাষা / Language",
    confidenceCutoff: "ডিটেকশন কাট-অফ কনফিডেন্স",
    highPrecision: "YOLOv8 FP16 হাই প্রিসিশন মোড",
    renderLidar: "৩৬০° লাইডার রে দেখান",
    notifications: "রিয়েল-টাইম সিস্টেম অ্যালার্ট",

    // Permission Screen
    permissionTitle: "সেন্সর ও ক্যামেরা পারমিশন",
    permissionSub: "স্বায়ত্তশাসিত যানবাহন সনাক্ত করতে এবং জিপিএস স্থান রেকর্ড করতে রোডসেন্স এআই-এর ক্যামেরা ও লোকেশন অ্যাক্সেস প্রয়োজন।",
    allowCamera: "ক্যামেরা অ্যাক্সেস",
    allowCameraSub: "লাইভ রাস্তার ট্রাফিক ফ্রেম ধারণের জন্য",
    allowLocation: "লোকেশন অ্যাক্সেস",
    allowLocationSub: "গাড়ির সঠিক জিপিএস স্থানাঙ্ক যুক্ত করার জন্য",
    allowAccess: "অনুমতি দিন ও এগিয়ে যান",
    skipNow: "এখন নয় (সিমুলেটর ব্যবহার করুন)",

    // Toast
    toastDetectionSaved: "সনাক্তকরণ ইতিহাস লগে সংরক্ষিত হয়েছে!",
    toastImageUploaded: "ছবি সফলভাবে আপলোড হয়েছে!",
    toastFilterApplied: "ফিল্টার সফলভাবে প্রয়োগ করা হয়েছে",
    toastCopied: "সনাক্তকরণ রিপোর্ট ক্লিপবোর্ডে কপি করা হয়েছে!",
    toastThemeChanged: "থিম পরিবর্তন করা হয়েছে",
    toastLanguageChanged: "ভাষা বাংলায় পরিবর্তিত হয়েছে",
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations['en']): string {
  return translations[lang]?.[key] || translations['en'][key] || key;
}
