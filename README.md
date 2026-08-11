# 🚗 RoadSense AI

> **Next-Generation Autonomous Vehicle Detection & Explainable Safety Intelligence Platform — Detect. Predict. Prevent.**

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-Framer-0055FF?logo=framer&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?logo=google&logoColor=white)

---

## 📌 Table of Contents
- [The Problem Statement](#-the-problem-statement)
- [Solution Overview](#-solution-overview)
- [Technical Stack](#-technical-stack)
- [Key Features](#-key-features)
- [Installation Guide](#-installation-guide)
- [Future Roadmap](#-future-roadmap)

---

## 🚨 The Problem Statement

The rapid commercial growth of Autonomous Vehicles (AVs) is transforming urban mobility, yet it exposes critical flaws in current infrastructure. RoadSense AI directly addresses three major industry gaps:

* **Black-Box AI Decisions:** There is a severe lack of transparency in how autonomous vehicles interpret their surroundings and make split-second choices.
* **Missing Predictive Analytics:** Current systems lack proactive, urban risk assessment tools required to foresee and prevent collisions *before* they happen.
* **Inaccessible Interfaces:** Existing researcher and safety tools are overly technical, excluding citizen contributors and hindering accessible safety audits.

## 💡 Solution Overview

RoadSense AI provides a full-stack, real-time safety intelligence architecture designed for transparency and action. By capturing live hardware profiling from roof LiDAR domes and bumper radars, the platform translates raw environmental data into human-readable insights. 

Utilizing **Explainable AI (Grad-CAM XAI)**, RoadSense highlights neural activation zones to clarify exactly *why* and *how* a vehicle makes a decision. Coupled with predictive safety alerts and a highly inclusive design, it successfully bridges the gap between complex AV technology and public road safety.

---

## 🛠️ Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Core** | React 18.3, TypeScript 5.5, Tailwind CSS 4.0, Motion (Framer Motion) |
| **Build & Server** | Vite 5.4, Express.js (Node.js), esbuild |
| **AI & Models** | `@google/genai` SDK (Gemini 2.5 Flash) |
| **Browser APIs** | Web Speech API, Web Audio API, `navigator.mediaDevices`, Web Share API |
| **Data Visualization**| Recharts, HTML5 Canvas |

---

## ✨ Key Features

### 📷 Camera Integration
* **Live Webcam Streaming:** Seamless device camera integration via `navigator.mediaDevices.getUserMedia`.
* **Split-Screen Compare Mode:** Side-by-side visualization of raw optical feeds vs. AI/LiDAR overlay data.
* **Snapshot & Upload:** High-performance Canvas-based snapshot capture and multi-format gallery upload support.

### 🔄 Real-Time Simulation
* **Live Scanner Mode:** Continuous 1.5-second polling intervals for real-time environmental processing.
* **Explainable AI (XAI):** Grad-CAM saliency heatmaps that highlight exact neural activation and detection zones.
* **Predictive Warnings:** Animated convergence timeline SVG charts and proactive traffic safety alerts.

### 📊 History & Analytics
* **Comprehensive Logs:** Detailed record tracking including localized LiDAR point density metrics.
* **Advanced Filtering:** Powerful search and sort functionality for past environmental scans.
* **Urban Insights:** City-wide AV density insights visually represented on a vector map.
* **Data Export:** One-click JSON and PNG export capabilities tailored for researchers.

### ♿ Accessibility & Community
* **Voice-Guided Read-Aloud:** Screen-free auditing powered by the Web Speech API (`speechSynthesis`).
* **Bilingual Support:** Full interface internationalization for English and Bengali.
* **Multisensory Feedback:** Dual-tone Web Audio cues and haptic vibration feedback for critical alerts.
* **Citizen Gamification:** XP levels and achievement badges to incentivize community road safety contributors.

---

## 🚀 Installation Guide

**Prerequisites:** 
* Node.js (v18 or higher)
* npm (v9 or higher)

Follow these steps to run RoadSense AI locally:

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/roadsense-ai.git](https://github.com/your-username/roadsense-ai.git)

# 2. Navigate into the project directory
cd roadsense-ai

# 3. Install dependencies
npm install

# 4. Configure environment variables
# Create a .env file in the root directory and add your Gemini API Key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# 5. Start the development server
npm run dev

# 6. Build and start for production
npm run build && npm run start
