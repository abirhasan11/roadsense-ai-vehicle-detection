export type ScreenType = 
  | 'splash' 
  | 'permission'
  | 'dashboard' 
  | 'detect' 
  | 'result' 
  | 'history' 
  | 'analytics' 
  | 'map'
  | 'profile';

export type Language = 'en' | 'bn';
export type ThemeMode = 'light' | 'dark';

export type VehicleType = 
  | 'Autonomous Vehicle' 
  | 'Vehicle Non-Autonomous' 
  | 'Electric Autonomous Shuttle' 
  | 'Standard Delivery Truck';

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  label: string;
  isAutonomous: boolean;
  confidence: number; // percentage e.g. 96.4
}

export interface DetectionRecord {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  vehicleType: VehicleType;
  isAutonomous: boolean;
  confidenceScore: number; // percentage e.g. 94.8
  objectType: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  modelUsed: string;
  processingTimeMs: number;
  lidarStatus: 'Active - 360°' | 'Calibrating' | 'Passive';
  imageUrl?: string;
  scenePreset: 'highway' | 'urban' | 'night' | 'testtrack' | 'custom';
  customImageName?: string;
  boundingBoxes: BoundingBox[];
  sensorData: {
    lidarPoints: number;
    cameraFps: number;
    distanceMeters: number;
    estimatedSpeedKmh: number;
  };
}

export interface SystemStats {
  status: 'Active' | 'Standby' | 'Calibrating';
  modelAccuracy: number;
  totalDetections: number;
  autonomousPercentage: number;
  avgResponseMs: number;
  activeSensors: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface FilterOptions {
  vehicleType: 'all' | 'autonomous' | 'non-autonomous';
  dateRange: 'all' | 'today' | 'week';
  sortBy: 'newest' | 'oldest' | 'confidence-high' | 'confidence-low';
}
