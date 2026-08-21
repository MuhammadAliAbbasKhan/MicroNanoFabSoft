import React, { useState } from 'react';
import { Cpu, CheckCircle2, ArrowRight, Download, Lock, Layers, Zap, Eye, Sparkles } from 'lucide-react';

const BeamerPageComponent = ({ setCurrentPage, onOpenTrial }) => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    { title: "3D Proximity Effect Correction (PEC)", desc: "Calculates sub-10nm electron backscattering fogging and assigns optimal exposure dose matrices to eliminate proximity line width variation." },
    { title: "Multi-Format Machine Export", desc: "Native conversion for JEOL (v30, JBX), Elionix (CEL, ELC), Raith (GDSII, PAT), Vistec (FRE, ASC), and Crestec EBL machines." },
    { title: "Layout Fracturing & Stitching Control", desc: "Automated field floating, multipass write sequence placement, and polygon fracturing to minimize field boundary stitching errors." },
    { title: "3D Greyscale Dose Modulation", desc: "Translates height maps and 3D STL CAD topographies into continuous dose levels for micro-lens array fabrication." }
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
          <span className="text-xs font-bold text-[#00a3e0] uppercase tracking-wider bg-[#0066b2]/30 backdrop-blur-md px-3 py-1 rounded-full border border-[#0066b2]/50 inline-flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#00a3e0]" />
            <span>E-Beam Data Prep &amp; 3D PEC Standard</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            BEAMER — Sub-10nm E-Beam Data Preparation &amp; 3D PEC
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            BEAMER is the industry-standard software module for Electron Beam Lithography (EBL). It delivers advanced 3D Proximity Effect Correction (PEC), layout fracturing, shape healing, and multi-pass write sequence optimization.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={onOpenTrial} className="bg-[#23b14d] hover:bg-[#1e9942] text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wider">
              Request 30-Day Free Trial Key
            </button>
            <button onClick={() => setCurrentPage('software-portal')} className="bg-[#0066b2] hover:bg-[#0055a0] text-white text-xs font-bold px-6 py-3 rounded-full shadow flex items-center gap-2 uppercase tracking-wider">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Configure License in Portal</span>
            </button>
          </div>
        </div>

        {/* Feature Pill Card */}
        <div className="relative z-20 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-full lg:w-80 space-y-3 text-xs shadow-2xl">
          <div className="font-bold text-[#00a3e0] border-b border-slate-700 pb-2 text-sm flex items-center justify-between">
            <span>BEAMER Highlights</span>
            <Sparkles className="w-4 h-4 text-[#00a3e0]" />
          </div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>3D Proximity Effect Correction</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Layout Fracturing &amp; Healing</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Multi-Pass Field Floating</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>JEOL / Elionix / Raith Export</span></div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap justify-center bg-slate-200 p-1.5 rounded-2xl gap-2 max-w-md mx-auto text-xs font-bold">
        <button 
          onClick={() => setActiveTab('features')}
          className={`px-5 py-2 rounded-xl transition-all ${activeTab === 'features' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          Core Capabilities
        </button>
        <button 
          onClick={() => setActiveTab('specs')}
          className={`px-5 py-2 rounded-xl transition-all ${activeTab === 'specs' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
        >
          Technical Specifications
        </button>
      </div>

      {activeTab === 'features' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {features.map((feat, idx) => (
            <div key={idx} className="genisys-card p-6 space-y-2 border-l-4 border-[#0066b2]">
              <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'specs' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 font-mono text-xs animate-fadeIn">
          <div className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">BEAMER Machine &amp; Format Support Matrix</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
            <div>&bull; <strong>Supported OS:</strong> Windows 11/10 64-bit, RHEL 8+, Ubuntu 22.04+</div>
            <div>&bull; <strong>Input CAD Formats:</strong> GDSII, OASIS, CIF, DXF, STL</div>
            <div>&bull; <strong>EBL Machine Formats:</strong> JEOL 5200/6300/9500, Elionix ELS-7000/F125, Raith EBPG 5000/5200</div>
            <div>&bull; <strong>Hardware Requirements:</strong> 16GB+ RAM, NVIDIA CUDA GPU acceleration (optional)</div>
          </div>
        </div>
      )}

    </div>
  );
};

export const BeamerPage = BeamerPageComponent;
export default BeamerPageComponent;
