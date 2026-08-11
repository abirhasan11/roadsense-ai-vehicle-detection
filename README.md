Overview
Project Title & Tagline:
Title: 🚗 RoadSense AI
Tagline: Next-Generation Autonomous Vehicle Detection & Explainable Safety Intelligence Platform — Detect. Predict. Prevent.
Tech Badges for React, TypeScript, Vite, Tailwind CSS, Motion (Framer Motion), and Google Gemini.
Problem Statement:
Outlines the rapid commercial growth of Autonomous Vehicles (AVs) and highlights three major industry gaps: black-box AI decisions, lack of predictive urban risk analytics, and inaccessible researcher interfaces.
Solution Overview:
Details RoadSense AI's full-stack architecture, focusing on real-time hardware profiling (roof LiDAR domes, bumper radar), Explainable AI (Grad-CAM XAI), predictive safety alerts, and inclusive accessibility design.
Technical Stack:
Frontend Core: React 18.3, TypeScript 5.5, Tailwind CSS 4.0, Motion (Framer Motion).
Build & Server: Vite 5.4, Express.js (Node.js), esbuild bundling.
AI & Browser APIs: @google/genai SDK (Gemini 2.5 Flash), Web Speech API (SpeechSynthesis), Web Audio API, Recharts, and Web Share API.
Key Features:
Camera Integration: Live device webcam streaming via navigator.mediaDevices.getUserMedia, split-screen compare mode (raw optical vs. AI/LiDAR overlay), canvas snapshot capture, and multi-format gallery upload.
Real-Time Simulation: Continuous 1.5s live scanner mode, Grad-CAM saliency heatmaps highlighting neural activation zones, animated convergence timeline SVG charts, and predictive traffic safety warnings.
History Tracking: Comprehensive record logs with LiDAR point density, search & filtering, city-wide AV density insights vector map, and JSON/PNG export capabilities.
Accessibility: Voice-guided read-aloud (speechSynthesis), bilingual internationalization (English & Bengali), dual-tone Web Audio cues, haptic vibration feedback, and citizen contributor gamification (XP levels & badges).
Installation Guide:
Prerequisites (Node.js v18+, npm v9+).
Step-by-step shell commands for git clone, npm install, .env configuration (GEMINI_API_KEY), running the development server (npm run dev), and building/starting for production (npm run build && npm run start).
Future Roadmap:
Client-side WebGPU acceleration for zero-latency edge inference.
Real-time V2X (Vehicle-to-Everything) WebSocket telemetry listeners.
Multi-camera stream stitching for 360° bird's-eye view (BEV) road grids.
Decentralized IPFS transaction logging for community road safety audits.
Native mobile SDK packaging (React Native / Expo).
