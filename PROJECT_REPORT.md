# RoadSense AI: Next-Generation Autonomous Vehicle Detection & Safety Platform

---

### **Submitted By**

| Student Name | Student ID |
| :--- | :--- |
| **Md. Abir Hasan** | **0242310005101999** |

<br />

### **MINI LAB PROJECT REPORT**
*This Report Presented in Partial Fulfillment of the course CS441: UI & UX Design in the Computer Science and Engineering Department*

<br />

**DAFFODIL INTERNATIONAL UNIVERSITY**  
Dhaka, Bangladesh  
August 14, 2026  

---

## **DECLARATION**

We hereby declare that this lab project has been done by us under the supervision of **Mr. Md. Hasanuzzaman Dipu**, Assistant Professor, Department of Computer Science and Engineering, Daffodil International University. We also declare that neither this project nor any part of this project has been submitted elsewhere as lab projects.

**Submitted To:**  
Mr. Md. Hasanuzzaman Dipu  
Assistant Professor  
Department of Computer Science and Engineering  
Daffodil International University  

**Submitted By:**  
Md. Abir Hasan  
ID: 0242310005101999  
Dept. of CSE, DIU  
Major: Software Development  

*©Daffodil International University*

---

## **COURSE & PROGRAM OUTCOME**

The following course has course outcomes as following:

### **Table 1: Course Outcome Statements**

| CO's | Statements |
| :--- | :--- |
| **CO1** | **Define and Relate** user interfaces, AI visual bounding boxes, explainability heatmaps, and relationships among them needed for solving specific road safety problems. |
| **CO2** | **Formulate** knowledge of modern frontend frameworks (React, TypeScript, Tailwind CSS) and AI vision logic in web applications. |
| **CO3** | **Analyze** User Journey Maps, User Flow Diagrams, and UX Wireframes to present an intuitive vehicle detection system. |
| **CO4** | **Develop** solutions for real-world traffic safety problems applying UI/UX concepts while evaluating accessibility and performance. |

### **Table 2: Mapping of CO, PO, Blooms, KP and CEP**

| CO | PO | Blooms | KP | CEP |
| :---: | :---: | :---: | :---: | :---: |
| **CO1** | PO1 | C1, C2 | KP3 | EP1, EP3 |
| **CO2** | PO2 | C2 | KP3 | EP1, EP3 |
| **CO3** | PO3 | C4, A1 | KP3 | EP1, EP2 |
| **CO4** | PO3 | C3, C6, A3, P3 | KP4 | EP1, EP3 |

---

## **Table of Contents**

