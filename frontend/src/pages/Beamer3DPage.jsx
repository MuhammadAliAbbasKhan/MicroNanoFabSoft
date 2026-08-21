import React, { useState } from 'react';
import { FlaskConical, CheckCircle2, ArrowRight, Download, Lock, Sparkles, Box } from 'lucide-react';

const Beamer3DPageComponent = ({ setCurrentPage, onOpenTrial }) => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    { title: "STL / STEP 3D CAD Topology Import", desc: "Imports continuous 3D CAD surface meshes (blazed gratings, micro-lenses, freeform optical diffusers) into continuous height layers." },
    { title: "Dose-Modulated Greyscale Map Generation", desc: "Maps 3D target resist depth profiles directly to non-linear exposure dose maps, accounting for resist dissolution rates." },
    { title: "Sub-Micron Micro-Optics Fabrication", desc: "Designed specifically for laser direct writing and E-Beam 3D greyscale lithography of diffractive optical elements (DOEs)." },
    { title: "Integrated 3D PEC Fogging Correction", desc: "Combines 3D surface topography with proximity effect correction to prevent profile distortion on dense micro-lens arrays." }
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
          <span className="text-xs font-bold text-[#92278f] uppercase tracking-wider bg-[#92278f]/30 backdrop-blur-md px-3 py-1 rounded-full border border-[#92278f]/50 inline-flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-[#92278f]" />
            <span>3D Greyscale Lithography Engine</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            BEAMER 3D — Continuous Greyscale Surface Profiling
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            BEAMER 3D translates 3D STL surface topographies into dose-modulated exposure files for 3D micro-optics, blazed diffraction gratings, micro-cavities, and MEMS components.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={onOpenTrial} className="bg-[#92278f] hover:bg-[#7b1f79] text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 uppercase tracking-wider">
              Request BEAMER 3D Trial Key
            </button>
            <button onClick={() => setCurrentPage('software-portal')} className="bg-[#0066b2] hover:bg-[#0055a0] text-white text-xs font-bold px-6 py-3 rounded-full shadow flex items-center gap-2 uppercase tracking-wider">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Configure License in Portal</span>
            </button>
          </div>
        </div>

        {/* Feature Pill Card */}
        <div className="relative z-20 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-full lg:w-80 space-y-3 text-xs shadow-2xl">
          <div className="font-bold text-[#92278f] border-b border-slate-700 pb-2 text-sm flex items-center justify-between">
            <span>BEAMER 3D Highlights</span>
            <Box className="w-4 h-4 text-[#92278f]" />
          </div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>3D STL / STEP Mesh Import</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Dose-Modulated Greyscale Map</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Micro-Lens &amp; DOE Optimization</span></div>
          <div className="flex items-center gap-2 text-slate-200"><CheckCircle2 className="w-4 h-4 text-[#23b14d] flex-shrink-0" /><span>Combined 3D PEC Engine</span></div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        {features.map((feat, idx) => (
          <div key={idx} className="genisys-card p-6 space-y-2 border-l-4 border-[#92278f]">
            <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export const Beamer3DPage = Beamer3DPageComponent;
export default Beamer3DPageComponent;
