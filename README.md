# DIG Technology - Subsurface Intelligence Platform

A high-performance, responsive web application for a premier **Subsurface Intelligence Platform** specialized in advanced Rock Physics, AVO Feasibility Modelling, and Seismic Reservoir Prediction.

---

## 🧭 Platform Overview

**DIG Technology** delivers state-of-the-art geophysical services and proprietary workflows to ground amplitude analysis in rigorous geologic frameworks before drilling:

- 🔍 **AVO Feasibility Modelling (DIG DEEP 3D)**: Geologically constrained AVO feasibility maps and volumes predicting seismic signatures for different fluid, reservoir quality, and lithology scenarios.
- ⚡ **Seismic Reservoir Prediction**: Transforming seismic amplitudes into reservoir properties using deterministic Rock Physics, Statistical AVO classification, and neural network engines.
- 📊 **Density Ratio Inversion**: Extracting density information from pre-stack seismic data to solve thin-layer resolution limits.
- 🌊 **Inverse Rock Physics Modelling (IRPM)**: Unique solutions resolving combinations of porosity, lithology, and fluid directly from elastic attributes.

---

## ✨ Features & User Experience

- **Aesthetic Cosmic Dark Theme**: A polished dark styling using tailored high-contrast colors, optimal tracking, and generous whitespace.
- **Dynamic Workflows Console**: Interactive tabs allowing geophysicists to explore proprietary pipelines with smooth slide-in animations.
- **Responsive Section Tracking**: Real-time passive intersection monitoring highlighting active regions within the navbar as you scroll or click-navigate.
- **Micro-Animations**: Clean interactive transitions utilizing lightweight physics animations courtesy of `motion`.
- **Responsive Web Design**: Fluid layout adapting dynamically from mobile screens up to multi-monitor desktop workspaces.

---

## 🛠️ Built With

- **Framework**: [React](https://react.dev/) (v19) with [Vite](https://vite.dev/) for ultra-fast builds
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [motion/react](https://github.com/motiondivision/motion) (formerly Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/dig-technology.git
   cd dig-technology
   ```

2. **Install dependency packages**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   *The server will run on [http://localhost:3000](http://localhost:3000).*

---

## 🏗️ Building and Deploying

### Production Build

To compile a highly optimized production bundle:
```bash
npm run build
```
This will compile assets into the `dist/` directory, ready to be hosted on Netlify, Vercel, AWS S3, or any static file hosting service.

---

## 📂 Project Structure

```text
├── brand_assets/              # Visual assets and corporate logos
├── src/
│   ├── components/            # Reusable modular UI sections (Hero, Navbar, Workflows, Solutions, etc.)
│   ├── context/               # SectionContext handling smooth interaction-driven navigation
│   ├── App.tsx                # Main application wrapper
│   ├── main.tsx               # Client entry point
│   ├── index.css              # Global custom typography and style imports
│   └── types.ts               # Shared types
├── package.json               # Package configuration
├── vite.config.ts             # Vite bundler rules & plugin registrations
└── README.md                  # This documentation file
```

---

## 📄 License & Proprietary Info

This platform details proprietary workflows and methods of **DIG Technology**. All content represents private IP related to rock physics methods, AVO classification strategies, and reservoir characterization frameworks.