- [Declaration](#declaration)
- [Course \& Program Outcome](#course--program-outcome)
- [1. Introduction](#1-introduction)
  - [1.1 Introduction](#11-introduction)
  - [1.2 Motivation](#12-motivation)
  - [1.3 Objectives](#13-objectives)
  - [1.4 Feasibility Study](#14-feasibility-study)
  - [1.5 Gap Analysis](#15-gap-analysis)
  - [1.6 Project Outcome](#16-project-outcome)
- [2. Research \& User Journey (UX)](#2-research--user-journey-ux)
  - [2.1 Target Audience](#21-target-audience)
  - [2.2 User Personas](#22-user-personas)
  - [2.3 User Journey Map](#23-user-journey-map)
  - [2.4 User Flow Diagram](#24-user-flow-diagram)
  - [2.5 Accessibility Plan](#25-accessibility-plan)
- [3. Visual Design \& Wireframes (UI)](#3-visual-design--wireframes-ui)
  - [3.1 Low-Fidelity Wireframes](#31-low-fidelity-wireframes)
  - [3.2 High-Fidelity Mockups](#32-high-fidelity-mockups)
  - [3.3 Design System / Component Library](#33-design-system--component-library)
- [4. Technical Architecture \& System Specs](#4-technical-architecture--system-specs)
  - [4.1 Hardware Integration Map](#41-hardware-integration-map)
  - [4.2 Sensor \& Controller Mapping](#42-sensor--controller-mapping)
- [5. Conclusion](#5-conclusion)
  - [5.1 Summary](#51-summary)
  - [5.2 Limitation](#52-limitation)
  - [5.3 Future Work](#53-future-work)
- [References](#references)

---

## **Chapter 1: Introduction**

### **1.1 Introduction**
**RoadSense AI** is an interactive web-based application designed to help users detect, identify, and analyze Autonomous Vehicles (AVs) versus standard human-driven vehicles in real time. The application uses smart computer vision algorithms, live camera feeds, and Explainable AI (Grad-CAM heatmaps) to show why a vehicle is classified as autonomous (such as having roof LiDAR domes or side camera arrays). It also provides city-wide traffic safety insights, voice narration in Bengali and English, and a gamified citizen reporter system.

### **1.2 Motivation**
Autonomous self-driving taxis, shuttles, and delivery pods are becoming common on public roads. However, regular citizens and urban planners cannot easily distinguish self-driving cars from regular human-driven cars. Furthermore, existing AI tools act like "black boxes" without explaining how they make decisions. This project was motivated by the goal of making AI clear, transparent, and easy to understand for everyone through an intuitive UI/UX web interface.

### **1.3 Objectives**
The main objectives of this project are:
- To develop a simple, responsive web application for real-time vehicle classification.
- To accurately distinguish between human-driven cars and autonomous vehicles (AVs).
- To provide Explainable AI (XAI) using visual heatmaps (Grad-CAM) that highlight roof LiDAR pods.
- To offer voice narration (Web Speech API) in both English and Bengali (বাংলা) for accessible learning.
- To display interactive urban safety maps, detection logs, and confidence layer charts.
- To apply modern UI/UX design rules to build a clean dark and light interface.

### **1.4 Feasibility Study**
Web-based AI vision applications are widely used in smart city management and traffic education. Modern web browsers support live webcam access (`getUserMedia`), fast canvas rendering, and client-side web audio. Testing shows that running lightweight AI detection logic directly in the browser with React and Tailwind CSS allows smooth 60 FPS performance without requiring expensive hardware. Therefore, RoadSense AI is highly feasible as a web-based responsive system.

### **1.5 Gap Analysis**
Existing traffic monitoring systems only count total cars on the road and do not identify autonomous vehicles or explain AI decisions to the user. They also lack accessibility features such as multi-language voice output or dark mode for mobile phones. RoadSense AI bridges this gap by combining live camera detection, strict hardware verification (detecting LiDAR domes vs regular roofs), voice narration, and citizen gamification into a single, user-friendly platform.

### **1.6 Project Outcome**
The expected outcome is a fully functional web application that allows users to test live cameras or uploaded photos, view instant detection results with bounding boxes, inspect explainability heatmaps, check city-wide safety levels, and listen to spoken voice summaries.

---

## **Chapter 2: Research & User Journey (UX)**

### **2.1 Target Audience**
The target audience of RoadSense AI includes:
1. **General Commuters & Citizens**: People interested in finding out if self-driving cars are operating near them.
2. **Traffic Researchers & Urban Planners**: Professionals analyzing city-wide AV density and road risk zones.
3. **Students & AI Learners**: Learners studying computer vision, LiDAR sensors, and Explainable AI.

---

### **2.2 User Personas**

#### **Persona 1: Traffic Safety Researcher**
- **Name**: Tanvir Ahmed
- **Age**: 25 Years
- **Occupation**: Urban Planning Student
- **Goals**: Monitor self-driving vehicle density in different city sectors and export detection history for research.
- **Needs**: Accurate classification, detailed LiDAR sensor data, confidence score graphs, and JSON export.
- **Pain Points**: Existing tools do not separate autonomous cars from standard cars.

#### **Persona 2: General Commuter**
- **Name**: Nusrat Jahan
- **Age**: 22 Years
- **Occupation**: University Student
- **Goals**: Quickly check if a nearby vehicle is self-driving using a phone camera.
- **Needs**: Simple mobile interface, instant camera scanner, clean visual labels, and voice summaries in Bengali.
- **Pain Points**: Complex tech jargon and hard-to-read interfaces on mobile screens.

#### **Persona 3: Accessibility User**
- **Name**: Rahat Karim
- **Age**: 34 Years
- **Occupation**: Office Administrative Assistant
- **Goals**: Learn about autonomous road safety through voice-guided narration and high-contrast modes.
- **Needs**: Screen-reader friendly buttons, dark mode, and clear audio feedback.
- **Pain Points**: Small text and bright screen glare during outdoor use.

---

### **2.3 User Journey Map**

| Stage | User Action | User Experience |
| :--- | :--- | :--- |
| **Discover** | Opens the RoadSense AI website | Learns about AI autonomous vehicle safety |
| **Explore** | Views live statistics on the Dashboard | Sees active AV counts and safety indices |
| **Configure** | Selects Camera Mode or Photo Upload | Chooses target classification mode (Auto, Non-AV, AV) |
| **Start Scan** | Clicks "Start AI Scanner" button | Watches camera stream and bounding box scan |
| **Observe** | Sees detected vehicle with bounding box | Clearly identifies if it is Autonomous or Human-Driven |
| **Analyze** | Inspects Grad-CAM heatmap & confidence chart | Understands why the AI identified LiDAR roof pods |
| **Finish** | Listens to voice report and saves log | Feels confident in the result and earns XP badges |

---

### **2.4 User Flow Diagram**

```text
[Start Application]
       │
       ▼
[Dashboard Screen] ──► (Toggle Dark Mode / Language: EN / BN)
       │
       ├──► [Detect Vehicle Screen]
       │        │
       │        ├──► Option A: Live Camera Stream
       │        └──► Option B: Upload Photo
       │                │
       │                ▼
       │        [Hardware Classification Check]
       │        (Checks for Roof LiDAR / Camera Pods)
       │                │
       │                ▼
       │        [Detection Result Screen]
       │        (Bounding Box + Grad-CAM Heatmap + Voice Summary)
       │
       ├──► [City Insights Map] (Sector AV Density & Risk Advisories)
       ├──► [Detection History] (Search, Filter, Export JSON)
       └──► [Citizen Profile] (XP Levels, Badges, Earned Rank)
```

---

### **2.5 Accessibility Plan**
To ensure the application is accessible to all users, RoadSense AI implements:
- **Voice Narration (Web Speech API)**: Spoken detection output in English and Bengali (`bn-BD`).
- **Responsive Dark & Light Mode**: Seamless dark theme (`dark:bg-slate-950`) to reduce eye strain on mobile devices.
- **High-Contrast Indicators**: Distinct green (`#1FAE71`) bounding boxes for Autonomous Vehicles and red/amber boxes for Non-Autonomous vehicles.
- **Audio & Haptic Feedback**: Dual-tone sound cues using Web Audio API and mobile vibration (`navigator.vibrate`).

---

## **Chapter 3: Visual Design & Wireframes (UI)**

### **3.1 Low-Fidelity Wireframes**
Low-fidelity wireframes were developed to define layout structures before building the interface:
- **Top Bar**: System title, dark mode switch, language toggle, notification bell.
- **Center Canvas**: Live video preview area with floating target mode controls.
- **Bottom Navigation Bar**: 5 key tabs (Dashboard, Detect, History, Analytics, Profile).

### **3.2 High-Fidelity Mockups**
High-fidelity mockups were built using React, Motion, and Tailwind CSS. Key screens include:
1. **Dashboard Screen**: Features metric cards, active scanner launcher, and real-time activity feed.
2. **Detect Vehicle Screen**: Includes split-screen view, live bounding box overlays, and scene presets (Highway, Urban, Night, Test Track).
3. **Detection Result Screen**: Displays confidence ring gauges, Explainable AI Grad-CAM heatmaps, and audio playback.
4. **Insights Map Screen**: Interactive city map showing sector risk levels and pedestrian buffer alerts.

### **3.3 Design System / Component Library**
- **Color Palette**:
  - Primary Brand Accent: Deep Purple (`#5A41DE`)
  - AV Detected Success: Emerald Green (`#1FAE71`)
  - Non-AV Warning: Amber / Coral (`#E5484D`)
  - Canvas Dark Background: Deep Slate (`#0F172A`, `#020617`)
- **Typography**: Space Grotesk (Headings), Plus Jakarta Sans (Body text).
- **Icons**: Lucide React icon collection.
- **Controls**: Rounded pill buttons, smooth slide toggles, and animated cards.

---

## **Chapter 4: Technical Architecture & System Specs**

### **4.1 Hardware Integration Map**

| Component | Minimum Specification | Recommended Specification |
| :--- | :--- | :--- |
| **Display** | 5.5-inch Mobile Screen (720p) | 6.7-inch Mobile or 23.5-inch Desktop Monitor (1080p) |
| **Processor** | Quad-Core 2.0 GHz | Octa-Core 2.8 GHz (Apple M-Series / Intel i5 / AMD Ryzen 5) |
| **Camera** | 720p Web Camera | 1080p 60 FPS Camera |
| **RAM Memory** | 4 GB RAM | 8 GB RAM or higher |
| **OS** | Android, iOS, Windows, macOS | Windows 11 / macOS / Android 13+ |
| **Browser** | Google Chrome / Safari / Edge | Latest Google Chrome (with Web Speech API enabled) |

---

### **4.2 Sensor & Controller Mapping**

| Input / Controller | User Action | System Response |
| :--- | :--- | :--- |
| **Touch / Mouse Click** | Tap "Start AI Scanner" | Starts live camera feed & bounding box detection |
| **Hardware Mode Switch** | Select "Non-Autonomous" | Enforces strict human-driven classification |
| **Hardware Mode Switch** | Select "Autonomous" | Enforces strict AV classification with top LiDAR dome |
| **Voice Button** | Tap "Listen Audio Summary" | Speaks results aloud in English or Bengali |
| **Theme Toggle** | Tap Sun / Moon icon | Switches full interface between Light and Dark mode |
| **Export Button** | Tap "Export Report" | Downloads JSON detection record or shares card |

---

## **Chapter 5: Conclusion**

### **5.1 Summary**
**RoadSense AI** successfully delivers an easy-to-use, accessible web application for detecting and understanding autonomous vehicles. By combining live video feeds, strict hardware classification, Explainable AI heatmaps, city risk analytics, voice narration, and mobile dark mode support, the project demonstrates how modern UI/UX design and AI technology can empower citizens and researchers.

### **5.2 Limitation**
- **Browser Media Permissions**: Requires camera permission grant from the browser to operate live video scanning.
- **Web Speech Support**: Voice synthesis quality depends on the operating system's installed language packs (especially Bengali speech engine support).

### **5.3 Future Work**
- **Client-Side WebGPU Inference**: Moving neural network calculations directly to WebGPU for zero-latency offline edge execution.
- **V2X Telemetry Integration**: Connecting live WebSocket feeds from self-driving vehicle broadcasting systems.
- **Multi-Camera Fleet Tracking**: Supporting multi-angle city camera inputs for real-time 360-degree traffic grid mapping.

---

## **References**

1. University of Colorado Boulder, "PhET Interactive Simulations," *PhET Interactive Simulations*. [Online]. Available: `https://phet.colorado.edu/`.
2. N. Shaby, O. Ben-Zvi Assaraf, and T. Tal, "The particular aspects of science museum exhibits that encourage students' engagement," *Journal of Science Education and Technology*, vol. 26, no. 3, pp. 253–268, Jun. 2017.
3. Redmon, J., Divvala, S., Girshick, R., & Farhadi, A., "You Only Look Once: Unified, Real-Time Object Detection," *IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, 2016.
4. Selvaraju, R. R., et al., "Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization," *IEEE International Conference on Computer Vision (ICCV)*, 2017.
