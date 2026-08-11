<div align="center">

# 🚗 RoadSense AI
### Next-Generation Autonomous Vehicle Detection & Explainable Safety Intelligence Platform

**Detect. Predict. Prevent.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-11.x-E91E63?logo=framer&logoColor=white)](https://motion.dev/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?logo=googlecloud&logoColor=white)](https://ai.google.dev/)

---

</div>

## 📌 Problem Statement

The rapid commercial expansion of **Autonomous Vehicles (AVs)**—such as self-driving robotaxis, unmanned shuttles, and autonomous freight trucks—presents new challenges for urban infrastructure, municipal traffic management, and pedestrian safety. 

Current computer vision solutions face three critical limitations:
1. **Black-Box Decision Making**: Conventional object detectors output static 2D bounding boxes without explaining *why* a vehicle was classified as autonomous (e.g., distinguishing a standard passenger sedan from an AV prototype equipped with roof LiDAR pods and side camera arrays).
2. **Lack of Predictive Urban Context**: Individual vehicle detections are rarely connected to macro-level city traffic risk patterns or regional safety advisories for pedestrians.
3. **Inaccessible Interfaces**: Complex analytical tools often neglect accessibility standards, lacking voice narration, multi-language localization, and intuitive visual feedback for field researchers and visually impaired citizens.

---

## 💡 Solution Overview

**RoadSense AI** is a full-stack, research-grade computer vision platform designed to detect, interpret, and map autonomous vehicles in real time. Built with an explainability-first philosophy, RoadSense AI bridges the gap between raw hardware feature extraction and actionable civic intelligence.

- **Real-Time Detection & Hardware Profiling**: Processes optical camera streams and uploaded road images to identify specialized AV hardware footprints (roof LiDAR domes, 360° sensor pods, bumper radar arrays).
- **Explainable AI (XAI) & Advanced Analytics**: Integrates Grad-CAM saliency heatmaps to visually isolate neural activation regions, alongside animated convergence timelines showing model confidence evolution layer-by-layer.
- **Inclusive Accessibility**: Features Web Speech API voice synthesis, bilingual internationalization (English & Bengali), high-contrast accessibility modes, and interactive before/after split-screen camera feeds.

---

## 🛠️ Technical Stack

RoadSense AI is built on a modern, high-performance web architecture optimized for low-latency edge simulation and responsive UI interactions:

- **Frontend Core**: [React 18.3](https://react.dev/) — Component-driven architecture with functional state orchestration.
- **Language**: [TypeScript 5.5](https://www.typescriptlang.org/) — Strict static typing for robust data structures and API contracts.
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) — Utility-first, responsive design supporting native dark and light themes.
- **Build Tooling & Server**: [Vite 5.4](https://vitejs.dev/) + [Express.js](https://expressjs.com/) — Fast HMR during development and single-file CommonJS bundling via `esbuild` for Cloud Run container execution.
- **Animations & Transitions**: [Motion](https://motion.dev/) (Framer Motion) — Fluid layout shifts, route transition animations, and interactive drawer gestures.
- **Multi-Modal AI Integration**: [@google/genai SDK](https://www.npmjs.com/package/@google/genai) — Server-side integration with Google Gemini 2.5 Flash for hardware feature verification.
- **Visualization & Synthesizers**: [Recharts](https://recharts.org/) for analytics charts, Web Audio API for dual-tone audio cues, and Web Speech API for voice synthesis.

---

## ⚡ Key Features

### 📷 1. Camera Integration & Dual-Stream Processing
- **Live Device Stream**: Connects to native device hardware via `navigator.mediaDevices.getUserMedia` with fallback permission handling.
- **Instant Canvas Shutter**: Captures high-resolution video frame snapshots directly to an HTML5 canvas for bounding box overlay rendering.
- **Split-Screen Compare Mode**: Real-time dual stream preview displaying the raw optical camera feed on the left alongside the AI-augmented feed with simulated 3D LiDAR vector scans on the right.
- **Multi-Source Image Upload**: Supports local photo uploads (`accept="image/*"`) with instant bounding box analysis and image comparison sliders.

### 🔄 2. Real-Time Simulation & AI Explainability
- **Live Continuous AI Scanner**: Performs continuous simulated inference every 1.5 seconds with dynamic bounding boxes and confidence score fluctuations ($85\%\text{–}98\%$).
- **Grad-CAM Saliency Heatmaps**: Overlays visual explainability maps highlighting neural focus regions (e.g., Roof LiDAR Dome $48\%$ activation, Front Radar $32\%$ activation).
- **Inference Convergence Timeline**: Renders an animated SVG line chart tracking confidence score evolution across neural network processing layers ($0\text{ ms}$ input to final class prediction).
- **Predictive Risk Assessment**: Generates contextual traffic advisories, sector safety indices, and pedestrian buffer recommendations.

### 📜 3. History Tracking & Urban Analytics
- **Persistent Detection Logs**: Saves structured record logs containing classification metadata, timestamp, GPS coordinates, processing latency ($12\text{ ms}$), and LiDAR point cloud density ($18,400\text{ pts}$).
- **Interactive Search & Filtering**: Filter historical records by vehicle type (*AV Shuttle*, *Robotaxi*, *Non-AV*), confidence threshold, or sector location.
- **City-Wide Insights Heatmap**: Interactive city vector map displaying sector AV density heat zones (High, Medium, Low), active fleet counts, and traffic safety planning recommendations.
- **Data Export & Sharing**: Export detection history as structured JSON (`roadsense-DET-xxxx.json`) or generate shareable PNG report cards via HTML5 canvas and Web Share API (`navigator.share`).

### 🎙️ 4. Accessibility & Inclusive Design
- **Voice-Guided Narration**: Hands-free read-aloud feature powered by `SpeechSynthesisUtterance`, speaking detection summaries, confidence scores, and safety alerts.
- **Bilingual Internationalization (i18n)**: One-tap toggle between **English** and **Bengali (বাংলা)** across all interface labels, tooltips, and spoken voice text (`bn-BD`).
- **Tactile & Auditory Cues**: Integrated Web Audio API dual-tone sound synthesizer and mobile vibration feedback (`navigator.vibrate`) upon successful detection.
- **Gamified Citizen Contributor Engine**: Level progression (*Level 3: AV Sentinel*), XP tracking, and unlockable achievement badges encouraging community road safety participation.

---

## 📥 Installation Guide

### Prerequisites
Ensure you have the following tools installed on your development machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari (Webcam & Speech API support recommended)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/roadsense-ai.git
   cd roadsense-ai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key to enable server-side multi-modal AI analysis:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Launch the Development Server**
   ```bash
   npm run dev
   ```
   Access the live preview in your browser at `http://localhost:3000`.

5. **Build for Production**
   To compile both the React client bundle and the server entry point:
   ```bash
   npm run build
   ```
   To run the production server:
   ```bash
   npm run start
   ```

---

## 🗺️ Future Roadmap

- [ ] **Edge Hardware WebGPU Acceleration**: Migrate real-time object detection inference to client-side WebGPU for zero-latency frame processing.
- [ ] **V2X (Vehicle-to-Everything) Protocol Simulator**: Integrate real-time WebSocket listeners simulating DSRC / C-V2X telemetry packets broadcast by surrounding autonomous vehicles.
- [ ] **Multi-Camera Fleet Stitching**: Support multi-angle camera stream inputs to synthesize 360° bird's-eye view (BEV) road occupancy grids.
- [ ] **Decentralized Citizen Data Logging**: Implement Web3/IPFS immutable record logging for community-verified traffic safety auditing.
- [ ] **Native Mobile Mobile SDK**: Package core vision and speech engines into React Native / Expo modules for iOS and Android deployments.

---

<div align="center">

**RoadSense AI — Paving the Way for Safer Autonomous Urban Mobility**

*Developed for Computer Vision & Civic Traffic Safety Innovation*

</div>
