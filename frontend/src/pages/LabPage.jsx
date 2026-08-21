import React, { useState } from 'react';
import { Layers, CheckCircle2, ArrowRight, Download, Lock, Sparkles, Sun } from 'lucide-react';

const LabPageComponent = ({ setCurrentPage, onOpenTrial }) => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    { title: "Optical Aerial Image Calculation", desc: "Rigorous Vector diffraction, high-NA projection, dipole/quadrupole source illumination, and laser direct write beam focus simulation." },
    { title: "3D Post-Exposure Bake (PEB) Diffusion", desc: "Simulates thermal acid diffusion kinetics in chemically amplified resists (CAR) to predict sidewall angle and standing wave suppression." },
    { title: "3D Resist Development Solver", desc: "Fast Mack & Mack-4 dissolution rate models to compute 3D resist topography, undercut profiles, and T-topping resist artifacts." },
    { title: "Mask Process Correction (MPC)", desc: "Optical proximity correction (OPC) engine to optimize mask absorber features for proximity and projection aligners." }
  ];

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Product Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-700 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: 'url(/images/slide1.png)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10"></div>

        <div className="relative z-20 space-y-4 max-w-2xl">
          <span className="text-xs font-bold text-[#f37021] uppercase tracking-wider bg-[#f37021]/30 backdrop-blur-md px-3 py-1 rounded-full border border-[#f37021]/50 inline-flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#f37021]" />
            <span>3D Process Simulation Engine</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            LAB 3D — Full 3D Lithography Process Simulator
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            LAB 3D is a complete simulation software suite for optical, EUV, and laser lithography. Predict 3D resist exposure profiles, Post Exposure Bake (PEB) acid diffusion, and wet development kinetics before cleanroom execution.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={onOpenTrial} className="bg-[#f37021] hover:bg-[#e05f10] text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wider">
              Request LAB 3D Trial Key
            </button>
            <button onClick={() => setCurrentPage('software-portal')} className="bg-[#0066b2] hover:bg-[#0055a0] text-white text-xs font-bold px-6 py-3 rounded-full shadow flex items-center gap-2 uppercase tracking-wider">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Configure License in Portal</span>
            </button>
          </div>
        </div>

        {/* Feature Pill Card */}
        <div className="relative z-20 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-full lg:w-80 space-y-3 text-xs shadow-2xl">
          <div className="font-bold text-[#f37021] border-b border-slate-700 pb-2 text-sm flex items-center justify-between">
            <span>LAB 3D Highlights</span>
            <Sun className="w-4 h-4 text-[#f37021]" />
          </div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>EUV &amp; Optical Aerial Image</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>3D PEB Thermal Diffusion</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Mack-4 Dissolution Kinetics</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Source Mask Optimization</span></div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        {features.map((feat, idx) => (
          <div key={idx} className="genisys-card p-6 space-y-2 border-l-4 border-[#f37021]">
            <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export const LabPage = LabPageComponent;
export default LabPageComponent;
