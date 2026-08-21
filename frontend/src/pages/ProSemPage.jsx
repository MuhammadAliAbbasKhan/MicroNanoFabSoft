import React, { useState } from 'react';
import { Eye, CheckCircle2, ArrowRight, Download, Lock, Sparkles, Scan } from 'lucide-react';

const ProSemPageComponent = ({ setCurrentPage, onOpenTrial }) => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    { title: "Automated SEM Edge Detection", desc: "Sub-pixel feature edge localization from top-down Scanning Electron Microscope (SEM) TIFF/PNG images." },
    { title: "Line Edge Roughness (LER / LWR)", desc: "Calculates spatial frequency spectra, correlation length, and standard deviation (3-sigma) for line edge roughness down to sub-0.5nm." },
    { title: "Automated Scale Calibration & Batching", desc: "Reads SEM metadata tags (Hitachi, FEI, Zeiss, JEOL) for instant scale calibration and high-throughput batch measurement." },
    { title: "3D Sidewall Slope Reconstruction", desc: "Estimates resist sidewall tilt angles and height topographies from grayscale SEM intensity gradients." }
  ];

  return (
    <div className="w-full font-sans space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Product Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-700 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: 'url(/images/slide3.png)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10"></div>

        <div className="relative z-20 space-y-4 max-w-2xl">
          <span className="text-xs font-bold text-[#ffc20e] uppercase tracking-wider bg-[#ffc20e]/20 backdrop-blur-md px-3 py-1 rounded-full border border-[#ffc20e]/40 inline-flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#ffc20e]" />
            <span>Automated SEM CD Metrology</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            ProSEM — Automated SEM Edge &amp; LER Analysis
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ProSEM automates Critical Dimension (CD) measurement, Line Edge Roughness (LER/LWR) analysis, and contour extraction from Scanning Electron Microscope (SEM) images, accelerating process calibration in R&amp;D cleanrooms.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={onOpenTrial} className="bg-[#ffc20e] hover:bg-[#e5ad0c] text-slate-950 font-black text-xs px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wider">
              Request ProSEM Trial Key
            </button>
            <button onClick={() => setCurrentPage('software-portal')} className="bg-[#0066b2] hover:bg-[#0055a0] text-white text-xs font-bold px-6 py-3 rounded-full shadow flex items-center gap-2 uppercase tracking-wider">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Configure License in Portal</span>
            </button>
          </div>
        </div>

        {/* Feature Pill Card */}
        <div className="relative z-20 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-full lg:w-80 space-y-3 text-xs shadow-2xl">
          <div className="font-bold text-[#ffc20e] border-b border-slate-700 pb-2 text-sm flex items-center justify-between">
            <span>ProSEM Highlights</span>
            <Scan className="w-4 h-4 text-[#ffc20e]" />
          </div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Sub-Pixel Edge Detection</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Sub-0.5nm LER / LWR Metrics</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Hitachi / FEI / Zeiss Metadata</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Automated Batch Inspection</span></div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        {features.map((feat, idx) => (
          <div key={idx} className="genisys-card p-6 space-y-2 border-l-4 border-[#ffc20e]">
            <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export const ProSemPage = ProSemPageComponent;
export default ProSemPageComponent;
