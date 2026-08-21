import React, { useState } from 'react';
import { Zap, CheckCircle2, ArrowRight, Download, Lock, Sparkles, Binary } from 'lucide-react';

const TracerPageComponent = ({ setCurrentPage, onOpenTrial }) => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    { title: "Monte Carlo Electron-Material Simulation", desc: "Simulates elastic and inelastic electron scattering (1kV to 100kV) in multi-layer resist-substrate stacks." },
    { title: "Point Spread Function (PSF) Calculation", desc: "Generates high-precision Point Spread Functions (PSFs) for sub-10nm E-Beam proximity effect correction in BEAMER." },
    { title: "Energy Deposition Volume 3D Visualization", desc: "Interactive 3D voxel heatmaps of energy absorption in PMMA, ZEP, HSQ, and inorganic photoresists." },
    { title: "Material Database & Custom Stacks", desc: "Extensive material library (Silicon, SiO2, GaAs, GaN, Gold, Platinum) with custom compound support." }
  ];

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Product Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-700 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: 'url(/images/slide2.png)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10"></div>

        <div className="relative z-20 space-y-4 max-w-2xl">
          <span className="text-xs font-bold text-[#23b14d] uppercase tracking-wider bg-[#23b14d]/30 backdrop-blur-md px-3 py-1 rounded-full border border-[#23b14d]/50 inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#23b14d]" />
            <span>Monte Carlo Energy Engine</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            TRACER — Monte Carlo Energy Deposition Simulation
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            TRACER models electron-matter interaction physics. Calculate exact Point Spread Functions (PSFs) and 3D energy absorption densities across multi-layer substrate stacks for 10-100kV E-Beam machines.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={onOpenTrial} className="bg-[#23b14d] hover:bg-[#1e9942] text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wider">
              Request TRACER Trial Key
            </button>
            <button onClick={() => setCurrentPage('software-portal')} className="bg-[#0066b2] hover:bg-[#0055a0] text-white text-xs font-bold px-6 py-3 rounded-full shadow flex items-center gap-2 uppercase tracking-wider">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Configure License in Portal</span>
            </button>
          </div>
        </div>

        {/* Feature Pill Card */}
        <div className="relative z-20 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-full lg:w-80 space-y-3 text-xs shadow-2xl">
          <div className="font-bold text-[#23b14d] border-b border-slate-700 pb-2 text-sm flex items-center justify-between">
            <span>TRACER Highlights</span>
            <Binary className="w-4 h-4 text-[#23b14d]" />
          </div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>10-100kV Monte Carlo Engine</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Exact PSF Generation</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>3D Voxel Energy Heatmaps</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Multi-Layer Substrates</span></div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        {features.map((feat, idx) => (
          <div key={idx} className="genisys-card p-6 space-y-2 border-l-4 border-[#23b14d]">
            <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export const TracerPage = TracerPageComponent;
export default TracerPageComponent;
